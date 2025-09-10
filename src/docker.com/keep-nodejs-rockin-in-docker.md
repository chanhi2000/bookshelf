---
lang: en-US
title: "Top 4 Tactics To Keep Node.js Rockin’ in Docker"
description: "Article(s) > Top 4 Tactics To Keep Node.js Rockin’ in Docker"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Node.js
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Top 4 Tactics To Keep Node.js Rockin’ in Docker"
    - property: og:description
      content: "Top 4 Tactics To Keep Node.js Rockin’ in Docker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/keep-nodejs-rockin-in-docker.html
prev: /devops/docker/articles/README.md
date: 2019-07-31
isOriginal: false
author:
  - name: Bret Fisher
    url : https://docker.com/author/bret-fisher/
cover: https://docker.com/app/uploads/2019/07/C3-promo-small.jpg
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
  name="Top 4 Tactics To Keep Node.js Rockin’ in Docker"
  desc="There’s a ton of info out there on using Node.js with Docker, but so much of it is years out of date, and I’m here to help you optimize your setups for Node.js 10+ and Docker 18.09+."
  url="https://docker.com/blog/keep-nodejs-rockin-in-docker"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2019/07/C3-promo-small.jpg"/>

::: note

This is a guest post from [<VPIcon icon="fa-brands fa-docker"/>Docker Captain Bret Fisher](https://docker.com/captains/bret-fisher), a long time DevOps sysadmin and speaker who teaches container skills with his popular Docker Mastery courses including [Docker Mastery for Node.js](https://bretfisher.com/node), weekly [YouTube Live shows (<VPIcon icon="fa-brands fa-youtube"/>`@BretFisher`)](https://youtube.com/@BretFisher), and consults to companies adopting Docker. Join Bret for an [<VPIcon icon="fa-brands fa-docker"/>online meetup on August 28th](https://events.docker.com/events/details/docker-docker-online-meetups-presents-nodejs-in-docker-tips-and-tricks-with-docker-captain-bret-fisher/#/), where he’ll give demos and Q&A on Node.js and Docker topics.  

:::  

![Foxy, my Docker Mastery mascot is a fan of Node and Docker](https://docker.com/app/uploads/2019/07/C3-promo-small.jpg)

We’ve all got our favorite languages and frameworks, and Node.js is tops for me. I’ve run Node.js in Docker since the early days for mission-critical apps. **I’m on a mission to educate everyone on how to get the most out of this framework** and its tools like npm, Yarn, and nodemon with Docker.  
  
There’s a ton of info out there on using Node.js with Docker, **but so much of it is years out of date**, and I’m here to help you optimize your setups for Node.js 10+ and Docker 18.09+. If you’d rather watch my DockerCon 2019 talk that covers these topics and more, [<VPIcon icon="fa-brands fa-youtube"/>check it out on YouTube](https://youtu.be/Zgx0o8QjJk4).

<VidStack src="youtube/Zgx0o8QjJk4" />
  
Let’s go through 4 steps for making your Node.js containers sing! **I’ll include some quick “Too Long; Didn’t Read” for those that need it.**  

---

## Stick With Your Current Base Distro

::: info TL;DR:

If you’re migrating Node.js apps into containers, use the base image of the host OS you have in production today. After that, my favorite base image is the official `node:slim` editions rather than `node:alpine`, which is still good but usually more work to implement and comes with limitations.  

:::
  
One of the first questions anyone asks when putting a Node.js app in Docker, is **“Which base image should I start my Node.js Dockerfile from?”**  

![docker image ls node](https://docker.com/app/uploads/2019/07/docker-image-ls-node.png)
<!-- TODO: 코드화 -->

slim and alpine are quite smaller than the default image

There are multiple factors that weigh into this, but don’t make “image size” a top priority unless you’re dealing with IoT or embedded devices where every MB counts. **In recent years the slim image has shrunk down in size to 150MB and works the best across the widest set of scenarios.** Alpine is a very minimal container distribution, with the smallest node image at only 75MB. However, the level of effort to swap package managers (apt to apk), deal with [edge cases (<VPIcon icon="iconfont icon-github"/>`remy/nodemon`)](https://github.com/remy/nodemon/issues/1447), and work around [<VPIcon icon="fas fa-globe"/>security scanning limitations](https://kubedex.com/follow-up-container-scanning-comparison/) causes me hold off on recommending node:alpine for most use cases.  
  
When adopting container tech, like anything, you want to do what you can to reduce the change rate. So many new tools and processes come along with containers. **Choosing the base image your devs and ops are most used to has many unexpected benefits**, so try to stick with it when it makes sense, even if this means making a custom image for CentOS, Ubuntu, etc.  

---

## Dealing With Node Modules

::: info TL;DR

You don’t have to relocate node_modules in your containers as long as you follow a few rules for proper local development. A second option is to move mode_modules up a directory in your Dockerfile, configure your container properly, and it’ll provide the most flexible option, but may not work with every npm framework.  

:::

We’re all now used to a world where we don’t write all the code we run in an app, and that means dealing with app framework dependencies. **One common question is how to deal with those code dependencies in containers when they are a subdirectory of our app.** Local bind-mounts for development can affect your app differently if those dependencies were designed to run on your host OS and not the container OS.  
  
The core of this issue for Node.js is that node_modules can contain binaries compiled for your host OS, and if it’s different then the container OS, you’ll get errors trying to run your app when you’re bind-mounting it from the host for development. **Note that if you’re a pure Linux developer and you develop on Linux x64 for Linux x64, this bind-mount issue isn’t usually a concern.**  
  
::: note

For Node.js I offer you two approaches, which come with their own benefits and limitations:  

:::

### Solution A: Keep It Simple

Don’t move node_modules. It will still sit in the default subdirectory of your app in the container, but this means that you have to prevent the node_modules created on your host from being used in the container during development.
  
**This is my preferred method when doing pure-Docker development.** It works great with a few rules you must follow for local development:

#### 1. Develop only through the container

Why? Basically, you don’t want to mix up the node_modules on your host with the node_modules in the container. On macOS and Windows, Docker Desktop bind-mounts your code across the OS barrier, and this can cause problems with binaries you’ve installed with npm for the host OS, that can’t be run in the container OS.

#### 2. Run all your npm commands through docker-compose.

This means your initial `npm install` for your project should now be `docker-compose run <service name> npm install`.

### Solution B: Move Container Modules and Hide Host Modules

Relocate node_modules up the file path in the Dockerfile so you can develop Node.js in and out of the container, and the dependencies won’t clash which you switch between host-native development and Docker-based development.  

Since Node.js is designed to run on multiple OS’s and architectures, you may not want to always develop in containers. **If you want the flexibility to sometimes develop/run your Node.js app directly on the host, and then other times spin it up in a local container, then Solution B is your jam.**  

![node solution b](https://docker.com/app/uploads/2019/07/node-solution-b.png)
<!-- TODO: 코드화 -->

Rules for this solution include:

For both of these solutions, always remember to add [<VPIcon icon="fas fa-folder-open"/>`node_modules` to your <VPIcon icon="fa-brands fa-docker"/>`.dockerignore` file](https://github.com/BretFisher/node-docker-good-defaults/blob/69c923bc646bc96003e9ada55d1ec5ca943a1b19/.dockerignore) (same syntax as <VPIcon icon="iconfont icon-git"/>`.gitignore`) so you’ll never accidentally build your images with modules from the host. You always want your builds to run an npm install **inside** the image build.  

---

## Use The Node User, Go Least Privilege

All the official Node.js images have a Linux user added in the upstream image called node. **This user is not used by default**, **which means your Node.js app will run as root in the container by default.** This isn’t the worst thing, as it’s still isolated to that container, but you should enable in all your projects where you don’t need Node to run as root. Just add a new line in your `Dockerfile`: `USER node`  

::: info Here are some rules for using it:

1. Location in the `Dockerfile` matters. Add `USER` after `apt/yum/apk` commands, and *usually* before npm install commands.
2. It doesn’t affect all commands, like `COPY`, which has [<VPIcon icon="fa-brands fa-docker"/>its own syntax for controlling owner of files you copy in.](https://docs.docker.com/engine/reference/builder/#copy)
3. You can always switch back to `USER root` if you need to. In more complex Dockerfiles this will be necessary, like [my multi-stage example (<VPIcon icon="iconfont icon-github"/>`BretFisher/dockercon19`)](https://github.com/BretFisher/dockercon19/blob/master/5.Dockerfile) that includes running tests and security scans during optional stages.
4. Permissions may get tricky during development because now you’ll be doing things in the container as a non-root user by default. The way to often get around this is to do things like npm install by telling Docker you want to run those one-off commands as root: `docker-compose run -u root npm install`

:::

---

## Don’t Use Process Managers In Production

::: info TL;DR

Except for local development, don’t wrap your node startup commands with anything. Don’t use npm, nodemon, etc. Have your <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` `CMD` be something like  `[“node”, “file-to-start.js”]` and you’ll have an easier time managing and replacing your containers.  

:::
  
Nodemon and other “file watchers” are necessary in development, but one big win for adopting Docker in your Node.js apps is that Docker takes over the job of what we used to use `pm2`, `nodemon`, `forever`, and `systemd` for on servers.  
  
Docker, Swarm, and Kubernetes will do the job of running healthchecks and restarting or recreating your container if it fails. It’s also now the job of orchestrators to scale the number of replicas of our apps, which we used to use tools like pm2 and forever for.

::: note

Remember, Node.js is still single-threaded in most cases, so even on a single server you’ll likely want to spin up multiple container replicas to take advantage of multiple CPU’s.

:::
  
[My example repo (<VPIcon icon="iconfont icon-github"/>`BretFisher/node-docker-good-defaults`)](https://github.com/BretFisher/node-docker-good-defaults) shows you how to using node directly in your <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, and then for local development, either build use a different image stage with `docker build --target <stage name>`, or override the CMD in your compose YAML.  
  
---

## Start Node Directly in `Dockerfile`s

::: info TL;DR

I also don’t recommend using npm to start your apps in your <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`. Let me explain.

:::
  
I recommend calling the node binary directly, largely due to the “PID 1 Problem” where you’ll find some confusion and misinformation online about how to deal with this in Node.js apps. **To clear up confusion in the blogosphere, you don’t always need a “init” tool to sit between Docker and Node.js, and you should probably spend more time thinking about how your app stops gracefully**.  
  
Node.js accepts and forwards signals like SIGINT and SIGTERM from the OS, which is important for proper shutdown of your app. Node.js leaves it up to your app to decide how to handle those signals, which means if you don’t write code or use a module to handle them, your app won’t shut down gracefully. It’ll ignore those signals and then be killed by Docker or Kubernetes after a timeout period (Docker defaults to 10 seconds, Kubernetes to 30 seconds.) **You’ll care a lot more about this once you have a production HTTP app that you have to ensure doesn’t just drop connections when you want to update your apps.**  
  
**Using other apps to start Node.js for you, like npm for example, often break this signaling.** npm won’t pass those signals to your app, so it’s best to leave it out of your `Dockerfiles` ENTRYPOINT and `CMD`. This also has the benefit of having one less binary running in the container. Another bonus is it allows you to see in the Dockerfile **exactly** what your app will do when your container is launched, rather then also having to check the package.json for the true startup command.  

For those that know about init options like `docker run --init` or using [<VPIcon icon="iconfont icon-github"/>`krallin/tini`](https://github.com/krallin/tini) in your Dockerfile, they are good backup options when you can’t change your app code, but it’s a much better solution to write code to handle proper signal handling for graceful shutdowns. Two examples are [some boilerplate code I have here (<VPIcon icon="iconfont icon-github"/>`BretFisher/node-docker-good-defaults`)](https://github.com/BretFisher/node-docker-good-defaults/blob/69c923bc646bc96003e9ada55d1ec5ca943a1b19/bin/www#L16-L71), and looking at modules like [<VPIcon icon="iconfont icon-github"/>`hunterloftis/stoppable`](https://github.com/hunterloftis/stoppable).  
  
---

## Is That All?

Nope. These are concerns that nearly every Node.js team deals with, and there’s lots of other considerations that go along with that. Topics like multi-stage builds, HTTP proxies, npm install performance, healthchecks, CVE scanning, container logging, testing during image builds, and microservice docker-compose setups are all common questions for my Node.js clients and students.  

::: info

If you’re wanting more info on these topics, you can watch [<VPIcon icon="fa-brands fa-youtube"/>my DockerCon 2019 session video on this topic](https://youtu.be/Zgx0o8QjJk4), or check my 8-hours of Docker for Node.js videos at [<VPIcon icon="fas fa-globe"/>bretfisher.com/node](https://bretfisher.com/node)

:::

Thanks for reading. You can reach me on [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`bretfisher`)](https://twitter.com/bretfisher), get my weekly [<VPIcon icon="fas fa-globe"/>DevOps and Docker newsletter](https://bretfisher.com/newsletter), subscribe to my [weekly YouTube videos and Live Show (<VPIcon icon="fa-brands fa-youtube"/>`@BretFisher`)](https://youtube.com/@BretFisher), and check out my [<VPIcon icon="fas fa-globe"/>other Docker resources and courses](https://bretfisher.com/docker).  

Keep on Dockering!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Top 4 Tactics To Keep Node.js Rockin’ in Docker",
  "desc": "There’s a ton of info out there on using Node.js with Docker, but so much of it is years out of date, and I’m here to help you optimize your setups for Node.js 10+ and Docker 18.09+.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/keep-nodejs-rockin-in-docker.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
