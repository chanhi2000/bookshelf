---
lang: ko-KR
title: "Swift for C++ Practitioners, Part 9: Extensible Literals"
description: "Article(s) > Swift for C++ Practitioners, Part 9: Extensible Literals"
icon: fa-brands fa-swift
category: 
  - Swift
  - C++
  - Article(s)
tag: 
  - blog
  - douggregor.net
  - swift
  - ios
  - c++
  - cpp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Swift for C++ Practitioners, Part 9: Extensible Literals"
    - property: og:description
      content: "Swift for C++ Practitioners, Part 9: Extensible Literals"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/douggregor.net/swift-for-cpp-practitioners-7.html
prev: /programming/swift/articles/README.md
date: 2024-09-28
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Swift > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/swift/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "C++ > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Swift for C++ Practitioners, Part 9: Extensible Literals | Doug's Compiler Corner",
  "desc": "Swift for C++ Practitioners, Part 9: Extensible Literals",
  "link": "https://www.douggregor.net/posts/swift-for-cxx-practitioners-literals/",
  "background": "rgba(22,22,22,0.2)"
}
```

One of the things that I *really* liked about C++ was the ability to create great libraries: the combination of classes, templates, and operator overloading made it possible to create abstractions that nicely describe a subject domain (whether graphs, matrices, parsers, whatever) within a library.

Swift provides similar affordances to create the right abstractions to model a subject domain. I've already talked about [value types](/douggregor.net/swift-for-cpp-practitioners-1.md) and [generics](/douggregor.net/swift-for-cpp-practitioners-4.md) at length, so we won't go into those again. However, Swift also has additional features that let you customize the language to your needs, including the ability to interact with literals (like `0` or `"https://douggregor.net"`), overload operators to your heart's content, provide specific access behavior for properties, or define your own declarative sub-language (DSL) embedded in Swift. These features, used well, can enable beautiful library designs that get at the heart of describing a domain.

I'm going to tackle language extensibility in several different posts, because there's a lot to explore, including a few side quests into other parts of the language. For this post, we're going to dive ito something that you use everyday but probably don't think about much in C++: literals.

Literals are constant values written in the source code. In Swift, there are quite a few different kinds of literals:

- *Integer literals*: numbers like `42` and `-10`.
- *Floating-point literals*: numbers like `3.14159`
- *Boolean literals*: `true` and `false`
- *String literals*: strings like `"Hello, world!"`
- *Interpolated string literals*: strings with interpolations in them, such as `"Hello, \(name)!"`
- *Nil literal*: `nil`
- *Array literal*: an array of things, such as `[a, b, c]`
- *Dictionary literal*: a list of key-value pairs, such as `[a: x, b: y, c: z]`

In most programming languages, literals have a specific type. `0` in C++ is an `int`, `3.14159` is a `double`. C++ also has suffixes that are part of the literal to let you change the literal type: `0u` is an `unsigned int`, `3.14159f` is a `float`, and so on. C++ also allows many kinds of implicit conversion, which lets us be somewhat cavalier with the exact type of literals: you can write `int8_t x = 64;` and the literal `int` will be implicitly converted to `int8_t`. One hopes to get a compiler warning if the literal doesn't fit into the type of `x`.

In Swift, literals pick up the type of their enclosing context. So, we can write the equivalent to the above `x` as:

```swift
let x: UInt8 = 64
```

and the literal `64` will pick up the type `UInt8` from its context. You can also be explicit about what type you want your literal to have by using the `as` operator: `64 as UInt8` will ensure that the integer literal `64` is treated as a `UInt8`. You can use the `as` operator to perform an implicit conversion explicitly in Swift: `x as Any` will put the value of `x` into a value types as `Any`.

With the so-called "collection" literals (for arrays and dictionaries), the contextual type can affect both the collection type and its element type. For example, if I were to write:

```swift
let numbers: Set<UInt8> = [ 1, 2, 4, 8, 16, 32, 64 ]
```

Then the array literal has type `Set<<>UInt8>`, meaning that each of the elements in the array literal will have type `UInt8`. This inference can go both ways: consider something like this:

```swift
let someNumbers: Set<_> = [ 1 as UInt8, 2, 4, 8, 16, 32, 64 ]
```

The `_` is a placeholder for "I don't want to write the type, figure it out for me". I've specified that I want a `Set`, so the array literal will be of a `Set` type, but the element type will be dictated by the array literal elements themselves: here the only one given a specific type is given `UInt8`, so the type of `someNumbers` will be `Set<<>UInt8>`.

If there is no contextual type for a literal, it will default to an appropriate type: `Bool` for Boolean literals, `Int` for integer literals, `Double` for floating-point literals, `String` for string literals, `Array` for array literals, and `Dictionary` for dictionary literals. This is what enables type inference for something like

```swift
let favoriteConstants = [ "π" : 3.14159, "e": 2.71828 ]
```

to determine that `favoriteConstants` has the type `[String: Double]` aka `Dictionary<<>String, Double>`.

Type inference is nice and all, but I promised *extensibility*. Let's get to that.

---

## The `ExpressibleBy*Literal` protocols

The types I listed above that work as literal types aren't magical. They are defined in the standard library, and declare conformances to protocols in the "expressible by" family. Each kind of literal has one or more protocols associated with it: a type that conforms to one of these protocols can be constructed from the corresponding literal type. Here's the mapping from literal kinds to protocols:

- *Integer literals*: [<VPIcon icon="fa-brands fa-apple"/>`ExpressibleByIntegerLiteral`](https://developer.apple.com/documentation/swift/expressiblebyintegerliteral)
- *Floating-point literals*: [<VPIcon icon="fa-brands fa-apple"/>`ExpressibleByFloatLiteral`](https://developer.apple.com/documentation/swift/expressiblebyfloatliteral)
- *Boolean literals*: [<VPIcon icon="fa-brands fa-apple"/>`ExpressibleByBooleanLiteral`](https://developer.apple.com/documentation/swift/expressiblebybooleanliteral)
- *String literals*: [<VPIcon icon="fa-brands fa-apple"/>`ExpressibleByStringLiteral`](https://developer.apple.com/documentation/swift/expressiblebystringliteral) (and friends; we'll get there')
- *Interpolated string literals*: [<VPIcon icon="fa-brands fa-apple"/>`ExpressibleByStringInterpolation`](https://developer.apple.com/documentation/swift/expressiblebystringinterpolation)
- *Nil literal*: [<VPIcon icon="fa-brands fa-apple"/>`ExpressibleByNilLiteral`](https://developer.apple.com/documentation/swift/expressiblebynilliteral)
- *Array literal*: [<VPIcon icon="fa-brands fa-apple"/>`ExpressibleByArrayLiteral`](https://developer.apple.com/documentation/swift/expressiblebyarrayliteral)
- *Dictionary literal*: [<VPIcon icon="fa-brands fa-apple"/>`ExpressibleByDictionaryLiteral`](https://developer.apple.com/documentation/swift/expressiblebydictionaryliteral)

If you had some kind of collection type that you wanted to work be constructible from an array literal, you would make it conform to `ExpressibleByArrayLiteral`. For our example, let's create a single type that conforms to *lots* of these protocols: a representation of a JSON value. We can describe any JSON value as an enum, like this:

```swift
enum JSONValue {
  case null
  case object(String)
  case number(Double)
  case array([JSONValue])
  case dictionary([String: JSONValue])
}
```

We can represent the JSON `null` value with a `nil` literal by introducing a conformance to `ExpressibleByNilLiteral`, like this:

```swift
extension JSONValue: ExpressibleByNilLiteral {
  init(nilLiteral: ()) {
    self = .null
  }
}
```

There's one oddity here to point out: the parameter `nilLiteral` has the type `()`, which is an empty tuple. Here, it's used so that we can provide a special name for this initializer (`init(nilLiteral:)`) even though there's no need for a specific value with a `nil` literal. Fun fact: the Swift standard library has a type `Void` that's defined like this:

```swift
typealias Void = ()
```

Functions that have no specified return type in Swift are said to return `Void`, somewhat like in C++. But the analogy to C++ `void` stops there. Empty tuple types are normal types in Swift: you can have variables and properties of empty tuple type, and they have a size of zero (*gasp*). One can create a value of empty tuple type with the expression `()`. Some languages refer to these types as "unit" types.

For the next two cases of `JSONValue`, we can provide string, integer, and floating-point literal conformances:

```swift
extension JSONValue: ExpressibleByStringLiteral {
  init(stringLiteral value: String) {
    self = .object(value)
  }
}

extension JSONValue: ExpressibleByIntegerLiteral {
  init(integerLiteral value: Int) {
    self = .number(Double(value))
  }
}

extension JSONValue: ExpressibleByFloatLiteral {
  init(floatLiteral value: Double) {
    self = .number(value)
  }
}
```

We can now create a `JSONValue` instance from a nil literal (`nil`), string literal (`"Hello"`), integer literal ('42'), or floating-point literal ('3.14159').

Let's do some collections to finish it off:

```swift
extension JSONValue: ExpressibleByArrayLiteral {
  init(arrayLiteral elements: JSONValue...) {
    self = .array(elements)
  }
}

extension JSONValue: ExpressibleByDictionaryLiteral {
  init(dictionaryLiteral elements: (String, JSONValue)...) {
    self = .dictionary(.init(uniqueKeysWithValues: elements))
  }
}
```

The only new bit of syntax is the `...`. These are variadic parameters (not variadic *generics*), which accept any number of arguments, all of the same type. Within the body of the function/initializer, variadic parameters are accessed as arrays. So, the `init(arrayLiteral:)` initializer can directly put the `elements` array into its `array` case, because it already contains JSON values. The `init(dictionaryLiteral:)` initializer accepts an array of `(String, JSONValue)` pairs, which it uniques based on key to place in the dictionary.

Now, we can go ahead and write out JSON literals in Swift:

```swift
let math: JSONValue = [ 
  "π" : 3.14159,
  "e": 2.71828,
  "i": "sqrt(i)",
  "zero": 0,
  "undefined": nil
]
```

If we were to print the above variable without any additional customization, we'd get something like this (formatting is mine):

```swift
dictionary(
  [
    "zero": Extensibility.JSONValue.number(0.0),
    "π": Extensibility.JSONValue.number(3.14159),
    "i": Extensibility.JSONValue.object("sqrt(i)"),
    "e": Extensibility.JSONValue.number(2.71828),
    "undefined": Extensibility.JSONValue.null
  ]
)
```

### Aside: Hashing in Swift

If you try the above example yourself, you might notice an interesting difference in the output: the dictionary key/value pairs could get printed in a different order from what I have above. Run the program again---you'll likely get a different order! Swift's hashed collections (`Dictionary` and `Set`) choose a random seed at program start to mix into hash elements, so you'll get different hash values for the same values from one run to the next. This was motivated partially by security and partially to promote correctness.

The security angle is that knowing how a hash table performs hashes allows you to craft a set of inputs that all hash to the same value, making operations on the hash table linear when they shouldn't be, leading to a potential denial-of-service attack. By changing the random seed on each execution, it makes it harder to provide a set of inputs like this.

The correctness angle is, essentially, that it's often too easy to mistakenly depend on the iteration order of a hashed data structure or the specific hash value of a type. One approach I've seen proposed for C++ is to prohibit iteration on hashed data structures entirely (e.g., by not providing `begin`/`end` on a custom version of `unordered_map` or `unordered_set`). Swift's approach to allow the iteration, but have the ordering changing from one program run to the next. That way, you can iterate to make use of collection algorithms, but if it affects your output (e.g., because you forgot to sort at the end), you're very likely to notice because your unit tests will break.

---

## Strings and characters
  
String literals have their own hierarchy of protocols. `ExpressibleByStringLiteral` is the most capable, allowing an arbitrary, well-formed UTF-8 string literal. A string literal like `"Hello"` will go through this protocol.

`ExpressibleByStringLiteral` inherits from the `ExpressibleByExtendedGraphemeClusterLiteral` protocol. The name is a mouthful, but this protocol is used for string literals that consist of a single extended grapheme cluster---the closest thing what a human would think of as a "character". The string literal "🇺🇦" is a single extended grapheme cluster (although it has several Unicode scalars in it). Any type that conforms to `ExpressibleByStringLiteral` can handle such a string literal, but the converse is not true: some types might only be able to represent a single character, not an entire string. The standard library's `Character` type, for example, conforms to only `ExpressibleByExtendedGraphemeClusterLiteral`:

```swift
let c1: Character = "🇺🇦"      <span class="comment">// okay
let c2: Character = "Hello"   <span class="comment">// error: Character does not conform to ExpressibleByStringLiteral
```

There is one more protocol in the string literal family: `ExpressibleByUnicodeScalarLiteral`, from which `ExpressibleByExtendedGraphemeClusterLiteral` inherits, handles string literals that can be represented by a single Unicode scalar such as `"!"` or `"김"`. The `Unicode.Scalar` type in the Swift standard library conforms to this protocol. One benefit to `ExpressibleByUnicodeScalarLiteral` is that all Unicode scalars can fit into a single 32-bit word, whereas extended grapheme clusters can require several scalars.

---

## String interpolation
  
The final "expressible by" protocol we'll explore is `ExpressibleByStringInterpolation`. This is the protocol a type can conform to for string literals that include interpolations, i.e., something like this:

```swift
let s = "π=\(3.14159), but the answer is \(42)"
```

The closest analogy in C++ is probably output streaming (with `>>`) to a [<VPIcon icon="iconfont icon-cpp"/>`std::ostringstream`](https://cplusplus.com/reference/sstream/ostringstream/), which lets you mix string literals and values to be formatted. That's a pure library solution; in Swift, we have string interpolation syntax in the language, and libraries can opt in to supporting string interpolation by conforming to `ExpressibleByStringInterpolation`. Why might a library want to do that? Well, you can think of string interpolation as a general templating engine built that lets you layer on type safety in an appropriate manner.

Say you want to create a SQL query that's customized by some user-supplied values. You could absolutely do this with normal strings and interpolation:

```swift
let query: String = """
SELECT * FROM \(tableName)
ORDER BY \(fieldName);
"""
```

That code just *screams* "SQL injection attack", so we need to do better. By creating a SQL query type that supports string interpolation, it can make sure to properly escape any values interpolated into the string, as well as performing any other validation that's needed. The [swift-syntax package (<VPIcon icon="iconfont icon-github"/>`swiftlang/swift-syntax`)](https://github.com/swiftlang/swift-syntax?tab=readme-ov-file) for manipulating Swift source code uses this approach to make it easy to create Swift source code from templates, like this:

```swift
let sourceFile: SourceFileSyntax = """
let \(varName): Int = \(value)
print(\(varName) + 42)
"""
```

### The `ExpressibleByStringInterpolation` protocol

To create your own strongly-typed templating solution with string interpolation, you'll need to create a type that conforms to the `ExpressibleByStringInterpolation` protocol:

```swift
public protocol ExpressibleByStringInterpolation: ExpressibleByStringLiteral {
  associatedtype StringInterpolation: StringInterpolationProtocol = where StringLiteralType == StringInterpolation.StringLiteralType

  init(stringInterpolation: StringInterpolation)
}
```

`ExpressibleByStringInterpolation` inherits from `ExpressibleByStringLiteral`, because anything that can be created from a string interpolation must also be able to handle the simpler case of a non-interpolated string literal. For a string interpolation with a given contextual type (let's call it `MyString`), the compiler will create an instance of the type `MyString.StringInterpolation` to collect the various parts of the string interpolation. That instance will then be passed into `init(stringInterpolation:)` to create the final string.

The `StringInterpolation` type conforms to the `StringInterpolationProtocol` protocol, which is a little odd because it only lists two requirements... even though the compiler requires that every type conforming to `StringInterpolationProtocol` support addition operations *not* described by the requirements. We refer to this as an *ad hoc* protocol, and it's a pragmatic compromise: we lose some descriptive benefits (you can't just look at the protocol to figure out how to write a fully-conforming type), but we gain a bit of expressive power through the use of overloading. We'll get back to that last part in a bit; for now, here's the protocol as written:

```swift
public protocol StringInterpolationProtocol {
  associatedtype StringLiteralType

  init(literalCapacity: Int, interpolationCount: Int)

  mutating func appendLiteral(_ literal: StringLiteralType)
}
```

The initializer (`init(literalCapacity:interpolationCount:)`) is called to initialize an instance of the `StringInterpolation` type, and is provided with the total number of characters in the string literal parts and the number of "interpolation" segments (for the values that are placed into string). So, if we have a string interpolation like this:

```swift
let myStr: MyString = "π=\(3.14159), but the answer is \(42)"
```

The call to create the instance will be `MyString.StringInterpolation(literalCapacity: 23, interpolationCount: 2)`. Once created, the contents of the interpolation will be passed to the instance with method calls: `appendLiteral` for each string literal part (e.g., the first call is `appendLiteral("π=")`) and `appendInterpolation` for each interpolated value (e.g., the second call is `appendInterpolation(3.14159)`), alternating. Once all of the pieces of the string interpolation have been sent to the `StringInterpolation` instance, that value is passed to the initializer of the `ExpressibleByStringInterpolation`-conforming type, i.e., `MyString(stringInterpolation: /*the MyString.StringInterpolation instance*/)`.

### String interpolation in action

To see this in action, let's create a string interpolation type that's only for debugging purposes:

```swift
struct MyString: ExpressibleByStringInterpolation {
typealias StringLiteralType = String

init(stringLiteral value: String) {
    print(#"MyString(stringLiteral: "\#(value)")"#)
}

init(stringInterpolation: StringInterpolation) {
    print("MyString(stringInterpolation:)")
}

struct StringInterpolation: StringInterpolationProtocol {
    init(literalCapacity: Int, interpolationCount: Int) {
        print("MyString.StringInterpolation(literalCapacity: \(literalCapacity), interpolationCount: \(interpolationCount))")
    }
    
    mutating func appendLiteral(_ string: String) {
        print(#"appendLiteral("\#(string)")"#)
    }
    
    mutating func appendInterpolation(_ value: Int) {
        print(#"appendInterpolation(\#(value): Int)"#)
    }
    
    mutating func appendInterpolation(_ value: Double) {
        print(#"appendInterpolation(\#(value): Double)"#)
    }
}
}
```

When we initialize a value of type `MyString` from a string interpolation, we'll see the set of calls that will be performed. Here's the output from the string interpolation example we've been using:

```swift
MyString.StringInterpolation(literalCapacity: 23, interpolationCount: 2)
appendLiteral("π=")
appendInterpolation(3.14159: Double)
appendLiteral(", but the answer is ")
appendInterpolation(42: Int)
appendLiteral("")
MyString(stringInterpolation:)
```

There are a few things to notice: the `appendLiteral` calls alternate with `appendInterpolation` calls, even when the string literal is empty. This means that there are always `interpolationCount * 2 + 1` calls to `appendLiteral` along with `interpolationCount` calls to `appendInterpolation`.

Additionally, the two interpolated values have different types (`Double` and `Int`, respectively), and end up calling different overloads of `appendInterpolation`. This is where the *ad hoc* nature of the `StringInterpolationProtocol` comes in: you can define different overloads of `appendInterpolation` for each of the types that your type is intended to support. If you don't want to support a type, don't provide an `appendInterpolation` overload for it. If you want to support entire classes of types, add a generic `appendInterpolation` with the appropriate constraints on it. Moreover, you can add additional parameters to `appendInterpolation` that can be used to customize rendering. For example, we could support an optional "radix" for integer interpolations:

```swift
mutating func appendInterpolation(_ value: Int, radix: Int) {
  print(#"appendInterpolation(\#(value), radix: \#(radix)")#)
}
```

Now, if we have a string interpolation like this:

```swift
"The value of \(value) in hexadecimal is \(value, radix: 16)" as MyString
```

we'll get this series of calls:

```swift
MyString.StringInterpolation(literalCapacity: 32, interpolationCount: 2)
appendLiteral("The value of ")
appendInterpolation(42: Int)
appendLiteral(" in hexadecimal is ")
appendInterpolation(42, radix: 16)
appendLiteral("")
MyString(stringInterpolation:)
```

### Extending the default string interpolation behavior

If all you want is to customize the way your own types get interpolated into strings, you don't need to create a new `ExpressibleByStringInterpolation` type at all. Instead, you can add on to the default string interpolation behavior by adding your own `appendInterpolation` operations to the standard library's [<VPIcon icon="fa-brands fa-apple"/>`DefaultStringInterpolation`](https://developer.apple.com/documentation/swift/defaultstringinterpolation) type. For example, say we want to be able to render a string with inline Markdown format, as described by this enum:

```swift
enum InlineMarkdownStyle {
  case regular
  case italicized
  case bold
  case underlined
  case monospaced
}
```

Now, we can add string interpolation support for supplying the inline markdown style to a string literal (but please do so with better escaping than I did):

```swift
extension DefaultStringInterpolation {
  mutating func appendInterpolation(_ value: String, markdownStyle: InlineMarkdownStyle) {
    switch markdownStyle {
    case .regular:    write(value)
    case .italicized: write("*\(value)*")
    case .bold:       write("**\(value)**")
    case .underlined: write("_\(value)_")
    case .monospaced: write("`\(value)`")
    }
  }
}
```

Now, we can do this:

```swift
print("String interpolation is \("so", markdownStyle: .italicized") \(positiveAdjective, markdownStyle: .bold).")
```

and if `positiveAdjective` were `"cool"`, this would print:

```swift
String interpolation is *so* **cool**.
```

---

## Wrap-up and what's next?

Literals in Swift are a surprisingly deep topic. The surface is very much like other languages, including C++: you have numeric literals, Boolean literals, and string literals, plus some additional support for array and dictionary literals that's straightforward. But Swift literals are affected by their contextual type, and any library can opt to supply its own literal types by conforming to the various `ExpressibleBy*Literal* protocols, allowing one to express structured data cleanly. String interpolation is also highly extensible, allowing one to create type-safe templating engines that work well with the language syntax.

Next up, we're going to look at operator overloading, where the story is much the same: on the surface, it's fairly similar to C++ and other languages that have such overloading. But dig a little deeper and there's a world of customization you can do to create elegant domain-specific embedded languages (DSELs).
  