---
lang: en-GB
title: "Zig: The Good Parts (1)"
description: "Article(s) > Zig: The Good Parts (1)"
icon: iconfont icon-zig
category:
  - Zig
  - Article(s)
tag:
  - blog
  - dbushell.com
  - zig
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Zig: The Good Parts (1)"
    - property: og:description
      content: "Zig: The Good Parts (1)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/zig-the-good-parts.html
prev: /programming/zig/articles/README.md
date: 2025-01-27
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-01-27-zig-the-good-parts.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Zig > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/zig/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Zig: The Good Parts (1)"
  desc="The one where I become a low-level programmer."
  url="https://dbushell.com/2025/01/27/zig-the-good-parts/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-01-27-zig-the-good-parts.png"/>

Learning [<VPIcon icon="iconfont icon-zig"/>Zig](https://ziglang.org/) as a front-end developer involves plenty of unlearning. JavaScript is lenient and even TypeScript allows for mischief. With Zig, and basically everything that isn’t JavaScript, the rules of engagement are strict.

![Zig logo](https://dbushell.com/images/blog/2025/zig-logo.svg)

Zig is a low-level compiled programming language. That means unlike JavaScript it doesn’t come with a [<VPIcon icon="fa-brands fa-wikipedia-w"/>garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_%28computer_science%29) to bury the bodies. Zig is considered a modern [<VPIcon icon="fa-brands fa-wikipedia-w"/>C](https://en.wikipedia.org/wiki/C_%28programming_language%29) and alternative to [<VPIcon icon="fa-brands fa-rust"/>Rust](https://rust-lang.org/). I’ve tried Rust many times and I just bounce off it. Rust makes me feel stupid. I tried Zig and it stuck. Zig made me realise I wasn’t so stupid.

---

## The Good Parts

There’s plenty more good parts to Zig from the *General Purpose Allocator* to the *Zig Standard Library*. As I continue learning Zig I’ll be blogging more of my discoveries.

I started learning Zig because I got bored of solving [**Advent of Code**](https://dbushell.com/2025/01/16/advent-of-code)
<!-- TODO: /dbushell.com/advent-of-code.md --> puzzles with TypeScript. Zig can compile to WASM so there could be practical applications in my day job. Although I’m unlikely to need any WASM for the websites I build. Maybe one day?

**Disclaimer: I started learn Zig this year.** It’s still January. These are initial observations from a *front-end developer*, i.e. two decades of hammering stuff with JavaScript. Don’t read this and go crying on Hacker News if I’m wrong, you knew what you were getting into.

### Errors are useful

I know what you’re thinking, who enjoys handling errors? That’s because JavaScript [<VPIcon icon="fa-brands fa-firefox"/>error exceptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) are a major chore. Due to tediousness, many JS devs avoid throwing errors and instead return nullish or falsy values to deal with.

In Zig, errors are first class citizens. In practice, Zig errors work like a union type that is somewhere between enums and [optionals (discussed later)](#optionals-are-handy).

Error types are defined and returned like an enum:

```zig
const BankError = error{Denied, Overdrawn};

fn getBalance() !i32 {
  return BankError.Denied;
}
```

The exclamation `!` return type prefix denotes a possible error. The return type can be more specific with an error set:

```zig
fn getBalance() BankError!i32 {
  return BankError.Denied;
}
```

There is a shorthand for single errors without defining a set:

```zig
fn getBalance() !i32 {
  return error.Denied;
}
```

Error handling is where Zig gets fun because you can ignore errors in multiple convenient ways. The `try` keyword either unwraps the value or yeets the error back up the stack.

```zig
pub fn main() !void {
  const balance: i32 = try getBalance();
}
```

Here the `main` entry function **must** have the return type `!void` because using `try` is effectively syntactic sugar for:

```zig
pub fn main() !void {
  const balance: i32 = getBalance() catch |err| return err;
}
```

Here you can see the power of `catch` as part of the expression. `catch` can be used to provide a default value on error:

```zig
const balance: i32 = getBalance() catch 0;
```

The example above handles the error cleanly.

If you’re living life to the fullest you could “handle” an error with `unreachable`.

```zig
const balance: i32 = getBalance() catch unreachable;
```

If the `unreachable` keyword is ever reached Zig will panic. There are times you need to tell the compiler a code path is impossible. This is probably not the best way to handle errors. I suppose it’s better than using `try` and just ignoring the error until it bubble up to `main() !void` and exiting ungracefully.

A `catch` can even use a labelled block:

```zig
const balance: i32 = getBalance() catch |err| label: {
  if (err == BankError.Overdrawn) applyAdminFee();
  break :label 0;
};
```

This allows you to handle an error and return a new value in the same assignment.

Errors can also be captured and handled by conditional statements:

```zig
if (getBalance()) |balance| {
  print("Balance: {d}\n", .{balance});
} else |err| {
  print("Broke error: ({any})\n", .{err});
}
```

Zig also has an `errdefer` keyword that allows cleanup on error:

```zig
errdefer applyAdminFee();
const balance = try getBalance();
```

In the example above Zig return the parent function with the unhandled error, but not before running the `errdefer` code. If there is no error then `errdefer` never executes. [More on `defer` later](#defer-is-simple).

As you can see, Zig provides many ways to use errors for convenience. Compare this to JavaScript where exception handling is nothing but an inconvenience. JavaScript’s `try` `catch` syntax leads to awkward scope issues:

```zig
let balance = 0;
try {
  balance = getBalance();
} catch (err) {
  balance = 0;
}
```

JavaScript errors are practically invisible and [<VPIcon icon="fa-brands fa-firefox"/>TypeScript can’t help](https://learningtypescript.com/articles/why-typescript-doesnt-include-a-throws-keyword). [<VPIcon icon="fa-brands fa-firefox"/>JSDoc @throws](https://jsdoc.app/tags-throws) is a small lifeline but most JavaScript developers avoid using errors because they hate handling them. It only get worse with async and promises. When your runtime has global events like [<VPIcon icon="fa-brands fa-firefox"/>`unhandledrejection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event) it’s a sign!

I’m led to believe other languages do errors similar to Zig. Coming from JavaScript it’s a welcome change.

### Optionals are handy

Optionals are a special type that can be `null` or a specific typed value. In the example below the `getThing` function returns an optional `Thing`.

```zig
const maybe_thing: ?Thing = getThing();
```

`if` conditions can capture and unwrap an optional:

```zig
if (maybe_thing) |thing| {
  // thing is a constant in this scope...
}
```

They can also check for `null`:

```zig
if (maybe_thing == null) {
  // Do something else...
}
```

It’s also possible to unwrap with `maybe_thing.?` but if the optional is `null` an error is returned. The `orelse` keyword is used to assign defaults if the expression before it evaluates to `null`:

```zig
const thing: i32 = getThing() orelse default_thing;
```

Optional types are prefixed with `?` like this function return type:

```zig
fn getThing() ?Thing {
  // Return `Thing` or `null`...
}
```

If a function returns an optional or an error type it will be prefixed like: `!?Thing`.

Zig has type inference for assignments so my previous examples could skip the type:

```zig
const maybe_thing = getThing();
const thing = getThing() orelse default_thing;
```

I find explicitly defining the type makes code more readable. Return types for functions are mandatory and not inferred. Optionals are great for function parameters. Zig does not have default parameters, instead you can pass and check for `null`.

### Loops are concise

Zig `for` loops can iterate multiple things at once including ranges:

```zig
const string = "Hello, World!";
for (string, 0..) |character, index| {
  // Do stuff...
}
```

`while` loops have a ‘continue expression’ that is executed before the next iteration like the 3rd part of a [<VPIcon icon="fa-brands fa-firefox"/>JavaScript `for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for). It’s useful to count iterations, and maybe more imaginative things?

```zig
var lines = std.mem.splitScalar(u8, input, '\n');
var count: usize = 0;
while (lines.next()) |line| : (count += 1) {
  // Do stuff...
}
```

I found the pipe `|` syntax weird but it quickly becomes second nature. At first I was flummoxed by the lack of three step `let i = 0; i < Infinity; i++` loop syntax. Now when I go back to writing JavaScript my fingers ache typing it. It never felt cumbersome until I experience a difference way.

---

## Learning Resources

That’s all for now! If I got stuff wrong [<VPIcon icon="fas fa-globe"/>@ me on social media](https://dbushell.com/contact/).

The following links have been my source of knowledge:

<SiteInfo
  name="Welcome | zig.guide"
  desc="Get started with the Zig programming language. Zig is a general-purpose programming language and toolchain for maintaining robust, optimal, and reusable software."
  url="https://zig.guide/"
  logo="https://zig.guide/img/favicon.ico"
  preview="https://zig.guide/img/docusaurus-social-card.jpg"/>

```component VPCard
{
  "title": "Introduction to Zig",
  "desc": "Welcome! This is the initial page for the “Open Access” HTML version of the book “Introduction to Zig: a project-based book”, written by Pedro Duarte Faria. This is an open book that provides an introduction to the Zig programming language, which is a new general-purpose, and low-level language for building robust and optimal software.",
  "link": "https://pedropark99.github.io/zig-book/",
  "logo": "https://pedropark99.github.io/favicon.ico",
  "background": "rgba(79,115,232,0.2)"
}
```

```component VPCard
{
  "title": "Learning Zig",
  "desc": "Welcome to Learning Zig, an introduction to the Zig programming language. This guide aims to make you comfortable with Zig. It assumes prior programming experience, though not in any particular language.",
  "link": "https://openmymind.net/learning_zig/",
  "logo": "https://openmymind.net/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

<SiteInfo
  name="Programming with Zig: From Basics to Mastery"
  desc="Table of Contents 1. Introduction to Zig: History, Philosophy, and Getting Started  The origins of Zig Core design principles Comparison with other languages (C"
  url="https://gencmurat.com/en/pages/programming-with-zig/"
  logo="https://gencmurat.com/logo.svg"
  preview="https://gencmurat.com/icon512.png"/>

```component VPCard
{
  "title": "Introduction to Zig",
  "desc": "Welcome! This is the initial page for the “Open Access” HTML version of the book “Introduction to Zig: a project-based book”, written by Pedro Duarte Faria. This is an open book that provides an introduction to the Zig programming language, which is a new general-purpose, and low-level language for building robust and optimal software.",
  "link": "https://pedropark99.github.io/zig-book/",
  "logo": "https://pedropark99.github.io/favicon.ico",
  "background": "rgba(79,115,232,0.2)"
}
```

```component VPCard
{
  "title": "Zig Cookbook",
  "desc": "Zig cookbook is a collection of simple Zig programs that demonstrate good practices to accomplish common programming tasks.",
  "link": "https://cookbook.ziglang.cc/",
  "logo": "https://cookbook.ziglang.cc/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

<SiteInfo
  name="Orhun's Blog"
  desc="Systems programming, Rust, Ratatui, terminal tools, open source & life stuff by Orhun Parmaksız"
  url="https://blog.orhun.dev/"
  logo="https://blog.orhun.dev/favicon/favicon-16x16.png"
  preview="https://blog.orhun.dev/poorly-drawn-rat.png"/>

```component VPCard
{
  "title": "Documentation - The Zig Programming Language",
  "desc": "Zig Language Reference",
  "link": "https://ziglang.org/documentation/master/",
  "logo": "https://ziglang.org/favicon.ico",
  "background": "rgba(136,136,255,0.2)"
}
```

```component VPCard
{
  "title": "std - Zig Documentation",
  "desc": "Zig Standard Library Reference",
  "link": "https://ziglang.org/documentation/master/std/",
  "logo": "https://ziglang.org/favicon.ico",
  "background": "rgba(136,136,255,0.2)"
}
```

<SiteInfo
  name="Ziggit - A Zig community"
  desc="A community for anyone interested in the Zig Programming Language."
  url="https://ziggit.dev/"
  logo="https://ziggit.dev/uploads/default/optimized/1X/3417db0e8abaf83a355700b91efd528025492487_2_32x32.png"
  preview="https://ziggit.dev/uploads/default/original/1X/3417db0e8abaf83a355700b91efd528025492487.png"/>

---

## Zig: The Bad Parts

I’m diggin’ Zig and it’s still early days so not much has started to annoy me. There are some minor things. The Zig compiler is incredibly strict about unused or unchanged variables.

```plaintext
main.zig:56:9: error: local variable is never mutated
    var will_change = 0;
        ^~~~~~~~~~~
main.zig:56:9: note: consider using 'const'
```

This can be very annoying when running code that is a work in progress. My variable will be mutated I just haven’t gotten that far. I would prefer this to be a warning, not an error, but [the decision was made (<VPIcon icon="iconfont icon-github"/>`ziglang/zig`)](https://github.com/ziglang/zig/issues/3320#issuecomment-884478906):

> The Zig language is opinionated. There is one canonical way to do things. There will be no sloppy mode, and no divergence of compile errors from debug to release.

I can respect that, but whether or not I agree will remain in flux until I’m more experienced with Zig.

I have another minor gripe with imports. Zig allows me to import a local file:

```zig
const Thing = @import("./thing.zig");
```

But it does not allow:

```zig
const Thing = @import("../thing.zig");
```

At least not beyond the current working directory. Come on! I’m just trying to have fun reusing code. I don’t want to learn the module and build system just yet. I feel like this is unnecessary friction for learning with `zig run main.zig`.

### Defer is simple

The `defer` keyword in Zig is very difference from [<VPIcon icon="fa-brands fa-firefox"/>“defer” in JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer). It executes the statement just before the block scope ends. Defer is often used to deallocate memory.

```zig
var things = ArrayList(Thing).init(allocator);
defer things.deinit();
```

Defer is handy for grouping code in a more organised and readable way. I like this pattern:

```zig
var previous: ?Thing = null;
for (things) |item| {
  defer previous = item;
  // Do a lot of stuff
}
```

I’m a big fan of `defer` it’s simple but powerful.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Zig: The Good Parts (1)",
  "desc": "The one where I become a low-level programmer.",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/zig-the-good-parts.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
