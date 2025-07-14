---
lang: en-US
title: "Getting Started with Koin Annotations 1.4 in Compose Multiplatform"
description: "Article(s) > Getting Started with Koin Annotations 1.4 in Compose Multiplatform"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - blog.kotzilla.io
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting Started with Koin Annotations 1.4 in Compose Multiplatform"
    - property: og:description
      content: "Getting Started with Koin Annotations 1.4 in Compose Multiplatform"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.kotzilla.io/koin-annotations-1.4-in-compose-multiplatform.html
prev: /programming/java-android/articles/README.md
date: 2024-10-17
isOriginal: false
author: The Kotzilla Team
cover: https://blog.kotzilla.io/hubfs/Screenshot%202024-10-24%20at%2012.03.30.png
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
  name="Getting Started with Koin Annotations 1.4 in Compose Multiplatform"
  desc="Streamline your Compose Multiplatform project by migrating from Koin DSL to Koin Annotations 1.4. Learn dependency setup, component migration, and platform implementations."
  url="https://blog.kotzilla.io/koin-annotations-1.4-in-compose-multiplatform"
  logo="https://blog.kotzilla.io/hubfs/favicon.png"
  preview="https://blog.kotzilla.io/hubfs/Screenshot%202024-10-24%20at%2012.03.30.png"/>

If you've been using Koin's DSL for dependency injection in your Kotlin Multiplatform projects, you might be interested in exploring a more annotation-driven approach. In this guide, Arnaud walks you through migrating a simple [<FontIcon icon="iconfont icon-jetbrains"/>Compose Multiplatform](https://jetbrains.com/compose-multiplatform/) application from Koin DSL to the new [<FontIcon icon="fas fa-globe"/>Koin Annotations 1.4.](https://insert-koin.io/docs/reference/koin-annotations/start)

---

## Project Overview

We'll be working with the [KMP App Template (<FontIcon icon="iconfont icon-github"/>`InsertKoinIO/KMP-App-Template`)](https://github.com/InsertKoinIO/KMP-App-Template/?tab=readme-ov-file#using-koin-annotations) from JetBrains, which provides a great starting point for our exploration. The data displayed by the app is from [<FontIcon icon="fas fa-globe"/>The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/). This app already uses [<FontIcon icon="fas fa-globe"/>Koin](https://insert-koin.io/) for dependency injection. This template implements this simple art gallery application that displays a list of paintings and their details. While the functionality is straightforward, it serves as an excellent example to demonstrate Koin's annotation-based dependency injection. And bonus : it's beautiful to look at.

---

## Setting Up Dependencies

Before diving into the migration, let's ensure we have all the necessary dependencies:

```groovy
dependencies {
  implementation("io.insert-koin:koin-core:3.6.0-beta5")
  implementation("io.insert-koin:koin-compose:1.2.0-beta5")
  implementation("io.insert-koin:koin-annotations:1.4.0")
  implementation("io.insert-koin:koin-ksp-compiler:1.4.0")
}
```

Don't forget to set up [<FontIcon icon="fas fa-globe"/>KSP (Kotlin Symbol Processing)](https://mvnrepository.com/artifact/com.google.devtools.ksp/symbol-processing-api/1.9.24-1.0.20) in your project, as it's essential for annotation processing.

---

## Project Structure

Our sample application follows a clean architecture approach with the following key components:

- Data Layer:
  - `MuseumAPI`: Handles remote data fetching
  - `MuseumRepository`: Manages data operations
  - `MuseumStorage`: Handles local data persistence
- UI Layer:
  - List Screen: Displays paintings grid
  - Detail Screen: Shows painting details
  - ViewModels: Manages UI state and business logic

---

## Migrating to Koin Annotations

### Step 1: View Model Migration

Let's start by migrating our view models from DSL to annotations. Replace the existing DSL module definition:

```kotlin
@Module
@ComponentScan("com.package.screens")
class ViewModelModule

@ViewModel
class PaintingViewModel(val repository: MuseumRepository): ViewModel() { 
  // Implementation
}
```

### Step 2: Data Layer Migration

Next, let's tackle the data layer components:

```kotlin
@Module
@ComponentScan("com.package.data")
class DataModule

@Singleton
class MuseumRepository (
  private val api: MuseumAPI, 
  private val storage: MuseumStorage
)

@Singleton
class MuseumAPI(private val httpClient: HttpClient)
```

### Step 3: Complex Initializations

For more complex scenarios where you need custom initialization logic, you can use separate functions with the `@Single` annotation:

```kotlin
@Module
class NetworkModule {
  @Single fun provideHttpClient(json: Json): HttpClient {
    return HttpClient { 
      // Configuration 
    }
}
```

---

## Platform-Specific Components

One of the powerful features of Koin Annotations is its support for platform-specific implementations. Here's how to set it up:

```kotlin
// Common Native 
@Module expect class NativeModule 

expect class PlatformComponent { 
  fun sayHello(): String
} 

// Native Implementation in Android 
@Module
@ComponentScan("com.jetbrains.kmpapp.native") 
actual class NativeModule

@Single
actual class PlatformComponent (val context: Context) { 
  actual fun sayHello(): String = "I'm Android $context" 
}

// Native Implementation in iOS
@Module
@ComponentScan("com.jetbrains.kmpapp.native")
actual class NativeModule 

@Single
actual class PlatformComponent {
  actual fun sayHello(): String = "I'm iOS" 
}
```

---

## Benefits of Using Koin Annotations

- 🔸 **Cleaner Code**: Annotations provide a more declarative and concise way to define dependencies  
- 🔸 **Better IDE Support**: Enhanced code navigation and refactoring capabilities  
- 🔸 **Compile-Time Validation**: Earlier detection of dependency injection issues  
- 🔸 **Reduced Boilerplate**: KSP generates necessary extension functions automatically  
- 🔸 **Platform-Specific Support**: Seamless handling of platform-specific dependencies

---

## Wrapping Up

Migrating from Koin DSL to Annotations might require some initial setup, but the benefits in terms of code clarity and maintainability are well worth it. The annotation-based approach provides a more familiar paradigm for developers coming from other dependency injection frameworks while maintaining Koin's lightweight and Kotlin-first philosophy.

Remember to check out the [<FontIcon icon="fas fa-globe"/>official Koin documentation](https://insert-koin.io/) for more detailed information and advanced usage scenarios. Tell us what you think!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Started with Koin Annotations 1.4 in Compose Multiplatform",
  "desc": "Streamline your Compose Multiplatform project by migrating from Koin DSL to Koin Annotations 1.4. Learn dependency setup, component migration, and platform implementations.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.kotzilla.io/koin-annotations-1.4-in-compose-multiplatform.html",
  "logo": "https://blog.kotzilla.io/hubfs/favicon.png",
  "background": "rgba(238,181,80,0.2)"
}
```
