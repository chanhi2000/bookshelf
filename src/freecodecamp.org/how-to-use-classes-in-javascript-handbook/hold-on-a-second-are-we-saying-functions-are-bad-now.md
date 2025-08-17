---
lang: en-US
title: "Hold on a second. Are we saying functions are bad now?"
description: "Article(s) > (2/12) How to Use Classes in JavaScript - A Handbook for Beginners"
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
      content: "Article(s) > (2/12) How to Use Classes in JavaScript - A Handbook for Beginners"
    - property: og:description
      content: "Hold on a second. Are we saying functions are bad now?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-classes-in-javascript-handbook/hold-on-a-second-are-we-saying-functions-are-bad-now.html
date: 2025-02-18
isOriginal: false
author:
  - name: Spruce Emmanuel
    url : https://freecodecamp.org/news/author/Spruce/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Use Classes in JavaScript - A Handbook for Beginners",
  "desc": "Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was...",
  "link": "/freecodecamp.org/how-to-use-classes-in-javascript-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Classes in JavaScript - A Handbook for Beginners"
  desc="Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was..."
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-hold-on-a-second-are-we-saying-functions-are-bad-now"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>

Functions are amazing. Think of this function-focused approach as the 'classic JavaScript way' of doing things. If you started with JavaScript, this probably feels totally natural and comfortable—and that's great. Even super popular modern libraries like React are built using functions for components. Functions are incredibly powerful and flexible.

But, even in React, if you change some core data (like a 'prop' in React terms) in a main component, you might have to go digging through lots of other components to make sure everything still works smoothly. Functions are fantastic, but sometimes, for certain kinds of problems, there might be another way to organize our code. A way that, for some folks, feels more intuitive, especially if they come from other programming backgrounds.

Imagine asking a programmer whose first language was Java or C++ to build our `birth year` program. Their brain might light up, but they'd probably think something a bit different. Maybe something like this:

'We need a `Person(class)`. A `Person` has an `age(proterty)` and we need a way to `calculateBirthYear(action)` for a `Person`.'

Notice anything different? Functions aren't the first thing that jumps to their mind. It's more about `objects` and `things` having `properties` and `actions`. Mind-blowing, huh? Many programmers who started with languages like Java or C++ naturally think in this object-oriented (or OOP) style. And hey, maybe that's why you're reading this—maybe you're curious about exploring this object-thinking approach too, especially in JavaScript. Don't worry, I’m not asking you to suddenly switch to Java 😉.

So, about these classes in JavaScript. Get ready for a little JavaScript twist. Here's the thing: JavaScript technically doesn't have classes in the way languages like Java or C++ do. I know, it can be a bit of a head-scratcher. Instead of classical classes as found in languages like Java or C++, JavaScript is built on something called prototypes*.* It uses these flexible prototypes and objects to mimic how classes work in other languages. So, if you want to use classes in JavaScript effectively, the real key is to understand objects and prototypes first. That's where the magic is in JavaScript OOP.
