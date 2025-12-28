---
lang: en-US
title: "JavaScript Concatenate Strings – How JS String Concatenation Works"
description: "Article(s) > JavaScript Concatenate Strings – How JS String Concatenation Works"
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
      content: "Article(s) > JavaScript Concatenate Strings – How JS String Concatenation Works"
    - property: og:description
      content: "JavaScript Concatenate Strings – How JS String Concatenation Works"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-js-string-concatenation-works.html
prev: /programming/js/articles/README.md
date: 2024-05-08
isOriginal: false
author:
  - name: Dionysia Lemonaki
    url : https://freecodecamp.org/news/author/dionysialemonaki/
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/mfB1B1s4sMc/upload/138f5daa340578a0ba2da07274b59252.jpeg
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
  name="JavaScript Concatenate Strings – How JS String Concatenation Works"
  desc="When coding in JavaScript, you may need to combine multiple strings to create a new, longer string. This operation is known as concatenation. In this article, you will learn five ways to concatenate strings in JavaScript. How to Concatenate Strings i..."
  url="https://freecodecamp.org/news/how-js-string-concatenation-works"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/mfB1B1s4sMc/upload/138f5daa340578a0ba2da07274b59252.jpeg"/>

When coding in JavaScript, you may need to combine multiple strings to create a new, longer string. This operation is known as concatenation.

In this article, you will learn five ways to concatenate strings in JavaScript.

---

## How to Concatenate Strings in JavaScript Using the `+` Operator

The `+` operator isn't used only for performing addition but also for concatenating strings.

Let’s take the following example:

```js
let greeting = "Hello";
let name = "John";

let result = greeting + name;

console.log(result);
//
// Output: HelloJohn
```

In the code above, I created two variables named `greeting` and `name`, and stored the string values `Hello` and `John`, respectively.

I also created another variable named `result` and stored the result of concatenating `greeting` and `name` using the `+` operator.

Finally, I used `console.log()` to output the `result` to the console.

If you look closely at the output, `HelloJohn`, you will notice that there is no space between `Hello` and `John`. The result of joining the two strings, `Hello` and `John`, will be a new single string, `HelloJohn`.

When concatenating strings with the `+` operator, you have to remember to add spaces between the strings, or you will end up with unexpected output:

```jsx
let greeting = "Hello";
let name = "John";

let result = greeting + " " + name;

console.log(result);
//
// Output: Hello John
```

So, although the `+` operator is a convenient approach for basic string concatenation in JavaScript, you have to be mindful of manually separating the strings, which can lead to errors when performing more complex string concatenation.

---

## How to Concatenate Strings in JavaScript Using the `+=` Operator

The `+=` operator is used when you want to add a string to an existing string.

Let's take the following example:

```js
let name = "John ";

name += "Doe";

console.log(name);
//
// Output: John Doe
```

In the example above, I created a variable `name` and stored the string value `John` with a space at the end. Note that when using the `+=` operator, you have to add spaces to separate the strings, similar to when using the `+` operator.

Then, I added the string `Doe` to the `name` variable. After this operation, the `name` variable will contain the string `John Doe`.

The `+=` operator takes the original value of the variable `name`, `John`, adds the value `Doe` and assigns the result back to the variable.

You can think of the line `name += "Doe";` as a shorthand for `name = name + "Doe"`.

---

## How to Concatenate Strings in JavaScript Using Template Literals

As you saw earlier, the `+` operator is convenient for basic string concatenation. However, code can become hard to read or lead to errors when performing more complex string concatenation.

Template literals offer a more readable alternative and make working with strings easier.

Template literals use backticks (\`) to enclose a string instead of single or double quotes. Inside the backticks, you can insert variables or expressions directly into strings using `${}`.

Let's revisit the code for concatenating strings using the `+` operator:

```js
let greeting = "Hello";
let name = "John";

let result = greeting + " " + name;

console.log(result);
//
// Output: Hello John
```

Here is how you would rewrite the code using template literals:

```js
let greeting = "Hello";
let name = "John";

let result = `${greeting} ${name}`;

console.log(result);
//
// Ouput: Hello John
```

The `${greeting}` and `${name}` are like placeholders that get replaced with the actual values of the variables. `${greeting}` embeds the value of the variable `greeting` into the string, and `${name}` embeds the value of the variable `name`.

While both code examples achieve the same output, the code using template literals is more readable and concise compared to the code using the `+` operator.

---

## How to Concatenate Strings in JavaScript Using the `concat()` Method

You can also use the built-in `concat()` method to concatenate two or more strings in JavaScript.

The general syntax for the `concat()` method looks something similar to the following:

```js
string.concat(string1, string2, ..., stringN)
```

You can call the `concat()` method on a string and pass the string(s) you want to concatenate as arguments inside the parentheses. When you pass multiple strings as arguments, you separate each string with a comma.

Note that the `concat()` method doesn't change the original string. Instead, it returns a new concatenated string.

Let's see an example of the `concat()` method in action:

```js
let greeting = "Hello";
let name = "John";

let result = greeting.concat(name);

console.log(result); 
console.log(greeting);
//
// Hello John
// Hello
```

In the code above, the `concat()` method is called on the initial string variable `name`, and the `greeting` string variable is passed as an argument.

This creates a new string, `Hello John`, where `name` is added to the end of `greeting`. The string in the `greeting` variable doesn't change.

---

## How to Concatenate Strings in JavaScript Using the `join()` Method

Lastly, you can concatenate strings using the built-in `join()` method.

The general syntax for the `join()` method looks something like the following:

```js
array.join(separator);
```

The `join()` method comes in handy when working with arrays of strings, as it combines all array elements into a single string separated by a separator you specify. When you don't specify a separator, a comma is used by default.

Let's take the following example:

```js
let programmingLanguages = ["JavaScript", "Java", "Python"];

let result = programmingLanguages.join(", ");

console.log(result);
//
// Output: JavaScript, Java, Python
```

In the example above, I first created an array called `programmingLanguages` containing three strings: `JavaScript`, `Java`, and `Python`.

Next, I called the `join()` method on `programmingLanguages` to concatenate all array elements into a single string and used a comma followed by a space, `,` , as the separator. Then, I stored the result in a new variable called `result`.

The array elements `JavaScript`, `Java`, and `Python` are joined together with a comma and a space between each element, resulting in the string `JavaScript, Java, Python`.

---

## Conclusion

In this article, you learned five ways of concatenating strings in JavaScript.

To summarise:

- The `+` operator is useful for performing basic string concatenation, but it can become less readable when performing more complex concatenations.
- The `+=` operator comes in handy when you want to add a string to an existing string and modify the original string.
- Template literals allow you to embed variables directly within a string and provide a readable and concise syntax.
- The `concat()` method is useful when you want to concatenate strings but don't want to modify the existing strings.
- The `join()` method allows you to concatenate an array of strings into a single string, with an optional separator between each array element.

Thanks for reading, and happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript Concatenate Strings – How JS String Concatenation Works",
  "desc": "When coding in JavaScript, you may need to combine multiple strings to create a new, longer string. This operation is known as concatenation. In this article, you will learn five ways to concatenate strings in JavaScript. How to Concatenate Strings i...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-js-string-concatenation-works.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
