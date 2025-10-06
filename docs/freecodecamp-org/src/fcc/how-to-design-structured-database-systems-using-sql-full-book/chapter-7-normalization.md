---
lang: en-US
title: "Chapter 7: Normalization"
description: "Article(s) > (8/12) How to Design Structured Database Systems Using SQL [Full Book]"
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
      content: "Article(s) > (8/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 7: Normalization"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-design-structured-database-systems-using-sql-full-book/chapter-7-normalization.html
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
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-7-normalization"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

When trying to translate an IS-A hierarchy to the logical level, it's very likely that we’ll end up with a design that exhibits **redundancy**. This is because the same information, such as that of the superclass, can end up being stored in multiple places. This poses multiple problems in a database. So to understand it, let's consider the following example:

| `PersonID` | `PersonName` | `CityID` | `CityName` |
| --- | --- | --- | --- |
| 1 | Alice Johnson | 1 | Madrid |
| 2 | Bob Smith | 5 | Paris |
| 3 | Carol Davis | 3 | New York |
| 4 | David Brown | 1 | Madrid |
| 5 | Emily Wilson | 5 | Paris |

Here we have a Person table that stores data about people - specifically their ID, name, and the city where they live. But to represent the city, all the attributes that our database stores about cities are included in the Person table itself. This makes it so that in one row we can know information about the person as well as information about the city where they live.

At first glance, this may seem convenient, since if we have a Person row, we not only have all the information about the person but also all the information about the respective city. This then lets us avoid having to look up this information in other tables. But this creates a significant redundancy problem.

According to the definition of redundancy, it means that the same information is stored in multiple places, that is, repeated unnecessarily. And this doesn't mean the information has to be in different tables. For example, in this example we have redundancy because the same city information can be stored multiple times in the same Person table (as is the case with the city "Paris" or "Madrid").

This actually leads to problems when inserting new cities into the database. If we only store them in this table but don't have any person living in the city we want to insert, we won't be able to insert it unless we do so in a row of the Person table with the rest of the attributes that don't characterize a city set to NULL. And this will greatly complicate database operations.

**Redundancy also** poses a problem for memory consumption, as duplicating all the information of a city for each person living there uses up unnecessary space. Similarly, if we want to delete a city or update its information, we have to do it for every instance where that information is repeated. This complicates operations and making them much less efficient.

For example, if we store a Population attribute in this table to represent each city's population, every time we update the population of a certain city, we have to do it for all the Person tuples. This becomes inefficient if many people live in that city, as we have to change the population data in all the tuples representing those people.

Just as it affects efficiency, redundancy also increases the chances of data inconsistency. If we forget to change one value when updating Population data, or if there's an error and a certain value in a tuple doesn't update, then that value will contradict the rest of the Population values in the repeated tuples for that city, causing an **inconsistency**.

To solve these types of situations, it's best to plan ahead by creating a good design at the conceptual level. We can try to separate concepts into entities that are distinct enough to avoid storing information about semantically different ideas in the same entity (as this could cause redundancy when moving to the logical level).

But if we reach the logical level with a certain diagram that we couldn't refine further at the conceptual level and we need to refine it, one of the transformations we can apply here is called decomposition.

---

## Decomposition

| `PersonID` | `PersonName` | **`CityID` (FK)** |
| --- | --- | --- |
| 1 | Alice Johnson | 1 |
| 2 | Bob Smith | 5 |
| 3 | Carol Davis | 3 |
| 4 | David Brown | 1 |
| 5 | Emily Wilson | 5 |

| `CityID` | `Name` |
| --- | --- |
| 1 | Madrid |
| 3 | New York |
| 5 | Paris |

Before looking into what decomposition involves, it's helpful to examine the specific problems of combining information about people and cities in a single entity.

For example, if we store many attributes of a city, a lot of space will be wasted if we have many people living in that city. This is because all the city's attribute values are unnecessarily repeated in all the tuples of the people living there.

Another potential problem related to memory waste could happen if we needed to insert a person into the database and we don’t know the city they live in. This would force us to leave all the city's attributes as NULL, wasting all the space those `NULL`s occupy.

Similarly, if we delete all the people living in "Madrid," for example, then our database will no longer contain any information about that city, as no one lives there. This means it isn't explicitly stored in the table. Lastly, we previously saw the problems that arose when updating the information of a certain city.

As a solution to these issues, we can apply decomposition. If you consider the example above, you may be able to see that this involves breaking down the Person table into several tables. On one hand, we keep the Person table dedicated to storing information about people. On the other, for the cities, we store all their information in a specific `City` table.

Once the information is separated into multiple tables, we can maintain the **`CityID` (FK)** attribute in the Person table, where it’s now converted into a foreign key that references the `CityID` of the new `City` table, indicating the city where the person lives.

As you can see in the example, decomposition involves replacing one table with two or more tables, each containing a subset of the attributes from the original. By combining them, we can retrieve the original attributes.

For instance, here we have split one table into two, where one retains all the attributes related to people and the other holds attributes related to cities. Together, these attributes form the original table we had. We do this mainly to solve problems caused by redundancy. Now, in the Person table, we only store an identifier for the city where the person lives, and in the City table, we store the city's information only once, allowing it to be used by more tables in the database.

But in order to do decomposition correctly, we must ensure that certain conditions are met. One is that the decomposition is **lossless**. This means that if we now take the two tables generated by the decomposition and combine all their information back into a single table, we should get the information we had in the original Person table before the decomposition.

So if we now take the resulting Person table and add the information provided by the tuple from the City table identified by the foreign key defined in the decomposition to each tuple, we should get the same information as we had in the original Person table before the decomposition - without losing any tuples or creating new ones.

This join operation easily shows that it returns the data we originally had before the decomposition. And this indicates that the decomposition was done without loss. But this doesn't guarantee it will be lossless for any possible tuple. To ensure this, we need to analyze the **functional dependencies** present among the table's attributes, which must also be preserved after decomposition.

Lastly, when performing the decomposition, we might receive queries in the database such as, given a person, obtaining information about the city they live in. To implement this query, we usually perform operations similar to the join we described earlier, which can be computationally expensive. So if it becomes so costly that it's impractical, we might consider not doing the decomposition. Or we could even doing a partial one, where we keep the city attributes that are queried most frequently in the Person table to make certain queries more efficient, even if some redundancy exists.

---

## Functional dependency

Continuing with these conditions, to understand them correctly, you’ll need to know what functional dependencies are.

To introduce this concept, we can look at the simplest case, which is the attributes PersonID and PersonName of the Person table. These store a person's government identification number and their name, respectively. So if we find several tuples in the Person table with the same PersonID value, we would expect their respective PersonName values to also be the same. This is because if several tuples store information about people with the same ID, then they must necessarily be the same person (as we assume the government identification number is unique for each person).

So whenever there are several tuples with the same ID, we can say that the names of the people represented by those tuples must also be the same.

But the reverse does not have to be true, because if several different people have the same name, they will have the same name but different IDs. So if several tuples have the same PersonName, their respective PersonIDs do not have to match.

This situation we just saw is a case of functional dependency between **PersonID** and **PersonName**, specifically denoted as **PersonID→PersonName**, since it’s the PersonID attribute that uniquely determines the person's name.

| **PersonID** | **PersonName** | **CityID** | **CityName** |
| --- | --- | --- | --- |
| 1 | Alice Johnson | 1 | Madrid |
| 2 | Bob Smith | 5 | Paris |
| 3 | Carol Davis | 3 | New York |
| 4 | David Brown | 1 | Madrid |
| 5 | Emily Wilson | 5 | Paris |

Formally, we can define a functional dependency as a constraint or relationship that exists between two sets of attributes, such that the values taken by one set of attributes uniquely determine the values that the other set of attributes must take.

For example, using the same example without decomposing, we can see that there is a functional dependency between the set of attributes **X={PersonID}** and the set **Y={PersonName}**, denoted as **X→Y.** This means that for any pair of tuples in the table, if those tuples have the same values in the set of attributes X, then they must necessarily have the same values in the set of attributes Y.

But we don't discover this by simple observation. These dependencies are mainly given by the characteristics of the attributes and the domain we are modeling, as well as the requirements. That is, to discover these dependencies, we need to focus on the semantics of the attributes.

The formal definition of this concept states that a functional dependency is a relationship between sets of attributes, so they don't have to be single-attribute sets - they can contain any number of them, depending on the complexity of the dependency.

For example, if we assume that a person always lives in the same house and never moves, then we can say there is a functional dependency **{PersonID}→{CityID}**, as well as **{PersonID}→{CityName}**. This results in functional dependencies for all possible combinations of attributes on the right-hand side, which must take the same value for several tuples if they have the same value for the attributes on the left-hand side.

Specifically, this means that given the dependencies we know exist, the following also exist:

- **{PersonID}→{PersonName,CityID}**
- **{PersonID}→{PersonName,CityName}**
- **{PersonID}→{CityID,CityName}**
- **{PersonID}→{CityID,CityName,PersonName}**

This occurs due to the union property of functional dependencies, where if we have dependencies **X→Y** and **X→Z**, then the dependency **X→(Y U Z)** also exists, where the uppercase letters denote sets of attributes.

Without going into more detail about these properties, it's worth highlighting that this is one of Armstrong's inference rules, whose main purpose is to **infer all the functional dependencies** that exist in a table. Specifically, these inference rules ensure that, starting from a series of initial functional dependencies, **all** the dependencies that actually exist in a table can be inferred.

With this, the important thing to know is that functional dependencies can have multiple attributes in their sets. This in turn can lead to a classification of the dependencies based on the number of attributes they have in each set.

One of the main uses of functional dependencies is to determine if a decomposition is valid, meaning if all the functional dependencies are preserved.

For example, in the original table, there are the functional dependencies **{PersonID}→{PersonName}** and **{PersonID}→{CityID}**, primarily, or **{CityID}→{CityName}** because the identifier of a city uniquely determines the name of the city itself. So, considering these dependencies as a base, we can infer others like **{PersonID}→{CityName}** by transitivity using **{PersonID}→{CityID}** and **{CityID}→{CityName}**.

The ones we have considered as base are those generated directly by the domain's semantics. This means that if a city is uniquely identified by its **CityID**, then it doesn't make sense to consider **{PersonID}→{CityName}** as a base, since we have the other dependencies that relate the person's identifier with their name and city identifier, from which we can infer it.

In summary, the base dependencies are the most fundamental ones from which all others can be inferred. There is no single algorithm to find them all. Instead, it’s a more open process that we need to follow based on our domain, requirements, and the semantics of the attributes.

Once we’ve found the base dependencies, the important thing is to ensure that they are preserved after decomposing a table. We can see this in the resulting tables, where **{PersonID}→{PersonName}** remains in Person, as does **{PersonID}→{CityID}**, with the only peculiarity being that now CityID in Person is a foreign key, and **{CityID}→{CityName}**, which is preserved in the new City table after decomposition.

So by preserving all the base functional dependencies, we are assured that the decomposition of Person into Person and City is correct.

Finally, functional dependencies can have many more classifications besides being base or not. For example, in some of the formal definitions of the following normal forms that we’ll see, we often check if a functional dependency is trivial. This consists of those dependencies X→Y where all the attributes of set Y are present in set X.

For example, **{A, B} → {A}** is trivial because {A} ⊆ {A, B}, and **{A, B} → {B, A}** is also trivial because {B, A} ⊆ {A, B}. But **{A} → {B}** is **not** trivial because {B} ⊄ {A}, meaning there is an attribute in set {B} that is not present in set {A}.

---

## Normal forms

After understanding what functional dependencies are, it's important to note that there are many other types of dependencies, such as multivalued, union, or inclusion dependencies. All of these also aim to eliminate or minimize the problems associated with data redundancy that we saw earlier through normal forms.

These are a series of refinement levels of a relational schema defined by increasingly strict conditions intended to eliminate or progressively minimize the issues caused by redundancy in a schema. Among all the levels, we will only look at those that use functional dependencies between attributes as criteria for their conditions. But there are others we won’t cover here whose criteria include multivalued or union dependencies.

### 1NF

First, we have the **first normal form (1NF)**, whose main condition is that each attribute is **atomic**. This means that the table cells do not contain an arbitrary number of values, which we can also call the non-existence of repeating groups. But it also imposes basic conditions such as the requirement for a primary key in the table so that each tuple can be uniquely identified. This prohibits duplicate tuples, as well as attributes with duplicate names, meaning there can’t be columns with duplicate names.

These conditions must be met for all tables in a database schema to be in 1NF. In this case, we can easily verify them by ensuring that each cell contains exactly one value, that there are no duplicates in rows or columns, and that there is a primary key.

These last three conditions are allowed by a DBMS, which means that when implementing a table at the logical level, we can have duplicates or even not define any key - and although the database may function, its schema won’t be in 1NF. So if we find a table that does not meet the normal form conditions, we can apply certain transformations to normalize it and bring it to 1NF.

### 2NF

The first normal form focuses mainly on prohibiting repeating groups, which eliminates the possibility of redundancies at the cell level - but does not eliminate redundancies caused by functional dependencies.

Despite prohibiting the existence of duplicate tuples, we saw in a previous example that city information in a table could be unnecessarily duplicated in multiple different tuples because the people living in that city were different. This meets 1NF but presents redundancy problems.

To address these redundancy cases, we use the **second normal form (2NF)**. It includes all the conditions of 1NF plus an additional stricter condition: all attributes that aren’t the primary key of a table must depend on the **entire selected primary key** for the table - meaning all its attributes, not just one. This prevents partial dependency on the primary key.

| **BikeID** | **Model** | **Brand** | **BrandCountry** | **PurchasePrice** | **OwnerName** | **OwnerEmail** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Roadster | SpeedX | USA | 1200 | John Doe | `john@example.com` |
| 2 | TrailBlazer | MountainCo | Canada | 1500 | Alice Smith | `alice@example.com` |
| 3 | Roadster | SpeedX | USA | 1150 | Bob Lee | `bob@example.org` |
| 4 | CityCruiser | UrbanRide | USA | 800 | John Doe | `john@example.com` |
| 5 | EcoCruiser | GreenMotion | Germany | 1300 | Carol Johnson | `carol@example.com` |

For example, here we have a Bike table whose primary key is {BikeID}, and the basic functional dependencies are {BikeID}→{Model}, {BikeID}→{PurchasePrice}, {BikeID}→{OwnerName}, {BikeID}→{OwnerEmail} because if BikeID uniquely identifies each bike, then the information about the model, price, and owner will directly depend on that attribute.

We also have the dependencies {Model}→{Brand}, {Model}→{BrandCountry}, and {OwnerEmail}→{OwnerName}, since knowing the bike model can uniquely determine its brand. We can also determine the owner's name from their email, which we can’t do in reverse because multiple people can have the same name and different email addresses.

Given these dependencies, since the primary key has only one attribute, we see that all others have a dependency on the entire primary key. This means that the primary key itself uniquely determines the rest of the table's attributes. So we can formally denote that, for all attributes A that aren’t the primary key, there’s the functional dependency **{Primary Key}→A**.

In this case, even though some dependencies are transitive, we can see that in the end, all attributes end up depending on the primary key. For example, with {BikeID}→{Model} and {Model}→{Brand}, we infer the dependency {BikeID}→{Brand}, which is not basic.

When this condition is met, the table is in 2NF, which avoids redundancies caused by attributes that depend only on part of the primary key, not the whole key.

This might not be as clear here because the primary key in the example has only one attribute, but sometimes we have primary keys with more attributes. In such cases, the rest of the table's attributes must depend on all the attributes in the primary key in order to be in 2NF (in addition to meeting the conditions of 1NF).

If they depend only on part of the key, there could be repeated values in those attributes. This would cause redundancy issues because it’s the entire primary key (all its attributes) that can uniquely identify each tuple.

### 3NF

Continuing with normal forms, [<VPIcon icon="fas fa-globe"/>3NF](https://cse.hkust.edu.hk/~dimitris/5311/L08.pdf) is defined similarly. First, for a schema to be in 3NF, it must meet all the conditions of 2NF plus a specific one that states there can’t be functional dependencies between non-prime attributes.

Prime attributes are those that belong to any candidate key of the table. So we can restate the previous condition of 3NF by saying that no attribute that does not belong to any candidate key can functionally depend on any other attribute that does not belong to any candidate key.

For example, in the Bike table we had earlier, we assume that the only candidate key that exists is **{BikeID}**, since no other set of attributes can uniquely identify the tuples in the table. We can verify this by looking at the semantics of the attributes. So, seeing that there are functional dependencies like **{Model}→{BrandCountry}** between non-prime attributes, meaning they do not belong to any candidate key, we conclude that the table is not in 3NF, and we’ll need to normalize it.

| **BikeID** | **Model (FK)** | **PurchasePrice** | **OwnerEmail (FK)** |
| --- | --- | --- | --- |
| 1 | Roadster | 1200 | `john@example.com` |
| 2 | TrailBlazer | 1500 | `alice@example.com` |
| 3 | Roadster | 1150 | `bob@example.org` |
| 4 | CityCruiser | 800 | `john@example.com` |
| 5 | EcoCruiser | 1300 | `carol@example.com` |

| **Model** | **Brand** | **BrandCountry** |
| --- | --- | --- |
| Roadster | SpeedX | USA |
| TrailBlazer | MountainCo | Canada |
| Roadster | SpeedX | USA |
| CityCruiser | UrbanRide | USA |
| EcoCruiser | GreenMotion | Germany |

| **OwnerEmail** | **OwnerName** |
| --- | --- |
| `john@example.com` | John Doe |
| `alice@example.com` | Alice Smith |
| `bob@example.org` | Bob Lee |
| `john@example.com` | John Doe |
| `carol@example.com` | Carol Johnson |

To normalize the table, we’ll need to apply an algorithm to the tables to convert the schema to 3NF, ensuring there are no functional dependencies between non-prime attributes.

To understand this algorithm, we’ll start with the original Bike table we had before. We’ll on the functional dependencies between prime attributes that break 3NF, that aren’t derived transitively from simpler ones, and whose set of attributes on the left side does not form a superkey.

For example, if we have {A}→{B}, {B}→{C}, and {A}→{C}, we do not consider {A}→{C} since it can be derived transitively from the other two. Specifically, the problematic ones in our example, which aren’t derived transitively and whose left side is not a superkey, are {Model}→{Brand}, {Model}→{BrandCountry}, and {OwnerEmail}→{OwnerName}, which are the base functional dependencies.

Now, we need to decompose the table guided by these functional dependencies. But as you can see, we can apply the union property of functional dependencies to know that the **functional dependency** **{Model}→{Brand, BrandCountry}** also exists. We derived it from the previous problematic ones to simplify the application of the algorithm.

In short, to make the algorithm easier to apply, whenever we see multiple functional dependencies with the same determinant (set of attributes on the left side), it’s useful to apply the union property mentioned earlier to simplify them into one.

So now we have that the problematic functional dependencies are **{Model}→{Brand, BrandCountry}** and **{OwnerEmail}→{OwnerName}**. We can create a specific table for each of them where its schema is made up of all the attributes of the dependency - that is, all the attributes on both sides. We can formally denote this as the union of both sets of attributes.

As you might guess, by doing this, the primary keys in the new tables will be the attributes of the determinants of these dependencies (which in this case are **{Model}** and **{OwnerEmail}**, respectively).

We also need to remove these attributes that we have separated into additional tables from the original Bike table, leaving only the attributes of the determinants of these dependencies and converting them into foreign keys to reference the corresponding primary keys of the new tables. By convention, the attributes that make up the primary key of a table are usually placed first on the left, like **Model** and **OwnerEmail** here.

After this process, we can see that all the functional dependencies that were previously problematic are now in new tables where their determinants are now primary keys. This avoids violating the condition imposed by 3NF.

Note that after applying this algorithm, we don’t need to apply it recursively to the tables generated by the decomposition, as there is a guarantee that the resulting schema is already in 3NF after applying this process. In summary, by applying this normal form to our schema using the described algorithm, known as the [<VPIcon icon="fas fa-globe"/>relational synthesis algorithm](https://cs.emory.edu/~cheung/Courses/377/Syllabus/9-NormalForms/FD-preserve-howto.html), we manage to avoid or minimize the occurrence of redundancies caused by transitive functional dependencies.

---

## BCNF

The three previous normal forms are the most basic ones we can apply to a schema to eliminate most problems caused by redundancies. But there is another normal form in addition to 3NF that is more restrictive and ensures a better result in this regard, which is **BCNF**.

As we’ve seen, the normal forms become increasingly restrictive in the conditions they apply. In this case, [<VPIcon icon="fas fa-globe"/>BCNF stands for Boyce-Codd Normal Form](https://cs.stackexchange.com/questions/116901/database-theory-does-the-dependency-preservation-and-lossless-join-properties), and it’s characterized by allowing only those functional dependencies **X→Y** in the tables where it’s true that either the dependency is **trivial** or X is a **superkey** of the table.

If these conditions are met, we can formally demonstrate that all the conditions of 3NF must also be automatically met (and so also 2NF and 1NF). We won’t perform this demonstration here, as the important thing is to know how to normalize a schema to adhere to the BCNF. So if we start with a schema like the one we originally had for the unnormalized Bike table, we can apply a specific algorithm to transform it to BCNF.

| **BikeID** | **Model** | **Brand** | **BrandCountry** | **PurchasePrice** | **OwnerName** | **OwnerEmail** |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Roadster | SpeedX | USA | 1200 | John Doe | `john@example.com` |
| 2 | TrailBlazer | MountainCo | Canada | 1500 | Alice Smith | `alice@example.com` |
| 3 | Roadster | SpeedX | USA | 1150 | Bob Lee | `bob@example.org` |
| 4 | CityCruiser | UrbanRide | USA | 800 | John Doe | `john@example.com` |
| 5 | EcoCruiser | GreenMotion | Germany | 1300 | Carol Johnson | `carol@example.com` |

The algorithm to convert to BCNF is very similar to the one we looked at for 3NF. The difference is that here, the decomposition is done in more steps.

First, we need to identify the functional dependencies that prevent compliance with BCNF, which are exactly {Model}→{Brand}, {Model}→{BrandCountry}, and {OwnerEmail}→{OwnerName}. We choose these because, as you can see, {Model} can’t be a superkey, nor can {OwnerEmail} on its own. But in other functional dependencies like {BikeID}→{PurchasePrice}, we see that {BikeID} is indeed a superkey, as it’s actually the primary key of the table. So we don’t include those when applying the algorithm.

Also, keep in mind that a functional dependency X→Y can be trivial and meet the definition of BCNF even if X is not a superkey, meaning that the set of attributes Y is a subset of the set of attributes X.

Now, to simplify the application of the algorithm, we can focus on the determinant of the dependencies that break the normal form - that is, on the set of attributes on the left side, looking for several that have the same determinant. If there are several with the same determinant, as is the case with those that have **{Model}** on their left side, then we can use the union property of Armstrong's inference rules to simplify them all into one like **{Model}→{Brand,BrandCountry}**. Here', on the right side, we have gathered all the attributes from the right sides of the dependencies we had.

In this way, we reduce the number of dependencies to consider in the algorithm which simplifies its execution. This is the case since this step is not mandatory in this algorithm (nor in the conversion to 3NF), as it’s not part of the algorithm's definition itself, but rather something additional we do to simplify it without affecting its correctness.

Afterward, we end up with the dependencies **{Model}→{Brand,BrandCountry}** and **{OwnerEmail}→{OwnerName}**, which guide the decomposition we will perform on the table, similar to the 3NF conversion algorithm. But the main difference is that now we select the dependencies one by one and perform a decomposition for each, not all at once. Each time the table is decomposed, the dependencies and keys change, so we have to do it one by one to ensure that the recombination of the decomposed tables remains lossless.

Although we won't go into detail about why this happens, the important thing to remember is that we use this method because this algorithm doesn’t guarantee the preservation of all functional dependencies due to the conditions that define this normal form. These conditions are restrictive enough that, in certain situations, some dependencies may not be preserved after decomposition.

When selecting one of the dependencies like **{Model}→{Brand,BrandCountry}** (we can actually choose any of them), we decompose the Bike table guided by this functional dependency. We remove all the attributes on the right side of the dependency from the original table and make the attributes of the determinant (left side) foreign keys. These foreign keys point to the corresponding attributes of a new table where we store all the attributes involved in the dependency (meaning from both sides).

| **BikeID** | **Model (FK)** | **PurchasePrice** | **OwnerName** | **OwnerEmail** |
| --- | --- | --- | --- | --- |
| 1 | Roadster | 1200 | John Doe | `john@example.com` |
| 2 | TrailBlazer | 1500 | Alice Smith | `alice@example.com` |
| 3 | Roadster | 1150 | Bob Lee | `bob@example.org` |
| 4 | CityCruiser | 800 | John Doe | `john@example.com` |
| 5 | EcoCruiser | 1300 | Carol Johnson | `carol@example.com` |

| **Model** | **Brand** | **BrandCountry** |
| --- | --- | --- |
| Roadster | SpeedX | USA |
| TrailBlazer | MountainCo | Canada |
| Roadster | SpeedX | USA |
| CityCruiser | UrbanRide | USA |
| EcoCruiser | GreenMotion | Germany |

Formally, if our original table is the set of attributes **R**, then we keep **R-{Brand,BrandCountry}**, convert **{Model}** into the foreign key **{Model (FK)}** referencing the set of attributes {Model} of the new table generated by the decomposition, whose attributes are given by **{Model}U{Brand,BrandCountry}**, and whose primary key is the set **{Model}** that was previously in the **determinant** of the dependency.

Now, we repeat this process recursively on the resulting tables, as this decomposition has solved the problem caused by the dependency {Model}→{Brand,BrandCountry}. But we still have the dependency {OwnerEmail}→{OwnerName} in the Bike table. So we apply another decomposition step guided by the only remaining dependency that violates the BCNF conditions.

By doing this, we remove the set of attributes {OwnerName} from the Bike table and convert {OwnerEmail} into a foreign key that references the same set {OwnerEmail} but from the new table generated by the decomposition. In this case it’s formed by the attributes **{OwnerEmail}U{OwnerName}={OwnerEmail,OwnerName}**.

| **BikeID** | **Model (FK)** | **PurchasePrice** | **OwnerEmail (FK)** |
| --- | --- | --- | --- |
| 1 | Roadster | 1200 | `john@example.com` |
| 2 | TrailBlazer | 1500 | `alice@example.com` |
| 3 | Roadster | 1150 | `bob@example.org` |
| 4 | CityCruiser | 800 | `john@example.com` |
| 5 | EcoCruiser | 1300 | `carol@example.com` |

| **Model** | **Brand** | **BrandCountry** |
| --- | --- | --- |
| Roadster | SpeedX | USA |
| TrailBlazer | MountainCo | Canada |
| Roadster | SpeedX | USA |
| CityCruiser | UrbanRide | USA |
| EcoCruiser | GreenMotion | Germany |

| **OwnerEmail** | **OwnerName** |
| --- | --- |
| `john@example.com` | John Doe |
| `alice@example.com` | Alice Smith |
| `bob@example.org` | Bob Lee |
| `john@example.com` | John Doe |
| `carol@example.com` | Carol Johnson |

As you can see, after these steps, the schema doesn’t have any functional dependency **X→Y** where X is not a superkey or the dependency itself is trivial. This is because when decomposing into tables, we define their primary keys as the determinants of the dependencies that originally did not comply with the normal form.

So after performing these steps for all dependencies that prevent the schema from adhering to BCNF, we end up with a normalized schema that does comply with BCNF. During the process, it’s possible that some of the generated tables still have functional dependencies that violate BCNF, which is why these steps are applied recursively. This means that decomposition is not only done from the original table, but it may also be necessary to decompose a table generated by previous steps, especially in more complex schemas.

In the example we have, the final schema that meets the BCNF conditions is exactly the same as the one we got when transforming it to BCNF. But this is a coincidence - in most practical cases, schemas tend to be more complex, and after converting them to 3NF, they may not comply with BCNF, or it may even be impossible to convert them to BCNF. That is, converting a schema to 3NF is always guaranteed to be possible, while there is no such guarantee for BCNF.

In short, BCNF is more restrictive than 3NF, which prevents redundancies caused by functional dependencies where a set of attributes that do not uniquely identify the tuples of a table determine the values of another set of attributes. This makes the information of the determining attributes redundant, similar to what happens in 3NF with transitive dependencies.

Also, being more restrictive, it may not be achievable if a table has multiple overlapping superkeys, as applying the **BCNF decomposition algorithm** would break the functional dependencies between attributes of different superkeys. So by relaxing the conditions of BCNF, we get 3NF, which correctly handles situations where overlapping superkeys exist, meaning they share some attribute.

---

## Other normal forms

Besides the normal forms based on functional dependencies, which we have just seen, there are others that eliminate redundancies caused by different types of relationships between attributes or characteristics.

For example, **4NF** deals with **multivalued dependencies**, 5NF with join dependencies, **6NF** represents the highest level of normalization of a relational schema, and **DKNF (Domain-Key Normal Form)** also imposes the condition that all schema constraints must result solely from domain and key definitions, meaning it only allows domain and key constraints.

---

## When to check compliance with each normal form?

Lastly, we’ve seen that each normal form establishes a series of characteristics that a **database schema** has to follow and the problems it aims to solve.

Practically speaking, the most important normal forms we need to ensure for almost any schema are **1NF** and **2NF**. In the case of 1NF, most DBMSs guarantee it automatically - but we have to design the conceptual model so that it avoids the appearance of repeating groups that don’t meet the conditions of 1NF. On the other hand, 2NF is essential for identifying tuples in tables, so we should make sure it’s met in a real project database.

Beyond these, if we’re working with a system that performs analytical queries like in **OLTP**, the database schema should also meet the conditions of 3NF, especially when the schema needs to handle queries or undergo updates frequently. This helps resolve these queries and updates as efficiently as possible.

Beyond 3NF, we’ll want to meet BCNF when business rules are very complex. That is, when data has to meet complex constraints, we can help minimize the impact of redundancy issues through BCNF conditions, as they are more restrictive than those of 3NF. Then, if our schema allows **multivalued attributes** or associations of **degree** higher than 2, it may be useful to check other types of normal forms like 4NF, 5NF, and so on.
