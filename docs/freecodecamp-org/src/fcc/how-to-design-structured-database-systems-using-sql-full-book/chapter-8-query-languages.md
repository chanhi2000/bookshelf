---
lang: en-US
title: "Chapter 8: Query Languages"
description: "Article(s) > (9/12) How to Design Structured Database Systems Using SQL [Full Book]"
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
      content: "Article(s) > (9/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 8: Query Languages"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-design-structured-database-systems-using-sql-full-book/chapter-8-query-languages.html
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
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-8-query-languages"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

At this point, you’ve learned about all the elements with which we can organize or structure stored data in relational databases using the relational model. But in practice, we don’t only want to store data, as we could do that with simple files. We also need tools to manipulate and query these data. This means we need to use a query language.

In simple terms, **query languages** are designed to manipulate and query (or access) the data stored in a database through a set of operations. Querying is the most fundamental operation of all, because if we think about how some of the other operations work (like updating or deleting data, for example), we need to be able to select or query the data in order to perform any operations on them. So basically, almost any modification starts by first identifying which records will be affected by the operation.

The query languages we’ll learn about here are **relational**, meaning they are created to manipulate and query data in relational databases. Fundamentally, most of them base the logic of operations on table manipulations that result in another table. Then we can continue applying operations to that resulting table. So when we operate on a relational database, we are transforming tables into other tables until we reach a table with data that interests us.

---

## Formal vs practical query languages

There are some query languages known as formal languages, which consist of theoretical definitions where operators or transformations that can be applied to tables are formally defined. This also helps optimize operations on them significantly, as these formal tools allow us to verify equivalences between operations or queries, enabling us to choose the one with the least computational cost among several equivalents.

On the other hand, to apply this to a database, there are practical query languages like [**SQL**](/freecodecamp.org/an-animated-introduction-to-sql-learn-to-query-relational-databases.md), which are implementations of formal query languages adapted to be used on real systems.

Although we call them languages, it's important not to confuse them with general-purpose languages. Query languages, as their name suggests, are dedicated to manipulating and querying data, not performing any type of computation. Examples of formal query languages include:

### Relational algebra

This is a formal imperative language, which means that when we program in it, we must think about how to obtain the result we want. In other words, we define a sequence of operations using the language's operators that progressively transform the tables until we reach one or more resulting tables with the data we need.

This idea of a sequence of operations is very similar to how we’d actuall plan and execute a query in a practical query language like SQL. This, along with the similarity of formal operators to the statements offered by these practical languages, helps the end user optimize the query, verify its correctness formally, or demonstrate its equivalence with another query that requires fewer computational resources, among other uses.

::: tip Example

If we want to get all the ages from a Person table that are greater than 50, we can apply the relational algebra operators **π Age ( σ (Age > 50) (Person) )** that we will see later. First, we filter all tuples that meet the condition of having an age >50 using the corresponding operator, and then we apply another operator to the resulting table with those tuples to keep only the ages of those tuples.

:::

### Relational calculus

Unlike the relational algebra, relational calculus is a declarative language. This means we program by thinking about the properties the result must have, not about which operators to apply to certain tables to achieve it. In other words, we don’t define something similar to an execution plan or sequence of operators to get the result. Instead, we simply declare the properties it must have to meet our needs, and the system itself finds an execution plan that produces exactly what we are looking for.

There are several ways to pose a query or modification on the data. One is based on **Tuple Relational Calculus (TRC)**, where we declare conditions that the attributes of the tuples must meet to be included in our result. The other is **Domain Relational Calculus (DRC)**, which involves using variables over the domains of the attributes to set conditions on them using a methodology similar to first-order logic.

::: tip Example

Following the same example as before, in **TRC** we would have something like **{ t.Age | Person(t) ∧ t.Age > 50 }**, where we declare that the tuples **t** we want to obtain must belong to the Person table and have a value greater than 50 in the Age attribute. Meanwhile, in **DRC** we would have **{ ⟨a⟩ | ∃id ( Person(id, a) ∧ a > 50) }**, where we are assuming that the table only stores an ID attribute and an Age attribute, because if more were stored, we would have to use more domain variables. In summary, here the conditions are imposed on the domain variables, which represent the values that the tuples take in their respective attributes.

:::

Lastly, regardless of the formal language used, both have the same expressive capacity, which can be formally demonstrated, as both are constructed using first-order logic.
