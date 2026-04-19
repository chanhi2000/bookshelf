---
lang: en-US
title: "How I Built a Production-Ready CI/CD Pipeline for a Monorepo-Based Microservices System with Jenkins, Docker Compose, and Traefik"
description: "Article(s) > How I Built a Production-Ready CI/CD Pipeline for a Monorepo-Based Microservices System with Jenkins, Docker Compose, and Traefik"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Traefik
  - Jenkins
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - traefik
  - jenkins
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How I Built a Production-Ready CI/CD Pipeline for a Monorepo-Based Microservices System with Jenkins, Docker Compose, and Traefik"
    - property: og:description
      content: "How I Built a Production-Ready CI/CD Pipeline for a Monorepo-Based Microservices System with Jenkins, Docker Compose, and Traefik"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-production-ready-ci-cd-pipeline-for-monorepo-based-microservices-system.html
prev: /devops/docker/articles/README.md
date: 2026-04-24
isOriginal: false
author:
  - name: Md Tarikul Islam
    url: https://freecodecamp.org/news/author/Tarikul001/
cover: https://cdn.hashnode.com/uploads/covers/66cb39fcaa2a09f9a8d691c1/d59c62f5-e376-4f09-851f-83e437f9960a.png
---

# {{ $frontmatter.title }} 관련

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
  "title": "Traefik > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/traefik/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Jenkins > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/jenkins/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How I Built a Production-Ready CI/CD Pipeline for a Monorepo-Based Microservices System with Jenkins, Docker Compose, and Traefik"
  desc="This tutorial is a complete, real-world guide to building a production-ready CI/CD pipeline using Jenkins, Docker Compose, and Traefik on a single Linux server. You’ll learn how to expose services on "
  url="https://freecodecamp.org/news/build-production-ready-ci-cd-pipeline-for-monorepo-based-microservices-system"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/66cb39fcaa2a09f9a8d691c1/d59c62f5-e376-4f09-851f-83e437f9960a.png"/>

This tutorial is a complete, real-world guide to building a production-ready CI/CD pipeline using Jenkins, Docker Compose, and Traefik on a single Linux server.

You’ll learn how to expose services on a custom domain with auto-renewing HTTPS, and implement a smart deployment strategy that detects changes and redeploys only the affected microservices. This helps avoid unnecessary full-stack redeploys. We'll also cover real production issues and the exact fixes for each one.

---

## 1. What You'll Build

In this tutorial, you'll build a Jenkins instance running inside Docker on the same Linux server as your application stack.

Traefik will act as a reverse proxy in front of Jenkins, exposing it via a clean URL ([`jenkins.example.com`](https://jenkins.example.com)) with **auto-renewing Let's Encrypt certificates**.

You'll also create a Jenkinsfile in your application repository that:

- Automatically triggers on every push to the <VPIcon icon="fas fa-code-branch"/>`staging` branch,
- Detects which microservices changed in each commit,
- Pulls the latest code on the host machine,
- Rebuilds and restarts **only the affected services**.

On every push, only the relevant services are redeployed.

::: note Prerequisites

Before jumping in, this guide assumes you’re already comfortable with a few core concepts and tools.

This isn't a beginner-level tutorial — we’ll be working directly with infrastructure, containers, and CI/CD pipelines.

You should be familiar with:

- Basic Linux commands (SSH, file system navigation, permissions)
- Docker fundamentals (images, containers, volumes, networks)
- Git workflows (clone, pull, branches)
- General idea of CI/CD pipelines

Tools and environment required:

- A Linux server (Ubuntu recommended)
- Docker Engine + Docker Compose (v2)
- A domain name (for Traefik + HTTPS)
- GitHub repository (for your backend project)
- Basic understanding of microservices architecture

:::

If you’re comfortable with the above, you’re ready to follow along.

---

## 2. Architecture

Here's an overview of the architecture:

```plaintext
┌──────────────────────────── Linux server (Ubuntu) ────────────────────────────┐
│                                                                               │
│   /home/developer/projects/                                                  │
│       └── project-prod-configs/             ← infra repo (compose, Traefik) │
│              ├── docker-compose.staging.yml                                   │
│              ├── traefik.staging.yml                                          │
│              └── project-backend/          ← app repo (services, gateways) │
│                     ├── Jenkinsfile                                           │
│                     ├── docker-compose.staging.yml                            │
│                     └── apps/                                                 │
│                            ├── services/<name>/                               │
│                            ├── gateways/<name>/                               │
│                            └── core/<name>/                                   │
│                                                                               │
│   ┌─────────────────────── Docker network: proxy ──────────────────────┐      │
│   │  traefik (80, 443)                                                 │      │
│   │     │                                                              │      │
│   │     ├──► jenkins  (projects-jenkins-staging)                     │      │
│   │     │      ↳ /projects  ← bind-mount of the host project tree     │      │
│   │     │      ↳ /var/run/docker.sock ← controls host Docker           │      │
│   │     │                                                              │      │
│   │     └──► your services & gateways (built by the pipeline)          │      │
│   └────────────────────────────────────────────────────────────────────┘      │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
            ▲
            │  webhook on push
            │
   GitHub: <org>/project-backend (branch: staging)
```
<!-- TODO: mermaid화 -->

There are two key ideas here:

1. **Jenkins runs in a container**, but it controls the **host's** Docker by mounting <VPIcon icon="fas fa-folder-open"/>`/var/run/docker.sock`. It also bind-mounts the project folder as <VPIcon icon="fas fa-folder-open"/>`/projects/...`, so it can `cd` into the real code on the host and run `docker compose` there.
2. The **Jenkinsfile lives inside the app repo**, so the pipeline definition is versioned with the code. Jenkins simply points at it.

### 3. Server Prerequisites

Before we start configuring Jenkins or Traefik, we need to prepare the server properly.

In this step, we’ll:

- Create a dedicated Linux user for managing the project
- Install Docker and Docker Compose
- Set up the folder structure for our repositories

This ensures our CI/CD pipeline runs in a clean and predictable environment.

```sh
# Linux user that owns the project tree
sudo adduser developer

# Docker engine + Compose plugin
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker developer

# Sanity check Compose v2
docker compose version
# -> Docker Compose version v2.x.y

# Find where the Compose plugin binary lives — write it down, you'll need it
ls /usr/libexec/docker/cli-plugins/docker-compose
# (some distros use /usr/lib/docker/cli-plugins/docker-compose)

# Project layout
sudo mkdir -p /home/developer/project
sudo chown -R developer:developer /home/developer/project

# Clone both repos in the right place
cd /home/developer/projects
git clone https://github.com/<org>/projects-prod-configs.git
cd projects-prod-configs
git clone -b staging https://github.com/<org>/projects-backend.git
```

You should now have:

```plaintext
/home/developer/projects/projects-prod-configs/projects-backend
```

Memorize this path — your Jenkinsfile references it.

### DNS

Point an A-record for your Jenkins subdomain to the server's public IP **before** the next steps so Let's Encrypt can validate via HTTP challenge:

```plaintext
jenkins.example.com   A   <server-public-ip>
```

---

## 4. Traefik — the Reverse Proxy

Traefik acts as the entry point to your entire system. Instead of exposing each service manually with ports, Traefik automatically:

- Routes traffic based on domain names
- Generates and renews HTTPS certificates using Let’s Encrypt
- Connects to Docker and detects services dynamically

In simple terms, Traefik lets you access services like:

- [`jenkins.example.com`](https://jenkins.example.com)  
- [`api.example.com`](https://api.example.com)

…without manually configuring NGINX or managing SSL certificates.

In this setup, Traefik watches Docker containers and routes traffic using labels we'll define later.

Traefik gives every container a real domain and a real cert with **zero per-service config** — you just add a few labels.

### <VPIcon icon="iconfont icon-yaml"/>`traefik.staging.yml` (static config)

Put this at the root of your infra repo:

```yaml title="traefik.staging.yml"
api:
  dashboard: true

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

certificatesResolvers:
  letsencrypt:
    acme:
      httpChallenge:
        entryPoint: web
      email: admin@example.com           # ← change me
      storage: /etc/traefik/acme.json

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false              # only containers with traefik.enable=true
    network: proxy
  file:
    directory: /etc/traefik/dynamic
    watch: true

log:
  level: INFO

accessLog: {}
```

### The Traefik service in `docker-compose.staging.yml`

```yaml title="docker-compose.staging.yml"
networks:
  proxy:
    name: proxy
    driver: bridge
  internal:
    name: internal
    driver: bridge

volumes:
  acme-data:
  traefik-logs:
  jenkins-data:

services:
  traefik:
    image: traefik:v2.11
    container_name: projects-traefik-staging
    restart: unless-stopped
    ports:
      - "80:80"        # HTTP (auto-redirects to HTTPS)
      - "443:443"      # HTTPS
      - "8080:8080"    # Traefik dashboard (internal only — protect via firewall)
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.staging.yml:/etc/traefik/traefik.yml:ro
      - ./dynamic:/etc/traefik/dynamic:ro
      - acme-data:/etc/traefik           # persists Let's Encrypt certs
      - traefik-logs:/var/log/traefik
    networks:
      - proxy
    command:
      - '--api.insecure=false'
      - '--api.dashboard=true'
      - '--providers.docker=true'
      - '--providers.docker.exposedbydefault=false'
      - '--providers.docker.network=proxy'
      - '--entrypoints.web.address=:80'
      - '--entrypoints.websecure.address=:443'
      - '--entrypoints.web.http.redirections.entryPoint.to=websecure'
      - '--entrypoints.web.http.redirections.entryPoint.scheme=https'
      - '--certificatesresolvers.letsencrypt.acme.httpchallenge=true'
      - '--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web'
      - '--certificatesresolvers.letsencrypt.acme.email=${ACME_EMAIL:-admin@example.com}'
      - '--certificatesresolvers.letsencrypt.acme.storage=/etc/traefik/acme.json'
      - '--log.level=INFO'
      - '--accesslog=true'
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=proxy"
      # Traefik's own dashboard
      - "traefik.http.routers.traefik-dash.rule=Host(`traefik.example.com`)"
      - "traefik.http.routers.traefik-dash.entrypoints=websecure"
      - "traefik.http.routers.traefik-dash.tls.certresolver=letsencrypt"
      - "traefik.http.routers.traefik-dash.service=api@internal"
```

Bring it up:

```sh
cd /home/developer/projects/projects-prod-configs
docker compose -f docker-compose.staging.yml up -d traefik
```

Watch the logs the first time — Traefik will request a cert for the dashboard host as soon as DNS resolves.

```sh
docker logs -f projects-traefik-staging
```

::: tip

While testing, switch ACME to staging endpoint (`acme.caServer=https://acme-staging-v02.api.letsencrypt.org/directory`) so you don't burn through Let's Encrypt's rate limits if you misconfigure DNS. Remove that flag before going live.

:::

---

## 5. Run Jenkins in Docker

Add this Jenkins service to the same <VPIcon icon="iconfont icon-yaml"/>`docker-compose.staging.yml`. Every line matters (and the comments explain why).

```yaml title="docker-compose.staging.yml"
  jenkins:
    image: jenkins/jenkins:lts
    container_name: projects-jenkins-staging
    restart: unless-stopped
    user: root                           # to use host docker.sock without UID juggling
    environment:
      - JAVA_OPTS=-Xmx1g -Xms512m -Duser.timezone=Asia/Dhaka
      - TZ=Asia/Dhaka                    # OS-level timezone inside container
      - JENKINS_OPTS=--prefix=/
    ports:
      - "3095:8080"                      # web UI (also reachable directly if needed)
      - "50000:50000"                    # inbound agent port
    volumes:
      - jenkins-data:/var/jenkins_home   # Jenkins config/jobs/secrets persistence
      - /var/run/docker.sock:/var/run/docker.sock                          # control host Docker
      - /usr/bin/docker:/usr/bin/docker                                     # docker CLI from host
      - /usr/libexec/docker/cli-plugins:/usr/libexec/docker/cli-plugins:ro  # docker compose plugin
      - /home/developer/projects:/projects                                # project tree
      - /etc/localtime:/etc/localtime:ro                                    # match host clock
      - /etc/timezone:/etc/timezone:ro
    networks:
      - proxy
      - internal
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:8080/login']
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 120s
    deploy:
      resources:
        limits:
          memory: 1024M
```

::: important Why `user: root`?

It's the simplest way to share `docker.sock` and the project bind-mount without UID/GID gymnastics. If you prefer an unprivileged user, you'll need to set `group: docker` and align UIDs/perms on host folders — possible but out of scope here.

:::

---

## 6. Expose Jenkins on a Domain via Traefik

This is the section many guides skip. We'll add **labels** to the Jenkins service so Traefik picks it up automatically. No editing of Traefik config required.

```yaml
  jenkins:
    # ... everything above ...
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=proxy"

      # 1) Router — match incoming Host
      - "traefik.http.routers.jenkins.rule=Host(`jenkins.example.com`)"
      - "traefik.http.routers.jenkins.entrypoints=websecure"
      - "traefik.http.routers.jenkins.tls.certresolver=letsencrypt"
      - "traefik.http.routers.jenkins.service=jenkins"

      # 2) Service — tell Traefik which container port is the app
      - "traefik.http.services.jenkins.loadbalancer.server.port=8080"

      # 3) Middleware — Jenkins needs X-Forwarded-Proto so it knows it's behind HTTPS
      - "traefik.http.middlewares.jenkins-headers.headers.customrequestheaders.X-Forwarded-Proto=https"
      - "traefik.http.routers.jenkins.middlewares=jenkins-headers"
```

What each line does:

| Label | Purpose |
| --- | --- |
| `traefik.enable=true` | Opts this container in (we set `exposedByDefault=false`). |
| `traefik.docker.network=proxy` | Tells Traefik which network to talk to Jenkins on (Jenkins is on both `proxy` and `internal`). |
| `routers.jenkins.rule=Host(...)` | Forwards only this hostname to Jenkins. |
| `routers.jenkins.entrypoints=websecure` | Listens only on 443. (HTTP redirect was set up in section 4.) |
| `routers.jenkins.tls.certresolver=letsencrypt` | Auto-issues + renews the cert. |
| `services.jenkins.loadbalancer.server.port=8080` | Jenkins listens on 8080 inside the container. |
| `customrequestheaders.X-Forwarded-Proto=https` | Without this, Jenkins generates `http://` URLs in webhooks/links and breaks. |

Bring Jenkins up:

```sh
cd /home/developer/projects/projects-prod-configs
docker compose -f docker-compose.staging.yml up -d jenkins

# Watch Traefik issue the certificate
docker logs -f projects-traefik-staging | grep -i acme
```

After 10–60 seconds you should be able to open `https://jenkins.example.com` and see Jenkins's setup wizard with a valid lock icon.

Inside Jenkins (after first login):

Manage Jenkins → System → Jenkins URL → set this to: [`jenkins.example.com`](https://jenkins.example.com/)

This is important because Jenkins uses this base URL to generate:

- Webhook endpoints (for GitHub triggers)
- Links inside emails and build logs

If this isn't set correctly, GitHub webhooks may fail, and any links Jenkins generates will point to the wrong address (often localhost or internal IPs).

---

## 7. First-Time Jenkins Setup

If you're running Jenkins for the first time on this server, follow this section to complete the initial setup.

If you already have Jenkins configured, you can skip this section — but make sure the required plugins and settings match what we use later in this guide.

1. Open `https://jenkins.example.com`. Get the initial admin password:

```sh
docker exec projects-jenkins-staging cat /var/jenkins_home/secrets/initialAdminPassword
```

2. Paste it, choose Install suggested plugins.
3. Create your admin user.
4. Manage Jenkins → Plugins → Available and install:
    - GitHub (and GitHub Branch Source)
    - Pipeline: GitHub
    - Credentials Binding (usually preinstalled)

That's all the plugins you need for the rest of this guide.

---

## 8. Add the GitHub Credential

Jenkins needs permission to access your GitHub repository.

This is done using a GitHub Personal Access Token (PAT), which acts like a password for secure API and Git operations.

We’ll store this token inside Jenkins as a credential so it can pull code during pipeline execution and authenticate securely without exposing secrets in code.

This single credential is used both for the SCM checkout and for the deploy-time `git pull`.

1. Create a Personal Access Token (classic) on GitHub with `repo` scope.
2. In Jenkins: Manage Jenkins → Credentials → System → Global → Add Credentials.
3. Fill in:
    - Kind: Username with password
    - Username: your GitHub username
    - Password: the token
    - **ID:** `github_classic_token` *(the Jenkinsfile references this exact ID)*

---

## 9. Create the Pipeline Job

Now that Jenkins has access to your repository, the next step is to define how deployments should run.

A pipeline job tells Jenkins:

- where your code lives,
- which branch to monitor,
- and how to execute your deployment process.

In Jenkins, create a new Pipeline job and connect it to your GitHub repository. Once this is set up, Jenkins will automatically trigger deployments whenever you push to the <VPIcon icon="fas fa-code-branch"/>`staging` branch.

Start by creating a new job:

New Item → Pipeline → name it `projects-staging` → OK

Then configure the job:

- Under **Build Triggers**, enable: **GitHub hook trigger for GITScm polling**
- Under **Pipeline**:
  - Definition: Pipeline script from SCM
  - SCM: Git
  - Repository URL: `https://github.com/<org>/projects-backend.git`
  - Credentials: `github_classic_token`
  - Branch: `*/staging`
  - Script Path: `Jenkinsfile`

Save the configuration.

At this point, Jenkins is fully connected to your repository and ready to run your deployment pipeline automatically.

---

## 10. The Jenkinsfile (Deploy Only What Changed)

Place this at the root of the **app** repo (<VPIcon icon="fas fa-folder-open"/>`projects-backend/`<VPIcon icon="fa-brands fa-jenkins"/>`Jenkinsfile`), branch <VPIcon icon="fas fa-code-branch"/>`staging`.

```groovy :collapsed-lines title="Jenkinsfile"
pipeline {
  agent any

  environment {
    PROJECT_PATH = "/projects/projects-prod-configs/projects-backend"
    COMPOSE_FILE = "docker-compose.staging.yml"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
        echo "Checkout completed for branch: ${env.BRANCH_NAME ?: 'staging'}"
      }
    }

    stage('Detect Changes') {
      steps {
        script {
          def changedFiles = sh(
            script: "git diff --name-only HEAD~1 HEAD",
            returnStdout: true
          ).trim()

          echo "Changed files:\n${changedFiles}"

          def services = [] as Set
          changedFiles.split('\n').each { file ->
            def svc  = file =~ /^apps\/services\/([a-z0-9-]+)\//
            def gw   = file =~ /^apps\/gateways\/([a-z0-9-]+)\//
            def core = file =~ /^apps\/core\/([a-z0-9-]+)\//
            if (svc)  { services << svc[0][1]  }
            if (gw)   { services << gw[0][1]   }
            if (core) { services << core[0][1] }
          }
          services = services.findAll { !it.endsWith('-e2e') }
          env.CHANGED_SERVICES = services.join(' ')

          echo "Services to deploy: ${env.CHANGED_SERVICES ?: '(none)'}"
        }
      }
    }

    stage('Deploy') {
      when { expression { return env.CHANGED_SERVICES?.trim() } }
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'github_classic_token',
          usernameVariable: 'GIT_USER',
          passwordVariable: 'GIT_TOKEN'
        )]) {
          sh '''
            set -eu
            git config --global --add safe.directory "${PROJECT_PATH}"
            cd "${PROJECT_PATH}"
            git remote set-url origin "https://github.com/<org>/projects-backend.git"
            git -c credential.helper= \
                -c "credential.helper=!f() { echo username=\({GIT_USER}; echo password=\){GIT_TOKEN}; }; f" \
                pull origin staging
            docker compose -f "\({COMPOSE_FILE}" up -d --build \){CHANGED_SERVICES}
          '''
        }
        echo "Deployed: ${env.CHANGED_SERVICES}"
      }
    }

    stage('Skip Deployment') {
      when { expression { return !env.CHANGED_SERVICES?.trim() } }
      steps { echo "No service changes detected — nothing to deploy." }
    }
  }
}
```

::: info Why each tricky line is there:

- `git config --global --add safe.directory ...` — git refuses to operate on a repo whose owner UID differs from the current user's. The repo on disk is owned by `developer`, but Git inside the container runs as `root`. This whitelists the path.
- `git remote set-url origin "https://..."` — flips the on-disk remote to HTTPS so the **token can be used**. (A PAT can't authenticate `git@github.com:` URLs — those use SSH.) Idempotent — safe to re-run.
- `git -c credential.helper="!f() { echo username=...; echo password=...; }; f"` — feeds the username/token to git for that one command without writing the token to disk and without exposing it on the process command line.
- `${CHANGED_SERVICES}` is unquoted on purpose so multiple service names expand as separate args.

:::

---

## 11. End-to-End Test

Before considering the setup complete, we need to verify that the entire pipeline works as expected.

This end-to-end test ensures that:

- GitHub webhooks are triggering Jenkins correctly,
- Jenkins can detect which services changed,
- and only the affected services are rebuilt and deployed.

In other words, this simulates a real production deployment.

Start by making a small change in your repository. For example, modify a file inside:

apps/gateways/student-apigw/

Then push the change to the <VPIcon icon="fas fa-code-branch"/>`staging` branch.

Once pushed, Jenkins should automatically trigger via the webhook. If not, you can manually click **Build Now**.

Now open the build’s **Console Output** and verify the flow. You should see something like:

- Checkout completed for branch: staging
- Services to deploy: student-apigw
- git pull origin staging (successful)
- docker compose ... up -d --build student-apigw
- Deployed: student-apigw

If you see this sequence, your pipeline is working correctly.

If anything fails, don’t worry — jump to Section 12 where every common issue and its fix is documented.

---

## 12. Troubleshooting — Every Error We Hit

This section covers real issues we faced while setting up this pipeline — and more importantly, *why each fix works*. Understanding the “why” will help you debug similar problems in your own setup.

### cd: can't cd to /projects/projects-prod-configs/projects-backend

::: critical Cause

The <VPIcon icon="fa-brands fa-jenkins"/>`Jenkinsfile` runs `cd $PROJECT_PATH`, but inside the container that path doesn’t exist. This usually happens when:

- the project wasn’t cloned on the host, or
- the bind mount isn’t configured correctly.

:::

::: info Fix

```sh
ls /home/developer/projects/projects-prod-configs/projects-backend
# If missing: git clone -b staging <url> there.
```

Confirm the bind mount:

```sh
docker inspect projects-jenkins-staging --format '{{range .Mounts}}{{.Source}} -> {{.Destination}}{{println}}{{end}}'
```

If missing, recreate the container:

```sh
docker compose -f docker-compose.staging.yml up -d --force-recreate jenkins
```

:::

::: important Why this works:

Jenkins runs inside a container, but your code lives on the host. The bind mount connects them. Without it, Jenkins cannot access your project directory.

:::

### fatal: detected dubious ownership in repository

::: critical Cause

Git blocks access when the repository owner differs from the current user.

- Repo owner: `developer` (host)
- Git runs as: `root` (inside container)

:::

::: info Fix

```plaintext
git config --global --add safe.directory "${PROJECT_PATH}"
```

:::

::: important Why this works:

This explicitly tells Git that the directory is trusted, bypassing ownership mismatch security restrictions.

:::

### `Host key verification failed` / `Could not read from remote repository`

::: critical Cause

The repository uses SSH (`git@github.com:...`), but:

- the container has no SSH keys
- no known_hosts file exists

Also, GitHub tokens cannot authenticate over SSH.

:::

::: info Fix (recommended):

```sh
git remote set-url origin "https://github.com/<org>/projects-backend.git"
```

:::

::: important Why this works:

HTTPS uses token-based authentication (PAT), which works inside containers without SSH configuration.

:::

### `unknown shorthand flag: 'f' in -f` ( `docker compose`)

::: critical Cause

The Docker CLI exists, but the Docker Compose plugin is missing inside the container.

:::

::: info Fix

```yaml
volumes:
  - /usr/libexec/docker/cli-plugins:/usr/libexec/docker/cli-plugins:ro
```

Find your path if needed:

```sh
find /usr -name docker-compose -type f 2>/dev/null
```

Verify:

```sh
docker exec projects-jenkins-staging docker compose version
```

:::

::: important Why this works:

Docker Compose v2 is a CLI plugin. Mounting this directory makes the `docker compose` command available inside the container.

:::

### Wrong timezone in build timestamps and Jenkins UI

::: info Fix

Set both env var and JVM flag, and bind-mount the host's clock files:

```yaml
environment:
  - TZ=Asia/Dhaka
  - JAVA_OPTS=... -Duser.timezone=Asia/Dhaka
volumes:
  - /etc/localtime:/etc/localtime:ro
  - /etc/timezone:/etc/timezone:ro
```

You **must** recreate the container for env-var changes to take effect:

```sh
docker compose -f docker-compose.staging.yml up -d --force-recreate jenkins
```

:::

::: important Why this works:

Jenkins runs on Java, which uses its own timezone separate from the OS.  
By aligning OS timezone, JVM timezone, and host clock, you ensure consistent timestamps everywhere.

:::

### ERR_SOCKET_TIMEOUT (pnpm install fails)

::: critical Cause

If you have multiple services building in parallel and each runs pnpm install with ~1500 packages, the network gets saturated and a timeout occurs.

:::

::: info Fixes

**Increase timeout + control concurrency**

```dockerfile title="Dockerfile"
RUN pnpm install --frozen-lockfile --ignore-scripts 
--network-timeout 600000 
--network-concurrency 8
```

Why: Gives pnpm more time and reduces network overload.

**Enable pnpm cache (BuildKit)**

```dockerfile title="Dockerfile"
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store 
pnpm install --frozen-lockfile --ignore-scripts
```

Why: Dependencies are cached and reused instead of downloading every time.

**Avoid unnecessary rebuilds**

```sh
docker compose -f \(COMPOSE_FILE build \)CHANGED_SERVICES docker compose -f \(COMPOSE_FILE up -d --no-build \)CHANGED_SERVICES
```

Why: Only changed services are rebuilt → less network load → fewer failures.

:::

### Container changes don’t apply after editing docker-compose.yml

::: critical Cause:

Docker compose up -d does not update running containers.

:::

::: info Fix:

```sh
docker compose -f docker-compose.staging.yml up -d --force-recreate jenkins
```

:::

::: important Why this works:

This forces Docker to recreate the container with updated configuration (env, volumes, labels).

:::

### Traefik shows default certificate (no HTTPS)

::: critical Common causes:

DNS not pointing to server Port 80 blocked Wrong Docker network

:::

::: info Check:

```sh
dig +short jenkins.example.com docker logs projects-traefik-staging 2>&1 | grep -i acme
```

:::

::: important Why this works:

Let’s Encrypt uses HTTP-01 challenge, so it must reach your server via port 80. If DNS or networking is wrong, certificate issuance fails.

:::

### Jenkins: "Reverse proxy setup is broken"

::: info Fix:

Set the Jenkins URL to [`jenkins.example.com`](https://jenkins.example.com/)  
Ensure header:

```plaintext
X-Forwarded-Proto: https
```

:::

::: important Why this works:

Jenkins needs to know it's behind HTTPS. Without this, it generates incorrect URLs (http instead of https), breaking redirects and webhooks.

:::

---

## 13. Mental Model: Host vs. Container

Many setup mistakes come from confusing the **host** filesystem with the **container** filesystem. This table makes it explicit:

| Inside the Jenkins container | Comes from on the host |
| --- | --- |
| `/var/jenkins_home` | docker volume `jenkins-data` (Jenkins config, jobs, secrets) |
| `/projects/...` | `/home/developer/projects/...` (your project tree) |
| `/usr/bin/docker` | host's `/usr/bin/docker` |
| `/usr/libexec/docker/cli-plugins/docker-compose` | host plugin (lets `docker compose` work) |
| `/var/run/docker.sock` | host Docker daemon (so builds happen on the host's engine) |
| `/etc/localtime`, `/etc/timezone` | host clock |
| `~/.ssh` | **nothing** — that's why SSH-to-GitHub doesn't work without extra setup |

::: note

When debugging, always ask: *"Inside which filesystem is this command running, and does the file/folder it's looking for exist there?"*

:::

---

## 14. Daily Operations Cheat Sheet

```sh
# Recreate Jenkins after changing compose
cd /home/developer/Projects/projects-prod-configs
docker compose -f docker-compose.staging.yml up -d --force-recreate jenkins

# Tail Jenkins logs
docker logs -f projects-jenkins-staging

# Open a shell inside the Jenkins container
docker exec -it projects-jenkins-staging bash

# From inside the container — sanity checks
docker compose version
ls /projects/projects-prod-configs/projects-backend
git -C /projects/projects-prod-configs/projects-backend remote -v

# Manually trigger the same deploy the pipeline does
cd /projects/projects-configs/projects-backend
git pull origin staging
docker compose -f docker-compose.staging.yml up -d --build student-apigw

# Inspect Traefik routing decisions
docker logs projects-traefik-staging 2>&1 | grep -i jenkins

# Check renewed certs
docker exec projects-traefik-staging cat /etc/traefik/acme.json | head -50
```

---

## 15. What I'd Do Differently Next Time

- **Pre-build a base image** with all node_modules baked in. With ~1500 packages × 15 services, every clean build re-downloads ~22k tarballs. A shared base cuts that 90%.
- **Run a private npm proxy** (Verdaccio / Nexus / GitHub Packages) on the same Docker network — eliminates flaky `npmjs.org` timeouts entirely.
- **Per-service Jenkinsfile** if your services drift apart in tooling. With one Jenkinsfile, every team contends for the same pipeline definition.
- **Replace** `git diff HEAD~1 HEAD` with `git diff $(git merge-base HEAD origin/staging~1) HEAD` so squash-merges and force-pushes don't accidentally skip services.
- **Move secrets to a vault** (HashiCorp Vault / AWS Secrets Manager / Doppler). PATs in Jenkins work, but rotation across many jobs is painful.
- **Use Jenkins' Configuration-as-Code (JCasC)** so the entire Jenkins setup (jobs, credentials definitions, plugins) is in git. Then a server rebuild is a one-command operation.

---

## Closing Thoughts

The pipeline itself is just three stages: **Checkout → Detect Changes → Deploy** — but a real production setup is mostly about **plumbing**: reverse proxy, certificates, bind-mounts, credentials, timezones, build caches. None of these are exotic. Together they decide whether your Friday-afternoon deploy goes silently green or eats your weekend.

Follow sections 1–11 to get a working pipeline. Bookmark section 12 to keep it working.

Happy shipping.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Built a Production-Ready CI/CD Pipeline for a Monorepo-Based Microservices System with Jenkins, Docker Compose, and Traefik",
  "desc": "This tutorial is a complete, real-world guide to building a production-ready CI/CD pipeline using Jenkins, Docker Compose, and Traefik on a single Linux server. You’ll learn how to expose services on ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-production-ready-ci-cd-pipeline-for-monorepo-based-microservices-system.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
