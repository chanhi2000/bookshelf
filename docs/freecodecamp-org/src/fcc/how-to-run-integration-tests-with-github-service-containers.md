---
lang: en-US
title: "How to Run Integration Tests with GitHub Service Containers"
description: "Article(s) > How to Run Integration Tests with GitHub Service Containers"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - CI/CD
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - github-actions
  - ci
  - cd
  - ci-cd
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run Integration Tests with GitHub Service Containers"
    - property: og:description
      content: "How to Run Integration Tests with GitHub Service Containers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-run-integration-tests-with-github-service-containers.html
prev: /devops/github/articles/README.md
date: 2025-01-08
isOriginal: false
author:
  - name: Alex Pliutau
    url : https://freecodecamp.org/news/author/pltvs/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1735305764768/8e3d8980-456b-4828-abb7-dff749bbf1fd.png
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

[[toc]]

---

<SiteInfo
  name="How to Run Integration Tests with GitHub Service Containers"
  desc="Recently, I published an article about using Testcontainers to emulate external dependencies like a database and cache for backend integration tests. That article also explained the different ways of running the integration tests, environment scaffol..."
  url="https://freecodecamp.org/news/how-to-run-integration-tests-with-github-service-containers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1735305764768/8e3d8980-456b-4828-abb7-dff749bbf1fd.png"/>

Recently, I published an [**article**](/freecodecamp.org/integration-tests-using-testcontainers.md) about using [<VPIcon icon="fas fa-globe"/>Testcontainers](https://testcontainers.com/) to emulate external dependencies like a database and cache for backend integration tests. That article also explained the different ways of running the integration tests, environment scaffolding, and their pros and cons.

In this article, I want to show another alternative in case you use GitHub Actions as your CI platform (the most popular CI/CD solution at the moment). This alternative is called [<VPIcon icon="iconfont icon-github"/>Service Containers](https://docs.github.com/en/actions/use-cases-and-examples/using-containerized-services/about-service-containers), and I’ve realized that not many developers seem to know about it.

In this hands-on tutorial, I’ll demonstrate how to create a GitHub Actions workflow for integration tests with external dependencies (MongoDB and Redis) using the [demo Go application (<VPIcon icon="iconfont icon-github"/>`plutov/packagemain`)](https://github.com/plutov/packagemain/tree/master/testcontainers-demo) we created in that previous tutorial. We’ll also review the pros and cons of GitHub Service Containers.

::: note Prerequisites

- A basic understanding of GitHub Actions workflows.
- Familiarity with Docker containers.
- Basic knowledge of Go toolchain.

:::

---

## What are Service Containers?

Service Containers are Docker containers that offer a simple and portable way to host dependencies like databases (MongoDB in our example), web services, or caching systems (Redis in our example) that your application needs within a workflow.

This article focuses on integration tests, but there are many other possible applications for service containers. For example, you can also use them to run supporting tools required by your workflow, such as code analysis tools, linters, or security scanners.

---

## Why Not Docker Compose?

Sounds similar to **services** in Docker Compose, right? Well, that’s because it is.

But while you could technically [<VPIcon icon="iconfont icon-github"/>use Docker Compose](https://github.com/marketplace/actions/docker-compose-action) within a GitHub Actions workflow by installing Docker Compose and running **docker-compose up**, service containers provide a more integrated and streamlined approach that’s specifically designed for the GitHub Actions environment.

Also, while they are similar, they solve different problems and have different general purposes:

- Docker Compose is good when you need to manage a multi-container application on your local machine or a single server. It’s best suited for long-living environments.
- Service Containers are ephemeral and exist only for the duration of a workflow run, and they’re defined directly within your GitHub Actions workflow file.

Just keep in mind that the feature set of service containers (at least as of now) is more limited compared to Docker Compose, so be ready to discover some potential bottlenecks. We will cover some of them at the end of this article.

---

## Job Runtime

You can run GitHub jobs directly on a runner machine or in a Docker container (by specifying the **container** property). The second option simplifies the access to your services by using labels you define in the **services** section.

To run directly on a runner machine:

```yaml :collaspsed-lines title=".github/workflows/test.yaml"
jobs:
  integration-tests:
    runs-on: ubuntu-24.04

    services:
      mongo:
        image: mongodb/mongodb-community-server:7.0-ubi8
        ports:
          - 27017:27017

    steps:
      - run: |
          echo "addr 127.0.0.1:27017"
```

Or you can run it in a container ([<VPIcon icon="fas fa-globe"/>Chainguard Go Image](https://images.chainguard.dev/directory/image/go/overview) in our case):

```yaml :collaspsed-lines title=".github/workflows/test.yaml"
jobs:
  integration-tests:
    runs-on: ubuntu-24.04
    container: cgr.dev/chainguard/go:latest

    services:
      mongo:
        image: mongodb/mongodb-community-server:7.0-ubi8
        ports:
          - 27017:27017
    steps:
      - run: |
          echo "addr mongo:27017"
```

You can also omit the host port, so the container port will be randomly assigned to a free port on the host. You can then access the port using the variable.

Benefits of omitting the host port:

- Avoids port conflicts - for example when you run many services on the same host.
- Enhances Portability - your configurations become less dependent on the specific host environment.

```yaml :collaspsed-lines title=".github/workflows/test.yaml"
jobs:
  integration-tests:
    runs-on: ubuntu-24.04
    container: cgr.dev/chainguard/go:1.23

    services:
      mongo:
        image: mongodb/mongodb-community-server:7.0-ubi8
        ports:
          - 27017/tcp
    steps:
      - run: |
          echo "addr mongo:${{ job.services.mongo.ports['27017'] }}"
```

Of course, there are pros and cons to each approach.

Running in a container:

- **Pros**: Simplified network access (use labels as hostnames), and automatic port exposure within the container network. You also get better isolation/security as the job runs in an isolated environment.
- **Cons**: Implied overhead of containerization.

Running on the runner machine:

- **Pros**: Potentially less overhead than running the job inside a container.
- **Cons**: Requires manual port mapping for service container access (using localhost:). There’s also less isolation/security, as the job runs directly on the runner machine. This potentially affects other jobs or the runner itself if something goes wrong.

---

## Readiness Healthcheck

Prior to running the integration tests that connect to your provisioned containers, you’ll often need to make sure that the services are ready. You can do this by specifying [<VPIcon icon="fa-brands fa-docker"/>docker create options](https://docs.docker.com/reference/cli/docker/container/create/#options) such as **health-cmd**.

This is very important - otherwise the services may not be ready when you start accessing them.

In the case of MongoDB and Redis, these will be the following:

```yaml :collaspsed-lines title=".github/workflows/test.yaml"
    services:
      mongo:
        image: mongodb/mongodb-community-server:7.0-ubi8
        ports:
          - 27017/27017
        options: >-
          --health-cmd "echo 'db.runCommand("ping").ok' | mongosh mongodb://localhost:27017/test --quiet"
          --health-interval 5s
          --health-timeout 10s
          --health-retries 10

      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 5s
          --health-timeout 10s
          --health-retries 10
```

In the Action logs, you can see the readiness status:

![GitHub Actions Logs](https://cdn.hashnode.com/res/hashnode/image/upload/v1736245987630/0b0bf229-b8d3-4e4e-8e0b-e3bbe5f9a6d8.png)

---

## Private Container Registries

In our example, we’re using public images from Dockerhub, but it’s possible to use private images from you private registries as well, such as Amazon Elastic Container Registry (ECR), Google Artifact Registry, and so on.

Make sure to store the credentials in [<VPIcon icon="iconfont icon-github"/>Secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) and then reference them in the **credentials** section.

```yaml :collaspsed-lines title=".github/workflows/test.yaml"
  private_service:
    image: ghcr.io/org/service_repo
    credentials:
      username: ${{ secrets.registry_username }}
      password: ${{ secrets.registry_token }}
```

---

## Sharing Data Between Services

You can use volumes to share data between services or other steps in a job. You can specify named Docker volumes, anonymous Docker volumes, or bind mounts on the host. But it’s not directly possible to mount the source code as a container volume. You can refer to this [<VPIcon icon="iconfont icon-github"/>open discussion](https://github.com/orgs/community/discussions/42127) for more context.

To specify a volume, you specify the source and destination path: `<source>:<destinationPath>`

The `<source>` is a volume name or an absolute path on the host machine, and `<destinationPath>` is an absolute path in the container.

```yaml
volumes:
  - /src/dir:/dst/dir
```

Volumes in Docker (and GitHub Actions using Docker) provide persistent data storage and sharing between containers or job steps, decoupling data from container images.

---

## Project Setup

Before diving into the full source code, let's set up our project for running integration tests with GitHub Service Containers.

1. Create a new GitHub repository.
2. Initialize a Go module using `go mod init`
3. Create a simple Go application.
4. Add integration tests in <VPIcon icon="fa-brands fa-golang"/>`integration_test.go`
5. Create a <VPIcon icon="fas fa-folder-open"/>`.github/workflows` directory.
6. Create a file named <VPIcon icon="iconfont icon-yaml"/>`integration-tests.yaml` inside the <VPIcon icon="fas fa-folder-open"/>`.github/workflows` directory.

---

## Golang Integration Tests

Now as we can provision our external dependencies, let’s have a look at how to run our integration tests in Go. We will do it in the **steps** section of our workflow file.

We will run our tests in a container which uses [<VPIcon icon="fas fa-globe"/>Chainguard Go image](https://images.chainguard.dev/directory/image/go/overview). This means we don’t have to install/setup Go. If you want to run your tests directly on a runner machine, you need to use the [setup-go](https://github.com/actions/setup-go) Action.

You can find the full source code with tests and this workflow [here (<VPIcon icon="iconfont icon-github"/>`plutov/service-containers`)](https://github.com/plutov/service-containers).

```yaml :collapsed-lines title=".github/workflows/integration-tests.yaml"
name: "integration-tests"

on:
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  integration-tests:
    runs-on: ubuntu-24.04
    container: cgr.dev/chainguard/go:latest

    env:
      MONGO_URI: mongodb://mongo:27017
      REDIS_URI: redis://redis:6379

    services:
      mongo:
        image: mongodb/mongodb-community-server:7.0-ubi8
        ports:
          - 27017:27017
        options: >-
          --health-cmd "echo 'db.runCommand("ping").ok' | mongosh mongodb://localhost:27017/test --quiet"
          --health-interval 5s
          --health-timeout 10s
          --health-retries 10

      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 5s
          --health-timeout 10s
          --health-retries 10

    steps:
      - name: Check out repository code
        uses: actions/checkout@v4

      - name: Download dependencies
        run: go mod download

      - name: Run Integration Tests
        run: go test -tags=integration -timeout=120s -v ./...
```

To summarize what’s going on here:

1. We run our job in a container with Go (**container**)
2. We spin up two services: MongoDB and Redis (**services**)
3. We configure healthchecks to make sure our services are “Healthy” when we run the tests (**options**)
4. We perform a standard code checkout
5. Then we run the Go tests

Once the Action is completed (it took **~1 min** for this example), all the services will be stopped and orphaned so we don’t need to worry about that.

![GitHub Actions Logs: full run](https://miro.medium.com/v2/resize:fit:480/0*QLl4vjotU6o1osy-.png)

---

## Personal Experience & Limitations

We’ve been using service containers for running backend integration tests at [<VPIcon icon="fas fa-globe"/>BINARLY](https://binarly.io/) for some time, and they work great. But the initial workflow creation took some time and we encountered the following bottlenecks:

- It’s not possible to override or run custom commands in an action service container (as you would do in Docker Compose using the **command** property). [<VPIcon icon="iconfont icon-github"/>Open pull request](https://github.com/actions/runner/pull/1152)
  - Workaround: we had to find a solution that doesn’t require that. In our case, we were lucky and could do the same with environment variables.
- It’s not directly possible to mount the source code as a container volume. [<VPIcon icon="iconfont icon-github"/>Open discussion](https://github.com/orgs/community/discussions/42127)
  - While this is indeed a big limitation, you can copy the code from your repository into your mounted directory after the service container has started.

---

## Conclusion

GitHub service containers are a great option to scaffold an ephemeral testing environment by configuring it directly in your GitHub workflow. With configuration being somewhat similar to Docker Compose, it’s easy to run any containerised application and communication with it in your pipeline. This ensures that GitHub runners take care of shutting everything down upon completion.

If you use Github Actions, this approach works extremely well as it is specifically designed for the GitHub Actions environment.

::: info Resources

<SiteInfo
  name="plutov/service-containers"
  desc="Github Service Containers Demo"
  url="https://github.com/plutov/service-containers/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/985fedbaf191dedf7f07de751f72ac477119c0ac1ca33728a19b25b8cc176733/plutov/service-containers"/>

<SiteInfo
  name="Workflow syntax for GitHub Actions - GitHub Docs"
  desc="A workflow is a configurable automated process made up of one or more jobs. You must create a YAML file to define your workflow configuration."
  url="https://docs-internal.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions/"
  logo="/assets/cb-345/images/site/favicon.png"
  preview="https://github.githubassets.com/images/modules/open_graph/github-logo.png"/>

<SiteInfo
  name="packagemain.tech | Alex Pliutau | Substack"
  desc="Welcome to packagemain.tech, your one-stop shop for mastering Backend, Cloud, Kubernetes, Microservices, APIs, and more. We'll provide you with hands-on, practical and real-world tutorials that you can use to build your software development skills. Click to read packagemain.tech, a Substack publication with thousands of subscribers."
  url="https://packagemain.tech/"
  logo="https://substack-post-media.s3.amazonaws.com/public/images/2ea54e25-eaa6-4630-bfc0-10b8cfdce894/favicon-48x48.png"
  preview="https://packagemain.substack.com/twitter/subscribe-card.jpg%3Fv%3D660466976%26version%3D9"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run Integration Tests with GitHub Service Containers",
  "desc": "Recently, I published an article about using Testcontainers to emulate external dependencies like a database and cache for backend integration tests. That article also explained the different ways of running the integration tests, environment scaffol...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-run-integration-tests-with-github-service-containers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
