---
lang: en-US
title: "How to Build a Knowledge Graph with Python and Neo4j [Full Handbook]"
description: "Article(s) > How to Build a Knowledge Graph with Python and Neo4j [Full Handbook]"
icon: fa-brands fa-python
category:
  - Python
  - DevOps
  - Docekr
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - docker
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Knowledge Graph with Python and Neo4j [Full Handbook]"
    - property: og:description
      content: "How to Build a Knowledge Graph with Python and Neo4j [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-knowledge-graph-with-python-and-neo4j-handbook/
prev: /programming/py/articles/README.md
date: 2026-08-21
isOriginal: false
author:
  - name: RONI DAS
    url: https://freecodecamp.org/news/author/ronidas/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f21a22a9-c9e9-4ed6-899e-60639e8d2c01.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
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
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Knowledge Graph with Python and Neo4j [Full Handbook]"
  desc="Most of the data you work with is really about relationships. A customer belongs to an account. An incident affects a service. An engineer owns a repository. You store all of that in tables, and for a"
  url="https://freecodecamp.org/news/how-to-build-a-knowledge-graph-with-python-and-neo4j-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f21a22a9-c9e9-4ed6-899e-60639e8d2c01.png"/>

Most of the data you work with is really about relationships. A customer belongs to an account. An incident affects a service. An engineer owns a repository. You store all of that in tables, and for a long time that works perfectly well.

Then someone asks a question like this one:

> **Which engineers have recent context on the services affected by last night's incident?**

That question is easy to understand and hard to write. In SQL it becomes four or five joins. Each join builds an intermediate result that is wider than the answer you actually want, and then throws most of it away. The query gets slower as your tables grow, and it gets harder to read every time you come back to it.

A graph database is built for that question.

In this handbook you will build a working knowledge graph from an empty database, load real data into it from Python, and write the queries that make the idea click.

You'll also learn the parts that tutorials usually skip: how to decide what becomes a node, why your first data model is probably wrong, how to make loading fast, and how to read a query plan when something is slow.

You don't need any graph experience to follow along. If you've written SQL, you already know enough.

![join vs traversal](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943177482/cf9ad7b4-0762-4099-a1b2-e789768ea08a.png)

The same question asked of the same data, two ways. On the left, a relational database matches rows at query time and throws most of them away. On the right, a graph follows connections that were already stored when the data was written. The rest of this handbook is really about that difference.

::: info

All the code and the dataset are in one place: [<VPIcon icon="iconfont icon-github"/>`ronidas39/knowledge-graph-python-neo4j`](https://github.com/ronidas39/knowledge-graph-python-neo4j). Every script in this handbook runs, and every number is measured against the committed dataset. You can clone it and reproduce it all as you read.

:::

---

## The Data We'll Use

Every example in this handbook runs against the same small dataset, so you can follow along from the first query to the last without ever loading something new.

It models a software team, because that's a domain most readers can check against their own experience. **It's entirely made up, thought:** no real company, service, or person appears in it, and the email addresses use `example.com` (this is reserved by RFC 2606 precisely so documentation can't accidentally point at somebody's real address).

| Kind | How many | What they are |
| --- | --- | --- |
| `Engineer` | 6 | Five who own a service, and one who owns nothing |
| `Service` | 4 | payments, checkout, auth, search |
| `Team` | 3 | Platform, Commerce, Discovery |
| `Incident` | 1 | INC-4471, which affected payments and checkout |

The data are connected by four relationship types:

| Relationship | Meaning |
| --- | --- |
| `OWNS` | An engineer is responsible for a service |
| `MEMBER_OF` | An engineer belongs to a team |
| `DEPENDS_ON` | A service needs another service to work |
| `AFFECTS` | An incident hits a service |

Fourteen nodes and sixteen relationships for thirty records in total. That's deliberately tiny, because at this size you can hold the whole graph in your head and check every answer by eye. This is exactly what you want while the ideas are new. Nothing here behaves differently at a million nodes. It's only slower to verify.

Two details are worth noticing before they matter later. **One engineer owns nothing**, which is the only reason the `OPTIONAL MATCH` example has anything to show. And **Commerce has exactly one member, who is also an owner**, which turns out to expose a Cypher trap that silently drops rows. Neither is an accident.

The complete loading script is at the end of this handbook, and you can run it before reading any further if you'd rather have the data in front of you.

---

## The Words You'll Need

Every term in this handbook is defined where it first appears, but it helps to have them in one place. If you've never touched a graph database, read this table once and come back to it whenever a word stops making sense.

| Term | What it means | Official reference |
| --- | --- | --- |
| **Graph** | A collection of things and the connections between them. In computing it means data stored as points joined by lines, not as rows in tables. Your contacts app is a graph. So is a road map. | [<VPIcon icon="iconfont icon-neo4j"/>Getting Started](https://neo4j.com/docs/getting-started/) |
| **Graph database** | A database that stores those connections directly on disk, as records, instead of working them out at query time by matching values. Neo4j is one. | [<VPIcon icon="iconfont icon-neo4j"/>Getting Started](https://neo4j.com/docs/getting-started/) |
| **Node** | One thing in your data. An engineer, a service, an order. The rough equivalent of a row. | [<VPIcon icon="iconfont icon-neo4j"/>Patterns](https://neo4j.com/docs/cypher-manual/current/patterns/) |
| **Relationship** | A stored connection between exactly two nodes. It always has a direction and a type, such as `OWNS`. The rough equivalent of a foreign key, except it's a real record you can walk along. | [<VPIcon icon="iconfont icon-neo4j"/>Patterns](https://neo4j.com/docs/cypher-manual/current/patterns/) |
| **Property** | A key and value stored on a node or a relationship, such as `name: "Ada"`. The rough equivalent of a column value. | [<VPIcon icon="iconfont icon-neo4j"/>Values and types](https://neo4j.com/docs/cypher-manual/current/values-and-types/temporal/) |
| **Label** | A tag that groups nodes, such as `Engineer`. It's how you say "look only at engineers". The rough equivalent of a table name. | [<VPIcon icon="iconfont icon-neo4j"/>Patterns](https://neo4j.com/docs/cypher-manual/current/patterns/) |
| **Cypher** | Neo4j's query language, the equivalent of SQL. Instead of describing joins, you draw the shape you're looking for, like `(a)-[:OWNS]->(b)`. | [<VPIcon icon="iconfont icon-neo4j"/>Cypher Manual](https://neo4j.com/docs/cypher-manual/current/) |
| **Traversal** | Following relationships from one node to the next. This is what a graph database does instead of joining. | [<VPIcon icon="iconfont icon-neo4j"/>Patterns](https://neo4j.com/docs/cypher-manual/current/patterns/) |
| **Hop** | One step along one relationship. "Three hops away" means three relationships between the two nodes. | [<VPIcon icon="iconfont icon-neo4j"/>Cypher Manual](https://neo4j.com/docs/cypher-manual/current/) |
| **Bolt** | The network protocol Neo4j speaks to drivers, the way HTTP is the protocol a browser speaks. It runs on port 7687 by default, which is why connection strings look like `bolt://host:7687`. | [<VPIcon icon="iconfont icon-neo4j"/>Bolt protocol](https://neo4j.com/docs/bolt/current/) |
| **Driver** | The library your program uses to talk to the database over Bolt. For Python that's the `neo4j` package. | [<VPIcon icon="iconfont icon-neo4j"/>Python driver manual](https://neo4j.com/docs/python-manual/current/) |
| **Neo4j Browser** | The web interface for running Cypher and seeing results drawn as a graph. It ships with the database on port 7474. | [Operations Manual](https://neo4j.com/docs/operations-manual/current/) |
| **Aura** | Neo4j's managed cloud service, where they run the database for you. Has a free tier. | [<VPIcon icon="iconfont icon-neo4j"/>Aura docs](https://neo4j.com/docs/aura/) |
| **MERGE** | The Cypher command meaning "find this, or create it if it's not there". The single most important command for loading data safely. | [<VPIcon icon="iconfont icon-neo4j"/>MERGE](https://neo4j.com/docs/cypher-manual/current/clauses/merge/) |
| **Constraint** | A rule the database enforces, such as "every engineer email must be unique". Creating one also creates an index. | [<VPIcon icon="iconfont icon-neo4j"/>Constraints](https://neo4j.com/docs/cypher-manual/current/schema/constraints/) |
| **Index** | A lookup structure that lets the database find a node by a property value without checking every node. | [<VPIcon icon="iconfont icon-neo4j"/>Planning and tuning](https://neo4j.com/docs/cypher-manual/current/planning-and-tuning/) |
| **Index-free adjacency** | The property that makes traversal fast: because relationships are stored as records pointing at both nodes, following one is a read rather than a search. | [<VPIcon icon="iconfont icon-neo4j"/>Getting Started](https://neo4j.com/docs/getting-started/) |

Two conventions are used throughout, and they're worth knowing before you meet them:

**Relationship types are written in** `SCREAMING_SNAKE_CASE` (`OWNS`, `MEMBER_OF`) and **labels in** `PascalCase` (`Engineer`, `Service`). Neo4j doesn't enforce either, but every codebase and every piece of documentation follows them, so matching the convention makes your queries readable to everyone else.

The full language reference lives in the [<VPIcon icon="iconfont icon-neo4j"/>Cypher Manual](https://neo4j.com/docs/cypher-manual/current/), and it's genuinely good. When something in this handbook raises a question, that's where to look next.

---

## What You're Building

Before any of the parts, here's the shape of the whole thing. Four moving parts: the data you start with, the Python driver that loads it, the graph that Neo4j stores, and the answers that come back out in a form a language model can use without inventing anything.

![System Architecture](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943179978/21db905b-4dcc-4b02-ad35-e8ef6c8bb7a8.png)

Reading left to right: **your data** is CSV files, an existing database, or plain text a model pulls triples out of. **The Python driver** is one driver object for the whole application, `execute_query()` to run Cypher, and UNWIND to batch a thousand rows into one round trip. **Neo4j** is where it lands, and it runs identically on Docker, EC2 or Aura because only the connection URI changes. Constraints and indexes are created here before the load, never after.

What you get back is multi-hop answers that hold up at 75,500 nodes, with a path behind each one you can cite.

Three things worth noting: first, you don't need all of it on day one, since Docker, the driver and a handful of nodes is already a working system. Also, every number here was measured against the committed 75,500 node dataset on Neo4j 5.26.29 Community, not estimated. And the arrows only go one way, because nothing in this handbook writes back from the model into the graph, which is a boundary worth keeping until you trust the extraction.

::: note On which version to install

Don't worry about matching mine exactly. Everything here was measured on Neo4j 5.26.29 Community, and 5.26 is the long-term support release, which Neo4j supports until June 2028. From 2025 onward they name releases by date instead, so you'll see 2025.01, 2025.02 and so on rather than 5.27. Those are fully compatible with the Cypher and the drivers used here, so the queries in this handbook run unchanged on them.

Two things do vary, and neither is about the version number. Timings depend on your machine, so treat my numbers as ratios rather than targets. And the constraints beyond `IS UNIQUE` need Enterprise, which is an edition difference rather than a version one. The `neo4j:5` Docker tag used below gives you the latest 5.x, which is a good default.

You don't need all of it on day one. Docker, the driver, and a handful of nodes is already a working system. Everything else in this handbook is what you add when the graph stops fitting in your head.

:

---

## What a Graph Database Actually Stores

A graph database stores three things. That's genuinely all of it.

![graph anatomy](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943183278/cd2c6362-b70a-4377-989b-6494f32b1df7.png)

The drawing works one concrete example. An `Engineer` node holds `name: "Ada"` and an email. An arrow labelled `OWNS` carries `since: 2026-03-01`. A `Service` node holds `name: "payments"`. Callouts point at each piece in turn. They name which part is the node, which is the label, which is the property, and which is the relationship. The last one they name is the property that sits on the relationship rather than on either end.

The panel underneath contrasts that last one with tables, and it's the piece with no clean relational equivalent. To record that Ada has owned payments since March, a relational schema needs a join table you invented only because rows can't point at each other.

**Nodes** are the things in your domain: an engineer, service, incident, or team.

**Relationships** connect exactly two nodes. Every relationship has a direction and a type. An engineer OWNS a service. An incident AFFECTS a service. The direction is stored, and you'll see shortly that you can traverse a relationship in either direction regardless of how it was stored.

**Properties** are key and value pairs. They live on nodes and on relationships. An engineer node might carry a name and an email. An OWNS relationship might carry the date that ownership started, which is a fact about the connection rather than about either end of it.

Nodes also carry **labels**, which group them. A node labelled `Engineer` is an engineer. A node can have more than one label. Labels are how you tell the database to look only at engineers instead of scanning everything you have ever stored.

Here's the same small piece of information in both worlds.

| Concept | Relational | Graph |
| --- | --- | --- |
| A thing | A row in a table | A node |
| The kind of thing | Which table it is in | A label on the node |
| A fact about the thing | A column value | A property |
| A connection | A foreign key, or a join table | A relationship, stored on disk |
| A fact about a connection | A column on the join table | A property on the relationship |

That last row is worth pausing on. In a relational schema, saying "Ada has owned payments since March" needs a column on the join table, and that join table is an implementation detail you invented to work around the fact that rows can't point at each other. In a graph, it's a property on the relationship, which is exactly where the fact belongs.

---

## Index-free Adjacency, the Idea That Makes it Fast

This is the one piece of theory worth understanding properly, because everything else follows from it.

In a relational database, a relationship between two rows is a **value you match at query time**. The `orders` table has a `customer_id`, and when you join, the database looks up matching values. It's good at this. There are indexes and query planners and decades of optimisation behind it. But it's still, fundamentally, a search.

In a graph database, a relationship is a **record stored on disk that points directly at both of its nodes**. When the database walks from a node to its neighbour, it doesn't search for the neighbour. It follows a pointer.

The name for this is **index-free adjacency**.

![Relationship on Disk](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943186070/6cdb2ee9-51ff-4970-b0e8-a4db0b61fd15.png)

This is where the connection physically lives. Relationally it's a value, a foreign key the database has to find. In a graph it's a pointer beside the node, so following it is a read rather than a search.

The consequence is the thing that matters. Because traversal follows pointers out of nodes you already have in hand, the cost of a traversal is proportional to the size of the part of the graph you touch, not the size of the graph in total. A database ten times larger doesn't make a two-hop query slower.

Compare that with a join. Each additional join reads another table and builds a wider intermediate result. Adding a hop adds work that scales with your data volume.

![Cost Curves](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943188611/44add40c-e831-4dd0-81a1-cbb900d81dd7.png)

Two curves on the same axes: cost of one query against how much data the database holds. The four-join line climbs steeply as the data grows. The two-hop traversal line stays low and nearly flat. At the small end they sit almost on top of each other, which is the note the figure makes: on a laptop with test data both look fine, and that's why this surprises people in production.

One key caveat drawn on the figure itself: **The axes carry no units, because none were measured, and no benchmark is being claimed.** The point is the shape of the two curves, which follows from how each one works.

This is why the difference shows up as your data grows rather than on your laptop with test data. Both approaches look fine on ten thousand rows.

A relational database is excellent at answering questions about **sets of rows**. A graph database is excellent at answering questions about **paths between things**. Most systems have both kinds of question, which is why most companies end up running both kinds of database.

---

## When a Graph is the Wrong Choice

Every graph tutorial on the internet tells you graphs are wonderful. Here's the other half, because knowing when not to use something is what separates an engineer from an enthusiast.

**Use something else when your queries are aggregations over big uniform sets.** "Total revenue by region by month" is a relational or columnar question. A graph will answer it, and it will be slower and more awkward than a warehouse would be.

**Use something else when your data has no meaningful relationships.** A table of log lines is a table of log lines. Modeling each one as a node connected to nothing buys you nothing and costs you storage.

**Use something else when you need one thing to be extremely fast and nothing else.** A key-value store answering "give me session 4471" will beat everything, because it does exactly one thing.

A graph is the right choice when the connections are the point. Fraud rings, recommendations, access control, dependency analysis, lineage, org structures, supply chains, and knowledge graphs for AI systems. These share one trait: the interesting questions are about how things connect, and the number of hops isn't fixed in advance.

If your query never goes more than one hop, you probably don't need a graph. If your query goes three hops and the number of hops depends on the data, you almost certainly do.::

---

## Table of Contents

- [How to Set Up Neo4j and the Python Driver](#heading-how-to-set-up-neo4j-and-the-python-driver)
- [The Modeling Decision That Matters Most](#heading-the-modeling-decision-that-matters-most)
- [Three Modeling Mistakes Almost Everyone Makes](#heading-three-modeling-mistakes-almost-everyone-makes)
- [Modeling Backwards From Your Questions](#heading-modeling-backwards-from-your-questions)
- [Three Modeling Patterns Worth Knowing Early](#heading-three-modeling-patterns-worth-knowing-early)
- [Loading Data From Python](#heading-loading-data-from-python)
- [Loading at Scale with UNWIND](#heading-loading-at-scale-with-unwind)
- [Loading From a CSV File](#heading-loading-from-a-csv-file)
- [Updating and Deleting](#heading-updating-and-deleting)
- [Working with Neo4j Data Types](#heading-working-with-neo4j-data-types)
- [Your First Cypher Queries](#heading-your-first-cypher-queries)
- [The Multi-Hop Query That Justifies the Whole Thing](#heading-the-multi-hop-query-that-justifies-the-whole-thing)
- [Variable Length Paths and How to Keep Them Safe](#heading-variable-length-paths-and-how-to-keep-them-safe)
- [What an Index Actually is](#heading-what-an-index-actually-is)
- [Constraints, and the Trap That Will Catch You](#heading-constraints-and-the-trap-that-will-catch-you)
- [What the Planner Does With Your Query](#heading-what-the-planner-does-with-your-query)
- [Six Problems You'll Actually Hit](#heading-six-problems-youll-actually-hit)
- [Transactions and What Happens When Things Fail](#heading-transactions-and-what-happens-when-things-fail)
- [Testing Code That Talks to a Graph](#heading-testing-code-that-talks-to-a-graph)
- [From Graph to Knowledge Graph](#heading-from-graph-to-knowledge-graph)
- [Why AI Systems Keep Rediscovering Graphs](#heading-why-ai-systems-keep-rediscovering-graphs)
- [Building a Knowledge Graph from Text](#heading-building-a-knowledge-graph-from-text)

---

## How to Set Up Neo4j and the Python Driver

For this project, you need a database and a driver.

### Option A: Neo4j Aura, No Installation

The fastest route is **Neo4j Aura**, Neo4j's managed cloud service. There's nothing to install, and there's a genuinely free tier.

Go to `console.neo4j.io`, sign in, and choose **Create instance**. You'll be shown several tiers side by side, and this is the screen to read carefully rather than click through:

| Tier | Cost | What you get |
| --- | --- | --- |
| **Free** | $0 | Up to 200,000 nodes and 400,000 relationships. Limited memory and vCPU. Limited backups. **Auto-deleted after 30 days of inactivity.** |
| Professional | From $0.09 per GB-hour | Monitoring, predefined roles, 7 day backups, graph algorithms |
| Business Critical | From $0.20 per GB-hour | Advanced monitoring, custom roles, IP filtering, SSO, 30 day backups, 99.95% uptime SLA |

Pick Free for this handbook. 200,000 nodes is far more than anything here needs.

**Watch the running total at the bottom of that page.** The console shows a live hourly rate and a projected monthly cost, and both update as you change tiers.

A paid tier can read as roughly $0.36 per hour. That is about $259 a month if you leave it running. It's very easy to click past that while concentrating on the instance name. If you only want to learn, the number at the bottom should say $0. Once you confirm, Aura shows you a credentials dialog exactly once:

- Username, which is always `neo4j`
- A long generated password
- A warning that reads "Note that the password will not be available after this point"

That warning is literal. Click **Download and continue** to save a `.txt` file with the connection details, or copy the password somewhere safe first. If you lose it, you can't retrieve it, you can only reset it.

The downloaded file looks like this:

```sh title="txt"
NEO4J_URI=neo4j+s://xxxxxxxx.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=<your generated password>
NEO4J_DATABASE=neo4j
AURA_INSTANCEID=xxxxxxxx
AURA_INSTANCENAME=demo
```

The instance then shows **Creating...** in the console and takes a few minutes. During that window the hostname already resolves in DNS and port 7687 already accepts TCP connections, but the database behind it isn't up yet, so a driver will fail with `Unable to retrieve routing information`. That error during the first few minutes means "not ready", not "misconfigured". Wait and retry rather than changing your connection string.

The `+s` in `neo4j+s://` means the connection is encrypted and the server's certificate is verified. Aura requires encryption, and that verification is the only difference from a local instance that matters for this handbook.

### If Aura Refuses to Connect and You're Sure it's Running

![TLS Interception](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943191739/06f47fe4-7bf9-4914-9667-32d8e16f095c.png)

Aura is healthy, the browser connects, Python won't. Something on the network, usually a corporate proxy, VPN or antivirus, terminates your TLS connection, reads it, and re-encrypts it with its own certificate. Your browser was told to trust that certificate. The driver wasn't, so it correctly refuses and you get `ServiceUnavailable: Unable to retrieve routing information` while the database was fine throughout.

There's one failure here that wastes people hours, because the error message points at the wrong thing.

You connect, and the driver says:

```plaintext
neo4j.exceptions.ServiceUnavailable: Unable to retrieve routing information
```

"Routing" sounds like a cluster problem, so people go and check the instance, recreate it, and try a different region. Often none of that is the cause.

Check the certificate directly:

```py
import socket, ssl
ctx = ssl.create_default_context()
with socket.create_connection(("xxxxxxxx.databases.neo4j.io", 7687), timeout=15) as raw:
    with ctx.wrap_socket(raw, server_hostname="xxxxxxxx.databases.neo4j.io") as s:
        print("TLS OK", s.version())
```

If that prints something like `CERTIFICATE_VERIFY_FAILED: self-signed certificate in certificate chain`, the database is fine. **Something on your network is intercepting TLS.** Corporate proxies, some VPNs, and several antivirus products do this: they terminate your encrypted connection, inspect it, and re-encrypt it with their own certificate. Your browser trusts that certificate because the software installed its root into the system store. Python does not, because it ships its own trust store.

You have three options, in order of preference.

**1. Add the interceptor's root certificate to Python's trust store**, which is the correct fix and keeps verification on:

```sh
export SSL_CERT_FILE=/path/to/corporate-root.pem
```

**2. Use a network that's not intercepted**, such as a mobile hotspot, which is the quickest way to confirm the diagnosis.

**3. Fall back to** `neo4j+ssc://`, which encrypts but accepts a self-signed certificate:

```py
driver = GraphDatabase.driver("neo4j+ssc://xxxxxxxx.databases.neo4j.io", auth=AUTH)
```

The `ssc` stands for self-signed certificate. Your traffic is still encrypted, but the driver no longer checks who's on the other end, so anyone already intercepting can keep doing it undetected. **Use it to unblock yourself while learning, and don't ship it to production.**

Every Aura query in this handbook was verified over exactly this route, on a network that turned out to be running TLS inspection.

### Option B: Docker, One Command

If you would rather keep everything on your machine, Docker is the shortest path. Everything in this handbook was written and tested against exactly this container.

```sh
docker run -d --name neo4j-graphbook \
-p 7474:7474 -p 7687:7687 \
-v neo4jdata:/data \
neo4j:5
```

Port 7474 serves Neo4j Browser, the query UI you'll use in a moment. Port 7687 is Bolt, the binary protocol the Python driver speaks.

Set the initial password on the volume **before** the database starts for the first time, because the setting is ignored once a database exists:

```sh
docker volume create neo4jdata
docker run --rm -v neo4jdata:/data neo4j:5 \
neo4j-admin dbms set-initial-password yourpassword
```

Then open `http://localhost:7474` and sign in with `neo4j` and that password.

![Port Shadowing](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943193881/fc6804d9-9b51-40d1-8090-e96668ad8ce8.png)

We have two panels here.

1. What you believe: your script dials `bolt://localhost:7687` and reaches the Docker container running `neo4j:5` with your data.
2. What's happening: a native Neo4j, usually Neo4j Desktop, is already listening on `127.0.0.1:7687`, so it shadows the Docker port mapping and your container is never reached at all. Your script authenticates against that other database, and the driver reports an authentication failure. Nothing in that message mentions ports.

Find out who holds it with `lsof -nP -iTCP:7687 -sTCP:LISTEN`. If something else owns it, move your container with `docker run -p 7475:7474 -p 7688:7687 neo4j:5` and connect on 7688 instead.

::: warning A trap worth knowing about

If you already run Neo4j Desktop, or any other Neo4j, it's probably already listening on 7687. A native process holding that port takes precedence over a Docker port mapping, and the symptom is confusing: the container starts fine, Browser loads, and your driver reports an authentication failure, because it's quietly talking to the *other* database.

:::

If that happens, map the container somewhere else with `-p 7475:7474 -p 7688:7687` and point your driver at `bolt://localhost:7688`. Check what holds the port with `lsof -nP -iTCP:7687 -sTCP:LISTEN`.

### Option C: a Cloud Server You Control

There is a third option worth walking through, because it's closer to how you would actually run this for a team, and because it teaches you what the other two hide. You put Neo4j on a small Linux server in the cloud.

Everything below is exactly what I ran to produce the screenshots in this handbook. It uses AWS, but the shape is identical on any provider.

#### Step 1. Find out which account you're about to spend money in.

This sounds obvious and it's the step people skip.

```sh
aws sts get-caller-identity
aws configure get region
```

The first prints the account number and the user. The second prints the region. If either isn't what you expected, stop and fix your profile before creating anything.

#### Step 2. Find the current Linux image.

Instead of hardcoding an image ID from a blog post, ask AWS for the latest one:

```sh
aws ssm get-parameters \
--names /aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64 \
--query 'Parameters[0].Value' --output text
```

An AMI is a machine image, the template your server boots from. Image IDs differ per region and change over time, which is why you look it up rather than copy it.

#### Step 3. Create a firewall that only lets you in.

This is the step that matters most, and it's the one that gets people breached.

```sh
MYIP=$(curl -s https://checkip.amazonaws.com)/32

SG=$(aws ec2 create-security-group \
  --group-name neo4j-demo-sg \
  --description "Neo4j demo, locked to my IP" \
  --vpc-id <your-default-vpc-id> \
  --query GroupId --output text)

for port in 22 7474 7687; do
  aws ec2 authorize-security-group-ingress \
    --group-id $SG --protocol tcp --port $port --cidr $MYIP
done
```

A security group is a firewall attached to the server. Port 22 is SSH, 7474 is Neo4j Browser, 7687 is Bolt. The `--cidr $MYIP` part restricts every one of them to your own address.

::: note Don't replace that with `0.0.0.0/0`

That means "the entire internet". Databases left open on default ports are found by automated scanners within hours, not weeks, and an open Neo4j is a full read and write handle on your data.

:::

#### Step 4. Boot the server and install Neo4j automatically.

A user-data script is a shell script the server runs once, on first boot, as root.

```sh
#!/bin/bash
dnf install -y docker
systemctl enable --now docker

# ask the instance what its own public address is
TOKEN=$(curl -sX PUT "http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 300")
PUBIP=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/public-ipv4)

docker run -d --name neo4j --restart unless-stopped \
-p 7474:7474 -p 7687:7687 \
-e NEO4J_AUTH=neo4j/ChangeThisPassword \
-e NEO4J_server_default__listen__address=0.0.0.0 \
-e NEO4J_server_bolt_advertised__address=$PUBIP:7687 \
-e NEO4J_server_http_advertised__address=$PUBIP:7474 \
neo4j:5
```

Three details in there are the whole reason this section exists.

`169.254.169.254` is the instance metadata service, a special address every AWS server can reach to ask questions about itself. Here it is asking for its own public IP.

`NEO4J_server_default__listen__address=0.0.0.0` tells Neo4j to accept connections from outside the machine. By default it listens only on localhost, and without this your server would be running perfectly and refusing every connection.

The **advertised address** settings are the subtle one. Neo4j Browser is a web page served by the server, and when it opens a Bolt connection it uses the address the server advertises. If the server advertises `localhost`, the Browser running in *your* laptop's browser will try to connect to *your* laptop. Setting the advertised address to the public IP is what makes a remote Browser work at all.

Note the double underscores. In Neo4j's environment variables, a dot in a config key becomes an underscore and a real underscore becomes a double underscore, so `server.default_listen_address` becomes `NEO4J_server_default__listen__address`.

#### Step 5. Launch it.

```sh
aws ec2 run-instances \
--image-id <ami-from-step-2> \
--instance-type t3.medium \
--key-name <your-key-pair> \
--security-group-ids $SG \
--associate-public-ip-address \
--user-data file://userdata.sh \
--tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=neo4j-demo}]'
```

`t3.medium` gives 2 CPUs and 4GB of memory, which is comfortable for learning. Neo4j will start on 1GB but you'll fight it.

Boot, package install, and image pull took about 90 seconds. Poll until the Browser answers rather than guessing:

```sh
until curl -s -o /dev/null -w "%{http_code}" http://<public-ip>:7474 | grep -q 200; do
  sleep 10
done
```

#### Step 6. Delete it when you're finished.

A server you forgot about bills every hour, forever.

```sh
aws ec2 terminate-instances --instance-ids <instance-id>
aws ec2 delete-security-group --group-id $SG
```

I can't stress this enough for anyone learning on their own account: set a billing alarm, and terminate the moment you're done. The instance used for this handbook existed for under an hour and cost a few cents, but only because I deleted it after.

### The Driver

```sh
pip install neo4j
```

That installs the official driver. At the time of writing it's version 6.x and supports Python 3.10 and above.

### Connecting

The driver object is expensive to create and cheap to reuse. Create one when your program starts, and keep it. Creating a driver per request is a common and costly mistake, because each one builds its own connection pool.

```py
from neo4j import GraphDatabase

URI = "neo4j+s://xxxxxxxx.databases.neo4j.io"
AUTH = ("neo4j", "your-password")

with GraphDatabase.driver(URI, auth=AUTH) as driver:
    driver.verify_connectivity()
    print("Connected")
```

There are two things worth doing every time:

`verify_connectivity()` fails immediately with a clear error if the URI or the password is wrong. Without it, your first failure happens inside a query, where the error is less obvious and harder to attribute.

Using the driver as a context manager, with `with`, closes it cleanly when the block exits. In a long-running service you would instead create the driver at startup and close it during shutdown.

Never put credentials in your source. Read them from the environment:

```py
import os
from neo4j import GraphDatabase

driver = GraphDatabase.driver(
    os.environ["NEO4J_URI"],
    auth=(os.environ["NEO4J_USER"], os.environ["NEO4J_PASSWORD"]),
)
```

---

## The Modeling Decision That Matters Most

Before you write a single row of data you have to decide what becomes a node, what becomes a property, and what becomes a relationship.

This is the part that decides whether your graph is a pleasure or a problem six months from now. It's also the part that no query optimiser can fix for you later.

Here are the rules:

**Make it a node if you'll ever ask a question about it.** If you want to know which engineers work on the payments service, then the payments service is a node. If you want to count incidents by severity, severity is a candidate for a node.

**Make it a property if it only ever describes something else.** The timestamp on an incident is a property. Nobody asks a database to find all the things that happened at 14:32 and then traverse outwards from that moment.

**Make it a relationship if it connects two nodes and you want to walk it.** Ownership connects an engineer to a service, and the entire point is walking from one to the other, so it's a relationship.

A useful test: **can you imagine drawing an arrow to it?** If yes, it's probably a node. Nobody draws an arrow to a timestamp.

Another useful test: **would you ever want to attach something else to it?** Teams have managers, budgets, and charters. That's three arrows waiting to happen, which means a team is a node, not a string.

### Relationship Direction

Every relationship in Neo4j has a direction. You store `(:Engineer)-[:OWNS]->(:Service)` because an engineer owns a service and not the other way round.

Direction matters when you write the data. It matters much less when you query, because you can traverse against the stored direction, and you can ignore direction entirely.

```cypher
// follow the stored direction
MATCH (e:Engineer)-[:OWNS]->(s:Service) RETURN e, s

// traverse against it: start from the service
MATCH (s:Service)<-[:OWNS]-(e:Engineer) RETURN s, e

// ignore direction entirely
MATCH (e:Engineer)-[:OWNS]-(s:Service) RETURN e, s
```

Those three return the same pairs. Store the direction that reads naturally as an English sentence, and stop worrying about it.

![Relationship Direction](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943196770/6bf41f5e-07b8-45f6-845a-ba847f9f4a49.png)

Three patterns matching identical data: walking the stored direction, walking against it, and dropping the arrowhead to ignore direction. All three return Ada and payments.

That third one is the debugging move. If a query returns nothing and you expected rows, drop the arrowheads. If rows appear, direction was the cause. If not, you've ruled out the likeliest suspect in ten seconds. Direction does matter when you write: `MERGE (a)-[:OWNS]->(b)` and the reverse create two different facts, and only one is true.

### Properties on Relationships

This is the feature people forget exists, and it's often the cleanest answer.

![Relationship Properties](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943199122/bc69217f-bb75-40ac-a1af-ac4eac54118d.png)

One fact, stored two ways. In tables, `since` lives on an `ownership` join table that isn't part of your domain and exists only because rows can't point at each other. In a graph it sits on the connection, and you can query it directly: `MATCH (e:Engineer)-[r:OWNS]->(s:Service) WHERE r.since < date() - duration('P1Y')` gives you everyone who has owned something for more than a year.

```cypher
MERGE (e:Engineer {email: 'ada@example.com'})-[r:OWNS]->(s:Service {name: 'payments'})
  SET r.since = date('2026-03-01'), r.primary = true
```

Now you can ask who has owned a service for longer than a year, without inventing a join table to hold the fact.

---

## Three Modeling Mistakes Almost Everyone Makes

I've watched these three mistakes happen more times than any others, and each one is easy to avoid once you've seen it.

![Modelling Mistake](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943202043/5509c707-9bf2-4739-9ed1-6ada4388190a.png)

Almost every first graph model makes this one: storing a connection as a property because it looks simpler. It can't be traversed, can't carry facts of its own, and turns into string matching.

### Mistake #1: Storing a Connection as a Property

You give each engineer a `team` property holding the string `"platform"`.

This works right up until you want to know what else the platform team owns. Now you're matching strings scattered across thousands of nodes. Worse, the moment someone writes `"Platform"` with a capital P, you've silently created a second team, and no error was raised.

The fix is to make the team a node and connect engineers to it. Both problems disappear at once, and you gain somewhere to hang the team's manager and budget later.

The general form of this mistake: **anything you want to traverse must be a relationship**. A property holding a list of identifiers is a graph database pretending to be a spreadsheet.

### Mistake #2: One Generic Relationship Type for Everything

You create a `RELATED_TO` relationship and put a `type` property on it to say what kind of relation it is.

This looks flexible. It's the opposite. Neo4j narrows the search by relationship type before it walks anything, so `-[:OWNS]->` is fast. Filtering on a property means walking every `RELATED_TO` relationship first, then discarding most of them, which is exactly the row-scanning behaviour you moved to a graph to avoid.

Name your relationships for what they mean: `OWNS`, `AFFECTS`, `MEMBER_OF`, or `DEPENDS_ON`. Specific types are both faster and self documenting.

### Mistake #3: Making Everything a Node

This is the overcorrection, and it's its own problem.

If a value only ever describes one node, and you never search for it independently, it's a property. Creating a node for every timestamp gives you a much larger graph, slower traversals, and nothing whatsoever in return.

The test remains the same. Will you ask a question about it, or attach something to it? If not, it's a property.

---

## Modeling Backwards From Your Questions

Here's a technique that will save you a rewrite.

Don't start by modeling your domain. Start by writing down the questions the graph has to answer, in plain English, before you draw anything.

For our example:

1. Which services did this incident affect?
2. Who owns those services?
3. Which teams do those owners belong to?
4. Which services depend on the one that broke?
5. Who has been on call for this service in the last month?

Now check your model against the list. Every question should be a path you can trace with your finger. If a question requires a join across two properties, or a scan of every node of some label, the model is wrong for that question.

Question five is a good example of why this matters. "On call in the last month" is a fact about a period of time connecting a person and a service. That's a relationship with properties on it, and if you had modeled on-call as a boolean property on the engineer, you would've discovered the problem after loading your data instead of before.

Relational modeling teaches you to normalise first and query later. Graph modeling works better in the other direction.

---

## Three Modeling Patterns Worth Knowing Early

Once the basics land, three patterns cover most of what you'll hit in real data.

### When a Relationship Needs More Than Two Ends

A relationship connects exactly two nodes. Sometimes a fact connects three or more.

"Ada was on call for payments during March" involves a person, a service, and a time window. You can't hang that off a single relationship without losing something.

The pattern is to promote the fact itself to a node:

```cypher
MERGE (e:Engineer {email: 'ada@example.com'})
MERGE (s:Service {name: 'payments'})
CREATE (r:OnCallRotation {start: date('2026-03-01'), end: date('2026-03-31')})
MERGE (e)-[:SERVED]->(r)
MERGE (r)-[:FOR_SERVICE]->(s)
```

![Nary Intermediate Node](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943204974/7c021397-05a5-4cc5-a585-ece032246029.png)

"Ada was on call for payments during March" has three participants and a relationship has two ends. Forced onto one `ON_CALL`, it breaks in April, because a second rotation needs a second relationship between the same nodes and nothing can hang off either. Promote the fact to a node and it gets three relationships, so anything can attach. The signal is wanting to put a property on a relationship that describes something other than that exact pair.

`OnCallRotation` is sometimes called an intermediate node, a reified relationship, or a hyper-edge. The name doesn't matter. What matters is that a fact with three participants becomes a node with three relationships, and now you can attach more to it later, such as who swapped in halfway through.

The signal that you need this: you find yourself wanting to put a property on a relationship that describes something other than that exact pair of nodes.

### Versioning, When Facts Change Over Time

Graphs are easy to update in place, which makes it tempting to overwrite. If history matters, don't.

![Temporal Versioning](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943207486/ebcf3146-22f0-4c8b-8d17-a9f23e56e5f7.png)

Ownership changes hands, and pointing the relationship at the new person erases that anyone else ever held it. The alternative closes the old relationship with an end date and opens a new one, so history survives. Overwriting is what happens if you don't decide.

The usual pattern is to keep the relationship and mark it closed rather than deleting it:

```cypher
// close the old ownership rather than deleting it
MATCH (e:Engineer {email: $old})-[r:OWNS]->(s:Service {name: $service})
WHERE r.until IS NULL
SET r.until = date()

// open a new one
MATCH (e:Engineer {email: $new}), (s:Service {name: $service})
MERGE (e)-[r2:OWNS]->(s)
  ON CREATE SET r2.since = date()
```

Current ownership is then `WHERE r.until IS NULL`, and history is still there when someone asks who owned this last year. The cost is that every query about "now" needs that filter, so decide deliberately rather than by accident.

### Hierarchies, Which Graphs Are Unusually Good At

Trees are painful in SQL and trivial here. An organisation, a category tree, a folder structure, and a dependency chain are all the same shape.

```cypher
// everyone under a given manager, at any depth
MATCH path = (m:Engineer {email: $email})<-[:REPORTS_TO*1..10]-(report:Engineer)
RETURN report.name AS name, length(path) AS depth
ORDER BY depth, name
```

Naming the path with `path =` is what lets you call `length()` on it, which returns the number of relationships traversed and therefore how far down the tree each person sits.

This is the query that makes people switch. In SQL it's a recursive common table expression that most engineers have to look up every time. Here it's one line, and changing the depth is changing a number.

---

## Loading Data From Python

The modern driver gives you one method for running a query: `execute_query`. It manages sessions and retries for you, and it's the right default.

Start with a single engineer and a single service.

```py
driver.execute_query(
    """
    MERGE (e:Engineer {email: $email})
      SET e.name = $name
    MERGE (s:Service {name: $service})
    MERGE (e)-[:OWNS]->(s)
    """,
    email="ada@example.com",
    name="Ada",
    service="payments",
    database_="neo4j",
)
```

Three things in that snippet deserve attention.

### MERGE Rather Than CREATE

`CREATE` always makes a new node. Run your loading script twice and you have two identical engineers, two identical services, and a mess.

`MERGE` looks for a node matching the pattern and creates one only if nothing matches. That makes the script safe to run again, which you'll want the very first time it fails halfway through a load.

The rule of thumb: `CREATE` when you know the thing is new, `MERGE` when you're loading from a source that might contain something you already have.

### Merge on Identity, Then Set Everything Else

Look carefully at where the properties are.

```py
MERGE (e:Engineer {email: $email})
  SET e.name = $name
```

The `MERGE` is on `email` alone, and the name is applied afterwards with `SET`.

If you had merged on both email and name, then the day someone changes their name you would create a second node rather than updating the first. You would end up with two Adas, connected to different things, and no error to tell you.

**Merge on the property that identifies the node. Set the rest.**

![Merge Key](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943210745/4bef13c4-8f7b-4c11-981c-bf264a9c61ab.png)

Two scripts that both run without error and both report success. The left merges on email and name together. The right merges on email alone and sets the name afterwards.

Load them once and they look identical. Then Ada marries and changes her name to Ada Okonjo, same email. On the left the pattern no longer matches, because the name differs, so MERGE creates a second node. Her ownerships are now split across both, and every query about her returns part of the truth.

On the right the email still matched, so MERGE found the existing node and SET overwrote the name, and her relationships stay attached to the node they were always on.

The rule: merge on the property that identifies the node and nothing else, and set everything that merely describes it. If a value can change while the thing stays the same thing, it doesn't belong in the key. You can catch this whole class of bug by loading your data twice and asserting the node count is identical, which costs three lines.

There's a matching variant when you want different behaviour on first insert versus update:

```cypher
MERGE (e:Engineer {email: $email})
  ON CREATE SET e.name = $name, e.created = datetime()
  ON MATCH  SET e.name = $name, e.last_seen = datetime()
```

### Parameters, Never String Formatting

The values are passed separately as `$email` and `$name`. Never build a query by concatenating strings.

This protects you from injection, which is the obvious reason. There's a second reason that matters for performance: Neo4j caches query plans keyed on the query text. Parameterised queries have identical text every time, so the plan is compiled once and reused. String-formatted queries produce a new plan for every distinct value, which fills the plan cache with garbage and recompiles constantly.

---

## Loading at Scale with UNWIND

One node at a time means one network round trip per node. Loading ten thousand records that way is slow, and almost all of the time is spent waiting rather than working.

Send a list instead and let Cypher loop inside the database.

```py
rows = [
    {"email": "ada@example.com",   "name": "Ada",   "service": "payments"},
    {"email": "linus@example.com", "name": "Linus", "service": "checkout"},
    {"email": "grace@example.com", "name": "Grace", "service": "payments"},
]

driver.execute_query(
    """
    UNWIND $rows AS row
    MERGE (e:Engineer {email: row.email})
      SET e.name = row.name
    MERGE (s:Service {name: row.service})
    MERGE (e)-[:OWNS]->(s)
    """,
    rows=rows,
    database_="neo4j",
)
```

`UNWIND` takes a list and turns it into rows, so everything after it runs once per element, all inside a single transaction and a single round trip.

![Unwind Round Trips](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943213878/e0c6c996-c416-44ae-8751-315a28083a64.png)

What makes a bulk load slow isn't the writing, it's the waiting between writes. One statement per row is a network round trip per row. One UNWIND sends the batch in a single trip and lets the database loop internally.

This is not a small optimisation. Writing 1,000 rows to the 75,500 node dataset, one statement per row against a single `UNWIND`:

| Approach | Round trips | Time |
| --- | --- | --- |
| One statement per row | 1,000 | 2,758 ms |
| One `UNWIND` | 1 | 64 ms |

Forty-three times faster, on a database running on the same machine as the client, where a round trip costs almost nothing. Run it yourself and you'll get a different multiple, somewhere in the same region: a clean checkout on this machine measured sixty-six.

**The gap grows with distance.** I ran the same comparison against a managed instance in another city and measured 91,722 ms against 150 ms, which is 613 times. Nothing about the work changed. What changed is that each of the 1,000 round trips now pays for a journey across the country and back. A minute and a half became a seventh of a second.

That's the real lesson: the cost of chattiness isn't fixed. It is however far away your database happens to be, multiplied by how many times you talk to it.

For a real load, batch it. One enormous transaction holds every change in memory until it commits, and a transaction containing a million updates is a good way to exhaust the heap.

```py
def load_in_batches(driver, rows, batch_size=5000):
    query = """
    UNWIND $rows AS row
    MERGE (e:Engineer {email: row.email})
      SET e.name = row.name
    MERGE (s:Service {name: row.service})
    MERGE (e)-[:OWNS]->(s)
    """
    for start in range(0, len(rows), batch_size):
        batch = rows[start:start + batch_size]
        driver.execute_query(query, rows=batch, database_="neo4j")
        print(f"loaded {start + len(batch)} of {len(rows)}")
```

A few thousand rows per batch is a reasonable starting point. Tune it by watching memory rather than by guessing.

---

## Loading From a CSV File

Most real data starts life in a spreadsheet or an export. There are two ways to get it in, and picking the wrong one is a common source of frustration.

### Option #1: Read it in Python, Send it with UNWIND

This is the one to reach for by default. You already know how it works, it runs anywhere, and you can clean the data on the way through.

```py
import csv

def load_csv(driver, path, batch_size=5000):
    with open(path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    query = """
    UNWIND $rows AS row
    MERGE (e:Engineer {email: row.email})
      SET e.name = row.name
    MERGE (s:Service {name: row.service})
    MERGE (e)-[:OWNS]->(s)
    """
    for start in range(0, len(rows), batch_size):
        driver.execute_query(query, rows=rows[start:start + batch_size], database_="neo4j")
```

`csv.DictReader` gives you a dictionary per row keyed by the header names, which is exactly the shape `UNWIND` wants.

One warning that catches everyone: **every value from a CSV is a string.** A column of numbers arrives as `"42"`, not `42`, and a column of dates arrives as `"2026-03-01"`. If you store them raw you'll later write comparisons that silently do the wrong thing, because `"9" > "10"` is true when both are strings. Convert as you read:

```py
for row in rows:
    row["headcount"] = int(row["headcount"]) if row["headcount"] else None
```

### Option #3: LOAD CSV, Which Runs Inside the Database

Cypher can read a file itself. This is faster for very large files because the data never travels through your Python process.

```cypher
LOAD CSV WITH HEADERS FROM 'file:///engineers.csv' AS row
CALL {
  WITH row
  MERGE (e:Engineer {email: row.email})
    SET e.name = row.name
  MERGE (s:Service {name: row.service})
  MERGE (e)-[:OWNS]->(s)
} IN TRANSACTIONS OF 1000 ROWS
```

`CALL { ... } IN TRANSACTIONS OF 1000 ROWS` is the important part. Without it the whole file is one transaction, which is how people run a large import and watch it exhaust memory.

There are two constraints on `LOAD CSV` that surprise people:

First, the file has to be somewhere the database can reach, not somewhere you can reach. `file:///` means the import directory *on the server*. On Docker that means mounting a folder into the container with `-v $(pwd)/data:/var/lib/neo4j/import`. On Aura you can't use local files at all, so the URL must be a publicly reachable `https://` address.

![CSV Strings](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943216000/82b43543-57b9-48c0-8581-c03881d3cc2f.png)

Every CSV value arrives as a string, including numbers. Nothing errors and no warning appears, so `"9" > "10"` is true and your filter quietly returns the wrong rows. Cast on the way in.

Second, everything is still a string. Cypher has conversion functions for this:

```cypher
LOAD CSV WITH HEADERS FROM 'https://example.com/services.csv' AS row
MERGE (s:Service {name: row.name})
  SET s.headcount = toInteger(row.headcount),
      s.launched  = date(row.launched)
```

`toInteger`, `toFloat`, `date` and `datetime` are the ones you'll use constantly. `toInteger` returns `null` rather than throwing on a value it can't parse, which is convenient and also means a column full of typos will quietly become a column full of nulls. Check your data after loading:

```cypher
MATCH (s:Service) WHERE s.headcount IS NULL RETURN count(*) AS unparsed
```

---

## Updating and Deleting

Loading is only half of it. Data changes, and the commands that change it have sharp edges.

### Changing Properties

`SET` adds or overwrites a property. `REMOVE` takes one away entirely, which is different from setting it to null.

```cypher
MATCH (e:Engineer {email: $email})
SET e.name = $name, e.updated = datetime()
REMOVE e.legacy_id
```

There's a shorthand that overwrites several properties at once from a map:

```cypher
MATCH (e:Engineer {email: $email})
SET e += $props
```

`+=` merges the map into the node, leaving properties you didn't mention alone. Plain `=` **replaces the entire property set**, silently deleting anything not in your map. That difference has cost people real data, so it's worth reading twice.

### Deleting

You can't delete a node that still has relationships. Neo4j refuses, because leaving a dangling relationship would corrupt the graph.

```cypher
// fails if the engineer owns anything
MATCH (e:Engineer {email: $email}) DELETE e
```

`DETACH DELETE` removes the relationships and then the node:

```cypher
MATCH (e:Engineer {email: $email}) DETACH DELETE e
```

It's handy, and dangerous for exactly the same reason. Run the `MATCH` on its own with `RETURN` first and look at what comes back, every time.

To wipe a whole database while experimenting:

```cypher
MATCH (n) DETACH DELETE n
```

That's fine on a few thousand nodes and a bad idea on millions, because it builds one enormous transaction. For a large reset, drop the database or delete in batches with `CALL { ... } IN TRANSACTIONS`.

---

## Working with Neo4j Data Types

Neo4j stores more than strings and numbers, and using the right type saves you from parsing dates out of text later.

| Type | Example | Notes |
| --- | --- | --- |
| String, Integer, Float, Boolean | `'payments'`, `42`, `1.5`, `true` | As expected |
| List | `['a','b','c']` | Homogeneous lists of primitives |
| Date, DateTime, Time | `date('2026-03-01')`, `datetime()` | Real temporal types, comparable and sortable |
| Duration | `duration('P30D')` | Periods, which you can add to a date |
| Point | `point({latitude: 51.5, longitude: -0.12})` | Spatial, with a distance function |

A property can't hold a map or a node. If you find yourself wanting nested structure inside a property, that nested thing is usually asking to be a node.

Temporal types are the ones that earn their keep immediately:

```cypher
MATCH (e:Engineer)-[r:OWNS]->(s:Service)
WHERE r.since < date() - duration('P1Y')
RETURN e.name, s.name, duration.between(r.since, date()).years AS years
```

Comparing dates as dates, rather than as strings you hope sort correctly, removes a whole category of bug.

On the Python side the driver converts these for you. `date` and `datetime` come back as `neo4j.time` objects, which have `.to_native()` if you want Python's own `datetime`:

```py
records, _, _ = driver.execute_query(
    "MATCH (e:Engineer)-[r:OWNS]->(s:Service) WHERE r.since IS NOT NULL RETURN r.since AS since",
    database_="neo4j",
)
for r in records:
    print(r["since"], "->", r["since"].to_native())
```

---

## Your First Cypher Queries

Cypher looks a little like SQL in places, but its central idea is different. You draw the shape you're looking for, and the database finds every part of the graph matching that shape.

Patterns use parentheses for nodes and arrows for relationships:

```cypher
(e:Engineer)-[:OWNS]->(s:Service)
```

Read it aloud: an engineer node, an OWNS relationship pointing out of it, and a service node at the other end. The pattern is the query.

![Cypher Pattern Anatomy](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943218402/fade2e09-2b03-4b21-ba0e-90d79ebc2691.png)

Five conventions on `(e:Engineer)-[:OWNS]->(s:Service)`. Round brackets are a node. `e` is an optional variable, named only if you want it back. `:Engineer` is a label, narrowing to that kind first. Square brackets and an arrow are a relationship and its stored direction. `:OWNS` is the type, and Neo4j narrows by type first, which is why specific types are fast.

Said aloud: "an engineer, who owns a service." The SQL equivalent says how to reconstruct the connection. The Cypher says what the connection is.

### Finding Things

```py
records, summary, keys = driver.execute_query(
    """
    MATCH (e:Engineer)-[:OWNS]->(s:Service {name: $service})
    RETURN e.name AS name, e.email AS email
    ORDER BY name
    """,
    service="payments",
    database_="neo4j",
)

for record in records:
    print(record["name"], record["email"])
```

`execute_query` returns three things: the records, a summary, and the keys that were returned.

Most of the time you want the records, which is why you'll often see the other two discarded with underscores.

![Multihop Table](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943220876/8c9c25e9-4844-4420-b46e-14331427abd8.png)

Neo4j Browser running the multi-hop query, with the results as a table. It's the same query you wrote above, with the parameter filled in by hand. That's what you do when you're exploring in the browser rather than calling from Python.

The query starts at incident `INC-4471`, follows `AFFECTS` out to the services it touched, then follows `OWNS` backwards to the engineers who own them. The rows that come back are those engineers' names and email addresses, sorted by name.

The same query, just run in Neo4j Browser. Two columns come back, `name` and `email`, one row per engineer.

### Filtering

`WHERE` works much as you would expect.

```cypher
MATCH (e:Engineer)-[r:OWNS]->(s:Service)
WHERE r.since < date('2026-01-01') AND s.tier = 'critical'
RETURN e.name, s.name, r.since
```

Note that you can filter on a property of the relationship, `r.since`, as easily as on a property of a node. That's the payoff for modeling the fact where it belongs.

### Counting and Grouping

Cypher has no `GROUP BY`. Aggregation is implicit: anything you return that's not an aggregate becomes the grouping key.

```cypher
MATCH (t:Team)<-[:MEMBER_OF]-(e:Engineer)-[:OWNS]->(s:Service)
RETURN t.name AS team, count(DISTINCT s) AS services
ORDER BY services DESC
```

That returns one row per team, because `t.name` is the only non-aggregate in the `RETURN`.

### When Something Might Not Be There

`MATCH` drops rows that don't match the whole pattern. If you want engineers whether or not they own anything, use `OPTIONAL MATCH`, which is the closest equivalent to a left outer join.

```cypher
MATCH (e:Engineer)
OPTIONAL MATCH (e)-[:OWNS]->(s:Service)
RETURN e.name AS name, collect(s.name) AS services
```

Engineers who own nothing come back with an empty list rather than vanishing from the result.

---

## The Multi-Hop Query That Justifies the Whole Thing

Now let's return to the question from the very beginning.

An incident affected some services. Who has context on those services?

```py
records, _, _ = driver.execute_query(
    """
    MATCH (i:Incident {ref: $ref})-[:AFFECTS]->(:Service)<-[:OWNS]-(e:Engineer)
    RETURN DISTINCT e.name AS name, e.email AS email
    """,
    ref="INC-4471",
    database_="neo4j",
)
```

![Traversal ISO](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943223173/418b0723-595f-4013-ba13-7641ea9db3b3.png)

One incident, two hops, and six nodes read. The work is the small pile standing on each step, not anything proportional to how much data the database holds.

Read the pattern from left to right and it's close to the English sentence.

Here's that query run against a live Neo4j Aura instance from the terminal:

![Terminal Multihop](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943225485/04c4f3e9-1572-47e5-a7b2-11ff258c91c9.png)

Same query again, this time from `cypher-shell` against Aura instead of the browser, returning the identical three names: `"Ada Okonjo"`, `"Grace Lin"` and `"Linus Berg"`.

Start at the incident, follow AFFECTS to the services it hit, then follow OWNS backwards to the engineers who own them.

The arrow pointing left, `<-[:OWNS]-`, is doing real work. Ownership was stored from engineer to service, so reaching the engineers from the services means traversing against the stored direction.

Getting this backwards is the single most common reason a beginner's query returns nothing at all. If a query returns an empty result and you expected rows, check your arrow directions first.

![Graph Result](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943228032/5fc8a639-07d2-473f-b001-bfc698490c76.png)

This is the same result drawn as a graph instead of a table, in Neo4j Browser. The incident sits at one end, the services it affected in the middle, and the engineers who own those services at the other end. The path the query walked is visible as a shape rather than as rows.

Now widen it. Which whole teams are behind the affected services?

Here's the query most people write first. **It's wrong, and it fails silently**, which is why it's worth showing.

```cypher
// WRONG: silently drops teams. Explanation below.
MATCH (i:Incident {ref: $ref})-[:AFFECTS]->(:Service)<-[:OWNS]-(:Engineer)
      -[:MEMBER_OF]->(t:Team)<-[:MEMBER_OF]-(e:Engineer)
RETURN DISTINCT t.name AS team, e.name AS name
ORDER BY team, name
```

Run that against the dataset in this handbook and it returns three rows, all from the Platform team. The Commerce team is missing, even though Linus owns `checkout` and `checkout` was affected.

### Relationship Uniqueness, the Trap That Hides Answers

![Relationship Uniqueness](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943230817/46852bb9-0a7f-4765-b57c-527f96dd128d.png)

We have two versions side by side here. The single pattern looks correct and **returns three rows**. Split into two patterns joined by `WITH`, the same question **returns four**. The drawing traces why: the pattern has to walk out along a `MEMBER_OF` relationship and back along the same one, and Cypher discards that match rather than reusing the relationship.

Splitting the pattern lifts the restriction because the rule applies within one pattern, not across the query, and `WITH DISTINCT` keeps the extra rows from duplicating.

Cypher guarantees that **a single pattern won't traverse the same relationship twice**. This is called relationship isomorphism, and it exists to stop patterns looping back on themselves forever.

Look at what that means for Commerce. Its only member is Linus, and Linus is also the owner. To match, the pattern has to walk out of Linus along his `MEMBER_OF` relationship to reach the team, and then walk back down the very same relationship to reach a member. That's the same relationship twice, so Cypher discards the row.

There's no error or warning, just a quieter answer than the truth.

The fix is to break the single pattern into two, so the rule no longer spans both halves:

```cypher
MATCH (i:Incident {ref: $ref})-[:AFFECTS]->(:Service)<-[:OWNS]-(:Engineer)-[:MEMBER_OF]->(t:Team)
WITH DISTINCT t
MATCH (t)<-[:MEMBER_OF]-(e:Engineer)
RETURN t.name AS team, e.name AS name
ORDER BY team, name
```

`WITH` ends one pattern and begins another. The second `MATCH` starts fresh, so the owner's own membership is available again.

That version returns four rows, including Commerce and Linus.

### Does it Still Hold at Scale?

A fair objection to everything above is that fourteen nodes proves nothing. So here is the same multi-hop query, unchanged, against the 75,500 node dataset:

```plaintext
33 engineers returned, 150 database accesses, 4.6 ms
```

The graph is roughly five thousand times larger. The query is identical, and it still touches around a hundred and fifty things.

That's index-free adjacency doing exactly what was promised at the top of this article. The work is proportional to the neighbourhood you walk, not to the size of the database you walk it in. A join across three tables of that size would have to consider vastly more rows to answer the same question.

You can reproduce this yourself. The dataset is committed to the [companion repository (<VPIcon icon="iconfont icon-github"/>`ronidas39/knowledge-graph-python-neo4j`)](https://github.com/ronidas39/knowledge-graph-python-neo4j), and <VPIcon icon="fa-brands fa-python"/>`benchmark.py` runs this measurement along with the others in this article.

::: important The general lesson

Whenever a pattern leaves a node and comes back to the same kind of node, ask whether the two halves could ever be the same relationship. If they could, split the query with `WITH`. This is the most common source of silently incomplete results in Cypher, and it's very hard to spot by reading, because the query looks correct and returns plausible data.

:::

Four hops, still readable as a sentence. Writing the equivalent in SQL means several joins plus a distinct, and changing "two steps" to "three steps" means rewriting it.

---

## Variable Length Paths and How to Keep Them Safe

Sometimes you don't know how many hops you need. Service dependencies are the classic case: payments depends on auth, auth depends on the user store, and you want everything downstream of a failure.

```cypher
MATCH (s:Service {name: $name})<-[:DEPENDS_ON*1..4]-(affected:Service)
RETURN DISTINCT affected.name
```

The `*1..4` means follow between one and four `DEPENDS_ON` relationships.

![Variable Length Paths](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943234236/4dd2cc87-1c11-4ef7-9d59-d67a917e8123.png)

Always bound a variable length path. Each hop multiplies what the last one reached, so `[:DEPENDS_ON*]` has nothing to stop it while `[:DEPENDS_ON*1..4]` does. On a connected graph the unbounded version doesn't return slowly, it stops being a query you can wait for.

**Always put an upper bound on it.** An unbounded `*` on a well-connected graph can walk an enormous portion of the database, and the query that was instant on your test data will hang on production data. This is the single most common way people make a graph database look slow.

Here's what each extra pair of hops costs, starting from the most depended-upon service in the 75,500 node dataset, which has 10,039 `DEPENDS_ON` relationships between services:

| Bound | Services reached | Database accesses |
| --- | --- | --- |
| `*1..2` | 30 | 290 |
| `*1..4` | 133 | 1,620 |
| `*1..6` | 481 | 6,388 |

Look at what happens between two hops and six. The reach grows more than fifteen fold, and the work grows twenty two fold. Nothing about the query changed except two characters.

That's the shape to keep in your head. Reach grows geometrically, and work grows with it. On a denser graph than this one the multiplier is larger, which is why an unbounded `*` on a social graph or a dependency graph can go from fast to hopeless with no warning at all, and why the failure arrives in production rather than on your laptop: your test data was not connected enough to hurt you.

I have deliberately not given you timings for these three. At this size they all complete in two to four milliseconds and the differences between them are measurement noise, not signal. The database access counts are the honest comparison, and unlike the timings, they'll be identical on your machine.

You can also ask for the shortest connection between two nodes, which is a genuinely hard query in SQL and a one liner here:

```cypher
MATCH p = shortestPath(
  (a:Engineer {email: $from})-[:MEMBER_OF|OWNS*..6]-(b:Engineer {email: $to})
)
RETURN [n IN nodes(p) | coalesce(n.name, n.email)] AS hops
```

That returns the chain of things connecting two people. Recommendation engines, fraud detection, and access analysis are all variations on this one query.

---

## What an Index Actually is

Before we use one, it's worth being clear about what an index is, because almost every performance problem in this article traces back to this one idea.

Think about a textbook of nine hundred pages. You want the part about photosynthesis. You have two options: you can start at page one and read forward until you find it, or you can turn to the index at the back, find "photosynthesis, 412", and go straight to page 412. Both find the same page. One reads up to nine hundred pages, the other reads two.

A database index is that back-of-the-book index. It's a second, separate structure that the database maintains alongside your data, which maps a property value to the nodes that have it. You don't query the index directly and you don't have to tell Cypher to use it. You create it once, and from then on the planner uses it when it helps.

![Index Book Analogy](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943236492/9aecbf0a-5e0e-4993-aece-fa1b6d68adea.png)

On the left, `AllNodesScan`: sixty pages read, one of them useful, and the other fifty-nine still read. On the right, `NodeUniqueIndexSeek`: two reads, the index entry and then the page.

The figure also carries the number this handbook measures later, on the 75,500 node dataset: **151,002 database accesses became 3.** And the part worth remembering is that you never tell Cypher to use an index. You create it once, and from then on the planner reaches for it when it helps.

Here's the same lookup done three ways, against the 75,500 node dataset. All three find exactly one engineer, and all three return the same answer. What changes is how much work the database does to get there.

**One: no label, no index.**

```cypher
PROFILE MATCH (n) WHERE n.email = 'eng25000@example.com' RETURN n.name
```

```plaintext
operator            details                       est     rows   dbHits
ProduceResults      `n.name`                     3775        1        0
  Projection        n.name AS `n.name`           3775        1        1
    Filter          n.email = $autostring_0      3775        1    75500
      AllNodesScan  n                           75500    75500    75501
```

`AllNodesScan` is the database reading every node it has. All 75,500 of them, including every service, team, and incident, none of which could possibly have an email. Then `Filter` checks the email property on every one. **Total: 151,002 database accesses to find one node.**

**Two: with a label, still no index.**

```cypher
PROFILE MATCH (e:Engineer) WHERE e.email = 'eng25000@example.com' RETURN e.name
```

```plaintext
operator               details                    est     rows   dbHits
ProduceResults         `e.name`                  2500        1        0
  Projection           e.name AS `e.name`        2500        1        1
    Filter             e.email = $autostring_0   2500        1    50000
      NodeByLabelScan  e:Engineer               50000    50000    50001
```

`NodeByLabelScan` is better. It reads only the 50,000 engineers instead of all 75,500 nodes. But it still reads every single one. **Total: 100,002 accesses.** The label narrowed the haystack. It didn't stop us searching it straw by straw.

**Three: with an index.**

```cypher
CREATE CONSTRAINT engineer_email IF NOT EXISTS
FOR (e:Engineer) REQUIRE e.email IS UNIQUE
```

```cypher
PROFILE MATCH (e:Engineer) WHERE e.email = 'eng25000@example.com' RETURN e.name
```

```plaintext
operator                 details                                        est   rows   dbHits
ProduceResults           `e.name`                                         1      1        0
  Projection             e.name AS `e.name`                               1      1        1
    NodeUniqueIndexSeek  UNIQUE e:Engineer(email) WHERE email = $auto      1      1        2
```

The scan and the filter are both gone, replaced by a single `NodeUniqueIndexSeek`. **Total: 3 database accesses.**

![Scan vs Seek Ladder](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943240334/ee25f5a1-c736-404e-90bf-79a5ac0ecf20.png)

Here we have one lookup done three ways, finding one engineer among 50,000 in a graph of 75,500 nodes, measured with PROFILE on Neo4j 5.26.29 Community. All three return the identical answer. What changes is the work: reading every node of the label, a scan narrowed by property, or an index seek straight to it.

Three, against a hundred and fifty-one thousand. That's the entire argument for indexes in one table:

| How | Operator | Database accesses |
| --- | --- | --- |
| No label, no index | `AllNodesScan` | 151,002 |
| Label, no index | `NodeByLabelScan` | 100,002 |
| Index | `NodeUniqueIndexSeek` | 3 |

On my machine, that was 35.4 ms without the index and 4.0 ms with it, so about nine times faster.

**But** **be careful how you quote numbers like these.** The database did 33,334 times less work, but it didn't run 33,334 times faster, because a single query also pays for connection handling, planning and returning the result, none of which the index changes. The work ratio is the durable claim. The speed ratio depends on your hardware, your cache, and what else the server is doing.

**You won't get nine.** When I ran this same benchmark again from a clean checkout, the same query on the same data measured seventeen times faster rather than nine. The database access counts were identical to the digit: 100,002 and 3, both times.

That contrast is the entire point. Database accesses are a property of your data and your query, so they reproduce exactly. Milliseconds are a property of the machine you happened to run on, so they do not. When you're comparing two ways of writing a query, compare the accesses.

### The Index Types Neo4j Gives You

Most tutorials show you one kind of index and stop. Neo4j 5 has six, and picking the wrong one is the same as having none, because the planner will quietly ignore an index that can' t answer your predicate.

| Type | Use it for | Created with |
| --- | --- | --- |
| **Range** | Exact matches, ranges, `STARTS WITH`, sorting. The default. | `CREATE INDEX ... FOR (n:Label) ON (n.prop)` |
| **Text** | `CONTAINS` and `ENDS WITH` on string properties | `CREATE TEXT INDEX ...` |
| **Point** | Distance and bounding box queries on geographic points | `CREATE POINT INDEX ...` |
| **Token lookup** | Finding nodes by label or relationships by type | Exists by default, two of them |
| **Full-text** | Searching *inside* text, ranked by relevance. Powered by Lucene. | `CREATE FULLTEXT INDEX ...` |
| **Vector** | Nearest-neighbour search over embeddings | `CREATE VECTOR INDEX ...` |

The one that catches people is the difference between range and text. A range index handles `STARTS WITH` perfectly well, because names sharing a prefix sit next to each other in sorted order, the same way "photosynthesis" and "photosphere" are neighbours in a book index. It cannot help with `CONTAINS` or `ENDS WITH`, because the thing you are searching for could be anywhere inside the value, and a sorted structure gives you no way to narrow that down. That's what a text index is for.

![Index Type Decision](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943242850/9746cba9-9e22-4e6c-a2bf-668e9f67e9a2.png)

We have six index types and the question each answers. The wrong type is the same as no index, because the planner quietly ignores an index that can't answer your predicate and nothing tells you it happened.

If you write no type at all, you get a range index, which is the right default for the overwhelming majority of cases:

```cypher
CREATE INDEX service_tier IF NOT EXISTS FOR (s:Service) ON (s.tier)
```

You can also index more than one property at once, which is called a composite index:

```cypher
CREATE INDEX service_tier_name IF NOT EXISTS FOR (s:Service) ON (s.tier, s.name)
```

A composite index isn't the same as two separate indexes. It's one structure sorted by tier first and then by name inside each tier, like a phone book ordered by city and then surname. It's excellent when you filter on both, and useless if you filter only on the second one, because you can't look up a surname in a phone book that is grouped by city without going through every city.

![Composite Index](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943245742/7d5c7c45-ee00-478b-8eed-05cbf3c04cd1.png)

A composite index covers a combination of properties, and their order decides which queries it serves. Filtering on the first property alone can use it. Filtering only on the second can't.

Relationships can be indexed too, using the same syntax with a relationship pattern:

```cypher
CREATE INDEX owns_since IF NOT EXISTS FOR ()-[r:OWNS]-() ON (r.since)
```

To see what you have, ask:

```cypher
SHOW INDEXES
```

### Why Your Index Isn't Being Used

An index that exists but is never used is the most frustrating case, because everything looks correct. There are four usual reasons, and a `PROFILE` tells you which one you have.

1. **You indexed a different property from the one you filter on.** An index on `email` does nothing for a query filtering on `name`.
2. **Your predicate can't use that index type.** `CONTAINS` against a range index is the classic. The index exists, the planner looks at it, and correctly concludes it can't help.
3. **You wrapped the property in a function.** `WHERE toLower(e.email) = 'x'` can't use an index on `e.email`, because the index stores the original values, not the lowercased ones. Store a normalised copy of the property and index that instead.
4. **You didn't give the node a label.** Indexes are defined on a label. `MATCH (n) WHERE n.email = ...` has no label to work with, which is exactly why the first example above scanned every node in the database.

---

## Constraints, and the Trap That Will Catch You

An index makes lookups fast. A **constraint** makes a rule impossible to break. They're different jobs, and the reason they get discussed together is that in Neo4j one of them quietly does the other.

Every `MERGE` has to check whether a matching node already exists. Without an index, that check scans every node carrying the label.

On a thousand nodes you won't notice. At a hundred thousand your import will crawl, and the reason won't be obvious because nothing is broken. It's simply doing an enormous amount of unnecessary work.

Create a uniqueness constraint on the property you merge on. It enforces correctness and creates the supporting index at the same time.

![Constraint Effect](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943247840/6b9f5808-3267-4998-aaab-f59c65c3e0ef.png)

Here we have two runs of the same existence check, before and after a constraint. Without one, answering "does this engineer already exist" means reading every Engineer node and comparing the email, keeping one match and discarding the rest, then doing it all again for the next row. The plan shows `NodeByLabelScan`. With a uniqueness constraint the database creates a supporting index, so it goes straight to the node or straight to nothing and never looks at the others. The plan shows `NodeUniqueIndexSeek`.

At a thousand nodes you won't notice. At a hundred thousand the import crawls and nothing in the output explains why. The cost is the same either way, so there is no reason to skip it.

To check what yours is doing, put PROFILE in front of the query and look at the bottom operator. `NodeByLabelScan` on a starting node almost always means a missing index, and it's the single most common finding in a slow Cypher query.

You can prove the second half of that sentence rather than take my word for it:

```cypher
SHOW INDEXES YIELD name, type, owningConstraint
WHERE owningConstraint IS NOT NULL
RETURN name, type, owningConstraint
```

```plaintext
name             type     owningConstraint
engineer_email   RANGE    engineer_email
incident_ref     RANGE    incident_ref
service_name     RANGE    service_name
team_name        RANGE    team_name
```

Four constraints, four range indexes created automatically, each owned by its constraint. This is why the loading script in this article never creates those indexes separately: doing so would be redundant, and Neo4j would reject it as a conflict.

Neo4j offers four kinds of constraint:

| Constraint | Enforces |
| --- | --- |
| `IS UNIQUE` | No two nodes with this label share this property value |
| `IS NOT NULL` | The property must be present |
| `IS NODE KEY` | Both of the above, over one or more properties together |
| `IS :: TYPE` | The property must be of a given type, such as `STRING` |

**Here's the trap:** only the first one works on Neo4j Community Edition, which is what you get from the Docker image in this article. The other three are Enterprise features. Aura runs Enterprise, so they work there.

That means the same script can succeed against Aura and fail against your local Docker container, which is a genuinely confusing thing to hit when you are learning. This is what it looks like:

```plaintext
Neo.DatabaseError.Schema.ConstraintCreationFailed
Unable to create Constraint( type='NODE PROPERTY EXISTENCE', schema=(:Engineer {name}) ):
Property existence constraint requires Neo4j Enterprise Edition
```

That's not your mistake. It's an edition limit, and the message says so if you read to the end of the line.

![Constraint Editions](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943250520/20bcc7a4-5d0d-46a5-9e2d-1bc1840fa8a3.png)

`IS UNIQUE` works on Community Edition, which is what the Docker image in this handbook gives you, and it also creates the backing index. The figure lists three others that Community refuses: `IS NOT NULL` for property existence, `IS NODE KEY` for unique-and-present across one or more properties, and a property type constraint such as requiring a STRING. All three need Enterprise.

Aura runs Enterprise, so the same script can succeed there and fail on your laptop. That isn't your mistake, and the refusal says so if you read to the end: `Neo.DatabaseError.Schema.ConstraintCreationFailed`, followed by the words Enterprise Edition.

Everything in this handbook uses only `IS UNIQUE`, so all of it runs on Community.

```cypher
CREATE CONSTRAINT engineer_email IF NOT EXISTS
FOR (e:Engineer) REQUIRE e.email IS UNIQUE
```

Do this **before** you load, not after.

For properties you filter on frequently but which aren't unique, create a plain index:

```cypher
CREATE INDEX service_tier IF NOT EXISTS
FOR (s:Service) ON (s.tier)
```

A sensible starting set for our model:

```cypher
CREATE CONSTRAINT engineer_email IF NOT EXISTS FOR (e:Engineer) REQUIRE e.email IS UNIQUE;
CREATE CONSTRAINT service_name  IF NOT EXISTS FOR (s:Service)  REQUIRE s.name  IS UNIQUE;
CREATE CONSTRAINT incident_ref  IF NOT EXISTS FOR (i:Incident) REQUIRE i.ref   IS UNIQUE;
CREATE CONSTRAINT team_name     IF NOT EXISTS FOR (t:Team)     REQUIRE t.name  IS UNIQUE;
```

Run these from Python once at setup time:

```py
CONSTRAINTS = [
    "CREATE CONSTRAINT engineer_email IF NOT EXISTS FOR (e:Engineer) REQUIRE e.email IS UNIQUE",
    "CREATE CONSTRAINT service_name  IF NOT EXISTS FOR (s:Service)  REQUIRE s.name  IS UNIQUE",
    "CREATE CONSTRAINT incident_ref  IF NOT EXISTS FOR (i:Incident) REQUIRE i.ref   IS UNIQUE",
    "CREATE CONSTRAINT team_name     IF NOT EXISTS FOR (t:Team)     REQUIRE t.name  IS UNIQUE",
]

for statement in CONSTRAINTS:
    driver.execute_query(statement, database_="neo4j")
```

`IF NOT EXISTS` makes that block safe to run on every startup.

---

## What the Planner Does With Your Query

Cypher is a declarative language. You describe the shape of the answer you want, and you never say how to find it. That's a real convenience, and it has one consequence worth understanding: something has to decide how.

That something is the **query planner**.

When you send a query, Neo4j parses it, then considers the different ways it could be executed. For our multi-hop query it could start from the incident and walk out to the engineers, or start from all the engineers and walk in towards the incident. Both produce identical results. One touches a handful of nodes and the other touches fifty thousand.

The planner picks between them using **statistics** it keeps about your data: how many nodes carry each label, how many relationships of each type exist, and how many distinct values a given indexed property has. From those it estimates how many rows each possible step would produce, and chooses the plan with the lowest estimated cost. This is why it is called a cost-based planner, and why the header of every plan says `Planner COST`.

![Planner Pipeline](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943253280/c1482f32-db21-4249-80f2-f3234d4415e9.png)

Cypher is declarative, so you never say how to find anything. Something still chooses, and that choice is where fast and slow are decided. A query plan is that decision, written down.

The important consequence for you: **the planner is guessing.** Educated guessing, from real statistics, but guessing. When its guess is badly wrong, you get a slow query, and the plan is where you can see that happening.

### EXPLAIN and PROFILE

Two keywords let you see the plan, and the difference between them matters.

`EXPLAIN` **plans the query without running it.** You get the operators the planner chose and its row estimates. Nothing is executed, nothing is read, and no data is changed. It costs essentially nothing, so you can use it on a query you suspect might run for an hour.

`PROFILE` **plans the query and then runs it.** You get everything `EXPLAIN` gives you plus what actually happened: real row counts and real database hits per operator.

Here's the same query both ways.

```cypher
EXPLAIN MATCH (e:Engineer)-[:OWNS]->(s:Service {tier:'critical'}) RETURN count(e) AS c
```

```plaintext
operator               details                       est   rows   dbHits
ProduceResults         c                               1      ?        ?
  EagerAggregation     count(e) AS c                   1      ?        ?
    Filter             e:Engineer                   2401      ?        ?
      Expand(All)      (s)<-[anon_0:OWNS]-(e)       2401      ?        ?
        Filter         s.tier = $autostring_0        250      ?        ?
          NodeByLabelScan  s:Service                5000      ?        ?
```

Every `rows` and `dbHits` value is a question mark, because nothing ran. Now with `PROFILE`:

```plaintext
operator               details                       est   rows   dbHits
ProduceResults         c                               1      1        0
  EagerAggregation     count(e) AS c                   1      1        0
    Filter             e:Engineer                   2401   7573     7573
      Expand(All)      (s)<-[anon_0:OWNS]-(e)       2401   7573    17871
        Filter         s.tier = $autostring_0        250    786     5000
          NodeByLabelScan  s:Service                5000   5000     5001
```

![Explain vs Profile](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943255710/52a4ec28-a29e-4b43-ab9a-67e73da2898a.png)

EXPLAIN plans it, PROFILE runs it. Operators and estimates are identical because the planner decided the same either way. What EXPLAIN can't give you is what actually happened, which is the number you need when the estimate was wrong.

Use `EXPLAIN` when you want to know what the database intends to do, or when running the query would be expensive or destructive. Use `PROFILE` when you want to know what it actually did.

`EXPLAIN` has a second use that's worth more than it sounds: it parses and plans without touching data, so it is the fastest possible check that a query is even valid. You can run every Cypher string in your codebase through `EXPLAIN` as a test, and catch typos and renamed properties before they reach production.

That's exactly what the <VPIcon icon="fa-brands fa-python"/>`check_cypher.py` script in the [companion repository (<VPIcon icon="iconfont icon-github"/>`ronidas39/knowledge-graph-python-neo4j`)](https://github.com/ronidas39/knowledge-graph-python-neo4j) does: it pulls every Cypher block out of this article, 39 of them, runs each through `EXPLAIN`, and fails if a single one is invalid.

### Reading a Plan: Start at the Bottom

This is the single thing that makes plans readable, and it's the opposite of what most people assume.

**A query plan is read from the bottom up.** The bottom row is the leaf operator, where data enters. Each row above it receives rows from the row below, does something to them, and passes the result upward. The top row, always `ProduceResults`, is where the answer leaves the database.

So in the plan above, reading it the right way round:

1. `NodeByLabelScan` reads all 5,000 services. This is the leaf: it's where rows come from.
2. `Filter` keeps only the critical ones, 786 of the 5,000.
3. `Expand(All)` follows `OWNS` backwards from each of those to the engineers, producing 7,573 rows.
4. `Filter` checks that each is really an `Engineer`.
5. `EagerAggregation` counts them.
6. `ProduceResults` hands back the single number.

![Plan Read Bottom Up](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943257995/b90fdb81-ca67-4328-8eff-122d080087ea.png)

A plan is read from the bottom up. The bottom row is where rows enter, and each row above receives them, changes them and passes them on, up to `ProduceResults`. Reading it top down is why plans look like noise at first.

Indentation shows the parent and child relationship. An operator's children sit one level deeper than it does. Most operators have exactly one child. A few, like joins, have two, and their right-hand input is shown first and indented deeper.

### What the Columns Mean

| Column | What it tells you |
| --- | --- |
| **Operator** | The kind of work being done: a scan, a seek, an expand, a filter |
| **Id** | A stable number for cross-referencing within this plan |
| **Details** | The specific thing: which label, which pattern, which predicate |
| **Estimated Rows** | How many rows the planner *thought* this step would produce |
| **Rows** | How many it *actually* produced. `PROFILE` only |
| **DB Hits** | How much work the storage engine did. `PROFILE` only |
| **Memory (Bytes)** | Peak memory for this operator. `PROFILE` only |
| **Page Cache Hits/Misses** | How often data was found in memory instead of on disk |

Two of these are misread often enough to be worth spelling out.

**DB hits aren't rows.** A database hit counts low-level accesses in the storage engine: reading a node, reading a property, or reading an index entry. A single returned row can cost many hits. Look again at the `Expand(All)` line above: 7,573 rows, 17,871 hits. The row count is your result size, the hit count is the price you paid for it.

**Page cache hits and misses show whether the data was in memory.** A miss means the database had to go to disk. On a first run against cold data you'll see mostly misses, and on a second run mostly hits, which is why comparing timings between a cold and a warm run tells you nothing useful. This column is an Enterprise Edition feature, so on the Community Docker image in this article it reads `0/0` throughout. That's not a bug and it doesn't mean your cache is empty.

### The Most Useful Thing in the Whole Plan

Compare **Estimated Rows** against **Rows**.

The estimate is what the planner believed when it chose this plan. The row count is the truth. When they're close, the planner made its decision with a good picture of your data. When they diverge badly, it chose a plan for a dataset that doesn't exist, and that's very often the real reason a query is slow.

Look at the numbers from the profile above:

| Operator | Estimated | Actual | Off by |
| --- | --- | --- | --- |
| `NodeByLabelScan` | 5,000 | 5,000 | correct |
| `Filter` on `tier` | 250 | 786 | 3.1x under |
| `Expand(All)` | 2,401 | 7,573 | 3.2x under |

The planner guessed that filtering services down to the critical ones would leave 250 of 5,000. In our data it leaves 786, because roughly 15% of services are critical rather than the 5% its default assumption implies. That error then flows upward: because it expected 250 services it expected about 2,401 engineers, and got 7,573. Here the consequence is harmless. On a bigger query, a three-fold underestimate at the bottom of a plan is exactly how the planner talks itself into a strategy that falls apart, because it believed it was joining a small thing to a big thing when it was really joining two big things.

![Estimated vs Actual](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943260911/c197f4b6-3fba-40f4-aabe-c8e1ed9fcae3.png)

Estimated Rows is what the planner believed when it chose this plan. Rows is what happened. Where they diverge is usually where a slow query is explained, because the planner optimised for a shape the data didn't have.

If estimates are consistently wrong across your queries, the statistics behind them may be stale.

**So the habit worth building is:** run `PROFILE`, read from the bottom, and check the estimate against the truth at every step. You aren't looking for a big number. You're looking for the first place the planner was surprised.

### Three Tells Worth Recognising

![Profile Plan](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943263531/1567ddd5-ad42-48d4-9f41-242d1a0b0ff9.png)

This is PROFILE output in Neo4j Browser, showing the operator chain with estimated and actual row counts beside each step. This is the real output the `NodeUniqueIndexSeek` explanation refers to.

Beyond the estimate check, three specific things in a plan should catch your eye.

![Plan Tells](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943266391/78671cc3-1f92-4d7b-9bd0-f4570a71069c.png)

What specific operators tell you when you see them. `NodeByLabelScan` on a starting node means no index is being used. Each entry pairs the symptom with the cause and the fix.

`NodeByLabelScan` means the database read every node with that label. On a starting node this almost always means a missing index. It's the single most common finding.

**A row count that explodes and then collapses:** if one step produces two hundred thousand rows and the next reduces it to forty, you're generating work and throwing it away. Usually the pattern can be reordered so the selective part happens first.

`CartesianProduct` means two parts of your pattern aren't connected, so the database is combining every row on the left with every row on the right. It's nearly always an accident, and it's nearly always the reason a query went from milliseconds to minutes.

All three have the same shape as a fix: give the planner a cheaper way in. An index turns a scan into a seek, a reordered pattern makes the selective step happen first, and a missing relationship in the pattern removes the cartesian product.

---

## Six Problems You'll Actually Hit

These are the ones that cost people an afternoon. None of them produce an obvious error message, which is exactly why they're worth listing.

### The Query Returns Nothing and You Expected Rows

Check your arrow directions first. `(a)-[:OWNS]->(b)` and `(a)<-[:OWNS]-(b)` are different questions, and the second one is what you want when you're starting from the thing that's owned. If you're unsure, drop the arrowheads entirely and use `-[:OWNS]-`, which matches either direction. If rows appear, direction was the problem.

### The Query Returns Fewer Rows Than the Truth

This is the relationship uniqueness trap from earlier in this handbook. If a pattern leaves a node and comes back to the same kind of node, and both halves could be the same relationship, Cypher discards those matches without a word. Split the pattern with `WITH`.

### A Query That Was Instant is Suddenly Slow

Look for `CartesianProduct` in `PROFILE`. It means two parts of your pattern aren't connected to each other, so every row on the left is being combined with every row on the right. Usually a variable was forgotten, or two `MATCH` clauses were written where one pattern was meant.

### MERGE Created a Duplicate

You merged on more than the identifying property. `MERGE (e:Engineer {email: $email, name: $name})` treats a changed name as a different node. Merge on identity, then `SET` the rest.

### MERGE is Unbearably Slow

You have no index on the property you merge on, so every merge scans every node with that label. Create the constraint before loading, not after.

### The Whole Import Ran Out of Memory

You put everything in one transaction. Batch it. A few thousand rows per transaction is a sane default, and `CALL { ... } IN TRANSACTIONS` lets Cypher do the batching for you inside a single query.

Here's a short checklist worth keeping next to you:

| Symptom | First thing to check |
| --- | --- |
| No rows | Arrow direction |
| Too few rows | Relationship uniqueness, split with `WITH` |
| Sudden slowness | `PROFILE` for `CartesianProduct` |
| Duplicate nodes | Merging on more than the identity |
| Slow `MERGE` | Missing constraint or index |
| Out of memory | One giant transaction |

---

## Transactions and What Happens When Things Fail

`execute_query` wraps each call in its own transaction and retries it automatically if it hits a transient error such as a leader election in a cluster. For the majority of work, that's exactly what you want and you don't need to think about it.

Here's what actually happens across the driver, the session and the database, including the case everyone worries about: a write that fails halfway.

![Transaction Lifecycle](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943270013/1636e385-6717-4a1c-a397-a1eb77ec6c24.png)

From your code through the driver and session to Neo4j. One driver per application with `GraphDatabase.driver(uri, auth)`, then a session per unit of work. The session is cheap and short-lived, the driver expensive and long-lived, and swapping those round is a common cause of slow applications.

The important part is the middle. Once a transaction begins, nothing it has written is visible or durable until it commits. A failure at step nine doesn't leave you with half a graph, it leaves you with the graph you started with.

When you need several statements to succeed or fail together, manage the transaction yourself:

```py
def reassign_service(tx, service, from_email, to_email):
    tx.run(
        """
        MATCH (:Engineer {email: $from_email})-[r:OWNS]->(s:Service {name: $service})
        DELETE r
        """,
        from_email=from_email, service=service,
    )
    tx.run(
        """
        MATCH (e:Engineer {email: $to_email}), (s:Service {name: $service})
        MERGE (e)-[:OWNS {since: date()}]->(s)
        """,
        to_email=to_email, service=service,
    )

with driver.session(database="neo4j") as session:
    session.execute_write(reassign_service, "payments", "ada@example.com", "grace@example.com")
```

`execute_write` runs your function inside one transaction. If any statement raises, the whole thing rolls back and the graph is left as it was. It also retries the function on transient failures, which is why the work goes in a function rather than inline: it may be executed more than once, so it must be safe to repeat.

That last point is worth saying plainly: **any function you hand to** `execute_write` **must be idempotent**, which means running it twice has the same effect as running it once. A retry starts your function again from the top, so anything that increments a counter or appends to a list will do it twice. This is another reason to reach for `MERGE` rather than `CREATE` inside one.

---

## Testing Code That Talks to a Graph

Graph code is easy to write and easy to get subtly wrong, as the relationship uniqueness trap earlier in this handbook showed. Tests are how you find that class of bug once rather than repeatedly.

### Don't Mock the Database

The temptation is to mock the driver and assert that your function called it with a particular string. Resist it. That test passes when your Cypher is wrong, which is precisely the failure you need to catch. The bugs in graph code are almost never in the Python around the query. They're in the query.

Run tests against a real Neo4j. It starts in seconds in Docker, and the whole point is to exercise the query engine.

### Give Each Test a Clean Graph

```py
import os
import pytest
from neo4j import GraphDatabase

@pytest.fixture(scope="session")
def driver():
    d = GraphDatabase.driver(
        os.environ.get("NEO4J_TEST_URI", "bolt://localhost:7687"),
        auth=("neo4j", os.environ["NEO4J_TEST_PASSWORD"]),
    )
    d.verify_connectivity()
    yield d
    d.close()

@pytest.fixture(autouse=True)
def clean(driver):
    """Wipe before every test so tests cannot leak into each other."""
    driver.execute_query("MATCH (n) DETACH DELETE n", database_="neo4j")
```

The driver is created once for the whole session, because it's expensive. The wipe runs before every test, because a test that depends on another test's leftovers will pass alone and fail in a suite.

### Test the Thing That Actually Broke

A useful test is one that would have caught a real bug. Here's the one for the trap from earlier:

```py
def test_teams_includes_a_team_whose_only_member_is_the_owner(driver):
    driver.execute_query(
        """
        MERGE (e:Engineer {email: 'linus@example.com'}) SET e.name = 'Linus'
        MERGE (s:Service {name: 'checkout'})
        MERGE (t:Team {name: 'Commerce'})
        MERGE (i:Incident {ref: 'INC-1'})
        MERGE (e)-[:OWNS]->(s)
        MERGE (e)-[:MEMBER_OF]->(t)
        MERGE (i)-[:AFFECTS]->(s)
        """,
        database_="neo4j",
    )

    teams = teams_involved(driver, "INC-1")

    # The single-pattern version returns [] here, with no error at all.
    assert [t["team"] for t in teams] == ["Commerce"]
```

That test is worth more than a dozen tests of your Python. It encodes a specific, silent, hard-to-spot failure, and it will fail loudly if anyone ever "simplifies" the query back into one pattern.

### Assert on Counts as Well as Contents

Silent under-fetching is the characteristic graph bug, so assert how many rows you got, not only that the ones you got look right:

```py
def test_load_is_idempotent(driver):
    load(driver)
    _, summary, _ = driver.execute_query(
        "MATCH (e:Engineer) RETURN count(e) AS c", database_="neo4j"
    )
    first = driver.execute_query("MATCH (e:Engineer) RETURN count(e) AS c", database_="neo4j")[0][0]["c"]

    load(driver)   # run it again
    second = driver.execute_query("MATCH (e:Engineer) RETURN count(e) AS c", database_="neo4j")[0][0]["c"]

    assert first == second, "loading twice created duplicates, so a MERGE key is wrong"
```

That single assertion catches the most expensive loading mistake there is, which is merging on more than the identifying property.

The same graph, seen as a data model in Neo4j Browser against the live Aura instance:

![Data Model](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943272688/17cd6c67-22bb-4049-9095-2ef5916a558f.png)

`CALL db.schema.visualization()` running in the Aura console, which draws the shape of whatever is currently in the database. It shows four node labels, `Engineer`, `Incident`, `Service` and `Team`, joined by four relationship types: an incident `AFFECTS` a service, a service `DEPENDS_ON` another service, an engineer `OWNS` a service, and an engineer is a `MEMBER_OF` a team. The property keys in use are `email`, `name`, `ref` and `summary`.

This is the same model you built locally, running on the managed service, and it's a quick way to check that a load did what you expected.

---

## From Graph to Knowledge Graph

Everything so far has been a graph database. A **knowledge graph** is what you get when the nodes represent real entities from your domain and the relationships represent meaningful facts about them, so that the graph itself is a model of what you know.

The step up from one to the other is mostly about where the data comes from. Instead of loading rows from a table, you extract entities and relationships from documents, tickets, wikis, code, or conversations.

The mechanics you've already learned don't change:

```py
def add_fact(driver, subject, predicate_service, source_doc):
    driver.execute_query(
        """
        MERGE (e:Engineer {email: $subject})
        MERGE (s:Service {name: $service})
        MERGE (e)-[r:OWNS]->(s)
          ON CREATE SET r.source = $source, r.extracted = datetime()
        """,
        subject=subject, service=predicate_service, source=source_doc,
        database_="neo4j",
    )
```

Notice `r.source`. When facts are extracted rather than entered, **recording where each fact came from isn't optional**. You'll need it the first time somebody asks why the graph believes something, and you'll need it when a source document is corrected and you have to find everything derived from it.

Two habits make extracted graphs survivable:

- **Store provenance on the relationship.** Which document, which version, when.
- **Keep extraction idempotent.** Re-running over the same document must not duplicate facts, which is exactly what `MERGE` on an identifying property gives you.

---

## Why AI Systems Keep Rediscovering Graphs

This is the part that makes graphs suddenly relevant to people who have never touched one.

The standard way to give a language model access to your data is to embed your documents as vectors and retrieve the chunks most similar to the question. This works well, and it fails in a specific and predictable way.

Similarity retrieval can tell you that two things are related. It can't tell you how.

![Vector vs Graph](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943275441/b6277b72-99cc-4f1c-b55e-6a1037e21ae6.png)

This is why neither retrieval method is enough alone, and what order to combine them in.

Vector search alone finds four documents that are each related to the question and none of which contain the answer. The chain from incident to service to owner to team spans all four, so no single chunk holds it and nothing scores highly enough to be retrieved together.

Graph traversal alone is exact once it starts: hop one goes from the incident to payments and checkout, hop two to Ada and Grace, hop three to the Platform team. The problem is starting, because "last night's payments incident" is a phrase, not a node, and the graph has never seen that wording.

Used together, in order: embed the question and find which entities it's about, which handles wording the graph has never seen. Traverse out from those entities, where relationships are stored so the chain is read rather than inferred. Hand back a small, precise set of facts with their provenance instead of five paragraphs of loosely related prose.

Similarity search can tell you that two things are related. It can't tell you how, which is why these answers degrade into confident guesses exactly when the reasoning gets interesting.

Ask "who should I talk to about last night's payments incident" and a vector store returns the chunks that look most like that sentence. It has no representation of the fact that the incident affected a service, that the service is owned by an engineer, and that the engineer is on a team. Each of those facts might live in a different document, and no single chunk contains the chain.

A graph stores the chain explicitly. Multi-hop questions become traversals, and the answer is derived rather than guessed.

The two aren't rivals, and treating them as rivals is a mistake. The pattern that works in practice is to use both:

| Job | Best tool | Why |
| --- | --- | --- |
| Find the entry point from fuzzy language | Vector search | Handles wording the graph has never seen |
| Traverse from that entry point to related facts | Graph | Relationships are stored, not inferred |
| Answer "what is connected to what, and how" | Graph | Paths are the query |
| Answer "what does this passage say" | Vector search | The text is the answer |

In practice the pattern is: embed the text, use similarity to work out **which entities** the question is about, then traverse the graph from those entities to assemble the context you hand to the model.

Neo4j can hold the vectors too, which keeps both halves in one place. You create a vector index over a property holding the embedding:

```cypher
CREATE VECTOR INDEX service_notes IF NOT EXISTS
FOR (s:Service) ON (s.embedding)
OPTIONS {indexConfig: {
  `vector.dimensions`: 1536,
  `vector.similarity_function`: 'cosine'
}}
```

Then the hybrid query becomes one round trip: similarity finds the entry points, and the traversal does the rest.

```py
def context_for_question(driver, question_embedding, k=3):
    records, _, _ = driver.execute_query(
        """
        // 1. vector search finds the services the question is about
        CALL db.index.vector.queryNodes('service_notes', $k, $embedding)
        YIELD node AS s, score

        // 2. the graph supplies what similarity cannot: how things connect
        OPTIONAL MATCH (s)<-[:OWNS]-(owner:Engineer)-[:MEMBER_OF]->(t:Team)
        OPTIONAL MATCH (s)<-[:AFFECTS]-(i:Incident)
        RETURN s.name AS service, score,
               collect(DISTINCT owner.name) AS owners,
               collect(DISTINCT t.name)     AS teams,
               collect(DISTINCT i.ref)      AS incidents
        ORDER BY score DESC
        """,
        embedding=question_embedding, k=k, database_="neo4j",
    )
    return [dict(r) for r in records]
```

Read what each half contributes. The vector index answers "which services does this question seem to be about", which a graph alone can't do because the user's wording won't match your node names.

The traversal then answers "who owns them, which teams, what broke recently", which similarity alone can't do because those facts live in different documents and no single chunk contains the chain.

The result you hand the model is a small, precise set of connected facts rather than five paragraphs of loosely related prose. That's usually the difference between an answer and a plausible guess.

::: note A note on honesty in the output

Because every fact came out of the graph, you can cite it. Passing the relationship provenance along with the facts lets the model say where each claim came from, and lets you check it when it gets one wrong.

:::

The same argument explains why durable memory for AI agents keeps ending up shaped like a graph.

![Agent Memory Graph](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943278708/fca8d9a1-5c17-46a7-91de-4cd7866ce6cb.png)

The example is three notes. `note-03` says "We decided to use Mongo for payments", `note-09` says "Mira moved payments onto Postgres", `note-14` says "Payments storage reviewed, no action". Ask "what database does payments use" and, as loose text, all three look equally relevant, so the agent picks one.

Drawn as a graph, the newer Decision node `use Postgres` has a `SUPERSEDES` edge pointing at the Mongo decision and an `APPLIES_TO` edge pointing at the payments Service. The ordering that was invisible in prose is now a stored fact the agent can follow.

An agent that remembers needs to know that a decision was made, who made it, what it superseded, and what depends on it. Those are relationships with direction and properties. Storing them as loose text and hoping similarity search reconstructs them is how agents end up confidently contradicting themselves.

None of this requires new skills. It's the same modeling discipline from earlier in this handbook, applied to facts extracted from text instead of rows from a table. Which is why the modeling section is the one worth re-reading.

---

## Building a Knowledge Graph from Text

So far every fact arrived as a tidy Python dictionary. Real knowledge graphs are usually built from prose: incident write-ups, wiki pages, tickets, commit messages, and support threads.

The extraction step is where people either build something durable or build a mess. Three rules keep it durable, and here's where each of them sits in the pipeline:

![Ingestion Pipeline](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943281113/e7348bd7-2004-47ce-b4aa-a68f96791604.png)

Raw text goes to an extractor, which produces candidate entities and relationships, which are merged into the graph. The stages are separable, which matters because the extractor is the part you'll swap and re-run.

Notice where the gate is. The schema check happens **before** anything is written, not after. Once an invented relationship type is in the graph it's indistinguishable from a real one, and you'll be cleaning it up by hand.

### Rule #1: Extract into a Fixed Schema, Not a Free-for-All

If you let an extractor invent relationship types, you'll end up with `OWNS`, `owns`, `IS_OWNER_OF` and `RESPONSIBLE_FOR` all meaning the same thing, and no query will ever find all four.

Decide your vocabulary first, and make the extractor choose from it:

```py
NODE_LABELS = ["Engineer", "Service", "Incident", "Team"]
REL_TYPES = ["OWNS", "AFFECTS", "MEMBER_OF", "DEPENDS_ON"]
```

Whatever does the extraction (a language model, a regex, or a human), its job is to emit triples that use only those names. Anything else gets rejected rather than written.

### Rule #2: Every Extracted Fact Carries its Source

![Extraction Provenance](https://cdn.hashnode.com/res/hashnode/image/upload/v1786943283291/d5254326-f4eb-45d5-a6a1-148d42f7c0f9.png)

Three stages, left to right: documents go in, extraction emits triples using a fixed vocabulary, and the merge records where each fact came from.

The detail the drawing turns on is the split between `ON CREATE` and `ON MATCH`. The source is written once, when the fact is first created, while the freshness timestamp updates every time the same fact is seen again. That way re-running over the same document doesn't overwrite the original provenance.

It pays off when a document turns out to be wrong, because matching on the source property lets you retract every fact that came from it in one query. The step people skip is the confidence score: store it, then actually use it downstream, because a guess at 0.4 must not read as a confirmed fact.

When a human types data in, you can ask them. When a machine extracts it, you can't, and someone will eventually ask "why does the graph think Ada owns checkout?"

```py
def write_triple(driver, subject_email, rel_type, object_name, source_doc, confidence):
    if rel_type not in REL_TYPES:
        raise ValueError(f"refusing unknown relationship type: {rel_type}")

    driver.execute_query(
        f"""
        MERGE (e:Engineer {{email: $subject}})
        MERGE (s:Service {{name: $object}})
        MERGE (e)-[r:{rel_type}]->(s)
          ON CREATE SET r.source = $source,
                        r.confidence = $confidence,
                        r.extracted_at = datetime()
          ON MATCH  SET r.last_seen = datetime()
        """,
        subject=subject_email, object=object_name,
        source=source_doc, confidence=confidence,
        database_="neo4j",
    )
```

Two things about that snippet deserve a warning.

The relationship type is the **one** thing in Cypher you can't pass as a parameter. `-[r:$type]->` isn't valid, which is why it's interpolated into the string.

That's exactly the pattern that causes injection bugs, so the `if rel_type not in REL_TYPES` check above it is not decoration. It's the only thing making the interpolation safe. Never build that string from raw model output without checking it against a fixed list first.

`ON CREATE` and `ON MATCH` let you record provenance once and freshness every time, which means re-running extraction over the same document does not overwrite the original source.

### Rule #3: make Re-extraction Safe

You will re-run extraction. Documents get corrected, your prompt improves, or a bug gets fixed. If a second run duplicates everything, the graph is worthless.

Because every write above is a `MERGE` on an identifying property, re-running is safe by construction. That's the same idempotency property from the loading section, and it matters far more here.

To retract facts from a document that has changed:

```cypher
MATCH ()-[r]->()
WHERE r.source = $source_doc
DELETE r
```

Then re-extract. Deleting by source is only possible because you stored the source, which is the whole argument for rule two.

### A Caution on Confidence

If your extractor emits a confidence score, store it, and then **actually use it**. A graph that mixes facts a human confirmed with facts a model guessed at 0.4 confidence, and treats them identically at query time, will produce confident wrong answers.

```cypher
MATCH (e:Engineer)-[r:OWNS]->(s:Service)
WHERE r.confidence IS NULL OR r.confidence > 0.8
RETURN e.name, s.name
```

`r.confidence IS NULL` keeps the hand-entered facts, which have no score because nobody guessed them.

---

## The Complete Script

Here's everything from this handbook as one runnable file. It creates the constraints, loads the data, and answers the question from the introduction. If you've followed along, this is the whole thing in one place.

```py :collapsed-lines
"""A minimal knowledge graph, end to end."""

import os
from neo4j import GraphDatabase

URI = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
AUTH = (
    os.environ.get("NEO4J_USER", "neo4j"),
    os.environ["NEO4J_PASSWORD"],
)

CONSTRAINTS = [
    "CREATE CONSTRAINT engineer_email IF NOT EXISTS FOR (e:Engineer) REQUIRE e.email IS UNIQUE",
    "CREATE CONSTRAINT service_name  IF NOT EXISTS FOR (s:Service)  REQUIRE s.name  IS UNIQUE",
    "CREATE CONSTRAINT incident_ref  IF NOT EXISTS FOR (i:Incident) REQUIRE i.ref   IS UNIQUE",
    "CREATE CONSTRAINT team_name     IF NOT EXISTS FOR (t:Team)     REQUIRE t.name  IS UNIQUE",
]

PEOPLE = [
    {"email": "ada@example.com",   "name": "Ada Okonjo",   "service": "payments", "team": "Platform"},
    {"email": "grace@example.com", "name": "Grace Lin",    "service": "payments", "team": "Platform"},
    {"email": "linus@example.com", "name": "Linus Berg",   "service": "checkout", "team": "Commerce"},
    {"email": "mira@example.com",  "name": "Mira Haddad",  "service": "auth",     "team": "Platform"},
    {"email": "tom@example.com",   "name": "Tom Ferreira", "service": "search",   "team": "Discovery"},
]

# One engineer who owns nothing, so the OPTIONAL MATCH example has something to
# show. Without her, that query looks identical to a plain MATCH.
UNASSIGNED = {"email": "nadia@example.com", "name": "Nadia Rossi"}

# Service dependencies, which the variable length path example walks.
DEPENDENCIES = [
    {"upstream": "auth",     "downstream": "payments"},
    {"upstream": "auth",     "downstream": "checkout"},
    {"upstream": "payments", "downstream": "checkout"},
    {"upstream": "search",   "downstream": "checkout"},
]

INCIDENT = {"ref": "INC-4471", "summary": "Elevated 5xx on card capture",
            "services": ["payments", "checkout"]}


def setup(driver):
    """Constraints first. They enforce correctness and create the indexes
    that stop MERGE from scanning every node."""
    for statement in CONSTRAINTS:
        driver.execute_query(statement, database_="neo4j")


def load(driver):
    """People and teams, then the unassigned engineer, then dependencies,
    then the incident. Four round trips for the whole dataset."""
    driver.execute_query(
        """
        UNWIND $rows AS row
        MERGE (e:Engineer {email: row.email})
          SET e.name = row.name
        MERGE (s:Service {name: row.service})
        MERGE (t:Team {name: row.team})
        MERGE (e)-[:OWNS]->(s)
        MERGE (e)-[:MEMBER_OF]->(t)
        """,
        rows=PEOPLE, database_="neo4j",
    )
    driver.execute_query(
        "MERGE (e:Engineer {email: $email}) SET e.name = $name",
        **UNASSIGNED, database_="neo4j",
    )
    driver.execute_query(
        """
        UNWIND $rows AS row
        MATCH (u:Service {name: row.upstream}), (d:Service {name: row.downstream})
        MERGE (d)-[:DEPENDS_ON]->(u)
        """,
        rows=DEPENDENCIES, database_="neo4j",
    )
    driver.execute_query(
        """
        MERGE (i:Incident {ref: $ref}) SET i.summary = $summary
        WITH i
        UNWIND $services AS svc
        MATCH (s:Service {name: svc})
        MERGE (i)-[:AFFECTS]->(s)
        """,
        **INCIDENT, database_="neo4j",
    )


def who_has_context(driver, ref):
    """The question from the introduction, in one pattern."""
    records, _, _ = driver.execute_query(
        """
        MATCH (i:Incident {ref: $ref})-[:AFFECTS]->(:Service)<-[:OWNS]-(e:Engineer)
        RETURN DISTINCT e.name AS name, e.email AS email
        ORDER BY name
        """,
        ref=ref, database_="neo4j",
    )
    return [dict(r) for r in records]


def teams_involved(driver, ref):
    """Split into two patterns on purpose. A single pattern would hit the
    relationship uniqueness rule and silently drop any team whose only
    member is also the owner."""
    records, _, _ = driver.execute_query(
        """
        MATCH (i:Incident {ref: $ref})-[:AFFECTS]->(:Service)<-[:OWNS]-(:Engineer)-[:MEMBER_OF]->(t:Team)
        WITH DISTINCT t
        MATCH (t)<-[:MEMBER_OF]-(e:Engineer)
        RETURN t.name AS team, collect(e.name) AS members
        ORDER BY team
        """,
        ref=ref, database_="neo4j",
    )
    return [dict(r) for r in records]


def main():
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        driver.verify_connectivity()
        setup(driver)
        load(driver)

        print("Engineers with context on INC-4471:")
        for row in who_has_context(driver, "INC-4471"):
            print(f"  {row['name']:<14} {row['email']}")

        print("\nTeams involved:")
        for row in teams_involved(driver, "INC-4471"):
            print(f"  {row['team']:<10} {', '.join(row['members'])}")


if __name__ == "__main__":
    main()
```

Run it with your password in the environment rather than in the file:

```sh
export NEO4J_PASSWORD='your-password'
python3 knowledge_graph.py
```

Note `os.environ["NEO4J_PASSWORD"]` with square brackets rather than `.get()`. That's deliberate. It fails loudly at startup if the variable is missing, instead of quietly trying to connect with `None` and giving you a confusing authentication error.

---

## Where to Go Next

You now have the pieces that matter: a data model you can defend, a loading script that's safe to re-run, queries that traverse instead of joining, indexes that keep them fast, and a way to find out why something is slow.

Here are three suggestions for what to do with that:

**Start with a domain you already understand.** Modeling is the hard part, and it's far easier to judge whether a model is right when you already know what questions the data should answer. Your own codebase, your team's services, or your reading list are all better first projects than a dataset you downloaded.

**Write the questions before the model.** It takes ten minutes and it will save you a rewrite. This remains the single highest-leverage habit in this whole handbook.

**Then point something at it that's not a person.** Once your data is modeled properly, wiring a language model to traverse it is a much smaller step than it sounds, because the hard part was never the model. It was knowing what the things are and how they connect.

::: info

**The companion repository is [<VPIcon icon="iconfont icon-github"/>`ronidas39/knowledge-graph-python-neo4j`](https://github.com/ronidas39/knowledge-graph-python-neo4j)**. It has the complete script, the 75,500 node dataset as committed CSVs, the benchmark behind every number in this article, and a checker that runs all 39 Cypher blocks through `EXPLAIN`. Clone it, run <VPIcon icon="fa-brands fa-python"/>`verify_dataset.py`, and you'll know your data matches mine before you trust a single measurement.

:::

If you want to go deeper, I write about system design at [<VPIcon icon="fas fa-globe"/>systemdesign.academy](https://systemdesign.academy) and publish longer engineering tutorials on [<VPIcon icon="fa-brands fa-youtube"/>my YouTube channel](https://youtube.com/@totaltechnologyzonne).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Knowledge Graph with Python and Neo4j [Full Handbook]",
  "desc": "Most of the data you work with is really about relationships. A customer belongs to an account. An incident affects a service. An engineer owns a repository. You store all of that in tables, and for a",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-knowledge-graph-with-python-and-neo4j-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
