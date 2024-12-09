---
lang: en-US
title: "CoroutineContext in Kotlin"
description: "Article(s) > CoroutineContext in Kotlin"
icon: iconfont icon-kotlin
category:
  - Java
  - Kotlin
  - Article(s)
tag:
  - blog
  - outcomeschool.com
  - java
  - kotlin
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CoroutineContext in Kotlin"
    - property: og:description
      content: "CoroutineContext in Kotlin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/outcomeschool.com/coroutinecontext-in-kotlin.html
prev: /programming/java/articles/README.md
date: 2024-09-09
isOriginal: false
author: Amit Shekhar
cover: https://outcomeschool.com/static/images/blog/coroutinecontext-in-kotlin.png
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
  name="CoroutineContext in Kotlin"
  desc="In this blog, we will learn about the CoroutineContext in Kotlin by going through the source code. We will also cover how to customize it."
  url="https://outcomeschool.com/coroutinecontext-in-kotlin"
  logo="https://outcomeschool.com/static/favicons/apple-touch-icon.png"
  preview="https://outcomeschool.com/static/images/blog/coroutinecontext-in-kotlin.png"/>

::: info

Before we start, I would like to mention that, I have released a video playlist to help you crack the Android Interview: Check out [<FontIcon icon="fa-brands fa-youtube"/>Android Interview Questions and Answers](https://youtube.com/playlist?list=PL_I3TGB7aK6jNBMZkw3FYdJXyf7quHdI8).

:::

In this blog, we will learn about the CoroutineContext in Kotlin by going through the source code. We will also cover how to customize it.

We will start with the basics to understand everything about CoroutineContext.

Let's begin.

---

## What is `CoroutineContext` in Kotlin?

`CoroutineContext` is an interface in Kotlin's coroutines that helps us define the context or the environment in which a coroutine executes, using various elements.

It helps us define the following elements:

- `Dispatcher`: It helps Coroutines in deciding the thread on which the task has to be done.
- `Job`: It represents the lifecycle of a coroutine, including its cancellation and completion states.
- `CoroutineName`: It helps in providing a name for the coroutine, hence useful for debugging.
- `CoroutineExceptionHandler`: It is used to handle uncaught exceptions in coroutines.

If we see the **source code** of the `launch` in Coroutines:

```kotlin
// code changed to make it simple
fun <SomeScope>.launch(context: CoroutineContext = ...) {
    // code removed for brevity
}
```

The first parameter is `CoroutineContext`.

Now, let's see the source code of the `CoroutineContext`.

```kotlin
public interface CoroutineContext {
    public operator fun <E : Element> get(key: Key<E>): E?

    // code removed for brevity
    public operator fun plus(context: CoroutineContext): CoroutineContext
    // code removed for brevity
}
```

The source code of the Element.

```kotlin
public interface CoroutineContext {
    // code removed for brevity

    public interface Element : CoroutineContext {
        // code removed for brevity
    }
}
```

By seeing the source code, we can see that CoroutineContext has a set of elements (`CoroutineContext.Element`) and these elements define the behavior of a coroutine.

At the beginning, we learned about those four elements:

- `Dispatcher`
- `Job`
- `CoroutineName`
- `CoroutineExceptionHandler`

These elements must be the type of `CoroutineContext.Element` internally. Let me show you the **source code** to understand.

Job Source Code:

```kotlin
public interface Job : CoroutineContext.Element {
  // code removed for brevity
}
```

`Job` is of type `CoroutineContext.Element`.

Similarly, if we see the source code for Dispatcher, CoroutineName, and CoroutineExceptionHandler, we can see that they are also the type of `CoroutineContext.Element` internally.

That is why, we can create a CoroutineContext using the `plus` (+) operator to define all the elements as below:

```kotlin
val coroutineContext: CoroutineContext =
    Dispatchers.IO +
    Job() +
    CoroutineName("OutcomeSchoolCoroutine") +
    CoroutineExceptionHandler { _, _ -> /* Handle Exception */ }
```

And then use it like below:

```kotlin
GlobalScope.launch(coroutineContext) {
  // do some work
}
```

::: note

I have used GlobalScope for quick examples, we should avoid using it at all costs. In an Android project, we should use custom scopes based on our usecase such as `lifecycleScope`, `viewModelScope` etc.

:::

Now we need to learn how to define and use each of the above-mentioned elements. To do this, we'll explore the customizations that can be easily made within the CoroutineContext.

---

## Customization in CoroutineContext

Let's see the `Hello World` of the Coroutine:

```kotlin
GlobalScope.launch {
  // do some work
}
```

In the example mentioned above, the default `CoroutineContext` will be used since we have not provided a custom `CoroutineContext`.

As we know, `CoroutineContext` helps manage the `Dispatcher`, `Job`, `CoroutineName`, and `CoroutineExceptionHandler`. We can modify one or more of these elements based on our use case.

Initially, we will start by changing only the `Dispatcher` to gain a basic understanding.

We can write the code as below:

```kotlin
GlobalScope.launch(Dispatchers.IO) {
  // do some work
}
```

Here, we have specified the `Dispatcher` for the Coroutine to use during task execution. The task will be executed on the IO `Dispatcher`.

Now, let's suppose we want to change the CoroutineName in addition to the `Dispatcher`.

We can write the code as below:

```kotlin
GlobalScope.launch(Dispatchers.IO + CoroutineName("OutcomeSchoolCoroutine")) {
  // do some work
}
```

Here, we have used the plus operator.

Now, suppose we want to change other parameters in addition to the `Dispatcher` and `CoroutineName`. We can use the `+` operator again to add the other parameters as shown below:

```kotlin
GlobalScope.launch(
    Dispatchers.IO +
            Job() +
            CoroutineName("OutcomeSchoolCoroutine") +
            CoroutineExceptionHandler { _, _ -> /* Handle Exception */ }
) {
  // do some work
}
```

Or, we can create a `CoroutineContext`:

```kotlin
val coroutineContext: CoroutineContext =
    Dispatchers.IO +
    Job() +
    CoroutineName("OutcomeSchoolCoroutine") +
    CoroutineExceptionHandler { _, _ -> /* Handle Exception */ }
```

And then use it like below:

```kotlin
GlobalScope.launch(coroutineContext) {
  // do some work
}
```

This is how we can easily customize the `CoroutineContext`.

Now, we have understood the `CoroutineContext` in Kotlin.

Prepare yourself for Android Interview: [Android Interview Questions (<FontIcon icon="iconfont icon-github"/>`amitshekhariitbhu/android-interview-questions`)](https://github.com/amitshekhariitbhu/android-interview-questions)

<SiteInfo
  name="amitshekhariitbhu/android-interview-questions"
  desc="Your Cheat Sheet For Android Interview - Android Interview Questions and Answers"
  url="https://github.com/amitshekhariitbhu/android-interview-questions/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/96704265/3a1039a7-29ee-425d-b4ea-53fcff2c1db7"/>

That's it for now.

Thanks

::: info Amit Shekhar

You can connect with me on:

- [X (<FontIcon icon="fa-brands fa-x-twitter"/>`amitiitbhu`](https://twitter.com/amitiitbhu)
- [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`amit-shekhar-iitbhu`](https://linkedin.com/in/amit-shekhar-iitbhu)
- [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`amitshekhar`)](https://youtube.com/@amitshekhar)
- [GitHub (<FontIcon icon="iconfont icon-github"/>`amitshekhariitbhu`](https://github.com/amitshekhariitbhu)

Follow Outcome School on:

- [X (<FontIcon icon="fa-brands fa-x-twitter"/>`outcome_school`)](https://twitter.com/outcome_school)
- [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`outcomeschool`)](https://linkedin.com/company/outcomeschool)
- [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`OutcomeSchool`)](https://youtube.com/@OutcomeSchool)
- [GitHub (<FontIcon icon="iconfont icon-github"/>`OutcomeSchool`)](http://github.com/OutcomeSchool)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CoroutineContext in Kotlin",
  "desc": "In this blog, we will learn about the CoroutineContext in Kotlin by going through the source code. We will also cover how to customize it.",
  "link": "https://chanhi2000.github.io/bookshelf/outcomeschool.com/coroutinecontext-in-kotlin.html",
  "logo": "https://outcomeschool.com/static/favicons/apple-touch-icon.png",
  "background": "rgba(78,70,220,0.2)"
}
```
