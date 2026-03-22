---
lang: en-US
title: "How to Secure a Kubernetes Cluster: RBAC, Pod Hardening, and Runtime Protection"
description: "Article(s) > How to Secure a Kubernetes Cluster: RBAC, Pod Hardening, and Runtime Protection"
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
      content: "Article(s) > How to Secure a Kubernetes Cluster: RBAC, Pod Hardening, and Runtime Protection"
    - property: og:description
      content: "How to Secure a Kubernetes Cluster: RBAC, Pod Hardening, and Runtime Protection"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-secure-a-kubernetes-cluster-handbook/
prev: /devops/k8s/articles/README.md
date: 2026-03-26
isOriginal: false
author:
  - name: Destiny Erhabor
    url: https://freecodecamp.org/news/author/CaesarSage/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4039b7a4-bb45-4df5-b13b-7414985c1a7e.png
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
  name="How to Secure a Kubernetes Cluster: RBAC, Pod Hardening, and Runtime Protection"
  desc="In 2018, RedLock's cloud security research team discovered that Tesla's Kubernetes dashboard was exposed to the public internet with no password on it. An attacker had found it, deployed pods inside T"
  url="https://freecodecamp.org/news/how-to-secure-a-kubernetes-cluster-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4039b7a4-bb45-4df5-b13b-7414985c1a7e.png"/>

In 2018, RedLock's cloud security research team discovered that Tesla's Kubernetes dashboard was exposed to the public internet with no password on it.

An attacker had found it, deployed pods inside Tesla's cluster, and was using them to mine cryptocurrency – all on Tesla's AWS bill. The cluster had no authentication on the dashboard, no network restrictions on egress, and nothing monitoring for intrusion. Any one of those controls would have stopped the attack. None of them were in place.

This wasn't a sophisticated zero-day exploit. It was a misconfigured default.

Kubernetes ships with powerful security primitives. The problem is that almost none of them are enabled by default. A fresh cluster is deliberately permissive so it's easy to get started. That permissiveness is a feature in development. In production, it's a liability.

In this handbook, we'll work through the three most impactful security layers in Kubernetes. We'll start with Role-Based Access Control, which governs who can do what to which resources in the API. From there we'll move to pod runtime security, which locks down what containers can actually do once they're running on a node. Finally we'll deploy Falco, a syscall-level detection engine that watches for attacks in progress and alerts in real time.

By the end, you'll have a hardened cluster with working RBAC policies, enforced pod security standards, and live detection rules that fire when something suspicious happens.

::: note Prerequisites

- `kubectl` installed and configured
- Docker Desktop or a Linux machine (to run kind)
- Basic Kubernetes familiarity – you know what a Pod, Deployment, and Namespace are
- No prior security experience needed

:::

::: info

All demos run on a local kind cluster. Full YAML and setup scripts are in the [companion GitHub repository (<VPIcon icon="iconfont icon-github"/>`Caesarsage/DevOps-Cloud-Projects`)](https://github.com/Caesarsage/DevOps-Cloud-Projects/tree/main/intermediate/security).

<SiteInfo
  name="DevOps-Cloud-Projects/intermediate/security at main · Caesarsage/DevOps-Cloud-Projects"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/DevOps-Cloud-Projects/tree/main/intermediate/security/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ba9c2c6e465f17ab334279953d2de46de38e610debef3e34065e6b0c8702f9a9/Caesarsage/DevOps-Cloud-Projects"/>

:::

---

## The Kubernetes Threat Landscape

To understand what you're defending against, you need to understand where Kubernetes exposes attack surface. There are six main areas, and most production incidents trace back to at least one of them.

The **API server** is the front door to your cluster. Every `kubectl` command, every CI deploy, and every controller reconciliation loop sends requests here. Unauthenticated or over-privileged access to the API server is effectively game over: an attacker who can talk to it can create pods, read secrets, and modify workloads freely.

**etcd** is the key-value store where all cluster state lives, including your Secrets. Kubernetes Secrets are base64-encoded by default, not encrypted. Anyone with direct access to etcd can read every password, token, and certificate in the cluster without going through the API server at all.

The **kubelet** runs on each node and manages the pods assigned to it. If its API is reachable without authentication – which is the default on older clusters – an attacker can exec into any pod on that node and read its memory without ever touching the API server.

The **container runtime** is the layer that actually runs your containers. A container that escapes its isolation boundary lands directly in the host OS. A privileged container with `hostPID: true` can read the memory of every other process on the node, including other containers.

Your **supply chain** (base images, third-party dependencies, Helm charts, operators) is a potential entry point at every step. The XZ Utils backdoor discovered in 2024 showed how close a well-positioned supply chain attack can come to widespread infrastructure compromise.

Finally, the **network**: by default, every pod in a Kubernetes cluster can reach every other pod on any port. There are no internal firewalls between workloads unless you explicitly create them with NetworkPolicy.

![Kubernetes threat landscape](https://cdn.hashnode.com/uploads/covers/5f2a6b76d7d55f162b5da2ee/2e49d975-4f69-4d14-9646-76c6ec377115.png)

### Real-World Breaches

These three incidents are worth understanding before you write a single line of YAML. They're not theoretical – they're documented post-mortems from real production clusters.

| Incident | Year | Root cause | What was missing |
| --- | --- | --- | --- |
| **Tesla cryptomining** | 2018 | Kubernetes dashboard exposed with no authentication, Unrestricted egress | RBAC on the dashboard endpoint + default-deny NetworkPolicy |
| **Capital One data breach** | 2019 | SSRF vulnerability in a WAF let an attacker reach the EC2 metadata API, which returned credentials for an over-privileged IAM role | Pod-level IAM restrictions (IRSA) + blocking metadata API egress |
| **Shopify bug bounty (Kubernetes)** | 2021 | A researcher accessed internal Kubernetes metadata through a misconfigured internal service, exposing pod environment variables containing secrets | Secret management outside environment variables + network segmentation |

The pattern across all three: not zero-day exploits, but misconfigured defaults and missing controls that should have been standard practice.

This article addresses the RBAC and pod security gaps directly.

---

## What You'll Build

Before the first command, here is the security posture you'll have by the end of this article:

You'll start by running kube-bench to get a CIS Benchmark baseline – a concrete score showing where a default cluster stands before any hardening. From there you'll build a least-privilege RBAC policy for a CI pipeline service account and verify its permission boundaries, then audit the full cluster to confirm no over-privileged accounts exist.

On the pod security side, you'll enforce the `restricted` Pod Security Admission profile on your workload namespace and apply a hardened `securityContext` to a deployment: non-root user, read-only root filesystem, dropped capabilities, and seccomp profile. To close out, you'll deploy Falco in eBPF mode with a custom detection rule that fires when suspicious tools are run inside a container.

Start to finish, with a kind cluster already running, the demos take about 45–60 minutes.

---

## Table of Contents

- [Demo 1 — Run a Cluster Security Baseline with kube-bench](#heading-demo-1--run-a-cluster-security-baseline-with-kube-bench)
- [How to Configure RBAC](#heading-how-to-configure-rbac)
- [Demo 2 — Build a Least-Privilege RBAC Policy for a CI Pipeline](#heading-demo-2--build-a-least-privilege-rbac-policy-for-a-ci-pipeline)
- [Demo 3 — Audit RBAC with rakkess and rbac-lookup](#heading-demo-3--audit-rbac-with-rakkess-and-rbac-lookup)
- [How to Harden Pod Runtime Security](#how-to-harden-pod-runtime-security)
- [Demo 4 — Harden a Pod with securityContext](#heading-demo-4--harden-a-pod-with-securitycontext)
- [Demo 5 — Deploy Falco and Write a Custom Detection Rule](#heading-demo-5--deploy-falco-and-write-a-custom-detection-rule)

---

## Demo 1: Run a Cluster Security Baseline with kube-bench

Before hardening anything, it's a good idea to measure where you are. [kube-bench (<VPIcon icon="iconfont icon-github"/>`aquasecurity/kube-bench`)](https://github.com/aquasecurity/kube-bench) runs the CIS Kubernetes Benchmark against your cluster and reports which checks pass and which fail. A baseline run gives you a concrete picture of your cluster's default security posture – and a reference point you can re-run after applying any hardening changes.

### Step 1: Create a kind cluster

Save the following as <VPIcon icon="iconfont icon-yaml"/>`kind-config.yaml`:

```yaml title="kind-config.yaml"
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
  - role: worker
  - role: worker
```

```sh
kind create cluster --name k8s-security --config kind-config.yaml
#
# Creating cluster "k8s-security" ...
#  ✓ Ensuring node image (kindest/node:v1.29.0) 🖼
#  ✓ Preparing nodes 📦 📦 📦
#  ✓ Writing configuration 📜
#  ✓ Starting control-plane 🕹️
#  ✓ Installing CNI 🔌
#  ✓ Installing StorageClass 💾
#  ✓ Joining worker nodes 🚜
# Set kubectl context to "kind-k8s-security"
```

### Step 2: Run kube-bench

kube-bench runs as a Job inside the cluster, mounting the host filesystem to inspect Kubernetes configuration files and processes:

```sh
kubectl apply -f https://raw.githubusercontent.com/aquasecurity/kube-bench/main/job.yaml
kubectl wait --for=condition=complete job/kube-bench --timeout=120s
kubectl logs job/kube-bench
```

The output is long. Scroll to the summary at the bottom:

```plaintext
== Summary master ==
0 checks PASS
11 checks FAIL
 9 checks WARN
 0 checks INFO

== Summary node ==
17 checks PASS
 2 checks FAIL
40 checks WARN
 0 checks INFO
```

A fresh kind cluster typically fails around 14 checks. Three of the most important failures explain why defaults are a problem:

| Check ID | Description | Why it matters |
| --- | --- | --- |
| **1.2.1** | `--anonymous-auth` is not set to false on the API server | Anonymous requests can reach the API server without authentication – exactly how the Tesla dashboard was accessed |
| **1.2.6** | `--kubelet-certificate-authority` is not set | The API server cannot verify kubelet identity, enabling man-in-the-middle attacks between the control plane and nodes |
| **4.2.6** | `--protect-kernel-defaults` is not set on the kubelet | Kernel parameters can be modified from within a container, which is one step toward a container escape |

::: note

Some kube-bench findings are expected on kind because kind is a development tool, not a production-hardened environment. The important thing is to understand what each finding means and whether it applies to your target production setup.

:::

Delete the Job when you're done:

```sh
kubectl delete job kube-bench
```

Now that you have a baseline, you know what you're starting from. The next step is to work through the most impactful control on that list: access control. RBAC governs every interaction with the Kubernetes API, and getting it right is the foundation everything else builds on.

---

## How to Configure RBAC

Role-Based Access Control is the authorisation layer in Kubernetes. Every request that reaches the API server – from `kubectl`, from a pod, from a controller – is checked against RBAC rules after authentication succeeds. If there is no rule that explicitly allows the action, Kubernetes denies it.

The key word is "explicitly". RBAC in Kubernetes is additive only. There is no `deny` rule. You grant access by creating rules, and you remove access by deleting them. This makes the mental model clean: if a subject can do something, you gave it permission to do that thing.

### A Brief Case Study: The Shopify Kubernetes Misconfiguration

In 2021, security researcher Silas Cutler discovered that a Shopify internal service exposed Kubernetes metadata through an SSRF vulnerability. The metadata included pod environment variables that contained secrets. The root cause was partly RBAC: the service's service account had broader cluster access than it needed, and there was no least-privilege review process.

Shopify paid a $25,000 bug bounty and fixed the issue. The lesson is straightforward: a service account should only have the permissions it needs to do its specific job. Nothing more.

This is the principle you'll apply in Demo 2. ### The Four RBAC Objects

RBAC in Kubernetes is built from four API objects. Two define permissions, two bind those permissions to subjects:

| Object | Scope | What it does |
| --- | --- | --- |
| `Role` | Namespace | Defines a set of permissions within one namespace |
| `ClusterRole` | Cluster-wide | Defines permissions across all namespaces, or for cluster-scoped resources like Nodes |
| `RoleBinding` | Namespace | Grants the permissions of a Role or ClusterRole to a subject, within one namespace |
| `ClusterRoleBinding` | Cluster-wide | Grants the permissions of a ClusterRole to a subject across the entire cluster |

A **subject** is a user, a group, or a service account. Users and groups come from your authentication layer – client certificates, OIDC tokens, or cloud provider identity. Service accounts are Kubernetes-native identities created for pods.

### How to Discover Resources, Verbs, and API Groups

Before you can write a `Role`, you need to know three things: the resource name, the API group it belongs to, and the verbs it supports. You shouldn't have to guess any of them – `kubectl` can tell you everything.

#### List all available resources and their API groups

```sh :collapsed-lines
kubectl api-resources
#
# NAME                    SHORTNAMES  APIVERSION                     NAMESPACED  KIND
# bindings                            v1                             true        Binding
# configmaps              cm          v1                             true        ConfigMap
# endpoints               ep          v1                             true        Endpoints
# events                  ev          v1                             true        Event
# namespaces              ns          v1                             false       Namespace
# nodes                   no          v1                             false       Node
# pods                    po          v1                             true        Pod
# secrets                             v1                             true        Secret
# serviceaccounts         sa          v1                             true        ServiceAccount
# services                svc         v1                             true        Service
# deployments             deploy      apps/v1                        true        Deployment
# replicasets             rs          apps/v1                        true        ReplicaSet
# statefulsets            sts         apps/v1                        true        StatefulSet
# cronjobs                cj          batch/v1                       true        CronJob
# jobs                                batch/v1                       true        Job
# ingresses               ing         networking.k8s.io/v1           true        Ingress
# networkpolicies         netpol      networking.k8s.io/v1           true        NetworkPolicy
# clusterroles                        rbac.authorization.k8s.io/v1   false       ClusterRole
# roles                               rbac.authorization.k8s.io/v1   true        Role
```

The `APIVERSION` column is what you put in `apiGroups`. Strip the version suffix and use only the group part:

| APIVERSION in output | apiGroups value in Role |
| --- | --- |
| `v1` | `""` (empty string – the core group) |
| `apps/v1` | `"apps"` |
| `batch/v1` | `"batch"` |
| `networking.k8s.io/v1` | `"networking.k8s.io"` |
| `rbac.authorization.k8s.io/v1` | `"rbac.authorization.k8s.io"` |

The `NAMESPACED` column tells you whether to use a `Role` (namespaced resources) or a `ClusterRole` (non-namespaced resources like `nodes`).

#### Filter by API group

If you want to see only resources in a specific group, for example, everything in `apps`:

```sh
kubectl api-resources --api-group=apps
#
# NAME                  SHORTNAMES  APIVERSION  NAMESPACED  KIND
# controllerrevisions               apps/v1     true        ControllerRevision
# daemonsets            ds          apps/v1     true        DaemonSet
# deployments           deploy      apps/v1     true        Deployment
# replicasets           rs          apps/v1     true        ReplicaSet
# statefulsets          sts         apps/v1     true        StatefulSet
```

#### List all verbs for a specific resource

Each resource supports a different set of verbs. To see exactly which verbs a resource supports, use `kubectl api-resources` with `-o wide` and look at the `VERBS` column:

```sh
kubectl api-resources -o wide | grep -E "^NAME|^pods "
#
# NAME  SHORTNAMES  APIVERSION  NAMESPACED  KIND  VERBS
# pods  po          v1          true        Pod   create,delete,deletecollection,get,list,patch,update,watch
```

Or explain the resource directly:

```sh
kubectl explain pod --api-version=v1 | head -10
```

The full set of verbs Kubernetes supports in RBAC rules is:

| Verb | What it allows |
| --- | --- |
| `get` | Read a single named resource: `kubectl get pod my-pod` |
| `list` | Read all resources of a type: `kubectl get pods` |
| `watch` | Stream changes to resources: used by controllers and informers |
| `create` | Create a new resource |
| `update` | Replace an existing resource (`kubectl apply` on an existing object) |
| `patch` | Partially modify a resource (`kubectl patch`) |
| `delete` | Delete a single resource |
| `deletecollection` | Delete all resources of a type in a namespace |
| `exec` | Run a command inside a pod (`kubectl exec`) |
| `portforward` | Forward a port from a pod (`kubectl port-forward`) |
| `proxy` | Proxy HTTP requests to a pod |
| `log` | Read pod logs (`kubectl logs`) |

::: important

`get` and `list` are separate verbs. Granting `list` on `secrets` lets a subject enumerate every secret name and value in a namespace, even if you didn't also grant `get`. Always think about both when working with sensitive resources like `secrets`, `serviceaccounts`, and `configmaps`.

:::

#### Look up a resource's group with kubectl explain

If you already know the resource name but aren't sure of its group, `kubectl explain` tells you:

```sh
kubectl explain deployment
#
# GROUP:      apps
# KIND:       Deployment
# VERSION:    v1
# ...
```

```sh
kubectl explain ingress
#
# GROUP:      networking.k8s.io
# KIND:       Ingress
# VERSION:    v1
# ...
```

This is the fastest way to look up the `apiGroups` value for any resource when writing a Role.

#### A complete lookup workflow

Here is the practical workflow when writing a new Role from scratch:

```sh
# 1. Find the resource name and API group
kubectl api-resources | grep deployment
#
# deployments   deploy   apps/v1   true   Deployment

# 2. Find the verbs it supports
kubectl api-resources -o wide | grep deployment
#
# deployments   deploy   apps/v1   true   Deployment   create,delete,...,get,list,patch,update,watch

# 3. Write the Role using the group (strip the version) and the verbs you need
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: deployment-reader
  namespace: staging
rules:
  - apiGroups: ["apps"]       # from: apps/v1 → strip /v1
    resources: ["deployments"]
    verbs: ["get", "list", "watch"]
```

With this workflow, you never have to guess an API group or verb. You look it up, then write the minimal rule you need.

### Roles and ClusterRoles

A `Role` defines which verbs are allowed on which resources. Here is a Role that grants read-only access to Pods and ConfigMaps inside the `staging` namespace:

```yaml title="role-ci-reader.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ci-reader
  namespace: staging
rules:
  - apiGroups: [""]          # "" = the core API group (Pods, Services, Secrets, ConfigMaps)
    resources: ["pods", "configmaps"]
    verbs: ["get", "list", "watch"]
```

The `apiGroups` field tells Kubernetes which API group owns the resource. The core group uses an empty string `""`. Apps-level resources like Deployments use `"apps"`. Custom resources use their own group, such as `"networking.k8s.io"`.

A `ClusterRole` is structurally identical but omits the namespace and can reference cluster-scoped resources like Nodes and PersistentVolumes:

```yaml title="clusterrole-node-reader.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: node-reader    # no namespace field
rules:
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["get", "list", "watch"]
```

#### When to use which:

Use a `Role` when the permission is specific to one namespace. A compromised service account can only affect that namespace: the blast radius is contained. Use a `ClusterRole` when you need access to cluster-scoped resources, or when you want a reusable permission template that multiple namespaces can share.

A common mistake is reaching for a `ClusterRole` "just to be safe" because it's easier to configure. Namespace-scoped `Roles` are almost always the right default.

### RoleBindings and ClusterRoleBindings

A Role by itself does nothing. You need a binding to attach it to a subject. Here is a `RoleBinding` that grants the `ci-reader` Role to the `ci-pipeline` service account:

```yaml title="rolebinding-ci.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ci-reader-binding
  namespace: staging
subjects:
  - kind: ServiceAccount
    name: ci-pipeline       # the service account name
    namespace: staging      # the namespace the SA lives in
roleRef:
  kind: Role
  name: ci-reader           # must match the Role name exactly
  apiGroup: rbac.authorization.k8s.io
```

There is a useful pattern worth knowing: you can bind a `ClusterRole` using a `RoleBinding`. This creates namespace-scoped access using a reusable permission template. The `ClusterRole` defines the rules, while the `RoleBinding` constrains those rules to a single namespace.

```yaml
# RoleBinding referencing a ClusterRole — scoped to one namespace only
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: view-binding
  namespace: staging
subjects:
  - kind: ServiceAccount
    name: ci-pipeline
    namespace: staging
roleRef:
  kind: ClusterRole          # ClusterRole, but bound to one namespace via RoleBinding
  name: view                 # Kubernetes built-in ClusterRole: read-only access to most resources
  apiGroup: rbac.authorization.k8s.io
```

Kubernetes ships with several useful built-in ClusterRoles: `view` (read-only access to most resources), `edit` (read/write to most resources), `admin` (full namespace admin), and `cluster-admin` (full cluster admin). Use them rather than reinventing them.

### How to Use Service Accounts Safely

Every pod in Kubernetes runs as a service account. If you don't specify one, Kubernetes uses the `default` service account in that namespace.

The default service account starts with no permissions – but it still has a token automatically mounted into every pod at <VPIcon icon="fas fa-folder-open"/>`/var/run/secrets/kubernetes.io/serviceaccount/token`. This means every container in your cluster can authenticate to the API server by default, even if it has nothing useful to do there.

The single most impactful change you can make is to disable this automatic token mounting on service accounts that don't need API access:

```yaml title="serviceaccount.yaml"
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app
  namespace: production
automountServiceAccountToken: false   # no token mounted into pods by default
```

You can also control it at the pod level:

```yaml
spec:
  automountServiceAccountToken: false   # override at pod level
  serviceAccountName: my-app
  containers:
    - name: app
      image: my-app:1.0
```

#### The cluster-admin anti-pattern:

Never bind `cluster-admin` to a service account that runs in a pod. `cluster-admin` grants full read/write access to every resource in the cluster. An attacker who compromises a pod running as `cluster-admin` owns your cluster completely.

You will see this in Helm charts and tutorials because it "makes things work". It works because it disables the entire authorisation layer. That is not a solution – it's a ticking clock.

The Capital One breach is a direct example of this pattern at the cloud layer: an EC2 instance role had permissions far beyond what the application needed. The SSRF vulnerability was the initial foothold. The over-privileged role was what turned a minor bug into a $80 million fine.

### How to Audit Your RBAC Configuration

The `kubectl auth can-i` command lets you check permissions for any subject. Use `--as` to impersonate a service account:

```sh
SA="system:serviceaccount:staging:ci-pipeline"

# These should return 'yes'
kubectl auth can-i list pods        --namespace staging --as $SA
kubectl auth can-i get  configmaps  --namespace staging --as $SA

# These should return 'no'
kubectl auth can-i delete pods      --namespace staging --as $SA
kubectl auth can-i get  secrets     --namespace staging --as $SA
kubectl auth can-i list pods        --namespace production --as $SA
```

To list every permission a subject has in a namespace:

```sh
kubectl auth can-i --list \
--namespace staging \
--as system:serviceaccount:staging:ci-pipeline
```

For a visual matrix across the whole cluster, install [rakkess (<VPIcon icon="iconfont icon-github"/>`corneliusweig/rakkess`)](https://github.com/corneliusweig/rakkess) (part of krew):

```sh
kubectl krew install access-matrix

# Permission matrix for all service accounts in staging
kubectl access-matrix --namespace staging
#
# NAME          GET  LIST  WATCH  CREATE  UPDATE  PATCH  DELETE
# ci-pipeline    ✓    ✓     ✓      ✗       ✗       ✗      ✗
# default        ✗    ✗     ✗      ✗       ✗       ✗      ✗
# monitoring     ✓    ✓     ✓      ✗       ✗       ✗      ✗
```

If you see `✓` in the CREATE, UPDATE, PATCH, or DELETE columns for a service account that should only read, that's a finding that needs remediation.

::: critical The wildcard danger

The most dangerous RBAC configuration is a wildcard on all three dimensions:

```yaml
apiGroups: [""] 
resources: [""] 
verbs: ["*"]
```

This is functionally identical to `cluster-admin`. You will find it in Helm charts for controllers installed with "convenience" permissions. Always audit third-party RBAC before installing operators into a production cluster.

:::

---

## Demo 2 – Build a Least-Privilege RBAC Policy for a CI Pipeline

In this demo, you'll create a service account for a CI pipeline that can list pods and read configmaps in the `staging` namespace – and nothing else.

### Step 1: Create the namespace and service account

```sh
kubectl create namespace staging
```

```yaml title="ci-serviceaccount.yaml"
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ci-pipeline
  namespace: staging
automountServiceAccountToken: false
```

```sh
kubectl apply -f ci-serviceaccount.yaml
```

### Step 2: Create the Role

```yaml title="ci-role.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ci-reader
  namespace: staging
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list"]
```

```sh
kubectl apply -f ci-role.yaml
```

### Step 3: Bind the Role to the service account

```yaml title="ci-rolebinding.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ci-reader-binding
  namespace: staging
subjects:
  - kind: ServiceAccount
    name: ci-pipeline
    namespace: staging
roleRef:
  kind: Role
  name: ci-reader
  apiGroup: rbac.authorization.k8s.io
```

```sh
kubectl apply -f ci-rolebinding.yaml
```

### Step 4: Test allowed operations

```sh
SA="system:serviceaccount:staging:ci-pipeline"

kubectl auth can-i list pods       --namespace staging     --as $SA   # yes
kubectl auth can-i get  pods       --namespace staging     --as $SA   # yes
kubectl auth can-i list configmaps --namespace staging     --as $SA   # yes
```

### Step 5: Test denied operations

```sh
kubectl auth can-i delete pods       --namespace staging     --as $SA   # no
kubectl auth can-i get  secrets      --namespace staging     --as $SA   # no
kubectl auth can-i list pods         --namespace production  --as $SA   # no
kubectl auth can-i create deployments --namespace staging    --as $SA   # no
```

All four should return `no`. Notice the third test: even if there were a matching Role in the `staging` namespace, the service account cannot access `production`. A `RoleBinding` cannot cross namespace boundaries, this is by design.

Writing a least-privilege policy for a service account you control is the easy part. The harder part is auditing what already exists in a cluster. That's what Demo 3 covers.

---

## Demo 3 – Audit RBAC with rakkess and rbac-lookup

Now you'll scan the full cluster to surface any accounts with more permissions than they need.

### Step 1: Install the tools

```sh
kubectl krew install access-matrix
kubectl krew install rbac-lookup
```

### Step 2: Run rakkess across the cluster

```sh
# All service accounts in kube-system
kubectl access-matrix --namespace kube-system

# All ServiceAccounts cluster-wide
kubectl access-matrix
```

### Step 3: Find all cluster-admin bindings

There are two ways subjects get cluster-admin access: via a `ClusterRoleBinding` (cluster-wide), or via a `RoleBinding` that references the `cluster-admin` ClusterRole (namespace-scoped, still dangerous). Check both:

```sh
# Find ClusterRoleBindings that grant cluster-admin
kubectl rbac-lookup cluster-admin --kind ClusterRole --output wide
```

On a fresh kind cluster this returns:

```plaintext title="output"
No RBAC Bindings found
```

That is the correct and expected result. A default kind cluster doesn't create any `ClusterRoleBindings` to `cluster-admin`. The role exists, but nothing is bound to it at the cluster level by default. If you see entries here in your production cluster, each one is a finding worth investigating.

To find who has cluster-level admin access through other means, query the bindings directly:

```sh
# Find all ClusterRoleBindings and the subjects they grant
kubectl get clusterrolebindings -o wide
#
# NAME                                                   ROLE                                                                       AGE   USERS                         GROUPS                         SERVICEACCOUNTS
# cluster-admin                                          ClusterRole/cluster-admin                                                  10d   system:masters
# system:kube-controller-manager                         ClusterRole/system:kube-controller-manager                                 10d
# system:kube-scheduler                                  ClusterRole/system:kube-scheduler                                          10d
# system:node                                            ClusterRole/system:node                                                    10d
# ...
```

The `cluster-admin` ClusterRoleBinding grants access to the `system:masters` group – the group your kubeconfig certificate belongs to. This is expected. Every other binding in this list is worth reviewing to understand what it grants and why.

::: note What to look for

Any binding where the SERVICEACCOUNTS column is populated with an application service account (not a `system:` prefixed one) is a potential over-privilege finding. Application pods should never need cluster-admin.

:::

### Step 4: Verify the ci-pipeline service account

```sh
kubectl rbac-lookup ci-pipeline --kind ServiceAccount --output wide
#
# SUBJECT                               SCOPE     ROLE             SOURCE
# ServiceAccount/staging:ci-pipeline    staging   Role/ci-reader   RoleBinding/ci-reader-binding
```

The format is `/<role-name> <binding-kind>/<binding-name>`. This tells you:

- The service account is bound to the `ci-reader` Role
- The binding is a `RoleBinding` named `ci-reader-binding`
- There is no namespace prefix on the role name because it is a namespaced `Role`, not a `ClusterRole`

If the output showed `ClusterRole/something` here, that would be a finding. It would mean the service account has cluster-wide permissions, not namespace-scoped ones.

**rbac-lookup vs kubectl get:** `rbac-lookup` gives you a subject-centric view: "what does this account have access to?" `kubectl get rolebindings,clusterrolebindings -A` gives you a binding-centric view: "what bindings exist in the cluster?" Use both. rbac-lookup is faster for auditing a specific service account, while the `kubectl get` approach is better for a full cluster inventory.

With RBAC locked down, the API server is protected. But RBAC says nothing about what a container can do once it's running. That's a separate layer entirely.

---

## How to Harden Pod Runtime Security

RBAC controls who can talk to the Kubernetes API. Pod security controls what containers can do once they're running on a node. These are different threat vectors: RBAC protects the control plane, pod security protects the data plane.

A container that runs as root with no capability restrictions can, if compromised, write backdoors to the host filesystem, load kernel modules, read the memory of other processes if `hostPID: true` is set, and in some configurations escape the container entirely. Pod security closes these doors before an attacker can open them.

### A Case Study: The Hildegard Malware Campaign

In early 2021, Palo Alto's Unit 42 research team documented a cryptomining malware campaign called Hildegard that specifically targeted Kubernetes clusters. The attack chain was:

1. Find a cluster with the kubelet API exposed without authentication
2. Deploy a privileged pod with `hostPID: true`
3. Use the privileged pod to read credentials from other containers' memory
4. Establish persistence by writing to the host filesystem

Steps 3 and 4 would have been impossible if the pods in the cluster had been running with `readOnlyRootFilesystem: true`, dropped capabilities, and no `hostPID`. The attacker had the initial foothold. Pod security would have contained the blast radius.

### Pod Security Admission

Pod Security Admission (PSA) is the built-in admission controller that enforces pod security standards at the namespace level. It replaced PodSecurityPolicy in Kubernetes 1.25. **Migrating from PSP?** If you're on Kubernetes < 1.25, you may still be using PodSecurityPolicy, which was removed in 1.25. The migration path is: enable PSA in `audit` mode first to identify violations, fix them workload by workload, then switch to `enforce`. For policies PSA cannot express, add Kyverno alongside it.

PSA defines three profiles:

| Profile | Who it's for | What it restricts |
| --- | --- | --- |
| `privileged` | System components (CNI plugins, monitoring agents) | Nothing – no restrictions |
| `baseline` | Most workloads | Blocks known privilege escalations: no `hostNetwork`, no `hostPID`, no privileged containers |
| `restricted` | Security-sensitive workloads | Everything in baseline, plus: must run as non-root, must drop capabilities, must set a seccomp profile |

And three enforcement modes:

| Mode | Effect | When to use |
| --- | --- | --- |
| `enforce` | Rejects pods that violate the profile at admission | Production – once you've fixed violations |
| `audit` | Allows pods but records violations in the audit log | Migration – see what would break without breaking anything |
| `warn` | Allows pods but sends a warning to the client | Development – fast feedback in your terminal |

The migration path: start with `audit` and `warn` to identify violations, fix them, then switch to `enforce`. The two modes can run simultaneously.

Apply them as namespace labels:

```yaml title="namespace-staging.yaml"
apiVersion: v1
kind: Namespace
metadata:
  name: staging
  labels:
    # Start here: audit and warn simultaneously
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/audit-version: latest
    pod-security.kubernetes.io/warn: restricted
    pod-security.kubernetes.io/warn-version: latest
```

Once violations are resolved, add enforce:

```sh
kubectl label namespace staging \
pod-security.kubernetes.io/enforce=restricted \
pod-security.kubernetes.io/enforce-version=latest \
--overwrite
```

Note: don't use `--overwrite` here. Without it, if `enforce` is already set to a different value the command will error – which is exactly what you want. You should see:

```plaintext
namespace/staging labeled
```

If you see `namespace/staging not labeled`, it means `enforce=restricted` and `enforce-version=latest` were already set to those exact values. Confirm enforcement is active:

```sh
kubectl get namespace staging --show-labels
```

Look for `pod-security.kubernetes.io/enforce=restricted` in the output. If it's there, enforcement is active.

### How to Configure securityContext

A `securityContext` defines the privilege and access control settings for a pod or container. These are the seven fields you should configure on every production workload:

| Field | Set at | What it controls |
| --- | --- | --- |
| `runAsNonRoot` | Pod | Rejects containers that run as UID 0 (root) |
| `runAsUser` / `runAsGroup` | Pod | Sets a specific UID/GID – don't rely on the image default |
| `fsGroup` | Pod | All mounted volumes are owned by this GID |
| `seccompProfile` | Pod | Filters syscalls using a seccomp profile |
| `allowPrivilegeEscalation` | Container | Blocks `setuid` binaries and `sudo` |
| `readOnlyRootFilesystem` | Container | Makes the container filesystem read-only |
| `capabilities.drop` | Container | Removes Linux capabilities (drop `ALL`, add back only what is needed) |

The annotated YAML below shows all seven in context:

```yaml :collapsed-lines title="secure-deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-app
  namespace: staging
spec:
  replicas: 2
  selector:
    matchLabels:
      app: secure-app
  template:
    metadata:
      labels:
        app: secure-app
    spec:
      securityContext:
        runAsNonRoot: true         # container must run as a non-root user
        runAsUser: 10001           # explicit UID — don't rely on the image's default
        runAsGroup: 10001          # explicit GID
        fsGroup: 10001             # volumes are owned by this group
        seccompProfile:
          type: RuntimeDefault     # use the container runtime's default seccomp profile
      automountServiceAccountToken: false
      containers:
        - name: app
          image: nginx:1.25-alpine
          securityContext:
            allowPrivilegeEscalation: false   # block setuid and sudo inside the container
            readOnlyRootFilesystem: true      # the single highest-impact setting
            capabilities:
              drop:
                - ALL                         # drop every Linux capability
              add: []                         # add back only what is explicitly needed
          volumeMounts:
            - name: tmp
              mountPath: /tmp
            - name: nginx-cache
              mountPath: /var/cache/nginx
            - name: nginx-run
              mountPath: /var/run
      volumes:
        # nginx needs writable directories — provide them as emptyDir volumes
        - name: tmp
          emptyDir: {}
        - name: nginx-cache
          emptyDir: {}
        - name: nginx-run
          emptyDir: {}
```

#### Why `readOnlyRootFilesystem: true` is the most important setting:

Most post-exploitation techniques require writing to the filesystem. Dropping a backdoor, modifying a binary, writing a cron job, or installing a keylogger all require a writable filesystem. Set `readOnlyRootFilesystem: true` and every one of these techniques is blocked.

The downside is that many applications write to directories like `/tmp` or `/var/cache`. The fix is to mount `emptyDir` volumes at those specific paths, as shown above. The rest of the filesystem stays read-only.

::: info What each field prevents:

| Field | What it prevents |
| --- | --- |
| `runAsNonRoot: true` | Blocks containers that were built to run as root – they fail at admission |
| `runAsUser: 10001` | Ensures a known, non-privileged UID even if the image doesn't set one |
| `allowPrivilegeEscalation: false` | Blocks `setuid` binaries and `sudo` – the most common privilege escalation path |
| `readOnlyRootFilesystem: true` | Prevents writing backdoors, modifying binaries, or creating persistence |
| `capabilities: drop: ALL` | Removes Linux capabilities like `NET_RAW` (raw socket access) and `SYS_ADMIN` (kernel operations) |
| `seccompProfile: RuntimeDefault` | Filters syscalls to a safe default set – blocks ~300 of the ~400 available syscalls |

:::

### OPA/Gatekeeper vs Kyverno

PSA covers the fundamentals. But you'll eventually need policies that PSA cannot express: all images must come from your private registry, all pods must have resource limits, no container may use the `latest` tag. For these, you need a policy engine.

Two mature options exist:

|  | OPA/Gatekeeper | Kyverno |
| --- | --- | --- |
| **Policy language** | Rego (a custom logic language) | YAML, same format as Kubernetes resources |
| **Learning curve** | Steep: Rego takes real time to learn | Gentle: if you write YAML, you can write policies |
| **Mutation** | Yes, via `Assign`/`AssignMetadata` | Yes: first-class, well-documented feature |
| **Audit mode** | Yes: reports existing violations | Yes: policy audit mode |
| **Ecosystem** | Integrates with OPA in non-K8s contexts | Kubernetes-native only |
| **Best for** | Complex cross-resource logic and teams already using OPA | Teams who want K8s-native syntax and fast setup |

If you're starting fresh, Kyverno gets you to working policies faster. Here is a Kyverno policy that blocks images from outside your trusted registry:

```yaml title="kyverno-registry-policy.yaml"
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: restrict-image-registries
spec:
  validationFailureAction: Enforce
  background: true
  rules:
    - name: validate-registries
      match:
        any:
          - resources:
              kinds: ["Pod"]
      validate:
        message: "Images must come from registry.corp.internal/"
        pattern:
          spec:
            containers:
              - image: "registry.corp.internal/*"
```

### How to Detect Runtime Threats with Falco

PSA and `securityContext` are preventive controls: they block known-bad configurations before pods start. Falco is a detective control. It watches what containers do while they're running and alerts when something looks wrong.

Falco operates at the syscall level using eBPF. It attaches to the Linux kernel and intercepts every system call made by every container on the node – file opens, network connections, process spawns, privilege escalations. It does this without modifying containers, without injecting sidecars, and with minimal overhead.

#### What Falco detects out of the box:

Falco's default ruleset covers the most common attack patterns. It fires when a shell is opened inside a running container, whether that's a `kubectl exec` session or a reverse shell from an exploit.

It watches for reads on sensitive files like <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-key"/>`shadow`, <VPIcon icon="fas fa-folder-open"/>`/etc/kubernetes/`<VPIcon icon="fas fa-gears"/>`admin.conf`, and <VPIcon icon="fas fa-folder-open"/>`/root/.ssh/`. It catches the dropper pattern: a binary written to disk and immediately executed. It detects outbound connections to known malicious IPs, writes to <VPIcon icon="fas fa-folder-open"/>`/proc` or <VPIcon icon="fas fa-folder-open"/>`/sys` that suggest kernel manipulation, and package managers like `apt`, `yum`, or `pip` being run inside containers that have no business installing software.

Each of these is a rule in Falco's default ruleset. You can extend it with custom rules for your specific workloads – which is exactly what you'll do in Demo 5. But first let's harden the Pod.

---

## Demo 4 – Harden a Pod with securityContext

In this demo, you'll start with a default nginx deployment, observe the PSA violations it triggers, harden it step by step, and confirm it passes under the `restricted` profile.

### Step 1: Apply PSA labels in audit mode

```sh
kubectl label namespace staging \
pod-security.kubernetes.io/audit=restricted \
pod-security.kubernetes.io/warn=restricted
```

### Step 2: Deploy insecure nginx and observe the warnings

```yaml title="insecure-nginx.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-insecure
  namespace: staging
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-insecure
  template:
    metadata:
      labels:
        app: nginx-insecure
    spec:
      containers:
        - name: nginx
          image: nginx:1.25-alpine
```

```sh
kubectl apply -f insecure-nginx.yaml
```

Expected output (PSA warns but still creates the deployment in `warn` mode):

```plaintext title="output"
Warning: would violate PodSecurity "restricted:latest":
  allowPrivilegeEscalation != false (container "nginx" must set
    securityContext.allowPrivilegeEscalation=false)
  unrestricted capabilities (container "nginx" must set
    securityContext.capabilities.drop=["ALL"])
  runAsNonRoot != true (pod or container "nginx" must set
    securityContext.runAsNonRoot=true)
  seccompProfile not set (pod or container "nginx" must set
    securityContext.seccompProfile.type to "RuntimeDefault" or "Localhost")
deployment.apps/nginx-insecure created
```

Four violations. Every one of them is a real security gap. But the pod was still created "deployment.apps/nginx-insecure created"

### Step 3: Deploy the hardened version

```sh
kubectl apply -f secure-deployment.yaml   # the YAML from the securityContext section above
```

No warnings this time.

### Step 4: Switch the namespace to enforce

```sh
kubectl label namespace staging \
pod-security.kubernetes.io/enforce=restricted \
pod-security.kubernetes.io/enforce-version=latest
#
# namespace/staging labeled
```

This is the moment enforcement becomes active. Any new pod that violates the `restricted` profile will be rejected from this point on.

### Step 5: Confirm insecure deployments are now rejected

```sh
kubectl delete deployment nginx-insecure -n staging
kubectl apply -f insecure-nginx.yaml
#
# Warning: would violate PodSecurity "restricted:latest": allowPrivilegeEscalation != false ...
# deployment.apps/nginx-insecure created
```

The Deployment object is created. PSA enforces at the **pod** level, not the Deployment level. The Deployment and its ReplicaSet exist, but every attempt to create a pod is rejected. Check the ReplicaSet:

```sh
kubectl get replicaset -n staging -l app=nginx-insecure
#
# NAME                       DESIRED   CURRENT   READY   AGE
# nginx-insecure-b668d867b   1         0         0       30s
```

`DESIRED=1` but `CURRENT=0`. The ReplicaSet cannot create any pods because they're rejected at admission. Describe the ReplicaSet to see the rejection events:

```sh
kubectl describe replicaset -n staging -l app=nginx-insecure
#
# Warning  FailedCreate  ReplicaSet "nginx-insecure-b668d867b" create Pod
#   "nginx-insecure-xxx" failed: pods is forbidden: violates PodSecurity
#   "restricted:latest": allowPrivilegeEscalation != false, unrestricted
#   capabilities, runAsNonRoot != true, seccompProfile not set
```

The hardened deployment continues running with its pods intact. The insecure one has zero pods and never will. This is exactly how PSA is supposed to work.

### Step 6: Score the hardened pod with kube-score

[<VPIcon icon="iconfont icon-github"/>`zegl/kube-score`](https://github.com/zegl/kube-score) is a static analysis tool that scores Kubernetes manifests against security and reliability best practices:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
brew install kube-score
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
https://github.com/zegl/kube-score/releases
```

:::

```sh :collapsed-lines
kube-score score secure-deployment.yaml -v
#
# apps/v1/Deployment secure-app in staging 
#   path=secure-deployment.yaml
#     [OK] Stable version
#     [OK] Label values
#     [CRITICAL] Container Resources
#         · app -> CPU limit is not set
#             Resource limits are recommended to avoid resource DDOS. Set resources.limits.cpu
#         · app -> Memory limit is not set
#             Resource limits are recommended to avoid resource DDOS. Set resources.limits.memory
#         · app -> CPU request is not set
#             Resource requests are recommended to make sure that the application can start and run without crashing. Set resources.requests.cpu
#         · app -> Memory request is not set
#             Resource requests are recommended to make sure that the application can start and run without crashing. Set resources.requests.memory
#     [CRITICAL] Container Image Pull Policy
#         · app -> ImagePullPolicy is not set to Always
#             It's recommended to always set the ImagePullPolicy to Always, to make sure that the imagePullSecrets are always correct, and to always get the image you want.
#     [OK] Pod Probes Identical
#     [CRITICAL] Container Ephemeral Storage Request and Limit
#         · app -> Ephemeral Storage limit is not set
#             Resource limits are recommended to avoid resource DDOS. Set resources.limits.ephemeral-storage
#         · app -> Ephemeral Storage request is not set
#             Resource requests are recommended to make sure the application can start and run without crashing. Set resource.requests.ephemeral-storage
#     [OK] Environment Variable Key Duplication
#     [OK] Container Security Context Privileged
#     [OK] Pod Topology Spread Constraints
#         · Pod Topology Spread Constraints
#             No Pod Topology Spread Constraints set, kube-scheduler defaults assumed
#     [OK] Container Image Tag
#     [CRITICAL] Pod NetworkPolicy
#         · The pod does not have a matching NetworkPolicy
#             Create a NetworkPolicy that targets this pod to control who/what can communicate with this pod. Note, this feature needs to be supported by the CNI implementation used in the Kubernetes cluster to have an effect.
#     [OK] Container Security Context User Group ID
#     [OK] Container Security Context ReadOnlyRootFilesystem
#     [CRITICAL] Deployment has PodDisruptionBudget
#         · No matching PodDisruptionBudget was found
#             It's recommended to define a PodDisruptionBudget to avoid unexpected downtime during Kubernetes maintenance operations, such as when draining a node.
#     [WARNING] Deployment has host PodAntiAffinity
#         · Deployment does not have a host podAntiAffinity set
#             It's recommended to set a podAntiAffinity that stops multiple pods from a deployment from being scheduled on the same node. This increases availability in case the node becomes unavailable.
#     [OK] Deployment Pod Selector labels match template metadata labels
```

Notice there are no security context violations: `securityContext`, `readOnlyRootFilesystem`, `seccompProfile`, and `runAsNonRoot` all pass. The remaining findings are about **resource management** (CPU/memory limits, ephemeral storage), **availability** (PodDisruptionBudget, anti-affinity), and **network policy** – not security context hardening. Those are important for production readiness, but they're a separate concern from the pod security hardening we did here.

You now have a pod that PSA accepts and kube-score validates. The next step is to add a detection layer – something that watches what the pod does at runtime, not just how it was configured at admission.

---

## Demo 5 – Deploy Falco and Write a Custom Detection Rule

Now, you'll deploy Falco in eBPF mode, trigger a default alert, then extend Falco with a custom rule that catches `curl` and `wget` being run inside containers.

### Step 1: Install Falco via Helm

```sh
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm repo update

helm install falco falcosecurity/falco \
--namespace falco \
--create-namespace \
--set driver.kind=modern_ebpf \
--set tty=true \
--wait
```

Confirm Falco is running on every node:

```sh
kubectl get pods -n falco
#
# NAME           READY   STATUS    RESTARTS   AGE
# falco-x8k2p    1/1     Running   0          45s
# falco-m9nqr    1/1     Running   0          45s
# falco-j4tpw    1/1     Running   0          45s
```

One pod per node. Falco runs as a DaemonSet because it needs to monitor syscalls on every node independently.

### Step 2: Trigger a default alert

Open a second terminal and stream the Falco logs:

```sh
# Terminal 2 — watch for alerts
kubectl logs -n falco -l app.kubernetes.io/name=falco -f --max-log-requests 3
```

In your first terminal, exec into the secure-app pod:

```sh
# Terminal 1 — trigger the shell detection
POD=$(kubectl get pod -n staging -l app=secure-app \
  -o jsonpath='{.items[0].metadata.name}')
kubectl exec -it $POD -n staging -- sh
```

Within a second, Terminal 2 shows:

```plaintext title="terminal 2 output"
2024-03-15T14:23:41.456Z: Notice A shell was spawned in a container with an attached terminal
  (user=root user_loginuid=-1 k8s.ns=staging k8s.pod=secure-app-7d9f8b-xxx
   container=app shell=sh parent=runc cmdline=sh terminal=34816)
  rule=Terminal shell in container  priority=NOTICE
  tags=[container, shell, mitre_execution]
```

This is Falco's built-in `Terminal shell in container` rule firing. It detected the `kubectl exec` session the moment you ran it.

### Step 3: Write a custom rule

The built-in rules are comprehensive, but every production environment has workloads with unique behaviour. Here is a custom rule that alerts when `curl` or `wget` is executed inside any container:

```yaml title="custom-rules.yaml"
customRules:
  custom-rules.yaml: |-
    - rule: Suspicious network tool in container
      desc: >
        Detects execution of curl or wget inside a running container.
        These tools are commonly used for data exfiltration, downloading
        attacker payloads, or reaching command-and-control servers.
        Production containers should not be making ad-hoc HTTP requests.
      condition: >
        spawned_process
        and container
        and proc.name in (curl, wget)
      output: >
        Network tool executed in container
        (user=%user.name tool=%proc.name cmd=%proc.cmdline
         pod=%k8s.pod.name ns=%k8s.ns.name image=%container.image)
      priority: WARNING
      tags: [network, exfiltration, custom]
```

Apply it by upgrading the Helm release:

```sh
helm upgrade falco falcosecurity/falco \
--namespace falco \
--set driver.kind=modern_ebpf \
--set tty=true \
-f custom-rules.yaml
```

Good, it deployed. Now wait for pods to be ready and test your custom rule:

### Step 4: Test the custom rule

```sh
# Terminal 1 — run curl inside the container
kubectl exec -it $POD -n staging -- sh -c 'curl https://example.com'
```

Terminal 2 immediately shows:

```plaintext title="terminal 2 output"
2024-03-15T14:31:07.812Z: Warning Network tool executed in container
  (user=root tool=curl cmd=curl https://example.com
   pod=secure-app-7d9f8b-xxx ns=staging image=nginx:1.25-alpine)
  rule=Suspicious network tool in container  priority=WARNING
  tags=[network, exfiltration, custom]
```

### Step 5: Route alerts to Slack with Falcosidekick

Streaming logs is useful during development. In production, you need alerts routed to your alerting pipeline. Falcosidekick handles this with support for Slack, PagerDuty, Datadog, Elasticsearch, and over 50 other outputs:

```yaml title="falcosidekick-values.yaml"
config:
  slack:
    webhookurl: "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
    minimumpriority: "warning"
    messageformat: >
      [{{.Priority}}] {{.Rule}} |
      pod: {{.OutputFields.k8s.pod.name}} |
      ns: {{.OutputFields.k8s.ns.name}} |
      image: {{.OutputFields.container.image}}
```

```sh
helm install falcosidekick falcosecurity/falcosidekick \
  --namespace falco \
  -f falcosidekick-values.yaml
```

**Tuning Falco for production:** A fresh Falco deployment will generate false positives, especially in the first week. Your job is to tune rules to match your workloads' normal behaviour, not to respond to every alert.

Here's the workflow: deploy in staging → identify false positives → add `except` conditions to rules → validate the false positive rate is low → enable in production with alerting.

---

## Cleanup

To remove everything created in this article:

```sh
# Delete the staging namespace and everything in it
kubectl delete namespace staging
 
# Delete Falco and Falcosidekick
helm uninstall falco -n falco
helm uninstall falcosidekick -n falco
kubectl delete namespace falco
 
# Delete the kind cluster entirely
kind delete cluster --name k8s-security
```

---

## Conclusion

In this handbook, you secured a Kubernetes cluster across three layers: RBAC, pod runtime security, and runtime threat detection.

You built a least-privilege service account, enforced the restricted Pod Security Admission profile, hardened pods with securityContext, deployed Falco for syscall-level detection, and wrote a custom rule to catch suspicious tools inside containers.

Each layer maps to a real-world breach – Tesla, Capital One, Hildegard – showing how these controls would have contained the damage. Run kube-bench again to measure the improvement.

All YAML manifests, Helm values, and setup scripts from this article are available in the [companion GitHub repository (<VPIcon icon="iconfont icon-github"/>`Caesarsage/DevOps-Cloud-Projects`)](https://github.com/Caesarsage/DevOps-Cloud-Projects/tree/main/intermediate/security).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Secure a Kubernetes Cluster: RBAC, Pod Hardening, and Runtime Protection",
  "desc": "In 2018, RedLock's cloud security research team discovered that Tesla's Kubernetes dashboard was exposed to the public internet with no password on it. An attacker had found it, deployed pods inside T",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-secure-a-kubernetes-cluster-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
