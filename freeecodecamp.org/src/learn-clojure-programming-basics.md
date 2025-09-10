---
lang: en-US
title: "An Animated Introduction to Clojure - Learn Clojure Programming Basics"
description: "Article(s) > An Animated Introduction to Clojure - Learn Clojure Programming Basics"
icon: iconfont icon-clojure
category:
  - Clojure
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - clj
  - clojure
head:
  - - meta:
    - property: og:title
      content: "Article(s) > An Animated Introduction to Clojure - Learn Clojure Programming Basics"
    - property: og:description
      content: "An Animated Introduction to Clojure - Learn Clojure Programming Basics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-clojure-programming-basics.html
prev: /programming/clj/articles/README.md
date: 2025-04-10
isOriginal: false
author:
  - name: Mark Mahoney
    url : https://freecodecamp.org/news/author/markm208/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744240649396/3e68ef22-3109-4b43-841e-e947f1821a76.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Clojure > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/clj/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="An Animated Introduction to Clojure - Learn Clojure Programming Basics"
  desc="This tutorial introduces the programming language, Clojure. Clojure is an awesome functional programming language that runs on Java's Virtual Machine (JVM). It is sometimes called a LISP, which is short for 'LISt Processing'. You'll need to have some..."
  url="https://freecodecamp.org/news/learn-clojure-programming-basics"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744240649396/3e68ef22-3109-4b43-841e-e947f1821a76.png"/>

This tutorial introduces the programming language, Clojure. [<VPIcon icon="iconfont icon-clojure"/>Clojure](https://clojure.org/) is an awesome functional programming language that runs on Java's Virtual Machine (JVM). It is sometimes called a LISP, which is short for '**LIS**t **P**rocessing'.

You'll need to have some previous programming experience in another language to get the most out of this tutorial. Clojure is so different from most imperative programming languages that it doesn't really matter where you are coming from as long as you know the basics (variables, if statements, loops, and functions).

If you are looking for a complete beginner's guide to programming, you can find some of my other programming content below.

Here, I will cover functions, data structures, immutability, closures, tail recursion, lazy sequences, macros, and concurrency.

Clojure is a functional programming language. In it, the function is king and data is immutable. This may be a different paradigm than you are used to, but there are some compelling reasons to use it. Clojure's immutability is particularly good for programs that need to take advantage of modern hardware on laptops and mobile phones (multiple processors sharing a single memory).

Clojure runs on the [<VPIcon icon="fa-brands fa-wikipedia-w"/>JVM](https://en.wikipedia.org/wiki/Java_virtual_machine). It can be difficult to set up Clojure because it involves installing Java, Leiningen, and sometimes an editor plugin. To make things easier, I recommend starting with a web-based IDE. There is no easier way to start programming in Clojure than using [<VPIcon icon="iconfont icon-replit"/>replit](https://replit.com/). I recommend using it to write your first programs in Clojure. If you feel up to it, check out [<VPIcon icon="iconfont icon-clojure"/>these docs](https://clojure.org/guides/install_clojure) to get started on your own machine.

Even if you don't use Clojure every day, learning it will change how you think about programming. It will help you understand recursion, higher-order functions, and data transformations in a new way. These ideas transfer well to other languages like JavaScript, Python, or Rust. In short, learning Clojure will make you a better programmer.

::: tabs

@tab:active Code Playbacks

This material will not be delivered like traditional online tutorials or video series. Each section includes links to interactive **code playbacks** that visually animate changes made to a program in a step-by-step manner, helping you understand how it was written.

A code playback shows how a program evolves by replaying all the steps in its development. It has an author-supplied narrative, screenshots, whiteboard-style drawings, and self-grading multiple choice questions to make the learning process more dynamic and interactive.

Here's a short YouTube video explaining how to view a code playback:

<VidStack src="youtube/uYbHqCNjVDM" />

@tab Playback Press

[<VPIcon icon="fas fa-globe"/>Playback Press](https://playbackpress.com/books) is a platform for sharing interactive code walkthroughs that I created. I’m Mark, by the way, a professor of computer science. These books provide interactive programming lessons through step-by-step animations, AI tutoring, and quizzes.

If you want to see the full Clojure 'book', you can go here:

> [<VPIcon icon="fas fa-globe"/>An Animated Introduction to Clojure](https://playbackpress.com/books/cljbook), by Mark Mahoney

I also built [<VPIcon icon="fas fa-globe"/>Storyteller](https://markm208.github.io/), the free and open-source tool that powers code playbacks.

@tab AI Tutor

When viewing a code playback, you can ask an AI tutor about the code. It answers questions clearly and patiently, making it a helpful resource for learners. You can also ask the AI tutor to generate new self-grading multiple-choice questions to test your knowledge of what you are learning.

To access the AI tutor and self-grading quizzes, simply create a free account on Playback Press and add the [<VPIcon icon="fas fa-globe"/>book](https://playbackpress.com/books/cljbook) to your bookshelf.

:::

---

## Introduction to Clojure

These first few programs show how to print to the screen, perform basic arithmetic, and store some data. Go through each of these now:

- [<VPIcon icon="fas fa-globe"/>Hello World!!!](https://playbackpress.com/books/cljbook/chapter/1/1)
- [<VPIcon icon="fas fa-globe"/>Readers/evaluators and simple arithmetic](https://playbackpress.com/books/cljbook/chapter/1/2)
- [<VPIcon icon="fas fa-globe"/>Dog age converter](https://playbackpress.com/books/cljbook/chapter/1/3)

This program shows how to use the Java capability that it built into to the JVM.

- [<VPIcon icon="fas fa-globe"/>Java interoperability](https://playbackpress.com/books/cljbook/chapter/1/4)

These programs show some basic data structures in Clojure and how they are immutable.

- [<VPIcon icon="fas fa-globe"/>Clojure data structures](https://playbackpress.com/books/cljbook/chapter/1/5)
- [<VPIcon icon="fas fa-globe"/>Efficient immutability (more with data structures)](https://playbackpress.com/books/cljbook/chapter/1/6)

::: tip Hands-On Practice

**Problem 1**

Write a Clojure program that prompts the user for the length and width of a wooden board in inches. Then display the number of whole square feet that are in the board. For example, if the height is 27 inches and the width is 34 inches, then the number of square feet is 6.375.

**Problem 2**

Write a program that creates an empty list and use `def` to store a reference to it called `empty-list`. Use `cons` to add your name to it and store it in a new list called `my-name`.

Use `conj` to add all of your siblings to a list called `me-and-my-siblings` (if you don't have any or don't have that many you can use some of the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Kardashians](https://en.wikipedia.org/wiki/Kardashian_family#Members_of_the_Kardashian-Jenner_Family)).

Print all the names in `me-and-my-siblings`. Then print the third name on the list `me-and-my-siblings`.

Create a map with all of your siblings' names as keys and their birth years as values. Use `assoc` to add your name and birth year to the map. Use the map to print everyone's name and their age in the year 2050.

**Problem 3**

Create a map with the number of days in each of the months called `days-in-months`. Use Clojure keywords like `:jan` and `:feb` as the keys and the number of days in the months as the values.

Create a second map from the first that has 29 days for February. Call this one `days-in-months-leapyear`. Make sure to do this efficiently, use `assoc` to create a new value for February. Finally, print each of the maps.

:::

---

## Functions

Next, I'll discuss creating and calling functions in Clojure. Clojure is a functional programming language so this is a pretty important topic.

The first two programs show how to write functions in Clojure.

- [<VPIcon icon="fas fa-globe"/>Functions in Clojure](https://playbackpress.com/books/cljbook/chapter/2/1)
- [<VPIcon icon="fas fa-globe"/>Fizz Buzz](https://playbackpress.com/books/cljbook/chapter/2/2)

This program shows how to use a map to encapsulate data along with some functions that manipulate the data.

- [<VPIcon icon="fas fa-globe"/>Maps as objects](https://playbackpress.com/books/cljbook/chapter/2/3)

These programs show how to read and write to a file using functions.

- [<VPIcon icon="fas fa-globe"/>Reading from a file (with CS poetry)](https://playbackpress.com/books/cljbook/chapter/2/4)
- [<VPIcon icon="fas fa-globe"/>Writing to a file](https://playbackpress.com/books/cljbook/chapter/2/5)

::: tip Hands-On Practice

**Problem 1**

Write three mathematical functions:

- `square` squares a passed in parameter
- `cube` cubes a passed in parameter
- `pow` raises a base number to an exponent

For this group of functions, do not use any built-in mathematical functions.

Hint: look at the Clojure function `repeat` and `reduce` for the `pow` function. Use the `let` function to hold temporary values so that they can be referred to later.

**Problem 2**

Write a function that takes a number and will calculate the factorial value for that number.

```clj
5! is 5 * 4 * 3 * 2 * 1 = 120

10! is 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 = 3,628,800
```

Hint: this type of problem is typically done with recursion. But for now, try to do it without recursion. Look at the Clojure `range` and `reduce` functions.

**Problem 3**

Write a function that determines whether a number is prime or not. Use the `range` and `filter` functions to filter out non-primes in a range of values.

Hint: look at the `not-any?` and `mod` functions for determining whether a number is prime or not.

**Problem 4**

Write a function that takes one or more string parameters, converts them to numbers, and then adds them together and returns the sum.

```clj
(println (add-strings "10")) ;prints 10

(println (add-strings "10" "20")) ;prints 30

(println (add-strings "10" "20" "30")) ;prints 60

(println (add-strings "10" "20" "30" "40")) ;prints 100
```

Use Clojure's `reduce` function or `apply` to turn the strings into numbers and then add them together.

:::

---

## Closures

A closure is a way to associate data permanently with a function.

The first program shows how to bind data to a function.

- [<VPIcon icon="fas fa-globe"/>Closures](https://playbackpress.com/books/cljbook/chapter/3/1)

The second program shows a more complex example of using closures.

- [<VPIcon icon="fas fa-globe"/>Interest in an account](https://playbackpress.com/books/cljbook/chapter/3/2)

::: tip Hands-On Practice

**Problem 1**

Write a function that returns a function. The Fibonacci numbers are a sequence of numbers that are generated by summing the previous two numbers together:

```clj
0 1 1 2 3 5 8 13 21 34 ...
```

Usually, the first two numbers are assumed to be 0 and 1. But in this case, return a function that uses the specified first two numbers in the sequence. Then generate and print out the requested numbers in the sequence.

```clj
(defn fibs-fn[firstFib secondFib] ...) ;;fill this in

(def another-fib (fibs-fn 10 15)) ;;create a fib function that prints starting with 10 and 15

(another-fib 5) ;;print first 5 fibs: 10 15 25 40 65
```

:::

---

## Recursion

A recursive function is one that calls itself. Since every function call results in a stack frame being placed on the call stack, regular recursion runs the risk of 'blowing up the call stack'. Tail recursion, with `recur`, is an efficient way to simulate recursion without the downsides.

- [<VPIcon icon="fas fa-globe"/>Tail Recursion](https://playbackpress.com/books/cljbook/chapter/4/1)
- [<VPIcon icon="fas fa-globe"/>Recursion and Fizz-Buzz](https://playbackpress.com/books/cljbook/chapter/4/2)
- [<VPIcon icon="fas fa-globe"/>Recursion and Square Roots](https://playbackpress.com/books/cljbook/chapter/4/3)
- [<VPIcon icon="fas fa-globe"/>Converting a String to an Integer in the Bases 2-16](https://playbackpress.com/books/cljbook/chapter/4/4)
- [<VPIcon icon="fas fa-globe"/>Mortgage Scheduler](https://playbackpress.com/books/cljbook/chapter/4/5)

::: tip Hands-On Practice

**Problem 1**

Write a recursive function to reverse the letters of a string.

```clj
(reverse-string "Mark Mahoney") ;;returns "yenohaM kraM"
```

You may need to create a recursive 'helper' function that takes a different number of parameters than the non-recursive function or use the `loop` form. Make sure you use recursion with the `recur` form so that you do not 'blow the stack'.

**Problem 2**

Write a function that will join a series of strings together separated by another string. The function should create and return a new string. Use recursion with `recur`.

```clj
(defn join [separator & parts]
   ;;your code here)

(join ", " "Mark" "Laura" "Buddy" "Patrick" "Willy") ;;"Mark, Laura, Buddy, Patrick, Willy"
```

**Problem 3**

Write a function that takes in an integer and converts it to a string. The user can specify the base that the string is in from 2-10. The program should use recursion and `recur` (either a recursive function or the `loop` form).

```clj
(to-string 100 10) ;;"100" decimal
(to-string 7 2) ;;"111" binary
```

:::

---

## Lazy Sequences

A lazy sequence defers the cost of creating values until they are needed. The first program shows how to create a lazy sequence. The next two are more concrete examples.

- [<VPIcon icon="fas fa-globe"/>Lazy sequences](https://playbackpress.com/books/cljbook/chapter/5/1)
- [<VPIcon icon="fas fa-globe"/>Lazy Prime Generator (Fizz Buzz part 3)](https://playbackpress.com/books/cljbook/chapter/5/2)
- [<VPIcon icon="fas fa-globe"/>Poker Probabilities](https://playbackpress.com/books/cljbook/chapter/5/3)

::: tip Hands-On Practice

**Problem 1**

Create a function that generates a lazy sequence of squares. For example, (1 4 9 16 ... to infinity). Use it to print the first 10 squared values.

Then write a function that generates a lazy sequence of values raised to a power:

```clj
(defn lazy-pow [start-val power]
  ...)

(take 6 (lazy-pow 10 2)) ;(100 121 144 169 196 225)
(take 6 (lazy-pow 10 3)) ;(1000 1331 1728 2197 2744 3375)
```

**Problem 2**

Write a function that generates an infinite lazy sequence of possible permutations of the passed in sequence.

```clj
(take 3 (lazy-perm ["a" "b" "c"]))
;("a" "b" "c")

(take 12 (lazy-perm ["a" "b" "c"])) 
;("a" "b" "c" "aa" "ab" "ac" "ba" "bb" "bc" "ca" "cb" "cc")

(take 39 (lazy-perm ["a" "b" "c"])) 
;("a" "b" "c" "aa" "ab" "ac" "ba" "bb" "bc" "ca" "cb" "cc" "aaa" "aab" "aac" "aba" "abb" "abc" "aca" "acb" "acc" "baa" "bab" "bac" "bba" "bbb" "bbc" "bca" "bcb" "bcc" "caa" "cab" "cac" "cba" "cbb" "cbc" "cca" "ccb" "ccc")

(take 120 (lazy-perm ["a" "b" "c"]))
;("a" "b" "c" "aa" "ab" "ac" "ba" "bb" "bc" "ca" "cb" "cc" "aaa" "aab" "aac" "aba" "abb" "abc" "aca" "acb" "acc" "baa" "bab" "bac" "bba" "bbb" "bbc" "bca" "bcb" "bcc" "caa" "cab" "cac" "cba" "cbb" "cbc" "cca" "ccb" "ccc" "aaaa" "aaab" "aaac" "aaba" "aabb" "aabc" "aaca" "aacb" "aacc" "abaa" "abab" "abac" "abba" "abbb" "abbc" "abca" "abcb" "abcc" "acaa" "acab" "acac" "acba" "acbb" "acbc" "acca" "accb" "accc" "baaa" "baab" "baac" "baba" "babb" "babc" "baca" "bacb" "bacc" "bbaa" "bbab" "bbac" "bbba" "bbbb" "bbbc" "bbca" "bbcb" "bbcc" "bcaa" "bcab" "bcac" "bcba" "bcbb" "bcbc" "bcca" "bccb" "bccc" "caaa" "caab" "caac" "caba" "cabb" "cabc" "caca" "cacb" "cacc" "cbaa" "cbab" "cbac" "cbba" "cbbb" "cbbc" "cbca" "cbcb" "cbcc" "ccaa" "ccab" "ccac" "ccba" "ccbb" "ccbc" "ccca" "cccb" "cccc")
```

:::

---

## Macros

A macro specifies some code to be executed, sort of like a function, but it also allows some of that code to be replaced with values that come from the user.

The code in a macro is kind of like a template that can be altered to suit the caller’s needs. With this powerful feature, the language can be expanded to do things that the language inventor never thought to add.

- [<VPIcon icon="fas fa-globe"/>Macros](https://playbackpress.com/books/cljbook/chapter/6/1)
- [<VPIcon icon="fas fa-globe"/>Set macros](https://playbackpress.com/books/cljbook/chapter/6/2)

::: tip Hands-On Practice

**Problem 1**

Write a macro that takes in a grade earned on a student assignment (on a 0-100 scale) and some code to execute if the grade is a passing or failing.

```clj
(defmacro eval-grade [grade if-passing if-failing] ...)
```

And use it to print or call a function based on the value of the grade

```clj
(def users-grade 43)

(eval-grade users-grade (println "Passing") (println "Failing")) ;;"Failing"

(eval-grade users-grade (praise users-grade) (warning users-grade)) ;;call the warning function
```

:::

---

## Concurrency

Concurrency in Clojure is a big topic. I start by discussing threads. Then I talk about different strategies for dealing with data that is shared among different threads.

- [<VPIcon icon="fas fa-globe"/>Threads](https://playbackpress.com/books/cljbook/chapter/7/1)
- [<VPIcon icon="fas fa-globe"/>Threaded poker](https://playbackpress.com/books/cljbook/chapter/7/2)
- [<VPIcon icon="fas fa-globe"/>refs and threads](https://playbackpress.com/books/cljbook/chapter/7/3)
- [<VPIcon icon="fas fa-globe"/>Atoms](https://playbackpress.com/books/cljbook/chapter/7/4)
- [<VPIcon icon="fas fa-globe"/>Poker with atoms](https://playbackpress.com/books/cljbook/chapter/7/5)
- [<VPIcon icon="fas fa-globe"/>Thread logging with agents](https://playbackpress.com/books/cljbook/chapter/7/6)
- [<VPIcon icon="fas fa-globe"/>Simpler concurrency](https://playbackpress.com/books/cljbook/chapter/7/7)

::: tip Hands-On Practice

**Problem 1**

This lab asks you to create a Clojure program that will count how many primes are in a given range.

Create a thread pool and have each thread check a single number in the range. If it finds a prime, it will increase a counter (which should be an `atom` since it is shared by all of the threads). Look at the program above on Atoms as a starting point.

:::

---

## Conclusion

If you've made it this far, you’ve already taken meaningful steps toward learning a language that can change how you write and think about code.

Clojure offers a fresh perspective on programming, one that focuses on simplicity, immutability, and the power of functions. Learning Clojure will change your brain and you will take these lessons with you to other languages as well.

So keep experimenting, keep asking questions, and keep practicing to sharpen your skills.

---

## Comments and Feedback

You can find all of these code playbacks in the free 'book', [<VPIcon icon="fas fa-globe"/>An Animated Introduction to Clojure](https://playbackpress.com/books/cljbook/). There are more free books here:

- [<VPIcon icon="fas fa-globe"/>An Animated Introduction to Programming in C++](https://playbackpress.com/books/cppbook/)
- [<VPIcon icon="fas fa-globe"/>An Animated Introduction to Programming with Python](https://playbackpress.com/books/pybook)
- [<VPIcon icon="fas fa-globe"/>Database Design and SQL for Beginners](https://playbackpress.com/books/sqlbook)
- [<VPIcon icon="fas fa-globe"/>Worked SQL Examples](https://playbackpress.com/books/workedsqlbook)
- [<VPIcon icon="fas fa-globe"/>Programming with SQLite](https://playbackpress.com/books/sqlitebook)
- [<VPIcon icon="fas fa-globe"/>An Introduction to Web Development from Back to Front](https://playbackpress.com/books/webdevbook)
- [<VPIcon icon="fas fa-globe"/>An Animated Introduction to Clojure](https://playbackpress.com/books/cljbook)
- [<VPIcon icon="fas fa-globe"/>An Animated Introduction to Elixir](https://playbackpress.com/books/exbook)
- [<VPIcon icon="fas fa-globe"/>A Brief Introduction to Ruby](https://playbackpress.com/books/rubybook)
- [<VPIcon icon="fas fa-globe"/>Mobile App Development with Dart and Flutter](https://playbackpress.com/books/flutterbook)
- [<VPIcon icon="fas fa-globe"/>OO Design Patterns with Java](https://playbackpress.com/books/patternsbook)
- [<VPIcon icon="fas fa-globe"/>How I Built It: Word Zearch](https://playbackpress.com/books/wordzearchbook)

Comments and feedback are welcome via email: [<VPIcon icon="fas fa-envelope"/>`mark@playbackpress.com`](mailto:mark@playbackpress.com).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Animated Introduction to Clojure - Learn Clojure Programming Basics",
  "desc": "This tutorial introduces the programming language, Clojure. Clojure is an awesome functional programming language that runs on Java's Virtual Machine (JVM). It is sometimes called a LISP, which is short for 'LISt Processing'. You'll need to have some...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-clojure-programming-basics.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
