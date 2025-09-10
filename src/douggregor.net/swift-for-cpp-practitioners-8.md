---
lang: ko-KR
title: "Swift for C++ Practitioners, Part 8: Global Variables"
description: "Article(s) > Swift for C++ Practitioners, Part 8: Global Variables"
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
      content: "Article(s) > Swift for C++ Practitioners, Part 8: Global Variables"
    - property: og:description
      content: "Swift for C++ Practitioners, Part 8: Global Variables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/douggregor.net/swift-for-cpp-practitioners-7.html
prev: /programming/swift/articles/README.md
date: 2024-05-21
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
  "title": "Swift for C++ Practitioners, Part 8: Global Variables | Doug's Compiler Corner",
  "desc": "Swift for C++ Practitioners, Part 8: Global Variables",
  "link": "https://www.douggregor.net/posts/swift-for-cxx-practitioners-global-variables/",
  "background": "rgba(22,22,22,0.2)"
}
```

At the end of part 7, I promised I was going to talk about Swift language extensibility next. That post is taking some time, and today the differences between global variables in C++ and Swift came up in a discussion. So, here's a little interlude on our way to language extensibility to talk about global variables.

---

## Global variables & static variables

The basic idea of global variables is the same in Swift as in C++. In C++ you can define a variable at namespace scope, like this:

```cpp
Registry *globalRegistry = new Registry()
```

and it's accessible from anywhere. Swift has the same for variables declared at module scope, e.g.,

```swift
let globalRegistry: Registry = Registry()
```

You can draw the same parallels between C++ and Swift static variables, so where in C++ you would write:

```cpp
class Registry {
public:
  // Declaration
  static Registry *sharedRegistry;
};

// Definition
Registry *Registry::sharedRegistry = new Registry();
```

in Swift you can do the same:

```swift
class Registry {
  static let sharedRegistry: Registry = Registry()
}
```

Totally straightforward, no surprises here... yet.

---

## (No) generic static variables

In C++, it's fairly common to have static variables within a class template. For example, perhaps we want a "registry" above, but for each type `T`. One might write that in C++ as:

```cpp
template<typename T>
class Registry {
public:
  // Declaration
  static Registry<T> *sharedRegistry;
};

// Definition
template<typename T>
Registry<T> *Registry<T>::sharedRegistry = new Registry<T>();
```

That's fine: we'll get a separate `Registry<T>::sharedRegistry` for every `T` The equivalent in Swift produces a compiler error:

```swift
class Registry<T> {
  // error: static stored properties not supported in generic types
  static let sharedRegistry: Registry<T> = Registry<T>()
}
```

Why does Swift ban this? As I noted back in [part 4 on generics](/douggregor.net/swift-for-cpp-practitioners-4.md), Swift's generics are implemented with separate compilation. We do not know at the point where `sharedRegistry` is defined what types it will be specialized with, and in the general case (say, `Registry` is in a shared library), it's impossible to know what types it will be specialized with until the program runs. Therefore, we can't allocate space from global memory for every `Registry<T>.sharedRegistry` that we might come across.
  
Yes, we *could* create a hash table indexed based on the generic argument for `T`, allocating new `sharedRegistry` instances on the heap each time there's a new generic argument... but this is *really* stretching the definition of "global variable", and the performance of such a feature would be surprising (to say the least). Instead, Swift prohibits static stored properties in generic types rather than provide an unsatisfying implementation.
  
If you really want that hash table implementation, you can build it by following the examples in [part 5 on type erasure](/douggregor.net/swift-for-cpp-practitioners-5.md), and it'll look a little bit like this:

```swift
fileprivate var untypedSharedRegistry: [ObjectIdentifier: Any] = [:]

class Registry<T> {
  static var sharedRegistry: Registry<T> {
    untypedSharedRegistry[ObjectIdentifier(T.self), default: Registry<T>()] as! Registry<T>
  }
}
```

Here, `untypedSharedRegistry` maps from the metatype for `T` (represented as an [<VPIcon icon="fa-brands fa-apple"/>`ObjectIdentifier`](https://developer.apple.com/documentation/swift/objectidentifier), which is a fancy way of saying "identity for something with a stable address") to a type-erased value of type `Any`. All of the `Any` instances in the dictionary are actually `Registry<T>` instances matching the type `T` that went into the `ObjectIdentifier`, so we force-cast (with `as!`) the element on the way out. So long as nobody fiddles with `untypedSharedRegistry`, that force-cast will never fail.
  
So far, Swift global and static variables are the same as C++ global and static variables, except that Swift static variables can't be generic. Things will start to diverge more when we get to initialization.

---

## Static initialization in C++

Initialization of C++ globals and statics is [<VPIcon icon="fas fa-globe"/>known by the State of California to cause headaches and lost productivity](https://p65warnings.ca.gov). Indeed, doing a web search for C++ static initialization order turns up a page titled [<VPIcon icon="iconfont icon-cpp"/>Static Initialization Order Fiasco](https://en.cppreference.com/w/cpp/language/siof) as its second hit.
  
It's useful to understand why static initialization is tricky in C++, so that we can explain the path Swift took. C++ initializes global and static variables on a per-translation-unit basis, starting at the first global or static variable and proceeding to the last. However, it is unspecified in what order the different translation units in a program get to run their initializers. So if you have a global variable in translation unit `x.cpp` that somehow depends on a global variable in `y.cpp`, you might be okay (if `y.cpp` has its initializers run first) or your code might crash (if `x.cpp` has its initializers run first). I don't want to go into all of the solutions for C++ here(this [<VPIcon icon="fas fa-globe"/>blog post on C++ Initialization of Static Variables](https://pabloariasal.github.io/2020/01/02/static-variable-initialization/) covers some). However, I will point out that the most general solution is [<VPIcon icon="fas fa-globe"/>Initialize on First Use](https://isocpp.org/wiki/faq/ctors#static-init-order-on-first-use), which uses a function-local static instead of a global variable or static class member:

```cpp
Registry& sharedRegistry() {
  static Registry* registry = new Registry();
  return *registry;
}
```

C++ function-local statics are interesting because they are guaranteed to be initialized on first use, and for most (all?) C++ implementations that initialization uses something like [<VPIcon icon="fas fa-globe"/>`pthread_once`](https://pubs.opengroup.org/onlinepubs/7908799/xsh/pthread_once.html) to ensure that the initialization is thread-safe. Such a nice model, that...
  
While we're here, there's another reason to dislike static initialization in C++: you always pay the runtime cost for running the initializers of global and static variables, even if you never use them. This cost can come at unfortunate times in your program, such as program startup and when loading a shared library. Many code bases prohibit global initializers to prevent this cost, using something like Clang's `-Wglobal-constructors` warning.

---

## Lazy initialization in Swift

Initialization of global and static variables in Swift applies the "Initialize on First Use" principle, always. There is no notion of a Swift "global initializer" that is run prior to `main`, or when a shared library is loaded. Rather, like function-local statics in C++, every global and static variable is protected so that its initializer runs at most once, on the first initialization, using something like `pthread_once` to make the initialization itself thread-safe.
  
This approach has a lot of nice properties: the Static Initialization Order Fiasco just doesn't exist in Swift, so you don't need to introduce tricks to avoid it. You only pay the cost of initializing those global variables that you actually use, and that cost is paid when you use it the first time---not at program startup. An unused global variable (say, in a library) have very little cost at all: just the space it takes up in memory. The overhead of something like `pthread_once` is fairly low for the thread-safety it brings to the model.
  
The only real downside I've seen to this approach is that it can be surprising if you're expecting to use the initialization of a global for its side effects, or have some other reason to expect and want the C++ semantics.

---

## Lazy initialization for instance properties

The stored instance properties of a struct or class are initialized as part of the initializer, and will remain initialized until the struct or class is destroyed. However, one can get lazy initialization semantics for instance properties by using the `lazy` keyword. For example, let's imagine that a class has some expensive-to-initialize instance property that isn't used all that often. We could make it lazily created by using an optional as the underlying storage, and using a computed property to access the conceptual value:

```swift
class C {
  // Underlying storage
  private var expensiveImpl: Expensive? = nil
  
  // The property available everywhere else.
  var expensive: Expensive {
    mutating get { 
      // If we already have a value, return it.
      if let existing = expensiveImpl {
        return existing
      }
      
      // Create a new value and stash it in the underlying storage for later use.
      let value = Expensive()
      expensiveImpl = value
      return value
    }
    
    set {
      expensiveImpl = newValue
    }
  }
}
```

That's a lot of code, but it's mostly straightforward: `expensiveImpl` starts out by storing `nil`, and is replaced by either the default value (if accessed first via the getter) or the value assigned into it (if accessed first via the setter). This lazy initialization is effectively invisible to the user, who accesses the value through the computed property `expensive`, and is similar to what happens under the hood for global and static variables (minus the thread-safety).
  
This kind of construct comes up a lot in certain kinds of programming, and it's a ton of boilerplate to write out each time. Therefore, Swift lets you do the same thing directly with a `lazy var`:

```swift
class C {
  lazy var expensive: Expensive = Expensive()
}
```

The effect of this code is the same as the prior example, but the Swift compiler is doing the work of introducing the stored property of type `Expensive?` behind the scenes and making `expensive` computed. Note that `lazy` variables do *not* need to be initialized within an initializer, because they get the default initialization to `nil`.
  
Unlike global and static variables, a `lazy var` does *not* provide thread-safe initialization. The reasoning here is that, if multiple threads are accessing a given instance of a struct or class concurrently, *you already have a data race*. There's no point in having the compiler increase the size of each struct or class instance, and pay the cost of something like `pthread_once`, to protect against a second-order data race. Rather, Swift's model is moving toward eliminating this class of data races entirely in Swift 6.

---

## No guaranteed constant initialization

One feature of C++ initialization is that has no analogue yet in Swift is constant initialization. For example, with C++ [<VPIcon icon="iconfont icon-cpp"/>`constinit`](https://en.cppreference.com/w/cpp/language/constinit) it's possible to guarantee that there is no runtime initialization for a declaration:

```swift
constinit int buckets = 17;
```

C++ programmers often depend on constant initialization to avoid the problems of static initialization I've talked about here. It can also be important in low-level systems where you might not even have the ability to perform initialization prior to `main`.
  
Swift has no such feature. I expect that at some point it will get a feature similar to C++20 `constinit`, which guarantees that a particular initialization produces a constant value that requires no run-time code execution. However, Swift still needs a model of constant evaluation for that to happen, and as of this writing there isn't yet a complete design to point to.

---

## Wrap-up

Global and static variables in Swift are conceptually similar to those in C++, and used for much the same purpose. However, Swift takes the "Initialize on First Use" principle all the way, with all global and static variables being initialized on first use. Function-local statics in Swift work identically to those in C++, based on the same "Initialize on First Use" principle.
