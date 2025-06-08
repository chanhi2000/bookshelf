---
lang: en-US
title: "What are Decorators in Python? Explained with Code Examples"
description: "Article(s) > What are Decorators in Python? Explained with Code Examples"
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
      content: "Article(s) > What are Decorators in Python? Explained with Code Examples"
    - property: og:description
      content: "What are Decorators in Python? Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/decorators-in-python-tutorial.html
prev: /programming/py/articles/README.md
date: 2024-06-19
isOriginal: false
author:
  - name: Samyak Jain
    url : https://freecodecamp.org/news/author/samyakjainblog/
cover: https://www.freecodecamp.org/news/content/images/2024/07/decorators-in-python.jpg
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
  name="What are Decorators in Python? Explained with Code Examples"
  desc="In this tutorial, you will learn about Python decorators: what they are, how they work, and when to use them. Table of Contents Foundation for Decorators [Introduction to Python Decorators](#Introduction to Python Decorators) Creating Simple Decorat..."
  url="https://freecodecamp.org/news/decorators-in-python-tutorial"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://www.freecodecamp.org/news/content/images/2024/07/decorators-in-python.jpg"/>

In this tutorial, you will learn about Python decorators: what they are, how they work, and when to use them.

Decorators are a powerful and elegant way to extend the behavior of functions or methods without modifying their actual code. But before diving into decorators, it's helpful to understand two foundational concepts in Python: first-class functions and closures.

---

## Foundation for Decorators

### First-Class Functions in Python

First-class functions mean that functions in Python are treated like any other object. This implies that functions can be:

- Passed as arguments to other functions.
- Returned from other functions.
- Assigned to variables.

### Understanding Closures

Closures in Python allow a function to remember the environment in which it was created. This means the inner function has access to the variables in the local scope of the outer function even after the outer function has finished executing.

Let’s look at an example to understand closures:

```py
def outer_func():
    greet = "Hello!"

    def inner_func():
        print(greet)

    return inner_func

new_function = outer_func()
new_function()  # Outputs: Hello!
new_function()  # Outputs: Hello!
```

In this example:

- We have `outer_func` that doesn't take any parameters but has a local variable `greet`.
- An `inner_func` is defined within `outer_func` that prints `greet`.
- When we call `outer_func`, it returns `inner_func` but does not execute it immediately. We assign the returned function to `new_function`. Now, `new_function` can be called later, and it will remember the `greet` variable from `outer_func`’s scope, printing "Hello!" each time it’s called.

This is what a closure is—it remembers our `greet` variable even after the outer function has finished executing.

#### Modifying Closures with Parameters

Let's enhance our closure by passing a parameter to the `outer_func` instead of using a local variable:

```py
def outer_func(greet):
    def inner_func():
        print(greet)
    return inner_func

namaste_func = outer_func("Namaste!")
howdy_func = outer_func("Howdy!")

namaste_func()  # Outputs: Namaste!
howdy_func()    # Outputs: Howdy!
```

Here:

- `outer_func` now takes a parameter `greet`.
- The `inner_func` prints this `greet`.
- When we call `outer_func` with "Namaste!" and "Howdy!", it returns functions that remember these specific messages.

So, this was a quick brief about first-class functions and closures. If you want to learn more about them you can read this comprehensive blog [**here**](/freecodecamp.org/first-class-functions-and-closures-in-python.md).

---

## Introduction to Python Decorators

A decorator is a function that takes another function as an argument, adds some functionality, and returns a new function. This allows you to "wrap" another function to extend its behavior (adding some functionality before or after) without modifying the original function's source code.

So, this is the closure example that we used above:

```py
def outer_func(greet):
    def inner_func():
        print(greet)
    return inner_func
```

### Now, let's look at a Decorator Example:

```py
def decorator_function(func):
    def wrapper_function():
        return func()
    return wrapper_function
```

Here, instead of a value (like `greet`), we're accepting a function (`func`) as an argument. Within our `wrapper_function`, instead of just printing out a message, we're going to execute this `func` and then return that.

### Applying Decorators to Functions

Here's how we can apply our decorator to a simple function:

```py
def decorator_function(func):
    def wrapper_function():
        return func()
    return wrapper_function

def display():
    print('The display function was called')

decorated_display = decorator_function(display)
decorated_display()  # Outputs: The display function was called
```

In this example:

- We define a simple function `display` that prints a message.
- We apply the `decorator_function` to `display`, creating a new variable`decorated_display`.
- When we call `decorated_display()`, it runs the `wrapper_function` inside our decorator, which in turn calls and returns the `display` function.

### Using the @ Syntax for Decorators

Python provides a more readable way to apply decorators using the `@` symbol. This syntax is easier to understand and is commonly used in Python code:

```py
def decorator_function(func):
    def wrapper_function():
        print(f'Wrapper executed before {func.__name__}')
        return func()
    return wrapper_function

@decorator_function
def display():
    print('The display function was called')

display()  # Outputs: Wrapper executed before display
           #          The display function was called
```

Here:

- We use `@decorator_function` decorator above the `display` function definition which is equivalent to `display = decoratorFunction(display)`.
- Now, when we call `display()`, it automatically goes through the decorator, printing the additional message first.

---

## How to Handle Functions with Arguments

The decorator we've written so far won't work if our original function takes arguments. For example, consider the following function:

```py
def display_info(name, age):
    print('display_info was called with ({}, {})'.format(name, age))

display_info('Kalam', 83)  # Outputs: display_info was called with (Kalam, 83)
```

If we try to apply our current decorator to `display_info`, it will raise an error because the `wrapperFunction` takes no arguments but the original function expects two.

### Modifying the Decorator to Handle Arguments

We can modify our decorator to accept any number of positional and keyword arguments by using `*args` and `**kwargs`.

```py
import functools

def decoratorFunction(func):
    @functools.wraps(func)
    def wrapperFunction(*args, **kwargs):
        print('Wrapper executed before {}'.format(func.__name__))
        return func(*args, **kwargs)
    return wrapperFunction

@decoratorFunction
def display():
    print('The display function was called')

@decoratorFunction
def display_info(name, age):
    print('display_info was called with ({}, {})'.format(name, age))

display_info('Kalam', 83)  
display()
```

In this updated decorator:

- `wrapperFunction` now accepts any number of positional (`*args`) and keyword arguments (`**kwargs`).
- These arguments are passed to `func` when it is called inside `wrapperFunction`.

The output of this will be:

```plaintext title="output"
Wrapper executed before display_info
display_info was called with (Kalam, 83)
Wrapper executed before display
The display function was called
```

This setup makes our decorator flexible enough to handle any function, regardless of its parameters.

BTW, Notice how we added new functionality to two different functions (`display()` and `display_info()`) without altering them? This is one of the main benefits of decorators: they allow us to extend the behavior of several functions in a DRY (Don't Repeat Yourself) way, as demonstrated in this example.

---

## How to Use Classes as Decorators

While function-based decorators are common, you can also use classes to create decorators. Using classes as decorators can offer more flexibility and readability, especially for complex decorators.

To help you understand them better, We'll turn a function-based decorator into a class-based decorator:

### Original Function-Based Decorator

Let's start with a simple function-based decorator:

```py
def decoratorFunction(func):
    def wrapperFunction(*args, **kwargs):
        print('Wrapper executed before calling {}'.format(func.__name__))
        return func(*args, **kwargs)
    return wrapperFunction
```

### Creating a Class-Based Decorator

To turn this function-based decorator into a class-based decorator, follow these steps:

#### Step 1: Define the Class

First, we define a new class called `DecoratorClass`. This class will handle the decoration process.

```py
class DecoratorClass:
    pass
```

#### Step 2: Implement the** **`__init__` Method

The `__init__` is a special method that initializes the object when an instance of the class is created.  
Next, we pass the function to be decorated (`func`) as an argument to the `__init__` method and store it in an instance variable `self.func`.

```py
class DecoratorClass:
    def __init__(self, func):
        self.func = func
```

#### Step 3: Implement the `__call__` Method

The `__call__` method is a special method that allows an instance of the class to be called as a function. This method is essential because it handles the actual decoration logic. In this case:

- The `__call__` method takes `*args` and `**kwargs` to handle any number of positional and keyword arguments.
- Inside `__call__`, we print a message and then call the original function with its arguments.

```py
class DecoratorClass:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print('Executing wrapper before {}'.format(self.func.__name__))
        return self.func(*args, **kwargs)
```

### Using the Class-Based Decorator

We can now use the `@` syntax to apply the class-based decorator to functions, just as we did with the function-based decorator.

```py
@DecoratorClass
def display():
    print('display function executed')

@DecoratorClass
def display_info(name, age):
    print('display_info function executed with arguments ({}, {})'.format(name, age))
```

### Running the Decorated Functions

When we call the decorated functions, the `__call__` method of `DecoratorClass` is executed:

```py
display_info('Kalam', 83)
display()
```

### Complete Example

Here is the complete example with the class-based decorators:

```py
class DecoratorClass:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        print('Executing wrapper before {}'.format(self.func.__name__))
        return self.func(*args, **kwargs)

@DecoratorClass
def display():
    print('display function executed')

@DecoratorClass
def display_info(name, age):
    print('display_info function executed with arguments ({}, {})'.format(name, age))

display_info('Kalam', 83)
display()
```

In this class-based decorator:

- **`__init__` Method:** This method binds the original function to an instance of the class.
- **`__call__` Method:** This method allows an instance of `DecoratorClass` to be called as a function. It prints a message and then calls the original function with any provided arguments.
- **Decorating Functions:** We use the `@DecoratorClass` syntax to decorate the `display` and `display_info` functions.
- **Execution:** When `display_info('Kalam', 83)` is called, the `__call__` method of `DecoratorClass` is executed, printing the message and then executing `display_info`. Similarly, when `display()` is called, it executes the `__call__` method, prints the message, and then executes `display`.

Both function-based and class-based decorators provide the same functionality. The choice between them depends on personal preference and the complexity of the decorator logic.

---

## Best Practices for Using Decorators

When using decorators in Python, it's essential to follow best practices to maintain clean, maintainable code that aligns with Pythonic conventions.

### 1. Preserve Function Metadata with `functools.wraps`

When you create a decorator, the original function's metadata (such as its name, docstring, and module) is often lost. This can lead to confusion and issues with introspection, documentation, and debugging. To preserve this metadata, use the `functools.wraps` decorator within your wrapper function.

`functools.wraps` was introduced in Python 2.5 as part of the `functools` module, which provides higher-order functions and operations on callable objects. The `wraps` decorator is specifically designed to update the wrapper function to look more like the wrapped function by copying attributes such as the function name, module, and docstring (yes, you guessed it right - `functools.wraps()` itself is a decorator).

Let's see an Example:

```py
import functools

def decoratorFunction(func):
    @functools.wraps(func)
    def wrapperFunction(*args, **kwargs):
        print(f'Wrapper executed before {func.__name__}')
        return func(*args, **kwargs)
    return wrapperFunction

@decoratorFunction
def display():
    """Display function docstring"""
    print('The display function was called')

print(display.__name__)   # Outputs: display
print(display.__doc__)    # Outputs: Display function docstring
```

In this example, `@functools.wraps(func)` is used to ensure that the `wrapperFunction` retains the original `func`'s metadata.

### 2. Keep Decorators Simple and Focused

A decorator should have a single responsibility and should not try to do too many things. If a decorator becomes complex, consider breaking it down into multiple, simpler decorators that can be composed together. Example:

```py
import functools

def log_function_call(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f'Calling {func.__name__}')
        return func(*args, **kwargs)
    return wrapper

def measure_time(func):
    import time
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f'{func.__name__} took {end - start} seconds')
        return result
    return wrapper

@log_function_call
@measure_time
def compute_square(n):
    return n * n

print(compute_square(5))
```

In this example, `log_function_call` and `measure_time` are simple, single-responsibility decorators that can be composed to add both logging and timing functionality to `compute_square`. This is what Decorators do - providing a clean and readable way to implement common patterns like logging and timing.

### 3. Use Descriptive Names for Decorators and Wrapped Functions

Choose clear and descriptive names for your decorators and the functions they wrap so they clearly indicates their functionality. This makes the purpose and behavior of the code more apparent.

### 4. Document Your Decorators

Always document your decorators, explaining their purpose and how they should be used. This is especially important if others will use your decorators or if you are working in a team.

---

## Practical Applications of Decorators

Now you might be wondering, "Okay, decorators are fancy and all, but how and where do we actually use them?" Well, here are some practical applications:

- **Logging Function Calls**:<br/>Logging is a common requirement for tracking the usage of functions and methods, especially in debugging and monitoring applications.
- **Timing Functions**:<br/>Decorators can measure the time it takes for a function to execute, which is useful for performance analysis.

We have seen both the examples above in the [best practices section.](#keep-decorators-simple-and-focused)

Beyond these common uses, there are other usecases such as:

- **Input Validation:**<br/>Decorators can be used to validate inputs to functions, ensuring that they meet certain criteria before the function proceeds.
- **Memoization**:<br/>The `memoize` function is a decorator that helps to cache (store) the results of expensive function calls and reuse the cached result when the same inputs occur again. This technique is called Memoization and it is useful to optimize the performance, especially for recursive functions like calculating Fibonacci numbers.

```py
from functools import wraps

def validate_non_negative(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if any(arg < 0 for arg in args):
            raise ValueError("Arguments must be non-negative")
        return func(*args, **kwargs)
    return wrapper

@validate_non_negative
def square_root(x):
    return x ** 0.5

print(square_root(4))
```

```py
import functools

def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args in cache:
            return cache[args]
        result = func(*args)
        cache[args] = result
        return result
    return wrapper

@memoize
def fibonacci(n):
    if n in {0, 1}:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

fibonacci(10)
```

Run [this function (<FontIcon icon="iconfont icon-github"/>`theSamyak`)](https://gist.github.com/theSamyak/09a54ed5a6cc0380ee34a1a527f2c9e8) to see the time difference when running Fibonacci function with or without memoization.

- **Access Control and Authentication**:<br/>In web applications, access control and authentication are crucial for security. Decorators can be used to enforce user permissions, ensuring that only authorized users can access certain functions or endpoints.

```py
from functools import wraps

def requires_login(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not user_is_logged_in():
            raise Exception("User not logged in")
        return func(*args, **kwargs)
    return wrapper

@requires_login
def view_dashboard():
    return "Dashboard content"

# user_is_logged_in is a placeholder for the actual authentication check function.
```

---

## Conclusion

Decorators in Python provide a clean and powerful way to extend the behavior of functions. By understanding first-class functions and closures, you can grasp how decorators work under the hood.

Whether you're using function-based or class-based decorators, you can enhance your functions without altering their original code, keeping your codebase clean and maintainable.

- Decorators are powerful for extending the functionality of functions.
- They can be implemented using functions or classes.
- The `@decorator` syntax is a cleaner and more readable way to apply decorators.
- They help keep your code DRY (Don't Repeat Yourself) by abstracting common functionality.

**Thank you for reading!** If you have any comments, criticism, or questions, feel free to tweet or reach out to me at [<FontIcon icon="fa-brands fa-x-twitter"/> `@OGsamyak`](https://x.com/OGsamyak). Your feedback helps me improve!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What are Decorators in Python? Explained with Code Examples",
  "desc": "In this tutorial, you will learn about Python decorators: what they are, how they work, and when to use them. Table of Contents Foundation for Decorators [Introduction to Python Decorators](#Introduction to Python Decorators) Creating Simple Decorat...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/decorators-in-python-tutorial.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
