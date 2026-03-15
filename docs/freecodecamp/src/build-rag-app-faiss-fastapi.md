---
lang: en-US
title: "How to Ship a Production-Ready RAG App with FAISS (Guardrails, Evals, and Fallbacks)"
description: "Article(s) > How to Ship a Production-Ready RAG App with FAISS (Guardrails, Evals, and Fallbacks)"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - NumPy
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
  - numpy
  - py-numpy
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Ship a Production-Ready RAG App with FAISS (Guardrails, Evals, and Fallbacks)"
    - property: og:description
      content: "How to Ship a Production-Ready RAG App with FAISS (Guardrails, Evals, and Fallbacks)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-rag-app-faiss-fastapi.html
prev: /programming/py-fastapi/articles/README.md
date: 2026-03-17
isOriginal: false
author:
  - name: Chidozie Managwu
    url: https://freecodecamp.org/news/author/Doxzy/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f9da3ad9-e285-4ce1-acb7-ad119579971c.png
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
  "title": "NumPy > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-numpy/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Ship a Production-Ready RAG App with FAISS (Guardrails, Evals, and Fallbacks)"
  desc="Most LLM applications look great in a high-fidelity demo. Then they hit the hands of real users and start failing in very predictable yet damaging ways. They answer questions they should not, they bre"
  url="https://freecodecamp.org/news/build-rag-app-faiss-fastapi"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f9da3ad9-e285-4ce1-acb7-ad119579971c.png"/>

Most LLM applications look great in a high-fidelity demo. Then they hit the hands of real users and start failing in very predictable yet damaging ways.

They answer questions they should not, they break when document retrieval is weak, they time out due to network latency, and nobody can tell exactly what happened because there are no logs and no tests.

In this tutorial, you’ll build a beginner-friendly Retrieval Augmented Generation (RAG) application designed to survive production realities. This isn’t just a script that calls an API. It’s a system featuring a FastAPI backend, a persisted FAISS vector store, and essential safety guardrails (including a retrieval gate and fallbacks).

---

## Why RAG Alone Does Not Equal Production-Ready

Retrieval Augmented Generation (RAG) is often hailed as the hallucination killer. By grounding the model in retrieved text, we provide it with the facts it needs to be accurate. But simply connecting a vector database to an LLM isn’t enough for a production environment.

Production issues usually arise from the silent failures in the system surrounding the model:

- **Weak retrieval**: If the app retrieves irrelevant chunks of text, the model tries to bridge the gap by inventing an answer anyway. Without a designated “I do not know” path, the model is essentially forced to hallucinate.
- **Lack of visibility**: Without structured outputs and basic logging, you can’t tell if bad retrieval, a confusing prompt, or a model update caused a wrong answer.
- **Fragility**: A simple API timeout or malformed provider response becomes a user-facing outage if you don’t implement fallbacks.
- **No regression testing**: In traditional software, we have unit tests. In AI, we need evals. Without them, a small tweak to your prompt might fix one issue but break ten others without you realising it.

We’ll solve each of these issues systematically in this guide.

::: note Prerequisites

This tutorial is beginner-friendly, but it assumes you have a few basics in place so you can focus on building a robust RAG system instead of getting stuck on setup issues.

**Knowledge**

You should be comfortable with:

- **Python fundamentals** (functions, modules, virtual environments)
- **Basic HTTP + JSON** (requests, response payloads)
- **APIs with FastAPI** (what an endpoint is and how to run a server)
- **High-level LLM concepts** (prompting, temperature, structured outputs)

**Tools + Accounts**

You’ll need:

- **Python 3.10+**
- A working **OpenAI-compatible API key** (OpenAI or any provider that supports the same request/response shape)
- A local environment where you can run a FastAPI app (Mac/Linux/Windows)

**What This Tutorial Covers (and What It Doesn’t)**

We’ll build a production-minded baseline:

- A **FAISS-backed retriever** with a persisted index + metadata
- A **retrieval gate** to prevent “forced hallucination”
- **Structured JSON outputs** so your backend is stable
- **Fallback behavior** for timeouts and provider errors
- A small **eval harness** to prevent regressions

We won’t implement advanced upgrades such as rerankers, semantic chunking, auth, background jobs beyond a roadmap at the end.

:::

---

## The Architecture You Are Building

The flow of our application follows a disciplined path so every answer is grounded in evidence:

1. **User query**: The user submits a question via a FastAPI endpoint.
2. **Retrieval**: The system embeds the question and retrieves the top-k most similar document chunks.
3. **The retrieval gate**: We evaluate the similarity score. If the context is not relevant enough, we stop immediately and refuse the query.
4. **Augmentation and generation**: If the gate passes, we send a context-augmented prompt to the LLM.
5. **Structured response**: The model returns a JSON object containing the answer, sources used, and a confidence level.

---

## Project Setup and Structure

To keep things organized and maintainable, we’ll use a modular structure. This allows you to swap out your LLM provider or your vector database without rewriting your entire core application.

### Project Structure

```sh title="file structure"
.
├── app.py              # FastAPI entry point and API logic
├── rag.py              # FAISS index, persistence, and document retrieval
├── llm.py              # LLM API interface and JSON parsing
├── prompts.py          # Centralized prompt templates
├── data/               # Source .txt documents
├── index/              # Persisted FAISS index and metadata
└── evals/              # Evaluation dataset and runner script
    ├── eval_set.json
    └── run_evals.py
```

### Install Dependencies

First, create a virtual environment to isolate your project:

```sh
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install fastapi uvicorn faiss-cpu numpy pydantic requests python-dotenv
```

### Configure the Environment

Create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file in the root directory. We are targeting OpenAI-compatible providers:

```sh title=".env"
OPENAI_API_KEY=your_actual_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

Important note on compatibility: The code below assumes an OpenAI-style API. If you use a provider that is not compatible, you must change the URL, headers (for example `X-API-Key`), and the way you extract embeddings and final message content in `embed_texts()` and `call_llm()`.

---

## How to Build the RAG Layer with FAISS

In <VPIcon icon="fa-brands fa-python"/>`rag.py`, we handle the “Retriever” part of RAG. This involves turning raw text into mathematical vectors that the computer can compare.

### What is FAISS (and What Does It Do)?

**FAISS** (Facebook AI Similarity Search) is a fast library for vector similarity search. In a RAG system, each chunk of text becomes an embedding vector (a list of floats). FAISS stores those vectors in an index so you can quickly ask:

> “Given this question embedding, which document chunks are closest to it?”

In this tutorial, we use `IndexFlatIP` inner product and normalise vectors with `faiss.normalize_L2(...)`. With normalised vectors, the inner product behaves like **cosine similarity**, giving us a stable score we can use for a retrieval gate.

### Chunking Strategy With Overlap

We’ll use chunking with overlap. If we split a document at exactly 1,000 characters, we might cut a sentence in half, losing its meaning. By using an overlap, for example, 200 characters, we ensure that the end of one chunk and the beginning of the next share context.

### Implementation of <VPIcon icon="fa-brands fa-python"/>`rag.py`

```py :collapsed-lines title="rag.py"
import os
import faiss
import numpy as np
import requests
import json
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()

INDEX_PATH = "index/faiss.index"
META_PATH = "index/meta.json"

def chunk_text(text: str, size: int = 1000, overlap: int = 200) -> List[str]:
    chunks = []
    step = max(1, size - overlap)
    for i in range(0, len(text), step):
        chunk = text[i : i + size].strip()
        if chunk:
            chunks.append(chunk)
    return chunks

def embed_texts(texts: List[str]) -> np.ndarray:
    # Note: If your provider is not OpenAI-compatible, change this URL and headers
    url = f"{os.getenv('OPENAI_BASE_URL')}/embeddings"
    headers = {"Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}"}
    payload = {"input": texts, "model": "text-embedding-3-small"}

    resp = requests.post(url, headers=headers, json=payload, timeout=30)
    resp.raise_for_status()
    # If your provider uses a different response format, change the line below
    vectors = np.array([item["embedding"] for item in resp.json()["data"]], dtype="float32")
    return vectors

def build_index() -> None:
    all_chunks: List[str] = []
    metadata: List[Dict] = []

    if not os.path.exists("data"):
        os.makedirs("data")
        return

    for file in os.listdir("data"):
        if not file.endswith(".txt"):
            continue

        with open(f"data/{file}", "r", encoding="utf-8") as f:
            text = f.read()

        chunks = chunk_text(text)
        all_chunks.extend(chunks)
        for c in chunks:
            metadata.append({"source": file, "text": c})

    if not all_chunks:
        return

    embeddings = embed_texts(all_chunks)
    faiss.normalize_L2(embeddings)

    dim = embeddings.shape[1]
    index = faiss.IndexFlatIP(dim)
    index.add(embeddings)

    os.makedirs("index", exist_ok=True)
    faiss.write_index(index, INDEX_PATH)

    with open(META_PATH, "w", encoding="utf-8") as f:
        json.dump(metadata, f, ensure_ascii=False)

def load_index():
    if not (os.path.exists(INDEX_PATH) and os.path.exists(META_PATH)):
        raise FileNotFoundError(
            "FAISS index not found. Add .txt files to data/ and run build_index()."
        )

    index = faiss.read_index(INDEX_PATH)
    with open(META_PATH, "r", encoding="utf-8") as f:
        metadata = json.load(f)
    return index, metadata

def retrieve(query: str, k: int = 5) -> List[Dict]:
    index, metadata = load_index()

    q_emb = embed_texts([query])
    faiss.normalize_L2(q_emb)

    scores, ids = index.search(q_emb, k)
    results = []
    for score, idx in zip(scores[0], ids[0]):
        if idx == -1:
            continue
        m = metadata[idx]
        results.append(
            {"score": float(score), "source": m["source"], "text": m["text"], "id": int(idx)}
        )
    return results
```

---

## How to Add the LLM Call with Structured Output

A major failure point in AI apps is the “chatty” nature of LLMs. If your backend expects a list of sources but the LLM returns conversational filler, your code will crash.

We solve this with **structured output**: instruct the model to return a strict JSON object, then parse it safely.

### Implementation of <VPIcon icon="fa-brands fa-python"/>`llm.py`

```py title="llm.py"
import json
import requests
import os
from typing import Dict, Any

def call_llm(system_prompt: str, user_prompt: str) -> Dict[str, Any]:
    # Note: Change URL/Headers if using a non-OpenAI compatible provider
    url = f"{os.getenv('OPENAI_BASE_URL')}/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": os.getenv("OPENAI_MODEL"),
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0,
    }

    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=30)
        resp.raise_for_status()
        content = resp.json()["choices"][0]["message"]["content"]

        parsed = json.loads(content)
        parsed.setdefault("answer", "")
        parsed.setdefault("refusal", False)
        parsed.setdefault("confidence", "medium")
        parsed.setdefault("sources", [])
        return parsed

    except (requests.Timeout, requests.ConnectionError):
        return {
            "answer": "The system is temporarily unavailable (network issue). Please try again.",
            "refusal": True,
            "confidence": "low",
            "sources": [],
            "error_type": "network_error",
        }
    except Exception:
        return {
            "answer": "A system error occurred while generating the answer.",
            "refusal": True,
            "confidence": "low",
            "sources": [],
            "error_type": "unknown_error",
        }
```

---

## How to Add Guardrails: Retrieval Gate and Fallbacks

Guardrails are interceptors. They sit between the user and the model to prevent predictable failures.

### The Retrieval Gate: How It Works and How to Add It

In a standard RAG pipeline, the system always calls the LLM. If the user asks an irrelevant question, the retriever will still return the “closest” (but wrong) chunks.

The solution is the retrieval gate:

1. Retrieve top-k chunks and get the **top similarity score**
2. If the score is below a threshold (for example `0.30`), refuse immediately
3. Only call the LLM when retrieval is strong enough to ground the answer

A threshold of `0.30` is a reasonable starting point when using normalised cosine similarity, but you should tune it using evals (next section).

### Fallbacks and Why They Matter

Fallbacks ensure that if an API fails or times out, the user gets a helpful message instead of a crash. They also keep your API response shape consistent, which prevents frontend errors and makes logging meaningful.

In this tutorial, fallbacks are implemented inside `call_llm()` so your FastAPI layer stays simple.

---

## FastAPI App: Creating the /answer Endpoint

The <VPIcon icon="fa-brands fa-python"/>`app.py` file is the conductor. It ties retrieval, guardrails, prompting, and generation together.

### Implementation of <VPIcon icon="fa-brands fa-python"/>`app.py`

```py :collapsed-lines title="app.py"
from fastapi import FastAPI
from pydantic import BaseModel
from rag import retrieve
from llm import call_llm
import prompts
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("rag_app")

app = FastAPI(title="Production-Ready RAG")

class QueryRequest(BaseModel):
    question: str

@app.post("/answer")
async def get_answer(req: QueryRequest):
    start_time = time.time()
    question = (req.question or "").strip()

    if not question:
        return {
            "answer": "Please provide a non-empty question.",
            "refusal": True,
            "confidence": "low",
            "sources": [],
            "latency_sec": round(time.time() - start_time, 2),
        }

    # 1) Retrieval
    results = retrieve(question, k=5)
    top_score = results[0]["score"] if results else 0.0

    logger.info("query=%r top_score=%.3f num_results=%d", question, top_score, len(results))

    # 2) Retrieval Gate (Guardrail)
    if top_score < 0.30:
        return {
            "answer": "I do not have documents to answer that question.",
            "refusal": True,
            "confidence": "low",
            "sources": [],
            "latency_sec": round(time.time() - start_time, 2),
            "retrieval": {"top_score": top_score, "k": 5},
        }

    # 3) Augment
    context_text = "\n\n".join([f"Source {r['source']}: {r['text']}" for r in results])
    user_prompt = f"Context:\n{context_text}\n\nQuestion: {question}"

    # 4) Generation with Fallback
    response = call_llm(prompts.SYSTEM_PROMPT, user_prompt)

    # 5) Attach debug metadata
    response["latency_sec"] = round(time.time() - start_time, 2)
    response["retrieval"] = {"top_score": top_score, "k": 5}
    return response
```

---

## Centralized Prompt – Template: prompts.py

A small but important habit: keep prompts centralised so they’re versionable and easy to evaluate.

### Example <VPIcon icon="fa-brands fa-python"/>`prompts.py`

```py
SYSTEM_PROMPT = """You are a RAG assistant. Use ONLY the provided Context to answer.
If the context does not contain the answer, respond with refusal=true.

Return a valid JSON object with exactly these keys:
- answer: string
- refusal: boolean
- confidence: "low" | "medium" | "high"
- sources: array of strings (source filenames you used)

Do not include any extra keys. Do not include markdown. Do not include commentary."""
```

---

## How to Add Beginner-Friendly Evals

In AI systems, outputs are probabilistic. This makes testing harder than traditional software. Evals (evaluations) are a set of “golden questions” and “expected behaviours” you run repeatedly to detect regressions.

Instead of “does it output exactly this string,” you test:

- Should the app **refuse** when the retrieval is weak?
- When it answers, does it include **sources**?
- Is the behaviour stable across prompt tweaks and model changes?

### Step 1: Create <VPIcon icon="fas fa-folder-open"/>`evals/`<VPIcon icon="fa-brands fa-json"/>`eval_set.json`

This should contain both positive and negative cases.

```json title="evals/eval_set.json"
[
  {
    "id": "in_scope_01",
    "question": "What is a retrieval gate and why is it important?",
    "expect_refusal": false,
    "notes": "Should explain gating and relate it to hallucination prevention."
  },
  {
    "id": "out_of_scope_01",
    "question": "What is the capital of France?",
    "expect_refusal": true,
    "notes": "If the knowledge base only includes our docs, the app should refuse."
  },
  {
    "id": "edge_01",
    "question": "",
    "expect_refusal": true,
    "notes": "Empty input should not call the LLM."
  }
]
```

### Step 2: Create <VPIcon icon="fas fa-folder-open"/>`evals/`<VPIcon icon="fa-brands fa-python"/>`run_evals.py`

This runner calls your API endpoint (end-to-end) and checks expected behaviours.

```py title="evals/run_evals.py"
import json
import requests

API_URL = "http://127.0.0.1:8000/answer"

def run():
    with open("evals/eval_set.json", "r", encoding="utf-8") as f:
        cases = json.load(f)

    passed = 0
    failed = 0

    for case in cases:
        resp = requests.post(API_URL, json={"question": case["question"]}, timeout=60)
        resp.raise_for_status()
        out = resp.json()

        got_refusal = bool(out.get("refusal", False))
        expect_refusal = bool(case["expect_refusal"])

        ok = (got_refusal == expect_refusal)

        # Beginner-friendly: if it answers, sources should exist and be a list
        if not got_refusal:
            ok = ok and isinstance(out.get("sources"), list)

        if ok:
            passed += 1
            print(f"PASS {case['id']}")
        else:
            failed += 1
            print(f"FAIL {case['id']} expected_refusal={expect_refusal} got_refusal={got_refusal}")
            print("Output:", json.dumps(out, indent=2))

    print(f"\nDone. Passed={passed} Failed={failed}")
    if failed:
        raise SystemExit(1)

if __name__ == "__main__":
    run()
```

### How to Use Evals in Practice

Run your server:

```sh
uvicorn app:app --reload
```

In another terminal, run evals:

```sh
python evals/run_evals.py
```

If an eval fails, you have a concrete signal that something changed in retrieval, gating, prompting, or provider behaviour.

---

## What to Improve Next: Realistic Upgrades

Building a reliable RAG app is iterative. Here are realistic next steps:

- **Semantic chunking**: Break text based on meaning instead of character count.
- **Reranking**: Use a cross-encoder reranker to reorder the top-k chunks for higher precision.
- **Metadata filtering**: Filter results by category, date, or department to reduce false positives.
- **Better citations**: Store chunk IDs and show exactly which chunk(s) the answer came from.
- **Observability**: Add request IDs, structured logs, and traces so “what happened?” is answerable.
- **Async + background indexing**: Move index building to a background job and keep the API responsive.

---

## Final Thoughts: Production-Ready Is a Set of Habits

Building an AI application that survives in the real world is about building a system that is predictable, measurable, and safe.

- **Retrieval quality is measurable**: Use similarity scores to gate your LLM.
- **Refusal is a feature**: It is better to say “I do not know” than to lie.
- **Fallbacks are mandatory**: Design for the moment the API goes down.
- **Evals prevent regressions**: Never deploy a change without running your tests.

::: info About Me

I am Chidozie Managwu, an award-winning AI Product Architect and founder focused on helping global tech talent build real, production-ready skills. I contribute to global AI initiatives as a GAFAI Delegate and lead AI Titans Network, a community for developers learning how to ship AI products.

My work has been recognized with the Global Tech Hero award and featured on platforms like HackerNoon.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Ship a Production-Ready RAG App with FAISS (Guardrails, Evals, and Fallbacks)",
  "desc": "Most LLM applications look great in a high-fidelity demo. Then they hit the hands of real users and start failing in very predictable yet damaging ways. They answer questions they should not, they bre",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-rag-app-faiss-fastapi.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
