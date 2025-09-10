---
lang: en-US
title: "How to Create Chunks"
description: "Article(s) > (3/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
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
      content: "Article(s) > (3/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
    - property: og:description
      content: "How to Create Chunks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-local-rag-app-with-ollama-and-chromadb-in-r/how-to-create-chunks.html
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
  url="https://freecodecamp.org/news/build-a-local-rag-app-with-ollama-and-chromadb-in-r#heading-how-to-create-chunks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png"/>

To understand why chunking is important before embedding, you need to understand what an embedding is.

An embedding is a vectoral representation of a word or a sentence. Machines don’t understand human text - they understand numbers. LLMs work by transforming human text to numerical representations in order to give answers. The process of generating embeddings requires a lot of computation, and breaking down the data to be embedded optimizes the embedding process.

So now we’re going to split the dataframe into smaller chunks of a specified size to enable efficient batch processing and iteration.

```r
# Define the size of each chunk (number of rows per chunk)
chunk_size <- 1

# Get the total number of rows in the dataframe
n <- nrow(cleaned_recipes_df)

# Create a vector of group numbers for chunking
# Each group number repeats for 'chunk_size' rows
# Ensure the vector matches the total number of rows
r <- rep(1:ceiling(n/chunk_size), each = chunk_size)[1:n]

# Split the dataframe into smaller chunks (subsets) based on the group numbers
chunks <- split(cleaned_recipes_df, r)
```
