---
lang: en-US
title: "Write-Ahead Logging (WAL)"
description: "Article(s) > Write-Ahead Logging (WAL)"
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - Article(s)
tag:
  - blog
  - outcomeschool.com
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Write-Ahead Logging (WAL)"
    - property: og:description
      content: "Write-Ahead Logging (WAL)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/outcomeschool.com/write-ahead-logging.html
prev: /academics/system-design/articles/README.md
date: 2024-10-28
isOriginal: false
author: Pallavi
cover: https://outcomeschool.com/static/images/blog/write-ahead-logging.png
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
  name="Write-Ahead Logging (WAL)"
  desc="In this blog, we will learn about Write-Ahead Logging (WAL) and why it is used internally in databases."
  url="https://outcomeschool.com/write-ahead-logging"
  logo="https://outcomeschool.com/static/favicons/apple-touch-icon.png"
  preview="https://outcomeschool.com/static/images/blog/write-ahead-logging.png"/>

In this blog, we will learn about **Write-Ahead Logging (WAL)** and why it is used internally in databases.

Let’s say we want to create our own database then one essential feature that should be present is durability. Durability ensures that once a transaction has been committed, the changes made by that transaction will persist, even in the face of power loss, OS failure or hardware failure. Let's look at different ways to do this, what problems we might face, and how we can make it better.

---

## Approach 1: Direct writes to disk

In this approach, the write/update query directly modifies the disk blocks containing table and index data. Writing to disk is slow because it involves **mechanical movement**, which takes significant time. Each write operation requires the disk head to move to the correct track and the disk to rotate to position the write head over the desired sector.

Secondly, since there is no buffer or memory pool to batch the writes, each individual transaction or change triggers its own separate write. This leads to small and frequent writes to disk. These frequent small writes are expensive, as for each write there is a fixed overhead from the **mechanical movement** of the disk head, increasing the overall overhead.

The issue with this approach is poor performance due to slow disk writes. Let’s see how the next approach solve this issue.

---

## Approach 2: Write data to memory

A simple solution to this is problem is to perform write operations in RAM. This would make the writes fast. However, RAM is volatile memory, meaning all data would be lost in the event of a power outage. Additionally, RAM is more expensive than HDDs or SSDs, and databases often need to store terabytes or even petabytes of data.

The issues with this approach are the risk of data loss and high costs. Let's see how the next approach solves these issues.

---

## Approach 3: Write Data to Memory First, Then Flush to Disk Periodically

Since writing directly to disk is slow and writing to memory risks data loss, a middle-ground solution is needed. Databases typically follow an approach where data is first written to a memory pool, which is fast volatile storage, and then periodically flushed to disk, which is slow non-volatile storage. This allows the database to process data quickly, leveraging the speed of RAM, while still ensuring data persistence by regularly writing to disk.

By accumulating multiple changes in memory before writing them to disk, the system can perform fewer, larger disk writes, rather than many small ones, reducing the overhead caused by the mechanical movement of the disk head. Additionally, some data might be modified multiple times in memory before being written to disk, so only the final state needs to be flushed, reducing overall I/O.

The issue with this approach is that if the system crashes before the in-memory data is flushed to disk, any changes that exist only in memory and haven't yet been written to disk will be lost. Let’s see how the next approach solve this issue.

---

## Approach 4: Write data to memory and Write-Ahead Log and then periodically flush it to disk

In addition to writing data in memory we can also write it in log file on disk before applying the changes to the actual database files. This ensures that all changes are written to the log file before they are considered committed. Even if in-memory changes aren't yet in the database files, they're safely on disk in the log file. This process of writing data to log file is called Write-Ahead Logging (WAL).

Now, the big question is why writing to a log file would be faster than writing directly to a database, even though both involve disk writes.

To find the answer, we will explore what Write-Ahead Logging (WAL) is.

---

## What is Write-Ahead Logging (WAL)?

Write-Ahead Logging (WAL) is a technique used in databases to ensure data integrity, particularly in the event of system crashes or failures. The core principle of WAL is that any changes to the database (i.e., data modifications) are first written to a separate log file before they are applied to the main database file. This ensures that the database can recover to a consistent state, even if a failure occurs during the modification process.

**But why writing to a log file will be faster than writing to a database file even though both are disk writes.**

WAL is designed as an append-only log. This means new entries are always added to the end of the log file, resulting in a sequential write pattern, while the database files often do random writes. We know that sequential writes are much faster than random writes on disk as the disk head does not have to move much between writes.

Also, appending to a file is a simple operation as we need to simply write new data to the end of the file while writing to database files involve updating complex database structures (B-Trees, indexes). WAL has frequent smaller writes that can be quickly flushed to disk, while writing to database files may require reading existing data before writing, which is slower.

::: note Advantages of WAL

1. **Durability**: WAL ensures no committed transactions are lost, even during system crashes. Since, all changes are recorded in the log before being applied to the database, recovery is possible by replaying the log entries.
2. **Performance**: WAL improves database performance by using sequential writes to record changes in the log, which are faster than the random writes that would be required if data were immediately written to disk. Since changes are first written to the log, multiple changes can be batched and applied to the data files later, reducing the number of expensive disk operations. WAL also enhances concurrency by allowing writes to be processed while reads continue accessing the main data without interference, as the main data files aren’t locked during write operations.
3. **Point-in-time Recovery**: To do point in time recovery, database typically combine WAL with periodic base backups. A base backup is the snapshot of the database at a certain point in time. To recover a specific point in time, first, the base backup is restored. After that the WAL logs are replayed from the moment of the base backup to the desired recovery point.
4. **Atomicity**: If a system crashes in the middle of a transaction, the WAL is used during the recovery phase. There are two key parts to the recovery:
    - Redo: If a transaction was committed but the changes were not fully written to the data files, the WAL allows those changes to be reapplied.
    - Undo: If a transaction was not committed before the crash, the database uses the WAL to roll back any partial changes made by that transaction. This ensures that incomplete transactions do not leave the database in an inconsistent state, thereby maintaining atomicity.

:::

Now, we have understood the Write-Ahead Logging (WAL) in Database.

That's it for now.

Thanks

::: info Pallavi

You can connect with me on:

- [X (<FontIcon icon="fa-brands fa-x-twitter"/>`pallavishekhar_`)](https://x.com/pallavishekhar_)
- [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`pallavi-shekhar`)](https://linkedin.com/in/pallavi-shekhar)
- [GitHub (<FontIcon icon="iconfont icon-github"/>`pallavi-shekhar`)](https://github.com/pallavi-shekhar)

Follow Outcome School on:

- [X (<FontIcon icon="fa-brands fa-x-twitter"/>`outcome_school`)](https://twitter.com/outcome_school)
- [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`outcomeschool`)](https://linkedin.com/company/outcomeschool)
- [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`OutcomeSchool`)](https://youtube.com/@OutcomeSchool)
- [GitHub (<FontIcon icon="iconfont icon-github"/>`OutcomeSchool`)](http://github.com/OutcomeSchool)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Write-Ahead Logging (WAL)",
  "desc": "In this blog, we will learn about Write-Ahead Logging (WAL) and why it is used internally in databases.",
  "link": "https://chanhi2000.github.io/bookshelf/outcomeschool.com/write-ahead-logging.html",
  "logo": "https://outcomeschool.com/static/favicons/apple-touch-icon.png",
  "background": "rgba(78,70,220,0.2)"
}
```
