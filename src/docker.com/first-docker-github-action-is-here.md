---
lang: en-US
title: "First Docker GitHub Action is here!"
description: "Article(s) > First Docker GitHub Action is here!"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Github
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - github
head:
  - - meta:
    - property: og:title
      content: "Article(s) > First Docker GitHub Action is here!"
    - property: og:description
      content: "First Docker GitHub Action is here!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/first-docker-github-action-is-here.html
prev: /devops/docker/articles/README.md
date: 2020-03-17
isOriginal: false
author:
  - name: Nicholas Adcock
    url: https://docker.com/contributors/nicholas-adcock/
cover: https://docker.com/app/uploads/2020/03/Screenshot-2020-03-23-at-15.24.46.png
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
  name="First Docker GitHub Action is here!"
  desc="We are happy to announce that today Docker has released its first Github Action! We’ve been working with GitHub, looking into how developers have been using GitHub Actions with Docker to set up their CI/CD workflows. The standard flows you’ll see if you look around are what you’d expect: building an image, tagging it, logging into Hub, and pushing the image. This is the workflow we’ve aimed to support with our Docker build-push action."
  url="https://docker.com/blog/first-docker-github-action-is-here"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/03/Screenshot-2020-03-23-at-15.24.46.png"/>

We are happy to announce that today Docker has released its first Github Action! We’ve been working with GitHub, looking into how developers have been using [<VPIcon icon="iconfont icon-github"/>GitHub Actions](https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions) with Docker to set up their CI/CD workflows. The standard flows you’ll see if you look around are what you’d expect: building an image, tagging it, logging into Hub, and pushing the image. This is the workflow we’ve aimed to support with our Docker build-push action.

---

## Simplify CI/CD workflows

At Docker traditionally much of our CI/CD workflows has been handled through Jenkins using a variety of products to set up and maintain it. For some things this is the best solution like when we are testing Docker Desktop on a whole variety of different hosts and configurations. For others it’s a bit overkill. Like many, we at Docker have been looking at how we can **leverage GitHub Actions to simplify our workflows**, including how we use Docker itself.

GitHub Actions already leverages Docker in a lot of its workflows. From having Docker pre-installed and configured on the cloud runners to having first class support for containerized actions allows developers to easily use the same Docker workflows they use locally to configure their repo’s CI/CD. Combined with multi-stage builds and you have a powerful environment to work with.

---

## Docker actions

When we started with Github Actions there were no built-in actions to handle our main build, tag and push flow so we end up with a yaml file, that can’t yet be run locally, full of bash commands. Indeed that’s exactly what you’re given if you choose the “[Docker Publish (<VPIcon icon="iconfont icon-github"/>`actions/starter-workflows`)](https://github.com/actions/starter-workflows/blob/master/ci/docker-publish.yml)” workflow template from inside GitHub. Though it’s certainly doable it’s not as easy to read and maintain as a script that just uses pre-built actions. This is likely why the community has already published a whole host of actions to do just that. Just go to the [<VPIcon icon="iconfont icon-github"/>GitHub Marketplace](https://github.com/marketplace?type=actions) and search for Docker actions.

Common things you’ll see beyond just the standard build/tag/push is supporting automatic tagging of images based on the branch you’re building from, logging in to private registries, and setting standard CLI arguments like the Dockerfile path.

Having looked at a number of these we decided to **build our own actions** off of these ideas and publish them back to the community as official Docker supported GitHub Actions. The first of these, [docker/build-push-action (<VPIcon icon="iconfont icon-github"/>`docker/build-push-action`)](https://github.com/docker/build-push-action), supports much of what has been written above and attempts to build and push images with what we consider to be best practices including:

- [Tagging (<VPIcon icon="iconfont icon-github"/>`docker/build-push-action#tag_with_ref`)](https://github.com/docker/build-push-action#tag_with_ref) based on the git ref (branches, tags, and PRs).
- [Tagging (<VPIcon icon="iconfont icon-github"/>`docker/build-push-action#tag_with_sha`)](https://github.com/docker/build-push-action#tag_with_sha) with the git SHA to make it easy to grab the image in later stages of more complex CI/CD flows. For example where you need to run end-to-end tests in a large, self-hosted cluster.
- [Labelling (<VPIcon icon="iconfont icon-github"/>`docker/build-push-action#add_git_labels`)](https://github.com/docker/build-push-action#add_git_labels) the image with [Open Container Initiative (<VPIcon icon="iconfont icon-github"/>`opencontainers/image-spec`)](https://github.com/opencontainers/image-spec/blob/master/annotations.md) labels using data pulled from the GitHub Actions environment.
- Support for build time [arguments (<VPIcon icon="iconfont icon-github"/>`docker/build-push-action#build_args`)](https://github.com/docker/build-push-action#build_args) and multi-stage [targets (<VPIcon icon="iconfont icon-github"/>`docker/build-push-action#target`)](https://github.com/docker/build-push-action#target).
- [Push filter (<VPIcon icon="iconfont icon-github"/>`docker/build-push-action#push`)](https://github.com/docker/build-push-action#push) that allows you to configure when just to build the image and when to actually push it depending on any of the data supplied by GitHub Actions and your own scripts. See the [examples (<VPIcon icon="iconfont icon-github"/>`docker/build-push-action#example-usage`)](https://github.com/docker/build-push-action#example-usage) for one we use ourselves.

---

## A single action approach

But why one big action instead of many small ones? One thing that came up in our discussions with GitHub is how they envisaged that users would create many small actions and chain them together using inputs and outputs but the reality looks to be the opposite. From what we had seen users have been creating big actions and handling the flows internally using inputs for configuration details.

Whilst developing our own actions we found ourselves going the same way, firstly because it’s simply easier to test that way as there currently isn’t any way to run the workflow script locally.

Also this:

```yaml
‐ name: build  
  id: build  
  uses: docker/build-action@v1  
  with:  
    repository: myorg/myrepo  
    tags: v1  
‐ name: login  
  uses: docker/login-action@v1  
  with:  
    registry: myregistry  
    username: ${{ DOCKER_USERNAME }}  
    password: ${{ DOCKER_PASSWORD }}  
‐ name: push  
  uses: docker/push-action@v1  
  with:  
    registry: myregistry  
    tags: ${{ outputs.build.tags }}  
```

Is a bit more effort to write than:

```yaml
‐ name: build-push  
  uses: docker/build-push-action@v1  
  with:  
    username: ${{ DOCKER_USERNAME }}  
    password: ${{ DOCKER_PASSWORD }}  
    registry: myregistry  
    repository: myorg/myrepo  
    tags: v1
```

The final reason we went with the single action approach was that the logic of how the separate steps link and when they should be skipped is simple to handle in the backend based purely on a couple of inputs. Are the username and password set? Then do a login. Should we push? Then push with the tags that we built the image with. Is the registry set? Then log in to that registry, tag the images with that registry, and push to it rather than defaulting to Docker Hub.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "First Docker GitHub Action is here!",
  "desc": "We are happy to announce that today Docker has released its first Github Action! We’ve been working with GitHub, looking into how developers have been using GitHub Actions with Docker to set up their CI/CD workflows. The standard flows you’ll see if you look around are what you’d expect: building an image, tagging it, logging into Hub, and pushing the image. This is the workflow we’ve aimed to support with our Docker build-push action.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/first-docker-github-action-is-here.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
