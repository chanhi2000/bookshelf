---
lang: en-US
title: "Firestore Data Modeling Guide: Embedded Documents vs Referencing (with a Blog Case Study)"
description: "Article(s) > Firestore Data Modeling Guide: Embedded Documents vs Referencing (with a Blog Case Study)"
icon: fas fa-database
category:
  - Data Science
  - DevOps
  - Google
  - Google Cloud
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - devops
  - google
  - gcp
  - google-cloud-platform
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Firestore Data Modeling Guide: Embedded Documents vs Referencing (with a Blog Case Study)"
    - property: og:description
      content: "Firestore Data Modeling Guide: Embedded Documents vs Referencing (with a Blog Case Study)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/firestore-data-modeling-guide-embedded-documents-vs-referencing-with-a-blog-case-study.html
prev: /data-science/articles/README.md
date: 2026-07-25
isOriginal: false
author:
  - name: Caleb Mintoumba
    url: https://freecodecamp.org/news/author/phoekerson/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f0166ca3-ca48-45f6-bb2f-ee6b20701ea0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Firestore Data Modeling Guide: Embedded Documents vs Referencing (with a Blog Case Study)"
  desc="When developers transition from the relational world (MySQL, PostgreSQL) to Firestore, Firebase's NoSQL document database, they often bring their old habits with them. They try to replicate tables, fo"
  url="https://freecodecamp.org/news/firestore-data-modeling-guide-embedded-documents-vs-referencing-with-a-blog-case-study"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f0166ca3-ca48-45f6-bb2f-ee6b20701ea0.png"/>

When developers transition from the relational world (MySQL, PostgreSQL) to Firestore, Firebase's NoSQL document database, they often bring their old habits with them. They try to replicate tables, foreign keys, and joins.

The result? Complex queries, skyrocketing read costs, and a database structure that becomes a nightmare to maintain after just a few features.

To understand how Firestore works, we first need to look at our point of comparison: the relational model. Once we map out how SQL does things, we can see exactly where Firestore diverges, and how to structure NoSQL data correctly.

In this guide, we'll cover NoSQL design principles, embedding vs. referencing, and relationship modeling (1-1, 1-N, N-N). We'll also walk through a concrete blog case study.

::: note Prerequisites

This guide is conceptual, so you don't need a running Firestore project to follow along. A little context is enough. You will need:

- Basic JavaScript syntax, since every code example uses the modular Firebase JS SDK (v9+)
- Basic familiarity with JSON objects (keys, values, nested objects, arrays)
- Some exposure to SQL or relational databases helps, since the guide leans on that comparison throughout (but it's not required)
- (Optional) A free Firebase project, if you want to try the examples yourself. The [<VPIcon icon="iconfont icon-firebase"/>Firestore quickstart](https://firebase.google.com/docs/firestore/quickstart) walks you through setting one up.

:::

No prior NoSQL or Firestore experience is needed.

---

## The Relational Mindset: How SQL Handles Data

In a relational database, data is organized into tables linked by explicit relationships. This approach relies on **normalization** to eliminate data redundancy.

For example, to store users and their respective countries, we split the data into two tables:

- `Users`: columns `id` (PK), `last_name`, `first_name`, `#country_id` (FK a foreign key)
- `Countries`: columns `country_id` (PK), `country_name`

With a row like `1, MINTOUMBA, Caleb, 1` in `Users` and `1, Canada` in `Countries`, we automatically know that Caleb belongs to Canada through the foreign key `#country_id`. We never had to write the word "Canada" inside the `Users` table itself.

![Relational model showing a Users table linked to a Countries table through a foreign key](https://cdn.hashnode.com/uploads/covers/66f71ee288cc311f84e563bc/ac10a248-0b5e-4be7-a738-3a6bdd54c1d7.png)

::: note The SQL trade-off

writes are lightweight (you only update data in one place), but reads are heavier, because you have to perform a database join (`JOIN`) every time you want to display a user's country name.

:::

That's exactly the opposite of how Firestore works, as we'll see next.

---

## The Firestore Paradigm: NoSQL with Relationships

Firestore is a **NoSQL** document database – literally *Not Only SQL*. It stores JSON-like documents grouped into collections, with no enforced schema.

For most of Firestore's history, that also meant no native joins and no `GROUP BY`. The standard query engine simply didn't support them, and any aggregation beyond `count()`, `sum()`, and `average()` had to happen in your application code.

That's still true today for **Standard edition**, which remains the default and the one most mobile/web apps run on and the one this guide focuses on.

Google has since introduced **Firestore Enterprise edition**, built around a new **Pipeline** query engine that reached general availability in April 2026. Pipelines add a multi-stage query syntax and hundreds of new functions, including relational-style joins through correlated subqueries and a real `aggregate(...)` step with grouping Firestore's equivalent of SQL's `GROUP BY`.

**Does this mean data modeling doesn't matter anymore?** Not for most apps. Pipeline queries run within a 60-second timeout and a 128 MiB working-memory limit, can fall back to full collection scans when no index exists, and critically, Enterprise edition drops real-time listeners and offline support (which most Firestore client apps depend on).

Pipelines are a genuine escape hatch for analytical, admin, or reporting queries. They're not a drop-in replacement for the read-optimized structure your app's everyday screens still need.

If you're building a typical client-facing app on Standard edition, the embedding and denormalization strategies below are still how you model relationships.

But **NoSQL doesn't mean "no relationships"** even on Standard edition. You can and should build robust relationships between your collections. The difference is that Firestore won't enforce or resolve them for you the way a `JOIN` does by default. It's up to you, the developer, to build and query those relationships explicitly, and to maintain data integrity through your application code or Cloud Functions unless you've specifically opted into Enterprise edition for Pipeline-powered joins.

---

## The Core Building Blocks: Documents and Collections

Before designing any schema, let's define Firestore's two core building blocks:

- **Document**: the basic unit of storage. It's a JSON-like object, identified by a unique ID, containing typed fields (strings, numbers, booleans, timestamps, geopoints, or references to other documents).
- **Collection**: a container for documents. Unlike SQL tables, documents in the same collection don't need to share the same structure.

What makes Firestore unique is its hierarchical nature: **a document can contain sub-collections**, which contain more documents, which can themselves contain more sub-collections, and so on.

![Firestore hierarchy diagram showing a posts collection containing the post_001 document, which holds a comments sub-collection with individual comment documents](https://cdn.hashnode.com/uploads/covers/66f71ee288cc311f84e563bc/3d49ff84-8648-4c15-bcc3-60caeb540a77.png)

In the diagram above, the root `posts` collection contains the document `post_001`, which itself hosts a `comments` sub-collection containing the individual comment documents `comment_001` and `comment_002`. You can nest collections and documents several levels deep, but as we'll see later, it's best to do so sparingly.

::: important Crucial rule

sub-collections are never retrieved automatically when you read a parent document. Unlike a SQL `JOIN`, you must always perform a separate, explicit query to read a sub-collection.

:::

---

## The Golden Rule: Model for Reads, Not Writes

This is the single most important concept in NoSQL modeling, and the one developers coming from SQL forget most often: **structure your data based on how your app queries it, not on how it gets written.**

Before writing any database code, ask yourself:

- Which screens in my app will display this data?
- Do I need this piece of data on its own, or always alongside another one?
- Do I read this information significantly more often than I write or update it?

If your users view a writer's profile 10,000 times for every single time that writer updates their username, optimize for the reads: duplicate the username directly inside each post. That's the exact opposite of the SQL instinct we saw earlier, where you normalize first to avoid redundancy, even if it makes reads heavier.

---

## Embedding vs. Referencing (Denormalization)

There are two primary strategies for representing a relationship in Firestore.

![Side-by-side comparison of embedding comments directly inside a post document versus referencing them through a separate comments sub-collection](https://cdn.hashnode.com/uploads/covers/66f71ee288cc311f84e563bc/ac6d31d1-9c75-4688-b39a-e01ffa55ea07.png)

### Option A: Embedding (Nesting)

You store the related data directly inside the parent document, as an array or a map (object).

```js
// A post with its comments embedded
{
  title: "Introduction to Firestore",
  author: "Caleb",
  comments: [
    { user: "Ama", text: "Great post!" },
    { user: "Kofi", text: "Thanks for the examples" }
  ]
}
```

- **Pros**: a single read retrieves everything, and consistency is guaranteed.
- **Cons**: Firestore documents have a hard **1 MB size limit**. If the nested list grows indefinitely (comments on a viral post, for instance), your writes will start failing once you hit that limit and every write to the parent document also re-sends the whole document to any client listening in real time.
- **Best for**: small, bounded lists (tags on an article, a user's settings, a short list of favorites).

### Option B: Referencing (Denormalization)

You split the entities into separate collections or sub-collections, and deliberately duplicate a few fields to avoid a second read.

```js
// posts/post_001
{
  title: "Introduction to Firestore",
  authorId: "uid_123",
  authorName: "Caleb",      // denormalized: avoids a second read to "users"
  authorAvatar: "https://...",
  commentCount: 12          // denormalized counter
}

// posts/post_001/comments/comment_001
{
  userId: "uid_456",
  userName: "Ama",
  text: "Great post!",
  createdAt: Timestamp
}
```

Here, we duplicate the author's name and avatar into every post so we don't need an extra read to `users` every time the post list is displayed.

That's denormalization: we accept controlled redundancy in exchange for faster reads the exact opposite of SQL normalization. The cost is that these copies need updating if the user changes their name (usually handled by a Cloud Function triggered when the `users` document is updated).

- **Pros**: no document size limits, and entities can be queried independently.
- **Cons**: requires multiple reads if you didn't denormalize enough. If a duplicated value changes, you need code (often a Cloud Function) to propagate the update everywhere it's copied.
- **Best for**: dynamic, fast-growing data (comments, order history, activity logs).

**A more precise rule of thumb**: whether to *reference instead of embed* depends on volume. Sub-collections handle unbounded growth (comments, order history) better than arrays.

Whether to *denormalize a given field* depends on the cost of keeping it in sync, not how often it changes: a counter you update in place with an atomic increment (`commentCount`, `likeCount`) has no other copy to synchronize, so it's cheap to denormalize regardless of frequency.

A copied value like `authorName`, on the other hand, is duplicated across every document that references it. It's safe to denormalize only if it changes rarely, since any change means propagating the update everywhere it's been copied.

---

## How to Model Relationships (1-1, 1-N, N-N)

### One-to-One (1-1)

Either embed the fields in the same document, or store them in a separate collection using the exact same document ID, for example `users/uid_123` and `privateProfiles/uid_123`. This is perfect for separating public data from sensitive data that needs different security rules.

### One-to-Many (1-N)

![One-to-many relationship diagram showing a post document linked to multiple comment documents through a sub-collection](https://cdn.hashnode.com/uploads/covers/66f71ee288cc311f84e563bc/cc6057e0-f3c9-42dd-827b-4546033b6248.png)

There are three main options, depending on volume and query direction:

1. A **sub-collection** (`posts/post_001/comments/*`) is ideal when you almost always query comments *through* their parent post, and volume can be large.
2. A **root collection with a reference** (`comments` with a `postId` field) is useful if you also need to query all comments by a given user, independently of the post (`where("userId", "==", uid)`).
3. Use an **embedded array** only if the volume stays small and bounded (see Option A above).

### Many-to-Many (N-N)

This is the trickiest one in NoSQL, since there's no automatic join table like in SQL. There are three common patterns:

![Many-to-many relationship diagram showing a memberships junction collection linking users and groups](https://cdn.hashnode.com/uploads/covers/66f71ee288cc311f84e563bc/b8b96fab-5180-43fb-98fd-fe16faac162f.png)

**(1). Junction collection** the equivalent of a SQL pivot table:

```js
// memberships/{membershipId}
{
  userId: "uid_123",
  groupId: "group_789",
  role: "admin",
  joinedAt: Timestamp
}
```

You can then query `.where("userId", "==", uid)` to find all groups a user belongs to, or `.where("groupId", "==", gid)` to find all members of a group.

**(2). ID arrays on both sides** (cross-denormalization):

```js
// users/uid_123      -> groupIds: ["group_789", "group_456"]
// groups/group_789   -> memberIds: ["uid_123", "uid_456"]
```

Fast to read from either side, but reserve this for lists that stay small the 1 MB document limit and the cost of atomically updating long arrays both work against you at scale.

**(3). Hybrid approach**, which is the most common pattern in practice: an array for a lightweight relationship rarely queried from the other side (a user's favorite posts), and a junction collection for a relationship queried frequently in both directions and prone to frequent changes (team memberships).

---

## Best Practices and Pitfalls to Avoid

- **Limit nesting depth:** Firestore allows sub-collections to be nested indefinitely, but beyond two or three levels, your queries and security rules become genuinely hard to maintain. Prefer flattening the structure with references when you can.
- **Avoid auto-incremented document IDs:** Sequential IDs (`user_1`, `user_2`, `user_3`...) can cause *hotspotting*: writes pile up on a narrow range of the index, which degrades performance at scale. Let Firestore generate random, evenly distributed IDs unless you have a specific reason not to.
- **Watch out for composite indexes:** Any query combining multiple `.where()` filters, or a `.where()` with an `.orderBy()` on a different field, requires a composite index. Plan for these during design rather than discovering them in production (Firestore's error messages include a direct link to auto-generate the missing index).
- **Mind the write rate on "hot" documents:** The recommended maximum *sustained* write rate to a single document is about **1 write per second**. A document updated very frequently by many different users a global like counter, for example becomes a bottleneck well before that. Firestore can absorb short bursts (5, 10, even 50 writes in one second) by queuing them, but sustained traffic above ~1 write/sec will start producing contention errors. The standard fix is a *sharded counter*: split the count across several sub-documents and sum them at read time.
- **Use sub-collections deliberately:** They're convenient, but they always require a separate query. If you almost always need the data together, embedding or denormalization will perform better.
- **Design security rules alongside your data model:** Firestore's security rules (`firestore.rules`) should be designed at the same time as your schema a poorly thought-out structure usually makes precise rules much harder to write.

---

## Case Study: Designing a Scalable Blog Database

Let's bring every principle from this guide together with a concrete example: a blog with posts, comments, and likes.

![Complete Firestore schema for a blog application showing the posts, comments sub-collection, and likes collection](https://cdn.hashnode.com/uploads/covers/66f71ee288cc311f84e563bc/d774e41d-28d6-4d0a-81cb-a7bd088992d9.png)

```js
// posts/{postId}
{
  title: "Modeling Firestore",
  slug: "modeling-firestore",
  authorId: "uid_123",
  authorName: "Caleb",         // denormalized: avoids a second read to "users"
  content: "...",
  tags: ["firebase", "nosql"], // embedded: small, bounded list
  commentCount: 3,             // denormalized counter
  likeCount: 47,               // denormalized counter (shard it if traffic is high)
  createdAt: Timestamp
}

// posts/{postId}/comments/{commentId}  → sub-collection: read together with the post
{
  userId: "uid_456",
  userName: "Ama",
  text: "Excellent article",
  createdAt: Timestamp
}

// likes/{likeId}  → root collection + reference
{                    // lets you quickly check if ONE user liked ONE post
  postId: "post_001",
  userId: "uid_456"
}
```

Each choice here answers a specific read pattern. Tags are always displayed alongside the post, so they're embedded. Comments can grow large in number and are almost always fetched together with their parent post, so they live in a sub-collection. Likes need to be queried both by post *and* by user to check whether *this* user already liked *this* post so they sit in a root collection with two indexable fields.

---

## Conclusion

In SQL, you normalize to eliminate redundancy, and you pay for that choice at read time, via joins. In Firestore, it's the opposite: you accept controlled redundancy (denormalization) to make reads instant and cheap, at the cost of slightly heavier writes.

Modeling data in Firestore isn't about applying relational habits with a different syntax. It's a genuinely different way of thinking, centered on your app's read patterns.

Always ask "how will I read this data, and how often?" before choosing between embedding, referencing, or a sub-collection. Also, keep Firestore's concrete limits in mind (1 MB per document, composite indexes, hotspotting) from the design phase rather than discovering them in production.

That balance between read simplicity and write cost is what separates a Firestore database that scales gracefully from one you'll be rewriting six months from now.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Firestore Data Modeling Guide: Embedded Documents vs Referencing (with a Blog Case Study)",
  "desc": "When developers transition from the relational world (MySQL, PostgreSQL) to Firestore, Firebase's NoSQL document database, they often bring their old habits with them. They try to replicate tables, fo",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/firestore-data-modeling-guide-embedded-documents-vs-referencing-with-a-blog-case-study.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
