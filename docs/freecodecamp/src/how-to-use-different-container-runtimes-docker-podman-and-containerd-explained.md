---
lang: en-US
title: "How to Use Different Container Runtimes: Docker, Podman, and Containerd Explained"
description: "Article(s) > How to Use Different Container Runtimes: Docker, Podman, and Containerd Explained"
icon: fa-brnads fa-docker
category:
  - DevOps
  - Docker
  - Podman
  - Containerd
  - Lima
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - podman
  - containerd
  - lima
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Different Container Runtimes: Docker, Podman, and Containerd Explained"
    - property: og:description
      content: "How to Use Different Container Runtimes: Docker, Podman, and Containerd Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-different-container-runtimes-docker-podman-and-containerd-explained.html
prev: /devops/docker/articles/README.md
date: 2026-02-18
isOriginal: false
author:
  - name: Destiny Erhabor
    url: https://freecodecamp.org/news/author/CaesarSage/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771357533601/1cba7a91-19f0-4038-93e6-504b121a9a03.png
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
  "title": "Podman > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/podman/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Lima > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/lima/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Different Container Runtimes: Docker, Podman, and Containerd Explained"
  desc="If you’re a developer working with containers, chances are Docker is your go-to tool. But did you know that there's a whole ecosystem of container runtimes out there? Some are lighter, some are more secure, and some are specifically built for Kuberne..."
  url="https://freecodecamp.org/news/how-to-use-different-container-runtimes-docker-podman-and-containerd-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1771357533601/1cba7a91-19f0-4038-93e6-504b121a9a03.png"/>

If you’re a developer working with containers, chances are Docker is your go-to tool. But did you know that there's a whole ecosystem of container runtimes out there? Some are lighter, some are more secure, and some are specifically built for Kubernetes.

Understanding different container runtimes gives you more options. You can choose the right tool for your specific needs, whether that's better security, lower resource usage, or easier integration with Kubernetes.

In this tutorial, you'll learn about three major container runtimes and how to use them on your system. We’ll dive into practical examples with complete code you can run right now. By the end, you’ll understand when to use each runtime and how to move containers between them.

---

## What Are Container Runtimes?

A container runtime is the software that actually runs your containers. When you type `docker run nginx`, for example, several things happen behind the scenes. The Docker CLI talks to the Docker daemon, which then uses a container runtime (usually containerd) to actually create and run the container.

Think of it like this: if containers are apps on your phone, the container runtime is the operating system that makes those apps work. Just like you can install the same app on different phones (iPhone vs Android), you can run the same container on different runtimes.

### Why Does This Matter?

You might wonder why you should care about what's running your containers. Docker works fine, right? Here are a few reasons:

1. **Security:** Some runtimes like Podman can run containers without root privileges. This means if someone breaks out of your container, they don't have full system access.
2. **Resource usage:** Different runtimes use different amounts of memory and CPU. On a resource-constrained server or edge device, this matters a lot.
3. **Integration:** If you're deploying to Kubernetes, understanding containerd or CRI-O helps you troubleshoot production issues.
4. **Licensing:** Docker Desktop has licensing requirements for large companies. Alternatives like Podman are completely free.

Here’s a chart that summarizes these key points:

![Container runtime comparison chart](https://cdn.hashnode.com/res/hashnode/image/upload/v1770901945553/8ef53746-02d1-4936-8930-fc7255aaa2bc.jpeg)

---

## How to Understand High-Level vs Low-Level Runtimes

Container runtimes are split into two categories, and understanding this distinction helps you see how everything fits together.

### Low-Level Runtimes

Low-level runtimes like `runc` and `crun` do the actual work of creating containers. They interact directly with the Linux kernel to create isolated environments using features like namespaces and cgroups.

**Namespaces** isolate what a process can see. For example, a process namespace means the container can't see other processes running on your system. A network namespace means it has its own network stack.

**Cgroups** (control groups) limit what a process can use. You can limit a container to 512MB of RAM or 50% of one CPU core. This prevents one container from hogging all your resources.

These low-level runtimes implement the OCI (Open Container Initiative) Runtime Specification. This is a standard that defines exactly how to run a container. Because of this standard, you can swap out runtimes and your containers still work.

### High-Level Runtimes

High-level runtimes like Docker, Podman, and containerd manage images, networking, volumes, and provide user-friendly interfaces. They handle pulling images from registries, setting up networks between containers, and managing container lifecycles.

These high-level runtimes use low-level runtimes under the hood. When you run `docker run`, Docker ultimately calls `runc` to create the container. This layering means you get a nice interface while still benefiting from the standard, battle-tested low-level runtime.

::: important Why This Layering Matters

This separation of concerns is powerful. High-level runtimes can focus on user experience and features while low-level runtimes focus on reliably creating containers. You can swap low-level runtimes without changing your workflow. Some people use `crun` instead of `runc` because it's written in C and starts faster.

:::

---

## How to Use Docker as Your Baseline

Let's start with Docker since you're probably already familiar with it. This will give us a baseline to compare other runtimes against. We'll build a simple web application and then run the same application in different runtimes to see how they compare.

### How to Install Docker

You can find installation guides for your operating system:

<SiteInfo
  name="Mac"
  desc="Install Docker Desktop for Mac to get started. This guide covers system requirements, where to download, and instructions on how to install and update."
  url="https://docs.docker.com/desktop/setup/install/mac-install/"
  logo="https://docs.docker.com/favicon.ico"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

<SiteInfo
  name="Windows"
  desc="Get started with Docker for Windows. This guide covers system requirements, where to download, and instructions on how to install and update."
  url="https://docs.docker.com/desktop/setup/install/windows-install/"
  logo="https://docs.docker.com/favicon.ico"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

<SiteInfo
  name="Install"
  desc="Learn how to choose the best method for you to install Docker Engine. This client-server application is available on Linux, Mac, Windows, and as a static binary."
  url="https://docs.docker.com/engine/install/"
  logo="https://docs.docker.com/favicon.ico"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

### How to Run a Test Container

Let's verify that Docker works by running a simple container:

```sh
docker run hello-world
```

You should see a message that says:

```plaintext title="output"
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

#### What Just Happened?

When you ran that command, Docker checked if the `hello-world` image exists locally. It didn't find it, so it pulled the image from Docker Hub (a public registry). Then it created a container from that image, started the container, and the container printed its message and exited.

All of this happened in a few seconds. Now let's build something more useful.

### How to Create a Web Server

Create a new directory for your project:

```sh
mkdir ~/container-demo
cd ~/container-demo
```

The `~` symbol means your home directory. On macOS, this is <VPIcon icon="fas fa-folder-open"/>`/Users/yourname`. On Linux, it's <VPIcon icon="fas fa-folder-open"/>`/home/yourname`.

Create a simple HTML file:

```sh
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Container Demo</title></head>
<body>
  <h1>Hello from Docker!</h1>
  <p>This is running in a container.</p>
</body>
</html>
EOF
```

This creates a basic HTML file. The `cat >` command writes to a file, and `<< 'EOF'` means "read until you see EOF" (End Of File). This is a handy way to create files from the command line.

### How to Create a <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`

You can create a dockerfile like this:

```sh
cat > Dockerfile << 'EOF'
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
EOF
```

:::: info Understanding the <code>Dockerfile</code>

The <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` has two instructions:

1. `FROM nginx:alpine`: This starts with the official Nginx image. The `:alpine` tag means we're using the Alpine Linux version, which is much smaller (about 20MB instead of 130MB). Alpine is a minimal Linux distribution popular in containers because of its small size.
2. `COPY index.html /usr/share/nginx/html/`: This copies your HTML file into the location where Nginx serves files. Inside the container, Nginx is configured to serve files from <VPIcon icon="fas fa-folder-open"/>`/usr/share/nginx/html/`.

:::

### How to Build a Docker Image

```sh
docker build -t my-web-app .
```

The `-t` flag means "tag" – we're naming the image `my-web-app`. The `.` at the end means "use the current directory as the build context". Docker will look for a Dockerfile in the current directory and send all files here to the Docker daemon for building.

You'll see output like:

```plaintext title="output"
[+] Building 2.3s (7/7) FINISHED
=> [internal] load build definition from Dockerfile
=> => transferring dockerfile: 98B
=> [internal] load .dockerignore
...
=> => naming to docker.io/library/my-web-app
```

This shows Docker building your image layer by layer. Each instruction in the Dockerfile creates a new layer. These layers are cached, so if you rebuild without changes, it's instant.

### How to Run a Docker Container

```sh
docker run -d -p 8080:80 my-web-app
```

#### Understanding the Flags:

- `-d` means "detached mode" – run in the background. Without this, the container runs in the foreground and you'll see Nginx's log output. With `-d`, it returns immediately and runs in the background.
- `-p 8080:80` maps port 8080 on your host machine to port 80 inside the container. Nginx listens on port 80 inside the container. To access it from your browser, you need to map it to a port on your machine. We chose 8080, but you could use any available port.

Open your browser and visit `http://localhost:8080`. You should see your HTML page!

![Localhost running docker container](https://cdn.hashnode.com/res/hashnode/image/upload/v1770902754636/b6641413-7bd6-4548-aa75-dbc487630c1d.png)

#### How to Check Running Containers:

```sh
docker ps
```

This shows all running containers. You'll see something like:

```plaintext title="output"
CONTAINER ID   IMAGE        COMMAND                  PORTS                  NAMES
a1b2c3d4e5f6   my-web-app   "/docker-entrypoint.…"   0.0.0.0:8080->80/tcp   peaceful_curie
```

Docker automatically generated a random name (`peaceful_curie` in this example). You can specify a name with `--name` if you prefer.

#### How to View Container Logs:

```sh
docker logs <container-id>
```

Replace `<container-id>` with the ID from `docker ps` (just the first few characters work). This shows what's happening inside the container. For Nginx, you'll see access logs showing requests to your web server.

#### How to Stop the Container:

```sh
docker stop <container-id>
```

This gracefully stops the container. Nginx receives a signal to shut down cleanly.

Now that you understand how to use Docker, let’s check out how Podman works next.

---

## How to Use Podman – The Daemonless Alternative

Now let's try Podman. It's designed to be a drop-in replacement for Docker, but with some key differences that make it interesting for specific use cases.

### Why Podman Exists

Docker runs as a daemon (a background service) that requires root privileges. This daemon always runs, listening for commands. This architecture has some downsides:

1. **Security:** The Docker daemon runs as root. If someone compromises the daemon, they have root access to your entire system.
2. **Resource Usage:** The daemon consumes resources even when you're not running containers.
3. **Single Point of Failure:** If the daemon crashes, all your containers stop.

Podman solves these problems by not using a daemon at all. Each `podman` command runs independently. This is called a "daemonless" architecture.

::: important Key Podman Features

To summarize, here are some key helpful features of Podman that might make it a good fit for your projects:

1. **No daemon required:** Each command runs independently. No background service needed.
2. **Rootless by default:** Containers run as your regular user, not as root. This dramatically improves security.
3. **Drop-in Docker replacement:** Most Docker commands work exactly the same. You can even alias `docker=podman` and many applications won't notice the difference.
4. **Pod support:** Podman has a concept of "pods" like Kubernetes. This is unique among container tools.

:::

Now that you understand the benefits of Podman, let’s see how you can use it.

### How to Install Podman

Podman installation varies by operating system. Here are the official guides:

```component VPCard
{
  "title": "Podman Installation > macOS | Podman",
  "desc": "Looking for a GUI? You can find Podman Desktop here.",
  "link": "https://podman.io/docs/installation#macos",
  "logo": "https://podman.io/favicon.ico",
  "background": "rgba(30,204,255,0.2)"
}
```

```component VPCard
{
  "title": "Podman Installation > Windows | Podman",
  "desc": "Looking for a GUI? You can find Podman Desktop here.",
  "link": "https://podman.io/docs/installation/#windows",
  "logo": "https://podman.io/favicon.ico",
  "background": "rgba(30,204,255,0.2)"
}
```

```component VPCard
{
  "title": "Podman Installation > Installing on Linux | Podman",
  "desc": "Looking for a GUI? You can find Podman Desktop here.",
  "link": "https://podman.io/docs/installation/#installing-on-linux",
  "logo": "https://podman.io/favicon.ico",
  "background": "rgba(30,204,255,0.2)"
}
```

::: tip

**For macOS users** (what we'll use in this tutorial), you can install Podman using Homebrew:

```sh
brew install podman
```

:::

### How to Initialize and Start Podman Machine

On macOS, Podman needs a Linux VM to run containers (since containers use Linux kernel features). Podman Machine handles this for you:

```sh
podman machine init
```

This creates a small Linux VM. You’ll only need to do this once. The VM is about 1GB and uses minimal resources when running.

![Initialize podman machine](https://cdn.hashnode.com/res/hashnode/image/upload/v1770903100891/671690cc-8073-4748-b2df-c4308585d411.png)

Start the machine:

```sh
podman machine start
```

Verify it's working:

```sh
podman --version
```

You should see something like:

```sh
podman version 4.5.0
```

### How to Run Containers with Podman

Here's where it gets interesting. You can use nearly identical commands to Docker. Let's build and run the same web server you created earlier:

```sh
# Build the image (same command as Docker)
podman build -t my-web-app .

# Run the container
podman run -d -p 8081:80 my-web-app

# See running container
podman ps
```

Notice that we used port 8081 this time so it doesn't conflict with the Docker container if it's still running. Visit `http://localhost:8081` and you'll see the same page, but this time it's running in Podman!

![Localhost running podman container](https://cdn.hashnode.com/res/hashnode/image/upload/v1770903417925/4717dd8f-bda5-4aaa-ad16-2a24726ee820.png)

If you experience issue when running the podman build command, you can delete the docker image using `docker image rm my-web-app:latest`.

#### What's Different Under the Hood?

Even though the commands look the same, what's happening is different: first no daemon was involved. The `podman` command directly created and started the container. And the container is running as your user, not as root.

You can verify this by checking what user owns the process:

```sh
podman top <container-id> user
```

You'll see your username, not `root`.

### Podman Pods – A Unique Feature

Podman has a unique feature that Docker doesn't have: pods. A pod is a group of containers that share networking and storage. This is the same concept Kubernetes uses, which makes Podman excellent for local Kubernetes development.

::: important Why Pods Matter

In real applications, you often have multiple containers that need to work together. For example, a web application typically needs a database to store data, a cache layer for temporary storage of frequently accessed data and a logging container for request, response, and non-sensitive critical application metadata.

These four containers (web, database, cache, logger) need to communicate with each other. In Docker, you'd create a custom network and connect each container to it. In Podman, you can create a pod that automatically handles this networking.

:::

### How to Create a Podman Pod

```sh
podman pod create --name my-app-pod -p 8082:80
```

This creates a pod named `my-app-pod` and exposes port 8082 on your host to port 80 inside the pod. Notice that you don't expose ports on individual containers – you expose them on the pod.

Add a web server to the pod:

```sh
podman run -d --pod my-app-pod --name web nginx:alpine
```

The `--pod` flag tells Podman to run this container inside the pod. The container doesn't need its own port mapping because the pod handles that.

Add Redis (an in-memory database) to the pod:

```sh
podman run -d --pod my-app-pod --name cache redis:alpine
```

Now you have two containers running in the same pod. Here's the powerful part: they share the same network namespace.

To check your pod:

```sh
# List all pods
podman pod ps -a

# Show details for one pod
podman pod inspect <pod-name-or-id>

# Check processes running in the pod
podman top pod <pod-name-or-id>

# See logs from containers in that pod
podman logs <container-name-or-id>
```

![Podman pod inspection showing container running](https://cdn.hashnode.com/res/hashnode/image/upload/v1770903859712/3cabe09b-d693-4adf-85bf-74115122203a.png)

::: info Understanding Shared Networking:

Both containers can reach each other using `localhost`. The web container can connect to Redis using `localhost:6379` (Redis's default port). It's as if they're running on the same machine.

This is exactly how Kubernetes pods work. If you learn Podman pods, you're learning Kubernetes networking too.

:::

### How to Generate Kubernetes YAML from Pods

Here's where Podman really shines. You can generate Kubernetes-compatible YAML from your pod:

```sh
podman generate kube my-app-pod > my-app-pod.yaml
```

Open <VPIcon icon="iconfont icon-yaml"/>`my-app-pod.yaml` and you'll see proper Kubernetes configuration:

```yaml :collapsed-lines title="my-app-pod.yaml"
# Save the output of this file and use kubectl create -f to import
# it into Kubernetes.
#
# Created with podman-5.7.1
apiVersion: v1
kind: Pod
metadata:
  annotations:
    io.kubernetes.cri-o.SandboxID/cache: 5e56bd9eab1a02a88654e3614312302d0f3f8d3652480498e6d1eef7d4824019
    io.kubernetes.cri-o.SandboxID/web: 5e56bd9eab1a02a88654e3614312302d0f3f8d3652480498e6d1eef7d4824019
  creationTimestamp: "2026-02-12T13:44:55Z"
  labels:
    app: my-app-pod
  name: my-app-pod
spec:
  containers:
  - args:
    - nginx
    - -g
    - daemon off;
    image: docker.io/library/nginx:alpine
    name: web
    ports:
    - containerPort: 80
      hostPort: 8082
  - args:
    - redis-server
    image: docker.io/library/redis:alpine
    name: cache
```

This file can be deployed directly to any Kubernetes cluster:

```sh
# using minikube cluster
kubectl apply -f my-app-pod.yaml
```

This is incredibly useful for local development. You can prototype your application using Podman pods, generate the YAML, and deploy to Kubernetes without rewriting anything.

### How to Manage Podman Machines

When working with Podman on macOS or Windows, you're using a Linux VM. Here's how to manage it.

#### List all Podman machines

```sh
podman machine list
```

![`podman machine list`](https://cdn.hashnode.com/res/hashnode/image/upload/v1771074980607/84d2692e-11ce-4943-9187-a6a993d43c1d.png)

This shows all your Podman VMs, their status (running or stopped), and their names. The default machine is usually called `podman-machine-default`.

#### Check machine status and info

```sh
podman machine info
```

This displays detailed information about your current machine including CPU, memory, and disk usage.

#### Stop the Podman machine

```sh
podman machine stop
```

If you have multiple machines, specify the name:

```sh
podman machine stop podman-machine-default
```

This stops the VM but preserves it. All your images and containers remain intact. When you stop the machine, all running containers inside it are stopped.

#### Start a stopped machine

```sh
podman machine start
```

Or with a specific name:

```sh
podman machine start podman-machine-default
```

This restarts the VM. Your images are still there, but containers remain stopped unless you started them with a restart policy.

#### Delete a Podman machine

```sh
podman machine rm podman-machine-default
```

This completely destroys the VM and all its contents (images, containers, volumes). Use this when you want to start fresh or free up disk space.

With this basic understanding of how Podman works, we can move on and learn about how to use Containerd.

---

## How to Work with Containerd

Containerd is the runtime that Docker itself uses under the hood. It's also the default runtime for most Kubernetes installations. When you run Docker, you're actually using containerd without knowing it.

::: important Why Use containerd Directly?

You might wonder why you'd use containerd directly if Docker already uses it. Here are a few reasons:

1. **Kubernetes:** Most Kubernetes clusters use containerd as their container runtime. Understanding it helps you troubleshoot production issues.
2. **Minimal footprint:** containerd has no UI and minimal features. It uses less memory than Docker Desktop (about 50MB vs 2GB).
3. **Building tools:** If you're building container orchestration tools, working directly with containerd gives you fine-grained control.

:::

### Understanding the Architecture

The containerd architecture looks like this:

```sh
Your Command → nerdctl → containerd → runc → Container
```

In this chain, nerdctl provides a Docker-like CLI, containerd manages images and container lifecycle, and runc actually creates the container using kernel features.

### How to Install containerd with nerdctl

containerd is designed for systems (like Kubernetes) rather than direct developer use. The installation approach differs by operating system:

```component VPCard
{
  "title": "Installation",
  "desc": "Supported host OS: macOS (the latest version is recommended) Linux NetBSD (untested) DragonFlyBSD (untested) Windows (untested) Prerequisite: QEMU (Required, only if QEMU driver is used) Homebrew MacPorts Nix Binary brew install lima Hint: specify --HEAD to install the HEAD (master) version. The HEAD version provides early access to the latest features and improvements before they are officially released. Homebrew formula is available here. Supports macOS and Linux...",
  "link": "https://lima-vm.io/docs/installation/",
  "logo": "https://lima-vm.io/favicons/android-192x192.png",
  "background": "rgba(13,110,253,0.2)"
}
```

<SiteInfo
  name="containerd/docs/getting-started.md at main · containerd/containerd"
  desc="An open and reliable container runtime. Contribute to containerd/containerd development by creating an account on GitHub."
  url="https://github.com/containerd/containerd/blob/main/docs/getting-started.md/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6f13ecb82eeb6be2279c557c3ffd468f357c4e94c7f6ac6861563d5abd53a9f5/containerd/containerd"/>

<SiteInfo
  name="Releases · containerd/nerdctl"
  desc="contaiNERD CTL - Docker-compatible CLI for containerd, with support for Compose, Rootless, eStargz, OCIcrypt, IPFS, ... - containerd/nerdctl"
  url="https://github.com/containerd/nerdctl/releases"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/89fabde716cf43dc035d5c28b2e2dcb2366872dba69ae555728fde9631f3b3cc/containerd/nerdctl"/>

::: tip

**For macOS users** (what we'll use in this tutorial), we’ll use Lima, which provides a Linux VM with containerd and nerdctl already installed.

```sh
brew install lima
```

Lima comes with nerdctl built-in, so you don't need to install it separately.

**For Linux users**, you can install containerd directly from your package manager and download nerdctl from the GitHub releases page. Containerd runs natively on Linux without needing a VM.

:::

### How to Start a Lima Instance

```sh
limactl start
```

This creates a default Linux VM running containerd with nerdctl available. The VM is configured with reasonable defaults (2GB RAM, 100GB disk). You can customize these settings if needed.

Lima mounts your home directory inside the VM, so you can access your files. This makes working with Lima feel transparent – you don't need to copy files into the VM.

Verify it's working:

```sh
lima nerdctl run hello-world
```

![Containerd Lima instance and Hello-world container](https://cdn.hashnode.com/res/hashnode/image/upload/v1771074008992/aa76dcd5-8eb5-4baf-9d72-47e1f4aa3ae3.png)

### How to Run Your App with nerdctl

The commands are nearly identical to Docker. This is intentional – nerdctl aims for Docker compatibility. Since we're running through Lima, we’ll prefix commands with `lima`.

Navigate to your project directory:

```sh
cd ~/container-demo
```

Build the image:

```sh
lima nerdctl build -t my-web-app .
```

Run the container:

```sh
lima nerdctl run -d -p 8083:80 my-web-app
```

Visit `http://localhost:8083` to see your app running on containerd!

![Localhost running containerd container](https://cdn.hashnode.com/res/hashnode/image/upload/v1771074352767/8ee7339d-8145-494e-9bac-41bfc8f620e1.png)

### What's Different from Docker?

Under the hood, a lot is different. Containerd is managing your image and container. There's no daemon in the traditional sense (containerd runs differently than dockerd). Images are stored differently (though they're OCI-compliant so they're compatible).

But from your perspective as a developer, the commands feel the same. This is the power of standards like OCI.

#### How to Check Running Containers

```sh
lima nerdctl ps
```

This shows all running containers.

![Running containers](https://cdn.hashnode.com/res/hashnode/image/upload/v1771074426408/3b5da24c-0dad-4c8e-9ce8-fd8cb319f9f9.png)

### How to Manage Lima VMs

When working with containerd through Lima, you're using a Linux VM. Here's how to manage it.

#### List all Lima VMs

```sh
limactl list
```

This shows all your Lima VMs, their status (running or stopped), and their names. The default VM is usually called `default`.

#### Check VM status and info

```sh
limactl info default
```

This displays detailed information about the specified VM including its configuration and resource usage.

#### Stop the Lima VM

```sh
limactl stop default
```

This stops the VM but preserves it. All your images and containers remain intact. When you stop the VM, all running containers inside it are stopped. The next time you start it, your images will still be there but containers remain stopped.

#### Start a stopped VM

```sh
limactl start default
```

This restarts the VM. Your images persist across restarts, so you don't need to rebuild them.

#### Delete a Lima VM

```sh
limactl delete default
```

![Containerd VM list and deletion](https://cdn.hashnode.com/res/hashnode/image/upload/v1771074893694/071702bb-8a35-4681-98ec-f1375a52c5d7.png)

This completely destroys the VM and all its contents (images, containers, volumes). Use this when you want to start fresh or free up disk space. You'll need to run `limactl start` again to create a new VM.

#### Create a new VM with custom settings:

```sh
limactl start --name my-custom-vm --cpus 4 --memory 8
```

This creates a new VM with 4 CPUs and 8GB of memory. You can have multiple Lima VMs for different projects.

---

## How to Move Containers Between Runtimes

Thanks to the OCI (Open Container Initiative) standard, you can move container images between different runtimes. This is incredibly powerful – you can build with one tool and deploy with another.

### Why Standards Matter

Before OCI, each container runtime used its own image format. Moving images between runtimes was difficult or impossible.

OCI created standards for the Runtime Specification (how to run a container), the Image Specification (how to package a container image), and the Distribution Specification (how to transfer images between systems).

Now all major runtimes follow these standards, making images portable.

### Method 1 – Using Container Registries

The easiest way to share images is through a container registry like Docker Hub, GitHub Container Registry, or your own private registry. Any runtime can push and pull from registries.

First, build with Docker:

```sh
docker build -t my-username/my-app:v1 .
```

The image name has three parts: `my-username` (your registry username), `my-app` (the application name), and `v1` (a version tag).

Push to Docker Hub:

```sh
docker login
docker push my-username/my-app:v1
```

You'll need to create a free Docker Hub account if you don't have one. The `docker login` command prompts for your credentials.

Now pull with Podman:

```sh
podman pull my-username/my-app:v1
```

Podman downloads the image from Docker Hub. Even though it was built with Docker, Podman can use it because both follow OCI standards.

Or pull with nerdctl:

```sh
lima nerdctl pull my-username/my-app:v1
```

Same image, three different runtimes. This is the power of standards.

### Method 2 – Export and Import

If you don't want to use a public registry (maybe your image contains proprietary code), you can export images as tar files. This is perfect for air-gapped environments or simply moving images between machines.

Export from Docker:

```sh
docker save my-web-app -o my-web-app.tar
```

This creates a file called <VPIcon icon="fas fa-file-zipper"/>`my-web-app.tar` containing the image and all its layers. The file might be large (tens or hundreds of megabytes) depending on your image.

Import to Podman:

```sh
podman load -i my-web-app.tar
```

Import to nerdctl:

```sh
lima nerdctl load -i my-web-app.tar
```

Now you have the same image available in all three runtimes! You can verify:

```sh
docker images
podman images  
lima nerdctl images
```

All three commands will show `my-web-app` in their image lists.

::: info Understanding Image Layers

When you export an image, you're exporting all its layers. Each line in your Dockerfile creates a layer. These layers are shared between images, which saves disk space.

For example, if you have 10 images all based on `nginx:alpine`, they all share the nginx layers. Only the layers unique to each image take up additional space.

:::

---

## Real-World Use Cases

Let's look at some real scenarios where choosing the right runtime matters. These examples show how technical decisions have practical impacts.

### Use Case 1 – Security-First Development

If you're working on security-sensitive applications (financial services, healthcare, government), Podman's rootless containers are a huge advantage.

#### The Security Problem

Traditional Docker requires root privileges. If someone exploits a vulnerability in your container and escapes to the host system, they have root access. This is called a "container escape" vulnerability.

Podman's rootless mode solves this:

```sh
# All Podman commands run as your user by default
podman run --rm -it alpine whoami
```

This outputs your username, not `root`. The command uses `--rm` to remove the container when it exits (cleanup), `-it` to make it interactive with a terminal, `alpine` as a minimal Linux distribution, and `whoami` as a command that prints your username.

Even if someone breaks out of the container, they only have your user's permissions. They can't install system-wide malware, access other users' data, modify system configuration, or install kernel modules.

This dramatically reduces the impact of a container escape.

#### Example Security Scenario

Imagine you're running a web application that processes user uploads. A vulnerability lets an attacker execute code in your container. With Docker running as root, they could escape the container, install a rootkit, steal all data from your server, and persist even after you patch the vulnerability.

With Podman rootless, they might escape the container but can only access files your user can access. They can't persist beyond the container and can't affect other users or system files.

The difference is dramatic.

### Use Case 2 – Testing Kubernetes Locally

Podman can generate Kubernetes YAML from running containers. This is perfect for prototyping before you commit to a Kubernetes configuration.

#### The Development Workflow

1. Run your application locally with Podman
2. Test and iterate quickly
3. Generate Kubernetes YAML when it works
4. Deploy to a real cluster

Here's a practical example. Let's say you're building a web application with a database:

Run your containers:

```sh
# Create a pod (like a Kubernetes pod)
podman pod create --name myapp -p 8080:80

# Add web server
podman run -d --pod myapp --name web nginx:alpine

# Add PostgreSQL
podman run -d --pod myapp --name db \
-e POSTGRES_PASSWORD=secret \
postgres:alpine
```

Test your application at `http://localhost:8080`. When it works, generate Kubernetes YAML:

```sh
podman generate kube myapp > myapp.yaml
```

Now you can deploy <VPIcon icon="iconfont icon-yaml"/>`myapp.yaml` to any Kubernetes cluster:

```sh
kubectl apply -f myapp.yaml
```

This is much faster than writing Kubernetes YAML by hand and debugging in a cluster. You iterate locally, then deploy when ready.

#### Why This Matters

Kubernetes has a steep learning curve. The YAML configuration is verbose and error-prone. By starting with simple Podman commands and generating YAML, you can focus on your application first, learn Kubernetes gradually, catch configuration errors early, and iterate quickly without cloud costs.

### Use Case 3 – Resource-Constrained Environments

containerd has the smallest footprint. If you're running containers on edge devices, Raspberry Pi, or resource-constrained servers, this matters a lot.

#### Comparing Memory Usage

Here are typical memory footprints for each runtime:

- Docker Desktop uses approximately 2GB RAM (includes the VM, daemon, UI, and Kubernetes).
- Podman uses approximately 500MB RAM (includes the VM on macOS).
- Containerd uses approximately 50MB RAM (just the runtime, no extras).

On a developer laptop with 16GB RAM, this difference doesn't matter much. But consider these scenarios:

**1. Edge Computing:**

You're running containers on edge devices with 1GB RAM total. Docker Desktop won't fit. containerd leaves room for your application.

**2. IoT Devices:**

A Raspberry Pi with 2GB RAM running Docker Desktop leaves little room for your application. containerd uses minimal resources.

**3. High-Density Servers:**

Running 100 containers per server. Every MB counts. Using containerd instead of full Docker saves 2GB per server × 100 servers = 200GB.

**Example Setup for Edge Device:**

```sh
# On a Raspberry Pi or similar device
sudo apt-get install containerd
sudo apt-get install nerdctl

# Now you can run containers with minimal overhead
nerdctl run -d my-lightweight-app
```

Your application gets to use most of the available RAM instead of competing with a heavy runtime.

---

## Quick Reference Guide

Here's a handy comparison of common commands across runtimes:

| Task | Docker | Podman | nerdctl (via Lima) |
| --- | --- | --- | --- |
| Build image | `docker build -t app .` | `podman build -t app .` | `lima nerdctl build -t app .` |
| Run container | `docker run -d app` | `podman run -d app` | `lima nerdctl run -d app` |
| List containers | `docker ps` | `podman ps` | `lima nerdctl ps` |
| View logs | `docker logs <id>` | `podman logs <id>` | `lima nerdctl logs <id>` |
| Stop container | `docker stop <id>` | `podman stop <id>` | `lima nerdctl stop <id>` |
| Remove container | `docker rm <id>` | `podman rm <id>` | `lima nerdctl rm <id>` |
| List images | `docker images` | `podman images` | `lima nerdctl images` |
| Pull image | `docker pull nginx` | `podman pull nginx` | `lima nerdctl pull nginx` |
| Push to registry | `docker push app` | `podman push app` | `lima nerdctl push app` |
| Execute in container | `docker exec -it <id> sh` | `podman exec -it <id> sh` | `lima nerdctl exec -it <id> sh` |

---

## Conclusion

In this guide, we’ve explored three major container runtimes and learned how to use Docker, Podman, and containerd. The container ecosystem is much bigger than just Docker, and knowing alternatives gives you more options for security, performance, and specialized use cases.

Use Docker when you're learning or need the best documentation. Use Podman when you need rootless security or are building CI/CD pipelines. Use containerd when you need minimal resource usage or are deploying to Kubernetes clusters.

Thanks to OCI standards, your containers are portable. Build with Docker, test with Podman, deploy with containerd – it all works together! You're not locked into one vendor or tool.

As always, I hope you enjoyed this guide and learned something. If you want to stay connected or see more hands-on DevOps content, you can follow me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`destiny-erhabor`)](https://linkedin.com/in/destiny-erhabor) and [DevOps Cloud Projects (<VPIcon icon="iconfont icon-github"/>`Caesarsage/DevOps-Cloud-Projects`)](https://github.com/Caesarsage/DevOps-Cloud-Projects)

Happy containerizing!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Different Container Runtimes: Docker, Podman, and Containerd Explained",
  "desc": "If you’re a developer working with containers, chances are Docker is your go-to tool. But did you know that there's a whole ecosystem of container runtimes out there? Some are lighter, some are more secure, and some are specifically built for Kuberne...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-different-container-runtimes-docker-podman-and-containerd-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
