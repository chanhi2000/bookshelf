---
lang: en-US
title: "How to Integrate Vector Search in Columnar Storage"
description: "Article(s) > How to Integrate Vector Search in Columnar Storage"
icon: fas fa-database
category:
  - Data Science
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Integrate Vector Search in Columnar Storage"
    - property: og:description
      content: "How to Integrate Vector Search in Columnar Storage"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-integrate-vector-search-in-columnar-storage.html
prev: /data-science/articles/README.md
date: 2025-11-13
isOriginal: false
author:
  - name: Chirag Agrawal
    url : https://freecodecamp.org/news/author/chiragagrawal/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762983768101/928331bd-3f97-4d05-92fb-2d8ea9af5dab.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Integrate Vector Search in Columnar Storage"
  desc="Integrating vector search into traditional data platforms is becoming a common task in the current AI-driven landscape. When Google announced general availability for vector search in BigQuery in early 2024, it joined a growing list of established da..."
  url="https://freecodecamp.org/news/how-to-integrate-vector-search-in-columnar-storage"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762983768101/928331bd-3f97-4d05-92fb-2d8ea9af5dab.png"/>

Integrating vector search into traditional data platforms is becoming a common task in the current AI-driven landscape. When Google announced general availability for vector search in BigQuery in early 2024, it joined a growing list of established databases that have added capabilities for similarity search on high-dimensional embeddings.

But if you examine BigQuery's implementation more closely, you’ll find an approach that goes beyond a simple feature addition. Instead of bolting on a vector library, Google has deeply integrated vector search into its existing distributed, columnar architecture.

In this article, we’ll take a technical deep dive into the engineering decisions behind BigQuery's vector search. We’ll explore how foundational Google technologies like Dremel, Borg, and Colossus, combined with a proprietary columnar format and a novel indexing algorithm, create a highly scalable and efficient platform for AI workloads.

This analysis will give you insights into the architectural trade-offs involved in building vector search at scale. It also demonstrates how you can adapt a system designed for large-scale analytics so that it excels at modern AI tasks.

::: note Prerequisites

This article assumes that you have a solid foundation in distributed systems and database internals, including familiarity with concepts like columnar storage, query execution plans, and distributed query processing.

You should understand the basics of vector embeddings and similarity search, though we'll briefly review the fundamentals. Experience with at least one vector database or search system (such as pgvector, Pinecone, or Elasticsearch) will help contextualize the architectural comparisons.

While deep knowledge of Google Cloud Platform isn't required, basic familiarity with cloud data warehouses and their typical architectures will be beneficial. The article includes discussions of SIMD operations and CPU-level optimizations, so comfort with low-level performance considerations is helpful, though not mandatory.

Code examples assume working knowledge of SQL, with some sections referencing implementation details in languages like Python or Java. Most importantly, you should have experience building or operating production data systems at scale, as many insights focus on practical engineering trade-offs rather than theoretical concepts.

:::

---

## The Unique Challenge of Vector Search

Vector search fundamentally differs from traditional database operations in ways that challenge our existing infrastructure assumptions. Where conventional queries leverage decades of optimization around exact matching and range scans, vector similarity search requires computing distances between high-dimensional points at massive scale.

Consider the numbers. Modern embedding models produce vectors with 768 or more dimensions. At 4 bytes per float32 value, a single embedding consumes roughly 3KB. A modest corpus of 100 million items translates to 300GB of vector data.

But the real challenge isn't storage. The killer is computation. Finding the nearest neighbors to a query vector means computing distance metrics across all those dimensions. For 100 million vectors, a brute-force search requires 76.8 billion floating-point operations per query just for the distance calculations. Even with modern SIMD instructions processing 16 floats at once, you're looking at billions of CPU cycles per search.

This computational reality forces a fundamental compromise: we abandon exact solutions for approximate ones. Approximate Nearest Neighbor (ANN) algorithms trade perfect accuracy for practical query times. They work by partitioning the vector space cleverly, building graphs of nearest neighbors, or using hashing schemes to avoid examining every vector. The engineering challenge becomes balancing query latency, recall accuracy, and resource consumption.

Most purpose-built vector databases address this through specialized in-memory indexes like HNSW or IVF. These work well for single queries but require keeping massive indexes in RAM. In case you are not familiar with these vector indexes, you can read [this article (<VPIcon icon="fa-brands fa-medium"/>`towards-artificial-intelligence`)](https://medium.com/towards-artificial-intelligence/unlocking-the-power-of-efficient-vector-search-in-rag-applications-c2e3a0c551d5).

BigQuery took a different path. Rather than optimizing for single-query latency, they asked what vector search would look like when built for analytical workloads at warehouse scale. The answer required rethinking basic assumptions about index design, storage layout, and query execution.

---

## BigQuery's Foundational Distributed Architecture

BigQuery's vector search runs on the same infrastructure that's been processing SQL queries since 2011. No new cluster type. No specialized vector nodes. Just four core technologies that power most of Google's data processing, now handling a workload they weren't originally designed for.

This isn't the obvious choice. Most vector databases build specialized infrastructure optimized for similarity search. Graph-based indexes need fast random access. In-memory systems require careful memory management. BigQuery took its existing distributed SQL engine and asked: can we make this work for vectors, too?

The answer required leveraging four foundational systems in new ways:

- Dremel, the query engine that normally handles SQL, now orchestrates vector similarity computations.
- Borg, which allocates resources for everything from Search to YouTube, dynamically assigns thousands of workers to vector queries.
- Colossus stores embeddings in the same distributed filesystem that holds petabytes of analytics data.
- And Jupiter's datacenter network, built for bulk data processing, now shuttles vector data between computation nodes.

What's surprising isn't that it works, but how well it works. The same architecture that runs aggregate queries over trillion-row tables can search billion-scale vector collections. Understanding how requires examining each component and how they've been adapted for this new workload.

### Dremel: The Distributed Query Engine

At its core, BigQuery is powered by Dremel, a distributed query execution engine developed at Google since 2006. Dremel processes SQL queries using a hierarchical serving tree. A root server receives the query and orchestrates the execution, while mixer nodes break down the work and distribute it to hundreds or thousands of leaf nodes. These leaf nodes perform the actual computations in parallel on segments of the data.

This architecture allows BigQuery to dynamically allocate a massive number of execution threads, known as slots, to a single query, enabling it to process petabytes of data in seconds.

### Borg: Cluster Management and Resource Orchestration

The serverless nature of BigQuery is made possible by Borg, Google's cluster management system that predates and inspired Kubernetes.

When a vector search query is submitted, Borg is responsible for finding available machines across Google's global data centers, allocating the precise amount of CPU and memory resources needed for the query's Dremel slots, and managing fault tolerance by automatically rescheduling work if a machine fails. This dynamic resource allocation means users do not need to provision or scale infrastructure, whether they are searching 1,000 vectors or 10 billion.

### Colossus: The Distributed Storage Layer

Data in BigQuery is stored in Colossus, Google's next-generation distributed file system. Colossus is designed for exabyte-scale storage, provides high availability through automatic cross-datacenter replication, and is optimized for the high-throughput parallel reads required by Dremel's leaf nodes.

During a vector search, Colossus can deliver data to thousands of nodes simultaneously without creating a storage bottleneck.

### Jupiter: The High-Speed Network Fabric

These compute and storage systems are interconnected by Jupiter, Google's internal datacenter network, which features a petabit-per-second bisection bandwidth. The network's design ensures that data can move between Colossus storage and Dremel compute nodes at extremely high speeds, making data shuffling and aggregation phases of a query efficient.

---

## The Role of Columnar Storage in Vector Operations

Storing vectors in columns sounds wrong. Vectors are arrays. They belong together. Why split them across columnar storage?

BigQuery does it anyway, and it works brilliantly. Here's why.

When you search a million vectors, you need exactly one thing from each row: the embedding. Not the product name, price, or category. Just the vector. Row-oriented storage forces you to read entire records and throw away 90% of the data. Columnar storage reads only what you need.

The performance impact is dramatic. A table with 768-dimensional embeddings plus 20 other columns might total 3TB. Reading just the embedding column? 300GB. That's a **10x reduction in I/O** before you've done any actual computation.

But the real magic happens at the CPU level. Columnar storage naturally aligns vector data for SIMD processing. Instead of jumping around memory gathering vector components, the CPU finds them laid out sequentially, ready for bulk operations. Modern processors can load 16 floating-point values into a single register and process them simultaneously.

Compression becomes almost trivial, too. BigQuery's Capacitor format applies techniques like Product Quantization directly to the column data, shrinking vectors from 3KB to under 300 bytes. Try doing that with row-oriented storage where vectors are scattered across pages.

The lesson? Sometimes the "wrong" abstraction at one level enables the right optimizations at another.

### Accelerating Computations with SIMD

SIMD instructions are a form of hardware-level parallelism available in modern CPUs that provide significant speedups for vector arithmetic. This is achieved through special instruction sets built into the processor.

For example, AVX-512 (Advanced Vector Extensions 512-bit) is an instruction set found in modern high-performance CPUs, such as those from Intel, that allows a single instruction to operate on 512 bits of data at once.

Since a standard single-precision floating-point number is 32 bits, a CPU with AVX-512 can process 16 floating-point numbers in a single operation. This leads to dramatic performance gains.

The difference between scalar and SIMD processing for vector distance calculations is stark:

#### Scalar approach

Loop through each dimension, multiply corresponding components, accumulate results. For 768 dimensions, that's 768 multiplications, 768 additions, and terrible cache performance as you jump between two different memory locations for each iteration.

#### SIMD approach

Load 16 components from each vector into 512-bit registers. Execute a single multiply instruction that handles all 16 pairs. Execute a single horizontal add. Repeat 48 times. The CPU's pipeline stays full, the cache prefetcher knows exactly what data you need next, and you've turned 1,536 operations into 96.
The columnar storage pays off here, too. Vectors stored contiguously in memory align perfectly with SIMD register loads. No gather operations, no wasted cycles. Just pure throughput.

BigQuery's query engine is designed to leverage SIMD extensively. It automatically detects and uses the optimal instruction set available on the underlying hardware (for example, AVX-512 for Intel, NEON for ARM). The columnar storage format ensures that vector data is laid out in memory in a way that is friendly to SIMD registers, and the engine processes query vectors in large batches to maximize the utilization of these parallel instructions.

---

## The TreeAH Indexing Algorithm

While brute-force search can be effective at smaller scales due to BigQuery's massive parallelism, efficient search over billions of vectors requires an index. BigQuery's primary vector index is TreeAH (Tree with Asymmetric Hashing), which is based on Google's open-sourced ScaNN (Scalable Nearest Neighbors) algorithm. TreeAH combines three techniques to achieve high performance and memory efficiency.

### 1. Hierarchical Tree Structure

The algorithm first partitions the entire vector space into thousands of smaller lists. You can think of this like organizing a massive library. Instead of having one giant room with a million books, a library has floors, sections, and shelves. This hierarchy allows you to find a book without scanning every single one.

Similarly, TreeAH groups semantically similar vectors together into partitions and arranges them in a tree. During a query, the search navigates this tree by comparing the query vector to "centroid" vectors that represent the center of each partition, effectively following a path to the most relevant partitions and pruning away large, irrelevant branches of the search space.

### 2. Product Quantization (PQ)

Within TreeAH, PQ serves a different purpose than just compression. The index doesn't just store smaller vectors – it fundamentally changes how distance calculations work.

TreeAH learns partition-specific codebooks that capture the local structure of vectors in each tree node. This means vectors that end up in the "shoes" partition get quantized differently than those in "electronics." The compression becomes semantic-aware.

When combined with the tree structure, this creates a powerful effect: not only are you searching fewer vectors (thanks to the tree), but you're computing distances faster on the vectors you do search (thanks to PQ).

### 3. Asymmetric Hashing

The "asymmetric" aspect refers to the fact that the query vector is kept in its full-precision form, while the database vectors are compared in their compressed, quantized form.

The vectors are not of different dimensions, but of different precision. The semantic matching works because the comparison is not direct. The compressed database vector is a code that points to a region in the original vector space. The distance calculation uses the full-precision query vector to look up a pre-computed distance to the center of that region. This way, the rich information in the query vector is used to accurately estimate the distance, avoiding the significant information loss that would occur if both vectors were compressed.

### Architectural Comparison: TreeAH vs. HNSW

To better understand the design philosophy behind TreeAH, it’s useful to compare it with HNSW (Hierarchical Navigable Small World), a popular graph-based algorithm used in many dedicated vector databases.

HNSW constructs a multi-layered graph where vectors are nodes and edges connect them to their nearest neighbors. It’s known for excellent single-query latency.

But this performance comes with significant memory overhead, as the graph structure must be stored in addition to the full-precision vectors. HNSW index builds can also be time-consuming, and frequent data updates can lead to memory fragmentation and performance degradation.

TreeAH, in contrast, makes different architectural trade-offs that align with BigQuery's nature as a distributed analytics system.

The comparison reveals a fundamental design choice: TreeAH prioritizes batch throughput, memory efficiency, and scalability over absolute single-query latency. This makes it well-suited for analytical workloads where thousands of searches are performed simultaneously.

---

## The End-to-End Vector Search Query Flow

The execution timeline of a BigQuery vector search demonstrates how parallel processing eliminates traditional bottlenecks. When a VECTOR_SEARCH query arrives, the system initiates multiple operations concurrently rather than executing them sequentially.

The root server begins query planning immediately upon receiving the request. In parallel, Borg starts allocating compute slots across the cluster, targeting 1,000 slots distributed across 50 or more nodes. Borg prioritizes slots that are physically close to the data in Colossus to minimize data movement costs. This allocation typically completes within 10 milliseconds.

Query planning and resource allocation overlap significantly. The mixer nodes receive partial execution plans and begin partitioning the search space before Borg completes all slot allocations. When TreeAH indexes are available, mixers use them to assign specific vector partitions to leaf nodes. This streaming approach ensures that leaf nodes receive work assignments as soon as they come online.

The parallel execution phase showcases the architecture's efficiency. Hundreds or thousands of leaf nodes simultaneously read their assigned vector partitions from Colossus. Jupiter's high-bandwidth network prevents I/O congestion even with thousands of concurrent reads. Each leaf node operates independently: loading compressed vectors, executing SIMD operations for distance calculations, and maintaining local top-k results.

Aggregation begins before all leaf nodes complete their local searches. Mixers implement a streaming merge algorithm that processes results as they arrive. This approach means that by the time the slowest leaf node reports its results, the mixers have already processed most of the data. The final global top-k emerges from this continuous merging process.

The measured 40-millisecond execution time represents the longest path through the parallel execution graph, not the sum of individual operations. Most operations complete much faster, but the overall latency is bounded by the slowest component. This design trades single-query latency for massive throughput, enabling BigQuery to process thousands of vector searches concurrently across billions of vectors.

---

## Practical Implications for Engineering Teams

The architectural choices behind BigQuery's vector search create specific trade-offs that engineering teams need to understand before committing to this approach.

### 1. Query Latency vs. Throughput

BigQuery vector searches typically complete in 1-10 seconds, not the sub-100ms latency of specialized vector databases. But you can run thousands of searches concurrently without degradation. This makes BigQuery ideal for batch recommendation generation, similarity analysis across product catalogs, or embedding-based data enrichment pipelines. It's the wrong choice for autocomplete features or real-time personalization that requires immediate responses.

### 2. Cost Model Considerations

BigQuery charges for data scanned, not query execution time. A vector search that scans 1TB costs the same whether it completes in 2 seconds or 20 seconds. This model favors workloads where you search large datasets infrequently rather than small datasets continuously. Running vector search on a 10GB table thousands of times per day will be more expensive than a dedicated vector database with fixed infrastructure costs.

### 3. Index Management Trade-offs

TreeAH indexes update automatically in the background when new data arrives, typically within 5-15 minutes. You cannot force immediate index updates or control index parameters like you can with HNSW or IVF indexes. This simplicity reduces operational overhead but limits optimization options. If your use case requires fine-tuning recall/latency trade-offs or immediate consistency after updates, you'll need a different solution.

### 4. Integration Benefits That Actually Matter

The ability to JOIN vector search results with business data in a single query is more powerful than it initially appears. Consider this query pattern:

```sql
WITH semantic_matches AS (
  SELECT item_id, distance
  FROM VECTOR_SEARCH(
    TABLE products,
    'embedding',
    (SELECT embedding FROM queries WHERE query_id = @query_id)
  )
)

SELECT p.*, s.distance
FROM semantic_matches s
JOIN products p USING (item_id)
WHERE p.in_stock = TRUE
  AND p.price BETWEEN 50 AND 200
  AND p.category_restrictions IS NULL
ORDER BY s.distance
LIMIT 20
```

This combines semantic search with business logic, inventory status, and access controls in one atomic operation. Implementing this with a separate vector database requires complex synchronization between systems.

---

## Conclusion

BigQuery's vector search implementation challenges our assumptions about what a data warehouse can do. Instead of building another specialized vector database, Google pushed their existing infrastructure to handle a fundamentally different workload.

The key insight is recognizing that vector search at scale is a data processing problem. And processing data at scale is what BigQuery was built for.

By leveraging its columnar architecture and hardware-aware algorithms like TreeAH, BigQuery makes a deliberate trade-off. It exchanges the sub-millisecond latency of in-memory systems for massive batch throughput and incredible resource efficiency. An index that uses **10x less memory** than HNSW is a trade-off many teams building analytical AI systems would gladly make.

The real power emerges when vectors live alongside business data. Complex queries that would require multiple systems and synchronization nightmares become simple SQL. "Find similar products, but only from reliable suppliers, in stock locally, with no recent quality issues." One query, one system, no architectural gymnastics.

This approach validates a broader trend: vector capabilities are becoming table stakes for data platforms. The question isn't whether your data platform will support vectors, but how well it integrates them into existing workflows.

For teams building analytical AI applications, BigQuery offers a pragmatic path. It won't win latency benchmarks against dedicated vector databases. But for batch processing, integrated analytics, and operational simplicity at scale, it demonstrates that sometimes the best vector database isn't a vector database at all. It's your data warehouse, evolved.

::: info Further Reading

- [BigQuery Under the Hood](https://cloud.google.com/blog/products/bigquery/bigquery-under-the-hood): Official architecture deep dive
- [ScaNN Algorithm Details](https://github.com/google-research/google-research/tree/master/scann/docs/algorithms.md): The mathematics behind TreeAH
- [Dremel: Interactive Analysis of Web-Scale Datasets](https://research.google/pubs/pub36632/): The foundational paper
- [Large-scale cluster management at Google with Borg](https://research.google/pubs/pub43438/): Understanding resource orchestration
- [Jupiter Rising: A Decade of Clos Topologies](https://research.google/pubs/pub43837/): Google's datacenter networking
- [BigQuery Vector Search: A Practitioner's Guide](https://medium.com/google-cloud/bigquery-vector-search-a-practitioners-guide-0f85b0d988f0): Optimization strategies

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Integrate Vector Search in Columnar Storage",
  "desc": "Integrating vector search into traditional data platforms is becoming a common task in the current AI-driven landscape. When Google announced general availability for vector search in BigQuery in early 2024, it joined a growing list of established da...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-integrate-vector-search-in-columnar-storage.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
