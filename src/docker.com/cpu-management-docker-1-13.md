---
lang: en-US
title: "CPU Management in Docker 1.13"
description: "Article(s) > CPU Management in Docker 1.13"
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
      content: "Article(s) > CPU Management in Docker 1.13"
    - property: og:description
      content: "CPU Management in Docker 1.13"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/cpu-management-docker-1-13.html
prev: /devops/docker/articles/README.md
date: 2017-01-21
isOriginal: false
author:
  - name: Michael Crosby
    url : https://docker.com/author/michael/
cover: https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png
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
  name="CPU Management in Docker 1.13"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/cpu-management-docker-1-13"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

Resource management for containers is a huge requirement for production users. Being able to run multiple containers on a single host and ensure that one container does not starve the others in terms of cpu, memory, io, or networking in an efficient way is why I like working with containers. However, cpu management for containers is still not as straightforward as what I would like. There are many different options when it comes to dealing with restricting the cpu usage for a container. With things like memory, its is very easy for people to think that , `--memory 512m` gives the container up to 512mb. With CPU, it’s hard for people to understand a container’s limit with the current options.

In Docker 1.13 we added a `--cpus` flag, which is the best tech for limiting cpu usage of a container with a sane UX that the majority of users can understand. Let’s take a look at a couple of the options in 1.12 to show why this is necessary.

There are various ways to set a cpu limit for a container. Cpu shares, cpuset, cfs quota and period are the three most common ways. We can just go ahead and say that using cpu shares is the most confusing and worst functionality out of all the options we have. The numbers don’t make sense. For example, is 5 a large number or is 512 half of my system’s resources if there is a max of 1024 shares?  Is 100 shares significant when I only have one container; however, if I add two more containers each with 100 shares, what does that mean?  We could go in depth on cpu shares but you have to remember that cpu shares are relative to everything else on the system.

Cpuset is a viable alternative but it takes much more thought and planning to use it correctly and use it in the correct circumstances. The cfs scheduler along with quota and period are some of the best options for limiting container cpu usage but they come with bad user interfaces. Specifying cpu usage in nanoseconds for a user is sometimes hard to determine when you want to do simple tasks such as limiting a container to one core.

In 1.13 though, if you want a container to be limited to one cpu then you can just add `--cpus 1.0` to your Docker run/create command line. If you would like two and a half cpus as the limit of the container then just add `--cpus 2.5`. In Docker we are using the CFS quota and period to limit the container’s cpu usage to what you want and doing the calculations for you.

If you are limiting cpu usage for your containers, look into using this new flag and API to handle your needs. This flag will work on both Linux and Windows when using Docker.

For more information on the feature you can look at the docs

<SiteInfo
  name="Resource constraints"
  desc="Specify the runtime options for a container"
  url="https://docs.docker.com/engine/containers/resource_constraints/"
  logo="https://docs.docker.com/favicons/docs@2x.ico"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CPU Management in Docker 1.13",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/cpu-management-docker-1-13.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
