---
lang: en-US
title: "How to Build and Deploy Multi-Architecture Docker Apps on Google Cloud Using ARM Nodes (Without QEMU)"
description: "Article(s) > How to Build and Deploy Multi-Architecture Docker Apps on Google Cloud Using ARM Nodes (Without QEMU)"
icon: fa-brands fa-docker
category:
  - Go
  - DevOps
  - Docker
  - Kubernetes
  - Google
  - Google Cloud
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
  - devops
  - docker
  - k8s
  - kubernetes
  - google
  - googlecloud
  - google-cloud
  - gcp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build and Deploy Multi-Architecture Docker Apps on Google Cloud Using ARM Nodes (Without QEMU)"
    - property: og:description
      content: "How to Build and Deploy Multi-Architecture Docker Apps on Google Cloud Using ARM Nodes (Without QEMU)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-multi-architecture-docker-apps-on-google-cloud-using-arm-nodes.html
prev: /devops/docker/articles/README.md
date: 2026-04-13
isOriginal: false
author:
  - name: Amina Lawal
    url: https://freecodecamp.org/news/author/Bronze/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e89ae65a-4b3a-44b7-94d8-d0638f017bf6.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
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
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build and Deploy Multi-Architecture Docker Apps on Google Cloud Using ARM Nodes (Without QEMU)"
  desc="If you've bought a laptop in the last few years, there's a good chance it's running an ARM processor. Apple's M-series chips put ARM on the map for developers, but the real revolution is happening ins"
  url="https://freecodecamp.org/news/build-and-deploy-multi-architecture-docker-apps-on-google-cloud-using-arm-nodes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e89ae65a-4b3a-44b7-94d8-d0638f017bf6.png"/>

If you've bought a laptop in the last few years, there's a good chance it's running an ARM processor. Apple's M-series chips put ARM on the map for developers, but the real revolution is happening inside cloud data centers.

Google Cloud Axion is Google's own custom ARM-based chip, built to handle the demands of modern cloud workloads. The performance and cost numbers are striking: Google claims Axion delivers up to 60% better energy efficiency and up to 65% better price-performance compared to comparable x86 machines.

AWS has Graviton. Azure has Cobalt. ARM is no longer niche. It's the direction the entire cloud industry is moving.

But there's a problem that catches almost every team off guard when they start this transition: **container architecture mismatch**.

If you build a Docker image on your M-series Mac and push it to an x86 server, it crashes on startup with a cryptic `exec format error`.

The server isn't broken. It just can't read the compiled instructions inside your image. An ARM binary and an x86 binary are written in fundamentally different languages at the machine level. The CPU literally can't execute instructions it wasn't designed for.

We're going to solve this problem completely in this tutorial. You'll build a single Docker image tag that automatically serves the correct binary on both ARM and x86 machines — no separate pipelines, no separate tags. Then you'll provision Google Cloud ARM nodes in GKE and configure your Kubernetes deployment to route workloads precisely to those cost-efficient nodes.

::: info Here's what you'll build, step by step

- A Go HTTP server that reports the CPU architecture it's running on at runtime
- A multi-stage Dockerfile that cross-compiles for both `linux/amd64` and `linux/arm64` without slow QEMU emulation
- A multi-arch image in Google Artifact Registry that acts as a single entry point for any architecture
- A GKE cluster with two node pools: a standard x86 pool and an ARM Axion pool
- A Kubernetes Deployment that pins your workload exclusively to the ARM nodes

:::

By the end, you'll hit a live endpoint and see the word `arm64` staring back at you from a Google Cloud ARM node. Let's get into it.

::: note Prerequisites

Before you start, make sure you have the following ready:

- **A Google Cloud project** with billing enabled. If you don't have one, create it at [<VPIcon icon="iconfont icon-gcp"/>console.cloud.google.com](https://console.cloud.google.com). The total cost to follow this tutorial is around $5–10.
- `gcloud` **CLI** installed and authenticated. Run `gcloud auth login` to sign in and `gcloud config set project YOUR_PROJECT_ID` to point it at your project.
- **Docker Desktop** version 19.03 or later. Docker Buildx (the tool we'll use for multi-arch builds) ships bundled with it.
- `kubectl` installed. This is the CLI for interacting with Kubernetes clusters.
- Basic familiarity with **Docker** (images, layers, Dockerfile) and **Kubernetes** (pods, deployments, services). You don't need to be an expert, but you should know what these things are.

:::

---

## Step 1: Set Up Your Google Cloud Project

Before writing a single line of application code, let's get the cloud infrastructure side ready. This is the foundation everything else will build on.

### Enable the Required APIs

Google Cloud services are off by default in any new project. Run this command to turn on the three APIs we'll need:

```sh
gcloud services enable \
artifactregistry.googleapis.com \
container.googleapis.com \
containeranalysis.googleapis.com
```

Here's what each one does:

- `artifactregistry.googleapis.com` — enables **Artifact Registry**, where we'll store our Docker images
- `container.googleapis.com` — enables **Google Kubernetes Engine (GKE)**, where our cluster will run
- `containeranalysis.googleapis.com` — enables vulnerability scanning for images stored in Artifact Registry

### Create a Docker Repository in Artifact Registry

Artifact Registry is Google Cloud's managed container image store — the place where our built images will live before being deployed to the cluster. Create a dedicated repository for this tutorial:

```sh
gcloud artifacts repositories create multi-arch-repo \
--repository-format=docker \
--location=us-central1 \
--description="Multi-arch tutorial images"
```

::: info Breaking down the flags

- `--repository-format=docker` — tells Artifact Registry this repository stores Docker images (as opposed to npm packages, Maven artifacts, and so on)
- `--location=us-central1` — the Google Cloud region where your images will be stored. Use a region that's close to where your cluster will run to minimize image pull latency. Run `gcloud artifacts locations list` to see all options.
- `--description` — a human-readable label for the repository, shown in the console.

:::

### Authenticate Docker to Push to Artifact Registry

Docker needs credentials before it can push images to Google Cloud. Run this command to wire up authentication automatically:

```sh
gcloud auth configure-docker us-central1-docker.pkg.dev
```

This adds a credential helper entry to your <VPIcon icon="fas fa-folder-open"/>`~/.docker/`<VPIcon icon="iconfont icon-json"/>`config.json` file. What that means in practice: any time Docker tries to push or pull from a URL under `us-central1-docker.pkg.dev`, it will automatically call `gcloud` to get a valid auth token. You won't need to run `docker login` manually.

![Terminal output of the gcloud artifacts repositories list command, showing a row for multi-arch-repo with format DOCKER, location us-central1](https://cdn.hashnode.com/uploads/covers/5f97fb446ea7602886a16070/31fd020f-ffa2-40bd-9057-57b16a61b325.png)

---

## Step 2: Create the GKE Cluster

With Artifact Registry ready to receive images, let's create the Kubernetes cluster. We'll start with a standard cluster using x86 nodes and add an ARM node pool later once we have an image to deploy.

```sh
gcloud container clusters create axion-tutorial-cluster \
--zone=us-central1-a \
--num-nodes=2 \
--machine-type=e2-standard-2 \
--workload-pool=PROJECT_ID.svc.id.goog
```

Replace `PROJECT_ID` with your actual Google Cloud project ID.

::: info What each flag does

- `--zone=us-central1-a` — creates a zonal cluster in a single availability zone. A regional cluster (using `--region`) would spread nodes across three zones for higher resilience, but for this tutorial a single zone keeps things simple and avoids capacity issues that can affect specific zones. If `us-central1-a` is unavailable, try `us-central1-b`.
- `--num-nodes=2` — two x86 nodes in this zone. We need at least 2 to have enough capacity alongside our ARM node pool later.
- `--machine-type=e2-standard-2` — the machine type for this default node pool. `e2-standard-2` is a cost-effective x86 machine with 2 vCPUs and 8 GB of memory, good for general workloads.
- `--workload-pool=PROJECT_ID.svc.id.goog` — enables **Workload Identity**, which is Google's recommended way for pods to authenticate with Google Cloud APIs. It avoids the need to download and store service account key files inside your cluster.

:::

This command takes a few minutes. While it runs, you can move on to writing the application. We'll come back to the cluster in Step 6. ![GCP Console Kubernetes Engine Clusters page showing axion-tutorial-cluster with a green checkmark status, the zone us-central1-a, and Kubernetes version in the table.](https://cdn.hashnode.com/uploads/covers/5f97fb446ea7602886a16070/332250a8-3f99-4eb1-849f-51ab054c9567.png)

---

## Step 3: Write the Application

We need an application to containerize. We'll use **Go** for three specific reasons:

1. Go compiles into a single, statically-linked binary. There's no runtime to install, no interpreter — just the binary. This makes for extremely lean container images.
2. Go has first-class, built-in cross-compilation support. We can compile an ARM64 binary from an x86 Mac, or vice versa, by setting two environment variables. This will matter a lot when we get to the Dockerfile.
3. Go exposes the architecture the binary was compiled for via `runtime.GOARCH`. Our server will report this at runtime, giving us hard proof that the correct binary is running on the correct hardware.

Start by creating the project directories:

```sh
mkdir -p hello-axion/app hello-axion/k8s
cd hello-axion/app
```

Initialize the Go module from inside <VPIcon icon="fas fa-folder-open"/>`app/`. This creates <VPIcon icon="fa-brands fa-golang"/>`go.mod` in the current directory:

```sh
go mod init hello-axion
```

`go mod init` is Go's built-in command for starting a new module. It writes a <VPIcon icon="fa-brands fa-golang"/>`go.mod` file that declares the module name (`hello-axion`) and the minimum Go version required. Every modern Go project needs this file — without it, the compiler doesn't know how to resolve packages.

Now create the application at <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-golang"/>`main.go`:

```go title="app/main.go"
package main

import (
    "fmt"
    "net/http"
    "os"
    "runtime"
)

func handler(w http.ResponseWriter, r *http.Request) {
    hostname, _ := os.Hostname()
    fmt.Fprintf(w, "Hello from freeCodeCamp!\n")
    fmt.Fprintf(w, "Architecture : %s\n", runtime.GOARCH)
    fmt.Fprintf(w, "OS           : %s\n", runtime.GOOS)
    fmt.Fprintf(w, "Pod hostname : %s\n", hostname)
}

func healthz(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "ok")
}

func main() {
    http.HandleFunc("/", handler)
    http.HandleFunc("/healthz", healthz)
    fmt.Println("Server starting on port 8080...")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Fprintf(os.Stderr, "server error: %v\n", err)
        os.Exit(1)
    }
}
```

Verify both files were created:

```sh
ls -la
```

You should see <VPIcon icon="fa-brands fa-golang"/>`go.mod` and `main.go` listed.

::: info Let's walk through what this code does

- `import "runtime"` — imports Go's built-in `runtime` package, which exposes information about the Go runtime environment, including the CPU architecture.
- `runtime.GOARCH` — returns a string like `"arm64"` or `"amd64"` representing the architecture this binary was compiled for. When we deploy to an ARM node, this value will be `arm64`. This is the core of our proof.
- `os.Hostname()` — returns the pod's hostname, which Kubernetes sets to the pod name. This lets us see which specific pod responded when we test the app later.
- `handler` — the main HTTP handler, registered on the root path `/`. It writes the architecture, OS, and hostname to the response.
- `healthz` — a separate handler registered on `/healthz`. It returns HTTP 200 with the text `ok`. Kubernetes will use this endpoint to check whether the container is alive and ready to serve traffic — we'll wire this up in the deployment manifest later.
- `http.ListenAndServe(":8080", nil)` — starts the server on port 8080. If it fails to start (for example, if the port is already in use), it prints the error and exits with a non-zero code so Kubernetes knows something went wrong.

:::

---

## Step 4: Enable Multi-Arch Builds with Docker Buildx

Before we write the Dockerfile, we need to understand a fundamental constraint, because it directly shapes how the Dockerfile must be written.

### Why Your Docker Images Are Architecture-Specific By Default

A CPU only understands instructions written for its specific **Instruction Set Architecture (ISA)**. ARM64 and x86_64 are different ISAs — different vocabularies of machine-level operations. When you compile a Go program, the compiler translates your source code into binary instructions for exactly one ISA. That binary can't run on a different ISA.

When you build a Docker image the normal way (`docker build`), the binary inside that image is compiled for your local machine's ISA. If you're on an Apple Silicon Mac, you get an ARM64 binary. Push that image to an x86 server, and when Docker tries to execute the binary, the kernel rejects it:

```plaintext title="output"
standard_init_linux.go:228: exec user process caused: exec format error
```

That's the operating system saying: "This binary was written for a different processor. I have no idea what to do with it."

### The Solution: A Single Image Tag That Serves Any Architecture

Docker solves this with a structure called a **Manifest List** (also called a multi-arch image index). Instead of one image, a Manifest List is a pointer table. It holds multiple image references — one per architecture — all under the same tag.

When a server pulls `hello-axion:v1`, here's what actually happens:

1. Docker contacts the registry and requests the manifest for `hello-axion:v1`
2. The registry returns the Manifest List, which looks like this internally:

```json
{
  "manifests": [
    { "digest": "sha256:a1b2...", "platform": { "architecture": "amd64", "os": "linux" } },
    { "digest": "sha256:c3d4...", "platform": { "architecture": "arm64", "os": "linux" } }
  ]
}
```

1. Docker checks the current machine's architecture, finds the matching entry, and pulls only that specific image layer. The x86 image never downloads onto your ARM server, and vice versa.

One tag, two actual images. Completely transparent to your deployment manifests.

### Set Up Docker Buildx

**Docker Buildx** is the CLI tool that builds these Manifest Lists. It's powered by the **BuildKit** engine and ships bundled with Docker Desktop. Run the following to create and activate a new builder instance:

```sh
docker buildx create --name multiarch-builder --use
```

- `--name multiarch-builder` — gives this builder a memorable name. You can have multiple builders. This command creates a new one named `multiarch-builder`.
- `--use` — immediately sets this new builder as the active one, so all future `docker buildx build` commands use it.

Now boot the builder and confirm it supports the platforms we need:

```sh
docker buildx inspect --bootstrap
#
# Name:          multiarch-builder
# Driver:        docker-container
# Platforms:     linux/amd64, linux/arm64, linux/arm/v7, linux/386, ...
```

- `--bootstrap` — starts the builder container if it isn't already running, and prints its full configuration.

The `Platforms` line lists every architecture this builder can produce images for. As long as you see `linux/amd64` and `linux/arm64` in that list, you're ready to build for both x86 and ARM.

![Terminal output showing the multiarch-builder details with Name, Driver set to docker-container, and a Platforms list that includes linux/amd64 and linux/arm64 highlighted.](https://cdn.hashnode.com/uploads/covers/5f97fb446ea7602886a16070/1c19aca1-30c4-406d-9c37-679ee4f2928f.png)

---

## Step 5: Write the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`

Now we can write the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`. We'll use two techniques together: a **multi-stage build** to keep the final image tiny, and a **cross-compilation trick** to avoid slow CPU emulation.

Create <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-docker"/>`Dockerfile` with the following content:

```dockerfile title="Dockerfile"
# -----------------------------------------------------------
# Stage 1: Build
# -----------------------------------------------------------
# $BUILDPLATFORM = the machine running this build (your laptop)
# \(TARGETOS / \)TARGETARCH = the platform we are building FOR
# -----------------------------------------------------------
FROM --platform=$BUILDPLATFORM golang:1.23-alpine AS builder

ARG TARGETOS
ARG TARGETARCH

WORKDIR /app

COPY go.mod .
RUN go mod download

COPY main.go .

RUN GOOS=\(TARGETOS GOARCH=\)TARGETARCH go build -ldflags="-w -s" -o server main.go

# -----------------------------------------------------------
# Stage 2: Runtime
# -----------------------------------------------------------

FROM alpine:latest

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

WORKDIR /app
COPY --from=builder /app/server .

EXPOSE 8080
CMD ["./server"]
```

There's a lot happening here. Let's go through it carefully.

### Stage 1: The Builder

```dockerfile
FROM --platform=$BUILDPLATFORM golang:1.23-alpine AS builder
```

This is the most important line in the file. `\(BUILDPLATFORM` is a special build argument that Docker Buildx automatically injects — it equals the platform of the machine *running the build* (your laptop). By pinning the builder stage to `\)BUILDPLATFORM`, the Go compiler always runs natively on your machine, not inside a CPU emulator. This is what makes multi-arch builds fast.

Without `--platform=$BUILDPLATFORM`, Buildx would have to use **QEMU** — a full CPU emulator — to run an ARM64 build environment on your x86 machine (or vice versa). QEMU works, but it's typically 5–10 times slower than native execution. For a project with many dependencies, that's the difference between a 2-minute build and a 20-minute build.

```dockerfile
ARG TARGETOS` **and** `ARG TARGETARCH
```

These two lines declare that our Dockerfile expects build arguments named `TARGETOS` and `TARGETARCH`. Buildx injects these automatically based on the `--platform` flag you pass at build time. For a `linux/arm64` target, `TARGETOS` will be `linux` and `TARGETARCH` will be `arm64`.

```dockerfile
COPY go.mod .` **and** `RUN go mod download
```

We copy <VPIcon icon="fa-brands fa-golang"/>`go.mod` first, before copying the rest of the source code. Docker builds images layer by layer and caches each layer. By copying only the module file first, we create a cached layer for `go mod download`.

On future builds, as long as <VPIcon icon="fa-brands fa-golang"/>`go.mod` hasn't changed, Docker skips the download step entirely — even if the source code changed. This speeds up iterative development significantly.

```dockerfile
RUN GOOS=\(TARGETOS GOARCH=\)TARGETARCH go build -ldflags="-w -s" -o server main.go
```

This is the cross-compilation step. `GOOS` and `GOARCH` are Go's built-in cross-compilation environment variables. Setting them tells the Go compiler to produce a binary for a different target than the machine it's running on. We set them from the `\(TARGETOS` and `\)TARGETARCH` build args injected by Buildx.

The `-ldflags="-w -s"` flag strips the debug symbol table and the DWARF debugging information from the binary. This has no effect on runtime behavior but reduces the binary size by roughly 30%.

### Stage 2: The Runtime Image

```dockerfile
FROM alpine:latest
```

This starts a brand-new image from Alpine Linux — a minimal Linux distribution that weighs about 5 MB. Critically, `alpine:latest` is itself a multi-arch image, so Docker automatically selects the `arm64` or `amd64` Alpine variant depending on which platform this stage is built for.

Everything from Stage 1 — the Go toolchain, the source files, the intermediate object files — is discarded. The final image contains *only* Alpine Linux plus our binary. Compared to a naive single-stage Go image (~300 MB), this approach produces an image under 15 MB.

```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

These two lines create a non-root user and set it as the active user for the container. Running containers as root is a security risk — if an attacker exploits a vulnerability in your application, they gain root access inside the container. Running as a non-root user limits the blast radius.

```dockerfile
COPY --from=builder /app/server .
```

This is how multi-stage builds work: the `--from=builder` flag tells Docker to copy files from the `builder` stage (Stage 1), not from your local disk. Only the compiled binary (`server`) makes it into the final image.

---

## Step 6: Build and Push the Multi-Arch Image

With the application and Dockerfile in place, we can now build images for both architectures and push them to Artifact Registry — all in a single command.

From inside the <VPIcon icon="fas fa-folder-open"/>`app/` directory, run:

```sh
docker buildx build \
--platform linux/amd64,linux/arm64 \
-t us-central1-docker.pkg.dev/PROJECT_ID/multi-arch-repo/hello-axion:v1 \
--push .
```

Replace `PROJECT_ID` with your actual GCP project ID.

::: info Here's what each part of this command does

- `docker buildx build` — uses the Buildx CLI instead of the standard `docker build`. Buildx is required for multi-platform builds.
- `--platform linux/amd64,linux/arm64` — instructs Buildx to build the image twice: once targeting x86 Intel/AMD machines, and once targeting ARM64. Both builds run in parallel. Because our Dockerfile uses the `$BUILDPLATFORM` cross-compilation trick, both builds run natively on your machine without QEMU emulation.
- `-t us-central1-docker.pkg.dev/PROJECT_ID/multi-arch-repo/hello-axion:v1` — the full image path in Artifact Registry. The format is always `REGION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME:TAG`.
- `--push` — multi-arch images can't be loaded into your local Docker daemon (which only understands single-architecture images). This flag tells Buildx to skip local storage and push the completed Manifest List — with both architecture variants — directly to the registry.
- `.` — the build context, the directory Docker scans for the Dockerfile and any files the build needs.

:::

Watch the output as the build runs. You'll see BuildKit working on both platforms simultaneously:

```plaintext
 => [linux/amd64 builder 1/5] FROM golang:1.23-alpine
 => [linux/arm64 builder 1/5] FROM golang:1.23-alpine
 ...
 => pushing manifest for us-central1-docker.pkg.dev/.../hello-axion:v1
```

![Terminal showing docker buildx build output with two parallel build tracks labeled linux/amd64 and linux/arm64, and a final line reading pushing manifest for the Artifact Registry image path.](https://cdn.hashnode.com/uploads/covers/5f97fb446ea7602886a16070/dc88f558-b4ee-4100-bfe1-eaa943bec9bc.png)

### Verify the Multi-Arch Image in Artifact Registry

Once the push completes, navigate to **GCP Console → Artifact Registry → Repositories → multi-arch-repo** and click on `hello-axion`.

You won't see a single image — you'll see something labelled **"Image Index"**. That's the Manifest List we created. Click into it, and you'll find two child images with separate digests, one for `linux/amd64` and one for `linux/arm64`.

You can also inspect this from the command line:

```sh
docker buildx imagetools inspect \
us-central1-docker.pkg.dev/PROJECT_ID/multi-arch-repo/hello-axion:v1
```

![Google Cloud Artifact Registry console showing hello-axion as an Image Index with two child images: one labeled linux/amd64 and one labeled linux/arm64, each with its own digest and size.](https://cdn.hashnode.com/uploads/covers/5f97fb446ea7602886a16070/28d0e4a4-1d45-4c0b-ac47-34dc3b72c11d.png)

The output lists every manifest inside the image index. You'll see entries for `linux/amd64` and `linux/arm64` — those are our two real images. You'll also see two entries with `Platform: unknown/unknown` labelled as `attestation-manifest`. These are **build provenance records** that Docker Buildx automatically attaches to prove how and where the image was built (a supply chain security feature called SLSA attestation).

The two entries you care about are `linux/amd64` and `linux/arm64`. Note the digest for the `arm64` entry — we'll use it in the verification step to confirm the cluster pulled the right variant.

---

## Step 7: Add the Axion ARM Node Pool

We have a universal image. Now we need somewhere to run it.

Recall the cluster we created in Step 2 — it's running `e2-standard-2` x86 machines. We're going to add a second node pool running ARM machines. This is the key architectural move: a **mixed-architecture cluster** where different workloads can be routed to different hardware.

### Choosing Your ARM Machine Type

Google Cloud currently offers two ARM-based machine series in GKE:

| Series | Example type | What it is |
| --- | --- | --- |
| **Tau T2A** | `t2a-standard-2` | First-gen Google ARM (Ampere Altra). Broadly available across regions. Great for getting started. |
| **Axion (C4A)** | `c4a-standard-2` | Google's custom ARM chip (Arm Neoverse V2 core). Newest generation, best price-performance. Still expanding availability. |

This tutorial uses `t2a-standard-2` because it's widely available. The commands are identical for `c4a-standard-2` — just swap the `--machine-type` value. If `t2a-standard-2` isn't available in your zone, GKE will tell you immediately when you run the node pool creation command below, and you can try a neighbouring zone.

### Create the ARM Node Pool

Add the ARM node pool to your existing cluster:

```sh
gcloud container node-pools create axion-pool \
--cluster=axion-tutorial-cluster \
--zone=us-central1-a \
--machine-type=t2a-standard-2 \
--num-nodes=2 \
--node-labels=workload-type=arm-optimized
```

::: info What each flag does

- `--cluster=axion-tutorial-cluster` — the name of the cluster we created in Step 2. Node pools are always added to an existing cluster.
- `--zone=us-central1-a` — must match the zone you used when creating the cluster.
- `--machine-type=t2a-standard-2` — GKE detects this is an ARM machine type and automatically provisions the nodes with an ARM-compatible version of Container-Optimized OS (COS). You don't need to configure anything special for ARM at the OS level.
- `--num-nodes=2` — two ARM nodes in the zone, enough to schedule our 3-replica deployment alongside other cluster overhead.
- `--node-labels=workload-type=arm-optimized` — attaches a custom label to every node in this pool. We'll use this label in our deployment manifest to target these specific nodes. Using a descriptive custom label (rather than just relying on the automatic `kubernetes.io/arch=arm64` label) is good practice in real clusters — it communicates the *intent* of the pool, not just its hardware.

:::

This command takes a few minutes. Once it completes, let's confirm our cluster now has both node pools:

```sh
gcloud container clusters get-credentials axion-tutorial-cluster --zone=us-central1-a

kubectl get nodes --label-columns=kubernetes.io/arch
#
# NAME                                    STATUS   ARCH    AGE
# gke-...default-pool-abc...              Ready    amd64   15m
# gke-...default-pool-def...              Ready    amd64   15m
# gke-...axion-pool-jkl...                Ready    arm64   3m
# gke-...axion-pool-mno...                Ready    arm64   3m
```

The `get-credentials` command configures `kubectl` to authenticate with your new cluster. The `get nodes` command then lists all nodes and adds a column showing the `kubernetes.io/arch` label.

`amd64` for the default x86 pool, `arm64` for our new Axion pool. This `kubernetes.io/arch` label is applied automatically by GKE — you don't set it, it's derived from the hardware.

![Terminal output of kubectl get nodes with a ARCH column showing amd64 for two default-pool nodes and arm64 for two axion-pool nodes.](https://cdn.hashnode.com/uploads/covers/5f97fb446ea7602886a16070/6389f4c6-17fe-4086-982f-39d94dbfa252.png)

---

## Step 8: Deploy the App to the ARM Node Pool

We have a multi-arch image and a mixed-architecture cluster. Here's something important to understand before writing the deployment manifest: **Kubernetes doesn't know or care about image architecture by default**.

If you applied a standard Deployment right now, the scheduler would look for any available node with enough CPU and memory and place pods there — potentially landing on x86 nodes instead of your ARM Axion nodes. The multi-arch Manifest List would handle this gracefully (the right binary would run regardless), but you'd lose the cost efficiency you provisioned Axion nodes for in the first place.

To guarantee that pods land on ARM nodes and only ARM nodes, we use a `nodeSelector`.

### How nodeSelector Works

A `nodeSelector` is a set of key-value pairs in your pod spec. Before the Kubernetes scheduler places a pod, it checks every available node's labels. If a node doesn't have all the labels in the `nodeSelector`, the scheduler skips it — the pod will remain in `Pending` state rather than land on the wrong node.

This is a hard constraint, which is exactly what we want for cost optimization. Contrast this with Node Affinity's soft preference mode (`preferredDuringSchedulingIgnoredDuringExecution`), which says "try to use ARM, but fall back to x86 if needed." Soft preferences are useful for resilience, but they undermine the whole point of dedicated ARM pools. We want the hard constraint.

### Write the Deployment Manifest

Create <VPIcon icon="fas fa-folder-open"/>`k8s/`<VPIcon icon="iconfont icon-yaml"/>`deployment.yaml`:

```yaml title="k8s/deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-axion
  labels:
    app: hello-axion
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello-axion
  template:
    metadata:
      labels:
        app: hello-axion
    spec:
      nodeSelector:
        kubernetes.io/arch: arm64

      containers:
      - name: hello-axion
        image: us-central1-docker.pkg.dev/PROJECT_ID/multi-arch-repo/hello-axion:v1
        ports:
        - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 3
          periodSeconds: 5
        resources:
          requests:
            cpu: "250m"
            memory: "64Mi"
          limits:
            cpu: "500m"
            memory: "128Mi"
```

Replace `PROJECT_ID` with your project ID. Here's what the key sections do:

`replicas: 3` — tells Kubernetes to keep three instances of this pod running at all times. If one crashes or a node goes down, the scheduler spins up a replacement. Three replicas also means one pod per ARM node in `us-central1`, which distributes load across availability zones.

`selector.matchLabels` and `template.metadata.labels` — these two blocks must match. The `selector` tells the Deployment which pods it "owns," and the `template.metadata.labels` is what those pods will be tagged with. If they don't match, Kubernetes won't be able to manage the pods.

`nodeSelector: kubernetes.io/arch: arm64` — this is the pin. The Kubernetes scheduler filters out every node that doesn't carry this label before considering resource availability. Since GKE automatically applies `kubernetes.io/arch=arm64` to all ARM nodes, our pods will schedule only onto the `axion-pool` nodes.

`livenessProbe` — periodically calls `GET /healthz`. If this check fails a certain number of times in a row (indicating the container has deadlocked or is otherwise unresponsive), Kubernetes restarts the container. `initialDelaySeconds: 5` gives the server 5 seconds to start up before the first check.

`readinessProbe` — similar to the liveness probe, but with a different purpose. While the readiness probe is failing, Kubernetes removes the pod from the service's load balancer, so no traffic is sent to it. This is important during startup — the pod won't receive traffic until it signals it's ready.

`resources.requests` — reserves `250m` (25% of a CPU core) and `64Mi` of memory on the node for this pod. The scheduler uses these numbers to decide whether a node has enough room for the pod. Setting requests is required for sensible bin-packing. Without them, nodes can be silently overcommitted.

`resources.limits` — caps the container at `500m` CPU and `128Mi` memory. If the container exceeds these limits, Kubernetes throttles the CPU or kills the container (for memory). This prevents a single misbehaving pod from starving other workloads on the same node.

### A Note on Taints and Tolerations

Once you're comfortable with `nodeSelector`, the next step in production clusters is adding a **taint** to your ARM node pool. A taint is a repellent — any pod without an explicit **toleration** for that taint is blocked from landing on the tainted node.

This means other workloads in your cluster can't accidentally consume your ARM capacity. You'd add the taint when creating the pool:

```sh
# Add --node-taints to the pool creation command:
--node-taints=workload-type=arm-optimized:NoSchedule
```

And a matching toleration in the pod spec:

```yaml
tolerations:
- key: "workload-type"
  operator: "Equal"
  value: "arm-optimized"
  effect: "NoSchedule"
```

We're not doing this in the tutorial to keep things simple, but it's the pattern production multi-tenant clusters use to enforce hard separation between workload types.

### Write the Service Manifest

We also need a Kubernetes Service to expose the pods over the network. Create <VPIcon icon="fas fa-folder-open"/>`k8s/`<VPIcon icon="iconfont icon-yaml"/>`service.yaml`:

```yaml title="k8s/service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: hello-axion-svc
spec:
  selector:
    app: hello-axion
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
```

- `selector: app: hello-axion` — the Service discovers pods using labels. Any pod with `app: hello-axion` on it will be added to this Service's load balancer pool.
- `port: 80` — the port the Service is reachable on from outside the cluster.
- `targetPort: 8080` — the port on the pod that traffic gets forwarded to. Our Go server listens on port 8080, so this must match.
- `type: LoadBalancer` — tells GKE to provision an external Google Cloud load balancer and assign it a public IP. This is what makes the Service reachable from the internet.

### Apply Both Manifests

```sh
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

`kubectl apply` reads each manifest file and creates or updates the resources described in it. If the resources don't exist yet, they're created. If they already exist, Kubernetes only applies the diff — it won't restart pods unnecessarily.

Watch the pods come up in real time:

```sh
kubectl get pods -w
```

The `-w` flag watches for changes and prints updates as they happen. You should see pods transition from `Pending` → `ContainerCreating` → `Running`. Once all three show `Running`, press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop watching.

---

## Step 9: Verify the Deployment

Everything is running. Now we need evidence — not just that pods are up, but that they're on the right nodes and serving the right binary.

### Confirm Pod Placement

The `-o wide` flag adds extra columns to the output, including the name of the node each pod was scheduled on. Look at the `NODE` column:

```sh
kubectl get pods -o wide
#
# NAME                          READY   STATUS    NODE
# hello-axion-7b8d9f-abc12      1/1     Running   gke-axion-tutorial-axion-pool-a-...
# hello-axion-7b8d9f-def34      1/1     Running   gke-axion-tutorial-axion-pool-b-...
# hello-axion-7b8d9f-ghi56      1/1     Running   gke-axion-tutorial-axion-pool-c-...
```

All three pods should show node names containing `axion-pool`. None should show `default-pool`.

### Confirm the Nodes Are ARM

Take one of those node names and verify its architecture label.

Replace `NODE_NAME` with one of the node names from the previous command. You should see:

```sh
kubectl get node NODE_NAME --show-labels | grep kubernetes.io/arch
#
# kubernetes.io/arch=arm64
```

That's the automatic label GKE applied when it provisioned the ARM hardware. Our `nodeSelector` matched on this label to pin the pods here.

![Terminal split into two sections: the top showing kubectl get pods -o wide with all pods scheduled on nodes containing axion-pool in the name, and the bottom showing kubectl get node with kubernetes.io/arch=arm64 in the labels output.](https://cdn.hashnode.com/uploads/covers/5f97fb446ea7602886a16070/815312ea-e2bf-4106-863e-55cd0bdad5f7.png)

### Ask the Application Itself

This is the most satisfying verification step. Our Go server reports the architecture of the binary that's running. Let's ask it directly.

Use `kubectl port-forward` to create a secure tunnel from port 8080 on your local machine to port 8080 on the Deployment:

```sh
kubectl port-forward deployment/hello-axion 8080:8080
```

This command stays running in the foreground — open a **second terminal window** and run:

```sh
curl http://localhost:8080
#
# Hello from freeCodeCamp!
# Architecture : arm64
# OS           : linux
# Pod hostname : hello-axion-7b8d9f-abc12
```

`Architecture : arm64`. That's our Go binary confirming that it was compiled for ARM64 and is executing on an ARM64 CPU. The single image tag we built does the right thing automatically.

![Terminal output of curl `http://localhost:8080` showing the four-line response: Hello from freeCodeCamp, Architecture: arm64, OS: linux, and the pod hostname.](https://cdn.hashnode.com/uploads/covers/5f97fb446ea7602886a16070/114ff82d-950f-4059-a1fa-89baffb90b6c.png)

### The Bonus: See the Manifest List in Action

Want to see the multi-arch image indexing at work? Stop the port-forward, then run:

```sh
docker buildx imagetools inspect \
us-central1-docker.pkg.dev/PROJECT_ID/multi-arch-repo/hello-axion:v1
```

Replace `PROJECT_ID` with your actual Google Cloud project ID.

You'll see four entries in the manifest list. Two are real images — `Platform: linux/amd64` and `Platform: linux/arm64`. The other two show `Platform: unknown/unknown` with an `attestation-manifest` annotation. These are **build provenance records** that Docker Buildx automatically attaches to every image — a supply chain security feature (SLSA attestation) that proves how and where the image was built.

You may notice that if you check the image digest recorded in a running pod:

```sh
kubectl get pod POD_NAME \
-o jsonpath='{.status.containerStatuses[0].imageID}'
```

Replace `POD_NAME` with one of the pod names from earlier.

The digest returned matches the **top-level manifest list digest**, not the `arm64`-specific one. This is expected behaviour. Modern Kubernetes (using containerd) records the manifest list digest, not the resolved platform digest. The platform resolution already happened when the node pulled the correct image variant.

The definitive proof that the right binary is running is what you already have: the node labeled `kubernetes.io/arch=arm64` and the application reporting `Architecture: arm64`.

![top-level manifest list digest](https://cdn.hashnode.com/uploads/covers/5f97fb446ea7602886a16070/7dffe0c8-28cf-4a5d-8459-1e8db3da7dc0.png)

---

## Step 10: Cost Savings and Tradeoffs

The hands-on work is done. Let's talk about why any of this is worth the effort.

### The Cost Math

At the time of writing, here's how ARM compares to equivalent x86 machines on Google Cloud (prices are approximate and change over time — check the [<VPIcon icon="fa-brands fa-google"/>official pricing page](https://cloud.google.com/compute/vm-instance-pricing) before making decisions):

| Instance | vCPU | Memory | Approx. $/hour |
| --- | --- | --- | --- |
| `n2-standard-4` (x86) | 4 | 16 GB | ~$0.19 |
| `t2a-standard-4` (Tau ARM) | 4 | 16 GB | ~$0.14 |
| `c4a-standard-4` (Axion) | 4 | 16 GB | ~$0.15 |

That's a raw 25–30% reduction in compute cost per node. Factor in Google's published claim of up to 65% better price-performance for Axion on relevant workloads — meaning you may need fewer nodes to handle the same traffic — and the savings compound further.

Here's how that looks at scale, for a service running 20 nodes continuously for a year:

- 20 × `n2-standard-4` × \\(0.19 × 8,760 hours = **\\)33,288/year**
- 20 × `t2a-standard-4` × \\(0.14 × 8,760 hours = **\\)24,528/year**

That's roughly **$8,760 saved annually** on compute, before committed use discounts (which further widen the gap).

### When ARM Is the Right Choice

ARM works best for:

- **Stateless API servers and web applications** — like the app we built. ARM excels at high-throughput, low-latency network workloads.
- **Background workers and queue processors** — long-running services that don't depend on x86-specific binaries.
- **Microservices written in Go, Rust, or Python** — these languages have excellent ARM64 support and are built cross-platform by default.

### When to Proceed Carefully

- **Native library dependencies** — some older C libraries, proprietary SDKs, or compiled ML model-serving runtimes don't have ARM64 builds. Always audit your dependency tree before migrating.
- **CI pipelines need ARM too** — your automated tests should run on ARM, not just x86. An image that silently fails only on ARM is harder to debug than one that never claimed ARM support.
- **Profile before optimizing** — the cost savings are real, but measure your actual workload behavior on ARM before committing. Not every workload benefits equally.

---

## Cleanup

When you're done, clean up to avoid ongoing charges:

```sh
# Remove the Kubernetes resources from the cluster
kubectl delete -f k8s/

# Delete the ARM node pool
gcloud container node-pools delete axion-pool \
--cluster=axion-tutorial-cluster \
--zone=us-central1-a

# Delete the cluster itself
gcloud container clusters delete axion-tutorial-cluster \
--zone=us-central1-a

# Delete the images from Artifact Registry (optional — storage costs are minimal)
gcloud artifacts docker images delete \
us-central1-docker.pkg.dev/PROJECT_ID/multi-arch-repo/hello-axion:v1
```

---

## Conclusion

Let's recap what you built and why each part matters.

You started with a Go application, a Dockerfile, and a `docker buildx build` command that produced two images — one for x86, one for ARM64 — wrapped in a single Manifest List tag. Any server that pulls that tag gets the right binary automatically, without you maintaining separate pipelines or separate tags.

You provisioned a GKE cluster with two node pools running different CPU architectures, then used `nodeSelector` to make sure your ARM-optimized workload lands only on the ARM Axion nodes — not on x86 by accident. The result is a deployment that's both architecture-correct and cost-efficient.

The patterns you practiced here don't stop at this demo. The same Dockerfile technique works for any language with cross-compilation support. The same `nodeSelector` approach works for any workload you want to pin to ARM. As more teams migrate services to ARM over the coming years, having these skills will be a real asset.

::: info Where to go from here

- Add a GitHub Actions workflow that runs `docker buildx build --platform linux/amd64,linux/arm64` on every push, automating this entire process in CI.
- Audit one of your existing stateless services for ARM compatibility and try migrating it.
- Explore **Node Affinity** as a softer alternative to `nodeSelector` for workloads that can run on either architecture but prefer ARM.
- Look into **GKE Autopilot**, which now supports ARM nodes and handles node pool management automatically.

:::

Happy building.

::: info Project File Structure

```sh title="file structure"
hello-axion/
├── app/
│   ├── main.go          # Go HTTP server
│   ├── go.mod           # Go module definition
│   └── Dockerfile       # Multi-stage Dockerfile
└── k8s/
    ├── deployment.yaml  # Deployment with nodeSelector and probes
    └── service.yaml     # LoadBalancer Service
```

:::

::: info

All source files for this tutorial are available in the companion GitHub repository: [<VPIcon icon="iconfont icon-github"/>`Amiynarh/multi-arch-docker-gke-arm`](https://github.com/Amiynarh/multi-arch-docker-gke-arm)

<SiteInfo
  name="Amiynarh/multi-arch-docker-gke-arm"
  desc="Companion code for a freeCodeCamp tutorial on building multi-architecture Docker images and deploying to Google Cloud ARM (Axion) nodes on GKE."
  url="https://github.com/Amiynarh/multi-arch-docker-gke-arm/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6a932eb2e40128ab206370d8abe154010000ce6e526f2c72a223c508865a16c9/Amiynarh/multi-arch-docker-gke-arm"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build and Deploy Multi-Architecture Docker Apps on Google Cloud Using ARM Nodes (Without QEMU)",
  "desc": "If you've bought a laptop in the last few years, there's a good chance it's running an ARM processor. Apple's M-series chips put ARM on the map for developers, but the real revolution is happening ins",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-multi-architecture-docker-apps-on-google-cloud-using-arm-nodes.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
