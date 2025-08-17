---
lang: en-US
title: "How to Write Cleaner JavaScript Code with The Ternary Operator"
description: "Article(s) > How to Write Cleaner JavaScript Code with The Ternary Operator"
icon: fa-brands fa-js 
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Write Cleaner JavaScript Code with The Ternary Operator"
    - property: og:description
      content: "How to Write Cleaner JavaScript Code with The Ternary Operator"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/write-cleaner-javascript-code-with-the-ternary-operator.html
prev: /programming/js/articles/README.md
date: 2024-10-26
isOriginal: false
author: Oluwadamisi Samuel
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729865186546/5c28c610-6540-4363-814d-c3c0c532be69.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Write Cleaner JavaScript Code with The Ternary Operator"
  desc="When you're coding in JavaScript, handling decisions through conditional statements is one of the core tasks you'll frequently encounter. One of the most commonly used methods for this is the ternary operator. But what exactly is it, and when should ..."
  url="https://freecodecamp.org/news/write-cleaner-javascript-code-with-the-ternary-operator"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729865186546/5c28c610-6540-4363-814d-c3c0c532be69.png"/>

When you're coding in JavaScript, handling decisions through conditional statements is one of the core tasks you'll frequently encounter. One of the most commonly used methods for this is the ternary operator. But what exactly is it, and when should you use it over the traditional if-else statement?

In this article, we’ll dive into the ternary operator, how it works, and when it’s the right choice compared to other conditional structures.

---

## What is the Ternary Operator?

The ternary operator is a shorthand way to write conditional statements in JavaScript. It allows you to execute one of two expressions based on a condition, all in a single line. While this might sound complicated, its syntax is simple and intuitive once you understand how it works.

Here’s the basic structure:

```js
condition ? expressionIfTrue : expressionIfFalse;
```

In plain terms, if the `condition` evaluates to true, `expressionIfTrue` will run. If it evaluates to false, `expressionIfFalse` will run. The ternary operator gets its name from the fact that it involves three parts: a condition, a true expression, and a false expression.

---

## How to Use the Ternary Operator

Let’s start with a basic example:

```js
let age = 18;

let canVote = age >= 18 ? 'Yes' : 'No';

console.log(canVote);  // Output: "Yes"
```

In this example, the ternary operator checks if the `age` is greater than or equal to 18. If it is, the `canVote` variable is set to `'Yes'` - otherwise, it’s set to `'No'`. This is a concise alternative to the more traditional if-else structure.

---

## The Ternary Operator vs. `if-else`

The ternary operator is often used as a shorthand for `if-else` statements when the condition is simple and can be expressed clearly in one line. Let’s take a look at how an if-else statement would handle the same logic from the previous example:

```js
let age = 18;
let canVote;

if (age >= 18) {
  canVote = 'Yes';
} else {
  canVote = 'No';
}

console.log(canVote);  // Output: "Yes"
```

### What’s the Difference between the Ternary Operator and if-else?

- **Conciseness**: The ternary operator is significantly shorter, as it allows you to write conditionals in a single line. This can make your code cleaner and easier to read in certain scenarios.
- **Readability**: just keep in mind that readability can suffer if the condition or expressions become too complex. If you're dealing with multiple conditions or long expressions, the ternary operator can make the code harder to understand. The traditional if-else statement is cleaner and a better choice in this case.
    

### Ternary vs if-else: Which is Better?

Use the ternary operator when you need to make a quick, straightforward decision in your code. Avoid using it if the condition or the expressions are complex. In those cases, if-else is usually a better choice for clarity.

### Nested Ternary Operators (And Why to Avoid Them)

One common pitfall when using the ternary operator is nesting them. Although it's possible to nest ternary operators, it can quickly lead to code that’s difficult to read and maintain.

Here’s an example of a nested ternary operator:

```js
let score = 85;

let grade = score >= 90 ? 'A' : score >= 80 ? 'B' : 'C';

console.log(grade);  // Output: "B"
```

While this code works, it's not as readable as it could be. Your code becomes messy very quickly, and while collaborating on a project with other team members, it can become an issue if your code is not readable.

### How to Refactor Nested Ternary Operators

Instead of nesting ternary operators, it's often better to use an if-else structure or employ another approach like a switch statement if there are multiple conditions.

Here’s how the above logic would look with `if-else`:

```js
let score = 85;
let grade;

if (score >= 90) {
  grade = 'A';
} else if (score >= 80) {
  grade = 'B';
} else {
  grade = 'C';
}

console.log(grade); 
// Output: "B"
```

This version is much easier to read and maintain, especially if you have additional conditions to check.

---

## Ternary Operator vs. `switch`

While the `ternary operator` and `if-else statements` handle conditional logic well, there are times when you’ll need to compare a single variable to many possible values or outcomes. In this case, the `switch` statement is your best bet.

### How to Use the Switch Statement

We use `switch` when there are several possible values for a variable. The `ternary` operator is great for simple true/false checks, but `switch` makes it easier to handle multiple options.

```js
let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = 'Monday';
    break;
  case 2:
    dayName = 'Tuesday';
    break;
  case 3:
    dayName = 'Wednesday';
    break;
  default:
    dayName = 'Unknown';
}

console.log(dayName);
// Output: "Wednesday"
```

In this code:

1. We set `day` to 3. The goal is to match this number to a day of the week.
2. We use a `switch` statement to check the value of `day`:
    - If `day` is 1, it assigns `'Monday'` to `dayName` and `break` exits the `switch` block.
    - If `day` is 2, it assigns `'Tuesday'` to dayName and `break` exits the `switch` block..
    - If day is 3, it assigns 'Wednesday' to dayName and `break` exits the `switch` block
3. If `day` isn’t 1, 2, or 3, the `default` case runs, setting `dayName` to `'Unknown'`. Since `day` is 3 in this example, `dayName` is set to `'Wednesday'`, and that’s what gets printed.

### When to Use switch Instead of Ternary

- **Multiple Conditions:** If you’re checking multiple possible values for a single variable, `switch` is more appropriate than a ternary operator or `if-else`.
- **Readability:** The `switch` statement organizes complex conditional logic in a readable way, whereas trying to achieve the same result with ternary operators would be cumbersome and difficult to maintain.

### Performance Considerations

From a performance standpoint, there’s little difference between using a ternary operator and an if-else statement. JavaScript engines are optimized to handle both efficiently.

The real concern is code clarity and maintainability. If your ternary operator is making the code harder to read, the slight performance gain (if any) won’t be worth it.

---

## Example Use Case for the Ternary Operator

In modern JavaScript frameworks like React, the ternary operator is often used for conditional rendering. Here’s an example:

```js
const isLoggedIn = true;

return (
  <div>
    {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
  </div>
);
```

This makes the code concise and readable, especially when dealing with UI rendering logic where a simple decision needs to be made based on a state or prop.

---

## Conclusion

The `ternary` operator is a powerful tool in JavaScript, allowing you to write concise and clear conditionals. However, it’s not always the best option. If your conditions are complex or readability is at risk, it’s better to stick with `if-else` statements or even a `switch` statement.

Key takeaways:

- Use the `ternary` operator for simple, one-line conditionals.
- Avoid nesting ternary operators to keep your code readable.
- For complex conditions or multiple checks, `if-else` or `switch` are better choices.

With practice, you’ll get a feel for when the `ternary` operator makes sense, helping you write cleaner, more efficient JavaScript code.

Connect with me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`samuel-oluwadamisi-01b3a4236`)](https://linkedin.com/in/samuel-oluwadamisi-01b3a4236/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BxAUJMbSgQTeDtb7n2d0mQQ%3D%3D) and [X (<FontIcon icon="fa-brands fa-x-twitter"/>`Data_Steve_`)](https://x.com/Data_Steve_) if you found this helpful.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Write Cleaner JavaScript Code with The Ternary Operator",
  "desc": "When you're coding in JavaScript, handling decisions through conditional statements is one of the core tasks you'll frequently encounter. One of the most commonly used methods for this is the ternary operator. But what exactly is it, and when should ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/write-cleaner-javascript-code-with-the-ternary-operator.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
