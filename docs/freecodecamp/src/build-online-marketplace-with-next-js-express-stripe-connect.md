---
lang: en-US
title: "How to Build an Online Marketplace with Next.js, Express, and Stripe Connect"
description: "Article(s) > How to Build an Online Marketplace with Next.js, Express, and Stripe Connect"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - React.js
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
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Online Marketplace with Next.js, Express, and Stripe Connect"
    - property: og:description
      content: "How to Build an Online Marketplace with Next.js, Express, and Stripe Connect"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-online-marketplace-with-next-js-express-stripe-connect.html
prev: /programming/js-express/articles/README.md
date: 2026-04-10
isOriginal: false
author:
  - name: Michael Okolo
    url: https://freecodecamp.org/news/author/mikeokolo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1181805a-87ae-440d-9673-64efeb073aad.png
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
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an Online Marketplace with Next.js, Express, and Stripe Connect"
  desc="Have you ever wondered how platforms like Etsy, Uber, or Teachable handle payments for thousands of sellers? The answer is a multi-vendor marketplace: an application where merchants can sign up, list "
  url="https://freecodecamp.org/news/build-online-marketplace-with-next-js-express-stripe-connect"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1181805a-87ae-440d-9673-64efeb073aad.png"/>

Have you ever wondered how platforms like Etsy, Uber, or Teachable handle payments for thousands of sellers? The answer is a **multi-vendor marketplace**: an application where merchants can sign up, list products or services, and receive payments directly from customers.

In this handbook, you'll build a complete marketplace from scratch using TypeScript. You won't need a traditional database. Instead, you'll use Stripe as your product catalog and payment engine.

This is how many real-world marketplaces work: Stripe stores the products, prices, and customer data, while your application handles the user experience.

Here's what you'll build:

1. A merchant onboarding flow where sellers create accounts and connect with Stripe
2. A product management system where merchants can add and list products directly through Stripe
3. A checkout flow that supports both one-time payments and recurring subscriptions
4. Webhooks that listen for payment events in real time
5. A billing portal where customers can manage their subscriptions
6. A complete storefront where customers can browse and buy products

You can also grab the complete source code from the GitHub repository linked at the end.

::: note Prerequisites

Before you begin, make sure you have the following:

1. Node.js (version 18 or higher) installed on your machine
2. A basic understanding of React, TypeScript, and REST APIs
3. A Stripe account (sign up for free at [<VPIcon icon="fas fa-globe"/>stripe.com](http://stripe.com))
4. A code editor like VS Code

You do **not** need a database for this project. Stripe will store your products, prices, and customer information. This keeps the architecture simple and mirrors how many production marketplaces actually work.

:::

---

## What is Stripe Connect?

Stripe Connect is a set of APIs designed for platforms and marketplaces. It lets you create accounts for your merchants (Stripe calls them "connected accounts"), route payments to them, and take a platform fee on every transaction.

In this tutorial, you will use Stripe’s **V2 Accounts API**, which is the newer and recommended way to create connected accounts. With the V2 API, you configure what each account can do (accept card payments, receive payouts) through a configuration object, and Stripe handles all compliance and identity verification through a hosted onboarding flow.

Here's how the payment flow works:

1. A customer selects a product and clicks checkout on your marketplace.
2. Your server creates a Stripe Checkout Session linked to the merchant’s connected account.
3. The customer pays on Stripe’s hosted checkout page.
4. Stripe automatically splits the payment: the merchant gets their share, and your platform keeps an application fee.
5. Stripe sends a webhook event to your server confirming the payment.
6. The merchant can view their earnings and withdraw funds from their Stripe dashboard.

---

## How to Set Up the Project

Create a project folder with separate directories for your backend and frontend:

```sh
mkdir marketplace && cd marketplace
mkdir server client
```

---

## How to Set Up the Backend

Navigate into the server directory and initialize a TypeScript project:

```sh
cd server
npm init -y
npm install express cors dotenv stripe
npm install -D typescript ts-node @types/express @types/cors @types/node
npx tsc --init
mkdir src
```

Open <VPIcon icon="iconfont icon-json"/>`tsconfig.json` and update it with these settings:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"]
}
```

Then create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file in the server root:

```sh title=".env"
STRIPE_SECRET_KEY=sk_test_your_key_here
DOMAIN=http://localhost:3000
```

You can find your Stripe test secret key in the Stripe Dashboard under Developers > API Keys. The DOMAIN variable tells your server where to redirect customers after checkout.

Add these scripts to your <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## How to Build the Express Backend

Create the file src/index.ts. This will be your entire backend. Let’s start with the setup and imports:

```ts
import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

app.use(cors({ origin: process.env.DOMAIN }));
app.use(express.static('public'));
```

Notice that we don't import any database client. Stripe is our data layer. Every product, price, customer, and transaction lives in Stripe. Your Express server is a thin orchestration layer that talks to the Stripe API on behalf of your frontend.

We also mount `express.static("public")` so you can serve static files later if needed. The webhook endpoint needs the raw request body, so we'll register it before the JSON parser. Let’s add that now.

---

## How to Handle Merchant Onboarding

The first thing a merchant needs to do is create an account on your platform and connect it to Stripe. This involves two steps: creating a connected account, and then redirecting the merchant to Stripe’s hosted onboarding form.

### How to Create a Connected Account

Add the following route to your src/index.ts:

```ts
// Type definitions for request bodies
interface CreateAccountBody {
  email: string;
}
interface AccountIdBody {
  accountId: string;
}

// Create a Connected Account using Stripe V2 API
router.post(
  '/create-connect-account',
  async (req: Request<{}, {}, CreateAccountBody>, res: Response) => {
    try {
      const account = await stripe.v2.core.accounts.create({
        display_name: req.body.email,
        contact_email: req.body.email,
        dashboard: 'full',
        defaults: {
          responsibilities: {
            fees_collector: 'stripe',
            losses_collector: 'stripe',
          },
        },
        identity: {
          country: 'GB',
          entity_type: 'company',
        },
        configuration: {
          customer: {},
          merchant: {
            capabilities: {
              card_payments: { requested: true },
            },
          },
        },
      });
      res.json({ accountId: account.id });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  },
);
```

Let’s break down what this code does. The `stripe.v2.core.accounts.create()` method creates a new connected account using Stripe’s V2 API. Here are the key configuration options:

1. `dashboard: "full"` gives the merchant access to their own Stripe dashboard where they can view payments, manage payouts, and handle disputes.
2. `responsibilities` tells Stripe who collects fees and who is liable for losses. Setting both to "stripe" means Stripe handles this, which is the simplest configuration.
3. `identity` sets the country and entity type. Change "GB" to your merchants’ country code (for example, "US" for the United States).
4. `configuration.merchant.capabilities` requests the `card_payments` capability, which lets the merchant accept credit card payments.

### How to Create the Onboarding Link

After creating the account, you need to redirect the merchant to Stripe’s hosted onboarding form. Add this route:

```ts
// Create Account Link for onboarding
router.post('/create-account-link', async (req: Request<{}, {}, AccountIdBody>, res: Response) => {
  const { accountId } = req.body;
  try {
    const accountLink = await stripe.v2.core.accountLinks.create({
      account: accountId,
      use_case: {
        type: 'account_onboarding',
        account_onboarding: {
          configurations: ['merchant', 'customer'],
          refresh_url: `${process.env.DOMAIN}`,
          return_url: `\({process.env.DOMAIN}?accountId=\){accountId}`,
        },
      },
    });
    res.json({ url: accountLink.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});
```

The `accountLinks.create()` method generates a temporary URL that takes the merchant to Stripe’s onboarding form. On that form, Stripe collects the merchant’s identity documents, bank account details, and tax information. You don't need to build any of this yourself.

The `return_url` is where Stripe redirects the merchant after they complete onboarding. Notice that you append the `accountId` as a query parameter so your frontend can pick it up and store it.

---

## How to Check Account Status

You need a way to check whether a merchant has finished onboarding and is ready to accept payments. Add this route:

```ts
// Get Connected Account Status
router.get(
  '/account-status/:accountId',
  async (req: Request<{ accountId: string }>, res: Response) => {
    try {
      const account = await stripe.v2.core.accounts.retrieve(req.params.accountId, {
        include: ['requirements', 'configuration.merchant'],
      });
      const payoutsEnabled =
        account.configuration?.merchant?.capabilities?.stripe_balance?.payouts?.status === 'active';
      const chargesEnabled =
        account.configuration?.merchant?.capabilities?.card_payments?.status === 'active';
      const summaryStatus = account.requirements?.summary?.minimum_deadline?.status;
      const detailsSubmitted = !summaryStatus || summaryStatus === 'eventually_due';
      res.json({
        id: account.id,
        payoutsEnabled,
        chargesEnabled,
        detailsSubmitted,
        requirements: account.requirements?.entries,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  },
);
```

This route retrieves the connected account and checks three important statuses:

- `chargesEnabled` tells you if the merchant can accept payments.
- `payoutsEnabled` tells you if they can receive payouts to their bank account.
- `detailsSubmitted` tells you if they have completed the onboarding form.

Your frontend will use these flags to show or hide features.

---

## How to Create Products Through Stripe

Instead of storing products in a database, you'll create them directly in Stripe. Each product is created on the merchant’s connected account using the `stripeAccount` header. This means each merchant has their own isolated product catalog inside Stripe.

```ts
// Type definition for product creation
interface CreateProductBody {
  productName: string;
  productDescription: string;
  productPrice: number;
  accountId: string;
}
// Create a product on the connected account
router.post('/create-product', async (req: Request<{}, {}, CreateProductBody>, res: Response) => {
  const { productName, productDescription, productPrice, accountId } = req.body;
  try {
    // Create the product on the connected account
    const product = await stripe.products.create(
      {
        name: productName,
        description: productDescription,
      },
      { stripeAccount: accountId },
    ); // Create a price for the product
    const price = await stripe.prices.create(
      {
        product: product.id,
        unit_amount: productPrice,
        currency: 'usd',
      },
      { stripeAccount: accountId },
    );
    res.json({
      productName,
      productDescription,
      productPrice,
      priceId: price.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});
```

There are two Stripe API calls happening here. First, `stripe.products.create()` creates the product (name and description). Then `stripe.prices.create()` creates a price for that product (amount and currency).

Stripe separates products from prices because a single product can have multiple prices — for example, a monthly plan and an annual plan.

The `{ stripeAccount: accountId }` option on both calls tells Stripe to create these resources on the merchant’s connected account, not on your platform account. This is a critical detail: without it, the products would be created on your platform’s account and the merchant would never see them.

---

## How to Fetch Products

Add a route to list all products for a given merchant:

```ts
// Fetch products for a specific account
router.get('/products/:accountId', async (req: Request<{ accountId: string }>, res: Response) => {
  const { accountId } = req.params;
  try {
    const options: Stripe.RequestOptions = {};
    if (accountId !== 'platform') {
      options.stripeAccount = accountId;
    }
    const prices = await stripe.prices.list(
      {
        expand: ['data.product'],
        active: true,
        limit: 100,
      },
      options,
    );
    const products = prices.data.map((price) => {
      const product = price.product as Stripe.Product;
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price.unit_amount,
        priceId: price.id,
        period: price.recurring ? price.recurring.interval : null,
      };
    });
    res.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});
```

This route fetches all active prices from a merchant’s Stripe account and expands the product data (using `expand: ["data.product"]`) so you get the product name and description in the same API call. The period field will be null for one-time products and "month" or "year" for subscriptions.

---

## How to Build the Checkout Flow

Your checkout flow needs to handle two scenarios: one-time payments for individual products, and recurring subscriptions. Stripe’s Checkout Sessions handle both — you just need to set the mode based on the price type.

```ts
// Type definition for checkout
interface CheckoutBody {
  priceId: string;
  accountId: string;
}
// Create checkout session
router.post(
  '/create-checkout-session',
  async (req: Request<{}, {}, CheckoutBody>, res: Response) => {
    const { priceId, accountId } = req.body;
    try {
      // Retrieve the price to determine if it is
      // one-time or recurring
      const price = await stripe.prices.retrieve(priceId, { stripeAccount: accountId });
      const isSubscription = price.type === 'recurring';
      const mode = isSubscription ? 'subscription' : 'payment';
      const session = await stripe.checkout.sessions.create(
        {
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          mode,
          success_url: `${process.env.DOMAIN}/done?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.DOMAIN}`,
          ...(isSubscription
            ? {
                subscription_data: {
                  application_fee_percent: 10,
                },
              }
            : {
                payment_intent_data: {
                  application_fee_amount: 123,
                },
              }),
        },
        { stripeAccount: accountId },
      );
      res.redirect(303, session.url as string);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  },
);
```

Here's what this route does step by step. First, it retrieves the price from the merchant’s connected account to check whether it is a one-time price or a recurring subscription. Then it creates a Checkout Session with the appropriate mode — either "payment" or "subscription".

The `application_fee_amount` is your platform’s cut of the transaction, specified in the smallest currency unit (cents for USD). In this example, you take $1.23 or 10% per transaction. For a real marketplace, you would likely calculate this as a percentage of the product price.

Notice that `application_fee_amount` goes inside `subscription_data` for subscriptions but inside `payment_intent_data` for one-time payments. This is a Stripe requirement — the two modes use different configuration objects.

Finally, the route uses `res.redirect(303, session.url)` to send the customer directly to Stripe’s hosted checkout page.

---

## How to Handle Webhooks

Webhooks are how Stripe tells your server about events that happen asynchronously — like a successful payment, a failed charge, or a subscription cancellation.

In a production marketplace, you should **never** rely solely on redirect URLs to confirm payments. A customer might close their browser before the redirect completes. Webhooks are your source of truth.

Add the webhook endpoint **before** the JSON body parser. Stripe sends webhook payloads as raw bytes, and you need the raw body to verify the signature:

```ts
// IMPORTANT: Register this BEFORE app.use(express.json())
app.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  (req: Request, res: Response) => {
    let event: Stripe.Event = JSON.parse(req.body.toString()); // If you have an endpoint secret, verify the
    // signature for security
    const endpointSecret = process.env.WEBHOOK_SECRET;
    if (endpointSecret) {
      const signature = req.headers['stripe-signature'] as string;
      try {
        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret) as Stripe.Event;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.log('Webhook signature verification failed:', message);
        res.sendStatus(400);
        return;
      }
    } // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Payment successful for session:', session.id); // Fulfill the order: send email, grant access,
        // update your records, and so on
        break;
      }
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Session expired:', session.id); // Optionally notify the customer or clean up
        // any pending records
        break;
      }
      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Delayed payment succeeded for session:', session.id); // Fulfill the order now that payment cleared
        break;
      }
      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Payment failed for session:', session.id); // Notify the customer that payment failed
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', subscription.id); // Revoke access for the customer
        break;
      }
      default:
        console.log('Unhandled event type:', event.type);
    }
    res.send();
  },
);
```

The webhook handler checks for five key events.

- `checkout.session.completed` fires when a payment succeeds — this is where you would fulfill an order, send a confirmation email, or grant access.
- `checkout.session.expired` fires when a session expires before the customer completes payment.
- `checkout.session.async_payment_succeeded` fires when a delayed payment method (like a bank transfer) finally goes through.
- `checkout.session.async_payment_failed` fires when a delayed payment method fails.
- And `customer.subscription.deleted` fires when a subscription is cancelled.

---

## How to Configure Webhooks in the Stripe Dashboard

Before you can receive webhook events, you need to tell Stripe where to send them and which events you care about. Follow these steps:

1. Go to the Stripe Dashboard and navigate to Developers > Webhooks.
2. Click "Add destination."
3. Under the account type, select "Connected and V2 accounts" since your payments go through connected merchant accounts.
4. Under "Events to listen for," click "All events" and select the following five events:
    - `checkout.session.async_payment_succeeded` — Occurs when a payment intent using a delayed payment method finally succeeds.
    - `checkout.session.completed` — Occurs when a Checkout Session has been successfully completed.
    - `checkout.session.expired` — Occurs when a Checkout Session expires before completion.
    - `checkout.session.async_payment_failed` — Occurs when a payment intent using a delayed payment method fails.
    - `customer.subscription.deleted` — Occurs whenever a customer’s subscription ends.
5. Enter your webhook endpoint URL. For production, this would be something like `yourdomain.com/api/webhook`. For local development, you will use the Stripe CLI instead (covered next).
6. Click "Add destination" to save.

---

## How to Test Webhooks Locally

For local development, you don't need to expose your server to the internet. Install the Stripe CLI and run:

```sh
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:4242/webhook
```

The CLI will print a webhook signing secret that starts with `whsec_`. Add this to your .env file as `WEBHOOK_SECRET`. The CLI intercepts all webhook events from Stripe and forwards them to your local server, so you can test the full payment flow without deploying anything.

---

## How to Add the Billing Portal

The billing portal lets customers manage their subscriptions without you building any UI for it. Stripe hosts the entire experience — customers can update their payment method, change plans, or cancel their subscription.

```ts
// Create a billing portal session
router.post(
  "/create-portal-session",
  async (req: Request, res: Response) => {
    const { session_id } = req.body as {
      session_id: string;
    };
 
    try {
      const session =
        await stripe.checkout.sessions.retrieve(
          session_id
        );
 
      const portalSession =
        await stripe.billingPortal.sessions.create({
          customer_account: session.customer_account as string,
          return_url: `\({process.env.DOMAIN}?session_id=\){session_id}`,
        });
 
      res.redirect(303, portalSession.url);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error";
      res.status(500).json({ error: message });
    }
  }
);
```

This route takes a `session_id` from a previous checkout, retrieves the associated customer, and creates a billing portal session. The `customer_account` field links the portal to the correct connected account so the customer sees only their subscriptions with that specific merchant.

Now add the JSON parser and mount the router. This must come **after** the webhook route:

```ts
// JSON and URL-encoded parsers (AFTER webhook route)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount all routes under /api
app.use('/api', router);
const PORT: number = parseInt(process.env.PORT || '4242', 10);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## How to Build the Next.js Frontend

Navigate to the client directory and create a new Next.js project with TypeScript:

```sh
cd ../client
npx create-next-app@latest . --typescript --app --tailwind --eslint
npm install axios
```

---

## How to Create the Account Context

You need a way to share the merchant’s account ID across all components. Create a context provider at `contexts/`<VPIcon icon="fa-brands fa-react"/>`AccountContext.tsx`:

```tsx title="contexts/AccountContext.tsx"
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

interface AccountContextType {
  accountId: string | null;
  setAccountId: (id: string | null) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function useAccount(): AccountContextType {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within AccountProvider');
  }
  return context;
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [accountId, setAccountId] = useState<string | null>(searchParams.get('accountId'));

  return (
    <AccountContext.Provider value={{ accountId, setAccountId }}>
      {children}
    </AccountContext.Provider>
  );
}
```

This context stores the current merchant’s account ID and makes it available throughout the app. On initial load, it checks the URL for an accountId query parameter — this is how Stripe’s onboarding redirect passes the account ID back to your app.

---

## How to Create the Account Status Hook

Create a custom hook at <VPIcon icon="fas fa-folder-open"/>`hooks/`<VPIcon icon="iconfont icon-typescript"/>`useAccountStatus.ts` that polls the account status:

```ts title="hooks/useAccountStatus.ts"
'use client';
import { useState, useEffect } from 'react';
import { useAccount } from '@/contexts/AccountContext';
interface AccountStatus {
  id: string;
  payoutsEnabled: boolean;
  chargesEnabled: boolean;
  detailsSubmitted: boolean;
}
export default function useAccountStatus() {
  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(null);
  const { accountId, setAccountId } = useAccount();
  useEffect(() => {
    if (!accountId) return;
    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:4242/api/account-status/${accountId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data: AccountStatus = await res.json();
        setAccountStatus(data);
      } catch {
        setAccountId(null);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [accountId, setAccountId]);
  return {
    accountStatus,
    needsOnboarding: !accountStatus?.chargesEnabled && !accountStatus?.detailsSubmitted,
  };
}
```

This hook polls the account status every 5 seconds. This is important because Stripe’s onboarding is asynchronous — a merchant might complete the form, but it can take a moment for Stripe to verify their details and activate their account. The `needsOnboarding` flag tells your UI whether to show the onboarding button or the merchant dashboard.

---

## How to Build the Merchant Onboarding Component

Create <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-react"/>`ConnectOnboarding.tsx`:

```tsx :collapsed-lines title='components/ConnectOnboarding.tsx"
'use client';
import { useState } from 'react';
import { useAccount } from '@/contexts/AccountContext';
import useAccountStatus from '@/hooks/useAccountStatus';
const API_URL = 'http://localhost:4242/api';
export default function ConnectOnboarding() {
  const [email, setEmail] = useState<string>('');
  const { accountId, setAccountId } = useAccount();
  const { accountStatus, needsOnboarding } = useAccountStatus();
  const handleCreateAccount = async () => {
    const res = await fetch(`${API_URL}/create-connect-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setAccountId(data.accountId);
  };
  const handleStartOnboarding = async () => {
    const res = await fetch(`${API_URL}/create-account-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId }),
    });
    const data = await res.json();
    window.location.href = data.url;
  };
  if (!accountId) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Create Your Seller Account</h2>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={handleCreateAccount}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Create Connect Account
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto p-6">
      <h3 className="font-semibold mb-2">Account: {accountId} </h3>
      <p className="mb-2">Charges: {accountStatus?.chargesEnabled ? 'Active' : 'Pending'} </p>
      <p className="mb-4">Payouts: {accountStatus?.payoutsEnabled ? 'Active' : 'Pending'} </p>
      {needsOnboarding && (
        <button
          onClick={handleStartOnboarding}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Complete Onboarding
        </button>
      )}
    </div>
  );
}
```

This component handles both states of the merchant experience. If no account exists, it shows a simple email form. After account creation, it shows the account status and an onboarding button if needed.

---

## How to Build the Product Create, Product List and Checkout

Create <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-react"/>`Products.tsx`:

```tsx L:collapsed-liens title="components/Products.tsx"
'use client';
import { useState, useEffect } from 'react';
import { useAccount } from '@/contexts/AccountContext';
import useAccountStatus from '@/hooks/useAccountStatus';
const API_URL = 'http://localhost:4242/api';
interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  priceId: string;
  period: string | null;
}
export default function Products() {
  const { accountId } = useAccount();
  const { needsOnboarding } = useAccountStatus();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (!accountId || needsOnboarding) return;
    const fetchProducts = async () => {
      const res = await fetch(`\({API_URL}/products/\){accountId}`);
      const data: Product[] = await res.json();
      setProducts(data);
    };
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, [accountId, needsOnboarding]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {' '}
      {products.map((product) => (
        <div key={product.priceId} className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold">  {product.name}</h3>

          <p className="text-gray-600 mt-1">  {product.description}</p>

          <p className="text-xl font-bold mt-3">
            ${((product.price ?? 0) / 100).toFixed(2)}
            {product.period ? ` / ${product.period}` : ''}
          </p>

          <form action={`${API_URL}/create-checkout-session`} method="POST">
            <input type="hidden" name="priceId" value={product.priceId} />
            <input type="hidden" name="accountId" value={accountId ?? ''} />
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {product.period ? 'Subscribe' : 'Buy Now'}
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}

```

The Products component fetches all products from the merchant’s Stripe account and displays them in a responsive grid. The checkout button submits a form directly to your backend, which redirects the customer to Stripe’s hosted checkout page. Notice how the button text changes based on whether the product is a one-time purchase or a subscription.

---

## How to Build the Product Form

Merchants need a way to add products from the frontend. Create <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-react"/>`ProductForm.tsx`:

```tsx :collapsed-lines title="components/ProductForm.tsx"
'use client';
import { useState } from 'react';
import { useAccount } from '@/contexts/AccountContext';
import useAccountStatus from '@/hooks/useAccountStatus';
const API_URL = 'http://localhost:4242/api';
interface ProductFormData {
  productName: string;
  productDescription: string;
  productPrice: number;
}
export default function ProductForm() {
  const { accountId } = useAccount();
  const { needsOnboarding } = useAccountStatus();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    productDescription: '',
    productPrice: 1000,
  });
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!accountId || needsOnboarding) return;
    await fetch(`${API_URL}/create-product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        accountId,
      }),
    }); // Reset form and hide it
    setFormData({
      productName: '',
      productDescription: '',
      productPrice: 1000,
    });
    setShowForm(false);
  }; // Only show the form if the merchant has completed
  // onboarding and can accept charges
  if (!accountId || needsOnboarding) return null;
  return (
    <div className="my-6">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {showForm ? 'Cancel' : 'Add New Product'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>

            <input
              type="text"
              value={formData.productName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  productName: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              value={formData.productDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  productDescription: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price (in cents)</label>

            <input
              type="number"
              value={formData.productPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  productPrice: parseInt(e.target.value),
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Product
          </button>
        </form>
      )}
    </div>
  );
}
```

This component only renders after the merchant has completed onboarding (the `if (!accountId || needsOnboarding) return null` check at the top). It toggles a form where the merchant enters a product name, description, and price in cents. When submitted, it calls your `/api/create-product` endpoint, which creates both the product and its price on the merchant’s connected Stripe account.

The price field uses cents because that is what Stripe expects. So if a merchant wants to sell a product for \\(25.00, they enter 2500. In a production app, you would add a friendlier input that lets merchants type \\)25.00 and converts it to cents automatically.

---

## How to Build the Main Page

Finally, put it all together in `app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`:

```tsx title="app/page.tsx"
'use client';
import { AccountProvider } from '@/contexts/AccountContext';
import ConnectOnboarding from '@/components/ConnectOnboarding';
import Products from '@/components/Products';
import ProductForm from '@/components/ProductForm';
export default function Home() {
  return (
    <AccountProvider>
      {' '}
      <main className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8"> Marketplace Dashboard </h1>
        <ConnectOnboarding />
        <ProductForm />
        <Products />
      </main>
    </AccountProvider>
  );
}
```

---

## How to Test the Full Flow

Start both servers:

```sh
# Terminal 1 - Backend
cd server
npm run dev
 
# Terminal 2 - Frontend
cd client
npm run dev
 
# Terminal 3 - Stripe webhook listener
stripe listen --forward-to localhost:4242/api/webhook
```

Now test the complete flow:

1. Go to [`localhost:3000`](http://localhost:3000) and enter an email to create a merchant account.
2. Click "Complete Onboarding" and fill out Stripe’s test onboarding form. Use test data like 000-000-0000 for the phone number and 0000 for the last four digits of SSN.
3. Wait a few seconds for the account status to update. Once charges are active, you can add products.
4. Create a product using the product form (set the price in cents — for example, 2500 for $25.00).
5. Click "Buy Now" on a product to start the checkout flow.
6. On Stripe’s checkout page, use the test card number 4242 4242 4242 4242 with any future expiry date and any CVC.
7. Check your terminal — you should see the webhook event confirming the payment.
8. Check the Stripe Dashboard to see the payment, the application fee, and the transfer to the connected account.

---

## How the Payment Split Works

Here is exactly what happens when a customer pays $25.00 for a product:

1. The customer pays $25.00 on Stripe’s checkout page.
2. Stripe deducts its processing fee (approximately 2.9% + $0.30 for US cards).
3. Your platform takes the application fee you set ($1.23 in our example).
4. The remaining amount is transferred to the merchant’s connected Stripe account.
5. The merchant can withdraw their funds to their bank account from the Stripe Dashboard.

You control the application fee in the checkout route. In a production marketplace, you would calculate this as a percentage of the transaction. For example, to take a 10% fee:

```js
onst applicationFee = Math.round(
  (price.unit_amount ?? 0) * 0.1
);
```

---

## Next Steps

You now have a working marketplace. Here are improvements to consider for production:

- Add authentication with NextAuth.js so merchants can securely log in and manage their accounts across sessions.
- Add runtime validation with Zod to validate all request bodies before they reach Stripe.
- Add image uploads for products using Cloudinary or AWS S3, then pass the image URL to Stripe’s product metadata.
- Build separate merchant and customer views. Right now the app combines both experiences on one page.
- Deploy your backend to Railway or Render and your frontend to Vercel. Update the webhook URL in your Stripe Dashboard to point to your production server.

::: info

You can find the complete source code for this tutorial on GitHub:

<SiteInfo
  name="michaelokolo/marketplace"
  desc="Contribute to michaelokolo/marketplace development by creating an account on GitHub."
  url="https://github.com/michaelokolo/marketplace/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a5f6901145ebc0121f61dc6f2dc59a0f76ad9659a93d8077d1fe1f44f26fec41/michaelokolo/marketplace"/>

:::

---

## Acknowledgements

Some API usage patterns in this tutorial are inspired by examples from the [<VPIcon icon="fas fa-globe"/>official Stripe documentation](https://docs.stripe.com). These examples were adapted to demonstrate how to build a complete multi-vendor marketplace architecture.

---

## Conclusion

In this handbook, you built a complete online marketplace where merchants can onboard through Stripe Connect, create products stored directly in Stripe, and receive payments from customers — all without a traditional database.

You learned how to use Stripe’s V2 Accounts API for merchant onboarding, create products and prices on connected accounts, build a checkout flow that handles both one-time payments and subscriptions, listen for payment events with webhooks, and give customers a billing portal to manage their subscriptions.

The key insight is that Stripe Connect handles the hardest parts of running a marketplace — payment splitting, tax compliance, identity verification, and fund transfers. Your job is to build a great user experience on top of it.

If you found this tutorial helpful, share it with someone who is learning to build full-stack applications. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Online Marketplace with Next.js, Express, and Stripe Connect",
  "desc": "Have you ever wondered how platforms like Etsy, Uber, or Teachable handle payments for thousands of sellers? The answer is a multi-vendor marketplace: an application where merchants can sign up, list ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-online-marketplace-with-next-js-express-stripe-connect.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
