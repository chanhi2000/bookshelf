---
lang: en-US
title: "How to Build a CRUD App with TanStack Start and TanStackDB (with RxDB Integration)"
description: "Article(s) > How to Build a CRUD App with TanStack Start and TanStackDB (with RxDB Integration)"
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
      content: "Article(s) > How to Build a CRUD App with TanStack Start and TanStackDB (with RxDB Integration)"
    - property: og:description
      content: "How to Build a CRUD App with TanStack Start and TanStackDB (with RxDB Integration)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-crud-app-with-tanstack-start-and-tanstackdb-with-rxdb-integration.html
prev: /programming/js-react/articles/README.md
date: 2025-10-28
isOriginal: false
author:
  - name: Andrew Baisden
    url : https://freecodecamp.org/news/author/andrewbaisden/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761589878275/a36fe1d2-edf5-4339-b594-b1e55066485c.png
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
  name="How to Build a CRUD App with TanStack Start and TanStackDB (with RxDB Integration)"
  desc="TanStack Start is a new full-stack framework for React. It’s been growing in popularity ever since it reached the Release Candidate stage of its development in September, 2025. The Release Candidate stage is basically a version of software which is c..."
  url="https://freecodecamp.org/news/how-to-build-a-crud-app-with-tanstack-start-and-tanstackdb-with-rxdb-integration"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761589878275/a36fe1d2-edf5-4339-b594-b1e55066485c.png"/>

TanStack Start is a new full-stack framework for React. It’s been growing in popularity ever since it reached the Release Candidate stage of its development in September, 2025. The Release Candidate stage is basically a version of software which is considered to be almost complete, in a stable state, and ready for final public testing before its official launch.

TanStack Start has already started to emerge as a good alternative to other popular React frameworks like Next.js and Remix. The TanStack ecosystem is already quite popular with developers, and other well-known tools include:

- [TanStack Router](https://tanstack.com/router/latest): Type-safe Routing for React and Solid applications
- [TanStack Query](https://tanstack.com/query/latest): Powerful asynchronous state management, server-state utilities and data fetching
- [TanStack Form](https://tanstack.com/form/latest): Headless UI for building performant and type-safe forms
- [TanStackDB](https://tanstack.com/db/latest): A reactive client store for building super-fast apps on sync

In this tutorial, we’ll build a simple but powerful to-do list CRUD application using [TanStack Start](https://tanstack.com/start), [TanStackDB](https://tanstack.com/db), and [RxDB](https://rxdb.info/). You can see what the app looks like below:

![TanStack to do list CRUD App](https://cdn.hashnode.com/res/hashnode/image/upload/v1761220967371/3bd1f03c-e844-42bc-ac0f-b637e7cd6e61.png)

The tutorial will teach you how to:

- Create and persist data locally using RxDB
- Create a TanStack Start project that uses TanStackDB for data storage
- Build a full CRUD (Create, Read, Update, Delete) app

At the end of this guide, we are also going to look at what makes TanStack Start different from other React frameworks like Next.js and Remix and how TanStackDB fits into this ever-growing ecosystem.

Let's get started.

::: note Prerequisites

Fortunately, not much is required – just the following:

- Node and npm installed
- Code editor/IDE

:::

---

## What is TanStack Start?

TanStack Start is a modern React-based meta-framework built by the developer Tanner Linsley (who’s famous for building the TanStack ecosystem).

TanStack Start is designed to be:

- Blazing fast, as it is powered by Vite, Bun, or other modern bundlers
- Type-safe, because it is deeply integrated with TypeScript as well as TanStack Router
- Lightweight, since there is no server-side rendering unless you want it
- Full-stack ready, as it works with loaders, actions, and data mutations just like Remix

If you’re already familiar with Next.js and Remix, you can think of TanStack Start as a more modular, transparent, and flexible way of building full-stack React apps.

---

## What is TanStack DB (with RxDB Integration)?

TanStackDB is a reactive data management layer which sits between your user interface and data source. It’s not like a typical ORM (Object Relational Mapper). Instead, it gives you a unified abstraction layer for working with local-first data collections which are reactive.

So when you combine TanStackDB with RxDB, you get local database persistence which works by using IndexDB or SQLite and real-time reactivity. This gives you the ability to sync data to remote backends later like PostgreSQL, for example.

In this project, we’re going to use RxDB for local-first-storage that makes it behave like SQLite when it’s inside a browser.

---

## Setting Up Our Project

Let’s start fresh. Find a location on your computer for creating this project and run these commands in your terminal to set it up:

```sh
npm create @tanstack/start@latest my-app
cd my-app
npm install rxdb @tanstack/react-db @tanstack/rxdb-db-collection
mkdir -p src/db
touch src/db/actions.ts src/db/client.ts src/db/todoCollection.ts
```

This run script creates a TanStack Start project, installs dependencies for RxDB and TanStackDB, and creates the folders and files we need for our app.

At the end, we’re also going to replace the existing <VPIcon icon="fa-brands fa-react"/>`index.tsx` page with our own CRUD app codebase, while also keeping the demo routes in navigation so you can still explore them.

---

## Creating the Database Client

Up first is our <VPIcon icon="fas fa-folder-open"/>`src/db/`<VPIcon icon="iconfont icon-typescript"/>`client.ts` file, so copy and paste the below code into the file:

```ts :collapsed-lines title="db/client.ts"
import { createRxDatabase, removeRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

let dbInstance: any = null;

export async function initDB() {
  // Only initialize in browser environment
  if (typeof window === "undefined") {
    console.log("initDB: Not in browser, skipping");
    return null;
  }

  if (dbInstance) {
    console.log("initDB: Returning existing instance");
    return dbInstance;
  }

  try {
    console.log("initDB: Creating new database instance");
    const storage = getRxStorageDexie();

    // Always remove existing database in development
    if (import.meta.env.DEV) {
      try {
        console.log("initDB: Removing existing database (dev mode)");
        await removeRxDatabase("appdb", storage);
      } catch (e) {
        console.log("initDB: No existing database to remove");
      }
    }

    dbInstance = await createRxDatabase({
      name: "appdb",
      storage,
      multiInstance: false,
      eventReduce: true,
    });

    console.log("initDB: Database created successfully");
    return dbInstance;
  } catch (error) {
    console.error("initDB: Failed to create database", error);
    throw error;
  }
}

// Cleanup for HMR
if (typeof window !== "undefined" && import.meta.hot) {
  import.meta.hot.dispose(async () => {
    console.log("HMR: Disposing database");
    if (dbInstance) {
      await dbInstance.destroy();
      dbInstance = null;
    }
  });
}
```

This code uses RxDB to create a client-side database which is `appdb`. We use the function `getRxStorageDexie()` to provide IndexDB storage when used in browsers.

In dev mode, we can clear the DB on each reload, giving us a clean state. Server-side execution is protected by using the `window` check. HMR cleanup guarantees that the DB is reset properly when hot reloading.

---

## Understanding Local Persistence with RxDB

Before we move to the next section, lets go over the concept of local persistence with RxDB. Our data is likely to disappear when the page is reloaded during development because RxDB used a browser-based database engine for persisting data locally. So we’ll be using the Dexie storage adapter which stores all of our apps data inside a browser’s IndexedDB.

So basically, this means that our todos actually don’t persist in the browser, even if we close and reopen the app – but there’s a way to get this working in our app.

In the <VPIcon icon="fas fa-folder-open"/>`src/db/`<VPIcon icon="iconfont icon-typescript"/>`client.ts` file, there just happens to be a section of code that looks like this:

```ts title="db/client.ts"
    if (import.meta.env.DEV) {
      try {
        console.log("initDB: Removing existing database (dev mode)");
        await removeRxDatabase("appdb", storage);
      } catch (e) {
        console.log("initDB: No existing database to remove");
      }
    }
```

This code is making sure that when we’re in development mode, our database is removed and then recreated every time the app is reloaded. This is quite useful, because when we’re actively developing and changing schemas, it can guarantee that old data is not going to conflict with new database structures.

The downside, though, is that todos will disappear every time the page is refreshed. This behaviour is expected while running our app locally in dev mode. If you want todos to persist between reloads, then all you have to do is comment out this code block:

```ts title="db/client.ts"
// Comment or remove this code block to persist data across reloads
   if (import.meta.env.DEV) {
      try {
        console.log("initDB: Removing existing database (dev mode)");
        await removeRxDatabase("appdb", storage);
      } catch (e) {
        console.log("initDB: No existing database to remove");
      }
    }
```

After making this update, RxDB will now store your todos in IndexedDB and they will be automatically loaded whenever you revisit the app. You can even see this for yourself by opening your browser while the app is running and navigating to DevTools -> Application -> IndexedDB -> appdb.

See the examples shown here:

![TanStack to do list app](https://cdn.hashnode.com/res/hashnode/image/upload/v1761221020837/2a7fd37f-e638-4c6b-997f-ecde0aa789bb.png)

Here you can see an example of what our app looks like with some tasks:

![IndexedDB in the browser with tasks](https://cdn.hashnode.com/res/hashnode/image/upload/v1761221062751/431c4ac5-39d3-4adb-b197-bd4cc01a538e.png)

Here, you can see that our data stored inside IndexedDB in our browser.

The tasks should remain there until you have manually cleared the browser data.

---

## Creating a Todo Collection

Now, let's work on our <VPIcon icon="fas fa-folder-open"/>`src/db/`<VPIcon icon="iconfont icon-typescript"/>`todoCollection.ts` file. Copy and paste this code into the empty file in the codebase:

```ts title="db/todoCollection.ts"
import { initDB } from "./client";

let todoCollectionInstance: any = null;

export async function createTodoCollection() {
  // Protect against server-side execution
  if (typeof window === "undefined") {
    console.log("createTodoCollection: Not in browser, skipping");
    return null;
  }

  if (todoCollectionInstance) {
    console.log("createTodoCollection: Returning existing collection");
    return todoCollectionInstance;
  }

  try {
    console.log("createTodoCollection: Initializing database");
    const db = await initDB();

    if (!db) {
      console.error(
        "createTodoCollection: Database initialization returned null",
      );
      return null;
    }

    console.log("createTodoCollection: Adding collections");
    if (!db.todos) {
      await db.addCollections({
        todos: {
          schema: {
            version: 0,
            primaryKey: "id",
            type: "object",
            properties: {
              id: {
                type: "string",
                maxLength: 100,
              },
              title: {
                type: "string",
              },
              completed: {
                type: "boolean",
              },
            },
            required: ["id", "title", "completed"],
          },
        },
      });
      console.log("createTodoCollection: Collections added successfully");
    }

    // Return the RxDB collection directly
    todoCollectionInstance = db.todos;

    console.log("createTodoCollection: Collection created successfully");
    return todoCollectionInstance;
  } catch (error) {
    console.error("createTodoCollection: Failed to create collection", error);
    throw error;
  }
}
```

With this file, we define a `todos` collection schema which has an `id`, `title`, and `completed` fields. This schema is able to ensure that the structure and validation is correct, and we memoize the collection instance which prevents multiple DB connections from occurring. The code then returns a live RxDB collection which is ready for querying and mutation.

---

## Creating Our CRUD Actions

It’s now time to work on our CRUD actions. These allow us to perform the usual updates/changes to the data in our todo list.

Open the <VPIcon icon="fas fa-folder-open"/>`src/db/`<VPIcon icon="iconfont icon-typescript"/>`actions.ts` file and copy and paste this code into it:

```ts :collapsed-lines title="db/actions.ts"
import { createTodoCollection } from "./todoCollection";

let collectionPromise: Promise<any> | null = null;

async function getCollection() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!collectionPromise) {
    collectionPromise = createTodoCollection();
  }
  return collectionPromise;
}

export const TodoActions = {
  async getAll() {
    try {
      const collection = await getCollection();
      if (!collection) return [];

      const docs = await collection.find().exec();
      return docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        completed: doc.completed,
      }));
    } catch (error) {
      console.error("TodoActions.getAll error:", error);
      throw error;
    }
  },

  async add(title: string) {
    const collection = await getCollection();
    if (!collection) throw new Error("Collection not initialized");

    await collection.insert({
      id: crypto.randomUUID(),
      title,
      completed: false,
    });
  },

  async update(
    id: string,
    changes: Partial<{ title: string; completed: boolean }>
  ) {
    const collection = await getCollection();
    if (!collection) throw new Error("Collection not initialized");

    const doc = await collection.findOne(id).exec();
    if (doc) {
      const patch: any = {};
      if (typeof changes.title !== "undefined") patch.title = changes.title;
      if (typeof changes.completed !== "undefined")
        patch.completed = changes.completed;
      if (Object.keys(patch).length > 0) {
        await doc.patch(patch);
      }
    }
  },

  async toggle(id: string) {
    const collection = await getCollection();
    if (!collection) throw new Error("Collection not initialized");

    const doc = await collection.findOne(id).exec();
    if (doc) {
      await doc.patch({ completed: !doc.completed });
    }
  },

  async remove(id: string) {
    const collection = await getCollection();
    if (!collection) throw new Error("Collection not initialized");

    const doc = await collection.findOne(id).exec();
    if (doc) {
      await doc.remove();
    }
  },
};
```

With this code, we use the `getCollection()` function to ensure that we only initialise the collection once. Each CRUD method (getAll, add, toggle, remove) interacts directly with RxDB and the methods use the native browser `crypto.randomUUID()` to generate a unique ID. We can now safely handle server-side rendering, as we skip DB access on the server using this strategy.

---

## Creating the Frontend Page

All that remains is the frontend user interface, as we’ve written the bulk of the logic already. We’re going to replace the default <VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="fa-brands fa-react"/>`index.tsx` file with our own CRUD UI, so just replace all of the code in that file with this code here:

```tsx :collapsed-lines title="routes/index.tsx"
import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TodoActions } from "../db/actions";

function Index() {
  const [todos, setTodos] = React.useState<
    Array<{ id: string; title: string; completed: boolean }>
  >([]);
  const [title, setTitle] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingTitle, setEditingTitle] = React.useState("");

  React.useEffect(() => {
    let active = true;

    (async () => {
      try {
        console.log("Index: Loading todos");
        const data = await TodoActions.getAll();
        console.log("Index: Todos loaded", data);
        if (active) {
          setTodos(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Index: Failed to load todos:", err);
        if (active) {
          setError(err as Error);
          setIsLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await TodoActions.add(title);
        setTodos(await TodoActions.getAll());
        setTitle("");
      } catch (err) {
        console.error("Failed to add todo:", err);
        setError(err as Error);
      }
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await TodoActions.toggle(id);
      setTodos(await TodoActions.getAll());
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await TodoActions.remove(id);
      setTodos(await TodoActions.getAll());
    } catch (err) {
      console.error("Failed to remove todo:", err);
    }
  };

  const startEdit = (todo: { id: string; title: string }) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const newTitle = editingTitle.trim();
    if (!newTitle) return;
    try {
      await TodoActions.update(editingId, { title: newTitle });
      setTodos(await TodoActions.getAll());
      setEditingId(null);
      setEditingTitle("");
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  if (isLoading) {
    return (
      <main className="p-6 max-w-lg mx-auto">
        <div className="text-center">Loading database...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 max-w-lg mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
          <details className="mt-2">
            <summary className="cursor-pointer">Show details</summary>
            <pre className="mt-2 text-xs overflow-auto">{error.stack}</pre>
          </details>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">TanStack CRUD (RxDB)</h1>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <ul>
        {todos.length === 0 ? (
          <li className="text-gray-500 text-center py-4">No todos yet</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center py-2 border-b"
            >
              {editingId === todo.id ? (
                <div className="flex w-full items-center gap-2">
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="border rounded px-2 py-1 flex-1"
                  />
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 rounded border"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    onClick={() => handleToggle(todo.id)}
                    className={
                      todo.completed
                        ? "line-through cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    {todo.title}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => startEdit(todo)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(todo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
```

Our updated <VPIcon icon="fa-brands fa-react"/>`index.tsx` file uses TanStack Router to define our root page, and we have React hooks to handle state, error handling, and the CRUD updates.

Our frontend is set up to show loading/error states for a much smoother UX, and each button triggers a corresponding `TodoActions` method. The result is that we have a fully reactive, local CRUD app.

That's all there is to it. To run the app, use the usual run command for a Vite application:

```sh
npm run dev
```

---

## How Does TanStack Start Compare to Next.js and Remix?

TanStack Start seems pretty impressive, right? But lets see how it compares to the other two big established frameworks, Next.js and Remix.

Next.js recently released [<VPIcon icon="iconfont icon-nextjs"/>version 16](https://nextjs.org/blog/next-16), which brought some new improvements and features which you can read about. It’s without a doubt the most well known and used React framework available right now.

Remix also has a lot going for it, recently held its [<VPIcon icon="fas fa-globe"/>Remix Jam 2025 recap event](https://remix.run/blog/remix-jam-2025-recap) which you can also read and learn about.

TanStack Start, on the other hand, is built using the popular [<VPIcon icon="iconfont icon-vite"/>Vite](https://vite.dev/) build tool which it uses for its development, workflow, and production builds alongside TanStack Router and other libraries.

This is how all three compare when we put them side by side in a table:

| Feature | **TanStack Start** | **Next.js** | **Remix** |
| --- | --- | --- | --- |
| Routing | TanStack Router | File-based | Nested routes |
| Type Safety | Deep TS integration | Partial | Full |
| Data Loading | Loaders/Actions | Server Components | Loaders/Actions |
| SSR Support | Optional | Built-in | Built-in |
| Bundler | Vite / Bun | Webpack / Turbopack | Remix Compiler |
| DX | Simple, minimal | Full-stack ecosystem | Full-stack with conventions |

As you can see, TanStack Start offers quite a lot of flexibility. It doesn’t force conventions like Next.js or Remix because of its design and it has just the right amount of structure for developers who want control and transparency in their projects. All three are great options, though.

---

## When Should You Use TanStack Start, Next.js, or Remix?

Each of these frameworks has its advantages and disadvantages depending on your projects setup and priorities. We have to take into account the performance, flexibility, ecosystem as well as the developer experience.

With all of this in mind, it paints a clearer picture on when its best to use them.

### When to use TanStack Start

If you want full control of your architecture without having to be locked into conventions, then TanStack Start is a great choice. It’s ideal if you value having transparency alongside the flexibility that comes from it.

You’ll find that its pretty useful especially in projects which need fine-grained control over routing, data fetching, and caching – without having to worry about the overhead of a large opinionated framework.

The integration between Vite and TanStack Router makes it a lightweight and blazing fast tool which can be great for greenfield projects and teams that want to have a modular setup.

### When to use Next.js

Next.js is a great option when you need to have a production-ready scalability and extensive documentation, with a very large ecosystem. The framework has been a go to for startups as well as enterprises because of its tight integration with React Server Components, hosting with Vercel, and community driven packages.

So if SEO, SSR, or hybrid rendering are part of your team’s core needs, or if you want to shop something fast with a proven foundation, then Next.js is the safest and most mature way to go about doing it.

### When to use Remix.js

Remix is a great choice when you want to have a strong focus on web fundamentals, progressive enhancement, and a reliable UX. It’s good for applications where you want to use a browser’s native capabilities such as forms, caching, and accessibility while also benefitting from a modern full-stack workflow.

It's also great for teams that want to have the simplicity of conventional routing and loaders while also remaining close to the original platform.

---

## Conclusion

In this article, we built a CRUD app from scratch using:

- TanStack Start for the app structure and routing
- TanStackDB for the reactive data management
- RxDB for an offline-first experience and local persistence

You learned how to initialise a local database and collections as well as perform CRUD operations safely.

The TanStack ecosystem is quite powerful, and there are many tools available. They all fit really well together to give you a next-gen, local-first, reactive web development experience. TanStack Start is likely to become one of your favourite ways for building React applications and has a lot of potential for growth.

The official TanStack demos are still available in your nav on the homepage, and they are well worth checking out. Give the TanStack ecosystem a try. I think it could easily become your main tech stack.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a CRUD App with TanStack Start and TanStackDB (with RxDB Integration)",
  "desc": "TanStack Start is a new full-stack framework for React. It’s been growing in popularity ever since it reached the Release Candidate stage of its development in September, 2025. The Release Candidate stage is basically a version of software which is c...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-crud-app-with-tanstack-start-and-tanstackdb-with-rxdb-integration.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
