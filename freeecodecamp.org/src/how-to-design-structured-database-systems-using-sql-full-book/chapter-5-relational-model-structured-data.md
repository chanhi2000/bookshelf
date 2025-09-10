---
lang: en-US
title: "Chapter 5: Relational Model (Structured Data)"
description: "Article(s) > (6/12) How to Design Structured Database Systems Using SQL [Full Book]"
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
      content: "Article(s) > (6/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 5: Relational Model (Structured Data)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/chapter-5-relational-model-structured-data.html
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
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-5-relational-model-structured-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

Now that you understand some of the processes we use to design databases, we will focus on the simplest databases, which are those that operate with structured data. These databases are usually called **relational** or **structured**. They are formally designed using the relational model, which is the formalization of the conceptual level used to design this type of database.

The reason relational databases are the simplest lies in the nature of the data they usually store and the constraints imposed on them, as we will see now. We’ll discuss both the conceptual and logical design levels simultaneously, where the fundamental elements of this type of system are mainly represented.

It’s important to differentiate between how these elements are viewed from the conceptual level and from the logical level, as they essentially refer to very similar, and sometimes equivalent, concepts - but formally they are different concepts. In a relational database, the information is structured in entities related to each other and composed of a series of attributes, which is the conceptual view of the model.

---

## Table (Relation)

As mentioned before, structured data is that which follows a rigid schema and is organized in the form of tables. So the fundamental component for storing information in a relational database is the table, which is sometimes also called a relation. This component is part of the logical design, since we define it in the DBMS. So whenever we deal with tables, we are referring to the logical design level.

Here’s an example:

| **CityID** | `Name` | `Country` | `Population` | `Area` |
| --- | --- | --- | --- | --- |
| 1 | Madrid | Spain | 3,223,000 | 604.3 |
| 2 | Athens | Greece | 664,046 | 38.96 |
| 3 | New York | USA | 8,398,748 | 783.8 |
| 4 | Tokyo | Japan | 13,929,286 | 2,191.1 |
| 5 | Paris | France | 2,140,526 | 105.4 |

---

## Schema

The example **City** table above stores data about different cities. The table has a schema, which is a series of reserved data to describe the structure of the table. That is, the schema consists of the table name, which in this case is **City**, along with the name and type of all the attributes it has, corresponding to the columns.

For example, if we are storing cities in this table, the Name column corresponds to the Name attribute of each city, which is a property that city entities have, in addition to the **associations** between entities, which in certain contexts are also called **properties**. This attribute must have a type, such as string in this case, to determine what kind of data it will contain.

So the table name along with the names and types of the attributes form the schema of a table, which is mainly determined by user requirements. But it’s the database designers who decide how to model the domain entities, what attributes are necessary to include, and the types of each one.

---

## Tuple

In addition to a schema, a table also has an instance, which is the set of tuples it contains at a given moment in time. Here, by tuple, we mean a row of the table, as we can mathematically view it as a tuple **(value1, value2, value3…)** where all the values for a certain city are present for all the table's attributes.

A peculiarity of the instance is that there can never be multiple identical tuples. This means, in this case, that there can’t be two or more cities that have the same values for all attributes at the same time. This restriction is imposed in the pure relational model, although we will see in practice that this restriction may not be followed to facilitate certain tasks.

This is the case because, in the pure relational model, the instance is considered a set of tuples, and mathematically, a set can’t have repeated elements. But in the practical implementation we will see, the instance is formally modeled with a multiset that does allow duplicates, as each tuple is internally associated with a value indicating how many times it’s repeated in the multiset.

---

## Attribute Domain

Previously, we mentioned that each attribute has a domain, which allows the DBMS to determine how the data in that column will be stored. But we might have an attribute like **Population** where it doesn't make sense to store negative numbers, similar to Area.

To prevent these situations, the domain of the attribute can be restricted. For example, if we set Population to have only the INTEGER data type by default, it can take any value from the set/domain of integers. But if we only want it to take positive values, we need to add a constraint (which we’ll discuss later) so that the possible values for that attribute, meaning its domain, are only all positive integers.

---

## Derived attribute

A special case of attributes is derived attributes. Their value is not stored, but is rather calculated from the value of other attributes.

Continuing with the example of the **City** table, suppose we have an attribute **Density** that should indicate the population density of a city. In this case, we can define it as a derived attribute, instead of calculating the values beforehand and inserting them into the database. Thus, every time **Density** is queried, the operation **Population/Area** will be performed, returning the value to the user in the corresponding tuple.

We can see a clearer example of this if we have an attribute BirthDate and we want to calculate the value of another attribute like **Age**. Here, we can calculate the attribute **Age** directly from **BirthDate** as if it were a **"view"** on that attribute. That is, we can see a birth date as if it were an age, from which we can derive the value of the attribute **Age**. We’ll discuss the concept of a view later in more detail at the implementation level.

Before moving on to the representation at the conceptual design level of a table, it's important to understand why a table is sometimes called a [<VPIcon icon="fa-brands fa-wikipedia-w"/>relation](https://en.wikipedia.org/wiki/Relation_(database)). A relation is a subset of the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the domains that the attributes have, but you can understand it more simply as a set of tuples that comply with a defined schema. For example:

| **Letter** | **Number** |
| --- | --- |
| A | 1 |
| A | 2 |
| B | 1 |
| B | 2 |

In this table, we can assume that the attributes **Letter** and **Number** have the domains **{A, B}** and **{1, 2}** respectively, so the entire set of possible tuples we can form with these domains are the tuples shown in the table itself.

These tuples come from the **Cartesian product** of both domains. So if we had larger domains, we would get a much broader cartesian product. A subset of its tuples is called a relation, and we can associate it as the instance of a table, which is why the term relation is sometimes used to refer to what is actually a table.

---

## Conceptual Representation

Putting this aside, it's not as important to focus on formal details like the name **relation**, but rather to understand the structure of a table and how data is stored in it. So far, everything we've seen about tables refers to the logical design level, which is where we actually work with tables. But at the conceptual level, there is an element very similar to a table called an **entity**.

According to the conceptual level, a relational database is a set of entities, where each one can be likened to a table. Each entity has a series of **attributes**, each with a **domain**, where instead of attribute, it’s usually called a property at the conceptual level.

![Entity City represented in an entity-relationship diagram.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751733945183/6d737d7b-f6f3-42af-ae91-3fae793524a0.png)

Following the example of the City table from before, at the conceptual level, there is an entity called City, shown above in a [**UML (Unified Modeling Language) entity-relationship diagram**](/freecodecamp.org/uml-diagrams-full-course/README.md), which is the most common way to formally represent this type of information.

Sometimes we can use [**Crow's foot**](/freecodecamp.org/crows-foot-notation-relationship-symbols-and-how-to-read-diagrams.md) notation for the diagram, but here we’ll use the same notation as a class diagram in software engineering for simplicity. It’s equivalent, which is why entities are sometimes called classes.

To correctly understand what an entity is, think of it as if it were the schema of the table, or rather a class in object oriented programming that serves as a template to instantiate tuples. Just keep in mind that at the conceptual level they aren’t called tuples but rather instances or occurrences of an entity.

Intuitively, we can see it as if the attributes represented in the entity were the actual values of the first row of the equivalent table - that is, its schema. In this way, if we have a schema (that is, a template), we can create instances of that entity/schema/template simply by assigning values to those attributes. So when we assign values to the properties of an entity, we have an entity occurrence, which at the logical level we can see as a tuple.

For example, the entity `City` can be "instantiated" in a "tuple" like **[5, Paris, France, 2140526, 105.4]**. But at the conceptual level we should call it an **occurrence** instead of a tuple, since “instance” might cause confusion with the concept of instance we discussed earlier at the logical level.

```md
Entity: [CityID,Name,Country,Population,Area]    --->    Tuple=Occurence: [5,Paris,France,2140526,105.4]
```
<!-- TODO mermaid로 변환 -->

So every time we see a box with a name and properties in an entity-relationship diagram, it refers to an entity that is logically equivalent to a table.

Regarding the concept of an instance we saw earlier, here it’s called an **entity set**, and it contains all the existing occurrences of that entity at a given point in time. In the diagram, we only see the template, not the set with the occurrences of that entity (think of the tuples of a table). In other words, the diagram at the conceptual level is used to see how the database is structured, not to see its specific instances or occurrences, which are more related to the logical level.

Regarding notation, in the entity-relationship diagram, the entity is represented in a box where all its properties (attributes) are listed by name and type. Here, the type does not have to match exactly the type offered by the DBMS in the logical design, as a translation from the conceptual to the logical level is done later, as we saw before.

To the left of each attribute, a `-` is usually placed to indicate that it’s a private attribute. But this concept is not relevant in this database context, as it comes from the uses given in software engineering to the class diagram notation we use here.

Lastly, attribute names are usually all in lowercase, although according to the style guide you follow, this can vary - like here, where we allow uppercase to minimize changes to attribute names when translating to logical design.

---

## Repeating Group

Once you know what an entity, or table, is, and that the database is a set of them related to each other, you’ll need to consider an important restriction about the table itself as a storage structure.

| `CityID` | `Name` | `Country` | `Temperature` |
| --- | --- | --- | --- |
| 5 | Paris | France | 7,44,20,90,1 |

For example, if we have a City table similar to the one above where we only want to record the temperatures of the city at different points in time, the first option we might consider is to store all the temperatures that each city has or has had in a single `Temperature` attribute, all together.

But this is not allowed in structured databases for efficiency reasons (as well as formally, which you’ll see later). Specifically, this situation is known as a repeating group, and it occurs when we have to store an indeterminate number of values in an attribute.

For example, if we only need to store a maximum of 5 temperatures that a city can have, we could make the data type of `Temperature` an array of integers with a length of 5, which would be filled as we get temperature measurements. But if we don't know how many temperatures we will measure, we can’t set an upper limit on the size of the value we are going to store, so we can’t define a specific size for the length of the data type of that attribute. This creates a repeating group.

Anyway, even if we could set a size for data structures like an array, they are usually not allowed due to the uncertainty of the size the developer might set for that array (also considered a repeating group).

At the same time, this uncertainty is the reason why **repeating groups** pose a problem for the physical implementation of the database. Since we don't know how much space we’ll need to represent them, we might end up wasting lots of memory trying to manage this uncertainty, as well as [<VPIcon icon="fa-brands fa-wikipedia-w"/>fragmenting](https://stackoverflow.com/questions/3770457/what-is-memory-fragmentation) it, or complicating the implementation logic in an attempt to minimize the impact of this waste and memory fragmentation.

### How to avoid a repeating group

One way to solve the problem of repeating groups is to store each temperature measurement in a separate tuple. If all measurements can’t be stored in a single attribute value, then one option is to duplicate the information of the other attributes to create multiple tuples, each storing a specific temperature measurement.

| `CityID` | `Name` | `Country` | `Temperature` |
| --- | --- | --- | --- |
| 5 | Paris | France | 7 |
| 5 | Paris | France | 44 |
| 5 | Paris | France | 20 |
| 5 | Paris | France | 90 |
| 5 | Paris | France | 1 |

As you can see, we have duplicated information to store each temperature measurement in a tuple, which avoids accumulating them all in a single value of the same tuple. But repeating data creates (unnecessary) redundancy in the database, which is a problem.

Redundancy is not an issue in all situations, as it can sometimes be good for ensuring data availability. But in this case, we can see that it’s it’s completely unnecessary. First, because it greatly increases the space needed to store city data by repeating the city’s information. Also, because having city data repeated so many times means that every time these data need to be modified, you’ll have to make changes to all tuples recording the temperatures, causing operations to take too long. And if the schema is modified to add or remove attributes, all data in their respective columns must be deleted - so if there is a lot of repeated data in them, those operations will also have high latency.

---

## Data Inconsistency

On the other hand, if in the previous example we insert a temperature measurement and for some reason an error occurs during the operation, we might end up in a situation like the following:

| `CityID` | `Name` | `Country` | `Temperature` |
| --- | --- | --- | --- |
| 5 | Paris | France | 7 |
| 5 | Paris | China | 44 |

Here you can see that when inserting the measurement with a temperature of **44**, an error occurred, and the tuple was recorded with an incorrect `Country` value. This is not common, but if we choose to solve the repetitive group problem this way, we will be inserting duplicate values more often than necessary, making it more likely for these types of errors to occur.

Having the same information duplicated but with contradictory values indicates that our database has an inconsistency. This happens when the same information is duplicated in various places in the database, and the values are contradictory, such as in this example where we have multiple temperature measurements for what appears to be the same city but with the incorrect country value.

To ensure that it’s an inconsistency, we should look at the key values that uniquely identify each tuple, which we will discuss later. But intuitively, we need to focus on those attribute values that allow us to uniquely identify a tuple. If those values repeat in several tuples and there is some inconsistency in the other attributes, then we have an inconsistency.

On the other hand, if in the last example the `Country` value of the second tuple were `"France"`, we wouldn't have any inconsistency, even though the temperature values don't match. So it's important to understand that inconsistency mainly depends on the schema's semantics, meaning what each attribute signifies.

Finally, to solve the problem of repetitive groups, you’ll typically need to refine the schema - that is, to transform it. In this specific case, we’ll perform a normalization operation, which we’ll see how to do later. This involves separating a table like the one we had before with duplicated information into several tables:

| `CityID` | `Name` | `Country` |
| --- | --- | --- |
| 5 | Paris | France |

| `ReadingID` | `CityID` | `Temperature` |
| --- | --- | --- |
| 1 | 5 | 7 |
| 2 | 5 | 44 |
| 3 | 5 | 20 |
| 4 | 5 | 90 |
| 5 | 5 | 1 |

Now there is a `City` table very similar to the original, but with the difference that it only stores a record of the existing cities, not the temperatures recorded in them.

Also, there is another table we can call Readings, which contains the temperature measurements for each city. In this table, each tuple contains a measurement and an identifier that determines the city where the measurement was taken, which in this case is `CityID`.

For example, if the measurement was taken in Paris and that city has a CityID value of 5, then the CityID in the `Readings` table will be 5 for the measurements of that city. This avoids duplicating all the city information as happened before.

By doing this, we avoid the potential inconsistency problems that arose before, and we also save disk space by not duplicating unnecessary information. More importantly, it prevents the appearance of the repetitive group.

For this, we have had to "complicate" or rather enrich the database schema to some extent, meaning the tables that compose it and the schemas that form it. But the complexity in structured databases doesn’t come from being structured, but from the domain being modeled and its operations. In other words, the relational model of structured data is not complex by itself, as it is simply a model. What truly causes complexity is how we use that model to reflect the domain requirements.

---

## Entity Associations

In the context of conceptual design, a relational database is not only made up of entities (tables), as this only allows us to model the existence of "objects" in the domain. Most of the time, these objects will have associations with each other, meaning they will be related.

So, in conceptual design, we have the concept of **entity association**, which describes how "objects" are linked to one another. This is essential for reflecting the actual structure of the information.

![Entity-relationship diagram showing entities City and Person, where each city can have one or more people living in it.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751783067882/835a4c1c-1913-4847-9649-f2082d19d410.png)

For example, in a domain, we can have entities like the ones above, **City** and **Person**. These model the existence of people and cities in the domain. But besides the existence of the entities themselves, it's possible that they have relationships with each other that we can model in our diagram - such as a person living in a certain city.

In this case, we use an association to allow a person in our system to live in a city, meaning we use an association to model that relationship between both entities.

At first glance, we can see that the association is represented in the entity-relationship diagram as a relationship established between entities - but it's important to remember that entities are "templates" from which occurrences of entities are generated when implementing the system (that is, specific tuples). So when we introduce an association at the conceptual level, we have to view it in terms of the tuples that will later be generated from the related entities.

For example, here the relationship can occur between one occurrence (tuple) of a city and many occurrences of a person, since many people can live in a city. But the reverse may not be true depending on the domain requirements, which may determine that a person (occurrence of the entity **Person**, or tuple of the table **Person**) can only live in one city, as we’re assuming in this case.

### Association Role

In an entity-relationship diagram, the notation of the association is usually represented with a line connecting two entities, known as a binary association. But there are higher-degree associations (which we won't cover here for simplicity) that relate an arbitrary number of entities in a single association.

A role and a direction are usually added to this line to clarify the semantics of the relationship. The role is a word or phrase written above the association line and denotes the role that an entity has in the represented relationship with respect to the direction defined alongside the role.

For example, in the diagram below we have an association between a person and a city. So in the association, the role given to the person is "lives" in the city with which they are associated, as the direction has been defined from the person to the city with the arrow next to the role. In other words, in this relationship between both entities, the function that the person performs is to "live" in the city with which they are associated.

![Entity-relationship diagram showing City and Person, where each city has one or more residents.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751789958682/1f5aa10e-3120-49a1-a7f0-9791a3f2e25e.png)

This role doesn't need to be included in all associations, nor is it necessary to establish a direction. But in some cases, it helps us understand the diagram and the domain, which is the goal of the diagram itself.

Also, the role isn't rigid and can be modeled in many ways. For example, in this case, we can reverse the direction of the association and say that the city has the role of "having residents," which are the people it’s associated with. This would model the existence of people living in the city.

### Cardinality

Continuing with the different elements of an association, we have **cardinality**, which describes how many **occurrences** (tuples) of one entity can or should be associated with how many occurrences of another entity. We represent this with numbers on both sides of the association line that denote the **minimum** and **maximum** cardinality, respectively.

To understand this using the previous example, we know that a person can only live in one city, so a person entity will be associated with at most one city. In turn, we can also assume that every person must live in some city, meaning there are no people living in the woods outside of society. So since every person must be associated with exactly one city, the multiplicity we put on the city entity side is 1…1, which is simply written as 1. Here, the first 1 is the minimum cardinality, indicating that each person must be associated with at least one city, while the other 1 is the maximum cardinality, indicating that each person can be associated with at most one city. For simplicity in the diagram, the number 1 is usually used to denote both cardinalities at once. Also, when we talk about people and cities here, we are referring to the actual occurrences of the entities, which at a logical level are tuples.

If we look at the other side of the association, we see it has [The Role of Data in Today's Digital World](/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/the-role-of-data-in-todays-digital-world.md) (sometimes called multiplicity) `1…*`, where 1 is the minimum cardinality, indicating that a city must be related to at least one person. This means that in all the cities within our domain, there must be **at least** one inhabitant.

On the other hand, the `*` in the **maximum cardinality** is a way to denote that there is no specific value that must be given to that cardinality - it can be any amount. This means a city can be associated with an arbitrary number of people, indicating that the cities in our domain can have any number of inhabitants.

Since the asterisk denotes any, unbounded amount, we don't have to worry about it being consistent with the minimum cardinality. That is, even if we set the minimum cardinality to 1, by using an asterisk for the maximum, we are indicating that the maximum can be any number from 1 to infinity. This means that cities will have at least one inhabitant and at most an infinite number.

From the **minimum cardinality**, we can introduce the concepts of **optionality** and **obligation**. For example, before we had minimum cardinalities greater than 0, which indicate that a person must always be associated with a city, or a city must always be associated with at least one person. This means that when occurrences of these entities are created, they must meet the restriction imposed by the minimum cardinality of being associated with some occurrence of the other entity. So at creation, it must be directly associated with the other entity that indicates the association, to respect the minimum cardinality.

To see this at the logical design level, we first need to introduce the tools of that level with which associations are implemented - although for now, we can view it by thinking in the object-oriented paradigm, where if we instantiate a person object, it must have a **reference** to another city object, and vice versa.

![Entity-relationship diagram showing City and Person entities.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751792178992/276f82ef-6895-487c-b7a0-7f1d01d9525f.png)

Regarding optionality, let's consider another possible case where a city can have an arbitrary number of residents, including being uninhabited, meaning empty, since we have set the minimum cardinality to 0 and the maximum to `*`. This can also be represented more simply by just using the asterisk, indicating an arbitrary amount including 0. Now, let's also assume that a person can live in one or two cities, so their corresponding cardinality is modified to 1..2, indicating that a person must be associated with at least one city and at most two cities simultaneously at any point in their life cycle.

This occurs since the entity-relationship diagram is **instantaneous**, not **historical**, which means that what we see in the diagram is an instantaneous representation of our domain, not a representation of its life cycle or evolution over time.

So when we see that an association has a multiplicity of 1..2 as in this case, we must think that at any given moment, a person must be associated with at least one city and at most two cities. We shouldn’t think that a person must have been related to at least one city and at most two cities throughout their whole lifetime.

Here we can see that a city may have no residents due to the minimum cardinality of 0 that we have set on the person side, indicating that a city may not be associated with any person. With this, we can model optionality, which refers to allowing an association not to occur. That is, when we create a city from its entity (template), we don't have to associate it with a person, since it can be associated with 0 people at minimum. This means that it's not necessary to add a reference to any person because a city may be abandoned and have no residents.

![Entity-relationship diagram showing City and Person entities.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751792219256/f668bb15-db83-492b-ac95-c788ee6c8c19.png)

To correctly understand optionality, we can modify the example again so that a person can be associated with either no city or one city, indicating that the person may not live in any city or may live in one. Also, on the other side of the association, we also change the maximum cardinality to 500, indicating that a city can have an arbitrary number of residents between 0 and 500, meaning it can be associated with any number of people from 0 to 500, inclusive. This means having residents is optional.

With this, it should be clear that we can set cardinalities as we want according to the domain and requirements - but we always need to ensure they are correct and make sense. For example, you can’t set a maximum cardinality that is strictly less than the minimum cardinality.

In this case, something peculiar happens: on both sides, we have a minimum cardinality of 0, meaning we have optionality. So when we create new instances of the entities, they don't have to be associated with instances of entities on the other side of the association. We can see this as if the association we modeled is entirely optional.

To conclude, although we can set any number for minimum and maximum cardinalities depending on the modeled domain, the most common ones are `1..1`, `1..M`, or `M..N`, where `N` and `M` can be arbitrary numbers, including 0 in the case of `N..M`, as long as they aren’t both 0 at the same time (because in that case, the association could not exist).

### Recursive Associations

On the other hand, an association does not necessarily have to relate multiple entities. We can use it to model a relationship between occurrences of the **same entity**. For example, if we want to model the friendship relationship between people in our domain, we can use a **recursive association** in the entity `Person`:

![Entity-relationship diagram where `Person` has a friendship relationship with itself.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751795267979/91b3c5e3-5642-40eb-a270-721ceb8cd93a.png)

First of all, it’s very convenient to establish a role in recursive associations, as it’s the simplest way to represent their semantics so we can easily understand them when looking at the diagram.

But in this case, it’s not as useful to specify the direction of the association since the friendship relationship can be considered symmetric. Here, we have modeled the friendship relationship so that one occurrence of `Person` can be associated with any number of other occurrences of `Person`, including none, which indicates that in our domain, a person (occurrence of `Person` entity) can have an arbitrary number of friends, including 0. Regarding notation, it makes no difference to use `0..*` or `*`, as they indicate the same thing - but we should always use the shortest and simplest notation to understand.

In summary, a recursive association is simply one where both related entities are the same. In this case, the friendship association necessarily relates people to people, meaning it establishes which people are friends with each other.

### Associative Entity

Now that we know what associations are, let’s learn about the concept of an **associative entity**. In some cases it’s also called a **property** just like the **associations** themselves. In the following example, there are cities in a domain that can host from 1 to 500 inhabitants, as long as the implicit restriction of having at least one resident is respected. Also, a person can live in an arbitrary number of cities between 0 and 3. ![Entity-relationship diagram showing `City` and `Person` entities.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751797687686/758c9f22-ceb2-4c01-a0be-34219c1ee592.png)

The above conceptual diagram would model this situation. As it stands, we can’t store any information about the person's stay in the city, meaning we can’t save information like the dates they started living in that city or moved to another. If we try to do so, we’ll have several options that lead to certain problems in the database.

On one hand, we could choose to add attributes like **StartDate** and **EndDate** to the **Person** entity to determine the respective dates when a person started living in a city or moved to another. But this wouldn't even work if the multiplicity 0..3 of the city were `1..1`, because over the person's lifetime, even though they can live in only one house at a time in the `1..1` case, it's possible that the person moves several times throughout their life. This would require multiple pairs **(StartDate, EndDate)** to be recorded. So since we need to store multiple pairs of these dates, a repeating group would be generated in the respective properties (attributes), forcing us to refine the schema.

On the other hand, we could store those attributes in the **City** entity, but we would encounter a very similar problem here. We would have to record multiple pairs of **(StartDate, EndDate)** values for each person, with the added complexity that a city can have many residents. This would also create a repeating group, along with the issue of associating each **(StartDate, EndDate)** pair with the correct person.

![Entity-relationship diagram where `City` and `Person` are linked through Residence.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751797354936/4c721372-a21c-4aa3-8ddb-29d81ecbc830.png)

To address this situation, ideally, we should be able to store these attributes within the association itself. This way, when a person starts living in a city, their association would contain these attributes, and they could record the date the person started living in the city as well as the date they stop. This value (when they stop living in the city) can be left blank or set to "`NULL`" until they actually leave and the association is no longer valid.

To achieve this, at a conceptual level, associative entities are used. These are entities whose main purpose is to allow our database to store information about the associations between entities.

As you can see, associative classes are **"related"** to associations between entities, not directly with other entities, and they don't have multiplicity or roles. This is because they exist only when the association between several entities is actually established. For example, when a person starts living in a city, they associate with a city, and this association relates to an occurrence of the associative class where the respective attributes like StartDate and EndDate are stored.

So for each person-city association we have, there will also be an occurrence of the **Residence** entity with the values of its corresponding properties. Also, keep in mind that this association doesn't exist all the time, as the person may stop living in that city - so the association itself may cease to be valid or, rather, cease to exist conceptually.

But depending on how we translate the relational diagram to the logical design of the database, we might want to record the StartDate and EndDate values that the occurrence of the respective associative entity had.

If we want this, we will need to specify it in the logical model of the database or in the conceptual model with a note in the diagram's margin. This is because, at a conceptual level, there are no specific tools beyond notes to specify these kinds of details, which are more related to the logical design.

### Aggregation and Composition

Since a **UML entity-relationship diagram** is used at the conceptual level, there are modifiers we can use in the associations to give them a particular meaning. But this has no effect at the logical level - meaning the introduction of these modifiers in the conceptual diagram doesn't imply any kind of change at the logical level. They are simply used to clarify the details of the modeled domain.

![Entity-relationship diagram where City is made up of instances of Person and each person consists of a single Brain.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751810875604/7b9044be-8d9b-43f2-8d80-61a190c23b6b.png)

On one hand, an association can be of the aggregation type, like between Person and City, where aggregation is denoted by an unfilled diamond and signifies that a city can be composed of people. This means that the entity with the diamond is composed of entities on the other side of the association.

Also, in the specific case where we create and destroy entity occurrences at the same time, the aggregation becomes a composition, denoted by a filled diamond. It then works the same way as aggregation - the only difference being the meaning it conveys.

For example, in the above diagram we have modeled that a person is composed of a single brain. Since a person's brain can’t exist independently of the person, the association is denoted as a composition. This is because aggregation would allow the brain to exist independently, which is not possible.

If we look at it inversely, the composition does not prevent the person from existing without being related to a brain, although the `1..1` cardinality we have placed on both sides models this situation, requiring all people to have exactly one brain.

The important thing to understand is that both composition and aggregation are just associations with additional meaning. This means that they don’t influence the logical design of the database itself, much less at the implementation level.

---

## Generalization and Specialization

Another feature of the relational model is that, besides modeling associations between entities as we have seen, it can also model other types of relationships between entities. This can be useful in many situations.

For example, if we have a domain where there are people who can be customers or employees, we can use a generalization and specialization relationship like the following:

![Entity-relationship diagram with inheritance where Client and `Employee` are subclasses of `Person`.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751812519420/7e7fe801-22df-4411-862d-e74a1b56e263.png)

Generalization-specialization relationships work the same way as in object orientation. We have a class like `Person` with a set of attributes, allowing for specializations of that class like `Client` or `Employee`, where all instances are also people but with more specific attributes.

In the case of Client, it’s a specialized entity derived from the `Person` entity, so it inherits all the attributes of its parent entity since a client is also a person. In addition to these inherited attributes, it has others specific to being a client. So when an instance of the Client entity is created, think of it as having all the attributes of both Client and `Person` at the same time. The same happens with `Employee` but with its respective attributes.

![Venn diagram where Client and Employee are subsets of `Person`, with possible overlap.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751814124946/fa1daef2-46b0-47a8-8f62-c32642d5a165.png)

If we look at it from a [<VPIcon icon="fa-brands fa-wikipedia-w"/>set theory](https://en.wikipedia.org/wiki/Set_theory) perspective, first we have the entity Person, which gives rise to a set of entities that are people, meaning the occurrences of that entity. Within this entire set, it's possible that, in addition to occurrences of Person, there could be occurrences of Client, since every client is a person. So in the set of people, there will be some who are clients. This also happens with `Employee`, where in the set of people, there will also be employees, with all of them being people.

Also, nothing prevents a person from being both a client and an employee at the same time, so there will also be elements in the set that are both a client and an employee. But this detail is closer to the logical design of the database than to the conceptual representation of generalization and specialization presented here. In this case, these names indicate that classes like Person are more general than Client, which are their respective specializations.

---

## Entity Association Pitfalls

When we are in the conceptual design stage and create the entity-relationship diagram, it's common to encounter association structures that initially seem correct but, when implemented in a DBMS, lead to ambiguities or unexpected problems that require us to refine the conceptual design. One of these structures is the **Fan Trap**:

![Fan trap example.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751814711606/798ec2c1-20dc-47d0-905b-acdc8becc39f.png)

The Fan Trap appears when we have a "central" class like `City` that is associated in a "fan" shape with two others, `Person` and `Pool`, where each has maximum cardinality on its side. This means a city can be associated with many people and many pools at the same time.

This situation is initially correct, but the problem arises when we want to know which people from a certain city go to which pool. This becomes complicated because if we are given a certain person, we can know their city, as we have defined that a person can only live in one city. But the city can have many pools, so we don't know which specific pool the person goes to. We can only know which pools the city has where they live. Also, the city might have no pools, given the minimum cardinality of 0 on the pool side.

On the other hand, if we are given a pool, we can determine which city it belongs to. Then with that city, we can find out the group of people living there, which we can use to solve the previous question - but in a much more complex way.

To solve this problem, there are many alternatives, although the simplest in this case is to add an explicit association between `Person` and `Pool` to model the fact that a person goes to a pool. But if we’re not going to make these types of queries frequently, it might not be worthwhile to complicate the diagram.

![Chasm trap example.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751818303502/70eecb3e-f2f1-4989-9348-afb81fb71346.png)

There is also the **Chasm Trap**, which is similar to a Fan Trap but with important differences. For example, in the diagram above, you can see a Chasm Trap. It occurs when we are given a city and asked to find the pools located in it. The only thing we can do is get the group of people living in that city and, from that group, identify some of the pools the city has.

In other words, each pool may or may not have an association with a person, since not all people go to the pool. So, if we try to find all the pools in a city by simply looking at the pools the city's residents go to, we might encounter situations where no resident of the city goes to the pool. Thus, all the pools will take advantage of the 0..30 cardinality on the Person side to not have any associated people, meaning no one goes to those pools.

So if there are pools that no one visits, we won't be able to find them through a group of people. This means that, given a city, we might not know all the pools it has, because if we solve the query this way, we can only be sure of knowing the pools that the city's residents visit. But if there's a pool that no one visits, then that pool won't be accessible through a person. In other words, people won't see those pools, since the `1..*` relationship requires them to visit some pool - but it can still happen that no one visits a certain pool.

The solution to this problem is practically the same as for the Fan Trap, although there are many alternatives depending on the domain and requirements. There are also more situations that can lead to these problems or ambiguities which you can [read more about here (<VPIcon icon="fa-brands fa-medium"/>`koushik-dutta`)](https://koushik-dutta.medium.com/avoiding-pitfalls-a-guide-to-sql-traps-and-how-to-solve-them-acdc3a95c74f).

---

## Keys

So far, we have talked about entities and associations at the conceptual level, as well as tables at the logical level. Continuing with the logical level, we have not yet introduced any mechanism to uniquely identify the tuples contained in a table. This can be very useful since tuples are data points - that is, occurrences of an entity, like people, cities, and so on.

**Uniquely identifying** them makes it easier to perform operations or queries on the table. It also allows us to implement associations between entities at the logical level through references between tables.

Keys are sets of attributes used to uniquely identify each tuple in a table. The combination of values in these attributes must be different for every tuple, so that no two tuples are the same.

To understand this concept, let’s start by looking at the different types of keys and their main utility.

### Superkeys

Superkeys are sets of attributes that uniquely identify each tuple in a table. They are the most general type of key. As long as the combination of values for those attributes is unique for every tuple, the set of attributes qualifies as a superkey.

Here’s an example:

| `ID` | `SSN` | `Name` | `Birth` | `Email` |
| --- | --- | --- | --- | --- |
| 30 | 74 | Alice Johnson | 1985-07-12 | `alice.johnson@example.com` |
| 22 | 59 | Bob Smith | 1990-03-05 | `bob.smith@example.org` |
| 95 | 10 | Carol Davis | 1978-11-23 | `carol.davis@example.net` |
| 21 | 32 | David Brown | 2001-01-30 | `david.brown@example.com` |
| 47 | 61 | Emily Wilson | 1995-09-14 | `emily.wilson@example.co.uk` |

In this case, we have a table called `Person` where each row stores a person's data. Each person has a government `ID` number, as well as a **Social Security Number (SSN)**, name, and other details.

A possible superkey would be the attributes `{ID, Name}`, because among all the people that exist, no two people can have the same name and the same government `ID` number. But if we choose only `{ID}` as a **superkey** and try to uniquely identify all the rows in the table, depending on the data in the rows, we might encounter a situation where two people have exactly the same name, with identical first and last names. In this case, we couldn't uniquely identify both by their name alone.

So by including the `ID` in the superkey, we can differentiate between the two people/rows, as they can’t have the same government ID. We could also have chosen `{ID, SSN}` or even `{SSN, Name}` as a superkey, since the combinations of values in those attributes are very unlikely to repeat among different people. It’s impossible, for example, for multiple people to have the same name and Social Security Number.

Here’s another way to look at this: if we choose `{ID, Name}` as a superkey, then there can't be multiple rows in the table with the same ID and Name values. In other words, if we choose that superkey, it's because we are sure that this situation won’t occur, ensuring that all rows have a unique combination of values for the `ID` and Name attributes.

This mainly depends on the domain, as identifying a superkey formally is not simple. It involves knowing all the domains and associated constraints of the attributes in detail, as well as the functional dependencies between them (which we’ll discuss later).

In summary, although you can identify a superkey by formal methods, we won’t go into detail about them here. They’re usually not simple, as they combine techniques like closure or backtracking, which aren't useful to explain for correctly understanding the concept of a superkey. So for now, it's enough to focus on the semantics of each attribute and stick to those attributes that we know can't be repeated in multiple rows, like identifying codes of entities, names, or specific properties they might have, and so on.

Lastly, regarding the above table, we have seen some of the possible superkeys that can exist. But if we want to find all of them, we’ll first assume that the attributes with repeated values in several tuples are `Name`, `Birth`, and `Email`, since multiple people can have the same name, email, or birth date. Considering that `ID` and `SSN` do not repeat because they are government identifiers, we would have the following sets as superkeys, ordered by their size or cardinality:

- **Cardinality 1:** `{ID}`, `{SSN}`
- **Cardinality 2:** `{ID, SSN}`, `{ID, Name}`, `{ID, Birth}`, `{ID, Email}`, `{SSN, Name}`, `{SSN, Birth}`, `{SSN, Email}`
- **Cardinality 3:** `{ID, SSN, Name}`, `{ID, SSN, Birth}`, `{ID, SSN, Email}`, `{ID, Name, Birth}`, `{ID, Name, Email}`, `{ID, Birth, Email}`, `{SSN, Name, Birth}`, `{SSN, Name, Email}`, `{SSN, Birth, Email}`
- **Cardinality 4:** `{ID, SSN, Name, Birth}`, `{ID, SSN, Name, Email}`, `{ID, SSN, Birth, Email}`, `{ID, Name, Birth, Email}`, `{SSN, Name, Birth, Email}`
- **Cardinality 5:** `{ID, SSN, Name, Birth, Email}`

### Candidate Keys

Next, we have candidate keys. Their main purpose is the same as superkeys, with the only difference being that in this case, they use the minimum number of attributes possible for identification.

For example, before, as a superkey, we could choose `{ID, Name}`, among other options. But that superkey contains the ID attribute, which represents the government identifier for each person, and we have legal assurance that it is unique for each person.

So, since we know that each person's `ID` is unique, as is their Social Security Number because it’s also a number related to government procedures, we can reduce the number of attributes needed to uniquely identify each tuple and choose a candidate key like `{ID}` or `{SSN}`. We could also consider `{Email}` as a candidate key, although we assume that several people could have the same email, so we do not count it as a candidate key.

As you can see, conceptually the candidate keys play the same role as superkeys, but here the goal is to achieve identification with fewer attributes, specifically with the minimum number possible. In this example, by considering candidate keys with a single attribute like `{ID}`, we have managed to uniquely identify tuples with the smallest possible number of attributes, since you can’t form any type of key with fewer than one attribute.

Also, to verify that a key is a candidate and not a superkey, you can check that there is no subset of attributes of the key that by itself forms a key.

For example, if we have a key like `{ID, Name}` and want to check if it is a candidate key, we just need to check all possible subsets of attributes it has, which are `{ID}` and `{Name}` (although there can be subsets with more attributes). And remember that several people can have the same name, but if we look at the subset `{ID}`, we will see that no person has the same ID as another.

So since there is a subset that can uniquely identify the tuples, it fulfills the fundamental property of any key. This means that the `{ID, Name}` we were checking is not a superkey, as there is a subset of its attributes that is a key.

If we repeat this process exhaustively, we are guaranteed to find a candidate key, that is, a minimal set of attributes that serves as a key to identify the tuples.

So basically, a candidate key is just a minimal superkey: it uniquely identifies each tuple, and if we remove any column from it, it no longer uniquely identifies tuples.

In practice, we rarely enumerate every superkey or worry about the labels. We just look for a set of attributes that uniquely identifies each tuple, preferably with as few attributes as possible. In design, at the logical level, we could define multiple candidate keys (and, implicitly, many superkeys), but the important step is choosing one candidate key as the **primary key** to uniquely identify tuples.

### Primary Keys

Once we have all the candidate keys that exist (since there can be several depending on the domain and tables we are dealing with), we need to select one of them as the **primary key** to implement in the DBMS. This way, we can have a key that uniquely identifies the tuples. In other words, a table can have many candidate keys, but these keys are subsets of attributes that we analyze theoretically.

To make them practical and actually identify the tuples in a table, we need to implement one of them in the logical model. Basically, we need to tell the DBMS which of all the candidate keys is the primary one we’ve selected for identification.

With this, we can infer that the name "candidate key" comes from the fact that there can be many minimal subsets of attributes with which we can identify the tuples. But in practice, we only use one of them, which is the one we indicate to the DBMS, that is, the primary key.

In the previous example, from all the superkeys `{ID, Name}`, `{SSN, Name}`, **{ID, Email}**, and so on, we can derive the candidates `{ID}` and `{SSN}`, from which we can choose `{ID}` as the primary. You shouldn’t always make this choice arbitrarily, even though you technically have the option to do so. Rather, you should consider the technical details of the implementation, as well as the semantics of the attributes that form the key to keep it easy to understand, among other factors.

![Entity-relationship diagram with the entity Person.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751882614007/17c082cf-4d82-48ec-8595-bae0e7497236.png)

Even though the primary key is selected for use at the logical level, it can also be represented in the entity-relationship diagram at the conceptual level. If it consists of a single attribute, it’s marked with `{id}` next to its data type. But if the primary key is **composite** (meaning it’s made up of several attributes where each one is not enough to uniquely identify the tuples, but together with the other marked attributes it is), then all of them are marked with `{ID}`. As for candidate or superkeys, they aren’t specially marked in the diagram because there can be many.

### Alternate Keys

Of all the candidate keys we have, we only choose one as the primary, leaving all the others aside. These keys that aren’t selected as primary are called alternate keys, and their main use is the same as that of a primary key: to uniquely identify the tuples in case the primary key is not accessible or it’s not convenient to use it.

You can also use alternate keys to improve the efficiency of certain operations or queries on the table, as indexes can be defined on them. But we won’t go into detail about this type of optimization technique here.

In our example, if the candidate keys were `{ID}` and `{SSN}` and we choose `{ID}` as the primary, then `{SSN}` will be the only alternate key we have.

### Composite Keys

Another type of key is a composite key, which is defined as a candidate key composed strictly of more than one attribute because each attribute alone is not enough to uniquely identify the tuples in the table.

| `CityName` | `Country` | `Population` | `Area` |
| --- | --- | --- | --- |
| Madrid | Spain | 3,223,000 | 604.3 |
| Athens | Greece | 664,046 | 38.96 |
| Nantes | **France** | 320,732 | 65.19 |
| Tokyo | Japan | 13,929,286 | 2,191.1 |
| Paris | **France** | 2,140,526 | 105.4 |
| **San José** | Costa Rica | 333,980 | 44.6 |
| **San José** | USA | 1,013,240 | 469.7 |

For example, here we have a `City` table with information about cities around the world. As you can see, the attributes `CityName` and `Country` alone can’t uniquely identify each city, since there are cities in the world that share a country, like **Nantes** and **Paris**, and there are also cities with the same name that are located in different countries.

This means that we can’t use any of these attributes separately in a candidate key, as there are multiple cities with the same value in those attributes when viewed individually.

But if we look at them together and consider the composite key `{CityName, Country}`, we see that no city in our list located in the same country has the same name, so it meets the requirements to be a candidate key. It’s also a superkey, since all candidate keys are superkeys.

This way, we ensure that it’s indeed a composite key, which we can then select as the primary key. This is why sometimes in the definition of a composite key, the term primary key is used instead of candidate key.

### Surrogate Keys

So far, we have seen keys formed by choosing a set of attributes from a table that can uniquely identify tuples. But sometimes this may not be possible.

| `Name` | `Birth date` | `Email` |
| --- | --- | --- |
| Alice Johnson | 1985-07-12 | `alice.johnson@example.com` |
| Bob Smith | 1990-03-05 | `bob.smith@example.org` |
| Carol Davis | 1978-11-23 | `carol.davis@example.net` |
| David Brown | 2001-01-30 | `david.brown@example.com` |
| Emily Wilson | 1995-09-14 | `emily.wilson@example.co.uk` |

For example, in this `Person` table, we have the same attributes as before except for `ID` and `SSN`, which were the only government identifiers we could use to uniquely distinguish people or tuples in the table.

Now, no matter which subset of attributes we choose, it can’t serve as a key, since we assume there could be multiple people with the same name, born on the exact same date, and using the same email address (this is an assumption here and may not be true depending on the modeled domain).

Since we can’t choose a key with the attributes we have, we need to artificially generate an attribute that can serve as a key. This attribute is known as a surrogate key, and it consists of an attribute that contains sequential numeric values for all the tuples. This means that to ensure each one has a unique value in this attribute, they are numbered from 1 to infinity with integers, guaranteeing the key property.

| `SurrogateKey` | `Name` | `Birth` | `Email` |
| --- | --- | --- | --- |
| 1 | Alice Johnson | 1985-07-12 | `alice.johnson@example.com` |
| 2 | Bob Smith | 1990-03-05 | `bob.smith@example.org` |
| 3 | Carol Davis | 1978-11-23 | `carol.davis@example.net` |
| 4 | David Brown | 2001-01-30 | `david.brown@example.com` |
| 5 | Emily Wilson | 1995-09-14 | `emily.wilson@example.co.uk` |

In addition to this auto-incremental approach, where we can see that the surrogate key is an integer value that increases as tuples are inserted into the table, there is also the possibility of the attribute assigning each tuple a **UUID (Universally Unique Identifier)**, which is a **128-bit** binary data type usually represented as a string that allow us to assign a unique value to each tuple.

| `SurrogateKey` | `Name` | `Birth` | `Email` |
| --- | --- | --- | --- |
| e9e5a22b-d90c-4e5a-8d49-bbc24ff9335e | Alice Johnson | 1985-07-12 | `alice.johnson@example.com` |
| 374d6cbe-fc29-4db0-91db-d21a1e2fef3c | Bob Smith | 1990-03-05 | `bob.smith@example.org` |
| 57f182c5-47e2-4b71-b82c-63dc1795f9f5 | Carol Davis | 1978-11-23 | `carol.davis@example.net` |
| a979dd61-daa4-4d88-a9f3-9a60c23d5b16 | David Brown | 2001-01-30 | `david.brown@example.com` |
| 179f4e15-0124-4a80-a25d-80e94a8e4ed9 | Emily Wilson | 1995-09-14 | `emily.wilson@example.co.uk` |

Lastly, it’s important to note that the surrogate key is simply a mechanism to identify tuples, so it has no semantics in our domain. In other words, the values taken by the artificial attribute we have generated do not mean anything concerning the tuples or the domain in which they are represented.

### Secondary Keys

The previous types of keys generally help solve the problem of uniquely identifying tuples. But besides identifying them, it’s important to operate on them and query them efficiently.

To do this, indexes are usually defined on attributes that do not necessarily identify the tables, such as the name or birth date of the previous Person table. By defining an [**index**](https://freecodecamp.org/news/database-indexing-at-a-glance-bb50809d48bd/) on one of these attributes, we can efficiently perform certain operations on the tuples of the table, all based on the values taken by the attributes on which we have defined an index. These attributes are called secondary keys, although we won’t go into detail about what an index is here.
<!-- TODO: /freecodecamp.org/database-indexing-at-a-glance.md -->

### Foreign key

To finish with the types of keys, the ones we have seen before mainly focus on solving the problem of uniquely identifying tuples, which is the purpose of keys, as well as contributing to the optimization of operations and queries on tables.

But keys also help implement certain elements of conceptual design on the logical design of the DBMS. Specifically, with the type of key we have yet to see, the **foreign key**, we can implement associations between entities at the logical level, which can occur in situations like this:

![Entity-relationship diagram where a City is associated with many Person.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751879685769/0d55f4c4-ce27-4aaf-8fc4-59a9717cdb77.png)

Here we return to the example where we conceptually model a domain with cities and people, where a person lives in exactly one city, and a city can have any number of people living in it, from 0 to infinity. Given the `1..1` multiplicity on the `City` side, every person must live in some city, but the `0..*` multiplicity on the other side means cities may have no inhabitants.

The below diagram represents the conceptual design of our database, capturing certain details of the domain that we later need to transfer to the logical level. On one hand, we transfer the entities themselves to the logical level by creating a table for each entity directly:

| **ID** | **Name** | **Birth** | **Email** |
| --- | --- | --- | --- |
| 1 | Alice Johnson | 1985-07-12 | `alice.johnson@example.com` |
| 2 | Bob Smith | 1990-03-05 | `bob.smith@example.org` |
| 3 | Carol Davis | 1978-11-23 | `carol.davis@example.net` |
| 4 | David Brown | 2001-01-30 | `david.brown@example.com` |
| 5 | Emily Wilson | 1995-09-14 | `emily.wilson@example.co.uk` |

| **CityID** | **Name** | **Country** | **Population** | **Area** |
| --- | --- | --- | --- | --- |
| 1 | Madrid | Spain | 3,223,000 | 604.3 |
| 2 | Athens | Greece | 664,046 | 38.96 |
| 3 | New York | USA | 8,398,748 | 783.8 |
| 4 | Tokyo | Japan | 13,929,286 | 2,191.1 |
| 5 | Paris | France | 2,140,526 | 105.4 |

Given the tables for both entities, we now need to implement at the logical level the association we defined at the conceptual level. This means using a mechanism that allows us to know which city each person lives in or the people who live in a certain city.

If we think about this problem in terms of tables, we’ll see that the only way to do this is to add an additional attribute in one of the two tables so that this attribute takes as values the city where a person lives or the people who live in a certain city.

To understand this correctly, let's first assume that the primary key of the **Person** table is **{PersonID}**, which could be their government ID or an auto-incrementing surrogate key. Also, the primary key of the **City** table is the attribute **{CityID}**. This way, we can uniquely identify the tuples of City and Person using their primary keys, which take unique values for each of their tuples.

| **ID** | **CityID (FK)** | **Name** | **Birth** | **Email** |
| --- | --- | --- | --- | --- |
| 1 | 5 | Alice Johnson | 1985-07-12 | `alice.johnson@example.com` |
| 2 | 5 | Bob Smith | 1990-03-05 | `bob.smith@example.org` |
| 3 | 4 | Carol Davis | 1978-11-23 | `carol.davis@example.net` |
| 4 | 2 | David Brown | 2001-01-30 | `david.brown@example.com` |
| 5 | 3 | Emily Wilson | 1995-09-14 | `emily.wilson@example.co.uk` |

If we want to know the city where a person lives, we could add an attribute to the **Person** table so that the values it takes belong to the **CityID** attribute as shown above. That is, if the person **"Alice Johnson"** lives in the city **"Paris,"** then in that row, the value of the new attribute **CityID (FK)** we added is 5, which corresponds to the CityID of the city "Paris" in its respective table. Similarly, if the person **"Carol Davis"** lives in the city of **"Tokyo,"** then the new attribute will take the value 4, which corresponds to the CityID of that city in its respective table.

As you can see, the new attribute we added tells us which city the person represented in each row lives in, as it takes the primary key of the `City` table as its value. So, by knowing the `CityID` value, we can identify which city it is among all those stored in that table.

This additional attribute we add to represent the association is the foreign key. It mainly serves to implement associations between entities at the conceptual level, through attributes that serve as references or pointers to other tables. This is why it’s sometimes called an association pointer.

Before continuing, it's worth considering what would happen if, instead of placing the foreign key `CityID` **(FK)** in the Person table, a foreign key **`PersonID` (FK)** was placed in the City table. If we do this intending to reference all the people who are residents of a certain city, we would encounter a significant problem. That is, if we do this, we must keep in mind that a city can have an arbitrary number of residents, so in the value of its foreign key, we would have to store all the `PersonID`s of its residents one after another in the same cell. This would result in a repeating group that is prohibited in the relational model.

So to avoid the appearance of this repeating group, we could refine or normalize our diagram, leaving it where we originally placed it in the first place, which is the attribute **`CityID` (FK)** in the Person table. This would be more complicated than simply changing the table where the foreign key is located.

Now that we understand the basis of what a foreign key is, it's important to note that, for an attribute to truly serve as a foreign key, it must reference an attribute in another table that is a primary key on its own.

In this case, the foreign key is composed of a single attribute, `CityID` (FK), which references `CityID` in the City table. If it referenced the Name attribute instead, there could be multiple different cities with the same name. This would mean that if we say a person lives in a certain city and use its name to identify it, we wouldn't be able to know exactly which city they live in if there are multiple cities with the same name.

That's why the foreign key references `CityID`, which we can guarantee uniquely identifies cities on its own, as it’s the primary key of City.

### Composite Foreign key

Still, we don't always have domains and schemas as simple as these, where primary keys are a single attribute.

For example, we might have a diagram like the following, where there are people who own pools. Each person must own exactly one pool, but it's possible for several people to agree or partner up so that together they can own a pool. This means that each person will own a small percentage of the pool, which in this domain is not relevant. So a pool can be owned by an arbitrary number of people, including none, since there will be pools that aren’t yet owned by anyone.

![Entity-relationship diagram where each Pool belongs to one person, and a person can have multiple pools.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751883961923/4b86fca3-7a3a-43fe-9fc8-f24a98d405cf.png)

Given the attributes of each entity, we can easily see that the primary key of Person is their `{ID}`, while to uniquely identify a pool, using just `PoolName` or `CityName` is not enough, since there could be multiple pools located in the same city or with the same name.

But if we assume that there can’t be multiple pools with the same name in the same city, we can establish a composite primary key as `{PoolName, CityName}`, where these attributes will uniquely identify each pool. When trying to translate this to the logical level, we first create the tables corresponding to both entities.

| `ID` | `Name` | `Birth` | `Email` |
| --- | --- | --- | --- |
| 1 | Alice Johnson | 1985-07-12 | `alice.johnson@example.com` |
| 2 | Bob Smith | 1990-03-05 | `bob.smith@example.org` |
| 3 | Carol Davis | 1978-11-23 | `carol.davis@example.net` |
| 4 | David Brown | 2001-01-30 | `david.brown@example.com` |
| 5 | Emily Wilson | 1995-09-14 | `emily.wilson@example.co.uk` |

| `PoolName` | `CityName` | `Length` | `Width` |
| --- | --- | --- | --- |
| Olympic Stadium Pool | Los Angeles | 50.0 | 25.0 |
| Community Center Pool | Chicago | 25.0 | 12.5 |
| Lakeside Aquatic Center | Seattle | 33.3 | 15.0 |
| Riverside Neighborhood Pool | Austin | 30.0 | 10.0 |
| Sunset Community Pool | Miami | 25.0 | 10.0 |

Later, if we want to model the association between both entities with a foreign key, we first need to consider the cardinality of the association. On one hand, on the `Person` side, we have a cardinality of `0..*`, indicating that a pool can belong to many people. On the other side of the association, we have a multiplicity of `1..1`, indicating that a person can only have one pool.

With this, we can infer that if we place the foreign key in the `Pool` table, we would have to reference all the people who own each pool, resulting in repetitive groups in cases where there are multiple owners for the same pool (because we’d need to reference each and every owner from the same pool). That is, the pool would have an attribute whose value would be references to all its owners, and since there can be an arbitrary number of them, a repetitive group is formed.

To avoid this problem, whenever we have an association with **cardinality** 1 on one side and `*` on the other, or equivalents, we need a **foreign key** to model it at the **logical level**. Also, it should generally be placed in the table whose cardinality contains `*` as the **maximum cardinality\***, *indicating an arbitrary amount. Here, by equivalents, we refer to cardinalities like `0..1`, which we can treat similarly to `1..1`, or `5..`, which is equivalent to `0..*` because the maximum cardinality is still an arbitrary amount.

| **ID** | **PoolName (FK)** | **CityName (FK)** | **Name** | **Birth** | **Email** |
| --- | --- | --- | --- | --- | --- |
| 1 | Olympic Stadium Pool | Los Angeles | Alice Johnson | 1985-07-12 | `alice.johnson@example.com` |
| 2 | Riverside Neighborhood Pool | Austin | Bob Smith | 1990-03-05 | `bob.smith@example.org` |
| 3 | Sunset Community Pool | Miami | Carol Davis | 1978-11-23 | `carol.davis@example.net` |
| 4 | Sunset Community Pool | Miami | David Brown | 2001-01-30 | `david.brown@example.com` |
| 5 | Olympic Stadium Pool | Los Angeles | Emily Wilson | 1995-09-14 | `emily.wilson@example.co.uk` |

As you can see, in this case, the foreign key is placed in the `Person` table, which is the one with the `*` in its cardinality on the diagram, since each person can only own one pool. This prevents the foreign key from having to store an arbitrary number of references.

In this specific case, instead of a single attribute, we need to add `PoolName` (FK) and `CityName` (FK) because the primary key of Pool is not a single attribute but two. So the foreign key in `Person` will be a **composite foreign key** - meaning that instead of one attribute referencing another in a different table, there are two that simultaneously reference two attributes in another table.

For this to be valid, each attribute of the foreign key must reference an attribute of the primary key in the Pool table, so that together PoolName (FK) refers to `PoolName`, and `CityName` (FK) refers to the `CityName` attribute of Pool. So together they reference the entire primary key of Pool.

Finally, as we’ve just seen, foreign keys are a tool of logical design that we use to implement associations from the conceptual model. That's why in the conceptual model (in the entity-relationship diagram), **we do not write the attributes that form the foreign keys**. This is because at the conceptual level, the associations themselves indicate the relationships between entities. So even though tables have more attributes than we see in the diagram due to foreign keys, **these extra attributes are never written at the conceptual level**.

As for their naming, there are many style guides to follow. Here, we have added an (FK) to the attribute names to make it clear that they are foreign keys or part of one, although they can be named in any other way.

---

## Weak Entities

Now that we’ve defined how foreign keys allow us to implement associations between entities, we’ll continue by analyzing a case where one of the associated entities can’t be identified on its own with its attributes. Instead, it needs a foreign key that references another entity to be correctly identified - this means that the entity is considered weak in identification.

### Existence weakness

Before continuing, you should know that there are several types of weaknesses in this context. One is **existence weakness**, which means that an entity called **weak** can’t exist if there isn't another entity called **owner** with which it’s associated.

![Entity-relationship diagram where each person is composed of one brain.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751893494662/a3f06614-4314-48f5-8a0d-091515af9e1d.png)

We can understand this with the previous example, where a person is composed of a brain, and a brain must always be part of a person. So, when an instance of the `Brain` entity is created, meaning a tuple representing a brain is created, a person must also be created to be associated with that person.

In summary, a brain can’t exist without the `Person` entity it’s related to. This leads to an existence weakness where we say the Brain entity is weak and the `Person` entity is the owner or strong. The composition allows `Person` to exist without a Brain, even though we prevent it here with cardinality.

Aside from this, when we have an association where all its cardinalities are `1..1`, it’s very likely that we can combine those two entities into one, like `Person`, adding attributes like **Neurons**, instead of having two entities. But this doesn't always have to be done this way, as it depends on how we want to model the domain and the requirements.

### Identification weakness

In addition to existence weakness, we can have an **identification weakness**. Here, by identification, we mean the mechanism by which each tuple in a table is uniquely distinguished from all others, as we have seen before with keys.

To understand this type of weakness, when it occurs, and how it’s managed, we can look at the following case:

![Entity-relationship diagram where Residence is a weak entity that connects `City` and Person with start and end dates.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751898026686/2cdc320d-f665-4977-95de-d606a86a9ab2.png)

Here we have some entities:

- `City`, which models cities in the domain
- `Person`, which does the same for people, and
- `Residence`, which models a person's stay in a specific city.

This means people can live in a city for a certain time and then move to another. So according to this diagram, they would leave behind an occurrence or tuple of `Residence` with the date they started living in the city and the date they moved to another.

Regarding cardinalities, we can see that a city can be related to many residences, as it may have or have had many inhabitants, while a residence is only related to one person because the residence focuses on recording that a certain person has lived in a certain city. So the `1..1` multiplicities force a residence to link a person with a city, as introducing optionality here would imply that a residence can link a city or person with "nothing," which doesn't make sense.

Meanwhile, on the Residence side, we have `0..*` multiplicities with optionality because a person may not live in any city, or conversely, a city may have or have never had any inhabitants, so it may not be related to any occurrence of Residence.

Next, when we translate this diagram to the logical level, we first try to define the primary keys for all the entities or tables. In this case, for City and Person, it's straightforward, as we assume `CityID` is a unique identifier for each city, and ID is a unique government identifier for each person (tuple).

But when we define the primary key for Residence, we have several options. On one hand, we could choose `{StartDate}` or `{EndDate}`* as the primary key, but this isn't feasible because multiple people might start living in the same or different cities on the same start date, end date, or both. So we can't even choose `{StartDate, EndDate}` as the primary key, since, in the worst-case scenario, multiple people might start and stop living in a city at the same time.

This means that the Residence entity needs the other entities it’s associated with to have a primary key and be identifiable. It's important to note that at the logical level, we would have two foreign keys in Residence due to its two associations with City and Person. Specifically, it has a foreign key **`CityID` (FK)** and another **`ID` (FK)** that model these associations, respectively.

We can infer this at a glance without "seeing" the logical model because we have associations with cardinalities `1..1` and 0*…* So on the 0.. side, there must be a foreign key to implement this association as we’ve seen before.

Given these foreign keys, we might consider choosing `{CityID (FK)}` or `{ID (FK)}` as primary keys, but this wouldn’t guarantee the identification of all tuples because multiple people can be living in one or several cities at the same time. Also, a city can have multiple residents simultaneously, leading to repeated values in the foreign key attributes for tuples that should be considered distinct.

We also can’t choose **{CityID (FK), ID (FK)}** as a key because a person may have moved to a city multiple times during different periods, even if they lived in other cities in between. This would result in multiple tuples with the same values in both foreign keys but different values in the dates.

Given this situation, the only option left is to consider a key that includes one of the date attributes of Residence and the foreign keys **{CityID (FK)}** or **{ID (FK)}**, since nothing prevents a person from having multiple residences at the same time (where each residence indicates they are living in a city). This is normal because we haven't restricted this situation in any way in the conceptual diagram.

So, since a person can live in multiple cities at once, to identify a Residence tuple, we need to know which person is living in which city, plus at what point in time they are doing so. This we can determine with **StartDate** or **EndDate**. One of the dates is sufficient here, because a person can only live in a city once at the same moment in time, meaning a person can’t start or stop living in the same city multiple times at the same moment.

So to sum up, if we want to uniquely identify the Residence entity, we need to select **{StartDate, CityID (FK), ID (FK)}** as the primary key, although we could also select `{EndDate, CityID (FK), ID (FK)}` as long as we are sure that EndDate always exists. If the end date is not defined until the person leaves the city, we couldn't consider EndDate for identifying Residence.

So we can see here that we can’t identify the entity without using the respective foreign keys. This means the entity is considered weak in identification, as it depends on the two entities City and Person, which in this context are considered the owners of the weak entity. In other words, the owner entities can be identified by themselves, while the weak entity depends on other entities for its identification.

To denote this in the entity-relationship diagram, we can use a **«weak»** role on the sides of the weak entity to indicate that the foreign keys of these associations are needed to identify the **weak entity**.

To correctly understand what weak identification means, we can now consider the same diagram as before. But now, let’s assume that a person can only live in one city at a given moment in time, unlike before when they could live in many cities at once. This restriction can’t be modeled with UML elements, so it's enough to add a textual note in the diagram to reflect the restriction.

![Entity-relationship diagram where Residence is a weak entity that connects City and Person with start and end dates.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751895973100/a7783ee8-ac34-4b92-9bb3-3bb1b425fa7a.png)

In this case, since a person can only live in one city at a time, we don't need to include the foreign key **CityID (FK)** in the primary key of Residence. If a person is living in a city at a given moment, they can't be living in another, so there won't be more tuples in the table with that person and that start and end date of residence.

Consequently, the primary key of Residence becomes **{StartDate, ID (FK)}**, for example. The only thing that changes besides this primary key is the conceptual diagram itself, where now the only owner entity of Residence is Person because the foreign key to City is no longer strictly necessary for its identification. So even though Residence remains weak, its only owner entity is Person. This is why the role "weak" is only written in the association that gives rise to the foreign key **ID (FK)**, which is indeed in the primary key of Residence (unlike the previous scenario where we placed the role in both associations).

So as you can imagine, with the "weak" roles, we can not only know which entities are weak but also which entities own them. The role is always on the side of the association where the weak entity is found - that is, where the foreign key referencing the owner entity is located, which corresponds with the cardinality `*` seen before. Then on the other side of the association with the "weak" role, we find the owner entity.

![Entity-relationship diagram where Residence connects City and Person with residency dates.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751895191612/68997989-56ee-4a31-bd47-18bb12d9cb60.png)

If we want to convert Residence into an entity that is not weak, we need to add enough attributes to identify it without relying on other entities. For example, if we add a surrogate key **ResidenceID** that works through **auto-increment** or **UUID**, then we can automatically identify each tuple of Residence uniquely, so the primary key of **Residence** would become **{ResidenceID}**, and the entity would no longer be weak.

Finally, if we consider the domain we initially proposed and its requirements, we see that Residence is weak in identification, needing both foreign keys to be identified. So in addition to being represented with the "weak" roles in both associations, it’s worth noting the possibility of representing it using an associative entity like the following:

![Entity-relationship diagram where Residence connects cities and people, allowing multiple relationships on both sides.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751911354847/f2fb30d9-dcd6-4c0e-8931-40d8ae2f8a76.png)

We can make the diagram this way in this situation because Residence has Person and City as owner entities. Since it’s linked with the association between both entities and needs both to be identified, it can be denoted as an associative entity.

But an associative entity and a weak entity are completely different concepts, as weakness in identification is a property of entities, while an associative entity is a way to represent entities in UML at a conceptual level.

For example, if Residence had only Person as an owner entity, then it would no longer make sense to represent it as an associative entity at the conceptual level. This is because it’s only a weak entity in identification with respect to one owner entity, Person, not two owner entities that can have an `N:M` association between them.

In addition to the representation as an associative entity, the cardinalities on both sides of the association must be `0..*`, since it was previously stated that a city could have an arbitrary number of residences, where each one had only one person, necessarily. So if we represent Residence as an associative entity, the association between City and Person must have a `0..*` on Person. This indicates that a city can be related to an arbitrary number of people through the Residence entity, with the same occurring in the reverse direction.

---

## Navigability

In relation to the previous example and the concept of association or foreign key, it's sometimes important to analyze the **navigability** of our entity-relationship diagram before implementing the logical design of the database. This is because efficiency problems, ambiguities, or even the impossibility of performing certain operations or queries may arise.

To begin with, navigability refers to the capacity we have to **“navigate”** on the **entity-relationship diagram** through the associations between entities, or in other words, if we are located on a certain entity, it refers to the ability offered by the associations that affect that entity to navigate these associations and to retrieve information from other entities.

![Entity-relationship diagram where Residence connects City and Person with residency dates.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751895191612/68997989-56ee-4a31-bd47-18bb12d9cb60.png)

To understand this with an example, we can refer to the last diagram from the previous section where we introduce a surrogate key to Residence. In that diagram, we have an entity Residence with two foreign keys pointing to City and Person. So if we are given a tuple from Residence, we can use its foreign keys to determine which tuple from City or Person is associated with the occurrence of the Residence entity. This allows us to navigate those associations to the corresponding classes.

This is useful, for example, when we query the database to find the person who lived in the city corresponding to that Residence. For this, we can look at the value of the foreign key **ID (FK)**, which corresponds to an identifier of a person recorded in the Person table. This allows us to navigate from the Residence entity to the Person entity, meaning we’ve gotten information from the Person entity starting from Residence.

We can repeat this step multiple times, navigating from entity to entity through the diagram. But the important thing is to know which associations are navigable in a certain direction.

For example, if we are given a person, that tuple doesn't have any foreign keys, so with a tuple representing a person, we can't get information about any other entity in our diagram - not even Residence. If we only look at the values of the Person tuple, we won't know which Residence tuples are associated, because we would need to query and traverse the entire Residence table to find out.

To sum up, the Residence-Person association is not navigable in both directions - we can only go from Residence to Person, but not the other way around. The same applies to City.

Navigability is important, because it's useful to know the direction in which the diagram's associations can be navigated before implementing anything. If our system needs to support a query like obtaining the city where a person currently lives, it might be more efficient to add an association directly from Person to City instead of having to go through all the Residence tuples to resolve the query, which would be more efficient.

![Entity-relationship diagram where Residence connects City and Person, with an additional direct relationship between them.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751904973527/7d253452-3cdd-4d17-bbfe-cdce7e064f89.png)

Although this association might seem redundant, if we need to focus heavily on optimizing the query we mentioned earlier, it may be worthwhile to "complicate" the diagram in this way so that certain critical queries in our system run faster.

It’s also important to note that a person may not live in any city, which is why the minimum cardinality of the new association on the City side is `0..1`. This is because the foreign key resulting from this association may "not exist," as we will see later, representing that a certain person does not live in any city.

Finally, not everything relevant about navigability is related to efficiency, such as when detecting navigation cycles. If several exist, we would need to ensure in the implementation that the DBMS optimizer chooses the shortest one in the corresponding queries.

Navigability also helps us see if certain queries can be resolved, meaning if certain data can be obtained from the system based on some input. And keep in mind that this concept of navigability that we have introduced refers to navigability over the **conceptual diagram** itself, not to the possibility of obtaining information about other entities at the logical level, as we’ll see later.

---

## Constraints

Continuing with the elements of the relational model, the only thing left to discuss are constraints. These are conditions imposed on the data to correctly model the domain and meet its requirements. They are a set of rules that must always be followed so that the stored data is correct, consistent, integral, and aligns with the semantics given by the domain.

We can define constraints both at the conceptual and logical levels. On one hand, in the conceptual model, constraints are mainly modeled using the tools provided by UML when creating the entity-relationship diagram.

For example, let’s say that in our domain we have a business rule or condition stating that a city can have a maximum of 500 inhabitants. Then if we model the domain with a diagram similar to those created earlier, we will have an association between person, inhabitant, and city, where we use the cardinality of that association (specifically the maximum cardinality) to represent the constraint of the maximum number of inhabitants.

But not all constraints can be modeled at the conceptual level with UML tools. For example, consider the case where we have a social network with people who can follow other people. We can model this with an entity Person and a recursive relationship where a person can follow an unlimited number of people, including the case where they follow no one.

![Entity-relationship diagram where Person has a follow relationship with itself.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751796543335/1224219f-98b8-459b-ae74-e704d06e797a.png)

But nothing prevents a person from following themselves, which doesn't make much sense in a social network. So we could leave it as it is if the client doesn't specify otherwise. But if the domain itself or a requirement indicates that a person can’t follow themselves, we will need to add that restriction to the diagram.

Unfortunately, we can’t do this with the tools provided by UML, as there is no mechanism to indicate that this association can’t occur between the same occurrence (tuple) of the **Person** entity.

In this case, we have several options to reflect the restriction in the conceptual design. The first and simplest is to add a textual note on the margin of the diagram where we briefly explain the situation and indicate the rule that makes up the restriction. Notes in UML are standard elements consisting of a box with text where things that can’t be properly modeled with the diagram's own elements are specified.

On the other hand, instead of using a text note, which is less formal and more prone to misinterpretations or confusion, we can use a specific language to represent constraints like **OCL (Object Constraint Language)**, where we define the restriction using the language's own code.

```plaintext title="ocl"
context Person
inv noSelfFollow:
    self.follows→forAll( p | p <> self )
```

Here, we won't go into detail about how constraints are modeled in OCL. The important thing is to know that there are constraints that we can’t directly represent with diagram elements, so they need to be reflected in the conceptual design using notes or specialized language code.

---

## Data Integrity

As we’ve mentioned, constraints are **validity conditions** imposed on the data. They help ensure that, when stored in our database, they can be checked for correctness, consistency, and integrity, all verified automatically by the DBMS. This is because the constraints themselves are usually implemented at the logical level in the DBMS, which has specific functionalities to check constraints and ensure the correctness and integrity of the data.

So far, we have assumed that the data are stored correctly in their respective tables. We’ve also assumed that they respect the attribute domains, as well as many other details that can affect the validity of what is stored.

So to avoid issues, the database automatically checks the **validity** of the data, which differs from the **correctness** of the data. To understand the difference between these concepts, consider the following example:

| **CityID** | **Name** | **Country** | **Temperature _(Kelvin)_** |
| --- | --- | --- | --- |
| 5 | Paris | France | 280 |
| 1 | Madrid | Spain | -3 |

Here we have a Temperature table that stores tuples with the temperatures in a city at different times. As you can guess, the temperature attribute is of type integer, which means it can hold any integer, including negatives. But temperatures can’t be negative if measured in Kelvin, so if we are measuring temperatures in Kelvin here, we must add a domain constraint like **Temperature >= 0** to prevent the Temperature attribute from taking negative values. This is called a domain constraint.

**Domain constraints**, as you’ve just seen, are used to define the domains of table attributes, restricting the possible values they can take and ensuring that the stored data is of the appropriate type.

Given this restriction, we can see that the first tuple meets all the constraints, so it could be considered valid data. But with the information we have, we can’t ensure that this data is correct. That is, we have not taken a thermometer and measured the temperature in Paris, so we do not know if that 280 is the actual temperature in Paris or if it’s incorrect data. So even if data meets the constraints, we must ensure that it’s correct.

This is a very complicated task that we won’t go into detail about here. We can implement mechanisms for error detection and correction in data, or we can conduct audits to verify that the data corresponds to reality - that is, the domain. Or third parties can supervise the data, because if the person who took that measurement tells us that the 280 is not what they recorded with the thermometer, then we know that data is incorrect. Otherwise, we would have no way to guarantee its correctness.

On the other hand, in the second tuple, the temperature takes a negative value, so we can conclude that this data is not only incorrect but also invalid. It’s invalid because no Kelvin temperature can be negative, violating the domain constraint imposed earlier. It’s incorrect because if it’s invalid, then that value must necessarily be different from the true temperature of the city.

So now you know what it means for data to be erroneous or incorrect. You also understand domain constraints that can ensure data integrity in terms of data type and possible values that the attribute can take.

But data integrity goes beyond simply checking that data is in the correct format and within an attribute's domain. For example, data must be **reliable and accurate**, which we verify with its correctness. It must also be **consistent**, meaning there can’t be duplicate tuples with information that leads to contradictions as seen earlier. It must also have other high-level characteristics like availability, durability, data timeliness, security, and so on which we won’t delve into because they aren’t essential here.

---

## Integrity Constraints

In addition to the previous characteristics, there is another one that’s essential for maintaining data integrity: completeness. In this context, completeness can have several meanings, with the simplest being that all data points are present in the database as tuples. This means all the "individuals" of the domain are represented in the database.

For instance, if we are storing a domain with 10 people and only see 9 tuples in a table like Person, we know that the data is not complete because the entire domain is not represented by the 9 tuples. On the other hand, completeness also means that each data point must necessarily have a value for each attribute of the table that defines it.

| **CityID** | **Name** | **Country** | **Population** |
| --- | --- | --- | --- |
| 1 | Madrid | Spain | 3,223,000 |
| 2 | Athens | `NULL` | 664,046 |
| 3 | New York | USA | 8,398,748 |
| 4 | Tokyo | Japan | 13,929,286 |
| 5 | Paris | France | `NULL` |

For example, if we have a domain with cities, and in our database we include a **City** table with these attributes, then each city (data point) we represent with a tuple must have a value for each of these attributes. This means that for the data to be complete, no cell in the table can be empty.

In the table above, you can see that the cities named **"Athens"** and **"Paris"** prevent the data from being complete, as one does not have a value in the **Country** attribute and the other in Population, respectively. Instead of leaving the corresponding cells empty, the special value `NULL` is stored in them to represent that they contain nothing.

To ensure the completeness property of the stored data, NULL values should be avoided in the tables. But we will later see that by default, DBMSs do not usually enforce the restriction that table values can’t be NULL. In other words, when we create a table by default, the values of the tuples can be NULL unless we define otherwise through a restriction.

We typically define this restriction at the attribute level, where we specify that the values in the column corresponding to that attribute can’t be NULL. So all tuples we save in the table must have a value other than NULL for that attribute.

This affects the attribute's domain, since by default, the special value NULL is included in the set of all values an attribute can take. But we can exclude this value from the set using a restriction.

In light of all this, and after introducing the concept of NULL, we can define integrity as a property that ensures that throughout its entire lifecycle, the stored data is valid, correct, consistent, complete, and reliable.

To ensure that all these characteristics are met (except for the last one, which is at a higher level), we use special types of constraints in the database, known as integrity constraints. In other words, we can categorize database constraints based on their purpose.

Some constraints dedicated to modeling business domain requirements and rules, while others are integrity constraints specifically aimed at enforcing the aforementioned integrity characteristics (but some of them may also indirectly model part of the business rules).

These last constraints are validity conditions automatically checked by the DBMS every time an operation is performed on the entity (table) or entities affected by these constraints, all with the goal of ensuring data integrity at all times.

These validity conditions, as we’ve seen, must be met for all stored tuples, ensuring that none of them can have an empty cell or a disallowed value. In other words, conditions can be defined at the attribute (column) level, although the tuples stored must adhere to these constraints. This is why they are checked for all of them. So when all the tuples stored in a table meet all the defined integrity constraints, the instance of that table is said to be **legal**.

Integrity constraints, depending on their logical purpose, can be classified into several types:

**First, we have domain constraints.** These are the ones we just discussed, and they mainly serve to define the data type of the attributes and their domain.

On one hand, implicit domain constraints include those that define the data type of the attributes, as this is something we must do when creating a table, not something we add later to limit the attribute's domain.

On the other hand, there are explicit domain constraints, which we add in addition to the data type definition to limit the values that attributes can take, such as preventing them from containing the special value NULL, or preventing an attribute that stores temperatures in Kelvin from taking negative values, as we have seen. We can also consider it implicit that the DBMS allows cells to take NULL values, which we can prevent by setting an explicit constraint.

**Next, we have identification constraints.** Regarding the identification of tuples, we previously saw that a primary key is chosen for each table so that its attributes can uniquely identify all the tuples stored in it. The explicit definition of a primary key is an integrity constraint that we define on the table.

But by doing this, the DBMS internally applies several sub-integrity constraints, one of which ensures that the combinations of values taken by the primary key attributes are all different (meaning unique). This is what characterizes a key. Also, none of the attributes can take NULL as a value, because if they could, there would be multiple tuples with the same value for the primary key.

| `ID` | `Name` | `Birth` |
| --- | --- | --- |
| 1 | Alice Johnson | 1985-07-12 |
| `NULL` | Bob Smith | 1990-03-05 |
| 3 | Carol Davis | 1978-11-23 |
| 4 | David Brown | 2001-01-30 |
| `NULL` | Emily Wilson | 1995-09-14 |

For example, if our primary key is a single attribute `{ID}`, then it can’t take NULL as a value, because in that case, we could have multiple tuples with NULL in that attribute as seen above, preventing them from being uniquely identified.

**Lastly, we have referential constraints.** Related to the previous constraints are referential integrity constraints, which ensure that the relationships between tables are consistent at all times. These constraints are implicit, meaning the DBMS automatically ensures that they’re fulfilled. Still, we must explicitly define which attributes are foreign keys for it to do so.

![Entity-relationship diagram where Pool is a weak entity dependent on City.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752060524956/e7efb90c-04f2-4581-b12d-cb443a028f25.png)

Here, by consistent, we’re not referring to the same concept as data consistency. Rather, we mean that a foreign key must reference a valid tuple in the table it points to.

For example, if we have a weak entity Pool whose logical table has a foreign key attribute like **CityID (FK)**, then whenever this attribute references a city, it must contain a valid CityID value. This means it must exist in the City table. If the value doesn't exist, then it wouldn't be referencing any city.

Also, note that the foreign key attribute itself can be NULL by default unless we specify otherwise, because the foreign key constraint doesn't behave like the primary key constraint, which implicitly prevents NULL values. Instead, the foreign key constraint is solely focused on ensuring consistency in references, not on preventing NULL values.

To understand this, we need to look at the `1..1` multiplicity on the City side, which requires all pools to belong to exactly one city, ensuring no pool is "loose" or outside a city. This means all pools must have a value in their foreign key **`CityID` (FK)**, as they must belong to one and only one city.

For this restriction (which we've conceptually modeled with a minimum cardinality) to be translated to the logical level, we need to explicitly indicate a **domain integrity constraint** on the **`CityID` (FK)** attribute so it can’t contain NULL values. This means it must always refer to a city. This, in turn, allows the Pool entity to be identified by the pool's name and the city where it's located, as the name can be repeated in several tuples/pools. But the combination of the name and city where they are located is assumed to never repeat in our domain. In other words, in the same city, there are no multiple pools with the same name.

Assuming this, if in our database we have a series of tuples in both tables and we want to delete a city from the record, then we need to check if there is any pool referencing that city. This would prevent the city record from being deleted to maintain integrity and ensure that the respective foreign key of the pool continues to reference an existing city.

To resolve this situation, there are many policies that we will see later, although the most common is to prevent the deletion operation from being executed or to also delete the pool record that references the city we want to delete. This could cause more recursive deletions if there are foreign keys pointing to Pool.

![Entity-relationship diagram where a `City` can have none or one Pool, and a pool can belong to none or one city.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752061005445/a3dab918-7ccc-42b8-b0da-2956bebe1e79.png)

On the other hand, if the minimum cardinality on the `City` side is 0, this means that at the logical level, the foreign key of Pool may not exist - meaning the pool might not be in any city. So its foreign key can take the value NULL because it's the only simple way to implement that the foreign key itself "does not exist."

If we do this, we won't have to define the explicit constraint that the foreign key attribute is non-null, and when deleting a city record, we can set the deletion policy so that the foreign key in Pool is set to NULL.

As for the weakness in identifying `Pool`, it disappears here because it can't use its foreign key for identification since it can take the value NULL and the pool name can be repeated. Because of this, we decide to add a surrogate key `PoolID` to identify the Pool entity.

Finally, nothing prevents a foreign key from modeling a recursive relationship, meaning the DBMS implicitly allows it by default. So if we want to avoid situations where a tuple references itself, we must add explicit constraints, which we can categorize as referential integrity.
