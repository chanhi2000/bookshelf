---
lang: ko-KR
title: "Swift for C++ Practitioners, Part 7: Closures"
description: "Article(s) > Swift for C++ Practitioners, Part 7: Closures"
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
      content: "Article(s) > Swift for C++ Practitioners, Part 7: Closures"
    - property: og:description
      content: "Swift for C++ Practitioners, Part 7: Closures"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/douggregor.net/swift-for-cpp-practitioners-7.html
prev: /programming/swift/articles/README.md
date: 2024-04-28
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
  "title": "Swift for C++ Practitioners, Part 7: Closures | Doug's Compiler Corner",
  "desc": "Swift for C++ Practitioners, Part 7: Closures",
  "link": "https://www.douggregor.net/posts/swift-for-cxx-practitioners-closures/",
  "background": "rgba(22,22,22,0.2)"
}
```

Throughout this series, I've been using closures in examples without really defining them. Swift closures are a whole lot like C++ lambdas, with a similar design and syntax, and generally the same use cases. This post is going to dig a little deeper into Swift closures to give a better feel for how they work and how to make the best use of them.

---

## The syntax

A Swift closure is an expression delimited by curly braces, `{ ... }` that represents an anonymous function. For example, this

```swift
let hello = { "Hello" }
```

defines a local variable `hello` that stores the closure. The type of `hello` is `() -> String`, i.e., a function that takes no parameters.
  
Swift closures can be provided with parameters in one of two ways: anonymous parameters `$0`, `$1`, `$2`, and so on let you write very short closures for quick one-off operations. For example:

```swift
let arithmeticOp: (Double, Double) -> Double
switch opCode {
case "+": arithmeticOp = { $0 + $1 }
case "-": arithmeticOp = { $0 - $1 }
case "*": arithmeticOp = { $0 * $1 }
case "/": arithmeticOp = { $0 / $1 }
default: throw InterpreterError.invalidOpcode(opCode)
}
```

*Please* only use this shorthand for the smallest closures. Once you get behind a single short expression, it's much better to name your parameters. To do so, list them prior to `in` within the curly braces. The `in` separates the declaration part of the closure from its statements. For example, the first case above could instead by written like this:

```swift
{ x, y in x + y }
```

In fact, prior to the `in`, you can write a full-fledged parameter list with type annotations, result type, and effect specifiers, if you don't want to leave them up to inference:

```swift
{ (x: Double, y: Double) throws -> Double in 
     let result = try addSafely(x, y) }
     return result
}
```

It's fairly uncommon to see such closures with all of the types written out like this, because the parameter types are generally inferred by context and the result type can be inferred from the closure body. Indeed, if you end up finding yourself writing a long closure that needs the full type annotations, it's likely that you should write a local function. I'll come back to local functions later. For now, I want to talk about captures.

---

## Captures

A *capture* is when a closure refers to a local variable (or parameter) from its enclosing scope. In such cases, the closure needs to a way to reference that variable---or it's value---when it executes. A simple example would be a closure that inserts elements into a set to remove duplicates from a collection, returning a new array with the elements uniqued:

```swift
func uniquing<C: Collection>(from collection: C) -> [C.Element] where C.Element: Hashable {
  var known: Set<C.Element> = []
  return collection.filter({
    known.insert($0).inserted
  })
}
```

The closure passed to `filter` captures the local variable `known`. Each time it is called, it tries inserting the element it was given into the known set. If successful (i.e., the element wasn't there), the `inserted` field in the result is `true`, so the element is kept in the filtered sequence. If the element wasn't there, the `inserted` field in the result is `false`, so it's dropped.
  
  Swift's captures default to by-reference. If you want a by-value capture rather than a by-reference capture, you can provide a capture list using the familiar square bracket syntax from C++ lambdas. However, in Swift the capture list goes *within* the curly braces and before the (optional) parameter list. The `filter` call could capture `known` by-value like this:

```swift
return collection.filter({ [known] in
  known.insert($0).inserted        // error: known is immutable
})
```

However, note the error: by-value captures are immutable, so the above code would actually fail with an error `cannot assign to value: 'count' is an immutable capture`.
  
Also similar to C++ captures, a Swift capture list can define a new captured values at the point the closures is created. For example, here we create a bunch of closures that produce string values of the index in the loop where they were created:

```swift
var closures: [() -> String] = []
for i in 0..<100 {
  closures.append({ [string = String(i)] in string })
}
```

I wouldn't expect most of the above to be surprising to a C++ practitioner, because it's mostly the same as lambdas. But the "captures are by reference" statement might be a little nerve-wracking, because what happens if you return a closure that captures by reference?

```swift
// Produce a function that adds `x` to whatever integer value it is given.
func adding(x: Int) -> ((Int) -> Int) {
  return { x + $0 }
}
```

Bad news, right? Not in Swift... let's look into the implementation model a bit.

### Implementation model for captures

The implementation of C++ lambdas is fairly straightforward: for each lambda, the compiler synthesizes a class. The code of the lambda goes into its `operator()`, and for each capture the compiler will create a non-static data member. For example, let's consider this C++ lambda expression:

```cpp
std::vector<int> values;
int target;

auto fn = [&&values,target]() {
  values[0] = target;
};
```

The corresponding synthesized class will look something like this:

```cpp
class Synthesized {
  std::vector<int> &&values;
  int target;
  
public:
  Synthesized(std::vector<int> &&values, int target) : values(values), target(target) { }

  void operator()() const {
    values[0] = target;
  }
};
```

By-reference captures produce a non-static member of reference type, while by-value captures are of non-reference type (so you get a copy).
  
Swift's translation of closures is conceptually similar, but the main difference is in the handling of by-reference captures. Semantically, a by-reference capture in Swift promotes the captured local to the heap, and uses a reference type to box it up. For example, imagine we have this `Box` type:

```swift
class Box<T> {
  var value: T
  
  init(value: T) {
    self.value = value
  }
}
```

When a local variable like

```swift
var numbers: [Int]
```

is captured by-reference in a closure, it is *as if* the local variable were rewritten to

```swift
var numbers: Box<[Int]>
```

and every initialization of `numbers` creates a box instance, and every subsequent access to `numbers`, whether it's in the function or a closure that captures it by reference, is rewritten to `numbers.value`.
  
  This model makes it safe to return a closure from a function, even when that closure captures a local in the function by reference:

```swift
func numberAccessor() -> ((Int) -> Int) {
  var numbers: [Int] = ...
  return { x in numbers[x] }
}
```

Since `numbers` is promoted to a `Box<[Int]>`, the returned closure itself keeps the "local" variable alive on the heap until the closure is no longer used. It's a simple model, and a safe one.
  
  But if you actually did this for every local variable captured everywhere, it would be a very, very slow model. Let's talk about optimizations.

### Optimizations for captures

There are two main optimizations for by-reference captures in Swift. The first is to realize when the capture doesn't need to be by-reference at all: if we're capturing a `let`, its value can't change anyway, so we can capture by value to avoid the boxing overhead without changing the semantics. There are more complicated analyses one can do when capturing a `var`: if the `var` isn't modified after the point of capture (either in the closure or outside of it), then we can capture by value because the value isn't going to change.
  
The second optimization is when you can be sure that the closure itself won't live longer than the variables it is capturing. In these cases, it is safe to do a by-reference capture of the stack variable, without moving it to the heap. As C++ programmers, we make this kind of decision all the time based on knowledge of the functions we are calling: it's perfectly reasonable to use by-reference captures when passing a lambda into `std::transform`, because the algorithm isn't going to escape the closure.
  
The problem in C++, of course, is that we could be wrong: if the lambda does use by-reference captures and escapes, we have a stack use-after-free. If the lambda uses expensive by-copy captures and it never escapes, we've wasted some processor cycles and some memory.

Shouldn't the optimizer just figure out for us? Ideally, when the closure doesn't escape, we'd use by-reference captures that refer to the local variable on the stack, with no overhead. And when the closure does escape, we'd promote the captured local variables to the heap to maintain memory safety. Easy, right?

The problem is that you can't always see the code you're calling to determine whether it stashes a copy of the closure somewhere. If I call some C++ function:

```swift
void doSomething(std::function<int(int)> f);
```

with a lambda, I have *no idea* what it is going to do with `f`. Even if it's a C++ template like this:

```cpp
template<typename F>
void doSomething(F f);
```

the code might be hidden behind an explicit instantiation, or do something tricky with `f` that obscures the fact that it's storing a copy of it to execute later. So either the optimizer has to go through heroics to prove that `doSomething` doesn't stash a copy of `f` somewhere on the side, or it has to conservatively assume that the lambda could escape. The end result is that escape analysis like the one we would need to have both safe and efficient by-reference closures isn't actually very effective in C++.
  
To address this issue in Swift, we decided to change the language to make this optimization more reliable. The idea is simple:

### Parameters of function type are non-escaping by default

  In Swift, a parameter of function type is (by default) not allowed to escape the function's stack frame. Let's see an example:

```swift
struct S {
  var fn: () -> Int

  mutating func doSomething(f: () -> Int) {
    fn = f  // error: assigning non-escaping parameter 'f' to an @escaping closure
  }
}
```

The function `doSomething` is trying to escape the value of `f` out of its stack frame by writing into the instance property `fn`. The compiler prevents such escapes systematically, and only allows the code to use `f` in a manner that either calls it (which is fine) or passes it down the stack to other functions that won't escape it.
  
Because the non-escaping behavior is part of the interface contract, the optimizer can safely assume that a closure passed to `doSomething` won't outlive its own stack frame. So this kind of code:

```swift
var numbers: [Int] = ...
s.doSomething { 
  if let value = numbers.last {
    numbers.removeLast()
    return value
  }
 
  return 0
}
```

we get by-reference captures without the overhead of promoting the local variables to the heap. By making non-escaping the default, we get better performance for the common cases that use closures for (e.g.) algorithms and callbacks while maintaining the safe model.

### Escaping function types

  You might have noticed that my struct `S` had an instance property of function type:

```swift
struct S {
  var fn: () -> Int
}
```

Outside of function parameters, values of function type are assumed to be escaping. If I were to assign directly into `S.fn`, the closure provided would be assumed to be escaping, so it would promote mutable captures to the heap:

```swift
s.fn = {      // promotes numbers to the heap
  if let value = numbers.last {
    numbers.removeLast()
    return value
  }
 
  return 0
}
```

A function parameter can be explicitly marked with `@escaping` to allow its value to escape the function's stack frame. This is part of the type of the function, so callers know that they need to promote captures to the heap. For our `doSomething` function, it would look like this:

```swift
struct S {
  var fn: () -> Int

  mutating func doSomething(f: @escaping () -> Int) {
    fn = f  // ok, f is marked @escaping
  }
}
```

### Getting around the escaping restrictions

The restriction on non-escaping functions can feel pretty harsh some times: you can't, for example, put the non-escaping value into another local variable or inside a local struct, because the Swift compiler will flag it as a local escape. For example, even this is disallowed:

```swift
func haveFun(f: () -> Int) -> Int {
  var s = S(fn: f)  // error: passing non-escaping parameter 'f' to function expecting an @escaping closure
  return s.fn()
}
```

Swift does have a mechanism to deal with such cases, using the standard library function [<FontIcon icon="fa-brands fa-apple"/>`withoutActuallyEscaping`](https://developer.apple.com/documentation/swift/withoutactuallyescaping(_:do:)): the basic idea is that `withoutActuallyEscaping` lets you temporarily convert a non-escaping closure into an escaping one. The escaping one is passed into a second closure that is immediately evaluated and its result returned. So `haveFun` can be implemented as follows:

```swift
func haveFun(f: () -> Int) -> Int {
  withoutActuallyEscaping(f, body: { escapingF in 
    var s = S(fn: escapingF)
    return s.fn()
  })
}
```

The first parameter to `withoutActuallyEscaping` is the non-escaping function `f`. The second parameter, `body`, is a closure that takes the escaping form of `f` and is executed immediately.
  
I know what you're thinking: after all that talk about safety with non-escaping parameters, how can there possibly be a standard library function that just throws all of it away? Madness!
  
What `withoutActuallyEscaping` is actually doing is deferring the correctness check for a non-escaping closure into a runtime check. If you try any funny business that actually escapes `escapingF` out of the `body` closure, the program will trap at runtime:

```plaintext title="log"
0    escape                             0x000000010423750c haveFun(f:) + 144
1    escape                             0x00000001042374dc main + 24
2    dyld                               0x0000000187fa87a8 start + 2360
closure argument was escaped in withoutActuallyEscaping block: file escape.swift, line 9, column 3 
```

I triggered this by writing `escapingF` into a global. The implementation of `withoutActuallyEscaping` is actually pretty neat: since escaping closures are reference counted (like other reference types in Swift), `withoutActuallyEscaping` records the reference count of the function `escapingF` when it's passed into the body closure. Then, it checks whether the reference count is the same on the way out of the body closure---if it is, all is well. If the reference count on the way out is *different*, it means that `escapingF` has escaped out of `body`, and we need to halt lest we cause undefined behavior.
  
You probably won't need `withoutActuallyEscaping` often, but when you need it, you *really* need it. It also illustrates an important principle: static safety is great, but sometimes you need to step outside of the bounds of what a compiler can statically prove is safe. When that happens, Swift takes the view that it's better to roll into dynamic checking to maintain the safety model rather than ban the code entirely or throw away safety. We saw this in our discussions of the law of exclusivity in part 1 of this series, and it comes up again as part of Swift's concurrency model.

---

## Local functions

C++ function definitions can only be defined in class or namespace scope, and there is no notion of a "local" function that's defined within another function. The introduction of lambdas into C++ gave us an approximation of the feature. For example, here's a rough C++ equivalent to the `uniquing` function in Swift from earlier:

```cpp
template<typename R>
std::vector<iter_value_t<iterator_t<R> uniquing(R &&&&range) {
  using value_type = iter_value_t<iterator_t<R>;
  std::unordered_set<value_type> known;

  // Local function to insert an item into "known" and report whether it was added.
  auto tryInsertKnown = [&&](const value_type &&item) {
    return known.insert(item).second;
  };
  
  // Copy the items from the range that match the tryInsertKnown predicate.
  std::vector<value_type> result;
  std::ranges::copy_if_result(range, tryInsertKnown, std::back_inserter(result));
  return result;
}
```

The lambda we create and store in `tryInsertKnown` is effectively a local function: it's a function defined within another function, and captures some state from that outer function. It's a useful tool for breaking out local reusable parts of your function while still sharing state.
  
But doing this in C++ has some warts and limitations. First of all, it may act like a function, but it doesn't *look* like a function until you learn to squint at the pattern the right way, and not all IDEs know to treat it like a function for (e.g.) code completion. Second, because writing the type of a lambda explicitly isn't possible, we have to use `auto`, and that prevents us from directly writing a recursive local function in this style:

```cpp
auto localFib = [&&](int i) {
  if (i < 2) return i;
  return localFib(i-1) + localFib(i-2);  // error: variable 'localFib' declared with deduced type 'auto' cannot appear in its own initializer
};
```

Now, we can get around this by using [<FontIcon icon="iconfont icon-cpp"/>`std::function`](https://en.cppreference.com/w/cpp/utility/functional/function):

```swift
std::function<int(int)> localFib;
localFib = [&&](int i) {
  if (i < 2) return i;
  return localFib(i-1) + localFib(i-2);  // okay!
};
```

This works because we've separated out the declaration of `localFib` and given it a type, so it can be captured in the lambda that's eventually assigned into it. It's uglier, but it works. And it's most likely going to cause a heap allocation in `std::function` unless your C++ library implements the [<FontIcon icon="fa-brands fa-microsoft"/>small object optimization for `std::function`](https://devblogs.microsoft.com/oldnewthing/20200514-00/?p=103749) and your lambda fits into it.
  
In Swift, local functions are just like functions at module scope. Here's a more explicit Swift `uniquing` that uses the local function:

```swift
func uniquing<C: Collection>(_ collection: C) -> [C.Element] where C.Element: Hashable {
  var known: Set<C.Element> = []
  
  func tryInsertKnown(_ item: C.Element) -> Bool {
    known.insert(item).inserted
  }
  
  return collection.filter(tryInsertKnown)
}
```

Like closures, local functions can capture local variables (such as `x` in the example above). Like global functions, local functions have a name with argument labels of your choosing, can be generic, and can be recursive. In other words---they're just like functions, and you don't need to think about them differently.
  
In an earlier revision of this post, I actually skipped this section on local functions, because they "just work" as they obviously should. Reader Pierre Lebeaupin pointed out that I need to explain them, because if you're coming from C++, you wouldn't expect them to work and therefore miss this feature entirely. Worse, you might be inclined to try to replicate the C++ pattern in Swift. If you try, it's going to be *hideous*:

```swift
var localFibRec: ((Int) -> Int)! = nil
localFibRec = { i in 
  if i < 2 { return i }
  return localFibRec!(i-1) + localFibRec!(i-2)
}
let localFib = localFibRec
```

The optional and extra level of indirection is there because of definite initialization: a variable needs to have a value before it is captured, so `localFibRec` needs to have a value (in this case, `nil`), because it can be captured in the closure that eventually gives `localFibRec` its value. When the language is fighting you that hard, find another way.
  
Enough local functions, now let's move along to a feature that Swift borrowed from... Ruby!

---

## Trailing closures

When passing C++ lambdas into C++ standard library algorithms, we often end up with this ugly like `})` thing at the end of every call:

```cpp
std::copy_if(numbers.begin(), numbers.end(), std::back_inserter(even_numbers), [](auto x) {
  return x % 2 == 0
});
```

I know, it's just syntax. It shouldn't be a big deal. But these standard algorithms are supposed to feel like extensions of the language. It turns out that Ruby has a nice approach here, which allows a closure to be juxtaposed with a function name or call to be passed like a normal parameter. The `std::copy_if` above, in Swift, would be a [<FontIcon icon="fa-brands fa-apple"/>`filter`](https://developer.apple.com/documentation/swift/string/filter(_:)) operation that looks more like this:

```swift
numbers.filter { $0 % 2 == 0 }
```

The actual `filter` function is a collection algorithm declared like this:

```swift
extension Collection {
  func filter(_ isIncluded: () -> Bool) -> [Element] { ... }
}
```

You can call `filter` by passing a function in parentheses, e.g., `numbers.filter(isPrime)`, or use trailing closure syntax as we did above. When designing Swift APIs involving closures, you generally want to put the closure parameter at the end to allow trailing closure syntax. For example, perhaps we want a version of `filter` that puts an upper limit on the number of elements that will be removed. We could design it like this:

```swift
extension Collection {
  func filtering(removingAtMost maxRemovals: Int? = nil, isIncluded: () -> Bool) -> [Element] { ... })
}
```

This `filtering` function can be called with or without `removingAtMost`, while still using trailing closure syntax:

```swift
numbers.filtering(removingAtMost: 17) { ... } // A
numbers.filtering { ... }                     // B, maxRemovals defaults to nil

numbers.filtering(removingAtMost: 17, isIncluded: { ... }) // same as A
numbers.filtering(isIncluded: { ... })                     // same as B, maxRemovals defaults to nil
```

You may have noticed that the trailing closure is unlabeled: the responsibiity is on the author of the function to ensure that the name of the function strongly implies what the trailing closure does, so that code using the function reads clearly. After all, *clarity at the point of use* is one of the central tenets of Swift's [<FontIcon icon="fa-brands fa-swift"/>API design guidelines](https://swift.org/documentation/api-design-guidelines/).

### Multiple trailing closures

  When a function takes multiple closure parameters, it's possible to call it with multiple trailing closures. This can help make code clearer when there are multiple actions that could be taken. For example, imagine an API that executes an operation with a timeout, cancelling it early if time expires:

```swift
/// Run the given 'operation'. If it takes more than 'seconds', call the `onTimeout` function to
/// abort the operation and throw a `TimeoutError` instance.
func run<R>(timeout seconds: Double, operation: () -> R, onTimeout: () -> Void) throws -> R
```

A call to this function could make use of multiple trailing closures:

```swift
run(timeout: 0.5) {
  while !aborted {
    // part of a long-running operation
  }
} onTimeout: {
  aborted = true
}
```

Beyond the first trailing closure, the remaining trailing closures must have labels matching the corresponding parameter's label. Again, this needs to be reflected in API design: the primary "control flow" operation should be the first closure, and remaining closures should have labels that clearly express how and when the closure will be run.

---

## Wrap-up && what's next

For the most part, you can think of Swift closures like C++ lambdas. Similar use cases, similar syntax. Swift provides a safe model of captures that means you don't generally have to fret over returning a closure or how captures occur, although you will need to mark some parameters `@escaping` for those times when you want to save a closure to be called later.
  
Trailing closure syntax is a little nicety in Swift that makes closure-based APIs cleaner to use. Yes, it's *basically* nothing more than removing the unsightly `})` from a bunch of calls, but it's part of a larger design goal of enabling the design of powerful libraries that feel like extensions of the language. In fact, that's going to be our next topic: the features Swift provides for language extensibility and domain-specific embedded languages.
