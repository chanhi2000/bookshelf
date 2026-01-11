---
lang: en-US
title: "Kubernetes networking: service, kube-proxy, load balancing"
description: "Article(s) > Kubernetes networking: service, kube-proxy, load balancing"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Article(s)
tag:
  - blog
  - learnk8s.com
  - devops
  - kubernetes
  - k8s
head:
  - - meta:
    - property: og:title
      content: Article(s) > Load balancing and scaling long-lived connections in Kubernetes
    - property: og:description
      content: Load balancing and scaling long-lived connections in Kubernetes
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/learnkube.com/kubernetes-long-lived-connections.html
prev: /devops/k8s/articles/README.md
isOriginal: false
author:
  - name: Gulcan Topcu
    url : https://www.linkedin.com/in/gulcantopcu/
cover: https://static.learnkube.com/1fd1550ac4cb6e44a8f57d11d45ad42f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Kubernetes networking: service, kube-proxy, load balancing"
  desc="Master Kubernetes networking with Services and load balancing. Learn how traffic flows within clusters and from external sources."
  url="https://learnk8s.com/learnkube.comkubernetes-services-and-load-balancing"
  logo="https://static.learnkube.com/f7e5160d4744cf05c46161170b5c11c9.svg"
  preview="https://static.learnkube.com/1fd1550ac4cb6e44a8f57d11d45ad42f.png"/>

::: important TL;DR

This article explores Kubernetes networking, focusing on Services, kube-proxy, and load balancing.

:::

It covers how pods communicate within a cluster, how Services direct traffic, and how external access is managed.

You will explore ClusterIP, NodePort, and LoadBalancer service types and dive into their implementations using iptables rules.

You will also discuss advanced topics like preserving source IPs, handling terminating endpoints, and integrating with cloud load balancers.

---

## Deploying a two-tier application

Consider a two-tier application consisting of two tiers: the frontend tier, which is a web server that serves HTTP responses to browser requests, and the backend tier, which is a stateful API containing a list of job titles.

![A front-end and backend application in Kubernetes](https://learnkube.com/a/a72a5e5ce63b136493614bfc156afdb5.svg)

The front end calls the backend to display a job title and logs which pod processed the request.

*Let's deploy and expose those applications in Kubernetes.*

---

## Deploying the Backend Pods

This is what <VPIcon icon="iconfont icon-yaml"/>`backend-deployment.yaml` looks like.

Notice that we will include `replicas: 1` to indicate that I want to deploy only one pod.

backend-deployment.yaml

```yaml title="backend-deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: ghcr.io/learnk8s/jobs-api
        ports:
          - containerPort: 3000
```

You can submit the file to the cluster with:

```sh
kubectl apply -f backend-deployment.yaml
# 
# deployment.apps/backend-deployment created
```

*Great!*

Now, you have a deployment of a single pod running the backend API.

Verify this:

```sh
kubectl get deployment
# 
# NAME                 READY   UP-TO-DATE   AVAILABLE
# backend-deployment   1/1     1            1
```

The command above provides deployment information, but it'd be great to get information about the individual pod, like the IP address or node it was assigned to.

---

## Inspecting the backend deployment

You can retrieve the pod's IP address by appending `-l app=backend` to get only pods matching our deployment and `-o wide` so that the output includes the pod IP address.

```sh
kubectl get pod -l app=backend -o wide
# 
# NAME                                  READY   STATUS    IP           NODE
# backend-deployment-6c84d55bc6-v7tcq   1/1     Running   10.244.1.2   minikube-m02
```

*Great!*

Now you know that the pod IP address is `10.244.1.2`.

*But how will the frontend pods reach this IP address when they need to call the backend API?*

---

## Exposing the backend pods within the cluster with a Service

**A Service in Kubernetes allows pods to be easily discoverable and reachable across the pod network.**

![Exposing the backend application with a ClusterIP Service](https://learnkube.com/a/449d83d8882e5ded09a64ffa1c49bf88.svg)

To enable the frontend pods to discover and reach the backend, let's expose the backend pod through a Service.

This is what the service looks like:

```yaml title="backend-service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - name: backend
      protocol: TCP
      port: 3000
      targetPort: 3000
```

You can create the resource with the following command:

```sh
kubectl apply -f backend-service.yaml
# 
# service/backend-service created
```

Verify the creation of this service:

```sh
kubectl get service
# 
# NAME              TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)
# backend-service   ClusterIP   10.96.5.81   <none>        3000/TCP
```

The service's IP address is `10.96.5.81`, exposing a single port: `3000`.

*But how do the frontend pods know they should reach that IP address?*

*And what if the IP address changes?*

---

## DNS Resolution for the backend service

**Instead of reaching the Service by its IP address, you can assign a friendly name and rely on the DNS to translate it to an IP address.**

And that's precisely what happens when you create a Service in Kubernetes: a DNS record is created with the Fully Qualified Domain Name (FQDN) of `<service-name>.<namespace>.svc.cluster.local`.

You can access services and pods using DNS names instead of IP addresses.

CoreDNS is the component that resolves these DNS names to their corresponding IP addresses.

It is deployed as a `ClusterIP` service named `kube-dns` and managed by a `Deployment` in the `kube-system` namespace.

When a pod needs to resolve a service name, it sends a DNS query to the `kube-dns` service.

**CoreDNS processes the request and resolves the service name to the appropriate `ClusterIP`.**

::: tabs

@tab:active 1/4

![The front-end pod doesn't know the IP address of the Service, but all services can be called using their Fully Qualified Domain Name (FQDN).](https://learnkube.com/a/e4f22a3358e5cf13ba9c26bb5ca5c563.svg)

@tab 2/4

![The application will query CoreDNS and swap the FQDN for an IP address.](https://learnkube.com/a/90c0d1ef18f196de9b7936300b885060.svg)

@tab 3/4

![Depending on the type of Service, CoreDNS will return the appropriate IP address.](https://learnkube.com/a/7cc292393948f1019ec0cc3e197952e7.svg)

@tab 4/4

![Finally, the application can use that IP address to connect to the Service.](https://learnkube.com/a/0c9be1e6d56a3df58dd4d8f12d229e33.svg)

:::

You can inspect the `kube-dns` service with:

```sh
kubectl get svc -n kube-system kube-dns
# 
# NAME       TYPE        CLUSTER-IP   PORT(S)
# kube-dns   ClusterIP   10.96.0.10   53/UDP,53/TCP
```

Kubelet configures each pod's <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`resolv.conf` file.

This file specifies how DNS queries are resolved, including the nameservers to use and the search domains to help expand queries.

Check the contents of a pod's <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`resolv.conf` file:

```sh
kubectl exec -it pod-name -- cat /etc/resolv.conf
# 
# nameserver 10.96.0.10
# search default.svc.cluster.local svc.cluster.local cluster.local
```

**Typically, this file contains a DNS search list, including the pod's namespace and the cluster's default domain.**

For example, if a pod in the default namespace queries for `kubernetes`, the system appends `default.svc.cluster.local`, which resolves to the `ClusterIP` of the Kubernetes service.

After CoreDNS resolves the service name to a `ClusterIP`, the application can communicate with the service using that IP address.

*Let's review the above with an example.*

Create a pod to perform a DNS lookup of `backend-service`:

```sh
kubectl run -i dnsutils \
  --image=gcr.io/kubernetes-e2e-test-images/dnsutils:1.3 \
  --rm \
  -- nslookup backend-service.jobs.svc.cluster.local
#   
# Server:   10.96.0.10
# Address:  10.96.0.10#53
# 
# Name: backend-service.jobs.svc.cluster.local
# Address: 10.96.5.81
```

The service can be resolved by its name "backend-service" to its IP address `10.96.5.81`.

**Any other pod in Kubernetes can target this service using its name.**

If you request that IP address, the traffic reaches the pod:

```sh
kubectl run curl-client --rm -i --tty \
  --image=curlimages/curl -- /bin/sh

curl 10.96.5.81:3000
# {"job":"Instructor at Learnk8s","pod":"backend-deployment-5df766bf5c-xfdng"}
```

The backend responds with a JSON object containing a job title and the backend pod that processed the request.

Service discovery and DNS resolution work, but it is unclear how traffic is directed to the service and forwarded to the backend pods.

---

## Endpoints and Services

**Kubernetes services don't exist in the infrastructure: there's no process for listening to incoming traffic and distributing it to the pods.**

There's no load balancer.

Services are just definitions of how traffic should be forwarded to pods.

To confirm it, you can SSH into your cluster nodes and execute:

```sh
netstat -ntlp | grep 10.96.5.81
netstat -ntlp | grep 3000
```

These commands will not return results because `10.96.5.81` is a [<VPIcon icon="iconfont icon-k8s"/>virtual IP managed by Kubernetes](https://kubernetes.io/docs/reference/networking/virtual-ips/) and is not tied to a specific process.

*So, how does it work?*

When you submit a Service to the control plane, the Endpoint controller evaluates the service's selector and notes all pods' IP addresses that match.

**The result is stored in an Endpoint object.**

::: tabs

@tab:active 1/3

![Usually, you don't create endpoints manually. Instead, you create Services which are stored in etcd.](https://learnkube.com/a/ae247003c4d93f1266b312e57e89145f.svg)

@tab 2/3

![For each Service, the Endpoint controller evaluates the service selector and collects the matching pod IP addresses.](https://learnkube.com/a/3c8b40578b0403dd2092f0d5c1331e2a.svg)

@tab 3/3

![An Endpoint object is created in etcd with all the IP addresses and port pairs.](https://learnkube.com/a/8c6ab3c2ea0ff2cd43cec519c4235377.svg)

:::

Let's verify that this is the case:

```sh
kubectl get endpoints,services
# 
# NAME                        ENDPOINTS
# endpoints/backend-service   10.244.1.2:3000
# endpoints/kubernetes        192.168.49.2:8443
# 
# NAME                      TYPE        CLUSTER-IP     PORT(S)
# service/backend-service   ClusterIP   10.96.5.81     3000/TCP
# service/kubernetes        ClusterIP   10.96.0.1      443/TCP
```

The above output shows that an Endpoints object named `backend-service` was created.

This list has a single endpoint: `10.244.1.2:3000`.

This is our backend pod's IP address and port.

**The Endpoint controller created an IP address and port pair and stored it in the Endpoint object.**

The IP address and port pair are also called an endpoint to make everything more confusing.

However, in this article (and the rest of the Learnk8s material), we differentiate endpoints in this manner:

- "endpoints" (lowercase e) are IP addresses and port pairs.
- "Endpoint object" (upper case E) is the object created by the Endpoint controller that contains a list of endpoints.

Understanding how endpoints are collected is crucial, but it still doesn't explain how the traffic reaches the pods behind the Service if those don't exist.

**Kubernetes uses a clever workaround to implement a distributed load balancer using endpoints.**

---

## kube-proxy: translating Service IP to Pod IP

**`kube-proxy` programs the Linux kernel to intercept connections made to the service IP.**

Then, it rewrites the destination and forwards the traffic to the available pods.

::: tabs

@tab:active 1/4

![Services don't exist, but we must pretend they exist.](https://learnkube.com/a/87d750f27c7ace0cb43ea848d56350d7.svg)

@tab 2/4

![When the traffic reaches the node, it is intercepted and rewritten.](https://learnkube.com/a/fe96c9b4869a132f0925e33e7adea509.svg)

@tab 3/4

![The destination IP address is replaced with one of the pod IP addresses.](https://learnkube.com/a/f91bb1224eabbd0d088e703ac6594f29.svg)

@tab 4/4

![The traffic is then forwarded to the pod.](https://learnkube.com/a/224fd24a0326acd79376409da625a5c5.svg)

:::

**You can think of kube-proxy and its rules as a mail redirection service.**

Imagine you want to move house but worry that a few friends might still send you letters to the old address.

To work around it, you set up a redirection service: when the mail reaches the post office, it is redirected and forwarded to your newer address.

Services work similarly: since they don't exist, when traffic reaches the node (e.g., the post office), it has to be redirected to a real pod.

**These redirection rules are set up by kube-proxy.**

*But how does kube-proxy know when traffic should be intercepted and redirected?*

Kube-proxy is a pod deployed as a DaemonSet in the cluster and subscribes to changes to Endpoint and Services.

When an Endpoint or Service is created, updated, or deleted, kube-proxy refreshes its internal state for the current node.

Then, it proceeds to update its interception and redirect rules.

::: tabs

@tab:active 1/3

![When a Service is created, the endpoint controller collects the IP addresses and stores them in etcd.](https://learnkube.com/a/2ce88554447b53c9032c40d3a1624041.svg)

@tab 2/3

![Kube-proxy subscribes to updates to etcd. It has been notified of new services and endpoints.](https://learnkube.com/a/53443260a7571b226099d352a2eba210.svg)

@tab 3/3

![Then it updates the iptables on the current node.](https://learnkube.com/a/e6678fdbb6d550b76a20647acbdc9057.svg)

:::

**`kube-proxy` primarily sets up iptables rules to route traffic between services and pods on each node to achieve this.**

However, other popular tools use different options like IPVS, eBPF, and nftables.

Regardless of the underlying technology, these rules instruct the kernel to rewrite the destination IP address from the service IP to the IP of one of the pods backing the service.

*Let's see how this works in practice.*

---

## `kube-proxy` and iptables rules

Iptables is a tool that operates at the network layer. It allows you to configure rules to control incoming and outgoing network traffic.

It's worth taking a step back and looking at how the traffic reaches the pod to understand how it works.

[<VPIcon icon="fas fa-globe"/>When traffic first arrives at the node, it's intercepted by the Linux Kernel's networking stack, and it's then forwarded to the pod.](https://iximiuz.com/en/posts/laymans-iptables-101/)

![How packets flow in a Kubernetes node](https://learnkube.com/a/b013f255aedbf3fd185b2f84c70ed28a.svg)

The Linux Kernel offers several hooks to customize how the traffic is handled [<VPIcon icon="fas fa-globe"/>depending on the stage of the network stack.](https://commons.wikimedia.org/wiki/File:Iptables_diagram.png)

![Hooks in the Linux Kernel's networking stack](https://learnkube.com/a/fbb6a8a566625387c201b5d2d4616fac.svg)

**Iptables is a user-space application that allows you to configure these hooks and create rules to filter and manipulate the traffic.**

The most notable example for iptables is firewall rules.

You can define rules to allow or block traffic based on criteria such as source or destination IP address, port, protocol, and more.

For example, you might say, I want to block all traffic coming from a specific IP address or range.

*But how does it help us with load-balancing traffic to pods?*

**iptables can also be used to rewrite the destination for a packet.**

For example, you might say, I want to redirect all traffic from a specific IP address to another IP address.

And that's precisely what happens in Kubernetes.

**iptables has five modes of operations (i.e. tables): filter, nat, mangle, raw and [<VPIcon icon="fas fa-globe"/>security](https://lwn.net/Articles/267140/).**

![Filter, Nat, mangle and raw tables in iptables](https://learnkube.com/a/672ab62c81b38aac14c03156104ba120.svg)

**It's important to note that tables have different hooks available.**

The Nat table, primarily used in Kubernetes, has only three hooks: PREROUTING, OUTPUT, and POSTROUTING.

You can create custom rules in this table and group them into chains.

Each rule has a target and an action.

![Chains, rules, targets and actions in iptables](https://learnkube.com/a/8227d773c076787d1ce4dbc9dddf15b8.svg)

Chains are linked to each other and the hooks to create complex workflows.

![You can link iptables chains to each other and to the hooks](https://learnkube.com/a/dba4e17f5635219d3935dedc40cca5b2.svg)

In Kubernetes, **`kube-proxy` programs iptables so that when a packet arrives at the node, its destination IP address is matched against all service IP addresses.**

If there's a match, the traffic is forwarded to a specific chain that handles load balancing for that service.

As pods are added or removed from the service, `kube-proxy` dynamically updates these chains.

To see how chains interact in kube-proxy, let's follow the traffic from pod to service.

---

## Following traffic from a Pod to Service

First, deploy a `curl` client pod in the cluster:

```sh
kubectl run curl-client --rm -i --tty \
  --image=curlimages/curl -- /bin/sh
```

Inside the `curl-client` pod, send a request to the `backend-service` using its `ClusterIP` `10.96.5.81` on port `3000`:

```sh
curl http://10.96.5.81:3000
```

On another terminal, launch a privileged container that has access to the host's network stack:

```sh
kubectl run -it --rm --privileged \
  --image=ubuntu \
  --overrides='{"spec": {"hostNetwork": true, "hostPID": true}}' \
  ubuntu -- bash
```

Inside the container, update the package list and install `iptables`:

```sh
apt update && apt install -y iptables
```

**When a request is sent to the Service, it enters the node's network stack, where it is [<VPIcon icon="fas fa-globe"/>intercepted by the iptables rules set by kube-proxy.](https://stackrox.io/blog/kubernetes-networking-demystified/#iptables)**

The process begins in the `PREROUTING` chain of the `nat` table, where incoming packets are matched to service IPs.

Since the destination IP matches `10.96.5.81`, the `KUBE-SERVICES` chain processes the packet.

Let's inspect the `PREROUTING` chain with:

```sh
iptables -t nat -L PREROUTING --line-numbers
# 
# 1  KUBE-SERVICES  all  anywhere      anywhere             /* kubernetes service portals */
# 2  DOCKER_OUTPUT  all  anywhere      host.minikube.internal
# 3  DOCKER         all  anywhere      anywhere             ADDRTYPE match dst-type LOCAL
```

![The PREROUTING chain is followed by the KUBE-SERVICE chain](https://learnkube.com/a/cbb58cedcff254bc18e574b8abb06727.svg)

You can explore what happens next by inspecting the `KUBE-SERVICES` chain.

```sh
iptables -t nat -L KUBE-SERVICES -n --line-numbers
# 
# 1  KUBE-SVC-NPX46M4PTMTKRN6Y  /* default/kubernetes:https cluster IP */ tcp dpt:443
# 2  KUBE-SVC-TCOU7JCQXEZGVUNU  /* kube-system/kube-dns:dns cluster IP */ udp dpt:53
# 3  KUBE-SVC-ERIFXISQEP7F7OF4  /* kube-system/kube-dns:dns-tcp cluster IP */ tcp dpt:53
# 4  KUBE-SVC-JD5MR3NA4I4DYORP  /* kube-system/kube-dns:metrics cluster IP */ tcp dpt:9153
# 5  KUBE-SVC-6R7RAWWNQI6ZLKMO  /* default/backend-service:backend cluster IP */ tcp dpt:3000
# 6  KUBE-NODEPORTS             /* kubernetes service nodeports;
```

Don't get scared by the long list of IDs.

**You are seeing a list of redirection rules: one for each service.**

*But you only created one service; how come there are so many?*

Kubernetes already has services for CoreDNS, the API server, and more; each is implemented as a chain in iptables.

You can verify (and match) those chains to their respective Service by listing all services in your cluster:

```sh
kubectl get services -A
# 
# NAMESPACE     NAME              TYPE        CLUSTER-IP      PORT(S)
# default       kubernetes        ClusterIP   10.96.0.1       443/TCP
# kube-system   kube-dns          ClusterIP   10.96.0.10      53/UDP,53/TCP
# kube-system   metrics-server    ClusterIP   10.96.10.5      443/TCP
# jobs          backend-service   ClusterIP   10.96.5.81      3000/TCP
```

Now that the output makes more sense, let's continue.

The `KUBE-SERVICE` chain is a collection of chains.

Only the `KUBE-SVC-6R7RAWWNQI6ZLKMO` chain matches the destination IP `10.96.5.81`.

![The KUBE-SERVICE chain invokes the KUBE-SVC-6R7RAWWNQI6ZLKMO chain](https://learnkube.com/a/d01bf84aa5efab3dbdda8750cc90609e.svg)

Let's inspect this chain:

```sh
iptables -t nat -L KUBE-SVC-6R7RAWWNQI6ZLKMO -n --line-numbers
# 
# 1  KUBE-MARK-MASQ             --  /* default/backend-service:backend cluster IP */ tcp dpt:3000
# 2  KUBE-SEP-O3HWD4DESFNXEYL6  --  /* default/backend-service:backend -> 10.244.1.2:3000 */
```

The first chain is `KUBE-MARK-MASQ`, which patches the source IP when the destination is external to the cluster.

The second chain, `KUBE-SEP-O3HWD4DESFNXEYL6`, is the Service Endpoint chain.

![Inspecting the KUBE-SEP chain](https://learnkube.com/a/3969fa46f374a9dd0262b595d706f347.svg)

If you inspect this chain, you will find two rules:

```sh
iptables -t nat -L KUBE-SEP-O3HWD4DESFNXEYL6 -n --line-numbers
# 
# 1    KUBE-MARK-MASQ    10.244.1.2    0.0.0.0/0    /* default/backend-service:backend */
# 2    DNAT                                         /* default/backend-service:backend */ tcp to:10.244.1.2:3000
```

The first rule marks the packet for masquerading if [<VPIcon icon="fa-brands fa-stack-overflow"/>the pod requesting the service is also chosen as the destination.](https://stackoverflow.com/questions/68180239/iptables-rules-for-kube-dns)

The `DNAT` rule changes the destination IP from the service IP (`10.96.5.81`) to the pod's IP (`10.244.1.2`).

![Inspecting the KUBE-SEP chain](https://learnkube.com/a/e9f3eb841484634102d40ffbc02d72c7.svg)

*What happens when you scale the deployments to three replicas?*

```sh
kubectl scale deployment backend-deployment --replicas=3
```

The `KUBE-SVC-6R7RAWWNQI6ZLKMO` chain now has three `KUBE-SEP` chains:

```sh
iptables -t nat -L KUBE-SVC-6R7RAWWNQI6ZLKMO -n --line-numbers
# 
# 1  KUBE-MARK-MASQ              /* default/backend-service:backend cluster IP */ tcp dpt:3000
# 2  KUBE-SEP-O3HWD4DESFNXEYL6   /* default/backend-service:backend -> 10.244.1.2:3000 */
# 3  KUBE-SEP-C2Y64IBVPH4YIBGX   /* default/backend-service:backend -> 10.244.1.3:3000 */
# 4  KUBE-SEP-MRYDKJV5U7PLF5ZN   /* default/backend-service:backend -> 10.244.1.4:3000 */
```

**Each rule points to a chain that changes the destination IP to one of the three pods.**

![Scaling to three replicas creates more KUBE-SEP chains](https://learnkube.com/a/1da21ccdaad3cbd0fd81ac99ca230f8e.svg)

You finally got to the bottom of how Kubernetes Services works.

Let's create a deployment for the frontend app that will consume the API exposed by the backend.

---

## Deploying and exposing the frontend Pods

This is what `frontend-deployment.yaml` looks like:

```yaml title="frontend-deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 3
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
        image: ghcr.io/learnk8s/jobs-api
        ports:
          - containerPort: 8080
```

You can submit the definition to the cluster with:

```sh
kubectl apply -f frontend-deployment.yaml
# 
# deployment.apps/frontend-deployment created
```

Let's verify the deployment was successful:

```sh
kubectl get pod -l app=frontend -o wide
# 
# NAME                                   READY   STATUS    IP           NODE
# frontend-deployment-66dd585966-2bjtt   1/1     Running   10.244.1.7   minikube-m02
# frontend-deployment-66dd585966-rxtxt   1/1     Running   10.244.2.6   minikube-m03
# frontend-deployment-66dd585966-w8szs   1/1     Running   10.244.0.5   minikube
```

Unlike the backend service, the frontend service does not need to be reachable from other pods in the cluster.

**It must be reached by clients using web browsers outside of the cluster.**

---

## Exposing the frontend pods

The Service you used until now was the default Kubernetes service: ClusterIP.

**However, Kubernetes has a second option for when you wish to expose your pods externally to the cluster: NodePort.**

Let's create a NodePort service:

```yaml title="frontend-service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
    - name: frontend
      protocol: TCP
      port: 80
      targetPort: 8080
```

You can submit it to the cluster with:

```sh
kubectl apply -f frontend-service.yaml
# 
# service/frontend-service created
```

Next, let's verify the creation of the Endpoints resource by running:

```sh
kubectl get endpoints frontend-service
# 
# NAME               ENDPOINTS
# frontend-service   10.244.0.5:8080,10.244.1.7:8080,10.244.2.6:8080
```

The `frontend-service` is associated with three pod IPs: `10.244.0.5`, `10.244.1.7`, and `10.244.2.6`, each listening on port `8080`.

These IPs correspond to the individual frontend deployment pods.

If you get the `frontend-service`, you can verify the `TYPE` column shows `NodePort` with:

```sh
kubectl get service frontend-service
# 
# NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)
# frontend-service   NodePort    10.96.154.187   <none>        80:32073/TCP
```

**When you create a service of this type, the API server allocates a unique port from the service node port range.**

This range typically defaults to 30000-32767, and in this case is 32073.

![The current setup with a NodePort Service, 3 front-end pods and 3 backend pods](https://learnkube.com/a/d68ed61b2d2abb2353e2ab6627317f98.svg)

**This NodePort is open on all nodes in the cluster, not just the node where the pod is running.**

As per the ClusterIP service, NodePort doesn't require a specific process to be listening on that port.

When traffic reaches the port, it gets intercepted and redirected by iptables rules.

The chain for the NodePorts is called `KUBE-NODEPORTS` and is the last chain in `KUBE-SERVICES`.

```sh{8}
iptables -t nat -L KUBE-SERVICES -n --line-numbers
# 
# 1  KUBE-SVC-NPX46M4PTMTKRN6Y  /* default/kubernetes:https cluster IP */ tcp dpt:443
# 2  KUBE-SVC-TCOU7JCQXEZGVUNU  /* kube-system/kube-dns:dns cluster IP */ udp dpt:53
# 3  KUBE-SVC-ERIFXISQEP7F7OF4  /* kube-system/kube-dns:dns-tcp cluster IP */ tcp dpt:53
# 4  KUBE-SVC-JD5MR3NA4I4DYORP  /* kube-system/kube-dns:metrics cluster IP */ tcp dpt:9153
# 5  KUBE-SVC-6R7RAWWNQI6ZLKMO  /* default/backend-service:backend cluster IP */ tcp dpt:3000
# 6  KUBE-NODEPORTS             /* kubernetes service nodeports;
```

![The KUBE-NODEPORTS chain is the last chain in KUBE-SERVICES](https://learnkube.com/a/d09ea0f6efecf91e396f755108fb29a9.svg)

*What's inside this chain?*

```sh
iptables -t nat -L KUBE-NODEPORTS -n -v --line-numbers | grep 32073
# 
# 1  KUBE-EXT-6XQSOA4B4HLF6UNI /* jobs/frontend-service:frontend */ tcp dpt:32073
```

The `KUBE-NODEPORTS` chain lists all NodePorts in the cluster.

For each NodePort, there's a rule that redirects traffic to the corresponding service.

![the KUBE-NODEPORTS chain lists all NodePorts in the cluster](https://learnkube.com/a/c97765bc42ce6a32119b8432a68c3a83.svg)

Let's inspect the `KUBE-EXT-6XQSOA4B4HLF6UNI` chain:

```sh
iptables -t nat -L KUBE-EXT-6XQSOA4B4HLF6UNI -n -v --line-numbers
# 
# 1  KUBE-MARK-MASQ      /* masquerade traffic for jobs/frontend-service:frontend external destinations */
# 2  KUBE-SVC-6XQSOA4B4HLF6UNI
```

**You might recognize the second chain: it's the Service's chain!**

So, if the incoming traffic is destined for the NodePort, it gets redirected to the correct Service chain.

![The KUBE-EXT chain links back to the Service](https://learnkube.com/a/1c9c1988dfaa8060e1b083e7e729575b.svg)

As you've already experienced, this chain will have a `KUBE-SEP-*` chain for each pod in the Service.

![The KUBE-SEP chains will load balance the traffic to the destination pods](https://learnkube.com/a/4a105e698aa894ec20307ad19ee5e4ec.svg)

This is the third time you have found the `KUBE-MARK-MASQ` chain.

1. In the first case (in `KUBE-SEP`), it was used for making sure that the **traffic originated from a pod could use a service that has the same pod as the destination** [<VPIcon icon="fa-brands fa-reddit"/>(hairpin NAT)](https://reddit.com/r/eero/comments/6we6er/comment/dm7ek4l/).
2. The second case (in `KUBE-SVC`) ensured that [<VPIcon icon="fas fa-globe"/>traffic external to the cluster using the ClusterIP could be routed correctly.](https://docs.tigera.io/calico/latest/network-policy/services/services-cluster-ips)
3. The third case is just now in the NodePort chain (in `KUBE-EXT`).

To understand why those are necessary, consider the following scenario.

You make a request to a NodePort.

The request has been redirected to one of the pods in the service.

*The Pod processes the request and replies, but where should the traffic go back to?*

**The source IP address is your IP address; however, you are not expecting a response from a Pod but from a node.**

When the traffic reaches the node port, the source IP address is changed to that of the local node to work around the issue.

::: tabs

@tab:active 1/4

![As soon as you make a request to a NodePort service, the traffic is intercepted.](https://learnkube.com/a/4883ae2bdfc783eb69cae3d10b37c163.svg)

@tab 2/4

![We know that iptables rewrites the request to target a pod.](https://learnkube.com/a/0ce896813f5427428f79ec25f107c990.svg)

@tab 3/4

![When the traffic is external to the cluster, the source IP is also replaced with the Node's IP address.](https://learnkube.com/a/3caa033d537256d0159e6fa6475951f2.svg)

@tab 4/4

![The traffic finally reaches the pod.](https://learnkube.com/a/e4624dcd5da128da8e1d9b0479c8b73b.svg)

:::

When the traffic returns, the source IP address is amended to the real IP.

::: tabs

@tab:active 1/4

![As soon as the request exits the node, it is intercepted.](https://learnkube.com/a/8ea46f052f0a5bfbae37660e0122f0c7.svg)

@tab 2/4

![The source IP address is amended again to be the original requester.](https://learnkube.com/a/746f1d97820da2ae3166bd9f833e732f.svg)

@tab 3/4

![Iptables also help us pretend the traffic comes from a service.](https://learnkube.com/a/c34fd75980cb0a38dd94a302aad8cceb.svg)

@tab 4/4

![The traffic finally reaches the original requester.](https://learnkube.com/a/2aadcb00882dab22a8d30e3117868618.svg)

:::

Let's inspect the `KUBE-MARK-MASQ` chain to understand the details.

```sh
iptables -t nat -L KUBE-MARK-MASQ -n -v
# 
# 542 28196 MARK    *      *       0.0.0.0/0            0.0.0.0/0            MARK or 0x4000
```

When the `KUBE-MARK-MASQ` is invoked, it applies a mark with the 0x4000 value to all packets.

*And that's it.*

When the packet is about to exit the node, the `KUBE-POSTROUTING` chain will check for the mark.

Let's inspect the `POSTROUTING` chain:

```sh
iptables -t nat -L POSTROUTING -n -v
# 
# KUBE-POSTROUTING      --  0.0.0.0/0            0.0.0.0/0/* kubernetes postrouting rules */
# IP-MASQ-AGENT         --  0.0.0.0/0            0.0.0.0/0  ADDRTYPE match dst-type !LOCAL
```

And let's inspect the `KUBE-POSTROUTING` chain:

```sh
iptables -t nat -L KUBE-POSTROUTING -n -v
# 
# RETURN     --  *      *       0.0.0.0/0   0.0.0.0/0   mark match ! 0x4000/0x4000
# MARK       --  *      *       0.0.0.0/0   0.0.0.0/0   MARK xor 0x4000
# MASQUERADE --  *      *       0.0.0.0/0   0.0.0.0/0   random-fully
```

The three lines read:

1. If there is no MARK, there is no need to apply SNAT. Return to the caller.
2. If there's a MARK, remove it.
3. Finally, apply SNAT so that the traffic is correctly handled.

![`KUBE-POSTROUTING` chain](https://learnkube.com/a/02d0869171f6756052514e83b250b2cc.svg)

**But there's a drawback: the pods see the Node's IP as the source of the request and not the original client.**

You can set `externalTrafficPolicy: Local` to [<VPIcon icon="iconfont icon-k8s"/>preserve the client's original IP.](https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-type-clusterip)

**However, this change comes with its trade-offs, which we'll explore shortly.**

Before discussing those, let's reflect on the two Services you have used:

- ClusterIP has a virtual IP address used by kube-proxy as a placeholder to redirect traffic.
- NodePort extends ClusterIP, inheriting all of its inner workings and exposing an external port to route external traffic.

ClusterIP and NodePort aren't the only two Service types in a Kubernetes cluster.

A popular option is the `type: LoadBalancer` service.

---

## Load Balancer Service

In a typical cloud environment, Kubernetes' cloud controller manager automatically provisions a load balancer from the cloud provider and assigns an external IP to the service of `type: LoadBalancer`.

The load balancer forwards requests to the service's NodePort, which kube-proxy directs to the appropriate pod.

![A LoadBalancer service in Kubernetes is a combination of a NodePort and a cloud load balancer](https://learnkube.com/a/adee2fea9f2eac5443960964d015173c.svg)

**Some load balancers preserve the source IP, but by default, the NodePort setup might hide it.**

Let's use Minikube to demonstrate this behaviour; the same principles apply to other load balancers, including cloud-based ones.

To test it, amend the frontend service file as follows:

```yaml{6} title="frontend-service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: LoadBalancer
  selector:
    app: frontend
  ports:
    - name: frontend
      protocol: TCP
      port: 80
      targetPort: 8080
```

Resubmit the resource to the cluster with:

```sh
kubectl apply -f frontend-service.yaml
# 
# service/fronted-service configured
```

Now you can see the TYPE column shows `LoadBalancer`.

Let's inspect the service with the following command:

```sh
kubectl get service frontend-service
# 
# NAME               TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)
# frontend-service   LoadBalancer   10.107.34.82   <pending>   80:32073/TCP
```

Let's execute `minikube tunnel`:

```sh
minikube tunnel
# 
# NAME               TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)        AGE
# frontend-service   LoadBalancer   10.107.34.82   10.107.34.82   80:32073/TCP   4d12h
```

**When a LoadBalancer controller is installed in a cloud environment, it assigns a unique external IP from its pool of addresses to each LoadBalancer service.**

This IP is often publicly accessible and differs from the `ClusterIP`, which belongs to the cluster network.

When using Minikube, if you make a browser request to the IP address `10.107.34.82` on port `80`, the `minikube tunnel` intercepts the request.

The tunnel forwards the request to the corresponding `nodePort`, such as `32073`, on the Minikube node.

Once the request reaches the node, `kube-proxy` translates the `nodePort` to one of the frontend pod IPs (`10.244.0.5`, `10.244.1.7`, or `10.244.2.6`) and port `8080`.

**Whether you use `minikube tunnel` or provision a cloud load balancer, in both cases, the traffic is forwarded to the NodePort first.**

In other words, the LoadBalancer service extends NodePort with a mechanism to load balance requests to multiple NodePorts.

From there onwards, the traffic is intercepted and redirected as usual.

Until now, we've discussed NodePort and LoadBalancer services, where traffic is always routed to a node and then to a pod running on that node.

*But what happens when the traffic hits a NodePort that doesn't have a pod?*

---

## Extra hop with kube-proxy and intra-cluster load balancing

**When a load balancer sends traffic to a NodePort, the node receiving the request may not always run the pod.**

In such cases, the iptables rules forward the traffic to another node where the target pod is located.

Let's test this in the two-node Minikube cluster, where a frontend application pod runs only on one node, `minikube-m02` with IP `192.168.49.3`.

However, the traffic is routed through `minikube-m03` (IP `192.168.49.4`) via the NodePort service.

![A three node cluster with a single pod exposed via a NodePort](https://learnkube.com/a/763e3989f0a2e781c6ab537b3d4e9167.svg)

`kube-proxy`'s rules on `minikube-m03` forward the traffic to `minikube-m02`, where the pod is running.

With a tool like tcpdump, you can observe this extra hop capturing the traffic on `minikube-m02`.

First, identify the nodes in the cluster:

```sh
kubectl get node -o wide
# 
# NAME           STATUS   VERSION   INTERNAL-IP
# minikube-m02   Ready    v1.30.0   192.168.49.3
# minikube-m03   Ready    v1.30.0   192.168.49.4
```

Then, ssh into `minikube-m02` and install `tcpdump`:

```sh
minikube ssh -n minikube-m02
# 
# sudo apt update && sudo apt install tcpdump -y
```

A network interface is a connection point for communication.

In Minikube, you usually see `eth0`, `docker0`, `bridge`, and `veth` interfaces.

The following command captures and displays network packets from all interfaces present on the minikube nodes, filtering traffic from `minikube-m03` (`192.168.49.4`) and targeting NodePort `32073` for the `frontend-service`:

```sh
tcpdump -i any host 192.168.49.4 and port 32073
```

Lastly, on another terminal, ssh into `minikube-m03` and send a curl request to `minikube-m02` on NodePort `32073`.

This may seem like you're sending a request to "yourself", but the request is intended for the NodePort service, which is available on all nodes:

```sh
minikube ssh -n minikube-m03
curl http://192.168.49.3:32073
```

If you turn back to the tcpdump session, you'll see an output like this:

```plaintext title="output"
...
09:53:06.968588 eth0  In  IP minikube-m03.minikube.39802 > minikube-m02.32073: Flags [S], seq 3518088234,
09:53:06.968613 eth0  Out IP minikube-m02.32073 > minikube-m03.minikube.39802: Flags [S.], seq 4178857212,
...
```

The curl request initially reaches `minikube-m03`, but the pod is not on `minikube-m03`.

Since there are no local endpoints, iptables rules forward the traffic to `minikube-m02` because the pod is running there.

::: tabs

@tab:active 1/2

![When the traffic reaches a node that doesn't have any pod, it is intercepted by iptables rules.](https://learnkube.com/a/131f3e7ff7cc0f48b86db0edccbefd4c.svg)

@tab 2/2

![The traffic is then forwarded to the node that has the pod.](https://learnkube.com/a/6c6e87844ed35382f332ce34a3467948.svg)

:::

**While this is great when you have fewer Pods than nodes, it also has drawbacks.**

Imagine having three pods, one on each node, exposed by a NodePort service.

*If you send a request to the NodePort on the second node, does the traffic reach the pod on that node?*

Not necessarily.

Let's inspect the iptables rules for the service again:

```sh
iptables -t nat -L KUBE-SVC-6XQSOA4B4HLF6UNI -n -v
# 
# KUBE-MARK-MASQ             /* jobs/frontend-service:frontend cluster IP */ tcp dpt:80
# KUBE-SEP-IWKGAKCJPN2GDKZP  /* jobs/frontend-service:frontend -> 10.244.0.3:8080 */ statistic mode random probability 0.3
# KUBE-SEP-G5YGW63JRCEDVAQZ  /* jobs/frontend-service:frontend -> 10.244.1.4:8080 */ statistic mode random probability 0.5
# KUBE-SEP-SVT42V6SNWE7E3YK  /* jobs/frontend-service:frontend -> 10.244.2.3:8080 */
```

**Kube-proxy uses the iptables "statistic mode random probability" mode to assign to each rule to ensure a roughly proportional distribution of connections.**

There's no rule that the pod should serve the traffic in the current node.

::: tabs

@tab:active 1/4
 
![Traffic reaches a NodePort in the cluster, and the same node hosts a pod.](https://learnkube.com/a/4e112e366eb0f0556af0c431b67fe6bb.svg)

@tab 2/4

![The traffic is intercepted, and the iptables rules will use one of the KUBE-SEP-XXX chains to forward the traffic to a pod.](https://learnkube.com/a/ac20bc492fb835aa7a0f82445ca45efc.svg)

@tab 3/4

![Since those chains use a statistic mode to distribute the traffic, there's no guarantee that the traffic will be forwarded to the pod in the current node.](https://learnkube.com/a/7c70133c7cb861952218e1f258dd4587.svg)

@tab 4/4

![In this case, the iptables rules selected the first pod.](https://learnkube.com/a/31b5a35d7c62eb6fd1715aeca878ec5e.svg)

:::

**As a consequence, when using NodePort or Loadbalancer, traffic might incur an extra hop as it is redirected elsewhere.**

*Is this a problem?*

Not really.

Latency within a cluster network might be a handful of milliseconds, and this strategy ensures that all pods will serve the same number of requests.

However, if you are running a latency-sensitive application, you might want to ensure that a pod always serves traffic on the local node.

In that case, you should use `externalTrafficPolicy: Local` in your service.

---

## ExternalTrafficPolicy: Local, preserving the source IP in Kubernetes

You have already encountered `externalTrafficPolicy: Local` twice so far:

1. First, when you discussed NodePort, SNAT and preserving the IP address.
2. Then, when discussing intra-cluster load balancing (and the extra hop).

*What happens when you switch your services from `externalTrafficPolicy: Cluster` to `externalTrafficPolicy: Local`?*

Let's find out.

```yaml{7} title="frontend-service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: NodePort
  externalTrafficPolicy: Local
  selector:
    app: frontend
  ports:
    - name: frontend
      protocol: TCP
      port: 80
      targetPort: 8080
```

Resubmit the resource to the cluster with:

```sh
kubectl apply -f frontend-service.yaml
# 
# service/fronted-service configured
```

You'll notice a few differences if you compare the rules for the `externalTrafficPolicy: Cluster` and `Local` iptables.

```sh
iptables -t nat -L KUBE-EXT-6XQSOA4B4HLF6UNI -n -v --line-numbers
# 
# 1  KUBE-MARK-MASQ               0.0.0.0/0            0.0.0.0/0
# 2  KUBE-SVC-6XQSOA4B4HLF6UNI    0.0.0.0/0            0.0.0.0/0
```

In `Cluster` mode, iptables always:

1. Alters all external traffic source IPs to the node's IP through SNAT.
2. Invokes the Service's chain.

Let's explore `Local` mode:

```sh
iptables -t nat -L KUBE-EXT-6XQSOA4B4HLF6UNI -n -v --line-numbers
# 
# 1  KUBE-SVC-6XQSOA4B4HLF6UNI    10.244.0.0/16    0.0.0.0/0
# 2  KUBE-MARK-MASQ               0.0.0.0/0        0.0.0.0/0 ADDRTYPE match src-type LOCAL
# 3  KUBE-SVC-6XQSOA4B4HLF6UNI    0.0.0.0/0        0.0.0.0/0 ADDRTYPE match src-type LOCAL
# 3  KUBE-SVL-6XQSOA4B4HLF6UNI    0.0.0.0/0        0.0.0.0/0
```

In Local mode, there are many more rules and a new chain: `KUBE-SVL-6XQSOA4B4HLF6UNI`.

Inspecting the new chain reveals that the traffic reaches the pod directly without SNAT:

```sh
iptables -t nat -L KUBE-SVL-6XQSOA4B4HLF6UNI -n -v
# 
# 1 KUBE-SEP-4B2TTHBRUYTSCT32  0.0.0.0/0   0.0.0.0/0  /* default/frontend-service -> 10.244.1.2:80 */
```

The `KUBE-SEP-4B2TTHBRUYTSCT32` chain is the endpoint chain for the pod.

The only necessary translation is the destination NAT (DNAT) to the pod's IP — there is no SNAT.

*What about all the other chains?*

They are scoped to the local node so that traffic that consumes the service from the local node can still work (hence the `ADDRTYPE match src-type LOCAL`).

Those chains keep the Service running normally if the traffic originates from the local node and cluster.

While `externalTrafficPolicy: Local` preserves the source IP and routes traffic only to nodes with running pods, there are downsides:

- **The traffic is lost if no pods are on the node.**
- Since we can't forward the load to other pods, one pod might receive more traffic than the others.

While this answers the initial questions, it also raises another.

*Does the `type: LoadBalancer` service know not to route traffic to nodes without a pod?*

Yes.

**When you use a LoadBalancer service in Kubernetes, the cloud provider's load balancer needs to know which nodes are healthy and ready to serve traffic.**

It does this by regularly performing health checks on the nodes.

These checks typically target a NodePort and happen every 60 seconds.

If the node has a healthy pod running the service, it passes the check, and the load balancer routes traffic to it.

If the node does not have active pods for the service, it fails the check, and traffic stops being sent to that node.

When you set `externalTrafficPolicy: Local`, Kubernetes assigns a `healthCheckNodePort` to verify the health of the service's nodes.

You can check the assigned port with the following command:

```sh
kubectl get svc frontend-service -o yaml | grep -i healthCheckNodePort
# 
# healthCheckNodePort: 31722
```

To check if the node is healthy, you can curl the health check endpoint like this:

```sh
curl localhost:<healthCheckNodePort>/healthz
```

On a node with a healthy pod running the service, you'll see something like this:

```plaintext title="output"
"localEndpoints": 1,
"serviceProxyHealthy": true
# truncated output
```

On a node without a pod, you might see:

```plaintext title="output"
"localEndpoints": 0,
"serviceProxyHealthy": true
# truncated output
```

The load balancer uses this information to decide which nodes should receive traffic.

::: tabs

@tab:active 1/2

![Nodes have /healthz endpoints and track if they have local pods for the current NodePort.](https://learnkube.com/a/f6ec9453bf3587e715e68b9462805fdc.svg)

@tab 2/2

![When they don't, the response is still successful, but the count is zero.](https://learnkube.com/a/96c6587f57d9c9c590c89c0496e45084.svg)

:::

It will send traffic only to nodes with running pods for the service (in this example, the node with `localEndpoints: 1`).

Once the traffic reaches the NodePort, iptables' rules forward the request to the pod.

Having the load balancer check the pod's existence works well, but it also introduces a new challenge.

*What if kube-proxy removes the chain from iptables rules just after the load balancer probes the health check?*

*For the next 60 seconds, the load balancer isn't aware that the pod is gone.*

---

## ProxyTerminatingEndpoints in Kubernetes

When you update the container image in your pods, Kubernetes replaces old pods with new ones with a rolling update.

As each new pod becomes ready, `kube-proxy` immediately updates the routing rules and removes the old pod's IP address from the iptables (or IPVS) NAT table to prevent traffic from reaching the terminating pod.

**However, if the cloud LoadBalancer still uses the old IP (because its health check interval isn't due yet), it may continue sending traffic to a node without a healthy pod.**

Requests are dropped until the next health check on the `healthCheckNodePort`.

[<VPIcon icon="iconfont icon-k8s"/>The `ProxyTerminatingEndpoints` feature, introduced in Kubernetes v1.26, handles this issue by allowing terminating pods to remain available for existing connections.](https://kubernetes.io/blog/2022/12/30/advancements-in-kubernetes-traffic-engineering/)

Before v1.26, once a pod was marked as "terminating", it would stop serving traffic.

[With `ProxyTerminatingEndpoints`, when a pod starts terminating, it's not immediately removed from active endpoints. (<VPIcon icon="iconfont icon-github"/`kubernetes/enhancements`)](https://github.com/kubernetes/enhancements/blob/master/keps/sig-network/1669-proxy-terminating-endpoints/README.md)

Instead, it is marked with the conditions `terminating` and `serving`.

This means the pod is shutting down but can still serve existing traffic until all tasks are complete.

If we take a look at the Endpoint object while the pod with IP `192.168.0.171` is terminating, it might look like this:

```json
"endpoints": [
  {
    "addresses": ["192.168.0.171"],
    "conditions": {
      "ready": false,
      "serving": true,
      "terminating": true
    }
  }
]
```

`kube-proxy` has already removed the pod's IP from iptables to stop new traffic from reaching it.

However, because the pod is still marked as `serving`, it will continue processing existing connections until it is fully terminated.

After receiving the termination signal, the pod completes the request, performs a cleanup task, and only then shuts down gracefully.

Until now, you've learned about `externalTrafficPolicy: Local` and discussed some drawbacks and workarounds.

**On the positive side, your pod knows the request's real source IP.**

On the less positive side:

- The traffic is dropped if there's no pod on the node.
- LoadBalancers need an extra health check to know the pod's presence on the node.
- Those same health checks are susceptible to the health check frequency and graceful shutdown of pods.

With great power comes a significant burden.

*However, what if you could skip that and load balance the traffic directly from the load balancer to the pods (while skipping the nodes)?*

---

## How can the Pod's IP address be routable from the load balancer?

**Pod IPs are non-routable in most Kubernetes environments because they exist within an internal Pod CIDR block.**

To route traffic directly to the pods, their IPs must be part of a routable network that the external load balancer can see.

This can be achieved using certain Container Networking Interfaces (CNIs) that assign pod IPs from the same subnet as the node's network.

Azure Kubernetes Service offers the Azure CNI, in which pods receive IP addresses from the same Virtual Network (VNet) as the nodes, making them directly routable by the load balancer.

Another example is EKS with the AWS-CNI: the IP addresses are assigned from the VPC and can be routed by the Application Load Balancer.

::: tabs

@tab:active 1/2

![When you use the AWS-CNI, all pods and nodes share IP addresses from the current VPC.](https://learnkube.com/a/a6d3093b92c193baf86d2ca9f80c0985.svg)

@tab 2/2

![When you use the Azure CNI, all pods and nodes share IP addresses from the current VNet.](https://learnkube.com/a/cb1a60252d71ed83bc1b63ee2a5fd8ae.svg)

:::

*This is only sometimes the case, though.*

Taking AKS as an example again, with the default CNI, Kubenet, pods are assigned non-routable IPs from an internal CIDR block, meaning only the nodes are visible to the load balancer.

![When using kubenet ins AKS, Pod's IP addresess are using an internal CIDR](https://learnkube.com/a/4056f187d30fe03670453ccef293761b.svg)

When you provision a LoadBalancer Service with Kubenet, traffic forwarded by the load balancer reaches the nodes, and external traffic is routed to the pods through Network Address Translation (NAT).

Let's amend the previous AKS cluster, upgrade it to Azure CNI and set `allocateLoadBalancerNodePorts: false`.

This explicitly instructs the load balancer to bypass NodePorts and route traffic directly to pod IPs.

First, update your AKS cluster to enable Azure CNI with an overlay network configuration:

```sh
az aks update --name $CLUSTER_NAME \
  --resource-group $RESOURCE_GROUP \
  --network-plugin-mode overlay \
  --pod-cidr 192.168.0.0/16
```

Next, apply the following LoadBalancer service configuration that disables NodePort allocation and ensures local traffic routing:

```yaml{8} title="frontend-service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: LoadBalancer
  allocateLoadBalancerNodePorts: false
  selector:
    app: frontend
  ports:
    - name: frontend
      protocol: TCP
      port: 80
      targetPort: 8080
```

You can apply the amended file to the cluster with:

```sh
kubectl apply -f frontend-service.yaml
# 
# service/fronted-service configured
```

Let's inspect the IP addresses of your nodes and pods:

```sh
kubectl get nodes,pods -o wide
# 
# NAME                                     STATUS   VERSION   INTERNAL-IP
# node/aks-nodepool1-27397936-vmss000000   Ready    v1.29.8   10.224.0.5
# node/aks-nodepool1-27397936-vmss000001   Ready    v1.29.8   10.224.0.4
# 
# NAME                                       READY   STATUS    IP              NODE
# pod/backend-deployment-6b54b594f5-ds297    1/1     Running   192.168.1.125   aks-nodepool1-27397936-vmss000000
# pod/frontend-deployment-84f666b996-5nlvb   1/1     Running   192.168.0.251   aks-nodepool1-27397936-vmss000001
# pod/frontend-deployment-84f666b996-ldx22   1/1     Running   192.168.0.171   aks-nodepool1-27397936-vmss000001
# pod/frontend-deployment-84f666b996-pk7qx   1/1     Running   192.168.1.178   aks-nodepool1-27397936-vmss000000
```

If you list the Services, you might notice the missing NodePort:

```sh
kubectl get service
# 
# NAME               TYPE           CLUSTER-IP    EXTERNAL-IP   PORT(S)
# backend-service    ClusterIP      10.0.96.133   <none>        3000/TCP
# frontend-service   LoadBalancer   10.0.190.76   4.255.39.7    80/TCP
```

**The node IPs (`10.224.x.x`) are part of the VNet's address space, and the pod IPs (`192.168.x.x`) are allocated from the pod CIDR we've configured in the VNet.**

Both nodes and pods are now part of the routable network, which allows the load balancer to communicate directly with the pods without needing NodePorts or NAT.

Let's capture the traffic with a privileged container and install `tcpdump` on the node where the application is running.

Since the frontend deployment pods run on both nodes, we can choose any pod to capture the traffic.

```sh
kubectl run -it --rm --privileged \
  --image=ubuntu \
  --overrides='{"spec": {"hostNetwork": true, "hostPID": true}}' \
  ubuntu -- bash
```

Let's make sure that `tcpdump` is installed.

```sh
apt update && apt install -y tcpdump
```

Now, capture the traffic to one of the frontend pod IPs, such as `192.168.0.171`:

```sh
tcpdump -i eth0 host 192.168.0.171
```

On a terminal on your host machine, you may want to generate traffic with:

```sh
curl http://4.255.39.7
```

Once you simulate requests, return to the `tcpdump` session.

The output may look like this:

```plaintext title="output"
06:31:41.431009 IP 192.168.0.171.42222 > 192.168.1.125.3000: Flags [.], ack 1, win 502,
06:31:41.431327 IP 192.168.0.171.42222 > 192.168.1.125.3000: Flags [P.], seq 1:102, ack 1,
# truncated output
```

**Now, the load balancer connects directly to the pod and routes traffic straight to the pod's IP.**

The traffic flows straight from the load balancer `4.255.39.7` to the pod's IP `192.168.0.171` on port 80.

![Routing traffic directly to pods and skipping NodePorts](https://learnkube.com/a/395c0e1b8c2b1d36aedebeb21ddb9bd3.svg)

The frontend pod processes the request and forwards traffic to the backend pod `192.168.1.125`.

**The request doesn't touch the node's IP at all.**

This is possible because the load balancer sends traffic straight to the pod's IP.

As a benefit, the source IP is preserved, even without `externalTrafficPolicy: Local`.

Even though iptables rules are no longer involved in routing the external traffic, DNS lookups and service-to-service communication within the cluster still depend on CoreDNS, kube-proxy and iptables rules.

---

## Summary

- Services are logical abstractions. Kube-proxy handles the traffic routing using iptables (or IPVS as an alternative), forwarding traffic to the correct pods by rewriting packet destinations.
- Setting `externalTrafficPolicy: Local` preserves the original client IP while directing traffic only to nodes that have running pods, eliminating the extra hop.
- Cloud load balancers perform health checks on `healthCheckNodePort` to verify that nodes are healthy before routing traffic to them, ensuring only nodes with active pods receive traffic.
- Load balancers can be configured to route traffic directly to pods, bypassing NodePorts, which can improve performance and preserve the source IP.

A special thank you goes to [Michael O'Leary (<VPIcon icon="fa-brands fa-linkedin"/>`michael-w-oleary`)](https://linkedin.com/in/michael-w-oleary/), who wrote the initial draft of this article and offered some invaluable feedback.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Kubernetes networking: service, kube-proxy, load balancing",
  "desc": "Master Kubernetes networking with Services and load balancing. Learn how traffic flows within clusters and from external sources.",
  "link": "https://chanhi2000.github.io/bookshelf/learnk8s.com/kubernetes-services-and-load-balancing.html",
  "logo": "https://static.learnkube.com/f7e5160d4744cf05c46161170b5c11c9.svg",
  "background": "rgba(102,152,204,0.2)"
}
```
