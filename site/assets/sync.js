/* Glidepath sync: keeps localStorage state ('glidepath-v1') in step with Firestore and the Android app.
   Model (shared with the app): users/{uid}/kv/{section}  →  { e: { <entryKey>: { v: <JSON string | null>, t: <ms>, by: 'web'|'android' } } }
   Each entry merges independently, newest t wins; v:null is a deletion. 'hist' and 'exams' merge as unions. */
const CFG = window.GLIDEPATH_FIREBASE;
const G = window.G;
const VER = '12.19.0';
const KEY = 'glidepath-v1', META = 'glidepath-sync';
const WHOLE = new Set(['hist', 'exams', 'last']);       // synced as one entry
const UNION = { hist: 't', exams: 't' };                 // append-only lists: merge by this id
const SKIP = new Set(['pref_theme']);                    // per-device

let fb = null, db = null, auth = null, user = null, unsub = null, pushT = null, applying = false;
let status = 'local';
const meta = loadMeta();

function loadMeta() { try { return JSON.parse(localStorage.getItem(META)) || {}; } catch (e) { return {}; } }
function saveMeta() { try { localStorage.setItem(META, JSON.stringify(meta)); } catch (e) {} }
const hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); };
const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

/* ---------- flatten state into entries ---------- */
function entries(state) {
  const out = {}; // section -> sub -> json
  for (const k of Object.keys(state)) {
    if (SKIP.has(k)) continue;
    const v = state[k];
    if (k.startsWith('pref_')) { (out.prefs = out.prefs || {})[k] = JSON.stringify(v); continue; }
    if (isObj(v) && !WHOLE.has(k)) { const o = (out[k] = {}); for (const s of Object.keys(v)) o[s] = JSON.stringify(v[s]); }
    else (out[k] = {})._ = JSON.stringify(v);
  }
  return out;
}
function setEntry(state, sec, sub, val) {
  if (sec === 'prefs') { if (val === undefined) delete state[sub]; else state[sub] = val; return; }
  if (sub === '_') { if (val === undefined) delete state[sec]; else state[sec] = val; return; }
  if (!isObj(state[sec])) state[sec] = {};
  if (val === undefined) delete state[sec][sub]; else state[sec][sub] = val;
}
const T = (sec, sub) => (meta.t && meta.t[sec] && meta.t[sec][sub]) || 0;
const H = (sec, sub) => meta.h && meta.h[sec] && meta.h[sec][sub];
function mark(sec, sub, t, h) {
  meta.t = meta.t || {}; meta.h = meta.h || {};
  (meta.t[sec] = meta.t[sec] || {})[sub] = t;
  if (h === undefined) delete (meta.h[sec] = meta.h[sec] || {})[sub]; else (meta.h[sec] = meta.h[sec] || {})[sub] = h;
}

/* ---------- local → remote ---------- */
function changed() {
  const now = Date.now(), cur = entries(G.S.state), dirty = {};
  for (const sec of Object.keys(cur)) for (const sub of Object.keys(cur[sec])) {
    const h = hash(cur[sec][sub]);
    if (H(sec, sub) !== h) { (dirty[sec] = dirty[sec] || {})[sub] = { v: cur[sec][sub], t: now, by: 'web' }; mark(sec, sub, now, h); }
  }
  // deletions: known locally before, gone now
  for (const sec of Object.keys(meta.h || {})) for (const sub of Object.keys(meta.h[sec])) {
    if (!(cur[sec] && sub in cur[sec])) { (dirty[sec] = dirty[sec] || {})[sub] = { v: null, t: now, by: 'web' }; mark(sec, sub, now, undefined); }
  }
  return dirty;
}
function schedulePush() { if (!user || applying) return; clearTimeout(pushT); pushT = setTimeout(push, 1200); setStatus('pending'); }
async function push() {
  if (!user) return;
  const dirty = changed(); saveMeta();
  const secs = Object.keys(dirty);
  if (!secs.length) { setStatus(navigator.onLine ? 'synced' : 'offline'); return; }
  const { doc, writeBatch } = fb;
  const b = writeBatch(db);
  secs.forEach(sec => b.set(doc(db, 'users', user.uid, 'kv', sec), { e: dirty[sec], u: Date.now() }, { merge: true }));
  try { await b.commit(); setStatus('synced'); } catch (e) { console.warn('[sync] push failed', e); setStatus(navigator.onLine ? 'error' : 'offline'); }
}

/* ---------- remote → local ---------- */
let firstPull = true;
function applyRemote(snap) {
  const st = G.S.state; let n = 0, needPush = false;
  applying = true;
  snap.docChanges().forEach(ch => {
    const sec = ch.doc.id, e = (ch.doc.data() || {}).e || {};
    for (const sub of Object.keys(e)) {
      const r = e[sub]; if (!r || typeof r.t !== 'number') continue;
      if (r.t <= T(sec, sub)) continue;
      let val = r.v == null ? undefined : JSON.parse(r.v);
      if (UNION[sec] && sub === '_' && Array.isArray(val)) {
        const id = UNION[sec], seen = new Set(), loc = Array.isArray(st[sec]) ? st[sec] : [];
        const all = val.concat(loc).filter(x => { const k = x && x[id] != null ? x[id] : JSON.stringify(x); if (seen.has(k)) return false; seen.add(k); return true; });
        all.sort((a, b) => (b[id] || 0) - (a[id] || 0)); if (sec === 'hist') all.length = Math.min(all.length, 400);
        if (all.length !== val.length) needPush = true;
        val = all;
      }
      setEntry(st, sec, sub, val);
      mark(sec, sub, r.t, val === undefined ? undefined : hash(JSON.stringify(val)));
      n++;
    }
  });
  saveMeta(); G.S.saveNow(); applying = false;
  if (needPush) { // union added local items: mark them dirty
    ['hist', 'exams'].forEach(s => { if (meta.h && meta.h[s]) meta.h[s]._ = 'x'; }); schedulePush();
  }
  if (n) {
    const fresh = performance.now() < 8000;
    if (firstPull && fresh && !sessionStorage.getItem('gp-sync-reload')) { sessionStorage.setItem('gp-sync-reload', 1); location.reload(); return; }
    if (!firstPull) G.toast('Synced ' + n + ' change' + (n > 1 ? 's' : '') + ' from another device');
  }
  if (firstPull) { firstPull = false; sessionStorage.removeItem('gp-sync-reload'); push(); }
}

/* ---------- UI: account pill in the top bar ---------- */
const DOT = { local: '#8E94A0', pending: '#E3B416', synced: '#1E8A5A', offline: '#8E94A0', error: '#B8341D' };
const LABEL = { local: 'Sign in to sync', pending: 'Syncing…', synced: 'Synced', offline: 'Offline · will sync', error: 'Sync error' };
let pill;
function setStatus(s) { status = s; render(); }
function render() {
  const nav = document.querySelector('.top nav'); if (!nav) return;
  if (!pill) { pill = document.createElement('button'); pill.className = 'pill syncpill'; nav.appendChild(pill); pill.onclick = onPill; }
  const name = user ? (user.displayName || user.email || 'Account').split(' ')[0] : 'Sign in';
  pill.innerHTML = `<i style="width:9px;height:9px;border-radius:50%;background:${DOT[user ? status : 'local']};display:inline-block;flex:none${status === 'pending' ? ';animation:pulse 1s infinite' : ''}"></i><span class="t">${user ? name : 'Sign in'}</span>`;
  pill.title = user ? LABEL[status] + ' · ' + (user.email || '') : 'Sign in with Google to sync with your phone';
}
async function onPill() {
  if (!user) {
    try { await fb.signInWithPopup(auth, new fb.GoogleAuthProvider()); }
    catch (e) { if (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') fb.signInWithRedirect(auth, new fb.GoogleAuthProvider()); else G.toast('Sign-in failed: ' + (e.code || e.message)); }
    return;
  }
  if (confirm(`Signed in as ${user.email}\n${LABEL[status]}.\n\nSign out on this browser? (Your data stays here and in the cloud.)`)) fb.signOut(auth);
}

/* ---------- boot ---------- */
async function boot() {
  if (!CFG || !G || !G.S) { return; }
  const base = `https://www.gstatic.com/firebasejs/${VER}/`;
  const [app, a, f] = await Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-auth.js'), import(base + 'firebase-firestore.js')]);
  fb = { ...a, ...f };
  const fapp = app.initializeApp(CFG);
  auth = a.getAuth(fapp);
  try { db = f.initializeFirestore(fapp, { localCache: f.persistentLocalCache({ tabManager: f.persistentMultipleTabManager() }) }); }
  catch (e) { db = f.getFirestore(fapp); }
  if (window.GLIDEPATH_EMULATOR) { a.connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true }); f.connectFirestoreEmulator(db, '127.0.0.1', 8085); }
  render();
  // every write the site makes to its state goes through localStorage.setItem
  const orig = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) { orig.call(this, k, v); if (this === localStorage && k === KEY) schedulePush(); };
  addEventListener('online', () => { setStatus('pending'); push(); });
  addEventListener('offline', () => setStatus('offline'));
  addEventListener('pagehide', () => { if (user) push(); });
  a.onAuthStateChanged(auth, u => {
    if (unsub) { unsub(); unsub = null; }
    user = u;
    if (!u) { setStatus('local'); return; }
    if (meta.uid !== u.uid) { meta.uid = u.uid; meta.t = {}; meta.h = {}; saveMeta(); } // new account: everything local is new
    setStatus('pending'); firstPull = true;
    unsub = f.onSnapshot(f.collection(db, 'users', u.uid, 'kv'), { includeMetadataChanges: false }, applyRemote, e => { console.warn('[sync] listen failed', e); setStatus('error'); });
  });
  G.sync = { get user() { return user; }, get status() { return status; }, push, signIn: onPill };
  if (window.GLIDEPATH_EMULATOR) G.sync._test = { fb, auth, db };
}
boot().catch(e => console.warn('[sync] disabled:', e));
