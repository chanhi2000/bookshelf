---
lang: en-US
title: "5. Functions and Scope"
description: "Article(s) > (5/12) How to Learn Python for JavaScript Developers [Full Handbook]"
category:
  - Python
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
  - javascript
  - js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (5/12) How to Learn Python for JavaScript Developers [Full Handbook]"
    - property: og:description
      content: "5. Functions and Scope"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-python-for-javascript-developers-handbook/5-functions-and-scope.html
date: 2024-11-22
isOriginal: false
author: German Cocca
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Learn Python for JavaScript Developers [Full Handbook]",
  "desc": "As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m...",
  "link": "/freecodecamp.org/learn-python-for-javascript-developers-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Learn Python for JavaScript Developers [Full Handbook]"
  desc="As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m..."
  url="https://freecodecamp.org/news/learn-python-for-javascript-developers-handbook#heading-5-functions-and-scope"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg"/>

Functions are the building blocks of any programming language. They allow you to encapsulate code for reuse, organization, and clarity.

Both Python and JavaScript support first-class functions, meaning functions can be assigned to variables, passed as arguments, and returned from other functions. But there are differences in how functions are defined, scoped, and used in each language.

---

## Defining Functions in Python vs. JavaScript

::: tabs

@tab <FontIcon icon="fa-brands fa-python"/>

In Python, functions are defined using the `def` keyword, followed by the function name, parameters in parentheses, and a colon. Python uses indentation to define the function body, which makes the syntax clean and readable.

@tab <FontIcon icon="fa-brands fa-js"/>

In JavaScript, functions can be defined in several ways: using the `function` keyword, as an arrow function (`=>`), or as a method within an object. Modern JavaScript commonly uses arrow functions for their brevity and lexical `this` behavior.

:::

**Example**: Basic Function Definition

::: tabs

@tab:active <FontIcon icon="fa-brands fa-python"/>

```py
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Output: Hello, Alice!
```

@tab <FontIcon icon="fa-brands fa-js"/>

```js
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Alice")); // Output: Hello, Alice!
```

**Arrow Functions in JavaScript:**

```js
const greet = (name) => `Hello, ${name}!`;
console.log(greet("Alice")); // Output: Hello, Alice!
```

:::

::: note Key Differences:

1. Python uses explicit keywords like `def` and `return`, while JavaScript has multiple ways to define functions, which can sometimes be overwhelming for beginners.
2. Arrow functions in JavaScript provide concise syntax but are not equivalent to Python’s lambda (more on that below).

:::

---

## Scope Rules: Closures in JavaScript vs. LEGB Rule in Python

**Scope** refers to where a variable is accessible in your code. Both Python and JavaScript have rules for variable scoping, but they are implemented differently.

::: tabs

@tab:active <FontIcon icon="fa-brands fa-python"/>LEGB Rule

Python uses the LEGB rule to determine variable scope:

- **L**ocal: Variables defined inside a function.
- **E**nclosing: Variables in the nearest enclosing scope (for example, nested functions).
- **G**lobal: Variables defined at the top level of the module.
- **B**uilt-in: Predefined names in Python (for example, `len`, `print`).

Example of Python scope:

```py
x = "global"

def outer_function():
    x = "enclosing"

    def inner_function():
        x = "local"
        print(x)

    inner_function()

outer_function()  # Output: local
print(x)          # Output: global
```

@tab <FontIcon icon="fa-brands fa-js"/>Closures

JavaScript handles scope using function-level and block-level scoping. Variables declared with `let` and `const` have block scope, while `var` has function scope.

Closures are an essential concept in JavaScript, allowing inner functions to access variables from their outer (enclosing) functions even after the outer function has executed.

Example of JavaScript closure:

```js
function outerFunction() {
    let x = "enclosing";

    function innerFunction() {
        let x = "local";
        console.log(x);
    }

    innerFunction();
}

outerFunction(); // Output: local
```

:::

::: note Key Differences

- Python’s scope is determined by its LEGB rule, whereas JavaScript relies on closures and block scoping (with `let` and `const`).
- Python has explicit mechanisms like the `global` and `nonlocal` keywords to modify variable scope, while JavaScript uses closures implicitly.

:::

---

## Anonymous Functions: Lambda Expressions vs. Arrow Functions

::: tabs

@tab:active <FontIcon icon="fa-brands fa-python"/>Lambda Expressions

Python’s `lambda` allows you to define small, unnamed functions in a single line. They are typically used for short-lived operations, like filtering or mapping, where defining a full function would be unnecessary.

Example of a Python lambda:

```py
square = lambda x: x ** 2
print(square(5))  # Output: 25

# Using lambda in a map function
numbers = [1, 2, 3, 4]
squared = map(lambda x: x ** 2, numbers)
print(list(squared))  # Output: [1, 4, 9, 16]
```

@tab <FontIcon icon="fa-brands fa-js"/>Arrow Functions

Arrow functions in JavaScript serve a similar purpose but are more versatile. They provide a concise way to define functions and automatically bind `this` to the enclosing context, which is particularly useful in object-oriented or asynchronous programming.

Example of a JavaScript arrow function:

```js
const square = (x) => x ** 2;
console.log(square(5)); // Output: 25

// Using an arrow function in map
const numbers = [1, 2, 3, 4];
const squared = numbers.map((x) => x ** 2);
console.log(squared); // Output: [1, 4, 9, 16]
```

:::

::: note Key Differences

1. **Purpose**: Python’s `lambda` is limited to single expressions and is primarily used for quick operations. Arrow functions in JavaScript are more flexible and can have multiple statements and explicit return values.
2. **Scope Binding**: Arrow functions inherit the `this` context of their enclosing block, while Python’s lambdas are independent functions with no context-related behavior.

:::

---

## Function Parameters and Default Values

Both Python and JavaScript support default parameter values, but Python offers additional features like keyword arguments and variable-length arguments (`*args` and `**kwargs`).

::: tabs

@tab:active <FontIcon icon="fa-brands fa-python"/> Default and Variable-Length Arguments

```py
def greet(name="World", *args, **kwargs):
    print(f"Hello, {name}!")
    print("Arguments:", args)
    print("Keyword Arguments:", kwargs)

greet("Alice", 1, 2, color="blue", age=30)
# Output:
# Hello, Alice!
# Arguments: (1, 2)
# Keyword Arguments: {'color': 'blue', 'age': 30}
```

@tab <FontIcon icon="fa-brands fa-js"/> Default Parameters

```js
function greet(name = "World", ...args) {
    console.log(`Hello, ${name}!`);
    console.log("Arguments:", args);
}

greet("Alice", 1, 2, { color: "blue", age: 30 });
// Output:
// Hello, Alice!
// Arguments: [1, 2, { color: 'blue', age: 30 }]
```

:::

Python’s keyword arguments (`**kwargs`) provide a more structured way to handle optional parameters compared to JavaScript’s `arguments` or rest parameters.

---

### Key Takeaways

- Python’s function syntax (`def`) is straightforward and emphasizes readability, while JavaScript offers flexibility with `function`, arrow functions, and method definitions.
- Python’s LEGB scope rule makes variable visibility predictable and explicit, while JavaScript’s closures offer powerful but implicit scoping.
- Python’s `lambda` expressions are limited to simple operations, whereas JavaScript’s arrow functions provide greater flexibility and contextual `this` binding.
- Python’s support for keyword and variable-length arguments adds flexibility and clarity when passing data to functions.

This section demonstrates that while both languages handle functions and scope effectively, Python’s approach prioritizes simplicity and readability, while JavaScript offers more flexibility and dynamic behavior. Both approaches have their advantages, depending on the task at hand.
