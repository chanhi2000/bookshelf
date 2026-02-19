---
lang: en-US
title: "How to deploy on remote Docker hosts with docker-compose"
description: "Article(s) > How to deploy on remote Docker hosts with docker-compose"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to deploy on remote Docker hosts with docker-compose"
    - property: og:description
      content: "How to deploy on remote Docker hosts with docker-compose"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/how-to-deploy-on-remote-docker-hosts-with-docker-compose.html
prev: /devops/docker/articles/README.md
date: 2020-03-02
isOriginal: false
author:
  - name: Anca Iordache
    url: https://docker.com/contributors/anca-iordache/
cover: https://docker.com/app/uploads/2020/02/Compose.png
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
  name="How to deploy on remote Docker hosts with docker-compose"
  desc="The docker-compose tool is pretty popular for running dockerized applications in a local development environment. All we need to do is write a Compose file containing the configuration for the application’s services and have a running Docker engine for deployment. From here, we can get the application running locally in a few seconds with a single `docker-compose up` command."
  url="https://docker.com/blog/how-to-deploy-on-remote-docker-hosts-with-docker-compose"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/02/Compose.png"/>

![Compose](https://docker.com/app/uploads/2020/02/Compose.png)

The [docker-compose (<VPIcon icon="iconfont icon-github"/>`docker/compose`)](https://github.com/docker/compose) tool is pretty popular for running dockerized applications in a local development environment. All we need to do is write a Compose file containing the configuration for the application’s services and have a running Docker engine for deployment. From here, we can get the application running locally in a few seconds with a single  *`docker-compose up`* command.

This was the initial scope but…

As developers look to have the same ease-of-deployment in CI pipelines/production environments as in their development environment, we find today docker-compose being used in different ways and beyond its initial scope. In such cases, the challenge is that docker-compose provided support for running on remote docker engines through the use of the [<VPIcon icon="fa-brands fa-docker"/>`DOCKER_HOST` environment variable](https://docs.docker.com/engine/reference/commandline/cli/#environment-variables) and [<VPIcon icon="fa-brands fa-docker"/>`-H`, `–host` command line option](https://docs.docker.com/compose/reference/overview/). This is not very user friendly and managing deployments of Compose applications across multiple environments becomes a burden.

To address this issue, we rely on [<VPIcon icon="fa-brands fa-docker"/>Docker Contexts](https://docs.docker.com/engine/reference/commandline/context/) to securely deploy Compose applications across different environments and manage them effortlessly from our localhost. The goal of this post is to show how to use contexts to target different environments for deployment and easily switch between them.

We’ll start defining a sample application to use throughout this exercise, then we’ll show how to deploy it on the localhost. Further we’ll have a look at a Docker Context and the information it holds to allow us to safely connect to remote Docker engines. Finally, we will exercise the use of Docker Contexts with docker-compose to deploy on remote engines.

Before proceeding, docker and docker-compose must be installed on the localhost. Docker Engine and Compose are included in [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop](https://docker.com/get-started) for Windows and macOS. For Linux you will need to get [<VPIcon icon="fa-brands fa-docker"/>Docker Engine](https://docs.docker.com/install/) and [docker-compose (<VPIcon icon="iconfont icon-github"/>`docker/compose`)](https://github.com/docker/compose/releases). Make sure you get docker-compose with the context support feature. This is available starting with release [1.26.0-rc2 (<VPIcon icon="iconfont icon-github"/>`docker/compose`)](https://github.com/docker/compose/releases/tag/1.26.0-rc2) of docker-compose.

---

## Sample Compose application

Let’s define a Compose file describing an application consisting of two services: frontend and backend.  The frontend service will run an nginx proxy that will forward the HTTP requests to a simple Go app server.

A sample with all necessary files for this exercise can be downloaded from [here (<VPIcon icon="iconfont icon-github"/>`dockersamples/nginx-gohttp`)](https://github.com/dockersamples/nginx-gohttp) or any other sample from the Compose samples repository can be used instead.

The project structure and the Compose file can be found below:

```sh
tree hello-docker
#
# hello-docker  
# ├── backend  
# │ ├── Dockerfile  
# │ └── main.go  
# ├── docker-compose.yml  
# └── frontend  
# ├── Dockerfile  
# └── nginx.conf
```

```yaml title="docker-compose.yml"
version: "3.6"  
services:  
  frontend:  
    build: frontend     
    ports:  
    - 8080:80  
    depends_on:  
    - backend  
  backend:  
    build: backend
```

---

## Running on localhost

To deploy the application we defined previously, go to the project directory and run docker-compose:

```sh
cd hello-docker/  
docker-compose up -d  
#
# Creating network "hello-docker_default" with the default driver  
# Creating hello-docker_backend_1 ... done  
# Creating hello-docker_frontend_1     ... done
```

Check all containers are running and port 80 of the frontend service container is mapped to port 8080 of the localhost as described in the docker-compose.yml.

```sh
docker ps  
#
# CONTAINER ID  IMAGE                  COMMAND                    CREATED        STATUS         PORTS                   NAMES  
# 07b55d101e74  nginx:latest           "nginx -g 'daemon of..."   6 seconds ago  Up 5 seconds   0.0.0.0:8080->80/tcp    hello-docker_frontend_1  
# 48cdf1b8417c  hello-docker_backend   "/usr/local/bin/back..."   6 seconds ago  Up 5 seconds                           hello-docker_backend_1
```

Query the web service on port 8080 to get the hello message from the go backend.

```sh
curl localhost:8080
# 
#           ##         .  
#     ## ## ##        ==  
# \## ## ## ## ##     ===  
# /”””””””””””””””””\\___/ ===  
# {                       / ===-  
# \\______ O           __/  
#  \\    \\         __/  
#   \\____\\_______/  
# Hello from Docker!
```

---

## Running on a remote host

A remote Docker host is a machine, inside or outside our local network which is running a Docker Engine and has ports exposed for querying the Engine API.

The sample application can be deployed on a remote host in several ways. Assume we have SSH access to a remote docker host with a key-based authentication to avoid a password prompt when deploying the application.

There are three ways to deploy it on the remote host:

### 1. Manual deployment by copying project files, install docker-compose and running it

A common usage of Compose is to copy the project source with the <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`, install docker-compose on the target machine where we want to deploy the compose app and finally run it.

```sh
scp -r hello-docker user@remotehost:/path/to/src  
ssh user@remotehost  
pip install docker-compose  
cd /path/to/src/hello-docker  
docker-compose up -d
```

The disadvantages in this case is that for any change in the application sources or Compose file, we have to copy, connect to the remote host and re-run.

### 2. Using `DOCKER_HOST` environment variable to set up the target engine

Throughout this exercise we use the `DOCKER_HOST` environment variable scenario to target docker hosts, but the same can be achieved by passing the `-H`, `–host` argument to docker-compose.

```sh
cd hello-docker  
DOCKER_HOST=“ssh://user@remotehost” docker-compose up -d
```

This is a better approach than the manual deployment. But it gets quite annoying as it requires to set/export the remote host endpoint on every application change or host change.

### 3. Using docker contexts

```sh
docker context ls
#
# NAME   DESCRIPTION   DOCKER ENDPOINT   KUBERNETES ENDPOINT   ORCHESTRATOR  
# …  
# remote               ssh://user@remotemachine  
cd hello-docker  
docker-compose ‐‐context remote up -d
```

Docker Contexts are an efficient way to automatically switch between different deployment targets. We will discuss contexts in the next section in order to understand how Docker Contexts can be used with compose to ease / speed up deployment.

---

## Docker Contexts

A Docker Context is a mechanism to provide names to Docker API endpoints and store that information for later usage. The Docker Contexts can be easily managed with the Docker CLI as [<VPIcon icon="fa-brands fa-docker"/>shown in the documentation](https://docs.docker.com/engine/context/working-with-contexts/).

### Create and use context to target remote host

To access the remote host in an easier way with the Docker client, we first create a context that will hold the connection path to it.

```sh
docker context create remote ‐‐docker “host=ssh://user@remotemachine”  
#
# remote  
# Successfully created context “remote”  
docker context ls
#
# NAME      DESCRIPTION             DOCKER ENDPOINT    KUBERNETES ENDPOINT      ORCHESTRATOR  
# default * Current DOCKER_HOST…    unix:///var/run/docker.sock                swarm  
# remote                            ssh://user@remotemachine
```

Make sure we have set the key-based authentication for SSH-ing to the remote host. Once this is done, we can list containers on the remote host by passing the context name as an argument.

```sh
docker ‐‐context remote ps
#
# CONTAINER ID    IMAGE   COMMAND   CREATED   STATUS   NAMES
```

We can also set the “remote” context as the default context for our docker commands. This will allow us to run all the docker commands directly on the remote host without passing the context argument on each command.

```sh
docker context use remote
#
# remote  
# Current context is now “remote”  
docker context ls
#
# NAME      DESCRIPTION             DOCKER ENDPOINT    KUBERNETES ENDPOINT    ORCHESTRATOR  
# default   Current DOCKER_HOST …   unix:///var/run/docker.sock               swarm      
# remote *                          ssh://user@remotemachine
```

### docker-compose context usage

The latest release of docker-compose now supports the use of contexts for accessing Docker API endpoints. This means we can run docker-compose and specify the context “remote” to automatically target the remote host. If no context is specified, docker-compose will use the current context just like the Docker CLI.

```sh
docker-compose ‐‐context remote up -d
#
# /tmp/_MEI4HXgSK/paramiko/client.py:837: UserWarning: Unknown ssh-ed25519 host key for 10.0.0.52: b’047f5071513cab8c00d7944ef9d5d1fd’  
# Creating network “hello-docker_default” with the default driver  
# Creating hello-docker_backend_1  … done  
# Creating hello-docker_frontend_1 … done  
docker ‐‐context remote ps
#
# CONTAINER ID   IMAGE                  COMMAND                 CREATED         STATUS          PORTS                  NAMES  
# ddbb380635aa   hello-docker_frontend  “nginx -g ‘daemon of…”  24 seconds ago  Up 23 seconds   0.0.0.0:8080->80/tcp   hello-docker_web_1  
# 872c6a55316f   hello-docker_backend   “/usr/local/bin/back…”  25 seconds ago  Up 24 seconds                          hello-docker_backend_1
```

### Compose deployments across multiple targets

Many developers may have several development/test environments that they need to switch between. Deployment across all these is now effortless with the use of contexts in docker-compose.

We now try to exercise context switching between several Docker engines. For this, we define three targets:

- Localhost running a local Docker engine
- A remote host accessible through ssh
- A Docker-in-Docker container acting as another remote host

The table below shows the mapping a contexts to docker targets:

| **Target Environment** | **Context name** | **API endpoint** |
| ---: | :--- | :--- |
| localhost | default | `unix:///var/run/docker.sock` |
| Remote host | remote | `ssh://user@remotemachine` |
| docker-in-docker | dind | `tcp://127.0.0.1:2375` |

To run a Docker-in-Docker container with the port 2375 mapped to localhost run:

```sh
docker run ‐‐rm -d -p “2375:2375” \
‐‐privileged \
-e “DOCKER_TLS_CERTDIR=” \
‐‐name dind docker:19.03.3-dind  
#
# ed92bc991bade2d41cab08b8c070c70b788d8ecf9dffc89e8c6379187aed9cdc  
docker ps
#
# CONTAINER ID   IMAGE                COMMAND                 CREATED         STATUS         PORTS                                 NAMES  
# ed92bc991bad   docker:19.03.3-dind  “dockerd-entrypoint.…”  17 seconds ago  Up 15 seconds  0.0.0.0:2375->2375/tcp, 2376/tcp      dind
```

Create a new context ‘dind’ to easily target the container:

```sh
docker context create dind ‐‐docker “host=tcp://127.0.0.1:2375” \
‐‐default-stack-orchestrator swarm  
dind  
#
# Successfully created context “dind”
docker context ls
#
# NAME       DESCRIPTION            DOCKER ENDPOINT              KUBERNETES ENDPOINT   ORCHESTRATOR  
# default *  Current DOCKER_HOST …  unix:///var/run/docker.sock                        swarm  
# remote                            ssh://user@devmachine                              swarm
```

We can now target any of the environments to deploy the Compose application from the localhost.

```sh :collapsed-lines
docker context use dind
#
# dind  
# Current context is now “dind”  
docker-compose up -d
#
# Creating network “hello-docker_default” with the default driver  
# Creating hello-docker_backend_1 … done  
# Creating hello-docker_frontend_1 … done  
docker ps
#
# CONTAINER ID   IMAGE                  COMMAND                 CREATED             STATUS          PORTS                  NAMES  
# 951784341a0d   hello-docker_frontend  “nginx -g ‘daemon of…”  34 seconds ago      Up 33 seconds   0.0.0.0:8080->80/tcp   hello-docker_frontend_1  
# 872c6a55316f   hello-docker_backend   “/usr/local/bin/back…”  35 seconds ago      Up 33 seconds                          hello-docker_backend_1  
docker ‐‐context default ps
#
# CONTAINER ID   IMAGE                 COMMAND                    CREATED         STATUS          PORTS                              NAMES
# ed92bc991bad   docker:19.03.3-dind   “dockerd-entrypoint….”   28 minutes ago    Up 28 minutes   0.0.0.0:2375->2375/tcp, 2376/tcp   dind
docker-compose ‐‐context remote up -d
#
# /tmp/_MEIb4sAgX/paramiko/client.py:837: UserWarning: Unknown ssh-ed25519 host key for 10.0.0.52: b’047f5071513cab8c00d7944ef9d5d1fd’
# Creating network “hello-docker_default” with the default driver
# Creating hello-docker_backend_1 … done 
# Creating hello-docker_frontend_1 … done
docker context use default
#
# default  
# Current context is now “default”  
docker-compose up -d
#
# Creating network “hello-docker_default” with the default driver  
# Creating hello-docker_backend_1 … done  
# Creating hello-docker_frontend_1 … done  
docker ps
#
# CONTAINER ID   IMAGE                  COMMAND                 CREATED              STATUS              PORTS                                       NAMES  
# 077b5e5b72e8   hello-docker_frontend  “nginx -g ‘daemon of…”  About a minute ago   Up about a minute   0.0.0.0:8080->80/tcp                        hello-docker_frontend_1  
# fc01878ad14e   hello-docker_backend   “/usr/local/bin/back…”  About a minute ago   Up about a minute                                               hello-docker_backend_1  
# ed92bc991bad   docker:19.03.3-dind    “dockerd-entrypoint….”  34 minutes ago       Up 34 minutes       0.0.0.0:2375->2375/tcp, 2376/tcp            dind  
```

The sample application runs now on all three hosts. Querying the frontend service on each of these hosts as shown below should return the same message:

```sh
curl localhost:8080
docker exec -it dind sh -c “wget -O – localhost:8080”
curl 10.0.0.52:8080
# 
#           ##         .  
#     ## ## ##        ==  
# \## ## ## ## ##     ===  
# /”””””””””””””””””\\___/ ===  
# {                       / ===-  
# \\______ O           __/  
#  \\    \\         __/  
#   \\____\\_______/  
# Hello from Docker!
```

---

## Summary

Deploying to remote hosts with docker-compose has been a common use-case for quite some time.

The Docker Contexts support in docker-compose offers an easy and elegant approach to target different remote hosts. Switching between different environments is now easy to manage and deployment risks across them are reduced. We have shown an example of how to access remote docker hosts via SSH and tcp protocols hoping these cover a large number of use-cases.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to deploy on remote Docker hosts with docker-compose",
  "desc": "The docker-compose tool is pretty popular for running dockerized applications in a local development environment. All we need to do is write a Compose file containing the configuration for the application’s services and have a running Docker engine for deployment. From here, we can get the application running locally in a few seconds with a single `docker-compose up` command.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/how-to-deploy-on-remote-docker-hosts-with-docker-compose.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
