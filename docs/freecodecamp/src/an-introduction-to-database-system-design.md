---
lang: en-US
title: "An Introduction to Database System Design"
description: "Article(s) > An Introduction to Database System Design"
icon: iconfont icon-postgresql
category:
  - Data Science
  - PostgreSQL
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - sql
  - postgres
  - postgresql
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > An Introduction to Database System Design"
    - property: og:description
      content: "An Introduction to Database System Design"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/an-introduction-to-database-system-design.html
prev: /data-science/postgresql/articles/README.md
date: 2026-03-26
isOriginal: false
author:
  - name: Olasunkanmi Emmanuel Jesuferanmi
    url: https://freecodecamp.org/news/author/feranmi888/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e0c4195f-9f09-45f4-99d1-977c02731b02.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="An Introduction to Database System Design"
  desc="These days, businesses and startups rely on well-designed databases to manage vast amounts of data. In domains like Healthcare, E-commerce, and Fintech/Banking, a solid database design ensures data in"
  url="https://freecodecamp.org/news/an-introduction-to-database-system-design"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e0c4195f-9f09-45f4-99d1-977c02731b02.png"/>

These days, businesses and startups rely on well-designed databases to manage vast amounts of data. In domains like Healthcare, E-commerce, and Fintech/Banking, a solid database design ensures data integrity, security, and accessibility.

In this article, we'll talk about what it takes to design a highly-functional database using some key best practices.

This article is aimed at developers and those looking to start a career in managing Databases. We'll discuss what a database actually is, the components of a Database System, what we mean by database design, the stages of database design, and what's involved in Database System Design.

---

## Prerequisites and Setup

To get the most out of this guide, you should have the following foundational skills and tools ready. This will help ensure that you aren't just reading theory, but that you're actually building a functional system.

### 1. Foundational Knowledge

- **Data Types:** You should be able to distinguish between basic data formats. In database design, choosing the wrong type can lead to storage waste or application errors.
    
    - **Strings/Varchars:** Textual data (for example, "John Doe", "123 Main St").
        
    - **Integers:** Whole numbers used for math or unique IDs (for example, 10, 500).
        
    - **Floats/Decimals:** Numbers with decimal points, usually for currency (for example, 19.99).
        
    - **Booleans:** Simple True/False toggles (for example, `is_available`).
    - **Logical Thinking:** You should be comfortable identifying "entities." If you're building an app for a school, you'll need to recognize that "Students," "Teachers," and "Classrooms" are separate objects that must be linked via relationships.
- **Terminal/CLI Basics:** While we'll use visual tools, you should know how to open your Command Prompt (Windows) or Terminal (Mac/Linux) and understand that commands are often case-sensitive.

### 2. Software and Installation

We'll use **PostgreSQL** (the database engine) and **pgAdmin 4** (the visual management tool).

1. **Download:** Visit the [<VPIcon icon="iconfont icon-postgresql"/>official PostgreSQL Downloads page](https://postgresql.org/download/) and select the installer for your operating system.
2. **Installation Wizard:** Run the installer. When asked which components to include, make sure that PostgreSQL Server, pgAdmin 4, and Command Line Tools are all checked.
3. **The "Postgres" User:** During setup, you will be prompted to create a password for the default "postgres" superuser. **Note:** Write this password down. You can't easily reset it, and you'll need it to access your data.
4. **Port Selection:** The default port is `5432`. Keep this as the default unless you're an advanced user with a specific reason to change it.

### 3. Verifying Your Setup

Before moving to the practical section, let's verify that everything is installed correctly:

1. Open **pgAdmin 4** from your applications menu.
2. In the left-hand sidebar, click on **Servers**.
3. Enter the master password you created during installation.
4. If you see "PostgreSQL [Version Number]" appear with a green icon, your database environment is successfully configured.

---

## What is a Database?

A Database is a collection of structured data usually stored electronically in a computer. Databases are controlled and managed using a **Database Management System (DBMS).** Database Management Software is an application that constructs and maintain (and sometimes expands) Databases. Examples of DBMS are IBM's DB2, Oracle Corporation's Oracle, Microsoft Access, and Microsoft's SQL Server.

We use databases everyday, whether knowingly or unknowingly. And as a developer, you'll likely need to at least understand Database basics so you can effectively work with them.

It's also important for you to how to know how to design a scalable database, as well as be familiar with the environment in which the database will be housed (called, not surprisingly, a **Database Environment**). The hardware and operating system that house the database makes up this Database Environment.

### Components of a Database System

A Database System is a computerized record-keeping system designed to store, manage, and retrieve data efficiently. It acts as a centralized repository that allows multiple users to access and manipulate data simultaneously while ensuring the integrity, security, and persistence of that information over time.

A Database System consists of four basic components:

#### 1. Hardware

This includes the secondary storage where the database resides alongside other necessary components. Examples are Hard disks, Processors, RAM, and so on. Since a database can span from a single workstation to a global mainframe, hardware selection is a priority. Proper investment in processing power and storage is essential to handling the projected user load and data volume.

#### 2. Software

In this case, Database Management Software (DBMS) is in charge of the maintenance and management of databases. It's robust software that acts as an intermediary, restricting users from the complex hardware-level details of data storage. The Software layer (DBMS) handles data storage, retrieval, and processing. Examples of DBMS are Microsoft's SQL Server, IBM's DB2, and Oracle.

#### 3. Data

Data serves as the bridge connecting the machine components (hardware and software) to the human users. In a database system, data is organized into two main types:

- **User Data:** The actual structured information stored in tables, made up of columns (attributes) and rows (records).
- **Metadata:** Often defined as "data about data," metadata is stored in system tables and describes the actual structure of the database, such as the number of tables, field names, and defined primary keys

#### 4. Users

These are the people who interact with the database to carry out their business responsibilities. Users generally fall into three distinct categories:

- **Database Administrators (DBAs):** Technical experts who hold central responsibility for the database. They monitor performance, define security and integrity checks, and establish backup and recovery strategies.
- **Database Designers/Programmers:** The engineers who actually write the code and use the DBMS to create the database's logical structure.
- **End Users:** The everyday people who access the database using query languages or simple menu-driven application interfaces

---

## Types of Database Systems

It's important to know that not all databases store data in the same way. The choice of database depends on the specific needs of the application. The primary types include:

### Hierarchical and Network Databases

These are older, legacy models. Hierarchical databases structure data in a tree-like, parent-child format where a child can only have one parent. Network databases improved on this by allowing a graph-like structure where records can have multiple parent and child relationships, making it easier to model complex associations.

### Relational Databases (RDBMS)

The most widely used type today. They organize data into structured tables consisting of rows and columns. These tables are linked using primary and foreign keys, and they use Structured Query Language (SQL) for operations. They are ideal for applications requiring strong consistency, like banking systems.

### Object-Oriented Databases (OODBMS)

These combine database capabilities with object-oriented programming principles (like Java or C++). Data is stored as "objects" that contain both the data and the methods (functions) that operate on it, making them great for complex data like multimedia or engineering designs.

### NoSQL Databases

Designed to handle large volumes of unstructured or semi-structured data. Unlike relational databases, they don't rely on rigid table structures and are highly scalable. Types of NoSQL include document stores (for example, MongoDB), key-value stores (for example, Redis), column-family stores, and graph databases.

### Cloud and Distributed Databases

Cloud databases are hosted on cloud platforms (like AWS or Microsoft Azure) and offer elasticity, scalability, and cost-efficiency (pay-as-you-go).

Distributed databases store data across multiple physical locations but function as a single unified system to the user, providing high availability and fault tolerance.

### Database System vs. Database Management System (DBMS)

People often use "Database" and "DBMS" interchangeably, but there is a distinct difference:

- **Database Management System (DBMS):** This is purely the *software* that helps users interact with the database. It handles data storage, retrieval, security, and concurrency control. Examples include MySQL, PostgreSQL, and Oracle DB.
- **Database System:** This is the *broader concept* that encompasses the entire setup. It includes the actual database (where data is stored), the DBMS software, the physical hardware, the network, and the users interacting with it.

---

## Characteristics of a Good Database

To make sure that your database design is successful, it should exhibit several core characteristics:

- **Data integrity and consistency:** Ensuring data is accurate, reliable, and uniform across the entire system.
- **Data security:** Protecting sensitive information from unauthorized access and potential breaches.
- **Scalability and performance:** The ability to handle increasing amounts of data and users efficiently while providing fast query processing.
- **Redundancy management (normalization):** Avoiding unnecessary duplication of data to save storage space and prevent errors during updates.
- **Concurrency control:** Allowing multiple users to access and modify data simultaneously without causing conflicts or data corruption.
- **Backup and recovery:** Supporting robust mechanisms to recover data in the event of hardware or system failures.

---

## Stages of Database Design

Database design is a structured process consisting of several stages to ensure that data is efficiently stored, accessed, and managed. There are four key stages in this process:

### Requirements Analysis

This is the foundational stage where designers gather and analyse the specific needs of users and the business. It involves identifying the overall purpose of the database, understanding data requirements, defining key entities and attributes, and establishing both functional and non-functional requirements.

### Conceptual Design

In this phase, a high-level visual blueprint of the database is created, which is independent of any specific software implementation. This makes it easy for non-technical stakeholders to understand.

Designers typically use [**Entity-Relationship (ER) models**](/freecodecamp.org/how-to-make-flowcharts-with-mermaid.md) or [**UML diagrams**](/freecodecamp.org/uml-diagrams-full-course.md) to identify entities, map out relationships, and define constraints like primary keys.

### Logical Design

This stage involves translating the conceptual blueprint into a logical model that aligns with a specific type of Database Management System (DBMS), such as a relational or NoSQL system.

Key steps include converting the ER diagram into relational schemas (tables and columns), defining foreign and primary keys, and normalising the database to remove anomalies and reduce data redundancy.

### Physical Design

The final stage translates the logical model into an actual physical structure optimized for high performance and efficient storage. Activities here include selecting the specific DBMS, establishing indexing strategies to speed up data retrieval, defining access paths, and configuring essential security policies and backup mechanisms.

---

## The Role of Normalisation in Database Design

When building a relational database, one of the most critical steps in the logical design phase is a process called **Normalisation**.

Normalisation is a systematic approach to organising data to minimise redundancy (duplicate data) and improve overall data integrity. Essentially, it involves taking large, clunky tables and decomposing them into smaller, more focused tables, then linking them together using defined relationships.

### Why is Normalisation Important?

A poorly designed database often suffers from errors that happen when you try to insert, update, or delete data. For example, if a teacher's phone number is stored in multiple places, updating it in one row but forgetting another creates an update anomaly. Normalisation solves this by ensuring each piece of information is stored in only one place.

The main objectives of normalisation are:

- **Eliminating redundancy:** By reducing duplicate data, you save valuable storage space and keep your data consistent.
- **Avoiding anomalies:** It prevents data corruption that arises during insertion, updating, or deletion.
- **Ensuring data integrity:** It maintains the accuracy and reliability of the data across the entire database.
- **Enhancing query performance:** Organising the data efficiently helps optimise how data is retrieved and updated.

### Stages of Normalisation

Normalisation happens in sequential stages known as **Normal Forms (NFs)**, where each stage builds upon the rules of the previous one to further refine the database structure.

For beginners, the first three forms are the most important to understand:

- **First Normal Form (1NF):** This stage ensures "atomicity". This means that every column in a table should hold a single, indivisible value, and duplicate columns are eliminated. For instance, you would not store two different phone numbers in a single "Phone" cell; you would separate them.
- **Second Normal Form (2NF):** To achieve 2NF, the table must first be in 1NF. Then, it ensures that all non-key attributes (the regular data columns) are fully dependent on the entire primary key. This often involves creating separate tables for distinct entities, like putting "Courses" into their own table rather than mixing them with "Student" details.
- **Third Normal Form (3NF):** A table in 3NF is already in 2NF and has removed all "transitive dependencies". This means that a non-key column shouldn't depend on another non-key column. For example, if a table has an "Instructor Name" and "Instructor Phone," those details should live in a dedicated "Instructor" table, not inside a "Course" table.
- **Boyce-Codd Normal Form (BCNF):** This is a stricter version of 3NF used to resolve any remaining, complex anomalies.

### Finding the Right Balance

While normalisation is crucial for maintaining data consistency, it's important to strike a balance. Minimising redundancy is great, but excessive normalisation creates dozens of tiny tables. When you need to retrieve a complete record, the database system has to piece all those tables back together (using complex queries called "joins"), which can slow down performance.

So the ultimate goal of a good database designer is to find the sweet spot between a highly normalised structure and efficient query performance.

---

## Practical: Designing a Library System

To move from theory to practice, let’s build a database for a small local library. We'll go through the design stages to ensure the data is structured efficiently.

### Step 1: Requirements & ER Diagram

First, we'll identify what our library needs to track. We have three main entities:

- **Authors:** The writers of the books.
- **Books:** The actual items available for loan.
- **Members:** The people who borrow the books.

**The Relationships:**

- One **Author** can write many **Books** (One-to-Many).
- One **Member** can borrow many **Books** (One-to-Many).

Here's the ER diagram I've created for this example:

![ER diagram](https://cdn.hashnode.com/uploads/covers/5f1de20cf4016901885ccc17/fde8b5a3-c546-4426-b5e3-9a6901c9553d.png)

### Step 2: Normalization in Action

To ensure our database is "well-designed" and free of redundancy, we'll apply the normalization rules discussed earlier. Instead of one giant spreadsheet, we split the data into three distinct tables:

1. **Authors Table:** \* `author_id` (Primary Key)
    - `author_name`
2. **Books Table:** \* `book_id` (Primary Key)
    - `title`
    - `isbn`
    - `author_id` (Foreign Key linking to the Authors table)
3. **Members Table:** \* `member_id` (Primary Key)
    - `first_name`
    - `last_name`
    - `email` (Unique constraint)

### Step 3: Implementation (SQL)

Now, let’s use the **PostgreSQL Query Tool** in pgAdmin 4 to actually create these tables and insert some dummy data.

```sql
-- 1. Create the Authors table
CREATE TABLE Authors (
    author_id SERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL
);

-- 2. Create the Books table with a relationship to Authors
CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    author_id INT REFERENCES Authors(author_id)
);

-- 3. Create the Members table
CREATE TABLE Members (
    member_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL
);

-- 4. Insert dummy data to test the design
INSERT INTO Authors (author_name) 
VALUES ('J.R.R. Tolkien'), ('George R.R. Martin');

INSERT INTO Books (title, isbn, author_id) 
VALUES ('The Hobbit', '978-0261102217', 1), 
       ('A Game of Thrones', '978-0553103540', 2);
```

#### Understanding the Schema Design:

By running the SQL script above, you’ve successfully transitioned from a logical design to a physical database. Here is a breakdown of the key concepts we applied:

- **Primary Keys (PK):** Using `SERIAL PRIMARY KEY` automatically creates a unique, incrementing ID for every new entry. This ensures no two authors or books are ever confused by the system.
- **Foreign Keys (FK):** The `REFERENCES Authors(author_id)` command is where the "Relational" part of a Relational Database happens. It tells the `Books` table that it must point to a valid ID in the `Authors` table, preventing "orphan" books without creators.
- **Constraints:** By using `UNIQUE` on the `isbn` and `email` columns, we've programmed the database to reject any duplicate data, ensuring high data integrity.

### How to Fetch Your Data

Now that the data is stored, you need to know how to get it back out. In SQL, we can do this using the `SELECT` statement.

#### 1. See Everything in a Table

To see all books currently in the library:

```sql
SELECT * FROM Books;
```

#### 2. Filtering Results

Often, you don't want every single row. You can use the `WHERE` clause to filter for specific data. For example, to find an author by their exact name:

```sql
SELECT * FROM Authors 
WHERE author_name = 'J.R.R. Tolkien';
```

#### 3. Joining Tables

In a normalized database, information is spread across tables. To see a list of book titles alongside their actual author names (instead of just an ID number), you use a `JOIN`.

```sql
SELECT Books.title, Authors.author_name
FROM Books
JOIN Authors ON Books.author_id = Authors.author_id;
```

The database is instructed by this query to "give the titles from the Books table and the names from the Authors table where the author_id matches in both." This enables you to effectively store data in distinct tables while viewing it as a single, comprehensive report.

This ability to link information across tables is what makes Relational Databases the industry standard for most business applications. But while the relational model is powerful, it isn't the only way to store data. Depending on whether you're handling social media connections, real-time sensor data, or simple document storage, you might need a different architectural approach.

---

## Conclusion

Designing a database is much more than simply throwing information into a computer. It's the process of building a robust, efficient, and secure foundation for decision-making and business operations.

As we have explored here, a successful database relies on a carefully orchestrated ecosystem of hardware, software (the DBMS), data, and users.

By following the four stages of design – Requirements Analysis, Conceptual Design, Logical Design, and Physical Design – you can avoid costly structural mistakes and ensure that your system perfectly aligns with user needs.

Applying critical techniques like normalisation during this process guarantees that your data remains consistent, accurate, and free from frustrating anomalies.

Also, as the digital landscape continues to evolve, mastering these foundational concepts is your stepping stone into the future. Traditional relational databases remain incredibly powerful, but modern data demands are rapidly driving the adoption of cloud-based, AI-powered, and serverless database systems.

A well-designed system today must not only focus on data integrity and query performance but also prioritise scalability and stringent data security to protect against modern cyber threats.

Whether you are building a simple address book or architecting a backend for the next big application, keeping these core principles of database system design in mind will empower you to create resilient, high-performing, and future-proof data solutions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Introduction to Database System Design",
  "desc": "These days, businesses and startups rely on well-designed databases to manage vast amounts of data. In domains like Healthcare, E-commerce, and Fintech/Banking, a solid database design ensures data in",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/an-introduction-to-database-system-design.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
