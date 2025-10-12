---
lang: en-US
title: "Docker Build Tutorial: Learn Contexts, Architecture, and Performance Optimization Techniques"
description: "Article(s) > Docker Build Tutorial: Learn Contexts, Architecture, and Performance Optimization Techniques"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker Build Tutorial: Learn Contexts, Architecture, and Performance Optimization Techniques"
    - property: og:description
      content: "Docker Build Tutorial: Learn Contexts, Architecture, and Performance Optimization Techniques"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/docker-build-tutorial-learn-contexts-architecture-and-performance-optimization-techniques.html
prev: /devops/docker/articles/README.md
date: 2025-10-08
isOriginal: false
author:
  - name: Destiny Erhabor
    url : https://freecodecamp.org/news/author/CaesarSage/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759861193876/871b72e7-9673-4572-b788-48f082a6b380.png
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
  name="Docker Build Tutorial: Learn Contexts, Architecture, and Performance Optimization Techniques"
  desc="Docker build is a fundamental concept every developer needs to understand. Whether you're containerizing your first application or optimizing existing Docker workflows, understanding Docker build contexts and Docker build architecture is essential fo..."
  url="https://freecodecamp.org/news/docker-build-tutorial-learn-contexts-architecture-and-performance-optimization-techniques"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759861193876/871b72e7-9673-4572-b788-48f082a6b380.png"/>

Docker build is a fundamental concept every developer needs to understand. Whether you're containerizing your first application or optimizing existing Docker workflows, understanding Docker build contexts and Docker build architecture is essential for creating efficient, scalable containerized applications.

This comprehensive guide covers everything from basic concepts to advanced optimization techniques, helping you avoid common pitfalls and build better Docker images.

---

## What is Docker Build?

Docker build is the process of creating a Docker image from a Dockerfile and a set of files called the **build context**. When you run `docker build`, you're instructing Docker to:

1. Read your Dockerfile instructions
2. Gather the necessary files (build context)
3. Execute each instruction step-by-step
4. Create a final Docker image

Think of it like following a recipe: the Dockerfile is your recipe, and the build context contains all the ingredients you might need.

---

## Docker Build Architecture: How It All Works

Docker Build uses a client-server architecture where two separate components (**Buildx and BuildKit**) work together to build your Docker images. This is different from how many people think Docker works, as it's not just one monolithic program doing everything.

### What is Buildx (The Client)?

Buildx serves as the user interface that you interact with directly whenever you work with Docker builds. When you type `docker build .` in your terminal, you're actually communicating with Buildx, which acts as the intermediary between you and the actual build engine.

#### Buildx’s primary jobs:

- Interprets your build command and options
- Sends structured build requests to BuildKit
- Manages multiple BuildKit instances (builders)
- Handles authentication and secrets
- Displays build progress to you

### What is BuildKit (The Server/Builder)

BuildKit functions as the actual build engine that performs all the heavy lifting during the Docker build process. This powerful backend component receives the structured build requests from Buildx and immediately begins reading and interpreting your Dockerfiles line by line.

#### BuildKit’s primary jobs:

- Receives build requests from Buildx
- Reads and interprets Dockerfiles
- Executes build instructions step by step
- Manages build cache and layers
- Requests only the files it needs from the client
- Creates the final Docker image

### How They Communicate

Here's what happens when you run `docker build .`:

![Diagram showing Docker build process with BuildKit, including sending build request with Dockerfile and build arguments, requesting and receiving package.json, running npm install, requesting and receiving src directory files, copying files, completing build, and optionally pushing to registry.](https://cdn.hashnode.com/res/hashnode/image/upload/v1758733757378/d3322dad-efac-4c4a-b8f8-69f17a4920e8.png)

When you run `docker build`, the command initiates a multi-step process with BuildKit (as illustrated in the above image).

First, it sends a build request containing your Dockerfile, build arguments, export options, and cache options. BuildKit then intelligently requests only the files it needs when it needs them, starting with <FontIcon icon="iconfont icon-json"/>`package.json` to run `npm install` for dependency installation.

After that's complete, it requests the <FontIcon icon="fas fa-folder-open"/>`src/` directory containing your application code and copies those files into the image with the `COPY` command.

Once all build steps are finished, BuildKit sends back the completed image. Optionally, you can then push this image to a container registry for distribution or deployment.

This on-demand file transfer approach is one of BuildKit's key optimizations: rather than sending your entire build context upfront, it only requests specific files as each build step needs them, making the build process more efficient.

### Key Communication Details

Build request contains:

```json
{
  "dockerfile": "FROM node:18\nWORKDIR /app\n...",
  "buildArgs": {"NODE_ENV": "production"},
  "exportOptions": {"type": "image", "name": "my-app:latest"},
  "cacheOptions": {"type": "registry", "ref": "my-app:cache"}
}
```

Resource requests:

- BuildKit asks: "I need the file at `./package.json`"
- Buildx responds: Sends the actual file content
- BuildKit asks: "I need the directory `./src/`"
- Buildx responds: Sends all files in that directory

### Why This Architecture Exists

#### 1. Efficiency

The old Docker builder had a major flaw: it always copied your entire build context upfront, regardless of what was actually needed. Even if your Dockerfile only used a few files, Docker would transfer hundreds of megabytes before starting the build.

BuildKit fixes this through on-demand file transfers. It only requests specific files at each step.

::: code-tabs#sh

@tab:active Old Docker Builder (legacy) 

```sh
# Always copied ENTIRE context upfront
docker build .
#
# Sending build context to Docker daemon  245.7MB  # Everything!
```

@tab New BuildKit Architecture

```sh
# Only requests files when needed
docker build .
#
#1 [internal] load build definition from Dockerfile    0.1s
#2 [internal] load .dockerignore                       0.1s
#3 [1/4] FROM node:18                                  0.5s
#4 [internal] load build context                       0.1s
#4 transferring context: 234B  # Only package.json initially!
#5 [2/4] WORKDIR /app                                  0.2s  
#6 [3/4] COPY package*.json ./                         0.1s
#7 [4/4] RUN npm install                               5.2s
#8 [internal] load build context                       0.3s  
#8 transferring context: 2.1MB  # Now requests src/ files
#9 [5/4] COPY src/ ./src/                              0.2s
```

:::

#### 2. Scalability

The client-server architecture enables scalability features. Multiple Docker CLI clients can connect to the same BuildKit instance, and BuildKit can run on remote servers instead of your local machine. This means you could execute builds on a cloud server while controlling them from your laptop. Teams can also deploy multiple BuildKit instances for different teams or purposes, scaling from individual developers to large enterprises.

#### 3. Security

Security is improved by only requesting sensitive files when explicitly needed. BuildKit never sees files your Dockerfile doesn't reference, reducing the attack surface. It also handles credentials through separate, secure channels rather than mixing them with your build context, preventing secrets from being embedded in image layers or exposed in build logs.

### Real-World Example

Let's trace through a typical build step by step. You can find the full code available here:

<SiteInfo
  name="Learn-DevOps-by-building/beginner/docker/docker-build-architecture-examples/02-python-cache at main · Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/tree/main/beginner/docker/docker-build-architecture-examples/02-python-cache/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

```dockerfile title="Dockerfile"
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY src/ ./src/
COPY main.py .
CMD ["python", "main.py"]
```

Let’s see what actually happens here:

1. You run `docker build .`
2. Buildx says to BuildKit:

```plaintext title="output"
"Here's a build request with this Dockerfile"
```

3. **BuildKit processes**: `FROM python:3.9-slim`
    - No client files needed, pulls base image
4. **BuildKit processes**: `COPY requirements.txt .`
    - BuildKit to Buildx: "I need `requirements.txt`"
    - Buildx to BuildKit: Sends the file content
5. **BuildKit processes**: `RUN pip install -r requirements.txt`
    - No client files needed, runs inside container
6. **BuildKit processes**: `COPY src/ ./src/`
    - BuildKit to Buildx: "I need all files in `src/` directory"
    - Buildx to BuildKit: Sends all files in src/
7. **BuildKit processes**: `COPY main.py .`
    - BuildKit to Buildx: "I need `main.py`"
    - Buildx to BuildKit: Sends the file
8. BuildKit to Buildx: "Build complete, here's your image"

From the illustration, you can see that BuildKit only requests what it needs, when it needs it. Not this entire context:

```plaintext title="file structure"
my-app/
├── src/                 # ← Only loaded when COPY src/ runs
├── tests/              # ← Never requested (not in Dockerfile)
├── docs/               # ← Never requested  
├── node_modules/       # ← Never requested (in .dockerignore)
├── requirements.txt    # ← Loaded early (first COPY)
└── main.py            # ← Loaded later (second COPY)
```

---

## Docker Build Features

### Named Contexts

::: info 👉 Demo project

<SiteInfo
  name="Learn-DevOps-by-building/beginner/docker/docker-build-architecture-examples/07-named-contexts at main · Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/tree/main/beginner/docker/docker-build-architecture-examples/07-named-contexts/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

:::

Named contexts allow you to include files from multiple sources during a build while keeping them logically separated. This is useful when you need documentation, configuration files, or shared libraries from different directories or repositories in your build.

```sh
# Build with additional named context
docker build --build-context docs=./documentation .
```

```dockerfile title="Dockerfile"
# Use named context in Dockerfile
FROM alpine
COPY . /app
# Mount files from named context
RUN --mount=from=docs,target=/docs \
    cp /docs/manual.pdf /app/
```

### Build Secrets

::: info 👉 Demo project:

<SiteInfo
  name="Learn-DevOps-by-building/beginner/docker/docker-build-architecture-examples/06-build-secrets at main · Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/tree/main/beginner/docker/docker-build-architecture-examples/06-build-secrets/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>


:::

Build secrets let you pass sensitive information (like API keys or passwords) to your build without including them in the final image or build history. The secrets are mounted temporarily during specific `RUN` commands and are never stored in image layers.

```sh
# Pass secret to build
echo "api_key=secret123" | docker build --secret id=apikey,src=- .
```

```dockerfile title="Dockerfile"
# Use secret in Dockerfile
FROM alpine
RUN --mount=type=secret,id=apikey \
    export API_KEY=$(cat /run/secrets/apikey) && \
    curl -H "Authorization: $API_KEY" https://api.example.com/data
```

---

## Docker Build Context

### What is a Build Context?

The build context is the collection of files and directories that Docker can access during the build process. It's like gathering all your cooking ingredients on the counter before you start cooking.

```sh
docker build [OPTIONS] CONTEXT
                       ^^^^^^^
                       This is your build context
```

### Why Build Contexts Matter

1. **Security**: Only files in the context can be accessed during build
2. **Performance**: Large contexts slow down builds
3. **Functionality**: Your Dockerfile can only COPY/ADD files from the context
4. **Efficiency**: Understanding contexts helps you build faster, leaner images

---

## Types of Docker Build Contexts

### 1. Local Directory Context (Most Common)

::: info 👉 See code here

<SiteInfo
  name="Learn-DevOps-by-building/beginner/docker/docker-build-architecture-examples/01-node-local-context at main · Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/tree/main/beginner/docker/docker-build-architecture-examples/01-node-local-context/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

:::

This is what you'll use in 90% of cases – pointing to a folder on your machine:

```sh
# Use current directory
docker build .

# Use specific directory
docker build /path/to/my/project

# Use parent directory
docker build ..
```

**Example Project Structure:**

```sh
my-webapp/
├── src/
│   ├── index.js
│   └── utils.js
├── public/
│   ├── index.html
│   └── styles.css
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
└── README.md
```

**Corresponding Dockerfile:**

```dockerfile title="Dockerfile"
FROM node:18-alpine
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY src/ ./src/
COPY public/ ./public/

EXPOSE 3000
CMD ["node", "src/index.js"]
```

### 2. Remote Git Repository Context

You can build directly from Git repositories without cloning locally:

```sh
# Build from GitHub main branch
docker build https://github.com/<username>/project.git

# Build from specific branch
docker build https://github.com/<username>/project.git#develop

# Build from specific directory in repo
docker build https://github.com/<username>/project.git#main:docker

# Build with authentication
docker build --ssh default git@github.com:<username>/private-repo.git
```

This has various cases like CI/CD pipelines, building open-source projects, ensuring clean builds from source control, automated deployments, and so on.

### 3. Remote Tarball Context

You can also build from compressed archives hosted on web servers. A remote **tarball** is a `.tar.gz` or similar compressed archive file accessible via HTTP/HTTPS. This is useful when your source code is packaged and hosted on a web server, artifact repository, or CDN. Docker downloads and extracts the archive automatically, using its contents as the build context.

This approach works well for CI/CD pipelines where build artifacts are stored centrally, or when you want to build images from released versions of your code without cloning entire repositories.

```sh
# Build from remote tarball
docker build http://server.com/context.tar.gz

# BuildKit downloads and extracts automatically
docker build https://example.com/project-v1.2.3.tar.gz
```

### 4. Empty Context (Advanced)

When you don't need any files, you can pipe the Dockerfile directly:

```sh
# Create image without file context
docker build -t hello-world - <<EOF
FROM alpine:latest
RUN echo "Hello, World!" > /hello.txt
CMD cat /hello.txt
EOF
```

---

## Common Docker Build Mistakes (And How to Fix Them)

### Mistake 1: Wrong Context Directory

::: info Reproduced here:

<SiteInfo
  name="Learn-DevOps-by-building/beginner/docker/docker-build-architecture-examples/04-wrong-context at main · Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/tree/main/beginner/docker/docker-build-architecture-examples/04-wrong-context/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

:::

This mistake occurs when you run `docker build` from the wrong directory, causing the build context to be different from what your Dockerfile expects.

In the example, running `docker build frontend/` from the <FontIcon icon="fas fa-folder-open"/>`/projects/` directory means the context is <FontIcon icon="fas fa-folder-open"/>`/projects/frontend/`, but the Dockerfile tries to access `../shared/utils.js`, which is outside this context. Docker can only access files within the build context, so any attempt to reference files outside it will fail.

```plaintext title="file structure"
# Project structure
/projects/
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   └── package.json
└── shared/
    └── utils.js

# WRONG - Running from projects directory
docker build frontend/
# This won't work if Dockerfile tries to COPY ../shared/utils.js
```

#### How to fix wrong context directory:

The key is aligning your build context with what your Dockerfile needs.

- **Option 1** changes your working directory so the context matches your Dockerfile's expectations. You run the build from inside <FontIcon icon="fas fa-folder-open"/>`frontend/`, making that directory the context root.
- **Option 2** keeps you in the parent directory but explicitly sets it as the context (the `.` argument) while telling Docker where to find the Dockerfile with the `-f` flag. Now both <FontIcon icon="fas fa-folder-open"/>`frontend/` and <FontIcon icon="fas fa-folder-open"/>`shared/` are accessible since they're both within the `<FontIcon icon="fas fa-folder-open"/>/projects/` context.

```sh
# Option 1: Run from correct directory
cd frontend
docker build .

# Option 2: Use parent directory as context
docker build -f frontend/Dockerfile .
```

### Mistake 2: Including Massive Files

::: info 👉 Optimized version with <FontIcon icon="fa-brands fa-docker"/>`.dockerignore`

<SiteInfo
  name="Learn-DevOps-by-building/beginner/docker/docker-build-architecture-examples/05-dockerignore-optimization at main · Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/tree/main/beginner/docker/docker-build-architecture-examples/05-dockerignore-optimization/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

:::

This mistake happens when your build context contains large, unnecessary files that slow down the build process.

Docker must transfer the entire context to the build daemon before starting, so including files like <FontIcon icon="fas fa-folder-open"/>`node_modules` (which can be hundreds of MB), git history, build artifacts, logs, and database dumps makes builds painfully slow. These files are rarely needed in the final image and should be excluded.

```plaintext title="file structure"
# This context includes everything!
my-app/
├── node_modules/        # 200MB+ 
├── .git/               # Version history
├── dist/               # Built files
├── logs/               # Log files
├── temp/               # Temporary files
├── database.dump       # 1GB database backup
└── Dockerfile
```

#### How to fix Docker build massive files:

Use <FontIcon icon="fa-brands fa-docker"/>`.dockerignore` to exclude unnecessary files, dramatically reducing context size and build time. We’ll discuss this in more detail below.

### Mistake 3: Inefficient Layer Caching

::: info 👉 See good practice code here

<SiteInfo
  name="Learn-DevOps-by-building/beginner/docker/docker-build-architecture-examples/02-python-cache at main · Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/tree/main/beginner/docker/docker-build-architecture-examples/02-python-cache/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

:::

This mistake wastes Docker's layer caching system by copying frequently-changing files (like source code) before running expensive operations (like `npm install`). When you modify your source code, Docker invalidates the cache for that layer and all subsequent layers, forcing `npm install` to run again even though dependencies haven't changed. This can turn a 5-second build into a 5-minute build.

```dockerfile
# BAD - Changes to source code rebuild npm install
FROM node:18
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "start"]
```

#### How to fix docker build inefficient layer caching:

Copy dependency files first, install dependencies, then copy source code. This way, `npm install` only runs when <FontIcon icon="iconfont icon-json"/>`package.json` actually changes:

```dockerfile
# GOOD - npm install only rebuilds when package.json changes
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

---

## How to Optimize and Monitor Build Performance

Understanding build performance metrics helps you identify bottlenecks and measure improvements.

### How to Optimize Docker Builds with .dockerignore

The <FontIcon icon="fa-brands fa-docker"/>`.dockerignore` file is your secret weapon for faster, more secure builds. It tells Docker which files to exclude from the build context.

#### Creating <FontIcon icon="fa-brands fa-docker"/>`.dockerignore` Patterns

Create a <FontIcon icon="fa-brands fa-docker"/>`.dockerignore` file in your project root. The syntax is similar to <FontIcon icon="iconfont icon-git"/>`.gitignore`, and you can use wildcards (`*`), match specific file extensions (`*.log`), exclude entire directories (<FontIcon icon="fas fa-folder-open"/>`node_modules/`), or use negation patterns (`!important.txt`) to include files that would otherwise be excluded. Each line represents a pattern, and comments start with `#`.

::: tip Example of a <FontIcon icon="fa-brands fa-docker"/><code>.dockerignore</code> file:

```sh :collapsed-lines title=".dockerignore"
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
*.tgz

# Version control
.git/
.gitignore
.svn/

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs and databases
*.log
*.sqlite
*.db

# Environment and secrets
.env
.env.local
.env.*.local
secrets/
*.key
*.pem

# Documentation
README.md
docs/
*.md

# Test files
test/
tests/
*.test.js
coverage/

# Temporary files
tmp/
temp/
*.tmp
```

### Measuring Build Performance

#### Analyzing Build Time

Understanding where your build spends time helps identify bottlenecks and optimization opportunities. The detailed progress output shows timing for each build step, cache hits/misses, and resource usage.

```sh
# Enable BuildKit progress output
DOCKER_BUILDKIT=1 docker build --progress=plain .

# Use buildx for detailed timing
docker buildx build --progress=plain .
```

#### Profiling Context Transfer

Monitor context transfer time to understand how build context size affects overall performance. Profile which directories contribute most to help target <FontIcon icon="fa-brands fa-docker"/>`.dockerignore` optimizations.

```sh
# Measure context transfer time
time docker build --no-cache .

# Profile context size by directory
du -sh */ | sort -hr
```

#### Measuring .dockerignore Impact

Before <FontIcon icon="fa-brands fa-docker"/>`.dockerignore`, you'll notice that the `transfering context` size is 245.7MB in 15.2s:

```sh
docker build .
#
#1 [internal] load build context
#1 transferring context: 245.7MB in 15.2s
```

After adding the .dockerignore file, the context reduced to 2.1MB in 0.3s:

```sh
docker build .
#
#1 [internal] load build context  
#1 transferring context: 2.1MB in 0.3s
```

**Result**: 99% reduction in context size and 50x faster context transfer!

---

## Best Practices for Docker Build Performance

We've covered several optimization techniques throughout this guide. Here's a quick recap of the key practices, plus some additional strategies:

1. **Layer Caching** (covered in Mistake 3): Copy dependency files before source code to maximize cache reuse.
2. **Using .dockerignore** (covered in Mistake 2): Exclude unnecessary files to reduce context size and improve build speed.
3. **Choosing the Right Context** (covered earlier): Select appropriate context types (local, Git, tarball) based on your use case.

Now let’s talk about some more ways you can improve performance:

### Use Multi-Stage Builds

::: info 👉 Demo project

<SiteInfo
  name="Learn-DevOps-by-building/beginner/docker/docker-build-architecture-examples/03-multistage-node at main · Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/tree/main/beginner/docker/docker-build-architecture-examples/03-multistage-node/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

:::

Multi-stage builds let you use one image for building/compiling your application and a different, smaller image for running it. This dramatically reduces your final image size by excluding build tools, source code, and other unnecessary files from the production image.

```dockerfile title="Dockerfile"
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Use Specific Base Images

Generic base images like `ubuntu:latest` include many packages you don't need, making your images larger and slower to download. Specific images like `node:18-alpine` or distroless images contain only what's necessary for your application to run.

```dockerfile title="Dockerfile"
# Large base image
FROM ubuntu:latest

# Smaller, more specific base image  
FROM node:18-alpine

# Even smaller distroless image
FROM gcr.io/distroless/nodejs18-debian11
```

### Combine RUN Commands

Each `RUN` command creates a new layer in your image. Multiple `RUN` commands create multiple layers, increasing image size. Combining commands into a single `RUN` instruction creates just one layer, and you can clean up temporary files in the same step.

```dockerfile title="Dockerfile"
# Creates multiple layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# Single layer
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

---

## Troubleshooting Docker Build Issues

### Issue: "COPY failed: no such file or directory"

**Problem**: File not in build context

**What’s going wrong**: Docker can only access files within the build context (the directory you specify in `docker build`). If your Dockerfile tries to `COPY` a file that doesn't exist in the context directory, the build fails. This often happens when running the build command from the wrong directory or when the file path is incorrect relative to the context root.

**Solution**:

```sh
# Check what's in your context
ls -la

# Verify file path relative to context
docker build -t debug . --progress=plain
```

### Issue: "Docker Build is extremely slow"

**Problem**: Large build context

**What’s going wrong**: Docker must transfer your entire build context to the BuildKit daemon before building starts. If your context contains large files, directories like `node_modules`, or unnecessary files, this transfer can take minutes instead of seconds. The larger the context, the slower your builds become.

**Solution**:

```sh
# Check context size
du -sh .

# Add more patterns to .dockerignore
echo "large-directory/" >> .dockerignore
echo "*.zip" >> .dockerignore
```

### Issue: "Cannot locate specified Dockerfile"

**Problem**: Dockerfile not in context root

**What’s going wrong**: By default, Docker looks for a file named `Dockerfile` in the root of your build context. If your Dockerfile is in a subdirectory or has a different name, Docker can't find it. This is common in monorepo setups where Dockerfiles are organized in separate folders.

**Solution**:

```sh
# Specify Dockerfile location
docker build -f path/to/Dockerfile .

# Or move Dockerfile to context root
mv path/to/Dockerfile .
```

### Issue: "Cache misses on unchanged files"

**Problem**: File timestamps or permissions changed

**What’s going wrong**: Docker's layer caching relies on file checksums and metadata. Even if file content is unchanged, different timestamps or permissions can cause cache misses, forcing unnecessary rebuilds. This often happens after git operations, file system operations, or when files are copied between systems.

**Solution**:

```sh
# Check file modifications
git status

# Reset timestamps
git ls-files -z | xargs -0 touch -r .git/HEAD
```

---

## Conclusion

Understanding Docker build contexts and architecture is essential for achieving faster builds. We’ve covered various techniques in this article, like optimized contexts and caching strategies, creating smaller images with efficient layering and multi-stage builds, maintaining better security with proper secret handling and minimal attack surface, and delivering an improved developer experience with faster iteration cycles.

::: info

👉 **Full code examples are available on GitHub here:**

<SiteInfo
  name="Learn-DevOps-by-building/beginner/docker/docker-build-architecture-examples at main · Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/tree/main/beginner/docker/docker-build-architecture-examples/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

As always, I hope you enjoyed the article and learned something new. If you want, you can also follow me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`destiny-erhabor`)](https://linkedin.com/in/destiny-erhabor) or [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`caesar_sage`)](https://x.com/caesar_sage).

For more hands-on projects, follow and star this repository:

<SiteInfo
  name="Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2559931b2066898d8bc349391401f04fcfa16c9fc625d7dd198a5e01801d84a6/Caesarsage/Learn-DevOps-by-building"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker Build Tutorial: Learn Contexts, Architecture, and Performance Optimization Techniques",
  "desc": "Docker build is a fundamental concept every developer needs to understand. Whether you're containerizing your first application or optimizing existing Docker workflows, understanding Docker build contexts and Docker build architecture is essential fo...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/docker-build-tutorial-learn-contexts-architecture-and-performance-optimization-techniques.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
