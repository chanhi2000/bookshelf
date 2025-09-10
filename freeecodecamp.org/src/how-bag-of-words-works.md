---
lang: en-US
title: "How Bag of Words Works - The Foundation of Language Models"
description: "Article(s) > How Bag of Words Works - The Foundation of Language Models"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Bag of Words Works - The Foundation of Language Models"
    - property: og:description
      content: "How Bag of Words Works - The Foundation of Language Models"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-bag-of-words-works.html
prev: /programming/py/articles/README.md
date: 2025-08-25
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756127722792/e047e9d2-91ae-42f6-85d9-106260ddf432.png
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

[[toc]]

---

<SiteInfo
  name="How Bag of Words Works - The Foundation of Language Models"
  desc="When people talk about modern AI, they often point to large language models like ChatGPT. These models seem smart, as they’re able to write, answer, and explain in natural language. But the roots of this technology go back to something very simple: t..."
  url="https://freecodecamp.org/news/how-bag-of-words-works"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756127722792/e047e9d2-91ae-42f6-85d9-106260ddf432.png"/>

When people talk about modern AI, they often point to large language models like ChatGPT.

These models seem smart, as they’re able to write, answer, and explain in natural language.

But the roots of this technology go back to something very simple: the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Bag of Words](https://en.wikipedia.org/wiki/Bag-of-words_model) model. This method, which first appeared decades ago, was one of the earliest ways to turn text into numbers. Without it, the progress we see in natural language processing today would not have been possible.

In this article, you’ll learn what the Bag of Words algorithm is and write your own code to create a function to generate a bag of words.

---

## What is Bag of Words?

Bag of Words, often called BoW, is a method for [**representing text**](/freecodecamp.org/how-computers-understand-language.md). It takes a sentence, paragraph, or document and treats it as a “bag” of words.

Word order, grammar, and sentence structure are ignored. Only the presence or frequency of each word matters.

Take the sentence

```plaintext
The cat sat on the mat.
```

In Bag of Words, it becomes a count of words.

```plaintext
the:2, cat:1, sat:1, on:1, mat:1.
```

Another sentence like this:

```plaintext
The mat sat on the cat
```

looks the same, even though the meaning is different.

This is both the strength and weakness of BoW. It makes text easy for computers to process but throws away context.

---

## Why BoW Was a Breakthrough

Before Bag of Words, computers had no easy way to handle human language. Words are not numbers, and algorithms need numbers to work.

BoW gave researchers a way to transform messy text into vectors of counts. Once in numeric form, words could be used in statistics, clustering, and machine learning.

Early applications included spam filters, where certain words like “free” or “win” signaled unwanted emails. Search engines also used it to match queries with documents. For the first time, text could be processed at scale.

---

## A Simple Bag of Words Example in Python

Here’s a short example to see Bag of Words in action. We’ll take a few sentences and convert them into word count vectors.

```py
from sklearn.feature_extraction.text import CountVectorizer
```

```py
docs = [
    "the cat sat on the mat",
    "the dog barked at the cat",
    "the mat was sat on by the cat"
]
```

```py
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(docs)
```

```py
print("Vocabulary:", vectorizer.get_feature_names_out())
print("Document-Term Matrix:\n", X.toarray())
```

It will give you the following result:

![Bag of Words](https://cdn.hashnode.com/res/hashnode/image/upload/v1755688011426/6e4e87bc-9f0e-4be4-a429-19a8ade70997.png)

What you’re seeing in the output is the Bag of Words model turning your sentences into numbers. The first line shows the vocabulary, which is the collection of every unique word that appeared across the three input sentences.

Words like “at,” “barked,” “cat,” “dog,” “mat,” “on,” “sat,” “the,” and “was” all become part of this dictionary. Each position in the vocabulary has a fixed order, and that order is used to map words to columns in the matrix.

The second part of the output is the document-term matrix. Each row in this matrix represents one document, and each number in the row tells you how many times the word from the vocabulary appeared in that document.

For example, in the first row, which corresponds to the sentence “the cat sat on the mat,” the values line up with the vocabulary to show that “the” appeared twice, while “cat,” “sat,” “on,” and “mat” each appeared once. Every other word in the vocabulary for that row is a zero, meaning it never showed up in that document.

This is the essence of Bag of Words. It reduces each sentence to a row of numbers, where meaning and grammar are ignored, and only the counts of words are kept. Instead of working with raw text, the machine now works with a structured table of numbers.

That simple idea is what made it possible for computers to start analyzing and learning from language.

---

## Where Bag of Words Falls Short

As useful as it was, Bag of Words has limits.

The most obvious one is that it ignores meaning. Sentences with reversed roles (“dog chases cat” vs. “cat chases dog”) end up with the same vector.

BoW also can’t handle synonyms well. Words like “happy” and “joyful” are treated as different, even though they mean the same thing.

Another problem is size. If the dataset has thousands of unique words, the vectors become very large and sparse. Most values are zeros, which makes storage and computation less efficient.

### From Bag of Words to Better Models

Bag of Words inspired better methods. One improvement was [<VPIcon icon="fas fa-globe"/>TF-IDF](https://geeksforgeeks.org/machine-learning/understanding-tf-idf-term-frequency-inverse-document-frequency/), which gave higher weight to rare but important words, and lower weight to common ones like “the.”

Later came [<VPIcon icon="fas fa-globe"/>word embeddings](https://turingtalks.ai/p/understanding-word-embeddings-the-building-blocks-of-nlp-and-gpts) such as Word2Vec and GloVe. Instead of counting words, embeddings map them into dense vectors where meanings and relationships are captured. Words like “king” and “queen” end up close together in this space.

Modern transformers, like BERT and GPT, push this even further. They not only capture word meaning but also context. The word “bank” in “river bank” and “money bank” will have different embeddings depending on the sentence. This is something Bag of Words could never do.

### Why Bag of Words Still Matters

Even today, Bag of Words is not useless. For small projects with limited data, it can still provide strong results.

A quick text classifier using BoW often works faster and requires less computing power than training a deep neural network. In teaching, it is also valuable because it shows the first step of turning raw text into machine-readable form.

More importantly, the core idea of Bag of Words lives on. Large language models still convert text into vectors. The difference is that they do it in a far more complex and meaningful way.

Bag of Words was the spark that made researchers realize: to process language, we must first represent it as numbers.

---

## Conclusion

Bag of Words looks simple, maybe even primitive, compared to the tools we use now. But it was a turning point. It gave computers a way to see text as data, and it laid the foundation for everything that came after. While it can’t capture deep meaning or context, it taught us how to bridge the gap between words and numbers.

Large language models may seem like magic, but their roots go back to Bag of Words. The journey from counting words in a sentence to transformers with billions of parameters is proof that big revolutions in technology often start with small, simple ideas.

*Hope you enjoyed this article. Signup for my free AI newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also find me on [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva).*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Bag of Words Works - The Foundation of Language Models",
  "desc": "When people talk about modern AI, they often point to large language models like ChatGPT. These models seem smart, as they’re able to write, answer, and explain in natural language. But the roots of this technology go back to something very simple: t...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-bag-of-words-works.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
