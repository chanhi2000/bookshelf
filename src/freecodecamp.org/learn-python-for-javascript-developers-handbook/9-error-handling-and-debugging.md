---
lang: en-US
title: "9. Error Handling and Debugging"
description: "Article(s) > (9/12) How to Learn Python for JavaScript Developers [Full Handbook]"
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
      content: "Article(s) > (9/12) How to Learn Python for JavaScript Developers [Full Handbook]"
    - property: og:description
      content: "9. Error Handling and Debugging"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-python-for-javascript-developers-handbook/9-error-handling-and-debugging.html
date: 2024-11-22
isOriginal: false
author:
  - name: German Cocca
    url : https://freecodecamp.org/news/author/GerCocca/
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
  url="https://freecodecamp.org/news/learn-python-for-javascript-developers-handbook#heading-9-error-handling-and-debugging"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg"/>

Error handling and debugging are critical for writing robust and maintainable code. Both Python and JavaScript provide mechanisms for catching and managing errors, but they handle these tasks differently. Understanding these mechanisms is essential for developers transitioning between the two languages.

---

## Exception Handling in Python vs. Error Handling in JavaScript

Both Python and JavaScript use `try`-`except` (or `try`-`catch` in JavaScript) blocks to handle errors. These constructs allow developers to catch exceptions, manage them gracefully, and prevent program crashes.

### Python Exception Handling

Python uses `try`, `except`, and `finally` to handle exceptions. The `else` clause can also be used to execute code only if no exceptions occur.

::: tip Example: Python Exception Handling

```py
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
else:
    print("No errors occurred!")
finally:
    print("Execution complete.")
# Output:
# Error: division by zero
# Execution complete.
```

:::

::: info Key Features of Python Exception Handling

1. **Specific Exceptions**: Python allows catching specific exceptions like `ZeroDivisionError`, making error handling more precise.
2. **Optional Else Block**: The `else` block runs if no exceptions are raised, which can simplify code logic.

:::

### JavaScript Error Handling

JavaScript uses `try`, `catch`, and `finally` for error handling. Errors can be thrown manually using the `throw` keyword.

::: tip Example: JavaScript Error Handling

```js
try {
    const result = 10 / 0;
    if (!isFinite(result)) {
        throw new Error("Division by zero is not allowed.");
    }
} catch (error) {
    console.log(`Error: ${error.message}`);
} finally {
    console.log("Execution complete.");
}
// Output:
// Error: Division by zero is not allowed.
// Execution complete.
```

:::

::: info Key Features of JavaScript Error Handling

1. **Generic Catch Block**: JavaScript's `catch` block catches all errors by default. To handle specific error types, manual checks are needed.
2. **Error Object**: JavaScript provides an `Error` object with properties like `message`, `name`, and `stack` for debugging.

:::

---

## Common Errors and How to Debug Them

Both Python and JavaScript have common runtime errors, but their debugging tools and techniques differ.

### Python Common Errors

::: tabs

@tab:active 1. SyntaxError

Occurs when code violates Python's syntax rules.

```py
print("Hello World"  # Missing closing parenthesis
```

@tab 2. TypeError

Raised when an operation is applied to an object of inappropriate type.

```py
print("Hello" + 5)  # Cannot concatenate str and int
```

@tab 3. ValueError

Raised when a function receives an argument of the correct type but invalid value.

```py
int("abc")  # Cannot convert string to int
```

:::

### Debugging in Python

@tab Stack Trace

Python provides a detailed stack trace when an exception occurs, showing the file, line number, and call stack.

@tab Logging

Python’s `logging` module helps record errors and program state.

```py
import logging
logging.basicConfig(level=logging.ERROR)
logging.error("An error occurred.")
```

@tab Debuggers

Tools like `pdb` (Python Debugger) allow stepping through code to inspect variables.
  
```py
import pdb; pdb.set_trace()
```

:::

### JavaScript Common Errors

::: tabs

@tab:active 1. SyntaxError

Thrown when code violates JavaScript's syntax rules.

```js
console.log("Hello World" // Missing closing parenthesis
```

@tab 2. TypeError

Occurs when an operation is performed on an undefined or incompatible type.

```js
console.log("Hello" + 5); // Allowed, but accessing a method on null is a TypeError
```

@tab 3. ReferenceError

Thrown when accessing a variable that hasn’t been declared.

```js
console.log(x); // x is not defined
```

:::

### Debugging in JavaScript

::: tabs

@tab Stack Trace

JavaScript errors include a stack trace, showing the error type and line number.

@tab Console Logging

The `console.log` and `console.error` methods are often used for debugging.

```js
console.log("Variable value:", myVar);
console.error("An error occurred.");
```

@tab Browser DevTools

Modern browsers include developer tools with JavaScript debuggers, allowing you to set breakpoints, step through code, and inspect variables.
@tab Debugging with Node.js

Use the `--inspect` flag to debug Node.js applications with Chrome DevTools.

```sh
node --inspect app.js
```

:::

---

## Tools for Debugging

Both Python and JavaScript have robust tools for debugging, ranging from built-in modules to integrated development environments (IDEs).

### Debugging Tools

::: tabs

@tab <FontIcon icon="fa-brands fa-python"/>

1. **Built-In Debugger (**`pdb`): A command-line tool for inspecting and controlling execution.
2. **IDE Debugging**: IDEs like PyCharm and VS Code provide graphical debugging with breakpoints and variable inspection.
3. **Logging**: The `logging` module can be configured to capture detailed runtime information.

@tab <FontIcon icon="fa-brands fa-js"/>

1. **Browser Developer Tools**: Chrome DevTools, Firefox Developer Tools, and Edge DevTools are indispensable for frontend debugging.
2. **Node.js Debugger**: Debug Node.js applications using `node inspect` or `--inspect` with a compatible debugger like Chrome DevTools.
3. **Third-Party Tools**: Tools like ESLint help catch errors before runtime by enforcing coding standards and highlighting potential issues.

:::

### Key Takeaways

- **Error Handling Syntax**: Both Python and JavaScript use `try`-`catch` constructs, but Python’s `except` supports catching specific exception types.
- **Debugging Approaches**: Python relies heavily on logging and the `pdb` debugger, while JavaScript benefits from browser DevTools and real-time inspection.
- **Common Errors**: Syntax and type-related errors are common in both languages, but Python’s explicit type system provides clearer error messages compared to JavaScript’s looser type handling.
- **Tools**: Each language has a rich ecosystem of debugging tools tailored to its common use cases.
