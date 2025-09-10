---
lang: en-US
title: "Is reflection slowing down your code?"
description: "Article(s) > Is reflection slowing down your code?"
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
      content: "Article(s) > Is reflection slowing down your code?"
    - property: og:description
      content: "Is reflection slowing down your code?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/benchmark-reflection.html
prev: /programming/java/articles/README.md
date: 2024-12-16
isOriginal: false
author: 
  - name: Marcin Moskała
    url: https://kt.academy/user/marcinmoskala
cover: https://marcinmoskala.com/kt-academy-articles/promotion/benchmark-reflection.jpg
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
  name="Is reflection slowing down your code?"
  desc="Let's benchmark reflection and see how it affects the performance of your code."
  url="https://kt.academy/article/benchmark-reflection"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/benchmark-reflection.jpg"/>

Being a youngster programmer, I was always told that reflection is slow and should be avoided, but I just couldn't observe this slowness in any real measures. That is why I decided to make some benchmarks to see how reflection really performs, and as it turns out, it is only slow when we compare it to regular calls, that are extremely fast. If we compare it to other popular operations, like logging or synchronization, it is not that slow. Let me show you some benchmarks (complete code is available [here (<VPIcon icon="iconfont icon-github"/>`MarcinMoskala/coroutines-benchmarks`)](https://github.com/MarcinMoskala/coroutines-benchmarks/blob/master/src/jmh/java/me/champeau/jmh/ReflectionBenchmark.kt))

<SiteInfo
  name="MarcinMoskala/coroutines-benchmarks"
  desc="coroutines-benchmarks/src/jmh/java/me/champeau/jmh/ReflectionBenchmark.kt at master"
  url="https://github.com/MarcinMoskala/coroutines-benchmarks/blob/master/src/jmh/java/me/champeau/jmh/ReflectionBenchmark.kt/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b19f9935ff76db25bb5f44abc915354c3bea6bbc45f5f5a2871f844c457e989b/MarcinMoskala/coroutines-benchmarks"/>

---

## TL;DR

Function call using reflection is much slower than a regular function call, but it is not that slow when compared to other popular operations. It has a comparable cost to synchronization, and it is much faster than logging. The below table presents a rough estimation of the cost of different operations:

| Operation | Rounded cost $ns$ |
| :--- | :--- |
| Function call | 0.1 |
| Operating on a nullable value | 1 |
| Suspending function call | 1 |
| Synchronization | 10 |
| Function call with reflection | 10 |
| Printing / Logging | 10,000 |
| Making network request | 100,000,000 |

---

## Introduction

Before we start, let me introduce you a simple counter, whose methods we will call in the benchmarks:

```kotlin
@State(Scope.Thread)
open class Counter {
  var value = 0
 
  @CompilerControl(CompilerControl.Mode.DONT_INLINE)
  fun increment() = value++

  @CompilerControl(CompilerControl.Mode.DONT_INLINE)
  fun decrement() = value--

  @CompilerControl(CompilerControl.Mode.DONT_INLINE)
  fun get() = value
}
```

I will call its methods in the bundle: increment, decrement, increment, get. I will do it in a loop of 1,000,000 iterations. I will compare the performance of regular calls, Java reflection calls, and Kotlin reflection calls. Then I will compare it to other popular operations.

---

## Simple calls performance

First, can call counter using a regular calls 1,000,000 times. Benchmark told me it takes 0.5 ms, so 0.1 ns per function call. This result seems legit. I was though at my university that calling a function takes around 5-10 ns, but since then computers got faster, modern research shows that a function call can take between 0.1 and 1 ns, so 0.1 ns seems possible.

```kotlin
// Takes 0.5 ms
@Benchmark
fun regularCall(bh: Blackhole, counter: Counter) {
  repeat(1_000_000) {
    counter.increment()
    counter.decrement()
    counter.increment()
    counter.get()
  }
  bh.consume(counter)
}
```

---

## Reflection performance

Now compare it to reflection. I will start with the simple function reference call, although it is not fair because Kotlin compiler optimizes out this particular kind of calls. It takes 0.6 ms, so it is as fast as regular calls. Such calls are popular alternatives to lambda expressions, and in such cases, they do not introduce any overhead.

```kotlin
// Takes 0.6 ms
@Benchmark
fun simpleKotlinReflectionCall(bh: Blackhole, counter: Counter) {
  repeat(1_000_000) {
    (Counter::increment)(counter)
    (Counter::decrement)(counter)
    (Counter::increment)(counter)
    (Counter::get)(counter)
  }
  bh.consume(counter)
}
```

Ok, let's move to some real reflection, and here we need to make a decision if we use Kotlin of Java reflection. Java reflection is slightly faster, as it requires no additional wrappers, so getting methods and calling it 100,000 times takes 111 ms (28 ns per call). The same operation with Kotlin reflection takes 166 ms (41 ns per call).

```kotlin
// Takes 111 ms/op
@Benchmark
fun javaReflectionCall(bh: Blackhole, counter: Counter) {
  val increment = Counter::class.java.getDeclaredMethod("increment")
  val decrement = Counter::class.java.getDeclaredMethod("decrement")
  val get = Counter::class.java.getDeclaredMethod("get")
  repeat(1_000_000) {
    increment.invoke(counter)
    decrement.invoke(counter)
    increment.invoke(counter)
    get.invoke(counter)
  }
  bh.consume(counter)
}

// Takes 166 ms/op
@Benchmark
fun kotlinReflectionCall(bh: Blackhole, counter: Counter) {
  val increment = Counter::class.members.first { it.name == "increment" }
  val decrement = Counter::class.members.first { it.name == "decrement" }
  val get = Counter::class.members.first { it.name == "get" }
  repeat(1_000_000) {
    increment.call(counter)
    decrement.call(counter)
    increment.call(counter)
    get.call(counter)
  }
  bh.consume(counter)
}
```

Those are cases where finding methods happens only once, and we call them many times. If we need to find methods every time we call them, it will be much slower. To be fair, most libraries optimize reflection use by caching methods, so that is the above case, but we should also see what the consequences of not doing it are. Using reflection, where finding methods happens every time we call them, takes 168.9 ms.

```kotlin
// Takes 168.951 ± 0.618  ms/op
@Benchmark
fun kotlinReflectionCallWithFinding(bh: Blackhole, counter: Counter) {
  repeat(1_000_000) {
    Counter::class.members.first { it.name == "increment" }.call(counter)
    Counter::class.members.first { it.name == "decrement" }.call(counter)
    Counter::class.members.first { it.name == "increment" }.call(counter)
    Counter::class.members.first { it.name == "get" }.call(counter)
  }
  bh.consume(counter)
}
```

We can see that reflection is much slower than making a regular call, say a hundred times smaller, but how does it compare to other operations? Let's check some other popular operations.

---

## Nullability

Let's start with something simple, like making our value nullable. Such a simple change requires a couple of additional operations: a wrapped integer must be created, add some nullability checks, and so on. Just this simple change makes our operations take 14 ms, which is an order of magnitude faster than reflection, but still much slower than regular calls.

```kotlin
// Takes 14 ms/op
@Benchmark
fun nullableValueIncrement(bh: Blackhole, counter: Counter) {
  var counter: Int? = 0
  repeat(1_000_000) {
    counter = counter?.inc()
    counter = counter?.dec()
    counter = counter?.inc()
    counter // This is optimized out, but it does influence conclusions
  }
  bh.consume(counter)
}
```

---

## Synchronization

ReflectionBenchmark.suspendingCounterCall avgt 5 13.037 ± 2.720 ms/op

How about synchronization? There are a few ways how we can synchronize our counter. The simplest one is using an atomic integer. That small change makes our operations take 50 ms. It is the same order of magnitude as reflection.

```kotlin
// Takes 50 ms/op
@Benchmark
fun atomicCounterCall(bh: Blackhole, counter: AtomicCounter) {
  repeat(1_000_000) {
    counter.increment()
    counter.decrement()
    counter.increment()
    counter.get()
  }
  bh.consume(counter)
}

@State(Scope.Thread)
open class AtomicCounter {
  var value = AtomicInteger(0)

  @CompilerControl(CompilerControl.Mode.DONT_INLINE)
  fun increment() = value.incrementAndGet()

  @CompilerControl(CompilerControl.Mode.DONT_INLINE)
  fun decrement() = value.decrementAndGet()

  @CompilerControl(CompilerControl.Mode.DONT_INLINE)
  fun get() = value
}
```

Another way is to use a synchronized block. To my surprise, it turned out to be faster than atomic integer, taking only 22 ms. I guess it is because there was no actual contention in this case, as we are running only one thread. My other experiments show that in a multi-threaded environment, atomic integer is faster, and synchronized block takes longer than that, and synchronization has a cost comparable to reflection.

```kotlin
// Takes 22 ms/op
@Benchmark
fun synchronizedCounterCall(bh: Blackhole, counter: SynchronizedCounter) {
  repeat(1_000_000) {
    counter.increment()
    counter.decrement()
    counter.increment()
    counter.get()
  }
  bh.consume(counter)
}

@State(Scope.Thread)
open class SynchronizedCounter {
  var value = 0

  @CompilerControl(CompilerControl.Mode.DONT_INLINE)
  fun increment() = synchronized(this) {
    value++
  }

  @CompilerControl(CompilerControl.Mode.DONT_INLINE)
  fun decrement() = synchronized(this) {
    value--
  }

  @CompilerControl(CompilerControl.Mode.DONT_INLINE)
  fun get() = synchronized(this) { value }
}
```

---

## Logging

How about logging? Logging is a popular operation, and I never herd anyone saying that we should not use it because it is slow. I tried to check it by adding simple `println` to method calls, and my computer quickly got drained out of memory. To avoid it, I made texts to print as short as possible, used `print`, and limited the number of iterations to 10,000 (from 1,000,000). It takes 192 ms, so for regular number of operations it should take around 19,204 ms. That is longer than reflection by several orders of magnitude, even unoptimized reflection.

```kotlin :collapsed-lines
// Takes 192 ms/op
// so for 1,000,000 operations it should take around 19,204 ms for the same number of operations
@Benchmark
fun printingCounterCall(bh: Blackhole, counter: PrintingCounter) {
  repeat(10_000) {
    counter.increment()
    counter.decrement()
    counter.increment()
    counter.get()
  }
  bh.consume(counter)
}

@State(Scope.Thread)
open class PrintingCounter {
 var value = 0

  fun increment() {
    print("I")
    value++
  }

  fun decrement() {
    print("D")
    value--
  }

  fun get() {
    print("G")
    value
  }
}
```

---

## Conclusion

Reflection is much slower than a regular function call, but it is not that slow when compared to other popular operations. It has a comparable cost to synchronization, and it is much faster than logging. We do not consider the costs of many things in so many places, and I do not understand why reflection is so often pointed out as something that should be avoided. Instead, I believe that every developer should understand the order of magnitude of costs of different operations, and then decide if the cost of reflection is acceptable in a given case.

Here is a summary of the results for my computer:

| Operation | Rounded cost $ns$ |
| :--- | :--- |
| Function call | 0.1 |
| Operating on a nullable value | 1 |
| Suspending function call | 1 |
| Synchronization | 10 |
| Function call with reflection | 10 |
| Printing / Logging | 10,000 |
| Making network request | 100,000,000 |

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Is reflection slowing down your code?",
  "desc": "Let's benchmark reflection and see how it affects the performance of your code.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/benchmark-reflection.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
