---
lang: en-US
title: "Machine Learning vs Deep Learning vs Generative AI - What are the Differences?"
description: "Article(s) > Machine Learning vs Deep Learning vs Generative AI - What are the Differences?"
icon: fas fa-brain
category:
  - AI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Machine Learning vs Deep Learning vs Generative AI - What are the Differences?"
    - property: og:description
      content: "Machine Learning vs Deep Learning vs Generative AI - What are the Differences?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/machine-learning-vs-deep-learning-vs-generative-ai.html
prev: /ai/articles/README.md
date: 2025-10-03
isOriginal: false
author:
  - name: Nitheesh Poojary
    url : https://freecodecamp.org/news/author/nitheeshp/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759006391065/3cd87534-e2e9-49df-a9c7-1b636e491032.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Machine Learning vs Deep Learning vs Generative AI - What are the Differences?"
  desc="When I started using LLMs for work and personal use, I picked up on some technical terms, such as ”machine learning” and ”deep learning,” which are the main technologies behind these LLMs. I've always been interested in learning about the differences..."
  url="https://freecodecamp.org/news/machine-learning-vs-deep-learning-vs-generative-ai"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759006391065/3cd87534-e2e9-49df-a9c7-1b636e491032.png"/>

When I started using LLMs for work and personal use, I picked up on some technical terms, such as "machine learning" and "deep learning," which are the main technologies behind these LLMs. I've always been interested in learning about the differences between these technologies. Most companies in the industry are now developing their own AI tools, which makes MLOps necessary for managing and utilizing them.

Before I began learning about MLOps, I tried to understand the technologies behind LLMs and how they work. In this article, I’ll share my understanding of machine learning, deep learning, and generative AI, along with their potential applications.

![how AI works](https://cdn.hashnode.com/res/hashnode/image/upload/v1759006565108/9698f88c-7d81-40b6-b902-c3d75b054728.jpeg)

---

## Artificial Intelligence (AI)

Artificial Intelligence (AI) is a form of technology that lets machines solve problems in a way that is identical to how people do it. It helps businesses make better decisions on a large scale by helping them recognize images, create content, and make predictions based on data. Artificial intelligence includes machine learning, deep learning, and generative AI.

---

## Machine Learning (ML): The Foundation

When we give computers many examples, they learn how to make their own decisions or guesses. It's like teaching a kid to tell the difference between animals. You show them a lot of pictures of cats and dogs and say things like "This is a cat" and "This is a dog." In the end, they learn to tell the difference between cats and dogs on their own. Machine learning is similar in that you give a computer a lot of data with examples, and it learns how to make predictions about new data.

### How Does Machine Learning Work?

Machine Learning (ML) is the process of teaching computers to find patterns in data and make decisions or predictions without being instructed what to do. There are usually six main steps in this process:

### Data Collection

Get many examples, like thousands of emails, photos, or sales records. The more training data you have, the more accurate your predictions will be.

### Data Preparation

At this stage, you clean the data by getting rid of mistakes and adding missing labels.

### Selecting Algorithm (Models)

It's like choosing the right tools for the job. Models can find patterns in data or make predictions. You can find machine learning models for your data [<FontIcon icon="iconfont icon-ibm"/>here](https://ibm.com/think/topics/machine-learning-algorithms).

### Training Phase

After you pick the right model for your cleaned-up data, you teach it. This is like getting ready for a test.

### Evaluation

Use the test data to assess the model's performance and see if it can make accurate predictions on unseen data.

### Deployment

Put the trained model to work in the real world.

### Training Phase

Teach the computer with 10,000 house sales with details like size (2,000 sq ft), number of bedrooms (3), and location (downtown). Cost: $300,000.

### Learning

The algorithm finds patterns, such as the fact that bigger houses cost more and places in the city center cost more. More bedrooms make a house worth more.

### Prediction

Think about a new house with 1,800 square feet, two bedrooms, and a location in the suburbs. It guesses a figure based on what it has learned.

![how machine learning works](https://cdn.hashnode.com/res/hashnode/image/upload/v1759006771594/12afae06-9d72-4d65-af81-c10fda1e2099.png)

### Types of Machine Learning

#### 1. Supervised Learning

Give algorithms labeled and defined training data to look for patterns. The sample data tells the algorithm what to do and what to expect as an output. For instance, millions of X-ray reports that say someone is healthy or sick would need to be tagged. Then, machine learning programs could use this training data to guess if a new X-ray shows signs of illness.

#### 2. Unsupervised Learning

Algorithms that use unsupervised learning learn from data that doesn't have labels. The algorithm must find patterns in untagged data without outside help. For instance, finding groups of people on Facebook or Twitter who have similar interests.

#### 3. Reinforcement Learning

This technique is a kind of machine learning in which an agent learns how to make choices by interacting with the world around it. The agent receives points for doing things right and loses points for doing things wrong. Its goal is to get as many points as possible. For instance, cars learn how to drive safely by making mistakes in simulations. They get rewards for staying in their lane, following traffic rules, and not hitting other cars.

### Machine Learning—Real-World Examples

#### Email Spam Detection

You can show the computer thousands of emails that say "spam" or "not spam." It learns patterns, like how emails with "FREE MONEY" are usually spam. It can now automatically sort your inbox.

#### Photo Recognition

Give the computer millions of pictures with labels that say what's in them. It learns that apples are likely to be round and have stems. Your phone can now tell what things are in your pictures.

#### Movie Recommendations

Netflix keeps track of the movies you've seen and rated. It finds people who like the same things you do. It suggests movies that other people like.

---

## Deep Learning: Adding Complexity

Deep learning is a type of artificial intelligence. It helps computers understand data like humans do. Deep learning can identify complex images, text, sound, and other data patterns to make accurate predictions. It uses artificial neural networks that work like the human brain. Neural networks are connected nodes that handle information.

### How Does Deep Learning Work?

Artificial neural networks are used in deep learning to learn from data. These networks consist of interconnected layers of nodes. Each node learns a different thing about the data.

For instance, when you show a computer a picture of a cat, the picture goes through a lot of steps. The first layer looks for shapes and edges. The second layer puts these shapes together to make ears, eyes, and whiskers. The last layers say things like "This picture looks like a cat." Deep learning can make a lot of mistakes when learning, but it gets better and better after each piece of feedback.

### Deep Learning—Real-World Examples

- **Tesla Autopilot**: Processes eight cameras simultaneously to navigate roads, recognize traffic signs, and avoid obstacles.
- **Google's DeepMind**: Detects over fifty eye diseases from retinal scans with 94% accuracy.
- **ChatGPT**: Helps with writing, coding, and problem-solving.

---

## Generative AI: Write New

Generative AI is a subset of deep learning that makes new things, like stories, pictures, music, or code, instead of just looking at or sorting through things that are already there. Generative AI systems learn patterns from a lot of training data and then use those patterns to make new content.

### Real-World Examples

- Chatbots help institutions give better customer service by making product suggestions and answering questions.
- Automatically generate technical documents from the source code.
- Auto-generate quizzes, practice problems, and explanations

---

## Summary of Differences Between Machine Learning vs Deep Learning vs Generative AI

| **Feature** | **Machine Learning (ML)** | **Deep Learning (DL)** | **Generative AI (GenAI)** |
| --- | --- | --- | --- |
| **Definition** | Subset of AI where machines learn from data to make predictions or decisions. | Subset of AI using artificial neural networks with multiple layers to model complex patterns | Subset of Deep learning that can create new content (text, images, code, etc.) similar to human-created content |
| **Data Requirements** | Small-to-medium datasets. | Large amounts of data (structured and unstructured) | Massive datasets for training, varying amounts for generation |
| **Computational Power** | Works on CPUs, moderate hardware. | Needs GPUs/TPUs for training. | Requires large-scale GPU/TPU clusters. |
| **Use Cases** | Predictions and classification. | Recognize complex data like speech, images, and language. | Generate new, original content. |
| **When NOT to Use** | Data is very complex/unstructured; accuracy is critical (medical, legal) ,Need to handle images/audio/video | The dataset is small (<1000 samples), and computational resources are limited. | Copyright/IP restriction |
| **Cost Comparison** | Low ($1K-$10K) (Standard serve) | Medium ($10K-$100K) | High ($100K-$1M+) |
| **Real-World Examples** | Netflix recommendations, fraud detection, spam filters. | Face recognition, self-driving cars, Siri/Alexa. | Original creative outputs (text, images, code, video). |

---

## Conclusion

To sum it up, anyone who is keen to learn more about artificial intelligence needs to know the differences between machine learning, deep learning, and generative AI.

Machine learning is the basis for this because it lets computers learn from data and make predictions. Deep learning takes this a step further by using neural networks to process complicated data patterns in a way that is similar to how humans understand things.

Generative AI goes a step further by making new things, which shows how creative AI can be. As these technologies get better, they open up a lot of new opportunities in many fields, such as improving customer service, making medical diagnoses more accurate, and making new content. To maximize AI's benefits in your life, stay current on new developments.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Machine Learning vs Deep Learning vs Generative AI - What are the Differences?",
  "desc": "When I started using LLMs for work and personal use, I picked up on some technical terms, such as ”machine learning” and ”deep learning,” which are the main technologies behind these LLMs. I've always been interested in learning about the differences...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/machine-learning-vs-deep-learning-vs-generative-ai.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
