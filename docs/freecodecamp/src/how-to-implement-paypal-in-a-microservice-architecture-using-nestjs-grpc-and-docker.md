---
lang: en-US
title: "How to Implement PayPal in a Microservice Architecture Using NestJS, gRPC, and Docker"
description: "Article(s) > How to Implement PayPal in a Microservice Architecture Using NestJS, gRPC, and Docker"
icon: iconfont icon-nestjs
category:
  - Node.js
  - Nest.js
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - nest
  - nestjs
  - nest-js
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement PayPal in a Microservice Architecture Using NestJS, gRPC, and Docker"
    - property: og:description
      content: "How to Implement PayPal in a Microservice Architecture Using NestJS, gRPC, and Docker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-paypal-in-a-microservice-architecture-using-nestjs-grpc-and-docker.html
prev: /programming/js-nest/articles/README.md
date: 2026-07-17
isOriginal: false
author:
  - name: Md Tarikul Islam
    url: https://freecodecamp.org/news/author/Tarikul001/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/665e54b7-b47e-4abe-a417-49b51569868f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Nest.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-nest/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement PayPal in a Microservice Architecture Using NestJS, gRPC, and Docker"
  desc="In this tutorial, you'll build a production-ready PayPal payment service using NestJS microservices. Along the way, you'll learn how to isolate payment logic into its own service, communicate between "
  url="https://freecodecamp.org/news/how-to-implement-paypal-in-a-microservice-architecture-using-nestjs-grpc-and-docker"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/665e54b7-b47e-4abe-a417-49b51569868f.png"/>

In this tutorial, you'll build a production-ready PayPal payment service using NestJS microservices. Along the way, you'll learn how to isolate payment logic into its own service, communicate between services using gRPC, publish payment events with RabbitMQ, and deploy everything with Docker.

By the end, you'll have a scalable payment architecture that can be reused across multiple business domains.

---

## Introduction

Payment logic doesn't belong inside every microservice. When you scatter PayPal API calls across `user-service`, `order-service`, and `billing-service`, you end up with:

- Duplicated PayPal credentials and SDK code
- Inconsistent error handling and idempotency
- Hard-to-audit payment records
- Painful environment switching (sandbox to live)

The solution is a dedicated payment microservice that owns all PayPal interactions. Other services call it over gRPC, and payment outcomes are broadcast over RabbitMQ so domain services can update their own data.

This guide walks you through that pattern using a real-world stack:

| Layer | Technology |
| --- | --- |
| Payment service | NestJS |
| Inter-service communication | gRPC |
| Event bus | RabbitMQ |
| Database | PostgreSQL |
| API exposure | API Gateway (HTTP) |
| Containerization | Docker Compose |
| PayPal API | Orders v2 (Create, Approve, Capture) |

---

## Why Use a Dedicated Payment Service?

A dedicated payment service centralizes all payment-related responsibilities in one place. Instead of every microservice communicating directly with PayPal, they simply request payment operations from the payment service.

This service manages PayPal authentication, order creation, payment captures, wallet updates, ledger records, and webhook processing. Meanwhile, domain services remain focused on business logic such as student applications or subscriptions.

Domain services only need to know:

1. How much to charge
2. Who is paying
3. What business entity the payment is for (`referenceId`)
4. Where to redirect the user after payment (`returnUrl` / `cancelUrl`)

They do **not** need PayPal credentials.

---

## Architecture Overview

Users initiate payments from the Frontend, and requests are routed through the API Gateway to the Students Service. The service uses gRPC to communicate with the Payment Service, which handles all interactions with PayPal.

Once the payment is completed, the Payment Service publishes an event to RabbitMQ, enabling the Students Service to update the payment status asynchronously.

```plaintext
┌────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                     │
├────────────────────────────────────────────────────────────┤
│ Frontend (React)                                           │
└───────────────────────┬────────────────────────────────────┘
                        │ HTTP
                        ▼

┌────────────────────────────────────────────────────────────┐
│                       GATEWAY LAYER                        │
├────────────────────────────────────────────────────────────┤
│ student-apigw                                               │
└───────────────────────┬────────────────────────────────────┘
                        │ gRPC
                        ▼

┌────────────────────────────────────────────────────────────┐
│                       DOMAIN LAYER                         │
├────────────────────────────────────────────────────────────┤
│ students-service                                            │
└───────────────────────┬────────────────────────────────────┘
                        │ gRPC
                        ▼

┌────────────────────────────────────────────────────────────┐
│                      PAYMENT LAYER                         │
├────────────────────────────────────────────────────────────┤
│ payment-service                                             │
│                                                            │
│ • Create Payment                                           │
│ • Capture Payment                                          │
│ • Wallet Management                                        │
│ • Ledger                                                   │
│ • Webhooks                                                 │
│ • Event Publishing                                         │
└──────────────┬───────────────────────┬─────────────────────┘
               │                       │
               │ REST                  │ RabbitMQ
               ▼                       ▼

      ┌───────────────┐      ┌────────────────────┐
      │    PayPal     │      │   payment_events   │
      │   Checkout    │      │       Queue        │
      └───────────────┘      └─────────┬──────────┘
                                       │
                                       ▼

                           ┌────────────────────┐
                           │ students-service   │
                           │ Event Consumer     │
                           └────────────────────┘
```
<!-- TODO: mermaid화-->

### Payment State Machine

A payment state machine represents the lifecycle of a payment, tracking its progress from creation to completion (or failure). Each state reflects the current status of the payment, making it easier to monitor, retry, and prevent invalid operations.

```plaintext
NOT_STARTED → EXECUTING → SUCCESS
                      └→ FAILED
```

- **NOT_STARTED** — order record created in DB
- **EXECUTING** — PayPal order created, waiting for user approval
- **SUCCESS** — funds captured, ledger updated, event published
- **FAILED** — capture failed or user cancelled

::: note Prerequisites

Before you start, make sure you have:

- [<VPIcon icon="fa-brands fa-node"/>Node.js 18+](https://nodejs.org/)
- [<VPIcon icon="fa-brands fa-docker"/>Docker and Docker Compose](https://docs.docker.com/get-docker/)
- [<VPIcon icon="iconfont icon-nestjs"/>NestJS](https://nestjs.com/) basics
- A [<VPIcon icon="fa-brands fa-paypal"/>PayPal Developer](https://developer.paypal.com/) account
- Basic understanding of gRPC and message queues

:::

---

## PayPal Concepts You Need to Know

Before integrating PayPal, it's helpful to understand a few core concepts. PayPal provides separate environments for development and production, along with an order-based payment workflow that your application follows.

### Sandbox vs Live

| Environment | API Base URL | Checkout URL |
| --- | --- | --- |
| Sandbox (dev) | `https://api-m.sandbox.paypal.com` | `https://www.sandbox.paypal.com/checkoutnow?token=...` |
| Live (prod) | `https://api-m.paypal.com` | `https://www.paypal.com/checkoutnow?token=...` |

Always develop in **sandbox**. Switch to live only in production.

### Orders API Flow (What We Use)

PayPal's Orders v2 API follows three steps:

1. **Create Order**: your backend creates an order with amount and return URLs
2. **Approve**: user is redirected to PayPal and approves payment
3. **Capture**: your backend captures the approved funds

This is different from the older Payments REST API. Orders v2 is the recommended approach for new integrations.

### Environment Variables

The PayPal service reads its configuration from environment variables. This keeps sensitive credentials out of your source code and makes it easy to switch between sandbox and production environments.

```sh title=".env"
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com   # or https://api-m.paypal.com for live
```

Never commit real credentials to Git. Use <VPIcon icon="iconfont icon-dotenv"/>`.env` files and Docker environment injection.

---

## Project Structure

```sh title="file structure"
apps/
├── core/
│   └── payment-service/          # Owns all PayPal logic
│       ├── src/
│       │   ├── app/payment/
│       │   │   ├── paypal/paypal.service.ts
│       │   │   ├── payment.service.ts
│       │   │   ├── payment.grpc.controller.ts
│       │   │   ├── payment.http.controller.ts
│       │   │   └── events/payment-events.publisher.ts
│       │   ├── migrations/       # DB schema
│       │   └── routes/health.routes.ts
│       └── Dockerfile
├── services/
│   └── students-service/         # Domain service example
│       └── src/app/payment/
│           ├── payment-client.service.ts      # gRPC client
│           ├── application-payment.service.ts # business logic
│           └── payment-events.consumer.ts     # RabbitMQ listener
└── gateways/
    └── student-apigw/            # HTTP API for frontend
libs/
└── shared/dto/src/lib/payment/
    └── payment.proto             # Shared gRPC contract
```

---

## Step 1 — Create the Payment Service

The payment service runs two servers in one process

| Protocol | Port | Purpose |
| --- | --- | --- |
| HTTP | 3003 | Health checks, webhooks, admin APIs |
| gRPC | 50061 | Internal service-to-service calls |

The payment service exposes both an HTTP server and a gRPC server in the same NestJS application. The HTTP server handles health checks, webhooks, and external requests, while the gRPC server accepts internal requests from other microservices.

```ts title="apps/core/payment-service/src/main.ts"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Health route (outside /api prefix)
  app.use('/health', healthRouter);

  // gRPC microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'payment',
      protoPath: join(process.cwd(), 'libs/shared/dto/src/lib/payment/payment.proto'),
      url: `0.0.0.0:${process.env.GRPC_PORT || '50061'}`,
    },
  });

  app.setGlobalPrefix('api');
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3003);
}
```

During startup, NestJS initializes both servers, allowing external clients and internal services to communicate through the appropriate protocol.

::: important Key design choice

HTTP is for external/webhook traffic. gRPC is for fast, typed internal calls between services.

:::

---

## Step 2 — Define the gRPC Contract

Next, you'll create a shared `.proto` file so all services speak the same language:

A gRPC contract defines the API shared between microservices. Using a `.proto` file ensures that every service communicates with the payment service using the same request and response structure, regardless of the programming language.

```protobuf :collapsed-lines title="libs/shared/dto/src/lib/payment/payment.proto"
syntax = "proto3";
package payment;

service PaymentService {
  rpc CreatePayment(CreatePaymentRequest) returns (CreatePaymentResponse) {}
  rpc CapturePayment(CapturePaymentRequest) returns (CapturePaymentResponse) {}
  rpc GetPaymentStatus(GetPaymentStatusRequest) returns (GetPaymentStatusResponse) {}
  rpc ListPayments(ListPaymentsRequest) returns (ListPaymentsResponse) {}
}

message CreatePaymentRequest {
  string checkout_id = 1;
  string payment_order_id = 2;
  string domain = 3;           // e.g. "application", "subscription"
  string reference_id = 4;     // business entity ID
  string payer_id = 5;
  string amount = 6;
  string currency = 7;
  string buyer_email = 8;
  string seller_account = 9;
  string payment_category = 10;
  string return_url = 11;      // PayPal redirect on success
  string cancel_url = 12;      // PayPal redirect on cancel
  string idempotency_key = 13;
  string metadata = 14;
  string description = 15;
}

message CreatePaymentResponse {
  int32 status = 1;
  string message = 2;
  string payment_order_id = 3;
  string paypal_order_id = 4;
  string approve_url = 5;      // Redirect user here
  string payment_order_status = 6;
}
```

The `domain` + `reference_id` pair lets one payment service handle payments for applications, subscriptions, university fees, and more without coupling to any single business model.

---

## Step 3 — Implement the PayPal Service

Now, you'll create a dedicated `PayPalService` that wraps the PayPal REST API.

Instead of calling the PayPal API throughout the application, we encapsulate all PayPal communication inside a dedicated service. This keeps authentication, order creation, and payment capture logic centralized and easier to maintain.

```ts :collapsed-lines title="apps/core/payment-service/src/app/payment/paypal/paypal.service.ts"
@Injectable()
export class PayPalService {
  private accessToken: string | null = null;
  private tokenExpiresAt = 0;

  private get apiBase(): string {
    return this.configService.get('PAYPAL_API_BASE')
      || 'https://api-m.sandbox.paypal.com';
  }

  // Step 1: Get OAuth access token (cached until expiry)
  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    if (this.accessToken && now < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const response = await axios.post(
      `${this.apiBase}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        auth: {
          username: this.configService.get('PAYPAL_CLIENT_ID'),
          password: this.configService.get('PAYPAL_CLIENT_SECRET'),
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    this.accessToken = response.data.access_token;
    this.tokenExpiresAt = now + (response.data.expires_in - 60) * 1000;
    return this.accessToken;
  }

  // Step 2: Create PayPal checkout order
  async createOrder(input: PayPalCreateOrderInput) {
    const token = await this.getAccessToken();

    const response = await axios.post(
      `${this.apiBase}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [{
          custom_id: input.paymentOrderId,
          description: input.description,
          amount: {
            currency_code: input.currency,
            value: input.amount,
          },
        }],
        application_context: {
          return_url: input.returnUrl,
          cancel_url: input.cancelUrl,
          brand_name: 'YourApp',
          user_action: 'PAY_NOW',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'PayPal-Request-Id': input.idempotencyKey,
        },
      }
    );

    const paypalOrderId = response.data.id;
    const approveUrl = response.data.links
      ?.find((l) => l.rel === 'approve')?.href;

    return { paypalOrderId, approveUrl };
  }

  // Step 3: Capture approved order
  async captureOrder(paypalOrderId: string) {
    const token = await this.getAccessToken();

    const response = await axios.post(
      `${this.apiBase}/v2/checkout/orders/${paypalOrderId}/capture`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const capture = response.data.purchase_units?.[0]?.payments?.captures?.[0];
    return { status: response.data.status, captureId: capture?.id || '' };
  }
}
```

On startup, log configuration (with masked secrets) so you can verify sandbox vs live at a glance:

```plaintext
PayPal configuration check:
  PAYPAL_API_BASE: https://api-m.paypal.com
  PAYPAL_CLIENT_ID: AQb2...aq1M (80 chars)
  credentialsPresent: true
  environment: live
```

Notice that the access token is cached until it expires. This avoids requesting a new OAuth token for every payment, improving performance and reducing unnecessary API calls.

---

## Step 4 — Build the Payment Flow (Create, Approve, Capture)

### Create Payment

`PaymentService.createPayment()` does the following:

1. Checks **idempotency key** and returns an existing order if one is already created
2. Creates a `payment_events` checkout record
3. Creates a `payment_orders` row with status `NOT_STARTED`
4. Calls `PayPalService.createOrder()`
5. Updates order status to `EXECUTING`
6. Returns `approveUrl` to the caller

```ts :collapsed-lines
async createPayment(input: CreatePaymentPayload) {
  // Idempotency: prevent duplicate charges
  const existing = await this.paymentOrderModel.findOne({
    where: { idempotencyKey: input.idempotencyKey },
  });
  if (existing) return this.buildCreateResponse(existing);

  const order = await this.paymentOrderModel.create({
    paymentOrderId: input.paymentOrderId,
    amount: input.amount,
    currency: input.currency,
    paymentOrderStatus: PaymentOrderStatus.NOT_STARTED,
    domain: input.domain,
    referenceId: input.referenceId,
    // ...
  });

  const paypalOrder = await this.paypalService.createOrder({
    paymentOrderId: order.paymentOrderId,
    amount: input.amount,
    currency: input.currency,
    returnUrl: input.returnUrl,
    cancelUrl: input.cancelUrl,
    idempotencyKey: input.idempotencyKey,
  });

  await order.update({
    paymentOrderStatus: PaymentOrderStatus.EXECUTING,
    paypalOrderId: paypalOrder.paypalOrderId,
  });

  return {
    approveUrl: paypalOrder.approveUrl,
    paypalOrderId: paypalOrder.paypalOrderId,
    paymentOrderStatus: PaymentOrderStatus.EXECUTING,
  };
}
```

### User Approves on PayPal

The frontend redirects the user to `approveUrl`. PayPal handles authentication and approval, then redirects back to your `returnUrl`.

### Capture Payment

After approval, call `capturePayment()` with either `paymentOrderId` or `paypalOrderId`:

```ts
async capturePayment(paymentOrderId?: string, paypalOrderId?: string) {
  const order = await this.findOrder(paymentOrderId, paypalOrderId);

  if (order.paymentOrderStatus === PaymentOrderStatus.SUCCESS) {
    return this.buildCaptureResponse(order); // already captured
  }

  const capture = await this.paypalService.captureOrder(order.paypalOrderId);

  if (capture.status !== 'COMPLETED') {
    throw new Error(`PayPal capture status: ${capture.status}`);
  }

  await this.finalizeSuccessfulPayment(order, capture.captureId);
  return this.buildCaptureResponse(order);
}
```

`finalizeSuccessfulPayment()` runs in a database transaction:

1. Updates order status to `SUCCESS`
2. Updates seller wallet balance
3. Creates ledger entries (audit trail)
4. Mark scheckout event as done
5. Publishes a `payment.{domain}.completed` event to RabbitMQ

---

## Step 5 — Connect Domain Services via gRPC

Domain services (like `students-service`) never talk to PayPal directly. They use a gRPC client:

The Students Service communicates with the Payment Service through a gRPC client. Rather than calling the PayPal API directly, it invokes strongly typed remote procedures exposed by the payment service.

```ts title="apps/services/students-service/src/app/payment/payment.module.ts"
ClientsModule.registerAsync([{
  name: 'PAYMENT_SERVICE',
  useFactory: () => ({
    transport: Transport.GRPC,
    options: {
      package: 'payment',
      protoPath: 'libs/shared/dto/src/lib/payment/payment.proto',
      url: process.env.PAYMENT_SERVICE_URL || 'payment-service:50061',
    },
  }),
}])
```

```ts title="payment-client.service.ts"
@Injectable()
export class PaymentClientService implements OnModuleInit {
  private paymentService: PaymentGrpcService;

  constructor(@Inject('PAYMENT_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.paymentService = this.client.getService('PaymentService');
  }

  async createPayment(data: CreatePaymentRequest) {
    return firstValueFrom(this.paymentService.CreatePayment(data));
  }

  async capturePayment(data: { payment_order_id?: string; paypal_order_id?: string }) {
    return firstValueFrom(this.paymentService.CapturePayment(data));
  }
}
```

### Domain Service Business Logic Example:

This example shows how a domain service prepares business-specific data before delegating payment processing to the Payment Service.

```ts title="application-payment.service.ts"
async initiateTuitionPayment(applicationId: number, options: { domain: string }) {
  const application = await this.applicationModel.findByPk(applicationId);

  // Build PayPal return URLs from frontend domain
  const frontendBase = options.domain; // e.g. https://crm.yourapp.com
  const returnUrl = `${frontendBase}/payment/successful?applicationId=${application.applicationId}`;
  const cancelUrl = `${frontendBase}/payment/failure?applicationId=${application.applicationId}`;

  const result = await this.paymentClient.createPayment({
    checkout_id: `checkout-app-${application.id}`,
    payment_order_id: uuidv4(),
    domain: 'application',
    reference_id: String(application.id),
    payer_id: application.studentId,
    amount: finalAmount.toFixed(2),
    currency: 'USD',
    buyer_email: buyerEmail,
    seller_account: `university-${application.universityId}`,
    payment_category: 'tuition_deposit',
    return_url: returnUrl,
    cancel_url: cancelUrl,
    idempotency_key: `app-${application.id}-tuition-${uuidv4()}`,
  });

  return {
    approveUrl: result.approve_url,
    paypalOrderId: result.paypal_order_id,
    paymentOrderId: result.payment_order_id,
  };
}
```

The domain service remains responsible for business rules, while the payment service handles the payment workflow itself.

::: important

The frontend must send its own origin as `domain` so return URLs point to the correct environment (localhost in dev, production URL in prod).

:::

---

## Step 6 — Add the API Gateway Layer

The API gateway exposes HTTP endpoints to the frontend and forwards to domain services:

```plaintext
POST /applications/:id/pay/applicationfee
Body: { "domain": "https://crm.yourapp.com", "couponCode": "SAVE10" }
```

```plaintext
student-apigw → students-service (gRPC) → payment-service (gRPC) → PayPal
```

Gateway responsibilities:

- Authentication (JWT)
- Request validation
- No PayPal credentials

Capture the endpoint after the PayPal redirect:

```plaintext
POST /applications/:id/pay/applicationfee/capture
Body: { "paypalOrderId": "PAYPAL_ORDER_ID_FROM_URL" }
```

---

## Step 7 — Publish Payment Events with RabbitMQ

RabbitMQ enables asynchronous communication between services. Instead of waiting for every service to finish processing after a payment succeeds, the payment service simply publishes an event and lets interested services handle it independently.

After a successful capture, the payment service publishes an event:

```ts title="payment-events.publisher.ts"
async publishCompleted(event: PaymentCompletedEvent) {
  const pattern = `payment.${event.domain}.completed`; // e.g. payment.application.completed
  this.eventsClient.emit(pattern, { ...event, eventId: uuidv4() });
}
```

Each domain service subscribes to payment events that are relevant to its business domain. For example, the Students Service listens for `payment.application.completed` events so it can mark student applications as paid.

```ts title="payment-events.consumer.ts (students-service)"
@EventPattern('payment.application.completed')
async handlePaymentCompleted(@Payload() data: PaymentCompletedPayload) {
  await this.applicationPaymentService.handlePaymentCompletedEvent(data);
  // Marks application as PAID, records payment history
}
```

This decouples payment completion from domain updates. Even if `students-service` is temporarily down, you can replay events from the queue.

### Two Paths to Mark an Order as Paid

| Path | When used |
| --- | --- |
| **Synchronous capture** | Frontend calls capture API after PayPal redirect |
| **Async event** | RabbitMQ consumer updates domain state after payment service publishes event |

Using both (with idempotency) gives you reliability: the sync path gives immediate UX feedback. The async path is a safety net.

---

## Step 8 — Database Schema and Migrations

The payment service maintains its own database schema. Each table has a specific responsibility, allowing payment records, financial transactions, and webhook processing to remain isolated from other business services.

| Table | Purpose |
| --- | --- |
| `payment_events` | Checkout session (buyer/seller info) |
| `payment_orders` | Individual payment attempts with PayPal IDs |
| `ledger_entries` | Financial audit trail |
| `wallets` | Seller balance tracking |
| `processed_webhooks` | Webhook deduplication |
| `coupons` / `coupon_redemptions` | Discount codes (optional) |
| `sequelize_meta` | Migration tracking |

### Production Migration Gotcha

In production Docker images, migration `.ts` files are **not** available unless you compile them to JavaScript and copy them into the image:

```dockerfile title="Dockerfile"
# compile migrations for production
RUN pnpm exec tsc --project apps/core/payment-service/tsconfig.migrations.json
COPY --from=builder /app/dist/apps/core/payment-service/migrations ./migrations
```

Without this, you'll see `Executed 0 migrations` in logs and **no tables will be created**.

Create the database user before first deploy:

```sql
CREATE USER payment_user WITH PASSWORD 'payment_pass';
CREATE DATABASE payment_db;
GRANT ALL PRIVILEGES ON DATABASE payment_db TO payment_user;
```

---

## Step 9 — Local Development Setup (Docker)

### Environment Variables (<VPIcon icon="iconfont icon-dotenv"/>`.env`)

```sh title=".env"
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
```

In this section, we'll configure the payment service for local development using Docker Compose. This setup provides a complete environment for testing payments without deploying to production.

### Docker Compose (local)

The following configuration starts the payment service together with its required dependencies, including PostgreSQL and RabbitMQ.

```yaml title="docker-compose.yaml"
payment-service:
  build:
    dockerfile: apps/core/payment-service/Dockerfile.dev
  ports:
    - '3003:3003'    # HTTP
    - '50061:50061'  # gRPC
  environment:
    - PAYPAL_API_BASE=https://api-m.sandbox.paypal.com
    - PAYPAL_CLIENT_ID=${PAYPAL_CLIENT_ID}
    - PAYPAL_CLIENT_SECRET=${PAYPAL_CLIENT_SECRET}
    - DB_HOST=postgres
    - DB_NAME=payment_db
    - DB_USER=payment_user
    - DB_PASSWORD=payment_pass
    - RABBITMQ_URL=amqp://rabbitmq:5672

students-service:
  environment:
    - PAYMENT_SERVICE_URL=payment-service:50061
  depends_on:
    payment-service:
      condition: service_healthy
```

### Start Services

Once the configuration is complete, start the containers and verify that every service is running correctly before testing the payment flow.

```sh
docker compose up -d payment-service students-service student-apigw
```

### Verify Health

```sh
curl http://localhost:3003/health
# {"status":"healthy","service":"payment-service",...}
```

### Test Payment Flow

1. Call `POST /applications/:id/pay/applicationfee` with `{ "domain": "http://localhost:3000" }`
2. Open the returned `approveUrl` in a browser
3. Log in with a [PayPal sandbox buyer account](https://developer.paypal.com/dashboard/accounts)
4. After approval, call `POST /applications/:id/pay/applicationfee/capture` with the `paypalOrderId`
5. Confirm application status is `PAID`

---

## Step 10 — Production Deployment

After verifying everything locally, the next step is deploying the payment service to production. The main differences are using PayPal Live credentials, production environment variables, and production-ready Docker images.

### PayPal Live Credentials

1. Go to [<VPIcon icon="fa-brands fa-paypal"/>PayPal Developer Dashboard → Live apps](https://developer.paypal.com/dashboard/applications/live)
2. Create a Live REST API app
3. Copy Client ID and Secret

### Production <VPIcon icon="iconfont icon-dotenv"/>`.env` (on Server — Never Commit)

```sh title=".env"
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_secret
PAYPAL_API_BASE=https://api-m.paypal.com
```

### Docker Compose (Production)

```yaml title="docker-compose-prod.yaml"
payment-service:
  build:
    dockerfile: apps/core/payment-service/Dockerfile
  environment:
    - NODE_ENV=production
    - PAYPAL_API_BASE=${PAYPAL_API_BASE:-https://api-m.paypal.com}
    - PAYPAL_CLIENT_ID=${PAYPAL_CLIENT_ID}
    - PAYPAL_CLIENT_SECRET=${PAYPAL_CLIENT_SECRET}
    - DB_HOST=${DB_HOST}
    - DB_NAME=payment_db
    - DB_USER=payment_user
    - DB_PASSWORD=payment_pass
    - RABBITMQ_URL=amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@rabbitmq:5672
  labels:
    - 'traefik.http.routers.payment.rule=Host(`payment-service.yourapp.com`)'

students-service:
  environment:
    - PAYMENT_SERVICE_URL=payment-service:50061
  depends_on:
    payment-service:
      condition: service_healthy
```

### Deploy Commands

```sh
docker compose -f docker-compose.prod.yml build --no-cache payment-service
docker compose -f docker-compose.prod.yml up -d payment-service students-service
```

### Verify Production

```sh
curl https://payment-service.yourapp.com/health

docker logs -f apply-goal-payment-service
#
# Look for:
#   environment: live
#   Found 8 pending migrations
#   Executed 8 migrations
```

### Frontend Domain in Production

The frontend must send the production CRM URL when initiating payment:

```json
{ "domain": "https://crm.yourapp.com" }
```

Not `localhost`. This controls where PayPal redirects after payment.

---

## Step 11 — Health Checks and Monitoring

Health checks allow orchestration tools such as Docker and Traefik to verify that the payment service is running correctly. Monitoring these endpoints helps detect failures early and improves application reliability.

```ts
// GET /health
{ "status": "healthy", "service": "payment-service", "timestamp": "...", "version": "1.0.0" }
```

Used by:

- Docker `HEALTHCHECK`
- Traefik load balancer
- Uptime monitoring

PayPal credential check runs on startup via `PayPalService.logConfiguration()`.

---

## Complete Request Flow (Real Example)

**Scenario:** Student pays tuition fee for university application.

```plaintext
1. Frontend
   POST /applications/42/pay/applicationfee
   Body: { "domain": "https://crm.yourapp.com" }
        │
        ▼
2. student-apigw (HTTP → gRPC)
   InitiateApplicationTuitionPayment(applicationId: 42)
        │
        ▼
3. students-service
   - Validates application not already paid
   - Resolves tuition amount
   - Optionally validates coupon via payment-service gRPC
   - Builds returnUrl / cancelUrl from domain
   - Calls payment-service CreatePayment (gRPC)
        │
        ▼
4. payment-service
   - Creates payment_orders record (EXECUTING)
   - Calls PayPal POST /v2/checkout/orders
   - Returns approveUrl
        │
        ▼
5. Frontend redirects user to approveUrl (PayPal checkout)
        │
        ▼
6. User approves → PayPal redirects to returnUrl
        │
        ▼
7. Frontend
   POST /applications/42/pay/applicationfee/capture
   Body: { "paypalOrderId": "PAYPAL_ORDER_ID" }
        │
        ▼
8. payment-service
   - POST /v2/checkout/orders/{id}/capture
   - Updates order → SUCCESS
   - Updates wallet + ledger
   - Publishes payment.application.completed → RabbitMQ
        │
        ▼
9. students-service (event consumer)
   - Marks application paymentStatus = PAID
   - Records payment in application_payments table
```

---

## Coupon Support (Optional)

Before creating a PayPal order, validate a coupon via gRPC:

```ts
const validation = await this.paymentClient.validateCoupon({
  code: 'SAVE20',
  universityId: application.universityId,
  originalAmount: 500,
  paymentType: 'application_fee',
});

const finalAmount = validation.data.finalAmount;

// If coupon covers 100% — skip PayPal entirely
if (finalAmount <= 0) {
  await this.markApplicationPaid(applicationId, { amount: 0, source: 'coupon' });
  return { paymentOrderStatus: 'COMPLETED' };
}
```

Coupon logic lives in `payment-service` so discount rules are centralized.

---

## PayPal Webhooks (Optional but Recommended)

Register a webhook URL in the PayPal dashboard:

```plaintext
https://payment-service.yourapp.com/api/v1/payments/webhooks/paypal
```

The payment service handles:

| Event | Action |
| --- | --- |
| `CHECKOUT.ORDER.APPROVED` | Auto-capture the order |
| `PAYMENT.CAPTURE.COMPLETED` | Finalize payment if not already done |

Webhook events are deduplicated via `processed_webhooks` table to prevent double-processing.

::: info Testing Checklist

- [ ] `GET /health` returns 200
- [ ] PayPal logs show `credentialsPresent: true`
- [ ] Database tables exist after startup (`payment_orders`, `payment_events`, etc.)
- [ ] Create payment returns valid `approveUrl`
- [ ] Sandbox buyer can complete checkout
- [ ] Capture returns `payment_order_status: SUCCESS`
- [ ] Application marked as `PAID` in domain service
- [ ] RabbitMQ event `payment.application.completed` is consumed
- [ ] Duplicate capture is handled gracefully (idempotent)
- [ ] Coupon 100% discount skips PayPal
- [ ] Production uses `https://api-m.paypal.com` (live)

:::

---

## Wrapping Up

Integrating PayPal in a microservice architecture comes down to a few principles:

1. One payment service owns all PayPal API calls
2. gRPC connects domain services to the payment service internally
3. RabbitMQ broadcasts payment outcomes so domain services stay decoupled
4. Idempotency keys prevent duplicate charges
5. Environment variables switch between sandbox and live — no code changes
6. Migrations must be compiled for production Docker images
7. Frontend sends `domain` so return URLs work in every environment

This pattern scales: add a new payment type (subscription, agency fee, university service fee) by sending a different `domain` and `payment_category` — no changes to PayPal integration code.

::: info Further Reading

- [PayPal Orders API v2 Documentation](https://developer.paypal.com/docs/api/orders/v2/)
- [PayPal Sandbox Testing Guide](https://developer.paypal.com/tools/sandbox/)
- [<VPIcon icon="iconfont icon-nestjs"/>NestJS Microservices (gRPC)](https://docs.nestjs.com/microservices/grpc)
- [<VPIcon icon="iconfont icon-nestjs"/>NestJS RabbitMQ Transport](https://docs.nestjs.com/microservices/rabbitmq)
- [Umzug Database Migrations (<VPIcon icon="iconfont icon-github"/>`sequelize/umzug`)](https://github.com/sequelize/umzug)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement PayPal in a Microservice Architecture Using NestJS, gRPC, and Docker",
  "desc": "In this tutorial, you'll build a production-ready PayPal payment service using NestJS microservices. Along the way, you'll learn how to isolate payment logic into its own service, communicate between ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-paypal-in-a-microservice-architecture-using-nestjs-grpc-and-docker.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
