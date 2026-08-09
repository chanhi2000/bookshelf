---
lang: en-US
title: "How to Modernize a Legacy Application with AI Without Turning It Into a Rewrite"
description: "Article(s) > How to Modernize a Legacy Application with AI Without Turning It Into a Rewrite"
icon: fas fa-language
category:
  - TypeScript
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Modernize a Legacy Application with AI Without Turning It Into a Rewrite"
    - property: og:description
      content: "How to Modernize a Legacy Application with AI Without Turning It Into a Rewrite"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/modernize-legacy-applications-with-ai.html
prev: /ai/llm/articles/README.md
date: 2026-08-14
isOriginal: false
author:
  - name: Hugo Teijiz
    url: https://freecodecamp.org/news/author/hugo-teijiz/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2eb7ca1a-00d1-4dd4-a4a0-2f64eeb40388.png
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

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Modernize a Legacy Application with AI Without Turning It Into a Rewrite"
  desc="I have seen legacy migrations considered successful because the old framework disappeared from the repository. Six months later, the team was still dealing with the same coupling, the same unclear bus"
  url="https://freecodecamp.org/news/modernize-legacy-applications-with-ai"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2eb7ca1a-00d1-4dd4-a4a0-2f64eeb40388.png"/>

I have seen legacy migrations considered successful because the old framework disappeared from the repository.

Six months later, the team was still dealing with the same coupling, the same unclear business rules, and almost the same deployment problems.

The technology had changed but the system hadn't changed very much as a whole.

AI makes this problem even more interesting.

It can translate code faster than a team could do manually. It can explain unfamiliar classes, generate tests, create adapters, update APIs, and remove a significant amount of repetitive work.

But if you point an AI coding tool at an old application and simply ask it to migrate everything to a modern stack, there's a good chance you'll get exactly what you asked for: **the same system, rewritten faster.**

That's not necessarily modernization.

In this tutorial, I want to show you a different way to use AI during a legacy migration.

Instead of treating AI as an automated code translator, you'll use it to help you:

- understand an unfamiliar codebase,
- identify business rules and hidden dependencies,
- build a behavioral safety net,
- find boundaries for incremental migration,
- refactor before replacing,
- automate repetitive transformations,
- compare old and new behavior,
- and detect regressions before they reach production.

The examples use TypeScript, but the process itself isn't tied to TypeScript or Node.js.

The important part is the workflow. AI can make migration work faster. But Engineering still has to decide what's worth migrating.

::: note Prerequisites

You should be comfortable with:

- basic TypeScript,
- unit and integration testing,
- dependency injection,
- software architecture concepts,
- and working with an existing codebase.

The examples use Vitest, but the same ideas apply if you use Jest or another testing framework.

:::

---

## How to Avoid a One-to-One Legacy Migration

Imagine that you find this function in an old order-processing system:

```ts
async function processOrder(order: Order) {
  if (!order.customer.active) {
    throw new Error("Inactive customer");
  }

  const discount =
    order.customer.type === "PREMIUM"
      ? order.total * 0.1
      : 0;

  const finalAmount = order.total - discount;

  await db.orders.insert({
    customerId: order.customer.id,
    amount: finalAmount,
  });

  await paymentGateway.charge(
    order.customer.card,
    finalAmount,
  );

  await mailer.send(
    order.customer.email,
    "Order processed",
  );

  return finalAmount;
}
```

The function works, but it also does quite a lot.

It validates the customer, applies a pricing rule, persists data, charges a payment method, and sends a notification.

A one-to-one migration might turn this into a prettier TypeScript service with newer libraries while keeping all those responsibilities together.

You might replace an old controller with a new controller, an old service with a new service, and an old ORM with a new ORM...and still preserve the same architectural problem.

This is one of the first places where AI can work against you.

If your prompt is:

```md title="prompt"
Convert this legacy class to TypeScript.
```

the model will normally preserve the structure because preserving the structure is the task you gave it.

Before asking AI to transform code, separate two questions:

1. **What behavior must survive?**
2. **What design should survive?**

Those aren't the same question.

Sometimes an implementation is old but its behavior is still essential. Sometimes the behavior matters but the implementation should disappear. And sometimes you discover that neither needs to survive.

That distinction should happen before the bulk migration begins.

---

## How to Map a Legacy Codebase Before Changing It

The first difficult part of a legacy migration is usually understanding what you actually have.

Documentation helps when it exists. But in many systems, the real documentation is distributed across:

- conditional statements,
- database constraints,
- scheduled jobs,
- comments,
- logs,
- integration code,
- tests,
- configuration,
- and knowledge that lives in people's heads.

This is an area where AI can save time without being asked to make architectural decisions.

Take the previous `processOrder` function. Instead of asking AI to rewrite it, start with questions such as:

```md title="prompt"
Identify the business rules in this function.

List every side effect.

Which external systems does it depend on?

Which parts could be expressed as pure functions?

Which observable behaviors should probably be protected
with tests before this function is changed?

Do not rewrite the function.
```

The last instruction matters more than it may seem.

When analysis and transformation happen in the same request, it becomes easy for an AI tool to solve a design problem you haven't fully understood yet.

I prefer to make the analysis explicit first.

For a larger codebase, repeat the process at several levels.

At repository level, look for:

- entry points,
- database access,
- external APIs,
- message queues,
- background jobs,
- scheduled tasks,
- configuration,
- shared state,
- authentication,
- and authorization.

At module level, look for:

- business rules,
- dependencies,
- side effects,
- duplicated logic,
- highly coupled classes,
- and implicit contracts.

At function level, look for:

- inputs,
- outputs,
- exceptions,
- state changes,
- external calls,
- and edge cases.

AI can make this exploration much faster. But its findings should be checked against the actual repository, tests, schema, logs, and production behavior.

A confident explanation of the code is still only an explanation. **The repository remains the source of truth.**

---

## How to Build Characterization Tests Before Refactoring

One of the uncomfortable parts of legacy software is that strange behavior is not necessarily accidental.

You may find code that looks obviously wrong and discover later that another part of the business depends on it.

This is where characterization tests are useful.

Michael Feathers discusses this approach in [*Working Effectively with Legacy Code*](https://pearson.com/en-us/subject-catalog/p/working-effectively-with-legacy-code/P200000008984/9780131177055): instead of beginning by describing how the system should behave, you first capture how it behaves today.

Consider this function:

```ts
export function calculateDiscount(
  customerType: string,
  total: number,
): number {
  if (customerType === "PREMIUM") {
    return total * 0.1;
  }

  return 0;
}
```

You can protect its current behavior with tests:

```ts
import { describe, expect, it } from "vitest";
import { calculateDiscount } from "./calculateDiscount";

describe("calculateDiscount", () => {
  it("applies a 10 percent discount to premium customers", () => {
    expect(
      calculateDiscount("PREMIUM", 100),
    ).toBe(10);
  });

  it("does not discount regular customers", () => {
    expect(
      calculateDiscount("REGULAR", 100),
    ).toBe(0);
  });

  it("returns zero when the order total is zero", () => {
    expect(
      calculateDiscount("PREMIUM", 0),
    ).toBe(0);
  });
});
```

AI is useful for expanding this safety net.

For example:

```md title="prompt"
Generate characterization tests for this function.

Preserve the existing behavior.

Include:
- normal inputs,
- boundary values,
- invalid inputs,
- exceptions,
- observable side effects.

Do not redesign the function.
```

Then review what it generates.

You aren't proving that the old behavior is correct. You're recording what will change if you refactor it.

That difference matters.

If a test captures a behavior you later decide is a bug, change it intentionally. What you want to avoid is changing behavior accidentally and discovering the difference after deployment.

---

## How to Find Safe Migration Seams

Legacy applications rarely need to be replaced all at once.

They usually need places where the old and new systems can coexist temporarily.

Feathers also describes the idea of a **seam** in *Working Effectively with Legacy Code*: a place where you can alter behavior without having to modify everything around it.

The order-processing example gives you one possible seam.

The original function contains:

- customer validation,
- discount calculation,
- database persistence,
- payment processing,
- and email notification.

The first two belong naturally to business behavior. The others involve infrastructure. That suggests a possible boundary.

**Domain/application responsibilities:**

- customer rules,
- pricing rules,
- order workflow.

**Infrastructure responsibilities:**

- database,
- payment provider,
- email provider.

AI can help identify candidates for these boundaries.

For example:

```md title="prompt"
Analyze these files and identify:

- business rules,
- infrastructure concerns,
- side effects,
- shared mutable state,
- duplicated logic,
- dependencies that make isolated testing difficult.

Suggest possible boundaries.

Do not rewrite the code yet.
```

Again, the AI output is input to an engineering decision. It shouldn't become the decision automatically.

When you find a good seam, you gain a place where modernization can progress without requiring a rewrite of the entire application.

---

## How to Refactor Toward Explicit Responsibilities

Once you understand a section of the code and have tests around its current behavior, refactoring becomes less dangerous.

The pricing rule can become a pure function:

```ts
export function calculateDiscount(
  customerType: string,
  total: number,
): number {
  if (customerType === "PREMIUM") {
    return total * 0.1;
  }

  return 0;
}
```

Customer validation can be separated:

```ts
export function validateCustomer(
  customer: Customer,
): void {
  if (!customer.active) {
    throw new Error("Inactive customer");
  }
}
```

Infrastructure can move behind contracts:

```ts
export interface OrderRepository {
  save(order: PersistedOrder): Promise<void>;
}

export interface PaymentGateway {
  charge(
    card: string,
    amount: number,
  ): Promise<void>;
}

export interface NotificationService {
  sendOrderConfirmation(
    email: string,
  ): Promise<void>;
}
```

The application workflow becomes easier to read:

```ts :collapsed-lines
export class ProcessOrder {
  constructor(
    private readonly orders: OrderRepository,
    private readonly payments: PaymentGateway,
    private readonly notifications: NotificationService,
  ) {}

  async execute(order: Order): Promise<number> {
    validateCustomer(order.customer);

    const discount = calculateDiscount(
      order.customer.type,
      order.total,
    );

    const finalAmount =
      order.total - discount;

    await this.orders.save({
      customerId: order.customer.id,
      amount: finalAmount,
    });

    await this.payments.charge(
      order.customer.card,
      finalAmount,
    );

    await this.notifications.sendOrderConfirmation(
      order.customer.email,
    );

    return finalAmount;
  }
}
```

There's nothing particularly revolutionary in this refactoring. That's part of the point.

Modernization doesn't require an exotic architecture.

Often the important improvement is simply making responsibilities explicit enough that the next change doesn't require understanding the entire application.

---

## How to Use AI for Mechanical Transformations

Once the boundaries are clear, AI becomes much more useful for implementation.

A surprising amount of migration work is necessary but repetitive:

- translating APIs,
- replacing framework conventions,
- generating adapters,
- converting configuration,
- updating type definitions,
- changing data access libraries,
- and updating repetitive integration code.

These are good places to use AI.

Imagine that the old system performs SQL directly:

```ts
async function getCustomer(id: number) {
  const result = await db.query(
    `SELECT * FROM customer WHERE id = ${id}`,
  );

  return result[0];
}
```

Before generating the new implementation, define the contract you want:

```ts
export interface CustomerRepository {
  findById(id: number): Promise<Customer | null>;
}
```

Then constrain the transformation:

```md title="prompt"
Implement CustomerRepository using the new database client.

Constraints:

- Keep the CustomerRepository interface unchanged.
- Use parameterized queries.
- Do not move business rules into the repository.
- Preserve the existing null behavior.
- Preserve the existing error semantics.
- Return only the implementation.
```

This is a very different request from:

```md title="prompt"
Modernize this database code.
```

In the first case, you made the architectural decision and asked AI to implement within that boundary.

That is where I find AI most useful in migration work. It removes mechanical effort after the important decisions have already been made.

---

## How to Migrate in Small Vertical Slices

Large migrations become difficult to reason about when thousands of files change together.

A safer unit of change is often a business capability.

Instead of migrating all controllers, then all services, and finally all repositories, migrate one complete capability.

For example:

**Create Order**

- API
- application logic
- domain rules
- persistence
- tests

Then move to the next capability.

This has several advantages. First, the migration remains closer to deployable software. Second, the context you give an AI tool stays smaller.

Testing also becomes more focused. And if something goes wrong, the failure is easier to isolate.

A useful first prompt for a vertical slice is analysis-only:

```md title="prompt"
We are migrating the Create Order capability.

The legacy implementation is under /legacy/orders.

The target architecture separates:
- domain,
- application,
- infrastructure.

The characterization tests under /tests/legacy
describe behavior that must remain compatible.

Analyze the current implementation.

List:
1. business rules,
2. external dependencies,
3. side effects,
4. likely migration risks,
5. files that need to change.

Do not generate code yet.
```

Review that output, then plan the actual transformation.

This is also compatible with an incremental replacement strategy such as Martin Fowler's [<VPIcon icon="fas fa-globe"/>Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html) approach, where new functionality gradually takes over from an older system instead of requiring one large cutover.

The important word is **gradually**.

AI can increase transformation speed. That doesn't make a big-bang migration less risky.

---

## How to Compare Legacy and Modern Behavior

Unit tests give you one kind of safety.

For a migration, I also like comparing the old and new implementations directly.

Suppose both systems can process the same order. You can run the same fixture through each one:

```ts
const inputs = [
  premiumCustomerOrder,
  standardCustomerOrder,
  inactiveCustomerOrder,
];

for (const input of inputs) {
  const legacyResult =
    await legacyProcessor(input);

  const modernResult =
    await modernProcessor(input);

  expect(modernResult).toEqual(legacyResult);
}
```

This is a simple form of differential testing. You can do the same thing at the HTTP boundary.

Send the same `POST /orders` request to both versions and compare:

- status codes
- response payloads
- database changes
- emitted events
- external calls
- errors

An important point: a difference isn't automatically a bug. Sometimes behavior is supposed to change. The useful thing is making the difference visible so someone has to classify it deliberately.

AI can help here too.

If you have hundreds of mismatches, you can ask it to group them:

```md title="prompt"
Analyze these behavioral mismatches.

Group them by likely cause.

Pay particular attention to:
- rounding,
- null handling,
- timezone conversion,
- validation,
- serialization,
- data mapping.

Do not label a mismatch as a defect unless the
available evidence supports that conclusion.
```

This is a good use of AI because the model is reducing investigation work. It's not deciding whether production behavior is acceptable.

---

## How to Use Shadow Traffic to Find Regressions

Eventually, test fixtures stop being representative enough.

Production systems receive combinations of inputs nobody thought to put into a test suite.

One way to observe those differences is shadow traffic. The legacy application continues serving the user's request, and a copy of that request also goes to the new implementation. The new result is used for comparison only and isn't returned to the user.

For example:

```md title="prompt"
Legacy:
200
{ "total": 90 }

Modern:
200
{ "total": 90 }

MATCH
```

Or:

```md title="prompt"
Legacy:
200
{ "total": 90 }

Modern:
200
{ "total": 100 }

MISMATCH
```

Collecting those mismatches gives you evidence about how the new system behaves under real traffic without immediately exposing users to it.

This technique comes with operational considerations. You need to think carefully about:

- duplicated side effects,
- payment calls,
- emails,
- writes,
- privacy,
- production load,
- and external API usage.

A shadow instance should generally avoid performing irreversible side effects.

For example, replace the real payment adapter with a recording adapter:

```ts
export class RecordingPaymentGateway
  implements PaymentGateway {

  public readonly calls: Array<{
    card: string;
    amount: number;
  }> = [];

  async charge(
    card: string,
    amount: number,
  ): Promise<void> {
    this.calls.push({
      card,
      amount,
    });
  }
}
```

Now you can compare the intention to charge without charging a customer twice.

---

## How to Test the Architecture You Actually Want

Behavioral compatibility isn't enough if one objective of the migration is improving the architecture.

Imagine that you've decided on this constraint:

> Domain code must not depend on infrastructure code.

If that rule only exists in an architecture diagram, migration pressure will eventually break it.

So test it.

For a simple project, you can inspect imports. For a larger one, use a dependency-analysis tool capable of enforcing architectural rules.

The exact tooling matters less than the principle:

**If an architectural constraint matters, make breaking it visible.**

You may want rules such as:

- domain must not depend on infrastructure
- domain must not depend on the HTTP framework
- application code must not depend directly on the database driver
- modules must not import another module's internal implementation

Why does this matter in an AI-assisted migration? Because AI is very good at finding a way to make code compile.

If reaching directly into another module solves the immediate problem, generated code may do exactly that unless the boundary is part of the constraints.

Architecture tests give both humans and AI tooling a harder boundary to violate accidentally.

---

## How to Decide Which Tasks AI Should Handle

I don't treat all migration tasks equally. Some are good candidates for automation.

### Tasks Where AI Is Usually Useful

- explaining unfamiliar code
- identifying dependencies
- extracting candidate business rules
- generating characterization test cases
- generating repetitive adapters
- updating framework APIs
- translating mechanical code
- creating migration checklists
- comparing implementations
- classifying regression output
- drafting technical documentation

### Tasks Where I Want Significant Engineering Review

- proposing module boundaries
- extracting domain concepts
- refactoring highly coupled classes
- choosing migration sequences
- changing data models
- designing integration boundaries

### Decisions I Would Keep Under Human Ownership

- target architecture
- acceptable behavioral differences
- security boundaries
- data migration strategy
- rollout strategy
- rollback strategy
- removal of legacy behavior
- production risk acceptance

This isn't because AI can't produce an architecture proposal. It can.

The problem is accountability and context.

Architecture choices are consequences of constraints, history, organizational capabilities, business priorities, and operational risks that may not exist anywhere in the repository.

A model can help you explore those choices, but someone still has to own them.

---

## How to Measure Whether the Migration Actually Improved the System

Migration velocity is an attractive metric because it's easy to show.

For example:

> 37% of the codebase migrated.

That doesn't tell you much about whether the system became better.

A modernization effort should look at several kinds of outcomes. Operational metrics might include:

- deployment frequency
- change failure rate
- mean time to recovery
- production incidents
- build time

Engineering metrics might include:

- test coverage
- high-complexity classes
- duplicated business rules
- cross-module dependencies
- architectural violations
- time required to change a capability

Migration-specific metrics might include:

- regression rate
- percentage of traffic handled by the new path
- unresolved behavioral mismatches
- rollback frequency
- legacy components still in use

The exact metrics depend on the system. What matters is avoiding this definition of success:

> Old repository is smaller = modernization succeeded.

AI makes it possible to transform more code in less time. That makes measuring the quality of the transformation more important, not less.

---

## The Risk I Worry About Most with AI-Assisted Migration

Hallucinated code is a clear risk. But I worry more about **plausible code**.

Generated code can compile. It can look cleaner than the original implementation. It can even pass a shallow test suite. And it can still subtly change a business rule that nobody realized existed.

Consider something as small as:

```ts
if (customer.balance > 0) {
  charge(customer);
}
```

It's tempting to clean up code when you don't understand why a condition exists.

But maybe zero has a special business meaning.

Maybe negative balances are legitimate.

Maybe the condition was introduced after a production incident six years ago and never documented.

AI can't recover context that doesn't exist in the information available to it. This is why I put so much emphasis on characterization tests and behavioral comparison.

::: note

The faster the transformation becomes, the stronger the validation process needs to become.

:::

Otherwise, you're only increasing the speed at which you can introduce unknown changes.

---

## A Practical Migration Workflow

If I had to reduce the process to one repeatable sequence, I would use this.

### 1. Understand

Map:

- behavior
- dependencies
- business rules
- side effects
- data
- integrations

Use AI to accelerate the investigation. Don't start by generating the new system.

### 2. Protect

Build:

- characterization tests
- integration tests
- API fixtures
- behavioral snapshots

Make current behavior observable.

### 3. Design

Choose:

- boundaries
- interfaces
- responsibilities
- migration seams

Do this before large-scale transformation.

### 4. Refactor

Create enough separation that part of the system can move without dragging everything else with it.

### 5. Transform

Use AI heavily for repetitive implementation work.

Give it explicit architectural constraints.

### 6. Compare

Run old and new behavior against the same inputs and investigate differences.

### 7. Release Gradually

Use the mechanisms appropriate for your environment:

- feature flags
- canary deployments
- shadow traffic
- observability
- rollback

### 8. Remove the Old Path

Don't leave both systems running indefinitely. A migration that never removes the legacy path eventually creates another legacy architecture.

---

## Conclusion

AI changes the economics of legacy modernization.

A lot of work that used to consume engineering hours can now happen much faster: reading unfamiliar code, generating tests, updating APIs, translating repetitive implementations, and investigating differences between systems.

That's useful. But it's not the part of modernization that requires the most judgment.

The difficult questions remain:

- What behavior still matters?
- What should disappear?
- Which dependencies should survive?
- Where should the boundaries be?
- How much behavioral change is acceptable?
- When is the new implementation safe enough to receive production traffic?

If you use AI only to translate code, you can migrate technical debt faster.

If you combine it with characterization testing, incremental refactoring, explicit architectural boundaries, differential testing, and controlled rollout, you have a better chance of improving the system while you move it.

The objective isn't to move the same system onto a newer stack. It's to understand it, protect its important behavior, refactor it, migrate it incrementally, validate the result, and end up with a simpler system than the one you started with.

AI can shorten that path. But it still can't decide what the destination should be.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Modernize a Legacy Application with AI Without Turning It Into a Rewrite",
  "desc": "I have seen legacy migrations considered successful because the old framework disappeared from the repository. Six months later, the team was still dealing with the same coupling, the same unclear bus",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/modernize-legacy-applications-with-ai.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
