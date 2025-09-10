---
lang: en-US
title: "What is Vector Search? A Concise Guide"
description: "Article(s) > What is Vector Search? A Concise Guide"
icon: fas fa-language
category:
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is Vector Search? A Concise Guide"
    - property: og:description
      content: "What is Vector Search? A Concise Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/what-is-vector-search-a-concise-guide.html
prev: /articles/README.md
date: 2025-04-12
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_137.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is Vector Search? A Concise Guide"
  desc="Vector search finds information based on meaning rather than exact keywords, delivering more intuitive results by converting content into numerical vectors that capture semantic relationships."
  url="https://milanjovanovic.tech/blog/what-is-vector-search-a-concise-guide"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_137.png"/>

**Vector search** is changing how we find information. Unlike old search methods that look for exact words, vector search finds content based on meaning. This makes search results more helpful and human-like.

When you search for "quick healthy breakfast ideas," vector search can find articles about "nutritious morning meals" even if they don't use your exact words. This happens because vector search understands what you mean, not just what you type.

In this week's newsletter, we'll break down how vector search works and why it's important.

---

## Understanding Vector Embeddings

At the heart of vector search are **vector embeddings**. These are lists of numbers that represent data. But how do we get from words or images to numbers?

Here's how it works:

1. We feed text, images, or other data into a [**large language model (LLM)**](/milanjovanovic.tech/working-with-llms-in-dotnet-using-microsoft-extensions-ai.md)
2. The LLM turns each piece of data into a list of numbers (a vector)
3. These numbers capture the meaning of the data
4. Similar things get similar number patterns

![Vector space visualization.](https://milanjovanovic.tech/blogs/mnw_137/vector_space.png?imwidth=1080)

Think of each number in the vector as describing one aspect of the data. With hundreds or thousands of these numbers, vectors can capture complex meanings and relationships.

For example, in vector form, the words "lion" and "bobcat" would have similar number patterns because they refer to similar animals. Meanwhile, "cat" would have a different pattern, though still somewhat similar since it's also a feline.

---

## How Vector Search Works

When you search using vector search:

1. Your search question gets turned into a vector
2. The system compares this vector to all the vectors in its database
3. It finds the vectors that are most similar to your search vector
4. It returns the data connected to those similar vectors

To find similar vectors, the system measures how close they are to each other. Think of each vector as a point in space - the closer two points are, the more similar their meanings.

![Vector search visualization.](https://milanjovanovic.tech/blogs/mnw_137/vector_search.png?imwidth=3840)

### Vector Databases

To make vector search work well with lots of data, we need special storage systems called **vector databases**. These databases are built to store and quickly search through millions or billions of vectors.

Vector databases do more than just store vectors - they organize them in smart ways that make searching faster. They use special methods called "Approximate Nearest Neighbor" (ANN) algorithms that can find similar vectors without checking every single one in the database.

![Vector databases landscape.<br/><Source: [<VPIcon icon="fas fa-globe"/>What are Vector Databases? A Beginner's Guide](https://infracloud.io/blogs/vector-databases-beginners-guide/)>](https://milanjovanovic.tech/blogs/mnw_137/vector_databases_landscape.png?imwidth=3840)

These databases also store the original content along with its vector, so when you get search results, you see the actual text, images, or other data you were looking for. Popular vector databases include Weaviate, Pinecone, and Qdrant. But you can also turn PostgreSQL into a vector database using the pgvector extension.

The combination of vector embeddings and vector databases makes search extremely fast, even with millions of items to search through. This speed makes vector search practical for real-world applications where users expect instant results.

---

## Key Differences from Traditional Search

Traditional keyword search works like this:

- You type "red shoes"
- The system finds pages with the words "red" and "shoes"
- Results that mention these words more often rank higher

This approach has problems:

- It misses related terms ("scarlet footwear")
- It doesn't understand context
- It can't handle questions well

An improvement to keyword search is [**full-text search**](/milanjovanovic.tech/how-i-implemented-full-text-search-on-my-website.md), which looks at the whole text of documents. However, this still has some shortcomings that vector search solves.

Vector search fixes these issues by focusing on meaning rather than exact words. It can:

- Find content with related concepts
- Understand the context of your search
- Return helpful results even for complex questions

This is why vector search powers many modern AI applications. It helps chatbots find relevant information and makes recommendation systems more accurate.

---

## Summary

Vector search represents a major step forward in how computers understand and retrieve information. By converting data into number patterns that capture meaning, vector search can find connections that keyword search would miss.

This technology is behind many of the smart search features we now take for granted - from finding similar products in online stores to helping AI assistants answer our questions. As AI continues to advance, vector search will play an increasingly important role in helping us navigate the growing sea of digital information.

While not perfect, vector search bridges the gap between how computers store data and how humans think about meaning - making our digital tools more helpful and intuitive to use.

In a future newsletter, we'll dive into the practical side of vector search. You'll learn how to implement your own vector search system using popular tools and libraries, with step-by-step code examples and best practices.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Vector Search? A Concise Guide",
  "desc": "Vector search finds information based on meaning rather than exact keywords, delivering more intuitive results by converting content into numerical vectors that capture semantic relationships.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/what-is-vector-search-a-concise-guide.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
