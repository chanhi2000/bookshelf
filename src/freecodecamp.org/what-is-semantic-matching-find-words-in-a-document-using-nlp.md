---
lang: en-US
title: "What is Semantic Matching? How to Find Words in a Document Using NLP"
description: "Article(s) > What is Semantic Matching? How to Find Words in a Document Using NLP"
icon: fas fa-language
category:
  - AI
  - LLM
  - Python
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is Semantic Matching? How to Find Words in a Document Using NLP"
    - property: og:description
      content: "What is Semantic Matching? How to Find Words in a Document Using NLP"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-semantic-matching-find-words-in-a-document-using-nlp.html
prev: /ai/llm/articles/README.md
date: 2025-01-10
isOriginal: false
author:
  - name: Ibrahim Ogunbiyi
    url : https://freecodecamp.org/news/author/IbrahimOgunbiyi/
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/Dh7gzpVpdWQ/upload/4e1e504663acda31b980e6fba0c2d661.jpeg
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

[[toc]]

---

<SiteInfo
  name="What is Semantic Matching? How to Find Words in a Document Using NLP"
  desc="Have you ever found yourself searching a document for a specific word or phrase just to discover that the term you're looking for isn't there? It can be frustrating, right? Sometimes, even though you might not see the exact term you’re looking for, t..."
  url="https://freecodecamp.org/news/what-is-semantic-matching-find-words-in-a-document-using-nlp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/Dh7gzpVpdWQ/upload/4e1e504663acda31b980e6fba0c2d661.jpeg"/>

Have you ever found yourself searching a document for a specific word or phrase just to discover that the term you're looking for isn't there? It can be frustrating, right?

Sometimes, even though you might not see the exact term you’re looking for, the document might contain similar words or phrases that have the same meaning or context but don’t have the exact same form (such as differences in spelling).

Traditional NLP search approaches have relied on using exact forms to search for words or phrases in a particular document. But this fails at finding words based on semantic or contextual meaning.

To solve this, semantic matching comes into play. It’s an advanced way of searching that takes advantage of traditional search methods while also focusing more on locating or matching words or phrases based on their meaning or context (rather than solely on their exact form).

In this article, you will learn how to perform semantic matching using NLP. Without further ado, let’s get started.

::: note Requirements

To make sure that you can reproduce the experiment in this tutorial, you’ll need to have a few things.

First, you’ll need to have Python 3.x (preferably Python 3.10) installed on your PC. You’ll also need some libraries, which you can install using the Pip package manager.

You should also have basic knowledge of NLP such as text preprocessing and text representation techniques. You can learn more [**here**](/freecodecamp.org/natural-language-processing-techniques-for-beginners.md).

You can also [fork the repo (<FontIcon icon="iconfont icon-github"/>`ibrahim-ogunbiyi/Semantic_Matching`)](https://github.com/ibrahim-ogunbiyi/Semantic_Matching) which contains all the code in this article so you can follow along.

:::

To install everything using Pip, type the following command:

```sh
# to install with pip
pip install pypdf2 keybert sentence-transformers
```

---

## Problem Definition

Suppose you’re a data scientist who’s part of a curriculum development team and want to know if a particular concept (word or phrase), say **birth control**, is being taught in a curriculum that’s in a pdf document.

One way you could do this is to open the pdf using a pdf tool and then use the <kbd>Ctrl</kbd>+<kbd>F</kbd> (find) method to check if the phrase birth control is in the pdf.

![The PDF we're working with here](https://cdn.hashnode.com/res/hashnode/image/upload/v1736408224052/2e6dacef-ef92-4113-a574-ec355e99e6f6.png)

You could also do it programmatically, as shown below:

```py
# import library
import PyPDF2

# use PDFreader from PyPDF2 to read pdf content.
pdf_reader = PyPDF2.PdfReader("Relationships_Education_RSE_and_Health_Education.pdf")

# join all the content in the pdf pages together and lowercase the letters
pdf_document = " ".join([page.extract_text().lower() for page in pdf_reader.pages])

# check if the string 'birth control' is in the document [Returns False]
"birth control" in pdf_document
```

Below is the output of the above code:

```plaintext title="output"
False
```

As shown above, you can see that both the programmatic way of searching and the pdf tool say that the phrase “birth control” doesn't exist in the pdf document.

Well, this might be true, but because this is a traditional way of NLP searching (that matches word for word in exact form) let’s not fully trust it. As I explained earlier, some words might be in different forms or have a different spelling, but they might mean the same thing contextually or semantically.

So how do we solve this issue? This is where semantic matching comes into play.

---

## What is Semantic Matching?

Semantic Matching is a technique used to determine if two elements have the same meaning. An element can be a word, phrase, sentence, document, or even a corpus. It refers to matching elements based on meaning or context and not just matching based on exact form.

In order to perform semantic matching in NLP, there are certain things you need to know and do. Let’s go through them now:

### What is Word Embedding?

Word embedding is an advanced text representation technique used to represent words in a lower-dimensional vector representation. This vector representation captures inter-word semantic and syntactic information. This means that words that have similar meanings - even though they might be spelled differently - will have close to similar vector representations.

### What does Lower-Dimensional Vector representation mean?

In NLP, traditional ways of representing text in a way machines can understand (that is, numerical vector representations) are Bag of Words, Term-Frequency and Inverse Document Frequency (TF-IDF), and One-hot encoding. But these techniques usually generate high dimensions (usually the size of the vocabulary) for a particular word representation and are sparse (meaning there will be lots of zeros).

So, for example, if a word is to be represented as a numerical vector and the document or corpus the word belongs to has 10,000 vocabularies, the size of the dimension of that word would be 10,000 (making it high).

The disadvantages of these techniques are high dimensions, sparsity, and their non-capability in capturing semantic information. So, advancements in NLP led to the development of word embedding techniques that simply create lower (also known as more dense) vector representations of words and can capture inter-word semantic information.

Word embedding is the holy grail in NLP and language technology, serving as the foundation for advanced language representation models such as GPT (Generative Pre-trained Transformer).

There is also sentence embedding that represents sentences in a lower-dimension vector representation.

### How do we measure if two vectors are similar?

This is where cosine similarity comes into play. Cosine similarity is a mathematical technique that we use to know how similar two vectors are to each other.

In NLP, it usually outputs a value between 0 to 1. A value close to 1 means that the two vectors are highly similar.

For example, to understand how cosine similarity works, let’s create a word embedding vector representation for three words: Man, Woman, and Cat. Then we’ll use cosine similarity to figure out which vectors are similar.

Based on our own instincts, we know that Man should be closer to Woman than Cat. So, let’s use NLP to help us validate this.

Thanks to advancements in NLP, there are numerous models we can use to create word embeddings, which you can find on the Hugging Face repository. In this article, we are going to use the ⁣`all-mpnet-base-v2` model from the ⁣`SentenceTransformer` library. According to ⁣`SentenceTransformer`, it provides the best quality performance in terms of sentence embedding, and you can also use it to create word embeddings.

The below code allows us to validate our claim using NLP. So, firstly, we initialize the `SentenceTransformer` with `all-mpnet-base-v2` and then use the encode method to get the embedding of each word. Then, finally, we’ll use the `cos_sim` class, also from `SentenceTransformer`, to determine which vectors are similar.

```py
# import library
from sentence_transformers import SentenceTransformer # sentence transformer
from sentence_transformers.util import cos_sim # cosine similarity

# initialize sentence transformer with the 'all-mpnet-base-v2' model
model = SentenceTransformer("all-mpnet-base-v2")
```

```py :collapsed-lines
# get the embedding vector of the man, woman, and cat words.
man_vector = model.encode("man")
woman_vector = model.encode("woman")
cat_vector = model.encode("cat")

# get the similarity between man and woman
similarity = cos_sim(man_vector, woman_vector)

# get the similarity between man and cat
cat_similarity = cos_sim(man_vector, cat_vector)

print("The Similarity between Man vector and Woman Vector:", similarity, "\n")

print("The Similarity between Man vector and Cat Vector:", cat_similarity)
```

```plaintext title="output"
The Similarity between Man vector and Woman Vector: tensor([[0.3501]]) 

The Similarity between Man vector and Cat Vector: tensor([[0.2553]])
```

As you can see, the similarity score between man and woman (0.35) is higher than that of man and cat (0.26). This shows the beauty of word embedding and cosine similarity together.

Now let’s get back to our business.

---

## How to Perform Semantic Matching on a PDF Document

Now we are going to use semantic matching to look for a word or phrase in the document that matches the **birth control** phrase.

### How to Get Words from the PDF using KeyBERT

Word embedding generates embeddings for individual words. Our PDF document contains a **large volume of textual components**, including digits, special characters, symbols, stopwords, and the actual words we want to match. So, to save time on preprocessing, we are going to utilize `KeyBERT`. This is a library that allows us to get meaningful keywords (words or phrases) from a particular document in a minimal way.

Keep in mind that by default, `KeyBERT` extracts single keywords - but we can also tell it to extract phrases with two or more words. We’ll use it here to extract single-word and 2-word phrases. Below is the implementation of using `KeyBERT` to extract keywords from our document:

```py
from keybert import KeyBERT
# initialize model
keybert_model = KeyBERT()

# extract all keywords (single word and 2 word phrase) from the pdf
all_keywords = keybert_model.extract_keywords(docs=pdf_document, top_n=-1, keyphrase_ngram_range=(1, 2))
# print length of keywords extracted                                             
print(len(all_keywords))
# show the first 5 keywords
print(all_keywords[:5])
```

The above code imports `KeyBERT` from the `keybert` library. It then initializes `KeyBERT`, and extracts all keywords (that is, single word and 2-word phrases) from the document. Then the next line prints the number of keywords extracted. Lastly, the code prints the first five 5 keywords out of all the keywords extracted from the PDF.

Below is the output of the above code:

```plaintext title="output"
8669
[('education guidance', 0.5954),
 ('schools guidance', 0.5542),
 ('education policies', 0.5405),
 ('sex education', 0.5228),
 ('education safeguarding', 0.5001)]
```

As you can see above, KeyBERT extracted 8,669 keywords from the PDF. Also, the `KeyBERT` model usually returns the keywords extracted along with a score of each word. We don’t need the score, so we will only extract each keyword from the tuple it is enclosed in.

```py
# remove score from each keyword

all_keywords = [keyword[0] for keyword in all_keywords]
all_keywords[:5]
```

Below is the output of the above code:

```plaintext title="output"
['education guidance',
 'schools guidance',
 'education policies',
 'sex education',
 'education safeguarding']
```

### Embedding of the Birth Control Phrase and the Keywords Extracted from the PDF

Now that we’ve extracted these keywords from the document, the next step is to get the embedding of our phrase and the keywords from the document.

The below code lets us do this:

```py
# initialize sentence transformer with the 'all-mpnet-base-v2' model
model = SentenceTransformer("all-mpnet-base-v2")

# get the embedding of the 'birth control' phrase
birth_control_embedding = model.encode("birth control")

# get the embedding of all the keywords in the document
keywords_embedding = model.encode(all_keywords)
```

### Cosine Similarity of Birth Control Phrase and Keywords in PDF

After getting the embedding of the phrase and the keywords, the next step is to get the similarity score of the phrase and the keywords. This will help us know which keyword in the document is highly similar to the phrase.

The below code allows us to get the cosine similarity of the phrase and the keywords’ embedding vector.

```py
# calculate the cosine similarity of the birth control word and each word in the document
cosine_similarity_result = cos_sim(birth_control_embedding, keywords_embedding)
# print the shape (equal to the number of keywords)
print(cosine_similarity_result.shape)
# show the top 5 similarities
print(cosine_similarity_result[:5])
```

Below is the output of the above code:

```plaintext title="output"
torch.Size([1, 2034])
tensor([[0.2166, 0.1977, 0.0998,  ..., 0.1634, 0.1082, 0.2194]])
```

Now that we have the similarity score of the phrase and the keywords, the total size of the resulting tensor will be the number of keywords, as shown above. Then we can use the `argmax()` method to get the index of the element of the tensor with the highest score. This index will help us filter out the particular keyword in the `all_keywords` list variable. The below code achieves this:

```py
# return the index number of the high similarity score
index = cosine_similarity_result.argmax()
print(index)
```

Below is the output of the above code. It tells us that the keyword with the highest similarity to the **Birth Control phrase** is at index 1490. 

```plaintext title="output"
tensor(1490)
```

Now, let’s look at the keyword at index 1490 in the `all_keywords` variable.

```py
# print the keyword at index 1490 
print(all_keywords[index])
```

Below is the output of the above code:

```plaintext title="output"
contraceptive
```

After examining it, we found that "contraceptive" was the word with the highest similarity, which makes sense because "birth control" and "contraceptive" mean the same thing. This demonstrates the elegance of semantic matching in finding similar words.

### Let’s Also Explore Top 5 Keywords in the PDF that Match with the Phrase “Birth Control”

Let’s explore the 5 top keywords with the highest similarity score to “birth control” to see what the result would look like.

To do that, we can use the `topk()` method to get the top 5 indices. Then we can then loop through these indices to get the actual keywords:

```py
# extract the top 5 indices
top_5_indices = cosine_similarity_result.topk(5)[1].tolist()[0]

print(top_5_indices)
```

Below is the result of the above code:

```plaintext title="output"
[1490, 1972, 871, 1199, 1944]
```

```py
# get top 5 keywords
top_5_keywords = [all_keywords[index] for index in top_5_indices]
print(top_5_keywords)
```

Below is the output of the above code:

```plaintext title="output"
['contraceptive', 'contraception', 'contraceptive choices', 'range contraceptive', 'cover contraception']
```

There, we can see that the top five results relate to contraception and contraceptives. This demonstrates that semantic matching is an effective way to find related elements in a document.

---

## Wrapping Up

In this article, you learned what semantic matching is and its advantages compared to traditional NLP search methods. You also encountered concepts such as word embeddings and cosine similarity and learned how they help us perform semantic matching. Then we implemented semantic matching by finding a phrase in a document.

Thank you for reading this article, and I will see you in the next one.

### References

<SiteInfo
  name="UKPLab/sentence-transformers"
  desc="State-of-the-Art Text Embeddings."
  url="https://github.com/UKPLab/sentence-transformers/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/1c422103e477f94677462eea450da30a230a1798f0278e86377d899161674cb4/UKPLab/sentence-transformers"/>

<SiteInfo
  name="MaartenGr/KeyBERT"
  desc="Minimal keyword extraction with BERT."
  url="https://github.com/MaartenGr/KeyBERT/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/306327980/50c11600-190e-11eb-9666-5a3988065b9d"/>

<SiteInfo
  name="MTEB Leaderboard - a Hugging Face Space by mteb"
  desc="Discover amazing ML apps made by the community"
  url="https://huggingface.co/spaces/mteb/leaderboard/"
  logo="https://huggingface.co/favicon.ico"
  preview="https://cdn-thumbnails.huggingface.co/social-thumbnails/spaces/mteb/leaderboard.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Semantic Matching? How to Find Words in a Document Using NLP",
  "desc": "Have you ever found yourself searching a document for a specific word or phrase just to discover that the term you're looking for isn't there? It can be frustrating, right? Sometimes, even though you might not see the exact term you’re looking for, t...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-semantic-matching-find-words-in-a-document-using-nlp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
