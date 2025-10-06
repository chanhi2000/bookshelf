---
lang: en-US
title: "How to Write the User Input Query Embedding Function"
description: "Article(s) > (6/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
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
      content: "Article(s) > (6/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
    - property: og:description
      content: "How to Write the User Input Query Embedding Function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-local-rag-app-with-ollama-and-chromadb-in-r/how-to-write-the-user-input-query-embedding-function.html
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
  url="https://freecodecamp.org/news/build-a-local-rag-app-with-ollama-and-chromadb-in-r#heading-how-to-write-the-user-input-query-embedding-function"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png"/>


In order to retrieve information from a vector database, you must first embed your query text. The database compares your query's embedding with its stored embeddings to find and retrieve the most relevant document.

It's important to ensure that the dimensions (rows × columns) of your query embedding match those of the database embeddings. This alignment is achieved by using the same embedding model to generate your query.

Matching embeddings involves calculating the similarity (for example, cosine similarity) between the query and stored embeddings, identifying the closest match for effective retrieval.

Let’s write a function that allows us to embed a query which then queries similar documents using the generated embeddings. Wrapping it in a function makes it reusable.

```r :collapsed-lines
  #sentence embeddings function and query
  question <- function(sentence){
    sentence_embeddings <- textEmbed(sentence,
                                     layers = 10:11,
                                     aggregation_from_layers_to_tokens = "concatenate",
                                     aggregation_from_tokens_to_texts = "mean",
                                     keep_token_embeddings = FALSE
    )

    # convert tibble to vector
    sentence_vec_embeddings <- unlist(sentence_embeddings, use.names = FALSE)
    sentence_vec_embeddings <- list(sentence_vec_embeddings)

    # Query similar documents using embeddings
    results <- query(
      client,
      "recipes_collection",
      query_embeddings = sentence_vec_embeddings ,
      n_results = 2
    )
    results

  }
```

This chunk of code is similar to how we have previously used the `text_embed()` function. The `query()` function is added to enable querying the vector database, particularly the recipes' collection, and returns the top two documents that closely match a user’s query.

Our function thus takes in a sentence as an argument and embeds the sentence to generate sentence embeddings. It then queries the database and returns two documents that match the query most.
