---
lang: en-US
title: "RAG Explained Simply with a Real Project"
description: "Article(s) > RAG Explained Simply with a Real Project"
icon: iconfont icon-langchain
category:
  - Python
  - AI
  - LLM
  - Google
  - Google Gemini
  - LangChain
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - gemini
  - google-gemini
  - langchain
head:
  - - meta:
    - property: og:title
      content: "Article(s) > RAG Explained Simply with a Real Project"
    - property: og:description
      content: "RAG Explained Simply with a Real Project"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/rag-explained-simply-with-a-real-project.html
prev: /ai/langchain/articles/README.md
date: 2026-05-29
isOriginal: false
author:
  - name: Ashutosh Krishna
    url: https://freecodecamp.org/news/author/ashutoshkrris/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5dc3370a-a536-43f6-850e-223928f99870.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
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
  name="RAG Explained Simply with a Real Project"
  desc="If you have used ChatGPT, you know how magical it feels. You ask a question, and it instantly generates a highly articulate answer. But you also probably know its biggest flaw. If you ask it about you"
  url="https://freecodecamp.org/news/rag-explained-simply-with-a-real-project"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5dc3370a-a536-43f6-850e-223928f99870.png"/>

If you have used ChatGPT, you know how magical it feels. You ask a question, and it instantly generates a highly articulate answer.

But you also probably know its biggest flaw. If you ask it about your company's internal code, your private Notion workspace, or an event that happened yesterday, it fails.

Usually, it does one of two things. It either apologizes and says it doesn't have access to that information, or worse, it confidently makes something up entirely.

This happens because Large Language Models (LLMs) are like extremely smart students who are locked in a room without internet access. They only know what they memorized before they were locked inside. If you ask them a question outside of their memorized knowledge, they have to guess.

So, how do we fix this? How do we get an AI to answer questions about our private data without retraining the entire model from scratch?

The answer is **RAG**, which stands for Retrieval-Augmented Generation.

RAG is the architecture behind nearly every modern AI application that interacts with private data. If you have ever used a "chat with PDF" app or a customer support bot that actually knows company policies, you have interacted with RAG.

In this article, we'll break down exactly how RAG works from first principles. Then, we'll build a working RAG application from scratch using Python.

---

## What is RAG?

RAG stands for **Retrieval-Augmented Generation**. Let's break down what those three words actually mean.

- **Retrieval:** Finding relevant information from a database.
- **Augmented:** Adding that information to the user's original question.
- **Generation:** Asking the LLM to write an answer using only the added information.

### The Open-Book Test Analogy

To build a mental model, think of a traditional LLM as a student taking a closed-book exam. The student has read billions of books in the past, but right now, they have to answer questions purely from memory. Sometimes they forget facts, and sometimes they make up answers to avoid leaving the page blank. Not gonna lie, I pulled the same move in quite a few university exams.

RAG turns this into an open-book exam.

When you ask a question, the system first runs to a massive library (your database), finds the exact pages that contain the answer, and hands those pages to the student. The student then reads those specific pages and writes a perfect answer.

Instead of relying on the AI's memory, we're only relying on its reading comprehension skills.

---

## Why Traditional LLMs Fail

Before we dive into how to build RAG, we need to understand exactly why prompting an LLM on its own isn't enough.

1. **Training cutoffs:** Training an LLM takes months and costs millions of dollars. Because of this, models are trained on data up to a specific date. If an LLM was trained in 2025, it has absolutely no idea what happened in 2026.2. **No access to private data:** Your company's Jira tickets, internal wikis, and Slack messages are private. OpenAI, Google, and Anthropic don't have them in their training datasets.
3. **Hallucinations:** LLMs are essentially advanced autocomplete engines. They predict the next most likely word based on patterns. If they don't know a fact, they'll string together words that sound highly plausible but may be completely incorrect. We call this hallucinating.
4. **Context window limitations:** You might be thinking, "Why not just copy and paste my entire company wiki into the ChatGPT prompt?" Well, every LLM has a "context window", which is the maximum amount of text it can process at once. Even with modern models that have massive context windows, pasting thousands of documents into a prompt is incredibly slow and expensive. Also, models tend to lose track of information when you overwhelm them with too much text.
5. **The high cost of retraining:** You could theoretically fine-tune an LLM on your private data. But fine-tuning is complicated and expensive. More importantly, knowledge changes constantly. If you update a company policy, you would have to fine-tune the model all over again to teach it the new rule.

RAG solves all of these problems. It gives the LLM access to real-time, private data without needing to retrain the model.

---

## How RAG Works Internally

To make RAG work, we need a specific pipeline of technologies. Let's explore every major concept in the RAG architecture.

### Documents

Everything starts with your raw data. These are your PDFs, database records, text files, or scraped websites. In the AI world, we refer to all of these source materials generally as "documents".

### Chunking

You can't feed a 500-page book into an AI all at once for a simple question. It's inefficient. Instead, we break the documents down into smaller, manageable pieces called "chunks". A chunk might be a single paragraph or a few sentences.

This matters because when a user asks a question, we only want to retrieve the specific paragraphs that contain the answer, not the entire book. If we skipped chunking, the system would retrieve massive walls of text, which would crash the LLM's context window.

### Embeddings

This is the most intimidating term for beginners, but the concept is brilliant. Computers don't understand words, but they're great at math. **Embeddings** are a way to translate human language into lists of numbers (vectors) that capture the actual meaning of the text.

Imagine a 2D map. We can plot the word "Dog" at coordinates [2, 3] and the word "Puppy" at [2.1, 3.1]. Even though they're different words, the computer knows they mean similar things because their coordinates are physically close together on the map. The word "Car" might be way over at [10, 10].

In a real AI system, an embedding model doesn't use just 2 dimensions. It maps sentences across thousands of dimensions to capture deep semantic meaning.

### Vector Databases

Once we convert all of our text chunks into number coordinates (embeddings), we need a place to store them. Traditional SQL databases are great at finding exact keyword matches. But they're terrible at finding "similar meanings".

A **vector database** is specifically designed to store lists of numbers and quickly calculate the distance between them. Popular vector databases include ChromaDB, Pinecone, Weaviate, FAISS, and Milvus.

### Semantic Search and Similarity Matching

When a user types a question into our chatbot, we run the question through the exact same embedding model. The question becomes a list of numbers.

We then ask the vector database to perform a **similarity search**. The database looks at the coordinates of the user's question and finds the stored chunks that are located closest to it in mathematical space. Because distance equals meaning, the closest chunks will contain the most relevant information to answer the question.

### Prompt Augmentation

Now we have the user's original question and the text chunks we retrieved from the database. We "augment" (add to) the prompt. We create a hidden template behind the scenes that looks like this:

> "You are a helpful assistant. Use ONLY the following context to answer the user's question.
> 
> Context:
> 
> [Insert retrieved chunks here]
> 
> Question:
> 
> [Insert user question here]"

### Final LLM Response

We send this giant, augmented prompt to the LLM. The LLM reads the context, processes the question, and generates a factual response based entirely on the provided data.

### Quick Recap

A RAG pipeline usually looks like this:

![RAG Pipeline](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/fa6b3432-bc29-4346-8537-3f5b3861b9d1.png)
<!-- TODO: mermaid화 -->

---

## How to Build a Real RAG Project

Let's build a real-world RAG application. We'll build an AI chatbot that reads and understands a PDF document.

To make this completely free to build, we'll use Python, LangChain (a popular AI framework), Google's Gemini API (which has a generous free tier for developers), and ChromaDB (a local vector database).

Note: We'll be using the free Gemini tier here for illustration purposes so you can learn without spending money. Because LangChain is modular, you can easily swap this out for any other production-grade model later just by changing one line (or a few lines) of code.

### Project Setup

First, open your terminal or command prompt, create a new directory for your project, and navigate into it:

```sh
mkdir my-rag-project
cd my-rag-project
```

Next, it's a best practice to create an isolated **virtual environment**. This ensures that the packages we install for this project don't conflict with other Python projects on your computer.

To create and activate a virtual environment, run the commands for your specific operating system:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
python3 -m venv venv
source venv/bin/activate
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
python -m venv venv
venv\Scripts\activate
```

```sh
python -m venv venv
.\venv\Scripts\Activate.ps1
```

:::

Once activated, you'll see `(venv)` appear at the beginning of your terminal line. Now, go ahead and install the required libraries inside your fresh environment:

```sh
python -m pip install --upgrade pip
pip install langchain langchain-google-genai langchain-community chromadb python-dotenv pypdf
```

You'll also need a Google Gemini API key. You can get one for free from [<VPIcon icon="fa-brands fa-google"/>Google AI Studio](https://aistudio.google.com/app/api-keys).

Instead of running messy terminal configuration commands for different operating systems, create a new file named <VPIcon icon="iconfont icon-dotenv"/>`.env` in the root of your project folder and add your key like this:

```sh title=".env"
GOOGLE_API_KEY=your_actual_api_key_here
```

### Preparing the PDF

Since this is a "Chat with PDF" project, you’ll need a sample PDF document to work with. To keep things simple, download [<VPIcon icon="fa-brands fa-google"/>this ready-made sample document](https://drive.google.com/file/d/1UOUVl2mzc39SEHxpi8hujpueIyhEUPC7/view?usp=sharing) below and place it inside your project folder.

You can then use this PDF throughout the tutorial for testing uploads, parsing, embeddings, and chat functionality.

### Writing the RAG Code Step-by-Step

Create a Python file named <VPIcon icon="fa-brands fa-python"/>`rag_app.py` in your project folder. Instead of copying a massive block of code, we'll build this application block by block so we can understand exactly how data flows through our pipeline.

#### Step 1: Imports and Environment Setup

At the very top of your file, add the necessary library imports and initialize your environment configuration:

```py title="rag_app.py"
import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough

# Load environment variables from the .env file
load_dotenv()
```

We're bringing in LangChain modules to handle loading, splitting, embedding, storing, and prompting. The `load_dotenv()` function is mandatory because it scans our <VPIcon icon="iconfont icon-dotenv"/>`.env` file and loads the `GOOGLE_API_KEY` into our system's background environment variables, ensuring our AI models can authenticate seamlessly without hardcoding passwords.

#### Step 2: Loading the PDF Document

Next, let's point our script to the PDF document we downloaded earlier:

```py
print("Loading PDF document...")
loader = PyPDFLoader("TechCorp_Official_Employee_Handbook.pdf")
document = loader.load()

print(document[0].page_content)
```

Computers can't read a PDF like a standard text file because PDFs contain complex layout streams. `PyPDFLoader` handles the heavy lifting of opening the file, stripping away visual layout formatting, and extracting the raw text characters into a clean format that LangChain can work with.

At this point, when you run the script, you should see the text content from the first page of the PDF printed in the terminal. This is a quick way to verify that the PDF was loaded successfully and that `PyPDFLoader` was able to extract readable text from the document correctly.

#### Step 3: Chunking the Text

Now that the raw text is in memory, we need to chop it up into smaller pieces:

```py
print("Chunking text...")
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = text_splitter.split_documents(document)

print(chunks[0].page_content)
```

If a user asks a simple question, sending an entire 100-page document to the LLM is incredibly slow and expensive. `RecursiveCharacterTextSplitter` cuts the text into segments of roughly 500 characters.

The `chunk_overlap=50` parameter tells the text splitter to repeat the last 50 characters of one chunk at the beginning of the next. This helps preserve context between chunks so that sentences or ideas are not abruptly cut off.

Without overlap, important information near chunk boundaries could be separated, making retrieval less accurate. By maintaining a small shared section between neighboring chunks, the model can better understand continuity in the document, resulting in more reliable search results and higher-quality responses.

When you run the script, you should now see the contents of the first text chunk printed in the terminal.

#### Step 4: Creating Embeddings and Initializing the Vector DB

With our chunks ready, we'll convert them into vector coordinates and save them locally:

```py
print("Creating vector database...")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
vector_db = Chroma.from_documents(
    documents=chunks, 
    embedding=embeddings, 
    persist_directory="./chroma_db"
)
```

This is the mathematical core of RAG. `GoogleGenerativeAIEmbeddings` takes a raw text chunk and turns it into a list of numbers representing its conceptual meaning. We then hand those chunks and numbers to `Chroma`, which maps them into a local database directory named `chroma_db` on your hard drive, allowing for lightning-fast mathematical lookups later.

#### Step 5: Setting Up the Retriever and Prompt Template

Now we need a mechanism to query our database and a structure to house our instructions:

```py
# Configure the database to act as a document retriever
retriever = vector_db.as_retriever(search_kwargs={"k": 2})

# Define the hidden prompt structure for the LLM
template = """
Use the following pieces of retrieved context to answer the question. 
If you don't know the answer, just say that you don't know. 
Use three sentences maximum and keep the answer concise.

Context: {context}

Question: {question}

Answer:
"""
prompt = PromptTemplate.from_template(template)
```

`vector_db.as_retriever()` converts the vector database into a retriever object that can search through stored document embeddings and return the most relevant chunks for a user’s question. Setting `k=2` on our retriever tells the database to only pull the top two most relevant chunks for any given question, which keeps things clean and efficient.

The prompt template acts as hidden instructions for the model. When a user asks a question, LangChain automatically replaces `{context}` with the retrieved document chunks and `{question}` with the user’s actual query. The template also acts as a safety guardrail. By explicitly telling the model to say "I don't know" if the context lacks information, we heavily suppress the model's tendency to hallucinate fake answers.

#### Step 6: Initializing the LLM and Constructing the RAG Chain

Next, we hook up our language model and construct our execution pipeline:

```py
# Initialize the free Gemini model tier
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0)

# Helper function to stitch retrieved chunks into a single text block
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# Connect everything together using LangChain Expression Language (LCEL)
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
)
```

We use `gemini-3.5-flash` with a `temperature=0` setting to force the model to be completely factual and analytical rather than creative.

The retriever returns multiple document chunks as structured objects. The `format_docs` function converts those chunks into a single continuous text block by joining their `page_content`. This step is necessary because the prompt expects a clean, readable context string rather than a list of document objects.

Finally, we connect everything using LangChain Expression Language (LCEL). When a question comes in, it passes it to the retriever, formats the resulting text documents, passes the filled template to the prompt handler, and pushes the final product straight to the LLM.

#### Step 7: Invoking the Chain with a Question

Finally, let's execute the pipeline and print the result out to the console:

```py
user_question = "What days can I work from home?"
print(f"\nQuestion: {user_question}")

response = rag_chain.invoke(user_question)
print(f"Answer: {response.content}")
```

This is where the magic happens. The `invoke` command sets off the entire chain reaction we just built. When you run this, the console will output:

```sh
Loading PDF document...
Chunking text...
Creating vector database...

Question: What days can I work from home?
Answer: [{'type': 'text', 'text': 'You are permitted to work from home on Tuesdays and Thursdays. Additional remote flexibility may also be approved by your department manager.', 'extras': {'signature': 'Eo0JCooJAQw51seue7vZT7Vby90GMDLhtOBWLKm5UjfEro7f8dRoKC0KAIHxSqQSLXq0s3kf6yfzTsgaUMFiNd0fnwtNSNoApzcZ7huRD8iq+f+xomoXGhmFYClnLApHUKtOLykICluJnM1j6DfYGaVHKLqU0MF4+Fng9CdqXVqPgN9HcfJEvSpeMAc9vTYENj07s8N6MidlMvMt1w0fl4GCjxAZXyEngdU4kGfjUqaKyjjCQ9yLFeoXrV55pqZdkElLxXEK4ZWNnMGh5NDqGmt2b0kMG4KoCdunUltBr1ctV15rZ+724T0qnjDvI+pIgp/ZtKa423gaVXSkSmdvSePEog38blJ2dgjtZg72XF5xlh45Yv06fZVu7e60ZB1sTn4W8iWuYGQ61i/xCN6xCX/e3SuitjwQoHSlEe/iuoaNf5BXhdp87TUyQTawiY+qIZjgWz2AMLUbMcOvns/0iFt6jpUkXr/dO4eYF39UCosrbWC5TZQp2gllNQ6mlrczTAKqe8mPZwmBVuTJ3kx3q+SsVROln584EdD94IxXrgLXhuLkbR9ub0qyvjBfAmIfvUEK5pcaBCGydQvheH9wsIvAOG1kspMb/wqjAv/mpmii8J9vztSvM9PR9v7L3YLu8vcANol80w2PfeHhyWUJWit8R58kKd7HHor5GJhA436x+tCukIlBq2oTcob+ydxVJydA12pRsiuw4kYkEIU8nr5yCiIwjYCDtVm6Ws0RUnhyk5u+dRONPZ6g+mfBShKCnahcIMzzJpXznmPXvmP2C96uD64SGTI6L86EMlLEz06/cTJTabgqAYqe2AhERgnYc/4d0XabQOkzvDmBKMr5/LOAt3ZZg7X4PIuefEwxx0eB60gLROefcbbu8k+KPazqFsDP/YA/aPyAxyss/6V43EID0amJcDA81LKJzazL9KnclefQZrN9viIwteMaV04IIlx+Ynk1vZi/LVgWiFuDVWF3Ql2luY4KwFpfFDxQ728gkrhvUdTBrfUeKRSLV1W4ox6I7ogo0e9i7db2lkOQljctGs3Km3hWu4JOkH+YzLNmcDHMF3imfgQH5Ml99H9PXh1ScBjq47MXKzJPdHijkY5ZRSjceEIlKEGv8afQO60NB8lk1MQAGwd+CxqIwVg11N8q9EFSwdJmVVmoyM1nINGJERSKhKOrkqBsOELfpKDjv14tuNgDUy4wdtuxn8C4tJBKvN8t/hrW/Z65VoBGdMwA08sRSV6Fp5l/gSdYeB9yA/Lx/VGkgVqaP5tU73XrE/XO8ysJ/kgRDXiTvsg+2uayU1Q9PfKFAawopslwybCHtdOwaVgsRdA5R4f1NIkPoP/sX+iBxyR0kKg6v4RRAj851WifM2fQ8Vsw5dtFSeh/4TfYg1GCCCDNT4JwrtI8fqcF+qMQqUb+oUqoyzjzFqqSRxXcyqHXOLV9V9C6yWYmZ3TSY043WL9L4kGGJGxFHD5VWG77Quiy+rHWGO13LOc5EBKIO05sg1xnI88QQTUgkxwJeuntytIy3f3pfMVrFYFkvi8w5LzL4RK68+4HMg=='}}]
```

Modern LLMs like Google's Gemini are **multimodal**. This means they're designed to read and generate not just plain text, but images, video, and audio simultaneously. Because of this, the LangChain Google integration doesn't always return a simple text string. Instead, it returns a **list of content blocks**.

In your output, the AI successfully returned your text, but it also included an `extras` dictionary containing a `signature`. This signature is a behind-the-scenes data point used by Google for AI safety tracking, grounding metadata, and thought-process verification.

To get a clean, human-readable string, you simply need to extract the `text` value from that list. You can update your final print statement to check if the response is a list and extract the text automatically:

```py
# Clean up the output if Gemini returns a list of content blocks
if isinstance(response.content, list):
    clean_answer = response.content[0]['text']
else:
    clean_answer = response.content

print(f"Answer: {clean_answer}")
```

Now, your output will look like this:

```sh
Question: What days can I work from home?
Answer: You are permitted to work from home on Tuesdays and Thursdays. Additional remote flexibility may also be approved by your department manager.
```

#### Step 8: Making it Conversational

Right now, our script hardcodes a single question, prints the answer, and immediately exits. In the real world, you want to chat with your documents naturally. Let's upgrade our script to run continuously in your terminal so you can ask as many questions as you want without restarting the program.

Replace the bottom section of your code with a simple `while` loop:

```py
# Chat with your PDF in a continuous loop
print("\n--- PDF Chatbot Initialized ---")
print("Type 'exit' or 'quit' to stop.")

while True:
    # 1. Wait for the user to type a question
    user_question = input("\nYour Question: ")

    # 2. Allow the user to break the loop and close the program
    if user_question.lower() in ['exit', 'quit']:
        print("Shutting down chatbot. Goodbye!")
        break

    # 3. Send the question through our RAG chain
    response = rag_chain.invoke(user_question)

    # 4. Clean up the output format
    if isinstance(response.content, list):
        clean_answer = response.content[0]['text']
    else:
        clean_answer = response.content

    # 5. Print the final answer to the console
    print(f"Answer: {clean_answer}")
```

By using Python's `input()` function wrapped inside an infinite `while True` loop, we keep the Python script alive. The PDF chunks and vector database stay loaded in your computer's memory, allowing you to fire off consecutive questions instantly. This transforms your script from a static demonstration into a fully interactive AI tool!

Here's a sample run:

![Image of sample run](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/987055ad-353d-4bd3-9026-6e4172a0904a.png)

#### Full Code

```py :collapsed-lines
import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough

# Load environment variables from the .env file
load_dotenv()

print("Loading PDF document...")
loader = PyPDFLoader("TechCorp_Official_Employee_Handbook.pdf")
document = loader.load()
# print(document[0].page_content)

print("Chunking text...")
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = text_splitter.split_documents(document)
# print(chunks[0].page_content)

print("Creating vector database...")
embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-001")
vector_db = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

# Configure the database to act as a document retriever
retriever = vector_db.as_retriever(search_kwargs={"k": 2})

# Define the hidden prompt structure for the LLM
template = """
Use the following pieces of retrieved context to answer the question. 
If you don't know the answer, just say that you don't know. 
Use three sentences maximum and keep the answer concise.

Context: {context}

Question: {question}

Answer:
"""
prompt = PromptTemplate.from_template(template)

# Initialize the free Gemini model tier
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash", temperature=0)

# Helper function to stitch retrieved chunks into a single text block
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


# Connect everything together using LangChain Expression Language (LCEL)
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
)
"""
user_question = "What days can I work from home?"
print(f"\nQuestion: {user_question}")

response = rag_chain.invoke(user_question)
# print(f"Answer: {response.content}")

# Clean up the output if Gemini returns a list of content blocks
if isinstance(response.content, list):
    clean_answer = response.content[0]['text']
else:
    clean_answer = response.content

print(f"Answer: {clean_answer}")
"""

# Chat with your PDF in a continuous loop
print("\n--- PDF Chatbot Initialized ---")
print("Type 'exit' or 'quit' to stop.")

while True:
    # 1. Wait for the user to type a question
    user_question = input("\nYour Question: ")

    # 2. Allow the user to break the loop and close the program
    if user_question.lower() in ['exit', 'quit']:
        print("Shutting down chatbot. Goodbye!")
        break

    # 3. Send the question through our RAG chain
    response = rag_chain.invoke(user_question)

    # 4. Clean up the output format
    if isinstance(response.content, list):
        clean_answer = response.content[0]['text']
    else:
        clean_answer = response.content

    # 5. Print the final answer to the console
    print(f"Answer: {clean_answer}")
```

#### Taking it out of the terminal

Once you have your terminal chatbot working, you probably want to give it a proper visual interface. The easiest way to do this in Python is using an open-source library called **Gradio**. [<VPIcon icon="fas fa-globe"/>Gradio](https://blog.ashutoshkrris.in/build-ai-apps-with-gradio-turn-your-python-scripts-into-web-apps) has a built-in `ChatInterface` feature that can wrap your existing RAG code and automatically generate a beautiful, ChatGPT-style web UI in your browser with just three extra lines of code. It's highly recommended as your next mini-project.

---

## The Full Data Flow

To truly solidify your understanding, let's map out the exact lifecycle of a single user question in our system:

![](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/af98284c-39c6-4cc7-bb4f-13955b659048.png)

### Breaking Down the Execution Timeline

1. **The request begins:** The user interfaces with our console and asks a text-based question: "How much vacation do I get?" At this exact moment, our application code takes control of the program flow.
2. **The text-to-vector translation:** Computers can't compute similarity using raw text characters. Our app makes a fast network call to the Google Embedding Model, handing over the raw question. The model converts the text into a massive array of numbers that mathematically represents the user's intent.
3. **The database distance calculation:** Our application script takes those coordinate numbers and passes them directly to ChromaDB. ChromaDB scans the local hard drive, running a similarity math function against the numbers stored for each of our PDF chunks. It locates the text chunk mentioning "20 days of paid time off" because its coordinates are physically closest to the query coordinates.
4. **The prompt augmentation:** ChromaDB hands the raw text strings of those relevant pieces back to our script. The code automatically unrolls our prompt template, plugging the raw chunks into the {context} slot and the user's original text into the {question} slot.
5. **The final generation:** Our application drops this combined package into the final network call, pushing it directly to the Gemini LLM. Because temperature=0 is configured, the model acts strictly as a reading comprehension engine. It reads the custom context, formats a clean sentence, and sends it back to our terminal to be printed out beautifully for the user.

---

## Common RAG Problems

Building a simple RAG app is easy. Building a RAG app that works perfectly in production is very difficult. Here are the most common problems engineers face and how they fix them.

### 1. Bad Chunking

If your chunks are too large, they include irrelevant information that confuses the LLM. If they're too small, they lose vital context. Engineers can solve this by experimenting with different chunk sizes or using semantic chunking (splitting by whole sentences or paragraphs rather than strict character counts).

### 2. Irrelevant Retrieval

Sometimes semantic search fails. If a user searches for "Apple" expecting information about fruit, but the database only has data about the tech company, the system will confidently return tech company documents. Engineers can fix this by adjusting the embedding models or adding keyword search rules.

### 3. Hallucinations

Even with RAG, an LLM might ignore the retrieved context and rely on its training memory. Engineers mitigate this by heavily engineering the prompt template with strict rules like "ONLY use the provided text."

### 4. Latency

RAG requires an embedding network call, a database search, and an LLM network call. This takes time. Engineers can optimize this by using faster, locally hosted embedding models or caching common questions.

### 5. Stale Data

If HR updates the company policy PDF, the vector database still holds the old numbers. The AI will give outdated answers. Engineers build update pipelines that automatically delete old vectors and embed new ones whenever a source file changes.

---

## Advanced RAG Concepts

Once you master basic RAG, the AI engineering world opens up to highly advanced techniques.

### Hybrid Search

Vector databases are great at understanding meaning, but bad at finding exact ID numbers or specific names. Hybrid search combines traditional keyword search (like searching a SQL database) with semantic vector search to get the best of both worlds.

### Reranking

Sometimes the vector database returns 10 chunks, but the best answer is accidentally placed at the bottom of the list. Reranking uses a second, specialized AI model to read the retrieved chunks and sort them strictly by relevance before sending them to the LLM.

### Agentic RAG

Instead of forcing the system to retrieve documents every single time, Agentic RAG uses an AI "Agent" to decide if it even needs to search. If you say "Hello", the agent skips the database and just says "Hi". If you ask a hard question, it decides to query the database.

### Graph RAG

Instead of breaking text into isolated chunks, Graph RAG extracts entities (people, places, concepts) and maps how they relate to each other in a Knowledge Graph. This is incredibly powerful for complex datasets with deep relationships.

### Multi-Modal RAG

Traditional RAG only reads text. Multi-modal RAG processes images, charts, and audio files, allowing users to ask questions like, "What does the graph on page 4 indicate?"

---

## Final Thoughts

Retrieval-Augmented Generation is the bridge between incredible reasoning engines (LLMs) and reliable factual knowledge (your data).

Understanding RAG is no longer optional for software engineers. Nearly every enterprise software product being built today involves some form of it. By learning how chunking, embeddings, vector databases, and prompt augmentation work together, you have demystified the magic behind modern AI.

Your next step is to build on the code we wrote today. Try pointing the PDF loader to your résumé, a school textbook, or a financial report. Once you experience your own code answering questions about your personal data, you'll start to truly understand the power of AI engineering.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "RAG Explained Simply with a Real Project",
  "desc": "If you have used ChatGPT, you know how magical it feels. You ask a question, and it instantly generates a highly articulate answer. But you also probably know its biggest flaw. If you ask it about you",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/rag-explained-simply-with-a-real-project.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
