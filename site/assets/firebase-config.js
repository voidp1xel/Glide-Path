/* Glidepath sync configuration.
   Local development uses the repo's Firebase emulators. Production remains local-only
   until the owner supplies the real Firebase web-app config. */
const GP_LOCAL_HOSTS = new Set(['localhost', '127.0.0.1']);
const GP_LOCAL_EMULATOR = GP_LOCAL_HOSTS.has(location.hostname);
window.GLIDEPATH_EMULATOR = GP_LOCAL_EMULATOR;
window.GLIDEPATH_FIREBASE = GP_LOCAL_EMULATOR ? {
  apiKey: 'demo-api-key',
  authDomain: 'demo-glidepath.firebaseapp.com',
  projectId: 'demo-glidepath',
  storageBucket: 'demo-glidepath.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:glidepath-emulator',
} : null;
