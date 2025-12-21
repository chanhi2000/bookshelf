---
lang: en-US
title: "How to Solve 5 Common RAG Failures with Knowledge Graphs"
description: "Article(s) > How to Solve 5 Common RAG Failures with Knowledge Graphs"
icon: iconfont icon-langchain
category:
  - AI
  - LLM
  - LangChain
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - langchain
  - lang-chain
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Solve 5 Common RAG Failures with Knowledge Graphs"
    - property: og:description
      content: "How to Solve 5 Common RAG Failures with Knowledge Graphs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-solve-5-common-rag-failures-with-knowledge-graphs.html
prev: /ai/langchain/articles/README.md
date: 2025-11-14
isOriginal: false
author:
  - name: Kamal Kishore
    url : https://freecodecamp.org/news/author/kamalct/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762904270014/5ebeec2b-0823-4f59-bdd7-bf37cb68a978.png
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
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Solve 5 Common RAG Failures with Knowledge Graphs"
  desc="You may have built a Retrieval-Augmented Generation (RAG) pipeline to connect a vector store to a powerful LLM. And RAG pipelines are incredibly effective at grounding models in factual, up-to-date knowledge. But if you've worked with them long enoug..."
  url="https://freecodecamp.org/news/how-to-solve-5-common-rag-failures-with-knowledge-graphs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762904270014/5ebeec2b-0823-4f59-bdd7-bf37cb68a978.png"/>

You may have built a Retrieval-Augmented Generation (RAG) pipeline to connect a vector store to a powerful LLM. And RAG pipelines are incredibly effective at grounding models in factual, up-to-date knowledge. But if you've worked with them long enough, you've likely hit a wall.

The system is great at answering "What is X?" but falls apart when you ask, "How does X relate to Y, and what happened after Z?".

The problem is that standard RAG, by its very nature, breaks context. It chops documents into isolated chunks, finds them based on semantic similarity, and hopes the LLM can piece the puzzle back together. This approach is blind to the relational context—the web of timelines, causes, and connections—that gives facts their meaning.

When queries require synthesizing information across multiple documents or complex, multi-step reasoning, standard RAG fails.

In this article, I’ll give you a practical, code-first guide to solving this problem. We'll move beyond simple vector search by implementing a robust, graph-based pattern to build more reliable, knowledge-aware systems.

::: note Prerequisites

This is a practical, code-first guide intended for developers and engineers who have some experience with RAG. To follow along, you should have the following:

**Conceptual Knowledge**

- A solid understanding of what Retrieval-Augmented Generation (RAG) is and its basic components (like vector stores and LLMs).
- Familiarity with basic graph concepts (nodes, edges, and relationships) is also helpful.

**Technical Setup**

- A Python environment.
- An active Google API Key to use the Gemini API.
- The Python libraries `langchain`, `langchain_google_genai`, `faiss-cpu`, and `networkx` installed.

:::

---

## The Brittle Baseline: Our Standard RAG Setup

First, let's establish our baseline. This is a standard, "naïve" RAG pipeline using LangChain and the Gemini API. It ingests a list of `Document` objects, embeds them, and uses a FAISS vector store to retrieve the top-k chunks to answer a question.

This `create_rag_chain` function will serve as our point of comparison.

```sh
# Install necessary libraries
pip install -q -U langchain langchain_google_genai faiss-cpu networkx
```

```py :collapsed-lines
import os
import networkx as nx
from collections import defaultdict
from langchain_google_genai import GoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.schema.document import Document
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain.schema.output_parser import StrOutputParser

# --- Configure API Key (example) ---
# from google.colab import userdata
# GOOGLE_API_KEY = userdata.get('GOOGLE_API_KEY') 
# os.environ['GOOGLE_API_KEY'] = GOOGLE_API_KEY 

# --- Initialize Models ---
# Make sure your API key is set in your environment
llm = GoogleGenerativeAI(model="gemini-1.5-pro-latest")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

def create_rag_chain(docs):
    """Creates a simple RAG chain using FAISS as the vector store.""" 

    # Create vector store from documents
    vectorstore = FAISS.from_documents(docs, embeddings)
    # K=3 means it will retrieve the top 3 most relevant chunks
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    template = """
    Answer the following question based ONLY on the context provided.
    If the context doesn't contain the answer, say "I don't have enough information from the context."

    CONTEXT:
    {context}

    QUESTION:
    {question}
    """

    prompt = PromptTemplate.from_template(template)

    # Build the chain
    rag_chain = (
        {"context": retriever, "question": RunnablePassthrough()} 
        | prompt
        | llm 
        | StrOutputParser() 
    )

    return rag_chain
```

---

## A More Robust Implementation: The KnowledgeGraph

### What is a Knowledge Graph?

At its core, a knowledge graph (KG) is a way of storing data as a network of nodes and edges.

- **Nodes** represent entities: `people`, `companies`, `concepts`, or `events`.
- **Edges** represent the explicit, labeled relationships between them: `ceo_of`, `attended`, or `partners_with`.

Instead of storing a document like "Jim Farley is the CEO of Ford," you store two nodes (`Jim Farley`, `Ford`) connected by a directed edge (`ceo_of`).

### Why is this More Effective?

This structure is more effective because it preserves and makes relationships a first-class citizen.

Standard RAG relies on "semantic similarity". It's good at finding text chunks that *sound like* your query. But it’s "blind to the relational context" – the very thing you need for complex questions.

The graph-based approach solves this. When a query requires multi-step reasoning, you don't just search for similar text. You traverse a structured, explicit path in the graph. This allows the system to:

#### 1. Follow chains of logic

It can answer multi-hop questions by finding a literal path from one node to another (for example, `F-150` → `made_by` → `Ford` → `ceo` → `Jim Farley`).

#### 2. Disambiguate entities

It can use node attributes (like `type: "company"`) to distinguish between two entities with the same name.

#### 3. Resolve contradictions

It can store metadata (like dates) directly *on the edge* to programmatically determine the most current fact.

You move from "guessing from a cloud of semantically similar text" to querying a "global memory" of how facts are explicitly connected.

Here is the practical implementation of our `KnowledgeGraph`. This class uses `networkx` to store the nodes and edges we just discussed, and includes specific methods to run the structured query patterns needed to solve our RAG failures.

```py :collapsed-lines
class KnowledgeGraph:
    """
    A wrapper around networkx.DiGraph to store and query
    explicit entities and their relationships.
    """
    def __init__(self):
        self.graph = nx.DiGraph() 

    def add_data(self, nodes=None, edges=None):
        """Populates the graph with nodes and edges."""
        if nodes:
            for node, attrs in nodes:
                self.graph.add_node(node, **attrs) 
        if edges:
            for u, v, attrs in edges:
                self.graph.add_edge(u, v, **attrs) 

    # --- Query Patterns ---

    def query_multi_hop_path(self, source, target):
        """
        Pattern 1: Solves multi-hop queries by finding a path.
        """
        try:
            path = nx.shortest_path(self.graph, source=source, target=target) 
            # Format the answer based on the discovered path
            return f"{path[-2]} attended {path[-1]}." 
        except nx.NetworkXNoPath:
            return "Could not find a connection."

    def query_with_conflict_resolution(self, entity, relation, time_attr="year"):
        """
        Pattern 4: Resolves contradictions using metadata (like timestamps)
        stored on the edges.
        """
        candidates = []
        for neighbor in self.graph.neighbors(entity):
            edge_data = self.graph.get_edge_data(entity, neighbor) 
            if edge_data.get("label") == relation: 
                candidates.append((neighbor, edge_data.get(time_attr, 0))) 

        if not candidates: 
            return "No information found." 

        # Sort by the time attribute, descending, and take the latest
        latest = sorted(candidates, key=lambda item: item[1], reverse=True)[0] 
        return f"{latest[0]} (as of {latest[1]})" 

    def query_disambiguated(self, entity_name, entity_type, attribute_key):
        """
        Pattern 3: Uses node 'type' attributes to disambiguate
        entities with the same name.
        """
        for node, attrs in self.graph.nodes(data=True): 
            # Find the node that matches both name and type
            if entity_name in node and attrs.get("type") == entity_type: 
                # Return the requested attribute
                year = attrs['year']
                product = attrs[attribute_key]
                return f"{node}'s first product was the {product} in {year}." 
        return "Cannot disambiguate entity."

    def query_explicit_relation(self, source_node, relation_label):
        """
        Pattern 5: Finds partners based on an explicit edge label,
        preventing semantic 'bleed-over' from unrelated entities.
        """
        partners = [
            v for u, v, data in self.graph.edges(data=True) 
            if u == source_node and data.get('label') == relation_label
        ] 

        if partners:
            return f"{source_node} partnered with {', '.join(partners)}." 
        return f"No partners found for {source_node}."

# A helper function for Pattern 2 (Causal Rules)
# This logic is more rule-based but can be backed by a graph
def query_causal_chain(facts):
    """
    Pattern 2: Synthesizes a direct conclusion by following a
    chain of causal rules.
    """
    try:
        if facts["John"]["takes"] == "aspirin": 
            if facts["aspirin"]["is_a"] == "blood thinner": 
                if facts["blood thinner"]["risk_for"] == "surgery":
                    return "John is NOT safe due to increased bleeding risk from aspirin, a blood thinner."
    except KeyError:
        pass # Fall through to default
    return "Insufficient information to determine risk."
```

---

## 5 RAG Failures and Their Graph-Based Solutions

Let's run five scenarios to see how our standard RAG chain performs against our new `KnowledgeGraph`.

### Pattern 1: The Multi-Hop Failure

The multi-hop failure occurs when an answer requires connecting multiple, separate facts – a chain of reasoning that RAG often breaks.

- **Query:** "Which university did the CEO of the company that makes the F-150 attend?"
- **Problem:** A standard retriever might get chunks for `F-150 -> Ford` and `Jim Farley -> CEO`, but miss the `Jim Farley -> Georgetown` chunk. The chain is broken.

#### Why the Naïve RAG Fails

The retriever's job is to find the `top-k=3` chunks that are **semantically similar** to the entire query. When the user asks, "Which university did the CEO of the company that makes the F-150 attend?", the retriever will search our 6-document list and will likely retrieve:

1. The chunk about the **University of Michigan** (because of the words "university" and "car companies").
2. The chunk about **Jim Farley** (because of "CEO," "Ford," and "F-150 line").
3. The chunk about the **F-150 engine options** (because of "F-150").

The `top-k=3` context handed to the LLM is now full of irrelevant facts. The one chunk that contains the *actual* answer ("...Mr Farley... from Georgetown University") is semantically too far from the main query and is **never retrieved**. The LLM fails not because it's unintelligent, but because it was never given the correct piece of the puzzle.

#### Why the GraphRAG Succeeds

The knowledge graph doesn't care about semantic similarity. It performs a deterministic traversal of explicit, verified relationships.

We ask for the *path* from the `F-150` node to the `Georgetown University` node. The graph follows the chain we defined: `F-150` → `made_by` → `Ford Motor Company` → `ceo` → `Jim Farley` → `attended` → `Georgetown University`. It can't fail or be distracted by the "noise" documents because it's not searching – it's **navigating** a pre-built map.

```py :collapsed-lines
# --Naive RAG
docs_s1 = [
    # --- The 3 "Answer" Chunks ---
    Document(page_content="The Ford F-150 is a full-size pickup truck made by Ford Motor Company."),
    Document(page_content="Jim Farley is the current CEO of Ford Motor Company."),
    Document(page_content="Mr. Farley received his undergraduate degree from Georgetown University."),

    # --- The 3 "Noise" Chunks (to distract the retriever) ---
    Document(page_content="The University of Michigan is renowned for its automotive engineering program, which partners with many car companies."),
    Document(page_content="The F-150 comes with several engine options, including a powerful 3.5L EcoBoost V6."),
    Document(page_content="Mary Barra, the CEO of General Motors, is a major competitor to Ford and its F-150 line.")
]
query_s1 = "Which university did the CEO of the company that makes the F-150 attend?"
rag_chain_s1 = create_rag_chain(docs_s1) # This uses top_k=3
print(f"Naive RAG Answer: {rag_chain_s1.invoke(query_s1)}")
#
# GraphRAG Pattern
graph_s1 = KnowledgeGraph()
edges_s1 = [
    ("F-150", "Ford Motor Company", {"label": "made_by"}),
    ("Ford Motor Company", "Jim Farley", {"label": "ceo"}),
    ("Jim Farley", "Georgetown University", {"label": "attended"}),
]
graph_s1.add_data(edges=edges_s1)
print(f"GraphRAG Answer: {graph_s1.query_multi_hop_path('F-150', 'Georgetown University')}")
```

```plaintext title="output"
Naive RAG Answer: I don't have enough information from the context.
GraphRAG Answer: Jim Farley attended Georgetown University.
```

### Pattern 2: The Causal Synthesis Failure

This is the failure to move from retrieval to synthesis. RAG lists facts but can't combine them to form a new conclusion.

- **Query:** "Is John safe to undergo surgery while on aspirin?"
- **Problem:** RAG will retrieve "John takes aspirin," "Aspirin is a blood thinner," and "Blood thinners increase surgery risk." But it will fail to synthesize these into a direct "No, it's not safe" answer.

#### Why the Naïve RAG Fails

The retriever searches for chunks that are semantically similar to the query: "John," "safe," "surgery," and "aspirin." In a real document base, it's highly likely to retrieve distracting, topically-related "noise" chunks.

In our example, the `top-k=3` chunks it retrieves might be:

1. "John is currently taking daily low-dose aspirin." (Relevant: "John," "aspirin")
2. "Pre-surgery safety checks are standard procedure..." (Relevant: "surgery safety")
3. "John is otherwise in good health and is cleared for the procedure..." (Relevant: "John," "safe," "procedure")

The key causal link ("Aspirin... is considered a blood thinner") is semantically less similar to the *full query* and gets pushed out of the `top-k=3` context. The LLM is then given incomplete information. It sees "John takes aspirin" and "John is cleared," so it provides a weak, hedged answer and cannot make the correct logical leap.

#### Why the GraphRAG Succeeds

This approach doesn't use semantic search. It uses explicit logical rules (which could be backed by a causal graph). The `query_causal_chain` function is not searching for text – it's executing a pre-defined chain of logic:

1. *Fact:* Does John take aspirin? Yes.
2. *Fact:* Is aspirin a blood thinner? Yes.
3. *Fact:* Is a blood thinner a risk for surgery? Yes.
4. *Conclusion:* Therefore, John is not safe.

This deterministic, rule-based reasoning is immune to the "semantic noise" that distracts the naive RAG.

```py
# Naive RAG
docs_s2 = [
    # --- The 3 "Answer" Chunks ---
    Document(page_content="Aspirin reduces blood clotting and is considered a blood thinner."),
    Document(page_content="Patients on blood thinners have increased bleeding risk during surgery."),
    Document(page_content="John is currently taking daily low-dose aspirin."),

    # --- The 3 "Noise" Chunks (to distract the retriever) ---
    Document(page_content="John is otherwise in good health and is cleared for the procedure by his cardiologist."),
    Document(page_content="Pre-surgery safety checks are standard procedure and usually focus on anesthesia allergies."),
    Document(page_content="Aspirin is also commonly used to relieve minor aches and pains, but this is not why John takes it.")
]
query_s2 = "Is John safe to undergo surgery while on aspirin?"
rag_chain_s2 = create_rag_chain (docs_s2)
print(f"Naive RAG Answer: {rag_chain_s2.invoke(query_s2)}")

# GraphRAG Pattern
facts_s2 = {
    "aspirin": {"is_a": "blood thinner"},
    "blood thinner": {"risk_for": "surgery"},
    "John": {"takes": "aspirin"},
}
print(f"GraphRAG Answer: {query_causal_chain(facts_s2)}")
```

```plaintext title="output"
Naive RAG Answer: Based on the context, John is currently taking daily low-dose aspirin...
GraphRAG Answer: John is NOT safe due to increased bleeding risk from aspirin, a blood thinner.
```

### Pattern 3: The Entity Ambiguity Trap

Vector search struggles with polysemy (words with multiple meanings). It relies on local semantic context, which can easily be confused.

- **Query:** "When did Apple release its first product?"
- **Problem:** The query "Apple" might retrieve documents for both Apple (company) and Apple (fruit), confusing the LLM.

#### Why the Naïve RAG Fails

The query "When did Apple release its first product?" is semantically ambiguous. The vector retriever, which looks for *semantic closeness*, will be strongly attracted to the "noise" chunks we added about the fruit.

The `top-k=3` chunks it retrieves will likely be:

1. "The 'Cosmic Crisp' is a new **apple product**... **first released**..." (Extremely high semantic similarity to "Apple releases its first product").
2. "The Granny Smith **apple**... is a popular **product**..."
3. "Many **apple** orchards **release** their new harvest..."

The *correct* chunk ("The Apple I was introduced by Apple Inc...") is about a "company" and a specific "product" name. It might be semantically *less* similar to the general query than the "Cosmic Crisp" chunk. The LLM is then handed a context exclusively about fruits and confidently (but incorrectly) answers about the "Cosmic Crisp" apple.

#### Why the GraphRAG Succeeds

The graph approach is immune to this ambiguity. The `query_disambiguated` function is *not* just searching for "Apple." It is explicitly looking for a node that matches two criteria: `name='Apple'` AND `type='company'`.

This query structurally guarantees that it finds the `Apple Inc.` node and ignores the `apple (fruit)` node, regardless of semantic similarity. It then reliably retrieves the `first_product` attribute from the correct node.

```py
# Naive RAG
docs_s3 = [
    # --- The "Answer" Chunks ---
    Document(page_content="The Apple was introduced by Apple Inc. in 1976."),
    Document(page_content="Apple Inc. is a technology company based in Cupertino."),

    # --- "Noise" Chunks (to create ambiguity) ---
    Document(page_content="The 'Cosmic Crisp' is a new apple product developed by Washington State University, first released to consumers in 2019."),
    Document(page_content="Apples (the fruit) were first cultivated in Central Asia thousands of years ago."),
    Document(page_content="The Granny Smith apple, first discovered in Australia, is a popular product for baking."),
    Document(page_content="Many apple orchards release their new harvest in the fall.")
]
query_s3 = "When did Apple release its first product?"
rag_chain_s3 = create_rag_chain(docs_s3)
print(f"Naive RAG Answer: {rag_chain_s3.invoke(query_s3)}")

# GraphRAG Pattern
graph_s3 = KnowledgeGraph()
nodes_s3 = [
    ("Apple Inc.", {"type": "company", "first_product": "Apple I", "year": 1976}),
    ("apple", {"type": "fruit", "origin": "Central Asia"}),
]
graph_s3.add_data(nodes=nodes_s3)
print(f"GraphRAG Answer: {graph_s3.query_disambiguated('Apple', 'company', 'first_product')}")
```

```py title="output"
Naive RAG Answer: The 'Cosmic Crisp', a new apple product, was first released to consumers in 2019.
GraphRAG Answer: Apple Inc.'s first product was the Apple I in 1976.
```

### Pattern 4: The Contradictory Information Failure

RAG is blind to knowledge conflicts. If it retrieves two or more contradictory facts, it can't resolve them using metadata like dates or source credibility. It will hedge, merge them into a false statement, or present all of them.

- **Query:** "Who is the CEO of Twitter?"
- **Problem:** The retriever finds one chunk saying "Parag Agrawal (2022)" and another saying "Elon Musk (2023)". It may also find other related, confusing information. The LLM has no way to know which fact is the most current and authoritative.

#### Why the Naïve RAG Fails

The query "Who is the CEO of Twitter?" is semantically similar to *all* documents containing the words "CEO" and "Twitter." In a real-world, evolving knowledge base, this is a recipe for disaster.

The `top-k=3` chunks our retriever finds will be a mess of contradictions:

1. "In 2023, Elon Musk became the CEO of Twitter." (Correct, but old)
2. "In 2022, Parag Agrawal was the CEO of Twitter." (Old)
3. "Linda Yaccarino is the current CEO of X (formerly Twitter)..." (Also correct, but a different person/role).

The LLM is handed three different, conflicting names for "CEO of Twitter" from different time periods. Because it is instructed to answer *only* from the context and has no mechanism to identify which fact is the most recent, it cannot give a single, confident answer. It’s forced to list the conflicts it found.

#### Why the GraphRAG Succeeds

The knowledge graph is built for this. We've stored the "CEO" relationship as an **edge with metadata**, specifically a `year` attribute.

Our `query_with_conflict_resolution` function doesn't just find all CEO-related edges. It programmatically:

1. Finds all nodes connected to "Twitter" by a `ceo` label.
2. Extracts the `year` from each of those edges.
3. **Sorts the candidates by year** in descending order.
4. Returns only the top result.

This provides a deterministic, programmatic way to resolve conflicts and always provide the most current fact based on the explicit timestamps in our graph.

```py
# Naive RAG
docs_s4 = [
    # --- The "Answer" Chunks (conflicting) ---
    Document(page_content="In 2022, Parag Agrawal was the CEO of Twitter."),
    Document(page_content="In 2023, Elon Musk became the CEO of Twitter."),

    # --- "Noise" Chunks (to add more conflict/confusion) ---
    Document(page_content="Linda Yaccarino is the current CEO of X (formerly Twitter), overseeing business operations."),
    Document(page_content="Jack Dorsey, a co-founder and former CEO of Twitter, is now focused on his company Block."),
    Document(page_content="CEOs of major tech companies, including Twitter's, have recently testified before Congress.")
]
query_s4 = "Who is the CEO of Twitter?"
rag_chain_s4 = create_rag_chain(docs_s4)
print(f"Naive RAG Answer: {rag_chain_s4.invoke(query_s4)}")

#GraphRAG Pattern
graph_s4 = KnowledgeGraph()
edges_s4 = [
    ("Twitter", "Parag Agrawal", {"label": "ceo", "year": 2022}),
    ("Twitter", "Elon Musk", {"label": "ceo", "year": 2023}),
]
graph_s4.add_data(edges=edges_s4)
print(f"GraphRAG Answer: {graph_s4.query_with_conflict_resolution('Twitter', 'ceo', 'year')}")
```

```py title="output"
Naive RAG Answer: According to the context, in 2022, Parag Agrawal was the CEO of Twitter. In 2023, Elon Musk became the CEO... Linda Yaccarino is the current CEO of X (formerly Twitter)...
GraphRAG Answer: Elon Musk (as of 2023)
```

### Pattern 5: The Implicit Relationship Hallucination

RAG relies on implicit semantic closeness, which can be dangerous. If "Tesla," "Toyota," and "Panasonic" all appear near the word "battery" in the vector space, the LLM might hallucinate a relationship that doesn't exist.

- **Query:** "Who did Tesla partner with on batteries?"
- **Problem:** The query is semantically "close" to any document mentioning "Tesla," "partner," and "batteries." The retriever will fetch chunks based on this closeness, even if they don't explicitly state a partnership, leading the LLM to infer one.

#### Why the Naïve RAG Fails

The vector retriever will look for chunks that "sound" like the query. In our expanded document list, it's highly likely to retrieve a confusing context for the LLM.

The `top-k=3` chunks it finds will likely be:

1. "Panasonic has a long-standing partnership to manufacture batteries..." (Relevant: "Panasonic," "partnership," "batteries")
2. "Tesla develops electric vehicles and relies on advanced battery tech..." (Relevant: "Tesla," "battery")
3. "Toyota also manufactures batteries and has discussed battery technology..." (Relevant: "Toyota," "manufactures batteries")

When the LLM receives this context, it has "Panasonic," "Tesla," and "Toyota" all in a "battery" context. The chunk for Panasonic doesn't explicitly link it to Tesla. The chunk for Toyota also mentions batteries. The LLM, forced to synthesize an answer, may *incorrectly* infer a partnership that doesn't exist (like with Toyota) or state the facts without confirming the relationship.

#### Why the GraphRAG Succeeds

The knowledge graph isn’t vulnerable to this kind of "semantic bleed-over." It doesn’t care if nodes are "semantically near" each other.

Our `query_explicit_relation` function asks a very specific, structural question: "Start at the node **'Tesla'** and return *only* the nodes connected to it by an edge with the *exact label* **'partners_with'**".

The graph then traverses its edges and finds only one: `("Tesla", "Panasonic", {"label": "partners_with"})`. It is structurally impossible for it to hallucinate a partnership with "Toyota" because no such `partners_with` edge exists for Tesla in the graph.

```py
# Naive RAG
docs_s5 = [
    # --- The "Answer" Chunks (ambiguous) ---
    Document(page_content="Tesla develops electric vehicles and relies on advanced battery tech."),
    Document(page_content="Panasonic has a long-standing partnership to manufacture batteries for electric vehicles."),

    # --- "Noise" Chunks (to create a false signal) ---
    Document(page_content="Toyota also manufactures batteries and hybrid powertrains for its own vehicle lineup."),
    Document(page_content="Tesla, Panasonic, and Toyota are all major players in the EV and battery supply chain."),
    Document(page_content="A new partnership for solid-state batteries was announced, but it did not involve Tesla.")
]
query_s5 = "Who did Tesla partner with on batteries?"
rag_chain_s5 = create_rag_chain(docs_s5)
print(f"Naive RAG Answer: {rag_chain_s5.invoke(query_s5)}")
#
# GraphRAG Pattern
graph_s5 = KnowledgeGraph()
edges_s5 = [
    ("Tesla", "Panasonic", {"label": "partners_with"}),
    ("Toyota", "Toyota", {"label": "partners_with"}),
]
graph_s5.add_data(edges=edges_s5)
print(f"GraphRAG Answer: {graph_s5.query_explicit_relation('Tesla', 'partners_with')}")
```

```plaintext title="output"
Naive RAG Answer: Based on the context, Panasonic has a partnership to manufacture batteries, and Tesla relies on advanced battery tech. Toyota also manufactures batteries.
GraphRAG Answer: Tesla partnered with Panasonic.
```

---

## Final Thoughts

Standard RAG is an essential tool, but its strength is **retrieval, not reasoning**. It falters when true synthesis is required.

You may find that a powerful LLM like Gemini can still correctly answer some of the simple scenarios in this article. The five patterns shown here are meant to build intuition. They demonstrate what *can* and *does* go wrong as your knowledge base grows larger and more complex.

The real failure of naive RAG emerges as you feed it more and more conflicting, ambiguous, or incomplete information. This "noisy" context forces the LLM to either hallucinate connections or fail to reason altogether.

By moving from a "bag of chunks" to a structured Knowledge Graph, you build a more reliable and intelligent system. You give your system a "global memory" of how facts explicitly connect, allowing it to answer complex questions by traversing a verified path rather than just guessing from a cloud of semantically similar text.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Solve 5 Common RAG Failures with Knowledge Graphs",
  "desc": "You may have built a Retrieval-Augmented Generation (RAG) pipeline to connect a vector store to a powerful LLM. And RAG pipelines are incredibly effective at grounding models in factual, up-to-date knowledge. But if you've worked with them long enoug...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-solve-5-common-rag-failures-with-knowledge-graphs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
