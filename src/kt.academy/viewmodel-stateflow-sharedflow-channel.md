---
lang: en-US
title: "Representing ViewModel events with StateFlow vs. SharedFlow vs. Channel"
description: "Article(s) > Representing ViewModel events with StateFlow vs. SharedFlow vs. Channel"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - kt.academy
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Representing ViewModel events with StateFlow vs. SharedFlow vs. Channel"
    - property: og:description
      content: "Representing ViewModel events with StateFlow vs. SharedFlow vs. Channel"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/viewmodel-stateflow-sharedflow-channel.html
prev: /programming/java-android/articles/README.md
date: 2024-11-18
isOriginal: false
author: 
  - name: Marcin Moskała
    url: https://kt.academy/user/marcinmoskala
cover: https://marcinmoskala.com/kt-academy-articles/promotion/viewmodel-stateflow-sharedflow-channel.jpg
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
  name="Representing ViewModel events with StateFlow vs. SharedFlow vs. Channel"
  desc="What is the best way to represent ViewModel events in Kotlin?"
  url="https://kt.academy/article/viewmodel-stateflow-sharedflow-channel"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/viewmodel-stateflow-sharedflow-channel.jpg"/>

One of the most heated debates in the Android community is the use of `StateFlow`, `SharedFlow`, and `Channel` in the ViewModel. In this article, we will discuss the differences between these three, and suggest which one is the best for representing events.

---

## `StateFlow` for events

Let's start from saying, that for most elements of the UI, `StateFlow` is undoubtedly the best choice. We can assume it is best for all the elements of our "state".

```kotlin
// Example of using StateFlow for state

private val _exploreUiState = MutableStateFlow<ExploreUiState>(ExploreUiState.Loading)
val exploreUiState: StateFlow<ExploreUiState> get() = _exploreUiState

private val _genreUiState = MutableStateFlow<Resource<MovieGenre>>(Resource.Loading)
val genreUiState: StateFlow<Resource<MovieGenre>> get() = _genreUiState

private val _searchInputUiState = MutableStateFlow(SearchUiState())
val searchInputUiState: StateFlow<SearchUiState> get() = _searchInputUiState

private val _sortAndFilterUiState = MutableStateFlow(SortAndFilterUiState())
val sortAndFilterUiState: StateFlow<SortAndFilterUiState> get() = _sortAndFilterUiState
```

However, it can be tricky when we use it for representing events, like showing a toast, navigation, or performing an action. Here we have a problem, as `StateFlow` is not designed for this purpose.

Let's consider using `MutableStateFlow` with a nullable value. It is `null` at start, and after an event is handled, so a non-null value can be seen as an event to handle.

```kotlin
// ViewModel
private val _snackbar = MutableStateFlow<String?>(null)
val snackbar: StateFlow<String?> get() = _snackbar

// In case of error
_snackbar.value = getMesssageFromError(error)

// Fragment
viewModel.snackbar.collect { message ->
  message?.let { showSnackbar(message) }
  viewModel.clearSnackbar()
}

// ViewModel function
fun clearSnackbar() {
  _snackbar.value = null
}
```

There are some problems though:

- We need to remember to clear the state after handling the event, which makes this pattern a bit more complicated.

- If two coroutines send two different events in a short period of time, one of those events might be lost. Especially if they have the same value, because `MutableStateFlow` ignores updates with the same value, but even different values can be lost if the second event is sent before the first one is handled, because `StateFlow` is conflated. So essentially, there are a few ways in which events can be lost.

Let's consider some other options now.

---

## `SharedFlow` for events

In general, the best practice to represent events is to use `SharedFlow`. It is a much simpler abstraction that always emits value to all its current collectors.

```kotlin
// ViewModel
private val _showSnackbar = MutableSharedFlow<String>()
val showSnackbar: SharedFlow<String?> get() = _snackbar

// In case of error
_showSnackbar.emit(getMesssageFromError(error))

// Fragment
viewModel.showSnackbar.collect { message ->
  showSnackbar(message)
}
```

However, `SharedFlow` has a problem with view models, where UI can change, and in the meantime there is no observer. We deal with such a situation, for instance, when a user rotates the screen. If an event is sent during the rotation, it will be lost. I saw some people using a workaround for this problem: awaiting for the first observer to appear, and then sending the event. I like this solution, but I cannot guarantee that it is bulletproof, so I wouldn't use it for important events.

```kotlin
// ViewModel
private val _showSnackbar = MutableSharedFlow<String>()
val showSnackbar: SharedFlow<String?> get() = _snackbar

// In case of error
subscriptionCount.first { it > 0 }
_showSnackbar.emit(getMesssageFromError(error))

// Fragment
viewModel.showSnackbar.collect { message ->
  showSnackbar(message)
}
```

The advantage of `SharedFlow` is that it is a simple, and it is the only solution that can be freely used by more than one observer.

---

## `Channel` for events

The natural way of dealing with the aforementioned problem is using `Channel` with an unlimited capacity. It can be seen as a queue of events that are received by collectors. We can transform it into a `Flow` using `receiveAsFlow` function. If an event is sent when there is no observer, it will be received by the next observer.

```kotlin
// ViewModel
private val _showSnackbar = Channel<String>(Channel.UNLIMITED)
val showSnackbar = _showSnackbar.receiveAsFlow()

// In case of error
_showSnackbar.send(getMesssageFromError(error))

// Fragment
viewModel.showSnackbar.collect { message ->
 showSnackbar(message)
}
```

The problem of using a `Channel` is that there is a possibility that this event is lost, in an unlikely event of cancellation after sending the event, but before invoking its action (see [this article (<VPIcon icon="fa-brands fa-medium"/>`androiddevelopers`)](https://medium.com/androiddevelopers/viewmodel-one-off-event-antipatterns-16a1da869b95) and [this issue (<VPIcon icon="iconfont icon-github"/>`Kotlin/kotlinx.coroutines`)](https://github.com/Kotlin/kotlinx.coroutines/issues/2886)).

The most important argument against using `Channel` is that it does not guarantee event delivery (that should not be a problem if we both send and receive events in `Dispatchers.Main.immediate`, what is quite often the case, as it is used by both `viewModelScope` and `lifecycleScope`, but always ensuring that is a fragile solution). That is why we should avoid this solution for events that are important for the user experience, like a transaction result. Such an event is better represented with `StateFlow`, that guarantees that the event will be delivered to the observer.

---

## Turning events into state and using `StateFlow`

Time for the option, that I most often hear being recommended by Googlers. It is turning events into state, and using `StateFlow` for them. That is the only option I am sure is bulletproof, but my problem is that it is not the simplest one.

Let's consider an example of showing a snackbar. To represent it as a state, we would need to use a list of messages, show only the first one, and remove it after showing.

```kotlin
// ViewModel
private val _snackbarQueue = MutableStateFlow<List<String>>(emptyList())
val snackbarQueue: StateFlow<List<String>> get() = _snackbar

// In case of error
_snackbarQueue.update { it + getMesssageFromError(error) }

// Fragment
viewModel.snackbar.collect { message ->
  if (message.isNotEmpty()) {
    val first = message.first()
    showSnackbar(first)
    viewModel.removeSnackbarMessage(first)
  }
}

// ViewModel function
fun removeSnackbarMessage(message: String) {
  _snackbarQueue.update { it - message }
}
```

It is probably possible that the same message will be shown twice, but not that it will be lost, which is preferable for important events.

A good argument behind this solution is that we do not need to learn intricacies of `SharedFlow` or `Channel`, we can just use `StateFlow` for everything, and develop patterns of using it for different purposes.

However, on the other hand, there is a good argument that events should be represented as events, and not as state (event *happen*, state *is*), and for that `SharedFlow` or `Channel` are better solutions (see [this article (<VPIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/viewmodel-events-as-state-are-an-antipattern-35ff4fbc6fb6)).

---

## Jetpack Compose

It is worth mentioning, that as much as a need for "events" was not that incommon in classic Android development, it is rather rare in Jetpack Compose. Many things, like dialogs, are not an event that needs to be sent to Android, but rather a state that decides what is now displayed on the screen. For representing that `StateFlow` is much more appropriate. Just remember to represent it appropriately, and consider, for instance, what should happen if you should show another dialog before the previous one is hidden.

```kotlin
// ViewModel
private val _dialogQueue = MutableStateFlow<List<DialogData>>(emptyList())
val dialogQueue: StateFlow<List<String>> get() = _dialog

// In case of error
_dialogQueue.update { it + getDialogFromError(error) }

// Jetpack Compose
val dialogQueue = viewModel.dialogQueue.collectAsStateWithLifecycle()

if (dialogQueue.isNotEmpty()) {
  val dialog = dialogQueue.first()
  AlertDialog(onDismissRequest = { viewModel.onDialogDismissed(dialog) }) {
    // ...
  }
}

// ViewModel function
fun onDialogDismissed(dialog: DialogData) {
  _dialogQueue.update { it - dialog }
}
```

---

## Summary

I will not have a clear answer to the question of which one is the best, as from my point of view, for most cases it does not matter that much which one you choose. However, I do agree that for important events, it is safest to use `StateFlow`. Nevertheless, for most cases, I still see the advantage of using `SharedFlow`, for its possibility of having more than one observer, or `Channel`, for its simplicity. On the other hand, I wouldn't oppose if Google developers decided to standardize on using `StateFlow` for everything, as it might be easier and safer for those who are not familiar with `SharedFlow` or `Channel`. I also agree that if we use Jetpack Compose, representing everything as a state that needs to be reflected on the screen is the most appropriate.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Representing ViewModel events with StateFlow vs. SharedFlow vs. Channel",
  "desc": "What is the best way to represent ViewModel events in Kotlin?",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/viewmodel-stateflow-sharedflow-channel.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
