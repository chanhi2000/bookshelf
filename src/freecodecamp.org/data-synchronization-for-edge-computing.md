---
lang: en-US
title: "Data Synchronization for Edge Computing with SymmetricDS"
description: "Article(s) > Data Synchronization for Edge Computing with SymmetricDS"
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
      content: "Article(s) > Data Synchronization for Edge Computing with SymmetricDS"
    - property: og:description
      content: "Data Synchronization for Edge Computing with SymmetricDS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/data-synchronization-for-edge-computing.html
prev: /data-science/articles/README.md
date: 2025-03-13
isOriginal: false
author:
  - name: Divya Valsala Saratchandran
    url : https://freecodecamp.org/news/author/divyasaratchandran/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741798507678/d66ed2f3-4116-49ce-a4eb-06fcb7c36dc7.png
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
  name="Data Synchronization for Edge Computing with SymmetricDS"
  desc="Edge computing is a distributed system design that moves computation and data storage to where it’s most required - at the ‘edge’ of the network. Moving these tasks to the edge of the network enables computing in real time, which reduces the cost of ..."
  url="https://freecodecamp.org/news/data-synchronization-for-edge-computing"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741798507678/d66ed2f3-4116-49ce-a4eb-06fcb7c36dc7.png"/>

Edge computing is a distributed system design that moves computation and data storage to where it’s most required - at the ‘edge’ of the network. Moving these tasks to the edge of the network enables computing in real time, which reduces the cost of bandwidth and latency significantly.

But edge computing environments face various problems, such as synchronizing data between edge nodes (like local devices) and central systems (which are usually cloud or data centers).

Luckily, there are tools that can help with this. In this article, I’ll teach you how to use the open source data synchronization and database replication tool SymmetricDS. You’ll learn how you can best use it in edge computing environments in any business domain.

I will walk you through the key concepts behind SymmetricDS, and discuss how it helps you optimize performance for edge computing. We’ll also look at a use case of data synchronization in the retail industry.

---

## What is SymmetricDS?

[<FontIcon icon="fas fa-globe"/>SymmetricDS](https://symmetricds.org/about/) is an open source software tool used for data replication, synchronization, and integration between databases in distributed environments. Unlike traditional methods, where data synchronization tools are tailored for specific platforms or limited to the same database, SymmetricDS is designed and tailored to synchronize data between databases running on different platforms.

If you are working in an environment that requires only a single database type, and one-way synchronization is sufficient, traditional methods like database replication or scheduling ETL jobs might be an easier approach. But for complex environments that require more flexibility and real time integration (especially with edge devices like POS systems and industrial machines), SymmetricDS can give you a more adaptable solution.

::: note Prerequisites

Below are the prerequisites you’ll need before installing SymmetricDS:

1. **Java Runtime Environment (JRE):** Java 8.0 or above installed on your system.
2. **Database:** Running instance of a supported database like MySQL, PostgreSQL, Oracle, SQL server etc. and be familiar on how to configure it.
3. **System Requirements**: 2GB of RAM is recommended, and disk space requirements vary based on data volume and nodes involved in replication.

:::

---

## Understanding SymmetricDS Architecture

SymmetricDS provides a flexible edge computing architecture for data synchronization across multiple systems, including edge devices. Think of this tool as a flexible network that is setup as hub-and-spoke or peer-to-peer topology.

A hub-and-spoke topology has a central hub (cloud or on-premise server) that is connected to the spoke (edge) nodes. The central hub manages the configuration, orchestration, and monitoring of data synchronization, while these edge nodes capture and process data locally.

In peer-to-peer topology, there is no central hub and each edge node acts as both client and server sharing data with peers (edge nodes).

Each edge node runs its own SymmetricDS engine, which manages data synchronization for its local database. The synchronization process utilizes a pull-push model, where data changes are captured and queued at the edge, then transmitted to the central server or other nodes based on scheduled events or triggered by specific conditions.

One key advantage of using SymmetricDS in an edge environment is the ability to handle offline transactions efficiently. The edge nodes can operate autonomously during network interruptions and sync data once a network connection is available. This makes it ideal for retail POS systems, remote monitoring, and IoT deployments.

SymmetricDS consists of:

- **Nodes**: Individual database instances participating in synchronization.
- **Channels**: Logical groupings of tables for efficient data routing.
- **Triggers**: Capture data changes (INSERT, UPDATE, DELETE).
- **Routers**: Determine where data updates should be sent.
- **Batches**: Data is grouped into batches before syncing.
- **Conflict Resolution**: Handles data conflicts in case of concurrent updates

---

## Install and Set Up

### Step 1: Download and Install SymmetricDS

To get started with SymmetricDS, download and extract the file from the **Community Edition** (open-source) [<FontIcon icon="fas fa-globe"/>SourceForge.net](https://sourceforge.net/projects/symmetricds/files/latest/download) or **Pro Edition** (Licensed) from [<FontIcon icon="fas fa-globe"/>Jumpmind Inc](https://jumpmind.com). Make sure JAVA_HOME is set in your machine.

### Step 2: Create a Database

Install a supported database (for example, MySQL, PostgreSQL, Oracle, SQL Server, and so on). Create a database schema and tables.

### Step 3: Configure a node

Each participating database is a node. You define nodes in `symmetric-ds.properties`. Here’s an example configuration:

```properties title="symmetric-ds.properties"
engine.name=my-node
db.driver=com.mysql.cj.jdbc.Driver
db.url=jdbc:mysql://localhost:3306/mydb
db.user=root
db.password=root
sync.url=http://localhost:31415/sync/my-node
registration.url=http://localhost:31415/sync/hub
```

And here’s what’s going on in the above SQL:

- `engine.name=my-node` assigns a name to the SymmetricDS instance.
- `db.driver=com.mysql.cj.jdbc.Driver` specifies the JDBC driver for MySQL.
- `db.url=jdbc:mysql://localhost:3306/mydb` points to the database URL.
- `db.user=root` & `db.password=root` are credentials for database access.
- `sync.url` defines the URL for synchronization (where this node sends data).
- `registration.url` specifies the hub node URL that manages registrations.

### Step 4: Start SymmetricDS

To start SymmetricDS, run the following command from the extracted folder:

::: tabs

@tab <FontIcon icon="fa-brands fa-windows"/>

```batchfile
sym_service.bat start
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
./sym_service start
```

:::

This launches the SymmetricDS engine, which begins monitoring the configured database for changes.

---

## Define Synchronization Rules

One of the key components of SymmetricDS is its synchronization rules, which determine which data changes should be captured and routed across the edge nodes. These rules are configurable and define how and when the data is transferred between databases.

Here are some steps to consider while setting your synchronization rules:

### Step 1: Define a Node Group

In SymmetricDS, configuration rules are applied to groups of nodes. This helps control how the data flows between different nodes in a distributed environment.

```sql
INSERT INTO SYM_NODE_GROUP (node_group_id, description)
VALUES ('Store', 'Store Node');
INSERT INTO SYM_NODE_GROUP (node_group_id, description)
VALUES ('Corp', 'Corp Node');
```

In this code,

- The `Store` group represents edge nodes (for example, store databases).
- The `Corp` group represents the central hub node.

### Step 2: Define Group Links

Group Links define which node group will initiate the synchronization for the data exchange. They help define the relationship between two or more node groups, specifying how and when data will flow between the groups.

```sql
INSERT INTO SYM_NODE_GROUP_LINK (source_node_group_id, target_node_group_id, data_event_action)
VALUES ('Store', 'Corp', 'P'); // 'P' represents 'Push'
INSERT INTO SYM_NODE_GROUP_LINK (source_node_group_id, target_node_group_id, data_event_action)
VALUES ('Corp', 'Store', 'W'); // 'W' represents 'Wait for Pull'
```

Here,

- Stores push data (`'P'`) to the Corp node (for example, sending sales data to HQ).
- Stores wait to pull (`'W'`) data from Corp (for example, receiving inventory updates).

### Step 3: Define Router and Trigger Router for Data Flow

Routers help filter the data that needs to be synchronized based on specific rules, such as based on the type of operation (insert, update, delete, and so on). It helps to ensure that only the necessary data gets routed to the correct destination by eliminating unnecessary data transfer.

```sql
INSERT INTO SYM_ROUTER (router_id, source_node_group_id, target_node_group_id, router_type, 
sync_on_update, sync_on_insert, sync_on_delete)
VALUES('corp to store', 'corp', 'store', 'default ', 1, 1, 1);
INSERT INTO SYM_TRIGGER_ROUTER (trigger_id, router_id, initial_load_order)
VALUES('user', 'corp to store', '1');
```

This code does the following:

- Defines a router named `'corp to store'`, which synchronizes data from Corp to Store.
- The `'default'` router type is used.
- `sync_on_update = 1` updates in Corp will be synced to Store.
- `sync_on_insert = 1` inserts in Corp will be synced to Store.
- `sync_on_delete = 1` deletes in Corp will be synced to Store.

Now, we link this router to a trigger:

```sql
INSERT INTO SYM_TRIGGER_ROUTER (trigger_id, router_id, initial_load_order)
VALUES ('user', 'corp to store', '1');
```

This makes sure that the trigger (user table changes) is routed according to the `'corp to store'` rule.

### Step 4: Define channels for synchronization

Channels define the logical grouping of data in tables that help organize and separate the data flows that make synchronization more efficient and scalable.

```sql
INSERT INTO SYM_CHANNEL (channel_id, max_batch_size, max_batch_to_send, max_data_to_route, 
enabled, batch_algorithm, description)
VALUES ('users', '10000', '100', '500000', '1', 'default', 'user data');
```

This code:

- Defines a channel named `'users'`.
- Batches data into chunks of `10,000` rows per sync.
- Ensures efficiency by limiting `100` batches per sync and `500,000` records per route.

### Step 5: Define Table Triggers

Defining table triggers helps detect and manage changes in the database table. They serve as the event listeners that track changes in your source database. Without table triggers, the system wouldn’t know when to start syncing changes or which data to be synchronized.

```sql
INSERT INTO SYM_TRIGGER (trigger_id, source_table_name, channel_id)
VALUES ('user', 'user', 'user');
```

This code tracks changes in the `user` table. Changes are routed through the `users` channel.

### Step 6: Test Data Sync

To test synchronization, insert some test data into the source database:

```sql
INSERT INTO user (id, name, email) VALUES (1, 'Alice', 'alice@example.com');
```

Then run SymmetricDS sync and check if the record appears in the target database.

### Step 7: Monitoring and Troubleshooting

Check logs in `logs/wrapper.log file`. If a batch fails, check the error by running the following SQL query:

```sql
SELECT * FROM SYM_OUTGOING_BATCH WHERE ERROR_FLAG = 1;
```

As a result of executing the above query, it will retrieve the errored BATCH_ID. Run the following SQL to get the exact data of the failed batch:

```sql
SELECT * FROM SYM_DATA WHERE data_id in (select failed_data_id from sym_outgoing_batch 
WHERE batch_id='XXXXX' and node_id='YYYY');
```

---

## Benefits of SymmetricDS in Edge Computing

In the context of edge computing, where data is being processed closer to the source (for example, POS systems, IoT devices, sensors, and so on), SymmetricDS offers several advantages to make it a robust tool for data synchronization:

1. **Lower latency**: SymmetricDS allows for local data processing and synchronization to the central server on regular intervals, reducing the latency involved with real-time processing in cloud environments.
2. **Bandwidth optimization:** it transmits incremental changes rather than complete datasets, which reduces the need for continuous data transfer. This helps save bandwidth.
3. **Fault tolerance**: it delivers data replication in disconnected environments, a key feature for edge computing where connectivity may be unreliable or intermittent. It also helps with offline processing.
4. **Scalability**: it scales to numerous edge nodes and supports complex architectures, ensuring that performance improves even when more system features are added.

---

## Use Case: How SymmetricDS Solves Real-Time Data Challenges for Retailers

Imagine a retail chain of stores with multiple outlets in a country, state, or region. Every store is independent with its own local Point of Sale (POS) system, inventory system, and customer interaction databases.

But the head office depends on real-time information from all the stores for key decisions, such as inventory changes, generating sales reports, monitoring customer activity, and promotions. So the goal is to synchronize all this data from numerous store locations with low latency in such a way that inventory levels are accurate, transactions are properly recorded, and store operations are synchronized.

One of the most common issues in retail is inventory inconsistencies between stores. If an item is selling in one store, the inventory system must catch up with that immediately to prevent over-selling or under-stocking elsewhere. Traditional data synchronization approaches will bring delays or errors, leading to out-of-stock situations or overstocks in some stores.

SymmetricDS provides a more reliable solution for real-time data synchronization across all stores and the central system. Whenever any product is sold at any store, SymmetricDS immediately updates the inventory data in both the local store system and the central database. This enables other stores to maintain the current inventory levels and prevent inconsistencies in the network.

---

## Conclusion

SymmetricDS has a robust feature set to streamline edge computing environments. Through its emphasis on incremental data synchronization, data compression and asynchronous replication, SymmetricDS streamlines performance in latency, bandwidth usage, and fault tolerance.

In a practical application, employing SymmetricDS in an edge computing environment can greatly enhance the efficiency of distributed applications, allowing for greater scalability, quicker decision-making, and less dependence on central servers.

By using the methods we’ve discussed here, edge devices can still operate autonomously, sync successfully with the main server, and maintain high-performance output even in peak conditions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Data Synchronization for Edge Computing with SymmetricDS",
  "desc": "Edge computing is a distributed system design that moves computation and data storage to where it’s most required - at the ‘edge’ of the network. Moving these tasks to the edge of the network enables computing in real time, which reduces the cost of ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/data-synchronization-for-edge-computing.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
