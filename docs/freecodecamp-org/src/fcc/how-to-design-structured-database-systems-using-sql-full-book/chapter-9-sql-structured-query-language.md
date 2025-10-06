---
lang: en-US
title: "Chapter 9: SQL (Structured Query Language)"
description: "Article(s) > (10/12) How to Design Structured Database Systems Using SQL [Full Book]"
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
      content: "Article(s) > (10/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 9: SQL (Structured Query Language)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-design-structured-database-systems-using-sql-full-book/chapter-9-sql-structured-query-language.html
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
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-9-sql-structured-query-language"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

In addition to formal languages, there are implementations like Structured Query Language (SQL) that are based on the operations of these formal languages. They allow us to manipulate and query data through relational database management systems (DBMS).

Specifically, SQL is a commercially used language with various standards, to which various functionalities have been added over time. Most systems have versions installed that are newer than SQL-92. But that version already includes all the necessary functions to perform the vast majority of operations needed on a database, so it’s the standard we’ll explore here.

SQL is a declarative language, where we define what data we want to get, not the exact sequence of operations to get it. The DBMS does the latter internally by translating the statements we write into relational algebra operations, which transform the tables through an execution plan until reaching the final resulting table.

Before proceeding with the elements that make up the SQL language itself, we should distinguish these elements or statements based on their purpose or application area.

On one hand, we have the statements that form the Data Definition Language (DDL), which is a set of statements dedicated to managing the tables in the database (such as their creation, deletion, modification, and so on).

Then we have the Data Control Language (DCL), which is another set of language statements dedicated to controlling user permissions in the database, managing who can read or modify the tables.

On the other hand, we have the Data Manipulation Language (DML). Its statements are oriented towards managing the data contained in the tables, such as insertion, deletion, transformation, or querying.

Apart from these sets of statements or instructions, we can also consider the [<VPIcon icon="fas fa-globe"/>Transaction Control Language (TCL)](https://geeksforgeeks.org/sql/tcl-full-form/), which are a series of statements that allow us to manage transactions that occur in the database. Here, we will focus only on the first three sets, which contain the most fundamental instructions.

---

## DDL

To start with SQL, the most basic thing we can do is create, modify, and delete tables in the database. This means that we use instructions that allow us to define our logical design in the DBMS.

Here, we’ll use **PostgreSQL** as the DBMS, although these examples can be applied to any DBMS that supports the **SQL-92** standard, which is what we will focus on.

![Entity-relationship diagram where Rental is a weak entity that connects Person and Bike with rental data.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752248008262/339c85d9-14a2-4d63-9453-c0f1a36e90f0.png)

For these examples, let's assume a domain where people rent bicycles. We have a weak entity called **Rental** that models when a person has rented a certain bike, and the attribute **Duration** represents the number of rental days.

As we have seen in previous examples, the primary key of Rental is composed of the rental date and the foreign keys that identify the person who rented a certain bike. This makes Rental weak in identification because both foreign keys are needed to uniquely identify the tuples in that table.

Also, in our domain, we prohibit a person from renting a bike when it’s already being rented by someone else. This means that although everyone can rent as many bikes as they want, they can’t rent one that is already being used by another person or by themselves.

![Relational schema diagram where Rental references Bike and Person through foreign keys.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752248300505/daa2d932-d838-4ba4-8f4b-1abaa5f31f98.png)

When translating it to the logical level, we simply underline the attributes that are keys and add the foreign key attributes in Rental, as they aren’t represented at the conceptual level. These are underlined because the Rental entity is weak in identification, as we just discussed.

So if we want to implement this logical design in a DBMS like PostgreSQL, we first need to **install** and **configure** it on a machine. Then, once we’ve opened it in a terminal, we can navigate it with different commands:

- `\?` Shows help about the DBMS commands.
- `\! [command]` Executes an operating system terminal command.
- `\h [command]` Shows help about the SQL syntax, that is, its statements like `\h CREATE TABLE`.
- `\q` Closes the DBMS, which can also be done with `exit`.
- `\l` or `\list` Lists all available databases.
- `\c <databaseName>` or `\connect <databaseName>` Connects to the database with the given name.
- `\conninfo` Shows information about the current database connection (host, port, user, database).
- `\dn` Lists all schemas, which are groupings of elements like tables, views, types, and so on.
- `\dt` Shows the tables of the database we are connected to.
- `\dv` Similar to the previous command, this one shows the views.
- `\di` Lists the indexes.
- `\df` Lists the functions.
- `\d[+] object` Describes the object whose name we provide as an input argument (table, view, function, and so on). With `+` it includes additional details.
- `SQL CODE;` In the terminal, we can execute SQL code, always ending with a semicolon.
- `\timing` Used to turn on/off the measurement of query execution time.
- `\copy table TO 'file.csv' CSV HEADER;` Exports `table` to a CSV file.
- `\copy table FROM 'file.csv' CSV HEADER;` Imports data from a CSV file into a table without emptying it first.
- `\i path/file.sql` Executes an SQL script saved in a file with a .sql extension to avoid having to copy and paste lengthy SQL code into the terminal.

When you’re using a DBMS, you should check its documentation to see if it’s case sensitive or not. In this case, [<VPIcon icon="fa-brands fa-stack-overflow"/>PostgreSQL](https://stackoverflow.com/questions/21796446/postgres-case-sensitivity) is not case sensitive unless we write the identifiers of the elements in quotes (except for the **SQL clauses**, which are never interpreted as case sensitive). This means we can write SQL statements in either uppercase or lowercase, interchangeably.

### CREATE

Once we have entered the DBMS, the first thing we can do is create elements using the `CREATE` statement. There are many elements we can create, but the most important one for now is DATABASE, which allows us to create a new database.

```sql
CREATE DATABASE sampledb;
```

If we enter this command directly into the terminal, we will create an empty database that we can connect to using the previous PostgreSQL commands. Once we are in the database, we can create the tables of our logical design with the following:

```sql
CREATE TABLE Person (
    PersonID INT,
    Name VARCHAR(255),
    Birth DATE,
    Email VARCHAR(255)
);
CREATE TABLE Bike (
    BikeID INT,
    Model VARCHAR(255),
    Weight DOUBLE PRECISION
);
CREATE TABLE Rental (
    PersonFK INT,
    BikeFK INT,
    RentalDate DATE,
    Duration INT,
    Price DOUBLE PRECISION
); -- Important, don't forget the ; after each statement--
```

As you can see, when creating tables, you need to specify the schema for each one. Don’t confuse this with what PostgreSQL calls a schema at the DBMS level. In PostgreSQL, a **schema** is a **namespace** within the database that groups and isolates elements like **tables**, views, functions, and so on. This makes it easier to organize, manage, and control permissions, and avoid name conflicts.

Here, the **table schema** refers to the **attributes** that define it, which is why we declare their names along with their data types, including:

| **Data Type** | **Category** | **Description** |
| --- | --- | --- |
| `BIT` | Exact Numeric | Fixed-size bit string (for example, `BIT(1)` stores a single 0 or 1). |
| `TINYINT` | Exact Numeric | Integer typically from -128 to 127 (1 byte). |
| `SMALLINT` | Exact Numeric | Integer typically from -32,768 to 32,767 (2 bytes). |
| `INTEGER` / `INT` | Exact Numeric | Integer typically from -2,147,483,648 to 2,147,483,647 (4 bytes). |
| `BIGINT` | Exact Numeric | Integer typically from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (8 bytes). |
| `DECIMAL(p, s)` | Exact Numeric | Fixed-point number with precision `p` and scale `s` (for example, money). |
| `NUMERIC(p, s)` | Exact Numeric | Synonym for `DECIMAL`, same fixed-point behavior. |
| `FLOAT(p)` | Approximate Numeric | Floating-point with precision of at least `p` bits. |
| `REAL` | Approximate Numeric | Single-precision (typically 24-bit) floating-point. |
| `DOUBLE PRECISION` | Approximate Numeric | Double-precision (typically 53-bit) floating-point. |
| `CHAR(n)` | Character String | Fixed-length text of exactly `n` characters (padded if shorter). |
| `VARCHAR(n)` | Character String | Variable-length text up to `n` characters (no padding). |
| `CLOB` | Character String | Character Large Object for very long text (for example, articles). |
| `BINARY(n)` | Binary String | Fixed-length binary data of exactly `n` bytes. |
| `VARBINARY(n)` | Binary String | Variable-length binary data up to `n` bytes. |
| `BLOB` | Binary String | Binary Large Object for large binary data (for example, images). |
| `DATE` | Date/Time | Calendar date in `YYYY-MM-DD` format. |
| `TIME(p)` | Date/Time | Time of day `HH:MM:SS[.fraction]` with `p` fractional seconds. |
| `TIMESTAMP(p)` | Date/Time | Combined date and time with fractional seconds precision `p`. |
| `INTERVAL` | Date/Time | Period of time (for example, `INTERVAL '1-2' YEAR TO MONTH`). |
| `BOOLEAN` | Boolean | Logical value `TRUE`, `FALSE`, or `UNKNOWN` (NULL). |
| `XML` | Other Standard | Stores XML document or fragment. |
| `JSON` | Other Standard | Stores JSON-formatted text for semi-structured data. |
| `UUID` | Other Standard | 128-bit universally unique identifier (for example, `550e8400-e29b-41d4-a716-446655440000`). |

In this list, we can see some like **BLOB** that at first glance allow storing an arbitrary amount of data in a single cell, as the BLOB can be as large as we want. This might seem like it poses a repetitive group problem. But when a column stores BLOB data, it doesn't store multiple BLOBs in the same cell, but only one. This makes the DBMS responsible for managing the disk storage of this type of data efficiently.

In other words, we can see this as if the BLOB itself is not stored in a table cell, but rather a memory pointer is stored pointing to another memory area where the entire BLOB is stored (although the exact technique used heavily depends on the DBMS).

Also, if we look at other data types like **VARCHAR** for storing text, we’ll see that it’s essential to specify a fixed size for the data type, so that all texts stored in that column can have an arbitrary length that does not exceed the defined size in the data type.

Besides creating databases and tables, we might want to create a custom data type like **ageDataType** or **colorDataType**, which we can do using **CREATE DOMAIN**.

```pgsql
CREATE DOMAIN ageDataType AS INTEGER CHECK (VALUE >= 0 AND VALUE <= 150);
CREATE DOMAIN colorDataType AS VARCHAR(8) CHECK (VALUE IN ('red', 'green', 'BlUe'));
```

Here we just created new data types called ageDataType and colorDataType, where the first one is used to represent ages and the other colors. We could do this by imposing constraints on the values that columns can take, rather than defining a new data type, or rather a domain. But if there are many attributes with the same constraints on their domain, meaning they have the same domain like color or age, then it makes sense to define a custom one.

We mainly do this using the CHECK statement, which as we'll see is used to define constraints (in this case on the values of the data type we define as a base when creating a new domain. Above we used INTEGER and VARCHAR(8) respectively.).

### ALTER

In addition to creating elements like tables or databases, we can also modify them using the **ALTER** statement. For example, if we forgot to add the **AuxEmail** column to the **Person** table, we can use the following statement to add it after the table has been created.

```pgsql
ALTER TABLE Person
  ADD COLUMN AuxEmail VARCHAR(255);
```

As you can see, we first specify the table where we want to add the new column, and then we specify the name and type of that attribute. But it's important to consider the value assigned to its cells when this table extension occurs.

By default, SQL **allows NULL values** in the table, so it will fill those values with `NULL` if there is content in the table. But if we want to assign a custom default value to the cells of the new column instead of NULL when there is data already inserted in the table, we can add the default value property to the column we are adding:

```pgsql
ALTER TABLE Person
  ADD COLUMN AuxEmail VARCHAR(255) DEFAULT 'noEmail@gmail.com';
```

This way, when we insert a tuple and leave the `AuxEmail` value undefined, the DBMS will automatically fill the cell for that attribute with its default value. This also applies when adding the column itself when there is already data in the table. We can also remove this default value property using:

```pgsql
ALTER TABLE Person
  ALTER COLUMN Email DROP DEFAULT;
```

Similarly, ALTER also allows us to remove an attribute:

```pgsql
ALTER TABLE Person
  DROP COLUMN Email;
```

Change the data type of an attribute:

```pgsql
ALTER TABLE Person
  ALTER COLUMN Name TYPE CHAR(25);
```

And rename elements, among many other actions:

```pgsql
ALTER TABLE Person
  ALTER COLUMN Birth RENAME TO BirthDate; --Renames the column Birth of the table Person--
ALTER TABLE Person
  RENAME TO People; --Renames the table Person--
ALTER DATABASE sampledb
  RENAME TO otherName; --Renames the database sampledb--
```

In short, `ALTER` allows us to modify elements that have already been created in the database without deleting and recreating them with the changes. Otherwise, we would have to export the data stored in those elements and reinsert it into the new schemas, which would be inefficient.

### `DROP`

We can remove elements with the `DROP` statement. Its operation is very simple, as we just need to specify the name of the element to remove, such as the database we just created:

```pgsql
DROP DATABASE samplebd;
```

When executing this statement, SQL tries to delete the database, although we might get an error if we are connected to it. Besides simply deleting it, we can check if it exists before trying to delete it with:

```pgsql
DROP DATABASE IF EXISTS sampledb;
```

Similarly, we can have a schema like this example where there are foreign keys in `Rental` that reference or point to other tables like Bike and Person.

If we delete `Rental`, nothing would happen since no foreign key points to `Rental`. But if we want to delete one of the other two tables, a referential integrity problem will arise. For example, deleting `Bike` would leave the foreign key reference in Rental that points to `Bike` orphaned. So to delete `Bike` and all the constraints or SQL elements that depend on `Bike`, meaning those that reference it, we can use `CASCADE`:

```pgsql
DROP TABLE Bike CASCADE;
```

By doing this, not only would `Bike` be deleted, but also the foreign key constraint in `Rental` that we haven't introduced yet, as well as all others that point to `Bike`.

It's important to note that the `CASCADE` in a `DROP` statement is not related to the `CASCADE` we can define in a CREATE statement to set deletion or insertion policies. If, instead of deleting an entire table, we only delete certain tuples, we might end up with a situation where a tuple has a foreign key value that doesn't correspond to any tuple in the referenced table because we deleted it. We can establish deletion policies where the tuples pointing to the deleted one are also removed, or similar actions.

### `INSERT`

To insert tuples into tables, we use the `INSERT` statement, where we specify the name of the table where we want to insert, as well as the attributes of its schema and the values to insert into the new tuple.

```pgsql
INSERT INTO Person (PersonID, Name, Birth, Email)
VALUES (5, 'Carol Johnson', '1985-07-15', 'carol@example.com');

INSERT INTO Bike (BikeID, Model, Weight)
VALUES (5, 'EcoCruiser', 14.2);

INSERT INTO Rental (PersonFK, BikeFK, RentalDate, Duration, Price)
VALUES (5, 5, '2025-07-10', 3, 25.50);
```

But, if we don't have some of the values for the tuple, we can omit them by inserting values only for the attributes we do have. We can even insert a tuple with DEFAULT values for certain attributes. But this only works if a default value was defined when creating the table or added with an ALTER statement.

```pgsql
INSERT INTO Bike (BikeID, Model)
VALUES (6, 'Speedster');
INSERT INTO Bike (BikeID, Model, Weight)
VALUES (7, 'Commuter', DEFAULT);
```

### DELETE

To delete tuples, you can use DELETE, which at a logical level is very similar to the SELECT clause that we will see later (that’s used to retrieve data in response to database queries).

To use DELETE, we impose a set of conditions that the tuples in one or more tables must meet to be selected. Those tuples that meet the conditions are then deleted by DELETE.

```pgsql
DELETE FROM Rental
WHERE PersonFK = 5
  AND BikeFK   = 5
  AND RentalDate = '2025-07-10';
```

For example, here all tuples with a value of 5 in PersonFK and BikeFK and a rental date of 2025-07-10 will be deleted.

### UPDATE

Similarly, we can update the values of tuples using UPDATE. We first select the tuples that will be affected by the change we want to make by imposing conditions on them, and then we use SET to change one of their attribute values or apply a transformation.

```pgsql
UPDATE Bike
SET Weight = 13.8
WHERE BikeID = 5;

UPDATE Person
SET Email = 'carol.johnson@example.com'
WHERE PersonID = 5;
```

### Constraints implementation

Given these **DDL** statements, we can create different elements where data is stored. But as we’ve seen, in most domains we model, we need to implement a series of constraints to ensure that the data adheres to the requirements of our problem. (This is in addition to the integrity constraints inherent in the relational model, such as the existence of keys.)

Although this distinction is not as strong in SQL, most constraints we impose help ensure data integrity, whether they refer to the relational model's own rules or the business rules of our problem.

To implement constraints in SQL, we can start with the simplest ones: constraints that affect a single table. These are usually implemented using the `CHECK` statement within another statement like `CREATE TABLE`, where a condition is specified that all tuples in a table must meet whenever we modify it by inserting, modifying, or deleting its tuples.

```pgsql
CREATE TABLE Person (
    PersonID INT,
    Name VARCHAR(255),
    Birth DATE,
    Email VARCHAR(255),
    CHECK (Birth <= CURRENT_DATE)
);
CREATE TABLE Person (
    PersonID INT,
    Name VARCHAR(255),
    Birth DATE,
    Email VARCHAR(255),
    CONSTRAINT BirthConstraint CHECK (Birth <= CURRENT_DATE)
);
```

For example, we can assume that a person's birth date is always validated before being saved in the database. If a user enters an invalid date in the application layer, the application itself will generate an error and prevent saving an invalid date in the database. But it's still a good idea to add this type of constraint to ensure data integrity.

In this case, a person can’t be born on a date later than the current date, which we can get in SQL with `CURRENT_DATE`. So, we define a constraint where the **Birth** attribute must be less than or equal to the current date for all rows in the Person table.

These constraints are usually defined below the attribute declaration, and we can also give them a specific name using `CONSTRAINT`. This declares the constraint and assigns it a name we can use to identify it. We can add this name not only to a CHECK constraint but also to any similar declaration, such as `PRIMARY KEY`, `FOREIGN KEY, or `UNIQUE`, among others.

Continuing with constraints on a specific table, if we need to ensure that an attribute can’t take NULL values, we can use either a CHECK or a `NOT NULL` along with declaring the corresponding attribute (to which we can also give a specific name using `CONSTRAINT`).

```pgsql
CREATE TABLE Person (
    PersonID INT,
    Name VARCHAR(255),
    Birth DATE NOT NULL,
    Email VARCHAR(255)
);
CREATE TABLE Person (
    PersonID INT,
    Name VARCHAR(255),
    Birth DATE CONSTRAINT BirthNotNull NOT NULL,
    Email VARCHAR(255)
);
CREATE TABLE Person (
    PersonID INT,
    Name VARCHAR(255),
    Birth DATE,
    Email VARCHAR(255),
    CONSTRAINT BirthNotNull CHECK (Birth IS NOT NULL)
);
```

These three ways are equivalent if we want to require people to save their birth date in the database, preventing `NULL` values in the respective column.

The main difference between using `CHECK` and putting `NOT NULL` next to the attribute declaration is that if we use `CHECK`, we have to write a condition in parentheses similar to how we do it in a SQL query that describes the condition we want to impose, as long as this query only affects the attributes of the table we are working on.

In contrast, `NOT NULL` next to an attribute is an implicit way to indicate this restriction. It's important to note that a SQL condition can involve complete subqueries, providing very useful computing power to express most restrictions.

After understanding what CHECK involves, we can see how almost any domain restriction on attributes can be specified in one of these statements. However, SQL offers us more functionalities, such as setting a default value for attributes with `DEFAULT`.

```pgsql
CREATE TABLE Person (
    PersonID INT,
    Name VARCHAR(255) DEFAULT 'No name',
    Birth DATE,
    Email VARCHAR(255)
);
CREATE TABLE Person (
    PersonID INT,
    Name VARCHAR(255) CONSTRAINT NameDefaultValue DEFAULT 'No name', --We can name the default value too--
    Birth DATE,
    Email VARCHAR(255)
);
```

As we’ve seen before, we use `DEFAULT` so that when a tuple is inserted with a missing value for a certain attribute, if that attribute has a default value defined, the tuple will be inserted with that default value in the corresponding attribute instead of `NULL`.

This is important because if we include the `NOT NULL` restriction and don’t define a default value for an attribute, the DBMS may generate an error here. This also applies when a new attribute is added to the table using ALTER, where we can define a default value at the same time.

```pgsql
CREATE TABLE Bike (
    BikeID INT,
    Model VARCHAR(255),
    Weight DOUBLE PRECISION,
    CONSTRAINT ModelValues CHECK (Model IN ('Model1', 'Model2', 'Model3'))
);
```

As a curiosity, if we want to explicitly define the possible values an attribute can take, we can use a `CHECK` like the one above. This is the same expression we use when creating a new domain with `CREATE DOMAIN`. We can then assign it as the data type to the Model attribute. So we have the option to create a custom domain for an attribute or define a constraint with `CHECK` to model its domain (although in most cases, it's better to use `CREATE DOMAIN` for better maintainability).

Continuing with constraints that affect a single table, we also have those more related to data integrity concerning the relational model. For example, to uniquely identify the tuples of a table, we have candidate keys in the relational model, which we can declare in SQL using `UNIQUE` in combination with NOT NULL.

```pgsql
CREATE TABLE Bike (
    BikeID INT,
    Model VARCHAR(255),
    Weight DOUBLE PRECISION,
    UNIQUE (Model)
);
```

For example, if we assume that in our problem there aren't multiple different bikes with the same model name, then we can use Model as a candidate key to uniquely identify all the tuples in the table.

So to explicitly declare that Model can serve for tuple identification, we use `UNIQUE`. This indicates that all the values that this attribute takes in (all the tuples of the table) must be different.

But `UNIQUE` allows the attribute to take the value NULL at most once - so if we want to ensure that we declare it as a candidate key, we might consider adding a `NOT NULL` constraint in case we don't accept NULL as a valid value for a candidate key.

We can also apply this to more than one attribute, where `UNIQUE` would determine that the combination of values of all those attributes included in the constraint must be different in all the tuples of the table.

The main usefulness of `UNIQUE` is that it ensures certain attributes meet the definition of a candidate key. So, if we insert multiple tuples with the same repeated values in attributes that form a candidate key defined with `UNIQUE`, the DBMS will generate an error. But beyond this, we don’t have to define all candidate keys that exist unless the domain or problem requirements force us to do so.

Usually, we’d just define the primary key of a table with `PRIMARY KEY`, without needing it to be a selected candidate key.

```sql
CREATE TABLE Person (
    PersonID INT,
    Name VARCHAR(255) DEFAULT 'No name',
    Birth DATE,
    Email VARCHAR(255),
    CONSTRAINT PersonPK PRIMARY KEY (PersonID) --The constraint is named PersonPK--
);
```

When we introduce the primary key constraint on a set of attributes, we are implicitly declaring that these attributes can’t contain NULL values, and the combinations of values they take must all be unique in the table's tuples (just like with `UNIQUE`).

It’s as if we’re implicitly defining `UNIQUE` and `NOT NULL` on the attributes that form the primary key, making sure that they meet all the necessary conditions to truly form a primary key (which can also be referenced by a foreign key).

To declare the existence of foreign keys, we use FOREIGN KEY on the attributes that constitute it.

```pgsql
CREATE TABLE Rental (
    PersonFK INT,
    BikeFK INT,
    RentalDate DATE,
    Duration INT,
    Price DOUBLE PRECISION,
    CONSTRAINT RentalPK PRIMARY KEY (PersonFK, BikeFK, RentalDate),
    CONSTRAINT FK_Rental_Person FOREIGN KEY (PersonFK) REFERENCES Person(PersonID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Rental_Bike FOREIGN KEY (BikeFK) REFERENCES Bike(BikeID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
```

As you can see, declaring foreign keys is very similar to primary keys, except that we. usethe `FOREIGN KEY` statement. But for the DBMS to ensure referential integrity in the database, we need to define what happens when inserting, updating, or deleting tuples from tables that are referenced by foreign keys.

To understand this, the simplest case is when a tuple is inserted into a table like Rental, where values must be provided for its foreign keys. By default (NO ACTION), SQL allows a foreign key to take NULL values, meaning NULL satisfies the foreign key constraint. But in this case, we should add a `NOT NULL` constraint on these attributes because, in the conceptual model, a Rental entity was related to at least one Bike entity and one Person entity, as indicated by the minimum cardinality.

So if we insert a tuple with a NULL value in the foreign key attribute and we had the `NOT NULL` constraint, we’d receive an error. On the other hand, if we insert a value that is not NULL but doesn’t exist in the attribute of the table we are referencing, then the DBMS won’t allow that insertion either - as that foreign key won’t be referencing an existing tuple in the table it points to.

To indicate where it points, we use `REFERENCES` in the `FOREIGN KEY` constraint itself, where the table and the attribute the foreign key should point to are specified. Specifically, this attribute must be the primary key of the referenced table to avoid referential integrity errors. This means that the foreign key points to an attribute that can truly uniquely identify the tuples of the referenced table.

Afterward, if we try to delete a tuple from the Bike or Person table that is referenced by a tuple in the Rental table, we can set several deletion policies.

First, by deleting the tuple from Bike or Person, we would have a tuple in Rental that does not reference any valid tuple from another table, creating a referential integrity problem due to an orphaned reference.

One option to solve this is to also delete the tuple in the Rental table and recursively delete the tuples that point to the tuples being removed by this process. We declare this with `ON DELETE CASCADE`. But if we want to keep the tuple in Rental, instead of deleting it, we can assign a particular value to the foreign key that no longer points to any valid tuple (such as `NULL` or the default value `DEFAULT`). We declare this with `ON DELETE SET [value], where [value]` can be any value that the attribute can take.

But we need to be careful with `NULL`, because if the foreign key attribute is also part of the primary key, as in this example, it will conflict with the implicit `PRIMARY KEY` constraint that prevents it from being `NULL`.

We aren’t required to declare `ON DELETE` in these constraints, so if we don't, the default action (called NO ACTION) will be executed. This means rejecting the deletion of the tuple in Bike or Person, and showing an error to the user.

Similarly, this issue can also occur when updating a tuple, so the same `ON DELETE` mechanism applies to tuple modifications, which we can define with `ON UPDATE`.

Finally, a foreign key can reference the same table it’s in, and using the `CASCADE` policy is completely valid. This is because it recursively deletes tuples that cause referential integrity issues, not entire tables. Even if there are tuples that reference themselves, this poses no problem, as the DBMS can handle these edge cases.

These are the basic constraints that we can apply to a single table, although there are more advanced tools that help ensure data integrity or even optimize its manipulation and querying.

But there are some constraints that don’t only affect one table in the schema but can involve conditions on multiple tables. To implement them, we have several options, such as assertions, which are conditions very similar to `CHECK` that are verified every time any of the tables involved in the condition are modified.

```pgsql
CREATE ASSERTION RentalEmailConstraint CHECK (
    NOT EXISTS (
        SELECT 1
        FROM Rental r
            JOIN Person p ON r.PersonFK = p.PersonID
        WHERE p.Email IS NULL
    )
);
```

For example, here we create an assertion that checks we haven’t rented a bike to any person who doesn't have an Email defined. For this type of constraint, we usually use complete SQL queries within the `CHECK`, as they are more complex to model than the `CHECK` constraints we place on a single table.

We could also do this in the table `CHECK` constraints instead of using assertions, although it would often be more complex to model.

Lastly, besides assertions, we can implement constraints on multiple tables with triggers, which are statements composed of an event, a condition, and an action. When the defined event occurs, the condition that constitutes the constraint is checked, and depending on whether it’s true or false, a certain action is executed or not on the database.

Now that we know how to set constraints on a relational schema, we can refine the logical implementation of our example by adding the necessary constraints, resulting in the following code:

```pgsql :collapsed-lines
DROP TABLE IF EXISTS Rental;
DROP TABLE IF EXISTS Bike;
DROP TABLE IF EXISTS Person;
CREATE TABLE Person (
    PersonID INT NOT NULL,
    Name VARCHAR(50) NOT NULL DEFAULT 'No name',
    Birth DATE NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT PersonPK PRIMARY KEY (PersonID),
    CONSTRAINT ConstraintPersonBirth CHECK (Birth <= CURRENT_DATE)
);
CREATE TABLE Bike (
    BikeID INT NOT NULL,
    Model VARCHAR(50) NOT NULL,
    Weight DOUBLE PRECISION NOT NULL,
    --This constraint is redundant due to the definition of PRIMARY KEY constraint--
    UNIQUE (BikeID),
    CONSTRAINT BikePK PRIMARY KEY (BikeID),
    CONSTRAINT ConstraintBikeWeight CHECK (Weight > 0) --Weight must be positive--
);
CREATE TABLE Rental (
    PersonFK INT NOT NULL,
    BikeFK INT NOT NULL,
    RentalDate DATE NOT NULL,
    Duration INT NOT NULL,
    Price DOUBLE PRECISION NOT NULL,
    CONSTRAINT RentalPK PRIMARY KEY (PersonFK, BikeFK, RentalDate),
    CONSTRAINT FKRentalPerson FOREIGN KEY (PersonFK) REFERENCES Person(PersonID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FKRentalBike FOREIGN KEY (BikeFK) REFERENCES Bike(BikeID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT ConstraintRentalDuration CHECK (Duration > 0),
    CONSTRAINT ConstraintRentalPrice CHECK (Price >= 0),
    CONSTRAINT ConstraintRentalDate CHECK (RentalDate <= CURRENT_DATE)
);
```

As you can see, in the creation script, we have added some `DROP` statements to remove the tables before creating the final ones with all the correct constraints. We usually do this when there is no data in the tables, as a `DROP` would delete everything stored in them. Also, when we delete several tables that are related through foreign keys, we want to avoid the DBMS generating referential integrity errors. Because of this, it’s common to first delete the tables that do not have any foreign keys pointing to them, and then continue with the rest.

---

## DCL

Now that you’ve seen how to define the basic elements of the relational model in a DBMS with SQL, we should consider the security with which these operations are performed (as well as those we’ll see in DML). After all, not all database users may have good intentions when operating on the DBMS.

So in DCL, we can define a series of statements for managing users, roles, and permissions, which establish who can do what on the database.

### User roles

The first thing we can do is create **roles**, which, as the name suggests, is a role assigned to a database user that determines what they can or can’t do with the database. Basically, the role functions as a **set of permissions**.

By default, a user role has basic login permission on a database. So to simplify this section, we can assume that when a user wants access to the database, it’s enough to give them a role with login permission (although these mechanisms may depend on the DBMS we are using).

```pgsql
CREATE ROLE user1 WITH LOGIN PASSWORD 'userPassword';
DROP ROLE user1; --If we want to remove the role--
```

So even though it can authenticate to the DBMS using the password we define here, a role won’t have permission to connect to any database by default. But we can change that and give that permission with `GRANT`:

```pgsql
GRANT CONNECT ON DATABASE sampledb TO user1;
```

By default, the user won't be able to do anything else other than connect. So by using `GRANT` in the following way, we can give the necessary permissions to execute any necessary statements on certain elements of the database.

```pgsql
GRANT SELECT, UPDATE
ON TABLE Rental
TO user1;
```

For example, here we are giving permission to execute the `SELECT` and `UPDATE` statements on the Rental table.

Or if we want to give all possible permissions to do anything on an element, we can use ALL, like this:

```pgsql
GRANT ALL PRIVILEGES
ON TABLE Bike
TO user1;
```

Or, if we want to be more precise, we can even control which columns of a table certain statements can be executed on:

```pgsql
GRANT SELECT (PersonID, Name)
ON TABLE Person
TO user1;
```

Similarly, if instead of using `GRANT` we use `REVOKE`, we remove certain permissions that the role has:

```pgsql
REVOKE ALL PRIVILEGES
ON TABLE Bike
FROM user1;
```

This is just a part of what can be controlled for a role in a database using DCL statements, as security is a critical aspect.

---

## DML

After setting up user permissions to control what a user can do in the database, we have enough elements to start manipulating and querying the data. So now it’s time to introduce the set of statements that make up the DML of SQL, which mainly handles the management of stored data.

### CRUD

To understand data management, you should think about how you’ll operate on them. This is guided by the needs of the user or end client. From this arises the **CRUD pattern (Create, Retrieve, Update, and Delete)**, which defines the fundamental operations performed on the data of a real project and that the database must support.

As you can see from its acronym, at the most fundamental level in our database, new data can be inserted (Create), queried once stored (Retrieve), and can also be modified (Update) or deleted (Delete) when they are no longer useful for the domain.

Of all these operations, the most important one is querying the data. If we think about it, any service provided to the end user can be reduced to a query on stored data.

For example, simply viewing saved information means it has to be retrieved through a query. Really any metric that needs to be calculated on the data also involves querying and then computing on it. So even though DML involves a wide variety of statements with diverse objectives, we will focus here on those that form the fundamental blocks for performing queries - CRUD.

When working with relational databases, there’s a certain the mechanism that queries follow to obtain the data we request from the DBMS.

First, we have a series of tables where information is stored in tuples. These we will call base tables, meaning the ones we initially create with CREATE TABLE. We don’t modify these base tables directly - instead, we apply a series of operations to them, many from relational algebra, resulting in intermediate tables. These intermediate tables pass through the sequence of operators until we reach a final table with the results we asked for.

In other words, a query consists of obtaining a resulting table with data from a set of base tables.

From a formal perspective, this is sometimes interpreted in relational algebra as if the query were a [<VPIcon icon="fas fa-globe"/>relational tree](https://cs.emory.edu/~cheung/Courses/554/Syllabus/5-query-opt/intro.html) where the leaf nodes are the base tables. As operators, which can be either unary or binary, are applied, new intermediate tables are generated, representing the intermediate nodes of the tree until reaching the **root node**, which is the final table, or the **query result**.

With this, we can see each operator as if it were a mathematical function that takes one or more tables as input, performs a certain operation on them, and returns another table as output.

In contrast, when we program in SQL, we don't directly use these relational operators, as they are formal tools that support data querying. Instead, we use a series of DML statements, some of which resemble relational operators but are actually meant to be combined with other statements to form a query.

SQL is not a formal language like relational algebra - it’s an implementation based on this formal language, as well as on relational calculus, which allows us to abstract certain formal details. So when we’re executing a SQL query, the DBMS will transform it from a sequence of SQL statements into an execution plan more similar to a sequence of relational algebra operators. Then it’s internally resolved with advanced techniques that work on the formal operators themselves.

It's also important to note that most of the optimization is done by the DBMS when analyzing the structure of the query. Despite this, we should always try to "help" the DBMS optimizer by writing SQL queries that aim to minimize its workload. For this, there are certain [<VPIcon icon="fas fa-globe"/>techniques](https://geeksforgeeks.org/sql/best-practices-for-sql-query-optimizations/) you should follow (but that we won’t cover in detail here).

Before introducing DML statements, it's a good idea to have the [schema (<VPIcon icon="iconfont icon-github"/>`cardstdani`)](https://gist.github.com/cardstdani/587e515368c9755ab6bc9b78a119292f) loaded with the Person, Bike, and Rental tables, as well as some sample data. In addition to creating the tables, to ensure that the queries return some data and we can verify they actually work, you’ll need to insert data into them using INSERT.

### `SELECT` and `FROM`

The first statements we'll look at for building a query are the most basic ones: `SELECT` and `FROM`. You can’t construct a SQL query without a `FROM`, as it’s used to determine from which table the data will be gotten. Here’s how it works:

```pgsql
SELECT *
FROM Bike;
```

For example, if we run this query, it will return all the tuples stored in the Bike table. This is because we must provide one and only one table to `FROM`, in this case, Bike, from which the data will be obtained. Then, after getting the data from that table, `SELECT *` is used to select the data from all its columns, which is what we will return to the user.

Although we can only use one table in the `FROM`, we can actually perform a series of operations on several base tables and use that result as the table in the `FROM`. In other words, we can make the result of a SQL query, which is itself a table, the table used in the `FROM`, as shown here:

```pgsql
SELECT *
FROM (SELECT * FROM Bike);
```

This isn’t common to do with such a simple example, but it’s useful to show that we can provide anything we can build with a SQL query as the table to `FROM` (since the result of all the queries we can construct is actually a table).

When trying to transfer the functionality of these statements to relational algebra operators, we’ll see that there is no specific operator for `FROM` that does something similar.

But for `SELECT` there is an operator that does almost the same thing. Specifically, in relational algebra, there is the projection operator **π(Table, ListAttributes)**. It takes as input a table with data and a list of some of its attributes, and returns another table constructed from the input where only the attributes in the list are kept - with all the data from their columns - discarding the rest of the attributes not appearing in the list.

This is exactly what SELECT does: we have an input table given by the FROM clause, and then we define a series of attributes we want the resulting table to have, discarding the rest.

```pgsql
SELECT Name, Birth
FROM Person;
```

For example, when FROM gets the data from the Person table, it provides it as input to SELECT. This then returns a table where only the attributes Name and Birth that we listed are present, with all the data from their columns. If we need to get all the attributes, we can use `SELECT *`, and we’ll get the input table with all its attributes and data as it was received.

### Aliases

Another operator that we have in SQL in an almost equivalent form is the **renaming operator**. As its name suggests, we use it to provide alternative names to the tables or attributes we use, to avoid ambiguity problems or to shorten long names.

```pgsql
SELECT P.Name, Birth AS B
FROM Person P;
```

In relational algebra, the operator is denoted as **ρ(Object, Alias)**, and its function is to assign an alias to an object, which can be either a table or an attribute.

In SQL, there are several ways to use it. On one hand, in the FROM clause, we can use `AS [alias]` or directly place the alias name after the table or tables involved in the query. This lets us refer to them by their alias instead of their full name, especially if we use the same one multiple times.

Also, in the `SELECT` clause, we should use AS to avoid ambiguities when assigning aliases to the attributes we’re going to return. The main utility here is to rename the returned attributes to have more descriptive or context-appropriate names.

For example, instead of returning the attribute Birth, its data is returned with the name B, which is shorter, while the Name attribute from table P is returned with the same name it has at the time of performing the `SELECT`.

### `DISTINCT`

Another important statement is `DISTINCT`, which we use to remove duplicate tuples from the query result. To understand this, it's important to note that SQL doesn’t use sets to represent the tuples of a table. Instead, the tuples are represented in a multiset, allowing for identical tuples, especially in intermediate tables where primary key constraints and others don’t apply. So if we want the result to have no duplicate tuples, we need to add `DISTINCT` at the beginning of the attribute list in the SELECT statement.

```pgsql
SELECT DISTINCT P.Name 
FROM Person P;
```

When executing this query, we should see fewer names because some people have the same name. Also, `DISTINCT` is not only used at the beginning of the attribute list. We can also use it to count or perform aggregation operations that affect only non-repeated values, as we’ll see later.

This statement doesn’t have a direct equivalent with any relational algebra operator, as relational algebra formally works with sets where duplicate tuples do not exist, eliminating the need for a specific operator to remove duplicates.

### `WHERE`

With what we've seen so far, we can retrieve data from tables, even removing duplicates or unnecessary attributes for the result - but we haven't introduced a way to keep only those tuples that meet certain conditions.

This is precisely what the `WHERE` clause in SQL does, which has a very similar relational algebra operator called the **selection operator** (don’t confuse with `SELECT`) and denoted as **σ(Table,Condition)**. This operator takes a table with data and a condition applied to the tuples stored in the table, so that only those tuples that meet the condition are considered in the output table provided by the operator.

In other words, all operators output a resulting table, which in this case has exactly the same schema as the input table, with the difference that the output table only contains those tuples that meet the condition we have given to the operator. This lets us perform more complex filtering on the stored data, such as retrieving rentals that have a price higher than a certain amount.

For example, by executing the following query, we’ll get all the tuples from Rental that have a price greater than 10. Specifically, we will get all their attributes, since we used `*` in the SELECT statement.

```pgsql
SELECT * 
FROM Rental AS R 
WHERE R.Price > 10;
```

There are many possible conditions we can use in the WHERE clause. First, we can compare numeric attributes and strings with operators like `>`, `<`, `<=`, or `<>`. These check when two things are different. When using these operators on strings, we are performing alphabetical comparisons.

```pgsql
SELECT * 
FROM Rental 
WHERE Price > 50 AND Duration <> 7;
--The <> operator means values of the Duration attribute that differ from 7--

SELECT Name 
FROM Person 
WHERE Name > 'M';

SELECT * 
FROM Person 
WHERE Name = 'Carol King';
```

As you can see, the operators work the same with numbers as with text. But when using them with text, like in the comparison `Name > 'M'`, we get all the tuples with a Name value that is lexicographically after `'M'`.

There are many options we can set for conditions regarding text values. For example, there are functions like `LOWER()` and `UPPER()` that convert text to lowercase and uppercase, respectively. We can also use `LIKE` to compare text with a pattern similar to a regular expression, where we have **wildcard characters** `%` and `_` (`%` denotes an arbitrary number of characters and `_` a single character).

We can also use the `BETWEEN` operator to check if a text is lexicographically between two others, but we can use it to compare other data types as well.

```pgsql
SELECT * 
FROM Person 
WHERE Email LIKE '%@example.com';

SELECT * 
FROM Person 
WHERE LOWER(Name) = 'carol king';

SELECT * 
FROM Person 
WHERE Name BETWEEN 'A' AND 'M';

SELECT * 
FROM Rental 
WHERE RentalDate BETWEEN '2025-06-01' AND '2025-06-30';
```

Continuing with text operations, we also have the SIMILAR operator from the SQL-99 standard, which allows comparing text with regular expressions, using the same wildcard characters as in LIKE. But these regular expressions aren’t the ones we find in POSIX or Perl - they are simply expressions formed by the LIKE wildcard characters with a series of logical operators similar to those of conventional regular expressions.

```pgsql
SELECT * 
FROM Person 
WHERE Name SIMILAR TO '(John|Jane)%'; --Match names starting with John or Jane--

SELECT * 
FROM Bike 
WHERE Model SIMILAR TO '%[0-9]'; --Bike models ending in a number between 0 and 9--
```

In addition to these operators, there are also the logical operators `AND`, `OR`, and `NOT`, which let us describe more complex conditions.

```pgsql
SELECT * 
FROM Rental 
WHERE (RentalDate BETWEEN '2025-07-01' AND '2025-07-31') AND (Price > 50);

SELECT * 
FROM Bike 
WHERE Weight < 9.0 OR Model LIKE '%Trek%';
--Parentheses are not mandatory, but highly recommended--

SELECT 1 AS ColumnOfOnes
FROM Bike 
WHERE NOT (Weight > 10.0);
```

Here we can see how in the `SELECT` clause of the last query, instead of returning an attribute, we return a literal, which is a numeric value of 1. If we look at the result, we’ll get a table with a single attribute, `ColumnOfOnes`, which is what we want to get by putting it in the `SELECT` list.

As for the tuples, it returns as many as there are in Bike that meet the `WHERE` condition, although we won't see their values. Instead, each tuple will only have the value 1 for the attribute `ColumnOfOnes`, which is what we've named these 1 values.

```pgsql
SELECT *, (Price / Duration) AS Ratio 
FROM Rental 
WHERE (Price / Duration) > 5;

SELECT *, (Price*1.0 / Duration) AS Ratio 
FROM Rental 
WHERE (Price*1.0 / Duration) > 5;
```

When we’re using arithmetic operators, it's important to consider the data types being used. We have all the usual arithmetic operators `+`, `-`, `*`, and `/`. But when using division, if we don't perform any explicit casting, the division might be done as an integer division, providing a rounded result that may be far from what we need.

To get an exact division with all decimals, we can multiply either of the operands by `1.0` to force the DBMS to treat it as a decimal value. But we always have the option to multiply the operation by a certain amount like 100 so that the final result is an integer instead of a decimal, especially when calculating ratios.

Of course, in addition to arithmetic operations, SQL offers a series of functions that allow us to perform more advanced mathematical operations like the following:

```pgsql
SELECT
  ABS(-3.5)      AS abs,
  CEIL(2.1)      AS ceil,
  FLOOR(2.9)     AS floor,
  ROUND(2.345,2) AS round,
  TRUNC(2.345,1) AS trunc,
  SQRT(16)       AS sqrt,
  POWER(3,4)     AS power,
  MOD(17,5)      AS mod;

SELECT 
  EXP(1)       AS e_to_1, --The number e raised to the 1 power--
  LN(10)       AS ln10,
  LOG(10,100)  AS logBase10Of100; --Logarithm base 10 of the number 100--

SELECT
  SIN(PI()/2)   AS sin90deg,
  COS(0)        AS cos0deg,
  TAN(PI()/4)   AS tan45deg;
```

On the other hand, SQL allows performing bit-level logical operations, such as a bitwise AND of the binary representation of two numbers, or a shift of their bits, among others.

```pgsql
SELECT
  9  & 5   AS bitwiseAnd,
  9  | 5   AS bitwiseOr,
  9  # 5   AS bitwiseXor,
  1 << 3   AS shiftLeft,
  16 >> 2  AS shiftRight;
```

Finally, if we want to check whether an attribute contains the value `NULL` or not, we can’t use the `=` operator. Instead, we have to use a specific operator called IS for this comparison:

```pgsql
SELECT * 
FROM Person 
WHERE Email IS NOT NULL; --NULL can't be compared with = operator, but with IS --
```

### `UNION`, `INTERSECT`, and `EXCEPT`

There are other relational algebra operators that are useful and have equivalent SQL statements, like those that operate on sets of tuples. So far, we have treated tables as if they were multisets because SQL allows duplicate tuples by default. But there are situations where it’s clearer to use operations on tables by treating them as if they were sets of tuples.

```pgsql
SELECT BikeFK AS BikeID 
FROM Rental 
WHERE Duration > 3 
UNION 
SELECT BikeFK 
FROM Rental 
WHERE Price <= 15;
```

For example, when we make a query, it returns a table with tuples, which we can see as a set of tuples. So, if we have several queries that return tables with the same number of columns and all of them have compatible data types (meaning they’re either the same or convertible by the DBMS), then we can perform a set operation between them, like a union of both sets of tuples. This in turn results in another set of tuples containing all those from both initial sets.

We do this using the `UNION` operator, which by default removes duplicate tuples since it treats the tables as sets of tuples. In this specific example, we’re performing a union between a set of tuples with the schema (BikeID) and another (BikeFK). Since both schemas have the same number of attributes with the same data types, regardless of their names, we can perform their union, resulting in a final table that contains all the tuples from both, removing duplicates.

```pgsql
SELECT PersonFK, RentalDate AS DateName 
FROM Rental 
WHERE RentalDate < '2025-01-01' 
INTERSECT 
SELECT PersonFK, RentalDate AS DateName2 /*This name is not preserved, the above one does*/ 
FROM Rental 
WHERE RentalDate > '2024-01-01';
```

Besides performing a union, we can also carry out other common set operations like intersection or difference. For example, with `INTERSECT`, we only keep the tuples that are in both sets of tuples, removing duplicates, as long as we’ve made sure that both sets are valid for performing a set operation between them.

This means that to apply `INTERSECT`, we have to ensure that the schema of both sets is compatible, both in the number of columns, in this case, 2, and in their respective data types. As for the names, we see here that it doesn't matter what the attributes are called, since the result will always retain the schema name from the first set in the operation.

```pgsql
SELECT PersonFK, RentalDate 
FROM Rental 
WHERE RentalDate < '2025-01-01' 
EXCEPT ALL
SELECT PersonFK, RentalDate 
FROM Rental 
WHERE RentalDate > '2024-01-01';
```

Lastly, we can also calculate the difference between several sets with `EXCEPT`, which in some DBMS is called MINUS. This is the only operator where the order of the sets matters, meaning the one above discards the tuples that exist in the set below, so we are left with all the tuples that are in the first set but not in the second. Like the previous ones, this operator also removes duplicate tuples, so if we need to keep them, we have to add ALL after the set operator.

### Nested query

We talked about nested queries back at the beginning as a way to use the result of one query within another query. Essentially, that's what it is, but SQL provides a series of specific operators that are useful when working with nested queries in a `WHERE` clause for example, since they can’t only be placed in the `FROM` clause.

```pgsql
SELECT *
FROM (
    SELECT PersonFK,
      RentalDate
    FROM Rental
    WHERE RentalDate > '2024-01-01'
  ) AS T
WHERE T.RentalDate <= '2024-06-06';
```

To start, nested queries take advantage of the fact that a query always returns a table, allowing us to use that result as an intermediate table in another query's computation.

For example, here we first get the tuples from Rental with a date later than 2024 in the subquery of the `FROM` clause. Then in the “outer” query, we assign the alias T to the result of this subquery, from which we get all its tuples with a date earlier than `'2024-06-06'`.

```pgsql
SELECT *
FROM Rental R
WHERE R.RentalDate > '2024-01-01'AND R.RentalDate <= '2024-06-06';
```

As you might guess, when doing this, SQL internally first resolves the subquery in the `FROM` clause. This means it retrieves all the tuples that the subquery needs to return, and then applies the filter defined in the `WHERE` clause to all of them. So a condition is first evaluated on all the tuples from Rental, and then another condition is applied to all the resulting tuples from the query. This creates extra work (computation) to first obtain and potentially store in memory the tuples from the subquery and then filter them again.

On the other hand, this query could have been resolved more simply, as shown above. Here, the Rental table is used directly in the `FROM` clause, and filtering is applied with the two conditions on **RentalDate** "together" in a single `WHERE` clause. This means that only the tuples from Rental need to be traversed, instead of traversing them and then having to filter the tuples from a subquery again. This saves unnecessary computation as well as possible memory that the DBMS might use to store the resulting tuples from the subquery in memory.

With this example, we’ve seen that the same query can be resolved in a more or less computationally efficient way depending on how we plan to implement it. Although, generally, all modern DBMS have the **Optimizer** component in their architecture, which automatically applies certain [<VPIcon icon="fas fa-globe"/>optimization techniques](https://geeksforgeeks.org/dbms/advanced-query-optimization-in-dbms/) to the query without us having to worry about it. We won’t go into detail about these techniques here.

In turn, nesting these queries allows us to solve more complex problems with the help of operators like `EXISTS`. Specifically, we mainly use `EXISTS` in a `WHERE` statement before a nested query to check if the nested query contains any tuples or not. In other words, if we consider it as a multiset of tuples, `EXISTS` tells us whether that multiset is empty or not.

```pgsql
SELECT B.*
FROM Bike AS B
WHERE EXISTS (
    SELECT *
    FROM Rental AS R
    WHERE R.BikeFK = B.BikeID
  );
```

For example, to find out which bikes from Bike have been rented at least once, we select all those tuples from Bike that have a tuple in Rental associated with the bike we are checking.

To understand this, you need to keep in mind that a SQL query is usually executed by scanning the tuples of the tables from top to bottom. So the `WHERE` clause of the outer query is actually executed for each bike in Bike, which is the table we traverse in the FROM clause.

So for each bike, we execute a nested query that returns all rentals of that bike, as it keeps the tuples from Rental whose foreign key BikeFK points to the BikeID attribute of the table with alias B. This is called **correlated nesting** because we’re using the table from the outer query in the nested query. This means we’re forcing SQL to recalculate it each time the `WHERE` condition is checked on a tuple from Bike.

With this, if the nested query contains any tuple, it implies that the bike has been rented at least once. And we can detect this with `EXISTS`, which checks if the resulting table from the nested query returns any tuple.

Since we’re simply interested in knowing if it contains any tuple, we don’t need to return any specific attribute in the nested query, although it’s generally considered good practice to return `*`, or a constant like 1. Another way to solve the previous query with a different operator is by using `IN`. This operator checks if a certain value or tuple is contained in a column or table.

```pgsql
SELECT B.*
FROM Bike AS B
WHERE B.BikeID IN (
    SELECT Rental.BikeFK
    FROM Rental
  );
```

For example, in this case, we build a nested query in the `WHERE` clause that contains only the foreign key BikeFK from the Rental table, where all the BikeID values referenced by the rental tuples are found. In the outer query, all the tuples from Bike are traversed. It checks a condition where the BikeID from the Bike table must belong to the resulting table from the nested query to be considered a bike that’s been rented at least once.

So to solve this query, we need to know, for each bike, if its primary key BikeID is referenced by the corresponding foreign key of any tuple in Rental.

For this, we can use `EXISTS` as before to check if there is any tuple in Rental that references the specific primary key value of Bike, or we can use `IN` to directly check if the primary key value BikeID of the bike we are traversing in the outer query is present in the foreign key column of Rental that we get with the nested query.

Continuing with the equivalent ways to solve the previous query, we can also replace the `IN` operator with **\=ANY**. Intuitively, we can understand this as checking if the value `B.BikeID` is equal to any of the values in the column that we got with the nested query (which is equivalent to what the `IN` operator does).

```pgsql
SELECT B.*
FROM Bike AS B
WHERE B.BikeID = ANY (
    SELECT Rental.BikeFK
    FROM Rental
  );
```

In other words, conceptually, checking if something belongs to a set is equivalent to checking if it’s equal to any of the elements contained in the set. Ultimately, the `ANY` operator allows us to check if a certain value meets a condition with respect to any of the values stored in a nested query - that is, in a multiset, since we can do it with tuples as well as values.

```pgsql
SELECT B.*
FROM Bike AS B
WHERE (1, B.BikeID) = ANY (
    SELECT R.PersonFK, R.BikeFK
    FROM Rental R
  );
```

For example, instead of checking if a specific value of a single attribute is in the column from the nested query, we can perform the check with a complete tuple.

Here, the nested query returns the foreign key values of the tuples from `Rental`, so in the outer query, we can check which bikes have been rented at least once by the person with the primary key `PersonID=1`. Or put another way, for each tuple in `Bike`, we check if there is any tuple in the nested query table in the form `(1, B.BikeID)`. This would indicate that the person with the primary key `PersonID=1` has rented the bike at least once.

Lastly, the `IN` operator is also equivalent to the `NOT <> ALL` operation, which is more complicated to understand. Essentially, we want to check if the tuple `(1, B.BikeID)` is contained in the result of the nested query.

```pgsql
SELECT B.*
FROM Bike AS B
WHERE NOT (1, B.BikeID) <> ALL (
    SELECT R.PersonFK, R.BikeFK
    FROM Rental R
  );
```

With `<> ALL`, we check if the tuple is different from each and every tuple stored in the nested query. Then, by negating that result with `NOT`, we can determine if that condition is not met (that is, the tuple is not different from each and every tuple in the nested query). This would mean it’s equal to at least one of them, or in other words, it’s contained in the multiset returned by the nested query.

To understand the `ALL` operator, we can try to get the bike with the lowest weight in the entire Bike table. To do this, with a nested query, we can get all the weights from the Bike table. Then in the outer query, we can go through all the tuples in Bike and check if each one’s weight `B.Weight` is less than or equal to each weight gotten with the nested query using `<= ALL`.

```pgsql
SELECT *
FROM   Bike B
WHERE  B.Weight <= ALL (
    SELECT Weight
    FROM   Bike
);
```

If this is true, then that weight will match the lowest in the entire table, so the `WHERE` condition will be TRUE, and the corresponding tuple from Bike will be returned in our outer query.

In SQL, conditions usually return `TRUE` or `FALSE` values depending on whether they are met. But when comparing with `NULL` values, `UNKNOWN` is returned, since there are times when a nested query unexpectedly returns `NULL` values. This causes conditions that compare with those values to not result in logical truth values, but in the special value `UNKNOWN`.

### `JOIN`

The `JOIN` operators also have an equivalent in relational algebra. Their main purpose is to gather information spread across multiple tables so that all the data can be operated on in a single intermediate table.

For example, when we look at the information in the Rental table, we see that it has foreign keys referencing Bike and Person, but the Rental table itself doesn’t contain all the information we might need about the bikes or the people. So, if we want to query the rentals and the names of the people involved in those rentals, we’ll need to apply a `JOIN` operation on both tables.

```pgsql
SELECT *
FROM Rental, Person;
```

There are several types of `JOIN`, all of which have an almost direct equivalence in relational algebra operators. The simplest one is the implicit `JOIN` shown above, which is denoted by using multiple tables in a `FROM` statement separated by commas. We can use as many tables as we want here, as long as there are no ambiguities in their names.

Note that if we perform an implicit `JOIN` of a table with itself, we’ll need to assign different aliases to the different uses we make of it.

Before seeing what the query does, it's useful to understand the Cartesian product operation in detail, as it’s the foundation of all SQL `JOIN` operators.

The **Cartesian product** is a mathematical operation that takes two sets as input, which in SQL are tables or multisets with tuples, such as table `A` with tuples `{{a},{b},{c}}`, and table `B` with tuples `{{1},{2},{3}}`. As output, the operation generates a new multiset of tuples where each row of A is **combined** with each row of B, resulting in the table or multiset `A×B={{a,1},{a,2},{a,3},{b,1},{b,2},{b,3},{c,1},{c,2},{c,3}}`.

As you can see, if table `A` has `n` tuples and table `B` has `m` tuples, the Cartesian product will generate `n*m` tuples, where each one takes values from all the attributes of table `A` and table `B` (since the result of the operation includes all possible **“pairings“** we can make between tuples from both tables).

So going back to our query, as you can see in the result, the implicit `JOIN` performs the Cartesian product of the two tables. It doesn't matter if their names repeat, as each repetition can be accessed through a different alias.

Regarding the tuples it contains, we see that the Cartesian product returns tuples where each possible tuple of Rental is combined with each possible tuple of Person. This forms tuples with values in all the attributes of the resulting `JOIN` table.

The implicit join has no filtering criteria or additional functionality - it simply returns the complete Cartesian product of the tables involved in the operation.

Its name, implicit, comes from the fact that the `JOIN` operator and the type of `JOIN` we want to perform aren’t explicitly written. Instead, it's enough to list several tables separated by a comma in the FROM clause.

In addition to the implicit `JOIN`, we also have the explicit `JOIN`. It can be of various types depending on the filtering or conditions applied to the Cartesian product.

For example, instead of performing a Cartesian product between both tables with an implicit join, we can also do it explicitly with a `CROSS JOIN`. This does exactly the same thing but with explicit syntax: we specify the `JOIN` operation to perform and its type, `CROSS`. This indicates the execution of a Cartesian product like the previous one.

```sql
SELECT *
FROM Rental CROSS JOIN Person;
```

Besides the `CROSS` type, there are other types that provide additional functionalities to the `JOIN`, allowing us to filter the tuples we get from a Cartesian product.

For example, so far with the Cartesian product, we have obtained all combinations of tuples from Rental and Person. If there are N tuples in Rental and M tuples in Person, then the Cartesian product will return `N*M` tuples - meaning all possible combinations of tuples from both tables we are working with.

If we look at the resulting table from this operation, we will see that some values of different attributes like PersonPK and PersonID match in the same tuple. This means a tuple from Rental has been combined with a tuple from Person so that this is the person referenced by the foreign key in Rental. In other words, we have a tuple that not only contains the information from Rental but also has the information from the Person tuple representing the person who made that rental - and it’s been"concatenated" or combined with it.

So if we want to keep only those tuples from the Cartesian product where PersonFK matches PersonID from the Person table, we could apply a condition in a `WHERE` clause to filter those tuples. But by doing this, we would first create all possible tuples from the Cartesian product and then go through them all to filter, which is not entirely optimal.

There are specific types of `JOIN`s that can help us perform this filtering more efficiently:

```pgsql
SELECT *
FROM Rental AS R CROSS JOIN Person AS P
WHERE R.PersonFK=P.PersonID;

SELECT *
FROM Rental R INNER JOIN Person AS P ON R.PersonFK=P.PersonID;
```

To implement this query, we can use a condition in a `WHERE` clause, or we can use an `INNER JOIN`, which allows us to set a condition in the ON clause.

If we use a `WHERE` clause, we’ll be filtering all the tuples obtained from the complete Cartesian product resulting from the `CROSS JOIN` using a condition. But to avoid creating the entire Cartesian product (which isn’t efficient), we can use an explicit `INNER JOIN`. Here, we can provide a condition in the ON clause so that only the tuples from the Cartesian product that meet that condition are actually constructed.

In the `ON` clause of an `INNER JOIN`, we can put any type of condition on the tuples we want to get. But there are times when these conditions are simple and only involve equality between attributes, which may even have the same name.

```pgsql
SELECT *
FROM Person P1 CROSS JOIN Person P2
WHERE P1.PersonID=P2.PersonID;

SELECT *
FROM Person P1 INNER JOIN Person P2 ON P1.PersonID=P2.PersonID;
```

For example, if we perform the Cartesian product between the Person table and itself, and we want to keep only those tuples where the PersonID attributes of both tables match, we can use an `INNER JOIN` with the condition that the PersonIDs of both tables being combined are equal. This way, only the tuples that meet this condition will be constructed (unlike the previous query where using a `CROSS JOIN` implies constructing all tuples of the Cartesian product, which requires more computation).

In these types of situations, instead of using an `INNER JOIN`, we can take advantage of another type of `JOIN` like the `NATURAL JOIN`. This returns only those tuples where the values of all attributes with the same name match.

```pgsql
SELECT *
FROM Person P1 NATURAL JOIN Person P2;

SELECT *
FROM Person P1
  NATURAL JOIN (
    SELECT PersonID,
      Name AS Name2,
      Birth AS Birth2,
      Email AS Email2
    FROM Person
  );
```

To understand this, we can perform a `NATURAL JOIN` between the Person table and itself. First, if we don't rename any attribute, then all will have the same name in both tables - so the `NATURAL JOIN` will impose an equality condition for each attribute. This means that it’ll return only those tuples that satisfy `P1.PersonID=P2.PersonID`, `P1.Name=P2.Name`, and so on for the rest of the attributes, since they have the same name despite being in tables with different aliases. This will result in the same Person table, as the `NATURAL JOIN`, in addition to imposing these conditions, "merges" attributes that meet these conditions. So if they have the same name, it leaves only one occurrence of them, not both (as happens in other types of `JOIN`s).

But if we rename the attributes of one of the tables except for `PersonID`, we’ll see that `NATURAL JOIN` only imposes the equality condition `P1.PersonID=Person.PersonID`, since `PersonID` is the only attribute that’s exactly the same in both tables.

In the resulting table, we’ll get the same as before but with the renamed attributes included, as they aren’t discarded or subjected to any condition that makes them unnecessary. Even if we rename `PersonID` as well, we’ll get the Cartesian product of `Person` with itself - because if none of the attributes have the same name in both tables, then `NATURAL JOIN` doesn’t impose any equality condition.

Another option we have to impose equality conditions on attributes with the same name in both tables is to use an `INNER JOIN`. Instead of declaring conditions in an `ON` clause, we use a `USING` clause where we define the attributes on which equality conditions are imposed. These must have exactly the same name in both tables.

```pgsql
SELECT *
FROM Person P1 INNER JOIN Person P2 USING (PersonID);
```

For example, in the query above, we are getting the tuples from the Cartesian product of `Person` with itself that satisfy `P1.PersonID=P2.PersonID`.

The main difference with `NATURAL JOIN` is that `NATURAL JOIN` tries to impose this equality condition on all possible attributes with the same name. But with an `INNER JOIN` and `USING`, we decide which equality conditions are imposed on which attributes (as long as they have the same name in both tables). Otherwise, the DBMS might generate an error.

Also, when we use `USING` in combination with an `INNER JOIN`, only one occurrence of the attributes with the same name appears in the resulting table, just like with `NATURAL JOIN`.

Lastly, it’s important to note that when using `ON` to declare a condition, no attribute is removed from the resulting table of the **`JOIN` operation**, since the condition can be **very diverse** in nature. This means it doesn't necessarily have to be an equality between several attributes.

But when you’re using `USING` in combination with an `INNER JOIN` (and imposing an equality condition on the attributes declared in the `USING` clause), all repetitions of those attributes will be removed from the resulting table. So, if we impose an equality condition on several attributes with the same name, all but one of their occurrences will be deleted.

For example, in a table with two attributes called `PersonID` but coming from different tables or elements with different aliases (same `Person` table but different alias), `USING` would remove one of their occurrences. This would leave only one `PersonID` attribute in the resulting `JOIN` table, while ON would not remove any of the occurrences. And. this would result in the final table containing both original `PersonID` attributes.

```pgsql
SELECT *
FROM Person P LEFT JOIN Rental R ON R.PersonFK = P.PersonID;
```

Continuing with the types of `JOIN`, there might be a case where a person has never rented a bike, so there won't be any tuple in the Rental table referencing that person. This is possible due to the minimum multiplicities on the Rental side in the entity-relationship diagram (that don’t require any person to have rented a bike).

So if we want to build a table that shows information about all people along with information about all the rentals they’ve made, the first thing we may think of is performing an `INNER JOIN` between them. And we’d add a certain equality condition on the foreign key attribute of Rental that references the primary key of the Person table.

But there may be people who have never rented. abike, so if we do an `INNER JOIN`, the information about these people won’t appear in the table. To make sure that they appear, we need to use an `OUTER JOIN` instead of an `INNER JOIN`. We also need to specify which table we want to force to have its data appear by putting `LEFT` or `RIGHT` before the type of `OUTER JOIN` (or we can simply use `LEFT JOIN`, for example).

This way, if we use `LEFT JOIN`, we’re forcing the data from the table on the left of the `JOIN` to appear in the resulting table. If they have no match in the table on the right (meaning if they have no rental), then the other attributes will be filled with NULL values, as we saw in the result of the previous query.

```pgsql
SELECT *
FROM Rental R RIGHT OUTER JOIN Person P ON R.PersonFK = P.PersonID;
```

In the same way, if we use `RIGHT JOIN` and reverse the order of the tables, we’ll do the same but force the data from the table on the right to appear in the resulting table, filling the attributes of the left table with `NULL` in case there’s no match.

But if we don't reverse the order and use `RIGHT JOIN`, then since all rental tuples must reference a person, no tuple will need to be filled with `NULL` because all of them will have associated person information in the Person table.

Finally, if we want to use both `RIGHT` and `LEFT` in a join and force the data from both tables to appear (which would fill in `NULL` on the side that corresponds to each tuple), we can use a `FULL JOIN`.

```pgsql
SELECT *
FROM Person P JOIN Rental R ON R.PersonFK = P.PersonID;
```

In this last type of `JOIN`, we've seen that specifying `OUTER` is optional when using `RIGHT`, `LEFT`, or `FULL`. But by default, if nothing is specified, the `JOIN` operator is treated as an `INNER` type, requiring a condition with `ON` or `USING` afterward.

### Aggregation

With `join`s, we can now combine several tables and gather their information into one. But there are still certain operations we can't do easily, like counting the rows in a table, summing the values of a column, calculating their average, and so on.

All operations of this nature that involve values from a multiset (table) of tuples are called aggregation operations. Their goal is to perform a calculation on a series of tuples and are the basis of analytical queries.

```pgsql
SELECT COUNT(*) AS rentalCount,
  SUM(Price) AS income,
  AVG(Price) AS averageRentalPrice,
  MAX(Price) AS maxRentalPrice,
  MIN(Price) AS minRentalPrice
FROM Rental;
```

SQL offers a number of them (which don’t have a direct equivalent with relational algebra operators): `COUNT()`, `SUM()`, `AVG()`, `MIN()`, and `MAX()`.

### `COUNT()`

We can use `COUNT()` to count how many rows are in a table, including tuples where all values are `NULL`. So by declaring `COUNT(*)` in the `SELECT` clause, we’ll get the number of tuples in the table specified in the `FROM` clause.

```pgsql
SELECT COUNT(*), COUNT(Price), COUNT(DISTINCT Price)
FROM Rental;
```

But the function can also perform aggregation on a specific column. So instead of counting tuples, it counts how many values exist in a certain attribute, including duplicate values and ignoring `NULL`s.

So if we want to count only how many distinct values there are in Price, we can use `DISTINCT` as shown above.

As for the column names we get from these operations, it's not mandatory to assign them an alias and rename them, but it's very convenient for identifying which calculation is stored in each column of the resulting table.

```pgsql
SELECT COUNT((PersonFK, BikeFK))
FROM Rental;
```

In addition to a single attribute, `COUNT()` can count how many combinations of values from a certain set of attributes are in the table. Specifically, in this example, we are counting how many **(PersonFK, BikeFK)** values are in the table. This may not match the total number of tuples since `NULL`s are ignored here, unlike in the `COUNT(*)` operation where they are also considered. We can also use `DISTINCT` here, as long as the attributes whose value combinations we want to count are in parentheses.

```pgsql
SELECT SUM(2*Price), AVG(Price)
FROM Rental;
```

### `SUM()`

`SUM()` calculates the sum of a certain numeric attribute of a table, or an attribute that can be converted to numeric. It takes as input the attribute from which we want to get the sum of all values present in the table. Note that, besides the attribute, `SUM()` accepts expressions that result in a single attribute. That is, if instead of **Price** we provide `2*Price`, or `Price+Price`, then those operations will be summing a series of attributes whose result will be stored in a single attribute. This is given as input to `SUM()`.

If all the values of the attribute are `NULL`, `SUM()` returns `0`. Unlike `COUNT()`, in this case, we can’t sum several attributes at once, meaning `SUM()` only takes one attribute as input, regardless of whether we get it through an arithmetic expression.

### `AVG()`

Similarly, `AVG()` calculates the average of the values taken by a single attribute, ignoring `NULL`s. Unlike `SUM()`, this function returns `NULL` when all the values of the input attribute are `NULL`, since internally it can be calculated as `SUM()/COUNT()`.

So if `SUM()` returns 0 when counting an attribute full of `NULL`s and `COUNT()` ignores those `NULL` values, the average will be 0/0, which is undefined - causing `AVG()` to return `NULL`. It’s also important to note that if we use `DISTINCT`, both the sum and the average will be different.

```pgsql
SELECT MIN(Price), MAX(Price)
FROM Rental;
```

### `MIN()` and `MAX()`

Finally, the `MIN()` and `MAX()` operations take an attribute as input and return the minimum or maximum value found in the tuples stored in the table, respectively. If all the values of that attribute are `NULL`, they also return `NULL`, as a coherent minimum or maximum value can’t be established since `NULL`s are ignored.

### `GROUP BY`

If we try to use aggregate functions in the `SELECT` clause along with other attributes, the DBMS will give us an error because these types of functions are usually used together with the `GROUP BY` statement (this also doesn't have a direct equivalent in relational algebra).

To understand how `GROUP BY` works, we can calculate the sum of all the rental prices that a certain person has made in the system.

```pgsql
SELECT SUM(Price)
FROM Rental R
WHERE R.PersonFK=5;
```

To do this, we access the Rental table and use a `WHERE` clause to filter all rental tuples for a certain person using their foreign key that references the person making the rental. Then, with `SUM`, we get the sum of the Price attribute from the final table, which contains the prices of all rentals made by that person.

If we wanted to do it by name instead of PersonID, we would need to do a `JOIN` with the Person table and filter by the Name attribute of Person (although this isn’t important for understanding `GROUP BY`).

```pgsql
SELECT SUM(Price) AS PriceSum
FROM Rental R INNER JOIN Person P ON R.PersonFK=P.PersonID
WHERE P.Name='Carol King';
```

Now, if we want to calculate this value for the rest of the people in the database who have ever rented a bike at least once, we would have to run this query multiple times for each person in the system, which isn’t practical. Instead, we can take advantage of the fact that the Rental table itself has the foreign key PersonFK for people who have rented bikes - and we can use this to calculate this sum for all of them more simply using `GROUP BY`.

```pgsql
SELECT R.PersonFK, SUM(Price) AS PriceSum 
FROM Rental R 
GROUP BY R.PersonFK;
```

As you can see, this query returns all the people who have ever rented a bike - meaning those referenced from the Rental table. For each one, it calculates the sum of the prices of their rentals. This is possible thanks to `GROUP BY`, which groups all the tuples in the Rental table by the PersonFK attribute.

Since each person can have multiple rentals in the Rental table, we need to get all the tuples that reference each person and group them so that we can perform an aggregation operation like `SUM()` on one of the attributes.

In this case, we do the grouping with the PersonFK attribute, which identifies the person who made the rental. So since all the tuples in Rental with the same value in that attribute belong to the same person, they are grouped by that attribute to form groups of tuples, one for each person.

With this, we can then return the attribute that was grouped (which must be included in the `SELECT` when using `GROUP BY`) along with the results of the aggregation operations calculated on those groups.

```pgsql
SELECT DISTINCT Price
FROM Rental;

SELECT Price
FROM Rental
GROUP BY Price;
```

When we use `GROUP BY` and partition the tuples of the table into groups, each group is "identified" or represented by one value of the attribute we are grouping by. This means that when we return a result to the user, for **each group**, they receive a single **tuple** where the attribute used for grouping takes the value of the "representative" of that group, instead of receiving multiple tuples per group.

For example, to get all the distinct prices from the Rental table, we can use `DISTINCT` directly, or we can also group by that attribute, which results in forming different groups of tuples, one for each distinct price. Finally, when returning Price after grouping, the distinct values of Price that form the different groups of tuples are returned, meaning only the distinct Price values are obtained.

It’s also worth noting that we can group by several attributes at once, not just one. In this case, we would generate groups of tuples based on the unique combinations of values those attributes take in the table.

Finally, when we use the `GROUP BY` statement in a query, we might want to filter and keep only the tuples whose aggregation operation results meet a certain condition. For example, to get only the people whose total rental price sum is greater than 100, we might think of using a WHERE clause with the following condition:

```pgsql
SELECT R.PersonFK, SUM(Price) AS PriceSum
FROM Rental R
WHERE PriceSum > 100
GROUP BY R.PersonFK;

SELECT R.PersonFK, SUM(Price) AS PriceSum
FROM Rental R
GROUP BY R.PersonFK
HAVING SUM(Price) > 100;
```

But if we use that condition in the `WHERE` clause, the DBMS will give us an error because we can’t impose conditions on the aggregation calculations in the groups in a `WHERE` clause. We also can’t refer to them with the alias we give them, since the alias is applied at the end of the query when the result is provided to the user.

So instead of using `WHERE`, when we want to implement this type of condition, we use HAVING. Instead of the alias, we use the expression `SUM(Price)` itself to refer to the sum of Price in each group. Using `WHERE` isn’t prohibited, because before doing the grouping, we can filter the data that appears in the FROM table, thus grouping fewer tuples.

### ORDER BY

Finally, if we want to sort the tuples of a table, we can use the ORDER BY clause. It lets us we specify one or more attributes on which the sorting is performed as well as a direction (which can be ASC or DESC for ascending or descending order, respectively).

```pgsql
SELECT *
FROM Person
ORDER BY Name ASC;

SELECT *
FROM Person
ORDER BY (PersonID, Name) ASC;
```

In sorting, certain attributes have higher priority. Those we place more to the left are sorted first, as in this last query that sorts the tuples of Person by their `PersonID` values and then by name.

So using all these clauses, we can start making SQL queries to get almost any type of result we need. As we have seen, queries are composed of a series of statements or clauses where each one performs a certain action on the tuples of a table.

These statements usually follow an **order of appearance in the query** that is important to follow to avoid DBMS errors. The order is as follows:

1. `SELECT`
2. `FROM`
3. `WHERE`
4. `GROUP BY`
5. `HAVING`
6. `ORDER BY`

But at a low level, the execution of these statements or equivalent relational algebra operators follows a different order than the one we use when writing the query. It is as follows:

1. `FROM`
2. `JOIN … ON`
3. `WHERE`
4. `GROUP BY`
5. `HAVING`
6. `SELECT`
7. `ORDER BY`

First, data is fetched from a table with the `FROM` clause, which may need to perform certain `JOIN` operations between multiple tables to have the data ready. Then, the data is filtered using the conditions we set in the `WHERE` clause, if we use it. After that, the tuples are grouped and filtered again if we use `GROUP BY`. Finally, the `SELECT` clause is applied to extract the attributes we are interested in from the final table, which we rename and order if necessary.

So as you can see, when we write a SQL query, we must use the clauses in a specific order. But we should keep in mind that the DBMS, at the physical and storage level, doesn’t execute these statements in the same order we write them. In fact, we don't have to worry too much about this internal order because it’s [<VPIcon icon="fa-brands fa-stack-overflow"/>transparent](https://stackoverflow.com/questions/17384020/what-do-transparent-and-opaque-mean-when-applied-to-programming-concepts) (that is, handled automatically and hidden) to the user. This means we don't have direct control or "see" how the execution of the clauses is carried out internally by the DBMS, inspect the plan with `EXPLAIN/EXPLAIN ANALYZE`.

Regarding the internal execution order, the DBMS usually reorders, combines, or transforms the clauses into others, all while constructing a physical execution plan for the query. This involves generating a plan for the operations and internal resources needed to execute it optimally (hence the reordering).

This is important to know when constructing a query, as the way you program it can affect the efficiency of the query, even though the DBMS can help by automating much of the optimization process. You don’t have to use all these statements in a query, of course. But those you do use should respect the order in which they should be written, otherwise, the DBMS will likely end up throwing an error.

---

## Views

To finish with DML, let's look at a possible application of queries when defining DDL elements in SQL. Originally, we saw that DDL statements allowed us to create databases, tables, and similar elements. One of them worth highlighting is **views**, which are virtual tables that let us abstract information from the tables in a database.

Our database is made up of a schema or set of tables where the information is stored, but we might need to "view" that information differently than how it's defined in the schema itself. For this, we define a view that lets us query that information from the database using a different structure than the one used to store it.

```pgsql
CREATE VIEW RentalOverview AS
SELECT P.PersonID AS PersonID,
  P.Name AS ClientName,
  CURRENT_DATE - P.Birth AS ClientAge,
  B.BikeID AS BikeID,
  B.Model AS BikeModel,
  R.RentalDate AS RentalDate,
  R.Duration AS RentalDurationDays,
  R.Price AS RentalTotalPrice
FROM Rental R
  JOIN Person P ON R.PersonFK = P.PersonID
  JOIN Bike B ON R.BikeFK = B.BikeID;
SELECT *
FROM RentalOverview;
```

For example, in our database, we have the tables Rental, Bike, and Person, but for convenience or requirements, we might need to see all that information from the tables integrated into a single table with attributes (`PersonID`, `ClientName`, `ClientAge`, `BikeID`, `BikeModel`, `RentalDate`, `RentalDurationDays`, `RentalTotalPrice`).

By default, every time we want to see this integrated information, we would have to manually run a query (or several, depending on the circumstances) to get and integrate that information into a table.

But to simplify this process, there are views that allow us to define a **"virtual" table** containing the integrated information. So, whenever we need that integrated information, we can refer to the virtual table (and this is built using the query we would have had to run manually to construct it). This query is the **definition** with which we declare a **view**, and the view itself saves us from having to run it manually to get the integrated information.

That's why we create a new view in the database that acts as a **virtual table** (meaning it doesn't actually store any information). This is because a view is a table that receives user queries, but to resolve them, it has to fetch information from different tables in the database.

So, as you can see in the view above, the virtual table `RentalOverview` is defined with a SQL query on the tables that do store information. So when we query `RentalOverview`, the DBMS is actually transforming our query using the view's definition to obtain the attribute `ClientName`, for example, which is defined as the name of the person who rented a bike.

In this specific case, our view is gathering all the information from the three tables into one, so when we query it, we have the complete information about the person, bike, and rental that occurred. We don't have to perform the `JOIN`s ourselves, as they are part of the view's definition.

```pgsql
SELECT *
FROM RentalOverview;
```

When querying the virtual table, we’ll get information derived from the base tables, which is shown to us according to the schema we defined in the view. For example, in the database, the birth date of people is stored in the Birth attribute. But the view shows that data differently, displaying age instead of the birth date. Both refer to the same information but are viewed in different ways.

---

## Database Administration

At the logical level where we implement the database with SQL, we need to perform ongoing database maintenance (in addition to data modeling, modification, and querying). This ensures that our data and services are available, optimizes query performance, and provides certain guarantees of security and integrity. This process is part of what is considered **database administration**, which is a task carried out by experts.

### Database users

Before introducing the concept of administration, let’s talk about the different types of users that might use a database. Each of them has a certain objective, responsibilities, and competencies.

To start, we have the **client user**, who uses the services provided by the database. We can see this type of user as an average user of mobile or web applications, or on any platform, using a series of services that involve a database.

Then, we have the **developer user**, who is dedicated to technically implementing the infrastructure, both software and hardware, that supports the applications and services. Developer users are also responsible for defining the business logic of the database, its structure, requirements, and so on. In short, they follow the different design stages we saw at the beginning, especially the conceptual and logical design, although they don’t interact with the DBMS. They simply propose the schema that the data should follow for a specialist to implement on a DBMS.

This specialist is the **database administrator user**, who is responsible for implementing the logical design of the database on a DBMS. To do this, they perform tasks such as choosing the appropriate DBMS for the project in question, installing it, and keeping it updated. They create the database, tables, and other logical elements, manage the security of the DBMS by defining roles, permissions, and security policies, and monitor the database's performance to ensure its availability. They also provide technical support to other types of users and define data backup protocols.

So basically, the administrator is in charge of the implementation during the logical design stage, as well as subsequent stages of possible physical design and storage. They’re also responsible for maintaining the DBMS. Among all these tasks, one of the most critical is optimizing the queries users might make to the system and refining the schemas if necessary to improve performance.

### Database metadata

So far, we have only considered that the database is responsible for storing information (data). These are ultimately generated by the project or application that the database supports, such as the tuples of the tables.

But in addition to these data, the database contains a series of metadata used to manage the data. Essentially, metadata primarily serves to describe another piece of data or provide additional information that helps organize it within the database. Here’s an example:

| **Name** | **Birth** | **Email** |
| --- | --- | --- |
| Alice Johnson | 1985-07-12 | `alice.johnson@example.com` |
| Bob Smith | 1990-03-05 | `bob.smith@example.org` |
| Carol Davis | 1978-11-23 | `carol.davis@example.net` |
| David Brown | 2001-01-30 | `david.brown@example.com` |
| Emily Wilson | 1995-09-14 | `emily.wilson@example.co.uk` |

To understand the idea of metadata, we can introduce the concept of a schema as metadata. In a table, we have a table name, which is metadata that describes the table. This allows us to know which table we are referring to when using that name in a query or other situations.

Besides the name, all tables have a header composed of the names of the attributes located in the first row, which make up the table's schema. These names are used to refer to the attributes or columns, just as the table name is used to refer to the table itself as an object. So the schema is part of the metadata, as it provides meaning to the data stored in the columns, allowing them to be organized.

In other words, if we didn't have the first row with the attribute names, we would have no information about the stored data, as we would lack their semantics. This is precisely what the schema provides as metadata, which lets us manage them.

Apart from table and attribute names, tables usually have associated technical metadata from the DBMS. This metadata indicates the users who own the table or have certain permissions to perform actions on it. It also contains the creation and last modification dates of the table to ensure data security, existing connections, or information about events or locks for managing concurrency.

The table as an object does not store its name and all metadata within itself, but rather in specific places within the DBMS. These specific places are reserved tables for the DBMS called dictionaries, or sometimes catalogs. They utilize the structured nature of the DBMS to store this metadata in a simple way, similar to the storage of the actual data.

Since these places are tables, they also have a name, schema, and metadata, stored in the DBMS in physical data structures, not in other tables. As for their schemas, they are specially referred to as metaschemas.

The metadata in a DBMS varies significantly depending on the specific DBMS we’re using. But in all of them, we’ll always find fundamental information about the database we have implemented, like its name, table names, schemas, constraints, and so on.

Specifically, in PostgreSQL, we can find them in the "schemas" `pg_catalog` and `information_schema`. Here, PostgreSQL refers to a "schema" as a logical container that holds certain tables, views, and similar elements of a database, where many of them are responsible for storing metadata. So a logical container is nothing more than a folder used to group elements to make them more hierarchical and organized.

On one hand, `pg_catalog` is the internal catalog of PostgreSQL, which means it contains all the information necessary to manage the DBMS's operation. But this catalog is very technical and dense, as it’s aimed at managing the entire operation of the system, involving a lot of details that aren’t always necessary for an administrator.

Becuase of this, there’s a standard abstraction of this logical container called `information_schema`, introduced with the SQL-92 standard, which primarily serves to abstract the specific details related to the DBMS's operation and provide the database administrator with a series of views to better visualize and manage the metadata.

To know what `pg_catalog` contains, you can use commands like `dt pg_catalog.*` to see the tables, views, or generally the elements it contains. Among all of them, the most important are:

- `pg_catalog.pg_class`: Stores metadata of database objects, such as tables or views, among others.
- `pg_catalog.pg_namespace`: Stores the names of the schemas (logical containers) of the DBMS
- `pg_catalog.pg_attribute`: Stores the names of the attributes of tables or views, meaning their schemas, as well as their data types or user-defined domains.
- `pg_catalog.pg_type`: Stores the default data types and user-defined types.
- `pg_catalog.pg_attrdef`: Stores the default values defined for the attributes.
- `pg_catalog.pg_constraint`: Stores the definitions of constraints on tables, such as `PRIMARY KEY`, `UNIQUE`, `FOREIGN KEY`, `CHECK`, and `EXCLUSION`, including information about the table they apply to (conrelid), the columns involved (conkey), the update and delete actions on foreign keys (confupdtype, confdeltype), and the name of the constraint (conname), among others.
- `pg_catalog.pg_stat_activity`: Provides real-time information about active sessions on the PostgreSQL server.

As you can see, if we explore the content of `pg_catalog`, we’ll find that it’s very dense and detailed. That's why we have the standard alternative **information_schema**, which simplifies metadata management. It works similarly to `pg_catalog`, serving as a logical container that provides views of the DBMS tables we've seen before to abstract their functionality.

The most significant ones are:

- `information_schema.tables`: Stores a list of all the tables and views in the database.
- `information_schema.columns`: Stores metadata for all the columns of all tables and views.
- `information_schema.table_constraints`: Stores a list of all table-level constraints (primary key, unique, foreign, check...).
- `information_schema.key_column_usage`: Stores a list of columns involved in key constraints (primary, unique, or foreign).
- `information_schema.referential_constraints`: Stores metadata about FOREIGN KEY constraints, such as actions triggered after a deletion or update, among others.

To query the information contained in all these tables or views, you can simply use queries as if you were retrieving data from any other user table. But keep in mind that many of them also contain metadata about the DBMS dictionary or catalog tables themselves, which can complicate understanding the results.

```pgsql
SELECT *
FROM information_schema.tables
WHERE table_name='rental';

SELECT *
FROM pg_catalog.pg_class
WHERE relname = 'bike';

SELECT *
FROM pg_catalog.pg_stat_activity;

/*Get metadata of the PRIMARY KEY constraints we named with "PK"*/
SELECT*
FROM pg_catalog.pg_constraint
WHERE conname LIKE '%pk%';

SELECT*
FROM pg_catalog.pg_constraint
WHERE conname LIKE '%pk%';

SELECT *
FROM information_schema.table_constraints
WHERE constraint_name LIKE '%pk%';
```
