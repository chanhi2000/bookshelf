---
lang: en-US
title: "The best way to learn  for Free: Play-With- (PWD)"
description: "Article(s) > The best way to learn  for Free: Play-With- (PWD)"
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
      content: "Article(s) > The best way to learn  for Free: Play-With- (PWD)"
    - property: og:description
      content: "The best way to learn  for Free: Play-With- (PWD)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/best-way-learn-docker-free-play-docker-pwd.html
prev: /devops/docker/articles/README.md
date: 2017-07-18
isOriginal: false
author:
  - name: Victor Coisne
    url : https://docker.com/author/victor_c/
cover: https://docker.com/app/uploads/ssh.gif
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
  name="The best way to learn  for Free: Play-With- (PWD)"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/best-way-learn-docker-free-play-docker-pwd"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/ssh.gif"/>

Last year at the Distributed System Summit in Berlin, Docker captains [Marcos Nils (<FontIcon icon="fa-brands fa-x-twitter"/>`marcosnils`)](https://twitter.com/marcosnils) and [Jonathan Leibiusky (<FontIcon icon="fa-brands fa-x-twitter"/>`xetorthio`)](https://twitter.com/xetorthio) started hacking on an in-browser solution to help people learn Docker. A few days later, [<FontIcon icon="fas fa-globe"/>Play-with-docker](https://play-with-docker.com/) (PWD) was born.

PWD is a Docker playground which allows users to run Docker commands in a matter of seconds. It gives the experience of having a free Alpine Linux Virtual Machine in browser, where you can build and run Docker containers and even create clusters in [<FontIcon icon="fa-brands fa-docker"/>Docker Swarm Mode](https://docs.docker.com/engine/swarm/). Under the hood Docker-in-Docker (DinD) is used to give the effect of multiple VMs/PCs. In addition to the playground, PWD also includes a training site composed of a large set of Docker labs and quizzes from beginner to advanced level available at [<FontIcon icon="fas fa-globe"/>`training.play-with-docker.com`](https://training.play-with-docker.com/).

In case you missed it, Marcos and Jonathan presented PWD during the last DockerCon Moby Cool Hack session. Watch the video below for a deep dive into the infrastructure and roadmaps.

<VidStack src="youtube/h2VTE9WnZs" />

Over the past few months, the Docker team has been working closely with Marcos, Jonathan and other active members of the Docker community to add new features to the project and Docker labs to the training section.

---

## PWD: the Playground

Here is a quick recap of what’s new with the Docker playground:

### 1. PWD Docker Machine driver and SSH

As PWD success grew, the community started to ask if they could use PWD to run their own Docker workshops and trainings. So one of the first improvements made to the project was the creation of [PWD Docker machine driver (<FontIcon icon="iconfont icon-github"/>`play-with-docker/docker-machine-driver-pwd`)](https://github.com/play-with-docker/docker-machine-driver-pwd/releases/tag/v0.0.5), which allows users to create and manage their PWD hosts easily through their favorite terminal including the option to use ssh related commands. Here is how it works:

![Play With Docker](https://docker.com/app/uploads/ssh.gif)

### 2. Adding support for file upload

Another cool feature brought to you by Marcos and Jonathan is the ability to upload your Dockerfile directly into your PWD windows with a simple drag and drop of your file in your PWD instance.

![pwd upload 1](https://docker.com/app/uploads/pwd_upload-1.gif)

### 3. Templated session

In addition to file upload, PWD also has a feature which lets you spin up a 5 nodes swarm in a matter of seconds using predefined templates.

![Play with Docker](https://docker.com/app/uploads/templated-session-1.gif)

### 4. Showcasing your applications with Docker in a single click

Another cool feature that comes with PWD is its embeddable button that you can use in your sites to set up a PWD environment and deploy a compose stack right away and a [<FontIcon icon="fa-brands fa-chrome"/>chrome extension](https://chrome.google.com/webstore/detail/play-with-docker/kibbhpioncdhmamhflnnmfonadknnoan) that adds the “Try in PWD” button to the most popular images in DockerHub. Here’s a short demo of the extension in action:

---

## PWD: the Training Site

 A number of new labs are available on [<FontIcon icon="fas fa-globe"/>`training.play-with-docker.com`](https://training.play-with-docker.com/). Some notable highlights include two labs that were originally hands-on labs from DockerCon in Austin, and a couple that highlight new features that are stable in Docker 17.06CE:

```component VPCard
{
  "title": "Docker Networking Hands-on Lab",
  "desc": "In this lab you will learn about key Docker Networking concepts. You will get your hands dirty by going through examples of a few basic networking concepts, learn about Bridge networking, and finally Overlay networking.",
  "link": "https://training.play-with-docker.com/docker-networking-hol/",
  "logo": "https://training.play-with-docker.com/images/favicon.png",
  "background": "rgba(20,136,198,0.2)"
}
```

```component VPCard
{
  "title": "Docker Orchestration Hands-on Lab",
  "desc": "In this lab you will play around with the container orchestration features of Docker. You will deploy a simple application to a single host and learn how that works. Then, you will configure Docker Swarm Mode, and learn to deploy the same simple application across multiple hosts. You will then see how to scale the application and move the workload across different hosts easily.",
  "link": "https://training.play-with-docker.com/orchestration-hol/",
  "logo": "https://training.play-with-docker.com/images/favicon.png",
  "background": "rgba(20,136,198,0.2)"
}
```

```component VPCard
{
  "title": "Multi-stage builds",
  "desc": "A common pipe-line for building applications in Docker involves adding SDKs and runtimes, followed by adding code and building it. The most efficient way to get a small image tends to be to use 2-3 Dockerfiles with different filenames where each one takes the output of the last. This is referred to as the Builder pattern in the Docker community.",
  "link": "https://training.play-with-docker.com/multi-stage/",
  "logo": "https://training.play-with-docker.com/images/favicon.png",
  "background": "rgba(20,136,198,0.2)"
}
```

```component VPCard
{
  "title": "Docker swarm config files",
  "desc": "This tutorials showcases the config swarm feature that allow config objects to be attached to services. Config files can be mounted inside services’ containers, avoiding the need to bake configuration into images.",
  "link": "https://training.play-with-docker.com/swarm-config/",
  "logo": "https://training.play-with-docker.com/images/favicon.png",
  "background": "rgba(20,136,198,0.2)"
}
```

All in all, there are now 36 labs, with more being added all the time. If you want to contribute a lab, check out the [GitHub repo (<FontIcon icon="iconfont icon-github"/>`play-with-docker/play-with-docker.github.io`)](https://github.com/play-with-docker/play-with-docker.github.io) and get started.

---

## PWD: the Use Cases

With the traffic to the site and the feedback we’ve received, it’s fair to say that PWD has a lot of traction right now. Here are some of the most common use-cases:

- Try new features fast as it’s updated with the latest dev versions.
- Set up clusters in no-time and launch replicated services.
- Learn through it’s interactive tutorials: [<FontIcon icon="fas fa-globe"/>`training.play-with-docker.com`](http://training.play-with-docker.com/).
- Give presentations at conferences and meetups.
- Allow to run advanced workshops that’d usually require complex setups, such as Jérôme’s [advanced Docker Orchestration workshop (<FontIcon icon="iconfont icon-github"/>`docker/labs`)](https://github.com/docker/labs/tree/master/Docker-Orchestration)
- Collaborate with community members to diagnose and detect issues.

Get involved with PWD:

- Contribute to [PWD by submitting PRs (<FontIcon icon="iconfont icon-github"/>`play-with-docker`)](https://github.com/play-with-docker/)
- Contribute to the [PWD training site (<FontIcon icon="iconfont icon-github"/>`play-with-docker/training`)](https://github.com/play-with-docker/training)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The best way to learn  for Free: Play-With- (PWD)",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/best-way-learn-docker-free-play-docker-pwd.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
