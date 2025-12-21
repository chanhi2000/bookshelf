---
lang: en-US
title: "How to Set Up the Vector Database for Embedding Storage"
description: "Article(s) > (5/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
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
      content: "Article(s) > (5/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
    - property: og:description
      content: "How to Set Up the Vector Database for Embedding Storage"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-local-rag-app-with-ollama-and-chromadb-in-r/how-to-set-up-the-vector-database-for-embedding-storage.html
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
  url="https://freecodecamp.org/news/build-a-local-rag-app-with-ollama-and-chromadb-in-r#heading-how-to-set-up-the-vector-database-for-embedding-storage"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png"/>

A vector database is a special type of database that stores embeddings and allows you to query and retrieve relevant information. There are numerous vector databases available, but for this project, you will use ChromaDB, an open-source option that integrates with the R environment through the `rchroma` library.

ChromaDB runs locally in a Docker container. Just make sure you have Docker installed and running on your device.

Then load the rchroma library and run your ChromaDB instance:

```r
# load rchroma library
library(rchroma)
# run ChromaDB instance.
chroma_docker_run()
```

If it was successful, you should see this in the console:

![Confirm ChromaDB is running locally](https://cdn.hashnode.com/res/hashnode/image/upload/v1744383249217/bd8fb67c-0731-46f9-8a13-0747b4789714.png)

Next, connect to a local ChromaDB instance and check the connection:

```r
# Connect to a local ChromaDB instance
client <- chroma_connect()

# Check the connection
heartbeat(client)
version(client)
```

Now you’ll need to create a collection and confirm that it was created. Collections in ChromaDB function similarly to tables in conventional databases.

```r
# Create a new collection
create_collection(client, "recipes_collection")

# List all collections
list_collections(client)
```

Now, add embeddings to the collection. To add embeddings to the `recipes_collection`, use the `add_documents` function.

```r
# Add documents to the collection
add_documents(
  client,
  "recipes_collection",
  documents = recipe_sentence_embeddings$recipe,
  ids = recipe_sentence_embeddings$recipe_id,
  embeddings = recipe_sentence_embeddings$recipe_vec_embeddings
)
```

The `add_documents()` function is used to add recipe data to the `recipes_collection`. Here's a breakdown of its arguments and how the corresponding data is accessed:

1. `documents`: This argument represents the recipe text. It is sourced from the `recipe` column of the `recipe_sentence_embeddings` dataframe.
2. `ids`: This is the unique identifier for each recipe. It is extracted from the `recipe_id` column of the same dataframe.
3. `embeddings`: This contains the sentence embeddings, which were previously generated for each recipe. These embeddings are accessed from the `recipe_vec_embeddings` column of the dataframe.

All three arguments—`documents`, `ids`, and `embeddings`—are obtained by subsetting their respective columns from the `recipe_sentence_embeddings` dataframe.
