---
lang: en-US
title: "How Does Cosine Similarity Work? The Math Behind LLMs Explained"
description: "Article(s) > How Does Cosine Similarity Work? The Math Behind LLMs Explained"
icon: fas fa-language
category:
  - AI
  - LLM
  - Python
  - Science
  - Mathematics
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - py
  - python
  - science
  - math
  - mathematics
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Does Cosine Similarity Work? The Math Behind LLMs Explained"
    - property: og:description
      content: "How Does Cosine Similarity Work? The Math Behind LLMs Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-does-cosine-similarity-work.html
prev: /ai/llm/articles/README.md
date: 2025-09-18
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758157868492/7d242ca0-7721-4d25-93fb-2f0a6e319690.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
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

```component VPCard
{
  "title": "Mathematics > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/math/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```


[[toc]]

---

<SiteInfo
  name="How Does Cosine Similarity Work? The Math Behind LLMs Explained"
  desc="When you talk to a large language model (LLM), it feels like the model understands meaning. But under the hood, the system relies on numbers, vectors, and math to find the relationships between words and sentences. One of the most important tools tha..."
  url="https://freecodecamp.org/news/how-does-cosine-similarity-work"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758157868492/7d242ca0-7721-4d25-93fb-2f0a6e319690.png"/>

When you talk to a large language model (LLM), it feels like the model understands meaning. But under the hood, the system relies on numbers, vectors, and math to find the [<VPIcon icon="fas fa-globe"/>relationships between words](https://turingtalks.ai/p/how-to-perform-sentence-similarity-check-using-sentence-transformers) and sentences.

One of the most important tools that makes this possible is cosine similarity. If you want to know how an LLM can judge that two sentences mean almost the same thing, cosine similarity is the key.

This article explains cosine similarity in plain language, shows the math behind it, and connects it to the way modern language models work. By the end, you will see why this simple idea of measuring angles between vectors powers search, chatbots, and many other AI systems.

---

## What Is Cosine Similarity?

Imagine you have two sentences. To a computer, they are not words but vectors, a long lists of numbers that capture meaning.

Cosine similarity measures how close these two vectors are, not by their length, but by the angle between them.

![Cosine Similarity](https://cdn.hashnode.com/res/hashnode/image/upload/v1757481567784/ccd74ce9-d561-47b5-a5e8-c3e77ed36e79.png)

Think of two arrows starting from the same point. If they point in the same direction, the angle between them is zero, and cosine similarity is one. If they point in opposite directions, the angle is 180 degrees, and cosine similarity is negative one. If they are at a right angle, the cosine similarity is zero.

So, cosine similarity tells us whether two vectors are pointing in the same general direction. In language tasks, this means it tells us whether two pieces of text carry a similar meaning.

---

## The Math Behind Cosine Similarity

To understand cosine similarity, we need to look at a bit of math. The cosine of an angle in geometry is the ratio between the dot product of two vectors and the product of their magnitudes. Written as a formula, cosine similarity looks like this:

```plaintext
cosine_similarity(A, B) = (A · B) / (||A|| * ||B||)
```

Here:

- `A · B` is the dot product of vectors A and B.
- `||A||` is the magnitude (length) of vector A.
- `||B||` is the magnitude of vector B.

The dot product multiplies corresponding numbers in the two vectors and adds them up. The magnitude of a vector is like finding the length of an arrow, using the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem).

This formula always gives a value between -1 and 1. A value close to 1 means the vectors are pointing in nearly the same direction. A value close to 0 means they are unrelated. A value close to -1 means they are opposite.

---

## A Simple Example

Let’s see a short example using Python. Suppose you want to check how similar two short texts are. We can use [<VPIcon icon="iconfont icon-scikit-learn"/>scikit-learn](https://scikit-learn.org/) to turn them into vectors and then compute cosine similarity.

```py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

texts = [
    "I love machine learning",
    "I love deep learning"
]

vectorizer = TfidfVectorizer().fit_transform(texts)
vectors = vectorizer.toarray()

similarity = cosine_similarity([vectors[0]], [vectors[1]])
print("Cosine similarity:", similarity[0][0])
```

The code starts by importing two important tools. `TfidfVectorizer` is responsible for turning text into numbers, while `cosine_similarity` measures how similar two sets of numbers are. Together, they let us compare text in a way a computer can understand.

Next, we define the sentences we want to compare. In this example, we use “I love machine learning” and “I love deep learning.” These two sentences share some words such as “I,” “love,” and “learning,” while differing in one word: “machine” versus “deep.” This makes them good examples to test, because they are clearly related but not exactly the same.

The vectorizer then builds a vocabulary from all the unique words across the two sentences. For these inputs, the vocabulary becomes `["deep", "learning", "love", "machine"]`. This means the program now has a list of all the words it will track when building the numerical representation of the sentences.

Each sentence is then converted into a vector, which is simply a list of numbers. These numbers are not just raw word counts. Instead, they are weighted using TF-IDF, which stands for [<VPIcon icon="fas fa-globe"/>Term Frequency–Inverse Document Frequency](https://learndatasci.com/glossary/tf-idf-term-frequency-inverse-document-frequency/).

TF-IDF gives more importance to words that matter in a sentence and less importance to very common words. In simplified form, the first sentence becomes something like `[0. 0.50154891 0.50154891 0.70490949]`, while the second becomes `[0.70490949 0.50154891 0.50154891 0. ]`. The numbers may look small, but what matters is their relative values.

The `.toarray()` method then converts these vectors into standard Python arrays. This makes them easier to handle, since the TF-IDF output is stored in a special sparse format by default.

Once the sentences are represented as vectors, cosine similarity is applied. This step checks the angle between the two vectors.

If the vectors point in exactly the same direction, their similarity score will be one. If they are unrelated, the score will be close to zero. If they point in opposite directions, the score will be negative.

In this case, because the two sentences share most of their words, the vectors point in a similar direction, so the cosine similarity falls somewhere around 0.5 to 0.7. In simple terms, this code shows how a computer can compare two sentences by turning them into vectors of numbers and then checking how close those vectors are. By using cosine similarity, the program can judge not just whether the sentences share words, but also how strongly they overlap in meaning.

---

## Cosine Similarity in Embeddings

In practice, LLMs like GPT or BERT do not use simple word counts. Instead, they use embeddings.

An [embedding](/freecodecamp.org/how-ai-agents-remember-things-vector-stores-in-llm-memory.md) is a dense vector that captures meaning. Each word, phrase, or sentence is turned into a set of numbers that place it in a high-dimensional space.

In this space, words with similar meaning are close together. For example, the embeddings for “king” and “queen” are closer than the embeddings for “king” and “table.”

Cosine similarity is the tool that allows us to measure how close two embeddings are. When you search for “dog,” the system can look for embeddings that point in a similar direction. That way, it finds results about “puppy,” “canine,” or “pet” even if those exact words are not in your query.

---

## How LLMs Use Cosine Similarity

Large language models use cosine similarity in many ways. When you ask a question, the model encodes your input into a vector. It then compares this vector with stored knowledge or with candidate answers using cosine similarity.

For semantic search, cosine similarity helps rank documents. A system can embed all documents into vectors, then embed your query and compute similarity scores. The documents with the highest scores are the most relevant.

In clustering, cosine similarity helps group sentences that have related meaning. In recommendation systems, it helps match users to items by comparing their preference vectors.

Even when generating answers, LLMs rely on vector similarity to decide which words or phrases best follow in context. Cosine similarity gives the model a simple but powerful way to measure closeness of meaning.

---

## Limits of Cosine Similarity

While cosine similarity is powerful, it has limits. It depends heavily on the quality of embeddings. If embeddings fail to capture meaning well, similarity scores may not reflect real-world closeness.

Also, cosine similarity only measures direction. Sometimes, magnitude contains useful information too. For example, a sentence embedding might have a length that reflects confidence. By ignoring it, cosine similarity may lose part of the picture.

Still, despite these limits, cosine similarity remains one of the most widely used methods in natural language processing.

---

## Why It Matters for LLMs

Cosine similarity is not just a math trick. It is a bridge between human language and machine understanding. It allows a model to treat meaning as geometry, turning questions and answers into points in space.

Without cosine similarity, embeddings would be less useful, and tasks like semantic search, clustering, and ranking would be harder. By reducing the problem to measuring angles, we make meaning measurable and usable.

Every time you search on Google, chat with an AI, or use a recommendation engine, cosine similarity is at work behind the scenes.

---

## Conclusion

Cosine similarity explains how LLMs judge the closeness of meaning between words, sentences, or even whole documents. It works by comparing the angle between vectors, not their length, which makes it ideal for text. With embeddings, cosine similarity becomes the foundation of semantic search, clustering, recommendations, and many other tasks in natural language processing.

The next time an AI gives you an answer that feels “close enough,” remember that a simple mathematical idea, measuring the angle between two arrows, is doing much of the heavy lifting.

::: info

Hope you enjoyed this article. Signup for my free AI newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also find [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Does Cosine Similarity Work? The Math Behind LLMs Explained",
  "desc": "When you talk to a large language model (LLM), it feels like the model understands meaning. But under the hood, the system relies on numbers, vectors, and math to find the relationships between words and sentences. One of the most important tools tha...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-does-cosine-similarity-work.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
