---
lang: en-US
title: "What’s Next? More Class Features and Real-World Examples"
description: "Article(s) > (12/12) How to Use Classes in JavaScript – A Handbook for Beginners"
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
      content: "Article(s) > (12/12) How to Use Classes in JavaScript – A Handbook for Beginners"
    - property: og:description
      content: "What’s Next? More Class Features and Real-World Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-classes-in-javascript-handbook/whats-next-more-class-features-and-real-world-examples.html
next: /freecodecamp.org/how-to-use-classes-in-javascript-handbook/README.md#conclusion
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
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-whats-next-more-class-features-and-real-world-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>

Alright, now that you’re comfortable with the idea of classes, it’s time to see them in action. Understanding the theory is only half the battle—we need some practical examples.

And to solidify your understanding, let’s walk through building a classic example: a basic to-do list app. While a to-do app is still relatively simple in concept, it introduces enough front-end interaction to see how classes can organize front-end JavaScript code for interactive elements in a manageable way for learning.

Imagine you want to build a really basic to-do app. What do you need to manage?

- To-dos: Each to-do item has a description and a status (done or not).
- Actions: You’ll want to add new to-dos, mark them as complete, delete them, and list them.

This naturally leads us to think of a “ToDo” item as an object, and if you’re creating many to-do items, a `ToDo` class is a perfect blueprint.

---

## Setting Up Your Files

Before writing any code, create two files in the same folder:

- <FontIcon icon="fa-brands fa-html5"/>`index.html`: This is the webpage structure.
- <FontIcon icon="fa-brands fa-js"/>`script.js`: This is where your JavaScript code with classes will live.

You can use any text editor (like VS Code, Sublime Text, or even Notepad) to create these files.

---

## Creating the ToDo Class

Let’s start by building our `ToDo` class. Copy and paste the following code into your <FontIcon icon="fa-brands fa-js"/>`script.js` file:

```js title="script.js"
class ToDo {
  constructor(description) {
    this.description = description; // Every to-do needs a description
    this.completed = false; // By default, it's not completed
  }

  markComplete() {
    this.completed = true;
    console.log("${this.description}" marked as complete!);
  }
  // More methods (e.g., for editing the to-do) can be added later.
}
```

Notice how clean that is. The `constructor` sets up the description and completed status for each new to-do item. The `markComplete()` method updates the status and logs a confirmation message.

---

## Building the ToDoList Class

Next, we’ll build a `ToDoList` class to manage our collection of to-dos. Add the following code to your <FontIcon icon="fa-brands fa-js"/>`script.js` file, below the `ToDo` class:

```js :collapsed-lines title="script.js"
class ToDoList {
  constructor() {
    this.todos = []; // Start with an empty array of to-dos
  }

  addTodo(description) {
    const newTodo = new ToDo(description); // Create a new ToDo object
    this.todos.push(newTodo); // Add it to our list
    this.renderTodoList(); // Update the webpage display
  }
  
  listTodos() {
    return this.todos; // Return the array of todos (for further processing or rendering)
  }
  
  markTodoComplete(index) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index].markComplete();
      this.renderTodoList(); // Update the display after marking complete
    }
   }

  renderTodoList() {
    const todoListElement = document.getElementById('todoList');
    todoListElement.innerHTML = ''; // Clear the current list in HTML
    this.todos.forEach((todo, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = todo.description;
      if (todo.completed) {
        listItem.classList.add('completed'); // Add CSS class for styling completed items
      }
      // Create a "Complete" button for each to-do
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Complete';
      completeButton.onclick = () => this.markTodoComplete(index);
      listItem.appendChild(completeButton);
      todoListElement.appendChild(listItem);
    });
  }
}
```

In this class:

- The `constructor` initializes an empty array to hold our to-do items.
- `addTodo(description)` creates a new `ToDo` object and adds it to the array, then calls `renderTodoList()` to update the display.
- `listTodos()` returns the list of to-dos.
- `markTodoComplete(index)` marks a specific to-do as complete and refreshes the display.
- `renderTodoList()` finds the HTML element with the ID `todoList`, clears its content, and then creates list items for each to-do, including a “Complete” button.

---

## Creating the HTML Structure

Next, open your <FontIcon icon="fa-brands fa-html5"/>`index.html` file and paste in the following HTML code:

```html title="index.html
<!DOCTYPE html>
<html>
<head>
  <title>My Simple To-Do App</title>
  <style>
    /* Simple CSS to style completed items */
    .completed {
      text-decoration: line-through;
      color: gray;
    }
  </style>
</head>
<body>
  <h1>My To-Do List</h1>
  <input type="text" id="todoInput" placeholder="Enter new to-do...">
  <button id="addButton">Add To-Do</button>
  <ul id="todoList"></ul>
  <script src="script.js"></script>
</body>
</html>
```

This HTML file sets up:

- A heading for your to-do list.
- An input box (with `id="todoInput"`) for entering new to-dos.
- An “Add To-Do” button (with `id="addButton"`).
- An empty unordered list (with `id="todoList"`) where your to-dos will appear.
- A link to the <FontIcon icon="fa-brands fa-js"/>`script.js` file that contains your JavaScript code.

---

## Making It All Work Together

Finally, let’s hook up our HTML elements with our JavaScript. At the bottom of your <FontIcon icon="fa-brands fa-js"/>`script.js` file, add this code:

```js title="script.js"
const myTodoList = new ToDoList(); // Create an instance of ToDoList

// Get references to the HTML elements
const addButton = document.getElementById("addButton");
const todoInput = document.getElementById("todoInput");

// Listen for clicks on the "Add To-Do" button
addButton.addEventListener("click", () => {
  const todoText = todoInput.value.trim(); // Get the text from the input box

  if (todoText) {
    // Only add if the input is not empty
    myTodoList.addTodo(todoText); // Add the new to-do
    todoInput.value = ""; // Clear the input box
  }
});

// Render the to-do list initially (it will be empty to start)
myTodoList.renderTodoList();
```

This code does the following:

- Creates an instance of the `ToDoList` class.
- Finds the HTML elements for the input and button.
- This code adds an event listener to the HTML button element that has the ID "addButton". This listener is set to react to "click" events on this button. When the "Add To-Do" button is clicked, the code inside the event listener function will execute. This code takes the text that the user has typed into the HTML input field with the ID "todoInput" and adds it as a new to-do item to our list.
- Initially renders the to-do list on the webpage.

---

## Your Challenge: Go Proto-Style

Now that you’ve seen how classes can make building this to-do app more structured, here’s a challenge: Try building the same to-do app without using the `class` keyword. Use object literals and prototypes instead. Think about:

- How would you create a `ToDo` “blueprint” using a constructor function and prototypes?
- How would you add the `markComplete()` method to the `ToDo` prototype?
- How would you structure a `ToDoList` “blueprint” similarly?

By building the same app using both approaches, you’ll really understand that classes are just a nicer, more familiar way of writing prototype-based code.
