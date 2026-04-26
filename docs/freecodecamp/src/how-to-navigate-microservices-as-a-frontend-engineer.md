---
lang: en-US
title: "How to Navigate Microservices as a Frontend Engineer"
description: "Article(s) > How to Navigate Microservices as a Frontend Engineer"
icon: iconfont icon-expressjs
category:
  - Node.js
  - React.js
  - Express.js
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
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Navigate Microservices as a Frontend Engineer"
    - property: og:description
      content: "How to Navigate Microservices as a Frontend Engineer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-navigate-microservices-as-a-frontend-engineer.html
prev: /programming/js-express/articles/README.md
date: 2026-05-05
isOriginal: false
author:
  - name: Abisoye Alli-Balogun
    url: https://freecodecamp.org/news/author/AbisoyeAlli/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6a10811b-1150-490a-8f29-28797fd39861.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Navigate Microservices as a Frontend Engineer"
  desc="Most frontend engineers don't choose microservices. They inherit them. One day you're fetching data from a single API, and the next you're stitching together responses from five services, each with it"
  url="https://freecodecamp.org/news/how-to-navigate-microservices-as-a-frontend-engineer"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6a10811b-1150-490a-8f29-28797fd39861.png"/>

Most frontend engineers don't choose microservices. They inherit them. One day you're fetching data from a single API, and the next you're stitching together responses from five services, each with its own contract, its own failure modes, and its own idea of what a "user" looks like.

The backend team talks about bounded contexts, eventual consistency, and service meshes. You're thinking about loading states, stale data, and why the checkout page breaks when the inventory service is slow.

This article is for frontend engineers working in microservice environments. You'll learn how to consume multiple service APIs without creating a tangled mess, how to handle partial failures gracefully in the UI, how to manage distributed state across services, and how to work effectively with backend teams on API contracts **because half the battle is communication, not code**.

The goal is not to turn you into a backend engineer, it's to give you the mental models and patterns that make frontend development in a microservice world less painful.

::: note Prerequisites

To get the most out of this article, you should be familiar with:

- React or a similar component framework (the examples use React and TypeScript)
- Basic understanding of REST APIs and HTTP
- Experience fetching data in frontend applications (fetch, Axios, or React Query)
- General awareness of what microservices are (you don't need to have built one)

:::

---

## The Frontend's Microservice Problem

In a monolithic architecture, the frontend talks to one API. That API owns the database, handles the business logic, and returns exactly the shape of data the UI needs. Life is simple.

In a microservice architecture, that single API fractures into many:

```plaintext
Monolith:
  Browser → API → Database

Microservices:
  Browser → API Gateway → User Service
                        → Order Service
                        → Inventory Service
                        → Payment Service
                        → Notification Service
```
<!-- TODO: mermaid화 -->

Each of those services is owned by a different team, deployed independently, and may use different data formats or conventions. As a frontend engineer, you now have several new problems:

1. **Multiple contracts:** Each service has its own API shape. A "product" in the inventory service has different fields than a "product" in the catalog service.
2. **Partial failures:** The order service might respond in 50 ms while the recommendation service times out. Your UI needs to handle both.
3. **Data consistency:** A user updates their address, but the order service still shows the old one because it hasn't synced yet.
4. **Increased latency:** Assembling a single page might require three or four API calls instead of one.

These aren't backend problems that happen to affect the frontend. They're fundamentally frontend problems that require frontend solutions.

---

## Pattern 1: The Backend-for-Frontend (BFF)

The most impactful pattern for frontend teams in a microservice world is the Backend-for-Frontend. A BFF is a thin API layer that sits between the browser and the microservices. It's owned by the frontend team and exists to serve the frontend's specific needs.

```plaintext
Without BFF:
  Browser → User Service    (call 1)
  Browser → Order Service   (call 2)
  Browser → Inventory Service (call 3)
  3 round trips, 3 contracts to manage

With BFF:
  Browser → BFF → User Service
                → Order Service
                → Inventory Service
  1 round trip, 1 contract to manage
```
<!-- TODO: mermaid화 -->

The BFF aggregates calls, transforms responses into the shapes your components need, and handles cross-service concerns like authentication token forwarding.

```ts :collapsed-lines
// BFF endpoint: GET /api/order-summary/:orderId
// Aggregates data from three services into one frontend-friendly response
import express from "express";

const router = express.Router();

router.get("/api/order-summary/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const token = req.headers.authorization;

  try {
    const [order, customer, shipment] = await Promise.allSettled([
      fetch(`\({ORDER_SERVICE}/orders/\){orderId}`, {
        headers: { Authorization: token },
      }).then((r) => r.json()),
      fetch(`\({USER_SERVICE}/users/\){req.userId}`, { // userId set by auth middleware
        headers: { Authorization: token },
      }).then((r) => r.json()),
      fetch(`\({SHIPPING_SERVICE}/shipments?orderId=\){orderId}`, {
        headers: { Authorization: token },
      }).then((r) => r.json()),
    ]);

    res.json({
      order: order.status === "fulfilled" ? order.value : null,
      customer: customer.status === "fulfilled" ? customer.value : null,
      shipment: shipment.status === "fulfilled" ? shipment.value : null,
      errors: [order, customer, shipment]
        .filter((r) => r.status === "rejected")
        .map((r) => r.reason.message),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to assemble order summary" });
  }
});
```

Notice the use of `Promise.allSettled` instead of `Promise.all`. This is critical in a microservice environment. `Promise.all` fails fast: if any one service is down, the entire request fails. `Promise.allSettled` lets you return partial data, which leads directly to the next pattern.

### When to Use a BFF

A BFF is worth the investment when:

- Your frontend aggregates data from three or more services per page
- Different clients (web, mobile, admin) need different data shapes from the same services
- You want the frontend team to control response shapes without waiting on backend teams

A BFF isn't necessary when:

- You have an API gateway that already handles aggregation (for example, Apollo Federation for GraphQL)
- You only consume one or two services
- Your backend teams already provide frontend-optimized endpoints

---

## Pattern 2: Handling Partial Failures in the UI

In a monolith, a request either succeeds or fails. In a microservice world, it can partially succeed. The order data loads fine, but the recommendation service is down. The product details are available, but the review service is slow.

Your UI needs to handle this gracefully. The key principle: **never let a non-critical service failure break a critical user flow.**

```ts
// Types for partial data loading
interface ServiceResult<T> {
  data: T | null;
  status: "loaded" | "error" | "loading";
  error?: string;
}

interface OrderPageData {
  order: ServiceResult<Order>;
  recommendations: ServiceResult<Product[]>;
  reviews: ServiceResult<Review[]>;
}
```

Build your components to render independently based on what data is available:

```tsx
function OrderPage({ orderId }: { orderId: string }) {
  const { order, recommendations, reviews } = useOrderPageData(orderId);

  // Critical: order must load or the page makes no sense
  if (order.status === "loading") return <OrderSkeleton />;
  if (order.status === "error") return <ErrorPage message={order.error} />;

  return (
    <div>
      {/* Critical section: always rendered */}
      <OrderDetails order={order.data} />

      {/* Non-critical: degrades gracefully */}
      <section aria-label="Recommendations">
        {recommendations.status === "loaded" ? (
          <RecommendationCarousel products={recommendations.data} />
        ) : recommendations.status === "error" ? (
          <EmptyState message="Recommendations Unavailable" />
        ) : (
          <CarouselSkeleton />
        )}
      </section>

      {/* Non-critical: degrades gracefully */}
      <section aria-label="Customer reviews">
        {reviews.status === "loaded" ? (
          <ReviewList reviews={reviews.data} />
        ) : reviews.status === "error" ? (
          <EmptyState message="Reviews unavailable right now" />
        ) : (
          <ReviewSkeleton />
        )}
      </section>
    </div>
  );
}
```

### Classifying Critical vs. Non-Critical Data

Not all data on a page is equally important. Before building any page that pulls from multiple services, classify each data source:

| Data Source | Critical? | Failure Strategy |
| --- | --- | --- |
| Order details | Yes | Show error page, block the entire view |
| Customer info | Yes | Show error page |
| Recommendations | No | Hide the section, show empty state |
| Reviews | No | Show "reviews unavailable" message |
| Recently viewed | No | Hide silently |

This classification should be a conscious decision made with your product team, not something you discover when a service goes down in production.

---

## Pattern 3: Managing Distributed State

In a monolithic world, the server is the single source of truth. In a microservice world, truth is distributed. The user service knows the user's current address. The order service has a snapshot of the address at the time of the order. These might not match.

### Stale Data and Cache Boundaries

When your frontend caches data from multiple services, you need to think about cache boundaries. Data from different services goes stale at different rates.

```ts
// Configure cache times based on how frequently the underlying data changes
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // Default: 30 seconds
    },
  },
});

// Product catalog: changes infrequently
function useProduct(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 5 * 60_000, // 5 minutes: catalog updates are rare
  });
}

// Inventory levels: changes constantly
function useStockLevel(productId: string) {
  return useQuery({
    queryKey: ["stock", productId],
    queryFn: () => fetchStockLevel(productId),
    staleTime: 10_000, // 10 seconds: stock changes with every purchase
    refetchInterval: 30_000, // Poll every 30 seconds on active pages
  });
}

// User's own order: should reflect latest state
function useOrder(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
    staleTime: 0, // Always refetch: user expects to see their latest action
  });
}
```

The mistake is treating all cached data the same. Product information from the catalog service can be cached for minutes. Stock levels from the inventory service need to be refreshed much more frequently. A user's own order data should always be fresh because they just performed an action and expect to see the result.

### Cross-Service Invalidation

The trickiest part of distributed state is knowing when to invalidate. When a user places an order, you need to:

1. Invalidate the order list (order service)
2. Invalidate the stock level (inventory service)
3. Invalidate the user's loyalty points (user service)

```ts
// After a successful order placement, invalidate across service boundaries
async function placeOrder(cart: Cart): Promise<Order> {
  const order = await api.post("/api/orders", { items: cart.items });

  // Invalidate data from multiple services that this action affected
  queryClient.invalidateQueries({ queryKey: ["orders"] });
  queryClient.invalidateQueries({ queryKey: ["stock"] });
  queryClient.invalidateQueries({ queryKey: ["loyalty-points"] });

  // Optimistically update the cart (owned by the frontend)
  queryClient.setQueryData(["cart"], { items: [] });

  return order;
}
```

This is manual and error-prone. Every time a new service cares about order events, you need to remember to add an invalidation here.

For more robust alternatives, you can use server-sent events or WebSocket connections to let the backend push invalidation signals to the frontend, or adopt a pub/sub pattern within your client-side state layer where cache keys subscribe to domain events.

These approaches are beyond this article's scope, but worth exploring once your invalidation table grows past a dozen entries.

In the meantime, documenting these cross-service dependencies in a table helps:

| User Action | Services Affected | Cache Keys to Invalidate |
| --- | --- | --- |
| Place order | Order, Inventory, User | `orders`, `stock`, `loyalty-points`, `cart` |
| Update address | User, Shipping | `user-profile`, `shipping-estimates` |
| Write review | Reviews, Product | `reviews`, `product` (rating changes) |

---

## Pattern 4: Taming Multiple API Contracts

In a microservice world, each service defines its own API contract. The user service returns `firstName` and `lastName`. The order service returns `customerName` as a single string. The notification service expects `fullName`. Same concept, three different field names.

### The Adapter Layer

Create an adapter layer that translates each service's response into a consistent domain model that your components use:

```ts :collapsed-lines
// Domain models: what the frontend actually works with
interface User {
  id: string;
  fullName: string;
  email: string;
  address: Address;
}

// Adapter for the User Service
function adaptUserServiceResponse(raw: UserServiceResponse): User {
  return {
    id: raw.userId,
    fullName: `\({raw.firstName} \){raw.lastName}`,
    email: raw.emailAddress,
    address: {
      line1: raw.address.street,
      city: raw.address.city,
      postcode: raw.address.zipCode,
      country: raw.address.countryCode,
    },
  };
}

// Adapter for the Order Service (which embeds a different user shape)
function adaptOrderCustomer(raw: OrderServiceCustomer): User {
  return {
    id: raw.customerId,
    fullName: raw.customerName,
    email: raw.email,
    address: {
      line1: raw.shippingAddress.addressLine1,
      city: raw.shippingAddress.city,
      postcode: raw.shippingAddress.postalCode,
      country: raw.shippingAddress.country,
    },
  };
}
```

Your components only work with the `User` type. They never see the raw service responses. When a service changes its API, you update one adapter, not every component that displays a user's name.

### Where to Put the Adapter Layer

If you have a BFF, the adapters live there. The browser never sees the raw service response. If you're calling services directly from the frontend, place the adapters in your data-fetching layer, between the HTTP call and the cache:

```ts
// The adapter runs before data enters the cache
function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const raw = await fetch(`/api/users/${userId}`).then((r) => r.json());
      return adaptUserServiceResponse(raw);
    },
  });
}
```

---

## Pattern 5: Timeout Budgets for Page Assembly

When a page depends on multiple services, you need a timeout strategy. Without one, your page load time is determined by the slowest service, and in a microservice world, there's always a slow service.

A timeout budget allocates a maximum time for assembling all the data a page needs. If a non-critical service doesn't respond within its budget, you render without it.

In practice, this utility lives in a shared service layer (for example, <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="iconfont icon-typescript"/>`api.ts`) rather than inline with each page's assembly logic. Here's the implementation:

```ts :collapsed-lines title="lib/api.ts"
// shared timeout utility
async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn(`Request to \({url} timed out after \){timeoutMs}ms`);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// Page assembly with tiered timeouts
async function assembleProductPage(productId: string): Promise<ProductPageData> {
  // Critical data: longer timeout, page fails without it
  const product = await fetchWithTimeout<Product>(
    `/api/products/${productId}`,
    {},
    3000 // 3 second budget for critical data
  );

  if (!product) {
    throw new Error("Product not found");
  }

  // Non-critical data: shorter timeout, page renders without it
  const [reviews, recommendations, relatedProducts] = await Promise.all([
    fetchWithTimeout<Review[]>(
      `/api/reviews?productId=${productId}`,
      {},
      1500 // 1.5 second budget
    ),
    fetchWithTimeout<Product[]>(
      `/api/recommendations?productId=${productId}`,
      {},
      1000 // 1 second budget: nice to have
    ),
    fetchWithTimeout<Product[]>(
      `/api/products/${productId}/related`,
      {},
      1000
    ),
  ]);

  return {
    product,
    reviews: reviews ?? [],
    recommendations: recommendations ?? [],
    relatedProducts: relatedProducts ?? [],
  };
}
```

Notice the different budgets. Critical data (the product itself) gets 3 seconds. Non-critical data (reviews, recommendations) gets 1–1.5 seconds. If recommendations are slow, you show the product without them. The user doesn't wait for a service they may not even look at.

---

## Pattern 6: Error Boundaries Per Service

React error boundaries are especially powerful in a microservice frontend. Instead of one error boundary at the page level, place boundaries around sections that map to different backend services.

If you haven't used error boundaries before, here's a minimal implementation. Error boundaries must be class components, React doesn't support them as function components yet (see the [<VPIcon icon="fa-brands fa-react"/>React docs](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) for more detail):

```ts
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean } > {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
```

With that in place, scope your boundaries to individual service sections:

```tsx
function ProductPage({ productId }: { productId: string }) {
  return (
    <div>
      {/* If the product service fails, show a full-page error */}
      <ErrorBoundary fallback={<ProductErrorPage />}>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails productId={productId} />
        </Suspense>
      </ErrorBoundary>

      {/* If the review service fails, just hide reviews */}
      <ErrorBoundary fallback={<EmptyState message="Reviews unavailable" />}>
        <Suspense fallback={<ReviewSkeleton />}>
          <ProductReviews productId={productId} />
        </Suspense>
      </ErrorBoundary>

      {/* If recommendations fail, hide silently */}
      <ErrorBoundary fallback={null}>
        <Suspense fallback={<CarouselSkeleton />}>
          <Recommendations productId={productId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

Each boundary catches errors from its own data source independently. The review service crashing doesn't affect the product details. The recommendation service timing out doesn't show an error at all – the section simply doesn't render.

This maps directly to your critical/non-critical classification. Critical services get error boundaries with visible error UI. Non-critical services get boundaries that degrade silently or show a minimal empty state.

---

## Working With Backend Teams on Contracts

The technical patterns above solve symptoms. The root cause of most frontend pain in microservice environments is poor communication between frontend and backend teams about API contracts.

### Contract Conversations to Have Early

#### 1. What fields will the frontend actually use?

Backend services often expose their entire data model. The frontend uses three fields. If the backend team knows which fields you depend on, they can maintain those fields more carefully and deprecate the ones nobody uses.

#### 2. What is the expected latency budget for this endpoint?

If the product page has a 2-second total budget and the recommendation service averages 1.8 seconds, you have a problem before you write any frontend code. Surface this early.

#### 3. What happens when this service is degraded?

Ask each backend team: "If your service responds with 500 errors for an hour, what should the frontend show?" This question often reveals that nobody has thought about it, which is exactly why you need to ask.

#### 4. How will you communicate breaking changes?

Agree on a process. Whether it is OpenAPI spec diffs in pull requests, a Slack channel for API changes, or versioned endpoints, pick something and hold each other to it.

### API Contracts as Shared Artifacts

Push for machine-readable contracts. OpenAPI specs, GraphQL schemas, or Protocol Buffer definitions serve as a shared source of truth between frontend and backend teams. They enable:

- **Automated type generation:** Tools like `openapi-typescript` generate TypeScript types from OpenAPI specs. When the backend changes a field, your build fails immediately, not in production.
- **Contract testing:** Tools like `Pact` let you define the expected request/response pairs from the frontend's perspective. The backend runs these tests in their CI pipeline. If their changes break the frontend's expectations, the pipeline fails.
- **Mock servers:** Generated mocks from the spec let you build the frontend before the backend is ready. When the real service ships, your code already works.

```ts
// Generated types from OpenAPI spec, always in sync with the backend
import type { components } from "./generated/inventory-api";

type Product = components["schemas"]["Product"];
type StockLevel = components["schemas"]["StockLevel"];

// If the backend renames "available" to "inStock",
// this code fails at compile time, not in production
function formatStockMessage(stock: StockLevel): string {
  if (stock.available > 10) return "In Stock";
  if (stock.available > 0) return `Only ${stock.available} left`;
  return "Out of Stock";
}
```

### Testing Against Multiple Services

Contract testing catches backend-side breaking changes, but you also need to test your frontend's behavior when services respond in unexpected ways. [<VPIcon icon="fas fa-globe"/>Mock Service Worker (MSW)](https://mswjs.io/) lets you spin up per-service mock handlers in your test environment:

```ts
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// Mock each service independently
const server = setupServer(
  http.get("/api/products/:id", () =>
    HttpResponse.json({ productId: "abc-123", name: "Widget", price: 49.99 })
  ),
  http.get("/api/reviews", () =>
    HttpResponse.json([{ rating: 5, body: "Great product" }])
  )
);

// Test: what happens when the review service is down?
test("renders product page when reviews service fails", async () => {
  server.use(
    http.get("/api/reviews", () => HttpResponse.error())
  );

  render(<ProductPage productId="abc-123" />);

  expect(await screen.findByText("Widget")).toBeInTheDocument();
  expect(await screen.findByText("Reviews unavailable")).toBeInTheDocument();
});
```

This lets you simulate the partial failure scenarios from Pattern 2 in your test suite. Test your adapter layer (Pattern 4) with unit tests against raw service response fixtures, and use MSW for integration tests that verify the full page assembles correctly when individual services are slow, down, or return unexpected shapes.

---

## When to Push Back

Not every microservice problem has a frontend solution. Sometimes the right answer is to push back on the architecture.

**Push back when the frontend is making more than 5 API calls for a single page.** This is a signal that either the services are too granular or there is a missing aggregation layer. The fix is a BFF or a composite API, not more `Promise.all` calls in the browser.

**Push back when two services return conflicting data about the same entity.** If the user service says the user's name is "Jane" and the order service says it is "Janet," this is a data consistency problem that the frontend can't solve. It needs to be fixed at the source, either through event-driven syncing between services or by establishing one service as the authoritative source for that field.

**Push back when backend teams make breaking changes without notice.** If your production app breaks because a service renamed a field in a minor version bump, that's a process failure. Advocate for versioned APIs, deprecation notices, and contract testing.

You're not just a consumer of APIs. You're a stakeholder in how those APIs are designed. The earlier you participate in API design conversations, the fewer surprises you deal with in production.

---

## Conclusion

The patterns in this article give you a structured starting point, but the underlying principle is consistent across all of them:

Key takeaways:

1. **Own the aggregation layer:** A BFF gives the frontend team control over response shapes and lets you handle partial failures at the server level instead of the browser.
2. **Classify every data source as critical or non-critical:** This single decision determines your error handling, timeout budgets, and loading strategies for every section of every page.
3. **Normalize at the boundary:** Adapter layers between raw service responses and your components protect you from upstream API changes and give you a consistent domain model.
4. **Invest in contracts:** Machine-readable API contracts, generated types, and contract testing catch breaking changes at build time instead of in production.
5. **Push back when needed:** Not every microservice problem has a frontend solution. If the architecture creates an unreasonable burden on the UI layer, say so early.

Microservices are a backend architecture decision, but their consequences are felt most acutely in the frontend. The patterns in this article won't make that complexity disappear, but they will give you a structured way to manage it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Navigate Microservices as a Frontend Engineer",
  "desc": "Most frontend engineers don't choose microservices. They inherit them. One day you're fetching data from a single API, and the next you're stitching together responses from five services, each with it",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-navigate-microservices-as-a-frontend-engineer.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
