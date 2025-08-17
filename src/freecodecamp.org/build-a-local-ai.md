---
lang: en-US
title: "How to Build Your Own Local AI: Create Free RAG and AI Agents with Qwen 3 and Ollama"
description: "Article(s) > How to Build Your Own Local AI: Create Free RAG and AI Agents with Qwen 3 and Ollama"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - Ollama
  - LangChain
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - aritificial-intelligence
  - llm
  - large-language-models
  - ollama
  - langchain
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your Own Local AI: Create Free RAG and AI Agents with Qwen 3 and Ollama"
    - property: og:description
      content: "How to Build Your Own Local AI: Create Free RAG and AI Agents with Qwen 3 and Ollama"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-local-ai.html
prev: /programming/py/articles/README.md
date: 2025-05-07
isOriginal: false
author:
  - name: Chaitanya Rahalkar
    url : https://freecodecamp.org/news/author/chaitanyarahalkar/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746545253944/58b04b54-e443-4804-bedd-3290bfda5bb7.png
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
  name="How to Build Your Own Local AI: Create Free RAG and AI Agents with Qwen 3 and Ollama"
  desc="The landscape of Artificial Intelligence is rapidly evolving, and one of the most exciting trends is the ability to run powerful Large Language Models (LLMs) directly on your local machine. This shift away from reliance on cloud-based APIs offers sig..."
  url="https://freecodecamp.org/news/build-a-local-ai"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746545253944/58b04b54-e443-4804-bedd-3290bfda5bb7.png"/>

The landscape of Artificial Intelligence is rapidly evolving, and one of the most exciting trends is the ability to run powerful Large Language Models (LLMs) directly on your local machine.

This shift away from reliance on cloud-based APIs offers significant advantages in terms of privacy, cost-effectiveness, and offline accessibility. Developers and enthusiasts can now experiment with and deploy sophisticated AI capabilities without sending data externally or incurring API fees.

This tutorial serves as a practical, hands-on guide to harnessing this local AI power. It focuses on leveraging the Qwen 3 family of LLMs, a state-of-the-art open-source offering from Alibaba, combined with Ollama, a tool that dramatically simplifies running LLMs locally.

::: note Prerequisites

Before diving into this tutorial, you should have a foundational understanding of Python programming and be comfortable using the command line or terminal. Make sure you have Python 3 installed on your system.

While prior experience with AI or Large Language Models (LLMs) is beneficial, it's not essential, as I’ll introduce and explain core concepts like Retrieval-Augmented Generation (RAG) and AI agents throughout the guide.

This tutorial serves as a practical, hands-on guide to harnessing this local AI power. It focuses on leveraging the Qwen 3 family of LLMs, a state-of-the-art open-source offering from Alibaba, combined with Ollama, a tool that dramatically simplifies running LLMs locally.

:::

## Table of Contents

1. [Local AI Power with Qwen 3 and Ollama](#heading-local-ai-power-with-qwen-3-and-ollama)
    - [Ollama: Your Local LLM Gateway](#heading-ollama-your-local-llm-gateway)
    - [Tutorial Roadmap](#heading-tutorial-roadmap)
2. [How to Set Up Your Local AI Lab](#heading-how-to-set-up-your-local-ai-lab)
    - [Install Ollama](#heading-install-ollama)
    - [Choose Your Qwen 3 Model](#heading-choose-your-qwen-3-model)
    - [Pull and Run Qwen 3 with Ollama](#heading-pull-and-run-qwen-3-with-ollama)
    - [Set Up Your Python Environment](#heading-set-up-your-python-environment)
3. [How to Build a Local RAG System with Qwen 3](#heading-how-to-build-a-local-rag-system-with-qwen-3)
    - [Step 1: Prepare Your Data](#heading-step-1-prepare-your-data)
    - [Step 2: Load Documents in Python](#heading-step-2-load-documents-in-python)
    - [Step 3: Split Documents](#heading-step-3-split-documents)
    - [Step 4: Choose and Configure Embedding Model](#heading-step-4-choose-and-configure-embedding-model)
    - [Step 5: Set Up Local Vector Store (ChromaDB)](#heading-step-5-set-up-local-vector-store-chromadb)
    - [Step 6: Index Documents (Embed and Store)](#heading-step-6-index-documents-embed-and-store)
    - [Step 7: Build the RAG Chain](#heading-step-7-build-the-rag-chain)
    - [Step 8: Query Your Documents](#heading-step-8-query-your-documents)
4. [How to Create Local AI Agents with Qwen 3](#heading-how-to-create-local-ai-agents-with-qwen-3)
    - [Step 1: Define Custom Tools](#heading-step-1-define-custom-tools)
    - [Step 2: Set up the Agent LLM](#heading-step-2-set-up-the-agent-llm)
    - [Step 3: Create the Agent Prompt](#heading-step-3-create-the-agent-prompt)
    - [Step 4: Build the Agent](#heading-step-4-build-the-agent)
    - [Step 5: Create the Agent Executor](#heading-step-5-create-the-agent-executor)
    - [Step 6: Run the Agent](#heading-step-6-run-the-agent)
5. [Advanced Considerations and Troubleshooting](#heading-advanced-considerations-and-troubleshooting)
    - [Controlling Qwen 3's Thinking Mode with Ollama](#heading-controlling-qwen-3s-thinking-mode-with-ollama)
    - [Managing Context Length (num_ctx)](#heading-managing-context-length-numctx)
    - [Hardware Limitations and VRAM](#heading-hardware-limitations-and-vram)
6. [Conclusion and Next Steps](#heading-conclusion-and-next-steps)

---

## Local AI Power with Qwen 3 and Ollama

Running LLMs locally addresses several key concerns associated with cloud-based AI services.

- Privacy is paramount - data processed locally never leaves the user's machine.
- Cost is another major factor - utilizing open-source models and tools like Ollama eliminates API subscription fees and pay-per-token charges, making advanced AI accessible to everyone.
- Local execution enables offline functionality - crucial for applications where internet connectivity is unreliable or undesirable.

### Ollama: Your Local LLM Gateway

Ollama acts as a bridge, making the power of models like Qwen 3 accessible on local hardware. It's a command-line tool that simplifies the download, setup, and execution of various open-source LLMs across macOS, Linux, and Windows.

Ollama handles the complexities of model configuration and GPU utilization, providing a straightforward interface for developers and users. It also exposes an OpenAI-compatible API endpoint, allowing seamless integration with popular frameworks like LangChain.

### Tutorial Roadmap

This tutorial will guide you through the process of:

1. **Setting up a local AI environment:** Installing Ollama and selecting/running appropriate Qwen 3 models.
2. **Building a local RAG system:** Creating a system that allows chatting with personal documents using Qwen 3, Ollama, LangChain, and ChromaDB for vector storage.
3. **Creating a basic local AI agent:** Developing a simple agent powered by Qwen 3 that can utilize custom-defined tools (functions).

---

## How to Set Up Your Local AI Lab

The first step is to prepare your local machine with the necessary tools and models.

### Install Ollama

Ollama provides the simplest path to running LLMs locally.

::: tabs

@tab:active <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

Open a terminal and run the official installation script:

```sh
curl -fsSL https://ollama.com/install.sh | sh
```

@tab <FontIcon icon="fa-brands fa-windows"/>

Download the installer from the Ollama website ([<FontIcon icon="fas fa-globe"/>https://ollama.com/download](https://ollama.com/download)) and follow the setup instructions.

:::

After installation, verify it by opening a new terminal window and running:

```sh
ollama --version
```

Ollama typically stores downloaded models in <FontIcon icon="fas fa-folder-open"/>`~/.ollama/models` on macOS and <FontIcon icon="fas fa-folder-open"/>`/usr/share/ollama/.ollama/models` on Linux/WSL.

### Choose Your Qwen 3 Model

Selecting the right Qwen 3 model is crucial and depends on your intended task and available hardware, primarily system RAM and GPU VRAM. Running larger models requires more resources but generally offers better performance and reasoning capabilities.

Qwen 3 offers two main architectures available through Ollama:

- **Dense Models:** (like `qwen3:0.6b`, `qwen3:4b`, `qwen3:8b`, `qwen3:14b`, `qwen3:32b`) These models activate all their parameters during inference. Their performance is predictable, but resource requirements scale directly with parameter count.
- **Mixture-of-Experts (MoE) Models:** (like `qwen3:30b-a3b`) These models contain many "expert" sub-networks but only activate a small fraction for each input token. This allows them to achieve the performance characteristic of their large total parameter count (for example, 30 billion) while having inference costs closer to their smaller *active* parameter count (for example, 3 billion). They offer a compelling balance of capability and efficiency, especially for reasoning and coding tasks.

::: tip Recommendation for this tutorial

For the examples that follow, `qwen3:8b` strikes a good balance between capability and resource requirements for many modern machines. If resources are more constrained, `qwen3:4b` is a viable alternative. The MoE model `qwen3:30b-a3b` offers excellent performance, especially for coding and reasoning, and runs surprisingly well on systems with 16GB+ VRAM due to its sparse activation.

:::

### Pull and Run Qwen 3 with Ollama

Once you’ve chosen a model, you’ll need to download it (pull it) via Ollama.

#### Pull the model:

Open the terminal and run (replace `qwen3:8b` with the desired tag):

```sh
ollama pull qwen3:8b
```

This command downloads the model weights and configuration.

#### Run interactively (optional test)

To chat directly with the model from the command line:

```sh
ollama run qwen3:8b
```

Type prompts directly into the terminal. Use `/bye` to exit the session. Other useful commands within the interactive session include `/?` for help and `/set parameter <name> <value>` (for example, `/set parameter num_ctx 8192`) to temporarily change model parameters for the current session. Use `ollama list` outside the session to see downloaded models.

#### Run as a server

For integration with Python scripts (using LangChain), Ollama needs to run as a background server process, exposing an API. Open a *separate* terminal window and run:

```sh
ollama serve
```

Keep this terminal window open while running the Python scripts. This command starts the server, typically listening on `http://localhost:11434`, providing an OpenAI-compatible API endpoint.

### Set Up Your Python Environment

A dedicated Python environment is recommended for managing dependencies.

#### Create a virtual environment:

```sh
python -m venv venv
```

#### Activate the environment:

::: code-tabs#sh

@tab:active <FontIcon icon="iconfont icon-macos"/>,<FontIcon icon="fa-brands fa-linux"/>

```sh
source venv/bin/activate
```

@tab <FontIcon icon="fa-brands fa-windows"/>

```sh
venv\Scripts\activate
```

:::

#### Install necessary libraries:

```sh
pip install langchain \
langchain-community \
langchain-core \
langchain-ollama \
chromadb \
sentence-transformers \
pypdf \
python-dotenv \
unstructured[pdf] \
tiktoken
```

- `langchain`, `langchain-community`, `langchain-core`: The core LangChain framework for building LLM applications.
- `langchain-ollama`: Specific integration for using Ollama models with LangChain.
- `chromadb`: The local vector database for storing document embeddings.
- `sentence-transformers`: Used for an alternative local embedding method (explained later).
- `pypdf`: A library for loading PDF documents.
- `python-dotenv`: For managing environment variables (optional but good practice).
- `unstructured[pdf]`: An alternative, powerful document loader, especially for complex PDFs.
- `tiktoken`: Used by LangChain for token counting.

The local setup involves coordinating several independent components: Ollama itself, the specific Qwen 3 model weights, the Python environment, and various libraries like LangChain and ChromaDB. Ensuring compatibility between these pieces and correctly configuring parameters (like Ollama's context window size or selecting a model appropriate for the available VRAM) is key to a smooth experience.

While this modularity offers flexibility - allowing components like the LLM or vector store to be swapped - it also means the initial setup requires careful attention to detail. This tutorial aims to provide clear steps and sensible defaults to minimize potential friction points.

---

## How to Build a Local RAG System with Qwen 3

Retrieval-Augmented Generation (RAG) is a powerful technique that enhances LLMs by providing them with external knowledge.

Instead of relying solely on its training data, the LLM can retrieve relevant information from a specified document set (like local PDFs) and uses that information to answer questions. This significantly reduces "hallucinations" (incorrect or fabricated information) and allows the LLM to answer questions about specific, private data without needing retraining.

The core RAG process involves:

1. Loading and splitting documents into manageable chunks.
2. Converting these chunks into numerical representations (embeddings) using an embedding model.
3. Storing these embeddings in a vector database for efficient searching.
4. When a query comes in, embedding the query and searching the vector database for the most similar document chunks.
5. Providing these relevant chunks (context) along with the original query to the LLM to generate an informed answer.

Let's build this locally using Qwen 3, Ollama, LangChain, and ChromaDB.

### Step 1: Prepare Your Data

Create a directory named `data` in the project folder. Place the PDF document that you intend to query into this directory. For this tutorial, using a single, primarily text-based PDF (like a research paper or a report) for simplicity.

```sh
mkdir data
# Copy your PDF file into the 'data' directory
# e.g., cp ~/Downloads/some_paper.pdf./data/mydocument.pdf
```

If you don’t have a PDF readily available that you’d like to use, you can download a sample PDF (the Llama 2 paper) for this tutorial using the following command in your terminal:

```sh
wget --user-agent "Mozilla" "https://arxiv.org/pdf/2307.09288.pdf" -O "data/llama2.pdf"
```

This command creates the `data` directory and downloads the PDF, saving it as `llama2.pdf` inside the `data` directory. If you prefer to use your own document, place your PDF file into the `data` directory and update the filename in the subsequent Python code.

### Step 2: Load Documents in Python

Use LangChain's document loaders to read the PDF content. `PyPDFLoader` is straightforward for simple PDFs. `UnstructuredPDFLoader` (requires `unstructured[pdf]`) can handle more complex layouts but has more dependencies.

```py title="rag_local.py"
import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader # Or UnstructuredPDFLoader

load_dotenv() # Optional: Loads environment variables from.env file

DATA_PATH = "data/"
PDF_FILENAME = "mydocument.pdf" # Replace with your PDF filename

def load_documents():
    """Loads documents from the specified data path."""
    pdf_path = os.path.join(DATA_PATH, PDF_FILENAME)
    loader = PyPDFLoader(pdf_path)
    # loader = UnstructuredPDFLoader(pdf_path) # Alternative
    documents = loader.load()
    print(f"Loaded {len(documents)} page(s) from {pdf_path}")
    return documents

# documents = load_documents() # Call this later
```

### Step 3: Split Documents

Large documents need to be split into smaller chunks suitable for embedding and retrieval. The `RecursiveCharacterTextSplitter` attempts to split text semantically (at paragraphs, sentences, and so on) before resorting to fixed-size splits. `chunk_size` determines the maximum size of each chunk (in characters), and `chunk_overlap` specifies how many characters should overlap between consecutive chunks to maintain context.

```py title="rag_local.py"
from langchain_text_splitters import RecursiveCharacterTextSplitter

def split_documents(documents):
    """Splits documents into smaller chunks."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
        is_separator_regex=False,
    )
    all_splits = text_splitter.split_documents(documents)
    print(f"Split into {len(all_splits)} chunks")
    return all_splits

# loaded_docs = load_documents()
# chunks = split_documents(loaded_docs) # Call this later
```

### Step 4: Choose and Configure Embedding Model

Embeddings transform text into vectors (lists of numbers) such that semantically similar text chunks have vectors that are close together in multi-dimensional space.

#### Option A (Recommended for Simplicity): Ollama Embeddings

This approach uses Ollama to serve a dedicated embedding model. nomic-embed-text is a capable open-source model available via Ollama.

First, ensure the embedding model is pulled:

```sh
ollama pull nomic-embed-text
```

Then, use `OllamaEmbeddings` in Python:

```py title="rag_local.py"
from langchain_ollama import OllamaEmbeddings

def get_embedding_function(model_name="nomic-embed-text"):
    """Initializes the Ollama embedding function."""
    # Ensure Ollama server is running (ollama serve)
    embeddings = OllamaEmbeddings(model=model_name)
    print(f"Initialized Ollama embeddings with model: {model_name}")
    return embeddings

# embedding_function = get_embedding_function() # Call this later
```

#### Option B (Alternative): Sentence Transformers

This uses the sentence-transformers library directly within the Python script. It requires installing the library (pip install sentence-transformers) but doesn't need a separate Ollama process for embeddings. Models like all-MiniLM-L6-v2 are fast and lightweight, while all-mpnet-base-v2 offers higher quality.

```py
# Alternative embedding function using Sentence Transformers
from langchain_community.embeddings import HuggingFaceEmbeddings

def get_embedding_function_hf(model_name="all-MiniLM-L6-v2"):
     """Initializes HuggingFace embeddings (runs locally)."""
     embeddings = HuggingFaceEmbeddings(model_name=model_name)
     print(f"Initialized HuggingFace embeddings with model: {model_name}")
     return embeddings

embedding_function = get_embedding_function_hf() # Use this if choosing Option B
```

For this tutorial, we’ll use Option A (Ollama Embeddings with `nomic-embed-text`) to keep the toolchain consistent.

### Step 5: Set Up Local Vector Store (ChromaDB)

ChromaDB provides an efficient way to store and search vector embeddings locally. Using a persistent client ensures the indexed data is saved to disk and can be reloaded without re-processing the documents every time.

```py title="rag_local.py"
from langchain_community.vectorstores import Chroma

CHROMA_PATH = "chroma_db" # Directory to store ChromaDB data

def get_vector_store(embedding_function, persist_directory=CHROMA_PATH):
    """Initializes or loads the Chroma vector store."""
    vectorstore = Chroma(
        persist_directory=persist_directory,
        embedding_function=embedding_function
    )
    print(f"Vector store initialized/loaded from: {persist_directory}")
    return vectorstore

embedding_function = get_embedding_function()
vector_store = get_vector_store(embedding_function) # Call this later
```

### Step 6: Index Documents (Embed and Store)

This is the core indexing step where document chunks are converted to embeddings and saved in ChromaDB. The `Chroma.from_documents` function is convenient for the initial creation and indexing. If the database already exists, subsequent additions can use `vectorstore.add_documents`.

```py title="rag_local.py"
def index_documents(chunks, embedding_function, persist_directory=CHROMA_PATH):
    """Indexes document chunks into the Chroma vector store."""
    print(f"Indexing {len(chunks)} chunks...")
    # Use from_documents for initial creation.
    # This will overwrite existing data if the directory exists but isn't a valid Chroma DB.
    # For incremental updates, initialize Chroma first and use vectorstore.add_documents().
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_function,
        persist_directory=persist_directory
    )
    vectorstore.persist() # Ensure data is saved
    print(f"Indexing complete. Data saved to: {persist_directory}")
    return vectorstore

#... (previous function calls)
vector_store = index_documents(chunks, embedding_function) # Call this for initial indexing
```

To load an existing persistent database later:

```py
embedding_function = get_embedding_function()
vector_store = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
```

### Step 7: Build the RAG Chain

Now, assemble the components into a LangChain Expression Language (LCEL) chain. This involves initializing the Qwen 3 LLM via Ollama, creating a retriever from the vector store, defining a suitable prompt, and chaining them together.

A critical parameter when initializing `ChatOllama` for RAG is `num_ctx`. This defines the context window size (in tokens) that the LLM can handle. Ollama's default (often 2048 or 4096 tokens) might be too small to accommodate both the retrieved document context and the user's query/prompt.

Qwen 3 models (8B and larger) support much larger context windows (for example, 128k tokens), but practical limits depend on your available RAM/VRAM. Setting `num_ctx` to a value like 8192 or higher is often necessary for effective RAG.

```py :collapsed-lines title="rag_local.py"
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

def create_rag_chain(vector_store, llm_model_name="qwen3:8b", context_window=8192):
    """Creates the RAG chain."""
    # Initialize the LLM
    llm = ChatOllama(
        model=llm_model_name,
        temperature=0, # Lower temperature for more factual RAG answers
        num_ctx=context_window # IMPORTANT: Set context window size
    )
    print(f"Initialized ChatOllama with model: {llm_model_name}, context window: {context_window}")

    # Create the retriever
    retriever = vector_store.as_retriever(
        search_type="similarity", # Or "mmr"
        search_kwargs={'k': 3} # Retrieve top 3 relevant chunks
    )
    print("Retriever initialized.")

    # Define the prompt template
    template = """Answer the question based ONLY on the following context:
{context}

Question: {question}
"""
    prompt = ChatPromptTemplate.from_template(template)
    print("Prompt template created.")

    # Define the RAG chain using LCEL
    rag_chain = (
        {"context": retriever, "question": RunnablePassthrough()}
| prompt
| llm
| StrOutputParser()
    )
    print("RAG chain created.")
    return rag_chain

#... (previous function calls)
vector_store = get_vector_store(embedding_function) # Assuming DB is already indexed
rag_chain = create_rag_chain(vector_store) # Call this later
```

The effectiveness of the RAG system hinges on the proper configuration of each component. The `chunk_size` and `chunk_overlap` in the splitter affect what the retriever finds. Your choice of `embedding_function` must be consistent between indexing and querying. The `num_ctx` parameter for the `ChatOllama` LLM must be large enough to hold the retrieved context and the prompt itself. A poorly designed prompt template can also lead the LLM astray. Make sure you carefully tune these elements for optimal performance.

### Step 8: Query Your Documents

Finally, invoke the RAG chain with a question related to the content of the indexed PDF.

```py :collapsed-lines title="rag_local.py"
def query_rag(chain, question):
    """Queries the RAG chain and prints the response."""
    print("\nQuerying RAG chain...")
    print(f"Question: {question}")
    response = chain.invoke(question)
    print("\nResponse:")
    print(response)

# --- Main Execution ---
if __name__ == "__main__":
    # 1. Load Documents
    docs = load_documents()

    # 2. Split Documents
    chunks = split_documents(docs)

    # 3. Get Embedding Function
    embedding_function = get_embedding_function() # Using Ollama nomic-embed-text

    # 4. Index Documents (Only needs to be done once per document set)
    # Check if DB exists, if not, index. For simplicity, we might re-index here.
    # A more robust approach would check if indexing is needed.
    print("Attempting to index documents...")
    vector_store = index_documents(chunks, embedding_function)
    # To load existing DB instead:
    # vector_store = get_vector_store(embedding_function)

    # 5. Create RAG Chain
    rag_chain = create_rag_chain(vector_store, llm_model_name="qwen3:8b") # Use the chosen Qwen 3 model

    # 6. Query
    query_question = "What is the main topic of the document?" # Replace with a specific question
    query_rag(rag_chain, query_question)

    query_question_2 = "Summarize the introduction section." # Another example
    query_rag(rag_chain, query_question_2)
```

Run the complete script (`python rag_local.py`). Make sure that the `ollama serve` command is running in another terminal. The script will load the PDF, split it, embed the chunks using `nomic-embed-text` via Ollama, store them in ChromaDB, build the RAG chain using `qwen3:8b` via Ollama, and finally execute the queries. It’ll print the LLM's responses based on the document content.

---

## How to Create Local AI Agents with Qwen 3

Beyond answering questions based on provided text, LLMs can act as the reasoning engine for AI agents. Agents can plan sequences of actions, interact with external tools (like functions or APIs), and work towards accomplishing more complex goals assigned by the user.

Qwen 3 models were specifically designed with strong tool-calling and agentic capabilities. While Alibaba provides the Qwen-Agent framework, this tutorial will continue using LangChain for consistency and because its integration with Ollama for agent tasks is more readily documented in the provided materials.

We will build a simple agent that can use a custom Python function as a tool.

### Step 1: Define Custom Tools

Tools are standard Python functions that the agent can choose to execute. The function's docstring is crucial, as the LLM uses it to understand what the tool does and what arguments it requires. LangChain's `@tool` decorator simplifies wrapping functions for agent use.

```py :collapsed-lines title="agent_local.py"
import os
from dotenv import load_dotenv
from langchain.agents import tool
import datetime

load_dotenv() # Optional

@tool
def get_current_datetime(format: str = "%Y-%m-%d %H:%M:%S") -> str:
    """
    Returns the current date and time, formatted according to the provided Python strftime format string.
    Use this tool whenever the user asks for the current date, time, or both.
    Example format strings: '%Y-%m-%d' for date, '%H:%M:%S' for time.
    If no format is specified, defaults to '%Y-%m-%d %H:%M:%S'.
    """
    try:
        return datetime.datetime.now().strftime(format)
    except Exception as e:
        return f"Error formatting date/time: {e}"

# List of tools the agent can use
tools = [get_current_datetime]
print("Custom tool defined.")
```

### Step 2: Set Up the Agent LLM

Instantiate the `ChatOllama` model again, using a Qwen 3 variant suitable for tool calling. The `qwen3:8b` model should be capable of handling simple tool use cases.

It's important to note that tool calling reliability with local models served via Ollama can sometimes be less consistent than with large commercial APIs like GPT-4 or Claude. The LLM might fail to recognize when a tool is needed, hallucinate arguments, or misinterpret the tool's output. Starting with clear prompts and simple tools is recommended.

```py title="agent_local.py"
from langchain_ollama import ChatOllama

def get_agent_llm(model_name="qwen3:8b", temperature=0):
    """Initializes the ChatOllama model for the agent."""
    # Ensure Ollama server is running (ollama serve)
    llm = ChatOllama(
        model=model_name,
        temperature=temperature # Lower temperature for more predictable tool use
        # Consider increasing num_ctx if expecting long conversations or complex reasoning
        # num_ctx=8192
    )
    print(f"Initialized ChatOllama agent LLM with model: {model_name}")
    return llm

# agent_llm = get_agent_llm() # Call this later
```

### Step 3: Create the Agent Prompt

Agents require specific prompt structures that guide their reasoning and tool use. The prompt typically includes placeholders for user input (`input`), conversation history (`chat_history`), and the `agent_scratchpad`. The scratchpad is where the agent records its internal "thought" process, the tools it decides to call, and the results (observations) it gets back from those tools. LangChain Hub provides pre-built prompts suitable for tool-calling agents.

```py title="agent_local.py"
from langchain import hub

def get_agent_prompt(prompt_hub_name="hwchase17/openai-tools-agent"):
    """Pulls the agent prompt template from LangChain Hub."""
    # This prompt is designed for OpenAI but often works well with other tool-calling models.
    # Alternatively, define a custom ChatPromptTemplate.
    prompt = hub.pull(prompt_hub_name)
    print(f"Pulled agent prompt from Hub: {prompt_hub_name}")
    # print("Prompt Structure:")
    # prompt.pretty_print() # Uncomment to see the prompt structure
    return prompt

# agent_prompt = get_agent_prompt() # Call this later
```

### Step 4: Build the Agent

The `create_tool_calling_agent` function combines the LLM, the defined tools, and the prompt into a runnable unit that represents the agent's core logic.

```py title="agent_local.py"
from langchain.agents import create_tool_calling_agent

def build_agent(llm, tools, prompt):
    """Builds the tool-calling agent runnable."""
    agent = create_tool_calling_agent(llm, tools, prompt)
    print("Agent runnable created.")
    return agent

# agent_runnable = build_agent(agent_llm, tools, agent_prompt) # Call this later
```

### Step 5: Create the Agent Executor

The `AgentExecutor` is responsible for running the agent loop. It takes the agent runnable and the tools, invokes the agent with the input, parses the agent's output (which could be a final answer or a tool call request), executes any requested tool calls, and feeds the results back to the agent until a final answer is reached. Setting `verbose=True` is highly recommended during development to observe the agent's step-by-step execution flow.

```py title="agent_local.py"
from langchain.agents import AgentExecutor

def create_agent_executor(agent, tools):
    """Creates the agent executor."""
    agent_executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True # Set to True to see agent thoughts and tool calls
    )
    print("Agent executor created.")
    return agent_executor

# agent_executor = create_agent_executor(agent_runnable, tools) # Call this later
```

### Step 6: Run the Agent

Invoke the agent executor with a user query that should trigger the use of the defined tool.

```py title="agent_local.py"
def run_agent(executor, user_input):
    """Runs the agent executor with the given input."""
    print("\nInvoking agent...")
    print(f"Input: {user_input}")
    response = executor.invoke({"input": user_input})
    print("\nAgent Response:")
    print(response['output'])

# --- Main Execution ---
if __name__ == "__main__":
    # 1. Define Tools (already done above)

    # 2. Get Agent LLM
    agent_llm = get_agent_llm(model_name="qwen3:8b") # Use the chosen Qwen 3 model

    # 3. Get Agent Prompt
    agent_prompt = get_agent_prompt()

    # 4. Build Agent Runnable
    agent_runnable = build_agent(agent_llm, tools, agent_prompt)

    # 5. Create Agent Executor
    agent_executor = create_agent_executor(agent_runnable, tools)

    # 6. Run Agent
    run_agent(agent_executor, "What is the current date?")
    run_agent(agent_executor, "What time is it right now? Use HH:MM format.")
    run_agent(agent_executor, "Tell me a joke.") # Should not use the tool
```

Running `python agent_local.py` (with `ollama serve` active) will execute the agent. The `verbose=True` setting will print output resembling the ReAct (Reasoning and Acting) framework, showing the agent's internal "Thoughts" on how to proceed, the "Action" it decides to take (calling a specific tool with arguments), and the "Observation" (the result returned by the tool).

Building reliable agents with local models presents unique challenges. The LLM's ability to correctly interpret the prompt, understand when to use tools, select the right tool, generate valid arguments, and process the tool's output is critical.

Local models, especially smaller or heavily quantized ones, might struggle with these reasoning steps compared to larger, cloud-based counterparts. If the `qwen3:8b` model proves unreliable for more complex agentic tasks, consider trying `qwen3:14b` or the efficient `qwen3:30b-a3b` if hardware permits.

For highly complex or stateful agent workflows, exploring frameworks like LangGraph, which offers more control over the agent's execution flow, might be beneficial.

---

## Advanced Considerations and Troubleshooting

Running LLMs locally offers great flexibility but also introduces specific configuration aspects and potential issues.

### Controlling Qwen 3's Thinking Mode with Ollama

Qwen 3's unique hybrid inference allows switching between a deep "thinking" mode for complex reasoning and a faster "non-thinking" mode for general chat. While frameworks like Hugging Face Transformers or vLLM might offer explicit parameters (`enable_thinking`), the primary way to control this when using Ollama appears to be through "soft switches" embedded in the prompt.

Append `/think` to the end of a user prompt to encourage step-by-step reasoning, or `/no_think` to request a faster, direct response. You can do this via the Ollama CLI or potentially within the prompts sent via the API/LangChain.

```py
# Example using LangChain's ChatOllama
from langchain_ollama import ChatOllama

llm_think = ChatOllama(model="qwen3:8b")
llm_no_think = ChatOllama(model="qwen3:8b") # Could also set system prompt

# Invoke with prompt modification
response_think = llm_think.invoke("Solve the equation 2x + 5 = 15 /think")
print("Thinking Response:", response_think)

response_no_think = llm_no_think.invoke("What is the capital of France? /no_think")
print("Non-Thinking Response:", response_no_think)

# Alternatively, set via system message (might be less reliable turn-by-turn)
llm_system_no_think = ChatOllama(model="qwen3:8b", system="/no_think")
response_system = llm_system_no_think.invoke("What is 2+2?")
print("System No-Think Response:", response_system)
```

Note that the persistence of these tags across multiple turns in a conversation might require careful prompt management.

### Managing Context Length (`num_ctx`)

The context window (`num_ctx`) determines how much information (prompt, history, retrieved documents) the LLM can consider at once. Qwen 3 models (8B+) support large native context lengths (for example, 128k tokens), but Ollama often defaults to a much smaller window (like 2048 or 4096). For RAG or conversations requiring memory of earlier turns, this default is often insufficient.

Set `num_ctx` when initializing `ChatOllama` or `OllamaLLM` in LangChain:

```py
# Example setting context window to 8192 tokens
llm = ChatOllama(model="qwen3:8b", num_ctx=8192)
```

Be mindful that larger `num_ctx` values significantly increase RAM and VRAM consumption. But setting it too low can lead to the model "forgetting" context or even entering repetitive loops. Choose a value that balances the task requirements with hardware capabilities.

### Hardware Limitations and VRAM

Running LLMs locally is resource-intensive.

- **VRAM:** A dedicated GPU (NVIDIA or Apple Silicon) with sufficient VRAM is highly recommended for acceptable performance. The amount of VRAM dictates the largest model size that can run efficiently. Refer to the table in Section 2 for estimates.
- **RAM:** System RAM is also crucial, especially if the model doesn't fit entirely in VRAM. Ollama can utilize system RAM as a fallback, but this is significantly slower.
- **Quantization:** Ollama typically serves quantized models (for example., 4-bit or 5-bit), which reduce the model size and VRAM requirements significantly compared to full-precision models, often with minimal performance degradation for many tasks. The tags like `:4b`, `:8b` usually imply a default quantization level.

If performance is slow or errors occur due to resource constraints, consider:

- Using a smaller Qwen 3 model (like 4B instead of 8B).
- Ensuring Ollama is correctly detecting and utilizing the GPU (check Ollama logs or system monitoring tools).
- Closing other resource-intensive applications.

---

## Conclusion and Next Steps

This tutorial gave you a practical walkthrough for setting up your local AI environment using the powerful and open Qwen 3 LLM family with the user-friendly Ollama tool.

If you’ve followed these steps, you should have successfully:

1. Installed Ollama and downloaded/run Qwen 3 models locally.
2. Built a functional Retrieval-Augmented Generation (RAG) pipeline using LangChain and ChromaDB to query local documents.
3. Created a basic AI agent capable of reasoning and utilizing custom Python tools.

Running these systems locally unlocks significant advantages in privacy, cost, and customization, making advanced AI capabilities more accessible than ever. The combination of Qwen 3's performance and open license with Ollama's ease of use creates a potent platform for experimentation and development.

::: info Official Resources:

- **Qwen 3:** [GitHub (<FontIcon icon="iconfont icon-github"/>`QwenLM/Qwen3`)](https://github.com/QwenLM/Qwen3), [<FontIcon icon="fas fa-globe"/>Documentation](https://qwen.readthedocs.io/en/latest/)
- **Ollama:** [<FontIcon icon="iconfont icon-ollama"/>Website](https://ollama.com/), [<FontIcon icon="iconfont icon-ollama"/>Model Library](https://ollama.com/library), [GitHub (<FontIcon icon="iconfont icon-github"/>`ollama/ollama`)](https://github.com/ollama/ollama)
- **LangChain:** [<FontIcon icon="iconfont icon-langchain"/>Python Documentation](https://python.langchain.com/docs/get_started/introduction)
- **ChromaDB:** [<FontIcon icon="fas fa-globe"/>Documentation](https://docs.trychroma.com/)
- **Sentence Transformers:** [<FontIcon icon="fas fa-globe"/>Documentation](https://sbert.net/)

By leveraging these powerful, free, and open-source tools, you can continue to push the boundaries of what's possible with AI running directly on your own hardware.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your Own Local AI: Create Free RAG and AI Agents with Qwen 3 and Ollama",
  "desc": "The landscape of Artificial Intelligence is rapidly evolving, and one of the most exciting trends is the ability to run powerful Large Language Models (LLMs) directly on your local machine. This shift away from reliance on cloud-based APIs offers sig...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-local-ai.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
