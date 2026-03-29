---
lang: en-US
title: "How to Run Multiple Kubernetes Clusters Without the Overhead Using kcp"
description: "Article(s) > How to Run Multiple Kubernetes Clusters Without the Overhead Using kcp"
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
      content: "Article(s) > How to Run Multiple Kubernetes Clusters Without the Overhead Using kcp"
    - property: og:description
      content: "How to Run Multiple Kubernetes Clusters Without the Overhead Using kcp"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-multiple-kubernetes-clusters-without-the-overhead-using-kcp.html
prev: /devops/k8s/articles/README.md
date: 2026-03-28
isOriginal: false
author:
  - name: Olalekan Odukoya
    url: https://freecodecamp.org/news/author/olamilekan000/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a42c1a28-7a9e-4676-891d-eae7d64f2900.png
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
  name="How to Run Multiple Kubernetes Clusters Without the Overhead Using kcp"
  desc="In Kubernetes, when you need to isolate workloads, you might start by using namespaces. Namespaces provide a simple way to separate workloads within a single cluster. But as your requirements grow, es"
  url="https://freecodecamp.org/news/how-to-run-multiple-kubernetes-clusters-without-the-overhead-using-kcp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a42c1a28-7a9e-4676-891d-eae7d64f2900.png"/>

In Kubernetes, when you need to isolate workloads, you might start by using namespaces. Namespaces provide a simple way to separate workloads within a single cluster.

But as your requirements grow, especially around compliance, security, multi-tenancy, or conflicting dependencies, your team will likely move beyond namespaces and start creating separate clusters.

What starts as a clean separation quickly becomes cluster sprawl, bringing higher costs, complex networking, and constant operational overhead.

In this article, we'll explore how **kcp** can help fix this problem by allowing you to run multiple “logical clusters” inside a single control plane.

::: note Prerequisites

- **kubectl** installed.
- A terminal to run commands
- **Curl** installed

:::

---

## The Challenge of Namespaces and Multiple Kubernetes Clusters

While namespaces provide some level of isolation, many teams often default to creating entirely new Kubernetes clusters to achieve stronger multi-tenancy, environment separation, or geographic distribution.

At first, this approach works well. But as systems grow, managing a fleet of clusters introduces challenges that often outweigh the benefits.

Every new cluster comes with its own control plane, which you'll need to continuously patch, upgrade, and monitor. Over time, this operational overhead will add up, consuming cycles that platform teams could otherwise spend on higher-value work.

Also, clusters don't naturally share service discovery or identity. This forces you to introduce extra layers like service meshes or VPN-based networking, which increases your system's complexity and expands the overall attack surface.

There’s also the cost factor. Clusters incur baseline infrastructure costs regardless of how much workload they run. Creating dedicated clusters for small teams can lead to underutilized resources or, worse, delay the creation of necessary environments because the cost feels too high.

As a result, platform teams often find themselves acting as “cluster plumbers”, spending more time maintaining infrastructure than enabling developer productivity.

### Illustrating the Namespace Problem

As I mentioned earlier, when managing multiple clusters gets too complex, a natural alternative is to use namespaces for isolation within a single cluster.

At first glance, this seems like the perfect solution.

But to understand where this approach falls short, let’s walk through a real-world example using a common requirement in shared Kubernetes environments: running databases.

We'll start by creating different namespaces for each team:

```sh
kubectl create namespace team-a 
kubectl create namespace team-b
```

Let's say **Team A** needs a MongoDB database for one of its services. The team must first install the required [MongoDB Custom Resource Definitions (CRDs) (<VPIcon icon="iconfont icon-github"/>`mongodb/mongodb-kubernetes`)](https://github.com/mongodb/mongodb-kubernetes) into the cluster, so Kubernetes knows how to understand the different `MongoDB` resources:

```sh
kubectl apply -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes/1.7.0/public/crds.yaml
#
# customresourcedefinition.apiextensions.k8s.io/clustermongodbroles.mongodb.com created 
# customresourcedefinition.apiextensions.k8s.io/mongodb.mongodb.com created
# customresourcedefinition.apiextensions.k8s.io/mongodbmulticluster.mongodb.com created 
# customresourcedefinition.apiextensions.k8s.io/mongodbsearch.mongodb.com created
# customresourcedefinition.apiextensions.k8s.io/mongodbusers.mongodb.com created
# customresourcedefinition.apiextensions.k8s.io/opsmanagers.mongodb.com created
# customresourcedefinition.apiextensions.k8s.io/mongodbcommunity.mongodbcommunity.mongodb.com created
```

Secondly, **Team A** installs the actual Operator application (the controller that continuously runs the database logic) into their designated namespace. But the installation isn't completed due to the error below:

```sh
kubectl apply -n team-a -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes/1.7.0/public/mongodb-kubernetes.yaml
#
# the namespace from the provided object "mongodb" does not match the namespace "team-a". You must pass '--namespace=mongodb' to perform this operation.
```

Why did this fail? This is because most Kubernetes Operators are designed assuming they own the entire cluster and not just a single namespace.

To force the operator to run in `team-a`, we can modify the manifest on the fly:

```sh
curl -s https://raw.githubusercontent.com/mongodb/mongodb-kubernetes/1.7.0/public/mongodb-kubernetes.yaml \
| sed 's/namespace: mongodb/namespace: team-a/g' \
| kubectl apply -f 
```

We can then confirm that the operator is installed and running:

```sh
k get po -n team-a 
#
# NAME                                          READY STATUS  RESTARTS AGE 
# mongodb-kubernetes-operator-6f5f8bb7fd-8h5hj  1/1   Running 0        59s
```

But even after tricking the Operator into running inside `team-a`'s namespace, we still haven't solved the real problem.

At first glance, `team-a`'s operator is neatly confined to their namespace. But remember Step 1? **The CRDs aren't namespaced – they're strictly cluster-scoped.** So, even though `team-a` orchestrated this deployment purely for their own use, those CRDs are now globally registered across the entire cluster.

If Team B checks the API, they'll see all the MongoDB-related CRDs installed by Team A.

```sh
kubectl get crds | grep mongodb
#
# clustermongodbroles.mongodb.com               2026-03-24T10:49:35Z
# mongodb.mongodb.com                           2026-03-24T10:49:36Z
# mongodbcommunity.mongodbcommunity.mongodb.com 2026-03-24T10:49:38Z
# mongodbmulticluster.mongodb.com               2026-03-24T10:49:36Z
# mongodbsearch.mongodb.com                     2026-03-24T10:49:37Z 
# mongodbusers.mongodb.com                      2026-03-24T10:49:37Z 
# opsmanagers.mongodb.com                       2026-03-24T10:49:37Z
```

Now consider what happens if Team B needs to install a different version of MongoDB for its own services. Because the CRDs are shared across the cluster, both teams are now coupled to the same definitions. This means one team’s changes can easily impact the other, turning what should be isolated environments into a source of conflict.

---

## Introducing kcp

**kcp** is an open-source project that lets you run multiple logical Kubernetes clusters on a single control plane.

These logical clusters are called **workspaces**, and each one behaves like an independent Kubernetes cluster. Every workspace has its own API endpoint, authentication, authorization, and policies, giving teams the experience of working in fully isolated environments.

![brief kcp architecture and component](https://cdn.hashnode.com/uploads/covers/5e6abef0af89662115c0f5ca/ede32f6e-c260-426e-8d50-4f78f11fa1b1.svg)

This decoupling of the control plane from the worker nodes is what makes kcp different.

In traditional Kubernetes, spinning up a new cluster means provisioning a new API server, a new etcd instance, and all the associated controllers. With kcp, you spin up a workspace, and you have a strong, confined environment for your workload.

It's worth noting that **kcp itself doesn't run workloads.** It's strictly a control plane. Your actual applications still run on physical Kubernetes clusters. kcp only manages the workspaces and the synchronization of resources to those underlying clusters.

---

## Getting Started with kcp

Now that we've covered what kcp is and why it matters, let's get our hands dirty. We'll set up a local kcp environment and explore the core concepts in action.

To make this realistic, we'll follow a common kcp workflow: a platform team that provides custom APIs, and tenant teams that consume them.

In our case, the platform team will export a MongoDB API, and our two tenant teams will subscribe to those APIs using **APIBindings**. Once bound, they can deploy MongoDB instances into their workspaces and sync them to physical clusters.

This pattern is at the heart of how kcp enables scalable multi-tenancy. The platform team controls the API definitions and versioning. Tenant teams get self-service access without needing to understand the underlying infrastructure. Let's see how it works!

### Installing kcp

Running kcp locally is incredibly lightweight since there are no heavy worker nodes to spin up. You will need two things: the `kcp` server itself, `kubectl-kcp` , and the `kubectl-ws` plugin to manage workspaces.

To install the binaries, let's head over to the [kcp-dev releases page (<VPIcon icon="iconfont icon-github"/>`kcp-dev/kcp`)](https://github.com/kcp-dev/kcp/releases/tag/v0.30.1).

The commands below are for macOS Apple Silicon. If you're using an Intel Mac or Linux, simply replace `darwin_arm64` with your respective architecture.

1. Download the kcp server and workspace plugins:

```sh
curl -LO https://github.com/kcp-dev/kcp/releases/download/v0.30.1/kcp_0.30.1_darwin_arm64.tar.gz 

curl -LO https://github.com/kcp-dev/kcp/releases/download/v0.30.1/kubectl-kcp-plugin_0.30.1_darwin_arm64.tar.gz

curl -LO https://github.com/kcp-dev/kcp/releases/download/v0.30.1/kubectl-ws-plugin_0.30.1_darwin_arm64.tar.gz
```

1. Extract the archives:

```sh
tar -xzf kcp_0.30.1_darwin_arm64.tar.gz 
tar -xzf kubectl-kcp-plugin_0.30.1_darwin_arm64.tar.gz
tar -xzf kubectl-ws-plugin_0.30.1_darwin_arm64.tar.gz
```

1. Move the required binaries into your **PATH**:

```sh
sudo mv bin/kcp /usr/local/bin/
sudo mv bin/kubectl-kcp /usr/local/bin/
sudo mv bin/kubectl-ws /usr/local/bin/
```

You can confirm the installation by checking the version.

```sh
kcp --version
kcp version v1.33.3+kcp-v0.0.0-627385a6
```

### Starting the Server

With the binaries installed, let's boot up your local control plane and bind it to localhost. But first, let's create a <VPIcon icon="fas fa-folder-open"/>`work-folder`.

```sh
mkdir kcp-test
cd kcp-test
```

We can then start the kcp server in this directory.

```sh
kcp start --bind-address=127.0.0.1
```

You'll see a flurry of logs as kcp boots up its internal database and exposes the API server. Leave this terminal running in the background.

### Connecting to the Root Workspace

Open a new terminal window and navigate back into the `kcp-test` folder we just created.

At first, if you run a standard `ls` command, the folder will look empty. But during startup, kcp silently generated a hidden `.kcp` directory that contains our local certificates and our administrative `kubeconfig` file. Let's verify that:

```sh
cd kcp-test 
kcp-test ls
kcp-test ls -a . .. .kcp 
kcp-test ls .kcp admin.kubeconfig apiserver.crt apiserver.key etcd-server sa.key
```

Now that we know exactly where the configuration file lives, let's export it so our `kubectl` commands are routed to kcp instead of your default cluster:

```sh
export KUBECONFIG=$PWD/.kcp/admin.kubeconfig
```

Finally, let's use the workspace plugin we installed earlier to verify that we're connected accurately. You should see the message below printed to the console:

```sh
kubectl ws .
#
# Current workspace is 'root'.
```

This shows that you're now officially inside the kcp **root workspace**. This is the highest-level administrative boundary where we'll begin creating our tenant logical clusters.

### Creating and Managing Workspaces

As we discussed above, in a standard Kubernetes cluster, separating teams means using `kubectl create namespace`. In kcp, we solve the problem by creating entirely isolated logical clusters – workspaces.

If you recall our architecture diagram from earlier, we want to create three distinct environments for our company: one for the platform engineers to manage shared APIs, and two for our isolated tenant development teams.

Since we're currently inside the administrative `root` workspace, we can create our new tenant workspaces as children of the `root`:

```sh
kubectl ws create platform-team
#
# Workspace "platform-team" (type root:organization) created.
# Waiting for it to be ready... 
# Workspace "platform-team" (type root:organization) is ready to use.

kubectl ws create team-a 
#
# Workspace "team-a" (type root:organization) created.
# Waiting for it to be ready... 
# Workspace "team-a" (type root:organization) is ready to use.

kubectl ws create team-b
#
# Workspace "team-b" (type root:organization) created.
# Waiting for it to be ready... 
# Workspace "team-b" (type root:organization) is ready to use.
```

Now, here is where kcp truly shines. Unlike a standard cluster, where objects are just a massive flat list, kcp manages its API as a hierarchy. We can visually prove the structure of our new logical clusters using the `tree` command:

```sh
kubectl ws tree
#
# .
# └── root
#       ├── platform-team
#       ├── team-a
#       └── team-b
```

Jumping between these logical clusters is as fast as changing directories in a terminal. Let's switch our context over into Team A's workspace:

```sh
kubectl ws team-a 
#
# Current workspace is 'root:team-a' (type root:organization).
```

#### Proving the Isolation

To truly understand the power of what we just did, let's try running a standard Kubernetes command while inside `team-a`:

```sh
kubectl get namespaces
# 
# NAME STATUS AGE 
# default Active 15m
```

Let's also ask the cluster what APIs are actually available to us out of the box:

```sh
kubectl api-resources
```

Your output should be similar to what is in the image below:

![](https://cdn.hashnode.com/uploads/covers/5e6abef0af89662115c0f5ca/775eff52-8ae7-4363-bd37-fce6ab0cc587.png)

When you take a closer look at that list. You'll notice that there are no Pods, Deployments, or even ReplicaSets. You don't see all the available APIs that you see in a standard Kubernetes Cluster.

This output proves exactly what we discussed in the architecture section. kcp is incredibly lightweight because every new workspace is born **completely stripped of compute**. Out of the box, it only contains the absolute bare-minimum control plane APIs needed for routing, RBAC, namespaces, and authentication.

From Team A's perspective, they own this pristine, empty universe. If they install a massive, noisy operator right now, like the MongoDB CRD, it will only exist right here in this specific API bucket.

But this raises the ultimate question: If there are no `Deployments` or `Pods` APIs in this workspace... how do we actually deploy our applications?

---

## Deploying and Managing Applications

Now that we have set up our isolated environments, we must address the glaring issue from our last terminal output: **How do developers actually deploy applications** if there are no `Deployment` or `Pod` APIs?

In standard Kubernetes, the API is monolithic. You get everything whether you need it or not, and adding a new schema (like an Operator) forces it globally onto everyone.

kcp takes the exact opposite approach. Every workspace starts completely empty. You then selectively "subscribe" your workspace to only the APIs you actually need using two incredibly powerful new concepts: **APIExports** and **APIBindings**.

Let's see exactly how this solves our MongoDB multi-tenancy problem, step by step.

### 1. The Platform Team "Exports" the API

Instead of treating Custom Resource Definitions as global hazards, the platform engineers manage them centrally. First, lets switch into the platform-team workspace:

```sh
kubectl ws :root:platform-team
#
# Current workspace is 'root:platform-team' (type root:organization).
```

Here, we'll install the MongoDB Operator CRDs in the platform-team's workspace:

```sh
kubectl apply -f kubectl apply -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes/1.7.0/public/crds.yaml
```

To confirm that this is indeed isolated, let's first check what CRDs were installed,

```sh
kubectl get crd
#
# NAME                                          CREATED AT
# clustermongodbroles.mongodb.com               2026-03-24T20:45:50Z
# mongodb.mongodb.com                           2026-03-24T20:45:50Z
# mongodbcommunity.mongodbcommunity.mongodb.com 2026-03-24T20:45:51Z
# mongodbmulticluster.mongodb.com               2026-03-24T20:45:50Z
# mongodbsearch.mongodb.com                     2026-03-24T20:45:51Z
# mongodbusers.mongodb.com                      2026-03-24T20:45:51Z
# opsmanagers.mongodb.com                       2026-03-24T20:45:51Z
```

We can switch to `team-a'`s workspace (any of the team's workspaces can be used, we're just trying to establish that the installed **_CRD_** is only visible in the `platform-team'`s workspace).

```sh
kubectl ws :root:team-a
#
# Current workspace is 'root:team-a' (type root:organization).
```

```sh
kubectl get crd 
#
# No resources found
```

What we get as output is that there are no custom resources found or registered. This is the power of kcp.

If you don't want to continually type out paths to switch between your logical clusters, the `kcp` plugin includes a powerful interactive UI right in your terminal.

By running `kubectl ws -i`, you can use your arrow keys to navigate through your hierarchy and press `Enter` to instantly switch your context. Even better, this interactive mode provides a holistic view of your environment at any given time. With a single glance, you can see exactly how many APIExports are hosted inside a specific workspace, or which APIs are currently **bound** by other workspaces.

![](https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4d86d960-a23c-4cb1-8155-6fe236240893.png)

Let's switch back to the `platform-team'`s workspace to continue with our setup.

Now, we need to do something kcp-specific. If you check your resources right now, those CRDs are strictly local to this workspace. To safely share them with our tenant teams, we need to convert them into an internal kcp tracking object called an **APIResourceSchema**. This is how kcp structurally version-controls APIs so they can be securely exported.

To do this, we use our `kcp` plugin to take a "snapshot" of the local MongoDB CRD. You should see an output that says:

```sh
kubectl get crd mongodbcommunity.mongodbcommunity.mongodb.com -o yaml | kubectl kcp crd snapshot -f - --prefix v1 | kubectl apply -f -
#
# apiresourceschema.apis.kcp.io/v1.mongodbcommunity.mongodbcommunity.mongodb.com created
```

This tells kcp: "Get the CRD we just installed, take a snapshot with the prefix 'v1', and apply the resulting **APIResourceSchema** back to the cluster."

Now, let's look for the schema kcp just generated for us:

```sh
kubectl get apiresourceschemas
#
# NAME                                             AGE
# v1.mongodbcommunity.mongodbcommunity.mongodb.com 11s
```

To safely share this API with our teams, we wrap that generated schema into an `APIExport`. This acts like "APIs as a Service," publishing the schema so that other workspaces can optionally choose to consume it.

Let's create the Export using the exact schema name we just found:

```sh
cat <<EOF | kubectl apply -f -
apiVersion: apis.kcp.io/v1alpha1
kind: APIExport
metadata:
  name: mongodb-v1
spec:
  latestResourceSchemas:
    - v1.mongodbcommunity.mongodbcommunity.mongodb.com
EOF
```

We can confirm this was successfully created by checking the APIExport resource we have

```sh
kubectl get apiexports
#
# NAME       AGE
# mongodb-v1 2m46s
```

### 2. Tenant Teams "Bind" to the API

Now let's switch our terminal context back over to Team A. Remember our previous output? Their workspace currently has no idea what a MongoDB cluster is. Let's prove it:

```sh
kubectl ws :root:team-a
#
# Current workspace is "root:team-a" (type root:organization).

kubectl api-resources | grep mongodb
#
# (No output. The API does not exist here!)
```

To securely subscribe to the platform team's newly created API service, Team A needs to create an `APIBinding`.

While we can write standard Kubernetes YAML to do this, the `kcp` plugin provides a `bind` command. Team A simply points the `bind` command directly at the workspace and the specific API export they want to consume:

```sh
kubectl kcp bind apiexport root:platform-team:mongodb-v1
#
# apibinding mongodb-v1 created. Waiting to successfully bind ...
# mongodb-v1 created and bound.

kcp-test kubectl get apibindings
#
# NAME                  AGE   READY
# mongodb-v1            73s   True
# tenancy.kcp.io-bqt7a  7h10m True
# topology.kcp.io-9dlvq 7h10m True
```

The moment Team A executes that `bind` command, their workspace is magically updated with the new capabilities. Let's check our `api-resources` one more time:

```sh
kubectl api-resources | grep mongodb
#
# mongodbcommunity mdbc mongodbcommunity.mongodb.com/v1 true MongoDBCommunity
```

---

## Beyond the Primitives: What We Didn't Cover

At this point, you should have a firm, hands-on grasp of the core user primitives of kcp, that is **Workspaces**, **APIExports**, and **APIBindings**. But we've only just scratched the surface of what this architecture makes possible.

To keep this guide digestible, there are a few massive topics that I deliberately didn't cover in this article:

1. **Shards and High Availability:** Since kcp is designed to host thousands of logical clusters, a single database isn't enough. kcp introduces the `Shard` primitive, allowing platform administrators to horizontally partition workspace state across multiple underlying `etcd` instances. This gives kcp infinite scalability and massive High Availability (HA) without complicating the developer experience.
2. **Front-Proxy:** When kcp scales to host millions of logical clusters, it needs a way to seamlessly direct traffic. The kcp **Front-Proxy** sits at the absolute edge of the architecture, dynamically routing incoming `kubectl` API requests go straight to the correct underlying workspace and shard. It ensures the developer experience feels perfectly unified, no matter how massive the background infrastructure actually becomes.
3. **Virtual Workspaces:** While the workspaces we built today act as simple isolated buckets of state, kcp also supports **Virtual Workspaces**. These act as dynamic, read-only projections of data. For example, ***kcp*** uses virtual workspaces to project a unified view of a specific API across multiple tenant workspaces so that controllers can easily watch them all at once.
4. **APIExportEndpointSlices:** Just like standard Kubernetes uses endpoints to route traffic to pods, kcp uses `EndpointSlices` to efficiently route and scale the delivery of massive `APIExports` across thousands of consuming workspaces.
5. **Wiring up the Sync Agent (**`api-syncagent`**):** We discussed this conceptually in our architecture diagram, but we didn't actually attach a physical cluster. In a production scenario, you deploy the Sync Agent onto a fleet of downstream execution clusters (like EKS, GKE, or On-Premises environments) to automatically pull workloads safely out of kcp and execute them seamlessly on physical hardware.
6. **External Integrations Like Crossplane:** Because kcp acts purely as a multi-tenant API control plane, it pairs incredibly well with **Crossplane**. By publishing Crossplane as an `APIExport`, you can empower developer teams to provision actual cloud infrastructure (like AWS databases or Cloud Spanners) using standard YAML directly from their completely isolated kcp workspaces.

We will cover those advanced integrations in a future deep-dive. But armed with just the base primitives we built today, we can already solve the incredibly complex infrastructure problems we outlined at the beginning of the article.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run Multiple Kubernetes Clusters Without the Overhead Using kcp",
  "desc": "In Kubernetes, when you need to isolate workloads, you might start by using namespaces. Namespaces provide a simple way to separate workloads within a single cluster. But as your requirements grow, es",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-multiple-kubernetes-clusters-without-the-overhead-using-kcp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
