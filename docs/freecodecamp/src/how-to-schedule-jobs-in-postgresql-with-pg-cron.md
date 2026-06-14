---
lang: en-US
title: "How to Schedule Jobs in PostgreSQL with pg_cron"
description: "Article(s) > How to Schedule Jobs in PostgreSQL with pg_cron"
icon: iconfont icon-postgresql
category:
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Schedule Jobs in PostgreSQL with pg_cron"
    - property: og:description
      content: "How to Schedule Jobs in PostgreSQL with pg_cron"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-schedule-jobs-in-postgresql-with-pg-cron.html
prev: /data-science/postgresql/articles/README.md
date: 2026-06-18
isOriginal: false
author:
  - name: iyiola
    url: https://freecodecamp.org/news/author/iyiola/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4f2b2004-5710-43db-9db9-0603bf757d9b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Schedule Jobs in PostgreSQL with pg_cron"
  desc="Every backend system eventually needs something to run on a schedule. Old sessions need deleting, summary tables need rebuilding, materialized views need refreshing, and maintenance tasks need to happ"
  url="https://freecodecamp.org/news/how-to-schedule-jobs-in-postgresql-with-pg-cron"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4f2b2004-5710-43db-9db9-0603bf757d9b.png"/>

Every backend system eventually needs something to run on a schedule. Old sessions need deleting, summary tables need rebuilding, materialized views need refreshing, and maintenance tasks need to happen while everyone is asleep.

The usual answer is to reach outside the database: a system crontab, a Kubernetes CronJob, a Celery beat worker, or a scheduler service. All of these work, but they add moving parts. Now you have credentials to manage, a separate process to monitor, and one more thing that can silently stop running.

pg_cron takes a different approach. It's a PostgreSQL extension that runs a cron-style scheduler *inside* the database itself. You schedule jobs with plain SQL, the database executes them, and the run history lands in a table you can query like anything else.

In this tutorial, you'll learn how pg_cron works, how to install and configure it, and how to use it for real maintenance tasks. You'll also learn how to monitor jobs, manage permissions, and decide when pg_cron is the right tool — and when it isn't.

::: note Prerequisites

To follow along with the examples, you'll need:

- Basic knowledge of SQL (SELECT, INSERT, UPDATE, DELETE)
- A running PostgreSQL instance (version 13 or later is ideal, though pg_cron supports version 10 and up)
- Superuser or admin access to that instance, since installing the extension requires it
- A SQL client like `psql`, pgAdmin, or DBeaver

:::

If you don't run your own server, that's fine too. Most managed PostgreSQL services — including Amazon RDS, Azure Database for PostgreSQL, Google Cloud SQL, Supabase, and Neon — support pg_cron. I'll cover how to enable it on those later in the tutorial.

---

## What Is pg_cron?

pg_cron is an open source PostgreSQL extension, originally built by the team at Citus Data, that lets you schedule SQL commands using the familiar cron syntax.

Instead of writing a crontab entry on a server, you write a SQL statement:

```sql
SELECT cron.schedule(
  'nightly-cleanup',
  '0 3 * * *',
  $$DELETE FROM sessions WHERE expires_at < now()$$
);
```

That single statement tells PostgreSQL to delete expired sessions every day at 3 AM. No external process, no shell script, no extra credentials. The job definition lives in the database, version-controlled alongside your migrations if you want it to be.

Because the scheduler is just another extension, your jobs travel with the database. Anyone who can connect and query can see exactly what's scheduled, when it last ran, and whether it succeeded.

---

## How pg_cron Works

When PostgreSQL starts with pg_cron enabled, the extension launches a background worker. This worker has one job: watch the `cron.job` table, which holds every scheduled job along with its schedule, command, target database, and the user it runs as.

When a job's scheduled time arrives, the worker executes the command. By default it does this by opening a new local connection to the database, just as your application would. You can also configure it to use PostgreSQL background workers instead of connections, which I'll show you in the setup section.

Two behaviors are worth knowing up front:

First, pg_cron can run many *different* jobs in parallel, but it never runs two instances of the *same* job at once. If a job is still running when its next scheduled time arrives, the new run waits in a queue and starts as soon as the current one finishes. This protects you from a slow cleanup job piling up on top of itself.

Second, pg_cron doesn't run jobs while a server is in hot standby mode. If you use streaming replication, jobs only execute on the primary. When a replica gets promoted, the scheduler starts up automatically — so failover doesn't leave you without your scheduled jobs.

---

## How to Install and Set Up pg_cron

Setting up pg_cron on a self-managed server takes three steps: install the package, update the configuration, and create the extension.

### Step 1: Install the Package

On Debian or Ubuntu using the official PostgreSQL apt repository, install the package that matches your PostgreSQL major version. For PostgreSQL 17, that's:

```sh
sudo apt-get install postgresql-17-cron
```

On Red Hat-based systems using the PGDG yum repository:

```sh
sudo yum install pg_cron_17
```

If you're on PostgreSQL 16 or 18, swap the version number accordingly. You can also build the extension from source if your platform doesn't have a package.

### Step 2: Update <VPIcon icon="iconfont icon-postgresql"/>`postgresql.conf`

pg_cron needs to start its background worker when PostgreSQL boots, so it must be preloaded. Add it to `shared_preload_libraries` in your <VPIcon icon="iconfont icon-postgresql"/>`postgresql.conf`:

```ini title="postgresql.conf"
shared_preload_libraries = 'pg_cron'
```

If that setting already lists other libraries, add pg_cron to the comma-separated list rather than replacing them.

By default, the scheduler stores its metadata in the database named `postgres`. If your application lives in a different database and you want the jobs there, set:

```ini
cron.database_name = 'app_db'
```

One more setting worth knowing: pg_cron interprets all schedules in GMT by default. If you want your "3 AM cleanup" to actually run at 3 AM local time, set the timezone explicitly:

```ini
cron.timezone = 'Africa/Lagos'
```

These settings require a server restart to take effect:

```sh
sudo systemctl restart postgresql
```

### Step 3: Create the Extension

Connect to the database you configured in `cron.database_name` and create the extension as a superuser:

```sql
CREATE EXTENSION pg_cron;
```

This creates the `cron` schema, the metadata tables, and the scheduling functions. You're ready to schedule jobs.

Note that pg_cron can only be *installed* in one database per PostgreSQL instance. That sounds limiting, but it isn't. You can still run jobs in any database on the instance using `cron.schedule_in_database()`, which we'll cover later.

### A Note on How Jobs Connect

Since pg_cron opens local connections by default, your <VPIcon icon="iconfont icon-postgresql"/>`pg_hba.conf` needs to allow them. The common approaches are enabling `trust` authentication for localhost connections for the job's user, or putting the password in a <VPIcon icon="fas fa-key"/>`.pgpass` file.

If you'd rather avoid connection authentication entirely, tell pg_cron to use background workers instead:

```ini title="pg_hba.conf"
cron.use_background_workers = on
max_worker_processes = 20
```

With background workers, the number of jobs that can run concurrently is capped by `max_worker_processes`, so raise it if you schedule a lot of overlapping jobs.

### Using pg_cron on Managed Database Services

If you're on a managed service, you usually can't edit <VPIcon icon="iconfont icon-postgresql"/>`postgresql.conf` directly, but the providers expose the same settings through their own mechanisms:

- **Amazon RDS and Aurora PostgreSQL**: add `pg_cron` to the `shared_preload_libraries` parameter in your DB parameter group, reboot the instance, then run `CREATE EXTENSION pg_cron;` as a user with `rds_superuser`. The scheduler runs in the `postgres` database.
- **Azure Database for PostgreSQL**: enable pg_cron under server parameters (`shared_preload_libraries` and `azure.extensions`), restart, then create the extension.
- **Google Cloud SQL**: set the `cloudsql.enable_pg_cron` flag, restart, then create the extension.
- **Supabase**: enable the pg_cron extension with a single toggle in the dashboard under Database → Extensions.
- **Neon**: pg_cron is available as a supported extension you can enable per project.

The SQL you write afterward is identical everywhere, which is part of the appeal.

---

## A Quick Refresher on Cron Syntax

pg_cron uses the same five-field schedule format as classic Unix cron:

```plaintext
┌──────────── minute (0–59)
│ ┌────────── hour (0–23)
│ │ ┌──────── day of month (1–31, or $ for the last day)
│ │ │ ┌────── month (1–12)
│ │ │ │ ┌──── day of week (0–6, Sunday = 0)
│ │ │ │ │
* * * * *
```

An asterisk means "every value". You can combine values with commas, ranges with hyphens, and steps with slashes. Some schedules you'll use constantly:

```plaintext
*/5 * * * *    every 5 minutes
0 * * * *      every hour, on the hour
0 3 * * *      every day at 3:00 AM
0 3 * * 1-5    3:00 AM on weekdays
30 1 * * 0     1:30 AM every Sunday
0 0 1 * *      midnight on the 1st of each month
```

pg_cron also adds two extensions to the standard syntax that regular cron doesn't have.

You can use `$` in the day-of-month field to mean the last day of the month, which is genuinely painful to express in standard cron:

```plaintext
0 23 $ * *     11:00 PM on the last day of every month
```

And for jobs that need to run more often than once a minute, you can use a plain interval between 1 and 59 seconds:

```plaintext
'30 seconds'   every 30 seconds
```

The seconds syntax stands alone — you can't mix it with the five-field format.

If you ever doubt what a schedule means, [<VPIcon icon="fas fa-globe"/>crontab.guru](https://crontab.guru) translates cron expressions into plain English. Just remember that pg_cron evaluates schedules in the timezone set by `cron.timezone`, which defaults to GMT.

---

## How to Schedule Your First Job

The core function is `cron.schedule()`. It comes in two forms: one with a name and one without.

The named form is the one you should use, because names make jobs easy to find, update, and remove:

```sql
SELECT cron.schedule(
  'delete-expired-sessions',                          -- job name
  '0 3 * * *',                                        -- schedule
  $$DELETE FROM sessions WHERE expires_at < now()$$   -- command
);
```

The function returns the job's ID:

```plaintext
 schedule
----------
        1
(1 row)
```

A few details worth noticing:

The command is wrapped in `$$ ... $$`, PostgreSQL's dollar quoting. This saves you from escaping the single quotes inside the SQL. For commands without quotes, regular string literals work fine.

The job runs in the database where you called `cron.schedule()`, as the user you called it with, using that user's normal permissions. There's no privilege escalation hiding in the scheduler — if your user can't delete from `sessions`, neither can the job.

And if you call `cron.schedule()` again with the same job name, pg_cron updates the existing job instead of creating a duplicate. That makes schedules idempotent, which is handy if you define jobs inside database migrations.

---

## Practical pg_cron Examples

Let's walk through the patterns that cover most real-world use. Each example is something you can adapt directly.

### Example 1: Clean Up Old Rows Every Night

Tables that collect transient data — sessions, tokens, audit events, notification logs — grow forever unless something prunes them. A nightly delete is the classic first pg_cron job:

```sql
SELECT cron.schedule(
  'purge-old-events',
  '0 2 * * *',
  $$DELETE FROM events WHERE created_at < now() - interval '90 days'$$
);
```

Every night at 2:00 AM, rows older than 90 days disappear. If the table is large, consider batching the delete inside a function so each run stays short, then schedule the function instead.

### Example 2: Refresh a Materialized View Every Hour

Materialized views are a great way to cache expensive aggregations, but PostgreSQL never refreshes them on its own. pg_cron fixes that:

```sql
SELECT cron.schedule(
  'refresh-daily-sales',
  '5 * * * *',
  'REFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales_summary'
);
```

This refreshes the view at five minutes past every hour. The `CONCURRENTLY` option lets reads continue during the refresh, as long as the view has a unique index.

### Example 3: Build a Daily Summary Table

Rollup tables are another common pattern: instead of aggregating millions of raw rows on every dashboard load, you precompute the numbers once a day.

```sql
SELECT cron.schedule(
  'rollup-daily-orders',
  '15 0 * * *',
  $$
  INSERT INTO daily_order_stats (day, order_count, total_amount)
  SELECT created_at::date, count(*), sum(amount)
  FROM orders
  WHERE created_at >= current_date - 1
    AND created_at < current_date
  GROUP BY created_at::date
  ON CONFLICT (day) DO UPDATE
    SET order_count = EXCLUDED.order_count,
        total_amount = EXCLUDED.total_amount
  $$
);
```

At fifteen minutes past midnight, yesterday's orders get summarized into one row. The `ON CONFLICT` clause makes the job safe to re-run — if it executes twice, it overwrites rather than duplicates.

### Example 4: Run a Job Every 30 Seconds

Some work needs to happen more often than cron's one-minute floor allows: flushing a buffer table, picking up rows from an outbox, advancing a lightweight queue. The seconds syntax handles this:

```sql
SELECT cron.schedule(
  'process-outbox',
  '30 seconds',
  'CALL process_outbox_batch()'
);
```

Remember the guarantee from earlier: pg_cron won't start a second instance of this job while the first is still running. If a batch occasionally takes 45 seconds, the next run simply waits its turn instead of stampeding.

### Example 5: Run Maintenance on the Last Day of the Month

Month-end jobs are awkward in standard cron because months have different lengths. pg_cron's `$` makes it trivial:

```sql
SELECT cron.schedule(
  'month-end-vacuum',
  '0 23 $ * *',
  'VACUUM ANALYZE orders'
);
```

This runs `VACUUM ANALYZE` on the `orders` table at 11:00 PM on the 28th, 29th, 30th, or 31st — whichever happens to be the last day of that month.

---

## How to View and Monitor Your Jobs

Everything pg_cron knows lives in two tables in the `cron` schema, and you query them like any other tables.

To see what's scheduled, look at `cron.job`:

```sql
SELECT jobid, jobname, schedule, command, active
FROM cron.job;
```

```plaintext
 jobid |         jobname         |  schedule  |            command             | active
-------+-------------------------+------------+--------------------------------+--------
     1 | delete-expired-sessions | 0 3 * * *  | DELETE FROM sessions WHERE ... | t
     2 | refresh-daily-sales     | 5 * * * *  | REFRESH MATERIALIZED VIEW ...  | t
(2 rows)
```

To see how jobs have actually been running, query `cron.job_run_details`:

```sql
SELECT jobid, status, return_message, start_time, end_time
FROM cron.job_run_details
ORDER BY start_time DESC
LIMIT 10;
```

Each row records one execution: whether it succeeded or failed, the message it returned, and exactly when it started and ended. A failed job shows `status = 'failed'` along with the error message, so debugging usually starts and ends with this table.

One important catch: **pg_cron never cleans this table up by itself**. A job running every 30 seconds writes almost three thousand rows a day. The standard fix is delightfully recursive — schedule a pg_cron job to prune pg_cron's own history:

```sql
SELECT cron.schedule(
  'purge-cron-history',
  '0 12 * * *',
  $$DELETE FROM cron.job_run_details
    WHERE end_time < now() - interval '14 days'$$
);
```

If you don't want run history recorded at all, set `cron.log_run = off` in your configuration.

---

## How to Update and Remove Jobs

To change an existing job, use `cron.alter_job()` with the job's ID. Only the parameters you pass get changed — everything else stays as it was:

```sql
-- Move job 1 from 3 AM to 4 AM
SELECT cron.alter_job(1, schedule := '0 4 * * *');

-- Pause a job without deleting it
SELECT cron.alter_job(1, active := false);

-- Resume it later
SELECT cron.alter_job(1, active := true);
```

Pausing with `active := false` is underrated. During an incident or a big migration, you can switch off a noisy job and switch it back on afterward, without losing its definition.

To remove a job permanently, use `cron.unschedule()` with either the name or the ID:

```sql
SELECT cron.unschedule('delete-expired-sessions');
-- or
SELECT cron.unschedule(1);
```

Both return `true` when the job was found and removed.

---

## How to Run Jobs in Other Databases

Remember that pg_cron is installed in exactly one database per instance, usually `postgres`. If your instance hosts several databases, you don't install pg_cron in each one — you schedule cross-database jobs from the one place it lives, using `cron.schedule_in_database()`:

```sql
SELECT cron.schedule_in_database(
  'analytics-nightly-vacuum',
  '0 4 * * *',
  'VACUUM ANALYZE page_views',
  'analytics_db'
);
```

The job is stored centrally but executes inside `analytics_db`. The function also accepts an optional username if the job should run as a different user, and an `active` flag if you want to create it paused.

This pattern keeps all scheduling in one schema on one database, which makes auditing simple: a single `SELECT * FROM cron.job` shows every scheduled job across the whole instance.

---

## How to Let Other Users Schedule Jobs

Out of the box, only superusers can call the scheduling functions. To let an application role manage its own jobs, grant it usage on the `cron` schema:

```sql
GRANT USAGE ON SCHEMA cron TO app_user;
```

The permission model after that is sensible and safe:

- Jobs run with the permissions of the user who scheduled them, nothing more.
- A row-level security policy on `cron.job` means users only see and modify their own jobs. Superusers see everything.
- Each user can also delete their own rows from `cron.job_run_details`, so the cleanup job from earlier works without superuser rights.

In practice, I recommend creating a dedicated role for scheduled work rather than scheduling jobs as a personal account. When the engineer who scheduled everything leaves and their role gets dropped, you don't want the nightly rollups going with them.

---

## When to Use pg_cron (and When to Avoid It)

pg_cron shines when the work is *database work*. Use it for:

- **Data retention**: pruning old rows from sessions, logs, events, and token tables.
- **Aggregations**: refreshing materialized views and building rollup tables.
- **Maintenance**: targeted `VACUUM ANALYZE`, rebuilding statistics, managing partitions (it pairs beautifully with pg_partman).
- **Lightweight pipelines**: moving rows between tables, processing outbox patterns, expiring soft-deleted records.

The common thread: the entire job is expressible as SQL or a stored procedure, and it touches nothing outside the database.

You should reach for something else when:

- **The job needs to call external systems.** pg_cron runs SQL. It can't send an HTTP request, push to a queue, or send an email on its own. Jobs like that belong in your application or a workflow engine.
- **You need retries, backoff, and alerting built in.** pg_cron records failures but won't retry them or page you. For workflows that must complete, tools like Temporal or a proper job queue earn their complexity.
- **The work is heavy and long-running.** A four-hour batch job running inside your primary OLTP database competes with your application for CPU, memory, and locks. Schedule heavy compute elsewhere.
- **Jobs need complex dependencies.** "Run B only after A succeeds, then fan out to C and D" is orchestration. That's Airflow territory, not cron territory.

A reasonable rule of thumb: pg_cron replaces the crontab entry that used to run `psql -c "..."` on some forgotten server. It doesn't replace your job queue or your workflow orchestrator.

---

## Best Practices for Working with pg_cron

A handful of habits will keep your scheduled jobs boring, in the best sense of the word:

**Name every job:** Anonymous jobs identified only by an ID are painful to manage six months later. Names also make `cron.schedule()` idempotent, which lets you define jobs safely in migrations.

**Set the timezone deliberately:** The default is GMT, and "why does the 3 AM job run at 4 AM?" is a rite of passage you can skip by setting `cron.timezone` on day one.

**Keep individual runs short:** Wrap big deletes in batched stored procedures. A job that finishes in seconds holds locks briefly and queues less behind itself.

**Make jobs idempotent:** Servers restart, and a job can fail halfway. Use `ON CONFLICT`, time-window predicates, and other patterns that make a re-run harmless.

**Prune** `cron.job_run_details`**:** Schedule the cleanup job from the monitoring section before the table grows large enough that you notice it the hard way.

**Monitor for silence, not just failure:** A failed run appears in `job_run_details`, but a job that stopped being scheduled at all leaves no trace. A periodic check that each critical job has a recent successful run catches both cases:

```sql
SELECT j.jobname, max(d.end_time) AS last_success
FROM cron.job j
LEFT JOIN cron.job_run_details d
  ON d.jobid = j.jobid AND d.status = 'succeeded'
GROUP BY j.jobname
HAVING max(d.end_time) < now() - interval '1 day'
   OR max(d.end_time) IS NULL;
```

Any job this query returns hasn't succeeded in over a day, and deserves a look.

---

## Conclusion

pg_cron turns PostgreSQL into its own scheduler. You define jobs in SQL, the database runs them, and the entire system — definitions, history, failures — is visible through ordinary queries.

In this tutorial, you learned how the extension works under the hood, how to install it on your own servers and on managed services, how to write schedules (including pg_cron's seconds and last-day-of-month extensions), and how to apply it to the maintenance work every real database accumulates: pruning, rollups, refreshes, and vacuums. You also saw how to monitor jobs, manage permissions, and recognize the point where a real job queue or orchestrator becomes the better tool.

If your infrastructure currently has a lonely server whose only purpose is running `psql` from a crontab, you now know how to retire it.

::: info About Author

Thanks for reading! I write about PostgreSQL and backend engineering. You can connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`iyioladev`)](https://linkedin.com/in/iyioladev) and [X (<VPIcon icon="fa-brands fa-x-twitter"/>`iyiola_dev_`)](x.com/iyiola_dev_).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Schedule Jobs in PostgreSQL with pg_cron",
  "desc": "Every backend system eventually needs something to run on a schedule. Old sessions need deleting, summary tables need rebuilding, materialized views need refreshing, and maintenance tasks need to happ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-schedule-jobs-in-postgresql-with-pg-cron.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
