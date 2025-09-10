---
lang: en-US
title: "Road to containing iSCSI"
description: "Article(s) > Road to containing iSCSI"
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
      content: "Article(s) > Road to containing iSCSI"
    - property: og:description
      content: "Road to containing iSCSI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/road-to-containing-iscsi.html
prev: /devops/docker/articles/README.md
date: 2019-07-16
isOriginal: false
author:
  - name: Anusha Ragunathan
    url : https://docker.com/author/anusha-ragunathan/
cover: https://docker.com/app/uploads/engineering/2019/07/blog_iSCSI_components-1-533x300.png
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
  name="Road to containing iSCSI"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/road-to-containing-iscsi"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/engineering/2019/07/blog_iSCSI_components-1-533x300.png"/>

iSCSI is a popular protocol for block-level storage access, where the iSCSI initiator (client) communicates with an iSCSI target (storage server) over the network. The iSCSI target provides storage to the initiator in the form of one or more LUNs.

iSCSI can be leveraged to provide persistent storage to containerized workloads. In Kubernetes, iSCSI initiator operations are managed by processes running directly on the worker nodes. But there are situations where managing such initiator operations from within containers becomes essential. Developing storage plugins as a container for Container Orchestrators and running the kubelet within a container are popular use cases. For example, currently Docker Kubernetes Service (DKS) runs the kubelet as a container and provides support for the in-tree (shipped with Kubernetes) iSCSI plugin for Linux workloads.

However iSCSI components were not designed with containers in mind, which makes managing iSCSI from within containers tricky. In this blog, we are sharing the different options that were explored to be able to containerize iSCSI on Linux.

---

## iSCSI components overview

To provide iSCSI support, Kubernetes relies on the standard Linux iSCSI implementation, [<VPIcon icon="iconfont icon-github"/>`open-iscsi/open-iscsi`](https://github.com/open-iscsi/open-iscsi). open-iscsi packages are expected to be installed on cluster nodes. The `open-iscsi` package provides:

- iscsiadm – the iSCSI management tool
- iscsid – the iSCSI daemon process

The iSCSI kernel modules implementing the data path are loaded and managed as part of the host kernel.

Kubernetes uses *iscsiadm* to execute iSCSI commands on the node. For example, `kubelet` performs the attach and detach of a persistent volume to a node as well as the mount and unmount of a persistent volume to a pod by *exec-ing iscsiadm* commands. Apart from the in-tree plugin, iSCSI is also supported by [<VPIcon icon="fas fa-globe"/>CSI](https://kubernetes-csi.github.io/docs/) (Container Storage Interface) plugins.  
*iscsiadm* works in conjunction with iscsid and the iscsi kernel modules. *iscsiadm* and *iscsid* communicate over a Unix domain socket. *iscsid* communicates with the kernel modules over a [<VPIcon icon="fas fa-globe"/>netlink](http://man7.org/linux/man-pages/man7/netlink.7.html) socket. It’s worth mentioning that the netlink control code in the kernel is [<VPIcon icon="fa-brands fa-google"/>not network namespace aware](https://groups.google.com/forum/#!msg/open-iscsi/kgjck_GixsM/U_FqTbYhCgAJ) (1)

![blog iSCSI components 1](https://docker.com/app/uploads/engineering/2019/07/blog_iSCSI_components-1-533x300.png)

---

## The case for containers

There are some cases where the call to the *iscsiadm* binary is made from a container and not from a host process. For the rest of this blog, we will refer to such containers as “iscsiadm containers”. Popular use cases for managing iSCSI from a container are:

### Containerized `kubelet`

Kubelet runs as a container. Typically `kubelet` runs as a host process. However, containerizing Kubernetes components has widely helped in the ease of binary distribution and having a uniform predictable setup. It has also proven invaluable in dev/test environments. In such cases, the `kubelet` alongside other Kubernetes components, runs in a container.

### Containerized CSI plugin

Typically, there are two components to a CSI Volume Plugin, the Controller plugin and the Node plugin. It’s common practice for such plugins to be deployed as Kubernetes Deployments (Controller plugin) and Daemonsets (Node plugin). Hence, a CSI plugin supporting iSCSI should be distributed as a container capable of issuing *iscsiadm* commands. Note that *iscsiadm* is invoked by the CSI Node plugin.

---

## open-iscsi in various distributions

Most modern Linux distros use the [<VPIcon icon="iconfont icon-github"/>`open-iscsi/open-iscsi`](https://github.com/open-iscsi/open-iscsi) project to build their iSCSI packages. Different distros use different versions of *open-iscsi.* Some versions of `open-iscsi` have additional library dependencies. Our experiments revealed the following:

- open-iscsi version 2.0.874 introduced a dependency on a new library, *libisns0*, an implementation of the Internet Storage Name Service (iSNS). For example, this version of `open-iscsi` is used by Ubuntu 18.04.
- open-iscsi version 2.0.876 introduced a dependency on a new library, *libopeniscsiusr,* iSCSI user level library. For example, this version of `open-iscsi` is shipped as part of SLES 15. These dependencies imply that the container should have access to the libraries as well.

---

## Choices for packaging and runtime

There are several options to package and run the iSCSI components. We ran experiments on an array of Linux distros with different base images for the *iscsiadm container.* We’ve outlined our findings in the following three options:

### Option 1

Install `open-iscsi` package in the *iscsiadm container*. Run the container:

- with SYS_MODULE capability to load kernel modules (`docker run –cap-add SYS_MODULE`).
- in the host network namespace. Due to (1) above, a container running iscsid should have access to the host network namespace

Invoke *iscsid* and *iscsiadm* in the container.

::: warning Cons:

- Running the container in the host network namespace means that there can be only one iscsid instance running, because iscsid from the host will interfere with iscsid from the container and vice versa. So care is required to ensure that the host does not run iscsid and additionally remove any iscsi packages from the host. Some Linux distros have iscsid enabled and running by default (eg. Ubuntu 16.04 Amazon Machine Image (AMI)). In such cases, it blocks the netlink socket communication and prevents another instance of iscsid starting from the container. Also, on systemd based distros, systemd socket activation on the host keeps the socket busy, even if the service is not running. So the entire iscsi host package has to be removed from the host. ( eg. `yum remove iscsi-initiator-tools` or `apt-get remove open-iscsi`).
  - Loading kernel modules is done using the *kmod* (insmod/modprobe are symlinks to kmod) binary. The kmod version on the *iscsiadm container* image and the host may be different. For example, on a RHEL 7.5 host and an ubuntu 18.04 *iscsiadm container* image, the kmod versions are 20 and 24 respectively. As a result, modprobing the `iscsi_tcp` module from the container results in exec format error due to potential backward compatibility issues in kmod:

![blog modprobe](https://docker.com/app/uploads/engineering/2019/07/blog_modprobe-730x43.png)

Hence, the kernel modules have to be managed from the host and the control plane components (iscsiadm and iscsid) have to be managed by the container. This is not a clean design.

- Running a system daemon such as *iscsid* as part of a container intended for a different purpose (eg, kubelet, CSI node plugin binaries) breaks the golden containerization rule around one-application-per-container.

### Option 2

Install `open-iscsi` on the host, run iscsid on the host. Install `open-iscsi` on the container and invoke iscsiadm from the container. Run the container in the host network namespace. Here, the *iscsiadm container* accesses the host’s iscsid which is possible due to both processes running in the same network namespace.

:::: warning Cons:

- There is no standard protocol that governs communication between arbitrary versions of *iscsiadm* and *iscsid*. In our tests across popular distributions, it appeared that the *iscsiadm* binary only works with *iscsid* binaries from the same version of the package. This binary compatibility cannot be guaranteed while working across different Linux host distributions.

:::

### Option 3

Install open-iscsi on the host, run iscsid on the host. Run the container bind mounted with host root filesystem (`docker run -v /:/host <container> <entrypoint>`). Then use either of these solutions:

- Symlink iscsiadm and iscsi database from the host into the container filesystem as part of the container’s entrypoint script. Add the host library paths to the container’s library path configuration so that host libraries are included in the search path.

![blog hostlinks](https://docker.com/app/uploads/engineering/2019/07/blog_hostlinks-730x165.png)

- Create a chroot environment for iscsiadm with root set to host root filesystem and PATH set to appropriate host bin directories. Add this to a script named “iscsiadm”

![blog netapp chroot](https://docker.com/app/uploads/engineering/2019/07/blog_netapp_chroot-730x62.png)

Add this file to the container image and grant the right permissions.

![blog netapp add](https://docker.com/app/uploads/engineering/2019/07/blog_netapp_add-730x85.png)

This ensures that every invocation of *iscsiadm* by the container calls the above chroot script. [<VPIcon icon="iconfont icon-github"/>`NetApp/trident`](https://github.com/NetApp/trident) uses this solution to containerize their Docker Volume Plugin.

::: warning Cons:

Container needs host rootfs (or specific host system directories such as <VPIcon icon="fas fa-folder-open"/>`/sbin`, <VPIcon icon="fas fa-folder-open"/>`/usr/sbin`, <VPIcon icon="fas fa-folder-open"/>`/etc`, <VPIcon icon="fas fa-folder-open"/>`/lib64`, <VPIcon icon="fas fa-folder-open"/>`/usr/lib64`, etc) to be bind mounted.

:::

::: info Pros:

This is a clean and non-intrusive option.

:::

Options 1 and 2 do not work when multiple Linux host distributions need to be supported in your solution. Option 3 is a clean way to support containerized iSCSI environments across a heterogeneous set of Linux distros. Choosing option 3 above ensures that dependencies in different Linux host distros are handled correctly.

Running into roadblocks while containerizing iSCSI environments is expected. We ran into several while building iSCSI support for Docker Enterprise 3.0 and have documented our research and best practices here. We hope that this is a useful guide for storage plugin authors and upstream kubernetes developers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Road to containing iSCSI",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/road-to-containing-iscsi.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
