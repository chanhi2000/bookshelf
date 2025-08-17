---
lang: en-US
title: "Improved Docker Container Integration with Java 10"
description: "Article(s) > Improved Docker Container Integration with Java 10"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Java
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - java
  - jdk
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Improved Docker Container Integration with Java 10"
    - property: og:description
      content: "Improved Docker Container Integration with Java 10"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/improved-docker-container-integration-with-java-10.html
prev: /devops/docker/articles/README.md
date: 2018-04-04
isOriginal: false
author:
  - name: Sophia Parafina
    url : https://docker.com/author/sophia/
cover: https://docker.com/app/uploads/Screen-Shot-2018-04-03-at-4.40.29-PM.png
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

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Improved Docker Container Integration with Java 10"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/improved-docker-container-integration-with-java-10"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/Screen-Shot-2018-04-03-at-4.40.29-PM.png"/>

![Docker and Java](https://docker.com/app/uploads/Screen-Shot-2018-04-03-at-4.40.29-PM.png)

Many applications that run in a Java Virtual Machine (JVM), including data services such as Apache Spark and Kafka and traditional enterprise applications, are run in containers. Until recently, running the JVM in a container presented problems with memory and cpu sizing and usage that led to performance loss. This was because Java didn’t recognize that it was running in a container. With the [<FontIcon icon="fa-brands fa-java"/>release](http://openjdk.java.net/projects/jdk/10/) of Java 10, the JVM now recognizes constraints set by container control groups (cgroups). Both memory and cpu constraints can be used manage Java applications directly in containers, these include:

- adhering to memory limits set in the container
- setting available cpus in the container
- setting cpu constraints in the container

Java 10 improvements are realized in both Docker for Mac or Windows and Docker Enterprise Edition environments.

---

## Container Memory Limits

Until Java 9 the JVM did not recognize memory or cpu limits set by the container using flags. In Java 10, memory limits are automatically recognized and enforced.

[<FontIcon icon="iconfont icon-oracle"/>Java](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ergonomics.html) defines a server class machine as having 2 CPUs and 2GB of memory and the default heap size is ¼ of the physical memory. For example, a Docker Enterprise Edition installation has 2GB of memory and 4 CPUs. Compare the difference between containers running Java 8 and Java 10. First, Java 8:

```sh
docker container run -it -m512 --entrypoint bash openjdk:latest
docker-java-home/bin/java -XX:+PrintFlagsFinal -version | grep MaxHeapSize
# 
# uintx MaxHeapSize                              := 524288000                          {product}
# openjdk version "1.8.0_162"
```

The max heap size is 512M or ¼ of the 2GB set by the Docker EE installation instead of the limit set on the container to 512M. In comparison, running the same commands on Java 10 shows that the memory limit set in the container is fairly close to the expected 128M:

```sh
docker container run -it -m512M --entrypoint bash openjdk:10-jdk
docker-java-home/bin/java -XX:+PrintFlagsFinal -version | grep MaxHeapSize
#
# size_t MaxHeapSize                              = 134217728                                {product} {ergonomic}
# openjdk version "10" 2018-03-20
```

---

## Setting Available CPUs

By default, each container’s access to the host machine’s CPU cycles is unlimited. Various constraints can be set to limit a given container’s access to the host machine’s CPU cycles. Java 10 recognizes these limits:

```sh
docker container run -it --cpus 2 openjdk:10-jdk
Runtime.getRuntime().availableProcessors()
# $1 ==> 2
```

All CPUs allocated to Docker EE get the same proportion of CPU cycles. The proportion can be modified by changing the container’s [<FontIcon icon="fa-brands fa-docker"/>CPU share](https://docs.docker.com/engine/reference/run/#cpu-share-constraint) weighting relative to the weighting of all other running containers. The  proportion will only apply when CPU-intensive processes are running. When tasks in one container are idle, other containers can use the leftover CPU time. The actual amount of CPU time will vary depending on the number of containers running on the system. These can be set in Java 10:

```sh
docker container run -it --cpu-shares 2048 openjdk:10-jdk
Runtime.getRuntime().availableProcessors()
# $1 ==> 2
```

The cpuset constraint sets which CPUs allow execution in Java 10. 

```sh
docker run -it --cpuset-cpus="1,2,3" openjdk:10-jdk
Runtime.getRuntime().availableProcessors()
#
# $1 ==> 3
```

---

## Allocating memory and CPU

With Java 10, container settings can be used to estimate the allocation of memory and CPUs needed to deploy an application. Let’s assume that the memory heap and CPU requirements for each process running in a container has already been determined and JAVA_OPTS set. For example, if you have an application distributed across 10 nodes; five nodes require 512Mb of memory with 1024 CPU-shares each and another five nodes require 256Mb with 512 CPU-shares each. Note that 1 CPU share proportion is represented by 1024. For memory, the application would need 5Gb allocated at minimum.

$$
512\text{Mb}\times{5}=2.56\:\text{Gb}
$$

$$
256\text{Mb}\times{5}=1.28\:\text{Gb}
$$

The application would require 8 CPUs to run efficiently.

$$
1024\times{5}=5\:\text{CPUs}
$$

$$
512\times{5}=3\:\text{CPUs}
$$

Best practice suggests profiling the application to determine the memory and CPU allocations for each process running in the JVM. However, Java 10 removes the guesswork when sizing containers to prevent out of memory errors in Java applications as well allocating sufficient CPU to process work loads.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Improved Docker Container Integration with Java 10",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/improved-docker-container-integration-with-java-10.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
