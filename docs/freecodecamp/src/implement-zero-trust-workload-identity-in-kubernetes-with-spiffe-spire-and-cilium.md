---
lang: en-US
title: "How to Implement Zero-Trust Workload Identity in Kubernetes with SPIFFE, SPIRE, and Cilium"
description: "Article(s) > How to Implement Zero-Trust Workload Identity in Kubernetes with SPIFFE, SPIRE, and Cilium"
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
      content: "Article(s) > How to Implement Zero-Trust Workload Identity in Kubernetes with SPIFFE, SPIRE, and Cilium"
    - property: og:description
      content: "How to Implement Zero-Trust Workload Identity in Kubernetes with SPIFFE, SPIRE, and Cilium"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/implement-zero-trust-workload-identity-in-kubernetes-with-spiffe-spire-and-cilium.html
prev: /devops/k8s/articles/README.md
date: 2026-07-08
isOriginal: false
author:
  - name: Destiny Erhabor
    url: https://freecodecamp.org/news/author/CaesarSage/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4e87cffb-7972-4dcd-a705-480154778907.png
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
  name="How to Implement Zero-Trust Workload Identity in Kubernetes with SPIFFE, SPIRE, and Cilium"
  desc="Your network policy says: allow traffic from 10.0.1.45. Yesterday, 10.0.1.45 was your payment service. Today, after a rolling deployment, it's your logging agent. Your payment service is now at 10.0.1"
  url="https://freecodecamp.org/news/implement-zero-trust-workload-identity-in-kubernetes-with-spiffe-spire-and-cilium"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4e87cffb-7972-4dcd-a705-480154778907.png"/>

Your network policy says: allow traffic from `10.0.1.45`.

Yesterday, `10.0.1.45` was your payment service. Today, after a rolling deployment, it's your logging agent. Your payment service is now at `10.0.1.89`.

Kubernetes has already updated all the endpoints and service records — but your network policy has no idea. It silently allows traffic through based on an IP address that no longer belongs to the workload you intended to trust.

This is the workload identity problem. IP addresses aren't an identity, they're a location. And in a Kubernetes cluster, location changes constantly. Building security policy on top of IP addresses means your security posture silently degrades every time a pod is scheduled, rescheduled, or scaled.

The answer is cryptographic workload identity: every workload gets a certificate-backed identity that proves who it is, not where it is. Services authenticate each other using those certificates before exchanging any data. If the certificate doesn't match, the connection is refused, regardless of what IP address it came from.

This is what SPIFFE and SPIRE provide. And this is how Cilium enforces it using eBPF, without injecting a sidecar into every pod.

In this article you'll understand how the SPIFFE identity model works, deploy SPIRE to issue cryptographic identities to workloads, and use Cilium's built-in SPIRE integration to enforce mutual TLS between services without touching your application code.

::: note Prerequisites

- Familiarity with Kubernetes RBAC and pod security — [**this handbook**](/freecodecamp.org/how-to-secure-a-kubernetes-cluster-handbook/README.md) covers the foundations
- Familiarity with TLS certificates and Kubernetes Secrets — [**this handbook**](/freecodecamp.org/how-to-encrypt-kubernetes-traffic.md) covers cert-manager and certificate concepts
- Helm 3 and the Cilium CLI installed
- A kind cluster — you'll create a fresh one with Cilium as the CNI in this article
- Patience: this is the most complex demo I've covered in this group of articles. SPIRE has more moving parts than anything else covered so far.

:::

::: info

All demo files are in the [companion GitHub repository (<VPIcon icon="iconfont icon-github"/>`Caesarsage/DevOps-Cloud-Projects`)](https://github.com/Caesarsage/DevOps-Cloud-Projects/tree/main/intermediate/k8/security/cilium-mtls).

:::

---

## The Workload Identity Problem

The opening scenario isn't theoretical. In Kubernetes, pods are ephemeral. The scheduler can place a pod on any node, and a pod's IP address is assigned at scheduling time from the node's IP pool.

When a pod is deleted and recreated through a rolling deployment, a node drain, or an autoscaler event, it gets a new IP address. If you've written a NetworkPolicy that says, "allow traffic from this IP", that policy is now pointing at nothing, or worse, at a different workload.

Kubernetes service names help here for east-west traffic — a Service name resolves consistently regardless of which pods back it. But a NetworkPolicy based on a Service name is still a label selector match, not a cryptographic assertion. Any pod that can spoof the right labels can bypass it.

What you actually want is this: before service A sends a request to service B, service B proves its identity cryptographically. If service B can't prove it is who it claims to be, service A refuses the connection. This is mutual TLS, and the key question is: where do the identities come from?

SPIFFE answers that question.

---

## How SPIFFE Works

SPIFFE — Secure Production Identity Framework for Everyone — is a CNCF standard that defines a model for workload identity. It doesn't implement anything by itself. It specifies the format of identities, the API for requesting them, and the trust model that makes them verifiable across services, clusters, and clouds. SPIRE is the reference implementation of that specification.

### SPIFFE IDs and Trust Domains

A SPIFFE identity is a URI with a specific format:

```plaintext
spiffe://<trust-domain>/<workload-path>
```

The trust domain is a string that identifies the administrative boundary — typically your organisation, cluster, or environment. Everything within the same trust domain can verify each other's identities. Identities from different trust domains require explicit federation configuration.

Some concrete examples:

```plaintext
spiffe://payments.corp/ns/production/sa/checkout
spiffe://analytics.corp/ns/data/sa/pipeline-worker
spiffe://cluster.local/ns/monitoring/sa/prometheus
```

The path after the trust domain is arbitrary — it's defined by your SPIRE configuration and typically encodes the Kubernetes namespace and service account of the workload.

### SVIDs: The Cryptographic Identity Document

An SVID — SPIFFE Verifiable Identity Document — is how a SPIFFE identity is materialised into something a service can actually use.

There are two SVID formats.

An **X.509 SVID** is a standard TLS certificate where the SPIFFE ID is embedded in the Subject Alternative Name (SAN) URI field. Because it's a standard X.509 certificate, any TLS library can use it without modification.

The workload presents this certificate in a TLS handshake, and the peer verifies the certificate was signed by a trusted SPIRE server. This is the format used for long-lived connections like gRPC streams.

A **JWT SVID** is a signed JSON Web Token containing the SPIFFE ID as a claim. It's suitable for request-based authentication over HTTP — pass it in an Authorization header, and the receiving service verifies the signature.

JWT SVIDs are shorter-lived than X.509 SVIDs and scoped to a specific audience to prevent token reuse across services.

For Cilium's mutual authentication, X.509 SVIDs are used. The rest of this article focuses on X.509. ### The Trust Bundle

For service A to verify service B's certificate, service A needs to know which Certificate Authority signed it. In SPIFFE, this is called the trust bundle — the set of CA certificates that are trusted within a trust domain.

SPIRE makes the trust bundle available via the Workload API. When a workload requests its identity, it also receives the current trust bundle. When the SPIRE server rotates its CA, it distributes the new trust bundle to all agents, which push it to all workloads. Your application never has to manage trust bundles manually.

---

## How SPIRE Works

SPIRE is the engine that issues SVIDs and manages the identity lifecycle. Understanding its architecture is what makes the Cilium integration make sense.

### SPIRE Server and SPIRE Agent

SPIRE has two main components. The **SPIRE Server** is the central CA. It maintains a registry of workload entries (records that describe which SPIFFE IDs should be issued to which workloads). It issues SVIDs to agents on behalf of workloads, and it's the root of trust for the entire trust domain.

The **SPIRE Agent** runs on every node as a DaemonSet. It has two jobs. First, it proves to the SPIRE Server that it's running on a legitimate node. This is called node attestation. Second, it exposes the SPIFFE Workload API on a Unix socket on the node, which workloads use to request their SVIDs.

The agent caches SVIDs locally so that a temporary loss of connection to the SPIRE Server doesn't immediately break workload identity.

This split — central server, per-node agents — is deliberate. Workloads never contact the SPIRE Server directly. They only talk to the agent on their own node. The agent mediates all identity requests, which limits the blast radius if a node is compromised.

### Node Attestation

When a SPIRE Agent starts up on a new node, it needs to prove its own identity to the SPIRE Server before it can serve identities to workloads. This is node attestation.

In Kubernetes, SPIRE uses **PSAT** — Projected Service Account Tokens — for node attestation. The agent presents a Kubernetes service account token that is projected specifically for the SPIRE server's audience. The SPIRE Server contacts the Kubernetes API to verify the token, confirms the agent is running in the expected namespace with the expected service account, and issues the agent its own SVID.

This is the reason SPIRE requires specific Kubernetes API flags. The kube-apiserver must be configured to support projected service account tokens with the right audience, which is why the kind cluster config in the demo below sets `--api-audiences` and `--service-account-issuer`.

### Workload Attestation

Once a node has been attested, its agent can attest workloads. When a workload connects to the Workload API socket and requests an SVID, the agent collects facts about that workload (like its Kubernetes namespace, service account, pod name, and labels) by querying the Kubernetes API. It matches those facts against the workload entries registered in the SPIRE Server. If a matching entry exists, the agent issues the corresponding SVID.

A workload entry looks like this:

```plaintext
SPIFFE ID: spiffe://example.org/ns/production/sa/checkout
Parent ID: spiffe://example.org/spire/agent/k8s_psat/default/<node-uid>
Selectors:
  k8s:ns:production
  k8s:sa:checkout
```

The selectors describe the Kubernetes facts that must match. A pod running in the `production` namespace with service account `checkout` will receive the SPIFFE ID `spiffe://example.org/ns/production/sa/checkout`. Any other pod will not.

### SVID Issuance and Rotation

SVIDs are short-lived by design. The default TTL for X.509 SVIDs in SPIRE is one hour. The SPIRE Agent automatically rotates them in the background — generating a new key pair, requesting a fresh SVID from the server, and making the new SVID available on the Workload API before the old one expires.

Workloads that use the Workload API directly or tools like the SPIFFE CSI driver get the new SVID transparently.

Short-lived credentials are the zero-trust way. If a workload's SVID is compromised, it's only valid for an hour. Compare that to a Kubernetes service account token, which was historically valid forever.

---

## How Cilium Implements Mutual TLS with SPIFFE

Traditional approaches to service mesh mTLS (like Istio or Linkerd) inject a sidecar proxy into every pod. The proxy intercepts all traffic and handles the TLS handshake. The application has no idea TLS is happening. The sidecar adds memory overhead (roughly 50–100MB per pod for Envoy), an extra network hop on every request, and a complex certificate injection mechanism.

Cilium takes a different path. Rather than injecting a proxy, it handles authentication at the network layer using eBPF. The Cilium agent running on each node intercepts connections, performs the mutual TLS handshake using SPIFFE SVIDs, and enforces the authentication result — all in the kernel, without any user-space proxy.

The mechanism works like this. When pod A initiates a connection to pod B, the Cilium agent on pod A's node intercepts the connection. It retrieves pod A's SVID from the SPIRE Workload API. It checks whether there's a `CiliumNetworkPolicy` requiring mutual authentication for this connection. If there is, it performs a TLS handshake with the Cilium agent on pod B's node, presenting pod A's SVID and requesting pod B's SVID in return.

Both agents verify the SVID against the SPIRE trust bundle. If both SVIDs are valid and the policy allows the connection, it proceeds. If either SVID is invalid or missing, the connection is dropped.

The application on pod A receives data from the application on pod B. Neither application wrote any TLS code. Neither has a sidecar. The authentication happened entirely in the Cilium agents on their respective nodes.

In Cilium's model, the Cilium agent itself gets a SPIFFE identity from SPIRE. It acts as a delegate identity that can request SVIDs on behalf of workloads.

This is slightly different from the standalone SPIRE model where each workload requests its own SVID directly. The Cilium operator registers workload entries in SPIRE automatically based on the Kubernetes Identities it manages, so you don't need to manually create SPIRE entries for every pod.

---

## Demo 1 — Install Cilium with SPIRE Integration

You'll create a kind cluster with Cilium as the CNI and enable its built-in SPIRE integration in a single Helm command.

### Step 1: Install the Cilium CLI

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
brew install cilium-cli
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
CILIUM_CLI_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)
curl -L --remote-name-all \
https://github.com/cilium/cilium-cli/releases/download/${CILIUM_CLI_VERSION}/cilium-linux-amd64.tar.gz
sudo tar -xzf cilium-linux-amd64.tar.gz -C /usr/local/bin
```

:::

### Step 2: Create a kind Cluster Without a Default CNI

kind's default CNI (kindnet) must be disabled so Cilium can take its place. Save this as <VPIcon icon="iconfont icon-yaml"/>`kind-cilium.yaml`:

```yaml title='kind-cilium.yaml"
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
  - role: worker
  - role: worker
networking:
  disableDefaultCNI: true   # Required: let Cilium be the CNI
  kubeProxyMode: none       # Cilium replaces kube-proxy too
```

```sh
kind create cluster --name k8s-mtls --config kind-cilium.yaml
```

The nodes will be in a `NotReady` state until Cilium is installed. This is expected because there's no CNI yet.

### Step 3: Install Cilium with SPIRE Enabled

Because Step 2 set `kubeProxyMode: none`, Cilium has to play the kube-proxy role itself. That means its bootstrap pods can't reach the API server via the `kubernetes` Service ClusterIP, because nothing is routing it yet.

You have to pass the API server's real address up front. Grab the kind control-plane's IP from Docker:

```sh
API_SERVER_IP=$(docker inspect k8s-mtls-control-plane \
--format='{{ .NetworkSettings.Networks.kind.IPAddress }}')
echo "API_SERVER_IP=$API_SERVER_IP"
```

Then install Cilium with SPIRE:

```sh
helm repo add cilium https://helm.cilium.io/
helm repo update

helm upgrade cilium cilium/cilium \
--install \
--namespace kube-system \
--set kubeProxyReplacement=true \
--set k8sServiceHost=${API_SERVER_IP} \
--set k8sServicePort=6443 \
--set authentication.enabled=true \
--set authentication.mutual.spire.enabled=true \
--set authentication.mutual.spire.install.enabled=true \
--set authentication.mutual.spire.install.server.dataStorage.enabled=false
```

A few of these flags are easy to miss but each is load-bearing:

- `kubeProxyReplacement=true`: Cilium installs its eBPF-based replacement for kube-proxy. Mandatory whenever the kind config sets `kubeProxyMode: none`.
- `k8sServiceHost` / `k8sServicePort`: direct API server address used during bootstrap, before Cilium can route the Service ClusterIP. On EKS/GKE/AKS you don't need this because kube-proxy is still present during install.
- `authentication.enabled=true`: required alongside `authentication.mutual.spire.enabled=true`. The chart's `validate.yaml` rejects the install with `SPIRE integration requires .Values.authentication.enabled=true and .Values.authentication.mutual.spire.enabled=true` if you set only the mutual flag.
- `dataStorage.enabled=false`: switches the SPIRE server from a PVC-backed datastore to in-memory. Fine for a lab cluster, but in production leave this enabled and ensure your cluster has PersistentVolume support.

Notice there's no `--wait` flag here. On a fresh cluster, `--wait` will appear to fail with `context deadline exceeded` because the install is racey by design. The SPIRE server has to schedule on a `NotReady` node thanks to its tolerations, then Cilium agents come up using SPIRE, then nodes flip to `Ready`. Let the install return immediately and watch the pods come up over the next ~2 minutes:

```sh
kubectl get pods -A -w
```

### Step 4: Verify the Installation

```sh
cilium status --wait
#
#     /¯¯\
#  /¯¯__/¯¯\    Cilium:             OK
#  __/¯¯__/    Operator:           OK
#  /¯¯__/¯¯\    Envoy DaemonSet:    OK
#  __/¯¯__/    Hubble Relay:       disabled
#     __/       ClusterMesh:        disabled
# 
# DaemonSet              cilium             Desired: 3, Ready: 3/3, Available: 3/3
# DaemonSet              cilium-envoy       Desired: 3, Ready: 3/3, Available: 3/3
# Deployment             cilium-operator    Desired: 2, Ready: 2/2, Available: 2/2
```

Three Cilium agents, one per node, including the control-plane (no taints in the kind config). Check the SPIRE components in the `cilium-spire` namespace:

```sh
kubectl get all -n cilium-spire
#
# NAME                    READY   STATUS    RESTARTS   AGE
# pod/spire-agent-2cpsr   1/1     Running   0          3m
# pod/spire-agent-klhjx   1/1     Running   0          3m
# pod/spire-agent-vhsnc   1/1     Running   0          3m
# pod/spire-server-0      2/2     Running   0          3m
# 
# NAME                              TYPE        CLUSTER-IP    PORT(S)    AGE
# service/spire-server              ClusterIP   10.96.x.x     8081/TCP   3m
# 
# NAME                          DESIRED   CURRENT   READY   AGE
# daemonset.apps/spire-agent    3         3         3       3m
# 
# NAME                             READY   AGE
# statefulset.apps/spire-server    1/1     3m
```

One SPIRE agent per node. The SPIRE server is a StatefulSet with two containers: the server itself plus the SPIRE controller manager, which automatically creates workload registration entries for Cilium identities.

Run a health check on the SPIRE server:

```sh
kubectl exec -n cilium-spire spire-server-0 -c spire-server -- \
/opt/spire/bin/spire-server healthcheck
#
# Server is healthy.
```

Verify the SPIRE agents have been attested:

```sh
kubectl exec -n cilium-spire spire-server-0 -c spire-server -- \
/opt/spire/bin/spire-server agent list
#
# Found 3 attested agents:
# 
# SPIFFE ID         : spiffe://spiffe.cilium/spire/agent/k8s_psat/default/<node-uid-1>
# Attestation type  : k8s_psat
# Expiration time   : 2026-05-17 21:08:47 +0000 UTC
# Serial number     : 91532884191503307904684123063465502141
# Can re-attest     : true
# 
# SPIFFE ID         : spiffe://spiffe.cilium/spire/agent/k8s_psat/default/<node-uid-2>
# ...
```

Three agents, one per node, all attested via Kubernetes PSAT. The SPIRE server trusts every node and will issue SVIDs to workloads running on them.

At this point the identity platform is fully in place, but nothing is using it yet. Demo 1 built the machinery that *issues* cryptographic identities. Demo 2, which we'll walk through next, puts that machinery to work, turning those SVIDs into an enforced mutual-TLS policy between two real services. Keep the cluster from Demo 1 running, as Demo 2 builds directly on it.

---

## Demo 2 — Enforce Mutual TLS with a CiliumNetworkPolicy

Picking up in the same cluster from Demo 1, you'll deploy two services, enforce mutual authentication between them with a `CiliumNetworkPolicy`, verify that authenticated traffic flows, and confirm that unauthenticated connections are blocked.

Every request here is authenticated with the SVIDs that the SPIRE server you just verified hands out. These two demos are one continuous walkthrough, not standalone exercises.

### Step 1: Deploy a Client and Server

This file contains both the server and the client — the client is a sleeping curl pod we'll use to exec into.

```yaml title="echo-workloads.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-server
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: echo-server
  template:
    metadata:
      labels:
        app: echo-server
    spec:
      containers:
        - name: echo-server
          image: ealen/echo-server:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: echo-server
  namespace: default
spec:
  selector:
    app: echo-server
  ports:
    - port: 80
      targetPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-client
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: echo-client
  template:
    metadata:
      labels:
        app: echo-client
    spec:
      containers:
        - name: client
          image: curlimages/curl:latest
          command: ["sleep", "infinity"]
```

```sh
kubectl apply -f echo-workloads.yaml
# kubectl rollout status only takes one resource at a time
kubectl rollout status deployment/echo-server -n default
kubectl rollout status deployment/echo-client -n default
```

### Step 2: Confirm Traffic Flows Without Authentication

Before enforcing mTLS, confirm the client can reach the server:

```sh
CLIENT=$(kubectl get pod -l app=echo-client -o jsonpath='{.items[0].metadata.name}')
kubectl exec $CLIENT -- curl -s http://echo-server/
```

You should get a JSON response from the echo server. Traffic flows freely with no authentication.

### Step 3: Apply a CiliumNetworkPolicy Requiring Mutual Authentication

Adding `authentication.mode: required` to a `CiliumNetworkPolicy` tells Cilium to enforce mutual TLS for matching traffic. Both sides of the connection must present a valid SPIFFE SVID:

```yaml title="mtls-policy.yaml"
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: echo-server-mtls
  namespace: default
spec:
  endpointSelector:
    matchLabels:
      app: echo-server
  ingress:
    - fromEndpoints:
        - matchLabels:
            app: echo-client
      authentication:
        mode: required     # Require mutual TLS for this traffic
```

```sh
kubectl apply -f mtls-policy.yaml
```

### Step 4: Verify Authenticated Traffic Still Flows

```sh
kubectl exec $CLIENT -- curl -s http://echo-server/
```

The connection succeeds. Cilium intercepted it, performed the SPIFFE mTLS handshake between the Cilium agents on both pods' nodes, verified both SVIDs, and allowed the traffic through. The application on the client sent a plain HTTP request and received a response — the mutual authentication happened transparently at the network layer.

### Step 5: Observe the Authentication with Hubble (Optional)

Hubble is Cilium's observability layer. It needs its own CLI:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
brew install hubble
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
HUBBLE_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/hubble/master/stable.txt)
curl -L --remote-name-all \
https://github.com/cilium/hubble/releases/download/${HUBBLE_VERSION}/hubble-linux-amd64.tar.gz
sudo tar -xzf hubble-linux-amd64.tar.gz -C /usr/local/bin
```

:::

Enable Hubble in the cluster, then watch flows. `cilium hubble enable` deploys Hubble Relay *and* restarts the Cilium agents to switch on the Hubble server inside them, so wait for it to settle before port-forwarding. If you skip the wait, the port-forward connects before Relay is listening, then dies with `connection reset by peer` / `rpc error … EOF`:

```sh
cilium hubble enable
cilium status --wait          # wait for "Hubble Relay: OK" before continuing

cilium hubble port-forward &

# Watch flows for the echo-server (Ctrl-C to stop)
hubble observe --namespace default --pod echo-server --follow
```

Trigger another request in a second terminal:

```sh
kubectl exec $CLIENT -- curl -s http://echo-server/
#
# ℹ️  Hubble Relay is available at 127.0.0.1:4245
# Jul  7 12:44:42.380: default/echo-client-86d446b8f-9bn5v:47500 (ID:2822) -> default/echo-server-7467b4b54d-5tvkz:80 (ID:30854) policy-verdict:none TRAFFIC_DIRECTION_UNKNOWN ALLOWED (TCP Flags: SYN)
# Jul  7 12:44:42.380: default/echo-client-86d446b8f-9bn5v:47500 (ID:2822) -> default/echo-server-7467b4b54d-5tvkz:80 (ID:30854) to-endpoint FORWARDED (TCP Flags: SYN)
# Jul  7 12:44:42.381: default/echo-client-86d446b8f-9bn5v:47500 (ID:2822) <- default/echo-server-7467b4b54d-5tvkz:80 (ID:30854) to-endpoint FORWARDED (TCP Flags: SYN, ACK)
```

The `ALLOWED` verdict with the `policy-verdict` reason confirms the CiliumNetworkPolicy matched and authentication was verified. No sidecar involved — this happened in the Cilium agents.

**Prefer a graphical view? Enable the Hubble UI.** Everything above is the API + terminal path (Relay on port 4245 backs the `hubble` CLI). Hubble also ships a web dashboard with a live service map — but it's a separate component that `cilium hubble enable` does *not* start by default:

```sh
# Add the UI (re-runs enable, keeps Relay, adds the hubble-ui deployment)
cilium hubble enable --ui

# Wait for it to be Ready before opening — same race as Relay. Skip this and
# `cilium hubble ui` fails with "connection refused" on port 8081, because the
# UI's frontend container isn't listening yet.
kubectl -n kube-system rollout status deployment/hubble-ui --timeout=90s

# Port-forwards hubble-ui and opens http://localhost:12000 in your browser
cilium hubble ui
```

Select the `default` namespace from the dropdown. That's where the demo pods and the policy live. The map is *live*: it renders edges from flows as they happen, so an idle namespace looks empty. Trigger a request to light it up:

```sh
kubectl exec $CLIENT -- curl -s http://echo-server/
```

You'll see a forwarded edge `echo-client → echo-server`. Click it (or open the flow table at the bottom) to read the `policy-verdict: ALLOWED`. Leave the UI open through Step 6. When you run the unauthorized-client test there, its connection shows up as a red *dropped* edge, the visual counterpart to the `curl` timeout.

![Hubble UI — live service map for the  namespace, with forwarded and dropped flows](https://cdn.hashnode.com/uploads/covers/5f2a6b76d7d55f162b5da2ee/ee0f0824-74e1-4282-82e8-fcf5a9c06835.png)

The UI has three parts.

The **service map** at the top draws each workload identity as a box and each observed connection as an edge colored by verdict: `echo-client → echo-server:80` is a solid green (forwarded) edge, while the box labelled `default` (that's the `unauthorized` pod, which carries only the namespace identity because it has no `app` label, so Hubble names it after that) reaches `echo-server` over a red dashed (dropped) line. The 🔒 lock on `echo-server`'s `→ 80 TCP` port marks that endpoint as mutually authenticated by the policy.

The **flow table** underneath logs one row per flow: source identity, destination identity, destination port, L7 info, `Verdict`, and timestamp. This lets you read both outcomes side by side, with `echo-client → echo-server` rows marked **forwarded** and `default → echo-server` rows marked **dropped**. This is the same allow/deny split as the CLI, one line per packet.

The **top bar** holds the namespace selector, a flow filter, the `Any verdict` / `Visual` toggle, and a live `flows/s` rate alongside the count of reporting nodes (`3/3`).

### Step 6: Verify That a Pod Without the Matching Label is Blocked

Deploy a third pod without the `echo-client` label and try to reach the server:

```yaml title="unauthorized-client.yaml"
apiVersion: v1
kind: Pod
metadata:
  name: unauthorized
  namespace: default
spec:
  containers:
    - name: client
      image: curlimages/curl:latest
      command: ["sleep", "infinity"]
```

```sh
kubectl apply -f unauthorized-client.yaml
kubectl wait --for=condition=Ready pod/unauthorized --timeout=60s
kubectl exec unauthorized -- curl -sS --max-time 5 http://echo-server/
#
# curl: (28) Connection timed out after 5000 milliseconds
```

The connection times out. The `CiliumNetworkPolicy` only permits ingress from pods with `app: echo-client`. A pod without that label gets no SVID match and no policy match. Cilium drops the traffic silently.

There are two gotchas to watch out for here. Run `kubectl wait` before exec. Run exec too soon after `apply` and you get `container not found ("client")` because the pod's container hasn't started yet.

And use `curl -sS`, not plain `-s`. With only `-s`, curl swallows the error text and you just see `command terminated with exit code 28`. That's the same result — 28 *is* curl's timeout code — but the `-S` restores the readable message. The fact that it times out (rather than "connection refused") is the signature of a policy *drop*: the packets are silently blackholed, not actively rejected. A refusal would return instantly with a different error.

### Step 7: Check the Workload Entries in SPIRE

Cilium's SPIRE controller manager automatically created SPIFFE identities for the Cilium security identities in this cluster. You can see them:

```sh
kubectl exec -n cilium-spire spire-server-0 -c spire-server -- \
  /opt/spire/bin/spire-server entry show \
  -selector cilium:mutual-auth
```

Each entry maps a Cilium security identity to a SPIFFE ID. The Cilium operator manages this registry automatically, so you never need to register workloads manually when using Cilium's built-in integration.

---

## Conclusion

IP addresses are location, not identity. And in Kubernetes, location changes with every deployment, so any policy built on address matching silently degrades over time.

Cryptographic workload identity fixes that at the foundation. SPIFFE defines the model (a SPIFFE ID names a workload within a trust domain, an X.509 SVID materialises it into a certificate any TLS library can verify), and SPIRE implements it: the server is the CA and registry, while per-node agents attest via Kubernetes PSAT and issue short-lived, auto-rotating SVIDs.

Cilium wires that identity layer into the network. Add `authentication.mode: required` to a CiliumNetworkPolicy and its eBPF agents fetch both workloads' SVIDs, run the mutual TLS handshake, and enforce the verdict. There's no sidecar, no application changes, and near-zero overhead versus a service mesh. And you deployed the whole stack in a single Helm command: the complexity lives in the infrastructure, not in your code.

---

## Cleanup (kind)

```sh
# Delete demo workloads
kubectl delete deployment echo-server echo-client -n default
kubectl delete service echo-server -n default
kubectl delete pod unauthorized -n default
kubectl delete ciliumnetworkpolicy echo-server-mtls -n default

# Uninstall Cilium (helm doesn't delete the cilium-spire namespace it created)
helm uninstall cilium -n kube-system
kubectl delete namespace cilium-spire

# Delete the cluster (easiest reset on kind)
kind delete cluster --name k8s-mtls
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement Zero-Trust Workload Identity in Kubernetes with SPIFFE, SPIRE, and Cilium",
  "desc": "Your network policy says: allow traffic from 10.0.1.45. Yesterday, 10.0.1.45 was your payment service. Today, after a rolling deployment, it's your logging agent. Your payment service is now at 10.0.1",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/implement-zero-trust-workload-identity-in-kubernetes-with-spiffe-spire-and-cilium.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
