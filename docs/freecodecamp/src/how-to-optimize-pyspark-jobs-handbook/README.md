---
lang: en-US
title: "How to Optimize PySpark Jobs: Real-World Scenarios for Understanding Logical Plans"
description: "Article(s) > How to Optimize PySpark Jobs: Real-World Scenarios for Understanding Logical Plans"
icon: 
category:
  - Python
  - PySpark
  - Data Science
  - Apache Spark
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - py-spark
  - data-science
  - spark
  - apachespark
  - apache-spark
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Optimize PySpark Jobs: Real-World Scenarios for Understanding Logical Plans"
    - property: og:description
      content: "How to Optimize PySpark Jobs: Real-World Scenarios for Understanding Logical Plans"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-optimize-pyspark-jobs-handbook.html
prev: /programming/py-spark/articles/README.md
date: 2026-02-06
isOriginal: false
author:
  - name: Sameer Shukla
    url: https://freecodecamp.org/news/author/sshukla/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770331493095/d569e168-d3ba-40e0-a500-7f682bbef693.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PySpark > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-spark/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Apache Spark > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/spark/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Optimize PySpark Jobs: Real-World Scenarios for Understanding Logical Plans"
  desc="In the world of big data, performance isn't just about bigger clusters – it's about smarter code. Spark is deceptively simple to write but notoriously difficult to optimize, because what you write isn't what Spark executes. Between your transformatio..."
  url="https://freecodecamp.org/news/how-to-optimize-pyspark-jobs-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770331493095/d569e168-d3ba-40e0-a500-7f682bbef693.png"/>

In the world of big data, performance isn't just about bigger clusters – it's about smarter code. Spark is deceptively simple to write but notoriously difficult to optimize, because what you write isn't what Spark executes. Between your transformations and actual computation lies an invisible translation layer – the logical plan – that determines whether your job runs in minutes or hours.

Most engineers never look at this layer, which is why they spend days tuning configurations that don't address the real problem: inefficient transformations that generate bloated plans.

This handbook teaches you to read, interpret, and control those plans, transforming you from someone who writes PySpark code into someone who architects efficient data pipelines with precision and confidence.

---

## Background Information

### What This Handbook is Really About

This is not a tutorial about Spark internals, cluster tuning, or PySpark syntax or APIs.

This is a handbook about writing PySpark code that generates efficient logical plans.

Because when your code produces clean, optimized plans, Spark pushes filters correctly, shuffles reduce instead of multiply, projections stay shallow, and the DAG ([<VPIcon icon="fa-brands fa-wikipedia-w"/>Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)) becomes predictable, lean, and fast.

When your code produces messy plans, Spark shuffles more than necessary, and projects pile up into deep, expensive stacks. Filters arrive late instead of early, joins explode into wide, slow operations, and the DAG becomes tangled and expensive.

The difference between a fast job and a slow job is not “faster hardware.” It’s the structure of the plan Spark generates from your code. This handbook teaches you to shape that plan deliberately through scenarios.

### Who This Handbook Is For

This handbook is written for:

- **Data engineers** building production ETL pipelines who want to move beyond trial-and-error tuning and understand *why* jobs perform the way they do
- **Analytics engineers** working with large datasets in Databricks, EMR, or Glue who need to optimize Spark jobs but don't have time for thousand-page reference manuals
- **Data scientists** transitioning from pandas to PySpark who find themselves writing code that technically runs but takes forever
- **Anyone** who has stared at the Spark UI, seen mysterious "Exchange" nodes in the DAG, and wondered, *"Why is this shuffling so much data?"*

You should already be comfortable writing basic PySpark code , creating DataFrames, applying transformations, running aggregations. This handbookbook won't teach you Spark syntax. Instead, it teaches you how to write transformations that work *with* the optimizer, not against it.

### How This Handbook Is Structured

We’ll start with foundations, then move on to real-world scenarios.

Chapters 1-3 build your mental model. You'll learn what logical plans are, how they connect to physical execution, and how to read the plan output that Spark shows you. These chapters are short and focused – just enough theory to make the practical scenarios meaningful.

Chapter 4 is the heart of the handbook. It contains 15 real-world scenarios, organized by category. Each scenario shows you a common performance problem, explains what's happening in the logical plan, and demonstrates the better approach. You'll see before-and-after code, plan comparisons, and clear explanations of why one approach outperforms another.

### What You'll Learn

By the end of this handbook, you'll be able to:

- Read and interpret Spark's logical, optimized, and physical plans
- Identify expensive operations before running your code
- Restructure transformations to minimize shuffles
- Choose the right join strategies for your data
- Avoid common pitfalls that cause memory issues and slow performance
- Debug production issues by examining execution plans

More importantly, you'll develop a Spark mindset, an intuition for how your code translates to cluster operations. You'll stop writing code that "should work" and start writing code that you *know* will work efficiently.

::: note Technical Prerequisites

I assume that you’re familiar with the following concepts before proceeding:

1. Python fundamentals
2. PySpark basics
    - Creating DataFrames and reading data from files
    - Basic DataFrame operations: select, filter, withColumn, groupBy, join
    - Writing DataFrames back to storage
3. Basic Spark concepts
    - Basic understanding of Spark applications, jobs, stages, and tasks
    - Basic understanding of the difference between transformations and actions
    - Understanding. of partitions and shuffles
4. AWS Glue (Good to have)

:::

---

## Table of Contents

2. [Chapter 1: The Spark Mindset: Why Plans Matter](#heading-chapter-1-the-spark-mindset-why-plans-matter)
3. [Chapter 2: Understanding the Spark Execution Flow](#heading-chapter-2-understanding-the-spark-execution-flow)
4. [Chapter 3: Reading and Debugging Plans Like a Pro](#heading-chapter-3-reading-and-debugging-plans-like-a-pro)
5. [Chapter 4: Writing Efficient Transformations](#heading-chapter-4-writing-efficient-transformations)

---

## Chapter 1: The Spark Mindset: Why Plans Matter

This chapter isn’t about Spark theory or internals. It’s about understanding Spark Plans, and seeing Spark the way the engine sees your code. Once you understand how Spark builds and optimizes a logical plan, optimization stops being trial and error and becomes intentional engineering.

Behind every simple transformation, Spark quietly redraws its internal blueprint. Every transformation you write from "*withColumn*" to join changes that plan. When the plan is efficient, Spark flies, but when it’s messy, Spark crawls.

### The Invisible Layer Behind Every Transformation

When you write PySpark code, it feels like you’re chaining operations step by step. In reality, Spark isn’t executing those lines. It’s quietly building a blueprint, a logical plan describing *what* to do, not *how*.

Once this plan is built, the Catalyst Optimizer analyzes it, rearranges operations, eliminates redundancies, and produces an optimized plan. Catalyst is Spark’s query optimization engine.

Every DataFrame or SQL operation we write, such as select, filter, join, groupBy, is first converted into a logical plan. Catalyst then analyzes and transforms this plan using a set of rule-based optimizations, such as predicate pushdown, column pruning, constant folding, and join reordering. The result is an optimized logical plan, which Spark later converts into a physical execution plan. Finally, Spark translates that into a physical plan of what your cluster actually runs. This invisible planning layer decides the job’s performance more than any configuration setting.

### From Logical to Optimized to Physical Plans

When you run `df.explain(True)`, Spark actually shows you four stages of reasoning:

#### 1. Logical Plan

The logical plan is the first stage where the initial translation of the code results in a tree structure that shows what operations need to happen, without worrying about how to execute them efficiently. It’s a blueprint of the query’s logic before any optimization or physical planning occurs.

This:

```py
df.filter(col('age') > 25) \
  .select('firstname', 'country') \
  .groupby('country') \
  .count() \
  .explain(True)
```

results in the following logical plan:

```py
== Parsed Logical Plan ==
'Aggregate ['country], ['country, 'count(1) AS count#108]
+- Project [firstname#95, country#97]
   +- Filter (age#96L > cast(25 as bigint))
      +- LogicalRDD [firstname#95, age#96L, country#97], false
```

#### 2. Analyzed Logical Plan

The analyzed logical plan is the second stage in Spark’s query optimization. In this stage, Spark validates the query by checking if tables and columns actually exist in the Catalog and resolving all references. It converts all the unresolved logical plans into a resolved one with correct data types and column bindings before optimization.

#### 3. Optimized Logical Plan

The optimized logical plan is where Spark's Catalyst optimizer improves the logical plan by applying smart rules like filtering data early, removing unnecessary columns, and combining operations to reduce computation. It's the smarter, more efficient version of your original plan that will execute faster and use fewer resources.

Let’s understand using a simple code example:

```py
df.select('firstname', 'country') \
  .groupby('country') \
  .count() \
  .filter(col('country') == 'USA') \
  .explain(True)
```

Here’s the parsed logical plan:

```py
== Parsed Logical Plan ==
'Filter '`=`('country, USA)
+- Aggregate [country#97], [country#97, count(1) AS count#122L]
   +- Project [firstname#95, country#97]
      +- LogicalRDD [firstname#95, age#96L, country#97], false
```

::: info What this means

- Spark first projects firstname and country
- Then aggregates by country
- Then applies the filter country = 'USA' **after** aggregation

:::

(because that’s how you wrote it).

Here’s the optimized logical plan:

```py
== Optimized Logical Plan ==
Aggregate [country#97], [country#97, count(1) AS count#122L]
+- Project [country#97]
   +- Filter (isnotnull(country#97) AND (country#97 = USA))
      +- LogicalRDD [firstname#95, age#96L, country#97], false
```

::: important Key improvements Catalyst applied

- Filter pushdown: The filter country = 'USA' is pushed below the aggregation, so Spark only groups U.S. rows.
- Column pruning: “firstname” is automatically removed because it’s never used in the final output.
- Cleaner projection: Intermediate columns are dropped early, reducing I/O and in-memory footprint.

:::

#### 4. Physical Plan

The physical plan is Spark's final execution blueprint that shows exactly how the query will run: which specific algorithms to use, how to distribute work across machines, and the order of low-level operations. It's the concrete, executable version of the optimized logical plan, translated into actual Spark operations like “ShuffleExchange”, “HashAggregate”, and “FileScan” that will run on your cluster.

Catalyst may, for example:

- Fold constants (col("x") \* 1 → col("x"))
- Push filters closer to the data source
- Replace a regular join with a broadcast join when data fits in memory

Once the physical plan is finalized, Spark’s scheduler converts it into a DAG of stages and tasks that run across the cluster. Understanding that lineage, from your code → plan → DAG, is what separates fast jobs from slow ones.

### How to Read a Logical Plan

A logical plan prints as a tree: the bottom is your data source, and each higher node represents a transformation.

| **Node** | **Meaning** |
| --- | --- |
| Relation / LogicalRDD | Data source, the initial DataFrame |
| Project | Column selection and transformation (select, withColumn) |
| Filter | Row filtering based on conditions (where, filter) |
| Join | Combining two DataFrames (join, union) |
| Aggregate | GroupBy and aggregation operations (groupBy, agg) |
| Exchange | Shuffle operation (data redistribution across partitions) |
| Sort | Ordering data (orderBy, sort) |

Each node represents a transformation. Execution flows from the bottom up. Let's understand with a basic example:

```py
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

spark = SparkSession.builder.appName("Practice").getOrCreate()

employees_data = [
    (1, "John", "Doe", "Engineering", 80000, 28, "2020-01-15", "USA"),
    (2, "Jane", "Smith", "Engineering", 85000, 32, "2019-03-20", "USA"),
    (3, "Alice", "Johnson", "Sales", 60000, 25, "2021-06-10", "UK"),
    (4, "Bob", "Brown", "Engineering", 90000, 35, "2018-07-01", "USA"),
    (5, "Charlie", "Wilson", "Sales", 65000, 29, "2020-11-05", "UK"),
    (6, "David", "Lee", "HR", 55000, 27, "2021-01-20", "USA"),
    (7, "Eve", "Davis", "Engineering", 95000, 40, "2017-04-12", "Canada"),
    (8, "Frank", "Miller", "Sales", 70000, 33, "2019-09-25", "UK"),
    (9, "Grace", "Taylor", "HR", 58000, 26, "2021-08-15", "Canada"),
    (10, "Henry", "Anderson", "Engineering", 88000, 31, "2020-02-28", "USA")
]

df = spark.createDataFrame(employees_data,  
    ["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"])
```

#### Version A: withColumn → filter

In this version, we’re using a derived column "withColumn" and then applying a filter to the dataset. This ordering is logically correct and produces the expected result: it shows how introducing derived columns early affects the logical plan. This example shows what happens when Spark is asked to compute a new column before any rows are eliminated.

```py
df_filtered = df \
.withColumn('bonus', col('salary') * 82) \
.filter(col('age') > 35) \
.explain(True)
```

#### Parsed Logical Plan (Simplified)

```plaintext
Filter (age > 35)
└─ Project [*, (salary * 82) AS bonus]
   └─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

So what’s going on here? Execution flows from the bottom up.

- Spark first reads the LogicalRDD.
- Then applies the Project node, keeping all columns and adding bonus.
- Finally, the Filter removes rows where age ≤ 35.
This means Spark computes the bonus for every employee, even those who are later filtered out. It's harmless here, but costly on millions of rows, more computation, more I/O, more shuffle volume.

#### Version B: Filter → Project

In this version, we apply the filter before introducing the derived column. The idea is to show how pushing row-reducing operations earlier allows Catalyst to produce a leaner logical plan. Compared to Version A, this example demonstrates that the same logic, written in a different order, can significantly reduce the amount of work Spark needs to perform.

```py
df_filtered = df \
.filter(col('age') > 35) \
.withColumn('bonus', col('salary') * 82) \
.explain(True)
```

#### Parsed Logical Plan (Simplified)

```plaintext
Project [*, (salary * 82) AS bonus]
└─ Filter (age > 35)
└─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

So what’s going on here?

- Spark starts from the LogicalRDD.
- It immediately applies the Filter, reducing the dataset to only employees with age > 35.
- Then the Project node adds the derived column bonus for this smaller subset.

Now the Filter sits below the Project in the plan, cutting data movement and minimizing computation. Spark prunes data first, then derives new columns. This order reduces both the volume of data processed and the amount transferred, leading to a lighter and faster plan.

### Why You Should Look at the Plan Every Time by running `df.explain(True)`

This is the quickest way to spot performance issues *before* they hit production. It shows:

- Whether filters sit in the right place.
- How many Project nodes exist (each adds overhead).
- Where Exchange nodes appear (these are shuffle boundaries).
- If Catalyst pushed filters or rewrote joins as expected.

A quick `explain()` takes seconds, while debugging a bad shuffle in production takes hours. Run `explain()` whenever you add or reorder transformations. The plan never lies.

#### What Spark Does Under the Hood

Catalyst can sometimes reorder simple filters automatically, but once you use UDFs, nested logic, or joins, it often can’t. That’s why the best habit is to write transformations in a way that already makes sense to the optimizer. Filter early, avoid redundant projections, and keep plans as shallow as possible.

Optimizing Spark isn’t about tuning cluster configs – it’s about writing code that yields efficient plans. If your plan shows late filters, too many projections, or multiple Exchange nodes, it’s already explaining why your job will run slow.

---

## Chapter 2: Understanding the Spark Execution Flow

In Chapter 1, you learned how Spark interprets your transformations into logical plans – blueprints of what the job intends to do.

But Spark doesn't stop there. It must translate those plans into distributed actions across a cluster of executors, coordinate data movement, and handle any failures that may occur.

This chapter reveals what happens when that plan leaves the driver: how Spark breaks your job into stages, tasks, and a directed acyclic graph (DAG) that actually runs.

By the end, you’ll understand why some operations shuffle terabytes while others fly, and how to predict it before execution begins.

### From Plans to Stages to Tasks

A Spark job evolves through three conceptual layers:

| **Layer** | **What It Represents** | **Example View** |
| --- | --- | --- |
| Plan | The optimized logical + physical representation of your query | Read → Filter → Join → Aggregate |
| Stage | A contiguous set of operations that can run without shuffling data | “Map Stage” or “Reduce Stage” |
| Task | The smallest unit of work, one per partition per stage | “Process Partition 7 of Stage 3” |

#### The Execution Trigger: Actions vs Transformations

Here's the critical distinction that determines when execution actually begins:

```py
df1 = spark.paraquet("data.paraquet")
df2 = spark.filter(col("age") > 25)
df3 = spark.groupby("city").count()
```

Nothing executes yet! Spark just builds up the logical plan, adding each transformation as a node in the plan tree. No data is read, no filters run, no shuffles happen.

#### Actions Trigger Execution

Spark transformations are lazy. When a sequence of DataFrame operations is defined, a logical plan is created, but no computation takes place. It’s only when Spark encounters an action, an operation that needs a result to be returned to the driver or written out, that execution takes place.

For example:

```py
result = df3.collect()
```

At this stage, Spark materializes the logical plan, applies optimizations, creates a physical plan, and executes the job. Until Spark is asked to **act**, such as `collect()`, `count()`, or write(), it’s just describing what it needs to do – but it’s not actually doing it.

#### The Complete Execution Flow

Spark execution is initiated after the execution of an operation such as `collect()`. The driver then sends the optimized physical plan to the SparkContext, which is then forwarded to the DAG Scheduler. The physical plan is analyzed to determine shuffle boundaries created by wide operations such as *groupBy* or *orderBy*.

The plan is then divided into stages that contain narrow operations. These stages are sent to the Task Scheduler as a TaskSet. Each stage has a single task per partition.

The tasks are then assigned to the cores of the executor based on data locality. The execution of the tasks is then initiated. The execution of the stages is initiated after the completion of the previous stage. The final stage is initiated after the completion of the previous stage. The results of the final stage are then returned to the driver or stored.

#### What Triggers a Shuffle

![Comparison of Spark shuffle behavior before and after groupBy](https://cdn.hashnode.com/res/hashnode/image/upload/v1769457412199/308bc894-66a9-4c01-aae1-9ae42e64d32c.png)

A shuffle occurs when Spark needs to redistribute data across partitions, typically because the operation requires grouping, joining, or repartitioning data in a way that can’t be done locally within existing partitions.

Common shuffle triggers:

| **Operation** | **Why it Shuffles** |
| --- | --- |
| `groupBy()`, `reduceByKey()` | Data with the same key must co-locate for aggregation |
| `join()` | Matching keys may reside in different partitions |
| `orderBy()` / `sort()` | Requires global ordering across all partitions |
| `distinct()` | Needs comparison of all values across partitions |
| `repartition(n)` | Explicit redistribution to a new number of partitions |

```py
df.groupBy("user_id”) \
  .agg(sum("amount"))
```

In Stage 1 (Map), each task performs a partial aggregation on its partition and writes a shuffle file to disk. During the shuffle, each executor retrieves these files across the network such that all records with the same `hash(user_id) % numPartitions` are colocated.

In Stage 2 (Reduce), each task performs a final aggregation on its partitioned data and writes back to disk. Because Spark has tracked this process as a DAG, a failed task can re-read only the affected shuffle files instead of re-computing the entire DAG.

In practice, a healthy job has 2-6 stages. Seeing 20+ stages for such simple logic usually means unnecessary shuffles or bad partitioning.

#### Why Shuffles Create Stage Boundaries

Shuffles force data to move across the network between executors. Spark cannot continue processing until:

- All tasks in the current stage write their shuffle output to disk
- The shuffle data is available for the next stage to read over the network

This dependency creates a natural boundary – so a new stage begins after every shuffle. The DAG Scheduler uses these boundaries to determine where stages must wait for previous stages to complete.

#### Common Performance Bottlenecks

| **Bottleneck Type** | **Symptom** | **Solution** |
| --- | --- | --- |
| Data skew | Few tasks run much longer | Use salting, split hot keys, or AQE skew join |
| Small files | Too many tasks, high overhead | Coalesce or repartition after read |
| Large shuffle | High network I/O, spill to disk | Filter early, broadcast small tables, reduce cardinality |
| Unnecessary stages | Extra Exchange nodes in plan | Combine operations, remove redundant repartitions |
| Inefficient file formats | Slow reads, no predicate pushdown | Use Parquet or ORC with partitioning |
| Complex data types | Serialization overhead, large objects | Use simple types, cache in serialized form |

Let’s ground this with a small but realistic pattern using the same employees DataFrame. **Goal:** average salary per department and country, only for employees older than 30. Naïve approach:

```py
from pyspark.sql.functions import col, when, avg

df_dept_country = df.select("department", "country").distinct()

df_result = (
    df.withColumn(
        "age_group",
        when(col("age") < 30, "junior")
        .when(col("age") < 40, "mid")
        .otherwise("senior")
    )
    .join(df_dept_country, ["department"], "inner")
    .groupBy("department", "country")
    .agg(avg("salary").alias("avg_salary"))
```

This looks harmless, but:

- The join on "department" introduces a wide dependency → shuffle #1.
- The groupBy("department", "country") introduces another wide dependency → shuffle #2.
So we have two shuffles for what should be a simple aggregation. If you run explain on the df_result, you’ll see two exchange nodes, each marking a shuffle and stage boundary.

#### Optimized Approach

We can do better by filtering early, broadcasting the small dimension (`df_dept_country`), and keeping only one global shuffle for aggregation.

```py
from pyspark.sql.functions import broadcast

df_dept_country = df.select("department", "country").distinct()

df_result_optimized = (
    df.filter(col("age") > 30)
        .join(broadcast(df_dept_country), ["department"], "inner")
        .groupBy("department", "country")
        .agg(avg("salary").alias("avg_salary"))
)
```

::: info What changed

- `filter(col("age") > 30)` is narrow and runs before any shuffle.
- `broadcast(df_dept_country)` avoids a shuffle for the join.
- Only the `groupBy("department", "country")` causes a single shuffle.

:::

Now explain shows just one Exchange.

| **Version** | **Shuffles** | **Stages** | **Notes** |
| --- | --- | --- | --- |
| Naïve | 2 | ~4 (2 map + 2 reduce) | Join shuffle + groupBy shuffle = double overhead |
| Optimized | 1 | ~2 (1 map + 1 reduce) | Broadcast join avoids shuffle. Only groupBy shuffles |

---

## Chapter 3: Reading and Debugging Plans Like a Pro

As explained in Chapter 1, Spark executes transformations based on three levels: the logical plan, the optimized logical plan (Catalyst), and the physical plan. This chapter will expand on this explanation and concentrate on the impact of the logical plan on shuffle and execution performance.

By now, you understand how Spark builds and *executes* plans. But reading those plans and instantly spotting inefficiencies is the real superpower of a performance-focused data engineer.

Spark’s `explain()` output isn’t random jargon. It’s a precise log of Spark’s thought process. Once you learn to read it, every optimization becomes obvious.

### Three Layers in Spark

As we talked about above, every Spark plan has three key views, printed when you call `df.explain(True)`. Let’s review them now:

1. Parsed Logical Plan: The raw intent Spark inferred from your code. It may include unresolved column names or expressions.
2. Analyzed / Optimized Logical Plan: After Spark applies Catalyst optimizations: constant folding, predicate pushdown, column pruning, and plan rearrangements.
3. Physical Plan: What your executors actually run: joins, shuffles, exchanges, scans, and code-generated operators.

Each stage narrows the gap between what you *asked* Spark to do and what Spark decides to do.

```py
df_avg = df.filter(col("age") > 30)
        .groupBy("department")
        .agg(avg("salary").alias("avg_salary"))

df_avg.explain(True)
```

#### 1. Parsed Logical Plan

```plaintext
== Parsed Logical Plan ==
'Aggregate ['department], ['department, 'avg('salary) AS avg_salary#8]
+- Filter (age#5L > cast(30 as bigint))
   +- LogicalRDD [id#0L, firstname#1, lastname#2, department#3, salary#4L, age#5L, hire_date#6, country#7], false
```

::: info How to read this

- Bottom → data source (LogicalRDD).
- Middle → Filter: Spark hasn’t yet optimized column references.
- Top → Aggregate: high-level grouping intent.

:::

At this stage, the plan may include unresolved symbols (like 'department or 'avg('salary)), meaning Spark hasn’t yet validated column existence or data types.

#### 2. Optimized Logical Plan

```plaintext
== Optimized Logical Plan ==
Aggregate [department#3], [department#3, avg(salary#4L) AS avg_salary#8]
+- Project [department#3, salary#4L]
   +- Filter (isnotnull(age#5L) AND (age#5L > 30))
      +- LogicalRDD [id#0L, firstname#1, lastname#2, department#3, salary#4L, age#5L, hire_date#6, country#7], false
```

Here, Catalyst has done its job:

- Column IDs (#11, #12L) are resolved.
- Unused columns are pruned – no need to carry them forward.
- The plan now accurately reflects Spark’s optimized logical intent.

If you ever wonder whether Spark pruned columns or pushed filters, this is the section to check.

#### 3. Physical Plan

```plaintext
== Physical Plan ==
AdaptiveSparkPlan isFinalPlan=false
+- HashAggregate(keys=[department#3], functions=[avg(salary#4L)], output=[department#3, avg_salary#8])
   +- Exchange hashpartitioning(department#3, 200), ENSURE_REQUIREMENTS, [plan_id=19]
      +- HashAggregate(keys=[department#3], functions=[partial_avg(salary#4L)], output=[department#3, sum#20, count#21L])
         +- Project [department#3, salary#4L]
            +- Filter (isnotnull(age#5L) AND (age#5L > 30))
               +- Scan ExistingRDD[id#0L,firstname#1,lastname#2,department#3,salary#4L,age#5L,hire_date#6,country#7]
```

::: info Breakdown

- Scan ExistingRDD → Spark reading from the in-memory DataFrame.
- Filter → narrow transformation, no shuffle.
- HashAggregate → partial aggregation per partition.
- Exchange → wide dependency: data is shuffled by department.
- Top HashAggregate → final aggregation after shuffle.

:::

This structure – partial agg → shuffle → final agg – is Spark’s default two-phase aggregation pattern.

#### Recognizing Common Nodes

| **Node / Operator** | **Meaning** | **Optimization Hint** |
| --- | --- | --- |
| Project | Column selection or computed fields | Combine multiple withColumn() into one select() |
| Filter | Predicate on rows | Push filters as low as possible in the plan |
| Join | Combine two DataFrames | Broadcast smaller side if < 10 MB |
| Aggregate | GroupBy, sum, avg, count | Filter before aggregating to reduce cardinality |
| Exchange | Shuffle / data redistribution | Minimize by filtering early, using broadcast join |
| Sort | OrderBy, sort | Avoid global sorts; use within partitions if possible |
| Window | Windowed analytics (row_number, rank) | Partition on selective keys to reduce shuffle |

Repeated invocations of withColumn stack multiple Project nodes, which increases the plan depth. Instead, combine these invocations using select.

Multiple Exchange nodes imply repeated data shuffles. You can eliminate these by broadcasting the data or filtering.

Multiple scans of the same table within a single operation imply that some caching of strategic intermediates is lacking.

And frequent SortMergeJoin operations imply that Spark is unnecessarily sorting and shuffling the data. You can eliminate these by broadcasting the smaller dataframe or bucketing.

#### Debugging Strategy: Read Plans from Top to Bottom

Remember: Spark *executes* plans from bottom up (from data source to final result). But when you're debugging, you read from the top down (from the output schema back to the root cause). This reversal is intentional: you start with what's wrong at the output level, then trace backward through the plan to find where the inefficiency was introduced.

When debugging a slow job:

- Start at the top: Identify output schema and major operators (HashAggregate, Join, and so on).
- Scroll for Exchanges: Count them. Each = stage boundary. Ask “Why do I need this shuffle?”
- Trace backward: See if filters or projections appear below or above joins.
- Look for duplication: Same scan twice? Missing cache? Re-derived columns?
- Check join strategy: If it’s SortMergeJoin but one table is small, force a `broadcast()`.
- Re-run explain after optimization: You should literally see the extra nodes disappear.

#### Catalyst Optimizer in Action

Catalyst applies dozens of rules automatically. Knowing a few helps you interpret what changed:

| **Optimization Rule** | **Example Transformation** |
| --- | --- |
| Predicate Pushdown | Moves filters below joins/scans |
| Constant Folding | Replaces salary \* 1 with salary |
| Column Pruning | Drops unused columns early |
| Combine Filters | Merges consecutive filters into one |
| Simplify Casts | Removes redundant type casts |
| Reorder Joins / Join Reordering | Changes join order for cheaper plan |

Putting it all together: every plan tells a story:

![Spark Plans and Stages](https://cdn.hashnode.com/res/hashnode/image/upload/v1769458525411/64fa30a4-b16e-4aed-8c04-d12b476d9ae6.png)

As you progress through the practical scenarios in Chapter 4, read every plan before and after. Your goal isn't memorization – it's intuition.

---

## Chapter 4: Writing Efficient Transformations

Every Spark job tells a story, not in code, but in plans. By now, you've seen how Spark interprets transformations (Chapter 1), how it executes them through stages and tasks (Chapter 2), and how to read plans like a detective (Chapter 3). Now comes the part where you apply that knowledge: writing transformations that yield efficient logical plans.

This chapter is the heart of the handbook. It's where we move from understanding Spark's mind to writing code that speaks its language fluently.

### Why Transformations Matter

In PySpark, most performance issues don’t start in clusters or configurations. They start in transformations: the way we chain, filter, rename, or join data. Every transformation reshapes the logical plan, influencing how Spark optimizes, when it shuffles, and whether the final DAG is streamlined or tangled.

::: note A good transformation sequence

- Keeps plans shallow, not nested.
- Applies filters early, not after computation.
- Reduces data movement, not just data size.
- Let’s Catalyst and AQE optimize freely, without user-induced constraints.

:::

A bad one can double runtime, and you won't see it in your code, only in your plan.

### The Goal of this Chapter

We’ll explore a series of real-world optimization scenarios, drawn from production ETL and analytical pipelines, each showing how a small change in code can completely reshape the logical plan and execution behavior.

Each scenario is practical and short, following a consistent structure. By the end of this chapter, you’ll be able to *see* optimization opportunities the moment you write code, because you’ll know exactly how they alter the logical plan beneath.

### Before You Dive In:

Open a Spark shell or notebook. Load your familiar employees DataFrame. Run every example, and compare the explain("formatted") output before and after the fix. Because in this chapter, performance isn’t about more theory, it’s about seeing the difference in the plan and feeling the difference in execution time.

### Scenario 1: Rename in One Pass: withColumnRenamed() vs toDF()

If you’ve worked with PySpark DataFrames, you’ve probably had to rename columns, either by calling withColumnRenamed() repeatedly or by using toDF() in one shot.

At first glance, both approaches produce identical results: the columns have the new names you wanted. But beneath the surface, Spark treats them very differently – and that difference shows up directly in your logical plan.

```py
df_renamed = (df.withColumnRenamed("id", "emp_id")
    .withColumnRenamed("firstname", "first_name")
    .withColumnRenamed("lastname", "last_name")
    .withColumnRenamed("department", "dept")
    .withColumnRenamed("salary", "base_salary")
    .withColumnRenamed("age", "age_years")
    .withColumnRenamed("hire_date", "hired_on")
    .withColumnRenamed("country", "country_code")
)
```

This is simple and readable. But Spark builds the plan step by step, adding one Project node for every rename. Each Project node copies all existing columns, plus the newly renamed one. In large schemas (hundreds of columns), this silently bloats the plan.

#### Logical Plan Impact

```plaintext
Project [emp_id, first_name, last_name, dept, base_salary, age_years, hired_on, country_code]

└─ Project [id, first_name, last_name, dept, base_salary, age_years, hired_on, country_code]

└─ Project [id, firstname, last_name, dept, base_salary, age_years, hired_on, country_code]

└─ Project [id, firstname, lastname, dept, base_salary, age_years, hire_date, country_code]

└─ Project [id, firstname, lastname, department, base_salary, age_years, hire_date, country]

└─ Project [id, firstname, lastname, department, salary, age_years, hire_date, country]

└─ Project [id, firstname, lastname, department, salary, age, hire_date, country]

└─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

Each rename adds a new Project layer, deepening the DAG. Spark now has to materialize intermediate projections before applying the next one. You can see this by running: `df.explain(True)`.

#### The Better Approach: Rename Once with `toDF()`

Instead of chaining multiple renames, rename all columns in a single pass:

```py
new_cols = ["id", "first_name", "last_name", "department",
            "salary", "age", "hired_on", "country"]

df_renamed = df.toDF(*new_cols)
```

#### Logical Plan Impact

```plaintext
Project [id, first_name, last_name, department, salary, age, hired_on, country]

└─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

Now there’s just one Project node, which means one projection over the source data. This gives us a flatter, more efficient plan.

#### Under the Hood: What Spark Actually Does

Every time you call `withColumnRenamed()`, Spark rewrites the entire projection list. Catalyst treats the rename as a full column re-selection from the previous node, not as a light-weight alias update. When you chain several renames, Catalyst duplicates internal column metadata for each intermediate step.

By contrast, `toDF()` rebases the schema in a single action. Catalyst interprets it as a single schema rebinding, so no redundant metadata trees are created.

#### Real-World Timing: Glue Job Benchmark

To see if chained withColumnRenamed calls add real overhead, here's a simple timing test performed on a Glue job using a DataFrame with 1M rows. First using withColumnRenamed:

```py :collapsed-lines
import time
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("MillionRowsRenameTest").getOrCreate()

employees_data = [
    (1, "John", "Doe", "Engineering", 80000, 28, "2020-01-15", "USA"),
    (2, "Jane", "Smith", "Engineering", 85000, 32, "2019-03-20", "USA"),
    (3, "Alice", "Johnson", "Sales", 60000, 25, "2021-06-10", "UK"),
    (4, "Bob", "Brown", "Engineering", 90000, 35, "2018-07-01", "USA"),
    (5, "Charlie", "Wilson", "Sales", 65000, 29, "2020-11-05", "UK"),
    (6, "David", "Lee", "HR", 55000, 27, "2021-01-20", "USA"),
    (7, "Eve", "Davis", "Engineering", 95000, 40, "2017-04-12", "Canada"),
    (8, "Frank", "Miller", "Sales", 70000, 33, "2019-09-25", "UK"),
    (9, "Grace", "Taylor", "HR", 58000, 26, "2021-08-15", "Canada"),
    (10, "Henry", "Anderson", "Engineering", 88000, 31, "2020-02-28", "USA")
]

multiplied_data = [(i, f"firstname_{i}", f"lastname_{i}",
                    employees_data[i % 10][3],  # department
                    employees_data[i % 10][4],  # salary
                    employees_data[i % 10][5],  # age
                    employees_data[i % 10][6],  # hire_date
                    employees_data[i % 10][7])  # country
                   for i in range(1, 1_000_001)]

df = spark.createDataFrame(multiplied_data,
                           ["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"])

start = time.time()
df1 = (df
       .withColumnRenamed("firstname", "first_name")
       .withColumnRenamed("lastname", "last_name")
       .withColumnRenamed("department", "dept_name")
       .withColumnRenamed("salary", "annual_salary")
       .withColumnRenamed("age", "emp_age")
       .withColumnRenamed("hire_date", "hired_on")
       .withColumnRenamed("country", "work_country"))

print("withColumnRenamed Count:", df1.count())
print("withColumnRenamed time:", round(time.time() - start, 2), "seconds")
```

Using `toDF`:

```py
start = time.time()
df2 = df.toDF("id", "first_name", "last_name", "dept_name", "annual_salary", "emp_age", "hired_on", "work_country")
print("toDF Count:", df2.count())
print("toDF time:", round(time.time() - start, 2), "seconds")

spark.stop()
```

| **Approach** | **Number of Project Nodes** | **Glue Execution Time (1M rows)** | **Plan Complexity** |
| --- | --- | --- | --- |
| Chained `withColumnRenamed()` | 8 nodes | ~12 seconds | Deep, nested |
| Single `toDF()` | 1 node | ~8 seconds | Flat, simple |

The difference becomes important at larger sizes or in complex pipelines, especially on managed runtimes such as AWS Glue (where planning overhead becomes important), or when tens of millions of rows are involved, where each additional Project increases column resolution, metadata work, and DAG height. And since Spark can’t collapse chained projections when column names are changed, renaming all columns in one go with toDF() results in a flatter logical and physical plan: one rename, one projection, and faster execution.

### Scenario 2: Reusing Expressions

Sometimes Spark jobs run slower, not because of shuffles or joins, but because the same computation is performed repeatedly within the logical plan. Every time you repeat an expression, say, `col("salary") * 0.1` in multiple places, Spark treats it as a *new* derived column, expanding the logical plan and forcing redundant work.

#### The Problem: Repeated Expressions

Let’s say we’re calculating bonus and total compensation for employees:

```py
df_expr = (
    df.withColumn("bonus", col("salary") * 0.10)
      .withColumn("total_comp", col("salary") + (col("salary") * 0.10))
)
```

At first glance, it’s simple enough. But Spark’s optimizer doesn’t automatically know that the (`col("salary") * 0.10`) in the second column is identical to the one computed in the first. Both get evaluated separately in the logical plan.

::: tip Simplified Logical Plan:

```plaintext
Project [id, firstname, lastname, department,

salary, age, hire_date, country,

(salary * 0.10) AS bonus,

(salary + (salary * 0.10)) AS total_comp]

└─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

While this looks compact, Spark must compute (`salary * 0.10`) twice, once for bonus, again inside total_comp. For a large dataset (say 100 M rows), that’s two full column evaluations. The waste compounds when your expression is complex, imagine parsing JSON, applying UDFs, or running date arithmetic multiple times.

#### The Better Approach: Compute Once, Reuse Everywhere

Compute the expression once, store it as a column, and reference it later:

```py
df_expr = (
    df.withColumn("bonus", col("salary") * 0.10)
      .withColumn("total_comp", col("salary") + col("bonus"))
)
```

::: tip Simplified Logical Plan

```plaintext
Project [id, firstname, lastname, department,

salary, age, hire_date, country,

(salary * 0.10) AS bonus,

(salary + bonus) AS total_comp]

└─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

Now Spark calculates (`salary * 0.10`) once, stores it in the bonus column, and reuses that column when computing total_comp. This single change cuts CPU cost and memory usage.

#### Under the Hood: Why Repetition Hurts

Spark’s Catalyst optimizer doesn’t automatically factor out repeated expressions across different columns. Each `withColumn()` creates a new Project node with its own expression tree. If multiple nodes reuse the same arithmetic or function, Catalyst re-evaluates them independently.

On small DataFrames, this cost is invisible. On wide, computation-heavy jobs (think feature engineering pipelines), it can add hundreds of milliseconds per task.

Each redundant expression increases:

- Catalyst’s internal expression resolution time
- The size of generated Java code in WholeStageCodegen
- CPU cycles per row, since Spark cannot share intermediate results between columns in the same node

#### Real-World Benchmark: AWS Glue

We tested this pattern on AWS Glue (Spark 3.3) with 10 million rows and a simulated expensive computation on the similar dataset we used in Scenario 1.

```py :collapsed-lines
df = spark.createDataFrame(multiplied_data,
                           ["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"])

expr = sqrt(exp(log(col("salary") + 1)))

start = time.time()

df_repeated = (
    df.withColumn("metric_a", expr)
      .withColumn("metric_b", expr * 2)
      .withColumn("metric_c", expr / 10)
)

df_repeated.count()
time_repeated = round(time.time() - start, 2)

start = time.time()

df_reused = (
    df.withColumn("metric", expr)
      .withColumn("metric_a", col("metric"))
      .withColumn("metric_b", col("metric") * 2)
      .withColumn("metric_c", col("metric") / 10)
)

df_reused.count()

print("Repeated expr time:", time_repeated, "seconds")
print("Reused expr time:", round(time.time() - start, 2), "seconds")

spark.stop()
```

| **Approach** | **Project Nodes** | **Execution Time (10M rows)** | **Expression Evaluations** |
| --- | --- | --- | --- |
| Repeated expression | Multiple (nested) | ~18 seconds | 3x per row |
| Compute once, reuse | Single | ~11 seconds | 1x per row |

The performance gap widens further with genuinely expensive expressions (like regex extraction, JSON parsing, or UDFs).

#### Physical Plan Implication

In the physical plan, repeated expressions expand into multiple Java blocks within the same WholeStageCodegen node:

```plaintext
*(1) Project [sqrt(exp(log(salary + 1))) AS metric_a,

(sqrt(exp(log(salary + 1))) * 2) AS metric_b,

(sqrt(exp(log(salary + 1))) / 10) AS metric_c, ...]
```

Spark literally embeds three copies of the same logic.

Each is JIT-compiled separately, leading to:

- Larger generated Java classes
- Higher CPU utilization
- Longer code-generation time before tasks even start

When reusing a column, Spark generates one expression and references it by name, dramatically shrinking the codegen footprint. If you have complex transformations (nested when, UDFs, regex extractions, and so on), compute them once and reuse them with col("alias"). For even heavier expressions that appear across multiple pipelines, consider persisting the intermediate.

DataFrame:

```py
df_features = df.withColumn("complex_feature", complex_logic)

df_features.cache()
```

That cache can save multiple recomputations across downstream steps.

### Scenario 3: Batch Column Ops

Most PySpark pipelines don’t die because of one big, obvious mistake. They slow down from a thousand tiny cuts: one extra `withColumn()` here, another there, until the logical plan turns into a tall stack of projections.

On its own, `withColumn()` is fine. The problem is how we use it:

- 10–30 chained calls in a row
- Re-deriving similar expressions
- Spreading logic across many tiny steps

This scenario shows how batching column operations into a single `select()` produces a flatter, cleaner logical plan that scales better and is easier to reason about.

#### The Problem: Chaining `withColumn()` Forever

```py
from pyspark.sql.functions import col, concat_ws, when, lit

df_transformed = (
    df.withColumn("full_name", concat_ws(" ", col("firstname"), col("lastname")))
      .withColumn("is_senior", when(col("age") >= 35, lit(1)).otherwise(lit(0)))
      .withColumn("salary_k", col("salary") / 1000.0)
      .withColumn("experience_band",
                  when(col("age") < 30, "junior")
                  .when((col("age") >= 30) & (col("age") < 40), "mid")
                  .otherwise("senior"))
      .withColumn("country_upper", col("country").upper())
)
```

It reads nicely, it runs, and everyone moves on. But under the hood, Spark builds this as multiple Project nodes, one per withColumn() call.

::: tip Simplified Logical Plan (Chained): Conceptually

```plaintext
Project [..., country_upper]

└─ Project [..., experience_band]

   └─ Project [..., salary_k]

      └─ Project [..., is_senior]

         └─ Project [..., full_name]

            └─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

Each layer re-selects all existing columns, adds one more derived column, and deepens the plan.

#### The Better Approach: Batch with select()

Instead of incrementally patching the schema, build it once.

```py
df_transformed = df.select(
    col("id"),
    col("firstname"),
    col("lastname"),
    col("department"),
    col("salary"),
    col("age"),
    col("hire_date"),
    col("country"),
    concat_ws(" ", col("firstname"), col("lastname")).alias("full_name"),
    when(col("age") >= 35, lit(1)).otherwise(lit(0)).alias("is_senior"),
    (col("salary") / 1000.0).alias("salary_k"),
    when(col("age") < 30, "junior")
        .when((col("age") >= 30) & (col("age") < 40), "mid")
        .otherwise("senior").alias("experience_band"),
    col("country").upper().alias("country_upper")
)
```

::: tip Simplified Logical Plan (Batched):

```plaintext
Project [id, firstname, lastname, department, salary, age, hire_date, country,

         full_name, is_senior, salary_k, experience_band, country_upper]

└─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

One Project. All derived columns *are* defined together. Flatter DAG. Cleaner plan.

#### Under the Hood: Why This Matters

Each `withColumn()` is syntactic sugar for: “Take the previous plan, and create a new Project on top of it.” So 10 withColumn`()` calls = 10 projections wrapped on top of each other.

Catalyst can sometimes collapse adjacent Project nodes, but:

- Not always (especially when aliases shadow each other).
- Not when expressions become complex or interdependent.
- Not when UDFs or analysis barriers appear.

Batching with `select()`:

- Gives Catalyst a single, complete view of all expressions.
- Enables more aggressive optimizations (constant folding, expression reuse, pruning).
- Keeps expression trees shallower and codegen output smaller.

Think of it as the difference between editing a sentence 10 times in a row and writing the final sentence once, cleanly.

#### Real-World Example: Using the Employees DF at Scale:

::: tabs

@tab:active Chained version (many `withColumn()`):

```py
from pyspark.sql.functions import col, concat_ws, when, lit, upper
import time

start = time.time()
df_chain = (
    df.withColumn("full_name", concat_ws(" ", col("firstname"), col("lastname")))
      .withColumn("is_senior", when(col("age") >= 35, 1).otherwise(0))
      .withColumn("salary_k", col("salary") / 1000.0)
      .withColumn("high_earner", when(col("salary") >= 90000, 1).otherwise(0))
      .withColumn("experience_band",
                  when(col("age") < 30, "junior")
                  .when((col("age") >= 30) & (col("age") < 40), "mid")
                  .otherwise("senior"))
      .withColumn("country_upper", upper(col("country")))
)

df_chain.count()
time_chain = round(time.time() - start, 2)
```

@tab Batched version (single `select()`):

```py
start = time.time()
df_batch = df.select(
    "id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country",
    concat_ws(" ", col("firstname"), col("lastname")).alias("full_name"),
    when(col("age") >= 35, 1).otherwise(0).alias("is_senior"),
    (col("salary") / 1000.0).alias("salary_k"),
    when(col("salary") >= 90000, 1).otherwise(0).alias("high_earner"),
    when(col("age") < 30, "junior")
        .when((col("age") >= 30) & (col("age") < 40), "mid")
        .otherwise("senior").alias("experience_band"),
    upper(col("country")).alias("country_upper")
)

df_batch.count()
time_batch = round(time.time() - start, 2)
```

:::

| **Approach** | **Logical Shape** | **Glue Execution Time (1M rows)** | **Notes** |
| --- | --- | --- | --- |
| Chained `withColumn()` | 6 nested Projects | ~14 seconds | Deep plan, more Catalyst work |
| Single `select()` | 1 Project | ~9 seconds | Flat planning, cleaner DAG |

The distinction is most evident when there are more derived columns, more complex expressions (UDFs, window functions), or when executing on managed runtimes such as AWS Glue.

In the chained cases, there are more Project nodes, code generation is fragmented, and expression evaluation is less amenable to global optimization.

In the batched cases, Spark generates a single Project node, more work is consolidated into a single WholeStageCodegen pipeline, code generation is reduced, the JVM is less stressed, and the plan is flatter and more amenable to optimization. This is not only cleaner, but it’s also faster, more reliable, and friendlier to Spark’s optimizer.

### Scenario 4: Early Filter vs Late Filter

Many pipelines apply transformations first, adding columns, joining datasets, or calculating derived metrics, before filtering records. That order looks harmless in code but can double or triple the workload at execution.

#### Problem: Late Filtering

```py
df_late = (
    df.withColumn("bonus", col("salary") * 0.1)
      .withColumn("salary_k", col("salary") / 1000)
      .filter(col("age") > 35)
)
```

This means Spark first computes all columns for every employee, then discards most rows.

::: tip Simplified Logical Plan:

```plaintext
Filter (age > 35)

└─ Project [id, firstname, lastname, department, salary, age, hire_date, country,

            (salary * 0.1) AS bonus,

            (salary / 1000) AS salary_k]

   └─ LogicalRDD [...]
```

:::

Catalyst can sometimes reorder this automatically, but when it can't (due to UDFs or complex logic), you're doing unnecessary work on data that's thrown away.

#### Better Approach: Early Filtering

```py
df_early = (
    df.filter(col("age") > 35)
      .withColumn("bonus", col("salary") * 0.1)
      .withColumn("salary_k", col("salary") / 1000)
)
```

::: tip Simplified Logical Plan

```py
Project [id, firstname, lastname, department, salary, age, hire_date, country,

         (salary * 0.1) AS bonus,

         (salary / 1000) AS salary_k]

└─ Filter (age > 35)

   └─ LogicalRDD [...]
```

:::

Now Spark prunes the dataset first, then applies transformations. The result: smaller intermediate data, less codegen, shorter logical plan, shorter DAG, and smaller shuffle footprint.

#### Real-World Benchmark: AWS Glue

::: tabs

@tab:active Late Filtering

```py
df = spark.createDataFrame(
    multiplied_data,
    ["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"]
)

start_late = time.time()

df_late = (
    df.withColumn("bonus", col("salary") * 0.1)
      .withColumn("salary_k", col("salary") / 1000)
      .filter(col("age") > 35)   
)

df_late.count()
time_late = round(time.time() - start_late, 2)
```

@tab Early Filtering

```py
start_early = time.time()

df_early = (
    df.filter(col("age") > 35)    
      .withColumn("bonus", col("salary") * 0.1)
      .withColumn("salary_k", col("salary") / 1000)
)

df_early.count()
time_early = round(time.time() - start_early, 2)

print("Late Filter Time:", time_late, "seconds")
print("Early Filter Time:", time_early, "seconds")

spark.stop()
```

:::

| **Approach** | **Rows Processed Before Filter** | **Execution Time (approx)** | **Notes** |
| --- | --- | --- | --- |
| Late filter | 1,000,000 (all rows) | ~14 seconds | Computes bonus and salary_k for all rows, then filters |
| Early filter | 300,000 (filtered subset) | ~9 seconds | Filters first, computes only for age > 35 |

The early filter approach processes significantly less data before the projection, leading to faster execution and less memory pressure.

Always filter as early as possible, before joins, aggregations, expensive transformations (such as UDFs or window functions), and even during file reads via Parquet/ORC pushdown, since filtering at the source touches fewer partitions and leads to faster jobs.

### Scenario 5: Column Pruning

When working with Spark DataFrames, convenience often wins over correctness and nothing feels more convenient than `select("*")`. It’s quick, flexible, and perfect for exploration.

But in production pipelines, that little star silently costs CPU, memory, network bandwidth, and runtime efficiency. Every time you write `select("*")`, Spark expands it into *every* column from your schema, even if you’re using just one or two later.

Those extra attributes flow through every stage of the plan, from filters and joins to aggregations and shuffles. The result: inflated logical plans, bigger shuffle files, and slower queries.

#### The Problem: “The Lazy Star”

```py
df_star = (
    df.select("*")
      .filter(col("department") == "Engineering")
      .groupBy("country")
      .agg(avg("salary").alias("avg_salary"))
)
```

At first glance, this seems harmless. But the problem is: only two columns (country and salary) are needed for the aggregation, but Spark carries all eight (id, firstname, lastname, department, salary, age, hire_date, country) through every transformation.

::: tip Simplified Logical Plan

```plaintext
Aggregate [country], [avg(salary) AS avg_salary]

└─ Filter (department = Engineering)

   └─ Project [id, firstname, lastname, department, salary, age, hire_date, country]

      └─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

Every node in this tree carries all columns. Catalyst can’t prune them because you explicitly asked for `"*"`. The excess attributes are serialized, shuffled, and deserialized across the cluster, even though they serve no purpose in the final result.

#### The Fix: Select Only What You Need

Be deliberate with your projections. Select the minimal schema required for the task.

```py
df_pruned = (
    df.select("department", "salary", "country")
      .filter(col("department") == "Engineering")
      .groupBy("country")
      .agg(avg("salary").alias("avg_salary"))
)
```

::: tip Simplified Logical Plan

```py
Aggregate [country], [avg(salary) AS avg_salary]

└─ Filter (department = Engineering)

   └─ Project [department, salary, country]

      └─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

Now Spark reads and processes only the three required columns: department, salary, and country. The plan is narrower, the DAG simpler, and execution faster.

#### Real-World Benchmark: AWS Glue

::: tabs

@tab:active Wide Projection

```py
df = spark.createDataFrame(multiplied_data,
                           ["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"])

start = time.time()
df_star = (
    df.select("*")
      .filter(col("department") == "Engineering")
      .groupBy("country")
      .agg(avg("salary").alias("avg_salary"))
)

df_star.count()
time_star = round(time.time() - start, 2)
```

@tab Pruned Projection

```py
start = time.time()

df_pruned = (
    df.select("department", "salary", "country")
      .filter(col("department") == "Engineering")
      .groupBy("country")
      .agg(avg("salary").alias("avg_salary"))
)

df_pruned.count()
time_pruned = round(time.time() - start, 2)

print(f"select('*') time: {time_star}s")
print(f"pruned columns time: {time_pruned}s")

spark.stop()
```

:::

| **Approach** | **Columns Processed** | **Execution Time (1M rows)** | **Observation** |
| --- | --- | --- | --- |
| `select("*")` | 8 | ~26.54 s | Spark carries all columns through the plan. |
| Pruned projection | 3 | ~2.21 s | Only needed columns processed → faster and lighter. |

#### Under the Hood: How Catalyst Handles Columns

When you call `select("*")`, Catalyst resolves *every attribute* into the logical plan. Each subsequent transformation inherits that full attribute list, increasing plan depth and overhead.

Catalyst includes a rule called ColumnPruning, which removes unused attributes but it only works when Spark *can see* which columns are necessary. If you use `"*"` or dynamically reference `df.columns`, Catalyst loses visibility.

::: tabs

@tab:active Works:

```py
df \
    .select("salary", "country") \
    .groupBy("country") \
    .agg(avg("salary"))
```

@tab Doesn’t Work:

```py
cols = df.columns

df.select(cols) \
  .groupBy("country") \
  .agg(avg("salary"))
```

:::

In the second case, Catalyst can’t prune anything because cols might include everything.

#### Physical Plan Differences

```plaintext
Wide Projection (select("*")):

*(1) HashAggregate(keys=[country], functions=[avg(salary)])

+- *(1) Project [id, firstname, lastname, department, salary, age, hire_date, country]

   +- *(1) Filter (department = Engineering)

      +- *(1) Scan parquet ...
```

Pruned Projection:

```plaintext
*(1) HashAggregate(keys=[country], functions=[avg(salary)])

+- *(1) Project [department, salary, country]

   +- *(1) Filter (department = Engineering)

      +- *(1) Scan parquet [department, salary, country]
```

Notice the last line: Spark physically scans only the three referenced columns from Parquet. That’s genuine I/O reduction, not just logical simplification. Using select(\*) increases shuffle file sizes, memory usage during serialization, Catalyst planning time, and I/O and network traffic, and the solution requires no more than specifying the necessary columns.

But in managed environments like AWS Glue or Databricks, this simple practice can greatly reduce ETL time, particularly for Parquet or Delta files, due to effective column pruning during explicit projection. It’s one of the easiest and highest-impact Spark optimization techniques, starting with typing fewer asterisks.

### Scenario 6: Filter Pushdown vs Full Scan

When a Spark job feels slow right from the start, even before joins or aggregations, the culprit is often hidden at the data-read layer. Spark spends seconds (or minutes) scanning every record, even though most rows are useless for the query.

That’s where filter pushdown comes in. It tells Spark to *push your filter logic down to the file reader* so that Parquet / ORC / Delta formats return only the relevant rows from disk. Done right, this optimization can reduce scan size significantly. Done wrong, Spark performs a full scan, reading everything before filtering in memory.

#### The Problem: Late Filters and Full Scans

```py
employees_df = spark.read.parquet("s3://data/employee_data/")

df_full = (
    employees_df
        .select("*")  # reads all columns
        .filter(col("country") == "Canada")
)
```

Looks fine, right? But Spark can’t push this filter to the Parquet reader because it’s applied *after* the select("\*") projection step. Catalyst sees the filter as operating on a projected DataFrame, not the raw scan, so the pushdown boundary is lost.

::: tip Simplified Logical Plan

```plaintext
Filter (country = Canada)

└─ Project [id, firstname, lastname, department, salary, age, hire_date, country]

   └─ Scan parquet employee_data [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

Every record from every Parquet file is read into memory before the filter executes. In large tables, this means scanning terabytes when you only need megabytes.

#### The Fix: Filter Early and Project Light

Move filters as close as possible to the data source and limit columns before Spark reads them:

```py
df_pushdown = (
    spark.read.parquet("s3://data/employee_data/")
        .select("id", "firstname", "department", "salary", "country")
        .filter(col("country") == "Canada")
)
```

::: tip Simplified Logical Plan

```plaintext
Project [id, firstname, department, salary, country]

└─ Scan parquet employee_data [id, firstname, department, salary, country], PushedFilters: [country = Canada]
```

:::

::: note Notice the difference

PushedFilters appears in the plan. That means the Parquet reader handles the predicate, returning only matching blocks and rows.

:::

#### Under the Hood: What Actually Happens

When Spark performs filter pushdown, it leverages the Parquet metadata (min/max statistics and row-group indexes) stored in file footers.

- Spark inspects file-level metadata for the predicate column (country).
- It skips any row group whose values don’t match (country ≠ Canada).
- It reads only the necessary row groups and columns from disk.
- Those records enter the DAG directly – no in-memory filtering required.

This optimization happens entirely before Spark begins executing stages, reducing both I/O and network transfer.

#### Real-World Benchmark: AWS Glue

```py :collapsed-lines
import time
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.appName("FilterPushdownBenchmark").getOrCreate()

start = time.time()
df_full = (
    spark.read.parquet("s3://data/employee_data/")
        .select("*")                         # all columns
        .filter(col("country") == "Canada")  
)
df_full.count()
time_full = round(time.time() - start, 2)

start = time.time()
df_pushdown = (
    spark.read.parquet("s3://data/employee_data/")
        .select("id", "firstname", "department", "salary", "country")
        .filter(col("country") == "Canada")  
)
df_pushdown.count()
time_push = round(time.time() - start, 2)

print("Full Scan Time:", time_full, "sec")
print("Filter Pushdown Time:", time_push, "sec")

spark.stop()
```

| **Approach** | **Execution Time (1 M rows)** | **Observation** |
| --- | --- | --- |
| Full Scan | 14.2 s | All files scanned and filtered in memory. |
| Filter Pushdown | 3.8 s | Only relevant row groups and columns read. |

#### Physical Plan Comparison

::: tabs

@tab:active Full Scan

```plaintext
*(1) Filter (country = Canada)

+- *(1) ColumnarToRow

   +- *(1) FileScan parquet [id, firstname, lastname, department, salary, age, hire_date, country]

      Batched: true, DataFilters: [], PushedFilters: []
```

@tab Pushdown:

```plaintext
*(1) ColumnarToRow

+- *(1) FileScan parquet [id, firstname, department, salary, country]

   Batched: true, DataFilters: [isnotnull(country)], PushedFilters: [country = Canada]
```

:::

The difference is clear: PushedFilters confirms that Spark applied predicate pushdown, skipping unnecessary row groups at the scan stage.

#### Reflection: Why Pushdown Matters

Pushdown isn’t a micro-optimization. It’s actually often the single biggest performance lever in Spark ETL. In data lakes with hundreds of files, full scans waste hours and inflate AWS S3 I/O costs. By filtering and projecting early, Spark prunes both rows and columns before execution even begins.

Apply filters as early as possible in the read pipeline, combine filter pushdown with column pruning, verify PushedFilters in explain("formatted"), avoid UDFs and select("\*") at read time, and let pushdown turn “read everything and discard most” into “read only what you need.”

### Scenario 7: De-duplicate Right

#### The Problem: “All-Row Deduplication” and Why It Hurts

When we use this:

```py
df.dropDuplicates()
```

Spark removes identical rows across all columns. It sounds simple, but this operation forces Spark to treat every column as part of the deduplication key.

Internally, it means:

- Every attribute is serialized and hashed.
- Every unique combination of all columns is shuffled across the cluster to ensure global uniqueness.
- Even small changes in a non-essential field (like hire_date) cause new keys and destroy aggregation locality.

In wide tables, this is one of the heaviest shuffle operations Spark can perform: df.dropDuplicates()

::: tip Simplified Logical Plan

```plaintext
Aggregate [id, firstname, lastname, department, salary, age, hire_date, country], [first(id) AS id, ...]

└─ Exchange hashpartitioning(id, firstname, lastname, department, salary, age, hire_date, country, 200)

   └─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

::: note Notice the Exchange

that’s a full shuffle across all columns. Spark must send every record to the partition responsible for its unique combination of all fields. This is slow, memory-intensive, and scales poorly as columns grow.

:::

#### The Better Approach: Key-Based Deduplication

In most real datasets, duplicates are determined by a primary or business key, not all attributes. For example, if id uniquely identifies an employee, we only need to keep one record per id.

```py
df.dropDuplicates(["id"])
```

Now Spark deduplicates based only on the id column.

```plaintext
Aggregate [id], [first(id) AS id, first(firstname) AS firstname, ...]

└─ Exchange hashpartitioning(id, 200)

   └─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

The shuffle is dramatically narrower. Instead of hashing across all columns, Spark redistributes data only by id. Fewer bytes, smaller shuffle files, faster reduce stage

#### Real-World Benchmark: AWS Glue

```py :collapsed-lines
import time
from pyspark.sql.functions import exp, log, sqrt, col, concat_ws, when, upper, avg
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("MillionRowsRenameTest").getOrCreate()

employees_data = [
    (1, "John", "Doe", "Engineering", 80000, 28, "2020-01-15", "USA"),
    (2, "Jane", "Smith", "Engineering", 85000, 32, "2019-03-20", "USA"),
    (3, "Alice", "Johnson", "Sales", 60000, 25, "2021-06-10", "UK"),
    (4, "Bob", "Brown", "Engineering", 90000, 35, "2018-07-01", "USA"),
    (5, "Charlie", "Wilson", "Sales", 65000, 29, "2020-11-05", "UK"),
    (6, "David", "Lee", "HR", 55000, 27, "2021-01-20", "USA"),
    (7, "Eve", "Davis", "Engineering", 95000, 40, "2017-04-12", "Canada"),
    (8, "Frank", "Miller", "Sales", 70000, 33, "2019-09-25", "UK"),
    (9, "Grace", "Taylor", "HR", 58000, 26, "2021-08-15", "Canada"),
    (10, "Henry", "Anderson", "Engineering", 88000, 31, "2020-02-28", "USA")
]

multiplied_data = [(i, f"firstname_{i}", f"lastname_{i}",
                    employees_data[i % 10][3],   # department
                    employees_data[i % 10][4],   # salary
                    employees_data[i % 10][5],   # age
                    employees_data[i % 10][6],   # hire_date
                    employees_data[i % 10][7]    # country
                    )
                   for i in range(1, 1_000_001)]

df = spark.createDataFrame(
    multiplied_data,
    ["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"]
)

start = time.time()
dedup_full = df.dropDuplicates()
dedup_full.count()
time_full = round(time.time() - start, 2)

start = time.time()
dedup_key = df.dropDuplicates(["id"])
dedup_key.count()
time_key = round(time.time() - start, 2)

print(f"Full-row dedup time: {time_full}s")
print(f"Key-based dedup time: {time_key}s")

spark.stop()
```

| **Approach** | **Execution Time (1M rows)** | **Observation** |
| --- | --- | --- |
| Full-Row Dedup | 27.6 s | Shuffle across all attributes, large hash table |
| Key-Based Dedup (["id"]) | 2.06 s | 10× faster, minimal shuffle width |

#### Under the Hood: What Catalyst Does

When you specify a key list, Catalyst rewrites dropDuplicates(keys) into a partial + final aggregate plan, just like a groupBy:

```plaintext
HashAggregate(keys=[id], functions=[first(...)])
```

This allows Spark to:

- Perform map-side partial aggregation on each partition (before shuffle).
- Exchange only the grouping key (id).
- Perform a final aggregation on the reduced data.

The all-column version can’t do that optimization because every column participates in uniqueness Spark must ensure *complete* data redistribution.

#### Best Practices for Deduplication

| **Practice** | **Why It Matters** |
| --- | --- |
| Always deduplicate by key columns | Reduces shuffle width and data movement |
| Use deterministic keys (id, email, ssn) | Ensures predictable grouping |
| Avoid dropDuplicates() without arguments | Forces global shuffle across all attributes |
| Combine with column pruning | Keep only necessary fields before deduplication |
| For “latest record” logic, use window functions | Allows targeted deduplication (row_number() with order) |
| Cache intermediate datasets if reused | Avoids recomputation of expensive dedup stages |

#### Combining Deduplication & Aggregation

You can merge deduplication with aggregation for even better results:

```py
df_dedup_agg = (
    df.dropDuplicates(["id"])
        .groupBy("department")
        .agg(avg("salary").alias("avg_salary"))
)
```

Spark now reuses the same shuffle partitioning for both operations, one shuffle instead of two. The plan will show:

```plaintext
HashAggregate(keys=[department], functions=[avg(salary)])

└─ HashAggregate(keys=[id], functions=[first(...), first(department)])

   └─ Exchange hashpartitioning(id, 200)
```

Prefer `dropDuplicates(["key_col"])` over `dropDuplicates()` to deduplicate by business or surrogate keys rather than the entire schema. Combine deduplication with projection to reduce I/O, and remember that one narrow shuffle is always better than a wide shuffle. Deduplication isn’t just cleanup – it’s an optimization strategy. Choose your keys wisely, and Spark will reward you with faster jobs and lighter DAGs.

### Scenario 8: Count Smarter

In production, one of the most common performance pitfalls is the simplest line of code:

```py
if df.count() > 0:
```

At first glance, this seems harmless. You just want to know whether the DataFrame has any data before writing, joining, or aggregating. But in Spark, count() is not metadata lookup, it’s a full cluster-wide job.

#### What Really Happens with `count()`

When you call `df.count()`, Spark executes a complete action:

- It scans every partition.
- Deserializes every row.
- Counts records locally on each executor.
- Reduces the counts to the driver.

That means your “empty check” runs a full distributed computation, even when the dataset has billions of rows or lives in S3.

```py
df.count()
```

::: tip Simplified Logical Plan

```plaintext
*(1) HashAggregate(keys=[], functions=[count(1)])

+- *(1) ColumnarToRow

   +- *(1) FileScan parquet [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

Every record is read, aggregated, and returned just to produce a single integer.

Now imagine this runs in the middle of your Glue job, before a write, before a filter, or inside a loop. You’ve just added a full-table scan to your DAG for no reason.

#### The Smarter Way: `limit(1)` or `head(1)`

If all you need to know is whether data exists, you don’t need to count every record. You just need to know if there’s *at least one*.

Two efficient alternatives

```py
df.head(1)
#or
df.limit(1).collect()
```

Both execute a lazy scan that stops as soon as one record is found.

::: tip Simplified Logical Plan

```py
TakeOrderedAndProject(limit=1)

└─ *(1) FileScan parquet [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

- No global aggregation.
- No shuffle.
- No full scan.

#### Real-World Benchmark: AWS Glue

```py :collapsed-lines
import time
from pyspark.sql.functions import exp, log, sqrt, col, concat_ws, when, upper, avg
from pyspark.sql import SparkSession

# Initialize Spark session
spark = SparkSession.builder.appName("MillionRowsRenameTest").getOrCreate()

# Base dataset (10 sample employees)
employees_data = [
    (1, "John", "Doe", "Engineering", 80000, 28, "2020-01-15", "USA"),
    (2, "Jane", "Smith", "Engineering", 85000, 32, "2019-03-20", "USA"),
    (3, "Alice", "Johnson", "Sales", 60000, 25, "2021-06-10", "UK"),
    (4, "Bob", "Brown", "Engineering", 90000, 35, "2018-07-01", "USA"),
    (5, "Charlie", "Wilson", "Sales", 65000, 29, "2020-11-05", "UK"),
    (6, "David", "Lee", "HR", 55000, 27, "2021-01-20", "USA"),
    (7, "Eve", "Davis", "Engineering", 95000, 40, "2017-04-12", "Canada"),
    (8, "Frank", "Miller", "Sales", 70000, 33, "2019-09-25", "UK"),
    (9, "Grace", "Taylor", "HR", 58000, 26, "2021-08-15", "Canada"),
    (10, "Henry", "Anderson", "Engineering", 88000, 31, "2020-02-28", "USA")
]

# Create 1 million rows
multiplied_data = [
    (i, f"firstname_{i}", f"lastname_{i}",
     employees_data[i % 10][3],
     employees_data[i % 10][4],
     employees_data[i % 10][5],
     employees_data[i % 10][6],
     employees_data[i % 10][7])
    for i in range(1, 1_000_001)
]

df = spark.createDataFrame(
    multiplied_data,
    ["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"]
)
# Create DataFrame
df = spark.createDataFrame(
    multiplied_data,
    ["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"]
)

start = time.time()
df.count()
count_time = round(time.time() - start, 2)

start = time.time()
df.limit(1).collect()
limit_time = round(time.time() - start, 2)

start = time.time()
df.head(1)
head_time = round(time.time() - start, 2)

spark.stop()
```

| **Method** | **Plan Type** | **Execution Time (1M rows)** | **Notes** |
| --- | --- | --- | --- |
| `count()` | HashAggregate + Exchange | 26.33 s | Full scan + aggregation |
| `limit(1)` | TakeOrderedAndProject | 0.62 s | Stops after first record |
| `head(1)` | TakeOrderedAndProject | 0.42 s | Fastest, single partition |

The difference is significant for the same logical check.

So why does this difference exist? Spark’s execution model treats every action as a trigger for computation. `count()` is an aggregation action, requiring global communication, and `limit(1)` and `head(1)` are sampling actions, short-circuiting the job after fetching the first record. Catalyst generates a TakeOrderedAndProject node instead of HashAggregate, and the scheduler terminates once one task finishes.

##### Plan comparison

| **Action** | **Simplified Plan** | **Type** | **Behavior** |
| --- | --- | --- | --- |
| `count()` | HashAggregate → Exchange → FileScan | Global | Full scan, wide dependency |
| `limit(1)` | TakeOrderedAndProject → FileScan | Local | Early stop, narrow dependency |
| `head(1)` | TakeOrderedAndProject → FileScan | Local | Early stop, single task |

Avoid using `count()` to check emptiness since it triggers a full scan. Use `limit(1)` or `head(1)` for lightweight existence checks. And reserve `count()` only when the total is required, because Spark will always process all data unless explicitly told to stop. Other alternatives

| `df.take(1)` | Similar to head() returns array |
| --- | --- |
| `df.first()` | Returns first Row or None |
| `df.isEmpty()` | Returns true if DataFrame has no rows |
| `df.rdd.isEmpty()` | RDD-level check |

### Scenario 9: Window Wisely

Window functions (`rank()`, `dense_rank()`, lag`(), avg()` with `over()`, and so on) are essential in analytics. They let you calculate running totals, rankings, or time-based metrics.

But in Spark, they’re not cheap, because they rely on shuffles and ordering.

Each window operation:

- Requires all rows for the same partition key to be co-located on the same node.
- Requires sorting those rows by the `orderBy()` clause within each partition.

If you omit `partitionBy()` (or use it with too broad a key), Spark treats the entire dataset as one partition, triggering a massive shuffle and global sort.

#### Global Window: The Wrong Way

Let’s compute employee rankings by salary without partitioning:

```py
from pyspark.sql.window import Window
from pyspark.sql.functions import rank, col

window_spec = Window.orderBy(col("salary").desc())

df_ranked = df.withColumn("salary_rank", rank().over(window_spec))
```

::: tip Simplified Logical Plan

```plaintext
Window [rank() windowspecdefinition(orderBy=[salary DESC]) AS salary_rank]

└─ Sort [salary DESC], true

   └─ Exchange rangepartitioning(salary DESC, 200)

      └─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

Spark must shuffle and sort the entire dataset globally, a full sort across all rows. Every executor gets a slice of this single global range, and all data must move through the network.

#### Partition by a Selective Key: The Better Way

Most analytics don’t need a global ranking. You likely want rankings within a department or group, not across the entire company.

```py
window_spec = Window.partitionBy("department").orderBy(col("salary").desc())

df_ranked = df.withColumn("salary_rank", rank().over(window_spec))
```

Now Spark builds separate windows per department. Each partition’s data stays local, dramatically reducing shuffle size.

::: tip Simplified Logical Plan

```plaintext
Window [rank() windowspecdefinition(partitionBy=[department], orderBy=[salary DESC]) AS salary_rank]

└─ Sort [department ASC, salary DESC], false

   └─ Exchange hashpartitioning(department, 200)

      └─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

:::

The Exchange now partitions data only by department. The shuffle boundary is narrower, fewer bytes transferred, fewer sort comparisons, and smaller spill risk.

#### Real-World Benchmark: AWS Glue

We can execute the windows function on the same 1 million row dataset:

```py
df = spark.createDataFrame(multiplied_data,
["id", "firstname", "lastname", "department", "salary", "age",
 "hire_date", "country"])

start = time.time()
window_global = Window.orderBy(col("salary").desc())
df_global = df.withColumn("salary_rank", rank().over(window_global))
df_global.count()
global_time = round(time.time() - start, 2)
print(f'global_time:{global_time}')

start = time.time()
window_local = Window.partitionBy("department").orderBy(col("salary").desc())
df_local = df.withColumn("salary_rank", rank().over(window_local))
df_local.count()
local_time = round(time.time() - start, 2)
print(f'local_time:{local_time}')

spark.stop()
```

| **Approach** | **Stage Count** | **Execution Time (1M rows)** | **Observation** |
| --- | --- | --- | --- |
| Global Window (no partition) | 5 | 30.21 s | Full dataset shuffle + global sort |
| Partitioned Window (by department) | 3 | 1.74 s | Localized sort, fewer shuffle files |

Partitioning the window reduces shuffle data volume significantly and runtime as well. The difference grows exponentially as data scales.

#### Under the Hood: What Spark Actually Does

Each Window transformation adds a physical plan node like:

```plaintext
WindowExec [rank() windowspecdefinition(...)], frame=RangeFrame
```

This node is non-pipelined – it materializes input partitions before computing window metrics. Catalyst optimizer can’t push filters or projections inside WindowExec, which means:

- If you rank before filtering, Spark computes ranks for all rows.
- If you order globally, Spark must sort everything before starting.

That’s why window placement in your code matters almost as much as partition keys.

#### Common Anti-Patterns

| **Anti-Pattern** | **Why It Hurts** | **Fix** |
| --- | --- | --- |
| Missing `partitionBy()` | Global sort across dataset | Partition by key columns |
| Overly broad partition key | Creates too many small partitions | Use selective, not unique keys |
| Wide, unbounded window frame | Retains all rows in memory per key | Use bounded ranges (for example, `rowsBetween(-3, 0)`) |
| Filtering after window | Computes unnecessary metrics | Filter first, then window |
| Multiple chained windows | Each triggers new sort | Combine window metrics in one spec |

Partition on selective keys to reduce shuffle volume, and avoid global windows that force full sorts and shuffles. Prefer bounded frames to keep state in memory and limit disk spill, and filter early while combining metrics to minimize unnecessary data flowing through WindowExec. Windows are powerful, but unbounded ones can silently crush performance. In Spark, partitioning isn’t optional. It’s the line between analytics and overhead.

### Scenario 10: Incremental Aggregations with Cache and Persist

When multiple actions depend on the same expensive base computation, don’t recompute it every time. Materialize it once with `cache()` or `persist()`, then reuse it. Most Spark teams get this wrong in two ways:

- They never cache, so Spark recomputes long lineages (filters, joins, window ops) for every action.
- They cache everything, blowing executor memory and making things worse.

This scenario shows how to do it intelligently.

#### The Problem: Recomputing the Same Work for Every Metric

```py
from pyspark.sql.functions import col, avg, max as max_, count

base = (
    df.filter(col("department") == "Engineering")
      .filter(col("country") == "USA")
      .filter(col("salary") > 70000)
)

avg_salary = base.groupBy("department").agg(avg("salary").alias("avg_salary"))
max_salary = base.groupBy("department").agg(max_("salary").alias("max_salary"))
cnt_salary = base.groupBy("department").agg(count("*").alias("cnt"))

Looks totally fine at a glance. But remember: Spark is lazy.
Every time you trigger an action:

avg_salary.show()
max_salary.show()
cnt_salary.show()
```

Spark walks back to the same base definition and re-runs all filters and shuffles for each metric – unless you persist.

So instead of 1 filtered + shuffled dataset reused 3 times, you effectively get:

- 3 jobs
- 3 scans / filter chains
- 3 groupBy shuffles

for the same input slice.

::: tip Simplified Logical Plan Shape (Without Cache):

```plaintext
HashAggregate [department], [avg/max/count]

└─ Exchange hashpartitioning(department)

   └─ Filter (department = 'Engineering' AND country = 'USA' AND salary > 70000)

      └─ Scan ...
```

:::

And Spark builds this three times. Even though the filter logic is identical, each action triggers a new job with:

- new stages,
- new shuffles, and
- new scans.

On large datasets (hundreds of GBs), this is brutal.

#### The Better Approach: Cache the Shared Base

```py
from pyspark.sql import StorageLevel

base = (
    df.filter(col("department") == "Engineering")
      .filter(col("country") == "USA")
      .filter(col("salary") > 70000)
)

base = base.persist(StorageLevel.MEMORY_AND_DISK)

base.count()

avg_salary = base.groupBy("department").agg(avg("salary").alias("avg_salary"))
max_salary = base.groupBy("department").agg(max_("salary").alias("max_salary"))
cnt_salary = base.groupBy("department").agg(count("*").alias("cnt"))

avg_salary.show()
max_salary.show()
cnt_salary.show()

base.unpersist()
```

Now, the filters and initial scan run once, the results are cached, and all subsequent aggregates read from cached data instead of recomputing upstream logic.

::: tip Logical Plan Shape (With Cache)

Before materialization (base.count()), the plan still shows the lineage. Afterward, subsequent actions operate off the cached node.

```py
InMemoryRelation [department, salary, country, ...]

   └─ * Cached from:

      Filter (department = 'Engineering' AND country = 'USA' AND salary > 70000)

      └─ Scan parquet employees_large ...
```

Then:

```py
HashAggregate [department], [avg/max/count]

└─ InMemoryRelation [...]
```

:::

One heavy pipeline, many cheap reads. The DAG becomes flatter:

- Expensive scan & filter & shuffle: once.
- Cheap aggregations: N times from memory/disk.

#### Real-World Benchmark: AWS Glue

```py :collapsed-lines
df = spark.createDataFrame(multiplied_data,
["id", "firstname", "lastname", "department", "salary", "age",
"hire_date", "country"])

base = (
    df.filter(col("department") == "Engineering")
      .filter(col("country") == "USA")
      .filter(col("salary") > 85000)
)


start = time.time()

avg_salary = base.groupBy("department").agg(avg("salary").alias("avg_salary"))
max_salary = base.groupBy("department").agg(max_("salary").alias("max_salary"))
cnt = base.groupBy("department").agg(count("*").alias("emp_count"))

print("---- Without Cache ----")
avg_salary.show()
max_salary.show()
cnt.show()

no_cache_time = round(time.time() - start, 2)
print(f"Total time without cache: {no_cache_time} seconds")


from pyspark.sql import DataFrame

base_cached = base.persist(StorageLevel.MEMORY_AND_DISK)
base_cached.count()  # materialize cache

start = time.time()

avg_salary_c = base_cached.groupBy("department").agg(avg("salary").alias("avg_salary"))
max_salary_c = base_cached.groupBy("department").agg(max_("salary").alias("max_salary"))
cnt_c = base_cached.groupBy("department").agg(count("*").alias("emp_count"))

print("---- With Cache ----")
avg_salary_c.show()
max_salary_c.show()
cnt_c.show()

cache_time = round(time.time() - start, 2)
print(f"Total time with cache: {cache_time} seconds")

# Cleanup
base_cached.unpersist()

print("\n==== Summary ====")
print(f"Without cache: {no_cache_time}s | With cache: {cache_time}s")
print("=================")

spark.stop()
```

| **Approach** | **Execution Time (1M rows)** |
| --- | --- |
| Without Cache | 30.75 s |
| With Cache | 3.34 s |

#### Under the Hood: Why This Works

Using `cache()` or `persist()` in Spark inserts an InMemoryRelation / InMemoryTableScanExec node so that expensive intermediate results are stored in executor memory (or memory+disk). This allows future jobs to reuse cached blocks instead of re-scanning sources or re-computing shuffles. This shortens downstream logical plans, reduces repeated shuffles, and lowers load on systems like S3, HDFS, or JDBC.

Without caching, every action replays the full lineage and Spark recomputes the data unless another operator or AQE optimization has already materialized part of it. But caching should not become “cache everything”. Rather, you should avoid caching very large DataFrames used only once, wide raw inputs instead of filtered/aggregated subsets, or long-lived caches that are never unpersisted.

A good rule of thumb is to cache only when the DataFrame is expensive to recompute (joins, filters, windows, UDFs), is used at least twice, and is reasonably sized after filtering so it can fit in memory or work with MEMORY_AND_DISK. Otherwise, allow Spark to recompute.

Conceptually, caching converts a tall, repetitive DAG such as repeated “HashAggregate → Exchange → Filter → Scan” sequences into a hub-and-spoke design where one heavy cached hub feeds multiple lightweight downstream aggregates.

When multiple actions depend on the same expensive computation, cache or persist the shared base to flatten the DAG, eliminate repeated scans and shuffles, and improve end-to-end performance. All this while being intentional by caching only when reuse is real, the data size is safe, and always calling `unpersist()` when done.

Don’t make Spark re-solve the same puzzle three times. Let it solve it once, remember the answer, and move on.

### Scenario 11: Reduce Shuffles

Shuffles are Spark’s invisible tax collectors. Every time your data crosses executors, you pay in CPU, disk I/O, and network bandwidth.

Two of the most common yet misunderstood transformations that trigger or avoid shuffles are `coalesce()` and `repartition()`. Both change partition counts, but they do it in fundamentally different ways.

#### The Problem

Writing `df_result = df.repartition(10)` and thinking “I’m just changing partitions so Spark won’t move data unnecessarily.” But that assumption is wrong. `repartition()` always performs a full shuffle, even when:

- You are reducing partitions (from 200 → 10), or
- You are increasing partitions (from 10 → 200).

In both cases, Spark redistributes every row across the cluster according to a new hash partitioning scheme. So even if your data is already partitioned optimally, repartition() will still reshuffle it, adding a stage boundary.

::: tip Logical Plan

```py
Exchange hashpartitioning(...)

└─ LogicalRDD [...]
```

:::

That Exchange node signals a wide dependency: Spark spills intermediate data to disk, transfers it over the network, and reloads it before the next stage. In short: `repartition()` = "new shuffle, no matter what."

#### The Better Approach: coalesce()

If your goal is to reduce the number of partitions, for example, before writing results to S3 or Snowflake – use `coalesce()` instead.

```py
df_result = df.coalesce(10)
```

`coalesce()` merges existing partitions locally within each executor, avoiding the costly reshuffle step. It uses a narrow dependency, meaning each output partition depends on one or more existing partitions *from the same node*.

```plaintext
Coalesce

└─ LogicalRDD [...]
```

- No Exchange.
- No network shuffle.
- Just local merges – fast and cheap.

#### Real-World Benchmark: AWS Glue

```py
df = spark.createDataFrame(multiplied_data,
["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"])

start = time.time()
df_repart = df.repartition(10)
df_repart.count()
print("Repartition time:", round(time.time() - start, 2), "sec")

start = time.time()
df_coalesced = df.coalesce(10)
df_coalesced.count()
print("Coalesce time:", round(time.time() - start, 2), "sec")

spark.stop()
```

| **Operation** | **Plan Node** | **Shuffle Triggered** | **Glue Runtime** | **Observation** |
| --- | --- | --- | --- | --- |
| `repartition(10)` | Exchange | Yes | 18.2 s | Full cluster reshuffle |
| `coalesce(10)` | Coalesce | No | 1.99 s | Local partition merge only |

Even though both ended with 10 partitions, `repartition()` took significantly longer all because of the unnecessary shuffle.

#### Why This Matters

Each Exchange node in your logical plan creates a new stage in your DAG, meaning:

- Extra disk I/O
- Extra serialization
- Extra network transfer

That’s why avoiding just one shuffle in a Glue ETL pipeline can save seconds to minutes per run, especially on wide datasets.

**When to use which:**

| **Goal** | **Transformation** | **Reasoning** |
| --- | --- | --- |
| Increase parallelism for heavy groupBy or join | `repartition()` | Distributes data evenly across executors |
| Reduce file count before writing | `coalesce()` | Avoids shuffle, merges partitions locally |
| Rebalance skewed data before a join | `repartition(by="key")` | Enables better key distribution |
| Optimize output after aggregation | `coalesce()` | Prevents too many small output files |

#### AQE and Auto Coalescing

You can enable Adaptive Query Execution (AQE) in AWS Glue 3.0+ to let Spark merge small shuffle partitions automatically:

```py
spark.conf.set("spark.sql.adaptive.enabled", "true")

spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
```

With AQE, Spark dynamically combines small partitions *after* shuffle to balance performance and I/O.

`repartition()` always triggers a shuffle, while `coalesce()` avoids shuffles and is ideal for local merges before writes. You should always inspect Exchange nodes to identify shuffle points. Note that in AWS Glue, avoiding even one shuffle can yield ~7× runtime improvement at the 1M-row scale. Finally, use AQE to enable dynamic partition coalescing in larger workflows.

### Scenario 12: Know Your Shuffle Triggers

Much of Spark's performance comes from invisible data movement. Every shuffle boundary adds a new stage, a new write–read cycle, and sometimes minutes of extra execution time.

In Spark, any operation that requires rearranging data between partitions introduces a wide dependency, represented in the logical plan as an Exchange node.

Common shuffle triggers:

| **Operation** | **Why It Shuffles** | **Plan Node** |
| --- | --- | --- |
| `join()` | Records with the same key must be co-located for matching | Exchange (on join keys) |
| `groupBy()` / `agg()` | Keys must gather to a single partition for aggregation | Exchange |
| `distinct()` | Spark must compare all values across partitions | Exchange |
| `orderBy()` | Requires global ordering of data | Exchange |
| `repartition()` | Explicit reshuffle for partition balancing | Exchange |

Each Exchange means a shuffle stage: Spark writes partition data to disk, transfers it over the network, and reads it back into memory on the next stage. That’s your hidden performance cliff.

```py
df_result = (
    df.groupBy("department")
      .agg(sum("salary").alias("total_salary"))
      .join(df.select("department", "country")
            .distinct(), "department")
      .orderBy("total_salary", ascending=False)
)

df_result.explain("formatted")
```

::: tip Logical Plan Simplified:

```plaintext
Sort [total_salary DESC]

└─ Exchange (global sort)

   └─ SortMergeJoin [department]

      ├─ Exchange (groupBy shuffle)

      │   └─ HashAggregate (sum salary)

      └─ Exchange (distinct shuffle)

          └─ Aggregate (department, country)
```

:::

We can see three Exchange nodes, one for the aggregation, one for the distinct join, and one for the global sort. That’s three separate shuffles, three full dataset transfers.

#### Better Approach

Whenever possible, combine wide transformations into a single stage before an action. For instance, you can compute aggregates and join results in one consistent shuffle domain:

```py
agg_df = df.groupBy("department") \
    .agg(sum("salary") \
    .alias("total_salary"))

country_df = df.select("department", "country").distinct()

df_result = (
    agg_df.join(country_df, "department")
          .sortWithinPartitions("total_salary", ascending=False)
)
```

::: tip Logical Plan Simplified

```py
SortWithinPartitions [total_salary DESC]

└─ SortMergeJoin [department]

   ├─ Exchange (shared shuffle for join)

   └─ Exchange (shared shuffle for distinct)
```

:::

Now Spark reuses shuffle partitions across compatible operations – only one shuffle boundary remains. The rest execute as narrow transformations.

#### Real-World Benchmark: AWS Glue (1M)

```py :collapsed-lines
df = spark.createDataFrame(multiplied_data,
["id", "firstname", "lastname", "department", "salary", "age", "hire_date", "country"]).repartition(20)

from pyspark.sql.functions import sum as sum_

start = time.time()

dept_salary = (
    df.groupBy("department")
      .agg(sum_("salary").alias("total_salary"))
)

dept_country = (
    df.select("department", "country")
      .distinct()
)

naive_result = (
    dept_salary.join(dept_country, "department", "inner")
               .orderBy(col("total_salary").desc())
)

naive_count = naive_result.count()
naive_time = round(time.time() - start, 2)


start = time.time()

dept_country_once = (
    df.select("department", "country")
      .distinct()
)

optimized = (
    df.groupBy("department")
      .agg(sum_("salary").alias("total_salary"))
      .join(dept_country_once, "department", "inner")
      .sortWithinPartitions(col("total_salary").desc())
      # local ordering, avoids extra global shuffle
)

opt_count = optimized.count()
opt_time = round(time.time() - start, 2)

print("Optimized result count:", opt_count)
print("Optimized pipeline time:", opt_time, "sec")

print("\nOptimized plan:")
optimized.explain("formatted")

spark.stop()
```

| **Pipeline** | **\# of Shuffles** | **Glue Runtime (sec)** | **Observation** |
| --- | --- | --- | --- |
| Naive: groupBy + distinct + orderBy | 3 | 28.99 s | Multiple wide stages |
| Optimized: combined agg + join + sortWithinPartitions | 1 | 3.52 s | Single wide stage |

By merging compatible stages and using `sortWithinPartitions()` instead of global `orderBy()`, the job ran significantly faster on the same dataset, with fewer Exchange nodes and shorter lineage. Run df.explain and search for Exchange. Each one signals a full shuffle. You can also check Spark UI → SQL tab → Exchange Read/Write Size to see exactly how much data moved.

Every Exchange represents a shuffle, adding serialization, network I/O, and stage overhead, so avoid chaining wide operations back-to-back by combining them under a consistent partition key. Prefer `sortWithinPartitions()` over global `orderBy()` when ordering is local, monitor plan depth to catch consecutive wide dependencies, and note that in AWS Glue eliminating even one shuffle in a 1M-row job can significantly reduce runtime.

### Scenario 13: Tune Parallelism: Shuffle Partitions & AQE

Most Spark jobs are either over-parallelized (thousands of tiny tasks doing almost nothing, flooding the driver and filesystem) or under-parallelized (a handful of huge tasks doing all the work, causing slow stages and skew-like behavior). Both waste resources. We can control this behavior using spark.sql.shuffle.partitions and Adaptive Query Execution (AQE).

By default (in many environments), the default value `spark.conf.get("spark.sql.shuffle.partitions")` is 200, meaning that every shuffle produces approximately 200 shuffle partitions, regardless of data size. That means every shuffle (groupBy, join, distinct, and so on) creates ~200 shuffle partitions. Whether this default is reasonable depends entirely on the workload:

- If you’re processing 2 GB, 200 partitions might be great.
- If you’re processing 5 MB, 200 partitions is comedy – 200 tiny tasks, overhead > work.
- If you’re processing 2 TB, 200 partitions might be too few – tasks become huge and slow.

#### Example A: The Default Plan (Too Many Tiny Tasks)

```py
from pyspark.sql import SparkSession
from pyspark.sql.functions import sum as sum_

spark = SparkSession.builder.appName("ParallelismExample").getOrCreate()

spark.conf.get("spark.sql.shuffle.partitions")  # '200'

data = [
    (1, "John", "Engineering", 90000),
    (2, "Alice", "Engineering", 85000),
    (3, "Bob", "Sales", 75000),
    (4, "Eve", "Sales", 72000),
    (5, "Grace", "HR", 65000),
]

df = spark.createDataFrame(data, ["id", "name", "department", "salary"])

agg_df = df.groupBy("department").agg(sum_("salary").alias("total_salary"))
agg_df.explain("formatted")
```

Even though there are only 3 departments, Spark will still create 200 shuffle partitions – meaning 200 tasks for 3 groups of data.

::: note Effect

Each task has almost nothing to do. Spark spends more time planning and scheduling than actually computing.

:::

#### Example B: Tuned Plan (Balanced Parallelism)

```py
spark.conf.set("spark.sql.shuffle.partitions", "8")
agg_df = df.groupBy("department").agg(sum_("salary").alias("total_salary"))
agg_df.explain("formatted")
```

Now Spark launches only **8 partitions** still parallelized, but not wasteful. Even in this small example, you can visually feel the difference: one logical change, but a completely leaner physical plan.

#### The Real Problem: Static Tuning Doesn’t Scale

In production, job sizes vary:

- Today: 10 GB
- Tomorrow: 500 GB
- Next week: 200 MB (sampling run)

Manually changing shuffle partitions for each run is neither practical nor reliable. That’s where Adaptive Query Execution (AQE) steps in.

#### Adaptive Query Execution (AQE): Smarter, Dynamic Parallelism

AQE doesn’t guess. It measures actual shuffle statistics at runtime and rewrites the plan *while the job is running.*

```py
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.minPartitionSize", "64m")
spark.conf.set("spark.sql.adaptive.coalescePartitions.maxPartitionSize", "256m")
```

| **Configuration** | **Shuffle Partitions** | **Task Distribution** | **Observation** |
| --- | --- | --- | --- |
| Default | 200 | 200 tasks / 3 groups | Too granular, mostly idle |
| Tuned | 8 | 8 tasks / 3 groups | Balanced execution |

AQE merges tiny shuffle partitions, or splits huge ones, based on **real-time data metrics**, not pre-set assumptions.

```py
df = spark.createDataFrame(multiplied_data,
    ["id", "firstname", "lastname", "department", "salary", "age",
     "hire_date", "country"])

start = time.time()
agg_df = df.groupBy("department").agg(sum_("salary").alias("total_salary"))
agg_df.count()

print(f'Num Partitions df: {df.rdd.getNumPartitions()}')
print(f'Num Partitions aggdf: {agg_df.rdd.getNumPartitions()}')
print("Execution time:", round(time.time() - start, 2), "sec")

spark.stop()
```

| **Stage** | **Without AQE** | **With AQE** |
| --- | --- | --- |
| Stage 3 (Aggregation) | 200 shuffle partitions, each reading KBs | 8–12 coalesced partitions |
| Stage 4 (Join Output) | 200 shuffle files | Merged into balanced partitions |
| **Result** | Many small tasks, high overhead | Fewer, balanced tasks, faster runtime |

#### Understanding the Plan

Before AQE (static):

```plaintext
Exchange hashpartitioning(department, 200)
```

With AQE: AdaptiveSparkPlan (coalesced)

```plaintext
HashAggregate(keys=[department], functions=[sum(salary)])

Exchange hashpartitioning(department, 200) # runtime coalesced to 12
```

The logical plan remains the same, but the physical execution plan is rewritten during runtime. Spark intelligently reduces or merges shuffle partitions based on data volume.

Spark’s default 200 shuffle partitions often misfit real workloads. Static tuning may work for predictable pipelines, but fails with variable data. On the other hand, AQE uses shuffle statistics to dynamically coalesce partitions at runtime, use it with sensible ceilings (for example, 400 partitions) and always verify in the Spark UI to catch over-partitioning (many tasks reading KBs) or under-partitioning (few tasks reading GBs).

### Scenario 14: Handle Skew Smartly

In an ideal Spark world, all partitions contain roughly equal amounts of data. But real datasets are rarely that kind. If one key (say "USA", "2024", or "customer_123") holds millions of rows while others have only a few, Spark ends up with one or two massive partitions. Those partitions take disproportionately longer to process, leaving other executors idle. That’s data skew: the silent killer of parallelism.

You’ll often spot it in Spark UI:

- 198 tasks finish quickly.
- 2 tasks take 10× longer.
- Stage stays stuck at 98% for minutes.

#### Example A: The Skew Problem

```py
from pyspark.sql import SparkSession, functions as F

spark = SparkSession.builder.appName("DataSkewDemo").getOrCreate()

# Create skewed dataset
df = spark.range(0, 10000).toDF("id") \
    .withColumn("department",
        F.when(F.col("id") < 8000, "Engineering")  # 80% of data
         .when(F.col("id") < 9000, "Sales")
         .otherwise("HR")) \
    .withColumn("salary", (F.rand() * 100000).cast("int"))

df.groupBy("department").count().show()
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1769464257950/6963171b-92de-4721-9bb3-6951c68a2775.png)

Spark will hash “Engineering” into just one reducer partition, making it heavier than others. That single task becomes a bottleneck, the shuffle has technically completed, but the stage waits for that one lagging task.

#### Example B: The Solution: Salting Hot Keys

To handle skew, we the hot key (Engineering) into multiple pseudo-keys using a random salt. This redistributes that large partition across multiple reducers.

```py
from pyspark.sql.functions import rand, concat, lit, floor

salt_buckets = 10

df_salted = (
    df.withColumn(
        "department_salted",
        F.when(F.col("department") == "Engineering",
            F.concat(F.col("department"), lit("_"),
                     (F.floor(rand() * salt_buckets))))
         .otherwise(F.col("department"))
    )
)

df_salted.groupBy("department_salted").agg(F.avg("salary"))
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1769464242395/c4ec0bc6-67bf-488c-b619-7130ceef878e.png)

Now “Engineering” isn’t one hot key – it’s **10 smaller keys** like Engineering_0, Engineering_1, ..., Engineering_9. Each one goes to a separate reducer partition, enabling parallel processing.

#### Example C: Post-Aggregation Desalting

After aggregating, recombine salted keys to get the original department names:

```py
df_final = (
    df_salted.groupBy("department_salted")
        .agg(F.avg("salary").alias("avg_salary"))
        .withColumn("department", F.split(F.col("department_salted"), "_")
            .getItem(0))
        .groupBy("department")
        .agg(F.avg("avg_salary").alias("final_avg_salary"))
)
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1769464321049/6349c2c3-a0e3-4f9e-be3e-c59639004128.png)

#### When to Use Salting

Use salting when:

- You observe stage skew (one or few long tasks).
- Shuffle read sizes vary drastically between tasks.
- The skew originates from a few dominant key values.

Avoid it when:

- The dataset is small (< 1 GB).
- You already use partitioning or bucketing keys with uniform distribution.

::: info Alternative approaches

| **Technique** | **Use Case** | **Pros** | **Cons** |
| --- | --- | --- | --- |
| Salting (manual) | Skewed joins/aggregations | Full control | Requires extra logic to merge |
| Skew join hints (`/*+ SKEWJOIN */`) | Supported joins in Spark 3+ | No extra columns needed | Works only on joins |
| Broadcast smaller side | One table ≪ other | Avoids shuffle on big side | Limited by broadcast size |
| AQE skew optimization | Spark 3.0+ | Automatic handling | Needs AQE enabled |

:::

#### Glue-Specific Tip

AWS Glue 3.0+ includes Spark 3.x, meaning you can also enable AQE’s built-in skew optimization:

```py
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")

spark.conf.set("spark.sql.adaptive.skewJoin.skewedPartitionThresholdInBytes", "128m")
```

Spark will automatically detect large shuffle partitions and split them, effectively auto-salting hot keys at runtime. Data skew causes uneven shuffle sizes across tasks and can be detected in the Spark UI or via shuffle read/write metrics. Mitigate heavy-key skew with manual salting (recombined later) or rely on AQE skew join optimization for mild cases, and always validate improvements in the Spark UI SQL tab by checking “Shuffle Read Size.”

### Scenario 15: Sort Efficiently (orderBy vs sortWithinPartitions)

Most Spark jobs need sorted data at some point – for window functions, for writing ordered files, or for downstream processing. The instinct is to reach for orderBy(). But those instincts cost you a full shuffle every single time.

#### The Problem: Global Sort When You Don't Need It

Let's say you want to write employee data partitioned by department, sorted by salary within each department:

```py
from pyspark.sql.functions import col

# Naive approach: global sort
df_sorted = df.orderBy(col("department"), col("salary").desc())

df_sorted.write.partitionBy("department").parquet("s3://output/employees/")
```

This looks reasonable. You're sorting by department and salary, then writing partitioned files. Clean and simple. But here's what Spark actually does:

::: tip Simplified Logical Plan

```py
Sort [department ASC, salary DESC], true

└─ Exchange rangepartitioning(department ASC, salary DESC, 200)

   └─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

That Exchange `rangepartitioning` is a full shuffle. So Spark:

- Samples the data to determine range boundaries
- Redistributes every row across 200 partitions based on sort keys
- Sorts each partition locally
- Produces globally ordered output

You just shuffled 1 million rows across the cluster to achieve global ordering – even though you're immediately partitioning by department on write, which destroys that global order anyway.

#### Why This Hurts

Range partitioning for global sort is one of the most expensive shuffles Spark performs:

- Sampling overhead: Spark must scan data twice (once to sample, once to process)
- Network transfer: Every row moves to a new executor based on range boundaries
- Disk I/O: Shuffle files written and read from disk
- Wasted work: Global ordering across departments is meaningless when you partition by department

For 1M rows, this adds 8-12 seconds of pure shuffle overhead.

#### The Better Approach: Sort Locally Within Partitions

If you only need ordering *within* each department (or within each output partition), use sortWithinPartitions():

```py
# Optimized approach: local sort only
df_sorted = df.sortWithinPartitions(col("department"), col("salary").desc())
df_sorted.write.partitionBy("department").parquet("s3://output/employees/")
```

::: tip Simplified Logical Plan

```py
Sort [department ASC, salary DESC], false

└─ LogicalRDD [id, firstname, lastname, department, salary, age, hire_date, country]
```

- No Exchange.
- No shuffle.
- Just local sorting within existing partitions.

Spark sorts each partition in-place, without moving data across the network. The false flag in the Sort node indicates this is a local sort, not a global one.

#### Real-World Benchmark: AWS Glue

Let's measure the difference on 1 million employee records: First, will start with Global Sort with `orderBy`:

```py
print("\n--- Testing orderBy() (global sort) ---")

start = time.time()

df_global = df.orderBy(col("department"), col("salary").desc())
df_global.write.mode("overwrite").parquet("/tmp/global_sort_output")

global_time = round(time.time() - start, 2)
print(f"orderBy() time: {global_time}s")
```

Local Sort:

```py
print("\n--- Testing sortWithinPartitions() (local sort) ---")

start = time.time()

df_local = df.sortWithinPartitions(col("department"), col("salary").desc())
df_local.write.mode("overwrite").parquet("/tmp/local_sort_output")

local_time = round(time.time() - start, 2)
print(f"sortWithinPartitions() time: {local_time}s")
```

| **Approach** | **Plan Type** | **Execution Time (1M rows)** | **Observation** |
| --- | --- | --- | --- |
| `orderBy()` | Exchange rangepartitioning | 10.34 s | Full shuffle for global sort |
| `sortWithinPartitions()` | Local Sort (no Exchange) | 2.18 s | In-place sorting, no network transfer |

##### Physical Plan Differences

::: tabs

@tab:active <code>orderBy()</code> Physical Plan

```plaintext
*(2) Sort [department ASC NULLS FIRST, salary DESC NULLS LAST], true, 0

+- Exchange rangepartitioning(department ASC NULLS FIRST, salary DESC NULLS LAST, 200)

   +- *(1) Project [id, firstname, lastname, department, salary, age, hire_date, country]

      +- *(1) Scan ExistingRDD[id, firstname, lastname, department, salary, age, hire_date, country]
```

The Exchange rangepartitioning node marks the shuffle boundary. Spark must:

- Sample data to determine range splits
- Redistribute all rows across executors
- Sort within each range partition

@tab <code>sortWithinPartitions()</code> Physical Plan:**

```py
*(1) Sort [department ASC NULLS FIRST, salary DESC NULLS LAST], false, 0

+- *(1) Project [id, firstname, lastname, department, salary, age, hire_date, country]

   +- *(1) Scan ExistingRDD[id, firstname, lastname, department, salary, age, hire_date, country]
```

No Exchange. The false flag in Sort indicates local sorting only. Each partition is sorted independently, in parallel, without any data movement.

:::

##### When to Use Which:

| **Use Case** | **Method** | **Why** |
| --- | --- | --- |
| Writing partitioned files (Parquet, Delta) | sortWithinPartitions() | Partition-level order is sufficient; global order wasted |
| Window functions with ROWS BETWEEN | sortWithinPartitions() | Only need order within each window partition |
| Top-N per group (rank, dense_rank) | sortWithinPartitions() | Ranking is local to each partition key |
| Final output must be globally ordered | orderBy() | Need total order across all partitions |
| Downstream system requires strict ordering | orderBy() | For example, time-series data for sequential processing |
| Sorting before coalesce() for fewer output files | sortWithinPartitions() | Maintains order within merged partitions |

#### Common Anti-Pattern

```py
df.orderBy("department", "salary") \
  .write.partitionBy("department") \
  .parquet("output/")
```

::: critical Problem

You're globally sorting by department, then immediately partitioning by department. The global order is destroyed during partitioning.

:::

Here’s the fix:

```py
df.sortWithinPartitions("department", "salary") \
  .write.partitionBy("department") \
  .parquet("output/")
```

Or even better, if you're partitioning by department anyway:

```py
# Best: let partitioning handle distribution
df.write.partitionBy("department") \
    .sortBy("salary") \
    .parquet("output/")
```

`orderBy()` triggers an expensive full shuffle using range partitioning, while `sortWithinPartitions()` sorts data locally without a shuffle and is often 4–5× faster. Use it when writing partitioned files, computing window functions with `partitionBy()`, or when order is needed only within groups, and reserve `orderBy()` strictly for true global ordering, because in most production ETL, the best sort is the one that doesn’t shuffle.

---

## Conclusion

You began this handbook likely wondering why your Spark application was slow, and now you see that the answer was both clear and not so clear: your problem was never your Spark application, your configuration, or your version of Spark. It was your plan all along.

You now understand that Spark runs plans, not code, that transformation order affects logical plans, that shuffles generate stages and are key to runtime performance, and that examining your physical plans allows you to directly link your application performance issues back to your problematic line of code.

And you’ve seen this pattern repeat across many scenarios: problem, plan, solution, improved plan, and so forth, until optimization feels less like a dark art and more like a certainty.

This is the Spark optimization mindset: read plans before you write code, and challenge every single Exchange. Engineers who write high-performance Spark jobs minimize shuffles, filter early, project narrowly, deal with skew carefully, and validate everything via explain() and the Spark UI. Once you learn to read the plan, Spark performance becomes mechanical.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Optimize PySpark Jobs: Real-World Scenarios for Understanding Logical Plans",
  "desc": "In the world of big data, performance isn't just about bigger clusters – it's about smarter code. Spark is deceptively simple to write but notoriously difficult to optimize, because what you write isn't what Spark executes. Between your transformatio...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-optimize-pyspark-jobs-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
