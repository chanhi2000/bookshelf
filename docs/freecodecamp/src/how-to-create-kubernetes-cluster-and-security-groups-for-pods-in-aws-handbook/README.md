---
lang: en-US
title: "How to Create Kubernetes Cluster and Security Groups for Pods in AWS [Full Handbook]"
description: "Article(s) > How to Create Kubernetes Cluster and Security Groups for Pods in AWS [Full Handbook]"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - k8s
  - kubernetes
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Kubernetes Cluster and Security Groups for Pods in AWS [Full Handbook]"
    - property: og:description
      content: "How to Create Kubernetes Cluster and Security Groups for Pods in AWS [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-kubernetes-cluster-and-security-groups-for-pods-in-aws-handbook/
prev: /devops/k8s/articles/README.md
date: 2025-10-16
isOriginal: false
author:
  - name: Destiny Erhabor
    url : https://freecodecamp.org/news/author/CaesarSage/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760572399710/e6ff9b5b-2fa5-4e61-9b89-9b68c81e6d46.png
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

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create Kubernetes Cluster and Security Groups for Pods in AWS [Full Handbook]"
  desc="Amazon Elastic Kubernetes Service (EKS) Security Groups for Pods is a powerful feature that enables fine-grained network security controls at the pod level. This guide walks you through implementing this feature, from initial cluster setup to testing..."
  url="https://freecodecamp.org/news/how-to-create-kubernetes-cluster-and-security-groups-for-pods-in-aws-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760572399710/e6ff9b5b-2fa5-4e61-9b89-9b68c81e6d46.png"/>

Amazon Elastic Kubernetes Service (EKS) Security Groups for Pods is a powerful feature that enables fine-grained network security controls at the pod level. This guide walks you through implementing this feature, from initial cluster setup to testing pod-level security group assignments.

Traditionally, security groups could only be assigned at the EC2 instance level in EKS clusters. This meant that all pods running on a node shared the same network security rules. With Security Groups for Pods, you can now assign specific security groups to individual pods, providing much more granular control over network access.

---

## Table of Contents

2. [Understanding the Architecture](#heading-understanding-the-architecture)
3. [Infrastructure Foundation](#heading-infrastructure-foundation)
4. [EKS Cluster Configuration](#heading-eks-cluster-configuration)
5. [Management Instance Setup](#heading-management-instance-setup)
6. [Security Group Configuration](#heading-security-group-configuration)
7. [Database Setup](#heading-database-setup)
8. [CNI Plugin Configuration](#heading-cni-plugin-configuration)
9. [Security Policies Implementation](#heading-security-policies-implementation)
10. [Testing and Validation](#heading-testing-and-validation)
11. [Cleanup and Maintenance](#heading-cleanup-and-maintenance)

::: note Prerequisites

Before starting this guide, ensure you have:

- An AWS account with appropriate permissions
- AWS CLI configured on your local machine
- Basic understanding of Kubernetes concepts
- Familiarity with AWS networking concepts (VPCs, security groups, subnets)
- Understanding of Amazon EKS fundamentals

:::

---

## Understanding the Architecture

Before we dive into implementation, let's understand how Security Groups for Pods changes the EKS networking model. We'll start by looking at the traditional approach, then explore the enhanced model, and finally understand the components that make it all work.

### Traditional EKS Networking

In the standard EKS networking setup, security happens at the node level rather than the pod level. When you create an EKS cluster using the traditional model, every EC2 worker node gets assigned a security group. All pods running on that node inherit the same security group settings from their host node. This means if you have ten different applications running on the same node, they all share identical network security rules.

This approach has significant limitations. For example, if one pod needs to access a database while another pod should not, you can't enforce this distinction when both pods share the node's security group. The security boundary exists at the node level, creating a coarse-grained security model where all pods on a node have the same network permissions.

![Security group pod architecture without security groups](https://cdn.hashnode.com/res/hashnode/image/upload/v1758251803143/fa7ac487-a847-4029-9543-839c428ec20c.png)

### Security Groups for Pods Architecture

This networking model changes this paradigm completely. With Security Groups for Pods enabled, you can assign dedicated security groups to individual pods based on their specific needs. Instead of all pods inheriting the node's security group, certain pods can get their own Elastic Network Interface (ENI) with custom security group assignments.

An ENI (Elastic Network Interface) is essentially a virtual network card in AWS. Just as your physical computer has a network card to connect to the internet, EC2 instances and now individual pods can have their own virtual network interfaces. Each ENI can have its own IP address, security groups, and network settings. When we assign an ENI to a pod, that pod gets its own dedicated network identity separate from the node it runs on.

This architecture provides true pod-level security. For instance, you might have a frontend pod and a database access pod running on the same node. The frontend pod uses the node's security group and cannot access the database. Meanwhile, the database access pod gets its own ENI with a security group that explicitly allows database connections. Even though they share the same physical node, these pods have completely different network security profiles.

![Security group pod architecture with security groups](https://cdn.hashnode.com/res/hashnode/image/upload/v1758252157480/fda41975-aabc-4e1c-a638-75a26c565bb0.png)

### How It Works

The implementation of Security Groups for Pods relies on several interconnected mechanisms working together. First, when you mark a pod for special security group treatment through a `SecurityGroupPolicy`, the system automatically provisions a dedicated ENI for that pod. This ENI assignment happens through [<VPIcon icon="fa-brands fa-aws"/>AWS VPC CNI's](https://docs.aws.amazon.com/eks/latest/best-practices/vpc-cni.html) branch networking feature, which allows multiple network interfaces to attach to a single EC2 instance.

The branch networking capability is crucial here. EC2 instances have limits on how many ENIs they can support. For example, a t3.medium instance can support up to three ENIs, while an m5.large can support up to four. The VPC CNI plugin uses these additional ENI slots to create branch interfaces for pods that need custom security groups. Each branch interface can then have its own security group configuration independent of the node's primary network interface.

This fine-grained control means you can now enforce network policies at the application level. Different microservices in your cluster can have completely different network access patterns, even when running on the same infrastructure. A payment processing pod might have strict database access, while a logging pod might only need access to your log aggregation service, and a frontend pod might only need internet access for serving web traffic.

### Key Components

Several Kubernetes and AWS components work together to enable this functionality. Let's walk through each one to understand how they contribute to the overall system.

#### SecurityGroupPolicy CRD

The SecurityGroupPolicy Custom Resource Definition (CRD) is a Kubernetes object that you create to tell the system which pods should receive which security groups. You use standard Kubernetes label selectors to identify pods, then specify one or more AWS security group ID that should be attached to those pods. When you create a SecurityGroupPolicy, the system doesn't immediately change anything. Instead, it creates a rule that applies to future pods matching those labels.

#### VPC Resource Controller

The VPC Resource Controller is an AWS component that runs in your cluster's control plane. This controller constantly watches for pods that match your SecurityGroupPolicy definitions.

When a matching pod is created, the controller communicates with AWS EC2 APIs to provision the necessary ENI, attach the specified security groups, and configure the network interface. It also handles the cleanup process when pods are deleted, ensuring that ENIs are properly released and don't become orphaned resources in your AWS account.

#### AWS VPC CNI

Finally, the AWS VPC CNI plugin is enhanced to support this branch networking feature. When the VPC Resource Controller provisions an ENI for a pod, the CNI plugin on the worker node handles the low-level networking configuration. It attaches the ENI to the pod's network namespace, configures routing rules, and ensures that traffic from that pod flows through the dedicated interface rather than the node's primary network interface. The CNI plugin also maintains the necessary iptables rules and network policies to keep pod networking isolated and secure.

Together, these components create a seamless experience where you simply label your pods and define security policies, and the system handles all the complex AWS networking configuration automatically.

---

## Infrastructure Foundation

Now we'll build the underlying AWS infrastructure that our EKS cluster needs. This includes setting up IAM roles, creating the VPC with proper subnets, and configuring the networking components. We'll work through each step, ensuring that every component is properly configured for Security Groups for Pods to function correctly.

### IAM Roles and Policies Setup

Before creating any infrastructure, we need to set up the IAM roles that will define what permissions different AWS services have. Think of IAM roles as identity cards that services present to AWS to prove they're allowed to perform certain actions. We'll create several distinct roles, each with specific permissions tailored to their purpose.

#### EKS Cluster Service Role

First, we'll create the IAM role that the EKS service itself will use when managing your cluster. This role establishes a trust relationship between your AWS account and the EKS service, essentially giving EKS permission to perform actions on your behalf.

```sh
# Create the EKS cluster service role
aws iam create-role \
--role-name EKSClusterRole \
--assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'
```

::: info Here’s what’s going on

This command creates an IAM role that establishes trust between your AWS account and the EKS service:

- `assume-role-policy-document`: Defines which AWS service can assume this role
- `"Service": "eks.amazonaws.com"`: Only the EKS service can use this role
- This establishes trust between your AWS account and the EKS service

![EKS Cluster iam role](https://cdn.hashnode.com/res/hashnode/image/upload/v1758420978401/1f7a7849-923b-4378-9ee5-1063cf4b2ffd.png)

:::

#### EKS Cluster Attached Role Policy:

Now that we have the role created, we need to attach managed policies that grant the actual permissions EKS needs to function. We'll attach two AWS-managed policies that provide comprehensive permissions for EKS operations.

```sh
# Attach the required policies
aws iam attach-role-policy \
  --role-name EKSClusterRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy

aws iam attach-role-policy \
  --role-name EKSClusterRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSVPCResourceController
```

Let me explain what each of these policies does. The `AmazonEKSClusterPolicy` is a managed policy that AWS maintains, giving EKS permission to create and manage the Kubernetes control plane components. This includes actions like setting up the API server, configuring etcd storage, and managing the controller manager and scheduler. Without this policy, EKS couldn't create the fundamental components that make Kubernetes work.

The second policy, `AmazonEKSVPCResourceController`, is particularly critical for our Security Groups for Pods implementation. This policy allows the VPC Resource Controller to create and delete ENIs, assign security groups to those interfaces, and manage VPC resources on behalf of pods. When a pod needs a dedicated ENI with specific security groups, this policy is what authorizes EKS to make those changes in your VPC.

![EKS Cluster role policy](https://cdn.hashnode.com/res/hashnode/image/upload/v1758421026844/2ef6755d-1306-40f5-8048-04f3334a8308.png)

#### EKS Node Group Role:

Next, we'll create the IAM role that EC2 worker nodes will use. While the cluster role is for the EKS control plane, this role is for the actual compute instances that run your pods.

```sh
# Create the node group role
aws iam create-role \
--role-name EKSNodeGroupRole \
--assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'
```

This role's `assume role policy` specifies **ec2.amazonaws.com** as the trusted service, meaning EC2 instances can assume this role. When an EC2 instance launches as part of your EKS node group, it automatically assumes this role and uses it to authenticate with AWS services. This is how your worker nodes can pull container images, register with the cluster, and perform other necessary operations.

![EKS node group role](https://cdn.hashnode.com/res/hashnode/image/upload/v1758417915291/f06a2ab3-d6be-4bfc-a489-fae3a0c22e8f.png)

#### EKS Node Group Role Attached Policy

With the node group role created, we now need to attach policies that give worker nodes the permissions they need. We'll attach three different managed policies, each serving a specific purpose in the node's lifecycle.

```sh
# Attach required policies for worker nodes
aws iam attach-role-policy \
  --role-name EKSNodeGroupRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy

aws iam attach-role-policy \
  --role-name EKSNodeGroupRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy

aws iam attach-role-policy \
  --role-name EKSNodeGroupRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly
```

Each policy serves a specific purpose for worker node functionality:

1. `AmazonEKSWorkerNodePolicy`: Allows nodes to connect to EKS cluster
2. `AmazonEKS_CNI_Policy`: Enables CNI plugin to manage pod networking
3. `AmazonEC2ContainerRegistryReadOnly`: Pulls container images from ECR

![node group iam role and policy](https://cdn.hashnode.com/res/hashnode/image/upload/v1758417798644/50a4146a-86ae-4c08-8488-b7eba6b454fe.png)

#### IAM Role for Management Instance

To complete our foundation setup, we'll create a dedicated role for the EC2 instance that we'll use to manage the cluster. This management instance will act as our control point for running kubectl commands, configuring the cluster, and performing administrative tasks.

```sh :collapsed-lines
# Create IAM role for management instance
aws iam create-role \
--role-name EKS-Management-Role \
--assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

# Create instance profile
aws iam create-instance-profile \
--instance-profile-name EKS-Management-Profile

# Add role to instance profile
aws iam add-role-to-instance-profile \
--instance-profile-name EKS-Management-Profile \
--role-name EKS-Management-Role

# Create and attach custom policy for EKS management
cat > eks-management-policy.json << 'EOF'
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "eks:*",
                "ec2:DescribeInstances",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeVpcs",
                "ec2:DescribeSubnets",
                "ec2:DescribeNetworkInterfaces",
                "ec2:CreateSecurityGroup",
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:RevokeSecurityGroupIngress",
                "rds:DescribeDBInstances",
                "rds:CreateDBInstance",
                "rds:DeleteDBInstance",
                "iam:PassRole"
            ],
            "Resource": "*"
        }
    ]
}
EOF

aws iam create-policy \
--policy-name EKS-Management-Policy \
--policy-document file://eks-management-policy.json

aws iam attach-role-policy \
--role-name EKS-Management-Role \
--policy-arn arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):policy/EKS-Management-Policy
```

This setup is more complex than the previous roles because it involves several steps.

First, we create the role with EC2 as the trusted service. Then we create an **instance profile**, which is AWS's mechanism for attaching IAM roles to EC2 instances. Think of an instance profile as a container that holds the role and makes it available to EC2. The custom policy we're creating gives comprehensive administrative permissions for managing EKS clusters. The `eks:*` wildcard grants all EKS actions, while the specific EC2 and RDS permissions allow for infrastructure management.

The `iam:PassRole` permission is particularly important. It allows this management instance to pass the cluster and node group roles to EKS when creating resources. Without this permission, we couldn't create the cluster from this instance.

![EKS Management role](https://cdn.hashnode.com/res/hashnode/image/upload/v1758424448145/c7c68885-35ca-4c96-997a-5f8c447c4652.png)

![EKS Management policy](https://cdn.hashnode.com/res/hashnode/image/upload/v1758424489993/2c574387-54f3-4283-9dcf-357beef020eb.png)

### VPC and Networking Infrastructure

With our IAM roles configured, we'll now build the network infrastructure that will host our EKS cluster. We're going to create a production-ready VPC with both public and private subnets across multiple availability zones. This architecture provides both security and high availability.

#### VPC Creation and Configuration

Let's start by creating our Virtual Private Cloud and the Internet Gateway that will provide internet connectivity for our public resources.

```sh
# Create VPC
export VPC_ID=$(aws ec2 create-vpc \
--cidr-block 10.0.0.0/16 \
--name 'eks-security-demo'
--query 'Vpc.VpcId' \
--output text)

# Create Internet Gateway first
export IGW_ID=$(aws ec2 create-internet-gateway \
--query 'InternetGateway.InternetGatewayId' \
--output text)

# Attach Internet Gateway to VPC
aws ec2 attach-internet-gateway \
--internet-gateway-id $IGW_ID \
--vpc-id $VPC_ID
```

When we create the VPC with a 10.0.0.0/16 CIDR block, we're defining an IP address range that provides 65,536 possible IP addresses. This is a private IP range (meaning these addresses aren't routable on the public internet) from the RFC 1918 specification. This gives us plenty of room to create multiple subnets and scale our infrastructure as needed. The /16 designation means the first 16 bits of the IP address are fixed (10.0), while the remaining 16 bits are available for our use.

The Internet Gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in our VPC and the internet. By attaching it to our VPC, we're setting up the foundation for resources in public subnets to communicate with the outside world.

![25ed1689-31f5-4076-b6ba-cd33358e59dc](https://cdn.hashnode.com/res/hashnode/image/upload/v1758419087788/25ed1689-31f5-4076-b6ba-cd33358e59dc.png)

![vpc](https://cdn.hashnode.com/res/hashnode/image/upload/v1758419294210/8c7db06c-b213-47f3-9d37-ff74eaea9960.png)

#### Subnet Architecture Strategy

Now we'll create four subnets – two public and two private – spread across two different availability zones. This multi-AZ approach is crucial for high availability and follows AWS best practices for production deployments.

```sh :collapsed-lines
# Public subnets for NAT Gateway and Load Balancers
export PUBLIC_SUBNET_1=$(aws ec2 create-subnet \
--vpc-id $VPC_ID \
--cidr-block 10.0.1.0/24 \
--availability-zone eu-west-1a \
--query 'Subnet.SubnetId' \
--output text)

export PUBLIC_SUBNET_2=$(aws ec2 create-subnet \
--vpc-id $VPC_ID \
--cidr-block 10.0.2.0/24 \
--availability-zone eu-west-1b \
--query 'Subnet.SubnetId' \
--output text)

# Enable auto-assign public IP for public subnets
aws ec2 modify-subnet-attribute \
--subnet-id $PUBLIC_SUBNET_1 \
--map-public-ip-on-launch

aws ec2 modify-subnet-attribute \
--subnet-id $PUBLIC_SUBNET_2 \
--map-public-ip-on-launch

# Private subnets for worker nodes and RDS
export PRIVATE_SUBNET_1=$(aws ec2 create-subnet \
--vpc-id $VPC_ID \
--cidr-block 10.0.3.0/24 \
--availability-zone eu-west-1a \
--query 'Subnet.SubnetId' \
--output text)

export PRIVATE_SUBNET_2=$(aws ec2 create-subnet \
--vpc-id $VPC_ID \
--cidr-block 10.0.4.0/24 \
--availability-zone eu-west-1b \
--query 'Subnet.SubnetId' \
--output text)
```

Let me walk you through the subnet design:

Each subnet uses a /24 CIDR block, which provides 256 IP addresses per subnet (though AWS reserves 5 addresses in each subnet for internal use, leaving 251 usable addresses). We're creating these subnets in pairs across two availability zones (eu-west-1a and eu-west-1b). If one availability zone experiences an outage, resources in the other zone can continue operating.

The public subnets (10.0.1.0/24 and 10.0.2.0/24) will host our NAT Gateway and potentially load balancers in the future. We enable auto-assign public IP on these subnets so that any resources launched here automatically receive public IP addresses. This is essential for the NAT Gateway to function properly.

The private subnets (10.0.3.0/24 and 10.0.4.0/24) will host our EKS worker nodes and RDS database. Resources in these subnets don't receive public IP addresses, meaning they can't be directly accessed from the internet. This provides an additional layer of security for our application workloads and database.

![internet gateway](https://cdn.hashnode.com/res/hashnode/image/upload/v1758420805187/4c6452d0-5188-46d8-8b75-36b2c6ee1180.png)

![subnets](https://cdn.hashnode.com/res/hashnode/image/upload/v1758419921540/5d231ace-0788-4b30-97bf-71d5b1cbc5d5.png)

#### EKS Subnet Tagging

Next, we need to add specific tags to our subnets so that EKS can automatically discover and use them correctly. These tags tell EKS which subnets to use for different types of load balancers.

```sh
# Tag subnets for EKS auto-discovery
aws ec2 create-tags \
--resources $PUBLIC_SUBNET_1 $PUBLIC_SUBNET_2 \
--tags Key=kubernetes.io/cluster/pod-security-cluster-demo,Value=shared \
       Key=kubernetes.io/role/elb,Value=1

aws ec2 create-tags \
--resources $PRIVATE_SUBNET_1 $PRIVATE_SUBNET_2 \
--tags Key=kubernetes.io/cluster/pod-security-cluster-demo,Value=shared \
       Key=kubernetes.io/role/internal-elb,Value=1
```

These tags serve specific purposes in the EKS ecosystem:

- The `kubernetes.io/cluster/pod-security-cluster-demo=shared` tag identifies subnets that belong to our cluster. The "shared" value indicates that these subnets might be used by multiple clusters, though in our case we're only using them for one.
- The `kubernetes.io/role/elb=1` tag on public subnets tells Kubernetes to use these subnets when creating internet-facing load balancers.
- The `kubernetes.io/role/internal-elb=1` tag on private subnets indicates where internal load balancers should be created

When you create a Kubernetes Service of type LoadBalancer, these tags help Kubernetes automatically choose the correct subnets based on whether you want an internal or external load balancer.

#### Routing and NAT Gateway

Now we'll set up the routing infrastructure that controls how traffic flows in and out of our subnets. This includes creating route tables for both public and private subnets, and setting up a NAT Gateway to provide internet access for resources in private subnets.

```sh :collpased-lines
# Create route table for public subnets
export PUBLIC_RT=$(aws ec2 create-route-table \
--vpc-id $VPC_ID \
--query 'RouteTable.RouteTableId' \
--output text)

# Create route to Internet Gateway
aws ec2 create-route \
--route-table-id $PUBLIC_RT \
--destination-cidr-block 0.0.0.0/0 \
--gateway-id $IGW_ID

# Associate public subnets with public route table
aws ec2 associate-route-table \
--subnet-id $PUBLIC_SUBNET_1 \
--route-table-id $PUBLIC_RT

aws ec2 associate-route-table \
--subnet-id $PUBLIC_SUBNET_2 \
--route-table-id $PUBLIC_RT

# Create NAT Gateway
export EIP_ALLOC=$(aws ec2 allocate-address \
--domain vpc \
--query 'AllocationId' \
--output text)

export NAT_GW=$(aws ec2 create-nat-gateway \
--subnet-id $PUBLIC_SUBNET_1 \
--allocation-id $EIP_ALLOC \
--query 'NatGateway.NatGatewayId' \
--output text)

# Wait for NAT Gateway to be available
aws ec2 wait nat-gateway-available --nat-gateway-ids $NAT_GW

# Create route table for private subnets
export PRIVATE_RT=$(aws ec2 create-route-table \
--vpc-id $VPC_ID \
--query 'RouteTable.RouteTableId' \
--output text)

# Create route to NAT Gateway
aws ec2 create-route \
--route-table-id $PRIVATE_RT \
--destination-cidr-block 0.0.0.0/0 \
--nat-gateway-id $NAT_GW

# Associate private subnets with private route table
aws ec2 associate-route-table \
--subnet-id $PRIVATE_SUBNET_1 \
--route-table-id $PRIVATE_RT

aws ec2 associate-route-table \
--subnet-id $PRIVATE_SUBNET_2 \
--route-table-id $PRIVATE_RT
```

Let me explain how this routing configuration enables secure internet access:

We start by creating a `route table` for our public subnets and adding a default route (0.0.0.0/0) that points to the Internet Gateway. This means any traffic from public subnet resources that doesn't match a more specific route will go directly to the Internet Gateway and out to the internet.

Next, we create a `NAT Gateway`, which requires an Elastic IP address. An **Elastic IP** is a static public IPv4 address that AWS allocates to your account. The NAT Gateway lives in a public subnet and acts as a middleman for outbound internet traffic from private subnets. When a resource in a private subnet wants to reach the internet (for example, to download software updates), the traffic goes to the NAT Gateway, which then forwards it to the Internet Gateway. Response traffic comes back through the same path.

For the `private subnets`, we create a separate route table with a default route pointing to the NAT Gateway instead of directly to the Internet Gateway. This setup allows resources in private subnets to initiate outbound connections to the internet (which they need for things like pulling container images or downloading patches), but prevents inbound connections from the internet. This is a key security feature: your worker nodes and databases can access the internet when needed, but the internet can't directly access them.

![route table](https://cdn.hashnode.com/res/hashnode/image/upload/v1758420369369/ffa92cd6-691d-4b3c-867f-739f6aa33c21.png)

![nat gateway](https://cdn.hashnode.com/res/hashnode/image/upload/v1758420512111/f7922e4a-103f-4f4d-84be-0baa20681b6b.png)

---

## EKS Cluster Configuration

With our networking foundation in place, we're ready to create the actual EKS cluster. We'll configure the cluster to support Security Groups for Pods and set up managed worker nodes with appropriate instance types.

### EKS Cluster Creation

Let's create our EKS cluster with configuration options specifically chosen to support the Security Groups for Pods feature.

```sh
export CLUSTER_ROLE_ARN=$(aws iam get-role \
--role-name EKSClusterRole \
--query 'Role.Arn' \
--output text)

# Create the EKS cluster with detailed configuration
aws eks create-cluster \
--name pod-security-cluster-demo \
--kubernetes-version 1.33 \
--role-arn $CLUSTER_ROLE_ARN \
--access-config authenticationMode=API_AND_CONFIG_MAP \
--resources-vpc-config subnetIds=$PUBLIC_SUBNET_1,$PUBLIC_SUBNET_2,$PRIVATE_SUBNET_1,$PRIVATE_SUBNET_2

# Wait for cluster to be active (this can take 10-15 minutes)
aws eks wait cluster-active --name pod-security-cluster-demo
```

So what's happening in this cluster creation command? First, we're using `Kubernetes version 1.33`, which is the latest stable version that also supports Security Groups for Pods. The `role-arn` parameter specifies the EKSClusterRole we created earlier, giving the cluster permission to manage AWS resources.

The access-config setting is particularly important. By specifying `API_AND_CONFIG_MAP`, we're enabling both modern API-based authentication and the traditional aws-auth ConfigMap approach. This dual authentication mode provides flexibility in how we manage cluster access.

We're including all four of our subnets in the `resources-vpc-config`. This is crucial because the EKS control plane needs to communicate with worker nodes across availability zones. By specifying both public and private subnets, we ensure that the cluster can place resources wherever they're needed while maintaining proper security boundaries.

The cluster creation process typically takes 10-15 minutes. During this time, AWS is provisioning the Kubernetes control plane components (API server, etcd, controller manager, and scheduler) across multiple availability zones for high availability.

![EKS Cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1758424603683/eba3fe22-b120-476d-84e7-1d3f86ff30d4.png)

### Managed Node Group Setup

With the cluster created, we now need to add worker nodes that will actually run our pods. We'll create a managed node group with instance types specifically chosen to support multiple ENIs.

```sh
# Get the ARN of the node group role
export NODE_ROLE_ARN=$(aws iam get-role \
--role-name EKSNodeGroupRole \
--query 'Role.Arn' \
--output text)

# Create the managed node group
aws eks create-nodegroup \
--cluster-name pod-security-cluster-demo \
--nodegroup-name workers \
--subnets $PRIVATE_SUBNET_1 $PRIVATE_SUBNET_2 \
--node-role $NODE_ROLE_ARN \
--instance-types m5.large \
--scaling-config minSize=1,maxSize=3,desiredSize=2 \
--disk-size 20 \
--capacity-type ON_DEMAND

# Wait for node group to be active
aws eks wait nodegroup-active \
--cluster-name pod-security-cluster-demo \
--nodegroup-name workers
```

Let me explain the key configuration choices here:

We're launching our `worker nodes` in the private subnets only, which follows security best practices by keeping compute resources away from direct internet access. The nodes can still download images and updates through the NAT Gateway we set up earlier.

The `instance type` selection is important for Security Groups for Pods. We're using m5.large instances, which can support up to 3 ENIs. One ENI is used as the primary network interface for the node itself, leaving 2 ENIs available for branch networking. Each branch ENI can support multiple pods with security group policies, giving us good pod density while maintaining the ability to assign custom security groups.

Our `scaling configuration` starts with 2 nodes (desiredSize=2), can scale down to 1 node (minSize=1), and up to 3 nodes (maxSize=3). This provides enough capacity for our demonstration while keeping costs reasonable. We're using the ON_DEMAND capacity type, which means these instances are standard EC2 instances billed per hour. While Spot instances are cheaper, ON_DEMAND ensures consistent availability without interruptions during our testing.

![node groups](https://cdn.hashnode.com/res/hashnode/image/upload/v1758425098518/006a5962-900b-4da6-87fd-2c3fa5194965.png)

#### Instance Type Selection for ENI Limits:

Understanding the ENI limits of different instance types can help when planning for Security Groups for Pods. Let's check the ENI capacity of various instance types to see how they compare.

```sh
# Check ENI limits for different instance types
aws ec2 describe-instance-types \
--instance-types a1.2xlarge t3.medium t3.large m5.large m5.xlarge \
--query 'InstanceTypes[*].[InstanceType,NetworkInfo.MaximumNetworkInterfaces]' \
--output table
```

This command shows ENI limits for different instance types, which determines how many pods can have dedicated security groups:

![ENI instance type](https://cdn.hashnode.com/res/hashnode/image/upload/v1758970656167/a244aca3-94ad-4c8c-a9d5-136613fd420a.png)

The `m5.large instance type` we chose provides 3 maximum network interfaces. Here's how that breaks down in practice: one ENI is always used as the primary network interface for the node itself, handling all the standard node networking. The remaining 2 ENIs can be used as trunk interfaces for branch networking, which is what enables Security Groups for Pods.

While a t3.medium only supports 3 ENIs total (which would also work for our demo), and an m5.xlarge supports 4 ENIs (providing more capacity), the m5.large offers the best balance. It provides adequate pod density for pods requiring security group policies while remaining cost-effective for demonstration purposes. In a production environment, you'd want to carefully calculate your ENI needs based on how many pods will require custom security groups and choose your instance types accordingly.

### EKS Cluster Access Configuration

Now we need to configure access to the cluster so our management instance can run kubectl commands. Instead of using the older aws-auth ConfigMap approach, we'll use EKS access entries, which provide a cleaner and more maintainable way to manage cluster access.

```sh
# Export the management role ARN 
export MANAGEMENT_ROLE_ARN=$(aws iam get-role \
--role-name EKS-Management-Role \
--query 'Role.Arn' \
--output text)

# Create access entry using the variable
aws eks create-access-entry \
--cluster-name pod-security-cluster-demo \
--principal-arn $MANAGEMENT_ROLE_ARN

# Associate admin policy using the variable
aws eks associate-access-policy \
--cluster-name pod-security-cluster-demo \
--principal-arn $MANAGEMENT_ROLE_ARN \
--policy-arn arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy \
--access-scope type=cluster

# Verify the policy was associated using the variable
aws eks list-associated-access-policies \
--cluster-name pod-security-cluster-demo \
--principal-arn $MANAGEMENT_ROLE_ARN
```

This access configuration demonstrates enterprise-grade role separation. The EKSClusterRole we created earlier is a service role that EKS itself uses to manage AWS infrastructure like VPCs, security groups, and load balancers. That's different from the EKS-Management-Role we're configuring now, which is an administrative role that human operators (or in our case, the management EC2 instance) use to interact with Kubernetes resources.

By creating an access entry for the management role and associating it with the AmazonEKSClusterAdminPolicy, we're granting full administrative access to the cluster. This means any EC2 instance that assumes the EKS-Management-Role can run kubectl commands with full permissions.

Access entries are the modern approach to cluster access management in EKS, providing better auditability and easier management compared to manually editing the aws-auth ConfigMap.

![EKS cluster access configuration and Policy verification](https://cdn.hashnode.com/res/hashnode/image/upload/v1758979128608/f8bd41dc-67e6-45f2-978e-b54b92c880e0.png)

---

## Management Instance Setup

Now we'll create a dedicated EC2 instance that will serve as our management workstation for interacting with the EKS cluster. This instance will have all the necessary tools pre-installed and will use the IAM role we configured earlier to access both AWS services and the Kubernetes cluster.

### Security Group for Management Access

First, let's create a security group that will control network access to our management instance. This security group will allow SSH connections so we can access the instance.

```sh
# Create security group with principle of least privilege
export EC2_SG=$(aws ec2 create-security-group \
--group-name EKS-Management-SG \
--description "Security group for EKS management instance" \
--vpc-id $VPC_ID \
--query 'GroupId' \
--output text)

# Allow SSH only from your IP
aws ec2 authorize-security-group-ingress \
--group-id $EC2_SG \
--protocol tcp \
--port 22 \
--cidr 0.0.0.0/0  # for security consider using your ip ${MY_IP}/32
```

We're creating a security group specifically for the management instance and allowing SSH access on port 22. In the example above, we're using 0.0.0.0/0 which allows SSH from any IP address. This is convenient for demonstration purposes, but in a production environment, you should definitely restrict this to your specific IP address instead.

![security group for eks management](https://cdn.hashnode.com/res/hashnode/image/upload/v1758424881848/1a7bf4f6-454b-4e6e-b670-7445bfc401e2.png)

### Automated Tool Installation

Now we'll launch the management instance with a user data script that automatically installs all the tools we'll need. User data scripts run automatically when an EC2 instance first boots up, allowing us to fully configure the instance without manual intervention.

```sh :collapsed-lines
# Create user data script for automatic tool installation
cat > user-data.sh << 'EOF'
#!/bin/bash
yum update -y
yum install -y unzip git

# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install

# Install kubectl (reference: https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
curl -O https://s3.us-west-2.amazonaws.com/amazon-eks/1.33.4/2025-08-20/bin/linux/amd64/kubectl
chmod +x ./kubectl
mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$HOME/bin:$PATH

# Install eksctl for additional EKS management
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
cp /tmp/eksctl /usr/local/bin

# Install helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Install PostgreSQL 13 client (newer version required for RDS SCRAM authentication)
sudo amazon-linux-extras install -y postgresql13

echo "Management tools installed successfully" > /var/log/setup-complete.log
EOF

# Get the latest Amazon Linux 2 AMI ID
export AMI_ID=$(aws ec2 describe-images \
--owners amazon \
--filters "Name=name,Values=amzn2-ami-hvm-*" "Name=state,Values=available" \
--query 'Images | sort_by(@, &CreationDate) | [-1].ImageId' \
--output text)

# Launch instance with user data
export INSTANCE_ID=$(aws ec2 run-instances \
--image-id $AMI_ID \
--count 1 \
--instance-type t3.micro \
--subnet-id $PUBLIC_SUBNET_1 \
--security-group-ids $EC2_SG \
--iam-instance-profile Name=EKS-Management-Profile \
--user-data file://user-data.sh \
--tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=EKS-Management},{Key=Environment,Value=Demo}]' \
--query 'Instances[0].InstanceId' \
--output text)

# Wait for instance to be running
aws ec2 wait instance-running --instance-ids $INSTANCE_ID

# Get instance public IP
export INSTANCE_IP=$(aws ec2 describe-instances \
--instance-ids $INSTANCE_ID \
--query 'Reservations[0].Instances[0].PublicIpAddress' \
--output text)

echo "Management instance is ready. Public IP: $INSTANCE_IP"
```

Let me walk through what this script does. The user data script starts by updating the system and installing basic utilities like unzip and git. Then it installs the AWS CLI version 2, which we'll use to interact with AWS services from the instance.

Next, we install kubectl, which is the command-line tool for interacting with Kubernetes clusters. We're installing version 1.33.4 to match our EKS cluster version. The script also installs eksctl, which is a higher-level tool for managing EKS clusters, and Helm, which is a package manager for Kubernetes applications.

Finally, we install the PostgreSQL 13 client. This will allow us to connect to the RDS database we'll create later and verify that our pod-level security groups are working correctly. The script writes a completion message to a log file so we can verify later that all tools installed successfully.

When we launch the instance, we're placing it in PUBLIC_SUBNET_1 so it gets a public IP address and can be accessed via SSH. We're attaching the EKS-Management-Profile IAM instance profile, which gives the instance the permissions we configured earlier. We're also using a t3.micro instance type, which is the smallest general-purpose instance. It’s perfectly adequate for running kubectl commands and managing the cluster while keeping costs minimal.

![magement ec2 instance running](https://cdn.hashnode.com/res/hashnode/image/upload/v1758425229354/9993f3a8-42d5-4c09-8b22-0749760708ff.png)

![EC2 Instance management](https://cdn.hashnode.com/res/hashnode/image/upload/v1758425336650/aea9fb9e-07f3-4771-ae3a-feab104621be.png)

---

## Security Group Configuration

With our infrastructure and cluster in place, we now need to create and configure the security groups that will control pod-level network access. This is where the real power of Security Groups for Pods comes into play. We'll create security groups that individual pods can use to enforce fine-grained network policies.

### Retrieving Cluster Network Information

Let's start by connecting to our management instance and gathering the networking details we need from our EKS cluster.

```sh
# Connect to management instance and get cluster VPC details

# verify all installation was successful
cat /var/log/setup-complete.log

# Update kubeconfig for your cluster 
aws eks update-kubeconfig --name pod-security-cluster-demo --region eu-west-1 

# Verify configuration 

kubectl get nodes 

# Check cluster info 
kubectl cluster-info 

export VPC_ID=$(aws eks describe-cluster \
   --name pod-security-cluster-demo \
   --query "cluster.resourcesVpcConfig.vpcId" \
   --output text)

echo "Cluster VPC ID: $VPC_ID"
```

First, we're checking the setup completion log to ensure that all our tools installed correctly during the instance's first boot. Then we configure kubectl to communicate with our EKS cluster by updating the kubeconfig file. This command retrieves the cluster endpoint and certificate authority data, storing them in ~/.kube/config so kubectl knows how to authenticate with our cluster.

Running kubectl get nodes should show us our two worker nodes in a Ready state. The kubectl cluster-info command displays the API server endpoint, confirming that we have proper connectivity to the cluster. Finally, we're extracting the VPC ID where our cluster is running. We'll need this ID when creating security groups, since security groups must be associated with a specific VPC.

![retrive VPC ID](https://cdn.hashnode.com/res/hashnode/image/upload/v1758431764884/a5f9771d-839e-4bbc-9c5b-ee428f0dde9a.png)

### Pod-Level Security Group Creation

Now we'll create the security group that specific pods will use when they need database access. This is the security group we'll later assign through a SecurityGroupPolicy.

```sh
# Create security group for pods requiring database access
aws ec2 create-security-group \
--description 'Pod Security Group - Database Access' \
--group-name 'POD_SG' \
--vpc-id ${VPC_ID}

export POD_SG=$(aws ec2 describe-security-groups \
--filters Name=group-name,Values=POD_SG Name=vpc-id,Values=${VPC_ID} \
--query "SecurityGroups[0].GroupId" --output text)

echo "Pod Security Group ID: ${POD_SG}"
```

This command creates a new security group in our cluster's VPC with a descriptive name and purpose. At this point, the security group has no inbound or outbound rules defined – it's essentially an empty container waiting for rules. We're storing the security group ID in the POD_SG variable because we'll need to reference it multiple times: when creating ingress rules, when setting up the SecurityGroupPolicy, and when verifying our configuration later.

![Pod security group created](https://cdn.hashnode.com/res/hashnode/image/upload/v1758431859644/2399369f-eb05-44ab-b06d-25b905a0f36d.png)

### Database Security Group Configuration

Next, let's create a dedicated security group for our RDS PostgreSQL database. This security group will strictly control which sources can connect to the database.

```sh
# Create security group for RDS database
aws ec2 create-security-group \
--description 'RDS Security Group - PostgreSQL Database' \
--group-name 'RDS_SG' \
--vpc-id ${VPC_ID}

export RDS_SG=$(aws ec2 describe-security-groups \
--filters Name=group-name,Values=RDS_SG Name=vpc-id,Values=${VPC_ID} \
--query "SecurityGroups[0].GroupId" --output text)

export RDS_SG_ID=$(aws rds describe-db-instances --db-instance-identifier rds-ekslab \
--query 'DBInstances[0].VpcSecurityGroups[0].VpcSecurityGroupId' --output text)

echo "RDS Security Group ID: ${RDS_SG}"
```

Similar to the pod security group, we're creating an RDS-specific security group without any rules initially. This security group will be attached to our RDS database instance when we create it. The beauty of this approach is that we can control database access by simply defining which security groups are allowed to communicate with the RDS security group. We don't need to know specific IP addresses – we can allow access based on security group membership instead.

![Create and export security group for RDS database ](https://cdn.hashnode.com/res/hashnode/image/upload/v1758431821224/c1c6a0b9-1df6-4430-b646-80c356e9f5b8.png)

### Inter-Service Communication Rules

Now comes the critical part: configuring the security group rules that will enable the necessary communication between components while maintaining security boundaries.

```sh
# Get cluster's node group security group
export NODE_GROUP_SG=$(aws ec2 describe-security-groups \
--filters Name=tag:Name,Values=eks-cluster-sg-pod-security-cluster-demo-* Name=vpc-id,Values=${VPC_ID} \
--query "SecurityGroups[0].GroupId" \
--output text)

# Allow pods with POD_SG to resolve DNS through node group
aws ec2 authorize-security-group-ingress \
--group-id ${NODE_GROUP_SG} \
--protocol tcp \
--port 53 \
--source-group ${POD_SG}

aws ec2 authorize-security-group-ingress \
--group-id ${NODE_GROUP_SG} \
--protocol udp \
--port 53 \
--source-group ${POD_SG}

# Allow management instance access to RDS
export MGMT_SG=$(aws ec2 describe-security-groups \
--filters Name=group-name,Values=EKS-Management-SG Name=vpc-id,Values=${VPC_ID} \
--query "SecurityGroups[0].GroupId" --output text)

aws ec2 authorize-security-group-ingress \
--group-id ${RDS_SG} \
--protocol tcp \
--port 5432 \
--source-group ${MGMT_SG}

# Allow only pods with POD_SG and MGMT_SG to access RDS
export RDS_SG_ID=$(aws rds describe-db-instances --db-instance-identifier rds-ekslab \
--query 'DBInstances[0].VpcSecurityGroups[0].VpcSecurityGroupId' --output text)

aws ec2 authorize-security-group-ingress \
--group-id ${RDS_SG_ID} \
--protocol tcp \
--port 5432 \
--source-group ${POD_SG}

aws ec2 authorize-security-group-ingress \
--group-id $RDS_SG_ID \
--protocol tcp \
--port 5432 \
--source-group $MGMT_SG
```

Let me explain what each of these rules accomplishes:

First, we're finding the security group that EKS automatically created for our node group. This security group controls traffic to and from the worker nodes themselves.

The first two rules we add allow DNS resolution. When pods with our POD_SG security group need to look up domain names (like our database hostname), they need to query the DNS service that runs on the worker nodes. By allowing both TCP and UDP traffic on port 53 from POD_SG to the node group security group, we ensure that pods with custom security groups can still resolve DNS names. Without these rules, our pods would get ENIs but wouldn't be able to look up any hostnames.

Next, we configure database access rules. We allow the management instance security group to access PostgreSQL port 5432 on the RDS security group. This lets us connect to the database from our management instance to set up test data and verify connectivity.

Most importantly, we allow pods with the POD_SG security group to connect to port 5432 on the RDS security group. This is the rule that will allow our "green pod" (which will be assigned POD_SG) to connect to the database. Notice that we're not allowing the node group security group to access the database - this means that pods without POD_SG cannot connect to the database, even though they're running on the same nodes as pods that can connect.

![Configure security group rules](https://cdn.hashnode.com/res/hashnode/image/upload/v1758432062853/f8fc4c7b-0565-4852-b93a-2a4e997c18f0.png)

---

## Database Setup

Now we'll create an Amazon RDS PostgreSQL instance to serve as the protected resource that will demonstrate pod-level access controls. We'll configure the database securely and populate it with test data that we can query from authorized pods.

### RDS Subnet Group Creation

Before creating the RDS instance, we need to define where it can be placed by creating a DB subnet group.

```sh
# Create DB subnet group spanning private subnets
aws rds create-db-subnet-group \
--db-subnet-group-name rds-ekslab \
--db-subnet-group-description "Subnet group for EKS lab RDS instance" \
--subnet-ids ${PRIVATE_SUBNET_1} ${PRIVATE_SUBNET_2}
```

A DB subnet group tells RDS which subnets it can use when launching a database instance. We're including both of our private subnets, which serves two important purposes. First, it ensures the database is never exposed directly to the internet. It will only be reachable from within our VPC. Second, it enables multi-AZ deployment if we wanted to add high availability later, since RDS would be able to place a standby replica in the second availability zone.

### Secure Password Generation

Let's generate a cryptographically secure password for our database. This is much safer than using a predictable or manually chosen password.

```sh
# Generate cryptographically secure password
export RDS_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
echo $RDS_PASSWORD > .rds_password
echo "Generated secure RDS password"
```

Here's what this command does step by step. First, `openssl rand -base64 32` generates 32 bytes of random data and encodes it in base64 format. The `tr` command removes characters that might cause issues in connection strings (equals signs, plus signs, and forward slashes). Finally, we truncate it to 25 characters to ensure it meets RDS password requirements. We save this password to a file so we can retrieve it later when connecting to the database.

### RDS Instance Configuration

Now we'll create the actual PostgreSQL database instance with security-focused configuration.

```sh
# Create PostgreSQL RDS instance
aws rds create-db-instance \
--db-instance-identifier rds-ekslab \
--db-instance-class db.t3.micro \
--engine postgres \
--master-username postgres \
--master-user-password ${RDS_PASSWORD} \
--allocated-storage 20 \
--vpc-security-group-ids ${RDS_SG} \
--db-subnet-group-name rds-ekslab \
--no-publicly-accessible \
--backup-retention-period 0 \
--storage-type gp2

# Wait for database to become available
aws rds wait db-instance-available --db-instance-identifier rds-ekslab
```

Let me walk through these configuration choices. We're using db.t3.micro, which is the smallest instance class available. It’s perfect for our demonstration while keeping costs minimal. The engine is PostgreSQL, which is a robust open-source relational database that works well for demonstrating network connectivity.

The `vpc-security-group-ids` parameter attaches our RDS_SG security group to the database. This is what enforces our carefully crafted access rules: only sources allowed by the security group rules we created earlier will be able to connect.

The `--no-publicly-accessible` flag is crucial for security. This ensures the database doesn't get a public IP address and can't be reached from the internet. Combined with our private subnet placement, this creates multiple layers of network security.

We're setting `backup-retention-period` to 0 because this is a demonstration environment and we don't need automated backups. In a production environment, you would definitely want automated backups enabled. The `storage-type gp2` specifies general-purpose SSD storage, which provides good performance at reasonable cost.

The `wait` command at the end blocks until the database is fully available, which typically takes 5-10 minutes. During this time, RDS is provisioning the database instance, configuring storage, setting up the master user, and performing initial system setup.

### Database Initialization

Once the database is available, we need to connect to it and create some test data that will help us verify connectivity from our pods later.

```sh
# Connect to the management instance and create test data
export RDS_PASSWORD=3aboiP3vKjmfNkWKRF6PXBCro #replace
echo $RDS_PASSWORD > .rds_password

export RDS_ENDPOINT=$(aws rds describe-db-instances \
--db-instance-identifier rds-ekslab \
--query 'DBInstances[0].Endpoint.Address' \
--output text)

# Connect to database and create test table
PGPASSWORD=${RDS_PASSWORD} psql -h ${RDS_ENDPOINT} -U postgres -d postgres << EOF
CREATE TABLE IF NOT EXISTS test_data (
    id SERIAL PRIMARY KEY,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO test_data (message) VALUES 
    ('Hello from authorized pod!'),
    ('Security groups for pods working correctly!'),
    ('Fine-grained network access control demonstrated.');

SELECT * FROM test_data;
EOF
```

Here's what we're doing in this initialization script. First, we retrieve the database endpoint hostname from AWS. This is the DNS name we'll use to connect to the database. Then we use the psql command-line tool to connect to PostgreSQL. We pass the password via the `PGPASSWORD` environment variable, which is a standard way to provide passwords to psql without interactive prompts.

Inside the SQL commands, we create a simple table called `test_data` with three columns: an auto-incrementing ID, a message text field, and a timestamp that defaults to the current time. We insert three test messages that we'll query later from our pods to verify connectivity. Finally, we select all rows to confirm the data was inserted successfully.

When you run this, you should see the three messages displayed, confirming the database is set up and accessible from the management instance.

![create database table](https://cdn.hashnode.com/res/hashnode/image/upload/v1758436248533/9176d2ce-f540-458d-8e6a-bbc1ab4f9d62.png)

---

## CNI Plugin Configuration

Now we need to configure the AWS VPC CNI plugin to enable the pod-level ENI assignment and branch networking functionality. This is a crucial step that activates the underlying technology that makes Security Groups for Pods possible.

### Enabling Pod ENI Support

We'll activate the feature flag that tells the VPC CNI plugin to support dedicated ENIs for pods.

```sh
# Enable pod ENI feature on AWS VPC CNI
kubectl -n kube-system set env daemonset aws-node ENABLE_POD_ENI=true
kubectl -n kube-system set env ds/aws-node ENABLE_POD_ENI=true

# Restart CNI pods to apply configuration
kubectl -n kube-system rollout restart daemonset aws-node
kubectl -n kube-system rollout status daemonset aws-node
kubectl -n kube-system rollout restart ds/aws-node
kubectl -n kube-system rollout status ds/aws-node
```

Let me explain what's happening here. The aws-node DaemonSet runs the VPC CNI plugin on every worker node in your cluster. This plugin is responsible for assigning IP addresses to pods and configuring their network interfaces. By setting the `ENABLE_POD_ENI` environment variable to true, we're telling the CNI plugin to support branch networking mode.

When this feature is enabled, the CNI plugin will watch for pods that have SecurityGroupPolicy rules applied to them. For these special pods, instead of just assigning an IP address from the node's primary ENI, the plugin will work with the VPC Resource Controller to provision a dedicated branch ENI. This dedicated ENI can then have its own security groups attached, independent of the node's security groups.

The `rollout restart` command forces all the aws-node pods to restart with the new configuration. The `rollout status` command then waits for the restart to complete successfully across all nodes. This typically takes a minute or two as each node's CNI pod is restarted in a rolling fashion.

### Verification and Troubleshooting

After enabling the feature, let's verify that everything is configured correctly and that our nodes are ready to support pod ENIs.

```sh
# Verify CNI configuration
kubectl -n kube-system get daemonset aws-node -o yaml | grep -A 5 -B 5 ENABLE_POD_ENI

# Check node ENI capacity
kubectl get nodes -o custom-columns=NAME:.metadata.name,POD_ENI:.status.allocatable.vpc\.amazonaws\.com/pod-eni

# Verify trunk ENI creation on nodes
NODE_ID=$(kubectl get nodes -o jsonpath='{.items[0].spec.providerID}' | cut -d'/' -f5)
aws ec2 describe-network-interfaces \
--filters Name=attachment.instance-id,Values=$NODE_ID Name=interface-type,Values=trunk \
--query 'NetworkInterfaces[*].NetworkInterfaceId'

# Check CNI logs for errors
kubectl -n kube-system logs -l k8s-app=aws-node --tail=20
```

These verification commands help us confirm that the feature is working as expected. The first command checks that the `ENABLE_POD_ENI` environment variable is properly set in the DaemonSet configuration. You should see the value set to "true" in the output.

The second command displays the pod-eni capacity for each node. This shows how many pods with dedicated ENIs each node can support. For our m5.large instances, you should see a number like "9" or similar, indicating that each node can support that many pods with custom security groups.

The third command looks for trunk ENIs on one of our nodes. When branch networking is enabled, the VPC CNI creates a special "trunk" ENI on each node that serves as the anchor point for branch ENIs. If you see a network interface ID returned here, it confirms that the trunk networking is properly configured.

Finally, we check the CNI plugin logs for any errors. If everything is working correctly, you shouldn't see any error messages. If there are problems, the logs will typically contain helpful information about what went wrong – perhaps permission issues, insufficient ENI capacity, or configuration problems.

![CNI Verifications](https://cdn.hashnode.com/res/hashnode/image/upload/v1758981390663/faa2d5ef-f6c8-4ac1-926a-aa5b8186add8.png)

---

## Security Policies Implementation

With our infrastructure ready and the CNI plugin configured, we can now create the SecurityGroupPolicy resources that define which pods should receive which security groups. This is where we bridge the gap between Kubernetes pod identity (labels) and AWS network security (security groups).

### Namespace and Context Setup

Let's start by creating a dedicated namespace for our demonstration resources. This helps keep things organized and makes cleanup easier.

```sh
# Create dedicated namespace for demonstration
kubectl create namespace networking
kubectl config set-context $(kubectl config current-context) --namespace=networking

# Verify namespace creation
kubectl get namespaces
```

Using a dedicated namespace provides several benefits for our demonstration. First, it isolates our demo resources from system components in the kube-system namespace and from any other applications that might be running. Second, it makes cleanup straightforward – we can delete the entire namespace later to remove all associated resources at once. Third, it provides a scope for our security policies, making it clear which resources they apply to.

The config set-context command changes your default namespace so that subsequent kubectl commands will operate in the networking namespace by default. This saves you from having to specify -n networking with every command.

![Create k8 namespace and context setup](https://cdn.hashnode.com/res/hashnode/image/upload/v1758438029420/17763b08-5928-49ad-9033-0ea6986abe00.png)

### SecurityGroupPolicy Resource Creation

Now we'll create the SecurityGroupPolicy custom resource that tells the system which pods should get our POD_SG security group.

```sh :collapsed-lines
# Export POD sg
export VPC_ID=$(aws eks describe-cluster \
--name pod-security-cluster-demo \
--query "cluster.resourcesVpcConfig.vpcId" \
--output text)

export POD_SG=$(aws ec2 describe-security-groups \
--filters Name=group-name,Values=POD_SG Name=vpc-id,Values=${VPC_ID} \
--query "SecurityGroups[0].GroupId" --output text)

# Verify SecurityGroupPolicy CRD exists
kubectl get crd securitygrouppolicies.vpcresources.k8s.aws

# Create security group policy
cat << EOF > sg-per-pod-policy.yaml
apiVersion: vpcresources.k8s.aws/v1beta1
kind: SecurityGroupPolicy
metadata:
  name: allow-rds-access
  namespace: networking
spec:
  podSelector:
    matchLabels:
      app: green-pod
  securityGroups:
    groupIds:
      - ${POD_SG}
EOF


kubectl apply -f sg-per-pod-policy.yaml

# Verify policy creation
kubectl -n networking get securitygrouppolicies
kubectl -n networking describe securitygrouppolicy allow-rds-access
```

Let me walk you through what this SecurityGroupPolicy does. The podSelector section uses Kubernetes label selectors to identify which pods should receive the security group. In this case, we're matching any pod with the label `app: green-pod`. This is standard Kubernetes label selector syntax, so you can use more complex selectors if needed (like multiple labels, or expressions).

The `securityGroups` section lists the AWS security group IDs that should be attached to matching pods. When a pod with the label `app: green-pod` is created in the networking namespace, the VPC Resource Controller sees it matches this policy. The controller then provisions a dedicated ENI for that pod and attaches our `POD_SG` security group to that ENI.

It's important to understand that this policy doesn't immediately change anything: it creates a rule that will apply to future pods. When you later create a pod with matching labels, that's when the ENI provisioning and security group attachment happens.

The verify commands at the end confirm that the SecurityGroupPolicy was created successfully and show its current status. You should see the policy listed with details about the pod selector and security groups.

![Security group policies creared](https://cdn.hashnode.com/res/hashnode/image/upload/v1758438517423/29876b46-8adc-49d1-8542-f6895a0e44ef.png)

---

## Testing and Validation

Now comes the exciting part. We'll create two pods to demonstrate that our Security Groups for Pods implementation is working correctly. One pod will have the matching label and should be able to access the database, while the other pod won't have the label and should be blocked.

### Kubernetes Secrets for Database Connectivity

First, we need to securely store our database connection credentials using Kubernetes secrets. This is a security best practice that keeps sensitive information out of pod specifications.

```sh
# Create secret with RDS connection details
export RDS_PASSWORD=$(cat .rds_password)
export RDS_ENDPOINT=$(aws rds describe-db-instances \
--db-instance-identifier rds-ekslab \
--query 'DBInstances[0].Endpoint.Address' \
--output text)

kubectl -n networking create secret generic rds \
--from-literal=password="${RDS_PASSWORD}" \
--from-literal=host="${RDS_ENDPOINT}" \
--from-literal=username=postgres \
--from-literal=database=postgres \
--dry-run=client -o yaml | kubectl apply -f -

# Verify secret creation
kubectl describe secret rds-credentials
```

Here's what we're doing with this secret creation. We're retrieving the password we generated earlier and the database endpoint hostname, then storing them in a Kubernetes secret along with the username and database name. The secret is created in the networking namespace where our test pods will run.

The `--dry-run=client -o yaml | kubectl apply -f -` pattern is a common Kubernetes technique that makes the command idempotent. If the secret already exists, it updates it rather than failing. This is useful when you need to run the command multiple times during testing or troubleshooting.

When pods reference this secret, Kubernetes will inject the values as environment variables or mount them as files, depending on how you configure the pod. The sensitive data never appears in the pod specification, and Kubernetes encrypts secrets at rest in etcd.

![create and verify k8 networking secrets](https://cdn.hashnode.com/res/hashnode/image/upload/v1758438556701/9aaa6f4e-7392-46f7-9624-0515494ef049.png)

### Green Pod (Authorized Database Access)

Now let's create our green pod – the pod that has the matching label and should successfully connect to the database.

```sh :collapsed-lines
cat << EOF > green-pod.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: green-pod
  namespace: networking
  labels:
    app: green-pod
spec:
  replicas: 1
  selector:
    matchLabels:
      app: green-pod
  template:
    metadata:
      labels:
        app: green-pod
    spec:
      containers:
      - name: postgres-client
        image: postgres:13-alpine
        env:
        - name: PGHOST
          valueFrom:
            secretKeyRef:
              name: rds
              key: host
        - name: PGPASSWORD
          valueFrom:
            secretKeyRef:
              name: rds
              key: password
        - name: PGUSER
          valueFrom:
            secretKeyRef:
              name: rds
              key: username
        - name: PGDATABASE
          valueFrom:
            secretKeyRef:
              name: rds
              key: database
        - name: PGSSLMODE
          value: require
        command: ["/bin/sh"]
        args:
        - -c
        - |
          echo "Green pod starting - should have database access..."
          echo "Attempting to connect to database at \$PGHOST"
          if psql -c "SELECT version();" 2>/dev/null; then
            echo "SUCCESS: Connected to PostgreSQL!"
            psql -c "SELECT version();"
            echo ""
            echo "Test data from database:"
            psql -c "SELECT id, message FROM test_data ORDER BY id;"
          else
            echo "ERROR: Could not connect to database"
            echo "This indicates security group configuration issues"
          fi
          echo "Sleeping to keep container running..."
          sleep 3600
        resources:
          limits:
            memory: "128Mi"
            cpu: "100m"
          requests:
            memory: "64Mi"
            cpu: "50m"
EOF

# Deploy green pod
kubectl apply -f green-pod.yaml
kubectl rollout status deployment green-pod

# Get pod name and check logs
export GREEN_POD_NAME=$(kubectl get pods -l app=green-pod -o jsonpath='{.items[0].metadata.name}')
echo "Green pod: $GREEN_POD_NAME"
kubectl logs $GREEN_POD_NAME
```

Let me explain what makes this pod special and why it should work. The key is the label `app: green-pod` in the pod template's metadata section. This label matches our SecurityGroupPolicy selector, so when this pod is created, the VPC Resource Controller will provision a dedicated ENI for it and attach the POD_SG security group.

The pod uses environment variables sourced from our Kubernetes secret to get the database connection details. PostgreSQL's command-line tools (like psql) automatically use these environment variables when set with the PG prefix. This means we don't need to specify connection parameters explicitly – the tools just work.

The startup script in the command section attempts to connect to the database and run a simple query. If the security groups are working correctly, the connection should succeed because this pod's ENI has the POD_SG security group, which is allowed to connect to port 5432 on the RDS security group. The script then queries our test_data table to display the messages we inserted earlier.

```plaintext title="output"
=== GREEN POD STARTING ===
This pod should have database access via security groups
Attempting connection to: rds-ekslab.xxxxx.us-west-2.rds.amazonaws.com
SUCCESS: Connected to PostgreSQL!
Database version:
 PostgreSQL 13.x on x86_64-pc-linux-gnu...
Test data from database:
 id |                    message                     |         created_at     ----+------------------------------------------------+----------------------------
  1 | Hello from authorized pod!                     | 2024-01-15 10:30:45.123456
  2 | Security groups for pods working correctly!    | 2024-01-15 10:30:45.234567
  3 | Fine-grained network access control demonstrated. | 2024-01-15 10:30:45.345678
```

![Verify access to green pod](https://cdn.hashnode.com/res/hashnode/image/upload/v1758967069726/d439b2da-64bc-4074-95ca-51ed02263e68.png)

### Red Pod (Unauthorized Database Access)

Now let's create the red pod – a pod without the matching label that should be blocked from accessing the database.

```sh :collapsed-lines
cat << EOF > red-pod.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: red-pod
  namespace: networking
  labels:
    app: red-pod
spec:
  replicas: 1
  selector:
    matchLabels:
      app: red-pod
  template:
    metadata:
      labels:
        app: red-pod
    spec:
      containers:
      - name: postgres-client
        image: postgres:13-alpine
        env:
        - name: PGHOST
          valueFrom:
            secretKeyRef:
              name: rds
              key: host
        - name: PGPASSWORD
          valueFrom:
            secretKeyRef:
              name: rds
              key: password
        - name: PGUSER
          valueFrom:
            secretKeyRef:
              name: rds
              key: username
        - name: PGDATABASE
          valueFrom:
            secretKeyRef:
              name: rds
              key: database
        - name: PGSSLMODE
          value: require
        command: ["/bin/sh"]
        args:
        - -c
        - |
          echo "Red pod starting - should NOT have database access..."
          echo "Attempting to connect to database at \$PGHOST"

          # Test database connection (should fail)
          if psql -c "SELECT version();" 2>/dev/null; then
            echo "UNEXPECTED: Connected to database!"
            echo "This suggests security group policy is not working correctly"
          else
            echo "EXPECTED: Could not connect to database"
            echo "This is correct - red pod should not have database access"
            echo "Security groups for pods is working properly!"
          fi

          # Keep container running for inspection
          echo "Sleeping to keep container running..."
          sleep 3600
        resources:
          limits:
            memory: "128Mi"
            cpu: "100m"
          requests:
            memory: "64Mi"
            cpu: "50m"
EOF

# Deploy red pod
kubectl apply -f red-pod.yaml
kubectl rollout status deployment red-pod

# Get pod name and check logs
export RED_POD_NAME=$(kubectl get pods -l app=red-pod -o jsonpath='{.items[0].metadata.name}')
echo "Red pod: $RED_POD_NAME"
kubectl logs $RED_POD_NAME
```

The red pod is intentionally configured almost identically to the green pod: same container image, same database credentials, same connection attempt. The only significant difference is the label: this pod has `app: red-pod` instead of `app: green-pod`.

Because this pod's label doesn't match our SecurityGroupPolicy, the VPC Resource Controller won't provision a dedicated ENI for it. Instead, this pod will use the node's primary network interface and inherit the node's security group. Since we specifically didn't add a rule allowing the node security group to access the RDS security group, this pod's connection attempts should be blocked at the network level.

The expected output from the red pod logs should look like this:

```plaintext title="output"
=== RED POD STARTING ===
This pod should NOT have database access
Attempting connection to: rds-ekslab.xxxxx.us-west-2.rds.amazonaws.com
EXPECTED: Could not connect to database
```

![Unauthorized access to red pod](https://cdn.hashnode.com/res/hashnode/image/upload/v1758439888619/41226f05-a51a-4c34-bb57-9d0def923a06.png)

### ENI Assignment Verification

Let's verify that the green pod actually received a dedicated ENI while the red pod did not.

```sh
# Check green pod ENI assignment
echo "=== Green Pod ENI Assignment ==="
kubectl describe pod $GREEN_POD_NAME | grep -A 3 -B 3 "vpc.amazonaws.com/pod-eni"
kubectl get pod $GREEN_POD_NAME -o yaml | grep -A 5 "annotations:" | grep "vpc.amazonaws.com"

# Check red pod networking (should use node networking)
echo "=== Red Pod Networking ==="
kubectl describe pod $RED_POD_NAME | grep "vpc.amazonaws.com" || echo "No dedicated ENI (expected for red pod)"

# Verify ENI creation in AWS
echo "=== AWS ENI Verification ==="
aws ec2 describe-network-interfaces \
--filters Name=description,Values="*pod-eni*" \
--query 'NetworkInterfaces[*].[NetworkInterfaceId,Description,Groups[0].GroupId]' \
--output table

# Compare pod IP addresses
echo "=== Pod IP Comparison ==="
kubectl get pods -o wide
```

These verification commands help us understand what's happening at the infrastructure level. When you check the green pod's description, you should see annotations like `vpc.amazonaws.com/pod-eni` that indicate a dedicated ENI was assigned. The annotation will contain the ENI ID and other networking details.

For the red pod, you won't see these annotations because it's using the node's primary network interface instead of a dedicated ENI. This is the expected behavior.

The AWS CLI command queries EC2 for network interfaces with "pod-eni" in the description. This should return the ENI(s) that were created for pods with SecurityGroupPolicy assignments. You'll see the network interface ID, its description, and importantly, the security group ID (which should match our POD_SG).

When you run `kubectl get pods -o wide`, you can see the IP addresses assigned to each pod. Both pods will have IP addresses from your VPC's CIDR range, but they're coming from different network interfaces at the infrastructure level.

### Troubleshooting Common Issues

If things aren't working as expected, here are some diagnostic commands for resolving common implementation problems:

```sh :collapsed-lines
# If green pod cannot connect to database:

# 1. Verify security group rules
aws ec2 describe-security-groups --group-ids $POD_SG $RDS_SG

# 2. Check if POD_SG has access to RDS_SG
aws ec2 describe-security-groups --group-ids $RDS_SG --query 'SecurityGroups[0].IpPermissions'

# 3. Verify ENI assignment
kubectl describe pod $GREEN_POD_NAME | grep -E "(Events|vpc.amazonaws.com)"

# 4. Check CNI plugin status
kubectl -n kube-system logs -l k8s-app=aws-node --tail=100 | grep -i error

# 5. Validate SecurityGroupPolicy
kubectl get sgp allow-rds-access -o yaml

# 6. Ensure ENABLE_POD_ENI is set
kubectl -n kube-system get ds aws-node -o yaml | grep -A 5 ENABLE_POD_ENI

# If red pod unexpectedly connects:

# 1. Verify pod labels don't match policy
kubectl get pod $RED_POD_NAME --show-labels

# 2. Check for unintended security group rules
aws ec2 describe-security-groups --group-ids $RDS_SG --query 'SecurityGroups[0].IpPermissions'

# 3. Confirm node group security doesn't allow RDS access
export NODE_SG=$(kubectl get nodes -o yaml | grep -o 'sg-[a-zA-Z0-9]*' | head -1)
aws ec2 describe-security-groups --group-ids $NODE_SG
```

These troubleshooting commands help you systematically diagnose problems. If the green pod can't connect, you work through the checklist: verify the security group rules exist, confirm the ENI was actually assigned, check for CNI errors, and validate the SecurityGroupPolicy configuration.

If the red pod unexpectedly can connect, you check whether it somehow got the wrong labels, whether there's an unintended security group rule allowing node-level access, or whether the node security group itself has database access that it shouldn't have.

---

## Cleanup and Maintenance

When you're finished with this demonstration, it's important to clean up all the resources to avoid ongoing AWS charges. We'll walk through the cleanup process in the proper order to avoid dependency issues.

### Kubernetes Resource Cleanup

Let's start by removing all the Kubernetes resources we created during the demonstration.

```sh :collapsed-lines
# Delete application deployments
kubectl delete -f green-pod.yaml
kubectl delete -f red-pod.yaml

# Delete security group policy
kubectl delete -f sg-per-pod-policy.yaml

# Delete secrets
kubectl delete secret rds-credentials

# Delete namespace (removes all resources)
kubectl delete namespace networking

# Disable pod ENI feature
kubectl -n kube-system set env daemonset aws-node ENABLE_POD_ENI=false
kubectl -n kube-system rollout status daemonset aws-node

# Verify ENI cleanup
kubectl get nodes -o custom-columns=NAME:.metadata.name,POD_ENI:.status.allocatable.vpc.amazonaws.com/pod-eni
```

We start by deleting the individual deployments to ensure the pods are terminated gracefully. Then we remove the SecurityGroupPolicy, which stops the VPC Resource Controller from creating new ENIs. Deleting the namespace removes any remaining resources we might have created during testing.

Disabling the ENABLE_POD_ENI feature returns the CNI plugin to its default behavior. This doesn't immediately remove existing trunk ENIs, but it prevents new ones from being created.

### RDS and Database Cleanup

Next, we'll remove the RDS database instance and its associated resources.

```sh
# Delete RDS instance (skip final snapshot for demo)
aws rds delete-db-instance \
--db-instance-identifier rds-ekslab \
--delete-automated-backups \
--skip-final-snapshot

# Wait for deletion completion
aws rds wait db-instance-deleted --db-instance-identifier rds-ekslab

# Delete DB subnet group
aws rds delete-db-subnet-group \
--db-subnet-group-name rds-ekslab
```

The `--skip-final-snapshot` flag means we won't create a snapshot before deleting the database. In a production environment, you'd typically want a final snapshot, but for our demonstration where the data isn't valuable, skipping it speeds up the deletion process. The wait command blocks until RDS confirms the instance is fully deleted, which can take several minutes.

### EKS Cluster Deletion

Now we'll delete the EKS cluster and its node groups.

```sh
# Delete managed node group first
aws eks delete-nodegroup \
--cluster-name pod-security-cluster-demo \
--nodegroup-name workers

# Wait for node group deletion
aws eks wait nodegroup-deleted \
--cluster-name pod-security-cluster-demo \
--nodegroup-name workers

# Delete EKS cluster
aws eks delete-cluster --name pod-security-cluster-demo

# Wait for cluster deletion
aws eks wait cluster-deleted --name pod-security-cluster-demo
```

It's important to delete the node group before deleting the cluster. If you try to delete the cluster first, it will fail because node groups are dependent resources. The node group deletion process terminates all the EC2 instances and cleans up their associated resources. The cluster deletion then removes the control plane components.

### Management Instance Cleanup

Let's remove the management instance and its associated resources.

```sh
# Terminate management instance
aws ec2 terminate-instances --instance-ids $INSTANCE_ID

# Wait for termination
aws ec2 wait instance-terminated --instance-ids $INSTANCE_ID

# Release Elastic IP
aws ec2 release-address --allocation-id $EIP_ALLOC
```

Terminating the instance is straightforward: AWS handles the cleanup of attached volumes and network interfaces automatically. But we need to explicitly release the Elastic IP address. Elastic IPs incur charges if they're allocated but not attached to a running instance, so releasing them is important to avoid unnecessary costs.

### Complete VPC Infrastructure Removal

Now we'll remove all the VPC components. This is the most complex cleanup section because VPC resources have many interdependencies that must be resolved in the correct order.

```sh :collapsed-lines
export VPC_ID=$(aws ec2 describe-vpcs \
--filters Name=cidr-block-association.cidr-block,Values=10.0.0.0/16 Name=isDefault,Values=false \
--query 'Vpcs[?State==`available`].VpcId | [0]' --output text)

#!/bin/bash
set -euo pipefail

echo "=== Starting comprehensive VPC cleanup ==="

# First, let's identify what's still attached
echo "=== Remaining dependencies check ==="
aws ec2 describe-network-interfaces --filters Name=vpc-id,Values="$VPC_ID" --query 'NetworkInterfaces[*].[NetworkInterfaceId,Description,Status]' --output table
aws ec2 describe-instances --filters Name=vpc-id,Values="$VPC_ID" Name=instance-state-name,Values=running,pending,stopping --query 'Reservations[].Instances[*].[InstanceId,State.Name]' --output table

echo "=== Force delete any remaining ENIs ==="
for eni in $(aws ec2 describe-network-interfaces --filters Name=vpc-id,Values="$VPC_ID" --query 'NetworkInterfaces[?Status!=`in-use`].NetworkInterfaceId' --output text); do
  echo "Deleting ENI: $eni"
  aws ec2 delete-network-interface --network-interface-id "$eni" || true
done

echo "=== Wait for ENI cleanup ==="
sleep 30

echo "=== Delete load balancers ==="
# Delete ALB/NLB
for arn in $(aws elbv2 describe-load-balancers --query "LoadBalancers[?VpcId=='$VPC_ID'].LoadBalancerArn" --output text); do
  aws elbv2 delete-load-balancer --load-balancer-arn "$arn"
  echo "Deleted ALB/NLB: $arn"
done

# Delete Classic ELB
for name in $(aws elb describe-load-balancers --query "LoadBalancerDescriptions[?VPCId=='$VPC_ID'].LoadBalancerName" --output text); do
  aws elb delete-load-balancer --load-balancer-name "$name"
  echo "Deleted Classic ELB: $name"
done

echo "=== Delete VPC Endpoints ==="
EP_IDS=$(aws ec2 describe-vpc-endpoints --filters Name=vpc-id,Values="$VPC_ID" --query 'VpcEndpoints[].VpcEndpointId' --output text || true)
if [ -n "${EP_IDS:-}" ]; then
  aws ec2 delete-vpc-endpoints --vpc-endpoint-ids $EP_IDS
fi

echo "=== Delete NAT Gateways ==="
for nat in $(aws ec2 describe-nat-gateways --filter Name=vpc-id,Values="$VPC_ID" --query 'NatGateways[?State!=`deleted`].NatGatewayId' --output text); do
  aws ec2 delete-nat-gateway --nat-gateway-id "$nat"
  echo "Deleted NAT Gateway: $nat"
done

# Wait for NAT Gateway deletion
echo "Waiting for NAT Gateways to delete..."
while [ $(aws ec2 describe-nat-gateways --filter Name=vpc-id,Values="$VPC_ID" --query 'length(NatGateways[?State!=`deleted`])' --output text) != "0" ]; do
  echo "Still waiting for NAT Gateway deletion..."
  sleep 15
done

echo "=== Delete Internet Gateways ==="
for igw in $(aws ec2 describe-internet-gateways --filters Name=attachment.vpc-id,Values="$VPC_ID" --query 'InternetGateways[].InternetGatewayId' --output text); do
  aws ec2 detach-internet-gateway --internet-gateway-id "$igw" --vpc-id "$VPC_ID" || true
  aws ec2 delete-internet-gateway --internet-gateway-id "$igw"
  echo "Deleted Internet Gateway: $igw"
done

echo "=== Terminate any remaining instances ==="
for iid in $(aws ec2 describe-instances --filters Name=vpc-id,Values="$VPC_ID" Name=instance-state-name,Values=running,pending,stopping --query 'Reservations[].Instances[].InstanceId' --output text); do
  aws ec2 terminate-instances --instance-ids "$iid"
  echo "Terminating instance: $iid"
done

# Wait for instances to terminate
if [ $(aws ec2 describe-instances --filters Name=vpc-id,Values="$VPC_ID" Name=instance-state-name,Values=running,pending,stopping --query 'length(Reservations[].Instances[])' --output text) != "0" ]; then
  echo "Waiting for instances to terminate..."
  aws ec2 wait instance-terminated --instance-ids $(aws ec2 describe-instances --filters Name=vpc-id,Values="$VPC_ID" Name=instance-state-name,Values=running,pending,stopping --query 'Reservations[].Instances[].InstanceId' --output text)
fi

echo "=== Delete subnets ==="
for subnet in $(aws ec2 describe-subnets --filters Name=vpc-id,Values="$VPC_ID" --query 'Subnets[].SubnetId' --output text); do
  aws ec2 delete-subnet --subnet-id "$subnet" || true
  echo "Deleted subnet: $subnet"
done

echo "=== Delete route tables ==="
for rt in $(aws ec2 describe-route-tables --filters Name=vpc-id,Values="$VPC_ID" --query 'RouteTables[?Associations[?Main==`false`]].RouteTableId' --output text); do
  # Disassociate route table first
  for assoc in $(aws ec2 describe-route-tables --route-table-ids "$rt" --query 'RouteTables[].Associations[?Main==`false`].RouteTableAssociationId' --output text); do
    aws ec2 disassociate-route-table --association-id "$assoc" || true
  done
  aws ec2 delete-route-table --route-table-id "$rt" || true
  echo "Deleted route table: $rt"
done

echo "=== Delete security groups ==="
# Delete custom security groups (retry logic for dependencies)
for attempt in {1..3}; do
  echo "Security group deletion attempt $attempt..."
  for sg in $(aws ec2 describe-security-groups --filters Name=vpc-id,Values="$VPC_ID" --query 'SecurityGroups[?GroupName!=`default`].GroupId' --output text); do
    aws ec2 delete-security-group --group-id "$sg" 2>/dev/null && echo "Deleted SG: $sg" || echo "Failed to delete SG: $sg (will retry)"
  done
  sleep 10
done

echo "=== Final VPC deletion ==="
aws ec2 delete-vpc --vpc-id "$VPC_ID"
echo "VPC cleanup completed successfully!"
```

This cleanup script is comprehensive and handles all the common dependency issues you might encounter when deleting a VPC. Let me explain the order and reasoning behind each section.

We start by checking what resources are still attached to the VPC. This gives us visibility into any unexpected dependencies that might cause deletion failures. Then we delete any detached ENIs. These are network interfaces that EKS or the CNI plugin might have created that are no longer attached to instances.

Load balancers must be deleted before we can remove subnets, because they create ENIs in the subnets. We check for both modern Application/Network Load Balancers and Classic ELBs. VPC endpoints, if any were created, also need to be removed before subnet deletion.

The NAT Gateway deletion is particularly important to wait for completely, because NAT Gateways take several minutes to fully delete. If you try to delete the subnet while the NAT Gateway is still in "deleting" state, the deletion will fail.

Internet Gateways must be detached before they can be deleted. We use the `|| true` pattern here because if the detachment fails (maybe it's already detached), we still want to try the deletion.

Subnets can be deleted once all resources using them are removed. Route tables need to be disassociated from subnets before deletion – we only delete non-main route tables, as the main route table is automatically deleted with the VPC.

Security groups often have dependencies on each other (if rules reference other security groups), so we use a retry loop with three attempts. Each iteration, some security groups might successfully delete, breaking dependencies for others.

Finally, once all attached resources are cleaned up, we can delete the VPC itself.

### IAM Resource Cleanup

The last step is cleaning up the IAM roles and policies we created at the beginning.

```sh :collapsed-lines
# Detach policies from roles
aws iam detach-role-policy \
--role-name EKSClusterRole \
--policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy

aws iam detach-role-policy \
--role-name EKSClusterRole \
--policy-arn arn:aws:iam::aws:policy/AmazonEKSVPCResourceController

aws iam detach-role-policy \
--role-name EKSNodeGroupRole \
--policy-arn arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy

aws iam detach-role-policy \
--role-name EKSNodeGroupRole \
--policy-arn arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy

aws iam detach-role-policy \
--role-name EKSNodeGroupRole \
--policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly

# Clean up management instance IAM resources
aws iam detach-role-policy \
--role-name EKS-Management-Role \
--policy-arn arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):policy/EKS-Management-Policy

aws iam delete-policy \
--policy-arn arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):policy/EKS-Management-Policy

aws iam remove-role-from-instance-profile \
--instance-profile-name EKS-Management-Profile \
--role-name EKS-Management-Role

aws iam delete-instance-profile \
--instance-profile-name EKS-Management-Profile

# Delete IAM roles
aws iam delete-role --role-name EKSClusterRole
aws iam delete-role --role-name EKSNodeGroupRole  
aws iam delete-role --role-name EKS-Management-Role

echo "Complete cleanup finished successfully"
```

IAM cleanup follows a specific order: first detach all policies from roles, then delete any custom policies we created, remove roles from instance profiles, delete the instance profiles, and finally delete the roles themselves. IAM requires this order because of the dependency chain: you can't delete a role that still has policies attached, and you can't delete an instance profile that still contains a role.

The custom EKS-Management-Policy that we created needs to be deleted using your account ID in the ARN. The `aws sts get-caller-identity` command retrieves your account ID dynamically so the command works regardless of which AWS account you're using.

Once this cleanup is complete, you've removed all resources created during this guide and won't incur any further charges.

---

## Conclusion

This comprehensive guide demonstrated how to implement Security Groups for Pods in Amazon EKS, providing fine-grained network security controls at the pod level.

::: info

As always, I hope you enjoyed this guide and learned something valuable about securing your EKS workloads. If you want to stay connected or see more hands-on DevOps content, you can follow me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`destiny-erhabor`)](https://linkedin.com/in/destiny-erhabor) or [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`caesar_sage`)](https://twitter.com/caesar_sage).

For more practical, hands-on DevOps projects like this one, follow and star this repository:

<SiteInfo
  name="Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Kubernetes Cluster and Security Groups for Pods in AWS [Full Handbook]",
  "desc": "Amazon Elastic Kubernetes Service (EKS) Security Groups for Pods is a powerful feature that enables fine-grained network security controls at the pod level. This guide walks you through implementing this feature, from initial cluster setup to testing...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-kubernetes-cluster-and-security-groups-for-pods-in-aws-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
