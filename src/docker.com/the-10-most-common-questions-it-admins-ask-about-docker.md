---
lang: en-US
title: "The 10 Most Common Questions IT Admins ask About DockerDocker"
description: "Article(s) > The 10 Most Common Questions IT Admins ask About DockerDocker"
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
      content: "Article(s) > The 10 Most Common Questions IT Admins ask About DockerDocker"
    - property: og:description
      content: "The 10 Most Common Questions IT Admins ask About DockerDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/the-10-most-common-questions-it-admins-ask-about-docker.html
prev: /devops/docker/articles/README.md
date: 2016-07-28
isOriginal: false
author:
  - name: Chris Hines
    url : https://docker.com/author/chrishines/
cover: https://docker.com/app/uploads/2022/12/admins-ask-about-docker-1.jpeg
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
  name="The 10 Most Common Questions IT Admins ask About DockerDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/the-10-most-common-questions-it-admins-ask-about-docker"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2022/12/admins-ask-about-docker-1.jpeg"/>

![admins ask about docker 1](https://docker.com/app/uploads/2022/12/admins-ask-about-docker-1.jpeg)

Over the past few months we have attended a string of industry tradeshow events, helping to teach the world about [<VPIcon icon="fa-brands fa-docker"/>Docker for enterprise.](https://docker.com/enterprise) We were at HPE Discover, DockerCon, RedHat Summit and Cisco Live all within the past 6weeks! I had the pleasure of helping to represent Docker at each events and spoke with attendees. Some folks worked in IT ops, while others worked in development. I also spoke with a lot of folks working as IT admins within their company’s infrastructure team, and over time, I began to notice some trends when it came to the types of questions they asked. This got me thinking. Why not put together a list of the most common questions from IT administrators? I mean there’s a good chance there are other IT infrastructure folks out there who have the very same questions, right?

So here it is. The list IT admins have being waiting for. The ten most common questions (and their answers) from IT Admins.

::: details 1. So what exactly is Docker? Something about “container applications” right?

Docker is an open platform that both IT operations teams and Developer team use to build, ship and run their applications, giving them the agility, portability and control that each team requires across the software supply chain. We have created a standard Docker container that packages up an application, with everything that the applications requires to run. This standardization allows teams to containerize applications and run them in any environment, on any infrastructure and to be written in any language

:::

::: details 2. What is a Docker container and how is it different than a VM? Does containerization replace my virtualization infrastructure?

Containerization is very different from virtualization. It starts with the Docker engine, the tool that creates and runs containers (1 or more), and is the Docker installed software on any physical, virtual or cloud host with a compatible OS. Containerization leverages the kernel within the host operating system to run multiple root file systems. We call these root file systems “containers.” Each container shares the kernel within the host OS, allowing you to run multiple Docker containers on the same host. Unlike VMs, containers do not have an OS within it. They simply share the underlying kernel with the other containers. Each container running on a host is completely isolated so applications running on the same host are unaware of each other (you can use Docker Networking to create a multi-host overlay network that enables containers running on hosts to speak to one another).

The image below shows containerization on the left and virtualization on the right. Notice how containerization (left), unlike virtualization (right) does not require a hypervisor or multiple OSs.

![admins ask about docker 2](https://docker.com/app/uploads/2022/12/admins-ask-about-docker-2.png)

Docker containers and traditional VMs are not mutually exclusive, so no, containers do not have to replace VMs. Docker containers can actually run within VMs. This allows teams to containerize each service and run multiple Docker containers per vm.

![admins ask about docker 3](https://docker.com/app/uploads/2022/12/admins-ask-about-docker-3.png)

:::

::: details 3. What’s the benefit of “Dockerizing?”…

By Dockerizing their environment enterprise teams can leverage the Docker Containers as a Service Platform (CaaS). CaaS gives development teams and IT operations teams agility, portability and control within their environment.

Developers love Docker because it gives them the ability to quickly build and ship applications. Since Docker containers are portable and can run in any environment (with Docker Engine installed on physical, virtual or cloud hosts), developers can go from dev, test, staging and production seamlessly, without having to recode. This accelerates the application lifecycle and allows them to release applications 13x more often. Docker containers also makes it super easy for developers to debug applications, create an updated image and quickly ship an updated version of the application.

IT Ops teams can manage and secure their environment while allowing developers to build and ship apps in a self-service manner. The Docker CaaS platform is supported by Docker, deploys on-premises and is chock full of enterprise security features like role-based access control, integration with LDAP/AD, image signing and many more.

In addition, IT ops teams have the ability to manage deploy and scale their Dockerized applications across any environment. For example, the portability of Docker containers allows teams to migrate workloads running in AWS over to Azure, without having to recode and with no downtime. Team cans also migrate workloads from their cloud environment, down to their physical datacenter, and back. This enables teams to utilize the best infrastructure for their business needs, rather than being locked into a particular infrastructure type.

The lightweight nature of Docker containers compared to traditional tools like virtualization, combined with the ability for Docker containers to run within VMs, allowing teams to optimize their [<VPIcon icon="fa-brands fa-youtube"/>infrastructure by 20X,](https://youtu.be/cJEFE1qnMS8?list=PLkA60AVN3hh9hh7lbvw_FKS83HRJonv6h) and save money in the process.

:::

::: details 4. From an infrastructure standpoint, what do I need from Docker? Is Docker a piece of hardware running in my datacenter, and how taxing is it on my environment?

The Docker engine is the software that is installed on the host (bare metal server, VM or public cloud instance) and is the only “Docker infrastructure” you’ll need. The tool creates, runs and manages Docker containers. So actually, there is no hardware installation necessary at all.

The Docker Engine itself is very lightweight, weighing in around 80 MB total.

:::

::: details 5. What exactly do you mean by “Dockerized node”? Can this node be on-premises or in the cloud?

A Dockerized node is anything i.e a bare metal server, VM or public cloud instance that has the Docker Engine installed and running on it.

Docker can manage nodes that exist on-premises as well as in the cloud. [<VPIcon icon="fa-brands fa-docker"/>Docker Datacenter](https://docker.com/products/docker-datacenter) is an on-premises solution that enterprises use to create, manage, deploy and scale their applications and comes with support from the Docker team. It can manage hosts that exist in your datacenter as well as in your virtual private cloud or public cloud provider (AWS, Azure, Digital Ocean, SoftLayer etc.).

:::

::: details 6. Do Docker containers package up the entire OS and make it easier to deploy?

Docker containers do not package up the OS. They package up the applications with everything that the application needs to run. The engine is installed on top of the OS running on a host. Containers share the OS kernel allowing a single host to run multiple containers.

:::

::: details 7. What OS can the Docker Engine run on?

The Docker Engine runs on all modern Linux distributions. We also provide a [<VPIcon icon="fa-brands fa-docker"/>commercially supported Docker Engine](https://docs.docker.com/engine/release-notes/prior-releases/) for Ubuntu, CentOS, OpenSUSE, RHEL. There is also a technical preview of Docker running on Windows Server 2016. 8. How does Docker help manage my infrastructure? Do I containerize all my infrastructure or something?

Docker isn’t focused on managing your infrastructure. The platform, which is infrastructure agnostic, manages your applications and helps ensure that they can run smoothly, regardless of infrastructure type via solutions like Docker Datacenter. This gives your company the agility, portability and control you require. Your team is responsible for managing the actual infrastructure.

:::

::: details 9. How many containers can run per host?

As far as the number of containers that can be run, this really depends on your environment. The size of your applications as well as the amount of available resources (i.e like CPU) will all affect the number of containers that can be run in your environment. Containers unfortunately are not magical. They can’t create new CPU from scratch. They do, however, provide a more efficient way of utilizing your resources. The containers themselves are super lightweight (remember, shared OS vs individual OS per container) and only last as long as the process they are running. Immutable infrastructure if you will.

:::

::: details 10. What do I have to do to begin the “Dockerization process”

The best way for your team to get started is for your developers to download [<VPIcon icon="fa-brands fa-docker"/>Docker for Mac or Docker Windows](https://docker.com/products/docker#/mac). These are native installations of Docker on a Mac or Windows device. From their, developers will take their applications and create a Dockerfile. The Dockerfile is where all of the application configuration is specified. It is essentially the blueprint for the Docker Image. The image is a snapshot of your application and is what the Docker Engine looks at so it knows what the container it is spinning up should look like.

If your developers aren’t using Docker quite yet. Feel free to point them to our website where they can learn more at [<VPIcon icon="fa-brands fa-docker"/>www.docker.com](https://docker.com/)

:::

::: details Bonus Question: We have several monolithic applications in our environment. But Docker only works for microservices right?

I added this in because this is one of the biggest misconceptions about Docker. Docker can absolutely be used for to containerize monolithic apps as well as microservices based apps. We find that most customers who are leveraging Docker containerize their legacy monolithic applications to benefit from the isolation that Docker containers provide, as well as portability. Remember Docker containers can package up any application (monolithic or distributed) and migrate workloads to any infrastructure. This portability is what enables our enterprise customers to embrace strategies like moving to the hybrid cloud.

In the case of microservices, customers typically containerize each service and use tools like Docker Compose to deploy these multi-container distributed applications into their production environment as a single running application.

We’ve even seen some companies have a hybrid environment where they are slowly restructuring their dockerized monolithic applications to become dockerized distributed applications over time. This is the [<VPIcon icon="fa-brands fa-youtube"/>case with ADP,](https://youtu.be/4ywzwCmML2Y) a Docker Datacenter customer of ours.

<VidStack src="youtube/4ywzwCmML2Y" />

:::

So there it is. The list of the top ten questions that IT admins ask about Docker, plus a bonus question for good measure.

Now, I have a question for you. Has YOUR team started using Docker? If not, it may be time for you to try the new hotness.

If you are looking to learn more about containers vs. VMs, take a look at this webinar recording from a few weeks ago called [<VPIcon icon="fas fa-globe"/>“Containers for The Virtualization Admin”](https://docker.wistia.com/medias/8jzv09k4xw)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The 10 Most Common Questions IT Admins ask About DockerDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/the-10-most-common-questions-it-admins-ask-about-docker.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
