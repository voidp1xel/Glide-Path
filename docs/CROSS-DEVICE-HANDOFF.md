# Cross-device sync and Android app handoff

Last updated: 2026-10-16

## Owner constraints

- Android should include the website's existing features.
- Only the sync part of the database may be changed.
- Do not change website information or features.

## Implemented in this turn

- Added a native Android Flight deck alongside the untouched website WebView: daily task checks, a recurring study-start checklist, custom task entry, a daily reminder time picker, notification scheduling, and a home-screen widget showing the next task and task count.
- Added app-only Flight deck storage in `SharedPreferences` (`flight_deck_v1`), separate from the website's `glidepath-v1` progress key. Daily task/checklist checks are keyed by local date and reset on the next date. When signed in, today's tasks/checklist sync through `users/{uid}/appData/flightDeck`; they do not enter or change website progress. The widget refreshes when state changes.
- Added Android notification permission handling on Android 13+, daily inexact alarms (no exact-alarm access needed), and boot rescheduling. Reminder notifications open the app.
- Added a dark ink / paper / muted pastel native palette based on the existing site theme. The existing website is available from the Study library tab and retains the existing web progress bridge.
- Added `FlightDeck.kt`, `FlightDeckWidgetProvider.kt`, widget layout/provider metadata, receiver manifest declarations, and JVM 17 compile targets. Fixed a Kotlin nullability compile issue in the sync repository.
- Built the emulator debug APK successfully with `:app:assembleDebug -PfirebaseEmulator=true`. No test suite was run. APK output: `android/app/build/outputs/apk/debug/app-debug.apk`.

- Packaged the current website as-is under `android/app/src/main/assets/www/` so the Android app can offer the existing lesson renderers, diagrams, mind maps, games, question banks, revision, tools, planning, search, ADAPT and other website features offline.
- Added `android/tools/sync_site_assets.py`; it reads `site/` and writes only to `android/` to refresh the bundled snapshot.
- Replaced the earlier partial Compose feature mockups with an Android WebView shell and a native sync control.
- Added a JavaScript bridge that observes only `localStorage['glidepath-v1']`, imports initial WebView state, receives local edits, and applies remote merged state back to the website.
- Implemented local-first Firestore syncing using the existing `users/{uid}/kv/{section}` schema: per-entry timestamps, tombstones (including a persisted pending-delete queue), remote snapshots, and `hist`/`exams` unions. The bridge does not store Firebase metadata in the website's state.
- Added Firebase emulator defaults when no `google-services.json` exists. App id and ports match repo config: `demo-glidepath`, Auth 9099, Firestore 8085; the Android emulator reaches host services at `10.0.2.2`. The localhost website and Android shell use email/password emulator accounts, so the same test user can sign in on both.
- Website information and non-sync features were not edited. Only the website sync configuration and emulator sign-in path were changed in `site/assets/firebase-config.js` and `site/assets/sync.js`; all other website files and `firebase/firestore.rules` remain untouched.
- Build verification: debug APK assembly succeeded as described above; no tests were run.

## Verified by Claude (2026-10-16, follow-up session)

- **Emulators run on this Mac** with Android Studio's bundled Java (no system Java is installed): `JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" firebase emulators:start --only auth,firestore --project demo-glidepath`.
- **Website ↔ website sync works end to end** against the emulators. Two "devices" were simulated as `http://localhost:8765` and `http://127.0.0.1:8765` (separate localStorage), signed in to the same emulator account (`pilot@test.dev`): a progress entry added on A appeared on B after sign-in (cold-start pull); an entry added on B and a deletion on B appeared live on A without reload (tombstone honoured). Test entries were removed afterwards.
- **Android APK rebuilt** after refreshing the bundled site (`python3 android/tools/sync_site_assets.py`, 400 assets) with `gradle :app:assembleDebug -PfirebaseEmulator=true --offline` using the cached Gradle 9.7.1 (`~/.gradle/wrapper/dists/gradle-9.7.1-bin/.../bin/gradle`; the repo has no `gradlew`). Build OK; APK at `android/app/build/outputs/apk/debug/app-debug.apk`.
- **Not yet verified:** the Android app's sync at runtime — this Mac has no Android Virtual Device (no system image) and no phone connected; `adb` is in `~/Library/Android/sdk/platform-tools`. Re-run `sync_site_assets.py` before every APK build, or the app ships an old copy of the site.

## What blocks production Firebase sync

This repo does not identify a configured production Firebase project:

- The website sync configuration now connects to demo Auth/Firestore emulators only when served from `localhost` or `127.0.0.1`; production hosts still get `window.GLIDEPATH_FIREBASE = null`.
- `.firebaserc` uses `demo-glidepath`, which is the local Firebase emulator/demo project id, not a production project alias.
- `android/app/google-services.json` is absent.
- `firebase use` returned an authentication error saying to run `firebase login`; the current CLI session cannot inspect/deploy the owner's Firebase projects.

So the code-level sync client is implemented, and the local emulator path is ready, but real website-to-phone cloud sync cannot be activated until the actual project is known and configured on both clients. I did not invent a production project, deploy rules, alter website information/features, or create production credentials. Start `firebase emulators:start --only auth,firestore` and `python3 tools/serve.py` in separate terminals from the repo root. Open `http://localhost:8765`, then sign in with the same email/password in the website sync pill and Android sync dialog; those test credentials exist only in the emulator.

## Shared data contract

```text
users/{uid}/kv/{section}
  e.{entryKey} = { v: JSON string | null, t: epoch-ms number, by: "web" | "android" }
  u = section updated epoch-ms number
```

The web client splits object sections into entries, uses `_` for whole values and `hist`, `exams`, `last`; timestamp-newest wins for regular values, null `v` is a tombstone, and history/exam arrays union by item `t`.

## Next steps once Firebase project access is available

1. Sign in to Firebase CLI and confirm the intended production project id.
2. Register the Android package `com.glidepath.app`; enable Google Auth and Firestore; obtain Android `google-services.json` and the web OAuth client id.
3. Add the production web Firebase client config in `site/assets/firebase-config.js` as a sync-only change; leave website information and features untouched.
4. Verify the web and Android Google flows resolve to the same Firebase UID.
5. Run Auth/Firestore emulators and test add/update/delete, history union, cold-start pull, and offline reconnect.
6. Build Android Studio APK, then test against a controlled Firebase project after the emulator run passes.

## Workspace safety

The checkout has extensive pre-existing modifications and untracked additions across `content/` and `site/`. Preserve them. Do not reset, clean, or revert the workspace. This turn's changes are under `android/`, `firebase/sync-schema.md`, `docs/CROSS-DEVICE-HANDOFF.md`, and the two sync-only files `site/assets/firebase-config.js` and `site/assets/sync.js`.
