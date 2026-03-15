---
lang: en-US
title: "JavaScript for Everyone: Destructuring"
description: "Article(s) > JavaScript for Everyone: Destructuring"
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
      content: "Article(s) > JavaScript for Everyone: Destructuring"
    - property: og:description
      content: "JavaScript for Everyone: Destructuring"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/javascript-for-everyone-destructuring.html
prev: /programming/js/articles/README.md
date: 2026-03-19
isOriginal: false
author:
  - name: Mat Marquis
    url: https://css-tricks.com/author/wilto/
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
  name="JavaScript for Everyone: Destructuring"
  desc="Mat Marquis and Andy Bell have released JavaScript for Everyone, an online course offered exclusively at Piccalilli. This post is an excerpt from the course taken specifically from a chapter all about JavaScript destructuring."
  url="https://css-tricks.com/javascript-for-everyone-destructuring"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/javascript-for-everyone-scaled.png"/>

::: note Editor’s note

Mat Marquis and Andy Bell have released [*JavaScript for Everyone*](https://piccalil.li/javascript-for-everyone/lessons), an online course offered exclusively at Piccalilli. This post is an excerpt from the course taken specifically from a chapter all about JavaScript destructuring. We’re publishing it here because we believe in this material and want to encourage folks like yourself to sign up for the course. So, please enjoy this break from our regular broadcasting to get a small taste of what you can expect from enrolling in the full *JavaScript for Everyone* course.

:::

I’ve been writing about JavaScript for long enough that I wouldn’t rule out a hubris-related curse of some kind. I wrote [<VPIcon icon="fas fa-globe"/>JavaScript for Web Designers](https://javascriptforwebdesigners.com/) more than a decade ago now, back in the era when packs of feral `var` still roamed the Earth. The fundamentals are sound, but the advice is a little dated now, for sure. Still, despite being a web development antique, one part of the book has aged particularly well, to my constant frustration.

::: info JavaScript for Web Designers (<VPIcon icon="fas fa-globe"/><code>javascriptforwebdesigners.com</code>)
> An entire programming language seemed like too much to ever fully understand, and I was certain that I wasn’t tuned for it. I was a developer, sure, but I wasn’t a *developer*-developer. I didn’t have the requisite robot brain; I just put borders on things for a living.

<SiteInfo
  name="JavaScript for Web Designers by Mat Marquis"
  desc="This thing is pretty old. Now, the good news is that the ongoing development of JavaScript, as a language, involves taking great pains (deliberate word choice, there) to ensure that new features don’t break features already rolled out to the web platform. This means that even though this book may not represent the most modern approaches to JavaScript development, the gritty details will still be accurate. Should you be using var at this point? Almost certainly not—but if you do, it works the way you’ll learn in this book."
  url="https://javascriptforwebdesigners.com/"
  logo="https://javascriptforwebdesigners.com/_assets/img/icon-32.png"
  preview="https://javascriptforwebdesigners.com/_assets/img/card.gif"/>

:::

I *still* hear this sentiment from incredibly talented designers and highly technical CSS experts that somehow can’t fathom calling themselves “JavaScript developers,” as though they were tragically born without whatever gland produces the chemicals that make a person innately understand the concept of variable hoisting and could never possibly qualify — this despite the fact that many of them *write JavaScript as part of their day-to-day work*. While I may not stand by the use of `alert()` in some of my examples (again, long time ago), the spirit of *JavaScript for Web Designers* holds every bit as true today as it did back then: type a semicolon and you’re writing JavaScript. Write JavaScript and you’re a JavaScript developer, full stop.

Now, sooner or later, you do run into the catch: nobody is born thinking like JavaScript, but to get *really* good at JavaScript, you will need to learn *how*. In order to know why JavaScript works the way it does, why sometimes things that feel like they should work don’t, and why things that feel like they *shouldn’t* work sometimes do, you need to go one step beyond the code you’re writing or even the result of running it — you need to get inside JavaScript’s head. You need to learn to interact with the language on its own terms.

That deep-magic knowledge is the goal of [<VPIcon icon="fas fa-globe"/>JavaScript for Everyone](https://piccalil.li/javascript-for-everyone), a course designed to help you get from junior- to senior developer. In *JavaScript for Everyone*, my aim is to help you make sense of the more arcane rules of JavaScript as-it-is-played — not just teach you the *how* but the *why*, using the syntaxes you’re most likely to encounter in your day-to-day work. If you’re brand new to the language, you’ll walk away from this course with a foundational understanding of JavaScript worth hundreds of hours of trial-and-error; if you’re a junior developer, you’ll finish this course with a depth of knowledge to rival any senior.

Thanks to our friends here at CSS-Tricks, I’m able to share the entire lesson on **destructuring assignment**. These are some of my favorite JavaScript syntaxes, which I’m sure we can *all* agree are normal and in fact very *cool* things to have —syntaxes are as powerful as they are terse, all of them doing a lot of work with only a few characters. The downside of that terseness is that it makes these syntaxes a little more opaque than most, especially when you’re armed only with a browser tab open to [<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) and a gleam in your eye. We got this, though — by the time you’ve reached the end of this lesson, you’ll be unpacking complex nested data structures with the best of them.

And if you missed it before, [**there’s another excerpt from the _JavaScript for Everyone_ course covering JavaScript Expressions available here on CSS-Tricks**](/css-tricks.com/an-introduction-to-javascript-expressions.md).

---

## Destructuring Assignment

When you’re working with a data structure like an array or object literal, you’ll frequently find yourself in a situation where you want to grab some or all of the values that structure contains and use them to initialize discrete variables. That makes those values easier to work with, but *historically* speaking, it can lead to pretty wordy code:

```js
const theArray = [ false, true, false ];
const firstElement = theArray[0];
const secondElement = theArray[1];
const thirdElement = theArray[2];
```

This is fine! I mean, it *works*; it has for thirty years now. But as of 2015’s ES6, we’ve had a much more elegant option: **destructuring**.

Destructuring allows you to extract individual values from an array or object and assign them to a set of identifiers without needing to access the keys and/or values one at a time. In its most simple form — called **binding pattern destructuring** — each value is unpacked from the array or object literal and assigned to a corresponding identifier, all of which are declared with a single `let` or `const` (or `var`, technically, yes, fine). Brace yourself, because this is a strange one:

```js
const theArray = [ false, true, false ];
const [ firstElement, secondElement, thirdElement ] = theArray;

console.log( firstElement );   // Result: false
console.log( secondElement );  // Result: true
console.log( thirdElement );   // Result: false
```

*That’s* the good stuff, even if it is a little weird to see brackets on that side of an assignment operator. That one binding covers all the same territory as the much more verbose snippet above it.

When working with an array, the individual identifiers are wrapped in a pair of array-style brackets, and each comma separated identifier you specify within those brackets will be initialized with the value in the corresponding element in the source Array. You’ll sometimes see destructuring referred to as **unpacking** a data structure, but despite how that and “destructuring” both sound, the original array or object isn’t modified by the process.

Elements can be skipped over by omitting an identifier between commas, the way you’d leave out a value when creating a sparse array:

```js
const theArray = [ true, false, true ];
const [ firstElement, , thirdElement ] = theArray;

console.log( firstElement );  // Result: true
console.log( thirdElement );  // Result: true
```

There are a couple of differences in how you destructure an object using binding pattern destructuring. The identifiers are wrapped in a pair of curly braces rather than brackets; sensible enough, considering we’re dealing with objects. In the simplest version of this syntax, the identifiers you use have to correspond to the property keys:

```js
const theObject = {
  "theProperty" : true,
  "theOtherProperty" : false
};
const { theProperty, theOtherProperty } = theObject;

console.log( theProperty );      // result: true
console.log( theOtherProperty ); // result: false
```

An array is an indexed collection, and indexed collections are intended to be used in ways where the specific iteration order matters — for example, with destructuring here, where we can assume that the identifiers we specify will correspond to the elements in the array, in sequential order.

That’s not the case with an object, which is a keyed collection — in strict technical terms, just a big ol’ pile of properties that are intended to be defined and accessed in *whatever* order, based on their keys. No big deal in practice, though; odds are, you’d want to use the property keys’ identifier names (or something *very* similar) as your identifiers anyway. Simple and effective, but the drawback is that it assumes a given… well, *structure* to the object being destructured.

This brings us to the alternate syntax, which looks *absolutely wild*, at least to me. The syntax is object literal *shaped*, but very, very different — so before you look at this, briefly forget everything you know about object literals:

```js
const theObject = {
  "theProperty" : true,
  "theOtherProperty" : false
};
const { theProperty : theIdentifier, theOtherProperty : theOtherIdentifier } = theObject;

console.log( theIdentifier );       // result: true
sconsole.log( theOtherIdentifier ); // result: false
```

You’re still not thinking about object literal notation, right? Because if you were, *wow* would that syntax look strange. I mean, a reference to the property to be destructured where a key would be and identifiers where the values would be?

Fortunately, we’re not thinking about object literal notation even a little bit right now, so I don’t have to write that previous paragraph in the first place. Instead, we can frame it like this: within the parentheses-wrapped curly braces, zero or more comma-separated instances of the property key with the value we want, followed by a colon, followed by the identifier we want that property’s value assigned to. After the curly braces, an assignment operator (`=`) and the object to be destructured. That’s all a lot in print, I know, but you’ll get a feel for it after using it a few times.

The second approach to destructuring is **assignment pattern destructuring**. With assignment patterns, the value of each destructured property is assigned to a specific target — like a variable we declared with `let` (or, *technically*, `var`), a property of another object, or an element in an array.

When working with arrays and variables declared with `let`, assignment pattern destructuring really just adds a step where you declare the variables that will end up containing the destructured values:
<!-- TODO: 여기서 부터 시작 -->
```js :collapsed-lines
const theArray = [ true, false ];
let theFirstIdentifier;
let theSecondIdentifier

[ theFirstIdentifier, theSecondIdentifier ] = theArray;

console.log( theFirstIdentifier );  // true
console.log( theSecondIdentifier ); // false 
```

This gives you the same end result as you’d get using binding pattern destructuring, like so:

```js
const theArray = [ true, false ];

let [ theFirstIdentifier, theSecondIdentifier ] = theArray;

console.log( theFirstIdentifier );  // true
console.log( theSecondIdentifier ); // false
```

Binding pattern destructuring will allow you to use `const` from the jump, though:

```js
const theArray = [ true, false ];

const [ theFirstIdentifier, theSecondIdentifier ] = theArray;

console.log( theFirstIdentifier );  // true
console.log( theSecondIdentifier ); // false

```

Now, if you wanted to use those destructured values to populate another array or the properties of an object, you would hit a predictable double-declaration wall when using binding pattern destructuring:

```js
// Error
const theArray = [ true, false ];
let theResultArray = [];

let [ theResultArray[1], theResultArray[0] ] = theArray;
//
// Uncaught SyntaxError: redeclaration of let theResultArray
```

We can’t make `let`/`const`/`var` do anything but create variables; that’s their entire deal. In the example above, the first part of the line is interpreted as `let theResultArray`, and we get an error: `theResultArray` was already declared.

No such issue when we’re using assignment pattern destructuring:

```js
const theArray = [ true, false ];
let theResultArray = [];

[ theResultArray[1], theResultArray[0] ] = theArray;

console.log( theResultArray );
//
// result: Array [ false, true ]
```

Once again, this syntax applies to objects as well, with a few little catches:

```js
const theObject = {
  "theProperty" : true,
  "theOtherProperty" : false
};
let theProperty;
let theOtherProperty;

({ theProperty, theOtherProperty } = theObject );

console.log( theProperty );      // true
console.log( theOtherProperty ); // false

```

You’ll notice a pair of disambiguating parentheses around the line where we’re doing the destructuring. You’ve seen this before: without the grouping operator, a pair of curly braces in a context where a statement is expected is assumed to be a block statement, and you get a syntax error:

```js
// Error
const theObject = {
  "theProperty" : true,
  "theOtherProperty" : false
};
let theProperty;
let theOtherProperty;

{ theProperty, theOtherProperty } = theObject;
//
// Uncaught SyntaxError: expected expression, got '='
```

So far this isn’t doing anything that binding pattern destructuring couldn’t. We’re using identifiers that match the property keys, but any identifier will do, if we use the alternate object destructuring syntax:

```js
const theObject = {
  "theProperty" : true,
  "theOtherProperty" : false
};
let theFirstIdentifier;
let theSecondIdentifier;

({ theProperty: theFirstIdentifier, theOtherProperty: theSecondIdentifier } = theObject );

console.log( theFirstIdentifier );  // true
console.log( theSecondIdentifier ); // false

```

Once again, nothing binding pattern destructuring couldn’t do. But *unlike* binding pattern destructuring, any kind of assignment target will work with assignment pattern destructuring:

```js
const theObject = {
  "theProperty" : true,
  "theOtherProperty" : false
};
let resultObject = {};

({ theProperty : resultObject.resultProp, theOtherProperty : resultObject.otherResultProp } = theObject );

console.log( resultObject );
//
// result: Object { resultProp: true, otherResultProp: false }
```

With either syntax, you can set “default” values that will be used if an element or property isn’t present at all, or it contains an explicit `undefined` value:

```js
const theArray = [ true, undefined ];
const [ firstElement, secondElement = "A string.", thirdElement = 100 ] = theArray;

console.log( firstElement );  // Result: true
console.log( secondElement ); // Result: A string.
console.log( thirdElement );  // Result: 100
```

```js
const theObject = {
  "theProperty" : true,
  "theOtherProperty" : undefined
};
const { theProperty, theOtherProperty = "A string.", aThirdProperty = 100 } = theObject;

console.log( theProperty );       // Result: true
console.log( theOtherProperty );  // Result: A string.
console.log( aThirdProperty );    // Result: 100
```

Snazzy stuff for sure, but where this syntax really shines is when you’re unpacking *nested* arrays and objects. Naturally, there’s nothing stopping you from unpacking an object that contains an object as a property value, then unpacking that inner object separately:

```js
const theObject = {
  "theProperty" : true,
  "theNestedObject" : {
    "anotherProperty" : true,
    "stillOneMoreProp" : "A string."
  }
};

const { theProperty, theNestedObject } = theObject;
const { anotherProperty, stillOneMoreProp = "Default string." } = theNestedObject;

console.log( stillOneMoreProp ); // Result: A string.
```

But we can make this way more concise. We don’t have to unpack the nested object separately — we can unpack it as part of the same binding:

```js
const theObject = {
  "theProperty" : true,
  "theNestedObject" : {
    "anotherProperty" : true,
    "stillOneMoreProp" : "A string."
  }
};
const { theProperty, theNestedObject : { anotherProperty, stillOneMoreProp } } = theObject;

console.log( stillOneMoreProp );  // Result: A string.
```

From an object within an object to three easy-to-use constants in a single line of code.

We can unpack mixed data structures just as succinctly:

```js
const theObject = [{
  "aProperty" : true,
},{
  "anotherProperty" : "A string."
}];
const [{ aProperty }, { anotherProperty }] = theObject;

console.log( anotherProperty ); // Result: A string.
```

A *dense* syntax, there’s no question of that — bordering on “opaque,” even. It might take a little experimentation to get the hang of this one, but once it clicks, destructuring assignment gives you an incredibly quick and convenient way to break down complex data structures without spinning up a bunch of intermediate data structures and values.

---

## Rest Properties

In all the examples above we’ve been working with known quantities: “turn these X properties or elements into Y variables.” That doesn’t match the reality of breaking down a huge, tangled object, jam-packed array, or both.

In the context of a destructuring assignment, an ellipsis (that’s `...`, not `…`, for my fellow Unicode enthusiasts) followed by an identifier (to the tune of `...theIdentifier`) represents a **rest property** — an identifier that will represent *the rest* of the array or object being unpacked. This rest property will contain all the remaining elements or properties beyond the ones we’ve explicitly unpacked to their own identifiers, all bundled up in the same kind of data structure as the one we’re unpacking:

```js
const theArray = [ false, true, false, true, true, false ];
const [ firstElement, secondElement, ...remainingElements ] = theArray;

console.log( remainingElements );
//
// Result: Array(4) [ false, true, true, false ]
```

Generally I try to avoid using examples that veer too close to real-world use on purpose where they can get a little convoluted and I don’t want to distract from the core ideas — but in this case, “convoluted” is exactly what we’re looking to work around. So let’s use an object near and dear to my heart: (part of) the data representing the very first newsletter I sent out back when I started writing this course.

```js
const firstPost = {
  "id": "mat-update-1.md",
  "slug": "mat-update-1",
  "body": "Hey, great to meet you, everybody. I'm Mat — \\"Wilto\\" is good too — and I'm here to teach you JavaScript. Not just what JavaScript is or what JavaScript does, but the *how* and the *why* of JavaScript. The weird stuff. The *deep magic_.\\n\\nWell, okay, I'm not *currently* here to teach you JavaScript, but I will be soon. Right now I'm just getting things in order for the course — planning, outlining, polishing the fancy semicolons that I only take out when I'm having company over, writing like 5,000 words about `this` as a warm-up that completely got away from me, that kind of thing.",
  "collection": "emails",
  "data": {
    "title": "Meet your Instructor",
    "pubDate": "2025-05-08T09:55:00.630Z",
    "headingSize": "large",
    "showUnsubscribeLink": true,
    "stream": "javascript-for-everyone"
  }
};
```

Quite a bit going on in there. For purposes of this exercise, assume this is coming in from an external API the way it is over on my website — this isn’t an object we control. Sure, we can work with that object directly, but that’s a little unwieldy when all we need is, for example, the newsletter title and body:

```js
const firstPost = {
  "id": "mat-update-1.md",
  "slug": "mat-update-1",
  "body": "Hey, great to meet you, everybody. I'm Mat — \\"Wilto\\" is good too — and I'm here to teach you JavaScript. Not just what JavaScript is or what JavaScript does, but the *how* and the *why* of JavaScript. The weird stuff. The *deep magic_.\\n\\nWell, okay, I'm not *currently* here to teach you JavaScript, but I will be soon. Right now I'm just getting things in order for the course — planning, outlining, polishing the fancy semicolons that I only take out when I'm having company over, writing like 5,000 words about `this` as a warm-up that completely got away from me, that kind of thing.",
  "data": {
    "title": "Meet your Instructor",
    "pubDate": "2025-05-08T09:55:00.630Z",
    "headingSize": "large",
    "showUnsubscribeLink": true,
    "stream": "javascript-for-everyone"
  }
};

const { data : { title }, body } = firstPost;

console.log( title );
//
// Result: Meet your Instructor

console.log( body );
// Result:
//
// Hey, great to meet you, everybody. I'm Mat — \\"Wilto\\" is good too — and I'm here to teach you JavaScript. Not just what JavaScript is or what JavaScript does, but the *how* and the *why* of JavaScript. The weird stuff. The *deep magic_.
//
// Well, okay, I'm not *currently* here to teach you JavaScript, but I will be soon. Right now I'm just getting things in order for the course — planning, outlining, polishing the fancy semicolons that I only take out when I'm having company over, writing like 5,000 words about `this` as a warm-up that completely got away from me, that kind of thing.
```

That’s *tidy*; a couple dozen characters and we have exactly what we need from that tangle. I know I’m not going to need those `id` or `slug` properties to publish it on my own website, so I omit those altogether — but that inner `data` object has a conspicuous ring to it, like maybe one could expect it to contain other properties associated with future posts. I don’t know what those properties will be, but I know I’ll want them all packaged up in a way where I can easily make use of them. I want the `firstPost.data.title` property in isolation, but I also want an object containing all the *rest* of the `firstPost.data` properties, whatever they end up being:

```js
const firstPost = {
  "id": "mat-update-1.md",
  "slug": "mat-update-1",
  "body": "Hey, great to meet you, everybody. I'm Mat — \\"Wilto\\" is good too — and I'm here to teach you JavaScript. Not just what JavaScript is or what JavaScript does, but the *how* and the *why* of JavaScript. The weird stuff. The *deep magic_.\\n\\nWell, okay, I'm not *currently* here to teach you JavaScript, but I will be soon. Right now I'm just getting things in order for the course — planning, outlining, polishing the fancy semicolons that I only take out when I'm having company over, writing like 5,000 words about `this` as a warm-up that completely got away from me, that kind of thing.",
  "data": {
    "title": "Meet your Instructor",
    "pubDate": "2025-05-08T09:55:00.630Z",
    "headingSize": "large",
    "showUnsubscribeLink": true,
    "stream": "javascript-for-everyone"
  }
};

const { data : { title, ...metaData }, body } = firstPost;

console.log( title );   // Result: Meet your Instructor
console.log( metaData );
//
// Result: Object { pubDate: "2025-05-08T09:55:00.630Z", headingSize: "large", showUnsubscribeLink: true, stream: "javascript-for-everyone" }
```

*Now* we’re talking. Now we have a `metaData` object containing anything and everything else in the `data` property of the object we’ve been handed.

Listen. If you’re anything like me, even if you haven’t quite gotten your head around the syntax itself, you’ll find that there’s something viscerally satisfying about the binding in the snippet above. All that work done in a single line of code. It’s terse, it’s elegant — it takes the complex and makes it simple. That’s the good stuff.

And yet: maybe you can hear it too, ever-so-faintly? A quiet voice, way down in the back of your mind, that asks “I wonder if there’s an even *better* way.” For what we’re doing here, in isolation, this solution is about as good as it gets — but as far as the wide world of JavaScript goes: there’s *always* a better way. If you can’t hear it just yet, I bet you will by the end of the course.

Anyone who writes JavaScript is a JavaScript developer; there are no two ways about that. But the satisfaction of creating order from chaos in just a few keystrokes, and the drive to find even better ways to do it? Those are the makings of a JavaScript developer to be *reckoned* with.

---

You can do more than just “get by” with JavaScript; I know you can. You can *understand* JavaScript, all the way down to the mechanisms that power the language — the gears and springs that move the entire “interactive” layer of the web. To really understand JavaScript is to understand the boundaries of how users interact with the things we’re building, and broadening our understanding of the medium we work with every day sharpens all of our skills, from layout to accessibility to front-end performance to typography. *Understanding* JavaScript means less “I wonder if it’s possible to…” and “I guess we have to…” in your day-to-day decision making, even if you’re not the one tasked with *writing* it. Expanding our skillsets will always make us better — and more valued, professionally — no matter our roles.

JavaScript is a tricky thing to learn; I know that all too well — that’s why I wrote [<VPIcon icon="fas fa-globe"/>JavaScript for Everyone](https://piccalil.li/javascript-for-everyone). You can do this, and I’m here to help.

I hope to see you there.

<SiteInfo
  name="JavaScript for Everyone"
  desc="A high quality, expansive written course that will elevate your JavaScript skills to a level you never thought was achievable."
  url="https://piccalil.li/javascript-for-everyone/"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.li/images/course-landers/javascript-for-everyone/social-share-post-launch.jpg"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript for Everyone: Destructuring",
  "desc": "Mat Marquis and Andy Bell have released JavaScript for Everyone, an online course offered exclusively at Piccalilli. This post is an excerpt from the course taken specifically from a chapter all about JavaScript destructuring.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/javascript-for-everyone-destructuring.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
