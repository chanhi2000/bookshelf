---
lang: en-US
title: "How Enterprise Teams Manage Infrastructure at Scale with Terraform"
description: "Article(s) > How Enterprise Teams Manage Infrastructure at Scale with Terraform"
icon: iconfont icon-terrafrom
category:
  - DevOps
  - Amazon
  - AWS
  - Terraform
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - tf
  - terraform
  - hcl
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Enterprise Teams Manage Infrastructure at Scale with Terraform"
    - property: og:description
      content: "How Enterprise Teams Manage Infrastructure at Scale with Terraform"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-enterprise-teams-manage-infrastructure-at-scale-with-terraform.html
prev: /devops/terraform/articles/README.md
date: 2026-06-24
isOriginal: false
author:
  - name: Osomudeya Zudonu
    url: https://freecodecamp.org/news/author/Osomudeya/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fb89a3e9-6826-4fc9-bebb-d16ef6a6d31d.png
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
  "title": "Terraform > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/terraform/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Enterprise Teams Manage Infrastructure at Scale with Terraform"
  desc="Tutorials teach you how to write Terraform, but don't teach you what happens when 60 engineers start writing it together. When you learn Terraform, you work with a single repository, state file, and a"
  url="https://freecodecamp.org/news/how-enterprise-teams-manage-infrastructure-at-scale-with-terraform"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fb89a3e9-6826-4fc9-bebb-d16ef6a6d31d.png"/>

Tutorials teach you how to write Terraform, but don't teach you what happens when 60 engineers start writing it together.

When you learn Terraform, you work with a single repository, state file, and a single environment. You run `terraform apply` from your laptop, and your infrastructure is provisioned.

That model works fine until the day you join a company and realize engineers rarely apply to production from a laptop.  
A lot of what you see will not match what you practiced.

This article explains how large engineering teams actually run Terraform, the repositories, workflows, ownership rules, and what goes wrong without them.

You'll learn how enterprise teams structure repositories and state files, how they store and version reusable modules through GitHub, why infrastructure changes move to production through pipelines, how they catch changes that happen outside of Terraform, and how they recover when things go wrong.

Every practice here exists because a team hit a specific wall and built something to get past it.

::: note Prerequisites

You should be comfortable with Terraform before reading this.  
You should also know how Git pull requests and branch merging work.

This is not a Terraform introduction, it is about what happens after you have learned the basics and start sharing infrastructure with other engineers.

:::

---

## How State Corruption Happens

The state file is how Terraform tracks what it has built. It remembers every resource, every ID, and every configuration value. When it gets out of sync with what actually exists in the cloud, that's state corruption.

It gets blamed for a lot of things. But engineers who have dealt with it in production know it usually traces back to one of a handful of situations, each with a different cause and a different fix.

### Two Engineers Run `terraform apply` at the Same Time

Before understanding this one, you need to understand something about how Terraform works.

When you run `terraform apply`, two things happen separately:

![When you run terraform apply, two things happen separately. Step 1: Terraform tells AWS to create the subnet and AWS creates it in the cloud. Step 2: Terraform updates the state file to record that the subnet now exists. AWS holds the real infrastructure. The state file is Terraform's notebook about it. They are separate and can get out of sync.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/1fdf9458-9c60-4b65-8bd7-2126b8d47065.png)

First, Terraform talks to AWS, and the resource gets created in the cloud. Second, Terraform updates the state file to record what was just built.

These are two different systems. AWS holds the real infrastructure, and the state file is Terraform's notebook about it. If anything interrupts the process between step one and step two, they fall out of sync.

Now here's what happens when two engineers apply at the same time without locking:

![Diagram showing Sarah and Marcus both open the same Terraform state file at the same time. Sarah reads the state, adds a subnet, and saves. Marcus reads the same original state, updates the NAT gateway, and saves last. His save overwrites Sarah's. The final state file contains the NAT gateway update but the subnet record is gone, even though the subnet still exists in AWS. Caption: Two people. Same state file. Different changes. Last write wins. Terraform state file simultaneously, causing one engineer's changes to overwrite the other's.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/724c562a-ef35-42e5-a9f2-4683f8acef31.png)

Sarah opens the state file and starts adding a subnet. Marcus opens the same state file at the same moment and starts updating a NAT gateway. Both are working from the same starting copy.

Sarah finishes first. Her apply creates the subnet in AWS and updates the state file to record it.

Marcus finishes second. His apply updates the NAT gateway in AWS. Terraform then updates the state file using the version of state Marcus read when his apply started.

That version didn't include Sarah's subnet, so the updated state no longer contains a record of it.

![comparison showing AWS contains both the subnet and NAT gateway update, while Terraform's state file is missing the subnet record](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/07d237af-96dd-450c-8284-7b2be89b2a41.png)

The subnet exists in AWS. But Terraform's notebook no longer has a record of it. The next `terraform plan` thinks the subnet was never created and proposes building it again.

State locking prevents this. Sarah's apply acquires a lock before it starts. When Marcus tries to apply, Terraform makes him wait.

After Sarah finishes, Terraform updates the state file and releases the lock. Marcus then runs against the updated state, so both the subnet and NAT gateway changes are recorded correctly.

### An Apply Gets Interrupted

A GitHub Actions pipeline is applying changes to the payments infrastructure, adding three new security group rules and a database parameter group. Halfway through, the pipeline runner hits its 60-minute timeout limit, and the job gets killed.

Here's what the apply actually managed to do before dying:

![A terminal showing terraform apply running. Three security group rules are created successfully at 12:00. At 12:00:07, the database parameter group starts creating. At 12:01:30, two errors appear in red: Job exceeded maximum runtime 60m and Runner terminated. A pipeline summary below shows security group rules 1, 2, and 3 as created with green checkmarks, database parameter as not created with a red X, and state file update as never wrote because the job died first, also with a red X.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/40cba2d8-56c4-4b03-bd46-0c33a7b1b7af.png)

The terminal image above shows three security group rules completing successfully before the pipeline hits its 60-minute runtime limit. The runner is then terminated. The database parameter group never finishes creating, and the state file update never runs because the job died first.

```plaintext
Security group rule 1  → created ✓
Security group rule 2  → created ✓
Security group rule 3  → created ✓
Database parameter     → not created ✗
State file update      → never wrote (job died first)
```

The three security group rules now exist in AWS. The problem is that the pipeline died before Terraform could finish updating the state file. AWS knows the rules exist. Terraform's state file does not.

At this point, reality and the state file no longer match.

Fortunately, this is usually easy to recover from. When the pipeline runs again, Terraform checks what already exists in AWS. It sees the three security group rules and doesn't try to create them again. It then creates the database parameter group that never got built.

The second run completes successfully and the state file catches up.

This works because Terraform is idempotent, running the same configuration again moves infrastructure toward the desired state rather than blindly creating everything from scratch.

One small complication remains: the state lock.

If the pipeline was interrupted while holding a lock, Terraform may still think another apply is running. The next pipeline run fails immediately with an error like this:

![terminal image showing terraform apply failing because the previous job left a state lock behind. The error includes the lock ID, the path to the state file, and the name of the process that acquired it. Terraform refuses to proceed until the lock is released or manually cleared.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/cbb56e69-7c40-4e61-8966-4cedbdaf2649.png)

The terminal above shows terraform apply failing because the previous job left a state lock behind. The error includes the lock ID, the path to the state file, and the name of the process that acquired it. Terraform refuses to proceed until the lock is released or manually cleared.

Before clearing the lock, make sure no Terraform apply is still running.

Open your CI/CD system. GitHub Actions, GitLab CI, Jenkins, or whatever your team uses and check the pipeline history for that environment:

![The GitHub Actions pipeline history shows four recent runs. terraform-plan completed successfully. Two terraform-apply jobs show as cancelled and timed out, both flagged as lock may be stale. A fourth terraform-apply job is currently in progress, this one should not be unlocked until it finishes.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/716f6d0c-62d7-4bea-b7f4-ce6cfdda1188.png)

The GitHub Actions pipeline history image above shows four recent runs. terraform-plan completed successfully. Two terraform-apply jobs show as cancelled and timed out, both flagged as lock may be stale. A fourth terraform-apply job is currently in progress, and this one shouldn't be unlocked until it finishes.

If the previous apply was cancelled or timed out, the lock is stale. Clear it with `terraform force-unlock` plus the lock ID from the error. The pipeline then runs normally.

Only force-unlock when you're certain nothing is actively running. Clearing a live lock lets two applies write to the same state at the same time, which is exactly the problem locking was built to prevent.

### Someone Runs a Terraform State Command in the Wrong Environment

A database engineer is cleaning up an old test database in the staging environment.

The database still exists in AWS, but Terraform should stop managing it. To do that, the engineer uses `terraform state rm`.

This command doesn't delete anything in AWS. It only removes Terraform's record of the resource from the state file. Think of it as telling Terraform: *"forget this resource exists, but leave it running."*

The engineer intends to run it against staging:

```plaintext
Intended:  staging state       → forget the old test database
```

But they're working in the wrong directory. They run it against production instead.

```plaintext
Actual:    production state    → forget the live payments database
```

Nothing gets deleted. The production database is still running in AWS. But Terraform has now forgotten it exists.

![Image showing database exists in AWS but is missing from Terraform state.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/5a1dd566-4f38-4ceb-8b41-70bf6ebc69c3.png)

Now Terraform and reality disagree. The next `terraform plan` sees a database defined in the code but missing from the state file, so it assumes the database doesn't exist and proposes creating a new one.

If nobody catches it in the plan output, Terraform creates a second production database alongside the original: two databases running in production, neither fully managed, and a very expensive mess to untangle.

`terraform state rm`, `terraform import`, and `terraform state mv` make immediate changes to the state file with no confirmation prompt. Run them from the wrong directory, the wrong workspace, or with the wrong resource address and you change the wrong state in seconds.

### Two Teams Manage the Same Resource

The networking team owns a security group that controls access to the payments database. When a new microservice needs database access, a payments engineer has two options: ask the networking team to add a new rule, or manage the security group themselves.

They choose the second option. The engineer imports the existing security group into the payments state file and adds a rule for Microservice C.  
From that moment, both teams think they own the same security group.

![Two Terraform state files managing the same security group with different access rules](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/a7780c50-c6c0-49f5-b161-7b4884bc0394.png)

The problem is that Terraform does exactly what each state file tells it to do. The networking state says the security group should allow A and B. The payments state says it should allow A, B, and Microservice C. Both can't be true at the same time.

When the payments team applies their state, Microservice C gets access. But later that night, the networking pipeline runs. Terraform reads the networking state, sees only A and B, and updates the security group to match. Microservice C's rule disappears silently.

![image showing the flow of When the payments team applies their state, Microservice C gets access. But later that night, the networking pipeline runs. Terraform reads the networking state, sees only A and B, and updates the security group to match. Microservice C's rule disappears silently.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/df2c9e46-2d6a-49dc-9f5a-f23a06575452.png)

No errors are seen and both pipelines pass, which is exactly what makes this so hard to debug. Terraform isn't broken, it's receiving conflicting instructions from two different state files and doing exactly what each one says.

This isn't something to be fixed with Terraform commands. It's an ownership decision that should have been made before anyone ran an import. If the payments team had submitted a pull request to the networking repository asking them to add the rule, one team would own the security group, one state file would manage it, and the conflict could never have happened.

---

## Why State File Gets Treated Like a Production Database

The state file looks like bookkeeping: a record of what Terraform created. The reason teams treat it differently is that it often contains secrets.

The state file stores sensitive values in plaintext. Database passwords, API keys, connection strings – if those values were passed to a Terraform resource during an apply, they're now sitting in the state file. Even if you marked the variable as `sensitive` in your Terraform code, the value still lands in the state file. Terraform needs it there to compute diffs on future plans.

That means: **whoever can read the state file can read your database password.**

In large organizations, engineers typically don't have direct access to the production state bucket. Instead, Terraform runs through a CI/CD pipeline that assumes a dedicated IAM role with permission to read and write the state bucket and perform applies. Engineers interact with infrastructure through pull requests and plan output, not by touching the state bucket directly.

This separation reduces risk and creates an audit trail. Every state change is performed by the pipeline and logged, making it straightforward to trace what changed and when.

---

## How Enterprise Teams Structure Their Terraform Repositories

When you join a large engineering organization, the first thing you notice is the number of repositories. You might expect one repository for all infrastructure, but what you find is dozens.

The structure maps directly to ownership. Each repository belongs to one team, and that team is responsible for everything in it. A typical layout looks like this:

![diagram showing how platform, security, and product teams organize Terraform repositories and ownership](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/ca81c9b1-b310-4321-8001-f59ab258c652.png)

The diagram shows two types of repositories. The first type belongs to the platform team and contains reusable modules: things like VPC configurations, database templates, and security group patterns. These repositories don't create production resources directly.

The second type belongs to individual product teams, such as the payments team or the auth team. These repositories call the platform modules and use them to build their actual infrastructure. A mistake in a product team repository affects only that team. A mistake in a shared platform module can affect every team that depends on it.

The key thing to understand here is that the platform team repositories don't create production resources. They create reusable modules that the product teams call when building their actual infrastructure.

That distinction matters because some repositories are used by one team, while others are shared by everyone.

A mistake in a product team's repository usually affects only that team. A mistake in a shared module can affect every team that depends on it.

![diagram showing how bugs in shared Terraform modules affect more teams than bugs in product-specific repositories.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/7fbefdda-c8bb-4e66-a8bc-adc19ae931e7.png)

The diagram illustrates why shared repositories carry more risk than product-specific ones. A bug in the `payments-infra` repository affects only the payments team. A bug in the `terraform-aws-postgres` module affects every team that uses it to provision databases. A bug in the `terraform-policies` repository affects every pipeline in the company. The wider the module is shared, the larger the blast radius when something goes wrong.

This is why experienced engineers pay close attention to shared modules and policy repositories.

If the payments team's infrastructure breaks, the problem is probably in the payments repository.

If five different teams start seeing the same issue at the same time, the shared modules and policy repositories become the first place to investigate.

---

## How Teams Split State Files to Protect Each Other

A single state file managing everything, VPC, Kubernetes cluster, databases, monitoring, is fine when one person is running things, but quickly becomes a problem when multiple teams share it.

Three specific problems emerge.

1. **Blast radius:** If the networking configuration and the database configuration live in the same state file, a bad networking apply can accidentally affect database resources that had nothing to do with the change. Separate state files keep failures contained.
2. **Deployment speed:** Networking infrastructure might change a few times a year. Applications might deploy dozens of times a day. If they share a state file, teams end up waiting on each other's locks.
3. **Ownership conflicts:** When multiple teams share a state file, one team can change something the other team depends on without realizing it.

The solution is to split state along ownership boundaries. A structure that addresses all three problems looks like this:

![5abbcdbd-af2b-42b7-8dce-00389dbb91eb](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/5abbcdbd-af2b-42b7-8dce-00389dbb91eb.png)

The structure image above shows one state file per domain under a production folder.

- networking handles VPC, subnets, routing, and NAT gateways.
- identity handles IAM roles, policies, and service accounts.
- platform handles the Kubernetes cluster, node pools, and add-ons.
- database handles RDS instances, Redis clusters, and backups.
- security handles security groups, WAF rules, and certificates.
- monitoring handles Prometheus, Grafana, and alerting pipelines.
- payments handles payment service infrastructure.

```plaintext
production/
  networking/terraform.tfstate   → VPC, subnets, routing, NAT gateways
  identity/terraform.tfstate     → IAM roles, policies, service accounts
  platform/terraform.tfstate     → Kubernetes cluster, node pools, add-ons
  database/terraform.tfstate     → RDS instances, Redis clusters, backups
  security/terraform.tfstate     → Security groups, WAF rules, certificates
  monitoring/terraform.tfstate   → Prometheus, Grafana, alerting pipelines
  payments/terraform.tfstate     → Payment service infrastructure
```

This is one example, not a universal standard. Larger organizations often split further. The principle is the same: one owning team per state file, one pipeline, one blast radius.

The rule is simple: every resource belongs to one state file. If the networking team owns a security group, it stays in the networking state. Other teams can reference it as a data source, but they don't import it into their own state.  
That is what prevents the ownership collision described in the first section.

---

## Why Some Teams Prefer Directories Over Workspaces for Production

Terraform CLI workspaces let you manage multiple environments like dev, staging, and production from a single directory. Each workspace gets its own state file, but they all share the same `.tf` configuration files.

```plaintext
infra/
  main.tf          ← same code runs for ALL environments
  variables.tf

  terraform.tfstate.d/
    dev/
    staging/
    production/    ← separate state, same code
```

![The workspace approach keeps all environments in one directory called infra. It contains a single main.tf file that runs for all environments. State is stored separately under terraform.tfstate.d with folders for dev, staging, and production, but all three share the same code.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/4461ccbb-3d64-45d2-af7b-143a778b5649.png)

The workspace approach keeps all environments in one directory called infra. It contains a single main.tf file that runs for all environments. State is stored separately under terraform.tfstate.d with folders for dev, staging, and production, but all three share the same code.

You switch environments with `terraform workspace select production`, then apply.

The risk is that switching workspaces is a manual step. If the wrong workspace is active, changes meant for staging can end up in production.

Many teams prefer separate directories for long-lived environments:

```plaintext
environments/
  dev/
    main.tf      ← its own code path
    backend.tf   ← points to the dev state bucket
  staging/
    main.tf      ← its own code path
    backend.tf   ← points to the staging state bucket
  production/
    main.tf      ← its own code path
    backend.tf   ← points to the production state bucket
```

![project structure showing separate Terraform directories for dev, staging, and production environments.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/83604abf-302c-400e-a322-f53e7d0b7d56.png)

The directory approach gives each environment its own folder under environments. Dev, staging, and production each have their own main.tf with a separate code path, and their own backend.tf pointing to a different state bucket. The environments are completely separate from each other.

To apply against production, you have to be in the production directory. Each environment has its own state, backend, and execution path.

The tradeoff is duplication. Teams usually solve that with shared modules, so each environment directory contains only environment-specific configuration.

Workspaces are still useful for short-lived environments such as feature branches, preview deployments, and temporary test infrastructure.

---

## How Teams Share Infrastructure Through Modules on GitHub

When 30 teams each need a PostgreSQL database, two things happen.

**Without a shared standard**, every team writes their own database configuration. Six months later, a security audit runs across all environments and finds that:

![Diagram showing four teams and their database misconfigurations: Team A with no backups, Team B with unencrypted storage, Team C with no tags, Team D with deletion protection disabled.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/392e5cee-408e-49d5-9cc5-5a53f3537562.png)

The diagram shows what a security audit found when four teams each wrote their own database configuration independently.

Team A set `backup_retention_period = 0`, meaning their database was never backed up. Team B set `storage_encrypted = false`, leaving data in plaintext. Team C passed an empty `tags = {}`, so there was no cost tracking. Team D set `deletion_protection = false`, leaving the database one accident away from permanent data loss.

Nobody skipped those things on purpose, there was just no shared standard.

**With a shared module**, the platform team writes a `postgres` module once. They encode every organizational requirement into it: encryption on, 7-day backups, monitoring alarms, required tags, deletion protection enabled. They publish it to a GitHub repository called `terraform-aws-postgres`.

Every team that needs a database now writes this:

```hcl
module "payments_db" {
  source         = "git::ssh://github.company.com/platform/terraform-aws-postgres.git?ref=v2.1.0"
  name           = "payments"
  environment    = "production"
  instance_class = "db.m5.large"
}
```

Four inputs. Everything else is handled by the module.

Large organizations usually expose approved modules through an internal registry so engineers can discover and version them without browsing GitHub repositories. Instead of the full Git URL, the reference becomes:

```hcl
module "payments_db" {
  source  = "app.terraform.io/mycompany/postgres/aws"
  version = "~> 2.1"
}
```

HCP Terraform and Terraform Enterprise both include a private registry that connects to GitHub, watches for version tags on module repositories, and publishes new versions automatically.

---

## How Teams Version and Release Terraform Modules

The `?ref=v2.1.0` in a module source URL isn't decoration. At the scale of 40 teams sharing one module, it's the thing that prevents a well-intentioned change from becoming a company-wide incident.

Without version pinning, the payments team references the Postgres module from `main` meaning whatever the latest code is at any given moment. The module owners rename an output variable from `db_endpoint` to `database_endpoint` to match a new naming convention. The next time any team runs `terraform init`, they pull that change. Their configuration still references `db_endpoint`.

Plans break:

```plaintext
payments-infra                        → plan fails
analytics-infra                       → plan fails
auth-infra                            → plan fails
reporting-infra                       → plan fails
```

Version pinning prevents this. The payments team stays on `v2.1.0`. The module owners release `v2.2.0` with the renamed output and write a changelog. Teams upgrade when they're ready, after testing in staging. Nobody's pipeline breaks without warning.

The versioning convention is called semantic versioning:

```plaintext
v2.1.1  → patch:  bug fix. Safe to upgrade. Nothing to change in your code.
v2.2.0  → minor:  new optional feature. Safe to upgrade. Nothing to change.
v3.0.0  → major:  breaking change. Read the changelog. Update your code first.
```

![image of module semantic versioning](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/e23a58d7-0f3b-4f12-921e-1128f33d6c40.png)

The table shows three version types. A patch version like v2.1.1 means a bug fix, safe to upgrade with nothing to change in your code. A minor version like v2.2.0 means a new optional feature, also safe to upgrade with nothing to change. A major version like v3.0.0 means a breaking change, so you need to read the changelog and update your code before upgrading.

---

## How Teams Maintain Terraform Modules at Scale

Building a Terraform module takes an afternoon, bit maintaining it for two years is a different job entirely.

A networking engineer needs a VPC module. The platform team has one, but their backlog is full. So the engineer creates a slightly different version. Three months later, another team does the same. Then another. Now this exists:

```plaintext
terraform-aws-vpc           ← original, maintained by platform team
terraform-aws-vpc-v2        ← created by the app team, author unknown
terraform-aws-vpc-shared    ← no idea which environments use this
terraform-aws-vpc-prod      ← unclear if this was ever different from the original
```

No one created a module graveyard on purpose. It grew one *"I'll just make a quick variation"* at a time. Each variant has slightly different security settings, different tagging, different defaults. When a compliance audit requires all VPCs to enable flow logging, the team has to investigate four different modules to figure out which environments are compliant.

Teams that avoid this treat their modules like shared services: named owner, contributions through pull requests, breaking changes in major versions with a migration guide, and deprecated modules with a retirement date. A `CODEOWNERS` file routes every pull request to the right reviewer automatically.

Organizations that skip this end up with modules that nobody owns, nobody wants to touch, and nobody is sure can be safely removed.

---

## How Teams Share Data Between State Files

Once infrastructure is split into separate state files, a practical problem surfaces: teams need information from each other's infrastructure. The platform team's Kubernetes state needs the VPC ID from the networking team's state. The database state needs subnet IDs. The payments state needs the database endpoint.

Two patterns exist for solving this.

### Reading Another Team's State Outputs

The `terraform_remote_state` data source lets one state read the outputs of another. The networking team marks their VPC ID and subnet IDs as outputs. The database team reads those outputs and uses them to place databases in the right subnets.

```plaintext
Networking state
  └── outputs: vpc_id, private_subnet_ids
                          ↓
               Database state reads them
               └── places RDS in the right subnets
```

This works, but there's a limitation. Reading another team's state requires full read access to their entire state file, not just the outputs you want. State files contain database passwords and API keys in plaintext. More dependencies means more teams reading each other's secrets.

### Looking Up Resources Directly From the Cloud

The alternative, and the one HashiCorp now recommends, is to look up resources through the cloud provider's API instead of reading another team's state:

```hcl
data "aws_vpc" "main" {
  tags = {
    Name        = "production-vpc"
    Environment = "production"
  }
}
```

No cross-team state access needed, and each team's state stays isolated. The tradeoff is consistent tagging: the networking team has to tag their VPC in a way the database team can reliably search for, which forces teams to agree on naming conventions early.

Many teams use both. Remote state for a small number of trusted, tightly coupled dependencies. Cloud data sources for everything broader.

---

## How Infrastructure Changes Actually Move to Production

In large organizations managing production Terraform at scale, changes don't come from someone's laptop. Applying directly from a local machine requires production cloud credentials sitting on that machine, a security risk and leaves no audit trail if something breaks.

Instead, production changes move through a pipeline. Every change goes through a pull request in GitHub, and the pipeline does the work:

```plaintext
Engineer opens a pull request
        ↓
Pipeline: terraform validate + fmt check
        ↓
Pipeline: security scan (Checkov, tfsec, or similar)
        ↓
Pipeline: terraform plan → posts the full output as a comment on the PR
        ↓
Reviewer reads the plan output (not just the code)
        ↓
Required reviewers approve (enforced by CODEOWNERS + branch protection)
        ↓
Merge triggers the apply pipeline
        ↓
Pipeline: acquires state lock → applies → releases lock → logs result
```

![CI pipeline flowchart with Terraform](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/d154589a-67b6-41e0-bda1-d7243521878f.png)

The diagram above shows eight steps in order. An engineer opens a pull request. The pipeline runs terraform validate and a format check. A security scan runs using Checkov, tfsec, or similar. The pipeline runs terraform plan and posts the output as a comment on the pull request. A reviewer reads the full plan output. Required reviewers approve, enforced by CODEOWNERS and branch protection rules. Merging triggers the apply pipeline. The pipeline acquires the state lock, applies the changes, releases the lock, and logs the result.

The part that surprises engineers when they first encounter this is that the reviewer isn't approving the code. They're approving the **plan output** and the list of exactly what will be created, changed, or destroyed in the cloud.

A code change can look completely harmless and produce a destructive plan. Changing one database parameter might force a resource replacement, meaning Terraform destroys the current database and creates a new one. Seeing this in the plan output before the PR merges:

```plaintext
# aws_db_instance.payments must be replaced
-/+ resource "aws_db_instance" "payments" {
```

![Terraform plan output in terminal - aws_db_instance.payments](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/4b39ca51-ab6d-4187-b7b7-a68b35d13959.png)

The image above shows a plan output that aws_db_instance.payments must be replaced, meaning Terraform will destroy the existing database and create a new one, not update it in place.

Catching that before merge is the entire point of reviewing the plan. Not the code.

### How CODEOWNERS Enforces Who Reviews What

Earlier, we talked about module ownership. A VPC module might belong to the platform team, while database infrastructure belongs to the database team.

The challenge is making sure changes are actually reviewed by the people who own them.

GitHub solves this with a feature called **CODEOWNERS**. It lets a repository define which team is responsible for which directories. When someone opens a pull request that touches those files, GitHub automatically requests reviews from the correct team.

For example, if an engineer modifies the PostgreSQL module, GitHub can automatically require approval from the platform team before the change can be merged.

Without CODEOWNERS, engineers have to remember who owns which parts of the infrastructure.

CODEOWNERS makes ownership explicit and automatically requests reviews from the right team.

---

## How Teams Detect Infrastructure Drift

Drift is the diff between what Terraform says should exist and what actually exists in the cloud.

Here's the scenario that produces drift more reliably than anything else:

```plaintext
Monday 3:00 AM  Production database CPU spikes. Outage.
Monday 3:15 AM  Engineer resizes database in AWS console: db.m5.large → db.m5.4xlarge
Monday 3:20 AM  Incident resolved. Engineer goes to sleep.
Monday 3:21 AM  Terraform state file: still says db.m5.large
```

![Four panels showing how drift happens: the database CPU spikes at 3:00 AM, an engineer resizes it manually in the AWS console at 3:15 AM, the incident resolves at 3:20 AM, and by 3:21 AM the Terraform state file still says db.m5.large, unaware of the change.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/a1d72ad3-42f2-45d1-8d5a-3fdc8a4cbb99.png)

The incident is forgotten, the ticket is closed, and life moves on.

Three months later, a routine Terraform apply runs. Terraform sees `db.m5.large` in the configuration but finds `db.m5.4xlarge` running in AWS. From Terraform's perspective, the database is larger than it should be, so the plan proposes changing it back.

Nobody notices the change in the plan output. The apply goes through, the database is downsized, and users begin reporting slow queries. The team spends hours investigating before eventually tracing the issue back to a Terraform change that reverted the emergency fix from months earlier.

Teams that handle this well run scheduled `terraform plan` jobs against every production state. If `terraform plan` exits with code `2`, differences were found and an alert fires. The team then decides whether to apply to restore declared state or update the configuration to match reality. Either way, the change is visible and deliberate. Invisible drift always gets worse.

---

## How Teams Recover When State Goes Wrong

State is recoverable in almost every situation, as long as the team set things up correctly before the incident happened.

The teams that recover in twenty minutes instead of three days aren't the ones with the deepest Terraform expertise. They're the ones who prepared.

### Step 1: Pull a Backup Before Touching Anything.

```sh
terraform state pull > backup-$(date +%Y%m%d-%H%M%S).json
```

This saves the current state to a local file. Whatever you try next, you have a starting point to return to.

### Step 2: Run `terraform plan` and Look at What it Proposes.

If Terraform proposes destroying resources that still exist in the cloud, the state is behind reality. If it proposes creating resources that already exist, reality is ahead of the state. Either way, the plan output tells you which direction the mismatch runs.

### Step 3: Restore from S3 Versioning if the State is Corrupted.

Every write to a versioned S3 bucket saves a new version automatically. If the state file is corrupted or wrong, list the previous versions, download the last known good one, and push it back:

```sh
# List previous versions
aws s3api list-object-versions \
--bucket mycompany-terraform-state \
--prefix production/database/terraform.tfstate

# Download a specific version
aws s3api get-object \
--bucket mycompany-terraform-state \
--key production/database/terraform.tfstate \
--version-id "the-version-id-here" \
recovered-state.json

# Push it back
terraform state push recovered-state.json
```

Run `terraform plan` after restoring to confirm it looks correct before running any apply.

### Step 4: Clear a Stale Lock if the Pipeline is Blocked.

If a lock was never released after a failed apply, clear it:

```sh
terraform force-unlock LOCK_ID
```

Only do this after confirming no apply is actively running. Clearing a live lock corrupts the state.

### Step 5: Re-import Resources That Fell Out of State.

If a resource exists in the cloud but Terraform no longer knows about it — because of an accidental `terraform state rm` — bring it back without recreating it:

```sh
terraform import aws_db_instance.payments db-ABCD1234EFGH5678
```

Run `terraform plan` after importing to confirm no unexpected changes are proposed.

---

## Conclusion

Every practice in this article traces back to a specific problem teams ran into as Terraform usage grew.

State locking prevents engineers from overwriting each other's changes.  
State splitting reduces blast radius. Module versioning prevents shared infrastructure from breaking unexpectedly. Drift detection catches changes made outside Terraform. CODEOWNERS ensures the right people review the right changes.

Different problems with different solutions. But they all point to the same underlying theme which is ownership.

As teams grow, many Terraform problems have less to do with infrastructure and more to do with ownership.

State collisions happen when multiple people can modify the same state.  
Module sprawl happens when nobody is responsible for maintaining a shared standard.

Drift becomes dangerous when changes are made without anyone taking ownership of bringing Terraform and reality back into alignment. Even review bottlenecks often trace back to uncertainty about who should approve what.

Understanding this changes how you read an unfamiliar Terraform repository.

Dozens of small state files aren't necessarily over-engineering. They're often ownership boundaries. A CODEOWNERS file is not bureaucracy. It's an ownership map. A pipeline that posts plan output on a pull request isn't just automation, it's a review process built around infrastructure consequences rather than code.

The infrastructure matters. But as teams grow, ownership is what keeps the system understandable.

::: info About Author

I write about DevOps engineering, production systems, and the things tutorials do not cover weekly. If this was useful, *[<VPIcon icon="fas fa-globe"/>please join the newsletter.](https://osomudeya.kit.com/23db7ca59f)*

If you enjoyed reading this, we can also connect on [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`osomudeya-zudonu-17290b124`)](https://linkedin.com/in/osomudeya-zudonu-17290b124).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Enterprise Teams Manage Infrastructure at Scale with Terraform",
  "desc": "Tutorials teach you how to write Terraform, but don't teach you what happens when 60 engineers start writing it together. When you learn Terraform, you work with a single repository, state file, and a",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-enterprise-teams-manage-infrastructure-at-scale-with-terraform.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
