---
lang: en-US
title: "How to Build a Complete SaaS Payment Flow with Stripe, Webhooks, and Email Notifications"
description: "Article(s) > How to Build a Complete SaaS Payment Flow with Stripe, Webhooks, and Email Notifications"
icon: iconfont icon-typescript
category:
  - Node.js
  - React.js
  - TypeScript
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - ts
  - typescript
  - data-science
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Complete SaaS Payment Flow with Stripe, Webhooks, and Email Notifications"
    - property: og:description
      content: "How to Build a Complete SaaS Payment Flow with Stripe, Webhooks, and Email Notifications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/saas-payment-flow-stripe-webhooks-email/
prev: /programming/ts/articles/README.md
date: 2026-05-09
isOriginal: false
author:
  - name: Magnus Rødseth
    url: https://freecodecamp.org/news/author/magnusrodseth/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/de7d5c4d-062c-4879-892c-4486c7c461af.png
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
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Build a Complete SaaS Payment Flow with Stripe, Webhooks, and Email Notifications"
  desc="Most Stripe tutorials end at the checkout page. The customer clicks ”Pay,” Stripe processes the charge, and the tutorial congratulates you on integrating payments. But that's only the first 10% of a r"
  url="https://freecodecamp.org/news/saas-payment-flow-stripe-webhooks-email"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/de7d5c4d-062c-4879-892c-4486c7c461af.png"/>

Most Stripe tutorials end at the checkout page. The customer clicks "Pay," Stripe processes the charge, and the tutorial congratulates you on integrating payments.

But that's only the first 10% of a real payment system.

What happens after the customer pays? You need to record the purchase in your database, send a confirmation email, and grant product access (a GitHub repo invitation, an API key, a license file). You need to notify yourself as the admin. You need to handle refunds two weeks later and send recovery emails when someone abandons checkout.

This is the complete payment lifecycle, and it's where most SaaS applications break.

This article walks you through building the entire flow, from the "Buy" button to the "Welcome" email and everything in between. Every code example comes from a production application processing real payments. You'll see how to design the database schema, create Stripe products, build the checkout flow, process purchases reliably, handle refunds, recover abandoned carts, and send transactional emails.

Here is what you'll learn:

- How to design a database schema that tracks every stage of a purchase
- How to create Stripe products and prices programmatically
- How to build a checkout flow with success/cancel handling
- How to process webhooks securely with signature verification
- How to split post-payment processing into durable, independently retried steps
- How to handle full and partial refunds with automatic access revocation
- How to recover revenue from abandoned checkouts
- How to build transactional email templates with React Email and Resend
- How to test the entire flow locally with Stripe CLI and Inngest

---

## Table of Contents

- [Prerequisites](#heading-prerequisites)
- [How to Design the Payment Database Schema](#heading-how-to-design-the-payment-database-schema)
- [How to Create Stripe Products and Prices](#heading-how-to-create-stripe-products-and-prices)
- [How to Build the Checkout Flow](#heading-how-to-build-the-checkout-flow)
- [How to Handle Webhooks Securely](#heading-how-to-handle-webhooks-securely)
- [How to Process Purchases with Durable Background Jobs](#heading-how-to-process-purchases-with-durable-background-jobs)
- [How to Handle Refunds](#heading-how-to-handle-refunds)
- [How to Recover Abandoned Checkouts](#heading-how-to-recover-abandoned-checkouts)
- [How to Send Transactional Emails with React Email](#heading-how-to-send-transactional-emails-with-react-email)
- [How to Test the Complete Flow Locally](#heading-how-to-test-the-complete-flow-locally)
- [Conclusion](#heading-conclusion)

::: note Prerequisites

To follow along, you should be familiar with:

- TypeScript and Node.js
- SQL databases (the examples use PostgreSQL)
- React (for email templates)
- Basic understanding of webhooks

You don't need prior experience with any of the specific libraries. This handbook explains each one as it appears.

**What You Need Installed**

Install these packages to run the code examples:

```sh
bun add stripe drizzle-orm @neondatabase/serverless inngest resend @react-email/components
```

You'll also need:

- A [<VPIcon icon="iconfont icon-stripe"/>Stripe account](https://dashboard.stripe.com/register) (test mode is fine)
- A [<VPIcon icon="iconfont icon-neon"/>Neon](https://neon.tech) PostgreSQL database (or any PostgreSQL instance)
- A [<VPIcon icon="fas fa-globe"/>Resend](https://resend.com) account for sending emails
- The [<VPIcon icon="iconfont icon-stripe"/>Stripe CLI](https://stripe.com/docs/stripe-cli) for local webhook testing

**Environment Variables**

Set up these environment variables in your <VPIcon icon="iconfont icon-dotenv"/>`.env` file:

```sh title=".env"
# Database
DATABASE_URL=postgresql://...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...

# Email
RESEND_API_KEY=re_...
EMAIL_FROM="Your App <noreply@mail.yourapp.com>"
ADMIN_EMAIL=you@yourapp.com

# App
BETTER_AUTH_URL=http://localhost:3000
```

:::

---

## How to Design the Payment Database Schema

Before writing any Stripe code, you need a database schema that can track a purchase through every stage of its lifecycle: creation, completion, partial refund, and full refund.

![Purchase status state machine showing transitions from pending to completed via Stripe webhook, then to refunded or partially refunded](https://cdn.hashnode.com/uploads/covers/69a694d8d4dc9b42434c218f/6d0650fa-a568-4cb5-8560-8a2414635476.png)

A purchase starts as `pending` when the user clicks "Buy." After Stripe confirms payment, it transitions to `completed`. From there, it can move to `refunded` or `partially_refunded`. Pending purchases that are never completed expire after 24 hours (abandoned carts).

Here is the schema I use in production, defined with [<VPIcon icon="fas fa-globe"/>Drizzle ORM](https://orm.drizzle.team). The examples throughout this article grant access to a private GitHub repository because that's what this particular product sells.

Your "grant access" step will be different: upgrading a user to a Pro plan, provisioning API credits, unlocking course content, or activating a subscription. The schema fields and step logic change, but the durable execution pattern is the same.

```ts :collapsed-lines title="lib/db/schema.ts"
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const purchaseTierEnum = pgEnum("purchase_tier", ["pro"]);
export const purchaseStatusEnum = pgEnum("purchase_status", [
  "completed",
  "partially_refunded",
  "refunded",
]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  name: text("name"),
  image: text("image"),
  githubUsername: text("github_username"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const purchases = pgTable("purchases", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeCheckoutSessionId: text("stripe_checkout_session_id")
    .notNull()
    .unique(),
  stripeCustomerId: text("stripe_customer_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  tier: purchaseTierEnum("tier").notNull(),
  status: purchaseStatusEnum("status").notNull().default("completed"),
  githubAccessGranted: boolean("github_access_granted")
    .notNull()
    .default(false),
  githubInvitationId: text("github_invitation_id"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("usd"),
  purchasedAt: timestamp("purchased_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Purchase = typeof purchases.$inferSelect;
export type NewPurchase = typeof purchases.$inferInsert;
```

Let me walk through the design decisions behind this schema.

### Why Three Stripe ID Columns?

The `purchases` table stores three separate Stripe identifiers: `stripeCheckoutSessionId`, `stripeCustomerId`, and `stripePaymentIntentId`.

Each one serves a different purpose.

The **checkout session ID** is what you receive first. When a customer starts checkout, Stripe creates a session and gives you this ID. You use it to claim the purchase after the customer returns from Stripe's hosted checkout page.

The `unique()` constraint on this column is your idempotency guard. If someone tries to claim the same session twice, the database rejects the second insert.

The **customer ID** is Stripe's internal identifier for the buyer. You need this to look up the customer's payment history in Stripe's dashboard and to create future checkout sessions pre-filled with their billing info.

The **payment intent ID** is what Stripe sends in refund webhook events. When a `charge.refunded` event fires, it includes the payment intent ID but not the checkout session ID. Without storing this field, you would have no way to match a refund back to a purchase in your database.

### Why Track Access State in Your Database

The `githubAccessGranted` and `githubInvitationId` fields might look unnecessary. You could check GitHub's API to see if a user has access. But querying an external API every time you need to check a user's access state is slow, rate-limited, and unreliable.

By tracking access state in your own database, you can answer "does this user have access?" with a single indexed query. You also know whether access was ever granted, which is critical for refund processing. If `githubAccessGranted` is `false`, you don't need to revoke anything on refund.

### Why a Status Enum with Three Values?

The `purchaseStatusEnum` has three values: `completed`, `partially_refunded`, and `refunded`.

This matters for downstream logic. Your dashboard, analytics, support tools, and email sequences all need to know the exact state of a purchase. A partially refunded customer still has access, but a fully refunded customer doesn't.

If you only tracked "refunded" as a boolean, you would lose the distinction between partial and full refunds. That distinction affects whether you revoke product access.

### How to Generate and Run Migrations

After defining your schema, generate a migration file and apply it to your database:

```sh
# Generate migration SQL from schema changes
bun run drizzle-kit generate

# Push schema directly (development only)
bun run drizzle-kit push

# Run migrations (production)
bun run drizzle-kit migrate
```

Drizzle Kit compares your TypeScript schema to the database and generates the SQL needed to bring them in sync. Review the generated migration file before running it in production. Schema changes are one of the few things you can't easily undo.

For development, `drizzle-kit push` is faster because it applies changes directly without creating migration files. For production, always use `drizzle-kit generate` followed by `drizzle-kit migrate` so you have a versioned record of every schema change.

---

## How to Create Stripe Products and Prices

You can create products and prices through the Stripe dashboard, but managing them programmatically is better for reproducibility. Here's a seed script that creates everything you need:

```ts :collapsed-lines title="lib/payments/seed.ts"
import { stripe } from "./index";

const PRODUCTS = [
  {
    name: "My SaaS Product",
    description: "Full access, one-time purchase",
    features: [
      "Full source code access",
      "Production-ready infrastructure",
      "Lifetime updates",
    ],
    metadata: { tier: "pro" },
    prices: [
      {
        lookupKey: "pro_one_time",
        unitAmount: 19900, // $199.00 in cents
        currency: "usd",
        nickname: "Pro One-Time",
      },
    ],
  },
];

async function main() {
  console.log("Seeding Stripe products and prices...\n");

  for (const config of PRODUCTS) {
    // Create or find product
    const products = await stripe.products.list({ active: true, limit: 100 });
    let product = products.data.find((p) => p.name === config.name);

    if (!product) {
      product = await stripe.products.create({
        name: config.name,
        description: config.description,
        marketing_features: config.features.map((f) => ({ name: f })),
        metadata: config.metadata,
      });
      console.log(`Created product "\({config.name}" (\){product.id})`);
    }

    // Create prices
    for (const priceConfig of config.prices) {
      const existing = await stripe.prices.list({
        lookup_keys: [priceConfig.lookupKey],
        active: true,
        limit: 1,
      });

      if (existing.data[0]) {
        console.log(`Price "${priceConfig.lookupKey}" already exists`);
        continue;
      }

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: priceConfig.unitAmount,
        currency: priceConfig.currency,
        nickname: priceConfig.nickname,
        lookup_key: priceConfig.lookupKey,
        transfer_lookup_key: true,
      });

      console.log(`Created price "\({priceConfig.lookupKey}" (\){price.id})`);
    }
  }

  console.log("\nDone! Add the price ID to your .env as STRIPE_PRO_PRICE_ID");
}

main().catch(console.error);
```

Run this with `bun run src/lib/payments/seed.ts`.

A few things worth noting.

- **Use** `lookup_key` **instead of hardcoding price IDs:** Price IDs are different between test and live mode. Lookup keys let you reference prices by name (`pro_one_time`) rather than by Stripe's generated ID (`price_1P...`).<br/>The `transfer_lookup_key: true` option ensures that if you create a new price with the same lookup key, it replaces the old one automatically.
- **Prices are in cents:** Stripe's API expects amounts in the smallest currency unit. For USD, that means `19900` represents $199.00.    
    This is a common source of bugs. Always store amounts in cents in your database and convert to dollars only at the display layer.
- **The seed script is idempotent:** You can run it multiple times safely. It checks for existing products and prices before creating new ones.

### How to Set Up the Stripe Client

The Stripe client uses lazy initialization so that importing it doesn't throw if the API key is missing at module load time. This matters in build environments where environment variables aren't set.

```ts title="lib/payments/index.ts"
import Stripe from "stripe";

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return Reflect.get(getStripe(), prop);
  },
});
```

The `Proxy` wrapper is the key pattern here. Code across your application imports `stripe` and calls methods like `stripe.checkout.sessions.create(...)`. The proxy intercepts every property access and forwards it to the lazily initialized client.

This means the Stripe SDK only initializes when you actually use it, not when the module is imported.

---

## How to Build the Checkout Flow

The checkout flow has three parts: creating the session, redirecting the customer, and handling the return.

### How to Create a Checkout Session

Here's the function that creates a Stripe Checkout session for a one-time payment:

```ts title="lib/payments/index.ts"
export async function createOneTimeCheckoutSession(params: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
  customerEmail?: string;
  couponId?: string;
}) {
  const client = getStripe();

  const session = await client.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: params.priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: params.metadata,
    ...(params.customerEmail && {
      customer_email: params.customerEmail,
    }),
    ...(params.couponId
      ? { discounts: [{ coupon: params.couponId }] }
      : { allow_promotion_codes: true }),
  });

  return session;
}
```

Three details matter here.

- **The `mode: "payment"` setting tells Stripe this is a one-time charge**, not a subscription. For subscriptions, you would use `mode: "subscription"`. The mode affects which webhook events Stripe sends after payment.
- **The `metadata` field is how you link the Stripe session back to your application.** Pass your internal product tier, user ID, or any other data you need after payment. Stripe stores this metadata and includexs it in webhook events and API responses.
- **The `allow_promotion_codes: true` option shows a promo code field on the checkout page.** If you have a specific coupon to apply (from a landing page URL parameter, for example), pass it via `discounts` instead. You can't use both at the same time.

### How to Create the Checkout API Endpoint

Here's the API endpoint that creates a checkout session and returns the URL:

```ts title="server/api.ts"
app.post("/api/payments/checkout", async ({ set }) => {
  const priceId = process.env.STRIPE_PRO_PRICE_ID;

  if (!priceId) {
    set.status = 500;
    return { error: "Price not configured" };
  }

  const baseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const tier = "pro";

  const checkoutSession = await createOneTimeCheckoutSession({
    priceId,
    successUrl: `${baseUrl}/dashboard?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${baseUrl}/pricing`,
    metadata: { tier },
  });

  return { url: checkoutSession.url };
});
```

The `{CHECKOUT_SESSION_ID}` placeholder in the success URL is a Stripe template variable. Stripe replaces it with the actual session ID when redirecting the customer. This lets your frontend know which session just completed.

### How to Claim the Purchase After Checkout

When the customer returns to your success URL, your frontend reads the `session_id` from the URL and sends it to a "claim" endpoint. This endpoint verifies the payment and creates the purchase record.

```ts :collapsed-lines title="server/api.ts"
app.post(
  "/api/purchases/claim",
  async ({ body, request, set }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const { sessionId } = body;

    // Check if this session was already claimed
    const existing = await db
      .select()
      .from(purchases)
      .where(eq(purchases.stripeCheckoutSessionId, sessionId))
      .limit(1);

    if (existing[0]) {
      return { success: true, alreadyClaimed: true, tier: existing[0].tier };
    }

    // Retrieve the Stripe checkout session to verify payment
    const stripeSession = await retrieveCheckoutSession(sessionId);

    if (stripeSession.payment_status !== "paid") {
      set.status = 400;
      return { error: "Payment not completed" };
    }

    const tier = (stripeSession.metadata?.tier ?? "pro") as PaymentTier;

    // Create purchase record
    await db.insert(purchases).values({
      userId: session.user.id,
      stripeCheckoutSessionId: sessionId,
      stripeCustomerId:
        typeof stripeSession.customer === "string"
          ? stripeSession.customer
          : stripeSession.customer?.id ?? null,
      stripePaymentIntentId:
        typeof stripeSession.payment_intent === "string"
          ? stripeSession.payment_intent
          : stripeSession.payment_intent?.id ?? null,
      tier,
      status: "completed",
      amount: stripeSession.amount_total ?? 0,
      currency: stripeSession.currency ?? "usd",
    });

    // Trigger background processing
    await inngest.send({
      name: "purchase/completed",
      data: {
        userId: session.user.id,
        tier,
        sessionId,
      },
    });

    return { success: true, tier };
  },
  {
    body: t.Object({
      sessionId: t.String(),
    }),
  }
);
```

This endpoint does four things, in order.

1. **First, it checks if the session was already claimed.** The `unique()` constraint on `stripeCheckoutSessionId` in the schema prevents duplicate records, but checking first lets you return a clean response without catching a database error.
2. **Second, it verifies payment with Stripe.** Never trust data from the client. The frontend passes the session ID, but you must call Stripe's API to confirm that `payment_status` is `"paid"`.
3. **Third, it creates the purchase record.** Notice how it extracts the `customer` and `payment_intent` from the Stripe session. Both fields are returned as either strings or expanded objects depending on your Stripe API settings, so the ternary handles both cases.
4. **Fourth, it sends a** `purchase/completed` **event to Inngest.** This triggers the background processing flow that handles emails, access grants, analytics, and follow-up scheduling. The API endpoint doesn't do any of that work and returns `{ success: true }` immediately.

This separation between recording the purchase and processing it is fundamental. The database insert is fast and reliable. The downstream processing (emails, API calls, analytics) is slow and unreliable.

By splitting them, you ensure the customer sees a success response instantly while the background work happens durably.

---

## How to Handle Webhooks Securely

Your webhook endpoint is the entry point for Stripe events that happen outside your checkout flow: refunds, expired sessions, and disputes.

### How to Verify Webhook Signatures

Every webhook from Stripe includes a signature header. You must verify this signature before processing the event. Without verification, anyone could send fake events to your webhook URL.

```ts title="lib/payments/index.ts"
export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  const client = getStripe();
  return client.webhooks.constructEventAsync(payload, signature, webhookSecret);
}
```

One critical detail: **use `constructEventAsync` instead of `constructEvent`.** The async version uses the Web Crypto API, which is compatible with modern runtimes like Bun and Cloudflare Workers. The synchronous version depends on Node.js's `crypto` module, which isn't available everywhere.

Another critical detail: **pass the raw request body to signature verification.** If your framework parses the body as JSON before you access it, the signature check fails. The signature is computed over the raw bytes of the request, not the parsed JSON.

### How to Build the Webhook Endpoint

Here is the production webhook handler. Its only job is to validate the event and route it to the background job system.

```ts :collapsed-lines title="server/api.ts"
app.post("/api/payments/webhook", async ({ request, set }) => {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    set.status = 400;
    return { error: "Missing signature" };
  }

  try {
    const event = await constructWebhookEvent(body, sig);
    console.log(`[Webhook] Received ${event.type}`);

    if (event.type === "charge.refunded") {
      const charge = event.data.object as {
        id: string;
        payment_intent: string;
        amount: number;
        amount_refunded: number;
        currency: string;
      };
      await inngest.send({
        name: "stripe/charge.refunded",
        data: {
          chargeId: charge.id,
          paymentIntentId: charge.payment_intent,
          amountRefunded: charge.amount_refunded,
          originalAmount: charge.amount,
          currency: charge.currency,
        },
      });
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as {
        id: string;
        customer_email: string | null;
      };
      await inngest.send({
        name: "stripe/checkout.session.expired",
        data: {
          sessionId: session.id,
          customerEmail: session.customer_email,
        },
      });
    }

    return { received: true };
  } catch (error) {
    console.error("[Webhook] Stripe verification failed:", error);
    set.status = 400;
    return { error: "Webhook verification failed" };
  }
});
```

This is the "thin webhook handler" pattern. Notice what it does **not** do: it does not query the database, send emails, grant access, or call any external service. It validates the signature, extracts the fields it needs, and sends a typed event to Inngest.

The entire handler completes in milliseconds.

Why does this matter? Stripe expects your webhook to return a 2xx response within about 20 seconds. If your handler tries to do too much work (database queries, email sends, API calls), it risks timing out.

Stripe marks it as failed and retries the entire event. Now you have partial completion and duplicate processing.

The thin handler avoids this entirely. Validate, enqueue, return. All the real work happens asynchronously in durable background functions.

### Why Extract Fields Before Enqueueing?

You might notice that the webhook handler extracts specific fields from the Stripe event before sending them to Inngest:

```ts
await inngest.send({
  name: "stripe/charge.refunded",
  data: {
    chargeId: charge.id,
    paymentIntentId: charge.payment_intent,
    amountRefunded: charge.amount_refunded,
    originalAmount: charge.amount,
    currency: charge.currency,
  },
});
```

Why not forward the entire Stripe event? Two reasons.

First, Stripe event objects are large and deeply nested. Your background function only needs five fields. Sending the entire object means your durable function stores a large payload at every checkpoint, and over thousands of runs, this adds up.

Second, extracting fields at the boundary creates a clean contract between your webhook handler and your background functions. If Stripe changes the shape of their event objects in a future API version, you only need to update the extraction logic in the webhook handler. Your background functions keep working because they depend on your own typed data shape, not Stripe's.

### How to Set Up Webhooks in Production

For production, you configure webhooks in the Stripe Dashboard:

1. Go to Stripe Dashboard, then Developers, then Webhooks.
2. Add an endpoint pointing to your production URL: `https://yourapp.com/api/payments/webhook`.
3. Select the events you want to receive: `charge.refunded` and `checkout.session.expired`.
4. Copy the signing secret and add it to your production environment variables as `STRIPE_WEBHOOK_SECRET`.

The production signing secret is different from the one the Stripe CLI generates for local testing. Make sure your environment variables are set correctly for each environment.

### Which Webhook Events to Listen For

For a complete payment flow, you need these webhook events configured in Stripe:

| Event | When It Fires | What You Do |
| --- | --- | --- |
| `charge.refunded` | Customer receives a refund | Revoke access (full refund) or update status (partial) |
| `checkout.session.expired` | Checkout session times out (24 hours) | Send abandoned cart recovery email |

For subscription-based billing, you would also listen for `customer.subscription.updated`, `customer.subscription.deleted`, and `invoice.payment_failed`. This article covers one-time payments, so the examples focus on the two events above.

The `checkout.session.completed` event is notably absent. For one-time payments, you typically process the purchase in the "claim" endpoint (shown in the previous section) rather than in a webhook, because you need the authenticated user's session to link the purchase to their account.

---

## How to Process Purchases with Durable Background Jobs

This is the heart of the payment flow. After the purchase record is created and the `purchase/completed` event is sent, a durable function takes over and runs the entire post-payment workflow.

Each step in this function is individually checkpointed. If step 5 fails, steps 1 through 4 don't re-run. Step 5 retries on its own, and once it succeeds, steps 6 through 9 continue.

This is what "durable execution" means. It's the difference between a payment system that works in development and one that works in production.

I use [<VPIcon icon="fas fa-globe"/>Inngest](https://inngest.com/) for this. It is an event-driven durable execution platform that provides step-level checkpointing out of the box. You define functions with `step.run()` blocks, and Inngest handles retry logic, state persistence, and observability.

The Inngest client setup is minimal:

```ts title="lib/jobs/client.ts"
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "my-app",
});
```

Register your functions with the Inngest serve handler so the dev server (and production) can discover them:

```ts
import { serve } from "inngest/bun";
import { inngest } from "@/lib/jobs/client";
import { stripeFunctions } from "@/lib/jobs/functions/stripe";

const inngestHandler = serve({
  client: inngest,
  functions: [...stripeFunctions],
});

// Mount on your API
app.all("/api/inngest", async (ctx) => {
  return inngestHandler(ctx.request);
});
```

Here's the complete purchase function:

```ts :collapsed-lines title="lib/jobs/functions/stripe.ts"
import { eq } from "drizzle-orm";
import { createElement } from "react";

import { inngest } from "../client";
import { trackServerEvent } from "@/lib/analytics/server";
import { brand } from "@/lib/brand";
import { db, purchases, users } from "@/lib/db";
import {
  sendEmail,
  PurchaseConfirmationEmail,
  AdminPurchaseNotificationEmail,
  RepoAccessGrantedEmail,
} from "@/lib/email";
import { addCollaborator } from "@/lib/github";

export const handlePurchaseCompleted = inngest.createFunction(
  { id: "purchase-completed", triggers: [{ event: "purchase/completed" }] },
  async ({ event, step }) => {
    const { userId, tier, sessionId } = event.data as {
      userId: string;
      tier: string;
      sessionId: string;
    };

    // Step 1: Look up user and purchase details
    const { user, purchase } = await step.run(
      "lookup-user-and-purchase",
      async () => {
        const userResult = await db
          .select({
            id: users.id,
            email: users.email,
            name: users.name,
            githubUsername: users.githubUsername,
          })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);

        const foundUser = userResult[0];
        if (!foundUser) {
          throw new Error(`User not found: ${userId}`);
        }

        const purchaseResult = await db
          .select({
            amount: purchases.amount,
            currency: purchases.currency,
            stripePaymentIntentId: purchases.stripePaymentIntentId,
          })
          .from(purchases)
          .where(eq(purchases.stripeCheckoutSessionId, sessionId))
          .limit(1);

        const foundPurchase = purchaseResult[0];

        return {
          user: foundUser,
          purchase: foundPurchase ?? {
            amount: 0,
            currency: "usd",
            stripePaymentIntentId: null,
          },
        };
      }
    );

    // Step 2: Track purchase in analytics
    await step.run("track-purchase-to-posthog", async () => {
      try {
        await trackServerEvent(userId, "purchase_completed_server", {
          tier,
          amount_cents: purchase.amount,
          currency: purchase.currency,
          stripe_session_id: sessionId,
          stripe_payment_intent_id: purchase.stripePaymentIntentId,
        });
      } catch (error) {
        console.error(`Failed to track to PostHog:`, error);
      }
    });

    // Step 3: Send purchase confirmation to customer
    await step.run("send-purchase-confirmation", async () => {
      await sendEmail({
        to: user.email,
        subject: `Your ${brand.name} purchase is confirmed!`,
        template: createElement(PurchaseConfirmationEmail, {
          amount: purchase.amount,
          currency: purchase.currency,
          customerEmail: user.email,
        }),
      });
    });

    // Step 4: Send admin notification
    await step.run("send-admin-notification", async () => {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (!adminEmail) return;

      await sendEmail({
        to: adminEmail,
        subject: `New template sale: ${user.email}`,
        template: createElement(AdminPurchaseNotificationEmail, {
          amount: purchase.amount,
          currency: purchase.currency,
          customerEmail: user.email,
          customerName: user.name,
          stripeSessionId: purchase.stripePaymentIntentId ?? sessionId,
        }),
      });
    });

    // Early return if user has no GitHub username
    if (!user.githubUsername) {
      return { success: true, userId, tier, githubAccessGranted: false };
    }

    // Step 5: Grant GitHub repository access
    const collaboratorResult = await step.run(
      "add-github-collaborator",
      async () => {
        return addCollaborator(user.githubUsername!);
      }
    );

    // Step 6: Track GitHub access granted
    await step.run("track-github-access", async () => {
      await trackServerEvent(userId, "github_access_granted", {
        tier,
        github_username: user.githubUsername,
        invitation_status: collaboratorResult.status,
      });
    });

    // Step 7: Update purchase record
    await step.run("update-purchase-record", async () => {
      await db
        .update(purchases)
        .set({
          githubAccessGranted: true,
          githubInvitationId: collaboratorResult.status,
          updatedAt: new Date(),
        })
        .where(eq(purchases.stripeCheckoutSessionId, sessionId));
    });

    // Step 8: Send repo access email
    await step.run("send-repo-access-email", async () => {
      const repoUrl = brand.social.github;
      await sendEmail({
        to: user.email,
        subject: `Your ${brand.name} repository access is ready!`,
        template: createElement(RepoAccessGrantedEmail, { repoUrl }),
      });
    });

    // Step 9: Schedule follow-up email sequence
    await step.run("schedule-follow-up", async () => {
      const purchaseRecord = await db
        .select({ id: purchases.id })
        .from(purchases)
        .where(eq(purchases.stripeCheckoutSessionId, sessionId))
        .limit(1);

      if (purchaseRecord[0]) {
        await inngest.send({
          name: "purchase/follow-up.scheduled",
          data: {
            userId,
            purchaseId: purchaseRecord[0].id,
            tier,
          },
        });
      }
    });

    return { success: true, userId, tier, githubAccessGranted: true };
  }
);
```

That's a lot of code. Let me break down why each step exists and why it must be separate.

### Step 1: Look Up User and Purchase

```ts
const { user, purchase } = await step.run(
  "lookup-user-and-purchase",
  async () => {
    // Database queries for user and purchase records
    return { user: foundUser, purchase: foundPurchase };
  }
);
```

This step queries the database for the user and purchase details. Every subsequent step depends on these values (the user's email, the purchase amount, the user's GitHub username).

Because this is wrapped in `step.run()`, the return value is cached by Inngest. If a later step fails and the function retries, this step doesn't re-run. The cached values are replayed instead.

If the user doesn't exist in the database, this step throws an error that halts the entire function. There's no point continuing if the user can't be found.

### Step 2: Track Analytics

```ts
await step.run("track-purchase-to-posthog", async () => {
  try {
    await trackServerEvent(userId, "purchase_completed_server", {
      tier,
      amount_cents: purchase.amount,
      currency: purchase.currency,
    });
  } catch (error) {
    console.error(`Failed to track to PostHog:`, error);
  }
});
```

Analytics tracking gets its own step because analytics services have their own failure modes. PostHog could be rate-limited or temporarily unreachable. If that happens, you don't want it to block the confirmation email.

Notice the try-catch. A tracking failure logs the error but doesn't halt the function. Analytics data is valuable but not critical to the purchase flow.

### Steps 3 and 4: Email Notifications

The customer confirmation and admin notification are separate steps because they are independent operations. If Resend returns a 500 when sending the admin email, the customer should still get their confirmation.

```ts :collapsed-lines
// Step 3: Customer confirmation
await step.run("send-purchase-confirmation", async () => {
  await sendEmail({
    to: user.email,
    subject: `Your ${brand.name} purchase is confirmed!`,
    template: createElement(PurchaseConfirmationEmail, {
      amount: purchase.amount,
      currency: purchase.currency,
      customerEmail: user.email,
    }),
  });
});

// Step 4: Admin notification
await step.run("send-admin-notification", async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  await sendEmail({
    to: adminEmail,
    subject: `New template sale: ${user.email}`,
    template: createElement(AdminPurchaseNotificationEmail, {
      // ... admin-specific fields
    }),
  });
});
```

The admin notification step includes a guard: if `ADMIN_EMAIL` isn't set, it returns early. This makes the function work in development environments where you haven't configured all environment variables.

### Step 5: Grant Product Access

```ts
if (!user.githubUsername) {
  return { success: true, userId, tier, githubAccessGranted: false };
}

const collaboratorResult = await step.run(
  "add-github-collaborator",
  async () => {
    return addCollaborator(user.githubUsername!);
  }
);
```

This is the step most likely to fail. GitHub's API has rate limits, can time out, and the user's GitHub username might be invalid.

By making it its own step, a GitHub API failure doesn't re-trigger the confirmation email (step 3) or the admin notification (step 4). Those are already checkpointed.

Notice the early return before step 5. If the user has no GitHub username linked, the function returns after step 4. The remaining steps only run when there's a GitHub account to grant access to.

### Steps 6-7: Track and Update

After granting GitHub access, the function tracks the event in analytics (step 6) and updates the purchase record in the database (step 7).

The database update is intentionally ordered after the GitHub API call. You only set `githubAccessGranted: true` after the invitation actually succeeded. If you updated the record first and the GitHub step failed, your database would say access was granted when it was not.

### Step 8: Send Access Email

```ts
await step.run("send-repo-access-email", async () => {
  const repoUrl = brand.social.github;
  await sendEmail({
    to: user.email,
    subject: `Your ${brand.name} repository access is ready!`,
    template: createElement(RepoAccessGrantedEmail, { repoUrl }),
  });
});
```

This email only sends after the GitHub invitation is confirmed. The ordering is deliberate. You don't tell the customer "your access is ready" if the invitation hasn't been sent.

### Step 9: Schedule Follow-Up Sequence

```ts
await step.run("schedule-follow-up", async () => {
  const purchaseRecord = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(eq(purchases.stripeCheckoutSessionId, sessionId))
    .limit(1);

  if (purchaseRecord[0]) {
    await inngest.send({
      name: "purchase/follow-up.scheduled",
      data: {
        userId,
        purchaseId: purchaseRecord[0].id,
        tier,
      },
    });
  }
});
```

The final step triggers a separate function that handles the follow-up email sequence: day 7 onboarding tips, day 14 feedback request, day 30 testimonial request. This is an event-driven chain: one function completes and triggers another.

The follow-up function uses `step.sleep()` to wait between emails without consuming compute resources:

```ts
export const handlePurchaseFollowUp = inngest.createFunction(
  {
    id: "purchase-follow-up",
    triggers: [{ event: "purchase/follow-up.scheduled" }],
    cancelOn: [
      {
        event: "purchase/follow-up.cancelled",
        match: "data.purchaseId",
      },
    ],
  },
  async ({ event, step }) => {
    await step.sleep("wait-7-days", "7d");
    await step.run("send-day-7-email", async () => {
      // Send onboarding tips
    });

    await step.sleep("wait-14-days", "7d");
    await step.run("send-day-14-email", async () => {
      // Send feedback request
    });
  }
);
```

The `cancelOn` option is worth noting. If the purchase is refunded, you send a `purchase/follow-up.cancelled` event, and the entire follow-up sequence stops. No stale emails to customers who refunded.

### The Rule for Step Separation

Any operation that calls an external service or could fail independently should be its own step. A database query is a step because the database can be temporarily unreachable. An email send or API call is a step because those services can return errors or hit rate limits.

If two operations always succeed or fail together, they can share a step. But when in doubt, make it separate. The overhead is negligible, and the reliability gain is significant.

---

## How to Handle Refunds

Refund processing is the most commonly overlooked part of a payment system. You need to handle two cases: full refunds (revoke access) and partial refunds (keep access, update status).

Here's the complete refund handler:

```ts :collapsed-lines title="lib/jobs/functions/stripe.ts"
export const handleRefund = inngest.createFunction(
  { id: "refund-processed", triggers: [{ event: "stripe/charge.refunded" }] },
  async ({ event, step }) => {
    const data = event.data as {
      chargeId: string;
      paymentIntentId: string;
      amountRefunded: number;
      originalAmount: number;
      currency: string;
    };

    const chargeId = data.chargeId;
    const paymentIntentId = data.paymentIntentId;
    const currency = data.currency;
    const amountRefunded = data.amountRefunded;
    const originalAmount = data.originalAmount;
    const isFullRefund = amountRefunded >= originalAmount;

    // Step 1: Look up the purchase and user
    const { user, purchase } = await step.run(
      "lookup-purchase-by-payment-intent",
      async () => {
        const purchaseResult = await db
          .select({
            id: purchases.id,
            userId: purchases.userId,
            stripePaymentIntentId: purchases.stripePaymentIntentId,
            githubAccessGranted: purchases.githubAccessGranted,
          })
          .from(purchases)
          .where(eq(purchases.stripePaymentIntentId, paymentIntentId))
          .limit(1);

        const foundPurchase = purchaseResult[0];
        if (!foundPurchase) {
          return { user: null, purchase: null };
        }

        const userResult = await db
          .select({
            id: users.id,
            email: users.email,
            name: users.name,
            githubUsername: users.githubUsername,
          })
          .from(users)
          .where(eq(users.id, foundPurchase.userId))
          .limit(1);

        return { user: userResult[0] ?? null, purchase: foundPurchase };
      }
    );

    if (!purchase || !user) {
      return { success: false, reason: "no_matching_purchase" };
    }

    let accessRevoked = false;

    // Step 2: Revoke GitHub access (only for full refunds)
    if (isFullRefund && user.githubUsername && purchase.githubAccessGranted) {
      const revokeResult = await step.run(
        "revoke-github-access",
        async () => {
          return removeCollaborator(user.githubUsername!);
        }
      );
      accessRevoked = revokeResult.success;
    }

    // Step 3: Update purchase status
    await step.run("update-purchase-status", async () => {
      if (isFullRefund) {
        await db
          .update(purchases)
          .set({
            status: "refunded",
            githubAccessGranted: false,
            updatedAt: new Date(),
          })
          .where(eq(purchases.id, purchase.id));
      } else {
        await db
          .update(purchases)
          .set({
            status: "partially_refunded",
            updatedAt: new Date(),
          })
          .where(eq(purchases.id, purchase.id));
      }
    });

    // Step 4: Track refund in analytics
    await step.run("track-refund-event", async () => {
      try {
        await trackServerEvent(user.id, "refund_processed", {
          charge_id: chargeId,
          payment_intent_id: paymentIntentId,
          amount_cents: amountRefunded,
          original_amount_cents: originalAmount,
          currency,
          is_full_refund: isFullRefund,
          github_access_revoked: accessRevoked,
        });
      } catch (error) {
        console.error(`Failed to track to PostHog:`, error);
      }
    });

    // Step 5: Notify customer
    await step.run("send-customer-notification", async () => {
      if (isFullRefund) {
        await sendEmail({
          to: user.email,
          subject: `Your ${brand.name} refund has been processed`,
          template: createElement(AccessRevokedEmail, {
            customerEmail: user.email,
            refundAmount: amountRefunded,
            currency,
          }),
        });
      } else {
        await sendEmail({
          to: user.email,
          subject: `Your ${brand.name} partial refund has been processed`,
          template: createElement(PartialRefundEmail, {
            customerEmail: user.email,
            refundAmount: amountRefunded,
            originalAmount,
            currency,
          }),
        });
      }
    });

    // Step 6: Notify admin
    await step.run("send-admin-notification", async () => {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (!adminEmail) return;

      await sendEmail({
        to: adminEmail,
        subject: `\({isFullRefund ? "Full" : "Partial"} refund processed: \){user.email}`,
        template: createElement(AdminRefundNotificationEmail, {
          customerEmail: user.email,
          customerName: user.name,
          githubUsername: user.githubUsername,
          refundAmount: amountRefunded,
          originalAmount,
          currency,
          stripeChargeId: chargeId,
          accessRevoked,
          isPartialRefund: !isFullRefund,
        }),
      });
    });

    return { success: true, accessRevoked, isFullRefund, userId: user.id };
  }
);
```

### How Full Refunds Differ from Partial Refunds

The function distinguishes between the two with a simple comparison:

```ts
const isFullRefund = amountRefunded >= originalAmount;
```

For a **full refund**, three things happen:

1. GitHub access is revoked (the `removeCollaborator` call).
2. The purchase status is set to `"refunded"`.
3. The customer receives an `AccessRevokedEmail` explaining that their access has been removed.

For a **partial refund**, the customer keeps access:

1. GitHub access is **not** revoked.
2. The purchase status is set to `"partially_refunded"`.
3. The customer receives a `PartialRefundEmail` showing the refunded amount and the original amount.

This distinction matters for your database integrity. Downstream systems (your dashboard, analytics, support tools) need accurate status values. A `partially_refunded` purchase still represents an active customer.

### How Conditional Steps Work

The "revoke GitHub access" step only runs when three conditions are all true: it's a full refund, the user has a GitHub username, and access was previously granted.

```ts
if (isFullRefund && user.githubUsername && purchase.githubAccessGranted) {
  const revokeResult = await step.run("revoke-github-access", async () => {
    return removeCollaborator(user.githubUsername!);
  });
  accessRevoked = revokeResult.success;
}
```

If any of those conditions is false, the step is skipped entirely. Inngest handles this cleanly. The function continues to step 3 (update purchase status) with `accessRevoked` still set to `false`.

---

## How to Recover Abandoned Checkouts

When a customer starts checkout but doesn't complete it, Stripe eventually expires the session (after 24 hours by default). You can listen for this event and send a recovery email.

The key insight is that you don't want to send the email immediately. Give the customer an hour to come back on their own.

```ts :collapsed-lines title="lib/jobs/functions/stripe.ts"
export const handleCheckoutExpired = inngest.createFunction(
  {
    id: "checkout-expired",
    triggers: [{ event: "stripe/checkout.session.expired" }],
  },
  async ({ event, step }) => {
    const { customerEmail, sessionId } = event.data as {
      customerEmail: string | null;
      sessionId: string;
    };

    if (!customerEmail) {
      return { success: false, reason: "no_email" };
    }

    // Wait 1 hour before sending recovery email
    await step.sleep("wait-before-recovery-email", "1h");

    // Send abandoned cart email
    await step.run("send-abandoned-cart-email", async () => {
      const baseUrl =
        process.env.BETTER_AUTH_URL ?? "https://your-app.com";
      const checkoutUrl = `${baseUrl}/pricing`;

      await sendEmail({
        to: customerEmail,
        subject: `Your ${brand.name} checkout is waiting`,
        template: createElement(AbandonedCartEmail, {
          customerEmail,
          checkoutUrl,
        }),
      });
    });

    // Track the recovery attempt
    await step.run("track-abandoned-cart", async () => {
      try {
        await trackServerEvent("anonymous", "abandoned_cart_email_sent", {
          customer_email: customerEmail,
          session_id: sessionId,
        });
      } catch (error) {
        console.error(`Failed to track to PostHog:`, error);
      }
    });

    return { success: true, customerEmail };
  }
);
```

The `step.sleep("wait-before-recovery-email", "1h")` line pauses the function for one hour without consuming compute resources. Inngest schedules the function to resume after the delay. No cron jobs, no Redis queues, no `setTimeout` that gets lost when your server restarts.

There is a guard at the top of the function. If the checkout session has no customer email (the customer closed the page before entering their email), the function returns early. You can't send a recovery email without an address.

You could extend this pattern with a second sleep and follow-up email three days later. You could also check if the customer has since completed a purchase (by querying the database in a `step.run()`) and skip the email if they have.

### Why One Hour Is the Right Delay

Sending the recovery email immediately after checkout expiration feels aggressive. The customer might still be comparing options, waiting for payday, or just distracted. An immediate email says "we noticed you left," which feels surveillance-like.

Waiting 24 hours is too long. The customer has moved on. They have forgotten your product or found an alternative.

One hour is the sweet spot I found through testing. The customer's intent is still fresh, and the email feels helpful rather than pushy.

Your mileage may vary. The delay is configurable: change `"1h"` to `"30m"` or `"3h"` and redeploy.

### Why This Is Better Than a Cron Job

Without durable execution, abandoned cart recovery typically works like this: a cron job runs every hour, queries the database for expired sessions that haven't been recovered yet, sends emails to each one, and marks them as recovered.

This approach has several problems. You need a `recovered_at` column to avoid sending duplicate emails. You need to handle the case where the cron job crashes halfway through the batch, and you need to tune the cron interval carefully.

The `step.sleep()` approach eliminates all of this. Each expired session gets its own function instance with its own timer. There's no batch processing, no database flag, and no duplicate risk.

---

## How to Send Transactional Emails with React Email

Every email in the payment flow is a React component rendered to HTML and sent via Resend. This gives you type-safe templates with props, component reuse, and the ability to preview emails in your browser during development.

### How to Set Up the Email Client

The email client wraps Resend with a simple `sendEmail` function:

```ts :collapsed-lines title="lib/email/index.ts"
import { render } from "@react-email/components";
import type { ReactElement } from "react";
import { Resend } from "resend";

import { brand } from "@/lib/brand";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  template: ReactElement;
  from?: string;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  template,
  from = process.env.EMAIL_FROM ?? brand.emails.from,
  replyTo,
}: SendEmailOptions) {
  const resend = getResend();
  const html = await render(template);

  return resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo,
  });
}
```

The `render()` function from `@react-email/components` converts a React element into an HTML string. This HTML is what Resend delivers to the customer's inbox.

The `from` address defaults to your brand's email configuration. You need a verified domain in Resend for this to work. During development, Resend's free tier lets you send to your own email address without domain verification.

### How to Build a Purchase Confirmation Template

Here's the real purchase confirmation email template:

```tsx :collapsed-lines title="lib/email/emails/purchase-confirmation.tsx"
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { brand } from "@/lib/brand";

interface PurchaseConfirmationEmailProps {
  amount: number;
  currency: string;
  customerEmail: string;
}

const colors = {
  primary: "#d97757",
  background: "#faf9f5",
  foreground: "#30302e",
  muted: "#6b6860",
  border: "#e5e4df",
  card: "#ffffff",
  success: "#16a34a",
  successLight: "#f0fdf4",
};

export default function PurchaseConfirmationEmail({
  amount,
  currency,
  customerEmail,
}: PurchaseConfirmationEmailProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);

  return (
    <Html>
      <Head />
      <Preview>Your {brand.name} purchase is confirmed!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>{brand.name}</Text>
          </Section>

          <Hr style={divider} />

          <Section style={successBadge}>
            <Text style={successText}>Payment Successful</Text>
          </Section>

          <Heading style={h1}>Thank you for your purchase!</Heading>

          <Text style={text}>
            Your payment has been processed successfully. We are now setting
            up your GitHub repository access. You will receive another email
            shortly with your access link.
          </Text>

          <Section style={detailsBox}>
            <Text style={detailsTitle}>Order Details</Text>

            <Section style={detailRow}>
              <Text style={detailLabel}>Product</Text>
              <Text style={detailValue}>{brand.name}</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={detailLabel}>Amount</Text>
              <Text style={detailValue}>{formattedAmount}</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={detailLabel}>Email</Text>
              <Text style={detailValue}>{customerEmail}</Text>
            </Section>
          </Section>

          <Text style={text}>
            This is a one-time purchase. No recurring charges will be made.
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            Questions about your purchase? Reply to this email or reach
            out at{" "}
            <Link
              href={`mailto:${brand.emails.support}`}
              style={link}
            >
              {brand.emails.support}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

PurchaseConfirmationEmail.PreviewProps = {
  amount: 9900,
  currency: "usd",
  customerEmail: "customer@example.com",
} satisfies PurchaseConfirmationEmailProps;
```

A few things to note about this template.

- **Currency formatting happens in the template:** The `amount` prop is in cents (the same format stored in your database and returned by Stripe). The `Intl.NumberFormat` call converts it to a human-readable string like "$99.00" and keeps currency formatting logic in one place.
- **The `PreviewProps` object is for development.** React Email uses these props to render a preview in the browser. The `satisfies` keyword ensures the preview props match the component's interface.
- **All styles are inline objects.** Email clients strip `<style>` tags and ignore most CSS. Inline styles are the only reliable way to style emails across Gmail, Outlook, Apple Mail, and every other client.

### How to Build a Repo Access Template

The repo access email is sent after the GitHub invitation succeeds:

```tsx :collapsed-lines title="lib/email/emails/repo-access-granted.tsx"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { brand } from "@/lib/brand";

interface RepoAccessGrantedEmailProps {
  repoUrl: string;
}

export default function RepoAccessGrantedEmail({
  repoUrl,
}: RepoAccessGrantedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your {brand.name} repository access is ready!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>{brand.name}</Text>
          </Section>

          <Hr style={divider} />

          <Heading style={h1}>You are in!</Heading>

          <Text style={text}>
            Your GitHub repository access has been granted. You now have
            full access to the {brand.name} codebase.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={repoUrl}>
              Open Repository
            </Button>
          </Section>

          <Section style={infoBox}>
            <Text style={infoTitle}>Quick Start</Text>
            <Text style={infoText}>
              <strong>1.</strong> Clone the repository to your machine
            </Text>
            <Text style={infoText}>
              <strong>2.</strong> Run{" "}
              <code style={codeStyle}>bun install</code> to install
              dependencies
            </Text>
            <Text style={infoText}>
              <strong>3.</strong> Follow the README for environment setup
            </Text>
            <Text style={infoText}>
              <strong>4.</strong> Run{" "}
              <code style={codeStyle}>bun dev</code> to start building
            </Text>
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            Need help? Reply to this email or reach out at{" "}
            <Link
              href={`mailto:${brand.emails.support}`}
              style={link}
            >
              {brand.emails.support}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

This template includes a `<Button>` component that links directly to the GitHub repository. The quick start section gives the customer immediate next steps so they aren't left wondering what to do after gaining access.

### How to Build an Abandoned Cart Template

The abandoned cart email brings the customer back to your pricing page:

```tsx :collapsed-lines title="lib/email/emails/abandoned-cart.tsx"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { brand } from "@/lib/brand";

interface AbandonedCartEmailProps {
  customerEmail: string;
  checkoutUrl: string;
}

export default function AbandonedCartEmail({
  customerEmail,
  checkoutUrl,
}: AbandonedCartEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your {brand.name} checkout is waiting for you</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>{brand.name}</Text>
          </Section>

          <Hr style={divider} />

          <Heading style={h1}>You left something behind</Heading>

          <Text style={text}>
            We noticed you started a checkout but did not complete your
            purchase. No worries. Your cart is still waiting for you.
          </Text>

          <Text style={text}>
            {brand.name} gives you everything you need to ship your
            startup this weekend: authentication, payments, email,
            background jobs, and more. All wired together and ready
            to go.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={checkoutUrl}>
              Complete Your Purchase
            </Button>
          </Section>

          <Text style={textSmall}>
            If you ran into any issues during checkout or have questions
            about {brand.name}, just reply to this email. I read every
            message personally.
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            This email was sent to {customerEmail} because you started
            a checkout on {brand.name}. If this was not you, you can
            safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

The tone matters here. "You left something behind" is friendly, not pushy. The email explains the product's value briefly, includes a single clear call to action, and the footer explains why they received the email.

### How Templates Integrate with Durable Steps

Every email template is invoked via `createElement` inside a `step.run()` block:

```ts
await step.run("send-purchase-confirmation", async () => {
  await sendEmail({
    to: user.email,
    subject: `Your ${brand.name} purchase is confirmed!`,
    template: createElement(PurchaseConfirmationEmail, {
      amount: purchase.amount,
      currency: purchase.currency,
      customerEmail: user.email,
    }),
  });
});
```

The `createElement` call creates a React element from the template component with the given props. The `sendEmail` function renders it to HTML via React Email's `render()` and sends it through Resend.

Because this is inside a `step.run()`, the email send is checkpointed. If Resend is down and the step fails, it retries on its own without re-running previous steps. The customer never gets a duplicate email.

---

## How to Test the Complete Flow Locally

Testing the complete payment lifecycle locally requires three things running simultaneously: your application, the Stripe CLI forwarding webhook events, and the Inngest dev server processing background jobs.

### Step 1: Start the Stripe CLI

Install the Stripe CLI and log in:

```sh
# macOS
brew install stripe/stripe-cli/stripe

# Authenticate
stripe login
```

Forward webhook events to your local server:

```sh
stripe listen --forward-to localhost:3000/api/payments/webhook
```

The CLI prints a webhook signing secret starting with `whsec_`. Copy this to your <VPIcon icon="iconfont icon-dotenv"/>`.env` as `STRIPE_WEBHOOK_SECRET`.

### Step 2: Start the Inngest Dev Server

The Inngest dev server gives you real-time visibility into every function execution, every step, and every retry:

```sh
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

Open `http://localhost:8288` in your browser. This is the Inngest dashboard where you'll watch your durable functions execute step by step.

### Step 3: Start Your Application

```sh
bun run dev
```

Your application should now be running on `http://localhost:3000`.

### Step 4: Test the Purchase Flow

1. Go to your pricing page and click the checkout button.
2. Use Stripe's test card number `4242 4242 4242 4242` with any future expiration date and any CVC.
3. Complete the checkout. Stripe redirects you to your success URL.
4. Your frontend calls the `/api/purchases/claim` endpoint with the session ID.
5. Watch the Inngest dashboard. You should see the `purchase-completed` function trigger and each step execute in sequence.

In the Inngest dashboard, you will see:

- **Step 1:** "lookup-user-and-purchase" completes with the user and purchase data.
- **Step 2:** "track-purchase-to-posthog" completes (or logs a warning if PostHog isn't configured).
- **Step 3:** "send-purchase-confirmation" completes. Check your email.
- **Step 4:** "send-admin-notification" completes (if `ADMIN_EMAIL` is set).
- **Steps 5-9:** Run if the user has a GitHub username linked.

### Step 5: Test a Refund

Trigger a refund through the Stripe CLI:

```sh
stripe trigger charge.refunded
```

Or go to the Stripe dashboard, find the test payment, and issue a refund manually. The Stripe CLI will forward the `charge.refunded` webhook to your local server.

In the Inngest dashboard, you'll see the `refund-processed` function trigger with its own set of steps: lookup, conditional access revocation, status update, analytics tracking, and email notifications.

### Step 6: Test Abandoned Cart Recovery

Trigger a checkout expiration:

```sh
stripe trigger checkout.session.expired
```

The `checkout-expired` function will appear in the Inngest dashboard. You'll see the 1-hour sleep step. In the dev server, you can fast-forward through sleeps by clicking the "Skip" button in the dashboard. This lets you test the delayed email without actually waiting an hour.

### How to Simulate Step Failures

To test the retry behavior, temporarily throw an error in one of your steps:

```ts
const collaboratorResult = await step.run(
  "add-github-collaborator",
  async () => {
    throw new Error("Simulated GitHub API failure");
  }
);
```

In the Inngest dashboard, you'll see:

- Steps 1 through 4 succeed and their results are cached.
- Step 5 fails and is retried with exponential backoff.
- Steps 6 through 9 remain pending.

Remove the thrown error, and on the next retry, step 5 succeeds. Steps 6 through 9 execute, while steps 1 through 4 aren't re-executed. This is the checkpointing behavior that makes durable execution reliable.

---

## Conclusion

Building a complete SaaS payment flow is more than integrating Stripe Checkout. It's the entire lifecycle from "Buy" button to "Welcome" email, including the parts that happen when things go wrong.

Here's what you built in this tutorial:

- A **database schema** that tracks purchases through every state: completed, partially refunded, and fully refunded.
- A **Stripe product and price seed script** that creates your catalog programmatically.
- A **checkout flow** with session creation, payment verification, and idempotent purchase claiming.
- A **thin webhook handler** that validates signatures and routes events to background jobs.
- A **9-step durable purchase function** where each step is independently checkpointed and retried.
- A **refund handler** that distinguishes between full and partial refunds, revoking access only when appropriate.
- An **abandoned cart recovery flow** that waits an hour before sending a friendly recovery email.
- **Three transactional email templates** built with React Email: purchase confirmation, repo access granted, and abandoned cart.
- A **local testing setup** with Stripe CLI, Inngest dev server, and step-by-step observability.

The most important pattern is the separation between receiving and processing. Your API endpoints and webhook handlers should be thin: validate, record, enqueue, return. All the complex multi-step work happens in durable background functions where failures are isolated and retried at the step level.

This pattern scales. Add a new step to the purchase flow, and it gets the same checkpointing and retry behavior. Add a new webhook event, and you route it to a new durable function.

Your requirements may differ. You might sell subscriptions instead of one-time purchases, or provision API keys instead of GitHub access. The specific steps change, but the architecture stays the same.

::: info About Author

If you want to start with all of these patterns already wired together in a production-ready codebase, [<VPIcon icon="fas fa-globe"/>Eden Stack](https://eden-stack.com) includes the complete payment flow described in this article, along with 30+ additional production-tested patterns for authentication, email, analytics, background jobs, and more.

Magnus Rødseth builds AI-native applications and is the creator of [<VPIcon icon="fas fa-globe"/>Eden Stack](https://eden-stack.com)*, a production-ready starter kit with 30+ Claude skills encoding production patterns for AI-native SaaS development.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Complete SaaS Payment Flow with Stripe, Webhooks, and Email Notifications",
  "desc": "Most Stripe tutorials end at the checkout page. The customer clicks ”Pay,” Stripe processes the charge, and the tutorial congratulates you on integrating payments. But that's only the first 10% of a r",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/saas-payment-flow-stripe-webhooks-email/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
