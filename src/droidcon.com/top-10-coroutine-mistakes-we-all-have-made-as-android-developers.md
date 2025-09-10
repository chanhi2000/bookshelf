---
lang: en-US
title: "Top 10 Coroutine Mistakes We All Have Made as Android Developers"
description: "Article(s) > Top 10 Coroutine Mistakes We All Have Made as Android Developers"
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
      content: "Article(s) > Top 10 Coroutine Mistakes We All Have Made as Android Developers"
    - property: og:description
      content: "Top 10 Coroutine Mistakes We All Have Made as Android Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/top-10-coroutine-mistakes-we-all-have-made-as-android-developers.html
prev: /programming/java-android/articles/README.md
date: 2024-11-22
isOriginal: false
author: Dobri Kostadinov
cover: https://droidcon.com/wp-content/uploads/2024/11/1_Bhfzsp01NibPkNYmWy9YyA.webp
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
  name="Top 10 Coroutine Mistakes We All Have Made as Android Developers"
  desc="As Android developers, Kotlin coroutines have become an indispensable tool in our asynchronous programming toolkit. They simplify concurrent tasks, make code more readable, and help us avoid the callback hell that was prevalent with earlier approaches. However, coroutines come with their own set of challenges, and it’s easy to fall into common pitfalls that can lead to bugs, crashes, or suboptimal performance."
  url="https://droidcon.com/top-10-coroutine-mistakes-we-all-have-made-as-android-developers"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_Bhfzsp01NibPkNYmWy9YyA.webp"/>

## Introduction

As Android developers, Kotlin coroutines have become an indispensable tool in our asynchronous programming toolkit. They simplify concurrent tasks, make code more readable, and help us avoid the callback hell that was prevalent with earlier approaches. However, coroutines come with their own set of challenges, and it’s easy to fall into common pitfalls that can lead to bugs, crashes, or suboptimal performance.

In this article, we’ll explore the top 10 coroutine mistakes that many of us have made (often unknowingly) and provide guidance on how to avoid them. Whether you’re a seasoned developer or just starting with coroutines, this guide aims to enhance your understanding and help you write more robust asynchronous code.

---

## 1. Blocking the Main Thread

::: tabs

@tab:active The Mistake

Running long-running or blocking tasks on the`Main`dispatcher, which can freeze the UI and lead to Application Not Responding (ANR) errors.

@tab Why It Happens

It’s easy to forget which dispatcher is being used, especially in complex codebases. Developers might launch a coroutine without specifying a dispatcher, inadvertently using the`Main`dispatcher by default.

@tab How to Avoid It

Always specify the appropriate dispatcher for your coroutine:

:::

::: tip Example

```kotlin
// Wrong
GlobalScope.launch {
    // Long-running task
}

// Correct
GlobalScope.launch(Dispatchers.IO) {
    // Long-running task
}
```

Use`Dispatchers.IO`for I/O operations and`Dispatchers.Default`for CPU-intensive tasks. Reserve`Dispatchers.Main`for updating the UI.

:::

---

## 2. Ignoring Coroutine Scope Hierarchy

::: tabs

@tab:active The Mistake

Not properly structuring coroutine scopes, leading to unmanaged coroutines that outlive their intended lifecycle, causing memory leaks or crashes.

@tab Why It Happens

Using`GlobalScope`indiscriminately or failing to cancel coroutines when a component is destroyed.

@tab How to Avoid It

Use structured concurrency by tying coroutines to a specific lifecycle:

- In activities or fragments, use`lifecycleScope`or`viewLifecycleOwner.lifecycleScope`.
- In ViewModels, use`viewModelScope`.

:::

::: tip Example

```kotlin
// In a ViewModel
viewModelScope.launch {
    // Coroutine work
}
```

This ensures that coroutines are cancelled appropriately when the associated lifecycle is destroyed.

:::

---

## 3. Mishandling Exception Propagation

::: tabs

@tab:active The Mistake

Failing to handle exceptions within coroutines properly, which can cause unexpected crashes or silent failures.

@tab Why It Happens

Assuming that`try-catch`blocks will work the same way inside coroutines or not understanding how exceptions propagate in coroutine hierarchies.

@tab How to Avoid It

- Use`try-catch`within the coroutine to handle exceptions. Be cautious to check for`CancellationException`, as it’s used to signal coroutine cancellation, and should typically be rethrown to allow the coroutine to cancel properly.
- For structured concurrency, exceptions in child coroutines are propagated to the parent.

:::

::: tip Example

```kotlin
viewModelScope.launch {
    try {
        // Suspended function that might throw an exception
    } catch (e: Exception) {
        if (e !is CancellationException) {
            // Handle exception
        } else {
            throw e // Rethrow to respect cancellation
        }
    }
}
```

Alternatively, use a`CoroutineExceptionHandler`for unhandled exceptions:

```kotlin
val exceptionHandler = CoroutineExceptionHandler { \_, throwable ->
    if (throwable !is CancellationException) {
        // Handle unhandled exception
    }
}

viewModelScope.launch(exceptionHandler) {
    // Suspended function that might throw an exception
}
```

:::

---

## 4. Using the Wrong Coroutine Builder

::: tabs

@tab:active The Mistake

Confusing`launch`and`async`builders, leading to unintended behavior, such as missing results or unnecessary concurrency.

@tab Why It Happens

Misunderstanding the difference between`launch`(which returns`Job`) and`async`(which returns`Deferred`and is meant for obtaining a result).

@tab How to Avoid It

- Use`launch`when you don’t need a result and want to fire off a coroutine.
- Use`async`when you need to compute a value asynchronously.

:::

::: tip Example

```kotiln
// Using async when you need a result
val deferredResult = async {
    computeValue()
}
val result = deferredResult.await()
```

:::

---

## 5. Overusing GlobalScope

::: tabs

@tab:active The Mistake

Relying on`GlobalScope`for launching coroutines, which can lead to coroutines that run longer than needed and are difficult to manage.

@tab Why It Happens

Forgetting to consider the coroutine’s lifecycle or for the sake of simplicity in examples and tutorials.

@tab How to Avoid It

Avoid`GlobalScope`unless absolutely necessary. Instead, use structured concurrency with appropriate scopes:

- `lifecycleScope`for UI-related components.
- `viewModelScope`for ViewModels.
- Custom`CoroutineScope`with proper cancellation.

:::

---

## 6. Not Considering Thread Safety

::: tabs

@tab:active The Mistake

Accessing or modifying shared mutable data from multiple coroutines without proper synchronization, leading to race conditions.

@tab Why It Happens

Assuming that coroutines handle threading for you and neglecting the need for thread safety in shared resources.

@tab How to Avoid It

- Use thread-safe data structures.
- Synchronize access with`Mutex`or`Atomic`classes.
- Confine mutable state to specific threads or coroutines.

:::

::: tip Example using`Mutex`

```kotlin
val mutex = Mutex()
var sharedResource = 0

coroutineScope.launch {
    mutex.withLock {
        sharedResource++
    }
}
```

:::

---

## 7. Forgetting to Cancel Coroutines

::: tabs

@tab:active The Mistake

Not cancelling coroutines when they’re no longer needed, which can waste resources or cause unintended side effects.

@tab Why It Happens

Overlooking cancellation logic or not handling it properly in custom scopes.

@tab How to Avoid It

- Use structured concurrency so that coroutines are cancelled automatically.
- When using custom scopes, ensure that you cancel them at the appropriate time.

:::

::: tip Example

```kotlin
val job = CoroutineScope(Dispatchers.IO).launch {
    // Work
}

// Cancel when done
job.cancel()
```

:::

---

## 8. Blocking Inside Coroutines

::: tabs

@tab:active The Mistake

Using blocking calls like`Thread.sleep()`or heavy computations inside coroutines without switching to an appropriate dispatcher, which can block the underlying thread.

@tab Why It Happens

Misunderstanding that coroutines are lightweight threads and thinking that blocking operations are safe within them.

@tab How to Avoid It

- Avoid blocking calls inside coroutines.
- Use suspend functions like`delay()`instead of`Thread.sleep()`.
- Offload heavy computations to`Dispatchers.Default`.

:::

::: tip Example

```kotlin
// Wrong
launch(Dispatchers.IO) {
    Thread.sleep(1000)
}

// Correct
launch(Dispatchers.IO) {
    delay(1000)
}
```

:::

---

## 9. Misusing`withContext`

::: tabs

@tab:active The Mistake

Using`withContext`incorrectly, such as nesting it unnecessarily or misunderstanding its purpose, leading to code that’s hard to read or inefficient.

@tab Why It Happens

Confusion about context switching and the scope of`withContext`.

@tab How to Avoid It

- Use`withContext`to switch the context for a specific block of code.
- Don’t nest`withContext`calls without need.
- Keep`withContext`blocks as small as possible.

:::

::: tip Example

```kotlin
// Correct usage
val result = withContext(Dispatchers.IO) {
    // Perform I/O operation
}
```

:::

---

## 10. Not Testing Coroutines Properly

::: tabs

@tab:active The Mistake

Neglecting to write proper tests for coroutine-based code, or writing tests that don’t handle coroutines correctly, leading to flaky or unreliable tests.

@tab Why It Happens

Testing asynchronous code is more complex, and developers might not be familiar with the testing tools available for coroutines.

@tab How to Avoid It

- Use`runBlockingTest`or`runTest`from`kotlinx-coroutines-test`for unit testing coroutines.
- Leverage`TestCoroutineDispatcher`and`TestCoroutineScope`to control coroutine execution in tests.
- Ensure that you advance time properly when testing code with delays or timeouts.

:::

::: tip Example

```kotlin
@Test
fun testCoroutine() = runTest {
    val result = mySuspendingFunction()
    assertEquals(expectedResult, result)
}
```

---

## Conclusion

Coroutines are powerful, but with great power comes great responsibility. By being aware of these common mistakes and understanding how to avoid them, you can write more efficient, reliable, and maintainable asynchronous code in your Android applications.

Remember:

- Always choose the correct dispatcher.
- Tie your coroutines to the appropriate lifecycle.
- Handle exceptions thoughtfully.
- Be mindful of coroutine scopes and cancellation.
- Test your coroutine code thoroughly.

By following these best practices, you’ll harness the full potential of Kotlin coroutines and provide a smoother, more responsive experience for your app users.

::: info Dobri Kostadinov

Android Consultant | Trainer  

[<VPIcon icon="fas fa-envelope"/>Email me](mailto:dobri.kostadinov@gmail.com)|[Follow me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`dobrikostadinov`)](https://linkedin.com/in/dobrikostadinov/)|[Follow me on Medium (<VPIcon icon="fa-brands fa-medium"/>`dobri.kostadinov`)](https://medium.com/@dobri.kostadinov)|[Buy me a coffee](https://buymeacoffee.com/dobri.kostadinov)

:::

::: info

This article is previously published on [<VPIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/top-10-coroutine-mistakes-we-all-have-made-as-android-developers-187d5e14d212)

<SiteInfo
  name="Top 10 Coroutine Mistakes We All Have Made as Android Developers"
  desc="Understanding and Avoiding Common Pitfalls in Asynchronous Programming with Kotlin Coroutines"
  url="https://proandroiddev.com/top-10-coroutine-mistakes-we-all-have-made-as-android-developers-187d5e14d212/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1024/1*Bhfzsp01NibPkNYmWy9YyA.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Top 10 Coroutine Mistakes We All Have Made as Android Developers",
  "desc": "As Android developers, Kotlin coroutines have become an indispensable tool in our asynchronous programming toolkit. They simplify concurrent tasks, make code more readable, and help us avoid the callback hell that was prevalent with earlier approaches. However, coroutines come with their own set of challenges, and it’s easy to fall into common pitfalls that can lead to bugs, crashes, or suboptimal performance.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/top-10-coroutine-mistakes-we-all-have-made-as-android-developers.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
