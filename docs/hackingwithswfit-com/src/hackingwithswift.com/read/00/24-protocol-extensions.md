---
lang: ko-KR
title: "Protocol extensions"
description: "Article(s) > Protocol extensions"
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
      content: "Article(s) > Protocol extensions"
    - property: og:description
      content: "Protocol extensions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/00/24-protocol-extensions.html
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
  "title": "Protocol extensions | Hacking with iOS",
  "desc": "Protocol extensions",
  "link": "https://hackingwithswift.com/read/0/24/protocol-extensions",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

One of Swift’s most powerful features is its ability to extend whole swathes of data types at the same time. These are known as protocol extensions, and they are commonly used to build flexibility into large apps.

You’ve already seen how protocols let us define contracts that conforming types must adopt. Well, protocol *extensions* let us define implementations of things inside the protocol, adding the functionality to all types that conform to the protocol in a single place.

To demonstrate how this works, let’s look at another simple extension for the `Int` data type: we’re going to add a `clamp()` method that makes sure one number falls within the lower and upper bounds that are specified:

```swift
extension Int {
    func clamp(low: Int, high: Int) -> Int {
        if self > high {
            // if we are higher than the upper bound, return the upper bound
            return high
        } else if self < low {
            // if we are lower than the lower bound, return the lower bound
            return low
        }

        // we are inside the range, so return our value
        return self
    }
}

let i: Int = 8
print(i.clamp(low: 0, high: 5))
```

Because 8 is higher than the upper bound of 5, that will print 5.

I explicitly made `i` an `Int` for a reason: there are other kinds of integers available in Swift. For example, `UInt` is an unsigned integer, which means it sacrifices the ability to hold negative numbers in exchange for the ability to hold much larger positive numbers.

There are also integers of different sizes, e.g. `Int8` holds an integer made up of 8 binary digits, which holds a maximum value of 127, and `UInt64` is the largest type of integer and holds up to 18,446,744,073,709,551,615 - that’s 18 quintillion four hundred and forty-six quadrillion in case you were wondering.

Our extension modifies the `Int` data type specifically, rather than *all* variations of integers, which means code like this won’t work because `UInt64` doesn’t have the extension:

```swift
let j: UInt64 = 8
print(j.clamp(low: 0, high: 5))
```

Swift’s solution is to let us create protocol extensions: extensions that modify several data types at once.

You’ve already seen how the `self` keyword lets us refer to our current value, so `self * self` means “multiply my current number by itself.” Well, there’s also `Self` with a capital S, which has a subtly different meaning: it means “my current data type.” So, `self` means “my current value” and `Self` means “my current data type.”

This *matters* when it comes to extending protocols because of the way our `clamp()` method is declared. Take a look again:

```swift
func clamp(low: Int, high: Int) -> Int {
    if self > high {
        return high
    } else if self < low {
        return low
    }

    return self
}
```

If we want `clamp()` to apply to all types of integer, we can’t very well make it return `Int` - that’s not big enough to hold the full range of a `UInt64`, so Swift will refuse to build. Instead, we need to make the method return `Self`, which means “I’ll return whatever data type I was used with.”

Here’s the rewritten extension:

```swift
extension BinaryInteger {
    func clamp(low: Self, high: Self) -> Self {
        if self > high {
            return high
        } else if self < low {
            return low
        }

        return self
    }
}
```

This time I’ve made it apply to `BinaryInteger`, which is a protocol that all of Swift’s integer types conform to. This means *all* integer types get access to the `clamp()` method, and work as expected - we don’t need to extend them all individually.

![`clamp` now works with `UInt8`, which conforms to the `BinaryInteger` protocol.](https://hackingwithswift.com/img/books/hws/protocol-extensions-1.png)

Protocol extensions are helpful for providing default method implementations so that conforming types don’t need to implement those methods themselves unless they specifically want to.

As an example, we might define an extension for our `Employee` protocol so that all conforming types automatically get a `doWork()` method:

```swift
protocol Employee {
    var name: String { get set }
    var jobTitle: String { get set }
    func doWork()
}

extension Employee {
    func doWork() {
        print("I'm busy!")
    }
}
```

![The struct `OfficeDrone` can use the `doWork` method defined in the extension.](https://hackingwithswift.com/img/books/hws/protocol-extensions-2@2x.png)

