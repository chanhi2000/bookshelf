---
lang: en-US
title: "Exploring Kotlin Coroutines through Output Questions"
description: "Article(s) > Exploring Kotlin Coroutines through Output Questions"
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
      content: "Article(s) > Exploring Kotlin Coroutines through Output Questions"
    - property: og:description
      content: "Exploring Kotlin Coroutines through Output Questions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/exploring-kotlin-coroutines-through-output-questions.html
prev: /programming/java/articles/README.md
date: 2024-11-27
isOriginal: false
author: Tanya Arora
cover: https://droidcon.com/wp-content/uploads/2024/11/1_qgzGgrMeE9raugNDYbsfVQ.webp
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
  name="Exploring Kotlin Coroutines through Output Questions"
  desc="In this unique blog, we delve into the world of Kotlin coroutines through a series of output questions. Each question presents a distinct scenario, allowing us to understand and reinforce our knowledge of coroutine concepts. By exploring and analyzing the outputs, we gain a deeper understanding of the behavior and intricacies of Kotlin coroutines. Join me on this journey as we unravel the power of coroutines in Kotlin and enhance our proficiency in concurrent programming."
  url="https://droidcon.com/exploring-kotlin-coroutines-through-output-questions"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_qgzGgrMeE9raugNDYbsfVQ.webp"/>

In this unique blog, we delve into the world of Kotlin coroutines through a series of output questions. Each question presents a distinct scenario, allowing us to understand and reinforce our knowledge of coroutine concepts. By exploring and analyzing the outputs, we gain a deeper understanding of the behavior and intricacies of Kotlin coroutines. Join me on this journey as we unravel the power of coroutines in Kotlin and enhance our proficiency in concurrent programming.

I’ll be using the following two suspend functions in the questions

```kotlin
suspend fun doLongRunningTaskOne(): Int {
    delay(2400)
    println("Task one is getting executed")
    return 33
}

suspend fun doLongRunningTaskTwo(): Int {
    delay(1500)
    println("Task two is getting executed")
    return 6
}
```

Let’s jump right in now:

---

## Question 1

```kotlin
fun main() {
  runBlocking {
    doLongRunningTaskOne()
    doLongRunningTaskTwo()
    println("Fired both tasks")
  }
  println("Completed my execution")
}
// 
/* Output */
//
// Task one is getting executed
// Task two is getting executed
// Fired both tasks
// Completed my execution
```

::: tip Explanation

- `runBlocking` gives us a coroutine scope on main thread
- It is a blocking call which means until the code inside `runBlocking` is completed, the next statements will not be executed
- By default, the code inside a coroutine is sequential
- So first the task one gets completed, then the second task is called, and when that gets completed, the last print statement is executed

:::

---

## Question 2

```kotlin
runBlocking {
  launch { doLongRunningTaskOne() }
  launch { doLongRunningTaskTwo() }
  println("I've launched both coroutines")
}
println("Completed my execution")
// 
/* Output */
// 
// I've launched both coroutines
// Task two is getting executed
// Task one is getting executed
// Completed my execution
```

I've launched both coroutines Task two is getting executed Task one is getting executed Completed my execution

I've launched both coroutines
Task two is getting executed
Task one is getting executed
Completed my execution

::: tip Explanation

- `launch` is fire and forget, it doesn’t care about the result returned by the tasks. So both the child coroutines (`launch`) start executing on different threads and don’t block our main thread
- Since they will take some time to run, the first statement printed is “I’ve launched both coroutines”
- Task two is executed faster as it has shorted delay in it that’s why the next statement printed is from task 2
- Then the print statement in task one is printed
- Lastly, since runBlocking is a blocking call, no code is executed outside it until it’s execution is completed. So once it is completed, the last “Completed my execution” statement is printed

:::

---

## Question 3

```kotlin
runBlocking {
  coroutineScope {
    launch { doLongRunningTaskOne() }
    launch { doLongRunningTaskTwo() }
    println("I've launched both coroutines")
  }
  println("I'm outside coroutineScope")
}
println("Completed my execution")
//
/* Output */
// 
// I've launched both coroutines
// Task two is getting executed
// Task one is getting executed
// I'm outside coroutineScope
// Completed my execution
```

::: tip Explanation

- What’s changed here is that we have added a coroutineScope inside runBlocking and both the launch methods are called inside it
- coroutineScope is a suspending function so the “I’m outside coroutineScope” statement will be printed after the coroutineScope has completed it’s execution

:::

---

## Question 4

```kotlin
runBlocking {
  coroutineScope {
    launch { doLongRunningTaskOne() }.join()
    launch { doLongRunningTaskTwo() }.join()
    println("I've launched both coroutines")
  }
  println("I'm outside coroutineScope")
}
println("Completed my execution")
//
/* Output */
//
// Task one is getting executed
// Task two is getting executed
// I've launched both coroutines
// I'm outside coroutineScope
// Completed my execution
```

::: tip Explanation

- Here we have added `join()` on the two launch functions
- join is a suspending function, it waits for the coroutine to complete before moving to the next statement
- That is why the task one statement is printed first this time
- This code will take more time to execute because we have made the calls sequential here

:::

---

## Question 5

```kotlin
runBlocking {
  CoroutineScope(Dispatchers.IO).launch {
    launch { doLongRunningTaskOne() }
    launch { doLongRunningTaskTwo() }
    println("I've launched both coroutines")
  }
  println("I'm outside coroutineScope")
}
println("Completed my execution")
//
/* Output */
//
// I'm outside coroutineScope
// Completed my execution
```

::: tip Explanation

- None of the code inside the custom coroutine scope got executed
- The runBlocking scope finished even before the CoroutineScope could get finished
- This is because the runBlocking function is intended to block the current thread until it’s scope completed.
- However, any nested coroutines scopes launched within it will not be awaited unless explicitly done so

:::

---

## Question 6

```kotlin
runBlocking {
  CoroutineScope(Dispatchers.IO).launch {
    launch { doLongRunningTaskOne() }
    launch { doLongRunningTaskTwo() }
    println("I've launched both coroutines")
  }.join()
  println("I'm outside coroutineScope")
}
println("Completed my execution")
//
/* Output */
//
// I've launched both coroutines
// Task two is getting executed
// Task one is getting executed
// I'm outside coroutineScope
// Completed my execution
```

::: tip Explanation

- This time the block of code inside the custom Coroutine scope gets executed because we added join to add
- Join is a suspend function which asks the system to wait until it’s execution is completed

:::

---

## Question 7

```kotlin
runBlocking {
  CoroutineScope(Dispatchers.IO).launch {
    launch { doLongRunningTaskOne() }
    launch { doLongRunningTaskTwo() }
    println("I've launched both coroutines of scope 1")

    CoroutineScope(Dispatchers.IO).launch {
      launch { doLongRunningTaskOne() }
      launch { doLongRunningTaskTwo() }
      println("I've launched both coroutines of scope 2")
    }
  }.join()
  println("I'm outside coroutineScope")
}
println("Completed my execution")
//
/* Output */
//
// I've launched both coroutines of scope 1
// I've launched both coroutines of scope 2
// Task two is getting executed
// Task two is getting executed
// Task one is getting executed
// Task one is getting executed
// I'm outside coroutineScope
// Completed my execution
```

::: tip Explanation

- Here we didn’t add join to the second nested coroutine scope but still it got executed

:::

---

## Question 8

```kotlin
runBlocking {
  val one = async { doSomethingUsefulOne() }
  val two = async { doSomethingUsefulTwo() }
  println("Final answer is ${one.await() + two.await()}")
}
println("Completed my execution")
//
/* Output */
//
// Final answer is 39
// Completed my execution
```

::: tip Explanation

- Here we are using the result returned by our two suspend functions
- Both the suspend functions are called parallelly
- await is a suspend functions which blocks the main thread. It gets the result from the Deferred object

:::

---

## Question 9

```kotlin
runBlocking {
  val one = async(start = CoroutineStart.LAZY) { doSomethingUsefulOne() }
  val two = async(start = CoroutineStart.LAZY) { doSomethingUsefulTwo() }
  println("Final answer is ${one.await() + two.await()}")
}
println("Completed my execution")
//
/* Output */
//
// Final answer is 39
// Completed my execution
```

::: tip Explanation

- This code is executed sequentially because we used Lazy start for our coroutines
- What Lazy does is it starts the coroutine only when it’s result is required
- So when we write our print statement, we called one.await first so the system waits until it gets the result for the first task which would be after around 2400 ms
- Once it gets result of first task, then it starts second task and get’s it’s result after another 1500 ms
- So this block of code will take more time as compared to our last code(Question 6) because of sequential calls

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Exploring Kotlin Coroutines through Output Questions",
  "desc": "In this unique blog, we delve into the world of Kotlin coroutines through a series of output questions. Each question presents a distinct scenario, allowing us to understand and reinforce our knowledge of coroutine concepts. By exploring and analyzing the outputs, we gain a deeper understanding of the behavior and intricacies of Kotlin coroutines. Join me on this journey as we unravel the power of coroutines in Kotlin and enhance our proficiency in concurrent programming.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/exploring-kotlin-coroutines-through-output-questions.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
