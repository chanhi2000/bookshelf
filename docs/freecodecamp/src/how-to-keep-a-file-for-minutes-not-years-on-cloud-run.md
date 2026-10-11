---
lang: en-US
title: "How to Keep a File for Minutes, Not Years, on Cloud Run"
description: "Article(s) > How to Keep a File for Minutes, Not Years, on Cloud Run"
icon: iconfont icon-gcp
category:
  - Node.js
  - DevOps
  - Google
  - Google Cloud
  - Data Science
  - Redis
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - devops
  - google
  - gcp
  - google-cloud-platform
  - data-science
  - redis
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Keep a File for Minutes, Not Years, on Cloud Run"
    - property: og:description
      content: "How to Keep a File for Minutes, Not Years, on Cloud Run"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-keep-a-file-for-minutes-not-years-on-cloud-run.html
prev: /programming/js-node/articles/README.md
date: 2026-10-14
isOriginal: false
author:
  - name: Abhinay Gokul
    url: https://freecodecamp.org/news/author/abhinaygokul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5b5c4c33-45b1-4e68-88d7-2d3ff82b0961.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
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
  name="How to Keep a File for Minutes, Not Years, on Cloud Run"
  desc="A print job, a one-time download, or a support attachment typically only needs to exist until someone finishes with it. But most backends still store it like Google Drive: a named object, no expiry, a"
  url="https://freecodecamp.org/news/how-to-keep-a-file-for-minutes-not-years-on-cloud-run"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5b5c4c33-45b1-4e68-88d7-2d3ff82b0961.png"/>

A print job, a one-time download, or a support attachment typically only needs to exist until someone finishes with it. But most backends still store it like Google Drive: a named object, no expiry, and a database row that can search it later.

This tutorial will teach you a smaller pattern I use in production for a print relay. The ideas aren't specific to printing. You can use the same pattern for any short job: accept bytes, hold them briefly, hand them to an authorized caller, then delete them.

You won't get a full app. You'll get the decisions that stop a queue from turning into a document library.

:::: info What You'll build

The contract is small:

1. A client sends a file for one job.
2. Your API writes ciphertext to object storage and a short-lived job record to Redis.
3. An authorized caller can fetch the file once.
4. When the job ends, or when a timer fires, you delete the object and the job record.

Success is an empty bucket, not a searchable archive.

```text
Client
  |
  |  HTTPS
  v
Cloud Run (one Node service)
  |-- Cloud Storage     cipher-text object
  |-- Cloud KMS         wraps the per-file key
  |-- Redis             job JSON with a time to live (TTL)
  |
Authorized caller  <--  stream, then delete
```

:::

::: note  What You Need

You should already know:

- A little Node.js and Express
- What HTTPS and JSON are
- That object storage (Amazon S3, Google Cloud Storage) keeps files, and Redis keeps fast key-value data

You don't need Kubernetes or a second "print server." If you're on Google Cloud, then Cloud Run, Cloud Storage, Cloud Key Management Service (Cloud KMS), and any Redis host are enough. The same split works on other clouds if you rename the products.

:::

---

## One Service, Not a Fleet

A file that lives for twenty minutes doesn't need an always-on virtual machine, a cluster, and a box at the customer's office.

Put the website and the API in one Cloud Run service. Cloud Run bills CPU while requests run. When nobody is uploading, you aren't paying a queue machine to sit there.

That choice has a trap. Cloud Run can run more than one instance. If each instance keeps jobs in its own memory, instance A won't see the job that instance B accepted. The user then refreshes and the job is "gone," or worse, you print the wrong one.

So:

- The process can be stateless.
- The queue can't.

Readiness should fail when Redis is down. A liveness check that only proves "Node is up" will send traffic to a service that can't tell the truth about the queue. Fail closed. Don't fall back to a local disk on whichever replica got the request.

```js
app.get("/up", (_req, res) => {
  res.status(200).send("ok");
});

app.get("/health", async (_req, res) => {
  const redisUp = await pingRedis();
  if (!redisUp) return res.status(503).send("queue down");
  res.status(200).send("ok");
});
```

Use `/health` for the load balancer or Cloud Run probe. Use `/up` only to see that the container can answer.

---

## Give the Object a Boring Name

If the object key is <VPIcon icon="fas fa-file-pdf"/>`aadhaar-ramesh.pdf`, you already built a filing cabinet. The next feature request will be search.

Store bytes under a random id:

```js
const { randomUUID } = require("crypto");

function objectName() {
  return `jobs/${randomUUID()}.bin`;
}
```

Keep the human filename, if you need it at all, in the job record with a short time to live. Don't put it in the object name. Don't copy the bucket to a second continent "for safety" if your success condition is delete. You'd be paying to replicate data you intend to throw away.

Cap how many files one visit can add. A hard limit, such as five files before the person has to start a new visit, bounds storage, key operations, and queue size. Unlimited upload is how a print counter becomes a junk drawer.

---

## Encrypt for Storage, and Be Honest About Decrypt

Two different jobs get mixed up in privacy posts:

- **Zero-knowledge** means the server never has the plaintext or the key.
- **Short retention** means the server doesn't keep the file as a library.

A printer, a preview, or a "download this once" button usually needs the second, not the first. Someone authorized has to see the bytes. Say that in the article and in the product. Don't write "the server never sees the file" if your API unwraps it.

Here's a practical pattern:

1. The browser encrypts with AES-GCM before upload, so a casual network capture isn't a readable PDF.
2. On the server, unwrap that layer, check the magic bytes (PDF, JPEG, PNG), then encrypt again with a new data key for storage.
3. Ask Cloud KMS (or your cloud's key service) to wrap that data key. Store the wrapped key next to the job, not in the object name.
4. On an authorized read, unwrap the data key, decrypt, and stream.

Checking magic bytes is why you unwrap on the way in. If you skip that, people upload HTML or junk and you find out at the worst moment.

Here's a sketch, not a full crypto library:

```js
const crypto = require("crypto");

function encryptForStorage(plainBuffer) {
  const dataKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", dataKey, iv);
  const ciphertext = Buffer.concat([cipher.update(plainBuffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { ciphertext, iv, tag, dataKey };
}
```

Send `dataKey` to KMS and persist only the wrapped result. AES-GCM's auth tag matters: if someone flips bits in the bucket, decrypt fails instead of returning a corrupted PDF that looks half-real.

KMS calls are cheap next to a bucket that never expires. Skipping encryption to save pennies is how a leaked bucket becomes a leaked neighbourhood.

The person at the counter still sees the page. Paper can be photographed. Architecture removes the forever-copy. It doesn't make the printer blind.

---

## Put the Queue in Memory That Expires

Redis holds the live job, not the file.

```js
const JOB_TTL_SECONDS = 60 * 60;

async function saveJob(redis, job) {
  await redis.set(
    `job:${job.id}`,
    JSON.stringify({
      id: job.id,
      objectName: job.objectName,
      shopId: job.shopId,
      status: "queued",
      createdAt: Date.now()
    }),
    "EX",
    JOB_TTL_SECONDS
  );
}
```

One hour is a product choice, not a law. Pick a TTL that matches the real visit. A photocopy doesn't need a row you can query next year.

Also store:

- A short cache of file metadata
- A counter for "files in this visit"
- A lock key so two Cloud Run instances don't run cleanup at the same time

Don't store the PDF in Redis. Redis is what is in line. Cloud Storage is the bytes. When the TTL hits zero, the job record disappears even if you forgot to delete it yourself. That's the point.

---

## Delete on Purpose, Then Sweep What You Missed

When the authorized caller finishes:

```js
async function completeJob({ storage, redis, bucket, job }) {
  await storage.bucket(bucket).file(job.objectName).delete({ ignoreNotFound: true });
  await redis.del(`job:${job.id}`);
}
```

Delete the object first, then the pointer. If you delete the pointer and the object delete fails, you can lose the only map to an orphan file. If the object delete fails, keep the job and retry.

People close tabs. Requests die. A sweeper should run every few minutes:

- If the job is already done, delete anything left.
- If the object is older than your window (about 30 minutes is enough for a stuck job), delete it.
- Take a Redis lock so two instances don't double-delete.

```js
async function withLock(redis, fn) {
  const ok = await redis.set("lock:sweep", "1", "NX", "EX", 55);
  if (ok !== "OK") return;
  try {
    await fn();
  } finally {
    await redis.del("lock:sweep");
  }
}
```

Firestore, Postgres, or any other database can keep the shop, the owner, and a usage counter. It shouldn't keep a second copy of the PDF. If the file bytes and the customer list live in the same table, you'll grow a content system. Usage can say "this visit happened." It shouldn't be a thumbnail gallery.

---

## What Not to Claim

Write these limits into the README so you don't have to walk them back later:

- The server can see plaintext at ingest (to re-encrypt and validate) and at the authorized download. That's not zero-knowledge.
- A deleted object is gone from your bucket. It's not gone from the recipient's screen, printer, or camera.
- Redis going down should stop new jobs. Serving a fake local queue is worse than a 503.
- A random object name isn't access control. You still need an auth check before streaming bytes.

---

## Where to Go Next

Build the smallest loop on one Cloud Run service:

1. `POST /jobs` writes ciphertext and a Redis record with `EX`.
2. `GET /jobs/:id` checks auth, streams plaintext, then deletes.
3. A sweep removes anything older than your window.
4. `/health` returns 503 when Redis is down.

If that loop is boring, you did it right. Boring is what keeps a five-minute file from becoming a document company.

I use this pattern in Docshy, a print relay I build in India: one Cloud Run service in Mumbai (`asia-south1`), Cloud Storage, Cloud KMS, and Redis.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Keep a File for Minutes, Not Years, on Cloud Run",
  "desc": "A print job, a one-time download, or a support attachment typically only needs to exist until someone finishes with it. But most backends still store it like Google Drive: a named object, no expiry, a",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-keep-a-file-for-minutes-not-years-on-cloud-run.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
