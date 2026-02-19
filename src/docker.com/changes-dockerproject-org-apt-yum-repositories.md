---
lang: en-US
title: "Changes to dockerproject.org APT and YUM repositoriesDocker"
description: "Article(s) > Changes to dockerproject.org APT and YUM repositoriesDocker"
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
      content: "Article(s) > Changes to dockerproject.org APT and YUM repositoriesDocker"
    - property: og:description
      content: "Changes to dockerproject.org APT and YUM repositoriesDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/changes-dockerproject-org-apt-yum-repositories.html
prev: /devops/docker/articles/README.md
date: 2020-02-05
isOriginal: false
author: 
  - name: Chris Crone
    url: https://docker.com/contributors/chris-crone/
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
  name="Changes to dockerproject.org APT and YUM repositoriesDocker"
  desc="While many people know about Docker, not that many know its history and where it came from. Docker was started as a project in the dotCloud company, founded by Solomon Hykes, which provided a PaaS solution. The project became so successful that dotCloud renamed itself to Docker, Inc. and focused on Docker as its primary product."
  url="https://docker.com/blog/changes-dockerproject-org-apt-yum-repositories"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

While many people know about Docker, not that many know its history and where it came from. Docker was started as a project in the dotCloud company, founded by Solomon Hykes, which provided a PaaS solution. The project became so successful that [<VPIcon icon="fa-brands fa-docker"/>dotCloud renamed itself to Docker, Inc.](https://docker.com/blog/dotcloud-is-becoming-docker-inc/) and focused on Docker as its primary product.

As the “Docker project” grew from being a proof of concept shown off at various meetups and at PyCon in 2013 to a real community project, it needed a website where people could learn about it and download it. This is why the “dockerproject.org” and “dockerproject.com” domains were registered.

With the move from dotCloud to Docker, Inc. and the shift of focus onto the Docker product, it made sense to move everything to the “docker.com” domain. This is where you now find the [company website](https://docker.com), [documentation](https://docs.docker.com), and of course the APT and YUM repositories at download.docker.com have been there since 2017. On the 31st of March 2020, we will be shutting down the legacy APT and YUM repositories hosted at dockerproject.org and dockerproject.com. These repositories haven’t been updated with the latest releases of Docker and so the packages hosted there contain security vulnerabilities. Removing these repositories will make sure that people download the latest version of Docker ensuring their security and providing the best experience possible

### What do I need to do?

If you are currently using the APT or YUM repositories from dockerproject.org or dockerproject.com, please update to use the repositories at download.docker.com.

You can find instructions for [<VPIcon icon="fa-brands fa-docker"/>CentOS](https://docs.docker.com/install/linux/docker-ce/centos/), [<VPIcon icon="fa-brands fa-docker"/>Debian](https://docs.docker.com/install/linux/docker-ce/debian/), [<VPIcon icon="fa-brands fa-docker"/>Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/) and [<VPIcon icon="fa-brands fa-docker"/>Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/) in the [<VPIcon icon="fa-brands fa-docker"/>documentation](https://docs.docker.com/install/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Changes to dockerproject.org APT and YUM repositoriesDocker",
  "desc": "While many people know about Docker, not that many know its history and where it came from. Docker was started as a project in the dotCloud company, founded by Solomon Hykes, which provided a PaaS solution. The project became so successful that dotCloud renamed itself to Docker, Inc. and focused on Docker as its primary product.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/changes-dockerproject-org-apt-yum-repositories.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
