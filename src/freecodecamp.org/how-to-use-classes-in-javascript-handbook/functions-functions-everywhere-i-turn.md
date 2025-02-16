---
lang: en-US
title: "Functions, Functions Everywhere I Turn"
description: "Article(s) > (1/12) How to Use Classes in JavaScript – A Handbook for Beginners"
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
      content: "Article(s) > (1/12) How to Use Classes in JavaScript – A Handbook for Beginners"
    - property: og:description
      content: "Functions, Functions Everywhere I Turn"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-classes-in-javascript-handbook/functions-functions-everywhere-i-turn.html
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
  "title": "How to Use Classes in JavaScript – A Handbook for Beginners",
  "desc": "Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was...",
  "link": "/freecodecamp.org/how-to-use-classes-in-javascript-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Classes in JavaScript – A Handbook for Beginners"
  desc="Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was..."
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-functions-functions-everywhere-i-turn"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>

If you started with JavaScript, chances are that you've become really comfortable with functions. They're like the building blocks of everything for you, right? Think about it: if I asked you to write a program to greet someone by name, you'd probably whip up something like this in a flash:

```js
function greetUser(userName) {
  alert("Hello, " + userName + "!");
}

greetUser("Alice"); // Like magic! It greets Alice.
```

Okay, let's level up a bit. Imagine that I asked you to write a program that figures out someone's birth year just by knowing their age. If they're 25, you'd want it to tell them '2000' (assuming the current year is 2025).

What would your first thought be? Probably something like, 'Function time!' Am I right? You'd think, 'I'll write a function; it'll take the age, and boom, it'll spit out the birth year.' See?

Function-first thinking. Totally natural in JavaScript. And here's how you might code it:

```js
function getBirthYear(age) {
  const currentYear = 2025; //  For this example, let's say it's 2025
  const birthYear = currentYear - age;
  return birthYear;
}
console.log(getBirthYear(25)); // Yep, it logs 2000!
```

<CodePen
  user="Spruce_khalifa"
  slug-hash="gbOYvvo"
  title="Birth Year Program Simple version"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Now, let's make it a bit more complex. What if we want to be a little smarter and make sure the age is actually a valid age? You know, not some crazy string or a negative number. Sticking with our function-loving brains, what's the natural next step? Another function, of course. We'd probably create a `validateAge` function:

```js
function validateAge(age) {
  if (typeof age !== "number" || age <= 0 || age > 120) {
    return "Invalid age";
  } else {
    return age; //  Age is good to go!
  }
}

console.log(validateAge(25)); //  Output: 25 (valid!)
console.log(validateAge("twenty")); //  Output: Invalid age (not a number)
console.log(validateAge(-5)); //  Output: Invalid age (negative)
```

<CodePen
  user="Spruce_khalifa"
  slug-hash="xbxKYjZ"
  title="Birth Year Program with Age Validation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

See how we're just piling up functions? `getBirthYear` does one thing, `validateAge` does another. They're separate little boxes of code.

Let's push this a little further. What if we also wanted to figure out someone's zodiac sign based on their birth year? Yep, you guessed it—the brain says, 'More functions.' Let's just write another `getZodiacSign` function:

```js
function getZodiacSign(birthYear) {
  //  Simplified zodiac for demonstration—not astrologically accurate! 😉
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];
  return signs[birthYear % 12]; // Simple modulo trick!
}
```

<CodePen
  user="Spruce_khalifa"
  slug-hash="RNwbQxg"
  title="Birth Year Program"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Are you noticing the pattern here? For every new thing we want to do we're just adding more *and* more separate functions*.* Things are starting to feel a *bit...* scattered, right? And we're not even done adding features.

Okay, now let's say we want to store even more information about a person—their name, country, profession, besides just age. How would we manage all this with our function-centric approach? Well, we might try to create a big 'Person' function that takes all this info:

```js
function Person(name, age, country, profession) {
  const personName = name;
  const personAge = age;
  const personCountry = country;
  const personProfession = profession;

  const validatedAge = validateAge(personAge);
  const birthYear = getBirthYear(validatedAge);
  const zodiacSign = getZodiacSign(birthYear);

  alert(
    `${personName}, you're ${personAge} years old, born in ${birthYear}, zodiac sign: ${zodiacSign}!`
  );
}
```

What if we then want to use the person's name in our other functions, like `getZodiacSign` or `getBirthYear`? We'd have to go back and manually add `name` as an argument to each of those functions. Imagine having to update every function whenever you add a new piece of person information.

```js
//  Suddenly, we need 'name' everywhere!

function getZodiacSign(birthYear, name) {
  alert("Zodiac sign for " + name + " is...");
  //... rest of zodiac logic...
}

function getBirthYear(age, name) {
  alert("Birth year for " + name + " is...");
  // ... rest of birth year logic...
}
```

In this tiny example, it's sort of manageable. But picture a huge project with tons of functions spread across files and folders, how you’d try to keep everything in sync and update functions whenever your `person` data changes. That sounds like a recipe for headaches, bugs, and a lot of frustration. It can become incredibly inefficient and, honestly, pretty error-prone.
