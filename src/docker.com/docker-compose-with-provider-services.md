---
lang: en-US
title: "Extend Docker Compose with Provider Services"
description: "Article(s) > Extend Docker Compose with Provider Services"
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
      content: "Article(s) > Extend Docker Compose with Provider Services"
    - property: og:description
      content: "Extend Docker Compose with Provider Services"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-compose-with-provider-services.html
prev: /devops/docker/articles/README.md
date: 2025-07-10
isOriginal: false
author:
  - name: Guillaume Lours
    url : https://docker.com/author/glours/
cover: https://docker.com/app/uploads/2025/03/image.png
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
  name="Extend Docker Compose with Provider Services"
  desc="Docker Compose now supports provider services to connect to external systems—no wrappers needed. Build full-stack dev workflows, all in your Compose file."
  url="https://docker.com/blog/docker-compose-with-provider-services"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2025/03/image.png"/>

With the release of Docker Compose v2.36.0, we’re excited to introduce a powerful new feature: **provider services**. This extension point opens up Docker Compose to interact not only with containers but also with any kind of external system, all while keeping the familiar Compose file at the center of the workflow.

In this blog post, we’ll walk through what provider services are, how developers can use them to streamline their workflows, how the provider system works behind the scenes, and how you can build your own provider to extend Compose for your platform needs.

---

## Why Provider Services Are a Game-Changer

Docker Compose has long been a favorite among developers for orchestrating multi-container applications in a simple and declarative way. But as development environments have become more complex, the need to integrate non-container dependencies has become a common challenge. Applications often rely on managed databases, SaaS APIs, cloud-hosted message queues, VPN tunnels, or LLM inference engines — all of which traditionally sit outside the scope of Compose.

Developers have had to resort to shell scripts, Makefiles, or wrapper CLIs to manage these external components, fragmenting the developer experience and making it harder to onboard new contributors or maintain consistent workflows across teams.

**Provider services change that**. By introducing a native extension point into Compose, developers can now define and manage external resources directly in their <VPIcon icon="iconfont icon-yaml"/>`compose.yaml`. Compose delegates their lifecycle to the provider binary, coordinating with it as part of its own service lifecycle.

This makes Docker Compose a more complete solution for full-stack, platform-aware development — from local environments to hybrid or remote setups.

---

## Using a Provider Service in Your Compose File

Provider services are declared like any other Compose service, but instead of specifying an `image`, you specify a `provider` with a `type`, and optionally some `options`. The `type` must correspond to the name of a binary available in your `$PATH` that implements the Compose provider specification.

As an example we will use the [Telepresence provider plugin (<VPIcon icon="iconfont icon-github"/>`glours/compose-telepresence-plugin`)](https://github.com/glours/compose-telepresence-plugin), which routes Kubernetes traffic to a local service for live cloud debugging. This is especially useful for testing how a local service behaves when integrated into a real cluster:

```yaml title="compose.yaml"
local-api:
  build:
    context: ./api
  develop:
    watch:
      - path: ./api
        action: sync
    depends_on:
      - dev—api
  
dev-api:
  provider:
    type: compose-telepresence
    optlons:
      name: api
        port: 5732:api-80
        namespace: avatars
        service: api
```

In this setup, when you run `docker compose up`, Compose will call the `compose-telepresence` plugin binary. The plugin performs the following actions:

### Up Action

- Check if the Telepresence traffic manager is installed in the Kubernetes cluster, and install it if needed.
- Establish an intercept to re-route traffic from the specified Kubernetes service to the local service.

### Down Action

- Remove the previously established intercept.
- Uninstall the Telepresence traffic manager from the cluster.
- Quit the active Telepresence session.

::: note

The structure and content of the `options` field are specific to each provider. It is up to the plugin author to define and document the expected keys and values.

:::
  
If you’re unsure how to properly configure your provider service in your Compose file, the Compose Language Server (LSP) can guide you step by step with inline suggestions and validation.

::: info

You can find more usage examples and supported workflows in the official documentation:

<SiteInfo
  name="Use provider services"
  desc="Learn how to use provider services in Docker Compose to integrate external capabilities into your applications"
  url="https://docs.docker.com/compose/how-tos/provider-services//"
  logo="https://docs.docker.com/favicons/docs@2x.ico"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

:::

---

## How Provider Services Work Behind the Scenes*

Under the hood, when Compose encounters a service using the `provider` key, it looks for an executable in the user’s `$PATH` matching the provider `type` name (e.g. `docker-model cli` plugin or `compose-telepresence`). Compose then spawns the binary and passes the service `options` as flags, allowing the provider to receive all required configuration via command-line arguments.

The binary must respond to JSON-formatted requests on stdin and return structured JSON responses on stdout.

Here’s a diagram illustrating the interaction:

![Communication with Compose](https://docker.com/app/uploads/2025/07/Screenshot-2025-07-09-at-9.51.59 AM.png)
<!-- TODO: mermaid로 변환 -->

Compose send all the necessary information to the provider binary by transforming all the `options` attributes as flags. It also passes the project and the service name. If we look at the `compose-telepresence` provider example, on the `up` command Compose will execute the following command:  

```sh
compose-telepresence compose \
--project-name my-project up \
--name api \
--port 5732:api-80 \
--namespace avatars \
--service api 
dev-api
```

On the other side, providers can also send runtime messages to Compose:  

- `info:` Reports status updates. Displayed in Compose’s logs.
- `error:` Reports an error. Displayed as the failure reason.
- `setenv:` Exposes environment variables to dependent services.
- `debug:` Debug messages displayed only when running Compose with `-verbose`.

This flexible protocol makes it easy to add new types and build rich provider integrations.

Refer to the [official protocol spec (<VPIcon icon="iconfont icon-github"/>`docker/compose`)](https://github.com/docker/compose/blob/main/docs/extension.md) for detailed structure and examples.

---

## Building Your Own Provider Plugin

The real power of provider services lies in their extensibility. You can write your own plugin, in any language, as long as it adheres to the protocol.

A typical provider binary implements logic to handle a `compose` command with `up` and `down` subcommands.

The source code of [<VPIcon icon="iconfont icon-github"/>`glours/compose-telepresence-plugin`](https://github.com/glours/compose-telepresence-plugin) will be a good starting point. This plugin is implemented in Go and wraps the Telepresence CLI to bridge a local dev container with a remote Kubernetes service.

Here’s a snippet from its `up` implementation:

```go :collapsed-lines
// Up orchestrates the telepresence connection and setup
func Up(options P1uginOptions) error {
    if err := checkTelepresenceInstalled(); err != nil {
        return err
    }

    if err := connectToCluster(options); err != nil {
        if str1ngs.Conta1ns(err.Error(), "traffic manager not found") {
            _ = sendlnfo("Traffic manager not found. Installing TeIepresence helm chart... \\n")
            if err := installTelepresenceChart(options); err != nil {
                return err
            }
            // Retry connection after installation
            if err := connectToCluster(options); err != nil {
                return err
            } 
        } else {
            return sendErrorf("failed to connect: %v", err)
        }
    }

    if err := createIntercept(options); err != nil {
        return err
    }
    return nil
}
```

This method is triggered when `docker compose up` is run, and it starts the service by calling the Telepresence CLI based on the received options.

To build your own provider:

1. Read the full [extension protocol spec (<VPIcon icon="iconfont icon-github"/>`docker/compose`)](https://github.com/docker/compose/blob/main/docs/extension.md)
2. Parse all the options as flags to collect the whole configuration needed by the provider
3. Implement the expected JSON response handling over /stdout
4. Don’t forget to add `debug` messages to have as many details as possible during your implementation phase.
5. Compile your binary and place it in your `$PATH`
6. Reference it in your Compose file using `provider.type`

You can build anything from service emulators to remote cloud service starters. Compose will automatically invoke your binary as needed.

---

## What’s Next?

Provider services will continue to evolve, future enhancements will be guided by real-world feedback from users to ensure provider services grow in the most useful and impactful directions.

Looking forward, we envision a future where Compose can serve as a declarative hub for full-stack dev environments, including containers, local tooling, remote services, and AI runtimes.

Whether you’re connecting to a cloud-hosted database, launching a tunnel, or orchestrating machine learning inference, Compose provider services give you a native way to extend your dev environment, no wrappers, no hacks.

Let us know what kind of providers you’d like to build or see added. We can’t wait to see how the community takes this further.

Stay tuned and happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Extend Docker Compose with Provider Services",
  "desc": "Docker Compose now supports provider services to connect to external systems—no wrappers needed. Build full-stack dev workflows, all in your Compose file.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-compose-with-provider-services.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
