---
lang: en-US
title: "Database Normalization vs Denormalization"
description: "Article(s) > Database Normalization vs Denormalization"
icon: fas fa-database
category: 
  - Data Science
  - Article(s)
tag:
  - blog
  - outcomeschool.com
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Database Normalization vs Denormalization"
    - property: og:description
      content: "Database Normalization vs Denormalization"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/outcomeschool.com/database-normalization-vs-denormalization.html
prev: /data-science/articles/README.md
date: 2024-07-11
isOriginal: false
author: Amit Shekhar
cover: https://outcomeschool.com/static/images/blog/database-normalization-vs-denormalization.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Database Normalization vs Denormalization"
  desc="In this blog, we will learn about database normalization and denormalization."
  url="https://outcomeschool.com/database-normalization-vs-denormalization"
  logo="https://outcomeschool.com/static/favicons/apple-touch-icon.png"
  preview="https://outcomeschool.com/static/images/blog/database-normalization-vs-denormalization.png"/>

In this blog, we will learn about database **normalization** and **denormalization**.

Database normalization and denormalization are two different ways for database design, each with pros and cons. Let's learn today in detail.

Learning by example is the best way to learn, let's start with an example.

Consider the following `users` table in a database:

| `id` | `name` | `username` | `city` |
| :-- | :-- | :-- | :-- |
| 1 | Amit Shekhar | amitshekhar | **Gurgaon** |
| 2 | Pallavi | pallavi | **Gurgaon** |
| 3 | Sachin | sachin | **Mumbai** |
| 4 | Rahul | rahul | Varanasi |
| 5 | Pankaj | pankaj | **Mumbai** |

Here, we can observe that the city `Gurgaon` and `Mumbai` is getting duplicated. Hence it is **denormalized**. This way of designing the database is called Database **Denormalization**.

Also, consider a scenario in which the city name may change due to some reason, for example, `Gurgaon` to `Gurugram`. We will have to change at multiple places, which may lead to data inconsistencies.

Now, we know the issues with the **denormalized** design. Let's fix this with the **normalized** design.

Consider the following `users` table in a database:

| `id` | `name` | `username` | `cityId` |
| :-- | :-- | :-- | :-- |
| 1 | Amit Shekhar | amitshekhar | 1 |
| 2 | Pallavi | pallavi | 1 |
| 3 | Sachin | sachin | 2 |
| 4 | Rahul | rahul | 3 |
| 5 | Pankaj | pankaj | 2 |

Consider the following `cities` table in a database:

| `id` | `name` |
| :-- | :-- |
| 1 | Gurgaon |
| 2 | Mumbai |
| 3 | Varanasi |

Here, city names are not getting duplicated, hence storage reduction.

Also, we can change the city name easily by changing it at a single place if got changed due to some reason, hence no data inconsistencies as it is easy to change.

Hence it is **normalized**. This way of designing the database is called Database **Normalization**.

Now that we have understood Database Normalization and Denormalization with the help of examples, let's see the pros, cons, and use cases of both ways.

---

## Database Normalization

Database normalization is the way of designing the database focusing on minimizing data duplication and ensuring data integrity.

::: tabs

@tab Pros

- Minimizes data duplication, hence minimizes storage.
- Easy to update, ensures data integrity.

@tab Cons

- May slow down query performance, especially for queries that require joining tables.

@tab Use Case

The system in which the data integrity is important, for example, Banking Systems.

:::

---

## Database Denormalization

Database denormalization is the way of designing the database focusing on query performance.

::: tabs

@tab Pros

- Better performance as there is no need to join tables.

@tab Cons

- Increases data redundancy that leads to more storage requirements.
- Makes data updates more complex and prone to inconsistencies if not carefully managed.

@tab Use Case

The system in which the query performance is important, for example, Real-time Analytics Systems.

:::

This was all about database **normalization** and **denormalization**.

That's it for now.

Thanks

::: info Amit Shekhar

You can connect with me on:

- [X (<VPIcon icon="fa-brands fa-x-twitter"/>`amitiitbhu`](https://twitter.com/amitiitbhu)
- [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`amit-shekhar-iitbhu`](https://linkedin.com/in/amit-shekhar-iitbhu)
- [YouTube (<VPIcon icon="fa-brands fa-youtube"/>`amitshekhar`)](https://youtube.com/@amitshekhar)
- [GitHub (<VPIcon icon="iconfont icon-github"/>`amitshekhariitbhu`](https://github.com/amitshekhariitbhu)

Follow Outcome School on:

- [X (<VPIcon icon="fa-brands fa-x-twitter"/>`outcome_school`)](https://twitter.com/outcome_school)
- [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`outcomeschool`)](https://linkedin.com/company/outcomeschool)
- [YouTube (<VPIcon icon="fa-brands fa-youtube"/>`OutcomeSchool`)](https://youtube.com/@OutcomeSchool)
- [GitHub (<VPIcon icon="iconfont icon-github"/>`OutcomeSchool`)](http://github.com/OutcomeSchool)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Database Normalization vs Denormalization",
  "desc": "In this blog, we will learn about database normalization and denormalization.",
  "link": "https://chanhi2000.github.io/bookshelf/outcomeschool.com/database-normalization-vs-denormalization.html",
  "logo": "https://outcomeschool.com/static/favicons/apple-touch-icon.png",
  "background": "rgba(78,70,220,0.2)"
}
```
