---
lang: en-US
title: "The EKS Cost Optimization Handbook: Reduce Your AWS Bill by 60% Using Karpenter and Rightsizing"
description: "Article(s) > The EKS Cost Optimization Handbook: Reduce Your AWS Bill by 60% Using Karpenter and Rightsizing"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - k8s
  - kubernetes
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The EKS Cost Optimization Handbook: Reduce Your AWS Bill by 60% Using Karpenter and Rightsizing"
    - property: og:description
      content: "The EKS Cost Optimization Handbook: Reduce Your AWS Bill by 60% Using Karpenter and Rightsizing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/eks-cost-optimization-reduce-your-aws-bill-using-karpenter-and-rightsizing.html
prev: /devops/aws/articles/README.md
date: 2026-06-23
isOriginal: false
author:
  - name: Ayobami Adejumo
    url: https://freecodecamp.org/news/author/aayostem/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cd12d552-bcf2-466a-a98e-7674c436afaa.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="The EKS Cost Optimization Handbook: Reduce Your AWS Bill by 60% Using Karpenter and Rightsizing"
  desc="This handbook is a complete guide to the 7-step playbook that took one EKS bill from \(85,000/month to \)34,000/month — without touching a single line of product code. I've audited EKS clusters at mor"
  url="https://freecodecamp.org/news/eks-cost-optimization-reduce-your-aws-bill-using-karpenter-and-rightsizing"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cd12d552-bcf2-466a-a98e-7674c436afaa.png"/>

This handbook is a complete guide to the 7-step playbook that took one EKS bill from \\(85,000/month to \\)34,000/month — without touching a single line of product code.

I've audited EKS clusters at more than 10 companies. The same waste patterns appear every time: over-provisioned nodes, cross-AZ data transfer, idle EBS volumes, and so on. And the most expensive mistake of all: buying compute commitments before rightsizing.

This handbook is the fix. I've used this 7-step playbook to reduce EKS costs by 50–60% at every company where I've implemented it. There are no product code changes, and no downtime. Just infrastructure optimization executed in the right order.

By the end of this guide, you'll know how to right-size pod resource requests, implement Karpenter for intelligent bin-packing and Spot diversification, migrate compatible workloads to Graviton for 20% cheaper compute, and eliminate NAT Gateway charges entirely with VPC endpoints.

All Terraform modules, NodePool templates, and automation scripts referenced in this guide are available in the companion repository at [<VPIcon icon="iconfont icon-github"/>`aayostem/eks-cost-optimization`](https://github.com/aayostem/eks-cost-optimization). The repo includes ready-to-deploy configurations for every step so you can move from reading to implementing in the same afternoon.

::: info What You'll Learn

- How to right-size pod resource requests using VPA recommendations
- The complete Karpenter setup with Spot diversification and automatic consolidation
- Graviton3 migration for all non-GPU workloads
- VPC endpoints to eliminate NAT Gateway data transfer charges
- EBS gp2 to gp3 migration — 20% cheaper with zero performance loss
- Load balancer consolidation with shared Ingress
- The 7-step sequence that maximises ROI — and why the order isn't optional

Let's dive in.

:::

::: note Prerequisites

Before following along, you should have:

**Knowledge:**

- Working familiarity with Kubernetes — you can deploy an application and inspect pods
- Basic AWS knowledge — you understand EC2 instance types, VPCs, and EBS volumes
- Comfort reading Terraform HCL and Kubernetes YAML

**Tools and access:**

- An existing EKS cluster running Kubernetes 1.27 or later
- `kubectl` configured and pointing at your cluster
- AWS CLI v2 installed and authenticated with appropriate permissions
- Helm 3 installed (for Karpenter and Kubecost)
- [Metrics Server (<VPIcon icon="iconfont icon-github"/>`kubernetes-sigs/metrics-server`)](https://github.com/kubernetes-sigs/metrics-server) installed in your cluster

**Companion repository:** Clone the repo before starting. It contains all YAML, Terraform, and shell scripts referenced in this guide:

```sh
git clone https://github.com/aayostem/eks-cost-optimization
cd eks-cost-optimization
```

**Estimated savings:** For a cluster running at \\(85,000/month with typical over-provisioning, expect \\)40,000–55,000/month in savings after completing all 7 steps. Smaller clusters under $10,000/month typically see 40–50% reduction.

:::

---

## Part 1: The Baseline — Where Your EKS Money Is Going

### 1.1 The Typical EKS Cost Breakdown

Before touching anything, you need to know exactly where the money is going. Optimising the wrong category first is how teams waste weeks of engineering time and see no meaningful reduction.

Here's what a typical $85,000/month EKS cluster looks like when you break it down:

| Category | Monthly Cost | Percentage | Waste Potential |
| --- | --- | --- | --- |
| Compute (EC2 nodes) | $52,000 | 61% | High — over-provisioning, wrong instance types |
| Data Transfer | $15,300 | 18% | Very High — cross-AZ and NAT Gateway charges |
| Storage (EBS volumes) | $10,200 | 12% | Medium — unattached volumes and gp2 vs gp3 |
| Load Balancers | $4,250 | 5% | Low to Medium — single-service ALBs |
| EKS Control Plane | $72 | <1% | None — this is a fixed cost |
| Other | $3,178 | 4% | Low |

Compute and Data Transfer together represent 79% of the bill and account for 90% of the correctable waste. Those are the targets.

Run this command to see your own breakdown before starting anything:

```sh
# Pull last month's cost breakdown by service
# Save this output — it becomes your before number
aws ce get-cost-and-usage \
--time-period Start=\((date -d 'last month' +%Y-%m-01),End=\)(date +%Y-%m-01) \
--granularity MONTHLY \
--group-by Type=DIMENSION,Key=SERVICE \
--metrics UnblendedCost \
--query 'ResultsByTime[0].Groups[*].{Service:Keys[0],Cost:Metrics.UnblendedCost.Amount}' \
--output table | sort -k3 -rn
```

Screenshot the output and save it. You'll compare against it after each step to verify actual savings before moving to the next one.

### 1.2 The Most Expensive Mistake: Wrong Optimisation Order

Here's what most teams do when they get a large AWS bill:

1. Buy Savings Plans immediately, locking in waste at a 30% discount
2. Then implement Karpenter, discovering they've over-committed the wrong instance family
3. Then migrate to Graviton, discovering their Savings Plan doesn't cover ARM instances

The result: a 12–36 month commitment paying for waste they could have eliminated in three weeks.

The correct sequence is:

```plaintext
Step 1: Right-size pod requests        ← Always first
Step 2: Implement Karpenter            ← Dynamic provisioning on rightsized requests
Step 3: Enable Spot for non-prod       ← Karpenter handles fallback automatically
Step 4: Migrate to Graviton            ← Karpenter makes this seamless
Step 5: Add VPC endpoints              ← Eliminate data transfer charges
Step 6: Optimise EBS volumes           ← Quick win, run alongside other steps
Step 7: Consolidate load balancers     ← Final structural cleanup
```

Then, and only then, buy Savings Plans — against the optimised baseline you've just established.

The one rule: optimise first, then commit. Every step before the Savings Plan purchase reduces what you're locking in for 1–3 years.

---

## Part 2: Right-Sizing Pod Resource Requests

### 2.1 Why Over-Provisioned Requests Are So Expensive

Kubernetes schedules pods based on resource *requests* — not actual usage. A pod that requests 2 vCPUs and 4GB of memory requires a node with that capacity available, regardless of whether the pod is actually using it.

Here's the incorrect approach with the requests set to worst-case peak estimates:

```yaml
# Bad: Resource requests set during initial deployment, never revisited
# This pod actually uses 250m CPU and 512Mi memory on average
resources:
  requests:
    cpu: "2"        # 8x more than actual usage
    memory: "4Gi"   # 8x more than actual usage
  limits:
    cpu: "4"
    memory: "8Gi"
```

When every pod is over-requested by 8x, your cluster needs 8x more nodes than your workloads actually require. That's where the 61% compute line in your bill comes from.

First, verify actual usage before changing anything:

```sh
# Install Metrics Server if not already running
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Check actual CPU and memory usage per pod
# Compare these numbers against your current resource requests
kubectl top pods --all-namespaces --sort-by=cpu
#
# NAMESPACE     NAME                    CPU(cores)   MEMORY(bytes)
# production    payment-api-xxx         25m          128Mi
# production    user-api-xxx            15m          96Mi
# production    notification-svc-xxx    5m           64Mi
# staging       worker-xxx              10m          256Mi
```

If your pods are requesting 2 CPU cores each but using 25m–15m cores in practice, you have a 50–80x over-request ratio. Every node in your cluster is mostly empty space you're paying for.

### 2.2 Using the Vertical Pod Autoscaler for Recommendations

The Vertical Pod Autoscaler (VPA) is a Kubernetes component that analyses historical CPU and memory usage for each deployment and recommends optimal resource requests. You use it in recommendation-only mode first — it tells you what to set without changing anything automatically, so you can review and apply the changes yourself with full control.

Here's the correct implementation:

```yaml
# Good: VPA in recommendation-only mode
# Watches your pod's actual usage for 24+ hours, then recommends right-sized requests
# updateMode: "Off" means it only recommends — it never restarts your pods
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: payment-api-vpa
  namespace: production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: payment-api
  updatePolicy:
    updateMode: "Off"   # Recommendation only — you apply manually after review
  resourcePolicy:
    containerPolicies:
    - containerName: "*"
      minAllowed:
        cpu: "100m"     # VPA will never recommend below this floor
        memory: "256Mi"
      maxAllowed:
        cpu: "2"        # VPA will never recommend above this ceiling
        memory: "4Gi"
```

Install VPA and retrieve recommendations:

```sh
# Install VPA components
kubectl apply -f https://github.com/kubernetes/autoscaler/releases/download/vertical-pod-autoscaler-1.0.0/vpa-v1.0.0.yaml

# Apply the VPA manifest for each deployment you want to right-size
kubectl apply -f vpa/payment-api-vpa.yaml

# Wait 24 hours for VPA to collect usage data, then check recommendations
kubectl describe vpa payment-api-vpa -n production
```

What a VPA recommendation looks like:

```plaintext
Recommendation:
  Container Recommendations:
    Container Name: payment-api
    Lower Bound:
      cpu:     50m
      memory:  128Mi
    Target:
      cpu:     250m      ← Set your requests to this value
      memory:  512Mi     ← Set your requests to this value
    Upper Bound:
      cpu:     500m
      memory:  1Gi
```

Apply the recommendation to your deployment:

```yaml
# Good: Right-sized requests based on VPA Target recommendation
resources:
  requests:
    cpu: "250m"     # Down from 2000m — an 8x reduction
    memory: "512Mi" # Down from 4096Mi — an 8x reduction
  limits:
    cpu: "500m"     # 2x the request — headroom for genuine spikes
    memory: "1Gi"   # 2x the request
```

All VPA manifests for common deployment types are in `vpa/` in the [companion repo (<VPIcon icon="iconfont icon-github"/>`aayostem/eks-cost-optimization`)](https://github.com/aayostem/eks-cost-optimization/tree/main/vpa).

### 2.3 The ROI of Right-Sizing

| Metric | Before | After | Improvement |
| --- | --- | --- | --- |
| Average CPU utilisation | 18% | 65% | +47 percentage points |
| Node count required | 42 | 28 | -33% |
| Monthly compute cost | $52,000 | $36,400 | -$15,600/month |

Verify the improvement after applying recommendations:

```sh
# Check cluster-level utilisation after right-sizing
# Target: 60–75% CPU and memory utilisation across nodes
kubectl top nodes
```

---

## Part 3: Karpenter for Bin-Packing and Spot Diversification

Karpenter is an open-source Kubernetes node provisioner built by AWS and donated to the CNCF.

Where the default Kubernetes Cluster Autoscaler scales pre-configured node groups up and down, Karpenter watches the actual resource requests of pending pods and provisions exactly the right EC2 instance type to satisfy them — selecting dynamically from thousands of available instance families rather than the two or three you pre-configured. It also continuously monitors running nodes for underutilisation and consolidates workloads onto fewer nodes, terminating the empty ones automatically.

The result is a cluster that is always sized to what your workloads actually need right now, not what you anticipated at setup time.

### 3.1 The Ceiling with Cluster Autoscaler

Cluster Autoscaler works with pre-defined node groups. You configure which instance types are available and it scales those groups up and down.

The limitation is that it can only provision instances from the types you pre-configured. It can't dynamically select the right instance type based on what the workload actually needs right now.

Here's the incorrect approach using static node groups:

```sh
# Bad: Two static node groups, each over-provisioning against worst-case scenarios
# CPU-optimised group runs even when workloads are memory-bound
# Memory-optimised group runs even when workloads are CPU-bound
eksctl create nodegroup \
--cluster my-cluster \
--name cpu-optimized \
--instance-types c5.2xlarge \
--nodes-min 5 --nodes-max 20

eksctl create nodegroup \
--cluster my-cluster \
--name memory-optimized \
--instance-types r5.2xlarge \
--nodes-min 3 --nodes-max 10
```

You're provisioning for the worst case in each family simultaneously. At any given moment, one group is underutilised while the other is scaling. Neither is right.

### 3.2 How Karpenter Solves This

Karpenter watches the actual resource requests of pending pods and provisions exactly the right instance type to fit them. It selects from thousands of available instance types, not just the two you pre-configured. It also consolidates running workloads onto fewer nodes when utilisation drops, automatically terminating underutilised nodes.

Here's the correct implementation:

```yaml
# Good: Karpenter NodePool
# Karpenter selects the optimal instance type based on pending pod requirements
# Tries Spot first, falls back to On-Demand automatically when Spot isn't available
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: default
spec:
  template:
    spec:
      requirements:
        # Allow both x86 and ARM (Graviton) — Karpenter picks the cheaper option
        - key: kubernetes.io/arch
          operator: In
          values: ["amd64", "arm64"]
        # Try Spot first, fall back to On-Demand if unavailable
        - key: karpenter.sh/capacity-type
          operator: In
          values: ["spot", "on-demand"]
        # Exclude families with poor price-to-performance ratio
        - key: karpenter.k8s.aws/instance-family
          operator: NotIn
          values: ["t2", "t3a"]
  limits:
    cpu: "1000"
    memory: "4000Gi"
  disruption:
    # Remove underutilised nodes and reschedule their pods automatically
    consolidationPolicy: WhenUnderutilized
    # Recycle nodes after 30 days to ensure fresh, patched AMIs
    expireAfter: 720h
```

What each setting does:

- `consolidationPolicy: WhenUnderutilized`: Karpenter continuously monitors node utilisation and removes underused nodes, moving their pods elsewhere. Your node count decreases automatically as load drops without any manual intervention.
- `expireAfter: 720h`: Nodes older than 30 days are gracefully replaced, ensuring your infrastructure always runs the latest EKS-optimised AMI with current security patches.
- `values: ["spot", "on-demand"]`: Karpenter attempts Spot capacity first. If Spot is unavailable for the requested instance type, it falls back to On-Demand with no alerts and no manual action required.

Migrating from Cluster Autoscaler safely:

```sh
# Step 1: Install Karpenter alongside Cluster Autoscaler — do not remove CAS yet
helm repo add karpenter https://charts.karpenter.sh
helm install karpenter karpenter/karpenter \
  --namespace karpenter \
  --create-namespace \
  --set settings.clusterName=your-cluster-name

# Step 2: Apply NodePool and NodeClass configuration
kubectl apply -f karpenter/nodepool.yaml
kubectl apply -f karpenter/nodeclass.yaml

# Step 3: Taint existing legacy nodes so new pods schedule on Karpenter nodes
# This migrates workloads gradually — zero downtime
kubectl taint nodes -l eks.amazonaws.com/nodegroup=cpu-optimized \
group=legacy:NoSchedule

# Step 4: Watch pods reschedule to Karpenter-managed nodes over the next hour
kubectl get pods -o wide --all-namespaces | grep -v legacy

# Step 5: After 30 days of stable operation, remove the old node groups
eksctl delete nodegroup --cluster my-cluster --name cpu-optimized
eksctl delete nodegroup --cluster my-cluster --name memory-optimized
```

Ready-to-deploy NodePool and NodeClass templates are in `karpenter/` in the [companion repo (<VPIcon icon="iconfont icon-github"/>`aayostem/eks-cost-optimization`)](https://github.com/aayostem/eks-cost-optimization/tree/main/karpenter).

### 3.3 Spot Instances for Non-Production Workloads

Staging and development workloads don't need the reliability guarantees of On-Demand instances. Moving them to Spot saves 60–90% on those node costs. Karpenter handles Spot interruptions by rescheduling pods automatically. For stateless workloads, interruptions are invisible to users.

```yaml
# Good: Spot-only NodePool for staging environments
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: staging-spot
spec:
  template:
    metadata:
      labels:
        billing/environment: staging
    spec:
      taints:
        - key: environment
          value: staging
          effect: NoSchedule  # Only pods that tolerate this taint schedule here
      requirements:
        - key: karpenter.sh/capacity-type
          operator: In
          values: ["spot"]   # Spot only for non-production
  disruption:
    consolidationPolicy: WhenUnderutilized
```

### 3.4 The ROI of Karpenter and Spot

| Metric | Before (Cluster Autoscaler) | After (Karpenter + Spot) | Improvement |
| --- | --- | --- | --- |
| Average node count | 28 | 18 | -36% |
| Average CPU utilisation | 65% | 82% | +17 percentage points |
| Staging environment cost | $8,000/month | $2,400/month | -70% |
| Scale-up time for new pods | 3–5 minutes | 30–60 seconds | -80% |

---

## Part 4: Graviton Migration

AWS Graviton is Amazon's own ARM-based processor family, available across EC2 instance types with names ending in `g` — `m7g`, `c7g`, `r7g`, and so on.

Graviton instances are priced approximately 20% lower than equivalent Intel or AMD x86 instances. For most server-side workloads — Node.js, Python, Go, Java — they also deliver 20–40% better performance per dollar because the processor architecture is optimised specifically for these workload types.

You don't change your application code to use Graviton. You change the architecture flag in your container image build and the node selector in your Kubernetes deployment.

### 4.1 Why Graviton Reduces Cost Without Reducing Performance

The first question to answer before migrating is whether your container images support ARM64. Most official images from Docker Hub ship as multi-architecture images. Your own application images need to be built for both architectures explicitly.

Check whether your images support ARM64:

```sh
# Check if an image has an ARM64 manifest
docker manifest inspect your-registry/your-app:latest | jq '.manifests[].platform'
```

Expected output for a multi-arch image:

```json
{"architecture": "amd64", "os": "linux"},
{"architecture": "arm64", "os": "linux", "variant": "v8"}
```

If `arm64` appears, the image is ready. If not, you need to build and push a multi-arch image first.

Build and push a multi-architecture image:

```sh
# Build for both x86 and ARM in a single command using Docker Buildx
docker buildx create --use --name multi-arch-builder

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag your-registry/your-app:latest \
  --push \
  .
```

### 4.2 Migrating Workloads to Graviton

With Karpenter already installed, Graviton migration is a single label change on your deployment. Karpenter provisions the appropriate ARM64 node automatically.

Here's the correct implementation:

```yaml
# Good: nodeSelector directs the pod to Graviton nodes
# Karpenter provisions an arm64 node if one isn't already available
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-api
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/arch: arm64   # Schedule exclusively on Graviton nodes
      containers:
        - name: api
          image: your-registry/payment-api:latest  # Must be multi-arch
```

Migrate gradually, starting with stateless services:

```sh
# Step 1: Migrate one stateless service and monitor for 48 hours
kubectl patch deployment payment-api \
  -p '{"spec":{"template":{"spec":{"nodeSelector":{"kubernetes.io/arch":"arm64"}}}}}'

# Step 2: Watch for errors in the first 30 minutes
kubectl logs -l app=payment-api --tail=100 -f

# Step 3: Verify the pod is running on a Graviton node
# The NODE column should show a Graviton instance type (m7g, c7g, r7g)
kubectl get pods -l app=payment-api -o wide

# Step 4: After 48 hours of stable operation, migrate the next service
```

There are some situations where you shouldn't migrate to Graviton: GPU workloads, applications with native x86 binary dependencies, or any workload where you haven't yet built multi-arch images.

### 4.3 The ROI of Graviton

| Workload Type | x86 Monthly Cost | Graviton Monthly Cost | Saving |
| --- | --- | --- | --- |
| Web services (Node.js, Python) | $18,000 | $14,400 | $3,600/month |
| Data processing | $12,000 | $9,600 | $2,400/month |
| API services (Go, Java) | $8,000 | $6,400 | $1,600/month |
| **Total** | **$38,000** | **$30,400** | **$7,600/month** |

---

## Part 5: VPC Endpoints for Data Transfer

### 5.1 The NAT Gateway Tax

Every byte that travels from your EKS pods to an AWS service — S3, DynamoDB, ECR, SQS — goes through a NAT Gateway if you haven't configured VPC endpoints. NAT Gateway charges $0.045 per GB of data processed.

A busy EKS cluster pulling container images from ECR, writing to S3, and polling SQS queues can process hundreds of terabytes per month through NAT Gateway — generating thousands of dollars in charges for traffic that never actually left the AWS network.

Measure your current NAT Gateway cost before adding endpoints:

```sh
# Get last month's NAT Gateway data processing charges
aws ce get-cost-and-usage \
--time-period Start=\((date -d 'last month' +%Y-%m-01),End=\)(date +%Y-%m-01) \
--granularity DAILY \
--filter '{
  "Dimensions": {
    "Key": "USAGE_TYPE",
    "Values": ["NATGateway-Bytes"]
  }
}' \
--metrics UnblendedCost \
--query 'ResultsByTime[*].{Date:TimePeriod.Start,Cost:Total.UnblendedCost.Amount}' \
--output table
```

### 5.2 VPC Endpoints — The Fix That Takes 30 Minutes

A VPC endpoint creates a private connection between your VPC and an AWS service, routing traffic through the AWS backbone without touching the NAT Gateway. The data transfer becomes free. Each endpoint costs approximately \\(0.01/hour — roughly \\)7.20/month — far less than the NAT Gateway processing charges it replaces.

Here's the complete implementation for the four most common EKS traffic destinations:

```sh
# Get your VPC ID and primary route table ID first
VPC_ID=$(aws eks describe-cluster --name your-cluster \
--query 'cluster.resourcesVpcConfig.vpcId' --output text)

ROUTE_TABLE_ID=$(aws ec2 describe-route-tables \
--filters Name=vpc-id,Values=$VPC_ID Name=association.main,Values=true \
--query 'RouteTables[0].RouteTableId' --output text)

echo "VPC: \(VPC_ID | Route Table: \)ROUTE_TABLE_ID"

# S3 gateway endpoint — free to create, eliminates all S3 traffic through NAT
aws ec2 create-vpc-endpoint \
--vpc-id $VPC_ID \
--service-name com.amazonaws.us-east-1.s3 \
--route-table-ids $ROUTE_TABLE_ID

# DynamoDB gateway endpoint — also free, same mechanism as S3
aws ec2 create-vpc-endpoint \
--vpc-id $VPC_ID \
--service-name com.amazonaws.us-east-1.dynamodb \
--route-table-ids $ROUTE_TABLE_ID

# ECR API interface endpoint — eliminates NAT charges on image pulls
aws ec2 create-vpc-endpoint \
--vpc-id $VPC_ID \
--vpc-endpoint-type Interface \
--service-name com.amazonaws.us-east-1.ecr.api \
--subnet-ids $(aws ec2 describe-subnets \
  --filters Name=vpc-id,Values=$VPC_ID Name=tag:Tier,Values=private \
  --query 'Subnets[*].SubnetId' --output text)

# ECR Docker endpoint — required alongside ECR API for complete image pull coverage
aws ec2 create-vpc-endpoint \
--vpc-id $VPC_ID \
--vpc-endpoint-type Interface \
--service-name com.amazonaws.us-east-1.ecr.dkr \
--subnet-ids $(aws ec2 describe-subnets \
  --filters Name=vpc-id,Values=$VPC_ID Name=tag:Tier,Values=private \
  --query 'Subnets[*].SubnetId' --output text)
```

The Terraform module that creates all four endpoints in a single `apply` is in `terraform/vpc-endpoints/` in the [companion repo (<VPIcon icon="iconfont icon-github"/>`aayostem/eks-cost-optimization`)](https://github.com/aayostem/eks-cost-optimization/tree/main/terraform/vpc-endpoints).

Verify that the endpoints are routing traffic correctly:

```sh
aws ec2 describe-vpc-endpoints \
--filters Name=vpc-id,Values=$VPC_ID \
--query 'VpcEndpoints[*].{Service:ServiceName,State:State,Type:VpcEndpointType}' \
--output table
#
# Expected: all endpoints showing State=available
```

### 5.3 The ROI of VPC Endpoints

| Service | Before (Through NAT) | After (VPC Endpoint) | Monthly Saving |
| --- | --- | --- | --- |
| S3 data transfer | $4,500 | $0 | $4,500 |
| ECR image pulls | $800 | $0 | $800 |
| DynamoDB queries | $1,200 | $0 | $1,200 |
| Endpoint cost | — | $29 (4 endpoints) | -$29 |
| **Net saving** |  |  | **$6,471/month** |

---

## Part 6: EBS Volume Optimisation

### 6.1 The gp2 to gp3 Migration

EBS gp2 volumes price their IOPS based on storage size — 3 IOPS per GB, with a 100 IOPS minimum. EBS gp3 volumes provide 3,000 IOPS baseline regardless of size, and cost 20% less per GB. The migration runs online with no downtime.

Find and migrate all gp2 volumes:

```sh
# Step 1: List all gp2 volumes and their sizes
aws ec2 describe-volumes \
 --filters Name=volume-type,Values=gp2 \
 --query 'Volumes[*].{ID:VolumeId,Size:Size,State:State}' \
 --output table

# Step 2: Migrate each gp2 volume to gp3 — no instance stop required
# The modify operation runs online while the volume stays attached and in use
aws ec2 describe-volumes \
--filters Name=volume-type,Values=gp2 \
--query 'Volumes[*].VolumeId' \
--output text | tr '\t' '\n' | while read vol; do
  echo "Migrating $vol from gp2 to gp3..."
  aws ec2 modify-volume \
    --volume-id $vol \
    --volume-type gp3
done

# Step 3: Verify all volumes are now gp3
aws ec2 describe-volumes \
--filters Name=volume-type,Values=gp2 \
--query 'Volumes[*].VolumeId' \
--output text

# Expected: empty output — zero gp2 volumes remaining
```

### 6.2 Finding and Removing Orphaned Volumes and Snapshots

When Kubernetes PersistentVolumeClaims are deleted, the underlying EBS volumes sometimes aren't cleaned up. They keep running — and billing — indefinitely.

```sh
# Find unattached EBS volumes — status=available means not attached to any instance
aws ec2 describe-volumes \
--filters Name=status,Values=available \
--query 'Volumes[*].{ID:VolumeId,Size:Size,Created:CreateTime}' \
--output table

# Find EBS snapshots older than 90 days
aws ec2 describe-snapshots \
--owner-ids self \
--query "Snapshots[?StartTime<='$(date -d '90 days ago' --iso-8601=seconds)'].[SnapshotId,StartTime,VolumeSize]" \
--output table
```

Before deleting any snapshot, cross-reference with your RDS automated backup schedule to confirm it's not the only backup for a production database.

### 6.3 The ROI of EBS Optimisation

| Resource | Before | After | Monthly Saving |
| --- | --- | --- | --- |
| gp2 → gp3 migration (1TB total) | $102 | $72 | $30 |
| Unattached volumes removed (50 × 100GB) | $500 | $0 | $500 |
| Old snapshots cleaned (500GB) | $25 | $0 | $25 |
| **Total** | **$627** | **$72** | **$555/month** |

---

## Part 7: Load Balancer Consolidation

### 7.1 The Problem — One Load Balancer Per Service

Many teams create a separate `LoadBalancer` Service for every microservice. On AWS, each Application Load Balancer costs approximately \\(16.20/month base charge plus \\)0.008/LCU-hour for traffic processed. At 20 microservices, that's $324/month before a single request is processed.

Here's the incorrect approach:

```yaml
# Bad: This creates a dedicated AWS ALB every time it's applied
# 20 microservices = 20 ALBs = $324+/month before any traffic charges
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

### 7.2 The Fix — Shared Ingress Controller

An Ingress controller is a Kubernetes component that runs as a pod inside your cluster and programs a single external load balancer to route traffic to multiple services based on hostname and URL path. Instead of one AWS Application Load Balancer per microservice, you get one ALB total — with path-based routing directing each request to the right backend service. The result is the same routing behaviour at a fraction of the cost.

Here's the correct implementation:

```yaml :collapsed-lines
# Good: One Ingress resource routes all external traffic
# The AWS Load Balancer Controller creates one ALB for all services listed here
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
# Watch until the ADDRESS column shows the ALB DNS name (typically 2–3 minutes)
kubectl get ingress shared-ingress -n production -w
```

The cost difference:

| Approach | Load balancers | Monthly cost |
| --- | --- | --- |
| LoadBalancer Service per microservice (20 services) | 20 ALBs | ~$400/month |
| Single Ingress controller | 1 ALB | ~$27/month |
| **Monthly saving** |  | **~$373/month** |

The shared Ingress manifest is in `k8s/ingress/` in the [companion repo (<VPIcon icon="iconfont icon-github"/>`aayostem/eks-cost-optimization`)](https://github.com/aayostem/eks-cost-optimization/tree/main/k8s/ingress).

---

## The Complete 7-Step Sequence

| Step | Action | Time to Implement | Expected Monthly Saving |
| --- | --- | --- | --- |
| 1 | Right-size pod resource requests (VPA) | 1 week | $15,600 |
| 2 | Install Karpenter with consolidation | 1 week | $8,400 |
| 3 | Move staging and dev to Spot | 1 week | $11,200 |
| 4 | Migrate compatible workloads to Graviton | 2 weeks | $7,600 |
| 5 | Add VPC endpoints for S3, ECR, DynamoDB | 1 day | $6,471 |
| 6 | Migrate gp2 to gp3 and delete orphaned volumes | 1 day | $555 |
| 7 | Consolidate load balancers with shared Ingress | 1 day | $373 |
| **Total** |  | **3–4 weeks** | **$49,799/month** |

Annual saving at this rate: **$597,588**. Engineering time required: one engineer, one sprint per step.

---

## Best Practices for EKS Cost Optimisation

✅ **Do:** Right-size pod resource requests before any other optimisation. Every subsequent step depends on accurate requests.

✅ **Do:** Implement Karpenter with `consolidationPolicy: WhenUnderutilized`. Let it continuously optimise your node count automatically.

✅ **Do:** Move staging and development workloads to Spot. 60–90% savings for workloads that tolerate interruption.

✅ **Do:** Migrate compatible workloads to Graviton. Most web services and APIs run without code changes.

✅ **Do:** Add VPC endpoints for S3, DynamoDB, and ECR before reviewing data transfer costs.

✅ **Do:** Migrate gp2 volumes to gp3. It's online, zero downtime, and immediately 20% cheaper.

✅ **Do:** Use a single shared Ingress controller for all external traffic instead of per-service load balancers.

❌ **Don't:** Buy Savings Plans before completing steps 1–6. You'll lock in waste for 1–3 years.

❌ **Don't:** Use static node groups with Cluster Autoscaler when your workload mix changes. Karpenter handles this dynamically.

❌ **Don't:** Run staging and development environments on On-Demand instances. Spot interruptions are manageable, but the cost difference is not.

::: info Resources

<SiteInfo
  name="Documentation"
  desc="Just-in-time Nodes for Any Kubernetes Cluster"
  url="https://karpenter.sh/docs/"
  logo="https://karpenter.sh/favicon.svg"
  preview="https://karpenter.sh/banner.png"/>

- [**AWS Graviton Getting Started Guide** (<VPIcon icon="iconfont icon-github"/>`aws/aws-graviton-getting-started`)](https://github.com/aws/aws-graviton-getting-started) — Language-specific compatibility notes and migration guidance from AWS
<SiteInfo
  name="aws/aws-graviton-getting-started"
  desc="Helping developers to use AWS Graviton2, Graviton3, and Graviton4 processors which power the 6th, 7th, and 8th generation of Amazon EC2 instances (C6g[d], M6g[d], R6g[d], T4g, X2gd, C6gn, I4g, Im4g..."
  url="https://github.com/aws/aws-graviton-getting-started/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a7737fc3252a5fb8476bff37c9b8bd9c7dc273dff8e320c426bf02ac424cea79/aws/aws-graviton-getting-started"/>

<SiteInfo
  name="autoscaler/vertical-pod-autoscaler at master · kubernetes/autoscaler"
  desc="Autoscaling components for Kubernetes. Contribute to kubernetes/autoscaler development by creating an account on GitHub."
  url="https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/83c63f26fe1c604bc4280541f887a240b889d3a3bf643a46dba54053a7e00d4f/kubernetes/autoscaler"/>

```component VPCard
{
  "title": "Request Amazon EBS volume modifications - Amazon EBS",
  "desc": "Modify the size, performance, and type of an Amazon EBS volume.",
  "link": "https://docs.aws.amazon.com/ebs/latest/userguide/requesting-ebs-volume-modifications.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

```component VPCard
{
  "title": "Welcome - AWS Load Balancer Controller",
  "desc": "AWS Load Balancer Controller AWS Load Balancer Controller is a controller to help manage Elastic Load Balancers for a Kubernetes cluster. It satisfies Kubernetes Ingress resources by provisioning Application Load Balancers. It satisfies Kubernetes Service resources by provisioning Network Load Balancers.",
  "link": "https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/",
  "logo": "https://kubernetes-sigs.github.io/assets/images/aws_load_balancer_icon.svg",
  "background": "rgba(64,81,181,0.2)"
}
```

```component VPCard
{
  "title": "Cost Optimization Framework - Amazon EKS",
  "desc": "AWS Cloud Economics is a discipline that helps customers increase efficiency and reduce their costs through the adoption of modern compute technologies like Amazon EKS. The discipline recommends following a methodology called the "Cloud Financial Management (CFM) framework" which consists of 4 pillars:",
  "link": "https://docs.aws.amazon.com/eks/latest/best-practices/cost-opt-framework.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

<SiteInfo
  name="aayostem/eks-cost-optimization"
  desc="A battle-tested, production-ready playbook for reducing EKS costs by 40-60% using real code, scripts, and infrastructure patterns."
  url="https://github.com/aayostem/eks-cost-optimization/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/d986211e9bad71601f9033a75407824f7c63c3aa198836a32a0ccfe17390c31b/aayostem/eks-cost-optimization"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The EKS Cost Optimization Handbook: Reduce Your AWS Bill by 60% Using Karpenter and Rightsizing",
  "desc": "This handbook is a complete guide to the 7-step playbook that took one EKS bill from \(85,000/month to \)34,000/month — without touching a single line of product code. I've audited EKS clusters at mor",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/eks-cost-optimization-reduce-your-aws-bill-using-karpenter-and-rightsizing.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
