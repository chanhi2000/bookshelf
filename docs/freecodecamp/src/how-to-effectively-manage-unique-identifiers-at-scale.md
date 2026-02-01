---
lang: en-US
title: "How to Effectively Manage Unique Identifiers at Scale: From GUIDs to Snowflake IDs and Other Modern Solutions"
description: "Article(s) > How to Effectively Manage Unique Identifiers at Scale: From GUIDs to Snowflake IDs and Other Modern Solutions"
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - C#
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - design
  - system
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Effectively Manage Unique Identifiers at Scale: From GUIDs to Snowflake IDs and Other Modern Solutions"
    - property: og:description
      content: "How to Effectively Manage Unique Identifiers at Scale: From GUIDs to Snowflake IDs and Other Modern Solutions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-effectively-manage-unique-identifiers-at-scale.html
prev: /academics/system-design/articles/README.md
date: 2024-08-21
isOriginal: false
author:
  - name: Gor Grigoryan
    url : https://freecodecamp.org/news/author/gor8808/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724012658962/2e754dc4-248a-4a2b-8819-993514474a22.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Effectively Manage Unique Identifiers at Scale: From GUIDs to Snowflake IDs and Other Modern Solutions"
  desc="What Are Unique Identifiers? 🪪 Unique identifiers (UIDs) are crucial components in software engineering and data management. They serve as distinct references for entities within a system and ensure that each item – whether a database record, a user..."
  url="https://freecodecamp.org/news/how-to-effectively-manage-unique-identifiers-at-scale"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1724012658962/2e754dc4-248a-4a2b-8819-993514474a22.jpeg"/>

---

## What Are Unique Identifiers? 🪪

Unique identifiers (UIDs) are crucial components in software engineering and data management. They serve as distinct references for entities within a system and ensure that each item – whether a database record, a user, or a file – can be uniquely identified and accessed.

UIDs are critical for maintaining data, enabling efficient search and retrieval, and supporting large-scale operations in distributed systems. As data volumes and system complexities grow, the need for scalable UID solutions becomes increasingly important.

In this article, you'll learn all about the history of unique identifiers, as well as how some modern solutions work.

---

## The Historical Context of Identifiers

The concept of unique identifiers has enveloped significantly over time, reflecting the growing complexity and scale of human societies and technological systems. To understand why unique identifiers are so important today, let’s look at how we've historically managed identification and how it was developed.

In early human societies, individuals were often identified by a **single name**. This was usually sufficient in small communities where everyone knew each other personally. But as populations grew, it became necessary to distinguish between individuals who shared the same first name. This led to the adoption of **surnames**.

For example, in Armenia 🇦🇲, surnames are used to identify individuals by their family or ancestry. Take the example of a person named Gor. In a small group of up to 50 people, let's say, identifying Gor by his first name alone is easy.

But as the group grows to a larger community of, say, 500 people, additional identifiers become necessary. Gor will be identified as Gor Grigoryan, indicating that he belongs to the Grigoryan family/ancestry. This surname provides a clearer identification and connects Gor to his family's lineage.

As societies continued to expand and bureaucratic systems became more complex, even surnames proved not enough for uniquely identifying individuals. This was especially true in larger cities and for the administration of government services. The need for more robust identification methods became apparent.

---

## Government Management of Unique Identifiers

The introduction of passports in the early 20th century marked a significant step in this direction. Passports included unique personal identifiers, such as passport numbers, to distinguish between individuals clearly. These unique IDs ensured that each person could be accurately identified, regardless of name similarities or other ambiguities.

Several countries pioneered the use of unique personal identification numbers to address this need:

- **Germany** 🇩🇪: In the 19th century, Germany implemented a system for tracking individuals for social welfare and military conscription purposes.
- **Sweden** 🇸🇪: Sweden began issuing personal identification numbers (Personnummer) in the 1940s, providing each citizen with a unique identifier for use in various administrative processes.
- **France** 🇫🇷: France introduced the National Identification Number (Numéro de Sécurité Sociale) in the mid-20th century to streamline social security administration and other government services.
- **United States** 🇺🇸: The USA followed with the introduction of Social Security Numbers (SSNs) in 1936 as part of the Social Security Act. This approach to unique identification has since been adopted worldwide, with countries issuing national identification numbers to their citizens.

![Information page, Edwin James Tharp’s passport, March 27, 1936, [<VPIcon icon="fas fa-globe"/>Robert and Eva Tharp Collection](https://library.csun.edu/SCA/Peek-in-the-Stacks/identities).](https://freecodecamp.org/news/content/images/2024/07/image-49.png)

As illustrated in the example image, the 1936 UK 🇬🇧 passport included detailed personal information such as eye color, hair color, profession, height, and information about the holder’s spouse and children.

---

## Structure of Social Security Numbers

A Social Security Number (SSN) in the United States is a nine-digit number formatted as "AAA-GG-SSSS". Each part of the SSN has historically carried specific information:

1. **Area Number (AAA)**: Originally, the first three digits, known as the area number, represented the geographical region where the SSN was issued. This regional assignment helped to ensure a systematic distribution of numbers across the country.
2. **Group Number (GG)**: The middle two digits, called the group number, were used to organize the numbers within a given area. The group numbers ranged from 01 to 99 and were issued in a specific order to prevent duplicate numbers within the same area.
3. **Serial Number (SSSS)**: The last four digits are the serial number, which sequentially identifies each individual within a group. This part of the SSN ensures that even if the area and group numbers are the same, the overall SSN remains unique.

The Social Security Administration (SSA) has implemented several measures to ensure that each SSN is unique for the entire USA population (**341.9 million people).**

Governments around the world manage unique identifiers primarily for administrative purposes, such as social security, taxation, and national identification. These systems are designed to handle large populations and ensure that every citizen has a unique identifier for official records.

For example, the United States 🇺🇸 Social Security Administration (SSA) manages Social Security Numbers (SSNs) for over 330 million people. Similarly, the Indian 🇮🇳 government has issued Aadhaar numbers, a 12-digit unique identifier, to over **1.3 billion citizens**. These identifiers are crucial for accessing government services, benefits, and other official processes.

![[<VPIcon icon="fa-brands fa-wikipedia-w"/>Aadhaar is the world's largest biometric ID system](https://en.wikipedia.org/wiki/Aadhaar) described as "the most sophisticated ID program in the world".](https://freecodecamp.org/news/content/images/2024/07/image-52.png)

---

## Scalability in Government Systems

While government systems are large, they generally do not face the same scalability challenges as tech companies. Government databases are often centralized, and the rate at which new identifiers are issued is relatively steady and predictable. Also, the frequency of updates and interactions with these identifiers is lower compared to the dynamic environment of tech companies.

Tech companies, especially social media giants, operate on an entirely different scale. These companies manage billions of users and generate vast amounts of data daily. For instance, Meta (formerly Facebook) has over 3 billion monthly active users across its platforms, including Facebook, Instagram, and WhatsApp.

---

## Tech Companies and Their Scale

Let's take a few examples:

### Meta (Facebook)

1. **User Base**: With over **3 billion monthly active users**, Meta needs a robust system to ensure that each user is uniquely identified.
2. **Posts and Interactions**: Facebook alone sees approximately **350 million new posts daily**. Each of these posts, along with comments, likes, and shares require a unique identifier to manage interactions efficiently.
3. **Messages**: WhatsApp users send around **100 billion messages every day**, each needing a unique identifier to ensure messages are correctly routed and stored.
4. **Unique Data Rows**: With the combination of user profiles, posts, comments, likes, and messages, Meta likely manages over **10+ trillion unique data rows**. (If the global population is approximately 8 billion people, then 10 trillion people would be about **1,250** times the current global population).

### X (Twitter)

Twitter, another social media giant, has about **450 million monthly active users**. On average, users send around **500 million tweets per day**. Each tweet, reply, and retweet needs a unique identifier to maintain the platform's integrity and usability.

### Telegram

Telegram is known for its high-traffic and robust messaging platform. With over **700 million monthly active users**, Telegram experiences particularly high traffic spikes during events like New Year's Eve, where users send billions of messages within a short timeframe.

On a typical day, Telegram handles over **70 billion messages**. Each message, channel post, and group interaction requires a unique identifier to ensure proper delivery and organization.

The scale at which tech companies operate requires sophisticated and highly scalable unique identifier systems. These systems must handle high concurrency, support distributed architectures, and ensure low latency.

---

## The Role of Auto-increment IDs and Their Scalability Issues

Auto-increment IDs are a common method for generating unique identifiers in relational databases. When a new record is added to a table, the database automatically assigns the next available integer value to the ID field. This method is straightforward and ensures that each record within a table has a unique identifier without requiring any manual intervention.

Consider a table for storing user information in a relational database. When the first user is added, they might be assigned an ID of 1. The second user would receive an ID of 2, and so on.

While auto-increment IDs are simple and effective for small-scale applications, they face significant challenges in larger, distributed systems.

1. **Concurrency Issues**: In high-traffic applications, multiple transactions might attempt to insert records simultaneously. Ensuring that each transaction receives a unique auto-increment ID can lead to performance bottlenecks and require complex locking mechanisms.
2. **Distributed Systems**: In distributed databases, where data is spread across multiple servers, maintaining a global sequence for auto-increment IDs becomes problematic. Each server would need to coordinate with others to avoid generating duplicate IDs, which can significantly impact performance and reliability.
3. **Single Point of Failure**: Relying on a central authority to generate auto-increment IDs introduces a single point of failure. If the server responsible for assigning IDs goes down, the entire system might be unable to add new records.
4. **Predictability**: Auto-increment IDs are predictable. If someone knows the ID of one record, they can infer the IDs of subsequent records. This predictability can be a security concern in certain applications, such as those involving financial transactions or sensitive user data.

```sql
CREATE TABLE Admins (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

INSERT INTO Admins (Name)
VALUES ('GorGrigoryan'),
       ('GorGrigoryan2');

SELECT * FROM Admins;

--
-- +----+---------------+
-- | Id | Name          |
-- +----+---------------+
-- | 1  | GorGrigoryan  |
-- +----+---------------+
-- | 2  | GorGrigoryan2 |
-- +----+---------------+
```

---

## Sequence Numbers and Their Advantages Over Auto-increment IDs

Sequence numbers are a method of generating unique identifiers by maintaining a counter that is incremented with each new record. Unlike auto-increment IDs, which are typically limited to a single database instance, sequence numbers can be designed to work across distributed systems, addressing some of the scalability and concurrency issues associated with auto-increment IDs.

How sequence numbers work:

1. **Centralized Sequence Generators**: A central service or database table generates and manages the sequence numbers. Each request for a new identifier increments the counter and returns the next value.
2. **Distributed Sequence Generators**: In a distributed environment, sequence numbers can be generated by dividing the range of possible values among different nodes or using more complex algorithms to ensure uniqueness without central coordination.

Consider a distributed database system with multiple nodes, each responsible for generating unique sequence numbers. The system might allocate ranges of sequence numbers to each node, ensuring that they can generate identifiers independently:

- **Node 1**: Allocated sequence numbers 1,000,000 to 1,999,999
- **Node 2**: Allocated sequence numbers 2,000,000 to 2,999,999
- **Node 3**: Allocated sequence numbers 3,000,000 to 3,999,999

Each node can now generate up to one million unique identifiers without needing to communicate with a central server. This approach improves scalability and performance, particularly in environments with high write loads.

```sql :collapsed-lines
CREATE SEQUENCE UserIdentifier
INCREMENT 1
START 1;

CREATE TABLE Admins (
    Id INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE Users (
    Id INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);


INSERT INTO Admins (Id, Name)
VALUES(nextval('UserIdentifier'), 'GorGrigoryan'),
(nextval('UserIdentifier'), 'GorGrigoryan2');

INSERT INTO Users (Id, Name)
VALUES(nextval('UserIdentifier'), 'UserGorGrigoryan'),
(nextval('UserIdentifier'), 'UserGorGrigoryan2');


SELECT * FROM Admins;

-- +----+---------------+
-- | Id | Name          |
-- +----+---------------+
-- | 1  | GorGrigoryan  |
-- +----+---------------+
-- | 2  | GorGrigoryan2 |
-- +----+---------------+

SELECT * FROM Users;

-- +----+---------------+
-- | Id | Name          |
-- +----+---------------+
-- | 3  | GorGrigoryan  |
-- +----+---------------+
-- | 4  | GorGrigoryan2 |
-- +----+---------------+
```

Another advantage of using sequence numbers is that you can obtain the ID of the entity before it is inserted into the database.

In the case of auto-increment IDs, this assignment is typically handled by the database upon insertion, which can limit flexibility. With sequence numbers, you can easily generate the ID on the application side, which can be an easy task when using some ORMs e.g the EF Core ORM in C#

::: info

Check out sequence numbers on the SQL server [<VPIcon icon="fa-brands fa-microsoft"/>here](https://learn.microsoft.com/en-us/sql/relational-databases/sequence-numbers/sequence-numbers?view=sql-server-ver16).

<SiteInfo
  name="Sequence Numbers - SQL Server"
  desc="Sequence Numbers"
  url="https://learn.microsoft.com/en-us/sql/relational-databases/sequence-numbers/sequence-numbers?view=sql-server-ver17/"
  logo="/assets/image/learn.microsoft.com/favicon.ico"
  preview="/assets/image/learn.microsoft.com/open-graph-image.png"/>

:::

---

## UUIDs: Overview and Usage

GUIDs (Globally Unique Identifiers), also known as UUIDs (Universally Unique Identifiers), are 128-bit identifiers designed to be globally unique. A typical UUID is displayed in a 32-character hexadecimal string, divided into five groups separated by hyphens. For example: `126e3456-e89b-12d3-a456-426614174000`.

---

## What's so great about UUIDs?

One of the standout features of GUIDs is their huge capacity for uniqueness. With a 128-bit structure, the total number of possible GUIDs is very large: Specifically, there are `340,282,366,920,938,463,463,374,607,431,770,000,000` GUIDs available. To put that into perspective, let's compare it with something tangible.

![](https://freecodecamp.org/news/content/images/2024/07/image-94.png)

Did you know that scientists have attempted to calculate the number of grains of sand on Earth? Science writer David Blatner, in his book [<VPIcon icon="fa-brands fa-amazon"/>Spectrums](https://amazon.com/Spectrums-Mind-boggling-Universe-Infinitesimal-Infinity/dp/1620405202), mentions that a group of researchers at the University of Hawaii tried to estimate this number. They determined that Earth has roughly (and we are speaking very roughly) 7.5 x 1018 grains of sand, or seven quintillion, five hundred quadrillion grains. For more, consider reading the article titled: "[<VPIcon icon="fas fa-globe"/>Which Is Greater, The Number Of Sand Grains On Earth Or Stars In The Sky?](https://npr.org/sections/krulwich/2012/09/17/161096233/which-is-greater-the-number-of-sand-grains-on-earth-or-stars-in-the-sky)**"**

Now, to compare those numbers:

```plaintext
| GUIDs available | 340,282,366,920,938,463,463,374,607,431,770,000,000
| Sand grains     | 75,000,000,000,000,000,000
```

If you decided to create an application to track every grain of sand on Earth and assign each a unique identifier, you could easily do that using GUIDs. The fun part is that you could actually repeat this process `4,537,098,225,612,512,846` times over without running out of unique GUIDs! 🤯

---

## UUID Version 1

UUID Version 1 generates unique identifiers based on the current timestamp, clock sequence, and node identifier (typically the MAC address of the machine generating the UUID).

According to [<VPIcon icon="fas fa-globe"/>RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122), the timestamp is the number of nanoseconds since October 15, 1582, at midnight UTC. Most computers do not have a clock that ticks fast enough to measure time in nanoseconds. Instead, a random number is often used to fill in timestamp digits beyond the computer's measurement accuracy.

When multiple version-1 UUIDs are generated in a single API call, the random portion may be incremented rather than regenerated for each UUID. This ensures uniqueness and is faster to generate.

UUID v1 also has the mac address attached to it. By including a MAC address in the UUID, you can be sure that two different computers will never generate the same UUID. Because MAC addresses are globally unique, but also note that version-1 UUIDs can be traced back to the computer that generated them.

This ensures that the UUID is unique across both time and space. It is suitable when the **generation time and machine uniqueness** are important. It is often used in systems where the timestamp of creation is relevant or needed.

![Image from [<VPIcon icon="fas fa-globe"/>here](https://datatracker.ietf.org/doc/html/rfc4122)](https://freecodecamp.org/news/content/images/2024/07/image-95.png)

---

## UUID Version 4

UUID Version 4 generates identifiers using random or pseudo-random numbers. This method ensures a high probability of uniqueness due to the vast number of possible GUIDs. This is the most common UUID version.

There are 2 main variants of UUID:

- Variant 1: [<VPIcon icon="fas fa-globe"/>Minecraft UUID](https://minecraft.fandom.com/wiki/Universally_unique_identifier), also called Timestamp-first UUIDs
- Variant 2: "GUID"

![[<VPIcon icon="fas fa-globe"/>Image from here](https://uuidtools.com/minecraft)](https://freecodecamp.org/news/content/images/2024/07/image-96.png)

GUID is entirely random, making it simple to generate and ensuring that each identifier is unique with a very high probability. The unique identifiers are made up of 128 bits. They are written as 32 characters using numbers (0-9) and letters (A-F). The characters are grouped in a specific format: 8-4-4-4-12, separated by hyphens, like this: `{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}`.

The great thing about GUIDs is that you don’t need a central system to create them. Anyone can generate a GUID using an algorithm, and it will still be unique across different systems and applications. They are designed to be used nearly everywhere a unique identifier is needed. Here are some usage examples:

- Windows: Uses GUIDs to generate unique product keys
- Microsoft SQL Server: Uses GUIDs as primary keys to ensure global uniqueness across distributed databases
- AWS: Uses GUIDs for uniquely identifying resources in their cloud infrastructure, such as EC2 instances and S3 objects
- eBay: Uses GUIDs to identify listings, transactions, and users

---

## UUID Version 5

UUID Version 5 generates unique identifiers based on a **namespace** identifier and a **name**. The namespace and name are combined and hashed using SHA-1 to produce the UUID. This ensures that the same namespace and name combination will always produce the same UUID. In UUID, the namespace must be a UUID, and the name can be anything.

UUID V5 is useful for generating consistent unique identifiers for the same input data across different systems and contexts. Let's say we want to generate a user id based on their username. Here’s how you can achieve this in C#:

![](https://freecodecamp.org/news/content/images/2024/07/image-97.png)

Here the UUID Version 5 solves several important problems, particularly when you need a consistent and unique identifier based on a given input.

For instance, consider a scenario where you need a user ID to make an API call (or anything else), but in your code, you only have the username accessible. How would the problem be solved if we were using UUID Version 4 (GUIDs)? Most likely, it would work something like this:

```cs
/* When using GUID (UUID v4) */

var userName = "bob"; // Lets assume we only have username
// API call or DB call to get the user id using name
var userId = await userService.GetUserIdAsync(userName);

await userService.ChangeUserNameAsync(userId, "bob-2");
```

By using UUID Version 5 with a shared namespace across all your projects, you can easily generate the user ID from the username without making any additional API calls. So the same code would look like this:

```cs
/* When using UUID v5 */

// From some shared code
var userNamespace = SharedConstants.UserNamespace;

var userName = "bob"; // Lets assume we only have username

//Generate the user id in place, without additional call
var userId = Uuid.NewNameBased(userNamespace, userName);

await userService.ChangeUserNameAsync(userId, "bob-2");
```

This approach eliminates the need for redundant API calls. In a distributed system, making an API call to fetch a user ID every time you need it can be inefficient and slow. With UUID Version 5, you can locally generate the user ID from the username (or any other input), reducing the need for network requests and significantly improving the efficiency of your application.

What kind of problem have we solved with UUID v5? Let's say you need a user ID to make an API call but in your code, you have only a username, if you have the namespace shared across all your projects. Then you can easily get the user id using a username, without making any API call. That's because UUID v5 always reproduces the same UUID for the same input.

Also, UUID Version 5 ensures uniqueness and consistency across different systems. When integrating multiple systems or microservices, it can be challenging to keep user IDs consistent across various services. By using the same namespace and the same input (such as a username), UUID Version 5 guarantees that the generated IDs are unique and consistent across all systems, facilitating smoother integration and data consistency.

---

## UUID Version 7

GUID Version 7 is a proposed new version that aims to combine the strengths of both timestamp-based and random-based GUIDs.

### Problems with UUID v4 (GUID)

UUID Version 4 generates non-time-ordered values, meaning the identifiers created are not sequential. Since these values are randomly generated, they won't be clustered together in a database index. Instead, inserts will occur at random locations, which can negatively impact the performance of common index data structures, such as B-trees and their variants.

In a scenario where your product requires *frequent access to recent data*, non-sequential identifiers create a significant challenge.

With UUID Version 4, the most recent data will be inserted randomly throughout the index, *lacking clustering*. As a result, retrieving the most recent data from a large dataset requires traversing numerous database index pages.

In contrast, using sequential identifiers ensures that the latest data is logically arranged at the right-most part of the index, making it much more cache-friendly. This organization allows for faster and more efficient retrieval of recent data, as it minimizes the number of index pages that need to be accessed which is a lack in UUID v4. #### The solution with UUID v7

UUID v7 is designed to provide unique and sortable identifiers that are both easy to generate and useful for distributed systems. It uses a combination of timestamps and random data to ensure both uniqueness and temporal order.

The first part of the UUID is a timestamp that provides a chronological component, ensuring that UUIDs generated close together in time are also close together in value. The remaining part is filled with random data, ensuring the uniqueness of each identifier.

![[<VPIcon icon="fas fa-globe"/>Buildkite post about migrating to UUID v7](https://buildkite.com/blog/goodbye-integers-hello-uuids)](https://freecodecamp.org/news/content/images/2024/07/image-98.png)

---

## UUID Versions 2, 3, and 6

You may have noticed that our discussion focuses on UUID Versions 1, 4, 5, and 7, and skips over Versions 2, 3, and 6. Here's why:

- **UUID Version 2**: This version is rarely used in modern applications. It’s similar to Version 1 but includes additional fields for things like domain information (such as POSIX UID or GID). It was mainly used in legacy systems and is now considered largely obsolete.
- **UUID Version 3**: This version is based on a name and a namespace, similar to Version 5. The main difference is that Version 3 uses the MD5 hashing algorithm, which is less secure and less efficient than the SHA-1 algorithm used in Version 5. Version 5 is generally preferred because SHA-1 is more robust.
- **UUID Version 6**: Version 6 is still under draft as a proposed standard. It is meant to provide a time-ordered UUID with better performance for distributed systems, but since it hasn't been fully adopted yet, we focus on Version 7, which offers similar features and has more momentum.

---

## Snowflake ID

Snowflake ID is a unique identifier generation system developed by Twitter to address the challenges of generating unique, sequential, and distributed identifiers in a highly scalable and efficient manner.

Unlike GUIDs, which are often non-sequential and can cause performance issues in database indexing, Snowflake IDs are designed to be both time-ordered and globally unique, making them ideal for distributed systems and databases where sequential order is important.

A Snowflake ID is a 64-bit integer composed of several distinct parts:

1. **Timestamp (41 bits):** The largest portion of the Snowflake ID is the timestamp, which records the number of milliseconds since a custom epoch (often set to the date when the system was first deployed). This ensures that IDs are time-ordered and can be easily sorted based on their creation time.
2. **Datacenter ID (5 bits):** This part of the ID identifies the datacenter where the ID was generated, allowing the system to generate unique IDs across multiple data centers without conflicts.
3. **Machine ID (5 bits):** Similar to the datacenter ID, the machine ID identifies the specific server or machine within the datacenter that generated the ID. This ensures that even within the same data center, IDs remain unique.
4. **Sequence Number (12 bits):** The sequence number is used to differentiate between multiple IDs generated within the same millisecond by the same machine. *With 12 bits, up to 4,096 unique IDs can be generated per machine per millisecond.*

The format was created by Twitter (now X) and is used for the IDs of tweets. It is popularly believed that every snowflake has a unique structure, so they took the name "snowflake ID". The format has been adopted by other companies, including Discord and Instagram. The Mastodon social network uses a modified version.

The format was first announced by X/Twitter in June 2010. Due to implementation challenges, [<VPIcon icon="fas fa-globe"/>they waited until later in the year to roll out the update](https://techcrunch.com/2010/10/12/twitter-snowflake/).

- X uses snowflake IDs for posts, direct messages, users, lists, and all other objects available over the API.
- Discord also uses snowflakes, with their epoch set to the first second of the year 2015.
- Instagram uses a modified version of the format, with 41 bits for a timestamp, and 10 bits for a sequence number.
- Mastodon's modified format has 48 bits for a millisecond-level timestamp, as it uses the UNIX epoch. The remaining 16 bits are for sequence data.

![](https://freecodecamp.org/news/content/images/2024/08/image-3.png)

::: note "The Problem" stated by Twitter:

> We currently use MySQL to store most of our online data. In the beginning, the data was in one small database instance which in turn became one large database instance and eventually many large database clusters. For various reasons, the details of which merit a whole blog post, we’re working to replace many of these systems with [<VPIcon icon="fas fa-globe"/>the Cassandra distributed database](http://cassandra.apache.org/) or horizontally sharded MySQL (using [gizzard (<VPIcon icon="iconfont icon-github" />`twitter/gizzard`)](http://github.com/twitter/gizzard)).
>
> Unlike MySQL, Cassandra has no built-in way of generating unique ids – nor should it, since at the scale where Cassandra becomes interesting, it would be difficult to provide a one-size-fits-all solution for ids. Same goes for sharded MySQL. We needed something that could generate tens of thousands of ids per second in a highly available manner.
>
> This naturally led us to choose an uncoordinated approach. These ids need to be *roughly sortable*, meaning that if tweets A and B are posted around the same time, they should have ids in close proximity to one another since this is how we and most Twitter clients sort tweets.
>
> Additionally, these numbers have to fit into 64 bits. We’ve been through the painful process of growing the number of bits used to store tweet ids [<VPIcon icon="fas fa-globe"/>before](https://twitpocalypse.com/). It’s unsurprisingly hard to do when you have over [<VPIcon icon="fas fa-globe"/>100,000 different codebases involved](http://social.venturebeat.com/2010/04/14/twitter-applications/).

Check out [<VPIcon icon="fa-brands fa-x-twitter"/>here](https://blog.x.com/engineering/en_us/a/2010/announcing-snowflake) for more information

<SiteInfo
  name="Announcing Snowflake"
  desc="Announcing Snowflake"
  url="https://blog.x.com/engineering/en_us/a/2010/announcing-snowflake/"
  logo="https://abs.twimg.com/favicons/twitter-orange.3.ico"
  preview="https://blog.x.com/content/dam/blog-twitter/engineering/en_us/main-template-assets/Eng_EXPLORE_Pink.png.twimg.768.png"/>
x

:::

---

## Finding Tweet Timestamps

We all know that deleting a tweet isn't truly possible—once it's out there, it's how Twitter is designed. However, Twitter's use of Snowflake IDs adds an interesting twist to this narrative. Snowflake IDs are designed to be unique and time-ordered, which makes them not just identifiers but also a trail that can be tracked.

On May 11, 2019, Derek Willis from Politwoops uncovered a [list of deleted tweet IDs (<VPIcon icon="iconfont icon-github"/>`naumansiddiqui4`)](https://gist.github.com/naumansiddiqui4/ba3398ea85ed0ef1f3af23d47b4dcd42). By using the Snowflake structure, he was able to extract the timestamps from these IDs, and discovered the 107 missing tweets. This finding inspired the creation of TweetedAt, a tool designed to accurately retrieve timestamps from Snowflake IDs and estimate the timing of tweets generated before Snowflake was in use.

![Check out [<VPIcon icon="fas fa-globe"/>here](https://ws-dl.blogspot.com/2019/08/2019-08-03-tweetedat-finding-tweet.html).](https://freecodecamp.org/news/content/images/2024/08/image-2.png)

---

## Wrapping Up

Unique identifiers play a critical role in software engineering, ensuring data integrity and enabling efficient data management across distributed systems.

From traditional GUIDs to modern solutions like Snowflake IDs, each identifier system offers distinct advantages tailored to specific use cases.

As technology evolves, understanding these systems and their implementations becomes increasingly important for scaling applications effectively. By exploring the various versions and alternatives, we can make informed decisions that best suit our needs in managing data at scale.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Effectively Manage Unique Identifiers at Scale: From GUIDs to Snowflake IDs and Other Modern Solutions",
  "desc": "What Are Unique Identifiers? 🪪 Unique identifiers (UIDs) are crucial components in software engineering and data management. They serve as distinct references for entities within a system and ensure that each item – whether a database record, a user...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-effectively-manage-unique-identifiers-at-scale.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
