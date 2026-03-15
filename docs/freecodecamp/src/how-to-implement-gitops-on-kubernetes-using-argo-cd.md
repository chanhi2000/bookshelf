---
lang: en-US
title: "How to Implement GitOps on Kubernetes Using Argo CD"
description: "Article(s) > How to Implement GitOps on Kubernetes Using Argo CD"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Github
  - Github Actions
  - ArgoCD
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - k8s
  - kubernetes
  - github
  - githubactions
  - github-actions
  - argo
  - argocd
  - argo-cd
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement GitOps on Kubernetes Using Argo CD"
    - property: og:description
      content: "How to Implement GitOps on Kubernetes Using Argo CD"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-gitops-on-kubernetes-using-argo-cd.html
prev: /devops/k8s/articles/README.md
date: 2026-03-18
isOriginal: false
author:
  - name: Olumoko Moses
    url: https://freecodecamp.org/news/author/mosesolumoko/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2fe40cbd-1b8a-4cc6-a721-45cc20a80c76.png
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
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
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
  name="How to Implement GitOps on Kubernetes Using Argo CD"
  desc="If you’re still running kubectl apply from your local terminal, you aren’t managing a cluster, you’re babysitting one. I’ve spent more nights than I care to admit staring at a terminal, trying to figu"
  url="https://freecodecamp.org/news/how-to-implement-gitops-on-kubernetes-using-argo-cd"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2fe40cbd-1b8a-4cc6-a721-45cc20a80c76.png"/>

If you’re still running `kubectl apply` from your local terminal, you aren’t managing a cluster, you’re babysitting one.

I’ve spent more nights than I care to admit staring at a terminal, trying to figure out why a staging environment suddenly "broke" even though no one supposedly touched it.

We’ve all been there, right? a manual edit here, a quick hotfix there, and suddenly your Git repository is no longer a Source of Truth, it’s a historical document of what used to be running.

Without a reliable strategy, Kubernetes deployments quickly descend into a mess of drift, painful rollbacks, and non-existent audit trails. I learned the hard way that simply storing manifests in Git isn't enough. If your cluster isn't actively listening to your code, you're still working with a gap.

GitOps closes that gap. It turns your cluster into a mirror of your repository. If it isn't in Git, it doesn't exist.

In this tutorial, you aren't just going to read about the theory. You’re going to implement a "Zero-Touch" deployment loop from scratch. We’ll use Argo CD, GitHub Actions, and the Argo CD Image Updater to build a system that builds, tags, and deploys your code the second you hit `git push`.

![Architecture diagram of a complete GitOps CI/CD workflow. A developer pushes code to a GitHub repository, triggering a GitHub Actions pipeline that builds and pushes a new Docker image to DockerHub. The Argo CD Image Updater polls DockerHub for the new tag and commits the change back to the GitHub repository. Finally, the Argo CD Server detects the updated manifest in Git and syncs the changes to the live Kubernetes cluster.](https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/93b61e74-66c3-47d7-aeff-f7a69d0d7390.jpg)

::: note Prerequisites

Before you begin, make sure you have the following ready in your environment:

- **A GitHub repository:** You'll need a repository (for example, `my-gitops-demo`) to serve as your Single Source of Truth. If you're following this tutorial from scratch, start with an empty repo.
- **A DockerHub account:** This will act as your Container Registry. You’ll need this to build, push, and store the Docker images that GitHub Actions creates.
- **A running Kubernetes cluster:** You can use a local solution like Minikube or Kind, or a cloud-managed service like Amazon EKS or GKE.
- **Kubernetes tooling:** Ensure `kubectl` is installed and configured to communicate with your cluster.
- **Fundamental K8s knowledge:** You should be comfortable with basic Kubernetes concepts like Pods, Deployments, and Services.

:::

::: note Note for Readers with Existing Projects

If you already have a project and want to migrate it to this GitOps workflow, you don't need to start over. You can adapt your existing repository by following these three steps:

1. Standardize your manifests: Move all your existing Kubernetes YAML files into a dedicated Kubernetes-manifest/ directory at the root of your project.
2. Containerize your services: Ensure every service you intend to deploy has a Dockerfile in its respective subdirectory (for example, /main-api/Dockerfile).
3. Prepare for automation: Be ready to replace any manual kubectl apply steps in your current CI pipeline with the automated tagging strategy we’ll implement in the next sections.

:::

---

## What GitOps Really Means

At its core, GitOps is an operational framework that uses Git as the single source of truth for your infrastructure and applications. In a traditional setup, you might run `kubectl apply -f deployment.yaml` from your laptop. This makes it impossible to track who changed what, leading to "snowflake" clusters that no one can reproduce.

GitOps enforces four key principles:

1. **Declarative:** You describe the *desired* state (for example, "3 replicas of Nginx"), not the commands to get there.
2. **Versioned and immutable:** Your entire state is in Git. If a deployment fails, you `git revert` to a previous known-good state.
3. **Pulled automatically:** A software agent (Argo CD) pulls the state from Git.
4. **Continuously reconciled:** The system constantly fixes "drift." If a developer manually changes a service in the cluster, Argo CD will overwrite it to match Git.

---

## What is Argo CD and How Does it Implement GitOps

Before we dive into the setup, let’s define the tool we'll be working with.

Argo CD is a declarative, GitOps' continuous delivery engine built specifically for Kubernetes. As a graduated project of the Cloud Native Computing Foundation (CNCF), it has become the industry standard for managing modern infrastructure.

Think of Argo CD as a persistent watchdog that lives inside your cluster. To understand why it's so powerful, we have to look at how it differs from traditional CI/CD tools like Jenkins or GitHub Actions.

### The "Push" vs. "Pull" Model

Traditional tools like the one I mentioned above use a **"Push" model**. In this setup, an external pipeline sends commands (like `kubectl apply`) into your cluster. This is risky because you must store sensitive cluster administrative keys inside your external CI tool. If your CI tool is compromised, your cluster is, too.

Argo CD flips this script using a **"Pull"** **model**:

- **The bridge:** It sits between your Git repo (the "Desired State") and your cluster (the "Live State").
- **Continuous monitoring:** It watches your Git repo 24/7. The moment it detects a new commit, it "pulls" that change and applies it from *inside* the cluster.
- **Self-healing:** If someone manually changes a setting in the cluster (known as "drift"), Argo CD detects the discrepancy and automatically overwrites it to match what is written in Git.

This approach is not only more secure, since no cluster credentials ever leave the environment, but it also ensures that your infrastructure is a perfect, predictable mirror of your code.

---

## Preparing the Application Source Code

Before we automate the build, we need actual code in our repository. We'll create two simple microservices: a Main API and an Auxiliary Service.

### Repo Structure

Ensure your repository follows this structure exactly. Consistency in naming is vital for the automation to find your files.

```sh title="file structure"
GITOPS-ARGOCD-DEMO/
├── .github/workflows/main.yml
├── auxiliary-service/
│   └── Dockerfile
├── main-api/
│   └── Dockerfile
├── Kubernetes-manifest/
│   ├── aux-api.yaml
│   ├── kustomization.yaml
│   └── main-api.yaml
├── application.yaml
└── image-updater.yaml
```

### Create the Dockerfiles

In each service folder, create a simple <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` so our pipeline has something to build.

```dockerfile title="main-api/Dockerfile"
FROM nginx:alpine
RUN echo "<h1>Main API - Version 1.0</h1>" > /usr/share/nginx/html/index.html
EXPOSE 80
```

```dockerfile title="auxiliary-service/Dockerfile"
FROM nginx:alpine
RUN echo "<h1>Auxiliary Service - Version 1.0</h1>" > /usr/share/nginx/html/index.html
EXPOSE 80
```

---

## Automating Image Builds with GitHub Actions

In a professional GitOps workflow, your Kubernetes manifests and your application source code often live in the same repository (or linked ones). While Argo CD handles the deployment, you still need a way to turn your code into Docker images. This is where **Continuous Integration (CI)** comes in.

I have included a GitHub Actions workflow in this demo to automate this. Every time you push code to the `main` branch, this pipeline builds your images and pushes them to DockerHub.

### The CI Pipeline Workflow

Create a file at <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`main.yml` and add the following:

```yaml :collapsed-lines title=".github/workflows/main.yml"
name: Build and Push Image to DockerHub

on:
  push:
    branches:
      - main
    # Skip builds for image updater commits
    paths-ignore:
      - 'Kubernetes-manifest/**'

jobs:
  docker_build:
    name: Build & Push ${{ matrix.service }}
    environment: argocd-demo
    runs-on: ubuntu-latest
    permissions:
      contents: write

    strategy:
      matrix:
        include:
          - service: aux-service
            dockerfile: auxiliary-service/Dockerfile
          - service: main-service
            dockerfile: main-api/Dockerfile

    env:
      DOCKER_USER: ${{ secrets.DOCKERHUB_USERNAME }}
      RUN_TAG: ${{ github.run_number }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ env.DOCKER_USER }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}

      - name: Build and Push ${{ matrix.service }}
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ${{ matrix.dockerfile }}
          push: true
          tags: \({{ env.DOCKER_USER }}/\){{ matrix.service }}:${{ env.RUN_TAG }}
          cache-from: type=gha,scope=${{ matrix.service }}
          cache-to: type=gha,mode=max,scope=${{ matrix.service }}
```

::: tip Pro tip

The `paths-ignore` section is critical. Later, the Argo CD Image Updater will write changes back to the <VPIcon icon="fas fa-folder-open"/>`Kubernetes-manifest/` folder. Without this ignore rule, your pipeline would trigger itself forever in an infinite loop.

:::

::: note

You must add `DOCKERHUB_USERNAME` and `DOCKERHUB_PASSWORD` to your GitHub Repo Settings > Secrets.

:::

---

## How to Install and Access Argo CD

Now that your cluster is running, you can install Argo CD. You'll perform the installation using a standard Kubernetes manifest provided by the Argo project.

### Step 1: Create the Namespace and Apply the Manifests

In Kubernetes, it is a best practice to keep your administrative tools separate from your applications. You will create a dedicated namespace named `argocd` and then apply the official installation script from the Argo project. This script includes all the necessary ServiceAccounts, Roles, and Deployments.

Run the following commands in your terminal:

```sh
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

You'll see a long list of resources being created. Wait a minute or two for the pods to initialize. you can verify that all the core components of Argo CD are running.:

```sh
kubectl get all -n argocd
```

Ensure all pods show a status of `Running` before proceeding.

### Step 2: Access the Argo CD User Interface

To access the dashboard, we use a technique called **port forwarding**. Since the Argo CD server is running inside the cluster's private network, your browser can't see it yet. Port forwarding creates a secure 'tunnel' between a port on your local machine (8080) and a port on the cluster service (443). This allows you to interact with internal services without exposing them to the public internet.

Run the following command:

```sh
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

You can now open your browser and navigate to `https://localhost:8080`. Your browser may warn you that the connection is not private because of a self-signed certificate. You can safely click "Advanced" and proceed to the site.

### Step 3: How to Log In

The default username for Argo CD is `admin`. The password is autogenerated during the installation process and is stored securely as a Kubernetes secret.

To retrieve this password, open a new terminal tab (so the port-forwarding keeps running) and run:

```sh
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```

Copy the output and use it as the password to log into the dashboard.

---

## Understanding the Argo CD Application

An Argo CD **Application** is a Custom Resource (CRD) that acts as a "contract" between your Git repo and your cluster. It defines:

- `repoURL` & `path`: This tells Argo CD exactly which Git repository to watch and which folder inside that repo contains your YAML manifests.
- `destination`: This defines where the app should live. We use `https://kubernetes.default.svc` to point to the local cluster where Argo CD is installed.
- `syncPolicy`: This is the heart of GitOps. By setting `automated` with `selfHeal: true`, we tell Argo CD to automatically fix the cluster if someone manually changes something (drift). The `prune: true` setting ensures that if you delete a file in Git, it also gets deleted in the cluster.

### The Application Manifest

Create <VPIcon icon="iconfont icon-yaml"/>`application.yaml` in your project root:

```yaml title="application.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: gitops-argocd-demo
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
    targetRevision: HEAD
    path: Kubernetes-manifest
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd-demo-ns
  syncPolicy:
    automated:
      selfHeal: true
      prune: true
    syncOptions:
      - CreateNamespace=true
```

### Deploying the Application Manifest

Now we'll define our Kubernetes resources in the <VPIcon icon="fas fa-folder-open"/>`Kubernetes-manifest/` folder.

```yaml title="Kubernetes-manifest/main-api.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: main-deployment
  namespace: argocd-demo-ns
spec:
  replicas: 1
  selector:
    matchLabels:
      app: main-api
  template:
    metadata:
      labels:
        app: main-api
    spec:
      containers:
      - name: main-service
        image: <YOUR_DOCKERHUB_USERNAME>/main-service:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: main-service-lb
  namespace: argocd-demo-ns
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: main-api
```

```yaml title="Kubernetes-manifest/aux-api.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aux-deployment
  namespace: argocd-demo-ns
spec:
  replicas: 2
  selector:
    matchLabels:
      app: aux-service
  template:
    metadata:
      labels:
        app: aux-service
    spec:
      containers:
      - name: aux-service
        image: <YOUR_DOCKERHUB_USERNAME>/aux-service:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: aux-service
  namespace: argocd-demo-ns
spec:
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: aux-service
```

---

## Push and Sync

### Step 1: Apply the Application Manifest

Use `kubectl` to deploy this manifest into the `argocd` namespace:

```sh
kubectl apply -f application.yaml -n argocd
```

### Step 2: Push to Your Repository

To trigger the initial deployment and ensure Argo CD stays in sync with your source of truth, add, commit, and push your latest changes to the GitHub repository you configured in the manifest:

```sh
git add .
git commit -m "initial argo application deployment"
git push origin main
```

### Step 3: Verify the Result in Argo CD

Once you push your changes, head over to your Argo CD dashboard. You'll see the `gitops-argocd-demo` application appear. After the initial sync, the dashboard will display a healthy, green status indicating that your live cluster state perfectly matches your Git repository.

![Argo CD dashboard showing the gitops-argocd-demo application in a Healthy and Synced state. The resource tree displays the hierarchy of services, deployments, replica sets, and pods running in the cluster.](https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7d37a8bd-c913-4393-b82c-ab0adc875574.jpg)

::: note

As you can see in the screenshot above, Argo CD provides a visual representation of how your Kubernetes objects – Services, Deployments, and Pods – are related and confirms they are "Synced" with your Git repo.

:::

---

## Automating Updates with Argo CD Image Updater

Now that we have automated the deployment, let’s solve the final manual hurdle: automatically updating image tags in our manifests whenever a new build is pushed to DockerHub.

### Step 1: Install ArgoCD Image Updater

Install the Image Updater into the `argocd` namespace:

```sh
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/config/install.yaml
```

Verify the pod is running:

```sh
kubectl get pods -n argocd | grep image-updater
```

::: note

Version 1.1+ uses a CRD-based approach (`ImageUpdater` custom resources) instead of the annotation-based approach used in older versions. This guide covers the CRD method.

:::

### Step 2: Create a GitHub Personal Access Token

The Image Updater needs Git credentials to push write-back commits to your repository.

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click Generate new token
3. Select the `repo` scope (full control of private repositories)
4. Copy the generated token

### Step 3: Create the Git Credentials Secret

Store the GitHub credentials as a Kubernetes secret in the `argocd` namespace:

```sh
kubectl -n argocd create secret generic git-creds \
--from-literal=username=<YOUR_GITHUB_USERNAME> \
--from-literal=password=<YOUR_GITHUB_PAT>
```

Replace `<YOUR_GITHUB_USERNAME>` and `<YOUR_GITHUB_PAT>` with your actual values.

### Step 4: Add a Kustomization File to Your Manifests

The Image Updater uses Kustomize's `images` field to write updated tags. If your <VPIcon icon="fas fa-folder-open"/>`Kubernetes-manifest/` directory contains plain YAML files, you'll need to wrap them with a <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` file.

Create a <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` file:

```yaml title="Kubernetes-manifest/kustomization.yaml"
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - main-api.yaml
  - aux-api.yaml
```

::: info How it works

When the Image Updater detects a new tag, it appends an `images` section to this file:

```yaml
images:
  - name: <YOUR_GITHUB_USERNAME>/main-service
    newTag: "12"
  - name: <YOUR_GITHUB_USERNAME>/aux-service
    newTag: "12"
```

Kustomize then overrides the image tags at deploy time, without modifying your original deployment YAML files.

:::

We use Kustomize here because it allows the Image Updater to manage image tags in a separate, clean way. Instead of the Updater 'messing' with your original <VPIcon icon="iconfont icon-yaml"/>`main-api.yaml` file, it simply updates the <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` file. Argo CD then uses Kustomize to merge those changes during deployment.

### Step 5: Create the ImageUpdater Custom Resource

Create <VPIcon icon="iconfont icon-yaml"/>`image-updater.yaml` in your project root:

```yaml title="image-updater.yaml"
apiVersion: argocd-image-updater.argoproj.io/v1alpha1
kind: ImageUpdater
metadata:
  name: gitops-argocd-demo-updater
  namespace: argocd
spec:
  commonUpdateSettings:
    updateStrategy: newest-build
    allowTags: "regexp:^[0-9]+$"
  applicationRefs:
    - namePattern: "gitops-argocd-demo"
      writeBackConfig:
        method: "git:secret:argocd/git-creds"
        gitConfig:
          branch: main
          writeBackTarget: "kustomization:."
      images:
        - alias: main-service
          imageName: <YOUR_DOCKERHUB_USERNAME>/main-service
        - alias: aux-service
          imageName: <YOUR_DOCKERHUB_USERNAME>/aux-service
```

This ImageUpdater resource is the **"brain"** of our automated tagging system. Here is what the specific fields are doing:

#### `updateStrategy:`

- `newest-build:` It tells the updater to always look for the most recent image version in DockerHub based on creation time.
- `writeBackConfig:` This is where the magic happens. It uses the git-creds secret we created to authorize the updater to 'write' back to your repository.

#### `writeBackTarget:`

- `kustomization:` We are telling the updater specifically to modify the kustomization.yaml file in the manifests folder rather than touching the deployment files directly.

- `images:` We provide aliases (main-service and aux-service) so the updater knows exactly which images in DockerHub correspond to which containers in our Kubernetes manifests.

**Apply the ImageUpdater CR to the cluster:**

```sh
kubectl apply -f image-updater.yaml -n argocd
```

Push the kustomization.yaml to your Git repository (the Image Updater clones the repo, so it must exist remotely):

```sh
git add Kubernetes-manifest/kustomization.yaml
git commit -m "Add kustomization.yaml for image updater write-back"
git push origin main
```

### Step 6: Verify the Image Updater

Check the Image Updater logs to confirm it's working:

```sh
kubectl logs -n argocd deployment/argocd-image-updater-controller --tail=20
#
# Successful output looks like:
#
# msg="Starting image update cycle, considering 1 application(s) for update"
# msg="Setting new image to YOUR_DOCKERHUB_USERNAME/main-service:11"
# msg="Successfully updated image 'YOUR_DOCKERHUB_USERNAME/main-service:7' to 'YOUR_DOCKERHUB_USERNAME/main-service:11'"
# msg="Setting new image to YOUR_DOCKERHUB_USERNAME/aux-service:11"
# msg="Committing 2 parameter update(s) for application gitops-argocd-demo"
# msg="git push origin main"
# msg="Successfully updated the live application spec"
# msg="Processing results: applications=1 images_considered=2 images_skipped=0 images_updated=2 errors=0"
```

---

## Conclusion

You have successfully implemented a professional-grade GitOps loop from scratch. By integrating GitHub Actions, Argo CD, and the Argo CD Image Updater, you’ve bridged the gap between your source code and your live environment.

Think about the workflow you just built:

1. You push code to GitHub.
2. GitHub Actions builds and tags a fresh Docker image.
3. Argo CD Image Updater detects that new tag and automatically commits it back to your Git manifests.
4. Argo CD pulls those changes and reconciles your cluster to the new desired state.

No more manual `kubectl apply`, no more configuration drift, and no more 2:00 AM mysteries. Your Git repository is now truly the Single Source of Truth. If it isn't in Git, it doesn't exist in your cluster, and that is the ultimate DevOps superpower.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement GitOps on Kubernetes Using Argo CD",
  "desc": "If you’re still running kubectl apply from your local terminal, you aren’t managing a cluster, you’re babysitting one. I’ve spent more nights than I care to admit staring at a terminal, trying to figu",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-gitops-on-kubernetes-using-argo-cd.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
