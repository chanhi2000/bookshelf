---
lang: en-US
title: "A Guide To The Reduce Method In Javascript "
description: "Article(s) > A Guide To The Reduce Method In Javascript "
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
      content: "Article(s) > A Guide To The Reduce Method In Javascript "
    - property: og:description
      content: "A Guide To The Reduce Method In Javascript "
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/reduce-f47a7da511a9.html
prev: /programming/js/articles/README.md
date: 2017-02-11
isOriginal: false
author: Josh Pitzalis
cover: https://cdn-media-1.freecodecamp.org/images/1*7Lt21vtHVtY6j0oBWNDd4w.png
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
  name="A Guide To The Reduce Method In Javascript "
  desc="By Josh Pitzalis JavaScript’s reduce method is one of the cornerstones of functional programming. Let’s explore how it works, when you should use it, and some of the cool things it can do. A Basic Reduction Use it when: You have an array of amounts a..."
  url="https://freecodecamp.org/news/reduce-f47a7da511a9"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-1.freecodecamp.org/images/1*7Lt21vtHVtY6j0oBWNDd4w.png"/>

JavaScript’s **reduce method** is one of the cornerstones of functional programming. Let’s explore how it works, when you should use it, and some of the cool things it can do.

---

## A Basic Reduction

::: important Use it when

You have an array of amounts and you want to add them all up.

```js
const euros = [29.76, 41.85, 46.5];

const sum = euros.reduce((total, amount) => total + amount); 

sum // 118.11
```

:::

How to use it:

- In this example, Reduce accepts two parameters, the total and the current amount.
- The reduce method cycles through each number in the array much like it would in a for-loop.
- When the loop starts the total value is the number on the far left (29.76) and the current amount is the one next to it (41.85).
- In this particular example, we want to add the current amount to the total.
- The calculation is repeated for each amount in the array, but each time the current value changes to the next number in the array, moving right.
- When there are no more numbers left in the array the method returns the total value.

---

## The ES5 version of the Reduce Method In JavaScript 

If you have never used ES6 syntax before, don’t let the example above intimidate you. It’s exactly the same as writing:

```js
var euros = [29.76, 41.85, 46.5]; 

var sum = euros.reduce( function(total, amount){
  return total + amount
});

sum // 118.11
```

We use `const` instead of `var` and we replace the word `function` with a “fat arrow” (`=>`) after the parameters, and we omit the word ‘return’.

I’ll use ES6 syntax for the rest of the examples, since it’s more concise and leaves less room for errors.

---

## Finding an Average with the Reduce Method In JavaScript 

Instead of logging the sum, you could divide the sum by the length of the array before you return a final value.

The way to do this is by taking advantage of the other arguments in the reduce method. The first of those arguments is the *index*. Much like a for-loop, the index refers to the number of times the reducer has looped over the array. The last argument is the *array* itself.

```js
const euros = [29.76, 41.85, 46.5];

const average = euros.reduce((total, amount, index, array) => {
  total += amount;
  if( index === array.length-1) { 
    return total/array.length;
  }else { 
    return total;
  }
});

average // 39.37
```

---

## Map and Filter as Reductions

If you can use the reduce function to spit out an average then you can use it any way you want.

For example, you could double the total, or half each number before adding them together, or use an if statement inside the reducer to only add numbers that are greater than 10. My point is that the *Reduce Method In JavaScript * gives you a mini CodePen where you can write whatever logic you want. *It* will repeat the logic for each amount in the array and then return a single value.

The thing is, you don’t always have to return a single value. You can reduce an array into a new array.

For instance, lets reduce an array of amounts into another array where every amount is doubled. To do this we need to set the initial value for our accumulator to an empty array.

The initial value is the value of the total parameter when the reduction starts. You set the initial value by adding a comma followed by your initial value inside the parentheses but after the curly braces (**bolded in the example below**).

```js
const average = euros.reduce((total, amount, index, array) => {
  total += amount
  return total/array.length
}, 0);
```

In previous examples, the initial value was zero so I omitted it. By omitting the initial value, the *total* will default to the first amount in the array.

By setting the initial value to an empty array we can then push each *amount* into the *total*. If we want to reduce an array of values into another array where every value is doubled, we need to push the *amount* \* 2. Then we return the total when there are no more amounts to push.

```js
const euros = [29.76, 41.85, 46.5];

const doubled = euros.reduce((total, amount) => {
  total.push(amount * 2);
  return total;
}, []);

doubled // [59.52, 83.7, 93]
```

We’ve created a new array where every amount is doubled. We could also filter out numbers we don’t want to double by adding an if statement inside our reducer.

```js
const euro = [29.76, 41.85, 46.5];

const above30 = euro.reduce((total, amount) => {
  if (amount > 30) {
    total.push(amount);
  }
  return total;
}, []);

above30 // [ 41.85, 46.5 ]
```

These operations are the *map* and *filter* methods rewritten as a reduce method.

For these examples, it would make more sense to use map or filter because they are simpler to use. The benefit of using reduce comes into play when you want to map and filter together and you have a lot of data to go over.

If you chain map and filter together you are doing the work twice. You filter every single value and then you map the remaining values. With reduce you can filter and then map in a single pass.

Use map and filter but when you start chaining lots of methods together you now know that it is faster to reduce the data instead.

---

## Creating a Tally with the Reduce Method In JavaScript 

::: important Use it when

You have a collection of items and you want to know how many of each item are in the collection.

```js
const fruitBasket = ['banana', 'cherry', 'orange', 'apple', 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];

const count = fruitBasket.reduce( (tally, fruit) => {
  tally[fruit] = (tally[fruit] || 0) + 1 ;
  return tally;
} , {})

count // { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }
```

:::

To tally items in an array our initial value must be an empty object, not an empty array like it was in the last example.

Since we are going to be returning an object we can now store key-value pairs in the total.

```js
fruitBasket.reduce( (tally, fruit) => {
  tally[fruit] = 1;
  return tally;
}, {})
```

On our first pass, we want the name of the first key to be our current value and we want to give it a value of 1. This gives us an object with all the fruit as keys, each with a value of 1. We want the amount of each fruit to increase if they repeat.

To do this, on our second loop we check if our total contain a key with the current fruit of the reducer. If it doesn’t then we create it. If it does then we increment the amount by one.

```js
fruitBasket.reduce((tally, fruit) => {
  if (!tally[fruit]) {
    tally[fruit] = 1;
  } else {
    tally[fruit] = tally[fruit] + 1;
  }
  return tally;
}, {});
```

I rewrote the exact same logic in a more concise way up top.

---

## Flattening an array of arrays with the Reduce Method In JavaScript  

We can use reduce to flatten nested amounts into a single array.

We set the initial value to an empty array and then concatenate the current value to the total.

```js
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const flat = data.reduce((total, amount) => {
  return total.concat(amount);
}, []);

flat // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

More often than not, information is nested in more complicated ways. For instance, lets say we just want all the colors in the data variable below.

```js
const data = [
  {a: 'happy', b: 'robin', c: ['blue','green']}, 
  {a: 'tired', b: 'panther', c: ['green','black','orange','blue']}, 
  {a: 'sad', b: 'goldfish', c: ['green','red']}
];
```

We’re going to step through each object and pull out the colours. We do this by pointing amount.c for each object in the array. We then use a forEach loop to push every value in the nested array into out total.

```js
const colors = data.reduce((total, amount) => {
  amount.c.forEach( color => {
      total.push(color);
  })
  return total;
}, [])

colors //['blue','green','green','black','orange','blue','green','red']
```

If we only need unique number then we can check to see of the number already exists in *total* before we push it.

```js
const uniqueColors = data.reduce((total, amount) => {
  amount.c.forEach( color => {
    if (total.indexOf(color) === -1){
     total.push(color);
    }
  });
  return total;
}, []);

uniqueColors // [ 'blue', 'red', 'green', 'black', 'orange']
```

---

## Piping with Reduce

An interesting aspect of the reduce method in JavaScript is that you can reduce over functions as well as numbers and strings.

Let’s say we have a collection of simple mathematical functions. these functions allow us to increment, decrement, double and halve an amount.

```js
function increment(input) { return input + 1;}

function decrement(input) { return input — 1; }

function double(input) { return input * 2; }

function halve(input) { return input / 2; }
```

For whatever reason, we need to increment, then double, then decrement an amount.

You could write a function that takes an input, and returns (input + 1) \* 2 -1. The problem is that we know we are going to need to increment the amount three times, then double it, then decrement it, and then halve it at some point in the future. We don’t want to have to rewrite our function every time so we going to use reduce to create a pipeline.

A pipeline is a term used for a list of functions that transform some initial value into a final value. Our pipeline will consist of our three functions in the order that we want to use them.

```js
let pipeline = [increment, double, decrement];
```

Instead of reducing an array of values we reduce over our pipeline of functions. This works because we set the initial value as the amount we want to transform.

```js
const result = pipeline.reduce(function(total, func) {
  return func(total);
}, 1);

result // 3
```

Because the pipeline is an array, it can be easily modified. If we want to decrement something three times, then double it, decrement it , and halve it then we just alter the pipeline.

```js
var pipeline = [

  increment,

  increment,

  increment,

  double,

  decrement,

  halve

];
```

The reduce function stays exactly the same.

---

## Silly Mistakes to avoid

If you don’t pass in an initial value, reduce will assume the first item in your array is your initial value. This worked fine in the first few examples because we were adding up a list of numbers.

If you’re trying to tally up fruit, and you leave out the initial value then things get weird. Not entering an initial value is an easy mistake to make and one of the first things you should check when debugging.

Another common mistake is to forget to return the total. You must return something for the reduce function to work. Always double check and make sure that you’re actually returning the value you want.

### Tools, Tips & References

- Everything in this post came from a fantastic video series on egghead called [Introducing Reduce](https://egghead.io/courses/reduce-data-with-javascript). I give [Mykola Bilokonsky (<FontIcon icon="fa-brands fa-x-twitter"/>`mykola`)](https://x.com/mykola) full credit and I am grateful to him for everything I now know about using the Reduce Method In JavaScript . I have tried to rewrite much of what he explains in my own words as an exercise to better understand each concept. Also, it’s easier for me to reference an article, as opposed to a video, when I need to remember how to do something.
- The [<FontIcon icon="fa-brands fa-firefox"/>MDN Reduce documentation](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) labels what I called a *total* the `accumulator`. It is important to know this because most people will refer to it as an accumulator if you read about it online. Some people call it `prev` as in *previous value*. It all refers to the same thing. I found it easier to think of a *total* when I was learning reduce.
- If you would like to practice using reduce I recommend signing up to [<FontIcon icon="fa-brands fa-free-code-camp"/>freeCodeCamp](https://freecodecamp.com/) and completing as many of the [<FontIcon icon="fa-brands fa-free-code-camp"/>intermediate algorithms](https://freecodecamp.com/map-aside#nested-collapseIntermediateAlgorithmScripting) as you can using reduce.
- If the ‘const’ variables in the example snippets are new to you I wrote another article about [ES6 variables and why you might want to use them (<FontIcon icon="fa-brands fa-medium"/>`joshpitzalis`)](https://medium.com/@joshpitzalis/es6-variables-and-why-you-might-want-to-use-them-fbc84ce27262#.981ejmn1f).
- I also wrote an article called [The Trouble With Loops (<FontIcon icon="fa-brands fa-medium"/>`joshpitzalis`)](https://medium.com/@joshpitzalis/the-trouble-with-loops-f639e3cc52d9#.8xkmhn7z6) that explain how to use map() and filter() if the are new to you.

Thanks for reading! If you’d like to be notified when I write a new article please [enter your email](https://tinyletter.com/joshpitzalis) here.

And if you liked the article, please share it on social media so others can find it.

<!-- START: ARTICLE CARD -->
```component VPCard
{
  "title": "A Guide To The Reduce Method In Javascript ",
  "desc": "By Josh Pitzalis JavaScript’s reduce method is one of the cornerstones of functional programming. Let’s explore how it works, when you should use it, and some of the cool things it can do. A Basic Reduction Use it when: You have an array of amounts a...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/reduce-f47a7da511a9.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
