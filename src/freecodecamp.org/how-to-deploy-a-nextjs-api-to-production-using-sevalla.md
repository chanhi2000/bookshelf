---
lang: en-US
title: "How to Deploy a Next.js API to Production using Sevalla"
description: "Article(s) > How to Deploy a Next.js API to Production using Sevalla"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - DevOps
  - Sevalla
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
  - sevalla
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy a Next.js API to Production using Sevalla"
    - property: og:description
      content: "How to Deploy a Next.js API to Production using Sevalla"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-nextjs-api-to-production-using-sevalla.html
prev: /programming/js-next/articles/README.md
date: 2025-08-02
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754090039728/75b0f680-94b4-4310-9c52-109000acde22.png
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
  "title": "Sevalla > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/sevalla/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Deploy a Next.js API to Production using Sevalla"
  desc="When people hear about Next.js, they often think of server-side rendering, React-powered frontends, or SEO-optimised static websites. But there's more to this powerful framework than just front-end development. Next.js also allows developers to build..."
  url="https://freecodecamp.org/news/how-to-deploy-a-nextjs-api-to-production-using-sevalla"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1754090039728/75b0f680-94b4-4310-9c52-109000acde22.png"/>

When people hear about Next.js, they often think of [**server-side rendering**](/freecodecamp.org/server-side-rendering-javascript.md), React-powered frontends, or SEO-optimised static websites. But there's more to this powerful framework than just front-end development.

Next.js also allows developers to build robust, scalable backend APIs directly inside the same codebase. This is especially valuable for small to mid-sized applications where having a tightly coupled frontend and backend speeds up development and deployment.

In this article, you’ll learn how to build an API using Next.js and deploy it to production using Sevalla. It’s relatively easy to learn how to build something using a tutorial – but the real challenge is to get it into the hands of users. Doing so transforms your project from a local prototype into something real and usable.

---

## What is Next.js?

<FontIcon icon="iconfont icon-nextjs"/>[Next.js](https://nextjs.org/) is an open-source React framework built by Vercel. It enables developers to build server-rendered and statically generated web applications.

It essentially abstracts the configuration and boilerplate needed to run a full-stack React application, making it easier for developers to focus on building features rather than setting up infrastructure.

While it started as a solution for frontend challenges in React, it has evolved into a full-stack framework that lets you handle backend logic, interact with databases, and build APIs. This unified codebase is what makes Next.js particularly compelling for modern web development.

---

## Installation & Setup

Let’s install Next.js. Make sure you have [<FontIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en) and NPM installed on your system, and that they’re the latest version.

```sh
node --version
# v22.16.0
```

```sh
npm --version
# 10.9.2
```

Now let’s create a Next.js project. The command to do so is:

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

But for this tutorial, we aren’t interested in a full stack app – just an API. So let’s re-create the app using the `--api` flag.

```sh
npx create-next-app@latest --api
```

It will still ask you a few questions. Use the default settings and finish creating the app.

![Next.js API setup](https://cdn.hashnode.com/res/hashnode/image/upload/v1753245601007/61b34b8f-0426-4bf1-80ed-315f97e18d8a.png)

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

## How to Build a REST API

Now that we’ve set up our API template, let's write a basic REST API. A basic REST API is simply four endpoints: Create, Read, Update, Delete (also called as CRUD).

Usually, we’d use a database, but for simplicity’s sake, we’ll use a JSON file in our API. Our goal is to build a REST API that can read and write to this JSON file.

The API code will reside under <FontIcon icon="fas fa-folder-open"/>`/app` within the project directory. Next.js uses file-based routing for building URL paths.

For example, if you want a URL path `/users`, you should have a directory called “users” with a route.ts file to handle all the CRUD operations for `/users`. For `/users/:id`, you should have a directory called <FontIcon icon="fas fa-folder-open"/>`[id]` under “users” directory with a route.ts file. The square brackets are to tell Next.js that you expect dynamic values for the `/users/:id` route.

You should also have the users.json inside the <FontIcon icon="fas fa-folder-open"/>`/app/users` directory for your routes to read and write data.

Here is a screenshot of the setup. Delete the <FontIcon icon="fas fa-folder-open"/>`[slug]` directory that comes with the project since it won’t be relevant for us:

![Route Structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1753419862976/1ac6e871-6837-44e9-a02e-4e8d37ac4c76.png)

- The route.ts file at the bottom handles CRUD operations for `/`
- The route.ts file under <FontIcon icon="fas fa-folder-open"/>`/users` handles CRUD operations for `/users`
- The route.ts file under <FontIcon icon="fas fa-folder-open"/>`/users/[id]/` handles CRUD operations under `/users/:id` where the ‘id’ will be a dynamic value.
- The <FontIcon icon="iconfont icon-json"/>`users.json` under <FontIcon icon="fas fa-folder-open"/>`/users` will be our data store.

While this setup can seem complicated for a simple project, it provides a clear structure for large-scale web applications. If you want to go deeper into building complex APIs with Next.js, [<FontIcon icon="iconfont icon-nextjs"/>here is a tutorial](https://nextjs.org/blog/building-apis-with-nextjs) you can follow.

The code under <FontIcon icon="fas fa-folder-open"/>`/app/`<FontIcon icon="iconfont icon-typescript"/>`route.ts` is the default file for our API. You can see it serving the GET request and responding with “Hello World!”:

```ts title="app/route.ts"
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello world!" });
}
```

Now we need five routes:

- GET /users → List all users
- GET `/users/:id` → List a single user
- POST /users → Create a new user
- PUT `/users/:id` → Update an existing user
- DELETE `/users/:id` → Delete an existing user

Here is the code for the <FontIcon icon="iconfont icon-typescript"/>`route.ts` file under `/app/users`:

```ts :collapsed-lines title="app/users/route.ts"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "fs"; // Importing promise-based filesystem methods
import path from "path"; // For handling file paths

// Define the structure of a User object
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Define the path to the users.json file
const usersFile = path.join(process.cwd(), "app/users/users.json");

// Read users from the JSON file and return them as an array
async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFile, "utf-8");
    return JSON.parse(data) as User[];
  } catch {
    // If file doesn't exist or fails to read, return empty array
    return [];
  }
}

// Write updated users array to the JSON file
async function writeUsers(users: User[]) {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf-8");
}

// Handle GET request: return list of users
export async function GET() {
  const users = await readUsers();
  return NextResponse.json(users);
}

// Handle POST request: add a new user
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Destructure and validate input fields
  const { name, email, age } = body as {
    name?: string;
    email?: string;
    age?: number;
  };

  // Return 400 if any required field is missing
  if (!name || !email || age === undefined) {
    return NextResponse.json(
      { error: "Missing name, email, or age" },
      { status: 400 }
    );
  }

  // Read existing users
  const users = await readUsers();

  // Create new user object with unique ID based on timestamp
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    age,
  };

  // Add new user to the list and save to file
  users.push(newUser);
  await writeUsers(users);

  // Return the newly created user with 201 Created status
  return NextResponse.json(newUser, { status: 201 });
}
```

Now the code for the <FontIcon icon="fas fa-folder-open"/>`/app/users/[id]/`<FontIcon icon="iconfont icon-typescript"/>`route.ts` file:

```ts :collapsed-lines title="app/users/[id]/route.ts"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Define the User interface
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Path to the users.json file
const usersFile = path.join(process.cwd(), "app/users/users.json");

// Function to read users from the JSON file
async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFile, "utf-8");
    return JSON.parse(data) as User[];
  } catch {
    // If file doesn't exist or is unreadable, return an empty array
    return [];
  }
}

// Function to write updated users to the JSON file
async function writeUsers(users: User[]) {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf-8");
}

// GET `/users/:id` - Fetch a user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const users = await readUsers();

  // Find the user by ID
  const user = users.find((u) => u.id === id);

  // Return 404 if user is not found
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Return the found user
  return NextResponse.json(user);
}

// PUT `/users/:id` - Update a user by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const body = await request.json();

  // Extract optional fields from request body
  const { name, email, age } = body as {
    name?: string;
    email?: string;
    age?: number;
  };

  const users = await readUsers();

  // Find the index of the user to update
  const index = users.findIndex((u) => u.id === id);

  // Return 404 if user not found
  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Update the user only with provided fields
  users[index] = {
    ...users[index],
    ...(name !== undefined ? { name } : {}),
    ...(email !== undefined ? { email } : {}),
    ...(age !== undefined ? { age } : {}),
  };

  await writeUsers(users);

  // Return the updated user
  return NextResponse.json(users[index]);
}

// DELETE `/users/:id` - Delete a user by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const users = await readUsers();

  // Find the index of the user to delete
  const index = users.findIndex((u) => u.id === id);

  // Return 404 if user not found
  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Remove user from the array and save updated list
  const [deleted] = users.splice(index, 1);
  await writeUsers(users);

  // Return the deleted user
  return NextResponse.json(deleted);
}
```

We will have an empty array inside the /app/users.json. You can find all the code here [in this repository (<FontIcon icon="iconfont icon-github"/>`manishmshiva/nextjs-api`)](https://github.com/manishmshiva/nextjs-api).

---

## How to Test the API

Now let’s test the API endpoints.

First, lets run the API:

```sh
npm run dev
```

You can go to `http://localhost:3000/users` and can see an empty array since we have not pushed any user information.

From the code, we can see that a user object needs name, email, and age since the id is automatically generated in the POST endpoint.

![New user creation](https://cdn.hashnode.com/res/hashnode/image/upload/v1753336220369/11fceed9-6b2e-45f7-a5f9-2159d85e3cfb.png)

We will use [<FontIcon icon="iconfont icon-postman"/>Postman](https://postman.com/downloads/) to simulate requests to the API and ensure that the API behaves as expected.

### 1. GET /users

it will be empty on our first try since we haven’t pushed any data yet.

![GET /users](https://cdn.hashnode.com/res/hashnode/image/upload/v1753340954122/794e41d4-2660-49de-8bff-dbd979979049.png)

### 2. POST /users

create a new user. Under “body”, choose “raw” and select “JSON”. This is the data we will be sending the api. The JSON body would be

```json
{"name":"Manish","age":30, "email":"manish@example.com"}
```

![POST /users](https://cdn.hashnode.com/res/hashnode/image/upload/v1753341103739/96f42da7-127c-4e99-9cd2-054d8bb74633.png)

I’ll create one more record named “Larry”. Here is the JSON:

```json
{"name":"Larry","age":25, "email":"larrry@example.com"}
```

Now let’s look at the users. You should see two entries for our GET request to `/users`:

![GET `/users`](https://cdn.hashnode.com/res/hashnode/image/upload/v1753341200059/e4237349-9fc6-4424-965a-f4dc2d2cda3f.png)

Now let’s look at a single user using `/users/:id`.

![GET `/users/:id`](https://cdn.hashnode.com/res/hashnode/image/upload/v1753341556154/8dda05a1-7a83-40a2-b212-cd5ccb54f0a3.png)

Now let’s update Larry’s age to 35. We’ll pass just the age in request body using the PUT request to `/users/:id`.

![PUT `/users/:id`](https://cdn.hashnode.com/res/hashnode/image/upload/v1753341614641/a5a7ffbd-a371-42f9-9a32-285aeec39066.png)

Now let’s delete Larry’s record.

![DELETE `/users/:id`](https://cdn.hashnode.com/res/hashnode/image/upload/v1753341668605/9456cf8d-e694-4d1d-968e-3ab9a9c6c30e.png)

If you check `/users`, you should see only one record:

![GET `/users`](https://cdn.hashnode.com/res/hashnode/image/upload/v1753341735968/d0b6ecf9-34e4-49a2-b6e1-da0ab859a8b3.png)

So we have built and tested our api. Now let’s get this live.

---

## How to Deploy to Sevalla

[<FontIcon icon="iconfont icon-sevalla"/>Sevalla](https://sevalla.com/) is a modern, usage-based Platform-as-a-service provider and an alternative to sites like Heroku or to your self-managed setup on AWS. It combines powerful features with a smooth developer experience.

Sevalls offers application hosting, database, object storage, and static site hosting for your projects. It comes with a generous free tier, so let’s see how to deploy our API to the cloud using Sevalla.

Make sure you have the code committed to GitHub or [fork my repository (<FontIcon icon="iconfont icon-github"/>`manishmshiva/nextjs-api`)](https://github.com/manishmshiva/nextjs-api) for this project. If you are new to Sevalla, you can sign up using your GitHub account to enable direct deploys from your GitHub account. Every time you push code to your project, Sevalla will auto-pull and deploy your app to the cloud.

Once you [<FontIcon icon="iconfont icon-sevalla"/>login](https://app.sevalla.com/login) to Sevalla, click on “Applications”. Now let’s create an app.

![Sevalla App interface](https://cdn.hashnode.com/res/hashnode/image/upload/v1753420176622/a96c398e-18bc-42c2-917a-ba6a4f9ed585.png)

If you have authenticated with GitHub, the application creation interface will display a list of repositories. Choose the one you pushed your code into or the nextjs-api project if you forked it from my repository.

![Connect Repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1753420351315/cc8b072b-fda8-43d5-a56b-9e3dd623523d.png)

Check the box “auto deploy on commit”. This will ensure your latest code is auto-deployed to Sevalla. Now, let’s choose the instance to which we can deploy the application. Each one comes with its own pricing, based on the server's capacity.

Let’s choose the hobby server that costs $5/mo. Sevalla gives us a $50 free tier, so we don’t have to pay for anything unless we exceed this usage tier.

![Sevalla usage tier](https://cdn.hashnode.com/res/hashnode/image/upload/v1753420434828/71cb0e8e-832a-4077-b493-6928c874eb4b.png)

Now, click “Create and Deploy”. This should pull our code from our repository, run the build process, setup a Docker container and then deploy the app. Usually the work of a sysadmin, fully automated by Sevalla.

Wait for a few minutes for all the above to happen. You can watch the logs in the “Deployments” interface.

![Application deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1753424002440/8dc98179-15f2-4178-b285-23f0f475bc66.png)

Now, click on “Visit App” and you will get the live URL (ending with `sevalla.app`) of your API. You can replace `http://localhost:3000` with the new URL and run the same tests using Postman.

Congratulations – your app is now live. You can do more with your app using the admin interface, like:

- Monitor the performance of your app
- Watch real-time logs
- Add custom domains
- Update network settings (open/close ports for security, and so on)
- Add more storage

Sevalla also provides resources like Object storage, database, cache, and so on, which are out of scope for this tutorial. But it lets you monitor, manage, and scale your application without the need for a system administrator. That’s the beauty of PaaS systems. Here is a detailed comparison of [**VPS vs PaaS systems**](/freecodecamp.org/vps-vs-paas-how-to-choose-a-hosting-solution.md) for application hosting.

---

## Conclusion

In this article, we went beyond the typical frontend use case of Next.js and explored its capabilities as a full-stack framework. We built a complete REST API using the App Router and file-based routing, with data stored in a JSON file. Then, we took it a step further and deployed the API to production using Sevalla, a modern PaaS that automates deployment, scaling, and monitoring.

This setup demonstrates how developers can build and ship full-stack applications like frontend, backend, and deployment, all within a single Next.js project. Whether you're prototyping or building for scale, this workflow sets you up with everything you need to get your apps into users’ hands quickly and efficiently.

Hope you enjoyed this article. I ll see you soon with another one. [<FontIcon icon="fas fa-globe"/>Connect with me on LinkedIn](https://manishshivanandhan.com/) or [visit my website (<FontIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy a Next.js API to Production using Sevalla",
  "desc": "When people hear about Next.js, they often think of server-side rendering, React-powered frontends, or SEO-optimised static websites. But there's more to this powerful framework than just front-end development. Next.js also allows developers to build...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-nextjs-api-to-production-using-sevalla.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
