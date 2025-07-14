---
lang: en-US
title: "Optimizing UUID Storage in SQLDelight: Text vs. Two Longs and a Look Ahead at UUID v7"
description: "Article(s) > Optimizing UUID Storage in SQLDelight: Text vs. Two Longs and a Look Ahead at UUID v7"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Optimizing UUID Storage in SQLDelight: Text vs. Two Longs and a Look Ahead at UUID v7"
    - property: og:description
      content: "Optimizing UUID Storage in SQLDelight: Text vs. Two Longs and a Look Ahead at UUID v7"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/optimizing-uuid-storage-in-sqldelight-text-vs-two-longs-and-a-look-ahead-at-uuid-v7.html
prev: /programming/java-android/articles/README.md
date: 2024-12-09
isOriginal: false
author: Kerry Bisset
cover: https://droidcon.com/wp-content/uploads/2024/12/1_jy52R5bsDkIzf-_scGFQ5g.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Optimizing UUID Storage in SQLDelight: Text vs. Two Longs and a Look Ahead at UUID v7"
  desc="Primary keys are fundamental to maintaining data integrity and enabling efficient data retrieval. They uniquely identify each record in a table, ensuring no duplicate entries exist and that relationships between tables can be accurately established. Traditionally, primary keys have been simple numerical identifiers. However, as systems have evolved — especially distributed systems — the need for more robust and globally unique identifiers has emerged."
  url="https://droidcon.com/optimizing-uuid-storage-in-sqldelight-text-vs-two-longs-and-a-look-ahead-at-uuid-v7"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/12/1_jy52R5bsDkIzf-_scGFQ5g.webp"/>

![](https://droidcon.com/wp-content/uploads/2024/12/1_jy52R5bsDkIzf-_scGFQ5g.webp)

Primary keys are fundamental to maintaining data integrity and enabling efficient data retrieval. They uniquely identify each record in a table, ensuring no duplicate entries exist and that relationships between tables can be accurately established. Traditionally, primary keys have been simple numerical identifiers. However, as systems have evolved — especially distributed systems — the need for more robust and globally unique identifiers has emerged.

Universally Unique Identifiers (UUIDs) address this need. UUIDs are 128-bit values designed to be unique across different systems and times, making them ideal for distributed environments where multiple nodes might generate identifiers independently. Version 4 UUIDs (UUID v4), in particular, are randomly generated, providing a high degree of uniqueness without relying on a central authority or coordination between nodes.

Using UUIDs as primary keys in Kotlin applications that interact with databases presents certain challenges, especially when utilizing libraries like SQLDelight. SQLDelight is a powerful tool that generates type-safe Kotlin APIs from SQL queries but does not natively support a UUID column type. This limitation forces developers to decide on the most effective way to store UUIDs in their SQLDelight schemas.

This article examines two primary methods of storing UUID v4 values in a SQLDelight-managed database:

1. **Storing UUIDs as Text**: This straightforward approach involves saving the UUID as a string in a`TEXT`column. It leverages the human-readable format of UUIDs, simplifying debugging and logging processes.
2. **Storing UUIDs as Two Longs**: A more space-efficient method involves splitting the UUID into its most significant bits (MSB) and least significant bits (LSB), each stored in separate`BIGINT`(`Long`) columns. This approach can offer performance benefits but introduces additional complexity in handling the UUID data.

The following sections explore each method’s implementation details, advantages, and disadvantages. A performance comparison is included to assist in making an informed decision based on specific application needs. While UUID v7 promises to address some of these challenges with time-based ordering and improved performance, it has yet to be widely supported, making UUID v4 the current standard in many applications.

---

## Understanding UUID v4 and Kotlin.UUID

### What Is UUID v4?

A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems uniquely. Standardized by the Open Software Foundation (OSF) as part of the Distributed Computing Environment (DCE), UUIDs are essential for ensuring that identifiers are unique within a single system and across multiple systems worldwide.

Version 4 UUIDs (UUID v4) are generated using random numbers. This randomness provides a very low probability of generating duplicate UUIDs, making them ideal for applications that require unique identifiers without central coordination. A typical UUID v4 is represented as a string of five groups of hexadecimal digits separated by hyphens, following the pattern 8–4–4–4–12. For example:

```plaintext title="uuid"
f47ac10b-58cc-4372-a567-0e02b2c3d479
```

The structure of a UUID v4 is as follows:

- **Time Low (8 hexadecimal digits):**Randomly generated.
- **Time Mid (4 hexadecimal digits):**Randomly generated.
- **Time High and Version (4 hexadecimal digits):**The first 12 bits are random, and the next 4 bits represent the version (0100 for version 4).
- **Clock Sequence (4 hexadecimal digits):**The first 2 bits are variant bits, and the remaining 14 bits are random.
- **Node (12 hexadecimal digits):**Randomly generated.

UUIDs allow systems to generate unique identifiers independently, reducing the need for centralized ID generation mechanisms and minimizing the risk of identifier collisions in distributed environments.

::: tip Generating a UUID v4 in Kotlin (Since Kotlin 2.0)

```kotlin
val uuid = Uuid.random()
```

:::

### Accessing UUID Components

Each UUID consists of two 64-bit numbers:

- **Most Significant Bits (MSB):**The first 64 bits of the UUID.
- **Least Significant Bits (LSB):**The last 64 bits of the UUID.

In Kotlin, these can be accessed as follows:

```kotlin
val key = uuid.toLongs { msb, lsb -> // Do something with the components }
```

These components are crucial when considering alternative storage methods, such as storing the UUID as two`BIGINT`(`Long`) values in a database.

#### Reconstructing a UUID from MSB and LSB

To reconstruct a UUID from its most and least significant bits:

```kotlin
Uuid.fromLongs(msb, lsb)
```

---

## Challenges with UUIDs in Kotlin and SQLDelight

While Kotlin’s interoperability with Java provides robust UUID handling, integrating UUIDs with SQLDelight requires additional considerations:

- **No Native UUID Type in SQLDelight:**SQLDelight does not support a UUID column type out of the box, necessitating alternative storage solutions.
- **Data Type Mapping:**Deciding whether to store UUIDs as`TEXT`strings or split them into numeric types affects performance and complexity.
- **Serialization and Deserialization:**Converting UUIDs to and from the chosen storage format adds overhead and potential points of failure if not handled correctly.

### Option 1: Storing UUIDs as Text

#### SQLDelight Schema

The SQLDelight schema defines the`player`table, where the`id`the column is of type`TEXT`and serves as the primary key. The schema also includes several queries for interacting with the data:

```sql
CREATE TABLE IF NOT EXISTS player (
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER AS Int NOT NULL
);
```

Here:

- `id`is a`TEXT`field that stores the UUID as a string.
- `name`and`age`are additional fields to store player data.

The schema also provides queries for inserting, retrieving, and managing players.

#### Repository

The`PlayerRepository`the class provides functions to interact with the`player`table.

```kotlin :collapsed-lines title="PlayerRepository.kt"
class PlayerRepository(private val queries: PlayerQueries) {

    suspend fun insertPlayer(players: Players) {
        queries.storePlayer(players.uuid.toString(), players.name, players.age)
    }

    suspend fun getPlayer(id: Uuid): Players? {
        return queries.getPlayers(id.toString()).executeAsOneOrNull()?.let {
            Players(id, it.name, it.age)
        }
    }

    suspend fun getAllPlayers(): List<Players> {
        return queries.getAllPlayers().executeAsList().map {
            Players(Uuid.parse(it.id), it.name, it.age)
        }
    }

    suspend fun getRandomPlayer(): Players? {
        return queries.getRandomPlayer().executeAsOneOrNull()?.let {
            Players(Uuid.parse(it.id), it.name, it.age)
        }
    }
}
```

#### Advantages

::: tabs

@tab:active Ease of Implementation

- Directly storing UUIDs as strings is straightforward and does not require additional complexity in the schema or repository.

@tab Human-Readable

- UUIDs stored as text are easy to debug and analyze directly in the database.

@tab Compatibility

- Most databases and tools natively support string-based fields, making this method universally compatible.

:::

#### Drawbacks

::: tabs

@tab:active Storage Overhead

- A`UUID`stored as text uses 36 characters, consuming more space compared to numeric representations like two`BIGINT`columns.

@tab Performance Impact

- String-based queries, indexing, and comparisons are slower than operations on numeric fields.

@tab Conversion Overhead

- The repository must handle conversions between`UUID`and`TEXT`For every database operation, additional processing overhead is introduced.

:::

However, for applications requiring high performance or handling large datasets, alternative methods like storing UUIDs as two`LONG`columns may be more appropriate.

### Option 2: Storing UUIDs as Two Longs

Storing UUIDs as two`LONG`columns involves splitting the UUID into its Most Significant Bits (MSB) and Least Significant Bits (LSB). This approach is designed to optimize storage and query performance while maintaining the uniqueness and functionality of UUIDs.

#### SQLDelight Schema

The schema for the`playerTwo`table uses two`INTEGER`columns to store the MSB and LSB, with the combination of these columns serving as the primary key:

```sql
CREATE TABLE IF NOT EXISTS playerTwo (
    msBit INTEGER NOT NULL,
    lsBit INTEGER NOT NULL,
    name TEXT NOT NULL,
    age INTEGER AS Int NOT NULL,
    PRIMARY KEY (msBit, lsBit)
);
```

Here:

- `msBit`and`lsBit`store the 64-bit parts of the UUID.
- `name`and`age`hold additional player data.
- The combination of`msBit`and`lsBit`ensures uniqueness.

#### Repository

The`Player2Repository`class facilitates interaction with the`playerTwo`table and handles the conversion between UUID objects and their split components (`msb`and`lsb`).

```kotlin :collapsed-lines title="Player2Repository.kt"
class Player2Repository(private val queries: Player2Queries) {

    suspend fun insertPlayer(players: Players) {
        val key = players.uuid.toLongs { msb, lsb -> UuidKey(msb, lsb) }

        queries.storePlayerTwo(key.msb, key.lsb, players.name, players.age)
    }

    suspend fun getPlayer(id: Uuid): Players? {
        val key = id.toLongs { msb, lsb -> UuidKey(msb, lsb) }

        return queries.getPlayersTwo(key.msb, key.lsb).executeAsOneOrNull()?.let {
            Players(id, it.name, it.age)
        }
    }

    suspend fun getAllPlayers(): List<Players> {
        return queries.getAllPlayersTwo().executeAsList().map {
            Players(UuidKey(it.msBit, it.lsBit).toUuid(), it.name, it.age)
        }
    }

    data class UuidKey(val msb: Long, val lsb: Long) {
        fun toUuid(): Uuid {
            return Uuid.fromLongs(msb, lsb)
        }
    }
}
```

#### Advantages

::: tabs

@tab:active Storage Efficiency

- UUIDs stored as two`BIGINT`columns use less space compared to their string representation (`TEXT`), reducing overall database size.

@tab Improved Query Performance

- Numeric fields are faster to compare and index than text fields, leading to better query performance, especially in large datasets.

@tab Compatibility with Numeric Indexing

- Leveraging indexes on`msBit`and`lsBit`improves the speed of lookups and range-based queries.

:::

#### Drawbacks

::: tabs

@tab:active Increased Complexity

- Splitting and reconstructing UUIDs adds complexity to the application code and repository layer.

@tab Debugging Challenges

- MSB and LSB values are less intuitive for debugging than human-readable UUID strings.

@tab Potential for Errors

- Incorrect handling of MSB and LSB during storage or retrieval could lead to invalid UUID reconstruction.

:::

### Hypothesis Results: Performance Comparison

The hypothesis tests aim to evaluate the performance of two different UUID storage methods in SQLDelight: storing UUIDs as`TEXT`and storing them as two`BIGINT`columns (MSB and LSB). The tests measure retrieval speed and assess the overhead of each approach.

#### Experimental Setup

**Data Insertion:**

- Insert a large dataset of 25,000 player records into both repositories (`playerRepository`using`TEXT`storage and`player2Repository`using two`BIGINT`columns).

**Each record includes:**

- A randomly generated UUID.
- A randomly generated name composed of two random first names.
- A random age between 18 and 99.

```kotlin :collapsed-lines
init {
    viewModelScope.launch(Dispatchers.IO + CoroutineExceptionHandler { \_, throwable ->
        println("An error occurred: ${throwable.localizedMessage}")
    }) {
        if (playerRepository.getPlayer(initialUuid) == null) {
            println("Player not found, inserting dummy data.")
            playerRepository.insertPlayer(Players(initialUuid, "John Doe", 25))
            player2Repository.insertPlayer(Players(initialUuid, "John Doe", 25))

            for (i in 0..25000) {
                val uuid = Uuid.random()
                val age = Random(11)

                val players = Players(
                    uuid,
                    "${CommonFirstNames.getRandom()} ${CommonFirstNames.getRandom()}",
                    age.nextInt(18, 99)
                )
                playerRepository.insertPlayer(players)
                player2Repository.insertPlayer(players)
            }
            println("Data insertion completed.")
            withContext(Dispatchers.Main) {
                speedTestReady.value = true
            }
        } else {
            println("Player already exists, skipping insertion.")
            withContext(Dispatchers.Main) {
                speedTestReady.value = true
            }
        }
    }
}
```

#### Speed Test

- Retrieve players randomly 1,000 times in a loop for each repository.
- Measure retrieval time in nanoseconds for each query and convert it to milliseconds for readability.
- Average the results across 500 runs.

```kotlin :collapsed-lines
MainInteraction.RunSpeedTest -> {
    viewModelScope.launch(Dispatchers.Default) {
        for (i in 0..500) {
            var playerOneTimeInMillis = 0.0
            var playerTwoTimeInMillis = 0.0

            for (i in 0..1000) {
                val values = playerRepository.getRandomPlayer()?.uuid ?: initialUuid

                //Measure the time it takes to get a player from the first repository in nanoseconds
                // and convert it to milliseconds
                playerOneTimeInMillis += measureNanoTime {
                    playerRepository.getPlayer(values)
                } / 1\_000\_000.0

                playerTwoTimeInMillis += measureNanoTime {
                    player2Repository.getPlayer(values)
                } / 1\_000\_000.0
            }

            withContext(Dispatchers.Main) {
                playerOneRepoTime.value = playerOneTimeInMillis
                playerTwoRepoTime.value = playerTwoTimeInMillis

                println("Time 1, $playerOneTimeInMillis , Time 2, $playerTwoTimeInMillis")
            }
        }
    }
}
```

**Metrics Captured:**

- Average retrieval time for`playerRepository`.
- Average retrieval time for`player2Repository`.

#### Expected Results

**Query Performance:**

- `player2Repository`(storing UUIDs as MSB and LSB) is expected to outperform`playerRepository`(storing UUIDs as`TEXT`) in retrieval times.

#### Preliminary Observations

**Data Insertion:**

- Inserting 25,000 records into both repositories completed successfully.
- Periodic logs (e.g., at every 1,000 records) confirm the progress of the data insertion process.

**Speed Test Execution:**

- Each repository retrieves a random player and logs the time taken.
- The total time for 1,000 retrievals is recorded and averaged across 500 runs.

![](https://droidcon.com/wp-content/uploads/2024/12/1_2ngG5EhOTfd-KtoykAybBA-1024x162.webp)

#### Analysis of Results

**Average Retrieval Time:**

- Storing UUIDs as two`BIGINT`columns resulted in an average retrieval time of**95.26 ms**, which is approximately**15.7% faster**than the`TEXT`storage method (112.96 ms).
- This demonstrates the expected performance advantage of numeric comparisons over string comparisons in database queries.

**Standard Deviation:**

- The standard deviation for the`Two Key`method (6.02) is smaller compared to the`String`method (9.06), indicating that the retrieval times for the`Two Key`the method was more consistent.
- This suggests better overall reliability and predictability in query performance when using numeric storage.

Another study was performed with a more extensive database size, and the results indicated the same pattern. Storing UUIDs as two`BIGINT`columns resulted in an average retrieval time of**259.65 ms**, approximately**27.2% faster**than the`TEXT`storage method (356.50 ms).

![](https://droidcon.com/wp-content/uploads/2024/12/1_YBM-NtFart3HNPjw-nHU0Q.webp)

250,000 Items in Database, sum of time for 1000 random retrivals

---

## Considering UUID v7

UUID v7 significantly improves use cases where time-based ordering and indexing are critical. Unlike UUID v4, which is entirely random, UUID v7 incorporates a timestamp component, making it partially sequential. This design aligns with modern database indexing strategies, offering potential performance benefits when querying large datasets.

### Advantages of UUID v7

::: tabs

@tab:active Time-Based Ordering

- UUID v7 ensures that newly generated IDs are sequential, optimizing database indexing and range queries.
- This property reduces the likelihood of index fragmentation compared to UUID v4, which is fully random.

@tab Compatibility with UUID Standards

- UUID v7 adheres to the same 128-bit structure as other UUID versions, ensuring compatibility with existing systems.

@tab Improved Performance

- Time-based IDs allow databases to organize records more efficiently, potentially improving query performance for time-sensitive operations.

:::

### Challenges with UUID v7

::: tabs

@tab:active Lack of Native Support

- UUID v7 is not widely supported in Kotlin’s library or SQLDelight. Developers would need to rely on third-party libraries or custom implementations.

@tab Implementation Complexity

- Custom implementations or libraries may require additional maintenance and validation to ensure correctness.

:::

### Potential Use Cases

- Applications that require chronological ordering of records, such as logging systems or event trackers.
- Efficient indexing is crucial for scalability in databases with high write and read operations.

### Future Prospects

As UUID v7 becomes more standardized and supported in frameworks like Kotlin and SQLDelight, it will likely emerge as the preferred choice for UUID storage in scenarios demanding time-based indexing. Its adoption could simplify storage strategies while maintaining the benefits of UUIDs for distributed systems.

---

## Wrap Up

The choice of how to store UUIDs in a SQLDelight database is an important decision that balances performance, simplicity, and future scalability. By comparing two approaches — storing UUIDs as`TEXT`versus splitting them into two`BIGINT`columns—we’ve highlighted the trade-offs involved:

### Storing UUIDs as `TEXT`

- Offers simplicity and ease of implementation.
- Ideal for debugging and human-readable outputs.
- Comes with a performance cost due to larger storage size and slower string comparisons.

### Storing UUIDs as Two `BIGINT` Columns

- Reduces storage requirements and improves query performance.
- Numeric comparisons and indexing provide consistent and faster results.
- Introduces additional complexity for splitting and reconstructing UUIDs.

The performance results confirmed that using two`BIGINT`columns is approximately 15.7% faster on average than storing UUIDs as`TEXT`. This makes the two-key method an excellent choice for applications with large datasets or high-performance requirements. On the other hand, the simplicity of`TEXT`storage makes it more appealing for smaller projects or scenarios where developer convenience is prioritized.

We also briefly explored the emerging UUID v7 standard, which promises to combine the benefits of time-based ordering with the unique properties of UUIDs. While it has yet to be widely supported in Kotlin or SQLDelight, its potential for optimizing database performance and scalability is exciting.

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/optimizing-uuid-storage-in-sqldelight-text-vs-two-longs-and-a-look-ahead-at-uuid-v7-59c24986a866)

<SiteInfo
  name="Optimizing UUID Storage in SQLDelight: Text vs. Two Longs and a Look Ahead at UUID v7"
  desc="Primary keys are fundamental to maintaining data integrity and enabling efficient data retrieval. They uniquely identify each record in a…"
  url="https://proandroiddev.com/optimizing-uuid-storage-in-sqldelight-text-vs-two-longs-and-a-look-ahead-at-uuid-v7-59c24986a866/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1024/1*jy52R5bsDkIzf-_scGFQ5g.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Optimizing UUID Storage in SQLDelight: Text vs. Two Longs and a Look Ahead at UUID v7",
  "desc": "Primary keys are fundamental to maintaining data integrity and enabling efficient data retrieval. They uniquely identify each record in a table, ensuring no duplicate entries exist and that relationships between tables can be accurately established. Traditionally, primary keys have been simple numerical identifiers. However, as systems have evolved — especially distributed systems — the need for more robust and globally unique identifiers has emerged.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/optimizing-uuid-storage-in-sqldelight-text-vs-two-longs-and-a-look-ahead-at-uuid-v7.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
