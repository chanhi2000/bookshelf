---
lang: en-US
title: "How to check for null, undefined, or empty values in JavaScript"
description: "Article(s) > How to check for null, undefined, or empty values in JavaScript"
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
      content: "Article(s) > How to check for null, undefined, or empty values in JavaScript"
    - property: og:description
      content: "How to check for null, undefined, or empty values in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-null-empty-function.html
prev: /programming/js/articles/README.md
date: 2025-02-14
isOriginal: false
author:
  - name: Lewis Cianci
    url : https://blog.logrocket.com/author/lewiscianci/
cover: /assets/image/blog.logrocket.com/javascript-null-empty-function/banner.png
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
  name="How to check for null, undefined, or empty values in JavaScript"
  desc="Learn how to write a null check function in JavaScript and explore the differences between the null and undefined attributes."
  url="https://blog.logrocket.com/javascript-null-empty-function"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/javascript-null-empty-function/banner.png"/>

As someone with a toddler, it’s surprising just how many things in our life are a “learned skill”.

![javascript is null or empty function](/assets/image/blog.logrocket.com/javascript-null-empty-function/banner.png)

Even things we take for granted, like eating. You or I could suck down any variety of foods without a second thought, while parents stare nervously at their firstborn eating a banana, ready to whack their back at the first sign of difficulty.

Checking for `null` can be nerve-wracking for both new and seasoned JavaScript developers. It’s something that should be very simple, but still bites a surprising amount of people.

The basic reason for this is that in most languages, we only have to cater to `null`. But in JavaScript, we have to cater to both `null` and `undefined`. How do we do that?

---

## How to write a `null` check function in JavaScript

We can call this the “I don’t care about the story, I just want to know how to do it” section.

These days whenever you Google a recipe for toast, you get a 5,000-word essay before the writer tells you to put the bread in the oven. Let’s not be like that. Checking for `null` [**in JavaScript**](/blog.logrocket.com/six-things-you-may-not-know-about-javascript.md) can be achieved like so.

Let’s imagine our test data object like this:

```js
var testObject = {
    empty: '',
    isNull: null,
    isUndefined: undefined,
    zero: 0
}
```

Our `null` check function looks like this, where we just simply check for `null`:

```js
function isNull(value){
    if (value == null) { return true } else { return false }
}
```

To test this function, let’s put some values into it and see how it goes:

```js
console.log(`
testObject.empty: ${isNull(testObject.empty)}
testObject.isNull: ${isNull(testObject.isNull)}
testObject.isUndefined: ${isNull(testObject.isUndefined)}
zero: ${isNull(testObject.zero)}    
`)
```

The output is what we would expect, and similar to what other languages would provide:

```sh
node .\index.js
# 
# testObject.empty: false
# testObject.isNull: true
# testObject.isUndefined: true
# zero: false    
```

If objects are `null` or `undefined`, then this function would return true.

### Checking for `null`, `undefined`, or an empty string

What if we want to check if a variable is `null`, or if it’s simply empty? We can check for this by doing the following:

```js
function isNullOrEmpty(value) {
    return !value;
}
```

This depends on the object’s “truthiness”. “Truthy” values like “words” or numbers greater than zero would return true, whereas empty strings would return false.

We have to be a little careful about this application. Let’s consider form entry. For instance, if there was an empty string in the form, then it would be acceptable to say that the field isn’t filled out.

However, if the user gave a single ’0’ in the form, then 0 would also evaluate to `false`. In the case of form validation, this wouldn’t work the way we would expect. Empty arrays would also evaluate to `false`, so the result of an array not existing, and an array existing and not having any values in it, would essentially be the same. This is probably not what you want.

Ah boy this is getting complex. Why is it though? Let’s dig in a bit.

---

## Exploring the complexities of `null` and `undefined` in JavaScript

There are probably hundreds, if not thousands, of posts and [<FontIcon icon="fa-brands fa-stack-overflow"/>StackOverflow entries](https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in) on this topic. It’s simple – the behavior of `null` and `undefined` is a bit wily to developers, both new and old. If we get it wrong, websites break, or our node apps stop working. So we really want to dial it in and make sure it works the way we expect.

Add into the mix that JavaScript has been around [<FontIcon icon="fas fa-globe"/>since 1995](https://cybercultural.com/p/1995-the-birth-of-javascript/). This also presents problems. JavaScript is used on almost every webpage today, so core features simply cannot be rewritten or reimplemented. If, overnight, a change was made to how `null` or `undefined` was handled in browsers and frameworks like Node.js, the carnage would be huge. It would dwarf the [<FontIcon icon="fas fa-globe"/>Crowdstrike outage](https://blog.logrocket.com/product-management/product-recall-liability-claims/), for instance.

The reason for this is that most languages only use `null`, and `undefined` is something that only is used in JavaScript. While `null` is appropriate to represent the absence of a value, typically instead of returning `undefined` in other languages, those languages would throw an exception.

For example, in C#, if we wrote the following:

```cs
string testString;
Console.WriteLine(testString);
```

Our code would throw with “Use of unassigned local variable `testString`”. The compiler is performing some analysis and telling us that we can’t use a variable that hasn’t been assigned. In other words, it’s undefined.

In C# (and a *lot* of other languages) we never run the risk of possibly using things that are undefined, because something throws an error before we’re in that situation. Even if you were to do things in other languages that would throw, such as access an entry in an array that is out of bounds, C# would throw, whereas JavaScript would simply return `undefined`.

Consider:

```js
let array = [];
console.log(array[5])
```

We’ve got an empty array, and then we try to print out the fifth element from the array. This is out of bounds. The result of this code is `undefined`.

---

## Differentiating between assigned, `null`, and `undefined`

Basically, there are three conditions that we want to account for when checking for values that we think could be `null` or `undefined`. To help visualize this, let’s imagine that we have a blue box that is our variable, and the things that we place in this box represent the things we assign to the variable:

![example illustrating javascript is null or empty function](/assets/image/blog.logrocket.com/javascript-null-empty-function/1_blue-box-example.png)

There are three states that our box can be in:

**The value is assigned.** Regardless of what that value is, we know that a value has been assigned to an object because it is not `null` or `undefined`. Because of this, there is an object present in the box/the variable:

![example of value is assigned](/assets/image/blog.logrocket.com/javascript-null-empty-function/updated_2_value-is-assigned.webp)

**The value is `null`.** The box is still there, but it has nothing in it:

![example of value being null](/assets/image/blog.logrocket.com/javascript-null-empty-function/3_value-is-null.png)

**The value is `undefined`.** The box does not exist.

![example of value undefined](/assets/image/blog.logrocket.com/javascript-null-empty-function/4_value-is-undefined.png)

---

## Conclusion

Most of the time, checking that an item is `null` will be enough. But because we have both `undefined` and `null` to cater to, and both can mean different things, whenever we perform a check for `null`, we need to think about *exactly* what kind of check we are trying to perform and act accordingly.

Because `null` is a “falsey” value, it can be tempting to write code like `if (!value)` to do something if a variable is `null`. But, as we’ve seen, that can also permit empty strings and empty arrays to slip through that check.

Understanding these key differences can help us to write [**high–quality code**](https://blog.logrocket.com/12-tips-for-writing-clean-and-scalable-javascript-3ffe30abfe20/) that doesn’t behave in unexpected ways. And that’s what we should always aim to do, even if it takes a bit longer.
<!-- TODO /blog.logrocket.com/12-tips-for-writing-clean-and-scalable-javascript.md -->

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to check for null, undefined, or empty values in JavaScript",
  "desc": "Learn how to write a null check function in JavaScript and explore the differences between the null and undefined attributes.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-null-empty-function.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
