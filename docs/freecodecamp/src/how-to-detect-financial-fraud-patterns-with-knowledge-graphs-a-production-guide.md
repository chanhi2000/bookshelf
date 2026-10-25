---
lang: en-US
title: "How to Detect Financial Fraud Patterns with Knowledge Graphs: A Production Guide"
description: "Article(s) > How to Detect Financial Fraud Patterns with Knowledge Graphs: A Production Guide"
icon: fa-brands fa-python
category:
  - Python
  - DevOps
  - Docker
  - Finance
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - docker
  - fnce
  - finance
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Detect Financial Fraud Patterns with Knowledge Graphs: A Production Guide"
    - property: og:description
      content: "How to Detect Financial Fraud Patterns with Knowledge Graphs: A Production Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-detect-financial-fraud-patterns-with-knowledge-graphs-a-production-guide.html
prev: /programming/py/articles/README.md
date: 2026-10-30
isOriginal: false
author:
  - name: Kamal Kishore
    url: https://freecodecamp.org/news/author/kamalct/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/223107d3-1947-4c50-aabe-a590e72a2fa9.png
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
  "title": "Finance > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/fnce/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Detect Financial Fraud Patterns with Knowledge Graphs: A Production Guide"
  desc="Most anti-fraud architectures in enterprise payment workflows evaluate transactions in isolation. When an invoice arrives, an automated rules engine checks it against static thresholds. It checks whet"
  url="https://freecodecamp.org/news/how-to-detect-financial-fraud-patterns-with-knowledge-graphs-a-production-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/223107d3-1947-4c50-aabe-a590e72a2fa9.png"/>

Most anti-fraud architectures in enterprise payment workflows evaluate transactions in isolation.

When an invoice arrives, an automated rules engine checks it against static thresholds. It checks whether the dollar amount falls within normal limits, whether the vendor is on an approved vendor list, and whether the submitting IP address looks familiar. If the individual attributes look plausible, the payment clears.

The problem with this approach is structural. Sophisticated fraud schemes like money mule rings, circular invoicing loops, and vendor collision rarely produce transactions that alert individual thresholds. A shell company invoicing $4,800 to stay under a $5,000 dual sign-off threshold looks completely fine in isolation. But when 25 seemingly independent vendors all route disbursements to the same bank account, the coordinated pattern starts to become clear.

You won't find the warning in the attributes of an isolated transaction. It lives in the topology of the payment network.

In a relational database, tracing these multi-entity relationships requires recursive cell joins across tables of vendors, invoices, payments, and bank accounts. But as tables grow into millions of rows, deep path traversals quickly degrade query performance. Graph databases solve this by storing relationships as first-class, index-free adjacency pointers, turning multi-hop traversals into constant-time lookups.

In this tutorial, you'll explore the architecture of an end-to-end relational fraud detection pipeline built on Neo4j. You'll see how to model financial entities as a graph, precompute derived edges to optimize query latency, and write parameterized Cypher queries to uncover five core procurement fraud schemes.

::: info

The complete reference implementation is available in the [<VPIcon icon="iconfont icon-github"/>`kamalct/fraud-detection-knowledge-graphs`](https://github.com/kamalct/fraud-detection-knowledge-graphs) repository.

:::

---

## Why Tabular Rules Miss Relational Fraud

In accounts payable pipelines, risk checks typically operate on isolated records:

```py
# Transaction-level view — nothing suspicious
transactions = [
    {"vendor": "Alpha Corp", "amount": 5200.00, "date": "2025-08-01"},
    {"vendor": "Beta LLC", "amount": 4800.00, "date": "2025-08-02"},
    {"vendor": "Gamma Inc", "amount": 5100.00, "date": "2025-08-03"},
]
# All amounts within normal range ($1K–$15K). All vendors valid.
# Dates are sequential. Nothing triggers any rule.
```

When you map those same records to an interconnected graph, the hidden structure becomes clear right away:

```py
# Graph view — all three vendors pay to the same account
connections = {
    "ACC-MULE-001": ["Alpha Corp", "Beta LLC", "Gamma Inc"],
    "ACC-0042":     ["Delta Corp", "Epsilon LLC"],
    "ACC-0099":     ["Zeta GmbH"],
}
# ACC-MULE-001 receives from 25+ vendors. That's a money mule ring.
# The convergence is the red flag.
```

The underlying data hasn't changed. But when you evaluate transactions within an entity graph, the coordinated funnel stands out.

In a relational database, connecting these dots requires multiple joins across separate table. In a knowledge graph, the connections are stored directly as edges connecting nodes, which allows you to query them in a single traversal.

| Pattern | What It Is | What Traditional Tools Don't Catch |
| --- | --- | --- |
| Duplicate Invoices | Same invoice and vendor, near-identical amount, close dates | Exact match misses slight variations |
| Circular Rings | Vendors invoicing each other in a closed loop | Each invoice looks legitimate alone |
| Money Mule Rings | Many vendors funneling to one controlled account | No single payment is anomalous |
| Vendor Collusion | Independent-looking vendors sharing underlying attributes | No cluster detection across entities |
| Payment Anomalies | Invoice approved by someone outside their department's authority | Role-based checks pass, context checks don't exist |

A knowledge graph doesn't replace rules engines or ML models. But it does fill the gap they can't reach: relationships.

::: note Prerequisites

To follow along with this tutorial, you'll need:

- Python 3.10 or higher installed on your machine.
- Docker and Docker Compose installed to run a local Neo4j instance.
- Basic familiarity with Python and database concepts.

:::

---

## How to Model the Financial Graph and Ingestion Schema

Before running fraud queries, you need to structure your data into a cohesive property graph. The reference dataset models six entity types commonly found in financial systems:

| Entity | Key Properties | Role |
| --- | --- | --- |
| Vendor | tax_id, name, country, city | Who issues invoices |
| Invoice | invoice_id, amount, date, category | What was billed |
| Payment | payment_id, amount, date | What was paid |
| BankAccount | account_id, routing_number, bank_name | Where money went |
| Employee | employee_id, name, department | Who approved |
| Organization | org_id, name, departments | Structural hierarchy |

The base relationships form a bipartite payment network:

```plaintext
(Employee)-[:APPROVED]->(Payment)-[:LINKED_TO]->(Invoice)-[:ISSUED_BY]->(Vendor)
                                   |
                                   v
                            (Payment)-[:PAID_TO]->(BankAccount)
```

### Step 1: How to Generate the Dataset with Known Injected Patterns

Real-world financial datasets are difficult to access because of privacy and regulatory restrictions. Using synthetic data allows you to inject known fraud patterns and systematically verify that your detection queries find them.

The dataset generator creates approximately 500 entities with five known patterns embedded:

- 12 duplicate invoice pairs
- 1 circular invoice ring (3 vendors)
- 1 money mule ring (25 vendors for 1 account)
- 1 vendor collusion cluster (4 vendors)
- 3 payment anomalies

```py
from dataset.generate import FraudDatasetGenerator

gen = FraudDatasetGenerator(
    num_vendors=100,
    num_employees=30,
    num_organizations=5,
    seed=42,
)
output_dir = gen.save("dataset/output")
```

Setting a fixed `seed=42` makes the dataset fully reproducible. Running the generator produces the exact same fraud patterns each time, giving you a reliable benchmark for testing queries:

```plaintext
Vendors: 100
Invoices: 220 (200 base + 20 fraud)
Payments: 331 (300 base + 31 fraud)
Bank Accounts: 51 (50 + 1 mule)
Employees: 30
Organizations: 5
Fraud Patterns: 5 types
```

The generator also exports a ground-truth manifest <VPIcon icon="iconfont icon-json"/>`ground_truth.json` that logs every injected anomaly, and this serves as your automated validation oracle.

### Step 2: How to Connect to Neo4j and Create Constraints

You can spin up a local Neo4j 5.20 container with APOC procedures enabled using Docker Compose:

```sh
docker compose up -d
```

Next, initialize the database driver and establish uniqueness constraints:

```py
from graph.connection import FraudGraph

with FraudGraph() as graph:
    graph.create_constraints()
```

These constraints are critical for query performance. In Neo4j, unique property constraints automatically build underlying B-tree indexes. Without them, every MERGE operation forces an unindexed full scan across all nodes in the database:

```py
class FraudGraph:
    def __init__(self, uri=None, user=None, password=None):
        self.uri = uri or os.environ.get('NEO4J_URI', 'bolt://localhost:7687')
        self.user = user or os.environ.get('NEO4J_USER', 'neo4j')
        self.password = password or os.environ.get('NEO4J_PASSWORD', 'password')
        self.driver = None

    def connect(self):
        self.driver = GraphDatabase.driver(
            self.uri, auth=(self.user, self.password),
            max_connection_pool_size=50,
            connection_acquisition_timeout=30,
        )
        with self.driver.session() as session:
            session.run('RETURN 1')
        return self

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()

    def create_constraints(self):
        with self.driver.session() as session:
            session.run("CREATE CONSTRAINT vendor_tax_id IF NOT EXISTS FOR (v:Vendor) REQUIRE v.tax_id IS UNIQUE")
            session.run("CREATE CONSTRAINT invoice_id IF NOT EXISTS FOR (i:Invoice) REQUIRE i.invoice_id IS UNIQUE")
            session.run("CREATE CONSTRAINT account_id IF NOT EXISTS FOR (a:BankAccount) REQUIRE a.account_id IS UNIQUE")
            session.run("CREATE CONSTRAINT employee_id IF NOT EXISTS FOR (e:Employee) REQUIRE e.employee_id IS UNIQUE")
```

### Step 3: How to Load Entities into the Graph

The `FraudGraphLoader` uses Cypher's `UNWIND` to batch-insert entities in parameterized transactions:

```py
from graph.loader import FraudGraphLoader

with FraudGraph() as graph:
    graph.create_constraints()
    loader = FraudGraphLoader(graph)
    loader.load_all(data)
```

The loading sequence respects foreign key dependencies: organizations are loaded first, followed by vendors, bank accounts, and employees, with invoices and payments loaded last.

Each load method follows the same pattern:

```cypher
UNWIND $data AS v
MERGE (vendor:Vendor {tax_id: v.tax_id})
SET vendor.name = v.name,
    vendor.country = v.country,
    vendor.city = v.city
WITH vendor, v
MATCH (org:Organization {org_id: v.organization})
MERGE (vendor)-[:BELONGS_TO]->(org)
```

`MERGE` creates or matches a node (using the constraint for O(1) lookup), `SET` attaches properties, and `MERGE` on the relationship connects nodes.

### Step 4: How to Materialize Derived Relationships for Fast Queries

A central architectural decision in graph databases is deciding whether to compute relationships at query time or materialize them during ingestion.

Discovering whether two vendors share a bank account requires traversing a four-hop path:

```cypher
(Vendor)<-[:ISSUED_BY]-(Invoice)<-[:LINKED_TO]-(Payment)-[:PAID_TO]->(BankAccount)<-[:PAID_TO]-(Payment)-[:LINKED_TO]->(Invoice)-[:ISSUED_BY]->(Vendor)
```

Evaluating this four-hop path during every real-time fraud query causes significant computational overhead. Instead, you can materialize derived edges when data enters the system. This adds a slight write latency during batch ingestion, but it turns multi-hop traversals into direct, single-hop lookups during runtime detection queries.

The first derived relationship is **SHARED_ACCOUNT_WITH,** which links vendors that share a destination bank account:

```cypher
MATCH (v1:Vendor)<-[:ISSUED_BY]-(i1:Invoice)<-[:LINKED_TO]-(p1:Payment)-[:PAID_TO]->(a:BankAccount)
MATCH (v2:Vendor)<-[:ISSUED_BY]-(i2:Invoice)<-[:LINKED_TO]-(p2:Payment)-[:PAID_TO]->(a)
WHERE id(v1) < id(v2)
MERGE (v1)-[:SHARED_ACCOUNT_WITH]->(v2)
```

The filter `WHERE id(v1) < id(v2)` ensures that the relationship is stored as a single directed edge between the internal node IDs, which prevents duplicate reverse edges.

You can also materialize shared geographic locations and banking routing prefixes to detect loose collusion networks:

```cypher
-- Same city and country
MATCH (v1:Vendor), (v2:Vendor)
WHERE id(v1) < id(v2)
  AND v1.city = v2.city
  AND v1.country = v2.country
MERGE (v1)-[:SHARED_LOCATION]->(v2)

-- Bank accounts with same routing prefix (first 3 digits)
MATCH (v1:Vendor)<-[:ISSUED_BY]-(i1:Invoice)<-[:LINKED_TO]-(p1:Payment)-[:PAID_TO]->(a1:BankAccount)
MATCH (v2:Vendor)<-[:ISSUED_BY]-(i2:Invoice)<-[:LINKED_TO]-(p2:Payment)-[:PAID_TO]->(a2:BankAccount)
WHERE id(v1) < id(v2)
  AND a1.account_id <> a2.account_id
  AND substring(a1.routing_number, 0, 3) = substring(a2.routing_number, 0, 3)
MERGE (v1)-[:SHARED_ROUTING_PREFIX]->(v2)
```

Once ingestion completes, you can inspect the graph topology to confirm that both base and derived relationships loaded properly:

```py
info = graph.get_info()
for label, count in sorted(info['nodes'].items(), key=lambda x: -x[1]):
    print(f"  {label}: {count} nodes")
for rel, count in sorted(info['relationships'].items(), key=lambda x: -x[1]):
    print(f"  {rel}: {count} relationships")
```

The output shows raw entities and the generated derived relationships:

```plaintext
  Invoice: 220 nodes
  Payment: 331 nodes
  Vendor: 100 nodes
  BankAccount: 51 nodes
  Employee: 30 nodes

  SHARED_ACCOUNT_WITH: 412 relationships
  SHARED_LOCATION: 387 relationships
  LINKED_TO: 331 relationships
  PAID_TO: 331 relationships
  ISSUED_BY: 220 relationships
  APPROVED: 331 relationships
  SHARED_ROUTING_PREFIX: 52 relationships
```

These derived relationships are designed specifically for high-speed detection. In a relational database, discovering shared accounts requires a self-join across multiple tables. In a graph, it becomes a precomputed edge, turning complex traversals into direct lookups.

---

## How to Detect Five Fraud Patterns with Cypher Queries

Once your schema and derived relationships are established, you can construct parameterized Cypher queries that'll flag five widespread procurement fraud patterns.

### Pattern 1: How to Find Duplicate Invoices

Fraudulent actors often submit duplicate invoices spaced days or weeks apart, assuming accounts payable teams will process them as routine recurring expenses.

Rule-based engines often catch exact matches, but they can miss invoices with slight date shifts. In a graph, you can query across all invoices issued by the same vendor within a rolling date window:

```cypher
// graph/queries.py — detect_duplicates()
MATCH (v:Vendor)<-[:ISSUED_BY]-(i1:Invoice),
      (v)<-[:ISSUED_BY]-(i2:Invoice)
WHERE i1.invoice_id < i2.invoice_id
  AND i1.amount = i2.amount
  AND i1.date < i2.date
  AND duration.between(date(i1.date), date(i2.date)).days <= $max_days
RETURN i1.invoice_id AS invoice_a,
       i2.invoice_id AS invoice_b,
       v.name AS vendor,
       i1.amount AS amount,
       i1.date AS date_a,
       i2.date AS date_b,
       duration.between(date(i1.date), date(i2.date)).days AS days_apart
ORDER BY days_apart
```

Key points here:

- The condition `i1.invoice_id < i2.invoice_id` prevents returning the same pair twice like `(A, B)` and `(B, A)`.
- `i1.amount = i2.amount` is the fraud signal: same amount means likely the same invoice submitted twice.
- By scoping the search to invoices issued by the same vendor v, the query leverages index lookups on the vendor before evaluating date intervals with the native temporal duration.between() function.

You can execute this query through the Python wrapper:

```py
from graph.queries import FraudQueries

queries = FraudQueries(graph)
duplicates = queries.detect_duplicates(max_days_apart=14)
print(f"Found {len(duplicates)} duplicate invoice pairs")
for dup in duplicates[:5]:
    print(f"  {dup['invoice_a']} ↔ {dup['invoice_b']} | "
          f"{dup['vendor']} | ${dup['amount']} | "
          f"{dup['days_apart']} days apart")
```

The query detects all 12 duplicate pairs injected into the synthetic dataset, achieving 100% recall.

### Pattern 2: How to Uncover Circular Invoicing Rings

In circular invoicing schemes, three or more vendors bill one another in a closed loop. Each transaction appears legitimate on its own, but no actual goods or services are delivered.

Because you precomputed `SHARED_ACCOUNT_WITH`, cycle detection is simplified to finding three-node triangles in the vendor sub-graph:

```cypher
// graph/queries.py — detect_circular_schemes()
MATCH path = (v1:Vendor)-[:SHARED_ACCOUNT_WITH]-(v2:Vendor)
              -[:SHARED_ACCOUNT_WITH]-(v3:Vendor)
              -[:SHARED_ACCOUNT_WITH]-(v1)
WHERE id(v1) < id(v2) AND id(v2) < id(v3)
RETURN path,
       [n IN nodes(path) | {name: n.name, tax_id: n.tax_id}] AS vendors,
       length(path) AS hops
```

Key points here:

- The constraint `id(v1) < id(v2)` AND `id(v2) < id(v3)` eliminates cyclic permutations. Without it, a single three-node ring `(A, B, C)` would be returned three separate times.
- If you ran this query directly over raw four-hop transactional paths without materialized edges, finding a three-cycle would require traversing twelve hops, which causes high CPU usage on large datasets.

```py
circles = queries.detect_circular_schemes(min_cycle_length=3)
print(f"Found {len(circles)} circular invoice rings")
for ring in circles:
    vendor_names = [v['name'] for v in ring['vendors']]
    print(f"  Ring ({ring['hops']} hops): {' ↔ '.join(vendor_names)}")
```

The query catches the circular invoicing ring with 100% recall.

### Pattern 3: How to Detect Money Mule Networks

In a money mule setup, multiple shell entities funnel money into a single account controlled by a syndicate. The individual disbursements are small, but the fan-in degree of the destination account is anomalously high.

You can uncover this pattern by performing degree analysis on destination bank accounts:

```cypher
// graph/queries.py — detect_money_mule_rings()
MATCH (a:BankAccount)<-[p_paid:PAID_TO]-(p:Payment)-[:LINKED_TO]->(i:Invoice)
                  -[:ISSUED_BY]->(v:Vendor)
WITH a, collect(DISTINCT v) AS vendors,
     sum(p.amount) AS total_received,
     count(DISTINCT v) AS unique_vendors,
     count(p) AS payment_count
WHERE unique_vendors >= $min_vendors
RETURN a.account_id,
       a.routing_number,
       a.bank_name,
       unique_vendors AS vendor_count,
       payment_count,
       total_received AS total_amount,
       [vendor IN vendors | vendor.name] AS vendor_names
ORDER BY unique_vendors DESC
```

You can use the following risk guide to evaluate accounts based on incoming connections:

| Vendor Count | Risk Level |
| --- | --- |
| 1–3 | Normal |
| 4–9 | Investigate |
| 10+ | Likely money mule |

In production, you can add a threshold on total received amount to minimize false positives:

```cypher
WHERE unique_vendors >= 10 AND total_received > 50000
```

Running the detection query in Python:

```py
mules = queries.detect_money_mule_rings(min_vendor_count=5)
for acct in mules:
    print(f"  {acct['a.account_id']} ({acct['a.bank_name']}) | "
          f"{acct['vendor_count']} vendors | ${acct['total_amount']:.0f}")
```

The query successfully identifies the injected mule ring (ACC-MULE-001), which aggregates payments across 25 shell vendors.

### Pattern 4: How to Identify Vendor Collusion Clusters

Colluding shell companies often mask their affiliation by registering under different corporate names. But they frequently leak metadata, such as shared physical office suites or identical banking branch routing prefixes.

To identify these clusters, you can evaluate multiple derived relationships concurrently and compute a composite structural risk score:

```cypher
// graph/queries.py — detect_vendor_collusion()
MATCH (v:Vendor)
OPTIONAL MATCH (v)-[:SHARED_ACCOUNT_WITH]->(v2)
OPTIONAL MATCH (v)-[:SHARED_LOCATION]->(v3)
OPTIONAL MATCH (v)-[:SHARED_ROUTING_PREFIX]->(v4)
WITH v,
     collect(DISTINCT v2) AS shared_account_vendors,
     collect(DISTINCT v3) AS shared_location_vendors,
     collect(DISTINCT v4) AS shared_routing_vendors
WITH v,
     size(shared_account_vendors) AS sc,
     size(shared_location_vendors) AS sl,
     size(shared_routing_vendors) AS sr
WHERE (sc + sl + sr) >= $min_score AND (sc + sl + sr) > 0
RETURN v.name AS vendor,
       v.tax_id,
       (sc + sl + sr) AS risk_score,
       [n IN shared_account_vendors + shared_location_vendors + shared_routing_vendors | n.name] AS related_vendors,
       [x IN range(1, sc) | 'shared_account'] +
       [x IN range(1, sl) | 'shared_location'] +
       [x IN range(1, sr) | 'shared_routing'] AS flags
ORDER BY risk_score DESC
```

Key points here:

- Using OPTIONAL MATCH is essential here. A strict MATCH would drop vendors that exhibit shared routing and location but haven't yet shared a bank account.
- You can tune the risk score based on your business environment. Sharing a city is common in large commercial hubs, but sharing a routing prefix and an office suite at the same time elevates the composite score past the investigative threshold.

```py
collusion = queries.detect_vendor_collusion(min_risk_score=2)
for vendor in collusion[:10]:
    print(f"  {vendor['vendor']} | Risk: {vendor['risk_score']} | "
          f"Flags: {vendor['flags']}")
```

The multi-attribute scoring query successfully flags the four-vendor collusion cluster.

### Pattern 5: How to Flag Out-of-Jurisdiction Payment Approvals

Internal fraud often relies on an employee approving an invoice outside their departmental authority. For instance, an HR manager might approve an engineering infrastructure vendor invoice without authorization.

Approval systems often confirm that an approver has signing authority, but they rarely validate whether the approver's department has jurisdiction over the invoice category. A graph query can traverse the full approval path and evaluate departmental permissions:

```cypher
// graph/queries.py — detect_payment_anomalies()
MATCH (inv:Invoice)<-[:LINKED_TO]-(p:Payment),
      (e:Employee)-[:APPROVED]->(p),
      (e)-[:WORKS_FOR]->(org:Organization)
WITH inv, p, e, org,
     CASE
       WHEN inv.category = 'procurement' AND
            e.department IN ['finance', 'operations', 'procurement']
            THEN 'ok'
       WHEN inv.category = 'payroll' AND
            e.department IN ['hr', 'finance']
            THEN 'ok'
       WHEN inv.category = 'travel' AND
            e.department IN ['operations', 'finance', 'hr']
            THEN 'ok'
       WHEN inv.category = 'marketing' AND
            e.department IN ['marketing', 'finance']
            THEN 'ok'
       WHEN inv.category = 'consulting' AND
            e.department IN ['finance', 'operations', 'procurement']
            THEN 'ok'
       WHEN inv.category = 'services' AND
            e.department IN ['finance', 'operations', 'procurement']
            THEN 'ok'
       WHEN inv.category = 'supplies' AND
            e.department IN ['operations', 'procurement', 'finance']
            THEN 'ok'
       WHEN inv.category = 'maintenance' AND
            e.department IN ['operations', 'procurement', 'finance']
            THEN 'ok'
       WHEN inv.category = 'software' AND
            e.department IN ['engineering', 'operations', 'finance']
            THEN 'ok'
       ELSE 'ANOMALY'
     END AS approval_status
WHERE approval_status = 'ANOMALY'
RETURN inv.invoice_id, inv.amount, inv.category,
       inv.vendor_name, inv.date,
       e.name AS approver, e.employee_id,
       e.department AS approver_department
ORDER BY inv.date DESC
```

Key points here:

- The default-deny `ELSE 'ANOMALY'` structure ensures that any invoice category not explicitly authorized fails closed.
- In enterprise architectures, you should materialize this policy logic directly in the graph using `(:Department)-[:AUTHORIZED_FOR]->(:Category)` nodes rather than hardcoding values in queries. This allows compliance teams to update authority matrices without deploying new code.

```py
anomalies = queries.detect_payment_anomalies()
print(f"Found {len(anomalies)} anomalous approvals")
for a in anomalies:
    print(f"  Invoice {a['inv.invoice_id']}: "
          f"{a['e.name']} ({a['e.department']}) approved "
          f"{a['inv.category']} | ${a['inv.amount']}")
```

The query surfaces all 3 injected approval anomalies with 100% recall.

---

## How to Run the End-to-End Pipeline and Validate Results

You can orchestrate these steps into an automated command-line pipeline:

```sh
python analysis/run_detections.py
```

The end-to-end data flow operates in six distinct phases:

```plaintext
Generate Dataset → Load to Neo4j → Build Derived Relationships → Run 5 Queries → Save Results → Validate
```

### How to Run Ingestion and Detection

The main pipeline script orchestrates data generation, schema creation, relationship materialization, and query execution:

```py
# analysis/run_detections.py
from dataset.generate import FraudDatasetGenerator
from graph.connection import FraudGraph
from graph.loader import FraudGraphLoader
from graph.queries import FraudQueries

def run_pipeline(output_dir='analysis/output', force_regenerate=False):
    os.makedirs(output_dir, exist_ok=True)

    # Step 1: Generate or load dataset
    dataset_path = os.path.join(output_dir, 'data')
    if not os.path.exists(os.path.join(dataset_path, 'vendors.json')) or force_regenerate:
        gen = FraudDatasetGenerator(seed=42)
        gen.save(dataset_path)
    else:
        print(f'Dataset already at: {dataset_path}')

    # Load JSON files
    data = {}
    for name in ['vendors', 'invoices', 'payments', 'bank_accounts',
                  'employees', 'organizations', 'ground_truth']:
        with open(os.path.join(dataset_path, f'{name}.json')) as f:
            data[name] = json.load(f)

    # Step 2: Load into Neo4j
    graph = FraudGraph()
    graph.connect()
    graph.create_constraints()
    loader = FraudGraphLoader(graph)
    loader.load_all(data)
    loader.create_shared_account_relationships()
    loader.create_attribute_based_relationships()

    info = graph.get_info()
    print('Graph loaded:')
    for label, count in sorted(info['nodes'].items(), key=lambda x: -x[1]):
        print(f'  {label}: {count} nodes')

    # Step 3: Run all detections
    queries = FraudQueries(graph)
    results = queries.detect_all()

    # Step 4: Save results
    with open(os.path.join(output_dir, 'detection_results.json'), 'w') as f:
        json.dump(results, f, indent=2, default=str)

    for pattern, items in results.items():
        print(f'  {pattern}: {len(items)} findings')
```

The `detect_all()` method runs all five queries and returns a single dict:

```py
# graph/queries.py
def detect_all(self):
    return {
        'duplicate_invoices': self.detect_duplicates(),
        'circular_schemes': self.detect_circular_schemes(),
        'money_mule_rings': self.detect_money_mule_rings(),
        'vendor_collusion': self.detect_vendor_collusion(),
        'payment_anomalies': self.detect_payment_anomalies(),
    }
```

### How to Validate Recall Against Injected Ground Truth

The validation script compares query results against the ground-truth file to measure recall:

```py
# analysis/validate.py
from collections import defaultdict

def validate(results_path, output_path=None):
    with open(results_path) as f:
        results = json.load(f)

    with open(os.path.join(os.path.dirname(results_path), 'data',
                           'ground_truth.json')) as f:
        ground_truth = json.load(f)

    gt_by_pattern = defaultdict(list)
    for pattern in ground_truth:
        gt_by_pattern[pattern['pattern']].append(pattern)
```

The verification logic evaluates detection accuracy for each pattern type:

```py
for pattern_name, gt_patterns in gt_by_pattern.items():
    found = results.get(pattern_name, [])
    gt_count = len(gt_patterns)

    if pattern_name == 'duplicate_invoices':
        print(f"DUPLICATE INVOICES: DETECTED {len(found)} of {gt_count} pairs — {len(found)/max(1,gt_count):.0%} recall")

    elif pattern_name == 'money_mule_rings':
        matched = sum(1 for gt in gt_patterns
                      for r in found
                      if r.get('a.account_id') == gt['shared_account'])
        print(f"MONEY MULE RINGS: DETECTED {matched} of {gt_count} rings — {matched/max(1,gt_count):.0%} recall")
```

Running the validator against a dataset generated with `seed=42` produces these results:

```plaintext
DUPLICATE INVOICES: DETECTED 12 of 12 pairs — 100% recall
CIRCULAR SCHEMES: DETECTED 1 of 1 rings — 100% recall
MONEY MULE RINGS: DETECTED 1 of 1 rings — 100% recall
VENDOR COLLUSION: 89 high-risk vendors flagged (multi-attribute scoring)
PAYMENT ANOMALIES: DETECTED 3 of 3 anomalies — 100% recall
```

### How to Execute the Complete Workflow

Here's the complete sequence of terminal commands to set up the environment, run the pipeline, and validate the results:

```sh
# 1. Start Neo4j
docker compose up -d

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the full pipeline
python analysis/run_detections.py

# 4. Validate results
python analysis/validate.py

# 5. (Optional) Regenerate with fresh data and re-run
python analysis/run_detections.py --regenerate
```

---

## Production Architecture: How to Scale the Graph Pipeline

While the reference prototype operates on hundreds of nodes, production fraud detection engines handle millions of transactions daily. Scaling this architecture requires addressing key operational bottlenecks.

```mermaid
flowchart TD
  A[New Transaction] --> B[Stage 1 — Deterministic queries (fast, rule-based)]
  B --(if any pattern matches)-->C[Stage 2 — ML scoring on graph features]
  C --> D[Risk Score → Alert / Approve / Escalate]
```

### How to Implement a Two-Stage Detection Architecture

Running global cycle detection queries synchronously on every incoming transaction inside an online payment path will exhaust database connection pools.

Instead, you should partition detection into two tiers:

- **Stage 1 (Synchronous Gating):** Sub-millisecond Cypher queries that catch known patterns. They're fast because they use indexed properties, pre-built relationships, and bounded pattern lengths.
- **Stage 2 (Asynchronous Graph Analytics):** For transactions that don't trigger a deterministic rule, compute graph-derived features and score them:

### How to Tune Thresholds and Manage False Positives

Detection systems inevitably produce false positives. In production, review feedback from compliance analysts should be used to continuously calibrate query thresholds:

```py
#Tune thresholds based on false positive rate

queries.detect_money_mule_rings(min_vendor_count=10) # was 5
queries.detect_duplicates(max_days_apart=7) # was 14
queries.detect_vendor_collusion(min_risk_score=3) # was 2
```

You can rerun validation after each threshold update to monitor the effect on recall:

```sh
python analysis/validate.py --input analysis/output/detection_results.json
```

### How to Mitigate Supernode Expansion

A common failure in graph systems is the "supernode" problem. Legitimate shared entities (for example, a major corporate landlord, a national power utility, or internal payroll accounts) can accumulate tens of thousands of incoming edges.

When a query attempts to traverse through a supernode without filtering, traversal latency spikes exponentially.

You can mitigate this with two strategies:

- **Degree Limits:** Add degree pruning in traversals:

```cypher
MATCH (a:BankAccount)

WHERE size((a)<-[:PAID_TO]-()) < 1000
```

- **Node Labels:** Tag known high-volume institutional entities with a :Whitelisted or :Utility label, and explicitly exclude them from collusion and money mule scans.

### How to Use Graph Features for Machine Learning

The most effective fraud detection systems don't treat graphs and machine learning as competing paradigms. Instead, the graph acts as an advanced feature store for predictive models:

- **Degree Centrality:** Measures the connectivity of an account to identify mule convergence.
- **Betweenness Centrality:** Identifies entities that act as bridges between seemingly disconnected vendor groups.
- **PageRank and Community Detection:** Quantifies cluster association and entity importance across the network.

An ML classifier relying solely on transaction amounts might see nothing unusual about a $4,900 payment. But when paired with a graph-derived feature showing the vendor has a high betweenness centrality and shares a second-degree connection with a confirmed fraud ring, the classifier flags the transaction with high precision.

---

## Key Architectural Lessons and Takeaways

Building and tuning graph-based fraud pipelines highlights several key trade-offs:

First, in a relational database, schema design prioritizes third normal form (3NF) to eliminate data redundancy. In a graph, design your schema around the traversals you need to execute. If a query repeatedly traverses four hops to find correlated attributes, materialize that correlation as a direct relationship during ingestion.

Second, unique property constraints aren't just for data integrity. They provide the underlying hash indexes that make node lookups $O(1)$. Omitting constraints turns every graph merge into an unindexed full scan.

Third, you should curate the rule Inventory. Start with a focused set of four or five high-signal patterns. Each pattern requires threshold calibration and triage workflows. Adding dozens of unverified heuristics simultaneously creates operational noise and alert fatigue for compliance teams.

And finally, close the analyst feedback loop. The output of a detection query is a hypothesis, not a final verdict. When compliance analysts investigate an alert and confirm fraud, write that status back into the graph as a node property or label (for example, :ConfirmedFraud). This enriches the neighborhood topology and provides clean ground truth for training downstream machine learning models.

---

## Conclusion

In this tutorial, you explored why point-in-time relational checks miss complex fraud schemes, how to model accounts payable data as an interconnected graph, and how to materialize derived edges to accelerate traversal latency.

You also implemented five Cypher queries capable of detecting duplicate billing, circular rings, money mules, vendor collusion, and unauthorized payment approvals.

::: info

The companion code for this article is available at* [<VPIcon icon="iconfont icon-github"/>`kamalct/fraud-detection-knowledge-graphs`](https://github.com/kamalct/fraud-detection-knowledge-graphs)*. All data is synthetic and fully reproducible.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Detect Financial Fraud Patterns with Knowledge Graphs: A Production Guide",
  "desc": "Most anti-fraud architectures in enterprise payment workflows evaluate transactions in isolation. When an invoice arrives, an automated rules engine checks it against static thresholds. It checks whet",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-detect-financial-fraud-patterns-with-knowledge-graphs-a-production-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
