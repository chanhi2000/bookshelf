---
lang: en-US
title: "How to Use LangChain and GPT to Analyze Multiple Documents"
description: "Article(s) > How to Use LangChain and GPT to Analyze Multiple Documents"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - LangChain
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
  - ai
  - llm
  - large-language-model
  - langchain
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use LangChain and GPT to Analyze Multiple Documents"
    - property: og:description
      content: "How to Use LangChain and GPT to Analyze Multiple Documents"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-langchain-and-gpt-to-analyze-multiple-documents.html
prev: /programming/py/articles/README.md
date: 2024-11-07
isOriginal: false
author: David Clinton
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730909200914/e75f3725-7453-49c0-b4e9-8b14fbc3b783.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LangChain > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/langchain/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use LangChain and GPT to Analyze Multiple Documents"
  desc="Over the past year or so, the developer universe has exploded with ingenious new tools, applications, and processes for working with large language models and generative AI. One particularly versatile example is the LangChain project. The overall goa..."
  url="https://freecodecamp.org/news/how-to-use-langchain-and-gpt-to-analyze-multiple-documents"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730909200914/e75f3725-7453-49c0-b4e9-8b14fbc3b783.jpeg"/>

Over the past year or so, the developer universe has exploded with ingenious new tools, applications, and processes for working with large language models and generative AI.

One particularly versatile example is [<FontIcon icon="iconfont icon-langchain"/>the LangChain project](https://langchain.com/). The overall goal involves providing easy integrations with various LLM models. But the LangChain ecosystem is also host to a growing number of (sometimes experimental) projects pushing the limits of the humble LLM.

Spend some time browsing [<FontIcon icon="iconfont icon-langchain"/>LangChain’s website](https://langchain.com/) to get a sense of what's possible. You'll see how many tools are designed to help you build more powerful applications.

But you can also use it as an alternative for connecting your favorite AI with the live internet. Specifically, this demo will show you how to use it to programmatically access, summarize, and analyze long and complex online documents.

To make it all happen, you’ll need a Python runtime environment (like Jupyter Lab) and a valid OpenAI API key.

---

## Prepare Your Environment

One popular use for LangChain involves loading multiple PDF files in parallel and asking GPT to analyze and compare their contents.

As you can see for yourself in [<FontIcon icon="iconfont icon-langchain"/>the LangChain documentation,](https://python.langchain.com/docs/integrations/toolkits/document_comparison_toolkit) existing modules can be loaded to permit PDF consumption and natural language parsing. I'm going to walk you through a use-case sample that's loosely based on the example in that documentation. Here's how that begins:

```py
import os
os.environ['OPENAI_API_KEY'] = "sk-xxx"
from pydantic import BaseModel, Field
from langchain.chat_models import ChatOpenAI
from langchain.agents import Tool
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.document_loaders import PyPDFLoader
from langchain.chains import RetrievalQA
```

That code will build your environment and set up the tools necessary for:

- Enabling OpenAI Chat (ChatOpenAI)
- Understanding and processing text (OpenAIEmbeddings, CharacterTextSplitter, FAISS, RetrievalQA)
- Managing an AI agent (Tool)

Next, you'll create and define a `DocumentInput` class and a value called `llm` which sets some familiar GPT parameters that'll both be called later:

```py
class DocumentInput(BaseModel):
    question: str = Field()
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-0613")
```

---

## Load Your Documents

Next, you'll create a couple of arrays. The three `path` variables in the `files` array contain the URLs for recent financial reports issued by three software/IT services companies: Alphabet (Google), Cisco, and IBM.

We're going to have GPT dig into three companies’ data simultaneously, have the AI compare the results, and do it all without having to go to the trouble of downloading PDFs to a local environment.

You can usually find such legal filings in the Investor Relations section of a company's website.

```json
tools = []
files = [
  {
    "name": "alphabet-earnings",
    "path": "https://abc.xyz/investor/static/pdf/2023Q1_alphabet_earnings_release.pdf",
  },
  {
      "name": "Cisco-earnings",
      "path": "https://d18rn0p25nwr6d.cloudfront.net/CIK-0000858877/5b3c172d-f7a3-4ecb-b141-03ff7af7e068.pdf",
  },
  {
      "name": "IBM-earnings",
      "path": "https://www.ibm.com/investor/att/pdf/IBM_Annual_Report_2022.pdf",
  },
]
```

This `for` loop will iterate through each value of the `files` array I just showed you. For each iteration, it'll use `PyPDFLoader` to load the specified PDF file, `loader` and `CharacterTextSplitter` to parse the text, and the remaining tools to organize the data and apply the embeddings. It'll then invoke the `DocumentInput` class we created earlier:

```py
for file in files:
    loader = PyPDFLoader(file["path"])
    pages = loader.load_and_split()
    text_splitter = CharacterTextSplitter(chunk_size=1000, \
        chunk_overlap=0)
    docs = text_splitter.split_documents(pages)
    embeddings = OpenAIEmbeddings()
    retriever = FAISS.from_documents(docs, embeddings).as_retriever()
# Wrap retrievers in a Tool
tools.append(
    Tool(
        args_schema=DocumentInput,
        name=file["name"],
        func=RetrievalQA.from_chain_type(llm=llm, \
            retriever=retriever),
    )
)
```

---

## Prompt Your Model

At this point, we're finally ready to create an agent and feed it our prompt as `input`.

```py
llm = ChatOpenAI(
    temperature=0,
    model="gpt-3.5-turbo-0613",
)
agent = initialize_agent(
    agent=AgentType.OPENAI_FUNCTIONS,
    tools=tools,
    llm=llm,
    verbose=True,
)
    agent({"input": "Based on these SEC filing documents, identify \
        which of these three companies - Alphabet, IBM, and Cisco \
        has the greatest short-term debt levels and which has the \
        highest research and development costs."})
```

The output that I got was short and to the point:

> ‘output’: ‘Based on the SEC filing documents:\\n\\n- The company with the greatest short-term debt levels is IBM, with a short-term debt level of $4,760 million.\\n- The company with the highest research and development costs is Alphabet, with research and development costs of $11,468 million.’

---

## Wrapping Up

As you’ve seen, LangChain lets you integrate multiple tools into generative AI operations, enabling multi-layered programmatic access to the live internet and more sophisticated LLM prompts.

With these tools, you’ll be able to automate applying the power of AI engines to real-world data assets in real time. Try it out for yourself.

::: note

This article is excerpted from [<FontIcon icon="fa-brands fa-amazon"/>my Manning book, The Complete Obsolete Guide to Generative AI](https://amazon.com/dp/1633436985). But you can find plenty more technology goodness at [<FontIcon icon="fas fa-globe"/>my website](https://bootstrap-it.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use LangChain and GPT to Analyze Multiple Documents",
  "desc": "Over the past year or so, the developer universe has exploded with ingenious new tools, applications, and processes for working with large language models and generative AI. One particularly versatile example is the LangChain project. The overall goa...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-langchain-and-gpt-to-analyze-multiple-documents.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
