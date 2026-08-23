---
lang: en-US
title: "Why You Should Never Send Emails Inside Your API Requests"
description: "Article(s) > Why You Should Never Send Emails Inside Your API Requests"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Why You Should Never Send Emails Inside Your API Requests"
    - property: og:description
      content: "Why You Should Never Send Emails Inside Your API Requests"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-you-should-never-send-emails-inside-your-api-requests.html
prev: /programming/ts/articles/README.md
date: 2026-09-02
isOriginal: false
author:
  - name: Chinedu Otutu
    url: https://freecodecamp.org/news/author/tutumantutu/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8da5a9af-d7e5-4d0e-94cc-a11d24923023.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why You Should Never Send Emails Inside Your API Requests"
  desc="Your signup endpoint looks fine in development. A user registers, you save the row, you call your email provider, and you return 201 Created. Everyone gets a welcome email. You ship it. Then productio"
  url="https://freecodecamp.org/news/why-you-should-never-send-emails-inside-your-api-requests"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8da5a9af-d7e5-4d0e-94cc-a11d24923023.png"/>

Your signup endpoint looks fine in development. A user registers, you save the row, you call your email provider, and you return `201 Created`. Everyone gets a welcome email. You ship it.

Then production traffic arrives.

The email API takes 2 seconds instead of 200 milliseconds. A few requests time out. During a provider outage, every signup starts returning `500`. Support asks why users can create accounts but never get the confirmation link.

The bug isn't your email template. The bug is where you decided to send the email.

In this article, you'll learn why sending email inside the HTTP request path is a production trap, what goes wrong as you scale, and how to move email (and other side effects) into a background job queue so your API stays fast and reliable.

::: note Prerequisites

You'll get more out of this article if you know:

- How REST APIs work (request, response, status codes)
- Basic Node.js or any backend language that can call an email API
- What a background job or queue is at a high level

You don't need prior experience with BullMQ, Redis, or a specific email provider.

:::

---

## 1. What "Inside the Request" Really Means

When a client hits your API, the request path is everything that must finish before you send the HTTP response.

That usually includes:

- validating input
- checking auth
- writing to your database
- returning JSON

It should almost never include:

- calling an SMTP server
- waiting on Resend, SendGrid, SES, Mailgun, or Postmark
- rendering a big HTML template and uploading attachments
- retrying a flaky third-party network call

Email providers are external systems. They have their own latency, rate limits, and outages. If your API waits on them, their problems become your users' problems.

```plaintext
Bad path (synchronous):

Client ──▶ API ──▶ Database ──▶ Email provider ──▶ Client
                         ▲
                         └── user waits for all of this
```

---

## 2. The Tempting Code That Causes the Problem

Here's the pattern most teams start with. It's clear, short, and works on your laptop.

```ts
app.post('/signup', async (c) => {
  const body = await c.req.json();

  const user = await db.users.create({
    email: body.email,
    passwordHash: await hash(body.password),
  });

  // This is the trap.
  await emailClient.send({
    to: user.email,
    subject: 'Confirm your account',
    html: renderConfirmEmail(user),
  });

  return c.json({ id: user.id }, 201);
});
```

The request can't finish until the email provider answers. If that call is slow, your response is slow. If that call throws, your signup either fails or you catch the error and silently skip the email.

Neither option is good.

---

## 3. Why This Breaks in Production

### Your Response Time Becomes Someone Else's SLA

A healthy signup endpoint should often respond in tens or hundreds of milliseconds. Email APIs regularly take longer than that. Under load, they take much longer.

Your p95 latency is no longer owned by your code. It's owned by the slowest third-party call on the path.

### Failures Create Ugly Tradeoffs

If `send()` throws, you have two bad choices:

1. Fail the whole request: the user sees an error even though the account may already exist
2. Swallow the error: the user is created, but never gets the email

That second case is especially painful with confirmation or password-reset flows. The database says success but the inbox says nothing.

### Timeouts Cascade

API gateways, load balancers, and browsers all have timeouts. A slow email call can turn a successful business action into a client-side failure. The user retries. Now you may create duplicate users or send duplicate emails.

### Rate Limits Punish Traffic Spikes

Email providers rate-limit you. Product launches, digests, and password-reset spikes can all hit those limits. If sending happens inside the request, a rate limit error becomes a user-facing API error.

### You Can't Retry Cleanly

Background jobs can retry with backoff. HTTP requests can't. Once you've returned a response, the request is over. If the email failed and you already told the client "success," you need another system to repair that. That system is a queue.

```plaintext
What the user experiences during a provider slowdown:

Signup click
   │
   ▼
API waits on email provider .............. 2s ... 5s ... timeout
   │
   ▼
"Something went wrong"
   │
   ▼
User clicks again → duplicate attempts, confused support tickets
```
<!-- TODO: mermaid화 -->

---

## 4. The Rule: Your API Should Enqueue Work, Not Do It

Treat email as asynchronous work that must happen *because of* the request, not *inside* the request.

The request path should:

1. validate the input
2. commit the business change
3. enqueue a job that describes the email
4. return quickly

A worker somewhere else should:

1. pick up the job
2. render the template
3. call the email provider
4. retry on failure
5. record the result

```plaintext
Good path (asynchronous):

Client ──▶ API ──▶ Database ──▶ Queue ──▶ Client (fast response)
                                   │
                                   ▼
                                Worker ──▶ Email provider
```

This is the same idea behind processing uploads, generating PDFs, calling AI APIs, or syncing data to a CRM. Email is just the most common example.

---

## 5. How to Move Email to a Background Queue

Here's a minimal Node.js shape using [<VPIcon icon="fas fa-globe"/>BullMQ](https://docs.bullmq.io/) and Redis. The exact library matters less than the boundary.

### Define the Job

```ts title=""jobs/email.ts"
export type SendEmailJob = {
  to: string;
  template: 'confirm-account' | 'password-reset' | 'welcome';
  variables: Record<string, string>;
  idempotencyKey: string;
};
```

### Enqueue from the API

```ts :collapsed-lines
import { emailQueue } from '../queues/email-queue';

app.post('/signup', async (c) => {
  const body = await c.req.json();

  const user = await db.users.create({
    email: body.email,
    passwordHash: await hash(body.password),
  });

  await emailQueue.add(
    'send-email',
    {
      to: user.email,
      template: 'confirm-account',
      variables: {
        name: user.name,
        confirmUrl: `https://example.com/confirm/${user.confirmToken}`,
      },
      idempotencyKey: `confirm-account:${user.id}`,
    },
    {
      jobId: `confirm-account:${user.id}`,
      attempts: 5,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: 1000,
      removeOnFail: 5000,
    },
  );

  return c.json({ id: user.id }, 201);
});
```

Notice what changed. The API still creates the user. It no longer waits for SMTP. It waits for Redis to accept a job, which is usually far cheaper and more predictable than waiting for an email provider.

### Process the Job in a Worker

```ts :collapsed-lines title="worker/email-worker.ts"
import { Worker } from 'bullmq';
import { emailClient } from '../lib/email-client';
import { renderTemplate } from '../lib/templates';

new Worker(
  'email',
  async (job) => {
    const { to, template, variables } = job.data;

    await emailClient.send({
      to,
      subject: subjectFor(template),
      html: renderTemplate(template, variables),
    });
  },
  {
    connection: redisConnection,
    concurrency: 5,
  },
);
```

Run the worker as a separate process from the API. That way an email outage slows the worker, not every HTTP response.

### Return the Right Status

For signup, `201 Created` is still correct if the account exists and the confirmation email is queued.

For endpoints that only trigger work, prefer `202 Accepted` and return a job or delivery id when the client needs to track progress.

---

## 6. How to Handle Retries, Failures, and Idempotency

Moving email to a queue isn't enough. You also need failure rules.

### Retry Transient Errors

Network blips, `429 Too Many Requests`, and `503 Service Unavailable` should retry with backoff. Permanent errors like an invalid recipient should fail fast and land in a dead-letter queue or failed-jobs table.

### Make Jobs Idempotent

Workers can run more than once. Use a stable `jobId` or `idempotencyKey` so a retry doesn't send five welcome emails for one signup.

A practical approach:

- derive the key from the business event: `confirm-account:user_123`
- store provider message ids when a send succeeds
- skip work if that key was already delivered

### Don't Lose the Business Event

If the process crashes between `db.users.create()` and `emailQueue.add()`, you can lose the email.

There are two common ways to reduce that risk:

1. **Outbox pattern**: write the email intent into an `outbox` table in the same database transaction as the user row. A separate publisher reads the outbox and enqueues jobs.
2. **Transactional enqueue where supported**: keep the write and the enqueue as close together as possible, and run reconciliation jobs for missed sends.

For many apps, a simple queue plus monitoring is enough at first. Add an outbox when missed emails become a real reliability requirement.

### Separate Urgent Mail from Bulk Mail

Password reset and OTP emails shouldn't sit behind a newsletter blast.

Use priorities or separate queues:

- high priority: OTP, password reset, confirmation
- normal priority: receipts, onboarding
- low priority: digests, marketing

That keeps user-blocking email fast even when bulk traffic spikes.

---

## 7. What Else Should Leave the Request Path

If a task calls a third-party network API, can take more than a few hundred milliseconds, or it needs retries, keep it out of the request path. Same if it can fail without undoing the main business action or it does CPU-heavy work like image or PDF generation.

Here are some common examples of these types of tasks:

- emails and SMS
- webhook fan-out
- search indexing
- thumbnail generation
- invoice PDF creation
- CRM sync
- AI transcription or summarization
- slow report generation

Your API should confirm the intent and persist the state. Workers should do the slow parts.

---

## 8. A Practical Checklist

Before you ship a feature that sends email, ask:

1. Does the user need the email to finish before seeing success?
2. Can the email provider being down break this endpoint?
3. If sending fails after the database write, how do we recover?
4. If the job runs twice, will the user get duplicate messages?
5. Do OTP and password-reset emails have a faster lane than bulk email?
6. Can we see failed jobs in logs, metrics, or a dashboard?
7. Do we alert when the queue depth or failure rate spikes?

If you can't answer those questions, the design isn't ready for production.

---

## Conclusion

Sending email inside your API request couples your response time and your error rate to a third-party system you don't control. It feels simple in a demo and becomes expensive in production.

The better default is simple:

- commit the business change
- enqueue the email
- return quickly
- let a worker send, retry, and report failures

That pattern makes your API faster, your email delivery more reliable, and your failure modes much easier to reason about.

Once you make that split for email, you'll start seeing the same boundary everywhere: if the user shouldn't wait for it, it doesn't belong in the request.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why You Should Never Send Emails Inside Your API Requests",
  "desc": "Your signup endpoint looks fine in development. A user registers, you save the row, you call your email provider, and you return 201 Created. Everyone gets a welcome email. You ship it. Then productio",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-you-should-never-send-emails-inside-your-api-requests.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
