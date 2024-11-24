---
lang: en-US
title: "Why using Kotlin Coroutines?"
description: "Article(s) > Why using Kotlin Coroutines?"
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
      content: "Article(s) > Why using Kotlin Coroutines?"
    - property: og:description
      content: "Why using Kotlin Coroutines?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/cc-why.html
prev: /programming/java/articles/README.md
date: 2024-10-09
isOriginal: false
author: Marcin Moskała
cover: https://marcinmoskala.com/coroutines_book/promotion/101_why.jpg
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
  name="Why using Kotlin Coroutines?"
  desc="The explanation of why coroutines stand out and offer us what hasn't been offered by other technologies."
  url="https://kt.academy/cc-why"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/coroutines_book/promotion/101_why.jpg"/>

::: note

This is a chapter from the book [<FontIcon icon="fas fa-globe"/>Effective Kotlin](https://kt.academy/book/effectivekotlin). You can find it on [<FontIcon icon="fas fa-globe"/>LeanPub](https://leanpub.com/effectivekotlin) or [<FontIcon icon="fa-brands fa-amazon"/>Amazon](https://www.amazon.com/Effective-Kotlin-Best-Practices-Developers-ebook/dp/B0CHBR5XPF/).

:::

Many developers treat coroutines like lightweight threads, but they are much more than that. They are an implementation of a concept that was first described in 1963[^1] but waited years for a proper industry-ready implementation[^2]. The Kotlin Coroutines library offers powerful capabilities presented by half-century-old papers in a way that makes it simple and safe to implement real-life use cases. What is more, Kotlin Coroutines are multiplatform, which means they can be used across all Kotlin platforms (like JVM, JS, iOS, and also in common modules). Coroutines are also very efficient: significantly more efficient than libraries like RxJava or Reactor, and incomparably more efficient than blocking classic threads. Finally, they do not change the code structure drastically. We can use most of Kotlin Coroutines' capabilities nearly effortlessly (which we cannot say about RxJava or callbacks). This makes them beginner-friendly[^3]. In this chapter, I will explain the key advantages of Kotlin Coroutines from a bird's eye view, then we’ll see these advantages in detail in dedicated chapters.

---

## Simplicity

Kotlin Coroutines are designed to simplify common use cases. They allow us to achieve either an imperative style without blocking, or a reactive style with less boilerplate code.

This is especially useful on the frontend, like Android or JavaScript, where most parts of our applications run on the main thread, where blocking is not an option, but suspending is not a problem. Kotlin Coroutines lets us write code in the most intuitive way, debug it easily, and maintain it without any problems. They are much easier to implement and maintain than callbacks or reactive streams.

```kotlin
fun onCreate() {
  viewModelScope.launch {
    val user = fetchUser() // suspends coroutine
    displayUser(user) // runs on the main thread
    val posts = fetchPosts(user) // suspends coroutine
    displayPosts(posts) // runs on the main thread
  }
}
```

This ease of use is especially visible when we need to perform multiple asynchronous operations. Asynchronicity can be easily introduced with the `async` and `await` functions, which are part of the Kotlin Coroutines library.

```kotlin
suspend fun fetchUser(): UserData = coroutineScope {
  val userDetails = async { api.fetchUserDetails() }
  val posts = async { api.fetchPosts() }
  UserData(userDetails.await(), posts.await())
}
```

Asynchronous operations can be easily combined, for instance, we can easily start an asynchronous operation for each element of a collection, and we can easily wait for all of them to finish.

```kotlin
suspend fun getUserArticleDetails(
  userId: String
): List<ArticleDetails> = coroutineScope {
  articleRepo.getArticles(userId)
    .filter { it.isPublic }
    .map { async { articleRepo.getArticleDetails(it.id) } }
    .awaitAll()
}
```

Coroutines also offer many useful tools for synchronizing them that are not available in other libraries; moreover, their management is simple and intuitive for a skilled developer.

---

## Performance

At the same time, Kotlin Coroutines are designed to be efficient. They are lightweight and can be used in large numbers. Suspending functions are much lighter than `Single`, and `Flow` is much lighter than `Observable`. When we discuss how suspending functions and Flow work under the hood, it should be clear that they are as simple and efficient as they can be.

Coroutines are much more efficient than threads, which consume a lot of memory[^4] and are heavy to start and stop. Coroutines are a lightweight abstraction that runs on top of threads. They use threads in the most efficient way possible and can be used in large numbers.

This problem can be visualized with the following snippets that simulate a backend service with 100,000 users asking for data. The first snippet starts 100,000 threads and makes them sleep for a second (to simulate waiting for a response from a database or some other service). If you run it on your computer, you will see it takes a while to print all these dots, or it will break with an `OutOfMemoryError` exception. This is the cost of running so many threads. The second snippet uses coroutines instead of threads and suspends them instead of making them sleep. If you run it, the program will wait for a second and then print all the dots. The cost of starting all these coroutines is so cheap that it is barely noticeable.

::: kotlin-playground Performance (1)

@file main.kt

```kotlin
import kotlin.concurrent.thread

fun main() {
  repeat(100_000) {
    thread {
      Thread.sleep(1000L)
      print(".")
    }
  }
}
```

:::

::: kotlin-playground Performance (2)

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main(): Unit = runBlocking {
  repeat(100_000) {
    launch {
      delay(1000L)
      print(".")
    }
  }
}
```

:::

Kotlin Coroutines are not always faster than virtual threads from Project Loom (Java 21) because these virtual threads also use their own coroutines under the hood. However, Kotlin Coroutines also offer us efficiency in places otherwise not considered, such as cancellation, and they provide many efficient tools, for instance for synchronization.

---

## Cancellation

Kotlin Coroutines offer effortless cancellation. Again, this is especially important on the frontend, where we want to cancel all operations when the user leaves the screen or hides a view element. Cancellation of coroutines is practically effortless, unlike callback APIs or reactive streams.

```kotlin
fun onCreate() {
  viewModelScope.launch {
    // Cancelled when the user leaves the screen
    val news = getNewsFromApi()
    val sortedNews = news
      .sortedByDescending { it.publishedAt }
    view.showNews(sortedNews)
  }
}
```

On the backend, the advantages of cancellation are less visible but also important. Consider the `fetchUser` function from the previous example. If `fetchPosts` fails, the `fetchUserDetails` function is immediately cancelled, thus freeing resources. This is possible thanks to structured concurrency, a concept that was introduced by Kotlin Coroutines.

```kotlin
suspend fun fetchUser(): UserData = coroutineScope {
  // fetchUserDetails is cancelled if fetchPosts fails
  val userDetails = async { api.fetchUserDetails() }
  // fetchPosts is cancelled if fetchUserDetails fails
  val posts = async { api.fetchPosts() }
  UserData(userDetails.await(), posts.await())
}
```

Cancellation helps us in many other ways, even if this isn’t visible to us. Consider a client that makes a request to a Ktor Server (backend framework that uses coroutines by default). Handling this request is very slow, but this client does not wait for the response and breaks the connection a moment later. Thanks to coroutines' cancellation mechanism, the server can cancel the request immediately and free resources as soon as possible. This is not so simple with blocking threads, where the server would typically have to wait for the request to finish before it can free resources. This advantage is especially important when the server uses WebSockets or RSocket because the client can break the connection at any time. Effortless cancellation is a great advantage, especially for services with heavy traffic.

```kotlin
// Ktor server
fun Route.messagesApi() {
  get("/message/statistics") {
    // Cancelled if HTTP connection is lost
    val statistics = calculateMessageStatistics()
    call.respond(statistics)
  }
  rSocket("/message/channel") {
    RSocketRequestHandler {
      requestChannel { header, control ->
        // Cancelled if RSocket connection is lost
        messagesFlow(header, control)
      }
    }
  }
}
```

---

## Synchronization

Kotlin Coroutines offer many tools for synchronizing them. When we want to synchronize access to mutable state to avoid conflicts, we can use a dispatcher limited to a single thread. In many cases, this approach is much easier and more efficient than most other synchronization tools.

```kotlin
class UserDownloader(
  private val networkService: NetworkService
) {
  private val users = mutableListOf<User>()
  private val dispatcher = Dispatchers.IO.limitedParallelism(1)
  suspend fun downloaded(): List<User> =withContext(dispatcher){
    users.toList()
  }
  suspend fun fetchUser(id: Int) = withContext(dispatcher) {
    val newUser = networkService.fetchUser(id)
    users += newUser
  }
}
```

If you want to start a number of asynchronous operations and await their completion, you can just use a coroutine scope function such as `supervisorScope` because awaiting children is built into structured concurrency.

```kotlin
suspend fun process() {
  val updates = fetchUpdates()
  supervisorScope {
    updates.forEach { update ->
      launch {
        processUpdate(update)
      }
    }
  }
  println("All updates processed")
  sendUpdatesProcessedNotification()
}
```

There are also many built-in mechanisms for other forms of synchronization: if you want one coroutine to wait for another, you can just use `join` on its `Job`; if you want coroutines to await a value that is produced a coroutine, you can use `CompletableDeferred`, or if you want coroutines to communicate values in a safe way, you can use `Channel`. All these tools are built-in, and they are very easy to use.

```kotlin
class SomeService(
  private val scope: CoroutineScope
) {
  fun startTasks() {
    val job = scope.launch {
      // ...
    }
    scope.launch {
      // ...
      job.join()
      // ...
    }
  }
}
```

---

## Testability

Another great advantage of coroutines is their testability. Kotlin Coroutines support operating in virtual time, which lets us write precise, fast, and deterministic tests for cases that are hard to test with other libraries. For instance, let's say that you want to check that the aforementioned `fetchUser` function actually fetches user details and posts asynchronously. You can write a test that simulates each operation taking a second, then you can determine whether the function takes exactly one second to execute. Such a test is fast, precise, and predictable, all thanks to virtual time.

```kotlin
@Test
fun `should fetch data asynchronously`() = runTest {
  val api = mockk<Api> {
    coEvery { fetchUserDetails() } coAnswers {
      delay(1000)
      UserDetails("John Doe")
    }
    coEvery { fetchPosts() } coAnswers {
      delay(1000)
      listOf(Post("Hello, world!"))
    }
  }
  val useCase = FetchUserDataUseCase(api)
  val userData = useCase.fetchUser()
  assertEquals("John Doe", userData.user.name)
  assertEquals("Hello, world!", userData.posts.single().title)
  assertEquals(1000, currentTime)
}
```

Virtual time also allows us to test timeouts, retries, and other time-related operations. It also allows us to verify what happens in different scenarios. What if X is faster than Y but slower than Z? What if X is faster than Z? We can easily simulate and test all these scenarios with virtual time, which is a huge advantage of Kotlin Coroutines’ testability.

---

## Flow

Kotlin Coroutines provide powerful abstraction for expressing and processing asynchronous streams of values. This abstraction is called Flow. Flow is much lighter than RxJava or Reactor streams, and its implementation is much easier (I will show later that it can be implemented in just a couple of lines of code). It also has a rich feature set with many useful operators.

```kotlin
fun notificationStatusFlow(): Flow<NotificationStatus> =
  notificationProvider.observeNotificationUpdate()
    .distinctUntilChanged()
    .scan(NotificationStatus()) { status, update ->
      status.applyNotification(update)
    }
    .combine(
      userStateProvider.userStateFlow()
    ) { status, user ->
      statusFactory.produce(status, user)
    }
```

Flows can be hot, thanks to `SharedFlow` and `StateFlow`, which allow events or state changes to be emitted to multiple observers. This allows us to have only one observer that can be used by multiple streams or to represent an observable mutable state. The latter is a standard way on Android to represent mutable state in applications.

```kotlin
class NotificationProvider(
 notificationClient: NotificationClient,
 scope: CoroutineScope
) {
  private val notifications = notificationClient.observe()
    .shareIn(
      scope = scope,
      started = SharingStarted.WhileSubscribed(),
    )
  fun observe(): Flow<Notification> = notifications
}
```

```kotlin
// How we represent mutable state on Android
class NewsViewModel : BaseViewModel() {
  private val _loading = MutableStateFlow(false)
  val loading: StateFlow<Boolean> = _loading
  private val _news = MutableStateFlow(emptyList<News>())
  val news: StateFlow<List<News>> = _news
  fun onCreate() {
    newsFlow()
      .onStart { _loading.value = true }
      .onCompletion { _loading.value = false }
      .onEach { _news.value = it }
      .catch { _failure.value = it }
      .launchIn(viewModelScope)
  }
}
```

---

## Coroutines are multiplatform

Kotlin Coroutines is a multiplatform library that we can easily use on all Kotlin targets and in common modules. This universality is a great advantage when we write multiplatform projects or libraries. This is especially important on the frontend, where the popularity of multiplatform parts is increasing, but I’ve also used this advantage on the backend. Above all, many Kotlin libraries are multiplatform, so the same library can be used on both the backend and the client. In some projects I’ve also defined multiplatform libraries particularly to use the same code on the backend and frontend, even from JavaScript; in such cases, coroutines are very useful.

---

## The biggest problem with Kotlin Coroutines

I believe that the biggest problem with Kotlin Coroutines is that they hide a lot of complexities under the hood. That’s great if you use them in accordance with best practices, or if you know them well. The problem is that they can be dangerous if you try to do something more unusual without understanding how they work. This can lead to a variety of problems, like coroutines waiting for or cancelling each other. The remedy is to understand how coroutines work. Once you get the right abstraction and you understand how coroutines work, you’ll be able to use them in a safe and efficient way. Education is very important here, which is why I wrote this book. I hope to help you understand how coroutines work and how to use them safely and efficiently.

---

## Summary

Kotlin Coroutines are a great tool for writing asynchronous code. They are simple, efficient, and testable. They offer many tools for synchronization, and they are multiplatform. They are not lightweight threads but a powerful abstraction that can be used in many different ways. They are beginner-friendly, but they can be dangerous if you don’t understand how they work, so educating yourself is very important. I hope this book will help you understand how coroutines work and how to use them safely and efficiently.

[^1]: Conway, Melvin E. (July 1963). "Design of a Separable Transition-diagram Compiler". Communications of the ACM. ACM. 6 (7): 396–408. doi:10.1145/366663.366704. ISSN 0001-0782. S2CID 10559786
[^2]: I believe that the first industry-ready and universal coroutines were introduced by Go in 2009. However, it is worth mentioning that coroutines had also been implemented in some older languages, like Lisp, but they didn't become popular. I believe this is because their implementation wasn't designed to support real-life cases. Lisp (just like Haskell) was mostly treated as a playground for scientists rather than as a language for professionals.
[^3]: This does not change the fact that we should understand coroutines to use them well.
[^4]: Most often, the default size of the thread stack is 1 MB. Due to Java optimizations, this does not necessarily mean 1 MB times the number of threads will be used, but a lot of extra memory is spent just because we create threads.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why using Kotlin Coroutines?",
  "desc": "The explanation of why coroutines stand out and offer us what hasn't been offered by other technologies.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/cc-why.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
