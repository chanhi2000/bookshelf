---
lang: en-US
title: "API Versioning Should Be Your Last Resort"
description: "Article(s) > API Versioning Should Be Your Last Resort"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > API Versioning Should Be Your Last Resort"
    - property: og:description
      content: "API Versioning Should Be Your Last Resort"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/api-versioning-should-be-your-last-resort.html
prev: /academics/system-design/articles/README.md
date: 2026-05-09
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_193.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Desgin > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="API Versioning Should Be Your Last Resort"
  desc="Most teams reach for v2 too early because they don't have a contract evolution strategy. Here's the API change management approach I prefer: evolve contracts safely, deprecate deliberately, and version only when the old and new worlds can't coexist."
  url="https://milanjovanovic.tech/blog/api-versioning-should-be-your-last-resort"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_193.png"/>

I've written before about implementing [**API versioning**](/milanjovanovic.tech/api-versioning-in-aspnetcore.md) in ASP.NET Core.

But the more important question isn't *how* to version an API. It's *when*.

Every API team eventually reaches for the same escape hatch:

> Just create `v2`.

It sounds responsible. Except now you maintain two APIs, two sets of docs, two behaviors, and a migration project clients will postpone for as long as possible.

I also touched on this briefly in [**my REST API design mistakes article**](/milanjovanovic.tech/the-5-most-common-rest-api-design-mistakes-and-how-to-avoid-them.md), but I want to make the point more directly today:

**Versioning is a compatibility tool. It is not a design strategy.**

Most API changes do not require a new version. They require better change management.

And that distinction matters.

If you treat every contract change as a versioning problem, you end up cloning APIs. If you treat it as a change management problem, you start asking better questions:

- Can I add instead of replace?
- Can old and new behavior coexist for a while?
- Can I introduce a new operation instead of mutating an old one?
- Can I deprecate this safely with telemetry and a migration path?

That mindset leads to APIs that age much better.

---

## What Actually Breaks Clients?

Breaking changes usually aren't about the URL alone.

Clients break when you:

- Remove or rename fields
- Change the meaning of existing data
- Tighten request validation
- Change pagination or error formats
- Assume enum-like values are closed forever

This breaks a client just as surely as deleting an endpoint:

```json
// Before
{ "total": 100 }

// After
{ "total": { "amount": 100, "currency": "USD" } }
```

You didn't change the path. You didn't rename the endpoint. You still broke clients.

So instead of asking, "Should this be v2?", ask, "Can the old and new contract safely coexist?"

I'll use a simple `orders` API as the running example for the rest of the article.

---

## The Compatibility Rules

When I want an API to age well, I keep four rules in mind:

- Keep existing fields and behavior in place
- Don't turn optional request data into required data
- Don't change what an existing operation does
- Make anything new additive and optional by default

These map directly onto the four rules from Z. Nemec's [API Change Management (<VPIcon icon="fa-brands fa-medium"/>`good-api`)](https://medium.com/good-api/api-change-management-2fe5bba32e9b) article: don't take anything away, don't change processing rules, don't make optional things required, and anything you add must be optional.

If you follow those rules, many "versioning problems" turn back into ordinary contract evolution.

---

## 1. Add, Don't Replace

The safest change is usually an additive one.

Let's say your original `GET /orders/{id}` response looked like this:

```json
{
  "id": "ord_123",
  "status": "paid",
  "total": 100
}
```

Instead of replacing `total`, add a new field:

```json
{
  "id": "ord_123",
  "status": "paid",
  "total": 100,
  "totalMoney": {
    "amount": 100,
    "currency": "USD"
  }
}
```

Existing clients keep using `total`. New clients can migrate to `totalMoney`. You mark the old field as deprecated and remove it only after a real migration window.

The same idea applies beyond fields. If you need richer semantics, don't mutate a field into a different shape. Add a new field, a new link, or a new operation that carries the new meaning explicitly.

Sometimes an ugly contract is the price of compatibility.

---

## 2. Make Clients Tolerant Readers

A well-behaved client should not explode because the server added a field it doesn't understand.

If the response evolves from this:

```json
{
  "id": "ord_123",
  "status": "paid"
}
```

to this:

```json
{
  "id": "ord_123",
  "status": "paid",
  "estimatedDeliveryDate": "2026-05-29"
}
```

older clients should ignore the extra property and keep working.

In .NET, `System.Text.Json` helps because unknown properties are ignored by default. The real risk is usually overly strict generated SDKs or contract tests that assert exact JSON equality.

This is one of the most common self-inflicted problems I see. Teams say they want backward compatibility, then generate client models that reject any unexpected field in the response.

That is not a compatibility strategy. That is a trap.

Your server should be free to add optional data. Your clients should be resilient enough to ignore what they don't understand.

---

## 3. Don't Change What an Existing Operation Does

Fields and shapes get most of the attention in compatibility discussions, but the most dangerous breaking changes hide in **behavior**.

The URL is the same. The request body is the same. The response shape is the same. What the operation *does* on the server is different.

Take `DELETE /orders/{id}`.

When the API shipped, that endpoint was a soft delete. The order moved into an `archived` state, stayed in the database, still showed up in audit reports, and could be restored by support.

The contract that clients built on wasn't just the HTTP verb and the path. It was the full behavior:

- The order is recoverable
- Related invoices and shipments are untouched
- Audit history is preserved
- The same call is safe to retry

Months later, the team decides soft-delete is messy. The "fix" turns `DELETE /orders/{id}` into a hard delete:

- The order row is gone
- Related invoices cascade or get orphaned
- Audit history loses references
- Retrying after a network blip can wipe the wrong record

No client noticed at code-review time. The SDK call still compiles. The response is still `204 No Content`. A support tool that used to call `DELETE` and then "undo" it now silently destroys data.

This is exactly the kind of change Z. Nemec's rules call out: **you must not change the processing rules of an existing operation.** Once clients have integrated, the behavior *is* the contract, even if it was never written down anywhere.

The same pattern shows up in subtler ways:

- `POST /orders` used to be idempotent on a client-supplied key, then quietly stops being
- `POST /orders/{id}/cancel` used to refund automatically, then stops issuing refunds because "refunds should be a separate call"
- `PUT /orders/{id}` used to be a full replace, then becomes a partial merge
- A webhook used to fire once per order, now fires per line item

Each of these keeps the URL, the verb, and the JSON shape stable. Each one breaks every existing integration in a way that won't show up in a schema diff.

The safe move is the same as before: **add, don't mutate.**

If you want a hard delete, expose it as a new operation and leave the old one alone:

```plaintext
DELETE /orders/{id}            # still soft-delete, unchanged
DELETE /orders/{id}?purge=true # new, opt-in hard delete
```

Or introduce a new resource entirely (`DELETE /orders/{id}/purge`) so the destructive behavior has its own name and its own permissions.

The rule is simple: **once an operation ships, its behavior is part of the contract.** You can add new operations next to it. You can deprecate it. You cannot quietly change what it does.

---

## 4. Be Very Careful With Validation

This one is underrated.

There are two flavors of the same mistake:

- Taking an existing optional field and making it required
- Adding a brand-new field and making it required from day one

Both break older clients in exactly the same way. The endpoint path doesn't move, but requests that used to succeed now get rejected.

Here's a simple example using `POST /orders`.

Yesterday this request was valid:

```json
{
  "customerId": "cus_123",
  "currency": "USD"
}
```

Today the API requires a country for tax calculation:

```json
{
  "customerId": "cus_123",
  "currency": "USD",
  "country": "US"
}
```

Whether `country` was previously optional or didn't exist at all, the result is the same: every existing integration starts failing at runtime.

A safer path is to accept missing values for older clients, infer defaults where possible, or introduce a new operation for the stricter workflow.

For example:

- Accept missing `country` during a transition window
- Infer it from an existing billing profile if you can
- Add a new `POST /checkout-sessions` flow that requires the richer request model

Response changes usually get careful design review. Request validation changes deserve the same scrutiny. And the underlying rule is the one that catches both flavors: **anything you add to the contract has to be optional, and anything that was optional has to stay optional.**

---

## A New Operation Is Often Cheaper Than a New Version

Sometimes the use case really did change enough that piling more flags and optional parameters onto an existing endpoint becomes confusing.

This is what a bad evolution path looks like:

```plaintext
POST /orders?validateOnly=true&includeTaxEstimate=true&reserveInventory=true
```

At that point you don't have one clean operation. You have multiple workflows hiding behind one endpoint.

That's when I prefer a new operation or resource over a whole API version.

```plaintext
POST /orders
POST /orders/quote
POST /checkout-sessions
```

This keeps the old contract stable while giving the new behavior a clean home.

`POST /orders` stays the simple "place an order" endpoint. `POST /orders/quote` becomes the "tell me what this would cost" operation. `POST /checkout-sessions` can support a richer, more guided flow without contaminating the original contract.

That is usually much cheaper than creating `/v2/orders` and dragging the rest of your API along with it.

---

## Deprecate Like You Mean It

This is the missing half of API change management.

Most deprecations are fake. They exist in docs, but nothing operational happens.

A real deprecation process should include four things:

1. Mark the old field or endpoint as deprecated in your OpenAPI description.
2. Signal the deprecation at runtime.
3. Give consumers a migration path.
4. Measure actual usage before removing anything.

If you're on HTTP, runtime signaling can be as simple as response headers like these:

```plaintext
Deprecation: true
Sunset: Wed, 31 Dec 2026 23:59:59 GMT
Link: <https://docs.example.com/migrations/orders-total>; rel="deprecation"
```

Now the deprecation is visible in the docs, visible in live traffic, and connected to an actual migration guide.

And this is where telemetry matters. If you don't know which clients still use the deprecated field or endpoint, you are not managing change. You are guessing.

Track usage by client ID, API key, tenant, or application name. Then wait until usage is effectively gone before removing anything.

---

## When Versioning Is Actually The Right Call

I am not anti-versioning.

Version when the old and new semantics cannot coexist safely. Version when the resource model changed fundamentally. Version when compatibility rules would force you into a contract nobody can reason about.

In those cases, version deliberately.

And deliberate versioning means choosing the smallest break you can justify.

Sometimes that's a new endpoint shape. Sometimes it's a representation variant. Sometimes, especially for public APIs, it's straightforward URL versioning because it is explicit and easy to communicate.

The key is not which mechanism you pick. The key is that you reached for it because coexistence failed, not because it was the first idea on the table.

And if you do version, pair it with an actual deprecation process:

- Mark old fields or endpoints as deprecated
- Communicate a removal date
- Give clients migration examples
- Monitor usage before removing anything

The real work is not creating `v2`. The real work is getting consumers off `v1`.

---

## Takeaway

The best API version is often the one you never have to create.

If you want a simple decision rule, use this:

1. Can I add instead of replace?
2. Can old and new contracts coexist during a migration window?
3. Can I introduce a new operation instead of mutating an old one?
4. Can I deprecate the old shape with docs, headers, and telemetry?

If the answer is yes, you probably don't need a new version.

If the answer is no, and the old and new worlds genuinely cannot live side by side, version deliberately.

That's the real point.

Design contracts to evolve. Treat clients as long-lived integrations, not just today's code. And reserve versioning for the cases where compatibility truly runs out.

If you want to go deeper on designing and evolving HTTP APIs, check out [**Pragmatic REST APIs**](/milanjovanovic.tech/pragmatic-rest-apis/README.md). It's where I cover the patterns, trade-offs, and implementation details I use when building APIs that need to survive real clients and real change.

Thanks for reading.

And stay awesome!

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "API Versioning Should Be Your Last Resort",
  "desc": "Most teams reach for v2 too early because they don't have a contract evolution strategy. Here's the API change management approach I prefer: evolve contracts safely, deprecate deliberately, and version only when the old and new worlds can't coexist.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/api-versioning-should-be-your-last-resort.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
