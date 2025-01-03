---
lang: en-US
title: "How to Add Seed Data to the Database"
description: Article(s) > (11/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
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
      content: Article(s) > (11/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
    - property: og:description
      content: "How to Add Seed Data to the Database"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-add-seed-data-to-the-database.html
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
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-how-to-add-seed-data-to-the-database"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

One more important step is to seed the database with initial data when the application starts. This seed data will populate the database, allowing you to test your API endpoints without manually adding data.

Let's add some seed data before performing migrations and testing our API endpoints.

To achieve this, we will create a new class in our Configuration folder called `BookTypeConfigurations` and add the following code:

```cs
using bookapi_minimal.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace bookapi_minimal.Configurations
{
    public class BookTypeConfigurations : IEntityTypeConfiguration<BookModel>
    {
        public void Configure(EntityTypeBuilder<BookModel> builder)
        {
            // Configure the table name
            builder.ToTable("Books");

            // Configure the primary key
            builder.HasKey(x => x.Id);

            // Configure properties
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Title).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Author).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Description).IsRequired().HasMaxLength(500);
            builder.Property(x => x.Category).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Language).IsRequired().HasMaxLength(50);
            builder.Property(x => x.TotalPages).IsRequired();

            // Seed data
            builder.HasData(
                new BookModel
                {
                    Id = Guid.NewGuid(),
                    Title = "The Alchemist",
                    Author = "Paulo Coelho",
                    Description = "The Alchemist follows the journey of an Andalusian shepherd",
                    Category = "Fiction",
                    Language = "English",
                    TotalPages = 208
                },
                new BookModel
                {
                    Id = Guid.NewGuid(),
                    Title = "To Kill a Mockingbird",
                    Author = "Harper Lee",
                    Description = "A novel about the serious issues of rape and racial inequality.",
                    Category = "Fiction",
                    Language = "English",
                    TotalPages = 281
                },
                new BookModel
                {
                    Id = Guid.NewGuid(),
                    Title = "1984",
                    Author = "George Orwell",
                    Description = "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism. ",
                  Category = "Fiction",
                  Language = "English",
                  TotalPages = 328
                } 
            );
        }
    }
}
```

Let's break down the code above:

In Entity Framework Core, you can use the `IEntityTypeConfiguration` interface to configure the entity type and seed data for the database. The `BookTypeConfigurations` class implements the `IEntityTypeConfiguration<BookModel>` interface and provides the configuration for the `BookModel` entity.

- **Configure Method**: This method is used to configure the `BookModel` entity type. It defines the table name, primary key, and properties for the `BookModel` entity.
  - **Table Name**: The `ToTable` method specifies the name of the table to be created in the database. In this case, the table name is set to "Books".
  - **Primary Key**: The `HasKey` method specifies the primary key for the `BookModel` entity. The primary key is set to the `Id` property.
  - **Properties**: The `Property` method configures the properties of the `BookModel` entity. It specifies the data type, length, and constraints for each property.
  - **Seed Data**: The `HasData` method seeds the database with initial data. It creates three `BookModel` objects with sample data for testing the API endpoints.

Now that we have created the `BookTypeConfigurations` class, we need to register this configuration in the `ApplicationContext` class. This ensures that the configuration is applied when the database is created or migrated.

We’re finally almost ready to test our API. But before we do that, we need to perform migrations to create the database and apply the seed data.

Remember that we added our database connection string in the <FontIcon icon="iconfont icon-json"/>`appsettings.json` file? Now let's perform a migration and later update our database for the migration to take effect.