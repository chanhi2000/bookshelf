---
lang: en-US
title: "Room setup in Kotlin Multiplatform (KMP) with Koin"
description: "Article(s) > Room setup in Kotlin Multiplatform (KMP) with Koin"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Swift
  - SwiftUI
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
  - swift
  - swiftui
  - swift-ui
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Room setup in Kotlin Multiplatform (KMP) with Koin"
    - property: og:description
      content: "Room setup in Kotlin Multiplatform (KMP) with Koin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/room-setup-in-kotlin-multiplatform-kmp-with-koin.html
prev: /programming/java-android/articles/README.md
date: 2025-02-14
isOriginal: false
author: Harry
cover: https://miro.medium.com/v2/resize:fit:1400/format:webp/0*AqbaidgCIsZmKZM8
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

```component VPCard
{
  "title": "Swift > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/swift/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Room setup in Kotlin Multiplatform (KMP) with Koin"
  desc="In this article, we’ll explore the recommended approach for implementing Room in Kotlin Multiplatform (KMP) with Koin for dependency injection and the motivations behind each decision."
  url="https://droidcon.com/2025/02/14/room-setup-in-kotlin-multiplatform-kmp-with-koin"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*AqbaidgCIsZmKZM8"/>

![Photo by [<FontIcon icon="fas fa-globe"/>Andreas Gücklhorn](https://unsplash.com/@draufsicht) on [<FontIcon icon="fas fa-globe"/>Unsplash](https://unsplash.com/)](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*AqbaidgCIsZmKZM8)

In this article, we’ll explore the recommended approach for implementing Room in Kotlin Multiplatform (KMP) with Koin for dependency injection and the motivations behind each decision.

To visualise the Room implementation, we’ll build a screen using Compose Multiplatform (CMP) and launch the app on Android and iOS.

---

## Getting started

To begin, we add the required dependencies to our <FontIcon icon="iconfont icon-toml"/>`libs.versions.toml` file.

```toml title="libs.versions.toml"
[versions]
room = "2.7.0-alpha13"
ksp = "2.1.10-1.0.29"
sqlite = "2.4.0"
koin = "4.0.0"

[libraries]
androidx-room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
sqlite-bundled = { module = "androidx.sqlite:sqlite-bundled", version.ref = "sqlite" }

koin-android = { module = "io.insert-koin:koin-android", version.ref = "koin" }
koin-core = { module = "io.insert-koin:koin-core", version.ref = "koin" }
koin-compose = { module = "io.insert-koin:koin-compose", version.ref = "koin" }
koin-compose-viewmodel = { module = "io.insert-koin:koin-compose-viewmodel", version.ref = "koin" }

[plugins]
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
room = { id = "androidx.room", version.ref = "room" }
```

<!-- @import https://gist.github.com/shorthouse/66ca4e96086a7f9e2bc6a2fcfcf99677/raw/ae577326fa17133e656da167d368e99e1ff6e450/libs.versions.toml -->

We then use these dependencies in our <FontIcon icon="iconfont icon-kotlin"/>`build.gradle.kts` file, alongside using the Room plugin to declare the database schema directory.

```kotlin title="build.gradle.kts"
plugins {
    alias(libs.plugins.room)
    alias(libs.plugins.ksp)
}

kotlin {
    sourceSets {
        androidMain.dependencies {
            implementation(compose.preview)
            implementation(libs.androidx.activity.compose)
            implementation(libs.koin.android)
        }
        commonMain.dependencies {
            implementation(libs.androidx.room.runtime)
            implementation(libs.sqlite.bundled)
            api(libs.koin.core)
            implementation(libs.koin.compose)
            implementation(libs.koin.compose.viewmodel)
        }
    }
}

dependencies {
    add("kspAndroid", libs.androidx.room.compiler)
    add("kspIosSimulatorArm64", libs.androidx.room.compiler)
    add("kspIosX64", libs.androidx.room.compiler)
    add("kspIosArm64", libs.androidx.room.compiler)
}

room {
    schemaDirectory("$projectDir/schemas")
}
```

<!-- @import https://gist.github.com/shorthouse/411083b0bce7741f27fa17be76c77920/raw/5dc461a561bce3d7d6fd1b41c4d874e69ea49464/build.gradle.kts -->

---

## Room setup

In common code, we create an entity to define the structure of the database table. In this article, we’re storing a list of movies.

```kotlin title="Movie.kt"
@Entity
data class Movie(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0L,

    val name: String,
)
```

<!-- @import https://gist.github.com/shorthouse/5de3b9046556c10eb9c6cd7e82f57f85/raw/a17105ffaea5ad940d63c85368ace0a2549b6c4f/Movie.kt -->

Next, we set up a `MovieDao` to interact with the database. Using `Flow` makes the movie list reactive, and `suspend` functions ensure we don’t block the UI thread during database operations.

```kotlin title="MovieDao.kt"
@Dao
interface MovieDao {
    @Query("SELECT * FROM movie")
    fun getMovies(): Flow<List<Movie>>
  
    @Insert
    suspend fun insert(movie: Movie)

    @Query("DELETE FROM movie")
    suspend fun deleteMovies()
}
```

<!-- @import https://gist.github.com/shorthouse/9371fea0278637bbd7e84b15e8c1c4c6/raw/5f5353c0c46986fab82fdc3fe73fd0fa1c794f9d/MovieDao.kt -->

Still in common code, we create an `abstract` class that extends `RoomDatabase` and incorporates the entity and DAO. We also define a database constructor and link this to the database using the `@ConstructedBy` annotation.

```kotlin title="MovieDatabase.kt"
@Database(entities = [Movie::class], version = 1)
@ConstructedBy(MovieDatabaseConstructor::class)
abstract class MovieDatabase: RoomDatabase() {
    abstract fun getMovieDao(): MovieDao
}

// Room compiler generates the `actual` implementations
@Suppress("NO_ACTUAL_FOR_EXPECT")
expect object MovieDatabaseConstructor : RoomDatabaseConstructor<MovieDatabase> {
    override fun initialize(): MovieDatabase
}
```

<!-- @import https://gist.github.com/shorthouse/62ad3237a64ed3f159eb4d68fb327d46/raw/500f60df86093d574c5e50458bf75a1e4f3afb05/MovieDatabase.kt -->

The Room compiler will generate the `actual` implementations of the database constructor for us, so we add a `@Suppress` annotation to ignore any warnings related to this.

### Database builder

The database requires a builder, and this is the only component in Room for KMP that requires platform-specific logic.

In <FontIcon icon="fas fa-folder-open"/>`androidMain`, we create a function that takes in an Android `Context` to define a database path and uses this to return a database builder.

```kotlin title="getDatabaseBuilder.android.kt"
fun getDatabaseBuilder(context: Context): RoomDatabase.Builder<MovieDatabase> {
    val appContext = context.applicationContext
    val dbFile = appContext.getDatabasePath("movie_database.db")

    return Room.databaseBuilder<MovieDatabase>(
        context = appContext,
        name = dbFile.absolutePath,
    )
}
```

<!-- @import https://gist.github.com/shorthouse/bb5d91b7d8328afb8dae780d375f3e3b/raw/9c541d2504981537ea5c69279b1162898b5ca878/getDatabaseBuilder.android.kt -->

Similarly, in <FontIcon icon="fas fa-folder-open"/>`iosMain` we create a function that uses `NSFileManager` and `NSDocumentDirectory` to define a database path and return a database builder.

```kotlin :collapsed-lines title="getDatabaseBuilder.ios.kt"
fun getDatabaseBuilder(): RoomDatabase.Builder<MovieDatabase> {
    val dbFilePath = documentDirectory() + "/movie_database.db"
    return Room.databaseBuilder<MovieDatabase>(
        name = dbFilePath,
    )
}

@OptIn(ExperimentalForeignApi::class)
private fun documentDirectory(): String {
    val documentDirectory = NSFileManager.defaultManager.URLForDirectory(
        directory = NSDocumentDirectory,
        inDomain = NSUserDomainMask,
        appropriateForURL = null,
        create = false,
        error = null,
    )

    return requireNotNull(documentDirectory?.path)
}
```

<!-- @import https://gist.github.com/shorthouse/bc6a6e1af24424b818902d346c53ad1e/raw/aa6991ea74d2c7df9b4f6a848b63652a110005ec/getDatabaseBuilder.ios.kt -->

### Database creation

Back in <FontIcon icon="fas fa-folder-open"/>`commonMain`, we define a function that takes in the platform-specific database builders and creates the database. For the database driver, we use the `BundledSQLiteDriver` — this is the [<FontIcon icon="fa-brands fa-android"/>recommended](https://developer.android.com/kotlin/multiplatform/room#database-instantiation) driver for Room KMP as it provides the most consistent and up-to-date version of SQLite across all platforms. The `BundledSQLiteDriver` also has the benefit of being usable in common code, which means we don’t have to specify a driver for each platform.

```kotlin title="getMovieDatabase.kt"
fun getMovieDatabase(builder: RoomDatabase.Builder<MovieDatabase>): MovieDatabase {
    return builder
        .setDriver(BundledSQLiteDriver())
        .setQueryCoroutineContext(Dispatchers.IO)
        .build()
}
```

<!-- @import https://gist.github.com/shorthouse/d14a567bd1e94b9cc60b027da463f3d0/raw/dbc05be6efaee599ad6fa430a2a9ce2521b5fb75/getMovieDatabase.kt -->

We also configure the database to use `Dispatchers.IO` for executing asynchronous queries, which is the [<FontIcon icon="iconfont icon-kotlin"/>recommended](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-i-o.html) `Dispatcher` for database IO operations and ensures the queries won’t block the UI thread.

---

## Koin setup

The final part of this Room KMP setup is using Koin to tie everything together. To start, we create a `commonModule` in <FontIcon icon="fas fa-folder-open"/>`commonMain` to manage shared dependencies.

```kotlin title="CommonModule.kt"
fun commonModule(): Module = module {
    single<MovieDao> { get<MovieDatabase>().getMovieDao() }
}
```

<!-- @import https://gist.github.com/shorthouse/9ec1dcedf5e233154fa9825f996c0d95/raw/6a2c392f34364cefee98dd9ec77bc28d44994323/CommonModule.kt -->

For platform-specific dependencies, we create a `platformModule` in <FontIcon icon="fas fa-folder-open"/>`commonMain` using the `expect` / `actual` mechanism.

```kotlin title="PlatformModule.kt"
expect fun platformModule(): Module
```

<!-- @import https://gist.github.com/shorthouse/a18bd7b37e0ad7710594ccf5ed119a42/raw/8a70a36b9c36db07aef94efda16e944c8593fd44/PlatformModule.kt -->

We implement this `platformModule` in `androidMain` using a provided `Context` value to create the database.

```kotlin title="PlatformModule.android.kt"
actual fun platformModule(): Module = module {
    single<MovieDatabase> {
        val builder = getDatabaseBuilder(context = get())
        getMovieDatabase(builder)
    }
}
```

<!-- @import https://gist.github.com/shorthouse/f80b9531220bd1c6a0724c59b36d1d22/raw/ede41fc89e0f8fb3e79c8b44bd8d209209370cfd/PlatformModule.android.kt -->

Implementing the `platformModule` in <FontIcon icon="fas fa-folder-op"/>`iosMain` is simpler since it does not require a `Context` value.

```kotlin title="PlatformModule.ios.kt"
actual fun platformModule(): Module = module {
    single<MovieDatabase> {
        val builder = getDatabaseBuilder()
        getMovieDatabase(builder)
    }
}
```

<!--@import https://gist.github.com/shorthouse/271e444c067f11c4b44a0e490a966fc7/raw/92a8381e0c103af6d8e4fa1ec5e3b84509ef691f/PlatformModule.ios.kt -->

### Initialising Koin

Next, we define functions to initialise Koin on both platforms in our common code. As seen above, our Android `platformModule` requires a `Context` for the database builder. To provide this, we add a `KoinAppDeclaration` parameter to our `initKoin` function. We use this inside the `startKoin` function, which gives Koin modules access to the `Context` value.

```kotlin title="Koin.kt"
fun initKoin(appDeclaration: KoinAppDeclaration = {}) {
    startKoin {
        appDeclaration()
        modules(
            commonModule() + platformModule()
        )
    }
}
```

<!-- @import https://gist.github.com/shorthouse/97b27f9614478f05923f94e3f4721abd/raw/9b8ee7212e6bfd1428a76940de907fcbf1737951/Koin.kt -->

We then create a new class in `androidMain` that extends `Application` and calls the `initKoin` function, passing the Android `Context` in.

```kotlin title="MainApplication.kt"
class MainApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        initKoin(
            appDeclaration = { androidContext(this@MainApplication) },
        )
    }
}
```

<!-- @import https://gist.github.com/shorthouse/b39ece9874aa74604fc8353bfae8ed22/raw/1bea3e6aa396b8fc06fd016081580b0c5d97fb23/MainApplication.kt -->

To use this new `MainApplication` class, we are required to update the <FontIcon icon="fa-brands fa-android"/>`AndroidManifest.xml` file.

```xml title="AndroidManifest.xml"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    
  <application
    android:name=".MainApplication"
    <!-- Rest of manifest -->
  </application>

</manifest>
```

<!-- @import https://gist.github.com/shorthouse/5e67fccac6e58c05cb1754297ff55dee/raw/16f66133200f61b5271ff900528557f9548bf26b/AndroidManifest.xml -->

Now we can define a function to initialise Koin for iOS, which doesn’t require a `Context` value. We encounter a quirk in KMP here, as function default values do not work in native iOS code, so we can’t simply call the `initKoin` function. To solve this, we define an `initKoinIos` function that passes in an empty lambda value for the `appDeclaration` parameter.

```kotlin title="Koin.kt"
fun initKoinIos() = initKoin(appDeclaration = {})
```

<!-- @import https://gist.github.com/shorthouse/20aa85ab00edd2f1d0143a6d0c010a22/raw/81aef0dae3e6c820d7ac91b109518907c42fd47b/Koin.kt -->

The `initKoinIos` function has to be called in native Swift code. To do this, we use the file name of the function and the function name with the `do` value prepended. We also import `ComposeApp` to give the Swift code access to the function.

```swift title="iOSApp.swift"
import SwiftUI
import ComposeApp

@main
struct iOSApp: App {
    init() {
        KoinKt.doInitKoinIos()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

<!-- @import https://gist.github.com/shorthouse/0c04cea45b5a05ed25bee7dd79dc0ace/raw/932bd831434298a30208d26a6cacd704cce2f7dd/iOSApp.swift -->

---

## Complete Room

That’s it! We can now inject the `MovieDao` in common code, giving us access to our Room database on both platforms.

### Crafting a UI

To visualise the Room implementation, we’ll build a movie list screen using Compose Multiplatform and launch the app on both Android and iOS, all within our common code.

We start by defining a `MovieUiState` for the screen, which holds a movie name the user can enter, and a list of movies to display. For the movie name, we use the [recommended (<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/basictextfield2-a-textfield-of-dreams-1-2-0103fd7cc0ec) `TextFieldValue` instead of a simple `String` value.

```kotlin title="MovieUiState.kt"
data class MovieUiState(
    val movieName: TextFieldValue = TextFieldValue(""),
    val movies: List<Movie> = emptyList()
)
```

<!-- @import https://gist.github.com/shorthouse/9d13f0a75045d312603f8e8f91ee84ba/raw/8a56397551c12aeb62657f6a12c6818a196ed56c/MovieUiState.kt -->

Next, we create a `MovieViewModel` and inject our `MovieDao` in. The `MovieDao` is injected straight into the `ViewModel` here to keep things simple for this article. In production code, the app layering would be more robust, and the `MovieDao` would be injected into a repository or a data source.

We also add a private `MutableStateFlow` backing field to store the movie name value.

```kotlin title="MovieViewModel.kt"
class MovieViewModel(private val movieDao: MovieDao): ViewModel() {

    private val _movieName = MutableStateFlow(TextFieldValue(""))
}
```

<!-- @import https://gist.github.com/shorthouse/fc52096d35fcaea24eb69facc8d64aa5/raw/bd26a0a230097907c6ad57492ba0c24cf8ca52e7/MovieViewModel.kt -->

### State production

To produce the UI state, we combine the `Flow` list of movies with the `MutableStateFlow` movie name field.

```kotlin title="MovieViewModel.kt"
class MovieViewModel(private val movieDao: MovieDao): ViewModel() {

    private val _movieName = MutableStateFlow(TextFieldValue(""))

    val uiState: StateFlow<MovieUiState> = combine(
        movieDao.getMovies(),
        _movieName
    ) { movies, movieText ->
        MovieUiState(movieName = movieText, movies = movies)
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = MovieUiState()
    )
}
```

<!-- @import https://gist.github.com/shorthouse/52216e4f0881a0eb80775d9801405284/raw/5e798082e4d65d5deacf0f8a6fc286c757e4a18b/MovieViewModel.kt -->

The `stateIn` operator is the [<FontIcon icon="fa-brands fa-android"/>recommended](https://developer.android.com/topic/architecture/ui-layer/state-production#stream-apis) way to produce UI state from reactive streams. A key reason for this is because it allows state production to start only when collection begins in the UI, instead of occurring as soon as the `ViewModel` is created if the `init{}` function is used. This gives you more control over the `ViewModel` and `uiState`, making it easier to test.

The `stateIn` operator also gives us finer-grained control over the state production behaviour through the `started` parameter. This can be set to either `SharingStarted.WhileSubscribed` if the state should only be active when the UI is visible, or `SharingStarted.Lazily` if the state should be active as long as the user may return to the UI.

### Finalising the ViewModel

To complete the `ViewModel`, we provide three functions to update the state.

```kotlin :collapsed-lines title="MovieViewModel.kt"
class MovieViewModel(private val movieDao: MovieDao): ViewModel() {

    // ...

    fun updateMovieName(newText: TextFieldValue) {
        _movieName.value = newText
    }

    fun insertMovie(movieName: String) {
        viewModelScope.launch {
            movieDao.insert(Movie(name = movieName))
        }
    }

    fun deleteMovies() {
        viewModelScope.launch {
            movieDao.deleteMovies()
        }
    }
}
```

<!-- @import https://gist.github.com/shorthouse/f81ab94ef7ecd95202b6230b5564bb80/raw/8ca6e93689defa8a16a77d3fd67e17ab4c3a0e89/MovieViewModel.kt -->

We also add the `ViewModel` to our Koin `commonModule`, allowing us to inject it into our screen.

```kotlin title="CommonModule.kt"
fun commonModule(): Module = module {
    single<MovieDao> { get<MovieDatabase>().getMovieDao() }
    singleOf(::MovieViewModel)
}
```

<!-- @import https://gist.github.com/shorthouse/e6680d8c5a142463bce4efd9077bda6a/raw/c78329267b08fe5a1c299bef4576c5d446cf6575/CommonModule.kt -->

### Movie screen

With the `ViewModel` set up, the next step is to create the screen. It is [<FontIcon icon="fa-brands fa-android"/>recommended practice](https://developer.android.com/jetpack/compose/state#stateful-vs-stateless) to create both a *stateful* and a *stateless* version of each screen in your app, as it makes them more reusable, easier to test, and simpler to preview.

We first create the *stateful* screen by injecting the `ViewModel` using Koin and collecting the UI state. We then pass the UI state and the state updating functions into the *stateless* screen.

```kotlin title="MovieScreen.kt"
@Composable
fun MovieScreen(viewModel: MovieViewModel = koinViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    MovieScreen(
        movies = uiState.movies,
        movieName = uiState.movieName,
        onUpdateMovieName = viewModel::updateMovieName,
        onAddMovie = viewModel::insertMovie,
        onDeleteMovies = viewModel::deleteMovies
    )
}
```

<!-- @import https://gist.github.com/shorthouse/dd507bbd7d796a3f931334b547ffb649/raw/e8674d831f9b38500a1dba5f646affe59228ffff/MovieScreen.kt -->

We then create the *stateless* screen, using a `Scaffold` to ensure proper inset padding.

```kotlin title="MovieScreen.kt"
@Composable
fun MovieScreen(
    movies: List<Movie>,
    movieName: TextFieldValue,
    onUpdateMovieName: (TextFieldValue) -> Unit,
    onAddMovie: (String) -> Unit,
    onDeleteMovies: () -> Unit
) {
    Scaffold(modifier = Modifier.fillMaxSize()) { scaffoldPadding ->
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier
                .padding(scaffoldPadding)
                .padding(16.dp)
        ) {
            // ...
        }
    }
}
```

<!-- @import https://gist.github.com/shorthouse/89ae0490487e76c469ba6eea3be9d964/raw/80222c114cf9819ab06bedefd2ea0056f4c80771/MovieScreen.kt -->

Inside the `Column`, we add two Composables that enable the user to add a movie to the Room database.

```kotlin title="MovieScreen.kt"
OutlinedTextField(
    value = movieName,
    onValueChange = { onUpdateMovieName(it) },
    label = { Text(text = "Enter movie name") },
    modifier = Modifier.fillMaxWidth()
)

Button(
    onClick = {
        if (movieName.text.isNotBlank()) {
            onAddMovie(movieName.text)
            onUpdateMovieName(TextFieldValue(""))
        }
    },
    modifier = Modifier.fillMaxWidth()
) {
    Text(text = "Add Movie")
}
```

<!-- @import https://gist.github.com/shorthouse/53b90f5e035120c4850ae359a9b06763/raw/0489e0f743e8f0c72e06decebd429599df4ae3f0/MovieScreen.kt -->

To display the movies, we define a `MovieItem` and use this within a `LazyColumn` to create a scrollable list of movies.

```kotlin title="MovieScreen.kt"
@Composable
fun MovieItem(
    movie: Movie,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(4.dp),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Text(
            text = movie.name,
            modifier = Modifier.padding(16.dp)
        )
    }
}
```

<!-- @import https://gist.github.com/shorthouse/e49ee1ed2d12edfabfad2004e6ae0be4/raw/56cb579e59160db903395fd675fcc63328e1b6a7/MovieScreen.kt -->

```kotlin title="MovieScreen.kt"
LazyColumn(modifier = Modifier.weight(1f)) {
    items(movies) { movie ->
        MovieItem(movie)
    }
}
```

<!-- @import https://gist.github.com/shorthouse/0997decbb8e6f1314eb7011654f2fc1b/raw/25307230d2258295d21c0b816c66c0e2e750dce6/MovieScreen.kt -->

To clear the movies list, we create a button and hook this up to the `onDeleteMovies` function.

```kotlin title="MovieScreen.kt"
Button(
    onClick = onDeleteMovies,
    colors = ButtonDefaults.buttonColors(
        containerColor = MaterialTheme.colorScheme.tertiary,
    ),
    modifier = Modifier.fillMaxWidth()
) {
    Text(text = "Delete Movies")
}
```

<!-- @import https://gist.github.com/shorthouse/7f93b31be191dcd6d9e1af81dee3bf3b/raw/9bda7899619dc6151005180faa4219184d3ea8ca/MovieScreen.kt -->

To make the `MovieScreen` reachable within the app, we simply add it to the base `App` Composable. In a production app, you would instead integrate this `MovieScreen` into your existing navigation logic.

```kotlin title="App.kt"
@Composable
fun App() {
    MaterialTheme {
        MovieScreen()
    }
}
```

<!-- @import https://gist.github.com/shorthouse/caf2ec1b1f897306b6cfee06581e0b45/raw/7ab286fa62b7b74723b5f0cecb4ae328a087c29b/App.kt -->

---

## App deployment

![We can now deploy the finished app to both platforms, starting with Android.](https://miro.medium.com/v2/resize:fit:712/format:webp/1*7LVjO1Pf8HN-74MTV7p41w.gif)

![Running the app on iOS produces the same behaviour, and validates that the Room implementation is functioning correctly on both platforms! 🎉s](https://miro.medium.com/v2/resize:fit:778/format:webp/1*hK-QzXlCThtmFxumrMh3MQ.gif)

---

## Conclusion

That wraps up this article — I hope it has given you a better understanding of how to use Room in Kotlin Multiplatform with Koin.

You can find my app projects on [GitHub (<FontIcon icon="iconfont icon-github"/>`shorthouse`)](https://github.com/shorthouse) — feel free to reach out with any questions or feedback.

Happy coding!

::: info

This article is previously published on [proandroiddev.com (<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/room-in-kotlin-multiplatform-kmp-with-koin-d7716bdd8783)

<SiteInfo
  name="Room setup in Kotlin Multiplatform (KMP) with Koin"
  desc="In this article, we’ll explore the recommended approach for implementing Room in Kotlin Multiplatform (KMP) with Koin"
  url="https://proandroiddev.com/room-in-kotlin-multiplatform-kmp-with-koin-d7716bdd8783/"
  logo="https://miro.medium.com/v2/resize:fill:128:128/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/da:true/resize:fit:1200/0*AqbaidgCIsZmKZM8"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Room setup in Kotlin Multiplatform (KMP) with Koin",
  "desc": "In this article, we’ll explore the recommended approach for implementing Room in Kotlin Multiplatform (KMP) with Koin for dependency injection and the motivations behind each decision.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/room-setup-in-kotlin-multiplatform-kmp-with-koin.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
