---
lang: en-US
title: "Chapter 4: Database Design"
description: "Article(s) > (5/12) How to Design Structured Database Systems Using SQL [Full Book]"
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
      content: "Article(s) > (5/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 4: Database Design"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/chapter-4-database-design.html
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
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-4-database-design"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

Now that you’ve learned about some existing database models and the technologies that support them, it's important to understand what database design means.

In short, [<FontIcon icon="fas fa-globe"/>database design](https://guides.visual-paradigm.com/navigating-the-three-levels-of-database-design-conceptual-logical-and-physical/) refers to a database’s creation. When you have a project involving data, the first order of business is to consider is whether you actually need a database. This typically depends on factors like requirements provided by a client.

If you need a database, its [<FontIcon icon="fas fa-globe"/>design](https://geeksforgeeks.org/dbms/database-design-in-dbms/) typically follows a series of stages. These stages start with the client's requirements, which determine what needs to be stored and how it needs to be stored. Then, the schema or structure that the data should follow once storage is planned. This allows you to further explore how to store and process the data computationally at a low level to optimize the most critical operations.

For example, in projects like product sales platforms, it may be more important to optimize operations related to product searches, while in others such as social networks, optimizing the writing of new posts may be more significant.

In addition to deciding the **structure** of the data, user requirements also help determine which data needs to be stored, as it's not always necessary to keep all available data in a database. Generally, only the data that might be retrieved or used in some operation is stored, although this strongly depends on the project's requirements and nature.

---

## Database Design Levels

When you’re developing a data project and working on designing the database, you can divide it into a series of stages or **design levels**. These are related to the level of abstraction with which you can view the implementation of the database. Think of them as steps to follow to achieve a functional database that meets user requirements which are also considered part of the database design.

Apart from these design levels, there is a distinction based on the area of the development they are oriented towards, usually distinguishing three areas in which the different design levels are classified.

- On one hand, there is the **analysis** of the client's needs and requirements, which determines what our information system must do.
- Then we have the **design** of the database itself, which provides a description of the solution, its practical implementation, and the software/hardware components that form it.
- Finally, we have the **technology** used for this implementation, where the tools, programs, and specific modules involved in the development are decided.

Now let’s look at the different design levels.

### 1. Analysis (Functional and Data Requirements)

This level is considered part of database design due to its influence on the other stages or levels. Here, information about the domain is first gathered, which can stem from clients, users, or any stakeholder with knowledge about the domain. The main goal is to obtain as much information as possible to then extract [<FontIcon icon="fas fa-globe"/>user requirements](https://qat.com/guide-writing-data-requirements/) from it. These are a series of axioms that determine what the system must do to function according to the client's needs.

These requirements can be of many types, all [<FontIcon icon="fas fa-globe"/>studied in depth](https://geeksforgeeks.org/software-engineering/software-engineering-classification-of-software-requirements/) in the field of software engineering. A significant feature about them is that they determine **what** the system must do, not **how** it should do it, although in certain systems there are requirements for correctness or security that might restrict how the system should perform certain actions.

For example, if we design a database for a [<FontIcon icon="fa-brands fa-wikipedia-w"/>critical system](https://en.wikipedia.org/wiki/Safety-critical_system) like a nuclear power plant, it’s very likely that some of those requirements will require the system to respond to certain critical queries within a short time frame for safety reasons.

### 2. Conceptual Design (High-Level ERD/UML)

Once the requirements that the system or database must meet are clear, the [**conceptual design**](/tutorialspoint.com/conceptual-database-design.md) is responsible for describing how the data will be organized within the database. This is always done according to the database model you’ve selected for the project, as using NoSQL is different from using a structured database.

To correctly understand this level, let’s consider a case where the database being used is relational/structured. At this level, the data is first described, along with their possible associated constraints, such as data types, attribute domains, and so on. Then, software engineering tools like an [<FontIcon icon="fas fa-globe"/>entity-relationship diagram](https://lucidchart.com/pages/er-diagrams) are used to describe the tables that comprise the database and their relationships. This helps us formalize the structure in which the data will be organized once the system is in production.

It’s important to remember that regardless of the tool used for this process (whether a diagram or any other representation method), the organization depicted in the diagram must later be translated into a software implementation, which heavily depends on the DBMS. Designing a **structured** database differs from designing a **graph-oriented** database, so you’ll need to select an appropriate tool at this level to represent the data organization.

So the main focus at this level, beyond understanding the requirements, is to organize how the information is stored according to the operations the system will support. You’ll also need to properly document the descriptions provided, whether with diagrams or other tools, so they are understandable later and can be implemented on a specific DBMS.

### 3. Logical Design (Relational Schema)

Assuming the database is **structured**, at this level, you’ll use the diagram you created in the previous level to implement the database schema on a DBMS. This means you define the tables that the database will have on the DBMS.

If you didn’t use a diagram in the previous level or the database is not structured, you’ll follow the same process – although instead of tables, you’ll use the appropriate structures, such as graphs. Ultimately, here the **entity-relationship** diagram is translated into a **relational** schema, as we will see later, which is responsible for representing the tables that exist in the database at the DBMS layer.

When dealing with tables (or the corresponding structure according to the database model you’re using), it’s easy to understand how the database is organizing the information. But this is only the **high-level** view, in that DBMSs show us how data is organized, since eventually everything has to be converted into **low-level** data structures and algorithms on files that work with information encoded in binary. In other words, although we see tables, internally the DBMS operates with other types of computational tools at a lower level, closer to the hardware, which do not necessarily have to resemble tables, graphs, key-value pairs, and so on.

This offers an advantage: when managing the database, you can do so by focusing on the tables it contains, without needing to worry about how the data is actually stored in memory (or how the data structures and algorithms used to implement the database operations are working).

In other words, the database, more specifically the DBMS, automatically translates [<FontIcon icon="fa-brands fa-youtube"/>table-level](https://youtu.be/KQKHzsypxh4?si=GQOSlhXHAbXu4NfK) management into the lowest level management, closer to the hardware, which is called [<FontIcon icon="fas fa-globe"/>logical-physical independence](https://geeksforgeeks.org/dbms/physical-and-logical-data-independence/). This allows us to manipulate the database by working directly with the tables, not with the content at the hardware level, which would complicate things.

Finally, at this level, you’ll often perform [<FontIcon icon="fas fa-globe"/>schema refinement](https://enter77.ius.edu/cjkimmer/schema-refinement/). This refers to restructuring the schema with tables to make certain operations more efficient, or to improve certain aspects of the implementation according to the requirements. We do this because, when translating from the previous level to the [<FontIcon icon="fa-brands fa-youtube"/>logical](https://youtu.be/Ex6wszg2XZ8?si=54NuziZRbPPyDe4B) one, you can modify certain design patterns to better use the tools provided by the DBMS, whether table-oriented or not.

### 4. Physical Design (Logical Indexes, Clustering, Partitions)

At this level, the DBMS automatically implements the schema we previously defined at the level closest to the [<FontIcon icon="iconfont icon-ibm"/>hardware](https://ibm.com/docs/en/db2-for-zos/12.0.0?topic=relationships-physical-database-design). It translates the set of tables and associations we defined into specific [<FontIcon icon="iconfont icon-oracle"/>data structures](https://docs.oracle.com/cd/A84870_01/doc/server.816/a76994/physical.htm) like B-trees, indexes, and algorithms that support their operations. In essence, this level is the computational implementation of the DBMS, which manages disk memory or calls the operating system, among other details.

This implementation of our schema by the DBMS is automatic. We simply need to provide a definition based on the relational schema we created earlier, including the tables, associations between them, and the data we want to insert or delete.

With this, the DBMS translates these "relational" operations into low-level operations like assembly instructions. This helps us maintain [<FontIcon icon="fa-brands fa-youtube"/>logical-physical independence](https://youtu.be/IwOp4R5PzU0?si=4ovVsvfZjdnokYbe), as the DBMS implementation can be modified at any time without affecting our **relational schema** or its functionality. This lets us optimize the DBMS code without needing to rewrite all the "relational" programs that define the databases.

### 5. Storage Level (Block Formats, Disk Structures, and Access)

You can think of this level as a subset of the previous one, as it’s responsible for [<FontIcon icon="fas fa-globe"/>storing](https://geeksforgeeks.org/system-design/file-and-database-storage-systems-in-system-design/) data in secondary memory according to the relational schema managed by the DBMS. It performs the necessary requests to the operating system to allocate memory and usually manages information on the disk at the byte level.

For this purpose, it employs low-level techniques that determine how available disk memory will be used, including the implementation of disk structures and the formatting of memory blocks, among others.

### 6. Implementation of Applications and Security (Views, Permissions, Procedures)

Finally, once the database is built, you can design new layers on top of it where you can install applications and services that facilitate the interaction with the database. That is, you can simplify its operation for the end user, for example by developing a web application in HTML, CSS, and JavaScript to obtain the data in a friendly way, instead of with SQL code.

Some of these layers are also oriented to guarantee the [<FontIcon icon="iconfont icon-ibm"/>security](https://ibm.com/think/topics/data-security) of the data, establishing higher level access controls than the DBMS where the user must authenticate to access the data. You can also encrypt the data using some of the functionalities of these layers.
