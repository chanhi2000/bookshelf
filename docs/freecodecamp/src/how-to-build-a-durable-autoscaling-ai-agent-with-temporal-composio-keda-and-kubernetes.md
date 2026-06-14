---
lang: en-US
title: "How to Build a Durable, Autoscaling AI Agent with Temporal, Composio, KEDA, and Kubernetes"
description: "Article(s) > How to Build a Durable, Autoscaling AI Agent with Temporal, Composio, KEDA, and Kubernetes"
icon: iconfont icon-k8s
category:
  - DevOps
  - Docker
  - Kubernetes
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - k8s
  - kubernetes
  - docker
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Durable, Autoscaling AI Agent with Temporal, Composio, KEDA, and Kubernetes"
    - property: og:description
      content: "How to Build a Durable, Autoscaling AI Agent with Temporal, Composio, KEDA, and Kubernetes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-durable-autoscaling-ai-agent-with-temporal-composio-keda-and-kubernetes.html
prev: /devops/k8s/articles/README.md
date: 2026-06-24
isOriginal: false
author:
  - name: Shrijal Acharya
    url: https://freecodecamp.org/news/author/shricodev/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/93e5088e-4cac-48c3-911d-982ef96dfe13.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
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
  name="How to Build a Durable, Autoscaling AI Agent with Temporal, Composio, KEDA, and Kubernetes"
  desc="Most AI agents are great at quick tasks. Send a message, the agent calls a few tools, and you get a response back in seconds. That works perfectly when you're asking it to summarize a document or do s"
  url="https://freecodecamp.org/news/how-to-build-a-durable-autoscaling-ai-agent-with-temporal-composio-keda-and-kubernetes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/93e5088e-4cac-48c3-911d-982ef96dfe13.png"/>

Most AI agents are great at quick tasks. Send a message, the agent calls a few tools, and you get a response back in seconds. That works perfectly when you're asking it to summarize a document or do some internet research.

But what happens when the task actually takes time? Something like "go through the last three days of my emails, draft replies for anything urgent, and create Linear tickets for the engineering-related ones." That's not a quick job. It might take minutes, hours, or even longer. And this is just one example.

That's a full workflow, and the moment your server crashes or your process restarts, you lose everything. No retry, and no resume. You're starting from scratch.

That's the problem this article is about.

In this article, you'll build a durable background agent runtime that holds up under real conditions. Dispatch a task, walk away, and it gets done.

Under the hood, it runs on Kubernetes with KEDA autoscaling so workers scale to zero when idle and spin back up the moment work arrives. For crash recovery and durable execution we'll use Temporal, and for agentic capabilities and tool usage we'll use Composio.

::: info What's Covered?

In this tutorial, you'll build a durable background agent runtime that runs on Kubernetes and scales based on actual workload. Here's what you'll learn along the way:

- What an agent loop is and how to build one with Claude and Composio
- How to make long-running agent tasks handle crashes using Temporal
- How to build a gateway that decouples task dispatch from execution
- How to containerize the worker and gateway with Docker
- How to deploy the full system to a local Kubernetes cluster
- How to autoscale workers to zero with KEDA based on queue depth

This gets into some advanced concepts, but follow along and you'll learn a lot along the way.

:::

---

## What's the Plan (the Architecture)

Before diving into the code, it helps to understand how everything fits together.

The system is split into two distinct planes: a control plane that handles user-facing interactions (Next.js frontend), and an execution plane where the actual agent work happens. They never directly call each other, and that separation is intentional.

![Agent Architecture](https://cdn.hashnode.com/uploads/covers/641fd8b0be4ca15b2ad2a590/d7fd737e-6c38-4e61-abd1-26246bec2169.png)

Here's the flow from start to finish:

### Dispatching a Task

When a user submits a goal, the gateway first runs a pre-flight check to verify the required Composio tool connections are active for that user. If they are, it hands the task off to Temporal and returns immediately. The user doesn't wait around.

::: nOTE

You don't wait for the response to be back from the agent. It just happens all in the background. This isn't your regular chat app. You just launch the task and you forget.

:::

### Running the Task

Temporal puts the task on a queue and a worker pod picks it up. The worker runs the agent loop, LLM reasons over the goal, Composio executes the tools, and the result gets written back to Temporal. The frontend automatically polls the gateway for status updates so the user can see progress without doing anything.

### Scaling

KEDA watches the Temporal queue depth and scales worker pods based on how much work is pending. When the queue is empty, workers scale down to zero. When tasks come in, they load back up. That's the beauty!

The reason the gateway never touches agent code is straightforward: agent tasks can take minutes, or even hours based on the work, and you don't want that in your API layer. Keeping them separate helps the control plane stay fast regardless of what's happening in the background.

Also, the application supports Linux CronJob-style task scheduling with no human involved. So, having a pre-flight check helps there, because failing fast at dispatch is much better than having a task silently fail because a tool connection was missing.

That's pretty much the high level architecture of our application. To put it simply:

- **Kubernetes (k8s):** Orchestration Layer
- **KEDA:** Auto-scaling Layer
- **Temporal:** Durability Layer
- **Composio:** Tool Layer
- **Any LLM of your choice (in our case, Anthropic)** = Reasoning layer

---

## How to Set Up the Project

Before you start, make sure you have the following installed:

- Docker
- k3d (for running a local Kubernetes cluster)
- kubectl
- Helm
- Node.js and Python 3.11+

You'll also need API keys for [<VPIcon icon="iconfont icon-anthropic"/>Anthropic](https://anthropic.com/) and [<VPIcon icon="fas fa-globe"/>Composio](https://dashboard.composio.dev).

Start by cloning the repository:

```sh
git clone https://github.com/shricodev/kron-k8s-agent.git
cd kron-k8s-agent
```

Next, create the cluster, build the images, and load them in:

```sh
# Create the local cluster
k3d cluster create agent --wait

# Build both images and import them into the cluster
bash scripts/build-images.sh
bash scripts/load-images.sh

# Deploy Temporal (creates the temporal namespace, Postgres, and server)
kubectl apply -f infra/k8s/temporal/temporal-dev.yaml
```

Next, create the namespace and your secret. The secret has to exist before the app gets deployed, since the pods read their keys from it:

```sh
# Create the agent namespace
kubectl apply -f infra/k8s/00-namespace.yaml

# Create the secret with your keys (you're supposed to remove the placeholders with the actual values...)
kubectl create secret generic agent-secrets -n agent \
--from-literal=ANTHROPIC_API_KEY=sk-ant-... \
--from-literal=COMPOSIO_API_KEY=ak_... \
--from-literal=JWT_SECRET=$(openssl rand -hex 32)
```

With that in place, deploy the app and set up autoscaling:

```sh
# Install KEDA, then apply the scalers
helm repo add kedacore https://kedacore.github.io/charts
helm repo update
helm install keda kedacore/keda -n keda --create-namespace --wait

kubectl apply -f infra/k8s/40-keda-worker-scaledobject.yaml -f infra/k8s/41-gateway-hpa.yaml
```

Finally, port-forward the gateway so you can reach it from your machine:

```sh
# Port-forward the gateway to localhost:8000
kubectl -n agent port-forward svc/gateway 8000:8000
```

Point the frontend at `http://localhost:8000` and you're ready to start tasks.

::: note

You don't need to touch the <VPIcon icon="iconfont icon-dotenv"/>`.env` files in <VPIcon icon="fas fa-folder-open"/>`apps/worker/` or <VPIcon icon="fas fa-folder-open"/>`apps/gateway/` for this. Those are only for running the apps directly on your machine.

:::

In the cluster, the pods get their config from the ConfigMap and the secret you just created gets injected as environment variables at runtime.

---

## Core Components in the Application

The project is huge. Walking through every single line from scratch would turn this into an hours-long read, so instead I'll focus on the core components that actually make the system work.

### The Agent Loop

The agent loop is the brain of the entire system. Every time a task gets dispatched, this is what runs.

The idea is simple even if the implementation isn't. Give the LLM a goal, let it reason, let it call tools, feed the results back, and repeat until it's done.

```py
async def run_agent(
    user_id: str,
    goal: str,
    toolkit_hint: str | None = None,
) -> dict:
```

It takes three things: the user's ID (so Composio knows which connected accounts to use), the goal itself, and an optional toolkit hint. The hint lets you scope which tools get loaded. If the task is clearly a Gmail job, passing "gmail" avoids loading every tool the user has connected.

Before the loop starts, it creates a Composio session and fetches the tools for that user:

```py
session = await create_session(user_id, toolkit_hint);
tools = await get_tools(session);
```

Then the actual loop runs:

```py
for turn in range(1, settings.max_iterations + 1):
    response = await client.messages.create(
        model=settings.model,
        max_tokens=settings.max_tokens,
        system=SYSTEM_PROMPT,
        tools=tools,
        messages=messages,
    )

if response.stop_reason == "end_turn":
return finish("completed", _extract_text(response.content))

if response.stop_reason == "tool_use":
      # execute the tools, append results, continue
      # ...
```

Each turn, Claude looks at the goal and the conversation history, then decides what to do next. The `stop_reason` tells what happened:

- `"end_turn"`: Claude is done. It completed the task and is returning a final answer.
- `"tool_use"`: it wants to call one or more tools. The loop executes those through Composio, appends the results back into the message history, and goes around again.

If a tool call fails, the error gets fed back into the conversation rather than crashing the run:

```py
except ComposioError as exc:
tool_result_blocks = [
    {
        "type": "tool_result",
        "tool_use_id": block.id,
        "content": f"Tool execution failed: {exc}",
        "is_error": True,
    }
        for block in tool_use_blocks
]
```

The loop runs for at most `max_iterations` turns which is 20 by default, defined in <VPIcon icon="fas fa-folder-open"/>`apps/worker/agent/`<VPIcon icon="fa-brands fa-python"/>`config.py`. If it hits that ceiling without finishing, it returns a `max_iterations_reached` status instead of hanging indefinitely.

Every `run_agent` call returns the same dict shape: a status, a summary, and a list of every step taken. That consistent shape is what makes it straightforward for Temporal to store and inspect the result, which we'll get to next.

### Making it Durable with Temporal

The agent loop by itself has a real problem. If the worker process crashes partway through a 15-step task, everything is gone. You have no way to know how far it got, and you have to start from scratch.

#### Workflows and Activities

Temporal splits your code into two distinct pieces: workflows and activities.

A workflow describes what should happen and in what order, but it never does the actual work itself. No network calls, nothing. That constraint is exactly what lets Temporal safely replay it to reconstruct state after a crash.

An activity is where the real work happens. Network calls, LLM requests, tool executions – all of that goes inside an activity. Activities can fail and be retried independently without affecting the workflow state.

In this project, `AgentWorkflow` in <VPIcon icon="fas fa-folder-open"/>`apps/worker/`<VPIcon icon="fa-brands fa-python"/>`workflows.py` is the workflow, and `run_agent_activity` in <VPIcon icon="fas fa-folder-open"/>`apps/worker/`<VPIcon icon="fa-brands fa-python"/>`activities.py` is the activity that wraps the agent loop.

**The Workflow**

```py
@workflow.defn(name="AgentWorkflow")
class AgentWorkflow:
    def init(self) -> None:
        self._status: str = "running"
        self._result: dict | None = None
```

When a task gets dispatched, Temporal starts this workflow. It sets up a retry policy and hands all the real work off to the activity:

```py
retry = RetryPolicy(
  (initial_interval = timedelta((seconds = 2))),
  (backoff_coefficient = 2.0),
  (maximum_interval = timedelta((minutes = 2))),
  (maximum_attempts = 5),
  (non_retryable_error_types = ["ValueError", "AuthenticationError"]),
);

result = await workflow.execute_activity(
  run_agent_activity,
  (args = [user_id, goal, toolkit_hint]),
  (start_to_close_timeout = timedelta((minutes = 30))),
  (retry_policy = retry),
);
```

The `start_to_close_timeout` is set to 30 minutes and caps at 5 attempts, because agent tasks can genuinely take that long. You can increase or decrease the timer based on your work requirement.

**Querying the Workflow**

One thing that makes Temporal convenient here is query handlers. The workflow exposes its current status and result without needing a separate database to track it:

```py
@workflow.query
def status(self) -> str:
return self._status

@workflow.query
def result(self) -> dict | None:
return self._result
```

The gateway can ask Temporal "what is the status of workflow X?" at any point and get a live answer back. That's how the frontend polling works.

**The Activity**

The activity is straightforward. It wraps `run_agent` and logs what happens:

```py
@activity.defn(name="run_agent_activity")
async def run_agent_activity(user_id: str, goal: str, toolkit_hint: str | None) -> dict:
    result = await run_agent(user_id=user_id, goal=goal,             toolkit_hint=toolkit_hint)
    return result
```

Anything that touches the network lives here, not in the workflow. That separation is what lets Temporal do its job.

**The Worker**

The worker process is what registers everything and starts polling the queue:

```py
worker = Worker(
            client,
            task_queue=temporal_settings.temporal_task_queue,
            workflows=[AgentWorkflow],
            activities=[run_agent_activity, notify_activity],
            max_concurrent_activities=5,
)
```

It connects to Temporal, registers the workflow and activities, and listens on the task queue. When a task arrives, it picks it up and runs it. This is the process running inside the Kubernetes pod, and it's exactly what KEDA will scale based on queue depth later.

### The Agent Gateway

The gateway is a FastAPI app that sits between the user and Temporal. It handles task dispatch, status polling, and cancellation. Crucially, it never runs agent code itself. Its only job is to talk to Temporal and return quickly.

#### Dispatching a Task

The dispatch endpoint in <VPIcon icon="fas fa-folder-open"/>`apps/gateway/routes/`<VPIcon icon="fa-brands fa-python"/>`tasks.py` is where everything begins:

```py title="apps/gateway/routes/tasks.py"
  @router.post("/dispatch", response_model=DispatchResponse)
  async def dispatch(
      body: DispatchRequest,
      user_id: str = Depends(current_user_id),
  ) -> DispatchResponse:
      if body.toolkit:
          access = await check_toolkit_access(user_id, body.toolkit)
          if not access["allowed"]:
              raise HTTPException(
                  status_code=status.HTTP_409_CONFLICT,
                  detail={
                      "error": "toolkit_not_connected",
                      "connect_url": access["connect_url"],
                  },
              )

      workflow_id = f"agent-{user_id}-{uuid.uuid4().hex[:8]}"
      await client.start_workflow(
          WORKFLOW_NAME,
          args=[user_id, body.goal, body.toolkit],
          id=workflow_id,
          task_queue=settings.temporal_task_queue,
          cron_schedule=body.schedule or "",
      )
      return DispatchResponse(workflow_id=workflow_id, status="dispatched")
```

The request carries three fields: the goal, an optional toolkit name (to not spend time figuring out toolkit names), and an optional cron schedule. The endpoint runs a preflight check, hands the task off to Temporal, and returns the workflow ID immediately. The user doesn't wait for the agent to finish.

Notice the `cron_schedule` field. Passing a standard cron expression here turns the task into a recurring job. Temporal handles the scheduling itself, no extra infra needed.

#### The Preflight Check

The preflight check lives in <VPIcon icon="fas fa-folder-open"/>`apps/gateway/routes/`<VPIcon icon="fa-brands fa-python"/>`preflight.py`. Before a task gets dispatched, it verifies that the user actually has the required toolkit connected in Composio:

```py title='apps/gateway/routes/preflight.py"
async def check_toolkit_access(user_id: str, toolkit_hint: str | None) -> dict:
    if not toolkit_hint:
        return {"allowed": True}

    connected = await asyncio.to_thread(
        _has_active_account, composio, user_id, toolkit_hint
    )
    if connected:
        return {"allowed": True}

    connect_url = await asyncio.to_thread(
        _connect_link, composio, user_id, toolkit_hint
    )
    return {"allowed": False, "toolkit": toolkit_hint, "connect_url": connect_url}
```

If the connection is missing, the gateway returns a `connect_url` so the user can authorize the app right away. This matters especially for scheduled tasks.

#### Checking Status

Once a task is running, the frontend polls this endpoint:

```py
  @router.get("/{workflow_id}", response_model=TaskStatusResponse)
  async def get_task(workflow_id: str, ...) -> TaskStatusResponse:
      if not _owns(workflow_id, user_id):
          raise HTTPException(status_code=404, detail="task not found")

      handle = client.get_workflow_handle(workflow_id, run_id=run_id)
      agent_status = await handle.query("status")

      if desc.status == WorkflowExecutionStatus.COMPLETED:
          result = await handle.query("result")

      return TaskStatusResponse(...)
```

The `status` and `result` come straight from Temporal's query handlers that you saw in the workflow. There's no separate status table, and no database write after each step. Temporal is the **source of truth**.

### Containerizing the Application

The gateway and the worker are packaged as two separate images. They share nothing at runtime, which is exactly what you want since they scale independently and have different responsibilities.

Both Dockerfiles live in the <VPIcon icon="fas fa-folder-open"/>`/docker` directory, and use a multi-stage build.

#### Why Multi-Stage? 🤔

The builder stage installs compilers and build tools to compile Python packages. The runtime stage gets only the finished dependencies and the application code. There's no point in putting the build tools into the final image.

#### The Gateway Image

```dockerfile title="Dockerfile"
FROM python:3.14-slim-bookworm AS builder

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt

FROM python:3.14-slim-bookworm AS runtime

ENV PYTHONUNBUFFERED=1 PATH="/opt/venv/bin:$PATH"

RUN useradd --create-home --uid 10001 app
WORKDIR /app

COPY --from=builder /opt/venv /opt/venv
COPY . .

USER app
EXPOSE 8000
CMD ["python", "main.py"]
```

The runtime stage copies the `venv` from the builder, drops into a non-root user, and starts the FastAPI app. And as always, we run it as a non-root user (be a good dev and follow proper security practices 😺).

#### The Worker Image

The worker Dockerfile is nearly identical with one small difference:

```dockerfile title="Dockerfile"
# procps gives us pgrep for the liveness probe
RUN apt-get update \
  && apt-get install -y --no-install-recommends procps \
  && rm -rf /var/lib/apt/lists/*
```

It installs procps so the Kubernetes liveness probe can run pgrep to check that the process is still alive.

#### Building and Loading the Images

The build script in <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-shell"/>`build-images.sh` builds both images, passing each app directory as the build context:

```sh
docker build \
-f "$ROOT/docker/Dockerfile.gateway" \
-t "agent-gateway:$TAG" \
"$ROOT/apps/gateway"

docker build \
-f "$ROOT/docker/Dockerfile.worker" \
-t "agent-worker:$TAG" \
"$ROOT/apps/worker"
```

The Dockerfiles live under <VPIcon icon="fas fa-folder-open"/>`docker/` but each one is built against its own app directory. That's what `COPY . .` actually copies.

After building, there's one more step before the images can run in the cluster. A local k3d cluster has no access to your Docker daemon, so images built locally aren't accessible to it. You have to import them explicitly:

```sh
k3d image import "agent-gateway:dev" "agent-worker:dev" -c agent
```

.<VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-shell"/>`load-images.sh` does this for you. Once the import completes, the cluster can pull the images like it usually does and your pods will start. 🎊

### Deploying to Kubernetes

With the images built and loaded into the cluster, the next step is applying the manifests. The setup is organized into two tiers. Tier 1 is the core application: the `namespace`, `config`, and `deployments`. Tier 2 is autoscaling, covered in the next section.

#### Config and Secrets

Non-sensitive config lives in a `ConfigMap` at <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`infra/k8s/`<VPIcon icon="iconfont icon-yaml"/>`01-configmap.yaml`:

```yaml title="infra/k8s/01-configmap.yaml"
data:
  MODEL: "claude-opus-4-8"
  MAX_TOKENS: "4096"
  MAX_ITERATIONS: "20"
  TEMPORAL_HOST: "temporal-frontend.temporal.svc.cluster.local:7233"
  TEMPORAL_TASK_QUEUE: "agent-tasks"
  GATEWAY_HOST: "0.0.0.0"
  GATEWAY_PORT: "8000"
```

This is where the Temporal host address comes from. Notice that it uses the full in-cluster DNS name pointing at the Temporal frontend service in the temporal namespace. That address only resolves from inside the cluster, which is fine since both the gateway and the worker run there.

API keys go in a Kubernetes Secret that you create manually and never commit in Git. Both the `ConfigMap` and the `Secret` are mounted as environment variables using `envFrom` in each deployment.

#### The Gateway Deployment

```yaml :collapsed-lines
spec:
  replicas: 2
  containers:
    - name: gateway
      image: agent-gateway:dev
      imagePullPolicy: IfNotPresent
      command:
        [
          "python",
          "-m",
          "uvicorn",
          "main:/app",
          "--host",
          "0.0.0.0",
          "--port",
          "8000",
        ]
      readinessProbe:
        httpGet:
          path: /health
          port: 8000
      resources:
        requests:
          cpu: 100m
          memory: 256Mi
        limits:
          cpu: 500m
          memory: 512Mi
```

A few things worth noting. `imagePullPolicy: IfNotPresent` tells Kubernetes to use the locally loaded image instead of trying to pull from a registry. The startup command bypasses the reload=True flag that main.py uses when run directly locally. The readiness probe hits `/health` before Kubernetes sends any traffic to the pod, so the gateway only receives requests once it's actually up.

The gateway also gets a `ClusterIP` Service so other pods and the port-forward can reach it:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: gateway
spec:
  type: ClusterIP
  ports:
    - port: 8000
      targetPort: 8000
```

#### The Worker Deployment

```yaml
# just polls Temporal.
spec:
  replicas: 1
  containers:
    - name: worker
      image: agent-worker:dev
      livenessProbe:
        exec:
          command: ["pgrep", "-f", "worker.py"]
        initialDelaySeconds: 15
        periodSeconds: 20
      resources:
        requests:
          cpu: 250m
          memory: 512Mi
        limits:
          cpu: "1"
          memory: 1Gi
```

The worker has no Service. It never accepts incoming connections. It connects outward to Temporal and polls for work, so nothing needs to reach it. That's why **procps was installed in the Dockerfile**.

The worker also gets more resources than the gateway. It's the one running LLM calls and executing tools, so it needs more resources. You can cap it depending on your requirements.

#### Applying Everything

The deploy script at <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-shell"/>`deploy.sh` applies Tier 1 in the correct order:

```sh title="scripts/deploy.sh"
kubectl apply -f "$K8S/00-namespace.yaml"
kubectl apply -f "$K8S/01-configmap.yaml"
kubectl apply -f "$K8S/10-gateway-deployment.yaml"
kubectl apply -f "$K8S/20-worker-deployment.yaml"
```

Order matters here. The namespace has to exist before anything else can be created inside it, and the `ConfigMap` has to exist before the pods that read from it start up.

### Autoscaling with KEDA

Kubernetes scales pods based on CPU or memory. That works fine for the gateway, which handles HTTP requests and actually uses CPU proportional to traffic. But it's the not the right signal for workers.

The worker sits completely idle when no tasks are queued. It doesn't burn CPU waiting. When tasks arrive, it gets busy fast. What you actually want to scale on is queue depth: how many tasks are waiting to be picked up.

That's what KEDA does. It reads external metrics like queue lengths, message counts, or in this case Temporal task queue depth, and scales your deployments accordingly.

#### Scaling the Worker

The `ScaledObject` in <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`infra/k8s/`<VPIcon icon="iconfont icon-yaml"/>`40-keda-worker-scaledobject.yaml` is what KEDA watches:

```yaml
spec:
  scaleTargetRef:
    name: worker
  minReplicaCount: 0
  maxReplicaCount: 10
  cooldownPeriod: 120
  triggers:
    - type: temporal
      metadata:
        endpoint: temporal-frontend.temporal.svc.cluster.local:7233
        namespace: default
        taskQueue: agent-tasks
        queueTypes: "workflow,activity"
        targetQueueSize: "5"
        activationTargetQueueSize: "0"
```

Let's walk through the important fields:

- `minReplicaCount`: 0 is the big one. KEDA can scale to zero, which a standard HPA can't do. When the queue is empty, every worker pod shuts down. You pay for nothing while the system is idle.
- `activationTargetQueueSize`: "0" means KEDA wakes the deployment the moment a single task enters the queue. Zero tasks, zero pods. One task, pods start spinning up.
- `targetQueueSize`: "5" tells KEDA to target roughly one worker pod per 5 pending tasks. Ten tasks in the queue means two pods.
- `cooldownPeriod`: 120 adds a 120-second buffer before KEDA scales back down after the queue clears.
- `queueTypes`: "workflow,activity" watches both queues. Without this, KEDA would only see part of the pending work.

::: note

The Temporal scaler requires KEDA v2.17 or later. Make sure your Helm install is on that version or above.

:::

#### Scaling the Gateway

The gateway gets a plain CPU-based HPA at <VPIcon icon="fas fa-folder-open"/>`infra/k8s/`<VPIcon icon="iconfont icon-yaml"/>`41-gateway-hpa.yaml`:

```yaml
spec:
  minReplicas: 2
  maxReplicas: 6
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 60
```

CPU is the right signal here because the gateway does real work proportional to incoming HTTP requests. It stays at a minimum of 2 replicas so there's no cold start delay on the API side.

#### Installing KEDA

KEDA is installed via Helm before applying the `ScaledObject`:

```sh
helm install keda kedacore/keda -n keda --create-namespace --wait
kubectl apply -f infra/k8s/40-keda-worker-scaledobject.yaml -f infra/k8s/41-gateway-hpa.yaml
```

Once those are applied, the system is fully operational. Submit a task and watch a worker pod appear. Let the queue empty and watch it disappear. That's the whole point.

And just like that, you have a fully durable, autoscaling AI Agent that you can schedule to run anytime. How cool is that? 😎

::: info Agent in Action

Here's a quick demo of the agent in action (running inside a Kubernetes Cluster):

<VidStack src="youtube/aZy_scANmU4" />

:::

---

## Conclusion

Running AI agents in production is a completely different problem than building them. I tried to focus on that gap here, and hopefully it gave you a solid reference for how to think about durability and scaling. And I hope it also helped you build or understand something different from a regular AI chat application.

The Temporal and KEDA combination is really something you should learn and know more about if you're into building AI agents or doing DevOps in general. Temporal helps with the biggest issue with AI agents (the durability), and KEDA makes sure that you aren't paying for idle workers at 2am (if used in prod) if nothing is running. You aren't just scaling on CPU, but based on events and that is important.

There's a lot of room to extend this from here. You could swap the dev JWT for proper OIDC, or expand the toolkit coverage through Composio to support more of your workflows.

The foundation is there. The rest is just building on top of it.

::: info

You can find the complete source code here

<SiteInfo
  name="shricodev/kron-k8s-agent"
  desc="A durable background agent runtime built on Temporal, Kubernetes, and Composio 💥"
  url="https://github.com/shricodev/kron-k8s-agent/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e302aeea2e2605eddc3b51421f02776278b19780f805955a0c9cd5fbb2ff677e/shricodev/kron-k8s-agent"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Durable, Autoscaling AI Agent with Temporal, Composio, KEDA, and Kubernetes",
  "desc": "Most AI agents are great at quick tasks. Send a message, the agent calls a few tools, and you get a response back in seconds. That works perfectly when you're asking it to summarize a document or do s",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-durable-autoscaling-ai-agent-with-temporal-composio-keda-and-kubernetes.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
