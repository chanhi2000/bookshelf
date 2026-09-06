---
lang: en-US
title: "How to Build a Deployment Checklist That Actually Prevents Production Incidents"
description: "Article(s) > How to Build a Deployment Checklist That Actually Prevents Production Incidents"
icon: iconfont icon-redis
category:
  - Python
  - Data Science
  - Redis
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - data-science
  - redis
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Deployment Checklist That Actually Prevents Production Incidents"
    - property: og:description
      content: "How to Build a Deployment Checklist That Actually Prevents Production Incidents"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-deployment-checklist-that-actually-prevents-production-incidents.html
prev: /data-science/redis/articles/README.md
date: 2026-09-10
isOriginal: false
author:
  - name: Manish Shivanandhan
    url: https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b2e654b3-dbd0-40af-a21b-c4b63cda4fcb.png
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
  "title": "Redis > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/redis/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Deployment Checklist That Actually Prevents Production Incidents"
  desc="Count the items on your deployment checklist. If there are more than a handful, the length is worth a second look. Part of it is likely your team being careful. Part of it may be a record of how much "
  url="https://freecodecamp.org/news/how-to-build-a-deployment-checklist-that-actually-prevents-production-incidents"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b2e654b3-dbd0-40af-a21b-c4b63cda4fcb.png"/>

Count the items on your deployment checklist. If there are more than a handful, the length is worth a second look.

Part of it is likely your team being careful. Part of it may be a record of how much infrastructure your product team is still checking by hand.

A deployment checklist grows based on application risk: how your own code, data, and rollout can hurt users. Every other item, like certificates, load balancers, image provenance, autoscaling, and connection draining, is a piece of plumbing you're verifying by hand because nothing else verifies it for you.

Those items don't need better wording. They need an owner, and it's worth asking whether that owner should be your product team. This assumes you're already running applications in production, with a pipeline, a rollback story of some kind, and an incident history worth reading.

The question isn't how to start deploying safely. It's which of the risks you currently carry actually need a human carrying them.

In this article, I argue that a deployment checklist should be as long as your application risk requires, and no longer. Most of the extra length is infrastructure work that a person is still checking by hand.

So we'll start by sorting the list into two columns: application risk and infrastructure risk. Then we'll treat each column differently.

Build the application half from your own incidents. Then add the checks that catch even strong teams: background workers, cached data, schema changes, and rollback triggers.

For the infrastructure half, each item still definitely matters. The question is just why a person is the one confirming it, and what it costs you to keep answering that by hand.

---

## Two Kinds Of Risk In One List

Open your current checklist and sort every item into two columns.

The first column is application risk. Can this schema change be undone? Will the old consumer understand the new job payload? What happens to sessions already in the cache?

These come out of decisions your team made in a pull request. Nobody outside the team can answer them, because nobody else knows what your code means.

The second column is infrastructure risk. Is the certificate valid? Did the image come from the right commit? Are autoscaling rules correct? Are logs shipping? Is the previous version still around?

These are recurring platform responsibilities, not application-specific judgment calls. Every production team faces them, which is why they should be enforced consistently instead of rechecked by hand.

Here is what that split looks like on a real list. Say your wiki page currently holds eleven items in one flat run. Sorted, it reads like this:

| Application risk (changes every deploy) | Infrastructure risk (identical every deploy) |
| --- | --- |
| Is the `full_name` migration reversible? | Is the TLS certificate valid for another 30 days? |
| Will the old invoice worker read the new job payload? | Did the image build from the commit we're deploying? |
| What happens to sessions already in Redis? | Are autoscaling rules right for this instance size? |
| Is `PAYMENT_TIMEOUT_MS` set in production? | Are logs and metrics shipping from the new instances? |
| Has rollback been tested on this service this week? | Is the previous release still there to roll back to? |
|  | Did old instances drain connections before shutdown? |

Read the two columns and the difference jumps out. The left column mentions your column names, your worker, your config keys. It would be meaningless at another company.

The right column would read the same at any company shipping a web app. That's the tell. Anything you could copy into a stranger's wiki without editing it isn't really your team's judgment call.

The first column is a checklist. The second is a list of things that should be answering themselves. Most teams write both into the same document, then wonder why it's too long to use.

---

## Column One: Build It From Your Own Incidents

Pull your last ten incidents. For each one, ask what single check, run before the deploy, would have caught it. A pattern should appear fast.

Most teams find that three or four causes explain the bulk of their outages: bad config, an unsafe schema change, a dependency that wasn't ready, or a rollback that didn't work.

Four items you use beat forty you ignore. Google's SRE team makes a related point in its chapter on [<VPIcon icon="fa-brands fa-google"/>release engineering](https://sre.google/sre-book/release-engineering/), where the goal is releases that are boring and repeatable rather than careful and heroic.

A working [<VPIcon icon="fa-brands fa-google"/>postmortem practice](https://sre.google/sre-book/postmortem-culture/) keeps the list current, since every incident should add an item or delete one. One structural warning. Any item that depends on a human remembering will eventually fail, because people get tired and pipelines do not.

Each item should be automated, or explain why it can't be. The ones that can't be automated are usually judgement calls about your data model, which is exactly what belongs in column one.

---

## The Application Questions Worth Asking

Add these to whatever your incidents produced. They cover the failure modes that hit nearly every team, and all of them are about your code rather than your plumbing.

- **Can I undo this in under two minutes?** Not whether a rollback plan exists on paper. Whether it has been tested this week, on this service. An untested rollback is a hope, not a control.
- **Is the config this code needs already in place?** A new variable must be set before the code that reads it arrives, not after. The [<VPIcon icon="fas fa-globe"/>twelve-factor approach](https://12factor.net/config) keeps config in the environment rather than the code, which makes the ordering explicit.
- **Is the database change safe on its own?** That one gets its own section below.
- **Does the app report its own health honestly?** A running process isn't a working app, so the health endpoint has to check what the app actually depends on. Kubernetes formalises the distinction with [<VPIcon icon="iconfont icon-k8s"/>readiness and liveness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/): readiness decides whether traffic reaches the instance, while liveness decides whether it gets restarted. Confusing the two turns a slow start into an endless restart loop. Writing an honest health check is application work. Checking by hand that the rollout waited for it is not.
- **How many users see it first?** Shipping to everyone at once turns every mistake into a full outage. Shipping to five percent turns most mistakes into a blip. None of these ask whether the code is correct. That's what review and tests are for. A deployment checklist asks a narrower question: can delivering correct code still hurt you?

---

## Three Application Risks That Are Rarely On The List

These catch experienced teams, because nothing in the pull request hints at them.

**Background workers are the first.** Web processes and queue consumers ship from the same codebase but not always at the same moment. For a few minutes, a new producer may write payloads an old consumer can't read.

Here's the change that causes it. A developer tidies up a job payload:

```py
# NEW producer code. Looks harmless in review.
enqueue("send_invoice", {
    "customer": {"id": 42, "email": "ada@example.com"},
})
```

The consumer still running in production is the old one, and it reads a key that no longer exists:

```py
# OLD consumer, still live for the next few minutes
def send_invoice(payload):
    customer = db.get_customer(payload["customer_id"])  # KeyError
```

Those jobs fail quietly into a dead letter queue and get found hours later.

The fix is to send both shapes for one release, so either version of the consumer can read the message:

```py
# Safe producer: old key stays until every consumer is new
enqueue("send_invoice", {
    "customer_id": 42,                                   # old consumers read this
    "customer": {"id": 42, "email": "ada@example.com"},  # new consumers read this
})
```

Then deploy the new consumer, let the queue drain, and drop `customer_id` in a later release. Same rule as a database column: add, migrate, and remove, never all at once.

**Serialised data is the second.** Payloads need the same backward compatibility rule as database columns. Anything written into a cache, a session store, or a message body is effectively a schema.

The trap is that no migration file exists, so nothing warns you:

```py
# Yesterday's code wrote this shape, and it's still sitting in Redis
cache.set(f"user:{user.id}", {"name": "Ada Lovelace"}, ex=86400)

# Today's code reads it
profile = cache.get(f"user:{user.id}")
first = profile["first_name"]   # KeyError on every object cached before the deploy
```

Change the shape of a cached object and old readers break, even though no database was touched. Use a new cache key instead:

```py
CACHE_VERSION = "v2"   # bump this whenever the stored shape changes

def cache_key(user_id):
    return f"user:{CACHE_VERSION}:{user_id}"

cache.set(cache_key(user.id), {"first_name": "Ada", "last_name": "Lovelace"}, ex=86400)
```

New code misses on the new key, rebuilds from the database, and moves on. The old `user:*` entries expire on their own. One line of version bump replaces an outage.

**Cold-start capacity is the third,** and it sits on the boundary. A rolling deploy briefly serves normal traffic with fewer warm instances.

If your app needs forty seconds to warm its connection pool and the grace period is thirty, you find out at the worst time. This config is the version that bites:

```yaml
readinessProbe:
  httpGet: { path: /ready, port: 8080 }
  periodSeconds: 5
  failureThreshold: 6      # gives up after ~30s. The app needs 40.
```

The instance is killed and restarted right as it was about to be ready, so the rollout loops while traffic piles onto the old instances. Split the two jobs apart instead:

```yaml
# Generous window for the first boot only
startupProbe:
  httpGet: { path: /ready, port: 8080 }
  periodSeconds: 5
  failureThreshold: 18     # allows 90s to warm the pool

# Tight window once the app is up
readinessProbe:
  httpGet: { path: /ready, port: 8080 }
  periodSeconds: 5
  failureThreshold: 3
```

Knowing the warm-up time is application work. Enforcing it on every deploy is a configuration you should set once, not a line you reread each time.

---

## Database Migrations Are Where Rollbacks Go To Die

You can roll back code in seconds, but you can't roll back a dropped column.

No tooling anywhere will make this someone else's problem, which is why it's the strictest item on the list.

Never ship a schema change and the code that depends on it in the same deploy. Split it. Add the new column and leave the old one alone, then deploy. Ship code that writes to both. Then ship code that reads the new one. Only much later, once nothing references it, should you drop the old column.

The pattern is called expand and contract. Renaming `users.name` to `users.full_name` looks like one line of work. Done safely, it's four deploys.

Deploy one adds the column and nothing else:

```sql
-- Nullable, no default, so there is no table rewrite and no long lock
ALTER TABLE users ADD COLUMN full_name varchar(255);
```

Deploy two writes both columns and still reads the old one. Nothing user-facing changes yet:

```py
def save_user(user, name):
    user.name = name          # still the source of truth
    user.full_name = name     # new column starts filling
```

Then backfill the rows that existed before deploy two (in batches so you never hold a lock for long):

```sql
-- Repeat until it reports 0 rows
UPDATE users SET full_name = name
WHERE full_name IS NULL
LIMIT 5000;
```

Deploy three reads the new column, with a fallback so a rollback to deploy two is still safe:

```py
display_name = user.full_name or user.name
```

Deploy four is the contract step, and it comes weeks later once nothing in the codebase mentions `name` and you're sure you won't roll back that far:

```sql
ALTER TABLE users DROP COLUMN name;
```

It's more work. It also means that at every step, old code and new code can both still run, and that property is what makes fast rollback possible at all.

[<VPIcon icon="fas fa-globe"/>Blue-green deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html) keeps two full environments and switches traffic between them, which only works if your data layer serves both versions. Migration discipline is the foundation. The deploy strategy sits on top.

One more rule: never run a long migration inside the deploy. A change that locks a large table takes your app down while the pipeline reports success. Run it ahead of time and let the deploy be a fast swap of code.

---

## Separate Deploying From Releasing

Deploying means the code is on the server, while releasing means users can reach the behaviour. Most teams treat these as one event, which is why every deploy feels risky.

Put new behaviour behind a flag and the two come apart. In the code, that's one branch and one place that decides:

```py
def checkout(request, user):
    if flags.enabled("new_checkout", user=user):
        return new_checkout(request, user)
    return legacy_checkout(request, user)
```

Deploy with the flag off. The new path is on the server and reachable by nobody:

```yaml title="flags.yaml"
# deploy 1: code is live, behaviour is not
new_checkout:
  enabled: false
```

Confirm the app is healthy, then turn it on for your own team:

```yaml title="flags.yaml"
new_checkout:
  enabled: true
  audience: internal      # your staff accounts only
```

Then one percent of real users, and watch your error rate and latency at that slice:

```yaml title="flags.yaml"
new_checkout:
  enabled: true
  audience: percentage
  percentage: 1
```

Then everyone, with the cleanup date written down at the same time:

```yaml
new_checkout:
  enabled: true
  audience: percentage
  percentage: 100
  remove_by: 2026-11-01   # delete the flag and legacy_checkout by this date
```

If something looks wrong at any step, you set `enabled: false` instead of redeploying, and recovery takes seconds.

This also shortens the list. A change behind a default-off flag really is low risk, so it can skip most items, and the checks move to the flag flip where the risk lives.

Just keep in mind that flags cost something too, since old ones become dead code. So make sure you set a removal date when you add one. That `remove_by` field is the whole reason it's in the config rather than in someone's head.

---

## Decide Your Rollback Trigger Before You Ship

Rollbacks happen late mostly because nobody agreed in advance on what "bad" looks like. Under pressure, people negotiate and wait one more minute to see if the errors settle.

Write the trigger down before the deploy. Pick two or three numbers, each with a threshold and a window: for example

1. an error rate above one percent for two minutes
2. latency at the ninety-fifth percentile above double its normal value
3. queue depth climbing without recovery

Roll back when any one is crossed, with no discussion. Watch percentiles, not averages. If one request in twenty now takes eight seconds, the average barely moves while a real share of users suffer.

Then be honest about detection. How long would it take you to notice each signal today? If that's longer than your watch window, the problem isn't your checklist. It's your monitoring.

---

## Column Two: Take It Off The List

Now go back to the infrastructure column and ask a different question of each item. Not "is this worth checking". It is. Instead, ask "why is a person checking it?"

The obvious answer is to automate. Certificate renewal becomes automatic. Image provenance becomes a pipeline control that refuses to promote an unverified build. Config drift becomes a deployment-time check.

Each line you convert genuinely leaves the list, and a team that does this for a quarter will have a visibly shorter document.

Then look at what's left after the easy passes, because the remainder is where the argument actually is. You'll have items like health-gated rollout, where traffic shifts only after new instances pass their checks. Or zero-downtime replacement: draining connections, waiting for in-flight requests, sequencing instance turnover, and honouring readiness before moving traffic.

Keeping the previous release built and warm enough to return to in seconds. A preview environment per pull request, built the way production is built, so that "it worked in staging" stops being a category of incident.

These don't respond to a scripting afternoon. Each is a distributed systems problem with edge cases you discover in production, and each stays on the list as a human verification step until it's fully solved.

Teams that commit to solving these issues properly aren't writing scripts anymore. They're building and staffing an internal delivery platform, which is a real product with a roadmap, an on-call rotation, and a maintenance cost that doesn't end.

The work is legitimate. It's also the same work, done once per company, that a [**platform as a service**](/freecodecamp.org/my-team-s-experience-moving-from-aws-to-a-paas.md) has already amortised across everyone using it, with the edge cases found by someone else's outages.

Rollback shows the gap most clearly. Owned in-house, it's a procedure a person performs under pressure, and the only thing that makes it trustworthy is rehearsing it often enough that the rehearsal itself becomes a standing cost.

Owned by the platform, the checklist item collapses to confirming that the previous release exists, which the platform also guarantees. The reliability difference isn't a matter of how well the runbook is written.

There's a real limit to this. Opinionated platforms constrain unusual networking, specialised hardware, and fine-grained tuning of the layers they abstract. So teams with those requirements will hit the edges and should stay where they are. It's worth checking whether that describes you, because most teams shipping web applications and APIs assume it does long before it's true.

---

## Keep It Short, Keep It In The Repo

What survives is a list about your application, and it fits in a pull request template. Six tick boxes in front of the reviewer beat a wiki page every time.

A workable version reads like this:

- Confirm the change is backwards compatible with the running version, including job payloads and cached data.
- Confirm any schema change ships in an earlier deploy.
- Confirm new config already exists in the target environment.
- Name the rollback trigger.
- Say how the change reaches users.
- Name who watches for the first fifteen minutes.

That last item is underrated. A deploy nobody is watching is a bet, which is also why shipping at the end of the day hurts so often. The deploy is fine. The empty room is the problem.

Then measure whether the list works. The four [<VPIcon icon="fas fa-globe"/>DORA metrics](https://dora.dev/guides/dora-metrics/) give you the read you need. Change failure rate says whether your checks catch real problems. Recovery time says whether your rollback story is honest. And deployment frequency says whether the process has grown too heavy to use.

The teams that deploy most often break production least often, because speed and safety both come from a delivery path so automated that little is left for a human to get wrong.

So treat the checklist as a running record of risks a human is still absorbing on the system's behalf. Automate what automation can reach, and for the rest, be clear-eyed that keeping the item means keeping the infrastructure that produced it. A shrinking checklist is a maturing system. A list that stays long is a decision, not an accident.

::: info About Author

Hope you enjoyed this article. You can [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Deployment Checklist That Actually Prevents Production Incidents",
  "desc": "Count the items on your deployment checklist. If there are more than a handful, the length is worth a second look. Part of it is likely your team being careful. Part of it may be a record of how much ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-deployment-checklist-that-actually-prevents-production-incidents.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
