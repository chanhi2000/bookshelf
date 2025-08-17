---
lang: en-US
title: "Ollama Installation"
description: "Article(s) > (1/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
icon: iconfont icon-r
category:
  - R
  - AI
  - LLM- Ollama
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
      content: "Article(s) > (1/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
    - property: og:description
      content: "Ollama Installation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-local-rag-app-with-ollama-and-chromadb-in-r/ollama-installation.html
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
  url="https://freecodecamp.org/news/build-a-local-rag-app-with-ollama-and-chromadb-in-r#heading-ollama-installation"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png"/>

Ollama is an open-sourced tool you can use to run and manage LLMs on your computer. Once installed, you can access various LLMs as per your needs. You will be using `llama3.2:3b-instruct-q4_K_M` model to build this chatbot.

A quantized model is a version of a machine learning model that has been optimized to use less memory and computational power by reducing the precision of the numbers it uses. This enables you to use an LLM locally, especially when you don’t have access to a GPU (Graphics Processing Unit - a specialized processor that perform complex computations).

To start, you can download and install the Ollama software [<FontIcon icon="iconfont icon-ollama"/>here](https://ollama.com/download).

Then you can confirm installation by running this command:

```sh
ollama --version
```

Run the following command to start Ollama:

```sh
ollama serve
```

Next, run the following command to pull the Q4_K_M quantization of llama3.2:3b-instruct:

```sh
ollama pull llama3.2:3b-instruct-q4_K_M
```

Then confirm that the model was extracted with this:

```sh
ollama list
```

If the model extraction was successful, a list containing the model’s name, ID, and size will be returned, like so:

![Confirm Ollama Installation](https://cdn.hashnode.com/res/hashnode/image/upload/v1744288047721/f6349ca4-fe86-4851-beaf-2f04fe2a4d80.png)

Now you can chat with the model:

```sh
ollama run llama3.2:3b-instruct-q4_K_M
```

If successful, you should receive a prompt that you can test by asking a question and getting an answer. For example:

![Ollama llama3.2:3b-instruct-q4_K_M chat console](https://cdn.hashnode.com/res/hashnode/image/upload/v1744288433940/d831d256-0f6c-49c0-b647-bce1c1976584.png)

Then you can exit the console by typing `/bye` or <kbd>Ctrl</kbd>+<kbd>D</kbd>
