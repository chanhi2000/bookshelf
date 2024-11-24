---
lang: en-US
title: "Item 29: Minimize elements’ visibility"
description: "Article(s) > Item 29: Minimize elements’ visibility"
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
      content: "Article(s) > Item 29: Minimize elements’ visibility"
    - property: og:description
      content: "Item 29: Minimize elements’ visibility"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/ek-element-visibility.html
prev: /programming/java/articles/README.md
date: 2024-05-06
isOriginal: false
author: Marcin Moskała
cover: https://kt.academy/_next/image?url=https%3A//marcinmoskala.com/EffectiveKotlin-Book/promotion/element_visibility.jpg&w=640&q=75
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
  name="Item 29: Minimize elements’ visibility"
  desc="Why we should minimize elements’ visibility and how to do it."
  url="https://kt.academy/ek-element-visibility"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/EffectiveKotlin-Book/promotion/element_visibility.jpg"/>

::: note

This is a chapter from the book [Effective Kotlin](/book/effectivekotlin). You can find it on [<FontIcon icon="fas fa-globe"/>LeanPub](https://leanpub.com/effectivekotlin) or [<FontIcon icon="fa-brands fa-amazon"/>Amazon](https://amazon.com/Effective-Kotlin-Best-Practices-Developers-ebook/dp/B0CHBR5XPF/).

:::

When we design an API, there are many reasons to prefer it to be as lean as possible. Let’s specify the most important ones:

**It is easier to learn and maintain a smaller interface.** Understanding a class is easier when there are only a few things we can do with it than when there are dozens. Maintenance is easier as well. When we make changes, we often need to understand the whole class. When fewer elements are visible, there is less to maintain and test.

**When we want to make changes, it is way easier to expose something new than to hide an existing element.** All publicly visible elements are part of our public API, therefore they can be used externally. The longer an element has been visible for, the more external usages it has. As such, changing these elements will be harder because they will require updating all usages. Restricting visibility would be even more of a challenge because you’ll need to carefully consider each usage and provide an alternative. Giving an alternative might not be simple, especially if this element was implemented by another developer. It might also be tough to find out now what the original business requirements were. If it is a public library, restricting some elements' visibility might make some users angry because they’ll need to adjust their implementation and will face the same problems - they’ll need to implement alternative solutions probably years after they developed their code. It is much better to force developers to use a smaller API in the first place.

**A class cannot be responsible for its own state when properties that represent this state can be changed from the outside.** We might have assumptions, that class state needs to satisfy. When this state can be directly changed from the outside, the current class cannot guarantee its invariants because it might be changed externally by someone who doesn’t know anything about our internal contract. Take a look at `CounterSet` from the snippet below. We correctly restricted the visibility of the `elementsAdded` setter. Without this, someone from outside might change it to any value and we wouldn’t be able to trust that this value really represents how many elements were added. Notice that only setters are private. This is a very useful trick.

```kotlin title="CounterSet.kt"
class CounterSet<T>(
  private val innerSet: MutableSet<T> = mutableSetOf()
) : MutableSet<T> by innerSet {
 
  var elementsAdded: Int = 0
    private set
   
  override fun add(element: T): Boolean {
    elementsAdded++
    return innerSet.add(element)
  }
   
  override fun addAll(elements: Collection<T>): Boolean {
    elementsAdded += elements.size
    return innerSet.addAll(elements)
  }
}
```

For many cases, it is very helpful that all properties are encapsulated by default in Kotlin because we can always restrict the visibility of concrete accessors.

Protecting an object’s internal state is especially important when we have properties that depend on each other. For instance, in the `mutableLazy` delegate implementation below, we expect that if `initialized` is `true`, `value` is initialized and contains a value of type `T`. Whatever we do, the setter of `initialized` should not be exposed, because otherwise it cannot be trusted, which could lead to an ugly exception on a different property.

```kotlin title="MutableLazyHolder.kt"
class MutableLazyHolder<T>(val initializer: () -> T) {
  private var value: Any? = Any()
  private var initialized = false
   
  fun get(): T {
    if (!initialized) {
      value = initializer()
      initialized = true
    }
    return value as T
  }
   
  fun set(value: T) {
    this.value = value
    initialized = true
  }
}
```

**It is easier to track how a class changes when it has more restricted visibility.** This makes the property state easier to understand and is especially important when we are dealing with concurrency. State changes are a problem for parallel programming, so it is better to control and restrict them as much as possible.

---

## Using visibility modifiers

To achieve a smaller interface from outside without internal sacrifices, we restrict elements’ visibility. In general, if there is no reason for an element to be visible, we prefer to hide it. This is why if there is no good reason to have less restrictive visibility, it is good practice to make the visibility of classes and elements as restrictive as possible. We do this using visibility modifiers.

For class members, these are the 4 visibility modifiers we can use together with their behavior:

- `public` (default) - visible everywhere for clients who can see the declaring class.
- `private` - visible inside this class only.
- `protected` - visible inside this class and in subclasses.
- `internal` - visible inside this module for clients who see the declaring class.
Top-level elements have 3 visibility modifiers:
- `public` (default) - visible everywhere.
- `private` - visible inside the same file only.
- `internal` - visible inside this module.

Note that a module is not the same as a package. In Kotlin, a module is defined as a set of Kotlin sources compiled together. This might be:

- a Gradle source set,
- a Maven project,
- an IntelliJ IDEA module,
- a set of files compiled with one invocation of the Ant task.

If your module might be used by another module, change the visibility of public elements that you don’t want to expose to `internal`. If an element is designed for inheritance and is only used in a class and subclasses, make it `protected`. If you use an element only in the same file or class, make it `private`. This convention is supported by Kotlin, which suggests restricting visibility to private if an element is used only locally:

![](https://marcinmoskala.com/EffectiveKotlin-Book/manuscript/resources/image_7.png&w=1200&q=75)

This rule should not be applied to properties in classes that are designed primarily to hold data (data model classes, DTO). If your server returns a user with an age, and you decide to parse it, you don’t need to hide it just because you don’t use it at the moment. It is there to be used and it is better to have it visible. If you don’t need it, get rid of this property entirely.

```kotlin title="User.kt"
class User(
  val name: String,
  val surname: String,
  val age: Int
)
```

One big limitation is that when we inherit an API, we cannot restrict the visibility of a member by overriding it. This is because the subclass can always be used as its superclass. This is just another reason to prefer composition instead of inheritance (*Item 36: Prefer composition over inheritance*).

---

## Summary

The rule of thumb is that: **Elements’ visibility should be as restrictive as possible**. A public API consists of its visible elements, and we prefer it as lean as possible because:

- It is easier to learn and maintain a smaller interface.
- When we want to make changes, it is way easier to expose something than to hide it.
- A class cannot be responsible for its own state when properties that represent this state can be changed from outside.
- It is easier to track how an API changes when it has more restricted visibility.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Item 29: Minimize elements’ visibility",
  "desc": "Why we should minimize elements’ visibility and how to do it.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/ek-element-visibility.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
