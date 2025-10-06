---
lang: en-US
title: "How to Loop Through Arrays in JavaScript"
description: "Article(s) > How to Loop Through Arrays in JavaScript"
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
      content: "Article(s) > How to Loop Through Arrays in JavaScript"
    - property: og:description
      content: "How to Loop Through Arrays in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/loop-through-arrays-javascript.html
prev: /programming/js/articles/README.md
date: 2023-11-01
isOriginal: false
author:
  - name: Joan Ayebola
    url : https://freecodecamp.org/news/author/joanayebola/
cover: https://freecodecamp.org/news/content/images/size/w1000/2023/10/Colorful-Bold-Math-Factors-Lesson-and-Quiz.png
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
  name="How to Loop Through Arrays in JavaScript"
  desc="Looping through arrays in JavaScript is a fundamental concept that every JavaScript developer should understand. Whether you're a beginner or an experienced developer, understanding how to loop through an array is crucial for many programming tasks. ..."
  url="https://freecodecamp.org/news/loop-through-arrays-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w1000/2023/10/Colorful-Bold-Math-Factors-Lesson-and-Quiz.png"/>

Looping through arrays in JavaScript is a fundamental concept that every JavaScript developer should understand. Whether you're a beginner or an experienced developer, understanding how to loop through an array is crucial for many programming tasks.

In this article, we'll explore the different ways to loop through an array in JavaScript to help you grasp the key concepts.

---

## What is an Array in JavaScript?

Before we dive into how to actually loop through arrays, let's start with the basics: what is an array?

In JavaScript, an array is a data structure that allows you to store multiple values in a single variable. These values can be of any data type, including numbers, strings, objects, and even other arrays.

You can create an array using square brackets `[]`, and individual elements are separated by commas. Here's an example of an array:

```js
var fruits = ["apple", "banana", "cherry", "date"];
```

In this example, `fruits` is an array containing four strings.

### Why Loop Through an Array?

Looping through an array is necessary when you want to perform operations on the elements in the array. You may need to:

- Display the elements on a web page.
- Calculate the sum, average, or other mathematical operations on numerical values.
- Filter out specific elements that meet certain conditions.
- Modify the elements in some way, like changing their format or values.

Now, let's explore the different ways to loop through arrays in JavaScript.

---

## How to Loop Through an Array in JS

### 1. Using the `for` Loop

The traditional `for` loop is one of the simplest and most versatile ways to loop through an array. It allows you to have complete control over the loop's behavior.

```js
var fruits = ["apple", "banana", "cherry", "date"];

for (var i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

In this example, we start with `i` equal to 0 and iterate through the array until `i` is less than the length of the `fruits` array. We access each element using the index `i` and print it to the console. Here's what it will return:

```plaintext title="output"
apple
banana
cherry
date
```

The loop starts at the first element (index 0), which is "apple," and iterates through each subsequent element, printing them one by one until it reaches the end of the array.

### 2. Using the `forEach` Method

The `forEach` method is a built-in JavaScript method for arrays that simplifies the process of looping through each element.

```js
var fruits = ["apple", "banana", "cherry", "date"];

fruits.forEach(function(fruit) {
  console.log(fruit);
});
```

The `forEach` method takes a callback function as an argument. This function is executed for each element in the array, and the element is passed as an argument to the function. In this example, we simply log each `fruit` to the console:

```plaintext title="output"
apple
banana
cherry
date
```

### 3. Using a `for...of` Loop

The `for...of` loop is another modern way to loop through an array. It's cleaner and more concise than the traditional `for` loop.

```js
var fruits = ["apple", "banana", "cherry", "date"];

for (var fruit of fruits) {
  console.log(fruit);
}
```

With the `for...of` loop, you don't need to manually manage an index variable like in the `for` loop or write a separate callback function like in `forEach`. You directly iterate through the elements of the array.

```plaintext title="output"
apple
banana
cherry
date
```

This will return each element in our array one after the other just like the other methods.

### 4. Using a `for...in` Loop (Not Recommended for Arrays)

While the `for...in` loop is suitable for iterating over object properties, it's not recommended for arrays. It may also iterate over non-index properties in the array prototype, which can lead to unexpected results.

```js
var fruits = ["apple", "banana", "cherry", "date"];

for (var index in fruits) {
  console.log(fruits[index]);
}
```

It's safer to use the `for` loop, `forEach`, or `for...of` loop when working with arrays.

While this method will work, it can have unexpected behavior if the array has additional properties beyond the indexed elements. In this case, it's safe because the "fruits" array is a simple array with no added properties, so the output will be the same as before:

```plaintext title="output"
apple
banana
cherry
date
```

### 5. Using the `map` Method

The `map` method is used to create a new array by applying a given function to each element in the original array. It's useful when you want to transform the elements of an array and get the result in a new array.

```js
var fruits = ["apple", "banana", "cherry", "date"];

var capitalizedFruits = fruits.map(function(fruit) {
  return fruit.toUpperCase();
});

console.log(capitalizedFruits);
```

In this example, we use the `map` method to create a new array `capitalizedFruits` by using the `map` method to transform the original "fruits" array. It will convert each element in the "fruits" array to uppercase and then log the new array to the console. Here's the output:

```plaintext title="output"
[ 'APPLE', 'BANANA', 'CHERRY', 'DATE' ]
```

The `map` method applies the transformation function (`fruit.toUpperCase()`) to each element of the "fruits" array and returns a new array with the transformed elements. In this case, it capitalizes each fruit name, resulting in an array of uppercase fruit names.

### 6. Using the `filter` Method

The `filter` method creates a new array with all elements that pass a test specified by a callback function. It's helpful for selecting elements that meet certain criteria.

```js
var numbers = [1, 2, 3, 4, 5, 6];

var evenNumbers = numbers.filter(function(number) {
  return number % 2 === 0;
});

console.log(evenNumbers);
```

The `filter` method here creates a new array named `evenNumbers` by using the `filter` method on the original "numbers" array. It will filter out and include only the even numbers from the "numbers" array. Here's the output:

```plaintext title="output"
[ 2, 4, 6 ]
```

The `filter` method applies the given function to each element in the "numbers" array and includes the elements in the new array if the function returns `true`. In this case, it checks if each number is even (divisible by 2), and as a result, it includes only the even numbers in the `evenNumbers` array.

### 7. Using the `reduce` Method

The `reduce` method is used to combine values in an array, resulting in a single value. It's great for performing calculations on array elements, such as finding the sum of all numbers.

```js
var numbers = [1, 2, 3, 4, 5];

var sum = numbers.reduce(function(total, currentNumber) {
  return total + currentNumber;
}, 0);

console.log(sum);
```

In this example, we will calculate the sum of all the numbers in the "numbers" array using the `reduce` method. It initializes the `sum` with `0`, and then it iterates through each element in the array, adding it to the `accumulator`. Here's the output:

```plaintext title="output"
15
```

The `reduce` method combines the values in the array by applying the provided function (in this case, addition) to each element and the total. So, it effectively adds up all the numbers in the "numbers" array, resulting in a sum of `15`.

#### Performing More Complex Calculations with `reduce`

The `reduce` method can handle more complex calculations as well. For instance, you can use it to process an array of objects and extract specific information or compute a more intricate result.

```js
var purchases = [
  { item: "Widget", price: 10 },
  { item: "Gadget", price: 25 },
  { item: "Doodad", price: 15 }
];

var totalPrice = purchases.reduce(function(accumulator, currentPurchase) {
  return accumulator + currentPurchase.price;
}, 0);

console.log("Total Price:", totalPrice);
```

In this example, we have an array of objects representing purchases. We use the `reduce` method to calculate the total price by accumulating the `price` property of each purchase object.

The `reduce` method's versatility makes it a valuable tool for handling various complex calculations and data manipulation tasks when working with arrays in JavaScript. By providing a flexible way to process array elements, it simplifies and streamlines operations, saving you time and effort.

### 8. Using the `some` and `every` Methods

The `some` method checks if at least one element in the array satisfies a given condition, while the `every` method checks if all elements meet a condition.

```js
var numbers = [1, 2, 3, 4, 5];

var isGreaterThanThree = numbers.some(function(number) {
  return number > 3;
});

var allGreaterThanZero = numbers.every(function(number) {
  return number > 0;
});

console.log(isGreaterThanThree);  // true
console.log(allGreaterThanZero);  // true
```

In this example, the code checks two conditions on the "numbers" array using the `some` and `every` methods. Here are the results:

1. `isGreaterThanThree` is `true` because at least one element in the "numbers" array (e.g., `4` and `5`) is greater than `3`.
2. `allGreaterThanZero` is also `true` because all elements in the "numbers" array are greater than `0`.

So, the code correctly prints `true` for both conditions:

```plaintext title="output"
true
true
```

The `some` method checks if at least one element satisfies the condition, while the `every` method checks if all elements meet the condition. In this case, both conditions are met, so the output is `true` for both checks.

If only one of the conditions is met, the code will still print the result accordingly. Let's say only one condition is met, for example, `isGreaterThanThree`, and the `allGreaterThanZero` condition is not met. In that case, the code would look like this:

```js
var numbers = [1, 2, 3, 4, 5];

var isGreaterThanThree = numbers.some(function(number) {
  return number > 3;
});

var allGreaterThanZero = numbers.every(function(number) {
  return number > 0;
});

console.log(isGreaterThanThree);  // true
console.log(allGreaterThanZero);  // false
```

In this scenario:

- `isGreaterThanThree` is `true` because at least one element is greater than `3`.
- `allGreaterThanZero` is `false` because not all elements are greater than `0`.

The code will correctly print `true` for the `isGreaterThanThree` condition and `false` for the `allGreaterThanZero` condition:

```plaintext title="output"
true
false
```

The output will reflect the results of each individual condition check.

### 9. Using `for...in` with Objects

When you have an array of objects, you can use the `for...in` loop to iterate through the properties of each object.

```js
var people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

for (var person of people) {
  for (var key in person) {
    console.log(key + ": " + person[key]);
  }
}
```

In this example, we loop through an array of objects, "people," and for each object, (person) we further iterate through its properties using a nested `for...in` loop to print all the properties and their values.

Here's the output:

```plaintext title="output"
name: Alice
age: 25
name: Bob
age: 30
name: Charlie
age: 35
```

### 10. Using the `for...of` Loop with Objects

The `for...of` loop can also be used with arrays of objects to iterate through the objects themselves.

```js
var people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

for (var person of people) {
  console.log("Name: " + person.name + ", Age: " + person.age);
}
```

In this example,The `for...of` loop iterates through each object (person) in the "people" array and prints a string that includes the person's name and age, creating a well-formatted output.

Here's the output:

```plaintext title="output"
Name: Alice, Age: 25
Name: Bob, Age: 30
Name: Charlie, Age: 35
```

---

## How to Combine Array Methods

One of the strengths of JavaScript is its ability to chain multiple array methods together to achieve more complex tasks efficiently.

Let's walk through an example of how to filter certain elements from an array using the `filter` method and then transform the remaining elements using the `map` method.

```js
var numbers = [1, 2, 3, 4, 5, 6];

// First, let's filter out the even numbers.
var evenNumbers = numbers.filter(function(number) {
  return number % 2 === 0;
});

// Now, let's double each of the even numbers using the map method.
var doubledEvenNumbers = evenNumbers.map(function(number) {
  return number * 2;
});

console.log("Original Numbers: " + numbers); // [1, 2, 3, 4, 5, 6]
console.log("Even Numbers: " + evenNumbers);   // [2, 4, 6]
console.log("Doubled Even Numbers: " + doubledEvenNumbers); // [4, 8, 12]
```

In this example, we start with an array of `numbers`, and we want to perform the following steps:

1. Filter out the even numbers.
2. Double each of the even numbers.

We achieve this by first using the `filter` method to create a new array `evenNumbers` containing only the even numbers from the `numbers` array. Then, we use the `map` method to double each element in the `evenNumbers` array, resulting in the `doubledEvenNumbers` array.

By combining these two array methods, we've effectively filtered and transformed the original array to get the desired result.

Here is the output:

```plaintext title="output"
Original Numbers: 1,2,3,4,5,6
Even Numbers: 2,4,6
Doubled Even Numbers: 4,8,12
```

This approach is not only more readable but also more efficient than achieving the same result with traditional loops. It takes advantage of the functional nature of JavaScript and the power of array methods, making your code cleaner and easier to maintain.

---

## Conclusion

Looping through arrays in JavaScript is a fundamental skill for any developer. Whether you prefer the traditional `for` loop, the concise `for...of` loop, or the convenient array methods like `forEach`, the choice depends on your specific use case and coding style. Each method has its advantages, so it's important to understand them all.

By mastering the various ways to loop through arrays, you'll be better equipped to work with arrays in your JavaScript applications. Whether you're manipulating data, displaying information on a webpage, or performing complex calculations, these array looping techniques are essential tools in your JavaScript toolkit.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Loop Through Arrays in JavaScript",
  "desc": "Looping through arrays in JavaScript is a fundamental concept that every JavaScript developer should understand. Whether you're a beginner or an experienced developer, understanding how to loop through an array is crucial for many programming tasks. ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/loop-through-arrays-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
