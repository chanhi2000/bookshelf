---
lang: en-US
title: "Kubernetes Networking Explained: From ClusterIP to Cilium Service Mesh"
description: "Article(s) > Kubernetes Networking Explained: From ClusterIP to Cilium Service Mesh"
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
      content: "Article(s) > Kubernetes Networking Explained: From ClusterIP to Cilium Service Mesh"
    - property: og:description
      content: "Kubernetes Networking Explained: From ClusterIP to Cilium Service Mesh"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/kubernetes-networking-explained-from-clusterip-to-cilium-service-mesh.html
prev: /devops/k8s/articles/README.md
date: 2026-08-22
isOriginal: false
author:
  - name: Ayobami Adejumo
    url: https://freecodecamp.org/news/author/aayostem/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/425eabfd-bd40-4c0d-b6c3-4f1f7bd53caa.png
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
  name="Kubernetes Networking Explained: From ClusterIP to Cilium Service Mesh"
  desc="Here's something that most Kubernetes tutorials won't tell you: most engineers can run kubectl expose. Fewer than 10% understand what happens when they do. I've debugged Kubernetes networking issues a"
  url="https://freecodecamp.org/news/kubernetes-networking-explained-from-clusterip-to-cilium-service-mesh"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/425eabfd-bd40-4c0d-b6c3-4f1f7bd53caa.png"/>

Here's something that most Kubernetes tutorials won't tell you: most engineers can run `kubectl expose`. Fewer than 10% understand what happens when they do.

I've debugged Kubernetes networking issues at more than 10 companies. The same knowledge gaps appear every time. Engineers don't understand how ClusterIP works under the hood. They don't understand why Pods in different namespaces can talk to each other by default. And they don't understand what a CNI plugin actually does at the kernel level.

This tutorial is the fix. You'll learn how Kubernetes networking works from the bottom up: how Pod IPs are assigned and why they work across nodes, how kube-proxy implements ClusterIP using iptables rules, how Ingress controllers route external traffic through a single load balancer, how Network Policies enforce micro-segmentation for SOC2 compliance, and how Cilium uses eBPF to replace all of this with a faster, more observable, and more secure alternative.

By the end of this guide, you'll be able to debug "why can't my pod talk to that service?", implement default-deny Network Policies that satisfy SOC2 CC6.1, and choose the right CNI for your cluster with confidence.

::: info What You'll Learn

- Pod IPs, the container network model, and how the CNI assigns addresses
- How kube-proxy implements ClusterIP with iptables and why eBPF is faster
- Ingress controllers: routing all external traffic through a single load balancer
- Network Policies: default-deny and per-service allow rules for zero-trust networking
- CNI comparison: Cilium vs Calico vs AWS VPC CNI and when to use each
- Service mesh: Cilium vs Istio vs Linkerd for mTLS and observability

:::

Let's dive in.

::: note Prerequisites

Before following along, you should have:

**Knowledge:**

- Basic Kubernetes familiarity: you can deploy a Pod and create a Service
- Basic Linux networking concepts: you know what an IP address and a port are
- A general understanding of what a load balancer does

**Tools and access:**

- A running Kubernetes cluster (EKS, GKE, or a local cluster via [<VPIcon icon="fas fa-globe"/>kind](https://kind.sigs.k8s.io/))
- `kubectl` configured and pointing at your cluster
- `helm` 3 installed (for Cilium installation in Part 4)
- For Part 4 onwards: Cilium installed on your cluster (`helm install cilium cilium/cilium`)

A note on CNI: Parts 1–3 apply to any Kubernetes cluster regardless of CNI. Parts 4–6 use Cilium-specific resources (`CiliumNetworkPolicy`, Hubble). If you're on a different CNI, the concepts are identical and only the YAML syntax differs.

:::

---

## Part 1: Pod IPs and the Container Network Model

### 1.1 Why Every Pod Gets Its Own IP

The Kubernetes networking model has one foundational rule: every Pod gets its own unique IP address, and every Pod can communicate with every other Pod using those IPs – without Network Address Translation (NAT).

This is different from how Docker works by default, where containers share the host network or use port mapping. In Kubernetes, there's no port mapping between pods. Pod A at IP `10.244.1.2` can directly reach Pod B at `10.244.2.3` across a different node, and the source IP is preserved.

Verify this for your cluster:

```sh
# List all pods across all namespaces with their IP addresses and node placement
kubectl get pods -o wide --all-namespaces
#
# NAMESPACE     NAME                                READY   STATUS    IP            NODE
# production    payment-api-5d6b8d8c4f-abc12        1/1     Running   10.244.1.2    node-1
# production    user-api-5d6b8d8c4f-def34           1/1     Running   10.244.2.3    node-2
# production    redis-master-0                      1/1     Running   10.244.1.4    node-1
```

Each pod has a unique IP. The payment-api on node-1 and the user-api on node-2 can reach each other directly at those IPs. Notice that the IPs come from the `10.244.0.0/16` CIDR: this is the Pod network, separate from the node network.

### 1.2 What the CNI Plugin Actually Does

The Container Network Interface (CNI) is the plugin responsible for making the Kubernetes networking model work. When a new Pod is scheduled on a node, the Kubernetes kubelet calls the CNI plugin, which performs four operations:

1. Creates a new network namespace for the Pod: an isolated networking environment
2. Creates a virtual Ethernet pair (`veth`): one end inside the Pod's namespace, one end on the node
3. Assigns an IP address from the cluster's Pod CIDR to the Pod's end of the veth pair
4. Adds routing rules so the node knows how to reach every Pod IP in the cluster

Without the CNI, pods would have no network connectivity. With it, the flat Pod network model becomes reality.

Check which CNI plugin is installed on your cluster:

```sh
# List the CNI binaries installed on a node
ls /opt/cni/bin/
```

Here are some common CNI plugins and when to use each:

| CNI | Default on? | Primary Use Case |
| --- | --- | --- |
| AWS VPC CNI | Yes (EKS) | Pods get real VPC IPs. Best for AWS-native integration |
| Calico | No | Advanced network policies with BGP routing |
| Cilium | No | eBPF-based networking, Layer 7 policies, service mesh, SOC2 evidence |

### 1.3 Verifying Pod-to-Pod Communication

The most fundamental networking test: exec into one Pod and ping another by IP.

```sh
# Step 1: Get the IP of a target pod
TARGET_IP=$(kubectl get pod redis-master-0 -o jsonpath='{.status.podIP}')
echo "Target IP: $TARGET_IP"

# Step 2: Exec into another pod and ping the target
kubectl exec -it payment-api-5d6b8d8c4f-abc12 -- ping -c 3 $TARGET_IP
#
# PING 10.244.1.4 (10.244.1.4): 56 data bytes
# 64 bytes from 10.244.1.4: icmp_seq=0 ttl=62 time=0.8ms
# 64 bytes from 10.244.1.4: icmp_seq=1 ttl=62 time=0.7ms
# 64 bytes from 10.244.1.4: icmp_seq=2 ttl=62 time=0.9ms
```

If this succeeds, the CNI is working correctly. If it fails, check whether a Network Policy is blocking ICMP traffic (Part 4 covers this).

The one rule to remember: every Pod gets an IP. Pods can communicate directly using those IPs. The CNI plugin makes both of these things true.

---

## Part 2: Services — ClusterIP, NodePort, and LoadBalancer

### 2.1 The Problem: Pod IPs Are Not Stable

Pod IPs change every time a Pod restarts. If you deploy a new version of your payment API, the old Pods are deleted and new Pods are created with new IPs. Any service that was configured to call the old IPs now has dead references.

Here's the incorrect approach: hardcoding a Pod IP.

```yaml
# Bad: Direct Pod IP in application configuration
# This IP will stop working the next time the database Pod restarts
apiVersion: v1
kind: Pod
metadata:
  name: payment-api
spec:
  containers:
  - name: api
    env:
    - name: DATABASE_HOST
      value: "10.244.1.4"  # Pod IP — will change on next restart
```

This is fragile in development and catastrophic in production. A routine Pod restart – from a node drain, an OOM kill, or a deployment rollout – will break any application that hardcoded the old IP.

### 2.2 How Services Solve the Stability Problem

A Kubernetes Service provides two things that Pod IPs can't: a stable IP address (the ClusterIP) that never changes as long as the Service exists, and a stable DNS name that other Pods can use regardless of the IP.

When you create a Service, Kubernetes assigns it a virtual ClusterIP from the service CIDR (for example, `10.100.0.0/16`), creates a DNS record in CoreDNS as `<service-name>.<namespace>.svc.cluster.local`, and configures kube-proxy on every node to add iptables rules that load-balance traffic from the ClusterIP to the healthy Pod IPs behind it.

Here's the correct implementation: a ClusterIP Service.

```yaml
# Good: ClusterIP Service provides a stable IP and DNS name
# redis.production.svc.cluster.local always resolves to 10.100.0.1
# regardless of which Redis pods are running behind it
apiVersion: v1
kind: Service
metadata:
  name: redis
  namespace: production
spec:
  selector:
    app: redis
    role: master   # Only pods with these labels receive traffic
  ports:
  - port: 6379        # Port the Service listens on
    targetPort: 6379  # Port the Pod actually runs on
  type: ClusterIP     # Default: accessible only inside the cluster
```

How kube-proxy implements the load balancing using iptables: when a Service is created, kube-proxy adds iptables rules to every node in the cluster. These rules intercept traffic destined for the ClusterIP and redirect it to one of the healthy Pod IPs. Run this on a node to see the rules in action:

```sh
# View the iptables rules kube-proxy created for the redis Service
# Each KUBE-SEP entry represents one Pod endpoint
sudo iptables -t nat -L KUBE-SERVICES | grep redis
#
# Chain KUBE-SVC-REDIS (1 references)
# target          prot  source    destination
# KUBE-SEP-AAA    all   anywhere  anywhere    /* production/redis */ statistic mode random probability 0.50
# KUBE-SEP-BBB    all   anywhere  anywhere    /* production/redis */
```

Traffic to the Redis ClusterIP is distributed 50/50 between the two Pod endpoints via these iptables rules. When a Pod restarts and gets a new IP, kube-proxy updates the rules automatically.

### 2.3 When to Use Each Service Type

| Type | DNS Name | Accessible From | Use Case |
| --- | --- | --- | --- |
| ClusterIP | `redis.production.svc.cluster.local` | Inside the cluster only | Databases, caches, internal APIs |
| NodePort | `<node-ip>:30000–32767` | Node IP + port | Local development, debugging |
| LoadBalancer | AWS ELB DNS name | Internet (via cloud load balancer) | External APIs, web applications |

Verify a Service is routing traffic correctly:

```sh
# Describe a Service to see its endpoints (the actual Pod IPs behind it)
kubectl describe service redis -n production
#
# Name:              redis
# Namespace:         production
# Type:              ClusterIP
# IP:                10.100.0.1
# Port:              6379/TCP
# TargetPort:        6379/TCP
# Endpoints:         10.244.1.4:6379,10.244.2.5:6379
# Session Affinity:  None
```

If `Endpoints` shows `<none>`, the Service selector doesn't match any running Pods. This is the most common cause of "connection refused" errors in Kubernetes.

The one rule to remember is that pods should always connect to Service DNS names, never to Pod IPs. The Service handles stability, load balancing, and health checking automatically.

---

## Part 3: Ingress — External Traffic Routing

### 3.1 The Problem: A LoadBalancer Service Per Microservice Is Expensive

Each `LoadBalancer` Service creates a dedicated cloud load balancer. On AWS, each Application Load Balancer costs approximately \\(0.008/LCU-hour plus \\)0.0225/hour base charge. That's roughly $16–27/month per load balancer.

At 20 microservices, that's $320–$540/month in load balancer charges alone, plus $0.008/LCU for each request processed.

Here's the incorrect approach with one LoadBalancer per microservice:

```yaml
# Bad: This creates a new AWS ALB every time it is applied
# 20 microservices = 20 ALBs = $300-500/month before any traffic charges
apiVersion: v1
kind: Service
metadata:
  name: payment-api
spec:
  type: LoadBalancer   # Creates a dedicated ALB
  ports:
  - port: 80
    targetPort: 8080
```

### 3.2 How an Ingress Controller Solves This

An Ingress controller is a Pod running inside your cluster that watches for `Ingress` resources and programs a single external load balancer to route traffic to multiple Services based on the hostname and URL path.

The AWS Load Balancer Controller, for example, creates one ALB for all your Ingress resources and programs its listener rules to route `api.company.com/payments` to the payment Service and `api.company.com/users` to the user Service, all through the same load balancer.

Here's the correct implementation: one Ingress for all services.

```yaml :collapsed-lines
# Good: One Ingress resource routes all external traffic
# One ALB is created total, regardless of how many services are listed
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: shared-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS": 443}]'
    alb.ingress.kubernetes.io/ssl-redirect: "443"
spec:
  rules:
  - host: api.company.com
    http:
      paths:
      - path: /payments
        pathType: Prefix
        backend:
          service:
            name: payment-service
            port:
              number: 8080
      - path: /users
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 8080
  - host: dashboard.company.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: dashboard-service
            port:
              number: 3000
  tls:
  - hosts:
    - api.company.com
    - dashboard.company.com
    secretName: tls-wildcard-cert
```

Verify the Ingress is provisioned and the ALB DNS name is assigned:

```sh
# Watch until the ADDRESS column shows the ALB DNS name (typically 2-3 minutes)
kubectl get ingress shared-ingress -n production -w
#
# NAME             CLASS   HOSTS                                    ADDRESS                                              PORTS
# shared-ingress   alb     api.company.com,dashboard.company.com   k8s-prod-sharedin-abc123.us-east-1.elb.amazonaws.com   80, 443
```

The cost difference:

| Approach | Load balancers | Monthly cost |
| --- | --- | --- |
| LoadBalancer Service per microservice (20 services) | 20 ALBs | ~$400/month |
| Single Ingress controller | 1 ALB | ~$27/month |

The one rule to remember: one Ingress controller with path-based routing serves all your services through a single load balancer. The per-service LoadBalancer approach is for early prototyping only.

---

## Part 4: Network Policies — Micro-Segmentation

### 4.1 The Default: Every Pod Can Talk to Every Other Pod

Out of the box, Kubernetes applies no network restrictions between Pods. A frontend Pod can make direct API calls to a database Pod. An analytics service can query the payment database. A compromised Pod can scan every other Pod in the cluster.

This isn't secure. For SOC2 CC6.1 (logical access controls), HIPAA, and most enterprise security frameworks, you need to be able to prove that network traffic is restricted to what's necessary.

Verify that unrestricted traffic is currently possible:

```sh
# Without Network Policies, this call from the frontend to the payment DB will succeed
# It should not be allowed in a secure cluster
kubectl exec -it frontend-pod -n production -- \
curl http://payment-postgres.production.svc.cluster.local:5432
```

If this succeeds on your cluster, you have no network segmentation.

### 4.2 The Solution: Default-Deny with Cilium Network Policies

The correct approach is default-deny: block all traffic between Pods first, then explicitly allow only the specific communication paths that your application requires.

#### Step 1 — Apply the default-deny policy:

```yaml
# This policy applies to all pods in the namespace (empty endpointSelector matches all)
# It blocks all ingress and egress traffic by default
# Warning: apply this and all pod-to-pod communication immediately stops
# Have your allow rules ready before applying this in production
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  description: "Block all inter-pod traffic by default — zero-trust baseline"
  endpointSelector: {}  # Matches all pods in this namespace
  ingress:
  - {}                  # Empty ingress rule = deny all inbound
  egress:
  - {}                  # Empty egress rule = deny all outbound
```

Applying the default-deny policy will break all pod-to-pod communication in the namespace immediately. Apply your allow rules (below) in the same `kubectl apply` command, or apply allow rules first.

#### Step 2 — Add namespace-level isolation:

```yaml
# Allow pods to communicate within the same namespace
# Block cross-namespace traffic by default
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: allow-same-namespace
  namespace: production
spec:
  endpointSelector: {}
  ingress:
  - fromEndpoints:
    - matchLabels:
        io.kubernetes.pod.namespace: production
  egress:
  - toEndpoints:
    - matchLabels:
        io.kubernetes.pod.namespace: production
```

#### Step 3 — Add per-service allow rules:

```yaml
# Grant the payment service only the specific network access it needs
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: payment-service-network-policy
  namespace: production
spec:
  endpointSelector:
    matchLabels:
      app: payment-service
  egress:
  # Allow: payment-service → postgres on port 5432
  - toEndpoints:
    - matchLabels:
        app: postgres-db
    toPorts:
    - ports:
      - port: "5432"
        protocol: TCP
  # Allow: payment-service → Stripe API externally
  - toFQDNs:
    - matchName: "api.stripe.com"
    toPorts:
    - ports:
      - port: "443"
        protocol: TCP
```

### 4.3 Using Hubble to Verify Policies and Collect SOC2 Evidence

Cilium includes Hubble, a network observability tool that shows you exactly which flows are being allowed and which are being dropped by your Network Policies. Hubble is your SOC2 evidence that network segmentation is operating correctly.

```sh
# Install the Hubble CLI
export HUBBLE_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/hubble/master/stable.txt)
curl -L --remote-name-all https://github.com/cilium/hubble/releases/download/$HUBBLE_VERSION/hubble-linux-amd64.tar.gz
tar xzvf hubble-linux-amd64.tar.gz
sudo mv hubble /usr/local/bin/

# Port-forward to the Hubble relay
kubectl port-forward -n kube-system svc/hubble-relay 4245:80 &

# Show all flows in the production namespace from the last hour
hubble observe --namespace production --since 1h

# Show only dropped flows — proves policies are blocking unauthorised traffic
hubble observe --namespace production --verdict DROPPED --since 1h
```

Example Hubble output showing a blocked connection attempt:

```text
Apr 19 03:17:41.234   DROPPED   TCP   10.244.1.5:52341 → 10.244.1.4:5432   policy-deny
Apr 19 03:17:41.235   ALLOWED   TCP   10.244.1.2:43211 → 10.244.1.4:5432   allow-same-namespace
```

The first line shows an unauthorized connection attempt blocked. The second shows a legitimate connection allowed. Export this log daily to your SOC2 evidence bucket.

The one rule to remember: default-deny is the zero-trust baseline. Then add explicit allow rules for every required communication path. Hubble gives you the evidence that it's working.

---

## Part 5: CNI Comparison — Cilium vs Calico vs AWS VPC CNI

Choosing the right CNI is a decision that's difficult to reverse. Migrating between CNIs requires draining and replacing every node in the cluster. Make the decision once, for the right reasons.

Here's a real comparison across the capabilities that matter for production EKS clusters:

| Capability | AWS VPC CNI | Calico | Cilium |
| --- | --- | --- | --- |
| Pod IPs from VPC CIDR | ✅ Yes | ❌ No (overlay network) | ❌ No (overlay network) |
| Basic network policies | ✅ Yes (Kubernetes standard) | ✅ Yes | ✅ Yes |
| Layer 7 policies (HTTP path, gRPC method) | ❌ No | ❌ No | ✅ Yes |
| eBPF dataplane | ❌ No | ❌ No | ✅ Yes |
| Hubble flow observability | ❌ No | ❌ No | ✅ Yes |
| Service mesh (mTLS without sidecar) | ❌ No | ❌ No | ✅ Yes |
| SOC2 network evidence built in | ❌ No | ❌ No | ✅ Yes (Hubble) |
| Performance overhead | Low | Medium | Very Low (eBPF bypasses iptables) |
| AWS-native integration | ✅ Best | Medium | Medium |

The recommendation matrix:

| Your Situation | Recommended CNI |
| --- | --- |
| Simple EKS cluster, AWS-native tooling, no advanced policies | AWS VPC CNI |
| Need network policies but no Layer 7 or observability | Calico |
| Need SOC2 compliance with pod-level isolation evidence | Cilium |
| Need service mesh without sidecar proxy overhead | Cilium |
| Need Layer 7 network policies (allow GET /health, deny POST /admin) | Cilium |

The one rule to remember: for SOC2 compliance and zero-trust networking on EKS, Cilium is the right choice. It provides pod-level isolation, Layer 7 policies, and Hubble flow logs that serve as audit evidence. These are capabilities no other CNI provides together.

---

## Part 6: Service Mesh — Cilium vs Istio vs Linkerd

### 6.1 What a Service Mesh Provides

A service mesh adds three capabilities to your cluster's networking that Kubernetes doesn't provide natively.

mTLS (mutual TLS) encrypts communication between every pair of services and verifies both sides' identities. Without mTLS, traffic between your payment service and your database travels in plaintext inside the cluster.

Traffic observability tracks request rates, latency percentiles, and error rates for every service-to-service call, giving you a real-time performance map of your application.

Traffic management controls how traffic flows: retries on failure, timeouts, circuit breaking when a downstream service is degraded, and traffic splitting for canary deployments.

### 6.2 The Sidecar Problem

Traditional service meshes (like Istio and Linkerd) inject a sidecar proxy container into every Pod. This sidecar intercepts all network traffic and applies the mesh policies. The problem is resource overhead: Istio's Envoy sidecar adds approximately 128MB of memory and 5–10% latency overhead per Pod.

On a cluster with 200 Pods, Istio sidecars add 25.6GB of memory overhead and measurable latency to every service call.

Cilium solves this differently. It implements the service mesh at the kernel level using eBPF without any sidecar at all.

### 6.3 The Full Comparison

| Capability | Cilium | Istio | Linkerd |
| --- | --- | --- | --- |
| Sidecar required | ❌ No (eBPF kernel) | ✅ Yes (Envoy, ~128MB/pod) | ✅ Yes (Rust proxy, ~10MB/pod) |
| Memory overhead per pod | 0 MB | ~128 MB | ~10 MB |
| Latency overhead | <1% | 5–10% | 2–3% |
| mTLS | ✅ Yes | ✅ Yes | ✅ Yes |
| Traffic management (canary, circuit breaking) | Limited | ✅ Full | ✅ Full |
| Built-in flow observability (Hubble) | ✅ Yes | ❌ Requires Kiali | ❌ Requires Buoyant Cloud |
| SOC2 evidence natively | ✅ Yes | ❌ Additional tooling | ❌ Additional tooling |
| Setup complexity | Low | High | Medium |

The recommendation matrix:

| Your Situation | Recommended Service Mesh |
| --- | --- |
| Need mTLS and SOC2 evidence with minimal resource overhead | Cilium |
| Need advanced traffic management: canary, circuit breaking, weighted routing | Istio |
| Need lightweight mTLS without Istio's operational complexity | Linkerd |
| Running a cluster with hundreds of pods where sidecar overhead is a budget concern | Cilium |

Enable Cilium's service mesh mode (no sidecars required):

```sh
# Upgrade your Cilium installation to enable service mesh features
helm upgrade cilium cilium/cilium \
--namespace kube-system \
--reuse-values \
--set envoy.enabled=true \
--set ingressController.enabled=true

# Verify the service mesh is active
cilium status | grep "Service Mesh"
```

The one rule to remember: Cilium gives you mTLS and SOC2 evidence with zero sidecar overhead. For teams that need advanced traffic management or complex canary release patterns, Istio provides more control at the cost of higher operational complexity.

---

## Best Practices for Kubernetes Networking

✅ **Do:** Use Services, not Pod IPs. Pod IPs change on every restart. Service DNS names never change.

✅ **Do:** Use a single Ingress controller with path-based routing. One ALB serves all your services and saves $300–$400/month versus per-service LoadBalancer.

✅ **Do:** Implement default-deny Network Policies with Cilium. This is the technical control required by SOC2 CC6.1. ✅ **Do:** Use Hubble flow logs as SOC2 evidence. Export daily dropped-flow logs to your evidence bucket.

✅ **Do:** Enable mTLS with Cilium for encrypted service-to-service communication. No sidecar required.

✅ **Do:** Use topology-aware routing to keep traffic within the same Availability Zone and reduce cross-AZ data transfer costs.

❌ **Don't:** Create a LoadBalancer Service for every microservice. Use Ingress for external routing.

❌ **Don't:** Rely on Security Groups alone for pod-level isolation. Security Groups work at the node level. Any pod on a node shares the node's security group. Network Policies work at the pod level.

❌ **Don't:** Assume the default "allow all" pod networking is secure. Apply default-deny before your first enterprise customer asks for your network segmentation diagram.

---

## Resources

- [**Cilium Documentation**](https://docs.cilium.io/): Official Cilium installation guide, CiliumNetworkPolicy reference, and Hubble observability documentation
- [**Cilium Service Mesh Guide**](https://docs.cilium.io/en/stable/network/servicemesh/): How to enable mTLS and Layer 7 policies without sidecars
- [<VPIcon icon="iconfont icon-k8s"/>**Kubernetes Network Policy Documentation**](https://kubernetes.io/docs/concepts/services-networking/network-policies/): The standard Kubernetes NetworkPolicy API reference
- [**AWS Load Balancer Controller**](https://kubernetes-sigs.github.io/aws-load-balancer-controller/): Official documentation for the Ingress controller that provisions AWS ALBs from Kubernetes Ingress resources
- [**Hubble CLI Installation** (<VPIcon icon="iconfont icon-github"/>`cilium/hubble`)](https://github.com/cilium/hubble/releases): Install the Hubble CLI for observing Cilium network flows
- [<VPIcon icon="iconfont icon-k8s"/>**kube-proxy iptables mode**](https://kubernetes.io/docs/reference/networking/virtual-ips/): Kubernetes documentation explaining how kube-proxy implements Service routing using iptables
- [**Kubernetes CNI Plugin Specification** (<VPIcon icon="iconfont icon-github"/>`containernetworking/cni`)](https://github.com/containernetworking/cni): The CNI interface specification that all CNI plugins implement
- [**AWS VPC CNI Plugin GitHub** (<VPIcon icon="iconfont icon-github"/>`aws/amazon-vpc-cni-k8s`)](https://github.com/aws/amazon-vpc-cni-k8s): Source code and documentation for the default EKS networking plugin
- [**Companion Repository** (<VPIcon icon="iconfont icon-github"/>`aayostem/platform-toolkit`)](https://github.com/aayostem/platform-toolkit): CiliumNetworkPolicy manifests and Hubble evidence export scripts from this guide

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Kubernetes Networking Explained: From ClusterIP to Cilium Service Mesh",
  "desc": "Here's something that most Kubernetes tutorials won't tell you: most engineers can run kubectl expose. Fewer than 10% understand what happens when they do. I've debugged Kubernetes networking issues a",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/kubernetes-networking-explained-from-clusterip-to-cilium-service-mesh.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
