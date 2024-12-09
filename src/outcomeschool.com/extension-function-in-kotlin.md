---
lang: en-US
title: "Extension function in Kotlin"
description: "Article(s) > Extension function in Kotlin"
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
      content: "Article(s) > Extension function in Kotlin"
    - property: og:description
      content: "Extension function in Kotlin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/outcomeschool.com/extension-function-in-kotlin.html
prev: /programming/java/articles/README.md
date: 2024-08-16
isOriginal: false
author: Amit Shekhar
cover: https://outcomeschool.com/static/images/blog/extension-function-in-kotlin.png
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
  name="Extension function in Kotlin"
  desc="In this blog, we will learn about the extension function in Kotlin. We will also learn how it works internally."
  url="https://outcomeschool.com/extension-function-in-kotlin"
  logo="https://outcomeschool.com/static/favicons/apple-touch-icon.png"
  preview="https://outcomeschool.com/static/images/blog/extension-function-in-kotlin.png"/>

::: info

Before we start, I would like to mention that, I have released a video playlist to help you crack the Android Interview: Check out [<FontIcon icon="fa-brands fa-youtube"/>Android Interview Questions and Answers](https://youtube.com/playlist?list=PL_I3TGB7aK6jNBMZkw3FYdJXyf7quHdI8).

:::

In this blog, we will learn about the **extension function** in Kotlin. We will also learn how it works internally.

---

## What is an extension function in Kotlin?

An extension function in Kotlin allows us to add new functions to existing classes without modifying their source code or extending them. This is particularly useful when we want to extend a class with new capabilities but don't have access to edit its code or don't want to extend it.

Let's understand it with an example.

Syntax to create an extension function:

```kotlin
fun ClassName.functionName(parameters): ReturnType {
    // function body
}
```

Now, we will try to understand the above syntax.

- `ClassName`: The class we are extending.
- `functionName`: The name of the extension function.
- `parameters`: Parameters that the extension function takes.
- `ReturnType`: The return type of the extension function.

Let's write an extension function using the above syntax in a file named: <FontIcon icon="iconfont icon-kotlin"/>`extension.kt`.

```kotlin
fun ImageView.loadImage(url: String) {
    Glide.with(this).load(url).into(this)
}
```

Inside the above extension function, imagine we have extended the `ImageView` class, so, `this` represents `ImageView` Object.

Using the above extension function:

```kotlin
imageView.loadImage("someUrl")
```

If you notice, we added a function to the ImageView without modifying its source code or extending it.

The best part is that, even though it’s defined outside the class it extends, the function behaves as if it were a member of that class. It’s called just like any other class method, making the syntax seamless and natural.

---

## How does it work internally?

When we call an extension function on an object, the compiler passes the object as the first argument to the function.

Now, we need to decompile this code. For that, we will have to convert this Kotlin source file to a Java source file.

Steps to convert from Kotlin source file to Java source file and decompile in Android Studio:

- `Tools` > `Kotlin` > `Show Kotlin Bytecode`. You will get the bytecode of your Kotlin file.
- Now click on the `Decompile` button to get your Java code from the bytecode.

Here, I have kept only the important lines of the code and removed other lines for brevity.

We will get the following output:

```java
public final class ExtensionKt {
   public static final void loadImage(ImageView imageView, String url) {
      Glide.with(imageView).load(url).into(imageView);
   }
}
```

Here, a **final** class has been generated with the static function `loadImage`, and most importantly, `imageView` is passed as the first argument to the function.

This is how an extension function works internally.

::: note A final note

- Extension functions are defined outside the class they extend.
- They can access the public members of the extended class.
- They cannot access the class's private or protected members.
- They do not modify the actual class but appear to add new methods.

:::

Hence, Extension functions are useful for adding functionality to classes from libraries or the standard library that we can't modify directly.

Now, we have understood the extension function in Kotlin.

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
  "title": "Extension function in Kotlin",
  "desc": "In this blog, we will learn about the extension function in Kotlin. We will also learn how it works internally.",
  "link": "https://chanhi2000.github.io/bookshelf/outcomeschool.com/extension-function-in-kotlin.html",
  "logo": "https://outcomeschool.com/static/favicons/apple-touch-icon.png",
  "background": "rgba(78,70,220,0.2)"
}
```
