---
lang: en-US
title: "Mistake #3: Writing Database Queries Inside Loops (Killer of Speed)"
description: "Article(s) > (3/8) Why Your Code is Slow: Common Performance Mistakes Beginners Make"
icon: fa-brands fa-python
category:
  - Python
  - Java
  - C#
  - C++
  - C
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - java
  - c#
  - csharp
  - c++
  - cpp
  - c
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (3/8) Why Your Code is Slow: Common Performance Mistakes Beginners Make"
    - property: og:description
      content: "Mistake #3: Writing Database Queries Inside Loops (Killer of Speed)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-your-code-is-slow-common-performance-mistakes-beginners-make/mistake-3-writing-database-queries-inside-loops-killer-of-speed.html
date: 2025-03-29
isOriginal: false
author:
  - name: Rahul
    url : https://freecodecamp.org/news/author/RAHULISM/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743176201295/448f0407-8a15-4b59-a91f-8a197bc07578.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Why Your Code is Slow: Common Performance Mistakes Beginners Make",
  "desc": "Maybe you’ve experienced something like this before: you’ve written code that works, but when you hit “run,” it takes forever. You stare at the spinner, wondering if it’s faster to just solve the problem by hand. But you end up looking something like...",
  "link": "/freecodecamp.org/why-your-code-is-slow-common-performance-mistakes-beginners-make/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why Your Code is Slow: Common Performance Mistakes Beginners Make"
  desc="Maybe you’ve experienced something like this before: you’ve written code that works, but when you hit “run,” it takes forever. You stare at the spinner, wondering if it’s faster to just solve the problem by hand. But you end up looking something like..."
  url="https://freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make#heading-mistake-3-writing-database-queries-inside-loops-killer-of-speed"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743176201295/448f0407-8a15-4b59-a91f-8a197bc07578.png"/>

::: important Why This is a Problem

This is one of the biggest slow-code mistakes beginners (and even intermediates) make. It happens because loops feel natural, and database queries feel straightforward. But mix the two together, and you’ve got a performance disaster.

Every time you call a database inside a loop, you're making repeated trips to the database. Each query adds network latency, processing overhead, and unnecessary load on your system.

:::

::: tip Example

Imagine you’re fetching user details for a list of `user_ids` like this:

```py
pythonCopyEdituser_ids = [1, 2, 3, 4, 5]

for user_id in user_ids:
    user = db.query(f"SELECT * FROM users WHERE id = {user_id}")
    print(user)  # Do something with the user
```

**What's wrong here?**

- You're hitting the database multiple times instead of once.
- Each call has network overhead (database queries aren’t instant).
- Performance tanks when user_ids gets large.

:::

::: info How to Fix It: Use Bulk Queries

Instead of making 5 separate queries, make one:

```py
pythonCopyEdituser_ids = [1, 2, 3, 4, 5]

users = db.query(f"SELECT * FROM users WHERE id IN ({','.join(map(str, user_ids))})")

for user in users:
    print(user)  # Process users efficiently
```

**Why this is better:**

- In the above code, we just have one database call instead of many. This results in faster performance.
- There’s also less network overhead which makes your app feel snappier.
- And this works even if `user_ids` has 10,000+ entries.

:::

---

## A More Scalable Approach

If you're using an ORM (like SQLAlchemy in Python or Sequelize in JavaScript), use batch fetching instead of looping:

```py
pythonCopyEditusers = db.query(User).filter(User.id.in_(user_ids)).all()
```
