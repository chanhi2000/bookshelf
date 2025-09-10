---
lang: en-US
title: "The problems of Kotlin/Wasm I had when making a game"
description: "Article(s) > The problems of Kotlin/Wasm I had when making a game"
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
      content: "Article(s) > The problems of Kotlin/Wasm I had when making a game"
    - property: og:description
      content: "The problems of Kotlin/Wasm I had when making a game"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/game-story-collection-processing-wasm.html
prev: /programming/java/articles/README.md
date: 2025-01-20
isOriginal: false
author: 
  - name: Marcin Moskała
    url: https://kt.academy/user/marcinmoskala
cover: https://marcinmoskala.com/kt-academy-articles/promotion/game-story-collection-processing-wasm.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Kotlin > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The problems of Kotlin/Wasm I had when making a game"
  desc="A short story of the problems I needed to face when publishing a simple game made with Kotlin/Wasm."
  url="https://kt.academy/article/game-story-collection-processing-wasm"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/game-story-collection-processing-wasm.jpg"/>

Recently I had an idea for the game [<VPIcon icon="fas fa-globe"/>Jetpack Compose Modifier Guessing Game](https://marcinmoskala.com/ModifierOrderGuesser/). I implemented it using Compose Multiplatform, and released it on Wasm in a single day. I had a lot of fun, and I received a lot of great feedback, so built by this experience, I decided to write [<VPIcon icon="fas fa-globe"/>another one](https://marcinmoskala.com/CollectionProcessingGuesser/).

My next idea was to create a game, where player can see a list of fruits, and a set of collection processing functions, and the task is to guess the output of applying those functions to the list of fruits. The heart of this game is a generator of challenges. It turned out to be a complex function, using reflection a lot, but it wasn't the real challenge. I implemented it in a couple of hours, and it was really fun.

It took much longer to implement all the views, including a table of useful fruit properties (in each challenge, different properties are used), and value choosers for all the possible result types, but it was still the pleasant part. I implemented that in Android, where preview tools work best, and where I could most easily test the results. When it was done, I wanted to make it multiplatform, and this is where troubles began.

The first thing I learned is that Kotlin reflection is much more limited on common modules. For `KClass` I couldn't check type parameters, and for `KType` I couldn't check if one type is a subtype of another.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fwasm_typeOf_missing.png&w=3840&q=75)

```kotlin
private fun getTypeDisplay(displayPath: List<KClass<*>>): String {
    val path = displayPath . toMutableList()
    fun getName(classifier: KClass<*>): String {
        val name = classifier.name
        return if (classifier.typeParameters.isEmpty()) name
        else "$name<${classifier.typeParameters.joinToString { path.popFirstOrNull () ?. name ?: "*" }}>"
    }
    return getName(path.popFirstOrNull()!!)
}
```

<!-- ![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fwasm_KClass_parameters_missing.png&w=3840&q=75) -->

There were more such limitations, and they were annoying, but I managed to uglily overcome them by precisely adjusting to the types I expected. After that my project compiled, but it didn't work.

This code started on Android or Desktop worked fine, but when I started it on Wasm, my function for generating challenges was consistently breaking program with "illegal cast exception". That shouldn't happen, because this place was trapped with a try-catch, that should catch all exceptions (this try-catch was used to skip operations that lead to exceptions, like `maxOf` on an empty list). Apparently, this problem was a result of Kotlin/Wasm-specificity.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fwasm_illegal_cast_exception.png&w=3840&q=75)

I wasn't really interested in dealing with that. That was my side-project, I just wanted to have some fun doing it, but I also wanted to finish what I started, so I started looking for alternative solutions. My first idea was that I might generate challenges on JVM, save them to a CSV file, and then load them on Wasm.

So I started looking for some libraries. The first thing I learned is that [<VPIcon icon="iconfont icon-github"/>`brudaswen/kotlinx-serialization-csv`](https://github.com/brudaswen/kotlinx-serialization-csv) does not support KMP. I found a [multiplatform kotlin-csv library (still in beta) (<VPIcon icon="iconfont icon-github"/>`jsoizo/kotlin-csv`)](https://github.com/jsoizo/kotlin-csv), but it had no support for operating on files. Compose Multiplatform has a built-in resources manager, but I couldn't find any information on how to use it for operating on custom files. I found that on KMP, the most popular library for operating on files is [Okio (<VPIcon icon="iconfont icon-github"/>`square/okio`)](https://github.com/square/okio), but apparently [it doesn't support Wasm (<VPIcon icon="iconfont icon-github"/>`square/okio`)](https://github.com/square/okio/issues/1463). I started getting crazy, I even wrote a script generating thousands of challenges and saving them in a `.kt` file that I could copy-paste to my project, but I decided that would be way too much, even for a side-project.

So I got back into the function for generating challenges, and I started adding tests and debugging it. Of course, IntelliJ Debug tools doesn't work when you run Kotlin/Wasm in a browser, so I had to use `println` debugging. Sadly hot-reload was not helpful, so to see my changes I needed to rebuild the project every single time, and building was taking a lot of time (around 15-20 sec, which is a lot for a small project). After some time, I found out that it was actually my mistake that caused it. A small logic mistake made it possible to deduce an incorrect type at some steps (this is what happens when you skip tests). On JVM, that caused `IllegalCastException`, and everything was silenced (a result of catching all exceptions), but on Wasm, it caused a crash. I still have no idea why, it was still causing a crash even when I was catching `Throwable` or when I tried to use safe casting (`as?`). Thankfully, logic correction made my program work!

However, that wasn't the end. In my program, I used fruits as elements in collections, and I represented them using Unicode emoji. That worked well on Android, but not on Wasm website.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fwasm_missing_emoji.png&w=3840&q=75)

Apparently, the font that was used by default had no support for those emojis. The solution was to [add a font to the project, and load it on Wasm (<VPIcon icon="iconfont icon-github"/>`JetBrains/compose-multiplatform-core`)](https://github.com/JetBrains/compose-multiplatform-core/pull/1400/files). That was a bit of a hassle, but it worked.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2FCollectionProcessingGuesser.gif&w=3840&q=75)

Finally, I had my game working on Wasm. You can find it [<VPIcon icon="fas fa-globe"/>here](https://marcinmoskala.com/CollectionProcessingGuesser/). Thought, this project thought me a lot about Kotlin/Wasm and Jetpack Multiplatform:

- Reflection is significantly limited on common modules.
- There are still missing libraries for Kotlin/Wasm (like reading files or CSV serialization).
- Kotlin/Wasm has some specificities that might cause your program to crash, even if it works fine on JVM (in this case, it was casting that break program instead of throwing an exception).
- Compose Multiplatform has some limitations on Wasm (like missing fonts).
- Hot reloading didn't work for me on Wasm (it looked like it was reloading, but it didn't show the changes).
- Debugging Kotlin/Wasm is a pain.

In summary, Compose Multiplatform and Kotlin/Wasm, I love you guys, but you must get better. You are great for simple uses, but for more complex ones, you are still not the most pleasant companions.

This article also shows the consequences of resigning from every day craftsmanship practices, like writing tests. I decided to skip them, assuming that it is a small project, and I will never touch it once finished. That was a mistake. It took me much more time to deal with a problem that could be easily avoided by writing tests. That is one of the biggest benefits of doing side projects—in the unconstrained environment, you can see the consequences of your decisions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The problems of Kotlin/Wasm I had when making a game",
  "desc": "A short story of the problems I needed to face when publishing a simple game made with Kotlin/Wasm.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/game-story-collection-processing-wasm.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
