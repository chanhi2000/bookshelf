---
lang: en-US
title: "Running Kotlin coroutines on Project Loom's virtual threads"
description: "Article(s) > Running Kotlin coroutines on Project Loom's virtual threads"
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
      content: "Article(s) > Running Kotlin coroutines on Project Loom's virtual threads"
    - property: og:description
      content: "Running Kotlin coroutines on Project Loom's virtual threads"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/dispatcher-loom.html
prev: /programming/java/articles/README.md
date: 2023-01-09
isOriginal: false
author: Jan Vladimir Mostert
cover: https://marcinmoskala.com/kt-academy-articles/promotion/dispatcher-loom.png
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
  name="Running Kotlin coroutines on Project Loom's virtual threads"
  desc="How to use Project Loom to improve Coroutines performance."
  url="https://kt.academy/article/dispatcher-loom"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/dispatcher-loom.png"/>

If you want to run asynchronous or non-blocking code in Kotlin, you have to run it inside a `CoroutineScope`. If you’re dealing with callbacks, you have to convert it to a suspending function with `suspendCancellableCoroutine` so that you can call it inside a `CoroutineScope`:

```kotlin
@ExperimentalCoroutinesApi
suspend fun Blah.doSomethingSuspending() = suspendCancellableCoroutine { continuation ->
  this.onSuccess {
    continuation.resume(
      value = it,
      onCancellation = continuation::cancel
    )
  }
 
  this.onError {
    continuation.resumeWithException(exception = it)
  }
 
  this.onCancel {
    continuation.cancel(cause = it)
  }
}
```

For blocking code, unfortunately, you are stuck with `Dispatchers.IO`, which is a giant thread pool where each dispatch is still blocking a thread:

```kotlin
withContext(Dispatchers.IO) {
  blockingFunction()
}
```

What if instead of blocking a regular thread, we run it on one of Project Loom’s virtual threads, effectively turning the blocking code into something non-blocking while still being Coroutine compatible?

```kotlin
withContext(Dispatchers.LOOM) {
  blockingFunction()
}
```

For this to work, let’s first enable JDK19’s preview features with some VM options so that we can make use of virtual threads:

Next, we need to define our custom Dispatcher. If you want to customize how the Dispatcher works, you can extend ExecutorCoroutineDispatcher …

```kotlin
val Dispatchers.LOOM: CoroutineDispatcher
  get() = object : ExecutorCoroutineDispatcher(), Executor {
 
    override val executor: Executor
      get() = this
 
    override fun close() {
      error("Cannot be invoked on Dispatchers.LOOM")
    }
 
    override fun dispatch(context: CoroutineContext, block: Runnable) {
      Thread.startVirtualThread(block)
    }
     
    override fun execute(command: Runnable) {
      Thread.startVirtualThread(command)
    }
     
    override fun toString() = "Dispatchers.LOOM"
  }
```

or we can create an ExecutorService and convert it to a Dispatcher:

```kotlin
val Dispatchers.LOOM: CoroutineDispatcher
  get() = Executors.newVirtualThreadPerTaskExecutor().asCoroutineDispatcher()
```

We’ll use `Thread.sleep` as a placeholder for blocking functions:

![](https://marcinmoskala.com/kt-academy-articles/images/loom/image7.png&w=3840&q=75)

IntelliJ warns us that `Thread.sleep` is a blocking function inside a non-blocking context, even though our goal is to run blocking code inside this context. Let’s get rid of this warning.

```kotlin
val Dispatchers.LOOM: @BlockingExecutor CoroutineDispatcher
  get() = Executors.newVirtualThreadPerTaskExecutor().asCoroutineDispatcher()
```

If we include JetBrains Java Annotations (org.jetbrains:annotations) as a dependency, we get access to @BlockingExecutor, which marks our CoroutinesDispatcher as blocking-compatible.

![](https://marcinmoskala.com/kt-academy-articles/images/loom/image9.png&w=3840&q=75)

Let’s launch a million blocking calls and see how long it takes! We’ll be using supervisory scope so that we can wait for all 1 million launches to finish before capturing the duration.

If we’re using `Dispatchers.IO`, we’re expecting the total duration to be 1 million x 1000 ms / 64 actual threads, which should be roughly 4 hours and 20 minutes (assuming [`IO_PARALLELISM_PROPERTY_NAME`](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-i-o_-p-a-r-a-l-l-e-l-i-s-m_-p-r-o-p-e-r-t-y_-n-a-m-e.html) was left untouched at its default of 64)

![](https://marcinmoskala.com/kt-academy-articles/images/loom/image10.png&w=3840&q=75)

Nothing stops you from doing `Dispatchers.IO.limitedParallelism(1_000_000)`, but let me know how long your computer runs before it becomes completely unresponsive.

If we use something more realistic like 5_000, we can expect the total duration to be 1 million x 1000ms / 5000 actual threads, which should be roughly 3 minutes and 20 seconds

![](https://marcinmoskala.com/kt-academy-articles/images/loom/image3.png&w=3840&q=75)

If I push for 10_000 threads, my computer just becomes completely unresponsive, so that seems to be bordering on how fast we can go using `Dispatchers.IO`.

Launching the same number of blocking calls inside our LOOM Dispatcher, we’re expecting the total duration to be 1 million x 1000 ms / 1 million virtual threads, and we should finish in roughly 1 second, assuming JVM warmup and no overheads.

![](https://marcinmoskala.com/kt-academy-articles/images/loom/image5.png&w=3840&q=75)

In the real world, however, we have some overhead, and not warming up the JVM will penalize us too, so we end up with ~6 seconds instead of the predicted 1 second. Still, that is +30x faster than what we could achieve with `Dispatchers.IO`.

If we compare this with launching 1 million non-blocking calls in a `CoroutineScope`, we’re expecting a duration in the same ballpark.

![](https://marcinmoskala.com/kt-academy-articles/images/loom/image6.png&w=3840&q=75)

Let’s compare some under-the-hood stats!

If we launch a million `Thread.sleeps` inside `Dispatchers.IO` with parallelism set to 5000, notice how the CPU consumption is almost zero most of the time and the number of threads being 5556. Threads context switching seems to be our limiting factor here rather than CPU / Memory.

![](https://marcinmoskala.com/kt-academy-articles/images/loom/image1.png&w=3840&q=75)

If we launch a million `Thread.sleeps` inside `Dispatchers.LOOM`, you can see the thread count stays relatively low peaking at 30, but it maximizes CPU usage.

![](https://marcinmoskala.com/kt-academy-articles/images/loom/image4.png&w=3840&q=75)

Of those 30 threads, 12 are worker threads that are there by default when using Coroutines (equivalent to the number of CPU cores) and 1 thread is marked “VirtualThread-unparker” while the rest are related to IntelliJ and / or VisualVM.

![](https://marcinmoskala.com/kt-academy-articles/images/loom/image2.png&w=3840&q=75)

In conclusion: with our custom LOOM Dispatcher, we are now able to convert blocking code into non-blocking coroutine-compatible code instead of being limited by `Dispatchers.IO`.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Running Kotlin coroutines on Project Loom's virtual threads",
  "desc": "How to use Project Loom to improve Coroutines performance.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/dispatcher-loom.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
