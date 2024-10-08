---
lang: ko-KR
title: Result builders
description: Article(s) > Result builders
category:
  - Swift
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - swift
  - swift-5.4
head:
  - - meta:
    - property: og:title
      content: Article(s) > Result builders
    - property: og:description
      content: Result builders
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/swift/5.4/result-builders.html
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "HACKING WITH SWIFT",
  "desc": "What's new in Swift?",
  "link": "/hackingwithswift.com/swift/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Result builders | Changes in Swift 5.4",
  "desc": "Result builders",
  "link": "https://hackingwithswift.com/swift/5.4/result-builders", 
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

> Available from Swift 5.4

Function builders unofficially arrived in Swift 5.1, but in the run up to Swift 5.4 they formally went through the Swift Evolution proposal process as [SE-0289 (<FontIcon icon="iconfont icon-github"/>`apple/swift-evolution`)](https://github.com/apple/swift-evolution/blob/main/proposals/0289-result-builders.md) in order to be discussed and refined. As part of that process they were renamed to result builders to better reflect their actual purpose, and even acquired some new functionality.

First up, the most important part: result builders allow us to create a new value step by step by passing in a sequence of our choosing. They power large parts of SwiftUI’s view creation system, so that when we have a `VStack` with a variety of views inside, Swift silently groups them together into an internal `TupleView` type so that they can be stored as a single child of the `VStack` – it turns a sequence of views into a single view.

Result builders deserve their own detailed article, but I at least want to give you some small code examples so you can see them in action.

Here is a function that returns a single string:

```swift
func makeSentence1() -> String {
    "Why settle for a Duke when you can have a Prince?"
}

print(makeSentence1())
```

That works great, but what if had several strings we wanted to join together? Just like SwiftUI, we might want to provide them all individually and have Swift figure it out, however this kind of code won’t work:

```swift
// This is invalid Swift, and will not compile.
// func makeSentence2() -> String {
//     "Why settle for a Duke"
//     "when you can have"
//     "a Prince?"
// }
```

By itself, that code won’t work because Swift no longer understands what we mean. However, we could create a result builder that understands how to convert several strings into one string using whatever transformation we want, like this:

```swift
@resultBuilder
struct SimpleStringBuilder {
    static func buildBlock(_ parts: String...) -> String {
        parts.joined(separator: "\n")
    }
}
```

Even though that’s a small amount of code, there’s a lot to unpack:

- The `@resultBuilder` attribute tells Swift the following type should be treated as a result builder. Previously this behavior was achieved using `@_functionBuilder`, which had an underscore to show that this wasn’t designed for general use.
- Every result builder must provide at least one static method called `buildBlock()`, which should take in some sort of data and transform it. The example above takes in zero or more strings, joins them, and sends them back as a single string.
- The end result is that our `SimpleStringBuilder` struct becomes a result builder, meaning that we can use `@SimpleStringBuilder` anywhere we need its string joining powers.

There’s nothing to stop us from using `SimpleStringBuilder.buildBlock()` directly, like this:

```swift
let joined = SimpleStringBuilder.buildBlock(
    "Why settle for a Duke",
    "when you can have",
    "a Prince?"
)

print(joined)
```

However, because we used the `@resultBuilder` annotation with our `SimpleStringBuilder` struct, we can also apply that to functions, like this:

```swift
@SimpleStringBuilder func makeSentence3() -> String {
    "Why settle for a Duke"
    "when you can have"
    "a Prince?"
}

print(makeSentence3())
```

Notice how we no longer need the commas at the end of each string – `@resultBuilder` automatically transforms each statement in `makeSentence()` into a single string by using `SimpleStringBuilder`.

In practice, result builders are capable of significantly more, accomplished by adding more methods to your builder type. For example, we could add if/else support to our `SimpleStringBuilder` by adding two extra methods that describe how we want to transform the data. In our code we don’t want to transform our strings at all, so we can send them right back:

```swift
@resultBuilder
struct ConditionalStringBuilder {
    static func buildBlock(_ parts: String...) -> String {
        parts.joined(separator: "\n")
    }

    static func buildEither(first component: String) -> String {
        return component
    }

    static func buildEither(second component: String) -> String {
        return component
    }
}
```

I know that looks like we’ve done almost no work, but now our functions are able to use conditions:

```swift
@ConditionalStringBuilder func makeSentence4() -> String {
    "Why settle for a Duke"
    "when you can have"

    if Bool.random() {
        "a Prince?"
    } else {
        "a King?"
    }
}

print(makeSentence4())
```

Similarly, we could add support for loops by adding a `buildArray()` method to our builder type:

```swift
@resultBuilder
struct ComplexStringBuilder {
    static func buildBlock(_ parts: String...) -> String {
        parts.joined(separator: "\n")
    }

    static func buildEither(first component: String) -> String {
        return component
    }

    static func buildEither(second component: String) -> String {
        return component
    }

    static func buildArray(_ components: [String]) -> String {
        components.joined(separator: "\n")
    }
}
```

And now we can use `for` loops:

```swift
@ComplexStringBuilder func countDown() -> String {
    for i in (0...10).reversed() {
        "\(i)…"
    }

    "Lift off!"
}

print(countDown())
```

It feels almost like magic because the result builder system is doing almost all the work for us, and even though our example has been fairly simple I hope you can get a taste for the remarkable power result builders bring to Swift.

It’s worth adding that Swift 5.4 extends the result builder system to [<FontIcon icon="fa-brands fa-swift"/>support attributes being placed on stored properties](https://bugs.swift.org/browse/SR-13188), which automatically adjusts the implicit memberwise initializer for structs to apply the result builder.

This is particularly helpful for custom SwiftUI views that use result builders, such as this one:

```swift
import SwiftUI

struct CustomVStack<Content: View>: View {
    @ViewBuilder let content: Content

    var body: some View {
        VStack {
            // custom functionality here
            content
        }
    }
}
```

If you’d like to see more advanced, real-world examples of result builders in action, you should check out the [Awesome Function Builders repository on GitHub (<FontIcon icon="iconfont icon-github"/>`carson-katri/awesome-function-builders`)](https://github.com/carson-katri/awesome-function-builders).

::: details Other Changes in Swift 5.4

```component VPCard
{
  "title": "Improved implicit member syntax | Changes in Swift 5.4",
  "desc": "Improved implicit member syntax",
  "link": "/hackingwithswift.com/swift/5.4/improved-implicit-member-syntax.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Multiple variadic parameters in functions | Changes in Swift 5.4",
  "desc": "Multiple variadic parameters in functions",
  "link": "/hackingwithswift.com/swift/5.4/multiple-variadic-parameters-in-functions.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Local functions now support overloading | Changes in Swift 5.4",
  "desc": "Local functions now support overloading",
  "link": "/hackingwithswift.com/swift/5.4/local-functions-now-support-overloading.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Creating variables that call a function of the same name | Changes in Swift 5.4",
  "desc": "Creating variables that call a function of the same name",
  "link": "/hackingwithswift.com/swift/5.4/local-variables-same-name.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
<!-- 
```component VPCard
{
  "title": "Result builders | Changes in Swift 5.4",
  "desc": "Result builders",
  "link": "/hackingwithswift.com/swift/5.4/result-builders.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```
-->
```component VPCard
{
  "title": "Property wrappers are now supported for local variables | Changes in Swift 5.4",
  "desc": "Property wrappers are now supported for local variables",
  "link": "/hackingwithswift.com/swift/5.4/local-property-wrappers.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

```component VPCard
{
  "title": "Packages can now declare executable targets | Changes in Swift 5.4",
  "desc": "Packages can now declare executable targets",
  "link": "/hackingwithswift.com/swift/5.4/spm-executable-targets.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(54,94,226,0.2)"
}
```

[<FontIcon icon="fas fa-file-zipper"/>Download Swift 5.4 playground](https://hackingwithswift.com/files/playgrounds/swift/playground-5-3-to-5-4.playground.zip)

:::

