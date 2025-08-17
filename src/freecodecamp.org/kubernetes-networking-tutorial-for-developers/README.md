---
lang: en-US
title: "Kubernetes Networking Tutorial: A Guide for Developers"
description: "Article(s) > Kubernetes Networking Tutorial: A Guide for Developers"
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
      content: "Article(s) > Kubernetes Networking Tutorial: A Guide for Developers"
    - property: og:description
      content: "Kubernetes Networking Tutorial: A Guide for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/kubernetes-networking-tutorial-for-developers.html
prev: /devops/k8s/articles/README.md
date: 2025-06-24
isOriginal: false
author:
  - name: Destiny Erhabor
    url : https://freecodecamp.org/news/author/CaesarSage/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750697209688/e55bb451-1278-4004-ae3d-fd8bdbae47da.png
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
  name="Kubernetes Networking Tutorial: A Guide for Developers"
  desc="Kubernetes networking is one of the most critical and complex parts of running containerized workloads in production. It’s what allows different parts of a Kubernetes system - like containers and services - to talk to each other. This tutorial will w..."
  url="https://freecodecamp.org/news/kubernetes-networking-tutorial-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750697209688/e55bb451-1278-4004-ae3d-fd8bdbae47da.png"/>

Kubernetes networking is one of the most critical and complex parts of running containerized workloads in production. It’s what allows different parts of a Kubernetes system - like containers and services - to talk to each other.

This tutorial will walk you through both the theory as well as some hands-on examples and best practices for mastering Kubernetes networking.

::: note Prerequisites

- Have basic understanding of containers and [<FontIcon icon="fa-brands fa-docker"/>Docker installed](https://docs.docker.com/engine/install/) on your system.
- Basic understanding of General Networking terms.
- [<FontIcon icon="iconfont icon-k8s"/>Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) tool for runing kubernetes commands.
- Kubernetes cluster ([Kind](https://kind.sigs.k8s.io/), [<FontIcon icon="iconfont icon-k8s"/>Minikube](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/), and so on).
- [<FontIcon icon="fas fa-globe"/>Installed helm](https://helm.sh/docs/intro/install/) for Kubernetes package managements.

:::

---

## Table of Contents

1. [Introduction to Kubernetes Networking](#heading-introduction-to-kubernetes-networking)
2. [Core Concepts in Kubernetes Networking](#heading-core-concepts-in-kubernetes-networking)
3. [Cluster Networking Components](#heading-cluster-networking-components)
4. [DNS and Service Discovery](#heading-dns-and-service-discovery)
5. [Pod Networking Deep Dive](#heading-pod-networking-deep-dive)
6. [Services and Load Balancing](#heading-services-and-load-balancing)
7. [Network Policies and Security](#heading-network-policies-and-security)
8. [Common Pitfalls and Troubleshooting](#heading-common-pitfalls-and-troubleshooting)
9. [Summary and Next Steps](#heading-summary-and-next-steps)

---

## What is Kubernetes Networking?

So what actually is networking in Kubernetes? Well, in basic terms, it helps make sure that each container can communicate with the others, even if they're on different machines. It also ensures that outside traffic can reach the right containers when it needs to.

Kubernetes abstracts much of the complexity involved in networking, but understanding its internal workings helps you optimize and troubleshoot applications.

A key factor is that each pod gets a unique IP address and can communicate with all other pods without Network Address Translation (NAT). This simple yet powerful model supports complex distributed systems.

**NAT (Network Address Translation)** refers to the process of rewriting the source or destination IP address (and possibly port) of packets as they pass through a router or gateway.

Because NAT alters packet headers, it breaks the “end-to-end” transparency of the network:

1. The receiving host sees the NAT device’s address instead of the original sender’s.
2. Packet captures (for example, via tcpdump) only show the translated addresses, obscuring which internal endpoint truly sent the traffic.

### Example: Home Wi-Fi Router NAT

Imagine your home network: you have a laptop, a phone, and a smart TV all connected to the same Wi-Fi. Your Internet provider assigns you **one public IP address** (say, 203.0.113.5). Internally, your router gives each device a **private IP** (for example, 192.168.1.10 for your laptop, 192.168.1.11 for your phone, and so on).

- **Outbound traffic:** When your laptop (192.168.1.10) requests a webpage, the router rewrites the packet’s source IP from 192.168.1.10 → 203.0.113.5 (and tracks which internal port maps to which device).
- **Inbound traffic:** When the webpage replies, it arrives at 203.0.113.5, and the router uses its NAT table to forward that packet back to 192.168.1.10.

Because of this translation:

1. External servers **only see** the router’s IP (203.0.113.5), not your laptop’s.
2. Packets are “masqueraded” so multiple devices can share one public address.

In contrast, Kubernetes pods communicate **without** this extra translation layer - each pod IP is “real” within the cluster, so no router-like step obscures who talked to whom.

### Example: E-Commerce Microservices

Consider an online store built as separate microservices, each running in its own pod with a unique IP:

- **Product Catalog Service**: 10.244.1.2
- **Shopping Cart Service**: 10.244.2.3
- **User Authentication Service**: 10.244.1.4
- **Payment Processing Service**: 10.244.3.5

When a shopper adds an item to their cart, the Shopping Cart Pod reaches out directly to the Product Catalog Pod at 10.244.1.2. Because there’s no NAT or external proxy in the data path, this communication is fast and reliable - which is crucial for delivering a snappy, real-time user experience.

::: tip

For a complete, hands-on implementation of this scenario (and others), check out the “networking-concepts-practice” section of my: [<FontIcon icon="iconfont icon-github"/>`Caesarsage/Learn-DevOps-by-building` | networking-concepts-practice](https://github.com/Caesarsage/Learn-DevOps-by-building/blob/main/intermediate/k8/networking-concepts-practice/README.md)

:::

### Importance in Distributed Systems

Networking in distributed systems facilitates the interaction of multiple services, enabling microservices architectures to function efficiently. Reliable networking supports redundancy, scalability, and fault tolerance.

### Kubernetes Networking Model Principles

Kubernetes networking operates on three foundational pillars that create a consistent and high-performance network environment:

#### 1. Unique IP per Pod

Every pod receives its own routable IP address, eliminating port conflicts and simplifying service discovery. This design treats pods like traditional VMs or physical hosts: each can bind to standard ports (for example, 80/443) without remapping.

This helps developers avoid port-management complexity, and tools (like monitoring, tracing) work seamlessly, since pods appear as first-class network endpoints.

#### 2. NAT-Free Pod Communication

Pods communicate directly without Network Address Translation (NAT). Packets retain their original source/destination IPs, ensuring end-to-end visibility. This simplifies debugging (for example, `tcpdump` shows real pod IPs) and enables precise network policies. No translation layer also means lower latency and no hidden stateful bottlenecks.

#### 3. Direct Node-Pod Routing

Nodes route traffic to pods without centralized gateways. Each node handles forwarding decisions locally (via CNI plugins), creating a flat L3 network. This avoids single points of failure and optimizes performance - cross-node traffic flows directly between nodes, not through proxies. Scalability is inherent, and adding nodes expands capacity linearly.

### Challenges in Container Networking

Common challenges include managing dynamic IP addresses, securing communications, and scaling networks without performance degradation. While Kubernetes abstracts networking complexities, real-world deployments face hurdles, like:

#### Dynamic IP Management

Pods are ephemeral - IPs change constantly during scaling, failures, or updates. Hard-coded IPs break, and DNS caching (with misconfigured TTLs) risks routing to stale endpoints. Solutions like CoreDNS dynamically track pod IPs via the Kubernetes API, while readiness probes ensure only live pods are advertised.

#### Secure Communication

Default cluster-wide pod connectivity exposes "east-west" threats. Compromised workloads can scan internal services, and encrypting traffic (for example, mTLS) adds CPU overhead. Network Policies enforce segmentation (for example, isolating PCI-compliant services), and service meshes automate encryption without app changes.

#### Performance at Scale

Large clusters strain legacy tooling. `iptables` rules explode with thousands of services, slowing packet processing. Overlay networks (for example, VXLAN) fragment packets, and centralized load balancers bottleneck traffic. Modern CNIs (Cilium/eBPF, Calico/BGP) bypass kernel bottlenecks, while IPVS replaces `iptables` for O(1) lookups.

---

## Core Concepts in Kubernetes Networking

### What are Pods and Nodes?

Pods are the smallest deployable units. Each pod runs on a node, which could be a virtual or physical machine.

#### Scenario Example: Web Application Deployment

A typical web application might have:

- Three frontend pods running NGINX (distributed across two nodes)
- Five backend API pods running Node.js (distributed across three nodes)
- Two database pods running PostgreSQL (on dedicated nodes with SSD storage)

```sh
# View pods distributed across nodes
kubectl get pods -o wide
# 
# NAME                        READY   STATUS    NODE
# frontend-6f4d85b5c9-1p4z2   1/1     Running   worker-node-1
# frontend-6f4d85b5c9-2m5x3   1/1     Running   worker-node-1
# frontend-6f4d85b5c9-3n6c4   1/1     Running   worker-node-2
# backend-7c8d96b6b8-4q7d5    1/1     Running   worker-node-2
# backend-7c8d96b6b8-5r8e6    1/1     Running   worker-node-3
# ...
```

### What are Services?

Services expose pods using selectors. They provide a stable network identity even as pod IPs change.

```sh
kubectl expose pod nginx-pod \
--port=80 \
--target-port=80 \
--name=nginx-service
```

#### Scenario Example: Database Service Migration

A team needs to migrate their database from MySQL to PostgreSQL without disrupting application functionality:

::: tabs

@tab:active 1.

Deploy PostgreSQL pods alongside existing MySQL pods

@tab 2.

Create a database service that initially selects only MySQL pods:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: database-service
spec:
  selector:
    app: mysql
  ports:
  - port: 3306
    targetPort: 3306
```

@tab 3.

Update application to be compatible with both databases

@tab 4.

Update the service selector to include both MySQL and PostgreSQL pods:

```yaml
selector:
  app: database  # New label applied to both MySQL and PostgreSQL pods
```

@tab 5.

Gradually remove MySQL pods while the service routes traffic to available PostgreSQL pods

:::

The service abstraction allows for zero-downtime migration by providing a consistent endpoint throughout the transition.

### Communication Paths

A **communication path** is simply the route that network traffic takes from its source to its destination within (or into/out of) the cluster. In Kubernetes, the three main paths are:

- **Pod-to-Pod:** Direct traffic between two pods (possibly on different nodes).
- **Pod-to-Service:** Traffic from a pod destined for a Kubernetes Service (which then load-balances to one of its backend pods).
- **External-to-Service:** Traffic originating outside the cluster (e.g. from an end-user or external system) directed at a Service (often via a LoadBalancer or Ingress).

#### Pod-to-Pod Communication

Pods communicate directly with each other using their IP addresses without NAT. For example:

```sh
kubectl exec -it pod-a -- ping pod-b
```

#### Scenario Example: Sidecar Logging

In a log aggregation setup, each application pod has a sidecar container that processes and forwards logs:

1. Application container writes logs to a shared volume
2. Sidecar container reads from the volume and forwards to a central logging service

```sh
# Check communication between application and sidecar
kubectl exec -it app-pod -c app -- ls -la /var/log/app
kubectl exec -it app-pod -c log-forwarder -- tail -f /var/log/app/application.log
```

Because both containers are in the same pod, they can communicate via `localhost` and shared volumes without any network configuration.

#### Pod-to-Service Communication

Pods communicate with services using DNS names, enabling load-balanced access to multiple pods:

```sh
kubectl exec -it pod-a -- curl http://my-service.default.svc.cluster.local
```

#### Scenario Example: API Gateway Pattern

A microservices architecture uses an API gateway pattern:

1. Frontend pods need to access fifteen or more backend microservices
2. Instead of tracking individual pod IPs, the frontend connects to service names:

```js
// Frontend code
const authService = 'http://auth-service.default.svc.cluster.local';
const userService = 'http://user-service.default.svc.cluster.local';
const productService = 'http://product-service.default.svc.cluster.local';

async function getUserProducts(userId) {
  const authResponse = await fetch(`${authService}/validate`);
  if (authResponse.ok) {
    const user = await fetch(`${userService}/users/${userId}`);
    const products = await fetch(`${productService}/products?user=${userId}`);
    return { user, products };
  }
}
```

Each service name resolves to a stable endpoint, even as the underlying pods are scaled, replaced, or rescheduled.

#### External-to-Service Communication

External communication is facilitated through service types like NodePort or LoadBalancer. An example of NodePort usage:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nodeport-service
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080
  selector:
    app: my-app
```

Now, this service can be accessed externally via:

```sh
curl http://<NodeIP>:30080
```

#### Scenario Example: Public-Facing Web Application

A company runs a public-facing web application that needs external access:

::: tabs

@tab:active 1.

Deploy the application pods with three replicas

@tab 2.

Create a LoadBalancer service to expose the application:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb  # Cloud-specific annotation
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: web-app
```

@tab 3.

When deployed on AWS, this automatically provisions a Network Load Balancer with a public IP

@tab 4.

External users access the application through the load balancer, which distributes traffic across all three pods

```sh
# Check the external IP assigned to the service
kubectl get service web-app
# 
# NAME     TYPE          CLUSTER-IP     EXTERNAL-IP        PORT(S)
# web-app  LoadBalancer  10.100.41.213  a1b2c3.amazonaws.com  80:32456/TCP
```

:::

---

## Cluster Networking Components

Kubernetes networking transforms abstract principles into reality through tightly orchestrated components. Central to this is the **Container Network Interface (CNI)**, a standardized specification that governs how network connectivity is established for containers.

### What is a Container Network Interface (CNI)?

At its essence, CNI acts as Kubernetes' networking plugin framework. It’s responsible for dynamically assigning IP addresses to pods, creating virtual network interfaces (like virtual Ethernet pairs), and configuring routes whenever a pod starts or stops.

Crucially, Kubernetes delegates these low-level networking operations to CNI plugins, allowing you to choose implementations aligned with your environment’s needs: whether that’s Flannel’s simple overlay networks for portability, Calico’s high-performance BGP routing for bare-metal efficiency, or Cilium’s eBPF-powered data plane for advanced security and observability.

Working alongside CNI, kube-proxy operates on every node, translating Service abstractions into concrete routing rules within the node’s kernel (using `iptables` or `IPVS`). Meanwhile, CoreDNS provides seamless service discovery by dynamically mapping human-readable names (for example, `cart-service.production.svc.cluster.local`) to stable Service IPs. Together, these components form a cohesive fabric, ensuring pods can communicate reliably whether they’re on the same node or distributed across global clusters.

### High-Level CNI Plugin Differences

- **Flannel:** Simple overlay (VXLAN, host-gw) for basic multi-host networking.
- **Calico:** Pure-L3 routing using BGP or IP-in-IP, plus rich network policies.
- **Cilium:** eBPF-based dataplane for ultra-fast packet processing and advanced features like API-aware policies.

These High-Level Plugins implement the CNI standard for managing pod IPs and routing.

```sh
kubectl get pods -n kube-system
```

#### Scenario Example: Multi-Cloud Deployment with Calico

A company operates a hybrid deployment across AWS and Azure:

::: tabs

@tab:acitve 1.

Choose Calico as the CNI plugin for consistent networking across clouds:

```sh
# Install Calico on both clusters
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

# Verify Calico pods are running
kubectl get pods -n kube-system -l k8s-app=calico-node
```

Calico provides:

- Consistent IPAM (IP Address Management) across both clouds
- Network policy enforcement in both environments
- BGP routing for optimized cross-node traffic

@tab 2.

When migrating workloads between clouds, the networking layer behaves consistently despite different underlying infrastructure.

:::

### What is kube-proxy?

kube-proxy is a network component that runs on each node and implements Kubernetes’ **Service** abstraction. Its responsibilities include:

- **Watching the API server** for Service and Endpoint changes.
- **Programming the node’s packet-filtering layer** (iptables or IPVS) so that traffic to a Service ClusterIP:port gets load-balanced to one of its healthy backend pods.
- **Handling session affinity,** if configured (so repeated requests from the same client go to the same pod).

By doing this per-node, `kube-proxy` ensures any pod on that node can reach any Service IP without needing a central gateway.

### What are iptables & IPVS?

Both iptables and IPVS are Linux kernel subsystems that `kube-proxy` can use to manage Service traffic:

#### iptables mode

`kube-proxy` generates a set of NAT rules (in the `nat` table) so that when a packet arrives for a Service IP, the kernel rewrites its destination to one of the backend pod IPs.

#### IPVS mode

IPVS (IP Virtual Server) runs as part of the kernel’s Netfilter framework. Instead of dozens or hundreds of iptables rules, it keeps a high-performance hash table of virtual services and real servers.

Here's the comparison of `iptables` and `IPVS` modes in a clean table format:

| **Mode** | **Pros** | **Cons** |
| --- | --- | --- |
| **iptables** | • Simple and universally available on Linux systems |  |
| • Battle-tested and easy to debug | • Rule complexity grows linearly with Services/Endpoints |  |
| • Packet processing slows at scale due to sequential rule checks |  |  |
| • Service updates trigger full rule reloads |  |  |
| **IPVS** | • O(1) lookup time regardless of cluster size |  |
| • Built-in load-balancing algorithms (RR, LC, SH) |  |  |
| • Incremental updates without full rule recomputation |  |  |
| • Lower CPU overhead for large clusters | • Requires Linux kernel ≥4.4 and IPVS modules loaded |  |
| • More complex initial configuration |  |  |
| • Limited visibility with traditional tool | | |

#### Scenario Example: Debugging Service Connectivity

When troubleshooting service connectivity issues in a production cluster:

::: tabs

@tab:active 1.

First, check if kube-proxy is functioning:

```sh
# Check kube-proxy pods
kubectl get pods -n kube-system -l k8s-app=kube-proxy

# Examine kube-proxy logs
kubectl logs -n kube-system kube-proxy-a1b2c
```

@tab 2.

Inspect the iptables rules created by kube-proxy on a node:

```sh
# Connect to a node
ssh worker-node-1

# View iptables rules for a specific service
sudo iptables-save | grep my-service
```

@tab 3.

The output reveals how traffic to ClusterIP 10.96.45.10 is load-balanced across multiple backend pod IPs:

```sh
-A KUBE-SVC-XYZAB12345 -m comment --comment "default/my-service" -m statistic --mode random --probability 0.33332 -j KUBE-SEP-POD1
-A KUBE-SVC-XYZAB12345 -m comment --comment "default/my-service" -m statistic --mode random --probability 0.50000 -j KUBE-SEP-POD2
-A KUBE-SVC-XYZAB12345 -m comment --comment "default/my-service" -j KUBE-SEP-POD3
```

:::

Understanding these rules helps diagnose why traffic might not be reaching certain pods.

---

## DNS and Service Discovery

Every service in Kubernetes relies on DNS to map a human-friendly name (for example, `my-svc.default.svc.cluster.local`) to its ClusterIP. When pods come and go, DNS records must update quickly so clients never hit stale addresses.

Kubernetes uses **CoreDNS** as a cluster DNS server. When you create a Service, an A record is added pointing to its ClusterIP. Endpoints (the pod IPs) are published as SRV (Service) records. If a pod crashes or is rescheduled, CoreDNS watches the Endpoints API and updates its records in near-real time.

::: important Key mechanics:

1. **Service A record →** ClusterIP
2. **Endpoint SRV records →** backend pod IPs & ports
3. **TTL tuning →** how long clients cache entries

**Why recovery matters:**

- A DNS TTL that’s too long can leave clients retrying an old IP.
- A TTL that’s too short increases DNS load.
- Readiness probes must signal “not ready” before CoreDNS removes a pod’s record.

:::

### CoreDNS

CoreDNS provides DNS resolution for services inside the cluster.

```sh
kubectl exec -it busybox -- nslookup nginx-service
```

Service discovery is automatic, using:

```sh
<service>.<namespace>.svc.cluster.local
```

#### Scenario Example: Microservices Environment Variables vs. DNS

A team is migrating from hardcoded environment variables to Kubernetes DNS:

::: tabs

@tab Before

Configuration via environment variables

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: order-service
spec:
  containers:
  - name: order-app
    image: order-service:v1
    env:
    - name: PAYMENT_SERVICE_HOST
      value: "10.100.45.12"
    - name: INVENTORY_SERVICE_HOST
      value: "10.100.67.34"
    - name: USER_SERVICE_HOST
      value: "10.100.23.78"
```

@tab After

Using Kubernetes DNS service discovery

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: order-service
spec:
  containers:
  - name: order-app
    image: order-service:v2
    env:
    - name: PAYMENT_SERVICE_HOST
      value: "payment-service.default.svc.cluster.local"
    - name: INVENTORY_SERVICE_HOST
      value: "inventory-service.default.svc.cluster.local"
    - name: USER_SERVICE_HOST
      value: "user-service.default.svc.cluster.local"
```

:::

When the team needs to relocate the payment service to a dedicated namespace for PCI compliance:

::: tabs

@tab:active 1.

Move payment service to "finance" namespace

@tab 2.

Update only one environment variable:

```yaml
- name: PAYMENT_SERVICE_HOST
  value: "payment-service.finance.svc.cluster.local"
```

@tab 3.

The application continues working without rebuilding container images or updating other services

:::

---

## Pod Networking Deep Dive

Under the hood, each pod has its own network namespace, virtual Ethernet (`veth`) pair, and an interface like `eth0`. The CNI plugin glues these into the cluster fabric.

When the kubelet creates a pod, it calls your CNI plugin:

1. **Allocates an IP** from a pool.
2. **Creates a** `veth` pair and moves one end into the pod’s netns.
3. **Programs routes** on the host so that other nodes know how to reach this IP.

### Namespaces and Virtual Ethernet

Each pod gets a Linux network namespace and connects to the host via a virtual Ethernet pair.

```sh
kubectl exec -it nginx-pod -- ip addr
```

#### Scenario Example: Debugging Network Connectivity

When troubleshooting connectivity issues between pods:

::: tabs

@tab:active 1.

Examine the network interfaces inside a pod:

```sh
kubectl exec -it web-frontend-pod -- ip addr
# 
# 1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
#     link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
#     inet 127.0.0.1/8 scope host lo
#     inet6 ::1/128 scope host
# 2: eth0@if18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc noqueue state UP group default
#     link/ether 82:cf:d8:e9:7a:12 brd ff:ff:ff:ff:ff:ff link-netnsid 0
#     inet 10.244.2.45/24 scope global eth0
#     inet6 fe80::80cf:d8ff:fee9:7a12/64 scope link
```

@tab 2.

Trace the path from pod to node:

```sh
# On the node hosting the pod
sudo ip netns list
# Shows namespace like: cni-1a2b3c4d-e5f6-7890-a1b2-c3d4e5f6g7h8

# Examine connections on the node
sudo ip link | grep veth
# Shows virtual ethernet pairs like: veth123456@if2: ...

# Check routes on the node
sudo ip route | grep 10.244.2.45
# Shows how traffic reaches the pod
```

:::

This investigation reveals how traffic flows from the pod through its namespace, via virtual ethernet pairs, then through the node's routing table to reach other pods.

### Shared Networking in Multi-Container Pods

Multi-container pods share the same network namespace. Use this for sidecar and helper containers.

#### Scenario Example: Service Mesh Sidecar

When implementing Istio service mesh with automatic sidecar injection:

::: tabs

@tab:active 1.

Deploy an application with Istio sidecar injection enabled:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: api-service
  annotations:
    sidecar.istio.io/inject: "true"
spec:
  containers:
  - name: api-app
    image: api-service:v1
    ports:
    - containerPort: 8080
```

@tab 2.

After deployment, the pod has two containers sharing the same network namespace:

```sh
kubectl describe pod api-service
# 
# Name:         api-service
# ...
# Containers:
#   api-app:
#     ...
#     Ports:          8080/TCP
#     ...
#   istio-proxy:
#     ...
#     Ports:          15000/TCP, 15001/TCP, 15006/TCP, 15008/TCP
#     ...
```

@tab 3.

The sidecar container intercepts all network traffic:

```sh
kubectl exec -it api-service -c istio-proxy -- netstat -tulpn
# 
# Active Internet connections (only servers)
# Proto Recv-Q Send-Q Local Address     Foreign Address     State       PID/Program name
# tcp        0      0 0.0.0.0:15001     0.0.0.0:*           LISTEN      1/envoy
# tcp        0      0 0.0.0.0:15006     0.0.0.0:*           LISTEN      1/envoy
```

@tab 4.

Traffic to the application container is transparently intercepted without requiring application changes:

```sh
kubectl exec -it api-service -c api-app -- curl localhost:8080
# Actually goes through the proxy even though it looks direct to the app
```

:::

This shared network namespace enables the service mesh to implement features like traffic encryption, routing, and metrics collection without application modifications.

---

## Services and Load Balancing

Kubernetes Services abstract a set of pods behind a single virtual IP. That virtual IP can be exposed in several ways:

A Service object defines a stable IP (ClusterIP), DNS entry, and a selector. kube-proxy then programs the node to intercept traffic to that IP and forward it to one of the pods.

### Service types

- **ClusterIP (default):** internal only
- **NodePort:** opens the Service on every node’s port (e.g. `30080`)
- **LoadBalancer:** asks your cloud provider for an external LB
- **ExternalName:** CNAME to an outside DNS name

### Load-balancing mechanics

- **kube-proxy + iptables/IPVS** (round-robin, least-conn)
- **External Ingress** (NGINX, Traefik) for HTTP/S with host/path routing

### 🔧 Service Types

| Type | Description |
| --- | --- |
| ClusterIP | Default, internal only |
| NodePort | Exposes service on node IP |
| LoadBalancer | Uses cloud provider LB |
| ExternalName | DNS alias for external service |

#### Scenario Example: Multi-Tier Application Exposure

A company runs a three-tier web application with different exposure requirements:

::: tabs

@tab 1. Frontend web tier

public-facing

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "arn:aws:acm:region:account:certificate/cert-id"
spec:
  type: LoadBalancer
  ports:
  - port: 443
    targetPort: 8080
  selector:
    app: frontend
```

@tab 2. API tier

internal to frontend only

```yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: ClusterIP  # Internal only
  ports:
  - port: 80
    targetPort: 8000
  selector:
    app: api
```

@tab 3. Database tier

internal to API only

```yaml
apiVersion: v1
kind: Service
metadata:
  name: db-service
spec:
  type: ClusterIP
  ports:
  - port: 5432
    targetPort: 5432
  selector:
    app: database
```

:::

This configuration creates a secure architecture where:

- Only the frontend is exposed to the internet (with TLS)
- The API is only accessible from the frontend pods within the cluster
- The database is only accessible from the API pods within the cluster

### Ingress Controllers

Ingress provides HTTP(S) routing and TLS termination.

```sh
helm install my-ingress ingress-nginx/ingress-nginx
```

#### Scenario Example: Hosting Multiple Applications on a Single Domain

A company hosts multiple microservices apps under the same domain with different paths:

::: tabs

@tab:active 1.

Deploy nginx-ingress controller:

```sh
helm install nginx-ingress ingress-nginx/ingress-nginx \
--set controller.publishService.enabled=true
```

@tab 2.

Configure routing for multiple services:

```yaml :collapsed-lines
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: company-apps
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - services.company.com
    secretName: company-tls
  rules:
  - host: services.company.com
    http:
      paths:
      - path: /dashboard
        pathType: Prefix
        backend:
          service:
            name: dashboard-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-gateway
            port:
              number: 80
      - path: /docs
        pathType: Prefix
        backend:
          service:
            name: documentation-service
            port:
              number: 80
```

@tab 3.

User traffic flow:

- User visits `https://services.company.com/dashboard`
- Traffic hits the LoadBalancer service for the ingress controller
- Ingress controller routes to the dashboard-service based on path
- Dashboard service load balances across dashboard pods

This allows hosting multiple applications behind a single domain and TLS certificate.

---

## Network Policies and Security

Network Policies restrict communication based on pod selectors and namespaces.

```yaml
policyTypes:
- Ingress

matchLabels:
  app: frontend
```

### Use Cases

- Isolate environments (for example, dev vs prod)
- Control egress to the internet
- Enforce zero-trust networking

#### Scenario Example: PCI Compliance for Payment Processing

A financial application processes credit card payments and must comply with PCI DSS requirements:

::: tabs

@tab:active 1.

Create dedicated namespace with strict isolation:

```sh
kubectl create namespace payment-processing
```

@tab 2.

Deploy payment pods to the isolated namespace:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-processor
  namespace: payment-processing
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payment
  template:
    metadata:
      labels:
        app: payment
        pci: "true"
    spec:
      containers:
      - name: payment-app
        image: payment-processor:v1
        ports:
        - containerPort: 8080
```

@tab 3.

Define network policy that:

- Only allows traffic from authorized services
- Blocks all egress except to specific APIs
- Monitors and logs all connection attempts

```yaml :collapsed-lines
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: pci-payment-policy
  namespace: payment-processing
spec:
  podSelector:
    matchLabels:
      pci: "true"
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          environment: production
    - podSelector:
        matchLabels:
          role: checkout
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - ipBlock:
        cidr: 192.168.5.0/24  # Payment gateway API
    ports:
    - protocol: TCP
      port: 443
  - to:
    - namespaceSelector:
        matchLabels:
          name: logging
    ports:
    - protocol: TCP
      port: 8125  # Metrics port
```

@tab 4.

Validate policy with connectivity tests:

```sh
# Test from authorized pod (should succeed)
kubectl exec -it -n production checkout-pod -- \
curl payment-processor.payment-processing.svc.cluster.local:8080

# Test from unauthorized pod (should fail)
kubectl exec -it -n default test-pod -- \
curl payment-processor.payment-processing.svc.cluster.local:8080
```

:::

This comprehensive network policy ensures that sensitive payment data is isolated and can only be accessed by authorized services.

---

## Common Pitfalls and Troubleshooting

### Pod Not Reachable

#### Symptom

`ping` or application traffic times out.

#### Steps to troubleshoot:

::: tabs

@tab:active 1.

Check pod status & logs:

```sh
kubectl get pod myapp-abc123 -o wide
kubectl logs myapp-abc123
```

@tab 2.

Inspect CNI plugin logs:

```sh
# e.g. for Calico on kube-system:
kubectl -n kube-system logs ds/calico-node
```

@tab 3.

Run a network debug container (netshoot):

```sh
kubectl run -it --rm netshoot --image=nicolaka/netshoot -- bash
# inside netshoot:
# ping <pod-IP>
# ip link show
# ip route show
```

:::

#### Why pods can be unreachable

IP allocation failures, misconfigured `veth`, MTU mismatch, CNI initialization errors.

### Service Unreachable

#### Symptom

Clients can’t hit the Service IP, or `curl` to `ClusterIP:port` fails.

#### Steps to troubleshoot:

::: tabs 1.

Verify Service and Endpoints:

```sh
kubectl get svc my-svc -o yaml
kubectl get endpoints my-svc -o wide
```

@tab 2.

Inspect kube-proxy rules:

```sh
# iptables mode:
sudo iptables-save | grep <ClusterIP>
# IPVS mode:
sudo ipvsadm -Ln
```

@tab 3.

Test connectivity from a pod:

```sh
kubectl exec -it netshoot -- \
curl -v http://<ClusterIP>:<port>
```

:::

#### Why services break

Missing endpoints (selector mismatch), stale kube-proxy rules, DNS entries pointing at wrong IP.

### Policy-Blocked Traffic

#### Symptom

Connections are actively refused or immediately reset.

#### Steps to troubleshoot:

::: tabs

@tab:active 1.

List NetworkPolicies in the namespace:

```sh
kubectl get netpol
```

@tab 2.

Describe the policy logic:

```sh
kubectl describe netpol allow-frontend
```

@tab 3.

Simulate allowed vs. blocked flows:

```sh
# From a debug pod:
kubectl exec -it netshoot -- \
curl --connect-timeout 2 http://<target-pod-IP>:<port>
```

#### Why policies bite you

Default “deny” behavior in some CNI plugins, overly strict podSelector or namespaceSelector, missing egress rules.

### 🔍 Tools you can use:

- **kubectl exec:** Run arbitrary commands **inside any pod**. It’s ideal for running `ping`, `curl`, `ip`, or `tcpdump` from the pod’s own network namespace.
- **tcpdump:** Capture raw packets on an interface. Use it (inside netshoot or via `kubectl exec`) to see if traffic actually leaves/arrives at a pod.
- **Netshoot:** A utility pod image packed with networking tools (`ping`, `traceroute`, `dig`, `curl`, `tcpdump`, and so on) so you don’t have to build your own.
- **Cilium Hubble:** An observability UI/API for **Cilium** that shows per-connection flows, L4/L7 metadata, and policy verdicts in real time.
- **Calico Flow Logs:** Calico’s **eBPF-based** logging of allow/deny decisions and packet metadata. It’s great for auditing exactly which policy rule matched a given packet.

#### Scenario Example: Troubleshooting Service Connection Issues

A team is experiencing intermittent connection failures to a database service:

::: tabs

@tab:active 1.

Check if the service exists and has endpoints:

```sh
kubectl get service postgres-db
# 
# NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
# postgres-db  ClusterIP   10.96.145.232   <none>        5432/TCP   3d
# 
# kubectl get endpoints postgres-db
# NAME         ENDPOINTS                                   AGE
# postgres-db  <none>                                      3d
```

@tab 2.

The service exists but has no endpoints. Check pod selectors:

```sh
kubectl describe service postgres-db
#
# Name:              postgres-db
# Namespace:         default
# Selector:          app=postgres,tier=db
# ...
# 
# kubectl get pods --selector=app=postgres,tier=db
# No resources found in default namespace.
```

@tab 3.

Inspect the database pods:

```sh
kubectl get pods -l app=postgres
#
# NAME                        READY   STATUS    RESTARTS   AGE
# postgres-6b4f87b5c9-8p7x2   1/1     Running   0          3d
# 
# kubectl describe pod postgres-6b4f87b5c9-8p7x2
# ...
# Labels:       app=postgres
#               pod-template-hash=6b4f87b5c9
# ...
```

@tab 4.

Found the issue: The pod has label `app=postgres` but missing the `tier=db` label required by the service selector.

@tab 5.

Fix by updating the service selector:

```sh
kubectl patch service postgres-db \
-p '{"spec":{"selector":{"app":"postgres"}}}'
```

@tab 6.

Verify endpoints are now populated:

```sh
kubectl get endpoints postgres-db
# 
# NAME         ENDPOINTS             AGE
# postgres-db  10.244.2.45:5432      3d
```

:::

This systematic debugging approach quickly identified a label mismatch causing the connection issues.

---

## Summary

In this tutorial, you explored:

- Pod and service communication
- Cluster-wide routing and discovery
- Load balancing and ingress
- Network policy configuration

As always, I hope you enjoyed the article and learned something new. If you want, you can also follow me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`destiny-erhabor`)](https://linkedin.com/in/destiny-erhabor) or [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`caesar_sage`)](https://twitter.com/caesar_sage).

For more hands-on projects, follow and star this repository: [<FontIcon icon="iconfont icon-github"/>`Caesarsage/Learn-DevOps-by-building` | networking-concepts-practice](https://github.com/Caesarsage/Learn-DevOps-by-building/blob/main/intermediate/k8/networking-concepts-practice/README.md)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Kubernetes Networking Tutorial: A Guide for Developers",
  "desc": "Kubernetes networking is one of the most critical and complex parts of running containerized workloads in production. It’s what allows different parts of a Kubernetes system - like containers and services - to talk to each other. This tutorial will w...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/kubernetes-networking-tutorial-for-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
