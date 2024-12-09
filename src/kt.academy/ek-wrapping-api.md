---
lang: ko-KR
title: "Item 28: Consider wrapping external APIs"
description: "Article(s) > Item 28: Consider wrapping external APIs"
icon: fa-brands fa-android
category: 
  - Java
  - Kotlin
  - Android
  - Picasso
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
      content: "Article(s) > Item 28: Consider wrapping external APIs"
    - property: og:description
      content: "Item 28: Consider wrapping external APIs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/ek-wrapping-api.html
prev: /programming/java-android/articles/README.md
date: 2024-04-29
isOriginal: false
author: Marcin Moskała
cover: https://marcinmoskala.com/EffectiveKotlin-Book/promotion/wrapping_api.jpg
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
  name="Item 28: Consider wrapping external APIs"
  desc="Why we should wrap external APIs and how to do it."
  url="https://kt.academy/article/ek-wrapping-api"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/EffectiveKotlin-Book/promotion/wrapping_api.jpg"/>

::: note

This is a chapter from the book [Effective Kotlin](/book/effectivekotlin). You can find it on [<FontIcon icon="fas fa-globe"/>LeanPub](https://leanpub.com/effectivekotlin) or [<FontIcon icon="fa-brands fa-amazon"/>Amazon](https://amazon.com/Effective-Kotlin-Best-Practices-Developers-ebook/dp/B0CHBR5XPF/).

:::

It is risky to heavily use an API that might be unstable, both when its creators clarify that it is unstable, and when we do not trust these creators to keep it stable. We should remember that we need to adjust every use in case of inevitable API changes, and we should consider limiting uses and separate them from our logic as much as possible. This is why we often wrap potentially unstable external library APIs in our own project.

This is not the only reason to wrap external APIs. This gives us a lot of freedom and stability:

- We are not afraid of API changes because we only need to change a single usage inside the wrapper.
- We can adjust the API to our project’s style and logic.
- We can replace it with a different library if problems arise with this one.
- We can change the behavior of these objects if we need to (of course, do this responsibly).

There are also counterarguments to this approach:

- We need to define all these wrappers.
- Our internal API is internal, and developers need to learn it just for this project.
- There are no courses that teach how our internal API works. We also cannot expect answers on Stack Overflow.

Let me show you an example from my practice. In an Android project I co-created, we used the Picasso library to load and display images from URLs. A simple load might look as follows:

```kotlin
Picasso.get()
  .load(url)
  .into(imageView)
```

We needed to load images all around our application, probably in hundreds of places, so we decided to wrap this API in our own function. This is a simplified version of it.

```kotlin
fun ImageView.loadImage(url: String) {
  Picasso.get()
    .load(url)
    .into(this)
}
```

It's great we did that because it later turned out that we needed to load GIF images, which was not supported by Picasso, so we decided to replace this library entirely with a different one named Glide. Thanks to our wrapper, we only needed to change a single function.

```kotlin
fun ImageView.loadImage(url: String) {
  Glide.with(context)
    .load(url)
    .into(this)
}
```

Wrapping can be much more complicated than this, but it can still be worth it. Wrappers protect us not only from the pain of changing to an entirely different library, but also from changes in the API of the library we are using and from changes in our own logic.

---

## Summary

Wrapping an external API is a great way to protect our project from changes in this API. It also gives us a lot of freedom in adjusting the API to our needs. It is a good idea to wrap external APIs that are unstable or when we don't trust their creators to keep them stable. It is also a good idea to wrap APIs that we use heavily because it gives us more freedom in adjusting them to our needs. On the other hand, wrapping requires defining a lot of functions, and it makes our internal API more complicated. So, we should always consider wrapping external APIs because it’s often worth it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Item 28: Consider wrapping external APIs",
  "desc": "Why we should wrap external APIs and how to do it.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/ek-wrapping-api.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
