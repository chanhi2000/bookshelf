---
lang: ko-KR
title: "EF Core Migrations: A Detailed Guide"
description: "Article(s) > EF Core Migrations: A Detailed Guide"
icon: iconfont icon-csharp
category: 
  - C#
  - DotNet
  - Article(s)
tag: 
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > EF Core Migrations: A Detailed Guide"
    - property: og:description
      content: "EF Core Migrations: A Detailed Guide"
    - property: og:url
      content: https://chanhi2000.github.io/articles/milanjovanovic.tech/efcore-migrations-a-detailed-guide.html
prev: /programming/cs/articles/README.md
date: 2024-05-18
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_090.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="EF Core Migrations: A Detailed Guide"
  desc="In this newsletter, we'll break down the essentials of EF Migrations. We'll explore creating migrations, SQL scripts, applying migrations, migration tooling, and more."
  url="https://milanjovanovic.tech/blog/efcore-migrations-a-detailed-guide/"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_090.png"/>

Managing database schemas as your applications grow can quickly become a headache. Manual changes are error-prone and time-consuming. This can easily lead to inconsistencies between development and production environments. I've seen these issues firsthand on countless projects, and it's not pretty. How can we do better?

Enter Entity Framework (EF) Migrations, a powerful tool that lets you version your database schemas.

Imagine this: Instead of writing SQL scripts, you define your changes in code. Need to add a column? Rename a table? No problem - EF Migrations has you covered. It tracks every modification to the data model. You can review, test, and apply changes confidently, even across different environments.

In this newsletter, we'll break down the essentials of EF Migrations:

- **Creating Migrations**: Defining and generating migrations that capture your schema changes.
- **Migration SQL Scripts**: Understanding the SQL generated by your migrations and how to use it.
- **Applying Migrations**: Different ways to apply migrations to your database.
- **Migration Tools**: Exploring additional tools and frameworks for managing database migration.
- **EF Migration Best Practices:**: I'll share my recommendations from using EF for years.

We have many examples to cover, so let's dive in.

---

## Creating Migrations

If you're completely new to EF migrations, I recommend checking out the [<FontIcon icon="fa-brands fa-microsoft"/>EF migrations docs](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations) to grasp the fundamentals. Moving forward, I'll assume you have some prior knowledge of EF Core.

We'll need an entity and a database context before we can create migrations with EF.

Let's define a simple `Product` entity:

```cs
public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public decimal Price { get; set; }
}
```

We will also need a `DbContext` implementation, so let's define the `AppDbContext` class. In the `OnModelCreating` method, we're going to configure the `Product` entity.

```cs
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(builder =>
        {
            builder.ToTable("Products", tableBuilder =>
            {
                tableBuilder.HasCheckConstraint(
                    "CK_Price_NotNegative",
                    sql: $"{nameof(Product.Price)} > 0");
            });

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name).HasMaxLength(100);

            builder.Property(p => p.Description).HasMaxLength(1000);

            builder.Property(p => p.Price).HasPrecision(18, 2);

            builder.HasIndex(p => p.Name).IsUnique();
        });
    }
}
```

Let's break down a few of the methods we're using:

- `ToTable` - Configures the table name for the specific entity. It also allows us to provide `TableBuilder` delegate. We can use it to configure a check constraint using `HasCheckConstraint`.
- `HasKey` - Configures the table's primary key. EF will also pick up the `Id` property by convention, so this step is optional.
- `HasProperty` - Represents the entry point for configuring individual properties of the entity.
- `HasIndex` - Defines an index on the specified property (or properties). We can also declare that the index should be unique by calling `IsUnique`.

We're now ready to create our first migration.
I'm going to use the PowerShell syntax:

```pwsh
Add-Migration Create_Database
```

This will create the first database migration called `Create_Database`. The migration will apply the configuration we defined in the `OnModelCreating` method. It contains the `Up` and `Down` methods, allowing us to apply or revert changes to the database.

Note that some operations are destructive (like removing a column) and can't be easily reverted. It's up to you to examine the generated migration and prevent any possible data loss.

```cs
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

public partial class Create_Database : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Products",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                Price = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Products", x => x.Id);
                table.CheckConstraint("CK_Price_NotNegative", "Price > 0");
            });

        migrationBuilder.CreateIndex(
            name: "IX_Products_Name",
            table: "Products",
            column: "Name",
            unique: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Products");
    }
}
```

---

## Customizing Migrations

We can also modify the migration files if we need to apply some custom changes.

A notable example is renaming a column. Let's say we rename the `Description` property to `ShortDescription`. In some EF versions, this would result in the following migration:

```cs
migrationBuilder.DropColumn(
    name: "Description",
    table: "Customers");

migrationBuilder.AddColumn<string>(
    name: "ShortDescription",
    table: "Products",
    nullable: true);
```

What's the problem here? By calling `DropColumn` first, we will remove the column from the database and lose valuable data.

What we actually want to do is rename the existing column. So, we can modify the migration file to use the `RenameColumn` method:

```cs
migrationBuilder.RenameColumn(
    name: "Description",
    table: "Products",
    newName: "ShortDescription");

```

Another example is executing custom SQL commands from your migrations. Custom SQL commands are helpful when we can't express something through the EF fluent API. I've used it in the past to migrate data from one column to another or define a complex index.

```cs
public partial class Update_Products : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql("<YOUR CUSTOM SQL HERE>");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // You are also responsible for reverthing any changes.
    }
}
```

---

## Migration SQL Scripts

You can use the `Script-Migration` command to generate SQL scripts from your migrations. This is useful for reviewing changes before applying them to the database. SQL scripts allow us to execute migrations in environments without direct access to the EF tooling.

Remember, you are responsible for preventing any data loss when executing EF migrations. Review the migrations carefully before applying them to the database.

Here are a few ways you can execute the `Script-Migration` command:

```pwsh
Script-Migration

Script-Migration <FromMigration>

Script-Migration <FromMigration> <ToMigration>
```

The `<FromMigration>` argument should be the name of the last migration applied to the database. It's your responsibility to apply the script appropriately, and only to databases in the correct migration state.

Here's what the SQL script for the `Create_Database` migration looks like:

```sql
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

CREATE TABLE "Products" (
    "Id" integer GENERATED BY DEFAULT AS IDENTITY,
    "Name" character varying(100) NOT NULL,
    "Description" character varying(1000),
    "Price" numeric(18,2) NOT NULL,
    CONSTRAINT "PK_Products" PRIMARY KEY ("Id"),
    CONSTRAINT "CK_Price_NotNegative" CHECK (Price > 0)
);

CREATE UNIQUE INDEX "IX_Products_Name" ON "Products" ("Name");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20240516095344_Create_Database', '8.0.5');

COMMIT;
```

You can also specify an `-Idempotent` argument to the `Script-Migration` command. The `Script-Migration` command will generate SQL scripts that only apply migrations that haven't been applied already. This is useful if you're not sure what the last migration applied to the database.

```pwsh
Script-Migration -Idempotent
```

Here's what the idempotent SQL script looks like:

```sql
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20240516095344_Create_Database') THEN
    CREATE TABLE "Products" (
        "Id" integer GENERATED BY DEFAULT AS IDENTITY,
        "Name" character varying(100) NOT NULL,
        "Description" character varying(1000),
        "Price" numeric(18,2) NOT NULL,
        CONSTRAINT "PK_Products" PRIMARY KEY ("Id"),
        CONSTRAINT "CK_Price_NotNegative" CHECK (Price > 0)
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20240516095344_Create_Database') THEN
    CREATE UNIQUE INDEX "IX_Products_Name" ON "Products" ("Name");
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20240516095344_Create_Database') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20240516095344_Create_Database', '8.0.5');
    END IF;
END $EF$;
COMMIT;

```

---

## Applying Migrations

How do we apply EF migrations to the database?

We have a few options:

- SQL scripts
- Command-line tools
- Apply migrations through code
- Migration bundles

We discussed SQL scripts in the previous section, so I won't mention them again.

### Command-line Tools

The most common approach to applying database migrations is using the CLI. You can use either the `dotnet ef` tool or the PowerShell commands. For example, you can execute the `Update-Database` command from PowerShell to apply any pending migrations.

```pwsh
Update-Database -Migration <ToMigration> -Connection <ConnectionString>
```

Here are the documentation links if you want to learn more:

- [<FontIcon icon="fa-brands fa-microsoft"/>EF Core CLI documentation](https://learn.microsoft.com/en-us/ef/core/cli)
- [<FontIcon icon="fa-brands fa-microsoft"/>EF Core PowerShell documentation](https://learn.microsoft.com/en-us/ef/core/cli/powershell)

### Applying Migrations through Code

Here's a helper method for applying database migrations. It uses an `IServiceScope` to resolve a `DbContext` instance and uses it to call the `Migrate` method.

```cs
public static void ApplyMigration<TDbContext>(IServiceScope scope)
    where TDbContext : DbContext
{
    using TDbContext context = scope.ServiceProvider
        .GetRequiredService<TDbContext>();

    context.Database.Migrate();
}

```

You can apply migrations when the application is starting. I **don't recommend** using this approach for production environments. Migration can fail, concurrency issues exist, and rolling back migrations is challenging. However, this approach can be helpful in local development and when scaffolding databases for integration testing.

```cs
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using IServiceScope scope = app.ApplicationServices.CreateScope();

    ApplyMigration<AppDbContext>(scope);
}

app.Run();
```

### Migration Bundles

Migration bundles are executable files that you can use to apply database migrations. They're self-contained and can be executed from CI pipelines.

You can use the `Bundle-Migration` command to create a migration bundle:

```pwsh
Bundle-Migration -Connection <ConnectionString>
```

This will create an <FontIcon icon="fas fa-gears"/>`efbundle.exe` file that we can run to apply any pending database migrations.

I recommend reading the [<FontIcon icon="fa-brands fa-microsoft"/>migration bundles documentation](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying#bundles) to learn more.

---

## Additional Database Migration Tools

What can you do if you don't want to use EF Core migrations?

I wanted to mention some additional tools you can use for database schema versioning and running migrations:

- [<FontIcon icon="iconfont icon-github"/>`fluentmigrator/fluentmigrator`](https://github.com/fluentmigrator/fluentmigrator): A migration framework for .NET with a fluent API for defining migrations.
- [<FontIcon icon="iconfont icon-github"/>`DbUp/DbUp`](https://github.com/DbUp/DbUp): A lightweight library for applying SQL scripts to databases.
- [<FontIcon icon="fas fa-globe"/>Grate](https://erikbra.github.io/grate/): An automated database deployment (change management) system that relies on SQL scripts.
- [<FontIcon icon="fas fa-globe"/>Flyway](https://flywaydb.org/): An open-source database migration tool that simplifies the management and versioning of database schema changes.

We won't do a deep dive on these tools, but I recommend you check out their documentation.

---

## EF Core Migrations Best Practices

I want to wrap up this issue with a few tips from my experience of working with EF Core migrations over the years:

- **Use meaningful migration names**: Don't name migrations with dates or generic descriptions. Use clear, descriptive names that indicate the purpose of the migration. Good examples: `AddProductsTable`, `RenameDescriptionToShortDescription`. This makes it much easier to understand your migration history and find specific changes.
- **Keep migrations small and focused**: Avoid creating massive migrations containing multiple unrelated changes. Smaller migrations are easier to review, test, and troubleshoot if something goes wrong. Aim for one migration per feature or logical change.
- **Test migrations thoroughly**: Before applying migrations to production, test them in a development or staging environment. Development and staging environments should mirror your production setup as closely as possible. This will help catch any unexpected issues or data loss risks before they affect real users.
- **Beware of destructive changes**: Some operations, like dropping columns or tables, can lead to irreversible data loss. Carefully consider the consequences before including such changes in migrations. Provide a way to migrate data or create a backup plan.
- **Avoid merge conflicts**: Solving merge conflicts for EF migration snapshots can be a real headache. Be mindful of this when working in a team that creates many database migrations. It's recommended to always be up-to-date with the latest migration before creating a new one. This should minimize the chance of creating merge conflicts.

My preferred approach to applying migrations is using SQL scripts. Depending on the project scope and complexity, we could do this manually or through a tool that automates the process. This allows me to review the migration and identify any potential problems.

I hope this was helpful!

Thanks for reading, and I'll see you next week.
