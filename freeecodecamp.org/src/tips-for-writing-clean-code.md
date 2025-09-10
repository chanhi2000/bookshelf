---
lang: en-US
title: "Simple Tips to Help You Write Clean Code"
description: "Article(s) > Simple Tips to Help You Write Clean Code"
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
      content: "Article(s) > Simple Tips to Help You Write Clean Code"
    - property: og:description
      content: "Simple Tips to Help You Write Clean Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/tips-for-writing-clean-code.html
prev: /programming/js/articles/README.md
date: 2025-02-05
isOriginal: false
author:
  - name: Nitin Sharma
    url : https://freecodecamp.org/news/author/nitinfab/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738684292390/6e844cd5-28f8-42e9-b9e3-cc6ded9ec72f.png
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
  name="Simple Tips to Help You Write Clean Code"
  desc="Being a developer isn’t as straightforward as many people think. It’s not just about learning a programming language and typing out code to build software. There’s a lot more to it. And one of the most confusing (and often frustrating) topics for dev..."
  url="https://freecodecamp.org/news/tips-for-writing-clean-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738684292390/6e844cd5-28f8-42e9-b9e3-cc6ded9ec72f.png"/>

Being a developer isn’t as straightforward as many people think.

It’s not just about learning a programming language and typing out code to build software. There’s a lot more to it. And one of the most confusing (and often frustrating) topics for developers is clean code.

So, what is clean code?

Simply put, it’s about writing code that’s so clear and well-organized that neither you nor anyone else will get frustrated trying to understand it six months later.

Think of clean code as the programming equivalent of great design — it’s functional, beautiful, and easy to work with.

And today, I won’t spend a lot of time explaining why clean code is important — you probably already know that. Instead, I’ll get straight to the point and share seven powerful hacks to help you write cleaner, better code.

---

## 1. Write Code Like You’re Explaining it to a 5-Year Old

Let me be honest — if you are writing exceedingly clever code that your teammates or someone else can’t easily read, it won’t be helpful to anyone.

You need to write code so simple that anyone, including someone who just opened the file for the first time, can easily go through it.

For example, if your variable names look like this:

```js
let x = y + z;
```

This isn’t helpful. No one will know what x, y, and z mean — not even you, three weeks later.

Variables should describe what they hold. Think of them as self-documenting comments. Here’s a better example:

```js
let totalPrice = productPrice + shippingCost;
```

This simple best practice can be applied even when writing functions, comments, and more.

Here’s an example of hard to understand code:

```js
function calc(itm) {
  let t = 0;
  for (let i = 0; i < itm.length; i++) {
    t += itm[i].p;
  }
  return t;
}
```

You see, it doesn’t give you a proper idea about the function other than the logic.

Instead, try to write it like this:

```js
function calculateTotalPrice(cartItems) {
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price;
  }
  return totalPrice;
}
```

Now it’s clear just from looking at the code what’s going on.

---

## 2. Use AI Tools (or an AI Code Reviewer)

AI is evolving quickly and is being used in almost every industry.

Well, as a developer, you can use AI to help you write clean and readable code — all thanks to AI tools like [<VPIcon icon="iconfont icon-openai"/>ChatGPT](https://chatgpt.com/), [<VPIcon icon="iconfont icon-claude"/>Claude](https://claude.ai/), and [<VPIcon icon="iconfont icon-github"/>GitHub Copilot](https://github.com/features/copilot).

For starters, you can copy and paste your code into an LLM and ask it to review your code.

![Here’s an example of a request I made to ChatGPT:](https://cdn.hashnode.com/res/hashnode/image/upload/v1738673389541/558c64b6-f92e-4ede-bd00-8fe9c98623c0.png)

![And here’s what ChatGPT recommended:](https://cdn.hashnode.com/res/hashnode/image/upload/v1738673434670/badadf50-2e1f-46f9-9f3b-c9b189dfaeeb.png)

It even provided me with an improved version of the code.

![Here it is as follows:](https://cdn.hashnode.com/res/hashnode/image/upload/v1738673489244/3cf70568-a418-460b-9aa6-768a544965c2.png)

Along with that, you can also use AI-powered code reviewers like [<VPIcon icon="fas fa-globe"/>CodeRabbit AI](https://coderabbit.ai/), which integrates with your pull requests to offer automated code reviews, walkthroughs, and more.

In simple terms, when you install CodeRabbit AI, add it to your pull request, and then create a pull request, CodeRabbit AI provides you with summaries, code reviews, walkthroughs, and more.

![Here’s an example from an open-source repository “[<VPIcon icon="iconfont icon-github"/>`bitbomdev/minefield`](https://github.com/bitbomdev/minefield/pull/158)” of a summary generated by CodeRabbit AI:](https://cdn.hashnode.com/res/hashnode/image/upload/v1738675580325/ef823a77-6969-4e8a-a141-640468d0169d.png)

In the above examples, CodeRabbit AI simply goes through the code and provides a great summary highlighting the new features, bug fixes, and unit tests added via a pull request.

If you want to learn more, [<VPIcon icon="fas fa-globe"/>here’s](https://docs.coderabbit.ai/getting-started/quickstart/) a quickstart guide that provides more info on how to get started and use CodeRabbit AI.

Note that, AI tools can be a great help in improving your code, but they should never replace your own thinking.

When AI suggests changes, always ask yourself: Does this actually make sense?

After all, AI isn’t perfect—it can generate incorrect code. It might also miss important details that only a human can fully understand.

So instead of blindly accepting AI’s suggestions, take a moment to understand why they were made.

Remember, the goal is to use AI to speed up your workflow, catch errors, and more—while keeping full control over your code.

---

## 3. Get Rid of Unnecessary Comments

Writing good code comments can help others understand why your code is doing what it’s doing.

But I see developers writing too many comments, even where there is no need.

I believe that, whenever possible, good code should document itself.

Here’s an example of a not so helpful comment:

```js
// Adding 10 to the result 
total = total + 10;
```

You see, here the comment doesn’t make sense, and it doesn’t really add anything to the code (or our understanding of it).

It’s a better practice to write comments only if they’re important in helping a reviewer understand why you did something in particular or if there’s some ambiguity that needs explaining.

Here’s an example:

```js
// Adding 10 because the client requires a 10% buffer for calculations 
total = total + 10;
```

Now you can see that here the comment gives a clear idea about why the programmer added 10 to the total.

---

## 4. Follow the DRY Principle

I’ve seen a lot of programmers repeating the same logic or adding the same functionality in different files.

Well, you don’t need to repeat the same code everywhere because it makes the process much more complex. Keep your code DRY (Don’t Repeat Yourself).

Instead, abstract that logic into a single reusable function.

For example, instead of writing the same logic in different files:

```js
if (user.age > 18 && user.age < 65) { 
  // Do something 
}

if (user.age > 18 && user.age < 65) { 
  // Do something else 
}
```

You can create a reusable function so that you can use the logic everywhere, as shown below:

```js
function isWorkingAge(age) { 
  return age > 18 && age < 65; 
}

if (isWorkingAge(user.age)) { 
  // Do something 
}
```

In short — write once, and use everywhere.

---

## 5. Fix Your Code Formatting & Follow a Consistent Style

This is another simple hack, but many devs don’t even think about it.

First of all, you need to format your code with proper indentation.

You can just install a VS Code extension/linters like [<VPIcon icon="fas fa-globe"/>Prettier](https://prettier.io/), [<VPIcon icon="fas fa-globe"/>ESLint](https://eslint.org/), or [<VPIcon icon="iconfont icon-pypi"/>Flake8](https://pypi.org/project/flake8/), depending on the programming language you use. Configure a few settings, and you’re good to go.

These linters can help you write better code by finding mistakes, helping you follow coding rules, and keeping your code consistent. They can also catch errors, make your code easier to read, and save time on fixing bugs and reviews.

But fixing your formatting doesn’t just mean it’s clean code - it’s way more than that.

Beyond formatting, you should stick to a consistent style guide for things like function names or variable names.

For example, here’s some code that has an inconsistent style:

```js
let total_price;  
let UserData;  
function getuser() {}
```

But some of you may ask, why is the code inconsistent?

Well, it uses several different naming conventions - like `total_price` uses snake_case, `UserData` uses PascalCase, and `getuser()` is in lowercase instead of camelCase.

This makes your code harder to read and more confusing. Instead, you can follow a consistent style. Here’s how:

```js
let userData; 
let totalPrice; 
function getUser() {}
```

And just to let you know, JavaScript typically follows camelCase for variables and functions, so names like `getUser()`, `userData`, and `totalPrice` would be more consistent.

No matter whether you’re working in a team or solo, sticking to one style is a good idea. It makes the code clean, and the reviewer can easily go through it.

---

## 6. Don’t Let Your Functions Do Too Much

As a programmer, I know that sometimes you need to write complex logic inside a function.

But most often, programmers include too much logic in a single function, causing it to do more than one thing at a time. These functions become too complex, making them hard to read or understand.

It’s better to create multiple smaller functions, with each function handling a single responsibility.

Here’s an example of a slightly too complex function:

```js
function calculateCart(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total > 100 ? total * 0.9 : total;
}
```

You see, this single function does too much—it applies discounts if applicable, and calculates the total price based on quantity, making it hard to reuse for specific use cases.

A better way is to split it into three functions:

- One to apply the discount (if applicable).
- One to calculate the total price based on quantity.
- One to get the total and apply the discount if needed.

This makes the code cleaner and easier to manage. Here’s an improved version:

```js
function calculateCart(items) {
  const total = getCartTotal(items);
  return applyDiscount(total);
}

function getCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyDiscount(total) {
  return total > 100 ? total * 0.9 : total;
}
```

You see, instead of writing everything in one long block, the logic is broken into smaller, clearer functions.

And that’s what makes it easier for you (and everyone else) to understand.

---

## 7. Organize Your Files and Folders Properly

Now comes the most important part.

When you’re working on a big project, it makes no sense to dump all your code into one single folder with a bunch of random files. It’s become a nightmare for anyone trying to review the code or find a specific file.

Think about it — going through 50 files just to fix a bug. Nobody wants that.

Instead, try organizing your project into multiple folders based on pages or features.

And don’t stop there — break large files into smaller, specific modules based on functionality. This way, everything is neat, easy to find, and makes sense at first glance.

Here’s a bad example of a project structure:

```plaintext title="file structure"
project-folder/  
│  
├── index.html  
├── app.js  
├── helpers.js  
├── data.js  
├── user.js  
├── product.js
```

It’s messy, right? Now, here’s how you can improve it:

```plaintext title="file structure"
project-folder/  
│  
├── pages/  
│   ├── home/  
│   │   ├── HomePage.js  
│   │   ├── HomePage.css  
│   │   └── HomePage.test.js  
│   ├── user/  
│   │   ├── UserPage.js  
│   │   ├── UserPage.css  
│   │   └── UserPage.test.js  
│   └── product/  
│       ├── ProductPage.js  
│       ├── ProductPage.css  
│       └── ProductPage.test.js  
├── components/  
│   ├── Header.js  
│   ├── Footer.js  
│   └── Button.js  
├── utils/  
│   └── api.js  
└── index.js
```

See how simple this is?

You have separate folders for pages, components, and utilities. Inside each folder, files are organized by purpose and given clear names.

For example, if you need something for the product page, you’ll know exactly where to find it.

---

## Wrapping Up

In this article, you learned the basics you need to get started writing clean, efficient, and maintainable code.

We discussed how to write clean code, use AI tools, apply proper code formatting techniques, structure functions effectively, and follow other best practices.

If you apply these tips consistently, you’ll significantly improve your coding skills and write cleaner code.

I hope you liked it.

You can connect with me on [<VPIcon icon="fas fa-globe"/>Substack](https://substack.com/@nitinfab), and [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`Nitinfab`)](https://x.com/Nitinfab).

Also, if you're interested in learning more about AI, you can subscribe to my newsletter, [<VPIcon icon="fas fa-globe"/>AI Made Simple](https://aimadesimple0.substack.com/), where I dive deeper into practical AI strategies for everyday people.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Simple Tips to Help You Write Clean Code",
  "desc": "Being a developer isn’t as straightforward as many people think. It’s not just about learning a programming language and typing out code to build software. There’s a lot more to it. And one of the most confusing (and often frustrating) topics for dev...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/tips-for-writing-clean-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
