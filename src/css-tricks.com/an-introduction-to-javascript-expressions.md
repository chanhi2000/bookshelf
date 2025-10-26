---
lang: en-US
title: "An Introduction to JavaScript Expressions"
description: "Article(s) > An Introduction to JavaScript Expressions"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > An Introduction to JavaScript Expressions"
    - property: og:description
      content: "An Introduction to JavaScript Expressions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/an-introduction-to-javascript-expressions.html
prev: /programming/js/articles/README.md
date: 2025-10-22
isOriginal: false
author:
  - name: Mat Marquis
    url : https://css-tricks.com/author/wilto/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/javascript-for-everyone-scaled.png
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
  name="An Introduction to JavaScript Expressions"
  desc="A thorough but approachable lesson on JavaScript expressions excerpted JavaScript For Everyone, a complete online course offered by our friends at Piccalilli."
  url="https://css-tricks.com/an-introduction-to-javascript-expressions"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/javascript-for-everyone-scaled.png"/>

::: note Editor’s note

Mat Marquis and Andy Bell have released [**JavaScript for Everyone**](https://piccalil.li/javascript-for-everyone), an online course offered exclusively at Piccalilli. This post is an excerpt from the course taken specifically from a chapter all about JavaScript expressions. We’re publishing it here because we believe in this material and want to encourage folks like yourself to sign up for the course. So, please enjoy this break from our regular broadcasting to get a small taste of what you can expect from enrolling in the full *JavaScript for Everyone* course.

:::

Hey, I’m Mat, but “Wilto” works too — I’m here to teach you JavaScript.

Well, not *here*-here; technically, I’m over at [**JavaScript for Everyone**](https://piccalil.li/javascript-for-everyone) to teach you JavaScript. What we have *here* is a lesson from the *JavaScript for Everyon*e module on lexical grammar and analysis — the process of parsing the characters that make up a script file and converting it into a sequence of discrete “input elements” (lexical tokens, line ending characters, comments, and whitespace), and how the JavaScript engine interprets those input elements.

---

An **expression** is code that, when evaluated, resolves to a value. `2 + 2` is a timeless example.

```js
2 + 2
// result: 4
```

As mental models go, you could do worse than “anywhere in a script that a value is expected you can use an expression, no matter how simple or complex that expression may be:”

```js
function numberChecker( checkedNumber ) {
  if( typeof checkedNumber === "number" ) {
    console.log( "Yep, that's a number." );
  }
}

numberChecker( 3 );
// result: Yep, that's a number.

numberChecker( 10 + 20 );
// result: Yep, that's a number.

numberChecker( Math.floor( Math.random() * 20 ) / Math.floor( Math.random() * 10 ) );
// result: Yep, that's a number.
```

Granted, JavaScript doesn’t tend to leave much room for absolute statements. The exceptions are rare, but it isn’t the case absolutely, positively, *one hundred percent* of the time:

```js
console.log( -2**1 );
// result: Uncaught SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence
```

Still, I’m willing to throw myself upon the sword of “um, *actually*” on this one. That way of looking at the relationship between expressions and their resulting values is heart-and-soul of the language stuff, and it’ll get you far.

---

## Primary Expressions

There’s sort of a plot twist, here: while the above example reads to our human eyes as an example of a number, *then* an expression, then a complex expression, it turns out to be expressions all the way down. `3` is *itself* an expression — a **primary expression.** In the same way [<VPIcon icon="fas fa-globe"/>the first rule of Tautology Club is Tautology Club’s first rule](https://explainxkcd.com/wiki/index.php/703:_Honor_Societies), the number literal `3` is itself an expression that resolves in a very predictable value (psst, it’s three).

```js
console.log( 3 );
// result: 3
```

Alright, so maybe that one didn’t necessarily need the illustrative snippet of code, but the point is: the **additive expression** `2 + 2` is, in fact, the primary expression `2` plus the primary expression `2`.

Granted, the “it is what it is” nature of a primary expression is such that you won’t have much (any?) occasion to point at your display and declare “*that* is a *primary expression*,” but it does afford a little insight into how JavaScript “thinks” about values: a variable is also a primary expression, and you can mentally substitute an expression for the value it results in — in this case, the value that variable references. That’s not the *only* purpose of an expression (which we’ll get into in a bit) but it’s a useful shorthand for understanding expressions at their most basic level.

There’s a specific kind of primary expression that you’ll end up using *a lot*: the **grouping operator**. You may remember it from the math classes I just barely passed in high school:

```js
console.log( 2 + 2 * 3 );
// result: 8 

console.log( ( 2 + 2 ) * 3 );
// result: 12
```

The grouping operator (singular, I know, it kills me too) is a matched pair of parentheses used to evaluate a portion of an expression as a single unit. You can use it to override the mathematical order of operations, as seen above, but that’s not likely to be your most common use case—more often than not you’ll use grouping operators to more finely control conditional logic and improve readability:

```js
const minValue = 0;
const maxValue = 100;
const theValue = 50;

if( ( theValue > minValue ) && ( theValue < maxValue ) ) {
  // If ( the value of `theValue` is greater than that of `minValue` ) AND less than `maxValue`):
  console.log( "Within range." );
}
// result: Within range.
```

Personally, I make a point of almost never [<VPIcon icon="fa-brands fa-wikipedia-w"/>excusing my dear Aunt Sally](https://en.wikipedia.org/wiki/Order_of_operations#Mnemonics). Even when I’m working with math specifically, I frequently use parentheses just for the sake of being able to scan things quickly:

```js
console.log( 2 + ( 2 * 3 ) );
// result: 8
```

This use is relatively rare, but the grouping operator can also be used to remove ambiguity in situations where you might need to specify that a given syntax is intended to be interpreted *as* an expression. One of them is, well, right there in your developer console.

The syntax used to initialize an object — a matched pair of curly braces — is the same as the syntax used to group statements into a block statement. Within the global scope, a pair of curly braces will be interpreted as a block statement containing a syntax that makes no sense given that context, not an object literal. That’s why punching an object literal into your developer console will result in an error:

```js
{ "theValue" : true }
// result: `Uncaught SyntaxError: unexpected token: ':'
```

It’s very unlikely you’ll ever run into this *specific* issue in your day-to-day JavaScript work, seeing as there’s usually a clear division between contexts where an expression or a statement are expected:

```js
{
  const theObject = { "theValue" : true };
}
```

You won’t often be creating an object literal without intending to *do* something with it, which means it will always be in the context where an expression is expected. It *is* the reason you’ll see standalone object literals wrapped in a a grouping operator throughout this course — a syntax that explicitly says “expect an expression here”:

```js
({ "value" : true });
```

However, that’s not to say you’ll never need a grouping operator for disambiguation purposes. Again, not to get ahead of ourselves, but an **Independently-Invoked Function Expression** (IIFE), an anonymous function expression used to manage scope, relies on a grouping operator to ensure the `function` keyword is treated as a function expression rather than a declaration:

```js
(function(){
  // ...
})();
```

---

## Expressions With Side Effects

Expressions always give us back a value, in no uncertain terms. There are also expressions with **side effects** — expressions that result in a value *and* *do something*. For example, assigning a value to an identifier is an **assignment expression**. If you paste this snippet into your developer console, you’ll notice it prints `3`:

```js
theIdentifier = 3;
// result: 3
```

The resulting value of the expression `theIdentifier = 3` is the primary expression `3`; classic expression stuff. That’s not what’s *useful* about this expression, though — the useful part is that this expression makes JavaScript aware of `theIdentifier` and its value (in a way we probably shouldn’t, but that’s a topic for another lesson). That variable binding is an expression and it results in a value, but that’s not really why we’re using it.

Likewise, a function call is an expression; it gets evaluated and results in a value:

```js
function theFunction() {
  return 3;
};

console.log( theFunction() + theFunction() );
// result: 6
```

We’ll get into it more once we’re in the weeds on functions themselves, but the result of calling a function that returns an expression is — you guessed it — functionally identical to working with the value that results from that expression. So far as JavaScript is concerned, a call to `theFunction` effectively *is* the simple expression `3`, with the side effect of executing any code contained within the function body:

```js
function theFunction() {
  console.log( "Called." );
  return 3;
};

console.log( theFunction() + theFunction() );
/* Result:
Called.
Called.
6
*/
```

Here `theFunction` is evaluated twice, each time calling `console.log` then resulting in the simple expression `3` . Those resulting values are added together, and the result of that arithmetic expression is logged as `6`.

Granted, a function call may not always result in an explicit value. I haven’t been including them in our interactive snippets here, but that’s the reason you’ll see *two* things in the output when you call `console.log` in your developer console: the logged string and `undefined`.

![A browser open to an empty page, with the console opened. The first line is ‘console.log("Called.")’. The second line reads “Called.” The third line reads “undefined” is present, at a much lower contrast.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/504176641-3b5f1488-ce30-4cd7-acb2-8a18adf74e9f-1-scaled.png?resize=2560%2C1492&ssl=1)

JavaScript’s built-in `console.log` method doesn’t `return` a value. When the function is called it performs its work — the logging itself. Then, because it doesn’t have a meaningful value to `return`, it results in `undefined`. There’s nothing to *do* with that value, but your developer console informs you of the result of that evaluation before discarding it.

---

## Comma Operator

Speaking of throwing results away, this brings us to a uniquely weird syntax: the **comma operator**. A comma operator evaluates its left operand, discards the resulting value, then evaluates and *results in* the value of the right operand.

Based only on what you’ve learned so far in this lesson, if your first reaction is “I don’t know why I’d want an expression to do that,” odds are you’re reading it right. Let’s look at it in the context of an arithmetic expression:

```js
console.log( ( 1, 5 + 20 ) );
// result: 25
```

The primary expression `1` is evaluated and the resulting value is discarded, then the additive expression `5 + 20` is evaluated, and that’s resulting value. Five plus twenty, with a few extra characters thrown in for style points and a `1` cast into the void, perhaps intended to serve as a threat to the other numbers.

And hey, notice the extra pair of parentheses there? Another example of a grouping operator used for disambiguation purposes. Without it, that comma would be interpreted as separating arguments to the `console.log` method — `1` and `5 + 20` — both of which would be logged to the console:

```js
console.log( 1, 5 + 20 );
// result: 1 25
```

Now, including a value in an expression in a way where it could never be used for anything would be a pretty wild choice, granted. That’s why I bring up the comma operator in the context of expressions with side effects: both sides of the `,` operator *are evaluated*, even if the immediately resulting value is discarded.

Take a look at this `validateResult` function, which does something fairly common, mechanically speaking; depending on the value passed to it as an argument, it executes one of two functions, and ultimately returns one of two values.

For the sake of simplicity, we’re just checking to see if the value being evaluated is strictly `true` — if so, call the `whenValid` function and return the string value `"Nice!"`. If not, call the `whenInvalid` function and return the string `"Sorry, no good."`:

```js
function validateResult( theValue ) {
  function whenValid() {
    console.log( "Valid result." );
  };
  function whenInvalid() {
    console.warn( "Invalid result." );
  };

  if( theValue === true ) {
    whenValid();
    return "Nice!";
  } else {
    whenInvalid();
    return "Sorry, no good.";
  }
};

const resultMessage = validateResult( true );
// result: Valid result.

console.log( resultMessage );
// result: "Nice!"
```

Nothing wrong with this. The `whenValid` / `whenInvalid` functions are called when the `validateResult` function is called, and the `resultMessage` constant is initialized with the returned string value. We’re touching on a lot of future lessons here already, so don’t sweat the details too much.

Some room for optimizations, of course — there almost always is. I’m not a fan of having multiple instances of `return`, which in a sufficiently large and potentially-tangled codebase can lead to increased “wait, where is *that* coming from” frustrations. Let’s sort that out first:

```js
function validateResult( theValue ) {
  function whenValid() {
    console.log( "Valid result." );
  };
  function whenInvalid() {
    console.warn( "Invalid result." );
  };

  if( theValue === true ) {
    whenValid();
  } else {
    whenInvalid();
  }
  return theValue === true ? "Nice!" : "Sorry, no good.";
};

const resultMessage = validateResult( true );
// result: Valid result.

resultMessage;
// result: "Nice!"
```

That’s a little better, but we’re still repeating ourselves with two separate checks for `theValue`. If our conditional logic were to be changed someday, it wouldn’t be ideal that we have to do it in two places.

The first — the `if`/`else` — exists only to call one function or the other. We now know function calls to be expressions, and what we want from those expressions are their side effects, not their resulting values (which, absent a explicit `return` value, would just be `undefined` anyway).

Because we need them evaluated and don’t care if their resulting values are discarded, we can use comma operators (and grouping operators) to sit them alongside the two simple expressions — the strings that make up the result messaging — that we *do* want values from:

```js
function validateResult( theValue ) {
  function whenValid() {
    console.log( "Valid result." );
  };
  function whenInvalid() {
    console.warn( "Invalid result." );
  };
  return theValue === true ? ( whenValid(), "Nice!" ) : ( whenInvalid(), "Sorry, no good." );
};

const resultMessage = validateResult( true );
// result: Valid result.

resultMessage;
// result: "Nice!"
```

Lean and mean thanks to clever use of comma operators. Granted, there’s a case to be made that this is a little *too* clever, in that it could make this code a little more difficult to understand at a glance for anyone that might have to maintain this code after you (or, if you have a memory like mine, for your near-future self). The siren song of “I could do it with less characters” has driven more than one JavaScript developer toward the rocks of, uh, slightly more difficult maintainability. I’m in no position to talk, though. I chewed through my ropes *years* ago.

---

Between this lesson on expressions and the lesson on statements that follows it, well, that *would* be the whole ballgame — the entirety of JavaScript summed up, in a manner of speaking — were it not for a not-so-secret third thing. Did you know that most declarations are neither statement nor expression, despite seeming very much like statements?

Variable declarations performed with `let` or `const`, function declarations, class declarations — none of these are statements:

```js
if( true ) let theVariable;
// Result: Uncaught SyntaxError: lexical declarations can't appear in single-statement context
```

`if` is a statement that expects a statement, but what it encounters here is *one of the* non-statement declarations, resulting in a syntax error. Granted, you might never run into this specific example at all if you — like me — are the sort to always follow an `if` with a block statement, even if you’re only expecting a single statement.

I did say “*one of the* non-statement declarations,” though. There is, in fact, a single exception to this rule — a variable declaration using `var` *is* a statement:

```js
if( true ) var theVariable;
```

That’s just a hint at the kind of weirdness you’ll find buried deep in the JavaScript machinery. `5` is an expression, sure. `0.1 * 0.1` is `0.010000000000000002`, yes, absolutely. Numeric values used to access elements in an array are implicitly coerced to strings? Well, sure — they’re objects, and their indexes are their keys, and keys are strings (or Symbols). What happens if you use `call()` to give `this` a string literal value? There’s only one way to find out — two ways to find out, if you factor in strict mode.

That’s where [<VPIcon icon="fas fa-globe"/>JavaScript for Everyone](https://piccalil.li/javascript-for-everyone) is designed take you: inside JavaScript’s head. My goal is to teach you the *deep magic* — the *how* and the *why* of JavaScript. If you’re new to the language, you’ll walk away from this course with a foundational understanding of the language worth hundreds of hours of trial-and-error. If you’re a junior JavaScript developer, you’ll finish this course with a depth of knowledge to rival any senior.

I hope to see you there.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Introduction to JavaScript Expressions",
  "desc": "A thorough but approachable lesson on JavaScript expressions excerpted JavaScript For Everyone, a complete online course offered by our friends at Piccalilli.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/an-introduction-to-javascript-expressions.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
