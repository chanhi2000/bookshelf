---
lang: en-US
title: "Calling blocking functions from suspending functions"
description: "Article(s) > Calling blocking functions from suspending functions"
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
      content: "Article(s) > Calling blocking functions from suspending functions"
    - property: og:description
      content: "Calling blocking functions from suspending functions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/interop-blocking-to-coroutines.html
prev: /programming/java/articles/README.md
date: 2025-07-21
isOriginal: false
author: 
  - name: Marcin Moskała
    url: https://kt.academy/user/marcinmoskala
cover: https://marcinmoskala.com/kt-academy-articles/promotion/interop_blocking_to_coroutines.png
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
  name="Calling blocking functions from suspending functions"
  desc="A guide on how to correctly convert blocking functions into suspending functions in Kotlin Coroutines."
  url="https://kt.academy/article/interop-blocking-to-coroutines"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/interop_blocking_to_coroutines.png"/>

When we use Kotlin Coroutines, it is generally best to choose libraries that support them natively. Nowadays, most libraries do, but there are still some that instead provide blocking API, that cannot be used directly in coroutines. In this article, I will explain how to use such blocking functions in Kotlin Coroutines, and how to turn them into suspending functions or flows.

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

---

## Blocking functions

A blocking function is a function that blocks the current thread when it waits for some operation to complete. The simplest example is `Thread.sleep`, which blocks the current thread for a given amount of time. However, there are many other examples of blocking functions:

- Most Java network or database client libraries provide blocking functions to send requests or execute queries. They block the current thread until the response is received or the query is executed.
- Most Java file I/O libraries provide blocking functions to read or write files. They block the current thread until the operation is completed.
- Most Java synchronization primitives, like `CountDownLatch`, `Semaphore`, or `ReentrantLock`, provide blocking functions to wait for some condition to be met or to acquire a lock. They block the current thread until the condition is met or the lock is acquired.
- Most Java concurrency libraries, like `CompletableFuture`, provide blocking functions to wait for the result of a computation. They block the current thread until the computation is completed.
- Most Java GUI libraries, like Swing or JavaFX, provide blocking functions to wait for user input. They block the current thread until the user provides the input.

```kotlin
// Sending an email using blocking SendGrid API
fun sendEmail(
    email: Email
) {
    val request = Request().apply {
        method = Method.POST
        endpoint = "mail/send"
        body = email
    }
    sendGrid.api(request) // This is a blocking function
}
​
// Authorizing a user using blocking Google API
fun getUserData(googleToken: String): GoogleUserData? =
    verifier.verify(googleToken) // This is a blocking function
        ?.payload
        ?.toGoogleUserData()
​
// Reading a file using blocking Java I/O
fun readFile(file: File): String =
    file.readText()
```

Here is an example blocking operation from SendGrid API, which I use in my [<VPIcon icon="fas fa-globe"/>Kt. Academy](https://kt.academy) website to send emails. The `send` function blocks the current thread until the email is sent.

```kotlin
val result: Response = sendGrid.api(request)
```

::: note

Note that if a function is not blocking, it can be safely used in a suspending function or flow. Blocking functions can be sometimes hard to distinguish from non-blocking ones. I generally reason as follows: if a function makes some operation that requires waiting for something, and it returns result of that operation, it is most likely a blocking function. If it has no result, it might just start this proces asynchronously, and might not be blocking. If you are not sure, you can check the documentation of the library you use or use BlockHound to check if the function is blocking, as I described in [**this article**](/kt.academy/blockhound.md).

:::

Examples are endless, as when we operated directly on threads, blocking functions were often considered the most basic way to wait for some operation to complete. However, when we use coroutines, blocking functions are not a good fit. They block the current thread, which is not what we want when we use coroutines. Coroutines use the minimal number of threads, and blocking them can lead to a terrible user experience. Instead, we want to suspend the coroutine and resume it later when the operation is completed.

```kotlin
// RULE: Blocking functions should not be used in suspending functions or flows
suspend fun blockingFunction() {
    Thread.sleep(1000) // INCORRECT: This blocks the current thread
}
​
fun produceFlow() = flow {
    Thread.sleep(1000) // INCORRECT: This blocks the current thread
    emit("Hello")
}
```

It is best if we use libraries that provide non-blocking API. Nowadays, most popular libraries do. Such a support was added to Spring Data, MongoDB Client, Room or Retrofit, and many others. There are also many native Kotlin Coroutines libraries that provide non-blocking API, like Ktor Client or KMongo. However, there are still some libraries that provide only blocking API, and we need to use them in our coroutines. This is how we can turn blocking functions into suspending functions.

---

## Turning blocking functions into suspending functions

We can only block a thread in a suspending function if we know that the current coroutine uses a dispatcher that is designed for blocking operations. The simplest such dispatcher is `Dispatchers.IO`, and the simplest way to use it is to wrap the blocking function in `withContext`:

```kotlin
// Sending an email using blocking SendGrid API
suspend fun sendEmail(
    email: Email
): Unit = withContext(Dispatchers.IO) {
    val request = Request().apply {
        method = Method.POST
        endpoint = "mail/send"
        body = email
    }
    sendGrid.api(request)
}
​
// Authorizing a user using blocking Google API
suspend fun getUserData(googleToken: String): GoogleUserData? = withContext(Dispatchers.IO) {
    verifier.verify(googleToken)
        ?.payload
        ?.toGoogleUserData()
}
​
// Reading a file using blocking Java I/O
suspend fun readFile(file: File): String = withContext(Dispatchers.IO) {
     file.readText()
}
```

`Dispatchers.IO` is simple, but it is not perfect. It is limited to 64 theads, which can cause two problems if you have too many blocking operations:

- If you have too many blocking operations, some of them will be queued, and the user will have to wait for them to finish.
- This queue is shared for all uses of this dispatcher, which is especially problematic if you have different services using `Dispatchers.IO` for different purposes. For example, if you have a service that reads files and another service that sends emails, they will block each other. That might cause an absurd situation where some processes will wait for reading a file, because a newsletter is being sent, or vice versa.

The simplest way to avoid this problem is to use Loom dispatcher:

```kotlin
val loomDispatcher = Executors.newVirtualThreadPerTaskExecutor()
    .asCoroutineDispatcher()
```

Then use such a dispatcher instead of `Dispatchers.IO` (we typically define it in out Dependency Injection module, and inject it into the classes that need it):

```kotlin
// Sending an email using blocking SendGrid API
suspend fun sendEmail(
    email: Email
): Unit = withContext(loomDispatcher) {
    // ...
}
​
// Authorizing a user using blocking Google API
suspend fun getUserData(googleToken: String): GoogleUserData? = withContext(loomDispatcher) {
    // ...
}
​
// Reading a file using blocking Java I/O
suspend fun readFile(file: File): String = withContext(loomDispatcher) {
    // ...
}
```

If you cannot use Project Loom, another solution is to create dispatchers with independent limits for different services or operations. For example, you can create a custom dispatcher for sending emails. We create an dispatcher with a custom thread limit with `Dispatchers.IO.limitedParallelism(n)`, where `n` is the number of threads you want to use for this dispatcher. I know that this API is confusing, but this creates a dispatcher that is not constrained by the IO dispatcher limit and has its own independent limit.

```kotlin
val sendEmailDispatcher = Dispatchers.IO.limitedParallelism(10)
​
// Sending an email using blocking SendGrid API
suspend fun sendEmail(
    email: Email
): Unit = withContext(sendEmailDispatcher) {
    // ...
}
​
val googleApiDispatcher = Dispatchers.IO.limitedParallelism(20)
​
// Authorizing a user using blocking Google API
suspend fun getUserData(googleToken: String): GoogleUserData? = withContext(googleApiDispatcher) {
    // ...
}
​
val fileOperationsDispatcher = Dispatchers.IO.limitedParallelism(5)
​
// Reading a file using blocking Java I/O
suspend fun readFile(file: File): String = withContext(fileOperationsDispatcher) {
    // ...
}
```

Under the hood all those dispatchers are sharing the same thread pool with `Dispatchers.IO` and `Dispatchers.Default`, but each of them has its own limit so they will never wait for each other. This way, you can have different limits for different services or operations, and they will not block each other.

The last option is to create dispatchers with custom thread pools. This is a more advanced option that is preferred by those who want to have more control over the thread pool. They might need that to set priorities, or to use custom thread factories. This option is less efficient in some ways, as it creates a new thread pool for each dispatcher instead of sharing a common one.

```kotlin
val dispatcher = Executors.newFixedThreadPool(10)
    .asCoroutineDispatcher()
```

---

## Blocking functions in flows

Blocking functions return at most one value, so they are best represented as suspending functions in Kotlin Coroutines. However, some prefer to use flows to represent such operations. The simplest way to turn a suspending function into a flow is to use `flow` builder:

```kotlin
fun sendEmailFlow(email: Email): Flow<Response> = flow {
    emit(sendEmail(email)) // Suspending call
}
​
fun readFileFlow(file: File): Flow<String> = flow {
    emit(readFile(file)) // Suspending call
}
​
fun getUserDataFlow(googleToken: String): Flow<GoogleUserData?> = flow {
    emit(getUserData(googleToken)) // Suspending call
}
```

However, if you want to directly use blocking functions in flows, you can do that, but you need to make sure they use a dispatcher that is designed for blocking operations. For that, we should use `flowIn` as the last operator in the flow chain, and pass a dispatcher that is designed for blocking operations, like `Dispatchers.IO` or a custom dispatcher as described above.

```kotlin
// I do not recommend this approach, 
// prefer using suspending functions instead
fun sendEmail(
    email: Email
): Flow<Result> = flow {
    val request = Request().apply {
        method = Method.POST
        endpoint = "mail/send"
        body = mail
    }
    emit(sendGrid.api(request))
}.flowIn(Dispatchers.IO)
​
fun getUserData(googleToken: String): Flow<GoogleUserData> = flow {
    verifier.verify(googleToken)
        ?.payload
        ?.toGoogleUserData()
        ?.let { emit(it) }
}.flowIn(Dispatchers.IO)
​
fun readFile(file: File): Flow<String> = flow {
    emit(file.readText())
}.flowIn(Dispatchers.IO)
```

---

## Conclusion

- You should not use blocking functions directly in suspending functions or flows, as they block the current thread.
- You can turn blocking functions into suspending functions by wrapping them in `withContext(Dispatchers.IO)` or a custom dispatcher that is designed for blocking operations.
- You can also turn blocking functions into flows by using `flow` builder and `flowIn` operator with a dispatcher that is designed for blocking operations.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Calling blocking functions from suspending functions",
  "desc": "A guide on how to correctly convert blocking functions into suspending functions in Kotlin Coroutines.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/interop-blocking-to-coroutines.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
