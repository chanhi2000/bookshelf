---
lang: ko-KR
title: "Generating random numbers without GameplayKit"
description: "Article(s) > Generating random numbers without GameplayKit"
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
      content: "Article(s) > Generating random numbers without GameplayKit"
    - property: og:description
      content: "Generating random numbers without GameplayKit"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/35/02-generating-random-numbers-without-gameplaykit.html
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
  "title": "Generating random numbers without GameplayKit | Hacking with iOS",
  "desc": "Generating random numbers without GameplayKit",
  "link": "https://hackingwithswift.com/read/35/2/generating-random-numbers-without-gameplaykit",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Swift comes with built-in support for random number generation across a variety of types: `Int.random(in:)`, `Float.random(in:)`, `Double.random(in:)`, `CGFloat.random(in:)`, and even `Bool.random()` for flipping randomly between true or false.

These are all designed to be highly random - i.e., it’s hard to predict what future values will be generated - but they aren’t cryptographically secure. That means they are fine for everything except working with secure data such as password hashing.

All the random methods that take an `in` parameter accept a range to work with. For example:

```swift
let int1 = Int.random(in: 0...10)
let int2 = Int.random(in: 0..<10)
let double1 = Double.random(in: 1000...10000)
let float1 = Float.random(in: -100...100)
```

Swift’s random number generators are automatically seeded, which means they are given an initial value to make them unique each time they are run.

As for `Bool.random()`, it literally just returns true or false randomly - it’s effectively simulating a coin flip, but it does come in useful from time to time.

There are other ways to generate random numbers with Swift, and it’s quite common to see them around because the methods discussed above were introduced only in Swift 4.2 - four years after Swift was launched. So, many codebases use older methods that aren’t as good or as nice as the newer alternatives, but if you’re curious I’ll cover them below.

::: note

The below really is just here for historical purposes - you’re likely to find them in the wild a *lot* because there’s so much Swift out there, but if you’re just interested in learning modern Swift you can skip this part.

:::

---

## Old-fashioned randomness

The classic way to generate random numbers is called `arc4random()`, which is able to generate large, seemingly random numbers with a single function call:

```swift
print(arc4random())
print(arc4random())
print(arc4random())
print(arc4random())
```

The `arc4random()` function generates numbers between 0 and 4,294,967,295, giving a range of 2 to the power of 32 - 1, i.e., a lot. But if you wanted to generate a random number within a specific range there’s a better alternative. Let's look at them both, because you'll encounter them both in real code.

First, the widely used but problematic way of generating random numbers in a range:

```swift
print(arc4random() % 6)
```

That uses modulus to ensure that the result from `arc4random()` falls within a specific range. [We already covered modulus in project 8](/hackingwithswift.com/read/08/overview.md) so skip back there if you need a refresher. Note that we need to specify 6 because the values range from 0 to 5 inclusive.

This method is very common, but also problematic because it produces something called [<VPIcon icon="fas fa-globe"/>modulo bias](https://zuttobenkyou.wordpress.com/2012/10/18/generating-random-numbers-without-modulo-bias/), which is a small but not insignificant problem that causes some numbers to be generated more frequently than others. You might know it as [<VPIcon icon="fa-brands fa-wikipedia-w"/>the Pigeonhole Principle](https://en.wikipedia.org/wiki/Pigeonhole_principle) if you prefer slightly catchier names!

So, here’s a smarter way of generating random numbers in a range:

```swift
print(arc4random_uniform(6))
```

Yes, the ARC4 family of functions comes with a built-in way of generating random numbers in a range. No, it's not new. No, I don't know why it's not used by everyone - the world's a funny place, huh?

Anyway, using `arc4random_uniform()` we can generate a range of numbers that don't have a modulo bias, don't require seeding, and are suitably random for all but cryptographic purposes.

But it's not perfect, because its range is 0 up to the maximum you specify - what if you want a number between 10 and 20, or 100 and 500? Then you need to write something thoroughly ugly indeed:

```swift
func RandomInt(min: Int, max: Int) -> Int {
    if max < min { return min }
    return Int(arc4random_uniform(UInt32((max - min) + 1))) + min
}
```

That figures out the difference between the high and low ends of your range, uses that to calculate a random number, then re-adds the low end to get the full range. Because `arc4random_uniform()` works only with non-negative integers (`UInt32`) it has to do some typecasting to make the process seamless, and all those extra parentheses probably give you a headache.

Does it work? Yes, absolutely. Could you remember it if you closed this window now? No chance - Swift’s newer `Int.random(in:)` is significantly better.

Anyway, now you’ve seen the modern way of generating numbers and the older way, so let’s move on to looking at GameplayKit. Before I continue, it's worth making it doubly clear that GameplayKit is available only on Apple’s platforms, so if you’re using open source Swift on Linux then you’ll need to stick with the other options shown above.

