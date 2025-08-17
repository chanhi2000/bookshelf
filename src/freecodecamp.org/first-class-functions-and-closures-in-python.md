---
lang: en-US
title: "First-Class Functions, Higher-Order Functions, and Closures in Python - Explained with Code Examples"
description: "Article(s) > First-Class Functions, Higher-Order Functions, and Closures in Python - Explained with Code Examples"
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
      content: "Article(s) > First-Class Functions, Higher-Order Functions, and Closures in Python - Explained with Code Examples"
    - property: og:description
      content: "First-Class Functions, Higher-Order Functions, and Closures in Python - Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/first-class-functions-and-closures-in-python.html
prev: /programming/py/articles/README.md
date: 2024-06-18
isOriginal: false
author:
  - name: Samyak Jain
    url : https://freecodecamp.org/news/author/samyakjainblog/
cover: https://freecodecamp.org/news/content/images/2024/07/first-class-functions-high-order-functions-and-closures-in-python.png
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
  name="First-Class Functions, Higher-Order Functions, and Closures in Python - Explained with Code Examples"
  desc="In modern programming, it's important to understand concepts like first-class functions, higher-order functions, and closures. These ideas help us write flexible and efficient code and serve as building blocks for many advanced coding techniques. Fir..."
  url="https://freecodecamp.org/news/first-class-functions-and-closures-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/first-class-functions-high-order-functions-and-closures-in-python.png"/>

In modern programming, it's important to understand concepts like first-class functions, higher-order functions, and closures. These ideas help us write flexible and efficient code and serve as building blocks for many advanced coding techniques.

First-class functions and higher-order functions allow us to treat functions as first-class citizens. We'll study what they are, but for now, just know that they make our code more powerful and reusable. Closures take this a step further by allowing functions to remember variables from their containing scope.

This tutorial will dive into these concepts and explain how they interrelate, with practical coding examples to illustrate their usage.

---

## First-Class Functions

In programming, a language is said to have first-class functions if it treats functions as first-class citizens. This means that functions in such a language can be:

1. **Assigned to variables**
2. **Passed as arguments to other functions**
3. **Returned from other functions**

In simpler terms, first-class functions can be handled like any other variable or object in the language. Let’s explore these capabilities with some coding examples.

### Assigning Functions to Variables

Typically, we call a function and assign its result to a variable. For instance:

```py
def add(a, b):
    return a + b

result = add(3, 4)

print(add)  # Prints the function object
print(result)  # Prints 7
```

Here, `add` is a function that returns the sum of two numbers. When we call `add(3, 4)`, it returns `7`, which is assigned to the variable `result`. The output of this code would be:

```
<function add at 0x...>
7
```

Now let's assign the `add` function to a variable `sum_function` without calling it (that is, without parentheses).

```py
sum_function = add
```

Printing `add` and `sum_function` shows they both refer to the same function object:

```py
print(add)   # Outputs: <function add at 0x...>
print(sum_function)   # Outputs: <function add at 0x...>
```

This demonstrates that functions can be assigned to variables just like any other data type. We can now use `sum_function` just like the original `add` function and even delete the original function name `add`, and the function will still be accessible through `sum_function`.

```py
del add
print(sum_function(3, 4))  # Output: 7
```

### Passing Functions as Arguments

Another aspect of first-class functions is the ability to pass them as arguments to other functions. This allows for greater flexibility and modularity by enabling functions to operate on other functions.

Let's illustrate this with a custom `map` function. A `map` function applies a given function to each item in a list (or array) and returns a new list with the results.

```py
def double(n):
    return n * 2

def map_function(func, values):
    result = []
    for value in values:
        result.append(func(value))
    return result

# using the custom map function
doubled_values = map_function(double, [3, 6, 9, 12, 15])
print(doubled_values)  # Output: [6, 12, 18, 24, 30]
```

In this example, the `double` function takes a number `n` and returns its double. The `map_function` function takes a function `func` and a list of `values`, applies `func` to each element in `values`, and returns a new list with the results.

When `map_function` is called with `double` and the list `[3, 6, 9, 12, 15]`, it applies the `double` function to each element in the list, resulting in `[6, 12, 18, 24, 30]`. This demonstrates how functions can be passed as arguments to create flexible and reusable code patterns.

Note that when passing the function, we do not include parentheses (that is, `double` instead of `double()`), indicating that we are passing the function itself and not the result of calling the function.

### Returning Functions from Other Functions

Returning functions from other functions is another important characteristic of first-class functions. This concept allows for the creation of more complex and modular code, often used in scenarios like creating configurable functions or closures.

To illustrate further, let's look at a practical example where a function returns another function:

```py
def create_multiplier(factor):
    """Returns a function that multiplies its input by the given factor."""
    def multiplier(x):
        return x * factor
    return multiplier

# Create specific multiplier functions
double = create_multiplier(2)
triple = create_multiplier(3)

# Use the created functions
print(double(5))  # Output: 10
print(triple(5))  # Output: 15
```

In this example, the `create_multiplier` function takes a parameter `factor` and returns another function `multiplier`. This `multiplier` function, when called with an argument `x`, returns the product of `x` and `factor`.

When `create_multiplier` is called with `2`, it returns a function that multiplies its argument by `2`. Similarly, when called with `3`, it returns a function that multiplies its argument by `3`. These returned functions (`double` and `triple`) can then be called with arguments to perform multiplication. For example, `double(5)` returns `10` and `triple(5)` returns `15`.

This is the essence of a closure - where the returned function (`multiplier`) retains access to the variable (`factor` ) from its enclosing scope, even after the outer function (`create_multiplier`) has finished executing. This allows the created functions (`double` and `triple`) to remember and use the `factor` value they were created with.

---

## Higher-Order Functions

Higher-order functions derive their power from the ability to treat functions as first-class citizens. This means functions can be passed as arguments to other functions or returned as values from them.

A higher-order function can:

- Take one or more functions as arguments
- Return a function as its result

We've seen examples of both already:

- In our "[**Passing Functions as Arguments**](/freecodecamp.org/first-class-functions-and-closures-in-python.md#passing-functions-as-arguments)" example, `map_function` is a higher-order function because it takes a function (`double`) as an argument.
- In our "[**Returning Functions from Other Functions**](/freecodecamp.org/first-class-functions-and-closures-in-python.md#returning-functions-from-other-functions)" example, `create_multiplier` is a higher-order function because it returns another function (`multiplier`) as a result.

Before we move to closures, let's quickly discuss Lambda functions, as they add another layer of flexibility and allow for more concise and expressive code.

### Lambda Functions

Lambda functions in Python, also known as anonymous functions, are small, functions defined using the `lambda` keyword. They are often used for short-term tasks that do not require a full function definition with `def`. Their Syntax is:

```py
lambda arguments: expression
```

The reason we are discussing them is b/c they can be passed as arguments to higher-order functions or returned from them, making them versatile tools in functional programming.

#### Example: Using Lambda Functions in a Custom Map Function

We previously discussed the `map_function` example. Let’s see how we can achieve the same functionality using a lambda function:

```py
def map_function(func, values):
    return [func(value) for value in values]

# Using a lambda function as the argument
doubled_values = map_function(lambda n: n * 2, [3, 6, 9, 12, 15])
print(doubled_values)  # Output: [6, 12, 18, 24, 30]
```

In this example, the lambda function `lambda n: n * 2` is passed directly to `map_function`, eliminating the need for a separate `double` function definition.

#### Example: Creating Multiplier Functions with Lambdas

Revisiting the `create_multiplier` example, we can use a lambda function for the `multiplier`:

```py
def create_multiplier(factor):
    return lambda x: x * factor

# Create specific multiplier functions
double = create_multiplier(2)
triple = create_multiplier(3)

# Use the created functions
print(double(5))  # Output: 10
print(triple(5))  # Output: 15
```

Here, `create_multiplier` returns a lambda function that multiplies its input by the specified `factor`. This is a compact and expressive way to define the same functionality.

#### The Interdependence of Higher-Order Functions and First-Class Functions:

Higher-order functions are fundamentally tied to the concept of first-class functions. Without Python's support for treating functions as first-class citizens, higher-order functions wouldn't be possible.

We can say - Without first-class functions, we cannot have higher-order functions, as they inherently rely on the ability to treat functions as first-class entities, operating on them by taking them as arguments or returning them as results.

Let's understand with more examples:

#### Example: A Higher-Order Function that Takes a Function as an Argument (First Class Function)

```py
def apply_operation(operation, x, y):
    return operation(x, y)

# Functions to pass as arguments
def add(x, y):
    return x + y

def multiply(x, y):
    return x * y

# Using the higher-order function
result_add = apply_operation(add, 3, 4)
result_multiply = apply_operation(multiply, 3, 4)

print(result_add)       # Output: 7
print(result_multiply)  # Output: 12
```

In this example, `apply_operation` is a higher-order function because it takes another function (`operation`) as an argument. The `add` and `multiply` functions are first-class functions because they can be passed as arguments to other functions.

The `apply_operation` function takes three parameters: a function (`operation`) and two integers (`x` and `y`). It returns the result of applying the `operation` function to `x` and `y`.

By calling `apply_operation(add, 3, 4)`, it returns 7, the result of adding 3 and 4. Similarly, calling `apply_operation(multiply, 3, 4)` returns 12, the result of multiplying 3 and 4. This demonstrates the flexibility and reusability of higher-order functions, showing how we can perform different operations on the same set of inputs.

#### Example: A Higher-Order Function that Returns Another Function (First Class Function)

```py
def discount_applier(discount_rate):
    def apply_discount(price):
        return price - (price * discount_rate / 100)
    return apply_discount

# Creating closures with different discount rates
holiday_discount = discount_applier(20)
member_discount = discount_applier(15)

# Applying the discounts
print(holiday_discount(100))  # Output: 80.0
print(member_discount(100))   # Output: 85.0
```

In this example, `discount_applier` takes a parameter `discount_rate` and returns a new function `apply_discount`. This makes it a "higher-order function" and `apply_discount` is considered a "first-class function" because it is defined inside `discount_applier` and returned to be used later.

This `apply_discount` function, when called with an argument `price`, returns the discounted price calculated using the `discount_rate`.

When `discount_applier` is called with a discount rate of 20, it returns a function that applies a 20% discount to its argument. Similarly, when called with a discount rate of 15, it returns a function that applies a 15% discount. These returned functions (`holiday_discount` and `member_discount`) can then be used to apply the respective discounts.

By calling `holiday_discount(100)`, it returns 80.0, applying a 20% discount to 100. Calling `member_discount(100)` returns 85.0, applying a 15% discount.

These examples illustrate how higher-order functions enable the creation of flexible, reusable, and modular code patterns by leveraging the capabilities of first-class functions. They form the foundation of many advanced programming techniques, including closures, and are essential for writing expressive and powerful code.

---

## Closures

A closure is a feature in many programming languages, including Python, that allows a function to remember and access variables from an enclosing scope even after the outer function has finished executing.

In simpler terms, a closure is an inner function that has access to variables from its containing (or outer) function, even after that outer function has completed its execution.

Let's look at a few examples to understand how closures work in Python:

### Basic Nested Function with Immediate Execution

```py
def outer_scope():
    name = 'Sam'
    city = 'New York'

    def inner_scope():
        print(f"Hello {name}, Greetings from {city}")

    return inner_scope()

outer_scope()
```

In this example, the `outer_scope` function defines two local variables: `name` and `city`. It then defines and immediately calls `inner_scope`, which prints a greeting message using the `name` and `city` variables from the enclosing scope.

When `outer_scope` is called, the nested function `inner_scope` runs, producing the greeting message: "Hello Sam, Greetings from New York".

### Returning the Inner Function

Now, let's modify the example to return the inner function without executing it immediately:

```py
def outer_scope():
    name = 'Sam'
    city = 'New York'

    def inner_scope():
        print(f"Hello {name}, Greetings from {city}")

    return inner_scope

# Assigning the inner function to a variable
greeting_func = outer_scope()

# Calling the inner function
greeting_func()
```

Here, `outer_scope` defines `name` and `city` as variables similarly to the above example. It then defines and returns the `inner_scope` function but this time without calling it (that is, `inner_scope` instead of `inner_scope()`),

When `greeting_func = outer_scope()` is executed, it assigns the `inner_scope` function returned by `outer_scope` to `greeting_func`.

Now, `greeting_func` holds a reference to the `inner_scope` function. Calling `greeting_func()` executes `inner_scope`, which prints: "Hello Sam, Greetings from New York".

Even though `outer_scope` has finished executing by the time we call `greeting_func()`, the `inner_scope` function (now referenced by `greeting_func`) retains access to the variables `name` and `city` from its enclosing scope. This is what makes it a closure - it "closes over" the variables from its containing scope.

### Using Closures with Parameters

To demonstrate the power of closures, let's create a more dynamic example by adding parameters to the `outer_scope` function:

```py
def outer_scope(name, city):

    def inner_scope():
        print(f"Hello {name}, Greetings from {city}")

    return inner_scope

# Creating closures with different names and locations
greet_priyanshu = outer_scope('Dr Priyanshu', 'Jaipur')
greet_sam = outer_scope('Sam', 'New York')

# Executing the closures
greet_priyanshu()    # Output: Hello Dr Priyanshu, Greetings from Jaipur
greet_sam()     # Output: Hello Sam, Greetings from New York
```

Now here, the `outer_scope` function takes `name` and `city` as parameters. Inside `outer_scope`, the `inner_scope` function is defined to print a greeting message using `name` and `city`. Instead of calling `inner_scope`, `outer_scope` returns the `inner_scope` function itself.

When `outer_scope` is called with specific arguments, it creates and returns a closure that captures these arguments. For instance, `greet_priyanshu` is a closure that remembers `Dr Priyanshu` and `Jaipur`, while `greet_sam` remembers `Sam` and `New York`. When these closures are called, they produce the respective greeting messages.

Even though `outer_scope` has finished executing in both cases, the `inner_scope` functions (now `greet_priyanshu` and `greet_sam`) retain access to their respective `name` and `city` variables from their enclosing scopes, demonstrating closure behavior.

If you want, you can also use a lambda function in place of our inner function (`inner_scope`) like this:

```py
def outer_scope(name, city):
    return lambda: print(f"Hello {name}, Greetings from {city}")

greet_priyanshu = outer_scope('Dr Priyanshu', 'Jaipur')
greet_sam = outer_scope('Sam', 'New York')

greet_priyanshu()    # Output: Hello Dr Priyanshu, Greetings from Jaipur
greet_sam()           # Output: Hello Sam, Greetings from New York
```

By using a lambda function, we achieve the same result but in a more concise way. The closures created by `outer_scope` still retain access to the `name` and `city` variables, demonstrating the same closure behavior.

---

## Real-World Applications of Closures

Now let's see some practical applications of closures in real-world programming. Here are a few scenarios where closures are commonly used:

### Event Handlers in Web Development (a js example but important use case)

In JavaScript, closures are often used to handle events, such as button clicks.

```html
<html>
<head>
    <title>Button Handler Example</title>
</head>
<body>
    <button id="button1">Button 1</button>
    <button id="button2">Button 2</button>

    <script>
        function createButtonHandler(buttonName) {
            return function() {
                alert(`Button ${buttonName} clicked!`);
            };
        }

        const button1 = document.getElementById('button1');
        const button2 = document.getElementById('button2');

        button1.onclick = createButtonHandler('Button 1');
        button2.onclick = createButtonHandler('Button 2');
    </script>
</body>
</html>
```

::: info Explanation:

- `createButtonHandler` is a higher-order function that takes a `buttonName` as an argument and returns a function (the closure).
- The returned function (closure) captures the `buttonName` variable from its lexical scope.
- When a button is clicked, the corresponding closure is invoked, and it has access to the `buttonName` that was passed when the handler was created.

:::

### Maintaining State in GUI Applications

In Python, closures can be used to maintain state in graphical user interface (GUI) applications, such as those created with [<FontIcon icon="iconfont icon-github"/>`theSamyak/Tkinter-V3`](https://github.com/theSamyak/Tkinter-V3).

```py
import tkinter as tk

def create_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        print(f'Button clicked {count} times')
    return counter

root = tk.Tk()
root.title('Counter Example')

counter = create_counter()
button = tk.Button(root, text='Click me', command=counter)
button.pack(pady=20)

root.mainloop()
```

::: info Explanation

- `create_counter` is a higher-order function that initializes `count` to 0 and defines a nested `counter` function.
- The `counter` function is a closure that captures the `count` variable from the enclosing scope.
- The `nonlocal` keyword allows the closure to modify the `count` variable.
- Each time the button is clicked, the `counter` function is invoked, and it increments and prints the `count`.

:::

Some other applications include:

### Creating Decorators

Decorators in Python are a powerful tool for modifying or extending the behavior of functions and methods. Closures are the underlying mechanism for implementing decorators.

You can read [**this article on Decorators**](/freecodecamp.org/decorators-in-python-tutorial.md) to learn more about them if you'd like.

### Data Hiding and Encapsulation

Closures can be used to create private variables and methods in a function, which can be accessed and modified only by the inner function. This provides a way to achieve encapsulation in Python.

---

## Conclusion

**First-class functions** allows you to treat functions as any other object or data types, offering the flexibility to:

1. Assign them to variables
2. Pass them as arguments to other functions
3. Return them from other functions

On the other hand, **Higher-order functions** not only let you treat functions like data, but they also let you use functions to create new functions or to change how other functions behave, enabling operations such as:

1. Accepting functions as arguments/parameters
2. Returning functions as results

This capability allows for dynamic and reusable code patterns, essential for functional programming.

**Closures**, in summary, allow inner functions to access variables from their enclosing scope.

Practical usage of closures includes scenarios where you need functions to remember state even after the outer function has completed execution.

**Thank you for reading!** If you have any comments, criticisms, or questions, feel free to tweet or reach out to me at @[OGsamyak](https://x.com/OGsamyak). Your feedback helps me improve!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "First-Class Functions, Higher-Order Functions, and Closures in Python - Explained with Code Examples",
  "desc": "In modern programming, it's important to understand concepts like first-class functions, higher-order functions, and closures. These ideas help us write flexible and efficient code and serve as building blocks for many advanced coding techniques. Fir...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/first-class-functions-and-closures-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
