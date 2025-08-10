---
lang: en-US
title: "Chapter 10: Database Design Process Example"
description: "Article(s) > (11/12) How to Design Structured Database Systems Using SQL [Full Book]"
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
      content: "Article(s) > (11/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 10: Database Design Process Example"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/chapter-10-database-design-process-example.html
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
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-10-database-design-process-example"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

So far, you’ve learned about the entire relational model and some basic SQL. Now you can create a relational database on the PostgreSQL DBMS, manage it, and perform queries on it. So let’s apply all this knowledge to a real-world use case.

---

## Database Levels

To do this, we need to remember some of the different levels of the database design process. First, we have the **analysis** phase where we gather the project requirements from the end user or client. Then we create a **conceptual** design, which we subsequently transform into a **logical** design that we can implement on a DBMS.

These are the main levels we need to worry about here. But in addition to these, we have the **physical** level, which focuses on the internal representation of the logical model implementation of the database in the DBMS using DBMS objects like indexes. We also have the **storage** level, which is the closest to the hardware, and is mainly dedicated to organizing the disk files that implement the database functionality on the DBMS. Lastly, we also have the **application** design level that aims to provide the database as a service to the user.

We won’t cover these additional levels in this example due to their complexity and because they aren’t as closely related to the actual database design.

---

## The Database Design Process

When faced with a real problem that requires designing a database, the first thing we need to do is gather as much information as possible from the user or client. We do this to formalize the requirements of the system we’re going to build.

We can interview the client, survey potential users of the service, or use other similar methods. In this case, we won’t directly perform any of these tasks. Instead, we’ll assume that we have certain requirements, and from them we’ve been able to construct an **entity-relationship** diagram that captures them and correctly models the domain of our system. Let’s say it looks like this:

![Entity-relationship diagram that we will work with in this chapter. It represents various entities and relationships, where entities include "Vehicle," "Person," "Car," "Pool," "City," and others.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754234568579/a4165e66-85f1-4a81-b85d-a2be8ea19db3.jpeg)

As you can see from the diagram above (you can enlarge it by opening it in a new tab), the project we’ll work on in this example is an extension of the bike rental domain we’ve used so far.

In addition to a bike rental service, we’ll include other elements that may be present in a real world database model, such as vehicles, places, cities, and so on. We’ll also include actions that can be performed between these elements, like owning a car, residing in a city, booking a cruise trip, or getting a bus pass, among others.

When we’re building this diagram, our most significant decisions involve which concepts are modeled with entities, which are represented through relationships, and which aren’t worth including in our system.

From the entire domain, it's common to encounter a lot of information provided by the client or users that doesn't directly help us model the system, as they don’t expect it to be stored in the database. So all concepts related to information that is not intended to be stored **persistently** are usually not included in the design.

As for the other issues, they are very subjective, and there is no set of rules to follow to know unequivocally which concepts to model with **entities** or **relationships** – or even to determine the **degree** of these relationships (which in this context we will assume is always 2 to avoid complicating the design with relationships involving more than two classes).

---

## Entity-Relationship to Logical Model

But to understand how we can and should make these design decisions, it's useful to understand the **purpose** of each entity in this entity-relationship diagram, as well as the meaning of the elements it comprises or relates to. We also need to understand how it’s been translated to the logical design level.

Before explaining each of the entities, below is the relational diagram we have after the entire logical design phase:

![Relational diagram derived from the previous entity-relationship one.](https://cdn.hashnode.com/res/hashnode/image/upload/v1753355497082/c7f6079b-a88b-4651-a92b-36761151aa80.png)

This diagram is what we will gradually build as we transform entities into tables. Make sure you have both this diagram and the entity-relationship diagram open in separate windows so you can refer to them during the following chapters. This will make everything we discuss easier to understand.

As you can see in the diagram above, it includes some modifications like foreign keys pointing to "loose" attributes such as `Sanction.SanctionID`, instead of the same attribute in the table of the diagram. This aims to prevent the foreign key arrows from crossing excessively. Although this isn’t a standard way to represent the relational logical model, as long as its meaning is specified it’s completely valid.

Some constraints aren’t modeled in the system due to their complexity, which we’ll see as we explain all the entities. That's why there are no notes included in the relational diagram, and we don’t indicate the attributes that can or can’t be NULL. These are helpful to show in the diagram, but it’s not required.

Lastly, during the explanations, we’ll show the SQL code used to create each table. You’ll find the SQL script for creating the entire database at the very end, after I’ve explained all the entities. This is because we’re not going to discuss them in the order they need to be created, in order to respect referential integrity constraints that would cause errors in the DBMS if tables were created in a different order.

### `Person` entity

First, we have the entity `Person`, whose main goal is to model the existence of people in our system. It's important to note that in our domain, there are physical people, where each one is a physical entity that we can abstract through the concept of a person, which has a set of associated characteristics. In other words, even though there are many different people, they all share a set of characteristics that define them as people.

These characteristics are what we’ll model as the attributes of the `Person` entity. These can then be "instantiated," as we saw earlier, resulting in a set of entity occurrences – or in other words, specific people defined by the values of their characteristics or attributes.

To better understand this, we can translate this entity to the logical design level, where, being a single entity, we model it with a single table named `Person` with the corresponding attributes and data types that match the characteristics of people. In this way, the table schema will be the structure that defines "all people," like a template, while the specific people whose information we want to store in the system correspond to the tuples of the table, which will be inserted as we register people in the system.

For the attributes of the entity, we’ll include those that need to be stored persistently, such as name, date of birth, email, and so on. Among all of them, we choose `PersonID` as the **primary key**, which we assume holds the person's government ID. But to illustrate the concept of **surrogate key** in SQL, in the implementation on the DBMS, we’ll implement the `PersonID` attribute as a surrogate key instead of the person's actual ID (since both can uniquely identify each person). So each tuple in `Person` will have a unique and distinct value in that attribute, serving as a superkey, candidate key, and ultimately being selected as the primary key.

In addition to the attributes represented in the entity-relationship diagram, the table we use to model the `Person` entity has other attributes that help implement associations with other entities, specifically foreign keys.

If we look only at the entity-relationship diagram, we will see a series of associations that "leave" or "enter" the Person entity. In other words, all the relationships this entity has are `1-*`, which means the maximum cardinalities on both sides are `1` and `*`, respectively. These maximum cardinalities tell us how many occurrences of the entities can be related to each other. So with this information, we can determine where to place the foreign keys and which attributes they should reference from specific entities.

In the case of Person, we have 12 associations with such multiplicities, of which only one is a relationship where the **"many"** side (the side with the maximum cardinality `*`) is in the Person entity itself. This means that to implement the association between Person and **CruiseLine**, for example, at the logical level, there should be a foreign key on the many side pointing to the entity on the 1 side. Otherwise, if we place the foreign key in CruiseLine and have it reference Person, its attribute could contain an arbitrary number of references to people, leading to the appearance of a repeating group.

On the other hand, the other 11 associations have the **"1 side"** in Person, indicating that there are 11 entities that must have a **foreign key** pointing to Person.

Thus, we know that Person has a foreign key pointing to CruiseLine, even though the attributes that make it up do not appear explicitly in the conceptual diagram. And, since the foreign key has to reference tuples from CruiseLine, it will consist of as many attributes as the primary key of CruiseLine, with the same data types, respectively.

This happens because the foreign key must uniquely reference tuples. So the values of the foreign key attributes should allow us to go to the CruiseLine table, look at the columns of its primary key attributes, and easily find the referenced tuple. So the foreign key in Person will have 2 attributes, not just one.

```pgsql
CREATE TABLE Person (
    PersonID SERIAL PRIMARY KEY,
    Name VARCHAR(32) NOT NULL,
    Birth DATE NOT NULL CHECK (Birth < CURRENT_DATE),
    Email VARCHAR(32) NOT NULL,
    Phone BIGINT NOT NULL CHECK (Phone > 0),
    Nationality VARCHAR(32) NOT NULL,
    NameFK VARCHAR(32),
    FoundationDateFK DATE,
    FOREIGN KEY (NameFK, FoundationDateFK) REFERENCES CruiseLine(Name, FoundationDate)
);
```

Furthermore, as you can see in its DDL, the attributes `(NameFK, FoundationDateFK)` that make up the foreign key don’t have the `NOT NULL` constraint. This is because the foreign key in Person may not reference any tuple from CruiseLine due to the minimum multiplicity of the association on the CruiseLine side (which, being 0, implies that a person might not be a customer of any cruise line).

Semantically, this association, implemented with the foreign key, represents the possibility that a person can be a customer of a certain cruise line, where if they aren’t a customer of any, their foreign key will be `NULL`.

At the same time, a cruise line does not necessarily have to have any customers, as it can be related to zero people at a minimum, according to the minimum multiplicity on the other side. So with both minimum multiplicities at 0, the association as a whole becomes optional, meaning it may not exist at all, as there is nothing that requires it to exist.

If we look at the relational diagram, to represent this entity or table, it's enough to write it in [<FontIcon icon="fa-brands fa-wikipedia-w"/>Datalog](https://en.wikipedia.org/wiki/Datalog) notation, with its name and attributes. The only thing to keep in mind is that the attributes that make up the primary key are underlined, and those that represent foreign keys each have an arrow coming from them pointing to the corresponding attribute of the primary key of the entity or table they reference.

In cases like this where the foreign key is composite, each of its attributes has an arrow pointing to the corresponding attribute of the referenced entity. But the order in which the attributes are written in this diagram is not entirely relevant – meaning we can write them in any order as long as we correctly represent which are primary or foreign keys.

Regarding the DDL, since we will consider **PersonID** as a **surrogate key**, we declare it as [<FontIcon icon="fas fa-globe"/>SERIAL](https://geeksforgeeks.org/postgresql/postgresql-serial/) so the column stores **auto-incrementing** values. This way, to uniquely identify each tuple, the attribute will use an integer value that increases by one as tuples are inserted. This allows us to differentiate all of them by that number.

We’ll specify the primary key with `PRIMARY KEY`, which we can place directly in the attribute declaration if it’s not composite. We’ll specify the foreign key with `FOREIGN KEY`, indicating which attributes reference the primary key of CruiseLine.

The only thing to be careful about is the order of the attributes. Although you can arrange the foreign key in any order in `FOREIGN KEY`, in `REFERENCES`, we must ensure that the attributes of the primary key of CruiseLine are in the same order as those of the foreign key in order to be referenced correctly.

For example, if `NameFK` should reference `Name`, then those attributes will occupy the same position in the tuples where we declare the foreign key and the primary key it points to, without needing to appear in a specific position, as long as the correspondence is maintained.

Now let’s look at what a Person can do.

### Rental entity

In our domain, people can rent bikes, and for each bike rental, we want to store certain information like the time the rental occurred, the duration in hours, the price per hour, and so on. So if we modeled this as an M-N association between `Bike` and `Person`, we couldn't store all this information unless we used an associative entity (which is only valid when the entity itself is weak in identification). But here we prefer to use a surrogate key to uniquely identify the rentals, which avoids making the entity representing them weak in identification.

This is necessary because each rental requires storing associated information, in addition to the person and the bike involved. So an we’ll introduce an entity that relates to both `Bike` and `Person` through `1-*` associations** (each `Rental` associates a bike with a person), storing information about that "event." Then, as it has two associations with the many side in Rental, this entity will have two foreign keys – one to implement each association. One will reference the primary key of the Bike entity and the other the primary key of the `Person` entity.

Here, we need to distinguish between both foreign keys, as each is composed of one attribute, unlike the previous case where `Person` had only one foreign key composed of several attributes. That is, regardless of the attributes that comprise each foreign key, it’s important to distinguish that one aims to uniquely identify a bike while the other uniquely identifies a person.

```pgsql
CREATE TABLE Rental (
    RentalID SERIAL PRIMARY KEY,
    StartTimestamp TIMESTAMP NOT NULL,
    Duration INT NOT NULL CHECK (Duration >= 0), /*Duration of the rental period in hours*/
    HourPrice DOUBLE PRECISION NOT NULL CHECK (HourPrice >= 0),
    BikeFK INT NOT NULL,
    PersonFK INT NOT NULL,
    FOREIGN KEY (BikeFK) REFERENCES Bike(BikeID),
    FOREIGN KEY (PersonFK) REFERENCES Person(PersonID)
);
```

When writing your DDL, the attributes are declared the same as before – the main difference here being that each foreign key has its own `FOREIGN KEY` constraint, which references the primary key attribute of the corresponding table. This is the case because here, both `Bike` and Person have primary keys with a single attribute.

Another important detail to consider is the minimum multiplicity on the Person and `Bike` sides in the associations of the conceptual diagram, where the 1 side of the associations has a minimum multiplicity of 1. This means that a Rental must always be associated with a person and a bike, so their foreign keys can never be `NULL`. This is why the `NOT NULL` constraint is used in the attributes.

As before, at the conceptual level, we don’t show the attributes that form the foreign keys, as the associations themselves and their cardinalities implicitly indicate the existence of foreign keys. But in the relational diagram, we do show these attributes, where arrows indicate the primary key attributes of other entities to which they point. And, since the entity is not weak in identification, none of the foreign key attributes should be underlined.

Regarding the other constraints, we don’t allow any attribute to be `NULL`, as it doesn't make sense for a timestamp to be null, for example, when it’s precisely the valuable information about a rental that we want to store in the database. The other attributes also have constraints like non-negativity, since the duration or the hourly rate can’t be negative amounts.

This way, if someone tries to insert negative values for these attributes, the DBMS will automatically know that the inserted data isn’t valid or correct, since the actual numbers for duration and price can never be negative. This implies that the values for those attributes must be positive to be correct.

### `CarOwnership` entity

Another entity related to Person in the diagram – that is, representing something else a Person can do – is `CarOwnership`. This aims to model that people can have cars, whether bought, rented, or leased. For this, we use the same conceptual structure as with `Rental`, where a person can have multiple cars and a car can belong to many people.

As before, this implicit **`N-M` association** between `Car` and `Person` must store information about the ownership, such as its type, start date, price, and so on. So we’ll use an intermediate entity with `1-*` associations towards both entities, with the 1 side on them.

```pgsql
CREATE TYPE CarOwnershipType AS ENUM('buy', 'rental', 'lease');
CREATE TABLE CarOwnership (
    InsuranceID SERIAL PRIMARY KEY,
    BuyDate TIMESTAMP NOT NULL, /*Date when ownership starts*/
    BuyPrice DOUBLE PRECISION NOT NULL CHECK (BuyPrice >= 0), /*Ownership price, if rental or lease, this price represents a monthly amount*/
    WarrantyEndDate DATE NOT NULL CHECK (WarrantyEndDate >= DATE(BuyDate)),
    OwnershipType CarOwnershipType NOT NULL,
    PlateFK VARCHAR(32) NOT NULL,
    PersonFK INT NOT NULL,
    FOREIGN KEY (PlateFK) REFERENCES Car(Plate),
    FOREIGN KEY (PersonFK) REFERENCES Person(PersonID)
);
```

The table implemented at the logical level is very similar to Rental, as we have a surrogate key that uniquely identifies the tuples, thus preventing the entity from being weak in identification. You can see this directly in the conceptual diagram. There, we have an attribute marked with `{id}` that we provide with semantics equivalent to that of a surrogate key. This means we don't need its identification to depend on any other entity.

In other words, at the conceptual level, `InsuranceID` is a unique identifier provided by an insurance company. To to generate it, they likely used a technique similar to SQL's `SERIAL` auto-increment, although it doesn't necessarily have to be that, as there are [**many others**](/freecodecamp.org/how-to-effectively-manage-unique-identifiers-at-scale.md) with very specific applications.

The value of `InsuranceID` might be provided to us when inserting tuples into our system, where this value would have to meet the primary key constraint and not repeat for any pair of possible tuples. But still, we decided to implement it with a `SERIAL` to make the generation of synthetic data for this database simpler.

Just keep in mind that, in a real situation, if we are provided with this value, we should avoid using `SERIAL` and save the identifier that each tuple has. Since `InsuranceID` is the primary key, no pair of tuples can have the same value in this attribute, but they can have the same start date, price, and so on.

In this table, to restrict the values that the attribute OwnershipType can take, instead of using a `CHECK`, we’ll create a new data type. We could have done this perfectly using a `CREATE DOMAIN`. But instead, we’ll use a [<FontIcon icon="iconfont icon-postgresql"/>`TYPE ENUM`](https://postgresql.org/message-id/49DCDA27.4090901@megafon.hr) to show another way of defining the set of values an attribute can take. It defines the possible values for the attribute, representing an ownership where a person buys, rents, or leases a car. Finally, that `TYPE ENUM` is assigned as the data type of the attribute.

We’ve implemented the most basic domain constraints and problem requirements here, which only involve the `CarOwnership` table itself. For example, we have those requiring the price to be positive or the warranty end date to be after the ownership start date.

On the other hand, we can see that the attribute `BuyDate` has been assigned a `TIMESTAMP` data type, which doesn't exactly match the attribute's name. In this example, such details aren’t as important, since the `TIMESTAMP` was declared this way to provide a time in addition to the date of purchase. But in a real project, you should be stricter with naming attributes according to their characteristics. This will help improve schema clarity and make database management easier.

### `Residence` entity

A person can also reside in a city, so our database must be able to store information about a person's stay in a certain city. We’ll do this using the entity `Residence`, which functions similarly to the previous entities `Rental` and `CarOwnership`, but with some differences.

First, the attributes it stores are:

- the start date of a person's stay in a city (which can’t be null because if the stay exists, it must have started on a date),
- the end date of the stay (which can be NULL because the person may reside in the city for an indefinite amount of time), and
- the address where they reside within the city.

When the EndDate attribute is NULL, it means the person is still residing in the city, as the end date of the stay is not defined. Also, if this date exists and is later than the current date, we can also know that the person still lives in the city until the specified date.

This has implications for identifying the `Residence` entity, as there is no set of attributes within the entity itself that uniquely identifies the tuples of `Residence`. Instead, it’s the start date, along with the references to the person and city, that together uniquely identify it. So since the identification of the entity depends on other entities, `Residence` is a weak entity in terms of identification.

These references work similarly to what we saw earlier in `Rental`, for example, where we had several `1-*` associations with the many side in the `Residence` entity. This implies that for each association, the foreign key is located in the `Residence` entity, pointing to the entity on the other side of the association.

Since there are two such associations in total, there are two foreign keys, each formed by one attribute, because the primary keys of the entities they point to are also formed by a single attribute.

```pgsql
CREATE TABLE Residence (
    StartDate DATE NOT NULL,
    EndDate DATE CHECK (
        EndDate IS NULL
        OR EndDate >= StartDate
    ),
    Address VARCHAR(32) NOT NULL,
    PersonFK INT NOT NULL,
    CityFK INT NOT NULL,
    PRIMARY KEY (StartDate, PersonFK, CityFK),
    FOREIGN KEY (PersonFK) REFERENCES Person(PersonID),
    FOREIGN KEY (CityFK) REFERENCES City(CityID)
);
```

If we look at the relational diagram, we’ll see that the table implementing this entity has its foreign keys underlined because they’re part of the primary key. This helps us identify that the corresponding conceptual entity is **weak in identification**, with some of its primary key attributes being foreign keys.

Also, if we wanted to reconstruct the conceptual entity from the relational diagram, it would be enough to look at the table's foreign keys, which other entities they reference, whether their attributes are underlined or not, and any possible constraints indicated in the relational diagram.

With this, if any of the foreign keys are underlined, the entity is necessarily **weak** in identification, and the **«weak»** role would be specifically placed on the association modeled by that foreign key. The **many** side of that association would be placed on the side of the entity from which the foreign key originates. And we wouldn’t include its foreign key attributes in the conceptual diagram entity.

In its DDL, we can see that the primary key is composed of StartDate along with the foreign key attributes, where each one represents a different foreign key pointing to a certain entity like `Person` or `City` – hence the addition of two FOREIGN KEY constraints. We’ve also added the `NOT NULL` constraint to both foreign keys due to the minimum multiplicity of the 1 side of the associations, which requires a `Residence` tuple to relate a person with a city. If we had `0..1` instead of `1..1` on those sides of the associations, then each foreign key of `Residence` might not reference any person or city, meaning it could be `NULL`.

Regarding the remaining constraints, no attribute can be null except `EndDate`. If it’s not `NULL`, then the date it stores must be after the date the residence began, as it wouldn't make sense for it to be earlier than the start date.

### `ShipAssignment` entity

Another entity that is practically the same as the previous one is `ShipAssignment`, responsible for modeling the assignment of certain cruise ships to cruise lines. That is, a cruise can belong to or be assigned to a cruise line that operates it under its brand for a certain period, just like a person can reside in a city for a certain period.

Being a weak entity in identification, as we can see in its conceptual diagram, we could have represented it with an associative entity and an N-M association between CruiseShip and CruiseLine. But to be consistent with the notation we used in `Residence`, we won’t use an associative entity. Instead, we’ll have the entity interpose in the N-M association, resulting in two `1-*` associations with the **many** side in `ShipAssignment`.

This implicitly indicates that there are two foreign keys pointing to CruiseShip and CruiseLine, respectively.

Also, note that just focusing on the **many** side (which is an easy rule to apply to determine where to place foreign keys just by looking at the conceptual diagram) isn’t by itself a good practice without further consideration. When you have a conceptual diagram, you should look at all the elements of the entity to make informed and reasoned decisions about its logical design.

```pgsql
CREATE TABLE ShipAssignment (
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL CHECK (EndDate >= StartDate),
    NameFK VARCHAR(32) NOT NULL,
    FoundationDateFK DATE NOT NULL,
    ShipFK INT NOT NULL,
    PRIMARY KEY (StartDate, NameFK, FoundationDateFK, ShipFK),
    FOREIGN KEY (NameFK, FoundationDateFK) REFERENCES CruiseLine(Name, FoundationDate),
    FOREIGN KEY (ShipFK) REFERENCES CruiseShip(ShipID)
);
```

Here, we assume the end date of the assignment is always defined, meaning cruises are assigned to cruise lines through "contracts" that always start and end on specific dates, and assignments don’t last indefinitely. This implies that `EndDate` can never be `NULL`. So in the DDL, we include the `NOT NULL` constraint and a `CHECK` to ensure that `EndDate` is after the start date, guaranteeing that only valid tuples are inserted into the database.

The foreign keys are formed solely by the attribute ShipFK, which refers to the CruiseShip entity. We use it to reference the cruise assigned to a certain cruise line. But the other foreign key, which is used to implement the other `1-*` association, is composed of the attributes **(`NameFK`, `FoundationDateFK`)**, which refer to the primary key of `CruiseLine` – and this, in turn, is composite and contains two attributes **(`Name`, `FoundationDate`)**.

If we only look at the relational diagram, we’ll see that three attributes are part of foreign keys because there are arrows coming from them. Specifically, the arrow from one of them (`ShipFK`) will point to an attribute in a certain table. So we know that this attribute forms a foreign key by itself, while the other two have arrows pointing to attributes of another different entity (but both referencing the same one).

So together, they form another foreign key because the entity or table they reference is **different** from the one referenced by the other attribute `ShipFK`.

These attributes, in turn, serve to uniquely identify each tuple in ShipAssignment – because, with just the start and end dates, we can’t distinguish between any possible pair of tuples.

For example, if several ships are assigned to the same cruise line during the same time period, the start and end dates will match in both tuples, but they’ll represent different assignments even though the dates are the same. So the primary key of the table includes the attributes of the foreign keys, so that their values can distinguish any pair of tuples we might have in the table. Specifically, we include the foreign keys because a cruise can be or have been assigned to several cruise lines, just as a cruise line can have had multiple cruises assigned to it.

The values of both foreign keys are necessary to uniquely identify this "event" between a cruise and a cruise line, because according to the domain, the same cruise can’t be assigned multiple times to the same cruise line on the same date.

```pgsql
CREATE ASSERTION EveryCruiseLineHasAssignment CHECK (
    NOT EXISTS (
        SELECT *
        FROM CruiseLine cl
        WHERE NOT EXISTS (
                SELECT *
                FROM ShipAssignment sa
                WHERE sa.NameFK = cl.Name
                    AND sa.FoundationDateFK = cl.FoundationDate
            )
    ) 
);
```

Lastly, given the minimum multiplicity of `1..*` on the ShipAssignment side, we need to implement a constraint to ensure that all cruise lines have at least one cruise assignment, which is always associated with a cruise.

To do this, we can use either an `ASSERTION` or a `TRIGGER`, as this is a constraint involving multiple tables. But for simplicity, we’ll assume that the data inserted always meets this constraint. This means we don’t need to include assertions and triggers in the DDL.

Now let’s discuss some other important entities in our system.

### `City` entity

This entity is similar to Person and is used to store information about cities in the system. Specifically, for each city, it stores its name, the country where it’s located, population, area, and coordinates in latitude and longitude. Each physical city in our domain within the system will be represented by a tuple in the `City` table, which is how we implement this entity at the logical level.

Of all the associations that this entity has, none are of the `1-*` type with the **many** side in `City`. Instead, they all have their 1 side in `City`. This means there will be exactly 4 foreign keys from other entities pointing to `City`, but the `City` table itself won’t have any foreign keys pointing to another entity.

This might not be straightforward to see at the conceptual level, as we need to look at the maximum cardinalities of the associations to know which ones result in foreign keys in the entity we’re implementing.

In contrast, in the relational diagram, this is more direct. References implemented with foreign keys are arrows, so we can directly know how many arrows refer to the primary key of a certain table or how many point to other tables, also clearly indicating from which attributes and tables they originate.

```pgsql
CREATE TABLE City (
    CityID SERIAL PRIMARY KEY,
    Name VARCHAR(32) NOT NULL,
    Country VARCHAR(32) NOT NULL,
    Population INT NOT NULL CHECK (Population >= 0),
    Area DOUBLE PRECISION NOT NULL CHECK (Area >= 0),
    Latitude DOUBLE PRECISION NOT NULL CHECK (
        Latitude BETWEEN -90 AND 90
    ),
    Longitude DOUBLE PRECISION NOT NULL CHECK (
        Longitude BETWEEN -180 AND 180
    )
);
```

Regarding the DDL, we implement the identifier `CityID` with a `SERIAL` surrogate key, as at the conceptual level we have defined that the attribute `CityID` is the primary key of `City`.

It's important to note that when modeling a domain or solving a problem for a client, we might be required to use identifiers specific to the domain we are modeling, which would mean `CityID` would be of the same type as the identifier to be stored. But for simplicity, let’s assume that we construct the city identifiers ourselves using a surrogate key.

In addition to the `NOT NULL` constraints that prevent all attributes from being `NULL`, since it doesn't make sense for a city to have no name or a defined population number, we impose a restriction on the range of values that Latitude and Longitude can take. This is to ensure the values are valid, even though we can't verify if they are correct, as this mainly depends on the data source.

To do this, we can use the `BETWEEN` operator, which performs the same check as `Latitude >= -90 AND Latitude <= 90` but in a more readable way.

### `Port` entity

In addition to cities, our domain also includes ports, which are represented by the entity `Port`. Like before, each port will be a tuple in the table, with its primary key composed of the port's name stored in the `Name` attribute and a foreign key that references `City`, modeling the city where the port is located.

We can infer the existence of this foreign key by looking at the entity's associations, where all of them are of the `1-*` type, and only one has the **many side** in `Port`. This precisely models this relationship between `Port` and `City`. The others have their **1 side** in `Port`, indicating that they point to `Port`, meaning they reference some tuple in the `Port` table.

At the same time, the foreign key of `Port` is also part of its primary key because a port can’t be identified by its name alone – we also need to know the city where it’s located.

For example, in this domain, we assume that there can be several ports with the same name, but not located in the same city. So if two ports are in the same city, according to the domain, we have the guarantee that their names can’t be the same. This allows us to define the primary key as the combination **(`Name`, `CityFK`)**.

We’re making these assumptions here as an example, but in a real project they would need to be confirmed with domain experts and the client's requirements to ensure they are met. This would allow us to make design decisions such as establishing the keys of an entity. So once we know that Port has a foreign key that is part of its primary key, we know that the entity is weak in identification. In the relational diagram, we will have to underline not only `Name` but also the `CityFK` attribute.

```pgsql
CREATE TABLE Port (
    Name VARCHAR(32),
    TerminalCount INT NOT NULL CHECK (TerminalCount >= 0),
    MaxShipLength INT NOT NULL CHECK (MaxShipLength >= 0),
    Area DOUBLE PRECISION NOT NULL CHECK (Area >= 0),
    CityFK INT NOT NULL,
    PRIMARY KEY(Name, CityFK),
    FOREIGN KEY (CityFK) REFERENCES City(CityID)
);
```

The DDL is similar to the previous ones: we have the declaration of attributes and constraints like `PRIMARY KEY`, where the set of attributes **(`Name`, `CityFK`)** is defined as those that uniquely identify the tuples of `Port`. We also have the corresponding `FOREIGN KEY` that references the `CityID` attribute, the primary key of the `City` table.

A peculiarity of this `CREATE TABLE` statement is that we don’t add a `NOT NULL` constraint to the `Name` attribute because we don’t need to declare it explicitly in this case. That is, since `Name` is part of the primary key, and a primary key never allows `NULL` values in its attributes, we can skip declaring `NOT NULL`, as `PRIMARY KEY` does so implicitly to ensure the [<FontIcon icon="iconfont icon-ibm"/>primary key integrity constraint](https://ibm.com/docs/en/db2/11.5.x?topic=concepts-primary-key-referential-integrity-check-unique-constraints).

This also applies to the foreign key attribute, which can’t be NULL due to the minimum cardinality (minimum cardinality 1 in `1..1`) on the `City` entity side, which requires all ports to be associated with a city. But to more clearly reflect this minimum cardinality, we add `NOT NULL` explicitly to the CityFK attribute, even though it’s not strictly necessary.

Lastly, if we want to ensure that the logical design represented in the relational diagram is correct with respect to the conceptual diagram, we can try reconstructing the conceptual entity from the table in the relational diagram.

To do this, after creating the entity with its name and attributes (except for those that are foreign keys), we have to infer the associations implemented through these foreign keys. So for each of them, we introduce an association that relates `Port` to the entity the foreign key points to, where the many side is on `Port` and the 1 is on the other entity's side.

In addition to the maximum cardinalities `1` and `*`, we also have to define the minimums, which we can determine through the constraints indicated in the relational diagram.

For example, if one of the foreign keys can be `NULL`, then its minimum cardinality on the 1 side of the association will be 0, resulting in that side having a cardinality of `0..1`. On the other hand, if it can’t be `NULL`, the minimum cardinality is 1. On the other side of the association, we’ll default to a minimum cardinality of 0 unless there are constraints requiring cities to have at least one port, for example. This means the minimum cardinality would be 1, resulting in the Port side of the association having a cardinality of `1..*`.

Finally, we can repeat this process with the foreign keys that point to the primary key of `Port`, leading to more associations with other entities.

For example, if we are reconstructing the conceptual entity `City` from the relational diagram, we will see that there is a foreign key from `Port` pointing to `CityID` of City. So City will have a `1-*` association with `Port`, where the many side is on the `Port` side because the foreign key originates from `Port`.

In this way, when we have fully reconstructed the conceptual entity, we’ll determine if it’s weak in identification by checking if any of its foreign keys is underlined. This means it’s also part of the primary key. In that case, we’ll add the role **«weak»** to the associations that have arisen from these foreign keys, always on the side from which the foreign key originates.

### CruiseLine entity

This entity is responsible for representing cruise lines in our system, which can have customers and cruises assigned. Conceptually, this entity is very similar to those we have already seen, as it has a primary key made up of two attributes of the entity itself, and no foreign keys pointing to other entities. But there are foreign keys in other entities that **point** to **CruiseLine**, which we can see from the `1-*` type associations.

```pgsql
CREATE TABLE CruiseLine (
    Name VARCHAR(32) NOT NULL,
    FoundationDate DATE NOT NULL,
    ContactPhone BIGINT NOT NULL CHECK (ContactPhone > 0),
    Rating DOUBLE PRECISION NOT NULL CHECK (Rating >= 0),
    PRIMARY KEY (Name, FoundationDate)
);
```

Specifically, the primary key of this entity is made up of the company name and the foundation date. This combination of values might seem unique across the tuples we can store in the table, as it’s very unlikely that multiple cruise lines with the same name would be founded on the same date. But we shouldn’t make these assumptions ourselves – instead, we have to ensure that these conditions are met with the client, target user, or domain experts of our system.

Here, for simplicity, we directly assume that no cruise line has the same name as another founded on the same date, but you should always verify if this holds true in the domain.

So we set **(`Name`, `FoundationDate`)** as the primary key, which in turn imposes the implicit `NOT NULL` constraint on both attributes (meaning we don’t need to declare it explicitly). In the DDL, we can also see that the `ContactPhone` attribute is not of type `INTEGER`, but `BIGINT`. This is because phone numbers are usually long numbers representing large numeric quantities that would exceed the range representable by a more basic type like `INTEGER`. For text-type attributes, a fixed maximum length of 32 characters is used for all strings, which is enough to accommodate any cruise line name or similar information.

We could also represent the phone number with a string, allowing the storage of the country code in text format, but this can complicate processing since the number would need to be parsed from text.

### `Vehicle` entity

In our domain, there can be certain types of vehicles, such as cars, cruise ships, bikes, or city buses. They all share a series of **common characteristics** like model, weight, color, or odometer reading to know how far they have traveled since they were manufactured.

These attributes are common to all vehicles in our domain, as they will always have a model name or weight, among other things, regardless of the type of vehicle they are. Becuase of this, we’ve decided to abstract these common characteristics in the conceptual design into a **superclass** entity called `Vehicle`. And from this, all entities representing specific types of vehicles must inherit.

In other words, at a conceptual level, we have an **IS-A hierarchy** where the **parent entity** is `Vehicle`, which contains all the characteristics that define all vehicles. From it, a series of entities inherit that represent specific types of vehicles (where each has more specific characteristics of the corresponding vehicle type).

In summary, we use an IS-A hierarchy because we need to model a situation where a series of "individuals" in our domain share a set of **common features**. Formally, an IS-A hierarchy can be defined as a [<FontIcon icon="fas fa-globe"/>specialization/generalization](https://jcsites.juniata.edu/faculty/rhodes/dbms/eermodel.htm) relationship between a **superclass** entity and some **inheriting** entities. The inheriting entities are composed of all the characteristics or attributes of the superclass plus some of their own attributes.

But, practically, what matters to us is that a hierarchy allows us to have a superclass (the Vehicle entity in this case) where we have attributes corresponding to these common characteristics, and then a series of entities that inherit from it and represent specific types of individuals (each having specific characteristics depending on their type).

With this, we gain clarity and maintainability in the diagram, as adding a new common characteristic to all vehicles only requires adding it to Vehicle – not to each and every inheriting entity. Similarly, if a new type of vehicle needs to be added to the system, we won’t need to include all the common attributes of vehicles in that entity.

### How is this IS-A hierarchy implemented with tables?

At this point, we need to decide how to implement the hierarchy using tables in the logical model. Specifically, we have to determine the number of tables to use and the keys each will have concerning the implementation of the hierarchy itself.

To start, it's important to see that Vehicle has VehicleID as its primary key, which we assume is a surrogate key. With this, we know that if we had to implement any table for the inheriting entities, they should have a foreign key pointing to VehicleID, as it’s the primary key that can uniquely identify tuples of Vehicle.

We see that the hierarchy here is **complete** and **disjoint**. It’s complete because all the "individuals" in the hierarchy must always be represented by the inheriting entities. In other words, we will never find a vehicle that only has the attributes of Vehicle – instead, all vehicles in our domain are necessarily of one of the types defined in the inheriting entities (or so we assume). It’s **disjoint** because a vehicle can’t be of multiple types at once, meaning it can’t be both a car and a cruise ship, which makes sense.

All this means that each of them will be implemented with a specific table. Our system stores many types of vehicles and will likely need to expand with even more types of vehicles. To simplify this process of adding new types of vehicles and to avoid the appearance of too many NULL values in tables, we’ll implement a table for each inheriting entity of the hierarchy.

For the superclass, we’ll also implement a specific table, as each vehicle that exists in our system will be represented in one of the tables of the inheriting entities – but it’ll need to take values in the characteristics (attributes) of the superclass.

Here, we have several options. One option is not to implement a table for the superclass, duplicating all its attributes in each of the tables of the inheriting entities. This is easy to understand and initially seems practical, but it has significant drawbacks.

Another option is to implement a table for the superclass and include a foreign key in all the inheriting entities that point to the primary key of Vehicle.

We can easily dismiss the first option because duplicating attributes in all the tables for different types of vehicles leads to a lot of [<FontIcon icon="fas fa-globe"/>redundancy at the metadata level](https://softwareengineering.stackexchange.com/questions/227832/single-table-w-extra-columns-vs-multiple-tables-which-duplicate-schema?utm_source=chatgpt.com) or **schema**, meaning duplicated attributes in multiple tables without a clear need for duplication.

Beyond the redundancy issue, duplicating the same attributes in multiple tables makes certain schema modifications more complicated. For example, adding an additional common feature in Vehicle would require adding an attribute in each table. Or we could change how common attributes like **color** are represented, such as switching color names from uppercase to lowercase (or any change in their representation). We’d need to make these changes across all the vehicle type tables.

With the other option, we implement a specific table for the superclass, avoiding these problems by centralizing the storage of common features in a single table. This makes it easier to perform the operations mentioned before, or even additional ones like counting how many vehicles are in our system.

We can easily do this by counting the tuples in the Vehicle table, instead of adding up the tuple counts from each of the tables for different types of vehicles. We can resolve this query this way because all vehicles will have a **tuple in Vehicle** that stores the common features, as well as one in their specific vehicle type table that stores the rest of the features defining it as a car, cruise, bike, and so on.

In this tuple, there’s a **foreign key** that references the tuple in the superclass table, thus associating the information from both tuples so it can query it and know all the information about a vehicle – both its **common** features to all vehicles and the **specific** ones of its type.

```pgsql
CREATE TYPE ColorType AS ENUM ( 'red', 'green', 'blue', 'yellow', 'black', 'white' ); 
CREATE TABLE Vehicle (
    VehicleID SERIAL PRIMARY KEY,
    Model VARCHAR(32) NOT NULL,
    Weight DOUBLE PRECISION NOT NULL CHECK (Weight >= 0),
    Color ColorType NOT NULL,
    Odometer DOUBLE PRECISION NOT NULL CHECK (Odometer >= 0)
);
```

Finally, we decide to implement a table for all entities in the hierarchy, using **foreign keys** in the tables of the inheriting entities to reference tuples in `Vehicle` that store the common features of the vehicles.

In its DDL, we can see that the primary key is implemented with an attribute of type `SERIAL` because it’s a **surrogate key**. For the `Color` attribute, we create a `TYPE ENUM` with the possible colors in our system. This is a good practice because if we need a color attribute in more areas of the system, we’ll have its domain (or data type) defined in `ColorType`. And this allows us to reuse it and ensure that all color attributes can take values from exactly the same data set.

But if we try to reconstruct the IS-A hierarchy from the entity-relationship diagram just by looking at the implementation represented in the relational diagram, we’ll realize that it’s somewhat more complex than what we saw before.

This is because there’s not a single way to translate an IS-A hierarchy into a relational diagram. Depending on the semantics of the features and entities, plus the system requirements, it may be better to use more or fewer tables to implement it. But in cases like this where we have a table for each entity in the hierarchy, we can clearly see that there’s a `Vehicle` table with a primary key `VehicleID` (which is referenced by multiple tables, each having exactly the same foreign key referencing `Vehicle`).

If we only look at this, we might think that `Vehicle` is an entity that has `1-*` associations with other entities – and this is entirely possible when looking only at the relational diagram.

But to derive the conceptual design from the logical one and infer the existence of an IS-A hierarchy, we have to focus on the semantics of the tables and attributes. That's where we'll see that `Vehicle` contains attributes common to all types of vehicles that have foreign keys pointing to `Vehicle`. This gives us clues that `Vehicle` could be the superclass of a hierarchy, and the rest of the tables with foreign keys pointing to `Vehicle` could be inheriting entities.

But inferring the existence of an IS-A hierarchy in the conceptual design simply by observing the logical implementation is not always unequivocal. This is because, for example, here we could perfectly consider that `Vehicle` is an entity associated with the other inheriting entities through `1-*` type associations. This would also be correct from a conceptual and logical point of view.

Still, even though conceptually we can transform the hierarchy into a series of `1-*` associations between `Vehicle` and the other entities, this is only true to the implementation if we implement one table per entity. Otherwise, we wouldn’t be correctly reflecting in the conceptual design what is actually implemented in the logical one.

In summary, when we see an IS-A hierarchy, it doesn't necessarily mean there are foreign keys between the inheriting entities and the superclass, as not always as many tables as entities are used to implement the hierarchy. So to reconstruct a hierarchy at the conceptual level from the logical one, the most reliable thing to focus on is the constraints, notes, or indications left in the relational diagram explaining why certain tables were implemented – that is, where they come from.

Implementing a hierarchy at the logical level usually involves a series of design decisions that must be properly justified, which we can then use to infer the existence of the hierarchy at the conceptual level.

This exercise of trying to reconstruct the conceptual level is important to approach clearly, as understanding this reverse process is key to comprehending the elements of the different design levels and how they translate from one to another.

### `CruiseShip` entity

To illustrate how we’ve implemented the IS-A hierarchy of Vehicle, let's look at the different inheriting entities that make it up.

![Part of the entity-relationship diagram where the IS-A hierarchy of vehicles is represented according to their type.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754729845339/090a3c2f-0833-4f14-8a58-52fb1a1606ea.png)

First, we have `CruiseShip`, which models the existence of cruise ship-type vehicles in our system, where each cruise ship is a tuple in the table. Regarding the specific features of the cruise ship that make it a cruise ship-type vehicle, we have its length, passenger capacity, or even the speed at which it travels. It also has features that all vehicles must have in the Vehicle table, such as model, color, and so on, specifically in tuples that store the values of each cruise's features.

To relate this information from both tables, there is a foreign key in `CruiseShip` that points to Vehicle, meaning it references the tuple in Vehicle where these feature values are stored, for each cruise ship (tuple of `CruiseShip`).

This way, we ensure that the attributes repeated in all vehicle types are centralized in one table where they can be easily modified or consulted, much better than having them all duplicated in the different tables of vehicle types.

```pgsql
CREATE TYPE ClassType AS ENUM('first', 'second', 'third', 'economy');
CREATE TABLE CruiseShip (
    ShipID SERIAL PRIMARY KEY,
    Speed DOUBLE PRECISION NOT NULL CHECK (Speed >= 0),
    Length DOUBLE PRECISION NOT NULL CHECK (Length >= 0),
    PassengerCapacity INT NOT NULL CHECK (PassengerCapacity >= 0),
    Class ClassType NOT NULL,
    VehicleID INT UNIQUE NOT NULL,
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID)
);
```

In the DDL, we see that the attributes and their types are declared, where ShipID is defined as a surrogate key using the `SERIAL` data type. This allows us to uniquely identify each cruise ship. But since every cruise ship is also a vehicle, we could also identify it by making its primary key `{VehicleID}`, because this attribute, even though it’s a foreign key, will never be NULL since a cruise ship needs to have the features that classify it as a vehicle.

So the foreign key must reference a valid tuple in Vehicle where the values for the features common to all vehicles are stored. Consequently, `VehicleID` is an alternative key declared with the `UNIQUE` constraint, although we aren’t required to add this constraint since the surrogate key `ShipID` is sufficient to identify it.

The important thing about this attribute is to correctly define the `NOT NULL` and FOREIGN KEY constraints, ensuring it correctly references the primary key `VehicleID` of the Vehicle table.

In the conceptual design, we see that this entity has multiple `1-*` associations, which indicate that there are three foreign keys from other entities pointing to `CruiseShip`. But if we only have the conceptual design, we can’t say anything about the possible foreign key generated by the IS-A hierarchy. That is, if we only have the conceptual diagram, we can’t "guess" how many tables have been used to implement the hierarchy – we only know that after creating the logical design. At most, we could consider all possible options for implementing the hierarchy and, for each one, analyze whether there is a foreign key coming from `CruiseShip`.

But if in addition to the entity-relationship diagram we know that there is a foreign key originating from `CruiseShip` and pointing to another entity, then the entity it points to must necessarily be Vehicle. This is because `1-*` type associations are elements that we know will generate foreign keys. But certain types of associations like 1-1 or `0..1`-`0..1` can lead to ambiguities, as we have seen before when trying to infer the existence of a hierarchy at the conceptual level.

So by discarding entities related through `1-*` associations, the only option left would be Vehicle. With all this, we can also know that the implementation of the hierarchy at the logical level has been done by creating a table for the superclass and for the `CruiseShip` entity – but we couldn’t be sure whether the other entities have also been implemented with a table or not, as that heavily depends on the semantics.

### `Bike` entity

Continuing with the different types of vehicles, we also have bicycles represented in the entity `Bike`, which inherits from Vehicle. Here, it’s clearer that the attributes of the inheriting entities are more specific than those of the superclass, as only bikes have features like `FrameHeight` or `Foldable`.

If we only look at the conceptual diagram, we can’t be certain if `Bike` has a foreign key pointing to Vehicle. This is precisely because, as mentioned before, without knowing the specific implementation at the logical level, we can’t guarantee that there is a foreign key in `Bike`. But considering the semantics of the hierarchy, we could propose the different options available for implementing it and determine in each case whether such a foreign key exists.

```pgsql
CREATE TABLE Bike (
    BikeID SERIAL PRIMARY KEY,
    Electric BOOLEAN NOT NULL,
    Foldable BOOLEAN NOT NULL,
    HasLights BOOLEAN NOT NULL,
    FrameHeight DOUBLE PRECISION NOT NULL CHECK (FrameHeight >= 0),
    VehicleID INT UNIQUE NOT NULL,
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID)
);
```

Since we decided to use a table to implement each table in the hierarchy, in this case, there is indeed such a foreign key, just as in `CruiseShip`. And we can see it declared in the same way as the `FOREIGN KEY` constraint.

Also, the primary key of `Bike` is not the foreign key that uniquely identifies the vehicles. Instead, it’s the `BikeID` identifier. Here we’re assuming that our domain requires each type of vehicle to have its own identifier. That is, in addition to the `VehicleID` identifier that serves for any type of vehicle, each of these types must have its own **type-specific identifier**. This means that cruise ships, bikes, cars, and buses will each have a way to identify themselves (even though all of them can be distinguished from each other by the `VehicleID` identifier they possess indirectly through their foreign key referencing Vehicle. This is why the foreign key attribute is declared as UNIQUE.).

And since this foreign key is not part of the primary key, the entity is not weak in identification. Even if it were, it wouldn’t be marked in any way at the conceptual level. This is because at that level, we have a hierarchy of entities that can be implemented at the logical level in many ways, and not all of them will have entities weak in identification.

![Entity-relationship diagram with inheritance where `Bike` and `Car` are subclasses of Vehicle.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752833986569/a77fb4b1-3632-4d63-ad28-750c6768ef0d.png)

To understand this, we can consider a simpler example of a hierarchy with only two inheriting entities (as you can see in the diagram above). If we only have the conceptual design, we still won't know which tables we'll use to implement the hierarchy – although we know we have several options, such as:

- implementing or not implementing a table for the superclass
- implementing a table to represent all inheriting entities, or just one table for each entity
- or even more complex implementations like using a single table for the superclass and some of the inheriting entities.

Each of these options has its peculiarities. If we don't implement a table for the superclass, then there will necessarily be no foreign keys pointing to it. Or if we decide to create a table to represent the superclass and some inheriting entity together, then that inheriting entity won’t have any foreign key pointing to the superclass.

Regarding weakness in identification, depending on whether we are required to have each type of vehicle with its own identifier, we could have a global identifier in the superclass, or as in our diagram, multiple identifiers, one for each type of vehicle in addition to the Vehicle superclass identifier that identifies any vehicle. So we see that weakness in identification does not always exist, as it mainly depends on the domain and the requirements of the problem.

For example, if we see identifiers in each of the inheriting entities, and we know that those identifiers can serve as primary keys, then this suggests that the inheriting entities may have been implemented with a table each, where their foreign key initially does not include other foreign key attributes. But the conceptual diagram can’t guarantee this, as the existence or absence of a foreign key that may or may not be part of the primary key when implementing a hierarchy is a design decision specific to the logical level.

Another aspect we can infer from the conceptual diagram is the `1-*` associations where the 1 is in one of the entities of the hierarchy. Necessarily, if any foreign key points to the superclass (the 1 side of the association is in the superclass), then a table must be implemented for it.

On the other hand, if it points to one of the inheriting entities, it’s not a sufficient condition to infer that there is a table for that inheriting entity. This is because there may be a table representing the superclass along with that inheriting entity, with the foreign key perfectly pointing to the identifier of that table.

So in the IS-A hierarchies of the conceptual model, the "weak" role is never used to indicate possible identification weakness that the tables implementing the entities might have. There are many ways to implement the hierarchy with tables, and the chosen method is not 100% determined by the conceptual diagram.

But it’s very important to be clear that the entities in the hierarchy can have associations with other entities that make them weak in identification. In that case, even though they are part of an IS-A hierarchy, the "weak" role would be used to indicate that the entity is weak in identification (but not due to the hierarchy – rather because of an association with another entity).

### `Car` entity

Similar to the previous entities, we have `Car`, which represents the existence of cars in the system. Its primary key is `Plate`, which we assume is unique for each car. As we can see in the DDL, the data type of `Plate` is `VARCHAR`. This makes it perfectly possible for the attribute to be part of a primary key, as they don’t necessarily have to be integers or numeric to be part of a key. Any data type whose values are unique across the tuples stored in the table can serve.

```pgsql
CREATE TYPE CarFuelType AS ENUM ( 'gas', 'diesel', 'electric', 'hybrid', 'hydrogen' ); 
CREATE TABLE Car (
    Plate VARCHAR(32) PRIMARY KEY,
    FuelType CarFuelType NOT NULL,
    DoorCount INT NOT NULL CHECK (DoorCount >= 0),
    TrunkCapacity INT NOT NULL CHECK (TrunkCapacity >= 0),
    HorsePower INT NOT NULL CHECK (HorsePower >= 0),
    Doors INT NOT NULL CHECK (Doors > 0),
    AirConditioning BOOLEAN NOT NULL,
    VehicleID INT UNIQUE NOT NULL,
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID)
);
```

Regarding the foreign keys related to this entity, we have the same one as before, which serves to reference a tuple of `Vehicle` that stores information about the car model, color, and so on. But looking at the conceptual diagram, we can see that there are two other foreign keys in other entities pointing to `Car`, since the 1 side of the corresponding `1-*` associations is in `Car`.

Even though we can’t see this in the DDL of the `Car` table, these foreign keys are in other entities referencing `Car`. But we can see them in the relational diagram as arrows pointing to the attributes of the primary key of `Car`.

Lastly, we also create an `ENUM TYPE` to restrict the domain of the FuelType attribute. We could implement this perfectly with a constraint, but to reuse this data type in other entities that might need it, we should define a `DOMAIN` or an `ENUM TYPE` (as in this case, that can be assigned as a data type to the attribute).

Also, defining a set of values this way is especially useful when the attribute holds text, as in other numeric attributes it may be easier to restrict their possible values with conditions like `(HorsePower >= 0)`.

### `CityBus` entity

To finish with the vehicle hierarchy, we have `CityBus`, which represents city buses in our domain. In this entity, we also have `Plate` as the primary key, which stores the bus's license plate and serves to uniquely identify it (meaning it differentiates it from any other city bus).

But the license plate does not directly differentiate it from other types of vehicles like cars or bikes, as the semantics of each attribute are different for each type of vehicle, as mentioned before.

For example, although cars and buses both have a license plate, if we try to differentiate cars from buses using their `Plate` attributes, we will see that cars may have a different license plate structure than buses, as determined by the domain and project requirements.

So to distinguish and uniquely identify them, we need to use the `VehicleID` identifier, since `Plate` is specific to the vehicle types `Car` and `CityBus`.

In addition to representing the existence of buses, this entity has `1-*` type associations with `Person` and `City` that model the person driving each bus and the city where it operates. So in the conceptual diagram, we can see that the association with `Person` has the role **“drives”**. This indicates that a person can drive an arbitrary number of buses, while a bus is driven by one and only one person.

This association results in `CityBus` having a foreign key pointing to `Person`, allowing us to know, given a bus, the person who drives it by accessing the `Person` tuple referenced by the foreign key attribute.

Similarly, `CityBus` also has an association with `City` that represents the city to which each bus belongs and operates. Conceptually, we can see this as each bus having to operate in only one city, and each city having an arbitrary number of buses operating in it, including none (since the minimum cardinality on the `CityBus` side is 0).

Logically, this is implemented with a foreign key in `CityBus` pointing to `City`. So if we need to know the city where a certain bus operates, we simply check the value of its foreign key, which will uniquely identify a tuple in `City`, indicating the city we are looking for.

```pgsql
CREATE TABLE CityBus (
    Plate VARCHAR(32) PRIMARY KEY,
    RouteNumber INT NOT NULL CHECK (RouteNumber >= 0),
    Seats INT NOT NULL CHECK (Seats > 0),
    FreeWifi BOOLEAN NOT NULL,
    VehicleID INT UNIQUE NOT NULL,
    DriverFK INT NOT NULL,
    CityFK INT NOT NULL,
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID),
    FOREIGN KEY (DriverFK) REFERENCES Person(PersonID),
    FOREIGN KEY (CityFK) REFERENCES City(CityID)
);
```

In addition to the previous foreign keys, there is another one in the BusTrip entity that references `CityBus`, which we can see with the `1-*` type association it has with that entity. This last one isn’t directly reflected in the DDL of `CityBus`, but it’s in the relational diagram where we have an arrow pointing to the primary key Plate. And, as usual, we do not add the `NOT NULL` constraint to the `Plate` attribute, since we are imposing the `PRIMARY KEY` constraint, which implicitly includes `NOT NULL` in all the attributes that comprise it.

The foreign keys for `Person` and `City` also can’t be `NULL` due to the minimum cardinalities of the associations, where having `1..1` implies that a city bus must have a driver and a city to operate in, hence `NOT NULL` is explicitly added in the DDL.

### `CarRegistration` entity

In our domain, cars can belong to a person through a record in the `Carownership` table. They can also be registered as fit to drive through `CarRegistration`, which associates cars with driver's licenses to model their legal registration. That is, a car can exist at any time, but to be able to drive, it must be registered and associated with a driver's license. This is why `CarRegistration` is dedicated to associating cars with driver's licenses.

The entity is very similar to some we have seen before, like `Residence` (while the entities it relates to here are different, as well as the reason for its existence). Implicitly, a car can be registered and associated with many driver's licenses, while the same driver's license can have an arbitrary number of cars associated with it. We can determine this by observing the **cardinalities** and **navigability** of the associations in the conceptual diagram.

For example, if we have a car, then by conducting an exhaustive search in the tuples of `CarRegistration`, we can find out how many records it’s in or has participated in. Also, for each of those records, we automatically know the driver's license it has been associated with – so from one car, we can learn about many driver's licenses.

Conversely, the same applies: if we have a certain license, we can indirectly find out by looking in the `CarRegistration` table how many records associate cars with that license. And for each of those records, we would obtain the associated car.

We’ve now analyzed navigability at the logical level. Previously, we saw the concept of navigability at the conceptual level, where associations could only be traversed in a certain direction depending on their cardinality. But in the logical model, we have access to all the tuples of all the tables in the database schema.

So, even though the `Car`-`CarRegistration` association is not navigable towards `CarRegistration` at the conceptual level, it is at the logical level. That is, if we have a car, we can find out which tuples in `CarRegistration` refer to that car, using the foreign keys that implement the association. With that information, we can then navigate to `DrivingLicense` once we know which tuples in `CarRegistration` pointed to the car.

This type of navigation is considered more typical of the logical level. With it, we can obtain information from other entities in a broader way than with the concept of navigation we saw at the conceptual level.

Here, on the **entity-relationship diagram**, we can see that there is an implicit N-M association between Car and `DrivingLicense`, which we just navigated through.

To do this, we had to go through the `1-*` type associations, which are divided so that there can be an "intermediate" entity that stores information related to the N-M association, and to enable its implementation at the logical level. But we need to keep in mind the cardinalities of the `1-*` associations that make up the implicit N-M association, where on the `CarRegistration` side we have optionality because the minimum cardinality is 0. This means that a car may not be registered, so there would be no tuple in `CarRegistration` referring to a certain car, thus preventing navigation to `DrivingLicense`.

This is completely valid because if a car is not registered, it won’t be associated with any driving license, and so we won’t be able to access any information from `DrivingLicense`.

Despite this, since there is a possibility that it’s registered, we consider these associations at the logical level to be navigable (all of this is equivalent to analyzing it in the opposite direction, from `DrivingLicense` to `Car` through `CarRegistration`).

For this process to be carried out, `CarRegistration` needs to have two foreign keys: one pointing to the primary key of `Car` to uniquely identify the car being registered, and another pointing to `DrivingLicense` to identify the driver's license associated with the car.

```pgsql
CREATE TABLE CarRegistration (
    RegistrationID SERIAL PRIMARY KEY,
    RegistrationDate DATE NOT NULL,
    ExpirationDate DATE NOT NULL CHECK (ExpirationDate > RegistrationDate),
    PlateFK VARCHAR(32) NOT NULL,
    LicenseFK INT NOT NULL,
    FOREIGN KEY (PlateFK) REFERENCES Car(Plate),
    FOREIGN KEY (LicenseFK) REFERENCES DrivingLicense(LicenseID)
);
```

When implementing the `CarRegistration` table, we see in its DDL that the primary key is declared as `SERIAL` because it’s a surrogate key. Also, the foreign keys all have the `NOT NULL` constraint due to the minimum multiplicity of 1 for the corresponding associations, which requires every tuple in `CarRegistration` to reference exactly one car and one driving license.

Regarding the information stored in the car registration, we mainly have the registration date or expiration date. Neither can be `NULL`, since we assume that in our domain, cars are always registered for a certain period that can later be extended through other registrations.

Here, we could have defined the `CarRegistration` entity as weak in identification, including both foreign keys in a primary key like `{RegistrationDate, PlateFK, LicenseFK}`. But for simplicity, a surrogate key is preferred, which simplifies database operations. In fact, the only advantage of not using the surrogate key would be saving the space occupied by the values of that additional column (and we could remove it if need be). But doing so would complicate the identification of `CarRegistration` tuples, as well as make certain queries less efficient and less readable.

And if we delve into the physical level, we would realize that having a primary key composed of more attributes would cause the DBMS to use more space to manage it. This would counteract the savings from removing the surrogate key – so the surrogate key remains the preferred option.

In summary, at the conceptual level, we’ve learned that navigation from `Car` to `DrivingLicense` is not entirely possible, as there is no foreign key in `Car` pointing to `CarRegistration`. But at the logical level, we can get information from `CarRegistration` because we can examine all the tuples of `CarRegistration`, allowing us to know which of them has their corresponding foreign key referencing the car we started from.

That is, conceptually, `1-*` type associations are only navigable from the many side to the one side, but at the logical level, they are considered bidirectional. Also, the `1-*` associations surrounding `CarRegistration` are both of the `1-*` type and implicitly give rise to an N-M type, which is another reason why we can actually navigate from Car to `DrivingLicense` through `CarRegistration`.

### `DrivingLicenseRequest` entity

In our domain, people can request a driver's license from a public entity, which in this case doesn't matter to us – we only care that it’s responsible for accepting or rejecting these requests. If a request is accepted, it should become the driver's license of the person who requested it, while if it is rejected, it will remain in the database as a failed request.

To model this in our database, we have many options:

- creating a `DrivingLicenseRequest` entity with a boolean attribute `Accepted` to represent whether the request status is accepted or not, or
- creating an IS-A hierarchy as seen in the conceptual diagram, where we have a superclass `DrivingLicenseRequest` dedicated to recording all requests that exist or have existed. In turn, we have inheriting entities that are created once the request has been resolved, with one entity representing accepted requests and the other modeling those that are rejected.

On one hand, using a single entity with attributes that determine its status is not the best option, because besides knowing if it has been rejected or not, the request can be in process. This would mean that it’s neither accepted nor rejected yet.

This causes multiple problems that complicate implementation, such as needing to make the `Accepted` attribute `NULL` until the request has been resolved, or even using this `NULL` value to represent the request's status. This "mixes" the semantics of the `Accepted` attribute with the representation of the request's status. This is not necessarily a serious problem, just a lack of clarity in representing the status and outcome of a request.

This option would also generate `NULL` values in the **specific attributes** of rejected or accepted requests, since each of them requires specific attributes that the other type does not have (such as the **number of points** for an accepted driver's license). So with this option, besides distinguishing the type of request, you would need to manage the `NULL` values in all attributes that don’t correspond with the type represented in the `Accepted` attribute. And this greatly complicates the semantics and operations when managing the data, as well as wasting unnecessary space storing these `NULL`s.

On the other hand, using an IS-A hierarchy to conceptually model driver's license requests can bring other disadvantages, such as greater complexity in the schema from the high number of tables that can be generated. You can also have more complexity when adding constraints to ensure that a request is not accepted and rejected at the same time. Or you can even have data fragmentation across multiple tables, where part of the information is stored in a superclass and the rest in an entity representing the specific type of request, whether accepted or rejected.

Still, using an IS-A hierarchy solves all the problems we saw with the previous option, providing a simpler and more consistent semantics with which we can operate on the database more easily. It also keeps us from having to worry about managing `NULL` values in certain attributes or the consistency between attributes that determine the request's status, as there are none of those here.

Thus, in the conceptual model, we have an IS-A hierarchy representing these requests, where a superclass represents requests that have just been created and are in process. In inheriting entities, these same requests are represented once they have been resolved. If they are rejected, they become a specific type `RejectedDrivingLicense`, and if accepted, another type called simply `DrivingLicense`.

In other words, at the conceptual level, we can view each request as an "individual" that can be found in the set of entity occurrences of the superclass, indicating that the request is in process. When it’s rejected or accepted, that individual then belongs to the set of the corresponding inheriting entity.

### How can we model the driving license requests hierarchy at the logical level?

As we have seen before, an IS-A hierarchy doesn’t have a direct and unique translation at the logical level, as its semantics and domain requirements determine which possibilities are better or worse in aspects like query efficiency, ease of management, and so on.

So to translate this entity hierarchy formed by the superclass entity `DrivingLicenseRequest` and the inheriting entities `RejectedDrivingLicense` and `DrivingLicense` into tables in a DBMS, we need to analyze its characteristics to determine what implementation best suits the domain we’re modeling. We also need to analyze the other entities and the associations that connect with them, such as the association between Person and `DrivingLicense`, which models the relationship between a person and their driving license.

The first thing we need to check is whether the hierarchy is complete or not. In this case, there can be requests in process that haven’t been accepted or rejected, and so aren’t represented in any of the inheriting entities.

Since there are requests that don’t necessarily need to be represented by any inheriting entity, we see that the hierarchy is **not complete (partial)**. Given that it’s not complete, the only way for our database to correctly store those requests that are in process is to create a specific table for the superclass `DrivingLicenseRequest`. Without it, it would be more complicated to know when a request has been resolved or not.

Later, knowing that all requests are stored in `DrivingLicenseRequest`, our system must be able to store information that determines whether it has been resolved or not, as well as the result of its resolution. For this, when a request is resolved and accepted, an occurrence of the entity `DrivingLicense` is created. But if it’s rejected, an occurrence of the other inheriting entity is created.

So in no case will the request be represented by occurrences of multiple inheriting entities at the same time, so the hierarchy is **disjoint**. This ensures that the previous decision to implement a table for the superclass is the correct option.

To translate the inheriting entities to the logical level, we need to decide whether to implement a table for each one, a single table for both, or even a table with all the entities in the hierarchy.

The most important thing to consider in this decision is the number of attributes each entity has and the tuples expected to exist in the database if we implement a table for each entity. In other words, we need to consider how many occurrences of each entity are expected to exist in the domain.

Initially, we can assume that there are always more rejected licenses than accepted ones, as it’s very likely to be rejected at least once before being accepted. With this, we could decide to implement a table for the `DrivingLicenseRequest` and `RejectedDrivingLicense` entities together (since there are more rejected than accepted) and another for `DrivingLicense` that has a **foreign key** pointing to that table. But this would generate `NULL` values in the attributes from `RejectedDrivingLicense` when representing accepted driving licenses.

Since implementing the entire hierarchy with a single table also leads to too many `NULL` values in the attributes when representing accepted or rejected licenses, the best solution in this case is again to implement a table for each entity in the hierarchy.

The main reason for choosing this option is the number of `NULL` values generated when representing accepted or rejected licenses. In general, if the inheriting entities had only one attribute, then it would be clear that it could be implemented more simply with a single table for the entire hierarchy, or two.

But when there is more than one attribute, the queries become especially complicated because we need to check if several attributes are `NULL` at the same time (and manage the database and the possible extension of the hierarchy to more types of requests).

```pgsql
CREATE TABLE DrivingLicenseRequest (
    LicenseID SERIAL PRIMARY KEY,
    RequestDate DATE NOT NULL,
    Fee DOUBLE PRECISION NOT NULL CHECK (Fee >= 0),
    PersonFK INT NOT NULL,
    FOREIGN KEY (PersonFK) REFERENCES Person(PersonID)
);
```

Once we decide to use a table for each entity in the hierarchy, we need to reflect this decision in both the relational diagram and the SQL DDL. This is mainly because it’s **not complete**, **disjoint**, and has multiple attributes in the inheriting entities that would lead to too many `NULL` values.

So in the relational diagram, we create the corresponding tables, where `DrivingLicense` and `RejectedDrivingLicense` add foreign keys pointing to `DrivingLicenseRequest` to identify the request that has been rejected or accepted.

In other words, all requests are stored in the superclass table. Then when they are accepted or rejected, a tuple is added to the corresponding table so that its foreign key references the `DrivingLicenseRequest` tuple representing the request itself. This way, the superclass table is dedicated to storing requests, while the other tables focus on representing which requests have been rejected or accepted.

Regarding the foreign keys pointing to or present in any of the tables in the hierarchy, we can see that to know which person a certain request belongs to, there is a **foreign key** in `DrivingLicenseRequest` pointing to **Person**. So for every request, that foreign key indicates the person associated with that request.

On the other hand, given the associations we see in the conceptual diagram, there are two other foreign keys from other entities pointing to DrivingLicense. We need to consider all of this because it can affect the decision we made earlier about how to implement the hierarchy. If there are foreign keys pointing to the superclass, for example, we would necessarily have to implement a table for it.

Finally, we identify the requests using a surrogate key in `DrivingLicenseRequest`, which uniquely identifies all requests, regardless of their status. We can also see this in the inheriting entities, which don’t have any type of identification on their own, but are assumed to be identified by the primary key of `DrivingLicenseRequest`.

In other words, even though there is no clear identifier in the inheriting entities, it’s important to remember that the attributes of the superclass are inherited. So when we’re implementing the hierarchy at the logical level, no matter how we do it, we will always do it in such a way that each accepted or rejected request can be identified by the primary key of `DrivingLicenseRequest`. This is the table that stores the resolved request.

### `RejectedDrivingLicense` entity

Continuing with the previous hierarchy, given its implementation, we have the table `RejectedDrivingLicense`, which represents its corresponding entity. Its tuples will store information regarding the rejection of requests that have been denied, such as the date or reason for rejection.

Also, to know which request each tuple's information corresponds to, there is a foreign key pointing to `DrivingLicenseRequest`, specifically referencing the tuple in that table that stores the rest of the request information (including the primary key that identifies it).

To avoid having to include a surrogate key in this table or define a primary key from the entity's attributes, we’ll choose the **primary key** to be the **foreign key** itself. This in turn references the primary key of the superclass table that uniquely identifies all requests, regardless of their status.

This means that the RejectedDrivingLicense table is weak in identification, as it requires the primary key of the owning entity `DrivingLicenseRequest` to identify it. But as we’ve seen before, this shouldn’t be reflected in the conceptual diagram because this way of implementing the hierarchy is not always unique. So depending on how we do it, the table may cease to be weak in identification.

In summary, the variability that exists when implementing an IS-A hierarchy with tables means that concepts like identification weakness aren’t indicated in the conceptual diagram, as they are only generated by certain implementations.

Generally, if we only look at the diagram, all we can do is consider all the options available for implementing the hierarchy, analyze each one, and even decide which one to implement in the end. But this is a decision we make and doesn’t imply what we have represented in the hierarchy of the diagram.

In other words, from the diagram, it’s impossible to infer which specific logical implementation has been used, although in very specific cases, it can be easier and more straightforward to "guess."

![Entity-relationship diagram with incomplete and disjoint inheritance where `AcceptedRequest` is a subclass of `Request`.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752916101394/f9b94685-4891-4174-b38d-35c6d164744b.png)

For example, say we have a hierarchy with only one superclass `Request` that is pointed to by a foreign key and an inheriting entity `AcceptedRequest` that’s very similar to the one in our domain. We can see at the conceptual level that the hierarchy is incomplete, as there may be requests that have not yet been accepted. It’s also disjoint, which in this case makes analyzing this aspect of the hierarchy irrelevant given the number of inheriting entities it has.

So, since it’s incomplete, we’ll need a table for the superclass. Also, to avoid the appearance of `NULL` values if the hierarchy is implemented with a single table, we’ll use a table for the inheriting entity.

But if the hierarchy were complete, we would only have one clear way to implement the hierarchy: with a single table. This is because there would never be `NULL`s in the attributes of `AcceptedRequest`, despite the option of using a table for each entity and complicating the database logic by inserting a tuple in each table for each request.

With this example, we see that in very specific cases, it’s possible to infer the clearest way to implement a hierarchy at the logical level, even though there will always be some variability that prevents us from "guessing" the exact implementation chosen for the DBMS. Finally, it’s also important to consider the identification of the tuples with which we model the hierarchy, where multiple options also arise.

On one hand, if the domain or requirements dictate that certain entities need to have their own identifiers, then we’ll have to define them as primary keys of the corresponding entities. In our domain, all requests must be uniquely identified by an attribute in `DrivingLicenseRequest`, so we add a surrogate key to that entity.

If the requirements tell us that some of the attributes of an entity serve as an identifier, then we’ll use them as the primary key – but here for simplicity, we assume there is no domain-specific identifier, and we are the ones adding the surrogate key as an identifier to store the data in our system.

On the other hand, if we don't have information on how the entities should be identified, then we have the freedom to do so however we want, mainly depending on the implementation chosen in the end.

But regardless of the source of this identification, in general, it all comes down to whether or not each inheriting entity can be identified by its own attributes. This determines if the table it converts to at the logical level is weak in identification or not – because if we ultimately decide to define a primary key for an inheriting entity, then we will necessarily implement it with a concrete table.

As you can see, the identification of each entity can give us clues about how the hierarchy will be implemented, but it’s not something unequivocal that always guarantees a single way to implement it.

Sometimes, it’s our task to define how we identify them, and that will depend on how many tables we choose for the implementation and how we associate them with each other.

```pgsql
CREATE TABLE RejectedDrivingLicense (
    LicenseID SERIAL PRIMARY KEY,
    RejectionDate DATE NOT NULL,
    ReapplicationDate DATE NOT NULL CHECK (ReapplicationDate >= RejectionDate),
    Reason VARCHAR(32) NOT NULL,
    FOREIGN KEY (LicenseID) REFERENCES DrivingLicenseRequest(LicenseID)
);
```

In the DDL corresponding to this entity, we see that a specific table is created for it with the respective attributes shown in the conceptual diagram. Also, we include one that serves as a foreign key to reference the tuple of `DrivingLicenseRequest` that represents the rejected application (and also serves as the primary key of this table).

We could include a surrogate key here as well, but since we already have the `LicenseID` value from the superclass table, we don’t need to do so (and the domain doesn’t require us to identify rejected applications in a special way).

So we add the `PRIMARY KEY` and `FOREIGN KEY` constraints to that attribute at the same time, so it can’t contain NULL values because of the **implicit `NOT NULL` restriction** added by `PRIMARY KEY`. It must also reference the **primary key `LicenseID`** attribute of `DrivingLicenseRequest`.

To reflect this in the relational diagram, we can just underline the foreign key attribute, indicating that the table is weak in identification and that attribute can’t take `NULL` values. But to clearly indicate that other attributes that aren’t part of the key (like `RejectionDate`) can’t be `NULL`, we need to use other elements like margin notes or any other technique that clearly reflects this condition.

```pgsql
CREATE ASSERTION RejectionDateConstraint CHECK (
    NOT EXISTS (
        SELECT *
        FROM RejectedDrivingLicense R
            JOIN DrivingLicenseRequest D USING (LicenseID)
        WHERE R.RejectionDate < D.RequestDate
    )
);
CREATE ASSERTION ApprovalDateConstraint CHECK (
    NOT EXISTS (
        SELECT *
        FROM DrivingLicense D
            JOIN DrivingLicenseRequest R USING (LicenseID)
        WHERE D.ApprovalDate < R.RequestDate
    )
);
```

Finally, although we define constraints on the table – such as that the reapplication date can’t be earlier than the rejection date – there are also other constraints (like the rejection date must be after the application date).

These types of constraints involving information from multiple tables need to be implemented with assertions or triggers. The simplest option is to use assertions as shown above, although we haven’t yet implemented the `ASSERTION` statements in PostgreSQL, so attempting to define them will result in an error from the DBMS. It’ll simply ignore these definitions.

So we’ll choose not to implement these types of constraints at this point, assuming that the inserted data already meets them for simplicity.

```pgsql
CREATE ASSERTION NoSimultaneousApprovalRejection CHECK (
    NOT EXISTS (
        SELECT *
        FROM DrivingLicense d
            JOIN RejectedDrivingLicense r USING (LicenseID)
    )
);
```

Also, accepted and rejected applications can’t exist at the same time, so with this assertion, we could prevent this inconsistency. Basically, we define here that there can’t be any tuple in either `DrivingLicense` or `RejectedDrivingLicense` with the same `LicenseID`. This means that no application (`LicenseID`) can appear simultaneously in both tables, as the domain requires people to submit a new application when the one they have submitted is rejected.

### `DrivingLicense` entity

To conclude with this hierarchy, when a driver's license application is accepted, a tuple gets created in the `DrivingLicense` table with which we have implemented its respective entity. Thus, the main goal of this entity is to model a person's driver's license, because once it’s accepted, it can be used to register cars, and is indirectly associated with the person who holds the license.

To do this, first, the `DrivingLicense` has a foreign key pointing to `DrivingLicenseRequest`, just like the previous inherited entity in the hierarchy. In turn, the request, regardless of its status, always refers to a person through its foreign key, to model whose license it is. And for cars to be registered in association with a person's driver's license, the `CarRegistration` entity has a foreign key pointing to `DrivingLicense`, so each registration necessarily refers to a specific license.

We can see all of this in the entity-relationship diagram through the `1-*` type associations, as well as in their minimum cardinalities. But we can’t directly infer the existence of the foreign key in `DrivingLicense`, specific to the hierarchy implementation, because we can implement the hierarchy in many ways.

To understand this last point, imagine being told that there is a foreign key in `DrivingLicense` pointing to another entity. With this information, we can directly know that this foreign key points to the superclass of the hierarchy and exists because of the implementation where there is at least a specific table for `DrivingLicense`.

This is because the rest of the associations of the `DrivingLicense` entity are of the `1-*` type, with the 1 on the `DrivingLicense` side – so these associations result in foreign keys pointing to `DrivingLicense`, not the other way around. In summary, with just the conceptual diagram, you can’t know exactly how a hierarchy has been implemented, but with some additional information, you can.

```pgsql
CREATE TABLE DrivingLicense (
    LicenseID SERIAL PRIMARY KEY,
    ApprovalDate DATE NOT NULL CHECK (ApprovalDate <= CURRENT_DATE),
    Points INT NOT NULL CHECK (
        Points BETWEEN 0 AND 15
    ),
    FOREIGN KEY (LicenseID) REFERENCES DrivingLicenseRequest(LicenseID)
);
```

The DDL of this entity is very similar to the previous one, where we have a primary key composed of the `LicenseID` attribute, which is also a foreign key that identifies the request that has been accepted. This refers to the tuple in the superclass table where the request is stored and uniquely identified, along with the entity's own attributes.

The table constraints in this case declare that the approval date must be earlier than the current date, as it’s impossible for a request to have been accepted on a date that has not yet occurred.

For this, we use `CURRENT_DATE` to get the current date in SQL and compare it with another date like the one stored in the attribute. There’s also the Points attribute, which determines the remaining points on the person's driver's license. According to the domain, this value is an integer between 0 and 15, so we restrict the possible values it can take with a `CHECK`, as well as with the `INTEGER` data type itself, preventing it from taking decimal values.

Given the simplicity of the attribute's domain, using a `CHECK` is the easiest option, although we could have defined a `DOMAIN` or `TYPE ENUM` and assigned it as the data type to the attribute. This would be useful if we had more attributes with the same domain in the rest of the schema.

### `BusTrip` entity

People in our domain can use `CityBus` buses as a means of transportation. To this end, we have an entity called `BusTrip` that models specific routes buses take across the city. Each time a bus travels from one point to another, it’s considered a trip recorded in this entity through a tuple. This tuple stores information such as the starting and ending addresses of the trip, the date it takes place, and the time it took.

To uniquely identify the tuples in this table, the primary key uses the attributes `TripDate`, the starting and ending addresses, and the foreign key attribute that identifies the specific bus that made the trip. We have to include the foreign key in the primary key because there could be several `BusTrips` with the same date and starting and ending addresses, all conducted by different buses.

So to uniquely distinguish all of them, we need to include the information of the bus making the trip, which means the value of the foreign key pointing to `CityBus`.

Regarding the semantics of this entity, we can see that no bus can make the same trip multiple times on the same date, as this would result in duplicate tuples, violating the primary key constraint. We assume that this is the case because of the characteristics of the domain.

In the design process, sometimes we have to model situations that may not be entirely intuitive, such as a bus not making the same trip more than once a day.

Since the `TripDate` attribute is of type `DATE`, it can only store dates with a resolution up to days. This means that we can’t represent the exact moment the trip occurs in our database (in the same way we could using the `TIMESTAMP` data type, which allows representing moments in time with date and time).

So, given the granularity of the `DATE` data type, we comply with the restriction that a bus can’t make the same trip multiple times a day (beause in that case, several tuples with exactly the same date would be stored, since `DATE` can only represent up to days).

This is an example of a restriction that is implicitly modeled by the data type of the attribute itself. If it were `TIMESTAMP`, we could have multiple trips by the same bus on the same day but at different times.

```pgsql
CREATE TABLE BusTrip (
    TripDate DATE NOT NULL,
    StartAddress VARCHAR(32) NOT NULL,
    EndAddress VARCHAR(32) NOT NULL,
    Duration INT NOT NULL CHECK (Duration >= 0),
    PlateFK VARCHAR(32) NOT NULL,
    PRIMARY KEY (TripDate, StartAddress, EndAddress, PlateFK),
    FOREIGN KEY (PlateFK) REFERENCES CityBus(Plate)
);
```

When constructing the relational diagram, we must also underline the foreign key attribute that points to `CityBus`, since it’s part of the primary key (it’s the weak entity in identification). More specifically, we can infer this from the entity-relationship diagram by looking at where the «weak» role is located, which indicates the **owner entity** of BusTrip, meaning the one it depends on for identification.

In the DDL, this is reflected in the attributes that make up the primary key, where we find the three from the table itself and `PlateFK`, which is the foreign key responsible for referencing the bus that makes the trip. We won’t impose any additional restrictions on the `StartAddress` and EndAddress attributes, even though just any text can’t be stored in them – only texts that represent valid addresses in a city (specifically where the bus operates).

For simplicity, we’ll assume that if an address is not valid, it’s the responsibility of another part of the system to check this, such as software in the application layer that validates addresses before inserting tuples into the database.

On the other hand, we will add the non-negativity restriction on the duration, as it doesn't make sense for it to be negative. We could name these restrictions to make database administration easier, but since we aren’t going to work on them here, we won’t do so.

### `BusTicket` entity

For a person to travel on a bus route, they must have a ticket that allows them to board a bus represented in the `CityBus` table. So in our domain, we’ll model the existence of tickets with the `BusTicket` entity. Its only attribute is used to store the timestamp when it was issued.

It’s important to use the `TIMESTAMP` data type here and not `DATE` because a person can buy multiple tickets on the same day for different routes, which is why we need to clarify which ticket was generated first.

When we see how this is represented in the conceptual diagram, you might notice the XOR restriction that appears between the associations connecting `BusTicket` with `Person` and `BusPass`. This restriction represents that all existing tickets are either directly associated with a person who owns the ticket or are associated with a `BusPass` that’s owned by a person and allows multiple trips with a pass.

This is how we’d semantically explain the restriction we want to model – but conceptually, when we have a restriction represented by a dashed line and a logical condition like XOR, it means that either the **`BusTicket`-`Person`** association exists, or the **`BusTicket`-`BusPass`** association exists. It’s not possible for neither to exist or for both to exist at the same time.

Because these associations exist, the foreign key in `BusTicket` pointing to the respective entity is not `NULL`. That is, both associations are of type `1-*`, so they are clearly implemented with foreign keys in `BusTicket`. But the minimum cardinalities on both sides are 0, indicating that the associations as a whole may not exist. In other words, it means that the values of the foreign key attributes can be `NULL`.

At this point, if we didn't have the XOR restriction, the foreign keys could both be `NULL` at the same time, indicating that a ticket is not associated with any person or pass, making it impossible to identify the passenger taking the trip.

On the other hand, if both foreign keys had values in their attributes, we would be modeling that the person has used the pass to travel by bus through the non-nullity of the **`BusTicket`→`BusPass`** foreign key, while at the same time modeling that the same person has not used the pass but has obtained a ticket directly through the non-nullity of **`BusTicket`→`Person`**.

That is, if the foreign key **`BusTicket`→`BusPass`** is not `NULL`, then we are modeling the situation where a person uses their pass to travel by bus, while the other foreign key, when not `NULL`, represents that the person is not using a pass to travel but is doing so directly with a ticket.

So both situations can’t occur at the same time thanks to the domain restrictions that dictate that a person either travels with a ticket or with a pass – but not both at once, and not neither. This is because a ticket is necessary to travel. This is why we use the XOR condition to represent that either one association exists or the other, but not both at the same time. It also prohibits neither from existing.

| **PersonFK** | **PassFK** | **Valid** | **Meaning** |
| --- | --- | --- | --- |
| No NULL | NULL | ✔️ | Ticket purchased directly by the person. |
| NULL | No NULL | ✔️ | Ticket charged to the person's BusPass. |
| NULL | NULL | ❌ | There is no information on which person is traveling (orphan ticket). |
| No NULL | No NULL | ❌ | Indicates both direct purchase and use of a pass at the same time (inconsistent). |

It’s also important to emphasize that for the foreign keys to be `NULL`, the minimum cardinality on the side of Person and `BusPass` in the associations must be 0. To model that a person travels using a pass, we might consider associating the `BusPass` entity directly with `BusTrip` instead of with `BusTicket`. But doing this would result in an N-M relationship between `BusPass` and `BusTrip`, since a pass can lead to an indefinite number of trips, while multiple people can travel using their pass on a single trip.

To avoid having to add another intermediate entity to implement the N-M association, let’s associate BusTicket with `BusPass`, so that we can see each trip made using a pass by checking the foreign key values of the ticket.

```pgsql
CREATE TABLE BusTicket (
    IssueTime TIMESTAMP,
    TripDateFK DATE,
    StartAddressFK VARCHAR(32),
    EndAddressFK VARCHAR(32),
    PlateFK VARCHAR(32),
    PersonFK INT,
    PassFK INT,
    PRIMARY KEY(
        IssueTime,
        TripDateFK,
        StartAddressFK,
        EndAddressFK,
        PlateFK
    ),
    FOREIGN KEY (
        TripDateFK,
        StartAddressFK,
        EndAddressFK,
        PlateFK
    ) REFERENCES BusTrip(TripDate, StartAddress, EndAddress, PlateFK),
    FOREIGN KEY (PersonFK) REFERENCES Person(PersonID),
    FOREIGN KEY (PassFK) REFERENCES BusPass(PassID),
    CONSTRAINT XORConstraint CHECK (
        (
            PersonFK IS NULL
            AND PassFK IS NOT NULL
        )
        OR (
            PersonFK IS NOT NULL
            AND PassFK IS NULL
        )
    )
);
```

To uniquely identify each ticket, we have to use both the IssueTime attribute of the table and the foreign key pointing to `BusTrip`, which determines which trip will be made with that ticket. So we have a weak entity in identification again – and it’s peculiar in that the foreign key in this case is composed of several attributes, since the primary key of `BusTrip` (which is the owning entity on which it depends for identification) is itself composed of multiple attributes. Specifically, this primary key has 4 attributes – so in `BusTicket`, as the foreign key must reference the primary key of `BusTrip`, it will be composed of exactly 4 attributes (meaning as many as the primary key it points to).

To declare this foreign key, we use the same FOREIGN KEY constraint as always, the only difference being that here we use several attributes instead of just one.

The most important thing about this constraint when we have multiple attributes is to declare them in order. For example, if we want `TripDateFK` to point to the `TripDate` attribute of the `BusTrip` primary key, then we must put those two attributes in the same order in the constraint tuple. Here, for example, they are in the first position, but we could place them both in the second position after `StartAddressFK` and `StartAddress`, or in the third (and so on), as long as they correspond.

Since this is the only foreign key that can’t be `NULL` in the table, we need to ensure that all its attributes have the `NOT NULL` constraint. But since they’re part of the primary key, we don’t need to explicitly declare the constraint.

On the other hand, for the other foreign keys that model associations with Person and BusPass, we shouldn’t add this constraint because these foreign keys will need to take a `NULL` value in certain situations. So none of the attributes require us to declare constraints.

Finally, the `TIMESTAMP` data type isn’t the only one that can store date and time in the `IssueTime` attribute – we also have alternatives like `DATETIME` or `TIMESTAMP WITH TIME ZONE`. These have specific uses, such as storing the time zone in addition to the time itself. For simplicity, in this example, we’ll use `TIMESTAMP` for all attributes that need to store date and time.

### `BusPass` entity

We can already infer the semantics of this entity from what we’ve just seen. Specifically, if a person plans to take multiple bus trips and doesn’t want to buy individual tickets for each of those trips, they can purchase a pass (represented by the `BusPass` entity) which allows them to take multiple trips without worrying about tickets.

If we look at the conceptual diagram, we’ll see that it has several associations of type `1-*`, where one of them is affected by the XOR constraint. So given the minimum cardinalities of this association, it may not exist, as we explained earlier. So we know that there won't always be a foreign key pointing to `BusPass`, since the association is optional due to its minimum cardinalities.

But on the other hand, we have the other association with `Person` that results in a foreign key in `BusPass` that always has to exist, because all passes must have an associated person (meaning every pass must have an owner).

```pgsql
CREATE TYPE ModalityType AS ENUM( 'single', 'round_trip', 'daily', 'weekly', 'monthly', 'annual' ); 
CREATE TABLE BusPass (
    PassID SERIAL PRIMARY KEY,
    IssueDate DATE NOT NULL,
    ExpirationDate DATE NOT NULL CHECK (ExpirationDate > IssueDate),
    Modality ModalityType NOT NULL,
    RemainingTrips INT NOT NULL CHECK (RemainingTrips >= 0),
    PersonFK INT NOT NULL,
    FOREIGN KEY (PersonFK) REFERENCES Person(PersonID)
);
```

For the identification of this entity, we include a surrogate key to simplify the process. We could have selected another set of attributes as the primary key, although this would result in the entity being weak in identification, as well as a primary key with more attributes than it has using a surrogate key. So the simpler solution is generally preferred.

We should include a `CHECK` to ensure that the expiration date of the pass is after the issue date to prevent inserting tuples with inconsistent dates. Also, none of the attributes can be `NULL`. The foreign key also can’t be `NULL` because of the minimum cardinality that prevents it from being `NULL`. And finally, other attributes like modality can’t be `NULL` either. For these, we implement a custom `ENUM TYPE` where we define the different pass modalities that determine how a person can use that pass.

Lastly, we can indicate the constraint that we modeled at the conceptual level with an XOR in the same way in the relational diagram using a dashed line between the foreign keys involved. We can also indicate it with a textual note. But in the DDL, the simplest way to code it is with a `CHECK` in `BusTicket`, which is where the foreign keys involved in the integrity condition originate.

### `Voyage` entity

Continuing with the ways people in our domain travel by cruise, we have the entity `Voyage`. This models the trips taken by the cruises. Specifically, the entity stores information about the trip, such as the departure and arrival dates, as well as the ports where the trip begins and ends.

We can also see that it has an attribute called `Distance`, which might initially seem irrelevant – but `Distance` records the total distance traveled by the cruise during the trip. And this doesn’t necessarily have to match the shortest distance between the departure and arrival ports.

The decision to use this meaning for this attribute came from our domain and its constraints. That is, if we are required to record the total distance the cruise travels, in addition to the distance between both ports, the simplest option would be to add an attribute in this entity that records that magnitude.

In other words, if we didn't need to know the distance traveled by the cruise itself, we could be satisfied with knowing the distance between the departure and arrival ports (which we can determine from the port information). But we’ll use the attribute `Distance` here, which records the actual distance traveled by the cruise during the trip (since we need this information).

If we look at the conceptual model, we’ll see that this entity has two identical associations of the same type `1-*` with the entity `Port`, all with the aim of conceptually modeling that a voyage is associated with two ports, one for departure and one for arrival, where both can be the same. Regarding this last point, if they could not be the same, we would need to indicate that restriction with a note, as there are no standard elements in an entity-relationship diagram or in the relational model to represent such a situation.

On the other hand, we could also consider modeling the trip so that is has departure and arrival ports through a single `Voyage`-`Port` association with a cardinality of 2 on the `Port` side. But if we did this, conceptually, we wouldn't distinguish which port was for departure and which was for arrival. Rather, we would be modeling that the cruise passes through two ports on that trip – but we wouldn't know for sure which was the arrival or departure port (at least at the conceptual level) since at the logical level there would necessarily have to be two foreign keys pointing to Port.

So to easily distinguish between the arrival and departure ports for a trip and to clarify the semantics of the association between `Voyage` and Port, we’ll use multiple associations, each with a role that explicitly indicates the relationship the port has with the trip.

In addition to these associations, the `Voyage` entity needs to reference `CruiseShip` to know which cruise has made that trip. That's why, in the conceptual diagram, there is a `1-*` association with `CruiseShip`, where one cruise ship can make many trips, but a trip is only made by one cruise ship.

To identify this entity, we’ll take advantage of the fact that both the start and end dates of the trip are always defined to include them in the primary key. This means both dates can’t be `NULL` as they define the trip's duration.

But, to truly uniquely identify the `Voyage` tuples, we have to distinguish them using the departure and arrival ports of the trip, as well as the cruise ship that performs it. That's why we include all foreign keys in the primary key. If we didn’t do this, there could be several tuples of different trips made by different cruise ships or passing through different ports that could still have the same value in the departure and arrival dates. So we need to include information about the cruise ship making the trip, as well as the ports involved.

By defining the primary key this way, we are making the entity weak in identification, where its owning entities are `CruiseShip` and Port, even though part of its primary key is composed of attributes from the entity itself.

```pgsql
CREATE TABLE Voyage (
    DepartureDate DATE,
    ArrivalDate DATE CHECK (ArrivalDate >= DepartureDate),
    Distance DOUBLE PRECISION NOT NULL CHECK (Distance >= 0),
    DepartureNameFK VARCHAR(32) NOT NULL,
    DepartureCityFK INT NOT NULL,
    ArrivalNameFK VARCHAR(32) NOT NULL,
    ArrivalCityFK INT NOT NULL,
    ShipFK INT NOT NULL,
    PRIMARY KEY (
        DepartureDate,
        ArrivalDate,
        DepartureNameFK,
        DepartureCityFK,
        ArrivalNameFK,
        ArrivalCityFK,
        ShipFK
    ),
    FOREIGN KEY (ShipFK) REFERENCES CruiseShip(ShipID),
    FOREIGN KEY (DepartureNameFK, DepartureCityFK) REFERENCES Port(Name, CityFK),
    FOREIGN KEY (ArrivalNameFK, ArrivalCityFK) REFERENCES Port(Name, CityFK)
);
```

To implement this entity at the logical level, in its DDL, you can see that we first define the attributes of the entity itself, as well as those of the foreign key for the departure port, which are **(`DepartureNameFK`, `DepartureCityFK`)**.

Note that the foreign keys pointing to `Port` must have two attributes since the primary key of `Port` has two attributes. So we’ll need a total of 4 attributes to model the foreign keys that reference the departure and arrival ports of the trip, both referencing the `Name` and `CityFK` attributes of the `Port` table (which make up its primary key as we saw earlier). Also, we need another attribute, `ShipFK`, to reference `CruiseShip` and thus determine which cruise ship made the trip.

With all this, the primary key of **`Voyage`** is defined as the set of attributes **(`DepartureDate`, `ArrivalDate`, `DepartureNameFK`, `DepartureCityFK`, `ArrivalNameFK`, `ArrivalCityFK`, `ShipFK`)**.

If we had to infer the attributes that make up the primary key using only the conceptual diagram, we would need to look at the entities that the foreign keys reference. These are represented with the `1-*` associations.

For example, in `CruiseShip`, we would see that its primary key has only one attribute, so necessarily in `Voyage`, the corresponding primary key that references it must have one attribute, `ShipFK`. Meanwhile, the other two foreign keys that reference `Port` need to have two attributes each, since we can see that `Port` is identified by its name and the city where it’s located. So its primary key has two attributes **(`Name`, `CityFK`)** that we will need to reference from `Voyage`.

In the relational diagram, this is easier to interpret. We’ll see that one attribute references an attribute of the `CruiseShip` table, so we know it’s a foreign key that leads to a `1-*` association in the conceptual model.

Also, there are two other attributes that together reference two attributes of `Port` – and together, they also form a foreign key that creates a `1-*` association in the conceptual diagram, where the many side is in the entity from which the foreign key originates ( that is, in `Voyage`).

With this last foreign key, we can represent the departure port of the trip. There’s another pair of attributes **(`ArrivalNameFK`, `ArrivalCityFK`)** that follow the same pattern to represent the arrival port of the trip. From them, we can also infer that at the conceptual level, there’s another association with the same characteristics.

And, since all these foreign keys are underlined, this implies they are part of the primary key of `Voyage`. From that we can infer that `Voyage` is weak in identification.

Lastly, if we look at the data types of the foreign keys, we’ll see that they match exactly with the types of the attributes they reference. This is especially important because a foreign key, by definition, is an attribute that holds the value of another attribute it references, so both must be of the same type for this to be possible.

Since foreign keys are made up of multiple attributes, in this case, we also need to consider the relative order of the attributes that form the foreign key with the order of the attributes they reference. This is unlike what happens in the `PRIMARY KEY` constraint, where the order in which the primary key attributes are declared doesn’t matter. In that case, in `PRIMARY KEY`, we are declaring a set of attributes, where what matters is that they appear in the constraint (not that they follow a specific order).

### `CruiseBooking` entity

For a person to travel on a cruise, they must make a reservation for a specific voyage. So in our domain, we have the entity `CruiseBooking`, which is responsible for storing the reservations people make to travel on a cruise.

The data stored for each reservation includes the booking date, cabin number, price, and payment method. To know which person has booked which voyage, the entity has `1-*` associations with `Person` and `Voyage`, which logically translate into two foreign keys pointing to the respective entities.

To uniquely identify each booking, we could choose the easy option of including a surrogate key attribute to serve as the primary key. But to illustrate the complexity of not doing this, we’ll use only attributes from the table itself to identify its tuples. So the primary key of this entity is composed of the attributes `BookingDate`, `CabinNumber`, the foreign key to `Person`, and the other foreign key to `Voyage`.

We do this because we assume that multiple people can book the same cabin for the same voyage, all on the same date. For example, this can happen if several people from the same family decide to book a certain voyage. Each of those people will have a record or tuple in the `CruiseBooking` table with the same attributes in `BookingDate`, `CabinNumber`, and the foreign key of `Voyage`, but a different value in the foreign key of `Person`. This allows the tuples to be uniquely distinguished.

The foreign key to `Person` has a single attribute since the primary key of `Person` has only one attribute. But the other foreign key that refers to the voyage being booked has exactly 7 attributes (as the `Voyage` entity requires 7 attributes to be uniquely identified).

With this, we realize that the primary key of `CruiseBooking` will have a total of 10 attributes, making it a much more complex solution than simply using a surrogate key. So you can see why it’s very convenient to use surrogate keys whenever possible for this type of entity – especially when the foreign keys that will be part of the primary key have too many attributes, as in this case.

```pgsql :collapsed-lines
CREATE TYPE PaymentMethodType AS ENUM ('card', 'paypal', 'bank', 'cash', 'mobile');
CREATE TABLE CruiseBooking (
    BookingDate DATE NOT NULL,
    CabinNumber INT NOT NULL CHECK (CabinNumber > 0),
    Price DOUBLE PRECISION NOT NULL CHECK (Price >= 0),
    PaymentMethod PaymentMethodType NOT NULL,
    PersonFK INT NOT NULL,
    DepartureDateFK DATE NOT NULL,
    ArrivalDateFK DATE NOT NULL,
    DepartureNameFK VARCHAR(32) NOT NULL,
    DepartureCityFK INT NOT NULL,
    ArrivalNameFK VARCHAR(32) NOT NULL,
    ArrivalCityFK INT NOT NULL,
    ShipFK INT NOT NULL,
    PRIMARY KEY (
        BookingDate,
        CabinNumber,
        PersonFK,
        DepartureDateFK,
        ArrivalDateFK,
        DepartureNameFK,
        DepartureCityFK,
        ArrivalNameFK,
        ArrivalCityFK,
        ShipFK
    ),
    FOREIGN KEY (PersonFK) REFERENCES Person(PersonID),
    FOREIGN KEY (
        DepartureDateFK,
        ArrivalDateFK,
        DepartureNameFK,
        DepartureCityFK,
        ArrivalNameFK,
        ArrivalCityFK,
        ShipFK
    ) REFERENCES Voyage(
        DepartureDate,
        ArrivalDate,
        DepartureNameFK,
        DepartureCityFK,
        ArrivalNameFK,
        ArrivalCityFK,
        ShipFK
    )
);
```

If we look at the DDL, it seems much more complex than the previous ones. But actually, the elements we used are the same. We define the primary key with `PRIMARY KEY`, and the attributes of the foreign keys with the same data types as the attributes they reference. We also use the `NOT NULL` constraint to correctly implement what's indicated in the minimum cardinalities of the associations.

We declare each foreign key with `FOREIGN KEY`, which is longer in this case due to the number of attributes that make up each one. The only important thing to keep in mind here is that one of the `FOREIGN KEY`s is exclusively dedicated to declaring the foreign key to `Person` (meaning the association between `CruiseBooking` and `Person`) while the other models the association with `Voyage`.

We do this without mixing attributes of both foreign keys in the same `FOREIGN KEY` – as this would be an error since we wouldn't be modeling the conceptual diagram correctly. Each foreign key is independent of the others, so each `FOREIGN KEY` includes only the attributes that make up each corresponding foreign key.

To simplify the domain of the `PaymentMethod` attribute, we can define a `TYPE ENUM`, since the payment method is an attribute that will likely be used in other parts of the domain. Even if it's not needed now, it's possible that in a future expansion of the domain, we might need to include it in the schema. This is why it's important to declare it to make database management easier in a potential expansion.

### `Pool` entity

In our domain, there are also pools, which are represented in the IS-A hierarchy with the entity `Pool` as the superclass. This allows people to interact with pools in different ways, as we will see below. So we consider that our domain includes different types of pools, such as cruise pools found on cruise ships modeled with `CruiseShip`, city pools found in cities, or `Olympic` pools also found in cities.

Since they all share common attributes, we do the same as in the `Vehicle` hierarchy, using a superclass that includes these common attributes like the pool's name, its address, minimum and maximum depths, or the current state of the pool.

We also include a **`1-*`** association between `Pool` and `City` to represent that all pools are located in a city – except for those of type `CruiseShip`, which are on a cruise ship and not in a city. In that specific case, the semantics of the association are different, as we’ll see later. From this, we can define different types of pools with distinct characteristics, where all of them inherit all the attributes of their superclass, including the association with `City`.

As we can see, `CityPool` and `OlympicPool` have no issue with this, but `CruisePool` models pools on cruise ships, so its association with `City` does not have the same semantics as the others. In other words, the pool is not located in a city but on a cruise ship – so we assume that the associated city is its place of manufacture.

As you can guess, this is not the only way to model this domain, nor is it the best, since the "locatedAt" semantics indicated in the conceptual diagram's association between `City` and `Pool` does not capture the meaning of that relationship when the pool is of type `CruisePool`. But once we clarify this, the model is correct in the sense that all essential elements are represented correctly, even if not in the best possible way.

### How can we translate the pool hierarchy entities at the conceptual level to tables?

Once we’ve clarified the semantics of the hierarchy, we can follow the same process as before to implement it at the logical level.

![Part of the entity-relationship diagram where the IS-A hierarchy of pools is represented according to their type.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754731726248/2494ed94-aca0-401d-abe5-1e91481f336a.png)

First, we note that the hierarchy is not complete, as we assume that in our domain there are many types of pools, of which we only model 3 with specific entities, while the rest are pools modeled with occurrences of the `Pool` entity.

In other words, if a pool is one of the types of the **inheriting entities**, it will be represented as an occurrence of that entity, while if it’s of a different type, it will be represented by an **occurrence of the superclass**. So, in the hierarchy, pools aren’t required to belong to the inheriting entities, making it **incomplete**.

On the other hand, the types of pools are all disjoint, meaning a pool can’t be both Olympic and cruise at the same time, or city and Olympic at the same time. So the hierarchy is disjoint because there won’t be any pool that is of multiple types at once.

Just like in the `DrivingLicenseRequest` hierarchy, pools here are also uniquely identified with a surrogate key in the PoolID attribute, while the rest of the entities in the hierarchy initially do not have any type of identification.

This might lead us to think that the best way to implement the hierarchy is, once again, with a table for each entity. But this doesn't necessarily have to be the case because a single table can be used to implement multiple entities at once, using the table's identifier to distinguish between the entities. This is because we assume that the domain does not impose any restrictions, unlike in the Vehicle hierarchy where each type of vehicle had to have its own identifier.

Regarding the decision to implement a table for the **superclass**, whenever we have an **incomplete hierarchy**, we’ll need a specific table for the superclass – specifically to store information about pools that don’t belong to any type present in the inheriting entities. This means we need to include a **`Pool` table**.

Later, to decide whether to use that table to implement all entities in the hierarchy, only some of them, or to include a table for each inheriting entity, we need to look at the number of attributes the inheriting entities have. In this case, we see they have too many attributes, especially `CruisePool` and `CityPool`, so the simplest option is to implement a table for each entity in the hierarchy.

Another option we would have is to use the `Pool` table to also represent `OlympicPool` (which has the fewest attributes) and model the rest of the entities with specific tables. But this has disadvantages, such as the division in how we represent each type of pool.

For example, while we represent `OlympicPool` with some attributes in `Pool` that may or may not be `NULL` depending on whether the pool is of that type, the other types of pools would be represented differently. This can be confusing when querying the database.

We also need to consider that some foreign keys point to `OlympicPool`, so those foreign keys would only be valid for tuples in `Pool` whose corresponding attributes `SpectatorMaxCapacity` and `CompetitionLanes` aren’t `NULL`, greatly complicating database management, creating more constraints, and possibly complicating certain queries.

Although, no matter how complicated this option is, it would be possible to implement it, and it would be just as valid as implementing a table for each entity. That is, the complexity of an implementation can make it unfeasible but not incorrect – as long as the corresponding constraints are defined to maintain data integrity.

So even though in this case the simplest option is to use a table per entity, that doesn't mean there aren't other correct ways to implement the hierarchy. This means that from the entity-relationship diagram, we can’t infer the exact way it’s finally implemented, although it can be useful for making that decision.

```pgsql
CREATE TYPE PoolStatusType AS ENUM ('open', 'closed', 'maintenance', 'renovation');
CREATE TABLE Pool (
    PoolID SERIAL PRIMARY KEY,
    Name VARCHAR(32) NOT NULL,
    Address VARCHAR(32) NOT NULL,
    MinDepth INT NOT NULL CHECK (MinDepth >= 0),
    MaxDepth INT NOT NULL CHECK (MaxDepth >= MinDepth),
    Status PoolStatusType NOT NULL,
    CityFK INT NOT NULL,
    FOREIGN KEY (CityFK) REFERENCES City(CityID)
);
```

After deciding how to translate the hierarchy to the logical level, we add the table to the relational diagram and code it in the SQL DDL. As you can see, it’s very similar to the `Vehicle` table, with a surrogate key as an identifier, the entity attributes that characterize all pools, and a foreign key that references the City table. This determines the city where the pool is located (or manufactured in the case of a pool of the type `CruisePool`).

Regarding the status of the pool, we can see that it’s modeled here with a `Status` attribute. We define an `ENUM TYPE` for it to limit its domain. This design decision is justified because in this hierarchy we’re representing the types of pools in the inheriting entities, not their statuses. So to represent the statuses of the pools, we’ll need to use a different mechanism than **generalization/specialization**, such as a simple **`Status` attribute**.

There are other ways to model this, but they’d be more complex. This doesn’t make them wrong, but we won’t discuss or show them here.

To represent this attribute's data type in the entity-relationship diagram, we have chosen to define a **«Enum»** entity in UML with the possible values the attribute can take. Entities with the **«Enum»** type serve the same purpose as using a `TYPE ENUM` in SQL. This defines a set of values that can then be used as a data type for an attribute, thus restricting its domain.

But in general, this doesn’t have to be fully specified at the conceptual level. We could’ve simply used **string** as the data type and omitted this **«Enum»** entity, limiting its domain later at the logical level. Or rather, when the logical model is implemented in the DBMS.

Still, if we want our design to be as clear and self-descriptive as possible at all levels, we should indicate the possible values that attributes can take at all levels, as restricting the domain implicitly imposes an integrity constraint. We can do this through «Enum» entities, side notes, or by using other applicable standard UML elements.

### `CruisePool` entity

Just as we did in the `Vehicle` hierarchy, here each type of pool is represented with a dedicated table. This way, when registering a new `CruisePool` type pool in our system, a tuple will be created in this table where the data characterizing cruise pools is stored. But the data that characterizes it as a pool won’t be stored there, as those can only be stored in the `Pool` table.

So to logically model the inheritance of all `Pool` attributes to the specific type of pool, we’ll use a foreign key to point to the `Pool` tuple that contains the rest of the pool information. Specifically, we’ll choose `PoolID` as the foreign key, as it’s the identifier of the pools in our system. We declare it it as the same SERIAL type to reference that same attribute in the `Pool` table, where it’s the primary key.

As you can guess, the `Pool` table not only stores information about pools that aren’t specifically modeled in our system, but it also contains information about pools of each of these types. So, if we want to get information about all the pools in our system, regardless of their type, we just need to query the `Pool` table.

This is possible because we have a table for the superclass, whereas in other hierarchies we might not implement it, which would require us to query multiple tables to get information about all the pools in the system. This is not necessarily a problem, but it’s worth considering when implementing the hierarchy or even modeling certain aspects of our domain with hierarchies.

For example, if we have a `Pool` and want to know its type, we must check the rest of the tables in the hierarchy to see if there is any tuple referencing that pool. This results in a very computationally expensive operation because it has to go through all the stored data. If our system needs to prioritize efficiency in such a query, it’d be helpful to modify the hierarchy implementation to make sure that this query runs as quickly as possible.

For instance, adding a redundant attribute in `Pool` to indicate the type, even though it introduces redundancy and unnecessary additional space, can greatly optimize the latency of certain queries. Just make sure you make these decisions according to project requirements, such as the latency that queries must have, the space the database should occupy, and so on.

```pgsql
CREATE TABLE CruisePool (
    PoolID SERIAL PRIMARY KEY,
    DeckNumber INT NOT NULL CHECK (DeckNumber >= 0),
    MaxCapacity INT NOT NULL CHECK (MaxCapacity >= 0),
    WaterTemperature DOUBLE PRECISION NOT NULL,
    SlideCount INT NOT NULL CHECK (SlideCount >= 0),
    ShipFK INT NOT NULL,
    FOREIGN KEY (PoolID) REFERENCES Pool(PoolID),
    FOREIGN KEY (ShipFK) REFERENCES CruiseShip(ShipID)
);
```

In addition to the foreign key pointing to `Pool` (which also serves as the primary key, making this table weak in identification with `Pool` as its owner entity), we have another foreign key referencing CruiseShip to determine the cruise on which the pool is located. And, since all cruise pools must be on a cruise ship to be of that type, the foreign key pointing to CruiseShip can’t be `NULL`. It must always reference a valid cruise. This is why we include the `NOT NULL` constraint, which we don’t do for `PoolID` because we are declaring it as the primary key.

### `CityPool` entity

Another type of pool we can find is a municipal pool, represented by the entity `CityPool` and implemented with its specific table. Its DDL is very similar to the previous one, with the unique feature that in this case, we have a foreign key pointing to `CityPool`, which can be directly inferred from the `1-*` type association connecting `CityPool` with Entry in the conceptual diagram.

```pgsql
CREATE TABLE CityPool (
    PoolID SERIAL PRIMARY KEY,
    MaxCapacity INT NOT NULL CHECK (MaxCapacity >= 0),
    AnnualBudget DOUBLE PRECISION NOT NULL CHECK (AnnualBudget >= 0),
    AccessibilityFeatures VARCHAR(32) NOT NULL,
    FreeWifi BOOLEAN NOT NULL,
    FOREIGN KEY (PoolID) REFERENCES Pool(PoolID)
);
```

In the relational diagram, it's important that the foreign key `PoolID` is underlined, indicating that this attribute, despite being a foreign key, is used to uniquely identify the tuples in `CityPool`. This means that when referencing the primary key of `PoolID`, the foreign key that refers to it contains exactly the value that identifies the pool in Pool.

So if a query simply needs the identifier of a pool of a specific type, we don’t need to access the Pool table, as the foreign key attribute of the `CityPool`, `CruisePool`, or `OlympicPool` table, for example, is enough to know it.

There are even times when we can access data from other tables that are indirectly associated through more levels of association, as in CruiseBooking, where we can access the identifier of a `CruiseShip` through the value of its foreign key, which doesn't point directly to CruiseShip, but to Voyage.

### `OlympicPool` entity

Regarding the last type of pool in our schema, there's `OlympicPool`, which represents Olympic pools. The implementation of this entity as a table is the same as the previous ones, with the difference that in the entity-relationship diagram, we can see that there are two foreign keys pointing to `OlympicPool`. Otherwise, the only differences are in the attributes that characterize the type of pool.

```pgsql
CREATE TABLE OlympicPool (
    PoolID SERIAL PRIMARY KEY,
    SpectatorMaxCapacity INT NOT NULL CHECK (SpectatorMaxCapacity >= 0),
    CompetitionLanes INT NOT NULL CHECK (CompetitionLanes > 0),
    FOREIGN KEY (PoolID) REFERENCES Pool(PoolID)
);
```

### `Entry` entity

Continuing with what a person can do in a pool in our system, we have the entity `Entry`. This is responsible for storing tickets that a person can use to enter a municipal pool, meaning one that is represented by the `CityPool` entity only.

To ensure that a person can only access a municipal pool with these tickets, the entity has a `1-*` association with `CityPool`, and not directly with `Pool`, as that would give access to any pool regardless of type. Also, to know which person the ticket belongs to, it also has a `1-*` association with `Person`, where a person can have an arbitrary number of tickets, but a ticket can only belong to one person.

On the other hand, we also have a `1-*` association where the 1 side is in `Entry`, modeling that the tickets can have associated penalties, which we’ll see later. So, with all this, we can know that at a logical level, `Entry` will have 2 foreign keys pointing to other entities, as well as a foreign key from another entity pointing to `Entry`.

To uniquely identify the tickets, the most important attribute is `EntryTimestamp`. This records the exact time the ticket was purchased. But several people can buy tickets at the same time to enter the same pool, leading to multiple tuples with the same `EntryTimestamp` value, so the primary key must have more attributes to uniquely identify all the tickets.

Specifically, the primary key needs the foreign key attributes `PersonFK` and `PoolFK` to differentiate entries by the person who bought them and the pool they enter, as well as the exact time of purchase. So if we consider the possible situations and combinations of values that can occur for the primary key of `Entry`, we’ll see that a person can’t buy multiple entries at the exact same moment to enter the same pool.

This makes sense when the domain states that each ticket is associated with a single person and that a person can’t buy a ticket for someone else. In other words, if a person buys a ticket, they must use it themselves. They can’t buy multiple tickets for several people to enter. This doesn't have to be the case in all domains – we're just assuming here that people can't buy tickets for others.

In other domains, this might need to be modeled differently depending on the requirements. So, we’ll need to make sure that our model meets these types of requirements imposed by the domain, especially when defining **primary keys** or `UNIQUE` constraints.

So by requiring the attributes `PersonFK` and `PoolFK` to be present in the primary key, the Entry entity becomes weak in identification with two owning entities, `Person` and `CityPool`, respectively. In the DDL, we have explicitly added the `NOT NULL` constraint to all attributes for clarity, although it wouldn't be necessary for those present in the primary key.

```pgsql
CREATE TABLE Entry (
    EntryTimestamp TIMESTAMP NOT NULL,
    Price DOUBLE PRECISION NOT NULL CHECK (Price >= 0),
    PaymentMethod PaymentMethodType NOT NULL,
    AppliedDiscount DOUBLE PRECISION NOT NULL CHECK (AppliedDiscount >= 0),
    Duration INT NOT NULL CHECK (Duration >= 0),
    PersonFK INT NOT NULL,
    PoolFK INT NOT NULL,
    PRIMARY KEY (EntryTimestamp, PersonFK, PoolFK),
    FOREIGN KEY (PersonFK) REFERENCES Person(PersonID),
    FOREIGN KEY (PoolFK) REFERENCES CityPool(PoolID)
);
```

On the other hand, the `EntryTimestamp` attribute of type `TIMESTAMP` is named differently from the `IssueTime` attribute of the `BusTicket` entity, for example.

This isn't very important, but in a real design process, we might be required to use style guides that determine how we should name each attribute depending on its semantics, type, or constraints, as well as when and how we should declare certain constraints. In this specific case, we didn't follow any style guide – we simply named the attributes as descriptively as possible according to the circumstances. Still, following a style guide offers advantages in system maintainability and ease of administration, among others.

### `Team` entity

To hold competitions in Olympic pools, our system needs to be able to model sports teams made up of people who participate in these competitions. So we have the entity `Team`, which represents sports teams that have a reference Olympic pool, are made up of people, and participate in competitions in Olympic pools.

This is modeled by using the attributes of `Team` to store the characteristics of the sports teams, such as the name, creation date, uniform color, and so on. We can also use associations with other entities to determine which Olympic pool is the team's official pool, which people belong to the team, who coaches the team, and which competitions they participate in.

First, to model the Olympic pool considered the team's official pool, we’ll use a `1-*` association with `OlympicPool`, which becomes a foreign key due to its cardinality. As you can see in the conceptual diagram, the role of the association specifies the semantics, since without it, you can’t directly infer what is being modeled with that association.

The same applies to the `1-*` association with `Person`, which we use to determine who coaches the team, so we need to specify its semantics to avoid confusion about what that association actually models. Although, given their cardinalities, it’s clear that a team can only have one person as a coach, not an arbitrary number of people, so we can rule out that the association models the people who belong to the team.

On the other hand, besides the foreign keys that Team has, there are others that point to Team and are responsible for modeling the people who make up the team, such as the one from Membership, or the team's participation in competitions, like the one we see from `Participation`.

```pgsql
CREATE TYPE SportType AS ENUM ('waterpolo', 'swimming', 'diving');
CREATE TABLE Team (
    Name VARCHAR(32),
    CreationDate DATE NOT NULL,
    ClothColor ColorType NOT NULL,
    Sport SportType NOT NULL,
    Budget INT NOT NULL CHECK (Budget >= 0),
    ContactEmail VARCHAR(32) NOT NULL,
    CoachFK INT NOT NULL,
    HomePoolFK INT NOT NULL,
    PRIMARY KEY (Name, CoachFK),
    FOREIGN KEY (CoachFK) REFERENCES Person(PersonID),
    FOREIGN KEY (HomePoolFK) REFERENCES OlympicPool(PoolID)
);
```

To uniquely identify each team, the attribute that can serve us best from the table itself is `Name`. But in this domain, we assume that multiple teams can have the same name, so the primary key can’t be formed solely by that attribute.

So from all the other attributes we have, we finally include the foreign key `CoachFK` in the primary key, meaning we also use the information of the person who coaches the team to uniquely identify it. This works because we assume that there can’t be multiple teams with the same name coached by the same person.

At first glance, this might seem entirely possible, but consider that some domain requirements might impose this condition, which we can leverage to define **(`Name`, `CoachFK`)** as the primary key. In any case, before making such a decision, make sure that the set of attributes meets the primary key restriction, either due to domain requirements or the semantics of the attributes themselves.

We can declare foreign keys with `FOREIGN KEY` referencing the primary key of Person and OlympicPool. We impose the `NOT NULL` restriction on them since all teams must have a coach and an official Olympic pool. Here, we have also assumed the necessity of these elements, but in other cases it might not be mandatory to have an official pool or a coach – it all depends on the domain.

If having a coach were not mandatory, we couldn’t include the foreign key attribute `CoachFK` in the primary key, as it could be NULL and would violate the primary key restriction. So for an entity to be weak in identification and another to be its owner, the association between them must be mandatory, meaning its minimum cardinality on the owner's side can’t be 0. Finally, we define a `TYPE ENUM` here for the type of sport the team plays, which is stored in the `Sport` attribute. But we don’t need to redefine it for the `Color` attribute, as we had the `ENUM ColorType` defined earlier, which is the best example of how a data type is **reused** across attributes with the same domain in different entities.

### `Membership` entity

We’ll continue with the semantics of the previous entity. To model the possibility of people being part of a team, the simplest approach would be to include an N-M association between `Person` and `Team`. This would be in addition to the `1-*` association that already exists to model the person who coaches the team. This way, a person can belong to an arbitrary number of teams, while a team can be composed of an arbitrary number of people.

But since this association requires an intermediate entity to be implemented at the logical level, and we also need to store information about a person's membership in a team, we’ll introduce the `Membership` entity. This entity divides the N-M association into several `1-*` associations, indirectly connecting `Person` with `Team`. In this way, each person belonging to a team will have a tuple in this table representing their membership. It’ll store information such as the start or end date of membership or the fee they must contribute to the team to be part of it.

At the conceptual level, we can see that this entity has many similarities with others like Residence. For example, we define the primary key of this entity with the attribute JoinDate and the foreign keys that determine the `Person` who belongs to a certain team. This is because the attributes that appear exclusively in the entity can’t uniquely identify each membership. That is, there can be multiple people who started belonging to different teams on the same date, causing multiple tuples in `Membership` with the same value in their primary key.

So even though the foreign key attributes don’t explicitly appear at the conceptual level, it’s clear that a `Membership` tuple must be identified not only by the start date but also by the person and team it relates to. This will avoid situations where multiple tuples with the same person and date are considered equal, or with the same team and start date. So we know it’s a weak entity in identification that’s dependent on `Person` and `Team`.

Since it depends on both entities it’s related to for identification, we could have represented it as an associative entity connected with the possible N-M association between `Person` and `Team`. But to make the diagram as clear and close to the logical level as possible, we should instead use an "intermediate" entity like the one represented here with `1-*` associations.

```pgsql
CREATE TYPE PaymentFrequencyType AS ENUM('monthly', 'anual', 'weekly', 'quarterly');
CREATE TABLE Membership (
    JoinDate DATE NOT NULL,
    LeaveDate DATE CHECK (
        LeaveDate IS NULL
        OR LeaveDate >= JoinDate
    ),
    FeeAmount INT NOT NULL CHECK (FeeAmount >= 0),
    PaymentFrequency PaymentFrequencyType NOT NULL,
    AutoRenewal BOOLEAN NOT NULL,
    PersonFK INT NOT NULL,
    TeamNameFK VARCHAR(32) NOT NULL,
    CoachFK INT NOT NULL,
    PRIMARY KEY (JoinDate, PersonFK, TeamNameFK, CoachFK),
    FOREIGN KEY (PersonFK) REFERENCES Person(PersonID),
    FOREIGN KEY (TeamNameFK, CoachFK) REFERENCES Team(Name, CoachFK)
);
```

To implement the foreign keys, we’ll create the corresponding attributes: `PersonFK`, which is the foreign key pointing to Person, and (`TeamNameFK`, `CoachFK`), where both constitute the other foreign key referencing the team to which the person belongs. Both keys are **not null** because a `Membership` tuple must associate a person with a team.

Once we’ve declared the attributes and `FOREIGN KEY` constraints, we can define the primary key as the set of attributes consisting of **`JoinDate`**, the foreign key attribute `PersonFK`, and the other two attributes **(`TeamNameFK`, `CoachFK`)** of the foreign key referencing the team. We can declare them in any order in the `PRIMARY KEY` constraint, as long as they all appear.

Finally, according to the domain, we assume that people don’t know exactly when they will stop being members of a team, so `LeaveDate` doesn’t always have to be defined. This means it can be `NULL` until the person leaves the team or plans to leave on a specific date. So we have to define a `CHECK` constraint on that attribute to make sure that it’s either `NULL` or the date is after JoinDate, as a person can’t leave a team before the start date of membership.

### `Participation` entity

Similarly, a sports team can also participate in sports competitions registered in `SwimmingCompetition`. So we have an entity called `Participation` that indirectly links Team with `SwimmingCompetition` through `1-*` associations. This is just like we saw earlier with `Membership`, but with a different meaning. Specifically, what mainly changes is the information stored about the team's participation in a competition, such as the date they register to participate, their ranking position after the competition, or the time it took to complete the competition.

To uniquely identify the tuples of `Participation`, the simplest way is to use a custom database identifier as a surrogate key, just as we have done before with certain entities. But if the domain requirements don’t allow us to include surrogate keys or any additional database-specific identifier, we’ll need to choose a set of attributes that enable identification.

So if we assume that no team participates more than once in the same competition (as this wouldn't make sense), we can declare a primary key formed by the foreign keys referencing `Team` and `SwimmingCompetition`. This way, we ensure that different tuples of `Participation` don’t associate the same team with the same competition, as that situation can’t occur.

As you can see, identifying this entity completely depends on other entities like Team and `SwimmingCompetition`, meaning there is no attribute at the conceptual level of the entity that forms part of the primary key.

This isn’t necessarily a bad thing, but rather a consequence of the domain requirements preventing us from using a surrogate key. In fact, this dependency in identification can have certain advantages, such as avoiding additional columns, which might be a domain-imposed requirement (to use the fewest columns possible).

```pgsql
CREATE TABLE Participation (
    RegistrationDate DATE NOT NULL,
    Rank INT NOT NULL CHECK (Rank > 0),
    RecordedTime DOUBLE PRECISION NOT NULL CHECK (RecordedTime >= 0),
    NameFK VARCHAR(32),
    StartDateFK DATE,
    EndDateFK DATE,
    TeamNameFK VARCHAR(32),
    CoachFK INT,
    PRIMARY KEY (
        NameFK,
        StartDateFK,
        EndDateFK,
        TeamNameFK,
        CoachFK
    ),
    FOREIGN KEY (TeamNameFK, CoachFK) REFERENCES Team(Name, CoachFK),
    FOREIGN KEY (NameFK, StartDateFK, EndDateFK) REFERENCES SwimmingCompetition(Name, StartDate, EndDate)
);
```

At the logical level, the foreign key referencing Team has two attributes, which make up the primary key of Team. The foreign key pointing to `SwimmingCompetition` has three for the same reason. So we’ll use two `FOREIGN KEY` constraints: one to declare the foreign key pointing to Team and the other for the one pointing to `SwimmingCompetition`, respectively.

Note that the `FOREIGN KEY` constraint only allows one `REFERENCES` clause. So if we have multiple foreign keys pointing to various entities, we have to use a separate `FOREIGN KEY` constraint for each foreign key. If we try to declare them all with a single constraint, we would have to indicate the multiple entities/tables being referenced, which means we would need to use multiple `REFERENCES` statements.

After declaring the foreign keys and adding their respective `NOT NULL` constraint, since it’s mandatory for a participation to relate a team with a competition, we declare the foreign key as the set of attributes that form both foreign keys together. So in our system, there can be `Participation` tuples with different `Rank` or `RegistrationDate` values without any problem – but there can’t be multiple tuples with the same value in their primary key (meaning they can’t relate the same team with the same competition multiple times).

Finally, if we try to reconstruct the conceptual entity from the relational diagram, the first thing we should notice is that all the foreign keys are underlined, and therefore form the primary key. As they are foreign keys, these attributes won’t appear in the conceptual entity of `Participation`.

To determine how many foreign keys we actually have, and know how many `1-*` associations to introduce and with which entities to connect them, we can see that a subset of attributes like **(`TeamNameFK`, `CoachFK`)** refers to the same entity – so there will be a `1-*` relationship with that entity, with the many side in `Participation`. Doing the same with the attributes **(`NameFK`, `StartDateFK`, `EndDateFK`)**, we see that they all refer to attributes of the same entity. So they form a foreign key that results in a `1-*` association like the previous one, but connecting with another entity.

To infer the minimum cardinalities, we should look at the constraints indicated in the relational diagram: which foreign keys can or can’t be `NULL`, or how many participations each competition must have (as well as the participations each team must have).

In this case, we haven’t indicated any constraints in the relational diagram for simplicity. But, for example, if we were told that a foreign key can’t be `NULL` in the relational model, this conceptually translates to its respective `1-*` association having a minimum cardinality of 1 on the 1 side. Similarly, if there are special constraints that require each team to have 2 participations, for example, then we know that in its corresponding association, the minimum cardinality on the `Participation` side would be 2. This reverse process is what we initially followed to implement the entity at the logical level, where the attributes that make up each foreign key are inferred, and those selected to declare the primary key.

### `SwimmingCompetition` entity

To model the sports competitions that can take place in an Olympic pool, in the conceptual diagram we have the entity called `SwimmingCompetition` that’s responsible for storing information about the competitions held in all the Olympic pools registered in the system. In these, any number of sports teams can participate.

The information that `SwimmingCompetition` stores mainly depends on the domain and requirements. In this case, we assume that we only need to store the name of the competition, start and end dates that will always be determined, a `RecordTime` attribute to store any record times achieved during the course of that competition, and the monetary amount of the prize for that competition.

With these attributes, the simplest way to uniquely identify each tuple in the `SwimmingCompetition` table is to define the set of attributes **(`Name`, `StartDate`, `EndDate`)** as the primary key.

For example, there can be competitions in the database with exactly the same name, but they can never have the same start and end dates simultaneously (because that would mean they were the same competition). Ultimately, by declaring this primary key, we’re assuming that there are no different competitions with the same name and start and end dates – so if this condition aligns with the domain requirements, it would be correct.

Consequently, there can be different competitions in the database with different combinations of values for the primary key attributes – but they might have the **same record time**, or the same prize in `PrizeAmount`, since there are no restrictions preventing it.

```pgsql
CREATE TABLE SwimmingCompetition (
    Name VARCHAR(32),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL CHECK (EndDate >= StartDate),
    RecordTime DOUBLE PRECISION CHECK (RecordTime >= 0),
    PrizeAmount INT NOT NULL CHECK (PrizeAmount >= 0),
    PRIMARY KEY (Name, StartDate, EndDate)
);
```

In the conceptual diagram, we see that the entity has several associations that lead to the existence of a foreign key pointing to `OlympicPool`, since the competition must necessarily take place in an Olympic pool. So this foreign key references the specific pool where the competition is held, making its existence mandatory. In other words, the foreign key can’t be NULL because, in the conceptual model, we set the minimum cardinality to 1 to ensure that every competition is associated with a pool where it takes place.

Another peculiarity of this entity is that the attribute `RecordTime` may not always be defined. For example, when we register a competition in the database and need to provide a value for this attribute, such value might not exist because it’s the first time the competition is being held. So, the simplest way to model it would be to set that attribute to the maximum or minimum possible, depending on how we consider which times are better than others.

Additionally, since in our domain we also model the possibility of athletes participating in a competition being sanctioned, there is a chance that in a certain competition held for the first time, all participants could be sanctioned. This means that none of them would contribute to initializing the value of the `RecordTime` attribute. This is why it needs to be allowed to be `NULL`.

But this is a decision we must make primarily considering the domain and its requirements, as we may want to initialize the attribute with a default or special value if all athletes are penalized and the counter can’t be initialized, for example.

### `Sanction` entity

Given everything a person can do in our domain in relation to other entities, they might break a rule that results in a sanction. So in our schema, we can introduce an IS-A hierarchy where the superclass is the entity `Sanction`, and its inherited entities are the different types of sanctions we define, all depending on their scope of application.

Specifically, deciding to use a hierarchy to model sanctions is driven by the specific information that needs to be stored for each type of sanction. For this reason, if we tried to use a single `Sanction` entity to represent all these types, its semantics would be very complicated (as some attributes would only be useful if the sanction were of a certain type – and the same goes for many others). We would also need to use a specific attribute to represent the sanction type, since otherwise knowing the exact type might depend on which attributes were `NULL`, and this would complicate queries.

So with this hierarchy, we can have a set of common attributes for all sanctions in `Sanction`, such as the monetary amount of the fine, the description, the date of the sanction, or the status, while in the inherited entities, we have specific attributes that characterize each type of sanction.

### How is the IS-A hierarchy implemented with tables?

Just as we have done with other hierarchies, we need to analyze it to know how to implement it at the logical level. We need to keep in mind that the conceptual design doesn’t unequivocally determine the implementation that we’ll ultimately carry out, especially when working with IS-A hierarchy. Rather, it’s a decision we should make based not only on the conceptual design itself, but also on the domain and data requirements.

To do this, we first check whether the hierarchy is complete or not. In this case, all existing sanctions will be of a specific type represented by the inherited entities. This means that all individuals in the hierarchy will belong to one of the sets generated by these entities, which implies that the hierarchy is **complete**.

On the other hand, the types of sanctions are all disjoint, meaning a sanction can only be of one type, not several at once. This means that the hierarchy is disjoint because no individual will be represented by multiple inherited entities at the same time.

To identify each sanction, we’ll use a `SanctionID` attribute in the superclass Sanction, which we’ll implement using a surrogate key. This avoids the inherited entities needing to use their own identifiers, as we assume that the domain requirements don’t require us to identify each type of sanction differently.

So given the number of attributes each inherited entity has, it’s clear that we’ll need a table to implement each inherited entity. Otherwise, too many `NULL` values would be generated in the corresponding attributes, complicating both database management and queries, and potentially leading to unnecessary constraints aimed at ensuring schema integrity.

On the other hand, we have several options for implementing the superclass at the logical level. One option is to duplicate all attributes in each of the tables of the specific sanction types.

This has advantages, such as identifying each table using the `SanctionID` attribute inherited from the superclass, but it leads to schema management problems. If we later want to delete, modify, or add an attribute of `Sanction`, we would have to perform that operation on all the tables of the different sanction types, increasing the likelihood of errors in the process. Also, if we want to query all the sanctions in our database, with this option, we would have to go through all the tuples of all the tables of each sanction type, which could be inefficient because of accessing multiple tables.

To minimize errors in the database management process, we need to simplify the operations involved as much as possible. To do this, we can implement a specific table for the superclass of the hierarchy in the same way as we did with the Vehicle hierarchy (and for similar reasons).

Each of the tables for the inherited entities will have a foreign key referencing the superclass table, where we’ll store the information of attributes common to all sanctions. This makes it easier to modify these attributes. It also simplifies other operations, such as adding a new type of sanction. For this, only a new table for that type needs to be created, and we just need to make sure that its foreign key references `Sanction`.

If we look at the inherited entities, we’ll see that each one has a `1-*` association with other entities where the many side is always in the entities of the hierarchy. This means that using a single table to implement the entire hierarchy isn’t a good idea, as it would combine all those foreign keys into one table. This would lead to much more complicated integrity constraints.

In other words, if a sanction is of a specific type, the attributes and foreign keys of the remaining types must be `NULL`, so ensuring this for all types involves overly elaborate and complex constraints.

```pgsql
CREATE TYPE SanctionStatusType AS ENUM ('created', 'active', 'expired');
CREATE TABLE Sanction (
    SanctionID SERIAL PRIMARY KEY,
    Amount DOUBLE PRECISION NOT NULL CHECK (Amount >= 0),
    Description VARCHAR(32),
    IssueDate DATE NOT NULL,
    ExpirationDate DATE CHECK (
        ExpirationDate IS NULL
        OR ExpirationDate >= IssueDate
    ),
    Status SanctionStatusType NOT NULL
);
```

In the DDL of the `Sanction` table, we can see that its primary key `{SanctionID}` consists of a single attribute of type `SERIAL`. This is a surrogate key that will be used to identify all sanctions in the database, regardless of their type.

This table also stores the status of the sanction in an attribute, since the type of sanction is represented with inherited entities from the superclass at the conceptual level. So the status must be modeled as an attribute to avoid mixing the semantics of what we represent with each tool of the entity-relationship diagram.

In other words, we could include new inherited entities that model the states of the sanctions, but we have to consider that each type of sanction could be in any of those states – leading to an unnecessarily complicated multi-level hierarchy.

Because of this, we should separate the semantics of what we represent with inherited entities from the semantics of the sanction's status, modeling it with an attribute in the superclass, as any type of sanction can be in any state.

In this Status attribute, we define a TYPE ENUM to restrict the possible states a sanction can have. But for the Description, if we want to save a description of the sanction written in natural language, we shouldn’t add restrictions unless it’s required by the project specifications.

A description in natural language can be very diverse, so the simplest approach is not to limit the possible values the attribute can take, not even with a `NOT NULL` constraint. This can indicate that a sanction has no description, although this isn’t necessarily correct.

In general, decisions to allow `NULL` values also depend on the domain and requirements. For example, sanctions may or may not have an expiration date, which is why the `CHECK` constraint defined on ExpirationDate specifies that this attribute can either be `NULL` or must hold a date later than the issuance date of the sanction.

### `DrivingSanction` entity

Let’s now talk about the different types of sanctions in our system. First, we have `DrivingSanction`, which are sanctions associated with driver's licenses. So in the conceptual diagram, it has a `1-*` association with the `DrivingLicense` entity, resulting in a foreign key in `DrivingSanction` that references the driver's license with the sanction. This refers to the license of the person who committed a traffic violation, leading to the existence of the fine.

The specific attributes of this type of sanction are store information about why the fine was issued, such as the speed the vehicle was going, as well as the effect the sanction has on the license (like deducting a certain number of points or suspending it for a certain period).

In its DDL, we can see that all attributes have been declared as `NOT NULL`, which at first might seem unnecessary in the case of `RecordedSpeed`, since not all sanctions are caused by speed. But this illustrates that even if an attribute isn’t necessary, it shouldn’t be `NULL` to be considered unnecessary.

For example, if a sanction is not related to speed, instead of using a `NULL` value in the `RecordedSpeed` attribute, we can use a special value like 0, as long as it respects the integrity constraints and system domain requirements. This allows us to distinguish whether the sanction is related to a possible speeding violation. So we make the decision to allow `NULL` or not is initially when modeling the entity at the logical level. This works as long as we aren’t forced to use a specific semantics like setting the attribute to 0 when it’s not necessary.

If we consider whether other attributes can be `NULL` or not, we can see that PermanentSuspension always has the option to take the value **false** (as the suspension might not be permanent). Similarly, if the suspension is permanent, the `SuspensionDays` attribute can always be set to 0, or to a different special value. We could also simply ignore its value and check first if the suspension is permanent before accessing the `SuspensionDays` attribute, among other options.

```pgsql
CREATE TABLE DrivingSanction (
    SanctionID SERIAL PRIMARY KEY,
    RecordedSpeed DOUBLE PRECISION NOT NULL CHECK (RecordedSpeed >= 0),
    PointsDeducted INT NOT NULL CHECK (PointsDeducted >= 0),
    SuspensionDays INT NOT NULL CHECK (SuspensionDays >= 0),
    PermanentSuspension BOOLEAN NOT NULL,
    LicenseFK INT NOT NULL,
    FOREIGN KEY (SanctionID) REFERENCES Sanction(SanctionID),
    FOREIGN KEY (LicenseFK) REFERENCES DrivingLicense(LicenseID)
);
```

On the other hand, the `NOT NULL` is indeed necessary for both foreign keys in the table, as `SanctionID` is the foreign key that references the tuple in `Sanction` that holds the rest of the sanction information. Its primary key attribute `SanctionID` serves as the primary key of the `DrivingSanction` table itself, and it’s the only way to uniquely identify the sanctions. Also, the foreign key that references the driving license that received the sanction can’t be `NULL` either, because if the sanction is of type `DrivingSanction`, it must necessarily be associated with a license.

### `SportSanction` entity

Another type of sanction is represented in the entity `SportSanction`. This models those sanctions that occur in sports competitions, specifically those caused by a sports team while participating in a competition. Like the previous entity, it has attributes that characterize this type of sanction, such as the number of competitions the team is suspended or the name of the referee who issued the sanction.

In addition to this information, each sanction of this type needs to know which specific team received the sanction, as well as the competition they were participating in when they were sanctioned. So to model this, we have multiple options. We could use two `1-*` associations to connect `SportSanction` with `Team` and with `SwimmingCompetition`, so that from the sanction you can identify the corresponding team and competition. But this is redundant and unnecessary, as it would lead to two foreign keys that can actually be reduced to one.

Remember that in our schema, we have an entity called `Participation` that relates teams to the competitions they participate in. So instead of two `1-*` associations in `SportSanction`, we can use just one that connects it with `Participation`, since from `Participation` we can determine the team and competition.

```pgsql
CREATE TABLE SportSanction (
    SanctionID SERIAL PRIMARY KEY,
    SuspendedCompetitions INT NOT NULL CHECK (SuspendedCompetitions >= 0),
    RefereeName VARCHAR(32) NOT NULL,
    NameFK VARCHAR(32) NOT NULL,
    StartDateFK DATE NOT NULL,
    EndDateFK DATE NOT NULL,
    TeamNameFK VARCHAR(32) NOT NULL,
    CoachFK INT,
    FOREIGN KEY (SanctionID) REFERENCES Sanction(SanctionID),
    FOREIGN KEY (
        NameFK,
        StartDateFK,
        EndDateFK,
        TeamNameFK,
        CoachFK
    ) REFERENCES Participation(
        NameFK,
        StartDateFK,
        EndDateFK,
        TeamNameFK,
        CoachFK
    )
);
```

To implement this in SQL, we can create a table very similar to `DrivingSanction`, where its primary key is the attribute `SanctionID`, also declared as a foreign key referencing the Sanction table of the superclass. We can declare attributes in the same way as we have been doing so far, both for the attributes of the entity itself and for the foreign keys. The foreign keys must have the same data types as the attributes they reference.

In this case, to declare the foreign key that points to `Participation`, we need as many attributes as its respective primary key has, which is a total of 5. To simplify this process, the ideal approach is to look directly at the `PRIMARY KEY` constraint of the table we want to reference. Then for each of those attributes, we can declare it in our table with a characteristic name and the corresponding data type. We finally add it to the `FOREIGN KEY` constraint so that it references the attribute that originated it, as we have already seen.

For example, if the primary key of `Participation` is **(`NameFK`, `StartDateFK`, `EndDateFK`, `TeamNameFK`, `CoachFK`)**, then we declare an attribute `NameFK` for the foreign key of `SportSanction` that points to the `NameFK` attribute of that primary key, another `StartDateFK` that points to the `StartDateFK` attribute of the primary key of `Participation`, and so on.

### `PoolSanction` entity

To conclude the hierarchy of sanctions, we have `PoolSanction`. These, as you can guess, are sanctions imposed on people who have entered a `CityPool` and violated the pool rules. In this case, we store start and end dates as attributes, indicating the period during which the person can’t enter the pool. We can also include an amount as compensation if necessary, or a number of community service hours that the person must complete.

To determine from the sanction which person and pool are affected by the sanction, we can use a `1-*` association with `Entry`. This results in a foreign key in `PoolSanction` that points to `Entry` because the many side is placed in `PoolSanction`. This way, we can identify the entry the person used when they received the sanction.

Besides the person, the entry also provides information about the pool they will no longer be able to enter freely. The sanction determines when they can re-enter or the action they must take due to being sanctioned.

```pgsql
CREATE TABLE PoolSanction (
    SanctionID SERIAL PRIMARY KEY,
    BanStartDate DATE,
    BanEndDate DATE,
    CompensationRequired INT NOT NULL CHECK (CompensationRequired >= 0),
    CommunityServiceHours INT NOT NULL CHECK (CommunityServiceHours >= 0),
    EntryFK TIMESTAMP NOT NULL,
    PersonFK INT NOT NULL,
    PoolFK INT NOT NULL,
    FOREIGN KEY (SanctionID) REFERENCES Sanction(SanctionID),
    FOREIGN KEY (EntryFK, PersonFK, PoolFK) REFERENCES Entry(EntryTimestamp, PersonFK, PoolFK),
    CHECK (
        (
            BanEndDate IS NULL
            AND BanStartDate IS NULL
        )
        OR BanEndDate >= BanStartDate
    )
);
```

In its DDL, we can see that the table identification is the same as the previous ones, with a primary key composed of the foreign key pointing to Sanction, as well as another foreign key pointing to `Entry` (which consists of three attributes). In this case, the sanction can impose several conditions on the sanctioned user: it can either prohibit them from entering for a period of time, require them to pay compensation, or serve a certain number of community service hours.

So if we assume that the domain and requirements don’t force us to store `NULL` values in any attribute and that we can make any decision about how data is stored in the system, we’ll decide to allow BanStartDate and `BanEndDate` to be `NULL` for sanctions that don’t prohibit the sanctioned user from entering the pool. Thus, in the `CHECK` constraint defined at the end, we see that as an integrity condition for all tuples in the table, both attributes must be either null or the end date must be after the start date of the prohibition. This ensures that only valid data is stored in the table.

Lastly, we can see that some attributes of the foreign key pointing to `Entry` are named exactly the same as the attributes they reference, like personFK or `PoolFK`. This is neither a problem nor an error, although in a larger project where each table has more attributes, we should follow a proper style guide when naming attributes, especially those reserved for foreign keys. This way, we can more clearly understand their purpose without having to spend time analyzing the schema in detail.

---

## How to Create the Database

Now that you understand the domain semantics and have completed the **conceptual** and **logical design phases**, we can implement the logical model on the DBMS.

The easiest way to do this is by creating a script with a `.sql` extension that contains all the necessary DDL code to populate the database – that is, the statements we just reviewed where we create tables, data types, and constraints.

But since we aren’t working with a real project database here, we don't need to worry about the data that might be in tables that already exist in the database, especially those with the same name as any of the tables we’ll going to create. So for simplicity, before creating them, we’ll execute some DROP statements to remove tables with names matching any of the tables we are going to create. This will make sure that they contain no tuples.

Following this process, we’ll arrive at a DDL script [like this (<FontIcon icon="iconfont icon-github"/>`cardstdani`)](https://gist.github.com/cardstdani/1247573e1ef2f6ea9ab99b82c5761ad6) (it’s quite long, so I’ve left it in the gist).

When we run the script, keep in mind that the statements will execute one by one from top to bottom. So we first use the DROP statements to remove any tables in the database that have the same name as any of those we’ll create.

This process is equivalent to **deleting** our entire database – that is, our logical model that was once created – so we first need to remove the tables that aren’t **referenced** by any **foreign keys** to maintain integrity while deleting the remaining tables.

Then, under the same condition, all corresponding tables that aren’t referenced by any foreign keys are successively deleted until no tables remain to be deleted.

There should now be no tables in our database whose names conflict with the tables in our logical model, so we write the `CREATE TABLE` statements we saw earlier for each table in the logical model.

We also need to do this in a specific order, specifically the reverse of the deletion process. Here, we first need to create tables that don’t have any foreign keys pointing to another entity. If we create a table at the beginning that needs to reference another table that hasn't been created yet, the DBMS will generate an integrity error. So as you can see in the script, we place the statements in an order such that whenever a table with foreign keys pointing to other tables is created, those tables have already been created beforehand.

To figure out how we need to order both the DROP and `CREATE TABLE` statements, there are [algorithms (<FontIcon icon="fa-brands fa-medium"/>`@tharinduimalka915`)](https://medium.com/@tharinduimalka915/how-kahns-algorithm-helped-me-solve-database-schema-dependencies-2b7e54142fd5) like [<FontIcon icon="fa-brands fa-wikipedia-w"/>topological sorting](https://en.wikipedia.org/wiki/Topological_sorting) that we can apply to the relational diagram. This way, we treat the database schema as a **directed graph** made up of **nodes (tables)** and **directed edges (foreign keys)**. With this algorithm, for example, we can progressively remove minimal or maximal nodes from the graph, creating or deleting the table they represent. But, this is not the only [<FontIcon icon="fas fa-globe"/>method](https://softwareengineering.stackexchange.com/questions/359107/resolving-foreign-keys-breaking-cycles-to-enable-a-topological-sort) available.

Regarding data types and constraints defined in **assertions** or **triggers**, the order of creation is easier to infer. This is because the `ENUM` or `DOMAIN` types must always be created before being used in a table's attribute declaration. So the simplest approach is to create them at the very beginning, or just before we use them for the first time (what we’ve done here).

On the other hand, it's best to define assertions or triggers at the end. We also want to give them names descriptive enough of the constraints they model, as their definitions may involve multiple tables that we need to create before defining the constraint. Also, since these elements don’t contain **data (tuples)**, we don’t need to delete them at the start of the script unless we are going to modify the schema itself. In that case, some constraints might become obsolete, meaning they access attributes or tables that no longer exist.

In summary, with this **SQL script**, we create the tables, data types, and constraints that make up our database schema, ensuring that none of them contain tuples immediately after being created.

But to run the script, we need to create a database in the DBMS. Let’s use the `CREATE DATABASE` statement to create a new database with a specific name:

```pgsql
CREATE DATABASE ExampleDataBase OWNER postgres;
```

If we run this command on the DBMS terminal, we will create a completely empty database named **"exampledatabase"**. Note that PostgreSQL is not case-sensitive for element names or SQL statements. So even if we write an element's name in uppercase, when we later check the name value stored by the DBMS for the database, we’ll see it in lowercase.

We can also assign an owner user, who will have all the [<FontIcon icon="iconfont icon-postgresql"/>privileges](https://postgresql.org/docs/current/ddl-priv.html) over that element. By default, we can make the owner user [<FontIcon icon="fa-brands fa-stack-overflow"/>postgres](https://stackoverflow.com/questions/50883645/is-postgres-a-default-and-special-user-of-postgresql), but we can change it later with a statement like the following:

```pgsql
ALTER DATABASE exampledatabase
OWNER TO user3; /*user3 is a sample user*/
```

Once we’ve created the database, we can connect to it using the DBMS command `\c exampledatabase`. Finally, we can execute the `.sql` script with the command `\i /path_to_script/script.sql`. The DBMS should then notify us that the `DROP` statements have had no effect since there is no table with the corresponding name to delete (the database is empty). But, after creating the tables, if we run the script again, the `DROP` statements will delete them because they are created, preventing the DBMS from giving us these notifications.

Similarly, if any statements encounter errors that prevent their execution, or in special situations like the one we just mentioned, the DBMS will notify us – but it won’t stop the execution of the script. It will simply move on to execute the next declared statements (at the syntactic level, it executes the next statement we have separated with the corresponding `;`).
