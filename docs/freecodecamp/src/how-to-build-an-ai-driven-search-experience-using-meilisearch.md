---
lang: en-US
title: "How to Build an AI-Driven Search Experience using Meilisearch"
description: "Article(s) > How to Build an AI-Driven Search Experience using Meilisearch"
icon: iconfont icon-openai
category:
  - AI
  - LLM
  - OpenAI
  - Python
  - DevOps
  - Docker
  - Sevalla
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - py
  - python
  - openai
  - devops
  - docker
  - sevalla
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI-Driven Search Experience using Meilisearch"
    - property: og:description
      content: "How to Build an AI-Driven Search Experience using Meilisearch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-driven-search-experience-using-meilisearch.html
prev: /ai/openai/articles/README.md
date: 2025-11-27
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764196860843/a3dc07e2-6a90-4d4c-8b21-0f833ff41ac2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
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
  name="How to Build an AI-Driven Search Experience using Meilisearch"
  desc="Search is one of the most important features in modern applications. Users expect instant answers, useful suggestions, and results that match their intent even when they make spelling mistakes.  Most traditional search systems struggle to deliver thi..."
  url="https://freecodecamp.org/news/how-to-build-an-ai-driven-search-experience-using-meilisearch"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764196860843/a3dc07e2-6a90-4d4c-8b21-0f833ff41ac2.png"/>

Search is one of the most important features in modern applications. Users expect instant answers, useful suggestions, and results that match their intent even when they make spelling mistakes.

Most traditional search systems struggle to deliver this experience without complex and heavy infrastructure.

[<VPIcon icon="iconfont icon-github"/>`meilisearch/meilisearch`](https://github.com/meilisearch/meilisearch) is an open-source search engine that changes this by offering a fast and developer-friendly engine that is easy to set up and extend.

When you combine Meilisearch with AI models for natural language understanding and [<VPIcon icon="fas fa-globe"/>semantic relevance](https://turingtalks.ai/p/how-to-perform-sentence-similarity-check-using-sentence-transformers), you can build a powerful and intuitive search experience that feels modern and intelligent.

This article explains how Meilisearch works, how to set it up, and how to integrate AI models to deliver better relevance and better ranking. You will also see how hybrid search and semantic embeddings work, and how to deploy Melisearch to the cloud using Sevalla.

---

## Understanding Meilisearch

Meilisearch is a lightning-fast search engine that fits easily into any application.

It’s built in Rust and designed to deliver results in less than fifty milliseconds. It supports semantic search, hybrid search, typo tolerance, sorting, geosearch, and many different languages.

Melisearch also provides a clean RESTful API and a wide range of SDKs that make integration easy with JavaScript, Python, Go, PHP, Ruby, Rust, and various other languages.

You can try Meilisearch by exploring the [<VPIcon icon="fas fa-globe"/>official demos](https://saas.meilisearch.com/deals). These demos show how Meilisearch is not limited to one specific use case but can fit many types of workflows.

Meilisearch supports two editions. The Community Edition is fully open source under the MIT license and can be used freely even for commercial products.

The Enterprise Edition introduces features like [<VPIcon icon="fa-brands fa-aws"/>sharding](https://aws.amazon.com/what-is/database-sharding/) and is governed by a commercial license. You can deploy Meilisearch yourself or choose Meilisearch Cloud, which handles hosting, updates, monitoring and analytics without requiring server maintenance.

---

## Setting Up Meilisearch

Starting Meilisearch is simple. You can download the binary and run it directly or you can start it through Docker. Running through Docker is the fastest way to test it on your machine.

```sh
docker run -it --rm -p 7700:7700 getmeili/meilisearch:latest
```

Once the server is running, you can communicate with it using HTTP. The simplest use case is indexing documents into an index and querying them. Here is an example using Python:

```py
import requests

docs = [
    {"id": 1, "title": "AI in Finance", "text": "How AI is changing banks"},
    {"id": 2, "title": "AI in Law", "text": "How AI helps legal teams"},
]
requests.put(
    "http://localhost:7700/indexes/articles/documents",
    json=docs
)
```

Searching is just as easy.

```py
import requests

query = "ai banks"
res = requests.post(
    "http://localhost:7700/indexes/articles/search",
    json={"q": query}
)
print(res.json())
```

The engine returns results in milliseconds. Typo tolerance, word proximity and relevance ranking work out of the box.

Meilisearch automatically handles synonyms if you configure them and allows custom sorting rules for attributes like price or date. It also supports faceting, filters, and geosearch, which makes it suitable for e-commerce, travel apps, real estate listings, and data-heavy dashboards.

---

## Using Hybrid Search and AI Together

Hybrid search combines full-text search with semantic vector search.

Meilisearch supports semantic search through vector fields and enables the combination of both approaches. This helps you serve users who type vague queries or natural language questions.

The AI model provides [<VPIcon icon="iconfont icon-ibm"/>embeddings](https://ibm.com/think/topics/embedding) that capture meaning, while Meilisearch handles the fast retrieval and ranking.

To add semantic search, you first generate embeddings for your documents using an AI model. Here is a simple example using OpenAI embeddings:

```py
from openai import OpenAI
import requests

client = OpenAI()
def embed(text):
    out = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return out.data[0].embedding
doc = {
    "id": 3,
    "title": "AI in Insurance",
    "text": "How AI powers underwriting",
    "vector": embed("How AI powers underwriting")
}
requests.put(
    "http://localhost:7700/indexes/articles/documents",
    json=[doc]
)
```

When the user searches, you embed the query and compute similarity. You can mix this with keyword search results returned from Meilisearch. The combined ranking creates a better experience than either approach alone.

---

## Using AI to Rewrite Queries

Users often type incomplete or unstructured queries. They might type “How does AI help banks?” instead of keywords.

You can use an AI model to rewrite this into something more search-friendly. The rewritten query produces better results in Meilisearch while still respecting the user’s original intent.

```py
from openai import OpenAI
import requests

client = OpenAI()
def rewrite_query(user_query):
    prompt = f"Rewrite this for search: {user_query}"
    out = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return out.choices[0].message.content
user_query = "how does ai help banks"
rewritten = rewrite_query(user_query)
res = requests.post(
    "http://localhost:7700/indexes/articles/search",
    json={"q": rewritten}
)
print(res.json())
```

This pattern improves accuracy for question-based searches across blogs, documentation platforms, and knowledge bases. You can also use the model to normalise queries, remove ambiguous text, expand synonyms, and fix spelling mistakes before they reach Meilisearch.

---

## Deploying Meilisearch to the Cloud using Sevalla

You can deploy Meilisearch anywhere. It runs on a small server, a local machine, or inside containers.

Self-hosting gives you full control and is usually preferred by technical teams who want to keep sensitive data in-house. You can choose any cloud provider, like AWS, DigitalOcean, or others to set up Melisearch. But I will be using Sevalla.

[<VPIcon icon="iconfont icon-sevalla"/>Sevalla](https://sevalla.com/) is a PaaS provider designed for developers and dev teams shipping features and updates constantly in the most efficient way. It offers application hosting, database, object storage, and static site hosting for your projects.

I am using Sevalla for two reasons:

- Every platform will charge you for creating a cloud resource. Sevalla comes with a $50 credit for us to use, so we won’t incur any costs for this example.
- Sevalla has a [<VPIcon icon="iconfont icon-sevalla"/>template for Melisearch](https://docs.sevalla.com/templates/overview), so it simplifies the manual installation and setup for each resource you will need for installation.

[<VPIcon icon="iconfont icon-sevalla"/>Log in](https://app.sevalla.com/login) to Sevalla and click on Templates. You can see Melisearch as one of the templates. Click Deploy.

![Sevalla Template](https://cdn.hashnode.com/res/hashnode/image/upload/v1764079735090/db59a275-f641-4f3a-bae9-c1cab1360cbd.png)

You will see the resources being provisioned for the application.

![Sevalla Deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1764079768294/8ca6ccbc-2b64-4a3d-984e-f4cd17e19289.png)

Once the deployment is complete, click on “Visit app”.

![Melisearch in Production](https://cdn.hashnode.com/res/hashnode/image/upload/v1764079831010/98be4bbb-6e85-4572-a84e-d11114d1215d.png)

You now have a production-grade Melisearch server running on the cloud. You can use this to set up indexes for your database and use the JavaScript or other SDKs to interact with Melisearch.

Here is the [<VPIcon icon="fas fa-globe"/>full list of APIs](https://meilisearch.com/docs/reference/api/overview) provided by Melisearch.

---

## Conclusion

Meilisearch gives you a fast and elegant base for search. AI models add understanding and personalisation. When these two work together, you get a search experience that feels instant, adaptive, and intelligent.

You can start small with keyword search and then add query rewriting, embeddings, hybrid search, and reranking. You can also use suggestions, synonyms, and filters to improve the user journey.

With its simple API, wide language support, and strong ecosystem, Meilisearch makes it easy to build a search that feels right at home in any modern app.

::: info

Hope you enjoyed this article. Find me on [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva) or [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI-Driven Search Experience using Meilisearch",
  "desc": "Search is one of the most important features in modern applications. Users expect instant answers, useful suggestions, and results that match their intent even when they make spelling mistakes.  Most traditional search systems struggle to deliver thi...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-driven-search-experience-using-meilisearch.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
