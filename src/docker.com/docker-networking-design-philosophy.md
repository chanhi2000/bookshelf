---
lang: en-US
title: "Docker Networking Design PhilosophyDocker"
description: "Article(s) > Docker Networking Design PhilosophyDocker"
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
      content: "Article(s) > Docker Networking Design PhilosophyDocker"
    - property: og:description
      content: "Docker Networking Design PhilosophyDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-networking-design-philosophy.html
prev: /devops/docker/articles/README.md
date: 2016-03-02
isOriginal: false
author:
  - name: Jana Radhakrishnan
    url : https://docker.com/author/jana/
cover: https://docker.com/app/uploads/docker_networking.png
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
  name="Docker Networking Design PhilosophyDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/docker-networking-design-philosophy"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/docker_networking.png"/>

From the experimental networking in Docker 1.7 to the initial release in Docker 1.9, the reception from the community has been fantastic! First of all we want to thank you for all the discussions, evaluations, PRs and filed issues. As the networking capabilitiesevolving with every release, we wanted to spend some time explaining the guiding principles behind the design.

---

## Users First

[![<VPIcon icon="fa-brands fa-docker"/>docker networking](https://docker.com/app/uploads/docker_networking-300x300.png)](https://docs.docker.com/engine/userguide/networking/dockernetworks/)

Docker’s philosophy is to build tools that have a great user experience and seamless application portability across infrastructure. New features are always continuously refined and iterated upon so that the end product delivers the best possible user experience. Networking follows the same philosophy and we iterated several times to find the right abstractions for the user.

When it comes to networking, there are two kinds of users:

- The application developer who wants to create and deploy a distributed application stack on the Docker platform
- The network IT team who configures and manages the infrastructure

We wanted to give the right kind of tools to both these kinds of users so that they are empowered to easily accomplish their goals and you can read about some of the experiences from the Docker community like [<VPIcon icon="fas fa-globe"/>@arungupta](http://blog.arungupta.me/docker-multi-host-networking-couchbase-wildfly/), [@allingeek (<VPIcon icon="fa-brands fa-medium"/>`on-docker`)](https://medium.com/on-docker/docker-overlay-networks-that-was-easy-8f24baebb698) and [<VPIcon icon="fa-brands fa-medium"/>`@yoanis_gil`](https://medium.com/@yoanis_gil/running-an-elasticsearch-cluster-on-docker-1-9-with-swarm-and-compose-efabe110c675#.nja48ka4t).

Docker’s primary focus is on the user, whether they are from the application team or IT operations. That also means supporting ecosystem partners that support the same architecture goals of user experience AND seamless application portability. With that in mind, it is our belief that all APIs and UI must be exposed to end users and anything else would compromise on the core values. Anyone in the ecosystem claiming to support or include Docker must adhere to maintaining user experience and portability otherwise it simply isn’t Docker.

---

## Users: Application developers

As much as application developers want their applications to communicate with each other, most don’t want to understand or get involved in the details of how exactly that is achieved. In fact they don’t even want to know what IP addresses their applications are bound to. The application developer’s concern generally ends at the Layer4 service layer that their applications are bound to.

One of the guiding principles in the Docker Networking design is to relieve the application developer from worrying about the network plumbing details. Our belief is that by hiding the gory details of how network connectivity and service discovery is achieved behind a simple API and UI, we enable the application developers to develop their distributed application stack more freely. We should eliminate the connectivity/discoverability headaches and portability concerns that hinders an application developer from converting a monolithic application to a set of microservices. We want developers to be able to bind their microservices into a single distributed application using a few simple “network creation” and “network connection” commands.

The other guiding principle is to extend the same portable experience of Docker containers to networks. A Docker container created using an image works the same regardless of where it runs as long as the same image is used. Similarly, when the application developer defines their application stack as a set of distributed applications, it should work just the same whatever infrastructure it runs on. This heavily depends on what abstractions we expose to the application developer and more importantly what abstractions we do not expose to the application developer.

This is how the Docker “network” abstraction ([CNM (<VPIcon icon="iconfont icon-github"/>`docker/libnetwork`)](https://github.com/docker/libnetwork/blob/master/docs/design.md)) was born. It provides the right reference for the application developer to think and reason about the connectivity and discoverability needs of their application services without distracting them with all the complexities of how exactly this is achieved. In some ways, the “network” abstraction is declarative because the user is allowed to tell “what” kind of topology the application needs instead of telling “how” to physically build that topology.

[![cnm-model (<VPIcon icon="iconfont icon-github"/>`docker/libnetwork`)](https://raw.githubusercontent.com/docker/libnetwork/master/docs/cnm-model.jpg)](https://github.com/docker/libnetwork/blob/master/docs/design.md)

For example, a classic three-tier web application stack is where the web server and the app server are in one network and then the same app server is connected to another network which also has the database server. The app developer should not have to bother with how that is implemented with the physical networks, firewalls, etc. Decoupling the infrastructure from the application significantly increases the portability of the distributed application. This also means developers have more freedom in how exactly the application topology is defined.

---

## Users: Network IT

While the application developer wants to be free of infrastructure details and wants a portable application deployment experience, the network IT team wants to make sure all applications deployed in the infrastructure run smoothly and complies with the application’s SLAs and business rules. This means the ability to change network configurations and even providers without disrupting the application’s functionality and intent. Agile means speed for developers and a different kind of speed for network IT, the kind where they are able to respond quickly to changing needs and make adjustments without breaking something else.

The “how” part of the equation is accomplished with a “driver” abstraction. Given a definition of an abstract network topology, how that topology is achieved in concrete terms depends on the driver that is used. By defining the Docker Networking plugin API that every driver can easily conform to, one can simply deploy the exact same application-driven network topology in any infrastructure by replacing one driver with another.

The plugin API provides a hook to the driver when:

- a network is created
- a container is connected to a network
- a container needs an IP address

These are the most essential hooks to achieve network connectivity for any application network topology. Docker provides the same network connectivity guarantees to the application regardless of the driver used. At the same time, the network IT team is free to choose any driver which facilitates the application topologies in their infrastructure.

There are some special kinds of drivers called “plugins”. All plugins are drivers. But plugins are not built into the Docker Engine binary. They are independent external programs (in most cases, they are docker containers themselves) that use the same driver API as the built-in drivers. So in essence one can swap out a built-in driver for an external plugin to achieve any network topology. This reflects Docker’s philosophy of “Batteries included but swappable”. Plugins are critical in supporting portability and choice for network IT.

When we first started thinking about enhancing Docker Networking it was clear that plugins should be a first class citizen. In any infrastructure the connectivity and discoverability needs of applications are wide and varied. There is no single solution for that problem that will satisfy every user and application. Therefore plugins have been an important part of Docker Networking design from the very beginning. We decided that when we release the first version of new Docker Networking the ability to “swap the battery” was available to the users. In the end that is exactly how we released Docker Networking in Docker 1.9. ### Plugin API Design

While application network topology and network abstraction is more focused on the application developer, the driver/plugin configuration is focused on IT administrators. Network IT is more focused on the infrastructure and related service levels on which the application is going to be deployed. However, they do want to ensure that they can meet the application’s network connectivity intent.

They want to ensure that:

- the right solution to plumb the networking path is used
- the right solution to manage networking resources is used
- the right solution to discover application services is used
- they can make separate and independent choices on all of the above

Providing the flexibility to network IT to pick and choose various solutions for the various elements of network configuration gives the best operations experience.

Instead of providing one all-encompassing plugin API/extension-point, we segmented the plugin API into separate extension points corresponding to logical configuration groupings:

- The [network driver extension point (<VPIcon icon="iconfont icon-github"/>`docker/go-plugins-helpers`)](https://github.com/docker/go-plugins-helpers/network) provides the API needed to configure and achieve network connectivity
- The [IPAM extension point (<VPIcon icon="iconfont icon-github"/>`docker/go-plugins-helpers`)](https://github.com/docker/go-plugins-helpers/tree/master/ipam) to configure, discover and manage IP address ranges

The design gets its inspiration from the golang interface philosophy, which advocates defining one “interface” per function to encourage composability. This is a powerful facility for network IT to compose different solutions for different needs.

Another aspect of the plugin API design is to make sure that Docker Networking remains the broker to resolve conflicts that can arise when a container joins multiple networks backed by different plugins. For example two different drivers may want to plumb a static route with the same route prefix but with a different next hop IP. When this happens it is simply not possible for these drivers to independently choose whose route wins without sacrificing the user experience. Therefore, as part of the plugin API libnetwork doesn’t provide driver’s access to the container’s network namespace since there is no way a particular driver will be able to resolve these conflicts by itself. This is true for built-in drivers and plugins. Other plugin frameworks like CNI provide namespace access to its drivers and hence they may have to deal with these drivers stomping over each other inside the container namespace. When that happens user experience and portability suffers.

Another reason for this plugin design is to provide granular network plugability at various layers (such as IP Address management, Service Discovery, Load Balancing, etc…) which lets the user choose the best driver to satisfy a feature instead of depending on an all-encompassing and opinionated network plugin. For example, a scenario where a network operator might want to use a specific IPAM solution (such as [Infoblox](https://hub.docker.com/r/infoblox/ipam-driver/)) in combination with a different network plugin (such as Cisco’s [<VPIcon icon="iconfont icon-github"/>`contiv/netplugin`](https://github.com/contiv/netplugin)). Because [<VPIcon icon="iconfont icon-github"/>`docker/libnetwork`](https://github.com/docker/libnetwork) manages the container’s network namespace, we could implement the necessary Docker UX and guarantee such combinations of different plugins. Thus providing the necessary guarantees to the network operator to take control over the network design.

---

## Docker API and User Interaction

Docker Networking allows for separation of concerns for two different users and it was only natural to design two distinct commands in Docker UI. The UI and API are designed in a way that network IT can configure the infrastructure with as little coordination with the application developers as possible. It avoids the lock-stepped workflow between the application developers and Network IT team.

For example, if the application developer requests that network IT just create networks with certain names, then the network IT can go independently and start creating those networks applying configuration options that are appropriate for the given infrastructure. At the same time, the application developer can work on composing the application assuming that those networks with the referenced names will be available to achieve the network topology that the application needs.

With that in mind the branch in UI and API roughly looks as follows:

- Network IT can create, administer and precisely control which network driver and IPAM driver combination is used for the network. They can also specify various network specific configurations like subnets, gateway, IP ranges etc. and also pass on driver specific configuration, if any.
- A configuration is to connect any container to the created network. This one has application developer focus since their concern is mainly one of connectivity and discoverability.

A typical way an application developer can compose the application is using a “Docker Compose” file where one can specify all the application services which are part of the application and how they connect to each other in an application defined topology referencing networks which may be pre-provisioned by the network IT.

In fact, the developer builds an application using Docker Compose file which inherently defines the application topology. The exact same compose file can now be used to deploy the application in any infrastructure and the network IT team could pre-provision the network (that is referenced in the Compose file) based on the infrastructure requirements. The key aspect of it is that the application developer does not need to revisit the Compose file every time it is deployed to a different environment.

This separation of concern enables a workflow where developers and network IT can work independently in provisioning networks and deploying applications, using different plugins if needed.

As an example, let’s consider the following Compose v2 application:

```yaml title="docker-compose.yml"
version: "2"
  services:
    voting-app:
      image: docker/example-voting-app-voting-app
      ports:
        - "80"
      networks:
        - votenet
    result-app:
      image: docker/example-voting-app-result-app
      ports:
        - "80"
      networks:
        - votenet
    worker:
      image: docker/example-voting-app-worker
      networks:
        - votenet
    redis:
      image: redis
      networks:
        - votenet
    db:
      image: postgres:9.4
      volumes:
        - "db-data:/var/lib/postgresql/data"
      networks:
        - votenet

volumes:
  db-data:
networks:
  votenet:
```

By default, compose v2 will create a docker network for this application using the default driver. When run against docker-engine, the default driver is the bridge driver. Hence, when the application is launched, we can see that the network is created using the “default driver”.

```sh
docker-compose up -d
#
# Creating network "voteapp_votenet" with the default driver
# Starting db
# Starting redis
# Starting voteapp_worker_1
# Starting voteapp_voting-app_1
# Starting voteapp_result-app_1
```

The application works just fine in a single-host and the application dev can get the work done without having to deal with any network specific configurations.

Looking into the details,

```sh
docker network inspect - voteapp_votenet
#
# [
#   {
#     "Name": "- voteapp_votenet",
#     "Id": "7be1879036b217c072c824157e82403081ec60edfc4f34599674444ba01f0c57",
#     "Scope": "local",
#     "Driver": "bridge",
#     "IPAM": {
#       "Driver": "default",
#       "Options": null,
#       "Config": [
#         {
#           "Subnet": "172.19.0.0/16",
#           "Gateway": "172.19.0.1/16"
#         }
#       ]
#     },
#     ...
#     ...
#     ...
#   }
# ]
```

Lets bring down the application.

```sh
docker-compose down
```

Now, Let us assume that the application is handed over to the operations team to be deployed in staging. Network IT manages the networks by either pre-provisioning the networks ahead of time using the `docker network` commands. For example:

```sh
docker network create -d overlay \
--subnet=70.28.0.0/16 \
--gateway=70.28.5.254 voteapp_votenet
#
# 6d215748f300a0eda3878e76fe99e717c8ef85a87de0779e379c92af5d615b88
```

Alternatively, network IT can take control over the network configurations of the above docker-compose application using the extension feature ([<VPIcon icon="fa-brands fa-docker"/>Read more about this compose functionality](https://docs.docker.com/compose/extends/)) by adding another compose file:  
“docker-compose.override.yml” without having to change anything on the application.

```yaml title="docker-compose.override.yml"
version : "2"
  networks:
    votenet:
      driver: overlay
      ipam:
        config:
          - subnet: 70.28.0.0/16
        gateway: 70.28.5.254
```

In this example, the network driver used in staging is “overlay”, which provides multi-host network connectivity and the network IT team can use preferred IPAM settings for this network.

```sh
docker-compose up -d
#
# Creating network "- voteapp_votenet" with driver "overlay"
# Starting voteapp_worker_1
# Starting redis
# Starting db
# Starting voteapp_voting-app_1
# Starting voteapp_result-app_1
```

When the same application is run, this time, the network created is with a different driver named “overlay”, which provides multi-host network connectivity. Now when we dig deeper into the network using the “docker network inspect” command, we can also see the configured IPAM being used to configure the network and all the containers in this network will have ip-address in this subnet.

```sh
docker network inspect - voteapp_votenet
#
# [
#   {
#     "Name": "- voteapp_votenet",
#     "Id": "b510c0affb2289548a07af7cc7e3f778987fc43812ac0603c5d01b7acf6c12be",
#     "Scope": "global",
#     "Driver": "overlay",
#     "IPAM": {
#       "Driver": "default",
#       "Options": null,
#       "Config": [
#         {
#           "Subnet": "70.28.0.0/16",
#           "Gateway": "70.28.5.254"
#         }
#       ]
#     },
#   ...
#   ...
#   ...
#   }
# ]
```

When this Compose application is running on Docker Swarm, the containers are scheduled across the hosts, while the overlay driver provides seamless connectivity between the containers. All of this is made possible by the Docker Networking design principles explained in this blog post.

---

## Application is Still the King

If we did not mention before, with all operations focused configuration knobs, application still remains the king. So, as stated in the beginning we wanted to hide as many networking artifacts as possible, one last thing that needed hiding is the IP addresses themselves. IP addresses expose something about the underlying infrastructure and this reduces the portability experience for the application. If applications can discover each other using names that they know at compile time, then it completes the portability story. This is exactly what we achieved by providing implicit container discovery using embedded DNS server. The container “linking” and “aliasing” capabilities, ensures that containers can discover their peer containers with the name they knew at the compile time.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker Networking Design PhilosophyDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-networking-design-philosophy.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
