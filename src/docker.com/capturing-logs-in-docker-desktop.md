---
lang: en-US
title: "Capturing Logs in Docker DesktopDocker"
description: "Article(s) > Capturing Logs in Docker DesktopDocker"
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
      content: "Article(s) > Capturing Logs in Docker DesktopDocker"
    - property: og:description
      content: "Capturing Logs in Docker DesktopDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/capturing-logs-in-docker-desktop.html
prev: /devops/docker/articles/README.md
date: 2020-01-18
isOriginal: false
author: 
cover: https://docker.com/app/uploads/2020/01/agence-olloweb-d9ILr-dbEdg-unsplash-1110x737.jpg
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
  name="Capturing Logs in Docker DesktopDocker"
  desc="Docker Desktop runs a Virtual Machine to host Docker containers. Each component within the VM (including the Docker engine itself) runs as a separate isolated container. This extra layer of isolation introduces an interesting new problem: how do we capture all the logs so we can include them in Docker Desktop diagnostic reports?"
  url="https://docker.com/blog/capturing-logs-in-docker-desktop"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/01/agence-olloweb-d9ILr-dbEdg-unsplash-1110x737.jpg"/>

![Photo by Agence Olloweb on Unsplash](https://docker.com/app/uploads/2020/01/agence-olloweb-d9ILr-dbEdg-unsplash-1-1110x737.jpg)

Docker Desktop runs a Virtual Machine to host Docker containers. Each component within the VM (including the Docker engine itself) runs as a separate isolated container. This extra layer of isolation introduces an interesting new problem: how do we capture all the logs so we can include them in Docker Desktop diagnostic reports? If we do nothing then the logs will be written separately into each individual container which obviously isn’t very useful!

The Docker Desktop VM boots from an ISO which is built using [<VPIcon icon="iconfont icon-github"/>`linuxkit`](https://github.com/linuxkit) from a list of Docker images together with a list of capabilities and bind mounts. For a minimal example of a LinuxKit VM definition, see [<VPIcon icon="iconfont icon-github"/>https://github.com/linuxkit/linuxkit/blob/master/examples/minimal.yml](https://github.com/linuxkit/linuxkit/blob/master/examples/minimal.yml) — more examples and documentation are available in the LinuxKit repository. The LinuxKit VM in Docker Desktop boots in two phases: in the first phase, the init process executes a series of one-shot “on-boot” actions sequentially using runc to isolate them in containers. These actions typically format disks, enable swap, configure sysctl settings and network interfaces. The second phase contains “services” which are started concurrently and run forever as containerd tasks.

The following diagram shows a simplified **high-level view of the boot process**:

![](https://docker.com/app/uploads/2020/01/blog-img-1.png)

By default the “on-boot” actions’ stdout and stderr are written both to the VM console and files in <VPIcon icon="fas fa-folder-open"/>`/var/log/onboot`.\* while the “services” `stdout` and `stderr` are connected directly to open files in <VPIcon icon="fas fa-folder-open"/>`/var/log` which are left to grow forever.  

Initially we considered adding logging to the VM by running a syslog compatible logging daemon as a regular service that exposes <VPIcon icon="fas fa-folder-open"/>`/dev/log` or a port (or both). Other services would then connect to syslog to write logs. Unfortunately a logging daemon running in a service would start later — and therefore miss all the logs from — the “on-boot” actions. Furthermore, since services start concurrently, there would be a race between the syslog daemon starting and syslog clients starting: either logs would be lost or each client startup would have to block waiting for the syslog service to start. Running a syslog daemon as an “on-boot” action would avoid the race with services, but we would have to choose where to put it in the “on-boot” actions list. Ideally we would start the logging daemon at the beginning so that no logs are lost, but then we would not have access to persistent disks or the network to store the logs anywhere useful.

In summary we wanted to **add a logging mechanism** to Docker Desktop that:

- was able to capture all the logs — both the on-boot actions and the service logs;
- could write the logs to separate files to make them easier to read in a diagnostics report;
- could rotate the log files so they don’t grow forever;
- could be developed within the upstream LinuxKit project; and
- would not force existing LinuxKit users to rewrite their YAML definitions or modify their existing code.

We decided to implement first-class support for logging by adding a “memory log daemon” called memlogd which starts before the first on-boot action and buffers in memory the last few thousand lines of console output from each container. Since it is only buffering in memory, memlogd does not require any network or persistent storage. A log downloader starts later, after the network and persistent storage is available, connects to memlogd and streams the logs somewhere permanent.

As long as the logs are streamed before the in-memory buffer is full, no lines will be lost. The use of memlogd is entirely optional in LinuxKit; if it is not included in the image then logs are written to the console and directly to open files as before.

---

## Design

We decided to use the Go library [<VPIcon icon="fa-brands fa-golang"/>container/ring](https://golang.org/pkg/container/ring/) to create a bounded circular buffer. The buffer is bounded to prevent a spammy logging client consuming too much memory in the VM. However if the buffer does fill, then the oldest log lines will be dropped. The following diagram shows the initial design:

![](https://docker.com/app/uploads/2020/01/blog-img-2.png)

Logging clients send log entries via a file descriptor (labelled “linuxkit-external-logging.sock”). Log downloading programs connect to a query socket (labelled “memlogdq.sock”), read logs from the internal buffer and write them somewhere else.

Recall that one of our design goals was to avoid making changes to each individual container definition to use the new logging system. We don’t want to explicitly bind-mount a logging socket into the container or have to modify the container’s code to connect to it. How then do we capture the output from containers automatically and pass it all to the linuxkit-external-logging.sock?

When an on-boot action or service is launched, the VM’s init system creates a FIFO (for containerd) or a socketpair (for runc) for the stdout and stderr. By convention LinuxKit containers normally write their log entries to stderr. Therefore if we modify the init system, we can capture the logs written to the stderr FIFOs and the socketpairs without having to change the container definition or the code. Once the logs have been captured, the next step is to send them to  memlogd — how do we do that?

A little known feature of Linux is that you can pass open file descriptors to other processes via Unix domain sockets. We can, instead of proxying log lines, just pass an open socket directly to memlogd. We modified the design for memlogd to take advantage of this:

![](https://docker.com/app/uploads/2020/01/blog-img-3.png)

When the container is started, the init system passes the stdout and stderr file descriptors to memlogd along with the name of the container. Memlogd monitors all its file descriptors in a select-loop. When data is available it will be read, tagged with the container name and timestamped before it is appended to the in-memory ringbuffer. When the container terminates, the fd is closed and memlogd removes the fd from the loop.

So this means:

- we don’t have to modify container YAML definitions or code to be aware of the logging system; and
- we don’t have to proxy logs between the container and memlogd.

### Querying memlogd

To see memlogd in action on a Docker Desktop system, try the following command:

```sh
docker run -it --privileged --pid=host \
justincormack/nsenter1 /usr/bin/logread -F \
-socket /run/guest-services/memlogdq.sock
```

This will run a privileged container in the root namespace (containing the “memlogdq.sock” used for querying the logs) and run the utility “logread”, telling it to “follow” the stream i.e. to keep copying from memlogd to the terminal until interrupted. The output looks like this:

```plaintext title="output"
2019-02-22T16:04:23Z,docker;time="2019-02-22T16:04:23Z" level=debug msg="registering ttrpc server"
```

Where the initial timestamp indicates when memlogd received the message and “docker” shows that the log came from the docker service. The rest of the line is the output written to stderr.

### Kernel logs (kmsg)

In Docker Desktop we include the Linux kernel logs in diagnostic reports to help us understand and fix Linux kernel bugs. We created the [kmsg-package (<VPIcon icon="iconfont icon-github"/>`linuxkit/linuxkit`)](https://github.com/linuxkit/linuxkit/tree/master/pkg/kmsg) for this purpose. When this service is started, it will connect to /dev/kmsg, stream the kernel logs and output them to stderr. As the stderr is automatically sent to memlogd, the kernel logs will then also be included in the VM’s logs and will be included in the diagnostic report. Note that reading kernel logs via /dev/kmsg is a privileged operation and so the kmsg service needs the capability CAP_SYSLOG.

### Persisting the logs

In Docker Desktop we persist the log entries to files (one per service), rotate them when they become large and then delete the oldest to avoid leaking space. We created the  [logwrite package (<VPIcon icon="iconfont icon-github"/>`linuxkit/linuxkit`)](https://github.com/linuxkit/linuxkit/tree/6b17ff4ff26bbaa4d419033e1097167be0e35216/pkg/logwrite) for this purpose. When this service is started, it connects to the query socket memlogdq.sock, downloads the logs as they are written and manages the log files.

---

## Summary

We now have a relatively simple and lightweight, yet extendable logging system that provides the features we need in Docker Desktop: it captures logs from both “on-boot” actions and services, and persists logs to files with rotation after the file system has been mounted. We developed the logging system in the upstream [LinuxKit project (<VPIcon icon="iconfont icon-github"/>`linuxkit/linuxkit`)](https://github.com/linuxkit/linuxkit) where we hope the simple and modular design will allow it to be easily extended by other LinuxKit developers.

::: info References

<SiteInfo
  name="linuxkit/docs/logging.md at 6b17ff4ff26bbaa4d419033e1097167be0e35216 · linuxkit/linuxkit"
  desc="A toolkit for building secure, portable and lean operating systems for containers - linuxkit/linuxkit"
  url="https://github.com/linuxkit/linuxkit/blob/6b17ff4ff26bbaa4d419033e1097167be0e35216/docs/logging.md/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/175a2c1296f12a1f549400d94ec38baf461261965107ebf8625fd334c6b1edc5/linuxkit/linuxkit"/>

<SiteInfo
  name="linuxkit/examples/logging.yml at 6b17ff4ff26bbaa4d419033e1097167be0e35216 · linuxkit/linuxkit"
  desc="A toolkit for building secure, portable and lean operating systems for containers - linuxkit/linuxkit"
  url="https://github.com/linuxkit/linuxkit/blob/6b17ff4ff26bbaa4d419033e1097167be0e35216/examples/logging.yml/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/175a2c1296f12a1f549400d94ec38baf461261965107ebf8625fd334c6b1edc5/linuxkit/linuxkit"/>

<SiteInfo
  name="linuxkit/pkg/memlogd/cmd/memlogd at 6b17ff4ff26bbaa4d419033e1097167be0e35216 · linuxkit/linuxkit"
  desc="A toolkit for building secure, portable and lean operating systems for containers - linuxkit/linuxkit"
  url="https://github.com/linuxkit/linuxkit/tree/6b17ff4ff26bbaa4d419033e1097167be0e35216/pkg/memlogd/cmd/memlogd/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/175a2c1296f12a1f549400d94ec38baf461261965107ebf8625fd334c6b1edc5/linuxkit/linuxkit"/>

<SiteInfo
  name="linuxkit/pkg/kmsg at 6b17ff4ff26bbaa4d419033e1097167be0e35216 · linuxkit/linuxkit"
  desc="A toolkit for building secure, portable and lean operating systems for containers - linuxkit/linuxkit"
  url="https://github.com/linuxkit/linuxkit/tree/6b17ff4ff26bbaa4d419033e1097167be0e35216/pkg/kmsg/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/175a2c1296f12a1f549400d94ec38baf461261965107ebf8625fd334c6b1edc5/linuxkit/linuxkit"/>

:::

::: note

This post was joint work with Magnus Skjegstad.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Capturing Logs in Docker DesktopDocker",
  "desc": "Docker Desktop runs a Virtual Machine to host Docker containers. Each component within the VM (including the Docker engine itself) runs as a separate isolated container. This extra layer of isolation introduces an interesting new problem: how do we capture all the logs so we can include them in Docker Desktop diagnostic reports?",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/capturing-logs-in-docker-desktop.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
