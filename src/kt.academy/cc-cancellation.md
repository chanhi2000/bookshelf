---
lang: en-US
title: "Cancellation in Kotlin Coroutines"
description: "Article(s) > Cancellation in Kotlin Coroutines"
icon: iconfont icon-kotlin
category:
  - Java
  - Kotlin
  - Coroutines
  - Article(s)
tag: 
  - blog
  - kt.academy
  - java
  - kotlin
  - coroutines
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Cancellation in Kotlin Coroutines"
    - property: og:description
      content: "Cancellation in Kotlin Coroutines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/cc-cancellation.html
prev: /programming/java/articles/README.md
date: 2024-03-11
author: Marcin Moskała
cover: https://marcinmoskala.com/coroutines_book/promotion/204_cancellation.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Cancellation in Kotlin Coroutines"
  desc="Everything you need to know about the cancellation mechanism in Kotlin Coroutines."
  url="https://kt.academy/article/cc-cancellation"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/coroutines_book/promotion/204_cancellation.jpg"/>

::: note

This is a chapter from the book [Effective Kotlin](/book/effectivekotlin). You can find it on [<FontIcon icon="fas fa-globe"/>LeanPub](https://leanpub.com/effectivekotlin) or [<FontIcon icon="fa-brands fa-amazon"/>Amazon](https://amazon.com/Effective-Kotlin-Best-Practices-Developers-ebook/dp/B0CHBR5XPF/).

:::

One of the most important mechanisms of Kotlin Coroutines for Android developers is *cancellation* because, on Android, nearly every coroutine is associated with some view, and if this view is destroyed, its coroutines are not needed, so they should be cancelled. Other coroutines should also be cancelled when the application is finished. This is a crucial capability that used to require a lot of effort from developers in many other libraries, but Kotlin Coroutines offer a simple and safe cancellation mechanism that can also be used on the backend, especially when we deal with long connections, like WebSockets or long polling. What is more, we often don't even realize that cancellation works in other situations, such as freeing up resources and making our application more efficient.

Cancellation is so important that some classes and libraries use suspending functions primarily to support cancellation[^1]. There is a good reason for this: a good cancellation mechanism is worth its weight in gold[^2]. Just killing a thread is a terrible solution as there should be an opportunity to close connections and free resources. Forcing developers to frequently check if some state is still active isn't convenient either. The problem of cancellation waited for a good solution for a very long time, but what Kotlin Coroutines offer is surprisingly simple, convenient and safe. This is the best cancellation mechanism I've seen in my career. Let's explore it.

---

## Basic cancellation

The basic idea behind cancellation is simple: calling `cancel` from a `Job` object changes its state to "Cancelling". Here are the consequences of this change:

- All the children of this job are also cancelled.
- The job cannot be used as a parent for any new coroutines.
- At the first suspension point, a `CancellationException` is thrown. If this coroutine is currently suspended, it will be resumed immediately with `CancellationException`. `CancellationException` is ignored by the coroutine builder, so it is not necessary to catch it, but it is used to complete this coroutine body as soon as possible.
- Once the coroutine body is completed and all its children are completed too, it changes its state to "Cancelled".

Take a look at the following example:

::: kotlin-playground Basic cancellation

@file main.kt

```kotlin
suspend fun main(): Unit = coroutineScope {
  val job = launch {
    repeat(1_000) { i ->
      delay(200)
      println("Printing $i")
    }
  }
  
delay(1100)
job.cancel()
job.join()
println("Cancelled successfully")
}
//
// (0.2 sec)
// Printing 0
// (0.2 sec)
// Printing 1
// (0.2 sec)
// Printing 2
// (0.2 sec)
// Printing 3
// (0.2 sec)
// Printing 4
// (0.1 sec)
// Cancelled successfully
```

:::

`launch` starts a process that prints a number every 200 ms. However, after 1100 ms, we cancel this process, therefore the coroutine changes state to "Cancelling", and a `CancellationException` is thrown at the first suspension point. This exception ends our coroutine body, so the coroutine changes state to "Cancelled", `join` resumes, and we see "Cancelled successfully".

We might cancel with a different exception (by passing an exception as an argument to the `cancel` function) in order to specify the cause. This cause needs to be a subtype of `CancellationException` because only an exception of this type can be used to cancel a coroutine.

---

## The `finally` block

The cancellation mechanism is simple but very powerful. It guarantees that if we have a `finally` block, it will be executed, and all the resources will be freed. It also allows us to make an action only in case of cancellation by catching `CancellationException`. It is not necessary to rethrow this exception because it is ignored by the coroutine builder, but it is considered good practice to do so in case there is some outer scope that should know about the cancellation.

::: kotlin-playground The finally block

@file main.kt

```kotlin
suspend fun main(): Unit = coroutineScope {
    val job = launch {
      try {
          repeat(1_000) { i ->
              delay(200)
              println("Printing $i")
            }
        } catch (e: CancellationException) {
        println("Cancelled with $e")
      throw e
    } finally {
      println("Finally")
      }
  }
  delay(700)
  job.cancel()
  job.join()
  println("Cancelled successfully")
  delay(1000)
}
//
// (0.2 sec)
// Printing 0
// (0.2 sec)
// Printing 1
// (0.2 sec)
// Printing 2
// (0.1 sec)
// Cancelled with JobCancellationException...
// Finally
// Cancelled successfully
```

:::

Notice that `join` in the example above is used to wait for the cancellation to finish before we can proceed. Without this, we would have a race condition, and we would (most likely) see "Cancelled successfully" before "Cancelled..." and "Finally". This is why when we cancel a coroutine we often also add `join` to wait for the cancellation to finish. Since this is a common pattern, the kotlinx.coroutines library offers a convenient extension function with a self-descriptive name, `cancelAndJoin`[^5].

```kotlin
public suspend fun Job.cancelAndJoin() {
  cancel()
  return join()
}
```

---

## `invokeOnCompletion`

Another way to handle coroutine cancellation or completion is to use the `invokeOnCompletion` function from `Job`, which is used to set a handler to be called when the job reaches a terminal state, namely either "Completed" or "Cancelled". It also provides an exception in its parameter that finishes a coroutine. `invokeOnCompletion` is guaranteed to be called exactly once (assuming this coroutine ever completes), even if the job had already completed when the handler was set.

::: kotlin-playground invokeOnCompletion

@file main.kt

```kotlin
  suspend fun main(): Unit = coroutineScope {
    val job = launch {
      repeat(1_000) { i ->
            delay(200)
            println("Printing $i")
          }
      }
    job.invokeOnCompletion {
    if (it is CancellationException) {
      println("Cancelled with $it")
    }
    println("Finally")
  } 
  delay(700)
  job.cancel()
  job.join()
  println("Cancelled successfully")
  delay(1000)
}
//
// (0.2 sec)
// Printing 0
// (0.2 sec)
// Printing 1
// (0.2 sec)
// Printing 2
// (0.1 sec)
// Cancelled with JobCancellationException...
// Finally
// Cancelled successfully
```

:::

The `invokeOnCompletion` handler is called with:

- `null` if the job finished with no exception;
- `CancellationException` if the coroutine was cancelled;
- the exception that finished a coroutine (more about this in the next chapter).

`invokeOnCompletion` is called synchronously during cancellation, and we can't control the thread in which it will be running. It can be further customized with the `onCancelling`[^3] and `invokeImmediately`[^4] parameters.

---

## Cancellation of children

Cancellation propagates down the hierarchy of coroutines because when a job is cancelled, all its children are also cancelled. This is a very useful feature as when you cancel a process, it also cancels all its subprocesses. This is good practice as it prevents memory leaks and frees resources.

::: kotlin-playground Cancellation of children

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun main(): Unit = coroutineScope {
  var childJob: Job? = null
  val job = launch {
    launch {
      try {
        delay(1000)
        println("A")
      } finally {
        println("A finished")
      }
    }
    childJob = launch {
      try {
        delay(2000)
        println("B")
      } catch (e: CancellationException) {
        println("B cancelled")
      }
    }
    launch {
      delay(3000)
      println("C")
    }.invokeOnCompletion {
      println("C finished")
    }
  }
  delay(100)
  job.cancel()
  job.join()
  println("Cancelled successfully")
  println(childJob?.isCancelled)
}
//
// (0.1 sec)
// (the below order might be different)
// A finished
// B cancelled
// C finished
// Cancelled successfully
// true
```

:::

---

## Cancellation in a coroutine scope

A job created using the `Job()` factory function can be cancelled in the same way. We often specify a job when we construct a coroutine scope. If we don't specify it explicitly, `CoroutineScope` creates a default job.

```kotlin
fun CoroutineScope(
  context: CoroutineContext
): CoroutineScope = ContextScope(
  if (context[Job] != null) context else context + Job()
)
```

So when such a scope is used as a parent for coroutines, we can cancel all of them at once by cancelling the parent’s job. This can be done using the `cancel` function from `CoroutineScope`, which calls `cancel` on the job.

```kotlin
fun CoroutineScope.cancel(cause: CancellationException? = null) {
   val job = coroutineContext[Job] ?: error("...")
   job.cancel(cause)
}
```

This capability is often used to cancel all the tasks started by a class. This might be useful, for instance, to complete all processes in unit testing.

```kotlin title="OfferUploader.kt"
class OfferUploader {
  private val scope = CoroutineScope(Dispatchers.IO)

fun upload(offer: Offer) {
    scope.launch {
      // upload
    }
  }

  fun cancel() {
    scope.cancel()
  }
}
```

However, you must remember that once a job is cancelled it cannot be used as a parent for new coroutines. So, a scope with a cancelled job is not useful anymore. This can even be dangerous because trying to start a new coroutine in such a scope will silently do nothing.

::: kotlin-playground Cancellation in a coroutine scope

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun main() {
  val scope = CoroutineScope(Job())
  scope.cancel()
  val job = scope.launch { // will be ignored
    println("Will not be printed")
  }
  job.join()
}
```

:::

That is why I recommend using the `cancelChildren` function from `CoroutineContext`, which cancels all the children of a job but leaves the job itself in the active state. Keeping the job active costs us nothing and gives us some extra safety. On Android, cancellation happens automatically when we use Android KTX's `viewModelScope` or `lifecycleScope`. We might also create a scope ourselves, in which case we should remember to cancel its children when this scope is no longer needed. It is good practice to use `SupervisorJob` as a parent for such a scope, as I will explain in the next chapter.

```kotlin title="ProfileViewModel"
class ProfileViewModel : ViewModel() {
  private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())

  fun onCreate() {
    scope.launch { loadUserData() }
  }

  override fun onCleared() {
    scope.coroutineContext.cancelChildren()
  }

 // ...
}
```

---

## Just one more call

When we cancel a coroutine, it changes state to "Cancelling", where it should only clean up resources and complete. However, what if cleaning up resources requires making suspending calls or starting coroutines? We cannot do that because these operations are not allowed in the "Cancelling" state. Calling suspending functions in this state will throw `CancellationException`, and starting a new coroutine will be ignored.

::: kotlin-playground Just one more call 1

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun main(): Unit = coroutineScope {
  val job = Job()
  launch(job) {
    try {
      println("Coroutine started")
      delay(200)
      println("Coroutine finished")
    } finally {
      println("Finally")
      launch {
        println("Children executed")
      }
      delay(1000L)
      println("Cleanup done")
    }
  }
  delay(100)
  job.cancelAndJoin()
  println("Done")
}
//
// Coroutine started
// (0.1 sec)
// Finally
// Done
```

:::

For such situations, there is a special structure `withContext(NonCancellable)`. **We should use `withContext(NonCancellable)` for all suspending calls that should be executed even in the "Cancelling" state (so even in the case of cancellation).** `NonCancellable` is a job that is always active, and it should not be used outside this particular situation, where we need to either make a suspending call or start a new coroutine even in the case of cancellation.

::: kotlin-playground Just one more call 2

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun main(): Unit = coroutineScope {
  val job = Job()
  launch(job) {
    try {
      println("Coroutine started")
      delay(200)
      println("Coroutine finished")
    } finally {
      println("Finally")
      withContext(NonCancellable) {
        launch {
          println("Children executed")
        }
        delay(1000L)
        println("Cleanup done")
      }
    }
  }
 delay(100)
 job.cancelAndJoin()
 println("Done")
}
//
// Coroutine started
// (0.1 sec)
// Finally
// Children executed
// (1 sec)
// Cleanup done
// Done
```

:::

Even if you just implement a suspending function and you specify some cleanup in the `finally` block that requires a suspending call, you should use `withContext(NonCancellable)` to make sure that the cleanup will be done even in the case of cancellation.

```kotlin
suspend fun operation() {
  try {
    // operation
  } finally {
    withContext(NonCancellable) {
      // cleanup that requires suspending call
    }
  }
}
```

---

## Stopping the unstoppable

Because cancellation happens at suspension points, it won’t happen until a suspension. To simulate such a situation, we could use `Thread.sleep` instead of `delay`, but this is a terrible practice, so please don’t do this in any real-life projects. We are just trying to simulate a case in which we are using our coroutines extensively but not suspending them. In practice, such a situation might arise if we have some complex calculations, like neural network learning (yes, we also use coroutines for such cases in order to simplify processing parallelization), or when we need to do some blocking calls (for instance, when reading files).

The example below presents a situation in which a coroutine cannot be cancelled because there is no suspension point inside it (we use `Thread.sleep` instead of `delay`). The execution needs over 3 minutes, even though it should be cancelled after 1 second.

::: kotlin-playground Stopping the unstoppable 1

@file main.kt

```kotlin
suspend fun main(): Unit = coroutineScope {
  val job = Job()
  launch(job) {
    repeat(1_000) { i ->
      Thread.sleep(200) // We might have some
      // complex operations or reading files here
      println("Printing $i")
    }
  }
  delay(1000)
  job.cancelAndJoin()
  println("Cancelled successfully")
  delay(1000)
}
//
// Printing 0
// Printing 1
// Printing 2
// ... (up to 1000)
```

:::

There are a few ways to deal with such situations. The first one is to use the `yield()` function from time to time. This function suspends and immediately resumes a coroutine. This gives an opportunity to do whatever is needed during suspension (or resuming), including cancellation (or changing a thread using a dispatcher).

::: kotlin-playground Stopping the unstoppable 2

@file main.kt

```kotlin
suspend fun main(): Unit = coroutineScope {
  val job = Job()
  launch(job) {
    repeat(1_000) { i ->
      Thread.sleep(200)
      yield()
      println("Printing $i")
    }
  }
  delay(1100)
  job.cancelAndJoin()
  println("Cancelled successfully")
  delay(1000)
}
//
// Printing 0
// Printing 1
// Printing 2
// Printing 3
// Printing 4
// Cancelled successfully
```

:::

It is good practice to use `yield` in suspend functions between blocks of non-suspended CPU-intensive or time-intensive operations.

```kotlin
suspend fun cpu() = withContext(Dispatchers.Default) {
  cpuIntensiveOperation1()
  yield()
  cpuIntensiveOperation2()
  yield()
  cpuIntensiveOperation3()
}
```

Another option is to track the state of the job. Inside a coroutine builder, `this` (the receiver) references the scope of this builder. `CoroutineScope` has a context we can reference using the `coroutineContext` property. Thus, we can access the coroutine job (using `coroutineContext[Job]` or `coroutineContext.job`) and check what its current state is. Since a job is often used to check if a coroutine is active, the Kotlin Coroutines library provides a function to simplify this:

```kotlin
public val CoroutineScope.isActive: Boolean
  get() = coroutineContext[Job]?.isActive ?: true
```

We can use the `isActive` property to check if a job is still active and stop calculations if it is not.

::: kotlin-playground Stopping the unstoppable 3

@file main.kt

```kotlin
suspend fun main(): Unit = coroutineScope {
  val job = Job()
  launch(job) {
    do {
      Thread.sleep(200)
      println("Printing")
    } while (isActive)
  }
  delay(1100)
  job.cancelAndJoin()
  println("Cancelled successfully")
}
//
// Printing
// Printing
// Printing
// Printing
// Printing
// Printing
// Cancelled successfully
```

:::

Alternatively, we might use the `ensureActive()` function, which throws `CancellationException` if `Job` is not active.

::: kotlin-playground Stopping the unstoppable 4

@file main.kt

```kotlin
suspend fun main(): Unit = coroutineScope {
  val job = Job()
  launch(job) {
    repeat(1000) { num ->
      Thread.sleep(200)
      ensureActive()
      println("Printing $num")
    }
  }
  delay(1100)
  job.cancelAndJoin()
  println("Cancelled successfully")
}
//
// Printing 0
// Printing 1
// Printing 2
// Printing 3
// Printing 4
// Cancelled successfully
```

:::

The result of `ensureActive()` and `yield()` seem similar but are actually very different. The `ensureActive()` function needs to be called on a `CoroutineScope` (or `CoroutineContext`, or `Job`). All it does is throw an exception if the job is no longer active. `ensureActive()` is lighter than `yield()`. The `yield` function is a regular top-level suspension function that does not need any scope, so it can be used in regular suspending functions. Since it does suspension and resuming, it causes redispatching, which means that if there is a queue to the dispatcher, this coroutine will return the thread and wait in the queue. This is considered positive when our operations are demanding threads as it prevents other coroutines being starved. `yield` should be used in suspending functions that make multiple CPU-intensive or blocking operations.

---

## `CancellationException` is special

Since `CancellationException` is thrown when a coroutine is cancelled, it has a special meaning for coroutines. That is why we should not catch it with other exceptions, as a rule of thumb we should always rethrow it, even if all other exceptions are caught.

```kotlin
suspend fun operation() {
  try {
    // suspending operation
  } catch (e: CancellationException) {
    throw e
  } catch (e: Exception) {
    // hanle other exceptions
  }
}
```

Optionally, we could also add `ensureActive()` in the catch block to ensure that the coroutine is still active (some people consider this approach safer, because it throws exceptions only if the current coroutine is active, and not when `CancellationException` is thrown for other reasons).

```kotlin
suspend fun operation() {
  try {
    // suspending operation
  } catch (e: Exception) {
    // hanle exceptions
    coroutineContext.ensureActive()
  }
}
```

We can explicitly catch `CancellationException` if we want to do something particular in the case of cancellation, but we should always rethrow it to inform the outer scope about the cancellation.

```kotlin
suspend fun operation() {
  try {
    // suspending operation
  } catch (e: CancellationException) {
    // do something
    throw e
  }
}
```

Beware, that `CancellationException` used by Kotlin Coroutines is not the same as `java.util.concurrent.CancellationException`. The latter is used in Java for the `Future` interface, and it is not a part of the Kotlin Coroutines library.

---

## CancellationException does not propagate to its parent

All exceptions that extend `CancellationException` are treated in a special way: they only cause cancellation of the current coroutine. `CancellationException` is an open class, so it can be extended by our own classes or objects.

::: kotlin-playground CancellationException does not propagate to its parent (1)

@file main.kt

```kotlin
import kotlinx.coroutines.*

class MyNonPropagatingException : CancellationException()

suspend fun main(): Unit = coroutineScope {
  launch { // 1
    launch { // 2
      delay(2000)
      println("Will not be printed")
    }
    delay(1000)
    throw MyNonPropagatingException() // 3
  }
  launch { // 4
    delay(2000)
    println("Will be printed")
  }
}
//
// (2 sec)
// Will be printed
```

:::

In the above snippet, we start two coroutines with builders at 1 and 4. After 1 second, we throw a `MyNonPropagatingException` exception at 3, which is a subtype of `CancellationException`. This exception is caught by `launch` (started at 1). This builder cancels itself, then it also cancels its children, namely the builder defined at 2. However, the exception is not propagated to the parent (because it is of type `CancellationException`), so `coroutineScope` and its children (the coroutine started at 4) are not affected. This is why the coroutine that starts at 4 prints "Will be printed" after 2 seconds.

In some projects, I see a pattern of defining exceptions that extend `CancellationException`. This is a dangerous practice because it might lead to unexpected results. Consider the following code:

::: kotlin-playground CancellationException does not propagate to its parent (2)

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlin.coroutines.cancellation.CancellationException

// Poor practice, do not do this
class UserNotFoundException : CancellationException()

suspend fun main() {
  try {
    updateUserData()
  } catch (e: UserNotFoundException) {
    println("User not found")
  }
}

suspend fun updateUserData() {
  updateUser()
  updateTweets()
}
suspend fun updateTweets() { 
  delay(1000)
  println("Updating...") 
}
suspend fun updateUser() { throw UserNotFoundException() }
// User not found
```

:::

This code works, but well... accidentally. It works only because there are no coroutines between throwing an exception and catching it. Adding `launch` in between might change the result significantly.

::: kotlin-playground CancellationException does not propagate to its parent (3)

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlin.coroutines.cancellation.CancellationException

// Poor practice, do not do this
class UserNotFoundException : CancellationException()

suspend fun main() {
  try {
    updateUserData()
  } catch (e: UserNotFoundException) {
    println("User not found")
  }
}

suspend fun updateUserData() = coroutineScope {
  launch { updateUser() }
  launch { updateTweets() }
}
suspend fun updateTweets() { 
  delay(1000)
  println("Updating...") 
}
suspend fun updateUser() { throw UserNotFoundException() }
//
// (1 sec)
// Updating...
```

:::

In the above example, `updateUser` throws `UserNotFoundException`, but it is caught by `launch` from `updateUserData` and only causes cancellation of this `launch`. `updateTweets` is not affected, so it prints "Updating..." and the exception is not caught in `main`. This behavior is different from what we would typically expect, namely propagation of the exception until it is caught. It is a trap that developers sometimes fall into.

Encountering such a situation is not common because if we used `async` with `await` instead of `launch`, then `await` would throw `UserNotFoundException`, and this exception should propagate. However, it is better to avoid doing this as it might lead to unexpected results that are hard to debug. It is safer to extend `Exception` or `RuntimeException` instead of `CancellationException`.

::: kotlin-playground CancellationException does not propagate to its parent (4)

@file main.kt

```kotlin
import kotlinx.coroutines.*

class UserNotFoundException : RuntimeException()

suspend fun main() {
  try {
    updateUserData()
  } catch (e: UserNotFoundException) {
    println("User not found")
  }
}

suspend fun updateUserData() {
  updateUser()
  updateTweets()
}
suspend fun updateTweets() { 
  delay(1000)
  println("Updating...") 
}
suspend fun updateUser() { throw UserNotFoundException() }
//
// User not found
```

:::

---

## `withTimeout`

If you want to start a certain operation with timeout, you can use the `withTimeout` function, which behaves just like `coroutineScope` until the timeout is exceeded. Then, it cancels its children and throws `TimeoutCancellationException` (a subtype of `CancellationException`).

::: kotlin-playground withTimeout (1)

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun test(): Int = withTimeout(1500) {
  delay(1000)
  println("Still thinking")
  delay(1000)
  println("Done!")
  // 42
}

suspend fun main(): Unit = coroutineScope {
  try {
    test()
  } catch (e: TimeoutCancellationException) {
    println("Cancelled")
  }
  delay(1000) // Extra timeout does not help,
  // `test` body was cancelled
}
//
// (1 sec)
// Still thinking
// (0.5 sec)
// Cancelled
```

:::

Beware that `withTimeout` throws `TimeoutCancellationException`, which is a subtype of `CancellationException` (the same exception that is thrown when a coroutine is cancelled). So, when this exception is thrown in a coroutine builder, it only cancels it and does not affect its parent.

::: kotlin-playground withTimeout (2)

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun main(): Unit = coroutineScope {
  launch { // 1
    launch { // 2, cancelled by its parent
      delay(2000)
      println("Will not be printed")
    }
    withTimeout(1000) { // we cancel launch
      delay(1500)
    }
  }
  launch { // 3
    delay(2000)
    println("Done")
  }
}
//
// (2 sec)
// Done
```

:::

In the above example, `delay(1500)` takes longer than `withTimeout(1000)` expects, so `withTimeout` cancels its coroutine and throws `TimeoutCancellationException`. The exception is caught by `launch` at 1, and it cancels itself and its children (`launch` starts at 2). The `launch` that starts at 3 is not affected, so it prints "Done" after 2 seconds.

A less aggressive variant of `withTimeout` is `withTimeoutOrNull`, which does not throw an exception. If the timeout is exceeded, it just cancels its body and returns `null`. I find `withTimeoutOrNull` useful for wrapping functions in which waiting times that are too long signal that something has gone wrong, such as network operations: if we wait over 5 seconds for a response, it is unlikely we will ever receive it (some libraries might wait forever).

::: kotlin-playground withTimeout (3)

@file main.kt

```kotlin
import kotlinx.coroutines.*

class User()

suspend fun fetchUser(): User {
  // Runs forever
  while (true) {
    yield()
  }
}

suspend fun getUserOrNull(): User? =
  withTimeoutOrNull(5000) {
    fetchUser()
  }

suspend fun main(): Unit = coroutineScope {
  val user = getUserOrNull()
  println("User: $user")
}
//
// (5 sec)
// User: null
```

:::

---

## `suspendCancellableCoroutine`

Here, you might remind yourself of the `suspendCancellableCoroutine` function introduced in the *How does suspension work?* chapter. It behaves like `suspendCoroutine`, but its continuation is wrapped into `CancellableContinuation<T>`, which provides some additional methods, the most important of which is `invokeOnCancellation`, which we use to define what should happen when a coroutine is cancelled. Most often we use it to cancel processes in a library or to free resources.

```kotlin
suspend fun someTask() = suspendCancellableCoroutine { cont ->
  // rest of the implementation
  cont.invokeOnCancellation { /* cleanup */ }
}
```

The `CancellableContinuation<T>` also lets us check the job state (using the `isActive`, `isCompleted` and `isCancelled` properties) and cancel this continuation with an optional cancellation cause.

---

## Summary

Cancellation is a powerful feature. It is generally easy to use, but it can sometimes be tricky, therefore it’s important to understand how it works. From this chapter, you should remember that:

- When we cancel a coroutine, it changes its state to "Cancelling", and cancels all its children.
- A coroutine in the "Cancelling" state does not start child coroutines and throws `CancellationException` when we try to suspend it or if it is suspended.
- It is guaranteed that the body of the `finally` block and the `invokeOnCompletion` handler will be executed.
- We can invoke an operation specifically in the case of cancellation by catching `CancellationException`, but we should rethrow it to inform the outer scope about the cancellation.
- To start a new coroutine or make a suspending call in the "Cancelling" state, we can use `withContext(NonCancellable)`.
- To allow cancellation between non-suspending operations, we can use `yield` or `ensureActive`.
- `CancellationException` does not propagate to its parent.
- We can use `withTimeout` or `withTimeoutOrNull` to start a coroutine with a timeout.
- Always use `suspendCancellableCoroutine` instead of `suspendCoroutine` when you need to transform a callback-based API into a suspending function, and use `invokeOnCancellation` to define what should happen when a coroutine is cancelled.

A properly used cancellation means fewer wasted resources and fewer memory leaks. This is important for our application's performance, so I hope you will use these advantages from now on.

[^1]: A good example is `CoroutineWorker` on Android, where according to the presentation [<FontIcon icon="fa-brands fa-youtube"/>*Understand Kotlin Coroutines on Android* on Google I/O'19](https://youtu.be/BOHK_w09pVA) by Sean McQuillan and Yigit Boyar (both working on Android at Google), support for coroutines was added primarily to use the cancellation mechanism.
[^2]: Actually, it's worth much more since the code is currently not very heavy (it used to be when it was stored on punched cards).
[^3]: If true, the function is called in the "Cancelling" state (i.e., before "Cancelled"). `false` by default.
[^4]: This parameter determines whether the handler should be called immediately if the handler is set when a coroutine is already in the desired state. `true` by default.
[^5]: This function first calls `cancel` and then `join`, so it is called `cancelAndJoin`. Uncle Bob would be proud.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Cancellation in Kotlin Coroutines",
  "desc": "Everything you need to know about the cancellation mechanism in Kotlin Coroutines.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/cc-cancellation.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
