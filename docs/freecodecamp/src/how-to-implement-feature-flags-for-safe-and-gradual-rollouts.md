---
lang: en-US
title: "How to Implement Feature Flags for Safe and Gradual Rollouts"
description: "Article(s) > How to Implement Feature Flags for Safe and Gradual Rollouts"
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
      content: "Article(s) > How to Implement Feature Flags for Safe and Gradual Rollouts"
    - property: og:description
      content: "How to Implement Feature Flags for Safe and Gradual Rollouts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-feature-flags-for-safe-and-gradual-rollouts.html
prev: /programming/ts/articles/README.md
date: 2026-09-14
isOriginal: false
author:
  - name: Abisoye Alli-Balogun
    url: https://freecodecamp.org/news/author/AbisoyeAlli/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c454c134-d09d-4d92-b0ba-99cbf685fe67.png
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
  name="How to Implement Feature Flags for Safe and Gradual Rollouts"
  desc="Feature flags are one of the most powerful tools in a team's deployment arsenal. They decouple deployment from release, meaning your CI/CD pipeline can push code to production servers on every merge, "
  url="https://freecodecamp.org/news/how-to-implement-feature-flags-for-safe-and-gradual-rollouts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c454c134-d09d-4d92-b0ba-99cbf685fe67.png"/>

Feature flags are one of the most powerful tools in a team's deployment arsenal. They decouple *deployment* from *release*, meaning your CI/CD pipeline can push code to production servers on every merge, but users only see new behavior when you explicitly flip a switch.

The deploy is a technical event, while the release is a product decision. This separation is what makes everything else in this article possible.

But poorly implemented flags create tech debt, testing nightmares, and runtime complexity. In this article, you'll learn the core patterns for implementing feature flags, from simple boolean toggles to percentage-based rollouts and user segmentation, along with lifecycle management and anti-patterns to avoid. Here's how to get them right.

---

## Why Feature Flags?

The core value proposition is simple: deploy anytime, release when ready.

- **Reduce deployment risk:** Ship code behind a flag, enable for X% of users, monitor, then ramp up
- **Enable trunk-based development:** No long-lived feature branches that drift from main
- **Support experimentation:** A/B test features with real users before committing
- **Provide kill switches:** Instantly disable a feature if something goes wrong in production

---

## Types of Feature Flags

Not all flags serve the same purpose. Understanding the types helps you manage their lifecycle:

| Type | Purpose | Lifespan | Example |
| --- | --- | --- | --- |
| **Release** | Gate incomplete features | Days to weeks | New checkout flow |
| **Experiment** | A/B test variations | Weeks to months | Pricing page layout |
| **Ops** | Control operational behavior | Permanent | Rate limiting toggle |
| **Permission** | Entitlement-based access | Permanent | Premium tier features |

Release flags should be short-lived. If a flag has been on for everyone for three months, it's not a flag. It's dead code waiting to confuse someone.

---

## Pattern 1: Simple Boolean Toggle

This is the most basic pattern. It's good for internal features or kill switches.

```tsx
interface FeatureFlags {
  newDashboard: boolean;
  experimentalSearch: boolean;
  maintenanceMode: boolean;
}

function getFlags(userId: string): FeatureFlags {
  // Fetch from your flag provider (LaunchDarkly, Unleash, or similar)
  return flagProvider.evaluate(userId);
}

// Usage
if (flags.newDashboard) {
  return <NewDashboard />;
}
return <LegacyDashboard />;
```

In the code above, the `getFlags` function takes a `userId` and asks your flag provider to evaluate all flags for that user. The result is a plain object where each key is a flag name and each value is `true` or `false`.

At the call site, you check the flag before deciding which component to render. If `newDashboard` is `true`, the user sees the new experience. If it's `false` or if they haven't been given access yet, they fall through to the legacy one.

The flag provider handles all the targeting logic. Your application code just reads the result and branches on it.

Use this pattern for internal tools, kill switches, and features that are all-or-nothing.

But keep in mind that boolean flags don't give you gradual rollout control. You're either on or off. So use cautiously.

---

## Pattern 2: Percentage-Based Rollout

Use this pattern to roll out to a percentage of users, increasing gradually as you build confidence.

```ts
interface RolloutConfig {
  percentage: number; // 0-100
  sticky: boolean;    // Same user always gets same result
}

function isEnabled(
  flagName: string,
  userId: string,
  config: RolloutConfig
): boolean {
  if (!config.sticky) {
    return Math.random() * 100 < config.percentage;
  }

  // Deterministic hash ensures consistency per user
  const hash = deterministicHash(`${flagName}:${userId}`);
  return (hash % 100) < config.percentage;
}

function deterministicHash(input: string): number {
  let hash = 0;
  for (const char of input) {
    hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  }
  return Math.abs(hash);
}
```

In the code above, `isEnabled` takes a flag name, a user ID, and a rollout config, and returns a boolean. When `sticky` is `false`, it calls `Math.random()`, which means the same user could get a different result on every request. This isn't what you want for a consistent user experience. When `sticky` is `true`, it runs `deterministicHash` instead.

`deterministicHash` converts a string into a number using a standard bitwise hash. The key detail is that the input combines the flag name *and* the user ID: `"new-checkout:user-123"`. Hashing both together means user 123's bucket assignment is independent per flag: they might be in the 10% for one experiment and out of it for another.

The hash result is then taken modulo 100 to produce a number between 0 and 99. If that number falls below the rollout percentage, the flag is on for that user. Because the hash of the same string always produces the same number, the same user always lands on the same side of the threshold.

Sticky hashing matters. Without it, a user at 10% rollout might see the feature on one request and not the next. Use a deterministic hash of `flagName + userId` so the same user always lands on the same side of the threshold.

#### Recommended ramp schedule:

Each step should hold for at least 24 hours of stable metrics (error rates, latency p99, business KPIs) before progressing. The trigger to advance isn't time, it's confidence.

1. **1%:** Smoke test to catch catastrophic errors. You're looking for crashes, not statistics. If nothing explodes in 24 hours, move on.
2. **5%:** Validate metrics at small scale. Now you have enough traffic to spot elevated error rates, but not enough to cause widespread impact if something's wrong.
3. **25%:** Watch for edge cases and performance under load. At this scale, race conditions, cache invalidation bugs, and slow queries start to surface.
4. **50%:** Compare metrics side by side with statistical significance. You have a large enough cohort for meaningful A/B comparison.
5. **100%:** Full rollout, then clean up the flag.

---

## Pattern 3: User Segment Targeting

Use this pattern to target specific groups such as internal employees, beta users, specific regions, or account tiers.

```ts
interface SegmentRule {
  attribute: string;
  operator: "eq" | "in" | "gt" | "lt" | "contains";
  // Note: "gt" and "lt" operators only make sense with number values.
  // A production system should validate operator-value compatibility
  // at configuration time rather than relying on the caller.
  value: string | string[] | number;
}

interface FlagConfig {
  defaultValue: boolean;
  rules: Array<{
    segments: SegmentRule[];
    value: boolean;
    rolloutPercentage?: number;
  }>;
}

function evaluateFlag(
  flagName: string,
  config: FlagConfig,
  context: Record<string, unknown>
): boolean {
  for (const rule of config.rules) {
    if (matchesAllSegments(rule.segments, context)) {
      if (rule.rolloutPercentage !== undefined) {
        // Reuses isEnabled() from Pattern 2
        return isEnabled(flagName, context.userId as string, {
          percentage: rule.rolloutPercentage,
          sticky: true,
        });
      }
      return rule.value;
    }
  }
  return config.defaultValue;
}
```

In the above code, `evaluateFlag` loops through the rules in order and returns as soon as it finds one where the user's context matches all the segment conditions. Each `SegmentRule` specifies an attribute (like `"accountTier"`), an operator (like `"eq"` or `"in"`), and a value to compare against. `matchesAllSegments` checks every rule in a segment, all of them must pass for the rule to match.

If a matching rule has a `rolloutPercentage`, it doesn't enable the flag for the entire segment at once. Instead, it calls `isEnabled` from Pattern 2, so you can roll out to, say, 10% of beta users before enabling it for all of them.

If there's no `rolloutPercentage`, the rule's `value` is returned directly. If no rule matches at all, the flag falls back to `config.defaultValue`. Rules are evaluated in order, so more specific rules (internal employees, beta users) should come before broader ones (percentage of all users).

A typical rollout strategy combines segments and percentages:

1. Enable for internal employees (dogfooding)
2. Enable for beta opt-in users
3. Roll out to 10% of free-tier users
4. Roll out to 10% of paid-tier users (higher stakes)
5. Gradually increase both segments

---

## Pattern 4: Multi-Variant Flags

When you need more than on/off, this is useful for A/B/C testing or configuration variants.

```ts
type Variant = "control" | "variant_a" | "variant_b";

interface MultiVariantConfig {
  variants: Array<{
    name: Variant;
    weight: number; // Percentage allocation
  }>;
}

// config must be pre-validated with MultiVariantConfigSchema.parse()
function getVariant(
  flagName: string,
  config: MultiVariantConfig,
  userId: string
): Variant {
  // Include flagName in the hash so users land in independent buckets
  // across different experiments, without this, bucket assignment
  // is correlated and undermines statistical independence.
  const hash = deterministicHash(`${flagName}:${userId}`) % 100;
  let cumulative = 0;

  for (const variant of config.variants) {
    cumulative += variant.weight;
    if (hash < cumulative) {
      return variant.name;
    }
  }

  return config.variants[0].name; // Fallback to first variant
}

// Usage
const variant = getVariant("search-experiment", searchConfig, userId);

switch (variant) {
  case "control":
    return <CurrentSearch />;
  case "variant_a":
    return <SearchWithFilters />;
  case "variant_b":
    return <SearchWithAI />;
}
```

**Note: make sure all weights sum to 100.** Validate this at configuration time, not at evaluation time. A misconfigured experiment is worse than no experiment.

In the code above, `getVariant` works like a weighted lottery. It hashes the flag name and user ID into a number between 0 and 99, then walks through the variant list accumulating weights.

When the hash value falls below the running total, that's the variant the user gets. For example, with weights of control: 50, `variant_a: 25`, `variant_b: 25`, a hash of 60 would land in `variant_a` (cumulative at that point: 75), and a hash of 30 would land in control (cumulative: 50). Because the hash is deterministic, the same user always gets the same variant for the same flag, they won't flip between experiences across requests.

The switch statement at the call site then maps each variant name to a different component. `control` renders the existing experience so you have a baseline to compare against. `variant_a` and `variant_b` render the alternatives you're testing. You track metrics per variant and compare them once you have enough traffic to draw a statistically significant conclusion.

```ts
import { z } from "zod";

const VariantSchema = z.object({
  name: z.string(),
  weight: z.number().min(0).max(100),
});

const MultiVariantConfigSchema = z
  .object({
    variants: z.array(VariantSchema).min(1),
  })
  .refine(
    (config) => {
      const total = config.variants.reduce((sum, v) => sum + v.weight, 0);
      return total === 100;
    },
    { message: "Variant weights must sum to 100" }
  );

// Validates at config load time — bad configs never reach evaluation
const config = MultiVariantConfigSchema.parse(rawConfig);
```

---

## The Flag Lifecycle

Flags that outlive their purpose become technical debt. To avoid this, you can establish a lifecycle:

### 1. Creation

Every flag should have metadata:

```ts
interface FlagMetadata {
  name: string;
  owner: string;           // Team or person responsible
  createdAt: Date;
  expectedRemovalDate: Date; // Forces planning for cleanup
  type: "release" | "experiment" | "ops" | "permission";
  description: string;
  jiraTicket?: string;      // Link to tracking issue
}
```

The `expectedRemovalDate` only works if something enforces it. Here's a concrete approach: a scheduled job that runs daily and creates cleanup tickets when flags expire:

```ts
// Run daily via cron or scheduled CI job
async function auditStaleFlags(flags: FlagMetadata[]) {
  const now = new Date();
  const staleFlags = flags.filter(
    (f) =>
      f.type === "release" &&
      f.expectedRemovalDate < now
  );

  for (const flag of staleFlags) {
    const daysOverdue = Math.floor(
      (now.getTime() - flag.expectedRemovalDate.getTime()) / 86_400_000
    );

    // In practice, check for an existing open ticket before creating
    // a duplicate. Use an upsert keyed on the flag name, or skip
    // creation if an open ticket with the [Stale Flag] label exists.
    await createJiraTicket({
      title: `[Stale Flag] Remove "${flag.name}" (${daysOverdue} days overdue)`,
      assignee: flag.owner,
      priority: daysOverdue > 30 ? "high" : "medium",
      labels: ["tech-debt", "feature-flag-cleanup"],
    });

    // Optionally: post to Slack, block deploys, or log warnings
    logger.warn(`Flag "${flag.name}" is ${daysOverdue} days past removal date`);
  }
}
```

Some teams go further and fail CI if a release flag exists past its removal date. That's aggressive but effective, as it ensures that flags never become permanent by accident.

### 2. Active Management

Monitor flag usage during rollout:

- **Error rates:** Compare flagged vs unflagged cohorts
- **Latency:** Does the new code path add overhead?
- **Business metrics:** Conversion, engagement, revenue per cohort
- **Flag evaluation count:** Is the flag being checked where expected?

### 3. Cleanup

This is the hard part. Stale flags accumulate fast.

If you're using a database-backed flag system (or can query your managed provider's API), a simple query surfaces cleanup candidates. This assumes a `feature_flags` table with columns tracking each flag's current rollout percentage, the date it reached that percentage, and its type:

```sql
-- Find flags that have been at 100% for over 30 days
-- These are candidates for cleanup
SELECT name, enabled_at FROM feature_flags WHERE 1=1
AND percentage = 100
AND enabled_at < NOW() - INTERVAL '30 days'
AND type = 'release';
```

You can automate flag cleanup reminders. Set up alerts when a release flag has been at 100% for more than two weeks. Create a Jira ticket automatically. Make it easy to do the right thing.

---

## Anti-Patterns to Avoid

### Nested Flag Dependencies

```ts
// Don't do this
if (flags.newCheckout) {
  if (flags.newPaymentProcessor) {
    if (flags.newFraudDetection) {
      // Which combination was tested?
    }
  }
}
```

Three boolean flags create eight possible states. Most of those states were never tested. If flags depend on each other, combine them into a single flag or document the valid combinations explicitly.

### Flag-Driven Architecture

```ts
// Don't do this
function calculatePrice(item: Item, flags: FeatureFlags) {
  let price = item.basePrice;

  if (flags.newTaxCalculation) price = applyNewTax(price);
  else price = applyOldTax(price);

  if (flags.loyaltyDiscount) price = applyLoyalty(price);

  if (flags.bulkPricing && flags.newBulkTiers) {
    price = applyNewBulkPricing(price);
  } else if (flags.bulkPricing) {
    price = applyOldBulkPricing(price);
  }

  return price;
}
```

If your business logic reads like a flag evaluation engine, you have a design problem. Keep flags at the boundary, route to entirely different implementations rather than sprinkling conditionals throughout.

```ts
// Do this instead — flag check lives at the boundary
interface PricingStrategy {
  calculate(item: Item): number;
}

const legacyPricing: PricingStrategy = {
  calculate(item) {
    return applyOldTax(applyOldBulkPricing(item.basePrice));
  },
};

const newPricing: PricingStrategy = {
  calculate(item) {
    return applyNewTax(applyLoyalty(applyNewBulkPricing(item.basePrice)));
  },
};

// Single flag check at the entry point — no conditionals in business logic
const pricing = flags.newPricingEngine ? newPricing : legacyPricing;
const finalPrice = pricing.calculate(item);
```

Each implementation is self-contained and independently testable. The flag decides *which* strategy to use, not *how* the strategy works.

### No Default Fallback

Always define what happens when the flag service is unavailable:

```ts
function getFlag(name: string, defaultValue: boolean): boolean {
  try {
    return flagService.evaluate(name);
  } catch {
    // Flag service is down? Fail safe
    logger.warn(`Flag service unavailable, using default for ${name}`);
    return defaultValue;
  }
}
```

Default to the safe option. For new features, the safe default is usually `false` (feature off). For kill switches, the safe default is usually `true` (system running).

---

## Testing with Feature Flags

Feature flags multiply your test surface. Be deliberate about what you test:

```ts
describe("checkout flow", () => {
  it("works with new checkout enabled", () => {
    setFlag("newCheckout", true);
    // Test the new path
  });

  it("works with new checkout disabled", () => {
    setFlag("newCheckout", false);
    // Test the old path
  });

  // Only test valid flag combinations
  it("works with new checkout + new payment", () => {
    setFlag("newCheckout", true);
    setFlag("newPaymentProcessor", true);
    // Test the combined path
  });
});
```

Don't test every permutation. Test the combinations you actually intend to deploy.

---

## Choosing a Flag System

| Approach | Pros | Cons | Best For |
| --- | --- | --- | --- |
| **Config file** | Simple, version controlled | Requires redeploy | Small teams, few flags |
| **Environment variables** | Simple, per-environment | Requires restart | Ops flags |
| **Database** | Dynamic, no restart | Need to build UI | Growing teams |
| **Managed service** (LaunchDarkly, Unleash) | Full-featured, analytics | Cost, vendor lock-in | Scaling teams |

Start simple. A config file or environment variable is fine when you have five flags. Move to a managed service when you need targeting rules, audit logs, and real-time updates across services.

---

## Conclusion

In this article, you learned how to implement feature flags using four core patterns: simple boolean toggles, percentage-based rollouts with sticky hashing, user segment targeting, and multi-variant flags for A/B testing.

You also learned how to manage flag lifecycles, avoid common anti-patterns, and test effectively with flags.

Here's a quick summary of the key points:

1. **Decouple deploy from release:** Ship code behind flags, release when confident
2. **Use sticky hashing:** Users should get a consistent experience
3. **Plan for cleanup:** Every release flag should have an expiration date
4. **Avoid nested flag dependencies:** Combinatorial states are untestable
5. **Default safe:** When the flag service is down, fail to the safe state
6. **Keep flags at the boundary:** Route to different implementations, don't sprinkle conditionals
7. **Monitor both cohorts:** Compare error rates, latency, and business metrics

The through-line across all of these patterns: feature flags are a risk management tool, not a code organization tool. Use them to control exposure, not to structure logic.

Ship the flag, ramp the rollout, confirm the metrics, then clean it up. The moment a flag stops serving that cycle, it's debt.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement Feature Flags for Safe and Gradual Rollouts",
  "desc": "Feature flags are one of the most powerful tools in a team's deployment arsenal. They decouple deployment from release, meaning your CI/CD pipeline can push code to production servers on every merge, ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-feature-flags-for-safe-and-gradual-rollouts.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
