---
lang: en-US
title: "How to Build an AI-Powered RAG Search Application with Next.js, Supabase, and OpenAI"
description: "Article(s) > How to Build an AI-Powered RAG Search Application with Next.js, Supabase, and OpenAI"
icon: iconfont icon-supabase
category:
  - Node.js
  - Supabase
  - Next.js
  - Data Science
  - PostgreSQL
  - DevOps
  - Vercel
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - supabase
  - next
  - nextjs
  - next-js
  - devops
  - vercel
  - data-sceince
  - sql
  - postgres
  - postgresql
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI-Powered RAG Search Application with Next.js, Supabase, and OpenAI"
    - property: og:description
      content: "How to Build an AI-Powered RAG Search Application with Next.js, Supabase, and OpenAI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-powered-rag-search-application-with-nextjs-supabase-and-openai/
prev: /programming/js-supabase/articles/README.md
date: 2026-01-28
isOriginal: false
author:
  - name: Mayur Vekariya
    url: https://freecodecamp.org/news/author/mayur9210/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769534479648/a3f19714-a00b-4444-9289-753902282ac6.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  "title": "Vercel > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/vercel/articles/README.md",
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
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI-Powered RAG Search Application with Next.js, Supabase, and OpenAI"
  desc="In this tutorial, you'll learn how to build a complete RAG (Retrieval-Augmented Generation) search application from scratch. Your application will allow users to upload documents, store them securely, and search through them using AI-powered semantic..."
  url="https://freecodecamp.org/news/how-to-build-an-ai-powered-rag-search-application-with-nextjs-supabase-and-openai"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769534479648/a3f19714-a00b-4444-9289-753902282ac6.png"/>

In this tutorial, you'll learn how to build a complete RAG (Retrieval-Augmented Generation) search application from scratch. Your application will allow users to upload documents, store them securely, and search through them using AI-powered semantic search.

By the end of this guide, you'll have a fully functional application that can:

- Upload and process PDF, DOCX, and TXT files
- Store documents in Supabase Storage
- Generate embeddings using OpenAI
- Perform semantic search across document chunks
- Provide AI-generated answers based on document content
- View and manage uploaded documents

This is a production-ready solution that you can deploy and use immediately.

---

## What You'll Learn

In this handbook, you'll learn how to:

- Set up a Next.js application with TypeScript
- Configure Supabase for database and file storage
- Integrate OpenAI embeddings and chat completions
- Implement document text extraction and chunking
- Build a vector search system using PostgreSQL
- Create a modern UI with React components
- Handle file uploads and storage
- Implement RAG (Retrieval-Augmented Generation) search

::: note Prerequisites

Before you begin, make sure you have:

- Node.js 18 or higher installed on your computer
- A Supabase account (free tier works fine)
- An OpenAI API key
- Basic knowledge of React and TypeScript
- Familiarity with Next.js (helpful but not required)

:::

---

## Understanding the Technologies

Before we dive into building the application, you should understand the key technologies and concepts you'll be working with:

### What is RAG (Retrieval-Augmented Generation)?

RAG is an AI pattern that combines information retrieval with text generation. Instead of relying solely on an AI model's training data, RAG retrieves relevant information from your own documents. It then uses that information as context to generate accurate, up-to-date answers. This approach gives you:

- **Accuracy**: Answers are based on your actual documents, not just the AI's training data
- **Transparency**: You can see which document sections were used to generate the answer
- **Efficiency**: Only relevant document chunks are used, reducing token costs

### What are Embeddings and Vector Database?

Embeddings are numerical representations of text that capture semantic meaning. When you convert text to an embedding, similar meanings are represented by similar numbers. For example, "dog" and "puppy" would have similar embeddings. Meanwhile, "dog" and "airplane" would have very different ones.

OpenAI's embedding models convert text into vectors. These are arrays of numbers that can be compared mathematically. This allows you to find documents that are semantically similar to a search query. You can find matches even if they don't contain the exact same words.

A vector database is a specialized database designed to store and search through embeddings efficiently. Instead of searching for exact text matches, vector databases use mathematical operations. They use operations like [**cosine similarity**](/freecodecamp.org/how-does-cosine-similarity-work.md) to find the most semantically similar content.

In this tutorial, you'll use Supabase's PostgreSQL database with the `pgvector` extension. This extension adds vector storage and similarity search capabilities to PostgreSQL. This lets you store embeddings alongside your regular database data. You can also perform fast similarity searches.

### What is Text Chunking?

Text chunking is the process of breaking large documents into smaller, manageable pieces. This is necessary for several reasons.

First, AI models have token limits. These are maximum input sizes. Second, smaller chunks allow for more precise retrieval. Third, overlapping chunks ensure context isn't lost at boundaries.

You'll use LangChain's `RecursiveCharacterTextSplitter`. This tool intelligently splits text while trying to preserve sentence and paragraph boundaries.

### What is Supabase?

Supabase is an open-source Firebase alternative. It provides several key features.

You get a PostgreSQL database, which is a powerful, open-source relational database. You also get storage, which is file storage similar to AWS S3. There are real-time features that provide real-time subscriptions to database changes. Finally, there's built-in user authentication.

For this project, you'll use Supabase's database to store document chunks and embeddings. You'll also use Supabase Storage to store the original uploaded files.

### What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework that lets you style your application by applying pre-built utility classes directly in your HTML/JSX. Instead of writing custom CSS, you use classes like `bg-blue-600`, `text-white`, and `rounded-lg` to style elements.

You'll use Tailwind CSS in this project because it speeds up development by providing ready-made styling utilities. It also ensures consistent design across the application. Plus, it makes it easy to create responsive, modern UIs. Finally, it works seamlessly with Next.js.

Now that you understand the core concepts and tools we’ll be using, let's start building the application.

---

## Project Overview

Your RAG search application will consist of:

1. **Frontend**: Next.js application with React components for uploading documents and searching
2. **Backend API Routes**: Next.js API routes for handling uploads, searches, and document management
3. **Database**: Supabase PostgreSQL with vector extension for storing embeddings
4. **Storage**: Supabase Storage for storing original files
5. **AI Integration**: OpenAI for generating embeddings and chat completions

The application will have two main pages:

- **Search Page**: Where users can ask questions about their uploaded documents and get AI-generated answers
- **Documents Page**: Where users can view all uploaded documents, upload new ones, preview files, and manage their document library

Let's start building!

::: info

If you ever get stuck on the source code, you can view it on GitHub here:

<SiteInfo
  name="mayur9210/rag-search-app"
  desc="Contribute to mayur9210/rag-search-app development by creating an account on GitHub."
  url="https://github.com/mayur9210/rag-search-app/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/632b00ebd9626ea0e674b1ff36116c4175d4369eb33c076a3e5d95570d99e769/mayur9210/rag-search-app"/>

:::

---

## Table of Contents

- [Step 1: Create Your Next.js Project](#heading-step-1-create-your-nextjs-project)
- [Step 2: Install Required Dependencies](#heading-step-2-install-required-dependencies)
- [Step 3: Set Up Your Supabase Project](#heading-step-3-set-up-your-supabase-project)
- [Step 4: Configure Environment Variables](#heading-step-4-configure-environment-variables)
- [Step 5: Create the Upload API Route](#heading-step-5-create-the-upload-api-route)
- [Step 6: Create the RAG Search API Route](#heading-step-6-create-the-rag-search-api-route)
- [Step 7: Create the Documents API Route](#heading-step-7-create-the-documents-api-route)
- [Step 8: Create the Upload Modal Component](#heading-step-8-create-the-upload-modal-component)
- [Step 9: Create the PDF Viewer Modal Component](#heading-step-9-create-the-pdf-viewer-modal-component)
- [Step 10: Create the Navigation Component](#heading-step-10-create-the-navigation-component)
- [Step 11: Create the Home Page (Search Interface)](#heading-step-11-create-the-home-page-search-interface)
- [Step 12: Create the Documents Page](#heading-step-12-create-the-documents-page)
- [Step 13: Test Your Application](#heading-step-13-test-your-application)
- [Step 14: Deploy Your Application](#heading-step-14-deploy-your-application)
- [How RAG Search Works](#heading-how-rag-search-works)
- [Troubleshooting Common Issues](#heading-troubleshooting-common-issues)

---

## Step 1: Create Your Next.js Project

Start by creating a new Next.js project with TypeScript. Open your terminal and run:

```sh
npx create-next-app@latest rag-search-app --typescript --tailwind --app
```

When prompted, choose the following options:

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- App Router: Yes (default)
- Customize import alias: No

Navigate into your project directory:

```sh
cd rag-search-app
```

Now that your project is set up, you'll need to install the additional packages required for document processing, AI integration, and database operations.

---

## Step 2: Install Required Dependencies

You'll need several packages for this project. You can install them using npm:

```sh
npm i @supabase/supabase-js @langchain/openai @langchain/textsplitters langchain openai mammoth pdf2json
```

Here's what each package does:

- `@supabase/supabase-js`: Client library for interacting with Supabase (database and storage)
- `@langchain/openai`: LangChain integration for OpenAI (helps with text processing)
- `@langchain/textsplitters`: Text splitting utilities for chunking documents into smaller pieces
- `langchain`: Core LangChain library (provides AI workflow tools)
- `openai`: Official OpenAI SDK (for generating embeddings and chat completions)
- `mammoth`: Converts DOCX files to plain text
- `pdf2json`: Extracts text from PDF files

Install the TypeScript types for pdf2json:

```sh
npm i --save-dev @types/pdf-parse
```

With all dependencies installed, you're ready to set up your Supabase project, which will handle your database and file storage needs.

---

## Step 3: Set Up Your Supabase Project

### Create a Supabase Project

First, you’ll need to create a new Supabase project, which you can do by following these steps:

1. Go to [<VPIcon icon="iconfont icon-supabase"/>supabase.com](https://supabase.com/) and sign in or create an account
2. Click "New Project"
3. Fill in your project details:
    - Name: `rag-search-app` (or any name you prefer)
    - Database Password: Choose a strong password (save this – you'll need it)
    - Region: Select the region closest to you
4. Click "Create new project" and wait for it to be ready (this takes a few minutes)

### Get Your Supabase Credentials

Once your project is ready, go to **Settings** and then **API**.

Copy the following values:

- **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
- **anon public key** (this is your `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`)
- **service_role key** (this is your `SUPABASE_SERVICE_ROLE_KEY`)

::: important

Keep your service role key secret. Never expose it in client-side code. It bypasses Row-Level Security (RLS) policies, which is necessary for server-side file uploads but should never be used in browser code.

:::;

### Set Up the Database Schema

Now you'll set up the database structure to store your documents and embeddings. Go to **SQL Editor** in your Supabase dashboard and run the following SQL:

```sql :collapsed-lines
-- Enable the vector extension for embeddings
-- This extension allows PostgreSQL to store and search vector data efficiently
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the documents table
-- This table stores document chunks, their metadata, and embeddings
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding vector(1536)  -- OpenAI's text-embedding-3-small produces 1536-dimensional vectors
  file_path text null,
  file_url text null,
);

-- Create an index on the embedding column for faster similarity search
-- The ivfflat index speeds up vector similarity queries
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);

-- Create a function for matching documents based on similarity
-- This function finds the most similar document chunks to a query embedding
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

This SQL does the following:

- **Enables the vector extension**: This adds vector storage and similarity search capabilities to PostgreSQL
- **Creates the documents table**: Stores document chunks, metadata (file name, type, and so on), and their embeddings
- **Creates an index**: Speeds up similarity searches on the embedding column
- **Creates a match function**: Finds the most similar document chunks to a query embedding using cosine similarity

The `<=>` operator calculates cosine distance between vectors. A smaller distance means more similar content.

### Set Up Supabase Storage

You’ll need a storage bucket to store uploaded files. This is separate from the database and holds the original PDF, DOCX, and TXT files.

To set up your storage bucket:

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it `documents`
4. Set it to **Public** (this allows file downloads)
5. Click **Create bucket**

If you prefer a private bucket, you can use the service role key for server-side operations, which bypasses Row-Level Security policies. For this tutorial, a public bucket is simpler and works well.

Now that your Supabase project is configured, you'll set up your environment variables to connect your Next.js application to Supabase and OpenAI.

---

## Step 4: Configure Environment Variables

Create a <VPIcon icon="iconfont icon-dotenv"/>`.env.local` file in your project root:

```sh title=".env.local"
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

Replace the placeholder values with your actual credentials:

- Get Supabase values from **Settings** → **API** in your Supabase dashboard
- Get your OpenAI API key from [<VPIcon icon="iconfont icon-openai"/>`platform.openai.com/api-keys`](https://platform.openai.com/api-keys)

::: note Security Note

Never commit <VPIcon icon="iconfont icon-dotenv"/>`.env.local` to version control. It's already in <VPIcon icon="iconfont icon-git"/>`.gitignore` by default, but double-check to ensure your secrets stay secure.

:::

With your environment configured, you're ready to start building the API routes that will handle file uploads, searches, and document management.

---

## Step 5: Create the Upload API Route

Now you'll create the API route that handles file uploads. This route will process uploaded files, extract their text, split them into chunks, generate embeddings, and store everything in your database and storage.

Create <VPIcon icon="fas fa-folder-open"/>`src/app/api/upload/`<VPIcon icon="iconfont icon-typescript"/>`route.ts`:

```ts :collapsed-liens  title="app/api/upload/route.ts"
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import mammoth from 'mammoth';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseStorage = createClient(url, serviceKey || anonKey);
const supabase = createClient(url, anonKey);
const openai = new OpenAI();

function safeDecodeURIComponent(str: string): string {
  try { 
    return decodeURIComponent(str); 
  } catch { 
    try { 
      return decodeURIComponent(str.replace(/%/g, '%25')); 
    } catch { 
      return str; 
    } 
  }
}

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    const PDFParser = (await import('pdf2json')).default;
    return new Promise((resolve, reject) => {
      const pdfParser = new (PDFParser as any)(null, true);
      pdfParser.on('pdfParser_dataError', (err: any) => 
        reject(new Error(`PDF parsing error: ${err.parserError}`))
      );
      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        try {
          let fullText = '';
          pdfData.Pages?.forEach((page: any) => 
            page.Texts?.forEach((text: any) => 
              text.R?.forEach((r: any) => 
                r.T && (fullText += safeDecodeURIComponent(r.T) + ' ')
              )
            )
          );
          resolve(fullText.trim());
        } catch (error: any) {
          reject(new Error(`Error extracting text: ${error.message}`));
        }
      });
      pdfParser.parseBuffer(buffer);
    });
  } else if (fileName.endsWith('.docx')) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else if (fileName.endsWith('.txt')) {
    return buffer.toString('utf-8');
  } else {
    throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.');
  }
}

export async function POST(req: Request) {
  try {
    const file = (await req.formData()).get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const documentId = crypto.randomUUID();
    const uploadDate = new Date().toISOString();
    const filePath = `${documentId}.${file.name.split('.').pop() || 'bin'}`;

    // Upload file to Supabase Storage
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const { error: storageError } = await supabaseStorage.storage
      .from('documents')
      .upload(filePath, fileBuffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (storageError) {
      const msg = storageError.message || 'Unknown storage error';
      if (msg.includes('row-level security') || msg.includes('RLS')) {
        return NextResponse.json({ 
          success: false, 
          error: `Storage RLS error: ${msg}. Ensure SUPABASE_SERVICE_ROLE_KEY is set.` 
        }, { status: 500 });
      }
      return NextResponse.json({ 
        success: false, 
        error: `Failed to store file: ${msg}` 
      }, { status: 500 });
    }

    // Get public URL for the file
    const { data: urlData } = supabaseStorage.storage
      .from('documents')
      .getPublicUrl(filePath);

    // Extract text from file
    const text = await extractTextFromFile(file);
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Could not extract text from file' 
      }, { status: 400 });
    }

    // Split text into chunks
    // Chunk size of 800 characters with 100-character overlap ensures
    // we don't lose context at chunk boundaries
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 800,
      chunkOverlap: 100,
    });
    const chunks = await textSplitter.splitText(text);

    // Process each chunk: generate embedding and store in database
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      // Generate embedding using OpenAI
      // This converts the text chunk into a 1536-dimensional vector
      const emb = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: chunk,
      });

      // Store chunk with embedding in database
      const { error } = await supabase.from('documents').insert({
        content: chunk,
        metadata: { 
          source: file.name,
          document_id: documentId,
          file_name: file.name,
          file_type: file.type || file.name.split('.').pop(),
          file_size: file.size,
          upload_date: uploadDate,
          chunk_index: i,
          total_chunks: chunks.length,
          file_path: filePath,
          file_url: urlData.publicUrl,
        },
        embedding: JSON.stringify(emb.data[0].embedding),
      });

      if (error) {
        return NextResponse.json({ 
          success: false, 
          error: error.message 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ 
      success: true, 
      documentId, 
      fileName: file.name, 
      chunks: chunks.length, 
      textLength: text.length, 
      fileUrl: urlData.publicUrl 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to process file' 
    }, { status: 500 });
  }
}
```

::: info This route handles the complete upload workflow:

1. Receives the file from the client via FormData
2. Generates a unique document ID using `crypto.randomUUID()`
3. Uploads the file to Supabase Storage for safekeeping
4. Extracts text based on file type (PDF, DOCX, or TXT)
5. Splits the text into chunks of 800 characters with 100-character overlap
6. Generates embeddings for each chunk using OpenAI's embedding model
7. Stores each chunk with its embedding and metadata in the database

:::

The overlap between chunks ensures that if a sentence or concept spans a chunk boundary, it won't be lost. Now that you can upload and process documents, let's create the search functionality.

---

## Step 6: Create the RAG Search API Route

This route implements the core RAG functionality: it takes a user's query, finds the most relevant document chunks, and uses them to generate an accurate answer.

Create <VPIcon icon="fas fa-folder-open"/>`src/app/api/search/`<VPIcon icon="iconfont icon-typescript"/>`route.ts`:

```ts :collapsed-lines title="app/api/search/route.ts"
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);
const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    // Generate embedding for the user's query
    // This converts the search query into the same vector space as document chunks
    const emb = await openai.embeddings.create({ 
      model: 'text-embedding-3-small', 
      input: query 
    });

    // Find similar documents using vector similarity search
    // The match_documents function finds the 5 most similar chunks
    const { data: results, error } = await supabase.rpc('match_documents', {
      query_embedding: JSON.stringify(emb.data[0].embedding),
      match_threshold: 0.0,  // Accept any similarity (you can increase this for stricter matching)
      match_count: 5,        // Return top 5 most similar chunks
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Combine retrieved chunks into context
    // These chunks will be used as context for the AI to generate an answer
    const context = results?.map((r: any) => r.content).join('\n---\n') || '';

    // Generate answer using OpenAI with retrieved context
    // This is the "Generation" part of RAG
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful assistant. Use the provided context to answer questions. If the answer is not in the context, say you do not know.' 
        },
        { 
          role: 'user', 
          content: `Context: ${context}\n\nQuestion: ${query}` 
        }
      ],
    });

    return NextResponse.json({ 
      answer: completion.choices[0].message.content, 
      sources: results 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

This route implements the RAG pattern. Here's how the complete RAG workflow works:

1. **Converts the query to an embedding**: The user's question is transformed into the same vector space as your document chunks. This uses the same embedding model (`text-embedding-3-small`) that processed the documents, ensuring they're in the same "vector space."
2. **Searches for similar chunks**: Uses the `match_documents` function to find the 5 most semantically similar document chunks. This uses cosine similarity on the embeddings. Cosine similarity measures the angle between vectors - smaller angles mean more similar content, even if the exact words differ.
3. **Uses chunks as context**: The retrieved chunks are passed to GPT-4o-mini as context. These chunks contain the most relevant information from your documents.
4. **Generates an answer**: The AI model generates an answer based on the provided context. The system prompt instructs the AI to only answer based on the provided context, ensuring accuracy and preventing hallucinations.
5. **Returns results**: Both the answer and source chunks are returned so users can verify the information.

This RAG approach gives you several benefits. First, you get accuracy because answers are based on your actual documents, not just the AI's training data. Second, you get transparency because you can see which document chunks were used to generate each answer. Third, you get efficiency because only relevant chunks are used, which reduces token usage and costs. Finally, you get up-to-date information because you can update your knowledge base by uploading new documents without retraining the AI.

Now let's create the API route for managing documents.

---

## Step 7: Create the Documents API Route

This route handles listing, viewing, downloading, and deleting documents. It serves multiple purposes depending on the query parameters.

Create <VPIcon icon="fas fa-folder-open"/>`src/app/api/documents/`<VPIcon icon="iconfont icon-typescript"/>`route.ts`:

```ts :collapsed-lines title="app/api/documents/route.ts"
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || anonKey;
const supabase = createClient(url, anonKey);
const supabaseStorage = createClient(url, serviceKey);

export async function GET(req: Request) {
  try {
    const reqUrl = new URL(req.url);
    const id = reqUrl.searchParams.get('id');
    const file = reqUrl.searchParams.get('file') === 'true';
    const view = reqUrl.searchParams.get('view') === 'true';

    // Handle file download/view
    if (id && file) {
      const { data: documents } = await supabase
        .from('documents')
        .select('metadata')
        .eq('metadata->>document_id', id)
        .limit(1);

      if (!documents || documents.length === 0) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
      }

      const meta = documents[0].metadata;
      const fileName = meta?.file_name || 'document';
      const fileType = meta?.file_type || 'application/octet-stream';
      const filePath = meta?.file_path || `${id}.${fileName.split('.').pop() || 'pdf'}`;

      const { data: fileData, error: downloadError } = await supabaseStorage.storage
        .from('documents')
        .download(filePath);

      if (downloadError || !fileData) {
        return NextResponse.json({ 
          error: downloadError?.message || 'File not stored' 
        }, { status: 404 });
      }

      const buffer = Buffer.from(await fileData.arrayBuffer());
      if (buffer.length === 0) {
        return NextResponse.json({ error: 'File is empty' }, { status: 500 });
      }

      const isPDF = fileType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': fileType,
          'Content-Disposition': (view && isPDF) 
            ? `inline; filename="${fileName}"` 
            : `attachment; filename="${fileName}"`,
          'Content-Length': buffer.length.toString(),
          ...(view && isPDF ? { 'X-Content-Type-Options': 'nosniff' } : {}),
        },
      });
    }

    // Get single document with text content
    if (id) {
      const { data: chunks, error } = await supabase
        .from('documents')
        .select('content, metadata')
        .eq('metadata->>document_id', id)
        .order('metadata->>chunk_index', { ascending: true });

      if (error || !chunks || chunks.length === 0) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
      }

      const m = chunks[0].metadata || {};
      return NextResponse.json({
        id,
        file_name: m.file_name || 'Unknown',
        file_type: m.file_type || 'unknown',
        file_size: m.file_size || 0,
        upload_date: m.upload_date || new Date().toISOString(),
        total_chunks: chunks.length,
        fullText: chunks.map((c: any) => c.content).join('\n\n'),
        file_url: m.file_url,
        file_path: m.file_path
      });
    }

    // List all documents
    const { data: documents, error } = await supabase
      .from('documents')
      .select('metadata');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Deduplicate documents by document_id
    // Since each document is split into multiple chunks, we need to group them
    const map = new Map();
    documents?.forEach((doc: any) => {
      const m = doc.metadata;
      if (m?.document_id && !map.has(m.document_id)) {
        map.set(m.document_id, {
          id: m.document_id,
          file_name: m.file_name || 'Unknown',
          file_type: m.file_type || 'unknown',
          file_size: m.file_size || 0,
          upload_date: m.upload_date || new Date().toISOString(),
          total_chunks: m.total_chunks || 0,
          file_url: m.file_url,
          file_path: m.file_path,
        });
      }
    });

    return NextResponse.json({ documents: Array.from(map.values()) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 });
    }

    // Get file path from metadata
    const { data: docs } = await supabase
      .from('documents')
      .select('metadata')
      .eq('metadata->>document_id', id)
      .limit(1);

    const filePath = docs?.[0]?.metadata?.file_path;

    // Delete file from storage
    if (filePath) {
      await supabaseStorage.storage.from('documents').remove([filePath]);
    }

    // Delete all chunks from database
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('metadata->>document_id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, fileDeleted: !!filePath });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

::: info This route handles:

- **GET without ID**: Lists all documents (deduplicated since each document has multiple chunks)
- **GET with ID**: Returns document details and full text (all chunks combined)
- **GET with ID and file=true**: Downloads the original file from storage
- **DELETE with ID**: Deletes the document and its file from both storage and database

:::

Now that your API routes are complete, let's build the user interface components, starting with the upload modal.

---

## Step 8: Create the Upload Modal Component

The upload modal provides a user-friendly interface for selecting and uploading documents. It handles file selection, upload progress, and displays success or error messages.

Create <VPIcon icon="fas fa-folder-open"/>`src/app/components/`<VPIcon icon="fa-brands fa-react"/>`UploadModal.tsx`:

```tsx :collapsed-lines title="src/app/components/UploadModal.tsx"
'use client';
import { useState, useEffect } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    if (!isOpen) { 
      setFile(null); 
      setMessage(null); 
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage({
          type: 'success',
          text: `File "${data.fileName}" uploaded successfully! Processed ${data.chunks} chunks.`,
        });
        setFile(null);
        (document.getElementById('upload-file-input') as HTMLInputElement)?.setAttribute('value', '');
        setTimeout(() => { 
          onUploadSuccess?.(); 
          onClose(); 
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Upload failed' });
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Upload Document
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="upload-file-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select a file (PDF, DOCX, or TXT)
            </label>
            <input
              id="upload-file-input"
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                dark:file:bg-blue-900 dark:file:text-blue-300
                dark:hover:file:bg-blue-800"
            />
          </div>

          {file && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><span className="font-medium">Selected:</span> {file.name}</p>
              <p><span className="font-medium">Size:</span> {(file.size / 1024).toFixed(2)} KB</p>
              <p><span className="font-medium">Type:</span> {file.type || file.name.split('.').pop()}</p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {uploading ? 'Uploading and Processing...' : 'Upload Document'}
          </button>

          {message && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
            <p className="font-medium text-blue-900 dark:text-blue-200 mb-2">Supported: PDF, DOCX, TXT</p>
            <p className="text-blue-700 dark:text-blue-400">Files will be processed and embedded for RAG search.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

This component provides a clean interface for file uploads with proper error handling and user feedback. Next, let's create the PDF viewer component for previewing documents.

---

## Step 9: Create the PDF Viewer Modal Component

The PDF viewer modal allows users to preview PDFs and view extracted text from any document. It's particularly useful for verifying that documents were processed correctly.

Create <VPIcon icon="fas fa-folder-open"/>`src/app/components/`<VPIcon icon="fa-brands fa-react"/>`PDFViewerModal.tsx`:

```tsx title="app/components/PDFViewerModal.tsx"
'use client';
import { useEffect, useState } from 'react';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  documentId?: string;
  isPDF?: boolean;
}

export default function PDFViewerModal({ 
  isOpen, 
  onClose, 
  fileUrl, 
  fileName, 
  documentId, 
  isPDF = true 
}: PDFViewerModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'preview' | 'content'>('preview');
  const [text, setText] = useState<string>('');
  const [textLoading, setTextLoading] = useState(false);
  const [textError, setTextError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    if (isOpen) { 
      setError(null); 
      setLoading(true); 
      setActiveTab(isPDF ? 'preview' : 'content'); 
      setText(''); 
      setTextError(null); 
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [isOpen, isPDF]);

  useEffect(() => {
    if (isOpen && documentId && activeTab === 'content' && !text && !textLoading && !textError) {
      fetchDocumentText();
    }
  }, [isOpen, documentId, activeTab, text, textLoading, textError]);

  useEffect(() => {
    if (isOpen && fileUrl && isPDF) {
      fetch(fileUrl, { method: 'GET', headers: { 'Accept': 'application/json' } })
        .then(async res => {
          if (res.headers.get('content-type')?.includes('application/json')) {
            const data = await res.json();
            throw new Error(data.error || 'File not available');
          }
          if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message || 'Failed to load PDF');
          setLoading(false);
        });
    } else if (isOpen && !isPDF) {
      setLoading(false);
    }
  }, [isOpen, fileUrl, isPDF]);

  const fetchDocumentText = async () => {
    if (!documentId) return;
    setTextLoading(true); 
    setTextError(null);
    try {
      const res = await fetch(`/api/documents?id=${documentId}`);
      const data = await res.json();
      if (data.error) {
        setTextError(data.error);
      } else {
        setText(data.fullText || 'No text content available');
      }
    } catch (err) {
      setTextError(err instanceof Error ? err.message : 'Failed to fetch document text');
    } finally {
      setTextLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate flex-1 mr-4">
              {fileName}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {isPDF && (
            <div className="flex border-t border-gray-200 dark:border-gray-800">
              {(['preview', 'content'] as const).map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          {isPDF && activeTab === 'preview' && (
            <div className="h-full overflow-hidden">
              {error ? (
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-md">
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      PDF File Not Available
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300 mb-4">{error}</p>
                    {documentId && (
                      <button 
                        onClick={() => setActiveTab('content')} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        View Extracted Text Instead
                      </button>
                    )}
                  </div>
                </div>
              ) : loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">Loading PDF...</p>
                </div>
              ) : (
                <iframe
                  src={`${fileUrl}${fileUrl.includes('?') ? '&' : '?'}view=true#toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full h-full border-0"
                  title={fileName}
                  allow="fullscreen"
                  onError={() => setError('Failed to load PDF')}
                />
              )}
            </div>
          )}

          {(!isPDF || activeTab === 'content') && (
            <div className="h-full overflow-auto p-6">
              {textLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">Loading...</p>
                </div>
              ) : textError ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-200">Error: {textError}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Formatting may be inconsistent from source.
                  </p>
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-mono bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    {text || 'No text content available'}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

This component provides a full-screen modal for viewing PDFs and extracted text, with tabs to switch between preview and text content. Now let's create a simple navigation component to tie everything together.

---

## Step 10: Create the Navigation Component

The navigation component provides easy access to the Search and Documents pages. It highlights the current page and provides a clean, consistent navigation experience.

Create <VPIcon icon="fas fa-folder-open"/>`src/app/components/`<VPIcon icon="fa-brands fa-react"/>`Navigation.tsx`:

```tsx title="app/components/Navigation.tsx"
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Search' },
    { href: '/documents', label: 'Documents' },
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                pathname === item.href
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

With navigation in place, let's create the main search page where users can query their documents.

---

## Step 11: Create the Home Page (Search Interface)

The search page is the main interface where users ask questions about their uploaded documents. It displays the AI-generated answers along with source citations, allowing users to verify the information.

Update <VPIcon icon="fas fa-folder-open"/>`src/app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`:

```tsx title="app/page.tsx"
'use client';
import { useState } from 'react';
import Navigation from './components/Navigation';

export default function Home() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true); 
    setAnswer(''); 
    setSources([]);
    try {
      const res = await fetch('/api/search', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ query }) 
      });
      const data = await res.json();
      if (data.error) {
        setAnswer(`Error: ${data.error}`);
      } else { 
        setAnswer(data.answer || 'No answer generated'); 
        setSources(data.sources || []); 
      }
    } catch (error: any) {
      setAnswer(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">RAG Search</h1>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm mb-6">
          <textarea 
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ask a question about your uploaded documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={4}
          />
          <button 
            onClick={handleSearch}
            className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Press Cmd/Ctrl + Enter to search
          </p>
        </div>

        {answer && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-3">Answer:</h2>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
              {answer}
            </p>
          </div>
        )}

        {sources && sources.length > 0 && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Sources ({sources.length}):</h2>
            <div className="space-y-3">
              {sources.map((source, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span className="font-medium">Source:</span>{' '}
                    {source.metadata?.source || source.metadata?.file_name || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-3">
                    {source.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
```

This page provides a clean search interface with a textarea for queries, a search button, and sections to display answers and source citations. The sources section helps users verify where the information came from, which is crucial for trust and accuracy. Now let's create the documents management page.

---

## Step 12: Create the Documents Page

The documents page serves as your document library. It displays all uploaded documents in a table format, shows metadata like file size and chunk count, and provides actions to preview, download, or delete documents. This page is essential for managing your document collection and verifying uploads.

Create <VPIcon icon="fas fa-folder-open"/>`src/app/documents/page.tsx`:

```tsx :collapsed-lines title="app/documents/page.tsx"
'use client';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import PDFViewerModal from '../components/PDFViewerModal';
import UploadModal from '../components/UploadModal';

interface Document {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  upload_date: string;
  total_chunks: number;
  file_url?: string;
  file_path?: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; name: string; id?: string; isPDF?: boolean } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/documents');
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setDocuments(data.documents || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (s: string) => {
    try {
      const d = new Date(s);
      return isNaN(d.getTime()) 
        ? s 
        : d.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
          });
    } catch { 
      return s; 
    }
  };

  const formatFileSize = (b: number) => 
    b < 1024 
      ? `${b} B` 
      : b < 1024 * 1024 
        ? `${(b / 1024).toFixed(2)} KB` 
        : `${(b / (1024 * 1024)).toFixed(2)} MB`;

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This will permanently delete the document, embeddings, and file.`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/documents?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        setDocuments(documents.filter(doc => doc.id !== id));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Documents</h1>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Upload Document
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Loading documents...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">Error: {error}</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No documents uploaded yet.</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Upload your first document
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Chunks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {doc.file_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {doc.file_type || 'unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatFileSize(doc.file_size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {doc.total_chunks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(doc.upload_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3 items-center">
                          {doc.file_name.toLowerCase().endsWith('.pdf') ? (
                            <button 
                              onClick={() => {
                                const pdfUrl = doc.file_url 
                                  ? `${doc.file_url}?view=true` 
                                  : `/api/documents?id=${doc.id}&file=true&view=true`;
                                setSelectedPDF({ url: pdfUrl, name: doc.file_name, id: doc.id });
                                setShowPDFModal(true);
                              }} 
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              Preview
                            </button>
                          ) : (
                            <>
                              <button 
                                onClick={() => {
                                  setSelectedPDF({ 
                                    url: doc.file_url || `/api/documents?id=${doc.id}&file=true`, 
                                    name: doc.file_name, 
                                    id: doc.id, 
                                    isPDF: false 
                                  });
                                  setShowPDFModal(true);
                                }} 
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                View
                              </button>
                              {(doc.file_url || doc.file_path) && (
                                <a 
                                  href={doc.file_url || `/api/documents?id=${doc.id}&file=true`} 
                                  download={doc.file_name}
                                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  Download
                                </a>
                              )}
                            </>
                          )}
                          <button 
                            onClick={() => handleDelete(doc.id, doc.file_name)} 
                            disabled={deletingId === doc.id}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingId === doc.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedPDF && (
          <PDFViewerModal 
            isOpen={showPDFModal} 
            onClose={() => { 
              setShowPDFModal(false); 
              setSelectedPDF(null); 
            }}
            fileUrl={selectedPDF.url} 
            fileName={selectedPDF.name} 
            documentId={selectedPDF.id} 
            isPDF={selectedPDF.isPDF !== false} 
          />
        )}
        <UploadModal 
          isOpen={showUploadModal} 
          onClose={() => setShowUploadModal(false)} 
          onUploadSuccess={fetchDocuments} 
        />
      </main>
    </div>
  );
}
```

This page provides a comprehensive document management interface with a table showing all documents, their metadata, and action buttons for preview, download, and deletion. The page automatically refreshes after uploads and handles loading and error states gracefully.

Now that all your components and pages are built, let's test the complete application.

---

## Step 13: Test Your Application

Start your development server:

```sh
npm run dev
```

Open `http://localhost:3000` in your browser.

### Test the Upload Flow

1. Navigate to the Documents page
2. Click "Upload Document"
3. Select a PDF, DOCX, or TXT file
4. Wait for the upload and processing to complete (this may take a moment as embeddings are generated)
5. You should see your document in the list with its metadata:

![RAG search documents management page showing a table with uploaded documents.](https://cdn.hashnode.com/res/hashnode/image/upload/v1769376932518/cf1bcd3c-3ab2-4602-8df0-bca909c0edb0.png)

### Test the Search Flow

1. Navigate to the Search page (or click "Search" in the navigation)
2. Make sure you've uploaded at least one document first
3. Type a question about your uploaded document (for example, "What is this document about?" or ask about specific content)
4. Click "Search" or press Cmd/Ctrl + Enter
5. You should see an AI-generated answer with source citations showing which document chunks were used

Once the embedding is done, you can navigate to search and look for the sample test command based on the documents you have uploaded. You can also check the source from which the search results were pulled.

![RAG Search application search interface showing a query input to search from the RAG database.](https://cdn.hashnode.com/res/hashnode/image/upload/v1769377080953/c15678d6-59d0-4e97-8a1b-fe049e5fa6a9.png)

### Test Document Management

1. On the Documents page, click "Preview" or "View" on a document
2. Try downloading a document
3. Test deleting a document (be careful - this is permanent)

If everything works correctly, you're ready to deploy your application!

---

## Step 14: Deploy Your Application

### Deploy to Vercel

Vercel is the easiest way to deploy Next.js applications and is made by the creators of Next.js:

To get started, you’ll need to push your code to GitHub. So go ahead and create a repository and push your code.

Then go to [<VPIcon icon="iconfont icon-vercel"/>`vercel.com`](https://vercel.com/) and sign in with your GitHub account. Click "New Project" and import your GitHub repository.

Add your environment variables in the project settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

Then click "Deploy", and your application will be live in minutes! Vercel automatically builds and deploys your Next.js application, and you'll get a URL like `your-app.vercel.app`.

### Important Deployment Notes

- Make sure all environment variables are set in your Vercel project settings
- The service role key is required for file uploads to work
- Supabase Storage bucket should be accessible (public or with proper RLS policies)
- Your OpenAI API key should have sufficient credits

---

## How RAG Search Works

Your application uses the RAG (Retrieval-Augmented Generation) pattern. This combines information retrieval with AI text generation. Here's how it works step by step:

1. **Document processing**: When you upload a document, it's split into chunks. These are typically 800 characters each with 100-character overlap. Each chunk gets an embedding. This is a 1536-dimensional vector that represents its semantic meaning.
2. **Storage**: Embeddings are stored in a vector database. This is PostgreSQL with the pgvector extension. They're stored alongside the original text chunks. The original files are stored in Supabase Storage.
3. **Query processing**: When you search, your query is converted into an embedding. It uses the same model that processed the documents. This ensures the query and documents are in the same "vector space."
4. **Similarity search**: The system finds the most similar document chunks. It uses cosine similarity on the embeddings. Cosine similarity measures the angle between vectors. Smaller angles mean more similar content, even if the exact words differ.
5. **Answer generation**: The retrieved chunks are used as context for an AI model. This model is GPT-4o-mini. It generates an accurate answer. The system prompt instructs the AI to only answer based on the provided context. This ensures accuracy.

This approach gives you several benefits.

First, you get accuracy. Answers are based on your actual documents, not just the AI's training data. Second, you get transparency. You can see which document chunks were used to generate each answer. Third, you get efficiency. Only relevant chunks are used, which reduces token usage and costs. Finally, you get up-to-date information. You can update your knowledge base by uploading new documents without retraining the AI.

---

## Troubleshooting Common Issues

### "Storage RLS error" when uploading

This means your `SUPABASE_SERVICE_ROLE_KEY` is not set or incorrect. Make sure the key is in your <VPIcon icon="iconfont icon-dotenv"/>`.env.local` file for local development. Also make sure you're using the service role key, not the anon key. Finally, make sure the key is correctly set in your deployment environment, such as Vercel.

### "Failed to extract text from file"

Make sure your file is a valid PDF, DOCX, or TXT file. Check that the file isn't corrupted. For PDFs, ensure they contain extractable text. Scanned PDFs with only images won't work without [<VPIcon icon="fa-brands fa-wikipedia-w"/>OCR](https://en.wikipedia.org/wiki/Optical_character_recognition).

### "No answer generated"

Make sure you've uploaded at least one document. Try a different query that's more likely to match your documents. Check that embeddings were successfully created. You can verify this in your Supabase database.

### Vector similarity search not working

Ensure the `vector` extension is enabled in Supabase. You can do this by running `CREATE EXTENSION IF NOT EXISTS vector;`. Verify the `match_documents` function exists in your database. You can check this in the SQL Editor. Check that embeddings are being stored correctly. They should be JSON strings in the embedding column.

### Slow search or upload times

Large documents take longer to process. This is because more chunks mean more embedding API calls. Consider reducing chunk size or processing documents in batches. Also check your OpenAI API rate limits.

---

## Next Steps

Now that you have a working RAG search application, you can extend it with additional features. Here are some examples of useful features you could add:

- You can add more file types by extending the text extraction to support Markdown, HTML, or other formats.
- You can improve chunking by experimenting with different chunk sizes, overlap strategies, or semantic chunking.
- You can add authentication to protect your documents with user authentication using Supabase Auth.
- You can enhance the UI by adding features like search history, document tags, or advanced filters.
- You can optimize performance by adding caching, pagination, or streaming responses.
- You can add filters to allow users to search within specific documents or date ranges.
- Finally, you can improve search by adding hybrid search, which combines keyword and semantic search, or reranking.

---

## Conclusion

You've built a complete RAG search application from scratch. This application demonstrates modern web development with Next.js and TypeScript. It shows vector database operations with Supabase and pgvector. It demonstrates AI integration with OpenAI embeddings and chat completions. It includes file handling and storage with Supabase Storage. Finally, it features a production-ready user interface with Tailwind CSS.

The RAG pattern you've implemented is used by many production applications. These include [**chatbots**](/freecodecamp.org/how-to-build-an-embeddable-ai-chatbot-widget-with-cloudflare-workers.md), knowledge bases, document search systems, and AI assistants. You now have the foundation to build more advanced features on top of this.

The skills you've learned are highly valuable in today's AI-driven development landscape. You've learned to work with embeddings, vector databases, and the RAG pattern. You can apply these concepts to build intelligent search systems, document Q&A applications, or AI-powered knowledge bases.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI-Powered RAG Search Application with Next.js, Supabase, and OpenAI",
  "desc": "In this tutorial, you'll learn how to build a complete RAG (Retrieval-Augmented Generation) search application from scratch. Your application will allow users to upload documents, store them securely, and search through them using AI-powered semantic...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-powered-rag-search-application-with-nextjs-supabase-and-openai/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
