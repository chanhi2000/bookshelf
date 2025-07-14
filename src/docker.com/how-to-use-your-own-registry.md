---
lang: en-US
title: "How to use your own private local registry with Docker"
description: "Article(s) > How to use your own private local registry with Docker"
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
      content: "Article(s) > How to use your own private local registry with Docker"
    - property: og:description
      content: "How to use your own private local registry with Docker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/how-to-use-your-own-registry.html
prev: /devops/docker/articles/README.md
date: 2013-07-20
isOriginal: false
author:
  - name: Sam Alba
    url : https://docker.com/author/sam/
cover: https://docker.com/app/uploads/2013/06/sam.jpeg
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
  name="How to use your own private local registry with Docker"
  desc="Learn how to use a local registry with Docker to push images that contain proprietary code or confidential information that needs to remain private."
  url="https://docker.com/blog/how-to-use-your-own-registry"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2013/06/sam.jpeg"/>

One of the things that makes Docker so useful is how easy it is to pull ready-to-use images from a central location, Docker’s *CentralRegistry*. It is just as easy to *push* your own image (or collection of tagged images as a*repository*) to the same publicregistry so that everyone can benefit from your newly Dockerized service.

But sometimes you can’t share your repository with the world because it contains proprietary code or confidential information. Today we are introducing an easy way to share repositories on your own registry so that you can control access to them and still share them among multiple Docker daemons. You can decide if your registry is public or private.

You’ll need the [<FontIcon icon="fa-brands fa-docker"/>latest version of Docker](http://docs.docker.io/en/latest/installation/upgrading/) (>=0.5.0) to use this new feature, and you must run this version as both the daemon and the client. You’ll also need the [Docker registry code (<FontIcon icon="iconfont icon-github"/>`dotcloud/docker-registry`)](https://github.com/dotcloud/docker-registry).

---

## Using Push and Pull

The default way of pushing and pulling repositories from the Central Registry has not changed:

```sh
# Pull the ubuntu base image:
docker pull ubuntu

# Push the Hipache image (if you're samalba!)
docker push samalba/hipache
```

Implicitly that `push` and `pull` each access the Central Registry at `index.docker.io`, so nothing has changed with the default behavior and all [<FontIcon icon="fa-brands fa-docker"/>the examples](http://docs.docker.io/en/latest/examples/) still work.

::: info Now the new feature!

To push to or pull from your *own* registry, you just need to add the registry’s location to the repository name. It will look like `my.registry.address:port/repositoryname`.

:::

Let’s say I want to push the repository “ubuntu” to my local registry, which runs on my local machine, on the port 5000:

```sh
# First, make sure you have the "ubuntu" repository:
docker pull ubuntu

# Then, find the image id that corresponds to the ubuntu repository
docker images | grep ubuntu | grep latest
ubuntu  latest  8dbd9e392a96  12 weeks ago  263 MB (virtual 263 MB)

# Almost there!
# Tag to create a repository with the full registry location.
# The location becomes a permanent part of the repository name.
docker tag 8dbd9e392a96 localhost.localdomain:5000/ubuntu

# Finally, push the new repository to its home location.
docker push localhost.localdomain:5000/ubuntu
```

Obviously, the push will fail if no registry server answer locally on the port 5000. We’ll briefly show how to start your own registry server at the end of this blog post.

It’s important to note that we’re using a domain containing a “.” here, i.e. `localhost.domain`. Docker looks for either a “.” (domain separator) or “:” (port separator) to learn that the first part of the repository name is a location and not a user name. If you just had `localhost` without either `.localdomain` or `:5000` (either one would do) then Docker would believe that `localhost` is a username, as in `localhost/ubuntu` or `samalba/hipache`. It would then try to push to the default Central Registry. Having a dot or colon in the first part tells Docker that this name contains a hostname and that it should push to your specified location instead.

---

## Install your Registry (on your server or locally)

Docker-Registry is a simple Python app, [installing it is straight-forward (<FontIcon icon="iconfont icon-github"/>`dotcloud/docker-registry`)](https://github.com/dotcloud/docker-registry/blob/master/README.md):

```sh
git clone https://github.com/dotcloud/docker-registry.git
cd docker-registry
cp config_sample.yml config.yml
pip install -r requirements.txt

gunicorn --access-logfile -\
--log-level debug \
--debug \
-b 0.0.0.0:5000 \
-w 1 wsgi:application
```

Your Registry is now running on localhost (port 5000) in a development flavor and using local storage. Obviously, in a production environment, you might want to run the Registry on port 443 (or 80 on a local network) and make it accessible on a hostname like “registry.domain.tld”, and point it to use S3 or other storage.

::: info About Sam Alba

![Sam Alba](https://docker.com/app/uploads/2013/06/sam.jpeg)

As dotCloud’s first engineering hire, Sam was part of the tiny team that shipped our first private beta in 2010. Since then, he has been instrumental in scaling the platform to tens of millions of unique visitors for tens of thousands of developers across the world, leaving his mark on every major feature and component along the way. Today, as dotCloud’s first director of engineering, he manages our fast-growing engineering team, which is another way to say he sits in meetings so that other engineers don’t have to. When not sitting in a meeting, he maintains several popular open-source projects, including Hipache and Cirruxcache and other projects also ending in “-ache”. In a previous life, Sam supported Fortune 500s at Akamai, built the web infrastructure at several startups, and wrote software for self-driving cars in a research lab at INRIA.

*Connect with Sam on Twitter! [<FontIcon icon="fa-brands fa-x-twitter"/>`@sam_alba`](https://x.com/sam_alba)*

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use your own private local registry with Docker",
  "desc": "Learn how to use a local registry with Docker to push images that contain proprietary code or confidential information that needs to remain private.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/how-to-use-your-own-registry.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
