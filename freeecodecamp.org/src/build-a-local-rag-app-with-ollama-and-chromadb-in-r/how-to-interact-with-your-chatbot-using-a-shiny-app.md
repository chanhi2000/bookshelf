---
lang: en-US
title: "How to Interact with Your Chatbot Using a Shiny App"
description: "Article(s) > (9/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
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
      content: "Article(s) > (9/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
    - property: og:description
      content: "How to Interact with Your Chatbot Using a Shiny App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-local-rag-app-with-ollama-and-chromadb-in-r/how-to-interact-with-your-chatbot-using-a-shiny-app.html
next: /freecodecamp.org/build-a-local-rag-app-with-ollama-and-chromadb-in-r/README.md#complete-code
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
  url="https://freecodecamp.org/news/build-a-local-rag-app-with-ollama-and-chromadb-in-r#heading-how-to-interact-with-your-chatbot-using-a-shiny-app"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png"/>

To interact with the chatbot you’ve just created, we’ll use **Shiny**, a framework for building interactive web applications in R. Shiny provides a user-friendly graphical interface that allows seamless interaction with the chatbot.

For this purpose, we’ll use the **shinychat** library, which simplifies the process of building a chat interface within a Shiny app. This involves defining two key components:

1. **User Interface (UI)**:
    - Responsible for the visual layout and what the user sees.
    - In this case, `chat_ui("chat")` is used to create the interactive chat interface.
2. **Server Function**:
    - Handles the functionality and logic of the application.
    - It connects the chatbot to external tools and manages processes like embedding queries, retrieving relevant responses, and handling user inputs.

```r :collapsed-lines
# load the required library
library(shinychat)

# wrap the chat code in a Shiny App
ui <- bslib::page_fluid(
  chat_ui("chat")
)

server <- function(input, output, session) {
  # Connect to a local ChromaDB instance running on docker with embeddings loaded
  client <- chroma_connect()

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


  # function that provides context
  tool_context  <- tool(
    question,
    "obtains the right context for a given question",
    sentence = type_string()

  )

  #  Initialize the chat system with the first chunk
  chat <- chat_ollama(system_prompt = "You are a knowledgeable culinary assistant specializing in recipe recommendations. 
                      You provide tailored meal suggestions based on the user's available ingredients and the desired amount of food or servings.
                      Ensure the recipes align closely with the user's inputs and yield the expected quantity.",
                      model = "llama3.2:3b-instruct-q4_K_M")
  #register tool
  chat$register_tool(tool_context)

  observeEvent(input$chat_user_input, {
    stream <- chat$stream_async(input$chat_user_input)
    chat_append("chat", stream)
  })
}

shinyApp(ui, server)
```

Alright, let’s understand how this is working:

1. **User input monitoring with** `observeEvent()`: The `observeEvent()` block monitors user inputs from the chat interface (`input$chat_user_input`). When a user sends a message, the chatbot processes it, retrieves relevant context using the embeddings, and streams the response dynamically to the chat interface.
2. **Tool calling for context**: The chatbot employs tool calling to interact with external resources (like the vector database) and enhance its functionality. In this project, Retrieval-Augmented Generation (RAG) ensures the chatbot provides accurate and context-rich responses by integrating retrieval and generation seamlessly.

This approach brings the chatbot to life, enabling users to interact with it dynamically through a responsive Shiny app.
