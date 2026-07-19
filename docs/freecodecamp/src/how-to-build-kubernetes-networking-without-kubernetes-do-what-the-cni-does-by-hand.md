---
lang: en-US
title: "How to Build Kubernetes Networking Without Kubernetes: Do What the CNI Does By Hand"
description: "Article(s) > How to Build Kubernetes Networking Without Kubernetes: Do What the CNI Does By Hand"
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
      content: "Article(s) > How to Build Kubernetes Networking Without Kubernetes: Do What the CNI Does By Hand"
    - property: og:description
      content: "How to Build Kubernetes Networking Without Kubernetes: Do What the CNI Does By Hand"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-kubernetes-networking-without-kubernetes-do-what-the-cni-does-by-hand.html
prev: /devops/k8s/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: Shubham Katara
    url: https://freecodecamp.org/news/author/katara/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8fc3683f-15c8-45ff-8424-bb1b427f68e2.png
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
  name="How to Build Kubernetes Networking Without Kubernetes: Do What the CNI Does By Hand"
  desc="In this article, you'll build an accurate mental model of what a Container Network Interface (CNI) actually does. Not by reading YAML, but by doing every single step it does by hand with raw Linux ker"
  url="https://freecodecamp.org/news/how-to-build-kubernetes-networking-without-kubernetes-do-what-the-cni-does-by-hand"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8fc3683f-15c8-45ff-8424-bb1b427f68e2.png"/>

In this article, you'll build an accurate mental model of what a Container Network Interface (CNI) actually does. Not by reading YAML, but by doing every single step it does by hand with raw Linux kernel primitives.

The Container Network Interface (CNI) is one of the great black boxes of Kubernetes. Most people who run clusters every day have never once looked inside it. They know the *name* of their CNI ("we run Calico," "we're on Cilium") the way you know the brand of the alternator in your car: as a label, not as a thing you actually understand.

It lives at the very bottom of the stack, beneath the kubelet, beneath your pods, quietly moving every single packet. And precisely because it never fails loudly on a good day, almost nobody learns what it does.

We won't run `helm install cilium`. We won't apply a single manifest. Instead, we'll wire up pod networking from scratch, feel exactly where it breaks the moment traffic tries to leave a physical machine, and fix it manually.

By the end, you'll understand it in your bones, not just in theory, why tools like Cilium exist and what they're really solving under the hood.

::: info Who this is for

- Developers, platform engineers, and SREs who use Kubernetes every day but quietly treat pod-to-pod networking as magic.
- Anyone who has ever watched a pod flip to `Running` and assumed the network "just works" and wants to know what's actually happening.

:::

::: info What you'll build with your own hands

- Two isolated network namespaces wired together with a virtual cable (`veth` pair).
- A three-namespace virtual switch using a Linux bridge, the same trick legacy CNIs use on a single node.
- A deliberately broken two-node setup where a packet gets dropped on the floor, plus the manual fix that makes it work.
- A clear picture of the three jobs every CNI does, and why cloud providers force advanced CNIs like Cilium to use overlays and eBPF.

:::

::: note

Every command here needs a Linux host and `root`. Run this in a throwaway VM or lab environment, not on anything you care about. The whole point is to make a mess and learn from it.

:::

::: note Prerequisites

Before following along, you'll need:

- Two Linux VMs on the same network for the multi-node section so you can watch traffic cross a real machine boundary.
- The `ip` command from the `iproute2` package (already installed on virtually every modern distro).
- A basic comfort with IP addresses, subnets, and the word "gateway." You don't need to be a network engineer.
- **No Kubernetes.** That's not a typo. We're going underneath Kubernetes on purpose.

:::

---

## The Illusion: Kubernetes Routes Zero Packets

Here's the uncomfortable truth most people never confront: **Kubernetes can't route a single network packet.**

Not one. Kubernetes is a orchestrator. It schedules pods, watches their health, and updates state in etcd. But when it comes to actually moving a packet from one container to another, it has zero built-in capability. None.

So how do your pods talk to each other? They rely completely on an external agent to wire up the virtual network plumbing on every node. That agent is the **Container Network Interface (CNI)**. What the CNI does under the hood quietly, is what we would do ourselves to feel the pain and then the solution a CNI provides.

Here's the proof that it's load-bearing. Spin up a brand-new cluster with `kubeadm` and look at your nodes:

```sh
kubectl get nodes
#
# NAME       STATUS     ROLES                  AGE   VERSION   INTERNAL-IP     EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION                        CONTAINER-RUNTIME
# no-cni     NotReady   control-plane,master   52s   v1.35.0   192.168.117.2   <none>        Ubuntu 24.04.3 LTS   7.0.11-orbstack-00360-gc9bc4d96ac70   containerd://2.1.6
# worker-1   NotReady   <none>                 46s   v1.35.0   192.168.117.3   <none>        Ubuntu 24.04.3 LTS   7.0.11-orbstack-00360-gc9bc4d96ac70   containerd://2.1.6
# worker-2   NotReady   <none>                 40s   v1.35.0   192.168.117.4   <none>        Ubuntu 24.04.3 LTS   7.0.11-orbstack-00360-gc9bc4d96ac70   containerd://2.1.6
```

`NotReady`. Every node. The control plane is healthy, etcd is up, the scheduler is alive, and the cluster still flatly refuses to be `Ready`. If you describe the node, it tells you precisely what's missing:

```plaintext
Conditions:
  Type             Status  LastHeartbeatTime                 LastTransitionTime                Reason                       Message
  ----           ------  -----------------               ------------------              ------                     -------
  Ready            False   Sat, 18 Jul 2026 10:25:51 +0200   Sat, 18 Jul 2026 10:25:20 +0200   KubeletNotReady              container runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady message:Network plugin returns error: cni plugin not initialized
```

Read that again: **your cluster is not** `Ready` **until you install a CNI.** Not "mostly ready." Not "ready except for networking." `NotReady`, full stop. Until an external plugin shows up and takes responsibility for the packets Kubernetes itself refuses to touch.

A cluster without a CNI is a telephone exchange with no lines plugged in: every operator is present and ready, but not a single call is able to connect.

So what do most people do at this exact moment? They copy one line from a getting-started page:

```sh
kubectl apply -f https://.../calico.yaml
```

They watch the nodes flip to `Ready`, and they move on. That's the entire relationship most engineers have with the single component that makes their cluster work. They wing it. It works, so they never ask what "it" is.

This matters because "the network just works" is a dangerous story to tell yourself. The moment something breaks (a pod can't reach a service, cross-node traffic vanishes, a cloud migration mysteriously blackholes packets), you're standing in front of a system you never actually understood. So let's understand it. From the bottom up.

---

## The Foundation: Virtual Ethernet (veth) Pairs

To understand container networking, you first have to understand how Linux isolates it.

When a container (or a Kubernetes pod) is created, the kernel wraps it in an isolated **Network Namespace** (`netns`). Think of a fresh network namespace as an island with no bridges to the mainland. By default it's completely blind to the outside world: no interfaces, no IP addresses, and no routing tables. It can't talk to anything, and nothing can talk to it.

![A new network namespace is an island: disconnected from everything.](https://cdn.hashnode.com/uploads/covers/63d79ac66a29d3450a1f08f7/9acf8795-df14-49e3-ad68-900308ae51a0.png)

So how do we get off the island? With a kernel primitive called a **Virtual Ethernet (**`veth`**) pair**.

A `veth` pair is a virtual network cable. Whatever packet enters one end immediately pops out the other end, even if the two ends live in different namespaces. Plug one end into the island and the other end into the mainland, and suddenly you have a connection.

Let's wire two isolated namespaces, `red` and `blue`, directly together.

```sh
# Step 1: Create the isolated network namespaces
sudo ip netns add red
sudo ip netns add blue

# Step 2: Create the virtual ethernet cable (veth pair)
sudo ip link add veth-red type veth peer name veth-blue

# Step 3: Move each end of the cable into its namespace
sudo ip link set veth-red netns red
sudo ip link set veth-blue netns blue

# Step 4: Assign IP addresses and bring the interfaces UP
sudo ip netns exec red ip addr add 10.0.0.1/24 dev veth-red
sudo ip netns exec red ip link set veth-red up

sudo ip netns exec blue ip addr add 10.0.0.2/24 dev veth-blue
sudo ip netns exec blue ip link set veth-blue up
```

Now test the connection by pinging `blue` from inside `red`:

```sh
sudo ip netns exec red ping -c 2 10.0.0.2
```

![A new network namespace is an island: now connected with mainland using veth pairs.](https://cdn.hashnode.com/uploads/covers/63d79ac66a29d3450a1f08f7/33c0c06b-60a2-4ad5-b2ec-2d6acf08b922.png)

In the end, it would look something like this:

- Isolation broken safely: The container transitions from an unreachable, isolated namespace (no IP, no routing) to an addressable endpoint (10.1.1.2) linked directly to the host network.
- Bi-directional traffic flow: Packets originating inside the container can reach external public IP networks, and incoming response packets from the internet can traverse back through the host's eth0 interface (192.168.1.10) directly into the container's veth pairs.
- Zero-latency in-kernel bridging: The veth pair (veth-island <--> veth-mainland) acts as a direct virtual pipe, allowing instant packet transit between distinct Linux network namespaces (netns) without requiring external physical hardware .

**The verdict:** the ping succeeds. You just manually wired two isolated environments together with nothing but a virtual cable.

But here's the problem with this approach: it scales horribly. It does not scale well because a `veth` pair is strictly point to point.

Following is the number of pairs need to be configured for the number of containers:

- 2 containers: 1 pair
- 3 containers: 3 pairs
- 4 containers: 6 cables

For ten, you'd need 45 cables to connect every pair.

- Explodes in cable count: The number of veth pairs grow quadratically as containers increase
- Complex to manage: Too many interfaces, routes and rules to configure and maintain.

![Image illustrating the problem with single veth pairs at scale](https://cdn.hashnode.com/uploads/covers/63d79ac66a29d3450a1f08f7/c20651dd-8932-46bb-8e1b-b99846f56854.png)

This is the same reason data centers don't run a physical cable between every pair of servers. You need a switch.

---

## How to Scale Locally with a Linux Bridge

When you need to connect more than two interfaces on a single host, you stop running cables between everything and plug everything into a central hub instead. In the Linux kernel, that hub is a **Linux Bridge**. It's a software Layer 2 virtual switch (you'll often see it named `br0` or `cni0`).

A bridge does exactly what a physical switch does: it learns MAC addresses and forwards frames across every connected interface in the same broadcast domain.

The pattern changes slightly. Instead of connecting namespaces directly to each other, you attach one end of a `veth` pair to the namespace, and plug the *other* end into the host's bridge.

![Image showing how veth pairs connect islands to mainland via Linux bridge](https://cdn.hashnode.com/uploads/covers/63d79ac66a29d3450a1f08f7/c70ac344-0c3b-46ef-8e6f-f81bc52224df.png)

Let's tear down the old setup and build a three-namespace switch: `red`, `blue`, and `green`. They'll all share one broadcast domain.

```sh :collapsed-lines
# Clean up any previous configuration
sudo ip netns del red 2>/dev/null || true
sudo ip netns del blue 2>/dev/null || true
sudo ip netns del green 2>/dev/null || true
sudo ip link del br0 2>/dev/null || true

# Step 1: Create the host switch (bridge) and bring it up
sudo ip link add br0 type bridge
sudo ip link set br0 up

# Step 2: Wire namespace 1 (red) into the bridge
sudo ip netns add red
sudo ip link add veth-red type veth peer name veth-red-host
sudo ip link set veth-red netns red
sudo ip link set veth-red-host master br0
sudo ip link set veth-red-host up
sudo ip netns exec red ip addr add 10.0.0.1/24 dev veth-red
sudo ip netns exec red ip link set veth-red up

# Step 3: Wire namespace 2 (blue) into the bridge
sudo ip netns add blue
sudo ip link add veth-blue type veth peer name veth-blue-host
sudo ip link set veth-blue netns blue
sudo ip link set veth-blue-host master br0
sudo ip link set veth-blue-host up
sudo ip netns exec blue ip addr add 10.0.0.2/24 dev veth-blue
sudo ip netns exec blue ip link set veth-blue up

# Step 4: Wire namespace 3 (green) into the bridge
sudo ip netns add green
sudo ip link add veth-green type veth peer name veth-green-host
sudo ip link set veth-green netns green
sudo ip link set veth-green-host master br0
sudo ip link set veth-green-host up
sudo ip netns exec green ip addr add 10.0.0.3/24 dev veth-green
sudo ip netns exec green ip link set veth-green up
```

Because all three namespaces are connected to the shared `br0` device, they can communicate freely with each other across the virtual network switch. But how do they actually "find" each other on the network? This is where ARP comes in.

**ARP** stands for Address Resolution Protocol. It's a fundamental part of local networking. When one computer (or namespace, in our case) wants to talk to another using an IP address, it needs to discover the other computer's hardware address (called a MAC address) to actually send packets on the network.

ARP is the system that allows this to happen — it sends out a broadcast asking "Who has IP address X? Please tell me your MAC address," and the right system answers back.

Thanks to ARP, all the namespaces plugged into `br0` can learn each other's MAC addresses automatically and send packets directly within their shared network segment. Let's prove it by pinging every pair, both ways:

```sh
# red reaches blue and green
sudo ip netns exec red ping -c 1 10.0.0.2
sudo ip netns exec red ping -c 1 10.0.0.3

# blue reaches red and green
sudo ip netns exec blue ping -c 1 10.0.0.1
sudo ip netns exec blue ping -c 1 10.0.0.3

# green reaches red and blue
sudo ip netns exec green ping -c 1 10.0.0.1
sudo ip netns exec green ping -c 1 10.0.0.2
```

All six pings succeed. And notice there isn't a single routing rule involved anywhere. Every namespace lives in the same `10.0.0.0/24` subnet on the same Layer 2 switch, so the kernel resolves the whole mesh with plain ARP.

This is *exactly* how legacy single-node CNIs (the old `kubenet`) operate. On one machine, it's clean and simple.

But Kubernetes is a distributed system designed to scale across thousands of physical machines. So here's the question that breaks everything: what happens when our namespaces need to leave the host?

---

## The Multi-Node Boundary Problem

Everything so far has lived on one machine. Kubernetes doesn't. So let's do the honest thing: stand up two real VMs and watch the single-node trick fall apart. Don't take my word for it: build this and watch the packet die.

Here's the setup:

- **VM 1** (host IP `10.1.44.216`): home to the `red` namespace, pod subnet `10.0.1.0/24`.
- **VM 2** (host IP `10.1.44.178`): home to the `blue` namespace, pod subnet `10.0.2.0/24`.

Two things to notice before we start. First, each node gets its **own** pod subnet (`10.0.1.0/24` on VM 1, `10.0.2.0/24` on VM 2) because if both nodes handed out `10.0.0.x` addresses, you'd get IP collisions the instant two pods landed on the same number.

Second, because the subnets now differ, each namespace needs a **gateway** to route through, and that gateway is its own host's bridge.

::: note

this is the [<VPIcon icon="fas fa-globe"/>cleanup-multinode.sh](http://cleanup-multinode.sh) script that should only be used in case you make any errors while setting up the cross node routes and veth pairs.

```sh :collapsed-lines title="cleanup-multinode.sh"
#!/usr/bin/env bash
#
# cleanup-multinode.sh
# Tears down the manual multi-node CNI lab (bridge + namespaces + veth
# pairs + cross-node static routes) from "Build a Mental Model for
# Kubernetes CNI by Doing It Manually."
#
# Safe to run on BOTH VMs. Every step is idempotent: anything that was
# never created on this host is skipped instead of erroring out, so
# re-running it is harmless.
#
# Usage:  sudo ./cleanup-multinode.sh
#
set -u

if [[ $EUID -ne 0 ]]; then
  echo "This script needs root. Run:  sudo $0" >&2
  exit 1
fi

echo "==> Deleting network namespaces (this also destroys their veth pairs)..."
ip netns del red  2>/dev/null && echo "    - removed netns 'red'"  || true
ip netns del blue 2>/dev/null && echo "    - removed netns 'blue'" || true

echo "==> Removing any orphaned host-side veth interfaces..."
ip link del veth-red-host  2>/dev/null && echo "    - removed veth-red-host"  || true
ip link del veth-blue-host 2>/dev/null && echo "    - removed veth-blue-host" || true

echo "==> Deleting the bridge..."
ip link del br0 2>/dev/null && echo "    - removed bridge 'br0'" || true

echo "==> Removing cross-node static routes..."
ip route del 10.0.1.0/24 2>/dev/null && echo "    - removed route to 10.0.1.0/24" || true
ip route del 10.0.2.0/24 2>/dev/null && echo "    - removed route to 10.0.2.0/24" || true

echo "==> Disabling IP forwarding (non-persistent; resets on reboot anyway)..."
sysctl -w net.ipv4.ip_forward=0 >/dev/null

# --- Optional: undo the 'Common Gotchas' tweaks, ONLY if you applied them ---
# On a throwaway lab VM, leaving FORWARD at ACCEPT or rp_filter at 0 is
# usually harmless, so these are opt-in. Uncomment whatever you changed.
# sysctl -w net.ipv4.conf.all.rp_filter=1 >/dev/null
# iptables -P FORWARD DROP

echo
echo "==> Teardown complete. Verifying nothing is left behind:"
echo "--- namespaces (expect: no red/blue) ---"
out=$(ip netns list);                          echo "${out:-  (none)}"
echo "--- bridges (expect: no br0) ---"
out=$(ip -br link show type bridge 2>/dev/null); echo "${out:-  (none)}"
echo "--- lab routes (expect: none) ---"
out=$(ip route | grep -E '10.0.[12].0/24'); echo "${out:-  (none)}"
```

:::

**On VM 1 (**`10.1.44.216`**)**, build the bridge, wire up `red`, and turn the host into a router:

```sh
# Make the host a router so it can transit packets that aren't its own
sudo sysctl -w net.ipv4.ip_forward=1

# Build the bridge and give it a gateway IP for VM 1's pod subnet
sudo ip link add br0 type bridge
sudo ip addr add 10.0.1.254/24 dev br0
sudo ip link set br0 up

# Wire the red namespace into the bridge
sudo ip netns add red
sudo ip link add veth-red type veth peer name veth-red-host
sudo ip link set veth-red netns red
sudo ip link set veth-red-host master br0
sudo ip link set veth-red-host up
sudo ip netns exec red ip addr add 10.0.1.1/24 dev veth-red
sudo ip netns exec red ip link set veth-red up

# Point the namespace's default route at its bridge gateway
sudo ip netns exec red ip route add default via 10.0.1.254
```

**On VM 2 (**`10.1.44.178`**)**, do the mirror image for `blue`:

```sh
sudo sysctl -w net.ipv4.ip_forward=1

sudo ip link add br0 type bridge
sudo ip addr add 10.0.2.254/24 dev br0
sudo ip link set br0 up

sudo ip netns add blue
sudo ip link add veth-blue type veth peer name veth-blue-host
sudo ip link set veth-blue netns blue
sudo ip link set veth-blue-host master br0
sudo ip link set veth-blue-host up
sudo ip netns exec blue ip addr add 10.0.2.1/24 dev veth-blue
sudo ip netns exec blue ip link set veth-blue up

sudo ip netns exec blue ip route add default via 10.0.2.254
```

Both hosts are routers now. Both namespaces are wired up. Ping `blue` on VM 2 from `red` on VM 1:

```sh
# On VM 1
sudo ip netns exec red ping -c 3 10.0.2.1
#
# PING 10.0.2.1 (10.0.2.1) 56(84) bytes of data.
# 
# --- 10.0.2.1 ping statistics ---
# 3 packets transmitted, 0 received, 100% packet loss, time 2043ms
```

**100% packet loss.** The packet is dropped on the floor, exactly as promised, but now you've seen it with your own eyes.

Here's the part worth proving to yourself: the packet really does leave VM 1. It just never arrives at VM 2. Run `tcpdump` on both boxes and ping again:

```sh
# Detect your physical NIC once (enp1s0, ens3, eth0, ...)
NIC=$(ip route get 1.1.1.1 | grep -oP 'dev \K\S+')

# On VM 1: the echo requests march out the door
sudo tcpdump -ni "$NIC" icmp
IP 10.0.1.1 > 10.0.2.1: ICMP echo request, id 5, seq 1, length 64
IP 10.0.1.1 > 10.0.2.1: ICMP echo request, id 5, seq 2, length 64

# On VM 2: dead silence. Nothing ever shows up.
sudo tcpdump -ni "$NIC" icmp
(no output)
```

So where does it die? Follow the life and death of that packet:

![Death of the packet cross nodes](https://cdn.hashnode.com/uploads/covers/63d79ac66a29d3450a1f08f7/c2cea829-08c0-4b1d-a449-376791f9d070.png)

To keep it even simpler, the flow is as follows:

```sh
Red Pod (10.0.1.1)
      │
      ▼
eth0
      │
      ▼
veth-red
      │
      ▼
br0 (10.0.1.254)
      │
      ▼
VM 1 Routing Table
(No route for 10.0.2.0/24)
      │
      ▼
Default Route (0.0.0.0/0)
      │
      ▼
Physical NIC (eth0)
      │
      ▼
LAN Gateway (192.168.1.1)
      │
      ▼
❌ No route for 10.0.2.0/24
(Packet Dropped)
      │
      ▼
VM 2 Never Receives the Packet
```
<!-- TODO: mermaid화 -->

That's the multi-node boundary problem in one sentence: **your per-node scripts are completely blind to the rest of the cluster's topology.** VM 1 built its island, VM 2 built its island, and neither has any idea the other exists.

---

## How to Fix It Manually with Direct Routing

The fix is almost insultingly small. VM 1 doesn't need a smarter network. It needs a *map*. We just have to tell each host one fact it's missing: "the other node's pod subnet lives behind the other node's physical IP." That's a single static route per side. Nothing gets rebuilt: the bridges, namespaces, and forwarding you set up a moment ago all stay exactly as they are.

**On VM 1 (**`10.1.44.216`**)**, teach it where VM 2's pods live:

```sh
# VM 2's pods (10.0.2.0/24) are reachable via VM 2's physical IP
sudo ip route add 10.0.2.0/24 via 10.1.44.178
```

**On VM 2 (**`10.1.44.178`**)**, teach it the way back:

```sh
# VM 1's pods (10.0.1.0/24) are reachable via VM 1's physical IP
sudo ip route add 10.0.1.0/24 via 10.1.44.216
```

That's it. Two lines. Re-run the exact same ping from `red` on VM 1:

```sh
sudo ip netns exec red ping -c 3 10.0.2.1
```

```plaintext
PING 10.0.2.1 (10.0.2.1) 56(84) bytes of data.
64 bytes from 10.0.2.1: icmp_seq=1 ttl=62 time=0.412 ms
64 bytes from 10.0.2.1: icmp_seq=2 ttl=62 time=0.388 ms
64 bytes from 10.0.2.1: icmp_seq=3 ttl=62 time=0.401 ms

--- 10.0.2.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss
```

It works. (See `ttl=62`? Your packet started at 64 and lost one hop on each host it was forwarded through, proof it crossed two routers to get there.) The packet now completes the full journey:

![Packet Journey cross nodes between namespaces](https://cdn.hashnode.com/uploads/covers/63d79ac66a29d3450a1f08f7/7547a7e5-68d8-4f06-b396-d4d8c8cce15b.png)

The simpler flow looks like:

```sh
1. Pod (10.0.1.1)
        │
        ▼
2. veth-red
        │
        ▼
3. VM 1 br0 (10.0.1.254)
        │
        ▼
4. VM 1 Routing Table
   ✅ Static route:
   10.0.2.0/24 → 10.1.44.178
        │
        ▼
5. VM 1 Physical NIC
        │
        ▼
6. Direct Link
   VM 1 → VM 2
        │
        ▼
7. VM 2 Physical NIC
        │
        ▼
8. VM 2 Routing Table
   ✅ 10.0.2.0/24 is directly connected
        │
        ▼
9. VM 2 br0
        │
        ▼
10. Blue Pod (10.0.2.1)
        │
        ▼
✅ Reply follows the same path back
```
<!-- TODO: mermaid화 -->

That one line changed everything. Instead of dumping the packet at your LAN's clueless gateway, VM 1 now hands it **directly** to VM 2, which knows exactly which local namespace owns `10.0.2.1`. The reply follows the mirror route home. You just hand-built cross-node pod networking.

Now sit with how painful that was. Two nodes took a stack of careful commands and a hand-written route on each side.

Imagine a thousand nodes, pods being created and destroyed every second, each one needing a fresh IP and a route on *every other node* in the cluster. Doing that by hand isn't just tedious. It's impossible.

---

## So What Is a CNI, Really?

Everything you just did by hand (the namespaces, the `veth` pairs, the bridges, the IP assignment, the routes) is exactly what a Container Network Interface automates dynamically, at scale, the instant a pod is scheduled.

When you apply a pod manifest, the CNI plugin intercepts the lifecycle event and performs three core jobs:

1. **Namespace and interface provisioning:** It creates the network namespace, generates the `veth` pair, and attaches it to the bridge (or its own datapath), cleanly, every time, with no fat-fingered typos.
2. **IP Address Management (IPAM):** It hands out unique, non-colliding subnets per node and leases an individual IP to every single container in the cluster. That "unique Pod CIDR per node" rule you set up manually? IPAM enforces it automatically.
3. **Cluster-wide route distribution:** It programs the routing so every node knows how to reach pods on every other node: the static routes you wrote by hand, generated and pushed everywhere, kept in sync as nodes and pods come and go.

That's the mental model. A CNI is the thing that does your dozen-command lab a thousand times a second and never makes a mistake.

---

## The Cloud Catch and Why Cilium Changes the Game

Here's the part that surprises people. The manual direct-routing approach we just built works flawlessly in a bare-metal lab. In a modern public cloud (AWS, GCP, Azure), **it breaks completely.**

Why? Cloud providers don't let arbitrary IP addresses roam across their network fabric. Your `10.0.1.0/24` pod subnet means nothing to the VPC. Unless those IPs are explicitly registered through heavyweight cloud-controller API calls, the underlying network sees pod traffic as illegitimate and drops it: the exact failure from the boundary-problem section, except now the cloud itself is the thing saying "no."

This is where advanced CNIs like **Cilium** stop playing by the old rules. Instead of leaning on fragile Linux bridges and hand-written host routes, Cilium reaches for two much stronger mechanisms.

- **Overlay networks (VXLAN / Geneve).** Cilium takes your raw pod packet and *encapsulates* it, wrapping it inside an ordinary UDP packet addressed from Node 1's physical IP to Node 2's physical IP. To the cloud provider, it looks like completely normal node-to-node host traffic, so it sails straight through every VPC restriction. Your pod's real addresses are hidden inside the envelope.
- **eBPF kernel programmability.** Traditional CNIs push every packet through the full Linux bridge path and hundreds of sequential `iptables` rules: slow, and slower as your cluster grows. Cilium replaces that entire pipeline by loading compiled eBPF programs directly into the kernel at the network-interface level. Packets get short-circuited from the pod's `veth` straight toward the physical NIC, giving you near line-rate performance and deep security visibility for free.

Here's the whole progression in one table:

| Concern | Direct veth cables | Bridge + static routes | Advanced CNI (Cilium) |
| --- | --- | --- | --- |
| Connects 2 endpoints | Yes | Yes | Yes |
| Scales past a handful of pods | No | On one node only | Yes, cluster-wide |
| Crosses node boundaries | No | Manual routes per node | Automatic |
| Survives cloud VPC rules | No | No | Yes (VXLAN/Geneve overlay) |
| IP allocation | You, by hand | You, by hand | Automatic IPAM |
| Performance path | Kernel | Bridge + iptables | eBPF, near line-rate |
| Who maintains it | You, forever | You, forever | The CNI, automatically |

Look at that last column, then look at the last row. That's the entire value proposition of a CNI in two cells.

---

## Conclusion

You didn't read about Kubernetes networking. You built it, broke it, and fixed it. Here's the mental model you now carry:

1. **Kubernetes routes zero packets.** It fully delegates the network to a CNI, and that CNI is doing real, physical plumbing on every node.
2. **A** `veth` **pair is a virtual cable**, and it's the atom of container networking: great for two endpoints, useless at scale.
3. **A Linux bridge is a virtual switch** that connects many namespaces on one host with nothing but Layer 2 and ARP. That's a single-node CNI in a nutshell.
4. **The node boundary is where naïve networking dies.** Different subnets and an unaware physical network mean cross-node packets get dropped until *you* teach every host how to route.
5. **Static routes plus IP forwarding fix it manually**, and doing that by hand for two nodes shows you instantly why nobody does it for a thousand.
6. **A CNI automates three jobs:** interface provisioning, IPAM, and cluster-wide route distribution.
7. **The cloud breaks direct routing**, which is precisely why Cilium leans on VXLAN/Geneve overlays and eBPF instead of bridges and `iptables`.

The next time a pod flips to `Running` and the network "just works," you'll know the truth: nothing just works. A CNI just did (silently, and at a scale you now truly respect) everything you just did by hand.

From here, the natural next step is to tear down these scripts, deploy Cilium into a real cluster, and watch eBPF orchestrate this entire topology automatically. Having felt the manual pain first, you'll actually appreciate the elegance.

::: info About Author

If this helped you build a clearer picture of Kubernetes networking, come say hi:

- [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`shubhamkatara`)](https://linkedin.com/in/shubhamkatara/)
- [YouTube <VPIcon icon="fa-brands fa-youtube"/>`@kubesimplify`](https://youtube.com/@kubesimplify)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Kubernetes Networking Without Kubernetes: Do What the CNI Does By Hand",
  "desc": "In this article, you'll build an accurate mental model of what a Container Network Interface (CNI) actually does. Not by reading YAML, but by doing every single step it does by hand with raw Linux ker",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-kubernetes-networking-without-kubernetes-do-what-the-cni-does-by-hand.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
