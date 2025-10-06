---
lang: en-US
title: "Chapter 2: What is a Database?"
description: "Article(s) > (3/12) How to Design Structured Database Systems Using SQL [Full Book]"
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
      content: "Article(s) > (3/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 2: What is a Database?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-design-structured-database-systems-using-sql-full-book/chapter-2-what-is-a-database.html
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
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-2-what-is-a-database"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

Once you learn about the main functions a database needs to provide, you can understand its advantages and why it exists - especially when compared to trying to implement these functions without a database. To help illustrate this, we’ll start by analyzing a case where we try to solve a problem involving data without a database. This will show the problems that can arise and how they are resolved.

---

## Storing Data Without a Database

In terms of data **storage**, the raw data could be stored directly in binary files in secondary memory. For **analysis**, we can implement a software "layer" which we can label "processing layer". It contains programs that manipulate the stored data by accessing it and performing transformations based on implemented logic. And to facilitate data manipulation by users, there can be a **graphical interface** component that simplifies the use of these programs.

A practical example will illustrate this better. Suppose we are working with a domain that contains data about people and their financial information. Our objective is to analyze this data and make economic predictions. This data may originate from government sources, surveys, or other information systems. So we’ll need to store it in our system as binary files.

But we’re faced with a couple problems: first, we need to choose the optimal file type. Then we need to choose the best way to represent the data in the file to minimize problems in future stages when designing programs for access and analysis.

For example, storing the data in a **sequential file**, where the data is stored contiguously, is different from storing it in an **indexed file**, where the information is organized by an [<VPIcon icon="fas fa-globe"/>index](https://geeksforgeeks.org/dbms/indexing-in-databases-set-1/). In other words, there’s an index that organizes the data by name, so all people whose names (or a similar characteristic) begin with the same letter are stored contiguously in the same block, separated from the remaining letters. This recursive principle continues for the subsequent letters of the name. It's as if the data were sorted alphabetically, though generally, a single level of recursion is enough.

**Let’s look at an example:** In a sequential file, people's names are stored in a "disorganized" way, which requires us to search through the entire file to retrieve a specific person's record. In contrast, an indexed file sorts people alphabetically by name. By consulting the index, we can determine where names beginning with a certain letter start, thus avoiding the need to look through the entire file. In other words, the index is similar to the table of contents in a book, which tells us on which page each chapter begins.

This type of decision affects how efficient searches and queries on data are, as well as its processing. Each file type has its own advantages and disadvantages, as you might expect.

Similarly, there is a wide variety of decisions we can consider when designing programs to access and operate on the data. These are directly influenced by the previous decisions. For example, if we change the file type, the software of these programs will most likely need to be reprogrammed. You can think of these programs as Python scripts that automate certain analysis processes.

Also, when we’re implementing these programs, we need to account for details such as **concurrent** access to data, which is difficult to implement from scratch, as well as other security features, such as data encryption, compression, and detecting erroneous or incomplete data. These features are essential to providing a good analysis service, but they are difficult to program and maintain.

In short, without a database, it’s possible to solve the problem of storing and analyzing data - but implementing all the software is potentially quite complicated, especially if we aim to do so from scratch. If we have the right resources, it may be possible to complete this process and end up with a sufficiently efficient system. But in most cases, using a database is more convenient.

---

## Storing Data Using a Database

One way to simplify these processes is to use a database, which is an **organized collection** of data that models a **domain** and provides storage and analytical support for the processes we need to apply to the data. Without a database, data had to be stored in "single files" - but using a database, it’s stored according to a model that defines the type of information and its internal relationships. This is why the definition uses the term "organized."

As for the term "collection," it refers to the idea that a database is a set of data from the same [<VPIcon icon="fa-brands fa-wikipedia-w"/>domain](https://en.wikipedia.org/wiki/Domain_(software_engineering)). Here, by "domain" we mean the problem we are dealing with, for which we need to store and analyze data. In our example above, the domain would be the "universe" of people and all the tax concepts associated with them - that is, the set of concepts and information from the real environment that may be relevant to solve a problem using those data.

The advantages of a database extend beyond just storage. They also include the **normalization** of storage and organization, allowing for efficient **queries** on the stored data. These queries form the basic operations of any analysis process (querying). They’re also the fundamental support for other tasks such as the technical maintenance of the information system, data management, or even features like the system's scalability.

---

## DMBS (Database Management Systems)

Data management involves a series of additional functionalities that are provided by a component on which the vast majority of databases are currently based: the [<VPIcon icon="iconfont icon-ibm"/>DBMS (Database Management System)](https://ibm.com/docs/en/zos-basic-skills?topic=zos-what-is-database-management-system). As its name suggests, this component is a software element responsible for centrally and efficiently managing the entire life cycle of stored data.

In this context, management refers primarily to the storage, extraction, modification, deletion, and search of data. These are the fundamental operations necessary for a database to be considered operational.

But management also involves additional functionalities that are useful in a database:

- **Centralization:** Storing all the data in one system avoids having information scattered across many files, which may lead to unnecessary duplication of information, such as data references or the data itself. If the information system is not designed and implemented correctly, this can lead to inconsistencies and errors. But this is not a concern if we use a database.
- **Data integrity and security:** The management system controls who can access the data through access controls and permissions for different database users. It also ensures data integrity, a topic we will discuss later.
- **Concurrent access and sharing:** Information systems typically support applications used by many users simultaneously, which causes synchronization issues handled automatically by the DBMS. Fortunately, this means we don't have to implement specific logic in our database to ensure concurrent access to data by many users.

Finally, another feature of DBMSs is that they streamline the development and maintenance of information systems built using databases, especially those that rely on a DBMS. There are many different DBMS software programs, such as MySQL, MariaDB, PostgreSQL, MongoDB, and Neo4j, among others. Here, we will focus on PostgreSQL.

---

## ACID Properties and Transactional DBMS

Beyond the basic operations we’ve discussed, it's important to highlight the significance of transactional support in modern DBMSs for applications such as banking, online invoicing, and healthcare.

In these areas, it’s usually essential that any modification or query of the data follow a [<VPIcon icon="iconfont icon-gcp"/>transaction](https://cloud.google.com/learn/what-are-transactional-databases) mechanism. In other words, the operations performed on the database must be composed of a block of low-level instructions (reads and writes), and the manager must ensure that these operations are executed as a whole or not at all. This is often called an atomic operation.

This helps prevent technical failures from causing inconsistencies in databases (or similar problems). For example, if a user sends money via internet and an error occurs, the entire transaction is canceled, as if it had never occurred. This protects the database from remaining in an **inconsistent** state, such as when one party has sent money, but the other has not received it. So the DBMS is responsible for ensuring this atomicity in database operations, which requires it to fulfill the [**ACID properties**](/freecodecamp.org/acid-databases-explained.md). They are:

### 1. Atomicity

A transaction operates under the "all or nothing" principle, meaning that either all of its low-level instructions are completed, or none of them are executed.

::: tip Example

A bank transaction must be completed fully, not left in an intermediate state where one party sends the money and the other does not receive it.

:::

### 2. Consistency

Every transaction updates the database, ensuring it remains in a valid state and preserves data integrity.

::: tip Example

If a transaction changes a person's age, the final age can’t be negative.

:::

### 3. Isolation

Concurrent transactions should not interfere with each other in a way that produces inconsistent results.

::: tip Example

Two people try to book the last seat on a flight at the same time. Isolation ensures that only one booking succeeds and the seat isn't double-booked.

:::

### 4. Durability

Once a transaction has been completed, its effects are permanent. Even if the system fails, it must be ensured that the changes remain by writing them to persistent storage.

::: tip Example

If you transfer money between bank accounts and the system crashes right after, the transfer should still be reflected when the system comes back online.

:::

Finally, it’s important to understand that **not all** database management systems *(DBMSs)* need to be transactional, although many of them support such functionalities.

---

## Database Management System Architecture

After seeing what a DBMS is at a high level, we can examine how its functionalities are implemented in greater detail. We won’t look at the lowest possible level, but rather at the architectural level.

To better understand how a DBMS operates, we can focus on each of its component's roles when receiving a user request, whether it's a data modification, management operation, or data retrieval query.

Overall, each DBMS is unique, with components specific to its design and needs. Broadly speaking, though, they all share the following components:

- **Precompiler**: This component extracts and separates individual language statements embedded in applications based on the user query, which is usually in a language like SQL, before handing them off to the parser.
- **Parser**: Processes and validates the syntax of the user query, generating an intermediate parse tree.
- **Authorization Control**: Verifies the user's permissions to ensure that only authorized actions are performed.
- **Query Processor**: Converts the user query into a logical execution plan before optimizing it.
- **Integrity Checker**: Validates that the data meets all the constraints defined on the database while the query executes its statements.
- **Optimizer**: Analyzes and rewrites the execution plan to choose the most efficient execution strategy.
- **Executable Code Generation**: Transforms the optimized execution plan into specific calls to the storage engine API.
- **Transaction Manager**: Coordinates the start, commit, or rollback of transaction operations to ensure atomicity and isolation.
- **Log (Transaction Record)**: Sequentially records all modifications to ensure durability and recovery support.
- **Recovery Manager**: Uses the log to restore the database to a consistent state after failures.
- **Dictionary Manager (Catalog)**: Maintains and queries the metadata *(schemas, statistics, permissions)* of the database.
- **Data Manager**: Implements the physical storage data structures and the operations for accessing data.
- **I/O Processor**: Manages reading and writing of data to disk, that is, persistent memory.
- **Result Generator**: Formats and sends the result sets (queried data) to the user or the application layer.

Finally, although most databases rely on a DBMS, this is not always the case. For technical or performance reasons, implementing a custom database from scratch may work better for some teams than using a common DBMS-based solution. So a DBMS is not necessary for a database to exist, though it’s present in the vast majority of databases because of its inherent benefits.

