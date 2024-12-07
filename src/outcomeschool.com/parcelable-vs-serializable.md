---
lang: en-US
title: "Parcelable vs Serializable"
description: "Article(s) > Parcelable vs Serializable"
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
      content: "Article(s) > Parcelable vs Serializable"
    - property: og:description
      content: "Parcelable vs Serializable"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/outcomeschool.com/parcelable-vs-serializable.html
prev: /programming/java/articles/README.md/articles/README.md
date: 2024-09-02
isOriginal: false
author: Amit Shekhar
cover: https://outcomeschool.com/static/images/blog/parcelable-vs-serializable.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Parcelable vs Serializable"
  desc="In this blog, we will learn about the difference between Parcelable and Serializable. We will also learn how they work internally."
  url="https://outcomeschool.com/parcelable-vs-serializable"
  logo="https://outcomeschool.com/static/favicons/apple-touch-icon.png"
  preview="https://outcomeschool.com/static/images/blog/parcelable-vs-serializable.png"/>

::: info

Before we start, I would like to mention that, I have released a video playlist to help you crack the Android Interview: Check out [<FontIcon icon="fa-brands fa-youtube"/>Android Interview Questions and Answers](https://youtube.com/playlist?list=PL_I3TGB7aK6jNBMZkw3FYdJXyf7quHdI8).

:::

In this blog, we will learn about the difference between `Parcelable` and `Serializable`. We will also learn how they work internally.

Let's start with a scenario: Suppose in Android, we need to pass the following `Developer` object between activities or fragments using intents or bundles.

```kotlin
data class Developer(val name: String, val age: Int)
```

We can't simply pass this `Developer` object between activities or fragments using intents or bundles.

We have two solutions as follows:

---

## Implement `Parcelable`

```kotlin
data class Developer(val name: String, val age: Int) : Parcelable {

    constructor(parcel: Parcel) : this(
        parcel.readString(),
        parcel.readInt()
    )

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(name)
        parcel.writeInt(age)
    }

    // code removed for brevity

    companion object CREATOR : Parcelable.Creator<Developer> {
        override fun createFromParcel(parcel: Parcel): Developer {
            return Developer(parcel)
        }

        override fun newArray(size: Int): Array<Developer?> {
            return arrayOfNulls(size)
        }
    }
}
```

A lot of boilerplate code, right?

To avoid this, we can use the `kotlin-parcelize` plugin and annotate the class with `@Parcelize`.

```kotlin
@Parcelize
data class Developer(val name: String, val age: Int) : Parcelable
```

When we annotate a class with `@Parcelize`, the implementation is automatically generated, similar to what we wrote above.

No boilerplate code is needed now. They are automatically generated now.

This was the first solution: By implementing `Parcelable`.

Now, let's discuss the second solution: By implementing `Serializable`.

---

## Implement Serializable

```kotlin
data class Developer(val name: String, val age: Int) : Serializable
```

Both of the above-mentioned solutions work, but they differ in terms of performance. We will discuss this below.

So, in Android development, both `Parcelable` and `Serializable` are the interfaces used to serialize objects so they can be passed between activities or fragments using intents or bundles.

Let's understand the difference between `Parcelable` and `Serializable`.

---

## `Parcelable`

Parcelable is an **Android-specific** interface designed to serialize objects to pass them through Intent and Bundle .

When we implement Parcelable, we either write the implementation manually or use a plugin that generates it for us.

It does NOT use reflection, and it creates fewer temporary objects during the serialization process, which reduces garbage collection overhead.

Two things to note:

- Parcelable does **NOT** use reflection.
- Parcelable is an **Android-specific** interface.

So, Parcelable is faster than Serializable.

---

## `Serializable`

A serializable interface in Java is a marker interface that allows an object to be converted into a stream of bytes (serialized) and then reconstructed back into an object (deserialized).

It is easy to implement since it requires the class to simply implement the `Serializable` interface, which is a marker interface with no methods to override.

It uses reflection, and it creates many temporary objects, leading to higher memory usage and potential performance issues.

So, `Serializable` is slower than Parcelable.

We now understand the differences between Parcelable and `Serializable`.

**Let me tabulate the difference between Parcelable and `Serializable`.**

| `Parcelable` | `Serializable` |
| :-- | :-- |
| Android-Specific. | Java. |
| Faster. | Slower. |
| Less Memory Usage. | More Memory Usage. |

This was all about `Parcelable` and `Serializable`.

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
  "title": "Parcelable vs Serializable",
  "desc": "In this blog, we will learn about the difference between Parcelable and Serializable. We will also learn how they work internally.",
  "link": "https://chanhi2000.github.io/bookshelf/outcomeschool.com/parcelable-vs-serializable.html",
  "logo": "https://outcomeschool.com/static/favicons/apple-touch-icon.png",
  "background": "rgba(78,70,220,0.2)"
}
```
