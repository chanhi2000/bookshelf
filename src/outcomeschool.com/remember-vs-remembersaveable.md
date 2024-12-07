---
lang: en-US
title: "remember vs rememberSaveable"
description: "Article(s) > remember vs rememberSaveable"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - outcomeschool.com
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > remember vs rememberSaveable"
    - property: og:description
      content: "remember vs rememberSaveable"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/outcomeschool.com/remember-vs-remembersaveable.html
prev: /programming/java-android/articles/README.md
date: 2024-03-06
isOriginal: false
author: Amit Shekhar
cover: https://outcomeschool.com/static/images/blog/remember-vs-remembersaveable.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="remember vs rememberSaveable"
  desc="In this blog, we will learn about the difference between remember and rememberSaveable in Jetpack Compose."
  url="https://outcomeschool.com/remember-vs-remembersaveable"
  logo="https://outcomeschool.com/static/favicons/apple-touch-icon.png"
  preview="https://outcomeschool.com/static/images/blog/remember-vs-remembersaveable.png"/>

::: info

Before we start, I would like to mention that, I have released a video playlist to help you crack the Android Interview: Check out [<FontIcon icon="fa-brands fa-youtube"/>Android Interview Questions and Answers](https://youtube.com/playlist?list=PL_I3TGB7aK6jNBMZkw3FYdJXyf7quHdI8).

:::

In this blog, we will learn about the difference between `remember` and `rememberSaveable` in Jetpack Compose.

We use both the functions `remember` and `rememberSaveable` in Jetpack Compose to manage the state within the composable functions. However, they differ in the scope of state persistence. We will start with a very basic example to get an idea of why we have these functions in the first place.

Let's see the below example without using anything like `remember` or `rememberSaveable` to manage the state within the composables.

```kotlin
@Composable
fun CounterButtonWithoutRemember() {
    val count = mutableStateOf(0)

    Text("Counter : ${count.value}")

    Button(onClick = { count.value++ }) {
        Text("Click Me")
    }
}
```

When we run the above example, and click on the button, we will notice that the value in the text will always be zero, although we have written the code to increase the counter on every click of the button.

It is important to know the reason why this is happening.

Whenever the recomposition happens due to various reasons such as data change, the composable function gets called again.

Imagine the function in the above example getting called again, we will realize that the count will be reset to zero. And, that's the reason the value in the text is always zero.

What is the solution to this problem?

Answer: `remember` function is the solution to this.

Let's incorporate this in the above example.

Our updated code with the `remember` function.

```kotlin
@Composable
fun CounterButtonWithRemember() {
    var count by remember { mutableStateOf(0) }

    Text("Counter : $count")

    Button(onClick = { count++ }) {
        Text("Click Me")
    }
}
```

Now, when we run the above example, and click on the button, we will notice that the value in the text is getting reflected as expected.

The problem is solved.

Here, the `remember` function helped us remember the state across recompositions.

Hence, `remember` is used to retain the state across recompositions.

Now, next scenario: Click on the button twice, and the value shown in the text will be 2 as we have used the `remember`. Now, suppose we do the configuration changes such as the screen rotation, the value in the text will get reset to zero again.

So, now we have another problem.

::: details What is the solution to this problem?

Answer: `rememberSaveable` function is the solution to this.

:::

Let's incorporate this in the above example.

Our updated code with the `rememberSaveable` function.

```kotlin
@Composable
fun CounterButtonWithRememberSaveable() {
    var count by rememberSaveable { mutableStateOf(0) }

    Text("Counter : $count")

    Button(onClick = { count++ }) {
        Text("Click Me")
    }
}
```

Now, when we run the above example, and click on the button, we will notice that the value in the text is getting reflected as expected even during the configuration changes such as screen rotation.

The problem is solved.

The `rememberSaveable` implements the `Bundle savedInstanceState` to retain the state across configuration changes.

Here, the `rememberSaveable` function helped us remember the state across configuration changes.

Hence, `rememberSaveable` is used to retain the state across configuration changes.

Limitation with the `rememberSaveable`: Data Type Compatibility

- **Limited to Bundle-compatible types**: rememberSaveable can automatically handle data types that can be stored in the Bundle (like primitives, strings, or objects implementing Parcelable).
- **Custom savers required for others**: If our data type isn't directly supported by Bundle, we need to write a custom saver/restorer logic.

Here, things are possible with some boilerplate code.

And we know that these are not the limitations of the ViewModel and the ViewModel gets persisted across the configuration changes.

In our Android project, we go the ViewModel instead of `rememberSaveable` to retain the state across configuration changes.

Final note:

- Use `remember` to retain the state across recompositions.
- We can go with the `rememberSaveable` to retain the state across configuration changes, but due to the limitation with the data type compatibility (which can be solved with some boilerplate code), better to use **ViewModel**.

This was all about the `remember` vs `rememberSaveable` in Jetpack Compose.

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
  "title": "remember vs rememberSaveable",
  "desc": "In this blog, we will learn about the difference between remember and rememberSaveable in Jetpack Compose.",
  "link": "https://chanhi2000.github.io/bookshelf/outcomeschool.com/remember-vs-remembersaveable.html",
  "logo": "https://outcomeschool.com/static/favicons/apple-touch-icon.png",
  "background": "rgba(78,70,220,0.2)"
}
```
