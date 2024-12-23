---
lang: en-US
title: "Koin: My Favorite Dependency Injection Library for Android"
description: "Article(s) > Koin: My Favorite Dependency Injection Library for Android"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Koin: My Favorite Dependency Injection Library for Android"
    - property: og:description
      content: "Koin: My Favorite Dependency Injection Library for Android"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/koin-my-favorite-dependency-injection-library-for-android.html
prev: /programming/java-android/articles/README.md
date: 2024-11-06
isOriginal: false
author: Stefano Natali
cover: https://droidcon.com/wp-content/uploads/2024/11/1_vhOf2s2bGrVMycE24fzFPg-600x338.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Koin: My Favorite Dependency Injection Library for Android"
  desc="In Android development, Hilt is often the go-to library for dependency injection due to its official support from Google and deep integration with Android libraries. However, I prefer Koin for its simplicity, fast adoption and Kotlin-first approach. In my experience, Koin’s lightweight design makes it easier to set up and maintain, while providing a powerful DI solution that doesn’t compromise on flexibility. Let’s explore why Koin is my favorite DI library and how you can use it effectively in your Android projects."
  url="https://droidcon.com/koin-my-favorite-dependency-injection-library-for-android"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_vhOf2s2bGrVMycE24fzFPg-600x338.webp"/>

![](https://droidcon.com/wp-content/uploads/2024/11/1_vhOf2s2bGrVMycE24fzFPg-600x338.webp)

In Android development, **Hilt** is often the go-to library for dependency injection due to its official support from Google and deep integration with Android libraries. However, I prefer **Koin** for its simplicity, fast adoption and Kotlin-first approach. In my experience, Koin’s lightweight design makes it easier to set up and maintain, while providing a powerful DI solution that doesn’t compromise on flexibility. Let’s explore why Koin is my favorite DI library and how you can use it effectively in your Android projects.

---

## Why Koin?

There are a number of reasons why I love Koin. First, it’s easy to use. Koin has a simple and intuitive API that makes it easy to get started with dependency injection. Second, Koin is lightweight. It won’t add a lot of overhead to your application. Third, Koin is powerful. It provides a powerful set of features that can help you manage dependencies in complex applications. Finally, Koin offers direct integrations with **Jetpack Compose.**

---

## Getting Started with Koin

Getting started with Koin is easy. You can add the Koin library to your project using the version catalog and the gradle file.

```toml title="libs.versions.toml"
[versions]
koin = "4.0.0"
...
[libraries]
koin-android = { module = "io.insert-koin:koin-android", version.ref = "koin" }
koin-androidx-compose = { module = "io.insert-koin:koin-androidx-compose", version.ref = "koin" }
...
```

```kotlin title="build.gradle.kts"
implementation(libs.koin.androidx.compose)
implementation(libs.koin.android)
// ...
```

Once you’ve added the libraries, you can start defining your dependencies. Koin uses modules to define dependencies. A module is a collection of dependencies that can be used together. Here’s an example:

```kotlin
val myModules = module {
    single { MyHttpClient().getClient() }
    factory { BookService(get()) as IBookService }
    factoryOf(::BookDownloader)
    single { BookDatabase.getInstance(get()) }
    factoryOf(::DatabaseRepository)
    factoryOf(::BookRepository)
    singleOf(::PrefsDataStore)

    viewModelOf(::NavigationViewModel)
    viewModelOf(::HomeViewModel)
    viewModelOf(::LibraryViewModel)
    viewModelOf(::ZoomBookViewModel)
    viewModelOf(::ReaderEpubViewModel)
    viewModelOf(::LanguagesSelectorViewModel)
    viewModelOf(::TopicViewModel)
    viewModelOf(::SettingsViewModel)
}
```

Within a module, you can declare various types of components:

- **Single:** Provides a single instance of a dependency throughout the application’s lifecycle.
- **Factory:** Creates a new instance of a dependency each time it’s requested.
- **ViewModel:** Specifically designed for Android ViewModel instances, ensuring proper lifecycle management.

With the standard component definition you can also use the extensions functions (**`singleOf`, `factoryOf` and `viewModelOf`** ) to provide a more concise syntax for creating instances.

---

## Initializing Koin Application

Once you’ve defined your modules, it’s time to integrate Koin with your application.

```kotlin
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        startKoin {
            androidLogger()
            androidContext(applicationContext)
            modules(myModules)
        }
    }
}
```

In your <FontIcon icon="fa-brands fa-android"/>`AndroidManifest.xml` file, update the `application` tag to reference your custom application class:

```xml title="AndroidManifest.xml"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:name=".MyApplication"
    >
    </application>
<!-- ... -->
</manifest>
```

By following these steps, you’ve successfully initialized Koin and made it ready to manage your application’s dependencies.

---

## Injecting Dependencies

Koin makes it straightforward to inject dependencies into your classes. By defining your modules and components, you can directly access them within your classes.

Here’s an example of a `HomeViewModel` using dependencies provided by Koin:

```kotlin
class HomeViewModel(
    private val bookRepository: BookRepository,
    prefsDataStore: PrefsDataStore,
    private val gutenbergRepository: GutenbergRepository,
) : ViewModel() {
    // ViewModel logic here
}
```

For a **Jetpack Compose** environment, the setup is slightly different. In your **Activity**, it’s helpful to wrap all Compose code inside a `KoinAndroidContext` to define the Koin Context and then use the dependencies:

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyBooksTheme {
                KoinAndroidContext {
                    val navigationViewModel = koinViewModel<NavigationViewModel>()
                    // Additional UI code here
                }
            }
        }
    }
}
```

In your Composable functions, you can then easily inject your ViewModels with Koin:

```kotlin
@Composable
fun HomeInitScreen(
    navigationViewModel: NavigationViewModel = koinViewModel(viewModelStoreOwner = LocalContext.current as ComponentActivity),
    homeViewModel: HomeViewModel = koinViewModel(),
) {
    // UI code here
}
```

In this example:

- `NavigationViewModel` will follow the lifecycle of the **Activity**, making it suitable for app-wide navigation.
- `HomeViewModel` will be scoped to the `HomeInitScreen` Composable function, fitting the more transient lifecycle of UI elements in Compose.

This setup allows for precise lifecycle management with minimal boilerplate, making Koin an excellent choice for **Compose-based projects**.

---

## Testing with Koin

Koin’s structure makes it highly testable and ideal for achieving high code coverage. Dependencies can be easily **mocked or replaced**, and you can even define custom Koin modules specifically for testing purposes.

```kotlin
class MyTest: KoinTest { 
  @Before 
  fun setup() { 
    startkoin ( modules (testModule)) 
  } 

  @After 
  fun tearDown() { 
    stopKoin() 
  } 
}
```

This flexibility allows you to isolate and test individual components effectively.

To ensure that your Koin modules are configured correctly, you can use the **verify** extension provided by Koin’s testing utilities:

```kotlin
class MyModulesTest: KoinTest {

    @OptIn(KoinExperimentalAPI::class)
    @Test
    fun testMyModules() {
        myModules.verify(
            extraTypes = listOf(
                Application::class,
                Context::class,
            )
        )
    }
}
```

This test verifies the correctness of the `myModules` definition, ensuring that all dependencies are defined and can be resolved.

By following these guidelines, you can effectively test your Koin-based applications, improving code quality and reducing potential issues.

---

## Koin Annotations: A Hilt-like Approach

If you prefer Hilt’s annotation-based approach, Koin recently introduced annotations, allowing you to mark dependencies with simple annotations for a more declarative setup. This style lets you define dependencies similarly to Hilt.

One key difference is that Koin traditionally resolves dependencies at runtime. This means that if a dependency is missing, the error only appears when the dependency is requested. With the new annotation-based approach, Koin now offers **compile-time checking** for dependencies, which catches these issues during the build process. This extra validation is especially valuable for large apps with complex dependency trees, adding a layer of robustness and reliability to your project.

To update the implementation we already defined to Koin annotations, follow these steps:

- Include the Kotlin Symbol Processing (KSP) plugin:

```toml title="libs.versions.toml"
[versions]
ksp = "2.0.20-1.0.25"
koinAnnotations = "2.0.0-Beta1"
...
[plugins]
googleDevtoolsKsp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
...
```

```kotlin title="app/build.gradle.kts"
plugins {
    alias(libs.plugins.googleDevtoolsKsp)
    // ...
}
```

- Include the extra Koin dependencies for annotations, and the KSP compiler:

```toml title="libs.versions.toml"
[versions]
koinAnnotations = "2.0.0-Beta1"
...
[libraries]
koin-annotations = { module = "io.insert-koin:koin-annotations", version.ref = "koinAnnotations" }
koin-ksp-compiler = { module = "io.insert-koin:koin-ksp-compiler", version.ref = "koinAnnotations" }
...
```

```kotlin title="app/build.gradle.kts"
dependencies {
    ksp(libs.koin.ksp.compiler)
    implementation(libs.koin.annotations)
    // ...
}
```

- Enable compile-time safety checks in your <FontIcon icon="iconfont icon-kotlin"/>`build.gradle.kts`:

```kotlin
ksp {
    arg("KOIN_CONFIG_CHECK", "true")
}
```

With this configuration in place, you can remove your modules definition:

```kotlin title="MyApplication.kt"
import org.koin.ksp.generated.*

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        startKoin {
            androidLogger()
            androidContext(applicationContext)
            modules(defaultModule)
        }
    }
}
```

and start migrating your dependencies by using Koin’s annotations: `@Single`, `@Factory`, and `@KoinViewModel`. Simply add the relevant annotation on top of each class to define its lifecycle and scope.

::: tip Example

```kotlin
@Single
class PrefsDataStore(private val context: Context) {
    //logic here
}
@Factory
class BookRepository(
    private val bookService: IBookService, private val prefsDataStore: PrefsDataStore
) {
    //logic here
}

@KoinViewModel
class HomeViewModel(
    private val bookRepository: BookRepository,
    prefsDataStore: PrefsDataStore,
    private val gutenbergRepository: GutenbergRepository,
) : ViewModel() {
    // ViewModel logic here
}
```

:::

Once you’ve annotated your dependencies, Koin will verify them at compile time. If any dependencies are missing or misconfigured, you’ll receive an error during the build process, allowing you to catch issues early. This **compile-time validation** makes your app more robust, especially as it scales and new dependencies are added.

::: info Migrating from Hilt to Koin

If you’re convinced about Koin’s benefits and want to migrate your Hilt project, a helpful guide can be found here:

```component VPCard
{
  "title": "How To Migrate from Hilt to Koin - A Detailed Guide",
  "desc": "Migrate from Hilt to Koin for Android devs. A step-by-step guide to cover setup, annotation replacements, module migration, testing, & Compose previews.",
  "link": "/blog.kotzilla.io/migrate-from-hilt-to-koin.md",
  "logo": "https://blog.kotzilla.io/hubfs/favicon.png",
  "background": "rgba(238,181,80,0.2)"
}
```

This guide walks you through the process of translating Hilt annotations to their Koin counterparts.

:::

---

## Conclusion

Now you know why **Koin** is my favorite **Dependency Injection library for Android**. I really like its simplicity, flexibility, and Kotlin-centric approach. Its easy setup and clear lifecycle management make it ideal for both small and large applications.

With Koin, you have the flexibility to define dependencies in a straightforward syntax, while also benefiting from recent advancements like annotation support and compile-time checks. These features allow you to ensure dependency correctness during the build process, enhancing the reliability of your app as it grows in complexity.

Whether you’re building a new project or considering a DI solution for an existing one, Koin’s simplicity and power make it an excellent choice. By following the guidelines in this article, you can take advantage of Koin’s capabilities to create a clean, maintainable, and testable codebase for your Android apps.

If you found this article interesting, feel free to follow me for more insightful content on Android development and Jetpack Compose. I publish new articles almost every week. Don’t hesitate to share your comments or reach out to me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`stefano-natali-q21`)](http://linkedin.com/in/stefano-natali-q21) for further discussions.

Have a great day!

::: info 

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>proandroiddev.com](https://proandroiddev.com/koin-my-favorite-dependency-injection-library-for-android-776db4d455c8)

<SiteInfo
  name="Koin: My Favorite Dependency Injection Library for Android"
  desc="Easy to set up, Lightweight and Kotlin-centric"
  url="https://proandroiddev.com/koin-my-favorite-dependency-injection-library-for-android-776db4d455c8/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1024/1*vhOf2s2bGrVMycE24fzFPg.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Koin: My Favorite Dependency Injection Library for Android",
  "desc": "In Android development, Hilt is often the go-to library for dependency injection due to its official support from Google and deep integration with Android libraries. However, I prefer Koin for its simplicity, fast adoption and Kotlin-first approach. In my experience, Koin’s lightweight design makes it easier to set up and maintain, while providing a powerful DI solution that doesn’t compromise on flexibility. Let’s explore why Koin is my favorite DI library and how you can use it effectively in your Android projects.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/koin-my-favorite-dependency-injection-library-for-android.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
