---
lang: en-US
title: "How to Sort Dates Efficiently in JavaScript"
description: "Article(s) > How to Sort Dates Efficiently in JavaScript"
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
      content: "Article(s) > How to Sort Dates Efficiently in JavaScript"
    - property: og:description
      content: "How to Sort Dates Efficiently in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-sort-dates-efficiently-in-javascript.html
prev: /programming/js/articles/README.md
date: 2025-05-30
isOriginal: false
author:
  - name: Brandon Wozniewicz
    url : https://freecodecamp.org/news/author/scriptedBytes/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748612402734/7124a95d-0a33-4ab6-93d2-d94fc354ae12.png
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

[[toc]]

---

<SiteInfo
  name="How to Sort Dates Efficiently in JavaScript"
  desc="Recently, I was working on a PowerApps Component Framework (PCF) project that required sorting an array of objects by date. The dates were in ISO 8601 format but without a time zone - for example, ”2025-05-01T15:00:00.00”. Without much thought, I wro..."
  url="https://freecodecamp.org/news/how-to-sort-dates-efficiently-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748612402734/7124a95d-0a33-4ab6-93d2-d94fc354ae12.png"/>

Recently, I was working on a PowerApps Component Framework (PCF) project that required sorting an array of objects by date. The dates were in ISO 8601 format but without a time zone - for example, `"2025-05-01T15:00:00.00"`.

Without much thought, I wrote something similar to:

```js
const sorted = data.sort((a, b) => {
  return new Date(a.date) - new Date(b.date);
})
```

This worked fine on small datasets. But the array I was sorting had nearly **30,000 objects**. On a fast development machine, the performance hit was around **100-150ms** - already noticeable when combined with other UI work. When I tested with **4× CPU throttling** in the browser, the delay increased to nearly **400ms**, which more accurately simulates a lower-end device. That's a reasonable approach to ensure your app still performs well for users on slower machines.

Results in browser:

```plaintext title="result"
sort_with_date_conversion: 397.955078125 ms
```

Output with performance throttled by 4x slowdown

In this article, you will learn how to sort dates efficiently in JavaScript. We'll walk through what makes the method above inefficient, as well as a better pattern-especially when dealing with large amounts of data.

---

## Why 400ms *Feels* Slow

According to Jakob Nielsen's classic *"Usability Engineering*" (1993), delays under 100 milliseconds are perceived as instantaneous. Between 100ms and 1,000ms, users start to notice lag - even if it doesn't require UI feedback. In my case, 400ms felt **choppy**, especially since the PCF component was already handling other tasks. It wasn't going to cut it.

---

## Setting Up Our Experiment

Let's simulate this with a simple experiment that stress tests our sorting. We'll create an array of 100,000 ISO-formatted dates, and **we will simulate a 4x performance slowdown in the browser for all scenarios:**

```js :collapsed-lines
// Create an array of 100,000 ISO-format dates
const isoArray = [];
let currentDate = new Date(2023, 9, 1); // October 1, 2023

for (let i = 0; i < 100000; i++) {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  isoArray.push({ date: `${year}-${month}-${day}`, value: i });
  currentDate.setDate(currentDate.getDate() + 1); // advance by one day
}

// Shuffle the array to simulate unsorted input
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(isoArray);
```

---

## The Cost of Date Conversion

Now, let's sort using the `new Date()` method, where each new date is instantiated directly inside the sort method.

```js
console.time('sort_with_date_conversion');

// Sorting by converting each string to a Date object on every comparison
const sortedByDate = isoArray.sort((a, b) => {
  return new Date(a.date) - new Date(b.date);
});

console.timeEnd('sort_with_date_conversion');
```

```plaintext title="Result in browser"
sort_with_date_conversion: 1629.466796875 ms
```

Sorting 100,000 dates took almost 2 seconds.

Almost 2 seconds. Ouch.

---

## The Lexicographical Superpower of ISO 8601

Here’s the critical realization: **ISO 8601 date strings are already lexicographically sortable**. That means we can skip the `Date` object entirely:

```js
console.time('sort_by_iso_string');

// Compare strings directly — thanks to ISO 8601 format
const sorted = isoArray.sort((a, b) => 
  a.date > b.date ? 1 : -1
);

console.timeEnd('sort_by_iso_string');
console.log(sorted.slice(0, 10));
```

```plaintext title="Output in the console"
sort_by_iso_string: 10.549072265625 ms
[
  { date: '2023-10-01', value: 0 },
  { date: '2023-10-02', value: 1 },
  { date: '2023-10-03', value: 2 },
  { date: '2023-10-04', value: 3 },
  { date: '2023-10-05', value: 4 },
  { date: '2023-10-06', value: 5 },
  { date: '2023-10-07', value: 6 },
  { date: '2023-10-08', value: 7 },
  { date: '2023-10-09', value: 8 },
  { date: '2023-10-10', value: 9 }
]
```

From 1600ms down to ~10ms. That's a 160x speedup.

Why is this faster? Because using new Date() inside .sort() results in creating two new Date objects **per comparison**. With 100,000 items and how sort works internally, that's **millions** of object instantiations. On the other hand, when we sort lexicographically, we are simply sorting strings, which is far less expensive.

---

## What If Your Dates *Aren't* ISO Format?

Let's say your dates are in `MM/DD/YYYY` format. Those strings aren't lexicographically sortable, so you'll need to transform them first.

### Transform *then* Sort

```js
console.time('sort_with_iso_conversion_first');

const sortedByISO = mdyArray
  .map((item) => { // First convert to ISO format
    const [month, day, year] = item.date.split('/');
    return { date: `${year}-${month}-${day}`, value: item.value };
  })
  .sort((a, b) => (a.date > b.date ? 1 : -1)); // then sort

console.timeEnd('sort_with_iso_conversion_first');
```

```plaintext title="output"
sort_with_iso_conversion_first: 58.8779296875 ms
```

Still perceived as instantaneous.

### Retaining Original Objects

If you want to keep your original objects (with non-ISO dates), you can use tuples:

```js
console.time('sort_and_preserve_original');

// Create tuples: [sortableDate, originalObject]
const sortedWithOriginal = mdyArray
  .map((item) => {
    const [month, day, year] = item.date.split('/');
    return [`${year}-${month}-${day}`, item]; // return the tuple items
  })
  .sort((a, b) => a[0] > b[0] ? 1 : -1) // sort based on the first item
  .map(([, item]) => item); // Return the original object

console.timeEnd('sort_and_preserve_original');
```

```plaintext title="output"
sort_and_preserve_original: 73.733154296875 ms
```

Still within the boundaries of being perceived as instantaneous.

The original data is preserved and the performance falls well within what is perceived as instantaneous.

::: important Key Takeaways

- **Avoid object creation inside `.sort()`**, especially for large arrays.
- **ISO 8601 strings are lexicographically sortable.** Use string comparison when you can.
- If your date strings aren't sortable, **map them to a sortable form first**, sort, and optionally map them back.
- Minor tweaks in sorting can yield **massive performance gains** - especially in UI components or real-time visualizations.

:::

**Found this helpful?** I work at the intersection of low-code and pro-code development, focusing on building performant apps and helping you reclaim your time through thoughtful automation. Explore more at [<FontIcon icon="fas fa-globe"/>scriptedbytes.com](https://scriptedbytes.com).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Sort Dates Efficiently in JavaScript",
  "desc": "Recently, I was working on a PowerApps Component Framework (PCF) project that required sorting an array of objects by date. The dates were in ISO 8601 format but without a time zone - for example, ”2025-05-01T15:00:00.00”. Without much thought, I wro...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-sort-dates-efficiently-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
