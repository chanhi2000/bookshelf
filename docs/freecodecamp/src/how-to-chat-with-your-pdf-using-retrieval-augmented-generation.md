---
lang: en-US
title: "How to Chat with Your PDF Using Retrieval Augmented Generation"
description: "Article(s) > How to Chat with Your PDF Using Retrieval Augmented Generation"
icon: fa-brands fa-react
category:
  - AI
  - LLM
  - LangChain
  - Python
  - FastAPI
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - langchain
  - py
  - python
  - fastapi
  - py-fastapi
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Chat with Your PDF Using Retrieval Augmented Generation"
    - property: og:description
      content: "How to Chat with Your PDF Using Retrieval Augmented Generation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-chat-with-your-pdf-using-retrieval-augmented-generation.html
prev: /ai/langchain/articles/README.md
date: 2026-01-27
isOriginal: false
author:
  - name: Manish Shivanandhan
    url: https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769480850138/b28bc1fd-d035-4825-a6ea-11ccd084db89.png
---

# {{ $frontmatter.title }} 관련

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
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Chat with Your PDF Using Retrieval Augmented Generation"
  desc="Large language models are good at answering questions, but they have one big limitation: they don’t know what is inside your private documents.  If you upload a PDF like a company policy, research paper, or contract, the model cannot magically read i..."
  url="https://freecodecamp.org/news/how-to-chat-with-your-pdf-using-retrieval-augmented-generation"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769480850138/b28bc1fd-d035-4825-a6ea-11ccd084db89.png"/>

Large language models are good at answering questions, but they have one big limitation: they don’t know what is inside your private documents.

If you upload a PDF like a company policy, research paper, or contract, the model cannot magically read it unless you give it that content.

This is where [**Retrieval Augmented Generation**](/freecodecamp.org/mastering-rag-from-scratch.md), or RAG, becomes useful.

RAG lets you combine a language model with your own data. Instead of asking the model to guess, you first retrieve the right parts of the document and then ask the model to answer using that information.

In this article, you will learn how to chat with your own PDF using RAG. You will build the backend using LangChain and create a simple React user interface to ask questions and see answers.

You should be comfortable with basic Python and JavaScript, and have a working knowledge of React and REST APIs. Familiarity with language models and a basic [**understanding of embeddings**](/freecodecamp.org/how-ai-agents-remember-things-vector-stores-in-llm-memory.md) or vector search will be helpful but not mandatory.

---

## What Problem Are We Solving?

Imagine you have a long PDF with hundreds of pages. Searching manually is slow. Copying text into ChatGPT is not practical.

You want to ask simple questions like “What is the leave policy?” or “What does this contract say about termination?”

A normal language model cannot answer these questions correctly because it has never seen your PDF. RAG solves this by adding a retrieval step before generation.

The system first finds relevant parts of the PDF and then uses those parts as context for the answer.

---

## What Is Retrieval Augmented Generation?

[<VPIcon icon="fas fa-globe"/>Retrieval Augmented Generation](https://turingtalks.ai/p/fine-tuning-or-rag-choosing-the-right-approach-to-train-llms-on-your-data) is a pattern with three main steps.

First, your document is split into small chunks. Each chunk is converted into a vector embedding. These embeddings are stored in a vector database.

Second, when a user asks a question, that question is also converted into an embedding. The system searches the vector database to find the most similar chunks.

Third, those chunks are sent to the language model along with the question. The model uses only that context to generate an answer.

This approach keeps answers grounded in your document and reduces hallucinations.

The system has four main parts:

- A PDF loader reads the document.
- A text splitter breaks it into chunks.
- An embedding model converts text into vectors and stores them in a vector store.
- A language model answers questions using retrieved chunks.

The frontend is a simple chat interface built in React. It sends the user’s question to a backend API and displays the response.

This type of custom [<VPIcon icon="fas fa-globe"/>RAG development](https://leanware.co/insights/rag-development-services) helps companies build internal tools that work with their own private data instead of sending it to large language models.

---

## Setting Up the Backend with LangChain

We’ll use Python and LangChain for the backend. The backend will load the PDF, build the vector store, and expose an API to answer questions.

### Installing Dependencies

Start by installing the required libraries.

```sh
pip install langchain langchain-community langchain-openai faiss-cpu pypdf fastapi uvicorn
```

This setup uses FAISS as a local vector store and OpenAI for embeddings and chat. You can swap these later for other models.

### Loading and Splitting the PDF

The first step is to load the PDF and split it into chunks that are small enough for embeddings.

```py
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

loader = PyPDFLoader("document.pdf")
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(documents)
```

Chunking is important. If chunks are too large, embeddings become less accurate. If they are too small, context is lost.

### Creating Embeddings and Vector Store

Next, convert the chunks into embeddings and store them in FAISS.

```py
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(chunks, embeddings)
```

This step is usually done once. In a real app, you would persist the vector store to disk.

### Creating the Retrieval Chain

Now create a retrieval-based question answering chain.

```py
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

llm = ChatOpenAI(
    temperature=0,
    model="gpt-4o-mini"
)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 4}),
    return_source_documents=False
)
```

The retriever finds the top matching chunks. The language model answers using only those chunks.

### Exposing an API with FastAPI

Now wrap this logic in an API so the React app can use it.

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
class QuestionRequest(BaseModel):
    question: str
@app.post("/ask")
def ask_question(req: QuestionRequest):
    result = qa_chain.run(req.question)
    return {"answer": result}
```

Run the server using this command:

```sh
uvicorn main:app --reload
```

Your backend is now ready.

### Building a Simple React Chat UI

Next, build a simple React interface that sends questions to the backend and shows answers.

You can use any React setup. A simple Vite or Create React App project works fine.

Inside your main component, manage the question input and answer state.

```jsx
import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const askQuestion = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Chat with your PDF</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
        placeholder="Ask a question about the PDF"
      />
      <button onClick={askQuestion} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>
      <div style={{ marginTop: "1rem" }}>
        <strong>Answer</strong>
        <p>{answer}</p>
      </div>
    </div>
  );
}
export default App;
```

This UI is simple but effective. It lets users type a question, sends it to the backend, and shows the answer. Make sure to use the latest version of React to avoid the growing [<VPIcon icon="fa-brands fa-react"/>React vulnerabilities](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components).

---

## How the Full Flow Works

When the app starts, the backend has already processed the PDF and built the vector store. When a user types a question, the React app sends it to the API.

The backend converts the question into an embedding. It searches the vector store for similar chunks. Those chunks are passed to the language model as context. The model generates an answer based only on that context.

The answer is sent back to the frontend and displayed to the user.

---

## Why This Approach Works Well

RAG works well because it keeps answers grounded in real data. The model is not guessing – it’s reading from your document.

This approach also scales well. You can add more PDFs, reindex them, and reuse the same chat interface. You can also swap FAISS for a hosted vector database if needed.

Another benefit is control. You decide what data the model can see. This is important for private or sensitive documents.

---

## Common Improvements You Can Add

You can improve this setup in many ways. You can persist the vector store so it doesn’t rebuild on every restart. You can also add document citations to the answer. And you can stream responses for a better chat experience.

You can also add authentication, upload new PDFs from the UI, or support multiple documents per user.

---

## Final Thoughts

Chatting with PDFs using Retrieval Augmented Generation is one of the most practical uses of language models today. It turns static documents into interactive knowledge sources.

With LangChain handling retrieval and a simple React UI for interaction, you can build a useful system with very little code. The same pattern can be used for HR policies, legal documents, technical manuals, or research papers.

Once you understand this flow, you can adapt it to many real world problems where answers must come from trusted documents rather than from the model’s memory alone.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Chat with Your PDF Using Retrieval Augmented Generation",
  "desc": "Large language models are good at answering questions, but they have one big limitation: they don’t know what is inside your private documents.  If you upload a PDF like a company policy, research paper, or contract, the model cannot magically read i...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-chat-with-your-pdf-using-retrieval-augmented-generation.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
