---
lang: en-US
title: "Containers Today Recap: The Future of the Developer JourneyDocker"
description: "Article(s) > Containers Today Recap: The Future of the Developer JourneyDocker"
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
      content: "Article(s) > Containers Today Recap: The Future of the Developer JourneyDocker"
    - property: og:description
      content: "Containers Today Recap: The Future of the Developer JourneyDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/containers-today-recap.html
prev: /devops/docker/articles/README.md
date: 2019-12-21
isOriginal: false
author: 
cover: https://docker.com/app/uploads/2019/12/pasted-image-0-2.png
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
  name="Containers Today Recap: The Future of the Developer JourneyDocker"
  desc="There was amazing attendance at Containers Today in Stockholm a couple of weeks ago. For those who were unable to make it, here is a quick overview of what Docker talked about at the event in a session around the future of the developer journey."
  url="https://docker.com/blog/containers-today-recap"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2019/12/pasted-image-0-2.png"/>

![](https://docker.com/app/uploads/2019/12/pasted-image-0-2-1110x538.png)

There was amazing attendance at [<VPIcon icon="fas fa-globe"/>Containers Today in Stockholm](https://containerstoday.com/sweden/) a couple of weeks ago. For those who were unable to make it, here is a quick overview of what I talked about at the event in my session around the future of the developer journey. 

Before we talk about what we think will change the journey, we need to think about *why* it changes. The fundamental goal of any change to the way of working for developers should be to reduce the number of boring, mundane and repetitive tasks that developers have to do or to allow them to reach new customers/solve new problems. Developers create amazing value for companies and provide solutions to customers’ real world problems. But if they are having to spend half of their time working out how to get things into the hands of their customers, then you are getting half the value.

![](https://docker.com/app/uploads/2019/12/pasted-image-0-1.png?fit=1110%2C346&ssl=1)

---

## Developer Evolution

The role of developers has changed a lot over the last ~40 years. Developers no longer deploy to mainframes or in house hardware, they don’t do waterfall deployments and not many of them write in machine code. Developers have to now think about web languages and ML, work in Extreme Agile DevOps teams (ok I made that up a bit) and deploy to the Cloud or to Edge devices. This change keeps happening as the entire industry tries to find new ways for developers to deliver value, deliver that value faster and reduce the number of mundane tasks for developers.  

Today the process for getting value to customers is often described as the ‘outer loop’ of development, while the creative process of development, i.e. creating new features, is described as the ‘inner loop.’
In an ideal world, that outer loop is automated and uses modern CI/CD technologies to create a cycle of feedback that allows developers to create new features and fix bugs ever faster. This looks something like: 

![containers today recap 1](https://docker.com/app/uploads/2022/06/containers-today-recap-1.png "- containers today recap 1")

Though this is an ideal world, this is not the case for a lot of developers. In the “The State of Developer Ecosystem 2019” report, only 45% of developers said that CI/CD was part of their regular tool set. This also means 55% of developers have yet to adopt it. This is one of the changes we think will start to accelerate in the near future. As CI/CD is democratized with new tools like Github Actions, we will see even small teams starting to adopt CI/CD over manual deployments.

Another big change in the outer loop is how people look at what they are passing through this outer loop. Developers are trying to get value out to customers but the concept of value is changing. As we moved away from monoliths, we have started to create individual services that are easier to work with and deploy. The idea of bundling these services with systems like Helm or CNAB tools is becoming more prominent as businesses consider that in isolation, a single container does not provide value to a customer. But a collection of these services together is the minimum set to deliver customer value.
*These may each be a separate microservice, but just a notifications service or a payment service won’t drive business value in isolation.* 

For the outer loop, some of the big changes we see are changes to how things are deployed. 57% of developers are still not using orchestration (Slashdata Developer Report 16th Edition). The growth in orchestration and in particular K8s is going to change how we think about the hand off between developers and operations as we move towards more microservices in production than ever before. The complexity of this change will be compounded as production is likely to be on multiple clouds or on premises, and as over 50% of companies have a hybrid strategy and a multi cloud strategy.  

For developers, all of these things are going to be impactful at a significant scale as we aim to develop the next 500 million apps by 2023 (IDC Analyse the Future). With Edge/IoT growing 10X between 2017-2025 (Allied Market Research), we are also going to need to think of new ways for developers to work with these technologies and extend their inner loop outside of their immediate machine.
So in summary, we are going to see more bundled apps being deployed via CI/CD to orchestrators in the cloud and on prem, and movement between them. We will be building more of these apps than ever and they have to run anywhere, considering how they interface with the Edge and work as part of our inner loop for this on the Cloud. And finally, we strongly believe that the use of containers is going to be a driving factor and the underlying technology to enable this.  

---

## What’s Next for Developers

At Docker, we have started to look ahead at how we can build technology to help developers adopt some of these tools.

For local developers, we have looked at how to accelerate people creating the next 500 million new applications with Application templates, enabling developers to create new containerized applications in seconds from existing examples. We have been working out how we can improve our IDE integration to make developers lives better where they work today. We have added a layer of GUI abstraction into Docker Desktop to make it simpler to understand all of these components.  

We are also thinking about how we can extend the local development environment and the inner loop for new objects. We have Docker Context to allow developers to work on a remote instance within their inner loop and ARM builds in Docker desktop for Working with the Edge.  

And to deploy value in the future, we have Docker App for bundling the value of more than one container service to get it running in production.  

We are also thinking about things like CI, moving between platforms and generally how to make it easier for the next 10 million developers to get started with Docker. We know that a lot of these technologies have been embraced by early adopters. But as all of these new technologies and changes start to reach the early majority, we need to think about how we are going to scale all of said technologies and keep mundane tasks away from developers!

Containers Today was a fantastic event with great turnout. Hopefully this post gives some insight into my talk at the event and the trends we see. If you have other thoughts on what the future of the developer journey holds, please reach out to us!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Containers Today Recap: The Future of the Developer JourneyDocker",
  "desc": "There was amazing attendance at Containers Today in Stockholm a couple of weeks ago. For those who were unable to make it, here is a quick overview of what Docker talked about at the event in a session around the future of the developer journey.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/containers-today-recap.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
