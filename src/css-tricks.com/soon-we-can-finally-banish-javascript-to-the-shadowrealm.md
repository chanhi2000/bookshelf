---
lang: en-US
title: "Soon We Can Finally Banish JavaScript to the ShadowRealm"
description: "Article(s) > Soon We Can Finally Banish JavaScript to the ShadowRealm"
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
      content: "Article(s) > Soon We Can Finally Banish JavaScript to the ShadowRealm"
    - property: og:description
      content: "Soon We Can Finally Banish JavaScript to the ShadowRealm"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/soon-we-can-finally-banish-javascript-to-the-shadowrealm.html
prev: /programming/js/articles/README.md
date: 2026-05-12
isOriginal: false
author:
  - name: Mat Marquis
    url: https://css-tricks.com/author/wilto/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/js-shadow.png
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
  name="Soon We Can Finally Banish JavaScript to the ShadowRealm"
  desc="The proposed ShadowRealm API introduces a new kind of realm specifically designed for isolation, and only that."
  url="https://css-tricks.com/soon-we-can-finally-banish-javascript-to-the-shadowrealm"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/js-shadow.png"/>

It’s gonna be tough to keep it together on this one. Okay. I got this. I am a *professional technical writer*. Straight face; all-business. Ahem: if you’ve been following the ongoing work at TC39 (the standards body responsible for maintaining and developing the standards that inform JavaScript) you may have encountered some of [their recent work on ShadowRealms (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-shadowrealm`)](https://github.com/tc39/proposal-shadowrealm)— *snrk*. Sorry! Sorry, I’m good! Just, whew ­— what a name, “ShadowRealms.” Okay, hang on, let me start at the beginning. Maybe that will help.

It’s exceptionally likely you’ve seen JavaScript described as “single-threaded” at some point — that’s usually pretty high up on the list of JavaScript fundamentals, alongside “case sensitive,” “whitespace insensitive,” and “bad at math.” That is *correct*, in the strict “computer science” sense, but it still gets my hackles up a little whenever I see it.

I mean, accurate in that JavaScript isn’t multi-threaded, for sure. A script is always executed in a very linear way — top to bottom, left to right, one execution context after another, winding up the call stack and then back down again. It’s just that you eventually come to learn about something like [**Web Workers**](/css-tricks.com/off-the-main-thread.md), which — not to put too fine a point on this — allow you to execute JavaScript code in *another thread*. That’s where I think “JavaScript is single-threaded” becomes a less helpful framing, because even though JavaScript isn’t a multi-threaded *language*, a JavaScript *application* can make use of multiple threads.

It’s a better framing — and every bit as technically accurate — to say that a JavaScript **realm** is single-threaded. A realm refers to the environment where code is executed: a browser tab is a realm, and within that realm is the single thread where JavaScript is executed — the **main thread**. A Web Worker is a realm with a **worker thread**. JavaScript running in a cross-origin `iframe` is running in *that* `iframe` realm’s main thread. We can’t, for example, offload the execution of a single function to another thread — JavaScript is *itself* single-threaded, as a language. But a JavaScript application can span multiple realms and make use of multiple execution threads, and each of those realms can communicate with other realms in specific ways.

Each JavaScript realm has its own global environment. In a browser tab, the global object is the `Window` interface. The same is true in a non-same-origin `iframe` within that browser tab — the global object is the `Window` “owned” by that `iframe`:

```html
<html>
  <head></head>
  <body>
    <iframe id="theIframe"></iframe>
  </body>

  <script>
  ( () => {
    console.log( window.globalThis );
    // Result: Window {}

    console.log( theIframe.contentWindow.globalThis );
    // Result: Window {}
  })();

  </script>
</html>
```

These aren’t the *same* global object:

```html
<html>
  <head></head>
  <body>
    <iframe id="theIframe"></iframe>
  </body>

  <script>
  ( () => {
    console.log( window.globalThis === theIframe.contentWindow.globalThis );
    // Result: false
  })();
  </script>
</html>
```

The outer page and the inner `iframe` are two separate realms, both single-threaded, each with their own global objects and their own intrinsic objects:

```html :collapsed-lines
<html>
  <head></head>
  <body>
    <iframe id="theIframe"></iframe>
  </body>

  <script>
    (() => {
      console.log( window.Array );
      /* Result (expanded):
        function Array()
        from: function from()
        fromAsync: function fromAsync()
        isArray: function isArray()
        length: 1
        name: "Array"
        of: function of()
        prototype: Array []
        Symbol(Symbol.species): undefined
        <prototype>: function ()
      */

      console.log( theIframe.contentWindow.Array );
      /* Result (expanded):
        function Array()
        from: function from()
        fromAsync: function fromAsync()
        isArray: function isArray()
        length: 1
        name: "Array"
        of: function of()
        prototype: Array []
        Symbol(Symbol.species): undefined
        <prototype>: function ()
      */

      console.log( window.Array === theIframe.contentWindow.Array );
      // Result: false

    })();
  </script>
</html>
```

So, as you might expect, any global properties defined in the context of one realm will be unavailable to another:

```html
<html>
  <head></head>
  <body>
    <iframe id="theIframe"></iframe>
  </body>

  <script>
  function globalFunction() {};

  console.log( window.globalFunction );
  // Result: function globalFunction()

  console.log( theIframe.contentWindow.globalFunction );
  // Result: undefined
  </script>
</html>
```

“Unavailable” — or, depending on how you look at it, unable to *interfere* with the the global object of another realm. If you’ve been JavaScripting for a while, you know that no matter how meticulous we are about managing scope, the global environment can get pretty messy despite our best efforts. Some of that is on us, sure — a stray variable binding happens to the best of us — but a lot of that clutter is a result of the early design decisions that went into the language itself, like the function declaration in the previous example. When you consider the staggering amount of JavaScript we don’t control that can get piled onto the average project — from frameworks to third-party helper libraries to polyfills to user analytics to advertisements — there’s potential for collisions, to say the least.

Given the global scope pollution that has haunted the language since time immemorial (the 90s), it isn’t hard to imagine the use cases for offloading code to a realm that can act as a sandbox for the execution of JavaScript we don’t want to impact, or be impacted by, whatever is already cluttering up the global scope. We might want to run part of our test suite in a “clean room” where *performing* the testing can’t potentially interfere with the results of your testing and mock data can’t run afoul of the real thing, or a place to run code we want quarantined away from the realm that contains our JavaScript application itself to prevent third-party libraries that don’t *need* access to the global environment from cluttering it up, to no benefit.

We can’t do that with realms, as they stand right now — remember, JavaScript is single-threaded in that each *realm* is single-threaded, and communication between those threads is limited. As undeniable as the use case is, we can’t repurpose an alternate realm to execute code on its single thread of execution, then weave the results of that execution back into the main thread of our primary realm. That’s multi-threaded execution by definition, and not just contrary to the fundamental nature of JavaScript, but, well, let me put it this way: JavaScript allowing multiple threads of execution at the same time *mean would problems us new for*.

To offload code in this way would require a new *kind* of realm — one that has its own global and intrinsic objects, but *not* it’s own thread — a realm where code offloaded to it will still be executed on the main thread of the realm that “owns” that script. A dark reflection of our own realms; a realm the light can never touch, where only fleeting, ephemeral shadows of our banished code can dwell! Imagine a distant peal of thunder, here; maybe also imagine that I’m wearing a cape, maybe I hurl a wine glass to the floor. Y’know, have fun with it. How could you not? I mean, they’re called:

---

## ShadowRealms

The proposed [ShadowRealm API (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-shadowrealm`)](https://github.com/tc39/proposal-shadowrealm) introduces a new kind of realm specifically designed for *isolation*, and only that. A ShadowRealm does *not* have an execution context of its own — code offloaded to a ShadowRealm will exist in a pseudo-realm with its own global and built-in objects. That code continues to run on the same thread as the code where the ShadowRealm is created; we’re not forced to communicate and share resources back and forth between two separate threads in limited ways. In short, a script is executed the way it would if limited to a single realm, but quarantined away from that outer realm’s intrinsic objects, APIs, global object, and anything our script has *done* to that global object.

That sounds complicated, but the proposed API would be exceptionally simple in practice:

```js
// Create a ShadowRealm:
const shadow = new ShadowRealm();

function globalFunction() {};

console.log( globalthis.globalFunction );
// Result: function globalFunction()

// Evaluate `globalThis.globalFunction` inside the ShadowRealm:
console.log( shadow.evaluate( 'globalThis.globalFunction' ) );
// Result: undefined
```

::: note

Keep in mind that this code is still theoretical — it doesn’t exist in the ES-262 standard or browsers just yet.

:::

`globalFunction` is defined on the outer realm’s global object just like we saw earlier, but it isn’t defined on the global object inside of our newly-created ShadowRealm — that ShadowRealm’s global object remains pristine, no matter what we do *outside* of it. The inverse is true, naturally:

```js
// Create a ShadowRealm:
const shadow = new ShadowRealm();

// Declare a global function inside the ShadowRealm:
shadow.evaluate( 'function globalFunction() {};' );

// It doesn't exist in the outer realm's global object:
console.log( globalthis.globalFunction );
// Result: undefined

// But when we evaluate `globalThis.globalFunction` inside the ShadowRealm:
console.log( shadow.evaluate( 'globalThis.globalFunction' ) );
// Result: function globalFunction()
```

We’ve declared that function inside the ShadowRealm, and we can call it by way of the variable that references that ShadowRealm object. That function remains quarantined away from the outer global object and that of any other ShadowRealm:

```js
// Create a ShadowRealm:
const firstShadow = new ShadowRealm();
const secondShadow = new ShadowRealm();

// Declare a global function inside the ShadowRealm referenced by `secondShadow`:
secondShadow.evaluate( 'function globalFunction() {};' );

// It doesn't exist in the outer realm's global object:
console.log( globalthis.globalFunction );
// Result: undefined

// It doesn't exist in the global object of the ShadowRealm referencd by `firstShadow`:
console.log( firstShadow.evaluate( 'globalThis.globalFunction' ) );
// Result: undefined

// It only exists within the ShadowRealm referenced by `secondShadow`:
console.log( secondShadow.evaluate( 'globalThis.globalFunction' ) );
// Result: function globalFunction()
```

“Quarantined” to an extent, that is. ShadowRealms don’t provide a true security boundary in that code running inside a ShadowRealm can still make inferences about code running in other realms. They *can* be thought of as an *integrity* boundary, in that code running inside a ShadowRealm can’t directly interfere with another realm — unless we let it, of course. Even though code shunted off into a ShadowRealm can’t interfere with the objects outside of it, we’re still free to use the results of those operations the way we would use the results of that same operation in the host realm:

```js
// Create a ShadowRealm:
const shadow = new ShadowRealm();

// Create a binding that calls a function inside the ShadowRealm:
const shadowFunction = shadow.evaluate( '( value ) => globalThis.someValue = value );

// ...and call our wrapped function using that binding:
shadowFunction( "Hello from the ShadowRealm!" );

// Executing this function in the host realm doesn't _change_ anything here, of course:
console.log( globalThis.someValue );
// Result: undefined

// But we can grab the result from the ShadowRealm:
const shadowValue = shadow.evaluate( 'globalThis.someValue' );

// And use it here in the host realm:
console.log( shadowValue );
// Result: Hello from the ShadowRealm!
```

Infinite disposable cleanrooms! Pocket dimensions where we can execute whatever code we want, without fear of that code interfering with the scope of any other ShadowRealm *or* the outer realm — the “light realm,” if you will.

Now, some of you — especially those of you who’ve been doing this since the early days of JavaScript — have probably been recoiling at these examples. You’d be forgiven for thinking that ShadowRealm API is just goth `eval`, and you wouldn’t be strictly wrong: apart from running in the context of a ShadowRealm, what you’ve seen so far here are basically indirect calls to `eval` — even subject to the same `unsafe-eval` [<VPIcon icon="fa-brands fa-firefox"/>Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy) rule.

Fear not for your workflows, however: while these are *illustrative* examples, this isn’t the only way to put ShadowRealms to use. The proposal includes an `importValue` method on the ShadowRealm object’s prototype, which allows you to dynamically import modules, then capture and work with exported values and functions:

```js
// spookycode.js
export function greeting() {
 return "Hello from the ShadowRealm!";
}
```

```js
async function shadowGreeter() {
  // I INVOKE THE DARK POWER OF THE SHADOWREALM- ahem. Sorry.
  const shadow = new ShadowRealm();

  /* 
  * `importValue` returns a promise that resolves with the value of the function 
  * specified in the second argument: 
  */
  const shadowGreet = await shadow.importValue( "./spookycode.js", "greeting" );

  // Call our wrapped function, annnnd...
  shadowGreet();
}

shadowGreeter();
// Result: Hello from the ShadowRealm!
```

---

## The shadow hasn’t fallen yet

I’m pleased to say that you’ve now seen the *entirety* of the proposed ShadowRealms API, at this point. The proposal includes only those the two methods you’ve seen here — `evaluate` and `importValue` — both means of ~banishing~ evaluating code in the context of a ShadowRealm instance while still *executing* that code in the context of the host realm’s thread.

Again, though: none of this can be put to use just yet. The proposed specification is currently at [<VPIcon icon="fas fa-globe"/>Stage 2.7](https://tc39.es/process-document/) — “approved in principle and undergoing validation,” meaning that it’s only likely to change as a result of feedback from tests and trial implementations in browsers, if at all. You’re playing a move ahead by reading this. When this proposal reaches Stage 3 and we start to see implementations in browsers, you’ll be ready to try it out for yourself. Nay, more than ready — at such time as the awesome power of the ShadowRealm is loosed upon the web, you shall stand at the ready to command its dark and fearsome majjycks! *The very realm upon which our code stands shall quake, as*— okay, okay, sorry. Look, I can’t help it! I mean, “*ShadowRealm*,” for cryin’ out loud.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Soon We Can Finally Banish JavaScript to the ShadowRealm",
  "desc": "The proposed ShadowRealm API introduces a new kind of realm specifically designed for isolation, and only that.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/soon-we-can-finally-banish-javascript-to-the-shadowrealm.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
