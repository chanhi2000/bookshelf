---
lang: en-US
title: "How to Use NLP Techniques and Tools in Your Projects [Full Handbook]"
description: "Article(s) > How to Use NLP Techniques and Tools in Your Projects [Full Handbook]"
icon: iconfont icon-tensorflow
category:
  - Python
  - Tensorflow
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - tensorflow
  - py-tensorflow
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use NLP Techniques and Tools in Your Projects [Full Handbook]"
    - property: og:description
      content: "How to Use NLP Techniques and Tools in Your Projects [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-nlp-techniques-and-tools-in-your-projects-full-handbook/
prev: /programming/py-tensorflow/articles/README.md
date: 2025-11-22
isOriginal: false
author:
  - name: Oleh Romanyuk
    url : https://freecodecamp.org/news/author/OlehRomanyuk/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1763743424066/393a4384-ce7a-4ff8-9e98-1edaaa322bc6.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Tensorflow > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-tensorflow/articles/README.md",
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
  name="How to Use NLP Techniques and Tools in Your Projects [Full Handbook]"
  desc="Nowadays, computers can comprehend and produce human-like language thanks to Natural Language Processing. And this opens up numerous opportunities for you as a developer. This guide will teach you how to create NLP projects from scratch. It includes ..."
  url="https://freecodecamp.org/news/how-to-use-nlp-techniques-and-tools-in-your-projects-full-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1763743424066/393a4384-ce7a-4ff8-9e98-1edaaa322bc6.png"/>

Nowadays, computers can comprehend and produce human-like language thanks to Natural Language Processing. And this opens up numerous opportunities for you as a developer.

This guide will teach you how to create NLP projects from scratch. It includes details on how to organize your workflow, utilize the appropriate tools, and perform typical NLP tasks.

After reading this article, you will understand how to:

- Configure your environment for NLP development.
- Select the appropriate frameworks and libraries for your project.
- Execute fundamental NLP tasks such as sentiment analysis and text classification.
- Create and implement a functional NLP application.
- Diagnose and fix common problems in NLP projects.

Before beginning, you should have some basics at hand already. They include a solid understanding of Python programming and knowledge of the general ideas of machine learning. You should also know how to build algorithms and data structures. Finally, your system should have Python 3.8 or higher installed so you can try running the example snippets.

---

## Table of Contents

- [What is Natural Language Processing?](#heading-what-is-natural-language-processing)
- [How NLP Systems Interpret Speech](#heading-how-nlp-systems-interpret-speech)
- [Typical NLP tasks](#heading-typical-nlp-tasks)
- [Conventional Machine Learning Methods for NLP](#heading-conventional-machine-learning-methods-for-nlp)
- [How to Use NLP in Various Industries](#heading-how-to-use-nlp-in-various-industries)
- [How to Choose the Most Effective NLP Tools and Libraries](#heading-how-to-choose-the-most-effective-nlp-tools-and-libraries)
- [How to Prepare and Train NLP systems](#heading-how-to-prepare-and-train-nlp-systems)
- [Establishing and Labeling Datasets](#heading-establishing-and-labeling-datasets)
- [Conclusion](#heading-conclusion)

---

## What is Natural Language Processing?

NLP (natural language processing) is a set of methodologies that allow computers to learn to comprehend human language and produce relevant outputs.

NLP manages the intricacy of human communication. In contrast to conventional machine learning, which operates with structured data only, NLP handles unstructured text data.

Specifically, to more accurately comprehend language, NLP systems simultaneously analyze the syntax (which is the arrangement of words and grammar), the semantics (the meanings of specific words and phrases), and interpret context (how adjacent information affects meaning). This allows them to differentiate between various interpretations of identical words, grasp implied messages, and produce responses as relevant as possible.

The ability of machines to process language was demonstrated by early experiments such as the Georgetown-IBM translation in 1954 and the ELIZA chatbot in 1966 (Sources: [<VPIcon icon="fas fa-globe"/>Szmurlo and Akhtar, MDPI; Hutchins, ResearchGate](https://mdpi.com/2078-2489/15/8/443)). With today's tools, any developer can access and use the capabilities of NLP tools.

So why is this important for you? In 2025, the market for NLP, which currently powers chatbots, translation software, and content creation platforms, has reached $42.47 billion.[^1]

[^1]: Source: [<VPIcon icon="fas fa-globe"/>Precedence Research](https://precedenceresearch.com/natural-language-processing-market)

The growth is only accelerating. By 2030, the global NLP market is expected to grow to $439.85 billion.

[^2] Source: [<VPIcon icon="fas fa-globe"/>GrandviewResearch](https://grandviewresearch.com/industry-analysis/natural-language-processing-market-report#:~:text=The%20global%20natural%20language%20processing,38.7%25%20from%202025%20to%202030.)

![NLP market size](https://cdn.hashnode.com/res/hashnode/image/upload/v1762161849212/b2e0b1b5-8b91-4061-a647-2488a7396548.png)

### Important NLP Concepts to Know

Five interconnected layers generally make up NLP systems. Every layer addresses a distinct language processing problem.[^3]

[^3]: Source: [<VPIcon icon="fas fa-globe"/>Khatri and others, ResearchGate).](https://researchgate.net/publication/350058919_Natural_Language_Processing_History_Evolution_Application_and_Future_Work)

- [**Analysis of morphology**](https://researchgate.net/publication/350058919_Natural_Language_Processing_History_Evolution_Application_and_Future_Work) is where you break down words into their most meaningful components by this layer. Words will be broken down into prefixes, roots, and suffixes. For instance, "working" becomes "work" plus "ing." This makes it easier for your system to comprehend word relationships even when they change form.
- **Analysis of syntactic structure** is where you use grammar rules to determine sentence structure. Here, you construct parse trees that map the grammatical relationships between words. Individual words are represented as leaves, phrases as intermediate nodes, and sentences as roots in the tree.
- **Analysis of semantics** is where, from the parsed structure, you derive the true meaning.
- You deal with synonyms, antonyms, and homophones as well as word ambiguity. This transforms grammatical structure into meaning.
- **Analysis of** **discourse** is where you connect sentences within longer text structures. You'll observe how ideas flow from one paragraph to the next and spot recurring themes. This connects meaning at the sentence level to meaning at the document level.
- **Analysis of** **pragmatics** is where you decipher intent and context. You will be able to resolve references, comprehend dialogue structure, and decipher implied meanings. You can process sarcasm, cultural background, and other aspects of everyday communication at this layer.

Understanding these layers gives you the ability to build NLP systems that can manage challenging language tasks in a variety of contexts.

---

## How NLP Systems Interpret Speech

NLP systems use a pipeline to convert raw text into computational meaning. Each step builds on its predecessor, allowing for better analysis of unstructured language data. In this section, I’ll provide real snippets of code you can insert into an editor for training.

### Step 1: Text Input

To start, your system will take in raw text that can come in various forms. Potential sources for raw input include emails, social media posts, articles, documents, or transcripts of speeches. The raw data will contain misspellings, crude language, and grammatical mistakes you'll need to circumvent.

### Step 2: Text Preprocessing

Next, you’ll need to clean and standardize the input text before your system analyzes it. Your pre-process will likely include some or all of these steps:

- Tokenizing text into single words or subwords
- Removing punctuation marks from the text
- Lower casing all the text
- Removing stop words like "the", "and," and "is."

For example, you can accomplish such a simple form of NLP using Python, but note that you need to import specific libraries (we will discuss them later):

```py
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')

# Raw text input
text = "The quick brown fox jumps over the lazy dog!"

# Tokenization
tokens = word_tokenize(text.lower())

# Remove punctuation and stop words
stop_words = set(stopwords.words('english'))
filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]

print(filtered_tokens)
#
# ['quick', 'brown', 'fox', 'jumps', 'lazy', 'dog']
```

### Step 3: Syntactic Parsing and Analysis

After cleaning, you’ll analyze the text’s grammatical structure by constructing parse trees. While parse trees can vary in complexity, they map the relationships between words, phrases, and clauses. You can leverage part-of-speech tagging information to assign grammatical roles (noun, verb, adjective, and so on) to words, and dependency parsing to learn how related words are linked syntactically.

For example, the code below illustrates how to perform part-of-speech tagging with spaCy, which determines the grammatical function of each word within a sentence.

```py
import spacy

# Load English language model
nlp = spacy.load("en_core_web_sm")

# Process text
doc = nlp("The cat sat on the mat")

# Part-of-speech tagging
for token in doc:
    print(f"{token.text}: {token.pos_}")
#
# The: DET
# cat: NOUN
# sat: VERB
# on: ADP
# the: DET
# mat: NOUN
```

### Step 4: Feature Engineering and Text Representation

Here, you convert words into numerical vectors that computers can parse using embedding or transformer-based techniques to capture similarities and semantic relationships between terms. For instance, this allows your system to understand that the words "kid" and "child" are similar in meaning.

```py
from sentence_transformers import SentenceTransformer

# Load pre-trained model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Convert sentences to embeddings
sentences = ["The cat sits on the mat", "The feline rests on the rug"]
embeddings = model.encode(sentences)

print(f"Embedding shape: {embeddings.shape}")
#
# Embedding shape: (2, 384)
```

### Step 5: Modeling and Pattern Recognition

In this part of the process, you’ll use machine learning algorithms to identify patterns from vectorized text. You may use either a traditional machine learning representation or one of the deep learning methods, such as transformers. Your models will learn about patterns in the language, classify the content presented, or extract entities in the text.

To understand this method, let’s see a straightforward example of a text classification model that uses transformers to identify sentiments.

```py
from transformers import pipeline

# Load a pre-trained sentiment analysis model
classifier = pipeline("sentiment-analysis")

# Classify text sentiment
texts = ["I love this product!", "This is terrible and disappointing"]
results = classifier(texts)

for text, result in zip(texts, results):
    print(f"Text: {text}")
    print(f"Sentiment: {result['label']}, Confidence: {result['score']:.2f}\n")
#
# Text: I love this product!
# Sentiment: POSITIVE, Confidence: 0.99
#
# Text: This is terrible and disappointing
# Sentiment: NEGATIVE, Confidence: 0.99
```

This illustrates how the model detects linguistic patterns for sentiment categorization, which is a typical task in NLP. In subsequent sections, we’ll delve into more specialized modeling techniques tailored for various NLP applications.

### Step 6: Evaluation and Deployment

Next, you will evaluate your model from metrics such as precision, recall, and F1 scores. After evaluation, you will deploy your model to production, and the model will continue to learn from data produced from real-world text. Here’s an example of how it’s done:

```py
from sklearn.metrics import classification_report

# Example predictions vs actual labels
y_true = [0, 1, 1, 0, 1]
y_pred = [0, 1, 0, 0, 1]

# Generate evaluation metrics
print(classification_report(y_true, y_pred))
```

---

## Typical NLP Tasks

### Natural Language Understanding (NLU) tasks

Natural Language Understanding (NLU) tasks deal with actually understanding what people are communicating about. There are several elements involved in this process.

#### Sentiment analysis and text classification

Here, you recognize and categorize documents according to emotion. Your engine identifies whether the text conveys a positive, negative, or neutral sentiment. Then, it autonomously filters content across digital platforms. Consider this example:

```py
from transformers import pipeline

# Load sentiment analysis pipeline
classifier = pipeline("sentiment-analysis")

# Analyze sentiment
result = classifier("I love this product! It works great.")
print(result)
#
# [{'label': 'POSITIVE', 'score': 0.9998}]
```

#### Named Entity Recognition (NER)

NER is a pipeline that involves automatically identifying and classifying distinct pieces of information within a body of text. This includes names of people, locations, organizations, dates, and monetary figures.

Your NER system analyzes unstructured text to accurately label these entities, converting raw data into a structured format that can be easily analyzed. Your algorithm can also uncover relationships among these entities, allowing you to gain valuable insights from extensive amounts of text.

```py
import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Apple Inc. was founded by Steve Jobs in Cupertino, California.")

for ent in doc.ents:
     print(f"{ent.text}: {ent.label_}")
#
# Apple Inc.: ORG
# Steve Jobs: PERSON
# Cupertino: GPE
# California: GPE
```

#### Question answering

You can create systems that consume natural language questions and retrieve appropriate answers. Your system can also use entailment and contradiction detection to analyze the logical relationships between text blocks.

#### Intent recognition

You can recognize user intentions in conversational domains. Your dialog systems are conscious of the user’s goals, allowing buttons or voices to respond in kind.

Now, let’s move on to some general natural language-related tasks.

### General Natural Language Tasks

This class of tasks pulls together some aspects of understanding while dealing with generation as well.

#### Machine translation

You can translate text across multiple languages while preserving context and meaning. Neural networks use encoder-decoder architectures to create linguistic outputs in the target language.

Let’s see how it’s done with the MarianMTModel and MarianTokenizer models:

```py
from transformers import MarianMTModel, MarianTokenizer

# Load translation model
model_name = 'Helsinki-NLP/opus-mt-en-es'
tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)

# Translate English to German
text = "Hello, how are you?"
translated = model.generate(**tokenizer(text, return_tensors="pt", padding=True))
print(tokenizer.decode(translated[0], skip_special_tokens=True))
#
# Hallo, wie geht's dir?
```

#### Text summarization

Often you’ll need to shorten a long document into a more accessible summary – this is text summarization, and it’s a common NLP task. Your system retains key details and coherence while reducing the length of a document.

#### Speech recognition and text-to-speech

Using these techniques, you can turn speech into text (speech recognition) or text into natural audio (text-to-speech). These tasks close the gap between text and audio modalities.

#### Syntactic parsing

Here, you examine the grammatical construction to determine the syntactic relationships between words in the sentence. This critical task gives a structural analysis of the text to support more complex understanding tasks.

These tasks, when combined, create powerful applications for different industries and use cases in Natural Language Processing.

---

## Conventional Machine Learning Methods for NLP

Instead of relying on manually created linguistic rules (where programmers specify patterns like "if a word ends with '-ing', it is likely a verb" or "sentences containing 'not' followed by positive words suggest negative sentiment"), ML approaches apply statistical methods to discover patterns automatically within the data.

These methods learn through examples and don’t require human experts to define every potential language structure explicitly. As a result, they are more scalable and adaptable across different languages and fields. Let’s look at some of them now.

### Logistic Regression

For tasks involving binary classification, you can use logistic regression. Based on input features, it predicts event probability by learning linear decision boundaries. Consider the following example:

```py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Sample data
texts = ["This is spam", "Normal email", "Buy now!", "Meeting tomorrow"]
labels = [1, 0, 1, 0]  # 1 = spam, 0 = not spam

# Convert text to features
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.25)
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict
new_text = vectorizer.transform(["Free money now"])
prediction = model.predict(new_text)
print(f"Prediction: {'Spam' if prediction[0] == 1 else 'Not Spam'}")
```

Typical uses include toxicity classification, sentiment analysis, and spam detection.

### Naive Bayes

Using the premise that words are independent, [**Naive Bayes**](/freecodecamp.org/how-naive-bayes-classifiers-work.md) applies [**Bayes' Theorem**](/freecodecamp.org/bayes-rule-explained.md).

To classify documents, it computes:

$$
P\left(label|text\right) = P\left(label\right)\times{P\left(text|label\right)} / P\left(text\right)
$$

```py
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

# Training data
texts = ["I love this product", "Terrible service", "Amazing quality", "Waste of money"]
labels = [1, 0, 1, 0]  # 1 = positive, 0 = negative

# Vectorize text
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

# Train Naive Bayes
clf = MultinomialNB()
clf.fit(X, labels)

# Predict sentiment
new_review = vectorizer.transform(["Great purchase"])
print(f"Sentiment: {'Positive' if clf.predict(new_review)[0] == 1 else 'Negative'}")
```

Common uses for this algorithm that you can try are spam detection and bug detection in software.

### Decision Trees

Decision trees partition data sets recursively by choosing the feature that maximizes information gain at each split in a way that builds interpretable, tree-like models. Each internal node is a decision (on a feature), each branch is an outcome of the decision, and each leaf node is a classification.

Decision trees are especially useful for text classification and feature selection because the decision tree allows you to trace exactly how the model made the predicted classification.

Let’s see a code example that shows how the decision tree learns which words, converted to TF-IDF features, predict whether the sentiment of the text in question is positive or negative:

```py
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split

# Sample text data with labels
texts = [
    "I love this movie, it's fantastic",
    "Terrible film, waste of time",
    "Amazing performance and great story",
    "Boring and disappointing",
    "Excellent cinematography and acting",
    "Awful, would not recommend"
]
labels = [1, 0, 1, 0, 1, 0]  # 1 = positive, 0 = negative

# Convert text to TF-IDF features
vectorizer = TfidfVectorizer(max_features=20)
X = vectorizer.fit_transform(texts)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.3, random_state=42)

# Train decision tree
clf = DecisionTreeClassifier(max_depth=3, random_state=42)
clf.fit(X_train, y_train)

# Make predictions
test_text = ["This movie is wonderful"]
test_vector = vectorizer.transform(test_text)
prediction = clf.predict(test_vector)

print(f"Text: {test_text[0]}")
print(f"Predicted sentiment: {'Positive' if prediction[0] == 1 else 'Negative'}")
print(f"Model accuracy: {clf.score(X_test, y_test):.2f}")
```

At each node, the decision tree asks a question: "Does the text have a high TF-IDF score for 'wonderful'?" Then the tree will branch accordingly based on the answer to the question until reaching a classification.

One key parameter in the above code is `max_depth=3` – without it, the tree may become too complex and overfit. The parameter limits the complexity of the tree.

### Latent Dirichlet Allocation (LDA)

Latent Dirichlet Allocation (LDA) automatically determines thematic structures in large collections of texts by treating documents as probabilistic mixtures of topics, and topics as distributions over words. This discovery approach uses unsupervised learning, which means that no labeled training data are needed to discover structured but hidden themes. LDA is suited for exploratory text analysis and organization of data in significant amounts of text.

Let’s see some code that generates a word frequency matrix from documents. In this code, LDA identifies two underlying topics based on patterns of word co-occurrence, a process that is a type of clustering analysis for text documents.

```py
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer

# Document collection
documents = [
    "Machine learning algorithms process data",
    "Deep learning uses neural networks",
    "Python is great for data science",
    "Neural networks learn from examples"
]

# Create document-term matrix
vectorizer = CountVectorizer(max_features=50)
doc_term_matrix = vectorizer.fit_transform(documents)

# Train LDA model
lda = LatentDirichletAllocation(n_components=2, random_state=42)
lda.fit(doc_term_matrix)

# Display topics
feature_names = vectorizer.get_feature_names_out()
for topic_idx, topic in enumerate(lda.components_):
    top_words_idx = topic.argsort()[-5:]
    top_words = [feature_names[i] for i in top_words_idx]
    print(f"Topic {topic_idx}: {', '.join(top_words)}")
```

In this illustration, we could interpret Topic 0 as "data science and algorithms," and Topic 1 as "neural networks and deep learning." The LDA model will assign, in a mixed model fashion, a probability distribution of each document falling under the two topics. For instance, a document titled "neural networks for data processing" could be considered 60% Topic 1 and 40% Topic 0. ### Deep Learning Models

Deep learning models automatically extract hierarchical representations from raw text without manual feature engineering. Applying deep learning to language processing is important because language understanding requires modeling not just individual words, but also phrases, sentences, and the context as a whole.

A neural architecture achieves this modeling by learning multiple layers of abstraction and can interpret the sentences in more complex ways, such as sentiment, intent, or topic.

Let’s illustrate how it works with an example showing a simplified deep learning model that can be used for text classification using TensorFlow/Keras. This specific example uses an embedding layer to map words to dense vectors that capture their semantic meaning, as well as a Bidirectional LSTM layer which is able to capture information from the past and future of a sequence and outputs to a Dense layer for binary classification.

```py
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Example sentences and labels
texts = ["I like this movie", "I hate this movie"]
labels = [1, 0]  # 1 = positive, 0 = negative

# Tokenize text and pad sequences
tokenizer = Tokenizer(num_words=50)
tokenizer.fit_on_texts(texts)
X = pad_sequences(tokenizer.texts_to_sequences(texts), maxlen=5)

# Simple model: embedding + LSTM + output
model = Sequential([
    Embedding(input_dim=50, output_dim=8, input_length=5),
    LSTM(4),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy')
model.fit(X, labels, epochs=5, verbose=0)

# Predict sentiment for new sentence
test_text = ["I love this"]
test_seq = pad_sequences(tokenizer.texts_to_sequences(test_text), maxlen=5)
pred = model.predict(test_seq)[0][0]

print(f"Sentiment score: {pred:.2f} (1=positive, 0=negative)")
```

The model learns these patterns from example sentences that have been labeled as positive or negative and then uses those learned patterns to predict the sentiment of new text input. This is an example of how deep learning models learn to automatically represent the text that is processed and then use that representation to interpret sequences of text for classification purposes, without any feature engineering.

### Convolutional Neural Networks (CNNs)

CNNs apply the same pattern-detecting framework to the text as they do to image recognition. CNNs see documents as sequences, and when a convolutional filter is applied across the text, it detects patterns for various types of features, such as n-grams (sequences of symbols that are adjacent to one another), and meaningful phrases.

CNNs encompass multi-filter layers to detect different features. Each filter layer detects features that are continuously more abstract, going from simple combinations of words to capturing combinations of words that are consistently used in semantic patterns, creating an effective use for the text classification task.[^4]

[^4]: Source: [<VPIcon icon="fas fa-globe"/>Yoon Kim](https://arxiv.org/abs/1408.5882)

Here is an example of the convolutional layer scanning through the text using filters. It detects meaningful patterns established through previous learning, such as the word "excellent" or "terrible waste," learning to treat each combination of words as expressing a positive or negative sentiment during a final classification step.

```py
import tensorflow as tf
from tensorflow.keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Sample training data
texts = [
    "This movie is excellent and entertaining",
    "Terrible film, complete waste",
    "Amazing story and great acting",
    "Boring and poorly made"
]
labels = [1, 0, 1, 0]  # 1 = positive, 0 = negative

# Tokenize and pad sequences
tokenizer = Tokenizer(num_words=100)
tokenizer.fit_on_texts(texts)
sequences = tokenizer.texts_to_sequences(texts)
X = pad_sequences(sequences, maxlen=10)

# Build CNN model
model = Sequential([
    Embedding(input_dim=100, output_dim=32, input_length=10),  # Convert words to dense vectors
    Conv1D(filters=64, kernel_size=3, activation='relu'),  # Detect 3-word patterns
    GlobalMaxPooling1D(),  # Extract most important features
    Dense(1, activation='sigmoid')  # Binary classification
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X, labels, epochs=10, verbose=0)

# Test prediction
test_text = ["wonderful movie with great plot"]
test_seq = tokenizer.texts_to_sequences(test_text)
test_pad = pad_sequences(test_seq, maxlen=10)
prediction = model.predict(test_pad)

print(f"Sentiment probability: {prediction[0][0]:.2f}")
print(f"Classification: {'Positive' if prediction[0][0] > 0.5 else 'Negative'}")
```

The pooling layer analyzes this filtered text and brings forth the most substantial signals for measuring positive versus negative sentiments from the convolutional text features of the previous steps.

### Recurrent Neural Networks (RNNs)

RNNs handle sequential data by tracking hidden states that reflect dependencies over time. At each time step, the RNN receives the current word and the previous hidden state as input and changes the hidden state, which reflects the accumulated context.

Here's a concrete example where, as the RNN reads the next word from left to right, it updates its hidden state to maintain the context.

```py
import tensorflow as tf
from tensorflow.keras.layers import Embedding, SimpleRNN, Dense
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Training data
texts = [
    "I really enjoyed this book",
    "The plot was confusing and dull",
    "Fantastic read, highly recommend",
    "Disappointing and poorly written"
]
labels = [1, 0, 1, 0]

# Prepare data
tokenizer = Tokenizer(num_words=100)
tokenizer.fit_on_texts(texts)
sequences = tokenizer.texts_to_sequences(texts)
X = pad_sequences(sequences, maxlen=10)

# Build RNN model
model = Sequential([
    Embedding(input_dim=100, output_dim=32, input_length=10),
    SimpleRNN(units=64, return_sequences=False),  # Process sequence and maintain hidden state
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X, labels, epochs=20, verbose=0)

# Test
test_text = ["amazing story highly engaging"]
test_seq = tokenizer.texts_to_sequences(test_text)
test_pad = pad_sequences(test_seq, maxlen=10)
prediction = model.predict(test_pad)

print(f"Sentiment probability: {prediction[0][0]:.2f}")
```

Longer sentences are more complex because the information contained in the hidden state is lost over an ever-increasing number of time steps. That's the motivation for the more sophisticated architectures of long short-term memory (LSTM) and gated recurrent unit (GRU).

### Encoder-Decoder Architectures

These architectures have two neural networks which work together. The first encoder neural network takes the input text and reduces it to a dense, fixed-size representation but encodes the essential meaning. Then a second decoder network generates an output text based on the meaning representation.

These architectures learn a compressed representation of the input data, and they are often used for:

- Dimensionality reductions.
- Feature learning.
- Document clustering.
- Sequence-to-sequence tasks (for example, translations or summarizations).

The following example illustrates how to use a Text-to-Text Transfer Transformer (T5) encoder-decoder model to translate English into German. The encoder takes the input English sentence and builds its internal representation of the text, while the decoder generates the German translation based on the representation:

```py
from transformers import T5Tokenizer, T5ForConditionalGeneration

# Load T5 model for text generation
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

# Translate text
input_text = "translate English to German: Hello, how are you?"
input_ids = tokenizer(input_text, return_tensors="pt").input_ids

# Generate translation
outputs = model.generate(input_ids)
translation = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(f"Translation: {translation}")
```

This architecture solves the issue of variable-length input and output in a very elegant way. The encoding neural network reduces the sentence to a fixed-size representation regardless of the input length. Subsequently, the decoder generates an output for whatever length it determines is appropriate based on the input length, whether it’s one sentence or six sentences.

### Transformer Models

Unlike RNNs, in which text is processed sequentially (one word at a time), transformers use a processing mechanism that evaluates the sequence in parallel. This means that the transformer can simultaneously consider all of the words in a sentence and directly compute relationships between any two words, even apart in distance.

In the example below, "The girl didn't go to school because she was ill," the model directly connects "she" with "girl" despite other words between these two. This brings a faster ability to train on information and helps avoid the degradation of information through time steps.[^5]

[^5]: Source: [<VPIcon icon="fas fa-globe"/>Vaswani and others.](https://papers.neurips.cc/paper/7181-attention-is-all-you-need.pdf)

In the example, BERT, one of the most well-known transformer models, performs sentiment classification on a text. Here’s how the transformer justifies text classification by understanding pre-trained language and only using minimal additional training:

```py
from transformers import BertTokenizer, BertForSequenceClassification
import torch

# Load pre-trained BERT
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased')

# Prepare input
text = "This movie was fantastic!"
inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

# Get predictions
with torch.no_grad():
    outputs = model(**inputs)
    predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)

print(f"Prediction scores: {predictions}")
```

In the above code, the tokenizer converts the sequence of text into numerical tokens (which BERT understands) and special tokens, such as [CLS] (for classification), at the beginning of the list of tokens. BERT then models the entire length of the sentence using multiple layers, where each layer is able to learn abstract representations of meaning in each layer.

---

## How to Use NLP in Various Industries

You can use NLP to solve issues in almost any sector, and there are many sector-specific implementations. You can choose to try the snippets below depending on the area you’re most interested in.

### Tourism and Hospitality

You can use NLP techniques to build intelligent booking systems that comprehend natural language requests from clients. Important uses you can apply:

- **Sentiment analysis** monitors consumer feedback to spot patterns in satisfaction and problems with customer service.
- **NER-enabled chatbots** retrieve dates and locations from consumer inquiries such as "I need a flight to Paris next Tuesday."

Here’s an example:

```py
from transformers import pipeline

# Load NER model
ner = pipeline("ner", grouped_entities=True)

# Extract booking information
query = "I need a hotel in London from December 15 to December 20"
entities = ner(query)

for entity in entities:
    print(f"{entity['entity_group']}: {entity['word']}")
# Output: LOC: London
```

Through machine translation, you can provide multilingual support to your customers in various languages. And an intent classification model based on BERT automatically identifies how to route your customers for service or makes bookings automatically for them.

### Logistics and Supply Chain

You can automate document processing via NLP and optimize delivery routing using predictive algorithms. Let’s see the common areas of application:

- **You can use OCR to process documents** to automatically extract shipping information from invoices and customs forms. Here’s an example:

```py
import pytesseract
from PIL import Image

# Extract text from shipping document
image = Image.open('invoice.png')
text = pytesseract.image_to_string(image)

# Parse extracted information
# (Add parsing logic based on document structure)
```

- **Text classification** can place shipments into categories based on descriptions, allowing for recursive sorting of shipments for transport.
- **Predictive routing models** can use historical delivery data and weather reports to create delivery schedules.
- **Natural Language Generation** takes technical data across logistics to create user-friendly tracking updates.

### Retail and eCommerce

Within the eCommerse operations, you can personalize your customers’ shopping experience and optimize pricing with NLP techniques.

Some key applications that you can benefit from:

- **Recommendation engines** utilize word embeddings to learn product descriptions and corresponding user reviews to suggest relevant items. Here’s how, for instance:

```py
from sentence_transformers import SentenceTransformer, util

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Product descriptions
products = [
    "Wireless Bluetooth headphones with noise cancellation",
    "USB-C charging cable for smartphones",
    "Noise-cancelling earbuds with long battery life"
]

# User query
query = "I need headphones that block outside noise"

# Calculate similarities
query_embedding = model.encode(query)
product_embeddings = model.encode(products)
similarities = util.cos_sim(query_embedding, product_embeddings)

# Find best match
best_match_idx = similarities.argmax()
print(f"Recommended product: {products[best_match_idx]}")
```

- **Chatbots that include dialogue management** can respond to inquiries from customers about products, orders, and returns.
- **Sentiment analysis** on social media tracks brand health and customer sentiment in real-time.
- **Price optimization algorithms** analyze competitors' pricing and market signals to change prices in real-time.
- **Demand forecasting** analyzes news and social sentiment to predict inventory needs.

### Healthcare

Healthcare, with the great amount of data from patient records, is a natural area for NLP to optimize. You can support clinical decision-making and process medical records using specialized NLP systems.

Here are a few of the possible uses and an example:

- **Clinical NER** identifies conditions, medications, and treatments mentioned in the clinicians' notes within electronic health records. For instance:

```py
import spacy

# Load medical NER model (requires installation of scispacy)
# pip install scispacy
# pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/en_core_sci_sm-0.5.1.tar.gz

nlp = spacy.load("en_core_sci_sm")

# Process clinical note
text = "Patient presents with hypertension and type 2 diabetes. Prescribed metformin 500mg."
doc = nlp(text)

for ent in doc.ents:
    print(f"{ent.text}: {ent.label_}")
```

- **Clinical decision support systems** scan descriptions of symptoms and provide suggestions for potential diagnoses to help a physician's decision-making.
- **Literature mining** scans clinical studies and identifies new treatment patterns or potential drug discovery targets.

Of course, NLP can also be used in patient assistance chatbots, as they can comprehend natural language and its nuances.

### Financial Services

In the finance sector, there are unique bottlenecks you might face. Financial data security gaps and the risks of fraud are among the most threatening ones, as well as the regulatory fines that come with these issues.

With NLP, you can improve security mechanisms and create systems for detecting fraud.

You can also detect phishing attacks with high accuracy with ML classifiers and NLP using CNNs and RNNs combined.[^6]

[^6]: Source: [<VPIcon icon="fas fa-globe"/>Saidat and others, ResearchGate.](https://researchgate.net/publication/385251725_ScienceDirect_Advancements_of_SMS_Spam_Detection_A_Comprehensive_Survey_of_NLP_and_ML_Techniques)

Some other use cases include:

- **Document analysis processes loans** applications/contract to assess credit risk by automated analysis of documents.
- **Fraud detection systems analyze transaction data** and communication dat to identify suspicious activity. For example:

```py
from transformers import pipeline

# Load zero-shot classification model
classifier = pipeline("zero-shot-classification")

# Analyze transaction description
description = "Wire transfer to offshore account for investment opportunity"
candidate_labels = ["legitimate transaction", "potential fraud", "suspicious activity"]

result = classifier(description, candidate_labels)
print(f"Classification: {result['labels'][0]} (Score: {result['scores'][0]:.4f})")
```

- **Automated compliance monitoring** scans messages for adherence with regulations.
- **Robo-advisors leverage natural language interfaces** to engage with clients while providing investment advice.

Apart from these uses, conventional chatbots also provide assistance by using NLP techniques. OCR algorithms are widely used for document analysis – but we’ve mentioned those other use cases, so we won’t discuss them further here.

### Legal Industry and Compliance Regulations

Even more than financial services, the legal sector depends on strict requirements, laws, and regulations. NLP techniques can help you improve safety, security, and efficiency in processing legal documents.

Key examples of how it can be applied:

- **Multimodal authentication** is a secure identity verification process consisting of a combination of facial recognition, voice recognition, and natural language processing.
- **Speaker recognition** uses automatic speech-to-text encoding and intent recognition to process a verbal response to security questions.
- **Contract analysis** scans legal documents to identify key terms, deliverables, and dates, extracting that information automatically. As an example, you can try the following snippet with the spaCy library installed:

```py
import spacy

nlp = spacy.load("en_core_web_sm")

# Extract dates and obligations from contract
contract_text = "The agreement shall commence on January 1, 2026 and continue for a period of 12 months."
doc = nlp(contract_text)

for ent in doc.ents:
    if ent.label_ in ["DATE", "CARDINAL"]:
        print(f"{ent.label_}: {ent.text}")
```

- **Compliance monitoring** looks for possible regulatory infractions in legal communications.

These real-world examples show how NLP can be used to solve practical business issues and boost operational effectiveness. You can modify the samples to your case or discover other potential uses, but these are the most widespread ones for you to try.

---

## How to Choose the Most Effective NLP Tools and Libraries

There is a great variety of tools and libraries that can help you learn how to use NLP or that you can use to implement NLP into a project. You should select the appropriate tools considering your project needs and background in the associated technologies.

Below are some popular tools you can choose to learn or check out, along with tips about when they’re most useful.

### Hugging Face Transformers

<SiteInfo
  name="Transformers"
  desc="We’re on a journey to advance and democratize artificial intelligence through open source and open science."
  url="https://huggingface.co/docs/transformers/en/index/"
  logo="https://huggingface.co/favicon.ico"
  preview="https://huggingface.co/front/thumbnails/docs/transformers.png"/>

Hugging Face Transformers has thousands of pre-trained models for text generation, classification, and question answering. It gives you more than 100 languages supported and is compatible with PyTorch and TensorFlow.

It also provides model hosting and datasets, and allows collaboration with community members. It will assist you with deep learning NLP applications that require top-notch software to implement the algorithms.

![Hugging Face](https://cdn.hashnode.com/res/hashnode/image/upload/v1762166821354/51df5644-2713-46c8-b24d-e0d7a51bd61d.png)

### NLTK (Natural Language Toolkit)

```component VPCard
{
  "title": "NLTK :: Natural Language Toolkit",
  "desc": "NLTK is a leading platform for building Python programs to work with human language data. It provides easy-to-use interfaces to over 50 corpora and lexical resources such as WordNet, along with a suite of text processing libraries for classification, tokenization, stemming, tagging, parsing, and semantic reasoning, wrappers for industrial-strength NLP libraries, and an active discussion forum.",
  "link": "https://nltk.org/",
  "logo": "",
  "background": "rgba(244,245,255,0.2)"
}
```

NLTK is the primary package in Python for education and research concerning NLP. Developed at the University of Pennsylvania, it provides extensive packages for your tokenizers, stemmers, parsers, and semantic reasoning. It’s a great choice if you need to get learning concepts in NLP or conduct research projects.

### spaCy

<SiteInfo
  name="spaCy · Industrial-strength Natural Language Processing in Python"
  desc="spaCy is a free open-source library for Natural Language Processing in Python. It features NER, POS tagging, dependency parsing, word vectors and more."
  url="https://spacy.io/"
  logo="https://spacy.io/icons/icon-192x192.png"
  preview="https://spacy.io/_next/static/media/social_default.96b04585.jpg"/>

spaCy is a Python library developed to be production-ready, and has the fastest syntactic parser. It’s constructed using Cython for optimal performance and offers excellent named entity recognition. It will fit well if you need strong dependency parsing and a developer-friendly API. It’s easy for you to use spaCy for quick prototyping.

![SpaCy](https://cdn.hashnode.com/res/hashnode/image/upload/v1762166854654/b563410d-b978-498a-a52e-9e6bc58f732c.png)

### Google Cloud NLP

<SiteInfo
  name="Cloud Natural Language"
  desc="Analyze text with AI using pre-trained API to extract relevant entities, understand sentiment, and more."
  url="https://cloud.google.com//natural-language/"
  logo="https://gstatic.com/cgc/favicon.ico"
  preview="https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"/>

Google Cloud NLP also offers enterprise-level API services. It will fit your project if you need sentiment analysis, entity recognition, syntax analysis, automatic language identification, and simple, trouble-free scaling. And if you’re already in the Google Cloud ecosystem working with big volumes of customer feedback, it’s just what you need.

### Amazon Comprehend

```component VPCard
{
  "title": "Amazon Comprehend",
  "desc": "Amazon Comprehend는 기계 학습을 사용하여 문서 내의 비정형 데이터 및 텍스트에서 정보를 파악하는 자연어 처리(NLP) 서비스입니다.",
  "link": "https://aws.amazon.com/ko/comprehend//",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(51,51,51,0.2)"
}
```

Comprehend is a fully-managed service from AWS for text analysis in the cloud. It supports the major functions you might want to cover: sentiment analysis, entity recognition, topic modeling, built-in protection of personally identifiable information (PII), and auto-scaling. And it’s perfect if you need a built-in integration with the AWS suite.

![Amazon Comprehend](https://cdn.hashnode.com/res/hashnode/image/upload/v1762167136170/6cc6a502-adbc-401f-a9e7-957d7facbe0c.png)

### IBM Watson

<SiteInfo
  name="IBM watsonx as a Service"
  desc="The Watson Natural Language Processing library provides natural language processing functions for syntax analysis and pre-trained models for a wide variety of text processing tasks, such as sentiment analysis, keyword extraction, and classification. The Watson Natural Language Processing library is available for Python only."
  url="https://ibm.com/docs/en/watsonx/saas?topic=scripts-watson-natural-language-processing/"
  logo="https://ibm.com/favicon.ico"
  preview="https://1.s81c.com/common/images/ibm-leadspace-1200x627.jpg"/>

Watson has NLP models specific to regulated industries (healthcare, finance, and so on). Its library offers pre-trained models in 20 programming languages. Its top features you can use are strong data controls, reliable REST API access, and truly compliance-ready outputs. These makes this tool a great choice if you’re in healthcare, finance, or legal industries.

### TextBlob

```component VPCard
{
  "title": "TextBlob: Simplified Text Processing — TextBlob 0.19.0 documentation",
  "desc": "TextBlob is a Python library for processing textual data. It provides a simple API for diving into common natural language processing (NLP) tasks such as part-of-speech tagging, noun phrase extraction, sentiment analysis, classification, and more",
  "link": "https://textblob.readthedocs.io/en/dev//",
  "logo": "https://textblob.readthedocs.io/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

TextBlob is a simplified library that’s a great option if you’re a beginner. It’s a user-friendly Python library for common NLP tasks. For your convenience, it offers a simplified API design, but still provides decent sentiment analysis, translation, spelling correction, and noun phrase extraction. Apart from beginner projects, it will fit your quick prototypes creation needs.

![TextBlob](https://cdn.hashnode.com/res/hashnode/image/upload/v1762167252639/9961064e-1311-4423-bb6c-57aa15b11fc4.png)

---

## How to Prepare and Train NLP Systems

As you get ready to train your NLP model, you’ll need to prepare your data accurately to ensure its quality doesn’t hinder the outputs. Remember that poor quality data results in a poor performing model, so you’ll want to make sure you have solid data.

### Understanding Data Quality and Preprocessing

Raw text data is messy and unstructured. It contains typos, slang, and irrelevant information that degrades the performance of your model.

Preprocessing is the operation that takes messy data and converts it into clean, structured text that models can accept as input.

Research shows that 85.4% of NLP research studies utilized some sort of restructuring/preprocessing to allow NLP models to process raw text. The key data quality components that were essential included accuracy (68.3%), relevance (34.1%) and comparability (31.7%).[^7]

[^7]: Source: [<VPIcon icon="fas fa-globe"/>Nesca and others, NCBI.](https://pmc.ncbi.nlm.nih.gov/articles/PMC10476151/)

Preprocessing comes down to a specific list of tasks you’ll need to perform. Let’s break them down.

### Text Cleaning

Text cleaning is the process of standardizing the text format by removing anything that may affect model training. Raw text often contains extra elements (HTML tags, URLs, special characters, inconsistent use of capitalization, and excess whitespace) that add noise to your data.

The following example shows a cleaning pipeline that removes the above-mentioned elements. This function performs multiple steps of text cleaning:

```py
import re

def clean_text(text):
    # Convert to lowercase
    text = text.lower()

    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
        # Remove URLs
    text = re.sub(r'http\S+|www.\S+', '', text)
        # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
        # Remove extra whitespace
    text = ' '.join(text.split())
        return text

# Example
raw_text = "Check out https://example.com! It's <b>AMAZING</b> :-)"
cleaned = clean_text(raw_text)
print(cleaned)
# Output: check out its amazing
```

The first step the model made was to convert everything to lower case for uniformity. Then it used regular expressions to parse the text to remove HTML tags, URLs, special characters, and numbers. Finally, it normalized whitespace by splitting and joining the text back together. The output is clean text, in a standardized format you can use for tokenization.

### Tokenization

The next step is to divide the text into smaller digestible chunks that are easier for ML models to understand. These chunks are known as tokens.

Tokenization comes in three varieties:

- **Word tokenization** separates text according to punctuation and whitespace.
- **Sentence tokenization** uses punctuation cues to divide text into sentences.
- **Subword tokenization** breaks words up into more manageable chunks.

The example below addresses examples of word and sentence tokenizing by using NLTK (Natural Language Toolkit).

```py
from nltk.tokenize import word_tokenize, sent_tokenize

text = "Natural language processing is exciting! It helps computers understand text."

# Word tokenization
words = word_tokenize(text)
print(f"Words: {words}")

# Sentence tokenization
sentences = sent_tokenize(text)
print(f"Sentences: {sentences}")
```

Notice that after word tokenization was performed, the punctuation marks '!' or '.' were considered individual tokens, as punctuation conveys meaning. Sentence tokenization correctly identified the boundaries of the two sentences, and despite the presence of an exclamation mark, it indicated that it had more complex rules beyond just splitting based on periods.

### Stop Word Removal

Here, you reduce the text to the meaning without any extra details. You can do this by removing the commonly used words that have little semantic value – the “stop words”.

Common stop words include articles, prepositions, pronouns, auxiliary verbs and conjunctions. Here’s how to do it:

```py
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('stopwords')

text = "The quick brown fox jumps over the lazy dog"
tokens = word_tokenize(text.lower())

stop_words = set(stopwords.words('english'))
filtered_tokens = [word for word in tokens if word not in stop_words]

print(f"Original: {tokens}")
print(f"Filtered: {filtered_tokens}")
#
# ['quick', 'brown', 'fox', 'jumps', 'lazy', 'dog']
```

### Stemming and Lemmatization

In this next step, you’ll process the text further by reducing words to their root form. This will treat words with similar variations as a single token.

- To be precise, **stemming is simply using heuristic rules** that remove the endings of words. For example (running|runs|run) → run.
- **Lemmatization uses morphological analysis** and vocabulary. For example, (children|mice) → child|mouse.

Lemmatization typically gives better, more accurate outcomes (but calls for more computation at the same time).

Here’s how you can apply both:

```py
from nltk.stem import PorterStemmer, WordNetLemmatizer

stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()

words = ["running", "runs", "ran", "children", "better"]

print("Stemming:")
for word in words:
    print(f"{word} -> {stemmer.stem(word)}")

print("\nLemmatization:")
for word in words:
    print(f"{word} -> {lemmatizer.lemmatize(word, pos='v')}")
```

### Expanding Contractions

AI systems need standardization. And “don’ts” and “you’res” are unacceptable for them. This is why, typically, you would want to expand the contraction to the real word for standardization. Here’s how you can do that:

```py
import contractions

text = "I can't believe it's already 2025. We'll see what happens."
expanded = contractions.fix(text)
print(expanded)
#
# I cannot believe it is already 2025. We will see what happens.
```

### Correcting Spelling Errors

Orthographic, spelling, or grammar errors shouldn’t be in the data that you feed to your ML models. You can make corrections to these errors using statistical language models, which can predict the most likely intended word, edit distance algorithms that can find the closest valid word, or neural approaches that can learn patterns of common errors.

For example, let’s see how TextBlob, a library that uses a mix of a dictionary-based approach and contextual probability, detects and corrects misspellings.

```py
from textblob import TextBlob

text = "Natral languag procesing is powrful"
corrected = TextBlob(text).correct()
print(f"Original: {text}")
print(f"Corrected: {corrected}")
```

TextBlob analyzes each word, identifies which ones are not in its dictionary, calculates edit distances, finds the most similar valid words, and selects corrections based on the frequency of word use in context.

### Parts-of-Speech Tagging

Parts-of-speech tagging (POS) refers to assigning grammatical classification to words based on their role in a sentence. This is important because the same word can function as a different part of speech depending on the context. For example, "walk" can be a noun (like "an evening walk") or a verb (like "I walk to the office").

POS taggers rely on statistical models trained to predict the most likely grammatical role for a word given the context. The following code shows POS tagging using NLTK, which applies a pre-trained model that will tag grammatical structure.

```py
import nltk

text = "The cat sat on the mat"
tokens = nltk.word_tokenize(text)
pos_tags = nltk.pos_tag(tokens)

for word, tag in pos_tags:
    print(f"{word}: {tag}")
#
# The: DT (Determiner)
# cat: NN (Noun)
# sat: VBD (Verb, past tense)
```

The function pos_tag() assesses each token and assigns it a standardized notation. For example, DT indicates determiners (such as "the"), NN indicates singular nouns, VBD indicates past tense verbs, and IN indicates prepositions. The tagger can also use context to make these decisions: it can determine that "sat" is VBD and not NN because it appears after a noun and before a preposition, all of which are typical patterns of the English sentence.

---

## Establishing and Labeling Datasets

For supervised learning tasks such as sentiment analysis, NER, or classification, unlabeled data is useless.

This is why, to create training datasets, you must annotate raw data with relevant labels. Models can learn patterns and make predictions thanks to this "ground truth." Let’s define the most common methods for labeling.

### Automated Labeling Based on Libraries

You don’t always have to create labels from scratch. Libraries like TextBlob have built-in sentiment analysis models trained on large datasets that label text. They run a polarity score (a number that represents sentiment) and assign a categorical label.

For example, TextBlob sees a word choice, modifiers in particular (words like "very" or "not"), and grammatical patterns to run a polarity score from -1 (most negative) to +1 (most positive), with zero meaning a neutral sentiment.

In this example, we’re automatically labeling sentiments based on a pre-trained TextBlob sentiment analyzer:

```py
from textblob import TextBlob

def label_sentiment(text):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    if polarity < 0:
        return "negative"
    elif polarity == 0:
        return "neutral"
    else:
        return "positive"

# Example
texts = [
    "I love this product!",
    "It's okay, nothing special",
    "Terrible experience, very disappointed"
]

for text in texts:
    label = label_sentiment(text)
    print(f"{text} -> {label}")
```

### Manual Labeling

In many cases, automated library-based labeling isn’t an option. For domain-specific standards, you should annotate your data by hand to ensure accuracy and relevance.

**For projects involving manual labeling:**

- **Establish precise labeling standards.** Provide an annotation guideline that defines each label with clear criteria and edge cases. As an example, if annotating for customer support tickets, an example of potential criteria should be that "I need help resetting my password" is "Technical support," and another example is "When will my order arrive?" which is an example of "Order inquiry."
- **For quality control, use several annotators**. Have 2-3 people label the same data samples independently. For example, if annotating for medical symptoms, having multiple annotators better reduces the chance of bias from one person's labeling and may protect against clerical errors.
- **Determine the inter-annotator agreement.** Calculate [<VPIcon icon="fas fa-globe"/>Cohen's kappa](https://numiqo.com/tutorial/cohens-kappa) or [<VPIcon icon="fas fa-globe"/>Fleiss' kappa](https://numiqo.com/tutorial/fleiss-kappa) scores to measure the consistency of agreement among annotators. A score of above 0.80 would signify very good agreement, while a score below 0.60 would indicate that the labeling guidelines were not clear enough to the annotators.
- **Give instructions and illustrations**. Create a reference document with 20-30 examples you pre-labeled, showing examples of typical use cases and edge cases. For example, in a sentiment analysis, case you can provide examples of when a sentiment would be neutral, with an example such as "This product is fine, I guess," even though it may have seemed slightly negative. A sentiment is also classified as a good positive example even though it contains two negatives: "Not bad at all.”

This is the gold standard for high-quality datasets, but it’s also time-consuming and expensive – labeling 10,000 customer reviews might take a week if done manually.

### Approaches with Semi-Supervision

There are instances where you should combine the previous approaches. This semi-supervised method uses a small, manually labeled data set (high-quality data) and a large pool of unlabeled data (cheap, large amounts of data).

The method operates through iterative self-training, where you first train the model on your small dataset of signed data, then predict the labels on the unlabeled data using this model, then add the most confident predictions to your training data during training, and retrain. The self-training process is then repeated, improving and expanding your labeled data set gradually.

Here is an example of self-training in practice: this code demonstrates the semi-supervised workflow.

```py
from sklearn.semi_supervised import SelfTrainingClassifier
from sklearn.svm import SVC

# Small labeled dataset + large unlabeled dataset
X_labeled = [[1, 2], [3, 4], [5, 6]]
y_labeled = [0, 1, 0]
X_unlabeled = [[2, 3], [4, 5], [6, 7]]

# Combine datasets (-1 represents unlabeled)
X_train = X_labeled + X_unlabeled
y_train = y_labeled + [-1, -1, -1]

# Self-training classifier
base_classifier = SVC(probability=True, gamma='auto')
self_training = SelfTrainingClassifier(base_classifier)
self_training.fit(X_train, y_train)
```

The code shows a version of the SelfTrainingClassifier that first trains on the three labeled examples, then uses the model to predict inputs and labels for the unlabeled data. The classifier then selects predictions where it has high confidence (for example, predictions that are >90% probability) while using them as newly signed data. The classifier then re-trains itself, and the process continues.

So how do you decide which approach will fit your needs? In most cases, the optimal one will depend on the following aspects:

- Available budget and time.
- Desired accuracy.
- Size of the dataset.
- Complexity of the domain.

As you see, approaches vary and can be mixed now and then. The key thing is to make sure the inputs for final pre-generation processing are cleaned, standardized, and labeled. Remember the key principle: “garbage in, garbage out”. Send gold instead, and good luck!

---

## Conclusion

At this point, you should know the basics of working with NLP projects.

::: important Throughout this article, you've learned:

- How to set up your NLP development environment using a set of tools and libraries.
- The five parts of NLP systems and how they are used to process language.
- How to conduct common tasks like NER, sentiment analysis, and text classification.
- How to choose the library to use to accommodate your project needs.
- How to prepare and label datasets for training.
- How to find the key practical applications of NLP tailored to your industry and use case.

:::

### Next steps

- Try to start with a simple project, like sentiment analysis, that uses pre-trained models.
- Practice preprocessing methods with your own text data.
- Use and try different libraries to see how to get the best output for your project.
- Build a full pipeline from preparing text data to deploying models.
- Continue to practice and see advanced applications like transformer models and fine-tuning.

Most importantly, keep in mind that NLP is an iterative process. Start small, test appropriately to get it to work, and then build in complexity when you are more comfortable and sure of your abilities and familiarity with the practices.

::: info About the author

Hope you enjoyed the article and found it helpful. I’ve been a contributor to freeCodeCamp for more than 8 years, and to make this piece more precise and detailed, I used some expert help.

I’m grateful for the technical ideas of my co-workers at [<VPIcon icon="fas fa-globe"/>COAX Software](https://coaxsoft.com/) who wished to stay anonymous. The company is a well-regarded [<VPIcon icon="fas fa-globe"/>AI/ML development company.](https://coaxsoft.com/services/ai-development-services)

To find out more about me and read more content on tech and digital, you can [visit my LinkedIn page (<VPIcon icon="fa-brands fa-linkedin"/>`oleg-romanyuk`)](https://linkedin.com/in/oleg-romanyuk/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use NLP Techniques and Tools in Your Projects [Full Handbook]",
  "desc": "Nowadays, computers can comprehend and produce human-like language thanks to Natural Language Processing. And this opens up numerous opportunities for you as a developer. This guide will teach you how to create NLP projects from scratch. It includes ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-nlp-techniques-and-tools-in-your-projects-full-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
