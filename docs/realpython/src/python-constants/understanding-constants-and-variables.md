---
lang: en-US
title: "Understanding Constants and Variables"
description: "Article(s) > (1/7) Python Constants: Improve Your Code's Maintainability"
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/7) Python Constants: Improve Your Code's Maintainability"
    - property: og:description
      content: "Understanding Constants and Variables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-constants/understanding-constants-and-variables.html
date: 2025-01-19
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Constants: Improve Your Code's Maintainability",
  "desc": "In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability.",
  "link": "/realpython.com/python-constants/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Constants: Improve Your Code's Maintainability"
  desc="In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability."
  url="https://realpython.com/python-constants#understanding-constants-and-variables"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg"/>

**Variables** and **constants** are two historical and fundamental concepts in computer programming. Most programming languages use these concepts to manipulate data and work in an effective and logical fashion.

Variables and constants will probably be present in each project, app, library, or other piece of code that you’ll ever write. The question is: what are variables and constants in practice?

---

## What Variables Are

In math, a variable is defined as a symbol that refers to a value or quantity that *can* change over time. In programming, a variable is also a symbol or name typically associated with a memory address containing a value, object, or piece of data. Like in math, the content of a programming variable can change during the execution of the code that defines it.

Variables typically have a descriptive name that’s somehow associated with a target value or object. This target value can be of any data type. So, you can use variables to represent [**numbers**](/realpython.com/python-numbers.md), [**strings**](/realpython.com/python-strings.md), sequences, custom objects, and more.

You can perform two main operations on a variable:

1. **Access** its value
2. **Assign** it a new value

In most programming languages, you can access the value associated with a variable by citing the variable’s name in your code. To assign a new value to a given variable, you’ll use an [**assignment**](/realpython.com/python-variables.md#variable-assignment) statement, which often consists of the variable’s name, an [**assignment operator**](/realpython.com/python-assignment-operator.md), and the desired value.

In practice, you’ll find many examples of magnitudes, data, and objects that you can represent as variables. A few examples include temperature, speed, time, and length. Other examples of data that you can treat as variables include the number of registered users in a [**web app**](/realpython.com/python-web-applications.md), the number of active characters in a [**video game**](/realpython.com/platformer-python-arcade.md), and the number of miles covered by a runner.

---

## What Constants Are

Math also has the concept of **constants**. The term refers to a value or quantity that *never* changes. In programming, constants refer to names associated with values that never change during a program’s execution.

Just like variables, programming constants consist of two things: a name and an associated value. The name will clearly describe what the constant is all about. The value is the concrete expression of the constant itself.

Like with variables, the value associated with a given constant can be of any of data type. So, you can define integer constants, floating-point constants, character constants, string constants, and more.

After you’ve defined a constant, it’ll only allow you to perform a single operation on it. You can only *access* the constant’s value but not change it over time. This is different from a variable, which allows you to access its value, but also reassign it.

You’ll use constants to represent values that won’t change. You’ll find lots of these values in your day-to-day programming. A few examples include the speed of light, the number of minutes in an hour, and the name of a project’s root folder.

---

## Why Use Constants

In most programming languages, constants protect you from accidentally changing their values somewhere in the code when you’re coding at two in the morning, causing unexpected and hard-to-debug errors. Constants also help you make your code more readable and maintainable.

Some advantages of *using constants* instead of *using their values directly* in your code include:

### Improved readability

A descriptive name representing a given value throughout a program is always more readable and explicit than the bare-bones value itself. For example, it’s easier to read and understand a constant named `MAX_SPEED` than the concrete speed value itself.

### Clear communication of intent

Most people will assume that `3.14` may refer to the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Pi](https://en.wikipedia.org/wiki/Pi) constant. However, using the `Pi`, `pi`, or `PI` name will communicate your intent more clearly than using the value directly. This practice will allow other developers to understand your code quickly and accurately.

### Better maintainability

Constants enable you to use the same name to identify the same value throughout your code. If you need to update the constant’s value, then you don’t have to change every instance of the value. You just have to change the value in a single place: the constant definition. This improves your code’s maintainability.

### Lower risk of errors

A constant representing a given value throughout a program is less error-prone than several explicit instances of the value. Say that you use different precision levels for Pi depending on your target calculations. You’ve explicitly used the values with the required precision for every calculation. If you need to change the precision in a set of calculations, then replacing the values can be error-prone because you can end up changing the wrong values. It’s safer to create different constants for different precision levels and change the code in a single place.

### Reduced debugging needs

Constants will remain unchanged during the program’s lifetime. Because they’ll always have the same value, they shouldn’t cause errors and bugs. This feature may not be necessary in small projects, but it may be crucial in large projects with multiple developers. Developers won’t have to invest time debugging the current value of any constant.

### Thread-safe data storage

Constants can only be accessed, not written. This feature makes them [<VPIcon icon="fa-brands fa-wikipedia-w"/>thread-safe](https://en.wikipedia.org/wiki/Thread_safety) objects, which means that several threads can simultaneously use a constant without the risk of corrupting or losing the underlying data. |

As you’ve learned in this table, constants are an important concept in programming for good reason. They can make your life more pleasant and your code more reliable, maintainable, and readable. Now, when should you use constants?

---

## When Use Constants

Life, and particularly science, is full of examples of constant values, or values that never change. A few examples include:

- $3.141592653589793$: A constant denoted by $\pi$, spelled as *Pi* in English, which represents the ratio of a circle’s [<VPIcon icon="fa-brands fa-wikipedia-w"/>circumference](https://en.wikipedia.org/wiki/Circumference) to its diameter
- $2.718281828459045$: A constant denoted by $e$ and known as [<VPIcon icon="fa-brands fa-wikipedia-w"/>Euler’s number](https://en.wikipedia.org/wiki/E_(mathematical_constant)), which is closely related to the [<VPIcon icon="fa-brands fa-wikipedia-w"/>natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) and [<VPIcon icon="fa-brands fa-wikipedia-w"/>compound interest](https://en.wikipedia.org/wiki/Compound_interest)
- $3,600$: The number of seconds in one hour, which is considered constant in most applications, even though [<VPIcon icon="fa-brands fa-wikipedia-w"/>leap seconds](https://en.wikipedia.org/wiki/Leap_second) sometimes are added to account for variability in the Earth’s rotation speed
- $-273.15$: A constant representing [<VPIcon icon="fa-brands fa-wikipedia-w"/>absolute zero](https://en.wikipedia.org/wiki/Absolute_zero) in degrees Celsius, which is equal to 0 kelvins on the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Kelvin](https://en.wikipedia.org/wiki/Kelvin) temperature scale

All the above examples are constant values that people commonly use in life and science. In programming, you’ll often find yourself dealing with these and many other similar values that you can consider and treat as constants.

In summary, use a constant to represent a quantity, magnitude, object, parameter, or any other piece of data that’s supposed to remain unchanged during its lifetime.
