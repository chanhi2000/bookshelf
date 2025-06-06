---
lang: en-US
title: "Tool Calling"
description: "Article(s) > (7/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
icon: iconfont icon-r
category:
  - R
  - AI
  - LLM
  - Ollama
  - DevOps
  - Docker
  - Python
  - Java
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - r
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - ollama
  - devops
  - docker
  - py
  - python
  - java
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (7/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
    - property: og:description
      content: "Tool Calling"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-local-rag-app-with-ollama-and-chromadb-in-r/tool-calling.html
date: 2025-04-15
isOriginal: false
author:
  - name: Elabonga Atuo
    url : https://freecodecamp.org/news/author/Ellabee/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language",
  "desc": "A Large Language Model (LLM) is a type of machine learning model that is trained to understand and generate human-like text. These models are trained on vast datasets to capture the nuances of human language, enabling them to generate coherent and co...",
  "link": "/freecodecamp.org/build-a-local-rag-app-with-ollama-and-chromadb-in-r/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
  desc="A Large Language Model (LLM) is a type of machine learning model that is trained to understand and generate human-like text. These models are trained on vast datasets to capture the nuances of human language, enabling them to generate coherent and co..."
  url="https://freecodecamp.org/news/build-a-local-rag-app-with-ollama-and-chromadb-in-r#heading-tool-calling"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png"/>

To interact with Ollama in R, you will utilize the `ellmer` library. This library streamlines the use of large language models (LLMs) by offering an interface that enables seamless access to and interaction with a variety of LLM providers.

To enhance the LLM’s usage, we need to provide context to it. You can do this by tool calling. Tool calling allows an LLM to access external resources in order to enhance its functionality.

For this project, we are implementing [**Retrieval-Augmented Generation (RAG)**](https://freecodecamp.org/learn-rag-fundamentals-and-advanced-techniques.md), which combines retrieving relevant information from a vector database and generating responses using an LLM. This approach improves the chatbot's ability to provide accurate and contextually relevant answers.

Now, define a function that links to the LLM to provide context using the `tool()` function from the `ellmer` library.

```r
# load ellmer library
library(ellmer)

# function that links to llm to provide context
tool_context  <- tool(
  question,
  "obtains the right context for a given question",
  sentence = type_string()

)
```

The `tool()` function takes the question function that returns the relevant documents that we’ll use as context as the first argument. We’ll use the documents to help the LLM answer questions accordingly.

The text, "obtains the right context for a given question", is a description of what the tool will be doing.

Finally, the `sentence = type_string()` defines what type of object the `question()` function expects.
