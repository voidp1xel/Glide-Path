plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

val googleServicesFile = file("google-services.json")
val emulatorMode = providers.gradleProperty("firebaseEmulator")
    .map { it.toBoolean() }
    .orElse(!googleServicesFile.exists())
    .get()

android {
    namespace = "com.glidepath.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.glidepath.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
        buildConfigField("boolean", "USE_FIREBASE_EMULATOR", emulatorMode.toString())
        // Emulator host: 10.0.2.2 from an Android emulator; 127.0.0.1 on a real phone with `adb reverse`.
        buildConfigField("String", "FIREBASE_EMULATOR_HOST", "\"" + (providers.gradleProperty("firebaseEmulatorHost").orNull ?: "10.0.2.2") + "\"")
        manifestPlaceholders["usesCleartextTraffic"] = emulatorMode.toString()
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }
}

kotlin { compilerOptions { jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17) } }

dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2024.12.01")
    implementation(composeBom)
    androidTestImplementation(composeBom)
    implementation("androidx.activity:activity-compose:1.10.0")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
    debugImplementation("androidx.compose.ui:ui-tooling")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.navigation:navigation-compose:2.8.5")
    implementation("androidx.datastore:datastore-preferences:1.1.1")
    implementation("androidx.credentials:credentials:1.3.0")
    implementation("androidx.credentials:credentials-play-services-auth:1.3.0")
    implementation("com.google.android.libraries.identity.googleid:googleid:1.1.1")
    implementation(platform("com.google.firebase:firebase-bom:33.7.0"))
    implementation("com.google.firebase:firebase-auth")
    implementation("com.google.firebase:firebase-firestore")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.10.1")
}

if (googleServicesFile.exists()) {
    apply(plugin = "com.google.gms.google-services")
} else if (!emulatorMode) {
    error("Add android/app/google-services.json or build with -PfirebaseEmulator=true")
}
