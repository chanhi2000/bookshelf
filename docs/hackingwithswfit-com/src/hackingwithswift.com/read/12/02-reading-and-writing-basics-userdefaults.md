---
lang: ko-KR
title: "Reading and writing basics: UserDefaults"
description: "Article(s) > Reading and writing basics: UserDefaults"
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
      content: "Article(s) > Reading and writing basics: UserDefaults"
    - property: og:description
      content: "Reading and writing basics: UserDefaults"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/12/02-reading-and-writing-basics-userdefaults.html
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
  "title": "Reading and writing basics: UserDefaults | Hacking with iOS",
  "desc": "Reading and writing basics: UserDefaults",
  "link": "https://hackingwithswift.com/read/12/2/reading-and-writing-basics-userdefaults",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/WHKLXI8baJk" />

You can use `UserDefaults` to store any basic data type for as long as the app is installed. You can write basic types such as `Bool`, `Float`, `Double`, `Int`, `String`, or `URL`, but you can also write more complex types such as arrays, dictionaries and `Date` - and even `Data` values.

When you write data to `UserDefaults`, it automatically gets loaded when your app runs so that you can read it back again. This makes using it really easy, but you need to know that it's a bad idea to store lots of data in there because it will slow loading of your app. If you think your saved data would take up more than say 100KB, `UserDefaults` is almost certainly the wrong choice.

Before we get into modifying project 10, we're going to do a little bit of test coding first to try out what `UserDefaults` lets us do. You might find it useful to create a fresh Single View App project just so you can test out the code.

To get started with `UserDefaults`, you create a new instance of the class like this:

```swift
let defaults = UserDefaults.standard
```

Once that's done, it's easy to set a variety of values - you just need to give each one a unique key so you can reference it later. These values nearly always have no meaning outside of what you use them for, so just make sure the key names are memorable.

Here are some examples:

```swift
let defaults = UserDefaults.standard
defaults.set(25, forKey: "Age")
defaults.set(true, forKey: "UseTouchID")
defaults.set(CGFloat.pi, forKey: "Pi")
```

You can also use the `set()` to store strings, arrays, dictionaries and dates. Now, here's a curiosity that's worth explaining briefly: in Swift, strings, arrays and dictionaries are all structs, not objects. But `UserDefaults` was written for `NSString` and friends - all of which are 100% interchangeable with Swift their equivalents - which is why this code works.

Using `set()` for these advanced types is just the same as using the other data types:

```swift
defaults.set("Paul Hudson", forKey: "Name")
defaults.set(Date(), forKey: "LastRun")
```

Even if you're trying to save complex types such as arrays and dictionaries, `UserDefaults` laps it up:

```swift
let array = ["Hello", "World"]
defaults.set(array, forKey: "SavedArray")

let dict = ["Name": "Paul", "Country": "UK"]
defaults.set(dict, forKey: "SavedDict")
```

That's enough about writing for now; let's take a look at reading.

When you're reading values from `UserDefaults` you need to check the return type carefully to ensure you know what you're getting. Here's what you need to know:


- `integer(forKey:)` returns an integer if the key existed, or 0 if not.
- `bool(forKey:)` returns a boolean if the key existed, or false if not.
- `float(forKey:)` returns a float if the key existed, or 0.0 if not.
- `double(forKey:)` returns a double if the key existed, or 0.0 if not.
- `object(forKey:)` returns `Any?` so you need to conditionally typecast it to your data type.

Knowing the return values are important, because if you use `bool(forKey:)` and get back "false", does that mean the key didn't exist, or did it perhaps exist and you just set it to be false?

It's `object(forKey:)` that will cause you the most bother, because you get an optional object back. You're faced with two options, one of which isn't smart so you realistically have only one option!

Your options:


- Use `as!` to force typecast your object to the data type it should be.
- Use `as?` to optionally typecast your object to the type it should be.

If you use `as!` and `object(forKey:)` returned `nil`, you'll get a crash, so I really don't recommend it unless you're absolutely sure. But equally, using `as?` is annoying because you then have to unwrap the optional or create a default value.

There is a solution here, and it has the catchy name of *the nil coalescing operator*, and it looks like this: `??`. This does two things at once: if the object on the left is optional and exists, it gets unwrapped into a non-optional value; if it does not exist, it uses the value on the right instead.

This means we can use `object(forKey:)` and `as?` to get an optional object, then use `??` to either unwrap the object or set a default value, all in one line.

For example, let's say we want to read the array we saved earlier with the key name `SavedArray`. Here's how to do that with the `nil` coalescing operator:

```swift
let array = defaults.object(forKey:"SavedArray") as? [String] ?? [String]()
```

So, if `SavedArray` exists and is a string array, it will be placed into the `array` constant. If it doesn't exist (or if it does exist and isn't a string array), then `array` gets set to be a new string array.

This technique also works for dictionaries, but obviously you need to typecast it correctly. To read the dictionary we saved earlier, we'd use this:

```swift
let dict = defaults.object(forKey: "SavedDict") as? [String: String] ?? [String: String]()
```

