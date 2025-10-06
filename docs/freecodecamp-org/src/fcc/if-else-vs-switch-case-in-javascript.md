---
lang: en-US
title: "If-Else vs Switch Case in JavaScript - Which One is Better?"
description: "Article(s) > If-Else vs Switch Case in JavaScript - Which One is Better?"
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
      content: "Article(s) > If-Else vs Switch Case in JavaScript - Which One is Better?"
    - property: og:description
      content: "If-Else vs Switch Case in JavaScript - Which One is Better?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/if-else-vs-switch-case-in-javascript.html
prev: /programming/js/articles/README.md
date: 2025-02-27
isOriginal: false
author:
  - name: Tapas Adhikary
    url : https://freecodecamp.org/news/author/atapas/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740585035432/f829418f-0efc-4af9-b1c7-7233b6640abc.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="If-Else vs Switch Case in JavaScript - Which One is Better?"
  desc="JavaScript has been a popular programming language for almost 30 years now. Whether you’re using it for web applications, mobile applications, backend services, or even desktop applications, you’ll find that JavaScript has deep roots. Many of the lib..."
  url="https://freecodecamp.org/news/if-else-vs-switch-case-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740585035432/f829418f-0efc-4af9-b1c7-7233b6640abc.png"/>

JavaScript has been a popular programming language for almost 30 years now. Whether you’re using it for web applications, mobile applications, backend services, or even desktop applications, you’ll find that JavaScript has deep roots.

Many of the libraries and frameworks you likely use to build modern web applications are based on JavaScript, like React.js, Next.js, Angular, Solid.js, Vue.js, and Node.js to name a few.

While these libraries and frameworks provide a lot of helpful abstractions on low-level programming, as an application developer you still have to have a solid grasp of JavaScript fundamentals to be able to use them effectively.

A very basic programming concept is `Control Flow` and decision-making. And it’s not related to JavaScript alone - you’ll encounter it in most of the programming languages you work with.

In this article, you’ll learn about two primary techniques for managing control flow in JavaScript: using `if-else` and `switch-case`. Many of you may be aware of their constructs and usages. But the focus of this article is to draw a comparison between the two, so that by the end of it you’ll know which one to choose for each use case.

This article is also available as a video tutorial as part of the [<VPIcon icon="fa-brands fa-youtube"/>40 Days of JavaScript](https://youtu.be/t8QXF85YovE?list=PLIJrr73KDmRw2Fwwjt6cPC_tk5vcSICCu) initiative. Please check it out.

---

## What is Control Flow in JavaScript?

In JavaScript, your code runs line-by-line starting from the first line up to the last line of the JavaScript file. This order of code execution by the JavaScript interpreter is called `control flow`.

At times, your program may require changes in the flow of execution depending on one or more conditions. These conditions will determine whether a set of statements in the JavaScript file should be executed or not.

Let’s look at this example of a JavaScript file (some.js) shown below:

![Control FLOW](https://cdn.hashnode.com/res/hashnode/image/upload/v1740121611950/4bcaf223-1d72-4a5d-b9c6-b176e72dd93a.png)

The file has 12 lines of code. Once this file is loaded into the JavaScript environment, the interpreter will start the execution from line number 1 and will proceed line by line. At line number 4, the interpreter will encounter a `control statement` which will allow the interpreter to either execute or skip line number 5. In our case, it is skipping the execution of line number 5. So, the control goes to line 6, executes every line, and proceeds to line 9. Then, it encounters another control statement to skip line 10, start execution from line 11, and finish at the last line, line 12. There are two major control statements in JavaScript that you must be aware of:

- `if` and `if-else`
- `switch-case`

First, let’s discuss them with examples to understand how they impact the control flow of code execution.

---

## How to Handle Control Flow With the `if-else` Block

The `if` keyword and the combination of the `if-else` keywords help us create control statements in the code execution flow. With `if`, a block of code will be executed only when a test condition is passed. A passed condition returns a `true`, and a failed condition returns a `false`.

Let’s take an example: If you catch the bus, you will get home on time. Now, if you had to write this scenario programmatically, you’d create a condition for `cacthingBus`. Then, you’d pass the condition to the `if` using a pair of parenthesis. The code block associated with the `if` gets executed if the condition results in true.

```js
let catchingBus = true;

// Some code here...

if (catchingBus) {
  console.log("I will get home on time");
} 

// Some other code here...
```

In the code snippet above, the result of the condition `catchingBus` is `true`. So the code execution flow will enter the if-block and execute the console log, `I will get home on time`. If you change the value of the condition to `false`, the if-block will be skipped. In such cases, you may want to handle an alternate use case - so you bring an `else` block along with the `if`.

In the code snippet below, we have both if and else. In this case, the condition results in `false`. So, the `else` block will be executed and `I will be late to get home` will be logged into the console.

```js
let catchingBus = false;

if (catchingBus) {
  console.log("I will get home on time");
} else {
  console.log("I will be late to get home");
}
```

You may have more than a pair of if-else for handling complex problems. Let’s take an example of a grading system. If your score is 90 or above, you get a grade A, for 80 or above, a Grade B, for 70 or above, and a Grade C, or else you fail.

Let’s write the program for it with the help of the if-else. As we have multiple conditions to handle, we will need multiple if-blocks and associated else-blocks.

```js
let score = 76;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Fail");
}
```

Combining multiple if-else statements is a great way to handle checking for multiple conditions and take action based on a condition that passes or fails.

---

## How to Handle Control Flow with the `switch-case` Statement

While if-else is great when we’re checking multiple possible conditions, you can use `switch-case` to handle multiple conditions based on a `single value`.

```js
switch(value) {
  case "case 1": // do something
  case "case 2": // do something
  case "case 3": // do something
  case "case 4": // do something
  default: // do something
}
```

Unlike `if-block`, the `switch-block` accepts a value and then checks for a matching case for that value. When a case is matched, JavaScript will execute the code block for the case. Using a `break` statement will exit from the switch block. When none of the cases match, the `default` will be executed.

In the code snippet below, we are checking for a match based on a position value. So, the position value is passed to the switch statement. Now, if the position value is 1, the first case will be matched because it matches for the value 1. Likewise, it will be the same for the positions 2, 3, or 4. If we pass a position value that is not 1,2, 3, or 4, the default block will be executed.

```js
let position = 10;

switch (position) {
  case 1:
    console.log("Print 1");
    break;
  case 2:
    console.log("Print 2");
    break;
  case 3:
    console.log("Print 3");
    break;
  case 4:
    console.log("Print 4");
    break;

  default:
    console.log("Nothing is matched");
}
```

---

## The Comparison: if-else vs switch-case

Now, it’s time to compare each of these approaches. Apart from their syntactical differences, there are a few key differences and considerations you need to keep in mind before opting for one instead of the other:

- Use if-else when you have to handle complex logical conditions. But if you need to check for a fixed value like numbers, strings, and so on, and then match it to a specific case value, go for switch-case.
- When there are many if-else blocks, the readability of the code starts going downhill. It’s much easier to read case labels for switch-case.
- If there are too many if-else blocks, the performance may be slower than the switch-case block. In many JavaScript engines, switch statements are optimized. They use a jump table for the JavaScript engine to directly jump into the correct case than evaluate each condition sequentially.

Let’s understand with an example. Check out the following code snippet written using the if-else blocks:

```js
let value = 3;

if (value === 1) {
  console.log("One");
} else if (value === 2) {
  console.log("Two");
} else if (value === 3) {
  console.log("Three");
} else {
  console.log("Not found");
}
```

In this case,

- All the if-else statements will be executed sequentially. The JavaScript engine will check for each condition one by one until a match is found.
- If the matching condition is towards the bottom, then all the conditions above it must be checked. So the if-else can be slower when we have a worst-case scenario for the match. In the above example, if the match is for the value 3, the JavaScript interpreter finishes checking for values 1 and 2, before checking the value 3.

Now, the same result with the switch case:

```js
let value = 3;

switch (value) {
  case 1:
    console.log("One");
    break;
  case 2:
    console.log("Two");
    break;
  case 3:
    console.log("Three");
    break;
  default:
    console.log("Not found");
}
```

Here,

- The JavaScript engine may have the jumping table created.
- The engine directly jumps into case 3, skipping all other unnecessary checks, so it’ll be faster. But keep in mind that this difference in performance is negligible for a small number of conditions.

I hope these points help you to choose between the if-else and switch statements more easily.

---

## Before We End...

That’s all. I hope you found this article insightful. Focusing on the fundamentals of JavaScript will prepare you well for a future in web development. Check out my [<VPIcon icon="fa-brands fa-youtube"/>40 Days of JavaScript initiative](https://youtu.be/t8QXF85YovE?list=PLIJrr73KDmRw2Fwwjt6cPC_tk5vcSICCu) if you want to learn JavaScript with fundamental concepts, projects, and assignments for free (forever).

Let’s Connect:

- Subscribe to my [YouTube Channel (<VPIcon icon="fa-brands fa-youtube"/>`tapasadhikary`)](https://youtube.com/tapasadhikary).
- Follow on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`tapasadhikary`)](https://x.com/tapasadhikary) or [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tapasadhikary`)](https://linkedin.com/in/tapasadhikary/) if you don't want to miss the daily dose of up-skilling tips.
- Check out and follow my Open Source work on [GitHub (<VPIcon icon="iconfont icon-github"/>`atapas`)](https://github.com/atapas).
- I regularly publish meaningful posts on my [<VPIcon icon="fas fa-globe"/>GreenRoots Blog](https://blog.greenroots.info/), you may find them helpful, too.

See you soon with my next article. Until then, please take care of yourself, and keep learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "If-Else vs Switch Case in JavaScript - Which One is Better?",
  "desc": "JavaScript has been a popular programming language for almost 30 years now. Whether you’re using it for web applications, mobile applications, backend services, or even desktop applications, you’ll find that JavaScript has deep roots. Many of the lib...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/if-else-vs-switch-case-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
