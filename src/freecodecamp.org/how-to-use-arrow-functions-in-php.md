---
lang: en-US
title: "How to Use Arrow Functions in PHP 7.4+"
description: "Article(s) > How to Use Arrow Functions in PHP 7.4+"
icon: fa-brands fa-php
category:
  - PHP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - php
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Arrow Functions in PHP 7.4+"
    - property: og:description
      content: "How to Use Arrow Functions in PHP 7.4+"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-arrow-functions-in-php.html
prev: /programming/php/articles/README.md
date: 2025-05-09
isOriginal: false
author:
  - name: Montasser Mossallem
    url : https://freecodecamp.org/news/author/montasser1988/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746354775446/092005ae-12bb-4be9-a72c-aacc5f044962.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PHP > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Arrow Functions in PHP 7.4+"
  desc="Arrow functions were introduced in PHP 7.4 to allow devs to write short, anonymous functions. They offer a compact alternative to traditional closures, especially when the function body is small and focused. In this article, you will learn how to use..."
  url="https://freecodecamp.org/news/how-to-use-arrow-functions-in-php"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746354775446/092005ae-12bb-4be9-a72c-aacc5f044962.jpeg"/>

Arrow functions were introduced in PHP 7.4 to allow devs to write short, anonymous functions. They offer a compact alternative to traditional closures, especially when the function body is small and focused.

In this article, you will learn how to use the arrow function in PHP with examples. You’ll also learn about the difference between arrow functions and anonymous functions.

::: note Prerequisites

You should know how to write basic PHP code, such as functions, and be able to work with arrays. Make sure you’re using PHP 7.4 or newer because arrow functions only work in that version and above.

:::

---

## Understanding Arrow Functions in PHP

The [<FontIcon icon="fas fa-globe"/>PHP arrow function](https://flatcoding.com/tutorials/php/arrow-functions/) is a shorthand syntax. It defines an anonymous function and is designed for simple operations and expressions.

Arrow functions in PHP are best used when:

- You need a quick callback or inline function.
- The function returns a single expression.
- You want to avoid repetitive `use` statements.

The basic syntax of an arrow function is:

```php
fn(parameter_list) => expression;
```

- `fn` is the keyword that defines the arrow function.
- `parameter_list` is the list of parameters (similar to a normal function).
- `=>` separates the parameter list from the expression.
- `expression` is the value the function returns. You cannot use a block of statements here - only a single expression is allowed.

Arrow functions automatically capture variables from the scope. They don’t need the `use` keyword as shown below:

```php
$var_name = 10; 
$func = function($n) use ( $var_name ) {
   return $n * $var_name;
}
```

You can use the variables in the scope directly:

```php
$var_name = 10; 
$func = fn($n) => $n * $var_name;
```

Here’s a lexical scoping example:

```php
$multiplier = 3;
$multiply = fn($x) => $x * $multiplier;
echo $multiply(4); // Outputs: 12
```

The variable `$multiplier` is automatically captured from the outer scope. You don’t need to use `use($multiplier)` as you would in a traditional anonymous function.

Key rules of arrow function syntax:

- Always use `fn`, not `function`.
- No curly braces or `return` keyword - just a single expression.
- Automatic variable capture from the outer scope.
- It cannot contain multiple statements or control structures (like `if`, `foreach`, and so on).

Let’s move on to the following section to take a look at the difference between arrow functions and [<FontIcon icon="fas fa-globe"/>anonymous functions in PHP](https://flatcoding.com/tutorials/php-programming/php-anonymous-functions/).

---

## The Difference Between Arrow Functions and Anonymous Functions in PHP

PHP supports two types of anonymous functions (that is, functions without a name):

- **Traditional anonymous functions** are defined by the `function` keyword
- **Arrow functions** are introduced in PHP 7.4 within the `fn` keyword

Both types can be assigned to variables and used for callbacks or as function arguments. They serve similar purposes, but differ in syntax and how they handle external variables.

Let’s look at their key differences.

### 1. Syntax

#### Arrow Function:

Arrow functions use a single-line expression without braces or a `return` statement.

```php
$square = fn($n) => $n * $n;
```

The arrow function assigns it to the variable `$square`. The function takes one parameter, `$n`, and returns `$n * $n` (the square of `$n`).

#### Anonymous Function:

```php
$square = function($n) {
    return $n * $n;
};
```

Anonymous functions use a full function block and require an explicit `return`. They’re used for multi-line logic or complex behavior.

### 2. Variable Scope (Lexical Scope)

Arrow functions automatically capture variables from the outer scope:

```php
$factor = 2;
$multiply = fn($x) => $x * $factor;
```

Anonymous functions require you to manually import external variables using `use`:

```php
$factor = 2;
$multiply = function($x) use ($factor) {
    return $x * $factor;
};
```

You cannot use the variable in the scope within the anonymous function unless you use the `use` keyword.

### 3. Readability and Brevity

Arrow functions are shorter. They help you write small and single-expression callbacks:

```php
$numbers = [1, 2, 3];
$squares = array_map(fn($n) => $n * $n, $numbers);
```

But anonymous functions are better when:

- The function body has multiple lines.
- You need complex logic or control structures.

**Here is a table that shows you the key differences:**

| Feature | Arrow Function | Anonymous Function |
| --- | --- | --- |
| Introduced in | PHP 7.4 | PHP 5.3 |
| Syntax | Short, single-expression | Verbose, full-function body |
| Scope handling | Automatic (lexical) | Manual (`use`) keyword |
| Multiline body | Not allowed | Allowed |
| Return keyword | Not used | Required |

Let’s move on to the section below to understand how to return an arrow function from another function.

---

## How to Return Arrow Functions from Other Functions

Functions are first-class citizens. This means you can return a function from another function. That includes arrow functions.

You can define and return an arrow function from within a regular function like this:

```php
function getMultiplier($factor) {
    return fn($x) => $x * $factor;
}

$double = getMultiplier(2);
echo $double(5); // Outputs: 10
```

In this example:

- `getMultiplier()` returns an arrow function.
- The arrow function captures `$factor` from the outer scope automatically (lexical scoping).
- The returned function can be stored in a variable and used like any other callable.

It lets you generate small functions based on parameters and reduces code repetition.

Use this syntax when you need to build dynamic behavior - like custom filters or function factories.

Let’s move on to the section below to see how you can use arrow functions in your code.

---

## How to Use Arrow Functions in Your Code

### Use the Arrow Function within `array_map()`:

`array_map()` lets you set a callback to each element of an array. It allows you to define the callback directly within the function call.

Example:

```php
$numbers = [1, 2, 3, 4, 5];

$squares = array_map(fn($n) => $n * $n, $numbers);

print_r($squares);
// Outputs: [1, 4, 9, 16, 25]
```

The arrow function `fn($n) => $n * $n` is executed for each element of the `$numbers` array. The result is a new array of squared values.

### Use the Arrow Function with `array_filter()`

`array_filter()` filters elements of an array within a callback. Arrow functions define a short filter condition inline.

Example:

```php
$numbers = [1, 2, 3, 4, 5, 6];

$evenNumbers = array_filter($numbers, fn($n) => $n % 2 === 0);

print_r($evenNumbers);
// Outputs: [2, 4, 6]
```

Here, the arrow function checks if each number is even. The result is an array that contains only the even numbers.

### Use the arrow function with `array_reduce()`

`array_reduce()` reduces an array to a single value based on a callback function. Arrow functions help make the code compact.

Example:

```php
$numbers = [1, 2, 3, 4, 5];

$sum = array_reduce($numbers, fn($carry, $n) => $carry + $n, 0);

echo $sum; // Outputs: 15
```

The arrow function adds each number in the array. `$carry` holds the running total and `$n` is the current number.

### Nest arrow functions in PHP

Here the inner function performs one operation and the outer function processes the results of the inner function.

```php
$numbers = [1, 2, 3, 4, 5];

$doubleAndSquare = array_map(
    fn($n) => fn($x) => ($x * 2) ** 2,  
    $numbers
);

$results = array_map(
    fn($fn) => $fn(3),  
    $doubleAndSquare
);

print_r($results);
// Outputs: [36, 36, 36, 36, 36]
```

In the above code, the first `array_map()` creates a list of arrow functions that double and then square the number. Each element in the `$numbers` array gets mapped to a nested arrow function.

The second `array_map()` applies the inner arrow function (which doubles and squares the value) to the number `3`. It results in an array of the same result.

---

## Wrapping Up

In this article, you’ve learned the basic features and syntax of arrow functions. It shows you their advantages over anonymous functions.

Here are some key takeaways:

1. Arrow functions were introduced in PHP 7.4. They provide you with a new syntax to define anonymous functions with simpler code.
2. Arrow functions are a shorter way to write anonymous functions. They use one line of code and don’t need curly braces or the `return` keyword.
3. Ar

::: info Resources:

<SiteInfo
  name="PHP: Arrow Functions - Manual"
  desc="PHP is a popular general-purpose scripting language that powers everything from your blog to the most popular websites in the world."
  url="https://php.net/manual/en/functions.arrow.php/"
  logo="https://php.net/favicon.ico?v=2"
  preview="https://php.net/images/meta-image.png"/>

<SiteInfo
  name="FlatCoding"
  desc="FlatCoding is an online platform that shows you free tutorials in programming, databases, AI, algorithms, and development topics to help you improve your coding skills."
  url="https://flatcoding.com/"
  logo="https://flatcoding.com/wp-content/uploads/2025/03/logo512.png"
  preview="https://flatcoding.com/wp-content/uploads/2025/03/flatcoding-media-img.png"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Arrow Functions in PHP 7.4+",
  "desc": "Arrow functions were introduced in PHP 7.4 to allow devs to write short, anonymous functions. They offer a compact alternative to traditional closures, especially when the function body is small and focused. In this article, you will learn how to use...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-arrow-functions-in-php.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
