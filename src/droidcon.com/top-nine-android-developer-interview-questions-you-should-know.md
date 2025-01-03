---
lang: en-US
title: "Top Nine Android Developer Interview Questions You Should Know"
description: "Article(s) > Top Nine Android Developer Interview Questions You Should Know"
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
      content: "Article(s) > Top Nine Android Developer Interview Questions You Should Know"
    - property: og:description
      content: "Top Nine Android Developer Interview Questions You Should Know"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/top-nine-android-developer-interview-questions-you-should-know.html
prev: /programming/java-android/articles/README.md
date: 2024-11-22
isOriginal: false
author: 
  - name: Jaewoong Eum
    url: https://github.com/skydoves/
cover: https://droidcon.com/wp-content/uploads/2024/11/1_QhM1jZ56sVMbyc0hgOgRPw-1024x682.webp
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
  name="Top Nine Android Developer Interview Questions You Should Know"
  desc="When applying for a job as an Android developer, you’ll need expertise in Android, Kotlin, and other relevant skills, depending on the team you’re joining. While it’s impossible to predict every interview question, you can prepare by mastering the fundamental knowledge essential for working as an Android developer."
  url="https://droidcon.com/top-nine-android-developer-interview-questions-you-should-know"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_QhM1jZ56sVMbyc0hgOgRPw-1024x682.webp"/>

When applying for a job as an Android developer, you’ll need expertise in Android, Kotlin, and other relevant skills, depending on the team you’re joining. While it’s impossible to predict every interview question, you can prepare by mastering the fundamental knowledge essential for working as an Android developer.

The best way to prepare for an interview is to review the minimum requirements and preferred qualifications for the role, ensuring you align with the team’s needs. Interview questions can vary widely depending on the team, the company’s industry, and its development culture. As a result, tailoring your preparation to the specific team and company is crucial for success.

While preferred requirements can vary greatly between teams, some common questions tend to surface universally for Android developer roles. In this article, you’ll discover the top nine Android developer interview questions featured in [*Dove Letter* (<FontIcon icon="iconfont icon-github"/>`doveletter`)](https://github.com/doveletter). [**_Dove Letter_** (<FontIcon icon="iconfont icon-github"/>`doveletter`)](https://github.com/doveletter) is a subscription repository where you can learn, discuss, and share new insights about Android and Kotlin with industrial Android developer interview questions, tips with code, articles, discussion, and trending news. If you’re interested in joining, be sure to check out “[Learn Kotlin and Android With Dove Letter (<FontIcon icon="fa-brands fa-medium"/>`skydoves`)](https://medium.com/@skydoves/learn-kotlin-and-android-with-dove-letter-26265da11903).”

---

## Android

Android boasts over a decade of history, with [<FontIcon icon="fa-brands fa-android"/>Android 15 announced](https://developer.android.com/about/versions/15) already, reflecting significant technical advancements over time. Despite these changes, the core systems and components, such as the Activity and Fragment lifecycles or Intents, have remained largely consistent. Understanding these fundamental systems, even if they feel like “old-school” technologies, is still crucial for any Android developer.

### 1. Describe the Activity Lifecycle

The Android Activity lifecycle describes the different states an activity goes through during its lifetime, from creation to destruction. Understanding these states is crucial for managing resources effectively, handling user input, and ensuring a smooth user experience. Here are the main stages of the Activity lifecycle:

![](https://droidcon.com/wp-content/uploads/2024/11/0_2JUysSUqWQyzgxIX-232x300.webp)

The activity lifecycle

1. `onCreate()`: This is the first method called when an activity is created. It’s where you initialize the activity, set up UI components, and restore any saved instance state. It’s only called once during the activity’s lifecycle unless the activity is destroyed and recreated.
2. `onStart()`: The activity becomes visible to the user but is not yet interactive. This is called after onCreate() and before onResume().
3. `onRestart()`: If the activity is stopped and then restarted (e.g., the user navigates back to it), this method is called before onStart().
4. `onResume()`: The activity is in the foreground and the user can interact with it. This is where you resume any paused UI updates, animations, or input listeners.
5. `onPause()`: This is called when the activity is partially obscured by another activity (e.g., a dialog). The activity is still visible but not in focus. It’s often used to pause operations like animations, sensor updates, or saving data.
6. `onStop()`: The activity is no longer visible to the user (for example, when another activity comes to the foreground). You should release resources that are not needed while the activity is stopped, such as background tasks or heavy objects.
7. `onDestroy()`: This is called before the activity is fully destroyed and removed from memory. It’s the final clean-up method for releasing all remaining resources.

#### Summary

An activity goes through these methods based on user interactions and the Android system’s management of app resources. Developers use these callbacks to manage transitions, conserve resources, and provide a smooth experience for users. For more details, check out [<FontIcon icon="fa-brands fa-android"/>the Android official documentation](https://developer.android.com/reference/android/app/Activity).

::: note

You might also encounter related questions, such as those about the Fragment lifecycle or View lifecycle in Android. For more insights, be sure to check out [Dove Letter (<FontIcon icon="iconfont icon-github"/>`doveletter`)](https://github.com/doveletter).

:::

### 2. What is an Intent?

An Intent in Android is an abstract description of an operation to be performed. It serves as a messaging object that allows activities, services, and broadcast receivers to communicate. Intents are typically used to start an activity, send a broadcast, or initiate a service. They can also pass data between components, making them a fundamental part of Android’s component-based architecture.

There are two primary types of intents in Android: **explicit** and **implicit**.

#### A. Explicit Intent

::: tabs

@tab:active Definition

An explicit intent specifies the exact component (activity or service) to be invoked by directly naming it.

@tab Use Case

Explicit intents are used when you know the target component (e.g., starting a specific activity within your app).

@tab Scenario

If you switch from one activity to another within the same app, you use explicit intent.

:::

::: tip Example

```kotlin title="intent.kt"
val intent = Intent(this, TargetActivity::class.java) 
startActivity(intent)
```

<!-- @include: https://gist.github.com/skydoves/e3eae2bb9bcbef8b0911c7e0edf287b9/raw/9f7874027c286bb58d96382258cf6c678737cedc/intent.kt -->

:::

#### B. Implicit Intent

::: tabs

@tab:active Definition

An implicit intent does not specify a specific component but declares a general action to be performed. The system resolves which component(s) can handle the intent based on the action, category, and data.

@tab Use Case

Implicit intents are useful when you want to perform an action that other apps or system components can handle (e.g., opening a URL or sharing content).

@tab Scenario

If you open a web page in a browser or share content with other apps, you use an implicit intent. The system will decide which app to handle the intent.

:::

::: tip Example

```kotlin title="intent_implicit.kt"
val intent = Intent(Intent.ACTION_VIEW) 
intent.data = Uri.parse("https://www.example.com") 
startActivity(intent)
```

<!-- @include: https://gist.github.com/skydoves/4be1b8da508f43bc2a49c0b3bb5a428b/raw/212880786dd71369b666b33adedfe0de7bb2265c/intent_implicit.kt -->

:::

#### Summary

Explicit intents are used for internal app navigation where the target component is known. Implicit intents are used for actions that external apps or other components may handle without directly specifying the target. This makes the Android ecosystem more flexible and allows apps to interact seamlessly.

### 3. What’s the difference between Serialization and Parcelable?

In Android, both `Serializable` and `Parcelable` are mechanisms used to pass data between different components (such as activities or fragments), but they function differently in terms of performance and implementation. Here’s a comparison of the two:

#### `Serializable`

- **Java Standard Interface**: `Serializable` is a standard Java interface used to convert an object into a byte stream, which can then be passed between activities or written to disk.
- **Reflection-Based:** It works through Java reflection, meaning the system dynamically inspects the class and its fields at runtime to serialize the object.
- **Performance:** `Serializable` is slower compared to `Parcelable` because reflection is a slow process. It also generates a lot of temporary objects during serialization, increasing the memory overhead.
- **Use Case:** `Serializable` is useful in scenarios where performance is not critical or when dealing with non-Android-specific codebases.

#### `Parcelable`

- **Android-Specific Interface:** `Parcelable` is an Android-specific interface designed specifically for high-performance inter-process communication (IPC) within Android components.
- **Performance:** `Parcelable` is faster than `Serializable` because it’s optimized for Android and doesn’t rely on reflection. It minimizes garbage collection by avoiding creating many temporary objects.
- **Use Case:** `Parcelable` is preferred for passing data in Android when performance is important, especially for IPC or passing data between activities or services.

#### Summary

In general, `Parcelable` is the recommended approach for Android applications due to its better performance in most use cases. However, if you need simplicity and performance is not a concern, `Serializable` might be easier to implement.

- Use `Serializable` for simpler cases when dealing with non-performance-critical operations or when working with non-Android-specific code.
- Use `Parcelable` when working with Android-specific components where performance matters, as it is much more efficient for Android’s IPC mechanism.

---

## Kotlin

Since Google announced its [<FontIcon icon="fa-brands fa-android"/>Kotlin-first approach to Android development](https://developer.android.com/kotlin/first) at Google I/O 2019, the adoption of Kotlin has skyrocketed. By the end of 2024, the majority of Android projects have transitioned to Kotlin, especially with [<FontIcon icon="iconfont icon-jetpack-compose"/>Jetpack Compose reaching its stable release](https://android-developers.googleblog.com/2021/07/jetpack-compose-announcement.html) and gaining widespread popularity. So, in most cases, most of the team is likely using Kotlin instead of Java in most cases nowadays.

### 1. What is data class in Kotlin? How does a data class in Kotlin differ from a regular class?

In Kotlin, the [<FontIcon icon="iconfont icon-kotlin"/>data class](https://kotlinlang.org/docs/data-classes.html) is a special type of class specifically designed to hold data. Kotlin generates several useful methods automatically for data classes, which makes them ideal for representing simple data-holding objects.

::: important Key Features of Data Classes

When you declare a data class, Kotlin automatically generates the following:

1. `equals()`: Compares two instances of the class for equality based on their properties.
2. `hashCode()`: Generates a hash code based on the properties.
3. `toString()`: Provides a string representation of the object with its property values.
4. `copy()`: Allows for creating a new object with some properties copied from the existing one, with the option to modify specific values.
5. **Component functions**: For de-structuring declarations (e.g., `component1()`, `component2()`), allowing you to extract properties easily.

:::

::: tip Example

In the example below, Kotlin automatically provides `equals()`, `hashCode()`, `toString()`, and `copy()` for the `User` class.

```kotlin title="data_class.kt"
data class User(val name: String, val age: Int)
```

<!-- @include: https://gist.github.com/skydoves/e45072a1b5ed19a73c237aeb7a43bdcf/raw/0125b70c3d9b7d96f1d0e7a6ef00bd620ccdebc2/data_class.kt -->

:::

::: info Differences Between Data Class and Normal Class

1. **Boilerplate Reduction**: In a normal class, you would need to manually override `equals()`, `hashCode()`, `toString()`, and other utility methods. With a data class, Kotlin generates these for you automatically.
2. **Primary Constructor Requirement**: A data class requires at least one property to be declared in the primary constructor, whereas a normal class does not.
3. **Use Case**: Data classes are primarily used for holding immutable data (though you can use mutable properties), whereas normal classes can be used for any kind of behavior or logic.

:::

::: tip Example of Normal Class for Comparison  

In the example above, Kotlin automatically provides `equals()`, `hashCode()`, `toString()`, and `copy()` for the `User` class.

```kotlin title="data_class_2"
class Person(val name: String, val age: Int)
```

<!-- @include: https://gist.github.com/skydoves/0ad118ae59c8f0512f03044e4b5909c0/raw/63f0aa982222ef844ec2ad7cc26b09c9bbdc04d1/data_class_2.kt -->

:::

#### Summary

Data classes are used for objects that only contain data, and Kotlin automatically generates utility methods like `equals()`, `hashCode()`, `toString()`, and `copy()`. A normal class is more flexible but doesn’t provide those methods by default, making it more suited for objects with behavior and complex logic.

### 2. What’s the Extension, and what are its pros and cons?

The [<FontIcon icon="iconfont icon-kotlin"/>Extensions](https://kotlinlang.org/docs/extensions.html) is a way to add new functionality to existing classes without modifying their code directly. Kotlin allows you to “extend” a class with new functions or properties using extension functions and extension properties. This is especially useful for enhancing classes from third-party libraries or the standard library where you don’t have access to the source code.

::: tip Example of an Extension Function

Suppose you want to add a `isEven()` function to the `Int` class. You can do it like this:

```kotlin title="extension.kt"
fun Int.isEven(): Boolean {
    return this % 2 == 0
}

val number = 4
println(number.isEven())  // Output: true
```

<!-- @include: https://gist.github.com/skydoves/4cb5ad0823c85ccc15075294b1853375/raw/73af39adcfa1a0eb242b4cd9c93cff16cd45769c/extension.kt -->

Here, `isEven()` becomes a new function available to all `Int` objects, even though you haven’t modified the `Int` class itself.

:::

::: tip Example of an Extension Property

Kotlin also allows you to add new properties to a class in a similar way. Note that these properties can’t store state and are just syntactic sugar for getter functions.

```kotlin title="extension_string.kt"
val String.firstChar: Char
    get() = this[0]

val text = "Hello"
println(text.firstChar)  // Output: H
```

<!-- @include: https://gist.github.com/skydoves/dac40d947800843879199a70c9410618/raw/de32bff6fd002366151cf55680c196caef4fd750/extension_string.kt -->

Another great example is adding an extension property to an existing type:

```kotlin title="string_companion.kt"
val String.Companion.Empty: String
  get() = ""

// Usage
val fakeUser = User.createUser(name = String.Empty) // instead of User.createUser(name = "")
```

:::

::: tabs

@tab:active Pros

1. **Enhanced Readability**: Extensions make code more readable and expressive.
2. **Modularity**: They allow you to add functionality without modifying the original class.
3. **Code Reusability**: Extensions can be reused across different parts of your application, helping to avoid boilerplate code.

While Kotlin extensions are powerful and flexible, they come with disadvantages and limitations.

@tab Cons

1. **Potential for Confusion**: Extensions can sometimes lead to confusion, especially if they clash with functions already present in the class or if there are multiple extensions with similar names. In cases where both an extension function and a member function have the same name, the member function takes precedence, which can be unintuitive.
2. **Overuse Can Lead to Poor Code Organization**: Overusing extensions to add numerous functions to existing classes can make code harder to navigate and maintain, especially if these functions are spread across various files or modules. This can lead to a bloated API and make the codebase less cohesive.
3. **Hard to Trace Origin of Functions**: In large codebases, it can be difficult to locate where an extension function is defined, as it may be in a different module or package. This makes code navigation and debugging more challenging.

:::

#### Summary

Extensions in Kotlin are powerful tools that enhance functionality in a clean, modular way without requiring inheritance or modification of the original class. While Kotlin extensions offer convenience and flexibility, they should be used judiciously to avoid complications and maintain clear, maintainable code.

### 3. What’s the difference between Coroutines and Thread?

The difference between [<FontIcon icon="iconfont icon-kotlin"/>Kotlin Coroutines](https://kotlinlang.org/docs/coroutines-overview.html) and Threads in Android (and Kotlin in general) lies in how they manage concurrency, resource consumption, and performance.

#### A. Lightweight vs. Heavyweight

Coroutines are lightweight. They run within a single thread but can be suspended without blocking the thread. This allows thousands of coroutines to run concurrently on fewer threads with minimal overhead. Threads, on the other hand, are heavyweight. Each thread has its own memory and resources, and switching between threads involves more overhead, leading to higher resource consumption when dealing with many threads.

#### B. Concurrency vs. Parallelism

Coroutines offer concurrency by allowing multiple tasks to be suspended and resumed without occupying a separate thread. They do not necessarily run tasks in parallel but allow cooperative multitasking. Threads offer parallelism by running tasks simultaneously on multiple cores. Each thread can perform tasks independently, which can be useful for CPU-bound operations.

#### C. Thread Blocking vs. Suspension

Coroutines use a suspension mechanism, meaning they do not block a thread while waiting for a task to complete. When a coroutine is suspended (e.g., while waiting for a network response), the underlying thread can execute other coroutines. Threads perform blocking operations. If a thread is waiting for an I/O operation or sleep call, it will not be able to perform other tasks.

#### D. Efficiency

Coroutines are more efficient regarding memory and CPU usage because they avoid context-switching between threads and use fewer system resources. Threads consume more resources due to the overhead of thread creation, scheduling, and context switching between threads.

#### E. Context Switching

Coroutines allow switching between tasks using suspension points (like `delay()` or `withContext()`), which is less expensive than switching between threads. Threads involve context switching handled by the operating system, which can be more costly in terms of performance.

#### F. Use Cases

Coroutines are ideal for I/O-bound tasks, like making network requests, handling database operations, and UI updates. Threads are better suited for CPU-bound tasks, where actual parallel computation (e.g., intensive image processing, large computations) may be needed.

#### G. Error Handling

Coroutines provide structured concurrency APIs like `Job`, `CoroutineExceptionHandler` to handle exceptions and cancel tasks easily, and coroutine builder, such as `launch` and `async`, which immediately propagates exceptions. Threads require more manual error handling (try-catch or `uncaughtExceptionHandler`) and coordination for task cancellation and exception propagation.

#### Summary

Coroutines are more suitable for managing large numbers of tasks concurrently with minimal overhead, while Threads are better for parallel execution when multiple CPU cores are required.

::: note

You might also encounter related questions, such as those about the sealed/companion classes or Flow, StateFlow, and SharedFlow. For more insights, be sure to check out [Dove Letter (<FontIcon icon="iconfont icon-github"/>`doveletter`)](https://github.com/doveletter).

:::

---

## Jetpack Compose

Jetpack Compose, Google’s modern UI toolkit, has demonstrated tremendous potential since [<FontIcon icon="iconfont icon-jetpack-compose"/>its stable 1.0 release](https://android-developers.googleblog.com/2021/07/jetpack-compose-announcement.html). Its adoption for production has soared, with over 125,000 apps built with Jetpack Compose now live on the Google Play Store, [according to Google (<FontIcon icon="fa-brands fa-x-twitter"/>`AndroidDev`)](https://x.com/AndroidDev/status/1726662755724181663).

However, many companies are still in the process of adopting Jetpack Compose or considering a migration from traditional View systems, as transitioning an entire large-scale project can be costly. Whether Jetpack Compose-related questions are part of an interview will largely depend on the specific company.

### 1. What’s Recomposition?

Recomposition in Jetpack Compose is the process by which the framework redraws parts of the UI to reflect updated data or state. Instead of redrawing the entire screen, Compose smartly “recomposes” (smart recomposition) only the parts of the UI that need to change, making it more efficient than traditional UI frameworks.

![](https://droidcon.com/wp-content/uploads/2024/11/0_XV2hmtrsfi1kBxmz-1-300x176.webp)

#### How Recomposition Works

1. **State-Driven UI**: Compose is a declarative UI framework where the UI is built based on the current state. When state changes, Compose triggers recomposition for the affected parts of the UI tree.
2. **Selective Redraw**: Only the composable functions that rely on the updated state will recompose. If a composable function doesn’t depend on the changed state, it will not recompose, making the UI update more efficient.
3. **Composable Functions**: Recomposition happens at the function level, where Compose calls the affected composable functions again with the new data. Compose reuses as much as possible from the previous composition to avoid unnecessary redraws.

For example, imagine there’s a text displaying a click count and a button that increments this count each time the user clicks it.

```kotlin title="counter.kt"
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Column {
        Text("Count: $count")
        Button(onClick = { count++ }) {
            Text("Increase")
        }
    }
}
```

<!-- @include: https://gist.github.com/skydoves/f93d15e360e328b10474d4c220d0478f/raw/fd264ba205a702ca238db81cf46a1054fa7018c1/counter.kt -->

The example above plays:

- Each time the button is clicked, `count` is updated, triggering recomposition of the `Counter` function.
- Compose redraws only the `Text` composable showing the count value, rather than the entire UI.

To summarize, the key points about recomposition are:

- **State-Driven**: Recomposition occurs when state changes. `remember` and `mutableStateOf` are commonly used to hold state that affects recomposition.
- **Optimized Performance**: Compose tries to recompose only what’s necessary, helping to improve performance.
- **Idempotency**: Composable functions should be designed to produce the same UI output for the same input, making recomposition reliable.

The Jetpack Compose Runtime library offers several functions that are closely related to state management, designed to either preserve data across recompositions or handle side effects efficiently.

- `remember`: Caches values across recompositions, so they aren’t reset each time.
- `derivedStateOf`: Optimizes recomposition by only triggering when the derived state changes.
- `LaunchedEffect`, `SideEffect`, and `DisposableEffect`: Manage side effects in composable functions across recompositions.

#### Summary

Recomposition is the process that updates and redraws UI elements based on new states, focusing only on parts of the UI that need to change. This approach, known as “smart recomposition,” allows Jetpack Compose to efficiently update the UI, preserving responsiveness by keeping it synchronized with the current state.

### 2. What’s State Hoisting?

State hoisting in Jetpack Compose refers to a design pattern where you “hoist” the state up to the caller or parent composable, allowing the parent to control the state while the child composable only focuses on displaying the UI. This concept is inspired by React’s state management approach. The main goal of state hoisting is to separate concerns, keeping UI components stateless and promoting reusability and easier testing.

In state hoisting:

- State is managed in the parent composable.
- Events or triggers (like onClick, onValueChange) are passed from the child back to the parent, which updates the state.
- The updated state is then passed back down as parameters to the child, creating a unidirectional data flow.

::: tip Example

```kotlin title="state_hoisting.kt"
@Composable
fun Parent() {
    var sliderValue by remember { mutableStateOf(0f) }

    SliderComponent(
        value = sliderValue,
        onValueChange = { sliderValue = it }
    )
}

@Composable
fun SliderComponent(value: Float, onValueChange: (Float) -> Unit) {
    Slider(value = value, onValueChange = onValueChange)
}
```

<!-- @include: https://gist.github.com/skydoves/8eaf50d8dcc3306c27ae1d78402d4cc4/raw/9df41e4177024100889d6c9787f5ded3a850ef18/state_hoisting.kt -->

In this example, the `Parent` composable manages the state (`sliderValue`), while the `SliderComponent` is stateless and receives both the value and the event handler from the parent. This approach promotes better structure and maintainability in Compose applications.

:::

State hoisting in Jetpack Compose offers several benefits below:

1. **Single Source of Truth**: State hoisting ensures that the state is managed in a single place (usually the parent composable), preventing conflicting states between child and parent composables. This improves data consistency across the app.
2. **Reusability**: Since child composables don’t manage their own state, they can be reused in different parts of the app. You can pass different states and event handlers, making components more versatile and reusable.
3. **Separation of Concerns**: By hoisting state to the parent, you can keep your child composables stateless, focusing purely on rendering the UI. This makes components simpler, easier to read, and maintain.
4. **Improved Testability**: Stateless composables are easier to test because they don’t have to manage state internally. You can pass in different states and event handlers to simulate various scenarios.
5. **Unidirectional Data Flow**: State hoisting enforces a unidirectional data flow, where the state is passed down from the parent, and events are sent back up, making the flow of data more predictable and easier to debug.
6. **Better Control Over Lifecycle**: When the state is managed in the parent, you have better control over its lifecycle. The parent can decide when and how the state should change, which can improve performance and efficiency in managing resources like memory.

These benefits collectively improve the overall structure, maintainability, and scalability of your Jetpack Compose codebase.

#### Summary

You should hoist UI state to the lowest common ancestor of all the composables that need to read or modify that state. Keeping the state as close as possible to where it is consumed helps maintain a clean separation of concerns and ensures efficient data flow. From the state owner, expose an immutable state to consumers along with events or callbacks that allow them to modify the state as needed. For more details, refer to [<FontIcon icon="fa-brands fa-android"/>Where to hoist state](https://developer.android.com/develop/ui/compose/state-hoisting).

### 3. What are side-effects

In Jetpack Compose, a side effect refers to any operation that affects state outside the scope of the composable function or persists beyond its recomposition. Since composables are designed to be pure functions that simply render UI based on the current state, side effects are used when you need to perform actions outside the composable function’s lifecycle, like updating shared state, triggering one-time events, or interacting with external resources.

Jetpack Compose provides several side-effect APIs to handle these scenarios safely and predictably, such as `LaunchedEffect`, `SideEffect`, and `DisposableEffect`.

#### A. `LaunchedEffect`: Used for launching coroutines in a composable

`LaunchedEffect` allows you to start a coroutine in response to certain key state changes. It runs within the `Composition` and will cancel and restart if the specified key changes, making it useful for one-time or reactive tasks, such as fetching data or handling animations.

::: tip Example

```kotlin title="launchedeffect.kt"
@Composable
fun MyScreen(userId: String) {
    LaunchedEffect(userId) {
        // Runs when `userId` changes, or when entering the composition
        fetchDataForUser(userId)
    }
}
```

<!-- @include: https://gist.github.com/skydoves/0c8e929bdea9383d506e6692b4b02fb9/raw/8bca2746d0ab84c4e5b68e967e7f2dece4f73d43/launchedeffect.kt -->

:::

#### B. `SideEffect`: Used to perform non-restartable side effects

`SideEffect` is invoked every time a composable successfully recomposes. It’s used for performing lightweight, non-restartable actions like updating a mutable shared object or logging.

::: tip Example

```kotlin title="sideeffect.kt"
@Composable
fun MyComposable(screenName: String) {
    SideEffect {
        // Runs after each recomposition, ideal for analytics or logging
        logScreenView(screenName)
    }
}
```

<!-- @include: https://gist.github.com/skydoves/08fda371ce01303eb55d2cdf7d3e7688/raw/3f73348893a8667cbd335b62a6b8cf5190f40d2e/sideeffect.kt -->

:::

#### C. `DisposableEffect`: Used for effects that need cleanup

- `DisposableEffect` is used for actions that require both setup and cleanup, such as registering a listener or resource that should be released when the composition leaves the screen or is recomposed. This API lets you define `onDispose` block, which will be invoked when the Composable function’s lifecycle is ended up.

::: tip Example

```kotlin title="disposable.kt"
@Composable
fun MyComposableWithListener(listener: SomeListener) {
    DisposableEffect(listener) {
        listener.register()  // Called when entering the composition
        onDispose {
            listener.unregister()  // Called when leaving the composition
        }
    }
}
```

<!-- @include: https://gist.github.com/skydoves/7bd124f79660e82cd58d64ccd7e8b0e0/raw/c9284cd9c721de62243f47a64a6b911fb85f8bba/disposable.kt -->

:::

#### Summary

Using these side-effect APIs properly allows you to manage external resources, events, and state changes efficiently within the composable lifecycle, maintaining a clean, predictable UI. For more information, check out the official Android docs [<FontIcon icon="fa-brands fa-android"/>Side-effects in Compose](https://developer.android.com/develop/ui/compose/side-effects).

- `LaunchedEffect`: Triggers a coroutine based on state changes; ideal for async actions like data loading.
- `SideEffect`: Executes non-restartable code after each recomposition; useful for logging or relevant actions.
- `DisposableEffect`: Manages effects with setup and cleanup/disposing requirements, such as resource listeners.

---

## Conclusion

In this article, you’ve explored the top nine Android developer interview questions you might encounter during the hiring process. Remember, interview questions can vary significantly based on the role, team culture, industry, and even the interviewers themselves. It’s essential to tailor your preparation to align with the specific company and position you’re applying for.

All these interview questions are covered in [Dove Letter (<FontIcon icon="iconfont icon-github"/>`doveletter`)](https://github.com/doveletter/), a private repository offering daily insights on Android and Kotlin, including topics like Compose, architecture, industry interview questions, and practical code tips. **In just 15 weeks since its launch, Dove Letter has surpassed 350 individual subscribers and 8 business/lifetime subscribers**. If you’re eager to deepen your knowledge of Android, Kotlin, and Compose, be sure to check out ‘[Learn Kotlin and Android With Dove Letter (<FontIcon icon="fa-brands fa-medium"/>`skydoves`)](https://medium.com/@skydoves/learn-kotlin-and-android-with-dove-letter-26265da11903)’.

As always, happy coding!

<SiteInfo
  name="skydoves - Overview"
  desc="Lead Android Developer Advocate @GetStream 🥑 • GDE for Android & Kotlin • Open Source Software Engineer ❤️  • Coffee Lover • Found @doveletter. - skydoves"
  url="https://github.com/skydoves/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://avatars.githubusercontent.com/u/24237865?v=4?s=400"/>

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/top-9-android-developer-interview-questions-you-should-know-05e8fe2acd2c)

<SiteInfo
  name="Top Nine Android Developer Interview Questions You Should Know"
  desc="When applying for a job as an Android developer, you’ll need expertise in Android, Kotlin, and other relevant skills, depending on the team…"
  url="https://proandroiddev.com/top-9-android-developer-interview-questions-you-should-know-05e8fe2acd2c/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*QhM1jZ56sVMbyc0hgOgRPw.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Top Nine Android Developer Interview Questions You Should Know",
  "desc": "When applying for a job as an Android developer, you’ll need expertise in Android, Kotlin, and other relevant skills, depending on the team you’re joining. While it’s impossible to predict every interview question, you can prepare by mastering the fundamental knowledge essential for working as an Android developer.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/top-nine-android-developer-interview-questions-you-should-know.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
