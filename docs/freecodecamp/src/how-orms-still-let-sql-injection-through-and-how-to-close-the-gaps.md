---
lang: en-US
title: "How ORMs Still Let SQL Injection Through (and How to Close the Gaps)"
description: "Article(s) > How ORMs Still Let SQL Injection Through (and How to Close the Gaps)"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - DevOps
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - devops
  - sec
  - security
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How ORMs Still Let SQL Injection Through (and How to Close the Gaps)"
    - property: og:description
      content: "How ORMs Still Let SQL Injection Through (and How to Close the Gaps)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-orms-still-let-sql-injection-through-and-how-to-close-the-gaps.html
prev: /programming/js-express/articles/README.md
date: 2026-09-29
isOriginal: false
author:
  - name: Hackita
    url: https://freecodecamp.org/news/author/hackita-/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9e1f15e5-de00-4533-8349-70620154f7ef.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How ORMs Still Let SQL Injection Through (and How to Close the Gaps)"
  desc="A lot of developers assume that once they're on an ORM, SQL injection stops being their problem. But it doesn't disappear. It just relocates. ORMs like Sequelize, Prisma, TypeORM, and Knex parameteriz"
  url="https://freecodecamp.org/news/how-orms-still-let-sql-injection-through-and-how-to-close-the-gaps"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9e1f15e5-de00-4533-8349-70620154f7ef.png"/>

A lot of developers assume that once they're on an ORM, SQL injection stops being their problem. But it doesn't disappear. It just relocates.

ORMs like Sequelize, Prisma, TypeORM, and Knex parameterize the queries they build for you automatically. That part works.

The problem shows up in the parts of your app where you step outside that safe path: a raw query the ORM's query builder can't express cleanly, a dynamic sort column, or a single helper function reached for without a second thought.

Those are exactly the places [<VPIcon icon="fas fa-globe"/>attackers go looking first](https://hackita.it/articoli/hacker/), and they're easy for developers to miss precisely because the rest of the codebase feels protected.

Four of those patterns are the focus here. Each one gets a working example that triggers the bug, a breakdown of why it's exploitable, and a rewritten version that closes it. I also include notes on exactly what moved and why.

You don't need a security background to follow along. You just need enough comfort with Node.js, SQL, and at least one ORM to read the code.

::: note Prerequisites

The examples assume you're comfortable with:

- The basics of Node.js and Express
- Writing basic SQL queries
- Basic use of an ORM (all code examples use Sequelize, but the patterns apply to Prisma, TypeORM, Knex, and others too)
- How an HTTP request/response cycle works

:::

::: note Note on code examples

Throughout this guide, `sequelize` is assumed to already be an initialized Sequelize instance, with `QueryTypes` and `Op` imported from `'sequelize'` alongside it, and `User`/`Product` are Sequelize models defined elsewhere in the app. Examples use Sequelize v6+ syntax (the current major version) since some of the APIs referenced here changed between major versions. You can adapt the syntax to the version and ORM you use.

:::

---

## 1. Raw Query Escape Hatches

Every major ORM ships an "escape hatch" for queries the query builder can't express cleanly: `sequelize.query()`, Prisma's `$queryRawUnsafe`, or TypeORM's `query()`. They exist for good reasons, like complex joins, window functions, and vendor-specific SQL.

The trouble starts when developers treat that escape hatch like the rest of the ORM, and interpolate user input directly into the string it builds.

::: info How to Identify This Vulnerability in Your Code

Here's a typical filtered report endpoint:

```js
// Express.js - Vulnerable
app.get('/reports', async (req, res) => {
  const { region } = req.query;
  const results = await sequelize.query(
    `SELECT * FROM sales WHERE region = '${region}'`,
    { type: QueryTypes.SELECT }
  );
  res.json(results);
});
```

The query builder never sees this string. It's handed straight to the database driver exactly as written.

:::

::: important Why This Matters

A request like `?region=' OR '1'='1` turns the query into `SELECT * FROM sales WHERE region = '' OR '1'='1'`, which is always true. Every row in the table comes back, regardless of region.

Worse, because this code lives inside an ORM-based project, it often doesn't get the same scrutiny a raw `mysql.query()` call would in a non-ORM codebase. Reviewers assume the ORM already handled it.

:::

::: tip How to Fix This Vulnerability

Pass values through the replacement/binding mechanism the raw-query API already provides, instead of building the string yourself:

```js
// Express.js - Secure
app.get('/reports', async (req, res) => {
  const { region } = req.query;
  const results = await sequelize.query(
    'SELECT * FROM sales WHERE region = :region',
    {
      replacements: { region },
      type: QueryTypes.SELECT
    }
  );
  res.json(results);
});
```

The fix isn't avoiding raw queries entirely, because sometimes you genuinely need them. It's never building the SQL string by hand when a binding mechanism is sitting right there.

:::

::: critical

Never concatenate user input into a raw query string. Use the replacement/binding API your raw-query method already provides.

:::

---

## 2. Identifiers That Can't Be Parameterized

Parameterized queries protect *values*. They don't protect *identifiers* like table names, column names, or `ORDER BY` direction. Those have to be part of the SQL string itself.

That's why a dynamic sort feature is one of the most common places injection sneaks back into otherwise well-written ORM code.

::: info How to Identify This Vulnerability in Your Code

Here's a typical sortable list endpoint:

```js
// Express.js - Vulnerable
app.get('/users', async (req, res) => {
  const { sortBy = 'created_at' } = req.query;
  const users = await sequelize.query(
    `SELECT * FROM users ORDER BY ${sortBy}`,
    { type: QueryTypes.SELECT }
  );
  res.json(users);
});
```

`sortBy` goes straight from the query string into the `ORDER BY` clause, with nothing in between.

:::

::: important Why This Matters

`sortBy` looks like a harmless UI convenience until someone sends `created_at; DROP TABLE users; --`. Whether that exact payload runs depends on your database driver: Postgres's `pg` driver executes stacked statements like this by default, while MySQL's `mysql2` blocks them unless `multipleStatements: true` is explicitly set.

Either way, the underlying problem is the same: you have arbitrary SQL sitting in a position that was only ever meant to hold a column name.

:::

::: tip How to Fix This Vulnerability

Since identifiers can't be bound as parameters, the only safe option is an allowlist:

```js
// Express.js - Secure
const ALLOWED_SORT_COLUMNS = ['created_at', 'name', 'email'];

app.get('/users', async (req, res) => {
  const { sortBy = 'created_at' } = req.query;
  const column = ALLOWED_SORT_COLUMNS.includes(sortBy) ? sortBy : 'created_at';

  const users = await sequelize.query(
    `SELECT * FROM users ORDER BY ${column}`,
    { type: QueryTypes.SELECT }
  );
  res.json(users);
});
```

Never pass user input through to an identifier position, even after "sanitizing" it first. Sanitization for identifiers is much easier to get wrong than for values.

:::

::: critical

Identifiers can't be parameterized. If user input decides a column or table name, allowlist it, don't sanitize it.

:::

---

## 3. Second-Order Injection Through Stored Data

This one catches teams off guard because the input *was* parameterized...the first time it was written to the database.

The injection happens later, when that already-stored value gets reused inside a different, unparameterized query.

::: info How to Identify This Vulnerability in Your Code

Here's a registration flow, and elsewhere in the codebase, an admin search feature:

```js
// Express.js - Vulnerable

// Step 1: user registration, correctly parameterized
app.post('/register', async (req, res) => {
  await User.create({ username: req.body.username });
  res.json({ success: true });
});

// Step 2: somewhere else in the codebase, an admin search feature
app.get('/admin/search', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const results = await sequelize.query(
    `SELECT * FROM audit_log WHERE actor = '${user.username}'`,
    { type: QueryTypes.SELECT }
  );
  res.json(results);
});
```

Step 1 is completely safe on its own. Step 2 is where things go wrong.

:::

::: important Why This Matters

A username like `admin' OR '1'='1` passes through step 1 without any issue. Sequelize's `create()` parameterizes it, so it's stored exactly as typed. It sits in the database looking completely normal.

The payload only fires when step 2 pulls that value back out and drops it straight into a raw query string. "It's already in our own database" is not the same thing as "it's safe". It's still attacker-controlled if it originated from user input anywhere upstream.

:::

::: tip How to Fix This Vulnerability

Same fix as pattern #1. You bind the value instead of concatenating it:

```js
// Express.js - Secure
// Step 1 (registration) is unchanged — it was already parameterized
app.get('/admin/search', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const results = await sequelize.query(
    'SELECT * FROM audit_log WHERE actor = :actor',
    {
      replacements: { actor: user.username },
      type: QueryTypes.SELECT
    }
  );
  res.json(results);
});
```

The bug here is harder to spot than pattern #1, because the tainted data crosses a database round-trip before it becomes dangerous.

:::

::: critical

Data from your own database isn't automatically safe. If it originated from user input anywhere upstream, it still needs to be parameterized everywhere it's used.

:::

---

## 4. Raw SQL Smuggled Into Normal ORM Calls

Pattern #1 covered the *obvious* raw-query escape hatch, a method you reach for on purpose when you need real SQL. This one is sneakier: injection hiding inside a call that looks completely ORM-managed. It's not raw SQL, right? It's just one helper function among many.

::: info How to Identify This Vulnerability in Your Code

Here's a typical filtered product listing:

```js
// Express.js - Vulnerable
app.get('/products', async (req, res) => {
  const { minPrice } = req.query;
  const products = await Product.findAll({
    where: sequelize.literal(`price > ${minPrice}`)
  });
  res.json(products);
});
```

`Product.findAll()` looks like a fully safe, parameterized ORM call...right up until `sequelize.literal()` shows up inside it.

:::

::: important Why This Matters

`literal()` tells Sequelize "don't touch this, insert it into the SQL exactly as written." Anything interpolated into it is exactly as injectable as pattern #1, just wearing a normal-looking ORM method as a disguise.

Send `?minPrice=0 OR 1=1` and the `WHERE` clause becomes unconditionally true: every row comes back, price filter or not. No stacked statement needed this time. It's a single boolean expression, so it works the same regardless of database driver.

:::

::: tip How to Fix This Vulnerability

Stop reaching for `literal()`. Sequelize's own operator API already covers this case:

```js
// Express.js - Secure
app.get('/products', async (req, res) => {
  const minPrice = Number(req.query.minPrice);

  if (!Number.isFinite(minPrice)) {
    return res.status(400).json({ error: 'minPrice must be a number' });
  }

  const products = await Product.findAll({
    where: { price: { [Op.gt]: minPrice } }
  });
  res.json(products);
});
```

`Op.gt`, `Op.between`, `Op.in`, and the rest of Sequelize's operator API already cover the vast majority of cases people reach for `literal()` for, and they parameterize correctly by default. Validating that `minPrice` is actually a number, before it ever reaches the query, closes the gap even if a future refactor reintroduces `literal()` somewhere else.

:::

::: critical

Grep for `literal(`, `fn(`, and your ORM's other raw escape hatches everywhere they appear in the codebase, not just inside the queries that are clearly "raw."

:::

---

## Summary

For a quick recap, here's how the four patterns line up:

| Pattern | Root Cause | Core Fix |
| --- | --- | --- |
| Raw Query Escape Hatches | User input concatenated into a raw query string | Bind values via the replacement/parameter API |
| Identifier Injection | Column/table/sort input can't be parameterized | Allowlist allowed identifiers explicitly |
| Second-Order Injection | Stored data trusted because it was parameterized once | Parameterize every query, including ones using your own stored data |
| Literal Injection | Raw SQL smuggled into an otherwise ORM-managed call | Avoid `literal()`/`raw()`, use the ORM's operator API instead |

None of these four bugs takes a skilled attacker to find. Each one is just a value that never made it into the ORM's parameterization path.

What's worth making part of your workflow: parameterize values, allowlist identifiers, treat data pulled from your own database as no safer than a fresh request, and treat `literal()`/`raw()` calls as exactly as dangerous as a dedicated raw-query method (no matter how safe the surrounding code looks).

Fixing these gaps is only half the picture. Knowing how someone actually goes looking for them (and chains them together during a real assessment) is the half most developers never see.

::: info

If you're curious about that offensive perspective, this [<VPIcon icon="fas fa-globe"/>deep dive on SQL injection through ORMs](https://hackita.it/articoli/sql-injection-orm/) walks through exactly how these four patterns get exploited step by step in a live penetration test.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How ORMs Still Let SQL Injection Through (and How to Close the Gaps)",
  "desc": "A lot of developers assume that once they're on an ORM, SQL injection stops being their problem. But it doesn't disappear. It just relocates. ORMs like Sequelize, Prisma, TypeORM, and Knex parameteriz",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-orms-still-let-sql-injection-through-and-how-to-close-the-gaps.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
