---
lang: en-US
title: "What is SQL? Database Definition for Beginners"
description: "Article(s) > What is SQL? Database Definition for Beginners"
icon: fas fa-database
category:
  - Data Science
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is SQL? Database Definition for Beginners"
    - property: og:description
      content: "What is SQL? Database Definition for Beginners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-sql-database-definition-for-beginners.html
prev: /data-science/articles/README.md
date: 2023-01-13
isOriginal: false
author:
  - name: Joel Olawanle
    url : https://freecodecamp.org/news/author/olawanlejoel/
cover: https://freecodecamp.org/news/content/images/2023/01/cover-template--8-.png
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

[[toc]]

---

<SiteInfo
  name="What is SQL? Database Definition for Beginners"
  desc="Data is a powerful tool that drives everything you see and interact with on the internet. It facilitates research and powers today's technology. It is the driving force behind today's artificial intelligence and robotics. And so much more. Previously..."
  url="https://freecodecamp.org/news/what-is-sql-database-definition-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/01/cover-template--8-.png"/>

Data is a powerful tool that drives everything you see and interact with on the internet.

It facilitates research and powers today's technology. It is the driving force behind today's artificial intelligence and robotics. And so much more.

Previously, these data were stored on paper, in physical files within cabinets. But now they are stored online in what is known as a database.

In this article, you will learn about what a database is, the two major types of databases, and then what SQL is and why it is important.

---

## What is a Database?

A database is a structured collection of electronically stored data. These data can be accessed, managed, modified, updated, controlled, and organized with the help of a database management system (DBMS).

Data and DBMS are generally linked and referred to as a database system, frequently shortened to just a database.

There are several types of databases, depending on how data is stored, retrieved, and modified. But there are two major types, which are relational and non-relational databases.

### What is a Relational Database?

A relational database, also known as a SQL database, is used to store data in tables. This means that the data is organized into rows and columns.

This type of database organizes data in predefined relationships and stores that data in one or more tables of columns and rows. This makes it easy to see and understand how different data structures relate to one another.

![](https://paper-attachments.dropboxusercontent.com/s_DADB35C92DE96459B45F8A24F2BA20C1018B5BA020F47C0EB9D92470905886E0_1673510261840_Untitled1.drawio.png)

This type of database is referred to as “relational” because two or more tables may be related to each other.

For example, when you have a table of users with a unique id, you can use that id to store each user's order in a different order table and request them using the user's unique id.

![](https://paper-attachments.dropboxusercontent.com/s_DADB35C92DE96459B45F8A24F2BA20C1018B5BA020F47C0EB9D92470905886E0_1673510517663_Untitled1.drawio+2.png)

Popular examples of relational database management systems are MySQL, PostgreSQL, MSSQL, and Oracle. To access data from relational databases, you will use **SQL (Structured Query Language)**.

### What is a Non-Relational Database?

Non-Relational Databases, also known as NoSQL Databases, are databases that store data in a non-tabular format.

This means that data is not modelled in rows and columns but rather in key-value pairs. For example, in key-value pairs, you can have objects representing each user:

![s_DADB35C92DE96459B45F8A24F2BA20C1018B5BA020F47C0EB9D92470905886E0_1673543855317_Untitled11.drawio](https://paper-attachments.dropboxusercontent.com/s_DADB35C92DE96459B45F8A24F2BA20C1018B5BA020F47C0EB9D92470905886E0_1673543855317_Untitled11.drawio.png)

Examples of non-relational databases are MongoDB, Amazon DynamoDB, Redis, and lots more.

---

## What is SQL?

Structured Query Language (SQL) is a query language used with **relational databases** such as MySQL, Oracle, MSSQL, PostgreSQL, and many others.

It is a query language that you can use to create and delete databases and tables, insert and read data into tables, delete data from tables, and much more.

![](https://paper-attachments.dropboxusercontent.com/s_DADB35C92DE96459B45F8A24F2BA20C1018B5BA020F47C0EB9D92470905886E0_1673510261840_Untitled1.drawio.png)

For example, let's say that you have a table of users, as seen above, that holds the unique id, first name, last name, and age. You can use SQL to read or get specific data from the table, such as the first and last names only:

```sql
SELECT first_name, last_name FROM Users;
```

This will return a table with only the queried data:

![](https://paper-attachments.dropboxusercontent.com/s_DADB35C92DE96459B45F8A24F2BA20C1018B5BA020F47C0EB9D92470905886E0_1673544506987_Untitled1.drawio+3.png)

You can do a lot more with SQL, but this was just an introduction. If you want to learn more, I've linked a couple great resources below.

---

## That's it!

In this article, you have learned the fundamental and major differences between relational and non-relational databases. You also learned that SQL is a query language used with relational databases to interact with the database.

There is more to what you can do with SQL and databases. You can learn more [<VPIcon icon="fa-brands fa-youtube"/>about SQL and databases by watching one of the best videos on the internet, with over 14 million views](https://youtu.be/HXV3zeQKqGY). You can also [<VPIcon icon="fa-brands fa-free-code-camp"/>check out over 120 articles on SQL published on the freeCodeCamp publication](https://freecodecamp.org/news/tag/sql/).

Have fun coding!

You can access over 150 of my articles by [<VPIcon icon="fas fa-globe"/>visiting my website](https://joelolawanle.com/contents). You can also use the search field to see if I've written a specific article.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is SQL? Database Definition for Beginners",
  "desc": "Data is a powerful tool that drives everything you see and interact with on the internet. It facilitates research and powers today's technology. It is the driving force behind today's artificial intelligence and robotics. And so much more. Previously...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-sql-database-definition-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
