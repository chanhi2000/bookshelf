---
lang: en-US
title: "How We Solved a Report on `docker-compose` Performance on macOS CatalinaDocker"
description: "Article(s) > How We Solved a Report on `docker-compose` Performance on macOS CatalinaDocker"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Apple
  - macOS
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - apple
  - macos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How We Solved a Report on `docker-compose` Performance on macOS CatalinaDocker"
    - property: og:description
      content: "How We Solved a Report on `docker-compose` Performance on macOS CatalinaDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/solving-docker-compose-performance-on-macos-catalina.html
prev: /devops/docker/articles/README.md
date: 2020-01-29
isOriginal: false
author: 
cover: https://docker.com/app/uploads/2020/01/caspar-camille-rubin-fPkvU7RDmCo-unsplash-1110x740.jpg
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
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How We Solved a Report on `docker-compose` Performance on macOS CatalinaDocker"
  desc="As a Docker Compose maintainer, my daily duty is to check for newly reported issues and try to help users through misunderstanding and possible underlying bugs. Sometimes issues are very well documented, sometimes they are nothing much but some “please help” message. And sometimes they look really weird and can result in funny investigations. Here is the story..."
  url="https://docker.com/blog/solving-docker-compose-performance-on-macos-catalina"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/01/caspar-camille-rubin-fPkvU7RDmCo-unsplash-1110x740.jpg"/>

![Photo by [<VPIcon icon="fas fa-globe"/>Caspar Camille Rubin](https://unsplash.com/@casparrubin) on [<VPIcon icon="fas fa-globe"/>Unsplash](https://unsplash.com/s/photos/developer)](https://docker.com/app/uploads/2020/01/caspar-camille-rubin-fPkvU7RDmCo-unsplash-scaled.jpg?fit=1110%2C740&ssl=1)

As a [Docker Compose (<VPIcon icon="iconfont icon-github"/>`docker/compose)`)](https://github.com/docker/compose) maintainer, my daily duty is to check for newly reported issues and try to help users through misunderstanding and possible underlying bugs. Sometimes issues are very well documented, sometimes they are nothing much but some *“please help”* message. And sometimes they look really weird and can result in funny investigations. Here is the story of how we solved one such report…

---

## A one-line bug report

An issue was reported as *“docker-compose super slow on macOS Catalina”* – no version, no details. How should I prioritize this? I don’t even know if the reporter is using the latest version of the tool – the opened issue doesn’t follow the bug reporting template. This is just a one-liner. But for some reason, I decided to take a look at it anyway and diagnose the issue.

Without any obvious explanation for super-slowness, I decided to take a risk and upgrade my own MacBook to OSX Catalina. I was able to reproduce significant slow down in `docker-compose` execution, waiting seconds for the very first line printed on the console even to display usage on invalid command.

---

## Investigating the issue

In the meantime, some users reported getting correct performance when installing `docker-compose` as a plain python software, not with the packaged executable. The `docker-compose` executable is packaged using [<VPIcon icon="fas fa-globe"/>PyInstaller](https://pyinstaller.org/), which embeds a Python runtime and libraries with application code in a single executable file. As a result, one gets a distributable binary that can be created for Windows, Linux and OSX.  I wrote a minimalist “*hello world*” python application and was able to reproduce the same weird behaviour once packaged the same way `docker-compose` is, i.e. a few second startup delay.

Here comes the funny part. I’m a remote worker on the Docker team, and I sometimes have trouble with my Internet connection. It happened this exact day, as my network router had to reboot. And during the reboot sequence, `docker-compose` performance suddenly became quite good … but eventually, the initial execution delay came back. How do you explain such a thing?

So I installed [<VPIcon icon="fas fa-globe"/>Charles proxy](https://charlesproxy.com/) to analyze network traffic, and discovered a request sent to api.apple-cloudkit.com each and everytime `docker-compose` was run. Apple Cloudkit is Apple cloud storage SDK, and there’s no obvious relation between `docker-compose` and this service.

As the Docker Desktop team was investigating Catalina support during this period, I heard about the notarization constraints introduced by the Apple OS upgrade. I decided to reconfigure my system with system integrity check disabled (you have to run ‘csrutil disable’ from recovery console on boot). Here again, `docker-compose` suddenly went reasonably fast.

Looking into PyInstaller implementation details, when executed `docker-compose` binary extracts itself into a temporary folder, then executes the embedded Python runtime to run the packaged application. This bootstrap sequence takes a blink of an eye on a recent computer with tmp folder mapped to memory, but on my Catalina-upgraded MacBook it took up to 10 seconds – until I disabled integrity check.

---

## Confirming the hypothesis

My assumption was: OSX Catalina reinforced security constraints do apply to the python runtime as it gets extracted, as a security scan, and the system does send a scan report to apple over its own cloud storage service. I can’t remember having approved sending such data to Apple, but I admit I didn’t carefully read the upgrade guide and service agreement before I hit the “upgrade to Catalina” button. As a fresh new Python runtime is extracted for temporary execution, this takes place each and every time we run a `docker-compose` command: new system scan, new report sent to apple – not even as a background task.

To confirm this hypothesis, I built a custom flavour of `docker-compose` using an alternate PyInstaller configuration, so it doesn’t create a single binary, but a folder with runtime and libraries. The first execution of this custom `docker-compose` packaging took 10 seconds again (initial scan by the system), but subsequent commands were as efficient as expected.

---

## The resolution

A few weeks later, a release candidate build was included in the Docker Desktop Edge channel to confirm that Catalina users get good performance using this alternate packaging, while not introducing unexpected bugs. [**Docker Compose 1.25.1 was released**](/docker.com/faster-builds-in-compose-thanks-to-buildkit-support.md) one month later with the bug fix confirmed. Starting with this release, `docker-compose` is available both as single binary packaging and as a tar.gz for OSX Catalina.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How We Solved a Report on `docker-compose` Performance on macOS CatalinaDocker",
  "desc": "As a Docker Compose maintainer, my daily duty is to check for newly reported issues and try to help users through misunderstanding and possible underlying bugs. Sometimes issues are very well documented, sometimes they are nothing much but some “please help” message. And sometimes they look really weird and can result in funny investigations. Here is the story...",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/solving-docker-compose-performance-on-macos-catalina.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
