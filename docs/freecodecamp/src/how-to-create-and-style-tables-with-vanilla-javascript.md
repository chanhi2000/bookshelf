---
lang: en-US
title: "How to Create and Style Tables with Vanilla JavaScript"
description: "Article(s) > How to Create and Style Tables with Vanilla JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create and Style Tables with Vanilla JavaScript"
    - property: og:description
      content: "How to Create and Style Tables with Vanilla JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-and-style-tables-with-vanilla-javascript.html
prev: /programming/js/articles/README.md
date: 2025-10-22
isOriginal: false
author:
  - name: Md. Fahim Bin Amin
    url : https://freecodecamp.org/news/author/FahimFBA/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761066375438/ad2ff6f1-336c-4d32-89f7-3294a4bfebbd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create and Style Tables with Vanilla JavaScript"
  desc="Tables are one of the most useful ways to display structured data, whether you’re showing a list of users, sales figures, or project reports. In this tutorial, you will learn how to: Build tables using plain HTML Style them using CSS Create and ma..."
  url="https://freecodecamp.org/news/how-to-create-and-style-tables-with-vanilla-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761066375438/ad2ff6f1-336c-4d32-89f7-3294a4bfebbd.png"/>

Tables are one of the most useful ways to display structured data, whether you’re showing a list of users, sales figures, or project reports.

In this tutorial, you will learn how to:

- Build tables using plain HTML
- Style them using CSS
- Create and manipulate tables dynamically using **vanilla JavaScript**

By the end, you’ll understand not just how to do this, but why it matters. You’ll also learn about separating data from presentation, which is at the heart of modern web development.

---

## Creating a Simple Table with HTML

Before we involve JavaScript, let’s first understand how a standard HTML table works.

A table in HTML is built from a few key tags:

| **Tag** | **Description** |
| --- | --- |
| `<table>` | Defines the main table container |
| `<thead>` | Groups the header rows |
| `<tbody>` | Contains the table’s data rows |
| `<tr>` | Defines a row |
| `<th>` | Defines a header cell (bold and centered by default) |
| `<td>` | Defines a data cell |

Here is a minimal example:

```html
<table border="1">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Occupation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Fahim</td>
      <td>25</td>
      <td>Software Engineer</td>
    </tr>
  </tbody>
</table>
```

![Output of the code](https://cdn.hashnode.com/res/hashnode/image/upload/v1760798670028/487aa67e-67db-4d78-b37e-6824ea7cb366.png)

Let me break down that code snippet properly:

- `<table>` starts the table.
- `<thead>` defines the table header section.
- Inside `<thead>`, we have a `<tr>` (table row), which contains `<th>` elements (these are column headers).
- `<tbody>` holds the actual data. Each `<tr>` inside it is one record, and each `<td>` inside that row is a cell.

The `border="1"` attribute gives a thin outline around the cells. It’s useful for visualization when you’re learning about tables.

---

## Understanding and Styling Borders

You might have noticed the `border` attribute in the `<table>` tag:

```html
<table border="1">
```

This is a quick way to add visible outlines. You can even make them thicker, like so:

```html
<table border="5">
```

The above will render thicker borders, like this:

![Output where border=5](https://cdn.hashnode.com/res/hashnode/image/upload/v1760798709116/7225688d-1a13-4199-a527-2001df5705c2.png)

But there is a catch as well…

### Why Using `border` Is Not a Best Practice

The `border` attribute is an old, inline styling technique. Modern web development separates structure (HTML) from presentation (CSS). That means we now use CSS for all visual styling.

Here’s the modern equivalent:

```css
table {
  border-collapse: collapse; /* prevents double borders */
  border: 2px solid #444;
}

th, td {
  border: 1px solid #666;
  padding: 8px;
  text-align: left;
}
```

---

## When to Use HTML vs JavaScript for Tables

You can absolutely create tables entirely in HTML, but only if the data is static.

::: tabs

@tab:active Use <em>HTML</em> only when:

- The data does not change often (like a static price list).
- You know the exact number of rows and columns.
- You are not fetching data from an external source.

@tab Use <em>JavaScript</em> when:

- The data is dynamic (for example, fetched from an API).
- You want to update the table based on user input.
- You want to sort, filter, or paginate your table interactively.

:::

JavaScript lets you build tables programmatically by defining data in an array or object and letting code handle the rendering.

---

## How to Build a Table Dynamically with JavaScript

We will now create a dynamic table using JavaScript. First, I’ll show you the complete code, and then we’ll break it down step-by-step so you can understand exactly what’s happening.

::: tip Code Example

```html :collapsed-lines
<!DOCTYPE html>
<html>
<head>
  <title>JS Table Example</title>
</head>
<body>

<div id="table-container"></div>

<script>
  // Step 1: Define your data
  const data = [
    { name: "Fahim", age: 25, job: "Software Engineer" },
    { name: "Sara", age: 29, job: "Designer" },
    { name: "David", age: 31, job: "Manager" }
  ];

  // Step 2: Create a table element
  const table = document.createElement("table");
  table.border = "1"; // for visibility only

  // Step 3: Add headers
  const headers = ["Name", "Age", "Job"];
  const headerRow = document.createElement("tr");

  headers.forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Step 4: Add data rows
  data.forEach(item => {
    const row = document.createElement("tr");
    Object.values(item).forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  // Step 5: Insert the table into the DOM
  document.getElementById("table-container").appendChild(table);
</script>

</body>
</html>
```

![Table Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1760798906301/10a7abdf-364a-4b9d-9691-17113ef4229a.png)

:::

### Step-by-Step Explanation

#### Step 1: Define the Data – Separating Data from Presentation

In web development, data and presentation should be kept separate. In this context, data is the content (like names, ages, jobs) and presentation is how that data looks (HTML table layout, colors, and so on).

We define our data as an array of objects:

```js
const data = [
  { name: "Fahim", age: 25, job: "Software Engineer" },
  { name: "Sara", age: 29, job: "Designer" },
  { name: "David", age: 31, job: "Manager" }
];
```

This structure keeps our data flexible. If you later fetch it from an API or database, your table-rendering logic stays the same.

It also mirrors how modern frameworks (like React or Vue) work: your UI simply renders what is in your data.

#### Step 2: Create the Table Element

```js
const table = document.createElement("table");
table.border = "1";
```

Here we are using `document.createElement()`, a DOM API method that programmatically creates elements. We have not added it to the page yet. It’s just stored in memory.

So why build it in memory first? Well, it’s faster. Appending many elements to the DOM one-by-one causes reflows (browser recalculating layout). Building the structure first and appending once at the end reduces layout recalculations and improves performance.

#### Step 3: Add the Header Row

```js
const headers = ["Name", "Age", "Job"];
const headerRow = document.createElement("tr");

headers.forEach(text => {
  const th = document.createElement("th");
  th.textContent = text;
  headerRow.appendChild(th);
});
table.appendChild(headerRow);
```

Here, we loop through the header labels and dynamically create `<th>` cells.

We generate headers automatically because if you later load data from a JSON file, you can automatically extract column names using `Object.keys(data[0])`. This avoids hardcoding and makes your table generation more flexible.

#### Step 4: Populate the Data Rows

```js
data.forEach(item => {
  const row = document.createElement("tr");
  Object.values(item).forEach(value => {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
  });
  table.appendChild(row);
});
```

We loop through every data object, create a `<tr>` for each, and then fill in `<td>` cells for each value. `textContent` ensures we safely insert text (no HTML injection).

#### Step 5: Insert the Table into the DOM

```js
document.getElementById("table-container").appendChild(table);
```

This is where our table finally appears on the page. We select the empty `<div>` (our placeholder) and append the built table to it.

JavaScript does not automatically add tables. It only creates them because we told it to. The `appendChild()` call is what actually adds it to the live DOM.

### Why This Approach Is Better

Using JavaScript to generate tables has several benefits:

1. **Reusability:** You can reuse the same code for any dataset – just change the array.
2. **Separation of concerns:** Data (JS), structure (HTML), and design (CSS) are all handled independently.
3. **Performance:** Building tables in memory before appending avoids costly DOM reflows.
4. **Interactivity:** You can easily add features like sorting, filtering, or highlighting rows.
5. **Dynamic data:** It is the natural approach when fetching JSON data from APIs.

---

## How to Add CSS Classes for Styling

Instead of inline styling, we’ll use classes for better organization:

```js
table.classList.add("data-table");
```

Then we’ll define our styles in CSS:

```css
.data-table {
  border-collapse: collapse;
  border: 2px solid #333;
  width: 100%;
}

.data-table th, .data-table td {
  border: 1px solid #888;
  padding: 10px;
}
```

When we say “use them,” we are referring to CSS class names – reusable identifiers that let you style your elements separately from your JavaScript logic.

---

## How to Turn It Into a Reusable Function

Finally, let’s make this process reusable. We can wrap everything in a function that generates any table given some data and headers.

```js
function createTable(data, headers, containerId) {
  const table = document.createElement("table");

  const headerRow = document.createElement("tr");
  headers.forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  data.forEach(item => {
    const row = document.createElement("tr");
    Object.values(item).forEach(value => {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  document.getElementById(containerId).appendChild(table);
}
```

Then use it like this:

```js
createTable(data, ["Name", "Age", "Job"], "table-container");
```

### When and Why to Use a Function

This pattern is ideal when you need to generate multiple tables on one page, you want cleaner, modular, and testable code, or you plan to integrate with dynamic data sources (like APIs).

---

## Final Thoughts & Conclusion

We have covered a lot! In this article, so let’s recap what you learned:

- How to create a table with HTML
- How to style it properly using CSS
- When to use HTML vs JavaScript
- How to separate data from presentation
- How to generate tables dynamically with JavaScript
- How to make your code reusable and efficient

With these foundations, you can now build tables that are dynamic, styled, and data-driven - using nothing but vanilla JavaScript.

::: info

Thank you for reading the entire article. I hope you have gained some insight into how to make a subtle transition from typical HTML tables to dynamic JavaScript-based tables. To get more content like this, you can follow me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`fahimfba`)](https://linkedin.com/in/fahimfba/) and [X (<VPIcon icon="fa-brands fa-x-twitter"/>`Fahim_FBAFahim_FBA`)](https://x.com/Fahim_FBA). You can also check [<VPIcon icon="fas fa-globe"/>my website](https://fahimbinamin.com/) and follow me on [GitHub (<VPIcon icon="iconfont icon-github"/>`FahimFBA`)](https://github.com/FahimFBA) if you are into open source and development.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create and Style Tables with Vanilla JavaScript",
  "desc": "Tables are one of the most useful ways to display structured data, whether you’re showing a list of users, sales figures, or project reports. In this tutorial, you will learn how to: Build tables using plain HTML Style them using CSS Create and ma...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-and-style-tables-with-vanilla-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
