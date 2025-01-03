---
lang: en-US
title: "How to Perform a Migration"
description: Article(s) > (12/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cs
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: Article(s) > (12/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
    - property: og:description
      content: "How to Perform a Migration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-perform-a-migration.html
date: 2024-12-03
isOriginal: false
author:
  - name: Isaiah Clifford Opoku
    url: https://freecodecamp.org/news/author/Clifftech/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Create a Minimal API in .NET Core – A Step By Step Handbook",
  "desc": "Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini...",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Minimal API in .NET Core – A Step By Step Handbook"
  desc="Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini..."
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-how-to-perform-a-migration"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

Migrations allow you to update the database schema based on changes made to your model classes. In Entity Framework Core, you can use the `dotnet ef migrations add` command to create a new migration reflecting these changes.

To perform a migration, run the following command in the terminal:

```sh
dotnet ef migrations add InitialCreate
```

If the command is successful, you should see an output similar to this:

```sh
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
```

You will now see a new folder called `Migrations` in your project. This folder contains the migration files that were created based on the changes made to your model classes. These migration files include the SQL commands required to update the database schema.

---

## How to Update the Database

After creating the migration, you need to apply the migration to update the database schema. You can use the `dotnet ef database update` command to apply the migration and update the database. Make sure the SQL Server is running.

Run the following command in the terminal:

```sh
dotnet ef database update
```

This will update the database schema based on the changes made to your model classes. Make sure there are no errors on your database connection string.