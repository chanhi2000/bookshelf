---
lang: en-US
title: "Code Refactoring Best Practices - with Python Examples"
description: "Article(s) > Code Refactoring Best Practices - with Python Examples"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Code Refactoring Best Practices - with Python Examples"
    - property: og:description
      content: "Code Refactoring Best Practices - with Python Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/best-practices-for-refactoring-code.html
prev: /programming/py/articles/README.md
date: 2022-08-19
isOriginal: false
author: David Fagbuyiro
cover: https://freecodecamp.org/news/content/images/2022/08/Author-Share-ImageFREE--1-.jpeg
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
  name="Code Refactoring Best Practices - with Python Examples"
  desc="In this article, I will discuss what code refactoring is. We'll go over why you need to refactor your code, the advantages of code refactoring, and some best practices for code refactoring. What is Code Refactoring? Refactoring means organizing your ..."
  url="https://freecodecamp.org/news/best-practices-for-refactoring-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/08/Author-Share-ImageFREE--1-.jpeg"/>

In this article, I will discuss what code refactoring is. We'll go over why you need to refactor your code, the advantages of code refactoring, and some best practices for code refactoring.

---

## What is Code Refactoring?

Refactoring means organizing your code without modifying its original functionality. Refactoring is the process of making small changes or adjustments to your code without affecting or changing how the code functions while in use.

---

## Why Do You Need to Refactor Your Code?

### It Helps Improve Your Code/Program

Refactoring helps you improve the design of your software because developing applications is a difficult task. As you add additional functions, the relevance of the program may be affected. Then, abstractions are no longer as pure as they once were.

You can improve things by refactoring your code regularly to demonstrate a better understanding of the program or code you're working with.

### It Gives You a Better Understanding of the Code

If you refactor properly, your code will be more easily understandable afterwards. You can also make the code easier to understand by improving the design.

It is common knowledge that developers read code far more frequently than they write it. As a result, it's in your best interest to keep things as simple as possible, which considerably improves maintainability. Also, people who read it in the future will be grateful.

### Refactoring Broadens Your Knowledge

Finally, refactoring is a method of active learning. Even if you didn't write the code, refactoring it gives you a better grasp of what it does.

---

## How Refactoring Helps Your Team

Refactoring is a common activity for software development teams. If done correctly, refactoring your code makes it easier for your team members to understand your code and the changes you've made.

The refactoring stage is often difficult for teams to include in their process. But refactoring, in my opinion, is an essential component of working on any process. Adding comments for me entails leaving the code in a better state than when I found it.

Whatever you do, avoid creating a separation between technical value and business value (creating the feature). You can do this by keeping the code understandable.

---

## Refactoring Best Practices - with Python Examples

If you want to get the most benefit from restructuring your code, you should keep the following in mind:

- Refactor only tested code. Without tests, refactoring code is, to put it bluntly, gambling. If you don't have tests that verify that the before and after are equivalent, you can't be certain you didn't break the code. No matter how disciplined you are, eventually, you'll introduce bugs.
- Minimize refactoring. The modification is riskier the more drastic it is. Divide it into several more compact portions. You get flexibility and mitigation.
- Take little, gradual steps. Check to see if everything is working after making a small code change.
- Observe the guidelines. Don't begin adding functionality while refactoring is still being done. Refactoring has no impact on the system's output. Before moving on to the next challenge, complete this one.

Below is an example of code refactoring using the **Define function** in Python to find the force (F) required to move an object of mass (m) with an acceleration (a) given by the formula “F = m x a”.

Because we are performing a repeated task, it's a good idea to use a function instead of using only the conditional statement. So when we need to in the future, we just have to call the function out for usage.

::: tabs

@tab Before

Code Before Refactoring:

```py
#Using the Force formula F=ma

while True:
    mass = int(input("Enter the mass value: "))
    if mass &gt; 0:
        break
while True:
    acceleration = int(input("Enter the acceleration: "))
    if acceleration &gt; 0:
        break
print("The Force is", mass * acceleration)
```

Notice how the two blocks look nearly identical. What if we’re calculating the “Work done” by a person or machine? Most likely, we’d copy and paste the while loop, changing the variable name and input prompt. Now let's use a function to refactor this.

@tab After

Code After Refactoring:

```py
#REFACTORED code

def input_positive_integer(prompt):
   while True:
      input_value = int(input(prompt))
      if input_value &gt; 0:
         return input_value
mass = input_positive_integer("Enter the mass: ")
acceleration = input_positive_integer("Enter the acceleration: ")
print("The Force is", mass * acceleration)
```

:::

Now that our code is simpler to understand, we can start to save some lines of code. What's more, in the future, we'll be able to effortlessly insert our function into another script by just calling out the function, saving us time.

Here are some other tips to keep in mind while refactoring your Python code:

### Use List Comprehension Instead of a For Loop

One of the most well-known Python constructs is list comprehension. Compared to several basic for loops, list comprehension provides a cleaner, quicker solution.

The code will run more quickly, existing data won't be altered, and list comprehensions are simpler to understand at a glance once you become used to them.

Below is a simple expression of using list comprehension instead of a For Loop:

::: tabs

@tab:active Before

Initial code:

```py
#List Comprehension instead of For Loop

numbers = [1,2,3,4,5,6,7,8]
odd_numbers = []
for item in numbers:
   if item % 2 == 1:
      odd_numbers.append(item)
print(odd_numbers)

#Outcome will be [1,3,5,7]
```

In the above example, we loop through a list of integers (numbers) to see if we should enter each one into the odd numbers list.

@tab After

Refactored code:

```py
numbers = [1,2,3,4,5,6,7,8]
odd_numbers = [item for item in numbers if item % 2 == 1]
print (odd_numbers)
```

:::

In the above-refactored code, the list comprehension is an assignment into the odd numbers. Then we iterate over the "numbers" and set the return (the first item). Then, we can include an if-statement to filter.

### Use Def Functions for Repetitive Tasks

Defining functions for repetitive tasks is the first and perhaps most significant refactoring we can perform.

Although functions provide many advantages, from the standpoint of refactoring, we will shorten our code and increase readability. In addition, you only have to update the job once, in the declaration of the function (the example given below).

::: tabs

@tab Before

Initial code:

```py
#Using the Work done expression W=f<em>d</em>

while True:
   force = int(input("Enter the force value:   "))
   if force &gt; 0:
      break
while True:
   distance = int(input("Enter the distance value:   "))
   if distance &gt; 0:
      break
print("The Workdone is", force distance)
```

@tab After

Refactored code:

```py
#REFACTORED code

def input_positive_integer(prompt):
   while True:
      input_value = int(input(prompt))
      if input_value &gt; 0:
         return input_value
force = input_positive_integer("Enter the force value:   ")
distance = input_positive_integer("Enter the distance:   ")
print("The Workdone is", force * distance, "J")
```

:::

### Use Ternary Operators Instead of if-else Statements

You can use an easy if-statement like this to find if an input integer is an "even" or "odd" number instead of an if-else statement:

```py
# USING TERNARY OPERATOR

to_check = int(input("Enter a whole number :"))
msg = "Even" if to_check%2 == 0 else "Odd"
print("The number you entered is", msg, "number")


# USING USUAL IF-ELSE

to_check = int(input("Enter a whole number :"))
msg = ""
if(to_check%2 == 0):
   msg = "Even"
else:
   msg = "Odd"
print("The number you entered is", msg, "number")
```

The ternary operator is used in the code above to determine if an integer is even or odd.

`msg` will be assigned `Even` if the condition (`to_check % 2 == 0`) is true. `msg` will also be assign `Odd` if the condition (to `check % 2 == 0`) is not true.

Note: you can't use the ternary operator to replace any code that uses an if-else expression. For example, if-else statements involving more than two cases.

### Use the Enumerate Function Instead of `Range()`

Python for loops can be complicated, especially if you are coming from another programming language.

Initially, you might have thought to make an index variable and use it to loop through your list. As a result, people often find and utilize the range() method. But it's not a best practice to use this method. Below is an example:

Code Before Refactoring:

```py
colors = ["white", "black", "brown"]
for i in range(len(colors)):
   print(i+1, colors[i])
# 1 white
# 2 black
# 3 brown
```

Using the index on the initial list makes it more difficult to understand and encourages poor habits like changing original values. Particularly in complex nested data structures.

Additionally, we need to manually change the index's values into "counting numbers."

Code After Refactoring:

```py
colors = ["white", "black", "brown"]
for i, colors in enumerate(colors, 1):
   print(i, colors)
  
# 1 white
# 2 black
# 3 brown
```

The enumerate() method returns the current counter value and each item in the iterable and requires two arguments: the iterable and the initial count value.

Note: It is a typical error to order the temporary count variable first in the for loop and the initial count value second in the function call.

---

## Conclusion

Hopefully, you now understand what code refactoring is along with the importance and reasons for refactoring your code.

Based on the simple Python code above, you should understand that refactoring does not necessarily mean your code needs to be shorter after refactoring - but just somehow simpler and more understandable.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Code Refactoring Best Practices - with Python Examples",
  "desc": "In this article, I will discuss what code refactoring is. We'll go over why you need to refactor your code, the advantages of code refactoring, and some best practices for code refactoring. What is Code Refactoring? Refactoring means organizing your ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/best-practices-for-refactoring-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
