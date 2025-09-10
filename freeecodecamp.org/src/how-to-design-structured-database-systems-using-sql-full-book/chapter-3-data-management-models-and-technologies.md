---
lang: en-US
title: "Chapter 3: Data Management Models and Technologies"
description: "Article(s) > (4/12) How to Design Structured Database Systems Using SQL [Full Book]"
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
      content: "Article(s) > (4/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 3: Data Management Models and Technologies"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/chapter-3-data-management-models-and-technologies.html
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
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-3-data-management-models-and-technologies"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

As you’ve been learning, applications that rely on databases typically involve large amounts of diverse, complex data. Because of this, there’s no single database model that effectively addresses all scenarios. Rather, there are different families, each specializing in specific tasks or sets of tasks.

So here, we’ll explore a range of options that can help you select a database to use in a project, depending on the data and the system's requirements. More specifically, we’ll examine some models or approaches on which a database may be based. But keep in mind that there are many others apart from the ones we’ll discuss here.

---

## Types of Data According to Structure

First, the most relevant factor in determining a database's paradigm in a project is the data itself - particularly its complexity. Data complexity is defined by its structure, variability, and internal relationships. This mainly determines how the data is stored and processed.

So, before analyzing the different paradigms or approaches available, you should understand the meaning of [<VPIcon icon="fas fa-globe"/>data complexity](https://acceldata.io/blog/data-complexity).

Complexity is a concept that we can informally understand as the degree to which data is "complicated." For instance, a list of integers is different from a graph with integers at each node or a list of numbers encoded in binary, encrypted, or compressed.

Thus, [<VPIcon icon="fas fa-globe"/>complexity](https://aimspress.com/article/doi/10.3934/bdia.2016002?viewType=HTML) has several dimensions.

- **Volume:** Clearly, the more data we have, the harder it will be to manage. It's likely that not all of it will fit on a single machine, resulting in longer processing or query latency times.
- **Heterogeneity:** This alludes to the vast variety of formats, structures, and origins that data can exhibit within a given information ecosystem. Each of these characteristics constitutes a specific type of [<VPIcon icon="fas fa-globe"/>heterogeneity](https://dremio.com/wiki/heterogeneous-data/). This concept is more related to the world of data integration than to databases themselves, because it’s the main problem we face when integrating data into a system, regardless of whether it includes a database.
  - **Example:** If we are going to build a database of cities and populate it with data from different sources, it’s likely that the city names will be written slightly differently in each source. This is referred to syntactic heterogeneity.
- **Structure:** In our case, this is the key dimension, as it allows us to classify the data into different categories, each of which is associated with a specific database paradigm. Essentially, the structure of the data refers to the extent to which it adheres to a predefined **schema**.

For now, we can understand the **schema** as a formal definition that determines **how** data is organized, as well as the features of this organization depending on the nature of the data and the database. Later, we will focus on the concept of schema in a **structured** (relational) database.

So the complexity of the data depends mainly on two dimensions: the **flexibility** of the schema and the **volume** or **heterogeneity** of the data. The more flexible the schema and the greater the volume or heterogeneity of the data, the more complicated it will be to process it, requiring an appropriate database model.

This means that, regarding the structural dimension of complexity, we can categorize data according to how "rigid" it is.

First, we have **unstructured data**. These are data that do not follow a fixed schema or set of rules for automatic interpretation or labeling without prior processing. They are usually the **most complex** since they are unstructured and lack metadata, or additional information that describes or organizes them. This category includes images, videos, audio, and all kinds of multimedia, such as spatial data.

Next, we have **semi-structured data**. Unlike the unstructured data, this one uses tags as metadata to organize it. This allows the data to be clustered around these tags, which makes it easier to interpret, query, and process. But it can also be self-organized using key-value pairs or internal hierarchies.

Essentially, this data contains **meta-information** that enables its self-organization, though it does not adhere to the strict schema of structured data. For example, we can have data in **XML** or **JSON** format where data is presented as key-value pairs, with a key associated with one or more pieces of data. As such, the key-value pair scheme is not rigid enough to perfectly characterize the structure of the data since it does not explicitly limit the amount of data that can be associated with a tag.

Finally, we have **structured data**. Such data are organized by a strict schema that restricts them to **tabular form**. In other words, the organization is adapted to a schema and follows a series of rules. Each data point is composed of a sequence of values that it takes on a finite number of attributes, where each of these attributes is univalued.

We can think of the schema as the table header that determines the attributes for which each data point takes on values. In this way, a data point is a tuple or row of the table in which it’s stored.

There is one additional restriction: each attribute can only have one value, meaning that an attribute or cell of the table can’t contain more than one value.

Each of these categories leads to one or more database paradigms adapted to their nature. The easiest to deal with are the structured ones, as their rigidity does not allow for sufficient variation for the analytical techniques used on them to be considered "*complex*." In contrast, the most difficult to deal with are the unstructured ones, due to their variety and high flexibility.

### Limitations of Structured Data

To keep things simple, we’ll focus on structured data and the databases supporting it. These databases are built using the **relational model**, which we’ll discuss later.

Since structured data is organized in tables, operating on them is simpler since tables have properties that make them easier to traverse and process. For example, knowing that each cell holds only one value allows us to programmatically traverse all the data in the table by traversing all its rows, regardless of the contents of each cell. This way, we avoid exploring an indeterminate number of values per cell, which would make it much less efficient.

This simplicity also allows tables to be implemented using record- or field-oriented data structures. These provide the necessary efficiency for structuring data within the relational model designed for this type of data. This model is a database "paradigm" that, when used with a query language such as SQL, lets us store and process most structured data, which is why it’s so important.

Keep in mind, though, that its status as a "general" paradigm that addresses almost any problem involving structured data introduces certain limitations:

### 1. Scalability

Most relational or structured database implementations use a monolithic architecture. This means the database runs on a single machine and can only be scaled **vertically** by allocating more resources to the machine.

Fortunately, distributed implementations use networks of multiple machines to run the database. This approach allows for **horizontal** scaling by adding more machines to the distributed system, providing greater scalability. Such scalability is critical for products like social networks, ensuring system availability.

### 2. Schema Flexibility

With such a rigid schema, if we need to store unstructured data (like JSON or image data), this requires transformation or an alternative to structured databases, such as **NoSQL** databases. We’ll discuss this more later. These databases allow greater flexibility in data schemas and support heterogeneous data.

### 3. Complex Data Types

In addition to having a flexible schema, the type of data we are dealing with may be complex, making querying insufficient. Operations on structured data are usually designed for simple data that will often be queried. But when storing images, graphs, or other complex entities, we may need to perform complex operations on them.

For example, we could need to perform object detection in images or calculate neighborhood and centrality metrics in graphs. This leads to the development of specific database models (which we’ll cover later) that support these operations and the storage of such data, which is usually kept in [<VPIcon icon="fa-brands fa-firefox"/>BLOBs](https://developer.mozilla.org/en-US/docs/Web/API/Blob).

### 4. Data Volume (Big Data)

As previously mentioned, the data volume has an impact on almost every database model, since storing a large amount of data slows down processes. But **Warehousing** and **Data Lake** models can mitigate this effect by leveraging their ability to scale horizontally and accelerate computation to process massive amounts of data faster. This is achieved through techniques like [<VPIcon icon="fa-brands fa-aws"/>data pipelines](https://aws.amazon.com/what-is/data-pipeline/?nc1=h_ls) or [<VPIcon icon="iconfont icon-ibm"/>cluster computing](https://ibm.com/think/topics/cluster-computing) (similar to [<VPIcon icon="fa-brands fa-aws"/>distributed computing](https://aws.amazon.com/what-is/distributed-computing/)).

### 5. Real-Time Requirements

Finally, databases are expected to have low [<VPIcon icon="fa-brands fa-aws"/>latency](https://aws.amazon.com/what-is/latency/?nc1=h_ls) when performing operations, since the speed at which users are served is often determined by the latency of these operations. Also, as the number of users is usually large, the database must support concurrency.

But the persistent storage operations conducted during these processes - plus the mutual exclusion locks that ensure [<VPIcon icon="fas fa-globe"/>concurrency](https://geeksforgeeks.org/dbms/concurrency-control-in-dbms/) (and compliance with ACID principles) - slow down data processing. As a result, [<VPIcon icon="fa-brands fa-aws"/>in-memory database](https://aws.amazon.com/nosql/in-memory/) implementations are frequently preferred to mitigate this issue. In addition to saving data in persistent storage, these implementations use **RAM memory** as a cache to store some of the data and respond to queries more quickly, achieving a close-to-real-time latency.

So despite being the simplest and most effective at modeling everyday problems, structured databases have certain disadvantages. These have led to the development of alternative database models and approaches. Each of these models attempts to address a specific issue with structured databases, providing support for more complex data and more technically challenging requirements.

---

## Big Data

Before examining specific database models, we should consider a problem that affects all of them: the volume of data. When we have a problem with a sufficient amount of data, the term "[<VPIcon icon="iconfont icon-gcp"/>Big Data](https://cloud.google.com/learn/what-is-big-data?hl=en)" is typically applied. It’s not a model or set of models, but rather a concept referring to massive, complex data sets.

And given how much data is currently produced every day, it’s more and more common to encounter problems where massive volume becomes a limitation.

In a Big Data project, we can divide its lifecycle into several stages.

1. First, data is captured from multiple sources and integrated into common formats.
2. Then, it’s [<VPIcon icon="fa-brands fa-aws"/>cleaned](https://aws.amazon.com/what-is/data-cleansing/?nc1=h_ls) to ensure correct integration and, when necessary, manually annotated or tagged to feed machine learning models.
3. The data is then stored in scalable infrastructures or directly in databases, ensuring availability and fast access.

These "[<VPIcon icon="fa-brands fa-wikipedia-w"/>preprocessing](https://en.wikipedia.org/wiki/Data_preprocessing)" tasks can account for a significant portion of the work needed before the data is ready for use.

Once processed, we primarily use data to create knowledge models so we can understand the nature of the data. This also lets us generate predictions and informed decisions in professional environments. This process is usually referred to as business intelligence or data-driven decision-making.

These business intelligence processes can also assist with other tasks, such as statistical analysis and visualization. Some of these tasks, including [<VPIcon icon="iconfont icon-ibm"/>visualization](https://ibm.com/think/topics/data-visualization) and statistical analysis, are considered part of the big data ecosystem and are fundamental to data processing. They go along with previous tasks like the management of databases and information systems. So it’s essential to correctly define from the start **what data** is needed for a project, **how** it will be processed, and **what results** are expected.

### What Constitutes “Big Data”?

It’s worth noting that, for a project to be considered Big Data, there are no strict conditions for determining whether it belongs to this category. Still, there are a number of factors that contribute to this designation:

The first is volume. As we’ve already discussed, the volume of data refers to the amount of data generated and stored within a given project. The more data that’s generated and stored, the more likely the project is to be categorized as Big Data. Still, there is no specific amount that defines this distinction, as it also depends on other factors, including the availability and complexity of the data.

The next is velocity. This is the rate at which data is generated and must be processed. For example, in a project consisting of a social network or an IoT device network, data may be generated at a very high velocity - that is, a large amount of data per unit of time. This data must be processed as quickly as possible. This means that the faster the data is generated, the more likely it is to be considered part of the Big Data ecosystem.

The last main factor is variety, also called data heterogeneity. This means the more heterogeneous the data, the more difficult it is to process. This requires greater computing power, which makes the project more likely to be considered Big Data.

For instance, integrating data from sources that use the same formats is easier than integrating data from those that use different ones.

Heterogeneity is affected not only by the formats, but also by how they are encoded, transmitted, and so on. We also need to consider the level of data structuring because unstructured or unlabeled data likely requires machine learning techniques (such as [**clustering**](/freecodecamp.org/8-clustering-algorithms-in-machine-learning-that-all-data-scientists-should-know.md)) to extract information from it.

These are the main factors, although more have been added over time thanks to technological advances in these processes. Among them are:

- **Veracity**: Degree of reliability of the information received in terms of data quality and accuracy, in order to avoid decisions based on incorrect or biased information.
- **Viability:** The degree to which the data can be effectively used in the project, as sometimes their volume or other factors make their processing technically unfeasible.
- **Visualization:** It's the ease with which data can be transformed into understandable dashboards for users, allowing them to explore it intuitively.
- **Value:** The expected value to be obtained from processing the data. Generally, it's economic value, although it doesn't need to be economic - it mainly depends on the application domain.
- **Viscosity:** This is the significance that data have in decision-making. Not the value added by their processing, but the relevance they have when making a decision.

In summary, although volume is one of the key factors determining whether a problem or project is considered Big Data, it’s not the only one. The speed at which data is generated and the heterogeneity of the data require a large amount of computation to process it, which is the primary issue that led to the concept of Big Data.

---

## NoSQL Databases

The first model or database approach we’ll examine is [<VPIcon icon="iconfont icon-gcp"/>NoSQL](https://cloud.google.com/discover/what-is-nosql?hl=en). Its name indicates that these databases aren’t only structured, but also that the data can vary in structure.

The main characteristic of this database approach is its **flexibility** in storing data - it doesn’t force data to adhere to a fixed schema, such as a tabular one. They also focus on offering easy **horizontal scalability**, which allows the computational capacity of the database to be expanded by increasing the number of machines. This makes them efficient at processing complex, large-volume data and thus supporting Big Data problems.

To understand what they entail in practice, we could consider a use case involving a database for a bicycle rental system, that lets users rent bicycles through a subscription.

To implement this system, we can choose from a wide variety of databases or information systems. For example, in a **relational database**, the information is organized in tables, whereas **NoSQL** databases use different types of structures to organize the data. Each structure yields a specific type of NoSQL database.

Without delving into the specifics of the use case, we can see that using a relational database for such a project may pose challenges in the following areas:

- **Volume:** If the system is deployed nationally or on a continental scale, a large number of users will perform transactions in our system, either by using or returning bicycles or by contracting or canceling their subscription to the service. Above all, scaling a relational database has the greatest impact on the system. To manage such a large number of users, the system requires powerful computing capacity to match to needs. This means that the database must be able to scale horizontally to reach optimal capacity. In relational databases, vertical scaling is usually applied, but it becomes costly to add more computing capabilities beyond a certain threshold.
- **Velocity:** The system must respond quickly to user requests, such as displaying available bikes within a certain area or managing subscriptions. If the system uses a relational database, ensuring concurrency is computationally expensive, which causes high latency when many users query or modify the same information simultaneously.
- **Rigid schema:** In a relational database, the schema does not frequently change. So if our system requires regular updates (like updates to bike models, the addition of new bike sensors, or significant modifications to the subscription service, especially the addition of functionalities or new features), these changes will require updating the database schema by adding or removing columns. This process is costly and complicated once the system is in production and its tables contain a large amount of data.
- **Temporal Analysis:** Since structured databases are composed of tables, as we will learn later, if we need to perform a time series analysis or analyze data spanning a long period of time with a large number of records throughout that period, the database's response latency will be high. For example, consider calculating metrics on bike usage over the last 10 years, during which time there may have been a massive number of transactions between users and bicycles. These types of queries are often called analytical queries.

NoSQL databases offer different solutions to these problems, depending on how the data needs to be structured. So for each of these ways of organizing and storing data, there is a certain type of NoSQL database with a series of advantages and disadvantages depending on the nature of the project and the data involved. Let’s look at them now.

### Key-Value model

The simplest option is to store all the data in a dictionary of [<VPIcon icon="iconfont icon-mongodb"/>key-value pairs](https://mongodb.com/resources/basics/databases/key-value-database), where each key is a unique identifier that acts as a tag linked to a single value. The type of content of each value depends on how we need to organize the data.

Here, we use the term "[<VPIcon icon="fas fa-globe"/>dictionary](https://en.wikibooks.org/wiki/A-level_Computing/AQA/Paper_1/Fundamentals_of_data_structures/Dictionaries)" to refer to the data structure used in languages such as Python and Java, as well as in languages where the dictionary structure is the only method of representing information, such as in JSON. In our use case, if we want to store user information, each user could be represented as a dictionary with the following [<VPIcon icon="fa-brands fa-aws"/>key-value](https://aws.amazon.com/nosql/key-value/) pairs:

```json
{
  "id": 27,
  "name": "Juan",
  "email": "juan@juan.com",
  "birth": "1984-01-05"
}
```

As you can see, keys serve as names that identify the value we are storing in a given pair. In this case, the key is the user's name, although we can also save binary content or a Boolean value as the key.

Among this model's characteristics are:

- its simplicity, which enables humans to easily understand it
- its low latency, which benefits from data structures such as hash tables with very low access times, and
- its ease of distribution on several machines, since a dictionary can be seamlessly partitioned by its keys. In practice, [<VPIcon icon="iconfont icon-redis"/>Redis](https://redis.io/) is the most common DBMS used for this kind of database.

### Document model

In this model, the information management unit is not a key-value pair, but rather a set of them, known as a "document.

The main difference from the previous **key-value** model is that the values are no longer "opaque." Here, a document holds its information in a nested, hierarchical structure. This means that a value might be a dictionary containing key-value pairs, some of which can also be dictionaries. Thus, a hierarchy is established within the stored information, rather than allowing the values to be of any kind as in the key-value model.

Some characteristics of the document model are its **flexible schema** and the **hierarchical storage** of heterogeneous data. For example, in our use case, we can store bike information as follows:

```json
bike1 = {
  "id": 1,
  "model": "model1",
  "status": "available"
}

bike2 = {
  "id": 2,
  "model": "model2",
  "status": "in_use",
  "sensors": {
    "cadence": 85,
    "speed": 24.5
  }
}

bike3 = {
  "id": 3,
  "model": "model3",
  "status": "maintenance",
  "sensors": {
    "gps": {
      "latitude": 40.4168,
      "longitude": -3.7038
    },
    "camera": "front_hd"
  },
  "acquisitionDate": "2024-11-15"
}
```

Here, you can see that all the dictionaries represent bikes. But some contain more fields than others depending on the information that the specific bike model yields. This prevents the need for several tables to be created for each model or type of bike. You can also see that some fields have a dictionary as a value, which hierarchizes the data. Also, not all fields need to be structured equally since the model allows for some **heterogeneity** in this regard.

Finally, it’s important to emphasize that, in this model, the documents are self-descriptive, as the names of the keys or tags identify the stored information. [<VPIcon icon="iconfont icon-mongodb"/>MongoDB](https://mongodb.com/) is one of the main DBMSs for implementing this model.

### Column-oriented model

This model is similar to the **structured** model (the one used in relational databases) where information is stored in tables - but instead of each data point being kept in a row, it’s stored in a [<VPIcon icon="fas fa-globe"/>column](https://geeksforgeeks.org/dbms/columnar-data-model-of-nosql/). For example, in our use case, we could have:

| **Attribute** | bike1 | bike2 | bike3 |
| --- | --- | --- | --- |
| **model** | model1 | model2 | model3 |
| **status** | available | in_use | maintenance |
| **sensor_cadence** | - | 85 | - |
| **sensor_speed** | - | 24.5 | - |

In this type of database, the points are still rows in a table. But the items that the management system considers to compose the table aren’t the rows, but the columns.

In a relational database, a set of rows composes a table, where each row is a data point holding values taken for certain attributes, which are the columns. Similarly, in the [<VPIcon icon="fa-brands fa-wikipedia-w"/>column-oriented model](https://en.wikipedia.org/wiki/Data_orientation), the management system treats a column as a "data point" on which operations are performed.

As illustrated above, a table from the relational model is transposed so that each column becomes a bicycle instead of an attribute. In the column-oriented model, each data point is a column, allowing analytical queries to be executed quickly since all the values of a column are considered a single "data point," which significantly speeds up **aggregation** operations.

Furthermore, better data compression is generally achieved since all the data in a column is of the same type. Simple horizontal scalability is also possible through techniques such as column sharding. One of the most popular DBMS for this model is [<VPIcon icon="iconfont icon-hadoop"/>Hadoop](https://hadoop.apache.org/).

### Graph model

Alternatively, there is the [<VPIcon icon="fa-brands fa-aws"/>graph model](https://aws.amazon.com/nosql/graph/), which relies on [<VPIcon icon="fas fa-globe"/>graphs](https://w3schools.com/dsa/dsa_theory_graphs.php) as fundamental data structures for storing information and relationships between data.

In our use case, for instance, each node can represent entities ranging from people to bicycles, connected by edges representing relationships between them, such as subscriptions or rentals. Both nodes and edges can contain attributes, allowing us to further organize the information.

This model is characterized by its support for analysis and big data projects since problems that tend to be modeled with graphs often involve large volumes of information, such as social networks. Also, graphs as data structures allow for the modeling of complex information and relationships. [<VPIcon icon="iconfont icon-neo4j"/>Neo4j](https://neo4j.com/) is a popular option here, but there’s a variety of other DBMSs oriented toward specific uses within this model.

---

## Data Warehousing

Apart from the different options offered by the NoSQL model, you may have other needs that require different types of models. NoSQL is currently focused primarily on efficient data storage and querying. It’s especially useful in projects where data generation is the bottleneck - that is, a system that specializes in storing data is needed.

Conversely, other projects, especially those related to organizations, require a system that not only stores data efficiently but also manages the difficulty of extracting strategic information, as data lacks value on its own. The [<VPIcon icon="fas fa-globe"/>Warehousing model](https://geeksforgeeks.org/dbms/data-warehousing/) offers support for the centralization, organization, and subsequent transformation of data into knowledge that guides decision-making.

### What is a Data Warehouse?

A [<VPIcon icon="iconfont icon-gcp"/>Data Warehouse](https://cloud.google.com/learn/what-is-a-data-warehouse?hl=en) is essentially a specialized database for centrally storing large volumes of data from multiple sources. Besides storing all the data in "a single system" in a centralized way, its main purpose involves optimizing analytical queries on the data and generating dashboards or reports from the analysis itself. This is all aimed at supporting the efficient analysis and storage of the data.

By "[<VPIcon icon="fas fa-globe"/>analytical queries](https://docs.vertica.com/23.4.x/en/data-analysis/sql-analytics/analytic-query-examples/)", I mean queries that require information over a certain period of time (or a different dimension) to calculate a metric on the data, such as the average magnitude over a 10-year period.

Returning to the previous example of the bicycle rental system, the Warehousing model provides advantages in terms of efficiency in storing users' bicycles and transactions, such as rentals or subscriptions. It also supports complex analytical queries on the data that contribute to strategic decision-making regarding the system. Such queries aim to predict demand and revenue, detect which parking areas are used more or less frequently, and so on.

### Main Features of Data Warehouses

Now let’s look at some of the main features of a Data Warehouse so you undertstand how they work.

### They’re Integrated

A data warehouse is typically a database that stores information from various sources. It integrates this information using transformations and processes that address the heterogeneity of the data, adapting it to the warehouse's common schema.

In our example, data can stem from various systems, including GPS positioning of bicycles, parking occupancy sensors, payment and subscription systems, and mobile applications. The warehouse then integrates all of this data, standardizing it into a common format to make its collective analysis easier. Note that these **sources** can vary greatly in nature, with some being structured and others not.

### They Have a Historical Dimension

Over time, the Warehouse accumulates information from different sources to enable analytical queries. In our example, this would correspond to analyzing the data itself, such as examining user and bicycle behavior and usage, analyzing demand or revenue, among other possibilities.

### They’re Optimization for Reading

Given the objectives we want to achieve with a warehouse, it’s optimized primarily for queries that only access data without modifying it, which is precisely what analytical queries require.

In our example, it would not be very efficient to implement the entire information system in a warehouse because of the need to optimize write operations. One possible solution would be to use the warehouse only to store data reserved for analysis, while providing the actual service to users with a more suitable system.

In other words, even if we use a different database to implement the bike rental service, we can also have a warehouse into which we periodically insert information that needs to be analyzed.

### Different Data Warehousing Schemas

In addition to these characteristics, a data warehouse is primarily a database consisting of tables. So, if the data is highly complex or has too many dimensions, we can organize it into different data models.

### 1. Star Schema

<SiteInfo
  name="Star schema - Wikipedia"
  desc="In computing, the star schema or star model is the simplest style of data mart schema and is the approach most widely used to develop data warehouses and dimensional data m..."
  url="https://en.wikipedia.org/wiki/Star_schema/"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Star-schema.png/960px-Star-schema.png"/>

Here, the data or measurements are mainly stored in a central table called the fact table, which is related to other tables representing possible dimensions for analyzing the data in the fact table. The main feature of this model is that the dimensional tables aren’t usually subdivided into more specific dimensions, as the goal here is to find a simple way to store data to speed up analytical queries as much as possible.

In our example, if you only need to build dashboards for usage, billing, or similar purposes, prioritizing query speed, you could opt for a star schema with a large rentals table containing fields like user, bike, origin/destination station, date, and cost, and surrounding tables for each of those entities that can be considered "*dimensions*" when analyzing that data.

![Show an example of a Star schema, with a central fact table connected to several dimension tables around it.](https://upload.wikimedia.org/wikipedia/commons/b/bb/Star-schema.png)

### 2. Snowflake schema

Unlike the star data model, with a snowflake schema each surrounding table can be further subdivided into specific sub-dimensions, meaning smaller tables related to each other. This often saves space and improves data quality by reducing redundancy, as there are specific tables storing specific information and relating it to the rest of the tables, avoiding the duplication of information in too many tables. This streamlines the management of larger, more complex data sets.

<SiteInfo
  name="Snowflake schema - Wikipedia"
  desc="In computing, a snowflake schema or snowflake model is a logical arrangement of tables in a multidimensional database such that the entity relationship diagram resembles a snowflake shape. The snowflake schema is represented by centralized fact tables which are connected to multiple dimensions."
  url="https://en.wikipedia.org/wiki/Snowflake_schema/"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Snowflake-schema.png/960px-Snowflake-schema.png"/>

![An example of a Snowflake schema, with a central fact table connected to several dimension tables subdivided into more dimensions around it.](https://upload.wikimedia.org/wikipedia/commons/b/b2/Snowflake-schema.png)

### ETL (Extraction, Transformation, and Load)

As you’ve now learned, a Data Warehouse is populated with data from multiple sources, all potentially different in nature. So Data Warehouses need to have a component responsible for extracting data from the sources, processing it, and inserting it into the data warehouse. This component is the [<VPIcon icon="iconfont icon-gcp"/>ETL](https://cloud.google.com/learn/what-is-etl?hl=en), which is a specific software piece for each data source that handles:

- **Extraction:** Obtains data from the source in the provided format.
- **Transformation:** It applies a series of transformations to clean them, eliminate heterogeneity, and adapt them to the schema defined in our Warehouse. The complexity and detail of these transformations mainly depend on the problem being addressed, even leading to the derivation or prediction of new data from existing records.
- **Load:** It inserts them into the Warehouse.

ETL processes are typically run periodically to populate the Data Warehouse or update the data within it.

![Diagram of an ETL process. It extracts data from sources, transforms it, and loads it into an information system.](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Extract%2C_Transform%2C_Load_Data_Flow_Diagram.svg/1280px-Extract%2C_Transform%2C_Load_Data_Flow_Diagram.svg.png)

### OLAP

As you’ve already seen, Data Warehousing is designed to support analytical queries, commonly known as [<VPIcon icon="fa-brands fa-aws"/>OLAP (Online Analytical Processing)](https://aws.amazon.com/what-is/olap/). Unlike [<VPIcon icon="iconfont icon-oracle"/>OLTP (Online Transactional Processing)](https://oracle.com/database/what-is-oltp/), which focuses on reading or modifying records individually, OLAP allows for analyzing data across various dimensions to discover trends or patterns that support strategic decision-making.

To understand this, it's very common to think about queries on the time dimension, which is the easiest to see, such as calculating an average over data from a time period or any similar metric.

More specifically, in an [<VPIcon icon="fas fa-globe"/>OLAP environment](https://geeksforgeeks.org/dbms/olap-operations-in-dbms/), data is organized into multidimensional **cubes**, where each dimension represents a perspective of analysis like time, product, region, and so on, and the data or **measures** are the quantitative values that are **aggregated** according to the dimensions we are interested in.

Some basic navigation and aggregation [<VPIcon icon="iconfont icon-ibm"/>operations](https://ibm.com/think/topics/olap) are defined on these cubes:

- **Drill-Down:** It involves moving from a high level of aggregation to a more detailed one. For example, after reviewing the total quarterly bike rentals, we apply drill-down to see those that occurred by month, and from there by day or even by parking spot, allowing us to quickly detect usage variations in specific periods.
- **Roll-Up:** This is the opposite operation to drill-down: it groups data into higher levels of detail. Starting from daily rentals, with a roll-up, we can obtain monthly rentals, by region, or the annual total, helping summarize large volumes of data and provide an overall view of the modeled domain.
- **Slice:** Here, a subset of data is selected by setting a value in one dimension. For example, a "slice" in the bike rental cube by setting the dimension **"region = Spain"** will show all bike rentals that have occurred in Spain, while keeping other dimensions like time or other services (service subscription) fixed.
- **Dice:** Similar to slicing, a **"filter"** is applied to the cube across multiple dimensions simultaneously. For example, querying bike rentals in a specific geographic region and during a certain time period. The main difference is that a range is defined in several dimensions at once, creating a sub-cube with more specific results.
- [<VPIcon icon="fas fa-globe"/>Pivot](https://numberanalytics.com/blog/mastering-data-pivoting-data-warehousing): This involves rearranging the dimensions of the cube to change the analysis perspective without altering the data. For example, swapping rows and columns in a report to view regions in columns and periods in rows, making it easier to compare different dimensions and discover correlations between them.

---

## Data Lakes

In addition to the Warehousing model, we have [<VPIcon icon="iconfont icon-gcp"/>Data Lakes](https://cloud.google.com/learn/what-is-a-data-lake?hl=en), which are like Warehouses where data is not stored following a common schema but is kept as it stems from its respective sources. That is, to populate a Warehouse with data, ETL components are needed to transform and adapt it to a **schema**. But with a data lake, such components do not exist because there is no schema that the data must follow - instead, it’s simply stored in its original format and structure.

The main reason for this is that a Data Lake aims to analyze the data, while a Warehouse aims to integrate the data through transformations to turn it into knowledge that supports high-level [<VPIcon icon="fas fa-globe"/>business decision analysis](https://revealbi.io/blog/data-warehousing).

Normally, data is stored in its raw form in a data lake without any processing, although it can be organized according to the project's needs. This implies that the associated costs are generally lower than those of a Warehouse, as it saves all the computation resources related to its transformation, which can sometimes be complex and computationally expensive.

Since Data Lakes focus on **storing** data rather than **integrating** it, they are suitable for **machine learning tasks** and [<VPIcon icon="iconfont icon-ibm"/>exploratory analysis](https://ibm.com/think/topics/exploratory-data-analysis). It's easy to apply algorithms to find patterns in raw data. But don't confuse non-integrated data with unlabeled data. [**Labeled data**](/freecodecamp.org/supervised-vs-unsupervised-learning.md) can be stored in a Data Lake and used to train supervised machine learning models. It all depends on the project's needs and the level of abstraction you want to work with.

---

## Semantic Web

In addition to the previous database models, there are other types of technologies and tools that can organize data and its semantics. One of these technologies is the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web), which arises from the need to provide meaning to the terms used on the traditional web.

For example, in an HTML document, the word "user1" might appear, which by itself is just data without any meaning. So to integrate semantics, the Semantic Web is used as a "layer" of software that associates meaning to the terms that appear on the web.

While a simple HTML document serves to structure a series of data at the **layout** level, the Semantic Web provides meaning, usually through tags or annotations, so they can be interpreted by both humans and machines. In this way, the data "user1" can be associated with a tag like "name”, indicating that the data is a username.

This technology is based on a series of components:

- **RDF (Resource Description Framework):** A [<VPIcon icon="fa-brands fa-wikipedia-w"/>standard](https://en.wikipedia.org/wiki/Resource_Description_Framework) where information is represented through [<VPIcon icon="fa-brands fa-stack-overflow"/>Subject - Predicate - Object](https://stackoverflow.com/questions/273218/whats-a-rdf-triple) triples, where the subject is usually a resource or entity within the domain, the predicate is an attribute or relationship that the entity has with a value, which is the object of the triple. This way of representing information is easily understandable by people and easily processed by machines, being independent of the language used to manage the triples (such as **XML** or **Turtle**).

```xml
<http://example.org/users/user1> domain:name "Juan"
```

- **Vocabularies:** A set of terms used to describe data in a specific domain. We can see this as a language or dictionary of concepts with their associated meanings, all belonging to a common domain. More specifically, it can have meanings associated with classes (sets of entities), properties of those entities, or relationships between them.

::: tip Example

<SiteInfo
  name="Dublin Core - Wikipedia"
  desc="The Dublin Core vocabulary, also known as the Dublin Core Metadata Terms (DCMT), is a general purpose metadata vocabulary for describing resources of any type. It was first developed for describing web content in the early days of the World Wide Web."
  url="https://en.wikipedia.org/wiki/Dublin_Core/"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/DCMI-logo.svg/640px-DCMI-logo.svg.png"/>

:::

- **Ontologies:** A formal conceptualization of a domain, where the meanings of the entities within it are defined, along with their properties, relationships with other entities, hierarchies they form among themselves, and their constraints. In summary, they provide richer semantics than vocabularies due to the complexity with which they can model semantics.

::: tip Example

```component VPCard
{
  "title": "The Music Ontology - Getting started",
  "desc": "Below are a few typical examples of using the Music Ontology, in three different syntaxes: RDFa in HTML for embedding music-related data on a web page, and JSON-LD and Turtle for exposing music-related data as part of an API.",
  "link": "http://musicontology.com/docs/getting-started.html/",
  "logo": "",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

In relation to the web, there are multiple ways we can store our data, whether on our own [<VPIcon icon="fas fa-globe"/>infrastructure](https://hpe.com/emea_europe/en/what-is/on-premises-vs-cloud.html) or someone else's. On one hand, we can choose to have a complete infrastructure of our own where all data is handled locally **(on-premise)**, which offers advantages like having full control over it or faster access. But this also has drawbacks such as high costs since we have to maintain the entire infrastructure ourselves, ensure good scalability, and minimize the risk of failures that could reduce service availability.

On the other hand, you can choose to use someone else's infrastructure, usually by renting it. Here, the data is in the **cloud**, which provides greater scalability, reduced costs since you only pay for the infrastructure you use, broad geographic access with services like GCP or AWS, and backup services that minimize the risk of data loss, which would be potentially very expensive to achieve using local infrastructure.

Still, this approach also has drawbacks, such as the dependency on an internet connection to use the infrastructure as a service, or security and privacy issues since the data is in a place we don't know well.

Finally, keep in mind that these two types of solutions aren’t mutually exclusive. You can use them simultaneously in [<VPIcon icon="fas fa-globe"/>hybrid solutions](https://shakudo.io/blog/cloud-vs-on-premise-vs-hybrid) where the most sensitive or valuable data is kept locally and the rest on external infrastructure, although this strongly depends on the project's requirements.
