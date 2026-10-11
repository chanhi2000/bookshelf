---
lang: en-US
title: "How to Build and Publish a Native Android App in 2026: From Jetpack Compose to the Google Play Store"
description: "Article(s) > How to Build and Publish a Native Android App in 2026: From Jetpack Compose to the Google Play Store"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build and Publish a Native Android App in 2026: From Jetpack Compose to the Google Play Store"
    - property: og:description
      content: "How to Build and Publish a Native Android App in 2026: From Jetpack Compose to the Google Play Store"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-publish-native-android-app-from-jetpack-compose-to-google-play-store-handbook.html
prev: /programming/java-android/articles/README.md
date: 2026-10-19
isOriginal: false
author:
  - name: Nikheel Vishwas Savant
    url: https://freecodecamp.org/news/author/nsavant/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ae76da68-1529-486f-a1c0-aaa72031d084.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build and Publish a Native Android App in 2026: From Jetpack Compose to the Google Play Store"
  desc="Most Android tutorials stop at ”it runs on the emulator.” But getting an app from a blank project to a listing that real people can install from Google Play involves a second half that's rarely discus"
  url="https://freecodecamp.org/news/build-publish-native-android-app-from-jetpack-compose-to-google-play-store-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ae76da68-1529-486f-a1c0-aaa72031d084.png"/>

Most Android tutorials stop at "it runs on the emulator." But getting an app from a blank project to a listing that real people can install from Google Play involves a second half that's rarely discussed in one place: release builds, signing keys, app bundles, store listings, policy forms, and a mandatory testing period for new developer accounts.

Android development has also changed a lot in the last few years. Jetpack Compose is now the default UI toolkit, XML layouts are legacy, Kotlin is the only language the official templates use, and Google Play has tightened its requirements for new developers.

Older guides that start with `findViewById` or end with uploading an APK no longer match how things work.

This handbook walks through the whole path. You'll build a small but complete notes app with Jetpack Compose, Room, ViewModel, and Navigation 3, write a couple of tests, produce a signed release bundle, and then take it through the Google Play Console all the way to a production release.

::: note Prerequisites

You should be comfortable with basic programming concepts and have at least read some Kotlin before. You don't need prior Android experience. Every Android-specific concept is explained as it comes up.

For tools, you need:

- A computer running macOS, Windows, or Linux with at least 16 GB of RAM (8 GB works, but the emulator will be slow)
- The latest stable version of Android Studio
- A physical Android phone (optional for development, but required later for Play Console account verification)
- A Google account and 25 USD for the one-time Google Play developer registration fee

:::

::: info What You Will Build

The sample app is called Quick Notes. It shows a list of notes sorted by the last time they were edited, and it lets you create a new note with a floating action button, tap a note to edit it, and delete notes. Everything is stored locally on the device in a SQLite database, so the app works offline and needs no backend.

A notes app sounds simple, but it touches every piece a real app needs: a list screen and a detail screen, navigation between them with a working back button, persistent storage, state that survives configuration changes such as screen rotation, and user input. Once you understand how these pieces fit together, you can swap the notes for anything else.

Here's the high level architecture you'll end up with:

```plaintext
+-------------------------------------------------------------+
|                         UI Layer                            |
|  MainActivity -> NavDisplay -> NoteListScreen               |
|                             -> NoteEditorScreen             |
|                  observes StateFlow, sends events           |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                      NotesViewModel                         |
|      holds UI state, survives rotation, launches coroutines |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                       Data Layer                            |
|   NoteRepository -> NoteDao -> NotesDatabase (Room/SQLite)  |
+-------------------------------------------------------------+
```

The diagram shows three layers stacked vertically, with arrows pointing down to show the direction of dependencies.

The UI layer at the top contains the activity and the two screens. It only talks to the ViewModel, never directly to the database.

The ViewModel in the middle owns the state that the screens display and survives events like rotation that would otherwise destroy the screen.

The data layer at the bottom wraps Room, which is a typed layer on top of SQLite. Data flows back up the stack as a `Flow` of notes, so when the database changes, the UI updates automatically.

This is the layered architecture that Google recommends in its official app architecture guide.

:::

---

## How to Set Up Your Development Environment

Download Android Studio from [<VPIcon icon="fa-brands fa-android"/>developer.android.com/studio](https://developer.android.com/studio) and run the installer. On first launch, the setup wizard downloads the Android SDK, the platform tools (including `adb`), and a system image for the emulator. Accept the defaults unless you have a reason not to. Android Studio bundles its own JDK, so you don't need to install Java separately.

Once setup finishes, open the SDK Manager from **Tools > SDK Manager** and confirm that the latest stable Android platform is installed. At the time of writing, that means at least Android 16 (API level 36).

Google Play requires new apps and app updates to target a recent API level, and the requirement moves forward every year, usually at the end of August. Check the [<VPIcon icon="fa-brands fa-android"/>target API level requirements page](https://developer.android.com/google/play/requirements/target-sdk) before you start so you know which number to aim for.

Next, create an emulator from **Tools > Device Manager**. Pick a recent Pixel phone profile and the newest system image with Google Play services.

If you would rather test on a physical phone, enable Developer Options on the device by tapping **Build number** seven times in **Settings > About phone**, then turn on **USB debugging** (or **Wireless debugging**) in the Developer Options menu.

---

## How to Create a New Compose Project

In Android Studio, choose **File > New > New Project** and select the **Empty Activity** template. This template is Compose-based. The similarly named "Empty Views Activity" uses the older XML layout system, so make sure you pick the right one.

Fill in the project details. The Name is what users see (Quick Notes). The Package name is the permanent, globally unique identifier for your app on Google Play, written in reverse domain format such as `com.yourname.quicknotes`. Choose it carefully, because you can't change it after you publish. Set Minimum SDK to API 24, which covers nearly every active Android device, and leave the build configuration language as Kotlin DSL.

Click **Finish** and wait for the first Gradle sync to complete. The project you get looks roughly like this:

```sh title="file structure"
QuickNotes/
├── app/
│   ├── build.gradle.kts
│   ├── proguard-rules.pro
│   └── src/
│       ├── main/
│       │   ├── AndroidManifest.xml
│       │   ├── java/com/yourname/quicknotes/
│       │   │   ├── MainActivity.kt
│       │   │   └── ui/theme/
│       │   └── res/
│       ├── test/
│       └── androidTest/
├── gradle/
│   └── libs.versions.toml
├── build.gradle.kts
└── settings.gradle.kts
```

The tree shows the important files in a fresh project.

The <VPIcon icon="fas fa-folder-open"/>`app` folder is the single module that becomes your installable app, and its <VPIcon icon="iconfont icon-kotlin"/>`build.gradle.kts` holds the Android configuration (SDK levels, version numbers, dependencies).

.<VPIcon icon="fas fa-folder-open"/>`src/main` contains production code, the <VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml` that declares your app's components to the system, and the <VPIcon icon="fas fa-folder-open"/>`res` folder for resources such as icons and strings.

The <VPIcon icon="fas fa-folder-open"/>`test` folder is for unit tests that run on your computer, while <VPIcon icon="fas fa-folder-open"/>`androidTest` is for tests that run on a device or emulator.

At the root, <VPIcon icon="fas fa-folder-open"/>`gradle/libs.versions.toml` is the version catalog where all dependency versions live, and <VPIcon icon="iconfont icon-kotlin"/>`settings.gradle.kts` lists the modules in the project. Kotlin files sit under a folder named <VPIcon icon="fas fa-folder-open"/>`java` for historical reasons, which is normal.

Press the green **Run** button. After a short build, the emulator should show "Hello Android!" on screen. That confirms your toolchain works.

---

## Table of Contents

- [How to Configure Dependencies with a Version Catalog](#heading-how-to-configure-dependencies-with-a-version-catalog)
- [How Jetpack Compose Thinks About UI](#heading-how-jetpack-compose-thinks-about-ui)
- [How to Structure the App](#heading-how-to-structure-the-app)
- [How to Store Data Locally with Room](#heading-how-to-store-data-locally-with-room)
- [How to Expose Data with a Repository and Application Class](#heading-how-to-expose-data-with-a-repository-and-application-class)
- [How to Manage UI State with a ViewModel](#heading-how-to-manage-ui-state-with-a-viewmodel)
- [How to Build the Note List Screen](#heading-how-to-build-the-note-list-screen)
- [How to Build the Note Editor Screen](#heading-how-to-build-the-note-editor-screen)
- [How to Add Navigation with Navigation 3](#heading-how-to-add-navigation-with-navigation-3)
- [How to Handle Theming and Edge-to-Edge Display](#heading-how-to-handle-theming-and-edge-to-edge-display)
- [How to Test Your Composables](#heading-how-to-test-your-composables)
- [How to Prepare the App for Release](#heading-how-to-prepare-the-app-for-release)
- [How to Create an Upload Key and Sign Your App](#heading-how-to-create-an-upload-key-and-sign-your-app)
- [How to Build an Android App Bundle](#heading-how-to-build-an-android-app-bundle)
- [How to Create a Google Play Developer Account](#heading-how-to-create-a-google-play-developer-account)
- [How to Create Your App in the Play Console](#heading-how-to-create-your-app-in-the-play-console)
- [How to Complete the App Content Declarations](#heading-how-to-complete-the-app-content-declarations)
- [How to Set Up Your Store Listing](#heading-how-to-set-up-your-store-listing)
- [How to Run Internal and Closed Testing](#heading-how-to-run-internal-and-closed-testing)
- [How to Publish to Production](#heading-how-to-publish-to-production)
- [How to Ship Updates After Launch](#heading-how-to-ship-updates-after-launch)

---

## How to Configure Dependencies with a Version Catalog

Modern Android projects keep every library version in one file, <VPIcon icon="fas fa-folder-open"/>`gradle/`<VPIcon icon="iconfont icon-toml"/>`libs.versions.toml`, and refer to those libraries by alias from the build scripts.

Open the catalog and replace its contents with the following:

```toml :collapsed-lines title="libs.versions.toml"
[versions]
agp = "9.0.0"
kotlin = "2.3.0"
ksp = "2.3.4"
composeBom = "2026.01.00"
activityCompose = "1.12.2"
lifecycle = "2.10.0"
navigation3 = "1.0.0"
room = "2.8.4"
serialization = "1.9.0"
junit = "4.13.2"
androidxJunit = "1.3.0"

[libraries]
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-compose-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-compose-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-compose-ui-test-junit4 = { group = "androidx.compose.ui", name = "ui-test-junit4" }
androidx-compose-ui-test-manifest = { group = "androidx.compose.ui", name = "ui-test-manifest" }
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-compose-material-icons-core = { group = "androidx.compose.material", name = "material-icons-core" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycle" }
androidx-lifecycle-runtime-compose = { group = "androidx.lifecycle", name = "lifecycle-runtime-compose", version.ref = "lifecycle" }
androidx-navigation3-runtime = { group = "androidx.navigation3", name = "navigation3-runtime", version.ref = "navigation3" }
androidx-navigation3-ui = { group = "androidx.navigation3", name = "navigation3-ui", version.ref = "navigation3" }
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
androidx-room-ktx = { group = "androidx.room", name = "room-ktx", version.ref = "room" }
androidx-room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }
kotlinx-serialization-core = { group = "org.jetbrains.kotlinx", name = "kotlinx-serialization-core", version.ref = "serialization" }
junit = { group = "junit", name = "junit", version.ref = "junit" }
androidx-junit = { group = "androidx.test.ext", name = "junit", version.ref = "androidxJunit" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
kotlin-serialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
room = { id = "androidx.room", version.ref = "room" }
```

The catalog has three sections: `[versions]` names each version number once. `[libraries]` maps a short alias to a Maven coordinate, and `[plugins]` does the same for Gradle plugins.

Gradle turns the dashes in each alias into dots, so `androidx-room-runtime` becomes `libs.androidx.room.runtime` in your build scripts. The Compose libraries have no version of their own because they get it from the Compose BOM (bill of materials), which pins a set of Compose libraries that are tested together. The Kotlin Compose compiler plugin shares its version with Kotlin itself, which has been the case since Kotlin 2.0. KSP is the annotation processor Room uses to generate database code. The version numbers here were current when this article was written. Android Studio highlights outdated entries in the catalog, and you should accept its suggestions to move to the latest stable versions.

Now update the root <VPIcon icon="iconfont icon-kotlin"/>`build.gradle.kts` so the plugins are available to the app module:

```kotlin title="build.gradle.kts"
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.kotlin.serialization) apply false
    alias(libs.plugins.ksp) apply false
    alias(libs.plugins.room) apply false
}
```

This file declares each plugin with `apply false`, which puts the plugin on the build classpath without applying it to the root project. Each module then opts into the plugins it actually needs.

You might notice there's no `org.jetbrains.kotlin.android` plugin. Starting with Android Gradle Plugin 9, Kotlin support is built into the Android plugin, so a separate Kotlin Android plugin is no longer required. If you're working in an older project on AGP 8, you'll still see that plugin applied, and that's fine.

Then replace the contents of <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="iconfont icon-kotlin"/>`build.gradle.kts`:

```kotlin :collapsed-lines title="app/build.gradle.kts"
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.ksp)
    alias(libs.plugins.room)
}

android {
    namespace = "com.yourname.quicknotes"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.yourname.quicknotes"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    buildFeatures {
        compose = true
    }
}

room {
    schemaDirectory("$projectDir/schemas")
}

dependencies {
    val composeBom = platform(libs.androidx.compose.bom)
    implementation(composeBom)
    androidTestImplementation(composeBom)

    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons.core)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.lifecycle.runtime.compose)
    implementation(libs.androidx.navigation3.runtime)
    implementation(libs.androidx.navigation3.ui)
    implementation(libs.androidx.room.runtime)
    implementation(libs.androidx.room.ktx)
    implementation(libs.kotlinx.serialization.core)
    ksp(libs.androidx.room.compiler)

    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}
```

This is the most important configuration file in the project, so read it carefully.

The `namespace` is the package used for the generated `R` class, while `applicationId` is the identity of the app on devices and on Google Play. They usually match.

`compileSdk` is the API level your code is compiled against, and `targetSdk` tells Android which platform behaviors your app has been tested with. When you raise `targetSdk`, newer behaviors such as enforced edge-to-edge drawing switch on.

`versionCode` is an integer that must increase with every upload to Play, while `versionName` is the human-readable string users see.

The `release` block turns on R8, which shrinks, obfuscates, and optimizes your code, and `isShrinkResources` removes unused resources.

The `room` block tells the Room plugin where to write JSON snapshots of your database schema, which you'll need later when you write migrations.

In the dependencies, `platform(libs.androidx.compose.bom)` applies the BOM so the Compose libraries line up, and `ksp(...)` runs the Room compiler at build time. The `debugImplementation` lines include Compose preview tooling and a test manifest only in debug builds, so they never ship to users.

Click **Sync Now** in the banner at the top of the editor. If the sync succeeds, you're ready to write code.

---

## How Jetpack Compose Thinks About UI

Before writing screens, it helps to understand the model Compose is built on, because it's different from the older View system.

In Compose, UI is a function of state. You write functions annotated with `@Composable` that describe what the screen should look like for the current data. You never reach into a view and call `setText` on it. Instead, when the data changes, Compose calls your function again with the new data and updates only the parts of the screen that actually changed. This re-running is called recomposition.

Here's the smallest useful example:

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }

    Button(onClick = { count++ }) {
        Text("Clicked $count times")
    }
}
```

The `Counter` function declares a piece of state with `mutableIntStateOf(0)`. Compose watches every read of that state. When the button's `onClick` lambda increments `count`, Compose knows that `Counter` read the old value, so it schedules `Counter` to run again, and the `Text` shows the new number.

The `remember` call is what keeps the value alive across recompositions. Without it, `count` would reset to zero every time the function ran.

The `by` keyword is Kotlin property delegation, which lets you read and write `count` like a regular variable instead of writing `count.value`.

`remember` survives recomposition but not configuration changes such as rotating the phone, because Android destroys and recreates the activity in that case. For simple values that must survive rotation, use `rememberSaveable` instead. For anything more substantial, such as data loaded from a database, keep the state in a ViewModel, which outlives the activity. You'll use both in this app.

The other core idea is state hoisting. A composable that owns its own state is hard to reuse and hard to test. A better pattern is to pass state in as parameters and pass events out as lambdas, so the composable only displays what it's given and reports what the user did. The caller decides where the state lives. You'll see this pattern in the list screen, where it makes testing straightforward.

---

## How to Structure the App

Create the following packages under `com.yourname.quicknotes` by right-clicking the package in the Project panel and choosing **New > Package**:

```sh title="file structure"
com.yourname.quicknotes
├── data/
│   ├── Note.kt
│   ├── NoteDao.kt
│   ├── NotesDatabase.kt
│   └── NoteRepository.kt
├── ui/
│   ├── NotesViewModel.kt
│   ├── NoteListScreen.kt
│   ├── NoteEditorScreen.kt
│   └── theme/
├── navigation/
│   └── NavKeys.kt
├── MainActivity.kt
└── NotesApp.kt
```

The layout groups files by layer.

The `data` package holds everything related to storage: the `Note` entity, the DAO (data access object) that defines queries, the Room database class, and a repository that the rest of the app uses instead of talking to Room directly.

The `ui` package contains the ViewModel and the two screens, plus the theme files the template generated.

The `navigation` package holds the keys that identify each screen. `MainActivity` is the single activity that hosts all of the Compose UI, and `NotesApp` is a custom `Application` class used to create the database once for the whole app.

For a larger app, you would likely split these into separate Gradle modules, but packages are enough here.

---

## How to Store Data Locally with Room

Room is the Jetpack persistence library. You describe tables as Kotlin classes and queries as annotated interface methods, and Room generates the SQLite code at compile time. Because queries are checked during the build, a typo in a column name becomes a compiler error instead of a crash on a user's phone.

Start with the entity in <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="iconfont icon-kotlin"/>`Note.kt`:

```kotlin title="app/src/main/java/com/yourname/quicknotes/data/Note.kt"
package com.yourname.quicknotes.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "notes")
data class Note(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val body: String,
    val updatedAt: Long = System.currentTimeMillis()
)
```

`@Entity` tells Room that this class maps to a table named `notes`, and each property becomes a column.

The `id` field is the primary key, and `autoGenerate = true` asks SQLite to assign a new ID when you insert a row whose ID is `0`. That's why `id` defaults to `0`: a new note doesn't have a real ID until it's saved.

The `updatedAt` property stores a timestamp in milliseconds and defaults to the current time whenever a `Note` object is created, which is how the app knows which notes were edited most recently.

Using a plain `data class` gives you `equals`, `hashCode`, and `copy` for free, which Compose relies on to decide whether a list item has changed.

Next, define the queries in <VPIcon icon="fas fa-folder-open"/>`data/NoteDao.kt`:

```kotlin title="app/src/main/java/com/yourname/quicknotes/data/NoteDao.kt"
package com.yourname.quicknotes.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Query
import androidx.room.Upsert
import kotlinx.coroutines.flow.Flow

@Dao
interface NoteDao {
    @Query("SELECT * FROM notes ORDER BY updatedAt DESC")
    fun observeAll(): Flow<List<Note>>

    @Query("SELECT * FROM notes WHERE id = :id")
    suspend fun getById(id: Long): Note?

    @Upsert
    suspend fun upsert(note: Note)

    @Delete
    suspend fun delete(note: Note)
}
```

A DAO is an interface whose implementation Room writes for you. The `observeAll` method returns a `Flow<List<Note>>` rather than a plain list. A `Flow` is a stream from Kotlin coroutines that emits a new value whenever the underlying data changes, so any time a note is inserted, updated, or deleted, Room automatically re-runs the query and emits the fresh list. This is what keeps the list screen in sync without any manual refresh logic.

The other methods are marked `suspend`, which means they must be called from a coroutine. Room runs them on a background thread, so database work never blocks the main thread and freezes the UI.

`@Upsert` inserts a row if its primary key doesn't exist and updates it if it does, which lets one method handle both creating and editing a note.

The `:id` syntax in the second query binds the method parameter to the SQL statement safely, with no string concatenation.

Now create the database in <VPIcon icon="fas fa-folder-open"/>`data`<VPIcon icon="iconfont icon-kotlin"/>`/NotesDatabase.kt`:

```kotlin title="app/src/main/java/com/yourname/quicknotes/data/NotesDatabase.kt"
package com.yourname.quicknotes.data

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(entities = [Note::class], version = 1, exportSchema = true)
abstract class NotesDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao
}
```

The `@Database` annotation lists every entity in the database and a schema version number. Room generates a concrete subclass of this abstract class, including the implementation of `noteDao()`.

The `version` field matters once your app is live. If you later add a column to `Note`, you must bump the version and provide a migration, or Room will refuse to open the existing database on users' devices.

`exportSchema = true` writes a JSON description of each schema version to the `schemas` folder you configured in Gradle. Commit that folder to version control, because Room uses those files to verify and auto-generate migrations.

---

## How to Expose Data with a Repository and Application Class

The repository is a thin layer between the ViewModel and Room. In this app it mostly forwards calls, but it gives you one place to add caching, network sync, or validation later without touching the UI code. Create <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="iconfont icon-kotlin"/>`NoteRepository.kt`:

```kotlin title="app/src/main/java/com/yourname/quicknotes/data/NoteRepository"
package com.yourname.quicknotes.data

import kotlinx.coroutines.flow.Flow

class NoteRepository(private val noteDao: NoteDao) {

    fun observeNotes(): Flow<List<Note>> = noteDao.observeAll()

    suspend fun getNote(id: Long): Note? = noteDao.getById(id)

    suspend fun save(note: Note) = noteDao.upsert(note)

    suspend fun delete(note: Note) = noteDao.delete(note)
}
```

The repository takes a `NoteDao` in its constructor instead of creating one itself. This is dependency injection in its simplest form. Because the dependency is passed in, a test could hand the repository a fake DAO. The public methods use domain language (`save`, `observeNotes`) rather than database language (`upsert`, `observeAll`), which keeps Room details from leaking into the rest of the app.

The database should be created exactly once per app process, because opening SQLite is expensive and multiple instances can conflict. A common way to do that without a dependency injection framework is a custom `Application` subclass. Create <VPIcon icon="iconfont icon-kotlin"/>`NotesApp.kt` in the root package:

```kotlin title="app/src/main/java/com/yourname/quicknotes/NotesApp.kt"
package com.yourname.quicknotes

import android.app.Application
import androidx.room.Room
import com.yourname.quicknotes.data.NoteRepository
import com.yourname.quicknotes.data.NotesDatabase

class NotesApp : Application() {

    private val database: NotesDatabase by lazy {
        Room.databaseBuilder(this, NotesDatabase::class.java, "notes.db").build()
    }

    val repository: NoteRepository by lazy {
        NoteRepository(database.noteDao())
    }
}
```

Android creates one instance of the `Application` class before any activity starts, and keeps it for the lifetime of the process. That makes it a natural home for app-wide singletons.

The `by lazy` delegate defers creating the database until the first time `repository` is accessed, which keeps app startup fast.

`Room.databaseBuilder` takes a context, the database class, and a file name, and `build()` returns the generated implementation. For larger apps, Hilt or Koin can manage this wiring for you, but the manual approach shows exactly what those frameworks automate.

For Android to use this class, register it in <VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml` by adding the `android:name` attribute to the `<application>` tag:

```xml title="app/src/main/AndroidManifest.xml"
<application
    android:name=".NotesApp"
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:supportsRtl="true"
    android:theme="@style/Theme.QuickNotes">
```

The only line you're adding is `android:name=".NotesApp"`. The leading dot is shorthand for your app's namespace, so Android resolves it to `com.yourname.quicknotes.NotesApp`.

The other attributes came from the template: the launcher icon, the app label shown under the icon, right-to-left layout support, and the base theme used before Compose draws its first frame. If you forget the `android:name` attribute, Android uses the default `Application` class and your app crashes the first time it tries to cast it to `NotesApp`.

---

## How to Manage UI State with a ViewModel

A `ViewModel` holds the state for a screen and survives configuration changes. When the user rotates the phone, the activity is destroyed and recreated, but the ViewModel stays in memory, so the list of notes doesn't need to be reloaded. Create <VPIcon icon="fas fa-folder-open"/>`ui/`<VPIcon icon="iconfont icon-kotlin"/>`NotesViewModel.kt`:

```kotlin :collapsed-lines title="app/src/main/java/com/yourname/quicknotes/ui/NotesViewModel.kt"
package com.yourname.quicknotes.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.yourname.quicknotes.NotesApp
import com.yourname.quicknotes.data.Note
import com.yourname.quicknotes.data.NoteRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class NotesViewModel(private val repository: NoteRepository) : ViewModel() {

    val notes: StateFlow<List<Note>> = repository.observeNotes()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = emptyList()
        )

    suspend fun getNote(id: Long): Note? = repository.getNote(id)

    fun saveNote(id: Long?, title: String, body: String) {
        viewModelScope.launch {
            repository.save(Note(id = id ?: 0, title = title.trim(), body = body.trim()))
        }
    }

    fun deleteNote(note: Note) {
        viewModelScope.launch {
            repository.delete(note)
        }
    }

    companion object {
        val Factory: ViewModelProvider.Factory = viewModelFactory {
            initializer {
                val app = this[ViewModelProvider.AndroidViewModelFactory.APPLICATION_KEY] as NotesApp
                NotesViewModel(app.repository)
            }
        }
    }
}
```

There are three ideas packed into this class.

The first is the `notes` property. `repository.observeNotes()` returns a cold `Flow`, which only does work while someone is collecting it. The `stateIn` operator converts it into a `StateFlow`, which always holds a current value (starting with an empty list) that the UI can read immediately. `SharingStarted.WhileSubscribed(5_000)` keeps the database query active while the UI is observing and for five seconds after it stops. That five second grace period means a quick rotation doesn't tear down and restart the query, while backgrounding the app for longer does release it.

The second idea is `viewModelScope`. Saving and deleting are `suspend` functions, so they need a coroutine. `viewModelScope` is a coroutine scope tied to the ViewModel's lifetime, and any work launched in it is cancelled automatically when the ViewModel is cleared.

In `saveNote`, a `null` ID means "this is a new note," so it becomes `0` and Room generates a fresh ID. A non-null ID updates the existing row. Because a new `Note` object is created on every save, `updatedAt` is refreshed to the current time.

The third idea is the `Factory`. Android creates ViewModels for you so it can keep them alive across rotations, which means you can't call the constructor directly.

A factory tells Android how to build the ViewModel when it needs one. The `viewModelFactory` and `initializer` builders read the `Application` instance out of the creation extras, cast it to `NotesApp`, and pass its repository into the constructor.

---

## How to Build the Note List Screen

The list screen is split into two composables. A stateful wrapper connects to the ViewModel, and a stateless content composable does the actual drawing. Create <VPIcon icon="fas fa-folder-open"/>`ui/`<VPIcon icon="iconfont icon-kotlin"/>`NoteListScreen.kt`:

```kotlin :collapsed-lines title="app/src/main/java/com/yourname/quicknotes/ui/NoteListScreen.kt"
package com.yourname.quicknotes.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.yourname.quicknotes.data.Note

@Composable
fun NoteListScreen(
    viewModel: NotesViewModel,
    onAddNote: () -> Unit,
    onOpenNote: (Long) -> Unit
) {
    val notes by viewModel.notes.collectAsStateWithLifecycle()

    NoteListContent(
        notes = notes,
        onAddNote = onAddNote,
        onOpenNote = onOpenNote,
        onDeleteNote = viewModel::deleteNote
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NoteListContent(
    notes: List<Note>,
    onAddNote: () -> Unit,
    onOpenNote: (Long) -> Unit,
    onDeleteNote: (Note) -> Unit
) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Quick Notes") }) },
        floatingActionButton = {
            FloatingActionButton(onClick = onAddNote) {
                Icon(Icons.Default.Add, contentDescription = "Add note")
            }
        }
    ) { innerPadding ->
        if (notes.isEmpty()) {
            Box(
                modifier = Modifier.fillMaxSize().padding(innerPadding),
                contentAlignment = Alignment.Center
            ) {
                Text("No notes yet", style = MaterialTheme.typography.bodyLarge)
            }
        } else {
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize().padding(innerPadding)
            ) {
                items(notes, key = { it.id }) { note ->
                    NoteCard(
                        note = note,
                        onClick = { onOpenNote(note.id) },
                        onDelete = { onDeleteNote(note) }
                    )
                }
            }
        }
    }
}

@Composable
private fun NoteCard(note: Note, onClick: () -> Unit, onDelete: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onClick)) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(note.title, style = MaterialTheme.typography.titleMedium)
                if (note.body.isNotBlank()) {
                    Text(
                        note.body,
                        style = MaterialTheme.typography.bodyMedium,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }
            IconButton(onClick = onDelete) {
                Icon(Icons.Default.Delete, contentDescription = "Delete ${note.title}")
            }
        }
    }
}
```

`NoteListScreen` is the only part that knows about the ViewModel. It calls `collectAsStateWithLifecycle()`, which turns the `StateFlow` into Compose state and, unlike the plain `collectAsState()`, stops collecting when the app moves to the background. That saves battery and avoids doing database work for a screen nobody can see. It then passes the plain list and some lambdas into `NoteListContent`.

The `viewModel::deleteNote` syntax is a function reference, a compact way of writing `{ note -> viewModel.deleteNote(note) }`.

`NoteListContent` is stateless. It receives everything as parameters and reports clicks through lambdas, which is state hoisting in practice. Inside it, `Scaffold` is a Material 3 layout that provides slots for a top app bar and a floating action button and calculates `innerPadding` so your content doesn't end up behind those bars or behind the system status and navigation bars.

When the list is empty, the screen shows a centered message. Otherwise it uses `LazyColumn`, which only composes the rows that are currently visible, like `RecyclerView` in the old View system.

The `key = { it.id }` argument gives each row a stable identity, so when a note is deleted Compose knows exactly which row to remove instead of redrawing everything below it.

`NoteCard` draws one note. `Modifier` chains configure layout and behavior in order: `fillMaxWidth()` stretches the card across the screen and `clickable` makes the whole card respond to taps.

Inside the `Row`, `Modifier.weight(1f)` tells the text column to take all horizontal space left over after the delete button is measured. The `contentDescription` values on icons are read aloud by TalkBack, Android's screen reader. Including the note title in the delete button's description means a TalkBack user hears "Delete Groceries" instead of a row of identical "Delete" buttons.

---

## How to Build the Note Editor Screen

The editor handles both new notes and existing ones. Create <VPIcon icon="fas fa-folder-open"/>`ui/`<VPIcon icon="iconfont icon-kotlin"/>`NoteEditorScreen.kt`:

```kotlin :collapsed-lines title="app/src/main/java/com/yourname/quicknotes/ui/NoteEditorScreen.kt"
package com.yourname.quicknotes.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NoteEditorScreen(
    noteId: Long?,
    viewModel: NotesViewModel,
    onDone: () -> Unit
) {
    var title by rememberSaveable { mutableStateOf("") }
    var body by rememberSaveable { mutableStateOf("") }
    var loaded by rememberSaveable { mutableStateOf(noteId == null) }

    LaunchedEffect(noteId) {
        if (noteId != null && !loaded) {
            viewModel.getNote(noteId)?.let {
                title = it.title
                body = it.body
            }
            loaded = true
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (noteId == null) "New note" else "Edit note") },
                navigationIcon = {
                    IconButton(onClick = onDone) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    TextButton(
                        onClick = {
                            viewModel.saveNote(noteId, title, body)
                            onDone()
                        },
                        enabled = title.isNotBlank()
                    ) {
                        Text("Save")
                    }
                }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .imePadding()
                .padding(16.dp)
        ) {
            OutlinedTextField(
                value = title,
                onValueChange = { title = it },
                label = { Text("Title") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(Modifier.height(12.dp))
            OutlinedTextField(
                value = body,
                onValueChange = { body = it },
                label = { Text("Note") },
                modifier = Modifier.fillMaxWidth().weight(1f)
            )
        }
    }
}
```

The editor keeps the text the user is typing in local state with `rememberSaveable`, so a half-written note survives a rotation. The `loaded` flag tracks whether the existing note has already been read from the database. It starts as `true` for new notes (nothing to load) and `false` for existing ones.

`LaunchedEffect(noteId)` runs a coroutine when the composable first appears and again only if `noteId` changes. Inside it, the screen asks the ViewModel for the note and copies its title and body into the text fields.

Checking `loaded` before loading is important. Without that check, rotating the screen would run the effect again and overwrite whatever the user had typed with the saved version from the database.

`OutlinedTextField` is a Material 3 text input. Compose text fields are controlled components: the field shows whatever `value` you pass in, and when the user types, it calls `onValueChange` with the new text. If you forget to update `title` in that callback, the field appears frozen because Compose keeps redrawing the old value. The Save button is disabled while the title is blank, and pressing it saves through the ViewModel and calls `onDone` to go back.

`imePadding()` adds space at the bottom equal to the height of the on-screen keyboard, so the body field shrinks instead of hiding behind the keyboard. The back arrow uses the `AutoMirrored` icon set, which flips automatically in right-to-left languages such as Arabic and Hebrew.

---

## How to Add Navigation with Navigation 3

Navigation 3 is the Compose-first navigation library from the Jetpack team. The earlier Navigation Compose library was adapted from a system designed for fragments and treated the back stack as something it owned internally.

Navigation 3 takes the opposite approach: the back stack is a plain list that you own, and navigating means adding or removing items from that list. The library observes the list and shows the screen for whatever key is on top.

First, define a key for each screen in <VPIcon icon="fas fa-folder-open"/>`navigation/`<VPIcon icon="iconfont icon-kotlin"/>`NavKeys.kt`:

```kotlin :collapsed-lines title="app/src/main/java/com/yourname/quicknotes/navigation/NavKeys.kt"
package com.yourname.quicknotes.navigation

import androidx.navigation3.runtime.NavKey
import kotlinx.serialization.Serializable

@Serializable
data object NoteList : NavKey

@Serializable
data class NoteEditor(val noteId: Long? = null) : NavKey
```

Each destination is a type that implements `NavKey`. `NoteList` takes no arguments, so it's a `data object`, a singleton with a readable `toString`.

`NoteEditor` carries an optional note ID, where `null` means "create a new note." Arguments are typed properties instead of strings embedded in a URL route, so the compiler catches mistakes such as passing the wrong type.

The `@Serializable` annotation lets Navigation 3 save the back stack when Android kills your app in the background and restore it when the user comes back, which is why the serialization plugin was added earlier.

Now replace <VPIcon icon="iconfont icon-kotlin"/>`MainActivity.kt` with the following:

```kotlin :collapsed-lines title="app/src/main/java/com/yourname/quicknotes/MainActivity.kt"
package com.yourname.quicknotes

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation3.runtime.entryProvider
import androidx.navigation3.runtime.rememberNavBackStack
import androidx.navigation3.ui.NavDisplay
import com.yourname.quicknotes.navigation.NoteEditor
import com.yourname.quicknotes.navigation.NoteList
import com.yourname.quicknotes.ui.NoteEditorScreen
import com.yourname.quicknotes.ui.NoteListScreen
import com.yourname.quicknotes.ui.NotesViewModel
import com.yourname.quicknotes.ui.theme.QuickNotesTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            QuickNotesTheme {
                QuickNotesNavHost()
            }
        }
    }
}

@Composable
fun QuickNotesNavHost() {
    val backStack = rememberNavBackStack(NoteList)
    val notesViewModel: NotesViewModel = viewModel(factory = NotesViewModel.Factory)

    NavDisplay(
        backStack = backStack,
        onBack = { backStack.removeLastOrNull() },
        entryProvider = entryProvider {
            entry<NoteList> {
                NoteListScreen(
                    viewModel = notesViewModel,
                    onAddNote = { backStack.add(NoteEditor()) },
                    onOpenNote = { id -> backStack.add(NoteEditor(id)) }
                )
            }
            entry<NoteEditor> { key ->
                NoteEditorScreen(
                    noteId = key.noteId,
                    viewModel = notesViewModel,
                    onDone = { backStack.removeLastOrNull() }
                )
            }
        }
    )
}
```

`MainActivity` is now just a host. `enableEdgeToEdge()` lets the app draw behind the status bar and navigation bar (more on that in the next section), and `setContent` replaces the traditional XML layout with a Compose tree wrapped in the theme the template generated.

`QuickNotesNavHost` is where navigation happens. `rememberNavBackStack(NoteList)` creates a saveable back stack that starts with the list screen. The ViewModel is created once with the factory you wrote earlier and shared by both screens, since they work with the same notes.

`NavDisplay` renders the entry for the key at the top of the stack. The `entryProvider` block maps each key type to its composable with `entry<T>`. For `NoteEditor`, the lambda receives the key instance, so `key.noteId` gives you the typed argument directly.

Navigating forward is `backStack.add(...)` and going back is `backStack.removeLastOrNull()`. That's the whole API for basic navigation.

`onBack` is called when the user presses the system back button or makes the back gesture, and it removes the top entry. Navigation 3 also supports predictive back, the animation where the previous screen peeks in as the user swipes, without any extra code from you.

Run the app now. You should be able to add notes, see them appear in the list, tap one to edit it, delete notes, rotate the device without losing anything, and close and reopen the app with all notes still there.

---

## How to Handle Theming and Edge-to-Edge Display

The template created a <VPIcon icon="fas fa-folder-open"/>`ui/theme` package with <VPIcon icon="iconfont icon-kotlin"/>`Color.kt`, <VPIcon icon="iconfont icon-kotlin"/>`Type.kt`, and <VPIcon icon="iconfont icon-kotlin"/>`Theme.kt`. The theme function looks roughly like this:

```kotlin :collapsed-lines title="app/src/main/java/com/yourname/quicknotes/ui/theme/Theme.kt"
@Composable
fun QuickNotesTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
```

`MaterialTheme` provides colors and typography to every Material 3 component below it, which is why calls such as `MaterialTheme.typography.titleMedium` in your screens work.

The `when` block picks a color scheme. On Android 12 (API 31, `VERSION_CODES.S`) and newer, dynamic color generates a palette from the user's wallpaper so your app matches the rest of their phone. On older versions, or if you set `dynamicColor` to `false`, it falls back to the fixed `LightColorScheme` and `DarkColorScheme` defined in <VPIcon icon="iconfont icon-kotlin"/>`Color.kt`. `isSystemInDarkTheme()` follows the system dark mode setting.

If you want a consistent brand color everywhere, set `dynamicColor = false` and edit the colors in <VPIcon icon="iconfont icon-kotlin"/>`Color.kt`. The [<VPIcon icon="fas fa-globe"/>Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) can generate a full light and dark scheme from a single seed color.

Edge-to-edge means your app draws behind the system bars instead of inside a box between them. Apps that target Android 15 or higher are edge-to-edge by default, and starting with Android 16 the opt-out is gone.

The `enableEdgeToEdge()` call in `MainActivity` makes the behavior consistent on older Android versions too and sets the system bar icons to the correct light or dark color. Because both screens use `Scaffold` and apply its `innerPadding`, the content already avoids the bars.

When you build screens without `Scaffold`, use modifiers such as `Modifier.safeDrawingPadding()` or `Modifier.systemBarsPadding()` to keep text and buttons out from under the status bar and gesture area.

---

## How to Test Your Composables

Because `NoteListContent` is stateless, you can test it without a database or ViewModel by passing in a fake list. Create <VPIcon icon="fas fa-folder-open"/>`app/src/androidTest/java/com/yourname/quicknotes/`<VPIcon icon="iconfont icon-kotlin"/>`NoteListContentTest.kt`:

```kotlin :collapsed-lines title="app/src/androidTest/java/com/yourname/quicknotes/NoteListContentTest.kt"
package com.yourname.quicknotes

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import com.yourname.quicknotes.data.Note
import com.yourname.quicknotes.ui.NoteListContent
import org.junit.Assert.assertEquals
import org.junit.Rule
import org.junit.Test

class NoteListContentTest {

    @get:Rule
    val composeRule = createComposeRule()

    @Test
    fun showsEmptyMessageWhenThereAreNoNotes() {
        composeRule.setContent {
            NoteListContent(notes = emptyList(), onAddNote = {}, onOpenNote = {}, onDeleteNote = {})
        }

        composeRule.onNodeWithText("No notes yet").assertIsDisplayed()
    }

    @Test
    fun tappingANoteReportsItsId() {
        var openedId: Long? = null
        val notes = listOf(Note(id = 42, title = "Groceries", body = "Milk, eggs"))

        composeRule.setContent {
            NoteListContent(
                notes = notes,
                onAddNote = {},
                onOpenNote = { openedId = it },
                onDeleteNote = {}
            )
        }

        composeRule.onNodeWithText("Groceries").performClick()
        assertEquals(42L, openedId)
    }

    @Test
    fun deleteButtonIsLabelledForScreenReaders() {
        val notes = listOf(Note(id = 1, title = "Groceries", body = ""))

        composeRule.setContent {
            NoteListContent(notes = notes, onAddNote = {}, onOpenNote = {}, onDeleteNote = {})
        }

        composeRule.onNodeWithContentDescription("Delete Groceries").assertIsDisplayed()
    }
}
```

`createComposeRule()` sets up an empty activity where `setContent` can render any composable in isolation. Compose tests find elements through the semantics tree, the same structure accessibility services read. `onNodeWithText` finds a node by its visible text and `onNodeWithContentDescription` finds one by its accessibility label.

The first test confirms the empty state appears when the list is empty. The second test passes a lambda that records the ID it receives, taps the note, and asserts that the screen reported the correct ID. The third test checks that the delete button has a meaningful label, which doubles as an accessibility check. None of these tests touch Room or the ViewModel, which is the practical payoff of hoisting state out of `NoteListContent`.

Run the tests by right-clicking the file and choosing **Run 'NoteListContentTest'**, or from the terminal:

```sh
./gradlew connectedDebugAndroidTest
```

This Gradle task builds a debug version of the app and a separate test APK, installs both on the connected emulator or phone, runs every test in <VPIcon icon="fas fa-folder-open"/>`androidTest`, and writes an HTML report to <VPIcon icon="fas fa-folder-open"/>`app/build/reports/androidTests/connected/`. Instrumented tests need a running device. For logic that doesn't depend on Android, such as validation rules or formatting helpers, put unit tests in the <VPIcon icon="fas fa-folder-open"/>`test` folder and run them with `./gradlew testDebugUnitTest`, which runs on your computer in a few seconds.

---

## How to Prepare the App for Release

A debug build is fine for development, but there are several things to take care of before anyone else installs your app.

### Replace the Default App Icon

The template ships with the generic green Android icon. Right-click the `res` folder and choose **New > Image Asset**. Image Asset Studio generates an adaptive icon, which has a separate foreground and background layer so launchers can mask it into circles, squircles, or other shapes.

Keep the important part of your artwork inside the central safe zone shown in the preview, because the edges get cropped on some launchers. Also provide a monochrome layer. Android 13 and newer use it for themed icons, where the launcher tints every icon to match the wallpaper, and an app without one looks out of place on those phones.

### Move Hardcoded Strings into Resources

The screens in this article use hardcoded strings like `"Quick Notes"` and `"No notes yet"` to keep the code readable. In a real app, you'd want to move them into <VPIcon icon="fas fa-folder-open"/>`res/values/`<VPIcon icon="iconfont icon-code"/>`strings.xml` and read them with `stringResource(R.string.no_notes)`.

That is what makes translation possible, since Android picks the right <VPIcon icon="iconfont icon-code"/>`strings.xml` for the user's language automatically. Android Studio flags hardcoded strings with a lint warning and can extract them for you with the **Extract string resource** quick fix.

### Check the Release Build with R8

You enabled `isMinifyEnabled` in the release build type, which turns on R8. R8 removes unused code, shortens class and method names, and optimizes what remains. That typically makes an app noticeably smaller and faster, but it can break code that relies on reflection, because R8 can't see that a class is used if nothing references it directly.

Room, Compose, and kotlinx.serialization ship their own keep rules, so this app needs no extra configuration. If you add libraries that use reflection, check their documentation for rules to add to `proguard-rules.pro`.

The way to catch R8 problems is to actually run a release build before uploading it. Select the `release` variant from **Build > Select Build Variant** (it will use a debug signing key until you set up release signing in the next section), install it, and click through every screen. A crash that only appears in release builds is almost always a missing keep rule.

### Remove Unnecessary Permissions

Open your merged manifest (the **Merged Manifest** tab at the bottom of <VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml`) and look at the permissions listed. Libraries can add permissions you never asked for, and every permission you declare has to be justified in Play Console declarations. Quick Notes stores everything locally, so it shouldn't need any permissions at all, not even `INTERNET`. Fewer permissions also make the Data safety form in Play Console simpler to fill out.

---

## How to Create an Upload Key and Sign Your App

Every Android app must be cryptographically signed before it can be installed. Google Play uses a two-key system called Play App Signing. You sign your uploads with an upload key that you create and keep. Google verifies the upload, strips your signature, and re-signs the app with an app signing key that Google stores in its own secure infrastructure. Users only ever see the app signing key.

The benefit of this split is recovery. If you lose your upload key or it leaks, you can ask Google to reset it from Play Console, and your users keep receiving updates. Before Play App Signing existed, losing your only signing key meant you could never update your app again.

Play App Signing is mandatory for new apps, and it's also what makes Android App Bundles possible, since Google needs the signing key to generate optimized APKs for each device.

Create an upload key from the terminal with `keytool`, which comes with the JDK bundled in Android Studio:

```sh
keytool -genkeypair -v \
-keystore ~/keys/quicknotes-upload.jks \
-alias upload \
-keyalg RSA -keysize 2048 \
-validity 10000
```

This command creates a Java keystore file at `~/keys/quicknotes-upload.jks` containing one key pair with the alias `upload`. `-keyalg RSA -keysize 2048` sets the key type and strength Google Play expects, and `-validity 10000` makes the key valid for roughly 27 years. Google Play requires keys to be valid until at least October 2033. The tool prompts for a keystore password and asks for your name and organization, which are stored in the certificate. If `keytool` isn't on your path, Android Studio's **Build > Generate Signed App Bundle or APK** wizard can create the same key through a dialog.

Store the keystore somewhere outside your project folder and back it up to a password manager or encrypted storage. Never commit it to Git.

Next, create a <VPIcon icon="fas fa-gears"/>`keystore.properties` file in your project root to hold the signing details:

```properties title+"keystore.properties"
storeFile=/Users/yourname/keys/quicknotes-upload.jks
storePassword=your-keystore-password
keyAlias=upload
keyPassword=your-key-password
```

This file maps the four values Gradle needs to sign a build: the path to the keystore, the keystore password, the alias of the key inside it, and the password for that key. Keeping them in a separate file lets you share the project without sharing secrets. Add <VPIcon icon="fas fa-gears"/>`keystore.properties` and `*.jks` to your <VPIcon icon="iconfont icon-git"/>`.gitignore` right away.

Then load the file in <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="iconfont icon-kotlin"/>`build.gradle.kts` and create a release signing configuration:

```kotlin title="app/build.gradle.kts"
import java.util.Properties

val keystorePropertiesFile = rootProject.file("keystore.properties")
val keystoreProperties = Properties().apply {
    if (keystorePropertiesFile.exists()) {
        keystorePropertiesFile.inputStream().use { load(it) }
    }
}

android {
    // namespace, compileSdk, defaultConfig as before

    signingConfigs {
        if (keystorePropertiesFile.exists()) {
            create("release") {
                storeFile = file(keystoreProperties.getProperty("storeFile"))
                storePassword = keystoreProperties.getProperty("storePassword")
                keyAlias = keystoreProperties.getProperty("keyAlias")
                keyPassword = keystoreProperties.getProperty("keyPassword")
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.findByName("release")
        }
    }
}
```

The `import` must go at the very top of the file, above the `plugins` block. The script reads <VPIcon icon="fas fa-gears"/>`keystore.properties` into a `Properties` object if the file exists.

Inside `signingConfigs`, it creates a configuration named `release` from those values, but only when the file is present. That guard matters because a teammate cloning the repository, or a CI server running tests, won't have your keystore, and the build should still work for debug tasks.

The release build type then uses `findByName("release")`, which returns `null` instead of failing when the config doesn't exist. In a CI pipeline, you would typically read these values from environment variables or a secrets manager instead of a file.

---

## How to Build an Android App Bundle

Google Play doesn't accept APKs for new apps. You upload an Android App Bundle (AAB) instead. A bundle contains all of your compiled code and resources for every screen density, CPU architecture, and language. When a user installs the app, Google Play generates an APK containing only what that specific device needs. A phone with an English locale and a high density screen doesn't download Japanese strings or low density images, so the download is smaller.

Build the bundle from the terminal:

```sh
./gradlew bundleRelease
```

This task compiles the release variant, runs R8, signs the result with your upload key, and writes the bundle to <VPIcon icon="fas fa-folder-open"/>`app/build/outputs/bundle/release/`<VPIcon icon="fa-brands fa-android"/>`app-release.aab`. You can also use **Build > Generate Signed App Bundle or APK** in Android Studio, which does the same thing through a wizard. If the build fails with a signing error, double-check the path and passwords in <VPIcon icon="fas fa-gears"/>`keystore.properties`.

Before uploading, increase `versionCode` for every new build you send to Play. The first upload can use `1`, the next must be `2` or higher, and so on. Play rejects any bundle whose `versionCode` it has already seen, even on a different testing track. `versionName` can be anything, but semantic versions such as `1.0.0`, `1.0.1`, and `1.1.0` are easy for users and for you to follow.

---

## How to Create a Google Play Developer Account

Go to [<VPIcon icon="fa-brands fa-google"/>play.google.com/console](https://play.google.com/console) and sign in with the Google account you want to own the developer account. Consider creating a dedicated account for this rather than using your personal Gmail, since transferring ownership later is awkward.

You'll be asked to choose between a personal account and an organization account. A personal account is for individuals. An organization account is for registered businesses and requires a D-U-N-S number, a free business identifier from Dun and Bradstreet that can take a week or more to obtain.

The choice affects more than paperwork. New personal accounts must complete a closed testing period before they can publish to production (covered below), while organization accounts are exempt from that requirement. Your developer name and, for organizations and monetized personal accounts, your address are shown publicly on your store listing.

Pay the one-time 25 USD registration fee, then complete identity verification. Google asks for a legal name and address matching a government ID, verifies your contact email and phone number, and for personal accounts asks you to confirm that you have access to a physical Android device by installing the Play Console app and signing in. Verification usually takes a few days. You can't publish until it's complete, so start this step early, even before your app is finished.

Identity verification is becoming more important across the Android ecosystem. Google has begun rolling out developer verification for all apps installed on certified Android devices, including those distributed outside Google Play, starting with a handful of countries in late 2026. If you distribute through Play and have completed Play Console verification, you're already covered, but it's one more reason to make sure your account details are accurate.

---

## How to Create Your App in the Play Console

Once your account is verified, click **Create app** on the Play Console home page. Enter the app name as it should appear on Google Play (up to 30 characters), select the default language, choose **App** rather than **Game**, and choose **Free** or **Paid**.

Be careful here. You can change a paid app to free later, but a free app can never become paid. If you want to charge money, use in-app purchases or subscriptions instead. Accept the Developer Program Policies and US export law declarations and click **Create app**.

You land on the app dashboard, which shows a checklist of tasks grouped into sections. Play Console walks you through them in a sensible order, but the next two sections cover the parts that confuse people most.

---

## How to Complete the App Content Declarations

Under **Policy and programs > App content** (also linked from the dashboard checklist), Google asks a series of questions about your app. Every app must complete all of them before it can be released to any track, including internal testing.

The **Privacy policy** requires a public URL to a page describing what data your app collects and how it's used. This is required even if your app collects nothing. For Quick Notes, a short page stating that notes are stored only on the device and no data is collected or shared is enough. You can host it with GitHub Pages, Google Sites, or your own website, but it must be a working public web page, not a PDF or a Google Doc that requires sign-in.

**App access** asks whether parts of the app require login. If they do, you must provide test credentials so reviewers can reach every screen. Quick Notes has no login, so select that all functionality is available without special access.

**Ads** asks whether your app contains ads, including ads from SDKs you didn't write yourself. Answer honestly, because apps with ads get a "Contains ads" label on the store listing and reviewers check.

**Content rating** is an IARC questionnaire about violence, sexual content, language, controlled substances, user interaction, and similar topics. Your answers produce age ratings for regions around the world (ESRB in North America, PEGI in Europe, and so on). A notes app with no user-generated sharing will receive the lowest rating everywhere.

**Target audience and content** asks which age groups your app is designed for. If you include children under 13, your app falls under the Families policy, which adds requirements around ads, data collection, and SDKs. For a general purpose utility, choose 18 and over or a range starting at 13, unless children really are your audience.

**Data safety** is the most detailed form. It produces the "Data safety" section on your store listing and asks whether your app collects or shares each type of user data, such as location, contacts, personal info, and app activity, and for what purpose. The trap is that you're responsible for data collected by every library in your app, not only your own code. Analytics, crash reporting, and ad SDKs all collect data and must be declared.

Most major SDKs publish a page explaining exactly what to declare. Quick Notes uses no such libraries and makes no network calls, so the honest answer is that no data is collected or shared.

The remaining declarations (news apps, government apps, financial features, health apps, and others) are yes or no questions. For a notes app, the answer to each is no.

---

## How to Set Up Your Store Listing

The store listing, under **Grow users > Store presence > Main store listing**, is what people see before they install. It needs the following text and graphics.

| Asset | Requirement |
| --- | --- |
| App name | Up to 30 characters |
| Short description | Up to 80 characters |
| Full description | Up to 4000 characters |
| App icon | 512 x 512 px PNG, 32-bit with alpha, up to 1 MB |
| Feature graphic | 1024 x 500 px JPEG or 24-bit PNG, no alpha |
| Phone screenshots | 2 to 8 images, 16:9 or 9:16, each side between 320 and 3840 px |

The left column lists each required asset and the right column lists Google's current limits.

The short description appears directly under your app name in search results, so treat it as your one-line pitch and put your most important keyword in it. The full description is where you explain features in plain language. Google Play indexes it for search, but stuffing it with keywords violates the metadata policy and can get your listing rejected.

The 512 px icon is separate from the launcher icon inside the app, though it should look the same. Google applies the rounded mask itself, so upload a full square without pre-rounded corners or drop shadows. The feature graphic appears at the top of your listing in some layouts and when your app is promoted.

Screenshots are the biggest factor in whether someone installs. Capture them from the emulator using the camera button in the emulator toolbar, and consider adding short captions that explain what each screen does. If you want your app to show up well on tablets and Chromebooks, Play Console has separate slots for tablet screenshots, and providing them improves your listing on those devices.

Also fill in the **Store settings** page with an app category (Productivity fits Quick Notes), tags, and a contact email address. The contact email is shown publicly on the listing.

---

## How to Run Internal and Closed Testing

Google Play has several release tracks. Internal testing is for up to 100 testers you add by email, and builds are usually available within minutes with minimal review. Closed testing is for a larger group you control, either by email list or Google Group. Open testing lets anyone join from the store listing. Production is the public release.

Start with internal testing. Go to **Test and release > Testing > Internal testing**, create an email list of testers (you can include yourself), and click **Create new release**. The first time, Play Console asks you to confirm Play App Signing. Accept the default, which lets Google generate and protect the app signing key. Then upload your `app-release.aab`, enter release notes, and roll out the release.

Share the opt-in link from the **Testers** tab with your testers. They accept the invitation in a browser and can then install the app from Google Play like any other app. Installing through Play, instead of sideloading, proves the bundle works end to end with Play App Signing.

If you created a personal developer account, you can't publish to production right away. Personal accounts created after November 13, 2023 must run a closed test with at least 12 testers who have stayed opted in for the last 14 days continuously. Google introduced this rule to cut down on low-quality and abandoned apps, and it's the step that catches the most first-time developers by surprise.

Set this up under **Test and release > Testing > Closed testing**. Create a track, add testers through an email list or a Google Group, and upload a release (you can promote the same build from internal testing).

Recruit testers early. Friends, family, coworkers, and developer communities are the usual sources. The 12 testers must actually opt in through the link, and the count is of testers who remain opted in, so if someone leaves on day 10, your clock is affected. Plan for more than 12 to give yourself a buffer.

Use the 14 days productively. Ask testers to send feedback, watch for crashes in **Monitor and improve > Android vitals**, and push updated builds as you fix problems. Each update needs a higher `versionCode`. When Google reviews your production access request, it looks at whether you used the test to improve the app, not only whether time passed.

When the 14 days are up, the dashboard shows an **Apply for production** button. The application asks how you recruited testers, what feedback you received, what you changed as a result, and whether the app is ready for release. Answer specifically. Vague answers like "testers liked it" are a common reason for rejection. Approval typically takes up to a week.

---

## How to Publish to Production

Once you have production access, go to **Test and release > Production** and click **Create new release**. You can upload a new bundle or promote one from a testing track. Add release notes in the "What's new" field. Users see these on the store listing and in the update notification.

Before rolling out, choose which countries and regions to make the app available in, under the **Countries / regions** tab of the Production page. Then review the release summary. Play Console shows any errors that block the release (such as an incomplete declaration) and warnings that do not (such as missing translations). Fix the errors, read the warnings, and click **Send for review**.

Every new app and every update goes through review. For a brand new app, the first review can take up to seven days and occasionally longer. Later updates usually take a day or two. If the app is rejected, Play Console and your developer email explain which policy was violated. Fix the issue, increment the `versionCode`, and resubmit.

By default, approved releases go live as soon as they pass review. If you want to control the launch date, turn on **Managed publishing** in the **Publishing overview** page. Approved changes then wait until you click **Publish**, which is useful when you're coordinating with a blog post or a marketing date.

---

## How to Ship Updates After Launch

Getting your app live is the start of maintenance, not the end of the project. Three habits make updates go smoothly.

The first is staged rollouts. When you release an update to production, Play Console lets you choose a percentage of users to receive it, such as 10 percent. Watch crash and ANR (App Not Responding) rates in Android vitals for a day or two, then increase the percentage. If something goes wrong, you can halt the rollout, and the remaining users never get the broken version.

Google uses Android vitals thresholds to decide whether to show warnings on your listing or reduce its visibility, so catching problems at 10 percent matters.

The second is keeping your target SDK current. Google Play raises the minimum `targetSdk` for updates every year. If your app falls behind, you can no longer publish updates, and after a grace period new users on recent Android versions may not be able to find it.

Raising `targetSdk` isn't just changing a number. Read the behavior changes page for each new Android version and test your app against them. A good routine is to install the Android beta on a test device or emulator each spring so the August deadline is never a surprise.

The third is planning for database changes. When you add a column to `Note` or create a new entity, increment the `version` in `@Database` and give Room a migration. For simple changes, such as adding a column with a default value, Room can generate the migration if you declare `autoMigrations = [AutoMigration(from = 1, to = 2)]` in the annotation, using the schema JSON files you exported. Skipping this step causes a crash for every existing user the moment they open the updated app, and it's one of the most common causes of one-star reviews after an update.

---

## Summary

In this handbook, you built a complete native Android app with the tools Google currently recommends.

Jetpack Compose describes the UI as functions of state, and the state hoisting pattern keeps screens such as `NoteListContent` simple to test. Room provides compile-time checked storage that streams updates through a `Flow`, and a ViewModel exposes that data as a `StateFlow` that survives rotation. Navigation 3 treats the back stack as an ordinary list you own, so navigating forward and back are just `add` and `removeLastOrNull`.

On the release side, you configured R8 to shrink the app, created an upload key and stored it safely outside the project, and built a signed Android App Bundle. Play App Signing means Google holds the final signing key, so losing your upload key is recoverable instead of fatal.

Publishing to Google Play takes more than an upload. You verified your developer identity, filled in the privacy policy, content rating, and Data safety declarations honestly (including data collected by third party libraries), built a store listing, and, for a personal account, ran a 14 day closed test with at least 12 testers before applying for production access. Planning for that testing window from the start is the biggest thing you can do to avoid a delayed launch.

From here, good next steps are adding a dependency injection framework such as Hilt as the app grows, syncing notes to a backend, adding a second language through <VPIcon icon="iconfont icon-code"/>`strings.xml`, and setting up a CI pipeline that runs your tests and builds a signed bundle on every tagged release. The full flow you followed in this handbook stays the same no matter how large the app becomes.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build and Publish a Native Android App in 2026: From Jetpack Compose to the Google Play Store",
  "desc": "Most Android tutorials stop at ”it runs on the emulator.” But getting an app from a blank project to a listing that real people can install from Google Play involves a second half that's rarely discus",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-publish-native-android-app-from-jetpack-compose-to-google-play-store-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
