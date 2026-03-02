---
lang: en-US
title: "How to Use Docker Compose for Production Workloads — with Profiles, Watch Mode, and GPU Support"
description: "Article(s) > How to Use Docker Compose for Production Workloads — with Profiles, Watch Mode, and GPU Support"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Docker Compose for Production Workloads — with Profiles, Watch Mode, and GPU Support"
    - property: og:description
      content: "How to Use Docker Compose for Production Workloads — with Profiles, Watch Mode, and GPU Support"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-docker-compose-for-production-workloads.html
prev: /devops/docker/articles/README.md
date: 2026-03-06
isOriginal: false
author:
  - name: Balajee Asish Brahmandam
    url: https://freecodecamp.org/news/author/Balajeeasish/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/73c5f43a-321c-4ce1-8eb4-872b532cc8dd.png
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

[[toc]]

---

<SiteInfo
  name="How to Use Docker Compose for Production Workloads — with Profiles, Watch Mode, and GPU Support"
  desc="There's a perception problem with Docker Compose. Ask a room full of platform engineers what they think of it, and you'll hear some version of: ”It's great for local dev, but we use Kubernetes for rea"
  url="https://freecodecamp.org/news/how-to-use-docker-compose-for-production-workloads"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/73c5f43a-321c-4ce1-8eb4-872b532cc8dd.png"/>

There's a perception problem with Docker Compose. Ask a room full of platform engineers what they think of it, and you'll hear some version of: "It's great for local dev, but we use Kubernetes for real work."

I get it. I held that same opinion for years. Compose was the thing I used to spin up a Postgres database on my laptop, not something I'd trust with a staging environment, let alone a workload that needed GPU access.

Then 2024 and 2025 happened. Docker shipped a set of features that quietly transformed Compose from a developer convenience tool into something that can handle complex deployment scenarios. Profiles let you manage multiple environments from a single file. Watch mode killed the painful rebuild cycle that made container-based development feel sluggish. GPU support opened the door to ML inference workloads. And a bunch of smaller improvements (better health checks, Bake integration, structured logging) filled in the gaps that used to make Compose feel like a toy.

Here's what I'll cover: using Docker Compose profiles to manage multiple environments from one file, setting up watch mode for instant code syncing during development, configuring GPU passthrough for machine learning workloads, implementing proper health checks and startup ordering so your services stop crashing on cold starts, and using Bake to bridge the gap between your local Compose workflow and production image builds. I'll also tell you where Compose still falls short and where you should reach for something else.

::: note Prerequisites

You should be comfortable with Docker basics and have written a `compose.yaml` file before. You'll need Docker Compose v2 installed. The minimum version depends on which features you want: `service_healthy` dependency conditions require v2.20.0+, watch mode requires v2.22.0+, and the `gpus:` shorthand requires v2.30.0+. Run `docker compose version` to check what you have.

:::

---

## The Modern Compose File: What's Changed

If you haven't looked at a Compose file recently, the first thing you'll notice is that the `version` field is gone. Docker Compose v2 ignores it entirely, and including it actually triggers a deprecation warning. A modern <VPIcon icon="iconfont icon-yaml"/>`compose.yaml` starts cleanly with your services, no preamble needed.

But the structural changes go deeper than that. Here's what a modern, production-aware Compose file looks like for a typical web application stack:

```yaml title="compose.yaml"
services:
  api:
    image: ghcr.io/myorg/api:${TAG:-latest}
    env_file: [configs/common.env]
    environment:
      - NODE_ENV=${NODE_ENV:-production}
    ports:
      - "8080:8080"
    depends_on:
      db:
        condition: service_healthy
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: "1.0"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 10s
      timeout: 5s
      retries: 3

  db:
    image: postgres:16-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5

volumes:
  db-data:
```

Look at what's in there: resource limits, health checks with dependency conditions, proper volume management. These aren't nice-to-haves. They're the features that make Compose viable beyond your laptop.

Health checks in particular solve one of Compose's oldest and most annoying pain points: the race condition where your web server starts before the database is actually ready to accept connections. If you've ever added `sleep 10` to a startup script and crossed your fingers, you know what I'm talking about.

---

## How to Use Profiles to Manage Multiple Environments

This is the feature that changed my relationship with Compose. Before profiles, managing different environments meant choosing between two painful approaches. Either you maintained multiple Compose files (<VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`, <VPIcon icon="iconfont icon-yaml"/>`docker-compose.dev.yml`, <VPIcon icon="iconfont icon-yaml"/>`docker-compose.test.yml`, <VPIcon icon="iconfont icon-yaml"/>`docker-compose.prod.yml`) and dealt with the inevitable drift between them. Or you used one big bloated file where you commented out services depending on the context. Both approaches were fragile, and both led to those fun "works on my machine" conversations.

Profiles give you a much cleaner path. You assign services to named groups. Services without a profile always start. Services with a profile only start when you explicitly activate that profile. You can also activate profiles with the `COMPOSE_PROFILES` environment variable instead of the CLI flag, which is handy for CI (see the [<VPIcon icon="fa-brands fa-docker"/>official profiles docs](https://docs.docker.com/compose/how-tos/profiles/) for the full syntax).

Here's what that looks like:

```yaml
services:
  api:
    image: myapp:latest
    # No profiles = always starts

  db:
    image: postgres:16
    # No profiles = always starts

  debug-tools:
    image: busybox
    profiles: [debug]
    # Only starts with --profile debug

  prometheus:
    image: prom/prometheus
    profiles: [monitoring]
    # Only starts with --profile monitoring

  grafana:
    image: grafana/grafana
    profiles: [monitoring]
    depends_on: [prometheus]
```

Now your team operates with simple, memorable commands:

```sh
# Development: just the core stack
docker compose up -d

# Development with observability
docker compose --profile monitoring up -d

# CI: core stack only (no monitoring overhead)
docker compose up -d

# Full stack with debugging
docker compose --profile debug --profile monitoring up
```

One Compose file. No drift. No guesswork about which override file to pass.

### Real-World Profile Patterns I've Used

Four patterns I keep coming back to:

#### The "infra-only" pattern

This is for developers who run application code natively on their host machine but need infrastructure services like databases, message queues, and caches in containers. You leave infrastructure services without a profile and put application services behind one. Your backend developer runs `docker compose up` to get Postgres and Redis, then starts the API directly on their host with their favorite debugger attached.

#### The "mock vs. real" pattern

You put a `payments-mock` service in the `dev` profile and a real payments gateway service in the `prod` profile. Same Compose file, totally different behavior depending on context. This one saved my team from accidentally hitting a live payment API during development more than once.

#### The "CI optimization" pattern

Heavy services like Selenium browsers and monitoring stacks go behind profiles so your CI pipeline skips them. Your test suite runs faster without that overhead, and you only pull those services in when you actually need end-to-end integration tests.

#### The "AI/ML workloads" pattern

GPU-dependent services (inference servers, model training containers) go into a `gpu` profile. Developers without GPUs can still work on the rest of the stack without anything breaking.

One practical tip that's saved me a lot of headaches: document your profiles in the project's README. It sounds obvious, but when a new team member runs `docker compose up` and wonders why the monitoring dashboard isn't starting, they need a single place to find the answer. A quick table listing each profile and what it includes will save you from answering the same Slack question every onboarding cycle.

---

## How to Use Watch Mode to End the Rebuild Cycle

If profiles solved the environment management problem, watch mode solved the developer experience problem.

You probably know the old workflow for container-based development. It went like this: edit code, run `docker compose build`, run `docker compose up`, test your change, find a bug, edit again, rebuild, restart, test. Each iteration costs you thirty seconds to a minute of waiting. Over a full day of active development, you're losing an hour or more just sitting there watching build logs scroll by.

Watch mode (introduced in Compose v2.22.0 and significantly improved in later releases) monitors your local files and automatically takes action when something changes. It supports three synchronization strategies, and picking the right one for each situation is the key to making it work well. The [<VPIcon icon="fa-brands fa-docker"/>official watch mode docs](https://docs.docker.com/compose/how-tos/file-watch/) cover the full spec if you want to dig deeper.

`sync` copies changed files directly into the running container. This works best for interpreted languages like Python, JavaScript, and Ruby, and for frameworks with hot module reloading like React, Vue, or Next.js. The file lands in the container, the framework picks up the change, and your browser updates. No rebuild, no restart. If you're working with a compiled language like Go, Rust, or Java, `sync` won't help you since the code needs to be recompiled. Use `rebuild` for those instead.

`rebuild` triggers a full image rebuild and container replacement. You want this for dependency changes, like when you update <VPIcon icon="iconfont icon-json"/>`package.json` or <VPIcon icon="fas fa-file-lines"/>`requirements.txt`, or when you modify the Dockerfile itself. In those cases, syncing files isn't enough. You need a fresh image.

`sync+restart` syncs files into the container, then restarts the main process. This is ideal for configuration file changes like <VPIcon icon="fas fa-gears"/>`nginx.conf` or database configs, where the application needs to reload to pick up the new settings but the image itself is fine.

Here's what a real-world watch configuration looks like for a Node.js application:

```yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
    command: npx nodemon server.js
    develop:
      watch:
        - action: sync
          path: ./src
          target: /app/src
          ignore:
            - node_modules/
        - action: rebuild
          path: package.json
        - action: sync+restart
          path: ./config
          target: /app/config
```

You start it with `docker compose up --watch`, or you can run `docker compose watch` as a standalone command if you'd rather keep the file sync events separate from your application logs.

A few things to know before you set this up. Watch mode only works with services that have a local `build:` context. If you're pulling a prebuilt image from a registry, there's nothing for Compose to sync or rebuild, so watch will ignore that service. Your container also needs basic file utilities (`stat`, `mkdir`) installed, and the container `USER` must have write access to the target path. If you're using a minimal base image like `scratch` or `distroless`, the `sync` action won't work. And if you're on an older Compose version, check which actions are supported: `sync+restart` and `sync+exec` were added in later minor releases after the initial v2.22.0 launch.

It's a massive improvement. Edit a source file, save it, and the change is live in under a second for frameworks with hot reload. No context switching to run build commands. No waiting. Just code.

### Watch Mode vs. Bind Mounts

A fair question you might be asking: bind mounts have provided a form of live-reload for years. Why does watch mode need to exist?

Bind mounts work, but they come with platform-specific issues that have plagued Docker Desktop for a long time. On macOS and Windows, bind mounts go through a filesystem sharing layer between the host OS and the Linux VM running Docker. This introduces permission quirks, performance problems on large directories (ever watched a <VPIcon icon="fas fa-folder-open"/>`node_modules` folder choke a bind mount on macOS?), and inconsistent file notification behavior that makes hot reload unreliable.

Watch mode sidesteps these issues by explicitly syncing files at the application level. It's more predictable, works consistently across platforms, and gives you more control over what happens when a file changes.

That said, bind mounts still work well for many use cases, especially if you're on native Linux where the performance overhead doesn't exist. Watch mode is the better choice for teams that have run into cross-platform issues, or for anyone who wants the automatic rebuild and restart triggers that bind mounts can't provide.

---

## How to Set Up GPU Support for Machine Learning Workloads

This is the feature that made me rethink what Compose can do.

Docker has supported GPU passthrough for individual containers for years through the NVIDIA Container Toolkit and the `--gpus` flag. But configuring GPU access in Compose files used to require clunky runtime declarations that were poorly documented and changed between Compose versions. It was the kind of thing where you'd find a Stack Overflow answer from 2021, try it, and discover it didn't work anymore.

The modern Compose spec handles it cleanly through the `deploy.resources.reservations.devices` block:

```yaml
services:
  inference:
    image: myorg/model-server:latest
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

If you're on Compose v2.30.0 or later, there's also a shorter syntax using the `gpus:` field:

```yaml
services:
  inference:
    image: myorg/model-server:latest
    gpus:
      - driver: nvidia
        count: 1
```

Both approaches do the same thing. The `deploy.resources` syntax works on older Compose versions and gives you more control (like setting `device_ids` to pin specific GPUs). The `gpus:` shorthand is cleaner when you just need basic access.

**One thing that will trip you up if you skip it:** your host machine needs the right GPU drivers and `nvidia-container-toolkit` installed before any of this works. Run `nvidia-smi` on the host first. If that command doesn't show your GPUs, Compose won't see them either. For CUDA workloads, use official GPU base images like `nvidia/cuda` or the PyTorch/TensorFlow GPU images. The [<VPIcon icon="fa-brands fa-docker"/>Compose GPU access docs](https://docs.docker.com/compose/how-tos/gpu-support/) walk through the full setup.

That's the whole thing. When you run `docker compose up`, the inference service gets access to one NVIDIA GPU. You can set `count` to `"all"` if you want every available GPU, or use `device_ids` to assign specific GPUs to specific services.

### How to Combine Multi-GPU Workloads with Profiles

Here's where profiles and GPU support work really well together. Consider an ML workload where you need an LLM for text generation, an embedding model for vector search, and a vector database:

```yaml
services:
  vectordb:
    image: milvus/milvus:latest
    # Runs on CPU, no profile needed

  llm-server:
    image: ollama/ollama:latest
    profiles: [gpu]
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              device_ids: ["1"]
              capabilities: [gpu]
    volumes:
      - model-cache:/root/.ollama

  embedding-server:
    image: myorg/embeddings:latest
    profiles: [gpu]
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              device_ids: ["0"]
              capabilities: [gpu]
```

Developers without GPUs work on the application logic with just `docker compose up`. The vector database starts, they can write code against its API, and everything runs fine. When it's time to test the full ML pipeline, someone with a multi-GPU workstation runs `docker compose --profile gpu up` and gets the complete stack with specific GPU assignments.

This pattern has become central to our AIOps platform development. The team building alerting logic doesn't need GPUs. The team training anomaly detection models does. One Compose file serves both teams.

---

## How to Configure Health Checks, Dependencies, and Startup Ordering

One of Compose's most underappreciated improvements is how it handles service dependencies. The `depends_on` directive now supports conditions that actually mean something (this requires Compose v2.20.0+, see the [<VPIcon icon="fa-brands fa-docker"/>startup ordering docs](https://docs.docker.com/compose/how-tos/startup-order/) for the full picture):

```yaml
depends_on:
  db:
    condition: service_healthy
  redis:
    condition: service_started
```

When you combine this with proper health checks, you eliminate the "sleep 10 and hope" pattern that plagues so many Compose setups. Your API service actually waits until PostgreSQL is accepting connections before it tries to start. Not just until the container is running, but until the database process inside it has passed its health check.

One detail that catches people: tune your `start_period`. Databases like PostgreSQL need time to initialize on first boot, especially if they're running migrations. Without a `start_period`, the health check starts counting retries immediately and can declare the service unhealthy before it even had a chance to finish starting up. A config like this works well for most database services:

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres"]
  interval: 5s
  timeout: 2s
  retries: 10
  start_period: 30s
```

The `start_period` gives the container 30 seconds of grace time where failed health checks don't count against the retry limit.

This might seem like a small detail, but if you've ever worked on a stack with eight or ten interconnected services, you know how much time you can waste debugging cascading failures during cold starts. Proper startup ordering prevents all of that and makes your local environment behave much more like production.

---

## How to Use Bake for Production Image Builds

I mentioned Bake integration earlier, and it's worth its own section because it solves a problem you'll hit as soon as you start using Compose for anything beyond local dev: your development Compose file and your production build process have different needs.

During development, you want fast builds, local caches, and single-platform images. For production, you want tagged images pushed to a registry, multi-platform builds, and build attestations. Trying to cram both into your <VPIcon icon="iconfont icon-yaml"/>`compose.yaml` gets messy fast.

Docker Bake (`docker buildx bake`) can read your <VPIcon icon="iconfont icon-yaml"/>`compose.yaml` and generate build targets from it, but you can override and extend those targets with a separate <VPIcon icon="iconfont icon-hashicorp"/>`docker-bake.hcl` file. This keeps your development workflow clean while giving CI the knobs it needs. The [<VPIcon icon="fa-brands fa-docker"/>Bake documentation](https://docs.docker.com/build/bake/) covers the full HCL syntax and Compose integration.

Here's a minimal <VPIcon icon="iconfont icon-hashicorp"/>`docker-bake.hcl`:

```hcl title="docker-bake.hcl"
group "default" {
  targets = ["api", "worker"]
}

target "api" {
  context    = "api"
  dockerfile = "Dockerfile"
  tags       = ["registry.example.com/team/api:release"]
  platforms  = ["linux/amd64"]
}

target "worker" {
  context    = "worker"
  dockerfile = "Dockerfile"
  tags       = ["registry.example.com/team/worker:release"]
}
```

Then your CI pipeline runs `docker buildx bake` to produce release images, while developers keep using `docker compose up --build` locally. The two workflows share the same Dockerfiles but have separate build configurations where they need them.

The pattern I've landed on: use Compose for local development and CI test environments, use Bake in CI to produce the release images, and push those images into whatever deployment target your team uses (staging server, Kubernetes cluster, edge node). Compose gets you from code to running containers fast. Bake gets you from code to production-ready images with proper tags and attestations.

---

## What Compose Is Not (An Honest Assessment)

I've spent this entire article making the case that Compose has grown up. But I should also tell you where it falls short. I'd rather you hear it from me now than discover it the hard way in production.

### Compose is not a container orchestrator

It doesn't schedule work across multiple hosts. It doesn't do automatic failover. It won't give you rolling updates with zero downtime, and it has no concept of service mesh networking. If you need any of those things, you need Kubernetes, Nomad, or Docker Swarm (if you're still using it).

### Compose doesn't replace Helm or Kustomize

If you're deploying to Kubernetes, Compose files don't translate directly. Docker offers Compose Bridge to convert Compose files into Kubernetes manifests, but it's still experimental and won't handle complex Kubernetes-specific configurations like custom resource definitions or ingress rules.

### Compose doesn't handle secrets well in production

The secrets support exists, but it's limited compared to HashiCorp Vault, AWS Secrets Manager, or Kubernetes secrets. For anything beyond a staging environment, you'll want an external secrets management solution.

The sweet spot for modern Compose is clear: local development, CI/CD testing environments, single-node staging environments, and workloads where a single powerful machine (particularly for GPU work) is the right deployment target. Within that scope, Compose is excellent. Outside of it, you'll hit walls fast.

If you do run Compose in a staging or single-node production setup, a few more things are worth adding that I haven't covered here: `restart: unless-stopped` on every service so containers come back after a host reboot, a logging driver config so your logs go somewhere searchable instead of disappearing into `docker logs`, and a backup strategy for your named volumes. These aren't Compose-specific problems, but Compose won't solve them for you either.

---

## A Practical Adoption Path

If you're currently working with a basic Compose setup and want to start using these features, here's the order I'd recommend. Each step is incremental, backward-compatible, and valuable on its own. You don't have to do all of this at once.

### Week 1: Add health checks and proper `depends_on` conditions

This alone will eliminate the most common frustration: services crashing on startup because their dependencies aren't ready yet. Start with your database and your main application service. Once those two are wired up with `condition: service_healthy`, you'll notice the difference immediately.

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres"]
  interval: 5s
  timeout: 2s
  retries: 10
  start_period: 30s
```

### Week 2: Introduce profiles

Start by putting your monitoring stack behind a `monitoring` profile and your debug tools behind a `debug` profile. Then delete whatever extra Compose files you've been maintaining. Having one source of truth instead of four files that are almost-but-not-quite the same makes everything simpler.

### Week 3: Set up watch mode for your most-edited service

Pick the service where your developers spend the most time iterating. Get watch mode working there first. Once the team sees the difference (saving a file and seeing the change reflected in under a second) they'll ask for it on everything else.

### Week 4: Add resource limits

Define memory and CPU limits for every service. This prevents one runaway container from starving the rest and gives you a realistic preview of how your services behave under production constraints. It's also useful for catching memory leaks early.

```yaml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: "1.0"
```

---

## Wrapping Up

Docker Compose in 2026 is not the same tool it was a few years ago. Profiles, watch mode, GPU support, proper dependency management, and Bake integration have turned it into something that can handle real, complex workloads, as long as those workloads fit on a single node.

It's not Kubernetes, and it shouldn't try to be. But for local development, CI pipelines, staging environments, and single-machine GPU workloads, it's become hard to argue against. If you've been dismissing Compose because of what it used to be, the current version deserves a second look.

If you found this useful, you can find me writing about DevOps, containers, and AIOps best practices on my blog.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Docker Compose for Production Workloads — with Profiles, Watch Mode, and GPU Support",
  "desc": "There's a perception problem with Docker Compose. Ask a room full of platform engineers what they think of it, and you'll hear some version of: ”It's great for local dev, but we use Kubernetes for rea",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-docker-compose-for-production-workloads.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
