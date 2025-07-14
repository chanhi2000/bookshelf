---
lang: en-US
title: "Mastering Android ViewModels: Essential Dos and Don’ts Part 5 🛠️5️⃣"
description: "Article(s) > Mastering Android ViewModels: Essential Dos and Don’ts Part 5 🛠️5️⃣"
icon: iconfont icon-jetpack-compose
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
      content: "Article(s) > Mastering Android ViewModels: Essential Dos and Don’ts Part 5 🛠️5️⃣"
    - property: og:description
      content: "Mastering Android ViewModels: Essential Dos and Don’ts Part 5 🛠️5️⃣"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/mastering-android-viewmodels-essential-dos-and-donts-part-5-%F0%9F%9B%A0%EF%B8%8F5%EF%B8%8F%E2%83%A3.html
prev: /programming/java-android/articles/README.md
date: 2024-11-05
isOriginal: false
author: Reza
cover: https://droidcon.com/wp-content/uploads/2024/11/1_XDoCaRPSQa-h0DqkT5ckmA-600x278.webp
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
  name="Mastering Android ViewModels: Essential Dos and Don’ts Part 5 🛠️5️⃣"
  desc="This will be the fifth installment in our series “Mastering Android ViewModels” where we dive deep into the essential dos and don’ts that can elevate your Android development skills. We’ve already covered several tips to improve performance and code quality in ViewModels, which have become an integral part of modern Android applications."
  url="https://droidcon.com/mastering-android-viewmodels-essential-dos-and-donts-part-5-%F0%9F%9B%A0%EF%B8%8F5%EF%B8%8F%E2%83%A3"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_XDoCaRPSQa-h0DqkT5ckmA-600x278.webp"/>

![](https://droidcon.com/wp-content/uploads/2024/11/1_XDoCaRPSQa-h0DqkT5ckmA-600x278.webp)

This will be the fifth installment in our series**“Mastering Android `ViewModels`”**where we dive deep into the essential dos and don’ts that can elevate your Android development skills. We’ve already covered several tips to improve performance and code quality in `ViewModels`, which have become an integral part of modern Android applications.

::: info Mastering Android ViewModels: Essential Dos and Don’ts Series 🔄🔄🔄

1. **Avoid initializing the state in the `init {}` block.**✅ [Read here](https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-1-%EF%B8%8F-bdf05287bca9)
2. **Avoid exposing mutable states.**✅[Read here](https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-2-%EF%B8%8F-2b49281f0029)
3. **Use `update{}` when using `MutableStateFlows`.**✅[Read here](https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-2-%EF%B8%8F-2b49281f0029)
4. **Try not to import Android dependencies in the `ViewModels`.**✅[Read here](https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-3-%EF%B8%8F3%EF%B8%8F%E2%83%A3-1833ce3ddd2b)
5. **Lazily inject dependencies in the constructor.**✅[Read here](https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-3-%EF%B8%8F3%EF%B8%8F%E2%83%A3-1833ce3ddd2b)
6. **Embrace more reactive and less imperative coding. ✅** [Read here](https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-4-%EF%B8%8F-a0bad53cebd2)
7. **Avoid initializing the `ViewModel` from the outside world. ✅** [Read here](https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-4-%EF%B8%8F-a0bad53cebd2)

:::

---

## In this article we’ll cover

1.Avoid hardcoding Coroutine Dispatchers.
2.Unit test your ViewModels.
3.Avoid exposing suspended functions.

---

## 1. Avoid Hardcoding Coroutine Dispatchers

When dealing with coroutines in your `ViewModel`, hardcoding dispatchers like`Dispatchers.IO`or`Dispatchers.Default`might seem convenient, but it can lead to tightly coupled and less testable code.

### The Problem with Hardcoding Dispatchers

Hardcoding dispatchers directly in your `ViewModel` can make testing difficult and reduce flexibility. For instance, during testing, you may want to control the threading behavior, which becomes challenging with hardcoded dispatchers.

### Recommended Approach

Inject your dispatchers via the constructor or use a dependency injection framework like Hilt or Dagger. This not only makes your `ViewModel` more flexible but also simplifies testing:

```kotlin
class MyViewModel(
    private val ioDispatcher: CoroutineDispatcher = Dispatchers.IO
) : ViewModel() {

  private fun loadData() {
     viewModelScope.launch(ioDispatcher) {
       // Your coroutine code here
     }
  }
}
```

By using dependency injection, you can swap out the dispatcher during testing, ensuring your `ViewModel` behaves correctly in different environments.

for an example look at:

```kotlin :collapsed-lines title="ui/words-list/src/main/java/com/example/words_list/WordsListViewModelTest.kt"
package com.example.words_list

import androidx.paging.testing.asSnapshot
import assertk.Assert
import assertk.assertThat
import assertk.assertions.isTrue
import assertk.assertions.size
import com.example.data.sync.DictionarySyncStateWatcherDefault
import com.example.domain.repository.DictionaryRepository
import com.example.domain.usecases.GetFilteredWordsUseCase
import com.example.testing.DataSyncStatusFake
import com.example.testing.FakeDictionaryRepo
import com.example.testing.MainDispatcherRule
import com.example.wordslist.WordsListViewModel
import kotlin.time.Duration.Companion.seconds
import kotlinx.coroutines.test.runTest
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
class WordsListViewModelTest {

  @get:Rule
  val mainDispatcherRule = MainDispatcherRule()

  @Test
  fun testViewModelLoadsData() = runTest(timeout = 2.seconds) {
    val fakeRepository: DictionaryRepository = FakeDictionaryRepo(createWordsSequence(size = 1_000))
    val viewModel = WordsListViewModel(
      getFilteredWordUseCase = GetFilteredWordsUseCase(fakeRepository),
      stateWatcher = com.example.data.sync.DictionarySyncStateWatcherDefault(DataSyncStatusFake()),
    )
    val items = viewModel.pagingDataFlow
    val itemsSnapshot = items.asSnapshot {
      // Scroll to the 50th item in the list. This will also suspend till
      // the prefetch requirement is met if there's one.
      // It also suspends until all loading is complete.
      scrollTo(index = 300)
    }
    assertThat(itemsSnapshot.size >= 300).isTrue()

    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 500) }).size >= 500).isTrue()
    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 700) }).size >= 700).isTrue()
    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 850) }).size >= 850).isTrue()
    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 900) }).size >= 900).isTrue()
    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 1000) })).transform { it.size >= 1000 }.isTrue()
  }

  @Test
  fun testViewModelLoadsHugeData() = runTest {
    val fakeRepository: DictionaryRepository = FakeDictionaryRepo(createWordsSequence(size = 1000_000))
    val viewModel = WordsListViewModel(
      getFilteredWordUseCase = GetFilteredWordsUseCase(fakeRepository),
      stateWatcher = com.example.data.sync.DictionarySyncStateWatcherDefault(DataSyncStatusFake()),
    )
    val items = viewModel.pagingDataFlow
    val itemsSnapshot = items.asSnapshot {
      scrollTo(index = 300)
    }
    assertThat(itemsSnapshot).isAtLeast(422)

    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 500) })).isAtLeast(500)
    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 700) })).isAtLeast(700)
    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 850) })).isAtLeast(850)
    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 10_000) })).isAtLeast(10_000)
    assertThat(items.asSnapshot(loadOperations = { scrollTo(index = 12_000) })).isAtLeast(12_000)
  }

  private fun createWordsSequence(size: Int) = (1..size).map { "$it" }.asSequence()

  fun Assert<List<*>>.isAtLeast(size: Int) {
    size().transform { it >= size }.isTrue()
  }
}
```

<!-- @include: https://github.com/LloydBlv/GoodDictionary/blob/main/ui/words-list/src/test/java/com/example/words_list/WordsListViewModelTest.kt -->

---

## 2. Unit Test Your `ViewModels`

Unit testing is essential to ensure your `ViewModels` behave as expected. Without proper tests, you risk introducing bugs that could have been caught early.

### Testing Challenges

`ViewModels` often interact with complex state and other components, making them tricky to test. However, by following the right practices, specially what we discuss in this series, you can thoroughly test your ViewModel’s logic.

### Best Practices for Testing `ViewModels`

- **Use a `TestCoroutineDispatcher`**to control coroutine execution and test asynchronous code synchronously.
- Favor testing ViewModels as a non-Android test (use test folder instead of androidTest)
- Avoid using`runBlocking{}`for testing`suspended`functions, instead use`runTest{}`from`coroutines-test`
- Avoid manually peeking values from`StateFlows`, Use[<FontIcon icon="iconfont icon-github"/>`cashapp/turbine`](https://github.com/cashapp/turbine)instead
- For testing`flows`, use[<FontIcon icon="iconfont icon-github"/>`cashapp/turbine`](https://github.com/cashapp/turbine)
- Favor fakes over mocks

---

## 3. Avoid Exposing Suspended Functions

While`suspend`functions make asynchronous programming in Kotlin easier, exposing them directly from your ViewModel can lead to misuse and increased complexity.

### Why It’s Problematic

Exposing`suspend`functions can result in mismanagement of threading or lifecycle events, leading to bugs or crashes.

### The Better Way

Keep suspension internal to the ViewModel, and expose results through`Flow`or other observable patterns.

---

## Conclusion

Mastering `ViewModels` in Android development is crucial for creating robust, efficient, and maintainable applications. Throughout this series, we’ve discussed a comprehensive set of best practices to improve your code quality and application performance.

🌟**Congratulations**if you’ve made it this far in the article! 🎉**Don’t forget to**:

- 👏 Smash the clap button as many times! So I can continue with the follow-up articles!
- Follow[my YouTube channel (<FontIcon icon="fa-brands fa-youtube"/>`DroidFly`)](https://youtube.com/@DroidFly)for video tutorials and tips on Android development
- ✨✨If you need help with your Android ViewModels, Project, or your career development, Book a 1:1 or a Pair-Programming session with me, [**Book a time now**](https://mentorcruise.com/mentor/rezanajafi/) 🧑‍💻🧑‍💻🧑‍💻
- check out the previous articles in this series with the links below:

<SiteInfo
  name="Mastering Android ViewModels: Essential Dos and Don’ts Part 1 🛠️"
  desc="If you’re using ViewModels keep these in mind for better code quality"
  url="https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-1-%EF%B8%8F-bdf05287bca9/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*kw5CfF3tMvC_SQaKneKuag.png"/>

<SiteInfo
  name="Mastering Android ViewModels: Essential Dos and Don’ts Part 2 🛠️"
  desc="In the second part of this series of articles, we will continue discussing best practices for using Android ViewModels."
  url="https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-2-%EF%B8%8F-2b49281f0029/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*h2v9N4U9uGp4gTiphRWg4w.png"/>

<SiteInfo
  name="Mastering Android ViewModels: Essential Dos and Don’ts Part 3 🛠️3️⃣"
  desc="If you’re using ViewModels keep these in mind for better code quality, Part3"
  url="https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-3-%EF%B8%8F3%EF%B8%8F%E2%83%A3-1833ce3ddd2b/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1080/1*dWdbvDuWlcQaFNCYBjRI6w.png"/>

<SiteInfo
  name="Mastering Android ViewModels: Essential Dos and Don’ts Part 4 🛠️⚃"
  desc="If you’re using ViewModels keep these in mind for better code quality, Part 4"
  url="https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-4-%EF%B8%8F-a0bad53cebd2/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1080/1*4M3wAQM1QlZpJNah4H6P9A.png"/>

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>proandroiddev.com](https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-5-%EF%B8%8F5%EF%B8%8F%E2%83%A3-14d04ec2426a)

<SiteInfo
  name="Mastering Android ViewModels: Essential Dos and Don’ts Part 5 🛠️5️⃣"
  desc="keep these in mind for better code quality when doing ViewModels!"
  url="https://proandroiddev.com/mastering-android-viewmodels-essential-dos-and-donts-part-5-%EF%B8%8F5%EF%B8%8F%E2%83%A3-14d04ec2426a/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1080/1*XDoCaRPSQa-h0DqkT5ckmA.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Mastering Android ViewModels: Essential Dos and Don’ts Part 5 🛠️5️⃣",
  "desc": "This will be the fifth installment in our series “Mastering Android ViewModels” where we dive deep into the essential dos and don’ts that can elevate your Android development skills. We’ve already covered several tips to improve performance and code quality in ViewModels, which have become an integral part of modern Android applications.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/mastering-android-viewmodels-essential-dos-and-donts-part-5-%F0%9F%9B%A0%EF%B8%8F5%EF%B8%8F%E2%83%A3.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
