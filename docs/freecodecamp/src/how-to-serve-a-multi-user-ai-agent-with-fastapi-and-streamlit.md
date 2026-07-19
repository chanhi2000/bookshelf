---
lang: en-US
title: "How to Serve a Multi-User AI Agent with FastAPI and Streamlit"
description: "Article(s) > How to Serve a Multi-User AI Agent with FastAPI and Streamlit"
icon: iconfont icon-streamlit
category:
  - Python
  - FastAPI
  - Streamlit
  - AI
  - LLM
  - LangChain
  - Ollama
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
  - streamlit
  - py-streamlit
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - langchain
  - lang-chain
  - ollama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Serve a Multi-User AI Agent with FastAPI and Streamlit"
    - property: og:description
      content: "How to Serve a Multi-User AI Agent with FastAPI and Streamlit"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-serve-a-multi-user-ai-agent-with-fastapi-and-streamlit.html
prev: /programming/py-streamlits/articles/README.md
date: 2026-07-21
isOriginal: false
author:
  - name: Darsh Shah
    url: https://freecodecamp.org/news/author/darshs/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e5bf4093-e618-4388-954c-f1a49bc87cfe.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Streamlit > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-streamlit/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Ollama > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/ollama/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LangChain > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langchain/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Serve a Multi-User AI Agent with FastAPI and Streamlit"
  desc="In this tutorial, I’ll show you how to serve a multi-user local AI agent as a REST API using FastAPI, then add a lightweight Streamlit UI on top. Instead of interacting with the agent through a termin"
  url="https://freecodecamp.org/news/how-to-serve-a-multi-user-ai-agent-with-fastapi-and-streamlit"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e5bf4093-e618-4388-954c-f1a49bc87cfe.png"/>

In this tutorial, I’ll show you how to serve a multi-user local AI agent as a REST API using FastAPI, then add a lightweight Streamlit UI on top.

Instead of interacting with the agent through a terminal, we’ll expose it over HTTP so multiple users can access it through a chat-style frontend interface. Each session will maintain its own conversation history and streamed responses.

The local AI agent will be built with LangChain v1, Ollama, Qwen, and Python, running on your own machine and ready to plug into larger applications without any per-call model API charges.

---

## Background

Many AI agents start out as simple Python scripts that run in a command-line terminal. You type a message, the agent responds, and everything happens in a single local session.

That setup is great for development and testing, but it becomes limiting when you want other people or applications to interact with the agent.

To make an AI agent truly useful, we need to expose it through an interface that other users can access. A REST API is a practical way to do that.

To follow this tutorial, you'll need Ollama installed on your machine. The tutorial works on macOS, Windows, and Linux. I'm using a MacBook Pro with 32 GB of RAM, but you can run this on a lower-memory machine by choosing a smaller Qwen model from Ollama.

---

## What is FastAPI?

[FastAPI (<VPIcon icon="iconfont icon-github"/>`fastapi/fastapi`)](https://github.com/fastapi/fastapi) is a Python web framework for building APIs. In this tutorial, it gives us a simple way to expose the agent over HTTP so other apps, scripts, or services can call it.

FastAPI is a good fit for AI apps because it gives us a clean boundary around the system. We define the request and response models in Python, FastAPI validates them automatically, and it turns HTTP requests into Python objects and Python objects back into JSON. It also generates interactive API docs for free and supports async endpoints, which is useful for AI workloads that may take longer to respond.

---

## What is Streamlit?

[<VPIcon icon="iconfont icon-streamlit"/>Streamlit](https://streamlit.io) is a Python framework for building lightweight web interfaces with minimal frontend work. It lets us create interactive browser-based apps using normal Python code instead of HTML, CSS, and JavaScript.

In this tutorial, Streamlit sits on top of the FastAPI backend as a thin client. FastAPI exposes the AI agent over HTTP, and Streamlit gives us a simple UI for calling that API and displaying the results. That separation keeps the backend reusable while still making the agent easy to use in the browser.

---

## What Is Multi-User Support?

Multi-user support means the AI agent can handle requests from more than one user while keeping each user’s session separate.

For example, User 1 asks the agent one question and User 2 asks a different question. The agent should remember the correct context for each user independently. Without multi-user support, all users may end up sharing the same conversation state, which can lead to mixed responses, incorrect memory, or overwritten context.

---

## Motivation and Architecture

Turning an AI agent into an API is the natural next step after building it locally. A Python script is great for experimenting, but an API makes the agent reusable. And adding multi-user support makes the agent extensible to be used by others.

To keep things simple, we’ll use a small local agent powered by Ollama and Qwen. The agent has two tools: one for checking the current time and another for counting words.

FastAPI provides the HTTP layer by exposing one endpoint called `/chat/stream`. When the request comes in with a user message, Pydantic validates the request, LangChain handles the agent loop and tool calling, and the final answer is returned as stream. Streamlit sits on top of that API and acts as a frontend that sends requests to the API and displays the results.

![image showing the sequence diagram of user calling the streamlit UI. The it goes to FastAPI layer, then to AI agent and finally Qwen and tool calls](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/21a2b03d-b4c3-4211-82b1-aa265ac6fb1e.png)

Example request:

```json
{ 
  "message": "How many words are in: LangChain makes tool calling easier",
  "user_id":"123e4567-e89b-12d3-a456-426614174000"
}
```

Example response:

```json
{
  "answer": "There are **5** words in LangChain makes tool calling easier."
}
```

The model runs locally through Ollama, so there are no per-call model API charges.

---

## Step 1: Install Ollama and Pull the Model

To get started, install the Ollama application for your platform.

We’ll use Qwen as the chat model. I’m using `qwen3.5:4b`. If your machine has less RAM, you can use `qwen3.5:0.8b` instead.

```sh
ollama pull qwen3.5:4b
```

---

## Step 2: Install Python Dependencies

Create a virtual environment and install the required packages:

```sh
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn streamlit requests langchain langchain-core langchain-ollama langgraph
```

If tutorial requires LangChain >= 1.0.0.

---

## Step 3: Build the Agent and API Layer with FastAPI

This application has three main responsibilities. FastAPI exposes the HTTP endpoint, Pydantic validates the incoming request data, and LangChain runs the agent, including tool calling and short-term memory.

The `user_id` sent with each request is used as the thread identifier, allowing the checkpointer to keep each user’s conversation history separate. This memory is per session. So every new session will have its own memory.

Another important detail is that the agent is created only once at startup with `agent = build_agent()`. Reusing the same agent instance avoids rebuilding the model and tool list for every request, which reduces overhead and improves response times while still supporting multiple users.

Inside the `/chat/stream` endpoint, the backend uses [<VPIcon icon="iconfont icon-langchain"/>LangChain’s](https://docs.langchain.com/oss/python/langchain/event-streaming) `stream_events(..., version="v3")` to generate the response as a stream instead of waiting for the full answer all at once. FastAPI then wraps that stream in a `StreamingResponse`, so the frontend can receive the output gradually as it's produced. This makes the app feel much more interactive, because users can start reading the answer immediately while the rest is still being generated.

Put together, this gives you a lightweight backend that validates input, preserves separate memory for each user, and streams responses to the UI in real time.

Save the following code as <VPIcon icon="fa-brands fa-python"/>`app.py`:

```py
from datetime import datetime
from uuid import UUID

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse

from pydantic import BaseModel

from langchain.agents import create_agent
from langchain_core.tools import tool
from langchain_ollama import ChatOllama
from langgraph.checkpoint.memory import InMemorySaver

CHAT_MODEL = "qwen3.5:4b"

SYSTEM_PROMPT = (
    "You are a helpful assistant with access to tools for getting the current time "
    "and counting words in text. "
    "Use tools when needed. If the question does not need a tool, answer directly."
)

# -----------------------------
# Request model
# -----------------------------

class ChatRequest(BaseModel):
    user_id: UUID
    message: str

# -----------------------------
# Tools
# -----------------------------

@tool
def current_time() -> str:
    """Return the current local date and time."""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


@tool
def word_count(text: str) -> int:
    """Count the number of words in a piece of text."""
    return len(text.split())


# -----------------------------
# Agent + checkpoint memory
# -----------------------------

# Store conversation history in short term memory
checkpointer = InMemorySaver()

def build_agent():
    model = ChatOllama(model=CHAT_MODEL, temperature=0)
    return create_agent(
        model=model,
        tools=[current_time, word_count],
        system_prompt=SYSTEM_PROMPT,
        checkpointer=checkpointer,
    )


agent = build_agent()

# -----------------------------
# Streaming endpoint
# -----------------------------

app = FastAPI()

@app.post("/chat/stream")
def chat_stream(req: ChatRequest):
    def generate():
        run = agent.stream_events(
            {
                "messages": [{"role": "user", "content": req.message}],
            },
            config={
                "configurable": {
                    # Keep each user's short-term memory isolated
                    # by using their user_id as the thread ID.
                    "thread_id": str(req.user_id),
                }
            },
            version="v3",
        )

        for message in run.messages:
            for token in message.text:
                yield token

    return StreamingResponse(generate(), media_type="text/plain")
```

---

## Step 4: Build Streamlit UI

The Streamlit code creates a simple chat interface for the AI agent and keeps each browser session tied to a unique user_id.

When the app first loads, it generates and stores a UUID in st.session_state, which is later sent to the backend so the agent can keep that user’s conversation history separate from other users. It also creates a chat_history list in session state so previous messages remain visible every time Streamlit reruns the script. The app then loops through that saved history and displays each message in a chat-style format using st.chat_message().

When the user enters a new message through st.chat_input(), the app immediately saves and displays it, then sends it to the backend API with a POST request to `http://127.0.0.1:8001/chat/stream` along with the session’s user_id.

The request is made with stream=True, which allows the response to arrive gradually instead of all at once. As each chunk of text is received from the backend, the code appends it to full_answer and updates a placeholder on the page, creating a live streaming effect. Once the response is complete, the final assistant message is stored in chat_history so it remains part of the conversation on the page

Save the below as <VPIcon icon="fa-brands fa-python"/>`streamlit_app.py`

```py :collapsed-lines title="streamlit_app.py"
import uuid
import requests
import streamlit as st

API_URL = "http://127.0.0.1:8001/chat/stream"

st.title("Local AI Agent")

if "user_id" not in st.session_state:
    st.session_state.user_id = str(uuid.uuid4())

if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# Show previous messages
for item in st.session_state.chat_history:
    with st.chat_message(item["role"]):
        st.markdown(item["content"])

message = st.chat_input("Enter a message")

if message:
    # Save and show user message
    st.session_state.chat_history.append({"role": "user", "content": message})
    with st.chat_message("user"):
        st.markdown(message)

    # Stream assistant response
    full_answer = ""
    with st.chat_message("assistant"):
        placeholder = st.empty()

        # Send the reqeust to backend API via POST request
        with requests.post(
            API_URL,
            json={
                "message": message,
                "user_id": st.session_state.user_id,
            },
            stream=True,
        ) as response:
            response.raise_for_status()

            for chunk in response.iter_content(chunk_size=None, decode_unicode=True):
                if chunk:
                    full_answer += chunk
                    placeholder.markdown(full_answer)

    # Save final assistant response
    st.session_state.chat_history.append(
        {"role": "assistant", "content": full_answer}
    )
```

---

## Step 5: Run the Backend App

Start the server with Uvicorn:

```sh
uvicorn app:app --reload --port 8001
```

Once the application starts, open:

- `http://127.0.0.1:8001/`
- `http://127.0.0.1:8001/docs`

The `/docs` endpoint is automatically generated by FastAPI using your Pydantic models. It provides an interactive interface where you can test the API without writing any client code.

![Api docs that was generated by FastAPI. It includes /chat/stream  endpoint and schema](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/5cf32ff0-273c-47cd-80be-ebf807e4443d.png)

You can send requests directly from `curl`. In your terminal, run these commands to invoke the API for the AI agent and check the output:

```sh
curl -X POST http://127.0.0.1:8001/chat/stream \
-H "Content-Type: application/json" \
-d '{"message":"What time is it?","user_id":"123e4567-e89b-12d3-a456-426614174000"}'

curl -X POST http://127.0.0.1:8001/chat/stream \
-H "Content-Type: application/json" \
-d '{"message":"How many words are in: LangChain makes tool calling easier","user_id":"123e4567-e89b-12d3-a456-426614174000"}'

curl -X POST "http://127.0.0.1:8001/chat/stream" \
-H "Content-Type: application/json" \
-d '{"message":"What is the capital of France?","user_id":"123e4567-e89b-12d3-a456-426614174000"}'
```

To stop the server, press Ctrl+C in the terminal.

---

## Step 6: Run the Frontend App

In another terminal, go to the project directory:

```sh
source venv/bin/activate
streamlit run streamlit_app.py
```

That opens the frontend in your browser at `http://localhost:8501/`. Try the example prompts like "What is the capital of France". You should see the answer in a chat style interface.

![Streamlit UI provides a simple chat frontend for the local AI agent](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/1030735a-49ed-43e1-995d-07b122c2c965.png)

The UI is calling the FastAPI endpoint and invoking the AI agent. You now have a working end to end application for your local AI agent that you can play with.

To stop the server, press Ctrl+C in the terminal.

---

## Sample Output

The image below show two browser sessions of the app running side by side on the same endpoint. Each session is assigned a unique id, which allows the backend to maintain a separate conversation history for each user.

Even though both users ask the same question, “Who am I?”, the responses are different because each session’s answer is based on its own prior messages.

![Image showing two sessions with the agent and it gives different answers based on the the conversation history](https://cdn.hashnode.com/uploads/covers/684c95e159698b4bf6a0e4be/b97b8efa-6fca-4e80-9c0a-d0d2601fc2b6.png)

---

## What to Improve Before Production

Although this application is fully functional, it's still intentionally minimal. It already supports a reusable FastAPI backend, a Streamlit chat interface, per-user conversation history, and streaming responses.

If you wanted to take it further, the next steps would be adding authentication, persistent storage, structured logging, monitoring, and more robust deployment setup.

It's also worth noting that if your goal is simply to get a polished self-hosted chat UI up and running quickly, you may not need to build the frontend yourself. Projects like [<VPIcon icon="fas fa-globe"/>LibreChat](https://librechat.ai/) and [<VPIcon icon="fas fa-globe"/>Open WebUI](https://docs.openwebui.com/) already provide richer interfaces and broader features out of the box.

This tutorial takes a different approach: instead of adopting a full platform, it shows how to build a lightweight custom stack yourself so you can better understand the architecture and have more control over how the agent is exposed.

---

## Conclusion

In this tutorial, we took a local AI agent, wrapped it in a FastAPI app, and used Streamlit UI on top of it.

This transforms the AI agent from a standalone script into a reusable service. Instead of only working in a terminal, it can now be accessed through a simple HTTP endpoint by other apps, scripts, or internal tools.

By assigning each session a unique id, the service can also maintain separate conversation history for multiple users, making it possible to support a chat-style interface with isolated memory per session.

From here, you can continue extending the same service by adding authentication or production-ready features. Happy tinkering!

::: info About Author

If you enjoyed this tutorial, you can find more of my writing on my [<VPIcon icon="fas fa-globe"/>blog](https://darshshah.org/blog/) (recent posts include system design paper series), my work on my [<VPIcon icon="fas fa-globe"/>personal website](https://darshshah.org/), and updates on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`darshs`)](https://linkedin.com/in/darshs).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Serve a Multi-User AI Agent with FastAPI and Streamlit",
  "desc": "In this tutorial, I’ll show you how to serve a multi-user local AI agent as a REST API using FastAPI, then add a lightweight Streamlit UI on top. Instead of interacting with the agent through a termin",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-serve-a-multi-user-ai-agent-with-fastapi-and-streamlit.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
