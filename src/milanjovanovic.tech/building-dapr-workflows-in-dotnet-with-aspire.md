---
lang: en-US
title: "Building Dapr Workflows in .NET With Aspire"
description: "Article(s) > Building Dapr Workflows in .NET With Aspire"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building Dapr Workflows in .NET With Aspire"
    - property: og:description
      content: "Building Dapr Workflows in .NET With Aspire"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/building-dapr-workflows-in-dotnet-with-aspire.html
prev: /programming/cs/articles/README.md
date: 2026-06-13
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_198.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building Dapr Workflows in .NET With Aspire"
  desc="Long-running business processes are hard to get right. Dapr Workflow lets you write them as plain C# code that survives crashes and restarts, and Aspire makes the whole thing run with a single command. Here's how to wire the two together."
  url="https://milanjovanovic.tech/blog/building-dapr-workflows-in-dotnet-with-aspire"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_198.png"/>

Most real business processes don't finish in a single request.

An order gets placed, inventory gets checked, a payment gets charged, stock gets reserved, and the customer gets notified. Each step can fail, time out, or need a retry. And the whole thing has to survive a process restart without losing its place or charging someone twice.

We usually solve this with a pile of queues, a state table, and a lot of defensive code to track where each process is. It works, but the business logic ends up scattered across handlers and database rows, and nobody can read the flow top to bottom anymore.

[**Dapr**](introduction-to-dapr-for-dotnet-developers.md) (a graduated [<VPIcon icon="fas fa-globe"/>CNCF](https://cncf.io/) project) has a building block for exactly this: **Workflow**. You write the process as ordinary C# code, and Dapr makes it durable. If the host crashes halfway through, the workflow picks up right where it left off.

In this article, we'll build a small Dapr Workflow, run it with [**.NET Aspire**](dotnet-aspire-a-game-changer-for-cloud-native-development.md), and inspect its state with the [<VPIcon icon="fas fa-globe"/>Diagrid Dev Dashboard](https://docs.diagrid.io/develop/local-development/dev-dashboard/). If you'd rather learn this hands-on, there's also a free [<VPIcon icon="fas fa-globe"/>Dapr University track](https://diagrid.io/dapr-university/dapr-workflows-dotnet-aspire) built around this exact stack.

Let's dive in.

---

## What Dapr Workflow Actually Is

You define a **workflow** that orchestrates a process, and **activities** that do the actual work (call a database, hit an API, send an email). This is [**orchestration**](orchestration-vs-choreography.md) rather than choreography: one place drives the process instead of services reacting to each other's events.

The definitions live in your app; the **workflow engine** that executes them runs in the Dapr sidecar:

![Diagram of a workflow app containing workflow and activity definitions, communicating over the Dapr API (HTTP/gRPC) with the Dapr Workflow engine running in the sidecar.<br/>Source: [<VPIcon icon="fas fa-globe"/>Dapr - Workflows overview](https://docs.dapr.io/developing-applications/building-blocks/workflow/workflow-overview/)](https://milanjovanovic.tech/blogs/mnw_198/workflow-overview.png)

The key idea is **durable execution**. Dapr records every step to a state store, so the workflow can be replayed from history at any time. A crash, a deployment, or a scale-out event doesn't lose progress, and a workflow can run for seconds or for months.

One rule follows from this: **workflow code must be deterministic**. No `DateTime.Now`, no random values, no I/O - anything non-deterministic goes into an *activity*. Even logging is affected: use `context.CreateReplaySafeLogger<T>()` inside a workflow, or every replay will repeat your log lines.

Under the hood, this all runs on Dapr actors, which is why the state store must support actors. More on that in a moment.

---

## Building the Workflow

The quickest starting point is the [<VPIcon icon="fas fa-globe"/>Aspire CLI's](https://aspire.dev/) starter template:

```sh
aspire new aspire-starter -n OrderProcessing
```

It generates the app host, an API service, and a `ServiceDefaults` project that wires up OpenTelemetry and health checks (that's where the `AddServiceDefaults` call comes from later). If you're on Claude Code, the [Dapr Skills (<VPIcon icon="iconfont icon-github"/>`diagrid-labs/dapr-skills`)](https://github.com/diagrid-labs/dapr-skills) plugin can scaffold the entire workflow project from a prompt and review it for determinism mistakes. Everything we build here is also in a [working sample on my GitHub (<VPIcon icon="iconfont icon-github"/>`m-jovanovic/dapr-workflows-with-aspire`)](https://github.com/m-jovanovic/dapr-workflows-with-aspire), so you can clone it and follow along.

The API service needs the `Dapr.Workflow` package:

```xml
<PackageReference Include="Dapr.Workflow" Version="1.18.1" />
```

A workflow derives from `Workflow<TInput, TOutput>` and reads top to bottom like a normal method, even though every step is durably persisted:

```cs :collapsed-lines
using Dapr.Workflow;

namespace OrderApi.Workflows;

internal sealed class OrderProcessingWorkflow : Workflow<OrderPayload, OrderResult>
{
    public override async Task<OrderResult> RunAsync(
        WorkflowContext context,
        OrderPayload order)
    {
        // 1. Check inventory
        var inventory = await context.CallActivityAsync<InventoryResult>(
            nameof(CheckInventoryActivity),
            order);

        if (!inventory.InStock)
        {
            return new OrderResult(order.OrderId, "Rejected: out of stock");
        }

        // 2. Charge the customer
        await context.CallActivityAsync(
            nameof(ProcessPaymentActivity),
            new PaymentRequest(order.OrderId, order.TotalAmount));

        // 3. Reserve the stock
        await context.CallActivityAsync(
            nameof(UpdateInventoryActivity),
            order);

        // 4. Notify the customer
        await context.CallActivityAsync(
            nameof(NotifyCustomerActivity),
            order.CustomerId);

        return new OrderResult(order.OrderId, "Completed");
    }
}
```

`CallActivityAsync` doesn't invoke the activity directly. It schedules the work with the workflow engine, which records the result once the activity completes. If the process dies after the payment step, Dapr replays the workflow, feeds it the recorded results for completed steps, and resumes at the inventory update. The customer never gets charged twice.

This is the **task chaining** pattern. Dapr Workflow also supports fan-out/fan-in, external events, timers, and child workflows - all in plain C# (fan-out is just `Select` plus `Task.WhenAll`). If you want to build the richer patterns hands-on, the free [<VPIcon icon="fas fa-globe"/>Build Dapr Workflows in .NET with Aspire](https://diagrid.io/dapr-university/dapr-workflows-dotnet-aspire) track has you fan out to parallel activities and aggregate the results.

One production caveat: the recorded history is tied to the shape of your code, so changing a workflow while instances are in flight breaks their replay. That's solved with [<VPIcon icon="fas fa-globe"/>workflow versioning](https://diagrid.io/blog/how-to-version-net-workflows); we're staying on version one here.

An activity is where the real work happens, and the only place you're allowed to be non-deterministic. It derives from `WorkflowActivity<TInput, TOutput>` and supports constructor injection:

```cs
using Dapr.Workflow;

namespace OrderApi.Activities;

internal sealed class CheckInventoryActivity(IInventoryService inventory)
    : WorkflowActivity<OrderPayload, InventoryResult>
{
    public override async Task<InventoryResult> RunAsync(
        WorkflowActivityContext context,
        OrderPayload order)
    {
        bool inStock = await inventory.HasStockAsync(order.ProductId, order.Quantity);

        return new InventoryResult(inStock);
    }
}
```

The other activities follow the same shape: charge the card, decrement stock, send the confirmation email. Each one is isolated, so Dapr can retry a failed activity without re-running the whole workflow. And since every input and output gets serialized to the state store, simple JSON-friendly records are the right tool for these types.

---

## Starting Workflows Over HTTP

Register the workflow and its activities in the API service's `Program.cs`:

```cs
builder.Services.AddDaprWorkflow(options =>
{
    options.RegisterWorkflow<OrderProcessingWorkflow>();

    options.RegisterActivity<CheckInventoryActivity>();
    options.RegisterActivity<ProcessPaymentActivity>();
    options.RegisterActivity<UpdateInventoryActivity>();
    options.RegisterActivity<NotifyCustomerActivity>();
});
```

This also registers a `DaprWorkflowClient` we can use to start and query workflow instances:

```cs
app.MapPost("/orders", async (
    OrderPayload order,
    DaprWorkflowClient workflowClient) =>
{
    string instanceId = await workflowClient.ScheduleNewWorkflowAsync(
        name: nameof(OrderProcessingWorkflow),
        instanceId: order.OrderId,
        input: order);

    return Results.Accepted($"/orders/{instanceId}", new { instanceId });
});

app.MapGet("/orders/{instanceId}", async (
    string instanceId,
    DaprWorkflowClient workflowClient) =>
{
    WorkflowState? state = await workflowClient.GetWorkflowStateAsync(instanceId);

    if (state is null || !state.Exists)
    {
        return Results.NotFound();
    }

    return Results.Ok(new
    {
        RuntimeStatus = state.RuntimeStatus.ToString(),
        Output = state.ReadOutputAs<OrderResult>()
    });
});
```

`ScheduleNewWorkflowAsync` returns immediately and the workflow runs in the background. It's the same idea as [**scaling long-running API requests**](how-to-scale-long-running-api-requests.md): return `202 Accepted` and let the client poll for status. Two SDK quirks worth knowing: `GetWorkflowStateAsync` returns `null` for an instance it has never seen, and `RuntimeStatus` is an enum that serializes as a bare number without the `ToString()`.

---

## Running Everything With Aspire

Here's where Aspire earns its keep. A Dapr Workflow needs a sidecar and a state store running alongside the app, and Aspire orchestrates all of it from one place.

![Architecture diagram: Aspire locally manages the workflow app and the Dapr sidecar with its workflow engine, which reads and writes workflow state to a state store. The Diagrid Dev Dashboard connects to the same state store to visualize workflow executions.<br/>Source: [<VPIcon icon="fas fa-globe"/>Dapr University](https://diagrid.io/dapr-university/dapr-workflows-dotnet-aspire)](https://milanjovanovic.tech/blogs/mnw_198/workflow-app-aspire.png)

The app host needs two packages. The Dapr integration lives in the [**Aspire Community Toolkit**](https://learn.microsoft.com/en-us/dotnet/aspire/community-toolkit/overview) these days; the original `Aspire.Hosting.Dapr` package is deprecated.

```xml
<PackageReference Include="CommunityToolkit.Aspire.Hosting.Dapr" Version="13.0.0" />
<PackageReference Include="Aspire.Hosting.Valkey" Version="13.4.3" />
```

Then the app host:

```cs
using CommunityToolkit.Aspire.Hosting.Dapr;

var builder = DistributedApplication.CreateBuilder(args);

builder.AddDapr();

// Pin the password. Aspire generates a random one on every run otherwise,
// and the Dapr component file below has to know it.
var statePassword = builder.AddParameter(
    "statestore-password", "state-store-123", secret: true);

// Valkey (a Redis fork) as the workflow state store
var statestore = builder
    .AddValkey("statestore", 16379, statePassword)
    .WithDataVolume();

builder.AddProject<Projects.OrderApi>("order-api")
    .WithDaprSidecar(new DaprSidecarOptions
    {
        ResourcesPaths = ["./Resources"]
    })
    .WaitFor(statestore);

builder.Build().Run();
```

`WithDaprSidecar` runs a Dapr sidecar next to `order-api`, and `ResourcesPaths` points it at the Dapr component files (relative paths resolve against the app host directory).

The one component the workflow needs is a state store - a <VPIcon icon="iconfont icon-yaml"/>`statestore.yaml` in the app host's `Resources` folder:

```yaml title="statestore.yaml"
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: workflowstore
spec:
  type: state.redis
  version: v1
  metadata:
    - name: redisHost
      value: 'localhost:16379'
    - name: redisPassword
      value: 'state-store-123'
    - name: actorStateStore
      value: 'true'
```

That `actorStateStore: "true"` line is the one people forget. Dapr Workflow runs on top of actors, so without it, workflows won't run. Notice the application never sees any of this: swapping Valkey for Postgres means editing this YAML file, not your C# code.

Install the [<VPIcon icon="fas fa-globe"/>Dapr CLI](https://docs.dapr.io/getting-started/install-dapr-cli/) and run `dapr init` once (that's where the sidecar binary comes from), then start everything with a single command:

```sh
aspire run
```

Aspire spins up Valkey, the Dapr sidecar, and the API, with logs, traces, and health in one dashboard. Grab the API's port from there and post an order:

```sh
curl -X POST http://localhost:5555/orders \
-H "Content-Type: application/json" \
-d '{"orderId":"order-001","customerId":"cust-42","productId":"pro-plan","quantity":2,"totalAmount":49.99}'
```

Poll the status endpoint and you'll see the workflow march through its activities (if the first request returns a `500`, give the sidecar a few more seconds to connect to the placement service):

```sh
curl http://localhost:5555/orders/order-001
```

```json
{
  "runtimeStatus": "Completed",
  "output": {
    "orderId": "order-001",
    "status": "Completed"
  }
}
```

Each activity shows up as a span in the distributed trace:

![Aspire dashboard distributed trace for POST /orders, showing the workflow orchestration span and individual spans for the CheckInventory, ProcessPayment, UpdateInventory, and NotifyCustomer activities.](https://milanjovanovic.tech/blogs/mnw_198/aspire_distributed_trace_order_creation.png)

---

## Inspecting Workflow State Locally

The Aspire dashboard shows you the request flow, but not the *workflow's* internal state: which step it's on, what each activity returned, and the full execution history. For that, there's the [<VPIcon icon="fas fa-globe"/>Diagrid Dev Dashboard](https://docs.diagrid.io/develop/local-development/dev-dashboard/): a free, local-only tool that reads your workflow state store (Redis-compatible, Postgres, or SQLite) and visualizes every instance. It comes from Diagrid, the company founded by the creators of the Dapr OSS project, which also provides enterprise Dapr support.

Since the whole point of this setup is that one command starts everything, let's add it to the app host:

```cs
builder.AddContainer("diagrid-dashboard", "ghcr.io/diagridio/diagrid-dashboard:latest")
    .WithBindMount("./Resources", "/app/components")
    .WithEnvironment("COMPONENT_FILE", "/app/components/dashboard-store.yaml")
    .WithEnvironment("APP_ID", "diagrid-dashboard")
    .WithHttpEndpoint(targetPort: 8080)
    .WaitFor(statestore);
```

Why a second component file? Networking. The sidecar runs as a host process, so `localhost:16379` works for it. The dashboard runs in a container, where `localhost` means the container itself, so its <VPIcon icon="iconfont icon-yaml"/>`dashboard-store.yaml` reaches the host through `host.docker.internal` (on Linux without Docker Desktop, use the bridge gateway IP instead):

```yaml title="dashboard-store.yaml"
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: dashboardstore
spec:
  type: state.redis
  version: v1
  metadata:
    - name: redisHost
      value: 'host.docker.internal:16379'
    - name: redisPassword
      value: 'state-store-123'
    - name: actorStateStore
      value: 'true'
scopes:
  - diagrid-dashboard
```

The `scopes` field keeps the API's sidecar from picking up this component, since both files sit in the same `Resources` folder.

Run `aspire run` again and open the dashboard's endpoint from the Aspire resources view. Every workflow instance is listed with its status, app ID, and duration:

![Diagrid Dev Dashboard listing OrderProcessingWorkflow executions with their status, instance ID, app ID, and start and end times.](https://milanjovanovic.tech/blogs/mnw_198/diagrid_dashboard_workflows.png)

Clicking an instance shows the exact input the workflow received and the output it produced:

![Workflow Execution Details page showing a running OrderProcessingWorkflow instance with its status and input payload.](https://milanjovanovic.tech/blogs/mnw_198/diagrid_dashboard_workflow_instance.png)

Below that sits the full execution history - the ground truth of what your workflow actually did. Expand a `TaskScheduled` event to see an activity's input, or a `TaskCompleted` event to see its input and output:

![Execution History table showing TaskScheduled and TaskCompleted events for each activity in the order processing workflow.](https://milanjovanovic.tech/blogs/mnw_198/diagrid_dashboard_workflow_history.png)

Being able to see the workflow's actual state, not just guess at it from logs, is what makes local workflow development feel sane. There's also a [<VPIcon icon="fas fa-globe"/>`Diagrid.Aspire.Hosting.Dashboard`](https://nuget.org/packages/Diagrid.Aspire.Hosting.Dashboard) package that wraps this container setup into a single `AddDiagridDashboard` call.

---

## Summary

Dapr Workflow gives you durable execution for long-running processes without dragging a heavy orchestration engine into your code:

- The process is **plain C# code** that reads top to bottom.
- Dapr makes it **fault-tolerant**, replaying from the state store so a crash never loses progress.
- The orchestration stays **deterministic**; the side effects live in activities.
- **Aspire** runs the sidecar, the state store, and the dashboard with one command.
- The **Diagrid Dev Dashboard** shows you exactly what each instance is doing.

You can grab the complete [source code for this article (<VPIcon icon="iconfont icon-github"/>`m-jovanovic/dapr-workflows-with-aspire`)](https://github.com/m-jovanovic/dapr-workflows-with-aspire) on my GitHub, including Aspire integration tests for the workflow.

If you want to go deeper, the free [**Build Dapr Workflows in .NET with Aspire**](https://diagrid.io/dapr-university/dapr-workflows-dotnet-aspire) track on Dapr University is the natural next step. You'll build a fan-out/fan-in workflow on this exact stack in a hosted sandbox, with nothing to install. The [**Dapr Workflow track**](https://diagrid.io/dapr-university/dapr-workflow) covers the remaining patterns in standalone examples.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building Dapr Workflows in .NET With Aspire",
  "desc": "Long-running business processes are hard to get right. Dapr Workflow lets you write them as plain C# code that survives crashes and restarts, and Aspire makes the whole thing run with a single command. Here's how to wire the two together.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/building-dapr-workflows-in-dotnet-with-aspire.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
