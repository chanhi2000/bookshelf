---
lang: en-US
title: "Docker 1.10: New Compose file, improved security, networking and much more!"
description: "Article(s) > Docker 1.10: New Compose file, improved security, networking and much more!"
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
      content: "Article(s) > Docker 1.10: New Compose file, improved security, networking and much more!"
    - property: og:description
      content: "Docker 1.10: New Compose file, improved security, networking and much more!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-1-10.html
prev: /devops/docker/articles/README.md
date: 2016-02-05
isOriginal: false
author:
  - name: Docker Core Engineering
    url : https://docker.com/author/core_eng/
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
  name="Docker 1.10: New Compose file, improved security, networking and much more!"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/docker-1-10"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

We’re pleased to announce Docker 1.10, jam-packed with stuff you’ve been asking for.

It’s now much easier to define and run complex distributed apps with Docker Compose. The power that Compose brought to orchestrating containers is now available for setting up networks and volumes. On your development machine, you can set up your app with multiple network tiers and complex storage configurations, replicating how you might set it up in production. You can then take that same configuration from development, and use it to run your app on CI, on staging, and right through into production. Check out the blog post about the new Compose file to find out more.

As usual, we’ve got a load of security updates in this release. All the big features you’ve been asking for are now available to use: user namespacing for isolating system users, seccomp profiles for filtering syscalls, and an authorization plugin system for restricting access to Engine features.

Another big security enhancement is that image IDs now represent the content that is inside an image, in a similar way to how Git commits represent the content inside commits. This means you can guarantee that the content you’re running is what you expect by just specifying that image’s ID. **When upgrading to Engine 1.10, there is a migration process that could take a long time**, so [<VPIcon icon="fa-brands fa-docker"/>take a read of the documentation if you want to prevent downtime](https://docs.docker.com/engine/migration/).

---

## Networking gets even better

We added a new networking system in the previous version of Docker Engine. It allowed you to create virtual networks and attach containers to them so you could create the network topology that was best for your application. In addition to the support in Compose, we’ve added some other top requested features:

- **Use links in networks:** Links work in the default bridge network as they have always done, but you couldn’t use them in networks that you created yourself. We’ve now added support for this so you can define the relationships between your containers and alias a hostname to a different name inside a specific container (e.g. `--link db:production_postgres`)
- **Network-wide container aliases:** Links let you alias a hostname for a specific container, but you can now also make a container accessible by multiple hostnames across an entire network.
- **Internal networks:** Pass the `--internal` flag to `network create` to restrict traffic in and out of the network.
- **Custom IP addresses:** You can now give a container a custom IP address when running it or adding it to a network.
- **DNS server for name resolution:** Hostname lookups are done with a DNS server rather than `/etc/hosts`, making it much more reliable and scalable. [Read the feature proposal and discussion (<VPIcon icon="iconfont icon-github"/>`docker/libnetwork`)](https://github.com/docker/libnetwork/issues/767).
- **Multi-host networking on all supported Engine kernel versions:** The multi-host overlay driver now works on older kernel versions (3.10 and greater).

---

## Engine 1.10

Apart from the new security and networking features, we’ve got a whole load of new stuff in Engine:

- **Content addressable image IDs:** Image IDs now represent the content that is inside an image, in a similar way to how Git commit hashes represent the content inside commits. This means you can guarantee that the content you’re running is what you expect by just specifying that image’s ID. This is an improvement upon the image digests in Engine 1.6. There is a migration process for your existing images which might take a long time, so [<VPIcon icon="fa-brands fa-docker"/>take a read of the documentation if you want to prevent downtime](https://docs.docker.com/engine/migration/)**.**
- **Better event stream:** The `docker events` command and events API endpoint has been improved and cleaned up. Events are now consistently structured with a resource type and the action being performed against that resource, and events have been added for actions against volumes and networks. [<VPIcon icon="fa-brands fa-docker"/>Full details are in the docs.](https://docs.docker.com/engine/reference/commandline/events/)
- **Improved push/pull performance and reliability:** Layers are now pushed in parallel, resulting in much faster pushes (as much as 3x faster). Pulls are a bit faster and more reliable too - with a streamlined protocol and better retry and fallback mechanisms.
- **Live update container resource constraints:** When setting limits on what resources containers can use (e.g. memory usage), you had to restart the container to change them. You can now update these resource constraints on the fly with the new `docker update` command.
- **Daemon configuration file:** It’s now possible to configure daemon options in a file and reload some of them without restarting the daemon so, for example, you can set new daemon labels and enable debug logging without restarting anything.
- **Temporary filesystems:** It’s now really easy to create temporary filesystems by passing the `--tmpfs` flag to `docker run`. This is particularly useful for running a container with a read-only root filesystem when the piece of software inside the container expects to be able to write to certain locations on disk.
- **Constraints on disk I/O:** Various options for setting constraints on disk I/O have been added to `docker run`: `--device-read-bps`, `--device-write-bps`, `--device-read-iops`, `--device-write-iops`, and `--blkio-weight-device`.
- **Splunk logging driver:** Ship container logs straight to the [<VPIcon icon="iconfont icon-splunk"/>Splunk logging service](http://blogs.splunk.com/2015/12/16/splunk-logging-driver-for-docker/).
- **Start linked containers in correct order when restarting daemon:** This is a little thing, but if you’ve run into it you’ll know what a headache it is. If you restarted a daemon with linked containers, they sometimes failed to start up if the linked containers weren’t running yet. Engine will now attempt to start up containers in the correct order.

Check out the release notes for the full list. There are a few features being deprecated in this release, and we’re ending support for Fedora 21 and Ubuntu 15.04, so be sure to check the release notes in case you’re affected by this. If you have written a volume plugin, [there’s also a change in the volume plugin API that you need to be aware of (<VPIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/pull/16534).

Big thanks to all of the people who made this release happen -in particular to [Qiang Huang (<VPIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/pull/15078), [Denis Gladkikh (<VPIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/pull/16488), [Dima Stopel, and Liron Levin (<VPIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/pull/15365).

The easiest way to try out Docker in development is by [<VPIcon icon="fa-brands fa-docker"/>installing Docker Toolbox](https://docker.com/products/docker-toolbox). For other platforms, [<VPIcon icon="fa-brands fa-docker"/>check out the installation instructions in the documentation](https://docs.docker.com/engine/installation/).

---

## Swarm 1.1

Docker Swarm is native clustering for Docker. It makes it really easy to manage and deploy to a cluster of Engines. Swarm is also the clustering and scheduling foundation for the [<VPIcon icon="fa-brands fa-docker"/>Docker Universal Control Plane](https://docker.com/products), an on-premises tool for deploying and managing Docker applications and clusters.

Back in November we announced the first production-ready version of Swarm, version 1.0. This release is an incremental improvement, especially adding a few things you’ve been asking us for:

- **Reschedule containers when a node fails:** If a node fails, Swarm can now optionally attempt to reschedule that container on a healthy node to keep it running. This is an experimental feature, so don’t expect it to work perfectly, but please do give it a try!
- **Better node management:** If Swarm fails to connect to a node, it will now retry instead of just giving up. It will also display the status of this and any error messages in `docker info`, making it much easier to debug. [<VPIcon icon="fa-brands fa-docker"/>Take a look at the feature proposal for full details](https://github.com/docker/swarm/issues/1486).

[<VPIcon icon="fa-brands fa-docker"/>Check out the release notes for the full list](https://github.com/docker/swarm/releases/tag/v1.1.0) and [<VPIcon icon="fa-brands fa-docker"/>the documentation for how to get started](https://docs.docker.com/swarm/overview/).

### And save the date for Swarm Week - Coming Soon!

If you are new to Swarm or are familiar and want to know more, Swarm Week is the place for you get ALL your Swarm information in a single place. We will feature a different Swarm related topic each day.

[<VPIcon icon="fa-brands fa-docker"/>Sign up here](https://goto.docker.com/swarm-week.html) to be notifiedof #SwarmWeek!

---

## Machine 0.6

Machine is at the heart of Docker Toolbox, and a big focus of Machine 0.6 has been making it much more reliable when you’re using it with VirtualBox and running it on Windows. This should make the experience of using Toolbox much better.

There have also been a couple of new features for Machine power users:

- **No need to type “default”:** Commands will now perform actions against the “default” VM if you don’t specify a name.
- **New provision command:** This is useful for re-running the provisioning on hosts where it failed or the configuration has drifted.

[For full details, check out the release notes (<VPIcon icon="iconfont icon-github"/>`docker/machine`)](https://github.com/docker/machine/releases/tag/v0.6.0). The easiest way to install Machine is by [<VPIcon icon="fa-brands fa-docker"/>installing Docker Toolbox](https://docker.com/products/docker-toolbox). Other installation methods are [<VPIcon icon="fa-brands fa-docker"/>detailed in the documentation](https://docs.docker.com/machine/install-machine/).

---

## Registry 2.3

In Registry 2.3, we’ve got a bunch of improvements to performance and security. It has support for the new manifest format, and makes it possible for layers to be shared between different images, improving the performance of push for layers that already exist on your Registry.

[Check out the full release notes here (<VPIcon icon="iconfont icon-github"/>`docker/distribution`)](https://github.com/docker/distribution/releases/tag/v2.3.0) and [<VPIcon icon="fa-brands fa-docker"/>see the documentation for how to install or upgrade](https://docs.docker.com/registry/).

::: info Watch this video overview on the new features in the Docker 1.10

<VidStack src="youtube/OsOLF3_fotM" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker 1.10: New Compose file, improved security, networking and much more!",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-1-10.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
