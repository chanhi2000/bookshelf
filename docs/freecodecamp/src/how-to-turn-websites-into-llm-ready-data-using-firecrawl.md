---
lang: en-US
title: "How to Turn Websites into LLM-Ready Data Using Firecrawl"
description: "Article(s) > How to Turn Websites into LLM-Ready Data Using Firecrawl"
icon: fa-brands fa-python
category:
  - AI
  - LLM
  - Firecrawl
  - Python
  - Node.js
  - DevOps
  - Sevalla
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - firecrawl
  - py
  - python
  - node
  - nodejs
  - node-js
  - devops
  - sevalla
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Turn Websites into LLM-Ready Data Using Firecrawl"
    - property: og:description
      content: "How to Turn Websites into LLM-Ready Data Using Firecrawl"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-turn-websites-into-llm-ready-data-using-firecrawl.html
prev: /ai/llm/articles/README.md
date: 2025-10-23
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761148818578/a9572dc3-cc79-4ba9-ab47-4270e465df70.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Firecrawl > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/firecrawl/articles/README.md",
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
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
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
  name="How to Turn Websites into LLM-Ready Data Using Firecrawl"
  desc="If you’ve ever tried feeding web pages into an AI model, you know the pain. Websites come with ads, navigation bars, and messy HTML. Before your Large Language Model (LLM) can understand the content, you must clean and format it. That’s where Firecra..."
  url="https://freecodecamp.org/news/how-to-turn-websites-into-llm-ready-data-using-firecrawl"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761148818578/a9572dc3-cc79-4ba9-ab47-4270e465df70.png"/>

If you’ve ever tried feeding web pages into an AI model, you know the pain.

Websites come with ads, navigation bars, and messy HTML. Before your Large Language Model (LLM) can understand the content, you must clean and format it.

That’s where [<VPIcon icon="iconfont icon-github"/>`firecrawl/firecrawl`](https://github.com/firecrawl/firecrawl) makes life easy. It’s an open-source API tool that turns any website into neat, structured data ready for LLMs in seconds.

In this tutorial, we’ll look at two ways of using Firecrawl. One is through Firecrawl’s API (a paid API with a free tier) and the other is a self-hosted version.

---

## What Is Firecrawl?

[<VPIcon icon="iconfont icon-firecrawl"/>Firecrawl](https://firecrawl.dev/) is a web crawling and scraping service that helps developers collect clean data from websites. You give it a URL, and it returns the content in formats like Markdown, HTML, JSON, or even screenshots.

![Firecrawl illustrated - open source and cloud version](https://cdn.hashnode.com/res/hashnode/image/upload/v1760534000207/93e57884-c611-40cc-b7be-4fe7d3c1ac5c.png)

Unlike basic scrapers, Firecrawl understands complex websites that load content with JavaScript. It can crawl through links, follow pages, and handle the heavy lifting like proxies and anti-bot systems automatically.

In short, it does the hard part of web data collection, so you can focus on using that data for your AI or automation projects.

---

## Why LLMs Need Clean Data

LLMs learn and respond based on the text you give them. If that text includes clutter like HTML tags, scripts, or irrelevant sections, the AI gets confused.

Clean, well-structured data helps the model stay focused on the real content, like the article body, product details, or documentation.

Firecrawl makes this process simple. Instead of spending hours building scrapers or cleaning text, you can get ready-to-use content in a single API call.

---

## Setting Up Firecrawl

To get started, create an account on [<VPIcon icon="iconfont icon-firecrawl"/>`firecrawl.dev`](https://firecrawl.dev/) and grab your API key. Running Firecrawl on your machine includes setting up a server, Redis cache, and so on. So we’ll use the API key from firecrawl.dev to test the API.

We can also quickly test its capabilities in the UI of the website.

Let’s use [<VPIcon icon="fa-brands fa-free-code-camp"/>freecodecamp.org](https://freecodecamp.org/) as the domain to see if Firecrawl can return some results.

![Crawling freeCodeCamp](https://cdn.hashnode.com/res/hashnode/image/upload/v1760534104974/eb7ebdb4-d91f-4c49-92d9-b1c56c86ebb1.png)

And yes, we can see several URLs scraped by Firecrawl.

![Firecrawl results](https://cdn.hashnode.com/res/hashnode/image/upload/v1760534508920/5f6423e6-aef2-4935-a821-0246fd96c12e.png)

Now let’s access Firecrawl using code. The free plan lets you scrape 500 pages, so its all we need to understand how it works.

You can use either the [<VPIcon icon="iconfont icon-firecrawl"/>Python SDK](https://docs.firecrawl.dev/sdks/python), the [<VPIcon icon="iconfont icon-firecrawl"/>Node.js SDK](https://docs.firecrawl.dev/sdks/node), or direct API requests with curl.

Here’s how you install the SDKs:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-python"/>

```sh
pip install firecrawl-py
```

@tab <VPIcon icon="fa-brands fa-node"/>

```sh
npm install @mendable/firecrawl-js
```

:::

Once installed, you just need to set your API key and you’re ready to crawl.

---

## Scraping a Single Page

Let’s say you want to extract the main content from Firecrawl’s homepage. You can do this in just a few lines.

### Python Example

```py
from firecrawl import Firecrawl

firecrawl = Firecrawl(api_key="fc-YOUR_API_KEY")

doc = firecrawl.scrape(
    "https://firecrawl.dev",
    formats=["markdown", "html"]
)

print(doc.markdown)
```

This script returns the cleaned version of the page in Markdown format, perfect for an LLM to read or analyze.

With this one command, you get the core text, free from HTML clutter.

---

## Crawling an Entire Website

If you need data from multiple pages like a full documentation site, you can crawl the entire domain. Firecrawl finds all the links and scrapes them automatically.

::: tip Example API call

```sh
curl -X POST https://api.firecrawl.dev/v2/crawl \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{
  "url": "https://docs.firecrawl.dev",
  "limit": 10,
  "scrapeOptions": {
    "formats": ["markdown", "html"]
  }
}'
```

This starts a crawl job and returns a job ID. Once done, you can download all the scraped pages in clean, LLM-ready formats.

:::

---

## Extracting Structured Data with AI

One of Firecrawl’s best features is AI-powered extraction. You can ask Firecrawl to read a page and return structured data, like a product’s price, description, or reviews, in JSON format.

::: tip Example

```sh
curl -X POST https://api.firecrawl.dev/v2/extract \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{
  "urls": ["https://firecrawl.dev/*"],
  "prompt": "Extract the company mission and whether it is open source.",
  "schema": {
    "type": "object",
    "properties": {
      "company_mission": { "type": "string" },
      "is_open_source": { "type": "boolean" }
    }
  }
}'
```

Firecrawl uses a built-in LLM to read the content and fill in the structure automatically. You can even skip the schema and just provide a natural-language prompt, like:

> *“Extract all the pricing details and feature names from this page.”*

This is ideal for AI pipelines, RAG (Retrieval-Augmented Generation) systems, or dashboards that rely on clean, structured data.

---

## Self-hosting Firecrawl using Sevalla

Firecrawl is open source, which means you don’t have to pay for the API if you prefer full control. You can deploy it on your own server and customise it however you like.

You can install Firecrawl on your local machine by setting up a database, cache, and other required components. But this setup will only work for local projects and won’t allow you to build or deploy applications that use Firecrawl.

To install Firecrawl, you can choose any cloud provider like [<VPIcon icon="fa-brands fa-aws"/>AWS](https://aws.amazon.com/), [<VPIcon icon="iconfont icon-heroku"/>Heroku](https://heroku.com/), or others to setup this project. But I will be using Sevalla.

[<VPIcon icon="iconfont icon-sevalla"/>Sevalla](https://sevalla.com/) is a modern, usage-based Platform-as-a-service provider. It offers application hosting, database, object storage, and static site hosting for your projects.

I am using Sevalla for hosting for two reasons:

- Every platform will charge you for creating a cloud resource. Sevalla comes with a $50 credit for us to use, so we won't incur any costs for this example.
- Sevalla has a [<VPIcon icon="iconfont icon-sevall"/>template for Firecrawl](https://docs.sevalla.com/templates/overview), so it simplifies the manual installation and setup for each resource you will need for Firecrawl.

[<VPIcon icon="iconfont icon-sevalla"/>Login](https://app.sevalla.com/login) to Sevalla and click on Templates. You can see Firecrawl as one of the templates.

![Sevalla Templates](https://cdn.hashnode.com/res/hashnode/image/upload/v1760534530797/6d327148-5c6f-40cc-863a-2ad9d82763bd.png)

Click “Deploy now” and choose a server in the pop-up, and click “Deploy”. Sevalla will start provisioning the resources we need for running our Firecrawl instance.

![Firecrawl resources](https://cdn.hashnode.com/res/hashnode/image/upload/v1760534550817/38525217-89cb-41b3-8128-85164734b764.png)

Once the deployment is complete, you will see three instances provisioned:

- a [<VPIcon icon="iconfont icon-redis"/>Redis Cache](https://redis.io/)
- a server to run [<VPIcon icon="iconfont icon-playwright"/>Playwright](https://playwright.dev/)
- The API application

Go to the Firecrawl-API application. Under the deployments section, click on “Visit app” once the deployment is complete.

![Firecrawl Deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1760534571061/3f4db002-c775-445f-a1fc-af1aefff2d86.png)

You can now use your private endpoint in your applications. My API URL is [<VPIcon icon="fas fa-globe"/>firecrawl-api-56t8x.sevalla.app](https://firecrawl-api-56t8x.sevalla.app/) (this is a temporary URL – dont use this), so I can replace api.firecrawl.dev with this URL.

```sh
curl -X POST https://firecrawl-api-56t8x.sevalla.app/v2/extract \
-H 'Content-Type: application/json' \
-d '{
  "urls": ["https://firecrawl.dev/*"],
  "prompt": "Extract the company mission and whether it is open source.",
  "schema": {
    "type": "object",
    "properties": {
      "company_mission": { "type": "string" },
      "is_open_source": { "type": "boolean" }
    }
  }
}'
```

If you want to run the project locally by installing applications like Redis, Postgresql, and Playwright, [here’s a detailed guide (<VPIcon icon="iconfont icon-github"/>`firecrawl/firecrawl`)](https://github.com/firecrawl/firecrawl/blob/main/CONTRIBUTING.md).

---

## Use Cases

Developers and data scientists use Firecrawl for a wide range of tasks. They often rely on it to turn documentation sites into training data for large language models, ensuring that their models can learn from accurate and well-organised sources.

Others use it to collect blog posts or news articles for [<VPIcon icon="fas fa-globe"/>sentiment analysis](https://turingtalks.ai/p/how-to-build-a-simple-sentiment-analyzer-using-hugging-face-transformer), helping them understand trends, opinions, or public reactions across the web.

Firecrawl is also valuable for monitoring web content changes, which is essential for research projects or compliance tracking where up-to-date information is critical.

Teams can also use it to build “chat with your website” AI assistants that can answer questions based on the latest site content.

In each of these cases, Firecrawl ensures that your model receives clean, structured, and consistent data, making it easier to build reliable and intelligent AI systems.

---

## Conclusion

Turning messy websites into readable text used to be one of the toughest parts of building AI systems. Firecrawl changes that. With one API call, you can scrape, crawl, and extract high-quality data that your LLM can immediately understand.

If you’re building anything related to AI, RAG, or data pipelines, Firecrawl is one of those tools you’ll wish you had discovered earlier.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Turn Websites into LLM-Ready Data Using Firecrawl",
  "desc": "If you’ve ever tried feeding web pages into an AI model, you know the pain. Websites come with ads, navigation bars, and messy HTML. Before your Large Language Model (LLM) can understand the content, you must clean and format it. That’s where Firecra...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-turn-websites-into-llm-ready-data-using-firecrawl.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
