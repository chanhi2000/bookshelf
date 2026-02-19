---
lang: en-US
title: "Parsing CSV Files in TypeScript with Papa Parse"
description: "Article(s) > Parsing CSV Files in TypeScript with Papa Parse"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Parsing CSV Files in TypeScript with Papa Parse"
    - property: og:description
      content: "Parsing CSV Files in TypeScript with Papa Parse"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/parsing-csv-files-in-typescript-with-papa-parse.html
prev: /programming/ts/articles/README.md
date: 2024-08-30
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Parsing CSV Files in TypeScript with Papa Parse"
  desc="Master CSV parsing in TypeScript with Papa Parse. Install, import, and start effortlessly parsing CSV data. Customize headers, delimiters, and data types. Process large files efficiently using readable streams."
  url="https://typescript.tv/hands-on/parsing-csv-files-in-typescript-with-papa-parse"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Master CSV parsing in TypeScript with Papa Parse. Install, import, and start effortlessly parsing CSV data. Customize headers, delimiters, and data types. Process large files efficiently using readable streams.

Parsing CSV (Comma-Separated Values) files is a common task in many web applications. Whether you need to import data into your system, process large datasets, or simply read data from a CSV file, a reliable parser is essential. In this tutorial, we'll explore how to parse CSV files in TypeScript using Papa Parse, a powerful and popular library for CSV parsing.

---

## What is Papa Parse?

Papa Parse is a fast, developer-friendly CSV parser for both browser and Node.js environments. It supports local and remote file parsing, handles type conversions, processes large files through readable streams, and easily converts CSV data into JSON objects. With available TypeScript typings, it can also return typed data.

---

## Getting Started

First, you'll need to install Papa Parse and its TypeScript types in your project:

```sh
npm i papaparse @types/papaparse
```

Once installed, you can import Papa Parse into your TypeScript file and start parsing CSV data.

---

## Parsing Data from a CSV File

Let's start with a simple example of parsing CSV data from a CSV file:

```csv title="users.csv"
First Name;Last Name;Age
 
Benny;Neugebauer;37
Lara;Croft;56
Zoe;Schiefer;38
```

As you can see, the file contains header information, empty lines, and includes both text and numbers. With Papa Parse's [<VPIcon icon="fas fa-globe"/>configuration options](https://papaparse.com/docs#config), nothing of this will become a problem.

::: tip Example

```ts :collapsed-lines
import fs from 'node:fs';
import Papa from 'papaparse';
 
// Expected Type
type User = {
  Age: number;
  'First Name': string;
  'Last Name': string;
};
 
const file = fs.readFileSync('./users.csv', 'utf8');
 
const parsed = Papa.parse<User>(file, {
  delimiter: ';',
  dynamicTyping: true,
  header: true,
  skipEmptyLines: true,
});
 
const { data } = parsed;
 
console.log(data.length); // 3
console.log(data[0]?.['First Name']); // "Benny"
console.log(data[1]?.['First Name']); // "Lara"
console.log(data[1]?.Age); // 56
console.log(typeof data[1]?.Age); // "number"
```

:::

Receiving data from the CSV file is straightforward. With the `header: true` setting, the header names become the property names of the retrieved data. Additionally, the `dynamicTyping: true` setting ensures that numbers are parsed as the `number` data type, rather than plain strings. Empty lines in the CSV file are not an issue, and delimiters can be customized.

The best part is that the `Papa.parse` function is generic and supports type arguments in TypeScript. By passing the `User` type, we receive typed data in return.

---

## Parsing Large CSV Files

When parsing files, all data is often loaded into memory at once. This method can be inefficient for large files and consume significant memory. To handle large files more efficiently, use readable streams. Papa Parse supports this approach, enabling you to pass a stream with callback functions to process data in batches.

::: tip Example

```ts :collapsed-lines
import fs from 'node:fs';
import Papa from 'papaparse';
 
type User = {
  Age: number;
  'First Name': string;
  'Last Name': string;
};
 
const stream = fs.createReadStream('./users.csv', 'utf8');
 
Papa.parse<User>(stream, {
  delimiter: ';',
  dynamicTyping: true,
  header: true,
  skipEmptyLines: true,
  complete: () => {
    console.log('Finished parsing');
  },
  error: (error) => {
    console.error(error);
  },
  step: (results) => {
    console.log(results.data['First Name']);
  },
});
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Parsing CSV Files in TypeScript with Papa Parse",
  "desc": "Master CSV parsing in TypeScript with Papa Parse. Install, import, and start effortlessly parsing CSV data. Customize headers, delimiters, and data types. Process large files efficiently using readable streams.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/parsing-csv-files-in-typescript-with-papa-parse.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
