package com.glidepath.app

import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ListenerRegistration
import java.time.LocalDate
import java.time.LocalTime
import java.time.format.DateTimeFormatter
import org.json.JSONArray
import org.json.JSONObject

private val ink = Color(0xFF16181D)
private val muted = Color(0xFF686D75)
private val paper = Color(0xFFFBFAF7)
private val line = Color(0xFFE7E4DD)
private val gold = Color(0xFFF5E8CA)
private val blue = Color(0xFFE3EDF5)
private val mint = Color(0xFFE3F0E8)

internal data class DeckItem(val id: String, val title: String, val done: Boolean)

/** App-only flight plan state is cached locally and synced under the authenticated user's appData tree. */
internal object FlightDeckStore {
    private const val PREFS = "flight_deck_v1"
    private val defaultTasks = listOf("25-minute focused study block", "Complete a short practice set", "Review one tricky concept")
    private val checklist = listOf("Set a clear study destination", "Water and a short stretch", "Review yesterday’s open loops", "Finish with a 2-minute recall")
    @Volatile private var activeUid: String? = null
    @Volatile private var remoteListener: ListenerRegistration? = null
    @Volatile private var applyingRemote = false
    private fun prefs(context: Context) = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
    private fun date() = LocalDate.now().toString()
    private fun key(kind: String) = "${kind}_${date()}"

    fun tasks(context: Context): List<DeckItem> = decode(prefs(context).getString(key("tasks"), null), defaultTasks)
    fun checks(context: Context): List<DeckItem> = decode(prefs(context).getString(key("checks"), null), checklist)
    private fun decode(raw: String?, defaults: List<String>): List<DeckItem> {
        if (raw == null) return defaults.mapIndexed { i, s -> DeckItem("$i", s, false) }
        return try { val a = JSONArray(raw); (0 until a.length()).map { i -> a.getJSONObject(i).let { DeckItem(it.getString("id"), it.getString("title"), it.optBoolean("done")) } } } catch (_: Exception) { defaults.mapIndexed { i, s -> DeckItem("$i", s, false) } }
    }
    private fun write(context: Context, kind: String, items: List<DeckItem>) {
        val a = JSONArray(); items.forEach { a.put(JSONObject().put("id", it.id).put("title", it.title).put("done", it.done)) }
        prefs(context).edit().putString(key(kind), a.toString()).apply()
        prefs(context).edit().putString("cloud_day", date()).putLong("cloud_updated", System.currentTimeMillis()).apply()
        pushCloud(context)
        refreshWidgets(context)
    }
    fun toggle(context: Context, kind: String, id: String) { val xs = if (kind == "tasks") tasks(context) else checks(context); write(context, kind, xs.map { if (it.id == id) it.copy(done = !it.done) else it }) }
    fun addTask(context: Context, title: String) { if (title.isBlank()) return; val xs = tasks(context).toMutableList(); xs.add(0, DeckItem("custom_${System.currentTimeMillis()}", title.trim(), false)); write(context, "tasks", xs) }
    fun reminder(context: Context) = Triple(prefs(context).getBoolean("reminder_on", false), prefs(context).getInt("reminder_hour", 18), prefs(context).getInt("reminder_minute", 0))
    fun setReminder(context: Context, enabled: Boolean, hour: Int, minute: Int) {
        prefs(context).edit().putBoolean("reminder_on", enabled).putInt("reminder_hour", hour).putInt("reminder_minute", minute).apply()
        val intent = PendingIntent.getBroadcast(context, 704, Intent(context, StudyReminderReceiver::class.java), PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        val alarm = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        if (!enabled) alarm.cancel(intent) else {
            val now = java.util.Calendar.getInstance(); val next = java.util.Calendar.getInstance().apply { set(java.util.Calendar.HOUR_OF_DAY, hour); set(java.util.Calendar.MINUTE, minute); set(java.util.Calendar.SECOND, 0); set(java.util.Calendar.MILLISECOND, 0); if (timeInMillis <= now.timeInMillis) add(java.util.Calendar.DAY_OF_YEAR, 1) }
            alarm.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, next.timeInMillis, intent)
        }
    }
    fun refreshWidgets(context: Context) { val intent = Intent(context, FlightDeckWidgetProvider::class.java).setAction(android.appwidget.AppWidgetManager.ACTION_APPWIDGET_UPDATE); val mgr = android.appwidget.AppWidgetManager.getInstance(context); intent.putExtra(android.appwidget.AppWidgetManager.EXTRA_APPWIDGET_IDS, mgr.getAppWidgetIds(android.content.ComponentName(context, FlightDeckWidgetProvider::class.java))); context.sendBroadcast(intent) }
    fun startSync(context: Context, uid: String?, onRemote: () -> Unit) {
        remoteListener?.remove(); remoteListener = null; activeUid = uid
        if (uid == null) return
        val ref = FirebaseFirestore.getInstance().collection("users").document(uid).collection("appData").document("flightDeck")
        remoteListener = ref.addSnapshotListener { snap, error ->
            if (error != null || snap == null) return@addSnapshotListener
            val remoteDay = snap.getString("day") ?: return@addSnapshotListener
            val updated = snap.getLong("updatedAt") ?: 0L
            val prefs = prefs(context)
            if (remoteDay == date() && updated > prefs.getLong("cloud_updated", 0L)) {
                applyingRemote = true
                prefs.edit().putString(key("tasks"), snap.getString("tasks")).putString(key("checks"), snap.getString("checks")).putString("cloud_day", remoteDay).putLong("cloud_updated", updated).apply()
                applyingRemote = false
                refreshWidgets(context); onRemote()
            } else if (remoteDay == date() && updated < prefs.getLong("cloud_updated", 0L)) pushCloud(context)
        }
    }
    private fun pushCloud(context: Context) {
        val uid = activeUid ?: return
        if (applyingRemote) return
        FirebaseFirestore.getInstance().collection("users").document(uid).collection("appData").document("flightDeck")
            .set(mapOf("day" to date(), "tasks" to prefs(context).getString(key("tasks"), null), "checks" to prefs(context).getString(key("checks"), null), "updatedAt" to prefs(context).getLong("cloud_updated", System.currentTimeMillis())))
    }
    fun summary(context: Context): String { val ts = tasks(context); val done = ts.count { it.done }; return "$done / ${ts.size} tasks cleared" }
    fun nextTask(context: Context): String = tasks(context).firstOrNull { !it.done }?.title ?: "Flight plan complete ✦"
}

@Composable
internal fun FlightDeckScreen(modifier: Modifier, refresh: Int, onChanged: () -> Unit, onOpenSite: () -> Unit, onReminder: (Boolean, Int, Int) -> Unit) {
    val context = androidx.compose.ui.platform.LocalContext.current
    var taskText by remember { mutableStateOf("") }
    var dialog by remember { mutableStateOf(false) }
    val taskList = remember(refresh) { FlightDeckStore.tasks(context) }
    val checks = remember(refresh) { FlightDeckStore.checks(context) }
    val reminder = FlightDeckStore.reminder(context)
    val today = LocalDate.now().format(DateTimeFormatter.ofPattern("EEEE · d MMMM"))
    LazyColumn(modifier.background(paper), contentPadding = PaddingValues(start = 20.dp, end = 20.dp, top = 18.dp, bottom = 28.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                Column { Text("TODAY’S FLIGHT PLAN", color = muted, fontSize = 11.sp, letterSpacing = 1.8.sp); Text(today, color = ink, style = MaterialTheme.typography.titleMedium) }
                Box(Modifier.size(54.dp).background(gold, CircleShape), contentAlignment = Alignment.Center) { Text("✦", color = ink, fontSize = 25.sp) }
            }
        }
        item {
            Column(Modifier.fillMaxWidth().background(ink, RoundedCornerShape(24.dp)).clickable(onClick = onOpenSite).padding(22.dp)) {
                Text("YOUR NEXT LEG", color = Color(0xFFBFC7D1), fontSize = 11.sp, letterSpacing = 1.6.sp)
                Spacer(Modifier.height(8.dp)); Text(FlightDeckStore.nextTask(context), color = Color.White, style = MaterialTheme.typography.headlineSmall)
                Spacer(Modifier.height(16.dp)); Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) { Text(FlightDeckStore.summary(context), color = Color(0xFFD9DEE5)); Text("OPEN LIBRARY ↗", color = Color(0xFFF2D7A4), fontSize = 11.sp) }
            }
        }
        item { SectionHeading("Study tasks", "A small plan beats a perfect one") }
        items(taskList, key = { it.id }) { item -> DeckCheckRow(item, blue, onClick = { FlightDeckStore.toggle(context, "tasks", item.id); onChanged() }) }
        item {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = taskText, onValueChange = { taskText = it }, modifier = Modifier.weight(1f), singleLine = true, placeholder = { Text("Add a waypoint…") }, shape = RoundedCornerShape(16.dp))
                Button(onClick = { FlightDeckStore.addTask(context, taskText); taskText = ""; onChanged() }, shape = RoundedCornerShape(16.dp)) { Text("Add") }
            }
        }
        item { SectionHeading("Pre-flight checklist", "Make the session easy to start") }
        items(checks, key = { "c_${it.id}" }) { item -> DeckCheckRow(item, mint, onClick = { FlightDeckStore.toggle(context, "checks", item.id); onChanged() }) }
        item {
            Column(Modifier.fillMaxWidth().background(gold, RoundedCornerShape(22.dp)).padding(18.dp)) {
                Text("DAILY NUDGE", color = muted, fontSize = 11.sp, letterSpacing = 1.6.sp); Spacer(Modifier.height(6.dp))
                Text(if (reminder.first) "Reminder set for %02d:%02d".format(reminder.second, reminder.third) else "A gentle reminder to return to your route", color = ink, style = MaterialTheme.typography.titleMedium)
                Spacer(Modifier.height(10.dp)); Row(verticalAlignment = Alignment.CenterVertically) {
                    TextButton(onClick = { dialog = true }) { Text(if (reminder.first) "Change time" else "Set reminder") }
                    if (reminder.first) TextButton(onClick = { onReminder(false, reminder.second, reminder.third); onChanged() }) { Text("Turn off") }
                }
            }
        }
        item { Text("Your checked items reset each day. Tasks and checklist are saved on this device.", color = muted, style = MaterialTheme.typography.bodySmall) }
    }
    if (dialog) {
        var hour by remember { mutableIntStateOf(reminder.second) }; var minute by remember { mutableIntStateOf(reminder.third) }
        AlertDialog(onDismissRequest = { dialog = false }, title = { Text("Choose your daily nudge") }, text = { Column { Text("Local time · %02d:%02d".format(hour, minute)); Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) { OutlinedButton(onClick = { hour = (hour + 23) % 24 }) { Text("− hour") }; OutlinedButton(onClick = { hour = (hour + 1) % 24 }) { Text("+ hour") }; OutlinedButton(onClick = { minute = (minute + 15) % 60 }) { Text("+ 15 min") } } } }, confirmButton = { TextButton(onClick = { onReminder(true, hour, minute); dialog = false; onChanged() }) { Text("Set daily") } }, dismissButton = { TextButton(onClick = { dialog = false }) { Text("Cancel") } })
    }
}

@Composable private fun SectionHeading(title: String, caption: String) { Column { Text(title, color = ink, style = MaterialTheme.typography.titleLarge); Text(caption, color = muted, style = MaterialTheme.typography.bodySmall) } }
@Composable private fun DeckCheckRow(item: DeckItem, tint: Color, onClick: () -> Unit) {
    Row(Modifier.fillMaxWidth().background(Color.White, RoundedCornerShape(18.dp)).clickable(onClick = onClick).padding(horizontal = 15.dp, vertical = 13.dp), verticalAlignment = Alignment.CenterVertically) {
        Box(Modifier.size(26.dp).background(if (item.done) Color(0xFF283E55) else tint, CircleShape), contentAlignment = Alignment.Center) { Text(if (item.done) "✓" else "", color = Color.White) }
        Spacer(Modifier.width(12.dp)); Text(item.title, color = if (item.done) muted else ink, modifier = Modifier.weight(1f), style = MaterialTheme.typography.bodyLarge)
    }
}

class StudyReminderReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        if (Build.VERSION.SDK_INT >= 26) manager.createNotificationChannel(NotificationChannel("study_nudges", "Study nudges", NotificationManager.IMPORTANCE_DEFAULT))
        val open = PendingIntent.getActivity(context, 705, Intent(context, MainActivity::class.java), PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        val notification = NotificationCompat.Builder(context, "study_nudges").setSmallIcon(android.R.drawable.ic_dialog_info).setContentTitle("Your next leg is ready").setContentText(FlightDeckStore.nextTask(context)).setContentIntent(open).setAutoCancel(true).build()
        manager.notify(705, notification)
        val (enabled, hour, minute) = FlightDeckStore.reminder(context); if (enabled) FlightDeckStore.setReminder(context, true, hour, minute)
    }
}

class ReminderBootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        val (enabled, hour, minute) = FlightDeckStore.reminder(context)
        if (enabled && intent?.action == Intent.ACTION_BOOT_COMPLETED) FlightDeckStore.setReminder(context, true, hour, minute)
    }
}
