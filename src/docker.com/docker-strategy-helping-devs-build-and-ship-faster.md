---
lang: en-US
title: "Helping You and Your Development Team Build and Ship Faster"
description: "Article(s) > Helping You and Your Development Team Build and Ship Faster"
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
      content: "Article(s) > Helping You and Your Development Team Build and Ship Faster"
    - property: og:description
      content: "Helping You and Your Development Team Build and Ship Faster"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-strategy-helping-devs-build-and-ship-faster.html
prev: /devops/docker/articles/README.md
date: 2020-03-11
isOriginal: false
author:
  - name: Justin Graham
    url: https://docker.com/contributors/justin-graham/
cover: https://docker.com/app/uploads/2020/03/roadmap-screenshot.png
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
  name="Helping You and Your Development Team Build and Ship Faster"
  desc="We heard from you that easily going from code to cloud is a problem, and Scott outlined the complexities. However, what if you are a developer in a small team at a startup, and need something easy, fast, and efficient? Or, if you are a developer who is part of a team in a large organization that uses multiple clouds?"
  url="https://docker.com/blog/docker-strategy-helping-devs-build-and-ship-faster"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/03/roadmap-screenshot.png"/>

I remember the first time one of my co-workers told me about Docker. There is a longer story behind it, but it ended with “it was so easy and saved me so much time.” That compelled me to install Docker and try it for myself. Yup, she was right. Easy, simple, efficient. Sometime later, at a conference, while catching up with some friends who are developers, I asked them “how are things going?” The conversation eventually led to the topic of where things are going in the container space. I asked, “what’s the biggest issue you are having right now?” I expected the response to be something Kubernetes related. I was surprised the answer was “managing all the tech that gets my code deployed and running.”

The above sentiment is echoed by our CEO, Scott Johnston, [**in this post**](/docker.com/helping-devs-simplify-apps-toolchains-and-open-source.md). Millions of you use Docker today ([<VPIcon icon="fa-brands fa-docker"/>check out the Docker Index](https://docker.com/blog/introducing-the-docker-index/) for the latest usage stats), and we are so very thankful for the vibrant Docker Community. We heard from you that easily going from code to cloud is a problem, and Scott outlined the complexities. There are many choices across packaging, inner loop, packaging, registry, CI, security, CD, and public cloud runtimes. Those choices exist at almost every step, and once you make those choices, you have to stitch them together and manage them yourself. Things are a little easier if you are “all-in” on a particular public cloud provider.

However, what if you are a developer in a small team at a startup, and need something easy, fast, and efficient? Or, if you are a developer who is part of a team in a large organization that uses multiple clouds? Not so straightforward.

This is where Docker will be spending our effort to help. Building on the foundational Docker tools, [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop](https://docker.com/products/docker-desktop) and [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://docker.com/products/docker-hub), to help you, the developer, get your work from SCM to public cloud runtime in the easiest, most efficient, and cloud-agnostic way.

How are we going to do this? **By focusing on developer experience through Docker Desktop, partnering with the ecosystem, and making Docker Hub the nexus for all the integrations, configuration, and management of the application components which constitute your apps and microservices.**

First, we will be **expanding on the tooling and experiences in Docker Desktop** to (a) accelerate the onboarding of new developers to development team processes and workflow, (b) help new developers onboard to developing with containers, and (c) provide features that help improve team collaboration and communication.

We believe a key way to help here is providing more features for the Docker CLI and Docker Desktop UI delivered from Docker Hub. We want to help you accomplish as much as possible in your local development environment without having to jump around interfaces. We also want you to be able to access and interact with services upstream (registry, CI, deployment to runtime) without having to leave the CLI. More to come here.  

In addition, we will **expand Docker Hub to help you manage all the application components you generate as part of development and deployment**. Containers, serverless functions, `<insert YAML here>`, and all the lineage and metadata which these components generate. Docker Hub will be more than just a registry.  

Speaking of “more than just a registry”, **we will make Docker Hub the central point for the ecosystem of tools to partner with us in delivering you a great experience**. Docker Hub will provide a range of pipeline options from high abstraction/opinion options, to construct and stitch yourself. We’ve already begun talking with some great partners in the industry and are excited to bring to you what we’ve been thinking here. The overall goal is to provide you solutions here that match your level of maturity or desired level of abstraction, all in a multi-cloud and vendor-neutral way.

Across all of the above, **open source will be at the center**. Compose, Engine, and Notary will continue to be big contributors to our products, especially Docker Desktop. We will continue to build on these projects with the community, and you will see us contributing to other projects as well.

We will deliver all of this through a monthly SaaS subscription model. We want you to be able to consume on your terms.

Finally, we very much want your participation in how we think about helping you deliver the best products to your customers. **Today, for the first time at Docker, we are launching a public roadmap. You** [**can find it here** (<VPIcon icon="iconfont icon-github"/>`docker/docker-roadmap`)](https://github.com/docker/docker-roadmap/projects/1). We invite you to participate by adding new feature ideas in the issues, up-voting other feature ideas you think are great (and down-voting ones you think are not), and helping us with prioritization. We are here for you and want to make sure we are as transparent as possible, while constantly listening to your feedback.

![roadmap screenshot](https://docker.com/app/uploads/2020/03/roadmap-screenshot.png?fit=1110%2C514&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Helping You and Your Development Team Build and Ship Faster",
  "desc": "We heard from you that easily going from code to cloud is a problem, and Scott outlined the complexities. However, what if you are a developer in a small team at a startup, and need something easy, fast, and efficient? Or, if you are a developer who is part of a team in a large organization that uses multiple clouds?",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-strategy-helping-devs-build-and-ship-faster.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
