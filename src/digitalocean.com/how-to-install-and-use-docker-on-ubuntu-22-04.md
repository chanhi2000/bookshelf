---
lang: en-US
title: "How to Install Docker on Ubuntu – Step-by-Step Guide"
description: "Article(s) > How to Install Docker on Ubuntu – Step-by-Step Guide"
icon: fa-brands fa-ubuntu
category:
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Docker
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - devops
  - linux
  - debian
  - ubuntu
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Install Docker on Ubuntu – Step-by-Step Guide"
    - property: og:description
      content: "How to Install Docker on Ubuntu – Step-by-Step Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-and-use-docker-on-ubuntu-22-04.html
prev: /devops/docker/articles/README.md
date: 2022-04-27
isOriginal: false
author: Brian Hogan
cover: https://doimages.nyc3.cdn.digitaloceanspaces.com/007BlogBanners2024/droplet-docker-1(spraytan).png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Install Docker on Ubuntu – Step-by-Step Guide"
  desc="Learn how to install Docker on Ubuntu with this step-by-step guide. Set up Docker, run containers, and troubleshoot common installation issues. "
  url="https://digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://doimages.nyc3.cdn.digitaloceanspaces.com/007BlogBanners2024/droplet-docker-1(spraytan).png"/>

## Introduction

[<VPIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/) is an application that simplifies the process of managing application processes in *containers*. Containers let you run your applications in resource-isolated processes. They’re similar to virtual machines, but containers are more portable, more resource-friendly, and more dependent on the host operating system.

For a detailed introduction to the different components of a Docker container, check out [The Docker Ecosystem: An Introduction to Common Components](/digitalocean.com/the-docker-ecosystem-an-introduction-to-common-components).

In this tutorial, you’ll install and use Docker Community Edition (CE) on Ubuntu. You’ll install Docker itself, work with containers and images, and push an image to a Docker Repository. Additionally, you’ll learn how to start, stop, and remove containers, as well as how to commit changes in a container to a new Docker image. This tutorial also covers how to install docker with GPU support, common errors and how to fix them, and security best practices.

Simplify deploying applications with [<VPIcon icon="iconfont icon-digitalocean"/>DigitalOcean App Platform](/products/app-platform). Deploy directly from GitHub in minutes.

::: note Prerequisites

To follow this tutorial, you will need the following:

- One Ubuntu server set up by following [**the Ubuntu initial server setup guide**](/digitalocean.com/initial-server-setup-with-ubuntu-22-04.md), including a `sudo` non-**root** user and a firewall.
- An account on [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/) if you wish to create your own images and push them to Docker Hub, as shown in Steps 7 and 8.

:::

---

## Step 1. Installing Docker

The Docker installation package available in the official Ubuntu repository may not be the latest version. To ensure we get the latest version, we’ll install Docker from the official Docker repository. To do that, we’ll add a new package source, add the GPG key from Docker to ensure the downloads are valid, and then install the package.

First, update your existing list of packages:

```sh
sudo apt update
```

Next, install a few prerequisite packages which let `apt` use packages over HTTPS:

```sh
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

Then add the GPG key for the official Docker repository to your system:

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

Add the Docker repository to APT sources:

```sh
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Update your existing list of packages again for the addition to be recognized:

```sh
sudo apt update
```

Make sure you are about to install from the Docker repo instead of the default Ubuntu repo:

```sh
apt-cache policy docker-ce
```

You’ll see output like this, although the version number for Docker may be different:

Output of apt-cache policy docker-ce

```plaintext title="output"
docker-ce:
  Installed: (none)
  Candidate: 5:20.10.14~3-0~ubuntu-jammy
  Version table:
     5:20.10.14~3-0~ubuntu-jammy 500
        500 https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
     5:20.10.13~3-0~ubuntu-jammy 500
        500 https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
```

Notice that `docker-ce` is not installed, but the candidate for installation is from the Docker repository for Ubuntu.

Finally, install Docker:

```sh
sudo apt install docker-ce
```

Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it’s running:

```sh
sudo systemctl status docker
```

The output should be similar to the following, showing that the service is active and running:

```plaintext title="output"
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-04-01 21:30:25 UTC; 22s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 7854 (dockerd)
      Tasks: 7
     Memory: 38.3M
        CPU: 340ms
     CGroup: /system.slice/docker.service
             └─7854 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

Installing Docker now gives you not just the Docker service (daemon) but also the `docker` command line utility, or the Docker client. We’ll explore how to use the `docker` command later in this tutorial.

---

## Step 2. Executing the Docker Command Without Sudo (Optional)

By default, the `docker` command can only be run the **root** user or by a user in the **docker** group, which is automatically created during Docker’s installation process. If you attempt to run the `docker` command without prefixing it with `sudo` or without being in the **docker** group, you’ll get an output like this:

```plaintext title="output"
docker: Cannot connect to the Docker daemon. Is the docker daemon running on this host?.
See 'docker run --help'.
```

If you want to avoid typing `sudo` whenever you run the `docker` command, add your username to the `docker` group:

```sh
sudo usermod -aG docker ${USER}
```

To apply the new group membership, log out of the server and back in, or type the following:

```sh
su - ${USER}
```

You will be prompted to enter your user’s password to continue.

Confirm that your user is now added to the **docker** group by typing:

```sh
groups
# 
# sammy sudo docker
```

If you need to add a user to the `docker` group that you’re not logged in as, declare that username explicitly using:

```sh
sudo usermod -aG docker username
```

The rest of this article assumes you are running the `docker` command as a user in the **docker** group. If you choose not to, please prepend the commands with `sudo`.

Let’s explore the `docker` command next.

---

## Step 3. Using the Docker Command

Using `docker` consists of passing it a chain of options and commands followed by arguments. The syntax takes this form:

```sh
docker [option] [command] [arguments]
```

To view all available subcommands, type:

```sh
docker
```

As of Docker version 20.10.14, the complete list of available subcommands includes:

```plaintext :collapsed-lines title="output"
Output  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

```

To view the options available to a specific command, type:

```sh
docker docker-subcommand --help
```

To view system-wide information about Docker, use:

```sh
docker info
```

Let’s explore some of these commands. We’ll start by working with images.

---

## Step 4. Working with Docker Images

Docker containers are built from Docker images. By default, Docker pulls these images from [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com), a Docker registry managed by Docker, the company behind the Docker project. Anyone can host their Docker images on Docker Hub, so most applications and Linux distributions you’ll need will have images hosted there.

To check whether you can access and download images from Docker Hub, type:

```sh
docker run hello-world
#
# Unable to find image 'hello-world:latest' locally
# latest: Pulling from library/hello-world
# 2db29710123e: Pull complete
# Digest: sha256:bfea6278a0a267fad2634554f4f0c6f31981eea41c553fdf5a83e95a41d40c38
# Status: Downloaded newer image for hello-world:latest
# 
# Hello from Docker!
# This message shows that your installation appears to be working correctly.
# 
# ...
```

The output will indicate that Docker in working correctly:

Docker was initially unable to find the `hello-world` image locally, so it downloaded the image from Docker Hub, which is the default repository. Once the image downloaded, Docker created a container from the image and the application within the container executed, displaying the message.

You can search for images available on Docker Hub by using the `docker` command with the `search` subcommand. For example, to search for the Ubuntu image, type:

```sh
docker search ubuntu
#
# NAME                             DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
# ubuntu                           Ubuntu is a Debian-based Linux operating sys…   14048     [OK]
# websphere-liberty                WebSphere Liberty multi-architecture images …   283       [OK]
# ubuntu-upstart                   DEPRECATED, as is Upstart (find other proces…   112       [OK]
# neurodebian                      NeuroDebian provides neuroscience research s…   88        [OK]
# open-liberty                     Open Liberty multi-architecture images based…   51        [OK]
# ...
```

The script will crawl Docker Hub and return a listing of all images whose name matches the search string. In this case, the output will be similar to this:

In the **OFFICIAL** column, **OK** indicates an image built and supported by the company behind the project. Once you’ve identified the image that you would like to use, you can download it to your computer using the `pull` subcommand.

Execute the following command to download the official `ubuntu` image to your computer:

```sh
docker pull ubuntu
#
# Using default tag: latest
# latest: Pulling from library/ubuntu
# e0b25ef51634: Pull complete
# Digest: sha256:9101220a875cee98b016668342c489ff0674f247f6ca20dfc91b91c0f28581ae
# Status: Downloaded newer image for ubuntu:latest
# docker.io/library/ubuntu:latest
```

After an image has been downloaded, you can then run a container using the downloaded image with the `run` subcommand. As you saw with the `hello-world` example, if an image has not been downloaded when `docker` is executed with the `run` subcommand, the Docker client will first download the image, then run a container using it.

To see the images that have been downloaded to your computer, type:

```sh
docker images
#
# REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
# ubuntu              latest              1d622ef86b13        3 weeks ago         73.9MB
# hello-world         latest              bf756fb1ae65        4 months ago        13.3kB
```

As you’ll see later in this tutorial, images that you use to run containers can be modified and used to generate new images, which may then be uploaded (*pushed* is the technical term) to Docker Hub or other Docker registries.

Let’s look at how to run containers in more detail.

---

## Step 5. Running a Docker Container

The `hello-world` container you ran in the previous step is an example of a container that runs and exits after emitting a test message. Containers can be much more useful than that, and they can be interactive. After all, they are similar to virtual machines, only more resource-friendly.

As an example, let’s run a container using the latest image of Ubuntu. The combination of the **-i** and **-t** switches gives you interactive shell access into the container:

```sh
docker run -it ubuntu
#
# root@d9b100f2f636:/#
```

Your command prompt should change to reflect the fact that you’re now working inside the container and should take this form:

Note the container id in the command prompt. In this example, it is `d9b100f2f636`. You’ll need that container ID later to identify the container when you want to remove it.

Now you can run any command inside the container. For example, let’s update the package database inside the container. You don’t need to prefix any command with `sudo`, because you’re operating inside the container as the **root** user:

```sh
apt update

```

Then install any application in it. Let’s install Node.js:

```sh
apt install nodejs
```

This installs Node.js in the container from the official Ubuntu repository. When the installation finishes, verify that Node.js is installed:

```sh
node -v
#
# v12.22.9
```

Any changes you make inside the container only apply to that container.

To exit the container, type `exit` at the prompt.

Let’s look at managing the containers on our system next.

---

## Step 6. Managing Docker Containers

After using Docker for a while, you’ll have many active (running) and inactive containers on your computer. To view the **active ones**, use:

```sh
docker ps
#
# CONTAINER ID        IMAGE               COMMAND             CREATED
```

In this tutorial, you started two containers; one from the `hello-world` image and another from the `ubuntu` image. Both containers are no longer running, but they still exist on your system.

To view all containers. active and inactive, run `docker ps` with the `-a` switch:

```sh
docker ps -a
#
# CONTAINER ID   IMAGE         COMMAND   CREATED         STATUS                     PORTS     NAMES
# 1c08a7a0d0e4   ubuntu        "bash"     About a minute ago   Exited (0) 7 seconds ago             dazzling_taussig
# 587000e49d53   hello-world   "/hello"   5 minutes ago        Exited (0) 5 minutes ago             adoring_kowalevski
```

To view the latest container you created, pass it the `-l` switch:

```sh
docker ps -l
#
# CONTAINER ID   IMAGE     COMMAND   CREATED         STATUS                     PORTS     NAMES
# 1c08a7a0d0e4   ubuntu    "bash"    3 minutes ago   Exited (0) 2 minutes ago             dazzling_taussig
```

To start a stopped container, use `docker start`, followed by the container ID or the container’s name. Let’s start the Ubuntu-based container with the ID of `1c08a7a0d0e4`:

```sh
docker start 1c08a7a0d0e4
```

The container will start, and you can use `docker ps` to see its status:

```sh
docker ps
#
# CONTAINER ID   IMAGE     COMMAND   CREATED         STATUS         PORTS     NAMES
# 1c08a7a0d0e4   ubuntu    "bash"    6 minutes ago   Up 8 seconds             dazzling_taussig
```

To stop a running container, use `docker stop`, followed by the container ID or name. This time, we’ll use the name that Docker assigned the container, which is `dazzling_taussig`:

```sh
docker stop dazzling_taussig
```

Once you’ve decided you no longer need a container anymore, remove it with the `docker rm` command, again using either the container ID or the name. Use the `docker ps -a` command to find the container ID or name for the container associated with the `hello-world` image and remove it.

```sh
docker rm adoring_kowalevski
```

You can start a new container and give it a name using the `--name` switch. You can also use the `--rm` switch to create a container that removes itself when it’s stopped. See the `docker run help` command for more information on these options and others.

Containers can be turned into images which you can use to build new containers. Let’s look at how that works.

---

## Step 7. Committing Changes in a Container to a Docker Image

When you start up a Docker image, you can create, modify, and delete files just like you can with a virtual machine. The changes that you make will only apply to that container. You can start and stop it, but once you destroy it with the `docker rm` command, the changes will be lost for good.

This section shows you how to save the state of a container as a new Docker image.

After installing Node.js inside the Ubuntu container, you now have a container running off an image, but the container is different from the image you used to create it. But you might want to reuse this Node.js container as the basis for new images later.

Then commit the changes to a new Docker image instance using the following command.

```sh
docker commit -m "What you did to the image" -a "Author Name" container_id repository/new_image_name
```

The `-m` switch is for the commit message that helps you and others know what changes you made, while `-a` is used to specify the author. The `container_id` is the one you noted earlier in the tutorial when you started the interactive Docker session. Unless you created additional repositories on Docker Hub, the `repository` is usually your Docker Hub username.

For example, for the user **sammy**, with the container ID of `d9b100f2f636`, the command would be:

```sh
docker commit -m "added Node.js" -a "sammy" d9b100f2f636 sammy/ubuntu-nodejs
```

When you *commit* an image, the new image is saved locally on your computer. Later in this tutorial, you’ll learn how to push an image to a Docker registry like Docker Hub so others can access it.

Listing the Docker images again will show the new image, as well as the old one that it was derived from:

```sh
docker images
#
# REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
# sammy/ubuntu-nodejs   latest              7c1f35226ca6        7 seconds ago       179MB
```

In this example, `ubuntu-nodejs` is the new image, which was derived from the existing `ubuntu` image from Docker Hub. The size difference reflects the changes that were made. And in this example, the change was that NodeJS was installed. So next time you need to run a container using Ubuntu with NodeJS pre-installed, you can just use the new image.

You can also build Images from a <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, which lets you automate the installation of software in a new image. However, that’s outside the scope of this tutorial.

Now let’s share the new image with others so they can create containers from it.

---

## Step 8. Pushing Docker Images to a Docker Repository

The next logical step after creating a new image from an existing image is to share it with a select few of your friends, the whole world on Docker Hub, or other Docker registry that you have access to. To push an image to Docker Hub or any other Docker registry, you must have an account there.

To push your image, first log into Docker Hub.

```sh
docker login -u docker-registry-username
```

You’ll be prompted to authenticate using your Docker Hub password. If you specified the correct password, authentication should succeed.

::: note

If your Docker registry username is different from the local username you used to create the image, you will have to tag your image with your registry username. For the example given in the last step, you would type:

```sh
docker tag sammy/ubuntu-nodejs docker-registry-username/ubuntu-nodejs
```

:::

Then you may push your own image using:

```sh
docker push docker-registry-username/docker-image-name
```

To push the `ubuntu-nodejs` image to the **sammy** repository, the command would be:

```sh
docker push sammy/ubuntu-nodejs
#
# The push refers to a repository [docker.io/sammy/ubuntu-nodejs]
# e3fbbfb44187: Pushed
# 5f70bf18a086: Pushed
# a3b5c80a4eba: Pushed
# 7f18b442972b: Pushed
# 3ce512daaf78: Pushed
# 7aae4540b42d: Pushed
```

The process may take some time to complete as it uploads the images, but when completed, the output will look like this:

After pushing an image to a registry, it should be listed on your account’s dashboard, like that show in the image below.

![New Docker image listing on Docker Hub](https://assets.digitalocean.com/articles/docker_1804/ec2vX3Z.png)

If a push attempt results in an error of this sort, then you likely did not log in:

```plaintext title="output"
The push refers to a repository [docker.io/sammy/ubuntu-nodejs]
e3fbbfb44187: Preparing
5f70bf18a086: Preparing
a3b5c80a4eba: Preparing
7f18b442972b: Preparing
3ce512daaf78: Preparing
7aae4540b42d: Waiting
unauthorized: authentication required
```

Log in with `docker login` and repeat the push attempt. Then verify that it exists on your Docker Hub repository page.

You can now use `docker pull sammy/ubuntu-nodejs` to pull the image to a new machine and use it to run a new container.

---

## Installing Docker with GPU Support

To install Docker with GPU support, you’ll need to follow a slightly different process than the standard Docker installation. This is because GPU support requires additional drivers and configurations to enable Docker to utilize the GPU resources. Here are the steps to help you install Docker with GPU support:

- Ensure your system has a compatible NVIDIA GPU.
- Install the NVIDIA driver for your GPU. You can find the installation instructions on the [<VPIcon icon="iconfont icon-nvidia"/>NVIDIA website](https://nvidia.com/en-us/drivers/).
- Install the `nvidia-docker2` package, which provides the necessary tools for Docker to interact with the NVIDIA GPU.

### Installation Steps

- Add the NVIDIA Docker repository:

```sh
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
```

- Update your package list and install the `nvidia-docker2` package:

```sh
sudo apt update && sudo apt install nvidia-docker2
```

- Restart the Docker service to apply the changes:

```sh
sudo service docker restart
```

- Verify that the NVIDIA runtime is available:

```sh
sudo docker info | grep Runtime
```

This should display the NVIDIA runtime as an available runtime.

### Using GPU Support

To use GPU support with your Docker containers, you’ll need to specify the `--gpus` flag when running your container. For example:

```sh
sudo docker run --gpus all nvidia/cuda:10.2-base nvidia-smi
```

This command runs a container with the NVIDIA CUDA image and executes the `nvidia-smi` command to verify GPU support.

For more information on installing and using Docker with GPU support, refer to the following resources:

```component VPCard
{
  "title": "Overview — NVIDIA Container Toolkit",
  "desc": "The NVIDIA Container Toolkit is a collection of libraries and utilities enabling users to build and run GPU-accelerated containers. It currently includes:",
  "link": "https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/index.html/",
  "logo": "https://docs.nvidia.com/_static/favicon.ico",
  "background": "rgba(118,185,0,0.2)"
}
```

<SiteInfo
  name="Resource constraints"
  desc="Specify the runtime options for a container"
  url="https://docs.docker.com/engine/containers/resource_constraints//"
  logo="https://docs.docker.com/assets/images/favicon.svg"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

```component VPCard
{
  "title": "nvidia/cuda - Docker Image",
  "desc": "CUDA and cuDNN images from gitlab.com/nvidia/cuda",
  "link": "https://hub.docker.com/r/nvidia/cuda//",
  "logo": "https://hub.docker.com/favicon.ico",
  "background": "rgba(41,134,255,0.2)"
}
```

By following these steps and using the provided resources, you should be able to successfully install and use Docker with GPU support on your system.

---

## Configuring Docker Security Best Practices

[<VPIcon icon="fa-brands fa-docker"/>Docker Engine Security](https://docs.docker.com/engine/security/) is crucial to ensure that your containers and the host system are protected from potential vulnerabilities. Here are some best practices to follow:

- **Use the least privilege principle**: Ensure that your containers run with the least privileges necessary to perform their tasks.
- **Use a non-root user**: Run your containers as a non-root user to limit the attack surface in case of a breach.
- **Keep your Docker version up-to-date**: Regularly update your Docker version to ensure you have the latest security patches.
- **Use Docker Content Trust**: Enable Docker Content Trust to ensure the integrity of the images you pull from Docker Hub.
- **Limit network exposure**: Only expose the necessary ports to the network to minimize the attack surface.

---

## Using Docker Compose

[<VPIcon icon="fa-brands fa-docker"/>Docker Compose](https://docs.docker.com/compose/) is a tool for defining and running multi-container Docker applications. It allows you to define the services that make up your application and how they interact with each other. Here are some benefits of using Docker Compose:

- **Simplified application deployment**: Docker Compose simplifies the process of deploying multi-container applications.
- **Easy service management**: Docker Compose allows you to easily start, stop, and scale your services.
- **Version control**: Docker Compose files can be version controlled, making it easy to track changes to your application’s configuration.

---

## Removing Docker Packages

[<VPIcon icon="fa-brands fa-docker"/>Removing Docker packages](https://docs.docker.com/engine/install/ubuntu/#uninstall-docker-engine) is an essential part of maintaining your system and ensuring that you have the latest versions of Docker installed. Here are some steps to follow:

- **List all installed Docker packages**: Use the command `dpkg -l | grep docker` to list all installed Docker packages.
- **Remove the Docker package**: Use the command `sudo apt remove docker-ce` to remove the Docker package.
- **Remove Docker dependencies**: Use the command `sudo apt autoremove` to remove any dependencies that are no longer needed.
- **Update your package list**: Use the command `sudo apt update` to update your package list after removing Docker packages.

Images, containers, volumes, or custom configuration files on your host aren’t automatically removed. To delete all images, containers, and volumes:

```sh
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

Remove source list and keyrings:

```sh
sudo rm /etc/apt/sources.list.d/docker.list
sudo rm /etc/apt/keyrings/docker.asc
```

---

## Common Errors and Debugging

### Docker Daemon Not Starting

If the [<VPIcon icon="fa-brands fa-docker"/>Docker daemon](https://docs.docker.com/engine/reference/commandline/dockerd/) fails to start, it can be due to various reasons such as configuration issues, conflicts with other services, or system resource constraints. To troubleshoot this issue, you may observe error messages like:

```plaintext
Failed to start Docker Application Container Engine.
```

or

```plaintext
docker.service: Main process exited, code=exited, status=1/FAILURE
```

To resolve this issue:

1. Check the Docker service status: `sudo systemctl status docker`
2. Review the Docker logs for errors: `sudo journalctl -u docker`
3. Ensure the Docker service is enabled to start on boot: `sudo systemctl enable docker`
4. Restart the Docker service: `sudo systemctl restart docker`

### Permission Errors When Running Docker Commands

[<VPIcon icon="fa-brands fa-docker"/>Permission errors](https://docs.docker.com/engine/install/linux-postinstall/) occur when the user running Docker commands does not have sufficient privileges. To troubleshoot this issue, you may observe error messages like:

```plaintext
docker: Cannot connect to the Docker daemon. Is the docker daemon running on this host?.
See 'docker run --help'.
```

To resolve this issue:

1. Ensure the user is part of the `docker` group: `sudo usermod -aG docker ${USER}`
2. Log out and log back in to apply the group membership changes
3. Alternatively, use `sudo` before running Docker commands: `sudo docker <command>`

By following these steps, you should be able to resolve common errors related to the Docker daemon not starting and permission errors when running Docker commands.

---

## FAQs

::: details How do I install Docker on Ubuntu 22.04?

To [<VPIcon icon="fa-brands fa-docker"/>install Docker on Ubuntu](https://docs.docker.com/engine/install/ubuntu/), follow these steps:

```sh
# 1. Update your package list:
sudo apt update
# 2. Install the necessary packages
sudo apt install apt-transport-https \
ca-certificates \
curl \
software-properties-common
# 3. Add the Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# 4. Add the Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# 5. Update your package list again
sudo apt update
# 6. Install Docker
sudo apt install docker-ce
```

:::

::: details How do I verify that Docker is installed on Ubuntu?

To verify that Docker is installed on Ubuntu, run the following command: `sudo systemctl status docker`

This command will show you the status of the Docker service. If Docker is installed and running, you should see an output indicating that the service is active and running. Here’s an example of what you might see:

```plaintext title="output"
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2025-04-08 21:30:25 UTC; 22s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 7854 (dockerd)
      Tasks: 7
     Memory: 38.3M
        CPU: 340ms
     CGroup: /system.slice/docker.service
             └─7854 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

:::

::: details How do I run Docker without `sudo`?

To run Docker without using `sudo`, you need to add your user to the `docker` group. Here’s how:

1. Add your user to the `docker` group: `sudo usermod -aG docker ${USER}`
2. Log out and log back in to apply the changes

After adding your user to the `docker` group, you should be able to run Docker commands without using `sudo`.

:::

::: details How do I uninstall Docker from Ubuntu?

To [<VPIcon icon="fa-brands fa-docker"/>uninstall Docker from Ubuntu](https://docs.docker.com/engine/install/ubuntu/#uninstall-docker-engine), follow these steps:

```sh
# 1. Stop the Docker service
sudo systemctl stop docker
# 2. Remove Docker packages
sudo apt purge docker-ce
# 3. Remove Docker dependencies
sudo apt autoremove
# 4. Remove the Docker repository
sudo rm /etc/apt/sources.list.d/docker.list
```

:::

---

## Conclusion

In this tutorial, you installed Docker, worked with images and containers, and pushed a modified image to Docker Hub. Now that you know the basics, explore the [<VPIcon icon="iconfont icon-digitalocean"/>other Docker tutorials](https://digitalocean.com/community/tags/docker?type=tutorials) in the [<VPIcon icon="iconfont icon-digitalocean"/>DigitalOcean Community](https://digitalocean.com/community). For more advanced Docker configurations, consider the following tutorials:

::: info

- [**Setting up a private Docker registry**](/digitalocean.com/how-to-set-up-a-private-docker-registry-on-ubuntu-22-04.md)
- [**Running Nginx in a Docker container**](/digitalocean.com/how-to-run-nginx-in-a-docker-container-on-ubuntu-22-04.md)
- [**Using Ansible to install and set up Docker**](/digitalocean.com/how-to-use-ansible-to-install-and-set-up-docker-on-ubuntu-22-04.md)
- [**Installing a LAMP stack on Ubuntu**](/digitalocean.com/how-to-install-lamp-stack-on-ubuntu.md)

These tutorials will help you further expand your Docker knowledge and explore different use cases.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Install Docker on Ubuntu – Step-by-Step Guide",
  "desc": "Learn how to install Docker on Ubuntu with this step-by-step guide. Set up Docker, run containers, and troubleshoot common installation issues. ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-and-use-docker-on-ubuntu-22-04.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
