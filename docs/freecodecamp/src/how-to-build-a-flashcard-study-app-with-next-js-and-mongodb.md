---
lang: en-US
title: "How to Build a Flashcard Study App with Next.js and MongoDB"
description: "Article(s) > How to Build a Flashcard Study App with Next.js and MongoDB"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - CSS
  - TailwindCSS
  - DevOps
  - Docker
  - Data Science
  - MongoDB
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
  - css
  - tailwind
  - tailwindcss
  - tailwind-css
  - devops
  - docker
  - data-science
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Flashcard Study App with Next.js and MongoDB"
    - property: og:description
      content: "How to Build a Flashcard Study App with Next.js and MongoDB"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-flashcard-study-app-with-next-js-and-mongodb.html
prev: /programming/js-next/articles/README.md
date: 2026-08-27
isOriginal: false
author:
  - name: David Aniebo
    url: https://freecodecamp.org/news/author/davidaniebo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ed3602f9-f68c-4917-bc61-338d3ffba6e7.png
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
  "title": "TailwindCSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Flashcard Study App with Next.js and MongoDB"
  desc="If you've ever crammed for an exam the night before, you know how hard it is to remember everything. Flashcards are one of the most effective study tools because they use active recall: you actively t"
  url="https://freecodecamp.org/news/how-to-build-a-flashcard-study-app-with-next-js-and-mongodb"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ed3602f9-f68c-4917-bc61-338d3ffba6e7.png"/>

If you've ever crammed for an exam the night before, you know how hard it is to remember everything.

Flashcards are one of the most effective study tools because they use **active recall**: you actively try to remember the answer instead of passively reading notes. Research shows this strengthens memory and helps information stick.

In this tutorial, you'll build a full-stack flashcard app that lets students:

- **Create subjects** (like "Biology 101" or "Calculus")
- **Add flashcards** with a question on the front and answer on the back
- **Study** by flipping cards and marking them correct or wrong
- **Track progress** to see how well they're doing

By the end, you'll have a working app that stores data in MongoDB and runs on Next.js. No prior experience with these tools is required. We'll explain everything as we go.

::: info What You'll Learn

- How to set up a Next.js project with TypeScript
- How to connect to MongoDB and store data
- How to build API routes for creating, reading, updating, and deleting data
- How to build a React UI with forms, lists, and interactive flashcards
- How to add a flip animation and progress tracking

:::

---

## Tech Stack Overview

Before we start coding, here's what we're using and why.

### Next.js

Next.js is a React framework for building web applications. It handles routing, server-side rendering, and API routes out of the box.

Instead of building a separate frontend and backend, Next.js lets us put both in one project. We can create API routes (like `/api/flashcards`) that talk to the database, and pages that display the UI, all in the same codebase.

### MongoDB

MongoDB is a NoSQL database that stores data as JSON-like documents. Unlike traditional tables with rows and columns, you store flexible "documents" in "collections."

MongoDB is beginner-friendly, works well with JavaScript/TypeScript, and has a generous free tier (MongoDB Atlas) or can run locally with Docker.

### Mongoose

Mongoose is a library that lets you define schemas and models for MongoDB. It adds structure and validation so you don't accidentally save invalid data.

Without Mongoose, you'd write raw MongoDB queries. With Mongoose, you define a "Flashcard" model once and use simple methods like `Flashcard.create()` or `Flashcard.find()`.

### Tailwind CSS

Tailwind is a utility-first CSS framework. Instead of writing custom CSS, you add classes like `rounded-xl` or `bg-blue-500` directly in your HTML.

Tailwind speeds up styling and keeps the design consistent. Next.js supports it out of the box.

---

## Project Setup

### Step 1: Create the Next.js Project

Open your terminal and run:

```sh
npx create-next-app@latest flash-cards --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted, choose:

- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- .<VPIcon icon="fas fa-folder-open"/>`src/` directory: **Yes**
- App Router: **Yes**
- Import alias: `@/*`

This creates a new folder called `flash-cards` with a basic Next.js app.

### Step 2: Install Mongoose

Mongoose is not included by default. Run the commands below to Install it.

```sh
cd flash-cards
npm install mongoose
```

### Step 3: Set Up MongoDB

You have two options:

#### Option A: Docker (recommended for local development)

Create a file called <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` in your project root:

```yaml title="docker-compose.yml"
services:
  mongodb:
    image: mongo:7
    container_name: flashstudy-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

Then run:

```sh
docker compose up -d
```

This starts MongoDB in the background. Your data is stored in a Docker volume, so it persists even if you stop the container.

#### Option B: MongoDB Atlas (cloud)

1. Go to [<VPIcon icon="iconfont icon-mongodb"/>mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user and get your connection string
4. Add your IP to the network access list

### Step 4: Create the Environment File

Create a file named <VPIcon icon="iconfont icon-dotenv"/>`.env.local` in your project root (this file is ignored by Git for security):

```sh title=".env.local"
MONGODB_URI=mongodb://localhost:27017/flashcards
```

If you're using Atlas, replace this with your connection string, for example:

```sh title=".env.local"
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flashcards?retryWrites=true&w=majority
```

### Step 5: Understand the Folder Structure

After setup, your project looks like this:

```sh title="file structure"
flash-cards/
├── src/
│   ├── app/              # Pages and API routes
│   │   ├── api/          # Backend API endpoints
│   │   ├── subjects/     # Subject list and detail pages
│   │   ├── study/        # Study mode page
│   │   └── progress/     # Progress tracking page
│   ├── components/       # Reusable UI components
│   └── lib/              # Utilities and database code
│       ├── db.ts         # MongoDB connection
│       └── models/       # Mongoose schemas
├── .env.local            # Environment variables (you create this)
├── docker-compose.yml    # Docker config for MongoDB
└── package.json
```

The <VPIcon icon="fas fa-folder-open"/>`app` folder uses Next.js App Router: each folder can have a <VPIcon icon="fa-brands fa-react"/>`page.tsx` (the UI) and <VPIcon icon="iconfont icon-typescript"/>`route.ts` (API endpoints). We'll build these step by step.

---

## Building the Features

### Part 1: Connecting to MongoDB

Before we can store or retrieve flashcards, we need to connect our application to MongoDB.

We'll create a small database utility that handles this connection for us. Because Next.js can handle multiple requests and reload modules during development, we don't want to create a new MongoDB connection every time an API route runs. Instead, we'll cache the connection and reuse it whenever possible.

Let's start by creating a <VPIcon icon="iconfont icon-typescript"/>`db.ts` file inside the <VPIcon icon="fas fa-folder-open"/>`src/lib` directory.

```ts :collapsed-lines title="lib/db.ts"
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/flashcards";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
```

::: info Here's a line-by-line explanation of this code

- `MONGODB_URI`: Reads the connection string from <VPIcon icon="iconfont icon-dotenv"/>`.env.local`. Falls back to local MongoDB if not set.
- `MongooseCache`: A TypeScript interface describing our cache: we store either a connection (`conn`) or a promise that will eventually give us one.
- `global.mongoose`: In development, Next.js may reload modules. Using `global` keeps our cache across reloads so we don't create duplicate connections.
- `dbConnect()`: If we already have a connection, return it. Otherwise, create one, cache it, and return it. Every API route will call `await dbConnect()` before touching the database.

:::

### Part 2: Defining the Data Models

Now that our application can connect to MongoDB, let's define the data we'll store in the database.

Our flashcard app needs three types of data:

- **Subjects**: Categories such as Biology 101 or Calculus.
- **Flashcards**: Questions and answers that belong to a subject.
- **Progress**: Records of how well the user performs when studying.

We'll use Mongoose schemas to define the structure of each type of data. A schema describes the fields a document can have and the type of data each field should contain.

Let's start with the `Subject` model.

#### Subject Model

A subject represents a category of flashcards. For example, a student might create a subject called **Biology 101** and use it to organize their biology flashcards.

Each subject will have a name, an optional description, and a color that we'll use when displaying the subject in the UI.

First, create a <VPIcon icon="fas fa-folder-open"/>`models` directory inside <VPIcon icon="fas fa-folder-open"/>`src/lib` if you haven't already. Then create a file named <VPIcon icon="iconfont icon-typescript"/>`Subject.ts` inside it.

```ts title="lib/models/Subject.ts"
import mongoose, { Schema, model, models } from "mongoose";

export interface ISubject {
  _id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    color: { type: String, default: "#6366f1" },
  },
  { timestamps: true }
);

export default models.Subject || model<ISubject>("Subject", SubjectSchema);
```

::: info In this code

- `ISubject`: TypeScript interface. Describes what a subject object looks like in our app.
- `SubjectSchema` – Mongoose schema. `name` is required, while `description` and `color` are optional. `color` defaults to a purple hex.
- `timestamps: true`: Mongoose automatically adds `createdAt` and `updatedAt` to every document.
- `models.Subject || model(...)`: In development, modules can reload. This prevents "model already defined" errors by reusing the existing model if it exists.

:::

#### Flashcard Model

A flashcard belongs to a subject and contains a question on the front and an answer on the back.

Next, let's create the `Flashcard` model. Inside <VPIcon icon="fas fa-folder-open"/>`src/lib/models`, create a file named <VPIcon icon="iconfont icon-typescript"/>`Flashcard.ts` and add the code below:

```ts title="lib/models/Flashcard.ts"
import mongoose, { Schema, model, models } from "mongoose";

export interface IFlashcard {
  _id: string;
  subjectId: string;
  front: string;
  back: string;
  createdAt: Date;
  updatedAt: Date;
}

const FlashcardSchema = new Schema(
  {
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    front: { type: String, required: true },
    back: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Flashcard || model<IFlashcard>("Flashcard", FlashcardSchema);
```

::: info In this code

- `subjectId`: References a Subject by its `_id`. `ref: "Subject"` lets Mongoose populate this field (replace the ID with the full subject object when we fetch).
- `front` and `back`: The question and answer text.

:::

#### Progress Model

When a user studies, we need to record whether they answered each flashcard correctly or incorrectly. We'll use this information to display their progress on the dashboard.

Next, let's create the `Progress` model. Inside <VPIcon icon="fas fa-folder-open"/>`src/lib/models`, create a file named <VPIcon icon="iconfont icon-typescript"/>`Progress.ts` and add the code below:

```ts title="lib/models/Progress.ts"
import mongoose, { Schema, model, models } from "mongoose";

export interface IProgress {
  _id: string;
  flashcardId: string;
  subjectId: string;
  correct: boolean;
  reviewedAt: Date;
}

const ProgressSchema = new Schema(
  {
    flashcardId: { type: Schema.Types.ObjectId, ref: "Flashcard", required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    correct: { type: Boolean, required: true },
    reviewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Progress || model<IProgress>("Progress", ProgressSchema);
```

::: info In this code

- `correct`: `true` if the user knew the answer, `false` if not.
- `reviewedAt`: When the review happened. We use this for sorting and future features like spaced repetition.

:::

### Subjects API – List and Create

Now that we've defined our data models, let's create the API routes that will allow the application to work with that data.

API routes handle requests from the frontend and communicate with MongoDB. In this section, we'll create routes for creating and retrieving subjects and flashcards.

We'll start with the subjects API. This route will support two operations:

- **GET**: Retrieve all subjects.
- **POST**: Create a new subject.

Inside <VPIcon icon="fas fa-folder-open"/>`src/app/api/subjects`, create a file named <VPIcon icon="iconfont icon-typescript"/>`route.ts` and add the code below:

```ts :collapsed-lines title="app/api/subjects/route.ts"
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subject from "@/lib/models/Subject";

export async function GET() {
  try {
    await dbConnect();
    const subjects = await Subject.find({}).sort({ createdAt: -1 });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, description, color } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Subject name is required" },
        { status: 400 }
      );
    }

    const subject = await Subject.create({
      name,
      description: description || "",
      color: color || "#6366f1",
    });

    return NextResponse.json(subject);
  } catch (error) {
    console.error("Error creating subject:", error);
    return NextResponse.json(
      { error: "Failed to create subject" },
      { status: 500 }
    );
  }
}
```

::: info In this code

- `GET`: Fetches all subjects, sorted by newest first. `find({})` means "find all." Returns them as JSON.
- `POST`: Creates a new subject. Reads `name`, `description`, and `color` from the request body. Validates that `name` exists. Uses `Subject.create()` to save to MongoDB. Returns the created subject.
- `status: 400`: Bad request (missing data). `status: 500`: Server error (for example, database failure).

:::

#### Flashcards API – List and Create

Next, let's create the API route for working with flashcards. This route will let us retrieve existing flashcards and create new ones.

Inside <VPIcon icon="fas fa-folder-open"/>`src/app/api/flashcards`, create a file named <VPIcon icon="iconfont icon-typescript"/>`route.ts` and add the code block:

```ts :collapsed-lines title="app/api/flashcards/route.ts"
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Flashcard from "@/lib/models/Flashcard";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");

    const query = subjectId ? { subjectId } : {};
    const flashcards = await Flashcard.find(query)
      .populate("subjectId", "name color")
      .sort({ createdAt: -1 });

    return NextResponse.json(flashcards);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { subjectId, front, back } = body;

    if (!subjectId || !front || !back) {
      return NextResponse.json(
        { error: "Subject, front, and back are required" },
        { status: 400 }
      );
    }

    const flashcard = await Flashcard.create({
      subjectId,
      front,
      back,
    });

    const populated = await Flashcard.findById(flashcard._id).populate(
      "subjectId",
      "name color"
    );

    return NextResponse.json(populated);
  } catch (error) {
    console.error("Error creating flashcard:", error);
    return NextResponse.json(
      { error: "Failed to create flashcard" },
      { status: 500 }
    );
  }
}
```

::: info In this code:

- `searchParams.get("subjectId")`: For `GET /api/flashcards?subjectId=abc123`, we filter by that subject. If no `subjectId`, we return all flashcards.
- `.populate("subjectId", "name color")`: Replaces the raw ID with the subject object, but only includes `name` and `color`. Makes it easy to display the subject name in the UI.
- `POST`: Requires `subjectId`, `front`, and `back`. After creating, we fetch the flashcard again with `populate` so the response includes the subject details.

:::

![Flashcard-create-study-form](https://cdn.hashnode.com/uploads/covers/6904c2dbd42ef6b1f9e61c3e/f15cd9c8-87d1-461b-92ac-4ec091481338.jpg)

### Part 4: Editing and Deleting (Dynamic API Routes)

For individual subjects and flashcards, we'll use **dynamic routes**. In Next.js, placing `[id]` in a folder name creates a route that can handle different IDs. For example, `/api/subjects/123` and `/api/subjects/456` can use the same route.

#### Subject API Route

Let's start by creating the dynamic route for individual subjects. This route will let us retrieve, update, or delete a subject.

Inside <VPIcon icon="fas fa-folder-open"/>`src/app/api/subjects/[id]`, create a file named <VPIcon icon="iconfont icon-typescript"/>`route.ts` and add the code below:

```ts :collapsed-lines title="app/api/subjects/[id]/route.ts"
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subject from "@/lib/models/Subject";
import Flashcard from "@/lib/models/Flashcard";
import Progress from "@/lib/models/Progress";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const subject = await Subject.findById(id);

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    return NextResponse.json(subject);
  } catch (error) {
    console.error("Error fetching subject:", error);
    return NextResponse.json(
      { error: "Failed to fetch subject" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { name, description, color } = body;

    const subject = await Subject.findByIdAndUpdate(
      id,
      { name, description, color },
      { new: true }
    );

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    return NextResponse.json(subject);
  } catch (error) {
    console.error("Error updating subject:", error);
    return NextResponse.json(
      { error: "Failed to update subject" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    await Flashcard.deleteMany({ subjectId: id });
    await Progress.deleteMany({ subjectId: id });
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Subject deleted" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    return NextResponse.json(
      { error: "Failed to delete subject" },
      { status: 500 }
    );
  }
}
```

::: info In this code

- `params`: In Next.js 15+, `params` is a Promise. We `await` it to get `{ id: "abc123" }`.
- `findByIdAndUpdate(id, updates, { new: true })`: Updates the document and returns the updated version. `{ new: true }` means "return the new document, not the old one."
- `DELETE`: When we delete a subject, we also delete its flashcards and progress records. Otherwise we'd have orphaned data.

:::

#### Flashcard by ID – Get, Update, Delete

Now, let's create the dynamic route for individual flashcards. This route will let us retrieve, update, or delete a flashcard.

Inside <VPIcon icon="fas fa-folder-open"/>`src/app/api/flashcards/[id]`, create a file named <VPIcon icon="iconfont icon-typescript"/>`route.ts` and add the code below:

```ts :collapsed-lines title="app/api/flashcards/[id]/route.ts"
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Flashcard from "@/lib/models/Flashcard";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const flashcard = await Flashcard.findById(id).populate(
      "subjectId",
      "name color"
    );

    if (!flashcard) {
      return NextResponse.json(
        { error: "Flashcard not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(flashcard);
  } catch (error) {
    console.error("Error fetching flashcard:", error);
    return NextResponse.json(
      { error: "Failed to fetch flashcard" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { front, back } = body;

    const flashcard = await Flashcard.findByIdAndUpdate(
      id,
      { front, back },
      { new: true }
    ).populate("subjectId", "name color");

    if (!flashcard) {
      return NextResponse.json(
        { error: "Flashcard not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(flashcard);
  } catch (error) {
    console.error("Error updating flashcard:", error);
    return NextResponse.json(
      { error: "Failed to update flashcard" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const flashcard = await Flashcard.findByIdAndDelete(id);

    if (!flashcard) {
      return NextResponse.json(
        { error: "Flashcard not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Flashcard deleted" });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: 500 }
    );
  }
}
```

### Part 5: Progress Tracking API

When a user marks a flashcard as correct or incorrect during a study session, we need to save that result. We'll also use this data to calculate progress statistics, such as the percentage of correct answers for each subject.

Next, let's create the API route for tracking progress. Inside <VPIcon icon="fas fa-folder-open"/>`src/app/api/progress`, create a file named <VPIcon icon="iconfont icon-typescript"/>`route.ts` and add the code below:

```ts :collapsed-lines title="app/api/progress/route.ts"
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Progress from "@/lib/models/Progress";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectId");

    const query = subjectId ? { subjectId } : {};
    const progress = await Progress.find(query).sort({ reviewedAt: -1 });

    const stats = await Progress.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$subjectId",
          total: { $sum: 1 },
          correct: { $sum: { $cond: ["$correct", 1, 0] } },
        },
      },
    ]);

    return NextResponse.json({ progress, stats });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { flashcardId, subjectId, correct } = body;

    if (!flashcardId || !subjectId || typeof correct !== "boolean") {
      return NextResponse.json(
        { error: "flashcardId, subjectId, and correct are required" },
        { status: 400 }
      );
    }

    const progress = await Progress.create({
      flashcardId,
      subjectId,
      correct,
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error recording progress:", error);
    return NextResponse.json(
      { error: "Failed to record progress" },
      { status: 500 }
    );
  }
}
```

::: info In this code

- `aggregate`: MongoDB's aggregation pipeline. We group by `subjectId` and count total reviews and correct answers. `$cond: ["$correct", 1, 0]` means "if correct is true, add 1, else add 0."
- `stats`: Returns something like `[{ _id: "subjectId123", total: 20, correct: 16 }]`. The frontend uses this to show "80% accuracy" per subject.

:::

---

## UI Implementation

Now we'll build the pages users see. We'll use React hooks (`useState`, `useEffect`) to manage data and `fetch` to call our API.

### The Subjects Page

On load, we fetch subjects from the API. We show a form to create new subjects. Each subject is a card that links to its detail page.

Key logic:

1. `useEffect` runs once on mount and calls `fetch("/api/subjects")`.
2. The form's `onSubmit` calls `fetch("/api/subjects", { method: "POST", ... })`.
3. After a successful create, we clear the form and call `fetchSubjects()` again to refresh the list.

```tsx
// Simplified structure - see full code in src/app/subjects/page.tsx
const [subjects, setSubjects] = useState<Subject[]>([]);
const [showForm, setShowForm] = useState(false);

useEffect(() => {
  fetch("/api/subjects")
    .then((res) => res.json())
    .then((data) => setSubjects(data));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  await fetch("/api/subjects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, color }),
  });
  fetchSubjects(); 
};
```

![Flashcard-study-list](https://cdn.hashnode.com/uploads/covers/6904c2dbd42ef6b1f9e61c3e/30d83725-4d91-4642-b8ee-f3a89726843f.jpg)

### The Subject Detail Page (Creating and Editing Flashcards)

This page shows one subject and its flashcards. Users can add new cards or edit/delete existing ones. The URL is `/subjects/[id]`, so we use `useParams()` to get the subject ID.

Key logic:

1. `useParams()` gives us the `id` from the URL.
2. We fetch the subject and its flashcards on mount.
3. "Add Flashcard" shows a form. On submit, we POST to `/api/flashcards` with `subjectId`, `front`, and `back`.
4. Each card has Edit and Delete buttons. Edit switches to an inline form, while Delete calls `DELETE /api/flashcards/[id]`.

```tsx
// Creating a flashcard
const handleCreate = async (e) => {
  e.preventDefault();
  await fetch("/api/flashcards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subjectId: id, front, back }),
  });
  fetchFlashcards(); // Refresh
};

// Updating a flashcard
const handleUpdate = async (e) => {
  e.preventDefault();
  await fetch(`/api/flashcards/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ front: editFront, back: editBack }),
  });
  setEditingId(null);
  fetchFlashcards();
};
```

![Study-details-page](https://cdn.hashnode.com/uploads/covers/6904c2dbd42ef6b1f9e61c3e/e60ba077-b22b-4f71-895f-5fce4f9e66d3.jpg)

### The Study Page – Flipping Cards

The study page has three main states:

1. **Subject selection**: User picks which subject to study.
2. **Ready to start**: Shows "Start Studying" with the card count.
3. **Studying**: Shows one card at a time. User clicks to flip, then marks correct or wrong. We advance to the next card and record progress.

#### The Flip Animation

We use CSS 3D transforms to create the flip animation. The flashcard has two faces: a front for the question and a back for the answer. When `flipped` is `true`, we rotate the card container 180 degrees. We also use `backface-visibility: hidden` so that only the appropriate face is visible during the rotation.

To add the styles for the flip animation, open <VPIcon icon="fas fa-folder-open"/>`src/app/`<VPIcon icon="fa-brands fa-css3-alt"/>`globals.css` and add the following code:

```css title="app/globals.css"
/* Flashcard flip animation */
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

/* Lined paper effect for the card background */
.lined-paper {
  background-image: repeating-linear-gradient(
    transparent,
    transparent 27px,
    #e5e7eb 27px,
    #e5e7eb 28px
  );
}
```

The `lined-paper` class creates horizontal grey lines (like notebook paper) using a repeating gradient. This gives the flashcard a familiar, study-friendly look.

The card structure:

```tsx
<div
  className={`preserve-3d transition-transform duration-500 ${
    flipped ? "[transform:rotateY(180deg)]" : ""
  }`}
>
  {/* Front face - Question */}
  <div className="backface-hidden [transform:rotateY(0deg)]">
    {currentCard.front}
  </div>
  {/* Back face - Answer */}
  <div className="backface-hidden [transform:rotateY(180deg)]">
    {currentCard.back}
  </div>
</div>
```

When the user clicks the card, we toggle `flipped`. The parent rotates, and the correct face becomes visible.

![](https://cdn.hashnode.com/uploads/covers/6904c2dbd42ef6b1f9e61c3e/a92a03c7-c562-4600-ba2c-ecd6e85ab00c.jpg)

#### Recording Progress

When the user clicks "Got it!" or "Didn't know", we:

1. POST to `/api/progress` with `flashcardId`, `subjectId`, and `correct`.
2. Update local state (`sessionCorrect` or `sessionWrong`) for the live stats.
3. Move to the next card. If we've finished all cards, we show the "Start Studying" screen again.

```tsx
const handleKnow = () => {
  recordProgress(true);
  setFlipped(false);
  if (currentIndex < flashcards.length - 1) {
    setCurrentIndex((i) => i + 1);
  } else {
    setStudyStarted(false);
    setCurrentIndex(0);
  }
};
```

### The Progress Page

Here, we fetch subjects and progress stats. For each subject, we look up its stats (total reviews, correct count) and compute the percentage. We display overall stats at the top and per-subject breakdown below.

```tsx
const getSubjectStats = (subjectId) => {
  const stat = stats.find((s) => s._id === subjectId);
  return stat
    ? {
        total: stat.total,
        correct: stat.correct,
        pct: Math.round((stat.correct / stat.total) * 100),
      }
    : null;
};
```

### Optional: Lined Paper and Paperclip Icon

The app includes a lined-paper effect and a paperclip icon to make the flashcard feel more tactile. The paperclip is a simple SVG component:

```tsx title="components/PaperclipIcon.tsx"
export default function PaperclipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
```

Place it at the top center of the flashcard. The `lined-paper` class is applied to the card content area for the notebook effect.

---

## Best Practices

### Code Organization

- **Models** in `lib/models/`: One file per model. Keeps schemas in one place.
- **API routes** in <VPIcon icon="fas fa-folder-open"/>`app/api/`: Group by resource (subjects, flashcards, progress). Use `[id]` for dynamic routes.
- **Reusable components**: The `PaperclipIcon` is in `components/`. Use this pattern for any UI you repeat.

### Error Handling

- **API routes**: Always wrap logic in `try/catch`. Return appropriate status codes (400 for bad input, 404 for not found, 500 for server errors).
- **Frontend**: Check `res.ok` before using `res.json()`. Show loading and error states to the user.

### Performance Tips

- **Database connection**: Reuse the connection (our `dbConnect` does this). Don't connect on every request.
- **Populate sparingly**: Only `.populate()` fields you need. Specify which fields: `.populate("subjectId", "name color")`.
- **Loading states**: Show a spinner while fetching. Prevents layout shift and gives feedback.

---

## Conclusion

You've built a full-stack flashcard app with:

- **Next.js** for the app and API routes
- **MongoDB + Mongoose** for storing subjects, flashcards, and progress
- **React** for the UI with forms, lists, and a flip animation
- **Tailwind CSS** for styling

### Possible Improvements

There are a few features you could build to improve this app.

First, you could add authentication. Add login so each user has their own subjects and cards. Consider NextAuth.js or Clerk.

Second, you could add a spaced repetition feature. Use the progress data to show cards at optimal intervals (for example, cards you got wrong more often).

Next, you could add some animations, like transitions between cards or a confetti effect when a session is complete.

You could also build in mobile responsiveness. The current layout works on desktop, but you could optimize the study view for phones.

And finally, an export/import feature could be useful: let users export their flashcards as JSON or CSV for backup.

### Next Steps

To take this further, run `npm run dev` and explore the app. You can add a few subjects and flashcards, then try the study mode.

After that, open MongoDB Compass or Atlas to inspect your data. Experiment with the code: change colors, add fields, or tweak the flip animation.

Happy studying!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Flashcard Study App with Next.js and MongoDB",
  "desc": "If you've ever crammed for an exam the night before, you know how hard it is to remember everything. Flashcards are one of the most effective study tools because they use active recall: you actively t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-flashcard-study-app-with-next-js-and-mongodb.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
