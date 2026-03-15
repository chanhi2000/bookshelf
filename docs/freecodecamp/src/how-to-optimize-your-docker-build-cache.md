---
lang: en-US
title: "How to Optimize Your Docker Build Cache & Cut Your CI/CD Pipeline Times by 80%"
description: "Article(s) > How to Optimize Your Docker Build Cache & Cut Your CI/CD Pipeline Times by 80%"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - github
  - githubactions
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Optimize Your Docker Build Cache & Cut Your CI/CD Pipeline Times by 80%"
    - property: og:description
      content: "How to Optimize Your Docker Build Cache & Cut Your CI/CD Pipeline Times by 80%"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-optimize-your-docker-build-cache.html
prev: /devops/docker/articles/README.md
date: 2026-03-19
isOriginal: false
author:
  - name: Balajee Asish Brahmandam
    url: https://freecodecamp.org/news/author/Balajeeasish/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9a5ca46f-c571-4d38-90b5-3c6d7d22c00f.png
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
  name="How to Optimize Your Docker Build Cache & Cut Your CI/CD Pipeline Times by 80%"
  desc="Every developer has been there. You push a one-line fix, grab your coffee, and wait. And wait. Twelve minutes later, your Docker image finishes rebuilding from scratch because something about the cach"
  url="https://freecodecamp.org/news/how-to-optimize-your-docker-build-cache"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9a5ca46f-c571-4d38-90b5-3c6d7d22c00f.png"/>

Every developer has been there. You push a one-line fix, grab your coffee, and wait. And wait. Twelve minutes later, your Docker image finishes rebuilding from scratch because something about the cache broke again.

I spent a good chunk of last year debugging slow Docker builds across multiple teams. The pattern was always the same: builds that should take two minutes were eating up fifteen, and nobody knew why. The fix turned out to be surprisingly systematic once I understood what was actually happening under the hood.

This guide walks you through exactly how to fix slow Docker builds, step by step. We'll start with how the cache actually works, then tear apart the most common mistakes, and finish with production-ready patterns you can copy into your projects today.

::: note Prerequisites

To follow along, you'll need:

- A working Docker installation (Docker Desktop or Docker Engine 20.10+)
- Basic comfort with writing Dockerfiles
- Access to a CI/CD system like GitHub Actions, GitLab CI, or Jenkins

:::

---

## How Docker Build Cache Actually Works

Every instruction in a Dockerfile produces a **layer**. Docker stores these layers and reuses them when it detects nothing has changed. That's the cache. Simple enough in theory, but the details matter a lot.

### How Cache Keys Are Computed

Different instructions compute their cache keys differently:

| Instruction | Cache Key Based On | What Breaks It |
| --- | --- | --- |
| `RUN` | The exact command string | Any change to the command text |
| `COPY` / `ADD` | File checksums of the source content | Any modification to the copied files |
| `ENV` / `ARG` | The variable name and value | Changing the value |
| `FROM` | The base image digest | A new version of the base image |

### The Cache Chain Rule

Here's the thing most people miss: **Docker cache is sequential.** If any layer's cache gets invalidated, every layer after it rebuilds from scratch, even if those later layers haven't changed at all.

Picture a row of dominoes. Knock one over in the middle and everything after it goes down too. This is why the order of instructions in your Dockerfile is so important.

::: important Key insight

The single most impactful optimization you can make is reordering your Dockerfile so that the stuff that changes most often comes last.

:::

---

## How to Identify Common Cache-Busting Mistakes

Before we fix anything, let's look at what's probably breaking your cache right now. I've seen these patterns in almost every unoptimized Dockerfile I've reviewed.

### Mistake 1: Copying Everything Too Early

This is the big one. Putting `COPY . .` near the top of the Dockerfile, before installing dependencies, means that *any* file change in your project invalidates the cache from that point forward. Changed a README? Cool, now your dependencies reinstall.

```dockerfile title="Dockerfile"
# BAD: Any file change invalidates the dependency install
FROM node:20-alpine
WORKDIR /app
COPY . .                    # Cache busted on every commit
RUN npm ci                  # Reinstalls every single time
RUN npm run build
```

### Mistake 2: Not Separating Dependency Files

Your dependency manifests (<VPIcon icon="iconfont icon-json"/>`package.json`, <VPIcon icon="fas fa-file-lines"/>`requirements.txt`, <VPIcon icon="fa-brands fa-golang"/>`go.mod`, <VPIcon icon="iconfont icon-ruby"/>`Gemfile`) change way less often than your source code. If you don't copy them separately, you're reinstalling all dependencies every time you touch a source file.

### Mistake 3: Using ADD Instead of COPY

`ADD` has special behaviors like auto-extracting archives and fetching remote URLs. Those features make its cache behavior unpredictable. Stick with `COPY` unless you specifically need archive extraction.

### Mistake 4: Splitting apt-get update and install

When you put `apt-get update` and `apt-get install` in separate `RUN` commands, the update step gets cached with stale package indexes. Then the install step fails or grabs outdated packages.

```dockerfile title="Dockerfile"
# BAD: Stale package index
RUN apt-get update
RUN apt-get install -y curl    # May fail with stale index

# GOOD: Always combine them
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
```

### Mistake 5: Embedding Timestamps or Git Hashes Too Early

Injecting build-time variables like timestamps or git commit hashes via `ARG` or `ENV` early in the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` invalidates the cache on every single build. Move these to the very last layer.

::: warning Watch out for this

CI/CD systems often inject variables like `BUILD_NUMBER` or `GIT_SHA` as build args automatically. If those `ARG` declarations sit near the top, your cache is toast on every run.

:::

---

## How to Structure Your Dockerfile for Maximum Cache Reuse

Now let's fix those mistakes. These five steps, applied in order, will get you most of the way to an optimized build.

### Step 1: Apply the Dependency-First Pattern

Copy only the dependency manifests first, install, and then copy the rest of the source code. This one change alone can cut your build times in half.

```dockerfile title="Dockerfile"
# GOOD: Dependency-first pattern for Node.js
FROM node:20-alpine
WORKDIR /app

# Copy ONLY dependency files
COPY package.json package-lock.json ./

# Install dependencies (cached unless package files change)
RUN npm ci --production

# Copy source code (only this layer rebuilds on code changes)
COPY . .

# Build
RUN npm run build
```

The same idea works across every language:

| Language | Copy First | Install Command |
| --- | --- | --- |
| Node.js | <VPIcon icon="iconfont icon-json"/>`package.json`, <VPIcon icon="iconfont icon-json"/>`package-lock.json` | `npm ci` |
| Python | <VPIcon icon="fas fa-file-lines"/>`requirements.txt` or <VPIcon icon="iconfont icon-toml"/>`pyproject.toml` | `pip install -r requirements.txt` |
| Go | <VPIcon icon="fa-brands fa-golang"/>`go.mod`, <VPIcon icon="fa-brands fa-golang"/>`go.sum` | `go mod download` |
| Rust | <VPIcon icon="iconfont icon-toml"/>`Cargo.toml`, <VPIcon icon="fa-brands fa-rust"/>`Cargo.lock` | `cargo fetch` |
| Java (Maven) | <VPIcon icon="iconfont icon-code"/>`pom.xml` | `mvn dependency:go-offline` |
| Ruby | <VPIcon icon="iconfont icon-ruby"/>`Gemfile`, `Gemfile.lock` | `bundle install` |

### Step 2: Add an Aggressive .dockerignore

A <VPIcon icon="fa-brands fa-docker"/>`.dockerignore` file keeps irrelevant files out of the build context. Fewer files in the context means fewer things that can break your cache.

```plaintext title=".dockerignore"
.git
node_modules
dist
*.md
*.log
.env*
docker-compose*.yml
Dockerfile*
.github
tests
coverage
__pycache__
```

### Step 3: Use Multi-Stage Builds

Multi-stage builds let you use a full development image for compiling, then copy only the finished artifacts into a slim runtime image. You get smaller images, better security, and improved cache performance because build tools and intermediate files don't carry over.

```dockerfile title="Dockerfile"
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Step 4: Order Layers by Change Frequency

Think of your Dockerfile as a stack. Put the boring, stable stuff at the top and the volatile stuff at the bottom:

1. Base image and system dependencies (rarely change)
2. Language runtime configuration (occasionally change)
3. Application dependencies (change when you add or remove packages)
4. Source code (changes on every commit)
5. Build-time metadata like git hash or version labels (changes every build)

### Step 5: Use BuildKit Mount Caches

Docker BuildKit supports `RUN --mount=type=cache`, which mounts a persistent cache directory that survives across builds. This is a game-changer for package managers that maintain their own download caches.

```dockerfile title="Dockerfile"
# syntax=docker/dockerfile:1

FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .

# Mount pip cache so downloads persist across builds
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt

COPY . .
```

The best part: mount caches persist even when the layer itself gets invalidated. So if you add one new package, pip only downloads that one package instead of re-fetching everything.

Here are the common cache targets for popular package managers:

| Package Manager | Cache Target |
| --- | --- |
| `pip` | <VPIcon icon="fas fa-folder-open"/>`/root/.cache/pip` |
| `npm` | <VPIcon icon="fas fa-folder-open"/>`/root/.npm` |
| `yarn` | <VPIcon icon="fas fa-folder-open"/>`/usr/local/share/.cache/yarn` |
| `go` | <VPIcon icon="fas fa-folder-open"/>`/go/pkg/mod` |
| `apt` | <VPIcon icon="fas fa-folder-open"/>`/var/cache/apt` |
| `maven` | <VPIcon icon="fas fa-folder-open"/>`/root/.m2/repository` |

---

## How to Set Up CI/CD Cache Backends

Here's where things get tricky. Your local Docker cache works great on your laptop because the layers persist between builds. But CI/CD runners are usually ephemeral: each job starts with a totally empty cache. Without explicit cache configuration, every CI build is a cold build.

### Option A: Registry-Based Cache

BuildKit can push and pull cache layers from a container registry. This is the most portable approach and works with any CI system.

```sh
docker buildx build \
--cache-from type=registry,ref=myregistry.io/myapp:buildcache \
--cache-to type=registry,ref=myregistry.io/myapp:buildcache,mode=max \
--tag myregistry.io/myapp:latest \
--push .
```

::: note

**Use** `mode=max` to cache all layers including intermediate build stages. The default `mode=min` only caches layers in the final stage, which means your build stage layers get thrown away.

:::

### Option B: GitHub Actions Cache

If you're on GitHub Actions, there's native integration with BuildKit through the GitHub Actions cache API. It's fast and requires minimal setup.

```yaml title='.github/workflows/build.yml"
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3

- name: Build and push
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: myregistry.io/myapp:latest
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

### Option C: S3 or Cloud Storage

For teams on AWS, GCP, or Azure, cloud object storage makes a solid cache backend. It's fast, persistent, and works across any CI system.

```sh
docker buildx build \
--cache-from type=s3,region=us-east-1,bucket=my-docker-cache,name=myapp \
--cache-to type=s3,region=us-east-1,bucket=my-docker-cache,name=myapp,mode=max \
--tag myapp:latest .
```

### Option D: Local Cache with Persistent Runners

If your CI runners have persistent storage (self-hosted runners, GitLab runners with shared volumes), you can export cache to a local directory.

```sh
docker buildx build \
--cache-from type=local,src=/ci-cache/myapp \
--cache-to type=local,dest=/ci-cache/myapp,mode=max \
--tag myapp:latest .
```

---

## How to Implement Advanced Cache Patterns

Once you've nailed the basics, these patterns can squeeze out even more performance.

### Parallel Build Stages

BuildKit builds independent stages in parallel. If your app has a frontend and a backend that don't depend on each other during build, split them into separate stages and let BuildKit run them simultaneously.

```dockerfile title="Dockerfile"
# These stages build in parallel
FROM node:20-alpine AS frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM python:3.12-slim AS backend
WORKDIR /backend
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .

# Final stage combines both
FROM python:3.12-slim
COPY --from=backend /backend /app
COPY --from=frontend /frontend/dist /app/static
CMD ["python", "/app/main.py"]
```

### Cache Warming for Feature Branches

Feature branches often start with a cold cache because they diverge from main. You can warm the cache by specifying multiple `--cache-from` sources. Docker checks them in order.

```sh
docker buildx build \
--cache-from type=registry,ref=registry.io/app:cache-${BRANCH} \
--cache-from type=registry,ref=registry.io/app:cache-main \
--cache-to type=registry,ref=registry.io/app:cache-${BRANCH},mode=max \
--tag registry.io/app:${BRANCH} .
```

If the branch cache hits, Docker uses it. If not, it falls back to main's cache, which usually shares most layers. This makes a massive difference for short-lived branches.

### Selective Cache Invalidation with Build Args

You can use `ARG` instructions as cache boundaries. Anything above the `ARG` stays cached, while anything below it rebuilds when the arg value changes.

```dockerfile title="Dockerfile"
FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# This ARG only invalidates layers below it
ARG CACHE_BUST_CODE=1
COPY . .
RUN npm run build

# This ARG only invalidates the label
ARG GIT_SHA=unknown
LABEL git.sha=$GIT_SHA
```

---

## How to Measure Your Improvements

Optimization without measurement is just guessing. Here's how to actually prove your changes are working.

### The Four Scenarios to Benchmark

Run each scenario at least three times and take the median:

1. **Cold build:** No cache at all (first build or after `docker builder prune`)
2. **Warm build:** No changes, full cache hit
3. **Code change:** Only source code modified
4. **Dependency change:** Package manifest modified

### Real-World Before and After Numbers

Here's what I saw on a mid-sized Node.js project after applying the techniques from this guide:

| Scenario | Before | After | Improvement |
| --- | --- | --- | --- |
| Cold build | 12 min 34 sec | 8 min 10 sec | 35% |
| Warm build (no changes) | 12 min 34 sec | 14 sec | 98% |
| Code change only | 12 min 34 sec | 1 min 52 sec | 85% |
| Dependency change | 12 min 34 sec | 4 min 20 sec | 65% |

The "before" column is the same for all rows because without cache optimization, every build was essentially a cold build. That 85% improvement on code-only changes is the number that matters most, since that's what happens on the vast majority of commits.

### How to Check Cache Hit Rates

Set `BUILDKIT_PROGRESS=plain` to get detailed output showing which layers hit cache:

```sh
BUILDKIT_PROGRESS=plain docker buildx build . 2>&1 | grep -E 'CACHED|DONE'
```

Look for the `CACHED` prefix on layers. Your goal is to see `CACHED` on everything except the layers that actually needed to change.

---

## Complete Optimized Dockerfile Examples

Here are production-ready Dockerfiles you can adapt for your own projects.

### Node.js Full-Stack App

```dockerfile title="Dockerfile"
# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 appgroup \
    && adduser --system --uid 1001 appuser
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
USER appuser
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Python FastAPI App

```dockerfile title="Dockerfile"
# syntax=docker/dockerfile:1
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --user -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Go Microservice

```dockerfile title="Dockerfile"
# syntax=docker/dockerfile:1
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download
COPY . .
RUN --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 go build -ldflags='-s -w' -o /app/server ./cmd/server

FROM gcr.io/distroless/static-debian12
COPY --from=builder /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]
```

---

## Troubleshooting Guide

When things go wrong, check this table first:

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| All layers rebuild every time | `COPY . .` is too early, or <VPIcon icon="fa-brands fa-docker"/>`.dockerignore` is missing | Move `COPY . .` after dependency install; add <VPIcon icon="fa-brands fa-docker"/>`.dockerignore` |
| Cache never hits in CI | No cache backend configured | Add `--cache-from` / `--cache-to` with registry, gha, or s3 backend |
| Cache hits locally but not in CI | Different Docker versions or BuildKit not enabled | Set `DOCKER_BUILDKIT=1` and match Docker versions |
| Dependency layer always rebuilds | Source files copied before dependency install | Use the dependency-first pattern |
| Image size keeps growing | Build artifacts leaking into final image | Use multi-stage builds; only copy runtime artifacts |
| Registry cache is very slow | `mode=max` caching too many layers | Try `mode=min` or switch to gha/s3 for faster backends |

::: tip Quick-Reference Checklist

Print this out and tape it next to your monitor:

- [ ] Enable BuildKit: set `DOCKER_BUILDKIT=1` or use `docker buildx`
- [ ] Add a comprehensive <VPIcon icon="fa-brands fa-docker"/>`.dockerignore` file
- [ ] Use the dependency-first pattern: copy manifests, install, then copy source
- [ ] Order layers from least-changed to most-changed
- [ ] Combine `RUN` commands that belong together (`apt-get update && install`)
- [ ] Use multi-stage builds to separate build and runtime
- [ ] Add `RUN --mount=type=cache` for package manager caches
- [ ] Move volatile `ARG`s (git hash, build number) to the very last layers
- [ ] Configure a CI/CD cache backend (registry, gha, or s3)
- [ ] Set up cache warming for feature branches from the main branch
- [ ] Use `COPY` instead of `ADD` unless you need archive extraction
- [ ] Benchmark all four scenarios: cold, warm, code change, dependency change

:::

---

## Conclusion

I used to think slow Docker builds were just something you had to live with. After going through this process on a few projects, I realized the fix is pretty mechanical once you understand that one core principle: cache is sequential, and order matters.

Start with the dependency-first pattern and a <VPIcon icon="fa-brands fa-docker"/>`.dockerignore`. Those two changes alone will probably cut your build times in half. Then add multi-stage builds, mount caches, and CI/CD cache backends as you need them.

The teams I've worked with typically see 70-85% reductions in CI/CD pipeline times after spending a few hours on these changes. That's time you get back on every single commit, every single day.

If you found this helpful, consider sharing it with your team. There's a good chance whoever wrote your Dockerfile last didn't know about half of these tricks. No shade to them, I didn't either until I went looking.

Happy building.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Optimize Your Docker Build Cache & Cut Your CI/CD Pipeline Times by 80%",
  "desc": "Every developer has been there. You push a one-line fix, grab your coffee, and wait. And wait. Twelve minutes later, your Docker image finishes rebuilding from scratch because something about the cach",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-optimize-your-docker-build-cache.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
