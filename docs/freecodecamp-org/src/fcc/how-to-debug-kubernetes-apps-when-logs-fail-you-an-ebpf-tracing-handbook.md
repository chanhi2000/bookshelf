---
lang: en-US
title: "How to Debug Kubernetes Apps When Logs Fail You – An eBPF Tracing Handbook"
description: "Article(s) > How to Debug Kubernetes Apps When Logs Fail You – An eBPF Tracing Handbook"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - k8s
  - kubernetes
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Debug Kubernetes Apps When Logs Fail You – An eBPF Tracing Handbook"
    - property: og:description
      content: "How to Debug Kubernetes Apps When Logs Fail You – An eBPF Tracing Handbook"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-debug-kubernetes-apps-when-logs-fail-you-an-ebpf-tracing-handbook.html
prev: /devops/k8s/articles/README.md
date: 2025-12-17
isOriginal: false
author:
  - name: Opaluwa Emidowojo
    url : https://freecodecamp.org/news/author/Tech-On-Diapers/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1765899860869/3eadf316-8539-4624-afba-1d4190b6c62a.png
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

[[toc]]

---

<SiteInfo
  name="How to Debug Kubernetes Apps When Logs Fail You – An eBPF Tracing Handbook"
  desc="Let’s say your Kubernetes pod crashes at 3am and the logs show nothing useful. By the time you SSH into the node, the container is gone, and you're left guessing what happened in those final moments. This is the reality of debugging modern applicatio..."
  url="https://freecodecamp.org/news/how-to-debug-kubernetes-apps-when-logs-fail-you-an-ebpf-tracing-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1765899860869/3eadf316-8539-4624-afba-1d4190b6c62a.png"/>

Let’s say your Kubernetes pod crashes at 3am and the logs show nothing useful. By the time you SSH into the node, the container is gone, and you're left guessing what happened in those final moments.

This is the reality of debugging modern applications. Traditional monitoring wasn't built for containers that live for seconds, services that shift across nodes, or network paths that change constantly.

eBPF changes this. It lets you see *inside* the kernel itself, watching every system call, every network packet, and every process execution – without modifying a single line of code.

In this tutorial, you will trace a real Kubernetes application using eBPF-powered tools. You’ll learn fundamentals that apply across the entire modern observability ecosystem, with gadgets from the Inspektor Gadget ecosystem.

By the end, you’ll be able to:

- Trace requests as they move through your Kubernetes pods
- Observe behavior at the kernel and syscall level
- Debug failures that logs and metrics simply can’t explain

::: note Prerequisites

**Knowledge requirements:**

- Basic Kubernetes concepts: pods, deployments, services, namespaces
- Familiarity with kubectl: `get`, `describe`, `logs`, `exec`
- Container basics
- Basic Linux concepts: processes, system calls

**Technical requirements:**

- Kubernetes cluster (local or cloud-based)
- `kubectl` installed and configured
- Cluster admin permissions
- Linux kernel 5.10+ (most managed services have this)

:::

---

## Understanding eBPF Observability

eBPF (extended Berkeley Packet Filter) is a technology that allows you to run custom programs inside the Linux kernel without changing kernel code or loading kernel modules.

The Linux kernel is the control center of your operating system. Historically, if you wanted to observe low-level activity (like network packets, system calls, or file operations), you had to rely on kernel changes or kernel modules. Both approaches were fragile, difficult to maintain, and carried real stability and security risks.

eBPF shifts how we approach observability. It provides a safe, sandboxed environment where you can run observability programs directly in the kernel with built-in safety checks that prevent crashes or security vulnerabilities.

### Why does this matter for observability?

In traditional observability, you instrument your application code. You add logging statements, metrics libraries, and tracing SDKs. This works, but has significant limitations:

- **Code changes are required**: You must modify and redeploy applications
- **It’s language-specific**: Different languages need different libraries
- **There will likely be blind spots**: You can only see what you explicitly instrument
- **The overhead**: Heavy instrumentation slows down applications
- **Container challenges**: By the time you add instrumentation and redeploy, the problem may have disappeared

eBPF takes a different approach. Instead of instrumenting applications, you instrument the kernel. Since every application ultimately makes system calls to the kernel for network I/O, file operations, and process management, you can observe everything from one vantage point.

### The eBPF advantage for Kubernetes

Kubernetes adds another layer of complexity. Your application might be spread across multiple containers, pods, and nodes. Traditional APM (Application Performance Monitoring) tools struggle here because containers come and go rapidly, network topology changes constantly, service meshes add routing complexity, and you often don't control application code (think third-party services or legacy applications you can't modify.)

eBPF doesn't care about any of this. It sees all activity at the kernel level, regardless of what language your app is written in, whether it's containerized, how many times the pod has been rescheduled, or whether you have access to modify the source code. This universal visibility is why the Cloud Native Computing Foundation (CNCF) and major cloud providers are betting heavily on eBPF for the future of observability.

---

## How eBPF Tracing Works (Without Getting Lost in the Kernel)

When your application runs on Kubernetes, there's a clear separation between user space and kernel space. Your code runs in user space, where it's isolated, safe, and has limited access to system resources. To do anything useful – make network calls, read files, allocate memory – your application must ask the kernel for help. The kernel handles these requests via system calls, commonly called syscalls.

eBPF lets us hook into these syscalls without slowing the system down. It’s like having a CCTV camera at every doorway between user space and kernel space, watching who passes through, when, and what they’re carrying.

### A Simple Example: HTTP Request Tracing

Your application initiates an HTTP GET request, which needs to go through the network stack. To establish a connection, your application first makes a `socket()` system call to create a network socket. Then it calls `connect()` to establish a connection to the remote server. Once connected, it uses `send()` to transmit the HTTP request. Network packets are sent across the wire, and eventually your application calls `recv()` to receive the response.

With eBPF tools like Inspektor Gadget's Traceloop, you can automatically hook into these syscalls. The eBPF program captures request metadata including source and destination IPs, ports, timing information, and payload sizes. You get a complete trace of the request without touching your application code.

### The eBPF Execution Flow

Here's what happens under the hood when you run a trace. When you deploy Inspektor Gadget and run a gadget, several things happen behind the scenes. Once deployed, the eBPF program springs into action whenever a traced event occurs.

When your application makes a syscall, the eBPF hook triggers and quickly collects relevant data: timestamps, process IDs, container IDs, pod names, request details, and latency information. This data is sent to user space through eBPF maps, which are efficient data structures for kernel-to-userspace communication.

Inspektor Gadget adds Kubernetes context to raw kernel data. Instead of seeing only process IDs, you can see pod names, namespaces, labels, and other metadata. For example, you can tell that a request originated from the frontend pod in the production namespace and targeted the backend service.

The gadget then presents this information in a format that's immediately useful, whether you're using the CLI or integrating with other observability tools.

eBPF is fast because:

- **JIT compilation**: Programs are turned into native machine code for maximum performance
- **Event-driven**: Only execute when relevant events occur, not continuously polling
- **Kernel-resident**: No expensive context switching between kernel and user space
- **Highly optimized**: Typically adds less than 5% overhead even under heavy load

### The Tool: Inspektor Gadget & Traceloop

For this tutorial, we're using Traceloop, an eBPF-based tool that traces request flows through applications by observing syscalls, network calls, and I/O operations at the kernel level.

Why are we using Traceloop for this tutorial?

- It’s quick to install and run (one command)
- The output maps directly to the application’s behavior
- It automatically adds Kubernetes context (pod names, namespaces)
- You don’t need to make any application code changes

What you'll learn applies beyond Traceloop. All eBPF tracing tools (Pixie, Cilium Hubble, Tetragon) work the same way under the hood. They attach to kernel hooks and collect event data. Once you understand the concepts here, you can use any eBPF observability tool effectively.

---

## How to Set Up Your Environment

To get your environment ready for hands-on tracing, we'll verify that your cluster meets the requirements, install Inspektor Gadget, and deploy a sample application to trace.

### Verify that Your Cluster Meets the Requirements

Before installing anything, confirm that your Kubernetes cluster is ready for eBPF.

#### Check your Kubernetes version:

```sh
kubectl version --short
```

You need Kubernetes 1.19 or later. Most modern clusters exceed this requirement, but it's worth verifying.

#### Verify kernel version on your nodes:

```sh
kubectl get nodes -o wide
```

Then check the kernel version on one of your nodes:

```sh
# If using a local cluster like minikube or kind
uname -r

# For cloud clusters, you might need to check node details
kubectl debug node/<node-name> -it --image=ubuntu -- bash -c "uname -r"
```

You need Linux kernel 5.10 or later for the best eBPF support. Kernel 4.18+ works but with some limitations. If you're using a managed Kubernetes service (GKE, EKS, AKS), you almost certainly have a compatible kernel.

#### Confirm that you have cluster admin permissions:

```sh
kubectl auth can-i create deployments --all-namespaces
```

This should return "yes". Inspektor Gadget needs elevated permissions to load eBPF programs into the kernel.

### Install Inspektor Gadget

You can install Inspektor Gadget in several ways. We'll use the kubectl plugin method as it's the most straightforward for learning.

#### Install the kubectl gadget plugin:

```sh
# Download and install kubectl-gadget
kubectl krew install gadget

# Verify installation
kubectl gadget version
```

If you don't have krew (the kubectl plugin manager), you can install it first:

```sh
# Install krew
(
  set -x; cd "$(mktemp -d)" &&
  OS="$(uname | tr '[:upper:]' '[:lower:]')" &&
  ARCH="$(uname -m | sed -e 's/x86_64/amd64/' -e 's/\(arm\)\(64\)\?.*/\1\2/' -e 's/aarch64$/arm64/')" &&
  KREW="krew-${OS}_${ARCH}" &&
  curl -fsSLO "https://github.com/kubernetes-sigs/krew/releases/latest/download/${KREW}.tar.gz" &&
  tar zxvf "${KREW}.tar.gz" &&
  ./"${KREW}" install krew
)

# Add krew to your PATH
export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"
```

#### Deploy Inspektor Gadget to your cluster:

```sh
kubectl gadget deploy
```

This creates a `gadget` namespace and deploys the Inspektor Gadget daemon as a DaemonSet, ensuring each node in your cluster can run eBPF programs.

#### Verify the deployment

```sh
kubectl get pods -n gadget
```

You should see one `gadget-*` pod per node, all in the `Running` state. If a pod is stuck in `Pending` or `CrashLoopBackOff`, check that your kernel meets the version requirements.

#### Deploying a sample application

To learn tracing effectively, we need an application that does something interesting. We'll deploy a simple microservices application with multiple components so you can see traces flowing across service boundaries.

Start by creating a namespace for our demo app:

```sh
kubectl create namespace demo-app
```

Then deploy a simple web application with a backend:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: demo-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: gcr.io/google-samples/microservices-demo/frontend:v0.8.0
        ports:
        - containerPort: 8080
        env:
        - name: PORT
          value: "8080"
        - name: PRODUCT_CATALOG_SERVICE_ADDR
          value: "productcatalog:3550"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: demo-app
spec:
  type: LoadBalancer
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: productcatalog
  namespace: demo-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: productcatalog
  template:
    metadata:
      labels:
        app: productcatalog
    spec:
      containers:
      - name: server
        image: gcr.io/google-samples/microservices-demo/productcatalogservice:v0.8.0
        ports:
        - containerPort: 3550
        env:
        - name: PORT
          value: "3550"
---
apiVersion: v1
kind: Service
metadata:
  name: productcatalog
  namespace: demo-app
spec:
  selector:
    app: productcatalog
  ports:
  - port: 3550
    targetPort: 3550
```

Apply the configuration:

```sh
kubectl apply -f demo-app.yaml
```

And wait for pods to be ready:

```sh
kubectl wait --for=condition=ready pod -l app=frontend -n demo-app --timeout=300s
kubectl wait --for=condition=ready pod -l app=productcatalog -n demo-app --timeout=300s
```

Then just verify that everything is running:

```sh
kubectl get pods -n demo-app
```

You should see both `frontend` and `productcatalog` pods in the `Running` state.

Now you’ll need to get the frontend URL:

```sh
# For local clusters (minikube, kind, Docker Desktop)
kubectl port-forward -n demo-app service/frontend 8080:80

# Then access http://localhost:8080 in your browser

# For cloud clusters
kubectl get service frontend -n demo-app
# Look for the EXTERNAL-IP
```

Visit the application in your browser to confirm it's working. You should see a simple e-commerce storefront. This application makes HTTP requests from the frontend to the product catalog service, which is perfect for tracing.

---

## How to Trace Your First Request: Hands-On Tutorial

Now that everything is set up, let's capture our first trace and see eBPF observability in action.

### Generate the Traffic to Trace

First, we need some application activity to observe. We will generate a few requests for our demo application.

In one terminal, start the Traceloop gadget:

```sh
kubectl gadget traceloop -n demo-app
```

This command starts tracing HTTP request handling in the `demo-app` namespace. Inspektor Gadget monitors the kernel to capture the function calls and system events that occur while processing each request.

In another terminal, generate some traffic:

```sh
# If using port-forward
curl http://localhost:8080

# If you have an external IP
curl http://<EXTERNAL-IP>

# Generate multiple requests
for i in {1..10}; do curl http://localhost:8080; sleep 1; done
```

### Viewing Your First Trace

Switch back to the terminal running the trace loop gadget. You should see output appearing as requests flow through your application. The output will look something like this:

```plaintext title="output"
NODE         NAMESPACE   POD              CONTAINER    PID    TYPE       COUNT  
minikube     demo-app    frontend-abc123  frontend     1234   loop       1      
minikube     demo-app    frontend-abc123  frontend     1234   loop       2
```

Each line shows a traced execution flow, with the count increasing as the same pattern is observed again.

We can make the output more interesting by filtering:

```sh
# Stop the previous trace with Ctrl+C, then run:
kubectl gadget traceloop -n demo-app --podname frontend
```

This narrows our observation to just the frontend pod, reducing noise and making patterns clearer.

#### Understanding what you're seeing:

Each column shows different information about your application:

- **NODE**: Which Kubernetes node the traced event occurred on. In multi-node clusters, this helps you understand workload distribution and identify node-specific issues.
- **NAMESPACE**: The Kubernetes namespace. We filtered to `demo-app`, so you'll only see that namespace. In production, filtering by namespace is crucial for focusing on specific applications.
- **POD**: The specific pod where the event occurred. Each pod gets a unique name (like `frontend-abc123`), allowing you to distinguish between replicas of the same application.
- **CONTAINER**: Which container within the pod. Pods can have multiple containers (main application, sidecars, init containers), so this helps you pinpoint exactly where activity is happening.
- **PID**: The process ID inside the container. This is the actual Linux process that made the syscalls eBPF observed. Multiple PIDs might appear if your application uses multiple processes or threads.
- **TYPE**: The type of event traced. For Traceloop, this identifies kernel-level patterns detected during request processing.
- **COUNT**: How many times this pattern has been observed. A rapidly incrementing count indicates high request volume.

#### What this tells you about your application:

Even from this simple output, you can derive insights. If you see events appearing for the `frontend` pod but not the `productcatalog` pod, it might indicate that requests aren't making it to the backend. This is a potential configuration issue. If the `COUNT` increases rapidly for one pod but not others, you know which replica is receiving traffic, useful for debugging load balancing issues.

The real power becomes clear when you correlate these kernel-level observations with what you know about your application. When you made 10 curl requests, you should see corresponding activity in the trace output. This direct relationship between application behavior and kernel observations is the foundation of eBPF observability.

---

## How to Interpret Traces

Understanding raw trace output is valuable, but interpreting what it means for your application's health and performance is where the real skill lies.

### Trace Anatomy: Spans, Timing, and Request Flow

A trace represents a single request's journey through your system. When you curl the frontend, that generates one trace. A span represents a single operation within that trace like "frontend handles request," "frontend calls product catalog," "product catalog queries data," and "frontend returns response." Each span has timing information: when it started, when it ended, and therefore how long it took.

In traditional distributed tracing with OpenTelemetry or Jaeger, you'd explicitly create these spans in your application code. With eBPF, the tool infers spans from syscall patterns. When eBPF sees your frontend process call `connect()` to the product catalog's IP, followed by `send()` and `recv()`, it understands that's a span representing an HTTP request to the backend service.

The request flow is the sequence of spans showing how your request moved through services. In our demo app,

1. The user request arrives at the frontend,
2. the frontend connects to the product catalog,
3. the product catalog processes the request,
4. the product catalog returns the data, the frontend renders the page,
5. and finally, the response is sent to user.

### How to Follow Requests Across Services

Let's trace a request across service boundaries to see this flow in action.

First, we’ll start a more detailed trace:

```sh
kubectl gadget trace_tcp -n demo-app
```

The trace_tcp gadget shows network connections, giving us visibility into service-to-service communication.

Next, generate a request:

```sh
curl http://localhost:8080
```

In the trace output, look for connection patterns:

You should see the frontend pod establishing a TCP connection to the product catalog service. The trace will show the source (frontend) and destination (product catalog) IPs and ports, along with timing information.

This is how eBPF lets you follow requests: by observing the network syscalls that implement service communication. You don't need a service mesh or instrumentation libraries, the kernel sees all network activity and eBPF captures it.

#### Understanding the flow

1. Your curl command triggers a TCP connection to the frontend pod's IP on port 8080
2. The frontend processes the request and opens a TCP connection to the product catalog's IP on port 3550
3. Data flows back and forth (you'll see send/receive events)
4. Connections close when requests complete

Each step is visible to eBPF because each step requires syscalls that the kernel handles.

### How to Identify Bottlenecks and Errors

We can also use tracing to identify performance issues.

First, let’s start by simulating a slow backend:

```sh
# Create a deliberately slow endpoint by modifying our deployment
kubectl scale deployment productcatalog -n demo-app --replicas=0

# Wait a moment, then scale back up
kubectl scale deployment productcatalog -n demo-app --replicas=1
```

While the product catalog is down, generate some requests:

```sh
for i in {1..5}; do curl http://localhost:8080; done
```

You should see connection attempts from the frontend to the product catalog, but if the service is unavailable, you'll see different patterns, possibly connection timeouts or connection refused errors, depending on the exact timing.

What bottlenecks look like in traces:

- **Long spans**: A span that takes significantly longer than others indicates a bottleneck. In trace loop output, you might see gaps between events or notice certain operations taking longer.
- **Retries**: Repeated connection attempts to the same destination suggest a failing or slow service.
- **Error patterns**: Connection failures, timeouts, or unusual syscall sequences indicate problems.

The best skill to have is pattern recognition. A typical, healthy request flow has a rhythm, and events occur in predictable sequences with consistent timing. When something breaks, the rhythm changes. Requests take longer, errors appear, or expected events don't occur at all.

---

## Real-World Debugging Scenarios

Now let's go through three realistic scenarios where eBPF helps:

### Scenario 1: Finding a Slow Endpoint

**The problem:** Users report that the product catalog page sometimes loads very slowly, but metrics show normal average latency.

Let’s use Traceloop to investigate:

```sh
# Start tracing with timing information
kubectl gadget traceloop -n demo-app --podname frontend
```

We’ll generate some mixed traffic:

```sh
# Some requests to the homepage (fast)
curl http://localhost:8080

# Some requests to the product catalog (potentially slow)
curl http://localhost:8080/products
```

In the trace output, compare the `COUNT` increments for different request patterns. If certain patterns show significantly more loop iterations or longer gaps between events, that indicates those requests are doing more work, possibly hitting a slow endpoint.

#### The diagnosis:

You might notice that requests to `/products` cause the frontend to make multiple calls to the product catalog service (visible with `kubectl gadget trace_tcp`), while homepage requests don't. This explains why the product page is slow: it's making synchronous calls to a backend service, and if that service is slow or the network is congested, users feel the delay.

#### The fix:

You might implement caching, make the backend calls asynchronous, or optimize the product catalog service itself. The key is that eBPF helped you identify which specific code path was slow without adding instrumentation to your application.

### Scenario 2: Tracking Down Failed Requests

**The problem:** Your monitoring shows a 5% error rate, but application logs don't show any errors. Where are the failures happening?

Now let’s use eBPF to investigate:

```sh
# Trace network connections to see connection failures
kubectl gadget trace_tcp -n demo-app
```

We’ll simulate intermittent failures:

```sh
# Create a failing scenario by temporarily breaking service connectivity
kubectl delete service productcatalog -n demo-app

# Generate requests
for i in {1..10}; do curl http://localhost:8080; sleep 1; done

# Restore the service
kubectl apply -f demo-app.yaml
```

In the TCP trace, you'll see connection attempts from the frontend to the product catalog that fail or time out. The trace will show the source, destination, and what happened (connection refused, timeout, and so on).

#### The diagnosis:

The failures are happening at the network level, the frontend can't reach the product catalog. This might be due to network policy issues, service mesh misconfiguration, or DNS problems. Traditional application logs might not capture this because the application never receives a response to log, and the connection fails before the application layer even gets involved.

#### Why eBPF finds this when logs don't:

Your application logs what it experiences. If a connection fails at the TCP level, your application might just see "connection refused" and retry without detailed logging.

eBPF sees the actual syscalls and network events, giving you visibility into what's happening beneath your application layer.

### Scenario 3: Understanding Service Dependencies

**The problem:** You're not sure which services depend on each other, and you want to understand the actual runtime dependencies before making changes.

We’ll use eBPF to map dependencies:

```sh
# Trace all TCP connections to see who talks to whom
kubectl gadget trace_tcp -n demo-app
```

And then generate normal traffic:

```sh
# Make various requests to exercise different code paths
curl http://localhost:8080
curl http://localhost:8080/products
curl http://localhost:8080/cart
```

The trace output shows source and destination for every connection. Build a mental (or actual) map of which pods connect to which services.

#### The discovery:

You'll see that the frontend pod connects to the product catalog service, but you might also discover unexpected dependencies. Perhaps the frontend also makes calls to a Redis cache, an authentication service, or external APIs. These runtime dependencies might not be documented or might differ from what architectural diagrams show.

#### Why this matters:

Before deploying a change to the product catalog service, you now know exactly which services will be affected. Before implementing a network policy, you know which connections to allow. Before decomposing a monolith, you understand the actual communication patterns.

This is observability-driven architecture understanding: letting the system show you how it actually works, not how you think it works.

---

## Advanced Tracing Insights

Once you're comfortable with basic request tracing, Inspektor Gadget offers deeper observability capabilities that reveal even more about your system's behavior.

### Syscall-Level Observation

The traceloop and trace_tcp gadgets give you application-level insights, but sometimes you need to go deeper. The trace_exec gadget shows you every process execution in your containers.

First, let’s monitor process execution:

```sh
kubectl gadget trace_exec -n demo-app
```

And generate activity:

```sh
# Exec into a pod and run commands
kubectl exec -it -n demo-app deployment/frontend -- /bin/sh
ls -la
ps aux
exit
```

Every command you run inside the container appears in the trace: `/bin/sh`, `ls`, `ps`, and anything else. This helps you understand what's running in your containers, detect suspicious activity, or debug initialization issues.

In production scenarios, this helps you answer questions like: Is my application spawning unexpected subprocesses? Are there security issues like someone running `curl` to download malicious scripts? Is my `init` script actually running the commands I think it is?

### Network Tracing Insights

Beyond TCP connections, you can trace DNS queries, which often reveal surprising things about your application's behavior.

Run `trace_dns`:

```sh
kubectl gadget trace_dns -n demo-app
```

Generate requests:

```sh
curl http://localhost:8080
```

You'll see every DNS query your application makes: resolving service names, checking for external APIs, perhaps even unexpected queries that indicate misconfiguration or dependencies you didn't know about.

Common insights from DNS tracing include discovering that your application is using external dependencies you didn't document, finding DNS resolution failures that cause intermittent errors, or identifying excessive DNS queries that could be cached.

### Combining eBPF Data with Logs and Metrics

eBPF observability delivers the best results when combined with traditional observability signals. To combine them effectively:

- Use metrics for high-level health monitoring, alerting on anomalies, tracking trends over time, and dashboard visualization.
- Use logs for application-specific context, business logic details, error messages with stack traces, and debugging application code.
- Use eBPF traces for understanding request flows, identifying where time is spent, discovering runtime dependencies, and debugging issues that don't appear in logs.

#### A practical workflow:

Your metrics alert you that latency increased. You check logs but don't see errors, requests are succeeding, just slowly. You use eBPF tracing to identify that requests are spending extra time in network I/O to a particular backend service. Now you check that service's metrics and logs, and discover it's under heavy load. The eBPF trace gave you the clue that logs and metrics alone couldn't provide.

This approach to observability, using the right tool for each question, is how experienced engineers debug complex systems efficiently.

### What eBPF Can and Can't See

eBPF excels at:

- Network traffic (requests, responses, latency)
- System calls (file I/O, process creation, memory allocation)
- Kernel functions (scheduling, locking, resource usage)
- Function calls in binaries (with uprobes)

But keep in mind that eBPF has limitations:

- Cannot decrypt encrypted payloads (unless hooking SSL libraries before encryption)
- Doesn't automatically understand application logic
- Captures low-level events but may need context for high-level semantics

That's why eBPF complements traditional observability rather than replacing it entirely. It gives you infrastructure-level visibility with no code changes and universal coverage. Traditional APM provides application-level context, business metrics, and custom instrumentation. Together, they give you complete observability across your entire stack.

---

## Best Practices and Production Considerations

Before using eBPF tracing in production, there are important considerations around performance, security, and operational practices.

### Performance Impact

eBPF's reputation for low overhead is well-deserved, but "low" isn't "zero."

Most eBPF tracing tools add 2-5% CPU overhead and negligible memory overhead. The exact number depends on event frequency, tracing a service that handles 10,000 requests per second will have more overhead than one handling 10 per second.

Measuring the impact:

```sh
# Before enabling tracing, check baseline resource usage
kubectl top pods -n demo-app

# Enable tracing
kubectl gadget traceloop -n demo-app

# Check resource usage again
kubectl top pods -n demo-app
```

You should see a small increase in CPU usage in the pods where tracing is active. This is the cost of the eBPF programs running in the kernel and processing events.

#### Production best practices

Use targeted tracing rather than tracing everything everywhere. Trace specific namespaces, pods, or individual containers when investigating issues. For high-volume services, reduce overhead by applying filters, aggregation, or sampling where supported by the tracing tool.

Stop tracing when you’re done investigating. Unlike metrics collection, which typically runs continuously, eBPF-based tracing is best used as an on-demand diagnostic tool to capture detailed insights during active debugging.

#### When overhead matters

If you're running latency-sensitive applications (like high-frequency trading systems or real-time communications), even 2-5% overhead might be unacceptable. In these cases, use eBPF tracing in pre-production environments to identify issues, or enable it temporarily in production only when actively debugging.

### Security Considerations

eBPF is powerful, which means it requires elevated privileges. Understanding the security implications is crucial.

#### What eBPF can access

eBPF programs can observe all syscalls, network traffic, and process execution in the kernel. This includes potentially sensitive data like connection details, file paths, and process arguments. While eBPF programs run in a sandbox and can't modify data or crash the kernel, they can read information that might be sensitive.

#### Privilege requirements

Loading eBPF programs requires `CAP_SYS_ADMIN` or `CAP_BPF` capabilities (on newer kernels). This is a privileged operation, only trusted users should have this access. The Inspektor Gadget DaemonSet runs with these privileges, so protect access to it accordingly.

#### Best practices

Implement RBAC (Role-Based Access Control) to restrict who can run gadgets. Not every developer needs the ability to trace production systems.

Also, be mindful of what data you're collecting, if your traces might contain sensitive information (like authentication tokens in HTTP headers), restrict access to trace data.

Lastly, consider using admission controllers to prevent unauthorized eBPF program loading. Audit eBPF usage in production environments to track who ran which gadgets when.

#### Network policies

Inspektor Gadget's DaemonSet needs to communicate with the API server and between its components. Ensure your network policies allow this communication while still maintaining appropriate segmentation.

### When to Use eBPF Tracing vs. Traditional APM

eBPF tracing and traditional APM tools like New Relic, Datadog, or Dynatrace serve different purposes. Understanding when to use each helps you build an effective observability strategy.

**Use eBPF tracing when:**

- You can't modify application code (third-party applications, legacy systems, compiled binaries)
- You need infrastructure-level visibility (network, syscalls, kernel behavior)
- You're debugging issues that span service boundaries but don't show up in application logs
- You want zero instrumentation overhead during normal operation (run tracing only when needed)
- You need to understand what's actually happening versus what the application reports

**Use traditional APM when:**

- You need business-context metrics (user IDs, transaction types, business-specific data)
- You want automatic instrumentation with minimal setup for supported frameworks
- You need long-term storage and analysis of all traces (eBPF tracing is often used for real-time investigation)
- You want pre-built dashboards and alerting for common application patterns
- You need application code-level visibility (stack traces, variable values, function calls)

### The Ideal Approach: Use Both

Many teams run traditional APM for continuous monitoring and use eBPF tracing for targeted investigation when APM data isn't sufficient. For example, your APM shows that a service is slow but doesn't explain why. You enable eBPF tracing on that service to understand what's happening at the kernel level, network delays, excessive syscalls, unexpected dependencies, and find the root cause.

This complementary approach gives you both the continuous visibility of APM and the deep diagnostic power of eBPF without the overhead of running both at maximum depth all the time.

---

## Next Steps and Resources

If you got this far, thanks for reading! Now that you have learned the fundamentals of eBPF observability, and hands-on tracing with Inspektor Gadget, you can continue your journey by:

### Exploring Other eBPF Tools

Now that you understand eBPF concepts through traceloop, exploring other tools will be much easier.

#### Try other Inspektor Gadget gadgets:

```sh
# See all available gadgets
kubectl gadget --help

# Some useful ones to explore:
kubectl gadget trace_open -n demo-app     # File I/O tracing
kubectl gadget trace_bind -n demo-app     # Port binding events
kubectl gadget profile cpu -n demo-app    # CPU profiling
kubectl gadget snapshot process -n demo-app  # Process listing
```

Each gadget teaches you something different about system behavior and gives you another diagnostic tool in your toolkit.

### Experiment with other eBPF platforms:

If you're interested in broader observability platforms, try Pixie for its auto-instrumentation and rich UI. Install Cilium with Hubble if you're focused on network observability and want to understand service mesh behavior. Explore Tetragon if security observability interests you, seeing what processes are executing and what files they're accessing.

The concepts transfer directly: all these tools attach eBPF programs to kernel hooks, collect event data, and present it in different ways. Your understanding of syscalls, traces, and kernel-level observation applies universally.

### Connect to the CNCF Observability Ecosystem

eBPF observability tools don't exist in isolation. They're part of the broader Cloud Native Computing Foundation ecosystem.

#### OpenTelemetry integration

Many eBPF tools can export data in OpenTelemetry format, allowing you to combine kernel-level traces with application-level traces in a unified observability backend. This gives you the complete picture: eBPF shows you infrastructure behavior while OpenTelemetry shows you application context.

#### Prometheus and Grafana

eBPF-derived metrics can be exposed as Prometheus metrics and visualized in Grafana alongside your application metrics. This unified dashboard approach helps you correlate infrastructure and application behavior.

#### Service mesh integration

If you're using Istio, Linkerd, or other service meshes, eBPF tools like Cilium Hubble can provide deeper visibility into service-to-service communication than the mesh alone provides. The mesh handles traffic management while eBPF gives you kernel-level visibility.

#### Jaeger and Zipkin

For organizations using distributed tracing backends, eBPF traces can be exported to these systems, enriching your trace data with infrastructure-level spans that application instrumentation misses.

### Community Resources and Learning Paths

The eBPF community is vibrant and welcoming. You can continue learning from the resources below.

#### Official documentation and blog

- [<VPIcon icon="fas fa-globe"/>eBPF.io](http://eBPF.io): The central hub for eBPF documentation, tutorials, and project listings
- [<VPIcon icon="fas fa-globe"/>Inspektor Gadget docs](https://inspektor-gadget.io/docs/latest/): Comprehensive guides for all gadgets and use cases
- [<VPIcon icon="fas fa-globe"/>Cilium documentation](https://docs.cilium.io/en/stable/index.html): Deep dives into eBPF networking
- [<VPIcon icon="fas fa-globe"/>CNCF Blog — “What is Observability 2.0?](https://cncf.io/blog/2025/01/27/what-is-observability-2-0/): A quick overview of how modern observability moves beyond traditional tools by unifying metrics, logs, and traces for real-time insight in cloud-native systems.

#### Learning resources

- [<VPIcon icon="fas fa-globe"/>Learning eBPF by Liz Rice](https://cilium.isovalent.com/hubfs/Learning-eBPF%20-%20Full%20book.pdf): Comprehensive book covering eBPF fundamentals
- [<VPIcon icon="fas fa-globe"/>eBPF Summit](https://ebpf.io/summit-2025/): Annual conference with talks from eBPF creators and users
- [<VPIcon icon="fas fa-globe"/>CNCF webinars](https://cncf.io/online-programs/cncf-on-demand-webinar-how-to-start-building-a-self-service-infrastructure-platform-on-kubernetes/): Regular sessions on observability topics
- [<VPIcon icon="iconfont icon-k8s"/>Kubernetes observability SIGs](https://kubernetes.dev/community/community-groups/): Community discussions and projects

To make this tutorial easy to follow and experiment with, I have included all Kubernetes manifests, demo applications, and eBPF tracing commands in this [repository (<VPIcon icon="iconfont icon-github"/>`Emidowojo/ebpf-k8s-tracing-tutorial`)](https://github.com/Emidowojo/ebpf-k8s-tracing-tutorial). You can also connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`emidowojo`)](https://linkedin.com/in/emidowojo/) if you’d like to stay in touch.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Debug Kubernetes Apps When Logs Fail You – An eBPF Tracing Handbook",
  "desc": "Let’s say your Kubernetes pod crashes at 3am and the logs show nothing useful. By the time you SSH into the node, the container is gone, and you're left guessing what happened in those final moments. This is the reality of debugging modern applicatio...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-debug-kubernetes-apps-when-logs-fail-you-an-ebpf-tracing-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
