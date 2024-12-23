---
lang: en-US
title: "Migration Guide from Retrofit and KAPT to Ktor and KSP"
description: "Article(s) > Migration Guide from Retrofit and KAPT to Ktor and KSP"
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
      content: "Article(s) > Migration Guide from Retrofit and KAPT to Ktor and KSP"
    - property: og:description
      content: "Migration Guide from Retrofit and KAPT to Ktor and KSP"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp.html
prev: /programming/java-android/articles/README.md
date: 2024-12-03
isOriginal: false
author: Siva Ganesh Kantamani
cover: https://droidcon.com/wp-content/uploads/2024/12/0_K_Blg9wuGY60ti9k.webp
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
  name="Migration Guide from Retrofit and KAPT to Ktor and KSP"
  desc="Network Client and Annotation Processor migration to support Kotlin Multiplatform"
  url="https://droidcon.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/12/0_K_Blg9wuGY60ti9k.webp"/>

::: note Takeaway from this article

In this article, you’ll learn why we might need to migrate from Retrofit to Ktor and KAPT to KSP. By the end of this article, you will be able to remove Retrofit and KAPT from the project safely.

:::

---

## Introduction

This is part 2 in the series of migrations from the Android project to the kotlin multiplatform project. In [Part 1 (<FontIcon icon="fa-brands fa-medium"/>`sgkantamani`)](https://sgkantamani.medium.com/migration-guide-from-hilt-to-koin-ea8083d3f7a9), we discussed the KMP technology and the tech stack used in migrating applications to KMP. Then as a first step, we started with dependency injection migration from Hilt to Koin. The following is the link to the article in case you missed it.

<SiteInfo
  name="Migration Guide From Hilt to Koin"
  desc="DI migration to support Kotlin Multiplatform"
  url="https://sgkantamani.medium.com/migration-guide-from-hilt-to-koin-ea8083d3f7a9/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:1024/1*RIKjBF2V3iKk85t7all_CA.png"/>

In this part of the series, we’ll focus on migrating two main things:

1. Android network library Retrofit to purely Kotlin-based Ktor.
2. KAPT annotation processor to generate the code to KSP (Kotlin Symbol Processing).

Retrofit is a stable and very popular library in the Android world, but the lack of KMP support leaves me with no choice but to migrate. Ktor is the obvious choice to migrate as it’s built purely with Kotlin and is being maintained by Google. Ktor is more than just another client library for networking, to learn more about it read the following in-depth articles:

1. [<FontIcon icon="fa-brands fa-medium"/>How to Use Ktor in Your Android App](https://betterprogramming.pub/how-to-use-ktor-in-your-android-app-a99f50cc9444)
2. [<FontIcon icon="fa-brands fa-medium"/>Ktor in Server-Side Development: The Basics](https://betterprogramming.pub/ktor-in-server-side-development-the-basics-81ce4bbba878)

Kapt (Kotlin Annotation Processing Tool) enables Java annotation processors usage in Kotlin projects, even when the processors aren’t designed for Kotlin. KSP (Kotlin Symbol Processing) offers a Kotlin-centric alternative to Kapt. Unlike Kapt, KSP directly analyzes Kotlin code, making it up to twice as fast. Additionally, it has a deeper understanding of Kotlin’s language features.

---

## Retrofit to Ktor Migration

### Integration

To integrate ktor into the project add the following lines under the dependencies node in the app module and other modules where you might have to make the network calls.

```kotlin title="build.gradle.kts"
// Ktor
implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.2")
implementation("io.ktor:ktor-client-core:2.3.12")
// CIO - for JVM and Android
implementation("io.ktor:ktor-client-cio:2.3.12")
implementation("io.ktor:ktor-client-content-negotiation:2.3.12")
implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.12")
```

Then add the following line under the plugins section in the project-level gradle file.

```kotlin title="app/build.gradle.kts"
id 'org.jetbrains.kotlin.plugin.serialization' version '1.9.23' apply false
```

Now add the following lines in <FontIcon icon="fas fa-folder-open"/>`app/`<FontIcon icon="fas fa-file-lines"/>`proguard-rules.pro` to make sure Ktor works as expected in release builds even with obfuscation.

```proguard
# Ktor
-keep class io.ktor.** { *; }
-keep class kotlinx.coroutines.** { *; }
-dontwarn kotlinx.atomicfu.**
-dontwarn io.netty.**
-dontwarn com.typesafe.**
-dontwarn org.slf4j.**
```

Then remove all the Retrofit-related dependencies and hit the sync now button.

### DI Migration

Now we need to update the Koin network and data source modules, replacing the Retrofit with Ktor. Let’s start with the network module, The following is the Retrofit setup of the network module.

```kotlin
val networkModule = module {
    single<Gson> { GsonFactory.create() }
    single<Converter.Factory> { GsonConverterFactory.create(get()) }
    single<OkHttpClient> {
        OkHttpClientFactory.create()
    }
    single<Retrofit> {
        RetrofitFactory.create(
            okHttpClient = get(),
            converterFactory = get(),
        )
    }
}
```

After migration to Ktor, it looks as follows:

```kotlin
val networkModule = module {
    single<Json> {
        Json {
            ignoreUnknownKeys = true
            isLenient = true
            prettyPrint = true
            encodeDefaults = true
        }
    }

    single<HttpClient> {
        HttpClient(CIO) {
            install(ContentNegotiation) {
                get<Json>()
            }
        }
    }
}
```

Now we need to replace the retrofit inject with the Ktor client, as I’ve a single API in the application, I’m replacing the retrofit service interface with Kotr client and requesting with the client directly. But the real-time use of Ktor will be much more complicated with multiple routes and header configuration for which please refer to this [<FontIcon icon="fa-brands fa-medium"/>article](https://betterprogramming.pub/how-to-use-ktor-in-your-android-app-a99f50cc9444).

::: tabs

@tab:active Before

```kotlin title="WizardRemoteDataSource.kt"
class WizardRemoteDataSource constructor(
    private val api: RetrofitServiceApi,
): WizardDataSource
```

@tab After

```kotlin{2} title="WizardRemoteDataSource.kt"
class WizardRemoteDataSource constructor(
    private val httpClient: HttpClient,
): WizardDataSource
```

:::

That’s all, now the project network module is compatible with kotlin multiplatform.

---

## KAPT to KSP Migration

Before migrating your code to KSP, there are a few important considerations to keep in mind. Since KSP is relatively new, some libraries may not yet support it. However, there’s no need to worry — you can run KSP and Kapt side by side in your project.

It’s worth noting that Kapt is now in maintenance mode, so it’s a good idea to encourage your library providers to upgrade to KSP as soon as possible. Fortunately, many popular libraries like Dagger, Moshi, Room, and others already support KSP. To know more about supported libraries refer to this [<FontIcon icon="iconfont icon-kotlin"/>link](https://kotlinlang.org/docs/ksp-overview.html#resources).

Now let’s start the migration, I prefer to increase the Kotlin version before integrating KSP, in the project-level gradle upgrade Kotlin plugin.

::: tabs

@tab:active Before

```kotlin title="build.gradle.kts"
// Before
id 'org.jetbrains.kotlin.android' version '1.8.10' apply false
```

@tab After

```kotlin title="build.gradle.kts"
// After
id 'org.jetbrains.kotlin.android' version '2.0.0' apply false
```

:::

Then move to the module-level gradle files starting with the app module, remove the `kapt` and add `ksp` plugin, have a look:

![](https://droidcon.com/wp-content/uploads/2024/12/1_mwj65S07CAn-Yz0eKwV1UQ-1.webp)
<!-- TODO: Google Lens -->

Then remove all the `kapt` references like the following from the gradle:

![](https://droidcon.com/wp-content/uploads/2024/12/1_Uz43rrk7uxoE0ubBYYDOxw.webp)
<!-- TODO: Google Lens -->

As a final step replace all the `kapt` dependency integration to `ksp` as shown below:

![](https://droidcon.com/wp-content/uploads/2024/12/1_wEk7u7hPLpz90IVhUCcqlQ.webp)
<!-- TODO: Google Lens -->

Now hit the “sync now” button and then rebuild the project to complete the code generation.

The following are some common issues to look out for stated in the Android Official Documentation:

- Some libraries don’t support the same set of features with kapt and KSP. If your code breaks after migrating, check the library’s documentation.
- KSP has more accurate Kotlin-type information than kapt (for example, about nullability), which means that KSP processors can be more precise about type requirements. This might require some fixes in your source code as well, in addition to updating your build files.
- If you were previously passing in arguments to the annotation processor, you’ll likely need to pass in those arguments to KSP now. Note that the format of the arguments might differ between kapt and KSP. See the [<FontIcon icon="iconfont icon-kotlin"/>KSP documentation](https://kotlinlang.org/docs/ksp-quickstart.html#pass-options-to-processors) and consult the documentation of the library you’re using to learn more.

. . .

That is all for now, hope you learned something useful, thanks for reading.

You can find me on [Medium (<FontIcon icon="fa-brands fa-medium"/>`sgkantamani`)](https://medium.com/@sgkantamani), [X (<FontIcon icon="fa-brands fa-x-twitter"/>`SG5202`)](https://x.com/SG5202), [Quora](https://quora.com/profile/Siva-Ganesh-Kantamani-1) and [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`siva-kantamani-bb59309b`)](https://linkedin.com/in/siva-kantamani-bb59309b/).

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp-38c8cd5dc16c)

<SiteInfo
  name="Migration Guide from Retrofit and KAPT to Ktor and KSP"
  desc="Network Client and Annotation Processor migration to support Kotlin Multiplatform"
  url="https://proandroiddev.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp-38c8cd5dc16c/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/da:true/resize:fit:1200/0*K_Blg9wuGY60ti9k"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Migration Guide from Retrofit and KAPT to Ktor and KSP",
  "desc": "Network Client and Annotation Processor migration to support Kotlin Multiplatform",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/migration-guide-from-retrofit-and-kapt-to-ktor-and-ksp.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
