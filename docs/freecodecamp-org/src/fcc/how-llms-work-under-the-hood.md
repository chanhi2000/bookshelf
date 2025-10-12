---
lang: en-US
title: "How LLMs Work Under the Hood"
description: "Article(s) > How LLMs Work Under the Hood"
icon: iconfont icon-pytorch
category:
  - Python
  - PyTorch
  - Matplotlib
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pytorch
  - py-torch
  - matplotlib
  - py-matplotlib
  - ai
  - artificial-intelligence
  - llm
  - large-language-model
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How LLMs Work Under the Hood"
    - property: og:description
      content: "How LLMs Work Under the Hood"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-llms-work-under-the-hood.html
prev: /programming/py-torch/articles/README.md
date: 2025-10-02
isOriginal: false
author:
  - name: Alma Mohapatra
    url : https://freecodecamp.org/news/author/almamohapatra/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759415587363/cc861698-598b-488a-bc79-58aeb99500ea.png
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

```component VPCard
{
  "title": "Matplotlib > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-matplotlib/articles/README.md",
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
  name="How LLMs Work Under the Hood"
  desc="Large Language Models (LLMs) like LLaMA 2 and Mistral are often described as “black boxes”. This means that you can see the text you give them and the responses they produce, but their inner workings remain hidden. Inside the model, billions of weigh..."
  url="https://freecodecamp.org/news/how-llms-work-under-the-hood"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759415587363/cc861698-598b-488a-bc79-58aeb99500ea.png"/>

Large Language Models (LLMs) like LLaMA 2 and Mistral are often described as “black boxes”. This means that you can see the text you give them and the responses they produce, but their inner workings remain hidden. Inside the model, billions of weights and neuron activations transform the input into output in ways we can’t directly interpret, so we see the results but not the step-by-step reasoning behind them. They generate text impressively well, but how do they actually represent meaning internally?

In this tutorial, you’ll run an open-source LLM locally on your machine and dig into its hidden activations — the internal neuron values produced while processing text. By visualizing these activations, you can see patterns that relate to sentiment, analogy, and bias.

This tutorial will help you:

- Understand how LLMs internally represent text
- Experiment with embeddings and hidden states in Python
- Build visualizations showing differences between words, phrases, or sentiments
- Reflect on how bias and associations emerge in neural models

Here is what we are going to cover in this tutorial, and yes — we’ll do all of this locally, with no cloud costs.

::: note Prerequisites

- Python 3.10+
- A machine with at least 8 GB RAM (16 GB recommended)
- Basic familiarity with the command line and Python
- Packages: `torch`, `transformers`, `matplotlib`, `scikit-learn`

:::

---

## Step 0: Create & Activate a Virtual Environment

Why Use a Virtual Environment?

When you install Python libraries with `pip`, they normally go into your global Python setup. That can get messy fast:

- Different projects may need different versions of the same library (for example, `torch==2.0` vs `torch==2.2`).
- Upgrading one project could accidentally break another.
- Your system Python may get cluttered with packages you don’t actually need elsewhere.

A virtual environment solves this by creating a self-contained “sandbox” just for your project.

- All installs (like `torch`, `transformers`, `matplotlib`) live inside your project folder.
- When you’re done, you can delete the folder and nothing else on your computer is affected.
- It’s the standard best practice for Python development — lightweight and safe.

In short: a virtual environment keeps your project’s tools separate, so nothing breaks when you experiment.

### Windows (Command Prompt or PowerShell)/Mac (Terminal)

1. Create or navigate to your project folder (create one if needed):
2. Create the virtual environment: This creates a folder called <FontIcon icon="fas fa-folder-open"/>`venv/` inside your project.
3. Activate it
4. Your terminal prompt will now look like step 4 in the code below

```sh
#step 1
mkdir llm_viz
cd llm_viz

#step 2
python -m venv venv
```

::: code-tabs#sh

step 3

@tab:active <FontIcon icon="fa-brands fa-windows"/>

```sh
venv\Scripts\activate
```

@tab <FontIcon icon="iconfont icon-macos"/>,<FontIcon icon="fa-brands fa-linux"/>

```sh
source venv/bin/activate
```

:::

### Install dependencies

```sh
pip install torch transformers matplotlib scikit-learn
```

We’ll use DistilBERT (distilbert-base-uncased) since it’s small and easy to run locally. You can swap in larger models like LLaMA or Mistral if you have more powerful hardware.

---

## Step 1: Load a Local Model and Tokenizer

This step downloads **DistilBERT** (a small, free LLM) and prepares it to run locally.

In a file called <FontIcon icon="fa-brands fa-python"/>`app.py`, paste the following code.

::: note

The first time you run it via `python app.py`, Hugging Face will automatically download the model (~250 MB). You only do this once.

:::

```py title="app.py"
from transformers import AutoTokenizer, AutoModel
import torch

model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name, output_hidden_states=True)
```

This code loads a small open-source language model so we can work with it on our own computer.  
First, it imports the Transformers library and PyTorch, which provide the tools to download and run the model. Then it picks the model name (`distilbert-base-uncased`) and uses `AutoTokenizer` to turn text into tokens the model understands, while `AutoModel` downloads the pre-trained model itself and prepares it to return the hidden layer outputs we’ll visualize.

---

## Step 2: Extract Hidden States

This feeds in text and grabs the “hidden activations” (the neuron outputs inside the model).

In the same <FontIcon icon="fa-brands fa-python"/>`app.py`, add this function below the step 1 code.

```py title="app.py"
def get_hidden_states(text):
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    hidden = outputs.hidden_states[-1][0] # Last hidden layer
    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    return tokens, hidden

tokens, hidden = get_hidden_states("I love pizza!")
print(tokens)
print(hidden.shape)
```

Now we can call `get_hidden_states("I love pizza!")` and it will return tokens like `["i", "love", "pizza", "!"]` and a big tensor of numbers.

You can use `python app.py` to run the code.

---

## Step 3: Visualize Sentiment Activations

This step plots how neuron values differ for happy vs. sad sentences. We’ll compare activations for positive and negative movie reviews.

In the same <FontIcon icon="fa-brands fa-python"/>`app.py`, add this function below the step 2 code.

```py :collapsed-lines title="app.py"
import matplotlib.pyplot as plt

def plot_token_activations(tokens, hidden, title, filename):
    plt.figure(figsize=(12, 4))
    for i, token in enumerate(tokens):
        plt.plot(hidden[i].numpy(), label=token)
    plt.title(title)
    plt.xlabel("Neuron Index")
    plt.ylabel("Activation")
    plt.legend(loc="upper right", fontsize="x-small")
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

# Positive example
tokens_pos, hidden_pos = get_hidden_states("I love this movie, it is fantastic!")
plot_token_activations(tokens_pos, hidden_pos, "Positive Sentiment Example", "positive_sentiment.png")

# Negative example
tokens_neg, hidden_neg = get_hidden_states("I hate this movie, it is terrible.")
plot_token_activations(tokens_neg, hidden_neg, "Negative Sentiment Example", "negative_sentiment.png")
```

After running the code `python app.py`, check your folder — you’ll see two image files: <FontIcon icon="fas fa-file-image"/>`positive_sentiment.png` and <FontIcon icon="fas fa-file-image"/>`negative_sentiment.png`. They’ll look like line graphs showing activations for each token.

![Figure 1: Activations for a positive review. Words like “love” and “fantastic” activate distinctive neuron patterns.](https://cdn.hashnode.com/res/hashnode/image/upload/v1757910763307/5556cf9b-69a9-4f7b-b13e-76041d2d52b0.png)

![Figure 2: Activations for a negative review. Words like “hate” and “terrible” trigger different neuron curves.](https://cdn.hashnode.com/res/hashnode/image/upload/v1757910816349/9aa6e149-3ff7-443e-96f9-7f86af0cc9bd.png)

---

## Step 4: Compare Two Sentences

This step compares average neuron patterns between two sentences.

Now in the same <FontIcon icon="fa-brands fa-python"/>`app.py`, add this function below the step 3 code.

```py title="app.py"
def compare_sentences(s1, s2, filename):
    tokens1, hidden1 = get_hidden_states(s1)
    tokens2, hidden2 = get_hidden_states(s2)

    plt.figure(figsize=(10,5))
    plt.plot(hidden1.mean(dim=0).numpy(), label=s1[:30]+"...")
    plt.plot(hidden2.mean(dim=0).numpy(), label=s2[:30]+"...")
    plt.title("Sentence Activation Comparison")
    plt.xlabel("Neuron Index")
    plt.ylabel("Mean Activation")
    plt.legend()
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

compare_sentences("I love coding.", "I hate coding.", "sentence_comparison.png")
```

After running the code `python app.py`, You’ll now get <FontIcon icon="fas fa-file-image"/>`sentence_comparison.png`, showing two curves — one for the happy sentence, one for the negative.

![Figure 3: Comparing “I love coding” vs “I hate coding”. Even averaged across tokens, neuron profiles differ significantly.](https://cdn.hashnode.com/res/hashnode/image/upload/v1757910867868/824567dd-b390-4305-aa87-44d076205d3a.png)

---

## Step 5: Visualize Analogies with PCA

We can check if embeddings encode semantic analogies like man → woman :: king → queen.

This step projects word embeddings like *man, woman, king, queen* into 2D space so you can see relationships.

Now in the same <FontIcon icon="fa-brands fa-python"/>`app.py`, add this function below the step 4 code.

```py title="app.py"
from sklearn.decomposition import PCA

def get_sentence_embedding(text):
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    hidden = outputs.last_hidden_state.mean(dim=1).squeeze()
    return hidden

def plot_embeddings(words, embeddings, filename):
    pca = PCA(n_components=2)
    reduced = pca.fit_transform(torch.stack(embeddings).numpy())

    plt.figure(figsize=(8, 6))
    for i, word in enumerate(words):
        x, y = reduced[i]
        plt.scatter(x, y, marker="o", s=100)
        plt.text(x+0.02, y+0.02, word, fontsize=12)
    plt.title("Word Embeddings in 2D (PCA)")
    plt.xlabel("PC1")
    plt.ylabel("PC2")
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

words = ["man", "woman", "king", "queen"]
embeddings = [get_sentence_embedding(w) for w in words]
plot_embeddings(words, embeddings, "word_analogies.png")
```

After running the code `python app.py` , you’ll have <FontIcon icon="fas fa-file-image"/>`word_analogies.png` showing the famous *man→woman* and *king→queen* relationship as almost parallel lines.

![Figure 4: PCA visualization of word embeddings. Man–woman and king–queen form parallel relationships, reflecting analogy structure.](https://cdn.hashnode.com/res/hashnode/image/upload/v1757910904012/758e3245-5ec7-4108-ae18-9fba8632f1a0.png)

---

## Conclusion

You’ve built a local toolkit to:

- Extract hidden activations from an LLM
- Visualize neuron activity for positive vs. negative sentiment
- Explore semantic analogies like “king → queen”
- Inspect potential biases in role associations

This helps demystify LLMs — showing they’re massive matrices of numbers encoding meaning, not magic.

Small models like DistilBERT run on any laptop. Larger models like LLaMA 2 can scale exploration further.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How LLMs Work Under the Hood",
  "desc": "Large Language Models (LLMs) like LLaMA 2 and Mistral are often described as “black boxes”. This means that you can see the text you give them and the responses they produce, but their inner workings remain hidden. Inside the model, billions of weigh...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-llms-work-under-the-hood.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
