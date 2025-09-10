---
lang: en-US
title: "A Developer’s Roadmap to Mastering Kotlin Multiplatform"
description: "Article(s) > A Developer’s Roadmap to Mastering Kotlin Multiplatform"
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
      content: "Article(s) > A Developer’s Roadmap to Mastering Kotlin Multiplatform"
    - property: og:description
      content: "A Developer’s Roadmap to Mastering Kotlin Multiplatform"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/a-developers-roadmap-to-mastering-kotlin-multiplatform.html
prev: /programming/java-android/articles/README.md
date: 2024-11-27
isOriginal: false
author: Jaewoong Eum
cover: https://droidcon.com/wp-content/uploads/2024/11/0_D-ieHZMS5IWWRJUG-1024x576.webp
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
  name="A Developer’s Roadmap to Mastering Kotlin Multiplatform"
  desc="In modern mobile development, cross-platform frameworks are gaining popularity because they offer key advantages, such as reducing the resources needed to develop separate native apps and maintaining code consistency across different platforms."
  url="https://droidcon.com/2024/11/27/a-developers-roadmap-to-mastering-kotlin-multiplatform"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/0_D-ieHZMS5IWWRJUG-1024x576.webp"/>

In modern mobile development, cross-platform frameworks are gaining popularity because they offer key advantages, such as reducing the resources needed to develop separate native apps and maintaining code consistency across different platforms.

By allowing developers to write shareable code, these frameworks enable faster development and easier maintenance, making them attractive not only to startups and large companies but also to individual developers. With a single codebase, it’s possible to build multiple platform-specific apps, making cross-platform solutions highly efficient for both time and cost management.

[<VPIcon icon="iconfont icon-kotlin"/>Kotlin Multiplatform (KMP)](https://kotlinlang.org/docs/multiplatform.html)is another rising star in cross-platform development driven by the collaboration between[<VPIcon icon="iconfont icon-jetbrains"/>JetBrains](https://jetbrains.com/)and Google. It allows developers to share business logic seamlessly across multiple platforms, including Android, iOS, Desktop, and Web, all while using Kotlin. Compared to other cross-platform solutions like[<VPIcon icon="fa-brands fa-react"/>React Native](https://reactnative.dev/)or[<VPIcon icon="fa-brands fa-dart-lang"/>Flutter](https://flutter.dev/), Kotlin Multiplatform offers performance that is closer to native, making it an attractive choice for developers seeking efficiency and native-like performance without sacrificing the benefits of cross-platform development.

In this article, you’ll explore the Kotlin Multiplatform (KMP) ecosystem using the[Kotlin Multiplatform Developer Roadmap (<VPIcon icon="iconfont icon-github"/>`skydoves/kmp-developer-roadmap`)](https://github.com/skydoves/kmp-developer-roadmap)as your guide. The roadmap is designed to offer a comprehensive overview of the current KMP ecosystem, which provides suggested learning paths to help you better understand the various concepts involved in KMP development.

<SiteInfo
  name="skydoves/kmp-developer-roadmap"
  desc="🗺 The Kotlin Multiplatform Developer Roadmap offers comprehensive learning paths to help you understand KMP ecosystems."
  url="https://github.com/skydoves/kmp-developer-roadmap/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/95dd5745bb7d32616bed304f2be19f14398cde41b704a9a3d775758be2bba5ae/skydoves/kmp-developer-roadmap"/>

---

## Kotlin Multiplatform Architecture

Kotlin Multiplatform doesn’t inherently provide a UI framework. Instead, it focuses on sharing business logic across multiple platforms while enabling developers to create platform-specific UIs for Android, iOS, and other targets. The core idea is to write common logic in Kotlin once and reuse it across platforms like Android, JVM, iOS, macOS, JavaScript, and Linux, while maintaining full control over each platform’s native UI. This approach provides flexibility, as demonstrated in the illustration below:

![](https://droidcon.com/wp-content/uploads/2024/11/0_uEhRBAxVPCFpAs45-1024x315.webp)

Let’s jump into the architecture with some code exploration! Before setting up your first Kotlin Multiplatform (KMP) project, ensure the following prerequisites:

- Install the[<VPIcon icon="iconfont icon-jetbrains"/>Kotlin Multiplatform Plugin](https://plugins.jetbrains.com/plugin/14936-kotlin-multiplatform)in Android Studio.
- Launch Xcode at least once and accept the terms of use if you plan to build iOS apps.

<SiteInfo
  name="Kotlin Multiplatform - IntelliJ IDEs Plugin | Marketplace"
  desc="The Kotlin Multiplatform plugin helps you develop applications that work on both Android and iOS. With the Kotlin Multiplatform plugin for Android Studio, you can..."
  url="https://plugins.jetbrains.com/plugin/14936-kotlin-multiplatform/"
  logo="https://resources.jetbrains.com/storage/ui/favicons/favicon.ico"
  preview="https://plugins.jetbrains.com/plugin/files/14936/645310/icon/pluginIcon.png"/>

After meeting these requirements, open the[<VPIcon icon="iconfont icon-kotlin"/>Kotlin Multiplatform Wizard](https://kmp.jetbrains.com/). This will generate a project structure similar to the one below, giving you a foundation for cross-platform development.

![](https://droidcon.com/wp-content/uploads/2024/11/0_nTOrALojvKjBDQsQ-600x1024.webp)

After selecting Android, iOS, and Web, the Kotlin Multiplatform Wizard downloads a project pre-configured with a multiplatform architecture. You can then open the`composeApp`module’s`build.gradle.kts`file to view the platform setup. This file outlines each targeted platform’s configuration, dependencies, and shared code structure, helping you better understand the cross-platform architecture and how shared business logic integrates with platform-specific code below:

```kotlin :collapsed-lines title="kmp_arch.kt"
kotlin {
    @OptIn(ExperimentalWasmDsl::class)
    wasmJs {
        moduleName = "composeApp"
        browser {
            val rootDirPath = project.rootDir.path
            val projectDirPath = project.projectDir.path
            commonWebpackConfig {
                outputFileName = "composeApp.js"
                devServer = (devServer ?: KotlinWebpackConfig.DevServer()).apply {
                    static = (static ?: mutableListOf()).apply {
                        // Serve sources to debug inside browser
                        add(rootDirPath)
                        add(projectDirPath)
                    }
                }
            }
        }
        binaries.executable()
    }
    
    androidTarget {
        @OptIn(ExperimentalKotlinGradlePluginApi::class)
        compilerOptions {
            jvmTarget.set(JvmTarget.JVM_11)
        }
    }
    
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "ComposeApp"
            isStatic = true
        }
    }
}
```

<!-- @include: https://gist.github.com/skydoves/5d17bea13ec439ceff564a15dc934a76/raw/28e636f5848303e61611046a0c808a059214d74a/kmp_arch.kt -->

In the code above, you can configure target platforms and create hierarchical structures by grouping similar platforms, like`iosX64`and`iosArm64`. This setup allows you to share common code between similar platform targets, simplifying maintenance and reducing redundancy.

You can set up the targets below to configure KMP project platform architecture:

- `applyDefaultHierarchyTemplate()`: Configures a default shared source set hierarchy, simplifying setup by establishing common dependencies and configurations across platform targets, like Android, iOS, and JVM. It enables code reuse by creating shared source sets with logical hierarchies.
- `androidTarget()`: Adds Android as a target platform, allowing the KMP project to compile Android-specific code. For library modules,`publishLibraryVariants("release")`can be used to specify which build variants are published.
- `iosX64()`,`iosArm64()`,`iosSimulatorArm64()`: Configures targets for different iOS CPU architectures, supporting iOS on x64 (for simulator), arm64 (for devices), and Simulator Arm64. The`baseName`field can specify a framework name, like “ComposeApp,” for the output.
- `macosX64()`,`macosArm64()`: Targets for macOS, allowing the code to be compiled for macOS on both x64 (Intel) and Arm64 (Apple Silicon) architectures. This setup supports building shared code for macOS applications.
- `jvm()`: Compiles the shared code for the Java Virtual Machine (JVM), which is compatible with desktop and Android applications, providing easy integration with Java libraries and environments.
- `wasmJs()`: Configures the project to target WebAssembly with JavaScript interop, enabling shared Kotlin code to execute as WebAssembly (WASM) in a web environment. This is especially useful for creating performant web apps.
- `linuxX64()`,`linuxArm64()`: Targets for Linux on x64 and Arm64 architectures, allowing the shared code to run on Linux environments, which is helpful for server-side applications or embedded Linux devices.

Each target broadens the reach of your KMP project by allowing the core business logic to run across different operating systems and architectures. This flexibility helps maximize code reuse while supporting the specifics of each platform’s native capabilities.

If you’re ready to dive into building your first Android and iOS mobile applications with Kotlin Multiplatform, check out this guide:[<VPIcon icon="fas fa-globe"/>Build Your First Android and iOS Mobile App With Kotlin Multiplatform](https://getstream.io/blog/build-app-kotlin-multiplatform/).

<SiteInfo
  name="Build Your First Android and iOS Mobile App With Kotlin Multiplatform"
  desc="Explore how to set up and build your first Android and iOS application with Kotlin & Compose Multiplatform."
  url="https://getstream.io/blog/build-app-kotlin-multiplatform/"
  logo="https://getstream.io/icon.png"
  preview="https://stream-blog-v2.imgix.net/blog/wp-content/uploads/3e649d32cca176649df9bbb3ce95112d/Blog-BuildFirstAppWithKotlin-2400x1350px-scaled.jpg"/>

---

## Share Code

Kotlin Multiplatform lets you define a common interface specification across multiple platforms, unifying the interface hierarchy while allowing platform-specific implementations. To achieve this, you can use`expected`and`actual`declarations, which enable access to platform-specific APIs from Kotlin Multiplatform modules. This approach allows you to maintain platform-agnostic APIs in the common code, simplifying cross-platform development.

The`expect`keyword is used in the shared (common) code to declare a function, class, or property without defining its implementation. This acts as a placeholder, allowing you to specify the API that platform-specific modules will need to implement. For example, if you want to declare a shared function that logs across different platforms, you can declare a function called`log`like the code below:

```kotlin title="expect_log.kt"
// In common module
expect fun log(message: String)
```

<!-- @include: https://gist.github.com/skydoves/94181281cd99a4f69db18ca7b8c1a3ef/raw/1cb1f4ffb92757d148482048102287ae96b6aec0/expect_log.kt -->

The`actual`keyword is used in platform-specific modules to provide the implementation of the`expect`declarations. For each platform (e.g., Android, iOS), you create the`actual`implementation of the expected functionality. For instance, if you want to provide the actual implementation for the expected`log`function, you can define it differently for each specific platform, as shown in the example below:

```kotlin title="actual_log.kt"

// In Android module
actual fun log(message: String) {
  Log.d("TAG", message) 
}

// In iOS module
actual fun log(message: String) {
  NSLog(message)
}
```

<!-- @include: https://gist.github.com/skydoves/abff98159e6f280735cc10f1013e4480/raw/d24490291bd19133a157469482f69e98cdd23aa5/actual_log.kt -->

Now, you can use the`log`function across the common module. This approach provides flexibility by allowing platform-specific code without altering the common code. Additionally, it enables you to maintain platform-independent logic in the common module, maximizing code reuse. For more information about the`expect`and`actual`declarations, check out[<VPIcon icon="iconfont icon-kotlin"/>Expected and actual declarations](https://kotlinlang.org/docs/multiplatform-expect-actual.html).

---

## Compose Multiplatform

You’ve discovered that Kotlin Multiplatform is designed to share business logic across platforms but doesn’t include any UI solutions by default. This can be confusing, as most cross-platform frameworks provide UI components or layers that enable building screens with a unified codebase across different platforms.

A great solution for cross-platform UI in Kotlin Multiplatform is[<VPIcon icon="iconfont icon-jetbrains"/>Compose Multiplatform](https://jetbrains.com/compose-multiplatform/), which builds on Kotlin Multiplatform and enables developers to share UI code written in[<VPIcon icon="fa-brands fa-android"/>Jetpack Compose](https://developer.android.com/compose)across various platforms. JetBrains has forked the Jetpack Compose library (for Android) into the[<VPIcon icon="iconfont icon-github"/>`JetBrains/compose-multiplatform`](https://github.com/JetBrains/compose-multiplatform)repository and created compatible Compose UI clients for multiple platforms, including iOS, Desktop, and WebAssembly (WASM).

<SiteInfo
  name="JetBrains/compose-multiplatform"
  desc="Compose Multiplatform, a modern UI framework for Kotlin that makes building performant and beautiful user interfaces easy and enjoyable."
  url="https://github.com/JetBrains/compose-multiplatform/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/293498508/6469be07-159b-49de-9ffe-56340d5dfd07"/>

![](https://droidcon.com/wp-content/uploads/2024/11/0_mfz3dofAjirktQ5N-1024x590.webp)

With Compose Multiplatform, you can develop both Android and iOS applications using a unified UI implementation while sharing business logic written in Kotlin. Currently, Android and Desktop (Windows, macOS, Linux) support is stable, iOS is in beta, and Web is in alpha. For more details on future plans, check out the[<VPIcon icon="iconfont icon-jetbrains"/>Kotlin Multiplatform Development Roadmap for 2025](https://blog.jetbrains.com/kotlin/2024/10/kotlin-multiplatform-development-roadmap-for-2025/).

---

## AndroidX Library Compatibility

If you’re an Android developer, you might be wondering about the best ways to minimize migration costs from native Android to Kotlin Multiplatform, and that must be using the same tech stacks as much as possible, such as Jetpack libraries. The Android team is aware of this and has begun officially supporting KMP for several Jetpack libraries, as listed below:

- [<VPIcon icon="fa-brands fa-android"/>Lifecycle](https://developer.android.com/jetpack/androidx/releases/lifecycle): Lifecycle-aware components that react to changes in the lifecycle state of other components.
- [<VPIcon icon="fa-brands fa-android"/>Room Database](https://developer.android.com/jetpack/androidx/releases/room): A persistence library that provides an abstraction layer over SQLite, enabling robust database access with the full power of SQLite.
- [<VPIcon icon="fa-brands fa-android"/>DataStore](https://developer.android.com/jetpack/androidx/releases/datastore): Enables asynchronous, consistent, and transactional data storage, addressing limitations of SharedPreferences.
- [<VPIcon icon="fa-brands fa-android"/>Paging](https://developer.android.com/jetpack/androidx/releases/paging): Facilitates gradual and efficient data loading.
- [<VPIcon icon="fa-brands fa-android"/>Annotation](https://developer.android.com/jetpack/androidx/releases/annotation): Provides metadata to enhance code understanding for tools and developers.
- [<VPIcon icon="fa-brands fa-android"/>Collection](https://developer.android.com/jetpack/androidx/releases/collection): Optimizes memory usage for small collections.

Jetpack library releases for Android and iOS meet strict quality and compatibility standards. As Jetpack expands its Kotlin Multiplatform (KMP) support to other platforms, however, tooling and infrastructure are still developing. Check out the[sample project on GitHub (<VPIcon icon="iconfont icon-github"/>`android/kotlin-multiplatform-samples`)](https://github.com/android/kotlin-multiplatform-samples)for KMP-supported Jetpack libraries.

<SiteInfo
  name="android/kotlin-multiplatform-samples"
  desc="Samples showcasing the experimental Kotlin Multiplatform Jetpack libraries"
  url="https://github.com/android/kotlin-multiplatform-samples/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/9003ec6f9d14f43262b1446cc2f5c391ae40fa38cbbf29f03d1b5b4147689970/android/kotlin-multiplatform-samples"/>

According to the[<VPIcon icon="fa-brands fa-android"/>official documentation](https://developer.android.com/kotlin/multiplatform#supported-platforms), Jetpack libraries categorize platform support into three tiers:

- Tier 1: Android, JVM, iOS
- Tier 2: macOS, Linux
- Tier 3: watchOS, tvOS, Windows, WASM

For additional information on Kotlin Multiplatform support for Jetpack libraries, refer to the[<VPIcon icon="fa-brands fa-android"/>Kotlin Multiplatform Overview](https://developer.android.com/kotlin/multiplatform).

---

## Asynchronous

Asynchronous solutions are essential in mobile development due to limited resources compared to desktops. Both Android and iOS use the main thread (or UI thread) to handle all UI-related tasks, such as rendering elements, dispatching events, and managing interactions within the user interface.

For I/O or computationally intensive tasks like network requests or database queries, it’s best to offload them to a worker thread. This keeps the main thread free for rendering and user interactions, ensuring a responsive UI. In Kotlin,[<VPIcon icon="iconfont icon-kotlin"/>Coroutines](https://kotlinlang.org/docs/coroutines-overview.html)provide a powerful asynchronous solution, supported at the language level and enhanced through libraries, making it ideal for efficient concurrency.

Coroutines fully support Kotlin Multiplatform, allowing you to use them seamlessly across multiple platforms. They offer a lightweight concurrency solution with robust error-handling APIs, providing greater flexibility than traditional threads. This makes Coroutines one of the most promising asynchronous solutions for Kotlin Multiplatform development.

If you’re an avid[<VPIcon icon="fas fa-globe"/>ReactiveX](https://reactivex.io/)user, consider exploring[Reaktive on GitHub (<VPIcon icon="iconfont icon-github"/>`badoo/Reaktive`)](https://github.com/badoo/Reaktive), which brings ReactiveX extensions to Kotlin Multiplatform.

<SiteInfo
  name="badoo/Reaktive"
  desc="Kotlin multi-platform implementation of Reactive Extensions"
  url="https://github.com/badoo/Reaktive/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c72b5c97cf13a752e9ad4b827fef68c37411c7e3027a7987e71047e8f68e69cc/badoo/Reaktive"/>

---

## Network

On Android, Retrofit and OkHttp are the go-to solutions for handling type-safe HTTP network requests, streaming, and more. However, they don’t support Kotlin Multiplatform. Instead, there is another excellent HTTP asynchronous library[<VPIcon icon="fas fa-globe"/>r](https://ktor.io/), designed for creating multiplatform microservices and HTTP clients. Ktor is lightweight, flexible, and fully compatible with Coroutines, making them ideal for Kotlin Multiplatform projects.

Ktor is an asynchronous framework created by JetBrains for building applications and microservices in Kotlin. It supports both client-side and server-side development, making it versatile for building HTTP clients, REST APIs, web applications, and microservices across multiple platforms, including Android, JVM, JavaScript, and iOS. The key features of Ktor are:

1. Asynchronous by Design: Built with coroutines in mind, Ktor is fully asynchronous, leveraging Kotlin’s coroutines to provide high concurrency with minimal overhead.
2. Multiplatform Support: Ktor can be used in Kotlin Multiplatform projects, allowing you to write HTTP clients that work across different platforms (Android, iOS, JVM, etc.) with the same codebase.
3. Extensible and Modular: Ktor is modular, allowing you to add only the features you need, such as authentication, serialization, WebSocket support, and more, by including individual dependencies.
4. Flexible Routing: Ktor’s routing system is flexible, supporting path parameters, query parameters, and more. It enables organized API endpoints in server applications.
5. Built-In Serialization: Ktor integrates with Kotlin’s serialization library, making it easy to handle JSON, XML, and other serialization formats.

On the other hand, a solution called[<VPIcon icon="iconfont icon-github"/>`Foso/Ktorfit`](https://github.com/Foso/Ktorfit)is built on top of Ktor. Ktorfit is an HTTP client and Kotlin Symbol Processor designed for Kotlin Multiplatform, inspired by Retrofit. It offers a similar interface-based approach to define HTTP request methods, making it familiar for those who have used Retrofit.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Developer’s Roadmap to Mastering Kotlin Multiplatform",
  "desc": "In modern mobile development, cross-platform frameworks are gaining popularity because they offer key advantages, such as reducing the resources needed to develop separate native apps and maintaining code consistency across different platforms.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/a-developers-roadmap-to-mastering-kotlin-multiplatform.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
