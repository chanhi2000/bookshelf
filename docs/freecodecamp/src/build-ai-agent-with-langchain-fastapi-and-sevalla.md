---
lang: en-US
title: "How to Build and Deploy an AI Agent with LangChain, FastAPI, and Sevalla"
description: "Article(s) > How to Build and Deploy an AI Agent with LangChain, FastAPI, and Sevalla"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - AI
  - LLM
  - LangChain
  - DevOps
  - Sevalla
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - langchain
  - devops
  - sevalla
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build and Deploy an AI Agent with LangChain, FastAPI, and Sevalla"
    - property: og:description
      content: "How to Build and Deploy an AI Agent with LangChain, FastAPI, and Sevalla"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-ai-agent-with-langchain-fastapi-and-sevalla.html
prev: /programming/py-fastapi/articles/README.md
date: 2026-01-09
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1767915474046/728b3bd5-2dfe-45a3-a2a9-c682e4719d7d.png
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
  "title": "LangChain > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langchain/articles/README.md",
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
  name="How to Build and Deploy an AI Agent with LangChain, FastAPI, and Sevalla"
  desc="Artificial intelligence is changing how we build software. Just a few years ago, writing code that could talk, decide, or use external data felt hard. Today, thanks to new tools, developers can build smart agents that read messages, reason about them..."
  url="https://freecodecamp.org/news/build-ai-agent-with-langchain-fastapi-and-sevalla"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1767915474046/728b3bd5-2dfe-45a3-a2a9-c682e4719d7d.png"/>

Artificial intelligence is changing how we build software. Just a few years ago, writing code that could talk, decide, or use external data felt hard.

Today, thanks to new tools, developers can build smart agents that read messages, reason about them, and call functions on their own.

One such platform that makes this easy is [LangChain (<VPIcon icon="iconfont icon-github" />`langchain-ai/langchain`)](https://github.com/langchain-ai/langchain). With LangChain, you can link language models, tools, and apps together. You can also wrap your agent inside a FastAPI server, then push it to a cloud platform for deployment.

This article will walk you through building your first AI agent. You will learn what LangChain is, how to build an agent, how to serve it through FastAPI, and how to deploy it on Sevalla.

---

## What is LangChain?

LangChain is a framework for working with large language models. It helps you build apps that think, reason, and act.

![Langchain](https://cdn.hashnode.com/res/hashnode/image/upload/v1767629343581/a7f55a7e-f9fa-4d34-9ce5-666adf9cb93d.jpeg)

A model on its own only gives text replies, but LangChain lets it do more. It lets a model call functions, use tools, connect with databases, and follow workflows.

Think of LangChain as a bridge. On one side is the language model. On the other side are your tools, data sources, and business logic. LangChain tells the model what tools exist, when to use them, and how to reply. This makes it ideal for building agents that answer questions, automate tasks, or handle complex flows.

Many developers use LangChain because it is flexible. It supports many AI models. It fits well with Python.

Langchain also makes it easier to move from prototype to production. Once you learn how to create an agent, you can reuse the pattern for more advanced use cases.

I have recently published a detailed [<VPIcon icon="fas fa-globe"/>langchain tutorial](https://turingtalks.ai/p/langchain-tutorial) here.

---

## How to Build Your First Agent with LangChain

Let’s make our first agent. It will respond to user questions and [call a tool](https://freecodecamp.org/news/how-to-build-your-first-mcp-server-using-fastmcp/) when needed.

We’ll give it a simple weather tool, then ask it about the weather in a city. Before this, create a file called <VPIcon icon="iconfont icon-doitenv" />`.env` and add your OpenAI api key. Langchain will automatically use it when making requests to OpenAI.

```sh title=".env"
OPENAI_API_KEY=<key>
```

Here is the code for our agent:

```py
from langchain.agents import create_agent
from dotenv import load_dotenv

# load environment variables
load_dotenv()

# defining the tool that LLM can call
def get_weather(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"

# Creating an agent
agent = create_agent(
    model="gpt-4o",
    tools=[get_weather],
    system_prompt="You are a helpful assistant",
)

result = agent.invoke({"messages":[{"role":"user","content":"What is the weather in san francisco?"}]})
```

This small program shows the power of LangChain agents.

First, we import `create_agent`, which helps us build the agent. Then we write a function called `get_weather`. It takes a city name and returns a friendly sentence.

The function acts as our tool. A tool is something the agent can use. In real projects, tools might fetch prices, store notes, or call APIs.

Next, we call `create_agent`. We give it three things. We pass the model we want to use. We list the tools we want it to call. And we give a system prompt. The system prompt tells the agent who it is and how it should behave.

Finally, we run the agent. We call `invoke` with a message.

The user asks for the weather in San Francisco. The agent reads this message. It sees that the question needs the weather function. So it calls our tool `get_weather`, passes the city, and returns an answer.

Even though this example is tiny, it captures the main idea. The agent reads natural language, figures out what tool to use, and sends a reply.

Later, you can add more tools or replace the weather function with one that connects to a real API. But this is enough for us to wrap and deploy.

---

## Wrapping Your Agent with FastAPI

The next step is to serve our agent. [<VPIcon icon="iconfont icon-fastapi"/>FastAPI](https://fastapi.tiangolo.com/) helps us expose our agent through an HTTP endpoint. That way, users and systems can call it through a URL, send messages, and get replies.

To begin, you install FastAPI and write a simple file like `main.py`. Inside it, you import FastAPI, load the agent, and write a route.

When someone posts a question, the API forwards it to the agent and returns the answer. The flow is simple.

The user talks to FastAPI. FastAPI talks to your agent. The agent thinks and replies. Here is the FAST API wrapper for your agent.

```py
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from langchain.agents import create_agent
from dotenv import load_dotenv
import os

load_dotenv()

# defining the tool that LLM can call
def get_weather(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"

# Creating an agent
agent = create_agent(
    model="gpt-4o",
    tools=[get_weather],
    system_prompt="You are a helpful assistant",
)

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "Welcome to your first agent"}

@app.post("/chat")
def chat(request: ChatRequest):
    result = agent.invoke({"messages":[{"role":"user","content":request.message}]})
    return {"reply": result["messages"][-1].content}

def main():
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

if __name__ == "__main__":
    main()
```

Here, FastAPI defines a `/chat` endpoint. When someone sends a message, the server calls our agent. The agent processes it as before. Then FastAPI returns a clean JSON reply. The API layer hides the complexity inside a simple interface.

At this point, you have a working agent server. You can run it on your machine, call it with Postman or cURL, and check responses. When this works, you are ready to deploy.

![Postman Result](https://cdn.hashnode.com/res/hashnode/image/upload/v1767629386493/e5699447-d82e-4c73-87f8-87cec2d7dac2.png)

---

## How to Deploy Your AI Agent to Sevalla

You can choose any cloud provider, like AWS, DigitalOcean, or others to host your agent. I will be using Sevalla for this example.

[<VPIcon icon="iconfont icon-sevalla"/>Sevalla](https://sevalla.com/) is a developer-friendly PaaS provider. It offers application hosting, database, object storage, and static site hosting for your projects.

Every platform will charge you for creating a cloud resource. Sevalla comes with a $50 credit for us to use, so we won’t incur any costs for this example.

Let’s push this project to GitHub so that we can connect our repository to Sevalla. We can also enable auto-deployments so that any new change to the repository is automatically deployed.

You can also [fork my repository (<VPIcon icon="iconfont icon-github" />`manishmshiva/first-agent-with-fastapi`)](https://github.com/manishmshiva/first-agent-with-fastapi) from here.

[<VPIcon icon="iconfont icon-sevalla"/>Log in](https://app.sevalla.com/login) to Sevalla and click on Applications -> Create new application. You can see the option to link your GitHub repository to create a new application

![Create application](https://cdn.hashnode.com/res/hashnode/image/upload/v1767629443568/85e00d7f-c296-4bed-94ba-8e2e5bbdb0ba.png)

Use the default settings. Click “Create application”. Now we have to add our openai api key to the environment variables. Click on the “Environment variables” section once the application is created, and save the `OPENAI_API_KEY` value as an environment variable.

![Sevalla Environment Variables](https://cdn.hashnode.com/res/hashnode/image/upload/v1767629507196/0ae254e2-00f6-46a1-8535-c3af006022c6.png)

Now we are ready to deploy our application. Click on “Deployments” and click “Deploy now”. It will take 2–3 minutes for the deployment to complete.

![Sevalla Deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1767629546289/cbdc2f5d-4902-4799-aed4-2177695748bc.png)

Once done, click on “Visit app”. You will see the application served via a URL ending with `sevalla.app` . This is your new root URL. You can replace `localhost:8000` with this URL and test in Postman.

![Postman Response](https://cdn.hashnode.com/res/hashnode/image/upload/v1767629568646/e849222d-0cb5-433f-a399-0e8a63d891d1.png)

Congrats! Your first AI agent with tool calling is now live. You can extend this by adding more tools and other capabilities, and pushing your code to GitHub, and Sevalla will automatically deploy your application to production.

---

## Conclusion

Building AI agents is no longer a task for experts. With LangChain, you can write a few lines and create reasoning tools that respond to users and call functions on their own.

By wrapping the agent with FastAPI, you give it a doorway that apps and users can access. Finally, Sevalla makes it easy to push your agent live, monitor it, and run it in production.

This journey from agent idea to deployed service shows what modern AI development looks like. You start small. You explore tools. You wrap them and deploy them.

Then you iterate, add more capability, improve logic, and plug in real tools. Before long, you have a smart, living agent online. That is the power of this new wave of technology.

::: info

Hope you enjoyed this article. Signup for my free newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build and Deploy an AI Agent with LangChain, FastAPI, and Sevalla",
  "desc": "Artificial intelligence is changing how we build software. Just a few years ago, writing code that could talk, decide, or use external data felt hard. Today, thanks to new tools, developers can build smart agents that read messages, reason about them...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-ai-agent-with-langchain-fastapi-and-sevalla.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
