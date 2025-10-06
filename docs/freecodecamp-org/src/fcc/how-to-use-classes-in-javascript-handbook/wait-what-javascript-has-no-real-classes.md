---
lang: en-US
title: "Wait, what? JavaScript has no real classes?"
description: "Article(s) > (3/12) How to Use Classes in JavaScript - A Handbook for Beginners"
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
      content: "Article(s) > (3/12) How to Use Classes in JavaScript - A Handbook for Beginners"
    - property: og:description
      content: "Wait, what? JavaScript has no real classes?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-classes-in-javascript-handbook/wait-what-javascript-has-no-real-classes.html
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
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-wait-what-javascript-has-no-real-classes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>



---

## Wait, what? JavaScript has no real classes?

Does that mean we are stuck with just functions forever? Nope. Even though JavaScript does things its own way with prototypes (instead of classic classes), it still fully supports 'Object-Oriented Programming' (OOP).

Let's break down OOP in plain English. Two big ideas in OOP are **Encapsulation** and **Inheritance**. Sounds fancy, right? But they're actually pretty simple concepts.

Encapsulation? Imagine a capsule, like for medicine. You're just bundling things that belong together. In OOP, encapsulation means grouping data (like age, name) and the actions you can do with that data (like calculate birth year, greet) inside a single 'object'. JavaScript objects are perfect for this.

And inheritance? Think of it like inheriting traits from your family. In JavaScript OOP, objects can 'inherit' properties and behaviors from other objects. JavaScript calls this prototypal inheritance, and the object you inherit from is called the prototype (we'll dive deeper into prototype soon).

See? No function jail here. JavaScript is totally ready for OOP. To see this in action, let's rewrite our birth year program, but this time using this OOP style in JavaScript.

Check this out. Here's how we could rewrite our birth year program using an OOP style in JavaScript, using just a good old JavaScript object:

```js :collapsed-lines
const Person = {
  //  --- Properties (Data) ---
  name: "Spruce",
  age: 25,
  country: "Nigeria",
  profession: "Engineer",

  //  --- Methods (Actions related to Person data) ---
  isValidAge: function () {
    return typeof this.age === "number" && this.age > 0;
  },

  getBirthYear: function () {
    if (!this.isValidAge()) {
      return "Invalid age!";
    }
    return new Date().getFullYear() - this.age;
  },

  getZodiacSign: function () {
    if (!this.isValidAge()) {
      return "Oops, can't get zodiac for an invalid age!";
    }

    const birthYear = this.getBirthYear();
    const zodiacSigns = [
      "Capricorn",
      "Aquarius",
      "Pisces",
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
    ];
    return zodiacSigns[birthYear % 12];
  },

  greet: function () {
    return (
      `Hello, I'm ${this.name}. I'm ${
        this.age
      } years old, born in ${this.getBirthYear()}, ` +
      `working as a ${this.profession} from ${
        this.country
      }.  My zodiac sign is ${this.getZodiacSign()}.`
    );
  },
};

//  --- Let's use our Person object! ---
console.log(Person.greet());
```

```plaintext title="Output (might vary slightly depending on year)"
Hello, I'm Spruce. I'm 25 years old, born in 2000, working as a Engineer from Nigeria.  My zodiac sign is Pig.
```

<CodePen
  user="Spruce_khalifa"
  slug-hash="mydbXKq"
  title="Meet Person Program"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

See how neat that is? Everything about a `Person`, their details (name, age, and so on) and what you can do with a person (validate age, get birth year, greet) is all bundled together, and nicely organized inside this single `Person` object. That's encapsulation in action. Pretty cool, right?

Now, want to know the `Person` name? Super easy:

```js
console.log(Person.name); 
//
// "Spruce"
```

Birth year? Piece of cake:

```js
console.log(Person.getBirthYear()); 
//
// 2000
```

And here's the real magic of encapsulation: if we change something inside the `Person` object (like, say, we decide to change the age), all the methods (actions) inside automatically adapt. We don't have to go hunting around in separate functions to update things. Let me show you:

```js
//  Age is 25 initially...
console.log("Birth year when age is 25:", Person.getBirthYear()); 
//
// 2000

// Let's update the age directly in the Person object...
Person.age = 30;

// Now, getBirthYear automatically uses the *new* age!
console.log("Birth year when age is 30:", Person.getBirthYear()); 
//
// 1995
```

So, JavaScript uses objects—and, as we'll see, prototypes—to bring OOP to life, even if it doesn't have classic classes. Hopefully, you're starting to see the appeal of organizing code this way. Before we jump into classes, it makes a ton of sense to get a really solid understanding of objects and prototypes in JavaScript, right? That's what we'll dive into next.
