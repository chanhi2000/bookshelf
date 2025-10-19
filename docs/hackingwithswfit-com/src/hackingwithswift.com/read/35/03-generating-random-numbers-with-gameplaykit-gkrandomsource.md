---
lang: ko-KR
title: "Generating random numbers with GameplayKit: GKRandomSource"
description: "Article(s) > Generating random numbers with GameplayKit: GKRandomSource"
category:
  - Swift
  - iOS
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - crashcourse
  - swift
  - xcode
  - appstore
  - ios  
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Generating random numbers with GameplayKit: GKRandomSource"
    - property: og:description
      content: "Generating random numbers with GameplayKit: GKRandomSource"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/35/03-generating-random-numbers-with-gameplaykit-gkrandomsource.html
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hacking with iOS - learn to code iPhone and iPad apps with free Swift tutorials",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/read/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Generating random numbers with GameplayKit: GKRandomSource | Hacking with iOS",
  "desc": "Generating random numbers with GameplayKit: GKRandomSource",
  "link": "https://hackingwithswift.com/read/35/3/generating-random-numbers-with-gameplaykit-gkrandomsource",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Let's look at the most basic way of generating random numbers using GameplayKit, which is the `GKRandomSource` class and its `sharedRandom()` method. Of course, this means adding an import for GameplayKit into the playground, so please do that now.

A random source is a provider of an unfiltered stream of random numbers as you need them. As you'll see soon, GameplayKit has various options for your stream, but for now we're going to look at the simplest one: `sharedRandom()`.

Using `sharedRandom()` for a random number source returns the systems built-in random source that's used for a variety of other tasks, which means you can be pretty sure it's in a truly random state by the time it gets to you. It does, however, mean that it's useless for synchronizing network games, because everyone's device is in a different state.

To produce a truly random number you'd use the `nextInt()` method like this:

```swift
print(GKRandomSource.sharedRandom().nextInt())
```

That produces a number between -2,147,483,648 and 2,147,483,647 - yes, that's a negative number, which means it's not a drop-in replacement for `arc4random()`. Plus, even with GameplayKit's great new logic, Apple includes a warning that it's not guaranteed to be random for very specific situations, so for both these reasons it's not likely you'll want to use `nextInt()` much.

As an alternative, try using the `nextInt(upperBound:)` method, which works identically to `arc4random()`:

```swift
print(GKRandomSource.sharedRandom().nextInt(upperBound: 6))
```

That will return a random number from 0 to 5 using the system's built-in random number generator.

As well as `nextInt()` and `nextInt(upperBound:)` are `nextBool()` for generating a random true/false value and `nextUniform()` for generating a random floating-point number between 0 and 1. Both of these are implemented using `nextInt(upperBound:)` so they output properly random numbers.

::: note

If you’re just generating simple random values, using Swift’s `Int.random(in:)`, `Float.random(in:)`, `Double.random(in:)`, and `Bool.random()` are much easier than using GameplayKit. However, GameplayKit does have the advantage that you can shape its random output, as we’ll look at next…

:::

