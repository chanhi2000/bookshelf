---
lang: en-US
title: "Learn Relational Database Basics – Key Concepts for Beginners"
description: "Article(s) > Learn Relational Database Basics – Key Concepts for Beginners"
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
      content: "Article(s) > Learn Relational Database Basics – Key Concepts for Beginners"
    - property: og:description
      content: "Learn Relational Database Basics – Key Concepts for Beginners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-relational-database-basics-key-concepts-for-beginners.html
prev: /data-science/articles/README.md
date: 2025-01-14
isOriginal: false
author:
  - name: Zubair Idris Aweda
    url : https://freecodecamp.org/news/author/Zubs/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1736785487594/67bc81b6-1af8-46a0-8a7a-489896879828.png
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
  name="Learn Relational Database Basics – Key Concepts for Beginners"
  desc="In today’s digital world, data is everywhere, and it’s at the heart of most modern applications. Databases are the unsung heroes that keep it all organised and accessible. Many sites use databases, from social media platforms to online shopping retai..."
  url="https://freecodecamp.org/news/learn-relational-database-basics-key-concepts-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1736785487594/67bc81b6-1af8-46a0-8a7a-489896879828.png"/>

In today’s digital world, data is everywhere, and it’s at the heart of most modern applications. Databases are the unsung heroes that keep it all organised and accessible. Many sites use databases, from social media platforms to online shopping retailers.

But what exactly is a database, and how does it work? This article will give you a foundational understanding of core DB concepts like:

- What databases are
- Different database models
- Database Management Systems (DBMS)
- How Relational Database models work
- Basics of Structured Query Language (SQL)

Whether you’re a beginner or just looking to refresh your knowledge, this article will help you learn the essentials.

---

## What Is A Database?

A database is a collection of information – information that’s preferably related, and preferably organised. This means that a database can be in any form or shape. It could be a pile of paper records in an office, or a large Excel sheet, or on a computer (most likely in this day and age). But in the most basic terms, a database just helps you store data – so ultimately you can decide what it is.

In the digital world, a database consists of physical files on your computer, or in a cloud computer. These files are installed (or downloaded) when you set up the database software on your computer.

A database allows you to record, organise, manage, retrieve, and update that data efficiently. A database is usually structured, organised, and containing related information, otherwise it will just be a pile of random data.

The structure of a database consists of two main parts, the **data** and the **metadata**.

- **data** is the actual information stored in the database. So for example, a database of football players would contain information about players like their names, ages, clubs, and so on.
- **metadata** is the structural description of the data in a database. It describes the names of **fields** used to store data, the length of those fields (where applicable), and their **datatypes**. metadata gives structure and organisation to raw data.

---

## How to Update a Database

You can make changes to the different parts of a database using various commands. There are two general types of commands:

### Data Definition Language (DDL)

First, we have Data Definition Language, or DDL. It’s made up of commands that define or alter the shape or structure of the data in the database. These commands affect the metadata part of a database.

You might make alterations like creating new tables in a relational database, changing the shape of documents in a document-based database by adding new fields, or removing an entire graph in a graph database. DDL might define a field as a specific data type, for example, the "date" type, ensuring only valid dates can be entered.

### Data Manipulation Language (DML)

We also have Data Manipulation Language, or DML. It’s made up of commands that interact with the data stored in the database. These commands do not affect the structure of the data, but rather the data itself. These command only affect the data part of a database.

Some of the things you can do with DML include reading data from a database, adding new data to the database, editing data, and deleting data.

Applications like [<FontIcon icon="fas fa-globe"/>TablePlus](https://tableplus.com) let you see the data and the metadata in a database. For example, the data and metadata parts of a football application might look like the images below, respectively:

![database data](https://cdn.hashnode.com/res/hashnode/image/upload/v1735566678439/3f33f183-ebe5-40a3-98d1-d8462dab9dbb.png)

![database metadata](https://cdn.hashnode.com/res/hashnode/image/upload/v1735566701148/894a87f3-3bc7-43d9-908a-dbb2e92710c3.png)

A **datatype** defines what type of information can be stored in a field. Datatypes help computers understand how to store, process, and use data efficiently.

So a field in a table with a datatype of `date` will only be able to store date records, and will throw an error if you try to store something else, like a name. The same goes for a field with a `number` datatype – it will only accept numbers, and can be set to accept values within a range or to a certain number of decimal points.

Common datatypes include `varchar` for data that might contain different characters (text + numbers), `date` for date values, `int` for whole numbers, and so on. You can find other common database datatypes [<FontIcon icon="fas fa-globe"/>here](https://teachcomputerscience.com/database-data-types/).

<SiteInfo
  name="Database Data Types | Computer Science"
  desc="A database data type refers to the format of data storage that can hold a distinct type or range of values.Read more of the theory on Database data types or sign up to download our GCSE Computer Science resources today."
  url="https://teachcomputerscience.com/database-data-types/"
  logo="https://cdn-ilcffnh.nitrocdn.com/DVKboHyfbHExUdSsZwGLQZVyAFkHRoMi/assets/images/optimized/rev-99a0723/teachcomputerscience.com/wp-content/uploads/2019/07/cropped-logo-192x192.png"
  preview="https://teachcomputerscience.com/wp-content/uploads/2019/08/032-data.png"/>

---

## What Is a Database Model?

A database model is a concept used to describe the information stored on a database. Think of it as a building’s blueprint designed by an architect. It details all the tables, columns, and datatypes of the database. But it, in itself, is not a physical entity like the database. A database model determines how data is logically represented and accessed.

Database models define if data is stored in tables using rows and columns, or in JSON-like objects. They also define how data relates, how you can query it, and how you manage it. Database models are often chosen (and often developed) to suit specific data/application needs.

### Popular database models

::: tabs

@tab:active Relational Model

The Relational Model is the most popular database model. This model uses tables with rows and columns to store data. This model uses the SQL language to manage the data.

Examples of some relational databases include MySQL, PostgreSQL, and SQLite. This model is popularly used for general-purpose applications that require structured, and often related, data and complex queries. The rest of the article will focus on this model.

@tab Document Model

Data is stored as documents, often in JSON or XML format, in this model. Databases like MongoDB and CouchDB use this model. Document DBs promote flexibility with their JSON-like structures, and they’re commonly used in applications dealing with semi-structured data or hierarchical data, where flexibility is key.

@tab Key-Value Model

In this model, data is stored as simple key-value pairs, like in a map in programming. This model is used by Redis and DynamoDB. Due to the simplicity of this model, it is used in high-performance scenarios for simple lookups or caching.

@tab Graph Model

this model uses nodes (entities) and edges (relationships) to manage data. Neo4j and Amazon Neptune are examples of databases using this model. The shape of the nodes and edges in the graph model make it a common choice in applications involving relationships or connections between data points.

:::

There are many more database models. You can find and study them [<FontIcon icon="fas fa-globe"/>here](https://lucidchart.com/pages/database-diagram/database-models) if you’d like more info.

<SiteInfo
  name="What is a Database Model"
  desc="In-depth explanation and comparison of all the major database models, with examples, definitions, and more."
  url="https://lucidchart.com/pages/database-diagram/database-models/"
  logo="https://cdn-cashy-static-assets.lucidchart.com/marketing/images/Lucidchart_favicon_full_96x96.png"
  preview="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/seo/database/discovery/feature2.svg"/>

---

## How Do Relational Databases Work?

::: info <FontIcon icon="iconfont icon-gcp"/>Google

A relational database has the ability to establish links – or relationships – between information by joining tables, which makes it easy to understand and gain insights about the relationship between various data points.

<SiteInfo
  name="What Is A Relational Database (RDBMS)? | Google Cloud"
  desc="Learn how relational databases work, the benefits of using one to store your organizational data, and how they compare to non-relational databases."
  url="/learn/what-is-a-relational-database/"
  logo="https://gstatic.com/devrel-devsite/prod/v0d244f667a3683225cca86d0ecf9b9b81b1e734e55a030bdcd3f3094b835c987/cloud/images/favicons/onecloud/favicon.ico"
  preview="https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"/>

:::

The relational database model was developed as an improvement to an older database model, the Hierarchical Database model. Relational databases build on it and improve some of its restrictions and relationships. The tables in a relational DB model are often called **relations**.

Each row in a database table represents a single **record** in the table. The row tells the full story of the data. It contains data for all the columns in that table for one specific entity.

For example, in a table storing information about football players, each row represents one player and will include player details like name, age, country, and so on. Rows are also sometimes referred to as **records** or **tuples** in database terminology.

Each column lists an attribute of the record in question, such as name, age, or country. The column only tells a small part of the story. Each column has a name and a datatype, and it applies to all rows in the table. These columns could also have constraints in addition to their datatypes. These constraints could be as simple as the ***NOT NULL*** constraint that says that the column can not be empty on any row, or as complex as you define it.

For example, in a table of football players, columns might include “name”, “age”, and “country”. All rows in the table will have values under these columns for their respective attributes. In some contexts, **columns** are also referred to as **fields**.

The “relational” part of the name Relational Databases is often attributed to the fact that this model focuses on how data relates with other data, and how tables relate to each other. For example, tables can be linked (related) together. Tables can also be independent.

Despite this flexibility with relationships, the data in a table can be accessed directly without having knowledge of related or unrelated tables. You can easily access **records** as long as you know what you’re looking for. **Primary** and **Foreign** keys are used in the relational model to manage these relationships.

---

## What Is a DataBase Management System (DBMS)?

A DataBase Management System (DBMS) is a collection of programs for managing and communicating with an underlying database engine. In simpler terms, a DBMS is the database engine coupled with whatever additional tools that come with it.

A DBMS helps you create, manage, and use databases. It provides an abstraction over the database engine and lets you more easily store, update, and retrieve data in a secure way.

The tools that come in a DBMS can include, but are not always limited to:

- frontend tools (like a query interface, or an administration panel) that help you run queries and visualise the resulting data in the database
- backup and recovery tools that work in the background with little to no user interaction
- security tools for user access management (roles and permissions)
- and data import or export tools.

And as you would imagine, DBMS are usually model-specific, so there are DBMS focused on the Relational Database Model called RDBMS, where the **“R”** is for Relational. Examples of popular RDBMS include MySQL, PostgreSQL, Oracle, and Microsoft SQL Server. RDBMS use **SQL** (Structured Query Language) to interact with the data.

---

## SQL Basics

::: info <FontIcon icon="fa-brands fa-amazon"/>Amazon

Structured query language (SQL) is a programming language for storing and processing information in a relational database. You can use SQL statements to store, update, remove, search, and retrieve information from a database. You can also use SQL to maintain and optimise database performance.

<SiteInfo
  name="What is SQL? - Structured Query Language (SQL) Explained - AWS"
  desc="What is SQL how and why businesses use SQL, and how to use SQL with AWS."
  url="https://aws.amazon.com/what-is/sql/"
  logo="https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico"
  preview="https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png"/>

:::

It serves as the primary interface for interacting with databases, allowing users to perform various operations such as creating, modifying, querying, and deleting data and database structures. It’s the base upon which RDBMS like MySQL, PostgreSQL, and SQLite are built, with their own optimisations and extensions.

In this section, we’ll take a look at some basic SQL commands, with practical examples.

### DDL Commands

#### 1. `CREATE`

This is the SQL command used to create and define new database objects. It's a part of the **Data Definition Language (DDL)**, and its primary function is to establish the structure or schema of the database.

You can use this command to do the following (amongst many other uses):

- Create new databases
- Create new tables
- Create a new index in a table
- Create views
- Create a user with specific access rights

`CREATE` is most commonly used however to create a table in a database, or to create the database itself (although you usually do this using the GUI options the RDBMS provides).

This command has the following structure:

```sql
CREATE OBJECT_TYPE object_name (optional_further_arguments)
```

The `ENTITY_TYPE` is a placeholder and could be `DATABASE`, `TABLE`, `VIEW`, and so on from the list of database objects. The `entity_name` defines the name for the object being created. And finally, the `optional_further_arguments` is used to show that some of the objects only need a name to be created, while others like tables need more context about the columns of the table.

So based on our example of a football application, creating the `football_db` database above would involve first creating the database, like this:

```sql
CREATE DATABASE football_db;
```

![`CREATE DATABASE`](https://cdn.hashnode.com/res/hashnode/image/upload/v1736520482758/7231e225-2dcc-407a-95b4-0684eca078d6.png)

This command creates a new database with the provided name, `football_db`. Next up, using the `CREATE` command followed by the object type `TABLE`, you can create a `players` table, like this:

```sql
CREATE TABLE `players` (
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `age` int NOT NULL,
    `country` varchar(100) NOT NULL,
    `level` enum('Academy', 'Amateur', 'SemiPro', 'Professional') NOT NULL,
    `position` enum('Goalkeeper', 'Defender', 'Midfielder', 'Striker') NOT NULL,
    `foot` varchar(6) NOT NULL,
    `club` varchar(100) NOT NULL,
    `scores` json NOT NULL,
    `jerseyNumber` int NOT NULL
);
```

![CREATE players TABLE](https://cdn.hashnode.com/res/hashnode/image/upload/v1736522720503/57b09674-8058-4d86-80ea-4d942276bba0.png)

The command creates a table called `players`, and defines the columns (`id`, `name`, `age`, `country`, `level`, `position`, `foot`, `club`, `scores`, `jerseyNumber`) with their datatypes (`int`, `varchar`, `enum`, `json`). It also defines their constraints (`PRIMARY KEY`, `AUTO_INCREMENT`, `NOT NULL`).

#### 2. `ALTER`

This command modifies the structure of an existing table. This command is versatile and allows for a wide range of table modifications. These include adding, removing, modifying, and renaming columns, and managing constraints and indexes.

To add a new `height` column to the newly created `players` table, you can use the `ALTER` command like this:

```sql
ALTER TABLE players
ADD height INT NOT NULL;
```

![ALTER players TABLE](https://cdn.hashnode.com/res/hashnode/image/upload/v1736523536743/e45d03ec-af8c-463f-ac2c-e34e36939ea1.png)

The command runs successfully and the new column, defined as an integer column, gets added.

#### 3. `DROP`

This command deletes an existing table or database. When you use the `DROP` command, it completely removes the object from the database, and this action is irreversible. You can use us to remove databases, tables, and indexes.

If you ever stop using the `players` table, you can easily delete it using the `DROP` command like this:

```sql
DROP TABLE players;
```

#### 4. `TRUNCATE`

This command removes all data from a table while preserving its structure. This same result can be achieved using the `DELETE` DML command.

### DML Commands

These DML commands are foundational for **CRUD operations**, which stand for **Create, Read, Update, and Delete** – the basic actions you perform with data in a database.

#### 1. `INSERT`

Adds a new record to the database. This is the Create part of CRUD.

The command has the structure like this:

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

The `INSERT INTO` is the first part of the query, it is mandatory and followed by the name of the table to insert into. The name of the table to insert into is represented by the `table_name` placeholder. The name can then be followed by a list of columns to populate, or the `VALUES` keyword. In case when the columns to populate are listed, the list of values has to have the same length as the length of the columns provided, as each entry in both lists will be mapped. In case when the columns to populate are not listed, the items in the values list are mapped to the database columns, and every column will have to be provided. The command also allows for the insertion of multiple records at the same time, following same rules as singe insertions, just with comma-separated multiple lists of values to insert.

To add a few players to the `players` table to achieve a similar result as in the first screenshot, you can use a couple of insert commands like this:

```sql
INSERT INTO
    `players` (`id`, `name`, `age`, `country`, `level`, `position`, `foot`, `club`, `scores`, `jerseyNumber`, `height`)
VALUES
    (1, 'Christiano Ronaldo', 36, 'Portugal', 'Professional', 'Striker', 'Right', 'Manchester United', '\"4, 3, 5, 2, 4\"', 7, 187),
    (2, 'Alisson Becker', 31, 'Brazil', 'Professional', 'Goalkeeper', 'Right', 'Liverpool', '\"5, 6, 7, 8, 9\"', 1, 193),
    (3, 'John Stones', 30, 'England', 'Professional', 'Defender', 'Right', 'Manchester City', '\"4, 5, 6, 7, 8\"', 5, 188),
    (4, 'Kevin DeBruyne', 33, 'Belgium', 'Professional', 'Midfielder', 'Right', 'Manchester City', '\"9, 8, 7, 6, 5\"', 17, 181),
    (5, 'Erling Haaland', 24, 'Norway', 'Professional', 'Striker', 'Right', 'Manchester City', '\"10, 9, 8, 7, 6\"', 9, 194),
    (6, 'Chris Waddle', 20, 'England', 'SemiPro', 'Midfielder', 'Left', 'Tow Law Town', '\"3, 4, 5, 6, 7\"', 11, 183),
    (7, 'Ian Wright', 25, 'England', 'SemiPro', 'Striker', 'Right', 'Greenwich Borough', '\"4, 5, 6, 7, 8\"', 8, 175),
    (8, 'Charlie Austin', 34, 'England', 'SemiPro', 'Striker', 'Right', 'Poole Town', '\"5, 6, 7, 8, 9\"', 9, 188),
    (9, 'Troy Deeney', 33, 'England', 'SemiPro', 'Striker', 'Right', 'Chelmsley Town', '\"6, 7, 8, 9, 10\"', 9, 183),
    (10, 'Rickie Lambert', 39, 'England', 'SemiPro', 'Striker', 'Right', 'Macclesfield Town', '\"7, 8, 9, 10, 11\"', 9, 187);
```

![INSERT INTO players TABLE](https://cdn.hashnode.com/res/hashnode/image/upload/v1736525270444/ce1739aa-7fef-48d0-b61a-6cee1267ab1a.png)

#### 2. `SELECT`

The `SELECT` command has the basic syntax:

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

The command has the following parts:

- `SELECT` is the mandatory keyword that begins every query,
- `column1, column2, …` is a placeholder for the list of columns to be retrieved. This is especially useful when dealing with large tables as you do not always want to display all columns every time. To display all columns, replace the list with the `*` character.
- `FROM` is another mandatory keyword that is followed by the name of the table to fetch the data from,
- `table_name` is the name of the table the data should come from.
- `WHERE condition` is one of the optional commands that can be attached to the `SELECT` command. It is used to filter the records by specific conditions.

This is the Read part of CRUD. The simplest form of the `SELECT` command is used to view all records in a table (all columns and rows):

```sql
SELECT * FROM players;
```

![SELECT ALL players](https://cdn.hashnode.com/res/hashnode/image/upload/v1736526168218/a8b4c51c-afb6-4228-885b-2620bd99cf93.png)

#### 3. `UPDATE`

The `UPDATE` command modifies existing records in the database. This is the Update part of CRUD.

To update the details of Christiano Ronaldo to be more accurate, you can use the `UPDATE` command like this:

```sql
UPDATE `players`
SET
    `name` = 'Cristiano Ronaldo',
    `age` = 38,
    `club` = 'Al Nassr'
WHERE
    `id` = 1;
```

![UPDATE player record](https://cdn.hashnode.com/res/hashnode/image/upload/v1736526962015/55dd1f1d-a755-40fe-90d2-9975b8df7ba1.png)

This command changes his name slightly, his club from Manchester United to his current club of Al Nassr, and updates his age to 38. #### 4. `DELETE`

The `DELETE` command removes records from the database. This is the Delete part of CRUD.

It is syntactically similar to the `SELECT` command, having a basic syntax like this:

```sql
DELETE FROM table_name
WHERE condition;
```

In this structure,

- The `DELETE FROM` keyword is the mandatory start of any delete queries,
- It is followed by the name of the table to be deleted, represented by the `table_name`.
- The `WHERE condtion` is optional where all the rows of the table are to be deleted. But otherwise, it is used to specify the rows to be deleted by matching a condition.

To remove players not playing at the professional level from the table, you can use a command like this:

```sql
DELETE FROM `players`
WHERE `level` != 'Professional';
```

These are the basic commands you’ll use to interact with databases. You can learn more about them [**in this SQL command cheatsheet**](/freecodecamp.org/learn-sql-in-10-minutes.md).

---

## Summary

Databases are a cornerstone of modern technology, and understanding their fundamental concepts can open doors to building and managing efficient, data-driven systems.

This article introduced you to the basics of what a database is and how relational database models work. You should now have the essential knowledge to navigate the world of databases confidently.

To deepen your understanding, consider exploring the following:

- **Hands-On Practice**: Use tools like [<FontIcon icon="fas fa-globe"/>TablePlus](https://tableplus.com/) to interact with relational databases.
- **Learning SQL**: Start with beginner-friendly SQL tutorials like [**this course on freeCodeCamp’s YouTube channel**](/freecodecamp.org/learn-sql-full-course.md) or [**this SQL command cheatsheet**](/freecodecamp.org/learn-sql-in-10-minutes.md).
- **Experiment with Non-Relational Databases**: Try [**MongoDB**](/freecodecamp.org/how-to-start-using-mongodb.md) or [**Neo4j**](/freecodecamp.org/learn-neo4j-database-course.md) to explore how other database models work.

If you’re curious to learn more, connect with me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`idris-aweda-zubair-5433121a3`)](https://linkedin.com/in/idris-aweda-zubair-5433121a3/), [X (<FontIcon icon="fa-brands fa-x-twitter"/>`AwedaIdris`)](https://x.com/AwedaIdris), or [GitHub (<FontIcon icon="iconfont icon-github"/>`Zubs`)](https://github.com/Zubs). Let’s continue this journey together toward mastering database systems!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Relational Database Basics – Key Concepts for Beginners",
  "desc": "In today’s digital world, data is everywhere, and it’s at the heart of most modern applications. Databases are the unsung heroes that keep it all organised and accessible. Many sites use databases, from social media platforms to online shopping retai...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-relational-database-basics-key-concepts-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
