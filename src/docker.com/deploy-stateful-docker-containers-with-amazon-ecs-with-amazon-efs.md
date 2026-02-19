---
lang: en-US
title: "Deploy Stateful Docker Containers with Amazon ECS and Amazon EFS"
description: "Article(s) > Deploy Stateful Docker Containers with Amazon ECS and Amazon EFS"
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
      content: "Article(s) > Deploy Stateful Docker Containers with Amazon ECS and Amazon EFS"
    - property: og:description
      content: "Deploy Stateful Docker Containers with Amazon ECS and Amazon EFS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/deploy-stateful-docker-containers-with-amazon-ecs-with-amazon-efs.html
prev: /devops/docker/articles/README.md
date: 2020-04-11
isOriginal: false
author:
  - name: Robert Duffner
    url: https://docker.com/contributors/robert-duffner/
cover: https://docker.com/app/uploads/2020/04/aws-ecs_efs-.png
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
  name="Deploy Stateful Docker Containers with Amazon ECS and Amazon EFS"
  desc="AWS announced that its customers can now configure their ECS apps deployed in EC2 mode to access EFS file systems. This is good news for Docker developers who use Amazon ECS because ECS now natively integrates with Amazon EFS to automatically mount shared file systems into Docker containers."
  url="https://docker.com/blog/deploy-stateful-docker-containers-with-amazon-ecs-with-amazon-efs"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/04/aws-ecs_efs-.png"/>

![aws ecs efs](https://docker.com/app/uploads/2020/04/aws-ecs_efs-.png)

At Docker, we are always looking for ways to make developers’ lives easier either directly or by working with our partners. Improving developer productivity is a core benefit of using Docker products and recently one of our partners made an announcement that makes developing cloud-native apps easier.

AWS announced that its customers can now configure their Amazon Elastic Container Service (ECS) applications deployed in Amazon Elastic Compute Cloud (EC2) mode to access Amazon Elastic File Storage (EFS) file systems. This is good news for Docker developers who use Amazon ECS. It means that Amazon ECS now natively integrates with Amazon EFS to automatically mount shared file systems into Docker containers. This allows you to deploy workloads that require access to shared storage such as machine learning workloads, containerizing legacy apps, or internal DevOps workloads such as GitLab, Jenkins, or Elasticsearch.   

The beauty of containerizing your applications is to provide a better way to create, package, and deploy software across different computing environments in a predictable and easy-to-manage way. Containers were originally designed to be stateless and ephemeral (temporary). A stateless application is one that neither reads nor stores information about its state from one time that it is run to the next. A stateful application, on the other hand, can remember some things about its state each time it runs.

Maintaining state in an app means finding a way to connect containers to stateful storage. For example, if you open up your weather app on your mobile device, it remembers your home city as the weather app maintains state. The only way to containerize applications that require state is to connect containers to stateful, persistent storage.  

“Docker and AWS are collaborating on making the right workloads more easily deployed as stateful containerized applications. Docker’s industry-leading container technology including Docker Desktop and Docker Hub are integral to advancing developer workflows for modern apps. Our customers can now deploy and run Docker containers seamlessly on Amazon ECS and Amazon EFS, enabling development teams to ship apps faster,” according to Justin Graham, Vice President of Products for Docker.  

If you are a developer who would like to deploy workloads that require access to shared external storage, highly-available regional storage, or high-throughput storage then the combination of Amazon ECS and Amazon EFS is your answer. Developers familiar with Amazon ECS can now use the ECS task definition to specify the file system ID and specific directory that they would like to mount on one or more containers in their task. ECS takes care of mounting the file-system on the container so that you can focus on your applications without having to worry about configuring infrastructure.

If you are interested in how to actually deploy a stateful container-based application, AWS’ Martin Beeby has a great [<VPIcon icon="fa-brands fa-aws"/><VPIcon icon="fa-brands fa-docker"/>blog post](https://aws.amazon.com/blogs/aws/amazon-ecs-supports-efs/) that walks through how to configure Amazon EFS to add state to your containers running on Amazon ECS. Developers who are interested in learning more about how to get started with Docker can expand their understanding with these additional resources: [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop](https://docker.com/products/docker-desktop) and [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://docker.com/products/docker-hub).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Deploy Stateful Docker Containers with Amazon ECS and Amazon EFS",
  "desc": "AWS announced that its customers can now configure their ECS apps deployed in EC2 mode to access EFS file systems. This is good news for Docker developers who use Amazon ECS because ECS now natively integrates with Amazon EFS to automatically mount shared file systems into Docker containers.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/deploy-stateful-docker-containers-with-amazon-ecs-with-amazon-efs.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
