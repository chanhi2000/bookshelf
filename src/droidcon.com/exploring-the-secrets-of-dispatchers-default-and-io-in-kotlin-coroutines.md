---
lang: en-US
title: "Exploring the Secrets of Dispatchers Default and IO in Kotlin Coroutines"
description: "Article(s) > Exploring the Secrets of Dispatchers Default and IO in Kotlin Coroutines"
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
      content: "Article(s) > Exploring the Secrets of Dispatchers Default and IO in Kotlin Coroutines"
    - property: og:description
      content: "Exploring the Secrets of Dispatchers Default and IO in Kotlin Coroutines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/exploring-the-secrets-of-dispatchers-default-and-io-in-kotlin-coroutines.html
prev: /programming/java-android/articles/README.md
date: 2024-11-22
isOriginal: false
author: 
  - name: Leo N
    url: https://github.com/nphausg
cover: https://droidcon.com/wp-content/uploads/2024/11/1_umopuK8jiae4gCm_NzahkQ.webp
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
  name="Exploring the Secrets of Dispatchers Default and IO in Kotlin Coroutines"
  desc="Understanding the architecture of CPU cores and threads can be a game-changer when writing optimized code. In this guide, we will explore the differences between CPU cores and threads, the role of Kotlin’sDispatchers.DefaultandDispatchers.IO, and why these distinctions matter when working with CPU and I/O-intensive tasks. This knowledge will help you create more efficient, high-performance applications. 👋🏻"
  url="https://droidcon.com/exploring-the-secrets-of-dispatchers-default-and-io-in-kotlin-coroutines"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_umopuK8jiae4gCm_NzahkQ.webp"/>

Understanding the architecture of CPU cores and threads can be a game-changer when writing optimized code. In this guide, we will explore the differences between CPU cores and threads, the role of Kotlin’s`Dispatchers.Default`and`Dispatchers.IO`, and why these distinctions matter when working with CPU and I/O-intensive tasks. This knowledge will help you create more efficient, high-performance applications. 👋🏻

---

## Overview

### 1. Core vs .Thread : The Basics

Let’s start with a quick rundown of the foundational components:

![Generated by ChatGPT](https://droidcon.com/wp-content/uploads/2024/11/1_qmA6fum9VWGhbhO3bt2WLQ-300x300.webp)

#### Core (CPU Core)

*A core* is a physical processing unit within a CPU that handles tasks independently, allowing for true multitasking. Each core has dedicated resources that execute tasks in parallel with other cores. This parallelism means a CPU with multiple cores can perform multiple tasks simultaneously. For example, a quad-core CPU can handle four separate tasks at once, maximizing computational power. If a CPU has more cores, it generally means higher processing capacity, especially useful for tasks that require heavy computation or data processing.

#### Thread

*A thread,* in contrast, is a logical execution unit that can be thought of as a sub-task within a process. Threads allow a program to split into multiple, smaller tasks to be handled simultaneously. However, threads are designed to share the resources of a single core, unlike cores that don’t need to share their resources for parallel tasks.

With modern CPUs, technologies like hyper threading or simultaneous multithreading (SMT) enable each core to handle multiple threads. A CPU core with SMT can work on two threads concurrently, increasing efficiency without increasing the physical core count. So, a quad-core CPU wth SMT can run up to eight threads at a time.

#### Core vs. Thread: Quick Comparison Table

| Feature | **Core** | **Thread** |
| ---: | :--- | :--- |
| Type | Physical processing unit | Logical processing unit |
| Function | Executes distinct tasks directly | Handles sub-tasks within a single process |
| Resources | Dedicated resources per core | Shared resources within a core |
| Concurrency | Multiple cores = more parallel tasks | Threads improve multitasking within a core |
| Peformance Impact | Increases true CPU power | Optimizes each core without adding physical power |

<!-- @include: https://gist.github.com/nphausg/782f873fe7596a4a3ebd7795c777f0a8/raw/05adc70df83b45ec73585c037a6d5068720c1b6a/core%20vs%20thread%20comparison%20table.md -->

### 2. Optimizing with Dispatchers in Kotlin Coroutines

When working with Kotlin,`Dispatchers`decide which threads execute a task. Two key dispatchers,`Dispatchers.Default`and`Dispatchers.IO`, optimize different kinds of tasks by managing the balance between cores and threads.

::: tabs

@tab:active <code>Dispatchers.Default</code>

- **Purpose:**Designed for CPU-intensive tasks.
- **Behavior:**Uses a limited number of threads that match the core count on the CPU
- **Why:**By aligning threads with physical cores,`Dispatchers.Default`ensures that each task has dedicated CPU time without being interrupted by excessive thread-switching. THis keeps the overhead low and the performance high for tasks that require consistent CPU power, like complex calculations and data processing.

> *It is backed by a shared pool of threads on JVM and Native. By default, the maximum number of threads used by this dispatcher is equal to the number of CPU cores, but is at least two.[https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-default.html](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-default.html)*

@tab <code>Dispatchers.IO</code>

- **Purpose:**Designed for I/O-bound (input/output) tasks, likle reading files, making network requests, or querying databases.
- **Behavior:**Scales up to 64 threads to handle multiple tasks without blocking other resources.
- **Why:**Tasks like I/O often require waiting on external resources (network, database) that don’t engage the CPU. Having 64 threads allows multiple I/O-bound tasks to run without creating a bottleneck in the CPU, ensuring these tasks don’t interfere with CPU-bound threads. However, the 64-thread limit keeps resource overhead in check, preventing excessive context-switching that could degrade performance.

```kotlin
// 100 threads for MySQL connection
val myMysqlDbDispatcher = Dispatchers.IO.limitedParallelism(100)
// 60 threads for MongoDB connection
val myMongoDbDispatcher = Dispatchers.IO.limitedParallelism(60)
```

> As a result of thread sharing, more than 64 (default parallelism) threads can be created (but not used) during operations over IO dispatcher.

### 3. Context switching

In computer systems and programming,**context switching** is a key concept that relates to how the OS manages and execute multiple processes or threads concurrently. Here is a proper explanation of context switching, how it works, and its impact on system performance.

![Generated by ChatGPT](https://droidcon.com/wp-content/uploads/2024/11/1_fBtSgDpVK6AkU6evCWzTMA-300x300.webp)

#### What is Context Switching?

This is the process in which the operating systems pauses a running process or thread,**saves**its current state (known as the**context**), and then**loads**and**resumes**another process or thread. This mechanism allows the CPU to switch between processes or threads efficiently, creating the effect that tasks are running simultaneously.

#### Components of Context

The context of a process or thread includes:

- **CPU registers information:**This includes registers like the Program Counter (PC), Stack Pointer (SP), and others that store the current state of the process.
- **Process state:** This represents the current state (running, ready, waiting, …) of the process.
- **Memory information:** The address space or momey allowcation that the process is currently using.
- **Resource information:** Information about resources the process is using, like files, I/O devices, …

#### How Context Switching works

The context switching process generally flows these steps:

1. **Interrupt:** An event, such as a time slice ending or an I/O request, triggers an interrupt and informs the OS that it needs to switch contexts.
2. **Save current state:** The OS saves the current state of the running process or thread in a special memory area known as the Process Control Block (PCB).
3. **Select next process/Thread:** The OS uses scheduling algorithms to select the next process or thread to run.
4. **Load new State:**The OS loads the states of the new process or thread from its PCB back into the CPU registers.
5. **Resume Execution:** The CPU begins or resumes executing the new process or thread.

#### Impact of context switching

::: tabs

@tab:active Advantages

- **Multitasking**: Allows the system to efficiently run multiple processes or threads, creating the effect that tasks are running simultaneously.
- **Quick response**: The system can quickly respond to user requests or system events.

@tab Disadvantages

- **Time cost**: Context switching requires CPU time to save and load the states of processes or threads. If too many context switches happen, it can impact system performance.
- **Overhead**: Frequent context switching can cause significant overhead, particularly in real-time systems or high-performance applications.

@tab Context Switching in Multithreading

In multithreaded programming, especially when using libraries or frameworks that support concurrency like Kotlin Coroutines, context switching plays a vital role in managing and optimizing performance:

- **Dispatchers**: As mentioned before,`Dispatchers.Default`and`Dispatchers.IO`in Kotlin use context switching to allocate tasks to appropriate threads, ensuring that CPU-intensive and I/O-bound tasks are processed efficiently without excessive context switching.
- **Application Performance**: Optimizing the number of context switches through proper dispatcher usage helps reduce overhead and improve the application’s overall performance.

:::

#### How to Minimize the Impact of Context Switching

- **Limit the number of processes or threads**: Avoid creating too many unnecessary processes or threads to reduce context switching.
- **Use optimized libraries**: Libraries like Kotlin Coroutines are designed to minimize context switching by managing threads efficiently.
- **Optimize scheduling algorithms**: Both the operating system and applications can use efficient scheduling algorithms to reduce the need for context switching.

---

## Discussion 🤔

### 1. Why`Dispatchers.IO`Isn’t a Replacement for`Dispatchers.Default?`

![](https://droidcon.com/wp-content/uploads/2024/11/0_PfFcka0px2vjjb3X-300x78.webp)

<SiteInfo
  name="Coroutine context and dispatchers | Kotlin"
  desc="Debugging with IDEA: The Coroutine Debugger of the Kotlin plugin simplifies debugging coroutines in IntelliJ IDEA."
  url="https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html#debugging-with-idea"
  logo="https://kotlinlang.org/assets/images/apple-touch-icon-114x114.png?v2"
  preview="https://kotlinlang.org/assets/images/open-graph/docs.png"/>

Sometimes, you might hear [that “Dispatchers.IO looks like a better option for default dispatchers” (<FontIcon icon="iconfont icon-github"/>`Kotlin/kotlinx.coroutines`)](https://github.com/Kotlin/kotlinx.coroutines/issues/2410). However, while`Dispatchers.IO`excels at handling I/O tasks, it’s not a replacement for`Dispatchers.Default`in CPU-intensive operations.

<SiteInfo
  name="Dispatcher.IO looks like better option for default dispatcher - Android - Kotlin Discussions"
  desc="Reasonable advice) ok, thanks"
  url="https://discuss.kotlinlang.org/t/dispatcher-io-looks-like-better-option-for-default-dispatcher/20044/6/"
  logo="https://us1.discourse-cdn.com/flex019/uploads/kotlinlang/optimized/2X/2/224964e73572d20c3aa9d68b4c14ae5d11749202_2_32x32.png"
  preview="https://us1.discourse-cdn.com/flex019/uploads/kotlinlang/original/2X/2/224964e73572d20c3aa9d68b4c14ae5d11749202.png"/>

#### Here’s why

1. **Thread count:** `Dispatchers.Default`aligns with the number of cores, ensuring efficient handling of CPU-bound tasks.`Dispatchers.IO`, however, scales threads up to 64, which is suitable for I/O but not for CPU-bound tasks, as it could overload the CPU and reduce overall efficiency.
2. **Resource Allocation:** `Dispatchers.Default`conservers CPU resources by using core-based threading, while`Dispatchers.IO`uses many threads to prevent blocking from I/O wait times. Excessive threads on CPU-intensive tasks would lead to too much context-switching, adding unnecessary overhead.

::: important Key takeaway

- **Dispatcher.Default and CPU Usage**:`Dispatchers.Default`in Kotlin uses a thread pool that aligns with the number of CPU cores available on the system. If all threads in`Dispatchers.Default`are actively running CPU-bound coroutines, this means every core is fully occupied, leaving no room for additional CPU tasks.
- **Adding More Threads**: If you were to start another thread beyond the capacity of`Dispatchers.Default`while all CPU cores are busy, that new thread would need to*compete*for CPU time. The operating system would then have to perform**context switching**between the threads, which involves temporarily pausing one thread to let another run.
- **Limits of Simultaneous Execution**: Since each CPU core can only execute one thread at a time, adding more threads doesn’t allow for*true*simultaneous execution on a single core. Instead, with more threads than cores, the system spends extra time switching between them. This*context-switching overhead*can reduce overall efficiency, particularly if there are many threads competing for limited CPU resources.
- **Impact on Performance**: If your application tries to run more CPU-intensive tasks than there are cores available, the performance gain can actually diminish due to the cost of context switching and resource contention. For this reason, sticking to`Dispatchers.Default`for CPU tasks is usually more efficient, as it keeps the thread count aligned with the CPU’s core count.

> *So, in summary, starting more threads when all cores are occupied won’t yield additional processing power. It’s often better to keep the number of CPU-bound tasks close to the number of CPU cores to avoid excessive context switching and keep CPU usage efficient. 🐛*

:::

### 2. Is there thread switching when moving from Default to IO dispatcher using withContext?

```kotlin
suspend fun <T> withContext(
    context: CoroutineContext, 
    block: suspend CoroutineScope.() -> T
): T
```

When switching between`Dispatchers.Default`and`Dispatchers.IO`with`withContext`, a thread switch occurs, but it is handled efficiently within the coroutine framework, with minimal impact on performance in most use cases.

1. **Different Thread Pools:** `Dispatchers.Default`and`Dispatchers.IO`each have their own separate thread pools.`Dispatchers.Default`has a thread pool that matches the CPU core count, while`Dispatchers.IO`is optimized for I/O-bound tasks and can scale up to 64 threads by default.
2. **Switching Threads:** When you use`withContext(Dispatchers.IO)`within a coroutine that was originally running on`Dispatchers.Default`, the coroutine suspends on the`Default`thread and resumes on a different thread from the`IO`pool. This suspension and resumption involve*moving the coroutine’s execution context*from one thread pool to another, which is managed by the coroutine runtime.
3. **Context Switching Overhead:** Although coroutines handle this transition efficiently, there is still a slight overhead due to the context switch. This switching doesn’t involve a full context switch at the OS level (since coroutines don’t map one-to-one with threads) but it does involve**suspending and resuming the coroutine state**, which takes a small amount of time.
4. **Practical Impact:** In most cases, this thread switching is minimal and unlikely to impact performance significantly, especially when moving between CPU-bound and I/O-bound tasks. Kotlin coroutine framework is designed to make these transitions smooth, so the switching cost is generally much lower than in traditional multi-threaded applications.

---

## Conclusion 💡

Understanding the roles of cores and threads — and using`Dispatchers.Default`and`Dispatchers.IO`appropriately—can maximize your application’s performance. Here’s a summary:

- **Dispatchers.Default**is optimized for CPU-intensive tasks, using the core count to prevent bottlenecks and context-switching overhead.
- **Dispatchers.IO**is tailored for I/O-bound tasks, scaling threads up to 64 to avoid blocking without overloading CPU resources.
- This dispatcher and its views share threads with the[<FontIcon icon="iconfont icon-kotlin"/>Default](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-default.html)dispatcher, so using`withContext(Dispatchers.IO) { ... }`when already running on the[<FontIcon icon="iconfont icon-kotlin"/>Default](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-default.html)dispatcher typically does not lead to an actual switching to another thread. In such scenarios, the underlying implementation attempts to keep the execution on the same thread on a best-effort basis.[https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-i-o.html](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-i-o.html)
- Using a dispatcher that uses a thread pool like**`Dispatchers.IO`**or**`Dispatchers.Default`**does not guarantee that the block executes on the same thread from top to bottom. In some situations, Kotlin coroutines might move execution to another thread after a**`suspend`**-and-**`resume`**. This means thread-local variables might not point to the same value for the entire**`withContext()`**block.

<SiteInfo
  name="Improve app performance with Kotlin coroutines | Android Developers"
  desc="Kotlin coroutines enable you to write clean, simplified asynchronous code that keeps your app responsive while managing long-running tasks such as network calls or disk operations."
  url="https://developer.android.com/kotlin/coroutines/coroutines-adv/"
  logo="https://gstatic.com/devrel-devsite/prod/v5ab6fd0ad9c02b131b4d387b5751ac2c3616478c6dd65b5e931f0805efa1009c/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

By matching the right dispatcher to your task type, you can ensure smoother, more efficient execution and avoid common pitfalls in resource management.

---

## References

<SiteInfo
  name="CoroutineDispatcher"
  desc="Base class to be extended by all coroutine dispatcher implementations."
  url="https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-coroutine-dispatcher/"
  logo="https://kotlinlang.org/assets/images/apple-touch-icon-114x114.png?v2"
  preview="https://kotlinlang.org/assets/images/open-graph/docs.png"/>

<SiteInfo
  name="Coroutine context and dispatchers | Kotlin"
  desc="Coroutines always execute in some context represented by a value of the CoroutineContext type, defined in the Kotlin standard library."
  url="https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html/"
  logo="https://kotlinlang.org/assets/images/apple-touch-icon-114x114.png?v2"
  preview="https://kotlinlang.org/assets/images/open-graph/docs.png"/>

<SiteInfo
  name="Dispatcher.IO looks like better option for default dispatcher · Issue #2410 · Kotlin/kotlinx.coroutines"
  desc="After reading some RxJava articles i mentioned that all authors recommend use Schedule.computation only for hard CPU jobs, while Scheduler.IO looks as better option for everything else (IO operatio..."
  url="https://github.com/Kotlin/kotlinx.coroutines/issues/2410/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c632867b52853fdd32f9fbc44dda825f7778dbac74e0782c9ca060ab9c7eb49c/Kotlin/kotlinx.coroutines/issues/2410"/>

<SiteInfo
  name="Dispatcher.IO looks like better option for default dispatcher - Android - Kotlin Discussions"
  desc="The reason Dispatchers.Default is a good default dispatcher is because it is limited to the number of physical threads on your machine (unless it only has one core, but that’s another story). Aligning the number of logical and physical cores like that means you reduce the chance of context switches during your application lifetime, something that is extremely (relatively speaking) expensive.  This comes with a caveat though, as you mentioned. If you have 8 phyiscal threads on your machine and yo..."
  url="https://discuss.kotlinlang.org/t/dispatcher-io-looks-like-better-option-for-default-dispatcher/20044/3/"
  logo="https://us1.discourse-cdn.com/flex019/uploads/kotlinlang/optimized/2X/2/224964e73572d20c3aa9d68b4c14ae5d11749202_2_32x32.png"
  preview="https://us1.discourse-cdn.com/flex019/uploads/kotlinlang/original/2X/2/224964e73572d20c3aa9d68b4c14ae5d11749202.png"/>

<SiteInfo
  name="IO"
  desc="The CoroutineDispatcher that is designed for offloading blocking IO tasks to a shared pool of threads."
  url="https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-i-o.html/"
  logo="https://kotlinlang.org/assets/images/apple-touch-icon-114x114.png?v2"
  preview="https://kotlinlang.org/assets/images/open-graph/docs.png"/>

<SiteInfo
  name="withContext"
  desc="Calls the specified suspending block with a given coroutine context, suspends until it completes, and returns the result."
  url="https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/with-context.html/"
  logo="https://kotlinlang.org/assets/images/apple-touch-icon-114x114.png?v2"
  preview="https://kotlinlang.org/assets/images/open-graph/docs.png"/>

<SiteInfo
  name="nphausg - Overview"
  desc="Engineer @ GXS Bank | MSc 🎓 | Technical Writer 🇻🇳 🇸🇬 🇲🇾 🇦🇺 🇹🇭 - nphausg"
  url="https://github.com/nphausg/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://avatars.githubusercontent.com/u/13111806?v=4?s=400"/>

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/exploring-the-secrets-of-dispatchers-default-and-io-in-kotlin-coroutines-31d703c29ee2)

<SiteInfo
  name="Exploring the Secrets of Dispatchers Default and IO in Kotlin Coroutines"
  desc="Understanding the architecture of CPU cores and threads can be a game-changer when writing optimized code. In this guide, we will explore…"
  url="https://proandroiddev.com/exploring-the-secrets-of-dispatchers-default-and-io-in-kotlin-coroutines-31d703c29ee2/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/0*PfFcka0px2vjjb3X.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Exploring the Secrets of Dispatchers Default and IO in Kotlin Coroutines",
  "desc": "Understanding the architecture of CPU cores and threads can be a game-changer when writing optimized code. In this guide, we will explore the differences between CPU cores and threads, the role of Kotlin’sDispatchers.DefaultandDispatchers.IO, and why these distinctions matter when working with CPU and I/O-intensive tasks. This knowledge will help you create more efficient, high-performance applications. 👋🏻",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/exploring-the-secrets-of-dispatchers-default-and-io-in-kotlin-coroutines.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
