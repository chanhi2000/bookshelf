---
lang: en-US
title: "CNNs, RNNs, and Transformers Explained: A Mental Model for Key Deep Learning Concepts"
description: "Article(s) > CNNs, RNNs, and Transformers Explained: A Mental Model for Key Deep Learning Concepts"
icon: fas fa-language
category:
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CNNs, RNNs, and Transformers Explained: A Mental Model for Key Deep Learning Concepts"
    - property: og:description
      content: "CNNs, RNNs, and Transformers Explained: A Mental Model for Key Deep Learning Concepts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/cnns-rnns-and-transformers-explained-a-mental-model-for-key-deep-learning-concepts.html
prev: /ai/llm/articles/README.md
date: 2026-07-14
isOriginal: false
author:
  - name: Roland Sankara
    url: https://freecodecamp.org/news/author/Roland-Sankara/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/edd06632-76da-42f9-b741-e249d22c5f29.png
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

[[toc]]

---

<SiteInfo
  name="CNNs, RNNs, and Transformers Explained: A Mental Model for Key Deep Learning Concepts"
  desc="Okay, pop quiz: What is a neural network? What is deep learning? Does anything come to mind? I know that feeling – yes, that thing you’re feeling now. It’s either confidence that you know what I’m ask"
  url="https://freecodecamp.org/news/cnns-rnns-and-transformers-explained-a-mental-model-for-key-deep-learning-concepts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/edd06632-76da-42f9-b741-e249d22c5f29.png"/>

Okay, pop quiz: What is a neural network? What is deep learning? Does anything come to mind?

I know that feeling – yes, that thing you’re feeling now. It’s either confidence that you know what I’m asking, or the lack of it. Worry not, buddy: I’ve got you.

In this tutorial, I’ll explain all you need to know about deep learning, neural networks, and why I think you need to know about a fancy tool called Keras.

::: note Prerequisites

This is a conceptual article, so you don't need any deep learning background to follow along. That's exactly what you'll be gaining here.

Basic Python familiarity is helpful but not required for this article. But if you'd like to get hands-on with Keras afterward, having Python 3.9+ and pip installed will make it easy to start experimenting.

:::

---

## What is Deep Learning?

To explain Deep Learning to you, I assume that you're already familiar with what [<VPIcon icon="iconfont icon-ibm"/>AI (Artificial Intelligence)](https://ibm.com/think/topics/artificial-intelligence) & [<VPIcon icon="iconfont icon-ibm"/>ML (Machine Learning)](https://ibm.com/think/topics/machine-learning) are all about. These terms are likely not new to your ears, especially these days.

But maybe just to summarise: AI is a technology that enables computers to simulate human cognitive abilities such as learning and comprehension, problem-solving, creativity, and autonomy.

ML is a subset of artificial intelligence. It deals with the development of algorithms that can recognize patterns and learn from training data and subsequently make accurate inferences on new data without explicitly being programmed to do so.

[<VPIcon icon="iconfont icon-ibm"/>Deep Learning](https://ibm.com/think/topics/deep-learning) is a subset of machine learning that's driven by multilayered neural networks whose design is inspired by the structure of the human brain.

Take a look at the diagram below for a visual understanding of how these concepts are layered:

![Diagram showing the relationship between AI, ML and DL<br/>Image Source: [<VPIcon icon="fas fa-globe"/>Research Gate](https://researchgate.net/)](https://miro.medium.com/v2/resize:fit:745/0*Y--MUM5bd3C7zJaP)

According to a book I’m currently reading titled [<VPIcon icon="fas fa-globe"/>Deep Learning in Python](https://manning.com/books/deep-learning-with-python-second-edition) by [<VPIcon icon="fas fa-globe"/>François Chollet](https://manning.com/authors/francois-chollet), the **word “Deep”** in Deep Learning isn’t a reference to any kind of deeper understanding achieved by this concept. Rather, it stands for this idea of successive layers of representations of data. These layers of representations are learned via models called neural networks, structured in literal layers stacked on top of each other.

Check out the image below for a vivid example of this layering:

![Diagram illustrating a neural network<br/>Image Source — [<VPIcon icon="fas fa-globe"/>Research Gate](https://researchgate.net)](https://miro.medium.com/v2/resize:fit:875/1*UpmQ8gZuWahzr8B6PkRueA.jpeg)

An interesting assumption Chollet also clears up is that Deep Learning models (Neural Networks) aren’t models of the brain. Rather, it's just that some central parts of deep learning were inspired by our understanding of the brain, in particular the visual cortex.

But do you know what the visual cortex is? 😅 See the image below (the circled green part):

![Image of the human brain, illustrating the position of the visual cortex](https://miro.medium.com/v2/resize:fit:875/1*f678xW6ooQ5pamaugbXtWA.jpeg)

The visual cortex is the part of the brain that processes what your eyes see. [<VPIcon icon="fas fa-globe"/>In the 1960s, neuroscientists Hubel and Wiesel](https://the-scientist.com/a-serendipitous-shadow-brought-the-brain-s-visual-pathways-to-light-73037) discovered something surprising while studying it: neurons deeper in the visual cortex didn't respond to whole objects directly. Instead, the earliest neurons fired only for simple things, like a line at a specific angle. Only in later stages did neurons combine those simple signals into a response for more complex shapes.

In other words, the brain builds up "seeing an object" in stages — simple patterns first, complexity later. That stage-by-stage structure is the loose inspiration for how CNNs stack layers of filters, which we'll get to shortly.

Now that you have the hang of this, let’s explore the interesting and mind-boggling concept of neural networks.

::: note

neural networks are only mind-boggling at the start because they're a new concept. Once you take some time to understand them, they'll be easier to comprehend.

:::

---

## So What Are Neural Networks?

For starters, a neural network is a concept in deep learning. The “neural” in the name is derived from the neurons of the human brain.

A neural network consists of **connected units or nodes called artificial neurons**, which loosely model the neurons in the brain.

Here is the serious and technical definition:

> A neural network is a machine learning model that stacks simple “neurons” in layers and learns pattern-recognizing weights and biases from data to map inputs to outputs. ([<VPIcon icon="iconfont icon-ibm"/>*Excerpt from IBM Blog*](https://ibm.com/think/topics/neural-networks))

Now here's the easier and more fun definition:

A Neural network is just a machine for making guessing/pattern recognition/analysis mistakes smaller, one small correction at a time.

Neural Networks come in various architectures/types such as;

1. CNNs (Convolutional Neural Networks)
2. RNNs (Recurrent Neural Networks)
3. Transformers

We’ll explore these later in this article, so for now, just understand that what makes them different is simply what they choose to focus on before they guess or recognize a pattern or provide an analysis.

---

## An Analogy for How Neural Networks Work

![Image of a person throwing a dart blindfolded<br/>[<VPIcon icon="fas fa-globe"/>Image Source](https://sportbible.com/boxing/mike-tyson-darts-661968-20240405)](https://miro.medium.com/v2/resize:fit:875/1*Qb7gfYItDPcaekEjkNG6iw.jpeg)

Imagine you’re learning to throw darts blindfolded and someone can tell you one thing after each throw. For example, **“You're 6 inches too far left and 2 inches too low”.** You're not told why or given a lecture on your positioning for the aim or your grip of the dart. You just get a distance & direction correction.

So you nudge (a light shift or twist) your arm angle a little based on that correction feedback and your throw again and get a new correction. You then nudge again and again and againnnn(!) until you hit the target.

Over time, as you do this, your arm **“learns”** (underline this) – not because anyone explained dart throwing physics to you, but because **every throw gave you a tiny specific correction** and you kept applying corrections in the direction that shrank your possibility of missing the target.

That’s exactly how neural networks work.

Let’s now learn the technical jargon that we’d use to talk about neural networks from the analogy above.

The instruction or signal “Nudge your arm this much and this way” is what [<VPIcon icon="fas fa-globe"/>we call the **Gradient**](https://milvus.io/ai-quick-reference/what-is-the-role-of-gradients-in-training-neural-networks). The gradient indicates the direction and size/distance/rate to make the correction, along with the rate at which the weights and biases should be adjusted to decrease the loss function.

The correction detail, for example 6 Inches too far to the left, [<VPIcon icon="fas fa-globe"/>is the loss](https://milvus.io/ai-quick-reference/what-is-a-loss-function-in-a-neural-network). A loss function in a neural network is a mathematical tool that measures how well the model’s predictions align with the actual target values.

When you keep applying corrections in the direction that shrinks the miss or error, we call that **Gradient Descent**. This is the optimization algorithm (the step-by-step process) that a neural network uses to figure out which direction to move and how big a distance (step size) to take to reach that accurate value. In this context, **descent** means exactly what it means in plain English: the act of moving downward.

Your arm's muscle memory adjusting is the [<VPIcon icon="fas fa-globe"/>weight update](https://coursera.org/articles/neural-network-weights). **Weights are numerical values** that help each node within a network make decisions by determining which factors are more important than others.

::: note 📍

Now… Pause and let that sink in. You can re-read this analogy once again if you want to before you proceed.

:::

---

## What Are CNNs, RNNs, and Transformers?

I hope you’re still with me here… because you need to understand these terms, too. Remember from earlier that CNNs, RNNs, and Transformers are simply architectures or different types of neural networks. They have the same learning process, similar to the analogy of throwing darts while blindfolded: they all have the **guess then measure-error/loss then nudge** loop underneath.

The difference is what information they choose to focus on before they make a guess/prediction/give an output.

::: info Let me break it down for you:

- **CNNs** (Convolutional Neural Networks) only look at the small nearby patch and analyze it, then move to the next patch. Think of it as only seeing the dart board through a small tube pointed at one spot.
- **RNNs** (Recurrent Neural Networks) only look at things in order and remember a running summary as it goes. Think of it like reading a story left to right and updating your mental summary of the plot after each sentence.
- With **Transformers**, the neural network looks at everything all at once and figures out on the fly what matters most. Think of it like reading the whole page in one glance and deciding which words connect with each other.

:::

Let’s take a deeper look at each type of neural network.

---

## How CNNs Work

This is a type of neural network built for data that has spatial structure, such as images. It works with a small grid of numbers called a filter (for example, 3x3). Those numbers are weights, which are initially just random and don’t mean anything

Through the guess, measure error, nudge loop, those random numbers gradually become good at reacting strongly to a specific pattern in the image, for example a vertical edge, a certain color, and so on.

::: note

No one tells the filter what to look for. It discovers that on its own through training, the same way every other weight in every network we discuss here does.

:::

That filter then slides across the image a few pixels at a time, and at each position it looks at a small path and produces a single number. This is a measure of how strongly the patterns the filter has learned to detect show up there.

When the filter has slid across the whole image, you get a grid of numbers which really just show a map of where the detected pattern shows up across the image.

::: note

The same filter with the same numbers is reused at every single position via a technique called parameter sharing. Hence the efficiency of CNNs

:::

See the below example of filters sliding over an image matrix:

![Illustration of how filters in CNN work<br/>[<VPIcon icon="fas fa-globe"/>Image Source](https://towardsdatascience.com/)](https://miro.medium.com/v2/resize:fit:875/0*ZVvqs5LLquoq8exD.png)

In real CNNs, layers of filters are stacked on top of each other, and each layer builds on the previous one's output. Early layers, working directly on the raw pixels, tend to pick up very simple things, like edges or a patch of color. Because the next layer looks at the output of the first layer rather than raw pixels, it can combine those simple edges into slightly more complex shapes, like a curve or a corner.

Layer by layer, this keeps compounding: shapes combine into parts (like an ear or a whisker shape), and parts combine into something the network can recognize as a whole object, like a cat.

That's the real payoff of stacking filter layers: none of it happens in one step, and each layer only ever has to solve a slightly harder version of the same small problem.

Here's an image that illustrates the whole CNN process:

![Illustration of CNN Process<br/>[<VPIcon icon="fas fa-glopbe"/>Image Source](https://teachfloor.com/blog/convolutional-neural-network)](https://miro.medium.com/v2/resize:fit:875/0*VSkYr02_3VCWmxi4)

Use cases of CNNs include:

- **Medical Imaging:** CNNs analyze medical scans, such as chest X-rays, and assist clinicians by flagging potential abnormalities for review.
- **Image Generation:** CNNs can create new images or manipulate existing ones.
- **Autonomous Systems:** CNNs can be used in autonomous systems such as self-driving cars for lane detection, obstacle detection, and traffic sign recognition.

::: info

You can [**learn more here**](/towardsdatascience.com/using-convolutional-neural-network-for-image-classification-5997bfd0ede4.md).

<SiteInfo
  name="Breaking down Convolutional Neural Networks: Understanding the Magic behind Image Recognition | Towards Data Science"
  desc="An in-depth look at the architecture and inner workings of CNNs for successful image classification and object recognition."
  url="https://towardsdatascience.com/using-convolutional-neural-network-for-image-classification-5997bfd0ede4//"
  logo="https://towardsdatascience.com/wp-content/uploads/2025/02/cropped-Favicon-192x192.png"
  preview="https://towardsdatascience.com/wp-content/uploads/2021/12/1Z3-wzrhNj0QplkOcLFGmeQ-scaled.jpeg"/>

:::

::: note

Now, pause and take note of the key things that matter: filters & parameter sharing.

:::

---

## How RNNs Work

RNNs handle data that's sequentially ordered, where the order itself carries meaning. Think audio data and sentences that come together to form a story.

Unlike CNNs, which slide over patches of an image in no particular order, RNNs need to read things one step at a time.

For example, a sentence is read one word at a time in sequence because what’s reviewed earlier affects how the neural network understands what comes next. This sequential flow makes it slow to review large datasets.

RNNs keep a running summary called a [**hidden state**](https://apxml.com/courses/rnns-and-sequence-modeling/chapter-2-rnn-fundamentals/role-of-hidden-state)**.**

::: note

Think of it as a small notebook where it jots down everything important that it's understood so far. At the very start, before reading anything, that notebook is essentially blank (an initial hidden state, usually all zeros).

:::

Here's a simple architecture:

![Diagram of RNN Architecture<br/>[<VPIcon icon="fas fa-globe"/>Image Source](https://murf.ai/ai-glossary/recurrent-neural-network)](https://miro.medium.com/v2/resize:fit:875/0*cZvjbHcipzLE_vdw.png)

So the hidden state is never a lookup table of everything the RNN has seen. It’s a single running summary that gets overwritten at every step, carrying forward only what the network has learned is worth keeping.

::: note

The downside to RNNs is that if the sequence is long, early information reviewed can fade out almost entirely, which causes the RNN to lose the context of earlier review content. This problem in RNNs is called the [<VPIcon icon="fas fa-globe"/>vanishing gradient problem](https://milvus.io/ai-quick-reference/what-is-the-vanishing-gradient-problem).

:::

::: tip Use cases of RNNs include

- **Speech Recognition:** RNNs are used in speech recognition systems to process audio over time. They help models understand how sounds form words and sentences.
- **Voice AI Systems:** In voice workflows, RNNs help process sequential audio data. Combined with technologies like text-to-speech (TTS), they contribute to natural voice generation pipelines.
- **Time-Series Prediction:** In finance or weather forecasting, RNNs analyze past data to predict future outcomes using probabilistic methods.
- **Text Generation:** RNNs can generate text by predicting the next word based on previous words. This is useful in chatbots and tools powered by generative AI.

:::

::: info

[<VPIcon icon="fa-brands fa-youtube"/>Here's a video](https://youtu.be/Gafjk7_w1i8?si=dwtNujl5ki6lc9PN) you can watch to learn more about RNNs.

<VidStack src="youtube/Gafjk7_w1i8" />

:::

::: note

Now, pause and take note of the key things that matter: hidden state and the vanishing gradient which is a downside to RNNs.

:::

---

## How Transformers Work

In 2017, a group of researchers at Google Brain published a short but world-shaking paper: [<VPIcon icon="fas fa-globe"/>“Attention Is All You Need.”](https://papers.nips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf)

It introduced **the Transformer,** a new architecture for processing language that quietly changed how AI engineering is done. Since then, Transformers have become the backbone of nearly every major Large Language model, including [<VPIcon icon="fas fa-globe"/>Gemini](https://zapier.com/blog/google-gemini/).

Here is the simplified architecture:

![Simplified Architecture of a Transformer<br/>[Image source (<VPIcon icon="fa-brands fa-medium"/>`@theaveragegal`)](https://medium.com/@theaveragegal/transformer-architecture-simplified-3fb501d461c8)](https://miro.medium.com/v2/resize:fit:875/0*LqCw3l0LoRio8V-D.png)

In a nutshell, transformers take in a bunch of data at the same time (unlike RNNs that take in data in a sequential order).

Transformers are premised on a couple key concepts. First, there's [<VPIcon icon="fas fa-globe"/>self-attention](https://datacamp.com/blog/self-attention), where every element of data has **a positional encoding** that helps the transformer know the ordering of the elements. Second, there's **embeddings** that help capture the meaning of each word and the contextual relationship between all the data elements. Embeddings make it easy for the transformer to process data faster compared to other kinds of neural networks.

::: note

the transformer architecture reduces the vanishing gradient problem that's present with the RNNs.

:::

::: tip Use cases of transformers include

- **NLP (Natural Language Processing) Tasks:** The self-attention mechanism enhances the linguistic capabilities of machine learning models by allowing the efficient and complete analysis of an entire text.
- **Computer Vision:** Developments in image-recognition models suggest that self-attention is a crucial component to increase their robustness and generalization.

:::

::: info

You can [<VPIcon icon="fa-brands fa-youtube"/>learn more about Transformers from this video](https://youtu.be/KMHkbXzHn7s?si=x3v6xijzAaEyAnXV).

:::

::: note

Now, pause and take note of the key things that matter: self-attention, embeddings, positional encoding, and the fact that data is ingested and processed at the same time.

:::

---

## Keras For Building ML Models

![Keras Logo<br/>[<VPIcon icon="fas fa-globe"/>Image Source](https://keras.io/keras_3/)](https://miro.medium.com/v2/resize:fit:875/0*XLNut9dQlFUNUq_z.png)

Now that you understand the various types of neural networks and the use cases for each, you’re probably wondering how you can start building models.

### What is Keras?

There are many options, but the one tool that I’ve come to appreciate the most is Keras. It's been used in projects such as the Google [<VPIcon icon="fas fa-globe"/>YouTube Recommendation Engine](https://blog.youtube/inside-youtube/on-youtubes-recommendation-system/) and the [<VPIcon icon="fas fa-globe"/>Waymo self-driving fleet](https://waymo.com/).

Keras is an open-source, high-level neural network API that's designed to be user-friendly, modular, and extensible. It was initially developed independently and could run on top of backends like TensorFlow, Theano, or CNTK.

Since 2019, it has been the official high-level API of TensorFlow (TensorFlow 2.0+), offering high-level APIs (Sequential and Functional) and built-in support for common layers, optimizers, and loss functions.

::: note

In short, Keras allows you to quickly and easily build AI/ML models.

:::

Keras provides a complete toolkit for building deep learning models. It’s never been easier to build, train, evaluate, and deploy deep learning models.

### The New Version — Keras 3.0

A significant recent development is [<VPIcon icon="iconfont icon-keras"/>Keras 3.0](https://keras.io/keras_3/). It’s a full rewrite that lets Keras workflows run on top of multiple backends, like JAX, TensorFlow, PyTorch, and OpenVINO (inference-only), instead of being tied to TensorFlow alone.

::: note

Here’s what makes Keras genuinely different from just being “another way to write neural network code”:

- It doesn’t just let you build a CNN, an RNN, or a Transformer. It lets you build all three using the **same pattern.**
- The training loop wrapping them- the same guess, measure error, nudge loop we’ve talked about throughout this entire article never changes. Keras is really just one consistent way of expressing that loop, no matter which architecture you’re pointing it at.

:::

You write your model once, and you can pick the framework that suits you best. You can also switch from one to another based on your current goals without rewriting the model itself.

And the flexibility isn’t just theoretical. It matters for performance, too.

In Keras’s own benchmarks, JAX typically delivers the best training and inference performance on GPU, TPU, and CPU, though results vary from model to model.

::: note

Being able to swap backends without touching your model code means you’re not locked into whichever framework happened to be fastest when you started the project.

:::

---

## Wrapping Up

I’ll pack it in at this. I hope you now have a good understanding of CNNs, RNNs, Transformers, and where the Deep Learning framework Keras falls into all this.

That's the mental model: one learning process, three architectures shaped by the data they're built for, and Keras as the one API that lets you build any of them. If you take one thing from this, let it be the **guess → measure error → nudge loop.** it's the basis for everything else you'll ever learn about deep learning.

::: info About Author

Found this helpful? You can reach out to me via [<VPIcon icon="fas fa-envelope"/>email](mailto:roland1sankara@gmail.com) or [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`roland-sankara`)](https://linkedin.com/in/roland-sankara) and let me know what stood out for you and what you expect to learn next.

:::

Cheers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CNNs, RNNs, and Transformers Explained: A Mental Model for Key Deep Learning Concepts",
  "desc": "Okay, pop quiz: What is a neural network? What is deep learning? Does anything come to mind? I know that feeling – yes, that thing you’re feeling now. It’s either confidence that you know what I’m ask",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/cnns-rnns-and-transformers-explained-a-mental-model-for-key-deep-learning-concepts.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
