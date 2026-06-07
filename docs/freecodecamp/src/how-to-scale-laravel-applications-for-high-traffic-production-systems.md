---
lang: en-US
title: "How to Scale Laravel Applications for High-Traffic Production Systems"
description: "Article(s) > How to Scale Laravel Applications for High-Traffic Production Systems"
icon: fa-brands fa-laravel
category:
  - PHP
  - Laravel
  - Data Science
  - MySQL
  - Redis
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - php
  - laravel
  - php-laravel
  - data-science
  - sql
  - mysql
  - redis
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Scale Laravel Applications for High-Traffic Production Systems"
    - property: og:description
      content: "How to Scale Laravel Applications for High-Traffic Production Systems"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-scale-laravel-applications-for-high-traffic-production-systems.html
prev: /programming/php-laravel/articles/README.md
date: 2026-06-12
isOriginal: false
author:
  - name: Olamilekan Lamidi
    url: https://freecodecamp.org/news/author/olamilekanlamidi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8882176c-0420-4fc9-8d72-129640aac231.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Laravel > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php-laravel/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MySQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mysql/articles/README.md",
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
  name="How to Scale Laravel Applications for High-Traffic Production Systems"
  desc="Your first scaling problem rarely arrives with a bang. For a while, everything is fine: pages load fast, the database barely breaks a sweat, and the team ships features without thinking much about inf"
  url="https://freecodecamp.org/news/how-to-scale-laravel-applications-for-high-traffic-production-systems"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8882176c-0420-4fc9-8d72-129640aac231.png"/>

Your first scaling problem rarely arrives with a bang. For a while, everything is fine: pages load fast, the database barely breaks a sweat, and the team ships features without thinking much about infrastructure.

Then traffic climbs. A campaign over-performs. A marketplace onboards a popular seller. A SaaS product signs a couple of enterprise accounts.

Suddenly, `/dashboard` takes two seconds instead of 300 milliseconds. Queue jobs that used to clear in seconds sit waiting for minutes. You have database CPU spikes every afternoon.

So you add another app server, and response time barely moves because the real culprit was a slow query on a large table all along.

If you have run Laravel in production, you've probably lived some version of this. The good news is that scaling Laravel almost never means abandoning the framework. It means learning where pressure builds and making the application behave predictably under load.

In this guide, you'll learn how to find common bottlenecks, tune the database, use Redis effectively, move slow work onto queues, optimize APIs, and monitor a Laravel application in production.

None of this requires a single heroic rewrite. The biggest wins usually come from practical work: removing inefficient queries, pushing slow tasks onto queues, adding the right indexes, caching carefully chosen data, and measuring whether each change actually helped.

::: note Prerequisites

You'll get the most out of this guide if you're already comfortable with:

- Building applications with Laravel and PHP
- Writing Eloquent queries and database migrations
- Using queues, jobs, and scheduled commands
- Reading a basic database query plan
- Deploying Laravel to a production server or platform
- Working with Redis and either MySQL or PostgreSQL in a production-like setup

:::

---

## What Happens When Laravel Apps Start Growing

Traffic changes a system's behavior because it turns small inefficiencies into permanent costs. A query that takes 80 milliseconds is harmless when it runs a few hundred times an hour. Run it 30 times per page view on a page that gets thousands of hits a minute, and that same query becomes a capacity problem.

The pressure tends to show up in predictable places. More requests mean more PHP workers, more database connections, more queue volume, and more Redis operations.

The database, whether MySQL or PostgreSQL, is usually the first thing to buckle. Queues back up when work is created faster than workers can drain it. Caches only help when hit rates stay high and misses stay controlled. And scaling everything horizontally can turn sloppy code into an expensive cloud bill.

That's why scaling work has to start with measurement, not guesswork. Before you change anything, you want to know what is actually saturated: request CPU, database I/O, lock contention, Redis latency, queue depth, an external API, or oversized payloads.

A typical request in a growing Laravel app travels through several layers. The user sends a request, a load balancer routes it to an app server, and Laravel checks Redis for a cached result. On a miss, it queries the database, stores the computed result back in Redis, and hands any slow follow-up work to a queue. A worker picks up that job later while Laravel returns the response right away.

Here's the important part: adding more app servers does nothing for a slow query, a missing index, or an overloaded queue. Horizontal scaling only pays off once the shared dependencies behind those servers can keep up.

---

## Common Laravel Bottlenecks

Laravel itself causes very few scaling problems. Most issues come from how application code talks to the database, the network, and background workers.

### N+1 Queries

The classic offender is the N+1 query. You load a list of models, then lazily touch a relationship on each one:

```php
use App\Models\Post;

$posts = Post::latest()->take(50)->get();

foreach (\(posts as \)post) {
    echo $post->author->name;
}
```

That's one query for the posts plus one query per author: 51 queries for a single page. Eager load the relationship instead:

```php
use App\Models\Post;

$posts = Post::with('author')
    ->latest()
    ->take(50)
    ->get();

foreach (\(posts as \)post) {
    echo $post->author->name;
}
```

In production, these are sneaky. They often hide inside API Resources, Blade components, and authorization checks, where the relationship access isn't obvious from the controller.

### Missing Indexes

Adding an index is one of the highest-return fixes you can make. Take a query like this:

```php
\(orders = Order::where('account_id', \)accountId)
    ->where('status', 'paid')
    ->whereBetween('created_at', [\(start, \)end])
    ->latest()
    ->paginate(50);
```

If `orders` has millions of rows and no useful compound index, the database scans far more rows than it needs to. Add an index that matches how you actually query:

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->index(['account_id', 'status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['account_id', 'status', 'created_at']);
        });
    }
};
```

Indexes aren't free, though. They take up space and slow down writes. Add them for real, repeated query patterns, not for every column that ever appears in a `where` clause.

### Inefficient Eager Loading

You can also swing too far the other way. Loading every relationship "just in case" burns memory and ships data the request never uses:

```php
$users = User::with([
    'profile',
    'teams',
    'roles.permissions',
    'invoices.lineItems.product',
])->get();
```

That might be fine for an admin detail page showing one user. On a list page, it's a liability. Constrain the eager loads and select only the columns you need:

```php
$users = User::query()
    ->select(['id', 'name', 'email'])
    ->with([
        'profile:id,user_id,avatar_url',
        'teams:id,name',
    ])
    ->latest()
    ->paginate(25);
```

One caveat: tightly scoped select lists can break later code that expects a column you didn't load. Keep this technique close to read-heavy endpoints where the payoff is obvious.

### Synchronous Processing

High-traffic apps need short web requests. Sending email, generating PDFs, calling third-party APIs, resizing images, and building exports usually belong outside the request cycle. This version can hurt you:

```php
public function store(Request $request)
{
    \(order = Order::create(\)request->validated());

    Mail::to(\(order->user)->send(new OrderReceipt(\)order));

    return response()->json($order, 201);
}
```

Push the work onto a queue instead:

```php
public function store(StoreOrderRequest $request)
{
    \(order = Order::create(\)request->validated());

    SendOrderReceipt::dispatch($order->id);

    return response()->json([
        'id' => $order->id,
        'status' => 'accepted',
    ], 202);
}
```

Now your response time no longer depends on your mail provider. If the provider has a slow afternoon, the queue absorbs it and your users don't have to wait.

### Large Payloads

Oversized JSON responses hurt everyone in the chain: the app server serializing them, the network carrying them, and the client parsing them. A frequent mistake is returning whole models when you meant to return a summary:

```php
return User::with('orders', 'invoices', 'teams')->findOrFail($id);
```

Define an explicit API Resource instead:

```php
use Illuminate\Http\Resources\Json\JsonResource;

class UserSummaryResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'avatar_url' => $this->profile?->avatar_url,
            'plan' => $this->subscription_plan,
        ];
    }
}
```

A small, deliberate response contract keeps endpoint cost easy to reason about and prevents accidental coupling.

### Expensive Joins

Joins are useful, but expensive joins across large tables can dominate your database time, especially when they sort or filter on columns that aren't indexed:

```php
$rows = DB::table('orders')
    ->join('users', 'users.id', '=', 'orders.user_id')
    ->join('accounts', 'accounts.id', '=', 'users.account_id')
    ->where('accounts.region', 'us-east')
    ->where('orders.status', 'paid')
    ->orderByDesc('orders.created_at')
    ->limit(100)
    ->get();
```

At scale, you may need to denormalize a small field, precompute a reporting table, or move analytics off the primary transactional database entirely. Do not treat denormalization as an admission of defeat. Copying a stable field like `account_id` onto `orders` can remove a costly join from a hot path. The price you pay is keeping that duplicated data consistent, which can be a worthwhile trade-off.

---

## How to Optimize the Database

When a Laravel app slows down, the database is usually the first place to look.

### Add Indexes Around Real Query Patterns

Start with your slow query log, database metrics, and traces rather than intuition. If the app constantly looks up active subscriptions by account, build a compound index that matches that access pattern:

```php
Schema::table('subscriptions', function (Blueprint $table) {
    $table->index(['account_id', 'status', 'renews_at']);
});
```

Then write the query so it can actually use the index:

```php
\(subscription = Subscription::where('account_id', \)accountId)
    ->where('status', 'active')
    ->where('renews_at', '>=', now())
    ->orderBy('renews_at')
    ->first();
```

Get in the habit of running `EXPLAIN` after you add an index to confirm that the plan changed. An index the optimizer ignores is just write overhead.

### Use Eager Loading Deliberately

Match eager loading to what the endpoint actually returns. For list endpoints, keep relationships shallow and constrained:

```php
$projects = Project::query()
    ->select(['id', 'account_id', 'name', 'updated_at'])
    ->withCount('openTasks')
    ->with([
        'owner:id,name',
    ])
    ->where('account_id', $accountId)
    ->latest('updated_at')
    ->paginate(30);
```

When you only need a number, `withCount` beats loading a whole relationship to count it:

```php
$teams = Team::query()
    ->withCount([
        'members',
        'invitations as pending_invitations_count' => fn (\(query) => \)query->whereNull('accepted_at'),
    ])
    ->paginate(25);
```

Your memory footprint stays flat, which matters much more on a list page than on a detail page.

### Optimize Queries Before Adding Hardware

A bigger database instance buys you time. It also hides the inefficient queries that put you there until the next traffic jump exposes them again. Before you reach for a larger machine, find your highest-cost queries. In local or staging environments, logging slow ones is easy:

```php
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

DB::listen(function (QueryExecuted $query) {
    if ($query->time > 100) {
        Log::warning('Slow query detected', [
            'sql' => $query->toRawSql(),
            'time_ms' => $query->time,
        ]);
    }
});
```

Be careful doing this in production. Bindings can contain sensitive data, and verbose logging at high volume can become its own performance problem.

### Process Large Tables with Chunking

Never pull an entire large table into memory for a batch job:

```php
User::where('is_active', true)
    ->chunkById(1000, function ($users) {
        foreach (\(users as \)user) {
            RefreshUserSearchIndex::dispatch($user->id);
        }
    });
```

`chunkById` is safer than offset-based chunking when rows can change while the job runs, because it tracks the last seen ID instead of a numeric offset. For very large exports, stream the records or write them out in batches.

### Use Cursor Pagination for High-Volume Feeds

Offset pagination gets slower the deeper a user scrolls, because the database still has to skip every row it's not returning. For feeds, audit logs, messages, and timelines, cursor pagination is usually the better fit:

```php
$events = AuditEvent::query()
    ->where('account_id', $accountId)
    ->orderByDesc('id')
    ->cursorPaginate(50);

return AuditEventResource::collection($events);
```

It relies on a stable, indexed ordering column and uses next/previous cursors rather than arbitrary page numbers, which is what an infinite-scroll feed usually needs.

### Split Reads with Read Replicas

As read traffic grows, replicas can take load off the primary:

```php
'mysql' => [
    'driver' => 'mysql',
    'read' => [
        'host' => [
            env('DB_READ_HOST', '127.0.0.1'),
        ],
    ],
    'write' => [
        'host' => [
            env('DB_WRITE_HOST', '127.0.0.1'),
        ],
    ],
    'sticky' => true,
    'database' => env('DB_DATABASE', 'laravel'),
    'username' => env('DB_USERNAME', 'root'),
    'password' => env('DB_PASSWORD', ''),
],
```

The `sticky` option keeps reads on the write connection after a write within the same request, which helps avoid some read-after-write surprises.

Replicas come with replication lag, and that lag matters. Don't route payment confirmations, password changes, permission checks, or anything else consistency-sensitive to a replica that might be a few seconds stale unless the business flow can genuinely tolerate seeing old data.

---

## How to Scale with Redis

Redis often does a lot in a Laravel production stack: caching, sessions, rate limiting, queues, locks, and Horizon metrics. It's fast, but it still needs thought: sensible key design, expiration policies, memory monitoring, and a real plan for invalidation.

### Caching

Cache expensive reads that get requested often and can tolerate being slightly out of date:

```php
use Illuminate\Support\Facades\Cache;

$stats = Cache::remember(
    "accounts:{$account->id}:dashboard-stats",
    now()->addMinutes(5),
    fn () => DashboardStats::forAccount($account)->calculate()
);
```

Short time-to-live values go a surprisingly long way. A five-minute cache can wipe out thousands of duplicate queries while keeping the data fresh enough for most dashboards.

When the data changes after a known event, invalidate it explicitly:

```php
Order::created(function (Order $order) {
    Cache::forget("accounts:{$order->account_id}:dashboard-stats");
});
```

Caching works best when your keys are predictable and your invalidation is tied to domain events rather than guesswork.

### Sessions

For horizontally scaled app servers, file-based sessions are a trap: the next request can land on a different server that has never seen the session. Store sessions in Redis or a database so any server can handle any request:

```sh title=".env"
SESSION_DRIVER=redis
CACHE_STORE=redis
QUEUE_CONNECTION=redis
```

### Rate Limiting

Rate limits protect you from abusive clients, runaway loops, and endpoints that get hammered:

```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(120)->by(
        optional(\(request->user())->id ?: \)request->ip()
    );
});
```

Expensive endpoints deserve stricter limits:

```php
RateLimiter::for('exports', function (Request $request) {
    return Limit::perHour(10)->by($request->user()->id);
});
```

Let business cost drive the numbers. Login, search, export, and webhook endpoints rarely need the same limit.

### Queues

Redis is a common queue backend because it's quick and Horizon supports it well:

```env
QUEUE_CONNECTION=redis
```

Dispatch work onto named queues from the request:

```php
GenerateInvoicePdf::dispatch($invoice->id)
    ->onQueue('documents');
```

Split work by profile, such as `default`, `emails`, `webhooks`, `documents`, and `imports`, because each workload can need different worker counts and retry rules. Keep the names meaningful. During an incident, "the documents queue is 20 minutes behind" tells you far more than "default is slow."

---

## How to Use Queue-Driven Architectures

Queues are one of Laravel's best scaling tools. They let the app accept work quickly and process it asynchronously with controlled concurrency. They also make the system more resilient: when a third-party API goes down, jobs retry on their own instead of tying up your PHP-FPM request workers.

### Laravel Queues

A good job is small, idempotent, and safe to retry:

```php
use App\Mail\OrderReceiptMail;
use App\Models\Order;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendOrderReceipt implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;
    public int $backoff = 60;

    public function __construct(public int $orderId)
    {
    }

    public function handle(): void
    {
        \(order = Order::with('user')->findOrFail(\)this->orderId);

        Mail::to(\(order->user)->send(new OrderReceiptMail(\)order));
    }
}
```

Pass IDs into jobs rather than full Eloquent models. The model might change before the job runs, and serializing a whole model bloats the payload. For external APIs, add timeouts and guard against duplicate work:

```php :collapsed-lines
use App\Models\Order;
use App\Services\CrmClient;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SyncOrderToCrm implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;
    public int $backoff = 60;

    public function __construct(public int $orderId)
    {
    }

    public function handle(CrmClient $crm): void
    {
        \(order = Order::findOrFail(\)this->orderId);

        if ($order->crm_synced_at) {
            return;
        }

        \(crm->upsertOrder(\)order->external_reference, [
            'total' => $order->total,
            'status' => $order->status,
        ]);

        $order->forceFill(['crm_synced_at' => now()])->save();
    }
}
```

The `crm_synced_at` check is the whole point. Jobs run more than once in real life, and idempotency is what keeps a retry from double-charging or double-syncing.

### Horizon

Horizon gives you visibility and control over Redis queues. A typical setup runs different supervisors for different workloads:

```php
'production' => [
    'supervisor-default' => [
        'connection' => 'redis',
        'queue' => ['default', 'emails'],
        'balance' => 'auto',
        'maxProcesses' => 20,
        'tries' => 3,
    ],

    'supervisor-documents' => [
        'connection' => 'redis',
        'queue' => ['documents'],
        'balance' => 'simple',
        'maxProcesses' => 5,
        'tries' => 2,
        'timeout' => 300,
    ],
],
```

The separation matters: a long-running document job shouldn't starve a quick password-reset email.

### Failed Jobs and Retries

Retries only help when failures are temporary. Retrying a job that's permanently broken just burns capacity. For jobs with a business deadline, use `retryUntil`:

```php
use DateTime;
use Throwable;

public function retryUntil(): DateTime
{
    return now()->addMinutes(30);
}

public function failed(Throwable $exception): void
{
    ImportBatch::whereKey($this->batchId)->update([
        'status' => 'failed',
        'failed_reason' => $exception->getMessage(),
    ]);
}
```

Use `failed` to flag the problem somewhere a human will see it. Whatever you do, don't set unlimited retries on jobs that hit a third-party service.

### Queue Monitoring

Track queue depth, wait time, failure rate, and processing time together. Depth alone can mislead you. When depth starts climbing, walk through it methodically: are workers keeping pace with incoming jobs? If the queue keeps growing, check how long individual jobs take. If the slow part is the database, fix the query or dial back worker concurrency. If it's an external API, add backoff or a circuit breaker. If the work is CPU-bound, scale workers or break the jobs into smaller pieces.

Be careful with the "scale workers" instinct, though. Adding more workers without checking the database first can make an incident worse. More workers mean more concurrent queries, more locks, and more pressure on the primary exactly when it's already struggling.

---

## How to Optimize API Performance

APIs earn special attention because clients call them repeatedly and payloads tend to grow quietly over months.

### API Resources

Resources keep your response shape intentional:

```php
class OrderResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'total' => $this->total,
            'placed_at' => $this->created_at->toIso8601String(),
            'customer' => new CustomerSummaryResource($this->whenLoaded('customer')),
        ];
    }
}
```

`whenLoaded` is doing real work here. It stops the resource from quietly triggering a lazy query when the relationship wasn't eager loaded:

```php
$orders = Order::query()
    ->with('customer:id,name')
    ->where('account_id', $accountId)
    ->latest()
    ->paginate(50);

return OrderResource::collection($orders);
```

### Pagination

Returning unbounded collections is an easy way to create an API performance problem you won't notice until a client has a lot of data:

```php
$perPage = min((int) request('per_page', 50), 100);

\(orders = Order::where('account_id', \)accountId)
    ->latest()
    ->paginate($perPage);
```

Cap the page size. If a client genuinely needs every record for an export, make that an async job rather than a giant synchronous response.

### Response Optimization

Stop returning fields nobody reads. On read-heavy endpoints, selecting only the columns you need cuts both database I/O and serialization cost:

```php
$products = Product::query()
    ->select(['id', 'name', 'slug', 'price', 'thumbnail_url'])
    ->where('is_visible', true)
    ->orderBy('name')
    ->paginate(40);
```

It's also worth turning on compression at the web server or load balancer. JSON compresses extremely well, and that's often a small config change with a real bandwidth payoff.

### Rate Limiting

Design API rate limits around identity and endpoint cost:

```php
Route::middleware(['auth:sanctum', 'throttle:api'])
    ->group(function () {
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/exports/orders', [OrderExportController::class, 'store'])
            ->middleware('throttle:exports');
    });
```

This keeps casual browsing and expensive exports under separate policies, so one heavy user can't squeeze out everyone else.

### Caching API Responses

Cache responses that are expensive to compute and can tolerate being a little stale:

```php
public function index(Request $request)
{
    \(accountId = \)request->user()->account_id;
    \(page = \)request->integer('page', 1);

    \(cacheKey = "api:accounts:{\)accountId}:orders:v1:page:{$page}";

    return Cache::remember(\(cacheKey, now()->addSeconds(60), function () use (\)accountId) {
        return OrderResource::collection(
            Order::with('customer:id,name')
                ->where('account_id', $accountId)
                ->latest()
                ->paginate(50)
        )->response()->getData(true);
    });
}
```

Notice the `v1` in the key. Bumping that version number lets you invalidate an entire response format at once when the shape changes. Always scope the key to the tenant or user for anything that's not truly global.

---

## How to Monitor Laravel in Production

The teams that catch problems before customers do are the ones collecting signals from everywhere: Laravel, queues, the database, Redis, the infrastructure, and external services.

Laravel gives you several good starting points. Horizon shows queue throughput, failed jobs, wait times, and worker balancing. Telescope surfaces request details, queries, exceptions, jobs, mail, and cache events. Your logs capture slow operations, unexpected retries, and external failures. Your metrics track latency, error rate, queue depth, job runtime, database CPU, lock waits, cache hit ratio, and Redis memory. Your alerting ties all of it back to something a customer would actually feel.

That last part is where teams often make mistakes. The best alerts are about symptoms, not machines being busy: p95 API latency over 800ms for 10 minutes, checkout error rate above 1%, the emails queue waiting more than 5 minutes, database CPU over 85% with slow queries rising, Redis memory over 80%, or failed payment webhooks crossing a threshold.

A useful mental model is this: logs tell you what happened, metrics tell you whether the system is healthy, and traces tell you where the time went. In practice, wrapping your expensive business operations in a bit of instrumentation pays off quickly:

```php
use Illuminate\Support\Facades\Log;

$startedAt = microtime(true);

\(report = \)builder->forAccount($account)->build();

Log::info('Billing report generated', [
    'account_id' => $account->id,
    'duration_ms' => (int) ((microtime(true) - $startedAt) * 1000),
    'invoice_count' => $report->invoiceCount(),
]);
```

When something is failing at 2am, a log line like that can tell you which account, import, or report is causing the pressure.

One more thing worth internalizing: monitor wait time, not just throughput. A queue can process thousands of jobs a minute and still be unhealthy if important jobs sit waiting too long before they start. Users feel the wait, not the throughput.

---

## An Example High-Traffic Laravel Architecture

A high-traffic Laravel setup generally separates four things: stateless web requests, shared cache and session storage, asynchronous workers, and database roles.

Users hit a load balancer, which spreads traffic across a fleet of stateless Laravel app servers. Those servers use Redis for cache, sessions, rate limits, queues, and Horizon data. Queue workers handle slow or unreliable work off to the side. A MySQL primary takes all writes and any consistency-sensitive reads, while a read replica absorbs read-heavy endpoints that can tolerate some replication lag.

The flow looks like this:

```text
Users
  -> Load balancer
  -> Stateless Laravel app servers
  -> Redis for cache, sessions, rate limits, queues, and Horizon data
  -> Primary database for writes and consistency-sensitive reads
  -> Read replica for safe read-heavy endpoints

Redis queue
  -> Queue workers
  -> Database, external APIs, mail providers, object storage, and other services
```

This isn't the only valid shape. PostgreSQL can stand in for MySQL, Amazon SQS can replace Redis queues, a CDN can serve static assets and cache public responses, and object storage should hold user uploads. The principle that matters is that each layer has one clear job and can be scaled or tuned on its own.

The flip side of stateless app servers is that anything a user needs after the request ends has to live in shared storage. Uploads, generated files, and session state shouldn't sit on a single server's local disk, or they may disappear from the user's point of view when the load balancer sends the next request somewhere else.

---

## Lessons Learned the Hard Way

### 1. Premature Optimization

This usually shows up as elaborate infrastructure built before the app has any real visibility into itself.

The practical path works better: measure, rank the bottlenecks, fix the biggest one, repeat. For most Laravel apps, the first round of scaling is mostly indexes, N+1 fixes, queue separation, and trimming payloads.

### 2. Over-caching

Caching can make a system faster and harder to reason about at the same time. One team cached an account-settings response for 30 minutes, then later folded role changes into that same response. The result was that users who had just lost access could still see features until the cache expired.

The fix was splitting stable account metadata away from permission-sensitive state. The lesson is to avoid caching authorization data unless you have thought carefully about invalidation.

### 3. Missing Indexes

These hide until a table crosses a size threshold. A query that scanned 20,000 rows in development can scan 20 million in production. Bake index review into feature work, and plan big index migrations carefully so they don't lock a hot table at the worst possible time.

### 4. Queue Overload

Queues don't remove work, they move it. The classic failure is letting one noisy workload block everything else. A big CSV import floods the default queue, and password-reset emails get stuck behind it. Separate queues are cheap insurance against that entire class of incident.

### 5. Large Transactions

Long transactions hold locks longer and make failures more expensive. Dispatching a job inside a transaction is especially risky because a worker can grab it before the transaction commits:

```php
DB::transaction(function () use ($request) {
    $order = Order::create([...]);
    \(order->items()->createMany(\)request->items);

    GenerateInvoicePdf::dispatch($order->id);
    SyncOrderToCrm::dispatch($order->id);
});
```

Use after-commit dispatching for any job that depends on committed data:

```php
GenerateInvoicePdf::dispatch($order->id)->afterCommit();
SyncOrderToCrm::dispatch($order->id)->afterCommit();
```

Keep transactions scoped to the data that genuinely has to change atomically, and nothing more.

### 6. Treating Symptoms as Causes

This is the expensive one. If latency is high because an endpoint runs 300 queries, adding app servers adds database pressure. If jobs are slow because an external API is rate-limiting you, adding workers multiplies the failures.

Good scaling work keeps asking the same questions: What resource is saturated? Which endpoint, job, tenant, or query is causing it? Is this work necessary during the request? Can I reduce it, defer it, cache it, or isolate it? How will I know whether the change helped?

---

## A Pre-Launch Scaling Checklist

Run through this before a big launch, a traffic campaign, or an enterprise rollout.

**Application and runtime:** Cache config, routes, and views during deploy. Set `APP_DEBUG=false`. Turn on OPcache. Keep web requests short and move slow work to queues. Store uploads in object storage, not on app-server disk. Keep servers stateless. Set timeouts on every external HTTP call.

**Database:** Review slow query logs first. Add indexes for your high-volume filters, joins, and ordering. Hunt for N+1 queries in controllers, resources, policies, and views. Paginate every list endpoint. Use `chunkById` or cursors for batch work. Avoid long transactions and external calls inside transactions. Confirm your backup and restore process works. Test stale-read behavior if you use replicas.

**Redis and cache:** Use Redis for cache, sessions, rate limiting, and queues where it fits. Set TTLs unless you have a clear reason not to. Include tenant, user, locale, and version in keys when relevant. Watch memory and the eviction policy. Avoid caching permission-sensitive responses without careful invalidation. Guard against cache stampedes on expensive recomputation.

**Queues:** Separate queues by workload. Configure Horizon supervisors per queue. Set timeouts, retries, and backoff on purpose. Make jobs idempotent where you can. Use `afterCommit` for jobs that depend on committed data. Monitor wait time, runtime, failures, and retries. Review failed jobs instead of ignoring them.

**APIs:** Use Resources to control response shape. Cap `per_page`. Use cursor pagination for big feeds and logs. Cache expensive reads with safe, versioned keys and short TTLs. Apply rate limits by endpoint cost. Don't return raw Eloquent models. Compress responses at the edge.

**Observability:** Track p50, p95, and p99 latency on the endpoints that matter. Track error rates by route and job class. Alert on queue wait time, not just size. Watch database CPU, connections, slow queries, and lock waits. Watch Redis memory, latency, and evictions. Log important business operations with durations and identifiers. Test your alerts before launch night because a silent alert is worse than no alert.

---

## Conclusion

Laravel runs high-traffic production systems well when you design around the real costs of data, concurrency, and external dependencies. Just make sure you measure before you optimize, because guessing wastes time and tends to complicate the wrong layer.

Fix the database first: indexes, query shape, pagination, and eager loading usually deliver the biggest early wins. Lean on queues to keep requests fast and push slow work into controlled background workers. Cache deliberately, with clear keys, sane TTLs, and a plan for invalidation. Keep watching latency, errors, queue wait time, database health, Redis memory, and your external dependencies.

The best scaling work is practical and repeatable. You study the system you actually have, remove waste, isolate slow parts, and give yourself enough visibility to make the next change with confidence. Do that on a loop, and you rarely need the big rewrite.

::: info References

<SiteInfo
  name="Eloquent: Relationships | Laravel 13.x - The clean stack for Artisans and agents"
  desc="Laravel is a PHP web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things."
  url="https://laravel.com/docs/13.x/eloquent-relationships/"
  logo="https://laravel.com/img/favicon/favicon.ico"
  preview="https://laravel.com/images/og/laravel-home.png"/>

<SiteInfo
  name="Database: Query Builder | Laravel 13.x - The clean stack for Artisans and agents"
  desc="Laravel is a PHP web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things."
  url="https://laravel.com/docs/13.x/queries/"
  logo="https://laravel.com/img/favicon/favicon.ico"
  preview="https://laravel.com/images/og/laravel-home.png"/>

<SiteInfo
  name="Cache | Laravel 13.x - The clean stack for Artisans and agents"
  desc="Laravel is a PHP web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things."
  url="https://laravel.com/docs/13.x/cache/"
  logo="/img/favicon/favicon.ico"
  preview="https://laravel.com/images/og/laravel-home.png"/>

<SiteInfo
  name="Queues | Laravel 13.x - The clean stack for Artisans and agents"
  desc="Laravel is a PHP web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things."
  url="https://laravel.com/docs/13.x/queues/"
  logo="/img/favicon/favicon.ico"
  preview="https://laravel.com/images/og/laravel-home.png"/>

<SiteInfo
  name="Redis | Laravel 13.x - The clean stack for Artisans and agents"
  desc="Laravel is a PHP web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things."
  url="https://laravel.com/docs/13.x/redis/"
  logo="https://laravel.com/img/favicon/favicon.ico"
  preview="https://laravel.com/images/og/laravel-home.png"/>

<SiteInfo
  name="Routing | Laravel 13.x - The clean stack for Artisans and agents"
  desc="Laravel is a PHP web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things."
  url="https://laravel.com/docs/13.x/routing/"
  logo="/img/favicon/favicon.ico"
  preview="https://laravel.com/images/og/laravel-home.png"/>

<SiteInfo
  name="Eloquent: API Resources | Laravel 13.x - The clean stack for Artisans and agents"
  desc="Laravel is a PHP web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things."
  url="https://laravel.com/docs/13.x/eloquent-resources/"
  logo="https://laravel.com/img/favicon/favicon.ico"
  preview="https://laravel.com/images/og/laravel-home.png"/>

<SiteInfo
  name="Laravel Horizon | Laravel 13.x - The clean stack for Artisans and agents"
  desc="Laravel is a PHP web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things."
  url="https://laravel.com/docs/13.x/horizon/"
  logo="https://laravel.com/img/favicon/favicon.ico"
  preview="https://laravel.com/images/og/laravel-home.png"/>

<SiteInfo
  name="Laravel Telescope | Laravel 13.x - The clean stack for Artisans and agents"
  desc="Laravel is a PHP web application framework with expressive, elegant syntax. We've already laid the foundation — freeing you to create without sweating the small things."
  url="https://laravel.com/docs/13.x/telescope/"
  logo="https://laravel.com/img/favicon/favicon.ico"
  preview="https://laravel.com/images/og/laravel-home.png"/>

```component VPCard
{
  "title": "MySQL :: MySQL 8.4 Reference Manual :: 10 Optimization",
  "desc": "This chapter explains how to optimize MySQL performance and provides examples. Optimization involves configuring, tuning, and measuring performance, at several levels. Depending on your job role (developer, DBA, or a combination of both), you might optimize at the level of individual SQL...",
  "link": "https://dev.mysql.com/doc/refman/8.4/en/optimization.html/",
  "logo": "https://labs.mysql.com/common/themes/sakila/favicon.ico",
  "background": "rgba(62,120,166,0.2)"
}
```

```component VPCard
{
  "title": "Docs",
  "desc": "Quickly set up a Redis cache, primary, vector or custom database",
  "link": "https://redis.io/docs/latest//",
  "logo": "https://redis.io/docs/latest/images/favicons/favicon-128.png",
  "background": "rgba(255,68,56,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Scale Laravel Applications for High-Traffic Production Systems",
  "desc": "Your first scaling problem rarely arrives with a bang. For a while, everything is fine: pages load fast, the database barely breaks a sweat, and the team ships features without thinking much about inf",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-scale-laravel-applications-for-high-traffic-production-systems.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
