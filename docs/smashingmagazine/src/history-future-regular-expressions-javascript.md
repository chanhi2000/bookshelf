---
lang: en-US
title: "Regexes Got Good: The History And Future Of Regular Expressions In JavaScript"
description: "Article(s) > Regexes Got Good: The History And Future Of Regular Expressions In JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - RegEx
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - js
  - javascript
  - regex
  - regular-expression
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Regexes Got Good: The History And Future Of Regular Expressions In JavaScript"
    - property: og:description
      content: "Regexes Got Good: The History And Future Of Regular Expressions In JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/history-future-regular-expressions-javascript.html
prev: /programming/js/articles/README.md
date: 2024-08-20
isOriginal: false
author:
  - name: Steven Levithan
    url: https://smashingmagazine.com/author/steven-levithan/
cover: https://files.smashing.media/articles/history-future-regular-expressions-javascript/history-future-regular-expressions-javascript.jpg
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

```component VPCard
{
  "title": "RegEx > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/regex/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Regexes Got Good: The History And Future Of Regular Expressions In JavaScript"
  desc="Although JavaScript regexes used to be underpowered compared to other modern flavors, numerous improvements in recent years mean that’s no longer true. Steven Levithan evaluates the history and present state of regular expressions in JavaScript with tips to make your regexes more readable, maintainable, and resilient."
  url="https://smashingmagazine.com/2024/08/history-future-regular-expressions-javascript/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/history-future-regular-expressions-javascript/history-future-regular-expressions-javascript.jpg"/>

Although JavaScript regexes used to be underpowered compared to other modern flavors, numerous improvements in recent years mean that’s no longer true. Steven Levithan evaluates the history and present state of regular expressions in JavaScript with tips to make your regexes more readable, maintainable, and resilient.

Modern JavaScript regular expressions have come a long way compared to what you might be familiar with. Regexes can be **an amazing tool for searching and replacing text**, but they have a longstanding reputation (perhaps outdated, as I’ll show) for being difficult to write and understand.

This is especially true in JavaScript-land, where regexes languished for many years, comparatively underpowered compared to their more modern counterparts in PCRE, Perl, .NET, Java, Ruby, C++, and Python. Those days are over.

In this article, I’ll recount the history of improvements to JavaScript regexes (spoiler: ES2018 and ES2024 changed the game), show examples of modern regex features in action, introduce you to a lightweight [JavaScript library (<VPIcon icon="iconfont icon-github"/>`slevithan/regex`)](https://github.com/slevithan/regex) that makes JavaScript stand alongside or surpass other modern regex flavors, and end with a preview of active proposals that will continue to improve regexes in future versions of JavaScript (with some of them already working in your browser today).

---

## The History of Regular Expressions in JavaScript

ECMAScript 3, standardized in 1999, introduced Perl-inspired regular expressions to the JavaScript language. Although it got enough things right to make regexes pretty useful (and mostly compatible with other Perl-inspired flavors), there were some big omissions, even then. And while JavaScript waited 10 years for its next standardized version with ES5, other programming languages and regex implementations added useful new features that made their regexes more powerful and readable.

But that was then.

> Did you know that nearly every new version of JavaScript has made at least minor improvements to regular expressions?

Let’s take a look at them.

Don’t worry if it’s hard to understand what some of the following features mean — we’ll look more closely at several of the key features afterward.

- ES5 (2009) fixed unintuitive behavior by creating a new object every time regex literals are evaluated and allowed regex literals to use unescaped forward slashes within character classes (`/[/]/`).
- ES6/ES2015 added two new regex flags: `y` (`sticky`), which made it easier to use regexes in parsers, and `u` (`unicode`), which added several significant Unicode-related improvements along with strict errors. It also added the `RegExp.prototype.flags` getter, support for subclassing `RegExp`, and the ability to copy a regex while changing its flags.
- ES2018 was the edition that finally made JavaScript regexes pretty good. It added the `s` (`dotAll`) flag, lookbehind, named capture, and Unicode properties (via `\p{...}` and `\P{...}`, which require ES6’s flag `u`). All of these are extremely useful features, as we’ll see.
- ES2020 added the string method `matchAll`, which we’ll also see more of shortly.
- ES2022 added flag `d` (`hasIndices`), which provides start and end indices for matched substrings.
- And finally, ES2024 added flag `v` (`unicodeSets`) as an upgrade to ES6’s flag `u`. The `v` flag adds a set of multicharacter “properties of strings” to `\p{...}`, multicharacter elements within character classes via `\p{...}` and `\q{...}`, nested character classes, set subtraction `[A--B]` and intersection `[A&&B]`, and different escaping rules within character classes. It also fixed case-insensitive matching for Unicode properties within negated sets `[^...]`.

As for whether you can safely use these features in your code today, the answer is yes! The latest of these features, flag `v`, is supported in Node.js 20 and [<VPIcon icon="iconfont icon-caniuse"/>2023-era](https://caniuse.com/mdn-javascript_builtins_regexp_unicodesets) browsers. The rest are supported in 2021-era browsers or earlier.

::: info

Each edition from ES2019 to ES2023 also added additional Unicode properties that can be used via `\p{...}` and `\P{...}`. And to be a completionist, ES2021 added string method `replaceAll` — although, when given a regex, the only difference from ES3’s `replace` is that it throws if not using flag `g`.

:::

### Aside: What Makes a Regex Flavor Good?

With all of these changes, how do JavaScript regular expressions now stack up against other flavors? There are multiple ways to think about this, but here are a few key aspects:

- **Performance.**<br/>This is an important aspect but probably not the main one since mature regex implementations are generally pretty fast. JavaScript is strong on regex performance (at least considering V8’s Irregexp engine, used by Node.js, Chromium-based browsers, and [<VPIcon icon="fa-brands fa-firefox"/>even Firefox](https://hacks.mozilla.org/2020/06/a-new-regexp-engine-in-spidermonkey/); and JavaScriptCore, used by Safari), but it uses a backtracking engine that is missing any syntax for backtracking control — a major limitation that makes ReDoS vulnerability more common.
- **Support for advanced features** that handle common or important use cases.<br/>Here, JavaScript stepped up its game with ES2018 and ES2024. JavaScript is now best in class for some features like lookbehind (with its infinite-length support) and Unicode properties (with multicharacter “properties of strings,” set subtraction and intersection, and script extensions). These features are either not supported or not as robust in many other flavors.
- **Ability to write readable and maintainable patterns.**<br/>Here, native JavaScript has long been the worst of the major flavors since it lacks the `x` (“extended”) flag that allows insignificant whitespace and comments. Additionally, it lacks regex subroutines and subroutine definition groups (from PCRE and Perl), a powerful set of features that enable writing grammatical regexes that build up complex patterns via composition.

So, it’s a bit of a mixed bag.

::: *From X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>?</code>)

> JavaScript regexes have become exceptionally powerful, but they’re still missing key features that could make regexes safer, more readable, and more maintainable (all of which hold some people back from using this power).

:::

The good news is that all of these holes can be filled by a JavaScript library, which we’ll see later in this article.

---

## Using JavaScript’s Modern Regex Features

Let’s look at a few of the more useful modern regex features that you might be less familiar with. You should know in advance that this is **a moderately advanced guide**. If you’re relatively new to regex, here are some excellent tutorials you might want to start with:

- [<VPIcon icon="fas fa-globe"/>RegexLearn](https://regexlearn.com/) and [<VPIcon icon="fas fa-globe"/>RegexOne](https://regexone.com/) are interactive tutorials that include practice problems.
- JavaScript.info’s [<VPIcon icon="fas fa-globe"/>regular expressions](https://javascript.info/regular-expressions) chapter is a detailed and JavaScript-specific guide.
- [<VPIcon icon="fa-brands fa-youtube"/>Demystifying Regular Expressions](https://youtu.be/M7vDtxaD7ZU) (video) is an excellent presentation for beginners by Lea Verou at HolyJS 2017.
- [<VPIcon icon="fa-brands fa-youtube"/>Learn Regular Expressions In 20 Minutes](https://youtu.be/rhzKDrUiJVk) (video) is a live syntax walkthrough in a regex tester.

### Named Capture

Often, you want to do more than just check whether a regex matches — you want to extract substrings from the match and do something with them in your code. Named capturing groups allow you to do this in a way that makes your regexes and code **more readable** and **self-documenting**.

The following example matches a record with two date fields and captures the values:

```js
const record = 'Admitted: 2024-01-01\nReleased: 2024-01-03';
const re = /^Admitted: (?<admitted>\d{4}-\d{2}-\d{2})\nReleased: (?<released>\d{4}-\d{2}-\d{2})$/;
const match = record.match(re);
console.log(match.groups);
/* → {
  admitted: '2024-01-01',
  released: '2024-01-03'
} */
```

Don’t worry — although this regex might be challenging to understand, later, we’ll look at a way to make it much more readable. The key things here are that named capturing groups use the syntax `(?<name>...)`, and their results are stored on the `groups` object of matches.

You can also use named backreferences to rematch whatever a named capturing group matched via `\k<name>`, and you can use the values within search and replace as follows:

```js
// Change 'FirstName LastName' to 'LastName, FirstName'
const name = 'Shaquille Oatmeal';
name.replace(/(?<first>\w+) (?<last>\w+)/, '$<last>, $<first>');
// → 'Oatmeal, Shaquille'
```

For advanced regexers who want to use named backreferences within a replacement callback function, the `groups` object is provided as the last argument. Here’s a fancy example:

```js
function fahrenheitToCelsius(str) {
  const re = /(?<degrees>-?\d+(.\d+)?)F\b/g;
  return str.replace(re, (...args) => {
    const groups = args.at(-1);
    return Math.round((groups.degrees - 32) * 5/9) + 'C';
  });
}
fahrenheitToCelsius('98.6F');
// → '37C'
fahrenheitToCelsius('May 9 high is 40F and low is 21F');
// → 'May 9 high is 4C and low is -6C'
```

### Lookbehind

Lookbehind (introduced in ES2018) is the complement to *lookahead*, which has always been supported by JavaScript regexes. Lookahead and lookbehind are *assertions* (similar to `^` for the start of a string or `\b` for word boundaries) that don’t consume any characters as part of the match. Lookbehinds succeed or fail based on whether their subpattern can be found immediately before the current match position.

For example, the following regex uses a lookbehind `(?<=...)` to match the word “cat” (*only* the word “cat”) if it’s preceded by “fat ”:

```js
const re = /(?<=fat )cat/g;
'cat, fat cat, brat cat'.replace(re, 'pigeon');
// → 'cat, fat pigeon, brat cat'
```

You can also use *negative* lookbehind — written as `(?<!...)` — to invert the assertion. That would make the regex match any instance of “cat” that’s *not* preceded by “fat ”.

```js
const re = /(?<!fat )cat/g;
'cat, fat cat, brat cat'.replace(re, 'pigeon');
// → 'pigeon, fat cat, brat pigeon'
```

JavaScript’s implementation of lookbehind is one of the very best (matched only by .NET). Whereas other regex flavors have inconsistent and complex rules for when and whether they allow variable-length patterns inside lookbehind, JavaScript allows you to look behind for any subpattern.

### The `matchAll` Method

JavaScript’s `String.prototype.matchAll` was added in ES2020 and makes it easier to operate on regex matches in a loop when you need extended match details. Although other solutions were possible before, `matchAll` is often easier, and it avoids gotchas, such as the need to guard against infinite loops when looping over the results of regexes that might return zero-length matches.

Since `matchAll` returns an iterator (rather than an array), it’s easy to use it in a `for...of` loop.

```js
const re = /(?<char1>\w)(?<char2>\w)/g;
for (const match of str.matchAll(re)) {
  const {char1, char2} = match.groups;
  // Print each complete match and matched subpatterns
  console.log(`Matched "${match[0]}" with "${char1}" and "${char2}"`);
}
```

::: note

`matchAll` requires its regexes to use flag `g` (`global`). Also, as with other iterators, you can get all of its results as an array using `Array.from` or array spreading.

:::

```js
const matches = [...str.matchAll(/./g)];
```

### Unicode Properties

Unicode properties (added in ES2018) give you powerful control over multilingual text, using the syntax `\p{...}` and its negated version `\P{...}`. There are hundreds of different properties you can match, which cover a wide variety of Unicode categories, scripts, script extensions, and binary properties.

::: note

For more details, check out the [<VPIcon icon="fa-brands fa-firefox"/>documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape).

:::

Unicode properties require using the flag `u` (`unicode`) or `v` (`unicodeSets`).

### Flag `v`

Flag `v` (`unicodeSets`) was added in ES2024 and is an upgrade to flag `u` — you can’t use both at the same time. It’s a best practice to always use one of these flags to avoid silently introducing bugs via the default Unicode-unaware mode. The decision on which to use is fairly straightforward. If you’re okay with only supporting environments with flag `v` (Node.js 20 and 2023-era browsers), then use flag `v`; otherwise, use flag `u`.

Flag `v` adds support for several new regex features, with the coolest probably being set subtraction and intersection. This allows using `A--B` (within character classes) to match strings in *A* but not in *B* or using `A&&B` to match strings in both *A* and *B*. For example:

```js
// Matches all Greek symbols except the letter 'π'
/[\p{Script_Extensions=Greek}--π]/v

// Matches only Greek letters
/[\p{Script_Extensions=Greek}&&\p{Letter}]/v
```

For more details about flag `v`, including its other new features, check out this [<VPIcon icon="fas fa-globe"/>explainer](https://v8.dev/features/regexp-v-flag) from the Google Chrome team.

#### A Word on Matching Emoji

Emoji are 🤩🔥😎👌, but how emoji get encoded in text is complicated. If you’re trying to match them with a regex, it’s important to be aware that **a single emoji can be composed of one or many individual Unicode code points**. Many people (and libraries!) who roll their own emoji regexes miss this point (or implement it poorly) and end up with bugs.

The following details for the emoji “👩🏻‍🏫” (*Woman Teacher: Light Skin Tone*) show just how complicated emoji can be:

```js
// Code unit length
'👩🏻‍🏫'.length;
// → 7
// Each astral code point (above \uFFFF) is divided into high and low surrogates

// Code point length
[...'👩🏻‍🏫'].length;
// → 4
// These four code points are: \u{1F469} \u{1F3FB} \u{200D} \u{1F3EB}
// \u{1F469} combined with \u{1F3FB} is '👩🏻'
// \u{200D} is a Zero-Width Joiner
// \u{1F3EB} is '🏫'

// Grapheme cluster length (user-perceived characters)
[...new Intl.Segmenter().segment('👩🏻‍🏫')].length;
// → 1
```

Fortunately, JavaScript added an easy way to match any individual, complete emoji via `\p{RGI_Emoji}`. Since this is a fancy “property of strings” that can match more than one code point at a time, it requires ES2024’s flag `v`.

If you want to match emojis in environments without `v` support, check out the excellent libraries [emoji-regex (<VPIcon icon="iconfont icon-github"/>`mathiasbynens/emoji-regex`)](https://github.com/mathiasbynens/emoji-regex) and [emoji-regex-xs (<VPIcon icon="iconfont icon-github"/>`slevithan/emoji-regex-xs`)](https://github.com/slevithan/emoji-regex-xs).

---

## Making Your Regexes More Readable, Maintainable, and Resilient

Despite the improvements to regex features over the years, native JavaScript regexes of sufficient complexity can still be outrageously hard to read and maintain.

::: info *From X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>garabatokid</code>)

> Regular Expressions are SO EASY!!!! https://pic.twitter.com/q4GSpbJRbZ

<SiteInfo
  name="X에서 Garabato Kid(@garabatokid) 님"
  desc="Regular Expressions are SO EASY!!!!"
  url="https://x.com/garabatokid/status/1147063121678389253/"
  logo="https://x.com/favicon.ico"
  preview="https://pbs.twimg.com/media/D-svlGFWsAErN5b.jpg:large"/>

:::

ES2018’s named capture was a great addition that made regexes more self-documenting, and ES6’s `String.raw` tag allows you to avoid escaping all your backslashes when using the `RegExp` constructor. But for the most part, that’s it in terms of readability.

However, there’s a lightweight and high-performance [JavaScript library (<VPIcon icon="iconfont icon-github"/>`slevithan/regex`)](https://github.com/slevithan/regex) named `regex` (by yours truly) that makes regexes dramatically more readable. It does this by adding key missing features from Perl-Compatible Regular Expressions (PCRE) and outputting native JavaScript regexes. You can also use it as a Babel plugin, which means that `regex` calls are transpiled at build time, so you get a better developer experience without users paying any runtime cost.

::: info

[<VPIcon icon="iconfont icon-github"/>`PCRE2Project/pcre2`](https://github.com/PCRE2Project/pcre2) is a popular C library used by PHP for its regex support, and it’s available in countless other programming languages and tools.

:::

Let’s briefly look at some of the ways the `regex` library, which provides a template tag named `regex`, can help you write complex regexes that are actually understandable and maintainable by mortals. Note that all of the new syntax described below works identically in PCRE.

### Insignificant Whitespace and Comments

By default, `regex` allows you to freely add whitespace and line comments (starting with `#`) to your regexes for readability.

```js
import {regex} from 'regex';
const date = regex`
  # Match a date in YYYY-MM-DD format
  (?<year>  \d{4}) - # Year part
  (?<month> \d{2}) - # Month part
  (?<day>   \d{2})   # Day part
`;
```

This is equivalent to using PCRE’s `xx` flag.

### Subroutines and Subroutine Definition Groups

Subroutines are written as `\g<name>` (where *name* refers to a named group), and they treat the referenced group as an independent subpattern that they try to match at the current position. This enables subpattern composition and reuse, which improves readability and maintainability.

For example, the following regex matches an IPv4 address such as “192.168.12.123”:

```js
import {regex} from 'regex';
const ipv4 = regex`\b
  (?<byte> 25[0-5] | 2[0-4]\d | 1\d\d | [1-9]?\d)
  # Match the remaining 3 dot-separated bytes
  (. \g<byte>){3}
\b`;
```

You can take this even further by defining subpatterns for use by reference only via subroutine definition groups. Here’s an example that improves the regex for admittance records that we saw earlier in this article:

```js
const record = 'Admitted: 2024-01-01\nReleased: 2024-01-03';
const re = regex`
  ^ Admitted:\ (?<admitted> \g<date>) \n
    Released:\ (?<released> \g<date>) $

  (?(DEFINE)
    (?<date>  \g<year>-\g<month>-\g<day>)
    (?<year>  \d{4})
    (?<month> \d{2})
    (?<day>   \d{2})
  )
`;
const match = record.match(re);
console.log(match.groups);
/* → {
  admitted: '2024-01-01',
  released: '2024-01-03'
} */
```

### A Modern Regex Baseline

`regex` includes the `v` flag by default, so you never forget to turn it on. And in environments without native `v`, it automatically switches to flag `u` while applying `v`’s escaping rules, so your regexes are forward and backward-compatible.

It also implicitly enables the emulated flags `x` (insignificant whitespace and comments) and `n` (“named capture only” mode) by default, so you don’t have to continually opt into their superior modes. And since it’s a raw string template tag, you don’t have to escape your backslashes `\\\` like with the `RegExp` constructor.

### Atomic Groups and Possessive Quantifiers Can Prevent Catastrophic Backtracking

Atomic groups and possessive quantifiers are another powerful set of features added by the `regex` library. Although they’re primarily about performance and resilience against catastrophic backtracking (also known as ReDoS or “regular expression denial of service,” a serious issue where certain regexes can take forever when searching particular, not-quite-matching strings), they can also help with readability by allowing you to write simpler patterns.

::: note

You can learn more in the `regex` [documentation (<VPIcon icon="iconfont icon-github"/>`slevithan/regex`)](https://github.com/slevithan/regex#atomic-groups).

:::

---

## What’s Next? Upcoming JavaScript Regex Improvements

There are a variety of active proposals for improving regexes in JavaScript. Below, we’ll look at the three that are well on their way to being included in future editions of the language.

### Duplicate Named Capturing Groups

This is a Stage 3 (nearly finalized) [proposal (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-duplicate-named-capturing-groups`)](https://github.com/tc39/proposal-duplicate-named-capturing-groups). Even better is that, as of recently, it works in all major browsers.

When named capturing was first introduced, it required that all `(?<name>...)` captures use unique names. However, there are cases when you have multiple alternate paths through a regex, and it would simplify your code to reuse the same group names in each alternative.

For example:

```js
/(?<year>\d{4})-\d\d|\d\d-(?<year>\d{4})/
```

This proposal enables exactly this, preventing a “duplicate capture group name” error with this example. Note that names must still be unique *within* each alternative path.

### Pattern Modifiers (aka Flag Groups)

This is another Stage 3 [<VPIcon icon="fa-brands fa-firefox"/>proposal (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-regexp-modifiers`)](https://github.com/tc39/proposal-regexp-modifiers). It’s already supported in Chrome/Edge 125 and Opera 111, and it’s coming [<VPIcon icon="fa-brands fa-firefox"/>soon](https://bugzilla.mozilla.org/show_bug.cgi?id=1899813) for Firefox. No word [<VPIcon icon="fa-brands fa-safari"/>yet](https://bugs.webkit.org/show_bug.cgi?id=275672) on Safari.

Pattern modifiers use `(?ims:...)`, `(?-ims:...)`, or `(?im-s:...)` to turn the flags `i`, `m`, and `s` on or off for only certain parts of a regex.

For example:

```js
/hello-(?i:world)/
// Matches 'hello-WORLD' but not 'HELLO-WORLD'
```

### Escape Regex Special Characters with `RegExp.escape`

This [proposal (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-regex-escaping`)](https://github.com/tc39/proposal-regex-escaping) recently reached Stage 3 and has been a long time coming. It isn’t yet supported in any major browsers. The proposal does what it says on the tin, providing the function `RegExp.escape(str)`, which returns the string with all regex special characters escaped so you can match them literally.

If you need this functionality today, the most widely-used package (with more than 500 million monthly npm downloads) is [<VPIcon icon="iconfont icon-github"/>`sindresorhus/escape-string-regexp`](https://github.com/sindresorhus/escape-string-regexp), an ultra-lightweight, single-purpose utility that does minimal escaping. That’s great for most cases, but if you need assurance that your escaped string can safely be used at any arbitrary position within a regex, `escape-string-regexp` recommends the `regex` library that we’ve already looked at in this article. The `regex` library uses interpolation to escape embedded strings in a [context-aware way (<VPIcon icon="iconfont icon-github"/>`slevithan/regex`)](https://github.com/slevithan/regex#interpolating-escaped-strings).

---

## Conclusion

So there you have it: the past, present, and future of JavaScript regular expressions.

If you want to journey even deeper into the lands of regex, check out [Awesome Regex (<VPIcon icon="iconfont icon-github"/>`slevithan/awesome-regex`)](https://github.com/slevithan/awesome-regex) for a list of the best regex testers, tutorials, libraries, and other resources. And for a fun regex crossword puzzle, try your hand at [<VPIcon icon="fas fa-globe"/>regexle](https://regexle.com/).

May your parsing be prosperous and your regexes be readable.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Regexes Got Good: The History And Future Of Regular Expressions In JavaScript",
  "desc": "Although JavaScript regexes used to be underpowered compared to other modern flavors, numerous improvements in recent years mean that’s no longer true. Steven Levithan evaluates the history and present state of regular expressions in JavaScript with tips to make your regexes more readable, maintainable, and resilient.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/history-future-regular-expressions-javascript.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
