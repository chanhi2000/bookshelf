---
lang: en-US
title: "How to Read and Write Files with Node.js"
description: "Article(s) > How to Read and Write Files with Node.js"
icon: fa-brands fa-node
category: 
  - Node.js
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Read and Write Files with Node.js"
    - property: og:description
      content: "How to Read and Write Files with Node.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-read-and-write-files-with-nodejs.html
prev: /programming/js-node/articles/README.md
date: 2024-08-19
isOriginal: false
author:
  - name: Ashutosh Krishna
    url: https://freecodecamp.org/news/author/ashutoshkrris/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723804956795/2dbd964a-00c3-4489-819a-393b058ed1fd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Read and Write Files with Node.js"
  desc="Node.js is a powerful JavaScript runtime environment that lets you run JS code outside the browser. And a fundamental part of many Node.js applications involves reading and writing files – whether that's text, JSON, HTML, or other file formats. So yo..."
  url="https://freecodecamp.org/news/how-to-read-and-write-files-with-nodejs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1723804956795/2dbd964a-00c3-4489-819a-393b058ed1fd.png"/>

Node.js is a powerful JavaScript runtime environment that lets you run JS code outside the browser. And a fundamental part of many Node.js applications involves reading and writing files – whether that's text, JSON, HTML, or other file formats. So you should understand how to read and write files.

Files are the backbone of data storage. Node.js provides a powerful 'fs' (file system) module to interact with these files seamlessly. Let's assume I want to read a JSON file in Node.js. The fs module can help me with that.

In this tutorial, I'll explain the core functionalities of this module, explore various techniques to read different file types, and discover some best practices to make your file-handling operations smoother and more efficient.

Throughout this tutorial, we'll cover everything from importing the package to using it to work with files asynchronously. Let's get started on this journey of learning file operations with Node.js!

---

## Node.js `fs` Module

The Node.js File System (fs) module is an essential component of the Node.js runtime environment. It provides a variety of features for interacting with your computer's file system.

The fs module allows you to read, write, update, delete, and manage files and directories. This module is especially useful for handling file-related operations in both synchronous and asynchronous modes.

Let’s break down the key aspects of the module:

1. The fs module, at its core, provides a collection of APIs for interacting with the file system. It provides ways to perform basic activities such as reading file contents, writing data to files, creating directories, deleting files, and so on.
2. The module includes both synchronous and asynchronous methods for interacting with files. The synchronous methods block the execution of the program until the operation completes. But the asynchronous methods are ideal for scenarios where we need to perform concurrent tasks without halting the execution of the entire program.
3. The module also supports handling directories, such as creating directories, removing directories, and listing directory contents.
4. The module also supports working with file streams, allowing efficient handling of large files by reading or writing data in chunks without loading the entire content into memory. It also facilitates the use of buffers for handling binary data, which helps with activities like data transformation and manipulation.

::: note Prerequisites

To continue with the tutorial, I recommend having the following prerequisites:

1. **Basic Understanding of JavaScript**: It is essential to be familiar with JavaScript, as Node.js uses JavaScript.
2. **Node.js Installed**: Ensure that Node.js is installed on your system. You can download and install Node.js from its [<VPIcon icon="fa-brands fa-node"/>official website](https://nodejs.org).
3. **Text Editor/IDE**: Have a text editor or an Integrated Development Environment (IDE) installed and ready to use.

:::

---

## How to Read And Write Files With Node.js

Let's look at an example to understand the process of reading and writing files in Node.js. We'll assume a scenario where we have two files – name.json and address.json.

The content inside the name.json looks like this:

```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" },
  { "id": 3, "name": "Charlie" }
]
```

The content inside address.json looks like this:

```json
[
  { "id": 1, "address": "123 Main St" },
  { "id": 2, "address": "456 Elm St" },
  { "id": 3, "address": "789 Oak St" }
]
```

Our objective is to create a bio.json file that merges the id, name, and address information, creating a structure as follows:

```json
[
  {
    "id": 1,
    "name": "Alice",
    "address": "123 Main St"
  },
  {
    "id": 2,
    "name": "Bob",
    "address": "456 Elm St"
  },
  {
    "id": 3,
    "name": "Charlie",
    "address": "789 Oak St"
  }
]
```

Let's build the application!

### Step 1: Import Node.js Packages `path` and `fs`

Let us start with creating an app.js file. The first thing we will do is import the fs library:

```js
const fs = require("fs");
```

### Step 2: Read From Files

Next, let's read data from the two files using Node.js. We'll make a utility function that helps us read these files easily in our Node.js environment.

```js
async function readJSONFile(filename) {
  try {
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}: ${error}`);
    return [];
  }
}
```

Since we are using JSON files in our example, we have defined a readJSONFile method in our code. It's an asynchronous JavaScript function that takes a filename as input and aims to return the parsed JSON contents of that file.

Inside a try block, we attempt to read the file using fs.readFile in Node with the specified filename and "utf8" encoding. If successful, the function then parses the file content as JSON using JSON.parse and returns it.

If any error occurs during reading or parsing, the catch block takes over. It logs the error with the filename and details and then returns an empty array instead of the expected JSON object.

### Step 3: Implement the Main Function

The next step is to create a main function where we make use of the above-defined method and combine the data of the two files to create a bio.json file.

```js
async function main() {
  try {
    const names = await readJSONFile("names.json");
    const addresses = await readJSONFile("address.json");

    const bioData = names.map((name) => {
      const matchingAddress = addresses.find(
        (address) => address.id === name.id
      );
      return { ...name, ...matchingAddress };
    });

    await fs.writeFile("bio.json", JSON.stringify(bioData, null, 2));
    console.log("bio.json created successfully!");
  } catch (error) {
    console.error("Error combining data:", error);
  }
}
```

In the main function, we first read the two JSON files named `names.json` and `address.json` using the readJSONFile function. Both readJSONFile calls use await, so the function waits for both files to be read before moving on.

Next, we iterate through each `name` using a map, creating a new `bioData` for each. Inside the loop, it searches for a matching `address` from the addresses collection based on the index using find.

The search compares `name.id` with each `address.id` until it finds a match. If a match is found, the function combines the information from both files. It uses the spread operator (...) to merge all properties from both objects into a single new `bioData` object. If no matching address is found, the `bioData` object will only have the name information.

Once all `bioData` objects are prepared, the function writes them as a new JSON file named `bio.json` using `fs.writeFile`. This writing process also uses await, ensuring the file is created before moving on.

The try block ensures smooth execution, while the catch block takes care of any errors like missing files or incorrect data. If any error occurs, a generic error message and the specific error details are logged for debugging.

### Complete Code

Our completed code looks like below:

```js :collapsed-lines
const fs = require("fs").promises;

async function readJSONFile(filename) {
  try {
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}: ${error}`);
    return [];
  }
}

async function main() {
  try {
    const names = await readJSONFile("names.json");
    const addresses = await readJSONFile("address.json");

    const bioData = names.map((name) => {
      const matchingAddress = addresses.find(
        (address) => address.id === name.id
      );
      return { ...name, ...matchingAddress };
    });

    await fs.writeFile("bio.json", JSON.stringify(bioData, null, 2));
    console.log("bio.json created successfully!");
  } catch (error) {
    console.error("Error combining data:", error);
  }
}

// Execute the main method
main();
```

We can run the application using the following command:

```sh
node app.js
```

Once the application runs, we get to see the following logs in the terminal if everything goes well:

```sh
bio.json created successfully!
```

This indicates that the bio.json file was created successfully. The content inside the file should look like below:

```json
[
  {
    "id": 1,
    "name": "Alice",
    "address": "123 Main St"
  },
  {
    "id": 2,
    "name": "Bob",
    "address": "456 Elm St"
  },
  {
    "id": 3,
    "name": "Charlie",
    "address": "789 Oak St"
  }
]
```

---

## Ways to Read Files in Node.js

To read files in Node.js, we mostly use two primary methods: `fs.readFile()` and `fs.readFileSync()`. The difference lies in their synchronous and asynchronous nature.

### `fs.readFile()` Method

The `fs.readFile()` method in Node.js is asynchronous. It reads the content of the entire file without blocking other operations. This makes it suitable for scenarios where non-blocking I/O operations are essential.

In simple terms, the function allows other operations to continue while the reading takes place. It accepts the following three parameters:

1. path: the path to the file to be read.
2. encoding: optional, specifies the encoding of the file (for example, "utf8"). Defaults to "utf8" if not provided.
3. callback function: optional, a function to be called when the file is read. The function receives three arguments: error, data, and buffer.

Let’s look at an example:

```js
const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data); // data will be a string containing the content of the file
  }
});
```

### `fs.readFileSync()` Method

The `fs.readFileSync()` method is synchronous. It reads the file content synchronously, stopping further execution until the file is completely read. This method is beneficial in scenarios where we require synchronous processing.

It takes only two parameters:

1. path: the path to the file to be read
2. encoding: optional, specifies the encoding of the file (for example, "utf8"). Defaults to "utf8" if not provided.

Let’s look at an example:

```js
const fs = require("fs");

try {
  const data = fs.readFileSync("data.txt", "utf8");
  console.log(data); // data will be a string containing the content of the file
} catch (err) {
  console.error(err);
}
```

### `fs.readFile()` vs `fs.readFileSync()`

To understand the difference between the Nodejs `readFile` and `readFileSync` methods, we will write two programs and monitor their execution flow.

Let's start with the `fs.readFile()` method.

```js
const fs = require("fs");

fs.readFile("example.txt", "utf8", (err, data) => {
  console.log("Content from readFile:", data);
});

console.log("Completed reading file content asynchronously");
//
// Completed reading file content asynchronously
// Content from readFile: freeCodeCamp is awesome!
```

Because of `fs.readFile()`'s asynchronous nature, the code after `fs.readFile()` doesn't wait for the file reading operation to finish. So the "Completed reading file content synchronously" message is immediately logged to the console, showing that the subsequent code continues executing without waiting for the file read to complete.

Eventually, when the file reading operation finishes, the callback function executes and logs the file content.

Next, let's see the execution of the `fs.readFileSync()` method.

```js
const fs = require("fs");

const data = fs.readFileSync("data.txt", "utf8");
console.log("Content from readFileSync:", data);

console.log("Completed reading file content synchronously");
//
// Content from readFileSync: freeCodeCamp is awesome!
// Completed reading file content synchronously
```

In contrast, `fs.readFileSync()` reads the data.txt file synchronously, blocking further code execution until the file is completely read. Consequently, the code continues execution only after the file reading operation is finished.

Because of this, the message "Completed reading file content synchronously" is logged after successfully reading the file content.

Now, we know the difference between the two methods. Understanding this difference is important as it impacts the program flow, especially in scenarios where timing and blocking operations are critical considerations in Node.js applications.

### How to Read a Text File

It's pretty straightforward to read a text file in Node.js, and we have been doing this throughout the tutorial. Let’s consider that we have a file called message.txt with the following content:

```plaintext
Learn Node.js with freeCodeCamp
```

Now, we want to read the contents of this file. We can do it like this:

```js
const fs = require("fs");

fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

The callback function returns the content of the file in a data variable. Since we set the encoding to “utf8”, the value of data is a string. So we can perform string operations on the data variable.

```js
const fs = require("fs");

fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
      let splittedWords = data.split(" ");
      console.log(splittedWords);
  }
});
```

In the above code, we split the data variable using a space. So the splittedWords will be a string array containing the following value:

```js
[ 'Learn', 'Node.js', 'with', 'freeCodeCamp' ]
```

### How to Read HTML Files

Reading HTML files follows a similar approach to reading text files in Node.js. We can use the `fs` module to read HTML files:

```js
const fs = require("fs");

fs.readFile("index.html", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

We can then use the HTML content for further processing, such as rendering it with the Node.js `http` package.

### How to Read Files by URL

Reading files by URL in Node.js involves additional steps beyond the native fs module. Typically, we’ll need to use additional modules like `http` or `axios` to fetch file content from a URL.

```js
const fs = require("fs");
const https = require("https");

const file = fs.createWriteStream("data.txt");

https.get(
  "https://example-files.online-convert.com/document/txt/example.txt",
  (response) => {
    var stream = response.pipe(file);

    stream.on("finish", function () {
      console.log("done");
    });
  }
);
```

First, we set up a writable stream named file, associated with the local file data.txt. We then use Node.js's `https` module to perform an HTTP GET request to the specified URL. The get method triggers a callback function when we receive a response from the server.

Inside the callback, the script pipes the response directly into the writable stream. This operation efficiently directs the data received from the remote server to the local file data.txt, essentially downloading and writing the content concurrently.

Finally, we set up an event listener for the "finish" event on the stream. This event fires when all the data has been successfully written to the file. Upon completion, the script logs "done" to the console, indicating the successful download and writing of the file.

### How to Read a JSON File

We have already seen how we can read a JSON file using the fs module. Let's say that we want to read our previously created bio.json file. Its data looks like the below:

```json
[
  {
    "id": 1,
    "name": "Alice",
    "address": "123 Main St"
  },
  {
    "id": 2,
    "name": "Bob",
    "address": "456 Elm St"
  },
  {
    "id": 3,
    "name": "Charlie",
    "address": "789 Oak St"
  }
]
```

In Node.js, we read JSON like this:

```js
const fs = require("fs");

fs.readFile("bio.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

With this, our JSON data is stored within the data variable as a string. If we want, we can use it for further processing. Let’s say, we want to print the details of the user:

```js
const fs = require("fs");

fs.readFile("bio.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const users = JSON.parse(data);
    users.forEach((user) => {
      console.log(`${user.name} with ID ${user.id} lives at ${user.address}`);
    });
  }
});
//
// Alice with ID 1 lives at 123 Main St
// Bob with ID 2 lives at 456 Elm St
// Charlie with ID 3 lives at 789 Oak St
```

In the above code, we first parse the string data variable to JSON and store it in a `users` variable. We then loop over the `users` variable to log the required message.

### `fs.promises`

`fs.promises` provides a set of asynchronous functions for interacting with the file system in Node.js. These functions are based on promises and offer a more readable and efficient way to handle asynchronous operations compared to callbacks.

With `fs.promises`, we don't need to add nested callbacks – which means that we can avoid callback hell.

A basic readFile operation with `fs.promises` looks like this:

```js
const fs = require("fs").promises;

async function readTextFile() {
  try {
    const data = await fs.readFile("data.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readTextFile();
```

---

## Wrapping Up

In this tutorial, we've explored the essential techniques for handling files in Node.js with the help of the fs module.

From understanding synchronous and asynchronous file reading with methods like `fs.readFile()` and `fs.readFileSync()` to processing various file formats such as text, HTML, JSON, and even reading files from URLs, we've covered a bunch of functionalities. We also learned about fs.promises, which is a more elegant way to handle file operations using asynchronous functions.

### Frequently Asked Questions (FAQs)

#### 1. How do I read a file asynchronously in Node.js?

There are mainly two ways to read a file asynchronously in Node.js: using `fs.readFile()` and using `fs.promises`.

The `fs.readFile()` method uses callbacks to handle the operation. We provide a callback function that will be called with the file data (or an error) when the reading is complete.

But `fs.promises` offers a promise-based approach. We can use the `readFile` function with await to wait for the reading to finish and then access the data directly.

#### 2. How can I check if a file exists before reading or writing in Node.js?

There are two methods to check if a file exist: using `fs.stat` and using `fs.promises.access`.

The `fs.stat` method synchronously checks if a file exists and returns information about it like size and access time. The `fs.promises.access` method asynchronously checks if a file exists and returns a promise that resolves or rejects based on the existence of the file.

#### 3. How can I handle errors when reading or writing files in Node.js?

To handle errors while reading or writing files in Node.js, we can utilize error-first callbacks or promises along with try-catch blocks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Read and Write Files with Node.js",
  "desc": "Node.js is a powerful JavaScript runtime environment that lets you run JS code outside the browser. And a fundamental part of many Node.js applications involves reading and writing files – whether that's text, JSON, HTML, or other file formats. So yo...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-read-and-write-files-with-nodejs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
