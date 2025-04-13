---
lang: en-US
title: "An Animated Introduction to SQL – Learn to Query Relational Databases"
description: "Article(s) > An Animated Introduction to SQL – Learn to Query Relational Databases"
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
      content: "Article(s) > An Animated Introduction to SQL – Learn to Query Relational Databases"
    - property: og:description
      content: "An Animated Introduction to SQL – Learn to Query Relational Databases"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/an-animated-introduction-to-sql-learn-to-query-relational-databases.html
prev: /data-science/articles/README.md
date: 2025-04-17
isOriginal: false
author:
  - name: Mark Mahoney
    url : https://freecodecamp.org/news/author/markm208/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744818155429/10b16956-a249-4815-b50a-594b58330a01.png
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
  name="An Animated Introduction to SQL – Learn to Query Relational Databases"
  desc="In this tutorial, you’ll learn about the Structured Query Language (SQL), the standard language used to query relational databases. SQL is not a traditional programming language. In Python or Java, you write step-by-step instructions that tell the co..."
  url="https://freecodecamp.org/news/an-animated-introduction-to-sql-learn-to-query-relational-databases"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744818155429/10b16956-a249-4815-b50a-594b58330a01.png"/>

In this tutorial, you’ll learn about the [**Structured Query Language (SQL)**](/freecodecamp.org/what-is-sql-database-definition-for-beginners.md), the standard language used to query relational databases.

SQL is not a traditional programming language. In Python or Java, you write step-by-step instructions that tell the computer exactly **how** to do something. This is called **imperative** programming.

SQL works differently. First, you understand what data is stored in your tables. Then you write a query describing **what** data you want and you give it to a database management system. The database management system figures out **how** to get it. This **declarative** style is part of what makes SQL powerful (and fun to use).

You don’t need to be a programmer to learn SQL, but having some programming experience helps. Concepts like conditional logic and comparing values to see if something is true or false will feel familiar if you’ve coded before.

If you want an introduction to the basics, check out some of my programming language tutorials listed below.

---

## Tutorial Structure

This tutorial is built around three books of interactive code playbacks I use in my database courses:

- [<FontIcon icon="fas fa-globe"/>Database Design and SQL for Beginners](https://playbackpress.com/books/sqlbook)
- [<FontIcon icon="fas fa-globe"/>Worked SQL Examples](https://playbackpress.com/books/workedsqlbook)
- [<FontIcon icon="fas fa-globe"/>Programming with SQLite](https://playbackpress.com/books/sqlitebook)

Each section of this tutorial includes worked examples where I show how I write SQL step-by-step, explaining my thought process along the way. You’ll see me experiment, refine, and build queries piece by piece, just like a real developer would. I rely heavily on Entity-Relationship Diagrams and Schemas to help me visualize the data stored in the databases.

Here’s how the tutorial is organized:

::: tabs

@tab:active Part 1

**A Whirlwind Tour of SQL**

(from [<FontIcon icon="fas fa-globe"/>Database Design and SQL for Beginners](https://playbackpress.com/books/sqlbook))

I start by exploring a simple database for a fictional pet adoption center called the *Paw Prints Adoption Center*. I introduce essential concepts like:

- Entity-Relationship (ER) diagrams
- Schemas
- Table structure and relationships

This foundation sets the stage for everything that follows. If you're new to database design, spend some time here before moving on.

@tab Part 2

**Core SQL Concepts and Keywords**

(also from [<FontIcon icon="fas fa-globe"/>Database Design and SQL for Beginners](https://playbackpress.com/books/sqlbook))

I cover the most important SQL keywords and ideas. Each topic is explained in its own playback with examples:

- `CREATE TABLE`, `ALTER TABLE`
- `SELECT`, `FROM`, `WHERE`, `JOIN`
- `ORDER BY`, `GROUP BY`, `HAVING`
- `INSERT`, `UPDATE`, `DELETE`
- Nested queries, Common Table Expressions, and set operations (`UNION`, `INTERSECT`, `EXCEPT`)
- Indexes and transactions

This section works as a reference. If you're stuck on a query or forget what a keyword does, come back here.

@tab Part 3

**Practice Problems**

(from [<FontIcon icon="fas fa-globe"/>Worked SQL Examples](https://playbackpress.com/books/workedsqlbook))

Practice is how you really learn. I’ve included 36 practice problems using the Paw Prints database and a new university database. Each problem has an animated playback showing how I worked through the solution step-by-step.

Try writing your own query before watching the solution. Struggling with the problem first will help you learn much more than just watching me provide the answer.

These problems build your skills gradually and help reinforce the use of ER diagrams and schemas in real scenarios.

@tab Part 4

**Using SQLite in Programs**

(from [<FontIcon icon="fas fa-globe"/>Programming with SQLite](https://playbackpress.com/books/sqlitebook))

In this final optional section, I show how to connect SQL to real code. You’ll learn how to use the [<FontIcon icon="iconfont icon-sqlite"/>SQLite](https://sqlite.org/) database in:

- C/C++
- Python and Flask
- Java

:::

### Running Queries

A database management system (DBMS) is the software used to manage and query data in a database. Many DBMSs require significant configuration and often a separate server to respond to query requests. Setting these up can be challenging for newcomers.

[<FontIcon icon="iconfont icon-sqlite"/>SQLite](https://sqlite.org/) is a simple DBMS that doesn’t require much setup. It’s a great tool to start with. It doesn’t need a standalone server and stores the entire database in a single file.

To make it easier to view and edit your databases, I recommend using [<FontIcon icon="iconfont icon-sqlite"/>DB Browser for SQLite](https://sqlitebrowser.org/). It’s a free, open-source tool with a simple interface and all of SQLite’s functionality built in. You can open database files, browse tables, run queries, and edit data using an intuitive user interface. It’s especially useful when you’re learning and want to quickly see how your queries affect the data.

### Optional: Web-Based Alternative to DB Browser

If you prefer not to install any software, you can use a web-based tool like [<FontIcon icon="fas fa-globe"/>SQLite Viewer](https://inloop.github.io/sqlite-viewer/) or [<FontIcon icon="fas fa-globe"/>SQLite Online](https://sqliteonline.com/). These let you upload a `.sqlite` file, run queries, and explore a database from your browser.

- [<FontIcon icon="fas fa-globe"/>SQLite Viewer](https://inloop.github.io/sqlite-viewer/): A simple, read-only viewer. Good for inspecting tables and testing basic queries.
- [<FontIcon icon="fas fa-globe"/>SQLite Online](https://sqliteonline.com/): A full-featured SQLite IDE. You can create databases, upload files, run queries, and even save your work.

Both tools are great for quick experiments or checking your work without installing anything.

### Code Playbacks

This tutorial is not a traditional video or static text. Each section includes links to interactive **code playbacks** that animate how the code or query was built, step-by-step. You can pause and rewind to see each change as it happens.

Each playback includes a narrative, screenshots, whiteboard-style drawings, and self-grading multiple-choice questions to reinforce what you’ve learned.

If you haven’t seen a code playback before, don’t worry. They’re easy to use and allow you to see how queries evolve over time. Here’s a short video showing how to view a code playback:

### Playback Press

[<FontIcon icon="fas fa-globe"/>Playback Press](https://playbackpress.com/books) is the platform where I publish my interactive code walkthroughs. Each book includes step-by-step animations, AI tutoring, and built-in quizzes.

I also created [<FontIcon icon="fas fa-globe"/>Storyteller](https://markm208.github.io/), the free, open-source tool that powers these playbacks.

### AI Tutor

While you're viewing a code playback, you can ask an AI tutor questions about the queries. It gives clear, focused answers and doesn’t rush you. You can also ask it to create new self-grading multiple-choice questions to test your understanding.

To use the AI tutor and quizzes, create a free account on Playback Press and add one of the books to your bookshelf.

---

## Part 1: A Whirlwind Tour of SQL

When someone is asked to manage some data, most people's first instinct is to use a spreadsheet. Spreadsheets are easy to use and flexible. But as your data grows more complex, they start to show some weaknesses.

One major issue is redundant data. When the same piece of information appears in multiple places, there's a risk that one copy might change while the others stay the same. This can lead to inconsistencies, errors, and confusing results.

Relational databases help solve this by organizing data in a structured way that reduces redundancy by design. Before building a database, it’s helpful to model the data using an Entity-Relationship (ER) diagram.

### Entity-Relationship Diagrams

An ER diagram is a planning tool used to visualize the structure of a database. It helps you figure out what kinds of data you need to store and how those pieces of data relate to each other.

- **Entities** are the main objects or concepts in your system, like `Person`, `Course`, or `Dog`. Entities have attributes that describe them. A `Person` might have `name`, `date of birth`, and `address` attributes, for example.
- **Relationships** describe how entities are connected. For example, a `Person` might *adopt* a `Dog`, or a `Student` might *enroll in* a `Course`.

By laying this out in a diagram, you can clearly see what data is being stored and how the entities are related to each other. This makes it easier to design the tables in your database correctly.

Here is an example of an ER diagram used in this part of the tutorial:

![An Entity-Relationship Diagram for the Paw Prints Database](https://cdn.hashnode.com/res/hashnode/image/upload/v1744664220972/dc57e1fa-bad9-42b0-9158-0f2649c4f282.png)

### Schemas

A **schema** is another way to describe the structure of a database. It shows the same information as the ER diagram, but in a more technical and precise format focused on how the data will actually be stored. Each element of a schema will become a table in a database.

Instead of lines connecting boxes, a schema uses primary keys and foreign keys:

- A **primary key** uniquely identifies each row in a table. Primary keys have a solid underline.
- A **foreign key** refers to the primary key in another table, linking the two together. Foreign keys have a dashed underline.

Here is an example of a schema used in this part of the tutorial:

![A Schema for the Paw Prints database](https://cdn.hashnode.com/res/hashnode/image/upload/v1744664247677/146dff90-e366-4ba2-b584-07d5ff42cca9.jpeg)

While an ER diagram is more visual and conceptual, a schema is more concrete and closer to the actual implementation in the DBMS. You’ll see both used throughout this tutorial as I move from planning to writing SQL.

### Try It: Explore a Relational Database in Action

To see how these concepts work in practice, take a look at the following three code playbacks. They walk through the design of a relational database for a fictional pet adoption center called **Paw Prints**. These examples will help you understand how entities, relationships, and schemas come together in a real database and how to write simple SQL queries to explore that data.

Start with the first playback and move through all three in order:

1. [<FontIcon icon="fas fa-globe"/>Database Design and Simple SQL](https://playbackpress.com/books/sqlbook/chapter/1/1): Introduces the Paw Prints database and shows how to write basic SQL queries.
2. [<FontIcon icon="fas fa-globe"/>One-to-Many Relationships and More SQL](https://playbackpress.com/books/sqlbook/chapter/1/2): Covers one-to-many relationships and how to join related tables.
3. [<FontIcon icon="fas fa-globe"/>Many-to-Many Relationships and Even More SQL](https://playbackpress.com/books/sqlbook/chapter/1/3): Shows how to handle many-to-many relationships using join tables and more advanced queries.

As you watch, pause to make sure you understand how the data is structured and how each SQL query is written. You can always refer back to this section later if something in the next chapters isn’t clear.

---

## Part 2: A Beginner’s Reference to SQL

This section takes a closer look at the core SQL commands introduced in the whirlwind tour. Each playback focuses on one topic and shows how to use it through step-by-step examples. I continue to use the Paw Prints database in these examples.

Think of this as a reference section. You don’t need to go through everything in order but you may want to go through them all at least once before beginning to practice in part 3. Come back here whenever you need a refresher on a particular SQL concept.

Here are the key concepts we’ll cover:

### `CREATE TABLE and ALTER TABLE`

https://playbackpress.com/books/sqlbook/chapter/2/1

Learn how to define tables in a relational database. This playback shows how to create tables from scratch and how to change them later using `ALTER TABLE`.

### `INSERT`

https://playbackpress.com/books/sqlbook/chapter/2/2

See how to add new rows of data to a table. This example shows how to use the `INSERT` command and make sure your data matches the table structure.

### `SELECT`

https://playbackpress.com/books/sqlbook/chapter/2/3

This playback introduces the `SELECT` keyword in SQL. You’ll learn how to retrieve specific columns (or attributes) from a table and see what the result set looks like.

### `FROM`

https://playbackpress.com/books/sqlbook/chapter/2/4

Explore how the `FROM` clause specifies which tables your data comes from. This sets the stage for combining data from multiple sources using a Cartesian product. You’ll also see how to `JOIN` tables together.

### `WHERE`

https://playbackpress.com/books/sqlbook/chapter/2/5

Learn how to filter results using conditions. The `WHERE` clause helps narrow down the rows returned by a query. This playback also shows how to join tables by matching foreign keys to primary keys.

### `UPDATE and DELETE`

https://playbackpress.com/books/sqlbook/chapter/2/6

Learn how to change existing data in the database with `UPDATE` and remove data using `DELETE`. You’ll also see how to avoid accidental changes by using `WHERE` conditions carefully.

### `ORDER BY`

https://playbackpress.com/books/sqlbook/chapter/2/7

Sort your results using `ORDER BY`. You’ll learn how to control the order of your output using one or more attributes.

### Aggregate Operators, `GROUP BY`, and `HAVING`

https://playbackpress.com/books/sqlbook/chapter/2/8

Group rows and calculate summary values using aggregate functions like `COUNT`, `AVG`, `MIN`, `MAX`, and `SUM`. This playback also shows how to use `GROUP BY` and `HAVING` to work with grouped results.

### Nested Queries with `IN` and Common Table Expressions

https://playbackpress.com/books/sqlbook/chapter/2/9

Learn how to use nested queries – queries inside other queries – to build more flexible logic. This playback also shows how to write cleaner queries using Common Table Expressions (CTEs).

### `UNION`, `INTERSECT`, `EXCEPT`

https://playbackpress.com/books/sqlbook/chapter/2/10

See how to combine the results of multiple queries. This example shows how `UNION`, `INTERSECT`, and `EXCEPT` help you work with data from different queries as if it were one set.

### Transactions

https://playbackpress.com/books/sqlbook/chapter/2/11

Learn how to group multiple SQL commands into a single **transaction**, so they all succeed or fail together. Transactions help protect your data from partial updates.

### `CREATE INDEX`

https://playbackpress.com/books/sqlbook/chapter/2/12

Improve query performance using indexes. This playback shows how to create an index on one or more columns and explains why that makes certain queries run faster.

---

## Part 3: Practice Problems — Paw Prints and University Databases

Now it’s time to apply what you’ve learned.

Below are six practice problems that use the Paw Prints database from earlier examples. If you haven't recreated it yourself, here is a link to the SQLite file [<FontIcon icon="fas fa-globe"/>dogsFinal.sqlite.](https://markm208.github.io/sqlbook/dogsFinal.sqlite) Each one asks a specific question that requires you to write a SQL query to find the answer. Try solving each one on your own before watching the solution.

Don’t worry if you don’t get it right on the first try. Writing SQL often involves trial and error, even for experienced developers. The goal is to think through the problem and make progress, not to be perfect. Start small and build your queries up through an iterative process.

Click each link to view the playback after you've made your attempt:

### 1. Which Dogs Have Had the Most Visits?

```component VPCard
{
  "title": "Which Dogs Have Had the Most Visits?",
  "desc": "In this playback I will answer the question, 'Which dogs have had the most visits?'",
  "link": "https://playbackpress.com/books/sqlbook/chapter/3/1/",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

Figure out how to count visits for each dog and sort them to find the most frequently visited ones.

### 2. Number of Adoptions and Average Age

```component VPCard
{
  "title": "Number of Adoptions and Average Age",
  "desc": "In this playback I will answer the question, 'How many adoptions were there at each location and what was the average age of the adopted dogs at each location?'",
  "link": "https://playbackpress.com/books/sqlbook/chapter/3/2/",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

Find the total number of adoptions and the average age of adopted dogs. You'll need to filter the data appropriately.

### 3. Locations with Least/Most Aggressive Dogs

```component VPCard
{
  "title": "Locations with Least/Most Aggressive Dogs",
  "desc": "In this playback I will answer the question, 'Historically, which locations have housed the least number of aggressive dogs and which have housed the most?'",
  "link": "https://playbackpress.com/books/sqlbook/chapter/3/3/",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

Use grouping to compare aggression levels across locations and determine where the most and fewest aggressive dogs are housed.

### 4. Average Time to Adoption By Location

```component VPCard
{
  "title": "Average Time to Adoption By Location",
  "desc": "In this playback I will answer the question, 'How long does each dog stay at the adoption center before being adopted by location?'",
  "link": "https://playbackpress.com/books/sqlbook/chapter/3/4/",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

Calculate the average time it takes for dogs to be adopted, broken down by location.

### 5. Finding Available Capacity at Each Location

```component VPCard
{
  "title": "Finding Available Capacity at Each Location",
  "desc": "In this playback I will answer the question, 'How much available capacity is in each location?'",
  "link": "https://playbackpress.com/books/sqlbook/chapter/3/5/",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

Determine how much space is left at each shelter location by comparing total capacity to current occupancy.

### 6. Who Visited then Adopted an Aggressive Dog

```component VPCard
{
  "title": "Who Visited then Adopted an Aggressive Dog",
  "desc": "In this playback I will answer the question, 'Who are clients who visited an aggressive dog and then adopted them?'",
  "link": "https://playbackpress.com/books/sqlbook/chapter/3/6/",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

This complex query asks you to track user actions over time, first visiting, then adopting an aggressive dog. A good challenge!

### University Database

Next, you’ll work with a more complex database that models a university’s course and grading system. You’ll use it to analyze real-world relationships between students, professors, courses, and departments.

Download the SQLite version of the database here:  
[<FontIcon icon="fas fa-globe"/>studentGrades.sqlite](https://markm208.github.io/workedsqlbook/studentGrades.sqlite)

Here are the **entities** in the database:

- `Students`
- `Sections`
- `Courses`
- `Professors`
- `Departments`

And here are the **relationships** between them:

- Each student takes zero or more sections. (Every student receives a grade.)
- Each section has zero or more students taking it.
- Each section is an instance of a course.
- Each course has zero or more sections.
- Each section is taught by a single professor.
- Each professor teaches zero or more sections.
- Each professor belongs to zero or more departments.
- Each department has zero or more professors.
- Each department has, at most, one professor who is its chairperson.
- Each professor may chair, at most, one department.
- Each course is offered by a department.
- Each department offers zero or more courses.

The code playbacks highlight how I use **ER diagrams** and **schemas** to help me build my queries. You can preview them here:

![An Entity-Relationship Diagram for the University database](https://cdn.hashnode.com/res/hashnode/image/upload/v1744665047915/c0c0c31a-8463-4d01-a15c-930d6e24b574.jpeg)

![A Schema for the University database](https://cdn.hashnode.com/res/hashnode/image/upload/v1744665070077/fd9c60be-0140-4281-ba8c-a3216001a043.jpeg)

Try each query on your own before watching the solution.

### 7. List every course name, section number, and professor name in chronological order for every section that has ever been offered

https://playbackpress.com/books/workedsqlbook/chapter/1/1

### 8. List every course name and section number for every course offered by the computer science department

s://playbackpress.com/books/workedsqlbook/chapter/1/2
### 9. Find the name of every professor who has ever taught CSCI111

https://playbackpress.com/books/workedsqlbook/chapter/1/3

### 10. List all of the professor names and their departments

https://playbackpress.com/books/workedsqlbook/chapter/1/4

### 11. List the names of the professors who have taught both CSCI111 and CSCI112

https://playbackpress.com/books/workedsqlbook/chapter/1/5

### 12. List the names of all of the students of professor Mark Mahoney who are greater than or equal to 21 years old

https://playbackpress.com/books/workedsqlbook/chapter/2/1

### 13. List the names of all of the students who are taught by a department chair

https://playbackpress.com/books/workedsqlbook/chapter/2/2

### 14. List all of the course names and section numbers of every course ever taught by a department chair

https://playbackpress.com/books/workedsqlbook/chapter/2/3

### 15. List all of the courses with the oldest student

https://playbackpress.com/books/workedsqlbook/chapter/2/4

### 16. List all of the courses and section numbers with the youngest average student age

https://playbackpress.com/books/workedsqlbook/chapter/2/5

### 17. List all of the course names and section numbers of courses with less than four credits

https://playbackpress.com/books/workedsqlbook/chapter/3/1

### 18. List all of the course names and section numbers with the smallest enrollment

https://playbackpress.com/books/workedsqlbook/chapter/3/2

### 19. List all of the student names who have taken more than one course with Mark Mahoney

https://playbackpress.com/books/workedsqlbook/chapter/3/3

### 20. List all of the student names who have taken a course with both Mark Mahoney and Eric Whendon

https://playbackpress.com/books/workedsqlbook/chapter/3/4

### 21. List all the course names and section numbers that had two or more students earn A's

https://playbackpress.com/books/workedsqlbook/chapter/3/5

### 22. Find the names of all the students who have taken CSCI111

https://playbackpress.com/books/workedsqlbook/chapter/4/1

### 23. Find the names of all professors in the computer science department who are not chairs of a department

https://playbackpress.com/books/workedsqlbook/chapter/4/2

### 24. Find the names of all professors who are the chair of a department

https://playbackpress.com/books/workedsqlbook/chapter/4/3

### 25. Find the ssn, first and last name, course name, and grade earned for all courses taken in spring 2007

https://playbackpress.com/books/workedsqlbook/chapter/4/4

### 26. Find the course name and section number of all the courses that have ever been offered in the fall

https://playbackpress.com/books/workedsqlbook/chapter/4/5

### 27. Find the names of all of the professors teaching in spring 2007

https://playbackpress.com/books/workedsqlbook/chapter/5/1

### 28. Find the names of all of the students who have received an A and a B in any course

https://playbackpress.com/books/workedsqlbook/chapter/5/2

### 29. Find out how many students have ever taken CSCI111

https://playbackpress.com/books/workedsqlbook/chapter/5/3

### 30. Find the average age of all students who ever had a course with Mark Mahoney

https://playbackpress.com/books/workedsqlbook/chapter/5/4

### 31. Find the names of all of the professors who have never taught a course

https://playbackpress.com/books/workedsqlbook/chapter/5/5

### 32. Find the names of all of the professors who have taught May Jones

https://playbackpress.com/books/workedsqlbook/chapter/6/1

### 33. Find the names of the students who have had a course in Fall 2006 or Spring 2007

https://playbackpress.com/books/workedsqlbook/chapter/6/2

### 34. Find the names of the students who have taken a course from a professor who has more than one appointment to a department

https://playbackpress.com/books/workedsqlbook/chapter/6/3

### 35. Find the average age of students who took courses in Spring 2007

https://playbackpress.com/books/workedsqlbook/chapter/6/4

### 36. Find the sum of all of the credit hours offered by the computer science department in 2007

https://playbackpress.com/books/workedsqlbook/chapter/6/5

---

## Part 4: Using SQLite in Programs

So far, you’ve learned how to write SQL queries and design relational databases. In this optional section, you’ll see how to use SQLite in actual code. Each playback walks through a working program that reads from and writes to a SQLite database.

### Why Use SQLite in Programs?

SQLite’s simplicity makes it a great choice for quick projects, prototypes, and small applications. You don’t need to run a server, and everything is stored in a single file.

These playbacks show how to embed SQL directly into your code, so your programs can store and retrieve data as part of their normal workflow. I really love using it in my projects!

Here’s an overview of the playbacks:

### C/C++

#### 1. The C++ SQLite API

https://playbackpress.com/books/sqlitebook/chapter/2/1

Shows how to set up and use the SQLite C++ API. You’ll open a database, run basic queries, and handle results.

#### 2. An Object-Oriented Auction Program

https://playbackpress.com/books/sqlitebook/chapter/2/2

Builds a more complex C++ program that tracks bids, items, and users. This example shows how to structure a real-world application with SQLite.

#### 3. SQLite Transactions

https://playbackpress.com/books/sqlitebook/chapter/2/3

Explains how to group multiple database operations into a single transaction. This protects your data from partial updates.

### Python and Flask

#### 1. Querying a SQLite Database

https://playbackpress.com/books/sqlitebook/chapter/3/1

Connects a Python script to a SQLite database, runs queries, and processes the results using Python’s built-in libraries.

#### 2. Creating SQLite Databases

https://playbackpress.com/books/sqlitebook/chapter/3/2

Shows how to create new SQLite databases directly from Python, defining tables and inserting initial data.

#### 3. Flask Basics

https://playbackpress.com/books/sqlitebook/chapter/3/3

Introduces Flask. You’ll see how to build a simple web application that can serve pages and connect to your SQLite database.

#### 4. Creating an API

https://playbackpress.com/books/sqlitebook/chapter/3/4

Takes Flask further by creating a RESTful API that interacts with a SQLite database, letting you perform CRUD operations on a SQLite database.

### Java

#### 1. Using a SQLite Database in a Java Program

https://playbackpress.com/books/sqlitebook/chapter/4/1

Shows how to integrate the SQLite driver into a Java application. You’ll learn how to open a connection, run queries, and handle exceptions properly.

---

## Conclusion

By now, you’ve learned how to read and write real SQL. You’ve seen how to design a database, how to write queries that retrieve and modify data, and how to tackle increasingly complex questions using the tools SQL gives you.

If you worked through the practice problems you’ve already done what many developers do on the job: examine unfamiliar data, figure out the relationships, and write queries to answer real questions.

SQL is a skill that gets sharper the more you use it. Don’t worry if you still feel a little unsure. Repetition and exploration will build your confidence. Keep experimenting, break things, and try to fix them. That’s how you really learn.

If you’re planning to use SQL in your own projects, try building a small database from scratch or connecting SQLite to one of your programs. You’ll learn a lot by seeing what questions your own data brings up.

Thanks for reading. I hope these playbacks helped make SQL a little easier to understand. Good luck with your next SQL project.

---

## Comments and Feedback

You can find all of these code playbacks and more in one of my free books:

- [<FontIcon icon="fas fa-globe"/>Database Design and SQL for Beginners](https://playbackpress.com/books/sqlbook)
- [<FontIcon icon="fas fa-globe"/>Worked SQL Examples](https://playbackpress.com/books/workedsqlbook)
- [<FontIcon icon="fas fa-globe"/>Programming with SQLite](https://playbackpress.com/books/sqlitebook)
- [<FontIcon icon="fas fa-globe"/>An Animated Introduction to Programming in C++](https://playbackpress.com/books/cppbook/)
- [<FontIcon icon="fas fa-globe"/>An Animated Introduction to Programming with Python](https://playbackpress.com/books/pybook)
- [<FontIcon icon="fas fa-globe"/>An Introduction to Web Development from Back to Front](https://playbackpress.com/books/webdevbook)
- [<FontIcon icon="fas fa-globe"/>An Animated Introduction to Clojure](https://playbackpress.com/books/cljbook)
- [<FontIcon icon="fas fa-globe"/>An Animated Introduction to Elixir](https://playbackpress.com/books/exbook)
- [<FontIcon icon="fas fa-globe"/>A Brief Introduction to Ruby](https://playbackpress.com/books/rubybook)
- [<FontIcon icon="fas fa-globe"/>Mobile App Development with Dart and Flutter](https://playbackpress.com/books/flutterbook)
- [<FontIcon icon="fas fa-globe"/>OO Design Patterns with Java](https://playbackpress.com/books/patternsbook)
- [<FontIcon icon="fas fa-globe"/>How I Built It: Word Zearch](https://playbackpress.com/books/wordzearchbook)

Comments and feedback are welcome anytime: [<FontIcon icon="fas fa-envelope"/>`mark@playbackpress.com`](mailto:mark@playbackpress.com)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Animated Introduction to SQL – Learn to Query Relational Databases",
  "desc": "In this tutorial, you’ll learn about the Structured Query Language (SQL), the standard language used to query relational databases. SQL is not a traditional programming language. In Python or Java, you write step-by-step instructions that tell the co...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/an-animated-introduction-to-sql-learn-to-query-relational-databases.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
