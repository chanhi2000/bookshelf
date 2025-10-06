---
lang: en-US
title: "How to Debug Kubernetes Pods with Traceloop: A Complete Beginner's Guide"
description: "Article(s) > How to Debug Kubernetes Pods with Traceloop: A Complete Beginner's Guide"
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
      content: "Article(s) > How to Debug Kubernetes Pods with Traceloop: A Complete Beginner's Guide"
    - property: og:description
      content: "How to Debug Kubernetes Pods with Traceloop: A Complete Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-debug-kubernetes-pods-with-traceloop-a-complete-beginners-guide.html
prev: /devops/k8s/articles/README.md
date: 2025-08-30
isOriginal: false
author:
  - name: Opaluwa Emidowojo
    url : https://freecodecamp.org/news/author/Tech-On-Diapers/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756483063551/4179b718-7883-4a89-a9c2-1c678185469a.png
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
  name="How to Debug Kubernetes Pods with Traceloop: A Complete Beginner's Guide"
  desc="Debugging Kubernetes pods can feel like detective work. Your app crashes, and you're left wondering what happened in those critical moments leading up to failure. Traditional kubectl commands show you logs and statuses, but they can't tell you exactl..."
  url="https://freecodecamp.org/news/how-to-debug-kubernetes-pods-with-traceloop-a-complete-beginners-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756483063551/4179b718-7883-4a89-a9c2-1c678185469a.png"/>

Debugging Kubernetes pods can feel like detective work. Your app crashes, and you're left wondering what happened in those critical moments leading up to failure. Traditional `kubectl` commands show you logs and statuses, but they can't tell you exactly what your application was doing at the system level when things went wrong.

What if you had a flight recorder for your applications, something that captures every system call in real-time, so you can "rewind" and see the exact sequence of events that led to a crash? That's what Traceloop does. It continuously traces system calls in your pods, giving you a detailed replay of what happened before, during, and after issues occur.

In this guide, you’ll learn how to use Traceloop's system call tracing to debug pod issues that would otherwise be nearly impossible to diagnose.

::: note Prerequisites

Before we begin, here are some prerequisites - things you’ll need to know and have:

- **Basic Kubernetes concepts**: Understanding of pods, deployments, services, and namespaces
- **kubectl fundamentals**: Comfortable with commands like `kubectl get`, `kubectl describe`, `kubectl logs`, and `kubectl exec`
- **Container basics**: Understanding how containerized applications work
- **Basic Linux concepts**: Understanding of processes and system calls (helpful, but we'll explain as we go)

**Technical Requirements**

- **Kubernetes cluster access**: Local (minikube, kind, Docker Desktop) or cloud-based cluster
- `kubectl` installed and configured to connect to your cluster
- Sufficient permissions (cluster admin or equivalent RBAC) to:
  - Install and run eBPF-based tools (Traceloop uses eBPF)
  - Create/modify pods and deployments
  - Access pod logs and system-level data
- **Linux-based Kubernetes nodes**: Most clusters already run on Linux.

**System Requirements**

- **Extended Berkeley Packet Filter (eBPF) support**: Used for tracing and monitoring at the kernel level. Kernel version 5.10+ recommended.
- **Sufficient cluster resources**: Traceloop runs alongside your applications

:::

---

## What is Traceloop?

[<VPIcon icon="fas fa-globe"/>Traceloop](https://inspektor-gadget.io/docs/main/gadgets/traceloop/) is a system call tracing and observability tool that works across containerized environments, from Docker containers running locally to pods in production Kubernetes clusters. But before we discuss what that means, let's talk about why system calls matter for debugging.

Every time your application does anything (like opening a file, making a network request, allocating memory, or crashing), it has to interact with the operating system through system calls. These are the fundamental building blocks of how any program interacts with the world around it.

Here's where traditional debugging falls short: when your container crashes, the logs might tell you "segmentation fault" or "out of memory," but they don't tell you the sequence of events that led there. Did the application try to access a file that didn't exist? Was it making network calls that failed? Did it run out of file descriptors?

Traceloop captures this missing piece. It sits at the kernel level using eBPF technology, recording every system call your application makes in real-time. Think of it as installing a dashcam in your application. It's always recording with minimal resources, and when something goes wrong, you have the footage.

Strace is another popular debugging tool - but it requires you to know that there's a problem first. With Traceloop, we can conveniently run it continuously in the background with minimal overhead. If your container crashes at 3am, you can immediately "rewind the tape" and see exactly what system calls happened leading up to the crash.

This helps debug intermittent issues that happen randomly in production but never when you are watching. Because Traceloop is always recording, you finally have visibility into what your application was doing when these mysterious failures occur.

---

## How Traceloop Works

Now that you understand what Traceloop does, let's look under the hood at how it captures and processes system calls in your containerized environments.

### The Technical Foundation

Traceloop is built on eBPF, a technology that allows programs to run safely in the Linux kernel without changing kernel code. Think of eBPF as a way to install "hooks" directly into the kernel that can observe everything happening on your system with minimal performance impact.

Unlike traditional monitoring tools that work from userspace, eBPF programs run in kernel space, giving them access to system calls as they happen, without relying on the application logging appropriate error messages. This is why Traceloop can capture events that never make it to application logs, like failed system calls or crashes that happen before the application can write anything.

### The Flight Recorder Architecture

Traceloop uses eBPF maps as an overwriteable ring buffer. Imagine a tape recorder that continuously records over itself. It's always capturing system calls, but it only keeps the most recent data in memory. When something goes wrong, the recording automatically preserves what happened leading up to the incident, just like an airplane's flight recorder after a crash.

This approach solves the production debugging problem: you don't need to predict when issues will happen or attach debuggers after the fact. The recording is always running, waiting for you to need it.

### System Call Capture Flow

Here's how Traceloop captures and processes system calls across your Kubernetes environment:

1. **Application pods** generate system calls through normal operation - opening files, making network connections, allocating memory.
2. **eBPF probes (also called hooks)** intercept these system calls at the kernel level before they're processed.
3. **Traceloop recorder** captures the events, buffers them, and adds container context using Inspektor Gadget enrichment (pod name, namespace, container ID).
4. **Output stream** formats the data and makes it available for analysis in real-time or after an incident.
5. **Traceloop user** views and analyzes the captured trace to diagnose the root cause of issues.

Below is a visual representation of the flow. The key advantage is that Traceloop sees everything your application does, even actions that fail silently or happen too quickly for traditional logging to catch. This gives you complete visibility into your application's interaction with the operating system.

![Flow diagram showing how Traceloop works. Application Pods generate system calls, which undergo kernel-level interception via eBPF probes. The probes capture events and pass them to the Traceloop Recorder, which buffers and formats the data. The Output Stream then displays the results to the Traceloop User. The process highlights steps from generating syscalls to capturing, recording, formatting, and presenting the results.](https://cdn.hashnode.com/res/hashnode/image/upload/v1755043403339/c5047de7-afc4-48aa-a28e-ee3a1dfbe47f.jpeg)

### Container Isolation and Context

One of Traceloop's strengths is understanding containerized environments. It doesn't just capture raw system calls - it adds context about which pod, container, and namespace generated each call. This means you can trace specific applications without getting overwhelmed by system calls from other containers running on the same node.

This container awareness makes Traceloop particularly powerful in Kubernetes environments where you might have dozens of pods running on a single node, but you only care about debugging one specific application.

---

## How to Set Up Traceloop

Before we can start tracing system calls, we need to set up Traceloop in your Kubernetes environment. Traceloop is part of the [<VPIcon icon="fas fa-globe"/>Inspektor Gadget](https://inspektor-gadget.io/) ecosystem, which provides flexibility in how you use it.

### Installation Overview

This setup:

- Deploys Inspektor Gadget components to all worker nodes
- Eliminates the download and initialization overhead on each use, as components are pre-loaded and ready
- Eliminates the need to reinstall or reconfigure for each debugging session - just run your traces immediately
- Requires cluster admin permissions
- Works best for teams doing regular debugging

#### Installation Requirements

First, ensure your cluster meets the requirements:

- Kubernetes cluster with Linux nodes
- eBPF support
- kubectl installed and configured
- Cluster admin permissions

#### Install kubectl gadget

The recommended way is using `krew` (kubectl plugin manager):

```sh
# Install krew if you don't have it
curl -fsSLO "https://github.com/kubernetes-sigs/krew/releases/latest/download/krew-linux_amd64.tar.gz"
tar zxvf krew-linux_amd64.tar.gz
./krew-linux_amd64 install krew
export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"

# Install kubectl gadget
kubectl krew install gadget
```

Alternatively, you can install directly:

```sh
# For Linux/macOS
curl -sL https://github.com/inspektor-gadget/inspektor-gadget/releases/latest/download/kubectl-gadget-linux-amd64.tar.gz | sudo tar -C /usr/local/bin -xzf - kubectl-gadget

# Verify installation
kubectl gadget version
```

#### Deploy Inspektor Gadget to Your Cluster

Deploy the Inspektor Gadget components to your cluster:

```sh
kubectl gadget deploy
```

This installs the necessary DaemonSets and RBAC configurations that allow gadgets like Traceloop to run on your cluster nodes.

Alternatively, you can also deploy using [<VPIcon icon="fas fa-globe"/>Helm](https://inspektor-gadget.io/docs/v0.43.0/reference/install-kubernetes/#installation-with-the-helm-chart).

#### Verify Installation

Check that the gadget pods are running:

```sh
kubectl get pods -n gadget
```

You should see gadget pods running on each node in your cluster.

---

## Your First Trace: Hands-On Tutorial

Now let's capture our first system call trace. We'll create a simple scenario and watch what happens at the system level.

### Setting Up the Test Environment

First, create a dedicated namespace for our tracing experiments:

```sh
kubectl create ns test-traceloop-ns
#
# namespace/test-traceloop-ns created
```

Next, create a simple pod that we can interact with:

```sh
kubectl run -n test-traceloop-ns --image busybox test-traceloop-pod --command -- sleep inf
#
# pod/test-traceloop-pod created
```

This creates a BusyBox container that sleeps indefinitely, giving us a stable target for tracing.

### Starting Your First Trace

Next, start tracing system calls for our test pod:

This command starts the flight recorder. You'll see column headers showing what information Traceloop captures:

```sh
kubectl gadget run traceloop:latest --namespace test-traceloop-ns
#
# K8S.NODE    K8S.NAMESPACE    K8S.PODNAME    K8S.CONTAINERNAME    CPU    PID    COMM    SYSCALL    PARAMETERS    RET
```

The trace is now running in the background, continuously recording system calls from our pod.

### Generating System Calls

With the trace running, let's generate some activity. In a new terminal window, run a command inside your test pod:

```sh
kubectl exec -ti -n test-traceloop-ns test-traceloop-pod -- /bin/sh
```

Once inside the container, run some basic commands:

```sh
ls /
echo "Hello World" > /tmp/test.txt
cat /tmp/test.txt
```

### Collecting the Trace

Back in your original terminal where Traceloop is running, press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the recording and see the captured system calls.

You'll see output similar to this:

```plaintext title="output"
K8S.NODE            K8S.NAMESPACE        K8S.PODNAME          K8S.CONTAINERNAME    CPU  PID    COMM  SYSCALL      PARAMETERS                   RET
minikube-docker     test-traceloop-ns    test-traceloop-pod   test-traceloop-pod   2    95419  ls    openat       dfd=-100, filename="/lib"    3
minikube-docker     test-traceloop-ns    test-traceloop-pod   test-traceloop-pod   2    95419  ls    getdents64   fd=3, dirent=0x...          201
minikube-docker     test-traceloop-ns    test-traceloop-pod   test-traceloop-pod   2    95419  ls    write        fd=1, buf="bin dev etc..."   201
minikube-docker     test-traceloop-ns    test-traceloop-pod   test-traceloop-pod   2    95419  ls    exit_group   error_code=0                 0
```

### Understanding Your First Trace

Let's break down what we're seeing:

- **K8S.PODNAME**: Which pod generated these system calls
- **PID**: Process ID of the command that ran
- **COMM**: The command name (ls, echo, cat)
- **SYSCALL**: The actual system call made (openat, write, exit_group)
- **PARAMETERS**: Arguments passed to the system call
- **RET**: Return value (0 usually means success)
    

This trace shows the `ls` command opening the `/lib` directory, reading directory entries, writing the output to stdout, and exiting successfully.

### Clean Up

Remove the test resources:

```sh
kubectl delete pod test-traceloop-pod -n test-traceloop-ns
kubectl delete ns test-traceloop-ns
```

You can now see exactly what your applications are doing at the kernel level, something that traditional logs and kubectl commands can't show you.

Let's try this with an application that crashes.

---

## Step-by-Step Debugging Walkthrough

Now that you know how to capture traces, let's take a look at a real debugging scenario. We'll create an application that crashes and use Traceloop to uncover the root cause. Something that would be nearly impossible with traditional kubectl debugging.

### The Scenario: A Mysterious Crash

Let's create a Python application that has a subtle bug. It tries to write to a file it doesn't have permission to access, then crashes. This mimics real-world scenarios where applications fail due to permission issues, missing files, or resource constraints.

### Setting Up the Problematic Application

First, we’ll create a new namespace for our debugging exercise:

```sh
kubectl create ns debug-traceloop-ns
```

Now, let's create a pod with an application that will crash:

```sh
kubectl run -n debug-traceloop-ns crash-app --image=python:3.9-slim --restart=Never -- python3 -c "
import time
import os
print('App starting...')
time.sleep(5)
print('Trying to write to restricted file...')
try:
    with open('/etc/passwd', 'w') as f:
        f.write('malicious content')
except Exception as e:
    print(f'Error: {e}')
    exit(1)
"
```

This creates a pod that will:

1. Start successfully
2. Try to write to <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`passwd` (a restricted system file)
3. Fail and crash with exit code 1

### Starting the Trace Before the Crash

Here's the key difference from traditional debugging. We start tracing before we know there's a problem. In a real scenario, you'd have Traceloop running continuously.

```sh
kubectl gadget run traceloop:latest --namespace debug-traceloop-ns
```

The trace starts recording immediately. You'll see the column headers, and the flight recorder is now capturing every system call.

### Observing the Application Behavior

In another terminal, check the pod status:

```sh
kubectl get pods -n debug-traceloop-ns -w
```

You'll see the pod go through these states:

- `Pending` → `Running` → `Error` → `CrashLoopBackOff`

Traditional debugging would show you:

```sh
kubectl logs -n debug-traceloop-ns crash-app
#
# App starting...
# Trying to write to restricted file...
# Error: [Errno 13] Permission denied: '/etc/passwd'
```

But this doesn't tell you exactly what the application tried to do at the system level.

### Collecting and Analyzing the Trace

Back in your Traceloop terminal, press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the recording. You'll see system calls like this:

```plaintext title="output"
K8S.NODE        K8S.NAMESPACE      K8S.PODNAME  COMM    SYSCALL    PARAMETERS                           RET
minikube-docker debug-traceloop-ns crash-app    python3 openat     dfd=-100, filename="/etc/passwd"    -13
minikube-docker debug-traceloop-ns crash-app    python3 write      fd=3, buf="App starting..."         16
minikube-docker debug-traceloop-ns crash-app    python3 openat     dfd=-100, filename="/etc/passwd"    -13
minikube-docker debug-traceloop-ns crash-app    python3 exit_group error_code=1                        0
```

### Reading the System Call Story

The trace reveals the exact sequence of events:

1. `openat filename="/etc/passwd" RET=-13`: The application tried to open <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`passwd` for writing
    - Return code `-13` = `EACCES` (Permission denied)
2. `write buf="App starting..."`: Normal logging output (successful)
3. `openat filename="/etc/passwd" RET=-13`: Second attempt to open the restricted file (still denied)
4. `exit_group error_code=1`: Application exits with error code 1

### What Traceloop Revealed

Traditional debugging told us "Permission denied" but Traceloop shows us:

- **Exactly which file** the application tried to access
- **When** the permission denial happened in the execution flow
- **How many times** it tried (twice in this case)
- **The exact system call** that failed (`openat`)

### Real-World Applications

This same approach works for debugging:

- **File not found errors**: See exactly which files your app is looking for
- **Network connection failures**: Observe failed `connect()` system calls with specific addresses
- **Memory issues**: Watch `mmap()` and `brk()` calls that fail
- **Container startup problems**: See which system calls fail during initialization

### Clean Up

Remove the test resources:

```sh
kubectl delete pod crash-app -n debug-traceloop-ns
kubectl delete ns debug-traceloop-ns
```

### Key Takeaway

Traditional Kubernetes debugging shows you what went wrong after it happened. Traceloop's continuous recording shows you exactly how it went wrong at the system level. This level of detail is invaluable for debugging complex production issues where the logs don't tell the full story.

---

## Real-World Debugging Scenarios

Now that you understand the fundamentals, let's explore common production issues and how Traceloop helps diagnose them. These scenarios mirror real problems you'll encounter in Kubernetes environments.

### Scenario 1: Container Startup Failures

**The problem**: Your pod gets stuck in `CrashLoopBackOff` with unhelpful logs.

Traditional `kubectl` commands show limited information:

```sh
kubectl describe pod failing-app
# 
# Events: Back-off restarting failed container

kubectl logs failing-app
#
# (Empty or minimal output)
```

System calls show the application tried to:

1. Access configuration files that don't exist
2. Connect to services that aren't available
3. Write to directories without proper permissions

Key system calls to watch:

1. `openat` with `-2` return (file not found)
2. `connect` with `-111` return (connection refused)
3. `access` with `-13` return (permission denied)

### Scenario 2: Memory and Resource Issues

**The problem**: Application performance degrades or gets OOMKilled.

What Traceloop shows:

1. `mmap` calls failing (memory allocation issues)
2. `brk` system calls indicating heap growth
3. File descriptor exhaustion through failed `openat` calls
4. Excessive `write` calls indicating memory pressure

::: tip Example pattern:

```plaintext title="output"
SYSCALL    PARAMETERS           RET
mmap       length=1048576       -12  # ENOMEM - out of memory
brk        brk=0x55555557d000   0    # Heap expansion
openat     filename="/tmp/..."   -24  # EMFILE - too many open files
```

:::

### Scenario 3: Network Connectivity Problems

**The problem**: Service-to-service communication fails intermittently.

Traditional debugging limitations:

1. Application logs show "connection timeout"
2. Network policies seem correct
3. DNS resolution appears to work

::: info What Traceloop reveals:

1. Exact IP addresses and ports being attempted
2. DNS resolution patterns through `openat` on <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-line"/>`resolv.conf`
3. Failed `connect` calls with specific error codes
4. Socket creation and binding issues

:::

::: tip Key indicators:

```sh
SYSCALL    PARAMETERS                    RET
socket     family=AF_INET, type=SOCK     3
connect    fd=3, addr=10.96.0.1:443     -110  # ETIMEDOUT
close      fd=3                         0
```

:::

### Scenario 4: Configuration and Secret Issues

**The problem**: Application can't access mounted secrets or config maps.

What system calls reveal:

1. File access patterns for mounted volumes
2. Permission checks on secret files
3. Configuration file parsing attempts

Common patterns:

1. Multiple `openat` attempts on different config file paths
2. `access` calls checking file permissions before opening
3. Failed reads from mounted secret volumes

### Scenario 5: Performance Bottlenecks

**The problem**: Application response times are slow without obvious cause.

Traceloop analysis:

1. Excessive `fsync` calls (disk I/O bottlenecks)
2. Many `futex` calls (lock contention)
3. Frequent `recvfrom` timeouts (network issues)
4. Repeated file system operations

::: tip Performance indicators:

```sh
SYSCALL     FREQUENCY    ISSUE
fsync       High         Disk I/O bottleneck
futex       Excessive    Lock contention
poll        Many         Waiting for I/O
recvfrom    Timeouts     Network delays
```

:::

---

## Best Practices

### When to Use Traceloop

Traceloop is most useful when you’re dealing with the kinds of problems that are notoriously difficult to pin down. If you’ve ever struggled with debugging intermittent crashes that don’t happen on demand, or run into confusing permission and access issues, this is where it works best.

It also helps uncover performance bottlenecks at the system level and provides visibility into application behavior during tricky startup failures. Another common use case is diagnosing network connectivity problems between pods, where other tools usually can't help

Of course, not every problem requires system call tracing. For application-level issues, logs and APM tools are more effective. Cluster-level concerns are often better handled with `kubectl describe` or by looking at events, and if you’re primarily monitoring resources, standard metrics and dashboards show you what's happening.

### Performance Considerations

Like any tracing tool, Traceloop adds some overhead, but it keeps the overhead low. You can keep it efficient by narrowing the scope of your traces. For example, filtering by namespace with `--namespace specific-ns`, or targeting specific pods using `--podname target-pod`. In high-traffic environments, it’s best to run traces for shorter periods, and node-specific tracing can further isolate debugging when you don’t want to instrument the entire cluster.

In most cases, Traceloop uses very little CPU and memory, thanks to its eBPF-based approach. This makes it lighter than traditional tools like strace. The actual cost depends on the volume of system calls being recorded, so it’s a good practice to monitor resource usage in your own environment to confirm it’s operating within acceptable limits.

### Integration with Your Workflow

Traceloop works well in dev and production workflows. In development, it’s a powerful way to understand how your application interacts with the system. You can use it to confirm that your app handles edge cases correctly, or to validate permission and resource configurations before promoting workloads into production.

In production environments, you can deploy it in different ways. Depending on how much overhead you're okay with, some teams run it continuously on a small subset of nodes, while others use it only when traditional debugging methods don’t provide enough insight. Pairing Traceloop with your existing monitoring and logging stack can give you a much more complete picture of system behavior.

It also helps with teamwork. Sharing trace outputs makes it easier for teams to reason about complex issues together. The data it provides can guide improvements in error handling and logging, and documenting common system call patterns can help onboard new developers more quickly.

### Security Considerations

Because Traceloop records low-level system activity, you need to be mindful of what it captures.

::: info What Traceloop Can See:

- System call parameters (such as filenames and network addresses)
- Process information and command arguments
- File access patterns and permissions

:::

::: tip Privacy Measures:

- Limit trace duration to minimize data collection
- Use namespace isolation to avoid capturing unrelated workloads
- Apply data retention policies for trace outputs
- Watch for sensitive information in file paths or system call parameters

:::

---

## Conclusion

Traceloop doesn’t just tell you something went wrong - it shows you how. By recording every system call in real time, it turns mysterious Kubernetes failures into solvable problems. Whether the issue happened seconds ago or in the middle of the night, the tool gives you the ability to rewind, inspect, and respond with confidence.

### When to Use It

Keep in mind that Traceloop complements your existing debugging toolkit rather than replacing it. Reach for it when logs don’t tell the whole story, when intermittent problems are hiding in the shadows, when `kubectl` commands leave you guessing, or when you need to see how your application is really interacting with the system.

Once you’re comfortable with Traceloop, you can add more tools. [<VPIcon icon="fas fa-globe"/>Inspektor Gadget](https://inspektor-gadget.io/) offers other tools for network, security, and performance debugging that pair well with Traceloop. Integrating it into your incident response workflow, sharing insights across your team, and even considering continuous tracing for critical workloads are good things to try next.

The next time you run into a stubborn Kubernetes pod failure, you won’t be stuck speculating. With Traceloop, you can “rewind the tape” and see exactly what happened. System call tracing may sound complex at first, but in practice, it’s one of the most powerful ways to truly understand how applications behave in containerized environments.

:::: note P.S.

Have any questions about Traceloop or want to share your debugging challenges? The Inspektor Gadget team and community hang out in the [<VPIcon icon="fas fa-globe"/>#inspektor-gadget](https://kubernetes.slack.com/archives/CSYL75LF6) channel on Kubernetes Slack. It's a great place to get help from the engineers who built these tools, share experiences, and maybe even contribute to making the ecosystem even better.

You can also connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`emidowojo`)](https://linkedin.com/in/emidowojo/) if you’d like to stay in touch. If you made it to the end of this tutorial, thanks for reading!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Debug Kubernetes Pods with Traceloop: A Complete Beginner's Guide",
  "desc": "Debugging Kubernetes pods can feel like detective work. Your app crashes, and you're left wondering what happened in those critical moments leading up to failure. Traditional kubectl commands show you logs and statuses, but they can't tell you exactl...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-debug-kubernetes-pods-with-traceloop-a-complete-beginners-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
