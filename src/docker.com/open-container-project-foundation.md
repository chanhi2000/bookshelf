---
lang: en-US
title: "Docker and Broad Industry Coalition Unite to Create Open Container ProjectDocker"
description: "Article(s) > Docker and Broad Industry Coalition Unite to Create Open Container ProjectDocker"
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
      content: "Article(s) > Docker and Broad Industry Coalition Unite to Create Open Container ProjectDocker"
    - property: og:description
      content: "Docker and Broad Industry Coalition Unite to Create Open Container ProjectDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/open-container-project-foundation.html
prev: /devops/docker/articles/README.md
date: 2015-06-23
isOriginal: false
author:
  - name: Ben Golub
    url : https://docker.com/author/ben/
cover: https://docker.com/app/uploads/2015/06/otp.png
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
  name="Docker and Broad Industry Coalition Unite to Create Open Container ProjectDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/open-container-project-foundation"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2015/06/otp.png"/>

This morning, Docker, along with a broad coalition of vendors, users, start-ups, and industry leaders, made one of the more significant [announcements][^1] in the history of containerization. In brief, we are coming together to form a minimalist, non-profit, openly governed project, [<FontIcon icon="fas fa-globe"/>The Open Container Project](https://opencontainers.org), under the auspices of the [<FontIcon icon="fas fa-globe"/>Linux Foundation](https://linuxfoundation.org) for the express purpose of defining common specifications around container format and runtime. Docker will be donating both our base container format and runtime, **runC**[^2], to this project, to help form the cornerstone for the new technology. And, in a particularly exciting recent development, the talented people behind [<FontIcon icon="iconfont icon-github"/>`appc`](https://github.com/appc)are now joining us as co-founders.  

Participants include, basically, everyone from A to V in the tech industry. This is 20+ organizations including Apcera, AWS, Cisco, CoreOS, Docker, EMC, Fujitsu Limited , Google, Goldman Sachs, HP, Huawei, IBM, Intel, Joyent, Pivotal, the Linux Foundation, Mesosphere, Microsoft, Rancher Labs, Red Hat, and VMware.

I am especially grateful that Alex Polvi and Brandon Phillips from CoreOS, the founders of appc, will be joining the OCP, as it speaks volumes about our common desire to help unite the industry and to take the best ideas, wherever they originated, into something that provides the best outcomes for users and the industry.

![otp](https://docker.com/app/uploads/2015/06/otp.png) 

---

## Why

While Docker has changed a lot since launching in March of 2013, a few key principles have always held:

Design based on Unix principles for composability and simplicity  

Emphasize the ecosystem

Do what’s best for the user

We see this effort as serving all of these goals.

First, by explicitly separating “the box” from the tools that build, ship, and run those boxes, we think we fundamental help preserve those values of composability and simplicity. We like simple, clear, modular, and extensible code that can be easily maintained and repurposed by developers other than its creators. A simple runtime that is well specified that can call and manipulate a well documented, standard format speaks to this view.

Second, this effort will allow the ecosystem as a whole to focus on innovation at the layers that matter, rather than wasting time fighting a low level standards war. There are now over 40,000 Docker-based tools and over 150,000 Docker based applications that have been downloaded over 500M times. Docker (and containerization in general) is a community and ecosystem effort. This helps keep that ecosystem from fragmenting. This is especially important at time when Docker & containers in general are expanding beyond 64 bit Linux to multiple architectures and operating systems, including 32 bit, Power, Z, Windows and SmartOS.

Third, and most importantly, this is the right thing for users. They can fully commit to Docker, CoreOS or other great technologies today without worrying that their current choice of any particular infrastructure, cloud provider, devops tool, etc. will lock them into any technology vendor for the long run. Instead, their choices can be guided by choosing the best damn tools to build the best damn applications they can. Equally importantly, they will benefit by having the industry focus on innovating and competing at the levels that truly make a difference. To use an old analogy, why argue about the width of train tracks, when you can worry about laying track and building the best possible engines? Ultimately, we want to make sure that the original promise of Docker -portability, interoperability, and agility—aren’t lost as we move to a world of applications built from multiple containers run using a diverse set of tools across a diverse set of infrastructures.

---

## What

A lot of the details of this initiative can be found at [<FontIcon icon="fas fa-globe"/>opencontainers.org](https://opencontainers.org). This includes both reference code and draft specifications, as well as the details on the proposed governance structure. In brief, though, we are donating all of donating both a draft specification for the base format and runtime and the code associated with a reference implementation of that specification, to the OCP. Docker has taken the entire contents of the libcontainer project, including `nsinit`, and all modifications needed to make it run independently of Docker, and donated it to this effort. This codebase, called runC, can be found at github/opencontainers/runc. libcontainer will cease to operate as a separate project. The current maintainers of libcontainer-[Michael Crosby (<FontIcon icon="fa-brands fa-x-twitter"/>`crosbymichael`)](http://twitter.com/crosbymichael), [Rohit Jnagal (<FontIcon icon="fa-brands fa-x-twitter"/>`rgnagal`)](http://twitter.com/rgnagal), [Victor Marmol (<FontIcon icon="fa-brands fa-x-twitter"/>`vmarmol`)](https://twitter.com/vmarmol), [Mrunal Patel (<FontIcon icon="fa-brands fa-x-twitter"/>`mrunalp`)](https://twitter.com/mrunalp), [Alexandr Morozov (<FontIcon icon="fa-brands fa-x-twitter"/>`LK4D4`)](https://twitter.com/LK4D4), [Daniel Minh (Independent)](https://twitter.com/LK4D4), and [Tianon Gravi (<FontIcon icon="fa-brands fa-x-twitter"/>`tianon`)](https://twitter.com/tianon)— will be joined by prominent appc maintainers [Brandon Philips (<FontIcon icon="fa-brands fa-x-twitter"/>`philips`)](https://twitter.com/philips) and [Vincent Batts (<FontIcon icon="fa-brands fa-x-twitter"/>`vbatts`)](https://twitter.com/vbatts) to drive the project forward. Of course, we look forward to growing both the contributor and maintainer list in the weeks and years to come.

### Avoiding bloat in governance as well as code

While the list of industry participants is large, we have taken some very deliberate steps to keep this from unnecessarily slowing down progress. First, the scope of this initiative is intentionally minimal. We are trying to define container formats and runtime—not define an entire technology stack, build a big marketing machine, etc. Second, the effort is structured so that the decision making is done by the community of maintainers and coders. Rather than creating a big foundation, we are structuring this as a lightweight project under the Linux Foundation. A technical advisory board of individuals who are not affiliated with any vendors will provide oversight, but will not be involved in day to day activities. Similarly, you will note that we have prominent users (not vendors) and startups involved from day 1. By keeping it vendor neutral, we can avoid partisan infighting that has harmed similar initiatives.

### What about the name?

Yes, we know that “open container” may have multiple connotations to North American audiences. But, we feel that the association of openness is worth it, as are the obvious parallels to .ovf. In the meantime, we are thinking of taglines like, “The one place you can *drive* with open containers. (Feel free to send your suggestions.) Given the open source mantra, “Free Like Speech, not Free Like beer,” we figure there should be parallels.

![duff](https://docker.com/app/uploads/2015/06/duff-300x206.png)

### What does this mean for Docker?

While creating a standard container was one of Docker’s early goals, the low-level container “plumbing” in what we are donating today represents about 5% of the total Docker code base. The Docker client, engine, daemon, orchestration tools, etc. will continue to live at Docker. We will continue to provide a well-integrated tool chain for developers. We are purposely not trying to standardize the many things which are in areas where there is still a diversity of opinions and approaches.

---

## Thank you’s

We’d like to thank the many people in the industry who came together to support this important initiative. Getting such a broad group of people together to agree on anything is not easy. Of course, we need to thank Jim Zemlin and the folks at the Linux Foundation, both for the incredible work they have done in pulling this together and the invaluable role they have played as an honest broker. We’d also like to thank Red Hat and Microsoft for their early leadership; given the criticality of the intersection of containers and operating system. I’d also like to thank IBM and Intel for their ongoing encouragement of open governance. Finally, we all should recognize the members of the appc community, including CoreOS, for their willingness to work with all of us to constructively move the industry forward.

[^1]: Libcontainer provides a native Go implementation for creating containers with namespaces, cgroups, capabilities, and filesystem access controls. It allows you to manage the lifecycle of the container performing additional operations after the container is created.
[^2]: For more details on runC, see [**Solomon’s blog post**](/docker.com/runc.md).  

::: info Learn More about the Docker News from DockerCon 2015

<SiteInfo
  name="Docker Online Meetup #21: DockerCon Recap, Mon, Jun 29, 2015, 10:00 AM   | Meetup"
  desc="Docker HQ is buzzing with excitement. By now you may have seen numerous blog posts, tweets, and general noise surrounding DockerCon. In case you are not able to join us in "
  url="https://meetup.com/docker-online-meetup/events/222855066//"
  logo="https://secure.meetupstatic.com/next/images/general/m_swarm_196x196.png"
  preview="https://secure.meetupstatic.com/photos/event/c/b/8/d/600_505012109.jpeg"/>

Join our next Docker online meetup recapping all of the news from DockerCon including demos of the latest features of Docker 1.7. The meetup is on Monday, June 29 at 10:00 PDT / 19:00 CEST - [<FontIcon icon="fas fa-globe"/>click here](http://meetup.com/Docker-Online-Meetup/events/222855066/) to register!

:::

```component VPCard
{
  "title": "Docker and Broad Industry Coalition Unite to Create Open Container ProjectDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/open-container-project-foundation.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
