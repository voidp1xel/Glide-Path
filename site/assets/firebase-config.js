/* Glidepath sync configuration.
   1. Create a Firebase project (console.firebase.google.com) → add a Web app → copy its config here.
   2. Enable Authentication → Sign-in method → Google.
   3. Create a Firestore database and publish the rules in firebase/firestore.rules.
   Leave it as null and the site stays local-only (nothing is sent anywhere). */
window.GLIDEPATH_FIREBASE = null;
/* e.g.
window.GLIDEPATH_FIREBASE = {
  apiKey: '…', authDomain: 'your-project.firebaseapp.com', projectId: 'your-project',
  storageBucket: 'your-project.appspot.com', messagingSenderId: '…', appId: '…',
};
*/
/* Local testing against the Firebase emulator suite (firebase emulators:start). */
window.GLIDEPATH_EMULATOR = false;
