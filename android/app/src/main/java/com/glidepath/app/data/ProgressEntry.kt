package com.glidepath.app.data

/** One independently mergeable state value in users/{uid}/kv/{section}. */
data class ProgressEntry(
    val v: String? = null, // JSON payload; null is a tombstone
    val t: Long = 0L,      // epoch milliseconds, matching the website client
    val by: String = "android"
)

data class ProgressSection(
    val e: Map<String, ProgressEntry> = emptyMap(),
    val u: Long = 0L
)
