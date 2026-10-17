package com.glidepath.app

import android.annotation.SuppressLint
import android.os.Bundle
import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.content.Intent
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.credentials.CredentialManager
import androidx.credentials.GetCredentialRequest
import androidx.credentials.exceptions.GetCredentialException
import com.google.android.libraries.identity.googleid.GetGoogleIdOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider
import com.glidepath.app.data.ProgressRepository
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await
import org.json.JSONObject

@OptIn(ExperimentalMaterial3Api::class)
class MainActivity : ComponentActivity() {
    private val mainHandler = Handler(Looper.getMainLooper())
    private lateinit var repository: ProgressRepository
    private lateinit var auth: FirebaseAuth
    private var webView: WebView? = null
    private var webReady = false
    private var syncStatus by mutableStateOf("Progress saved on this device")
    private var accountText by mutableStateOf("Not signed in")
    private var showSync by mutableStateOf(false)
    private var message by mutableStateOf("")
    private var authEmail by mutableStateOf("")
    private var authPassword by mutableStateOf("")
    private var section by mutableStateOf("Flight deck")
    private var taskRevision by mutableIntStateOf(0)
    private lateinit var notificationPermission: ActivityResultLauncher<String>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        notificationPermission = registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
            pendingReminder?.let { (enabled, hour, minute) ->
                if (granted) { FlightDeckStore.setReminder(this, enabled, hour, minute); taskRevision++; FlightDeckStore.refreshWidgets(this) }
                else android.widget.Toast.makeText(this, "Allow notifications to receive study nudges", android.widget.Toast.LENGTH_LONG).show()
            }
            pendingReminder = null
        }
        initializeFirebase()
        auth = FirebaseAuth.getInstance()
        repository = ProgressRepository(this)
        updateAccount()
        auth.addAuthStateListener {
            updateAccount()
            FlightDeckStore.startSync(this, auth.currentUser?.uid) { taskRevision++ }
            if (webReady) startSync()
        }
        setContent {
            val scope = rememberCoroutineScope()
            val palette = lightColorScheme(primary = Color(0xFF283E55), secondary = Color(0xFFC9934D), background = Color(0xFFFBFAF7), surface = Color.White, onSurface = Color(0xFF16181D))
            MaterialTheme(colorScheme = palette) {
                Scaffold(topBar = {
                    TopAppBar(
                        title = { Column { Text("GLIDEPATH", fontSize = 12.sp, letterSpacing = 2.sp); Text(if (section == "Flight deck") "Flight deck" else "Study library", style = MaterialTheme.typography.titleMedium) } },
                        actions = { TextButton(onClick = { showSync = true }) { Text("${if (auth.currentUser == null) "Sync" else syncStatus}") } }
                    )
                }, bottomBar = {
                    NavigationBar(containerColor = Color(0xFFFBFAF7)) {
                        listOf("Flight deck", "Study library").forEach { item -> NavigationBarItem(
                            selected = section == item, onClick = { section = item },
                            icon = { Text(if (item == "Flight deck") "◉" else "▤", fontSize = 20.sp) }, label = { Text(item) }
                        ) }
                    }
                }) { padding ->
                    if (section == "Flight deck") {
                        FlightDeckScreen(
                            modifier = Modifier.fillMaxSize().padding(padding),
                            refresh = taskRevision,
                            onChanged = { taskRevision++; FlightDeckStore.refreshWidgets(this) },
                            onOpenSite = { section = "Study library" },
                            onReminder = { enabled, hour, minute ->
                                if (enabled && Build.VERSION.SDK_INT >= 33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                                    pendingReminder = Triple(enabled, hour, minute); notificationPermission.launch(Manifest.permission.POST_NOTIFICATIONS)
                                } else FlightDeckStore.setReminder(this, enabled, hour, minute)
                            }
                        )
                    } else AndroidView(
                        modifier = Modifier.fillMaxSize().padding(padding),
                        factory = { context -> WebView(context).apply {
                                webView = this
                                settings.javaScriptEnabled = true
                                settings.domStorageEnabled = true
                                settings.allowFileAccess = true
                                settings.allowContentAccess = false
                                settings.setSupportZoom(true)
                                webChromeClient = WebChromeClient()
                                addJavascriptInterface(WebBridge(), "GlidepathAndroid")
                                webViewClient = object : WebViewClient() {
                                    override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                                        if (url.startsWith("file:///android_asset/www/")) return false
                                        try { startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url))) } catch (_: Exception) { }
                                        return true
                                    }

                                    override fun onPageFinished(view: WebView, url: String) {
                                        super.onPageFinished(view, url)
                                        installProgressBridge(view)
                                    }
                                }
                                loadUrl("file:///android_asset/www/index.html")
                            } }
                    )
                }
                if (showSync) AlertDialog(
                    onDismissRequest = { showSync = false },
                    title = { Text("Progress sync") },
                    text = {
                        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Text(accountText)
                            Text(syncStatus)
                            if (message.isNotBlank()) Text(message, color = MaterialTheme.colorScheme.error)
                            if (BuildConfig.USE_FIREBASE_EMULATOR) {
                                OutlinedTextField(value = authEmail, onValueChange = { authEmail = it }, label = { Text("Emulator email") }, singleLine = true)
                                OutlinedTextField(value = authPassword, onValueChange = { authPassword = it }, label = { Text("Emulator password") }, singleLine = true, visualTransformation = PasswordVisualTransformation())
                                Text("Use the same email and password in the website's local sync prompt.")
                            } else Text("Your progress is stored locally and syncs to the same Firebase account used by the website.")
                        }
                    },
                    confirmButton = {
                        TextButton(onClick = {
                            scope.launch {
                                if (BuildConfig.USE_FIREBASE_EMULATOR) signInEmulator(authEmail.trim(), authPassword)
                                else signInGoogle()
                            }
                        }) { Text(if (BuildConfig.USE_FIREBASE_EMULATOR) "Sign in / create emulator account" else "Sign in with Google") }
                    },
                    dismissButton = {
                        Row {
                            if (auth.currentUser != null) TextButton(onClick = { repository.stopSync(); auth.signOut(); syncStatus = "Signed out · local progress kept" }) { Text("Sign out") }
                            TextButton(onClick = { startSync() }) { Text("Sync now") }
                        }
                    }
                )
            }
        }
    }

    private var pendingReminder: Triple<Boolean, Int, Int>? = null
    private fun initializeFirebase() {
        if (FirebaseApp.getApps(this).isEmpty()) {
            if (!BuildConfig.USE_FIREBASE_EMULATOR) return
            val options = FirebaseOptions.Builder()
                .setApplicationId("1:1234567890:android:glidepath-emulator")
                .setApiKey("fake-api-key")
                .setProjectId("demo-glidepath")
                .build()
            FirebaseApp.initializeApp(this, options)
        }
        if (BuildConfig.USE_FIREBASE_EMULATOR) {
            val app = FirebaseApp.getInstance()
            FirebaseAuth.getInstance(app).useEmulator(BuildConfig.FIREBASE_EMULATOR_HOST, 9099)
            com.google.firebase.firestore.FirebaseFirestore.getInstance(app).useEmulator(BuildConfig.FIREBASE_EMULATOR_HOST, 8085)
        }
    }

    @SuppressLint("AddJavascriptInterface")
    private fun installProgressBridge(view: WebView) {
        // Only sync the website's state object. All other localStorage values remain private to the WebView.
        view.evaluateJavascript("""
            (function(){
              if (window.__gpAndroidHookInstalled) return;
              window.__gpAndroidHookInstalled = true;
              var original = Storage.prototype.setItem;
              Storage.prototype.setItem = function(key, value) {
                original.call(this, key, value);
                if (this === localStorage && key === 'glidepath-v1' && !window.__gpApplyingRemote) {
                  try { GlidepathAndroid.onProgressChanged(value); } catch (e) {}
                }
              };
              try { GlidepathAndroid.onWebReady(localStorage.getItem('glidepath-v1') || '{}'); } catch (e) {}
            })();
        """.trimIndent(), null)
    }

    private inner class WebBridge {
        @JavascriptInterface fun onWebReady(json: String) {
            mainHandler.post {
                // Hand the page any progress that synced while it was closed (at most once per page load).
                repository.initializeWebState(json)?.let { if (!webReady) applyStateToWebsite(it) }
                webReady = true
                if (auth.currentUser != null) startSync()
            }
        }
        @JavascriptInterface fun onProgressChanged(json: String) {
            mainHandler.post { repository.acceptWebState(json) }
        }
    }

    private fun startSync() {
        if (auth.currentUser == null) { syncStatus = "Sign in to sync across devices"; return }
        repository.sync(
            onState = { merged -> applyStateToWebsite(merged) },
            onStatus = { status -> mainHandler.post { syncStatus = status } }
        )
    }

    private fun applyStateToWebsite(state: JSONObject) {
        mainHandler.post {
            webView?.evaluateJavascript("""
                (function(){
                  window.__gpApplyingRemote = true;
                  localStorage.setItem('glidepath-v1', ${JSONObject.quote(state.toString())});
                  location.reload();
                })();
            """.trimIndent(), null)
        }
    }

    private suspend fun signInGoogle() {
        try {
            val clientIdRes = resources.getIdentifier("default_web_client_id", "string", packageName)
            if (clientIdRes == 0) error("Add google-services.json from the website's Firebase project first")
            val option = GetGoogleIdOption.Builder().setFilterByAuthorizedAccounts(false)
                .setServerClientId(getString(clientIdRes)).setAutoSelectEnabled(false).build()
            val request = GetCredentialRequest.Builder().addCredentialOption(option).build()
            val result = CredentialManager.create(this).getCredential(this, request)
            val token = GoogleIdTokenCredential.createFrom(result.credential.data).idToken
            auth.signInWithCredential(GoogleAuthProvider.getCredential(token, null)).await()
            message = ""
            startSync()
        } catch (e: GetCredentialException) { message = "Google sign-in failed: ${e.localizedMessage}" }
        catch (e: Exception) { message = e.localizedMessage ?: "Sign-in failed" }
    }

    private suspend fun signInEmulator(email: String, password: String) {
        if (email.isBlank() || password.length < 6) { message = "Enter an email and a password with at least 6 characters"; return }
        try {
            try { auth.signInWithEmailAndPassword(email, password).await() }
            catch (_: Exception) { auth.createUserWithEmailAndPassword(email, password).await() }
            message = ""
            startSync()
        } catch (e: Exception) { message = "Emulator sign-in failed: ${e.localizedMessage}" }
    }

    private fun updateAccount() {
        accountText = auth.currentUser?.let { it.email ?: "Connected · ${it.uid.take(8)}" } ?: "Not signed in"
    }

    override fun onBackPressed() {
        val view = webView
        if (view?.canGoBack() == true) view.goBack() else super.onBackPressed()
    }
}
