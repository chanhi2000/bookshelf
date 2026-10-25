---
lang: en-US
title: "How Does Recursion Work? Explained with Code Examples"
description: "Article(s) > How Does Recursion Work? Explained with Code Examples"
icon: fa-brands fa-python
category: 
  - Python
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Does Recursion Work? Explained with Code Examples"
    - property: og:description
      content: "How Does Recursion Work? Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-recursion.html
prev: /programming/py/articles/README.md
date: 2024-07-26
isOriginal: false
author: Palistha
cover: https://freecodecamp.org/news/content/images/size/w1000/2024/07/Frame-1--6-.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Does Recursion Work? Explained with Code Examples"
  desc="In this article, you will learn about recursion and how it works. You need a good understanding of how functions work before learning recursion. I have used Python code for examples in this article because of its simple syntax, but the concept of recursion is the same for every programming..."
  url="https://freecodecamp.org/news/what-is-recursion/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w1000/2024/07/Frame-1--6-.png"/>

In this article, you will learn about recursion and how it works.

You need a good understanding of how functions work before learning recursion. I have used Python code for examples in this article because of its simple syntax, but the concept of recursion is the same for every programming language.

---

## What is Recursion?

In most programming languages, a function can call another function. But a function can also call itself. Recursion is the technique where a function calls itself.

Here's an example:

```py
def call_me():
    call_me()
```

Here, the function calls itself, which is called recursion.

But "calling itself" is just a programmatic definition of recursion. Recursion involves breaking down a problem into smaller pieces to the point that it cannot be further broken down. You solve the small pieces and put them together to solve the overall problem.

---

## Real Life Analogy of Recursion

Lets understand how recursion really works with the help of an example.

Imagine you're in line for a Disney ride, and you don't know how many people are ahead of you.

To find out, you ask the person in front of you.

![Trying to find out how many people are in front of you in line](https://freecodecamp.org/news/content/images/2024/07/How-many--4-.png)

That person also doesn't know, so they ask the person in front of them.

This process continues until the question reaches the person at the very front of the line, who sees that there is no one in front of them and replies that there are zero people ahead.

The replies then start to propagate back through the line. Each person adds one to the number they were told before passing the information back.

When the person at the front replies, **"There are 0 people ahead"** the next person adds one and replies, **"There is 1 person ahead"** and so on.

![Everyone knows how many people are in front of them in line](https://freecodecamp.org/news/content/images/2024/07/How-many--5-.png)

By the time the response reaches the person directly in front of you, they add one more and tell you. This way, you can determine your position in the line by just adding **1** to the number the person in front of you gave.

This example illustrates how recursion breaks a problem into smaller subproblems and then combines their solutions to solve the original problem.

Each person in the line represents a smaller instance of the same problem: determining the number of people ahead. By solving these smaller instances and combining their results, the overall problem is resolved. This is exactly how recursion works.

---

## Technical Details of Recursion

The most important things to consider while coding recursion is to find out:

- **Recursive Case**: Minimum work we can do. In the above example, asking the person in front of you how many people are ahead of them is the least amount of work we can do.
- **Base Case**: Condition where no work is required. In the above example, the person on the front of the line doesn’t have to ask anything so it is the condition where no work is required.

---

## Simple Example of Recursion

Calculating a factorial is the simplest example of recursion that will really help you understand how it works.

There are many ways to calculate the factorial of a number. But here we will see the recursive way to find it.

Before thinking about how we do it, we need to know what the factorial of a number is.

The factorial of a number is the multiplication of all numbers from $1$ up to that number.

For example, the factorial of $5$ is $120$ - that is $5\times4\times3\times2\times1$.

We can also represent this mathematically like this:

$$
5\times\left(5−1\right)!
$$

This means that if we know the value of $\left(5−1\right)!$ we can easily get the factorial by just multiplying $5$ by it.

Here’s how we find the factorials of $4$, $3$, $2$, $1$, and $0$:

```
Factorial of 4 = 4×(4−1)!
Factorial of 3 = 3×(3−1)!
Factorial of 2 = 2×(2−1)!
Factorial of 1 = 1
Factorial of 0 = 1
```

By looking at this, it is clear that to find the factorial of $5$, we must multiply $5$ by $4!$.

### More general example

To find the factorial of $n$, we need to multiply $n$ with $\left(n−1\right)!$. This is something you need to do recursively.

Now, there must be a stopping condition for recursion. The stopping condition is where we perform no further operation. When $n$ is $1$ or $n$ is $0$, we can simply stop the recursion as these values have known factorials. We can simply say the factorial of $1$ is $1$ and the same is true for $0$

So, breaking it down, the minimum amount of work we need to do to find the factorial of n is $n\times\left(n−1\right)!$. And we can stop performing operations on it when we find the factorial of $1$ or $0$.

Let's see how it looks in code:

```py
# calculate factorial of n
def fact(n):

    # no work required
    if n == 1 or n == 0:
        return 1

    # minimum amount of work
    return n * fact(n - 1)

n = 5

# calculate factorial
factorial = fact(n)
print(factorial)
#
# Output:
# 
# 120
```

Let's see how it works:

In the first function call, the factorial of $5$ is evaluated. Then in the second call, the factorial of $4$ is evaluated, and so on until the factorial of $2$ is evaluated.

![Recursively calculating Factorial of $5$](https://freecodecamp.org/news/content/images/2024/07/Frame-1--5-.png)

While calling the factorial of $2$, we have `2×fact(2−1)`, which is `2×fact(1)`.

This hits our base case. So, the recursion stops and `2×fact(1)` returns `2×1` to the preceding function call, and the result gets popped up the stack.

![Fourth function call returning 2 to preceding function call and getting popped up from the stack](https://freecodecamp.org/news/content/images/2024/07/Frame-3.png)

Similarly, here’s how everything else evaluates:

![3rd function call returning 6 to the preceding function call and getting popped up from the stack](https://freecodecamp.org/news/content/images/2024/07/Frame-4.png)

![2nd function call returning 24 to the preceding function call and getting popped up from the stack](https://freecodecamp.org/news/content/images/2024/07/Frame-5.png)

![1st function call returning 120 to the initial function call and getting popped up from the stack](https://freecodecamp.org/news/content/images/2024/07/Frame-6.png)

So the function finally returns the value $120$ to the initial function call.

### Why Do We Need a Base Case?

In the above example we have used the stopping condition for the code. But what if we don’t add a stopping condition or what if the function we write never meets the stopping condition?

Will the code run forever?

No - even if you don’t terminate, your code won't run forever. Let’s understand why this is the case with the help of an example.

```py
def print_five():
    print(5)

    # call itself
    print_five()

# function call
print_five()
# 
# Output:
# 
# 5
# 5
# 5
# ...
# RecursionError: maximum recursion depth exceeded
```

If you run the above code, you will see that the function doesn’t run forever and ends with a message `RecursionError: maximum recursion depth exceeded`.

When a function is invoked, it is stored in a call stack. Here's how the function `print_five()` is stored in the call stack when it is invoked for the first time.

![Call stack on the first function call](https://freecodecamp.org/news/content/images/2024/07/How-many--6-.png)

The function calls itself again and again, and the function is stored in the call stack with each call.

![Call stack after n function calls](https://freecodecamp.org/news/content/images/2024/07/How-many--8-.png)

But the call stack has a limited size and cannot store an unlimited number of functions.

![No space on call stack resulting in stack overflow](https://freecodecamp.org/news/content/images/2024/07/How-many--7-.png)

When the stack is full, it cannot accommodate any more calls, causing a stack overflow error.

Therefore, the base case is essential to prevent such errors and ensure the recursion terminates properly.

Now let's see another example to understand recursion even more.

---

## How to Check if a Word is a Palindrome

Before we dive into the code, you should know what a palindrome is. A palindrome is a word that reads the same forwards and backwards.

For example, `racecar` reads the same forwards and backwards.

To check if a word is a palindrome, we have to check if the first and last letters are the same. If they are, we then check if the second and second-to-last letters are the same.

![Check if first and last characters of racecar are the same](https://freecodecamp.org/news/content/images/2024/07/Frame-7.png)

In the context of `racecar`, the first and last letters are the same, so we check if the second and second-to-last letters are the same. They are, so now we check if the third and third-to-last letters are the same. Now there is only one letter left to check. A single letter is always a palindrome because it reads the same both ways.

![How to check if racecar is a palindrome](https://freecodecamp.org/news/content/images/2024/07/Frame-8.png)

So, now let's try thinking about it recursively, which involves the minimum amount of work and determining when no work is required.

### Minimum amount of work

Check if the first and last letters are the same, and if they are, remove the first and last letters from the word.

### No work required

When there is one letter or no letters left at all, we can simply say it is a palindrome.

Now, let's see how the code looks:

```py
# check palindrome
def check_palindrome(text):

    # stopping condition
    # if the size of text is 1 or 0 return true
    if len(text) == 0 or len(text) == 1:
        return True

    # least amount of work
    # check if first and last char are the same
    # if same remove first and last char from string
    if(text[0]==text[-1]):
        return(check_palindrome(text[1:-1]))

    return False

# check if string is palindrome
text = "racecar"
is_palindrome = check_palindrome(text)
print(is_palindrome)
```

Here's how the above code works:

![Check if racecar is a palindrome](https://freecodecamp.org/news/content/images/2024/07/Frame-9.png)

![Check if racecar is a palindrome](https://freecodecamp.org/news/content/images/2024/07/checkpalindrome.png)

---

## When to Use Recursion

Recursion can appear elegant and simple. But it often requires many steps to solve even simple problems due to the CPU overhead from repeatedly adding methods to the stack. So before using it, make sure you carefully consider whether it's the right solution for your problem.

When code requires multiple loops and looks confusing and messy, recursion can offer a cleaner solution. Its use, however, depends on the specific code and the type of data or data structure involved. For data structures like trees and graphs, recursion can be particularly useful.

Despite its simplicity in appearance, recursion can be hard to understand and may take multiple steps even for simple problems. So again, make sure you think about your particular use case.

---

## Wrapping Up

This is just an introduction to recursion. There are many cases where recursion is used, and you might be confused about how everything works. I will cover more advanced examples on recursion in the next article.

By the way, here are the resources that I found simple and useful while learning recursion:

- [<VPIcon icon="fa-brands fa-youtube"/>freeCodeCamp video on recursion](https://youtu.be/IJDJ0kBx2LM&t=657s): I have to give a shout-out to freeCodeCamp for their excellent video on recursion, which inspired much of this article.
- [<VPIcon icon="fas fa-globe"/>Recursion by Programiz Pro](https://programiz.pro/course/learn-recursion-with-python): Another good resource is the Recursion course by Programiz. It's a premium course, so it's not free, but it's thoughtfully designed. Plus, you can actually practice directly on their platform, which makes it well worth it.

<VidStack src="youtube/IJDJ0kBx2LM" />

No matter where you learn from, don't spend too much time searching for the perfect resource. Just grasp the concepts and start practicing—that's the only way you'll truly learn.

<!-- START: ARTICLE CARD -->
```component VPCard
{
  "title": "How Does Recursion Work? Explained with Code Examples",
  "desc": "By Palistha In this article, you will learn about recursion and how it works. You need a good understanding of how functions work before learning recursion. I have used Python code for examples in this article because of its simple syntax, but the co...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-recursion.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
<!-- END: ARTICLE CARD -->