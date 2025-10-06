---
lang: en-US
title: "How to Simplify AWS Multi-Account Management with Terraform and GitOps"
description: "Article(s) > How to Simplify AWS Multi-Account Management with Terraform and GitOps"
icon: fa-brands fa-aws
category:
  - DevOps
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - vm
  - aws
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Simplify AWS Multi-Account Management with Terraform and GitOps"
    - property: og:description
      content: "How to Simplify AWS Multi-Account Management with Terraform and GitOps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/simplify-aws-multi-account-management-with-terraform-and-gitops.html
prev: /devops/aws/articles/README.md
date: 2024-11-26
isOriginal: false
author: Nitheesh Poojary
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730239127065/317aa4dd-aba9-4a9e-8abb-7cacfbd0e672.png
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

[[toc]]

---

<SiteInfo
  name="How to Simplify AWS Multi-Account Management with Terraform and GitOps"
  desc="In the past, in the world of cloud computing, a company's journey often began with a single AWS account. In this unified space, development and testing environments coexisted, while the production environment lived in a separate account. This arrange..."
  url="https://freecodecamp.org/news/simplify-aws-multi-account-management-with-terraform-and-gitops"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730239127065/317aa4dd-aba9-4a9e-8abb-7cacfbd0e672.png"/>

In the past, in the world of cloud computing, a company's journey often began with a single AWS account. In this unified space, development and testing environments coexisted, while the production environment lived in a separate account.

This arrangement might work well in early days, but as a company grows and their needs become more specialized, the simplicity of a single account might start to show its limitations. The demand for dedicated environments will start to increase, and soon, that company may need to create new AWS accounts for specific functions like security, DevOps, and billing.

With each new account, the complexity of managing security policies and logging across the entire infrastructure grows exponentially. The cloud architects for these companies will then realize that they need a more centralized and streamlined approach to manage this expanding digital presence.

---

## Enter AWS Organizations

AWS Organizations is a service designed to streamline AWS account management. This powerful tool allows you to group multiple AWS accounts under a single umbrella. With AWS Organizations, you can easily create organizational units, apply service control policies, and manage permissions across all accounts. This not only simplifies the process but also enhances security and compliance.

The billing processes of AWS Organizations have also been optimized through the centralization of payments and the generation of comprehensive expense reports for each account. This improved clarity in financial management makes it easier for companies to allocate resources in a more efficient manner and strategize for future expansion.

AWS Organizations can help your team consistently enforce security policies, enable logging across all accounts, and streamline administrative tasks. Cloud infrastructure is now a well-organized, secure, and efficient machine, ready to support a company's ambitions for years to come.

In this article, we’ll discuss what it means to have a multi-account setup and how it works. I’ll walk you through everything from the deployment architecture to creating an Organizational Unit and beyond.

---

## Components of Multi-Account Setup

First, let's take a detailed look at the various components that make up an AWS multi-account strategy:

- **AWS Control Tower**
- **Landing zone**
- **AWS OU**
- **AWS SSO**
- **Control Tower Controls**
- **Service control policies (SCPs)**

### What is AWS Control Tower?

AWS Control Tower is a comprehensive service that enables you to set up and manage a multi-account AWS environment efficiently. It’s designed based on best practices from AWS experts and adheres to industry standards and requirements.

By using AWS Control Tower, you can ensure that your AWS environment is secure, compliant, and well-organized, facilitating easier management and scalability.

::: info Features of AWS Control Tower

- Cloud IT can be confident that all accounts are in line with company-wide regulations, and distributed teams may create new AWS accounts quickly.
- You can enforce best practices, standards, and regulatory requirements with preconfigured controls.
- You can automate your AWS environment setup with best-practice blueprints. These blueprints cover various aspects such as multi-account structure, identity and access management, as well as account provisioning workflow.
- It lets you govern new or existing account configurations, gain visibility into compliance status, and enforce controls at scale.

:::

### What is a Landing Zone in AWS?

A landing zone helps you quickly set up a cloud environment using automation, including preconfigured settings that follow industry best practices for ensuring the security of your AWS accounts.

The starting point serves as a foundation for your company to efficiently initiate and implement workloads and applications, ensuring a secure and reliable infrastructure environment.

There are two choices for creating a landing zone. First, you can use the AWS Control Tower dashboard. Second, you can build a custom landing zone. If you are new to AWS, I recommend using AWS Control Tower to create a landing zone.

![AWS Landing Zone](https://cdn.hashnode.com/res/hashnode/image/upload/v1732137800622/f72dbf02-fa34-4004-999d-71a2af33f90b.png)

If you opt for creating a landing zone via the Control Tower dashboard, the following will be implemented in your landing zone:

- A multi-account environment with AWS organizations.
- Identity management through the default directory in AWS IAM Identity Center.
- Federated access to accounts using IAM Identity Center.
- Centralized logging from AWS CloudTrail and AWS Config stored in Amazon Simple Storage Service (Amazon S3).
- Enabled cross-account [<FontIcon icon="fa-brands fa-aws"/>security audits](https://docs.aws.amazon.com/general/latest/gr/aws-security-audit-guide.html) using IAM Identity Center.

### What is an AWS Organizational Unit?

Using multiple accounts allows you to better support your security goals and company operations.

AWS Organizations enables policy-based management of multiple AWS accounts. When you create new accounts, you can arrange them in organizational units (OUs), which are groupings of accounts that provide the same application or service.

![AWS Organizational Units](https://cdn.hashnode.com/res/hashnode/image/upload/v1732137833615/6eebb3ab-94d0-4286-8dc4-9d3ae297e186.png)

::: info Advantages of Using OUs

- Accounts are units of security protection. Potential hazards and security threats can be contained within one account without affecting others.
- Teams have different assignments and resource needs. Setting up different accounts prevents teams from interfering with one another, as they might do if they used the same account.
- Isolating data stores to an account reduces the number of people who have access to and can manage the data store.
- The multi-account concept allows you to generate separate billable items for business divisions, functional teams, or individual users.
- AWS quotas are set up per account. Separating workloads into different accounts gives each account an individual quota.

:::

### What is AWS IAM Identity Center?

The AWS IAM Identity Center provides a centralized solution for managing access to multiple AWS accounts and business applications.

![AWS identity center](https://cdn.hashnode.com/res/hashnode/image/upload/v1732137875918/349673f8-1a09-4bcc-b1db-6a898d3d06b5.png)

This method offers a single sign-on feature that allows employees to access all assigned accounts and applications from a single credential.

The personalized web user portal provides a centralized view of the user's assigned roles in AWS accounts.

For a uniformed authentication experience, users can sign in using the AWS Command Line Interface, AWS SDKs, or the AWS Console Mobile Application with their directory credentials.

You can also set up and oversee user IDs in IAM Identity Center's identity store, or you can connect to your existing identity provider, such as Microsoft Active Directory, Okta, and so on.

### Control Tower Controls (Guardrails)

Controls are predefined governance rules for security, operations, and compliance. You can select and apply them enterprise-wide or to specific groups of accounts.

![ControlTowerControls](https://cdn.hashnode.com/res/hashnode/image/upload/v1732137911519/5dac3db6-15e6-476b-9b50-a1597a02fe84.png)

Controls can be detective, preventive, or proactive and can be either mandatory or optional.

- First, we have detective controls (for example, detecting whether public read access to Amazon S3 buckets is allowed).
- Next, preventive controls establish intent and prevent deployment of resources that don’t conform to your policies (for example, enabling AWS CloudTrail in all accounts).
- Finally, proactive control capabilities use [AWS CloudFormation Hooks](https://aws.amazon.com/blogs/mt/proactively-keep-resources-secure-and-compliant-with-aws-cloudformation-hooks/) to proactively identify and block the CloudFormation deployment of resources that are not compliant with the controls you have enabled. For example, developers cannot create S3 buckets that are capable of storing data in an unencrypted state at rest.

### Service Control Policies (SCP)

SCPs are a feature of the organization that allows you to set the maximum permissions for member accounts within the organization.

![Service Control Policies](https://cdn.hashnode.com/res/hashnode/image/upload/v1732137972306/80d0782c-0801-4548-9c0c-d4a11d43ecbe.png)

There are many functions and features of an SCP:

- If an SCP denies an action on an account, no entity in the account can perform that action, even if its IAM permissions allow it.
- Prevents stopping or deletion of CloudTrail logging.
- Prevents deletion of VPC flow logs.
- Prohibits AWS accounts from leaving the organization.
- Prevents AWS GuardDuty changes.
- Prevents resource sharing using AWS Resource Access Manager (RAM) either externally or across environments.
- Prevents disabling the default Amazon EBS encryption.
- Prevents Amazon S3 unencrypted object uploads.
- And prevents IAM users and roles in the affected accounts from creating certain resource types if the request doesn't include the specified tags.

---

## How to Automate a Multi-Account Strategy

Now that you’re familiar with the key concepts of a Multi-Account Strategy in AWS, let’s dive deeper into the practical parts.

In the coming subsections, we’ll cover how you can set up an AWS Control Tower, create a landing zone, and automatically create organizational units (OUs). I’ll also walk you through how to configure Control Tower controls—often known as guardrails—to uphold security, compliance, and governance over your AWS environment.

Once we finish this deployment, we will have a solution that includes the following components:

- Creates an AWS Organizations OU named Core within the organizational root structure.
- Creates and adds two shared accounts to the Security OU: the Log Archive account and the Audit account.
- Creates a cloud-native directory in IAM Identity Center, with ready-made groups and single sign-on access.
- Applies all required preventive controls to enforce policies.
- Applies required detective controls to identify configuration violations.

---

## AWS Organization Structure

We will create and implement the following organizational structure. You can add or modify OUs as per your requirements.

![AWS Organization Structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1732138006995/423e54cd-bf74-4aef-a2a3-d52294482ca0.png)

---

## Deployment Architecture

I will be using Terraform Cloud and GitHub Actions for automating the entire process. This architecture applies to all three components, including core accounts, landing zones, and organizational unit (OU) creation and controls.

![Deployment Architecture](https://cdn.hashnode.com/res/hashnode/image/upload/v1732138041912/0cba5af0-69ea-4ae9-986e-c1608d3d5c21.avif)

### Overview of CI/CD Components

#### 1. GitHub Actions

GitHub Actions is a CI/CD platform that lets you automate your build, test, and deployment pipeline. You can create workflows that automatically build and test every pull request to your repository, ensuring code changes are verified before merging.

GitHub Actions also lets you deploy merged pull requests to production, streamlining the release process and reducing errors.

Using GitHub Actions enhances your development workflow, improves code quality, and speeds up the delivery of new features and updates.

#### 2. Terraform Cloud

Terraform Cloud is a platform by HashiCorp for managing and executing your Terraform code. It offers tools and features that enhance collaboration between developers and DevOps engineers, making teamwork more efficient.

With Terraform Cloud, you can simplify and streamline your workflow, making it easier to handle complex infrastructure tasks and deployments. The platform also provides strong security features to protect your code and infrastructure, keeping your product secure throughout its lifecycle.

### CI/CD Deployment Process Explained

DevOps engineers are responsible for writing the Terraform code and then creating a pull request. I have added several test cases for my Terraform code in the `terraform-plan.yml` file, which runs only on the feature branch.

- **Check environment variables:** Ensures all required environment variables are set.
- **Checkout Code:** Uses the `actions/checkout` action to check out the repository.
- **Verify Checkout:** Verifies that the checkout was successful.
- **Validation:** Verifies the Terraform code for any syntax errors. Pull requests contain proposed changes in code, allowing team members to review and merge them into the master branch. Once pull requests are merged with the master branch, all test cases are rerun, and the landing zone is created through Terraform Cloud

---

## What to Know Before Setting up Control Tower

Before beginning the process of setting up for AWS Control Tower, it is important to have a clear understanding of what limitations are associated with Control Tower and consider some key points.

- When setting up a landing zone, it is important to choose your home region. Once you have made a selection, you won’t be able to change your home region.
- If you intend to establish a control tower on an existing AWS account that is already a part of an existing organizational unit (OU), you won’t be able to use it. In order to proceed, you’ll need to create a new AWS account that is not associated with any organizational Unit (OU).
- As part of the Control Tower creation process, you’ll need to create mandatory accounts such as the Log Archive Account and Audit Accounts. Account-specific emails are required.
- In order to set up the Landing Zone in the Management Account, it is essential to ensure that you have subscribed to the following services in the management account:
  - S3, EC2, SNS, VPC, CloudFormation, CloudTrail, CloudWatch, AWS Config, IAM, AWS Lambda
- The AWS Control Tower baseline covers only a few services with limited customization options: IAM Identity Center, CloudTrail, Config, some configuration rules, and some SCPs in AWS Organizations.
- Implementing IAM Identity Center is limited to the management account of an organization.
- AWS Control Tower implements concurrency limitations, allowing only one operation to be performed at a time.
- Note that certain AWS Regions do not support the operation of some controls in AWS Control Tower. This is because the specified Regions lack the necessary underlying functionality to support the required operations.

### How to Create a Control Tower

Creating a Control Tower means setting up a landing zone. AWS landing zone requires creating two new member accounts: the Audit account and the Log Archive account. You will need two unique email addresses for these accounts.

We will manage this process using Terraform modules. To keep things simple and clear, we will divide the project into several modules. One module will create the two core accounts. Another module will handle the setup of the landing zone. The final module will create Organizational Units (OUs) and apply Control Tower controls to ensure governance and compliance.

---

## How to Automate Landing Zone Creation

When you run this code, the Core OU and two accounts are created under the Core OU. I have mentioned two repositories for each component: one for deploying the AWS resources like the landing zone, OU, and Control Tower Controls and another for the Terraform module.

A *Terraform module* is a set of standard configuration files in a specific directory. Terraform modules group resources for a specific task, which reduces the amount of code needed for similar infrastructure components.

I have imported both the core account creation and landing zone creation modules into the same [<FontIcon icon="iconfont icon-terraform"/>`main.tf` (<FontIcon icon="iconfont icon-github"/>`nitheeshp-irl/aws-landing-zone`)](https://github.com/nitheeshp-irl/aws-landing-zone/blob/main/main.tf) file. This is necessary because the landing zone creation depends on the core account module. Including them together ensures all dependencies are managed properly and the deployment process is efficient.

This method also simplifies the project structure and helps avoid potential issues from managing these components separately.

The AWS Control Tower [<FontIcon icon="fa-brands fa-aws"/>`CreateLandingZone`](https://docs.aws.amazon.com/controltower/latest/APIReference/API_CreateLandingZone.html) API needs a landing zone version and a manifest file as input parameters. Below is an example <FontIcon icon="iconfont icon-json"/>`LandingZoneManifest.json` manifest.

```json title="LandingZoneManifest.json"
{
   "governedRegions": ["us-west-2","us-west-1"],
   "organizationStructure": {
       "security": {
           "name": "CORE"
       },
       "sandbox": {
           "name": "Sandbox"
       }
   },
   "centralizedLogging": {
        "accountId": "222222222222",
        "configurations": {
            "loggingBucket": {
                "retentionDays": 60
            },
            "accessLoggingBucket": {
                "retentionDays": 60
            },
            "kmsKeyArn": "arn:aws:kms:us-west-1:123456789123:key/e84XXXXX-6bXX-49XX-9eXX-ecfXXXXXXXXX"
        },
        "enabled": true
   },
   "securityRoles": {
        "accountId": "333333333333"
   },
   "accessManagement": {
        "enabled": true
   }
}
```

This module sets up the AWS landing zone using `landingzone_manifest_template`. The landing zone version and admin account ID are given through variables. This module also creates several IAM roles required for the landing zone setup.

I defined a local variable `landingzone_manifest_template`, which is a JSON template for setting up the landing zone. This JSON template has several important settings:

```tf
provider "aws" {
  region = var.region
}

locals {
  landingzone_manifest_template = <<EOF
{
    "governedRegions": ${jsonencode(var.governed_regions)},
    "organizationStructure": {
        "security": {
            "name": "Core"
        }
    },
    "centralizedLogging": {
         "accountId": "${module.aws_core_accounts.log_account_id}",
         "configurations": {
             "loggingBucket": {
                 "retentionDays": ${var.retention_days}
             },
             "accessLoggingBucket": {
                 "retentionDays": ${var.retention_days}
             }
         },
         "enabled": true
    },
    "securityRoles": {
         "accountId": "${module.aws_core_accounts.security_account_id}"
    },
    "accessManagement": {
         "enabled": true
    }
}
EOF
}

module "aws_core_accounts" {
  source = "https://github.com/nitheeshp-irl/terraform_modules/aws_core_accounts_module"

  logging_account_email  = var.logging_account_email
  logging_account_name   = var.logging_account_name
  security_account_email = var.security_account_email
  security_account_name  = var.security_account_name
}

module "aws_landingzone" {
  source                  = "https://github.com/nitheeshp-irl/blog_terraform_modules/aws_landingzone_module"
  manifest_json           = local.landingzone_manifest_template
  landingzone_version     = var.landingzone_version
  administrator_account_id = var.administrator_account_id
}
```

- **Governed Regions**: Specifies the regions governed by the landing zone.
- **Organization Structure**: Defines the security structure with a dedicated security account.
- **Centralized Logging**: Configures logging, specifying the account ID and retention policies for logs.
- **Security Roles**: Specifies the account ID for security roles.
- **Access Management**: Enables access management.
- **Core Accounts**: The core accounts code, also defined in the same file, is what sets up essential AWS accounts for logging and security.

::: note

You can find the full code here: [<FontIcon icon="iconfont icon-github"/>`nitheeshp-irl/aws-landing-zone`](https://github.com/nitheeshp-irl/aws-landing-zone).

<SiteInfo
  name="nitheeshp-irl/aws-landing-zone"
  desc="Repository for creating AWS Landing Zone."
  url="https://github.com/nitheeshp-irl/aws-landing-zone/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/d08c2c58c274fbcbd0d8b8b820a354873f04f2a355379928da77c1a84e97fe05/nitheeshp-irl/aws-landing-zone"/>

:::

---

## How to Create an Organizational Unit

When you run this code, different organizational units (OUs) are created according to the specifications in the [variable (<FontIcon icon="iconfont icon-github"/>`github.com/nitheeshp-irl/aws-orgunits`)](https://github.com/nitheeshp-irl/aws-orgunits/blob/main/variables.auto.tfvars) file.

Once the landing zone setup is finished, we can create an OU as per our business requirements. This will take the OU name from the variable file and create the OU.

```tfvars title="variables.auto.tfvars"
aws_region = "us-east-2"

organizational_units = [
  {
    unit_name = "apps"
  },
  {
    unit_name = "infra"
  },
  {
    unit_name = "stagingpolicy"
  },
  {
    unit_name = "sandbox"
  },
  {
    unit_name = "security"
  }
]
```

You can see the code here:

<SiteInfo
  name="nitheeshp-irl/aws-orgunits: Repository for creating AWS Organization"
  desc="Repository for creating AWS Organization."
  url="https://github.com/nitheeshp-irl/aws-orgunits/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/36258278cef24f9db19d2e1b80d01c63dd8bf4e674915a5d3e5b316b3295589d/nitheeshp-irl/aws-orgunits"/>

<SiteInfo
  name="nitheeshp-irl/blog-terraform-modules: Module Repo for terraform modules"
  desc="Module Repo for terraform modules."
  url="https://github.com/nitheeshp-irl/blog-terraform-modules/tree/main/aws_org_module"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4e05587d7f541a4ec430b6de6b5b9c843ac912cef33ff554f5cd273075aee6c6/nitheeshp-irl/blog-terraform-modules"/>

---

## How to Automate Attaching Control Tower Control to the OU

Once you have created the OU units using the above repository, this repository will apply Control Tower controls to the OUs.

After creating the required objects, you can attach controls to the OU if you need them. Here is the [<FontIcon icon="iconfont icon-terraform"/>`main.tf`](https://github.com/nitheeshp-irl/controltower_controls/blob/main/main.tf) file:

```tf title="main.tf"
provider "aws" {
  region = var.region
}

module "aws_controls" {
  source = "https://github.com/nitheeshp-irl/blog_terraform_modules/awscontroltower-controls_module"

  aws_region = var.aws_region
  controls   = var.controls
}
```

We used Terraform modules to create AWS resources.

Here are the control variables:

```tf
aws_region = "us-east-2"

controls = [
  {
    control_names = [
      "AWS-GR_ENCRYPTED_VOLUMES",
      "AWS-GR_EBS_OPTIMIZED_INSTANCE",
      "AWS-GR_EC2_VOLUME_INUSE_CHECK",
      "AWS-GR_RDS_INSTANCE_PUBLIC_ACCESS_CHECK",
      "AWS-GR_RDS_SNAPSHOTS_PUBLIC_PROHIBITED",
      "AWS-GR_RDS_STORAGE_ENCRYPTED",
      "AWS-GR_RESTRICTED_COMMON_PORTS",
      "AWS-GR_RESTRICTED_SSH",
      "AWS-GR_RESTRICT_ROOT_USER",
      "AWS-GR_RESTRICT_ROOT_USER_ACCESS_KEYS",
      "AWS-GR_ROOT_ACCOUNT_MFA_ENABLED",
      "AWS-GR_S3_BUCKET_PUBLIC_READ_PROHIBITED",
      "AWS-GR_S3_BUCKET_PUBLIC_WRITE_PROHIBITED",
    ],
    organizational_unit_names = ["infra", "apps"]
  }
]
```

You can see the code here:

<SiteInfo
  name="nitheeshp-irl/controltower_controls"
  desc="Repository for applying control tower controls."
  url="https://github.com/nitheeshp-irl/controltower_controls/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/1e19a07ddd9f4018b1d7ce634d4ac4490d824d33cac6d7d726bfce1daadb6305/nitheeshp-irl/controltower_controls"/>

<SiteInfo
  name="nitheeshp-irl/blog-terraform-modules"
  desc="Repository for applying control tower controls."
  url="https://github.com/nitheeshp-irl/blog-terraform-modules/tree/main/awscontroltower-controls_module"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/1e19a07ddd9f4018b1d7ce634d4ac4490d824d33cac6d7d726bfce1daadb6305/nitheeshp-irl/controltower_controls"/>

---

## Conclusion

Navigating a multi-account strategy in AWS can be challenging, but with AWS Control Tower and a structured approach, it becomes manageable.

Using AWS Control Tower, your team can ensure that their AWS environments are secure, compliant, and well-organized. The automated setup, governance at scale, and centralized management through AWS Organizations provide a strong foundation for cloud infrastructure.

Implementing a landing zone through AWS Control Tower offers a secure and standardized starting point, allowing for quicker deployment and better governance. Using organizational units (OUs) segregates accounts based on business needs, improving security and operational efficiency. AWS IAM Identity Center simplifies access management, providing a unified authentication experience across multiple accounts and applications.

Service Control Policies (SCPs) help keep things secure and compliant by making sure all resources follow the organization's rules. Terraform Cloud and GitHub Actions make it easier to deploy resources, offering a smooth CI/CD pipeline for managing infrastructure changes.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Simplify AWS Multi-Account Management with Terraform and GitOps",
  "desc": "In the past, in the world of cloud computing, a company's journey often began with a single AWS account. In this unified space, development and testing environments coexisted, while the production environment lived in a separate account. This arrange...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/simplify-aws-multi-account-management-with-terraform-and-gitops.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
