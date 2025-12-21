---
lang: en-US
title: "Machine Learning Tutorial: How to Program Without Creating Your Own Algorithms"
description: "Article(s) > Machine Learning Tutorial: How to Program Without Creating Your Own Algorithms"
icon: iconfont icon-cpp
category:
  - C++
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c++
  - cpp
  - c-plus-plus
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Machine Learning Tutorial: How to Program Without Creating Your Own Algorithms"
    - property: og:description
      content: "Machine Learning Tutorial: How to Program Without Creating Your Own Algorithms"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/machine-learning-tutorial-how-to-program-without-creating-your-own-algorithms.html
prev: /programming/cpp/articles/README.md
date: 2025-10-10
isOriginal: false
author:
  - name: Mark Mahoney
    url : https://freecodecamp.org/news/author/markm208/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760024939823/c2c53158-a2ec-4fe2-b222-236bef773e6b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C++ > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Machine Learning Tutorial: How to Program Without Creating Your Own Algorithms"
  desc="Recreating the First Machine Learning Demo In 1958, Frank Rosenblatt demonstrated something remarkable to reporters in Washington, D.C. His ”perceptron” could look at cards with shapes on them and tell which side the shape was on. The remarkable thin..."
  url="https://freecodecamp.org/news/machine-learning-tutorial-how-to-program-without-creating-your-own-algorithms"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760024939823/c2c53158-a2ec-4fe2-b222-236bef773e6b.png"/>

## Recreating the First Machine Learning Demo

In 1958, [<VPIcon icon="fa-brands fa-wikipedia-w"/>Frank Rosenblatt](https://en.wikipedia.org/wiki/Frank_Rosenblatt) demonstrated something remarkable to reporters in Washington, D.C. His "[<VPIcon icon="fa-brands fa-wikipedia-w"/> perceptron](https://en.wikipedia.org/wiki/Mark_I_Perceptron)" could look at cards with shapes on them and tell which side the shape was on. The remarkable thing about this was that the system wasn't explicitly programmed how to do this – it learned how to do it by looking at examples.

In traditional systems, a programmer thinks about a program’s inputs and comes up with data structures and algorithms to solve the problem and produce valuable outputs. The human programmer is the star of the show.

Machine learning systems don’t require that a programmer specify **how** to solve a problem. With [<VPIcon icon="fa-brands fa-wikipedia-w"/> supervised machine learning](https://en.wikipedia.org/wiki/Supervised_learning), the system’s **inputs and outputs** are used to **train** the system. This is a fundamental shift in building systems so that they can recognize patterns in fresh inputs and predict outputs. **Learning** is the star of the show.

This [<VPIcon icon="fas fa-globe"/>code playback](https://playbackpress.com/books/cppbook/chapter/12/3) recreates Rosenblatt's experiment using modern object-oriented programming techniques. You'll see two solutions to the same problem. The first uses traditional programming where I come up with an algorithm to solve the problem. The other is a very simple use of machine learning that **learns** how to solve the problem.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759643953052/d58b6769-0f08-42c7-b228-3e73d9ce541b.png)

---

## The Problem

Each card has a rectangular shape on either the left or right side of it. In Rosenblatt’s original demo, the cards are photographed and then turned into 20x20 pixel images. In this program, I simulate the cards and the images. The program’s job is to look at new cards and predict which side the shape is on.

---

## The Traditional Approach

The [<VPIcon icon="fas fa-globe"/>code playback](https://playbackpress.com/books/cppbook/chapter/12/3) starts with a solution that I came up with. I thought about the inputs to the system, 400 pixels from an image, and developed an algorithm to count the active pixels on each side of it. Whichever side has more pixels is the side that I ‘predict’ has the shape.

This works well. All 500 test cards get predicted correctly. But I had to tell the computer exactly what to do.

---

## The Machine Learning Approach

Next comes the perceptron, it was one of the first examples of machine learning. It is given many different inputs (400 pixel images) and outputs (labels associated with each card that states which side the shape is on). The perceptron takes the inputs and outputs and learns how to predict where a shape is.

As the programmer, I don’t tell it how to do this. I set up the program so that it can learn from the examples it sees during training.

My perceptron uses 400 weights (one for each pixel position). Initially, all of the weights are set to zero. The perceptron makes predictions by multiplying each pixel value by its corresponding weight value, then summing everything up. If the sum is negative, it will predict left. Otherwise, it will predict right.

The perceptron trains on labeled examples. When it makes a wrong prediction, it learns by adjusting the relevant weights. After training, it does a really good job of predicting test cards correctly.

::: info What You'll Learn

The [<VPIcon icon="fas fa-globe"/>code playback](https://playbackpress.com/books/cppbook/chapter/12/3) walks you through:

- Creating the card representation and pixel data
- Implementing the non-AI solution (so you can see the traditional approach)
- Building a perceptron class with weights
- Understanding the prediction mechanism (sum of products)
- Seeing how training updates the weights based on errors
- Watching the weights evolve from random values to learned patterns
- Understanding why some initial approaches fail and how to fix them

You'll see the actual weight values after training. Some patterns are obvious. Some are surprising. The playback challenges you to understand and explain these patterns.

:::

::: important Why This Matters

This is one of the simplest examples of machine learning that you can study. The perceptron is essentially a single neuron. Modern neural networks stack many neurons in layers. They can learn vastly more complex patterns, but the core idea is the same. This is a great way to begin your journey if you want to learn about neural networks, machine learning, and AI.

:::

::: info Interactive Learning

```component VPCard
{
  "title": "Machine Learning with a Perceptron",
  "desc": "In 1958, Frank Rosenblatt demonstrated one of the first examples of machine learning to reporters in Washington, D.C*. He called it a 'perceptron'.",
  "link": "https://playbackpress.com/books/cppbook/chapter/12/3",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

The playback includes a few challenges by asking some questions along the way. Can you figure out how many training examples are actually needed? When does the perceptron stop making mistakes during training? The code is available for you to download and experiment with, allowing you to recreate a piece of AI history. Rosenblatt's perceptron is where it all began.

The code playback medium is different from traditional videos or tutorials. You are guided through the code with a narrative and you get to see my thought processes. If you like this format, I have even more free content on my site, [<VPIcon icon="fas fa-globe"/>Playback Press](https://playbackpress.com/books). Feel free to share your comments, questions, or feedback via email: [<VPIcon icon="fas fa-envelope"/>`mark@playbackpress.com`](mailto:mark@playbackpress.com).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Machine Learning Tutorial: How to Program Without Creating Your Own Algorithms",
  "desc": "Recreating the First Machine Learning Demo In 1958, Frank Rosenblatt demonstrated something remarkable to reporters in Washington, D.C. His ”perceptron” could look at cards with shapes on them and tell which side the shape was on. The remarkable thin...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/machine-learning-tutorial-how-to-program-without-creating-your-own-algorithms.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
