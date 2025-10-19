---
lang: ko-KR
title: "Shuffling an array with GameplayKit: arrayByShufflingObjects(in:)"
description: "Article(s) > Shuffling an array with GameplayKit: arrayByShufflingObjects(in:)"
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
      content: "Article(s) > Shuffling an array with GameplayKit: arrayByShufflingObjects(in:)"
    - property: og:description
      content: "Shuffling an array with GameplayKit: arrayByShufflingObjects(in:)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/35/06-shuffling-an-array-with-gameplaykit-arraybyshufflingobjectsin.html
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
  "title": "Shuffling an array with GameplayKit: arrayByShufflingObjects(in:) | Hacking with iOS",
  "desc": "Shuffling an array with GameplayKit: arrayByShufflingObjects(in:)",
  "link": "https://hackingwithswift.com/read/35/6/shuffling-an-array-with-gameplaykit-arraybyshufflingobjectsin",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Many Swift game projects use this Fisher-Yates array shuffle algorithm implemented in Swift by Nate Cook:

```swift
extension Array {
    mutating func shuffle() {
        for i in 0..<(count - 1) {
            let j = Int(arc4random_uniform(UInt32(count - i))) + i
            swapAt(i, j)
        }
    }
}
```

With GameplayKit there's a specific method you can call that does a similar thing: `arrayByShufflingObjects(in:)`. I say "similar thing" rather than "identical thing" because the GameplayKit returns a new array rather than modifying the original, whereas Nate's version shuffles in place.

For example, if you wanted to blithely ignore the inevitable legalities and set up a lottery in your neighborhood, you could create an array containing the numbers 1 to 49, randomize its order, then pick the first six balls:

```swift
let lotteryBalls = [Int](1...49)
let shuffledBalls = GKRandomSource.sharedRandom().arrayByShufflingObjects(in: lotteryBalls)
print(shuffledBalls[0])
print(shuffledBalls[1])
print(shuffledBalls[2])
print(shuffledBalls[3])
print(shuffledBalls[4])
print(shuffledBalls[5])
```

Note that I'm using the default system randomization because determinism is exactly what you *don't* want in a lottery. Actually, forget it: if you're going to ignore the law and set up your own lottery, you might as well fix it so you win, right?

One of the advantages of GameplayKit's randomization is that it is truly deterministic, even across devices. This means as long as you tell it where to start, it will produce the same series of random numbers in the future. This is perfect for our evil lottery plan, and it gives me the chance to show you one last thing: seeding GameplayKit's random sources.

When we created our random seeds earlier, we just used this:

```swift
let mersenne = GKMersenneTwisterRandomSource()
```

That creates a new Mersenne Twister random source with a random starting point. But if you want to force a starting point - either because you want to win your lottery or because you want players in a network game to be synchronized - you can create your random source with a specific *seed*, which is a fixed starting point.

When you use a seed value, your random number generator becomes predictable - you can always predict exactly what “random” numbers get generated. But that's OK, because you can generate the seeds using a separate random number generator, so you're guaranteed uniqueness.

Here's our lottery example rewritten using a fixed seed value of 1001:

```swift
let fixedLotteryBalls = [Int](1...49)
let fixedShuffledBalls = GKMersenneTwisterRandomSource(seed: 1001).arrayByShufflingObjects(in: fixedLotteryBalls)
print(fixedShuffledBalls[0])
print(fixedShuffledBalls[1])
print(fixedShuffledBalls[2])
print(fixedShuffledBalls[3])
print(fixedShuffledBalls[4])
print(fixedShuffledBalls[5])
```

If you run that code now you'll see that the balls are shuffled identically every time. It's a random order, but *predictably* random if you know what I mean!

