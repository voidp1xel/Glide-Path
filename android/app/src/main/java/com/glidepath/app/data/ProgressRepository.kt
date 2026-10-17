package com.glidepath.app.data

import android.content.Context
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ListenerRegistration
import com.google.firebase.firestore.SetOptions
import kotlinx.coroutines.tasks.await
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.ConcurrentHashMap

/** Local-first progress store using the website's glidepath-v1 keys and Firestore contract. */
class ProgressRepository(
    context: Context,
    private val auth: FirebaseAuth = FirebaseAuth.getInstance(),
    private val firestore: FirebaseFirestore = FirebaseFirestore.getInstance()
) {
    private val prefs = context.getSharedPreferences("glidepath-progress", Context.MODE_PRIVATE)
    private val meta = context.getSharedPreferences("glidepath-sync-meta", Context.MODE_PRIVATE)
    private val listeners = mutableListOf<ListenerRegistration>()
    private val times = ConcurrentHashMap<String, Long>()
    private val hashes = ConcurrentHashMap<String, String>()
    val currentUid: String? get() = auth.currentUser?.uid

    @Synchronized fun state(): JSONObject = try { JSONObject(prefs.getString("state", "{}") ?: "{}") } catch (_: Exception) { JSONObject() }

    /**
     * Reconcile the WebView's state with the native copy when the page loads.
     * First run: adopt the WebView state as-is. Afterwards the native copy is authoritative (it may hold remote
     * changes that arrived while the page was not open); entries only the WebView has are kept and pushed.
     * Returns the state the WebView should be given, or null if it is already up to date.
     */
    @Synchronized fun initializeWebState(json: String): JSONObject? {
        val incoming = try { JSONObject(json) } catch (_: Exception) { JSONObject() }
        val stored = prefs.getString("state", null)
        if (stored == null) { prefs.edit().putString("state", incoming.toString()).apply(); return null }
        val native = try { JSONObject(stored) } catch (_: Exception) { JSONObject() }
        val nativeEntries = flatten(native)
        val webEntries = flatten(incoming)
        val now = System.currentTimeMillis()
        for ((section, entries) in webEntries) for ((key, raw) in entries) {
            if (nativeEntries[section]?.containsKey(key) != true) { applyValue(native, section, key, raw); push(section, key, raw, now) }
        }
        prefs.edit().putString("state", native.toString()).apply()
        return if (flatten(native) == webEntries) null else native
    }

    /** Persist WebView changes and enqueue only changed/deleted entries for sync. */
    @Synchronized fun acceptWebState(json: String) {
        val previous = state()
        val incoming = try { JSONObject(json) } catch (_: Exception) { return }
        val before = flatten(previous)
        val after = flatten(incoming)
        prefs.edit().putString("state", incoming.toString()).apply()
        val now = System.currentTimeMillis()
        for ((section, entries) in after) for ((key, raw) in entries) {
            if (before[section]?.get(key) != raw) push(section, key, raw, now)
        }
        for ((section, entries) in before) for (key in entries.keys) {
            if (after[section]?.containsKey(key) != true) push(section, key, null, now)
        }
    }

    @Synchronized fun update(section: String, key: String, value: Any?) {
        val root = state()
        if (section == "prefs") { if (value == null) root.remove(key) else root.put(key, value) }
        else if (key == "_") { if (value == null) root.remove(section) else root.put(section, value) }
        else {
            val bucket = root.optJSONObject(section) ?: JSONObject().also { root.put(section, it) }
            if (value == null) bucket.remove(key) else bucket.put(key, value)
        }
        prefs.edit().putString("state", root.toString()).apply()
        val raw = value?.let(::encode)
        val time = System.currentTimeMillis()
        val id = "$section/$key"
        times[id] = time
        hashes[id] = raw ?: "<deleted>"
        persistMeta(id, time, raw)
        if (raw != null) push(section, key, raw, time) else push(section, key, null, time)
    }

    fun sync(onState: (JSONObject) -> Unit, onStatus: (String) -> Unit) {
        removeListeners()
        val uid = currentUid
        if (uid == null) { onStatus("Sign in to sync progress"); return }
        onStatus("Syncing")
        val local = state()
        // Seed local timestamps from current data; this is a first-sync bootstrap.
        val localEntries = flatten(local)
        val col = firestore.collection("users").document(uid).collection("kv")
        for ((section, entries) in localEntries) for ((key, raw) in entries) {
            val id = "$section/$key"
            if (!times.containsKey(id)) {
                val savedTime = meta.getLong("t:$id", 0L)
                times[id] = savedTime
                hashes[id] = meta.getString("h:$id", raw) ?: raw
            }
        }
        val registration = col.addSnapshotListener { snap, error ->
            if (error != null) { onStatus("Sync error: ${error.localizedMessage}"); return@addSnapshotListener }
            if (snap == null) return@addSnapshotListener
            val merged = state()
            var changed = false
            val remoteIds = mutableSetOf<String>()
            for (doc in snap.documents) {
                val entries = doc.get("e") as? Map<*, *> ?: continue
                for ((entryKeyAny, payloadAny) in entries) {
                    val key = entryKeyAny as? String ?: continue
                    val payload = payloadAny as? Map<*, *> ?: continue
                    val t = (payload["t"] as? Number)?.toLong() ?: continue
                    val raw = payload["v"] as? String
                    val id = "${doc.id}/$key"
                    remoteIds += id
                    if (t > (times[id] ?: 0L)) {
                        val incoming = if ((doc.id == "hist" || doc.id == "exams") && key == "_" && raw != null) unionValue(doc.id, merged.optJSONArray(doc.id), raw) else raw
                        applyValue(merged, doc.id, key, incoming)
                        times[id] = t
                        hashes[id] = incoming ?: "<deleted>"
                        persistMeta(id, t, incoming)
                        changed = true
                        if (incoming != raw) push(doc.id, key, incoming, t)
                    } else if ((times[id] ?: 0L) > t && hashes[id] != null) {
                        push(doc.id, key, hashes[id].takeUnless { it == "<deleted>" }, times[id]!!)
                    }
                }
            }
            for ((section, entries) in localEntries) for ((key, raw) in entries) {
                val id = "$section/$key"
                if (id !in remoteIds) { val t = times[id] ?: 0L; push(section, key, raw, if (t > 0L) t else System.currentTimeMillis()) }
            }
            meta.getStringSet("pending-deletes", emptySet()).orEmpty().toList().forEach { id ->
                val split = id.indexOf('/')
                if (split > 0) {
                    val section = id.substring(0, split); val key = id.substring(split + 1)
                    if (id in remoteIds) push(section, key, null, times[id] ?: System.currentTimeMillis())
                    else forgetPendingDelete(id)
                }
            }
            if (changed) {
                synchronized(this) { prefs.edit().putString("state", merged.toString()).apply() }
                onState(merged)
            }
            onStatus("Synced")
        }
        synchronized(listeners) { listeners += registration }
    }

    suspend fun writeEntry(section: String, key: String, entry: ProgressEntry) {
        val uid = currentUid ?: error("Sign in before syncing progress")
        firestore.collection("users").document(uid).collection("kv").document(section)
            .set(mapOf("e" to mapOf(key to mapOf("v" to entry.v, "t" to entry.t, "by" to "android")), "u" to System.currentTimeMillis()), SetOptions.merge()).await()
    }

    private fun push(section: String, key: String, raw: String?, time: Long) {
        val id = "$section/$key"
        times[id] = time
        hashes[id] = raw ?: "<deleted>"
        persistMeta(id, time, raw)
        if (raw == null) rememberPendingDelete(id)
        val uid = currentUid ?: return // local changes and tombstones remain queued until sign-in
        firestore.collection("users").document(uid).collection("kv").document(section)
            .set(mapOf("e" to mapOf(key to mapOf("v" to raw, "t" to time, "by" to "android")), "u" to time), SetOptions.merge())
            .addOnSuccessListener { if (raw == null) forgetPendingDelete(id) }
            .addOnFailureListener { /* Firestore offline persistence retries when connectivity returns. */ }
    }

    private fun rememberPendingDelete(id: String) {
        val set = meta.getStringSet("pending-deletes", emptySet()).orEmpty().toMutableSet()
        set += id
        meta.edit().putStringSet("pending-deletes", set).apply()
    }

    private fun forgetPendingDelete(id: String) {
        val set = meta.getStringSet("pending-deletes", emptySet()).orEmpty().toMutableSet()
        set -= id
        meta.edit().putStringSet("pending-deletes", set).apply()
    }

    private fun persistMeta(id: String, time: Long, raw: String?) {
        meta.edit().putLong("t:$id", time).putString("h:$id", raw ?: "<deleted>").apply()
    }

    private fun unionValue(section: String, local: JSONArray?, remoteRaw: String): String {
        val remote = try { JSONArray(remoteRaw) } catch (_: Exception) { JSONArray() }
        val all = mutableListOf<JSONObject>()
        val seen = mutableSetOf<String>()
        fun add(array: JSONArray?) { if (array == null) return; for (i in 0 until array.length()) {
            val item = array.optJSONObject(i) ?: continue
            val id = if (item.has("t")) item.opt("t").toString() else item.toString()
            if (seen.add(id)) all += item
        } }
        add(remote); add(local)
        all.sortByDescending { it.optLong("t") }
        if (section == "hist" && all.size > 400) all.subList(400, all.size).clear()
        return JSONArray(all).toString()
    }

    private fun encode(value: Any?): String = when (value) {
        null -> "null"
        is String -> JSONObject.quote(value)
        is JSONObject, is JSONArray, is Number, is Boolean -> value.toString()
        else -> JSONObject.quote(value.toString())
    }

    @Synchronized fun stopSync() { removeListeners() }

    @Synchronized private fun removeListeners() { listeners.forEach { it.remove() }; listeners.clear() }

    private fun flatten(state: JSONObject): Map<String, Map<String, String>> {
        val out = mutableMapOf<String, MutableMap<String, String>>()
        val keys = state.keys()
        while (keys.hasNext()) {
            val section = keys.next(); val value = state.opt(section)
            if (section == "pref_theme") continue // same per-device exclusion as the website
            if (section.startsWith("pref_")) {
                out.getOrPut("prefs") { mutableMapOf() }[section] = encode(value)
                continue
            }
            val bucket = out.getOrPut(section) { mutableMapOf() }
            if (value is JSONObject && section !in setOf("hist", "exams", "last")) {
                val children = value.keys(); while (children.hasNext()) { val key = children.next(); bucket[key] = encode(value.opt(key)) }
            } else bucket["_"] = encode(value)
        }
        return out
    }

    private fun applyValue(root: JSONObject, section: String, key: String, raw: String?) {
        if (raw == null) {
            if (key == "_") root.remove(section) else root.optJSONObject(section)?.remove(key)
            return
        }
        val value = try { JSONObject("{\"v\":$raw}").opt("v") } catch (_: Exception) { raw }
        if (section == "prefs") root.put(key, value)
        else if (key == "_") root.put(section, value)
        else (root.optJSONObject(section) ?: JSONObject().also { root.put(section, it) }).put(key, value)
    }
}
