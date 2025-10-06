---
lang: en-US
title: "How to Build Your AI Demos with Gradio"
description: "Article(s) > How to Build Your AI Demos with Gradio"
icon: iconfont icon-gradio
category:
  - Python
  - Gradio
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - gradio
  - py-gradio
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your AI Demos with Gradio"
    - property: og:description
      content: "How to Build Your AI Demos with Gradio"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-your-ai-demos-with-gradio.html
prev: /programming/py-gradio/articles/README.md
date: 2025-08-28
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756337736951/2a58e22d-dd7a-4768-b052-a981a91c36da.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Gradio > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-gradio/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Your AI Demos with Gradio"
  desc="The world of artificial intelligence moves fast. Every week, new models appear, older ones get better, and the tools to use them become easier. But if you are building a machine learning project, you may face one big problem: how to share your work q..."
  url="https://freecodecamp.org/news/how-to-build-your-ai-demos-with-gradio"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756337736951/2a58e22d-dd7a-4768-b052-a981a91c36da.png"/>

The world of artificial intelligence moves fast. Every week, new models appear, older ones get better, and the tools to use them become easier.

But if you are building a machine learning project, you may face one big problem: how to share your work quickly so that others can try it.

A notebook full of code is not always enough. People want to interact with your model. They want to see inputs, click buttons, and watch results appear instantly.

This is where [<VPIcon icon="iconfont icon-gradio"/>Gradio](https://gradio.app/) comes in. With just a few lines of Python, you can turn your AI model into a simple web app. You don’t need to know HTML, CSS, or JavaScript, Gradio takes care of the interface so you can focus on your model.

In this tutorial, you will learn how to build AI demos in minutes using Gradio. By the end, you will have a live demo ready for anyone to test.

---

## What is Gradio?

Gradio is an open-source Python library that makes it easy to create interactive web interfaces for machine learning models.

Imagine that you trained a text summarizer or an image classifier. Without Gradio, you would have to build a frontend, write backend code, host it somewhere, and then connect it all together. That takes time and effort.

With Gradio, you write a few lines of Python, and it gives you a shareable link with a complete UI. The interface works on any device with a browser. You can even embed it in websites or share it with teammates for feedback.

Gradio supports text, images, audio, video, and many other data types. This makes it perfect for computer vision, natural language processing, speech recognition, or any other AI application.

---

## Why Use Gradio?

Speed is a major reason for choosing Gradio. Building a web app for your model can take hours or even days if you do it from scratch. Gradio reduces that to minutes. You focus on your AI model while Gradio handles the user interface.

It is also easy to use. Even beginners with basic Python knowledge can create functional demos. It works well with popular libraries like TensorFlow, PyTorch, and [<VPIcon icon="fas fa-globe"/>Hugging Face Transformers](https://turingtalks.ai/p/hugging-face-s-transformer-library-a-game-changer-in-nlp).

Another advantage is sharing. When you launch a Gradio app, you get a public link that anyone can open. You don’t need to deploy it manually or set up servers. This makes it perfect for hackathons, quick prototypes, or sending demos to clients and friends.

### How to Install Gradio

Before building your first app, you need to install Gradio. Open your terminal or command prompt and type:

```sh
pip install gradio
```

That’s it. The installation is quick and usually takes less than a minute. Once done, you are ready to build your first demo.

---

## Your First Gradio App

Let’s start simple. Imagine you want to build a text reversal app. The user types a sentence, and the app shows the reversed version. It may not be a real AI model, but it helps you learn the basics.

Here’s the code:

```py
# Import the Gradio library
import gradio as gr

# Define a function that reverses any input text
def reverse_text(text):
    # The [::-1] slice notation reverses the string
    return text[::-1]

# Create a Gradio interface to connect the function with a simple web UI
demo = gr.Interface(
    fn=reverse_text,       # Function to call when the user submits input
    inputs="text",         # Type of input (a text box for user input)
    outputs="text",        # Type of output (a text box to display reversed text)
    title="Text Reversal App",          # Title displayed on the app
    description="Type any text and see it reversed instantly."  # Short description for users
)

# Launch the web app in the browser
demo.launch()
```

`gr.Interface()` links your Python function to a web-based user interface. `fn=reverse_text` tells Gradio to call this function whenever the user provides input.

`inputs="text"` specifies that the input field should be a text box. `outputs="text"` makes the output display as text.

`title` and `description` improve the look of the app with a heading and explanation.

Save this in a Python file and run it. A browser window will open with a text box. Type something, hit submit, and you will see the reversed text appear.

![Gradio Result](https://cdn.hashnode.com/res/hashnode/image/upload/v1756100382572/5fdc0ace-b9ab-43a5-943b-1174670e7cd1.png)

Congratulations! You just built your first interactive app with Gradio in under five minutes.

---

## How to Add Machine Learning Models

Now let’s build something more exciting. Suppose you have a [**sentiment analysis**](/freecodecamp.org/how-to-build-a-simple-sentiment-analyzer-using-hugging-face-transformer.md) model that takes text and predicts whether it is positive, negative, or neutral. You can connect it to Gradio easily.

Here is an example using Hugging Face Transformers:

```py
# Import the Gradio library
import gradio as gr

# Import the 'pipeline' function from Hugging Face's Transformers library
# 'pipeline' lets you load pre-trained AI models with a single line of code
from transformers import pipeline

# Load a pre-trained sentiment analysis model from Hugging Face
# This model can classify text as POSITIVE, NEGATIVE, or NEUTRAL along with a confidence score
sentiment_model = pipeline("sentiment-analysis")

# Define a function that uses the model to analyze text sentiment
def analyze_sentiment(text):
    # Pass the user-provided text to the model
    # The model returns a list of predictions; we take the first one using [0]
    result = sentiment_model(text)[0]

    # Return the label (e.g., POSITIVE) and the confidence score formatted to 2 decimal places
    return f"Label: {result['label']}, Score: {result['score']:.2f}"

# Create a Gradio interface to turn the function into a web app
demo = gr.Interface(
    fn=analyze_sentiment,         # The function to call when user inputs text
    inputs="text",                # The input type (a single-line text box)
    outputs="text",               # The output type (display as text)
    title="Sentiment Analysis App",    # Title shown at the top of the web app
    description="Type a sentence to check its sentiment."  # Short explanation for the app
)

# Launch the web app so users can interact with it in a browser
demo.launch()
```

Run this code, type “I love this product!” and watch the model return “Label: POSITIVE” with a confidence score.

![15899f62-f962-488e-8dba-df9809ad56c1](https://cdn.hashnode.com/res/hashnode/image/upload/v1756100423148/15899f62-f962-488e-8dba-df9809ad56c1.png)

---

## How to Customize the Interface

Gradio gives you control over titles, descriptions, themes, and even examples. For example, you can add example inputs like this:

```py
demo = gr.Interface(fn=analyze_sentiment, 
                    inputs="text", 
                    outputs="text",
                    title="Sentiment Analysis App",
                    description="Type a sentence to check its sentiment.",
                    examples=[["I love AI"], ["I hate waiting"]])
```

Now the app shows example sentences that users can click to test instantly.

![Gradio demo with examples](https://cdn.hashnode.com/res/hashnode/image/upload/v1756100452336/6f8ee1d4-bcb1-4719-bbeb-74401f7d8990.png)

---

## How to Share Your App

When you run `demo.launch()`, Gradio starts a local server and gives you a local link. To get a sharable link, use `demo.launch(share=True)` and you will get a public link that you can share with others.

![Public url for sharing demos](https://cdn.hashnode.com/res/hashnode/image/upload/v1756100477123/2b5fbb37-cbda-46e4-be5a-18422b9c6f78.png)

The public link works for 72 hours by default. If you want a permanent link, you can deploy on Hugging Face Spaces for free or use platforms like AWS.

---

## Conclusion

Gradio changes how developers share machine learning models. What once took hours of coding now takes minutes. You write the model code, connect it to Gradio, and instantly get a working demo with a shareable link.

Whether you are a student learning AI, a researcher sharing results, or a developer building prototypes, Gradio saves you time and effort. It removes the complexity of web development so you can focus on what matters: building your AI model.

::: info

I Hope you enjoyed this article. Signup for my free AI newsletter* [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) *for more hands-on tutorials on AI. You can also find me on* [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your AI Demos with Gradio",
  "desc": "The world of artificial intelligence moves fast. Every week, new models appear, older ones get better, and the tools to use them become easier. But if you are building a machine learning project, you may face one big problem: how to share your work q...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-your-ai-demos-with-gradio.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
