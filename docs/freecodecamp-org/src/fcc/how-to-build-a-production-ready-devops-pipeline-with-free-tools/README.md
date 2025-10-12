---
lang: en-US
title: "How to Build a Production-Ready DevOps Pipeline with Free Tools"
description: "Article(s) > How to Build a Production-Ready DevOps Pipeline with Free Tools"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Docker
  - Kubernetes
  - Terraform
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - docker
  - k8s
  - kubernetes
  - terraform
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Production-Ready DevOps Pipeline with Free Tools"
    - property: og:description
      content: "How to Build a Production-Ready DevOps Pipeline with Free Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-production-ready-devops-pipeline-with-free-tools/
prev: /articles/README.md
date: 2025-04-29
isOriginal: false
author:
  - name: Opaluwa Emidowojo
    url : https://freecodecamp.org/news/author/Tech-On-Diapers/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745864420670/f36eb4a7-a24e-4d6e-859f-db7249ae0da0.png
---

# {{ $frontmatter.title }} 관련

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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
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
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Production-Ready DevOps Pipeline with Free Tools"
  desc="A few months ago, I dove into DevOps, expecting it to be an expensive journey requiring costly tools and infrastructure. But I discovered you can build professional-grade pipelines using entirely free resources. If DevOps feels out of reach because y..."
  url="https://freecodecamp.org/news/how-to-build-a-production-ready-devops-pipeline-with-free-tools"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745864420670/f36eb4a7-a24e-4d6e-859f-db7249ae0da0.png"/>

A few months ago, I dove into DevOps, expecting it to be an expensive journey requiring costly tools and infrastructure. But I discovered you can build professional-grade pipelines using entirely free resources.

If DevOps feels out of reach because you’re also concerned about the cost, don't worry. I’ll guide you step-by-step through creating a production-ready pipeline without spending a dime. Let's get started!

---

::: note 🛠 Prerequisites

- **Basic Git knowledge**: Cloning repos, creating branches, committing code, and creating PRs
- **Familiarity with command line**: For Docker, Terraform, and Kubernetes
- **Basic understanding of CI/CD**: Continuous integration/delivery concepts and pipelines

**Accounts needed:**

- GitHub account
- At least one cloud provider: AWS Free Tier (recommended), Oracle Cloud Free Tier, or Google Cloud/Azure with free credits
- Terraform Cloud (free tier) for infrastructure state management
- Grafana Cloud (free tier) for monitoring
- UptimeRobot (free tier) for external availability checks

**Tools to Install Locally**

| **Tool** | Purpose | Installation Link |
| ---: | --- | --- |
| **Git** | Version control | [<VPIcon icon="iconfont icon-git"/>Install Git](https://git-scm.com/downloads) |
| **Docker** | Containerization | [<VPIcon icon="fa-brands fa-docker"/>Install Docker](https://docs.docker.com/get-docker/) |
| **Node.js & npm** | Sample app & builds | [<VPIcon icon="fa-brands fa-node"/>Install Node.js](https://nodejs.org/) |
| **Terraform** | Infrastructure as Code | [<VPIcon icon="iconfont icon-terraform"/>Install Terraform](https://terraform.io/downloads) |
| `kubectl` | Kubernetes CLI | [<VPIcon icon="iconfont icon-k8s"/>Install `kubectl`](https://kubernetes.io/docs/tasks/tools/) |
| `k3d` | Lightweight Kubernetes | [<VPIcon icon="fas fa-globe"/>Install k3d](https://k3d.io/) |
| Trivy | Container security scanning | [**Install Trivy**](https://aquasecurity.github.io/trivy/v0.18.3/) |
| OWASP ZAP | Web security scanning | [**Install ZAP**](https://zaproxy.org/download/) |

:::

::: note Optional but Helpful:

- [<VPIcon icon="iconfont icon-vscode"/>VS Code](https://code.visualstudio.com/) or any good code editor
- Postman for testing APIs
- Understanding of YAML and Dockerfiles

:::

---

## Introduction

When people hear "DevOps," they often picture complex enterprise systems powered by pricey tools and premium cloud services. But the truth is, you don't actually need a massive budget to build a solid, professional-grade DevOps pipeline. The foundations of good DevOps - automation, consistency, security, and visibility - can be built entirely with free tools.

In this guide, you will learn how to build a production-ready DevOps pipeline using zero-cost resources. We will use a simple CRUD (Create, Read, Update, Delete) app with frontend, backend API, and database as our example project to demonstrate every step of the process.

---

## Table of Contents

1/10. [How to Set Up Your Source Control and Project Structure](#heading-how-to-set-up-your-source-control-and-project-structure)
2/10. [How to Build Your CI Pipeline with GitHub Actions](#heading-how-to-build-your-ci-pipeline-with-github-actions)
3/10. [How to Optimize Docker Builds for CI](#heading-how-to-optimize-docker-builds-for-ci)
4/10. [Infrastructure as Code Using Terraform and Free Cloud Providers](#heading-infrastructure-as-code-using-terraform-and-free-cloud-providers)
5/10. [How to Set Up Container Orchestration on Minimal Resources](#heading-how-to-set-up-container-orchestration-on-minimal-resources)
6/10. [How to Create a Free Deployment Pipeline](#heading-how-to-create-a-free-deployment-pipeline)
7/10. [How to Build a Comprehensive Monitoring System](#heading-how-to-build-a-comprehensive-monitoring-system)
8/10. [How to Implement Security Testing and Scanning](#heading-how-to-implement-security-testing-and-scanning)
9/10. [Performance Optimization and Scaling](#heading-performance-optimization-and-scaling)
10/10. [Putting it All Together](#heading-complete-cicd-pipeline-example)

---

## How to Set Up Your Source Control and Project Structure

### 1. Create a Well-Structured Repository

A clean repo is the foundation of your pipeline. We will set up:

- Separate folders for `frontend`, `backend`, and `infrastructure`
- A `.github` folder to hold workflow configurations
- Clear naming conventions and a well-written <VPIcon icon="fa-brands fa-markdown"/>`README.md`

::: tip

Use semantic commit messages and consider adopting [<VPIcon icon="fas fa-globe"/>Conventional Commits](https://conventionalcommits.org/) for clarity in versioning and changelogs.

:::

### 2. Set Up Branch Protection Without Paid Features

While GitHub's more advanced rules require Pro, you can still:

- Require pull requests before merging
- Enable status checks to prevent broken code from landing in `main`
- Enforce linear history for cleaner version control

::: note

This makes your project safer and more collaborative, without needing GitHub Enterprise.

:::

### 3. Implement PR Templates and Automated Checks

Make your reviews smoother:

- Add a `PULL_REQUEST_TEMPLATE.md` to guide contributors
- Use GitHub Actions (which we'll set up in the next part) for linting, tests, and formatting checks

::: note ✨

These tiny improvements add polish and professionalism.

:::

### 4. Configure GitHub Issue Templates and Project Boards

Even solo developers benefit from issue tracking:

- Add issue templates for bugs and features
- Use GitHub Projects to manage work with a Kanban board, all free and native to GitHub

::: tip 📌 Bonus

This setup lays the groundwork for GitOps practices later on.

:::

### 5. Advanced Technique: Set Up Custom Validation Scripts as Pre-Commit Hooks

Before code ever hits GitHub, you can catch issues locally with Git hooks. Using a tool like [<VPIcon icon="fas fa-globe"/>Husky](https://typicode.github.io/husky/) or [<VPIcon icon="fas fa-globe"/>pre-commit](https://pre-commit.com/), you can:

- Lint code before it's committed
- Run tests or formatters automatically
- Prevent secrets from being accidentally committed

```sh
# Initialize Husky and install needed dependencies
# Then add a pre-commit hook that runs tests before allowing the commit
npx husky-init && npm install
npx husky add .husky/pre-commit "npm test"
```

### 6. Sample CRUD App Setup:

Our CRUD app manages users (create, read, update, delete). Below is the minimal code with comments to explain each part:

#### Backend (<VPIcon icon="fas fa-folder-open"/>`backend/`)

```json title="backend/package.json"
{
  "name": "crud-backend", // Name of the backend project
  "version": "1.0.0", // Version for tracking changes
  "scripts": {
    "start": "node index.js", // Runs the server
    "test": "echo 'Add tests here'", // Placeholder for tests (update with Jest later)
    "lint": "eslint ." // Checks code style with ESLint
  },
  "dependencies": {
    "express": "^4.17.1", // Web framework for API endpoints
    "pg": "^8.7.3" // PostgreSQL client to connect to the database
  },
  "devDependencies": {
    "eslint": "^8.0.0" // Linting tool for code quality
  }
}
```

```js title="backend/index.js"
const express = require('express'); // Import Express for building the API
const { Pool } = require('pg'); // Import PostgreSQL client
const app = express(); // Create an Express app
app.use(express.json()); // Parse JSON request bodies

// Connect to PostgreSQL using DATABASE_URL from environment variables
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Health check endpoint for Kubernetes probes and monitoring
app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

// Get all users from the database
app.get('/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users'); // Query the users table
  res.json(rows); // Send users as JSON
});

// Add a new user to the database
app.post('/users', async (req, res) => {
  const { name } = req.body; // Get name from request body
  // Insert user and return the new record
  const { rows } = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING *', [name]);
  res.json(rows[0]); // Send the new user as JSON
});

// Start the server on port 3000
app.listen(3000, () => console.log('Backend running on port 3000'));
```

#### Frontend (<VPIcon icon="fas fa-folder-open"/>`frontend/`):

```json title="frontend/package.json"
{
  "name": "crud-frontend", // Name of the frontend project
  "version": "1.0.0", // Version for tracking changes
  "scripts": {
    "start": "react-scripts start", // Runs the dev server
    "build": "react-scripts build", // Builds for production
    "test": "react-scripts test", // Runs tests (placeholder for Jest)
    "lint": "eslint ." // Checks code style with ESLint
  },
  "dependencies": {
    "react": "^17.0.2", // Core React library
    "react-dom": "^17.0.2", // Renders React to the DOM
    "react-scripts": "^4.0.3", // Scripts for React development
    "axios": "^0.24.0" // HTTP client for API calls
  },
  "devDependencies": {
    "eslint": "^8.0.0" // Linting tool for code quality
  }
}
```

```jsx :collapsed-lines title="frontend/src/App.js"
import React, { useState, useEffect } from 'react'; // Import React and hooks
import axios from 'axios'; // Import Axios for API requests

function App() {
  // State for storing users fetched from the backend
  const [users, setUsers] = useState([]);
  // State for the input field to add a new user
  const [name, setName] = useState('');

  // Fetch users when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/users').then(res => setUsers(res.data));
  }, []); // Empty array means run once on mount

  // Add a new user via the API
  const addUser = async () => {
    const res = await axios.post('http://localhost:3000/users', { name }); // Post new user
    setUsers([...users, res.data]); // Update users list
    setName(''); // Clear input field
  };

  return (
    <div>
      <h1>Users</h1>
      {/* Input for new user name */}
      <input value={name} onChange={e => setName(e.target.value)} />
      {/* Button to add user */}
      <button onClick={addUser}>Add User</button>
      {/* List all users */}
      <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  );
}

export default App; // Export the component
```

#### Database Setup

```sql title="infra/db.sql"
-- Create a table to store users
CREATE TABLE users (
  id SERIAL PRIMARY KEY, -- Auto-incrementing ID
  name VARCHAR(100) NOT NULL -- User name, required
);
```

```plaintext title="file structure"
crud-app/
├── backend/
│   ├── package.json
│   └── index.js
├── frontend/
│   ├── package.json
│   └── src/App.js
├── infra/
│   └── db.sql
├── .github/
│   └── workflows/
└── README.md
```

This app provides a `/users` endpoint (GET/POST) and a frontend to list/add users, stored in PostgreSQL. The `/healthz` endpoint supports monitoring. Save this code in your repo to follow the pipeline steps.

---

## How to Build Your CI Pipeline with GitHub Actions

### 1. Set Up Your First GitHub Actions Workflow

First, let’s create a basic workflow that automatically builds, tests, and lints your app every time you push code or open a pull request. This ensures your app stays healthy and any issues are caught early.

Create a file at <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yml` and add the following:

```yaml :collapsed-lines title=".github/workflows/ci.yml"
# CI workflow to build, test, and lint the CRUD app on push or pull request
name: CI Pipeline
on:
  push:
    branches: [main] # Trigger on pushes to main branch
  pull_request:
    branches: [main] # Trigger on PRs to main branch
jobs:
  build:
    runs-on: ubuntu-latest # Use GitHub's free Linux runner
    steps:
      - uses: actions/checkout@v3 # Check out the repository code
      - name: Set up Node.js # Install Node.js environment
        uses: actions/setup-node@v3
        with:
          node-version: '18' # Use Node.js 18 for consistency
      - name: Cache dependencies # Cache node_modules to speed up builds
        uses: actions/cache@v3
        with:
          path: ~/.npm # Cache npm’s global cache
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }} # Key based on OS and package-lock.json
      - run: npm ci # Install dependencies reliably using package-lock.json
      - run: npm test # Run tests defined in package.json
      - run: npm run lint # Run ESLint to ensure code quality
```

This workflow automatically runs on every push and pull request to the <VPIcon icon="fas fa-code-branch"/>`main` branch. It installs dependencies, runs tests, and performs code linting, with dependency caching to make builds faster over time.

::: tip Common Issues and Fixes

- **“Secret not found”**: Ensure `AWS_ACCESS_KEY_ID` is in repository secrets (Settings → Secrets).
- **Tests fail**: Check <VPIcon icon="fas fa-folder-open"/>`test/`<VPIcon icon="fa-brands fa-js"/>`users.test.js` for database connectivity.

:::

#### Understanding GitHub Actions' Free Tier Limits

Before building more workflows, it is important to know what GitHub offers for free.

If you are working on private repositories, you get 2,000 free minutes per month. For public repositories, you get unlimited minutes.

To avoid hitting limits quickly:

- Cache your dependencies to cut down install times.
- Only trigger workflows on meaningful branches (like <VPIcon icon="fas fa-code-branch"/>`main` or <VPIcon icon="fas fa-code-branch"/>`release`).
- Skip unnecessary steps when you can.

### 2. Creating a Multi-Stage Build Pipeline

As your app grows, it is better to split your CI pipeline into clear stages like **install**, **test**, and **lint**. This structure makes workflows easier to maintain and speeds things up, because some jobs can run in parallel.

Here’s how you can split the work into multiple jobs for better clarity:

```yaml
jobs:
  install:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci  # Clean install of dependencies

  test:
    needs: install  # This job depends on the install job finishing
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm test  # Run test suite

  lint:
    needs: install  # This job also depends on install but runs in parallel with test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run lint  # Run linting checks
```

By breaking the pipeline into stages, you can quickly spot which step fails, and your test and lint jobs can run at the same time after dependencies are installed.

### 3. Implement Matrix Builds for Cross-Environment Testing

When you want your app to work across different Node.js versions or databases, matrix builds are your best bet. They let you test across multiple environments in parallel, without duplicating code.

Here’s how you can set up a matrix strategy, to test across multiple environments simultaneously:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]  # Test on multiple Node versions
        database: [postgres, mysql]        # Test against different databases
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm test  # This will run 6 different test combinations (3 Node versions × 2 databases)
```

Matrix builds save time and help you catch environment-specific bugs early.

### 4. Optimize Workflow with Dependency Caching

Every second counts in CI. Dependency caching can help save minutes in your workflow by reusing previously installed packages instead of reinstalling them from scratch every time.

Here’s how to set up smart caching to speed up your builds:

```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: |  # Cache both global npm cache and local node_modules
      ~/.npm
      node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}  # Cache key based on OS and dependencies
    restore-keys: |  # Fallback keys if exact match isn't found
      ${{ runner.os }}-node-
```

This cache setup checks if your dependencies have changed. If not, it restores the cache, making builds significantly faster.

---

## How to Optimize Docker Builds for CI

When you're building Docker images in CI, build time can quickly become a bottleneck. Especially if your images are large. Optimizing your Docker builds makes your pipelines much faster, saves bandwidth, and produces smaller, more efficient images ready for deployment.

In this section, I’ll walk through creating a basic Dockerfile, using multi-stage builds, caching layers, and enabling BuildKit for even faster builds.

### 1. Create a Baseline Dockerfile

First, start with a simple Dockerfile that installs your app’s dependencies and runs it. This is what you’ll be optimizing later.

```dockerfile title="Dockerfile"
# Simple Dockerfile for a Node.js application
FROM node:18-alpine  # Use Alpine for a smaller base image
WORKDIR /app         # Set working directory
COPY . .             # Copy all files to container
RUN npm ci           # Install dependencies (clean install)
CMD ["npm", "start"] # Start the application
```

Using an Alpine-based Node.js image helps keep your image small from the start.

### 2. Multi-Stage Docker Builds

Next, let's separate the build process from the production image. Multi-stage builds let you compile or build your app in one stage and only copy over the final product to a clean, smaller image. This keeps production images lean:

```dockerfile title="Dockerfile"
# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./  # Copy package files first for better caching
RUN npm ci             # Install all dependencies
COPY . .               # Then copy source code
RUN npm run build      # Build the application

# Stage 2: Production image with minimal footprint
FROM node:18-alpine
WORKDIR /app
# Only copy built assets and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --production  # Install only production dependencies
CMD ["node", "dist/server.js"]  # Run the built application
```

This approach keeps your production images lightweight and secure by excluding unnecessary build tools and dev dependencies.

### 3. Optimizing Layer Caching

For even faster builds, order your <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` instructions to maximize layer caching. Copy and install dependencies *before* copying your full source code.

This way, Docker reuses the cached npm install step if your dependencies haven't changed, even if you edit your app's code:

- First: `COPY package*.json ./`
- Then: `RUN npm ci`
- Finally: `COPY . .`

### 4. Enable BuildKit for Faster Builds

Docker BuildKit is a newer build engine that enables features like better caching, parallel build steps, and overall faster builds.

To enable BuildKit during your CI, run:

```yaml
- name: Build Docker image
  run: |
    # Enable BuildKit for parallel and more efficient builds
    DOCKER_BUILDKIT=1 docker build -t myapp:latest .
```

Turning on BuildKit can significantly speed up complex Docker builds and is highly recommended for all CI pipelines.

---

## Infrastructure as Code Using Terraform and Free Cloud Providers

### Why Infrastructure as Code (IaC) Matters

When you manage infrastructure manually - that is, clicking around cloud dashboards or setting things up by hand - it’s easy to lose track of what you did and how to repeat it.

Infrastructure as Code (IaC) solves this by letting you define your infrastructure with code, version it just like application code, and track every change over time. This makes your setups easy to replicate across environments (development, staging, production), ensures changes are declarative and auditable, and reduces human error.

Whether you are spinning up a single server or scaling a complex system, IaC lays the foundation for professional-grade infrastructure from day one, letting you automate, document, and grow your environment systematically.

### How to Provision Infrastructure with Terraform

#### Initialize a Terraform Project

First, define the providers and versions you need. Here, we’re using Render’s free cloud hosting service:

```tf
# Define required providers and versions
terraform {
  required_providers {
    render = {
      source  = "renderinc/render"  # Using Render's free tier
      version = "0.1.0"             # Specify provider version for stability
    }
  }
}

# Configure the Render provider with authentication
provider "render" {
  api_key = var.render_api_key  # Store API key as a variable
}
```

Then, configure the provider by authenticating with your API key. It is best practice to store secrets like API keys in variables instead of hardcoding them. This setup tells Terraform what platform you’re working with (Render) and how to authenticate to manage resources automatically.

#### Provision a Web App on Render

Next, define the infrastructure you want - in this case, a web service hosted on Render:

```tf
# Define a web service on Render's free tier
resource "render_service" "web_app" {
  name = "ci-demo-app"                                 # Service name
  type = "web_service"                                 # Type of service
  repo = "https://github.com/YOUR-USERNAME/YOUR-REPO"  # Source repo
  env = "docker"                                       # Use Docker environment
  plan = "starter"                                     # Free tier plan
  branch = "main"                                      # Deploy from main branch
  build_command = "docker build -t app ."              # Build command
  start_command = "docker run -p 3000:3000 app"        # Start command
  auto_deploy = true                                   # Auto-deploy on commits
}
```

This resource block describes exactly how your app should be deployed. Whenever you change this file and reapply, Terraform will update the infrastructure to match.

#### Provision PostgreSQL for Free

Most applications need a database, but you don't have to pay for one when you're getting started. Platforms like [<VPIcon icon="fas fa-globe"/>Railway](https://railway.app/) offer free tiers that are perfect for development and small projects.

You can quickly create a free PostgreSQL instance by signing up on the platform and clicking **"Create New Project"**. At the end, you'll get a `DATABASE_URL` a connection string that your app will use to talk to the database.

#### Connect App to DB

In Render (or whatever platform you're using), set an environment variable called `DATABASE_URL` and paste in the connection string from your PostgreSQL provider. This lets your application securely access the database without hardcoding credentials into your codebase.

#### Make it Reproducible

Once everything is defined, use Terraform to create and apply an infrastructure plan:

```sh
# Create execution plan and save it to a file
terraform plan -out=infra.tfplan
# Apply the saved plan exactly as planned
terraform apply infra.tfplan
```

Saving the plan to a file (`infra.tfplan`) ensures you’re applying exactly what you reviewed, so there will be no surprises.

::: tip Common Issues and Fixes

- **Provider not found**: Run `terraform init`.
- **API key error**: Check `render_api_key` in Terraform Cloud variables.

:::

---

## How to Set Up Container Orchestration on Minimal Resources

When you're working with limited resources like a laptop, a small server, or a lightweight cloud VM, setting up full Kubernetes can be overwhelming. Instead, you can use **K3d**, a lightweight Kubernetes distribution that runs inside Docker containers. Here's how to set up a minimal, efficient cluster for local development or testing.

### 1. Install K3d for Local Kubernetes

First, install K3d. It's a super lightweight way to run Kubernetes clusters inside Docker without needing a heavy setup like Minikube.

```sh
# Download and install K3d - a lightweight K8s distribution
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash
```

### 2. Create a Lightweight K3d Cluster

Once K3d is installed, you can spin up a cluster with minimal nodes to save resources.

```sh
# Create a minimal K8s cluster with 1 server and 2 agent nodes
k3d cluster create dev-cluster \
`--servers 1 \                        # Single server node to minimize resource usage
--agents 2 \                         # Two worker nodes for pod distribution
--volume /tmp/k3dvol:/tmp/k3dvol \   # Mount local volume for persistence
--port 8080:80@loadbalancer \        # Map port 8080 locally to 80 in the cluster
--api-port 6443                      # Set the API port
```

This setup gives you a **tiny but real Kubernetes cluster** that is perfect for experimentation.

### 3. Deploy with Optimized Kubernetes Manifests

Now that your cluster is running, you can deploy your app. It's important to define resource requests and limits carefully so your pods don’t consume too much memory or CPU.

```yaml title="deploy.yaml"
# Resource-optimized deployment manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp  # Name of the deployment
spec:
  replicas: 1   # Single replica to save resources
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
        - name: app
          image: myapp:latest
          resources:
            # Set minimal resource requests
            requests:
              memory: "64Mi"   # Request only 64MB memory
              cpu: "50m"       # Request only 5% of a CPU core
            # Set reasonable limits
            limits:
              memory: "128Mi"  # Limit to 128MB memory
              cpu: "100m"      # Limit to 10% of a CPU core
```

This ensures Kubernetes knows how much to allocate and avoid overloading your lightweight environment.

### 4. Set up GitOps with Flux

To manage deployments automatically from your GitHub repository, you can set up GitOps using Flux.

```sh
# Install Flux CLI
brew install fluxcd/tap/flux

# Bootstrap Flux on your cluster connected to your GitHub repository
flux bootstrap github \
--owner=YOUR_GITHUB_USERNAME \    # Your GitHub username
--repository=YOUR_REPO_NAME \     # Repository to store Flux manifests
--branch=main \                   # Branch to use
--path=clusters/dev-cluster \     # Path within repo for cluster configs
--personal                        # Flag for personal account
```

Flux watches your repo and applies updates to your cluster, keeping everything declarative and reproducible.

::: tip Common Issues and Fixes**

- **Pods crash**: Run `kubectl logs pod-name` or increase resources.
- **Flux sync fails**: Check GitHub token permissions.

:::

---

## How to Create a Free Deployment Pipeline

Like I said initially, not every project needs expensive infrastructure. If you're just getting started or building side projects, free tiers from cloud providers can cover a lot of ground.

### 1. Understanding Free Tier Limitations

Here’s a quick overview of popular cloud free tiers:

| **Provider** | Free Tier Highlights |
| ---: | --- |
| AWS Free Tier | 750 hours/month EC2, 5GB S3, 1M Lambda requests |
| Oracle Cloud Free Tier | 2 always-free compute instances, 30GB storage |
| Google Cloud Free Tier | 1 f1-micro instance, 5GB storage |

Knowing these limits helps you stay within budget.

### 2. Set Up Deployment Workflows

You can automate deployments with GitHub Actions. Here's an example of a deployment workflow to AWS:

```yaml :collapsed-lines
# GitHub Action workflow for deploying to AWS
name: AWS Deployment

on:
  push:
    branches:
      - main  # Deploy on push to main branch

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3  # Check out code

      # Set up AWS credentials from GitHub secrets
      - name: Set up AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      # Build the Docker image
      - name: Build Docker Image
        run: docker build -t myapp .

      # Push the image to AWS ECR
      - name: Push Docker Image to ECR
        run: |
          # Create repository if it doesn't exist (ignoring errors if it does)
          aws ecr create-repository --repository-name myapp || true

          # Login to ECR
          aws ecr get-login-password | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com

          # Tag and push the image
          docker tag myapp:latest <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/myapp:latest
          docker push <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/myapp:latest
```

### 3. Implement Zero-Downtime Deployments

Zero downtime is crucial. Kubernetes makes this easy with rolling updates:

```yaml title="deploy.yaml"
# Kubernetes deployment configured for zero-downtime updates
apiVersion: apps/v1
kind: Deployment
metadata:
  name: crud-app
spec:
  replicas: 3  # Multiple replicas for high availability
  selector:
    matchLabels:
      app: crud-app
  template:
    metadata:
      labels:
        app: crud-app
    spec:
      containers:
      - name: app
        image: <docker_registry>/crud-app:latest
        ports:
        - containerPort: 80  # Expose container port
```

By having multiple replicas, you ensure that some pods stay live during updates.

### 4. Create Cross-Cloud Deployment for Redundancy

If you want better reliability, you can deploy across different clouds in parallel:

```yaml title=".github/workflows/ci.yml"
# Deploy to multiple cloud providers for redundancy
name: Cross-Cloud Deployment

on:
  push:
    branches:
      - main

jobs:
  # Deploy to AWS
  aws-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: AWS Setup & Deploy
        run: |
          # Configure AWS CLI with credentials
          aws configure set aws_access_key_id ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws configure set aws_secret_access_key ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          # AWS deployment commands...

  # Deploy to Oracle Cloud in parallel
  oracle-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Oracle Setup & Deploy
        run: |
          # Configure Oracle Cloud CLI
          oci setup config
          # Oracle Cloud deployment commands...
```

Now if one cloud goes down, the other is still up.

### 5. Implement Automated Rollbacks with Health Checks

Set up health checks so Kubernetes can automatically rollback if something goes wrong:

```yaml title="deploy.yaml"
# Deployment with health checks for automated rollbacks
apiVersion: apps/v1
kind: Deployment
metadata:
  name: crud-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: crud-app
  template:
    metadata:
      labels:
        app: crud-app
    spec:
      containers:
      - name: crud-app
        image: <docker_registry>/crud-app:latest
        ports:
        - containerPort: 80
        # Check if the container is alive
        livenessProbe:
          httpGet:
            path: /healthz  # Health check endpoint
            port: 80
          initialDelaySeconds: 5  # Wait before first check
          periodSeconds: 10       # Check every 10 seconds
        # Check if the container is ready to receive traffic
        readinessProbe:
          httpGet:
            path: /readiness  # Readiness check endpoint
            port: 80
          initialDelaySeconds: 5  # Wait before first check
          periodSeconds: 10       # Check every 10 seconds
```

---

## How to Build a Comprehensive Monitoring System

Even with a small deployment, monitoring is key to spotting issues early. So now, I’ll walk through setting up a comprehensive monitoring system for your application.

You'll learn how to integrate Grafana Cloud for visualizing your metrics, use Prometheus for collecting data, and configure custom alerts to monitor your app's performance. I’ll also cover tracking Service Level Objectives (SLOs) and setting up external monitoring with UptimeRobot to make sure that your endpoints are always available.

### 1. Set Up Grafana Cloud's Free Tier

Create a Grafana Cloud account and connect Prometheus as a data source. They offer generous free usage, which is perfect for small teams.

### 2. Configure Prometheus for Metrics Collection

Prometheus collects metrics from your app.

```yaml title="prometheus.yml"
# Basic Prometheus configuration
global:
  scrape_interval: 15s  # Collect metrics every 15 seconds
scrape_configs:
  - job_name: 'crud-app'  # Job name for the crud-app metrics
    static_configs:
      - targets: ['localhost:8080']  # Where to collect metrics from
```

This scrapes your app every 15 seconds for metrics.

### 3. Create Monitoring Dashboards

Grafana visualizes Prometheus data. You can create dashboards using queries like:

```sh
# Calculate average CPU usage rate per instance over 1 minute
avg(rate(cpu_usage_seconds_total[1m])) by (instance)
```

This calculates average CPU usage over the last minute per instance.

### 4. Write Custom PromQL Queries for Alerts

You can create smart alerts to detect increasing error rates, like the below:

```sh
# Calculate error rate as a percentage of total requests
# Alert when error rate exceeds 5%
sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)
  / 
sum(rate(http_requests_total[5m])) by (service) > 0.05
```

This alerts if more than 5% of your traffic results in errors.

### 5. Implement SLO Tracking on a Budget

You can track Service Level Objectives (SLOs) with Prometheus for free:

```sh
# Calculate percentage of requests completed under 200ms
# Alert when it drops below 99%
rate(http_request_duration_seconds_bucket{le="0.2"}[5m]) 
  / rate(http_request_duration_seconds_count[5m]) 
> 0.99
```

This tracks if 99% of requests complete in under 200ms.

### 6. Set Up UptimeRobot for External Monitoring

Finally, you can use UptimeRobot to check if your endpoints are reachable externally, and get alerts if anything goes down.

---

## How to Implement Security Testing and Scanning

Security should be integrated into your development pipeline from the start, not added as an afterthought. In this section, I’ll show you how to implement security testing and scanning at various stages of your workflow.

You’ll use GitHub CodeQL for static code analysis, OWASP ZAP for scanning web vulnerabilities, and Trivy for container image scanning. You’ll also learn how to enforce security thresholds directly in your CI pipeline.

### 1. Enable GitHub Code Scanning with CodeQL

GitHub has built-in code scanning with CodeQL. Here’s how to set it up:

```yaml title=".github/workflows/codeql.yaml"
# GitHub workflow for CodeQL security scanning
name: CodeQL

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  analyze:
    name: Analyze code with CodeQL
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      # Initialize the CodeQL scanning tools
      - name: Set up CodeQL
        uses: github/codeql-action/init@v2

      # Run the analysis and generate results
      - name: Analyze code
        uses: github/codeql-action/analyze@v2
```

This automatically checks your code for security vulnerabilities.

### 2. Integrate OWASP ZAP into Your CI Pipeline

You can also scan your deployed app with OWASP ZAP like this:

```yaml title=".github/workflows/zap-scan.yaml"
# Automated security scanning with OWASP ZAP
name: ZAP Scan

on:
  push:
    branches:
      - main

jobs:
  zap-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      # Run the ZAP security scan against deployed application
      - name: Run ZAP security scan
        uses: zaproxy/action-full-scan@v0.3.0
        with:
          target: 'https://yourapp.com'  # URL to scan
```

This checks for common web vulnerabilities.

### 3. Set Up Trivy for Container Vulnerability Scanning

You can also check your container images for vulnerabilities with Trivy:

```yaml title=".github/workflows/trivy.yaml"
# Scan Docker images for vulnerabilities using Trivy
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'crud-app:latest'   # Image to scan
    format: 'table'             # Output format
    exit-code: '1'              # Fail the build if vulnerabilities found
    ignore-unfixed: true        # Skip vulnerabilities without fixes
    severity: 'CRITICAL,HIGH'   # Only alert on critical and high severity
```

Your builds will fail if serious issues are found, keeping you safe by default.

### 4. Create Threshold-Based Pipeline Failures

You can configure your pipelines to fail automatically if vulnerabilities exceed a set threshold, enforcing strong security practices without manual effort. Here’s how that should look:

```yaml title=".github/workflows/trivy.yaml"
# Fail the pipeline if critical or high vulnerabilities are found
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'crud-app:latest'   # Image to scan
    format: 'json'              # Output as JSON for parsing
    exit-code: '1'              # Fail the build if vulnerabilities found
    severity: 'CRITICAL,HIGH'   # Check for critical and high severity issues
    ignore-unfixed: true        # Skip vulnerabilities without fixes
```

This forces a no-compromise security posture - that is, if critical or high vulnerabilities are detected, the build stops immediately.

### 5. Implement Custom Security Checks

Sometimes you need to go beyond automated scanners. Here's a basic example of a custom security check you can add to your pipeline:

```sh
#!/bin/bash

# Custom script to check for hard-coded secrets in source code
# Check for hard-coded API keys in source files
if grep -r "API_KEY" ./src; then
  echo "Security issue: Found hard-coded API keys."
  exit 1  # Fail the build
else
  echo "No hard-coded API keys found."
fi
```

You can extend this script to scan for patterns like private keys, passwords, or other sensitive information, helping catch issues before they ever reach production.

---

## Performance Optimization and Scaling

Optimizing early saves you pain later. Here’s how to make your pipelines faster, smarter, and more scalable:

### 1. Measure Pipeline Execution Times

Understanding how long each step takes is the first step to improving it:

```yaml title=".github/workflows/measure-time.yaml"
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Record the start time
      - name: Start timer
        run: echo "Start time: $(date)"

      - uses: actions/checkout@v3
      - run: npm install

      # Record the end time to calculate duration
      - name: End timer
        run: echo "End time: $(date)"
```

Later, you can automate time tracking for full reports and alerts.

### 2. Implement Parallelization Strategies

Split your jobs smartly to save time:

```yaml
jobs:
  # First job to install dependencies
  install:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci

  # Run tests in parallel with linting
  test:
    runs-on: ubuntu-latest
    needs: install  # Depends on install job
    steps:
      - uses: actions/checkout@v3
      - run: npm test

  # Run linting in parallel with tests
  lint:
    runs-on: ubuntu-latest
    needs: install  # Also depends on install job
    steps:
      - uses: actions/checkout@v3
      - run: npm run lint
```

Result: Testing and linting run in parallel after installing dependencies, cutting pipeline time significantly.

### 3. Set Up Distributed Caching

Caching saves your workflow from repeating expensive tasks:

```yaml
# Cache dependencies to speed up builds
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: |
      ~/.npm           # Cache global npm cache
      node_modules     # Cache local dependencies
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}  # Key based on OS and dependency hash
    restore-keys: |    # Fallback keys if exact match isn't found
      ${{ runner.os }}-node-
```

::: tip

Also cache build artifacts, Docker layers, and Terraform plans when possible.

:::

### 4. Create Performance Benchmarks

Track your build times over time with benchmarks:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Store the start time as an environment variable
      - name: Start timer
        id: start_time
        run: echo "start_time=$(date +%s)" >> $GITHUB_ENV

      - uses: actions/checkout@v3
      - run: npm install

      # Calculate and display the elapsed time
      - name: End timer and calculate elapsed time
        run: |
          end_time=$(date +%s)
          elapsed_time=$((end_time - ${{ env.start_time }}))
          echo "Build time: $elapsed_time seconds"
```

With benchmarks in place, you can monitor regressions and trigger optimizations automatically.

### 5. How to Plan for Growth Beyond Free Tiers

- **Understand cloud pricing structures:** AWS, Azure, GCP all offer generous free tiers, but know the limits to avoid surprise bills. *(I have been there and it wasn’t pretty.)*
- **Consider scaling to more advanced CI/CD tools:** Jenkins, CircleCI, GitLab can offer better performance or self-hosted control as you grow.
- **Automate resource provisioning:** Use Infrastructure as Code (IaC) with Terraform, Pulumi, or AWS CDK to dynamically scale your infrastructure when your team or traffic grows.

---

## Complete CI/CD Pipeline Example

Here’s a full example tying everything together:

```yaml :collapsed-lines title=".workflows/github/ci.yaml"
# Complete end-to-end CI/CD pipeline
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  # Initial setup job
  setup:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

  # Build and test job
  build:
    runs-on: ubuntu-latest
    needs: setup  # Depends on setup job
    steps:
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Run security scan
        run: npx eslint .  # Run ESLint for security rules

  # Deploy to Kubernetes job
  deploy:
    runs-on: ubuntu-latest
    needs: build  # Depends on successful build
    steps:
      - name: Setup K3d cluster
        run: k3d cluster create dev-cluster --servers 1 --agents 2 --port 8080:80@loadbalancer
      - name: Apply Kubernetes manifests
        run: kubectl apply -f k8s/  # Apply all K8s manifests in the k8s directory
      - name: Deploy app
        run: kubectl rollout restart deployment/webapp  # Restart deployment for zero-downtime update

  # Infrastructure provisioning job
  terraform:
    runs-on: ubuntu-latest
    needs: deploy  # Run after deployment
    steps:
      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
      - name: Terraform Init
        run: terraform init  # Initialize Terraform
      - name: Terraform Apply
        run: terraform apply -auto-approve  # Apply infrastructure changes automatically
```

### Runbook: Failed Deployment

::: important Issue

Pods fail due to resource limits (for example, `OOMKilled`, `CrashLoopBackOff`).

:::

::: info Fix:

```sh
kubectl top pod
kubectl edit deployment crud-app
kubectl apply -f deployment.yaml
kubectl rollout status deployment/crud-app
```

:::

::: tip

Set realistic resource requests and limits early, it'll save you debugging time later.

:::

---

## Conclusion

By following along with this tutorial, you now know how to build a production-ready DevOps pipeline using free tools:

- **CI/CD**: GitHub Actions for testing, linting, and building.
- **Infrastructure**: Terraform for AWS/Render and PostgreSQL setup.
- **Orchestration**: K3d for local Kubernetes.
- **Monitoring**: Grafana, Prometheus, UptimeRobot.
- **Security**: CodeQL, OWASP ZAP, Trivy for vulnerability scanning.

This pipeline is scalable and secure, and it’s perfect for small projects. As your app grows, you might want to consider paid plans for more resources (for example, AWS larger instances, Grafana unlimited metrics). You can check [<VPIcon icon="fa-brands fa-aws"/>AWS Free Tier](https://aws.amazon.com/free/), [<VPIcon icon="iconfont icon-terraform"/>Terraform Docs](https://developer.hashicorp.com/terraform/docs), and [<VPIcon icon="iconfont icon-grafana"/>Grafana Docs](https://grafana.com/docs/) for more learning.

::: note PS

I’d love to see what you build. Share your pipeline on [<VPIcon icon="fa-brands fa-free-code-camp"/>FreeCodeCamp’s forum](https://forum.freecodecamp.org/) or tag me on X [<VPIcon icon="fa-brands fa-x-twitter"/>`@Emidowojo`](https://x.com/Emidowojo) with #DevOpsOnABudget, and tell me about the challenges you faced. You can also connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`emidowojo`)](https://linkedin.com/in/emidowojo/) if you’d like to stay in touch. If you made it to the end of this lengthy article, thanks for reading!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Production-Ready DevOps Pipeline with Free Tools",
  "desc": "A few months ago, I dove into DevOps, expecting it to be an expensive journey requiring costly tools and infrastructure. But I discovered you can build professional-grade pipelines using entirely free resources. If DevOps feels out of reach because y...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-production-ready-devops-pipeline-with-free-tools.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
