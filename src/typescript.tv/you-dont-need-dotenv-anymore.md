---
lang: en-US
title: "You Don't Need dotenv Anymore"
description: "Article(s) > You Don't Need dotenv Anymore"
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
      content: "Article(s) > You Don't Need dotenv Anymore"
    - property: og:description
      content: "You Don't Need dotenv Anymore"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/you-dont-need-dotenv-anymore.html
prev: /programming/ts/articles/README.md
date: 2025-11-06
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
  name="You Don't Need dotenv Anymore"
  desc="Node.js now has built-in support for loading environment variables from .env files. Learn how to use the native loadEnvFile function and ditch the dotenv dependency for good."
  url="https://typescript.tv/best-practices/you-dont-need-dotenv-anymore"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Node.js now has built-in support for loading environment variables from .env files. Learn how to use the native loadEnvFile function and ditch the dotenv dependency for good.

For years, [<VPIcon icon="fa-brands fa-node"/>`dotenv`](https://npm.im/dotenv) has been the standard for loading environment variables from <VPIcon icon="iconfont icon-dotenv"/>`.env` files. But [<VPIcon icon="fa-brands fa-node"/>Node.js v20.6.0](https://nodejs.org/en/blog/release/v20.6.0) introduced native support, eliminating the need for this dependency.

You can now use the [<VPIcon icon="fa-brands fa-node"/>`loadEnvFile`](https://nodejs.org/docs/api/process.html#processloadenvfilepath) function from `node:process` or the [<VPIcon icon="fa-brands fa-node"/>`--env-file`](https://nodejs.org/docs/latest-v22.x/api/cli.html#--env-filefile) CLI flag. Here's how to make the switch.

---

## The dotenv Approach

The "dotenv" package required installing a dependency, importing it, and calling its config method:

```sh title=".env"
DATABASE_URL=postgresql://localhost/mydb
```

```ts title="main.ts"
import dotenv from 'dotenv';
 
dotenv.config();
 
console.log(process.env.DATABASE_URL);
```

This worked fine but added an external dependency that needed maintenance and updates.

---

## The Node.js Solution

Node.js provides two ways to load <VPIcon icon="iconfont icon-dotenv"/>`.env` files without external dependencies.

### Using the CLI Flag

Use the `--env-file` flag when running your application:

```sh
node --env-file=.env app.js
```

You can specify multiple files, with later files overriding earlier ones:

```sh
node --env-file=.env --env-file=.env.local app.js
```

### Using `loadEnvFile`

Import and call `loadEnvFile` for more control:

```ts title="main.ts"
import { loadEnvFile } from 'node:process';
 
loadEnvFile();
 
console.log(process.env.DATABASE_URL);
```

Specify a custom path if needed:

```ts title="main.ts"
import { loadEnvFile } from 'node:process';
 
loadEnvFile('.env.production');
 
console.log(process.env.DATABASE_URL);
```

---

## Enhancing with `dotenv-defaults`

While Node.js's native `loadEnvFile` works great, you can enhance it with `dotenv-defaults` for a better developer experience. This package lets you create a <VPIcon icon="iconfont icon-dotenv"/>`.env.defaults` file containing sensible default values that work out of the box.

Developers only need to override specific values in their local <VPIcon icon="iconfont icon-dotenv"/>`.env` file rather than configuring every single variable. The defaults file can be committed to version control, providing a solid foundation that everyone relies on.

### Using `dotenv-defaults`

Install it alongside the native solution:

```sh
npm i dotenv-defaults
```

```sh title=".env.defaults"
# Committed to git - safe defaults for development
DATABASE_URL=postgresql://localhost:5432/myapp_dev
API_URL=http://localhost:3000
PORT=3000
LOG_LEVEL=info
CACHE_TTL=3600
```

```sh title=".env"
# In .gitignore - only override what you need
DATABASE_URL=postgresql://localhost:5432/my_custom_db
API_KEY=my-secret-key
```

```ts title="main.ts"
import 'dotenv-defaults/config';
 
console.log(process.env.DATABASE_URL);
```

With this setup, developers can start working immediately with sensible defaults. They only configure the few variables they need to change, like database connection strings or API keys specific to their environment.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "You Don't Need dotenv Anymore",
  "desc": "Node.js now has built-in support for loading environment variables from .env files. Learn how to use the native loadEnvFile function and ditch the dotenv dependency for good.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/you-dont-need-dotenv-anymore.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
