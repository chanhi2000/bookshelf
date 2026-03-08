---
lang: en-US
title: "How to Build a Spam Email Detector with Python and Naive Bayes Classifier"
description: "Article(s) > How to Build a Spam Email Detector with Python and Naive Bayes Classifier"
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
      content: "Article(s) > How to Build a Spam Email Detector with Python and Naive Bayes Classifier"
    - property: og:description
      content: "How to Build a Spam Email Detector with Python and Naive Bayes Classifier"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-spam-email-detector-with-python-and-naive-bayes-classifier.html
prev: /programming/py/articles/README.md
date: 2026-03-11
isOriginal: false
author:
  - name: Maku Gideon
    url: https://freecodecamp.org/news/author/gideon-tech/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/92eb401b-fce3-411b-9b0b-02ba486586cb.png
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
  name="How to Build a Spam Email Detector with Python and Naive Bayes Classifier"
  desc="Ever wondered how Gmail knows that an email promising you $10 million is spam? Or how it catches those ”You've won a free iPhone!” messages before they reach your inbox? In this tutorial, you'll build"
  url="https://freecodecamp.org/news/how-to-build-a-spam-email-detector-with-python-and-naive-bayes-classifier"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/92eb401b-fce3-411b-9b0b-02ba486586cb.png"/>

Ever wondered how Gmail knows that an email promising you $10 million is spam? Or how it catches those "You've won a free iPhone!" messages before they reach your inbox?

In this tutorial, you'll build your own spam email classifier from scratch using the Naive Bayes algorithm. By the end, you'll have a working model that achieves over 97% accuracy—and you'll understand exactly how it works under the hood.

This project was inspired by the [<VPIcon icon="fa-brands fa-amazon"/>Python Machine Learning Workbook for Beginners](https://amazon.com/dp/B08WK2HCWL) by AI Publishing, which offers excellent hands-on ML projects for those starting their journey. 

::: note

I have no affiliation with the authors — I simply found it a useful resource.

:::

::: info What You'll Learn

- How email spam filters actually work
- The intuition behind the Naïve Bayes algorithm
- Text preprocessing techniques for machine learning
- How to evaluate classification models
- Building a complete spam detection pipeline in Python

:::

::: note Prerequisites

You should have basic familiarity with Python and some understanding of fundamental machine learning concepts. Don't worry if you're still learning—I'll explain everything as we go.

:::

---

## Why Naive Bayes for Spam Detection?

Before we dive into code, let's understand why Naive Bayes is particularly well-suited for this task.

Imagine you receive an email containing words like "free," "winner," "click here," and "limited time offer." Your brain immediately flags this as suspicious. The Naive Bayes algorithm does something similar—it calculates the probability that an email is spam based on the words it contains.

The algorithm is called "naive" because it makes a simplifying assumption: it treats each word as independent of every other word. In reality, word combinations matter (think "free trial" vs. "free money"), but this simplification works remarkably well in practice.

::: important Why Choose Naive Bayes?

- **Speed**: It trains incredibly fast, even on large datasets
- **Efficiency**: Requires minimal training data to produce reliable results
- **Simplicity**: Easy to implement and interpret
- **Performance**: Despite its simplicity, it often outperforms more complex algorithms for text classification

:::

::: warning Limitations to keep in mind:

- The independence assumption means it can't capture relationships between words
- If a word appears in the test data but never appeared in training, the algorithm assigns it zero probability (though there are ways to handle this)

:::

Now let's build our spam detector.

---

## How to Set Up Your Environment

First, install the required libraries. Open your terminal or run this in a Jupyter notebook cell:

```sh
pip install regex wordcloud numpy pandas seaborn matplotlib scikit-learn
```

Here's a quick summary of what each library does:

- `regex` / `re` — for cleaning text using pattern matching
- `wordcloud` — for visualizing which words appear most frequently
- `numpy` and `pandas` — for data loading and manipulation
- `seaborn` and `matplotlib` — for charts and visualizations
- `scikit-learn` — provides the Naive Bayes classifier, vectorizer, and evaluation tools

Once installation is complete, import everything at the top of your script or notebook. Grouping all imports at the top is a Python best practice — it makes dependencies easy to spot at a glance.

```py
# Data manipulation and analysis
import pandas as pd
import numpy as np

# Data visualization
import seaborn as sns
import matplotlib.pyplot as plt

# Natural language processing
import nltk
import re
from nltk.corpus import stopwords

# Machine learning
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

# Word cloud visualization
from wordcloud import WordCloud
```

---

## How to Load and Explore the Dataset

We'll use a dataset of labeled emails. You can download it from [<VPIcon icon="iconfont icon-kaggle"/>Kaggle](https://kaggle.com/datasets/karthickveerakumar/spam-filter) or use any similar email dataset with `text` and `spam` columns.

Use pandas' `read_csv()` function to load the dataset from a CSV file into a DataFrame — a table-like structure that makes it easy to inspect and manipulate data. The `head()` method then displays the first 5 rows so you can confirm the data loaded correctly and understand its structure.

```py
message_dataset = pd.read_csv('emails.csv')
message_dataset.head()
#
# |  | text | spam |
# | --- | --- | --- |
# | 0 | Subject: naturally irresistible your corporate... | 1 |
# | 1 | Subject: the stock trading gunslinger fanny i... | 1 |
# | 2 | Subject: unbelievable new homes made easy im ... | 1 |
# | 3 | Subject: 4 color printing special request add... | 1 |
# | 4 | Subject: do not have money , get software cds ... | 1 |
```

Next, call `shape` on the DataFrame to check its dimensions — this returns a tuple of (rows, columns) and is a quick way to confirm you loaded the full dataset without truncation.

```py
# Get the dimensions of our dataset (rows, columns)
message_dataset.shape
#
# (5728, 2)
```

The dataset contains 5,728 emails with two columns: `text` (the email content) and `spam` (1 for spam, 0 for legitimate emails).

---

## How to Visualize the Data Distribution

Before training any model, it's crucial to understand your data. Let's see how spam and legitimate emails are distributed.

`value_counts()` tallies how many emails belong to each class (spam vs. legitimate). Chaining `.plot(kind="pie")` on the result converts those counts directly into a pie chart. The `autopct="%1.0f%%"` argument tells matplotlib to label each slice with its percentage, rounded to the nearest whole number.

```py
plt.rcParams["figure.figsize"] = [8, 10]
message_dataset.spam.value_counts().plot(kind="pie", autopct="%1.0f%%")
```

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1769379922505/de29f062-db6b-4f7c-87ad-bf03440cc3fc.png)

You'll see that approximately 24% of emails in the dataset are spam, while 76% are legitimate. This is a moderately imbalanced dataset, which we'll keep in mind when evaluating our model.

---

## How to Analyze Word Patterns with Word Clouds

Word clouds provide an intuitive visualization of the most frequent words in a text corpus. Words that appear more often are rendered larger. Let's create separate word clouds for spam and legitimate emails to identify distinguishing patterns.

First, we need to remove stop words — common words like "the," "is," and "at" that appear everywhere and carry no meaningful signal for classification. NLTK's `stopwords.words("english")` returns a pre-built list of these words. The `apply()` method runs a function across every row in the column, and the lambda inside it splits each email into individual words, filters out any stop words, then rejoins the remaining words into a clean string.

```py
stop = stopwords.words("english")

message_dataset["text_without_sw"] = message_dataset["text"].apply(
    lambda x: "".join([item for item in x.split() if item not in stop])
)
```

Now let's visualize the spam emails. We filter the DataFrame to rows where `spam == 1`, join all that text into a single large string, and pass it to `WordCloud().generate()`. The `imshow()` function renders the resulting image, and `axis("off")` hides the x/y axes since they're not meaningful for an image display.

```py
message_dataset_spam = message_dataset[message_dataset["spam"] == 1]

plt.rcParams["figure.figsize"] = [8, 10]
text = ' '.join(message_dataset_spam['text_without_sw'])
wordcloud2 = WordCloud().generate(text)

plt.imshow(wordcloud2)
plt.axis("off")
plt.show()
```

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1769379941156/d33d8b61-7ec4-4044-a98a-c7b9ce95eabf.png)

Now do the same for legitimate emails by filtering to rows where `spam == 0`:

```py
message_dataset_ham = message_dataset[message_dataset["spam"] == 0]

plt.rcParams["figure.figsize"] = [8, 10]
text = ' '.join(message_dataset_ham['text_without_sw'])
wordcloud2 = WordCloud().generate(text)

plt.imshow(wordcloud2)
plt.axis("off")
plt.show()
```

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1769379947878/368e5251-3072-423f-b298-fb00d03254f3.png)

::: important Key observations:

- **Spam emails** frequently contain promotional language: "free," "money," "offer," "click," "please"
- **Legitimate emails** contain more conversational and work-related terms: "company," "time," "thanks"

:::

You'll also notice the word "enron" appearing prominently in the legitimate emails cloud. This is because the non-spam emails in this dataset are drawn from the publicly available **Enron email corpus** — a large collection of real internal emails from Enron Corporation that was released during their 2001 fraud investigation. It has since become one of the most widely used benchmark datasets in NLP research, which is why "enron" shows up so frequently as a word in legitimate email content.

These patterns give us confidence that word-based classification will work well.

---

## How to Preprocess the Text Data

Raw text needs cleaning before machine learning algorithms can process it effectively. Let's first separate our features from our labels. In ML terminology, `X` holds the inputs (the email text we use to make predictions) and `y` holds the target labels (1 for spam, 0 for legitimate).

```py
X = message_dataset["text"]
y = message_dataset["spam"]
```

Now we'll define a function to clean the text. The `re.sub()` function from Python's built-in `re` module performs pattern-based substitution using regular expressions. We call it three times in sequence:

1. `re.sub('[^a-zA-Z]', ' ', doc)` — replaces anything that isn't a letter (numbers, punctuation, symbols) with a space. This strips noise that doesn't help with classification.
2. `re.sub(r'\s+[a-zA-Z]\s+', ' ', document)` — removes isolated single characters (like "I" or "a" left behind after removing punctuation) by matching any single letter surrounded by whitespace.
3. `re.sub(r'\s+', ' ', document)` — collapses multiple consecutive spaces into a single space, tidying up any extra gaps created by the previous two steps.

```py
def clean_text(doc):
    document = re.sub('[^a-zA-Z]', ' ', doc)
    document = re.sub(r'\s+[a-zA-Z]\s+', ' ', document)
    document = re.sub(r'\s+', ' ', document)
    return document
```

Apply this cleaning function to every email in the dataset. We first convert the pandas Series to a plain Python list using `list()`, then loop through each email, clean it, and collect the results in `X_sentences`.

```py
# Create an empty list to store cleaned emails
X_sentences = []

# Convert the pandas Series to a list for iteration
reviews = list(X)

# Clean each email and add it to our list
for rev in reviews:
    X_sentences.append(clean_text(rev))
```

---

## How to Convert Text to Numerical Features

Machine learning algorithms work with numbers, not text. We need to transform our cleaned text into a numerical representation.

**TF-IDF (Term Frequency-Inverse Document Frequency)** is a great choice for this. It assigns each word a score that reflects how important it is to a particular document relative to the entire dataset. A word that appears often in one email but rarely across all emails gets a high score — meaning it's distinctive and likely meaningful. Common words that appear everywhere get a lower score.

`TfidfVectorizer` from scikit-learn handles this transformation. The parameters we set control what gets included:

- `max_features=2500` — only keeps the 2,500 most frequent words, discarding rare ones that don't generalize well
- `min_df=5` — ignores words that appear in fewer than 5 emails (too rare to be useful)
- `max_df=0.7` — ignores words that appear in more than 70% of all emails (too common to be distinctive)
- `stop_words=stopwords.words('english')` — removes common English words like "the" and "is"

`fit_transform()` does two things in one step: it learns the vocabulary from our text (fit), then converts each email into a numerical vector based on that vocabulary (transform). Calling `.toarray()` on the result converts the sparse matrix output — which stores only non-zero values for efficiency — into a regular dense NumPy array that scikit-learn classifiers expect.

```py
vectorizer = TfidfVectorizer(
    max_features=2500,
    min_df=5,
    max_df=0.7,
    stop_words=stopwords.words('english')
)

X = vectorizer.fit_transform(X_sentences).toarray()
```

Each email is now represented as a vector of 2,500 numbers, where each number is the TF-IDF score for a specific word.

---

## How to Train the Naive Bayes Classifier

Now comes the exciting part — training our model! First, split the data into training and test sets using `train_test_split()`. This function randomly shuffles and divides both `X` and `y` simultaneously, keeping labels aligned with their corresponding emails. Setting `test_size=0.20` reserves 20% of the data for testing. Setting `random_state=42` seeds the random number generator so you get the same split every time you run the code, making your results reproducible.

```py
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.20,
    random_state=42
)
```

Now train the Multinomial Naive Bayes classifier. We use `MultinomialNB` specifically because it's designed for features that represent counts or frequencies — exactly what TF-IDF scores are. Calling `fit(X_train, y_train)` trains the model by having it calculate the probability of each word appearing in spam versus legitimate emails across the training set. Those probability tables are what the model uses later to classify new emails.

```py
spam_detector = MultinomialNB()
spam_detector.fit(X_train, y_train)
```

That's it! The Naive Bayes algorithm is remarkably fast—training completes in milliseconds even with thousands of emails.

---

## How to Evaluate Model Performance

Let's see how well our spam detector performs on emails it has never seen before. The `predict()` method takes the test set features and returns a predicted label (0 or 1) for each email, based on the probability tables the model learned during training.

```py
y_pred = spam_detector.predict(X_test)
```

Now evaluate the predictions using three different tools from scikit-learn's `metrics` module:

- `confusion_matrix()` — produces a 2×2 grid comparing actual vs. predicted labels, showing exactly where the model gets things right and wrong
- `classification_report()` — prints precision, recall, and F1-score for each class, giving a more complete picture than accuracy alone
- `accuracy_score()` — returns the overall percentage of correct predictions

```py
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))
print(accuracy_score(y_test, y_pred))
#
# [[849   7]
#  [ 18 272]]
# 
#               precision    recall  f1-score   support
# 
#            0       0.98      0.99      0.99       856
#            1       0.97      0.94      0.96       290
# 
#     accuracy                           0.98      1146
#    macro avg       0.98      0.96      0.97      1146
# weighted avg       0.98      0.98      0.98      1146
# 
# 0.9781849912739965
```

Our model achieves **97.82% accuracy**! Let's break down what the confusion matrix tells us:

- **849**: Legitimate emails correctly identified as legitimate (True Negatives)
- **7**: Legitimate emails incorrectly marked as spam (False Positives)
- **18**: Spam emails that slipped through as legitimate (False Negatives)
- **272**: Spam emails correctly caught (True Positives)

The classification report shows:

- **For legitimate emails (class 0)**: 98% precision, 99% recall
- **For spam emails (class 1)**: 97% precision, 94% recall

These numbers are impressive, especially considering the simplicity of our approach.

---

## How to Test on Individual Emails

Let's verify our model works by testing it on a specific email. We'll first print the cleaned text at index 56 and its actual label to see what we're working with. Then we'll ask the model to predict it.

```py
print(X_sentences[56])
print(y[56])
#
# Subject localized software all languages available hello we would like to offer localized software versions german french spanish uk and many others aii iisted software is available for immediate downioad no need to wait week for cd deiivery just few exampies norton lnternet security pro windows xp professionai with sp fuil version corei draw graphics suite dreamweaver mx homesite inciudinq macromedia studio mx just browse our site and find any software you need in your native ianguaqe best reqards kayieen 
1
```

This is clearly a spam email trying to sell pirated software. The actual label is 1 (spam). Now pass this single email through the same pipeline — first transforming it into a TF-IDF vector using the already-fitted `vectorizer`, then calling `predict()` on the result. It's important to use the same vectorizer that was fitted on the training data, so the word-to-index mapping is consistent.

```py
print(spam_detector.predict(vectorizer.transform([X_sentences[56]])))
#
# [1]
```

The model correctly identifies this promotional email as spam.

::: important Key Takeaways

1. **Naive Bayes is powerful for text classification** despite its simplifying assumptions. For spam detection, it achieves excellent accuracy with minimal computational cost.
2. **Text preprocessing matters**. Removing noise (special characters, numbers, extra spaces) helps the algorithm focus on meaningful patterns.
3. **TF-IDF captures word importance effectively**. It gives higher weight to distinctive words that help differentiate spam from legitimate emails.
4. **Always evaluate with multiple metrics**. Accuracy alone can be misleading, especially with imbalanced datasets. Precision, recall, and F1-score give a complete picture.
5. **Start simple**. Before reaching for complex deep learning models, try classical algorithms like Naïve Bayes. They're interpretable, fast, and often surprisingly effective.

:::

---

## Next Steps

Want to improve this spam detector further? Here are some ideas:

- **Experiment with different vectorizers**: Try CountVectorizer or word embeddings (Word2Vec, GloVe)
- **Handle class imbalance**: Use techniques like SMOTE or adjust class weights
- **Feature engineering**: Add features like email length, number of links, or sender domain
- **Try other algorithms**: Compare with SVM, Random Forest, or gradient boosting
- **Deploy the model**: Build a simple API using Flask or FastAPI

---

## Conclusion

You've built a spam email classifier that achieves over 97% accuracy using the Naïve Bayes algorithm. Along the way, you learned about text preprocessing, feature extraction with TF-IDF, and model evaluation techniques.

The beauty of this approach is its simplicity. With just a few dozen lines of code, you've created something that actually works—and now you understand the principles behind commercial spam filters.

Feel free to experiment with the code, try different parameters, and see how the results change. That's the best way to deepen your understanding.

::: info References

```component VPCard
{
  "title": "Tarot Journal: Tarot Journal Three Card Spread for Recording And Interpreting Notes Readings: de la Conception, Circé: 9798707402982: Amazon.com: Books",
  "desc": "Tarot Journal: Tarot Journal Three Card Spread for Recording And Interpreting Notes Readings [de la Conception, Circé] on Amazon.com. *FREE* shipping on qualifying offers. Tarot Journal: Tarot Journal Three Card Spread for Recording And Interpreting Notes Readings",
  "link": "https://amazon.com/dp/B08WK2HCWL/",
  "logo": "https://amazon.com/favicon.ico",
  "background": "rgba(244,245,246,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Spam Email Detector with Python and Naive Bayes Classifier",
  "desc": "Ever wondered how Gmail knows that an email promising you $10 million is spam? Or how it catches those ”You've won a free iPhone!” messages before they reach your inbox? In this tutorial, you'll build",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-spam-email-detector-with-python-and-naive-bayes-classifier.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
