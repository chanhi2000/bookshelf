---
lang: en-US
title: "How to Manipulate Strings in JavaScript – With Code Examples"
description: "Article(s) > How to Manipulate Strings in JavaScript – With Code Examples"
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
      content: "Article(s) > How to Manipulate Strings in JavaScript – With Code Examples"
    - property: og:description
      content: "How to Manipulate Strings in JavaScript – With Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manipulate-strings-in-javascript.html
prev: /programming/js/articles/README.md
date: 2024-05-25
isOriginal: false
author:
  - name: Eric Hu
    url : https://freecodecamp.org/news/author/huericnan/
cover: https://freecodecamp.org/news/content/images/2024/05/js-string.png
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
  name="How to Manipulate Strings in JavaScript – With Code Examples"
  desc="String manipulation is a common task for programmers, whether it is extracting information from the string, converting letter cases, joining strings, or trimming extra white spaces. This tutorial covers various methods and techniques for manipulating..."
  url="https://freecodecamp.org/news/how-to-manipulate-strings-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/js-string.png"/>

String manipulation is a common task for programmers, whether it is extracting information from the string, converting letter cases, joining strings, or trimming extra white spaces.

This tutorial covers various methods and techniques for manipulating strings using JavaScript, offering you a comprehensive guide on how to work with strings in your JavaScript applications.

---

## How to Extract a Character from a String in JavaScript

Let's start by talking about how to extract a single character from a string. JavaScript offers three different methods for this purpose: `charAt()`, `at()`, and `charCodeAt()`.

### How to Use `charAt(index)`

The `charAt()` method accepts an index, and returns the character at that index.

```js
const str = "Hello World!";

console.log(str.charAt(0));
console.log(str.charAt(8));
console.log(str.charAt(16));
//
// H
// r
```

If the index is out of range, `charAt()` will return an empty string (`""`).

### How to Use `at(index)`

The `at()` method was added to JavaScript with ES2022, and it is very similar to `charAt()`. You pass it an index, and the method returns the character at that index.

```js
const str = "Hello World!";

console.log(str.at(0));
console.log(str.at(8));
console.log(str.at(16));
//
// sH
// r
// undefined
```

When the index is out of range, `at()` will return `undefined` instead of an empty string.

Another difference is that `at()` allows for negative indexing, meaning index `-1` returns the last character of the string, `-2` returns the second last character, and so on.

```js
const str = "Hello World!";

console.log(str.at(-1));
console.log(str.at(-2));
//
// !
// d
```

Before `at()`, the only way to do this was through the `length` property.

```js
const str = "Hello World!";

console.log(str.charAt(str.length - 1)); // The last character
console.log(str.charAt(str.length - 2)); // The second last character
//
// !
// d
```

### How to Use `charCodeAt(index)`

The `charCodeAt()` method returns the [<VPIcon icon="fa-brands fa-wikipedia-w"/>UTF-16](https://en.wikipedia.org/wiki/UTF-16) code of the character at the specified index.

```js
const str = "Hello World!";

console.log(str.charCodeAt(0));
console.log(str.charCodeAt(4));
//
// 72
// 111
```

---

## How to Extract a Substring in JavaScript

Besides extracting a single character, JavaScript also allows you to extract a substring using methods `substring()` and `slice()`.

### How to Use `substring(start, end)`

`substring()` extracts a substring based on the provided `start` (inclusive) and `end` (exclusive) indexes, and returns the substring as a new string.

```js
const str = "JavaScript";

console.log(str.substring(0, 4));
//
// Java
```

The `end` index can be left out, in which case the substring will be extracted from `start` to the end of the string.

```js
const str = "JavaScript";

console.log(str.substring(4));
//
// Script
```

### How to Use `slice(start, end)`

`slice()` is very similar to `substring()`. It also extracts a substring based on the provided `start` and `end` indexes, and returns the substring as a new string.

```js
const str = "JavaScript";

console.log(str.slice(0, 4));
//
// Java
```

The `end` index can also be omitted.

```js
const str = "JavaScript";

console.log(str.slice(4));
//
// Script
```

The difference is that `slice()` accepts negative indexes. For example, the following example extracts the substring from index `-10` to `-6`.

```js
const str = "JavaScript";

console.log(str.slice(-10, -6));
//
// Java
```

---

## How to Convert a String to Upper or Lower Case in JavaScript

The methods `toUpperCase()` and `toLowerCase()` convert the string to upper or lower case.

```js
const str = "JavaScript";

console.log(str.toUpperCase());
console.log(str.toLowerCase());
//
// JAVASCRIPT
// javascript
```

---

## How to Join Two Strings Together in JavaScript

The easiest way to join two strings together is using the `+` operator:

```js
const str1 = "Hello";
const str2 = "World!";

const str3 = str1 + " " + str2;

console.log(str3);
//
// Hello World!
```

Alternatively, you can use the `concat()` method:

```js
const str1 = "Hello";
const str2 = "World!";

const str3 = str1.concat(" ", str2);

console.log(str3);
//
// Hello World!
```

Or you can use [**template literals**](/freecodecamp.org/template-literals-in-javascript.md):

```js
const str1 = "Hello";
const str2 = "World!";

const str3 = `${str1} ${str2}`;

console.log(str3);
//
// Hello World!
```

---

## How to Trim Extra White Spaces from a String in JavaScript

When working with strings that came from external sources, such as parsed from a webpage or received from user input, a common problem you might encounter is the leading and trailing white spaces.

JavaScript offers three different methods that allow you to easily remove the extra white spaces and keep only the useful information.

The `trimStart()` method removes the leading white spaces, including spaces, tabs, and line breaks. The `trimEnd()` method removes trailing white spaces, and `trim()` removes white spaces from both ends.

```js
const str = "  \n\tHello World!\t\n  ";

console.log(str.trimStart());
console.log(str.trimEnd());
console.log(str.trim());
//
// Hello World!
// Hello World!
// Hello World!
```

---

## How to Add Padding to a String in JavaScript

The methods `padStart()` and `padEnd()` can be used to pad characters or substrings at the beginning or the end of the original string.

Both methods take two arguments, `length` and a substring. The substring will be repeated multiple times, until the resulting string reaches the target length.

```js
const str = "123";

console.log(str.padStart(5, "0"));
console.log(str.padEnd(5, "0"));
//
// 00123
// 12300
```

If the substring is causing the resulting string to exceed the target length, then only a part of that substring will be used.

```js
const str = "123";

console.log(str.padStart(8, "ok"));
//
// okoko123
```

Notice that the substring `"ok"` is repeated twice, but for the third time, it causes the resulting string to exceed the length limit, so only `"o"` is used for the final padding.

---

## How to Repeat a String in JavaScript

`repeat()` returns a new string, with the specified number of copies of the original string.

```js
const str = "123";

console.log(str.repeat(3));
//
// 123123123
```

---

## How to Split String into an Array in JavaScript

The `split()` method splits the string based on the given character, and returns the result in an array. This method is most useful when you need to extract information from a URL.

For example, this is how you can extract the slug of a blog post:

```js
const url = "http://www.example.com/blog/example-article";

let arr = url.split("/");
console.log(arr);

let slug = arr[4];
console.log(slug);
//
// [ 'http:', '', 'www.example.com', 'blog', 'example-article' ]
// example-article
```

---

## How to Search in a String in JavaScript

You can also search for a character or substring using JavaScript.

### How to Use `indexOf()` and `lastIndexOf()`

The `indexOf()` method returns the index of the **first** occurrence of the given character.

The `lastIndexOf()` methods returns the index of the **last** occurrence of the given character.

```js
const str = "Hello World";

console.log(str.indexOf("l"));
console.log(str.lastIndexOf("l"));
//
// 2
// 9
```

Both methods will return -1 if a match is not found.

```js
const str = "Hello World";

console.log(str.indexOf("x"));
console.log(str.lastIndexOf("x"));
//
// -1
// -1
```

### How to Use `includes()`

The `includes()` method tests if the string contains the given character or substring. It returns `true` if the substring is found, otherwise `false` will be returned.

```js
const str = "JavaScript";

console.log(str.includes("S"));
console.log(str.includes("Script"));
console.log(str.includes("script"));
//
// true
// true
// false
```

### How to Use `startsWith()` and `endsWith()`

As the names suggest, these two methods test if the given substring is found at the beginning or the end of the string.

```js
const str = "JavaScript";

console.log(str.startsWith("Java"));
console.log(str.endsWith("Java"));

console.log(str.startsWith("Script"));
console.log(str.endsWith("Script"));
//
// true
// false
// false
// true
```

---

## How to Search in a String using Regex in JavaScript

But what if you need something more powerful? For example, the `indexOf()` and `lastIndexOf()` methods only return the first and last occurrences of the substring, but what if you need to search for all of them?

Or what if, instead of a substring, you need to search for a pattern, such as a phone number or a price tag?

This can be achieved by combining the string methods with [<VPIcon icon="fas fa-globe"/>Regex](https://thedevspace.io/course/javascript-regular-expressions), which stands for regular expression. It is a programming tool that allows you to describe patterns in a string. Regex has a very cryptic syntax, but can be very useful sometimes.

### How to Use `search()`

The `search()` method works similarly to `indexOf()` we just discussed. It also returns the **first** occurrence of the matched substring or pattern, except that `search()` allows you to pass a regular expression.

The following example, `/(?<=\$)\d\d?\d?\d?/`, searches for a price tag in the string, which should start with a dollar sign (`$`), and be followed by 1 to 4 numeric digits.

```js
const str = "The laptop costs $1500. The tablet costs $1000.";

console.log(str.search("1500"));
console.log(str.search(/(?<=\$)\d\d?\d?\d?/));
console.log(str.search(/(?<=\$)\d\d?\d?\d?/g));
//
// 18
// 18
// 18
```

Notice that the global flag (`g`) has no effect on `search()`, and it still returns the first occurrence of the match.

### How to Use `match()` and `matchAll()`

Compared to `search()`, the `match()` method returns much more information that you can work with, such as the actual substring that matches the pattern, the index where the match is found, and more.

```js
const str = "The laptop costs $1500. The tablet costs $1000.";

console.log(str.match(/(?<=\$)\d\d?\d?\d?/));
console.log(str.match(/(?<=\$)\d\d?\d?\d?/g));
//
// [
//  '1500',
//  index: 18,
//  input: 'The laptop costs $1500. The tablet costs $1000.',
//  groups: undefined
// ]
// [ '1500', '1000' ]
```

By including a global flag, you can make `match()` return all matched substrings, instead of just the first one.

There is also a `matchAll()` method that forces you to use the global flag. Without it, the method will return a `TypeError`.

`matchAll()` will return an [<VPIcon icon="fas fa-globe"/>iterable object](https://thedevspace.io/course/javascript-objects#iterating-over-an-object), which you can iterate over using a `for of` loop.

```js
const str = "This laptop costs $1500. The tablet costs $1000.";

const prices = str.matchAll(/(?<=\$)\d\d\d\d/g);

for (let price of prices) {
  console.log(price);
}
//
// [
//   '1500',
//   index: 19,
//   input: 'This laptop costs $1500. The tablet costs $1000.',
//   groups: undefined
// ]
// [
//   '1000',
//   index: 43,
//   input: 'This laptop costs $1500. The tablet costs $1000.',
//   groups: undefined
// ]
```

---

## How to Replace a String Pattern in JavaScript

Lastly, the `replace()` method allows you to match for a pattern, and then replace the matched substrings with a new string. For example:

```js
const str = "JavaScript javaScript Javascript";

console.log(str.replace(/JAVASCRIPT/i, "javascript"));
console.log(str.replace(/JAVASCRIPT/gi, "javascript"));
//
// javascript javaScript Javascript
// javascript javascript javascript
```

By default, `replace()` only matches and replaces the first occurrence of the pattern, but with the global flag, you can replace all matched patterns.

---

## Conclusion

In this tutorial, we explored various methods you can use to work with strings in JavaScript. We also covered how to use regular expressions to match for string patterns.

As a brief summary, here are the methods we discussed in this tutorial:

- `charAt(index)`: Extracts the character at the specified index from a string.
- `at(index)`: Retrieves the character at the specified index, supports negative indexing.
- `charCodeAt(index)`: Returns the UTF-16 code of the character at the specified index.
- `substring(start, end)`: Extracts a part of the string between the start (inclusive) and end indexes (exclusive).
- `slice(start, end)`: Similar to `substring()`, extracts a part of the string between start (inclusive) and end indexes (exclusive), but supports negative indexing.
- `toUpperCase()`: Converts all letters in the string to uppercase.
- `toLowerCase()`: Converts all letters in the string to lowercase.
- `concat()`: Joins two or more strings together.
- `trimStart()`: Removes whitespace from the beginning of a string. Including spaces, tabs, and newlines.
- `trimEnd()`: Removes whitespace from the end of a string.
- `trim()`: Removes whitespace from both ends of a string.
- `padStart(length, substring)`: Pads the start of a string with another string (multiple times, if needed) until the resulting string reaches the given length.
- `padEnd(length, substring)`: Pads the end of the string with another string (multiple times, if needed) until the resulting string reaches the given length.
- `repeat(count)`: Returns a new string which contains the specified number of copies of the original string.
- `split(separator)`: Splits the string into an array of substrings, using the specified separator to determine where to make the split.
- `indexOf(searchValue)`: Returns the index of the first occurrence of the specified substring. Returns -1 if not found.
- `lastIndexOf(searchValue)`: Returns the index of the last occurrence of the specified substring. Returns -1 if not found.
- `includes(searchValue)`: Determines whether the string contains the specified substring, returning `true` or `false`.
- `startsWith(searchValue)`: Checks if the string begins with the specified substring.
- `endsWith(searchValue)`: Checks if the string ends with the specified substring.
- `search(regexp)`: Search for a string pattern, which could be defined by a Regex. Returns the index of the first occurrence of the match or -1 if not found.
- `match(regexp)`: Search for a string pattern, which is defined by a Regex. If a global flag is included, it will return all occurrences of the pattern.
- `matchAll(regexp)`: Returns an iterable object containing all results matching a string against a global regular expression.
- `replace(regexp, newSubstr)`: Replaces occurrences of a pattern (specified by a regular expression) with a new substring.

If you want to learn more about JavaScript and web development, check out my new course at [<VPIcon icon="fas fa-globe"/>TheDevSpace.io](https://thedevspace.io/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Manipulate Strings in JavaScript – With Code Examples",
  "desc": "String manipulation is a common task for programmers, whether it is extracting information from the string, converting letter cases, joining strings, or trimming extra white spaces. This tutorial covers various methods and techniques for manipulating...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manipulate-strings-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
