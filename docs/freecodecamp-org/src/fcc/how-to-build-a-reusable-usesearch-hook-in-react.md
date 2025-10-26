---
lang: en-US
title: "How to Build a Reusable useSearch Hook in React"
description: "Article(s) > How to Build a Reusable useSearch Hook in React"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Reusable useSearch Hook in React"
    - property: og:description
      content: "How to Build a Reusable useSearch Hook in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-reusable-usesearch-hook-in-react.html
prev: /programming/js-react/articles/README.md
date: 2025-02-26
isOriginal: false
author:
  - name: Spruce Emmanuel
    url : https://freecodecamp.org/news/author/Spruce/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740494925672/3a87e5a2-5233-4fae-a652-4fbf5b325ded.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Reusable useSearch Hook in React"
  desc="Recently, I needed to add a search feature to a React app. Naturally, I did what many developers would do—I turned to Google for help. The first article I found was about building a search and filter component in React. As I read through it, I couldn..."
  url="https://freecodecamp.org/news/how-to-build-a-reusable-usesearch-hook-in-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740494925672/3a87e5a2-5233-4fae-a652-4fbf5b325ded.png"/>

Recently, I needed to add a search feature to a React app. Naturally, I did what many developers would do—I turned to Google for help.

The first article I found was about building a search and filter component in React. As I read through it, I couldn't help but think, *This is okay, but it misses so many important cases.* Then it hit me—I was the one who wrote that article a few years ago.

Turns out, my past self had some learning to do.

Since then, I've tackled more complex projects and realized that search in React can be so much more powerful, flexible, and efficient. That's why I've developed a reusable useSearch hook that handles everything from large datasets to typo-tolerant searches—and I'm excited to share it with you.

In this article, I'll walk you through building it step by step. By the end, you'll have a high-performance search system that you can drop into any React project, no matter how complex your data gets.

::: note Who Should Read This?

If you’re a React developer, whether you're just getting started or have plenty of experience, you’ve probably run into the limits of basic search features. Maybe your search is sluggish with large datasets, struggles with typos, or isn’t flexible enough to handle different data structures. If that sounds familiar, this guide is for you. We’ll build a high-performance, reusable search system that actually works in real-world apps.

:::

::: important What You’ll Learn

By the end of this guide, you’ll know how to:

- Spot the common pitfalls of simple search implementations.
- Build a powerful `useSearch` hook that works with different data types and nested objects.
- Optimize performance with techniques like debouncing and memoization.
- Improve the user experience with fuzzy search that handles typos.
- Implement pagination to efficiently manage large result sets.

:::

::: note Prerequisites

Before diving in, you should be comfortable with:

- React and JavaScript fundamentals.
- Basic React hooks such as `useState` and `useEffect`.
- Working with arrays and objects in JavaScript.

:::

---

## The Problem With Simple Search Implementations

Let’s start with a basic search component:

```jsx :collapsed-lines
function SimpleSearch() {
  const data = [{ name: "JavaScript" }, { name: "Python" }, { name: "Java" }];

  const [query, setQuery] = useState("");

  const results = data.filter((item) => item.name.includes(query));

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

<CodePen
  user="Spruce_khalifa"
  slug-hash="NPKJyyR"
  title="Simple Search Example in React"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

At first glance, this works fine: you type a query and get matching results. But in real-world applications, search needs to handle much more than just simple string comparisons. Here are some major limitations:

- **Limited data support:** This approach only works with plain strings, making it impractical for complex data structures.
- **No support for nested objects:** If your data has deeper structures (for example, `{ user: { name: "JavaScript" } }`), this won’t work.
- **No typo tolerance:** A slight misspelling like `"javascrpt"` won’t match `"JavaScript"`, which can frustrate users.
- **Performance bottlenecks:** Every keystroke triggers a full re-render, which can cause lag, especially with large datasets.

Clearly, we need something more powerful. Let’s build a better search system that’s flexible, optimized, and user-friendly.

---

## How to Build a Reusable `useSearch` Hook

To overcome these issues, we’ll build a reusable `useSearch` hook that:

- Supports multiple data types (strings, numbers, dates, nested objects).
- Improves performance using debouncing and memoization.
- Handles typos with fuzzy search.

### How to Create the Hook

Let’s start by creating the hook. It takes in data, the search query, and a list of filter functions to apply:

```jsx :collapsed-lines title="hooks/useSearch.jsx"
function useSearch(data, query, ...filters) {
  const debouncedQuery = useDebounce(query, 300);

  return React.useMemo(() => {
    const dataArray = Array.isArray(data) ? data : [data];

    try {
      // Apply each filter function in sequence
      return filters.reduce(
        (acc, feature) => feature(acc, debouncedQuery),
        dataArray
      );
    } catch (error) {
      console.error("Error applying search features:", error);
      return dataArray;
    }
  }, [data, debouncedQuery, filters]);
}
```

### How to Handle the Query with `useDebounce`

Without debouncing, every single keystroke triggers a new search. Imagine typing `"apple"`—each letter (`a`, `p`, `p`, `l`, `e`) fires a search request, causing multiple re-renders and potential performance issues.

To fix this, we used a debounce mechanism in the `useSearch` hook that waits until the user stops typing before running the search. Here’s what the `useDebounce` hook looks like:

```jsx
import React from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
```

This hook ensures that the search only triggers after 300ms of inactivity, preventing unnecessary re-renders and improving responsiveness.

Want to see the difference in action? Compare a debounced search to one that updates on every keystroke in the demo below:

<CodePen
  user="Spruce_khalifa"
  slug-hash="pvzYaXp"
  title="Simple Search Example in React with Debounce"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

### How to Optimize Performance with `React.useMemo`

Filtering large datasets can be expensive, and if our search logic runs every time a component re-renders—even when the search query hasn’t changed—it can slow things down. That’s where `React.useMemo()` comes in.

By wrapping our search logic in `useMemo`, we ensure it only recalculates when the search query, filters, or data actually change:

```jsx
return React.useMemo(() => {
  // Filtering logic
}, [data, debouncedQuery, filters]);
```

But how much of a difference does this make? Imagine a parent component with an unrelated state (like a counter). Every time the parent re-renders, a non-memoized search would still run, even if the query remains the same.

The live demo below compares two search implementations, one without `useMemo` and one with it. Try changing an unrelated state in the parent and see how many times each search runs:

<CodePen
  user="Spruce_khalifa"
  slug-hash="EaYMEar"
  title="Simple Search Example in React with Memoization"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

With `useMemo`, the search logic only runs when the query, filters, or data change, keeping performance smooth and avoiding unnecessary computations.

### How to Chain Filters with `.reduce()`

The hook uses `.reduce()` to sequentially apply each filter function to the data, keeping the logic clean and modular:

```jsx
return filters.reduce(
  (acc, feature) => feature(acc, debouncedQuery), dataArray
);
```

This approach makes it easy to add or remove filters as needed.

---

## How to Create the Filters

Filters add the magic to our search hook by processing the data based on the search query. For this project, I created two filters: one for searching and one for pagination.

### 1. The Search Filter

The search filter checks specified fields in an object for matches with the query. It supports several matching strategies (exact, startsWith, endsWith, contains):

```jsx :collapsed-lines title="utils/search.jsx"
export function search(options) {
  const { fields, matchType } = options;

  return (data, query) => {
    const trimmedQuery = String(query).trim().toLowerCase();

    if (!trimmedQuery) return data;

    return data.filter((item) => {
      const fieldsArray = fields
        ? Array.isArray(fields)
          ? fields
          : [fields]
        : getAllKeys(item);

      return fieldsArray.some((field) => {
        const fieldValue = getFieldValue(item, field);
        if (fieldValue == null) return false;

        const stringValue = convertToString(fieldValue).toLowerCase();

        switch (matchType) {
          case "exact":
            return stringValue === trimmedQuery;
          case "startsWith":
            return stringValue.startsWith(trimmedQuery);
          case "endsWith":
            return stringValue.endsWith(trimmedQuery);
          case "contains":
            return stringValue.includes(trimmedQuery);
          default:
            throw new Error(`Unsupported match type: ${matchType}`);
        }
      });
    });
  };
}
```

Let’s go through it to see how it works:

1. Cleaning up the query:

```jsx
const trimmedQuery = String(query).trim().toLowerCase();

if (!trimmedQuery) {
  return data;
}
```

This makes the search case-insensitive and removes extra spaces.

2. Determining fields to search:

```jsx
const fieldsArray = fields
  ? Array.isArray(fields)
    ? fields
    : [fields]
  : getAllKeys(item);
```

If specific fields aren’t provided, it extracts all keys, including nested ones.

3. Filtering the data:

```jsx
return fieldsArray.some((field) => {
  const fieldValue = getFieldValue(item, field);

  if (fieldValue == null) {
    return false;
  }

  const stringValue = convertToString(fieldValue).toLowerCase();

  // Matching logic based on matchType follows...
});
```

### 2. The Helper Functions

To keep our filtering logic clean and focused, we use a few helper functions. These functions handle common tasks like retrieving keys from an object, getting nested field values, and converting values to strings. This way, our search filter can work with a variety of data structures and types without cluttering the main logic.

#### Extracting all keys with `getAllKeys`:

The `getAllKeys` function scans an object to gather all its keys—even those nested within arrays or sub-objects. If you don't provide specific fields for searching, this function ensures that every potential field is considered.

```jsx :collapsed-lines title="utils/getAllKeys.jsx"
export function getAllKeys(item, prefix = "") {
  if (!item || typeof item !== "object") {
    return [];
  }

  const fields = [];

  for (const key of Object.keys(item)) {
    const value = item[key];
    const fieldPath = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      value.forEach((arrayItem, index) => {
        if (
          arrayItem &&
          typeof arrayItem === "object" &&
          !(arrayItem instanceof Date)
        ) {
          fields.push(...getAllKeys(arrayItem, `${fieldPath}[${index}]`));
        } else {
          fields.push(`${fieldPath}[${index}]`);
        }
      });
    } else if (value instanceof Date) {
      fields.push(fieldPath);
    } else if (value && typeof value === "object") {
      fields.push(...getAllKeys(value, fieldPath));
    } else {
      fields.push(fieldPath);
    }
  }

  return fields;
}
```

#### Retrieving field values with `getFieldValue`:

The `getFieldValue` function extracts the value of a given field from an object using a path string (like `"user.name"` or `"items[0].title"`). It splits the path into individual keys and then traverses the object step by step to find the correct value.

```jsx :collapsed-lines title="utils/getFieldValue.jsx"
export function getFieldValue(item, field) {
    const keys = field.split(/[.[]]/).filter(Boolean);
    let value = item;

    for (const key of keys) {
        if (value == null) {
            return null;
        }
        value = value[key];
    }

    return value;
}
```

#### Converting values to strings with `convertToString`

For our search comparisons, we need to ensure all data is in string format. The `convertToString` function handles this conversion. It turns dates into ISO strings and booleans into `"true"` or `"false"`, ensuring a uniform format for our search filter.

```jsx title="utils/convertToString.js"

export function convertToString(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  return String(value);
}
```

### 3. The Pagination Filter

For large datasets, displaying all results at once isn't practical. The pagination filter helps by returning only a subset of the data based on the current page and the number of items per page. This not only improves performance but also makes the data more manageable for users.

In this function, we calculate the starting index by using the current page number and page size. Then, we use the JavaScript `slice` method to pick out only the items that belong to that specific page. Although the query parameter is present, it isn’t used here—it’s just for keeping the hook's interface consistent.

```jsx title="utils/paginate.jsx"
export function paginate(options) {
  const { page = 1, pageSize = 10 } = options;

  return (data, query) => {
    // Query is not used here; it’s only for compatibility with our hook.
    const startIndex = (page - 1) * pageSize;

    return data.slice(startIndex, startIndex + pageSize);
  };
}
```

In this code, the pagination filter efficiently slices the data array, so you only get the subset of results that you want to display on the current page.

<CodePen
  user="Spruce_khalifa"
  slug-hash="bNbZQNW"
  title="Fuzzy Search Example in React"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## How to Use the Hook with Search and Pagination Filters

Now that we have both the search and pagination filters set up, let’s see how to use them in a React component.

First, import the custom `useSearch` hook and the filter functions:

```jsx
import useSearch from "./hooks/useSearch.js";
import search from "./utils/search.js";
import paginate from "./utils/paginate.js";
```

Next, create a component that uses these filters. In this example, we have an array of items, and we want to search by name and display a fixed number of results per page. We also reset to the first page whenever a new search query is entered.

```jsx :collapsed-lines title="components/SearchComponent"
function SearchComponent() {
  // Example data array
  const data = [
    { name: "JavaScript" },
    { name: "Python" },
    { name: "Java" },
    { name: "Ruby" },
    // Imagine more data here
  ];

  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 3; // Items per page

  // Apply both search and pagination filters with our custom hook.
  const results = useSearch(
    data,
    query,
    search({
      fields: ["name"],
      matchType: "contains", // Options: "exact", "startsWith", etc.
    }),
    paginate({ page, pageSize })
  );

  // Compute total pages based on filtered results (without pagination)
  const filteredData = search({ fields: ["name"], matchType: "contains" })(
    data,
    query
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Search and Pagination</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1); // Reset to first page on new search
        }}
        placeholder="Search by name..."
        style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
      />
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{ padding: "6px 12px", marginRight: "10px" }}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
          style={{ padding: "6px 12px", marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

To see this in action and try it for yourself, check out the live demo below:

<CodePen
  user="Spruce_khalifa"
  slug-hash="xbKerxQ"
  title="Search with Pagination Example in React using our custom useSearch"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## How to Handle Typos in Search

Search is one of the oldest features on the web, but that doesn’t mean users always get it right. In fact, typos are incredibly common. Imagine a user searching for "PlayStation," but they accidentally type "PlauStation" instead. They still expect to see relevant results, and our search system should be forgiving enough to handle these small mistakes.

To achieve this, we are going to use a fuzzy search technique that matches similar words even if they’re not spelled exactly the same. We’ll implement this using an **n-gram similarity algorithm**, which breaks words into smaller segments (n-grams) and compares them to find matches.

### Step 1: Building the n-gram Similarity Algorithm

The n-gram similarity algorithm works by splitting both the search query and dataset values into small overlapping character sequences (n-grams) and comparing them:

```jsx title="utils/nGramFuzzySearch.jsx"
export const nGramFuzzySearch = (value, query) => {
  const n = 2; // Default to bigrams (two-character sequences)

  const valueGrams = generateNGrams(value.toLowerCase(), n);
  const queryGrams = generateNGrams(query.toLowerCase(), n);

  const intersection = valueGrams.filter((gram) => queryGrams.includes(gram));

  return intersection.length / Math.max(valueGrams.length, queryGrams.length);
};

const generateNGrams = (str, n) => {
  const grams = [];

  for (let i = 0; i <= str.length - n; i++) {
    grams.push(str.slice(i, i + n));
  }

  return grams;
};
```

Here is how this will work if you try searching for query PlauStation and the product name is PlayStation:

First, the algorithm will generate bigrams (two-letter sequences) for both words:

`PlayStation` → `["pl", "la", "ay", "ys", "st", "ta", "at", "ti", "io", "on"]`  
`PlauStation` → `["pl", "la", "au", "us", "st", "ta", "at", "ti", "io", "on"]`

Then, it calculates the similarity based on the number of overlapping bigrams. The higher the overlap, the closer the match. Since most bigrams match, the algorithm calculates a high similarity score, allowing it to recognize "PlauStation" as a likely match for "PlayStation", even with minor typos.

### Step 2: Adding Fuzzy Search into the Search Filter

Now, update your search filter to support a new `matchType` for fuzzy search:

```jsx :collapsed-lines title="utils/search.jsx"
import { nGramFuzzySearch } from "./nGramFuzzySearch";

export function search(options) {
  const { fields, matchType } = options;

  return (data, query) => {
    const trimmedQuery = String(query).trim().toLowerCase();

    if (trimmedQuery === "") {
      return data;
    }

    return data.filter((item) => {
      const fieldsArray = fields
        ? Array.isArray(fields)
          ? fields
          : [fields]
        : getAllKeys(item);

      return fieldsArray.some((field) => {
        const fieldValue = getFieldValue(item, field);
        if (fieldValue == null) {
          return false;
        }

        const stringValue = convertToString(fieldValue).toLowerCase();

        switch (matchType) {
          case "exact":
            return stringValue === trimmedQuery;
          case "startsWith":
            return stringValue.startsWith(trimmedQuery);
          case "endsWith":
            return stringValue.endsWith(trimmedQuery);
          case "contains":
            return stringValue.includes(trimmedQuery);
          case "fuzzySearch": {
            const threshold = 0.5; // Minimum similarity score required
            const score = nGramFuzzySearch(stringValue, trimmedQuery);
            return score >= threshold;
          }
          default:
            throw new Error(`Unsupported match type: ${matchType}`);
        }
      });
    });
  };
}
```

### Step 3: Using Fuzzy Search in the `useSearch` Hook

Now you can enable fuzzy search simply by passing `fuzzySearch` as the `matchType`:

```jsx
const results = useSearch(
  data,
  query,
  search({
    fields: ["name"],
    matchType: "fuzzySearch",
  })
);
```

Try it out on this [Live Demo (<VPIcon icon="fa-brands fa-codepen"/>`Spruce_khalifa`)](https://codepen.io/Spruce_khalifa/pen/bNbZQNW?editors=0011) to see how even with a typo like `"PlauStation"`, your app still finds `"PlayStation"`.

<CodePen
  user="Spruce_khalifa"
  slug-hash="bNbZQNW"
  title="Fuzzy Search Example in React"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## How to Use the Ready-Made `useSearch` Hook

If you’d rather not build everything from scratch, I've got you covered. I’ve published a fully typed, optimized version of the `useSearch` hook on npm, called [<VPIcon icon="fa-brands fa-npm"/>`use-search-react`](https://npmjs.com/package/use-search-react#paginate). This package not only handles search but also comes with built-in support for sorting, pagination, grouping, and multiple fuzzy search algorithms so you can focus on building your app instead of reinventing the wheel.

### How to Use it in Your Component

#### Step 1: Install the hook

Simply install the package using npm:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add use-search-react
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm i use-search-react
```

:::

#### Step 2: Import and use the hook

Using the hook in your component is straightforward. For example, consider the following component that uses the hook to perform a fuzzy search on an array of data:

```jsx
import { useSearch, search } from "use-search-react";
import { useState } from "react";

function SearchComponent() {
  const [query, setQuery] = useState("");

  const data = [{ name: "JavaScript" }, { name: "Python" }, { name: "Java" }];

  // The 'search' function here is configured to perform a fuzzy search.
  const results = useSearch(
    data,
    query,
    search({
      fields: ["name"],
      matchType: "fuzzy",
    })
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

This example shows how easy it is to use the hook in your React component. The package is built to handle even very large datasets—tens of thousands of records—while keeping your application responsive and efficient.

Here is an example of it working with ten thousand records of data

<CodePen
  user="Spruce_khalifa"
  slug-hash="xbKeZYg"
  title="Search Example in React handling large data"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

For more detailed usage and additional configuration options (like pagination, sorting, or grouping), check out the full documentation on npm: [<VPIcon icon="fa-brands fa-npm"/>`use-search-react` Docs](https://npmjs.com/package/use-search-react).

---

## Conclusion

Building a search system in React is more than just filtering data. It's about crafting an experience that feels intuitive and responsive for your users.

In this article, you learned how to build a custom `useSearch` hook that can address common challenges like performance issues, handling nested data, and even forgiving user typos with fuzzy search. We also looked at how to use pagination to manage large datasets.

Whether you decide to build your own from scratch or use the fully typed, ready-made version available on npm, you now have the search functionality that you can easily drop in any of your React projects.

Take these ideas, experiment with them, and adjust the implementation to fit your specific needs.

If you have any questions, feel free to find me on Twitter at [<VPIcon icon="fa-brands fa-x-twitter"/>`@sprucekhalifa`](https://x.com/sprucekhalifa), and don’t forget to follow me for more tips and updates. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Reusable useSearch Hook in React",
  "desc": "Recently, I needed to add a search feature to a React app. Naturally, I did what many developers would do—I turned to Google for help. The first article I found was about building a search and filter component in React. As I read through it, I couldn...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-reusable-usesearch-hook-in-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
