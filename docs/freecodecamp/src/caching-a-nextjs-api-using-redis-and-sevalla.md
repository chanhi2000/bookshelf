---
lang: en-US
title: "Caching a Next.js API using Redis and Sevalla"
description: "Article(s) > Caching a Next.js API using Redis and Sevalla"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - DevOps
  - Sevella
  - Data Science
  - Redis
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - devops
  - sevella
  - data-science
  - redis
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Caching a Next.js API using Redis and Sevalla"
    - property: og:description
      content: "Caching a Next.js API using Redis and Sevalla"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/caching-a-nextjs-api-using-redis-and-sevalla.html
prev: /programming/js-next/articles/README.md
date: 2025-08-28
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756310410998/ee5f34fd-0efe-4efc-9e91-2baa826edff9.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Sevella > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/sevella/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Redis > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/redis/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Caching a Next.js API using Redis and Sevalla"
  desc="When you hear about Next.js, your first thought may be static websites or React-driven frontends. But that’s just part of the story. Next.js can also power full-featured backend APIs that you can host and scale just like any other backend service. In..."
  url="https://freecodecamp.org/news/caching-a-nextjs-api-using-redis-and-sevalla"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756310410998/ee5f34fd-0efe-4efc-9e91-2baa826edff9.png"/>

When you hear about Next.js, your first thought may be static websites or React-driven frontends. But that’s just part of the story. Next.js can also power full-featured backend APIs that you can host and scale just like any other backend service.

[**In an earlier article**](/freecodecamp.org/how-to-deploy-a-nextjs-api-with-postgresql-and-sevalla.md), I walked through building a Next.js API and deploying it with Sevalla. The example stored data in a PostgreSQL database and handled requests directly. That worked fine, but as traffic grows, APIs that hit the database on every request can slow down.

This is where caching comes in. By adding Redis as a cache layer, we can make our Next.js API much faster and more efficient. In this article, we’ll see how to add Redis caching to our API, deploy it with [<VPIcon icon="iconfont icon-sevella"/>Sevalla](https://sevalla.com/), and show measurable improvements.

In the last article, I explained the API in detail. So you can [use this repository (<VPIcon icon="iconfont icon-github"/>`manishmshiva/nextjs-api-pgsql`)](https://github.com/manishmshiva/nextjs-api-pgsql) to start with as the base for this project.

---

## Why Caching Matters

Every time your API hits the database, it consumes time and resources. Databases are great at storing and querying structured data, but they aren’t optimized for speed at scale when you need to serve thousands of read requests per second.

Caching solves this by keeping frequently accessed data in memory. Instead of asking the database every time, the API can return data directly from cache if it’s available. Redis is perfect for this because it’s an in-memory key-value store designed for performance.

For example, if you fetch the list of users from the database on every request, it might take 200ms to run the query and return results. With Redis caching, the first request stores the result in memory, and subsequent requests can return the same data in less than 10ms. That’s an order-of-magnitude improvement.

---

## What is Redis?

[**Redis**](/freecodecamp.org/how-in-memory-caching-works-in-redis.md) is an in-memory data store that works like a super-fast database. Instead of writing and reading from disk, it keeps data in memory, which makes it incredibly fast. That’s why it’s often used as a cache, where speed is more important than long-term storage.

It’s designed to handle high-throughput workloads with very low latency, which means it can respond in microseconds. This makes it a perfect fit for use cases like caching API responses, storing session data, or even powering real-time applications like chat systems and leaderboards.

Unlike a traditional database, Redis focuses on simplicity and speed. It stores data as key-value pairs, so you can quickly fetch or update values without writing complex queries. And because it supports advanced data types like lists, sets, and hashes, it’s much more flexible than a plain key-value store.

When combined with an API like the one we built in Next.js, Redis helps you reduce load on the main database and deliver blazing-fast responses to clients.

---

## Setting Up the Project

Let’s clone the repository:

```sh
git clone git@github.com:manishmshiva/nextjs-api-pgsql.git next-api
```

Now let’s go into the directory and do an npm install to install the packages.

```sh
cd next-api
npm i
```

Create a <VPIcon icon="iconfont icon-doitenv" />`.env` file and add the database URL from Sevalla into an environment variable.

```sh
cat .env
```

The <VPIcon icon="iconfont icon-doitenv" />`.env` file should look like this:

```sh title=".env"
PGSQL_URL=postgres://<username>:<password>-@asia-east1-001.proxy.kinsta.app:30503/<db_name>
```

Now let’s make sure the application works as expected by starting the application and making a couple of API requests.

Starting the app:

```sh
npm run dev
```

Let’s make sure the database is connected. Go to `localhost:3000` on your browser. It should return the following JSON:

![GET /](https://cdn.hashnode.com/res/hashnode/image/upload/v1755607650708/543df6fe-3bea-4eb2-b962-13df35b6fb2c.png)

Let’s create a new user. To create a new entry in the DB using [<VPIcon icon="iconfont icon-postman"/>Postman](https://postman.com/), send a POST request with the following JSON:

```json
{"id":"d9553bb7-2c72-4d92-876b-9c3b40a8c62c","name":"Larry","email":"larry@example.com","age":"25"}
```

![Postman test](https://cdn.hashnode.com/res/hashnode/image/upload/v1755607596858/7c8c71b5-7868-47a1-ae8d-172474f6d75b.png)

Let’s ensure the record is created by going to `localhost:3000/users` in the browser.

![Postman response for `/users`](https://cdn.hashnode.com/res/hashnode/image/upload/v1755607717319/d6743d2a-8373-4d81-afee-1f034e1954e1.png)

Great. Now let’s cache these APIs using Redis.

---

## Provisioning Redis

Let’s go to [<VPIcon icon="iconfont icon-sevalla"/>Sevalla’s](https://app.sevalla.com/login) dashboard and click on “Databases”. Choose “Redis” from the list, and leave the rest of the options as defaults.

![Create database](https://cdn.hashnode.com/res/hashnode/image/upload/v1755415913475/0ba7badb-2c67-474a-a5b1-6d72b5bdc5f3.png)

Once the database is created, switch on the “external connection” option and copy the publicly accessible URL.

![Update network settings](https://cdn.hashnode.com/res/hashnode/image/upload/v1755611728877/6e139e09-8484-4a50-b007-32ecdb266afb.png)

This is how it should look in the <VPIcon icon="iconfont icon-doitenv" />`.env` file:

```sh titel=".env"
REDIS_URL=redis://default:<password>@<host>:<port>
```

Now install a Redis client for Node.js:

```sh
npm install ioredis
```

We can now connect to Redis and use it as a cache layer for our users API. Let’s see how to implement caching.

---

## Updating Cache on Reads

Here’s the updated <VPIcon icon="fas fa-folder-open"/>`users/`<VPIcon icon="iconfont icon-typescript"/>`route.ts` that uses Redis:

```ts :collapsed-lines title="users/route.ts"
import { NextResponse } from "next/server";
import { Client } from "pg";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

async function readUsers() {
  const client = new Client({
    connectionString: process.env.PGSQL_URL,
  });
  await client.connect();

  try {
    const result = await client.query("SELECT id, name, email, age FROM users");
    return result.rows;
  } finally {
    await client.end();
  }
}

export async function GET() {
  try {
    // Check cache first
    const cached = await redis.get("users");
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

    // Fallback to database if not cached
    const users = await readUsers();

    // Store result in cache with 60s TTL
    await redis.set("users", JSON.stringify(users), "EX", 60);

    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
```

Now, when you hit `/users`:

1. The API first checks Redis.
2. If the data exists, it returns it instantly.
3. If not, it queries PostgreSQL, saves the result in Redis, and then returns it.

This makes repeated requests extremely fast. You can adjust the cache expiry (`EX 60`) depending on how fresh your data needs to be.

Without Redis caching, fetching `/users` ten times means ten database queries. Each might take around 150-200ms depending on database size and network latency.

With Redis, the first request still takes ~200ms since it populates the cache. But every request after that is nearly instant, often under 10ms. That’s a **20x improvement**.

This speedup matters when your API faces hundreds or thousands of requests per second. Caching not only reduces latency but also lightens the load on your database.

---

## Updating Cache on Writes

Right now, only GET requests use the cache. But what if we add new users? The cache would still return the old data.

The solution is to update or clear the cache whenever a write happens. Let’s update the `POST` handler:

```ts
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = new Client({
      connectionString: process.env.PGSQL_URL,
    });
    await client.connect();

    const query = `
      INSERT INTO users (id, name, email, age)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await client.query(query, [
      body.id,
      body.name,
      body.email,
      body.age,
    ]);

    await client.end();

    // Invalidate cache so next GET fetches fresh data
    await redis.del("users");

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }
}
```

Now whenever a new user is created, the cache for `users` is cleared. The next GET request will fetch from the database, refresh the cache, and then continue serving cached data.

---

## Deploying to Sevalla

Push your code to GitHub or [fork my repository (<VPIcon icon="iconfont icon-github"/>`manishmshiva/nextjs-api-redis`)](https://github.com/manishmshiva/nextjs-api-redis). Now lets go to Sevalla and create a new app.

![Sevalla create app](https://cdn.hashnode.com/res/hashnode/image/upload/v1754545093624/9747a06d-0dcf-482a-89b9-732b9937b1dc.png)

Choose your repository from the dropdown and check “Automatic deployment on commit”. This will ensure that the deployment is automatic every time you push code. Choose “Hobby” under the resources section.

![create new app](https://cdn.hashnode.com/res/hashnode/image/upload/v1755683871627/cc8bd555-caaa-43f2-a9a3-f3f0d1481108.png)

Click “Create” and not “Create and deploy”. We haven’t added our PostgreSQL URL and Redis URL as environment variables, so the app will crash if you try to deploy it.

Go to the “Environment variables” section and add the key “PGSQL_URL” and the URL in the value field. Do the same for the “REDIS_URL” key and add the Redis URL.

![Adding environment variables](https://cdn.hashnode.com/res/hashnode/image/upload/v1755683943610/97932885-29aa-4cef-b999-689f0871809e.png)

Now go back to the “Overview” section and click “Deploy now”.

![App Deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1755684196447/a1da5802-aa2c-47f6-8837-14f7e40198fd.png)

Once deployment is complete, click “Visit app” to get the live URL of your API. You can replace `localhost:3000` with the new URL in Postman and test your API.

---

## Why Redis Works Well with Next.js APIs

Redis is lightweight, blazing fast, and perfect for caching API responses. In the context of Next.js, it fits naturally because:

- The API routes run server-side where Redis can be queried directly.
- Caching logic is simple to add around database calls.
- Redis can be used for more than caching - things like rate limiting, session storage, and pub/sub are also common patterns.

By combining Next.js, PostgreSQL, and Redis on Sevalla, you get a stack that is fast, scalable, and easy to deploy.

---

## Conclusion

Caching isn’t just an optimization - it’s a necessity for real-world APIs. Next.js helps you build robust backend APIs that can be deployed easily. By adding Redis to the mix, those APIs can handle scale without breaking a sweat.

Sevalla ties it all together by providing managed PostgreSQL, Redis, and app hosting in one place. With a few environment variables and a GitHub repo, you can go from local dev to a production-ready, cached API in minutes.

::: info

Hope you enjoyed this article. Signup for my free AI newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also find me on [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Caching a Next.js API using Redis and Sevalla",
  "desc": "When you hear about Next.js, your first thought may be static websites or React-driven frontends. But that’s just part of the story. Next.js can also power full-featured backend APIs that you can host and scale just like any other backend service. In...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/caching-a-nextjs-api-using-redis-and-sevalla.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
