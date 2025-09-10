---
lang: en-US
title: "Happy Pi Day with  and Raspberry Pi"
description: "Article(s) > Happy Pi Day with  and Raspberry Pi"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Linux
  - Debian
  - Raspberry-pi
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - linux
  - debian
  - raspberry-pi
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Happy Pi Day with  and Raspberry Pi"
    - property: og:description
      content: "Happy Pi Day with  and Raspberry Pi"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/happy-pi-day-docker-raspberry-pi.html
prev: /devops/docker/articles/README.md
date: 2019-03-15
isOriginal: false
author:
  - name: paulofrazao
    url : https://docker.com/author/paulofrazao/
cover: https://docker.com/app/uploads/2019/03/docker-pi.gif
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
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Happy Pi Day with  and Raspberry Pi"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/happy-pi-day-docker-raspberry-pi"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2019/03/docker-pi.gif"/>

What better way to say “Happy Pi Day” than by installing Docker Engine – Community (CE) 18.09 on Raspberry Pi. This article will walk you through the process of installing Docker Engine 18.09 on a Raspberry Pi. There are many articles out there that show this process, but many failed due to older Engine versions and some syntax issues.

Special thanks to Docker Solutions Engineer, Stefan Scherer and his monitoring image ([<VPIcon icon="fa-brands fa-docker"/>`stefanscherer/monitor`](https://hub.docker.com/r/stefanscherer/monitor/)) along with the whoami image ([<VPIcon icon="fa-brands fa-docker"/>`stefanscherer/whoami`](https://hub.docker.com/r/stefanscherer/whoami)) that allows Pimoroni Blinkt! LED’s to turn on/off when scaling an application within a Swarm Cluster.

![docker pi](https://docker.com/app/uploads/2019/03/docker-pi-225x300.gif)

---

## Instructions

For this demo, I used 7 Raspberry Pi’s 3 (model B+) and 1 Pimoroni Blinkt! LED for each Pi.

1) Download the following Raspian image ‘2018-11-13-raspbian-stretch-full.img’ from

2) Use balenaEtcher to write the image to each of your microusb cards.

3) To make DNS hostname resolution a little easier, I setup local hostnames on each Pi device. Below is an example.

```plaintext title="/etc/hosts"
192.168.93.231 pi-mgr1 pi-mgr1.docker.cafe  
192.168.93.232 pi-mgr2 pi-mgr2.docker.cafe  
192.168.93.233 pi-mgr3 pi-mgr3.docker.cafe  
192.168.93.241 pi-node1 pi-node1.docker.cafe  
192.168.93.242 pi-node2 pi-node2.docker.cafe  
192.168.93.243 pi-node3 pi-node3.docker.cafe  
192.168.93.244 pi-node4 pi-node4.docker.cafe
```

4) On each of your Pi’s, install the following:

::: tabs

@tab:active a.

Install the following prerequisites.

```sh
sudo apt-get install apt-transport-https ca-certificates software-properties-common -y
```

@tab b.

Download and install Docker.

```sh
curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh
```

@tab c.

Give the `pi` user the ability to run Docker.

```sh
sudo usermod -aG docker pi
```

@tab d.

Import Docker CPG key.

```sh
sudo curl https://download.docker.com/linux/raspbian/gpg
```

@tab e.

Setup the Docker Repo.

```sh
vim /etc/apt/sources.list
```

Add the following line and save:

```sh
deb https://download.docker.com/linux/raspbian/ stretch stable
```

@tab f.

Patch and update your Pi.

```sh
sudo apt-get update
```

```sh
sudo apt-get upgrade
```

@tab g.

Start the Docker service.

```sh
systemctl start docker.service
```

@tab h.

To verify that Docker is installed and running.

```sh
docker info
```

@tab i.

You should now some information in regards to versioning, runtime,etc.

:::

5) Now that Docker has been installed on all of your Pi’s, we can now setup Docker Swarm.

6) On one of your Pi devices that will be a master node, type the following:

```sh
docker swarm init
```

7) Once Docker initiates the swarm setup, you will be presented with a command to add additional worker nodes. Below is an example.

```sh
docker swarm join --token SWMTKN-1-<token-key> 192.168.93.231:2377
```

- on each worker node paste the text in step 7

8) To add additional manager nodes, the token and string will be different than the worker string. In order to discover the correct string to add manager nodes, do the following command on an existing working manager node.

```sh
docker swarm join-token manager
```

- copy and paste the output to each of your manager nodes

9) If you want to add additional worker nodes and don’t have the correct syntax, just type the following on any of the working manager nodes to retrieve it.

```sh
docker swarm join-token worker
```

10) To have a graphical representation of your current cluster, we will install the VIZ application. For more information, go to [<VPIcon icon="iconfont icon-github"/>`dockersamples/docker-swarm-visualizer`](https://github.com/dockersamples/docker-swarm-visualizer). To install, type the following:

```sh
docker swarm join-token worker \
--name=viz \
--publish=9090:8080/tcp \
--constraint=node.role==manager \
--mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
alexellis2/visualizer-arm:latest
```

11) Using a browser, connect to one of your master services on port 9090. You should now see the Visualizer showing your worker and manager nodes.

12) Now we will install the monitor app that will be deployed on both the manager and worker nodes. Type the following on the one of the manager nodes.

```sh
docker service create --name monitor --mode global \
--restart-condition any --mount type=bind,src=/sys,dst=/sys \
--mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
stefanscherer/monitor:1.2.0
```

13) Once the monitor app is install, we will now install the ‘whoami’ app. The ‘whoami’ app is a small application that will trigger the LED’s on/off by scaling the application up and down. For each running instance, you will get one LED turned on. As we scale the application up to 5, you will have 5 LEDs turn on. As you scale up and down the number of LEDs that turn on will depend on how many containers you have running in your cluster. To install the application, type the following.

```sh
docker service create --name whoami stefanscherer/whoami:1.1.0
```

14) Once deployed, you should have 1 LED turned on.  

15) Now lets scale the application to 5. Type the following.

```sh
docker service scale whoami=5
```

16) You should now have 5 LEDs on. Please that this will take some time as the Pi devices are not very fast and require some time to properly deploy and bring up.

And there you go! We hope you have fun and enjoy some Pi(e) today! If you have feedback or suggestions on how to improve, please reach out to me on Twitter: [<VPIcon icon="fa-brands fa-x-twitter"/>`@paulofrazao`](https://twitter.com/paulofrazao) or on Github

<SiteInfo
  name="paulofrazao/RaspberryPi"
  desc="Installing Docker 18.09 on Raspberry Pi."
  url="https://github.com/paulofrazao/RaspberryPi/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0ea7d48557a1384f5ed84690bb646540b6228abf902c0de0cbc432f68a26cb13/paulofrazao/RaspberryPi"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Happy Pi Day with  and Raspberry Pi",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/happy-pi-day-docker-raspberry-pi.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
