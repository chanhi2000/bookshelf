---
lang: en-US
title: "Use TypeScript generators for cleaner programming"
description: "Article(s) > Use TypeScript generators for cleaner programming"
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
      content: "Article(s) > Use TypeScript generators for cleaner programming"
    - property: og:description
      content: "Use TypeScript generators for cleaner programming"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/use-typescript-generators-for-cleaner-programming.html
prev: /programming/ts/articles/README.md
date: 2024-05-30
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
  name="Use TypeScript generators for cleaner programming"
  desc="Generators help fetch and process data from APIs more granular, improving code modularity and user-friendliness. This tutorial teaches you how to use TypeScript generators for cleaner programming using a real-world example."
  url="https://typescript.tv/hands-on/use-typescript-generators-for-cleaner-programming"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Generators help fetch and process data from APIs more granular, improving code modularity and user-friendliness. This tutorial teaches you how to use TypeScript generators for cleaner programming using a real-world example.

---

## Response Schema Definition

The schema for the API response is defined using [<VPIcon icon="fas fa-globe"/>Zod](https://zod.dev/), which ensures that the fetched data matches the expected structure. This is useful for validating the response:

```ts :collapsed-lines
import { z } from 'zod';
 
// Schema to validate the API response
const ResponseSchema = z.object({
  ticker: z.string(),
  queryCount: z.number(),
  resultsCount: z.number(),
  adjusted: z.boolean(),
  results: z.array(
    z.object({
      v: z.number(),
      vw: z.number(),
      o: z.number(),
      c: z.number(),
      h: z.number(),
      l: z.number(),
      t: z.number(),
      n: z.number(),
    })
  ),
  status: z.string(),
  request_id: z.string(),
  count: z.number(),
  next_url: z.string().optional(),
});
 
type ResponseType = z.infer<typeof ResponseSchema>;
```

Pay attention to the optional `next_url`. It serves as our indicator of whether an API endpoint contains additional results. We will keep fetching more data as long as there is a URL for the next batches, but once it becomes `undefined`, we will cease querying the endpoint.

::: tip

You can easily generate Zod schemas using the [<VPIcon icon="fas fa-globe"/>JSON to Zod Schema converter](https://transform.tools/json-to-zod) from "transform.tools" or the [<VPIcon icon="fa-brands fa-npm"/>`json-to-zod`](https://npmjs.com/package/json-to-zod) npm package.

:::

---

## Traditional Asynchronous Function

In the traditional approach, we use an asynchronous function in TypeScript that handles the fetching, parsing, and looping through the paginated results:

```ts
async function fetchData(address: string, apiKey: string): Promise<ResponseType> {
  const url = new URL(address);
  url.searchParams.append('apiKey', apiKey);
  url.searchParams.append('limit', '200');
  const response = await fetch(url);
  const payload = await response.json();
  const parsed = ResponseSchema.parse(payload);
  return parsed;
}
 
const apiKey = 'top-secret';
const resource = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-01-09/2023-01-09';
 
let next_url: string | undefined = resource;
while (next_url) {
  const chunk = await fetchData(next_url, apiKey);
  console.log(chunk.results.length, chunk.next_url);
  next_url = chunk.next_url;
}
```

The `fetchData` function holds the business logic to query data, while dealing with the next URL is tackled outside this function. As a result, the executing code must be aware of the internal details of the endpoint. This leads to poor encapsulation and makes it harder to manage for more complex asynchronous flows.

---

## Generator Function Approach

In the generator approach, we create an async generator function to yield the results, making it easier to handle each chunk of data separately:

```ts{3,9,17,20}
async function* fetchData(address: string, apiKey: string): AsyncGenerator<ResponseType> {
  let url: URL | undefined = new URL(address);
  while (url) {
    url.searchParams.append('apiKey', apiKey);
    url.searchParams.append('limit', '200');
    const response = await fetch(url);
    const payload = await response.json();
    const parsed = ResponseSchema.parse(payload);
    yield parsed;
    parsed.next_url ? (url = new URL(parsed.next_url)) : (url = undefined);
  }
}
 
const apiKey = 'top-secret';
const resource = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-01-09/2023-01-09';
 
const dataGenerator = fetchData(resource, apiKey);
for await (const chunk of dataGenerator) {
  console.log(chunk.results.length, chunk.next_url);
}
```

The generator also separates **data fetching logic** (keeping track of the `url`) from the **iteration logic** (`for await...of` loop). This approach makes the code more modular and user-friendly, as the consuming code no longer needs to update the `next_url`.

It's even possible to return each response individually instead of yielding parsed data in batches of 200. This way, each call to `yield` will provide a single result item:

```ts
for (const result of parsed.results) {
  yield result;
}
```

Be aware that you need to adjust the returned result type accordingly:

```ts{2,4}
type ResponseType = z.infer<typeof ResponseSchema>;
type ResultType = ResponseType['results'][0];
 
async function* fetchData(address: string, apiKey: string): AsyncGenerator<ResultType> {
  // ...
}
```

---

## Final Result

Below is the complete TypeScript code that defines an async generator function to fetch data from a REST API, parses the response, and yields each individual result item. This approach provides fine-grained control over processing each piece of data:

```ts :collapsed-lines
import { z } from 'zod';
 
const ResponseSchema = z.object({
  ticker: z.string(),
  queryCount: z.number(),
  resultsCount: z.number(),
  adjusted: z.boolean(),
  results: z.array(
    z.object({
      v: z.number(),
      vw: z.number(),
      o: z.number(),
      c: z.number(),
      h: z.number(),
      l: z.number(),
      t: z.number(),
      n: z.number(),
    })
  ),
  status: z.string(),
  request_id: z.string(),
  count: z.number(),
  next_url: z.string().optional(),
});
 
type ResponseType = z.infer<typeof ResponseSchema>;
type ResultType = ResponseType['results'][0];
 
async function* fetchData(address: string, apiKey: string): AsyncGenerator<ResultType> {
  let url: URL | undefined = new URL(address);
  while (url) {
    url.searchParams.append('apiKey', apiKey);
    url.searchParams.append('limit', '200');
    const response = await fetch(url);
    const payload = await response.json();
    const parsed = ResponseSchema.parse(payload);
    for (const result of parsed.results) {
      yield result;
    }
    parsed.next_url ? (url = new URL(parsed.next_url)) : (url = undefined);
  }
}
 
const apiKey = 'top-secret';
const resource = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-01-09/2023-01-09';
 
const dataGenerator = fetchData(resource, apiKey);
for await (const result of dataGenerator) {
  console.log(result);
}
```

::: info Video Tutorial

<VidStack src="youtube/DwRS6f-UzaA" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Use TypeScript generators for cleaner programming",
  "desc": "Generators help fetch and process data from APIs more granular, improving code modularity and user-friendliness. This tutorial teaches you how to use TypeScript generators for cleaner programming using a real-world example.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/use-typescript-generators-for-cleaner-programming.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
