---
lang: en-US
title: "How to Build Type-Safe APIs with Hono and Zod"
description: "Article(s) > How to Build Type-Safe APIs with Hono and Zod"
icon: iconfont icon-typescript
category:
  - Node.js
  - Hono
  - Zod
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - hono
  - zod
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Type-Safe APIs with Hono and Zod"
    - property: og:description
      content: "How to Build Type-Safe APIs with Hono and Zod"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-type-safe-apis-with-hono-and-zod.html
prev: /programming/js-hono/articles/README.md
date: 2026-08-24
isOriginal: false
author:
  - name: Chinedu Otutu
    url: https://freecodecamp.org/news/author/tutumantutu/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ce251811-43ad-4e2f-9761-83b6240f718e.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hono > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-hono/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Type-Safe APIs with Hono and Zod"
  desc="If you've shipped a Node.js API before, you already know this pain: your TypeScript types say one thing, your runtime validation says another, and your OpenAPI docs quietly disagree with both. Someone"
  url="https://freecodecamp.org/news/how-to-build-type-safe-apis-with-hono-and-zod"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ce251811-43ad-4e2f-9761-83b6240f718e.jpg"/>

If you've shipped a Node.js API before, you already know this pain: your TypeScript types say one thing, your runtime validation says another, and your OpenAPI docs quietly disagree with both.

Someone adds a field to an interface, and the schema never gets updated. The docs stay stale until a client files a bug. There's no compiler error or failing test. The three sources of truth just drift apart.

In this tutorial, you'll learn how to collapse those three concerns into one definition using [<VPIcon icon="iconfont icon-hono"/>Hono](https://hono.dev) and [<VPIcon icon="iconfont icon-zod"/>Zod](https://zod.dev). You'll build the same patterns I use in production, including in [<VPIcon icon="iconfont icon-github"/>`otutukingsley/clipforge`](https://github.com/otutukingsley/clipforge), an open-source video processing toolkit I built and maintain. They help validation, types, and docs stay in sync by design.

By the end of this article, you should know how to:

- Define one Zod schema that handles runtime validation, TypeScript types, and OpenAPI docs
- Structure routes so the contract and the handler stay separated
- Keep database schemas and HTTP schemas as two deliberate layers
- Return one consistent error shape from every failure path
- Carry those same patterns from a small Tasks API into a real multi-service system

::: note Prerequisites

To get the most out of this article, you'll need to know:

- JavaScript and basic TypeScript
- How REST APIs work (routes, request bodies, status codes)
- A little Node.js (installing packages, running scripts)

You don't need prior experience with Hono, Zod, or Drizzle.

:::

---

## 1. The Drift Problem

Most TypeScript APIs end up maintaining three separate descriptions of the same data:

1. **Runtime validation** checks that run when a request arrives
2. **TypeScript types** **shapes** the compiler understands at build time
3. **API documentation**, the contract you show to consumers

Each one lives in a different file and updates on a different schedule. And none of them can see the others.

![Figure 1: Three descriptions of the same data, maintained separately and often out of sync.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/1b34f0ca-6b0f-48c0-9282-7bc07d99f171.png)

Hand-written interfaces disappear at runtime. Joi or Yup schemas validate data but don't give you types for free. OpenAPI files are usually edited by hand, if they're edited at all.

The fix is not "be more careful." The fix is one definition that produces all three outputs.

![Figure 2: One schema definition produces three outputs.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/df2d559a-6afb-469d-81cb-363ab54d0dba.png)

That is what Hono and Zod give you when you use them together through `@hono/zod-openapi`.

---

## 2. What Is Hono?

[<VPIcon icon="iconfont icon-hono"/>Hono](https://hono.dev) is a small, fast web framework built on Web Standard APIs, the same `Request` and `Response` primitives that run in Node.js, Deno, Bun, and Cloudflare Workers.

Compared with Express, that difference matters:

| Express | Hono |
| --- | --- |
| Node-specific `req` / `res` | Web Standard APIs |
| Params are untyped strings | Params validated and typed with Zod |
| Validation is your problem | Route definition is the OpenAPI entry |
| Runs on Node only | Runs on Node, Bun, Deno, and the edge |

Hono's core is about 14kb. On Node it's roughly 5–7× faster than Express for the same workload. On Bun or Cloudflare Workers, the gap widens further because those runtimes are optimized for web standards.

For most CRUD APIs, your database is still the bottleneck. But at high concurrency, or on edge runtimes where cold starts matter, the framework gap is real.

More importantly for this tutorial: Hono's OpenAPI integration lets your route definition *be* the documentation.

---

## 3. What Is Zod?

[<VPIcon icon="iconfont icon-zod"/>Zod](https://zod.dev) is a TypeScript-first schema validation library. You describe the shape of your data once. Zod then:

1. Validates that shape at runtime
2. Infers the TypeScript type with `z.infer`
3. Feeds OpenAPI docs when you attach `.openapi()` metadata

With Joi or Yup, you usually validate at runtime and then hand-write a matching interface. That's two definitions again. Zod removes the second one.

```ts
import { z } from 'zod';

const createTaskSchema = z.object({
  title: z.string().min(1).max(120),
  status: z.enum(['todo', 'in_progress', 'done']).default('todo'),
});

type CreateTaskInput = z.infer<typeof createTaskSchema>;
// { title: string; status?: "todo" | "in_progress" | "done" }
```

Change the schema, and every callsite that depends on `CreateTaskInput` updates with it. TypeScript will tell you what broke.

---

## 4. One Schema, Three Jobs

Here's the mental model for the rest of the article:

![Figure 3:* `taskSchema` *is the single source of truth for validation, types, and docs.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/890719d0-6ab0-4529-ad07-565a7db9e604.png)

**

1. **Runtime validation:** bad data is rejected before it reaches your handler, with structured field errors instead of a stack trace
2. **TypeScript types:** `z.infer<typeof schema>` is derived from the schema, not maintained beside it
3. **OpenAPI docs:** `.openapi('Name')` registers the schema in the generated spec, so `/reference` stays current

One definition with three outputs. Nothing to keep in sync by hand.

---

## 5. How to Set Up the Project

We'll use the companion demo from [<VPIcon icon="iconfont icon-github"/>`otutukingsley/api-conf-demo`](https://github.com/otutukingsley/api-conf-demo). It's a small Tasks API that shows the patterns cleanly. Later, we'll look at how the same ideas show up in ClipForge at a larger scale.

Clone the repo and install dependencies:

```sh
git clone https://github.com/otutukingsley/api-conf-demo.git
cd api-conf-demo
npm install
```

Start the server:

```sh
npm run dev
```

You should see the API on `http://localhost:8080`, with interactive docs at `/reference`.

The important folders look like this:

```sh title="file structure"
src/
├── db/schema/          # Persistence layer (Drizzle tables)
├── lib/schemas/        # HTTP contract layer (Zod + OpenAPI)
├── lib/errors/         # One error envelope for every failure
├── routes/tasks/       # Route contracts + handlers
├── services/           # Business logic and DB access
├── app.ts              # Middleware, routers, OpenAPI wiring
└── env.ts              # Zod-validated environment config
```

This is still MVC. The tooling is just better:

![Figure 4: Still MVC. Routes and handlers as the controller, schemas as the contract, and services as the model.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/bd701dc8-6f83-490a-905d-fbba09438154.png)

- **Model** services its own business logic and database access
- **View / contract** schemas define what data looks like at the DB and HTTP boundaries
- **Controller** routes declare the contract, handlers fulfill it

A request through the demo API looks like this:

![Figure 5: Request flow through the demo API, including the validation failure path.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/5019c39c-8c45-46f4-8e68-b6388e4c9944.png)

In that diagram, a request flows through the Client, Middleware, Route contract, Handler, Service, and DB. Middleware handles logging and CORS. The route contract validates the body with Zod.

If validation fails, the client gets a `422 ApiError` and the handler never runs. If it passes, the handler gets a typed `CreateTaskInput`, calls `TaskService.create()`, the service inserts and parses the row, and the client gets `201` with the Task JSON.

---

## 6. How to Define Your API Schemas

Start with the HTTP contract in <VPIcon icon="fas fa-folder-open"/>`src/lib/schemas/`<VPIcon icon="iconfont icon-typescript"/>`task.ts`:

```ts title="src/lib/schemas/task.ts"
import { z } from '@hono/zod-openapi';

export const taskStatusSchema = z
  .enum(['todo', 'in_progress', 'done'])
  .openapi('TaskStatus');

export const taskSchema = z
  .object({
    id: z.string().uuid().openapi({
      example: '8e2c9f0a-2222-4a5a-9c3e-1a2b3c4d5e6f',
    }),
    title: z.string().min(1).max(120).openapi({
      example: 'Write the talk abstract',
    }),
    description: z.string().max(2000).nullable().openapi({
      example: 'Cover Hono + Zod patterns',
    }),
    status: taskStatusSchema.default('todo'),
    dueDate: z.string().date().nullable().openapi({
      example: '2026-07-15',
    }),
    createdAt: z.string().openapi({ example: '2026-06-28 10:15:00' }),
    updatedAt: z.string().openapi({ example: '2026-06-28 10:15:00' }),
  })
  .openapi('Task');

export type Task = z.infer<typeof taskSchema>;
```

That one object is now the runtime validator, TypeScript type, and an OpenAPI component named `Task`.

Request schemas should derive from the same base instead of being redeclared:

```ts title="src/lib/schemas/task.ts"
export const createTaskSchema = taskSchema
  .pick({ title: true, description: true, status: true, dueDate: true })
  .partial({ description: true, status: true, dueDate: true })
  .openapi('CreateTask');

export const updateTaskSchema = createTaskSchema
  .partial()
  .openapi('UpdateTask');

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
```

`CreateTask` never includes `id`, because clients don't send one. `UpdateTask` makes every field optional, because a `PATCH` can touch any subset.

![Figure 6: Request schemas derive from the same base resource schema.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/2f7cd7b3-1f40-4102-83f9-2c682eecc301.png)

We have three contracts with one source.

---

## 7. How to Separate Database Schemas from API Schemas

It's tempting to treat the database row and the API response as the same shape. In a tiny demo, they often look identical. In production, they diverge.

Keep them in separate files on purpose:

![Figure 7: Keep database schemas and HTTP schemas as two deliberate layers.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/7a80d075-4f35-467a-8470-3d87448a5982.png)

Figure 7 has two panels connected by an arrow labeled "map" in the service.

Left pane <VPIcon icon="fas fa-folder-open"/>`src/db/schema/` (persistence):

- Starts from a Drizzle table definition
- That table drives SQL migrations
- It also produces drizzle-zod schemas for parsing rows
- And row insert/select types for TypeScript at the database boundary

Right panel <VPIcon icon="fas fa-folder-open"/>`src/lib/schemas/` (HTTP contract):

- Uses Zod + `.openapi()` as the public contract
- Defines request bodies / params clients may send
- Defines response bodies clients receive
- Registers OpenAPI components used by `/doc` and `/reference`

The arrow in the middle matters: the database shape isn't automatically the API shape. The **service** maps between them. That's why an internal column can exist on the left without becoming part of the HTTP contract on the right.

In short:

- .<VPIcon icon="fas fa-folder-open"/>`src/db/schema/`: what a row looks like in the database
- .<VPIcon icon="fas fa-folder-open"/>`src/lib/schemas/`: what the HTTP contract looks like

Here's the Drizzle table from the demo:

```ts
import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const taskStatusValues = ['todo', 'in_progress', 'done'] as const;

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: taskStatusValues }).notNull().default('todo'),
  dueDate: text('due_date'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const selectTaskSchema = createSelectSchema(tasks, {
  status: z.enum(taskStatusValues),
});

export const insertTaskSchema = createInsertSchema(tasks, {
  id: () => z.string().uuid().optional(),
  title: () => z.string().min(1).max(120),
  description: () => z.string().max(2000).nullable().optional(),
  status: z.enum(taskStatusValues).optional(),
  dueDate: () => z.string().date().nullable().optional(),
});
```

One table definition gives you three outputs:

1. **TypeScript types** inferred from the columns
2. **SQL migrations** generated with `drizzle-kit`
3. **Zod schemas** via `drizzle-zod`

That's useful at the database boundary. It's not a replacement for your HTTP schemas.

The moment you add an internal `archivedAt` column, or a computed field the API returns that's not a column, the split pays for itself. Divergence becomes a normal change instead of a painful refactor.

![Figure 8: The service decides what the client may see.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/b055d171-05a7-4661-8a52-73db3f28c8b5.png)

---

## 8. How to Define Routes as Contracts

In this architecture, a route doesn't "just handle a request." A route declares the contract: method, path, request schemas, and response schemas.

![Figure 9: The route declares the contract. The handler fulfills it.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/b8a19630-7447-4a9e-a643-3c950d7a88cc.png)

```ts :collapsed-lines
import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from '@/lib/http-status-codes';
import { jsonContent } from '@/lib/openapi/json-content';
import { jsonApiErrorContent } from '@/lib/openapi/error-schema';
import {
  createTaskSchema,
  taskParamsSchema,
  taskSchema,
} from '@/lib/schemas/task';

export const createTask = createRoute({
  tags: ['Tasks'],
  method: 'post',
  path: '/tasks',
  summary: 'Create a task',
  request: {
    body: jsonContent(createTaskSchema, 'The task to create'),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(taskSchema, 'The created task'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]:
      jsonApiErrorContent('Validation error'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonApiErrorContent(
      'Internal server error',
    ),
  },
});

export const getTask = createRoute({
  tags: ['Tasks'],
  method: 'get',
  path: '/tasks/{id}',
  summary: 'Get a task by ID',
  request: {
    params: taskParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(taskSchema, 'The requested task'),
    [HttpStatusCodes.NOT_FOUND]: jsonApiErrorContent('Task not found'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]:
      jsonApiErrorContent('Validation error'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonApiErrorContent(
      'Internal server error',
    ),
  },
});
```

A small helper keeps response boilerplate readable:

```ts
export function jsonContent<T extends z.ZodTypeAny>(
  schema: T,
  description: string,
) {
  return {
    content: {
      'application/json': { schema },
    },
    description,
  };
}
```

Named status constants replace magic numbers. You use the same constants as object keys in the route and as switch cases in the handler. That makes status codes searchable and consistent.

---

## 9. How to Keep Handlers Thin

Once the route defines the contract, the handler only has to fulfill it.

```ts
export const getTask: AppRouteHandler<GetTaskRoute> = (c) => {
  try {
    const { id } = c.req.valid('param');
    return c.json(TaskService.get(id), HttpStatusCodes.OK);
  } catch (error) {
    const apiError = ApiError.parse(error);
    switch (apiError.statusCode) {
      case HttpStatusCodes.NOT_FOUND:
      case HttpStatusCodes.UNPROCESSABLE_ENTITY:
        return c.json(apiError.toResponseBody(), apiError.statusCode);
      default:
        return c.json(
          apiError.toResponseBody(),
          HttpStatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
  }
};

export const createTask: AppRouteHandler<CreateTaskRoute> = (c) => {
  try {
    const body = c.req.valid('json');
    return c.json(TaskService.create(body), HttpStatusCodes.CREATED);
  } catch (error) {
    const apiError = ApiError.parse(error);
    switch (apiError.statusCode) {
      case HttpStatusCodes.UNPROCESSABLE_ENTITY:
        return c.json(apiError.toResponseBody(), apiError.statusCode);
      default:
        return c.json(
          apiError.toResponseBody(),
          HttpStatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
  }
};
```

Notice what's *not* in the handler:

- No manual parsing of params or bodies
- No casting to `any`
- No business logic

`c.req.valid('param')` and `c.req.valid('json')` are already validated and typed. The service owns the database work:

```ts
get(id: string): Task {
  try {
    const row = db.select().from(tasks).where(eq(tasks.id, id)).get();
    if (!row) throw new NotFoundError(`Task ${id} not found`);
    return selectTaskSchema.parse(row);
  } catch (error) {
    throw ApiError.parse(error);
  }
},
```

The service wraps its body in one `try/catch` and normalizes every failure through `ApiError.parse()`. Zod errors, custom domain errors, and unexpected driver errors all become one typed shape.

---

## 10. How to Return One Error Shape Everywhere

Clients should never guess whether an error looks like `{ message }`, `{ error }`, or a raw stack trace.

In the demo, every failure becomes one envelope:

![Figure 10: Every failure path becomes one predictable error shape.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/85080f92-0fde-45cf-9b2e-eeb4f7ec5ef5.png)

The factory that creates routers bakes that behavior in with `defaultHook`:

```ts
export function createRouter() {
  return new OpenAPIHono({
    defaultHook: (result, c) => {
      if (!result.success) {
        const apiError = ApiError.parse(result.error);
        return c.json(apiError.toResponseBody(), apiError.statusCode);
      }
    },
  });
}
```

Every router goes through that factory. A bad UUID in a path param, a missing field in a POST body, or an invalid enum in a query string all produce the same response shape before the handler runs.

`ApiError.parse()` is the second half of the pattern:

```ts
public static parse(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (error instanceof ZodError) {
    return new ApiError('Validation error', {
      statusCode: 422,
      errors: error.flatten().fieldErrors,
    });
  }

  return new ApiError('Internal server error', { statusCode: 500 });
}
```

Handlers still use an explicit `switch` on status codes. That's intentional. Each route documents exactly which statuses it can return. A handler that should never emit `403` doesn't have `403` sitting in a shared helper's defaults.

The repetition is the point. Explicit beats clever here.

---

## 11. How to Generate Docs That Can't Drift

Because schemas are attached to route definitions, OpenAPI becomes a byproduct of the code instead of a separate chore.

![Figure 11: Docs are generated from the same route definitions as the runtime code.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/aac24756-84db-48f2-936a-3370c36b3dd2.png)

```ts
export function configureOpenAPI(app: OpenAPIHono) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Bulletproof Tasks API',
      version: '1.0.0',
    },
  });

  app.get(
    '/reference',
    apiReference({
      spec: { url: '/doc' },
      theme: 'kepler',
      layout: 'modern',
      pageTitle: 'Bulletproof Tasks API',
    }),
  );
}
```

- `GET /doc` returns the raw OpenAPI JSON
- `GET /reference` serves an interactive Scalar explorer

When you change a schema or a response code in the route file, the docs update with it. There's no second docs step to forget.

---

## 12. How to Make the App Production-Ready

Type safety at the request boundary isn't enough. Configuration and process lifecycle need the same discipline.

### Validate Environment Variables at Boot

```ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  LOG_LEVEL: z
    .enum(['silent', 'debug', 'info', 'warn', 'error', 'fatal'])
    .default('info'),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().default('tasks.db'),
});

export const env = envSchema.parse(process.env);
```

If a required value is missing or malformed, the process exits immediately with a clear Zod error. That's much better than discovering `undefined` three requests into production.

### Prefer Structured Logging

The demo uses Pino through `hono-pino` instead of a one-line console logger. In production you want JSON logs. In development you want something readable. One middleware can do both, and every request can carry a UUID.

### Shut Down Cleanly

Docker and process managers send `SIGTERM` before they kill a process. Handle it. Close the HTTP server, then close the database handle, then exit. Without that, a SQLite file (or a Postgres connection pool) can be left in a dirty state.

### Keep the App Runtime-Portable

Hono only depends on Web Standard APIs inside `app`. That means the same application object can run on Node:

```ts
import { serve } from '@hono/node-server';
import { app } from '@/app';

serve({ fetch: app.fetch, port: env.PORT });
```

Or on an edge runtime with almost nothing else:

```ts
import { app } from '@/app';

export default app;
```

That;s not a simplified example. That's the whole adapter.

---

## 13. How These Patterns Scale in a Production App

A Tasks API is a good teaching surface. Production systems are messier: you have uploads, background jobs, multiple packages, and longer-lived workflows.

[<VPIcon icon="iconfont icon-github"/>`otutukingsley/clipforge`](https://github.com/otutukingsley/clipforge) is a helpful example of a production app where those same ideas show up at scale. It's a self-hostable video processing toolkit built with Node.js, Hono, Zod, Drizzle, BullMQ, and Nuxt. You upload a video and get transcription, subtitles, summaries, chapter markers, and thumbnails.

The architecture looks like this:

```sh title="file structure":
apps/
├── api/        # Hono REST API
├── worker/     # BullMQ video processor
└── web/        # Nuxt frontend
packages/
├── shared/     # Zod schemas, constants, shared types
└── providers/  # OpenAI, Anthropic, Deepgram integrations
```

![Figure 12: ClipForge keeps the same contract-first core across web, API, and worker packages.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/f341110f-ef93-4b79-b0d0-9b07aeed04d2.png)

A video job moves through stages like uploading, validating, extracting audio, and so on without inventing new response shapes along the way:

![Figure 13: A video job moves through typed stages without inventing new response shapes.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/38487b12-26fd-4185-9ca1-48560a03699e.png)

The important part isn't the video pipeline. The important part is that the API still follows the same contract-first rules.

### Shared Zod Schemas Across Packages

ClipForge keeps HTTP contracts in `packages/shared`, so the API, worker, and web app share one vocabulary:

```ts
export const processingFeatureSchema = z.enum([
  'transcription',
  'subtitles',
  'summary',
  'chapters',
  'thumbnails',
]);

export const videoUploadSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  features: z
    .array(processingFeatureSchema)
    .default([
      'transcription',
      'subtitles',
      'summary',
      'chapters',
      'thumbnails',
    ]),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
});

export const jobStatusSchema = z.object({
  jobId: z.string(),
  title: z.string().optional(),
  state: jobStateSchema,
  stage: jobStageSchema,
  progress: z.number().min(0).max(100),
  result: jobResultSchema.optional(),
  failedReason: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
```

When the worker finishes a stage, it doesn't invent a new response shape. It updates state against the same schemas the API returns to the client.

### Routes Still Define the Contract

The upload route in ClipForge looks like the Tasks demo, just with multipart form data and rate limiting:

```ts :collapsed-lines
export const uploadVideo = createRoute({
  tags: ['videos'],
  method: 'post',
  path: '/videos/upload',
  middleware: [
    sessionMiddleware,
    apiKeysMiddleware,
    rateLimitMiddleware({
      windowMs: 60_000,
      max: 10,
      keyPrefix: 'ratelimit:upload',
    }),
  ] as const,
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            file: z.instanceof(File),
            title: z.string().min(3).max(200),
            description: z.string().max(2000).optional(),
            features: z.string().optional(),
            priority: z.enum(['low', 'normal', 'high']).optional(),
          }),
        },
      },
    },
  },
  responses: {
    [HTTP_STATUS.ACCEPTED]: jsonContent(
      jobStatusSchema,
      'Video accepted for processing',
    ),
    [HTTP_STATUS.BAD_REQUEST]: jsonApiErrorContent('Invalid request'),
    [HTTP_STATUS.UNPROCESSABLE]: jsonApiErrorContent('Validation error'),
    [HTTP_STATUS.TOO_MANY_REQUESTS]: jsonApiErrorContent('Rate limit exceeded'),
  },
});
```

The handler validates input, writes a job row, enqueues BullMQ work, and returns `202 Accepted` with a typed job status. The heavy lifting happens in the worker. The API stays a contract layer.

![Figure 14: The API accepts the upload and returns a typed job status while the worker does the heavy lifting.](https://cdn.hashnode.com/uploads/covers/63cd01e7cc7a92b9f77dc1e8/5d3d8157-b1c0-4f40-82f1-9023de847a24.png)

Figure 14 is a sequence diagram with five participants: Web UI, Hono API, BullMQ, Worker, and Postgres. It shows the async boundary between “accept the upload” and “finish processing.” Here's every step in the diagram:

1. The Web UI sends `POST /videos/upload` to the Hono API.
2. The Hono API runs `Zod + middleware` (validate input, session, rate limits, and related checks).
3. The Hono API performs `insert job row` in Postgres so the job exists before work starts.
4. The Hono API sends `enqueue process-video` to BullMQ.
5. The Hono API immediately returns `202 + jobStatusSchema` to the Web UI. At this point the client has a typed job status, but transcription hasn't finished yet.
6. BullMQ later delivers `process job` to the Worker.
7. The Worker runs `transcribe / analyze / thumbnails` as background work.
8. The Worker writes `update stage + result` back to Postgres as stages complete.
9. The Web UI polls with `GET /videos/jobs/{id}` against the Hono API.
10. The Hono API reads the latest job from Postgres and returns `jobStatusSchema` agai the same response shape as step 5, now with updated `stage`, `progress`, and eventually `result`.

So the API stays a fast contract layer: accept, persist, enqueue, and respond. The worker owns the slow pipeline. The UI tracks progress by polling one share status schema.

### Database Schemas Still Stay Separate

ClipForge stores jobs in Postgres with Drizzle:

```ts
export const jobs = pgTable('jobs', {
  id: varchar('id', { length: 36 }).primaryKey(),
  sessionId: varchar('session_id', { length: 36 }).notNull(),
  state: jobStateEnum('state').notNull().default('waiting'),
  stage: jobStageEnum('stage').notNull().default('uploading'),
  progress: integer('progress').notNull().default(0),
  title: varchar('title', { length: 200 }).notNull(),
  features: jsonb('features').$type<string[]>().notNull(),
  provider: varchar('provider', { length: 50 }).notNull().default('openai'),
  result: jsonb('result').$type<JobResult>(),
  failedReason: text('failed_reason'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
```

The table has persistence concerns like `filePath` and `sessionId`. The public `jobStatusSchema` doesn't have to expose all of them. That's the same DB-versus-API split from the Tasks demo, applied to a real workflow.

### The Same Production Habits Still Apply

ClipForge validates environment variables with Zod on boot, configures OpenAPI and Scalar at `/doc` and `/reference`, normalizes failures through `ApiError`, and shuts down queues and Redis on `SIGTERM`.

The lesson is simple: if the small app is structured correctly, the large app doesn't need a different philosophy. It needs more packages, more middleware, and longer-running jobs on top of the same contract-first core.

---

## Conclusion

Type-safe APIs aren't about adding more TypeScript. They're about removing duplicate sources of truth.

With Hono and Zod you can:

- validate requests at runtime
- infer types automatically
- generate OpenAPI docs from the same route definitions
- keep database schemas and HTTP schemas intentionally separate
- return one predictable error shape from every failure path

::: info

Start with the [<VPIcon icon="iconfont icon-github"/>`otutukingsley/api-conf-demo`](https://github.com/otutukingsley/api-conf-demo) if you want the smallest readable version of these patterns. Then look at [<VPIcon icon="iconfont icon-github"/>`otutukingsley/clipforge`](https://github.com/otutukingsley/clipforge) to see how the same ideas hold up when the API sits in front of uploads, queues, and multi-stage processing.

:::

Once your route definition is the contract, your docs stop drifting, your handlers get thinner, and your clients get an API they can trust.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Type-Safe APIs with Hono and Zod",
  "desc": "If you've shipped a Node.js API before, you already know this pain: your TypeScript types say one thing, your runtime validation says another, and your OpenAPI docs quietly disagree with both. Someone",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-type-safe-apis-with-hono-and-zod.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
