---
lang: en-US
title: "How to Read and Write Deeply Partitioned Files Using Apache Spark"
description: "Article(s) > How to Read and Write Deeply Partitioned Files Using Apache Spark"
icon: iconfont icon-apachespark
category:
  - Data Science
  - Apache Spark
  - Scala
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - spark
  - apachespark
  - apache-spark
  - scala
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Read and Write Deeply Partitioned Files Using Apache Spark"
    - property: og:description
      content: "How to Read and Write Deeply Partitioned Files Using Apache Spark"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-read-and-write-deeply-partitioned-files-using-apache-spark.html
prev: /data-science/spark/articles/README.md
date: 2025-09-01
isOriginal: false
author:
  - name: Arun Shanmugam Kumar
    url : https://freecodecamp.org/news/author/arunshanmugamkumar/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756671369152/1e620925-6fb6-47fa-8344-86b9d3c7cd02.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Apache Spark > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/spark/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Scala > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/scala/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Read and Write Deeply Partitioned Files Using Apache Spark"
  desc="If you use Apache Spark to write your data pipeline, you might need to export or copy data from a source to destination while preserving the partition folders between the source and destination. When I researched online on how to do this in Spark, I ..."
  url="https://freecodecamp.org/news/how-to-read-and-write-deeply-partitioned-files-using-apache-spark"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756671369152/1e620925-6fb6-47fa-8344-86b9d3c7cd02.png"/>

If you use Apache Spark to write your data pipeline, you might need to export or copy data from a source to destination while preserving the partition folders between the source and destination.

When I researched online on how to do this in Spark, I found very few tutorials giving an end-to-end solution that worked – especially when the partitions are deeply nested and you don't know beforehand the values these folder names will take (for example `year=*/month=*/day=*/hour=*/*.csv`).

In this tutorial, I have provided one such implementation using Spark.

### Here’s what we’ll cover:

- [Prerequisite](#heading-prerequisite)
- [Setup](#heading-setup)
- [False Starts](#heading-false-starts)
- [My Solution](#heading-my-solution)
- [Conclusion](#heading-conclusion)
    

---

## Prerequisite

To follow along in this tutorial, you need to have basic understanding of distributed computing using frameworks like Hadoop and Spark, as well as code that’s programmed in Object Oriented languages like Scala/Java. The code is tested using the below dependencies:

- Scala 2.12+
- Java 17 (earlier versions might work)
- Sbt
    

---

## Setup

I’m assuming you have partition folders that are created at the source with the below pattern (which is a standard partition column involving date-time):

`year/month/day/hour`

Crucially, as I mentioned above, I’m assuming that you don’t know the full name of the folders – except that they have some constant prefix pattern in them.

---

## False Starts

1. If you think of using `recursiveFileLookup` and `pathGlobFilter` option while both reading and writing, it doesn’t quite work, as the above functions are only available on read API.
2. If you think of parameterizing the reading and writing based on all the possible year/month/day/hour combination and skip export if the corresponding partition folder is not found, then it might work but won’t be very efficient.

---

## My Solution

After a few trials and errors and searching in Stack Overflow and the Spark documentation, I hit upon an idea to use a combination of `input_file_name()`, `regexp_extract()`, and `partitionBy()` API's on the write side to achieve the end goal. You can find a Scala-based sample code below:

```scala
package main.scala.blog

/**
*  Spark stream example code to read and write from a partitioned folder
*  to a partitioned folder without explicitly known datetime.
*/

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.types.StringType
import org.apache.spark.sql.functions.{udf, input_file_name, col, lit, regexp_extract}

object PartitionedReaderWriter {

    def main(args: Array[String]) {
        // 1.        val spark = SparkSession
                    .builder
                    .appName("PartitionedReaderWriterApp")
                    .getOrCreate()

        val sourceBasePath = "data/partitioned_files_source/user"
        // 2.        val sourceDf = spark.read
                            .format("csv")
                            .schema("State STRING, Color STRING, Count INT")
                            .option("header", "true")
                            .option("pathGlobFilter", "*.csv")
                            .option("recursiveFileLookup", "true")
                            .load(sourceBasePath)

        val destinationBasePath = "data/partitioned_files_destination/user"
        // 3.        val writeDf = sourceDf
                        .withColumn("year", regexp_extract(input_file_name(), "year=(\\d{4})", 1))
                        .withColumn("month", regexp_extract(input_file_name(), "month=(\\d{2})", 1))
                        .withColumn("day", regexp_extract(input_file_name(), "day=(\\d{2})", 1))
                        .withColumn("hour", regexp_extract(input_file_name(), "hour=(\\d{2})", 1))

        // 4.        writeDf.write
                .format("csv")
                .option("header", "true")
                .mode("overwrite")
                .partitionBy("year", "month", "day", "hour")
                .save(destinationBasePath)

        // 5.        spark.stop()        
    }
}
```

Here’s what’s going on in the above code:

1. Inside main method, you begin by adding Spark initialization setup code to create a Spark session.
2. You read the data from `sourceBasePath` using spark `read()` API with the format as `csv` (you can also optionally provide the schema). Options `recursiveFileLookup` and `pathGlobFilter` are needed to recursively read through nested folders and to specify any `csv` file, respectively.
3. Th next section contains the core logic where you can use `input_file_name()` to return the full path of the file and `regexp_extract()` to extract `year` , `month`, `day`, and `hour` from the corresponding subfolders in the path and store them as auxiliary columns on the dataframe.
4. Finally, you write the dataframe using the `csv` format again and crucially use `partitionBy` to specify the previously created auxiliary columns as partition columns. Then save the dataframe in the `destinationBasePath`.
5. After the copy is done, you stop the Spark session by calling the `stop()` API.
    

---

## Conclusion

In this article I have shown you how to export / copy a deeply nested data files from source to destination using Apache Spark in an efficient way. I hope you find it useful!

::: info

You can read my other articles at [<VPIcon icon="fas fa-globe"/>beyonddream.me](https://beyonddream.me/post-1/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Read and Write Deeply Partitioned Files Using Apache Spark",
  "desc": "If you use Apache Spark to write your data pipeline, you might need to export or copy data from a source to destination while preserving the partition folders between the source and destination. When I researched online on how to do this in Spark, I ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-read-and-write-deeply-partitioned-files-using-apache-spark.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
