---
lang: en-US
title: "Top JavaScript Concepts to Know Before Learning React"
description: "Article(s) > Top JavaScript Concepts to Know Before Learning React"
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
      content: "Article(s) > Top JavaScript Concepts to Know Before Learning React"
    - property: og:description
      content: "Top JavaScript Concepts to Know Before Learning React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/top-javascript-concepts-to-know-before-learning-react.html
prev: /programming/js/articles/README.md
date: 2022-01-28
isOriginal: false
author: Joel Olawanle
cover: https://freecodecamp.org/news/content/images/2022/01/Yellow-and-Purple-Geometric-Covid-19-General-Facts-Twitter-Post-3.jpg
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
  name="Top JavaScript Concepts to Know Before Learning React"
  desc="By Joel Olawanle If you want to learn React - or any JavaScript framework - you'll first need to understand the fundamental JavaScript methods and concepts. Otherwise it's like a youngster learning to run before learning to walk.  Many developers cho..."
  url="https://freecodecamp.org/news/top-javascript-concepts-to-know-before-learning-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/01/Yellow-and-Purple-Geometric-Covid-19-General-Facts-Twitter-Post-3.jpg"/>

If you want to learn React - or any JavaScript framework - you'll first need to understand the fundamental JavaScript methods and concepts.

Otherwise it's like a youngster learning to run before learning to walk.

Many developers choose a "learn as you go" approach when learning React. But this often doesn't result in productivity, and instead worsens the gaps in their JavaScript knowledge. This approach makes assimilating each new feature twice as difficult (you might begin to confuse JavaScript with React).

React is a JavaScript framework for building UI components-based user interfaces. All of its code is written in JavaScript, including the HTML markup, which is written in JSX (this enables developers to easily write HTML and JavaScript together).

In this post, we'll take a practical approach and go over all of the JS ideas and techniques you'll need to grasp before learning React.

React is built using modern JavaScript features, which were mostly introduced with ES2015. So that's essentially what we will discuss in this post. To help you deepen your learning, I will connect distinct links to each method and concept.

*Let’s get started…*

---

## Callback Functions in JavaScript

A callback function is a function that is performed after another function has completed its execution. It is typically supplied as an input into another function.

Callbacks are critical to understand since they are used in array methods (such as `map()`, `filter()`, and so on), `setTimeout()`, event listeners (such as click, scroll, and so on), and many other places.

Here's an example of a "click" event listener with a callback function that will be run whenever the button is clicked:

```js
//HTML
<button class="btn">Click Me</button>

//JavaScript
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  let name = 'John doe';
  console.log(name.toUpperCase())
})
```

::: note NB

A callback function can be either an ordinary function or an arrow function.

:::

---

## Promises in JavaScript

As previously stated, a callback function is executed after the original function is executed. You may now begin to consider stacking so many callback functions on top of each other because you do not want a specific function to run until the parent function has finished running or a specific time has passed.

For example, let's attempt to display 5 names in the console after 2 seconds each - that is, the first name appears after 2 seconds, the second after 4 seconds, and so on...

```js
setTimeout(() => {
  console.log("Joel");
  setTimeout(() => {
    console.log("Victoria");
    setTimeout(() => {
      console.log("John");
      setTimeout(() => {
        console.log("Doe");
        setTimeout(() => {
          console.log("Sarah");
        }, 2000);
      }, 2000);
    }, 2000);
  }, 2000);
}, 2000);
```

This above example will work, but it will be difficult to comprehend, debug, or even add error handling to. This is referred to as **"Callback Hell"**. Callback hell is a big issue caused by coding with complex nested callbacks.

The primary reason for using promises is to prevent callback hell. With Promises, we may write asynchronous code in a synchronous manner.

::: note Gotcha

You can learn what synchronous and asynchronous means in JavaScript via [this article](/freecodecamp.org/synchronous-vs-asynchronous-in-javascript.md) by [TAPAS ADHIKARY](https://freecodecamp.org/news/author/tapas/).

```component VPCard
{
  "title": "Synchronous vs Asynchronous JavaScript - Call Stack, Promises, and More",
  "desc": "Let me start this article by asking, ”What is JavaScript”? Well, here's the most confusing yet to-the-point answer I have found so far: JavaScript is a single-threaded, non-blocking, asynchronous, concurrent programming language with lots of flexibi...",
  "link": "/freecodecamp.org/synchronous-vs-asynchronous-in-javascript.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

:::

A promise is an object that returns a value that you anticipate to see in the future but do not now see.

A practical use for promises would be in HTTP requests, where you submit a request and do not receive a response right away because it's an asynchronous activity. You only receive the answer (data or error) when the server responds.

JavaScript promise syntax:

```js
const myPromise = new Promise((resolve, reject) => {  
    // condition
});
```

Promises have two parameters, one for success (resolve) and one for failure (reject). Each has a condition that must be satisfied in order for the Promise to be resolved - otherwise, it will be rejected:

```js
const promise = new Promise((resolve, reject) => {  
    let condition;

    if(condition is met) {    
        resolve('Promise is resolved successfully.');  
    } else {    
        reject('Promise is rejected');  
    }
});
```

There are 3 states of the Promise object:

- **Pending:** by default, this is the Initial State, before the Promise succeeds or fails.
- **Resolved:** Completed Promise
- **Rejected:** Failed Promise

Finally, let's try to re-implement the callback hell as a promise:

```js
function addName (time, name){
  return new Promise ((resolve, reject) => {
    if(name){
      setTimeout(()=>{
        console.log(name)
        resolve();
      },time)
    }else{
      reject('No such name');
    }
  })
}

addName(2000, 'Joel')
  .then(()=>addName(2000, 'Victoria'))
  .then(()=>addName(2000, 'John'))
  .then(()=>addName(2000, 'Doe'))
  .then(()=>addName(2000, 'Sarah'))
  .catch((err)=>console.log(err))
```

You can check through [this article](https://freecodecamp.org/news/javascript-es6-promises-for-beginners-resolve-reject-and-chaining-explained/) by [Cem Eygi](https://freecodecamp.org/news/author/cemeygi/) to better understand promises.

---

## Map() in JavaScript

One of the most often used methods is `Array.map()`, which allows you to iterate over an array and modify its elements using a callback function. The callback function will be run on each array element.

Assume we have an array of users that contains their information.

```js
let users = [
  { firstName: "Susan", lastName: "Steward", age: 14, hobby: "Singing" },
  { firstName: "Daniel", lastName: "Longbottom", age: 16, hobby: "Football" },
  { firstName: "Jacob", lastName: "Black", age: 15, hobby: "Singing" }
];
```

We can loop through using map and modify it’s output

```js
let singleUser = users.map((user)=>{
  //let's add the firstname and lastname together
  let fullName = user.firstName + ' ' + user.lastName;
  return `
    <h3 class='name'>${fullName}</h3>
    <p class="age">${user.age}</p>
  `
});
```

You should note that:

- `map()` always returns a new array, even if it’s an empty array.
- It doesn’t change the size of the original array compared to the filter method
- It always makes use of the values from your original array when making a new one.

**Gotcha:** The map method works almost like every other JavaScript iterator such as `forEach()` but it’s proper to always use the map method whenever you are going to **return** a value.

![Image](https://freecodecamp.org/news/content/images/2022/01/image-83.png) \_Here is a perfect description by \[Simon Høiberg\](https://linkedin.com/in/simonhoiberg?miniProfileUrn=urn%3Ali%3Afs\_miniProfile%3AACoAAB5jWWUBOCaKeVgc2EIi88ksmqZBpvsi930&lipi=urn%3Ali%3Apage%3Ad\_flagship3\_detail\_base%3BT8SFpAr6QJeDVQ2s0XRfgg%3D%3D&licu=urn%3Ali%3Acontrol%3Ad\_flagship3\_detail\_base-actor*container&lici=cWhtZHO%2BTnmbu6ZNSGKubw%3D%3D" rel="noreferrer nofollow noopener)*

One of the key reasons we use map is so we can encapsulate our data in some HTML, whereas for React this is simply done using JSX.

You can read more about map() [here](https://freecodecamp.org/news/javascript-map-how-to-use-the-js-map-function-array-method/).

---

## Filter() and Find() in JavaScript

`Filter()` provides a new array depending on certain criteria. Unlike map(), it can alter the size of the new array, whereas `find()` returns just a single instance (this might be an object or item). If several matches exist, it returns the first match - otherwise, it returns undefined.

Suppose you have an array collection of registered users with different ages:

```js
let users = [
  { firstName: "Susan", age: 14 },
  { firstName: "Daniel", age: 16 },
  { firstName: "Bruno", age: 56 },
  { firstName: "Jacob", age: 15 },
  { firstName: "Sam", age: 64 },
  { firstName: "Dave", age: 56 },
  { firstName: "Neils", age: 65 }
];
```

You could choose to sort this data by age groups, such as young individuals (ages 1-15), senior people (ages 50-70), and so on...

In this case, the filter function comes in handy as it produces a new array based on the criteria. Let's have a look at how it works.

```js
// for young people
const youngPeople = users.filter((person) => {
  return person.age <= 15;
});

//for senior people
const seniorPeople = users.filter((person) => person.age >= 50);

console.log(seniorPeople);
console.log(youngPeople);
```

This generates a new array. It produces an empty array if the condition is not satisfied(no match).

You can read more about this [here](https://freecodecamp.org/news/javascript-array-filter-tutorial-how-to-iterate-through-elements-in-an-array/).

### Find()

The `find()` method, like the `filter()` method, iterates across the array looking for an instance/item that meets the specified condition. Once it finds it, it returns that specific array item and immediately terminates the loop. If no match is discovered, the function returns undefined.

**For example:**

```js
const Bruno = users.find((person) => person.firstName === "Bruno");

console.log(Bruno);
```

You can read more about the find() method [here](https://freecodecamp.org/news/javascript-array-find-tutorial-how-to-iterate-through-elements-in-an-array/).

---

## Destructuring Arrays and Objects in JavaScript

Destructuring is a JavaScript feature introduced in ES6 that allows for faster and simpler access to and unpacking of variables from arrays and objects.

Before destructuring was introduced, if we had an array of fruits and wanted to get the first, second, and third fruits separately, we would end up with something like this:

```js
let fruits= ["Mango", "Pineapple" , "Orange", "Lemon", "Apple"];

let fruit1 = fruits[0];
let fruit2 = fruits[1];
let fruit3 = fruits[2];

console.log(fruit1, fruit2, fruit3); /"Mango" "Pineapple" "Orange"
```

This is like repeating the same thing over and over which could become cumbersome. Let's see how this could be distructured to get the first 3 fruits.

```js
let [fruit1, fruit2, fruit3] = fruits;

console.log(fruit1, fruit2, fruit3); /"Mango" "Pineapple" "Orange"
```

You might be wondering how you could skip data if you just want to print the first and final fruits, or the second and fourth fruits. You would use commas as follows:

```
const [fruit1 ,,,, fruit5] = fruits;
const [,fruit2 ,, fruit4,] = fruits;
```

### Object destructuring

Let’s now see how we could destructure an object - because in React you will be doing a lot of object descructuring.

Suppose we have an object of user which contains their firstname, lastname, and lots more,

```js
const Susan = {
  firstName: "Susan",
  lastName: "Steward",
  age: 14,
  hobbies: {
    hobby1: "singing",
    hobby2: "dancing"
  }
};
```

In the old way, getting these data could be stressful and full of repetition:

```js
const firstName = Susan.firstName;
const age = Susan.age;
const hobby1 = Susan.hobbies.hobby1;

console.log(firstName, age, hobby1); /"Susan" 14 "singing"
```

but with destructuring its a lot easier:

```js
const {firstName, age, hobbies:{hobby1}} = Susan;

console.log(firstName, age, hobby1); /"Susan" 14 "singing"
```

We can also do this within a function:

```js
function individualData({firstName, age, hobbies:{hobby1}}){
  console.log(firstName, age, hobby1); /"Susan" 14 "singing"
}
individualData(Susan);
```

You can read more about destructuring Arrays and Objects [here](https://freecodecamp.org/news/array-and-object-destructuring-in-javascript/).

---

## Rest and Spread Operators in JavaScript

JavaScript spread and rest operators use three dots `...`. The rest operator gathers or collects items - it puts the “rest” of some specific user-supplied values into a JavaScript array/object.

Suppose you have an array of fruits:

```js
let fruits= ["Mango", "Pineapple" , "Orange", "Lemon", "Apple"];
```

We could destructure to get the first and second fruits and then place the“rest” of the fruits in an array by making use of the rest operator.

```js
const [firstFruit, secondFruit, ...rest] = fruits

console.log(firstFruit, secondFruit, rest); /"Mango" "Pineapple" ["Orange","Lemon","Apple"]
```

Looking at the result, you'll see the first two items and then the third item is an array consisting of the remaining fruits that we didn't destructure. We can now conduct any type of processing on the newly generated array, such as:

```js
const chosenFruit = rest.find((fruit) => fruit === "Apple");

console.log(`This is an ${chosenFruit}`); /"This is an Apple"
```

It's important to bear in mind that this has to come last always (placement is very important).

We've just worked with arrays - now let's deal with objects, which are absolutely the same.

Assume we had a user object that has their firstname, lastname, and a lot more. We could destructure it and then extract the remainder of the data.

```js
const Susan = {
  firstName: "Susan",
  lastName: "Steward",
  age: 14,
  hobbies: {
    hobby1: "singing",
    hobby2: "dancing"
  }
};

const {age, ...rest} = Susan;
console.log(age, rest);
```

This will log the following result:

```js
14
{
firstName: "Susan" ,
lastName: "Steward" ,
hobbies: {...}
}
```

Let’s now understand how the spread operator works, and finally summarize by differentiating between both operators.

### Spread operator

The spread operator, as the name implies, is used to spread out array items. It gives us the ability to get a list of parameters from an array. The spread operator has a similar syntax to the rest operator, except it operates in the opposite direction.

**Note:** A spread operator is effective only when used within array literals, function calls, or initialized properties objects.

For example, suppose you have arrays of different types of animals:

```js
let pets= ["cat", "dog" , "rabbits"];

let carnivorous = ["lion", "wolf", "leopard", "tiger"];
```

You might want to combine these two arrays into just one animal array. Let's try it out:

```js
let animals = [pets, carnivorous];

console.log(animals); //[["cat", "dog" , "rabbits"], ["lion", "wolf", "leopard", "tiger"]]
```

This is not what we want - we want all the items in just one single array. And we can achieve this using the spread operator:

```js
let animals = [...pets, ...carnivorous];

console.log(animals); //["cat", "dog" , "rabbits", "lion", "wolf", "leopard", "tiger"]
```

This also works with objects. It is important to note that the spread operator cannot expand the values of object literals, since a properties object is not an iterable. But we can use it to clone properties from one object into another.

For example:

```js
let name = {firstName:"John", lastName:"Doe"};
let hobbies = { hobby1: "singing", hobby2: "dancing" }
let myInfo = {...name, ...hobbies};

console.log(myInfo); //{firstName:"John", lastName:"Doe", hobby1: "singing", hobby2: "dancing"}
```

You can read more on JavaScript Spread and Rest operators [here](https://freecodecamp.org/news/javascript-rest-vs-spread-operators/).

---

## Unique Value - Set() in JavaScript

Recently, I was try to create a categories tab for an application where I needed to fetch the categories value from an array.

```js
let animals = [
  {
    name:'Lion',
    category: 'carnivore'
  },
  {
    name:'dog',
    category:'pet'
  },
  {
    name:'cat',
    category:'pet'
  },
  {
    name:'wolf',
    category:'carnivore'
  }
]
```

The first thing was to loop through the array, but I got repeated values:

```js
let category = animals.map((animal)=>animal.category);
console.log(category); //["carnivore" , "pet" , "pet" , "carnivore"]
```

This meant that I needed to set up a condition to avoid repetition. It was a little bit tricky until I came across the `set()` constructor/object provided by ES6 :).

A set is a collection of items which are unique, that is no element can be repeated. Let’s see how we can implement this easily.

```js
//wrap your iteration in the set method like this
let category = [...new Set(animals.map((animal)=>animal.category))];

console.log(category); ////["carnivore" , "pet"]
```

**NB:** I decided to spread the values into an array. You can read more on unique values [here](https://geeksforgeeks.org/sets-in-javascript/).

---

## Dynamic Object keys in JavaScript

This enables us to add object keys using square bracket notation. This may not make sense to you right now, but as you continue learning React or begin working with teams, you may come across it.

In JavaScript, we know that objects are often made up of properties/keys and values, and we may use the dot notation to add, edit, or access some value(s). As an example:

```js
let lion = {
  category: "carnivore"
};

console.log(lion); // { category: "carnivore" }
lion.baby = 'cub';
console.log(lion.category); // carnivore
console.log(lion); // { category: "carnivore" , baby: "cub" }
```

We also have the option of using square bracket notation, which is utilized when we need **dynamic object keys.**

**What do we mean by dynamic object keys?** These are keys that might not follow the standard naming convention of properties/keys in a object. The [standard naming convention](https://stackoverflow.com/questions/55413572/what-is-the-standard-naming-convention-of-properties-in-a-object-camelcase-or-s) only permits camelCase and snake\_case, but by using square bracket notation we can solve this problem.

For example, suppose we name our key with a dash in between words, for example (`lion-baby`):

```js
let lion = {
  'lion-baby' : "cub"
};

// dot notation
console.log(lion.lion-baby); // error: ReferenceError: baby is not defined
// bracket notation
console.log(lion['lion-baby']); // "cub"
```

You can see the difference between the dot notation and the bracket notation. Let's see other examples:

```js
let category = 'carnivore';
let lion = {
  'lion-baby' : "cub",
  [category] : true,
};

console.log(lion); // { lion-baby: "cub" , carnivore: true }
```

You can also perform more complex operations by using conditions within the square bracket, like this:

```js
const number = 5;
const gavebirth = true;

let animal = {
  name: 'lion',
  age: 6,
  [gavebirth && 'babies']: number
};

console.log(animal); // { name: "lion" , age: 6 , babies: 5 }
```

You can read more about this [here](https://hackmamba.io/blog/2020/11/dynamic-javascript-object-keys/).

---

## `reduce()` in JavaScript

This is arguably the most powerful array function. It can replace the `filter()` and `find()` methods and is also quite handy when doing `map()` and `filter()` methods on large amounts of data.

When you chain map and filter method together, you wind up doing the work twice - first filtering every single value and then mapping the remaining values. On the other hand, `reduce()` allows you to filter and map in a single pass. This method is powerful, but it's also a little more sophisticated and tricky.

We iterate over our array and then obtain a callback function, which is similar to `map()`, `filter()`, `find()`, and the others. The main distinction is that it reduces our array to a single value, which may be a number, array, or object.

Another thing to keep in mind about the reduce() method is that we are passing in two arguments, which has not been the case since you began reading this tutorial.

The first argument is the sum/total of all computations, and the second is the current iteration value (which you will understand shortly).

For example, suppose we have a list of salaries for our staff:

```js
let staffs = [
  { name: "Susan", age: 14, salary: 100 },
  { name: "Daniel", age: 16, salary: 120 },
  { name: "Bruno", age: 56, salary: 400 },
  { name: "Jacob", age: 15, salary: 110 },
  { name: "Sam", age: 64, salary: 500 },
  { name: "Dave", age: 56, salary: 380 },
  { name: "Neils", age: 65, salary: 540 }
];
```

And we want to calculate a 10% tithe for all staff. We could easily do this with the reduce method, but before doing that let's do something easier: let’s calculate total salary first.

```js
const totalSalary = staffs.reduce((total, staff) => {
  total += staff.salary;
  return total;
},0)
console.log(totalSalary); // 2150
```

::: note NB

We passed a second argument which is the total, it could be anything - for example a number or object.

:::

Let’s now calculate the 10% tithe for all staff and get the total. We could just get the 10% from the total or first get it from each salary before adding them up.

```js
const salaryInfo = staffs.reduce(
  (total, staff) => {
    let staffTithe = staff.salary * 0.1;
    total.totalTithe += staffTithe;
    total['totalSalary'] += staff.salary;
    return total;
  },
  { totalSalary: 0, totalTithe: 0 }
);

console.log(salaryInfo); // { totalSalary: 2150 , totalTithe: 215 }
```

::: note Gotcha

We used an object as the second argument and we also used dynamic object keys. You can read more about the reduce method [here](/freecodecamp.org/reduce-f47a7da511a9.md).

```component VPCard
{
  "title": "A Guide To The Reduce Method In Javascript ",
  "desc": "By Josh Pitzalis JavaScript’s reduce method is one of the cornerstones of functional programming. Let’s explore how it works, when you should use it, and some of the cool things it can do. A Basic Reduction Use it when: You have an array of amounts a...",
  "link": "/freecodecamp.org/reduce-f47a7da511a9.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Optional chaining in JavaScript

Optional chaining is a safe way to access nested object properties in JavaScript rather than having to do multiple null checks when accessing a long chain of object properties. It is a new feature introduced in ES2020. For example:

```js
let users = [
{
    name: "Sam",
    age: 64,
    hobby: "cooking",
    hobbies: {
      hobb1: "cooking",
      hobby2: "sleeping"
    }
  },
  { name: "Bruno", age: 56 },
  { name: "Dave", age: 56, hobby: "Football" },
  {
    name: "Jacob",
    age: 65,
    hobbies: {
      hobb1: "driving",
      hobby2: "sleeping"
    }
  }
];
```

Suppose you are trying to get the hobbies from the array above. Let’s try it out:

```js
users.forEach((user) => {
  console.log(user.hobbies.hobby2);
});
```

When you look in your console, you'll notice that the first iteration was completed, but the second iteration had no hobby. So it had to throw an error and break out of the iteration - which meant it couldn't acquire data from other Objects in the array.

**Output:**

```bash
"sleeping"
error: Uncaught TypeError: user.hobbies is undefined
```

This error can be fixed with optional chaining, though there are several methods that can fix it (for example, using conditions). Let’s see how we'd do this with both conditions and optional chaining:

### Conditional rendering method:

```js
users.forEach((user) => {
  console.log(user.hobbies && user.hobbies.hobby2);
});
```

### Optional chaining:

```js
users.forEach((user) => {
  console.log(user ?.hobbies ?.hobby2);
});
```

Output:

```bash
"sleeping"
undefined
undefined
"sleeping"
```

This might not really make sense to you now, but by the time you are working on something bigger in the future, it'll fall into place! You can read more [here](/freecodecamp.org/javascript-optional-chaining-explained.md).

```component VPCard
{
  "title": "JavaScript Optional Chaining `?.` Explained - How it Works and When to Use it",
  "desc": "What is optional chaining? Optional chaining, represented by ?. in JavaScript, is a new feature introduced in ES2020.  Optional chaining changes the way properties are accessed from deeply nested objects. It fixes the problem of having to do multiple...",
  "link": "/freecodecamp.org/javascript-optional-chaining-explained.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Fetch API & Errors in JavaScript

The fetch API, as the name implies, is used to get data from APIs. It is a browser API that allows you to use JavaScript to make basic AJAX (Asynchronous JavaScript and XML) requests.

Because it is given by the browser, you may use it without having to install or import any packages or dependencies (like axios). Its configuration is fairly simple to grasp. The fetch API delivers a promise by default (I covered promises earlier in this article).

Let’s see how to fetch data via the fetch API. We'll use a free API which contains thousands of random quotes:

```js{1-4}
fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

What we did here was:

- **Line 1:** we got the data from the API, which returned a promise
- **Line 2:** We then got the `.json()` format of the data which is also a promise
- **Line 3:** We got our data which now returns JSON
- **Line 4:** We got the errors in case there are any

We will see how this can be done with async/await in the next section. You can read more about the fetch API [here](/freecodecamp.org/how-to-make-api-calls-with-fetch.md).

```component VPCard
{
  "title": "Fetch API - How to Make a GET Request and POST Request in JavaScript",
  "desc": "By Kingsley Ubah Often times you might want your system to communicate with other web servers to get information. For example, let's say a new user wants to sign up for an account on your website. And instead of having to manually fill out a form to ...",
  "link": "/freecodecamp.org/how-to-make-api-calls-with-fetch.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

### How to Handle Errors in the Fetch API

Let’s now take a look at how we can handle errors from fetch API without needing to depend on the catch keyword. The `fetch()` function will automatically throw an error for network errors but not for HTTP errors such as 400 to 5xx responses.

The good is news is `fetch` provides a simple `response.ok` flag that indicates whether the request failed or an HTTP response’s status code is in the successful range.

This is very simple to implement:

```js
fetch("https://type.fit/api/quotes")
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

You can read more about Fetch API errors [<FontIcon icon="fas fa-globe"/>here](https://tjvantoll.com/2015/09/13/fetch-and-errors/).

---

## Async/Await in JavaScript

Async/Await allows us to write asynchronous code in a synchronous fashion. This means that you don't need to continue nesting callbacks.

An async function **always** returns a promise.

You could be racking your brain wondering what the difference between synchronous and asynchronous means. Simply put, synchronous means that jobs are completed one after the other. Asynchronous means that tasks are completed independently.

Note that we always have async in front of the function and we can only use await when we have async. You will understand soon!

Let’s now implement the Fetch API code we worked on earlier using async/await:

```js
const fetchData = async () =>{
  const quotes = await fetch("https://type.fit/api/quotes");
  const response = await quotes.json();
  console.log(response);
}

fetchData();
```

This is way more easier to read, right?

You might be wondering how we can handle errors with async/await. Yup! You use the try and catch keywords:

```js
const fetchData = async () => {
  try {
    const quotes = await fetch("https://type.fit/api/quotes");
    const response = await quotes.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

fetchData();
```

You can read more about async/await [here](/freecodecamp.org/javascript-async-await-tutorial-learn-callbacks-promises-async-await-by-making-icecream.md).

```component VPCard
{
  "title": "JavaScript Async/Await Tutorial - Learn Callbacks, Promises, and Async/Await in JS by Making Ice Cream 🍧🍨🍦",
  "desc": "Today we're going to build and run an ice cream shop and learn asynchronous JavaScript at the same time. Along the way, you'll learn how to use: Callbacks Promises Async / Await Here's what we'll cover in this article: What is Asynchronous JavaSc...",
  "link": "/freecodecamp.org/javascript-async-await-tutorial-learn-callbacks-promises-async-await-by-making-icecream.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Conclusion

In this article, we have learned over 10 JavaScript methods and concepts that everyone should understand thoroughly before learning React.

There are so many other methods and concepts you should know, but these are the ones you might not really pay attention to while learning JavaScript. These are important to understand before you learn React.

Suppose you are just getting started with JavaScript - I have curated an awesome list of resources that will help you learn JavaScript concepts and topics [here (<FontIcon icon="iconfont icon-github"/>`olawanlejoel/Awesome-Javascript`)](https://github.com/olawanlejoel/Awesome-Javascript). Don’t forget to star and share!

You can access over 200 of my articles by [visiting my website](https://joelolawanle.com/contents). You can also use the search field to see if I've written a specific article.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Top JavaScript Concepts to Know Before Learning React",
  "desc": "By Joel Olawanle If you want to learn React - or any JavaScript framework - you'll first need to understand the fundamental JavaScript methods and concepts. Otherwise it's like a youngster learning to run before learning to walk.  Many developers cho...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/top-javascript-concepts-to-know-before-learning-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
