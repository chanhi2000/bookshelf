---
lang: en-US
title: "Depend on Docker for Kubeflow"
description: "Article(s) > Depend on Docker for Kubeflow"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - k8s
  - kubernetes
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Depend on Docker for Kubeflow"
    - property: og:description
      content: "Depend on Docker for Kubeflow"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/depend-on-docker-for-kubeflow.html
prev: /devops/k8s/articles/README.md
date: 2019-11-07
isOriginal: false
author:
  - name: Alex Iankoulski
    url : https://docker.com/author/alex-iankoulski/
cover: https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Depend on Docker for Kubeflow"
  desc="In this blog, Docker Captain Alex Iankoulski shows you how to use Docker Desktop for Mac or Windows to run Kubeflow natively."
  url="https://docker.com/blog/depend-on-docker-for-kubeflow"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig1.png"/>

## Run Kubeflow natively on Docker Desktop for Mac or Windows

*This is a guest post by Alex Iankoulski, Docker Captain and full stack software and infrastructure architect at Shell New Energies.* *The views expressed here are his own and are neither opposed or endorsed by Shell or Docker.*

In this blog, I will show you how to use Docker Desktop for Mac or Windows to run Kubeflow. To make this easier, I used my Depend on Docker project, which you can [find on Github (<VPIcon icon="iconfont icon-github"/>`iankoulski/depend-on-docker`)](https://github.com/iankoulski/depend-on-docker).

### Rationale

Even though we are experiencing a tectonic shift of development workflows in the cloud era towards hosted and remote environments, a substantial amount of work and experimentation still happens on developer’s local machines. The ability to scale down allows us to mimic a cloud deployment locally and enables us to play, learn quickly, and make changes in a safe, isolated environment. A good example of this [rationale (<VPIcon icon="fa-brands fa-medium"/>`kubeflow`)](https://medium.com/kubeflow/minikf-the-fastest-and-easiest-way-to-deploy-kubeflow-on-your-laptop-a91fb846d0ba) is provided by [<VPIcon icon="fas fa-globe"/>Kubeflow](https://kubeflow.org/) and MiniKF.

### Overview

Since Kubeflow was first released by Google in 2018, adoption has increased significantly, particularly in the data science world for orchestration of machine learning pipelines. There are various ways to deploy Kubeflow both on desktops and servers as described in its [<VPIcon icon="fas fa-globe"/>Getting Started](https://kubeflow.org/docs/started/getting-started/) guide. However, the desktop deployments for Mac and Windows rely on running virtual machines using [<VPIcon icon="iconfont icon-vagrant"/>Vagrant](https://vagrantup.com/intro/index.html) and [<VPIcon icon="iconfont icon-virtualbox"/>VirtualBox](https://virtualbox.org/). If you do not wish to install Vagrant and VirtualBox on your Mac or PC but would still like to run Kubeflow, then you can simply depend on Docker! This article will show you how to deploy Kubeflow natively on Docker Desktop.

### Setup

::: note Prerequisites

Kubeflow has a hard dependency on Kubernetes and the Docker runtime. The easiest way to satisfy both of these requirements on Mac or Windows is to install [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop](https://docker.com/products/docker-desktop) (version 2.1.x.x or higher). In the settings of Docker Desktop, navigate to the Kubernetes tab and check “Enable Kubernetes”:

![Fig. 1 – Kubernetes Settings in Docker Desktop](https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig1.png)

Enabling the Kubernetes feature in Docker Desktop creates a single node Kubernetes cluster on your local machine.

This article offers a detailed walkthrough of setting up Kubeflow on Docker Desktop for Mac. Deploying Kubeflow on Docker Desktop for Windows using Linux containers requires two additional prerequisites: 

1. **Linux shell**: to run the bash commands from the Kubeflow installation instructions 
2. **Kfctl and kubectl CLI**: to initialize, generate, and apply the Kubeflow deployment

The easiest way to satisfy both of these dependencies is to run a Linux container that has the kfctl and kubectl utilities. A Depend on Docker [project (<VPIcon icon="iconfont icon-github"/>`iankoulski/kfctl`)](https://github.com/iankoulski/kfctl) was created for this purpose. To start a bash shell with the two CLI’s available, just execute:

```sh
docker run -it --rm -v <kube_config_folder_path>:/root/.kube iankoulski/kfctl bash
```

The remaining setup steps for both Mac and Windows are the same.

:::

::: note Resource Requirements

The [<VPIcon icon="fas fa-globe"/>instructions](https://kubeflow.org/docs/started/k8s/overview/) for deployment of Kubeflow on a pre-existing Kubernetes cluster specify the following resource requirements:

- 4 vCPUs
- 50 GB storage
- 12 GB memory

The settings in Docker Desktop need to be adjusted to accommodate these requirements as shown below.

![Fig. 2 – CPU and Memory settings in Docker Desktop](https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig2.png)

![Fig. 3 – Disk image size setting in Docker Desktop](https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig3.png)

:::

::: note

Note that the settings are adjusted to more than the minimum required resources to accommodate system containers and other applications that may be running on the local machine.

:::

#### Deployment

We will follow [<VPIcon icon="fas fa-globe"/>instructions](https://kubeflow.org/docs/started/k8s/kfctl-k8s-istio/) for the **kfctl_k8s_istio** configuration.

1. Download your preferred version from the [release archive (<VPIcon icon="iconfont icon-github"/>`kubeflow/kubeflow`)](https://github.com/kubeflow/kubeflow/releases):  

```sh
curl -L -o kfctl_v0.6.2_darwin.tar.gz` `https://github.com/kubeflow/kubeflow/releases/download/v0.6.2/kfctl_darwin.tar.gz
```

**2. Extract the archive:**

```sh
tar -xvf kfctl_v0.6.2_darwin.tar.gz
```

**3. Set environment variables:**

```sh
export PATH=$PATH:$(pwd)  
export KFAPP=localkf  
export CONFIG=https://raw.githubusercontent.com/kubeflow/kubeflow/v0.6-branch/bootstrap/config/kfctl_k8s_istio.0.6.2.yaml
```

**4. Initialize deployment:**

```sh
kfctl init ${KFAPP} --config=${CONFIG}  
cd ${KFAPP}  
kfctl generate all -V
```

::: note

The above instructions are for Kubeflow release 0.6.2 and are meant to use as an example. Other releases would have slightly different archive filename, environment variable names and values, and kfctl commands. Those would be available in the release-specific deployment instructions.

:::

**5. Pre-pull container images (optional)**

To facilitate the deployment of Kubeflow locally, we can pre-pull all required Docker images. When the container images are already present on the machine, the memory usage of Docker Desktop stays low. Pulling all images at the time of deployment may cause large spikes in memory utilization and can cause Docker Daemon to run out of resources. Pre-pulling images is especially helpful when running Kubeflow on a 16GB laptop.

To pre-pull all container images, execute the following one-line script in your `$KFAPP/kustomize` folder:

```sh
for i in $(grep -R image: . | cut -d ':' -f 3,4 | uniq | sed -e 's/ //' -e 's/^"//' -e 's/"$//'); do echo "Pulling $i"; docker pull $i; done;
```

![Fig. 4 – Pre-pulling Kubeflow container images](https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig4.png?fit=1110%2C521&ssl=1)

Depending on your Internet connection, this could take several minutes to complete. Even if Docker Desktop runs out of resources, restarting it and running the script again will resume pulling the remaining images from where you left off.

If you are using the kfctl container on Windows, you may wish to modify the one-line script above so it saves the docker pull commands to a file and then execute them from your preferred Docker shell.

**6. Apply Kubeflow deployment to Kubernetes**

```sh
cd ${KFAPP}kfctl apply all -V
```

![Fig. 5 – Deployment output and Kubeflow pods – found by executing ‘kubectl get pods –all-namespaces’ – running in Docker Desktop](https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig-5.png?fit=1110%2C694&ssl=1)

::: note

An existing deployment can be removed by executing `kfctl delete all -V`

:::

**7. Determine the Kubeflow entrypoint**

To determine the endpoint, list all services in the istio-system namespace:  

```sh
kubectl get svc -n istio-system
```

![Fig. 6 – Istio Ingress Gateway service](https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig6.png?fit=1110%2C234&ssl=1)

The Kubeflow end-point service is through the ingress-gateway service on the NodePort connected with the default HTTP port (80). The Node Port number is 31380. To access Kubeflow use: `http://127.0.0.1:31380`

---

## Using Kubeflow

The Kubeflow central dashboard is now accessible:

![Fig. 7 – Kubeflow dashboard](https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig7.png?fit=1110%2C660&ssl=1")

We can run one of the sample pipelines that is included in Kubeflow. Select *Pipelines*, then *Experiments*, and choose *Conditional expression* (or just click the [Sample] Basic – Conditional expression link on the dashboard screen). 

![Fig. 8 – Conditional execution pipeline](https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig8.png?fit=1110%2C660&ssl=1")

Next, click the *+Create run* button, enter a name (e.g. conditional-execution-test), choose an experiment, and then click *Start* to initiate the run. Navigate to your pipeline by selecting it from the list of runs.

![Fig. 9 – Conditional execution pipeline run](https://docker.com/app/uploads/2019/11/Docker-Kubeflow-fig9.png?fit=1110%2C662&ssl=1")

The completed pipeline run looks similar to Fig. 9 above. Due to the random nature of the coin flip in this pipeline, your actual output is likely to be different. Select a node in the graph to review various assets associated with that node, including its logs.

---

## Conclusion

Docker Desktop enables you to easily run container applications on your local machine, including ones that require a Kubernetes cluster. Kubeflow is a deployment that typically targets larger clusters either in cloud or on-prem environments. In this article we’ve demonstrated how to deploy and use Kubeflow locally on your Docker Desktop.

::: info References

<SiteInfo
  name="Docker Desktop: The #1 Containerization Tool for Developers | Docker"
  desc="Docker Desktop is collaborative containerization software for developers. Get started and download Docker Desktop today on Mac, Windows, or Linux."
  url="https://docker.com/products/docker-desktop//"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2023/06/meta-image-download-docker-desktop-1110x580.png"/>

<SiteInfo
  name="Introduction"
  desc="An introduction to Kubeflow"
  url="https://kubeflow.org/docs/started/introduction//"
  logo="https://kubeflow.org/favicon.ico?v=2"
  preview="https://kubeflow.org/docs/started/introduction/social.13baca1a000d1f9cea456dc9dc7f6c06.png"/>

<SiteInfo
  name="MiniKF: the fastest and easiest way to deploy Kubeflow on your laptop"
  desc="Enterprises and organizations are discovering the power of cloud-based, distributed training using cloud-native ML solutions like Kubeflow…"
  url="https://medium.com/kubeflow/minikf-the-fastest-and-easiest-way-to-deploy-kubeflow-on-your-laptop-a91fb846d0ba/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*0MUOjdKuK2avrT9nY4chYA.png"/>

<SiteInfo
  name="Production-Grade Container Orchestration"
  desc="Kubernetes, also known as K8s, is an open source system for automating deployment, scaling, and management of containerized applications. It groups containers that make up an application into logical units for easy management and discovery. Kubernetes builds upon 15 years of experience of running production workloads at Google, combined with best-of-breed ideas and practices from the community. Planet Scale Designed on the same principles that allow Google to run billions of containers a week, Kubernetes can scale without increasing your operations team."
  url="https://kubernetes.io/"
  logo="https://kubernetes.io/icons/icon-128x128.png"
  preview="https://kubernetes.io/images/kubernetes-open-graph.png"/>

<SiteInfo
  name="Installing Kubeflow"
  desc="Deployment options for Kubeflow"
  url="https://kubeflow.org/docs/started/installing-kubeflow//"
  logo="https://kubeflow.org/favicon.ico?v=2"
  preview="https://kubeflow.org/docs/started/installing-kubeflow/social.0f1e29dc9f28559c3c3274c8a7fe32e2.png"/>

<SiteInfo
  name="Introduction | Vagrant | HashiCorp Developer"
  desc="Vagrant is a tool for building complete development environments. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases development/production parity, and makes the ”it works on my machine” excuse a relic of the past."
  url="https://developer.hashicorp.com/vagrant/intro/"
  logo="https://developer.hashicorp.com/favicon.svg"
  preview="https://developer.hashicorp.com/og-image/vagrant.jpg"/>

```component VPCard
{
  "title": "Oracle VirtualBox",
  "desc": "Powerful open source virtualization",
  "link": "https://virtualbox.org/",
  "logo": "https://virtualbox.org/favicon.ico",
  "background": "rgba(85,79,76,0.2)"
}
```

<SiteInfo
  name="iankoulski/depend-on-docker"
  desc="Depend on Docker {DoD} is an open-source project that helps you containerize your software and make it easy to build, test, ship, and run!"
  url="https://github.com/iankoulski/depend-on-docker/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0bd30b6ddedf23a4d0a368144f0f9ebb80e66d273d15fd9928d37ace50aa2bcf/iankoulski/depend-on-docker"/>

```component VPCard
{
  "title": "iankoulski/kfctl - Docker Image | Docker Hub",
  "desc": "Explore images from iankoulski/kfctl on Docker Hub. No description provided.",
  "link": "https://hub.docker.com/r/iankoulski/kfctl/",
  "logo": "https://hub.docker.com/favicon.ico",
  "background": "rgba(41,134,255,0.2)"
}
```

:::

---

## Credits

I’d like to thank the following people for their help with this post and related topics:

- Yannis Zarkadas, Arrikto 
- Constantinos Venetsanopoulos, Arrikto
- Josh Bottum, Arrikto
- Fabio Nonato de Paula, Shell
- Jenny Burcio, Docker
- David Aronchick, Microsoft
- Stephen Turner, Docker
- David Friedlander, Docker

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Depend on Docker for Kubeflow",
  "desc": "In this blog, Docker Captain Alex Iankoulski shows you how to use Docker Desktop for Mac or Windows to run Kubeflow natively.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/depend-on-docker-for-kubeflow.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
