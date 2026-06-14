---
lang: en-US
title: "How to Organize and Maintain Azure Repositories at Scale: An Azure DevOps Engineer's Guide"
description: "Article(s) > How to Organize and Maintain Azure Repositories at Scale: An Azure DevOps Engineer's Guide"
icon: iconfont icon-microsoftazure
category:
  - DevOps
  - Microsoft
  - Azure
  - Terraform
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - microsoft
  - azure
  - microsoft-azure
  - tf
  - terraform
  - hcl
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Organize and Maintain Azure Repositories at Scale: An Azure DevOps Engineer's Guide"
    - property: og:description
      content: "How to Organize and Maintain Azure Repositories at Scale: An Azure DevOps Engineer's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-organize-and-maintain-azure-repositories-at-scale.html
prev: /devops/azure/articles/README.md
date: 2026-06-23
isOriginal: false
author:
  - name: Casmir Onyekani
    url: https://freecodecamp.org/news/author/Casmir/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e4c2ef53-8e1f-4b05-99b8-6461c966335d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": Azure > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/azure/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Organize and Maintain Azure Repositories at Scale: An Azure DevOps Engineer's Guide"
  desc="Managing a few of repositories is easy. And managing dozens can be challenging. But managing hundreds across multiple teams, products, and deployment environments is where things start to break down. "
  url="https://freecodecamp.org/news/how-to-organize-and-maintain-azure-repositories-at-scale"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e4c2ef53-8e1f-4b05-99b8-6461c966335d.png"/>

Managing a few of repositories is easy. And managing dozens can be challenging.

But managing hundreds across multiple teams, products, and deployment environments is where things start to break down.

At first, repository management feels simple. A team creates a repository, pushes code, and starts building features.

But as the organization grows, repositories multiply, and new services appear. Teams expand. Deployment pipelines become more complex. Different security requirements emerge. Suddenly, nobody knows who owns what, branch policies differ from one repository to another, and onboarding new developers becomes increasingly difficult.

I've seen this happen repeatedly in growing engineering teams.

What starts as a clean Azure DevOps environment eventually becomes a collection of inconsistent repositories, duplicated configurations, bloated Git histories, and fragmented governance.

The good news is that Azure Repos provides everything needed to prevent this from happening.

The challenge isn't creating repositories. The challenge is creating a repository strategy that continues working as your engineering organization grows.

In this guide, you'll learn how to organize and maintain Azure Repositories at scale using ownership-driven structures, cross-repository governance, automation, and repository maintenance practices that support long-term growth.

---

## Why Repository Organization Becomes a Scaling Problem

Many teams underestimate repository management because they only see today's requirements.

A startup with one application may only have:

```plaintext
frontend
backend
database
```

Everything seems manageable.

Fast forward two years and the same company might have:

```plaintext
customer-portal-web
customer-portal-api
billing-service
notification-service
auth-service
analytics-service
mobile-api
shared-components
design-system
internal-tools
```

The problem is no longer writing code. It becomes managing code.

Without clear standards, organizations typically experience:

- Repositories with unclear ownership
- Different branching strategies
- Security permission sprawl
- Duplicate CI/CD configurations
- Slower developer onboarding
- Bloated Git repositories
- Inconsistent documentation
- Difficult compliance audits

Repository management is ultimately about reducing operational friction. Every repository should be easy to understand, easy to secure, easy to maintain, and easy to scale.

---

## Build an Ownership-Driven Repository Structure

One of the biggest mistakes teams make is organizing repositories like folders.

Repositories shouldn't exist because a folder was needed. They should exist because ownership, deployment, security, or lifecycle boundaries require them.

When deciding whether a new repository should be created, ask:

- Who owns this code?
- How is it deployed?
- Who can access it?
- Does it version independently?
- Does it require different security controls?

If the answers differ significantly from another codebase, it likely deserves its own repository.

Think about repositories as business assets rather than technical containers.

---

## Choosing Between a Mono-Repo and Multi-Repo Strategy

One of the first decisions you'll make is whether to store everything in one repository or split projects across multiple repositories.

There's no universal answer.

The correct choice depends on ownership and deployment requirements.

### When a Mono-Repo Makes Sense

A mono-repository works well when the same team owns everything and components are tightly coupled.

Example:

```sh title="file structure"
company-platform/
│
├── frontend/
├── backend/
├── shared-ui/
├── docs/
└── infrastructure/
```

This structure simplifies:

- Dependency management
- Refactoring
- Shared tooling
- Coordinated releases

But as teams grow, mono-repositories often become difficult to govern because everyone shares the same repository boundaries.

### When a Multi-Repo Strategy Works Better

Large organizations generally benefit from multiple repositories.

Consider a SaaS platform built with Node.js, TypeScript, and React. Instead of one massive repository, separate repositories may look like:

```plaintext
customer-portal-web
customer-portal-api
billing-service
notification-service
shared-ui-library
authentication-service
```

Each repository can then:

- Have its own release cycle
- Maintain separate permissions
- Deploy independently
- Scale independently

This approach aligns naturally with modern microservice architectures.

---

## Separate Azure DevOps Projects by Business Boundaries

Many teams create repositories correctly but place everything inside a single Azure DevOps Project.

That works initially, but becomes problematic later.

Azure DevOps Projects should represent organizational boundaries.

For example:

```plaintext
Customer Platform
├── customer-web
├── customer-api
├── mobile-api

Internal Systems
├── hr-system
├── payroll-api

Developer Platform
├── shared-components
├── infrastructure-tools
```

This structure improves security management, reporting, compliance, repository governance, and team autonomy.

A project should represent a logical business domain rather than a random collection of repositories.

---

## Create Naming Standards Before Repository Growth Happens

Naming conventions often feel unimportant...until you have 500 repositories.

Without naming standards, developers waste time searching for repositories and understanding ownership.

Bad examples:

```plaintext
backend
backend-v2
new-api
test-project
final-final-api
```

Good examples:

```plaintext
sales-order-service
sales-payment-api
customer-auth-service
platform-notification-service
marketing-website
```

A simple convention works well:

```plaintext
[domain]-[service]
```

For example:

```plaintext
billing-payment-service
billing-invoice-service
customer-auth-service
```

Immediately, everyone understands the business domain, the service purpose, and the repository ownership.

Good naming reduces confusion before confusion appears.

---

## Implement Cross-Repository Policies Instead of Managing Repositories Individually

This is where many Azure DevOps environments begin to fail.

Imagine managing 100 repositories, 300 developers, and 20 teams. Would you manually configure branch policies for every repository?

Of course not.

Yet many organizations still do exactly that. And the result is inconsistency.

Some repositories require pull requests, while others allow direct commits. Some require successful builds, while others don't.

Over time, repository quality becomes impossible to enforce consistently.

The solution is cross-repository governance. Instead of treating repositories individually, treat policies as organizational standards.

---

## Enforce Branch Policies Across Multiple Repositories

As engineering teams grow, maintaining consistent code quality becomes increasingly difficult.

A repository with five developers may survive without strict governance. But a repository ecosystem with hundreds of developers and dozens of services can't.

Without branch protection, developers can:

- Push directly to production branches
- Bypass code reviews
- Merge untested code
- Accidentally introduce breaking changes
- Deploy features without proper traceability

Azure DevOps branch policies help prevent these problems by enforcing organizational standards before code can be merged.

Rather than configuring policies individually for every repository, organizations should establish a standard branch strategy and apply protections consistently across repositories.

### Which Branches Should Be Protected?

Not every branch requires the same level of protection.

Most teams focus on protecting branches that directly affect production releases or customer-facing environments.

A common strategy is protecting:

```plaintext
main
release/*
hotfix/*
```

Let's look at why each branch matters.

### Protecting the Main Branch

The <VPIcon icon="fas fa-code-branch"/>`main` branch typically represents the most stable version of your application.

For a Node.js and TypeScript application, code in <VPIcon icon="fas fa-code-branch"/>`main` is often what gets deployed to production.

Example:

```plaintext
main
│
├── Latest production-ready code
├── Passed automated testing
└── Approved through code review
```

Because this branch directly impacts customers, developers should never push changes directly into it. Instead, all changes should flow through pull requests.

Recommended protections include:

- Require pull requests
- Require reviewer approval
- Require successful build validation
- Require linked work items
- Block force pushes

This ensures every change entering production has been reviewed and validated.

### Protecting Release Branches

Release branches are often used to prepare production deployments.

Example:

```plaintext
release/v1.0
release/v1.1
release/v2.0
```

These branches usually contain code that's undergoing final testing before deployment.

Without protection, developers may accidentally introduce new features or untested changes while the release is being stabilized.

Recommended protections include:

```plaintext
release/*
```

- Require pull requests
- Require QA approval
- Require successful test execution
- Restrict direct commits

This keeps release branches stable and predictable.

### Protecting Hotfix Branches

Hotfix branches are used when urgent production issues need immediate attention.

Examples include:

- Payment failures
- Authentication outages
- Security vulnerabilities
- Critical application bugs

Example:

```plaintext
hotfix/payment-timeout
hotfix/authentication-error
```

Because hotfixes are usually created under pressure, they're more likely to introduce mistakes.

Teams often want to deploy quickly and skip review processes. But that's precisely why protection matters.

Recommended protections include:

```plaintext
hotfix/*
```

- Require at least one reviewer
- Require automated testing
- Track changes through work items
- Restrict direct pushes

Even during emergencies, code quality standards should remain intact.

### Applying Consistent Policies Across Repositories

Imagine an organization managing the following:

```plaintext
customer-portal-api
billing-service
notification-service
authentication-service
reporting-service
```

If every repository has different branch rules, developers become confused and governance becomes difficult.

Instead, the team should establish repository-wide standards:

```plaintext
main       → 2 reviewers + successful build
release/*  → QA approval + successful build
hotfix/*   → 1 reviewer + successful build
```

This creates predictable workflows regardless of which repository a developer is working in.

A developer moving from the billing service to the notification service already understands the merge process because the same rules apply everywhere.

By enforcing branch protections consistently across Azure Repositories, organizations reduce production incidents, improve code quality, strengthen security, and create a development workflow that scales alongside engineering growth.

### Require Build Validation Before Code Reaches Production

Many bugs reach production because code is reviewed but never tested automatically. Build validation closes that gap.

For a TypeScript Node.js project, an Azure Pipeline might run:

```yaml
trigger:
  - main

pool:
  vmImage: ubuntu-latest

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'

  - script: npm install

  - script: npm run lint

  - script: npm run test

  - script: npm run build
```

This example uses an Ubuntu build agent. For most TypeScript, Node.js, React, and Tailwind CSS projects, Ubuntu is usually enough because the app isn't tied to a specific operating system.

But teams can also test across multiple operating systems. If so, replace `imageName: ubuntu-latest` with its respective operating system.

Example:

```yaml

strategy:
  matrix:
    linux:
      imageName: ubuntu-latest
    windows:
      imageName: windows-latest
    mac:
      imageName: macOS-latest

pool:
  vmImage: $(imageName)

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'

  - script: npm install
  - script: npm run lint
  - script: npm run test
  - script: npm run build
```

Use this when the project needs to confirm that builds and tests pass on Linux, Windows, and macOS.

For a normal web app, Ubuntu is fine. For desktop apps, CLI tools, cross-platform packages, or mobile-related builds, multi-OS testing is better.

This pipeline ensures that dependencies install correctly, linting passes, tests pass, and production builds succeed. All before the pull request is merged.

Developers stop arguing about code quality because the pipeline enforces it automatically.

### Use Role-Based Access Control Instead of Individual Permissions

Managing individual user permissions becomes impossible at scale. Imagine manually configuring 500 developers.

Instead, create groups.

Example:

```plaintext
Frontend Developers
Backend Developers
DevOps Engineers
QA Team
Project Administrators
```

Then map those groups to Azure DevOps roles:

```plaintext
Frontend Developers → Contributor
QA Team → Reader
DevOps Engineers → Administrator
```

This creates consistency and significantly reduces administrative overhead.

When a developer joins or leaves a team, administrators only update group membership. Repository permissions remain unchanged.

---

## Automate Repository Provisioning from Day One

As organizations grow, repository creation often becomes an overlooked source of technical debt.

In a small team, manually creating repositories may seem harmless. A developer creates a new repository through the Azure DevOps portal, adds a README file, configures a pipeline, and starts building features.

The problem emerges when this process is repeated hundreds of times across multiple teams.

One repository contains a README. Another does not.

One repository has branch protection rules. Another allows direct commits to production.

One repository includes a CI/CD pipeline. Another requires manual deployment.

Over time, every repository begins to look different. And this inconsistency creates operational overhead, security risks, and onboarding challenges.

The solution is to treat repository creation as an automated process rather than a manual task.

Instead of allowing developers to create repositories from scratch, organizations should establish a repository blueprint that automatically provisions repositories with predefined standards and configurations.

A newly created repository should automatically include:

```plaintext
README.md
CONTRIBUTING.md
CODEOWNERS
.gitignore
azure-pipelines.yml
docs/
src/
tests/
```

This ensures every project starts with the same foundation.

The goal is simple:

> Every repository should be production-ready the moment it's created.

### Why Repository Templates Matter

Imagine your organization has 150 repositories.

Without automation, every repository owner must remember to:

- Create documentation
- Configure branch policies
- Set up build pipelines
- Configure permissions
- Add security checks
- Establish folder structures

The likelihood of inconsistency becomes extremely high.

With repository templates, every new repository automatically inherits organizational standards.

For example, a Node.js and TypeScript repository template might look like:

```plaintext
customer-auth-service/
│
├── src/
│
├── tests/
│
├── docs/
│
├── README.md
│
├── CONTRIBUTING.md
│
├── .gitignore
│
├── package.json
│
├── tsconfig.json
│
└── azure-pipelines.yml
```

Developers can immediately begin working without spending time configuring project infrastructure.

### Automating Repository Creation with Terraform

One of the most common approaches is using Terraform to provision Azure DevOps resources.

Instead of manually creating repositories through the Azure DevOps dashboard, teams define repository creation using Infrastructure as Code.

Example:

```hcl
resource "azuredevops_project" "platform" {
    name = "Customer Platform" 
} 

resource "azuredevops_git_repository" "auth_service" {         
    project_id = azuredevops_project.platform.id 

    name = "customer-auth-service" 
    
    initialization { 
        init_type = "Clean" 
    } 
}
```

Let's break this down.

The first block creates an Azure DevOps Project named: Customer Platform

The second block automatically creates a Git repository called `customer-auth-service`. Running:

```sh
terraform apply
```

creates the repository without requiring anyone to use the Azure DevOps interface.

This approach becomes extremely valuable when managing dozens or hundreds of repositories.

---

## Creating Repositories Through the Azure DevOps REST API

Terraform is excellent for infrastructure teams. But some organizations prefer using internal automation platforms.

Azure DevOps provides a REST API that allows repositories to be created programmatically.

Example:

```ts
curl -X POST \
https://dev.azure.com/{organization}/{project}/_apis/git/repositories?api-version=7.1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <PAT>" \
-d '{
  "name": "customer-auth-service"
}'
```

This request automatically creates a repository inside Azure DevOps.

Many organizations build internal portals where developers fill out a form:

```plaintext
Repository Name:
customer-auth-service

Project:
Customer Platform

Language:
TypeScript

Template:
Node.js API
```

The platform then calls Azure DevOps APIs behind the scenes and provisions everything automatically.

### Automatically Creating CI/CD Pipelines

Repository creation shouldn't stop at source control. A repository without automation is incomplete.

For a TypeScript Node.js service, an Azure Pipeline template could automatically be included:

Trigger:

- main

`pool: vmImage: ubuntu-latest`

Steps:

- task: NodeTool@0 inputs: versionSpec: '20.x'
- script: npm install
- script: npm run lint
- script: npm run test
- script: npm run build

This pipeline automatically installs Node.js and dependencies, runs linting, executes tests, and builds the application.

Every new repository receives the same CI/CD standards with no manual setup required.

### Automatically Applying Branch Policies

Repository automation should also include governance.

After a repository is created, automation can immediately configure:

- Pull request requirements
- Reviewer policies
- Build validation
- Merge restrictions

For example:

```plaintext
main branch 
│ 
├── Require 2 reviewers 
├── Require successful build 
├── Require linked work item 
└── Block direct commits
```

Instead of relying on developers to remember these settings, automation guarantees every repository follows organizational policies from day one.

### Example: **Automating the Provisioning of a New TypeScript Service**

Imagine that a developer requests a new service called:

```plaintext
customer-notification-service
```

A provisioning workflow could automatically:

1. Create the repository.
2. Add README.md
3. Add TypeScript project structure.
4. Configure Azure Pipeline.
5. Apply branch protection rules.
6. Assign ownership groups.
7. Configure security permissions.
8. Register monitoring and deployment pipelines.

Within minutes, the repository is ready for development. There's no manual setup, forgotten configurations, or inconsistent standards.

### Think of Repository Creation as Product Manufacturing

A useful way to think about repository provisioning is through manufacturing. A factory doesn't build every car from scratch. It follows a repeatable process.

Repository creation should work the same way.

Every repository should come off the production line with:

- Standardized structure
- Security controls
- CI/CD pipelines
- Documentation
- Governance policies

Automation ensures that the hundredth repository is just as well-configured as the first.

As organizations scale, this consistency becomes one of the most important factors in maintaining repository quality, reducing operational overhead, and enabling engineering teams to move faster without sacrificing governance.

---

## Monitor Repository Health Before Performance Degrades

Repository health is often ignored until developers complain. By then, the repository is already bloated.

Azure Repos provides repository insights that help identify:

- Large repositories
- Large files
- Excessive commit activity
- Storage growth

Regular monitoring prevents performance issues before they impact developers.

---

## Keep Repository Sizes Under Control

Azure Repos supports repositories up to 250 GB. That doesn't mean repositories should approach that size. Performance usually begins degrading long before then. So watch out for huge binaries, large media assets, generated files, and build artifacts.

Never store:

```plaintext
.zip
.rar
.iso
.exe
.mp4
.psd
```

inside source repositories.

Instead, use Azure Blob Storage, package registries, Git LFS, and Azure Artifacts.

Source control should store source code. Nothing more!

---

## Use Git LFS for Large Assets

Sometimes large files are unavoidable.

A normal web app shouldn't store heavy files in Git. But some projects need them. For example, a design system may include Photoshop files. A media platform may include sample videos. A game project may include textures, audio, and 3D assets.

The problem is that Git was built for source code, not large binary files. When you commit a large file directly into Git, it becomes part of the repository history. Even if you delete the file later, the old version still stays in history unless you rewrite it.

That is how repositories become slow and heavy over time.

Git LFS, which means Git Large File Storage, solves this by storing large files outside the normal Git history. Your repository keeps a small pointer file, while the real large file is stored separately.

Example – track large design files:

```sh
git lfs install

git lfs track "*.psd"
git lfs track "*.fig"
git lfs track "*.mp4"
git lfs track "*.zip"

git add .gitattributes
git commit -m "Configure Git LFS"
```

The `.gitattributes` file will look like this:

```plaintext
*.psd filter=lfs diff=lfs merge=lfs -text
*.fig filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
```

This tells Git: “Whenever these file types are added, store them with Git LFS instead of normal Git history.”

Example – add a large file after configuring Git LFS:

```sh
git add assets/design/homepage.psd
git commit -m "Add homepage design source file"
git push
```

Now the large `.psd` file is handled by Git LFS.

### Automate Git LFS Setup for New Repositories

At scale, you shouldn't rely on every developer to remember these commands manually. Create a setup script that runs when a new repository is created.

### <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-shell"/>`setup-git-lfs.sh`

```sh
#!/bin/bash

git lfs install

git lfs track "*.psd"
git lfs track "*.fig"
git lfs track "*.mp4"
git lfs track "*.mov"
git lfs track "*.zip"
git lfs track "*.ai"

git add .gitattributes
git commit -m "Configure Git LFS for large assets"
```

Run it with:

```sh
bash scripts/setup-git-lfs.sh
```

### Automate Git LFS Check in Azure Pipelines

You can also stop large files from entering the repository without Git LFS.

```yaml :collapsed-lines title="azure-pipelines.yml"
trigger:
  - main

pool:
  vmImage: ubuntu-latest

steps:
  - checkout: self
    lfs: true

  - script: |
      echo "Checking for large files not tracked by Git LFS..."

      MAX_SIZE=10485760

      files=$(git ls-files)

      for file in $files; do
        if [ -f "$file" ]; then
          size=\((stat -c%s "\)file")

          if [ "\(size" -gt "\)MAX_SIZE" ]; then
            if ! git check-attr filter -- "$file" | grep -q "filter: lfs"; then
              echo "Large file not tracked by Git LFS: $file"
              exit 1
            fi
          fi
        fi
      done

      echo "Large file check passed."
    displayName: "Check large files use Git LFS"
```

This pipeline checks files larger than 10MB. If a large file isn't tracked by Git LFS, the build fails.

That's the automation you want at scale. It prevents repository bloat before it enters the codebase.

---

## Clean Repositories Regularly

Repository maintenance isn't a one-time task. You should treat repositories like production systems and schedule periodic reviews.

Remove:

- Stale branches
- Unused pipelines
- Obsolete repositories
- Outdated documentation

If secrets or large files are accidentally committed, use:

```sh
git-filter-repo
```

to permanently remove them from history.

This modern approach is significantly faster and safer than older Git history rewriting tools.

---

## Improve Developer Experience with Shallow Cloning

Large repositories often contain years of history. And most developers don't need all of it.

A shallow clone downloads only recent history.

Example:

```sh
git clone --depth 1 https://dev.azure.com/company/project/repository
```

Benefits include:

- Faster onboarding
- Faster cloning
- Reduced storage consumption
- Lower network usage

Small optimizations become significant when hundreds of developers interact with repositories daily.

---

## Example Architecture for a Modern TypeScript Platform

Imagine a SaaS platform built using:

- TypeScript
- Node.js
- React
- Tailwind CSS
- Azure DevOps

A scalable repository structure could look like:

```plaintext
customer-portal-web
customer-portal-api
billing-service
notification-service
shared-ui-library
infrastructure-templates
developer-documentation
```

Each repository serves a distinct purpose, can deploy independently, and can scale independently.

Most importantly, ownership remains clear. That clarity is what makes large engineering organizations successful.

---

## Final Thoughts

The biggest mistake organizations make with Azure Repositories is assuming repository management is simply a storage problem.

It isn't.

Repository management is an organizational problem. The repositories you create today determine how efficiently teams collaborate tomorrow.

A scalable Azure Repos strategy starts with ownership-driven structures, consistent naming conventions, centralized governance, automated repository provisioning, repository health monitoring, and disciplined maintenance practices.

The goal isn't to manage more repositories. The goal is to create a repository ecosystem that remains secure, maintainable, and performant regardless of how large your engineering organization becomes.

The earlier you establish these standards, the easier it becomes to scale Azure DevOps without accumulating the repository debt that slows so many growing development teams.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Organize and Maintain Azure Repositories at Scale: An Azure DevOps Engineer's Guide",
  "desc": "Managing a few of repositories is easy. And managing dozens can be challenging. But managing hundreds across multiple teams, products, and deployment environments is where things start to break down. ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-organize-and-maintain-azure-repositories-at-scale.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
