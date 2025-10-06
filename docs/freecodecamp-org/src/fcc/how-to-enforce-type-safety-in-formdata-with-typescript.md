---
lang: en-US
title: "How to Enforce Type Safety in FormData with TypeScript"
description: "Article(s) > How to Enforce Type Safety in FormData with TypeScript"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Enforce Type Safety in FormData with TypeScript"
    - property: og:description
      content: "How to Enforce Type Safety in FormData with TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-enforce-type-safety-in-formdata-with-typescript.html
prev: /programming/ts/articles/README.md
date: 2025-03-10
isOriginal: false
author:
  - name: Olabisi Olaoye
    url : https://freecodecamp.org/news/author/Olabisi09/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741615550682/6e709ad7-f8bb-4d26-acad-02f168d83acc.png
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
  name="How to Enforce Type Safety in FormData with TypeScript"
  desc="When working with the FormData interface in JavaScript, where data is appended as key/value pairs, there's no built-in way to enforce type safety on the keys you append. This can lead to typos, missing keys, and unexpected runtime errors. But in Type..."
  url="https://freecodecamp.org/news/how-to-enforce-type-safety-in-formdata-with-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741615550682/6e709ad7-f8bb-4d26-acad-02f168d83acc.png"/>

When working with the FormData interface in JavaScript, where data is appended as key/value pairs, there's no built-in way to enforce type safety on the keys you append. This can lead to typos, missing keys, and unexpected runtime errors. But in TypeScript, we can solve this by enforcing strict key validation.

I needed this solution myself when sending my form values to an API. I later realized that I had made several typographical errors in more than one key/value pair I was trying to append to my payload. Because FormData accepts any string as a key, I was able to pass in the wrong strings and proceed with the API request.

After this happened, I looked for a way to ensure that TypeScript doesn’t allow those errors.

This article will show you how to make `FormData` keys **type-safe** using TypeScript.

::: note Prerequisites

To get the most out of this article, you should have a basic understanding of the following:

1. JavaScript programming
2. TypeScript fundamentals, especially how interfaces, types, and the `keyof` operator work
3. the FormData interface

:::

If you’re new to TypeScript or FormData, I recommend checking out [<FontIcon icon="iconfont icon-typescript"/>TypeScript’s official documentation](https://typescriptlang.org/docs/) and [<FontIcon icon="fa-brands fa-firefox"/>MDN’s guide on FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) before proceeding.

---

## Step 1: Define Your Allowed Keys

### The Old Way

The default way of appending data with FormData is to do it manually, with plain strings:

```ts
const payload = new FormData();

payload.append("id", "1122");
payload.append("name", "Clark Kent");

payload.append("agge", "36"); // Typo in key is allowed
```

In the code snippet above, you can see that there was a typo when defining a key for `age`. But TypeScript won’t flag it as an error, and this could lead to errors when this data is sent with an API request.

### The Better Way

Instead of manually typing out the keys, define them in an object schema with a TypeScript interface.

```ts
interface MyAllowedData {
  id: number;
  name: string;
  age: number;
}
```

Alternatively, you can define them with types:

```ts
type MyAllowedData = {
  id: number;
  name: string;
  age: number;
}
```

You can use either types or interfaces, it’s just a matter of preference. You can find out more about how they differ in this [<FontIcon icon="iconfont icon-typescript"/>official TypeScript documentation playground](https://typescriptlang.org/play/?#example/types-vs-interfaces).

Next, define a union type from each key in your interface.

```ts
type MyFormDataKeys = keyof MyAllowedData
// this is the same as `type MyFormDataKeys = 'id' | 'name' | 'age'`
```

The `keyof` operator helps to create a union type of an object type’s keys, so it comes in really handy if you don’t want to manually define a union type for a larger object with many keys.

---

## Step 2: Create an Append Helper Function

Now that you’ve defined your strictly-typed keys, the next step is to create a helper function that ensures only valid keys are appended to FormData.

```ts
function appendToFormData (formData: FormData, key: MyFormDataKeys, value: string) {
  formData.append(key, value);
};
```

The `appendToFormData` function takes in three arguments. Here’s how it all works:

- The first argument, `formData`, is an instance of the FormData object. This is where key/value pairs will be appended before sending them in an API request.
- The second argument, `key`, is the key name of the field you want to append. Its type is of `MyFormDataKeys`, the union type we created to ensure only those keys we defined are appended to FormData.
- The third argument is a string `value` which represents the value to be appended with the key.

Note that **FormData only accepts the** `string` **and** `Blob` **types as values** in each key/value pair. In this guide, we’re only working with string values - but keep in mind that you can use blob values for appending files to API requests.

Now, let’s test out the function:

```ts
const payload = new FormData();

appendToFormData(payload, "id", "19282"); // ✅ Allowed
appendToFormData(payload, "name", "Lenny Brown"); // ✅ Allowed
appendToFormData(payload, "age", "20"); // ✅ Allowed

appendToFormData(payload, "someOtherKey", "89"); // ❌ TypeScript Error: Argument of type 'someOtherKey' is not assignable.
```

---

## Step 3: Use the Helper Function after Form Submission

Now let’s append our fields to FormData before sending them to an API.

```ts
const handleSubmitForm = () => {
  const payload = new FormData();
   appendToFormData(payload, "id", "19282");
   appendToFormData(payload, "name", "Lenny Brown");
   appendToFormData(payload, "age", "20");

  // Send payload via API
  fetch("/api/submit", { method: "POST", body: payload });
};
```

### Appending Fields from an Object

Alternatively, if you already have your entire payload in an object, you can avoid appending each field one by one by implementing the function like this:

```ts
const handleSubmitForm = () => {
  // all your fields in an object
  const formValues: MyAllowedData = {
    id: 1123,
    name: 'John Doe',
    age: 56
  }
  const payload = new FormData();

  Object.entries(formValues).forEach(([key, value]) => {
    appendToFormData(payload, key as MyFormDataKeys, `${value}`); // use template literals to pass in value
  });

  // Send payload via API
  fetch("/api/submit", { method: "POST", body: payload });
};
```

In the snippet above, we’re using `Object.entries` to iterate over each key/value pair in an object so it can be appended to the FormData object. Note that the value in each pair, whether it’s a string or a number, is passed as a string using [<FontIcon icon="fa-brands fa-firefox"/>template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to prevent a TypeScript type mismatch from the `value` argument in our helper function.

---

## Conclusion

By leveraging TypeScript’s `keyof` operator, we can make `FormData.append()` fully type-safe. This simple technique helps prevent key mismatches and makes your API requests more reliable.

Let me know your thoughts about the article, and feel free to make any suggestions you think could improve my solution.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Enforce Type Safety in FormData with TypeScript",
  "desc": "When working with the FormData interface in JavaScript, where data is appended as key/value pairs, there's no built-in way to enforce type safety on the keys you append. This can lead to typos, missing keys, and unexpected runtime errors. But in Type...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-enforce-type-safety-in-formdata-with-typescript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
