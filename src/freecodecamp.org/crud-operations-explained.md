---
lang: en-US
title: "CRUD Operations – What is CRUD?"
description: "Article(s) > CRUD Operations – What is CRUD?"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CRUD Operations – What is CRUD?"
    - property: og:description
      content: "CRUD Operations – What is CRUD?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/crud-operations-explained.html
prev: /academics/coen/articles/README.md
date: 2022-06-16
isOriginal: false
author: Kolade Chris
cover: https://freecodecamp.org/news/content/images/2022/06/crud.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="CRUD Operations – What is CRUD?"
  desc="Despite being commonly pronounced /krʌd/, CRUD is not a word. It’s an abbreviation that stands for Create, Read, Update, and Delete or Destroy. In this article, I will show you what CRUD means, and what the individual terms mean and do. I will also s..."
  url="https://freecodecamp.org/news/crud-operations-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/06/crud.png"/>

Despite being commonly pronounced `/krʌd/`, CRUD is not a word. It’s an abbreviation that stands for Create, Read, Update, and Delete or Destroy.

In this article, I will show you what CRUD means, and what the individual terms mean and do. I will also show you how create, read, update, and delete operations work in the real world.

---

## What is CRUD?

CRUD refers to the four basic operations a software application should be able to perform – Create, Read, Update, and Delete.

In such apps, users must be able to **create data**, have access to the data in the UI by **reading** the data, **update** or **edit** the data, and **delete** the data.

In full-fledged applications, CRUD apps consist of 3 parts: an API (or server), a database, and a user interface (UI).

The API contains the code and methods, the database stores and helps the user retrieve the information, while the user interface helps users interact with the app.

You can make a CRUD app with any of the programming languages out there. And the app doesn’t have to be full stack – you can make a CRUD app with client-side JavaScript.

In fact, the app with which I will be showing you how create, read, update and delete operations work is made with client-side JavaScript.

Each letter in the CRUD acronym has a corresponding HTTP request method. 

| **CRUD Operation** | **HTTP Request Method** |
| :--- | :---: | 
| Create | POST |
| Read | GET |
| Update | PUT or PATCH |
| Delete | DELETE |

---

## What is the `CREATE` Operation and How Does it Work?

In CRUD, the create operation does what the name implies. It means creating an entry. This entry could be an account, user information, a post, or a task.

As I pointed out earlier, the HTTP protocol that implements a `CREATE` operation is the POST method.

In a SQL database, to create is to `INSERT`. In a NoSQL database like MongoDB, you create with the `insert()` method.

In a user interface, this GIF below shows how the `CREATE` operation works:

![create-op](https://freecodecamp.org/news/content/images/2022/06/create-op.gif)

---

## What is the `READ` Operation and How Does it Work?

The `READ` operation means getting access to the inputs or entries in the UI. That is, seeing it. Again, the entry could be anything from user information to social media posts, and others.

This access could mean the user getting access to the created entries right after creating them, or searching for them. Searching is implemented to allow the user to filter out the entries they don’t need.

The HTTP protocol that implements a `READ` operation is the GET method.

In a SQL database, to read is to `SELECT` an entry. In a NoSQL database like MongoDB, you read with the `find()` or `findById()` method. 

![read-operation](https://freecodecamp.org/news/content/images/2022/06/read-operation.png)

---

## What is the `UPDATE` Operation and How Does it Work?

`UPDATE` is the operation that allows you to modify existing data. That is, editing the data.

Unlike `READ`, the `UPDATE` operation alters the existing data by making changes to it.

PUT and PATCH are the HTTP protocols with which you can implement an `UPDATE` operation, depending on what you need.

`PUT` should be used when you want the entire entry updated, and PATCH if you don’t want the entire entry to be modified.

In a SQL database, you use `UPDATE` to update an entry. In a NoSQL database like MongoDB, you can implement an update feature with the `findByIdAndUpdate()` method.

In a user interface, this GIF below shows how the `UPDATE` operation works:

![update-op](https://freecodecamp.org/news/content/images/2022/06/update-op.gif)

---

## What is the `DELETE` Operation and How Does it Work?

To delete is to get rid of an entry from the UI and the database.

`DELETE` is the HTTP protocol for implementing a `DELETE` operation.

In a SQL database, `DELETE` is used to delete an entry. In a NoSQL database like MongoDB, you can implement delete with the `findByIdAndDelete()` method.

![delete-op](https://freecodecamp.org/news/content/images/2022/06/delete-op.gif)

---

## Conclusion

This article showed you what CRUD means and what each individual operation in a CRUD app does.

You can think about CRUD in this way:

- You create a social account and fill in your information - `CREATE`
- You get access to the information you entered and people can search for you – `READ`
- You get a new job at Google and changed your employment status to employed – `UPDATE`
- You get tired of social media toxicity and delete your account - `DELETE`

To learn how you can make your own CRUD app, check out [this tutorial](/freecodecamp.org/learn-crud-operations-in-javascript-by-building-todo-app.md) by Joy Shaheb of freeCodeCamp.

Keep coding 👋

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CRUD Operations – What is CRUD?",
  "desc": "Despite being commonly pronounced /krʌd/, CRUD is not a word. It’s an abbreviation that stands for Create, Read, Update, and Delete or Destroy. In this article, I will show you what CRUD means, and what the individual terms mean and do. I will also s...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/crud-operations-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
