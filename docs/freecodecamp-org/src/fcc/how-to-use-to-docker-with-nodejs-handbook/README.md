---
lang: en-US
title: "How to Use to Docker with Node.js: A Handbook for Developers"
description: "Article(s) > How to Use to Docker with Node.js: A Handbook for Developers"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - AWS
  - Node.js
  - Express.js
  - Data Science
  - MongoDB
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - aws
  - amazon
  - amazon-web-services
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - data-science
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use to Docker with Node.js: A Handbook for Developers"
    - property: og:description
      content: "How to Use to Docker with Node.js: A Handbook for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-to-docker-with-nodejs-handbook/
prev: /devops/docker/articles/README.md
date: 2025-11-19
isOriginal: false
author:
  - name: oghenekparobo Stephen
    url : https://freecodecamp.org/news/author/Xtephen/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1763502750050/74610cbc-124b-48aa-9cb6-7ed861123511.png
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
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use to Docker with Node.js: A Handbook for Developers"
  desc="In this handbook, you’ll learn what Docker is, why it’s become an essential, must-have skill for backend and full-stack developers in 2025, and most importantly, how to use it in real-world projects from start to finish. We will go far beyond the usu..."
  url="https://freecodecamp.org/news/how-to-use-to-docker-with-nodejs-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1763502750050/74610cbc-124b-48aa-9cb6-7ed861123511.png"/>

In this handbook, you’ll learn what Docker is, why it’s become an essential, must-have skill for backend and full-stack developers in 2025, and most importantly, how to use it in real-world projects from start to finish.

We will go far beyond the usual “Hello World” examples and walk you through containerizing a complete full-stack JavaScript application (Node.js + Express backend, HTML/CSS/JS frontend, MongoDB database, and Mongo Express admin UI).

You’ll learn about networking multiple containers, orchestrating everything with Docker Compose, building and versioning your own images, persisting data with volumes, and securely pushing your Images to a private AWS ECR repository for sharing and production deployment.

By the end, you’ll be able to eliminate “it works on my machine” issues, confidently manage multi-service applications, deploy consistent environments anywhere, and integrate Docker into your daily workflow and CI/CD pipelines like a pro.

Since Docker is such a key skill for backend developers, we’ll start by covering its basic concepts.

::: note Prerequisites

This technical handbook is designed for developers who have some practical, hands-on experience in full-stack development. You should be comfortable deploying applications and have a basic understanding of CI/CD pipelines.

While we’ll cover Docker from the ground up, this guide is not for absolute beginner developers. I assume you have real-world development experience and want to level up your workflow with Docker.

Finally, a basic familiarity with AWS and general deployment concepts will also be useful, though you don’t need to be an expert. This handbook is ideal for developers looking to enhance their production-grade skills and confidently integrate Docker into their projects.

:::

---

## What is a Container?

A container is a way to package an application together with everything it needs, including its dependencies, libraries, and configuration files.

Because containers are portable, they can be shared across teams and deployed on any machine without worrying about compatibility.

![pictures of stack containers, to portrait or give an idea what containers are or a vivid pictureof containers aliking to containers in docker](https://cdn.hashnode.com/res/hashnode/image/upload/v1762863191484/827d0731-a392-419f-b17b-9a3611a4f3b4.jpeg)

### Where Do Containers Live?

Since containers are portable and can be shared across teams and systems, they need a place to live. That’s where container repositories come in – special storage locations for containers. Organizations can have private repositories for internal use, while public ones like [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/) let anyone browse and use shared containers.

![an image of docker hub, showing a catalogue of images](https://cdn.hashnode.com/res/hashnode/image/upload/v1762863680430/caddd581-08e1-45c7-a676-818ad364f56b.png)

If you visit the catalog page on Docker Hub, you will see a variety of container repositories, both official and community-made, from developers and teams like Redis, Jenkins, and many others.

In the past, when multiple developers worked on different projects, each had to manually install services on their own systems. Since different developers often use different operating systems like Linux, macOS, and Windows, the setup process was never the same. It took a lot of time, led to plenty of errors, and made setting up new environments a real headache, especially when you had to repeat it for multiple services.

Docker changed the game for developers and teams. Instead of manually installing every service and dependency, you can just run a single Docker command to start a container. Each container has its own isolated environment with everything it needs, so it runs the same on any machine, no matter if it’s Windows, macOS, or Linux. This makes collaboration smoother and eliminates all the bottlenecks that come from different setups, missing dependencies, or version mismatches.

In short, Docker is a platform that packages your app and its dependencies into a single, portable container, so it runs the same way everywhere.

---

## Docker vs Virtual Machines

Docker and virtual machines (VMs) are both ways to run apps in a “virtual” environment, but they work differently. To understand the differences, it helps to know a bit about how computers run software.

A quick look at the layers:

- **Kernel:** This is the part of the operating system that talks to your computer’s hardware, like the CPU, memory, and disk. Think of it as the middleman between your apps and your computer.
- **Application layer:** This is where programs and apps run. It sits on top of the kernel and uses it to access hardware resources.

So, now let’s get into a bit more detail about Virtual Machines. A VM virtualizes the **entire operating system**, which means it comes with its own kernel and its own application layer. When you download a VM, you are basically getting a full OS inside your computer, often several gigabytes in size.

Because it has to boot its own OS, VMs start slowly. But VMs are very compatible, and can run on almost any host because they include everything they need.

Docker, on the other hand, only virtualizes the **application layer**, not the full OS. Containers share the host system’s kernel but include everything the app needs, dependencies, libraries, and configuration.

Docker images are small, often just a few megabytes. Containers start almost instantly because they don’t boot a full OS. A Docker container can run anywhere Docker is installed, no matter what operating system your computer uses.

In simple terms, to summarize:

- A VM is like running a whole computer inside your computer – big, heavy, and slow.
- A Docker container is like a self-contained app package – small, fast, and portable.

::: info

Here’s a quick comparison:

| Feature | Virtual Machine | Docker Container |
| --- | --- | --- |
| Size | GBs (large) | MBs (small) |
| Startup Speed | Slow | Fast |
| OS Layer | Full OS + kernel | Shares host kernel |
| Portability | Runs on compatible host | Runs anywhere Docker is installed |

:::

---

## Docker Installation

Alright, now that you know what Docker is, let’s get it running on your own machine.

Docker works on Windows, macOS, and Linux, but each system has slightly different steps. The official Docker [<VPIcon icon="fa-brands fa-docker"/>documentation](https://docs.docker.com/get-started/introduction/) has clear instructions for all operating systems under Docker Docs: Install Docker.

If you are more of a visual learner, this YouTube video walks you through installing Docker on Windows and Linux step by step: [<VPIcon icon="fa-brands fa-youtube"/>Watch here](https://youtu.be/BuGEGM_elXY).

<VidStack src="youtube/BuGEGM_elXY" />

Here is a simple roadmap:

First, check your system requirements. Docker won’t run on every computer, so make sure your OS version is supported (the official [<VPIcon icon="fa-brands fa-docker"/>docs](https://docs.docker.com/engine/install/) have a checklist).

1. Windows and macOS users:
    - **Newer systems:** Download and install [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop](https://docs.docker.com/desktop/)**.** It’s the easiest way to get started.
    - **Older systems:** If your computer doesn’t support Docker Desktop (for example, missing Hyper-V or older OS versions), you can use [<VPIcon icon="fas fa-globe"/>Docker Toolbox](https://docker-docs.uclv.cu/toolbox/toolbox_install_windows/). Toolbox installs Docker using a lightweight virtual machine, so you can still run containers even on older machines.
2. Linux users: You will usually install Docker through your package manager (`apt` for Ubuntu/Debian, `yum` for CentOS/Fedora, etc.). The official [<VPIcon icon="fa-brands fa-docker"/>docs](https://docs.docker.com/desktop/setup/install/linux/) show the commands for your distro.

Then verify your installation: Open a terminal or command prompt and type:

```sh
docker --version
```

If you see the Docker version displayed, congratulations! Docker is ready to go.

![docker version displayed on cli](https://cdn.hashnode.com/res/hashnode/image/upload/v1762871221981/6b01cf18-a8b5-4aa9-b213-38cffd4ae5f4.png)

Once Docker is installed, you’ll be ready to start running containers, pulling images, and experimenting with your apps in a safe, isolated environment.

::: tip Tip for beginners:

If you’re on an older machine and using Docker Toolbox, commands are mostly the same, but you will run them inside the **Docker Quickstart Terminal**, which sets up the virtual machine for you.

:::

---

## Table of Contents:

4. [Basic Docker Commands](#heading-basic-docker-commands)
5. [Practice with JavaScript](#heading-practice-with-javascript)
6. [How to Run the Mongo Container](#heading-how-to-run-the-mongo-container)
7. [How to Run the Mongo Express Container](#heading-how-to-run-the-mongo-express-container)
8. [How to Connect Node.js to MongoDB](#heading-how-to-connect-nodejs-to-mongodb)
9. [How to Use Docker Compose](#heading-how-to-use-docker-compose)
10. [How to Build Our Own Docker Image](#heading-how-to-build-our-own-docker-image)
11. [How to Manage Your Containers](#heading-how-to-manage-your-containers)
12. [How to Create a Private Docker Repository](#heading-how-to-create-a-private-docker-repository)
13. [Assignment: Create and Push a New Version](#heading-assignment-create-and-push-a-new-version)
14. [Docker Volumes](#heading-docker-volumes)

---

## Basic Docker Commands

So far, we have been throwing around terms like images and containers, sometimes even interchangeably. But there is an important difference:

- **Docker image:** Think of an image as a **blueprint** or a package. It contains everything your app needs: the code, libraries, dependencies, and configuration, but it’s not running yet.
- **Docker container:** A container is a **running instance of an image**. When you start a container, Docker takes the image and runs it in its own isolated environment.

A helpful way to remember it is this: the image is the recipe, while the container is the cake**.** You can have one recipe (image) and make multiple cakes (containers) from it.

::: note Important note

Docker Hub stores images, not containers. So when you pull something from Docker Hub, you’re downloading an image.

:::

For example:

```sh
docker pull redis
```

Here’s what you’ll see:

![docker run redis shown on cli](https://cdn.hashnode.com/res/hashnode/image/upload/v1762872367018/39039261-9617-4e5f-8156-9529697d0667.png)

This command downloads the Redis image to your machine. Once the download is complete, you can see all the images you have locally with:

```sh
docker images
```

![running docker images on cli](https://cdn.hashnode.com/res/hashnode/image/upload/v1762872440545/bfdb401f-7dd6-4f72-920b-545fbf5193e1.png)

From there, you can start a container from an image whenever you need it:

```sh
docker run -d --name my-redis redis
```

This command starts a container, `my-redis`, from the `redis` image you just pulled.

- `docker run` tells Docker to start a new container from an image.
- `-d` stands for “detached mode.” It means the container runs in the background so you can keep using your terminal.
- `--name my-redis` gives your container a friendly name (`my-redis`) instead of letting Docker assign a random one. It makes it easier to manage later.
- `redis` is the image you are using to start the container.

To see all containers that are currently running, you can use:

```sh
docker ps
```

![ran docker ps in the terminal to list all running containers](https://cdn.hashnode.com/res/hashnode/image/upload/v1762873018123/2e184c25-e4f1-445c-b182-81987929c014.png)

This will list containers with details like:

- Container ID
- Name
- Status (running or stopped)
- The image it’s running from

If you want to see all containers, even ones that aren’t running, you can add the `-a` flag:

```sh
docker ps -a
```

### How to Specify a Version of an Image\

By default, Docker pulls the **latest version** of an image. But sometimes you might need a specific version. You can do this using a colon (`:`) followed by the version tag. For example:

```sh
docker pull redis:7.2
docker run -d --name my-redis redis:7.2
```

To know which versions are available, you can visit [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/repositories) or check the image tags online. Also, running `docker images` on your machine will show you all downloaded images and their versions.

### How to Stop, Start, and Remove a Container

If you want to stop a running container, run this:

```sh
docker stop my-redis
```

To start it again:

```sh
docker start my-redis
```

You can also **remove a container** if you no longer need it:

```sh
docker rm my-redis
```

### How to Restart a Container

You can restart a container using its **container ID** (or name) if something crashes, needs a refresh, or you just want to apply changes.

For example:

```sh
docker ps
# 
# CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS      NAMES
# c002bed0ae9a   redis     "docker-entrypoint.s…"   3 minutes ago   Up 3 minutes   6379/tcp   my-redis
```

Restart it like this:

```sh
docker restart c002bed0ae9a
```

or by name:

```sh
docker restart my-redis
```

Other handy ways:

- **Stop then start**

```sh
docker stop c002bed0ae9a
docker start c002bed0ae9a
```

- **Start with logs**

```sh
docker start c002bed0ae9a && docker logs -f c002bed0ae9a
```

![starting a docker container with logs](https://cdn.hashnode.com/res/hashnode/image/upload/v1762873445952/ffb56b5d-f850-4b53-998d-467ed431a191.png)

### How to Run Multiple Redis Containers and Understanding Ports

Right now, you have a Redis container running:

```sh
docker ps
#
# CONTAINER ID   IMAGE     COMMAND                  STATUS          PORTS      NAMES
# c002bed0ae9a   redis     "docker-entrypoint.s…"   Up 20 minutes   6379/tcp   my-redis
```

Notice the **PORTS** column: `6379/tcp`. This means the container is running Redis on its internal port 6379. By default, this port is inside the container and is not automatically exposed to your computer (the host). Docker maps it only if you specify it.

#### Trying to Run Another Redis Container on the Same Port

If you try:

```sh
docker run -d --name my-redis2 redis:7.4.7-alpine
```

It will fail to map the host port 6379 because the first container is already using it. This is where port binding comes in.

#### What is Port Binding?

Port binding (also called port mapping) is the mechanism Docker uses to connect a port inside a container to a port on your host machine (your laptop/desktop/server).

Without port binding, any service running inside a container is completely isolated: it can listen on its internal ports (for example, Redis on 6379, a Node.js app on 3000, MongoDB on 27017), but nothing outside the container, including your browser, another app on your computer, or even another container on a different network, can reach it.

- **Container Port**: The port inside the container where the app is running (Redis defaults to `6379`).
- **Host Port**: The port on your computer that you want to use to access that container.

Docker lets you map a container port to a different host port using the `-p` flag.

#### Running a Second Redis Container on a Different Host Port

```sh
docker run -d --name my-redis2 -p 6380:6379 redis:7.4.7-alpine
```

`-p 6380:6379` maps host port 6380 to container port 6379. 

- Now you can connect to Redis in the second container using `localhost:6380`.
- Inside the container, Redis still runs on port 6379.

Check both containers:

```sh
docker ps
# 
# CONTAINER ID   IMAGE     STATUS          PORTS             NAMES
# c002bed0ae9a   redis     Up 20 minutes   6379/tcp          my-redis
# d123abcd5678   redis     Up 1 minute     0.0.0.0:6380->6379/tcp   my-redis2
```

The first container is running internally on 6379 (host port not exposed), while the second container is mapped so host port 6380 forwards traffic to container port 6379. Think of each container as a room with a phone line (container port).

- You want to call that room from the outside (host).
- You can’t use the same external phone line for two rooms at the same time.
- With **port binding**, you assign a different external line for each room, even if the internal phone number is the same.

#### Why Port Binding Exists

1. **Avoid port conflicts on the host:** Only one process on your computer can use a given port at a time. If you already have one Redis container using host port 6379, a second container cannot also bind to the same host port. Port binding lets you run many identical containers side-by-side by mapping each one to a different host port (6379 → 6380, 6381, etc.).
2. **Access containerised services from your host:** Your browser, Postman, MongoDB Compass, redis-cli, curl, etc., all run on the host. Without -p, they have no way to talk to services inside containers.
3. **Selective exposure:** You don’t have to expose every port a container uses. Only map the ports you actually need externally, keeping the rest private and secure.

It also gives you more flexibility in development and production. In development, you might map container 3000 to host 3000. But in production (for example, behind a reverse proxy), you might map container 3000 to host 80 or 443, or not expose it at all and let another container talk to it over Docker’s internal network.

### How to Explore a Container

To explore a container, run:

```sh
docker exec -it my-redis2 /bin/sh
```

- `docker exec` runs a command in the container.
- `-it` interactive terminal (lets you type and see output).
- `/bin/sh` starts a shell inside the container.

Once inside, your prompt changes to something like:

```sh
/data #
```

Now you can **list files**, navigate directories, or run programs, all inside the container, without affecting your host machine.

![result of running `docker exec -it my-redis2 /bin/sh`](https://cdn.hashnode.com/res/hashnode/image/upload/v1762876729378/d16e8f00-ab9c-447b-b274-76d613b30ce3.png)

::: important `docker run` vs `docker start`

We have been using `docker run` and `docker start` throughout this article, but here’s why the difference is important:

- **Avoid accidental duplicates:** Using `docker run` every time creates a new container. If you just want to restart something you already set up, `docker start` is faster and safer.
- **Maintain configuration:** `docker start` preserves the container’s original settings, ports, volumes, and names so you don’t risk breaking anything by changing options.
- **Work efficiently with multiple containers:** When running multiple services or different versions of the same app, knowing when to `run` vs `start` helps you manage resources, avoid port conflicts, and keep your workflow smooth.
- **Speed up your workflow:** Starting existing containers is almost instant, while creating a new one takes slightly longer.

**Bottom line** `docker run` = create something new, while `docker start` = resume what you already have.

:::

---

## Practice with JavaScript

Now that we have covered the core Docker concepts, let’s put them into action. In this section, we’ll containerize a simple JavaScript project that consists of:

- **A frontend:** Built with HTML, CSS, and JavaScript
- **A backend:** A simple Node.js server (`server.js`)
- **A database:** A MongoDB instance pulled directly from Docker Hub
- **A UI for MongoDB:** Using **Mongo Express** to visualize and manage our database

This example demonstrates how Docker can manage multiple components of an application, including code, dependencies, and services in isolated, consistent environments.

You can [pull the starter project from GitHub here (<VPIcon icon="iconfont icon-github"/>`Oghenekparobo/docker_tut_js`)](https://github.com/Oghenekparobo/docker_tut_js).

Or clone it directly using your terminal:

```sh
git clone https://github.com/Oghenekparobo/docker_tut_js.git
cd docker_tut_js
```

This contains the basic HTML and JavaScript files along with the Node.js backend.

Next, we will prepare to set up our database. Head over to [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/) and type **“mongo”** in the search box. You will see the official MongoDB image published by Docker.

![official mongo db database in dockerhub](https://cdn.hashnode.com/res/hashnode/image/upload/v1762950041097/89f54e21-f607-488a-8d98-d688733270c4.png)

### How to Pull the MongoDB Image

Now that you have explored the official MongoDB image on Docker Hub, let’s actually pull it into your local environment.

Open your terminal, navigate to your project directory (for example, `docker_tut_js`), and run:

```sh
docker pull mongo
#
# Using default tag: latest
# latest: Pulling from library/mongo
# b8a35db46e38: Already exists 
# a637dbfff7e5: Pull complete 
# 0c9047ace63c: Pull complete 
# 02cd4cf70021: Pull complete 
# dfb5d357a025: Pull complete 
# 007bf0024f67: Pull complete 
# 67fd8af3998d: Pull complete 
# d702312e8109: Pull complete 
# Digest: sha256:7d1a1a613b41523172dc2b1b02c706bc56cee64144ccd6205b1b38703c85bf61
# Status: Downloaded newer image for mongo:latest
# docker.io/library/mongo:latest
```

This command tells Docker to download the latest version of the MongoDB image from Docker Hub.

::: info Here’s what’s happening:

- **“Using default tag: latest”**: Docker pulls the most recent version of MongoDB since no specific version was provided.
- **“Pulling from library/mongo”**: It’s downloading from Docker’s official image library.
- **“Pull complete”**: Each line represents a layer of the image being successfully downloaded.
- **“Downloaded newer image for mongo:latest”**: Confirms that the MongoDB image is now stored locally on your system.

:::

You can confirm that it’s available by running:

```sh
docker images
```

You should see **mongo** listed in the repository column.

![mongo db listed in the repository column after running docker images](https://cdn.hashnode.com/res/hashnode/image/upload/v1762950246712/343d4d23-9c61-4480-956c-a5c2cd391889.png)

### How to Pull the Mongo Express Image

Now that the MongoDB image is ready, let’s pull the **Mongo Express** image.

Mongo Express is a lightweight web-based interface that lets you view and manage your MongoDB collections through a browser, similar to how phpMyAdmin works for MySQL.

Open your terminal (still in your project directory) and run:

```sh
docker pull mongo-express
# 
# Using default tag: latest
# latest: Pulling from library/mongo-express
# b8a35db46e38: Already exists
# a637dbfff7e5: Pull complete
# 4e0e0977e9c3: Pull complete
# 02cd4cf70021: Pull complete
# Digest: sha256:3d6dbac587ad91d0e2eab83f09a5b31a1c8f9d91a8825ddaa6c7453c25cb4812
# Status: Downloaded newer image for mongo-express:latest
# docker.io/library/mongo-express:latest
```

::: info Here’s what this means:

- `docker pull mongo-express` downloads the official Mongo Express image from Docker Hub.
- Each **“Pull complete”** line represents a successfully downloaded layer of the image.
- `mongo-express:latest` confirms that the latest version is now stored locally.

:::

To verify that both images are available, run:

```sh
docker images
```

You should see mongo and mongo-express listed in the output.

![docker images command showing both mongo db database and mongo express images verifying they have been installed by docker on your project](https://cdn.hashnode.com/res/hashnode/image/upload/v1762951088081/06345eb1-80c9-4fcd-8585-5ff309ed2779.png)

Now that both images are downloaded, the next step is to run the containers to make sure MongoDB is up and accessible, and then connect it to Mongo Express so we can manage it through the browser.

Before we do that, let’s briefly look at how these two containers will communicate.

### Docker Network

When MongoDB and Mongo Express run in separate containers, they need a way to talk to each other. Docker handles this using something called a **Docker Network,** a virtual bridge that lets containers communicate securely without exposing internal ports to the outside world.

When you run containers in Docker, it automatically creates an isolated network for them. Think of it like a private space where your containers can talk to each other safely without exposing everything to the outside world.

For example, if our MongoDB container and Mongo Express container are on the same Docker network, they can communicate just by using their container names (like `mongo` or `mongo-express`). You don’t need to use `localhost` or port numbers, as Docker handles that part internally.

But anything outside the Docker network (like your host machine or a Node.js app) connects through the exposed ports.

So later, when we package our entire application, the Node.js backend, MongoDB, Mongo Express, and even the frontend (`index.html`) into Docker, all these containers will interact smoothly through the Docker network. The browser on your computer will then connect to your Node.js app using the host address and port we have exposed.

By default, Docker already provides a few built-in networks. You can see them by running:

```sh
docker network ls
#
# 712a7144f1a0   bridge    bridge    local
# 4ae27eedea5b   host      host      local
# 4806000201ce   none      null      local
```

These are automatically created by Docker. You don’t need to worry too much about them right now – we will just focus on creating our own custom network.

For our setup, we will create a separate network that both MongoDB and Mongo Express can share. Let’s call it mongo-network:

```sh
docker network create mongo-network
```

![mongo-network created with docker network create mongo-network then to see it in the list run docker network ls](https://cdn.hashnode.com/res/hashnode/image/upload/v1762953968310/bdf51a4e-1986-48a4-922b-6f312ff99414.png)

---

## How to Run the Mongo Container

To make sure our MongoDB and Mongo Express containers can communicate, we need to run them inside the same Docker network. That’s why we created mongo-network earlier.

Let’s start with MongoDB. Remember, the `docker run` command is used to start a container from an image. In this case, we will run the official MongoDB image and attach it to our network.

We will also expose the default MongoDB port 27017 so it’s accessible from outside the container, and set up environment variables for the root username and password.

Here is the command:

```sh
docker run -p 27017:27017 -d \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongo \
--network mongo-network \
mongo
```

::: info Here’s what each part does:

- `-p 27017:27017` maps the container’s MongoDB port to your host machine.
- `-d` runs the container in detached mode (in the background).
- `-e` sets environment variables for the database’s root credentials.
- `--name mongo` gives the container a custom name for easier reference.
- `--network mongo-network` connects the container to the network we created.

:::

Once it runs successfully, your MongoDB instance will be up and running inside the Docker network, ready for other containers like Mongo Express to connect to it.

After creating your MongoDB container, you can easily check if it’s running and healthy.

First, run `docker ps` to see all active containers. You should see your MongoDB container (`mongo`) listed with its port `27017` exposed. To get more details about what’s happening inside the container, you can check its logs using `docker logs mongo` or, if you prefer, by using the container ID (for example: `docker logs 7abb38175ae28`). The logs will show startup messages from MongoDB, and you should look for lines indicating that the database started successfully and is ready to accept connections.

This is a quick way to verify that everything is working correctly before connecting other services, like Mongo Express, to it.

```sh
docker ps
```

This will list all **running containers**. You should see your MongoDB container (`mongo`) with its port `27017` exposed.

```sh
docker logs mongo
# or 
docker logs 7abb38175ae283429354609866c8d97521f37b535c475ae448295f8fc0ed947f
```

This will show startup messages. Look for lines indicating MongoDB started successfully and is ready to accept connections.

![checking if the mongo container is running](https://cdn.hashnode.com/res/hashnode/image/upload/v1762956236708/44dbe331-b736-4526-8dae-019150b618d8.png)

---

## How to Run the Mongo Express Container

Now that MongoDB is up and running, we can run Mongo Express, which is a web-based interface to manage and view your MongoDB databases. We will connect it to the same network (`mongo-network`) so it can communicate with MongoDB.

Here’s the command:

```sh
docker run -d \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongo \
--name mongo-express \
--network mongo-network \
-p 8081:8081 \
mongo-express
```

::: info Here’s what each part does:

- `-d` runs the container in detached mode (in the background).
- `-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin` sets the MongoDB admin username for Mongo Express to use.
- `-e ME_CONFIG_MONGODB_ADMINPASSWORD=password` sets the corresponding MongoDB password.
- `-e ME_CONFIG_MONGODB_SERVER=mongo` tells Mongo Express which MongoDB server to connect to. Here we use the container name `mongo` because both containers are on the same network.
- `--name mongo-express` gives the container a friendly name for easier reference.
- `--network mongo-network` connects the container to the same Docker network as MongoDB so they can talk to each other.
- `-p 8081:8081` exposes the Mongo Express web interface on port `8081` of your host machine.
- `mongo-express` the name of the Docker image we’re running.

:::

Once the container is running, you can open your browser and visit `http://localhost:8081` to access Mongo Express and interact with your MongoDB instance.

For more details about the available environment variables and options, you can check the official Docker Hub page for Mongo Express [here (<VPIcon icon="fa-brands fa-docker"/>`mongo-express`)](https://hub.docker.com/_/mongo-express).

Before opening your browser at `http://localhost:8081`, it’s a good idea to check if the Mongo Express container is running properly. You can do this by viewing its logs:

```sh
docker logs <container-id>
# or
docker logs mongo-express
#
# Waiting for mongo:27017...
# No custom config.js found, loading config.default.js
# Welcome to mongo-express 1.0.2
# ------------------------
# Mongo Express server listening at http://0.0.0.0:8081
# Server is open to allow connections from anyone (0.0.0.0)
# basicAuth credentials are "admin:pass", it is recommended you change this in your config.js!
```

This confirms that Mongo Express is up and running and ready to connect to your MongoDB instance.

Take note of the basicAuth credentials shown in the logs (admin:pass). If these credentials are present, you’ll need to use them when accessing Mongo Express from your browser. Later, you can change them in a custom config.js file for better security.

Once everything looks good in the logs, you can safely visit `http://localhost:8081` to access the Mongo Express interface.

![mongo-express interface from `http://localhost:8081`](https://cdn.hashnode.com/res/hashnode/image/upload/v1762957766334/f64b1f06-87a8-4ffb-b905-47e1871cca64.png)

If your browser asks for a username and password when accessing Mongo Express, use the basicAuth credentials shown in the container logs:

```plaintext title="output"
Username: admin
Password: pass
```

These are the default credentials, and it’s **strongly recommended** to change them later in a custom <VPIcon icon="fa-brands fa-js"/>`config.js` file for better security.

When you open Mongo Express, you will notice some default databases already created. For this project, we will create a new database called todos. Once it’s created, your Node.js application can connect to this database to store and retrieve data.

---

## How to Connect Node.js to MongoDB

You already have MongoDB running inside a Docker container (mongo). The container exposes the default MongoDB port 27017 to the host, so any process on your laptop/desktop can reach it via `localhost:27017`.

::: important

The Node.js app is **outside Docker** (it’s just a regular node server.js process you start from your terminal).

:::

Because the app is external, we **must use `localhost`** (or 127.0.0.1) as the host name – **not** the container name mongo.

Once we later containerise the Node.js app and put it on the same Docker network, we’ll switch the host to mongo. For now, keep it `localhost`.

### Node.js Backend

Here’s a version of our <VPIcon icon="fa-brands fa-js"/>`server.js` using MongoDB:

```js :collapsed-lines title="server.js"
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

// Host = localhost  →  talks to the MongoDB container via the exposed port
// Port = 27017      →  default MongoDB port
// User / Pass       →  admin / password (the credentials you gave the container)
const mongoUrl = "mongodb://admin:password@localhost:27017";
const dbName = "todos";
let db;

MongoClient.connect(mongoUrl)
  .then((client) => {
    db = client.db(dbName);
    console.log("Connected to MongoDB →", dbName);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "photo-" + unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(express.static(__dirname));
app.use("/uploads", express.static(uploadDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todos", async (req, res) => {
  const todos = await db.collection("todos").find().toArray();
  res.json(todos);
});

app.post("/todos", upload.single("photo"), async (req, res) => {
  const text = req.body.text?.trim();
  if (!text) return res.status(400).json({ error: "Text required" });

  const todo = {
    text,
    image: req.file ? `/uploads/${req.file.filename}` : null,
    createdAt: new Date(),
  };

  const result = await db.collection("todos").insertOne(todo);
  todo._id = result.insertedId;
  res.json(todo);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server → http://localhost:${PORT}`);
});
```

### **Frontend**

`index.html`:

```xml
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo + Image</title>
    <style>
      body {
        font-family: sans-serif;
        margin: 2rem;
        max-width: 800px;
      }
      .todo {
        border: 1px solid #ccc;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
      }
      .todo img {
        max-height: 150px;
        margin-top: 0.5rem;
      }
      .error {
        color: red;
      }
      input[type="text"] {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
      }
      #preview {
        max-width: 300px;
        margin-top: 0.5rem;
        display: none;
      }
    </style>
  </head>
  <body>
    <h1>Todo List with Images</h1>

    <div id="addForm">
      <input type="text" id="textInput" placeholder="What needs to be done?" />
      <input type="file" id="imageInput" accept="image/*" />
      <img id="preview" alt="preview" />
      <button id="addBtn">Add Todo</button>
      <p id="status"></p>
    </div>

    <h2>Todos</h2>
    <div id="todos"></div>

    <script>
      const $ = document.querySelector.bind(document);

      const textInput = $("#textInput");
      const imageInput = $("#imageInput");
      const preview = $("#preview");
      const addBtn = $("#addBtn");
      const status = $("#status");
      const todosDiv = $("#todos");

      imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (!file) {
          preview.style.display = "none";
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.src = e.target.result;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      });

      addBtn.addEventListener("click", async () => {
        const text = textInput.value.trim();
        if (!text) {
          status.textContent = "Please enter a todo text.";
          status.className = "error";
          return;
        }

        const form = new FormData();
        form.append("text", text);
        if (imageInput.files[0]) form.append("photo", imageInput.files[0]);

        try {
          const res = await fetch("/todos", { method: "POST", body: form });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "failed");
          status.textContent = "Todo added!";
          status.className = "";
          textInput.value = "";
          imageInput.value = "";
          preview.style.display = "none";
          loadTodos(); // refresh list
        } catch (err) {
          status.textContent = "Error: " + err.message;
          status.className = "error";
        }
      });

      async function loadTodos() {
        const res = await fetch("/todos");
        const todos = await res.json();
        todosDiv.innerHTML = "";
        todos.forEach((t) => {
          const div = document.createElement("div");
          div.className = "todo";
          div.innerHTML = `<strong>${escapeHtml(t.text)}</strong>`;
          if (t.image) {
            div.innerHTML += `<br><img src="${t.image}" alt="todo image">`;
          }
          todosDiv.appendChild(div);
        });
      }

      function escapeHtml(s) {
        const div = document.createElement("div");
        div.textContent = s;
        return div.innerHTML;
      }

      loadTodos();
    </script>
  </body>
</html>
```

Now your Node.js app can connect to the MongoDB container running in Docker. Since the app is running outside Docker for now, it connects through `localhost:27017` using the credentials you set (`admin` / `password`).

Once connected, your Node.js backend stores and retrieves todos directly from the `todos` database in MongoDB, replacing the in-memory array. Later, if you containerize the Node.js app and put it on the same Docker network as MongoDB, you can switch the host from `localhost` to the container name `mongo`. we are getting there

You can get the full backend and frontend code ready to run and tweak it for your setup here: [GitHub repo (<VPIcon icon="iconfont icon-github"/>`Oghenekparobo/docker_tut_js`)](https://github.com/Oghenekparobo/docker_tut_js/tree/mongodb-connection).

---

## How to Use Docker Compose

So we now have our Node.js app connected to MongoDB and Mongo Express, both running inside containers. We’ve created the network, started the containers, and everything is talking to each other perfectly.

But let’s be honest: typing out all those long `docker run` commands every time can get tedious. You probably want a simpler, cleaner way to spin everything up with just one command. That’s where **Docker Compose** comes in.

Docker Compose is a tool that lets you define and run multi-container applications with a single command. Instead of manually running multiple `docker run` commands, you describe your setup in a simple <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file, specifying each service (like your Node.js app, MongoDB, and Mongo Express), their configurations, environment variables, and shared networks.

Basically, it lets you manage multiple containers as one project, easy to start, stop, and maintain with a single file and a single command.

The standard naming convention is <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` (or <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yaml`. Both work, but `.yml` is more common).

Docker automatically detects it when you run:

```sh
docker compose up
```

So yeah, stick with <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` for convention.

Now, to run the containers for MongoDB and Mongo Express, we can use the following two commands, respectively:

```sh
# MongoDB container
docker run -p 27017:27017 -d \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongo \
--network mongo-network \
mongo

# Mongo Express container
docker run -d \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongo \
--name mongo-express \
--network mongo-network \
-p 8081:8081 \
mongo-express
```

Now, instead of typing these long commands every time, we will combine them and run everything at once using a **Docker Compose file**.

The <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file will be located at the root of our Node.js project.

![<VPIcon icon="iconfont icon-yaml"/>`docker-composer.yml` file in the root of the project](https://cdn.hashnode.com/res/hashnode/image/upload/v1763032152636/7fc026ba-d593-4097-a34c-945b398f2aeb.png)

Here’s how our <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file looks:

```yaml title="docker-compose.yml"
version: "3.8"

services:
  mongodb:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  mongo-express:
    image: mongo-express
    container_name: mongo-express
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: password
      ME_CONFIG_MONGODB_SERVER: mongodb
    depends_on:
      - mongodb
```

::: info Let’s break down what’s going on here:

- `version: "3.8"`: This defines the **Compose file version**. Each version has slightly different syntax rules and features. Version 3.8 is modern and works with the latest Docker Engine.
- `services:`: All the containers we want to run are defined here. In our case, two services: `mongodb` and `mongo-express`.

**MongoDB service:**

- `image: mongo` pulls the official MongoDB image from Docker Hub.
- `container_name: mongo` gives the container a friendly name.
- `ports: "27017:27017"` exposes MongoDB’s default port to our host, so Node.js or other apps can connect.
- `environment:` sets up the root username and password for MongoDB.

**Mongo Express service:**

- `image: mongo-express` is the official Mongo Express image.
- `container_name: mongo-express` is a friendly name for easier reference.
- `ports: "8081:8081"` exposes Mongo Express web interface on host port 8081.
- `environment:` let’s Mongo Express know how to connect to MongoDB (username, password, host).
- `depends_on: - mongodb` ensures MongoDB starts first, so Mongo Express can connect immediately.

:::

### Why Use Docker Compose?

- **Single command**: Instead of running multiple long `docker run` commands, just run:

```sh
docker compose up -d
```

- **Automatic networking**: Compose creates a default network so services can communicate using their **service names** (`mongodb` In our case)
- **Easier maintenance**: You can stop, start, or rebuild all services with simple commands.

Before we run our new <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`, it’s important to make sure no conflicting containers are running. Remember, we already had MongoDB and Mongo Express running from the previous `docker run` commands.

To avoid conflicts (like ports already in use), we should stop and remove any running containers first.

Here’s how:

```sh
# List all running containers
docker ps

# Stop a specific container (replace <container_name> with mongo or mongo-express)
docker stop mongo
docker stop mongo-express

# Remove the stopped containers
docker rm mongo
docker rm mongo-express

# Optional: stop and remove all running containers at once
docker stop $(docker ps -q)
docker rm $(docker ps -a -q)
```

- `docker ps` shows currently running containers.
- `docker stop <name>` stops a container gracefully.
- `docker rm <name>` removes the container from Docker.
- `docker stop $(docker ps -q)` stops all running containers.
- `docker rm $(docker ps -a -q)` removes all containers (running or stopped).

Once all previous containers are stopped and removed, we’re ready to run our Docker Compose setup safely without conflicts.

Now that all previous containers are stopped, we can start MongoDB and Mongo Express together using our <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file.

From the root of your Node.js project (where the <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file is located), run:

```sh
docker compose up -d
```

Here’s what this does:

- `docker compose` tells Docker to use Compose.
- `up` builds (if needed) and starts all the services defined in the Compose file.
- `-d` runs the containers in **detached mode**, meaning they run in the background.

After running this command, Docker will start both MongoDB and Mongo Express, connect them on the same internal network, and expose the ports we defined (`27017` for MongoDB and `8081` for Mongo Express).

If everything worked correctly, after running:

```sh
docker compose up -d
# 
# [+] Running 3/3
#  ✔ Network docker_tut_default  Created                                                                                               0.0s 
#  ✔ Container mongo             Started                                                                                               0.6s 
#  ✔ Container mongo-express     Started                                                                                               0.8s 
# stephenjohnson@Oghenekparobo docker_tut %
```

What this means:

- `Network docker_tut_default Created`: Docker Compose automatically creates a network for your services so they can communicate with each other.
- `Container mongo Started`: Your MongoDB container is running.
- `Container mongo-express Started`: Your Mongo Express container is running.

You can confirm that the containers are running by using:

```sh
docker ps
```

This will list all active containers. You should see both `mongo` and `mongo-express` with their respective ports (`27017` for MongoDB and `8081` for Mongo Express) exposed.

- To access Mongo Express, open your browser and go to `http://localhost:8081` to interact with MongoDB through the web interface.
- To access MongoDB, your Node.js app can connect to MongoDB at `localhost:27017` using the credentials you set in the Compose file.

Compared to running long `docker run` commands for each container, using Docker Compose is easier because:

- Starts multiple containers with one command.
- Automatically sets up networking between containers.
- Makes it easier to stop, remove, or rebuild containers later.

In short, Docker Compose simplifies and organizes everything, making it much easier to manage your development environment.

![docker compose up -d succesfuly created the containers and docker ps shows the containers](https://cdn.hashnode.com/res/hashnode/image/upload/v1763034021801/c4f806d2-080f-4b52-9f36-7b2044a7f8c5.png)

At this stage, it’s important to know that any data you add to MongoDB is temporary. If you stop or remove your containers and then start them again, you will notice that all your data is gone. This happens because data inside a container isn’t persistent by default.

Don’t worry, this is expected, and we’ll cover how to make data persistent later in the tutorial when we introduce **Docker volumes**. For now, just be aware that each time you restart your containers, MongoDB starts fresh with no previous data.

You can get a full sample, including the Dockerfile **and** the docker‑compose file, [here (<VPIcon icon="iconfont icon-github"/>`Oghenekparobo/docker_tut_js`)](https://github.com/Oghenekparobo/docker_tut_js/tree/docker-compose).

---

## How to Build Our Own Docker Image

Now that we have tested our Node.js application locally and seen it working perfectly with MongoDB and Mongo Express, the next step is preparing it for deployment.

Running the app directly on our machine works fine for development, but it’s not practical when we want to move it to another environment or server. By creating a Docker image, we can package the application together with all its dependencies, configuration, and environment setup into a single, portable unit. This image can then run anywhere Docker is installed, ensuring our app works the same way across development, testing, and production.

In short, building a Docker image is how we containerize our app and make it deployment-ready.

In order to containerize our Todo app, we need a <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`. A <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` is essentially a blueprint that tells Docker how to build an image for our application. It defines the base environment, copies our application code, installs dependencies, and specifies how the app should start. With this blueprint, Docker can create a consistent image that behaves the same way on any machine, making our Node.js app fully portable and ready for deployment.

In our <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, notice the capital `D`, which is the standard naming convention. Place this file in the **root directory** of your Node.js project. In simple projects like ours, our main app file (like <VPIcon icon="fa-brands fa-js"/>`server.js` or <VPIcon icon="fa-brands fa-js"/>`index.js`) is usually in the root too, along with `package.json`. Docker will use this file as a blueprint to build a container image of your application.

If your main app file is inside a subfolder, that’s fine too. Just make sure the Dockerfile’s `COPY` and `CMD` commands point to the correct location. The important thing is that the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` lives in the root so Docker knows where to start building your app.

Here’s how the contents of our <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` look:

```dockerfile title="Dockerfile"
# Use full Node 18 (Debian-based)
FROM node:18

# Set environment variables
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=password

# Set working directory
WORKDIR /home/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
```

::: info Let’s see what’s going on here:

- `FROM node:13-alpine` is the base image for our container. It comes with Node.js installed and is very lightweight, keeping the image small.
- `ENV MONGO_DB_USERNAME=admin \ MONGO_DB_PASSWORD=password` sets environment variables inside the container so the Node.js app can connect to MongoDB.
- `WORKDIR /home/app` sets the working directory inside the container. All subsequent commands like `COPY` or `RUN` will run relative to this folder.
- `COPY . .` copies all files from your local project into the container’s working directory. This includes your <VPIcon icon="fa-brands fa-js"/>`server.js`, `package.json`, and any other files needed to run the app.
- `RUN npm install` installs all the Node.js dependencies listed in `package.json` inside the container.
- `EXPOSE 3000` tells Docker that the container will listen on port 3000, which is the port our Node.js app runs on.
- `CMD ["node", "server.js"]` defines the command that runs when the container starts, which launches our Node.js server.

:::

By placing this <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` in the root of your project, Docker knows exactly where to find your app’s files and dependencies. When we build the image, it packages everything inside a portable container that can run anywhere Docker is installed, making deployment straightforward and consistent.

![<VPIcon icon="fa-brands fa-docker"/>`Dockerfile` VS CODE Illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1763037649231/a831ccc0-5b84-4e70-82bf-08ef7de85ddf.png)

Now that we have our <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` ready, the next step is to build the Docker image for our Node.js app.

To build the image, open your terminal, make sure you are in the root directory of your project (where the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` is), and run:

```sh
docker build -t todo-app:1.0 .
```

- `todo-app` is the name of your image.
- `:1.0` is the version tag (you can use any versioning scheme, like `1.0`, `v1`, `latest`, etc.).
- `.` tells Docker to use the current folder (root of your project) as the build context.

After running:

```sh
docker build -t todo-app:1.0 .
```

Docker reads your Dockerfile, packages your Node.js app with all its dependencies, and creates a Docker image. You can confirm the image exists by running:

```sh
docker images
#
# REPOSITORY      TAG       IMAGE ID       CREATED          SIZE
# todo-app        1.0       d85dd4ed97f9   45 seconds ago   147MB
# mongo           latest    1d659cebf5e9   2 weeks ago      894MB
# mongo-express   latest    1133e12468c7   20 months ago    182MB
```

This shows that your `todo-app` image has been created successfully, alongside the images for MongoDB and Mongo Express.

### Running Your Node.js App Container

Now that the image exists, the next step is to run a container from it. A container is basically a running instance of your image. To do this:

```sh
docker run todo-app:1.0
```

Here’s what this command does:

- `docker run` starts a new container from the image.
- `todo-app:1.0` tells Docker which image to use (the one we just built).

Once this runs, your Node.js app will be live inside a container, separate from your local environment. You can open your browser at[`http://localhost:3000` and see your Todo app working just like it did locally.

To see all running containers, use:

```sh
docker ps
#
# CONTAINER ID   IMAGE           COMMAND         CREATED       STATUS       PORTS                  NAMES
# d85dd4ed97f9   todo-app:1.0    "node server.js"  10s ago      Up 10s       0.0.0.0:3000->3000/tcp   awesome_todo
```

This confirms your container is running. If you ever need to stop it:

```sh
docker stop <container-id>
```

### Troubleshooting Errors

We started facing some issues here: when you run `docker run todo-app:1.0` You'll see an error like this:

```plaintext title="output"
Server → http://localhost:3000 
MongoDB connection error: MongoServerSelectionError: getaddrinfo ENOTFOUND mongodb
    at Topology.selectServer (/home/app/node_modules/mongodb/lib/sdam/topology.js:346:38)
    ...
    [cause
```

especially when you try to perform an operation like creating a todo list.

The error `getaddrinfo ENOTFOUND mongodb` tells us that your Node.js container can't find MongoDB. Even though MongoDB is running in another container, your app container is isolated and doesn't know how to reach it.

#### Why This Happens

Remember in our <VPIcon icon="fa-brands fa-js"/>`server.js`, we connect to MongoDB using:

```js
const mongoUrl = "mongodb://admin:password@localhost:27017";
```

The problem is with `localhost`. When you run your app locally on your machine (not in Docker), `localhost` works perfectly because MongoDB is running on the same machine. But when your app runs inside a Docker container, `localhost` refers to the container itself, not your host machine or other containers.

Think of it like this:

- **Running locally:** Your app and MongoDB are like two people in the same room, `localhost` works
- **Running in Docker:** Each container is like a separate room, `localhost` only refers to that specific room

### The Solution

We need to change the MongoDB connection URL to use the Docker service name instead of `localhost`. Update your <VPIcon icon="fa-brands fa-js"/>`server.js` file:

```js title="server.js"
const mongoUrl = "mongodb://admin:password@localhost:27017";
```

To this:

```js title="server.js"
const mongoUrl = "mongodb://admin:password@mongodb:27017";
```

Here's the complete updated <VPIcon icon="fa-brands fa-js"/>`server.js`:

```js :collapsed-lines title="server.js"
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

// Host = localhost  →  talks to the MongoDB container via the exposed port
// Port = 27017      →  default MongoDB port
// User / Pass       →  admin / password (the credentials you gave the container)
const mongoUrl = "mongodb://admin:password@mongodb:27017";
const dbName = "todos";
let db;

MongoClient.connect(mongoUrl)
  .then((client) => {
    db = client.db(dbName);
    console.log("Connected to MongoDB →", dbName);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "photo-" + unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(express.static(__dirname));
app.use("/uploads", express.static(uploadDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todos", async (req, res) => {
  const todos = await db.collection("todos").find().toArray();
  res.json(todos);
});

app.post("/todos", upload.single("photo"), async (req, res) => {
  const text = req.body.text?.trim();
  if (!text) return res.status(400).json({ error: "Text required" });

  const todo = {
    text,
    image: req.file ? `/uploads/${req.file.filename}` : null,
    createdAt: new Date(),
  };

  const result = await db.collection("todos").insertOne(todo);
  todo._id = result.insertedId;
  res.json(todo);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server → http://localhost:${PORT}`);
});
```

### Why `mongodb` Works

The hostname `mongodb` matches the service name we defined in our <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`:

```yaml
services:
  mongodb:    # ← This is the hostname other containers use
    image: mongo
    container_name: mongo
    ...
```

When containers run in the same Docker Compose network, Docker provides an internal DNS that resolves service names to the correct container IP addresses. So when your app tries to connect to `mongodb:27017`, Docker automatically routes it to the MongoDB container.

### Rebuild Your Docker Image

Now that we have updated the code, we need to rebuild the Docker image to include this change:

````sh
docker build -t todo-app:1.0 .
#
# [+] Building 8.1s (10/10) FINISHED
#  => [internal] load build definition from Dockerfile
#  => => transferring dockerfile: 443B
#  ...
#  => => naming to docker.io/library/todo-app:1.0
````

### Add Your App to Docker Compose

Now update your <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file to include the `todo-app` service:

```yaml title="docker-compose.yml"
version: "3.8"

services:
  mongodb:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  mongo-express:
    image: mongo-express
    container_name: mongo-express
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: password
      ME_CONFIG_MONGODB_SERVER: mongodb
    depends_on:
      - mongodb

  todo-app:
    image: todo-app:1.0
    container_name: todo-app
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
```

::: info The `todo-app` service includes:

- **image: todo-app:1.0** that uses the Docker image we just rebuilt
- **container_name: todo-app** that gives the container a friendly name
- **ports: "3000:3000"** that exposes the app on port 3000
- **depends_on: mongodb** that ensures MongoDB starts before the app

:::

### Start All Services

First, stop any running containers:

```sh
docker compose down
```

**If you have port 3000 running in your local system, then stop it (that is, free up port 3000).**

We were running the server locally before, but now that we’ve built a Docker image, the app runs inside a container, so it’s no longer dependent on the local machine’s environment.

```sh
node server.js
# 
# Server → http://localhost:3000
```

Now stop it with Ctrl + C in that terminal. That’s it.

Then start everything together:

```sh
docker compose up -d
# 
# [+] Running 4/4
#  ✔ Network docker_tut_default  Created
#  ✔ Container mongo             Started
#  ✔ Container mongo-express     Started
#  ✔ Container todo-app          Started
```

### Verify Everything Works

Check that all containers are running:

```sh
docker ps
#
# CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS          PORTS                      NAMES
# a1b2c3d4e5f6   todo-app:1.0    "node server.js"         30 seconds ago   Up 28 seconds   0.0.0.0:3000->3000/tcp     todo-app
# 3d7c797fde1d   mongo-express   "/sbin/tini -- /dock…"   30 seconds ago   Up 29 seconds   0.0.0.0:8081->8081/tcp     mongo-express
# 4511ade73c38   mongo           "docker-entrypoint.s…"   30 seconds ago   Up 29 seconds   0.0.0.0:27017->27017/tcp   mongo
```

---

## Test Your Application

Now let's verify everything works:

### 1. Access Your Todo App

Open your browser and go to:

```plaintext
http://localhost:3000
```

### 2. Create Some Todos

Add a few todo items to test the functionality. Try uploading images too!

### 3. Verify in Mongo Express

Open Mongo Express:

```plaintext
http://localhost:8081
```

Navigate to the `todos` database, then the `todos` collection. You should see all the todos you just created with their complete data.

### What Changed and Why It Works

#### Before the fix

- Connection string used `localhost:27017` ❌
- Container looked for MongoDB on itself
- Connection failed with `ENOTFOUND` error

#### After the fix

- Connection string uses `mongodb:27017` ✅
- Docker's internal DNS resolves `mongodb` to the MongoDB container
- Connection succeeds and data flows properly

This is a crucial lesson in Docker networking: containers communicate using service names, not `localhost`. Docker Compose automatically creates a network where all services can find each other by name.

### How to Manage Your Containers

Here’s a quick overview of how to manage your containers once you have them up and running. You’ll typically use these common commands:

```sh
# Stop all services
docker compose down

# View logs from your app
docker compose logs todo-app

# View logs in real-time
docker compose logs -f todo-app

# Rebuild after code changes
docker build -t todo-app:1.0 .
docker compose up -d --force-recreate todo-app
```

Your application is now fully containerized and production-ready. All three services work together seamlessly, and you can deploy this entire stack anywhere Docker is supported with just the <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file and your built image.

Get the full updated code [here (<VPIcon icon="iconfont icon-github"/>`Oghenekparobo/docker_tut_js`)](https://github.com/Oghenekparobo/docker_tut_js/tree/docker-image).

---

## How to Create a Private Docker Repository

Now we want to store our custom Docker image in a private container registry (instead of our local machine only). This gives you three major advantages:

1. **Controlled access** – Only people or servers you explicitly authorize can pull (or push) the image. Your code and dependencies stay private and secure.
2. **Reliable distribution** – Anyone (or any server) with the correct AWS credentials can pull the exact same image from anywhere in the world, eliminating “it works on my machine” problems.
3. **Versioning and lifecycle management** – You can keep multiple tagged versions (1.0, 2.0, latest, and so on) and easily roll back if needed.

The first step is to create a private Docker repository, also known as a container registry. In this case, we will use [<VPIcon icon="fa-brands fa-aws"/>AWS Elastic Container Registry (ECR)](https://aws.amazon.com/ecr/). Amazon ECR is a fully managed container registry that makes it easy to store, manage, share, and deploy your container images and artifacts securely from anywhere.

![Amazon ECR Landing page](https://cdn.hashnode.com/res/hashnode/image/upload/v1763044840247/bbfb5cfa-aa22-4a4f-a5e4-da91cd539063.png)

Once you’re on the home page, just click on the **Create** button. Name the repository the same as your image, todo-app, and then click Create to finalize the setup.

![creating our repository on AWS ECR](https://cdn.hashnode.com/res/hashnode/image/upload/v1763045060132/b2f8b287-026c-47f6-bd44-9fbad62da0f5.png)

Don’t worry about the extra options – this isn’t an AWS tutorial.

::: note

In AWS ECR, each image has its own repository, where we store the different tagged versions of that image.

![AWS ECR our todo-app empty repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1763045250855/477e4566-8f47-41f8-93e6-4c3bcb28668f.png)

:::

Now, to push our image into the private repository, we need to do two things. First, we have to log in to the private repo. This is necessary because you’ll need authenticate yourself before AWS allows you to push anything. In other words, when you push your local image to the repo, you’re basically saying, *“Yes, I have access to this registry. Here are my credentials.”*

In our case, since we’re using AWS ECR, we will authenticate through AWS instead of typing our username and password manually.

### Step 1: Get Your AWS Access Keys

To locate your access keys in the AWS console, follow these steps:

1. Log in to the AWS Console at [<VPIcon icon="fa-brands fa-aws"/>`console.aws.amazon.com`](https://console.aws.amazon.com)
2. Click your account name (top right corner) and go to Security Credentials
3. Scroll down to "Access keys" section
4. If you don't have an access key:
    - Click "Create access key"
    - Select "Command Line Interface (CLI)"
    - Check the confirmation box and click Next
    - Add a description (optional) and click "Create access key"

::: important

Copy both the **access key ID** (looks like: `AKIAIOSFODNN7EXAMPLE`) and the **secret access key** (looks like: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`). **Save these immediately.** The secret key is only shown once. If you lose it, you'll need to create a new key pair.

:::

Alternatively, if someone else manages your AWS account, you’ll need to ask your AWS administrator for:

- An IAM user with ECR permissions
- The Access Key ID and Secret Access Key for that user

### Step 2: Check if AWS CLI is installed

You can do this by running this:

```sh
aws --version
```

### Step 3: Configure AWS CLI with your credentials

Here’s how you can do this:

```sh
aws configure
# 
# AWS Access Key ID [None]: <paste your Access Key ID here>
# AWS Secret Access Key [None]: <paste your Secret Access Key here>
# Default region name [None]: eu-north-1 or any region of your choice
# Default output format [None]: json
```

Just paste your keys when prompted, type `eu-north-1` or any region of your choice for region, and `json` for format (or just press Enter for format).

### Step 4: Test your AWS configuration

Now you’ll want to test your config to make sure everything is set up properly:

```sh
aws sts get-caller-identity
```

This should show your AWS account details if everything is configured correctly.

### Step 5: Login to ECR (Docker Registry)

Now, login to ECR:

```sh
aws ecr get-login-password --region eu-north-1 | \
docker login --username AWS --password-stdin 244836489456.dkr.ecr.eu-north-1.amazonaws.com
```

You should see: **"Login Succeeded"**.

### Understanding Image Naming in Docker Repositories

Every Docker image has a name that tells Docker where to find or store it. For example, when you run:

```sh
docker pull mongo:4.2
```

Docker is actually pulling from: `docker.io/library/mongo:4.2`

::: info Here’s what’s happening:

- `docker.io` is the registry (in this case, Docker Hub)
- `library` is the default namespace for official images
- `mongo` is the repository name
- `4.2` is the image tag

:::

If you build a local image like `todo-app:1.0`, that image exists only on your machine. Docker won’t know where to push it unless you include the full registry path.

For AWS ECR, the image name must include your ECR registry URL. For example:

```sh
docker tag todo-app:1.0 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
```

Then you can push it with:

```sh
docker push 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
```

Without that full path, Docker won’t know *which* remote repository you’re referring to. That’s why just `todo-app:1.0` alone won’t work.

### Step 6: Build, Tag, and Push your image

![`aws push` commands for the ecr todo-app repo ](https://cdn.hashnode.com/res/hashnode/image/upload/v1763050402411/f4afd0ed-bc2a-4bf2-9bc4-4d373a54bab4.png)

```sh
# Tag your local image with the full ECR path
docker tag todo-app:1.0 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0

# Now push it
docker push 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
```

::: warning

Be careful when tagging and pushing your image, as every ECR repository URL is tied to a specific AWS account and region.

:::

For example, in this tutorial, we’re using:

```plaintext
244836489456.dkr.ecr.eu-north-1.amazonaws.com
```

But your own ECR URL will be different depending on your AWS account and the region you selected (like `us-east-1`, `ap-south-1`, and so on).

So before you run your `docker tag` or `docker push` commands, make sure to replace the registry URL and region with your own.

If you don’t, Docker will throw errors like *“tag does not exist”* or *“repository not found.”*

In short, stay calm, double-check your region, and always confirm the exact ECR URL shown in your AWS console before pushing.

If you successfully ran Step 6, you should see output similar to this in your terminal:

```sh
docker tag todo-app:1.0 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
docker push 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
# 
# The push refers to repository [244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app]
# 4f94b5cbe8ab: Pushed 
# 85ba7bf54231: Pushed 
# 4ea46a43fa07: Pushed 
# dee30873f229: Pushed 
# e78159dbd370: Pushed 
# a358a725b813: Pushed 
# cd8a6003174c: Pushed 
# abb63e49e652: Pushed 
# 6cc65bdde70e: Pushed 
# 41a4e3939504: Pushed 
# 3520c50ae60e: Pushed 
# 75ba6634710f: Pushed 
# 1.0: digest: sha256:51f07267936fc94d9b677db8a760801e6c5fd4764f4bb2bd7b4dd150c756a39b size: 2842
```

This confirms your image was successfully pushed to your private AWS ECR repository.

You can now go to the AWS Management Console and then ECR, and you should see your `todo-app` image listed there, along with the tag `1.0`.

At this point, your image is safely stored in AWS ECR and ready to be pulled or deployed anywhere that has access to your repository.

![your image now deployed on AWS ECR](https://cdn.hashnode.com/res/hashnode/image/upload/v1763066904897/fe44a2e2-1e20-4ff5-88ec-799475b2fe0d.png)

---

## Assignment: Create and Push a New Version of Your App

Now that your first image (`todo-app:1.0`) has been successfully pushed to AWS ECR, it’s time to simulate a real-world workflow where developers make updates and release new versions of their applications.

Now, you’ll make a small change to your Node.js app, rebuild it, and push the updated version as `todo-app:2.0`.

### Deploying Our Image

Now it’s time to deploy our image using Docker Compose.

Up to this point, we have been running our app using a local image:

```yaml title="docker-compose.yaml"
image: todo-app:1.0
```

But now that your image lives inside AWS ECR, we need to replace that line with the full ECR image URI, because Docker must know exactly where to pull the image from.

Local image:

```yaml title="docker-compose.yaml"
image: todo-app:1.0
```

Private repository image (ECR):

```yaml title="docker-compose.yaml"
image: 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
```

Docker cannot magically guess where “todo-app:1.0” is stored. If you don’t include the full registry URL, Docker will assume it’s looking at your **local machine**, not AWS.

Here is the clean, fixed, properly formatted docker-compose file that pulls your app from ECR:

```yaml title="docker-compose.yaml"
version: "3.8"

services:
  my-app:
    image: 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
    container_name: my-app
    ports:
      - "3000:3000"
    depends_on:
      - mongodb

  mongodb:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  mongo-express:
    image: mongo-express
    container_name: mongo-express
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: password
      ME_CONFIG_MONGODB_SERVER: mongodb
    depends_on:
      - mongodb
```

::: important Why “my-app” instead of “todo-app”?

In this case, we renamed it to avoid confusion between:

- our **local** “todo-app:1.0”
- our **ECR** “todo-app:1.0”

This keeps things clean, but you can rename it back if you want.

:::

### Why Must We Use the Full Image URL for ECR?

Other containers like mongo and mongo-express work like this:

```yaml title="docker-compose.yaml"
image: mongo
image: mongo-express
```

Because Docker knows these are on **Docker Hub**.

But for a private repo like AWS ECR, Docker has no idea where “todo-app” is unless you give the full path:

```plaintext
AWS_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/repository_name:tag
```

This tells Docker:

- which account
- which region
- which repo
- which version

Without this URL, Docker can’t pull the image.

Every time we want to *pull* from a private ECR repo, including using Docker Compose, we must be logged in.

Run this:

```sh
aws ecr get-login-password --region eu-north-1 | \
docker login --username AWS --password-stdin 244836489456.dkr.ecr.eu-north-1.amazonaws.com
```

If you’re not logged in, Docker Compose will throw:

```plaintext
❌ pull access denied
❌ repository does not exist
❌ no basic auth credentials
```

### Deploy Your App Using Docker Compose

Before deploying, it’s best practice to stop and remove any existing containers to avoid port conflicts or orphaned containers:

```sh
# Stop all running containers in this project
docker-compose down --remove-orphans

# Optional: verify nothing is running
docker ps
```

This ensures that port 3000 and other mapped ports are free, preventing errors when starting new containers.

Once the environment is clean, deploy your stack:

```sh
docker-compose up -d
```

Docker Compose will:

1. **Connect to AWS ECR** – Authenticate and pull the `todo-app:1.0` image from your private repository.
2. **Start MongoDB** – Launch the database container with your configured credentials.
3. **Start Mongo Express** – Launch the web-based MongoDB admin interface.
4. **Start your Node.js app** – Launch the `my-app` container, linked to MongoDB.

Check the running containers:

```sh
docker ps
```

You should see:

- `mongo`
- `mongo-express`
- `my-app`

If `my-app` fails to start, it’s usually because **port 3000 is already in use**. Ensure it’s free by stopping any process using it:

```sh
lsof -i :3000
kill -9 <PID>  # if a process is using it
```

Then rerun:

```sh
docker-compose up -d
```

To access your app:

- Node.js app: `http://localhost:3000`
- Mongo Express: `http://localhost:8081`

This workflow ensures a clean start and avoids common port or container conflicts.

### Sharing our Private Docker Image

Once your Node.js app is pushed to AWS ECR, it’s safely stored in your private repository. But what if another developer, team member, or server needs to run that same image? Since it’s private, Docker cannot pull it automatically like public images (e.g., `mongo` or `nginx`). They need **authenticated access**.

Here’s how they can get and use your image:

#### 1. Grant IAM Access

Your collaborator needs an **AWS IAM user or role** with permissions for ECR. At minimum, the policy should allow:

- `ecr:GetAuthorizationToken`
- `ecr:BatchCheckLayerAvailability`
- `ecr:GetDownloadUrlForLayer`
- `ecr:BatchGetImage`

You can create a dedicated IAM user for this and provide them an Access Key ID and a Secret Access Key.

#### 2. Install and Configure AWS CLI

The collaborator must have the AWS CLI installed. Then they configure it with their credentials:

```sh
aws configure
```

They enter:

- Access Key ID
- Secret Access Key
- Default region (the same region where the ECR repo exists, for example, `eu-north-1`)
- Default output format (usually `json`)

#### 3. Authenticate Docker with ECR

Before pulling the image, Docker must authenticate using the AWS credentials:

```sh
aws ecr get-login-password --region eu-north-1 | \
docker login --username AWS --password-stdin 244836489456.dkr.ecr.eu-north-1.amazonaws.com
```

If successful, Docker will respond with:

```plaintext
Login Succeeded
```

#### 4. Pull the Image

Now the collaborator can pull the image using the full ECR URI, which includes your AWS account, region, repository name, and tag:

```sh
docker pull 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
```

#### 5. Run the Container

After pulling, they can run the container locally:

```sh
docker run -p 3000:3000 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
```

Or include it in a Docker Compose file, replacing the `image:` field with the full ECR URI.

- Public images like `mongo` don’t require this because Docker Hub is open. Private ECR images require explicit authentication.
- Every pull from a private repository requires an active login**.** Docker cannot guess credentials.
- Using the full image URI ensures Docker knows exactly where to fetch the image.

This setup allows your team to share, deploy, or run your application anywhere, on local machines, staging servers, or production, while keeping your repository private and secure.

---

## Docker Volumes

When running containers like MongoDB, all data created inside a container is ephemeral. If the container stops or is removed, all data inside it disappears. This is fine for testing, but not suitable for production.

To solve this, Docker provides **volumes**, which allow containers to store data outside the container, either on the host machine or in Docker-managed storage, so it survives container restarts, rebuilds, or removals.

### How Docker Volumes Work

Think of Docker volumes as persistent folders for containers:

- Data written inside a volume remains safe, even if the container is removed.
- Containers can read/write to these volumes.
- Volumes are essential for databases, logs, file uploads, or any persistent data your application needs.

### Types of Docker Volumes

Docker has three main types of volumes:

#### 1. Named Volumes

Named volumes are user-defined volumes with a clear name, that are fully managed by Docker. You’d typically use them in production databases and for persistent data that containers can share.

Here’s an example:

```yaml
volumes:
  mongo-data:
```

And in a service:

```yaml
volumes:
  - mongo-data:/data/db
```

#### 2. Bind Mounts

Blind mounts map a folder from your **host machine** into the container. They’re often used for development, live syncing files, logs, and uploaded files.

Here’s an example:

```yaml
volumes:
  - ./uploads:/usr/src/app/uploads
```

#### 3. Anonymous Volumes

These are volumes without a name. Docker just assigns them a random name. You’d use them for temporary data for testing (and they’re not commonly used in production).

Here’s an example:

```yaml
volumes:
  - /data/tmp
```

### Example Docker Compose File Using Volumes

Here’s a full <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file using the most common volume types for a Node.js + MongoDB + Mongo Express stack:

```yaml title="docker-compose.yaml"
version: "3.8"

services:
  my-app:
    image: 244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0
    container_name: my-app
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
    volumes:
      - ./uploads:/usr/src/app/uploads  # bind mount for file uploads

  mongodb:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongo-data:/data/db  # named volume for persistent database storage

  mongo-express:
    image: mongo-express
    container_name: mongo-express
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: password
      ME_CONFIG_MONGODB_SERVER: mongodb
    depends_on:
      - mongodb

volumes:
  mongo-data:  # named volume definition
```

::: info How this code is working:

1. **MongoDB Volume** (`mongo-data`): This is a named volume. It stores all database files under <VPIcon icon="fas fa-folder-open"/>`/data/db` inside the container. It survives container restarts, removals, or rebuilds.
2. **Node.js Uploads (**`./uploads`): This is a **bind mount**. It maps the <VPIcon icon="fas fa-folder-open"/>`uploads` folder on your host to <VPIcon icon="fas fa-folder-open"/>`/usr/src/app/uploads` inside the container. Any uploaded files are immediately visible on your host.
3. **Anonymous Volume**: These are not shown in this file because it’s rarely used in production. Temporary data storage is created automatically by Docker if a volume is defined without a name.

:::

::: info Visual Concept (Simplified)

```sh title="file structure"
Host Machine
├─ /project/uploads  ← bind mount, synced with container
├─ Docker Volumes
│  └─ mongo-data    ← named volume, persistent MongoDB data

Containers
├─ my-app
│  └─ /usr/src/app/uploads  ← sees host uploads folder
├─ mongodb
│  └─ /data/db             ← uses named volume mongo-data
├─ mongo-express
```

:::

::: important Takeaways

- Always use volumes for data you care about.
- Named volumes are best for databases in production.
- Bind mounts are best for development and live syncing.
- Anonymous volumes are rarely needed outside testing.
- Volumes separate container lifecycle from data lifecycle, which is a cornerstone of Docker best practices.

:::

### Start Your Application

Once your Docker Compose is configured with volumes, the next step is to start your application and make sure the volumes are working correctly. Here’s a simple step-by-step guide.

#### 1. Start the Containers

Run:

```sh
docker-compose up -d
```

The `-d` flag runs the containers in detached mode (in the background).

Docker will:

- Pull your app image from AWS ECR (if you’re logged in)
- Start MongoDB with the named volume
- Start Mongo Express
- Start your Node.js app

#### 2. Check Running Containers

To see if everything started correctly:

```sh
docker ps
# 
# CONTAINER ID   IMAGE                                               STATUS          PORTS
# 2a2e120cc912   244836489456.dkr.ecr.eu-north-1.amazonaws.com/todo-app:1.0   Up 5s    0.0.0.0:3000->3000/tcp
# f4d5a1ab1234   mongo                                               Up 5s          0.0.0.0:27017->27017/tcp
# c3d5b2bc2345   mongo-express                                      Up 5s          0.0.0.0:8081->8081/tcp
```

#### 3. Verify Volumes

List Docker volumes:

```sh
docker volume ls
```

You should see your named volume, for example `mongo-data`.

Inspect the volume:

```sh
docker volume inspect docker_tut_mongo-data
```

This will show where Docker stores your MongoDB data on the host, for example:

```json
[
  {
    "Name": "mongo-data",
    "Driver": "local",
    "Mountpoint": "/var/lib/docker/volumes/mongo-data/_data",
    "Labels": {},
    "Scope": "local"
  }
]
```

::: note

Anything stored in <VPIcon icon="fas fa-folder-open"/>`/data/db` inside MongoDB is actually saved here on your host.

:::

#### 4. Test Data Persistence

::: tabs

@tab 1.

Connect to MongoDB or your app and add some data.

@tab 2.

Stop and remove the container:

```sh
docker-compose down
```

@tab 3. 

Restart the app:

```sh
docker-compose up -d
```

@tab 4.

Check your data again.

- Because MongoDB uses the named volume, your data is still there.
- This proves the volume is persistent.

@tab 5.

Optional: Check Node.js Uploads (Bind Mount)

- If you uploaded a file through your app, check your project folder `./uploads`.
- You should see the file appear on your host machine because bind mounts sync host and container directories.

:::

---

## Conclusion

Well done, you have made it to the end of this comprehensive Docker tutorial. From unraveling the basics of containers and images, to networking, Docker Compose, volumes, and even deploying to a private AWS ECR repository, you've built a fully containerized Node.js application stack that's production-ready and scalable. These are hands-on skills that will transform how you develop, collaborate, and deploy applications in real-world scenarios.

Thank you for sticking with it. Docker can feel overwhelming at first – those long commands, networking quirks, and persistent data challenges aren't trivial. But getting to this point? It means you've conquered a steep learning curve and reached new heights in your development journey. You're now equipped to eliminate "it works on my machine" headaches, streamline CI/CD pipelines, and level up as a backend or full-stack pro.

Keep experimenting: Tweak your todo-app, try multi-stage builds in your Dockerfile, or explore orchestration tools like Kubernetes next. The Docker ecosystem is vast, but with this foundation, you're ready to dive deeper. If you hit snags or have questions, the community on Docker Hub, Stack Overflow, or GitHub.

::: info

You can find the final code here

<SiteInfo
  name="Oghenekparobo/docker_tut_js at final"
  desc="Contribute to Oghenekparobo/docker_tut_js development by creating an account on GitHub."
  url="https://github.com/Oghenekparobo/docker_tut_js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/572ed9240453812ed6d39639a012a6b4a45fb8535c91ff856df7501bddd128d0/Oghenekparobo/docker_tut_js"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use to Docker with Node.js: A Handbook for Developers",
  "desc": "In this handbook, you’ll learn what Docker is, why it’s become an essential, must-have skill for backend and full-stack developers in 2025, and most importantly, how to use it in real-world projects from start to finish. We will go far beyond the usu...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-to-docker-with-nodejs-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
