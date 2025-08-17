---
lang: en-US
title: "How to Extract Insights from Text Using Named Entity Recognition (NER)"
description: "Article(s) > How to Extract Insights from Text Using Named Entity Recognition (NER)"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-langauge-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Extract Insights from Text Using Named Entity Recognition (NER)"
    - property: og:description
      content: "How to Extract Insights from Text Using Named Entity Recognition (NER)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/extract-insights-from-text-using-named-entity-recognition.html
prev: /programming/py/articles/README.md
date: 2025-08-01
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747753280612/991828ce-0554-4c20-bfcc-bb278c9f2954.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Extract Insights from Text Using Named Entity Recognition (NER)"
  desc="Many of us enjoy reading the news and staying up-to-date on current events. But the number of new stories each day can be overwhelming. You probably want to know who’s involved in world events, where things are happening globally, and which organizat..."
  url="https://freecodecamp.org/news/extract-insights-from-text-using-named-entity-recognition"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747753280612/991828ce-0554-4c20-bfcc-bb278c9f2954.png"/>

Many of us enjoy reading the news and staying up-to-date on current events. But the number of new stories each day can be overwhelming.

You probably want to know who’s involved in world events, where things are happening globally, and which organizations are being talked about. But fully reading through every article takes a long time - and you’re probably busy. This is where Named Entity Recognition (NER) can help.

In this article, I’ll show you how to build a news analyzer that uses a transformer-based NER model to extract useful data from a live RSS feed.

Let’s walk through how it all works.

---

## What is Named Entity Recognition?

Named Entity Recognition is a tool that helps you pick out important terms in text.

It labels parts of a sentence as specific entity types  -  like names, places, or dates. Here’s what that looks like in practice. Take this sentence:

> **“Apple CEO Tim Cook held a meeting with executives from Goldman Sachs in New York City.”**

A good NER model will identify:

- **“Tim Cook”** — a *person*
- **“Apple”** — an *organization*
- **“Goldman Sachs”** — an *organization*
- **“New York City”** — a *location*

This kind of extraction turns unstructured text into structured data. That makes it easier to search, count, and analyze what’s happening in the news.

---

## What is Hugging Face Transformers?

[<FontIcon icon="iconfont icon-huggingface"/>Hugging Face Transformers](https://huggingface.co/docs/transformers/en/index) is a Python library that gives you access to some of the most advanced NLP models out there.

These models are trained on massive amounts of data. Instead of starting from scratch, you get to use models that already understand grammar, sentence structure, and entity recognition.

The library provides a simple `pipeline()` function that lets you run complex tasks like NER in just a few lines of code. You can find many pre-trained models at [<FontIcon icon="iconfont icon-huggingface"/>`huggingface.co/models`](http://huggingface.co/models).

For this project, we’ll use one that’s been fine-tuned for English NER.

---

## How to Build the News Analyzer

Let’s build the news analyzer. [<FontIcon icon="fa-brands fa-google"/>Here is a Google colab notebook](https://colab.research.google.com/drive/1Bd3mMGCv5izBwEyfI8VrOVtVtMRy-1yt?usp=sharing) if you want to try this hands on.

You’ll need a couple of Python packages. Open your terminal or command prompt and run:

```sh
pip install feedparser transformers
```

These libraries will let you fetch RSS feeds and analyze text using pre-trained transformer models.

We’ll use feedparser to get news articles. Here’s how you fetch and print out summaries from [<FontIcon icon="fas fa-globe"/>CNN’s RSS feed](http://rss.cnn.com/rss/money_topstories.rss):

```py
import feedparser
rss_url = "https://rss.cnn.com/rss/edition.rss"
feed = feedparser.parse(rss_url)

for entry in feed.entries[:5]:  # limit to first 5 articles
    print(f"Title: {entry.title}")
    print(f"Summary: {entry.summary}\n")
```

This code pulls the title and summary of the latest articles.

![RSS articles](https://cdn.hashnode.com/res/hashnode/image/upload/v1746721895350/6af303c4-a0f4-429b-b09c-07d3d989c8d8.png)

Now let’s load a transformer model for NER.

The model dslim/bert-base-NER works well for English news text:

```py
from transformers import pipeline

ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
```

The `aggregation_strategy=”simple”` argument tells the pipeline to merge consecutive tokens that form a single named entity (like “Tim Cook”).

This model classifies each word/token into one of the entity categories: PER (person), LOC (location), ORG (organization), MISC (miscellaneous), or O (outside any entity).

Give some time for the model to download into your colab notebook or your local machine.

Let’s connect the NER model to your feed. The below script pulls each article’s title and runs NER on it.

For simplicity’s sake, we are skipping summaries but if you want to include it, update `ner_pipeline(title)` to `ner_pipeline(title+entry.summary)`.

```py
for entry in feed.entries[:5]:
    title = entry.title
    print(f"\nAnalyzing: {title}")
    entities = ner_pipeline(title)
    for ent in entities:
        print(f"{ent['word']} ({ent['entity_group']})")
```

This prints the entities found in each article summary, categorized by type.

![NER Response](https://cdn.hashnode.com/res/hashnode/image/upload/v1746721942832/05a4dbf1-dcd6-4d99-a6dc-96dcca170b5c.png)

For example, the first piece of text is:

> **Mexico ready to retaliate by hurting US farmers**

The response is:

```plaintext title="output"
Mexico (LOC)
US (LOC)
```

Both are locations. If we look at the other examples, we can see the classifications made by the NER model like:

```plaintext title="output"
iPhone (MISC)
America First (ORG)
India First (ORG)
Swiss (MISC)
Trump (PER)
```

Once you’ve extracted entities, you can:

- Count how often people or organizations appear.
- Track trends over time (for example, how often a particular person appears weekly).
- Filter for articles mentioning certain places or companies.

---

## Accuracy in NER

Getting structured data from NER is powerful, but it’s not perfect. Models can miss entities, mislabel terms, or confuse similar names.

For example, “Amazon” might be tagged as a location in one sentence and as an organization in another, depending on the context. This is normal because NER models look for patterns, they don’t truly “understand” the meaning behind the text.

To get the most value from NER, think of it as a first-pass filter rather than a final answer. Here are some practical ways to work with its output:

- **Look for patterns:** Occasional mistakes won’t matter as much when you analyze trends over time. For example, tracking which companies appear most often in headlines gives you useful insights even if a few mentions are misclassified.
- **Cross-check with known lists or databases:** If you’re monitoring company names or products, compare NER results against a reference list to catch typos or misclassifications.
- **Combine NER with other techniques:** Pair it with [**sentiment analysis**](/freecodecamp.org/what-is-sentiment-analysis-a-complete-guide-to-for-beginners.md), keyword matching, or frequency counts to make the data more reliable and actionable.
- **Manually verify high-stakes results:** If your workflow involves decisions with legal, financial, or reputational impact, sample and review the NER output to confirm accuracy.

By treating NER as a tool for structuring and filtering text rather than an absolute source of truth, you can uncover trends, build dashboards, and surface insights quickly, while keeping errors under control.

---

## Other Use Cases

NER goes far beyond analyzing news headlines. It’s a core tool for extracting meaning from massive amounts of unstructured text.

Businesses use it to automatically highlight critical details in customer interactions. For example, support teams can instantly flag customer names, products, serial numbers, or locations in support tickets and emails. This makes it easier to prioritize urgent requests, route issues to the right team, and spot recurring problems without manually reading every message.

Law firms and researchers rely heavily on NER to process large volumes of documents. Legal teams can extract the names of people, companies, and locations from contracts, court filings, and regulatory updates to build searchable databases or map connections between entities.

Academic researchers can do the same with scientific papers, speeding up literature reviews and uncovering patterns across thousands of publications.

In finance, NER is a powerful tool for market intelligence. Analysts use it to track mentions of companies, stock tickers, currencies, and commodities across news, earnings reports, and analyst briefings. By aggregating this data, they can detect trends, assess risk exposure, or spot market-moving events faster than manual review ever could.

Social media and marketing teams also depend on NER. By automatically identifying brands, competitors, or influencers in tweets and posts, they can monitor brand sentiment, detect emerging trends, and react quickly to PR risks.

In short, anywhere you’re drowning in text, whether it’s customer feedback, contracts, market reports, or social feeds, NER can transform that unstructured mess into structured, actionable insights.

---

## Conclusion

What we’ve built here is a small but powerful news analyzer. By combining a live data source (RSS feed) with a pre-trained NER model from Hugging Face Transformers, you can automatically extract who, what, and where from news articles.

Keep in mind that NER models aren’t perfect . They make predictions based on patterns, not understanding. It’s up to you to decide how to interpret their output and handle inaccuracies.

If you enjoy online games, check out [<FontIcon icon="fas fa-globe"/>GameBoost](https://gameboost.com/), the ultimate marketplace for gamers. You can find in-game items that help you level up faster, like *[<FontIcon icon="fas fa-globe"/>Grow a Garden](https://gameboost.com/grow-a-garden/items), Fortnite, Clash of Clans* and many more.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Extract Insights from Text Using Named Entity Recognition (NER)",
  "desc": "Many of us enjoy reading the news and staying up-to-date on current events. But the number of new stories each day can be overwhelming. You probably want to know who’s involved in world events, where things are happening globally, and which organizat...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/extract-insights-from-text-using-named-entity-recognition.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
