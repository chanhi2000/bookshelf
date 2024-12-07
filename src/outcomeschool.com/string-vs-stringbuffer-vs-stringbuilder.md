---
lang: en-US
title: "String vs StringBuffer vs StringBuilder"
description: "Article(s) > String vs StringBuffer vs StringBuilder"
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
      content: "Article(s) > String vs StringBuffer vs StringBuilder"
    - property: og:description
      content: "String vs StringBuffer vs StringBuilder"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/outcomeschool.com/string-vs-stringbuffer-vs-stringbuilder.html
prev: /programming/java/articles/README.md
date: 2024-08-26
isOriginal: false
author: Amit Shekhar
cover: https://outcomeschool.com/static/images/blog/string-vs-stringbuffer-vs-stringbuilder.png
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
  name="String vs StringBuffer vs StringBuilder"
  desc="In this blog, we will learn about String, StringBuffer, and StringBuilder."
  url="https://outcomeschool.com/string-vs-stringbuffer-vs-stringbuilder"
  logo="https://outcomeschool.com/static/favicons/apple-touch-icon.png"
  preview="https://outcomeschool.com/static/images/blog/string-vs-stringbuffer-vs-stringbuilder.png"/>

::: info

Before we start, I would like to mention that, I have released a video playlist to help you crack the Android Interview: Check out [<FontIcon icon="fa-brands fa-youtube"/>Android Interview Questions and Answers](https://youtube.com/playlist?list=PL_I3TGB7aK6jNBMZkw3FYdJXyf7quHdI8).

:::

In this blog, we will learn about `String`, `StringBuffer`, and `StringBuilder`.

As we know, we have `String`, `StringBuffer`, and `StringBuilder` in both Java and Kotlin. So, whatever you are going to read now applies to both languages.

Let's begin.

`String`, `StringBuffer`, and `StringBuilder` are completely different. We need to know the difference to avoid misusing them. They serve different purposes, especially when it comes to mutability, thread-safe, and performance.

We will start with the String.

::: tabs

@tab <code>String</code>

- **Mutability**: `String` is immutable. A `String` can't be changed once it's made. If you change it, a new `String` object will be created.
- **Thread-Safe**: Yes, being immutable, `String` is inherently thread-safe.
- **Performance**: As the `String` is immutable, so it is slower for concatenation due to object creation. When we do frequent modifications, it can lead to performance issues due to the creation of many temporary objects.
- **Use case**: Ideal for situations where strings don't require frequent modifications or when immutability is preferred.

Now that we have learned about the `String`, it's time to learn about the `StringBuffer`.

@tab <code>StringBuffer</code>

- **Mutability**: StringBuffer is mutable. As it is mutable, it can be modified after it is created.
- **Thread-Safe**: Yes, it is thread-safe as its methods are synchronized. So, the advantage is that it can be used in multi-threaded environments.
- **Performance**: More efficient than String for frequent modifications, but slower than `StringBuilder` due to synchronization overhead.
- **Use case**: Ideal for situations where strings require frequent modifications in multi-threaded environments.

Perfect, now let's jump into the `StringBuilder`.

@tab <code>StringBuilder</code>

- **Mutability**: `StringBuilder` is mutable. As it is mutable, it can be modified after it is created.
- **Thread-Safe**: No, it is not thread-safe as its methods are not synchronized. So, the disadvantage is that it can't be used in multi-threaded environments.
- **Performance**: Most efficient for frequent string modifications in single-threaded environments.
- **Use case**: Ideal for situations where strings require frequent modifications in single-threaded environments.

:::

We now understand the differences between `String`, `StringBuffer`, and `StringBuilder`.

**Let me tabulate the difference between `String`, `StringBuffer`, and `StringBuilder`.**

| Feature | `String` | `StringBuffer` | `StringBuilder` |
| :-- | :-- | :-- | :-- |
| **Mutability** | Immutable. | Mutable. | Mutable. |
| **Thread-Safe** | Yes. | Yes. | No. |
| **Performance** | Slower for frequent modifications. | More efficient than `String` for frequent modifications, but slower than `StringBuilder` due to synchronization overhead. | Most efficient for frequent string modifications in single-threaded environments. |
| **Use case** | Ideal for situations where strings don't require frequent modifications or when immutability is preferred. | Ideal for situations where strings require frequent modifications in multi-threaded environments. | Ideal for situations where strings require frequent modifications in single-threaded environments. |

This was all about `String`, `StringBuffer`, and `StringBuilder`.

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
  "title": "String vs StringBuffer vs StringBuilder",
  "desc": "In this blog, we will learn about String, StringBuffer, and StringBuilder.",
  "link": "https://chanhi2000.github.io/bookshelf/outcomeschool.com/string-vs-stringbuffer-vs-stringbuilder.html",
  "logo": "https://outcomeschool.com/static/favicons/apple-touch-icon.png",
  "background": "rgba(78,70,220,0.2)"
}
```
