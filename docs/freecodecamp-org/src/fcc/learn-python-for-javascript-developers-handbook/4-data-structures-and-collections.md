---
lang: en-US
title: "4. Data Structures and Collections"
description: "Article(s) > (4/12) How to Learn Python for JavaScript Developers [Full Handbook]"
category:
  - Python
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
  - javascript
  - js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (4/12) How to Learn Python for JavaScript Developers [Full Handbook]"
    - property: og:description
      content: "4. Data Structures and Collections"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-python-for-javascript-developers-handbook/4-data-structures-and-collections.html
date: 2024-11-22
isOriginal: false
author:
  - name: German Cocca
    url : https://freecodecamp.org/news/author/GerCocca/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Learn Python for JavaScript Developers [Full Handbook]",
  "desc": "As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m...",
  "link": "/freecodecamp.org/learn-python-for-javascript-developers-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Learn Python for JavaScript Developers [Full Handbook]"
  desc="As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m..."
  url="https://freecodecamp.org/news/learn-python-for-javascript-developers-handbook#heading-4-data-structures-and-collections"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg"/>

Data structures are foundational to any programming language, as they define how data is stored, accessed, and manipulated. Both JavaScript and Python offer a variety of built-in data structures, but each language provides different tools and features for handling collections.

In this section, we’ll explore Python’s main data structures and compare them with JavaScript’s corresponding structures.

---

## Lists and Arrays

In Python, lists are versatile, mutable sequences that allow you to store elements of different types. They are comparable to JavaScript’s arrays but come with built-in methods and utilities that make them easier to manipulate for many use cases.

### <VPIcon icon="fa-brands fa-python"/>Python Lists

- Lists in Python are denoted by square brackets (`[]`) and support various built-in functions, such as appending, inserting, and removing elements.
- They can store any type of data, including other lists, making them useful for nested data structures.

### <VPIcon icon="fa-brands fa-js"/>JavaScript Arrays:

- Arrays in JavaScript are also denoted by square brackets (`[]`) and can hold elements of different types.
- JavaScript arrays are technically objects, so they come with a range of methods for manipulation (`push`, `pop`, `splice`, `map`, etc.).

::: tip <VPIcon icon="fa-brands fa-python"/>Example: Adding and removing elements in lists and arrays:

```py
# Creating and manipulating a list
my_list = [1, 2, 3]
my_list.append(4)       # Adds 4 to the end
my_list.insert(1, 10)   # Inserts 10 at index 1
my_list.remove(2)       # Removes the first occurrence of 2
print(my_list)          # Output: [1, 10, 3, 4]
```

:::

::: tip <VPIcon icon="fa-brands fa-js"/>Example: Adding and removing elements in lists and arrays:

```js
// Creating and manipulating an array
let myArray = [1, 2, 3];
myArray.push(4);        // Adds 4 to the end
myArray.splice(1, 0, 10); // Inserts 10 at index 1
myArray.splice(myArray.indexOf(2), 1); // Removes the first occurrence of 2
console.log(myArray);   // Output: [1, 10, 3, 4]
```

:::

Python’s list functions are often simpler and more intuitive, which is particularly beneficial for quick data manipulation.

---

## Tuples

Python offers tuples as an immutable sequence type, meaning their elements cannot be changed once created. Tuples are useful when you need a sequence of items that should remain constant throughout the program’s execution.

JavaScript does not have an equivalent immutable sequence structure, though arrays declared with `const` can serve a similar purpose in restricting reassignment.

### <VPIcon icon="fa-brands fa-python"/>Python Tuple

```py
my_tuple = (1, 2, 3)
# Attempting to modify will raise an error:
# my_tuple[0] = 10  # Raises TypeError
```

Tuples are ideal for fixed collections, such as coordinates or configuration values, where data should not change.

---

## Sets

Both JavaScript and Python offer sets as a way to store unique values. Sets are unordered and do not allow duplicates, making them ideal for collections where each item should be unique.

### <VPIcon icon="fa-brands fa-python"/>Python Sets

- In Python, sets are defined using curly braces (`{}`) or the `set()` function.
- Python sets support set operations like union, intersection, and difference, which can be useful for tasks like finding common elements or removing duplicates.

### <VPIcon icon="fa-brands fa-js"/>JavaScript Sets:

- JavaScript introduced the `Set` object in ES6.
- Similar to Python, JavaScript sets can perform union and intersection operations with some extra syntax.

::: tip <VPIcon icon="fa-brands fa-python"/>Example: Working with sets in Python

```py
# Creating and using a set
fruits = {"apple", "banana", "cherry"}
fruits.add("orange")           # Adds "orange" to the set
fruits.discard("banana")       # Removes "banana" from the set
print(fruits)                  # Output: {"apple", "cherry", "orange"}
```

:::

::: tip <VPIcon icon="fa-brands fa-js"/>Example: Working with sets in JavaScript

```js
// Creating and using a set
let fruits = new Set(["apple", "banana", "cherry"]);
fruits.add("orange");           // Adds "orange" to the set
fruits.delete("banana");        // Removes "banana" from the set
console.log(fruits);            // Output: Set { "apple", "cherry", "orange" }
```

:::

Python’s set functions (`union`, `intersection`, `difference`) make it easy to perform mathematical set operations directly, which is especially useful for data processing tasks.

---

## Dictionaries and Objects

Python’s `dict` and JavaScript’s objects are both key-value pair data structures, but they have slightly different features and limitations.

### <VPIcon icon="fa-brands fa-python"/>Python Dictionaries

Python’s dictionaries are optimized for fast lookup and can use immutable types (for example, strings, numbers, tuples) as keys. Dictionaries are widely used in Python for data management, configuration, and lookups.

### <VPIcon icon="fa-brands fa-js"/>JavaScript Objects

JavaScript objects serve a similar purpose but are less restrictive in terms of key types. Objects can use strings and symbols as keys but lack some of the dictionary-specific functions found in Python.

::: tip <VPIcon icon="fa-brands fa-python"/>Example: Creating and accessing elements in dictionaries and objects:

```py
# Creating and manipulating a dictionary
person = {"name": "Alice", "age": 30}
person["city"] = "New York"     # Adding a new key-value pair
print(person["name"])           # Output: Alice
del person["age"]               # Removing a key-value pair
print(person)                   # Output: {"name": "Alice", "city": "New York"}
```

:::

::: tip <VPIcon icon="fa-brands fa-js"/>Example: Creating and accessing elements in dictionaries and objects:

```js
// Creating and manipulating an object
let person = { name: "Alice", age: 30 };
person.city = "New York";       // Adding a new key-value pair
console.log(person.name);       // Output: Alice
delete person.age;              // Removing a key-value pair
console.log(person);            // Output: { name: "Alice", city: "New York" }
```

:::

Python dictionaries also support powerful methods like `get`, `keys`, `values`, and `items`, which provide more direct ways to access and manipulate dictionary contents compared to JavaScript’s object handling.

---

## Working with JSON Data

Both Python and JavaScript work well with JSON, a format frequently used for data interchange in web applications. JavaScript’s native compatibility with JSON is a natural fit for web APIs, while Python’s `json` module allows for easy parsing and generation of JSON data.

::: tip <VPIcon icon="fa-brands fa-python"/>Example: Converting a dictionary/object to JSON and parsing JSON data:

```py
import json

# Convert dictionary to JSON string
person_dict = {"name": "Alice", "age": 30}
person_json = json.dumps(person_dict)
print(person_json)  # Output: {"name": "Alice", "age": 30}

# Parse JSON string to dictionary
parsed_dict = json.loads(person_json)
print(parsed_dict)  # Output: {'name': 'Alice', 'age': 30}
```

:::

::: tip <VPIcon icon="fa-brands fa-js"/>Example: Converting a dictionary/object to JSON and parsing JSON data:

```js
// Convert object to JSON string
let personObject = { name: "Alice", age: 30 };
let personJson = JSON.stringify(personObject);
console.log(personJson); // Output: {"name":"Alice","age":30}

// Parse JSON string to object
let parsedObject = JSON.parse(personJson);
console.log(parsedObject); // Output: { name: 'Alice', age: 30 }
```

:::

::: important Key Takeaways

- **Lists and Arrays**: Python’s lists are versatile and come with built-in manipulation methods. JavaScript arrays are flexible but less concise in syntax.
- **Tuples**: Python’s tuples are immutable sequences ideal for fixed data collections, which JavaScript lacks an equivalent for.
- **Sets**: Both Python and JavaScript offer sets for unique collections, but Python’s sets support more direct mathematical operations.
- **Dictionaries and Objects**: Python’s dictionaries and JavaScript’s objects serve similar purposes, though Python offers additional methods specifically for dictionary manipulation.
- **JSON**: Both languages handle JSON data, with JavaScript having native JSON support and Python using the `json` module.

:::