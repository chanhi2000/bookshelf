---
lang: en-US
title: "Using BlockHound to track blocking calls in non-blocking dispatchers"
description: "Article(s) > Using BlockHound to track blocking calls in non-blocking dispatchers"
icon: iconfont icon-kotlin
category:
  - Java
  - Kotlin
  - Article(s)
tag:
  - blog
  - kt.academy
  - java
  - kotlin
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using BlockHound to track blocking calls in non-blocking dispatchers"
    - property: og:description
      content: "Using BlockHound to track blocking calls in non-blocking dispatchers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/blockhound.html
prev: /programming/java/articles/README.md
date: 2024-12-02
isOriginal: false
author: 
  - name: Marcin Moskała
    url: https://kt.academy/user/marcinmoskala
cover: https://marcinmoskala.com/kt-academy-articles/promotion/blockhound.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Kotlin > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Using BlockHound to track blocking calls in non-blocking dispatchers"
  desc="How to use BlockHound to track blocking calls in non-blocking dispatchers."
  url="https://kt.academy/article/blockhound"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/blockhound.jpg"/>

When we implement repositories in Kotlin Coroutines, there is a constant tension between safety and performance. On one hand, making a blocking call directly in a suspending function is a serious mistake (on Android it can cause ANR):

```kotlin title="DiscSaveRepository.kt"
class DiscSaveRepository(
  private val discReader: DiscReader
) : SaveRepository {
  // Mistake: Blocking call in a suspending function
  override suspend fun loadSave(name: String): SaveData =
    discReader.read("save/$name")
}
```

This should be fixed by using a dispatcher that is designed for blocking calls, like `Dispatchers.IO`:

```kotlin title="DiscSaveRepository.kt"
class DiscSaveRepository(
  private val discReader: DiscReader
) : SaveRepository {
  // Fixed: Blocking call in a suspending function
  override suspend fun loadSave(name: String): SaveData = withContext(Dispatchers.IO) {
    discReader.read("save/$name")
  }
}
```

On the other hand, changing dispatcher when not needed can be a performance hit, and suspending APIs should never block:

```kotlin
class NetworkOfferRepository(
  private val offerClient: OfferClient,
) : OfferRepository {
  // Mistake: Unnecessary dispatcher change
  override suspend fun fetchOffers(userId: String): List<Offer> =
    withContext(Dispatchers.IO) {
      offerClient.fetchOffers(userId)
        .map { it.toOffer() }
    }
}

// Retrofit definition
interface OfferClient {
  @GET("offers")
  suspend fun fetchOffers(
    @Query("page") sellerId: String
  ): List<OfferJson>
}
```

This constant tension between safety and performance is a real problem, but there is a simple solution: We can use BlockHound to track blocking calls in non-blocking dispatchers.

[BlockHound](https://github.com/reactor/BlockHound) is a library that can detect blocking calls on certain threads. In Kotlin Coroutines we use it together with [kotlinx-coroutines-debug](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-debug/) to detect blocking calls in non-blocking dispatchers. This is how we can set it up. First, we need dependencies:

```kotlin title="build.gradle.kts"
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-debug:1.5.2")
implementation("io.projectreactor.tools:blockhound:1.0.6.RELEASE")
```

::: info

In JDK 13+ you need special configuration, see [BlockHound documentation (<VPIcon icon="iconfont icon-github"/>`reactor/BlockHound`)](https://github.com/reactor/BlockHound). In general, using BlockHound with never versions of JDK can be more challenging.

<SiteInfo
  name="reactor/BlockHound"
  desc="Java agent to detect blocking calls from non-blocking threads."
  url="https://github.com/reactor/BlockHound/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/fa7cce1109e4c6c756405be7dbfea131541aff0c37edbeaa9806ad1a8d4b6986/reactor/BlockHound"/>

:::

Then, we need to install BlockHound in our application:

```kotlin
BlockHound.install(CoroutinesBlockHoundIntegration())
```

You can use it in debug mode or in E2E tests. Once it is installed, it will throw an exception when a blocking call is detected. This is how it looks like:

```kotlin title="main.kt"
import reactor.blockhound.BlockHound
import kotlinx.coroutines.debug.CoroutinesBlockHoundIntegration
import kotlinx.coroutines.*

fun main() {
  BlockHound.install(CoroutinesBlockHoundIntegration())
  runBlocking { 
    launch(Dispatchers.Default) { 
      Thread.sleep(1000) // Exception
    }
  }
}
```

Results with an exception:

```plaintext{1} title="log"
Exception in thread "main" reactor.blockhound.BlockingOperationError: Blocking call! java.lang.Thread.sleep
  at java.base/java.lang.Thread.sleep(Thread.java)
  at MainKt$main$1$1.invokeSuspend(Main.kt:12)
  at kotlin.coroutines.jvm.internal.BaseContinuationImpl.resumeWith(ContinuationImpl.kt:33)
  at kotlinx.coroutines.DispatchedTask.run(DispatchedTask.kt:108)
  at kotlinx.coroutines.scheduling.CoroutineScheduler.runSafely(CoroutineScheduler.kt:584)
  at kotlinx.coroutines.scheduling.CoroutineScheduler$Worker.executeTask(CoroutineScheduler.kt:793)
  at kotlinx.coroutines.scheduling.CoroutineScheduler$Worker.runWorker(CoroutineScheduler.kt:697)
  at kotlinx.coroutines.scheduling.CoroutineScheduler$Worker.run(CoroutineScheduler.kt:684)
```

Using `Dispatchers.IO` would not throw an exception, as it is designed for blocking calls.

```kotlin{7} title="main.kt"
import reactor.blockhound.BlockHound
import kotlinx.coroutines.debug.CoroutinesBlockHoundIntegration
import kotlinx.coroutines.*

fun main() {
  BlockHound.install(CoroutinesBlockHoundIntegration())
  val d = Dispatchers.IO.limitedParallelism(10) // or just Dispatchers.IO
  runBlocking { 
    launch(d) { 
      Thread.sleep(1000) // OK
    }
  }
}
```

This way we can ensure that our suspending functions are safe and performant, without unnecessary dispatcher changes.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using BlockHound to track blocking calls in non-blocking dispatchers",
  "desc": "How to use BlockHound to track blocking calls in non-blocking dispatchers.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/blockhound.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
