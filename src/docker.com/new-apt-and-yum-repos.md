---
lang: en-US
title: "New Apt and Yum ReposDocker"
description: "Article(s) > New Apt and Yum ReposDocker"
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
      content: "Article(s) > New Apt and Yum ReposDocker"
    - property: og:description
      content: "New Apt and Yum ReposDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/new-apt-and-yum-repos.html
prev: /devops/docker/articles/README.md
date: 2015-07-23
isOriginal: false
author:
  - name: Jessie Frazelle
    url : https://docker.com/author/jess/
cover: https://docker.com/app/uploads/2015/07/oprah_binary.jpg
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
  name="New Apt and Yum ReposDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/new-apt-and-yum-repos"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2015/07/oprah_binary.jpg"/>

::: note

written by [Jessie Frazelle (<FontIcon icon="fa-brands fa-x-twitter"/>`frazelledazzell`)](https://x.com/frazelledazzell), Core Maintainer at [Docker, Inc. (<FontIcon icon="fa-brands fa-x-twitter"/>`docker`)](https://x.com/docker)

:::

::: info TLDR;

1. UPDATE your Docker apt repo source list if you want to be able to get the latest Docker
2. We have a yum repo FINALLY for rpms
3. EVERYONE GETS A DYNAMIC BINARY

:::

Today, we are super excited to announce that we have created and deployed new apt and yum repos for installing Docker. No longer will you ~`apt-get install lxc-docker`~, a super confusing name considering we no longer use lxc as the default backend for Docker out of the box. Let’s take a deep dive into the awesomeness that is the new repos.

---

## Dynamic Binaries

The old Docker deb installed a fully static Docker binary. This was the simplest way to make Docker installable on a variety of different OS versions without having to deal with dependencies. For those who use Devicemapper as a storage driver, this will allow udev sync to work properly.

Well now everyone gets a dynamic binary!

![](https://docker.com/app/uploads/2015/07/oprah_binary.jpg)

---

## Updating Apt Sources

We urge everyone to update their apt sources to the new format. We will NOT be pushing new versions to the old apt repository.  
We decided not to support two distinct apt repositories forever, hopefully you can understand this decision.

Docker 1.7.1 is already available on the new apt repository, which will ensure a seamless migration.

```sh :collapsed-lines
# add the new gpg key
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

# edit your /etc/apt/sources.list.d/docker.list
vim /etc/apt/sources.list.d/docker.list

# remove the contents and replace with the following depending on your os and version:
deb debian-wheezy main          # Debian Wheezy
deb debian-jessie main          # Debian Jessie
deb debian-stretch main         # Debian Stretch/Sid
deb ubuntu-precise main         # Ubuntu Precise
deb ubuntu-trusty main          # Ubuntu Trusty
deb ubuntu-utopic main          # Ubuntu Utopic
deb ubuntu-vivid main           # Ubuntu Vivid
deb ubuntu-wily main            # Ubuntu Wily
```

After your source file is updated run the following:

```sh
apt-get update
apt-get purge lxc-docker*       # remove the old
apt-get install docker-engine   # install the new
```

Now you are all set. When you run `apt-get upgrade` in the future it will hit the new apt repo.

---

## RPMs and Yum

A huge pain point for people using CentOS, Fedora, or RHEL was having to install the package for docker that is maintained by the distribution itself. Not that there was anything wrong with those packages, but now you can rest assured you will get the latest, greatest Docker installed on your host from our yum repository.

You can easily add our yum repository and install the new docker-engine package by running:

```sh
curl -sSL https://get.docker.com/ | sh
```

OR if you would like to add it yourself find the url for your specific OS version below and run the following script:

- CentOS 6 & RHEL 6
- CentOS 7 & RHEL 7
- Fedora 20
- Fedora 21
- Fedora 22

```sh
# replace https://yum.dockerproject.org/repo/main/$OS/$OS_VERSION below with your specific OS versions url from above
```

```sh
cat >/etc/yum.repos.d/docker.repo <<-EOF
[dockerrepo]
name=Docker Repository
baseurl=https://yum.dockerproject.org/repo/main/$OS/$OS_VERSION
enabled=1
gpgcheck=1
gpgkey=https://yum.dockerproject.org/gpg
EOF

yum install docker-engine
```

---

## How It All Works

The new repos have versions for all different Debian, Ubuntu, Fedora, CentOS, and Oracle Linux distros. You’re probably thinking: ‘that is a lot of debs and rpms to maintain’. It is, but we made it as simple as possible by using Docker to build them.

Each rpm and deb is built inside a Docker container that’s base is the specific distro version. It’s super convenient and a great way to also always be testing Docker.

If you are interested in the actual code used for this, check out:

• [the Dockerfiles for these images (<FontIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/tree/master/contrib/builder)  
•[the code for the deb builds (<FontIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/blob/master/hack/make/build-deb)  
•[rpm builds (<FontIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/blob/master/hack/make/build-rpm)  
•[deb release (<FontIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/blob/master/hack/make/release-deb)  
•[rpm release (<FontIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/blob/master/hack/make/release-rpm)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "New Apt and Yum ReposDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/new-apt-and-yum-repos.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
