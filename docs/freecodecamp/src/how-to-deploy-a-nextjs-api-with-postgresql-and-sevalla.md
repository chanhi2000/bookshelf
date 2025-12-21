---
lang: en-US
title: "How to Deploy a Next.js API with PostgreSQL and Sevalla"
description: "Article(s) > How to Deploy a Next.js API with PostgreSQL and Sevalla"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Data Science
  - PostgreSQL
  - DevOps
  - Sevella
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
  - data-science
  - sql
  - postgres
  - postgresql
  - devops
  - sevella
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy a Next.js API with PostgreSQL and Sevalla"
    - property: og:description
      content: "How to Deploy a Next.js API with PostgreSQL and Sevalla"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-deploy-a-nextjs-api-with-postgresql-and-sevalla.html
prev: /programming/js-next/articles/README.md
date: 2025-08-18
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755525213723/75759868-d5e9-4ea7-a6be-22bc33dde0d8.png
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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Deploy a Next.js API with PostgreSQL and Sevalla"
  desc="When developers think of Next.js, they often associate it with SEO-friendly static websites or React-based frontends. But what many miss is how Next.js can also be used to build full-featured backend APIs - all within the same project. I’ve recently ..."
  url="https://freecodecamp.org/news/how-to-deploy-a-nextjs-api-with-postgresql-and-sevalla"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755525213723/75759868-d5e9-4ea7-a6be-22bc33dde0d8.png"/>

When developers think of Next.js, they often associate it with SEO-friendly static websites or React-based frontends. But what many miss is how Next.js can also be used to build full-featured backend APIs - all within the same project.

I’ve [**recently written an article**](/freecodecamp.org/news/how-to-deploy-a-nextjs-api-to-production-using-sevalla.md) on working with Next.js API and deploying it to production. In this case, I would’ve used a JSON file as a mini-database.

But JSON or any type of file storage isn’t fit for a production application. This is because file-based storage isn’t designed for concurrent access, so multiple users writing data at the same time can cause corruption or loss.

It also lacks indexing and query capabilities, making it slow as data grows. Backups, security, and scalability are also harder to manage compared to a proper database.

In short, while JSON files work for demos or prototypes, production systems need a database that can handle concurrency, large datasets, complex queries, and reliable persistence.

So in this article, we'll walk through how to build a REST API with Next.js, store data in a Sevalla-managed database, and deploy the whole project to production using Sevalla's [**PaaS infrastructure**](/freecodecamp.org/vps-vs-paas-how-to-choose-a-hosting-solution.md).

---

## What is Next.js?

[<VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/) is an open-source React framework developed by Vercel. It's known for server-side rendering, static generation, and seamless routing. But beyond its frontend superpowers, it allows developers to build backend logic and APIs through its file-based routing system. This makes Next.js a great choice for building full-stack apps.

---

## Installation and Setup

To get started, make sure Node.js and NPM are installed.

```sh
node --version
#
# v22.16.0

npm --version
#
# 10.9.2
```

Now, create a new Next.js project:

```sh
npx create-next-app@latest
```

The result of the above command will ask you a series of questions to setup your app:

```plaintext
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

But for this tutorial, we aren’t interested in a full stack app - just an API. So let’s re-create the app using the `--api` flag.

```sh
npx create-next-app@latest --api
```

It will still ask you a few questions. Use the default settings and finish creating the app.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1754476744959/9f1d2763-7df5-491b-8cb3-05161b35fbd9.webp)

Once the setup is done, you can see the folder with your app name. Let’s go into the folder and run the app.

```sh
npm run dev
```

Your API template should be running at port 3000. Go to `http://localhost:3000` and you should see the following message:

```json
{
  "message": "Hello world!"
}
```

---

## How to Build a NextJS API

Now that we’ve set up our API template, let's write a basic REST API with two endpoints: one to create data and one to view data

The API code will reside under `/app` within the project directory. Next.js uses file-based routing for building URL paths.

For example, if you want a URL path `/users`, you should have a directory called “users” with a <VPIcon icon="iconfont icon-typescript"/>`route.ts` file to handle all the CRUD operations for `/users`. For `/users/:id`, you should have a directory called <VPIcon icon="fas fa-folder-open"/>`[id]` under “users” directory with a <VPIcon icon="iconfont icon-typescript"/>`route.ts` file. The square brackets are to tell Next.js that you expect dynamic values for the `/users/:id` route.

Here is a screenshot of the setup. Delete the <VPIcon icon="fas fa-folder-open"/>`[slug]` directory that comes with the project since it won’t be relevant for us.

![Folder setup](https://cdn.hashnode.com/res/hashnode/image/upload/v1754479396056/a80a0fd3-707d-4813-b402-041561354c94.png)

- The <VPIcon icon="iconfont icon-typescript"/>`route.ts` file at the bottom handles CRUD operations for `/` (this is where the response “hello world” was generated from)
- The <VPIcon icon="iconfont icon-typescript"/>`route.ts` file under `/users` handles CRUD operations for `/users`

While this setup can seem complicated for a simple project, it provides a clear structure for large-scale web applications. If you want to go deeper into building complex APIs with Next.js, [<VPIcon icon="iconfont icon-nextjs"/>here is a tutorial](https://nextjs.org/blog/building-apis-with-nextjs) you can follow.

The code under /app/route.ts is the default file for our API. You can see it serving the GET request and responding with “Hello World!”:

```ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello world!" });
}
```

Now we need two routes:

- GET `/users` which lists all users
- POST `/users` which creates a new user

For this project, we’ll use a database to store our records. We’re not going to install a database on our local machine. Instead, we’ll provision the database in the cloud and use it with our API. This approach is common in test / prod environments to ensure data consistency.

---

## Provisioning a Database in Sevalla

[<VPIcon icon="iconfont icon-sevalla"/>Sevalla](https://sevalla.com/) is a modern, usage-based Platform-as-a-service provider and an alternative to sites like Heroku or to your self-managed setup on AWS. It combines powerful features with a smooth developer experience.

Sevalls offers application hosting, database, object storage, and static site hosting for your projects. It comes with a generous free tier, so we’ll use it to connect to a database as well as deploy our app to the cloud.

If you are new to Sevalla, you can [<VPIcon icon="iconfont icon-sevalla"/>sign up](https://sevalla.com/signup/) using your GitHub account to enable direct deploys from your GitHub. Every time you push code to your project, Sevalla will auto-pull and deploy your app to the cloud.

Once you login to Sevalla, click on “Databases”.

![Sevalla Databases](https://cdn.hashnode.com/res/hashnode/image/upload/v1754477578430/7b7fa655-0f35-4901-90be-07bd5abdf2c0.png)

Now let’s create a [**PostgreSQL**](/freecodecamp.org/posgresql-course-for-beginners.md) database.

![Create Postgresql Database](https://cdn.hashnode.com/res/hashnode/image/upload/v1754477639118/d6ea82ae-45c9-40a7-bcf5-d144885db929.png)

Use the default settings. Once the database is created, it will disable the external connections by default for security to ensure no one outside our server can connect to it. Since we want to test our connection from our local machine, let’s enable an external connection.

![Database settings](https://cdn.hashnode.com/res/hashnode/image/upload/v1754479205197/58c01504-59c0-4df3-b9f9-cb14e1431135.png)

The value we need to connect to the database from our local endpoint is “url” under external connection. Create a file called <VPIcon icon="fas fa-file-lines"/>`.env` in the project and paste the URL in the below format:

```sh title=".env"
PGSQL_URL=postgres://<username>:<password>-@asia-east1-001.proxy.kinsta.app:30503/<db_name>
```

The reason we use <VPIcon icon="fas fa-file-lines"/>`.env` is to store environment variables specific to the environment. In production, we won’t need this file (never push <VPIcon icon="fas fa-file-lines"/>`.env` files to GitHub). Sevalla will give us the option to add environment variables via the GUI when we deploy the app.

Now let’s test our database connection. Install the `pg` package for Node to interact with PostgreSQL. Let’s also install the TypeScript extension for `pg` to support TypeScript definitions.

```sh
npm i pg
npm install --save-dev @types/pg
```

Change the <VPIcon icon="iconfont icon-typescript"/>`route.ts` that served “hello world” to the below:

```ts title="app/api/your-endpoint/route.ts"
import { NextResponse } from "next/server";
import { Client } from "pg";

export async function GET() {
  const client = new Client({
    connectionString: process.env.PGSQL_URL,
  });

  try {
    await client.connect();
    await client.end();
    return NextResponse.json({ message: "Connected to database" });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({ message: "Connection failed" }, { status: 500 });
  }
}
```

Now when your app and go to localhost:3000, it should say “connected to database”.

![Postgresql successful connection](https://cdn.hashnode.com/res/hashnode/image/upload/v1754485714515/c63f11fc-2310-462a-9b42-c0528e500637.png)

Great. Now let’s write our two routes, one to create data and the other to view the data we created. Use this code under <VPIcon icon="fas fa-folder-open"/>`users/`<VPIcon icon="iconfont icon-typescript"/>`route.ts`:

```ts :collapsed-lines title="users/route.ts"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Client } from "pg";

// Define the structure of a User object
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Create a PostgreSQL client
function getClient() {
  return new Client({
    connectionString: process.env.PGSQL_URL,
  });
}

// Fetch all users from the database
async function readUsers(): Promise<User[]> {
  const client = getClient();
  await client.connect();

  try {
    const result = await client.query("SELECT id, name, email, age FROM users");
    return result.rows;
  } finally {
    await client.end();
  }
}

// Insert or update users in the database
async function writeUsers(users: User[]) {
  const client = getClient();
  await client.connect();

  try {
    const insertQuery = `
      INSERT INTO users (id, name, email, age)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        age = EXCLUDED.age;
    `;

    for (const user of users) {
      await client.query(insertQuery, [user.id, user.name, user.email, user.age]);
    }
  } finally {
    await client.end();
  }
}

// Handle GET request: return list of users
export async function GET() {
  try {
    const users = await readUsers();
    return NextResponse.json(users);
  } catch (err) {
    console.error("Error reading users from DB:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const users: User[] = Array.isArray(body) ? body : [body];

    await writeUsers(users);

    return NextResponse.json({ success: true, count: users.length });
  } catch (err) {
    console.error("Error writing users to DB:", err);
    return NextResponse.json({ error: "Failed to write users" }, { status: 500 });
  }
}
```

Now when you go to localhost:3000/users, it will give you an error because the users table does exist. So let’s create one.

In the database UI, click on “Studio”. You’ll get a visual editor for your database where you can manage your data directly (pretty cool, right?).

![Database studio](https://cdn.hashnode.com/res/hashnode/image/upload/v1754486852876/2437c76a-562a-4575-9cc0-a5f563aa6206.png)

Press the “+” icon and choose “create table”. Create the table with the schema below. Click the “add column” link to create new columns.

![Database Schema](https://cdn.hashnode.com/res/hashnode/image/upload/v1754487097219/9d01d9b7-e3c6-427b-9b42-c97065826af7.png)

Click “create table and you should see the table created as below:

![Users table](https://cdn.hashnode.com/res/hashnode/image/upload/v1754487162119/c64e0577-d094-4549-85f4-ab8c8d15f48e.png)

Let’s add a dummy record using “add record” button to use it to test our API. The id field should be in UUID format (and you can [<VPIcon icon="fas fa-globe"/>generate one here](https://uuidgenerator.net/)).

Now let’s test our API.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1754487408705/3fd9784e-3a83-415d-870f-f3f5d23dec51.png)

You should see the user you created as the response to the localhost:3000/users query. Now let’s create a new user using our API.

We’ll use [<VPIcon icon="iconfont icon-postman"/>Postman](https://postman.com/) for this since its easy to create POST requests using Postman. We’ll send a sample data under “body” → “raw” → “JSON”.

![Post Request](https://cdn.hashnode.com/res/hashnode/image/upload/v1754543941765/a77be1b8-05c3-4c61-a5c3-f7f0fbf48b4d.png)

The response from Postman should be as below:

![Postman results](https://cdn.hashnode.com/res/hashnode/image/upload/v1754544001954/5a52331c-a445-4b10-8c4b-9337ca873c13.png)

Now going to localhost:3000/users, you should see the new record created.

![Get `/users`](https://cdn.hashnode.com/res/hashnode/image/upload/v1754544086690/8c4533c6-4250-42e1-a850-b52c460775fc.png)

Great job! Now let’s get this app live.

---

## Deploying to Sevalla

Push your code to GitHub or [fork my repository (<VPIcon icon="iconfont icon-github"/>`manishmshiva/nextjs-api-pgsql`)](https://github.com/manishmshiva/nextjs-api-pgsql). Now lets go to Sevalla and create a new app.

![Sevalla create app](https://cdn.hashnode.com/res/hashnode/image/upload/v1754545093624/9747a06d-0dcf-482a-89b9-732b9937b1dc.png)

Choose your repository from the dropdown and check “Automatic deployment on commit”. This will ensure that the deployment is automatic every time you push code. Choose “Hobby” under the resources section.

![Sevalla Create New App](https://cdn.hashnode.com/res/hashnode/image/upload/v1754545136001/dde5fe4d-4691-401c-a3ef-959b8e53f62a.png)

Click “Create” and not “Create and deploy”. We haven’t added our PostgreSQL URL as an environment variable, so the app will crash if you try to deploy it.

Go to the “Environment variables” section and add the key “PGSQL_URL” and the URL in the value field.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1754545371348/7525c6cd-63af-40b2-80c5-6b49b6101f19.png)

Now go back to the “Overview” section and click “Deploy now”.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1754545664510/c3f12f86-0732-4518-bf51-4867ac86abdd.png)

Once deployment is complete, click “Visit app” to get the live URL of your API. You can replace localhost:3000 with the new URL in Postman and test your API.

Congratulations - your app is now live. You can do more with your app using the admin interface, like:

- Monitor the performance of your app
- Watch real-time logs
- Add custom domains
- Update network settings (open/close ports for security, and so on)
- Add more storage

---

## Conclusion

Next.js is no longer just a frontend framework. It’s a powerful full-stack platform that lets you build and deploy production-ready APIs with minimal friction. By pairing it with Sevalla’s developer-friendly infrastructure, you can go from local development to a live, cloud-hosted API in minutes.

In this tutorial, you learned how to set up a Next.js API project, connect it to a cloud-hosted PostgreSQL database on Sevalla, and deploy everything seamlessly. Whether you're building a small side project or a full-scale application, this stack gives you the speed, structure, and scalability to move fast without losing flexibility.

Hope you enjoyed this article. I’ll see you soon with another one. You can [<VPIcon icon="fas fa-globe"/>connect with me here](https://manishshivanandhan.com/) or [<VPIcon icon="fas fa-globe"/>visit my blog](https://blog.manishshivanandhan.com/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy a Next.js API with PostgreSQL and Sevalla",
  "desc": "When developers think of Next.js, they often associate it with SEO-friendly static websites or React-based frontends. But what many miss is how Next.js can also be used to build full-featured backend APIs - all within the same project. I’ve recently ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-deploy-a-nextjs-api-with-postgresql-and-sevalla.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
