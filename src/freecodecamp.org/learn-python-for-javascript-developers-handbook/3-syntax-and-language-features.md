---
lang: en-US
title: "3. Syntax and Language Features"
description: "Article(s) > (3/12) How to Learn Python for JavaScript Developers [Full Handbook]"
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
      content: "Article(s) > (3/12) How to Learn Python for JavaScript Developers [Full Handbook]"
    - property: og:description
      content: "3. Syntax and Language Features"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-python-for-javascript-developers-handbook/3-syntax-and-language-features.html
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
  url="https://freecodecamp.org/news/learn-python-for-javascript-developers-handbook#heading-3-syntax-and-language-features"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg"/>

While both JavaScript and Python are dynamically typed, high-level languages, they have distinct syntax rules and language features that can affect code readability, structure, and maintenance.

This section highlights some of the core syntactical differences and introduces language features that will be especially relevant for a JavaScript developer learning Python.

---

## Comparison of Syntax Simplicity and Readability

One of Python’s main selling points is its clear, readable syntax. Often described as “executable pseudocode,” Python emphasizes simplicity, aiming for code that’s easy to write and, perhaps more importantly, easy to read.

Unlike JavaScript, which uses braces (`{}`) to define code blocks, Python uses indentation to enforce structure, which naturally encourages clean, organized code.

### Example: Hello World and Simple Loops

In both languages, the "Hello, World!" example highlights the difference in syntax:

::: tabs

@tab:active <FontIcon icon="fa-brands fa-python"/>

```py
print("Hello, World!")
```

@tab:active <FontIcon icon="fa-brands fa-js"/>

```js
console.log("Hello, World!");
```

:::

Python’s built-in `print` function makes printing straightforward without additional syntax. In JavaScript, `console.log` performs the same task but requires a more explicit object-method format.

Now, consider a simple loop that prints numbers from 0 to 4:

::: tabs

@tab <FontIcon icon="fa-brands fa-pyhon"/>

```py
for i in range(5):
    print(i)
```

@tab <FontIcon icon="fa-brands fa-js"/>

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

:::

The difference here is striking. Python’s `for` loop with `range()` is compact and highly readable, while JavaScript’s loop uses a more complex syntax with initialization, condition, and increment clauses. This is a minor but illustrative example of Python’s design philosophy: code should be intuitive and easy to follow.

---

## Data Types and Variable Declaration

Both JavaScript and Python are dynamically typed, meaning that you don’t need to specify variable types explicitly. But there are differences in variable declaration and type handling that are worth noting.

### Variable Declaration

JavaScript requires `let`, `const`, or `var` to declare variables. The use of `let` and `const` in modern JavaScript helps manage scope and constancy of variables, with `const` enforcing immutability.

In Python, there is no need to specify `let`, `const`, or `var` – you simply assign a value to a variable, and Python infers the type based on the value.

::: tabs

@tab:active <FontIcon icon="fa-brands fa-js"/>

```js
let age = 25;  // Using 'let' for a block-scoped variable
const name = "Alice";  // Using 'const' for an immutable variable
```

@tab <FontIcon icon="fa-brands fa-python"/>

```py
age = 25  # Python infers type automatically
name = "Alice"  # No need to declare as const or let
```

:::

### Type Checking and Conversion

Python’s type-checking system is more consistent, while JavaScript sometimes has quirky behavior due to type coercion, where values of different types are implicitly converted for comparison. For example:

::: tabs

@tab <FontIcon icon="fa-brands fa-js"/>

```js
console.log(0 == "");  // true due to type coercion
console.log(0 === ""); // false due to strict equality
```

@tab <FontIcon icon="fa-brands fa-python"/>

```py
print(0 == "")  # Raises a TypeError: 'int' and 'str' cannot be compared
```

:::

Python does not allow implicit type coercion, reducing potential bugs related to unexpected type behavior. If type conversion is needed, Python requires explicit casting.

---

## Working with Primitive Data Types

JavaScript and Python share some primitive types but also have unique types and handling:

- **Numbers**: Both JavaScript and Python have number types, but Python distinguishes between `int` and `float` for integers and decimal numbers. JavaScript has only a single `Number` type for all numeric values (including `NaN` for “not-a-number”).
- **Strings**: Both languages treat strings as sequences of characters, allowing methods like concatenation, splitting, and indexing. In Python, strings are immutable, meaning once created, they cannot be modified directly.
- **Booleans**: Both languages have `true` and `false` values. But JavaScript’s type coercion can lead to unexpected results in conditions, which Python avoids with explicit boolean handling.
- **Null and Undefined**: JavaScript distinguishes between `null` (an intentional absence of value) and `undefined` (an uninitialized variable). Python uses `None` as a single, consistent representation of “no value.”

---

## Data Collections: Lists, Tuples, Sets, and Dictionaries

Both JavaScript and Python offer various data structures to handle collections, but Python has built-in types that allow for more specific data handling.

### Lists and Arrays

Python’s `list` type is analogous to JavaScript’s array, but it’s more versatile, as Python lists can store elements of different types and support built-in functions for manipulation. In contrast, JavaScript arrays are specialized objects with numerical indices.

::: tabs

@tab <FontIcon icon="fa-brands fa-python"/>

```py
my_list = [1, "apple", 3.14]
```

@tab <FontIcon icon="fa-brands fa-js"/>

```js
let myArray = [1, "apple", 3.14];
```

:::

### Tuples

Python offers `tuple` as an immutable version of a list, useful when data should not be modified. JavaScript has no direct equivalent, though `const` can create a similar effect by enforcing immutability.

::: tabs

@tab <FontIcon icon="fa-brands fa-python"/>

```py
my_tuple = (1, "apple", 3.14)
```

:::

### Sets

Both languages offer a set data type for collections of unique elements. Python has `set`, while JavaScript uses `Set`.

::: tabs

@tab:active <FontIcon icon="fa-brands fa-python"/>

```py
my_set = {1, 2, 3}
```

@tab <FontIcon icon="fa-brands fa-js"/>

```js
let mySet = new Set([1, 2, 3]);
```

:::

### Dictionaries and Objects

Python’s `dict` and JavaScript’s objects are both key-value structures, but they differ in design and functionality.

In Python, dictionaries are optimized for hashable keys, whereas JavaScript objects are more flexible but can lead to type-related issues when keys are non-string values.

::: tabs

@tab <FontIcon icon="fa-brands fa-python"/>

```py
my_dict = {"name": "Alice", "age": 25}
```

@tab <FontIcon icon="fa-brands fa-js"/>

```js
let myObject = { name: "Alice", age: 25 };
```

:::

---

## Control Structures: Conditionals and Loops

Both Python and JavaScript have similar control structures, such as `if`, `for`, and `while` loops. But Python's syntax is simplified due to its reliance on indentation.

### Conditionals

::: tabs

@tab:active <FontIcon icon="fa-brands fa-python"/>

```py
if age > 18:
    print("Adult")
else:
    print("Minor")
```

@tab <FontIcon icon="fa-brands fa-js"/>

```js
if (age > 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

:::

Python’s syntax avoids the braces used in JavaScript, relying on indentation to signify code blocks. This makes code look cleaner but enforces strict formatting, which can be a learning curve for JavaScript developers.

### Loops

- **For Loops**: Python’s `for` loop is often simpler, especially with the `range()` function. JavaScript’s traditional `for` loop has more structure but allows for flexibility.

::: tabs

@tab <FontIcon icon="fa-brands fa-python"/>

```py
for i in range(5):
    print(i)
```

@tab <FontIcon icon="fa-brands fa-js"/>

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

:::

- **While Loops**: Both languages support `while` loops, and they’re functionally similar. But Python uses plain English for keywords and syntax, which some find more readable.

::: tabs

@tab:active <FontIcon icon="fa-brands fa-python"/>

```py
count = 0
while count < 5:
    print(count)
    count += 1
```

@tab <FontIcon icon="fa-brands fa-js"/>

```js
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}
```

:::

### Key Takeaways:

- Python’s syntax is minimalist and requires indentation, which encourages clean, readable code.
- Variable declaration in Python is simpler due to inferred types, while JavaScript uses `let`, `const`, and `var` for scope management.
- Python has built-in data structures like lists, tuples, sets, and dictionaries, each with specific use cases, while JavaScript relies on arrays and objects.
- Control structures in Python focus on readability with fewer symbols, whereas JavaScript uses braces and parentheses to define blocks.
