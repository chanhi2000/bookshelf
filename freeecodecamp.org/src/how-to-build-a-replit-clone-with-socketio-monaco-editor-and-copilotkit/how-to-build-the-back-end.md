---
lang: en-US
title: "How to Build the Back End"
description: "Article(s) > (4/6) How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit" 
category:
  - Node.js
  - Next.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (4/6) How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit"
    - property: og:description
      content: "How to Build the Back End"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit/how-to-build-the-back-end.html
date: 2025-02-21
isOriginal: false
author:
  - name: Prankur Pandey
    url : https://freecodecamp.org/news/author/prankurpandeyy/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740064335866/a058fbf3-2d89-4e95-9d3b-07224f3985be.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit",
  "desc": "I’ve been coding for about a decade now. And over the years, I’ve tried my fair share of development tools—especially IDEs like Sublime Text, Atom, and even NetBeans back in my college days. But when VS Code came along, it completely changed the game...",
  "link": "/freecodecamp.org/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Replit Clone with Socket.io, Monaco Editor, and Copilotkit"
  desc="I’ve been coding for about a decade now. And over the years, I’ve tried my fair share of development tools—especially IDEs like Sublime Text, Atom, and even NetBeans back in my college days. But when VS Code came along, it completely changed the game..."
  url="https://freecodecamp.org/news/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit#heading-how-to-build-the-back-end"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740064335866/a058fbf3-2d89-4e95-9d3b-07224f3985be.png"/>

Before we start building the back end, you’ll need to put all important credentials into your <FontIcon icon="fas fa-file-lines"/>`.env` file, which should look like this:

```sh title=".env"
NEXT_PUBLIC_GROQ_CLOUD_API_KEY=<your-key-here>
MONGODB_URI=<your-mongodb-url>
```

These are environment variables used to configure sensitive or environment-specific settings in an application:

1. `NEXT_PUBLIC_GROQ_CLOUD_API_KEY`:
    - This is a public API key for accessing the Groq Cloud API.
    - It is prefixed with `NEXT_PUBLIC_`, which means it is exposed to the client-side code in a Next.js application.
    - Replace `<your-key-here>` with the actual API key provided by Groq Cloud.
2. `MONGODB_URI`:
    - This is the connection string for a MongoDB database.
    - It includes the database URL, credentials, and other connection details.
    - Replace `<your-mongodb-url>` with the actual MongoDB connection string.

---

## How to Configure the CopilotKit Back End

Open your Next.js app in any code editor

![I prefer VSCode—and go to the root folder, which looks like this:](https://cdn.hashnode.com/res/hashnode/image/upload/v1738858655371/f648cb98-62a0-4bdd-9d03-994c7bbf758f.png)

Inside the <FontIcon icon="fas fa-folder-open"/>`app` folder, make a new folder called <FontIcon icon="fas fa-folder-open"/>`api`. Inside the API folder, make another folder called <FontIcon icon="fas fa-folder-open"/>`copilotkit`. Then in there, make a new file called <FontIcon icon="fa-brands fa-js"/>`route.js` and paste this code inside the file:

```jsx :collapsed-lines title="app/api/copilotkit/route.js"
import {
  CopilotRuntime,
  GroqAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_CLOUD_API_KEY });

const copilotKit = new CopilotRuntime({
  async onResponse({ message, context }) {
    try {
      // Extract any file operations from the message and process them
      const fileBlocks = message.content.split("---");
      if (fileBlocks.length > 0) {
        // Format the response to use processFiles action
        return {
          content: `@processFiles(response: \`${message.content}\`)`,
        };
      }
      return message;
    } catch (error) {
      console.error("Error in onResponse:", error);
      return message;
    }
  },
});

const serviceAdapter = new GroqAdapter({
  groq,
  model: "llama-3.3-70b-versatile",
  systemPrompt: `You are an AI-powered code generator integrated into a web-based IDE. Your task is to generate project files and code based on user commands.

When generating files, use this exact format:

FILE: filename.ext
CODE:
[code content here]

For multiple files, separate them with "---".

Example response:
I'll create a React component:

FILE: Button.jsx
CODE:
import React from 'react';

const Button = () => {
  return (
    <button className="btn">Click me</button>
  );
};

export default Button;

Important rules:
- Always include both FILE: and CODE: markers
- Use appropriate file extensions
- Generate complete, working code
- Maintain proper indentation
- Explain what you're creating before showing the files
- Make sure code is syntactically correct`,
});

export const POST = async (req) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: copilotKit,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
```

Here’s a detailed explanation of each part:

This code defines a CopilotKit Runtime integration with Next.js, designed to process requests for generating and managing code files in a web-based IDE environment. It connects to the `Groq` cloud service for additional functionalities and processes file-based outputs from AI-generated responses.

This code sets up a `CopilotRuntime` integration with Groq's AI model to generate and process code files in response to user requests. Here's a breakdown:

::: info Key Components

**1. Groq Initialization**:

- The `Groq` SDK is initialized using the `NEXT_PUBLIC_GROQ_CLOUD_API_KEY` environment variable.
- The model used is `llama-3.3-70b-versatile`.

**2. CopilotRuntime**:

- A `CopilotRuntime` instance is created with a custom `onResponse` handler.
- The `onResponse` function processes the AI's response:
  - Extracts file blocks (separated by `---`) from the message.
  - Formats the response to trigger a `processFiles` action if file blocks are detected.

**3. GroqAdapter**:

- A `GroqAdapter` is configured to interact with the Groq API.
- It includes a system prompt that instructs the AI to generate code files in a specific format:
  - Files are marked with `FILE:` and `CODE:`.
  - Multiple files are separated by `---`.
  - The AI is instructed to generate complete, syntactically correct code with proper explanations.

**4. API Endpoint**:

- A `POST` the endpoint is exposed using Next.js App Router.
- It uses `copilotRuntimeNextJSAppRouterEndpoint` to handle incoming requests, passing them to the `CopilotRuntime` and `GroqAdapter`.

:::

::: tip Example Usage

**1. Request**

- A POST request to `/api/copilotkit` might look like this:

```sh
curl -X POST http://localhost:3000/api/copilotkit \
-H "Content-Type: application/json" \
-d '{"command": "Create a React component for a button"}'
```

**2. AI Response (Processed by `onResponse`)**

- AI might return this response:

```plaintext
FILE: Button.jsx
CODE:
import React from 'react';

const Button = () => {
return <button>Click me</button>;
};

export default Button;
```

**3. Response to Client**

- The API wraps the response into the formatted structure:

```json
{
    "content": "@processFiles(response: `FILE: Button.jsx\nCODE:\nimport React from 'react';\n\nconst Button = () => {\n  return <button>Click me</button>;\n};\n\nexport default Button;`)"
}
```

:::

::: important Key Features

**1. AI-Powered Code Generation with copilotkit popup**:

- The system generates complete project files based on user instructions.
- Ensures proper formatting (for example, `FILE:` and `CODE:` markers).

**2. File Handling**:

- Splits multi-file responses into manageable blocks using `---`.
- Supports actions like `@processFiles` for integration with the IDE.

**3. Scalable API**:

- Modular design with `CopilotRuntime` and `GroqAdapter` allows easy extension and ustomization.

**4. Error Handling**:

- Logs errors without interrupting the workflow.
- Defaults to returning the unprocessed message on failure.

:::

---

## Making Routes for CRUD Operation

So far, we've covered how to integrate CopilotKit into the backend. Now, we need to handle file operations, so we'll create another route to manage files with the database.

To develop the backend for file handling, I'll create a new folder inside the API folder and name it `files`. Inside the `files` folder, I’ll create a simple <FontIcon icon="fa-brands fa-react"/>`route.tsx` file. Here’s the code I’ll be using inside the file:

```tsx :collapsed-lines title="app/api/files/route.tsx"
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, File } from "@/app/lib/mongodb";

// Type for the request body
interface FileRequestBody {
  id?: string;
  name?: string;
  content?: string;
}
interface FileCreateRequest {
  name: string;
  content: string;
}

interface FileUpdateRequest {
  id: string;
  name?: string;
  content?: string;
}

// Fetch all files (GET /api/files)
export async function GET(): Promise<Response> {
  try {
    await connectDB(); // Ensure DB connection
    const files = await File.find({});
    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

// Create a new file (POST /api/files)
export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB(); // Ensure DB connection is successful
    // Parse the request body
    const { name, content }: FileRequestBody = await req.json();
    if (!name || !content) {
      throw new Error("Missing required fields: name or content");
    }

    // Log the incoming data for debugging
    console.log("Creating file with data:", { name, content });

    // Create a new file in the database
    const newFile = new File({ name, content });
    await newFile.save();

    // Return the newly created file
    return NextResponse.json(newFile, { status: 201 });
  } catch (error: any) {
    // Log the error for debugging
    console.error("Error creating file:", error);

    return NextResponse.json(
      { error: "Failed to create file", message: error.message },
      { status: 400 }
    );
  }
}

// Update file content (PUT /api/files)
export async function PUT(req: Request): Promise<Response> {
  try {
    await connectDB(); // Ensure DB connection
    const { id, name, content }: FileRequestBody = await req.json();

    // Validate ID format
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
    }

    // Update file name or content if provided
    const updatedFile = await File.findByIdAndUpdate(
      id,
      { ...(name && { name }), ...(content && { content }) },
      { new: true }
    );

    if (!updatedFile) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFile, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 400 }
    );
  }
}

// Delete a file (DELETE /api/files)
export async function DELETE(req: Request): Promise<Response> {
  try {
    await connectDB(); // Ensure DB connection
    const { id }: FileRequestBody = await req.json();

    // Validate ID format
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
    }

    await File.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 400 }
    );
  }
}
```

**Code explanation**

This code defines API routes for handling CRUD operations (Create, Read, Update, Delete) on a MongoDB collection called `File` in a Next.js application. Each route is connected to MongoDB using Mongoose and we used `NextResponse` to format the responses.

:::

---

## Code Breakdown

### 1. Imports

```jsx
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/app/lib/mongodb"; //we made this file
import File from "@/app/lib/models/File"; //we made this file
```

- `NextResponse`: Used for creating HTTP responses in Next.js API routes.
- `connectDB`: Connects to the MongoDB database.
- `File`: A Mongoose model representing the `File` collection.

### 2. Fetch All Files (GET)

```jsx
export async function GET() {
  await connectDB(); // Ensure DB connection
  try {
    const files = await File.find({}); // Fetch all files
    return NextResponse.json(files, { status: 200 }); // Return files in JSON format
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
```

- **Purpose**: Retrieves all documents in the `File` collection.
- **Flow**:
    1. Connects to MongoDB.
    2. Uses `File.find({})` to fetch all files.
    3. Returns the files with a `200` status or an error with a `500` status.

### 3. Create a New File (POST)

```jsx :collapsed-lines
export async function POST(req) {
  await connectDB(); // Ensure DB connection

  try {
    const { name, content } = await req.json(); // Parse the request body
    if (!name || !content) {
      throw new Error("Missing required fields: name or content");
    }

    const newFile = new File({ name, content }); // Create new file
    await newFile.save(); // Save to MongoDB

    return NextResponse.json(newFile, { status: 201 }); // Return the new file
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create file", message: error.message },
      { status: 400 }
    );
  }
}
```

- **Purpose**: Creates a new document in the `File` collection.
- **Flow**:
    1. Parses the `name` and `content` fields from the request body.
    2. Validates the required fields.
    3. Creates and save the file in MongoDB.
    4. Returns the new file with a `201` status or an error with a `400` status.

### 4. Update a File (PUT)

```jsx :collapsed-lines
export async function PUT(req) {
  await connectDB(); // Ensure DB connection
  try {
    const { id, name, content } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
    }

    const updatedFile = await File.findByIdAndUpdate(
      id,
      { ...(name && { name }), ...(content && { content }) },
      { new: true }
    );

    if (!updatedFile) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 400 }
    );
  }
}
```

- **Purpose**: Updates an existing document in the `File` collection.
- **Flow**:
    1. Parses the `id`, `name`, and `content` from the request body.
    2. Validates the `id` using Mongoose's `ObjectId`.
    3. Updates the document using `File.findByIdAndUpdate()` (updates only provided fields).
    4. Returns the updated document with a `200` status, or an error with `400` or `404`.

### 5. Delete a File (DELETE)

```jsx
export async function DELETE(req) {
  await connectDB(); // Ensure DB connection
  try {
    const { id } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
    }

    await File.findByIdAndDelete(id); // Delete the document
    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 400 }
    );
  }
}
```

- **Purpose**: Deletes a document from the `File` collection.
- **Flow**:
    1. Parses the `id` from the request body.
    2. Validates the `id` format.
    3. Uses `File.findByIdAndDelete()` to remove the document.
    4. Returns a success message with a `200` status or an error with `400`.

---

::: tip Example API Requests: How to test API in local

**1. GET All Files**

```sh
curl -X GET http://localhost:3000/api/files
```
**2. Create a File (POST)**

```sh
curl -X POST http://localhost:3000/api/files \
-H "Content-Type: application/json" \
-d '{"name": "example.txt", "content": "This is a test file"}'
```

**3. Update a File (PUT)**

```sh
curl -X PUT http://localhost:3000/api/files \
-H "Content-Type: application/json" \
-d '{"id": "64ffab67c728f51234567890", "name": "updated.txt", "content": "Updated content"}'
```

**4. Delete a File (DELETE)**

```sh
curl -X DELETE http://localhost:3000/api/files \
-H "Content-Type: application/json" \
-d '{"id": "64ffab67c728f51234567890"}'
```

:::

---

## Creating MongoDB Schemas

Now, create a <FontIcon icon="fas fa-folder-open"/>`lib` folder inside the <FontIcon icon="fas fa-folder-open"/>`app` folder. This <FontIcon icon="fas fa-folder-open"/>`lib` folder will handle essential database tasks, such as database schema and connectivity. Inside the <FontIcon icon="fas fa-folder-open"/>`lib` folder, create another folder named <FontIcon icon="fas fa-folder-open"/>`models`. Within this <FontIcon icon="fas fa-folder-open"/>`models` folder, create a new file called <FontIcon icon="fa-brands fa-js"/>`File.js` and paste the following code into it.

This version simplifies the instructions and improves clarity while maintaining the original meaning.

```ts :collapsed-lines title="app/lib/models/File.js"
import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the file document
interface IFile extends Document {
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the file model
const fileSchema = new Schema<IFile>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true }, // MongoDB default _id
    name: { type: String, required: true }, // Removed unique constraint
    content: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Export the File model with type safety
const File: Model<IFile> =
  mongoose.models.File || mongoose.model<IFile>("File", fileSchema);

export default File;
```

---

## Code Explanation

This code defines a Mongoose schema and model for a `File` collection in a MongoDB database. It specifies the structure and rules for documents in the collection.

This code defines a Mongoose schema and model for a File document in MongoDB. Here's a brief explanation:

::: important Key Components

**1. Interface (`IFile`):**

- Defines the structure of a `File` document with:
  - `name` (string, required).
  - `content` (string, required).
  - `createdAt` and `updatedAt` (automatically managed by Mongoose).

**2. Schema (`fileSchema`):**

- Maps the `IFile` interface to a MongoDB schema.
- Includes:
  - `_id`: Auto-generated MongoDB ObjectId.
  - `name` and `content`: Required fields.
  - `timestamps: true`: Automatically adds `createdAt` and `updatedAt` fields.

**3. Model (`File`):**

- Creates or retrieves the Mongoose model for the `File` collection.
- Ensures type safety using the `IFile` interface.

:::

---

## Connecting to database

Half of the work is done! Now, it’s time to connect our app to the database. To do this, I’ll create a new file inside the <FontIcon icon="fas fa-folder-open"/>`lib` folder, where we previously created the database schema. I’ll name the file <FontIcon icon="fa-brands fa-react"/>`mongodb.tsx` and paste the following code inside it:

```ts :collapsed-lines title="app/lib/mongodb.tsx"
import mongoose, { Schema, Model, Connection } from "mongoose";
import { IFile } from "../types";

// Define mongoose connection URI
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached: {
  conn: Connection | null;
  promise: Promise<Connection> | null;
} = { conn: null, promise: null };

export async function connectDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Define the schema for the file model
const fileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Export the File model with type safety
export const File = (mongoose.models.File ||
mongoose.model<IFile>("File", fileSchema)) as Model<IFile>;
```

**Code Explanation**

This code sets up a MongoDB connection using the `mongoose` library in a Node.js or Next.js application. It ensures that the database is connected efficiently and prevents redundant connections.

:::

This code sets up a MongoDB connection and defines a Mongoose schema and model for a `File` document. Here's a brief explanation:

::: importnat Key Components

**1. MongoDB Connection**:

- Uses the `MONGODB_URI` environment variable to connect to MongoDB.
- Implements a caching mechanism to reuse the connection and avoid multiple connections.
- Throws an error if `MONGODB_URI` is not defined.

**2. Schema (`fileSchema`)**:

- Defines the structure of a `File` document with:
  - `name` (string, required).
  - `content` (string, required).
- Automatically adds `createdAt` and `updatedAt` timestamps.

**3. Model (`File`)**:

- Creates or retrieves the Mongoose model for the `File` collection.
- Ensures type safety using the `IFile` interface.

:::

```plaintext title="Example Directory Structure"
/project
  /pages
    /api
      test.js
  /utils
    connectDB.js
  .env.local
```

---

## Final Notes:

- This code avoids multiple MongoDB connections by checking the `readyState`.
- It's reusable and modular, making it easy to maintain.
- Always secure the `MONGODB_URI` in-environment variables to avoid exposing sensitive credentials.

---

## Ensuring type safety

Since we are using TypeScript, we will have to declare the file type `files` , `socket` and an `index`. To do so, create a new folder in root directory of the project and name it `types` and make three files <FontIcon icon="iconfont icon-typescript"/>`socket.ts` ,<FontIcon icon="iconfont icon-typescript"/>`files.ts` and <FontIcon icon="iconfont icon-typescript"/>`index.ts` inside the folder. Inside each file, paste the given code for their respective file.

```ts title="index.ts"
export interface IFile {
  _id: string;
  name: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

```ts title="socket.ts"
import { FileData } from '../types/file';

export interface ServerToClientEvents {
  "new-file": (file: FileData) => void;
  "delete-file": (fileId: string) => void;
  "file-update": (data: { fileId: string; content: string }) => void;
}

export interface ClientToServerEvents {
  "new-file": (file: FileData) => void;
  "delete-file": (fileId: string) => void;
  "file-update": (data: { fileId: string; content: string }) => void;
}
```

```ts title="file.ts"
export interface FileData {
  _id: string;
  name: string;
  content: string;
}
```
