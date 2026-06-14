---
lang: en-US
title: "How to Build an Internal Developer Platform: A Complete Guide to Backstage, ArgoCD, and Crossplane"
description: "Article(s) > How to Build an Internal Developer Platform: A Complete Guide to Backstage, ArgoCD, and Crossplane"
icon: iconfont icon-argocd
category:
  - DevOps
  - Kubernetes
  - ArgoCD
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
  - argo
  - argocd
  - argo-cd
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Internal Developer Platform: A Complete Guide to Backstage, ArgoCD, and Crossplane"
    - property: og:description
      content: "How to Build an Internal Developer Platform: A Complete Guide to Backstage, ArgoCD, and Crossplane"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-internal-developer-platform-a-complete-guide-to-backstage-argocd-and-crossplane.html
prev: /devops/k8s/articles/README.md
date: 2026-07-18
isOriginal: false
author:
  - name: Ayobami Adejumo
    url: https://freecodecamp.org/news/author/aayostem/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4e45df2a-5af9-4feb-84fa-f7eb1c04ee91.png
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

```component VPCard
{
  "title": "Argo > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/argo/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an Internal Developer Platform: A Complete Guide to Backstage, ArgoCD, and Crossplane"
  desc="Every fast-growing engineering team eventually hits the same wall. A developer needs a new staging environment, so they file a ticket. The platform team queues it. Two weeks later, the environment exi"
  url="https://freecodecamp.org/news/how-to-build-an-internal-developer-platform-a-complete-guide-to-backstage-argocd-and-crossplane"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4e45df2a-5af9-4feb-84fa-f7eb1c04ee91.png"/>

Every fast-growing engineering team eventually hits the same wall.

A developer needs a new staging environment, so they file a ticket. The platform team queues it.

Two weeks later, the environment exists. It's configured slightly differently from the last one, with a naming convention that doesn't match the production setup, missing the observability stack the previous environment had. The developer deploys. Something breaks. Nobody knows why.

The problem isn't the ticket queue. The problem is the absence of a platform: a paved road where developers can self-serve infrastructure, deployments, and environments that are consistent, auditable, and safe without requiring a platform engineer for every request.

An Internal Developer Platform (IDP) solves this. Not by removing platform engineers from the picture, but by shifting their work from executing individual requests to building the systems that execute those requests automatically.

This handbook builds a production-grade IDP from the three CNCF tools that form its core in 2026: Backstage as the developer portal and software catalog, ArgoCD as the GitOps continuous delivery engine, and Crossplane as the Kubernetes-native infrastructure control plane.

By the end, developers on your platform will be able to provision a cloud database, deploy an application to staging, and register a new service in the catalog — all without filing a single ticket.

::: info What You'll Learn

- The three-layer IDP architecture and why each layer must be implemented in a specific order
- How to install and configure ArgoCD with ApplicationSets for multi-environment GitOps delivery
- How to define cloud infrastructure as Kubernetes custom resources using Crossplane Compositions
- How to deploy and configure Backstage with a software catalog and Software Templates
- How to wire Backstage, ArgoCD, and Crossplane together into a single self-service golden path
- How to implement cost attribution on your IDP so every resource provisioned through it carries team and cost center metadata
- How to measure your IDP's maturity using the CNCF Platform Engineering Maturity Model

:::

Let's build it.

::: note Prerequisites

Before following along, you should have:

**Knowledge:**

- Working familiarity with Kubernetes: you can deploy applications, write YAML manifests, and understand namespaces and RBAC
- Basic GitOps understanding: you know what "Git as source of truth" means in practice
- Comfort with Helm, Terraform HCL, and TypeScript at a reading level
- Understanding of AWS services: EKS, RDS, S3, IAM

**Tools and access:**

- An EKS cluster running Kubernetes 1.28 or later with at least 3 nodes (m5.xlarge or equivalent)
- `kubectl` configured and pointing at your cluster
- `helm` 3.12 or later installed
- AWS CLI v2 configured with admin-level permissions for the provisioning steps
- Node.js 18 or later and Yarn (for Backstage)
- A GitHub organisation you control (for the GitOps repositories and Backstage GitHub integration)

**Companion repository:**

```sh
git clone https://github.com/aayostem/platform-toolkit
cd platform-toolkit
```

The repository contains all manifests, Helm values files, Crossplane Compositions, and Backstage templates referenced in this guide. Each part maps to a directory in the repo.

**Estimated time:** The full implementation takes one to two days for an experienced platform engineer. Parts 1–3 can be completed in the morning and produce a working GitOps delivery layer.

:::

---

## Part 1: IDP Architecture — The Three-Layer Model

### 1.1 What an IDP Actually Is

An Internal Developer Platform isn't a tool. It's a product: a collection of tools, workflows, and abstractions that platform teams build and maintain so that application developers can move fast without managing infrastructure directly.

The distinction matters because it shapes every architectural decision. A tool is installed and configured. A product is designed for users, iterated based on feedback, and measured by whether those users actually adopt it. The platform teams that build the IDPs that developers love think like product managers, not system administrators.

[<VPIcon icon="fa-brands fa-google"/>The DORA 2025 report](https://cloud.google.com/resources/content/2025-dora-ai-capabilities-model-report) found that nearly 90% of enterprises now have some form of internal platform. But having a platform and having a platform that developers actually use are different things.

The survey found that developer satisfaction with internal platforms varied dramatically. And the gap between satisfied and unsatisfied teams correlated directly with whether the platform team treated the IDP as a product with a roadmap and user research, or as an infrastructure project with a ticket queue.

The three tools in this guide — Backstage, ArgoCD, and Crossplane — are the most widely adopted open-source stack for production IDPs in 2026. But the architecture that connects them matters as much as the tools themselves.

### 1.2 The Three-Layer Architecture

A production IDP has three distinct layers, each with a single responsibility:

```plaintext
Layer 1: Developer Interface (Backstage)
├── Software catalog — inventory of all services, APIs, and resources
├── Software Templates — self-service forms that trigger provisioning workflows
├── TechDocs — documentation co-located with each catalog entity
└── Plugins — integrations with ArgoCD, Kubernetes, PagerDuty, Grafana

Layer 2: Delivery Layer (ArgoCD)
├── GitOps sync — continuous reconciliation of cluster state to Git
├── ApplicationSets — multi-environment deployment from a single definition
├── Rollout management — progressive delivery with health checks
└── Audit trail — every deployment change linked to a Git commit

Layer 3: Infrastructure Layer (Crossplane)
├── Composite Resources — cloud resources defined as Kubernetes CRDs
├── Compositions — templates that expand a simple claim into full AWS infrastructure
├── ProviderConfigs — credentials and region configuration for each cloud provider
└── Usage tracking — every provisioned resource tagged with team and cost centre
```

The critical architectural rule: Backstage never talks directly to Kubernetes or cloud APIs. When a developer submits a Software Template in Backstage, the output is a Git commit — a YAML file representing a Crossplane claim or an ArgoCD Application manifest. ArgoCD picks up that commit and applies it to the cluster. Crossplane translates the cluster resource into actual cloud infrastructure.

This indirect path isn't complexity for complexity's sake. It means every infrastructure change is a Git commit, with an author, a timestamp, a pull request, and a review. The audit trail is automatic. The rollback mechanism is `git revert`.

```plaintext
Developer → Backstage Template → Git commit → ArgoCD → Crossplane → AWS
                                     ↑
                          Single source of truth
                          Full audit trail
                          Rollback = git revert
```
<!-- TODO: mermaid화 -->

Here's what the incorrect alternative looks like — Backstage calling cloud APIs directly:

```ts
// Bad: Backstage template calling AWS SDK directly
// No audit trail, no rollback, no reconciliation loop
// If the call fails halfway, you have partial infrastructure with no record
import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1" });
await client.send(new CreateBucketCommand({ Bucket: bucketName }));
```

And the correct approach — Backstage outputting a Crossplane claim to Git:

```yaml
# Good: Backstage template output — a Crossplane claim committed to Git
# ArgoCD applies it, Crossplane reconciles it, AWS creates the bucket
# Every step is tracked, auditable, and reversible
apiVersion: platform.cloudfrugal.com/v1alpha1
kind: S3Bucket
metadata:
  name: ${{ values.bucket_name }}
  namespace: ${{ values.team_namespace }}
  labels:
    team: ${{ values.team_name }}
    cost-centre: ${{ values.cost_centre }}
    environment: ${{ values.environment }}
spec:
  versioning: true
  encryption: AES256
  region: us-east-1
```

### 1.3 Implementation Order

Build in this order. Deviating from it creates integration problems that are difficult to debug:

```plaintext
Step 1: ArgoCD — the delivery foundation everything else depends on
Step 2: Crossplane — infrastructure control plane, delivered by ArgoCD
Step 3: Backstage — the portal, pointing at ArgoCD and Crossplane as backends
Step 4: Wire together — Software Templates that produce GitOps manifests
Step 5: FinOps layer — cost attribution metadata in every provisioned resource
```

---

## Part 2: ArgoCD — The GitOps Foundation

ArgoCD is a declarative continuous delivery tool for Kubernetes that implements the GitOps pattern. If you haven't used a GitOps tool before, the core idea is simple: your Git repository is the single source of truth for what should be running in your cluster, and ArgoCD continuously reconciles actual cluster state to match it.

If a developer manually changes a resource in the cluster, ArgoCD detects the drift and resyncs from Git. If Git changes, ArgoCD applies the change to the cluster. Human intervention isn't required, and is actively discouraged — the goal is a cluster whose state is always fully explained by what's in Git.

ArgoCD is a CNCF Graduated project, meaning it's production-ready and widely used. It runs as a set of pods in your cluster with a web UI, a CLI, and a REST API. Everything you need to manage deployments across multiple environments lives in one place.

### 2.1 Installing ArgoCD

```sh
# Create the ArgoCD namespace
kubectl create namespace argocd

# Install ArgoCD using the official manifest
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for all pods to be running before proceeding
kubectl wait --for=condition=Ready pods \
--all -n argocd --timeout=300s

# Get the initial admin password
argocd_password=$(kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d)

echo "ArgoCD initial password: $argocd_password"
echo "Save this somewhere secure before proceeding"

# Port-forward to access the ArgoCD UI locally
kubectl port-forward svc/argocd-server -n argocd 8080:443 &

# Login via CLI
argocd login localhost:8080 \
--username admin \
--password "$argocd_password" \
--insecure

# Change the password immediately
argocd account update-password \
--current-password "$argocd_password" \
--new-password "your-secure-password"
```

### 2.2 Repository Structure for GitOps

The repository structure ArgoCD watches determines how you manage multiple environments. The pattern that scales best is environment-per-directory, with overlays managed by Kustomize.

Kustomize is a Kubernetes-native configuration management tool that lets you define a base configuration once and layer environment-specific overrides on top of it. This means your staging and production configurations share the same YAML structure but differ in replica counts, image tags, and resource limits.

```sh :collapsed-lines title="file structure"
gitops-repo/
├── apps/
│   ├── base/                    # Shared configuration across all environments
│   │   ├── payment-api/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── kustomization.yaml
│   │   └── user-api/
│   │       ├── deployment.yaml
│   │       ├── service.yaml
│   │       └── kustomization.yaml
│   └── overlays/
│       ├── staging/             # Staging-specific overrides
│       │   ├── payment-api/
│       │   │   └── kustomization.yaml   # Override: 1 replica, staging image tag
│       │   └── kustomization.yaml
│       └── production/          # Production-specific overrides
│           ├── payment-api/
│           │   └── kustomization.yaml   # Override: 3 replicas, pinned image tag
│           └── kustomization.yaml
└── infrastructure/
    ├── crossplane/              # Crossplane installation and providers
    ├── monitoring/              # Prometheus, Grafana
    └── ingress/                 # NGINX or ALB ingress controller
```

### 2.3 ApplicationSets — Managing Multiple Environments

An ApplicationSet is an ArgoCD resource that generates multiple Application objects from a single template. Instead of creating one Application manifest per service per environment — which becomes unmanageable at scale — you define one ApplicationSet that covers all services across all environments. A matrix generator combines a list of environments with a Git directory scan to produce every combination automatically:

```yaml title="applicationset-apps.yaml"
# This single resource generates one ArgoCD Application
# for each combination of environment and application directory
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: platform-apps
  namespace: argocd
spec:
  generators:
    - matrix:
        generators:
          # Generator 1: environments
          - list:
              elements:
                - environment: staging
                  cluster: https://staging.eks.cluster.local
                - environment: production
                  cluster: https://production.eks.cluster.local

          # Generator 2: application directories in the overlay
          - git:
              repoURL: https://github.com/your-org/gitops-repo
              revision: HEAD
              directories:
                - path: apps/overlays/{{environment}}/*

  template:
    metadata:
      name: "{{environment}}-{{path.basename}}"
      labels:
        environment: "{{environment}}"
        app: "{{path.basename}}"
    spec:
      project: default
      source:
        repoURL: https://github.com/your-org/gitops-repo
        targetRevision: HEAD
        path: "apps/overlays/{{environment}}/{{path.basename}}"
      destination:
        server: "{{cluster}}"
        namespace: "{{path.basename}}"
      syncPolicy:
        automated:
          prune: true        # Delete resources removed from Git
          selfHeal: true     # Revert manual cluster changes
        syncOptions:
          - CreateNamespace=true
          - PrunePropagationPolicy=foreground
```

Verify the ApplicationSet is generating the expected Applications:

```sh
# List all generated Applications
kubectl get applications -n argocd

# Expected output: one Application per environment per app
# staging-payment-api    Synced    Healthy
# staging-user-api       Synced    Healthy
# production-payment-api Synced    Healthy
# production-user-api    Synced    Healthy

# Check sync status for a specific application
argocd app get staging-payment-api
```

### 2.4 ArgoCD RBAC for Platform Teams

In a multi-team IDP, different teams need different levels of access to ArgoCD. Application teams should be able to view and sync their own applications. Platform teams should have broader access. Nobody should have unrestricted cluster admin through ArgoCD.

The default policy is `readonly` — every authenticated user can see everything but change nothing:

```yaml title="argocd-rbac-configmap.yaml"
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.default: role:readonly
  policy.csv: |
    # Platform team: full access to all applications
    p, role:platform-team, applications, *, */*, allow
    p, role:platform-team, clusters, get, *, allow
    p, role:platform-team, repositories, *, *, allow

    # Application teams: sync and get their own namespace only
    p, role:app-team, applications, get, */staging-*, allow
    p, role:app-team, applications, sync, */staging-*, allow

    # Bind roles to GitHub teams
    g, your-org:platform-engineers, role:platform-team
    g, your-org:developers, role:app-team

  scopes: '[groups]'
```

---

## Part 3: Crossplane — Infrastructure as Kubernetes Resources

Crossplane is a CNCF Graduated open-source framework that extends Kubernetes into a universal infrastructure control plane.

The core idea: instead of managing cloud resources with separate tools like Terraform or CloudFormation that live outside your cluster, you define cloud resources — RDS databases, S3 buckets, VPCs, IAM roles — as Kubernetes custom resource definitions.

Once you apply a Crossplane resource to the cluster, Crossplane's controllers take over and reconcile the desired state to the actual AWS state, exactly the way Kubernetes reconciles a Deployment to a set of running pods.

The key abstraction Crossplane adds on top of that is the Composite Resource. A platform team defines a high-level `PostgreSQLDatabase` type that abstracts over the thirty-plus configuration fields an actual RDS instance requires.

Developers interact with the simple type. Crossplane expands it into the full AWS resource configuration behind the scenes, applying the platform team's security and operational standards automatically — standards that developers can't bypass because they never see the underlying fields.

### 3.1 Installing Crossplane

Crossplane is delivered to your cluster by ArgoCD — the first integration between the two tools. By installing Crossplane through an ArgoCD Application rather than running `helm install` directly, you make Crossplane itself part of the GitOps-managed infrastructure. Any change to Crossplane's configuration goes through a Git commit and review:

```yaml title="infrastructure/crossplane/application.yaml"
# ArgoCD Application that installs Crossplane via Helm
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: crossplane
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://charts.crossplane.io/stable
    chart: crossplane
    targetRevision: 1.15.0
    helm:
      values: |
        provider:
          packages:
            # AWS provider — manages all AWS resources
            - xpkg.upbound.io/upbound/provider-aws-s3:v1.2.0
            - xpkg.upbound.io/upbound/provider-aws-rds:v1.2.0
            - xpkg.upbound.io/upbound/provider-aws-iam:v1.2.0
  destination:
    server: https://kubernetes.default.svc
    namespace: crossplane-system
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

```sh
# Apply the ArgoCD Application — ArgoCD installs Crossplane
kubectl apply -f infrastructure/crossplane/application.yaml

# Watch Crossplane pods come up
kubectl get pods -n crossplane-system -w

# Verify providers are installed and healthy
kubectl get providers
#
# NAME                          INSTALLED   HEALTHY   PACKAGE
# upbound-provider-aws-s3       True        True      xpkg.upbound.io/...
# upbound-provider-aws-rds      True        True      xpkg.upbound.io/...
```

### 3.2 Provider Credentials

Crossplane needs AWS credentials to provision resources. The recommended approach for EKS is IAM Roles for Service Accounts (IRSA) — a mechanism that lets Kubernetes pods assume IAM roles directly without storing any credentials in the cluster.

The pod's Kubernetes service account is annotated with an IAM role ARN, and AWS automatically provides short-lived credentials when the pod makes API calls. No access keys, no secrets to rotate, and no credentials to accidentally expose:

```sh
# Create the IAM role for Crossplane with the necessary AWS permissions
aws iam create-role \
--role-name CrossplaneProviderRole \
--assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/YOUR_OIDC_ID"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "oidc.eks.us-east-1.amazonaws.com/id/YOUR_OIDC_ID:sub":
          "system:serviceaccount:crossplane-system:provider-aws"
      }
    }
  }]
}'

# Attach the permissions policy (scope this to minimum required in production)
aws iam attach-role-policy \
--role-name CrossplaneProviderRole \
--policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

```yaml title="provider-config.yaml"
# Configure the AWS provider with IRSA — no static credentials
apiVersion: aws.upbound.io/v1beta1
kind: ProviderConfig
metadata:
  name: default
spec:
  credentials:
    source: IRSA   # Use the IAM role attached to the provider service account
```

### 3.3 Defining a Composite Resource — PostgreSQL Database

This is where the IDP abstraction lives. The platform team defines two YAML files: the `CompositeResourceDefinition` (XRD), which specifies the shape of what developers can request, and the `Composition`, which specifies how that request expands into actual AWS resources with platform standards applied.

The XRD is the API contract with developers. Keep it simple — only fields developers genuinely need to control should appear here:

```yaml title="xrd-postgresql.yaml"
# Defines the PostgreSQLDatabase type that developers can request
# Developers never see the RDS-specific configuration below
apiVersion: apiextensions.crossplane.io/v1
kind: CompositeResourceDefinition
metadata:
  name: xpostgresqldatabases.platform.cloudfrugal.com
spec:
  group: platform.cloudfrugal.com
  names:
    kind: XPostgreSQLDatabase
    plural: xpostgresqldatabases
  claimNames:
    kind: PostgreSQLDatabase     # This is what developers create
    plural: postgresqldatabases
  versions:
    - name: v1alpha1
      served: true
      referenceable: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                # Developer-facing fields only — simple and bounded
                storageGB:
                  type: integer
                  minimum: 20
                  maximum: 1000
                  description: "Storage in GB. Min 20, max 1000."
                instanceClass:
                  type: string
                  enum: ["small", "medium", "large"]
                  description: "small=db.t4g.medium, medium=db.r7g.large, large=db.r7g.2xlarge"
                environment:
                  type: string
                  enum: ["staging", "production"]
```

The Composition is the platform team's implementation. It maps the simple developer fields to the full RDS configuration and enforces platform standards that developers can't override:

```yaml :collapsed-lines title="composition-postgresql.yaml"
# Defines what a PostgreSQLDatabase claim expands into
# Platform standards (encryption, backup, deletion protection) are applied here
# Developers cannot override them — the platform enforces them
apiVersion: apiextensions.crossplane.io/v1
kind: Composition
metadata:
  name: postgresql-aws-composition
  labels:
    provider: aws
spec:
  compositeTypeRef:
    apiVersion: platform.cloudfrugal.com/v1alpha1
    kind: XPostgreSQLDatabase

  resources:
    # The actual RDS instance — expanded from the simple developer claim
    - name: rds-instance
      base:
        apiVersion: rds.aws.upbound.io/v1beta1
        kind: Instance
        spec:
          forProvider:
            region: us-east-1
            engine: postgres
            engineVersion: "15.4"
            # Platform standards — always applied, not developer-configurable
            storageEncrypted: true           # Always encrypted
            backupRetentionPeriod: 7         # Always 7-day backup
            deletionProtection: true         # Always deletion-protected
            multiAZ: false                   # Overridden to true for production (see patches)
            dbSubnetGroupNameSelector:
              matchLabels:
                platform.cloudfrugal.com/subnet-group: private
      patches:
        # Map the developer's simple instanceClass to the actual RDS instance type
        - type: CombineFromComposite
          combine:
            variables:
              - fromFieldPath: spec.instanceClass
            strategy: string
            string:
              fmt: |
                %s
          toFieldPath: spec.forProvider.dbInstanceClass
          transforms:
            - type: map
              map:
                small:  db.t4g.medium
                medium: db.r7g.large
                large:  db.r7g.2xlarge

        # Enable Multi-AZ for production automatically
        - type: FromCompositeFieldPath
          fromFieldPath: spec.environment
          toFieldPath: spec.forProvider.multiAZ
          transforms:
            - type: map
              map:
                staging:    "false"
                production: "true"

        # Copy team labels from the claim to the RDS instance for cost attribution
        - type: FromCompositeFieldPath
          fromFieldPath: metadata.labels
          toFieldPath: spec.forProvider.tags
```

A developer requesting a PostgreSQL database now writes this — nothing more:

```yaml
# Developer creates this in their team's namespace
# No RDS knowledge required. No IAM configuration. No subnet group lookup.
apiVersion: platform.cloudfrugal.com/v1alpha1
kind: PostgreSQLDatabase
metadata:
  name: payment-service-db
  namespace: payments-team
  labels:
    team: payments
    cost-centre: payments-engineering
    environment: staging
spec:
  storageGB: 100
  instanceClass: medium
  environment: staging
```

Crossplane reconciles this claim to a full RDS instance within minutes, with encryption, backup, and all platform standards applied automatically.

### 3.4 Verifying Crossplane Resource Provisioning

```sh
# Watch the claim status — it should transition to Ready=True
kubectl get postgresqldatabases -n payments-team -w

# Check the composite resource for detailed status
kubectl describe xpostgresqldatabases.platform.cloudfrugal.com

# Verify the actual AWS resource was created
aws rds describe-db-instances \
--query 'DBInstances[?TagList[?Key==`team` && Value==`payments`]].[DBInstanceIdentifier,DBInstanceStatus]' \
--output table
```

---

## Part 4: Backstage — The Developer Portal

Backstage is a CNCF incubating open-source framework originally built by Spotify. It serves as the developer-facing interface of your IDP — the single place where developers discover services, request infrastructure, and find documentation, without needing to know which underlying system provides any of it.

Backstage provides three core capabilities:

1. A software catalog that inventories every service, API, library, and resource in your organisation
2. Software Templates that give developers self-service forms for provisioning infrastructure and scaffolding new services
3. TechDocs that co-locate documentation with the catalog entity it documents so that documentation is always findable from the same place as the service it covers.

Backstage is built in TypeScript with a React frontend and a Node.js backend. It's configured rather than installed: you create a Backstage app, configure it with your organisation's specifics, and deploy it to your cluster.

### 4.1 Creating and Configuring Backstage

```sh
# Create a new Backstage app
npx @backstage/create-app@latest

# When prompted:
# App name: platform-portal
# Choose SQLite for local development, PostgreSQL for production

cd platform-portal
```

Configure Backstage to connect to your ArgoCD instance and GitHub:

```yaml :collapsed-lines title="app-config.production.yaml"
app:
  title: Cloudfrugal Platform Portal
  baseUrl: https://platform.your-company.com

backend:
  baseUrl: https://platform.your-company.com
  database:
    client: pg
    connection:
      host: ${POSTGRES_HOST}
      port: 5432
      user: ${POSTGRES_USER}
      password: ${POSTGRES_PASSWORD}
      database: backstage

# GitHub integration for catalog discovery and template scaffolding
integrations:
  github:
    - host: github.com
      apps:
        - appId: ${GITHUB_APP_ID}
          webhookSecret: ${GITHUB_WEBHOOK_SECRET}
          clientId: ${GITHUB_CLIENT_ID}
          clientSecret: ${GITHUB_CLIENT_SECRET}
          privateKey: ${GITHUB_PRIVATE_KEY}

# ArgoCD plugin configuration
argocd:
  username: ${ARGOCD_USERNAME}
  password: ${ARGOCD_PASSWORD}
  appLocatorMethods:
    - type: 'config'
      instances:
        - name: main
          url: https://argocd.your-company.com

# Catalog auto-discovery — finds catalog-info.yaml files across your GitHub org
catalog:
  providers:
    github:
      your-org:
        organization: 'your-github-org'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
```

### 4.2 The Software Catalog — Registering Services

Every service, API, library, and resource in your platform should be registered in the Backstage catalog via a <VPIcon icon="iconfont icon-yaml"/>`catalog-info.yaml` file committed to the service's repository. Backstage discovers these files automatically through the GitHub integration — no manual registration required once the file exists:

```yaml :collapsed-lines title="catalog-info.yaml"
# committed to each service's repository root
# Backstage discovers this automatically via the GitHub integration
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: payment-api
  title: Payment API
  description: "Core payment processing service. Handles transaction initiation, authorisation, and settlement."
  annotations:
    # Links ArgoCD to show deployment status in the Backstage UI
    argocd/app-name: production-payment-api
    # Links GitHub Actions workflow status
    github.com/project-slug: your-org/payment-api
    # Links Grafana dashboard for this service
    grafana/dashboard-selector: "title=Payment API"
    # Links PagerDuty on-call schedule
    pagerduty.com/service-id: P123456
  tags:
    - payments
    - typescript
    - critical
  links:
    - url: https://payment-api.docs.your-company.com
      title: Documentation
    - url: https://grafana.your-company.com/d/payment-api
      title: Grafana Dashboard
spec:
  type: service
  lifecycle: production
  owner: group:payments-team
  system: payment-platform
  dependsOn:
    - component:user-api
    - resource:payment-service-db
  providesApis:
    - payment-api-v2
```

### 4.3 Software Templates — Self-Service Infrastructure

A Software Template is a Backstage form that, when submitted, produces a Git commit. The commit contains whatever YAML, code, or configuration the template defines.

For infrastructure provisioning, the output is a Crossplane claim. For new service scaffolding, the output is a complete service skeleton committed to a new repository.

The key design decision: templates should create pull requests, not merge directly. The PR gives platform teams visibility, gives developers a review moment, and gives everyone an audit trail. Auto-merge policies can eliminate the review step for low-risk provisioning once you've built trust in the template's outputs:

```yaml :collapsed-lines title="templates/postgresql-database/template.yaml"
# This template gives developers a form to request a PostgreSQL database
# The output is a Crossplane PostgreSQLDatabase claim committed to the GitOps repo
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: postgresql-database
  title: PostgreSQL Database
  description: Provision a managed PostgreSQL database on AWS RDS. Encryption, backups, and deletion protection are configured automatically by the platform.
  tags:
    - database
    - postgresql
    - aws
spec:
  owner: group:platform-team
  type: infrastructure

  # The form developers fill out in the Backstage UI
  parameters:
    - title: Database Configuration
      required: [name, team, environment, storageGB, instanceClass]
      properties:
        name:
          title: Database Name
          type: string
          description: "Lowercase, hyphens only. E.g. payment-service-db"
          pattern: '^[a-z][a-z0-9-]*$'

        team:
          title: Owning Team
          type: string
          description: "Your team name. Used for cost attribution and ownership."
          ui:field: OwnerPicker
          ui:options:
            catalogFilter:
              kind: Group

        environment:
          title: Environment
          type: string
          enum: [staging, production]
          default: staging

        storageGB:
          title: Storage (GB)
          type: integer
          minimum: 20
          maximum: 1000
          default: 50

        instanceClass:
          title: Instance Size
          type: string
          enum: [small, medium, large]
          enumNames:
            - "Small (db.t4g.medium) — dev/staging workloads"
            - "Medium (db.r7g.large) — moderate production traffic"
            - "Large (db.r7g.2xlarge) — high-throughput production"
          default: small

  # What the template does when submitted
  steps:
    - id: generate-claim
      name: Generate Crossplane Claim
      action: fetch:template
      input:
        url: ./skeleton    # Contains the Crossplane claim YAML template
        values:
          name: ${{ parameters.name }}
          team: ${{ parameters.team | parseEntityRef | pick('name') }}
          environment: ${{ parameters.environment }}
          storageGB: ${{ parameters.storageGB }}
          instanceClass: ${{ parameters.instanceClass }}

    - id: create-pr
      name: Create Pull Request to GitOps Repo
      action: publish:github:pull-request
      input:
        repoUrl: github.com?repo=gitops-repo&owner=your-org
        title: "Platform: Provision PostgreSQL database ${{ parameters.name }} for ${{ parameters.team }}"
        branchName: "provision-db-${{ parameters.name }}-${{ '' | now }}"
        description: |
          Requesting PostgreSQL database provisioned by Crossplane.

          - **Name:** ${{ parameters.name }}
          - **Team:** ${{ parameters.team }}
          - **Environment:** ${{ parameters.environment }}
          - **Storage:** ${{ parameters.storageGB }}GB
          - **Instance:** ${{ parameters.instanceClass }}

          Approve this PR to trigger provisioning. ArgoCD will pick up the change and Crossplane will create the RDS instance within ~5 minutes of merge.
        sourcePath: ./skeleton

  output:
    links:
      - title: View Pull Request
        url: ${{ steps['create-pr'].output.remoteUrl }}
      - title: Track Provisioning in ArgoCD
        url: https://argocd.your-company.com/applications
```

The template skeleton directory contains the Crossplane claim with template variable placeholders:

```yaml
# templates/postgresql-database/skeleton/databases/${{ values.name }}.yaml
apiVersion: platform.cloudfrugal.com/v1alpha1
kind: PostgreSQLDatabase
metadata:
  name: ${{ values.name }}
  namespace: ${{ values.team }}-platform
  labels:
    team: ${{ values.team }}
    cost-centre: ${{ values.team }}-engineering
    environment: ${{ values.environment }}
    managed-by: backstage-scaffolder
spec:
  storageGB: ${{ values.storageGB }}
  instanceClass: ${{ values.instanceClass }}
  environment: ${{ values.environment }}
```

---

## Part 5: Wiring It Together — The Golden Path

The Golden Path is the complete end-to-end workflow: a developer uses Backstage to request infrastructure, that request becomes a Git commit, ArgoCD applies the commit to the cluster, Crossplane provisions the actual AWS resource, and the result appears in both the Backstage catalog and the ArgoCD dashboard.

### 5.1 The Complete Flow

```plaintext
Developer fills form in Backstage
    ↓
Backstage Software Template renders the Crossplane claim YAML
    ↓
Backstage creates a Pull Request in the GitOps repository
    ↓
Platform engineer (or auto-merge policy) approves and merges the PR
    ↓
ArgoCD detects the new file in the GitOps repository
    ↓
ArgoCD applies the Crossplane claim to the cluster
    ↓
Crossplane reconciles the claim to an actual AWS RDS instance
    ↓
Developer receives the database endpoint via Kubernetes Secret
    ↓
Backstage catalog shows the new resource, owned by the requesting team
```
<!-- TODO: mermaid화 -->

### 5.2 Surfacing Resource Status Back in Backstage

The Backstage Kubernetes plugin pulls live pod and resource status from your clusters and displays it on each catalog entity page. Developers can see whether their service is running, how many replicas are healthy, and whether the last deployment synced — without leaving Backstage or learning `kubectl`:

```sh
# Install the Kubernetes plugin packages
cd platform-portal
yarn --cwd packages/app add @backstage/plugin-kubernetes
yarn --cwd packages/backend add @backstage/plugin-kubernetes-backend
```

```yaml title="app-config.production.yaml"
# add Kubernetes cluster configuration
kubernetes:
  serviceLocatorMethod:
    type: 'multiTenant'
  clusterLocatorMethods:
    - type: 'config'
      clusters:
        - name: production-eks
          url: ${PRODUCTION_CLUSTER_URL}
          authProvider: serviceAccount
          serviceAccountToken: ${PRODUCTION_SA_TOKEN}
          caData: ${PRODUCTION_CA_DATA}
        - name: staging-eks
          url: ${STAGING_CLUSTER_URL}
          authProvider: serviceAccount
          serviceAccountToken: ${STAGING_SA_TOKEN}
          caData: ${STAGING_CA_DATA}
```

Annotate each catalog entity to link it to its Kubernetes resources:

```yaml
# In each service's catalog-info.yaml
annotations:
  backstage.io/kubernetes-label-selector: 'app=payment-api'
  backstage.io/kubernetes-namespace: payments-team
```

### 5.3 Installing the ArgoCD Plugin

The ArgoCD plugin shows deployment history and sync status directly in the Backstage entity page. When a developer opens the payment-api page in the catalog, they can see the last 10 deployments, the current sync state, and whether the application is healthy — all without opening the ArgoCD UI:

```sh
yarn --cwd packages/app add @roadiehq/backstage-plugin-argo-cd
```

```tsx title="packages/app/src/components/catalog/EntityPage.tsx"
import { EntityArgoCDOverviewCard } from '@roadiehq/backstage-plugin-argo-cd';

// Add to the service entity page layout
const serviceEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3}>
        <Grid item md={6}>
          <EntityAboutCard variant="gridItem" />
        </Grid>
        <Grid item md={6}>
          {/* ArgoCD deployment status — shows sync state and recent deployments */}
          <EntityArgoCDOverviewCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayout>
);
```

---

## Part 6: FinOps Integration — Cost Attribution on the IDP

An IDP that provisions resources without cost attribution creates a new problem: you now have automated infrastructure provisioning with no clear ownership of the bill it generates. Every resource created through the IDP must carry team and cost centre metadata from the moment it's provisioned.

### 6.1 Mandatory Labels on Every Crossplane Composition

The Crossplane Compositions are where cost attribution is enforced — not in the developer-facing claim, but in the platform layer that the developer can't bypass. These labels flow through to the actual AWS resource as tags, which means they appear in AWS Cost Explorer and can be used to build team-level cost reports:

```yaml
# In every Composition, add mandatory cost attribution patches
patches:
  # These labels flow to the actual AWS resource as tags
  # They can't be omitted or overridden by the developer claim
  - type: FromCompositeFieldPath
    fromFieldPath: metadata.labels[team]
    toFieldPath: spec.forProvider.tags[team]

  - type: FromCompositeFieldPath
    fromFieldPath: metadata.labels[cost-centre]
    toFieldPath: spec.forProvider.tags[cost-centre]

  - type: FromCompositeFieldPath
    fromFieldPath: metadata.labels[environment]
    toFieldPath: spec.forProvider.tags[environment]

  # Add a managed-by tag to identify all IDP-provisioned resources
  - type: FromCompositeFieldPath
    fromFieldPath: metadata.name
    toFieldPath: spec.forProvider.tags[managed-by]
    transforms:
      - type: string
        string:
          fmt: "idp-crossplane"
```

### 6.2 Cost Attribution Query

With mandatory tags on every resource, you can query actual cost by team directly from AWS Cost Explorer:

```sh
# Monthly cost breakdown by team — all IDP-provisioned resources
aws ce get-cost-and-usage \
--time-period Start=$(date -d 'last month' +%Y-%m-01),End=$(date +%Y-%m-01) \
--granularity MONTHLY \
--filter '{
  "Tags": {
    "Key": "managed-by",
    "Values": ["idp-crossplane"]
  }
}' \
--group-by Type=TAG,Key=team \
--metrics UnblendedCost \
--query 'ResultsByTime[0].Groups[*].{Team:Keys[0],Cost:Metrics.UnblendedCost.Amount}' \
--output table
```

Every team that provisions resources through the IDP now has a line on the cost report with their name on it. This is the chargeback model that makes FinOps sustainable at platform scale — attribution is automatic, not manual.

---

## Part 7: The Platform Maturity Model — Measuring What You've Built

The CNCF Platform Engineering Maturity Model defines five levels of platform maturity. Knowing where you sit helps you decide what to build next and communicate progress to engineering leadership.

| Level | Name | Characteristics |
| --- | --- | --- |
| 1 | Provisional | Ad hoc scripts, manual provisioning, no standard tools |
| 2 | Operational | Standardised tools, some automation, Kubernetes in use |
| 3 | Scalable | Self-service portal, GitOps delivery, documented golden paths |
| 4 | Optimising | Cost attribution, SLOs on the platform itself, user feedback loops |
| 5 | Optimised | AI-assisted provisioning, predictive scaling, full FinOps integration |

A complete Backstage + ArgoCD + Crossplane implementation, with cost attribution and Software Templates covering your most common developer requests, puts you at Level 3. Moving to Level 4 requires adding SLO alerting on the platform's own health, running quarterly developer experience surveys, and producing a monthly cost-by-team report from the attribution tags.

The most common mistake at Level 3: building more features instead of measuring adoption. A platform that has 12 Software Templates but only 2 are regularly used hasn't reached Level 3 — it's reached Level 2 with more YAML. Measure which golden paths are used, interview developers who aren't using the portal, and fix the friction before adding capabilities.

---

## Best Practices Summary

✅ **Do:** Build in order — ArgoCD first, then Crossplane, then Backstage. Each layer depends on the previous one.

✅ **Do:** Use Backstage as a Git commit generator, not as an infrastructure caller. All infrastructure changes must be auditable Git commits.

✅ **Do:** Apply cost attribution tags in the Crossplane Composition layer, not in the developer claim. Attribution that developers can bypass will be bypassed.

✅ **Do:** Start with two or three Software Templates and make them excellent before building more. Template adoption is your most important early metric.

✅ **Do:** Register every service in the Backstage catalog from day one. The catalog's value is proportional to its coverage.

✅ **Do:** Deliver Crossplane to your cluster via ArgoCD, not `helm install`. Everything the IDP manages should itself be managed by the IDP.

❌ **Don't:** Connect Backstage directly to cloud APIs. No audit trail, no rollback, no reconciliation.

❌ **Don't:** Give developers the Crossplane XRD directly. The Composition abstraction exists to hide RDS-specific configuration and enforce platform standards. Bypassing it defeats the purpose.

❌ **Don't:** Build the IDP in isolation and announce it as done. Platform engineering is product engineering. Schedule user interviews after the first two templates are live.

❌ **Don't:** Skip the ArgoCD RBAC configuration. An IDP that gives all developers cluster-admin through the delivery layer has created a security problem larger than the one it solved.

::: info Resources

- [**Backstage Documentation**](https://backstage.io/docs) — Official reference for plugin development, Software Templates, and catalog configuration
- [**Crossplane Documentation**](https://docs.crossplane.io) — CompositeResourceDefinition and Composition reference, provider installation guides
- [**ArgoCD Documentation**](https://argo-cd.readthedocs.io) — ApplicationSet generator reference, RBAC configuration, and sync policy options
- [**CNCF Platform Engineering Maturity Model**](https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/) — The maturity framework referenced in Part 7
- [**AWS Provider for Crossplane**](https://marketplace.upbound.io/providers/upbound/provider-aws) — Complete reference for all AWS resource types available through Crossplane
- [**Backstage Kubernetes Plugin**](https://backstage.io/docs/features/kubernetes/) — Setup guide for the Kubernetes resource visibility integration in Part 5
- [**FinOps Foundation — FinOps for Platform Engineering**](https://finops.org/framework/capabilities/) — Framework reference for the cost attribution model in Part 6
- [**Companion Repository** (<VPIcon icon="iconfont icon-github"/>`aayostem/platform-toolkit`)](https://github.com/aayostem/platform-toolkit) — All manifests, Compositions, ApplicationSets, and Backstage templates from this guide
- [<VPIcon icon="fa-brands fa-google"/>**2025 DORA State of AI-assisted Software Development Report**](https://cloud.google.com/resources/content/2025-dora-ai-capabilities-model-report)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Internal Developer Platform: A Complete Guide to Backstage, ArgoCD, and Crossplane",
  "desc": "Every fast-growing engineering team eventually hits the same wall. A developer needs a new staging environment, so they file a ticket. The platform team queues it. Two weeks later, the environment exi",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-internal-developer-platform-a-complete-guide-to-backstage-argocd-and-crossplane.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
