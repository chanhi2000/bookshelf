---
lang: en-US
title: "Chapter 1: What is Data?"
description: "Article(s) > (2/12) How to Design Structured Database Systems Using SQL [Full Book]"
category:
  - Data Science
  - PostgreSQL
  - Design
  - System
tag:
  - blog
  - freecodecamp.org
  - data-science
  - sql
  - postgres
  - posgtresql
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (2/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 1: What is Data?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/chapter-1-what-is-data.html
date: 2025-08-14
isOriginal: false
author:
  - name: Daniel García Solla
    url : https://freecodecamp.org/news/author/cardstdani/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Design Structured Database Systems Using SQL [Full Book]",
  "desc": "This book will guide you, step-by-step, through designing a relational database using SQL. SQL is one of the most recognized relational languages for managing and querying data in databases. You’ll learn the fundamental concepts related to both data ...",
  "link": "/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Design Structured Database Systems Using SQL [Full Book]"
  desc="This book will guide you, step-by-step, through designing a relational database using SQL. SQL is one of the most recognized relational languages for managing and querying data in databases. You’ll learn the fundamental concepts related to both data ..."
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-1-what-is-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

Before we start working with databases, it's helpful to have a clear understanding of what data is. More specifically, we need to understand what data means in the context of working with databases and SQL.

The official [<VPIcon icon="fa-brands fa-wikipedia-w"/>definition of data](https://en.wikipedia.org/wiki/Data) covers the most basic level, which states that data is a symbolic representation of a quantitative or qualitative attribute or variable that describes an empirical fact, event, or entity.

It's important to note that data has no inherent meaning. In other words, data is merely a value representing something observable or measurable - it doesn't provide any interpretable meaning.

For instance, the number 27 is data to which we initially can't provide meaning, though we can store, transform, compress, and encrypt it, and so on, if possible. Later, if we discover that this value stems from a variable representing temperatures, then we have more than just data - we have semantics, or meaning.

In this example, the number 27 is considered raw data. [<VPIcon icon="fas fa-globe"/>Raw data](https://lenovo.com/ca/en/glossary/raw-data/) is data that has been collected from a source, yet it lacks meaning or [<VPIcon icon="fa-brands fa-wikipedia-w"/>semantics](https://en.wikipedia.org/wiki/Semantic_data_model) and has not been processed or organized.

In the context of databases, the term **variable** is occasionally used to denote the origin of the data. But the term **attribute** is more common, as we will see later. So to sum up, an attribute can be viewed as a variable in programming. It represents a feature of an entity, such as a person's age. It’s characterized by a data type and a domain that define what the values can be and what its possible values are, respectively.

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Data types](https://en.wikipedia.org/wiki/Data_type) are the internal formats and operations supported by an attribute's data. They can include:

- integers (**ints**), which are typically encoded in computer science as 32-bit sequences
- text strings encoded in [<VPIcon icon="fa-brands fa-firefox"/>UTF-8](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8) format
- decimal numbers (floats or doubles, among others), represented using the [<VPIcon icon="fa-brands fa-microsoft"/>IEEE-754](https://learn.microsoft.com/en-us/cpp/build/ieee-floating-point-representation?view=msvc-170) floating-point standard, and
- boolean values that can be true or false and are encoded with bits as 0 or 1.

As you can see, the **data type** defines how an attribute's values can be, while the [<VPIcon icon="fa-brands fa-wikipedia-w"/>domain](https://en.wikipedia.org/wiki/Attribute_domain) is a set containing all the acceptable attribute values. A domain consists of a data type that limits the form of the data and a series of constraints that restrict the possible values that can be instantiated within that base data type.

For instance, if an attribute is labeled as an integer and represents a person's age, it's evident that the domain can’t contain negative numbers, despite the int data type allowing them. Consequently, the domain can be defined as all possible integer values with additional constraints ensuring that values less than zero aren’t considered, leaving only the positive integers needed.

Through these concepts, we can understand data in its most basic form. If we take a decimal number like 3.24, it may indicate a measurement for scientific purposes. A text string like "Juan", on the other hand, may represent a person's name. In other words, the semantics of a sequence of characters define its meaning. Alone, the sequence of characters doesn't represent anything - but together, they can represent a Spanish text with a meaning, such as someone's name.

Beyond atomic data, which are the most basic elements that can contain information, there’s also much more complex data out there. This includes document data, spatial and geographic data, network or graph data, and multidimensional data. The only difference between the "atomic" data we saw earlier and these complex forms of data is that the latter are composed of relationships or **associations** between simpler data.

For instance, a document consists of sequences of characters (strings) related to each other, where one string might represent the title and another a paragraph. In a computer network modeled as a graph, there could be IP addresses at the nodes, which we can think of as encoded strings, and references to other nodes, which are also IP addresses.

We won't delve into the complex nature of such data here because it’s managed by specialized databases that are more difficult to understand, and where SQL is not always present.

---

## DIKW Pyramid

So far, we’ve seen that data itself is just 'symbols' that can be stored, with no inherent meaning unless their origin or interpretation is known.

But it’s also possible to train machine learning models to provide services that appear much more complex compared to the data they were built with. In other words, we can build complex information systems from raw data that contain **higher-level** knowledge than the data we have discussed.

The [<VPIcon icon="fas fa-globe"/>DIKW (Data, Information, Knowledge, Wisdom) pyramid](https://datacamp.com/cheat-sheet/the-data-information-knowledge-wisdom-pyramid) models this transformation from data to knowledge, establishing a hierarchy through which we can acquire knowledge about some aspect of reality based on data. To understand this, let’s look at the four levels of knowledge organization.

### 1. Data

At this level, our knowledge of the world - or rather, what we know about it - is represented as raw data. As previously mentioned, raw data is devoid of semantics. The only options here are to store and analyze the data. Although they don't explicitly provide high-level knowledge, we can clean the data to avoid missing or corrupt values and calculate statistical measures.

::: tip Example

As before, a raw value, such as the integer 27, is data from which we can only calculate certain statistical metrics. We can’t interpret it because we don't know its meaning until we get more context.

:::

### 2. Information

After advancing from the previous level, the raw data is provided with semantics, which offers meaning to the stored and analyzed values. Now, the data is better organized because it’s contextualized with respect to its semantics.

This is the primary feature of this level, though certain relationships between the data also allow for more complex statistics to be calculated and more valuable questions to be answered about the data. The knowledge at this level is more abstract and valuable than the previous one.

::: tip Example

Continuing with the previous example, the number 27 could represent a person's age. So, here we can interpret and organize it with deeper comprehension and analyze it more precisely.

:::

### 3. Knowledge

At this point, knowledge resides in models that capture the patterns of the analyzed and organized data according to their semantics. That is, data follow hidden patterns that aren’t easily discernible, but can be revealed through advanced statistical techniques or machine learning.

So, at this level, information is compressed and summarized, or rather, an understanding of it’s generated through a model, allowing it to be synthesized.

This level is higher than the previous one because it extracts even more abstract knowledge from the information. Such knowledge describes the data itself, serves to make predictions, and achieves certain outcomes by leveraging the higher-level relationships between the data.

::: tipe Example

Once we have meaningful data, we can build models to describe or summarize it in order to make predictions about unseen data or draw conclusions.

For example, we can use a statistical metric, such as the mean, as a model to determine the average age of a given dataset. Later, by comparing this mean with the ages of other people, we can determine whether they are above or below the average. But the models used to describe data at this stage are usually more complex and practical.

:::

### 4. Wisdom

Building on the knowledge from the previous level, we reach a point where it’s no longer possible to extract higher-level relationships from the data. This means that no further abstraction is possible. The only remaining task is to combine our description of the data from the previous level with a social and ethical context, along with the professional experience of people who intend to use this knowledge to guide strategic decision-making and evaluate its consequences over time.

::: tip Example

At this final level, we can use a person's age, for which we have models describing them, and combine it with information about the context in which that information was collected to inform strategic decisions.

:::

Note that the data may emerge from an organization, which is the context in which strategic decisions are made. The key point here is that the purpose of having such high-level knowledge is to inform strategic decisions.

By studying this hierarchy, we can see that the interpretation of raw data leads to the acquisition of knowledge, which lets us make informed decisions. Databases help in this process primarily by storing data, which is one of their main objectives. But they also assist us with the analysis process by adapting the data's storage and organization methods.

At this point, you might ask the question: **How do we want the database to store and analyze this data?** First, we need to store the data [<VPIcon icon="fa-brands fa-wikipedia-w"/>persistently](https://en.wikipedia.org/wiki/Persistent_memory) in [<VPIcon icon="fas fa-globe"/>secondary memory](https://geeksforgeeks.org/computer-science-fundamentals/secondary-memory/) so that it can be retrieved at any time, rather than in **volatile memory** such as **RAM**.

On the other hand, **analyzing** data involves a wide variety of operations, ranging from simple searches and filtering to complex aggregations, pattern detection, statistical calculations, executing elaborate SQL queries, and processing text or images. Each type of data and operational need requires different algorithms and data structures for efficiency.

This means that since a database must provide functionalities at the storage and analysis layers, you might wonder whether a "general" database system exists that is capable of storing and analyzing data of any kind, regardless of its complexity or user needs. As we will see below, such a general system can’t exist. But there are systems built to handle any type of data-related problem, **as long as the data is in a specific “shape”**.

