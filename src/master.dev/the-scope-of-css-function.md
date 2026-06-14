---
lang: en-US
title: "The Scope of CSS @function"
description: "Article(s) > The Scope of CSS @function"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Scope of CSS @function"
    - property: og:description
      content: "The Scope of CSS @function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/the-scope-of-css-function.html
prev: /programming/css/articles/README.md
date: 2026-06-16
isOriginal: false
author:
  - name: Jane Ori
    url: https://master.dev/blog/author/janeori/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9932
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Scope of CSS @function"
  desc="There are some real advantages to variable scope and evaluation scope that you get with @function in CSS."
  url="https://master.dev/blog/the-scope-of-css-function/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9932"/>

We’re going to walk through some advanced patterns for using `@function` in CSS in this article that help you deliver awesome DX to your component or library users. You’ll need [**an understanding of CSS function foundations and limitations**](/master.dev/the-fundamentals-and-dev-experience-of-css-function.md) to follow along with the gold here.

::: info Article Series

```component VPCard
{
  "title": "The Fundamentals and Dev Experience of CSS @function",
  "desc": "There are quite a few ",
  "link": "/master.dev/the-fundamentals-and-dev-experience-of-css-function.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The Scope of CSS @function",
  "desc": "There are some real advantages to variable scope and evaluation scope that you get with @function in CSS.",
  "link": "/master.dev/the-scope-of-css-function.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## The Variable Scope of Custom CSS Functions

Variable scope in custom CSS @ functions is really fascinating. In normal CSS, `--vars` inherit from parent elements down to child elements. The children can freely use the inherited `--vars`.

```css
html {
  --theme: light;
  --size-1: 1rem;
}
html div {
  --palette-1: if(
    style(--theme: dark): black;
    else: white;
  );
  font-size: var(--size-1);
}
```

Similarly, in JavaScript, a function defined inside of a context *inherits* all of the variables from the context it’s defined in, to be used freely within the function. Colloquially in JavaScript, this context that variables are inherited from is called the **closure scope**.

```js
let html, div

html = () => {
  const theme = "light"
  const size1 = "1rem"

  div = () => {
    const palette1 = theme === "dark" ? "black" : "white"
    const fontSize = size1
    return { palette1, fontSize }
  }

  return { theme, size1 }
}
```

Traditional CSS `var()` usages relies heavily on patterns and expectations from your DOM structure.

That is, DOM structure determines what context a child expected to exist under and therefore determines which vars you can guarantee will be inherited from the parents and safe to use in the child.

### CSS Functions Have a Fascinating Superpower with Scope

They experience an inherited sort-of-closure scope *from wherever they’re called*. This exposes their internal work to all of the variables in any context they’re called from, *as if they were a child element in the DOM and inherited them*!

In JavaScript, it’s as if the definition for the child function was kept as a string and passed through `eval()` wherever it’s used.

An **evaluation scope**, so to speak.

```js
let html, div

const fn = `() => {
  const palette1 = theme === "dark" ? "black" : "white"
  const fontSize = size1
  return { palette1, fontSize }
}`

html = () => {
  const theme = "light"
  const size1 = "1rem"

  div = eval(fn)

  return { theme, size1 }
}

html().size1 === div().fontSize
// true
```

In CSS:

```css :collapsed-lines
@function --palette-1() {
  result: if(
    style(--theme: dark): black;
    else: white;
  );
}
@function --font-size() {
  result: var(--size-1);
}

html {
  --theme: light;
  --size-1: 1rem;
}
html div {
  --palette-1: --palette-1();
  /* white */
  font-size: --font-size();
  /* 1rem */
}

.evaluation-scope {
  --theme: dark;
  --size-1: 20px;

  --palette-1: --palette-1();
  /* black */
  font-size: --font-size();
  /* 20px */
}

.evaluation-scope div {
  --palette-1: --palette-1();
  /* black */
  font-size: --font-size();
  /* 20px */
}
```

### This is Awesome

Any component you build could have CSS functions associated with it. Those functions only ever get called from within the component, so their implementation can rely on a guaranteed **evaluation scope** from your component. 🤌 **I love this.**

<CodePen
  link="https://codepen.io/propjockey/pen/PwbEOJr/23ab4568b799fed4ca155b13b2f0055d"
  title="CSS Function Evaluation Scope"
  :default-tab="['css','result']"
  :theme="dark"/>

Pause here for a moment to feel it if it’s not understood yet, because we’re about to build on this concept in an even cooler way!

---

## You can Decouple Evaluation Scope from the DOM Entirely!

If you imagine defining a CSS function that’s **only ever meant to be called from inside of another function**, the potentially complex internals of the parent function becomes a pseudo-permanent **evaluation scope** for the child function.

A single parent function might call any number of related inner functions based on simple `if(style())` switches:

```css :collapsed-lines
@function --parent(--whichFn, --arg1, --arg2) {
  /* execute a common set of operations */
  /* for this portable evaluation scope */
  /* that computes multiple shared vars */

  --wow: calc(var(--arg1) * 2);
  --pow: pow(var(--wow), var(--arg2));

  /* Then branch execution of child fns */
  result: if(
    style(--whichFn: childA): --childA();
    style(--whichFn: childB): --childB();
    style(--whichFn: childC): --childC();
    style(--whichFn: child64): --child64();
    else: "Unknown Function";
  );
}

@function --childA() {
  /* do something with the complex vars */
  /* from the portable evaluation scope */

  result: calc(var(--wow) + var(--pow));
}

@function --childB() {
  /* The same portable evaluation scope */
  /* but computes a different series of */
  /* operations unique to --childB() fn */
  --many-more-steps: 9;

  result: calc(
    var(--pow) -
    var(--wow) +
    var(--many-more-steps)
  );
}
```

This switch function “parent” could get a little heavy and gross for DX if you intend to expose it directly as an API endpoint in your library or component documentation. Each of the args might serve different purposes depending on the child, while still sharing a series of common steps.

**But** that’s only a concern if you stop there! Take it one tiny step further:

Create `outerA` and `outerB` functions as a sort of [<VPIcon icon="fa-brands fa-digital-ocean"/>Partial Application](https://digitalocean.com/community/tutorials/javascript-functional-programming-explained-partial-application-and-currying#conclusion) (or taken all the way to pseudo curried functions if needed).

```css
@function --outerA(--arg1, --arg2: 10) {
  result: --parent(childA, --arg1, --arg2);
}
@function --outerB(--arg1, --arg2: 1) {
  result: --parent(childB, --arg1, --arg2);
}
```

These outer functions become your API to use throughout the code base instead of using the switch function directly.

::: note

You keep the complexity of a switch board API hidden, you keep the child functions relying on it hidden (because they rely on the **portable evaluation scope** and can’t be called from anywhere else), and your final delivered DX is only using the individual outer functions. It’s 🤌 as close to trivial as you can get while packing in serious complexity.

:::

In short, you create a **Portable Evaluation Scope** for internal use, and it’s completely hidden from your users’ DX. 👽

### Real World Use Case

[<VPIcon icon="iconfont icon-github"/>`propjockey/doubledash.css`](https://github.com/propjockey/doubledash.css/tree/b153f2d397ba83026e5cc997c5e77b7b7761be7c)` has [<VPIcon icon="fas fa-globe"/>bitwise operations on 16bit integers](https://propjockey.github.io/doubledash.css/#int16-logic). Internally, there is a single “bitwise” switch function:

```css :collapsed-lines
@function --dd-bitwise(--dd-int16-a, --dd-int16-op, --dd-int16-b: 0, --dd-int16-set-bit-to: 0) {
  --_dd-a-sign: sign(var(--dd-int16-a));
  --_dd-a-down-to-int: clamp(
    0,
    round(down, abs(var(--dd-int16-a)), 1),
    pow(2, 16) - 1
  );
  result: if(
    style(--dd-int16-op: right): calc(
      var(--_dd-a-sign) * clamp(
        0,
        round(down, var(--_dd-a-down-to-int) / pow(2, var(--dd-int16-b)), 1),
        pow(2, 16) - 1
      )
    ); else: --_dd-bw-split-a(
      var(--dd-int16-a),
      var(--dd-int16-op),
      var(--dd-int16-b),
      var(--dd-int16-set-bit-to)
    );
  );
}
```

If the operation is a `right shift`, it just uses division and powers to return the result, for all other operations, it adds a **portable exposure scope** layer by calling another internal `--_dd-bw-split-a()` which [splits the int16-a argument into 16 individual bits (<VPIcon icon="iconfont icon-github"/>`propjockey/doubledash.css`)](https://github.com/propjockey/doubledash.css/blob/b153f2d397ba83026e5cc997c5e77b7b7761be7c/functions/logic/int16/bitwise.css#L290).

Operations like [<VPIcon icon="fas fa-globe"/>bitwise “NOT”](https://propjockey.github.io/doubledash.css/#not-int16) flip each of the bits, `calc()` it back into a new int, and that’s the result.

Other operations like [<VPIcon icon="fas fa-globe"/>bitwise “XOR”](https://propjockey.github.io/doubledash.css/#xor-int16) call a third internal function, adding another **portable exposure scope** layer to also [split the int16-b argument into 16 more individual bits (<VPIcon icon="iconfont icon-github"/>`propjockey/doubledash.css`)](https://github.com/propjockey/doubledash.css/blob/b153f2d397ba83026e5cc997c5e77b7b7761be7c/functions/logic/int16/bitwise.css#L228), and each bit from both evaluation scopes are [xor’d together for the final result (<VPIcon icon="iconfont icon-github"/>`propjockey/doubledash.css`)](https://github.com/propjockey/doubledash.css/blob/b153f2d397ba83026e5cc997c5e77b7b7761be7c/functions/logic/int16/bitwise.css#L183).

This pattern allows encapsulation and segregation of functionality, the split-b function *only splits the argument into bits,* and then [it calls yet another function (<VPIcon icon="iconfont icon-github"/>`propjockey/doubledash.css`)](https://github.com/propjockey/doubledash.css/blob/b153f2d397ba83026e5cc997c5e77b7b7761be7c/functions/logic/int16/bitwise.css#L287) to handle [the actual switch board (<VPIcon icon="iconfont icon-github"/>`propjockey/doubledash.css`)](https://github.com/propjockey/doubledash.css/blob/b153f2d397ba83026e5cc997c5e77b7b7761be7c/functions/logic/int16/bitwise.css#L102) from the original internal call to `bitwise`.

The [<VPIcon icon="fas fa-globe"/>exposed API in doubledash’s documentation](https://propjockey.github.io/doubledash.css/#xor-int16) has a [bare minimum implementation (<VPIcon icon="iconfont icon-github"/>`propjockey/doubledash.css`)](https://github.com/propjockey/doubledash.css/blob/b153f2d397ba83026e5cc997c5e77b7b7761be7c/functions/logic/int16/xor-int16.css) and it’s the only thing dev users of the library ever see.

<CodePen
  link="https://codepen.io/propjockey/pen/EaNoRqZ/bc606014fa5b738b2edbfe928494a6ae"
  title="CSS --dd-xor-int16() function | @propjockey/doubledash.css demo"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Portable Evaluation Scope *as a feature*

You may want to actually provide a complex **portable evaluation scope** for your developer users to take advantage of with their own functionality extended from it.

This necessarily exposes the switch function to your dev user so standardized arguments across the shared switch function set are more important.

In JavaScript terms, you’d pass a reference to your custom function (as a string) into the library function and it would `eval(yourFnStr)` in place. This is something you **wouldn’t do** in JavaScript because of security concerns, but evaluation scope is baked into CSS *without security concerns* so we get to have all the fun we want!

However, in CSS we **can’t** *currently* pass functions by reference; Just like vars, there is no dynamic/interpolated references allowed yet, so **this doesn’t work**:

```css
@function --dev-user-fn() {
  result: var(--use-portable-exposure-scope) " world!";
}

@function --library-fn(--fn) {
  --use-portable-exposure-scope: "Hello";
  result: --fn();
}

body::before {
  content: --library-fn(--dev-user-fn);
}
```

It’s another unfortunate gotcha since it would be incredibly useful.

So to do this anyway because we ignore “can’t” as a philosophy, as the library or component author, we just set up the switch board function *to call functions that aren’t defined*.

Your developer user defines them. You document what your **portable evaluation scope** provides for them to use, and you’re both golden. 🎉

::: note Gotcha

You do NOT want to simply pass arguments to your functions on the switch board because, as [**detailed in the previous article**](/master.dev/the-fundamentals-and-dev-experience-of-css-function.md#function-arguments), if you call a function that doesn’t have each of those arguments defined, the call will fail without any way to debug it other than just knowing that’s why. This is bad DX. **Portable evaluation scope** instead allows your users to quickly define the function in minimal syntax, without parameters, and just use whichever variables they need.

:::

In short, your dev user calls your switch board containing the **portable evaluation scope**, pass in the identifier, and it executes the corresponding function they’ve defined.

### Real world use case

The [<VPIcon icon="fas fa-globe"/>world’s first 100% CSS loops](https://propjockey.github.io/doubledash.css/#loop) in doubledash do exactly this.

It exposes a `--dd-loop()` function for dev users which takes a library-defined switch key like `--dd-loop-id-7` as one of the arguments. Internally it does all the complexity to make it possible to iterate in a static cascading language, then ultimately [checks the switch key and executes the corresponding dev-user-provided function (<VPIcon icon="iconfont icon-github"/>`propjockey/doubledash.css`)](https://github.com/propjockey/doubledash.css/blob/b153f2d397ba83026e5cc997c5e77b7b7761be7c/functions/repeat/loop.css#L75C28-L75C42) that defines the body of their loop function.

Since there is no way to dynamically pass functions yet, the library provides 64 unused function slots in the switch so dev users can implement up to 64 global definitions for unique use cases of loops. The **portable evaluations scope** of the loop provides the current iteration index and current “x” value, among other details.

CSS does not compute what isn’t used.

<CodePen
  user="anon"
  slug-hash="RNoWBBK"
  title="FOR LOOPS IN 100% CSS!"
  :default-tab="['css','result']"
  :theme="dark"/>

As shown in the Pen, the switch board API function comes with a bonus. Dev users can set a variable like

```css
--alias: --dd-loop-id-0;
```

so when they call your switch board to use the **portable evaluation scope**, they pass in their `var(--alias)` as the key and your switch board knows what to do with it automatically. This helps keep things organized if the dev user plans on using more than one or two loops.

::: note DX Gotcha

you can’t provide variables to override the alias and let them pass the alias directly as an identifier because `if(style())` can’t check if `--arg === var(--alias-1)`, it must (currently) only check hardcoded values. Unfortunate DX but at least the `var(--alias)` option is a step in the right direction.

:::

### Wrapping the Portable Evaluation Scope

Your dev users can wrap the call to your switch board with a custom function of their own that defines parameters however they see fit, and those parameters become part of the **evaluation scope** of the child function they defined.

<CodePen
  user="anon"
  slug-hash="ZYBQzzO"
  title="100% CSS Particles (FOR LOOPS!, no JS)"
  :default-tab="['css','result']"
  :theme="dark"/>

In this 100% CSS Pen, which is [originally PostCSS artwork by Ana Tudor (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/AvqmXO?editors=1100), the dev user’s `--particles()` function defines arguments, then calls doubledash’s library `loop` function, which exposes the arguments to the `--dd-loop-id-0()` function body as part of its **portable evaluation scope**.

This DX feels similar to defining a C header file separately from the implementation.

Just like the bitwise functions where we provided individual OuterA and OuterB functions, your switch board **portable evaluation scope** could be wrapped by the dev user multiple different ways as well. For example, `--dot-particles()` and `--star-particles()` could use the same underlying library function with different arguments defaulted.

It’s almost function overloading but the final functions need unique names.

---

## Actually Overloading Signatures

If you define generic variable arguments like `--arg1` and `--arg2` and make them optional by providing default values, in your documentation, you can lie about what the arguments are called in different signatures.

For example, the [<VPIcon icon="fas fa-globe"/>simple `--dd-repeat()` function in doubledash](https://propjockey.github.io/doubledash.css/#repeat) does this when it makes the middle parameter optional as API documentation, but technically it’s the 3rd argument that’s optional.

[Internally (<VPIcon icon="iconfont icon-github"/>`propjockey/doubledash.css`)](https://github.com/propjockey/doubledash.css/blob/b153f2d397ba83026e5cc997c5e77b7b7761be7c/functions/repeat/repeat.css#L7-L13), it resolves the arguments to reasonable variable names for use deeper in the function.

```css
@function --dd-repeat(--dd-total, --_dd-arg2, --_dd-arg3: initial) {
  --dd-data: var(--_dd-arg3, var(--_dd-arg2));
  --dd-joiner: if(style(--_dd-arg3): if(
    style(--_dd-arg2: none): ;
    style(--_dd-arg2: comma): ,;
    else: var(--_dd-arg2, );
  ); else: ;);

  ...

  result: ...;
}
```

As [**suggested in the previous article**](/master.dev/the-fundamentals-and-dev-experience-of-css-function.md#function-arguments:~:text=initial%20value%20is-,particularly%20useful,-as%20a%20default), using `initial` as the default argument value makes this specific case fairly easy.

Data uses argument 3, unless it’s not defined, then argument 2 is data.

Similarly, joiner uses `if(style())` to check if argument 3 is defined and defaults to an inert `<empty>` whitespace if it’s not.

---

## The End

Evaluation scope is a mighty powerful tool for custom CSS functions. Even though the [**foundational DX of custom CSS functions**](/master.dev/the-fundamentals-and-dev-experience-of-css-function.md) is *currently* overflowing with brutal caveats, this evaluation scope is absolutely a 10-pin strike worth exploring.

In the end, if you’re shipping DX that’s better than the underlying technology that you’ve bent to your will, it is a satisfying win.

Your documentation stays on the surface and says to your users:

> Everything I can do, now we can both do without needing to do what I had to do because now this does all of that for both us, and neither of us have to worry about any of it. 😁

In other words, [I make things that help people make things (<VPIcon icon="iconfont icon-github"/>`propjockey/propjockey.io`)](https://github.com/propjockey/propjockey.io/blame/main/src/components/Jane.astro#L76).

Please do reach out if you enjoyed this, have questions, or want to show off what you’ve done: [I invite Open Contact 💚👽 (<VPIcon icon="fa-brands fa-bluesky"/>`janeori.propjockey.io`)](https://bsky.app/profile/janeori.propjockey.io)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Scope of CSS @function",
  "desc": "There are some real advantages to variable scope and evaluation scope that you get with @function in CSS.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/the-scope-of-css-function.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
