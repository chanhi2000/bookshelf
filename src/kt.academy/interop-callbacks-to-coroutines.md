---
lang: en-US
title: "How to turn callback functions into suspend functions or Flow"
description: "Article(s) > How to turn callback functions into suspend functions or Flow"
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
      content: "Article(s) > How to turn callback functions into suspend functions or Flow"
    - property: og:description
      content: "How to turn callback functions into suspend functions or Flow"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/interop-callbacks-to-coroutines.html
prev: /programming/java/articles/README.md
date: 2025-07-14
isOriginal: false
author: 
  - name: Marcin Moskała
    url: https://kt.academy/user/marcinmoskala
cover: https://marcinmoskala.com/kt-academy-articles/promotion/interop_callbacks_to_coroutines.png
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
  name="How to turn callback functions into suspend functions or Flow"
  desc="A guide on how to correctly convert callback-based functions into suspending functions or Flows in Kotlin Coroutines."
  url="https://kt.academy/article/interop-callbacks-to-coroutines"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/interop_callbacks_to_coroutines.png"/>

When we use Kotlin Coroutines, it is generally best to choose libraries that support them natively. Nowadays, most libraries do, but there are still some that don't. Many libraries instead provide callback-based APIs, so an API with functions that start some process and then call a callback when the result is available. In this article, we will discuss how to turn such callback functions into suspending functions or `Flow`, so that they can be used in Kotlin Coroutines.

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

<!-- TODO: VPCard -->

:::

---

## Callback functions that return a single value

When we have a callback function that returns a single value, the most basic way to adapt it to Kotlin Coroutines-friendly API is to define a suspending function. Suspending functions that return value suggest that they will suspend the coroutine that calls them until the value is available.

To implement such functions, we use `suspendCancellableCoroutine` function (do not use `suspendCoroutine`, as it does not support cancellation or testing). `suspendCancellableCoroutine` suspends the current coroutine, and provides a continuation object that can be used to resume the coroutine later. It is used by most libraries that support suspending API, like Ktor Client or Retrofit. Typically, those libraries start a process of getting a value, and store the continuation object in some collection. They have some observer that listens for results from started requests, and when any result is available, it resumes appropriate continuation with the value.

```kotlin
// Simplified implementation of a suspending function that fetches a user
suspend fun fetchUser() {
    val port = startProcessOfFetchingUser()
    suspendCancellableCoroutine { cont ->
        waitingCalls[port] = cont
    }
}
​
// Map to store waiting continuations
val waitingCalls = mutableMapOf<Int, Continuation<*>>()
​
// Example listener for all requests on a network card
while (true) {
    Thread.sleep(1)
    val (port, result) = checkResponsesOnNetworkCard() 
    waitingCalls[port]?.let { cont ->
        waitingCalls.remove(port)
        if (result.isSuccess) {
            // Resume with the value if successful
            cont.resume(result.toValue()) 
        } else {
            // Resume with exception if failed
            cont.resumeWithException(result.toException())
        }
    }
}
```

When we need to adapt a callback function that returns a single value, we use the similar pattern. We start the process of getting a value, and then we suspend the coroutine until the value is available. When the value is available, we resume the continuation with it. The problem is what about exceptions? One popular approach is to throw them from suspension point, in such case we should use `resumeWithException`. The other option is to use `Result` type, which is a type that can hold either a value or an exception. In such case we should use `resume` with `Result` value.

```kotlin
// Returning a value in case of success, and throwin an exception in case of failure
suspend fun requestNews(): News = suspendCancellableCoroutine<News> { cont ->
    requestNews(
        onSuccess = { news -> cont.resume(news) },
        onError = { e -> cont.resumeWithException(e) }
    )
}
​
// Returning a Result type that can hold either a value or an exception
suspend fun requestNews(): Result<News> =suspendCancellableCoroutine { cont ->
    requestNews(
        onSuccess = { news -> cont.resume(Result.success(news)) },
        onError = { e -> cont.resume(Result.failure(e)) }
    )
}
```

If we wanted to turn such a function into a `Flow` that emits a single value, we can use this simple pattern:

```kotlin
fun requestNewsFlow(): Flow<News> = flow {
    val news = requestNews() // suspending function that returns a single value
    emit(news) // emit the value
}
```

---

## Turning callback functions into Flow

When we have a callback that calls its callback multiple times, we should use `Flow` to adapt it to Kotlin Coroutines. `Flow` is a type that represents a stream of values that can be collected asynchronously. It is a good fit for callback functions that call their callback multiple times, as it allows us to collect all the values in a suspending way.

The simplest idiomatic way to turn a callback function into a `Flow` is to use the `callbackFlow` builder. It allows us to create a flow that emits values from a callback function. Here is an example of how to use it:

```kotlin
fun flowFrom(api: CallbackBasedApi): Flow<T> = callbackFlow {
    val callback = object : Callback {
        override fun onNextValue(value: T) {
            trySendBlocking(value)
        }
        override fun onApiError(cause: Throwable) {
            cancel(CancellationException("API Error", cause))
        }
        override fun onCompleted() = channel.close()
    }
    api.register(callback)
    awaitClose { api.unregister(callback) }
}
```

Basically `callbackFlow` creates a flow that starts a callback function. Receiver of this flow received values from a channel, and inside `callbackFlow` we send to this channel. We use:

- `trySendBlocking` to send values to the channel.
- `cancel` to cancel the flow when an error occurs, such error flows down to the collector.
- `close` to close the channel when the callback function is completed, so the flow completes as well.

`awaitClose` must be used at the end to prevent this `callbackFlow` from completing immediately. It also allows us to unregister the callback when the flow is no longer collected.

Beware, that the channel used by `callbackFlow` is not unlimited. It has a buffer size of 64, so if the collector is slow and there are already 64 values in the channel, the `trySendBlocking` will block until this collector consumes a value. You should consider how this will affect your callback API. You can increase the buffer size by adding `buffer` operator to the flow.

Another thing to consider is that `trySendBlocking` will result with a failure if the channel is cancelled or failed. If you want to handle such cases, you can use `onFailure` to log or handle the failure. Considering those two optional changes, the final code might look like this:

```kotlin
fun flowFrom(api: CallbackBasedApi): Flow<T> = callbackFlow {
    val callback = object : Callback {
        override fun onNextValue(value: T) {
            trySendBlocking(value)
                .onFailure { throwable ->
                // Downstream has been cancelled or failed, can log here
                }
        }
        override fun onApiError(cause: Throwable) {
            cancel(CancellationException("API Error", cause))
        }
        override fun onCompleted() = channel.close()
    }
    api.register(callback)
    awaitClose { api.unregister(callback) }
}.buffer(Channel.UNLIMITED) // Unlimited buffer size so that trySendBlocking never blocks
```

---

## Conclusion

In this article, we discussed how to turn callback functions into suspending functions and `Flow`. We started with the simplest case of a callback function that returns a single value, and then we moved to the more complex case of a callback function that calls its callback multiple times. Hopefully, this article will help you to adapt your callback-based APIs to Kotlin Coroutines and make your code more idiomatic and easier to read.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to turn callback functions into suspend functions or Flow",
  "desc": "A guide on how to correctly convert callback-based functions into suspending functions or Flows in Kotlin Coroutines.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/interop-callbacks-to-coroutines.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
