---
lang: en-US
title: "How to Perform Sentence Similarity Check Using Sentence Transformers"
description: "Article(s) > How to Perform Sentence Similarity Check Using Sentence Transformers"
icon: fa-brands fa-python
category:
  - Python
  - PyTorch
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - torch
  - py-torch
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Perform Sentence Similarity Check Using Sentence Transformers"
    - property: og:description
      content: "How to Perform Sentence Similarity Check Using Sentence Transformers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-perform-sentence-similarity-check-using-sentence-transformers.html
prev: /programming/py-torch/articles/README.md
date: 2025-09-04
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756916978057/de0bda62-c9ea-48d1-b1ac-b78eb10e82d2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PyTorch > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-torch/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Perform Sentence Similarity Check Using Sentence Transformers"
  desc="Sentence similarity plays an important role in many natural language processing (NLP) applications.  Whether you build chatbots, recommendation systems, or search engines, understanding how close two sentences are in meaning can improve user experien..."
  url="https://freecodecamp.org/news/how-to-perform-sentence-similarity-check-using-sentence-transformers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756916978057/de0bda62-c9ea-48d1-b1ac-b78eb10e82d2.png"/>

Sentence similarity plays an important role in many natural language processing (NLP) applications.

Whether you build chatbots, recommendation systems, or search engines, understanding how close two sentences are in meaning can improve user experience – and this is what sentence similarity allows you to do.

[<VPIcon icon="fas fa-globe"/>Sentence Transformers](https://sbert.net/) make this process simple and efficient. In this guide, you will learn what sentence similarity is, how Sentence Transformers work, and how to write code to measure similarity between two sets of sentences.

---

## What Is Sentence Similarity?

Sentence similarity is the process of comparing two sentences to see how close they are in meaning. It does not look at the exact words but focuses on the meaning behind them.

For example:

- “The cat is sitting outside”
- “The dog is playing in the garden”

Both sentences talk about animals outdoors, so they share some similarity even though they use different words.

This kind of understanding is essential for tasks like document clustering, duplicate detection, or semantic search.

---

## Why Use Sentence Transformers

Traditional methods like [**Bag of Words**](/freecodecamp.org/how-bag-of-words-works.md) relied on simple word matching or frequency counts. But these fail when words differ but the meaning stays the same.

Sentence Transformers solve this by using transformer-based language models like [<VPIcon icon="fa-brands fa-wikipedia-w"/>BERT](https://en.wikipedia.org/wiki/BERT_%28language_model%29) or RoBERTa to create embeddings.

An [**embedding**](/freecodecamp.org/understanding-word-embeddings-the-building-blocks-of-nlp-and-gpts.md) is a list of numbers that represents the meaning of a sentence. When two embeddings are close together in this high-dimensional space, their sentences are similar in meaning.

The Sentence Transformers library in Python makes this easy by providing pre-trained models that can generate embeddings for sentences.

### Installing the Required Libraries

Before you start coding, make sure you install the required packages. Run this command to do so:

```sh
pip install -U sentence-transformers
```

This will install the Sentence Transformers library along with its dependencies.

---

## Loading a Pre-trained Model

Sentence Transformers offers several pre-trained models. For this example, you will use the **all-MiniLM-L6-v2** model. It’s lightweight, fast, and works well for most applications.

Here is how to load it in Python:

```py
from sentence_transformers import SentenceTransformer

# Load the model
model = SentenceTransformer("all-MiniLM-L6-v2")
```

Once loaded, this model can convert any sentence into its corresponding embedding.

---

## Defining Sentences to Compare

You need two lists of sentences for comparison. Here is an example:

```py
sentences1 = [
    'The cat sits outside',
    'A man is playing guitar',
    'The movies are awesome'
]

sentences2 = [
    'The dog plays in the garden',
    'A woman watches TV',
    'The new movie is so great'
]
```

Each sentence in `sentences1` will be compared with the sentence at the same position in `sentences2`.

---

## Converting Sentences into Embeddings

Now that you have sentences, you must convert them into embeddings using the model.

Add this code:

```py
# Convert sentences to embeddings
embeddings1 = model.encode(sentences1, convert_to_tensor=True)
embeddings2 = model.encode(sentences2, convert_to_tensor=True)
```

The `convert_to_tensor=True` argument tells the model to return [<VPIcon icon="iconfont icon-pytorch"/>PyTorch tensors](https://docs.pytorch.org/tutorials/beginner/introyt/tensors_deeper_tutorial.html), which work well with similarity calculations.

---

## Calculating Cosine Similarity

Once you have embeddings, you need a way to measure similarity. The [<VPIcon icon="fa-brands fa-youtube"/>cosine similarity](https://youtu.be/zcUGLp5vwaQ) metric is commonly used for this.

Cosine similarity looks at the angle between two vectors in a high-dimensional space. If the angle is small, the vectors are similar.

Add this code to compute similarity:

```py
from sentence_transformers import util
# Compute cosine similarity
cosine_scores = util.cos_sim(embeddings1, embeddings2)
```

Now `cosine_scores` contains the similarity score for each sentence pair.

---

## Printing the Results

To see the results clearly, format them like this:

```py
# Print formatted results
for i in range(len(sentences1)):
    print(f"{sentences1[i]} \t\t {sentences2[i]} \t\t Score: {cosine_scores[i][i]:.4f}")
```

This will print each sentence pair along with its similarity score.

::: info Sample Output

![If you run this code, you will see a result similar to the above.](https://cdn.hashnode.com/res/hashnode/image/upload/v1756385160047/576750a6-3c65-45e7-a634-f1e7375e7e16.png)

The third pair has the highest score because both sentences talk about movies in a positive way.

:::

---

## How to Interpret the Scores

The cosine similarity score ranges between **-1** and **1**.

- A score close to **1** means the sentences are very similar.
- A score near **0** means they are unrelated.
- Negative values mean the sentences are not related or even opposite in meaning.

In most real-world cases, you focus on values between 0 and 1. The higher the value, the closer the meanings.

---

## Real-World Applications of Sentence Similarity

Sentence similarity has become a core part of many modern applications because it helps systems understand meaning rather than relying on exact words. This shift makes search, analysis, and recommendations far more accurate and useful.

### Semantic Search

Traditional search engines depend on keyword matches. If the exact words are missing, results often become irrelevant. [Semantic search](https://en.wikipedia.org/wiki/Semantic_search) solves this problem by looking at the meaning behind a query.

For example, if someone searches for “best ways to learn guitar,” the system can return results for “top tips to play the guitar” even though the keywords differ. This makes search experiences smoother and more intelligent.

### Duplicate Detection

Large datasets often contain repeated or near-duplicate content. Manual checking is impossible when dealing with millions of records.

Sentence similarity automates this by detecting texts that carry the same meaning even if the wording changes slightly. This is especially useful in data cleaning, web scraping pipelines, or managing user-generated content.

### Recommendation Systems

Recommendation engines work best when they understand context. For instance, if a user likes articles about “healthy cooking,” the system can recommend content on “nutritious recipes” or “quick healthy meals” using similarity scores. This approach goes beyond surface-level keywords and finds deeper connections in the text.

### Chatbots and Virtual Assistants

Chatbots store a large set of possible user questions and answers. When someone types a new question, the system must find the most relevant response. By using sentence similarity, chatbots match user input with the closest existing query in meaning, not just words, leading to more accurate and natural conversations.

### Improving Performance with Larger Models

The [<VPIcon icon="iconfont icon-huggingface"/>`sentence-transformers/all-MiniLM-L6-v2`](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) model is fast and accurate for small to medium tasks.

For more accuracy, you can try larger models like [<VPIcon icon="iconfont icon-huggingface"/>`sentence-transformers/all-mpnet-base-v2`](https://huggingface.co/sentence-transformers/all-mpnet-base-v2), though they may require more memory and time to run.

Replace the model name in your code to use a different pre-trained model:

```py
model = SentenceTransformer("all-mpnet-base-v2")
```

---

## Conclusion

Sentence Transformers make it easy to measure sentence similarity using pre-trained models. By converting sentences into embeddings and comparing them with cosine similarity, you can build systems that understand meaning rather than relying on simple word matching.

With just a few lines of code, you can integrate this into chatbots, search engines, or recommendation systems and create more intelligent applications.

Hope you enjoyed this article. Signup for my free newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Perform Sentence Similarity Check Using Sentence Transformers",
  "desc": "Sentence similarity plays an important role in many natural language processing (NLP) applications.  Whether you build chatbots, recommendation systems, or search engines, understanding how close two sentences are in meaning can improve user experien...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-perform-sentence-similarity-check-using-sentence-transformers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
