---
lang: ko-KR
title: "Pick a word, any word: UIAlertController"
description: "Article(s) > Pick a word, any word: UIAlertController"
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
      content: "Article(s) > Pick a word, any word: UIAlertController"
    - property: og:description
      content: "Pick a word, any word: UIAlertController"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/05/03-pick-a-word-any-word-uialertcontroller.html
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
  "title": "Pick a word, any word: UIAlertController | Hacking with iOS",
  "desc": "Pick a word, any word: UIAlertController",
  "link": "https://hackingwithswift.com/read/5/3/pick-a-word-any-word-uialertcontroller",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/tngJVuM6big" />

This game will prompt the user to enter a word that can be made from the eight-letter prompt word. For example, if the eight-letter word is "agencies", the user could enter "cease." We're going to solve this with `UIAlertController`, because it's a nice fit, and also gives me the chance to introduce some new teaching. I'm all about ulterior motives!

Add this code to `viewDidLoad()`, just after the call to `super`:

```swift
navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(promptForAnswer))
```

That created a new UIBarButtonItem using the "add" system item, and configured it to run a method called `promptForAnswer()` when tapped - we haven’t created it yet, so you’ll get a compiler error for a few minutes as you read on. This new method will show a `UIAlertController` with space for the user to enter an answer, and when the user clicks Submit to that alert controller the answer is checked to make sure it's valid.

Before I give you the code, let me explain what you need to know.

You see, we're about to use a closure, and things get a little complicated. As a reminder, these are chunks of code that can be treated like a variable - we can send the closure somewhere, where it gets stored away and executed later. To make this work, Swift takes a copy of the code and captures any data it references, so it can use them later.

But there's a problem: what if the closure references the view controller? Then what could happen is a strong reference cycle: the view controller owns an object that owns a closure that owns the view controller, and nothing could ever be destroyed.

I'm going to try (and likely fail!) to give you a metaphorical example, so please bear with me. Imagine if you built two cleaning robots, red and blue. You told the red robot, "don't stop cleaning until the blue robot stops," and you told the blue robot "don't stop cleaning until the red robot stops."

When would they stop cleaning? The answer is “never”, because neither will make the first move.

This is the problem we are facing with a strong reference cycle: object A owns object B, and object B owns a closure that referenced object A. And when closures are created, they capture everything they use, thus object B owns object A.

Strong reference cycles used to be hard to find, but you'll be glad to know Swift makes them trivial. In fact, Swift makes it so easy that you will use its solution even when you're not sure if there's a cycle simply because you might as well.

So, please brace yourself: we're about to take our first look at actual closures. The syntax will hurt. And when you finally understand it, you'll come across examples online that make your brain hurt all over again.

Ready? Here's the `promptForAnswer()` method:

```swift
@objc func promptForAnswer() {
    let ac = UIAlertController(title: "Enter answer", message: nil, preferredStyle: .alert)
    ac.addTextField()

    let submitAction = UIAlertAction(title: "Submit", style: .default) { [weak self, weak ac] action in
        guard let answer = ac?.textFields?[0].text else { return }
        self?.submit(answer)
    }

    ac.addAction(submitAction)
    present(ac, animated: true)
}
```

That code won’t build just yet, so don’t worry if you see errors - we’ll fix them soon. But first, let’s talk about what the code above does. It introduces quite a few new things, but before we look at them let's eliminate the easy stuff.

- It needs to be called from a `UIBarButtonItem` action, so we must mark it `@objc`. Hopefully you’re starting to sense when this is needed, but don’t worry if you forget - Xcode will always complain loudly if `@objc` is required and not present!
- Creating a new `UIAlertController`: we did that in project 2.
- The `addTextField()` method just adds an editable text input field to the `UIAlertController`. We could do more with it, but it's enough for now.
- The `addAction()` method is used to add a `UIAlertAction` to a `UIAlertController`. We used this in project 2 also.
- The `present()` method is also from project 2. Clearly project 2 was brilliant!

That leaves the tricky stuff: creating `submitAction`. These handful of lines of code demonstrate no fewer than four new things to learn, all of which are important. I'm going to sort them easiest first, starting with `UITextField`.

`UITextField` is a simple editable text box that shows the keyboard so the user can enter something. We added a single text field to the `UIAlertController` using its `addTextField()` method, and we now read out the value that was inserted.

Next up is *trailing closure syntax*. We covered this while you were learning the Swift fundamentals, but now you can see it in action: rather than specifying a `handler` parameter, we pass the code we want to run in braces *after* the method call.

Next, `action in`. If you remember project 2, we had to modify the `askQuestion()` method so that it accepted a `UIAlertAction` parameter saying what button was tapped, like this:

```swift
func askQuestion(action: UIAlertAction!) {
```

We had no choice but to do that, because the `handler` parameter for `UIAlertAction` expects a method that takes itself as a parameter, and we also added a default value of “nil” so we could call it ourselves - hence the `!` part. And that's what's happening here: we're giving the `UIAlertAction` some code to execute when it is tapped, and it wants to know that that code accepts a parameter of type `UIAlertAction`.

The `in` keyword is important: everything before that describes the closure; everything after that *is* the closure. So `action in` means that it accepts one parameter in, of type `UIAlertAction`.

In our current project, we could simplify this even further: we don't make any reference to the `action` parameter inside the closure, which means we don't need to give it a name at all. In Swift, to leave a parameter unnamed you just use an underscore character, like this:

```swift
_ in
```

Fourth is `weak`. Swift "captures" any constants and variables that are used in a closure, based on the values of the closure's surrounding context. That is, if you create an integer, a string, an array and another class outside of the closure, then use them inside the closure, Swift captures them.

This is important, because the closure references the variables, and might even change them. But I haven't said yet what "capture" actually means, and that's because it depends what kind of data you're using. Fortunately, Swift hides it all away so you don't have to worry about it…

…except for those strong reference cycles I mentioned. *Those* you need to worry about. That's where objects can't even be destroyed because they all hold tightly on to each other - known as *strong referencing*.

Swift's solution is to let you declare that some variables aren't held onto quite so tightly. It's a two-step process, and it's so easy you'll find yourself doing it for everything just in case. In the event that Xcode thinks you’re taking it a bit too far, you’ll get a warning saying you can relax a bit.

First, you must tell Swift what variables you don't want strong references for. This is done in one of two ways: `unowned` or `weak`. These are somewhat equivalent to implicitly unwrapped optionals (unowned) and regular optionals (weak): a weakly owned reference might be `nil`, so you need to unwrap it or use optional chaining; an unowned reference is one you're certifying cannot be `nil` and so doesn't need to be unwrapped, however you'll hit a problem if you were wrong.

In our code we use this: `[weak self, weak ac]`. That declares `self` (the current view controller) and `ac` (our `UIAlertController`) to be captured as weak references inside the closure. It means the closure can use them, but won't create a strong reference cycle because we've made it clear the closure doesn't own either of them.

But that's not enough for Swift. Inside our method we're calling the `submit()` method of our view controller. We haven't created it yet, but you should be able to see it's going to take the answer the user entered and try it out in the game.

This `submit()` method is external to the closure’s current context, so when you're writing it you might not realize that calling `submit()` implicitly requires that `self` be captured by the closure. That is, the closure can't call `submit()` if it doesn't capture the view controller.

We've already declared that `self` is weakly owned by the closure, but Swift wants us to be absolutely sure we know what we're doing: every call to a method or property of the current view controller must prefixed with "`self?.`”, as in `self?.submit()`.

In project 1, I told you there were two trains of thought regarding use of `self`, and said, "The first group of people never like to use `self.` unless it's required, because when it's required it's actually important and meaningful, so using it in places where it isn't required can confuse matters."

Implicit capture of `self` in closures is that place when using `self` is required and meaningful: Swift won't let you avoid it here. By restricting your use of `self` to closures you can easily check your code doesn’t have any reference cycles by searching for "self" - there ought not to be too many to look through!

![You can add multiple text fields to an alert controller, which is perfect for accepting quick user input.](https://hackingwithswift.com/img/books/hws/5-2@2x.png)

I realize all that sounds very dense, but let’s take a look at the code again:

```swift
let submitAction = UIAlertAction(title: "Submit", style: .default) { [weak self, weak ac] action in
    guard let answer = ac?.textFields?[0].text else { return }
    self?.submit(answer)
}
```

Hopefully you can start to see how it breaks down: 

- We use trailing closure syntax to provide some code to run when the alert action is selected.
- That code will use `self` and `ac` so we declare them as being `weak` so that Swift won’t create a strong reference cycle.
- The closure expects to receive a `UIAlertAction` as its parameter, so we write that inside the opening brace.
- Everything after `in` is the actual code of the closure.
- Inside the closure we need to reference methods on our view controller using `self` so that we’re clearly acknowledging the possibility of a strong reference cycle.

It’s complicated and I’m not going to pretend otherwise, but we are going to be coming back to this repeatedly in the future - you’ll have more than enough chance to understand it better.

Before we move on, let's make your code compile again because right now it's calling `self?.submit()` and we haven't made that method yet. So, add this new method somewhere in the class:

```swift
func submit(_ answer: String) {
}
```

That's right, it's empty - but it's enough to make the code compile cleanly so we can carry on.

