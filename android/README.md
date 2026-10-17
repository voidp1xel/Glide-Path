# Glidepath Android app

The app packages the website under `app/src/main/assets/www` and opens it in an offline-capable Android WebView. That carries the website's current lessons, diagrams, mind maps, simulations, games, question banks, calculators, revision tools, planner, ADAPT practice, search, history, and other existing features into the Android app. The bundled website is a snapshot; refresh it with `python3 android/tools/sync_site_assets.py` after site content/assets are updated. The script reads `site/` and writes only to `android/`.

A native sync bar connects the WebView's `glidepath-v1` progress state to a local-first Firestore client. Firebase sync metadata is separate from web state and is never written back into the site. The native bridge observes only `localStorage['glidepath-v1']`.

The native **Flight deck** adds a focused daily task list, editable task waypoints, a recurring pre-flight checklist, scheduled study nudges, and an Android home-screen widget. Flight deck checks/tasks are cached in Android app storage (`flight_deck_v1`) and sync separately to `users/{uid}/appData/flightDeck` when signed in. They do not enter the website's `glidepath-v1` progress record. Reminder notifications and widget content are Android-only. The **Study library** tab opens the bundled website and its existing synced progress.

## Firebase status and setup

The repository currently has no production Firebase configuration:

- `site/assets/firebase-config.js` connects localhost to demo emulators and leaves non-local hosts with `window.GLIDEPATH_FIREBASE = null`.
- `.firebaserc` selects `demo-glidepath`, a Firebase emulator/demo project id, not a configured production project.
- There is no `android/app/google-services.json`.
- `firebase use` reports that this machine is not logged into Firebase CLI (`firebase login` is required to inspect/deploy a real project).

With no Android Firebase config, Gradle defaults the app to the local emulators at `10.0.2.2:9099` and `10.0.2.2:8085` (Android emulator to host ports 9099/8085), and offers email/password emulator accounts. For a local cross-client sync session, start both services from the repository root in separate terminals:

Terminal 1:

```sh
firebase emulators:start --only auth,firestore
```

Terminal 2:

```sh
python3 tools/serve.py
```

Open the local website at `http://localhost:8765`, tap its sync pill, and use an email/password. In Android Studio run the app and enter the same email/password in the native sync dialog. Both connect to the same local Auth and Firestore emulators. This is for local development only; emulator accounts do not sync with the live production website. For production, register Android app id `com.glidepath.app` in the same Firebase project used by the website, obtain its `google-services.json`, enable Google Authentication and Firestore, and configure Google sign-in to use the same web client ID/account. Once the JSON exists, Gradle automatically uses the production Firebase options and disables emulator mode. The website's production Firebase config must still be set by the owner; only sync code was changed here, with no website information or non-sync feature changes.

Never include service-account credentials in the APK. The existing `firebase/firestore.rules` limits each authenticated user to their own user document tree.

## Project layout

- `MainActivity.kt`: WebView shell, Google/emulator sign-in, and progress JavaScript bridge.
- `FlightDeck.kt`: native daily plan/checklist UI, local storage, reminder scheduling and notification receivers.
- `FlightDeckWidgetProvider.kt`: home-screen widget showing the next task and today's completion count.
- `data/ProgressRepository.kt`: local progress persistence and Firestore sync, matching the web schema.
- `data/ProgressEntry.kt`: shared entry model.
- `tools/sync_site_assets.py`: read-only site importer; writes Android assets only.
- `app/src/main/assets/www/`: bundled copy of the site.

Open `android/` in Android Studio with a current JDK and Android SDK. The project uses Android Gradle Plugin 8.7.3, Kotlin 2.0.21, compile SDK 35, and Firebase BoM 33.7.0. A Gradle wrapper is not included yet. Production Google sign-in/build requires `google-services.json`.
