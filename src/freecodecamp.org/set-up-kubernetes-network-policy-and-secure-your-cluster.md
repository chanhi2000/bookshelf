---
lang: en-US
title: "How to Set Up a Kubernetes Network Policy and Secure Your Cluster"
description: "Article(s) > How to Set Up a Kubernetes Network Policy and Secure Your Cluster"
icon: iconfont icon-k8s
category:
  - DevOps
  - VM
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - kubernetes
  - k8s
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up a Kubernetes Network Policy and Secure Your Cluster"
    - property: og:description
      content: "How to Set Up a Kubernetes Network Policy and Secure Your Cluster"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-up-kubernetes-network-policy-and-secure-your-cluster.html
prev: /devops/k8s/articles/README.md
date: 2025-02-18
isOriginal: false
author:
  - name: Eti Ijeoma
    url : https://freecodecamp.org/news/author/Omah/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739889943803/796d97e8-a1c9-41e4-a678-61477514c020.png
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
  name="How to Set Up a Kubernetes Network Policy and Secure Your Cluster"
  desc="In a Kubernetes environment, proper networking allows for seamless communication between various components within the cluster and the external environment. As your applications grow, networking becomes more and more important and helps ensure that t..."
  url="https://freecodecamp.org/news/set-up-kubernetes-network-policy-and-secure-your-cluster"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739889943803/796d97e8-a1c9-41e4-a678-61477514c020.png"/>

In a Kubernetes environment, proper networking allows for seamless communication between various components within the cluster and the external environment. As your applications grow, networking becomes more and more important and helps ensure that the application is scalable and secure enough to meet your users’ demands.

Kubernetes networking helps you manage how pods, services, and other external entities interact in this environment to ensure proper connectivity, isolation, and load distribution where necessary. It offers a flexible yet sophisticated networking system that implements fine-grained security controls through Network Policies.

One unique feature of Kubernetes is that it lets you deploy and manage multiple applications at scale within a single cluster. This helps you manage resources efficiently and optimizes costs as your applications run. But this also introduces challenges related to resource isolation and security. This is where proper Kubernetes networking becomes essential.

In this article, we will discuss the fundamentals of Kubernetes networking and how it facilitates secure connections within a cluster. We will also explore Network Policies as a mechanism for defining rules that regulate pod-to-pod and pod-to-external communication, ensuring fine-grained control over traffic flow within the cluster.

---

## Breakdown of Network Connectivity Types

Kubernetes networking is designed to achieve four important goals within the Kubernetes environment to ensure the seamless operation of a Kubernetes cluster. These goals are set to ensure that there is proper communication between the containers, pods, and external entities, enabling them to work together effectively within the Kubernetes infrastructure.

### Container-to-Container Communication

One of the goals of implementing proper Kubernetes networking is to allow containers within the same pod to communicate directly with each other. Sharing the same networking namespace allows these containers to interact with each other using localhost, resulting in low-latency communication that helps multi-container applications function properly.

Container-to-container communication is useful when working with workloads that have tightly coupled processes and need to communicate quickly without latency within a single pod.

### Pod-to-Pod connectivity

Within a Kubernetes environment, pods are assigned unique IP addresses, making pod-to-pod communication simple and straightforward. Understanding traditional networking between servers, Kubernetes removes the complexity of Network Address Translation (NAT), enabling pods to communicate with ease.

Pod-to-pod communication is the backbone of microservices architecture, allowing each pod to operate independently while remaining connected to others.

### Pod-to-Service Interaction

Services in Kubernetes are often described as stable endpoints that help pods access each other. They ensure that traffic is routed to the right pod, regardless of the complexity of the pod setup. Service-to-pod communication is typically reliable, especially in environments where traffic and pod configurations are constantly evolving.

### External-to-Internal Access

One of the goals of Kubernetes networking is also to manage traffic that comes from outside the cluster. There are several tools, like Ingress Controllers and LoadBalancers, that help handle external-to-internal communication. These tools help ensure that the right application is exposed to end-users, ensuring the proper delivery of services.

While Kubernetes networking meets the requirements of these goals, communication is usually open-ended by default. This means that pods within a cluster can freely communicate with each other without any restriction. This is not ideal, especially in a production environment where isolation and security are important. This is where Kubernetes Network Policies come into play.

---

## What Are Kubernetes Network Policies?

Kubernetes Network Policies give you a way to enforce fine-grained control over the flow of traffic within your pods. These policies allow you to define which pods can communicate with each other or with other devices – so they act as a security layer with rules that restrict or allow specific types of traffic.

For example, if certain pods handle sensitive data or information, Network Policies can ensure that only authorized pods or external systems can gain access to it.

Implementing Network Policies also helps your Kubernetes clusters maintain security and compliance by restricting unnecessary communication and reducing traffic flow that could cause a security breach.

### How Kubernetes Network Policies Work

Kubernetes Network Policies provide fine-grained access control within the Kubernetes cluster to manage network traffic at the pod level. Here, you can define separate rules for ingress and egress and restrict traffic to a particular port range.

In Kubernetes Network Policies, multiple policies can target the same pod. In this case, you can create "allow" rules to determine which traffic is permitted. Any traffic that doesn’t match the "allow" rule will be blocked.

Network Policies use IP addresses and port numbers to regulate traffic. This provides control over network flows to adhere to specific security requirements.

On the other hand, Network Policies aren’t a complete solution within an environment due to certain limitations. They cannot log blocked traffic events, meaning you cannot observe or debug why and when the Kubernetes Network Policy is blocking specific traffic. To achieve this, you need to use external tools supported by your CNI plugin.

CNI stands for Container Network Interface, a standard interface used by Kubernetes to manage network resources in containers. The CNI plugin is essential for providing container networking capabilities such as IP address allocation, routing, and enforcement of network policies. The plugin also enables the cluster to handle pod networking, including assigning network policies to pods and managing traffic flow between them.

Some popular network plugins include Calico, Cilium, Flannel, and Weave Net, each offering unique features and support for Network Policy integration.

### How to Implement Networking Policies

Properly implementing Network Policies relies on the CNI plugin you’re using in the Kubernetes Cluster. For Network Policies to take effect, the CNI plugin configured on your cluster must support them.

Network policies are usually enabled by default in managed Kubernetes services provided by cloud platforms such as Amazon EKS, Microsoft Azure AKS, or Google Cloud GKE. But if you manage your own cluster, you need to ensure that your CNI plugin is compatible. For example, the popular CNI plugin Flannel doesn’t support network policies, whereas Calico does.

---

## How to Set Up a Simple Kubernetes Network Policy on EKS

::: note Prerequisites

Ensure you have the following installed on your Ubuntu Server:

- `AWS CLI`: For authentication and interactions with AWS resources
- `kubectl`: Kubernetes CLI
- `eksctl`: This is a CLI for managing EKS clusters

:::

### Steps

First, create your AWS EKS cluster using the following CLI commands:

```sh
eksctl create cluster \
--name my-eks-cluster \
--region us-east-1 \
--nodegroup-name ng-eks \
--node-type t3.medium \
--nodes 3 \
--nodes-min 2 \
--nodes-max 4 \
--with-oidc \
--version 1.31
```

Next, enable the Amazon VPC CNI plugin for your Kubernetes cluster. To do this, within your EKS Cluster, make sure that the Amazon VPC CNI plugin is installed to manage pod networking.

Check the status like this:

```sh
kubectl get pods -n kube-system | grep aws-node
```

If it’s not running, deploy or update it to run on the cluster

```sh
kubectl apply -f https://raw.githubusercontent.com/aws/amazon-vpc-cni-k8s/master/config/v1.12/aws-k8s-cni.yaml
```

Amazon VPC CNI does not support and enforce network policies. So we have to install Calico, which is a CNI that works with the VPC CNI for Network Policies.

```sh
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml
```

Confirm that Calico is installed and running like this:

```sh
kubectl get pods -n kube-system | grep calico
```

Now that we have set up Calico on our AWS EKS Cluster, let's examine various Kubernetes Network Policies that we can apply to it.

### Allow all traffic to a specific pod in the cluster:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: pod-network-policy
spec:
  podSelector:
    matchLabels:
      app: application-demo
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - {}
  egress:
    - {}
```

This configuration defines a NetworkPolicy named `pod-network-policy` that applies to all pods with the label `app: application-demo`. The `podSelector` ensures that only the pods with this label are targeted.

- The `policyTypes` field indicates that this policy controls both **Ingress** (incoming traffic) and **Egress** (outgoing traffic).
- The `ingress` and `egress` rules are defined with empty braces `{}`, meaning no restrictions are applied—all traffic is allowed, both inbound and outbound.

### Deny all traffic to a pod in the cluster:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: pod-network-policy
spec:
  podSelector:
    matchLabels:
      app: application-demo
  policyTypes:
    - Ingress
    - Egress
```

This configuration also selects pods labeled `app: application-demo` and applies the policy to both Ingress and Egress traffic.

Since no specific rules are defined, Kubernetes denies all traffic by default. This is also known as a "deny by default" policy, used to enforce strict isolation, preventing pods from communicating with others unless explicitly allowed by additional policies.

### Deny all ingress traffic to the pods in the cluster

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: pod-network-policy
spec:
  podSelector: {}
  policyTypes:
    - Ingress
```

This configuration applies a NetworkPolicy to all pods in the namespace.

- The empty `podSelector` is empty (`{}`), meaning it applies to all pods in the namespace, regardless of their labels.
- The `policyTypes` field specifies that the policy only applies to Ingress traffic.
- Since no explicit Ingress rules are defined, Kubernetes blocks all incoming traffic by default.

### Deny all egress traffic to the pods in the cluster

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: pod-network-policy
spec:
  podSelector: {}
  policyTypes:
    - Egress
```

In the configuration above:

- The `podSelector` is empty (`{}`), meaning the policy applies to all pods in the namespace.
- The `policyTypes` field specifies that this policy only applies to Egress traffic.
- Since no explicit Egress rules are defined, Kubernetes blocks all outgoing traffic for the target pods by default.

---

## When and Why to Use Kubernetes Network Policies

There are various use cases for implementing Kubernetes Network Policies to improve cluster security.

For example, perhaps you want to restrict who/what can access the database. If you have a database deployed within the cluster, Kubernetes Network Policies ensure that only authorized pods can communicate with it, blocking access from unauthorized applications within the cluster.

Or perhaps you want to isolate sensitive pods. Properly implementating Network Policies helps isolate sensitive pods that do not need to accept inbound traffic from other pods, strengthening security within the infrastructure.

---

## Best Practices for Implementing Kubernetes Network Policies on YouCluster**

To maximize the effectiveness and security benefits of your Kubernetes Network Policies, keep these best practices in mind:

- **Ensure all pods are covered by a Network Policy:** In an ideal production environment, all pods within the cluster should be covered by a network policy that limits their network to only the Ingress and Egress targets set in the configuration. Without this policy in place, all the pods can communicate freely, posing a huge security risk.
- **Complement Network Policies with other security measures**: While Network Policies are essential for Network isolation, they should be part of a wider security and networking strategy for your cluster. Additional safeguards should include Role-Based Access Control, which restricts unauthorized users from accessing or modifying the pod configurations, and advanced security contexts, which limit container capabilities.
- **Always test Network Policies before deploying to production.** Kubernetes Network Policies can be a bit of a hassle to validate, especially in a production environment, because they may hinder many running processes within the cluster. Always test new policies to ensure that they are working as intended within the cluster. For example, if you implement a new testing policy, use tools like curl or ping to verify blocked connectivity within the cluster.
- **Always review your Network Policies as the cluster grows.** As your cluster grows with the increasing user base and engineering needs, your Network Policies must always reflect new workloads, such as Pods and Namespaces. It is always best to review and update your Network Policies to stay relevant and ensure your environment is secure.
- **Use precise target selectors for the configurations:** Be specific when defining pod selectors, namespaces, and ipBlock ranges within your Network policies. For example, if you are working with namespace selectors, ensure that all the pods within that namespace conform to its security goals. Avoid using namespace selectors if you need to deploy pods that should communicate with other pods in the namespace. This is ideal because implementing namespace or pod selectors vaguely will impact the server, leading to unintended access.

---

## Conclusion

In this article, you learned about Kubernetes Network Policies as a way to manage and restrict communication between pods. Since pods don’t have network isolation by default, setting up the right policies is important for security.

While Network Policies play an important role, it is also important to protect your Cloud environment by ensuring your infrastructure is hardened – so make sure you also implement RBAC and regular vulnerability scans. You should also allocate only needed pod resources, build minimal base images for the pods, and follow Kubernetes security best practices in general.

By doing this, you can achieve end-to-end protection for your workloads.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up a Kubernetes Network Policy and Secure Your Cluster",
  "desc": "In a Kubernetes environment, proper networking allows for seamless communication between various components within the cluster and the external environment. As your applications grow, networking becomes more and more important and helps ensure that t...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-up-kubernetes-network-policy-and-secure-your-cluster.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
