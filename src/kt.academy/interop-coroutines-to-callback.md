---
lang: en-US
title: "Suspending functions or flows into callbacks"
description: "Article(s) > Suspending functions or flows into callbacks"
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
      content: "Article(s) > Suspending functions or flows into callbacks"
    - property: og:description
      content: "Suspending functions or flows into callbacks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/interop-coroutines-to-callback.html
prev: /programming/java/articles/README.md
date: 2025-08-11
isOriginal: false
author: Marcin Moskała
cover: https://marcinmoskala.com/kt-academy-articles/promotion/interop_coroutines_to_callback.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Kotlin > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Suspending functions or flows into callbacks"
  desc="A guide on how to correctly convert suspending functions or flows into callback-based functions in Kotlin Coroutines."
  url="https://kt.academy/interop-coroutines-to-callback"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/interop_coroutines_to_callback.png"/>

Many legacy APIs use callbacks to report results of asynchronous operations. In Kotlin, we can use suspending functions or flows to achieve the same effect in a more readable way. However, sometimes we need to convert these suspending functions or flows into callback-based APIs, especially when integrating with existing libraries or frameworks that expect callbacks. In this article, we will explore how to do that.

This article is a part of a series about interoperability between Kotlin Coroutines and other libraries.

::: info This series includes:

```component VPCard
{
  "title": "Calling blocking functions from suspending functions",
  "desc": "A guide on how to correctly convert blocking functions into suspending functions in Kotlin Coroutines.",
  "link": "/kt.academy/interop-blocking-to-coroutines.md",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```

```component VPCard
{
  "title": "How to turn callback functions into suspend functions or Flow",
  "desc": "A guide on how to correctly convert callback-based functions into suspending functions or Flows in Kotlin Coroutines.",
  "link": "/kt.academy/interop-callbacks-to-coroutines.md",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
- [Turning suspending functions into blocking functions or CompletableFuture](https://kt.academy/article/interop-coroutines-to-blocking)

```component VPCard
{
  "title": "Suspending functions or flows into callbacks",
  "desc": "A guide on how to correctly convert suspending functions or flows into callback-based functions in Kotlin Coroutines.",
  "link": "/kt.academy/interop-coroutines-to-callback.md",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
- [Kotlin Flow to RxJava or Reactor and vice versa](https://kt.academy/article/interop-flows-to-streams)
- [Using Kotlin Coroutines with Java Streams](https://kt.academy/article/interop-coroutines-to-streams)
- [Flow from suspending functions and vice versa](https://kt.academy/article/interop-suspending-functions-flow)

:::

<!-- TODO: VPCard -->

---

## Converting a suspending function to a callback

Suspending functions must be started in a coroutine. The simplest way to start a coroutine is to use `launch` on a coroutine scope. Once this suspending function is completed with a result, we can call a callback with this result. If the suspending function throws an exception, we can call a callback with the exception instead. To allow the process started by the suspending function to be cancelled, we can return `Job` from the `launch` call, which can be used to cancel the coroutine. This is the most basic way to convert a suspending function to a callback-based API.

```kotlin
suspend fun fetchData(): String {
    // ...
}
​
val scope = CoroutineScope(SupervisorJob())
​
fun fetchData(
    onSuccess: (String) -> Unit,
    onError: (Throwable) -> Unit,
): Job = scope.launch {
    try {
        val result = fetchData()
        onSuccess(result)
    } catch (e: Throwable) {
        onError(e)
    }
}
```

In real-life applications scope is usually provided by a dependency injection framework. We also often wrap our `Job` with some interface that exposes cancellation method. We might also define some wrapper function to simply transform a suspending function into a callback-based API.

```kotlin
class AnkiConnectorCallback(
    private val connector: AnkiConnector,
    private val scope: CoroutineScope,
) {
    fun checkConnection(
        onSuccess: (Boolean) -> Unit,
        onError: (Throwable) -> Unit,
    ): Cancellable = scope.asyncWithCallback(onSuccess, onError) {
        connector.checkConnection()
    }
​
    fun pushDeck(
        deckName: String,
        markdown: String,
        onSuccess: (AnkiConnectorResult) -> Unit,
        onError: (Throwable) -> Unit,
    ): Cancellable = scope.asyncWithCallback(onSuccess, onError) {
        connector.pushDeck(deckName, markdown)
    }
    // ...
}
​
fun <T> CoroutineScope.asyncWithCallback(
    onSuccess: (T) -> Unit,
    onError: (Throwable) -> Unit,
    body: suspend () -> T
): Cancellable {
    val job = launch {
    try {
       val result = body()
           onSuccess(result)
       } catch (t: Throwable) {
           onError(t)
       }
    }
    return Cancellable(job)
}
​
class Cancellable(private val job: Job) {
    fun cancel() {
        job.cancel()
    }
}
```

---

## Converting a flow to a callback function

We observe a flow using `collect` method, which is a suspending function, so it cannot be used in non-suspending code. To convert a flow to a callback-based API, we can the following wrapper function:

```kotlin
/*
 * This function allows you to subscribe to a Flow with a CoroutineScope.
 * 
 * Flow gets completed when the coroutine scope is cancelled or when the Flow completes. 
 * Flow completes when it has an exception.
 *
 * @param scope The CoroutineScope in which the Flow will be collected.
 * @param onEach A lambda function that will be called for each emitted item from the Flow.
 * @param onError A lambda function that will be called if an error occurs during the collection of the Flow.
 * @param onStart A lambda function that will be called when the Flow starts collecting.
 * @param onCompletion A lambda function that will be called when the Flow completes (either successfully or with an error).
 */
fun <T> Flow<T>.subscribe(
    scope: CoroutineScope,
    onEach: ((T) -> Unit)? = null,
    onError: ((Throwable) -> Unit)? = null,
    onStart: (() -> Unit)? = null,
    onCompletion: (() -> Unit)? = null,
): Job {
    return this
        .let { flow -> onEach?.let { flow.onEach { onEach(it) } } ?: flow }
        .let { flow -> onStart?.let { flow.onStart { onStart() } } ?: flow }
        .let { flow -> onCompletion?.let { flow.onCompletion { onCompletion() } } ?: flow }
        .let { flow -> onError?.let { flow.catch { onError(it) } } ?: flow }
        .launchIn(scope)
}
```

You can also define a wrapper class for a flow, to simplify the usage of this function.

```kotlin
class FlowCallback<T>(
    private val flow: Flow<T>,
    private val scope: CoroutineScope,
) {
    fun subscribe(
        scope: CoroutineScope,
        onEach: ((T) -> Unit)? = null,
        onError: ((Throwable) -> Unit)? = null,
        onStart: (() -> Unit)? = null,
        onCompletion: (() -> Unit)? = null,
    ): Job {
        return flow
            .let { flow -> onEach?.let { flow.onEach { onEach(it) } } ?: flow }
            .let { flow -> onStart?.let { flow.onStart { onStart() } } ?: flow }
            .let { flow -> onCompletion?.let { flow.onCompletion { onCompletion() } } ?: flow }
            .let { flow -> onError?.let { flow.catch { onError(it) } } ?: flow }
            .launchIn(scope)
    }
}
```

---

## Conclusion

In this article, we explored how to convert suspending functions and flows into callback-based APIs. This is useful when integrating with legacy code or libraries that expect callbacks. We also discussed how to handle errors and cancellation in these conversions. By using the provided examples, you can easily adapt your suspending functions and flows to work with callback-based APIs in Kotlin.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Suspending functions or flows into callbacks",
  "desc": "A guide on how to correctly convert suspending functions or flows into callback-based functions in Kotlin Coroutines.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/interop-coroutines-to-callback.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
