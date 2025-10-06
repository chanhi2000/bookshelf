---
lang: en-US
title: "How to Initialize the Chat System, Design Prompts, and Integrate Tools"
description: "Article(s) > (8/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
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
      content: "Article(s) > (8/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
    - property: og:description
      content: "How to Initialize the Chat System, Design Prompts, and Integrate Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-local-rag-app-with-ollama-and-chromadb-in-r/how-to-initialize-the-chat-system-design-prompts-and-integrate-tools.html
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
  url="https://freecodecamp.org/news/build-a-local-rag-app-with-ollama-and-chromadb-in-r#heading-how-to-initialize-the-chat-system-design-prompts-and-integrate-tools"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png"/>

Next, you’ll set up a conversational AI system by defining its role and functionality. Using system prompt design, you will shape the assistant’s behavior, tone, and focus as a culinary assistant. You’ll also integrate external tools to extend the chatbot’s capabilities by registering tools. Let’s dive in.

First, you need to initialize a Chat Object:

```r
#  Initialize the chat system with propmpt instructions.
chat <- chat_ollama(system_prompt = "You are a knowledgeable culinary assistant specializing in recipe recommendations. 
                    You provide tailored meal suggestions based on the user's available ingredients and the desired amount of food or servings.
                    Ensure the recipes align closely with the user's inputs and yield the expected quantity.",
                    model = "llama3.2:3b-instruct-q4_K_M")
```

You can do that using the `chat_ollama()` function. This sets up a conversational agent with the specified system prompt and model.

The system prompt defines the conversational behavior, tone, and focus of the LLM while the model argument specifies the language model (`llama3.2:3b-instruct-q4_K_M`) that the chat system will use to generate responses.

Next, you need to register a tool.

```r
#register tool
chat$register_tool(tool_context)
```

We need to tell our chat object about our `tool_context()` function. Do this by registering a tool using the `register_tool()` function.
