---
lang: ko-KR
title: "Loops"
description: "Article(s) > Loops"
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
      content: "Article(s) > Loops"
    - property: og:description
      content: "Loops"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/00/09-loops.html
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
  "title": "Loops | Hacking with iOS",
  "desc": "Loops",
  "link": "https://hackingwithswift.com/read/0/9/loops",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/IJChAEFA5as" />

Computers are great at doing boring tasks billions of times in the time it took you to read this sentence. When it comes to repeating tasks in code, you can either copy and paste your code multiple times, or you can use *loops* - simple programming constructs that repeat a block of code for as long as a condition is true.

To demonstrate this, I want to introduce you to a special debugging function called `print()`: you give it some text to print, and it will print it. If you're running in a playground like we are, you'll see your text appear in the results window. If you're running a real app in Xcode, you'll see your text appear in Xcode's log window. Either way, `print()` is a great way to get a sneak peek at the contents of a variable.

Take a look at this code:


```swift
print("1 x 10 is \(1 * 10)")
print("2 x 10 is \(2 * 10)")
print("3 x 10 is \(3 * 10)")
print("4 x 10 is \(4 * 10)")
print("5 x 10 is \(5 * 10)")
print("6 x 10 is \(6 * 10)")
print("7 x 10 is \(7 * 10)")
print("8 x 10 is \(8 * 10)")
print("9 x 10 is \(9 * 10)")
print("10 x 10 is \(10 * 10)")
```

![Printing out the ten times table with ten statements.](https://hackingwithswift.com/img/books/hws/loops-1@2x.png)

When it has finished running, you'll have the 10 times table in your playground results pane. But it's hardly efficient code, and in fact a much cleaner way is to loop over a range of numbers using what's called the closed range operator, which is three periods in a row: `...`

Using the closed range operator, we could re-write that whole thing in three lines:

```swift
for i in 1...10 {
    print("\(i) x 10 is \(i * 10)")
}
```

![Printing out the ten times table with a for loop.](https://hackingwithswift.com/img/books/hws/loops-2@2x.png)

The results pane just shows "(10 times)" for our loop, meaning that the loop was run 10 times. If you want to know what the loop actually did, click the square immediately to the right of “(10 times). You'll see a box saying "10 x 10 is 100" appear inside your code, and if you right-click on that you should see the option “Value History”. Click on that now, and you should see all the printed values over time.

![Viewing a Playground's Value History.](https://hackingwithswift.com/img/books/hws/loops-3@2x.png)

What the loop does is count from 1 to 10 (including 1 and 10), assigns that number to the constant `i`, then runs the block of code inside the braces.

If you don't need to know what number you're on, you can use an underscore instead. For example, we could print some Taylor Swift lyrics like this:

```swift
var str = "Fakers gonna"

for _ in 1...5 {
    str += " fake"
}

print(str)
```

![Appending “fake” five times with a for loop.](https://hackingwithswift.com/img/books/hws/loops-4@2x.png)

That will print "Fakers gonna fake fake fake fake fake" by adding to the string each time the loop goes around.

If Swift doesn’t have to assign each number to a variable each time the loop goes around, it can run your code a little faster. As a result, if you write `for i in…` then don’t use `i`, Xcode will suggest you change it to `_`.

There's a variant of the closed range operator called the half open range operator, and they are easily confused. The half open range operator looks like `..<` and counts from one number up to and *excluding* another. For example, `1..<5` will count 1, 2, 3, 4.

![Using a half open range operator to stop before five.](https://hackingwithswift.com/img/books/hws/loops-5@2x.png)

---

## Looping over arrays

Swift provides a very simple way to loop over all the elements in an array. Because Swift already knows what kind of data your array holds, it will go through every element in the array, assign it to a constant you name, then run a block of your code. For example, we could print out a list of great songs like this:

```swift
var songs = ["Shake it Off", "You Belong with Me", "Look What You Made Me Do"]

for song in songs {
    print("My favorite song is \(song)")
}
```

![Looping over an array with a for loop.](https://hackingwithswift.com/img/books/hws/loops-6@2x.png)

You can also use the `for i in` loop construct to loop through arrays, because you can use that constant to index into an array. We could even use it to index into two arrays, like this:

```swift
var people = ["players", "haters", "heart-breakers", "fakers"]
var actions = ["play", "hate", "break", "fake"]

for i in 0...3 {
    print("\(people[i]) gonna \(actions[i])")
}
```

![Iterating over two arrays' contents by index.](https://hackingwithswift.com/img/books/hws/loops-7@2x.png)

You might wonder what use the half open range operator has, but it's particularly useful for working with arrays because they count from zero. So, rather than counting from 0 up to and including 3, we could count from 0 up to and *excluding* the number of items in an array.

::: note Remember

they count from zero, so if they have 4 items the maximum index is 3, which is why we need to use *excluding* for the loop.

:::

To count how many items are in an array, use `someArray.count`. So, we could rewrite our code like this:

```swift
var people = ["players", "haters", "heart-breakers", "fakers"]
var actions = ["play", "hate", "break", "fake"]

for i in 0..<people.count {
    print("\(people[i]) gonna \(actions[i])")
}
```

![Looping over two arrays with a half open range.](https://hackingwithswift.com/img/books/hws/loops-8@2x.png)

---

## Inner loops

You can put loops inside loops if you want, and even loops inside loops inside loops - although you might suddenly find you're doing something 10 million times, so be careful!

We can combine two of our previous loops to create this:

```swift
var people = ["players", "haters", "heart-breakers", "fakers"]
var actions = ["play", "hate", "break", "fake"]

for i in 0..<people.count {
    var str = "\(people[i]) gonna"

    for _ in 1...5 {
        str += " \(actions[i])"
    }

    print(str)
}
```

![Using a nested for loop to print “Shake it Off”.](https://hackingwithswift.com/img/books/hws/loops-9@2x.png)

That outputs "players gonna play play play play play", then "haters gonna…" Well, you get the idea.

One important note: although programmers conventionally use `i`, `j` and even `k` for loop constants, you can name them whatever you please: `for personNumber in 0..<people.count` is perfectly valid.

---

## While loops

There's a third kind of loop you'll see, which repeats a block of code until you tell it to stop. This is used for things like game loops where you have no idea in advance how long the game will last - you just keep repeating "check for touches, animate robots, draw screen, check for touches…" and so on, until eventually the user taps a button to exit the game and go back to the main menu.

These loops are called `while` loops, and they look like this:

```swift
var counter = 0

while true {
    print("Counter is now \(counter)")
    counter += 1

    if counter == 556 {
        break
    }
}
```

![Using a while loop to iterate to 555.](https://hackingwithswift.com/img/books/hws/loops-10@2x.png)

That code introduces a new keyword, called `break`. It's used to exit a `while` or `for` loop at a point you decide. Without it, the code above would never end because the condition to check is just "true", and true is always true. Without that `break` statement the loop is an infinite loop, which is A Bad Thing.

These `while` loops work best when you're using unknown data, such as downloading things from the internet, reading from a file such as XML, looking through user input, and so on. This is because you only know when to stop the loop after you've run it a sufficient number of times.

There is a counterpart to `break` called `continue`. Whereas breaking out of a loop stops execution immediately and continues directly after the loop, continuing a loop only exits the current iteration of the loop - it will jump back to the top of the loop and pick up from there.

As an example, consider the code below:

```swift
var songs = ["Shake it Off", "You Belong with Me", "Look What You Made Me Do"]

for song in songs {
    if song == "You Belong with Me" {
        continue
    }

    print("My favorite song is \(song)")
}
```

![Using continue to skip an iteration.](https://hackingwithswift.com/img/books/hws/loops-11@2x.png)

That loops through three Taylor Swift songs, but it will only print the name of two. The reason for this is the `continue` keyword: when the loop tries to use the song "You Belong with Me", `continue` gets called, which means the loop immediately jumps back to the start - the `print()` call is never made, and instead the loop continues straight on to “Look What You Made Me Do”.

