---
lang: en-US
title: "How to use the ternary operator in JavaScript"
description: "Article(s) > How to use the ternary operator in JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to use the ternary operator in JavaScript"
    - property: og:description
      content: "How to use the ternary operator in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/ternary-operator-javascript.html
prev: /programming/js/articles/README.md
date: 2025-02-21
isOriginal: false
author:
  - name: Chizaram Ken
    url : https://blog.logrocket.com/author/emmanuelodioko/
cover: /assets/image/blog.logrocket.com/ternary-operator-javascript/banner.png
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
  name="How to use the ternary operator in JavaScript"
  desc="Learn how to use the ternary operator in JavaScript, from its syntax to real-world examples, so you can write cleaner code."
  url="https://blog.logrocket.com/ternary-operator-javascript"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/ternary-operator-javascript/banner.png"/>

You know how people say, “Programming is basically just a bunch of `if...else` decisions”? I couldn’t agree more!

![how to use the ternary operator in javascript](/assets/image/blog.logrocket.com/ternary-operator-javascript/banner.png)

Think about it: almost everything in our code comes down to “if this happens, do that; if not, do something else.” It’s the programming DNA. And if you’re just starting your JavaScript journey, I’m excited to show you a really cool trick that’ll make your `if...else` statements cleaner with the JavaScript ternary operator.

A few prerequisites before we get into it:

- Basic JavaScript fundamentals, such as [**data types**](/blog.logrocket.com/understanding-symbols-in-javascript.md) (strings, numbers, and booleans), and understanding true or false values
- Proficiency in writing `if…else` conditional statements
- An understanding of how to use the comparison operators:

- `===`: strict equality
- `!==`: strict inequality
- `>`: greater than
- `<`: less than
- `>=`: greater than or equal
- `<=`: less than or equal

The goal of this article is to add to your JavaScript knowledge of shortcuts by mastering the ternary operator. We will cover everything from the syntax to real-world examples, so you can write cleaner code that your fellow developers will love.

---

## What is the ternary operator in JavaScript?

One of the most repeated principles in programming is the [**DRY principle**](/blog.logrocket.com/make-your-design-system-dry-with-zag.md): “Don’t Repeat Yourself.”

It’s pretty self-explanatory; do not be redundant. If there’s a straightforward way that keeps your code maintainable and readable, use it. That’s exactly why the ternary operator in JavaScript was created: as a shorthand for the `if...else` statement.

The JavaScript ternary operator [**shorthand**](/blog.logrocket.com/javascript-typescript-shorthands.md) allows us to write conditional statements in a single line, using three parts (hence the name “ternary”). It is the only JavaScript operator that takes three operands.

Below is the syntax:

```js
condition ? doThisIfTrue: doThisIfFalse
```

Let’s carefully walk through the syntax above, for a better understanding.

### `condition`

The syntax starts with a `condition`. This is where any expression that evaluates to true or false comes in. For example:

```js
age >= 18
username === "admin"
isLoggedIn && hasPermission
```

### `?`: The question mark

Next, we have the question mark, `?`. Think of it as asking a question like, “Then what?”. This question mark separates your condition from your outcomes, and should always come after your condition.

### `doThisIfTrue`

This code runs only when our condition is true. This can either be a value, an expression, or a function call:

```js
"You're an adult"
calculateBonus()
```

### `:`: Otherwise

This comes right after the true outcome, and just before the false outcome of your condition. It essentially means, “Otherwise, do this instead”.

### `doThisIfFalse`

This code runs if your condition is false. Just like `true,` it can take a value, an expression, or a function call.

Now we know the syntax, let’s play around with some examples.

---

## How to use the ternary operator in JavaScript

Let’s walk through practical examples and best practices for writing clean, maintainable code using the ternary operator.

We’ll write a basic code check for website access. Let’s say, for example, we do not want kids below 14 to have access to our social media application.

Using the traditional `if...else` statement, our logic should look like this:

```js
let age = 17;
let message;
if (age >= 14) {
    message = "Welcome to the site!";
} else {
    message = "Sorry, you must be 14 or older";
}
// Output: "Welcome to the site!"
```

In our code above, our user is said to be 17 years old. We create a `message` variable that will store whatever message is appropriate for their age. Our `if...else` statements dictate that if the user’s age is greater or equal to 14 years, they should be welcomed to the site. Otherwise, they should see a friendly message asking them to return when they’re older.

When we `console.log()` the message, our output is `Welcome to the site!`, because our user is over 14. But using the ternary operator, it looks like this:

```js
let age = 17;
let message = age >= 14 ? "Welcome to the site!" : "Sorry, you must be 14 or older";

console.log(message); // Output: "Welcome to the site!"
```

Just like that, we have turned six lines of code into two:

- `age >= 14`: Our condition
- `?`: Asks, “What happens if the user is greater or equal to 14 years?”
- `"Welcome to the site!"`: What we show if they’re 14 or older
- `:` : Says that if the user isn’t 14, show them the friendly message, `"Sorry,you must be 14 or older"`

Same result, but way cleaner. Let’s test a different age:

```js
age = 13;
if (age >= 14) {
    message = "Welcome to the site!";
} else {
    message = "Sorry, you must be 14 or older go read your books";
}
```

The ternary operator looks like this:

```js
age = 13;
message = age >= 14 ? "Welcome to the site!" : "Sorry, you must be 14 or older go read your books";
```

What will our output be? Because our user is less than 14, they must get the friendly message that reads, `Sorry, must be 14 or older go read your books`.

### Falsy values

When you’re working with ternary operators, there are many values that JavaScript sees as ‘false-like’. These are called falsy values. While the boolean `false` is the most obvious one, there are several other subtle values that will also trigger the second part of your ternary:

```js
// Let's see what happens with each of these tricky values:

let userInput = null;
let message = userInput ? "Got your input!" : "No input received...";
// You'll see: "No input received..."

let cartTotal = 0;
let checkoutStatus = cartTotal ? "Ready to pay!" : "Your cart is empty";
// You'll see: "Your cart is empty"

let userName = "";
let greeting = userName ? `Hi ${userName}!` : "Hi stranger!";
// You'll see: "Hi stranger!"

// A practical example you might use:
const getUserDisplay = (user) => {
    return user?.name ? user.name : "Anonymous User";
};
```

Whenever your condition is `null`, `NaN`, `0`, an empty string (`""`), or `undefined`, JavaScript will run the code after the`:`, instead of what’s after the `?`.

It’s like [**these values**](/blog.logrocket.com/javascript-null-empty-function.md) are automatic red flags that tell JavaScript, “Nope, let us focus on Plan B!”. This comes in handy in a real-world scenario when you’re handling user input or checking if data exists.

---

## Nested ternary operators

Let me introduce something called an `if...else` - `if...else` statement. This statement checks multiple conditions and executes different code blocks based on which condition is true.

In cases where you may want to write an `if...else` - `if...else` statement, you could easily pull this off with a ternary operator.

Let’s consider a new example. We have a standard ticket price of $20, but we believe in making our events accessible to everyone. Senior citizens 65 and above receive a 50% discount, bringing their ticket price down to $10. Adults between 18 and 64 pay the regular price of $20, while young people under 18 can enjoy a special youth rate of $12. Let’s go ahead to write the logic:

```js
// Traditional way
let age = 65;

let ticketPrice;

if (age >= 65) {
    ticketPrice = "Senior discount: $10";
} else if (age >= 18) {
    ticketPrice = "Full price: $20";
} else {
    ticketPrice = "Student discount: $12";
}
// Output: "Senior discount: $10"
```

In our code, we assume the user is a senior citizen, so they get the discount. Using the ternary operator, we have:

```js
// Nested ternary way (use carefully!)
let age = 65;
let ticketPrice = age >= 65 ? "Senior discount: $10"
                : age >= 18 ? "Full price: $20"
                : "Student discount: $12";
// Output: "Senior discount: $10"
```

This example works well. However, when nested operators get too complicated, they counteract the purpose of a ternary operator, which is to make your code more readable. When things get bulky, they become a bit hard to read - which we’ll see in the next section.

---

## Using nested ternary operators for multiple conditions

When using the ternary operator in a single line, the code is not only straightforward; it’s also simpler to read. The question mark is like asking a question about the condition. Let’s take for example the code below:

```js
speed > 70 ? "You get a ticket" : "You're good to go";
```

This is followed by a question mark, saying, `is speed greater than 70?`. If true, you get a ticket; if false you don’t.

In cases with a nested condition, the code reads better using the ternary. For example, consider the age ticket logic above. Once we are done with the initial statement (whether someone qualifies for a senior discount), we just use a colon`:`instead of “else if.”

This basically means “otherwise, check this.” It flows more naturally, like asking a series of questions:

- Are you 65 or older? Yes → Senior discount
- Otherwise, are you 18 or older? Yes → Full price
- Otherwise → Student price:

```js
if (age >= 65) {
  ticketPrice = "Senior discount: $10";
}
```

Ternaries do have their limits. When you start nesting multiple conditions inside each other, they can turn into a tangled mess that’ll make your head spin trying to read it.

Let’s say we want to add a membership status and weekend pricing to our ticket system, using the traditional `if...else`:

```js :collapsed-lines
// Traditional `if...else`:
if (age >= 65) {
  if (isMember) {
    if (isWeekend) {
      ticketPrice = "Senior member weekend: $12";
    } else {
      ticketPrice = "Senior member: $8";
    }
  } else {
    if (isWeekend) {
      ticketPrice = "Senior weekend: $15";
    } else {
      ticketPrice = "Senior regular: $10";
    }
  }
} else {
  ticketPrice = "Regular price: $20";
}
 
// Now the ternary version - watch as this gets wild!

let ticketPrice = age >= 65
  ? isMember
    ? isWeekend
      ? "Senior member weekend: $12"
      : "Senior member: $8"
    : isWeekend
      ? "Senior weekend: $15"
      : "Senior regular: $10"
  : "Regular price: $20";
```

In the code above, we’re checking three things: age, membership, and whether or not it’s the weekend.

In the `if...else` version, you can follow the logic by reading each block. But the ternary version resembles a pyramid of question marks and colons. Yes, it has fewer characters, but to what benefit?

In cases like this, you might not want to use the ternary operator, as it inhibits readability.

---

## Using the ternary operator in JavaScript frameworks

Ternary operators are actually very common in [**React components**](/blog.logrocket.com/react-design-patterns.md) because they work and look great with [<VPIcon icon="fa-brands fa-react"/>JSX](https://legacy.reactjs.org/docs/introducing-jsx.html).Let’s go through some examples of conditional renderings in React.

The code below shows a traditional `if...else` approach, where we check if a user is logged in and return different welcome messages accordingly:

```jsx
function UserGreeting({ isLoggedIn, username }) {
  if (isLoggedIn) {
    return <h1>Welcome back, {username}!</h1>;
  } else {
    return <h1>Please log in</h1>;
  }
}
```

Instead of this, we can write:

```jsx
function UserGreeting({ isLoggedIn, username }) {
  return (
    <h1>
      {isLoggedIn ? `Welcome back, ${username}!` : "Please log in"}
    </h1>
  );
}
```

In the code above we achieved exactly the same result by using the ternary operator. It’s even slicker at handling conditional styles or classes. This right here is very common:

```js
function Button({ isActive }) {
  return (
    <button
      className={isActive ? "bg-blue-500" : "bg-gray-300"}
    >
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}
```

The React button component above takes a single prop `isActive` and uses ternary operators to toggle both its background color (between blue and gray) and its text content (between `"Active"` and `"Inactive"`) based on whether `isActive` is true or false.

We can handle a loading state too:

```js
function DataDisplay({ isLoading, data }) {
  return (
    <div>
      {isLoading
        ? <span>Loading...</span>
        : <div>{data.map(item => <p>{item}</p>)}</div>
      }
    </div>
  );
}
```

---

## Advantages and pitfalls of `if...else` and ternary operators

During this article, we have seen the advantages and pitfalls of both the traditional `if...else` statement and the ternary operator. Let’s compare them directly:

| | `if…else` Statements | Ternary Operators |
| **Readability** | Simple and clear to read and understand | Can become unreadable when multiply-nested |
| **Code Length** | Takes up more lines of code | Clean, one-line code |
| **Best Use Case** | Suitable for complex logic with multiple conditions | Ideal for simple conditional assignments |
| **Execution Scope** | Great for executing multiple lines of code | Works well for inline JSX in React |
| **Skill Level Required** | Familiar to all levels of developers | Can confuse newbies in JavaScript |
| **Potential Downsides** | Looks verbose for very simple conditions; sometimes feels like overkill for simple checks | Easy to abuse with complex conditions |
| **Overall Practicality** | Preferred for clarity and structured logic | Best for concise, straightforward conditions |

---

## Browser compatibility

The ternary operator should be compatible with all browsers below. This chart comes courtesy of [<VPIcon icon="fas fa-globe"/>Can I Use](https://caniuse.com/mdn-javascript_operators_conditional):

![ternary operator browser compatibility chart from can i use](/assets/image/blog.logrocket.com/ternary-operator-javascript/ternary-operator-broswer-compatability.png)

---

## Conclusion

In this article, we walked through the best practices of using the ternary operator in JavaScript, its advantages, and its pitfalls. I will leave you a little advice of mine; if you have to think twice about whether a ternary is readable, it’s probably time to use an `if…else` statement instead. Keep it simple, and keep coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use the ternary operator in JavaScript",
  "desc": "Learn how to use the ternary operator in JavaScript, from its syntax to real-world examples, so you can write cleaner code.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/ternary-operator-javascript.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
