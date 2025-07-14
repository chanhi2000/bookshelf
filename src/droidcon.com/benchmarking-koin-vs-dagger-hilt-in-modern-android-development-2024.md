---
lang: en-US
title: "Benchmarking Koin vs. Dagger Hilt in Modern Android Development (2024)"
description: "Article(s) > Benchmarking Koin vs. Dagger Hilt in Modern Android Development (2024)"
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
      content: "Article(s) > Benchmarking Koin vs. Dagger Hilt in Modern Android Development (2024)"
    - property: og:description
      content: "Benchmarking Koin vs. Dagger Hilt in Modern Android Development (2024)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/benchmarking-koin-vs-dagger-hilt-in-modern-android-development-2024.html
prev: /programming/java-android/articles/README.md
date: 2024-12-03
isOriginal: false
author: Arnaud Giuliani
cover: https://droidcon.com/wp-content/uploads/2024/12/1_h5ULv-tGdDA3yD2c685lFQ.webp
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
  name="Benchmarking Koin vs. Dagger Hilt in Modern Android Development (2024)"
  desc="When choosing a dependency injection framework for Android and Kotlin development, performance is often a key consideration. This article explores the performance of Koin in its latest version (4.0.1-Beta1) and compares it with Dagger Hilt (2.52). Rather than relying on simplistic benchmarks or limited code execution scenarios, the focus is “developer-centric”: understanding performance in real-world, day-to-day usage. Additionally, this article aims to reassure those who may hesitate to adopt Koin due to performance concerns."
  url="https://droidcon.com/2024/12/03/benchmarking-koin-vs-dagger-hilt-in-modern-android-development-2024"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/12/1_h5ULv-tGdDA3yD2c685lFQ.webp"/>

When choosing a dependency injection framework for Android and Kotlin development, performance is often a key consideration. This article explores the performance of**Koin**in its latest version (**4.0.1-Beta1**) and compares it with**Dagger Hilt (2.52)**. Rather than relying on simplistic benchmarks or limited code execution scenarios, the focus is “developer-centric”: understanding performance in real-world, day-to-day usage. Additionally, this article aims to reassure those who may hesitate to adopt**Koin**due to performance concerns.

![From original[Google’s Now in Android (<FontIcon icon="iconfont icon-github"/>`android/nowinandroid`)](https://github.com/android/nowinandroid)banner.](https://droidcon.com/wp-content/uploads/2024/12/1_h5ULv-tGdDA3yD2c685lFQ.webp)

---

## What to benchmark?

Benchmarking such frameworks poses a significant challenge: ensuring fair comparison and focused on equivalent behaviors and features.

To make this exercise meaningful, I’ve opted for a user-oriented approach: evaluating the time it takes to build a component requested from the UI (like ViewModels and so on …). To ensure our test context is strong enough, we need a complex enough application (no basic “Hello World” or to-do list app).

For this purpose, I’ve chosen to use Google’s[Now in Android app (<FontIcon icon="iconfont icon-github"/>`android/nowinandroid`)](https://github.com/android/nowinandroid), a great open-source application that is complex enough and covers the challenges of real-life development and where the Android team demonstrates best practices (modularization, Jetpack Compose, and dependency injection …).

By evaluating Koin and Dagger Hilt in this environment, we aim to get insights that truly matter to Android developers.

::: note

👉 Sources are available at[<FontIcon icon="iconfont icon-github"/>`InsertKoinIO/nowinandroid`](https://github.com/InsertKoinIO/nowinandroid)

<SiteInfo
  name="InsertKoinIO/nowinandroid"
  desc="A fully functional Android app built entirely with Kotlin and Jetpack Compose"
  url="https://github.com/InsertKoinIO/nowinandroid/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7048e8e7705c5c973ef7d210b020a50539b6d75a3c2903c6206803dc55c8e8fc/InsertKoinIO/nowinandroid"/>

:::

You will find the following branches:

- [<FontIcon icon="fas fa-code-branch"/>`perfs_koin`](https://github.com/InsertKoinIO/nowinandroid/tree/perfs_koin)— is the Now in Android migrated to Koin branch, with performances measurement
- [<FontIcon icon="fas fa-code-branch"/>`perfs_hilt`](https://github.com/InsertKoinIO/nowinandroid/tree/perfs_hilt) — is the default Hilt branch, with performances measurement

And don’t forget[<FontIcon icon="fas fa-globe"/>official Koin documentation](https://insert-koin.io/). Now, let’s dive into the details!

---

## Service Locator or Dependency Injection? Koin can do both!

Before diving into the benchmarks, let’s address a common question about Koin: Is it a Service Locator or a Dependency Injection (DI) framework? The answer is **both**.

- A**Service Locator**retrieves dependencies dynamically through a centralized registry.
- **Dependency Injection**provides dependencies explicitly at instantiation, enhancing testability and maintainability.

Koin bridges these two approaches, offering dynamic retrieval via`get()`or`inject()`while also supporting DI features like constructor injection and scoping.

Koin’s dynamic behavior is influenced by Android’s lifecycle, which historically made constructor injection challenging. While modern Android features now support constructor injection, Koin remains flexible, letting developers choose the best approach for their needs.

At its core,**Koin is a DI framework**. It avoids reflection overhead, uses a Kotlin DSL for dependency graphs, and supports scoped lifecycles. However, its ability to function as a Service Locator adds versatility, particularly for simpler or legacy projects.

This is a summary, but this Koin project[<FontIcon icon="fas fa-globe"/>documentation page](https://insert-koin.io/docs/setup/why/#koin-a-dependency-injection-framework)has more details if you need to go deeper.

---

## Why choose Koin?

- **Simple and Developer-Friendly:** Koin’s clean DSL, no compile-time overhead, minimal setup, and easy testing let you focus on building your apps.
- **Scales with Your App: f**rom small apps to complex projects, Koin scales effortlessly to meet your needs.
- **Evolving Compile-Time Safety:** With features like module validation (**Verify API**),**Koin Annotations**(KSP for configuration safety), and the upcoming**Koin IDE Plugin**, Koin simplifies coding while boosting safety.
- **Ready for Kotlin Multiplatform:** Koin seamlessly manages dependencies across iOS, Android, Desktop, and Web, making it the go-to DI framework for cross-platform development.
- **Perfect for Compose Multiplatform:** Koin integrates effortlessly with Compose Multiplatform, supporting shared logic and DI for UI components — even**ViewModel**.

If you’re curious about Koin’s internals and design, let me know — I’d be happy to explore that in a future article. For now, let’s dive into the benchmarks! 😁

### Tracking Performances

Tracking the performance of components over sessions is trickier than it initially seems. While tools like[<FontIcon icon="fa-brands fa-android"/>**Baseline Profiles Macrobenchmark**](https://developer.android.com/topic/performance/baselineprofiles/measure-baselineprofile)and similar deep-dive tools offer great analysis, they don’t allow me to easily extract benchmark values for custom use. Alternatively, connected dev platforms like**Firebase Crashlytics or** [<FontIcon icon="fas fa-globe"/>**Kotzilla Platform**](https://kotzilla.io/)offer convenient solutions to capture and analyze performance metrics.

My goal here is to**stay simple and lightweight**: I want to**measure how long it takes to create a specific component**, like building a ViewModel instance using dependency injection. I don’t need a complex framework for this task, but I’m OK with manually instrumenting my code as long as it’s straightforward and lightweight.

To achieve this, I wrote a few functions to capture function call time from DI frameworks (All is in[<FontIcon icon="iconfont icon-kotlin"/>`Measure.kt` (<FontIcon icon="iconfont icon-github"/>`InsertKoinIO/nowinandroid`)](https://github.com/InsertKoinIO/nowinandroid/blob/perfs_koin/core/data/src/main/kotlin/com/google/samples/apps/nowinandroid/core/data/Measure.kt)file). This utility leverages**Kotlin’s** **measureTimedValue** function, an elegant and efficient way to measure code execution times, making it an excellent fit for lightweight, manual instrumentation. By extending the Android`Context`, I created an easy way to log the duration of any function call (or dependency injection operation) directly to a log file.

```kotlin
inline fun <reified T> Context.measureTimeLazy(tag : String, code : () -> Lazy<T>) : Lazy<T>{
    val result = measureTimedValue(code)
    val timeInMs = result.duration.inWholeMicroseconds / 1000.0
    logBenchmark(tag,timeInMs)
    return result.value
}
```

In the end,**we are storing all results in a local file**(function**logBenchmark**). This file will be extracted, to allow average times calculation.

### Now in Android

Now, let’s see how these tracking functions are applied in our real-world scenario. For this benchmark, we’ll measure the performance of the following components:**MainActivityViewModel**,**ForYouViewModel**, and**startup time**.

These ViewModels are the first two used in the application, making them ideal candidates for assessing the performance of DI frameworks during the app’s initial loading phase.

In the**Koin implementation**, the performance tracking for these components is instrumented as follows ([<FontIcon icon="iconfont icon-github"/>`MainActivity.kt` (<FontIcon icon="iconfont icon-github"/>`InsertKoinIO/nowinandroid`)](https://github.com/InsertKoinIO/nowinandroid/blob/perfs_koin/app/src/main/kotlin/com/google/samples/apps/nowinandroid/MainActivity.kt#L77)&[<FontIcon icon="iconfont icon-github"/>`ForYouScreen.kt` (<FontIcon icon="iconfont icon-github"/>`InsertKoinIO/nowinandroid`)](https://github.com/InsertKoinIO/nowinandroid/blob/perfs_koin/feature/foryou/src/main/kotlin/com/google/samples/apps/nowinandroid/feature/foryou/ForYouScreen.kt#L113) links):

```kotlin :collapsed-lines title="MainActivity.kt"
class MainActivity : ComponentActivity() {

    /**
     * Lazily inject [JankStats], which is used to track jank throughout the app.
     */
    val lazyStats by inject<JankStats> { parametersOf(this) }

    val networkMonitor: NetworkMonitor by inject()

    val timeZoneMonitor: TimeZoneMonitor by inject()

    val analyticsHelper: AnalyticsHelper by inject()

    val userNewsResourceRepository: UserNewsResourceRepository by inject()

    private val viewModel: MainActivityViewModel by measureTimeLazy("MainActivityViewModel") { viewModel() }
    // ...
}
```
<!-- @include https://github.com/InsertKoinIO/nowinandroid/blob/perfs_koin/app/src/main/kotlin/com/google/samples/apps/nowinandroid/MainActivity.kt#L77 -->

```kotlin :collapsed-lines title="ForYouScreen.kt"
@Composable
internal fun ForYouScreen(
    onTopicClick: (String) -> Unit,
    modifier: Modifier = Modifier,
    viewModel: ForYouViewModel = LocalContext.current.measureTime("ForYouViewModel") { koinViewModel() },
) {
    val onboardingUiState by viewModel.onboardingUiState.collectAsStateWithLifecycle()
    val feedState by viewModel.feedState.collectAsStateWithLifecycle()
    val isSyncing by viewModel.isSyncing.collectAsStateWithLifecycle()
    val deepLinkedUserNewsResource by viewModel.deepLinkedNewsResource.collectAsStateWithLifecycle()

    ForYouScreen(
        isSyncing = isSyncing,
        onboardingUiState = onboardingUiState,
        feedState = feedState,
        deepLinkedUserNewsResource = deepLinkedUserNewsResource,
        onTopicCheckedChanged = viewModel::updateTopicSelection,
        onDeepLinkOpened = viewModel::onDeepLinkOpened,
        onTopicClick = onTopicClick,
        saveFollowedTopics = viewModel::dismissOnboarding,
        onNewsResourcesCheckedChanged = viewModel::updateNewsResourceSaved,
        onNewsResourceViewed = { viewModel.setNewsResourceViewed(it, true) },
        modifier = modifier,
    )
}

```

<!-- @include: https://github.com/InsertKoinIO/nowinandroid/blob/perfs_koin/feature/foryou/src/main/kotlin/com/google/samples/apps/nowinandroid/feature/foryou/ForYouScreen.kt#L113 -->

::: note

We are using the latest[<FontIcon icon="fas fa-globe"/>Koin AndroidX Startup](https://insert-koin.io/docs/reference/koin-android/start#start-koin-with-androidx-startup-401)feature to help improve startup time.

:::

For the**Hilt implementation**, tracking is similarly applied ([<FontIcon icon="iconfont icon-github"/>`MainActivity.kt` (<FontIcon icon="iconfont icon-github"/>`InsertKoinIO/nowinandroid`)](https://github.com/InsertKoinIO/nowinandroid/blob/perfs_koin/app/src/main/kotlin/com/google/samples/apps/nowinandroid/MainActivity.kt#L80)&[<FontIcon icon="iconfont icon-kotlin"/>`ForYouScreen` (<FontIcon icon="iconfont icon-github"/>`InsertKoinIO/nowinandroid`)](https://github.com/InsertKoinIO/nowinandroid/blob/perfs_hilt/feature/foryou/src/main/kotlin/com/google/samples/apps/nowinandroid/feature/foryou/ForYouScreen.kt#L113)links):

To capture the**startup time**, we use the`onWindowFocusChanged`function in**MainActivity**. This measures the time it takes for the app to render its first frame after gaining focus, giving a clear picture of the app’s startup performance. We track time from the**Application**class until the first Activity:

```kotlin :collapsed-lines title="MainActivity.kt"
class MainActivity : ComponentActivity() {

    // ...

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) {
            val endTime = System.currentTimeMillis()
            val startupTime = endTime - NiaApplication.startTime
            logBenchmark("AppStartup",startupTime.toDouble())
        }
    }

    // ...
}
```

<!-- @include: https://github.com/InsertKoinIO/nowinandroid/blob/perfs_hilt/app/src/main/kotlin/com/google/samples/apps/nowinandroid/MainActivity.kt#L80 -->

### Execution, Extraction, And Results

To capture performance metrics automatically, we run the<FontIcon icon="iconfont icon-shell"/>`benchmark.sh`shell script. This script automates a sequence of app install, start, wait a few seconds, and stop actions to simulate realistic usage patterns. After all runs, it extracts the<FontIcon icon="fas fa-file-lines"/>`benchmark_log.txt`file containing all recorded times. This is 25 iterations of running the Nia application’s start, wait and stop (demo release build).

Using the collected data, the<FontIcon icon="fa-brands fa-python"/>`stats.py`Python script processes the log to compute key statistics: minimum, maximum, and average times for each benchmarked component.

**On your terminal**, you can just run the command:`benchmark.sh; python3 stats.py` (from the <FontIcon icon="fas fa-folder-open"/>`/app` folder).

The best is to run it on a real Android device. On my OnePlus Nord (Android 12), I got the following results:

OnePlus Nord[results (<FontIcon icon="iconfont icon-github"/>`arnaudgiuliani`)](https://gist.github.com/arnaudgiuliani/9e05451d111373eaf570c7f3a4465ad2), and also in Google[<FontIcon icon="iconfont icon-google-sheets"/>spreadsheet](https://bit.ly/benchmark_koin_hilt_2024)

::: info Benchmark Results

Same OnePlus Nord[results (<FontIcon icon="iconfont icon-github"/>`arnaudgiuliani`)](https://gist.github.com/arnaudgiuliani/9e05451d111373eaf570c7f3a4465ad2) in table

| Component | Framework | Avg (ms) | Min (ms) | Max (ms) | Standard Error ($\pm$ ms) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| MainActivityViewModel | Koin | 0.166 | 0.146 | 0.198 | 0.002 |
| MainActivityViewModel | Hilt | 0.202 | 0.186 | 0.264 | 0.003 |
| ForYouViewModel | Koin | 2.052 | 0.223 | 9.042 | 0.302 |
| ForYouViewModel | Hilt | 2.203 | 0.359 | 8.481 | 0.299 |
| App Startup | Koin | 1416.360 | 1204.000 | 1746.000 | 37.072 |
| App Startup | Hilt | 1511.480 | 1238.000 | 1729.000 | 35.457 |

:::

In this benchmark, in addition to average, minimum, and maximum, we show the “**standard error”**: it measures the**reliability of the average**, indicating how much it may vary from the true population mean. Smaller values mean more stable and precise results. It helps also compare stability results between Koin and Dagger Hilt.

The benchmarks highlight **Koin**as a reliable and modern alternative for Android development, matching**Hilt**in performance while offering its own unique advantages.

That said, benchmarks are just one part of the story. Your results may vary depending on your app, but the trends are clear:**Koin is performant for real-world challenges.** From Android to Kotlin Multiplatform and Compose Multiplatform applications.

I’m always open to feedback — if you have thoughts or insights,[<FontIcon icon="fa-brands fa-slack"/>let’s chat](https://slack-chats.kotlinlang.org/c/koin)! 👍

Why not give**Koin**a shot? Let**Koin**be part of your journey! 😊

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/benchmarking-koin-vs-dagger-hilt-in-modern-android-development-2024-ff7bb40470df)

<SiteInfo
  name="Benchmarking Koin vs. Dagger Hilt in Modern Android Development (2024)"
  desc="How Koin scales and performs compared to Hilt, using practical benchmarks and insights."
  url="https://proandroiddev.com/benchmarking-koin-vs-dagger-hilt-in-modern-android-development-2024-ff7bb40470df/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*h5ULv-tGdDA3yD2c685lFQ.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Benchmarking Koin vs. Dagger Hilt in Modern Android Development (2024)",
  "desc": "When choosing a dependency injection framework for Android and Kotlin development, performance is often a key consideration. This article explores the performance of Koin in its latest version (4.0.1-Beta1) and compares it with Dagger Hilt (2.52). Rather than relying on simplistic benchmarks or limited code execution scenarios, the focus is “developer-centric”: understanding performance in real-world, day-to-day usage. Additionally, this article aims to reassure those who may hesitate to adopt Koin due to performance concerns.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/benchmarking-koin-vs-dagger-hilt-in-modern-android-development-2024.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
