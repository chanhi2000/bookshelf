---
lang: en-US
title: "How to Build a Serverless RAG Pipeline on AWS That Scales to Zero"
description: "Article(s) > How to Build a Serverless RAG Pipeline on AWS That Scales to Zero"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Python
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Serverless RAG Pipeline on AWS That Scales to Zero"
    - property: og:description
      content: "How to Build a Serverless RAG Pipeline on AWS That Scales to Zero"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/serverless-rag-pipeline-on-aws.html
prev: /devops/aws/articles/README.md
date: 2026-02-25
isOriginal: false
author:
  - name: Christopher Galliart
    url: https://freecodecamp.org/news/author/hatmanstack/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/c9a4a8b7-4dea-41a0-b0d2-7c57e2e94578.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Serverless RAG Pipeline on AWS That Scales to Zero"
  desc="Most RAG tutorials end the same way: you've got a working prototype and a bill for a vector database that runs whether anyone's querying it or not. Add an always-on embedding service, a hosted LLM end"
  url="https://freecodecamp.org/news/serverless-rag-pipeline-on-aws"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/c9a4a8b7-4dea-41a0-b0d2-7c57e2e94578.png"/>

Most RAG tutorials end the same way: you've got a working prototype and a bill for a vector database that runs whether anyone's querying it or not. Add an always-on embedding service, a hosted LLM endpoint, and the usual AWS infrastructure, and you're looking at real money before a single user shows up.

But it doesn't have to work that way. In this tutorial, you'll deploy a fully serverless RAG pipeline that processes documents, images, video, and audio, then scales to zero when nobody's using it.

Everything runs in your AWS account, your data never leaves your infrastructure, and your ongoing monthly cost for a modest knowledge base will be closer to \\(2-3 than \\)300. We'll use [RAGStack-Lambda (<VPIcon icon="iconfont icon-github"/>`HatmanStack/RAGStack-Lambda`)](https://github.com/HatmanStack/RAGStack-Lambda), an open-source project I built on AWS. By the end, you'll have a deployed pipeline with a dashboard, an AI chat interface with source citations, a drop-in web component you can embed in any app, and an MCP server you can use to feed your assistant context.

---

## What This Actually Costs

Before we build anything, let's talk money, because the cost story is the whole point.

RAG pipelines have two cost phases: ingestion (processing your documents once) and operation (querying them over time).

Most platforms charge you a flat monthly rate regardless of which phase you're in. A serverless architecture flips that: ingestion costs something, and then everything scales to zero.

### Ingestion: The One-Time Hit

When you upload documents, several things happen: text extraction (OCR for PDFs and images), embedding generation, metadata extraction, and storage. Here's what that actually costs per service:

#### Textract (OCR)

This is the most expensive part of ingestion, and it only applies to scanned PDFs and images that need text extraction. Plain text, HTML, CSV, and other text-based formats skip this entirely.

Textract charges ~\\(1.50 per 1,000 pages for standard text detection. If you're uploading 500 pages of scanned PDFs, that's about \\)0.75. A heavy initial load of several thousand scanned pages might run $5-10. But once your documents are processed, you never pay this again unless you add new ones.

#### Bedrock Embeddings (Nova Multimodal)

This is where your content gets converted into vectors for semantic search. The pricing is almost comically cheap:

- Text: $0.00002 per 1,000 input tokens
- Images: $0.00115 per image
- Video/Audio: $0.00200 per minute

To put that in perspective: if you have 1,500 text documents averaging 2,500 tokens each after chunking, your total embedding cost is about \\(0.08. A knowledge base with 500 images runs \\)0.58. Even a mixed corpus of text, images, and a few hours of video stays well under $2 for the entire embedding pass. This is a one-time cost – you only re-embed if you add or update documents.

#### Bedrock LLM (Metadata Extraction)

RAGStack uses an LLM to analyze each document and extract structured metadata automatically. This is a few inference calls per document using Nova Lite or a similar model. At \\(0.06/\\)0.24 per million input/output tokens, processing 1,500 documents costs well under $1.

#### S3 Vectors (Storage)

 Storing your embeddings. At $0.06 per GB/month, a knowledge base of 1,500 documents with 1,024-dimension vectors takes up a trivially small amount of space. We're talking pennies per month.

#### S3 (Document Storage)

 Your source documents in standard S3. Even cheaper, $0.023 per GB/month.

#### DynamoDB

 Stores document metadata and processing state. The on-demand pricing model means you pay per request during ingestion, then essentially nothing at rest. A few cents for the initial load.

To put real numbers on it: if you upload 200 text documents (PDFs, HTML, markdown), your total ingestion cost is likely **under \\(1**. If you upload 1,000 scanned PDFs that need OCR, you might see **\\)5-8** as a one-time hit. That $7-10 figure you might see referenced? That's the upper end for a heavy initial load with lots of OCR work.

### Operation: Where Scale-to-Zero Shines

Once your documents are ingested, the pipeline is waiting. Not running. Waiting. Here's what each query costs:

#### Lambda

Invocations are billed per request and duration. The free tier covers 1 million requests/month. For a personal or small-team knowledge base, you may never leave the free tier.

#### S3 Vectors (Queries)

$2.50 per million query API calls, plus a per-TB data processing charge. For a small index queried a few hundred times a month, this rounds to effectively zero.

#### Bedrock (Chat Inference)

This is your main operating cost. Each chat response requires an LLM call. Using Nova Lite at \\(0.06 per million input tokens and \\)0.24 per million output tokens, a typical RAG query (retrieval context + user question + response) might cost \\(0.001-0.003 per query. A hundred queries a month is \\)0.10-0.30. **Step Functions**: Orchestrates the document processing pipeline. Standard workflows charge $0.025 per 1,000 state transitions. Minimal during operation since it's only active during ingestion.

#### Cognito

User authentication. Free for the first 10,000 monthly active users.

#### CloudFront

Serves the dashboard UI. Free tier covers 1 TB of data transfer per month.

#### API Gateway

Handles GraphQL API requests. Free tier covers 1 million API calls per month.

Add it all up for a knowledge base with 500 documents getting a few hundred queries per month, and your monthly operating cost is somewhere between **\\(0.50 and \\)3.00**. Most of that is the LLM inference for chat responses.

### The Comparison That Matters

Here's the same pipeline on a traditional always-on stack:

| **Service** | **Traditional Stack** | **RAGStack-Lambda** | 
| ---: | :--- | :--- |
| Vector Database | Pinecone Starter: \(70/mo, OpenSearch Serverless: ~\)350/mo minimum | S3 Vectors: pennies/mo |
| Compute | EC2 or ECS: \(50-150/mo | Lambda: free tier |
| LLM Inference | Same per-query cost | Same per-query cost |
Total (idle) | \)120-500/mo | ~$0.50-3.00/mo |

The LLM inference cost per query is roughly the same everywhere – that's Bedrock's on-demand pricing regardless of your architecture. The difference is everything else. Traditional stacks pay a floor cost whether anyone's using them or not. A serverless stack pays for what it uses, and idle costs essentially nothing.

### What About Transcribe?

If you're uploading video or audio, AWS Transcribe adds cost for speech-to-text conversion. Standard transcription runs about \\(0.024 per minute of audio. A 10-minute video costs \\)0.24 to transcribe. This is a one-time ingestion cost, once transcribed and embedded, the resulting text chunks are queried like any other document.

---

## What You're Building

By the end of this tutorial, you'll have a deployed pipeline that does the following:

1. You upload a document (PDF, image, video, audio, HTML, CSV, [the full list (<VPIcon icon="iconfont icon-github"/>`HatmanStack/RAGStack-Lambda`)](https://github.com/HatmanStack/RAGStack-Lambda/blob/main/docs/ARCHITECTURE.md) is extensive) through a web dashboard.
2. The pipeline detects the file type and routes it to the right processor. Scanned PDFs go through OCR via Textract. Video and audio go through Transcribe for speech-to-text, split into 30-second searchable chunks with speaker identification. Images get visual embeddings and any caption text you provide.
3. An LLM analyzes each document and extracts structured metadata, topic, document type, date range, people mentioned, whatever's relevant. This happens automatically.
4. Everything gets embedded using Amazon Nova Multimodal Embeddings and stored in a Bedrock Knowledge Base backed by S3 Vectors.
5. You (or your users) ask questions through an AI chat interface. The pipeline retrieves relevant documents, passes them as context to a Bedrock LLM, and returns an answer with collapsible source citations, including timestamp links for video and audio that jump to the exact position.

All of this runs in your AWS account. No external control plane, no third-party services beyond AWS itself.

### The Architecture

![Flowchart showing AWS architecture. Document processing uses S3, Lambda OCR, Step Functions, and Amazon Bedrock. Chat API includes AppSync and Lambda.](https://cdn.hashnode.com/res/hashnode/image/upload/v1771479160514/cae3e6e5-bebb-472c-a128-921b1e00b5f6.jpeg)

A few things to note about this architecture:

#### Step Functions orchestrate everything.

When a document is uploaded, a state machine manages the entire processing flow, detecting the file type, routing to the right processor, waiting for async operations like Transcribe jobs, then triggering embedding and metadata extraction.

This is what makes the pipeline reliable without a running server. If a step fails, it retries. You can see exactly where every document is in the processing pipeline.

#### Lambda does the compute.

Every processing step is a Lambda function. They spin up when needed, run for a few seconds to a few minutes, and shut down. There's no EC2 instance idling at 3 AM.

#### S3 Vectors is the vector store.

Your embeddings live in S3's purpose-built vector storage rather than in a dedicated vector database like Pinecone or OpenSearch.

This is what makes the "scale to zero" cost possible: you're paying object storage rates for vector data instead of keeping a database cluster warm. It also means your vectors are sitting in your own S3 bucket, not in a third-party managed service that holds your data on their terms.

#### Cognito handles auth.

The dashboard and API are protected with Cognito user pools. When you deploy, you get a temporary password via email. The web component uses IAM-based authentication, and server-side integrations use API key auth.

#### CloudFront serves the UI.

The dashboard is a static React app served through CloudFront, so there's no web server to maintain.

### Two Ways to Deploy

You have two deployment paths depending on what you want:

1. **AWS Marketplace (the fast path)**, click deploy, fill in two fields (stack name and email), and wait about 10 minutes. No local tooling required. This is the path we'll walk through first.
2. **From Source (the developer path)**, Clone the repo, run <VPIcon icon="fa-brands fa-python"/>`publish.py`, and deploy via SAM CLI. This is the path for when you want to customize the processing pipeline, modify the UI, or contribute to the project. We'll cover this after the Marketplace walkthrough.

Both paths produce the same stack. The Marketplace version just wraps the CloudFormation template in a one-click deployment.

::: note Prerequisites

Before you deploy, you'll need:

- **An AWS account** with permissions to create CloudFormation stacks, Lambda functions, S3 buckets, DynamoDB tables, and Cognito user pools. If you're using an admin account, you're covered.
- **Bedrock model access**: RAGStack defaults to `us-east-1` because that's where Nova Multimodal Embeddings is available. Amazon's own models (including Nova) are available by default in Bedrock, no manual enablement required. Just make sure your IAM role has the necessary `bedrock:InvokeModel` permissions.
- **For the Marketplace path:** just a web browser.
- **For the source path:** Python 3.13+, Node.js 24+, AWS CLI and SAM CLI configured, and Docker (for building Lambda layers).

:::

### Deploying from AWS Marketplace

This is the fastest path – no local tools, no CLI, no Docker. You'll launch a CloudFormation stack and have a working pipeline in about 10 minutes.

#### Step 1: Launch the Stack

Click the [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>direct deploy link](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://ragstack-quicklaunch-public.s3.us-east-1.amazonaws.com/ragstack-template.yaml&stackName=my-docs) to open CloudFormation's "Quick create stack" page with the template pre-loaded.

![Screenshot of the "Quick create stack" interface in a cloud platform. Sections include Template URL, stack name input, parameters, and build options with a dark theme.](https://cdn.hashnode.com/res/hashnode/image/upload/v1771480162502/f79befbc-4ee8-481f-943f-d49afcaed3fa.png)

#### Step 2: Fill In Two Fields

The page has a lot of options, but you only need two:

- **Stack name**: Must be lowercase. This becomes the prefix for all your AWS resources (for example, `my-docs`, `team-kb`, `project-notes`). Keep it short.
- **Admin Email**: Under Required Settings. Cognito will send your temporary login credentials here. Use an email you can access right now.

Everything else – Build Options, Advanced Settings, OCR Backend, model selections – can stay at the defaults. They're there for customization later, but the defaults work out of the box.

#### Step 3: Deploy

Scroll to the bottom, check the three acknowledgment boxes under "Capabilities and transforms," and click **Create stack**.

Deployment takes roughly 10 minutes. You can watch the progress in the CloudFormation Events tab if you're curious, but there's nothing to do until the stack status flips to `CREATE_COMPLETE`.

#### Step 4: Log In

Once the stack finishes, check your email. Cognito sends you the dashboard URL and a temporary password. Log in, set a new password, and you're looking at an empty dashboard ready for documents.

![Dashboard interface for document management, displaying a sidebar with options like Upload, Scrape, Search, and Chat. Main area shows no documents.](https://cdn.hashnode.com/res/hashnode/image/upload/v1771480437013/bedb22c4-aa61-4dcf-8ee6-a242890794e4.png)

### Deploying from Source

If you want to customize the pipeline, modify the UI, or contribute to the project, deploy from source instead.

#### Step 1: Clone and Set Up

```sh
git clone https://github.com/HatmanStack/RAGStack-Lambda.git
cd RAGStack-Lambda

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Step 2: Deploy

The <VPIcon icon="fa-brands fa-python"/>`publish.py` script handles everything: building the frontend, packaging Lambda functions, and deploying via SAM CLI.

```sh
python publish.py \
--project-name my-docs \
--admin-email admin@example.com
```

This defaults to `us-east-1` for Nova Multimodal Embeddings. The script will build the React dashboard, build the web component, package all Lambda layers with Docker, and deploy the CloudFormation stack through SAM.

First deploy takes longer (15-20 minutes) because it's building everything from scratch. Subsequent deploys are faster since SAM caches unchanged resources.

If you only want to iterate on the backend and skip UI builds:

```sh
# Skip dashboard build (still builds web component)
python publish.py --project-name my-docs --admin-email admin@example.com --skip-ui

# Skip ALL UI builds
python publish.py --project-name my-docs --admin-email admin@example.com --skip-ui-all
```

Once it finishes, you'll get the same Cognito email and dashboard URL as the Marketplace path.

### Uploading Your First Documents

The dashboard has tabs for different content types. We'll start with the Documents tab since that's the most common use case.

#### Documents

Click the **Documents** tab and upload a file. RAGStack accepts a wide range of formats: PDF, DOCX, XLSX, HTML, CSV, JSON, XML, EML, EPUB, TXT, and Markdown. Drag and drop or use the file picker.

Once uploaded, the document enters the processing pipeline. You'll see the status update in real time:

1. **UPLOADED**: File received and stored in S3.
2. **PROCESSING**: Step Functions has picked it up and routed it to the right processor. Text-based files (HTML, CSV, Markdown) go through direct extraction. Scanned PDFs and images go through Textract OCR. The LLM analyzes the content and extracts structured metadata, topic, document type, people mentioned, date ranges, whatever's relevant to the content.
3. **INDEXED**: Embeddings generated, vectors stored, document is searchable.

Text documents typically process in 1-5 minutes. OCR-heavy documents (scanned PDFs, images with text) can take 2-15 minutes depending on page count.

![Screenshot of a document upload interface from Document Pipeline. Features a drag-and-drop area with a folder icon and options for documents, images, and image archive tabs. Sidebar shows dashboard, upload, storage, search, and chat options.](https://cdn.hashnode.com/res/hashnode/image/upload/v1771480492183/78867098-f8b0-46f3-a1af-8b6be677ea6d.png)

#### Images

The **Images** tab works differently. Upload a JPG, PNG, GIF, or WebP and you can add a caption. Both the visual content and caption text get embedded using Nova Multimodal Embeddings, so you can search by what's in the image or by your description of it.

This is where multimodal embeddings earn their keep. A traditional text-only RAG pipeline would need you to describe every image manually. Here, the image itself becomes searchable, and since everything stays in your AWS account, you're not sending personal photos or sensitive visual content to an external service to get there.

#### What About Video and Audio?

Upload video or audio files and RAGStack routes them through AWS Transcribe for speech-to-text conversion. The transcript gets split into 30-second chunks with speaker identification, then embedded like any other document. When chat results reference a video source, you get timestamp links that jump to the exact position in the recording.

#### Web Scraping

The **Scrape** tab lets you pull websites directly into your knowledge base. Enter a URL and RAGStack crawls the page, extracts the content, and processes it through the same pipeline as uploaded documents, metadata extraction, embedding, indexing.

This is useful for building a knowledge base from existing web content without manually saving and uploading pages. Documentation sites, blog archives, reference material, anything publicly accessible.

![Screenshot of a web scraping interface titled 'Scrape Website' with fields for website URL, maximum pages, depth, and scope. A sidebar lists options like Dashboard, Upload, and Scrape. The design is minimal and functional, with a 'Start Scrape' button highlighted in blue, suggesting a focused, efficient process.](https://cdn.hashnode.com/res/hashnode/image/upload/v1771480560253/bc690fae-4de8-4d0d-bd4e-50b3741b7667.png)

### Chatting With Your Knowledge Base

This is the payoff. Go to the **Chat** tab, type a question, and RAGStack retrieves relevant documents from your knowledge base, passes them as context to a Bedrock LLM, and returns an answer with source citations.

The citations are collapsible, so click to expand and see which documents informed the answer, with the option to download the source file. For video and audio sources, you get clickable timestamps that jump to the relevant moment.

![A screenshot of a Knowledge Base Chat interface on a document management system. The screen prompts users to start a conversation by typing a message.](https://cdn.hashnode.com/res/hashnode/image/upload/v1771480609654/df259ecd-1b75-4acb-935a-c6e49b4b6038.png)

#### Metadata Filtering

If you've uploaded enough documents to have meaningful metadata categories, the chat interface lets you filter search results by metadata before querying. RAGStack auto-discovers the metadata structure from your documents, so you don't configure this manually, it just appears as your knowledge base grows.

This is useful when you have a large mixed corpus. Instead of hoping the vector search picks the right context from thousands of documents, you can narrow it down: "only search documents about project X" or "only search content from Q4 2024."

### Embedding the Web Component in Your App

The dashboard is useful for managing your knowledge base, but the real power is embedding RAGStack's chat in your own application. The web component works with any framework, React, Vue, Angular, Svelte, plain HTML.

Load the script once from your CloudFront distribution:

```html
<script src="https://your-cloudfront-url/ragstack-chat.js"></script>
```

Then drop the component wherever you want a chat interface:

```html
<ragstack-chat
  conversation-id="my-app"
  header-text="Ask About Documents"
></ragstack-chat>
```

That's it. The component handles authentication (via IAM), manages conversation state, and renders source citations, all self-contained. Your CloudFront URL is in the stack outputs.

For server-side integrations that don't need a UI, the GraphQL API is available with API key authentication. You can find your endpoint and API key in the dashboard under Settings.

### Using the MCP Server

RAGStack includes an MCP server that connects your knowledge base to AI assistants like Claude Desktop, Cursor, VS Code, and Amazon Q CLI. Instead of switching to the dashboard to search your documents, you ask your assistant directly.

Install it:

```sh
pip install ragstack-mcp
```

Then add it to your AI assistant's MCP configuration:

```json
{
  "ragstack": {
    "command": "uvx",
    "args": ["ragstack-mcp"],
    "env": {
      "RAGSTACK_GRAPHQL_ENDPOINT": "YOUR_ENDPOINT",
      "RAGSTACK_API_KEY": "YOUR_API_KEY"
    }
  }
}
```

Your endpoint and API key are in the dashboard under Settings. Once configured, type `@ragstack` in your assistant's chat to invoke the MCP server, then ask things like "search my knowledge base for authentication docs" and it queries RAGStack directly.

See the [MCP Server docs (<VPIcon icon="iconfont icon-github"/>`HatmanStack/RAGStack-Lambda`)](https://github.com/HatmanStack/RAGStack-Lambda/blob/main/src/ragstack-mcp/README.md) for the full list of available tools and setup details.

---

## What You Can Build From Here

You've got a deployed RAG pipeline that costs almost nothing to run and handles text, images, video, and audio. A few directions you might take it:

A **searchable personal archive**. Every conference talk you've saved, every PDF textbook, every tutorial video that's sitting in a folder somewhere. Upload it all, and now you have one search interface across years of accumulated material. The multimodal embeddings mean your screenshots and diagrams are searchable too, not just the text.

I built a [family archive app (<VPIcon icon="iconfont icon-github"/>`HatmanStack/family-archive-document-ai`)](https://github.com/HatmanStack/family-archive-document-ai) this way, scanned letters, old photos, home videos, with RAGStack deployed as a nested CloudFormation stack so the whole family can search across decades of memories using the chat widget.

A **second brain for a client project**. Scrape the client's existing docs, upload the SOW and meeting notes, drop in the codebase documentation. Now you've got a searchable knowledge base scoped to that engagement. Spin it up at the start, tear it down when the contract ends. At these costs, it's disposable infrastructure.

**AI chat over a niche dataset**. Recipe collections, legal filings, research papers, local government meeting minutes, any corpus that's too specialized for general-purpose LLMs to know well. The web component means you can ship it as a standalone tool without building a frontend from scratch.

**RAG for your MCP workflow**. If you're already using Claude Desktop or Cursor, the MCP server turns your knowledge base into another tool your assistant can reach for. Upload your team's runbooks and architecture docs, and now @ragstack in your editor gives you instant context without tab-switching.

---

## Wrapping Up

The serverless RAG pipeline you just deployed handles document processing, multimodal embeddings, metadata extraction, and AI chat with source citations, all scaling to zero when idle, all running in your AWS account. Your documents, your vectors, your infrastructure. The traditional approach to this stack costs $120-500/month in baseline infrastructure. This one costs pocket change.

The full source is at [github.com/HatmanStack/RAGStack-Lambda (<VPIcon icon="iconfont icon-github"/>`HatmanStack/RAGStack-Lambda`)](http://github.com/HatmanStack/RAGStack-Lambda). File issues, open PRs, or just poke around the architecture. If you want to go deeper on the technical tradeoffs, particularly how filtered vector search behaves on cost-optimized backends like S3 Vectors, that's a story for the next post.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Serverless RAG Pipeline on AWS That Scales to Zero",
  "desc": "Most RAG tutorials end the same way: you've got a working prototype and a bill for a vector database that runs whether anyone's querying it or not. Add an always-on embedding service, a hosted LLM end",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/serverless-rag-pipeline-on-aws.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
