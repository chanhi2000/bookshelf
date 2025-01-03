---
lang: en-US
title: "How to Choose the Right IaC Tool – AWS CDK, CloudFormation, and Terraform Compared"
description: "Article(s) > How to Choose the Right IaC Tool – AWS CDK, CloudFormation, and Terraform Compared"
icon: fa-brands fa-aws
category: 
  - DevOps
  - Amazon
  - AWS
  - Terraform
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - amazon-web-services
  - aws
  - aws-cdk
  - aws-cloudformation
  - cloudformation
  - terraform
  - iac
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Choose the Right IaC Tool – AWS CDK, CloudFormation, and Terraform Compared"
    - property: og:description
      content: "How to Choose the Right IaC Tool – AWS CDK, CloudFormation, and Terraform Compared"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/comparing-iac-tools-aws-cdk-cloudformation-terraform.html
prev: /devops/aws/articles/README.md
date: 2024-06-04
isOriginal: false
author:
  - name: Ifeanyi Otuonye
    url : https://freecodecamp.org/news/author/REXTECH/
cover: https://freecodecamp.org/news/content/images/size/w1000/2024/06/Level-Up-Tech-Design-Portfolio.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Terraform > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/terraform/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Choose the Right IaC Tool – AWS CDK, CloudFormation, and Terraform Compared"
  desc="Infrastructure as Code (IaC) has become a cornerstone of modern cloud resource management. It enables developers and engineers to manage their cloud resources with the same level of control and precision as application code.  When you're working with AWS, among the tools at the forefront of utilizing IaC are..."
  url="https://freecodecamp.org/news/comparing-iac-tools-aws-cdk-cloudformation-terraform/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w1000/2024/06/Level-Up-Tech-Design-Portfolio.jpg"/>

Infrastructure as Code (IaC) has become a cornerstone of modern cloud resource management. It enables developers and engineers to manage their cloud resources with the same level of control and precision as application code.

When you're working with AWS, among the tools at the forefront of utilizing IaC are AWS CloudFormation, AWS Cloud Development Kit (CDK), and HashiCorp’s Terraform.

Each of these IaC tools offers unique features and approaches to infrastructure management. This makes them suitable for different scenarios and preferences, and they can help you automate and standardize your or your team's cloud resource deployments.

This article will provide a high-level comparison of these three tools, focusing on their capabilities, abstraction levels, and practical use cases. You'll explore how these tools enable you to programmatically create and manage complex cloud infrastructures.

Specifically, the focus will be on deploying a three-tier architecture networking infrastructure. It'll include deploying a Virtual Private Cloud (VPC) configured with multiple subnets, route tables, an internet gateway, and NAT gateways to showcase the unique capabilities and syntax of each IaC tool.

By the end of this article, you'll gain a thorough understanding of the functionalities of these tools so you can make an informed decision when selecting one to build resilient, scalable and efficiently managed cloud infrastructures.

Without further ado, let’s get this party started!

---

## What is Infrastructure as Code (IaC)?

Infrastructure as Code is a key DevOps principle that involves managing and provisioning infrastructure resources by defining it as code in configuration files, instead of using manual processes and settings.

If you want to learn more about IaC basics, [**here's a helpful guide to get you started**](/freecodecamp.org/infrastructure-as-code-basics.md).

Now let's learn a bit more about the three tools we'll be comparing in this overview.

### What Does AWS CloudFormation Do?

AWS CloudFormation uses YAML or JSON to describe as well as automatically and securely provision infrastructure resources needed for your applications – across all regions and accounts in your AWS cloud environment.

### What Does AWS Cloud Development Kit (CDK) Do?

AWS Cloud Development Kit is a software development framework specifically used for defining cloud infrastructure in code. It ultimately provisions resources through AWS CloudFormation.

AWS CDK uses familiar programming languages like TypeScript, JavaScript, Python, Java, and others to define reusable cloud components known as constructs. These are then shared and used to create complex and scalable cloud architectures.

#### What's a construct?

In the context of AWS CDK, a construct represents a cloud component that encapsulates certain functionality and configuration in a reusable form.

### What Does Terraform Do?

Terraform is a multi-tenant tool created by HashiCorp that allows you to define both low-level and high-level components of your cloud infrastructure using a declarative configuration language.

It is cloud-agnostic and is capable of managing multi-provider setups within a single configuration.

#### What does cloud-agnostic mean?

Cloud-agnostic refers to the ability of a tool or service to operate across different cloud providers without significant changes to its operational procedures or architecture.

Alright, now that you understand the tools we'll be discussing, let's dive in.

::: note Prerequisites

- AWS Account with an IAM User with admin permissions
- Basic knowledge and use of AWS CloudFormation, AWS CDK, and Terraform
- Basic understanding of YAML, Python, and the HashiCorp Configuration Language
- Experience with an Interactive Development Environment (IDE)

:::

---

## Use Case Scenario

You’re a Cloud Network Engineer at REXTECH Corp, a startup on the verge of launching a new online service that offers digital content streaming. As the service is expected to attract a substantial user base right from the start, you need to deploy a highly scalable, reliable, and secure cloud infrastructure that can handle peak traffic and provide continuous availability.

Your manager has mandated a cloud network solution that not only meets these performance requirements but also allows for rapid scaling and efficient management.

In response to this, you are tasked with automating the deployment of a three-tier architecture networking infrastructure. It needs to have a Virtual Private Cloud (VPC) that includes multiple subnets across multiple Availability Zones (AZs), NAT gateways, and route tables to ensure resiliency and optimal configuration.

With the need for agility and maintainability in your infrastructure, you decide to evaluate and choose between AWS CloudFormation, AWS CDK, and Terraform for this project.

Before you evaluate each tool's application to the scenario, let’s break down the deployment resource components.

This deployment involves configuring a VPC with two public subnets for frontend facing web servers, two private subnets for servers in the application tier, and another two private subnets to host a multi-AZ database. All subnets will be deployed across multiple AZs and will include the connectivity configurations between components through route tables and an internet gateway.

Also, two NAT gateways in the public subnets will ensure that the resources in the private subnets of the application tier can securely access the internet for updates and inter-service communication without direct exposure to the outside world.

Now, let’s learn how you can automate the creation of this solution using all three IaC tools: **AWS CloudFormation**, **AWS CDK** and **Terraform**.

---

## IaC Tool Code Examples

### AWS CloudFormation Example

AWS CloudFormation allows you to define your desired infrastructure using a declarative JSON or YAML configuration file. But you must define the interdependencies and connections between resources using intrinsic functions like **!Ref**, referencing other resources or **!GetAtt**, to help select availability zones dynamically.

Below is how you define the three-tier networking solution using AWS CloudFormation:

```yaml :collapsed-lines
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyVPC:
    Type: 'AWS::EC2::VPC'
    Properties:
      CidrBlock: '10.0.0.0/16'
      EnableDnsSupport: true
      EnableDnsHostnames: true

  InternetGateway:
    Type: 'AWS::EC2::InternetGateway'

  AttachGateway:
    Type: 'AWS::EC2::VPCGatewayAttachment'
    Properties:
      VpcId: !Ref MyVPC
      InternetGatewayId: !Ref InternetGateway

  PublicSubnetOne:
    Type: 'AWS::EC2::Subnet'
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: '10.0.1.0/24'
      AvailabilityZone: !Select [0, !GetAZs '']
      MapPublicIpOnLaunch: true

  PublicSubnetTwo:
    Type: 'AWS::EC2::Subnet'
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: '10.0.2.0/24'
      AvailabilityZone: !Select [1, !GetAZs '']
      MapPublicIpOnLaunch: true

  PrivateSubnetAppOne:
    Type: 'AWS::EC2::Subnet'
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: '10.0.3.0/24'
      AvailabilityZone: !Select [0, !GetAZs '']

  PrivateSubnetAppTwo:
    Type: 'AWS::EC2::Subnet'
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: '10.0.4.0/24'
      AvailabilityZone: !Select [1, !GetAZs '']

  PrivateSubnetDBOne:
    Type: 'AWS::EC2::Subnet'
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: '10.0.5.0/24'
      AvailabilityZone: !Select [0, !GetAZs '']

  PrivateSubnetDBTwo:
    Type: 'AWS::EC2::Subnet'
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: '10.0.6.0/24'
      AvailabilityZone: !Select [1, !GetAZs '']

  EIPOne:
    Type: 'AWS::EC2::EIP'

  EIPTwo:
    Type: 'AWS::EC2::EIP'

  NATGatewayOne:
    Type: 'AWS::EC2::NatGateway'
    Properties:
      AllocationId: !GetAtt 'EIPOne.AllocationId'
      SubnetId: !Ref PublicSubnetOne

  NATGatewayTwo:
    Type: 'AWS::EC2::NatGateway'
    Properties:
      AllocationId: !GetAtt 'EIPTwo.AllocationId'
      SubnetId: !Ref PublicSubnetTwo

  PublicRouteTable:
    Type: 'AWS::EC2::RouteTable'
    Properties:
      VpcId: !Ref MyVPC

  PublicRoute:
    Type: 'AWS::EC2::Route'
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: '0.0.0.0/0'
      GatewayId: !Ref InternetGateway

  PublicSubnetOneRouteTableAssociation:
    Type: 'AWS::EC2::SubnetRouteTableAssociation'
    Properties:
      SubnetId: !Ref PublicSubnetOne
      RouteTableId: !Ref PublicRouteTable

  PublicSubnetTwoRouteTableAssociation:
    Type: 'AWS::EC2::SubnetRouteTableAssociation'
    Properties:
      SubnetId: !Ref PublicSubnetTwo
      RouteTableId: !Ref PublicRouteTable

  PrivateAppRouteTableOne:
    Type: 'AWS::EC2::RouteTable'
    Properties:
      VpcId: !Ref MyVPC

  PrivateAppRouteTableTwo:
    Type: 'AWS::EC2::RouteTable'
    Properties:
      VpcId: !Ref MyVPC

  PrivateAppRouteOne:
    Type: 'AWS::EC2::Route'
    Properties:
      RouteTableId: !Ref PrivateAppRouteTableOne
      DestinationCidrBlock: '0.0.0.0/0'
      NatGatewayId: !Ref NATGatewayOne

  PrivateAppRouteTwo:
    Type: 'AWS::EC2::Route'
    Properties:
      RouteTableId: !Ref PrivateAppRouteTableTwo
      DestinationCidrBlock: '0.0.0.0/0'
      NatGatewayId: !Ref NATGatewayTwo

  PrivateSubnetAppOneRouteTableAssociation:
    Type: 'AWS::EC2::SubnetRouteTableAssociation'
    Properties:
      SubnetId: !Ref PrivateSubnetAppOne
      RouteTableId: !Ref PrivateAppRouteTableOne

  PrivateSubnetAppTwoRouteTableAssociation:
    Type: 'AWS::EC2::SubnetRouteTableAssociation'
    Properties:
      SubnetId: !Ref PrivateSubnetAppTwo
      RouteTableId: !Ref PrivateAppRouteTableTwo

  PrivateDBRouteTable:
    Type: 'AWS::EC2::RouteTable'
    Properties:
      VpcId: !Ref MyVPC

  PrivateSubnetDBOneRouteTableAssociation:
    Type: 'AWS::EC2::SubnetRouteTableAssociation'
    Properties:
      SubnetId: !Ref PrivateSubnetDBOne
      RouteTableId: !Ref PrivateDBRouteTable

  PrivateSubnetDBTwoRouteTableAssociation:
    Type: 'AWS::EC2::SubnetRouteTableAssociation'
    Properties:
      SubnetId: !Ref PrivateSubnetDBTwo
      RouteTableId: !Ref PrivateDBRouteTable
```

This YAML script creates the intended VPC, two public subnets, an internet gateway, two elastic IP addresses, and two NAT gateways. Here, you also leverage AWS CloudFormation’s capabilities to link resources and manage dependencies explicitly.

### AWS CDK Example

When using the AWS CDK, you define cloud resources in an imperative programming style. It's offers an abstraction over AWS CloudFormation but offers more flexibility by using constructs, which can encapsulate multiple resources into a single logical unit. It also allows you to use of loops, conditionals, and other programming logic to dynamically generate your resources.

When configuration resources like subnets, it is simplified by grouping them under **subnet_configuration** in a VPC construct. This automatically handles subnet associations for you.

Below, you'll use the Python programming language to define the three-tier solution with AWS CDK:

```py
from constructs import Construct
from aws_cdk import (
    Stack,
    aws_ec2 as ec2
)

class MyVpcStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs):
        super().__init__(scope, id, **kwargs)

        # Create a VPC with specific configurations
        vpc = ec2.Vpc(self, "MyVpc",
                      ip_addresses=ec2.IpAddresses.cidr("10.0.0.0/16"),
                      max_azs=2,
                      subnet_configuration=[
                          ec2.SubnetConfiguration(
                              name="PublicSubnet",
                              subnet_type=ec2.SubnetType.PUBLIC,
                              cidr_mask=24
                          ),
                          ec2.SubnetConfiguration(
                              subnet_type=ec2.SubnetType.PRIVATE_WITH_EGRESS,
                              name="PrivateSubnet1",
                              cidr_mask=24
                          ),
                          ec2.SubnetConfiguration(
                              subnet_type=ec2.SubnetType.PRIVATE_ISOLATED,
                              name="PrivateSubnet2",
                              cidr_mask=24
                          )
                      ],
                      nat_gateways=2,  # Number of NAT Gateways
                      )
```

As you can see, this AWS CDK Python script is more concise and allows you to work with a very familiar high-level programming language, which provides powerful abstractions and leverages use of constructs.

### Terraform Example

Terraform’s approach involves defining infrastructure using a declarative configuration language. But it differs from AWS CloudFormation in its approach to managing state and dependencies. It also allows more controlled resource creation, updating, and destruction with constructs like **resource**, **provider** and **variable**.

Here’s how you define the same solution with Terraform:

```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "my_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

# Public Subnets
resource "aws_subnet" "public_subnet_one" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"
}

resource "aws_subnet" "public_subnet_two" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1b"
}

# Private Subnets for Application Tier
resource "aws_subnet" "private_app_subnet_one" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "private_app_subnet_two" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "us-east-1b"
}

# Private Subnets for Database Tier
resource "aws_subnet" "private_db_subnet_one" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.5.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "private_db_subnet_two" {
  vpc_id            = aws_vpc.my_vpc.id
  cidr_block        = "10.0.6.0/24"
  availability_zone = "us-east-1b"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.my_vpc.id
}

resource "aws_nat_gateway" "nat_gateway_one" {
  allocation_id = aws_eip.nat_one.id
  subnet_id     = aws_subnet.public_subnet_one.id
}

resource "aws_nat_gateway" "nat_gateway_two" {
  allocation_id = aws_eip.nat_two.id
  subnet_id     = aws_subnet.public_subnet_two.id
}

resource "aws_eip" "nat_one" {
  domain = "vpc"
}

resource "aws_eip" "nat_two" {
  domain = "vpc"
}

# Public Route Table
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

# Private Route Tables for Application Tier
resource "aws_route_table" "private_app_rt_one" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gateway_one.id
  }
}

resource "aws_route_table" "private_app_rt_two" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gateway_two.id
  }
}

# Private Route Tables for Database Tier
resource "aws_route_table" "private_db_rt" {
  vpc_id = aws_vpc.my_vpc.id
}

# Route Table Associations
resource "aws_route_table_association" "public_subnet_one_association" {
  subnet_id      = aws_subnet.public_subnet_one.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public_subnet_two_association" {
  subnet_id      = aws_subnet.public_subnet_two.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "private_app_subnet_one_association" {
  subnet_id      = aws_subnet.private_app_subnet_one.id
  route_table_id = aws_route_table.private_app_rt_one.id
}

resource "aws_route_table_association" "private_app_subnet_two_association" {
  subnet_id      = aws_subnet.private_app_subnet_two.id
  route_table_id = aws_route_table.private_app_rt_two.id
}

resource "aws_route_table_association" "private_db_subnet_one_association" {
  subnet_id      = aws_subnet.private_db_subnet_one.id
  route_table_id = aws_route_table.private_db_rt.id
}

resource "aws_route_table_association" "private_db_subnet_two_association" {
  subnet_id      = aws_subnet.private_db_subnet_two.id
  route_table_id = aws_route_table.private_db_rt.id
}
```

This script shows how Terraform allows for a modular approach to infrastructure as code, with explicit definitions and dependency management with syntax that is relatively easy to read and write.

---

## Analysis and Comparison

When choosing between AWS CloudFormation, AWS CDK, and Terraform for managing cloud infrastructure, you have consider a number of factors. But in this article, will specifically focus on the **ease of use**, **flexibility**, **scalability**, **language support**, and the **ability to handle complex environments**.

### Ease of Use and Learning Curve

AWS CloudFormation offers a JSON or YAML-based template format. This is straightforward for defining the infrastructure, but can become complex as infrastructure grows. It requires an understanding of specific syntax and AWS resource definitions, which might have a steeper learning curve for those not familiar with JSON or YAML.

AWS CDK uses familiar programming languages like Python, JavaScript, TypeScript and Java. This can make it more accessible for developers already familiar with these languages.

Also, since AWS CDK allows for defining infrastructure through code, it provides more intuitive logic, conditions, and loops, and it abstracts much of the boilerplate needed in AWS CloudFormation. This simplifies the development process.

Terraform uses its own domain-specific language, HashiCorp Configuration Language (HCL), which is designed to be easily readable and writable by humans. While it can be easy to learn, you'll need to be familiar with another new language. However, its declarative nature allows clear definitions of **what** the infrastructure should look like without the need of specifying **how** to achieve it.

### Flexibility and Cloud Provider Support

AWS CloudFormation is tightly integrated with AWS and is updated in tandem with AWS services. But it’s inherently limited to AWS, making it less suitable for the possibilities for hybrid or multi-cloud environments.

AWS CDK also primarily targets AWS services but supports the use of AWS CloudFormation custom resources to manage resources outside of AWS. Still, it doesn’t naturally lend itself to managing multi-cloud resources as directly as Terraform.

Terraform is designed to be cloud-agnostic, supporting multiple providers including AWS, Microsoft Azure, Google Cloud Platform and others. This makes it an ideal choice for complex deployments spanning more than one cloud provider.

### Scalability and Maintainability

AWS CloudFormation templates can become unwieldy and difficult to manage as projects scale. But AWS provides nested stacks as a solution to manage large infrastructures but even with this capability, managing many stacks can become cumbersome track.

AWS CDK provides high-level abstractions and modular constructs, making it easier to manage and scale large infrastructures by breaking them down into smaller, reusable components.

Terraform excels in managing large-scale infrastructures due to its modular approach. By using Terraform modules, you can reuse configurations and ensure consistency across deployments.

### Community Support and Ecosystem

AWS CloudFormation has great adoption and support from AWS with a large user base, but its community contributions are limited to sharing templates.

AWS CDK is open-source and has a growing community, especially among developers preferring to use general-purpose programming languages for infrastructure management. The ecosystem includes a rich set of high-level constructs developed by both AWS and the community.

Terraform benefits from strong community engagement and a vast ecosystem of providers and modules shared publicly in the Terraform Registry. Its wide adoption across different platforms also helps foster a large and active community.

### Code Length and Complexity

AWS CloudFormation scripts tend to be verbose, requiring detailed specifications of every property. This can lead to lengthy and complex templates for larger infrastructures.

AWS CDK scripts are typically shorter and less complex due to the use of programming constructs that abstract away much of the detailed specifications required in AWS CloudFormation.

Terraform configurations strike a balance, being more concise than AWS CloudFormation but typically more verbose than AWS CDK due to its declarative nature, which requires explicit resource and configuration definitions.

---

## Why Choose One Over the Other?

When choosing between AWS CloudFormation, AWS CDK, and Terraform, consider each tools' unique features, operational principles, and your own personal preferences.

Now I'll share recommendations based on this article's information to help you figure out when it’s best to use each of these IaC tools.

- AWS CloudFormation is suitable for when you are looking for stable, native AWS tooling and don’t necessarily need to manage resources outside of AWS. It’s particularly great when compliance with specific AWS configurations is required.
- Choose AWS CDK when you prefer using standard programming languages and enjoy the benefits of object-oriented techniques to create reusable and modular cloud components. It is usually more appealing to developers who want to apply software development best practices to infrastructure provisioning.
- Terraform is the ultimate leader for multi-cloud environments, or if you need a tool that is both powerful and flexible enough to manage complex architectures. It is also the right choice if you anticipate integrating a variety of cloud services and need a unified approach to manage them.

Though these recommendations are based on the special makeup of each of these IaC tools, I advise you to gain some experience with each tool, so you can decide on the one that best aligns with the specific skills and needs of your team and projects.

If you’ve got this far, **thanks so much for reading!** I hope it was worthwhile to you.

If you want to learn more about me and my story of transitioning from a Pro Athlete to a Cloud Engineer, connect with me [here on LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`ifeanyi-otuonye`)](https://linkedin.com/in/ifeanyi-otuonye/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Choose the Right IaC Tool – AWS CDK, CloudFormation, and Terraform Compared",
  "desc": "Infrastructure as Code (IaC) has become a cornerstone of modern cloud resource management. It enables developers and engineers to manage their cloud resources with the same level of control and precision as application code.  When you're working with...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/comparing-iac-tools-aws-cdk-cloudformation-terraform.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
