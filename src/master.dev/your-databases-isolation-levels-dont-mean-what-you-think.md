---
lang: en-US
title: "Your Database’s Isolation Levels Don’t Mean What You Think"
description: "Article(s) > Your Database’s Isolation Levels Don’t Mean What You Think"
icon: iconfont icon-postgresql
category:
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - master.dev
  - data-science
  - sql
  - db
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Your Database’s Isolation Levels Don’t Mean What You Think"
    - property: og:description
      content: "Your Database’s Isolation Levels Don’t Mean What You Think"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/your-databases-isolation-levels-dont-mean-what-you-think.html
prev: /data-science/postgres/articles/README.md
date: 2026-06-22
isOriginal: false
author:
  - name: Durgesh Rajubhai Pawar
    url: https://master.dev/blog/author/durgesh/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/10134
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgres/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Your Database’s Isolation Levels Don’t Mean What You Think"
  desc="A tour through Read Committed, Repeatable Read, and Serializable, and why the same three words guarantee completely different things depending on which database you ask."
  url="https://master.dev/blog/your-databases-isolation-levels-dont-mean-what-you-think/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/10134"/>

Here’s a bug I think about a lot.

A hospital has a simple rule: at least one doctor has to be on call at all times. The scheduling app enforces it. Before it lets a doctor clock out, it counts how many doctors are currently on call, and if that number is greater than one, it lets them go.

One night, two doctors hit “clock out” at the same moment. Both requests run the count. Both see two doctors on call. Both decide it’s safe to leave. Both clock out. Now zero doctors are on call, and nobody got an error. The app did exactly what it was told. The database committed both changes without complaint.

If you read that code top to bottom, it looks correct. It only falls apart when two copies of it run at the same instant and the database quietly lets each one believe it’s the only one running. So which copy was wrong? Neither. They were both looking at a version of reality that stopped being true the moment the other one committed.

This is what database isolation is about: what one transaction is allowed to see while another transaction is in flight. And it turns out the rules are both more important and more slippery than most of us building web apps ever stop to check, because the knobs that control them have official, portable-sounding names that mean genuinely different things from one database to the next.

I didn’t come at this from the database side, for what it’s worth. I fell into it building [**local-first apps**](/smashingmagazine.com/architecture-local-first-web-development.md), the kind where the client keeps its own copy of the data in SQLite and syncs it back to a Postgres backend. The moment you try to reconcile an optimistic update on the client with whatever the server committed in the meantime, concurrency stops being some backend abstraction and becomes the entire problem. I watched optimistic client writes quietly clobber backend state more than once before it clicked that the default isolation level just wasn’t strict enough to catch the overlap. That sent me down a long rabbit hole, eventually into the open distributed-systems course material that backend folks take for granted, and the deeper I went the stranger the picture got.

I want to build this up properly, because the conclusion (“the names lie”) only lands once you see what’s underneath them. So let’s start with the basics and work toward the part where it gets strange.

---

## What Isolation Actually Is

A **transaction** is a group of database operations that you want treated as a single unit. Read a row, update it, insert a related row, commit. If any step fails, the whole thing rolls back and it’s as if nothing happened. That’s the part most people internalize early.

The part that gets less attention is what happens when two transactions run at the same time. Your database is almost never doing one thing at a time. It’s juggling dozens or thousands of concurrent transactions, and it has to decide, constantly, what each one is allowed to see of the others’ half-finished work.

That decision is isolation. It’s the “I” in [<VPIcon icon="fa-brands fa-wikipedia-w"/>ACID](https://en.wikipedia.org/wiki/ACID), and it’s the one people understand the least, partly because it’s invisible until it bites you. Atomicity and durability either work or they don’t. Isolation works *most* of the time, and then occasionally lets two doctors clock out at once.

The cleanest mental model would be: every transaction runs as if it had the whole database to itself, with everyone else politely queued behind it. That’s called serial execution, and it’s correct by definition. It’s also slow, because nothing runs concurrently. So real databases don’t do that. They run transactions in parallel and try to make it appear as if they are running them one at a time. How hard they try and what corners they cut are exactly what an isolation level configures.

---

## The Levels (Roughly)

The SQL standard defines four isolation levels, and in practice, almost everyone deals with three of them. Here’s what they’re supposed to mean, in plain terms. ([<VPIcon icon="iconfont icon-postgresql"/>PostgreSQL’s docs](https://postgresql.org/docs/current/transaction-iso.html) are a good reference if you want the formal version alongside this.)

**Read Committed.** Your transaction only ever sees data that has been committed by other transactions. It never sees another transaction’s half-written, not-yet-committed changes. This is the default in many databases. It sounds like a strong guarantee, and it’s weaker than it sounds, as we’ll see.

**Repeatable Read.** On top of the above, if you read a row twice in the same transaction, you get the same answer both times, even if someone else changed and committed that row in between. Your transaction effectively works against a frozen view of the data. The mechanism most databases use for this is called a *snapshot*: at some point near the start of your transaction, the database conceptually takes a photo of the entire database, and your reads run against that photo rather than against live data. This is the heart of [<VPIcon icon="fa-brands fa-wikipedia-w"/>MVCC](https://en.wikipedia.org/wiki/Multiversion_concurrency_control), multi-version concurrency control, where the database keeps multiple versions of each row around so different transactions can each read the version that was current as of their own snapshot.

**Serializable.** The strongest level. The database guarantees that the end result is *as if* the transactions had run one after another in some order, with no overlap at all. No anomalies of any kind. This is the one that would have stopped our two doctors.

There’s one more axis worth naming now, because it’ll come up constantly: **optimistic versus pessimistic**. A pessimistic system assumes conflicts will happen, so it locks things up front and makes you wait your turn. An optimistic system assumes conflicts are rare, lets everyone run freely, and then checks at the end whether anyone stepped on anyone else, aborting the losers if they did. Same goal, opposite strategy, very different performance, and as we’ll see, two databases can use the exact same isolation-level name while picking opposite strategies underneath it.

So that’s the map. Read Committed, Repeatable Read, Serializable, getting progressively stricter. Pick the one your app needs, set it, done.

Except that’s where it falls apart.

---

## Where the Names Came From

The trouble starts in 1992, with the SQL-92 standard.

The committee had a reasonable instinct. Rather than dictate *how* a database should implement isolation, they defined the levels by which bad things each one is required to *prevent*. They named three bad things, called concurrency phenomena, and built a grid:

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom |
| --- | --- | --- | --- |
| Read Uncommitted | Possible | Possible | Possible |
| Read Committed | Not Possible | Possible | Possible |
| Repeatable Read | Not Possible | Not Possible | Possible |
| Serializable | Not Possible | Not Possible | Not Possible |

A dirty read is reading another transaction’s uncommitted changes. A non-repeatable read is reading a row twice and getting different values because someone committed a change in between. A phantom is running the same query twice and getting a different *set* of rows because someone inserted or deleted matching rows in between.

The grid is clean and easy to teach. It’s also missing most of the interesting failures.

Look back at the hospital bug. Two transactions read the same data, each checked a business rule, and then each wrote to a *different* row, confident the rule still held. No dirty read happened. No non-repeatable read. No phantom. Every one of those three phenomena was prevented, and the invariant still shattered. The grid simply has no row for that failure.

It also says nothing about two transactions reading the same row, computing a new value from it, and blindly overwriting each other, which is the classic `balance = balance - 100` race that everyone ships eventually.

These aren’t exotic edge cases. They’re the normal shape of bugs in a busy web app. And in 1995, a group of researchers (Berenson, Bernstein, Gray, Melton, and the O’Neils, several of them from Microsoft Research) wrote a paper called [<VPIcon icon="iconfont icon-arxiv"/>“A Critique of ANSI SQL Isolation Levels”](https://arxiv.org/pdf/cs/0701157) that took the standard apart. Their core complaint: the phenomena were written in plain English, not formal logic, loose enough that you could read each one strictly or broadly and get different guarantees either way. Two vendors could read the same sentence, implement different things, and both claim compliance.

The paper cataloged the anomalies that the standard forgot to mention. A few worth knowing by name:

- **Dirty write.** One transaction writes a row, another overwrites it before the first commits. Even the weakest locking systems prevent this, and yet the standard never explicitly required it below Serializable.
- **Lost update.** Two transactions read the same row, each computes a new value, and each writes it back. The second write silently erases the first.
- **Read skew.** A transaction reads two related rows (say, a checking balance and a savings balance) and a concurrent transaction modifies one of them in between the two reads. The transaction results in a combination of values that never actually existed at any single point in time.
- **Write skew.** Two transactions read an overlapping set of rows, each verifies some constraint, and each writes to a *different* row. Both commit. The constraint is now violated, and because neither one touched the other’s rows, no lock-based conflict detector ever fired.

Write skew is the one that got our doctors. It’s worth sitting with because it’s the failure the simple grid can’t express and that snapshot-based databases are particularly vulnerable to. Two doctors, both on call. Both read the count (two, safe to leave). Both remove themselves, writing to different rows. No row-level conflict, both commits succeed, zero doctors on call, and the database never blinked.

Here’s the genuinely uncomfortable thing the 1995 paper proved. Snapshot Isolation, the MVCC technique that powers most production databases today, doesn’t fit anywhere in the SQL-92 grid. It prevents dirty reads, non-repeatable reads, and phantoms, which, by the grid’s own logic, puts it at the Serializable level. But it allows write skew, so it clearly isn’t actually Serializable. It lives in a gap that the standard never acknowledged existed. Snapshot Isolation and ANSI Repeatable Read aren’t even on the same axis: SI prevents phantoms but allows write skew, while ANSI RR (as originally conceived with locking) prevents write skew but allows phantoms. Neither is strictly stronger than the other, which is its own kind of mess when both can end up wearing the name “Repeatable Read.”

A few years later, [<VPIcon icon="fas fa-globe"/>Atul Adya’s MIT PhD thesis](http://pmg.csail.mit.edu/papers/adya-phd.pdf) cleaned this up by throwing out the English-prose approach entirely. Instead of a list of forbidden phenomena, Adya modeled transaction histories as graphs: each committed transaction is a node, and edges represent dependencies between them (one transaction reading another’s write, one overwriting another, one writing a new version of something another already read). A cycle in that graph is an anomaly. No cycles means true serializability. It’s the same idea the standard was reaching for, except expressed as math, with no room left for creative interpretation.

Under that model, the hierarchy finally makes sense. True serializability at the top. Below it, Serializable Snapshot Isolation (SSI), which watches for the specific dangerous patterns and aborts transactions to break them. Below that, plain Snapshot Isolation, which allows write skew. Then the weaker levels below that. The point that matters for the rest of this article: most production databases that advertise “Serializable” are actually sitting at one of those lower rungs, and the gap between where they sit and true serializability is exactly where the anomalies live that take months to notice.

So the standard left a void, vendors filled it with whatever engine they were already building, and then everyone stamped the standard’s names on the result. The names became a shared vocabulary where everyone assumes they’re discussing the same thing and nobody actually is.

This is the part that genuinely surprised me when I first dug in. I’d always assumed a standard meant a standard, that a level like “Serializable” named a fixed contract the way an HTTP status code does. It doesn’t. Because the spec defines these levels by what they forbid rather than what they guarantee, you can end up with two databases both advertising “Serializable” where one actually prevents write skew and the other quietly allows it through. I always thought a name like that pinned something down. It mostly pins down whatever the vendor decided to build.

Let me show you what that looks like, database by database, because the differences are wilder than you’d guess.

---

## PostgreSQL: Honest, Up to a Point

PostgreSQL deserves some credit before we start poking at it. Its documentation more or less tells you outright that its Repeatable Read is Snapshot Isolation, it warns you about serialization failures, and it links to the academic papers. Among the major databases, it’s the most upfront about what its levels actually do.

It still ships the misleading ANSI names on the tin, though, and those names still trip people up daily.

### The Default: Read Committed and the Shifting Floor

PostgreSQL defaults to Read Committed, and its Read Committed gives each *statement* its own snapshot, not each transaction. Run two identical `SELECT`s inside one transaction, and if someone commits a change between them, you’ll get two different answers.

```sql
-- Session A                          -- Session B
BEGIN;
SELECT balance FROM accounts
  WHERE user_id = 42;
-- Returns: 500
                                      UPDATE accounts SET balance = 200
                                        WHERE user_id = 42;
                                      COMMIT;
SELECT balance FROM accounts
  WHERE user_id = 42;
-- Returns: 200
COMMIT;
```

That’s not a bug. Read Committed only promises you won’t see *uncommitted* data. It promises nothing about consistency between statements in your own transaction.

The nastier behavior is in writes. When PostgreSQL runs an `UPDATE ... WHERE`, it evaluates the `WHERE` against its statement snapshot. If a target row is currently locked by another uncommitted transaction, it waits. Once that transaction commits, PostgreSQL doesn’t just proceed with what it originally matched. It runs a mechanism called `EvalPlanQual`, which fetches the freshly committed version of that one row and re-checks the `WHERE` against it. Every *other* row in the update is still evaluated against the original snapshot. So a single `UPDATE` ends up straddling two points in time.

::: code-tabs#sql

@tab:active Session A

```sql
-- accounts: (user_id=1, status='active', balance=1000)

-- Session A
BEGIN;
UPDATE accounts SET balance = 0
WHERE status = 'active';
-- Blocks, waiting for Session B
-- EPQ fires: re-checks the row.
-- status is now 'frozen', not 'active'.
-- Row no longer matches WHERE.
-- UPDATE affects 0 rows.
COMMIT;
```

@tab Session B

```sql
-- accounts: (user_id=1, status='active', balance=1000)

-- Session B
BEGIN;
UPDATE accounts SET status = 'frozen'
WHERE user_id = 1;
COMMIT;
```

:::

Session A meant to zero out every active account. User 1 was active when the statement began. But Session B froze that account and committed first, so EvalPlanQual re-checked the row, found it no longer matched, and skipped it. No error was raised. The `UPDATE` just silently affected zero rows. If your application doesn’t check the affected-row count after an update, you’ll never find out it happened.

### Repeatable Read: Stronger than Advertised, Weaker Than You Need

Move up to Repeatable Read, and PostgreSQL gives you a transaction-level snapshot. Every query in the transaction sees the database frozen at the first statement. No non-repeatable reads. No phantoms either, which is actually *stronger* than the ANSI standard requires, since ANSI Repeatable Read explicitly permits phantoms and PostgreSQL’s doesn’t.

You’d think that’s plenty. It isn’t, because PostgreSQL’s Repeatable Read is Snapshot Isolation, and Snapshot Isolation has that write-skew hole.

::: code-tabs#sql

@tab:active Session A

```sql
-- on_call_shifts: (doctor_id=1, on_call=true), (doctor_id=2, on_call=true)
-- Invariant: COUNT(*) WHERE on_call = true must be >= 1

-- Session A
BEGIN ISOLATION LEVEL
  REPEATABLE READ;
SELECT COUNT(*) FROM on_call_shifts
  WHERE on_call = true;
-- Returns: 2 (safe to leave)
UPDATE on_call_shifts SET on_call = false
  WHERE doctor_id = 1;
COMMIT;
-- Both succeed. Zero doctors on call.
```

@tab Session B

```sql
-- on_call_shifts: (doctor_id=1, on_call=true), (doctor_id=2, on_call=true)
-- Invariant: COUNT(*) WHERE on_call = true must be >= 1

-- Session B
BEGIN ISOLATION LEVEL
  REPEATABLE READ;
  SELECT COUNT(*) FROM on_call_shifts
    WHERE on_call = true;
  -- Returns: 2 (safe to leave)
  UPDATE on_call_shifts SET on_call = false
    WHERE doctor_id = 2;
  COMMIT;
-- Both succeed. Zero doctors on call.
```

:::

This is the hospital bug from the top of the article, in SQL. No error, no warning, no serialization failure. Both transactions read a consistent snapshot, both made a locally reasonable decision, both committed. They wrote to different rows, so PostgreSQL’s first-committer-wins conflict detection (which only fires on same-row write-write conflicts) never triggered.

### Serializable: Optimistic Until It Isn’t

PostgreSQL’s Serializable uses Serializable Snapshot Isolation, which was added in 9.1 and is based on work by Cahill, Röhm, and Fekete (their 2008 SIGMOD paper is worth a read if you want the theory). It’s still MVCC underneath. No read locks, no blocking readers. Instead, the engine tracks read-write dependencies using internal markers called `SIReadLock`s, and builds fragments of Adya’s dependency graph in shared memory from them. The name trips people up: an `SIReadLock` doesn’t block anyone or make a transaction wait. It’s a bookkeeping record the engine consults to spot dangerous patterns, not a pessimistic lock. Nothing about SSI ever blocks a reader.

The insight behind SSI is that a serialization anomaly under Snapshot Isolation can only happen when the dependency graph contains two consecutive read-write edges, a “dangerous structure,” with one transaction sitting at the pivot. When PostgreSQL spots that pattern, it aborts the pivot transaction:

```plaintext
ERROR: could not serialize access due to read/write dependencies among transactions
SQLSTATE: 40001
```

Run the doctor example at Serializable instead of Repeatable Read, and one of the two sessions gets shot down. The data stays correct. But your application now has a transaction that appeared to run normally and then got yanked out from under it at commit time. The first time this happens, it reads like a database bug, a transaction failing for no visible reason. It isn’t. SSI is doing exactly its job. You just weren’t expecting it to say no.

This is the part that catches people: PostgreSQL’s Serializable is *optimistic*. It doesn’t block you up front. It lets you run your whole transaction (reads, writes, business logic, all of it) and then kills you at the end if it detects a problem. Hold onto that, because MySQL’s Serializable does the exact opposite, and they share the word.

And if your app doesn’t catch `SQLSTATE 40001` and retry, your “Serializable” transactions are really just randomly-failing transactions. It gets worse under memory pressure, where PostgreSQL coarsens its fine-grained dependency tracking to page or table granularity, which *increases* false-positive aborts. You can get killed for a conflict that doesn’t mathematically exist at the row level.

Here’s PostgreSQL’s behavior next to what the standard claims:

| Level | ANSI Standard Says | PostgreSQL Actually Does |
| --- | --- | --- |
| Read Uncommitted | Allows dirty reads | Silently upgrades to Read Committed. Dirty reads are impossible in MVCC. |
| Read Committed | Prevents dirty reads only | Statement-level snapshots. EPQ re-evaluates `WHERE` against latest committed rows during writes. |
| Repeatable Read | Prevents dirty + non-repeatable reads. Allows phantoms. | Transaction-level snapshot (SI). Prevents phantoms too. Allows write skew. |
| Serializable | Full serial equivalence | SSI. Optimistic. Aborts on dangerous structures. Requires app-level retry. |

The docs are genuinely good. The names on the tin still create a false sense of portability that catches teams during migrations.

---

## MySQL: The Default Nobody Chose

MySQL’s default isolation level is Repeatable Read. Say that out loud, because most MySQL developers have never actually checked. They inherited it. It’s been the InnoDB default since InnoDB became the default engine, and it behaves like nothing in any textbook.

At Read Committed, InnoDB is reasonable: statement-level MVCC snapshots for reads, record-only locks for writes, no gap locks. Less locking, more phantom exposure, sensible tradeoffs. That’s not where the trouble is. The trouble is in the default.

### Two Brains, One Transaction

At Repeatable Read, InnoDB runs two different concurrency-control systems at once. Plain `SELECT` statements use a transaction-level MVCC snapshot, frozen at the first read and stable for the whole transaction. Normal. But `SELECT ... FOR UPDATE`, `SELECT ... FOR SHARE`, and all DML use *next-key locking*, an index-based locking scheme that combines a record lock with a gap lock on the space just before the record. Those locking operations don’t read from the snapshot at all. They read the latest committed data and lock it physically.

So inside one transaction, one kind of read sees a frozen point in time and another sees whatever’s committed right now.

```sql
-- orders has 3 rows: order_id 1, 2, 3, all status='pending'.
-- Session B inserts order_id 4 (pending) and commits AFTER
-- Session A's first read but BEFORE its locking read.

-- Session A
BEGIN;
SELECT COUNT(*) FROM orders WHERE status = 'pending';
-- Returns: 3 (MVCC snapshot from transaction start)

-- ... Session B inserts order_id=4, commits ...

SELECT COUNT(*) FROM orders WHERE status = 'pending' FOR UPDATE;
-- Returns: 4 (reads current committed data, bypasses snapshot)
```

Three, then four, same transaction, same `WHERE`. The first read used the snapshot. The second, because it said `FOR UPDATE`, abandoned the snapshot, read the live state, and locked the rows. If a developer counts inventory with a plain `SELECT`, decides there’s stock, then tries to lock it with `SELECT ... FOR UPDATE`, they can find rows that weren’t there a line ago, or find that rows they counted are gone. The mental model of “Repeatable Read means my reads are stable” is correct exactly half the time, for the non-locking half.

### Write Skew Here Depends on Three Words

That split creates a strange conditional vulnerability. Whether write skew can hit you at MySQL’s Repeatable Read depends entirely on *how* you read.

Check a constraint with a plain `SELECT` and then write with an `UPDATE`, and the check used the snapshot while the write used locking, with no serialization between the two concurrent transactions. Write skew slides through. Check it with `SELECT ... FOR UPDATE` instead, and the next-key locks physically block concurrent modifications to the rows and gaps you read, so write skew is prevented. Not by the isolation level, but by the lock you happened to request by hand.

Same isolation level either way. Same table, same business logic. Whether your invariant holds depends on whether you typed three extra words.

### The Gap-Lock Deadlock Machine

Next-key locks prevent phantoms by locking the gaps between index records. Gap locks are “purely inhibitive,” meaning they only block insertions, and crucially, they’re *compatible with each other*: two transactions can hold a gap lock on the exact same gap with no conflict. The conflict only shows up when both try to insert into that gap, because an insert needs an insert-intention lock, and insert-intention locks *do* conflict with other transactions’ gap locks.

```sql
-- Session A                          -- Session B
BEGIN;                                BEGIN;
SELECT \* FROM orders
  WHERE order_id = 999
  FOR UPDATE;
-- Row doesn't exist.
-- Gap lock acquired on the gap
-- containing position 999.                                      SELECT \* FROM orders
                                        WHERE order_id = 999
                                        FOR UPDATE;
                                      -- Same gap lock. Compatible. Acquired.
INSERT INTO orders (order_id, ...)
  VALUES (999, ...);
-- Needs insert-intention lock.
-- Blocked by Session B's gap lock.
                                      INSERT INTO orders (order_id, ...)
                                        VALUES (999, ...);
                                      -- Needs insert-intention lock.
                                      -- Blocked by Session A's gap lock.
-- DEADLOCK: ERROR 1213 (40001)
```

Neither transaction touched an existing row. Neither has any real business conflicting with the other. They deadlock anyway. This is the everyday check-then-insert pattern: upserts, idempotent writes, anything that queries for a missing record and then creates it. MySQL’s bug tracker is full of these (#25847, #43576, #77209, #96748, #99138), all verified, closed, and architecturally permanent, because the gap-lock compatibility rules make them inevitable and InnoDB’s maintainers correctly call it intended behavior. Your options are all unpleasant: drop to Read Committed and lose phantom protection, use `LOCK TABLES` and lose concurrency, or build retry logic into every write path. I’ve watched teams burn weeks on these before realizing they’re baked into the architecture.

### Serializable: The Heavy Hammer

Set MySQL to Serializable, and InnoDB stops being subtle. Every plain SELECT silently becomes a shared locking read, the equivalent of appending FOR SHARE (the modern syntax since 8.0; older versions wrote it LOCK IN SHARE MODE), as long as autocommit is off. That’s strict two-phase locking. Reads block writes, writes block reads, true serializability, formally correct, and depending on your read/write mix and contention, the throughput hit can be severe.

The contrast with PostgreSQL is total, and this is the thing I most want you to remember. PostgreSQL’s Serializable says, “run freely, I’ll abort you if something goes wrong.” MySQL’s Serializable says, “nobody moves until I say so.” One is optimistic, one is pessimistic. Completely different performance profiles, completely different demands on your application code, identical word in the config.

### One More Trap, and It Isn’t About Correctness

InnoDB implements MVCC through undo logs, old row versions kept around so snapshot reads can reconstruct past states. At Repeatable Read, a transaction’s snapshot lasts its whole lifetime, and as long as it’s open InnoDB can’t purge any undo entries created after the snapshot began. Run a long analytical query against a busy table at Repeatable Read and the history list length starts climbing, undo tablespace bloats, purge threads fall behind, and queries across the *entire instance* degrade. Your read-only reporting query just became a write-path bottleneck, not because it was wrong, but because InnoDB can’t garbage-collect around it.

---

## Oracle: The Missing Level

Oracle supports two isolation levels. Two. Read Committed and Serializable. That’s the whole menu.

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- ORA-02179: valid options: ISOLATION LEVEL { SERIALIZABLE | READ COMMITTED }
```

Try to set Repeatable Read and Oracle doesn’t silently upgrade it or map it to something close. It throws an error and stops. The third row of the ANSI table just doesn’t exist here. Oracle’s implicit argument is that its Read Committed is strong enough and its Serializable covers everything above it, so the middle level is redundant. Defensible, right up until your app needs to run on PostgreSQL next year and an isolation level you never thought about decides whether your data is correct.

### Read Committed and the Invisible Restart

Oracle’s Read Committed uses statement-level snapshots built from undo segments, keyed to the System Change Number (SCN) at statement start. Consistent reads, no dirty data, standard so far. The divergence is in writes. When an Oracle `UPDATE` hits a row that’s been modified and committed by another transaction since the statement’s snapshot was taken, it doesn’t do PostgreSQL’s localized EvalPlanQual trick. It restarts the entire statement.

It rolls back every change the statement has made so far to a hidden internal savepoint, then re-runs the whole thing, this time in `SELECT FOR UPDATE` mode so it locks rows as it goes and can’t hit the same conflict twice. The developer sees none of this. No error, no warning, no sign the statement just ran twice.

That last part matters more than it sounds, because triggers fire again. All of them. If your `UPDATE` touches 10,000 rows with a per-row trigger on each, and a conflict shows up on row 10,001, Oracle restarts and the triggers re-fire on all 10,001. If those triggers send email via `UTL_SMTP`, the email goes out twice. If they mutate PL/SQL package variables, those variables are now corrupted, because package state doesn’t roll back with the savepoint. If they write files via `UTL_FILE`, the writes from the first attempt are already on disk. Tom Kyte’s advice on this was blunt: expect the restart, and stop using triggers, and if you must use them, be very, very careful.

PostgreSQL’s approach is weird but localized; it distorts one row in the snapshot. Oracle’s is thorough but re-runs the entire statement and everything attached to it. Same SQL, same starting state, same concurrent change, different final result.

### Oracle’s “Serializable” is Snapshot Isolation Wearing a Name Tag

Oracle’s Serializable uses a transaction-level snapshot from undo segments. All reads see the database as of transaction start. When two transactions try to modify the *same row*, Oracle enforces first-committer-wins and throws `ORA-08177: can't serialize access for this transaction`.

And that’s all it does. Same-row write-write conflicts are the entire detection surface. No dependency tracking, no serialization-graph analysis, no anti-dependency detection. If two transactions read overlapping data and write to *different* rows, Oracle sees no conflict, both commit, and the invariant breaks. Run the doctor scenario on Oracle at Serializable:

```sql
-- Session A (SERIALIZABLE)            -- Session B (SERIALIZABLE)
SELECT COUNT(*) FROM on_call_shifts
  WHERE on_call = 1;
-- Returns: 2
                                       SELECT COUNT(*) FROM on_call_shifts
                                         WHERE on_call = 1;
                                       -- Returns: 2
UPDATE on_call_shifts SET on_call = 0
  WHERE doctor_id = 1;
                                       UPDATE on_call_shifts SET on_call = 0
                                         WHERE doctor_id = 2;
COMMIT;                                COMMIT;
-- Both succeed. No ORA-08177.
-- Zero doctors on call.
```

No error. Oracle’s “Serializable” watched two transactions break a constraint and said nothing, because they wrote to different rows. This isn’t a debatable reading, either. [<VPIcon icon="iconfont icon-arxiv"/>Berenson et al. (1995)](https://arxiv.org/pdf/cs/0701157), [Fekete et al. (2005)](https://dl.acm.org/doi/10.1145/1071610.1071615), [Adya’s thesis](http://pmg.csail.mit.edu/papers/adya-phd.pdf), and the [Hermitage project (<VPIcon icon="iconfont icon-github"/>`ept/hermitage`)](https://github.com/ept/hermitage) all classify Oracle’s maximum isolation level as Snapshot Isolation, not serializability. It behaves much closer to SI than what an engineer expects when they hear the word “Serializable,” and that gap is where a lot of migration surprises come from.

### Why Oracle Gets Away With It

Most of the workloads Oracle was built for are OLTP transactions that touch one or two rows at a time, and for single-row modifications, Snapshot Isolation and true serializability produce identical results. The write-skew gap only shows up in multi-row read-then-write patterns: check a constraint across several rows, then modify one. That pattern was uncommon in the enterprise batch-processing world, which Oracle dominated for decades. It’s everywhere in modern web apps.

### The Migration Trap

Because the label stays the same, but the behavior underneath it doesn’t, moving between databases while keeping the “same” isolation level is where teams get burned. The direction matters:

| Migration Path | What Happens |
| --- | --- |
| Oracle → PostgreSQL (keeping “Serializable”) | PostgreSQL’s SSI is *stricter*. Transactions Oracle silently allowed now get aborted with `SQLSTATE 40001`, and your app probably has no retry logic because Oracle never required it. Expect cascading failures until you add one. |
| Oracle → MySQL (keeping “Serializable”) | MySQL uses S2PL, so every `SELECT` takes a shared lock. Depending on the workload, throughput can drop substantially. |
| PostgreSQL → Oracle (keeping “Serializable”) | Oracle is *weaker*. Write skew anomalies PostgreSQL caught now pass through silently. Everything looks like it’s working, which is almost worse than an obvious failure. |

If you’re planning a migration, this is where you start. The level names line up across vendors. The behavior behind them is where things go sideways.

---

## DB2: The One That Followed the Spec

IBM did the thing nobody else did. They actually built what the ANSI committee described.

DB2 uses lock-based concurrency control. No MVCC, no snapshots, no creative reinterpretation. Four isolation levels mapped to the standard with a directness that borders on stubborn:

| DB2 Level | ANSI Equivalent | What It Locks |
| --- | --- | --- |
| Uncommitted Read (UR) | Read Uncommitted | Almost nothing. Dirty reads allowed. |
| Cursor Stability (CS) | Read Committed | Locks the row under the cursor, releases it when the cursor moves. |
| Read Stability (RS) | Repeatable Read | Locks all rows *returned* by the query, holds to commit. Gaps unlocked, so phantoms possible. |
| Repeatable Read (RR) | Serializable | Locks all rows *evaluated* by the query, not just the matches. Scan 10,000 to find 10? All 10,000 locked. |

Yes, DB2’s “Repeatable Read” is its Serializable. Even DB2’s naming is confusing. But the behavior is honest. At the RR level, it locks every index entry the engine touches during evaluation, including the ranges between them, which gives you true serializability through pure locking. Write skew is impossible because the shared locks taken during the constraint-checking read physically block any concurrent write to those rows. The doctor scenario can’t happen; DB2 makes the second transaction wait until the first commits, then lets it proceed against an up-to-date view.

The cost is exactly what you’d expect. Under high concurrency, those row locks pile up, and when they blow past the configured memory limits (`locklist` and `maxlocks`), DB2 triggers *lock escalation*: it drops all the individual row locks and replaces them with a single table-level lock. Your carefully concurrent system just became a single-threaded queue, and every other transaction that touches that table blocks until the escalated lock is cleared.

IBM clearly felt the pain because in DB2 9.7, they added “currently committed” semantics, which reads almost like an apology. Under Cursor Stability, a reader that hits a row locked by a writer no longer waits; DB2 reconstructs the last committed version of the row from the transaction log so the reader can proceed with stale-but-committed data. That’s MVCC by another name, bolted onto a locking engine, with extra log I/O and CPU for the reconstruction.

DB2 is the proof that the ANSI model *can* be implemented faithfully. The locks work, the guarantees hold, and write skew is prevented mechanically rather than optimistically. And every other major vendor looked at that throughput cost and chose a different path. The spec was correct. Reality was just too expensive to follow it literally.

---

## The Truth Table

Now that you’ve seen each one, here’s the whole mess in one place. This is the table I’d actually keep open during an architecture review.

| Behavior | PostgreSQL | MySQL/InnoDB | Oracle | DB2 |
| --- | --- | --- | --- | --- |
| **Default isolation level** | Read Committed | Repeatable Read | Read Committed | Cursor Stability (≈ Read Committed) |
| **Concurrency control** | MVCC (heap-based) | MVCC + next-key locking hybrid | MVCC (undo segments) | Lock-based (pure) |
| **RC: snapshot scope** | Per-statement | Per-statement | Per-statement | Cursor-level row locks |
| **RC: concurrent UPDATE conflict** | EvalPlanQual, re-evaluates WHERE on the changed row only | Semi-consistent read from undo log | Statement restart in SELECT FOR UPDATE mode | Blocks until lock released |
| **Repeatable Read: exists?** | Yes | Yes (the default) | **No. ORA-02179.** | Yes (called “Read Stability”) |
| **RR: mechanism** | Transaction-level MVCC snapshot (SI) | MVCC snapshot for reads, next-key locks for writes | — | Row locks on returned rows, held to commit |
| **RR: prevents phantoms?** | Yes (stronger than ANSI) | Yes | — | No. Gaps not locked. |
| **RR: prevents write skew?** | **No** | **Only with SELECT…FOR UPDATE.** Plain SELECT, no. | — | Yes (locks serialize reads) |
| **Serializable: mechanism** | SSI (optimistic, graph-based) | S2PL (every SELECT locks) | Snapshot Isolation | S2PL (locks all evaluated rows) |
| **Serializable: formally serializable?** | Yes | Yes | **No. Proven by Berenson, Fekete, Adya, Hermitage.** | Yes |
| **Serializable: blocks readers?** | No | Yes | No | Yes |
| **Serializable: needs app-level retry?** | Yes (`40001`) | No (blocks instead) | Only on write-write (`ORA-08177`) | No (blocks instead) |
| **Write skew at highest level?** | Prevented (SSI aborts pivot) | Prevented (S2PL blocks) | **Allowed. Undetected.** | Prevented (locks block) |

Look at the Serializable rows. Four databases, four different strategies. PostgreSQL runs you optimistically and aborts after the fact. MySQL locks everything up front and makes you wait. Oracle hands you Snapshot Isolation with a Serializable label. DB2 locks even more aggressively than MySQL. You could fairly argue that none of them are implementing the same feature.

Then look at Oracle’s Repeatable Read cell. It’s not “different,” it’s *absent*. Any ORM that lets you pick `REPEATABLE_READ` from a dropdown will generate SQL that crashes on Oracle with `ORA-02179`. And MySQL’s Repeatable Read, the one running by default on basically every MySQL install on earth, lets a plain `SELECT` and a `SELECT ... FOR UPDATE` in the same transaction return contradictory results. That’s the default behavior of one of the most widely deployed databases.

The cell I keep coming back to is Oracle’s write skew row. Every other vendor either prevents write skew at its maximum level or clearly operates below Serializable and is honest about it. Oracle’s maximum isolation level is Snapshot Isolation, while it calls itself Serializable, which is the single most expensive naming decision in this whole table. And it points at the real lesson: if you pick an isolation level by *name*, you’re choosing based on what a vendor’s marketing department decided to call their engine. If you pick by *behavior*, by asking “does this prevent write skew on this table,” you’re making a decision you can actually verify.

---

## When This Breaks in Production

Before the new examples, it’s worth closing the loop on the hospital bug we opened with, because the same SQL produces four different outcomes depending on where you run it:

- **PostgreSQL Repeatable Read:** both commit. Write skew. No error.
- **Oracle “Serializable”:** both commit. Same result, since Oracle’s SI doesn’t detect disjoint-row conflicts.
- **PostgreSQL Serializable (SSI):** one transaction aborts with `could not serialize access due to read/write dependencies`. The data stays correct, but only if the app retries the aborted transaction.
- **MySQL Serializable (S2PL):** the reads take shared locks, the writes need exclusive locks, so one transaction blocks until the other commits. No write skew, and also no concurrency.

Same schema, same constraint, same statements. Only two of the four actually preserve the invariant. That’s the whole problem in one example. Now here are two more that actually shipped, because the abstract version never quite lands until you see the invoice.

### The Checkout That Paid Twice and Shipped Nothing

E-commerce platform, MySQL, default Repeatable Read. The checkout read a product’s available stock, validated that it was sufficient, decremented it, and created an order. Standard stuff, millions of transactions a day.

```sql
BEGIN;
SELECT available_stock FROM products WHERE product_id = 7042;
-- Returns: 1
-- App logic: 1 >= 1, proceed
UPDATE products SET available_stock = available_stock - 1
  WHERE product_id = 7042;
INSERT INTO orders (product_id, user_id, quantity)
  VALUES (7042, @user_id, 1);
COMMIT;
```

Two users hit checkout on the last unit at the same instant. Both read `available_stock = 1` from their snapshots. Both passed the app-level check. Both issued the `UPDATE`. On MySQL Repeatable Read the second `UPDATE` blocks waiting for a record lock, and when the first commits, the second decrements the *already-decremented* row. Stock goes to -1. Two orders, one unit.

The fix depends on the database. On MySQL, swapping the `SELECT` for `SELECT ... FOR UPDATE` serializes the reads, so the second transaction blocks on the read and sees the updated stock. On PostgreSQL at Repeatable Read, the second `UPDATE` would hit a write-write conflict and abort with `40001`, and the app would need to catch and retry. The [<VPIcon icon="fas fa-globe"/>Stanford ACIDRain paper (SIGMOD 2017)](https://bailis.org/papers/acidrain-sigmod2017.pdf) found this exact class of bug across 12 self-hosted e-commerce platforms, 22 critical vulnerabilities, nearly all rooted in the same thing: applications trusting their `SELECT` results under the weak default isolation almost everything ships with, rather than wrapping the check-then-act logic in a serializable transaction.

### The Migration That Exposed Eight Years of Quiet Wrongness

Enterprise SaaS, Oracle for eight years, working fine, or at least nobody had caught it not working. The team migrated to PostgreSQL and mapped the config straight across: Oracle Serializable to PostgreSQL Serializable. Reasonable on its face.

It looked good for a few days. Then, during a normal traffic spike, the logs started trickling `SQLSTATE 40001`. The app had no retry logic anywhere because, over eight years, Oracle had never once aborted a transaction due to a serialization failure. There was no dramatic 3 a.m. outage. There was a week of confused support tickets about “random errors” saving forms, and a background sync job that quietly failed whenever it ran alongside the main batch process. PostgreSQL’s SSI was catching write skew and killing pivot transactions exactly as designed. Oracle had simply been letting those same conflicts go unchecked for years.

The team’s options were all bad: drop to Repeatable Read and re-enable the write-skew bugs Oracle had been silently allowing (the data was probably already subtly wrong and nobody had noticed), build retry logic into every transactional path (a multi-sprint slog across dozens of services), or wrap everything in `SELECT ... FOR UPDATE` to serialize by hand (which is roughly what Oracle had been doing internally during its statement restarts, except invisibly).

The hardest part of that postmortem wasn’t technical. It was the meeting where someone asked whether the Oracle app had *ever* actually been correct. Because if Oracle’s Serializable is really Snapshot Isolation, and Snapshot Isolation allows write skew, then the app had potentially been producing subtly wrong results for years, silently and infrequently enough that nobody flagged it. The migration didn’t introduce new bugs. It exposed old ones that had been hiding behind a misleading label.

---

## Your ORM Won’t Save You

If I have one strong opinion in this whole piece, this is it: ORMs hand you a dangerous false sense of security here. The pitch is portability. Write your code once, swap the connection string, deploy anywhere. That holds for schema generation, query building, and basic CRUD, and it falls apart completely at the transaction isolation layer, which is exactly the layer web developers are least likely to be watching. A developer slaps a standard framework annotation on a function, assumes the framework normalized the database’s behavior, and moves on. It didn’t normalize anything. It passed the buck straight to whatever wildly different default the vendor happens to ship.

Spring’s `@Transactional(isolation = Isolation.REPEATABLE_READ)` just sends `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ` to the JDBC connection. No abstraction, no translation, no vendor awareness. On PostgreSQL, you get Snapshot Isolation, on MySQL you get the MVCC/next-key hybrid, and on Oracle you get `ORA-02179` and a stack trace. Your “portable” annotation just crashed on one of the world’s most popular databases.

Hibernate’s `@Version` optimistic locking detects same-row conflicts, but write skew is about *different* rows. The version column on Doctor A’s row doesn’t increment when Doctor B’s row changes, so Hibernate can’t see a constraint violation that spans two entities. Rails ActiveRecord and Django both default to whatever the database uses, and almost nobody overrides it, so they run happily on a default neither framework explains. Prisma’s `$transaction()` uses the database default too, and its interactive transaction API layers a server-side timeout on top of that, and its query generator fires separated async queries through the Node event loop, which actually *widens* the window for concurrent interleavings compared to synchronous execution.

So here’s one annotation, `@Transactional(isolation = SERIALIZABLE)`, across three databases:

| Database | What Happens |
| --- | --- |
| PostgreSQL | SSI. Optimistic. May abort with `40001`. App needs retry logic. |
| MySQL | S2PL. Every read takes a shared lock. Throughput impact can be significant. |
| Oracle | Snapshot Isolation. Write skew allowed. Data can silently diverge. |

One annotation, three behaviors, and the framework warns you about none of it.

And your tests won’t catch the difference, because integration tests usually run on a single connection. No concurrency means no interleaving means no isolation anomalies. Worse, a lot of test setups wrap each test in a transaction they roll back for cleanup, which masks isolation behavior entirely. The only way to catch write skew or lost updates is concurrent load testing with deliberately overlapping transactions against shared constraints, run against each backend you support, and almost nobody builds that into CI. So the bugs ship.

To be fair to the tools, the ORM isn’t really the villain here. It’s doing its job, abstracting the database, and the false security is something we project onto it. The deeper problem is that isolation semantics are one of the things that genuinely resist abstraction. These aren’t implementation details behind a clean interface; they’re architectural divergences that decide whether your data is correct, and the ORM sits right between you and them. I don’t actually think this is fixable in a generic way, since an ORM would have to encode vendor-specific isolation knowledge, which defeats the whole point of being vendor-agnostic. But the blind spot is real, and pretending the annotation closed it is how you ship the bug.

---

## What To Do About It

None of this means you should panic or rip out your database. It means a handful of habits that, in my experience, separate teams that get surprised in production from teams that don’t.

### 1. Find Out Your Default (Right Now)

```sql
-- PostgreSQL
SHOW default_transaction_isolation;

-- MySQL
SELECT @@transaction_isolation;

-- Oracle
-- No session query. It's Read Committed, always,
-- unless someone set it explicitly, which almost nobody does.
```

If you had to look that up, you’ve been deploying on faith. PostgreSQL defaults to Read Committed, MySQL to Repeatable Read, and those aren’t the same thing, and neither is quite what most developers picture.

### 2. Stop Choosing Isolation Levels by Name

Don’t walk into a design review and say “we need Repeatable Read.” Say “we need to prevent write skew on `on_call_shifts`” or “we need phantom protection for range scans on `reservations`.” Then look up what your specific database needs to deliver that:

| You need… | PostgreSQL | MySQL/InnoDB | Oracle |
| --- | --- | --- | --- |
| Prevent lost updates on same row | Read Committed (EPQ handles it) | Read Committed (record locks) | Read Committed (statement restart) |
| Prevent phantoms in reads | Repeatable Read | Repeatable Read (default) | Not available without manual locking |
| Prevent write skew | Serializable (SSI) | `SELECT...FOR UPDATE` at any level | `SELECT...FOR UPDATE` at any level |
| True serializability | Serializable | Serializable (S2PL, expect a throughput hit) | Not available. Period. |

### 3. If You Run PostgreSQL at Serializable, Retry Logic is Not Optional

`SQLSTATE 40001` will happen. Not might, will. Build the retry loop before the first incident, not after.

Here’s some pseudo-code to explain (no particular language, just the idea):

```js
function executeWithRetry(txnFn, maxRetries = 5):
    for attempt in 1..maxRetries:
        try:
            BEGIN ISOLATION LEVEL SERIALIZABLE
            result = txnFn()
            COMMIT
            return result
        catch error:
            if error.code == '40001' AND attempt < maxRetries:
                ROLLBACK
                sleep(random(0, 2^attempt \* 10) ms)  // jitter + backoff
                continue
            throw error
```

It’s a function, not a framework, and you can adapt it to your language in ten minutes. The details that matter: retry the *entire* transaction from `BEGIN`, not just the failed statement; use jittered exponential backoff so concurrent retries don’t immediately collide again; and cap the retries, because infinite retries under contention will eat your connection pool.

### 4. `SELECT ... FOR UPDATE` is Your Portable Escape Hatch

When you need the rows you read to stay put until you write, lock them explicitly. This works on every vendor. The doctor fix is one line:

```sql
SELECT COUNT(*) FROM on_call_shifts
  WHERE shift_date = '2024-01-15' AND on_call = true
  FOR UPDATE;
```

Now the second transaction blocks until the first commits and reads the updated count, and write skew is prevented. The catch is that you’ve converted optimistic concurrency to pessimistic: throughput drops and deadlock probability goes up, especially on MySQL where gap locks on the `FOR UPDATE` path can deadlock with concurrent inserts. Use it surgically, on the specific queries protecting critical invariants, not as a blanket default.

### 5. Test Concurrently

Your single-connection test suite is blind to all of this. Write an actual correctness test: open two connections, start a transaction on each, interleave reads and writes against a shared constraint, commit both, and assert the invariant survived. Again, some pseudo to explain the concept:

```js
conn_a = connect(); conn_b = connect()
conn_a.execute("BEGIN ISOLATION LEVEL REPEATABLE READ")
conn_b.execute("BEGIN ISOLATION LEVEL REPEATABLE READ")
conn_a.execute("SELECT COUNT(*) FROM on_call_shifts WHERE on_call = true")
conn_b.execute("SELECT COUNT(*) FROM on_call_shifts WHERE on_call = true")
conn_a.execute("UPDATE on_call_shifts SET on_call = false WHERE doctor_id = 1")
conn_b.execute("UPDATE on_call_shifts SET on_call = false WHERE doctor_id = 2")
conn_a.execute("COMMIT"); conn_b.execute("COMMIT")
assert count_on_call() >= 1  // Fails on PostgreSQL RR and Oracle Serializable
```

This isn’t a load test. It’s a logic test that happens to need concurrency. If that assert fails on your database, your production code has the same bug. You just never tested for it.

### 6. Document the Isolation Contract, and Audit Before You Migrate

Every transaction that touches a real invariant should say, in a comment right above it rather than in a Confluence page nobody opens, three things: what isolation level it expects, what anomalies it’s protected against, and what it knowingly tolerates. Make it a PR checklist item. And if you ever move databases, every transactional path needs an isolation audit against the truth table, flagging every place the target is stricter (new aborts your app can’t handle) or weaker (anomalies that used to be caught now slide through). It’s tedious. It’s also the difference between a smooth migration and two weeks chasing ghost errors in production.

---

## The Deeper Problem

Step back and this stops being only a database story. It’s a specification design failure, and the same pattern shows up all over software whenever we define a thing by what it *prevents* instead of what it *provides*.

The ANSI committee defined Serializable as “prevents dirty reads, non-repeatable reads, and phantom reads.” That’s a negative definition. It never says what Serializable *is*: what mechanism it uses, what mathematical property it guarantees, how it behaves under contention. It’s like defining a lock as “a thing that prevents unauthorized entry.” Technically true, and it could be a deadbolt, a padlock, or a stern note taped to the door.

The same disease shows up elsewhere. “Thread-safe” could mean it won’t crash under concurrent calls, or won’t deadlock, or is fully wait-free, and nobody agrees which. OAuth scopes are supposed to bound what a token can do, but the line between `read:user` and `read:profile` is whatever each API decided that day. These are negative-space specs: they describe a shape by what’s around it and let implementations fill the middle however they like. Compare HTTP status codes, which got it right. `200` means the request succeeded, `404` means the resource isn’t there, `503` means the server can’t handle it right now. Positive, mechanical definitions, tight enough that no vendor reads `404` as “the resource exists but I’d rather not show it to you.”

This is also exactly why [<VPIcon icon="fas fa-globe"/>Kyle Kingsbury’s Jepsen project](https://jepsen.io/) exists. Vendor documentation is marketing until proven otherwise, and Jepsen tests what databases *actually do* under network partitions, clock skew, and crashes, then compares that to the docs. The results are often ugly, and they’re not edge cases, they’re the delta between what a vendor says and what its storage engine does. TiDB couldn’t lock rows that didn’t exist yet, so write skew slipped through even on reads guarded by `SELECT ... FOR UPDATE`. YugabyteDB hit a race where, just after a master leader election, a freshly elected node briefly advertised an empty capabilities set, and in that window serializable transactions could exhibit the exact anti-dependency anomalies serializability is supposed to rule out.

The newer databases are learning. CockroachDB defaults to Serializable and documents that it’s SSI, no ambiguity about mechanism. Spanner abandoned the ANSI taxonomy entirely for “external consistency,” a term that describes precisely what it guarantees. YugabyteDB explicitly separates its Snapshot Isolation and Serializable modes, with distinct documentation for each. The legacy vendors carry the original sin: PostgreSQL is the closest to honest and still calls Snapshot Isolation “Repeatable Read,” MySQL slaps that name on a mechanism that matches no textbook, and Oracle uses “Serializable” for something academics have repeatedly proven is not serializable. The naming nightmare isn’t going away for the databases that already shipped it. But the trend is good, and the databases built in the last decade increasingly define isolation by what they *do* rather than by which anomalies they happen not to allow.

---

## The Names Were Never Enough

Go back to the doctors one last time. Every isolation level in this article is something some production system, probably yours, probably mine, trusts to keep data correct. And that trust is almost always placed in a *name* rather than a verified behavior.

The fix isn’t switching databases. It’s giving up the assumption that a name tells you what the engine does. Read the implementation docs, not just the feature page. Run the [Hermitage tests (<VPIcon icon="iconfont icon-github"/>`ept/hermitage`)](https://github.com/ept/hermitage) against your specific version (those are Martin Kleppmann’s, and if you want the full book-length version of everything here, his *Designing Data-Intensive Applications* is the one I keep going back to, the isolation chapter especially). Write the concurrent test that exercises your real invariants. Write down what you’re relying on, and confirm your database actually delivers it.

I’m not saying every app needs Serializable. Most don’t. But every app needs the engineer behind it to know what its isolation level actually guarantees, and, more importantly, what it doesn’t. That part was never optional. We just got used to pretending it was, because the name sounded like enough.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Your Database’s Isolation Levels Don’t Mean What You Think",
  "desc": "A tour through Read Committed, Repeatable Read, and Serializable, and why the same three words guarantee completely different things depending on which database you ask.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/your-databases-isolation-levels-dont-mean-what-you-think.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
