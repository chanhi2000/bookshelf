---
lang: en-US
title: "Understanding the Coroutine Lifecycle in Kotlin"
description: "Article(s) > Understanding the Coroutine Lifecycle in Kotlin"
icon: iconfont icon-kotlin
category:
  - Java
  - Kotlin
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Understanding the Coroutine Lifecycle in Kotlin"
    - property: og:description
      content: "Understanding the Coroutine Lifecycle in Kotlin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/understanding-the-coroutine-lifecycle-in-kotlin.html
prev: /programming/java/articles/README.md
date: 2024-10-31
isOriginal: false
author: Rahul Ray
cover: https://droidcon.com/wp-content/uploads/2024/10/1_sdb3Y6ckQGLcuekR8RD4Ew-600x300.webp
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
  name="Understanding the Coroutine Lifecycle in Kotlin"
  desc="Kotlin’s coroutines offer a powerful way to manage concurrency and asynchronous programming. However, to use them effectively, it’s crucial to understand the lifecycle of a coroutine. In this blog post, we’ll explore the coroutine lifecycle, focusing on the states of a coroutine’s Job, how they transition between states, and practical examples to illustrate each state, including the effects of launching nested coroutines. Additionally, we’ll discuss best practices and modifications."
  url="https://droidcon.com/understanding-the-coroutine-lifecycle-in-kotlin"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/10/1_sdb3Y6ckQGLcuekR8RD4Ew-600x300.webp"/>

![Diagram from <VPIcon icon="fas fa-globe"/>`kotlinlang.org`](https://droidcon.com/wp-content/uploads/2024/10/1_sdb3Y6ckQGLcuekR8RD4Ew-600x300.webp)

Kotlin’s coroutines offer a powerful way to manage concurrency and asynchronous programming. However, to use them effectively, it’s crucial to understand the lifecycle of a coroutine. In this blog post, we’ll explore the coroutine lifecycle, focusing on the states of a coroutine’s Job, how they transition between states, and practical examples to illustrate each state, including the effects of launching nested coroutines. Additionally, we’ll discuss best practices and modifications.

---

## What is a Coroutine?

Coroutines are lightweight threads that allow you to perform asynchronous tasks without blocking the main thread. They provide a way to write non-blocking code that is easy to read and maintain. In Kotlin, coroutines are structured around the concept of jobs.

---

## What is a Job?

A Job is a handle to a coroutine. It represents its lifecycle and allows you to manage its execution, including starting, cancelling, and checking its status. The Job provides several states that a coroutine can be in during its lifecycle.

---

## Coroutine Job Lifecycle States

The lifecycle of a coroutine’s Job includes the following states:

- **New**: The coroutine is created but not yet started.
- **Active**: The coroutine is currently running.
- **Completing**: The coroutine is finishing its work.
- **Completed**: The coroutine has finished its execution successfully.
- **Cancelling**: The coroutine is in the process of being cancelled.
- **Cancelled**: The coroutine has been cancelled and will not complete.

---

## Job Lifecycle Flow Diagram

To visualize the transitions between these states, consider the following flow diagram:

```
 wait children
 +-----+ start  +--------+ complete   +-------------+  finish  +-----------+
 | New | -----> | Active | --------> | Completing  | -------> | Completed |
 +-----+        +--------+            +-------------+          +-----------+
                   |  cancel / fail     |
                   |   +----------------+
                   |   |
                   V   V
             +------------+                           finish  +-----------+
             | Cancelling | --------------------------------> | Cancelled |
             +------------+                                   +-----------+

                      (Diagram from kotlinlang.org)
```

---

## State Transitions Explained

### 1. New

The New state is where a coroutine starts its lifecycle. A coroutine is created but not yet running.

::: tip Example

```kotlin
fun main() {
    val job = GlobalScope.launch {
        println("Coroutine is starting...")
    }
    println("Job state (New): ${job.isActive}")
}
//
// OUTPUT:
// Job state (New): false
```

:::

::: kotlin-playground 1. New

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() {
    val job = GlobalScope.launch {
        println("Coroutine is starting...")
    }
    println("Job state (New): ${job.isActive}")
}
```

:::

### 2. Active

When the coroutine begins its execution, it transitions to the Active state. In this state, the coroutine can perform its designated tasks.

::: tip Example

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        println("Coroutine is active now!")
        delay(1000) // Simulating work
    }
    
    println("Job state (Active): ${job.isActive}")
    job.join()
}
//
// OUTPUT:
// Coroutine is active now!
// Job state (Active): true
```

:::

::: kotlin-playground 2. Active

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        println("Coroutine is active now!")
        delay(1000) // Simulating work
    }
    
    println("Job state (Active): ${job.isActive}")
    job.join()
}
```

:::

### 3. Completing

As the coroutine finishes its tasks, it enters the Completing state. This state indicates that the coroutine is about to finish its execution.

::: tip Example

```kotlin
fun main() = runBlocking {
    val job = launch {
        println("Coroutine is working...")
        delay(1000) // Simulating work
        println("Coroutine is completing...")
    }
    // Register callback
    job.invokeOnCompletion { 
        println("Job completed: ${if (it == null) "successfully" else "failed or cancelled"}")
    }
    job.join()
}
//
// OUTPUT:
// Coroutine is working...
// Coroutine is completing...
// Job completed: successfully
```

:::

::: kotlin-playground 3. Completing

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        println("Coroutine is working...")
        delay(1000) // Simulating work
        println("Coroutine is completing...")
    }
    // Register callback
    job.invokeOnCompletion { 
        println("Job completed: ${if (it == null) "successfully" else "failed or cancelled"}")
    }
    job.join()
}
```

:::

### 4. Completed

Once the coroutine finishes its execution, it transitions to the Completed state. The coroutine has successfully executed its tasks.

::: tip Example

```kotlin
fun main() = runBlocking {
    val job = launch {
        println("Task started...")
        delay(1000) // Simulating work
    }
    
    job.join()
    println("Job state (Completed): ${job.isCompleted}") 
}
//
// OUTPUT:
// Task started...
// Job state (Completed): true
```

:::

::: kotlin-playground 4. Completed

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        println("Task started...")
        delay(1000) // Simulating work
    }
    
    job.join()
    println("Job state (Completed): ${job.isCompleted}") 
}
```

:::

### 5. Cancelling

If a coroutine is cancelled, it enters the Cancelling state. In this state, the coroutine is in the process of being stopped, and any ongoing work should be cleaned up.

::: tip Example

```kotlin
fun main() = runBlocking {
    val job = launch {
        try {
            repeat(5) { i ->
                println("Coroutine is working... $i")
                delay(500) // Simulating work
            }
        } finally {
            println("Coroutine is cancelled")
        }
    }
    // Register callback
    job.invokeOnCompletion { cause ->
        println("Job completed: ${if (cause == null) "successfully" else "failed or cancelled: ${cause.message}"}")
    }
    delay(1000) // Let the coroutine run for a bit
    println("Cancelling the coroutine...")
    job.cancel() // Cancelling the coroutine
    job.join() // Wait for the coroutine to ensure we see the invokeOnCompletion output
}
//
// OUTPUT:
// Coroutine is working... 0
// Coroutine is working... 1
// Cancelling the coroutine...
// Coroutine is cancelled
// Job completed: failed or cancelled: CancellationException
```

:::

::: kotlin-playground 5. Cancelling

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        try {
            repeat(5) { i ->
                println("Coroutine is working... $i")
                delay(500) // Simulating work
            }
        } finally {
            println("Coroutine is cancelled")
        }
    }
    // Register callback
    job.invokeOnCompletion { cause ->
        println("Job completed: ${if (cause == null) "successfully" else "failed or cancelled: ${cause.message}"}")
    }
    delay(1000) // Let the coroutine run for a bit
    println("Cancelling the coroutine...")
    job.cancel() // Cancelling the coroutine
    job.join() // Wait for the coroutine to ensure we see the invokeOnCompletion output
}
```

:::

### 6. Cancelled

After the cancellation is complete, the coroutine reaches the Cancelled state. At this point, the coroutine has stopped its execution and will not complete its tasks.

::: tip Example

```kotlin
fun main() = runBlocking {
    val job = launch {
        println("Starting coroutine...")
        delay(2000) // Simulating a long task
    }
    // Register callback
    job.invokeOnCompletion { 
        println("Job completed: ${if (it == null) "successfully" else "failed or cancelled"}")
    }
    delay(500) // Let it run for a bit
    job.cancel() // Cancelling the coroutine
    println("Job state (Cancelled): ${job.isCancelled}") // Should be true
    job.join() // Wait for the coroutine to ensure we see the invokeOnCompletion output
}
//
// OUTPUT:
// Starting coroutine...
// Job state (Cancelled): true
// Job completed: failed or cancelled: CancellationException
```

:::A CoroutineScope defines

::: kotlin-playground 6. Cancelled

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        println("Starting coroutine...")
        delay(2000) // Simulating a long task
    }
    // Register callback
    job.invokeOnCompletion { 
        println("Job completed: ${if (it == null) "successfully" else "failed or cancelled"}")
    }
    delay(500) // Let it run for a bit
    job.cancel() // Cancelling the coroutine
    println("Job state (Cancelled): ${job.isCancelled}") // Should be true
    job.join() // Wait for the coroutine to ensure we see the invokeOnCompletion output
}
```

:::

---

## Coroutine Scopes

A `CoroutineScope` defines the scope within which coroutines can be launched. It helps manage the lifecycle of coroutines and enforces structured concurrency. When a scope is cancelled, all coroutines launched within that scope are also cancelled. The most common coroutine scopes are:

- `GlobalScope`: Launches coroutines that live for the entire lifetime of the application.
- `CoroutineScope`: A user-defined scope that can be tied to specific components (like activities or fragments in Android).

---

## Dispatchers

Dispatchers define the thread or thread pool that the coroutine will run on. Common dispatchers include:

- `Dispatchers.Main`: Used for UI operations and runs on the main thread.
- `Dispatchers.IO`: Optimized for I/O operations, like network calls or reading files.
- `Dispatchers.Default`: Used for CPU-intensive tasks.

The choice of dispatcher affects how coroutines execute and interact with the rest of the application, impacting their lifecycle and performance.

---

## Handling Failures and Exceptions in Coroutines

Managing failures and exceptions is crucial for building robust applications. Coroutines provide structured mechanisms for handling exceptions that may arise during asynchronous operations. Here are some important concepts and practices for managing exceptions in coroutines:

### 1. Exception Propagation

By default, exceptions thrown in a coroutine are propagated to the parent coroutine. If a parent coroutine catches an exception, the child coroutine will be cancelled, and the exception will be passed up the coroutine hierarchy.

::: tip Example

```kotlin
fun main() = runBlocking {
    val parentJob = launch {
        try {
            launch {
                throw Exception("Child coroutine failed")
            }
        } catch (e: Exception) {
            println("Caught exception in parent: ${e.message}")
        }
    }
    parentJob.join()
}
//
// OUTPUT:
// Caught exception in parent: Child coroutine failed
```

:::

::: kotlin-playground 1. Exception Propagation

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val parentJob = launch {
        try {
            launch {
                throw Exception("Child coroutine failed")
            }
        } catch (e: Exception) {
            println("Caught exception in parent: ${e.message}")
        }
    }
    parentJob.join()
}
```

:::

### 2. Using`supervisorScope`

When using`supervisorScope`, you can handle failures of child coroutines independently. If one child coroutine fails, it does not cancel the other child coroutines or the parent coroutine.

::: tip Example

```kotlin
fun main() = runBlocking {
    supervisorScope {
        val child1 = launch {
            println("Child 1 started")
            delay(1000)
            println("Child 1 completed")
        }
        val child2 = launch {
            println("Child 2 started")
            throw Exception("Child 2 failed")
        }
        val child3 = launch {
            println("Child 3 started")
            delay(1000)
            println("Child 3 completed")
        }
    }
    println("Parent coroutine continues...")
}
//
// OUTPUT:
// Child 1 started
// Child 2 started
// Child 3 started
// Child 1 completed
// Child 3 completed
// Parent coroutine continues...
```

:::

::: kotlin-playground 2. UsingsupervisorScope

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    supervisorScope {
        val child1 = launch {
            println("Child 1 started")
            delay(1000)
            println("Child 1 completed")
        }
        val child2 = launch {
            println("Child 2 started")
            throw Exception("Child 2 failed")
        }
        val child3 = launch {
            println("Child 3 started")
            delay(1000)
            println("Child 3 completed")
        }
    }
    println("Parent coroutine continues...")
}
```

:::

### 3.`CoroutineExceptionHandler`

You can use`CoroutineExceptionHandler`to handle uncaught exceptions at the coroutine level. This handler can be passed as part of the coroutine context to manage exceptions that are not caught within the coroutine.

::: tip Example

```kotlin
fun main() = runBlocking {
    val exceptionHandler = CoroutineExceptionHandler { _, exception ->
        println("Caught exception: ${exception.message}")
    }

    val job = launch(exceptionHandler) {
        throw Exception("Coroutine failed")
    }
    job.join()
}
//
// OUTPUT:
// Caught exception: Coroutine failed
```

:::

::: kotlin-playground 3.CoroutineExceptionHandler

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val exceptionHandler = CoroutineExceptionHandler { _, exception ->
        println("Caught exception: ${exception.message}")
    }

    val job = launch(exceptionHandler) {
        throw Exception("Coroutine failed")
    }
    job.join()
}
```

:::

### 4. Cleaning Up Resources

When a coroutine fails or is cancelled, it is important to clean up any resources (like closing files or releasing locks). Use the`finally`block to ensure that cleanup code runs regardless of whether an exception occurs.

::: tip Example

```kotlin
fun main() = runBlocking {
    val job = launch {
        try {
            println("Coroutine started...")
            delay(1000)
            throw Exception("Something went wrong")
        } finally {
            println("Cleaning up resources...")
        }
    }
    job.join() // Wait for the coroutine to finish
}
//
// OUTPUT:
// Coroutine started...
// Cleaning up resources...
```

:::

::: kotlin-playground 4. Cleaning Up Resources

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        try {
            println("Coroutine started...")
            delay(1000)
            throw Exception("Something went wrong")
        } finally {
            println("Cleaning up resources...")
        }
    }
    job.join() // Wait for the coroutine to finish
}
```

:::

---

## Effects of Launching Nested Coroutines

Nested coroutines can affect the lifecycle and behavior of parent coroutines, especially in terms of cancellation and completion. When you launch a coroutine inside another coroutine (nested coroutine), it inherits the lifecycle of its parent. This means that if the parent coroutine is cancelled, the nested coroutine will also be cancelled unless it is launched in a different context or scope.

### Example of Nested Coroutines

```kotlin
fun main() = runBlocking {
    val parentJob = launch {
        println("Parent coroutine started on ${Thread.currentThread().name}")
        val childJob = launch(Dispatchers.Default) {
            println("Child coroutine started on ${Thread.currentThread().name}")
            delay(2000) // Simulating work
            println("Child coroutine completed")
        }
        delay(1000) // Let the child coroutine run for a bit
        println("Cancelling the parent coroutine...")
        cancel() // Cancelling the parent coroutine
    }
    // Register callback
    parentJob.invokeOnCompletion { cause ->
        println("Parent job completed: ${if (cause == null) "successfully" else "failed or cancelled: ${cause.message}"}")
    }
    parentJob.join() // Wait for the parent coroutine to finish
}
//
// OUTPUT:
// Parent coroutine started on main
// Child coroutine started on DefaultDispatcher-worker-1
// Cancelling the parent coroutine...
// Parent job completed: failed or cancelled: CancellationException
```

:::

::: kotlin-playground Example of Nested Coroutines

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val parentJob = launch {
        println("Parent coroutine started on ${Thread.currentThread().name}")
        val childJob = launch(Dispatchers.Default) {
            println("Child coroutine started on ${Thread.currentThread().name}")
            delay(2000) // Simulating work
            println("Child coroutine completed")
        }
        delay(1000) // Let the child coroutine run for a bit
        println("Cancelling the parent coroutine...")
        cancel() // Cancelling the parent coroutine
    }
    // Register callback
    parentJob.invokeOnCompletion { cause ->
        println("Parent job completed: ${if (cause == null) "successfully" else "failed or cancelled: ${cause.message}"}")
    }
    parentJob.join() // Wait for the parent coroutine to finish
}
```

:::

In this example, when the parent coroutine is cancelled, the child coroutine is also cancelled, demonstrating the inherited lifecycle behavior of nested coroutines.

### Does a Job Go into Completed State After Cancelling?

Yes, a Job transitions to the Completed state after being cancelled. Here’s how you can verify that:

```kotlin
fun main() = runBlocking {
    val job = launch {
        println("Coroutine is working...")
        delay(1000) // Simulating work
    }
    job.cancel()
    job.join() 
    println("Job completed state: ${job.isCompleted}")
}
//
// OUTPUT:
// Coroutine is working...
// Job completed state: true
```

::: kotlin-playground Does a Job Go into Completed State After Cancelling?

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        println("Coroutine is working...")
        delay(1000) // Simulating work
    }
    job.cancel()
    job.join() 
    println("Job completed state: ${job.isCompleted}")
}
```

:::

---

## Best Practices and Suggestions

### 1. Use Structured Concurrency

Always launch coroutines within a specific scope, ensuring that they are tied to the lifecycle of the component that creates them. This prevents memory leaks and ensures proper cancellation.

### 2. Prefer CoroutineScope Over GlobalScope

Use`CoroutineScope`for managing coroutines tied to specific components (e.g., activities, fragments) instead of`GlobalScope`, which can lead to uncontrolled coroutine lifetimes.

### 3. Handle Exceptions

Implement exception handling within coroutines to manage failures gracefully. Use`try-catch`blocks or coroutine exception handlers to catch and handle exceptions effectively.

### 4. Use SupervisorScope When Necessary

When dealing with nested coroutines, consider using`supervisorScope`to prevent failures in one child coroutine from affecting others.

### 5. Monitor Coroutine States

Utilize`invokeOnCompletion`and check the states of jobs to manage the lifecycle and handle any necessary cleanup or state checks.

### 6. Avoid Blocking Calls

Make sure not to block the coroutine dispatcher with long-running tasks. Use`withContext`to switch contexts if needed.

---

## Conclusion

Understanding the lifecycle of coroutines, including the effects of nested coroutines and the role of`supervisorScope`, is essential for writing robust asynchronous code in Kotlin. By managing parent-child relationships and handling cancellations and failures effectively, you can create efficient and reliable applications.

Whether you’re using`invokeOnCompletion`for cleanup, managing nested coroutines, or utilizing structured concurrency, Kotlin’s coroutines provide powerful tools for handling concurrency with ease.

That’s it for this blog. Let’s connect on[**LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`raystatic`)**](https://linkedin.com/in/raystatic/)and[**X (<VPIcon icon="fa-brands fa-x-twitter"/>`raystatic_`)**](https://x.com/raystatic_)

::: info

This article is previously published on [<VPIcon icon="fa-brands fa-medium"/>proandroiddev.com](https://proandroiddev.com/understanding-the-coroutine-lifecycle-in-kotlin-378d619908ac)

<SiteInfo
  name="Understanding the Coroutine Lifecycle in Kotlin"
  desc="Kotlin’s coroutines offer a powerful way to manage concurrency and asynchronous programming. However, to use them effectively, it’s crucial…"
  url="https://proandroiddev.com/understanding-the-coroutine-lifecycle-in-kotlin-378d619908ac/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*sdb3Y6ckQGLcuekR8RD4Ew.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding the Coroutine Lifecycle in Kotlin",
  "desc": "Kotlin’s coroutines offer a powerful way to manage concurrency and asynchronous programming. However, to use them effectively, it’s crucial to understand the lifecycle of a coroutine. In this blog post, we’ll explore the coroutine lifecycle, focusing on the states of a coroutine’s Job, how they transition between states, and practical examples to illustrate each state, including the effects of launching nested coroutines. Additionally, we’ll discuss best practices and modifications.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/understanding-the-coroutine-lifecycle-in-kotlin.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
