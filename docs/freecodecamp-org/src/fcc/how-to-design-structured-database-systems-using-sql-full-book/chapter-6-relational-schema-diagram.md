---
lang: en-US
title: "Chapter 6: Relational Schema Diagram"
description: "Article(s) > (7/12) How to Design Structured Database Systems Using SQL [Full Book]"
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
      content: "Article(s) > (7/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 6: Relational Schema Diagram"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-design-structured-database-systems-using-sql-full-book/chapter-6-relational-schema-diagram.html
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
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-6-relational-schema-diagram"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

After introducing the relational model at the conceptual level, we must remember that this is the first level of database design. Now, based on the entity-relationship diagram, we need to determine the tables that will make up the database, as well as the keys they will have to identify and reference each other. We also need to define the constraints that ensure the validity and integrity of the data.

So even though we’ve already introduced certain concepts of logical design, here we’ll formalize the logical design itself through relational schema diagrams, sometimes called relational diagrams for simplicity.

![Relational schema diagram where Pool references City through a foreign key.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752067358857/9f4bba9e-330a-44d3-b162-32681c5e5196.png)

As you can see, here we have a relational diagram representing the logical design associated with the last entity-relationship diagram from the previous section.

First, instead of entities, we have tables here, each with a series of attributes. If any attribute is used in a primary key, it’s underlined like PoolID or CityID, with all other attributes being "normal" table attributes. Also, foreign keys are represented directly with arrows. In this case, CityFK is a foreign key that references the CityID attribute of the City table because it’s a primary key, which is why it's denoted with an arrow pointing from the foreign key attribute to the corresponding attribute in the other table.

Regarding the foreign key, keep in mind that an attribute can only point to one other attribute - meaning `CityFK` can only have one arrow pointing to one attribute, not several, as the foreign key references a single attribute in another table. If we were asked to convert this relational diagram into an entity-relationship diagram, the foreign key itself would determine the cardinalities of the association (at least the maximum cardinalities, since, for that foreign key to make sense, at the conceptual level, it would translate to a pool being in only one city at most, while a city can have an arbitrary number of pools).

These types of diagrams aren’t standard like UML. They only need to meet the characteristics mentioned earlier. That's why, in many cases, tables are represented with squares similar to UML entities instead of being shown in textual format with Datalog.

But unlike UML diagrams, there are very few implicit restrictions here. Most restrictions need to be added with notes in the margins. For example, to indicate that an attribute can’t have a NULL value, we can’t do it with diagram elements - instead, it must be represented by other means, such as a note or a piece of code in **OCL**.

---

## 1-1 association

Given the nature of relational diagrams, we can infer that entities are directly transferred to the logical model with tables, where each entity corresponds to a table. But in addition to the tables, we have to implement the associations between entities at the logical level.

To do this, we start with the simplest case, which is an association where the maximum cardinality on both sides is 1, as in the example we saw earlier where we had an entity Person composed of an entity Brain, whose translation to a relational diagram would be as follows.

![Relational schema diagram where Person and Brain reference each other through foreign keys.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752069584062/a369d85c-5287-48e8-8822-18f503c0ae9e.png)

As you can see, both entities are represented with tables, where the attributes of their primary keys are underlined. Also, even though they don't appear in the conceptual diagram, we need to reflect the existence of foreign key attributes used to implement the association itself.

So we’ve added attributes with names that best indicate that they are foreign keys. In this case, the name ends with FK, although you can use any name you like. So for a brain to be associated with a person, its corresponding foreign key refers to the primary key of the table that stores people. Since the other direction of the association is symmetrical, we do the same with the foreign key of Person (which refers to the primary key of Brain so that a person can be associated with their corresponding brain). We do this with foreign keys for simplicity and because it's the only way to determine which brain each person has and to whom each brain belongs.

Because of the 1-1 association, you typically shouldn’t leave this type of association due to the overhead caused by using multiple foreign keys referencing in both directions, and the redundancy at the conceptual level. If each person has one brain and only one, and vice versa, it's likely that both can be "merged" and modeled as a single concept, moving all the attributes that characterize Brain to the Person entity, for example. But there are other ways to refine the schema, or there are times when the domain or requirements force us to keep this type of relationship, in which case it would be perfectly valid.

---

## 1-M association

Another type of association we need to translate to the logical level is called 1-M (or 1-N), which refers to associations where the maximum cardinalities on both sides are 1 and `*` respectively, where M means an arbitrary amount.

![Entity-relationship diagram where each House belongs to a single Person, who can have multiple houses.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752069775099/caf1b28f-a301-451a-942f-a6a381f10ca5.png)

For example, here we have a 1-M relationship between the entities House and Person, where a house must belong to a person, and a person can have an arbitrary number of houses, including none. At the logical level, we can represent this as:

![Relational schema diagram where House references Person through a foreign key.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752074660667/ba64c7d8-7315-4f00-b3ff-0915af14d5d4.png)

Just like before, we implement both entities with tables, and the 1-M association between them with a foreign key in the entity on the side where the maximum cardinality is `*`. Specifically, to avoid repetitive groups, we place the foreign key in house, since a house can only have one person as its owner. This means it won't be necessary to store an arbitrary number of references in the attribute of its foreign key - one is enough.

And as always, the foreign key refers to the primary key of Person, so that it can reference a value of an attribute that can uniquely identify a person, and thus determine the owner of a house.

---

## Minimum cardinality issues

Regarding the previous entity-relationship diagram, we can see that the `1..1` side indicates that at a minimum, a house must always be associated with a person who will be its owner. This means that a house must always have an owner. But this is not realistic, as when a house is built, it may be without an owner for some time, causing the cardinality on that side of the association to become `0..1`. In turn, the minimum cardinality of 0 means that a house may not have an owner - so its foreign key should not exist while the house has no owner. To model this, attributes, including foreign keys, are allowed to take NULL as a value by default (as we’ve seen before). This way, to represent that the foreign key does not point anywhere, we simply choose not to restrict the possibility of it taking this NULL value. So when a house has no owner, its foreign key attribute will be NULL until it references a person - that is, a tuple in the Person table.

This situation, where a foreign key is allowed to take the NULL value, is not explicitly indicated in the relational diagram. Instead, it’s indicated when the opposite situation occurs - where if the foreign key can’t be NULL, we need to add a note clearly indicating this (as is the case in the original entity-relationship diagram we just saw).

On the other hand, the association in the diagram has a multiplicity of `0..*` on the House side, indicating that a person doesn’t have to own any house. But if we had a minimum cardinality greater than 0, then this restriction would need to be defined with a note in the relational diagram, as well as with specific SQL tools (since there are no standard elements to model this type of requirement caused by minimum cardinalities in such a situation).

---

## N-M association

To conclude with the types of associations according to their cardinality, the only one left to translate is N-M. In this case, N and M denote arbitrary quantities, meaning associations whose maximum cardinalities are both `*` at the same time.

![Entity-relationship diagram where House and Person have a many-to-many relationship.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752077406305/f54614f5-082a-4541-bc82-7146ffc640db.png)

As an example, we could have a domain where a person can own many houses, and a house can be owned by many people at the same time. To model this situation at the conceptual level, the first thing we might think of is to create a diagram like this, where we only put an association with cardinality `0..*` on both sides.

Conceptually this would be consistent, but logically it can’t be translated in any way. That is, if we have an association with a maximum cardinality of `*` on both sides and try to implement it logically using foreign keys as we’ve done so far, we’ll find that even if we put a foreign key in both entities referencing the entity on the other side of the association, the problem of the repeating group will always appear in both entities, regardless of what else we do.

To understand this, we can look at it conceptually. If a person has an indeterminate number of houses and we put a foreign key in Person referencing House, then that foreign key would need to contain references to each of the possible houses the person might have. Since it's not a fixed number, a repetitive group appears in the foreign key.

The same happens in reverse: if a house can have an arbitrary number of owners, then including a foreign key in House referencing Person would cause a repetitive group in the foreign key. So this type of association does not have a direct implementation at the logical level.

But in reality, these situations usually don't occur this way. Instead, it's common for there to be an intermediate class in the association that allows for its implementation at the logical level, as in the following example:

![Entity-relationship diagram where Property connects houses and people with sale dates and prices.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752070941510/823b8d0c-c00f-4115-92bb-59b31f8fc1a1.png)

Here, we have a situation similar to the previous one, where a person can own an arbitrary number of houses, and a house can be owned by an arbitrary number of people. The difference here is that we assume one of the domain requirements is to record when a person buys and sells a house, as well as the price at which it was bought. We don’t need the the selling price because it will be the purchase price for another occurrence of Property.

For this, we use an intermediate Property entity that stores this data, where we must keep in mind that SellDate should not "exist" until the house is actually sold, if it’s sold at all. So to translate this to the logical level, the simplest approach is to allow SellDate to be NULL until the house is sold.

![Relational schema diagram where Property references House and Person through foreign keys.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752071179227/4dd3de56-2a14-4cbc-ab56-944445b7de91.png)

As we can see, this situation can now be translated into a relational diagram, meaning at the logical level. This is because all entities can be represented as tables. And since the associations are of the 1-M type, we already know how to implement them using foreign keys, specifically in the Property entity referencing the primary keys of the other two entities, respectively.

This doesn't mean that whenever we have an N-M relationship, we need to introduce an intermediate entity to implement it. Sometimes we need an intermediate class to store information, as in this case, and in other situations, we might need to refine the schema because the N-M relationship doesn't best represent the domain.

But if we really need to implement an N-M relationship and we’re sure that this relationship is conceptually correct, we can always add an artificial intermediate entity that has no attributes other than the foreign keys of both associations (with both being the primary key), thus making it a weak entity in identification.

![Entity-relationship diagram where Property is a weak entity that connects House and Person with sales data.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752070430749/a6f7f0cc-7fcb-4fce-ac0f-6d41fc1e7610.png)

For example, considering the situation where we do need to store information in an intermediate class, we previously saw that Property had its own primary key, **PropertyID**, probably derived from a surrogate key. But if there is no surrogate key, we must try to identify the tuples of Property through their attributes. In this case, this isn’t possible given their semantics - meaning the significance of what they store - as there could be multiple tuples with the same dates, prices, and so on.

So, knowing that two foreign keys will appear in Property referencing House and **Person** when translated to the logical level, we can use them to define the primary key of Property using **BuyDate** and the foreign key attributes themselves.

We do this because if we only make the primary key consist of the foreign keys, then Property can’t be uniquely identified if a person buys and sells the same house during multiple different time periods. So we add BuyDate to the primary key to also distinguish by purchase date, because **SellDate** can be `NULL` (which violates the fundamental integrity constraint of primary keys that none of their attributes can be NULL). With this, the **Property** entity becomes weak in identification, which is why we’ve added **«weak»** to both sides, indicating that we need both foreign keys for identification.

![Entity-relationship diagram where Property links houses and people with purchase and sale information.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752070636272/b40fe320-933b-46c3-98b0-7d0838c59de1.png)

Similarly, in this case, since the weakness in identification affects the entities on both sides (meaning we need the foreign keys referencing the entities on both sides of Property), it can be represented conceptually with an associative entity linked to the M-N association between House and Person. This is still equivalent to the previous diagram, with the only difference being that the intermediate class is represented differently.

Also, it’s important to note that if Property had a surrogate key and did not need foreign keys for its identification, this representation using an associative entity would not be valid. Ultimately, the associative entity is only valid to use in this context when the intermediate entity **depends** on the two linked entities for its identification, with these being its owning entities.

![Relational schema diagram where Property references House and Person through foreign keys.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752071302075/d712f40f-1b86-4a5c-bc84-0f5f33851215.png)

Regarding the logical-level translation of this last case, we. doit in the same way - the difference being that we no longer have the PropertyID attribute in Property. Also, its primary key is now **{BuyDate, HouseFK, PersonFK}**, so we underline all those attributes.

As a general rule, when a foreign key is underlined in a relational diagram, it indicates that the conceptual-level entity corresponding to the table is weak in identification. This lets us know how many entities it depends on - that is, its owning entities.

---

## IS-A Hierarchy

After seeing how entities and associations from the relational model are translated to the logical level, let’s now understand how the special relationships of generalization and specialization among the entities themselves are translated.

To do this, we’ll start with an example of an IS-A hierarchy. This basically means that one or more entities, like CityPool, are a specialization of another more general entity, Pool. This is very similar to what happens in object-oriented programming with inheritance.

The inheritance hierarchy is called IS-A because if CityPool inherits from Pool, then it’s more specific than Pool. This means that every city pool is a pool, but it has specific attributes that characterize city pools, such as their maximum user capacity or the ticket price.

![Entity-relationship diagram with inheritance where CityPool and OlympicPool are subclasses of Pool.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752081799527/5f6d4146-0884-4ba5-8125-3ae064748ff6.png)

Before seeing how they are translated to the logical level, it's important to know that IS-A hierarchies have a series of specialization constraints that determine the "relationship" the parent entity (Pool here, sometimes called superclass) has with the specific entities. In other words, if we consider that entities are actually sets containing all their occurrences (tuples) (which we’ll call individuals here to keep it a more "general" concept), away from the details of the conceptual and logical model, then we can establish constraints like **completeness** or **disjunction** of a hierarchy.

To understand completeness using this example, we can first have hierarchies that are complete, where all individuals of the entity Pool must necessarily belong to the sets of individuals of one of the specific entities that inherit from the superclass Pool.

In this case, the superclass **Pool** is an entity that contains all existing pools. So some of them might be city pools, belonging to the set of individuals formed by the inheriting entity **CityPool**. Others might be Olympic pools, which belong to the set of individuals of **OlympicPool**.

In our model, we have only specified these two types of pools, while in reality, there are many other types of pools. In this hierarchy, they’d be represented by individuals in the set generated by Pool, as they don’t have any inheriting class to belong to. So in this case, our hierarchy would not be complete, but **partial**, since there are pools that do not belong to any inheriting entity.

On the other hand, **disjunction** refers to the possibility of individuals belonging to more than one inheriting entity at the same time. For example, in our case, a pool is either a city pool or an Olympic pool, or it’s neither of those types - so we will never find a pool that is both a city and an Olympic pool at the same time.

If we consider the sets of individuals of the inheriting entities, the hierarchy is considered **disjoint** when those sets are disjoint, as in this case where pools are either one type or the other, but not both at the same time. Conversely, in cases where the latter occurs, the hierarchy is called overlapping.

### 1 table

Knowing now that the hierarchy in our example is incomplete (called partial) and disjoint, we need to implement what’s shown in the entity-relationship diagram at the logical level.

We have several options for this. One option is to implement the entire IS-A hierarchy with a single table, `Pool`, that gathers all the attributes of the tables in the hierarchy.

![Image by author. Relational schema where `Pool` includes attributes for capacity, price, and competition features.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752083879943/097a29cd-6b8d-41ca-ad49-6bed9562026a.png)

As you can see, in this option we implement a table that contains all the attributes of the three tables, where `PoolID` functions as the primary key of the entire `Pool` table, since in the conceptual design specific identifiers aren’t usually assigned to inheriting entities unless required. This is why `PoolID` appears underlined. As for the rest, they work the same as if they were in their respective entities.

On one hand, this option has the advantage of using only one table for the entire hierarchy, which makes it easier to understand and maintain. It also avoids the possible redundancy of storing the same information in multiple tables.

But on the other hand, it presents significant problems. First, we have no simple way to distinguish a pool from a city pool or an Olympic pool, meaning the only way to know the specific type of pool that a tuple in the Pool table represents is to have some attributes be NULL.

For example, if a tuple represents a pool from the Pool entity, then all the attributes of `CityPool` and OlympicPool must be NULL so that the corresponding tuple only takes values in the attributes of the Pool entity. This lets us determine that the tuple represents an "individual" of the set of occurrences of the Pool entity.

The same thing happens when we try to distinguish city pools, where all the attributes of OlympicPool must be NULL, since `CityPool` inherits all the attributes of the Pool entity. So all those attributes plus those specific to `CityPool` will have values, while those of OlympicPool will be NULL to indicate that the pool is a city pool. This also happens when we want to know if a tuple represents an Olympic pool, where the attributes of `CityPool` will be NULL.

So if we implement the IS-A hierarchy with a single table, we will have the problem of distinguishing the types of pools - that is, knowing if a tuple represents an occurrence of the superclass entity or one of the inheriting entities. This could lead to a potentially large number of NULL values occupying unnecessary space in the table, even though working with such a table might be easy to understand.

Also, we can also consider the ease with which the schema can be extended or modified as an advantage. This is because if a foreign key is later added in our domain in any of the 3 tables of the hierarchy referencing another entity, it would simply be necessary to add a foreign key attribute to the Pool table. Similarly, if an external foreign key points to any of the entities in the hierarchy, it would only need to reference PoolID.

### 2 tables

To address the previous problem of distinction, another option we have for implementing the hierarchy is to use two tables, or as many as there are inheriting entities. The basis of this is that all inheriting entities have the same attributes as the superclass they inherit from, plus a series of specific attributes that characterize them.

So to logically distinguish the inheriting entities, we can implement specific tables for each one, where they have the same attributes as the superclass plus their own.

![Relational schema where CityPool and OlympicPool inherit common attributes and add specific fields.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752084244540/f47a6034-0fa1-43e4-8040-ad5177e1976d.png)

As you can see, in this option we implement the CityPool and OlympicPool tables, which are responsible for storing tuples that represent city pools and Olympic pools, respectively. Since each contains the same attributes as the subclass, even though they aren’t explicitly copied in the inheriting entities in the conceptual diagram, both have the same primary key, PoolID.

This implementation offers various advantages: first, we eliminate unnecessary NULL values used to distinguish pool types, at least those modeled through the inheriting entities. Also, the schema remains simple, being easily understandable and maintainable due to the semantics of each table.

But there is also a distinction problem here, as our hierarchy is not complete. This means that there will be pools that are neither city nor Olympic, so they can’t be represented with tuples from CityPool or OlympicPool. In other words, this option doesn’t work for representing incomplete hierarchies, as the only way we could represent a pool that is neither of these types would be to insert an identical tuple in both CityPool and OlympicPool with all attributes not belonging to the superclass set to NULL. But this would be very counterproductive in terms of memory usage, and would also be complicated to manage.

On the other hand, even if the hierarchy were complete, a possible disadvantage to consider is the repetition of the superclass attributes in all tables, where this repetition wastes space in our database.

But even if we have extra space and can afford to repeat all those attributes, if we want to gather all the data about all the pools *(or individuals)* that exist, we would need to collect the data present in all the tables, which may not be entirely efficient.

Lastly, if our conceptual model has a foreign key referencing the superclass entity Pool, we need to consider that the primary key of Pool has now been transferred to the two tables. This means that foreign key would have to reference both tables at once, which isn’t possible. So instead of referencing an attribute of one table, it would have to reference PoolID from both CityPool and OlympicPool at the same time. This would complicate or even make the implementation impossible at the logical level.

Regarding foreign keys, this option would indeed allow us to easily implement a foreign key in one of the entities, CityPool or OlympicPool, that references another entity (or even foreign keys that reference these entities in a straightforward manner).

![Relational schema where OlympicPool inherits from Pool, adding competition and certification attributes.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752084458598/f27a5174-8f88-4ed1-8459-1dd1cb15c8dc.png)

But, if we insist on using two tables to implement the hierarchy, we could refine the logical schema to solve the problem of a foreign key referencing the superclass in this way.

As you can see above, we have two tables where one is exclusively dedicated to storing tuples that contain the attributes characterizing an Olympic pool. The other entity encompasses all pools, including city pools and Olympic pools. This is because an Olympic pool also inherits the attributes of the superclass, so to represent it in this schema, we create two tuples: one in Pool that stores the values of the superclass attributes, leaving the rest as NULL, and another tuple in OlympicPool that stores the remaining attributes, with its foreign key (which is also the primary key), referencing the corresponding tuple in Pool with the superclass attribute values.

The main advantage of this option is that it solves the problem of having an external foreign key referencing Pool - as in this case, it would simply need to point to the primary key {PoolID} of Pool, instead of several attributes at once as it did before.

But this leaves us with a significantly more complex schema to understand and work with, as the way to store a city pool is entirely different from storing an Olympic pool. This complicates certain operations like inserting an Olympic pool, where we’d need to create two tuples in Pool and OlympicPool so that the primary/foreign key of OlympicPool points to the tuple created in Pool. It also complicates counting the pools that are neither Olympic nor city pools in the system, where all those tuples in Pool with NULL in the attributes characterizing city pools must be found.

Finally, although we see that the primary key of OlympicPool is also foreign in this implementation, this doesn’t imply that conceptually it’s a weak entity in identification. There are many ways to implement the hierarchy, and this is not necessarily the one that must be carried out.

### 3 tables

So, if we have an incomplete hierarchy and really want to make sure that the implementation lets us distinguish between the different types of pools and identify those pools that don’t belong to any inheriting entity, we can use three tables - one for each entity, respectively.

![Relational schema where CityPool and OlympicPool inherit from Pool, adding specific attributes.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752084637220/69491535-2a0c-4080-bf09-10967addced1.png)

The peculiarity of this schema is that since all pools contain the attributes of the superclass Pool, whenever there is a pool in our database, it will be represented by a tuple in the Pool table that contains only the values of the superclass attributes. And, if a pool is of a specific type, it will be represented not only by the Pool tuple but also by a tuple in one of the tables reserved for the inheriting entities, where each has a foreign key pointing to the primary key {PoolID} of Pool.

For example, a city pool can be represented by a tuple in CityPool (which only has the specific attributes that characterize it as a city pool) plus a foreign key pointing to a specific tuple in Pool that holds the values of the other inherited attributes.

The advantage of this schema is that it minimizes wasted space from duplicated information or the appearance of NULL values (as the only thing being "duplicated" here is the PoolID attribute as foreign keys in the inheriting entities). It’s also easy to understand because each entity is represented by a specific table at the logical level.

Also, the schema is easy to modify in cases where we need to add foreign keys to the entities, where it would simply require adding an additional foreign key attribute or implementing external foreign keys pointing to the entities themselves, which we can do by referencing their own primary and foreign keys {PoolID}.

If we add a new type of pool to the domain later, it’s easy to add a table very similar to the ones we already have. This is unlike the previous options we saw where adding a new type of pool would be more costly because of the elements that need modification. Also, having three tables makes it easy to model the constraints related to the completeness and disjunction of the hierarchy.

But this schema also presents certain problems. On one hand, if we have a city pool and want to know its name, we’ll need to access the Pool table to find its name, plus the CityPool table. This complicates the query and affects its efficiency and latency.

Aside from this, if we have a tuple from Pool and want to know if it’s a city pool, an Olympic pool, or neither, we’ll have to go through all the tuples in CityPool and OlympicPool to see if the foreign key of any of them points to the Pool tuple we are trying to identify.

Also, the presence of three tables is more complex than having just one or two, making the logical model somewhat more complicated to operate because there are more tables and more relationships between them.

### When to Model Each Entity as a Table

These alternatives aren’t the only options for implementing an IS-A hierarchy at the logical level. Depending on the domain needs and requirements, we can choose other more appropriate schemas that are similar to those we’ve already discussed.

To summarize which is the best schema we can implement to model an IS-A hierarchy at the logical level, we need to know when it’s appropriate to introduce a table for each entity.

First, we have the **superclass**. This is useful to model with a specific table in cases where the hierarchy is incomplete, as in the example hierarchy. We saw that without a dedicated Pool table to represent occurrences of the superclass entity, it’s difficult to distinguish when a pool is of the generic type of the superclass or is instead of a specific type (like that of the inheriting entities). It’s also helpful to implement a table for the superclass when there is a foreign key pointing to the superclass entity itself. Otherwise, it’s very likely that we’ll have trouble knowing which attribute the foreign key should reference, as we saw before.

And to finish with the superclass, we should also implement a table for it when the hierarchy is **non-disjoint** or **overlapping**. For example, if a pool could be of several types at once and we didn't have the Pool table, we would be forced to duplicate information in specific tables for the inheriting entities. This would greatly complicate database operations.

So, with our Pool table, we can have tuples in the respective tables of the inheriting entities, all with their foreign keys pointing to the same Pool tuple, which simplifies queries.

If we have a Pool table where all existing pools are stored, it’s likely that we would want to efficiently know the type of a pool from a Pool tuple. Instead of having to go through all the tuples of the inheriting entities' tables, we can add an attribute in Pool that determines its type (if it has one). Or that will be NULL if the hierarchy is incomplete and doesn't belong to any type.

This is called an explicit discriminator. If there isn't one, we typically say that there is an implicit discriminator. These are the foreign keys of the other tables that we would have to go through to find out the type.

Regarding the inheriting entities, we should create a table for each one when they have many attributes, which would result in many NULL values if we were to implement this with just one or two tables. Besides the attributes, the inheriting entities themselves may have specific domain constraints that are greatly simplified at the logical level if we implement tables for each of them. This would avoid the need to apply constraints on just one or two tables, complicating the semantics of the constraints.

In short, the more entities we combine into a single table, the more NULL values we will encounter, since to **distinguish** them, the table attributes that do not correspond to the concept or entity we want to represent must be NULL, as if they don’t exist.

This would also complicate database operations, as operations would need to consider which attributes should or should not be NULL - as well as the constraints - which must account for the presence of NULL values to be verified.

On the other hand, if we know the hierarchy is complete, then instead of implementing a table for the superclass, we can decide to implement tables for each inheriting entity, where each one has the attributes of the superclass. But this option loses its purpose when we have a superclass with too many attributes, which would be repeated in several tables, potentially many.
