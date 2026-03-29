---
lang: en-US
title: "How to Build an Open Source Data Lake for Batch Ingestion"
description: "Article(s) > How to Build an Open Source Data Lake for Batch Ingestion"
icon: fa-brands fa-docker
category:
  - Python
  - Airflow
  - DevOps
  - Docker
  - Data Science
  - Apache Spark
  - Apache Hive
  - Apache Airflow
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - docker
  - data-science
  - spark
  - apachespark
  - apache-spark
  - hive
  - apachehive
  - apache-hive
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Open Source Data Lake for Batch Ingestion"
    - property: og:description
      content: "How to Build an Open Source Data Lake for Batch Ingestion"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-open-source-data-lake-for-batch-ingestion.html
prev: /devops/docker/articles/README.md
date: 2026-04-16
isOriginal: false
author:
  - name: Puneet Singh
    url: https://freecodecamp.org/news/author/psmir/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ef685075-beac-4bf4-b435-6e942e5e1ac1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Airflow > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-airflow/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Airflow > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-airflow/articles/README.md",
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

```component VPCard
{
  "title": "Apache Hive > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/hive/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an Open Source Data Lake for Batch Ingestion"
  desc="Creating a data platform has been made easier by cloud data analytics platforms like Databricks, Snowflake, and BigQuery. They offer excellent ramp-up and scaling options for small to mid-size teams. "
  url="https://freecodecamp.org/news/how-to-build-an-open-source-data-lake-for-batch-ingestion"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ef685075-beac-4bf4-b435-6e942e5e1ac1.png"/>

Creating a data platform has been made easier by cloud data analytics platforms like Databricks, Snowflake, and BigQuery. They offer excellent ramp-up and scaling options for small to mid-size teams.

But the trade-off isn't just merely renting the outside infrastructure. It also includes proprietary abstraction lock-in, and an operational and security surface area built on top of vendor capabilities.

In this article, you'll set up a batch ingestion layer on an open-source data lake stack where you own every component.

The focus is deliberately narrow. We'll get the ingestion layer up and running end-to-end. Then we'll build on foundations that allow future extension: analytics, governance, and stream processing without locking you into any single tool for those layers. We'll also review documented integration failures along the way: misconfigured catalogs, partition values written as NULL, and Python version mismatches.

::: info By the end, you'll have:

- A working single-node data lake running on Docker (compose), built on RustFS (object storage), Apache Iceberg (table format), and Project Nessie (catalog).
- A batch pipeline orchestrated with Apache Airflow, executing PySpark jobs that write versioned, partitioned Iceberg tables.
- A real-world ingestion pattern, an external web scraper decoupled from Airflow via Redis, writing raw data to object storage with a lightweight signal table.
- A view of what this stack is and isn't, and what you'd add to take it toward production.

:::

A word on scope: this covers the E in [<VPIcon icon="fas fa-globe"/>ELT](https://getdbt.com/blog/extract-load-transform): getting data in. Transformation (dbt, Spark SQL) and analytics (Trino, Superset) are a natural next layer, but are outside the scope of this article. What you build here is the foundation they'd sit on.

---

## The Ingestion Problem

The structure of a stack/solution is easier to understand with a use case. A high-level goal is to ingest financial data from external market APIs for trend analysis. You'll focus specifically on setting up ingestion of such data into the warehouse for further analytics.

The data is ingested via a web crawler with a specific rate limit per endpoint. In Batch processing, time-based partitioning is effective for processing by downstream pipelines. It also favors cleaner data retention.

The crawler runs as an external process, decoupled from Airflow via a Redis job queue. This keeps rate limiting and crawl lifecycle outside the orchestration layer, with each component failing and recovering independently.

During ingestion, the priority is data landing with high reliability due to the lack of idempotency in crawl jobs.

---

## Stack

- [<VPIcon icon="fas fa-globe"/>RustFS](https://rustfs.com/): An S3-compatible object store written in Rust
- [<VPIcon icon="fas fa-globe"/>Project Nessie](https://projectnessie.org/):* Transactional catalog for Apache Iceberg tables
- [<VPIcon icon="iconfont icon-apachespark"/>Apache Spark](https://spark.apache.org/): Distributed compute engine
- [<VPIcon icon="iconfont icon-apacheairflow"/>Apache Airflow](https://airflow.apache.org/): Job scheduling and orchestration
- [<VPIcon icon="iconfont icon-jupyter"/>Jupyter Notebook](https://jupyter.org/) *(optional)*: Ad-hoc Spark queries against Iceberg tables, not covered in this article
- **Scrapredis:** Job queue for the web crawler
- **Scrapworker:** Web crawler and ingestion worker

This setup was tested on a 4-core x86/AMD CPU, 16GB RAM, 60GB disk GCP VM running Debian GNU/Linux 11 (Bullseye). Docker with Compose v2 is required. The setup should work on any comparable Linux environment with similar or better specs.

---

## System Overview

![Data Platform Architecture](https://cdn.hashnode.com/uploads/covers/69607e708806706b5c49c7af/429a1e8a-bc39-44dc-8e0b-2cd9152370f5.png)

The crawler runs as an external process, decoupled from Airflow via a Redis job queue. Airflow pushes a job specification to the queue containing the endpoint, query params, and target path. The crawler picks it up, executes the crawl, and writes raw results directly to object storage.

This separation keeps rate limiting and crawl lifecycle concerns outside the orchestration layer, and isolates failure modes.

A crawl failure is harder to recover since crawl jobs lack idempotency. Pipeline failures after the crawl stage are independently retryable without re-triggering a crawl.

---

## Quick Start

First, initialize the project:

```sh
# Clone the repository
git clone https://github.com/ps-mir/data-platform

# Create the shared Docker network
docker network create data-platform

# Create host directories, set permissions, and download Spark JARs
chmod +x init.sh && ./init.sh
```

Start services in this order (shutdown in reverse):

```sh
# RustFS
cd rustfs && docker compose up -d
# Nessie
cd nessie && docker compose up -d
# Spark — requires a build on first run
cd spark && docker compose build && docker compose up -d
# Scrapredis
cd scrapredis && docker compose up -d
# Airflow — requires a build on first run
cd airflow-docker && docker compose build && docker compose up -d
```

Create the Nessie namespaces once after Nessie is up:

```sh
curl -X POST http://localhost:19120/iceberg/v1/main/namespaces \
  -H "Content-Type: application/json" \
  -d '{"namespace": ["default"]}'

curl -X POST http://localhost:19120/iceberg/v1/main/namespaces \
  -H "Content-Type: application/json" \
  -d '{"namespace": ["scraper"]}'
```

Scrapworker runs on the host directly (it's not dockerized). It requires Python >=3.14:

```sh
cd scrapworker
pip install -e .
CONFIG_PATH=./config/config.local.yaml RUSTFS_ACCESS_KEY=rustfsadmin RUSTFS_SECRET_KEY=rustfsadmin python -m scrapworker
```

Scrapworker must be running before activating `scraper_pipeline_v1` in Airflow. Without it, the pipeline will push jobs to the queue with no worker to pick them up and hang indefinitely in `wait_for_completion`.

Trino is also present in setup but not tested for integration with Nessie yet.

---

## Running the Pipelines

With the stack running, the next step is to activate the pipelines in Airflow. All DAGs are paused at creation by default. The four pipelines build on each other in complexity. Working through them in order is the fastest way to confirm that each layer of the stack is wired correctly before moving to the next.

All four pipelines are loaded but paused by default. Unpause each one in the Airflow UI before triggering.

![All Airflow Pipelines](https://cdn.hashnode.com/uploads/covers/69607e708806706b5c49c7af/38f95d52-c092-4a00-b660-1233077b781b.png)

Let's go over each pipeline:

### spark_static_data_v1_skeleton: [Hello DAG (<VPIcon icon="iconfont icon-github"/>`ps-mir/data-platform`)](https://github.com/ps-mir/data-platform/blob/07ad47d68fec51f48cd41560921d509a70c5bb6f/airflow-docker/dags/step1_hello_dag.py)

This is a minimal DAG with no Spark, just a Python task that prints a message. If it goes green, Airflow's scheduler and worker are healthy. `[2026-04-09 22:00:01] INFO - Task operator:<Task(_PythonDecoratedOperator): say_hello>`

### spark_static_data_v2_submit: [Spark Submit (<VPIcon icon="iconfont icon-github"/>`ps-mir/data-platform`)](https://github.com/ps-mir/data-platform/blob/07ad47d68fec51f48cd41560921d509a70c5bb6f/airflow-docker/dags/step2_spark_submit.py)

This submits a PySpark job via `SparkSubmitOperator` that writes a static dataset to an Iceberg table. No partitioning, every run overwrites the previous content.

In Nessie catalog it appears as:

```plaintext
Type: ICEBERG_TABLE
Metadata Location:s3://warehouse/default/static_data_e7e43123-95a7-44d2-b6d5-67c9c7aa4321/metadata/00000-08a5a2db-6f12-4f21-b2a9-de3d9123fbd3.metadata.json
```

### spark_partitioned_data_v1: [Spark Partitioned (<VPIcon icon="iconfont icon-github"/>`ps-mir/data-platform`)](https://github.com/ps-mir/data-platform/blob/07ad47d68fec51f48cd41560921d509a70c5bb6f/airflow-docker/dags/step3_spark_partitioned.py)

This extends step2 with time-based partitioning. Partition values are derived from the scheduled slot time, so every run writes to its own `(ds, hr, min)` partition without touching previous ones.

::: tip Example file path in RustFS: 

```plaintext
warehouse/default/static_data_partitioned_b172c66f-722b-44f3-bbee-069355753ff6/data/ds=2026-03-28/hr=23/min=15/00000-4-7a196a47-2ac0-4023-af68-ca10487fccb2-0-00001.parquet
```

:::

### scraper_pipeline_v1: [Scraper Pipeline (<VPIcon icon="iconfont icon-github"/>`ps-mir/data-platform`)](https://github.com/ps-mir/data-platform/blob/07ad47d68fec51f48cd41560921d509a70c5bb6f/airflow-docker/dags/scraper_pipeline.py)

This is the full ingestion flow. Airflow pushes a job to Scrapredis, Scrapworker calls the Binance API and writes raw results to RustFS, then Airflow publishes a signal row to the Nessie catalog.

Every run fetches: 

```plaintext
https://api.binance.com/api/v3/trades?symbol=BTCUSDT&limit=10
```

---

## Setup

This is a single-node development setup using Docker Compose. It's built on a well-structured base config that can be extended to production with targeted changes.

- A production deployment would require HA configuration, persistent volume management, and security hardening for each component.
- Images are pinned to specific versions to avoid silent breakage between pulls.
- All containers share a common external Docker network named `data-platform`, which allows services to communicate using container names as hostnames.
- An <VPIcon icon="iconfont icon-shell"/>`init.sh` script creates the required local dirs inside the data folder and also creates the Docker network.

### RustFS

RustFS is the object storage layer in this stack. Nessie's REST catalog mode has a hard dependency on an S3-compatible endpoint. Running it against a local filesystem fails the Nessie healthcheck at startup and causes catalog initialization to error out. The REST catalog is the recommended mode for new setups because it enables credential vending and multi-engine coordination.

MinIO was the natural choice for self-hosted S3-compatible storage, but it shifted to a more restrictive license. RustFS is the open-source alternative, written in Rust and backed by local disk.

At write time, Spark pushes Parquet files directly to RustFS via S3FileIO. Nessie commits the table metadata alongside, so data and catalog state land together or not at all. This is [<VPIcon icon="iconfont icon-Apache"/>Apache Iceberg](https://iceberg.apache.org/)'s core guarantee: atomic commits across both data files and metadata.

For production or cloud deployments, managed object storage services like AWS S3, Google Cloud Storage, or Azure Blob Storage are the natural next step. Self-hosted alternatives at scale include [<VPIcon icon="iconfont icon-github"/>`seaweedfs/seaweedfs`](https://github.com/seaweedfs/seaweedfs), [<VPIcon icon="fas fa-globe"/>Ceph/RGW](https://docs.ceph.com/en/latest/radosgw/), and [<VPIcon icon="fas fa-globe"/>Garage](https://garagehq.deuxfleurs.fr/).

::: note Notes

- **Bucket creation:** A `rustfs-init` sidecar using `amazon/aws-cli` runs after RustFS passes its healthcheck and creates the `s3://warehouse` bucket automatically. You don't create the bucket manually.
- **Permissions:** RustFS runs as uid=10001 inside the container. The host directories (`data/rustfs/data` and `data/rustfs/applogs`) must be owned by that uid before the container starts, or it will fail silently. <VPIcon icon="iconfont icon-shell"/>`init.sh` handles this with `sudo chown -R 10001:10001`.
- **Image pinning:** The compose file pins to `rustfs/rustfs:1.0.0-alpha.85-glibc`. Before upgrading, verify the uid hasn't changed: `docker run --rm --entrypoint id rustfs/rustfs:<new-tag>`. If it has, re-run <VPIcon icon="iconfont icon-shell"/>`init.sh` or re-chown manually.
- **Spark writes:** Spark writes data files directly to RustFS via S3FileIO. Nessie only manages catalog metadata, it doesn't proxy data. The two interact at commit time, not at write time.

:::

### Nessie

The catalog tracks the list of tables in the warehouse, along with their data files and schema. Without it, it's hard for Spark to agree on what's in the warehouse.

[<VPIcon icon="iconfont icon-apachehive"/>Hive Metastore](https://hive.apache.org/docs/latest/admin/adminmanual-metastore-administration/) offers a Thrift-based API and has been the catalog standard for years. It provides transaction semantics on metadata updates through its backing database, but those transactions stop at the catalog layer. Data files underneath aren't part of the same commit, and there's no cross-table history beyond what the database retains.

Apache Iceberg closes the data and metadata gap with atomic table commits. Nessie builds on that and goes further: it treats the catalog like a Git repository. Every table write is a commit. You can branch, tag, and roll back across multiple tables atomically.

Spark reads and writes table metadata through Nessie's Iceberg REST endpoint. Catalog state is persisted to Postgres, so it survives container restarts.

#### Namespace bootstrap

Unlike Hive Metastore, Nessie doesn't auto-create namespaces. Attempting to write a table to a namespace that doesn't exist fails after data has already been written to RustFS, leaving orphaned files with no catalog entry. Namespaces are structural metadata and belong in a one-time bootstrap step, not in a pipeline.

Nessie manages the Iceberg catalog metadata under `s3://warehouse/`. Iceberg table data lands under paths derived from the namespace, for example, `s3://warehouse/default/` for the `default` namespace.

#### S3 Credential Configuration Issue

Nessie's S3 credential fields don't accept plain strings (likely for security reasons). They require a secret URI in the form `urn:nessie-secret:quarkus:<name>` even for local credentials.

Additionally, the SCREAMING_SNAKE_CASE environment variable convention is ambiguous for Quarkus property names containing hyphens. The property is silently ignored, and the default (which fails) is used instead. The working approach is dot-notation keys passed directly in the compose environment block, which Quarkus reads without conversion:

```properties
nessie.catalog.service.s3.default-options.access-key: "urn:nessie-secret:quarkus:nessie.catalog.secrets.access-key"
nessie.catalog.secrets.access-key.name: rustfsadmin
nessie.catalog.secrets.access-key.secret: rustfsadmin
```

#### Nessie health check

Once the RustFS settings are corrected, Nessie's health check URL(`http://localhost:9090/q/health`) should return the following response:

```json
{
  "status": "UP",
  "checks": [
    {
      "name": "MongoDB connection health check",
      "status": "UP"
    },
    {
      "name": "Warehouses Object Stores",
      "status": "UP",
      "data": {
        "warehouse.warehouse.status": "UP"
      }
    },
    {
      "name": "Database connections health check",
      "status": "UP",
      "data": {
        "<default>": "UP"
      }
    }
  ]
}
```

The MongoDB connection health check appears in the response even though this stack doesn't use MongoDB. It's a Quarkus built-in probe registered automatically regardless of store type. With JDBC configured, MongoDB is never connected and the UP report is just a placeholder response.

#### Catalog endpoint vs Management

Nessie exposes two separate APIs. The Iceberg REST catalog is at `/iceberg`. This is what Spark and Trino connect to. The Nessie management API is at `/api/v2`, which is for branch operations, commit history, and table inspection. They aren't interchangeable.

```properties
# Iceberg REST API
http://localhost:19120/iceberg/v1/main/namespaces
http://localhost:19120/iceberg/v1/config

# Nessie management API
http://localhost:19120/api/v2/config
```

::: note Notes

- `path-style-access: true` is required for any non-AWS S3 endpoint. `region` is a dummy value required by the AWS SDK internally.
- Nessie's internal port 9000 is remapped to 9090 on the host to avoid conflict with RustFS which occupies 9000 and 9001.

:::

#### Forward path

Nessie is a stateless REST service, so scaling reads can be done with LB with no coordination between nodes. Durability comes entirely from backend store.

### Spark

As a distributed compute engine, Apache Spark is a reliable and stable choice for long-running jobs. In the current setup, it executes PySpark jobs submitted by Airflow, reads and writes Iceberg tables via the Nessie REST catalog, and writes data files directly to RustFS using S3FileIO. Spark runs in standalone mode with a single master and worker, configured via <VPIcon icon="fas fa-gears"/>`spark-defaults.conf`.

Two JARs are required and must be placed in <VPIcon icon="fas fa-folder-open"/>`data/spark/jars/` before starting:

- `iceberg-spark-runtime-3.5_2.12`: Iceberg integration for Spark: SparkCatalog, DataFrameWriterV2, SQL extensions, and all table format logic.
- `iceberg-aws-bundle`: AWS SDK v2 and Iceberg's S3FileIO, the storage transport layer for writing data files to RustFS. The Spark base image ships only Hadoop AWS (SDK v1). This bundle provides the SDK v2 classes that S3FileIO requires.

Spark uses a custom Dockerfile to install Python 3.12. Build the image before first use:

```sh
cd spark
docker compose build
docker compose up -d
```

The PySpark jobs are covered in the Airflow section, where we walk through each DAG and its corresponding Spark script as part of the pipeline.

Before submitting any Spark job that writes an Iceberg table, the target namespace must exist in Nessie. Nessie doesn't auto-create namespaces, unlike Hive Metastore. Attempting to write to a missing namespace fails after data has already been written to RustFS, leaving orphaned files with no catalog entry.

Create the `default` namespace once before running any pipeline:

```sh
# Nessie should be up and running at this point
curl -X POST http://localhost:19120/iceberg/v1/main/namespaces \
  -H "Content-Type: application/json" \
  -d '{"namespace": ["default"]}'
{
  "namespace" : [ "default" ],
  "properties" : { }
}
```

Verify:

```sh
curl http://localhost:19120/iceberg/v1/main/namespaces
```

#### Catalog Mismatch: Tables Missing Across Query Engines

If tables written by Spark aren't visible in Trino, the likely cause is a catalog mismatch. Spark configured with `NessieCatalog` and Trino using the Iceberg REST catalog maintain separate metadata views — they don't share table state. Both engines must point at the same catalog endpoint: `http://nessie:19120/iceberg`.

::: note Notes

- **Worker memory:** The worker is configured with `SPARK_WORKER_MEMORY: 8g`. Spark's default is 1g is enough to register but not enough to run a job without queuing. Tune this based on available host memory.
- **Remote signing:** `remote-signing-enabled: false` Nessie's REST catalog supports credential vending via IAM/STS, but since that integration isn't present here, remote signing is disabled explicitly to avoid request failures.
- **Config changes need full restart:** Docker file-level bind mounts cache the inode at container start. Editing <VPIcon icon="fas fa-gears"/>`spark-defaults.conf` won't take effect until Spark and the Airflow worker are restarted. In client mode, the Airflow worker is the Spark driver (the process that reads the config on job submission) and must be restarted too.
- **Jupyter Notebook:** A Jupyter instance with PySpark is included in the stack for ad-hoc queries against Iceberg tables. It connects to the same Spark cluster and Nessie catalog, so any table written by a pipeline is immediately queryable.

:::

::: warning

The Spark worker and Airflow worker (the driver) must run the same Python minor version. PySpark enforces this at runtime and fails immediately if they diverge. The Spark image in this stack uses a custom Dockerfile to install Python 3.12, matching Airflow's base image. If you upgrade either, verify that the versions stay aligned.

:::

### Apache Airflow

Airflow makes it easier to author, schedule and monitor workflows. In this case, it handles the ingestion for batch processing, but it can be extended to use cases like stream processing.

The Airflow components resemble more closely the DAG processor Airflow Architecture from the [<VPIcon icon="iconfont icon-Apache"/>official docs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/overview.html).

![DAG Processor Airflow Architecture](https://cdn.hashnode.com/uploads/covers/69607e708806706b5c49c7af/a438e02b-0b16-44c7-bcae-92c954a942cc.png)

Key aspects:

- The DAG Processor continuously parses DAG files and serializes them to the Metadata DB.
- The Scheduler reads from there, detects when a DAG run is due, creates task instances, and pushes them to the CeleryExecutor (via Redis queue).
- The Celery worker picks up a task and executes it. In the case of a `SparkSubmitOperator`, the worker process becomes the Spark driver, submitting the job to the Spark cluster.
- Executors run on the Spark worker, write Parquet files directly to RustFS, and commit the table metadata to Nessie. Airflow records the task outcome back in the Metadata DB.

Airflow uses a custom Dockerfile to install Java 17 and additional providers. Build the image before first use:

```sh
cd airflow-docker
docker compose build
docker compose up -d
```

#### Pipelines

Pipelines need to be created inside <VPIcon icon="fas fa-folder-open"/>`airflow-docker/dags` folder for dag processor to pick up load the pipeline DAG in metadata DB. Four pipeline examples are provided with varying complexity.

1. <VPIcon icon="fa-brands fa-python"/>`step1_hello_dag.py`: single-task DAG with no dependencies, just a Python function that prints a message.
2. <VPIcon icon="fa-brands fa-python"/>`step2_spark_submit.py`: submits a PySpark job via SparkSubmitOperator. The job writes a static dataset to an Iceberg table via the Nessie catalog.
3. <VPIcon icon="fa-brands fa-python"/>`step3_spark_partitioned.py`: extends step 2 with time-based partitioning. The scheduled slot time is passed to the PySpark script.
    - Time-based partition values are derived from `data_interval_start` for idempotency (Backfill, Reruns).
4. `scraper_pipeline`: a real-world ingestion pipeline. Coordinates with the external task executor `scrapworker` via the Redis queue `scrapredis`.
    - Both `scrapredis` and `scrapworker` must be up and running for this pipeline to work.

#### Deploy Mode and Driver Config

The initial `SparkSubmitOperator` configuration used `deploy_mode="cluster"`, which runs the driver on the Spark cluster rather than the submitting machine. This fails immediately on Spark standalone clusters with a hard error:

```plaintext
Cluster deploy mode is currently not supported for python applications on standalone clusters.
```

Cluster mode for Python is only available on YARN and Kubernetes. The fix is `deploy_mode="client"`, but this shifts the problem: in client mode, the driver runs on the Airflow worker container, which means the worker needs everything the Spark containers have.

Overall, three changes are required in the Airflow worker:

- The Iceberg and Nessie JARs at <VPIcon icon="fas fa-folder-open"/>`/opt/spark/user-jars/`
- <VPIcon icon="fas fa-gears"/>`spark-defaults.conf` with catalog, extension, and JAR config
- `SPARK_CONF_DIR=/opt/spark/conf`, without this, pip-installed PySpark's `spark-submit` silently ignores the mounted conf file and runs with no catalog config

The fix was adding all three to `x-airflow-common` in `airflow-docker/docker-compose.yaml` so every Airflow service inherits them:

```yaml title="airflow-docker/docker-compose.yaml"
environment:
  SPARK_CONF_DIR: /opt/spark/conf

volumes:
  - ../data/spark/jars:/opt/spark/user-jars:ro
  - ../spark/spark-defaults.conf:/opt/spark/conf/spark-defaults.conf:ro
```

#### Partition Values Written as NULL

When the third pipeline (Spark Partitioned) ran for the first time, the data landed correctly in RustFS, but querying the Iceberg partitions metadata showed:

```plaintext
+------------------+----------+
|         partition|file_count|
+------------------+----------+
|{NULL, NULL, NULL}|         2|
+------------------+----------+
```

The original script used Spark's DataSource V1 API:

```py
df.write.format("iceberg").mode("overwrite").saveAsTable(table)
```

The script used Spark's V1 DataFrame write API with format("iceberg"), which loads an isolated table reference and bypasses Iceberg's catalog write path. As a result, Iceberg committed the data files to storage but wrote NULL partition values into the manifest metadata.

The fix is in Iceberg's native DataFrameWriterV2 API:

```py
df.writeTo(table).overwritePartitions()
```

This routes through Iceberg's native write path, evaluates partition transforms from the real column values (ds, hr, min), and registers them correctly in the manifest. `overwritePartitions()` overwrites only the partitions present in the DataFrame. A rerun with the same scheduled time produces the same values and atomically replaces that partition, leaving all others untouched.

⚠️ Existing NULL-partition manifest entries aren't retroactively corrected by subsequent V2 writes. For a brand-new table containing only bad data, DROP TABLE and rewrite is the simplest recovery.

### Scrapredis

Scrapredis is a dedicated Redis instance that sits between Airflow and Scrapworker as a job queue. It's separate from Airflow's internal Redis, which exists solely for CeleryExecutor task dispatch. The separation means the crawler's job queue can be managed, scaled, or replaced without touching Airflow's internals.

The pattern generalises beyond scraping. Any external process that needs its own lifecycle, resource profile, or rate limiting can be wired the same way: Airflow pushes a job, the external worker pops it, and Airflow polls for the result.

The scraper pipeline follows this round-trip:

1. Airflow pushes the job payload to the queue:

```py
QUEUE_KEY = "scrapworker:jobs"
client.lpush(QUEUE_KEY, json.dumps(payload))
```

1. Scrapworker blocks on the queue and pops the next job:

```py
while True:
    _, payload = client.blpop(redis_cfg["queue_key"])
```

1. Once the crawl finishes, Scrapworker writes the outcome and `s3_path` back to Redis:

```py
client.set(status_key, json.dumps({"status": "finished", "worker_id": worker_id, "s3_path": job["s3_path"]}), ex=TERMINAL_TTL)
```

1. The `wait_for_completion` task polls for that status key. On success, `publish_nessie_signal` picks up the `s3_path` and writes the signal row to Nessie.

### Scrapworker

Scrapworker is a Python app that uses the Scrapy crawl framework to crawl all pages of the request. It's decoupled from Airflow due to URL/client specific rate limit semantics. For simplicity, consider it a type of external worker that receives and executes requests from Airflow.

It's responsible for downloading and writing content to object storage (RustFS). The Nessie catalog update is decoupled and kept in a separate Airflow pipeline task.

#### Fixed Signal Table

Scrapworker writes raw JSON to RustFS rather than writing scraped data directly as Iceberg columns. The pipeline then publishes a single lightweight signal row to a Nessie-managed Iceberg table.

The signal schema is fixed and minimal (`run_id`, `endpoint`, `s3_path`, `ds`, `hr`, `min`, `published_at`). It never changes, regardless of what's being scraped.

Mirroring the scraped payload as Iceberg columns would force Scrapworker to own schema evolution across different endpoints. This isn't an ideal place for schema ownership. Instead, schema ownership sits downstream:

```plaintext
Scrapworker  →  raw files in RustFS  +  signal row in Iceberg (from Pipeline)
Airflow job  →  reads raw via s3_path, applies schema, writes structured Iceberg table
```

The downstream job knows the domain, knows the schema, and is the right place to handle type casting, nulls, and partition layout. Scrapworker stays generic and thin — the same code handles any endpoint without modification.

#### Why Signal Publish is a Separate Airflow Task

Scrapworker writes to RustFS and sets `status: finished` in Redis with the `s3_path`. A separate Airflow task reads that status and publishes the signal row to Nessie. The two writes are intentionally decoupled.

If scrapworker published to Nessie directly after writing to RustFS, the two writes would share a failure mode. A Nessie failure after a successful RustFS write would leave data stranded with no signal and no clean recovery path. The only option would be a re-crawl which lacks idempotency.

With the decoupled approach, each failure is isolated. A Nessie failure triggers an Airflow retry of the signal publish task only, no re-scrape, no duplicate crawl. RustFS and Nessie failures are independently recoverable.

::: note Notes

- Raw scraped files are written directly to `s3://warehouse/raw/`, entirely outside Nessie's management. Nothing in the Iceberg layer touches this path.
- The scrapworker signal table lives in a dedicated `scraper` namespace. Create it once before scrapworker runs for the first time.

```sh
curl -X POST http://localhost:19120/iceberg/v1/main/namespaces \
  -H "Content-Type: application/json" \
  -d '{"namespace": ["scraper"]}'
```

:::

---

## Path Forward

The stack we've built here is a working ingestion layer. It lands data reliably, tracks it in a versioned catalog, and gives you a foundation to build on. Two directions are worth considering from here.

### Extending Capabilities

These are improvements to what's already in the stack, making it more robust without adding new components.

**Ingestion reliability:** Scrapworker currently handles failures by setting `status: failed` in Redis, which requires Airflow to re-trigger the full pipeline. Adding client-side rate limiting and per-endpoint retry logic with backoff would make crawl jobs more self-healing, so that a failed page fetch can retry independently without surfacing to Airflow at all.

**Config validation:** A misconfigured endpoint schema in `config.yaml` fails silently at runtime, often deep into a crawl. A `validate_config()` call at startup would catch missing required fields like `offset_param` or `response_map` before any job runs. This becomes more important as more endpoints are added.

**Observability:** Airflow alerting and SLA monitoring give early warning when pipelines miss their schedule or tasks take longer than expected. The signal table is useful here too. A lightweight monitor that checks for expected signal rows within a time window is a simple SLA check that works without external tooling.

### Adding Layers

These are new capabilities that build on the ingestion foundation.

**Transform layer:** The raw Iceberg tables written by the ingestion layer are the input for a transform step. dbt or Spark SQL can read from raw, apply schema, clean types, and write structured tables to a separate namespace. This is the L in ELT and the natural next step once ingestion is stable.

**Analytics:** Trino is already in the stack and partially integrated. Connecting it fully to Nessie enables SQL queries across all Iceberg tables. Adding Superset on top gives a visualisation layer without requiring any changes to the ingestion pipeline.

**Broader source onboarding:** The current stack handles one ingestion pattern: a scheduled Airflow pipeline triggering an external HTTP crawler. The same foundation supports pull-based sources like databases using CDC, and push-based sources like event streams via Kafka. The Iceberg tables and Nessie catalog serve as the landing zone regardless of how data arrives.

**Governance:** Iceberg and Nessie provide the foundations, covering snapshots, schema evolution, commit history, and time travel. The governance layer on top requires deliberate additions: access control, data quality checks, lineage tracking, and schema enforcement. None of these require replacing what's here, as they sit on top of it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Open Source Data Lake for Batch Ingestion",
  "desc": "Creating a data platform has been made easier by cloud data analytics platforms like Databricks, Snowflake, and BigQuery. They offer excellent ramp-up and scaling options for small to mid-size teams. ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-open-source-data-lake-for-batch-ingestion.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
