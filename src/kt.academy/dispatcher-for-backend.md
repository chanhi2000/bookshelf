---
lang: en-US
title: "The best dispatcher for a backend framework"
description: "Article(s) > The best dispatcher for a backend framework"
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
      content: "Article(s) > The best dispatcher for a backend framework"
    - property: og:description
      content: "The best dispatcher for a backend framework"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/dispatcher-for-backend.html
prev: /programming/java/articles/README.md
date: 2024-11-13
isOriginal: false
author: Marcin Moskała
cover: https://marcinmoskala.com/kt-academy-articles/promotion/dispatcher-for-backend.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The best dispatcher for a backend framework"
  desc="Let's explore different dispatchers and find the best one for a backend request handlers."
  url="https://kt.academy/dispatcher-for-backend"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/dispatcher-for-backend.jpg"/>

I recently [started a discussion (<FontIcon icon="iconfont icon-github"/>`spring-projects/spring-framework`)](https://github.com/spring-projects/spring-framework/issues/33788) about the best dispatcher for Spring Boot. Here I decided to summarize all the most important points, and explain why different options are not appropriate.

---

## The idea

When a request is made to a backend application, it should start a coroutine, but this coroutine must be running on a thread. A dispatcher is a context that decides on which thread the coroutine will run. This dispatcher should create as few threads as possible, because threads are expensive, but it should also possibly avoid situations where a request waits for a thread to be available.

Before I present the right options, let's consider the wrong ones.

---

## Why `Dispatchers.Unconfined` is not a good choice

Currently, the default dispatcher used by Spring Boot for suspending controller functions is `Dispatchers.Unconfined`. This choice might be fine for many applications, but it might underutilize the potential of our CPU, and work terribly if there are any blocking operations.

There is common misconception that `Dispatchers.Unconfined` runs on the thread that was used to start it. That is true, but only until the first suspension point. After that, it runs on the thread that was used to resume it, what is dangerous, because libraries are designed to use the minimal number of threads in their suspending API, and they often use only one thread to resume coroutines, as they assume a dispatcher will change it anyway (out of all dispatchers, only `Dispatchers.Unconfined` is not changing it).

Take a look at this example from my book *Kotlin Coroutines: Deep Dive*:

::: kotlin-playground Dispatchers.Unconfined is not a good choice

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlin.concurrent.*
import kotlin.coroutines.*

fun main() {
    var continuation: Continuation<Unit>? = null
  
    thread(name = "Thread1") {
        CoroutineScope(Dispatchers.Unconfined).launch {
            println(Thread.currentThread().name) // Thread1
            suspendCancellableCoroutine {
                continuation = it
            }

            println(Thread.currentThread().name) // Thread2
            delay(1000)
            println(Thread.currentThread().name) // kotlinx.coroutines.DefaultExecutor
        }
    }

    thread(name = "Thread2") {
        Thread.sleep(1000)
        continuation?.resume(Unit)
    }

    Thread.sleep(3000)
}
```

:::

As you can see, after suspension, the coroutine runs on the thread that resumed it, and after `delay` it runs on `DefaultExecutor`. This poor thread is only supposed to be used to schedule coroutines resuming, not to run their bodies. Above all, it is one for the whole application. Consider this simplified Spring Boot controller:

```kotlin title="PingController.kt"
@RestController
@RequestMapping
class PingController() {
    @GetMapping("/ping")
    suspend fun ping(): ResponseEntity<Map<String, Boolean>> {
        delay(1000)
        Thread.sleep(1000)
        return ResponseEntity(mapOf("success" to true), HttpStatus.OK)
    }
}
```

If you make 1000 requests, it will take at least $1001 \text{seconds}$, as all sleeps will happen on `DefaultExecutor`. That is no good. If we used `Dispatchers.IO`, it would need $\frac{1000}{64}+1=17 \text{seconds}$ (due to IO limit). Of course, in a real-life example, we should have some db or network request instead of `delay`, and some processing instead of sleep, but the essential problem remains the same.

```kotlin title="PingController.kt"
@RestController
@RequestMapping
class PingController() {
    @GetMapping("/ping")
    suspend fun ping(): ResponseEntity<Map<String, Boolean>> {
        val data = fetchData()
        complexProcessing(data)
        return ResponseEntity(mapOf("success" to true), HttpStatus.OK)
    }
}
```

Most suspending network clients optimize to use a minimal number of threads. In Ktor Client, for instance, most engines will use only one thread to resume coroutines, so delay is actually mimicking that pretty well. Consider the following example. On my computer, it takes 30 seconds with `Dispatchers.Unconfined`, but only 5 seconds if we used `Dispatchers.Default` instead:

::: kotlin-playground 2

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlin.system.measureTimeMillis

suspend fun main(): Unit = measureTimeMillis { 
    withContext(Dispatchers.Unconfined) {
        repeat(1000) {
            launch {
                val data = fetchData()
                complexProcessing(data)
            }
        }
    }
}.let { println("Took $it") }

 

suspend fun fetchData(): Data {
    delay(1000)
    return Data()
}
class Data()

private val list = List(200\_000) { it }.shuffled()

fun complexProcessing(data: Data) {
    list.map { it % 10\_000 }.sorted()
}
```

:::

So `Dispatchers.Unconfined` can be vulnerable to thread starvation after suspension points, and it is not a good choice for a backend application.

---

## Why `runBlocking` is not a good choice

It seems to be a natural for backend developers to expect that the best option would be the one, that would use the same thread that started the coroutine. This is exactly what `runBlocking` does. It starts a coroutine on the current thread, and creates a dispatcher that will always resume on that thread:

::: kotlin-playground 2

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlin.concurrent.*
import kotlin.coroutines.*

fun main() {
    var continuation: Continuation<Unit>? = null
        thread(name = "Thread1") {
            runBlocking {
                println(Thread.currentThread().name) // Thread1
                suspendCancellableCoroutine {
                    continuation = it
                }

            println(Thread.currentThread().name) // Thread1
            delay(1000)
            println(Thread.currentThread().name) // Thread1
        }
    }

    thread(name = "Thread2") {
        Thread.sleep(1000)
        continuation?.resume(Unit)
    }
}
```

:::

The problem is, what happens to this thread when the coroutine is suspended. Since this thread must always be ready to be used by the coroutine, it cannot be used for anything else, so it is blocked. That means, if we have $100,000$ requests, and each need to get suspended for a second, for a second you would need $100,000$ threads, which would require 100 GB of RAM memory. That is a theoretical example, but I hope you see the point: **using `runBlocking` would completely neglect the benefits of using coroutines**. The key idea behind coroutines is that $100,000$ requests should start 100,000 coroutines, suspend and resume them concurrently, using only a couple of threads. For that we need to use a dispatcher, so now let's consider some popular options.

---

## Why `Dispatchers.Default` is not a good choice

`Dispatchers.Default` is the dispatcher designed for CPU-intensive tasks. It can use as many threads, as many CPU cores you have. In theory, it should be a good choice for a backend application, but in practice, it is not. `Dispatchers.Default` is only good if you never block its threads. Even one blocking operation will make your application significantly less efficient. Let's say you have 8 CPU cores, but you blocked one thread, so now your application only uses $\frac{7}{8}$ of your CPU power. That is not good.

`Dispatchers.Default` is very fragile to blocking operations, and since there are many blocking APIs we use on backend, it might be hard to hunt them all. That is why `Dispatchers.Default` is not a good choice for a backend application.

---

## Why `Dispatchers.IO` is not the best choice

Currently, many backend frameworks, including Ktor Server, use `Dispatcher.IO` as the default dispatcher for handling requests. It is a good choice, but not the best one. `Dispatchers.IO` is supposed to be used for blocking operations, so it is not a big problem if a limited number of blocking operations are executed on it. The problem starts if there are too many blocking operations. `Dispatchers.IO` is limited to 64 threads by default. It is good there is a limit because it prevents the application from using too many threads (which drains RAM). The problem is when something as important as a request is blocked, because it waits in a queue filled with less important operations.

Consider that your application includes a weekly mailing service. Once a week you need to send over 100,000, and for that you use SendGrid, that provides a blocking API. So you made the following code:

```kotlin
val scope = CoroutineScope(Dispatchers.IO)

@Cron("0 0 0 * * 1")

fun sendEmails() {
    scope.launch {
        val newsletter = generateNewsletterIssue()
        val emails = getNewsletterSubscribers()
        emails.forEach { email \-> 
            launch {
                sendEmail(email, newsletter) // Blocking operation
            }
        }
    }
}
```

Considering that sending an email takes $100 \text{ms}$, and you need to send $100,000$ of them, and you have $64$ threads, it will take $\frac{100000\times0.1}{64\times60}=2.6 \text{minutes}$. Throughout that time, all other requests will be waiting in a queue. That is not good. (That is not an abstract example, see [this issue (<FontIcon icon="iconfont icon-jetbrains"/>)](https://youtrack.jetbrains.com/issue/KTOR-6462), but thankfully it is possible to change dispatcher in Ktor Client).

Of course, you could argue that it should be this service responsibility to use a dispatcher that is independent of the IO dispatcher, and I do accept that. That it why I still consider `Dispatchers.IO` as a good choice, but I think it would be better to protect handler threads from waiting in a queue in the first place, and for that I think it should be started on a different dispatcher.

---

## Why a dispatcher from an executor is not the best choice

When I mentioned creating a dispatcher that is independent of the IO dispatcher, I guess that many thought about creating a dispatcher from an executor:

```kotlin
val dispatcher = Executors.newFixedThreadPool(64).asCoroutineDispatcher()
```

That would be an option, but that wouldn't be the most efficient approach. Coroutines dispatchers have a mechanism of thread reuse: basically `Dispatchers.Default`, `Dispatchers.IO`, and `Dispatchers.IO.limitedParallelism(n)` reuse threads from the same pool. That let us maintain a smaller number of threads, and limit the number of thread switches. If we used a dispatcher from an executor, we would have a separate pool of threads, so we would lose this optimization.

---

## Why a dispatcher limited to a certain number of threads is the best choice

As I introduced already, I believe that the best solution is using a dispatcher that is limited to a certain number of threads, that should be created using the following structure:

```kotlin
val dispatcher = Dispatchers.IO.limitedParallelism(n)
```

Such a dispatcher would be the safest option:

- It would not be hurt by a limited number of blocking operations, as it has some extra threads to handle them.
- It would be independent of the IO dispatcher, so they would never block each other.
- It would be more efficient than a dispatcher from an executor, as it would reuse threads from the same pool.

The size of thread limit should be configurable, but I think that `max(64, #cores)` is a good default value (as it is the default value for `Dispatchers.IO`).

That is the best choice, unless your application can use virtual threads from Project Loom.

---

## Why LOOM dispatcher is a perfect choice, but only once it gets stable

Project Loom is a new Java feature, that was introduced as a preview in Java 19. Its basic idea is that it allows us to create a thread, that suspends process when it gets blocked. In simpler words, on such a thread you can use blocking operations like they are suspending operations (but without support for cancellation). When Project Loom is used, be can both utilize all the benefits of coroutines (structured concurrency, simple asynchronicity, cancellation, testability, etc.), and use blocking operations without any fear of blocking the thread. So IMHO this is a sweet spot for backend applications. This is how such a dispatcher would be created:

```kotlin
val dispatcher = Executors.newVirtualThreadPerTaskExecutor()
    .asCoroutineDispatcher()
```

Virtual threads are stable since Java 21, so it is a perfect choice for JVM 21+, and since then it can be used by default in backend frameworks.

---

## Conclusion

In this article, I analyzed which dispatcher is the best choice for a backend application. My conclusion is that:

- `Dispatchers.Unconfined` is not a good choice, as it can lead to inappropriate thread usage.
- `runBlocking` is not a good choice, as it can create too many threads unnecessarily.
- `Dispatchers.Default` is not a good choice, as it is fragile to blocking operations.
- `Dispatchers.IO` is a good choice, but it can be problematic if it is used for too many blocking operations.
- A dispatcher from an executor is not the best choice, as it would not reuse threads from the same pool.
- A dispatcher limited to a certain number of threads is the best choice, as it would be the safest option.
- Loom dispatcher is a perfect choice for JVM 21+.

I hope this article will help resolve [this issue in Spring Boot (<FontIcon icon="iconfont icon-github"/>`spring-projects/spring-framework`)](https://github.com/spring-projects/spring-framework/issues/33788), and in other backend frameworks. If you have any questions or comments, please let me know.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The best dispatcher for a backend framework",
  "desc": "Let's explore different dispatchers and find the best one for a backend request handlers.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/dispatcher-for-backend.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
