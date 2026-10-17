# Glidepath cross-device progress store

This is the backend contract for the static website and Android client. It documents the Firestore shape used by `site/assets/sync.js`. The website sync config now points localhost development at the demo emulators; production still needs the owner's Firebase project config.

## Database

Use Firebase Authentication and Cloud Firestore in the same Firebase project. A user is identified by Firebase Auth `uid`, so all clients must sign in to the same account provider/account. Do not use email as a document key.

```text
users/{uid}/kv/{section}
  e: {
    {entryKey}: {
      v: string | null,  // JSON-encoded value; null means deleted
      t: number,         // client Unix epoch milliseconds
      by: "web" | "android"
    }
  }
  u: number              // last section write time (epoch milliseconds)
```

This matches the current website format: each top-level state section has a Firestore document and independently mergeable entry values. Object-valued sections are split by child key; simple values and the `hist`, `exams`, and `last` sections use `_` as the entry key. `hist` and `exams` are append-only union lists keyed by their `t` field. `pref_theme` is intentionally device-local on the website.

The Android-only Flight deck uses a separate document so its task/checklist feature never changes the website's `glidepath-v1` payload:

```text
users/{uid}/appData/flightDeck
  day: "YYYY-MM-DD"       // local day represented by the snapshot
  tasks: string            // JSON array of {id, title, done}
  checks: string           // JSON array of {id, title, done}
  updatedAt: number        // client Unix epoch milliseconds
```

The Android app caches this state locally, listens for newer snapshots for the current local day, and writes app-only task/checklist state when changed. The daily reminder time and widget configuration are device-local. The existing user-tree Firestore rule covers this path without broadening site access.

## Merge contract

- Merge at `(section, entryKey)` granularity, not by replacing the full `users/{uid}/kv/{section}` document.
- The newer `t` wins for ordinary entries. A null `v` is a tombstone; retain its timestamp so an older device cannot resurrect deleted data.
- For `hist` and `exams`, union items by their `t` id, de-duplicate, and sort newest first. The website caps history at 400 entries.
- A client should persist local data first, then queue cloud writes. Offline clients retry when connectivity returns.
- Use a server timestamp for operational telemetry if added later; `t` is a logical conflict-resolution timestamp and must remain a number for compatibility.
- Conflict timestamps are currently client clocks. A future schema version may add server-side revisions, but any migration must keep old clients able to read/write this shape.

## Security

The current `firebase/firestore.rules` grants a signed-in user access only to documents beneath their own `users/{uid}` path and denies all other access. Deploy those rules only after confirming the intended Firebase project. Never ship service-account credentials or Admin SDK secrets in the browser or APK. Firebase client configuration is public by design; authorization is enforced by Auth and Firestore rules.

## Suggested future evolution

If data volume or multi-device concurrent writes grow, move entry writes behind a callable/HTTP backend that validates payload size and timestamps, and add an explicit schema version. Until then, the existing per-section documents keep the client implementation simple and are sufficient for personal study progress.
