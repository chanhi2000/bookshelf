---
lang: en-US
title: "5 ways to rapidly improve MySQL database performance"
description: "Article(s) > 5 ways to rapidly improve MySQL database performance"
icon: iconfont icon-mysql
category:
  - Data Science
  - MySQL
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - data-science
  - mysql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 5 ways to rapidly improve MySQL database performance"
    - property: og:description
      content: "5 ways to rapidly improve MySQL database performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/5-ways-rapidly-improve-mysql-database-performance.html
prev: /data-science/mysql/articles/README.md
date: 2022-12-29
isOriginal: false
author:
  - name: Lukas Vileikis
    url : https://blog.logrocket.com/author/lukasvileikis/
cover: https://blog.logrocket.com/wp-content/uploads/2022/12/improve-mysql-database-performance.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "MySQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mysql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="5 ways to rapidly improve MySQL database performance"
  desc="Walk through five ways to quickly improve your MySQL database performance, including managing indexes, partitions, my.cnf, and more."
  url="https://blog.logrocket.com/5-ways-rapidly-improve-mysql-database-performance"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="https://blog.logrocket.com/wp-content/uploads/2022/12/improve-mysql-database-performance.png"/>

Every developer that works with MySQL understands how crucial the RDBMS is for their projects. The database management system can support all kinds of projects, from gaming forums to healthcare solutions. According to [<VPIcon icon="fas fa-globe"/>research performed by DatabaseJournal](https://databasejournal.com/mysql/postgresql-vs-mysql-which-is-best/), it takes up almost half, 44 percent, of the database market share.

![Improve Mysql Database Performance](https://blog.logrocket.com/wp-content/uploads/2022/12/improve-mysql-database-performance.png)

Improving MySQL performance is also something that every DBA struggles with at some point in their career. Worry not though, we’re here to help. In this article, we’ll walk through five ways to quickly improve your MySQL database performance. Let’s get started!

---

## MySQL and your applications

Before attempting to improve your MySQL app performance, one of the first things to consider is the [**infrastructure backing your application**](/blog.logrocket.com/build-rest-api-node-express-mysql.md). No system has ever been improved upon without first understanding what it’s built on. For this reason, we need to take a step back and check up on the server backing MySQL.

We’ll first want to check up on two basic things, starting with the amount of memory installed on the server. You can observe this by issuing a `free` command. Secondly, you can issue the `df"` command to observe the amount of hard drive space on the server.

Keeping these things in mind, you can connect to MySQL. First, you’ll want to check whether any unnecessary queries are running by using the `SHOW PROCESSLIST` command. You should receive an output like the one below:

![Running Queries List Mysql](https://blog.logrocket.com/wp-content/uploads/2022/12/running-queries-list-mysql.png)

If you see any long-running queries that you don’t recognize, it’s a good idea to terminate them; a long-running query may be an obstacle to other queries. However, chances are that you won’t see any suspicious queries. Even if you do, terminating one or two slow queries won’t rapidly improve your database performance.

To speed up your queries, you need to gain some understanding of how queries and MySQL work in general.

---

## Improving database performance in general

Before walking you through the specific measures that help improve MySQL database performance, you need to understand the basics of database performance.

Where database performance improvement is concerned, people are usually talking about improving the performance of CRUD, `Create`, `Read`, `Update`, and `Delete` queries. In MySQL, these queries span the `INSERT`, `SELECT`, `UPDATE`, and `DELETE` queries.

All queries within MySQL lean on the settings defined in one core file related to MySQL, <VPIcon icon="fas fa-file-lines"/>`my.cnf`. All of the settings defined in <VPIcon icon="fas fa-file-lines"/>`my.cnf` have a direct impact on query performance.

You can usually improve the `INSERT` query performance by removing indexes from the table that data is inserted to. The more indexes are on a specific table, the harder it is for `INSERT` to proceed.

To improve `SELECT` query performance, we typically use indexes. To improve `UPDATE` query performance, we perform updates in batches, meaning we perform many smaller updates instead of one big update.

To improve `DELETE` query performance, we switch the `DELETE` query to `TRUNCATE`. `TRUNCATE` deletes all rows in a table. Such a query is generally much faster than deleting rows using `DELETE` because `TRUNCATE` provides MySQL with less overhead.

The advice given above will certainly be a good starting point when trying to understand why a MySQL-based database is misbehaving in the performance realm.

To understand the reasons behind the assumptions given above, though, we’ll need to dive deeper. I recommend taking a backup of your database, then coming back to this blog. Now, we’ll review five ways that will help you rapidly improve your database performance.

---

## #1: Managing the <VPIcon icon="fas fa-file-lines"/>`my.cnf` file

When attempting to improve MySQL query performance, one of the first things to take a closer look at would be the <VPIcon icon="fas fa-file-lines"/>`my.cnf` file, which holds all the necessary parameters for MySQL to function. If you’re using Linux, you can find the <VPIcon icon="fas fa-file-lines"/>`my.cnf` file in one of the following directories:

- <VPIcon icon="fas fa-folder-open"/>`/var/lib/mysql/`<VPIcon icon="fas fa-file-lines"/>`my.cnf`
- <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`my.cnf`
- <VPIcon icon="fas fa-folder-open"/>`/etc/mysql/`<VPIcon icon="fas fa-file-lines"/>`my.cnf`
- <VPIcon icon="fas fa-folder-open"/>`/usr/etc/`<VPIcon icon="fas fa-file-lines"/>`my.cnf`

If you‘re using Windows, you can find the file in the `/bin/mysql/mysql *.*.*` directory.

`mysql *.*.*` refers to your MySQL version. Open up the file and look for the parameters surrounding InnoDB:

![My CNF Parameters Example](https://blog.logrocket.com/wp-content/uploads/2022/12/my-cnf-parameters-example.png)

All of these parameters are related to one of the main storage engines within MySQL, InnoDB. You can use other storage engines, but since InnoDB is the default storage engine offered by MySQL, we suggest you go with it.

### <VPIcon icon="fas fa-file-lines"/>`my.cnf` parameters

Let’s review the parameters. The `innodb-buffer-pool-size` parameter defines the size of the buffer pool, which is used to cache data related to InnoDB tables. The `innodb-data-file-path` parameter specifies the path where the `ibdata1` file is stored. `ibdata1` is the main file related to InnoDB, storing all of the necessary data.

`innodb-default-row-format` specifies the row format within InnoDB tables. These can be either fixed or dynamic. `innodb-doublewrite` specifies whether or not the doublewrite mechanism within InnoDB is enabled.

`innodb-flush-log-at-trx-commit` specifies how data is flushed to log files when transactions commit and finish. The `innodb-flush-method` parameter defines the method used to flush data to log files.

### Setting <VPIcon icon="fas fa-file-lines"/>`my.cnf` parameters

Remember how you figured out the amount of RAM and hard drive space available within your infrastructure? Now is the time to use those details for the best possible performance. We’ll set the parameters as follows.

The `innodb-buffer-pool-size` parameter should be set to 50 to 60 percent of the available RAM. The bigger it is, the more data will be cached, and therefore, inserting data will be faster.

Increase the size of the `innodb-data-file-path` variable so that it is able to accommodate all of the data within MySQL. We recommend setting the parameter to 5-10 GB.

If the parameter is not present, include an `innodb-file-per-table` parameter and set it to `one`. The `innodb-file-per-table` parameter will help MySQL understand that it needs to store all tables as separate files, thereby making the size of the buffer pool significantly smaller. The buffer pool will only hold metadata.

We advise leaving the `innodb-flush-log-at-trx-commit` parameter at its default value. The default value guarantees ACID compliance, but, if you want faster write performance, you can also consider changing the value to `0` or `2`. Bear in mind that ACID, the properties guaranteeing data integrity, will be traded off as a result.

Leave the flush method as is. The `O_DIRECT` flush method guarantees faster performance when importing data due to the Linux kernel avoiding the OS cache.

Performing the steps specified above will guarantee faster performance even if your server has a limited amount of RAM and storage space.

---

## #2 and #3: Check up on MySQL storage engines and schema design

In addition to fiddling around with the <VPIcon icon="fas fa-file-lines"/>`my.cnf` file, we should also examine the storage engines we use and the way they are designed.If you’re using MySQL, use InnoDB. If you’re using [<VPIcon icon="fas fa-globe"/>Percona Server](https://percona.com/software/mysql-database/percona-server), use [<VPIcon icon="fas fa-globe"/>Percona XtraDB](https://percona.com/software/mysql-database/percona-xtradb-cluster).

### InnoDB parameters

At the time of writing, InnoDB is the only storage engine that supports ACID properties. These properties guarantee data integrity even in the event of power outages or any similar disruptions. As mentioned previously, ACID can be exchanged for speed by setting the `innodb-flush-log-at-trx-commit` parameter to `0` or `2`.

InnoDB offers multiple parameters that you can use to rapidly improve query performance and other operations, including `innodb-buffer-pool-size` and `innodb-log-file-size`.

Set the buffer pool size to 60 percent of RAM available within your infrastructure and the log file size to approximately a quarter of the value allocated to the buffer pool. The log files are scanned when MySQL is restoring the data within InnoDB. The bigger the size, the faster the speed of the restore process.

Both InnoDB and XtraDB support row-level locking. In simple terms, row-level locking refers to only locking access to rows that are directly impacted by a transaction. Compared to table-level locking, it has one significant advantage; developers can continue working with rows when updating data.

If your use case doesn’t require such an approach, you should avoid using any other storage engine than InnoDB. MyISAM isn’t reliable, and other storage engines are to be used only in specific corner cases. For more information, [<VPIcon icon="iconfont icon-mysql"/>refer to the MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html).

If the data you’re working with exceeds 10 million rows, all of your tables are normalized.

### Indexing queries

At least some of the columns within the tables that you run `SELECT` queries on are indexed. For optimal results, index either all of the columns that go after the `WHERE` clause or the first one to save space. This type of approach will improve the performance of queries that read data because indexes will let MySQL know how to find columns with specific values quickly.

### Data types and integers

It’s important that you know your way around data types and character sets. To occupy less space on the disk, you should use `CHAR` (character) or `VARCHAR` (variable character) data types instead of `TEXT- CHAR` and `VARCHAR` data types. It’s the same with integers; consider using `SMALLINT` instead of `INT` if necessary to save hard drive space.

Specify the length of the data types properly. Consider specifying a size of, say, 50, instead of 255, the maximum value, when dealing with big data. Such an approach will save massive amounts of space on the disk.

Ensure that your tables do not store any data that’s not necessary. The less data that is stored, the less data you have to read and update.

---

## #4 and #5: Indexes and partitions

In addition to the factors described above, indexes and partitions are also immensely important. Indexes help us to find rows with specific values quickly, whereas partitions act as tables within tables to further improve performance.

Both of those approaches come with a cost on the `INSERT`, `UPDATE`, and `DELETE` queries since the data that is inserted or updated needs to be updated inside of the index or partition itself.

However, both of these approaches have an upside as well; they both speed up read operations. Partitions make `SELECT` queries faster because they can split tables into smaller tables beginning with a certain character, only running queries through them. On the other hand, the job of an index is to make `SELECT` queries with a `WHERE` clause faster.

### Best practices for indexes

Both indexes and partitions have multiple different types. For the purposes of this article, we won’t discuss them all, but for indexes, keep the following in mind.

The most common type of indexes, B-tree indexes, are useful when used in conjunction with queries with operators containing an equality sign `=`.

Covering indexes cover all of the columns that are used by a specific query. For example, a covering index on the columns `a1`, `a2`, and `a3` would satisfy the following query:

```sql
SELECT * FROM demo WHERE a1 = 'Demo' AND a2 = 'Demo 2' AND a3 = 'Demo 3';
```

Hash indexes only work in specific storage engines and specific search operators within MySQL, including `=` and `<=>`.

### Partitions in MySQL

For partitions, keep in mind that they come in multiple flavors as well.

Partitioning by `RANGE` lets us partition values falling within a given range. This type of partitioning is particularly useful when splitting large tables by character or number.

Partitioning by `HASH` splits the table into multiple tables according to a number of columns. For example, `PARTITION BY HASH(id) PARTITIONS 8;` would split the table into multiple different tables at the database level with eight partitions in total.

All types of partitioning can be found in [<VPIcon icon="iconfont icon-mysql"/>the MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/partitioning.html). Partitioning is usually defined upon creating a table, and in many cases, it looks like the following:

```sql
CREATE TABLE table_name (
  [column_details]
) [partitioning_details];

-- Partitioning by range, for example, would look like this:

CREATE TABLE table_name (
  `demo_column` VARCHAR(255) NOT NULL DEFAULT ''
) PARTITION BY RANGE (column) (
  PARTITION p1 VALUES LESS THAN (100),
  PARTITION p2 VALUES LESS THAN (200)
);
```

Other types of partitioning look very similar to the partitioning defined above. However, partitioning by `RANGE` is replaced by `LIST`, `HASH`, or other types.

Partitioning has another very important upside as well. It allows users to delete all of the data stored in a single partition; `ALTER TABLE demo TRUNCATE PARTITION partition_name` will do the trick.

---

## Advanced operations: Tips and tricks

Both indexing and partitioning will help immensely in improving read operations, but there are a couple of additional things that we need to keep in mind.

`COUNT(*)` queries are only fast when the MyISAM storage engine is used. Faster `COUNT(*)` queries are the only upside of the MyISAM storage engine since it stores the row count within its metadata. No other storage engines do that.

For faster `SELECT` queries with wildcards, employ wildcards only at the end of the search query. Queries should look like the code below; keep in mind that there’s no wildcard sign at the start of the string:

```sql
SELECT * FROM demo_table WHERE column LIKE 'string%';
```

Wildcards at the start of the string tell MySQL that it should search for anything `%` at the beginning, which can slow the query down.

`UNIQUE` indexes help us to ensure that each entry inside a column is unique. If that’s not the case, MySQL will error out.

The `IGNORE` keyword is useful if we want to ignore errors when inserting data or performing other operations. Simply specify `IGNORE` within the statement, then proceed as usual:

```sql
INSERT IGNORE INTO demo_table (c1) VALUES ('Demo');
```

`LOAD DATA INFILE and SELECT … INTO OUTFILE` is significantly faster than issuing `INSERT` queries and backing up data in a regular fashion. Such queries avoid a lot of the overhead that exists when `INSERT` queries are being run. [<VPIcon icon="iconfont icon-mysql"/>Refer to the MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/load-data.html) for more information.

Older versions of MySQL cannot deal with `FULLTEXT` indexes on bigger data sets when we’re searching for anything with an `@` sign. That’s a bug within MySQL, `BUG#104263`. This approach causes the query to timeout.

Avoid issuing `ALTER` queries on tables running big data sets. Due to how `ALTER` works internally, it forces MySQL to create a new table, then inserts the data into it, makes the necessary changes, and swaps the original table with the copy. As far as big data sets are concerned, this approach usually takes a long time, so just keep that in mind.

Sometimes, it’s helpful to use the `DEFAULT` keyword to set default values to many rows at once. Imagine creating a table, then inserting a billion rows into it. When the `DEFAULT` keyword is used, rows will be pre-filled with a specific keyword, thereby preventing the need for potentially problematic `ALTER` queries as described above. Define a column as follows:

```sql
`column_name` VARCHAR(255) NOT NULL DEFAULT 'value';
```

Hopefully, the advice in this article will help you improve the performance of your MySQL databases. However, as with everything, note that there are downsides.

---

## The downsides of each approach

Improving MySQL performance using the methods described above may come with the following drawbacks.

Checking up on <VPIcon icon="fas fa-file-lines"/>`my.cnf` requires some knowledge of Linux internals, and in many cases, a rather strong server. You can’t improve performance much if your RAM is limited to 256MB or if you have only 2GB of disk space in total.

Knowing your way around <VPIcon icon="fas fa-file-lines"/>`my.cnf` and storage engines and modifying their settings usually requires deep knowledge of the MySQL space. One needs to know exactly what each parameter that is modified does, what their appropriate values are, and more.

Windows users have it easy since <VPIcon icon="fas fa-file-lines"/>`my.ini`, a <VPIcon icon="fas fa-file-lines"/>`my.cnf` equivalent, provides them with a lot of comments within itself, but Linux users usually have to define many settings themselves.

The main downside of data types and character sets is the fact that each character requires space on the disk, and some character sets have different requirements in the storage space. Four bytes per character or eight bytes per character certainly makes a difference if we’re dealing with large data sets, so that’s something to think about too. Refer to [<VPIcon icon="iconfont icon-mysql"/>the MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/char.html) for more information.

Indexes and partitions usually speed up `SELECT` operations at the expense of slowing down everything else, including `INSERT`, `UPDATE`, and `DELETE`, since all of those queries have to insert, update, or delete data in indexes and partitions as well.

---

## Conclusion

In this article, we’ve discussed five ways that you can rapidly improve your MySQL database performance. Each approach has its own unique upsides and downsides and is applicable in different scenarios. However, whether or not the pros outweigh the cons is for you to decide.

Familiarize yourself [<VPIcon icon="iconfont icon-mysql"/>with the documentation surrounding your storage engine of choice](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html).Use InnoDB or XtraDB as your storage engine, try your best to normalize the tables you’re working with, avoid using unnecessary sizes for your data types, and index your columns to speed up `SELECT` queries.

Indexes and partitions are used to speed up `SELECT` queries at the expense of slowing down `INSERT`, `UPDATE`, and `DELETE`. Both of these approaches have multiple types and can be incredibly useful if used wisely.

As always, before attempting to improve your MySQL app performance using one or more of the ways described in this article, be sure to evaluate all of the options available to you, take backups before you test anything, and try all modifications on a local environment first. Make modifications wisely, and always keep in mind that a performance increase in one place most likely means a performance decrease in another place.

I hope you enjoyed this article. Be sure to leave a comment if you have any questions, and happy coding.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "5 ways to rapidly improve MySQL database performance",
  "desc": "Walk through five ways to quickly improve your MySQL database performance, including managing indexes, partitions, my.cnf, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/5-ways-rapidly-improve-mysql-database-performance.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
