---
lang: en-US
title: "How Loops Work in PHP: A Complete Guide for Beginners"
description: "Article(s) > How Loops Work in PHP: A Complete Guide for Beginners"
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
      content: "Article(s) > How Loops Work in PHP: A Complete Guide for Beginners"
    - property: og:description
      content: "How Loops Work in PHP: A Complete Guide for Beginners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-loops-work-in-php-beginners-guide.html
prev: /programming/php/articles/README.md
date: 2025-06-19
isOriginal: false
author:
  - name: Montasser Mossallem
    url : https://freecodecamp.org/news/author/montasser1988/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750178963918/bf8c63b9-9624-4cb0-bd31-10ffbdbe67f6.jpeg
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
  name="How Loops Work in PHP: A Complete Guide for Beginners"
  desc="PHP loops help you repeat a block of code based on a condition. You can use them to work through arrays or repeat actions. You can also use them to skip steps based on logic. In this article, you will learn how PHP loops work and when to use each"
  url="https://freecodecamp.org/news/how-loops-work-in-php-beginners-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750178963918/bf8c63b9-9624-4cb0-bd31-10ffbdbe67f6.jpeg"/>

PHP loops help you repeat a block of code based on a condition. You can use them to work through arrays or repeat actions. You can also use them to skip steps based on logic.

In this article, you will learn how PHP loops work and when to use each type.

---

## Understand How Loops Work in PHP

A loop lets PHP run the same set of instructions more than once. It checks a certain condition before each run. Then the code runs again if the condition is true and it stops if the condition is false.

![Diagram showing how loops work in PHP](https://cdn.hashnode.com/res/hashnode/image/upload/v1749910672507/5a4f946c-bbe8-407d-bfd0-c524d7fef9e0.png)

Loops help reduce repeated code. You can process items in a list or check values. Loops let you write a block of code once and run it multiple times.

PHP provides four main types of loops:

- while
- do...while
- for
- foreach

Let’s take a look at each one in detail

---

## The `while` Loop in PHP

The while loop checks if the condition is true before it runs the code block. If the condition is true, it runs the block. Then it checks again. The loop repeats until the condition becomes false.

Here is the syntax:

```php
while (condition) {
  // code block
}
```

Here is an example:

```php
$count = 1;
while ($count <= 3) {
  echo "Count: $count\n";
  $count++;
}
```

This loop starts with `$count = 1`. It prints the value and adds 1 each time. It stops when `$count` becomes 4. It gives you this output:

```plaintext title="output"
Count: 1
Count: 2
Count: 3
```

Here’s another example:

```php
$index = 0;
$names = ['Tom', 'Anna', 'Joe'];
while ($index < count($names)) {
  echo $names[$index] . "\n";
  $index++;
}
```

This loop prints each name from the array. It uses the index to move through the list.

```plaintext title="output"
Tom
Anna
Joe
```

So, **when should you use a `while` loop?**

Use a `while` loop when you want to check the condition first before running the code. This type fits best when the loop should not run at all if the condition is false from the start.

Here is an example:

You ask a user to enter a number. You only want to run your loop if the number is positive.

```php
$number = getUserInput();

while ($number > 0) {
  echo "You entered: $number\n";
  $number = getUserInput();
}
```

If the first number is zero or negative, the loop will skip. That makes sense here - you only want the loop to run for valid numbers.

You’ll learn how the PHP `do while` loop works in the next part.

---

## The `do...while` Loop in PHP

The `do...while` loop runs the code block once, then checks the condition. It always runs at least one time.

```php
do {
  // code block
} while (condition);
```

::: tip Example

```php
$start = 5;
do {
  echo "Start: $start\n";
  $start++;
} while ($start < 8);
```

This loop prints numbers from 5 to 7. It checks the condition after the block runs.

```plaintext title="output"
Start: 5
Start: 6
Start: 7
```

:::

Here’s another example:

::: tip Example

```php
$retry = 0;
do {
  echo "Attempt $retry\n";
  $retry++;
} while ($retry < 1);
```

The code runs once, even if the condition is false at the start. Output:

```plaintext title="output"
Attempt 0
```

Use a `do...while` loop when you want the code to run at least once. This makes sense when the first step must happen before checking the condition.

:::

::: tip Example

Here is an example:

You want to show a menu to the user at least once. Then you keep showing it until they choose to exit.

```php
do {
  $option = showMenuAndGetChoice();
} while ($option != "exit");
```

The menu appears once no matter what. If the user types "exit" right away, the loop stops after one run.

Let’s move on to the following section to take a look at the most common loop in PHP which is the for loop.

:::

---

## The `for` Loop in PHP

The `for` loop works when you know how many times you want the loop to run. It gives you a clean way to set a counter, check a condition, and update the counter - all in one line. This makes the loop easy to read and control.

The loop has three parts inside the parentheses:

1. **Start** - This sets up the loop. You usually define a counter here, like `$i = 0`.
2. **Condition** - The loop runs while this part is true. As soon as it becomes false, the loop stops.
3. **Step** - This updates the counter after each loop run. You can increase or decrease the value here.

Here is the structure:

```php
for (start; condition; step) {
  // code block
}
```

::: tip Example

Here is an example:

```php
for ($i = 1; $i <= 3; $i++) {
  echo "Number: $i\n";
}
```

This is what happens:

- `$i = 1` sets the starting value.
- The condition `$i <= 3` checks if the loop should run.
- If the condition is true, the code inside runs.
- Then `$i++` increases the counter by 1.
- The loop repeats until `$i` becomes greater than 3.

```plaintext title="output"
Number: 1
Number: 2
Number: 3
```

:::

Here’s another example:

::: tip Example

```php
for ($i = 2; $i <= 6; $i += 2) {
  echo "$i is even\n";
}
```

The step here is `$i += 2`, not just `$i++`. This adds 2 to `$i` after each run instead of 1. So the values go from 2 to 4 to 6. That is how you control the pace of the loop.

Here is the output:

```plaintext title="output"
2 is even
4 is even
6 is even
```

:::

You use a `for` loop when:

- You know exactly how many times you need to run the code
- You’re working with a counter that increases or decreases
- You’re looping through a range, like numbers 1 to 10
- You want to keep all the loop setup in one place

In the following section, you will learn about another loop called `foreach`. Let’s move on.

---

## The `foreach` Loop in PHP

[<VPIcon icon="fas fa-globe"/>PHP’s foreach](https://flatcoding.com/tutorials/php/foreach-loop-in-php/) loop is built to work with arrays. It lets you move through each item in the array, one at a time. You don’t need a counter, and you don’t need to check the size - PHP handles that part for you.

There are two ways to use `foreach`, and both work only with arrays or objects that act like arrays:

- Loop through values only
- Loop through keys and values

Let’s look at each one.

### Loop through values only

this version gives you one value from the array on each run:

```php
$colors = ['red', 'green', 'blue'];

foreach ($colors as $color) {
  echo "$color\n";
}
```

Here, the array has three values. The loop gives you one at a time. You don’t get the position or index - just the value.

```plaintext title="output"
red  
green  
blue
```

### Loop through keys and values

This version gives you both the key and the value for each array item.

Here is an example:

::: tip Example

```php
$person = ['name' => 'Alice', 'age' => 30, 'city' => 'Cape Town'];

foreach ($person as $key => $value) {
  echo "$key: $value\n";
}
```

Here, `$key` holds each index or name, and `$value` holds what is stored at that key.

Here is the output:

```plaintext title="output"
name: Alice  
age: 30  
city: Cape Town
```

:::

This format helps when you want to label data, work with both the name and value, or build something like a form or report.

Remember that `foreach` works only with arrays or objects that act like arrays (such as objects that implement `Traversable`). You cannot use it with a plain string or number.

If you try this:

```php
foreach (123 as $item) {
  echo $item;
}
```

You get an error. PHP expects something that holds multiple items, like an array or an iterable object.

You can exit the loop with `break` a statement based on a condition or expression. Let’s move on to the next part to see how we can do that.

---

## How to Use the `break` Statement in PHP

The [<VPIcon icon="fas fa-globe"/>break statement](https://flatcoding.com/tutorials/php/php-break-exit-php-loop/) in PHP ends the loop immediately, even if its condition remains true. Here is its syntax:

```php
break;
```

::: tip Example

Here is an example:

```php
for ($i = 1; $i <= 5; $i++) {
  if ($i === 3) {
    break;
  }
  echo "$i\n";
}
```

This loop stops when `$i` becomes 3. Output:

```plaintext title="output"
1
2
```

This PHP code uses a `for` loop to count from 1 to 5. It includes a condition that stops the loop early with `break`. If `$i` equals 3, the loop ends.

Otherwise, it prints the value of `$i`. The output is 1 and 2, and the loop exits before it gets to 3. Here are some common reasons to use the `break` statement:

- When you find what you need
- If you want to exit on a certain condition
- Inside a menu or user input loop
- In `switch` statements

:::

PHP will run all the code after the first match if you don’t use `break`. That can cause bugs.

In the next section, you will see how to skip parts of a loop when certain conditions are true.

---

## How to Use the `continue` Statement

[<VPIcon icon="fas fa-globe"/>PHP’s continue statement](https://flatcoding.com/tutorials/php/php-continue-statement/) skips the rest of the loop for the current step. Here’s its syntax:

```php
continue;
```

Here is an example:

```php
for ($i = 1; $i <= 4; $i++) {
  if ($i === 2) {
    continue;
  }
  echo "$i\n";
}
```

This loop doesn’t print 2 and moves to the next value.

```plaintext title="output"
1
3
4
```

So, **why would you skip part of a loop with** `continue`**?**

You use the `continue` statement in PHP when you want to skip the rest of the current loop block and move to the next item. This helps when you need to avoid some steps in a loop based on a condition.

You might use `continue` in a `foreach`, `for`, or `while` loop. If a value does not match what you need, you skip it and go on. You don’t stop the loop - you only skip the current run.

**So why would you want to avoid loops in some cases?**

Loops give you full control, but they can lead to clutter. You repeat the same logic over and over. That makes the code harder to read. You also risk bugs if you forget to update a counter or break at the right time.

If all you want is to apply one action to every item in an array, a loop might feel like too much. You don’t need full control - just a clean way to map values. That is where a built-in function like `array_map` makes more sense.

In the following part, you will see how `array_map` replaces a loop when you want a way to change every item in an array.

---

## How to Replace Loops with `array_map()` in PHP

[<VPIcon icon="fas fa-globe"/>PHP’s array_map](https://flatcoding.com/tutorials/php/array_map/) function helps you avoid repetitive loops. It applies a [**callback function**](/freecodecamp.org/how-to-use-arrow-functions-in-php.md) to every item in one or more arrays and returns a new array with the results.

```php
$numbers = [1, 2, 3, 4];
$doubled = array_map(fn($n) => $n * 2, $numbers);
print_r($doubled);
```

```plaintext title="output"
[2, 4, 6, 8]
```

This does the same thing as a `foreach` loop where you multiply each number by 2 and store the result. But with `array_map`, the logic stays in one place.

You pass the function and the array as arguments. That’s what people mean by a “functional style” - you use built-in tools that focus on input and output, not steps or counters.

You get the same result, but the code is shorter to read. You also avoid side effects since `array_map` returns a new array without changing the original one.

In the following section, you will understand how nested loops work.

---

## How Nested Loops Work in PHP

A nested loop means one loop sits inside another. The outer loop controls the bigger cycle while the inner loop runs completely every time the outer loop runs once.

So if the outer loop runs two times and the inner loop runs three times each cycle, the inner loop runs six times in total.

::: tip Example

For example:

```php
for ($i = 1; $i <= 2; $i++) {
  for ($j = 1; $j <= 3; $j++) {
    echo "i=$i, j=$j\n";
  }
}
```

Here is how it works:

- The outer loop uses `$i`. It starts at 1 and runs while `$i <= 2`.
- That means the outer loop runs two times: once for `$i = 1` and once for `$i = 2`.
- Inside that, the inner loop uses `$j`. It starts at 1 and runs while `$j <= 3`.
- So for each time the outer loop runs, the inner loop runs three times: for `$j = 1`, `$j = 2`, and `$j = 3`.

```plaintext title="output"
i=1, j=1
i=1, j=2
i=1, j=3
i=2, j=1
i=2, j=2
i=2, j=3
```

:::

So, **how do you use nested loops with arrays?**

You can also use nested loops to read a two-dimensional array. Here is an example using a matrix:

```php
$matrix = [
  [1, 2],
  [3, 4]
];

foreach ($matrix as $row) {
  foreach ($row as $cell) {
    echo "$cell ";
  }
  echo "\n";
}
```

In this case:

- The outer `foreach` gets each row from the matrix.
- Each `$row` is an array: first `[1, 2]`, then `[3, 4]`.
- The inner `foreach` goes through each value inside the row.

So the output is:

```plaintext title="output"
1 2
3 4
```

You can use nested loops when you need to handle a grid or matrix. It also works when you want to group values.

**When should you use nested loops, and when should you not?**

You might have:

- Rows and columns in a matrix
- A list of orders, each with items
- Categories, each with subcategories

Any time you have to work through a group that sits inside another group, nested loops help. They let you go step by step through both levels.

For example, if you have products grouped by type, you can use an outer loop for the types and an inner loop for each product inside.

But nested loops also have limits. If both loops run many times, your code slows down fast. A loop inside a loop means the total steps grow quickly.

If the outer loop runs 100 times and the inner loop runs 100 times, that makes 10,000 steps. That can cause long load times or even freeze the server with large data sets.

Nested loops solve real problems, but just make sure you use them only when they fit. Not every task needs one. If you can solve the same problem with one loop and clear data, that is often better.

---

## Wrapping Up

Loops help you repeat tasks in PHP. You can use while, for, or even foreach based on what you need. Use break to stop early. Use continue to skip steps. Use nested loops if you work with grids or grouped data.

Now hopefully you understand how each [<VPIcon icon="fas fa-globe"/>PHP loop](https://flatcoding.com/tutorials/php/php-loop-with-loops-examples/) works based on these examples and clear use cases.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Loops Work in PHP: A Complete Guide for Beginners",
  "desc": "PHP loops help you repeat a block of code based on a condition. You can use them to work through arrays or repeat actions. You can also use them to skip steps based on logic. In this article, you will learn how PHP loops work and when to use each",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-loops-work-in-php-beginners-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
