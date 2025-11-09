---
lang: en-US
title: "What is TOON? How Token-Oriented Object Notation Could Change How AI Sees Data"
description: "Article(s) > What is TOON? How Token-Oriented Object Notation Could Change How AI Sees Data"
icon: fa-brands fa-node
category:
  - Node.js
  - Python
  - TOON
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - py
  - python
  - toon
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is TOON? How Token-Oriented Object Notation Could Change How AI Sees Data"
    - property: og:description
      content: "What is TOON? How Token-Oriented Object Notation Could Change How AI Sees Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-toon-how-token-oriented-object-notation-could-change-how-ai-sees-data.html
prev: /proigramming/js-node/articles/README.md
date: 2025-11-14
isOriginal: false
author:
  - name: Tapas Adhikary
    url : https://freecodecamp.org/news/author/atapas/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762978794293/e75f145b-a418-458e-8a41-12fe3add0107.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/proigramming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/proigramming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is TOON? How Token-Oriented Object Notation Could Change How AI Sees Data"
  desc="JSON, or JavaScript Object Notation, was popularized by Douglas Crockford in early 2000. Since then, there’s been no looking back. JSON has become the standardized data exchange format between client and server technologies. JSON was built for humans..."
  url="https://freecodecamp.org/news/what-is-toon-how-token-oriented-object-notation-could-change-how-ai-sees-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762978794293/e75f145b-a418-458e-8a41-12fe3add0107.png"/>

`JSON`, or JavaScript Object Notation, was popularized by Douglas Crockford in early 2000. Since then, there’s been no looking back. JSON has become the standardized data exchange format between client and server technologies.

JSON was built for humans. It’s readable, accessible, and universal for APIs to consume data or return responses. But in the modern era of AI, a downside of JSON has really come to light: it’s quite verbose.

Every brace, every quote, and every repeated key consumes tokens. If you spend time building apps that talk to large language models (LLMs), you’ll likely know that tokens are the currency of LLM interactions. The more tokens, the more costly your AI solution is going to be.

Now, there is a new kid in town called `TOON` (Token-Oriented Object Notation). It promises to enable LLMs to talk to structured data more efficiently, intelligently, and cost-effectively.

This article is the result of my curiosity in exploring TOON. I wanted to learn why it’s trending, how it works, and how you can use it today in your JavaScript/TypeScript and Python projects. I hope you find this equally exciting as I do.

You can find all the source code used in this article in [this GitHub Repository (<VPIcon icon="iconfont icon-github"/>`tapascript/toon-and-json`)](https://github.com/tapascript/toon-and-json).

---

## What is Toon?

TOON is a new data serialization format designed with a code objective:

> Reduce the number of tokens when exchanging structured data with language models.

While JSON uses verbose syntax with braces, quotes, and commas, TOON relies on a token-efficient tabular style, which is much closer to how LLMs naturally understand structured data.

Let’s make a quick comparison between JSON and TOON:

Here is some JSON with a `users` array that contains information about two users (two objects):

```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}
```

If you wanted to represent the same data in TOON, it would look like this:

```toon
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

Did you notice the differences?

- No quotes, braces, or colons in TOON.
- The `users[2]{id,name,role}:` declares an array of two objects with the fields id, name, and role.
- The lines below are simply the data rows.

:::

You can see that TOON visibly reduced the token usage by 30-50%, depending on the data shape.

---

## Why is TOON Important Now?

LLMs like GPT, Gemini, and Claude are token-based systems. Each word, symbol, or chunk costs tokens for input and output. So, if you’re preparing an LLM with structured data input/output like this:

```json
{ "products": [ ... 300, "items" ... ] }
```

You might waste thousands of tokens in quotes, braces, colons, and repeated keys. TOON solves that by focusing on a compact yet structured representation.

Some of the key benefits of TOON are:

- 30-50% fewer tokens for uniform data sets.
- It has less syntactic clutter, which makes it easier for LLMs to reason about.
- It can be nested as we do with JSON.
- Works well with languages like Python, Go, Rust, and JavaScript.

:::

TOON is a great augmentation to JSON, especially for AI projects, LLMs, and data-heavy prompts. It may not replace JSON entirely, but it’s suitable for use cases where JSON is considered heavyweight for data exchange.

---

## JSON vs TOON – Learn With Examples

Now that you have a basic idea of what TOON does and why it’s helpful, let’s look at some of the most used JSON structures and their equivalent representation in TOON.

### 1. A Simple Object

Here’s how you’d represent an object with JSON:

```json
{ "name": "Alice", "age": 30, "city": "Bengaluru" }
```

And here’s how it works with TOON:

```toon
name: Alice
age: 30
city: Bengaluru
```

### 2. Array of Values

With JSON:

```json
{ "colors": ["red", "green", "blue"] }
```

With TOON:

```toon
colors[3]: red,green,blue
```

### 3. Array of Objects

With JSON:

```json
{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}
```

With TOON:

```toon
users[2]{id,name}:
  1,Alice
  2,Bob
```

Here, `users[2]{id,name}` represents the schema, and the lines following it contain the actual data rows.

![TOON Schema](https://cdn.hashnode.com/res/hashnode/image/upload/v1762968459600/03584141-37ae-429d-a999-99ffb93acdcc.png)

### 4. Nested Objects

With JSON:

```json
{
  "user": {
    "id": 1,
    "name": "Alice",
    "profile": { "age": 30, "city": "Bengaluru" }
  }
}
```

With TOON:

```toon
user:
  id: 1
  name: Alice
  profile:
    age: 30
    city: Bengaluru
```

Indentation represents nesting. It’s almost YAML-like, but it’s still structured.

### 5. Array of Objects With Nested Fields

With JSON:

```json
{
  "teams": [
    {
      "name": "Team Alpha",
      "members": [
        { "id": 1, "name": "Alice" },
        { "id": 2, "name": "Bob" }
      ]
    }
  ]
}
```

With TOON:

```toon
teams[1]:
  - name: Team Alpha
    members[2]{id,name}:
      1,Alice
      2,Bob
```

This is still perfectly understandable, and much smaller than the JSON format.

Now that you know a bit about TOON syntax, let’s see how to use it with different programming languages.

---

## How to Use TOON With JavaScript / TypeScript

In most cases, TOON is not meant to be handwritten. Most TOON data will be generated automatically by software, or you’ll need to encode existing data (say, JSON data) into the TOON format.

And there’s good news – [TOON (<VPIcon icon="iconfont icon-github"/>`toon-format`)](https://github.com/toon-format) already has an official NPM package that you can use in your JavaScript/TypeScript project to convert your JSON data to TOON and vice versa.

Install it using the following command:

```sh
npm install @toon-format/toon # Or yarn add, pnpm install, etc
```

The easiest way to create TOON code is by converting JSON to TOON. You can use the `encode()` method from the above-mentioned NPM package:

```js
import { encode } from "@toon-format/toon";

const data = {
  users: [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
  ],
};

const toonString = encode(data);
console.log(toonString);
```

```toon title="output"
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

To do the reverse (TOON => JSON), you need to use the `decode()` method:

```js
import { decode } from "@toon-format/toon";

const toonString = `
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
`;

const jsonObject = decode(toonString);
console.log(jsonObject);
```

```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}
```

You can check out [this sandbox (<VPIcon icon="iconfont icon-codesandbox"/>`javascript-forked-n4zsww`)](https://codesandbox.io/p/sandbox/javascript-forked-n4zsww) and try out a few encoding and decoding examples.

---

## How to Use Toon With Python

Using TOON in Python projects is as straightforward as it was with JavaScript/TypeScript. There are Python packages that can encode JSON data to TOON and decode it back to JSON. The `python-toon` package is the most famous one in recent days.

First, open your terminal and install the `python-toon` package:

```sh
pip install python-toon
```

Note that if you’re in a virtual environment, you’ll need to activate it first:

```sh
python -m venv venv
source venv/bin/activate
pip install python-toon
```

That’s it! Now you’re all set to use the methods to encode and decode your data to and from TOON. First, let’s encode JSON data to TOON using Python:

```py
from toon import encode

# A channel object
channel = {"name": "tapaScript", "age": 2, "type": "education"}
toon_output = encode(channel)
print(toon_output)
```

```toon title="output"
name: tapaScript
age: 2
type: education
```

Similarly, we can decode TOON back to JSON:

```py
from toon import decode

toon_string = """
name: tapaScript
age: 2
type: education
"""

python_struct = decode(toon_string)
print(python_struct)
```

```json title="output"
{"name": "tapaScript", "age": 2, "type": "education"}
```

---

## Hold On, JSON Might Still Be Better (In Many Cases)

Let’s make it clear that TOON is NOT a universal replacement for JSON. In fact, you should still prefer JSON in many cases, such as when:

- Your data is deeply nested.
- Your data is irregular (for example, varying object shapes).
- Your application needs strict schema validations or type enforcement.
- NON-AI use cases where JSON still stands out and does its job perfectly.

:::

A hybrid approach may even work better. Keep JSON for your application’s data exchange format with APIs, but convert to TOON when it comes to sending data to LLMs.

---

## The Future of TOON

TOON, though in its infancy, is still getting a lot of attention from the developer community. Its early traction is making it unavoidable to talk about.

TOON has already been explored for:

- Less token overhead for structured training data to fine-tune LLMs.
- Compact data exchange in Agent frameworks.
- Faster data serialization and deserialization between the MCP and AI workflow engines.
- With Serverless AI APIs, where cost and speed matter a lot.

:::

Just as JSON has been a standard for the Web’s data exchange, TOON may soon be standardized for AI data interchange. So next time you craft a prompt or pass structured data to an AI model, try it in the TOON format. You may notice the model gets faster and cheaper.

---

## Before We End…

That’s all! I hope you found this article insightful.

::: info Let’s connect:

- Subscribe to my [YouTube Channel (<VPIcon icon="fa-brands fa-youtube"/>`tapasadhikary`)](https://youtube.com/tapasadhikary).
- Check out my FREE courses, [<VPIcon icon="fas fa-globe"/>40 Days of JavaScript](https://tapascript.io/courses/40-days-javascript) and [<VPIcon icon="fas fa-globe"/>15 Days of React Design Patterns](https://tapascript.io/courses/react-design-patterns).
- Follow on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tapasadhikary`)](https://linkedin.com/in/tapasadhikary/) if you don't want to miss the daily dose of up-skilling tips.
- Join my [<VPIcon icon="fa-brands fa-discord"/>Discord Server](https://discord.gg/zHHXx4vc2H), and let’s learn together.

:::

See you soon with my next article. Until then, please take care of yourself and keep learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is TOON? How Token-Oriented Object Notation Could Change How AI Sees Data",
  "desc": "JSON, or JavaScript Object Notation, was popularized by Douglas Crockford in early 2000. Since then, there’s been no looking back. JSON has become the standardized data exchange format between client and server technologies. JSON was built for humans...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-toon-how-token-oriented-object-notation-could-change-how-ai-sees-data.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
