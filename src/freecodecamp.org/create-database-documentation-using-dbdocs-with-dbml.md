---
lang: en-US
title: "How to Create Database Documentation Using dbdocs with DBML"
description: "Article(s) > How to Create Database Documentation Using dbdocs with DBML"
icon: fas fa-database
category:
  - Data Science
  - PostgresDB
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Database Documentation Using dbdocs with DBML"
    - property: og:description
      content: "How to Create Database Documentation Using dbdocs with DBML"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-database-documentation-using-dbdocs-with-dbml.html
prev: /data-science/articles/README.md
date: 2024-10-15
isOriginal: false
author: Truong-Phat Nguyen
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728620241328/79515009-0fa3-4fcd-a4ce-e1ec2d5609f8.png
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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgres/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create Database Documentation Using dbdocs with DBML"
  desc="Database documentation plays a crucial role in maintaining and scaling systems. Clear and well-organized documentation can significantly improve communication between team members and enhance project longevity. One of the most efficient ways to docum..."
  url="https://freecodecamp.org/news/create-database-documentation-using-dbdocs-with-dbml"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728620241328/79515009-0fa3-4fcd-a4ce-e1ec2d5609f8.png"/>

Database documentation plays a crucial role in maintaining and scaling systems. Clear and well-organized documentation can significantly improve communication between team members and enhance project longevity.

One of the most efficient ways to document a database is through [<FontIcon icon="fas fa-globe"/>dbdocs](https://dbdocs.io/) and [<FontIcon icon="fas fa-globe"/>DBML](https://dbml.dbdiagram.io/home) - an open sourced Database Markup Language.

In this guide, I’ll show you how to create database documentation using these tools, step by step.

---

## What is dbdocs?

[<FontIcon icon="fas fa-globe"/>dbdocs](https://dbdocs.io/) is a platform that generates database documentation from your schema, easily shareable via a link. Using [<FontIcon icon="fas fa-globe"/>DBML](https://dbml.dbdiagram.io/home) **(Database Markup Language)**, you can create clear, shareable, and updatable documentation of your database structure.

::: note Prerequisites

Before we begin, ensure you have the following:

- Basic knowledge of databases and SQL.
- A database schema to document (we’ll use a PostgreSQL example in this guide).

:::

---

## Step 1: Install DBML CLI and dbdocs

Start by installing the **DBML CLI**, which helps convert your database schema into a DBML format. You also need the **dbdocs CLI** to generate and publish your documentation.

```sh
npm install -g dbdocs
```

---

## Step 2: Export Your Database Schema to DBML

![DB diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1728615902517/20974a9d-729e-4b3a-997c-0b89e944a6cd.png)

If you’re working with an existing database, you can export the schema into DBML using the DBML CLI tool.

For PostgreSQL, run the following command:

```sh
dbdocs db2dbml postgres <connection-string> -o database.dbml
# 
# ✔ Connecting to database <db-name>... done.
# ✔ Generating DBML... done.
# ✔ Wrote to database.dbml
```

![Extract DBML code from database connection](https://cdn.hashnode.com/res/hashnode/image/upload/v1728615885904/9f68f18b-fa14-4e88-b58b-bd90d292ef31.gif)

This command will export your database schema and save it into a file called `database.dbml`.

Here’s an example of how a generated DBML file might look:

```dbml title="database.dbml"
Table users {
  id int [pk, increment]
  username varchar(50) [not null]
  email varchar(100) [not null, unique]
  created_at timestamp [not null]
}

Table orders {
  id int [pk, increment]
  user_id int [not null, ref: > users.id]
  total decimal [not null]
  created_at timestamp [not null]
}
```

**In this example:**

• The users and orders tables are defined.
• Fields are annotated with types and constraints.
• The relationship between `orders.user_id` and `users.id` is established using `ref`.

---

## Step 3: Edit and Add Notes to the DBML File

You may want to clean it up or add extra documentation like table descriptions and field descriptions to communicate with other members in the team.

![Add notes to generated DBML Code](https://cdn.hashnode.com/res/hashnode/image/upload/v1728615980279/8e1851a8-2e38-4ded-8b6a-c873d6b395b8.gif)

---

## Step 4: Generate Documentation with dbdocs

Once your DBML file is ready, the next step is to generate the documentation using dbdocs. First, you need to login to dbdocs:

```sh
dbdocs login
```

After logging in, publish the DBML file:

```sh
dbdocs build database.dbml
```

![Generate database documentation from DBML file](https://cdn.hashnode.com/res/hashnode/image/upload/v1728616039961/0ef67db3-8a86-495a-b42f-3fad0fead933.gif)

This command will generate a shareable documentation link that you can access via the dbdocs platform. You can also set access permissions and collaborate with your team.

This seamless workflow ensures that your documentation always reflects the latest state of your database.

---

## Benefits of Using dbdocs with DBML

- **Simplicity**: The [<FontIcon icon="fas fa-globe"/>DBML](https://dbml.dbdiagram.io/home) syntax is simple and easy to learn, making it a perfect fit for teams.
- **Automation**: You can [<FontIcon icon="fas fa-globe"/>automate your database documentation updates](https://docs.dbdocs.io/features/generate-dbml-from-db) as part of your [<FontIcon icon="fas fa-globe"/>CI/CD pipeline](https://docs.dbdocs.io/features/ci-integration).
- **Collaboration**: Easily [<FontIcon icon="fas fa-globe"/>share documentation links](https://docs.dbdocs.io/features/project-access-control) with your team or stakeholders for easy access and discussion.
- **Version Control:** Use [<FontIcon icon="fas fa-globe"/>schema changelog](https://docs.dbdocs.io/features/schema-changelog) to track database schema changes over time.
- **Visualization**: dbdocs provides a clean interface to visualize your database schema, relationships, and annotations. [<FontIcon icon="fas fa-globe"/>Try this demo](https://dbdocs.io/Holistics/Ecommerce) to learn more.

---

## Conclusion

In this tutorial, we explored how to export a database schema, customize it, and generate shareable documentation using dbdocs.

By incorporating this workflow into your development process, you’ll improve your team’s collaboration, enhance your project’s scalability, and ensure that everyone stays on the same page. Happy documenting!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Database Documentation Using dbdocs with DBML",
  "desc": "Database documentation plays a crucial role in maintaining and scaling systems. Clear and well-organized documentation can significantly improve communication between team members and enhance project longevity. One of the most efficient ways to docum...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-database-documentation-using-dbdocs-with-dbml.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
