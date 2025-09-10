---
lang: en-US
title: "Intro Guide to Dockerfile file Best Practices"
description: "Article(s) > Intro Guide to Dockerfile file Best Practices"
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
      content: "Article(s) > Intro Guide to Dockerfile file Best Practices"
    - property: og:description
      content: "Intro Guide to Dockerfile file Best Practices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/intro-guide-to-dockerfile-best-practices.html
prev: /devops/docker/articles/README.md
date: 2019-07-03
isOriginal: false
author:
  - name: Tibor Vass
    url : https://docker.com/author/tibor/
cover: https://docker.com/app/uploads/2019/07/ef41db8f-fe5e-4a78-940a-6a929db7929d-1.jpg
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
  name="Intro Guide to Dockerfile file Best Practices"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/intro-guide-to-dockerfile-best-practices"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2019/07/ef41db8f-fe5e-4a78-940a-6a929db7929d-1.jpg"/>

There are over one million [<VPIcon icon="fa-brands fa-docker"/>`Dockerfiles`](https://docs.docker.com/engine/reference/builder/) on GitHub today, but not all <VPIcon icon="fa-brands fa-docker"/>`Dockerfiles` are created equally. Efficiency is critical, and this blog series will cover five areas for Dockerfile best practices to help you write better <VPIcon icon="fa-brands fa-docker"/>`Dockerfiles`: incremental build time, image size, maintainability, security and repeatability. If you’re just beginning with Docker, this first blog post is for you! The next posts in the series will be more advanced.

::: note Important note

the tips below follow the journey of ever-improving <VPIcon icon="fa-brands fa-docker"/>`Dockerfiles` for an example Java project based on Maven. The last Dockerfile is thus the recommended Dockerfile, while all intermediate ones are there only to illustrate specific best practices.

:::

---

## Incremental build time

In a development cycle, when building a Docker image, making code changes, then rebuilding, it is important to leverage caching. Caching helps to avoid running build steps again when they don’t need to.

### Tip #1: Order matters for caching

![](https://docker.com/app/uploads/2019/07/ef41db8f-fe5e-4a78-940a-6a929db7929d-1.jpg)
<!-- TODO: 코드화 -->

However, the order of the build steps (<VPIcon icon="fa-brands fa-docker"/>`Dockerfile` instructions) matters, because when a step’s cache is invalidated by changing files or modifying lines in the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, subsequent steps of their cache will break. Order your steps from least to most frequently changing steps to optimize caching.

### Tip #2: More specific COPY to limit cache busts

![](https://docker.com/app/uploads/2019/07/0c1d0c4e-406c-468c-b6ba-b71ac68b9c84.jpg)
<!-- TODO: 코드화 -->

Only copy what’s needed. If possible, avoid `COPY .` When copying files into your image, make sure you are very specific about what you want to copy. Any changes to the files being copied will break the cache. In the example above, only the pre-built jar application is needed inside the image, so only copy that. That way unrelated file changes will not affect the cache.

### Tip #3: Identify cacheable units such as `apt-get update & install`

![](https://docker.com/app/uploads/2019/07/2322a39e-bd7e-4a2b-9a8f-548a97dbacb4.jpg)
<!-- TODO: 코드화 -->

Each `RUN` instruction can be seen as a cacheable unit of execution. Too many of them can be unnecessary, while chaining all commands into one `RUN` instruction can bust the cache easily, hurting the development cycle. When installing packages from package managers, you always want to update the index and install packages in the same `RUN`: they form together one cacheable unit. Otherwise you risk installing outdated packages.

---

## Reduce Image size

Image size can be important because smaller images equal faster deployments and a smaller attack surface.

### Tip #4: Remove unnecessary dependencies

![](https://docker.com/app/uploads/2019/07/a1b36f64-1a30-45bf-8fcd-4f88437c189e.jpg)
<!-- TODO:코드화 -->

Remove unnecessary dependencies and do not install debugging tools. If needed debugging tools can always be installed later. Certain package managers such as apt, automatically install packages that are recommended by the user-specified package, unnecessarily increasing the footprint. Apt has the `–no-install-recommends` flag which ensures that dependencies that were not actually needed are not installed. If they are needed, add them explicitly.

### Tip #5: Remove package manager cache

![](https://docker.com/app/uploads/2019/07/363961a4-005e-46fc-963b-f7b690be12ef.jpg)
<!-- TODO:코드화 -->

Package managers maintain their own cache which may end up in the image. One way to deal with it is to remove the cache in the same RUN instruction that installed packages. Removing it in another RUN instruction would not reduce the image size.

There are further ways to reduce image size such as multi-stage builds which will be covered at the end of this blog post. The next set of best practices will look at how we can optimize for maintainability, security, and repeatability of the Dockerfile.

---

## Maintainability

### Tip #6: Use official images when possible

![](https://docker.com/app/uploads/2019/07/f336014d-d2aa-4c1b-a2bd-e1d5d6ed0d93.jpg)
<!-- TODO: 코드화 -->

Official images can save a lot of time spent on maintenance because all the installation steps are done and best practices are applied. If you have multiple projects, they can share those layers because they use exactly the same base image.

### Tip #7: Use more specific tags

![](https://docker.com/app/uploads/2019/07/9d991da9-bdb9-4108-8b36-296a5a3772aa.jpg)
<!-- TODO: 코드화 -->

Do not use the latest tag. It has the convenience of always being available for official images on Docker Hub but there can be breaking changes over time. Depending on how far apart in time you rebuild the Dockerfile without cache, you may have failing builds.

Instead, use more specific tags for your base images. In this case, we’re using openjdk. There are a lot more tags available so check out the [Docker Hub documentation (<VPIcon icon="fa-brands fa-docker"/>`openjdk`)](https://hub.docker.com/_/openjdk) for that image which lists all the existing variants.

### Tip #8: Look for minimal flavors

![](https://docker.com/app/uploads/2019/07/6c486200-5198-4457-86c0-b5275e70e699.jpg)
<!-- TODO: 코드화 -->

Some of those tags have minimal flavors which means they are even smaller images. The slim variant is based on a stripped down Debian, while the alpine variant is based on the even smaller Alpine Linux distribution image. A notable difference is that debian still uses GNU libc while alpine uses musl libc which, although much smaller, may in some cases cause compatibility issues. In the case of openjdk, the jre flavor only contains the java runtime, not the sdk; this also drastically reduces the image size.

---

## Reproducibility

So far the Dockerfiles above have assumed that your jar artifact was built on the host. This is not ideal because you lose the benefits of the consistent environment provided by containers. For instance if your Java application depends on specific libraries it may introduce unwelcome inconsistencies depending on which computer the application is built.

### Tip #9: Build from source in a consistent environment

The source code is the source of truth from which you want to build a Docker image. The Dockerfile is simply the blueprint.

![](https://docker.com/app/uploads/2019/07/f393ad07-c25d-4241-a40f-c6168e0ba4dd.jpg)
<!-- TODO: 코드화 -->

You should start by identifying all that’s needed to build your application. Our simple Java application requires Maven and the JDK, so let’s base our Dockerfile off of a specific minimal official maven image from Docker Hub, that includes the JDK. If you needed to install more dependencies, you could do so in a `RUN` step.

The <VPIcon icon="iconfont icon-code"/>`pom.xml` and src folders are copied in as they are needed for the final RUN step that produces the app.jar application with `mvn package`. (The `-e` flag is to show errors and `-B` to run in non-interactive aka “batch” mode).

We solved the inconsistent environment problem, but introduced another one: every time the code is changed, all the dependencies described in <VPIcon icon="iconfont icon-code"/>`pom.xml` are fetched. Hence the next tip.

#### Tip #10: Fetch dependencies in a separate step

![](https://docker.com/app/uploads/2019/07/41ea71ce-11c3-42a3-8d2b-05fe20901745.jpg)
<!-- TODO: 코드화 -->

By again thinking in terms of cacheable units of execution, we can decide that fetching dependencies is a separate cacheable unit that only needs to depend on changes to <VPIcon icon="iconfont icon-code"/>`pom.xml` and not the source code. The RUN step between the two COPY steps tells Maven to only fetch the dependencies.

There is one more problem that got introduced by building in consistent environments: our image is way bigger than before because it includes all the build-time dependencies that are not needed at runtime.
`
#### Tip #11: Use multi-stage builds to remove build dependencies (recommended `Dockerfile`)

![](https://docker.com/app/uploads/2019/07/97ec1992-f0df-4c8f-82a0-e177c230e5c5.jpg)
<!-- TODO: 코드화 -->

Multi-stage builds are recognizable by the multiple FROM statements. Each FROM starts a new stage. They can be named with the AS keyword which we use to name our first stage “builder” to be referenced later. It will include all our build dependencies in a consistent environment.

The second stage is our final stage which will result in the final image. It will include the strict necessary for the runtime, in this case a minimal JRE (Java Runtime) based on Alpine. The intermediary builder stage will be cached but not present in the final image. In order to get build artifacts into our final image, use `COPY --from=STAGE_NAME`. In this case, STAGE_NAME is builder.

![](https://docker.com/app/uploads/2019/07/80c3c350-5f7e-4cf1-ab3e-89df755b3c33.jpg)
<!-- TODO: 코드화 -->

Multi-stage builds is the go-to solution to remove build-time dependencies.

We went from building bloated images inconsistently to building minimal images in a consistent environment while being cache-friendly. In the next blog post, we will dive more into other uses of multi-stage builds.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Intro Guide to Dockerfile file Best Practices",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/intro-guide-to-dockerfile-best-practices.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
