---
lang: en-US
title: "From Commit to Production: Hands-On GitOps Promotion with GitHub Actions, Argo CD, Helm, and Kargo"
description: "Article(s) > From Commit to Production: Hands-On GitOps Promotion with GitHub Actions, Argo CD, Helm, and Kargo"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - k8s
  - kubernetes
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > From Commit to Production: Hands-On GitOps Promotion with GitHub Actions, Argo CD, Helm, and Kargo"
    - property: og:description
      content: "From Commit to Production: Hands-On GitOps Promotion with GitHub Actions, Argo CD, Helm, and Kargo"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/from-commit-to-production-hands-on-gitops-promotion-with-github-actions-argo-cd-helm-and-kargo/
prev: /programming/git/articles/README.md
date: 2025-06-06
isOriginal: false
author:
  - name: Nitheesh Poojary
    url : https://freecodecamp.org/news/author/nitheeshp/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749151777327/ece5b0b7-4a9a-4f95-8ebb-32e3768b678f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="From Commit to Production: Hands-On GitOps Promotion with GitHub Actions, Argo CD, Helm, and Kargo"
  desc="Have you ever wanted to go beyond ‘hello world’ and build a real, production-style CI/CD pipeline - starting from scratch? Let’s pause for a moment: what are you trying to learn from your DevOps journey? Are you focusing on GitOps-style deployments, ..."
  url="https://freecodecamp.org/news/from-commit-to-production-hands-on-gitops-promotion-with-github-actions-argo-cd-helm-and-kargo"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1749151777327/ece5b0b7-4a9a-4f95-8ebb-32e3768b678f.png"/>

Have you ever wanted to go beyond ‘hello world’ and build a real, production-style CI/CD pipeline - starting from scratch?

Let’s pause for a moment: what are you trying to learn from your DevOps journey? Are you focusing on GitOps-style deployments, or promotions? This guide will help you tackle all of it - one step at a time.

As a DevOps engineer interested in creating a complete CI/CD pipeline, I wanted more than a basic "hello world" microservice. I was looking for a project where I could start from scratch - beginning with raw source code, writing my own Docker Compose and Kubernetes files, deploying locally, and then adding automation, environment promotion, and GitOps practices step by step.

In my search, I found several GitHub repositories. Most were either too simple to be useful or too complicated and already set up, leaving no room for learning. They often included ready-made Docker Compose files and Kubernetes manifests, which didn't help with learning through hands-on experience.

That’s when I discovered **Craftista**, a project maintained by [Gourav Shah (<VPIcon icon="fa-brands fa-linkedin"/>`gouravshah`)](https://linkedin.com/in/gouravshah/). This wasn’t just another training repo. As described in its documentation:

> *“Craftista is not your typical hello world app or off-the-shelf WordPress app used in most DevOps trainings. It is the real deal.”*

![Craftista](https://cdn.hashnode.com/res/hashnode/image/upload/v1748210412834/5ef3f2b6-029d-4967-b6a9-825888b44706.png)

Craftista stood out to me for several reasons:

- It’s a **polyglot microservices application**, designed to resemble a real-world platform.
- Each service uses its own technology stack - exactly like in modern enterprises.
- It includes essential building blocks of a real e-commerce system:
  - A modern UI built in Node.js
  - A Product Catalogue Service
  - A Recommendation Engine
  - A Voting/Review Service

By the end of this guide, you won’t just have a “hello world” demo - you’ll have a fully functioning CI/CD/GitOps pipeline modeled on a real-world microservices stack. You’ll understand how the pieces fit together, why each tool exists, and how to adapt this workflow to your own projects.

Ready to go beyond hello world and build a production-style pipeline from scratch? Let’s dive in.

---

## Table of Contents

(1/6) [Topics Outside the Scope of This Guide](#heading-topics-outside-the-scope-of-this-guide)
(2/6) [What is GitOps?](#heading-what-is-gitops)
(3/6) [Tools We Are Using in This Guide](#heading-tools-we-are-using-in-this-guide)
(4/6) [How to Structure Repositories for Microservice Applications](#heading-how-to-structure-repositories-for-microservice-applications)
(5/6) [How to Organize Kubernetes Manifests for GitOps](#heading-how-to-organize-kubernetes-manifests-for-gitops)
(6/6) [How to Deploy and Promote Your Craftista Microservices Application](#heading-how-to-deploy-and-promote-your-craftista-microservices-application)

---

## Prerequisites and What You’ll Learn:

Before you progress through this guide, ask yourself:

- Do I understand how semantic tagging improves traceability across environments?
- Can I replicate a multi-environment GitOps setup using Helm and Kubernetes?
- Am I confident in organizing Helm charts and manifests for scalable deployments?
- Do I know how Kargo and Argo CD work together to automate promotions and approvals?

This guide will help you confidently answer those questions by walking you through:

- ✅ An optimized Git branching strategy: using feature branches and a single main branch
- ✅ Semantic Docker image tagging for clean version tracking
- ✅ Helm chart and Kubernetes manifest structuring for multi-environment GitOps
- ✅ CI pipelines using GitHub Actions for build → test → tag automation
- ✅ Full GitOps workflows with Kargo and Argo CD for seamless promotion and delivery

### Topics Outside the Scope of This Guide

- Deployment to managed services like EKS, AKS, or GKE is not included. We’ll use Minikube for local development.
- I assume you are already familiar with writing basic Kubernetes manifests. I won’t explain Pods, Services, Deployments, and their YAML structures here.
- I also won’t discuss topics like logging, metrics, tracing, and security hardening.
- This guide does not cover Managing Secrets and ConfigMaps and Implementing Service Discovery.
- And finally, we won’t go over ArgoCD and Kargo installation.

---

## What is GitOps?

GitOps is a modern way to manage applications and infrastructure using Git as the main source of truth. Developers have used Git for a long time to manage and work together on code. GitOps takes this further by including infrastructure setup, deployment processes, and automation.

By keeping everything - from Kubernetes files and Helm charts to infrastructure code and app settings - in Git, teams have a central, version-controlled system that can be tracked. Changes in Git are automatically updated and matched with the target environments by GitOps tools like Argo CD or Flux.

### Core Principles of GitOps

- Git as the single source of truth
- Declarative systems
- Immutable deployments
- Centralized change audit

---

## Tools We Are Using in This Guide

![Tools](https://cdn.hashnode.com/res/hashnode/image/upload/v1748886977153/8d7eb087-8161-431b-b48f-c67d724909b9.png)

### GitHub Actions

GitHub Actions is a platform for continuous integration and delivery (CI/CD) that helps automate your build, test, and deployment processes.

In our project, we’ll use it to store our microservice application code. We’ll use GitHub Actions workflows to build and push Docker images to Docker Hub as our Docker registry. We’ll rely on GitHub Actions for continuous delivery.

### Minikube

We are deploying our application and ArgoCD locally on Minikube. To simulate promotion between different environments, I am using namespaces.

### Argo CD

Argo CD is a declarative GitOps continuous deployment tool for Kubernetes that automates the deployment and synchronization of microservice applications with Git repositories. It follows GitOps principles and uses declarative configurations with a pull-based approach.

![ArgoCD Flow](https://cdn.hashnode.com/res/hashnode/image/upload/v1748345707461/f7484475-8867-48af-a36e-e97d68683a45.png)

Here’s a summary of the flow depicted in the above image:

1. The developer modifies application code and changes are pushed to a Git repository.
2. The CI pipeline is triggered and builds a new container image and pushes it to a container registry.
3. Merge triggers a webhook to notify Argo CD of changes in the Git repository.
4. Argo CD clones the updated Git repository. Compares the desired state (from Git) with the current state in the Kubernetes cluster.
5. Argo CD applies the necessary changes to bring the cluster to the desired state.
6. Kubernetes controllers reconcile resources until the cluster matches the desired configuration.
7. Argo CD continuously monitors the application and cluster state.
8. Argo CD can automatically or manually revert the changes to match the Git configuration, ensuring Git remains the single source of truth.

### Kargo

Kargo manages promotion by watching repositories (Git, Image, Helm) for changes and making the needed commits to your Git repository, while Argo CD takes care of reconciliation. Kargo is built to simplify multi-stage application promotion using GitOps principles, removing the need for custom automation or CI pipelines.

![Kargo (Source: Akuity Blog)](https://cdn.hashnode.com/res/hashnode/image/upload/v1748373053736/6c015e27-b47b-486a-bb6a-e581b0f29a30.webp)

#### Kargo Components

1. **Warehouse:** Watches image registries and discovers new container images. Monitors DockerHub for new tags like `v1.2.0`, `v1.2.1`, etc., and stores metadata about discovered images.
2. **Stage:** Defines a deployment environment (Dev, Stage, Prod). When a new image is found by the warehouse, it updates the manifest under `env/dev/` with the new image tag. This triggers Argo CD to sync the `dev` environment.
3. **PromotionPolicy:** Defines how promotion should happen between stages (for example, auto or manual).
4. **Freight:** An artifact version to be promoted (for example, a specific container image or Helm chart). When `v1.2.1` is discovered by the warehouse, a new **Freight** is created.

![Kargo Components](https://cdn.hashnode.com/res/hashnode/image/upload/v1748373806449/00c7a2e5-48af-43b9-b9fc-9463b55c1abb.png)

#### Practical Examples

- A new `v1.2.0` image is pushed to DockerHub.
- Kargo detects it via a **warehouse** and updates the `dev` environment.
- Once verified (either by tests or metrics), Kargo automatically updates Helm values in the Git repo for staging.
- Argo CD sees the Git change and syncs the new version to staging.
- Manual approval (via Slack or UI) is required to push to production.

#### Why Kargo is the Perfect Companion to Argo CD

Have you ever had to manually promote versions across environments and wished it were automated? How would integrating Kargo have saved time or prevented errors in your last deployment?

Argo CD excels at GitOps-driven continuous deployment - syncing your Kubernetes cluster with the desired state declared in Git. But it lacks native support for promotion workflows between environments (like dev → staging → production) based on image metadata, test results, or approval gates. This is where Kargo becomes the perfect companion.

![Kargo and Argo CD Comparison ](https://cdn.hashnode.com/res/hashnode/image/upload/v1748474195349/8e615222-067e-4958-aa8c-19a9f44e4d74.png)

Kargo doesn’t replace Argo CD - it extends it. You continue to use Argo CD for syncing and deploying apps, but Kargo adds promotion intelligence and automation.

---

## How to Structure Repositories for Microservice Applications

My example application consists of 4 microservices ([frontend (<VPIcon icon="iconfont icon-github"/>`nitheeshp-irl/microservice-frontend`)](https://github.com/nitheeshp-irl/microservice-frontend), [recommendation (<VPIcon icon="iconfont icon-github"/>`nitheeshp-irl/microservice-recommendation`)](https://github.com/nitheeshp-irl/microservice-recommendation), [catalogues (<VPIcon icon="iconfont icon-github"/>`nitheeshp-irl/microservice-catalogue`)](https://github.com/nitheeshp-irl/microservice-catalogue), and [voting (<VPIcon icon="iconfont icon-github"/>`nitheeshp-irl/microservice-voting`)](https://github.com/nitheeshp-irl/microservice-voting)). Designing your repository structure is very important to start your project. There is a lot of debate between monorepo and multi-service repo.

A **monorepo** is a unified repository that houses all the code for a project or a set of related projects. It consolidates code from various services, libraries, and applications into a single centralized location.

On the other hand, a **polyrepo** architecture comprises multiple repositories, each containing the code for a distinct service, library, or application component.

### Why a Polyrepo Fits My Microservice-Service App

Imagine you're onboarding a new team to your app. Would you prefer giving them access to an entire monorepo or just the relevant service’s repo? What trade-offs are you willing to accept?”

Well, using a polyrepo approach,

- Teams can work independently on the frontend, recommendations, catalogs, and voting without stepping on each other’s toes.
- Sensitive services remain locked down without complex directory-level rules.
- CI runners operate on a smaller codebase, speeding up checkouts and reducing bandwidth.
- Each service has its own release cadence (for example, `catalogues` v2.1.0 and `voting` v1.7.3).
- As your organization grows, new teams can onboard to only the repos they care about.
- Shared libraries can be versioned and published to an internal package registry, then consumed by each service.

### Git Branching is Anti Pattern to GitOps Principles

![Git Branching AntiPattern](https://cdn.hashnode.com/res/hashnode/image/upload/v1748376156187/f1fb6cc6-c5d1-4001-a8a1-63353cc03cd7.png)

Many teams default to “[GitFlow (<VPIcon icon="fa-brands fa-medium"/>`novai-devops-101`)](https://medium.com/novai-devops-101/understanding-gitflow-a-simple-guide-to-git-branching-strategy-4f079c12edb9)”-style branching - creating long-lived branches for <VPIcon icon="fas fa-code-branch"/>`dev`, <VPIcon icon="fas fa-code-branch"/>`staging`, <VPIcon icon="fas fa-code-branch"/>`prod`, and more. But in a true GitOps workflow, **Git is your control plane**, and “environments” shouldn’t live as branches.

Instead, you can keep things simple with just:

- A long-lived <VPIcon icon="fas fa-code-branch"/>`master` (or <VPIcon icon="fas fa-code-branch"/>`main`) branch
- Short-lived feature branches for code work

---

## How to Organize Kubernetes Manifests for GitOps

[This repo (<VPIcon icon="iconfont icon-github"/>`nitheeshp-irl/microservice-helmcharts`)](https://github.com/nitheeshp-irl/microservice-helmcharts) shows how you can keep ArgoCD application manifests, environment-specific values, Kargo promotion tasks, Helm charts for each microservice, and CI/CD workflows all in one place. It is organized so that:

1. **ArgoCD application manifests** live under <VPIcon icon="fas fa-folder-open"/>`argocd/`, split by environment (for example, <VPIcon icon="fas fa-folder-open"/>`dev/`, <VPIcon icon="fas fa-folder-open"/>`staging/`, <VPIcon icon="fas fa-folder-open"/>`prod/`).
2. **Environment-specific overrides** (Helm values or Kustomize patches) go under <VPIcon icon="fas fa-folder-open"/>`env/`.
3. **Kargo promotion configurations** are grouped under <VPIcon icon="fas fa-folder-open"/>`kargo/`, defining how new images move between environments.
4. **Service Helm charts** reside in <VPIcon icon="fas fa-folder-open"/>`service-charts/`, one chart per microservice.

```plaintext :collapsed-lines title="file structure"
/microservice-helmcharts/
├── argocd/                # ArgoCD application manifests
│   ├── application/       # Application definitions
│   │   ├── dev/           # Development environment applications
│   │   │   ├── catalogue.yaml
│   │   │   ├── catalogue-db.yaml
│   │   │   ├── frontend.yaml
│   │   │   ├── recommendation.yaml
│   │   │   ├── voting.yaml
│   │   │   └── kustomization.yaml
│   │   ├── staging/       # Staging environment applications
│   │   │   └── [similar structure as dev]
│   │   ├── prod/          # Production environment applications
│   │   │   └── [similar structure as dev]
│   │   └── craftista-project.yaml
│   ├── blog-post.md
│   ├── deployment-guide-blog.md
│   └── repository-structure.md
├── env/                   # Environment-specific configurations
│   ├── dev/               # Development environment values
│   │   ├── catalogue/
│   │   │   └── catalogue-values.yaml
│   │   ├── catalogue-db/
│   │   │   └── catalogue-db-values.yaml
│   │   ├── frontend/
│   │   │   └── frontend-values.yaml
│   │   ├── recommendation/
│   │   │   └── recommendation-values.yaml
│   │   ├── voting/
│   │   │   └── voting-values.yaml
│   │   └── kustomization.yaml
│   ├── staging/           # Similar structure as dev but with image files
│   └── prod/              # Similar structure as staging
├── kargo/                 # Kargo promotion configuration
│   ├── catalogue-config/  # Catalogue service promotion
│   │   ├── catalogue-promotion-tasks.yaml
│   │   ├── catalogue-stages.yaml
│   │   └── catalogue-warehouse.yaml
│   ├── frontend-config/   # Frontend service promotion
│   │   ├── frontend-promotion-tasks.yaml
│   │   ├── frontend-stages.yaml
│   │   └── frontend-warehouse.yaml
│   ├── recommendation-config/ # Recommendation service promotion
│   │   ├── recommendation-promotion-tasks.yaml
│   │   ├── recommendation-stages.yaml
│   │   └── recommendation-warehouse.yaml
│   ├── voting-config/     # Voting service promotion
│   │   ├── voting-promotion-tasks.yaml
│   │   ├── voting-stages.yaml
│   │   └── voting-warehouse.yaml
│   ├── kargo.yaml         # ArgoCD application for Kargo
│   ├── kustomization.yaml # Combines all Kargo resources
│   ├── project.yaml       # Kargo project definition
│   └── projectconfig.yaml # Project-wide promotion policies
├── service-charts/        # Helm charts for each microservice
│   ├── catalogue/         # Catalogue service chart
│   │   ├── templates/
│   │   │   ├── deployment.yaml
│   │   │   └── service.yaml
│   │   ├── Chart.yaml
│   │   └── values.yaml
│   ├── catalogue-db/      # Similar structure as catalogue
│   ├── frontend/          # Similar structure as catalogue
│   ├── recommendation/    # Similar structure as catalogue
│   └── voting/            # Similar structure as catalogue
├── .github/workflows/     # CI/CD workflows
│   └── docker-ci.yml      # Docker image build and push
└── README.md              # Repository documentation
```

### Argo CD Folders

The <VPIcon icon="fas fa-folder-open"/>`argocd/` directory contains all of the manifests that Argo CD needs in order to track, group, and deploy your microservices. In this guide, we break that directory into two main pieces:

1. **Argo CD Project Definition**
2. **Argo CD Application Manifests (organized by environment)**

#### ArgoCD Projects

```component VPCard
{
  "title": "Projects - Argo CD - Declarative GitOps CD for Kubernetes",
  "desc": "Projects provide a logical grouping of applications, which is useful when Argo CD is used by multiple teams. Projects provide the following features...",
  "link": "https://argo-cd.readthedocs.io/en/stable/user-guide/projects/",
  "logo": "https://argo-cd.readthedocs.io/assets/favicon.png",
  "background": "rgba(0,148,133,0.2)"
}
```

Before you can give Argo CD a set of Applications to manage, it’s often best practice to define a “Project.” A Project in Argo CD serves as a logical boundary around a group of Applications. It can control which Git repos those Applications are allowed to reference, which Kubernetes clusters/namespaces they can target, and even which resource kinds they can manage.

In our example repo, the file <VPIcon icon="iconfont icon-yaml"/>`craftisia-project.yaml` lives at the top of <VPIcon icon="fas fa-folder-open"/>`argocd/`:

```yaml :collapsed-lines title="argocd/craftisia-project.yaml"
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: craftisia
  namespace: argocd
spec:
  # 1) Which Git repos are we allowed to pull from?
  sourceRepos:
    - "https://github.com/nitheeshp-irl/microservice-helmcharts"
    # (Or you could use "*" to allow any repo, but this is less secure.)

  # 2) Which clusters/namespaces can these Apps be deployed to?
  destinations:
    - namespace: "*"
      server: "*"    # Allow deployment to any cluster (for a local Minikube demo, this is fine).

  # 3) Which kinds of Kubernetes resources may be created/updated?
  #    (For example, we want Pods, Services, Deployments, Ingresses, etc.)
  #    Argo CD will reject any manifest containing a disallowed kind.
  clusterResourceWhitelist:
    - group: ""            # core API group (Pods, Services, ConfigMaps, etc.)
      kind: Pod
    - group: "apps"        # deployments, statefulsets, etc.
      kind: Deployment
    - group: "networking.k8s.io"
      kind: Ingress
    # (You can list additional resource kinds as needed.)

  # 4) Optional: define role-based access control or sync policies at the project level.
  #    (Not shown here, but you could add roles, namespace resource quotas, etc.)
```

### 2. Argo CD Application Manifests (by Environment)

Inside <VPIcon icon="fas fa-folder-open"/>`argocd/`, there is a subdirectory called <VPIcon icon="fas fa-folder-open"/>`application/`. We use this to keep all of our Argo CD Application YAMLs, broken out by environment. The high-level layout looks like this:

```plaintext title="file structure"
rCopyEditargocd/
└── application/
    ├── dev/            # “Dev” environment Applications
    │   ├── catalogue.yaml
    │   ├── catalogue-db.yaml
    │   ├── frontend.yaml
    │   ├── recommendation.yaml
    │   ├── voting.yaml
    │   └── kustomization.yaml
    ├── staging/        # “Staging” environment Applications (same names/structure as dev/)
    │   └── […]
    └── prod/           # “Prod” environment Applications (same names/structure as dev/)
        └── […]
```

Each of those YAML files is a standalone **Argo CD Application**. An Application tells Argo CD:

1. Which project it belongs to (in our case, `craftisia`),
2. Where to find its manifests (a Git repo and path),
3. Which Kubernetes cluster and namespace to deploy into, and
4. How to keep itself up to date (that is, sync policies).

Below is a example of the <VPIcon icon="iconfont icon-yaml"/>`frontend.yaml` file for the **dev** environment:

```yaml :collapsed-lines title="argocd/application/dev/frontend.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: frontend-dev
  namespace: argocd
spec:
  project: craftisia

  # 1) Source: Where to find the Helm chart and which values file to use
  source:
    repoURL: https://github.com/nitheeshp-irl/microservice-helmcharts
    targetRevision: main
    path: service-charts/frontend       # Helm chart folder for the frontend service
    helm:
      valueFiles:
        - ../../env/dev/frontend/frontend-values.yaml

  # 2) Destination: Which cluster & namespace to deploy into
  destination:
    server: https://kubernetes.default.svc    # (Assumes Argo CD is running in-cluster)
    namespace: front-end-dev                   # A dedicated namespace for “dev” frontend

  # 3) Sync Policy: Automate synchronization and enable self-healing
  syncPolicy:
    automated:
      prune: true          # Delete resources that are no longer in Git
      selfHeal: true       # If someone manually changes live resources, revert to Git state
    syncOptions:
      - CreateNamespace=true  # If the namespace doesn’t exist, Argo CD will create it
```

You would repeat a similar pattern under <VPIcon icon="fas fa-folder-open"/>`argocd/application/staging/` and <VPIcon icon="fas fa-folder-open"/>`argocd/application/prod/` - each environment has its own <VPIcon icon="iconfont icon-yaml"/>`frontend.yaml`, <VPIcon icon="iconfont icon-yaml"/>`catalogue.yaml`, and so on, but each will point to a different values file under <VPIcon icon="fas fa-folder-open"/>`env/staging/…` or <VPIcon icon="fas fa-folder-open"/>`env/prod/…` and likely deploy into a different namespace (for example, `front-end-staging`, `front-end-prod`).

### Env Folders

The <VPIcon icon="fas fa-folder-open"/>`/env` directory is a critical part of our GitOps implementation, containing all environment-specific configurations for our microservices. Each environment (dev, staging, prod) has its own subdirectory containing service-specific configurations. These contain general **Helm chart** values like resource limits and replica counts and container image repository and tag.

```yaml
image:
  repository: nitheesh86/microservice-frontend
  tag: 1.0.11

replicaCount: 2

resources:
  limits:
    memory: "512Mi"
  requests:
    cpu: "100m"
    memory: "128Mi"
```

### Kargo Folders

Our Kargo setup is organized in the <VPIcon icon="fas fa-folder-ope"/>`/kargo` directory with several key components:

```plaintext title="file structure"
/kargo/
├── catalogue-config/           # Catalogue service promotion configuration
│   ├── catalogue-promotion-tasks.yaml  # Defines how to update catalogue images
│   ├── catalogue-stages.yaml           # Dev, staging, prod stages for catalogue
│   └── catalogue-warehouse.yaml        # Monitors catalogue image repository
├── frontend-config/            # Frontend service promotion configuration
│   ├── frontend-promotion-tasks.yaml   # Defines how to update frontend images
│   ├── frontend-stages.yaml            # Dev, staging, prod stages for frontend
│   └── frontend-warehouse.yaml         # Monitors frontend image repository
├── recommendation-config/      # Recommendation service promotion configuration
│   ├── recommendation-promotion-tasks.yaml  # Image update workflow
│   ├── recommendation-stages.yaml           # Environment stages
│   └── recommendation-warehouse.yaml        # Image monitoring
├── voting-config/              # Voting service promotion configuration
│   ├── voting-promotion-tasks.yaml     # Image update workflow
│   ├── voting-stages.yaml              # Environment stages
│   └── voting-warehouse.yaml           # Image monitoring
├── kargo.yaml                  # ArgoCD application for Kargo installation
├── kustomization.yaml          # This file - combines all resources
├── project.yaml                # Defines the Kargo project
└── projectconfig.yaml          # Project-wide promotion policies
```

**Stage Configurations:** Kargo uses the concept of "stages" to represent our deployment environments. Each stage defines:

- Which freight (container images) to deploy
- The promotion workflow to execute
- Environment-specific variables

**Warehouse Configuration:** The warehouse monitors our container registry for new images.

**Promotion Tasks:** Promotion tasks define the actual workflow for promoting between environments.

---

## How to Deploy and Promote Your Craftista Microservices Application

Now I'll explain how to deploy your Craftista microservices application using Argo CD.

![ArgoCD Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1748558624685/9f0d5725-cc8a-4e37-851c-d4ab2870bafc.png)

::: note Prerequisites

- **A local Kubernetes cluster**: We’ll use Minikube for local development.
- **kubectl and helm**: Ensure both are installed and configured.
- **Git Clone of the microservice-helmcharts Repo**:

```sh
git clone https://github.com/nitheeshp-irl/microservice-helmcharts.git
cd microservice-helmcharts
```

:::

### 1. Start Minikube

Start Minikube with the specified resources:

```sh
minikube start --memory=4096 --cpus=2
kubectl config use-context minikube
```

Adjust `--memory` and `--cpus` as needed for your machine.

### 2. Install Argo CD

Create a namespace:

```sh
kubectl create namespace argocd
```

Apply the official install manifest:

```sh
kubectl apply -n argocd \
-f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### 3. Access the Argo CD UI

Port-forward the server:

```sh
kubectl port-forward svc/argocd-server \
-n argocd 8080:443
```

**Login**:

- Username: `admin`
- Password:

```sh
kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d
```

Open your browser at `http://localhost:8080`.

### 4. Define a “Craftista” Argo CD Project

Scope Repos, Clusters, and Namespaces:

```sh
kubectl apply -f argocd/application/craftista-project.yaml
#
# project.argoproj.io/craftista created
```

### 5. Deploy the Development Environment

Create Argo CD applications:

```sh
kubectl apply -f argocd/application/dev/
```

Argo CD will:

- Clone the microservice-helmcharts repo.
- Render each Helm chart with its `env/dev/*-values.yaml`.
- Create Deployment, Service, and so on in your dev namespaces.
- Continuously reconcile desired vs. actual state.

Monitor your progress:

```sh
argocd app list
argocd app get frontend-dev
```

### 6. Manual Promotion (Staging & Prod)

Edit the image tag or other values:

- <VPIcon icon="fas fa-folder-open"/>`env/staging/<service>/`<VPIcon icon="iconfont icon-yaml"/>`<service>-values.yaml`
- <VPIcon icon="fas fa-folder-open"/>`env/prod/<service>/`<VPIcon icon="iconfont icon-yaml"/>`<service>-values.yaml`

Commit and push the changes:

```sh
git add env/staging env/prod
git commit -m "Promote v1.2.0 → staging & prod"
git push
```

Argo CD will detect the Git change and automatically sync your staging and prod applications (if automated sync is enabled).

### 7. Automated Promotion with Kargo

![Kargo DashBoard](https://cdn.hashnode.com/res/hashnode/image/upload/v1748689354529/3759ec0c-7db4-42a8-9f01-f0792dfec895.png)

First, install Kargo:

```sh
kubectl apply -f kargo/kargo.yaml
```

Configure promotion tasks, stages, and warehouse:

```sh
kubectl apply -k kargo/
# 
# apiVersion: kustomize.config.k8s.io/v1beta1
# kind: Kustomization
# 
# resources:
#   - project.yaml
#   - projectconfig.yaml
#   - catalogue-config/catalogue-warehouse.yaml
#   - catalogue-config/catalogue-stages.yaml
#   - catalogue-config/catalogue-promotion-tasks.yaml
#   - frontend-config/frontend-warehouse.yaml
#   - frontend-config/frontend-stages.yaml
#   - frontend-config/frontend-promotion-tasks.yaml
#   - recommendation-config/recommendation-warehouse.yaml
#   - recommendation-config/recommendation-stages.yaml
#   - recommendation-config/recommendation-promotion-tasks.yaml
#   - voting-config/voting-warehouse.yaml
#   - voting-config/voting-stages.yaml
#   - voting-config/voting-promotion-tasks.yaml
```

---

## How the GitOps Pipeline Works

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748885521249/285bcaed-447d-4a31-87cb-98b531d9cb0d.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748557162526/f4716cfc-a71f-4ddc-bc58-7a42118c3190.png)

1. **Developer Opens a Pull Request**: The journey begins when a developer opens a pull request on one of the microservice repos. This signals that new code (feature, bugfix, config change) is ready to be integrated.
2. **CI (GitHub Actions)**
    - **CI: Lint → Test → Build & Tag**: A single workflow job lints the code, runs unit/integration tests, builds the Docker image, and applies a semantic tag (for example, v1.2.0).
    - **CI OK? (Decision)**:
      - If **No**, the pipeline stops and the developer is notified to fix errors.
      - If **Yes**, the newly built image is pushed to the container registry (DockerHub, ECR, and so on).
3. **Kargo**
    - **Warehouse discovers new image tag**: Kargo’s Warehouse component continuously watches your registry. As soon as it sees the new tag, it records that image metadata.
    - **Update env/dev values → Git**: Kargo automatically commits an update to <VPIcon icon="fas fa-folder-open"/>`env/dev/<service>/`<VPIcon icon="iconfont icon-yaml"/>`…-values.yaml`, pointing the dev Helm values file to the new image tag. This Git commit will drive the next step.
4. **GitOps (Argo CD)**
5. **Argo CD sync dev**: Argo CD sees the Git change in the dev values file and pulls it into the cluster, reconciling the actual dev namespace with the desired state.
    - **Dev deployment healthy? (Decision)**:
      - If **No**, Argo CD can optionally roll back and notifies the team (via Slack, email, etc.) of the failed dev rollout.
      - If **Yes**, it’s time to promote to staging.
    - **Update env/staging values → Git**: Kargo (or you, if manual) commits the same image tag into <VPIcon icon="fas fa-folder-open"/>`env/staging/<service>/`<VPIcon icon="iconfont icon-yaml"/>`…-values.yaml`.
      - **Argo CD sync staging**: Argo CD deploys that change to the staging namespace.
      - **Staging approval granted? (Decision)**:
        - If **No**, Kargo waits (and optionally notifies) until a manual gate is lifted.
        - If **Yes**, the final promotion commit is made: updating <VPIcon icon="fas fa-folder-open"/>`env/prod/<service>/`<VPIcon icon="iconfont icon-yaml"/>`…-values.yaml`.
      - **Argo CD sync prod → End**: Argo CD applies the production change, completing the pipeline from commit all the way to live production rollout.

### Pipeline Summary

1. Developer opens PR → CI tests and builds → Docker image pushed
2. Kargo Warehouse detects new tag → Git commit to `env/dev`
3. Argo CD syncs dev → Health check → (if successful) commit to `env/staging`
4. Argo CD syncs staging → Approval → commit to `env/prod`
5. Argo CD syncs prod → Live deployment complete

Every stage must pass its health or approval check before the next begins, ensuring that only thoroughly tested and validated code makes it into production.

---

## Conclusion

Building a real-world CI/CD pipeline isn’t just about getting code from your laptop into a Kubernetes cluster - it’s about creating a repeatable, auditable, and reliable system that scales with your team and your application complexity.

In this guide, we walked through how I built a complete GitOps-based promotion pipeline using GitHub Actions, Argo CD, and Kargo, all driven by a hands-on microservices project: Craftista. From the first code commit to automated environment promotion, we leveraged industry best practices like semantic versioning, declarative infrastructure, and environment-based GitOps directories.

What makes this approach powerful is not just the tools but also the principles. By treating Git as the single source of truth, and using Kargo to automate what was traditionally a manual and fragile promotion process, we gain predictability and control over our deployments. Argo CD ensures that what’s in Git is always what’s running in our clusters, while Kargo eliminates human error in multi-stage rollouts.

If you’re tired of overly abstract “hello world” DevOps tutorials and want to get your hands dirty with something that feels **real**, Craftista offers the perfect sandbox. This pipeline reflects how teams operate in production - polyglot services, independent deployments, environment promotion gates, and GitOps as the operational backbone.

Whether you're a DevOps engineer sharpening your skills, or a platform team setting standards for internal development, I hope this tutorial provided the clarity and inspiration to build your own commit-to-production pipeline - step by step, with confidence.

### Further Reading & Resources

```component VPCard
{
  "title": "Argo CD - Declarative GitOps CD for Kubernetes",
  "desc": "Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.",
  "link": "https://argo-cd.readthedocs.io/en/stable/",
  "logo": "https://argo-cd.readthedocs.io/assets/favicon.png",
  "background": "rgba(0,148,133,0.2)"
}
```

```component VPCard
{
  "title": "Home | Kargo Docs",
  "desc": "Learn how to use Kargo for GitOps promotions",
  "link": "https://docs.kargo.io/",
  "logo": "https://docs.kargo.io/img/kargo.png",
  "background": "rgba(232,120,120,0.2)"
}
```

<SiteInfo
  name="GitHub Actions documentation - GitHub Docs"
  desc="Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow."
  url="https://docs-internal.github.com/en/actions/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

<SiteInfo
  name="How to Model Your GitOps Environments and Promote Releases between Them"
  desc="Learn how to model your GitOps environments using different folders on the same Git branch, and how to handle environment promotion."
  url="https://codefresh.io/blog/how-to-model-your-gitops-environments-and-promote-releases-between-them//"
  logo="https://codefresh.io/wp-content/uploads/2023/04/cropped-favicon_codefresh.webp"
  preview="https://codefresh.io/wp-content/uploads/2022/03/old-social.jpg"/>

<SiteInfo
  name="craftista/craftista"
  desc="Craftista - The Origami Store is a Devops Learning App created by School of Devops."
  url="https://github.com/craftista/craftista/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a9140d630eeb4280c51dc7756b5eb320c1e12398b48bfb1de28b8e88439f4df8/craftista/craftista"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From Commit to Production: Hands-On GitOps Promotion with GitHub Actions, Argo CD, Helm, and Kargo",
  "desc": "Have you ever wanted to go beyond ‘hello world’ and build a real, production-style CI/CD pipeline - starting from scratch? Let’s pause for a moment: what are you trying to learn from your DevOps journey? Are you focusing on GitOps-style deployments, ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/from-commit-to-production-hands-on-gitops-promotion-with-github-actions-argo-cd-helm-and-kargo.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
