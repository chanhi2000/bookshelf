---
lang: en-US
title: "Demystifying the Open Container Initiative (OCI) Specifications"
description: "Article(s) > Demystifying the Open Container Initiative (OCI) Specifications"
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
      content: "Article(s) > Demystifying the Open Container Initiative (OCI) Specifications"
    - property: og:description
      content: "Demystifying the Open Container Initiative (OCI) Specifications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/demystifying-open-container-initiative-oci-specifications.html
prev: /devops/docker/articles/README.md
date: 2017-07-19
isOriginal: false
author:
  - name: Stephen Walli
    url : https://docker.com/author/stephen-walli/
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
  name="Demystifying the Open Container Initiative (OCI) Specifications"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/demystifying-open-container-initiative-oci-specifications"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

The Open Container Initiative (OCI) announced the completion of the first versions of the container runtime and image specifications this week. The OCI is an effort under the auspices of the Linux Foundation to develop specifications and standards to support container solutions. A lot of effort has gone into the building of these specifications over the past two years. With that in mind, let’s take a look at some of the myths that have arisen over the past two years.

![OCI](https://docker.com/app/uploads/logo_oci.png)

---

## Myth: The OCI is a replacement for Docker

Standards are important, but they are far from a complete production platform. Take for example, the World Wide Web. It  has evolved over the last 25 years and was built on core dependable standards like TCP/IP, HTTP and HTML. Using TCP/IP as an example, when enterprises coalesced around TCP/IP as a common protocol, it fueled the growth of routers and in particular - Cisco. However, Cisco became a leader in its market by focusing on differentiated features on its routing platform. We believe the parallel exists with the OCI specifications and Docker.

[<FontIcon icon="fa-brands fa-docker"/>Docker is a complete production platform](https://docker.com/) for developing, distributing, securing and orchestrating container-based solutions. The OCI specification is used by Docker, but it represents only about five percent of our code and a small part of the Docker platform concerned with the runtime behavior of a container and the layout of a container image. 

---

## Myth: Products and projects already are certified to the OCI specifications

The runtime and image specifications have just released as 1.0 this week. However, the OCI certification program is still in development so companies cannot claim compliance, conformance or compatibility until certification is formally rolled out later this year.

The OCI [certification working group (<FontIcon icon="iconfont icon-github"/>`opencontainers/certification`)](https://github.com/opencontainers/certification) is currently defining the standard so that products and open source projects can demonstrate conformance to the specifications. Standards and specifications are important for engineers implementing solutions, but formal certification is the only way to reassure customers that the technology they are working with is truly conformant to the standard.

---

## Myth: Docker doesn’t support the OCI specifications work

Docker has a long history with contributing to the OCI. We developed and donated a majority of the OCI code and have been instrumental in defining the OCI runtime and image specifications as maintainers of the project. When the Docker runtime and image format quickly became the de facto standards after being released as open source in 2013, we thought it would be beneficial to donate the code to a neutral governance body to avoid fragmentation and encourage innovation. The goal was to provide a dependable and standardized specification so Docker contributed runc, a simple container runtime, as the basis of the runtime specification work, and later contributed the Docker V2 image specification as the basis for the OCI image specification work.

Docker developers like Michael Crosby and Stephen Day have been key contributors from the beginning of this work, ensuring Docker’s experience hosting and running billions of container images carries through to the OCI. When the certification working group completes its work, Docker will bring its products through the OCI certification process to demonstrate OCI conformance.

---

## Myth: The OCI specifications are about Linux containers

There is a misperception that the OCI is only applicable to Linux container technologies because it is under the aegis of the Linux Foundation. The reality is that although Docker technology started in the Linux world, Docker has been collaborating with Microsoft to bring our container technology, platform and tooling to the world of Windows Server. Additionally, the underlying technology that Docker has donated to the OCI is broadly applicable to  multi-architecture environments including Linux, Windows and Solaris and covers x86, ARM and IBM zSeries.

---

## Myth: Docker was just one of many contributors to the OCI

The OCI as an organization has a lot of supporting members representing the breadth of the container industry. That said, it has been a small but dedicated group of individual technologists that have contributed the time and technology to the efforts that have produced the initial specifications. Docker was a founding member of the OCI, contributing the initial code base that would form the basis of the runtime specification and later the reference implementation itself. Likewise, Docker contributed the Docker V2 Image specification to act as the basis of the OCI image specification.

---

## Myth: CRI-O is an OCI project

CRI-O is an open source project in the Kubernetes incubator in the Cloud Native Computing Foundation (CNCF) - it is not an OCI project. It is based on an earlier version of the Docker architecture, whereas containerd is a direct CNCF project that is a larger container runtime that includes the runc reference implementation. containerd is responsible for image transfer and storage, container execution and supervision, and low-level functions to support storage and network attachments. Docker donated containerd to the CNCF with the support of the five largest cloud providers: Alibaba Cloud, AWS, Google Cloud Platform, IBM Softlayer and Microsoft Azure with a charter of being a core container runtime for multiple container platforms and orchestration systems.

---

## Myth: The OCI specifications are now complete

While the release of the runtime and image format specifications is an important milestone, there’s still work to be done. The initial scope of the OCI was to define a narrow specification on which developers could depend for the runtime behavior of a container, preventing fragmentation in the industry, and still allowing innovation in the evolving container domain. This was later expanded to include a container image specification.

As the working groups complete the first stable specifications for runtime behavior and image format, new work is under consideration. Ideas for future work include distribution and signing. The next most important work for the OCI, however, is delivering on a certification process backed by a test suite now that the first specifications are stable.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Demystifying the Open Container Initiative (OCI) Specifications",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/demystifying-open-container-initiative-oci-specifications.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
