---
lang: en-US
title: "Awesome-Compose: Application samples for project development kickoff"
description: "Article(s) > Awesome-Compose: Application samples for project development kickoff"
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
      content: "Article(s) > Awesome-Compose: Application samples for project development kickoff"
    - property: og:description
      content: "Awesome-Compose: Application samples for project development kickoff"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/awesome-compose-app-samples-for-project-dev-kickoff.html
prev: /devops/docker/articles/README.md
date: 2020-03-26
isOriginal: false
author:
  - name: Anca Iordache
    url: https://docker.com/contributors/anca-iordache/
cover: https://docker.com/app/uploads/2020/03/project-dev-kickoff.png
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
  name="Awesome-Compose: Application samples for project development kickoff"
  desc="Software systems have become quite complex nowadays. A system may consist of several distributed services, each one providing a specific functionality and being updated independently. Starting the development of a project of such complexity is sometimes time consuming, in particular when you are not already familiar with the software stack you are going to work on. This may be because, most of the time, we need to follow rigorous steps to put together the entire project and if we make a mistake in-between, we may have to start all over again."
  url="https://docker.com/blog/awesome-compose-app-samples-for-project-dev-kickoff"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/03/project-dev-kickoff.png"/>

![project dev kickoff](https://docker.com/app/uploads/2020/03/project-dev-kickoff.png)

Software systems have become quite complex nowadays. A system may consist of several distributed services, each one providing a specific functionality and being updated independently. Starting the development of a project of such complexity is sometimes time consuming, in particular when you are not already familiar with the software stack you are going to work on. This may be because, most of the time, we need to follow rigorous steps to put together the entire project and if we make a mistake in-between, we may have to start all over again.

As a developer, getting **a quick understanding of how all the stack is wired together** and having an easy to manage project skeleton may be a very good incentive to use that particular stack for future projects.

Furthermore, there are plenty of open-source software stacks that developers can use for their own setups. Providing them with a straightforward way to deploy these software stacks in order to check them out is an important matter when looking to simplify software development and allow developers to explore different options.

To tackle this, we have put together **a Github repository with application samples** that can be easily deployed with [<VPIcon icon="fa-brands fa-docker"/>Docker Compose](https://docs.docker.com/compose/install/). The repository name is [awesome-compose (<VPIcon icon="iconfont icon-github"/>`docker/awesome-compose`)](https://github.com/docker/awesome-compose) and it contains a curated list of Compose application samples which can provide a good starting point for how to integrate different services using a Compose file and to manage their deployment with Docker Compose.

The awesome-compose repository was created to provide **a quick and simple way for developers to experience Compose-based setups** with different software stacks.  Moreover, we hope that you are willing to share your best examples of compose files for different stacks that are not already in the repository or to improve the current samples for everybody to use.

The setups provided currently in the awesome-compose repository fit mainly in two categories:

- **Application skeletons:** useful for kicking off project development. We can find different application skeletons with multiple services already wired together and ready to be launched with docker-compose;
- **Setups with different open-source software stacks**. These are not production ready, they are intended mostly for personal/home use or simply for developers to get familiar with them within their local dev environment.

All samples in the repository are provided as they are, everybody can customize each sample according to their needs.

We will discuss further each category and what are the benefits they can provide.

---

## Kickoff a project with an application sample

To be able to run the samples from the repository, make sure you have already installed:

- Windows or macOS: [<VPIcon icon="fa-brands fa-docker"/>Install Docker Desktop](https://docker.com/get-started)
- Linux: [<VPIcon icon="fa-brands fa-docker"/>Install Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and then [Docker Compose (<VPIcon icon="iconfont icon-github"/>`docker/compose`)](https://github.com/docker/compose)

Then, either git clone or download one or more samples from the [awesome-compose (<VPIcon icon="iconfont icon-github"/>`docker/awesome-compose`)](https://github.com/docker/awesome-compose) repository.

```sh
git clone https://github.com/docker/awesome-compose.git  
cd awesome-compose
```

At the root of each sample there is the <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`. It contains the definition and the structure of the application and instructions on how to wire the components of the application.

Identify the sample that matches your requirements and open its directory. Sample’s directory names follow a very simple pattern consisting of component names separated by *‘-’*. This allows us to quickly identify the sample we need for our project. For this exercise, let us use the `nginx-flask-mysql` sample.

There are a few simple steps to follow to get the application skeleton up and running and be able to modify it.

### Deploy the application sample

Open the sample directory and run it with docker-compose:

```sh
cd nginx-flask-mysql
docker-compose up -d
#
# Creating volume "nginx-flask-mysql_db-data" with default driver  
# Building backend  
# Step 1/8 : FROM python:3.8-alpine  
# 3.8-alpine: Pulling from library/python  
# ...  
# ...  
# Creating nginx-flask-mysql_db_1      ... done  
# Creating nginx-flask-mysql_proxy_1   ... done  
# Creating nginx-flask-mysql_backend_1 ... done
```

Check there are three containers running, one for each service:

```sh
docker-compose ps
#
# Name                          Command                          State        Ports  
# -----------------------------------------------------------------------------------------------------
# nginx-flask-mysql_backend_1   /bin/sh -c flask run --hos ...   Up           0.0.0.0:5000->5000/tcp  
# nginx-flask-mysql_db_1        docker-entrypoint.sh --def ...   Up           3306/tcp, 33060/tcp  
# nginx-flask-mysql_proxy_1     nginx -g daemon off;             Up           0.0.0.0:80->80/tcp
```

Query port 80 of the proxy container with curl or in a web browser to have the backend pass the data from the DB:

```sh
curl localhost:80
#
# <div>Blog post #1</div><div>Blog post #2</div><div>Blog post #3</div><div>Blog post #4</div>
```

### Modify and update the application sample

Let us assume that we have to change the application server, in this case being the backend service which is implemented in python using the Flask framework. The method returning the message we queried previously can be found below.

```py
@server.route('/')  
def listBlog():  
  global conn  
  if not conn:  
      conn = DBManager(password_file='/run/secrets/db-password')  
      conn.populate_db()  
  rec = conn.query_titles()  
  response = ''  
  for c in rec:  
    response = response + '<div> ' + c + '</div>'  
  return response
```

Assume we change this method to remove the html tags:

```py
@server.route('/')  
def listBlog():  
  ...  
  for c in rec:  
    response = response + ' ' + c + ' '  
  return response
```

As all our containers are already running, the logical workflow would be to stop the backend service, rebuild its image and re-run to get our change in. Doing this would be very inefficient during development.

We could in turn, hack the `docker-compose` file and add under the backend service the following setting:

```yaml title="docker-compose.yaml"
backend:  
  build: backend  
  restart: always  
  volumes:  
    - ./backend:/code  
...
```

This would instruct Docker Compose to mount the backend source code to the container path from where it is being executed on container start.

Now, all we have to do is to restart the backend to have the changed code executed.

```sh
docker-compose restart backend  
#
# Restarting nginx-flask-mysql_backend_1 ... done
```

Querying again the proxy, we can observe the change:

```sh
curl localhost:80
#
# Blog post #1 Blog post #2 Blog post #3 Blog post #4
```

### Cleanup deployment  and data

To remove all containers run:

```sh
docker-compose down
# 
# Stopping nginx-flask-mysql_backend_1 ... done  
# Stopping nginx-flask-mysql_db_1 ... done  
# Stopping nginx-flask-mysql_proxy_1 ... done  
# Removing nginx-flask-mysql_backend_1 ... done  
# Removing nginx-flask-mysql_db_1 ... done  
# Removing nginx-flask-mysql_proxy_1 ... done  
# Removing network nginx-flask-mysql_backnet  
# Removing network nginx-flask-mysql_frontnet
```

Adding the *-v* parameter to the down command ensures all data hosted by the *db service* is being deleted:

```sh
docker-compose down -v  
# ...  
# Removing volume nginx-flask-mysql_db-data
```

To conclude this part, the samples provided in the awesome-compose repository may help developers to put together all the components for their project in a matter of minutes. This is most beneficial in particular for beginners in the development with containerized applications that can be managed with docker-compose.

---

## Setups for different software stacks

The second type of samples that awesome-compose repository contains are compose files for setting up different platforms such as Nextcloud, WordPress, Gitea etc. These samples consist mostly of a Compose file defining a basic setup for each of the components. The purpose for these is to provide developers an easier introduction to different software stacks they could take a quick view at what they offer and tinker with.

Let us consider the Nextcloud setup for the next exercise. Nextcloud is an open source file sharing platform that anyone can install for their private use. The setups in the awesome-compose repository are pieced together according to the instructions on the Nextcloud’s [official image page (<VPIcon icon="fa-brands fa-docker"/>`nextcloud`)](https://hub.docker.com/_/nextcloud) in Docker Hub.

To deploy it, select the directory of the nextcloud sample you prefer:

```sh
cd nextcloud-postgres/
ls
#
# docker-compose.yaml  README.md
```

And run it with docker compose:

```sh
docker-compose up -d
#
# Creating network "nextcloud-postgres_default" with the default driver
# Creating volume "nextcloud-postgres_db_data" with default driver
# Creating volume "nextcloud-postgres_nc_data" with default driver
# Pulling nc (nextcloud:apache)...
# apache: Pulling from library/nextcloud
# ...
# Creating nextcloud-postgres_nc_1 ... done
# Creating nextcloud-postgres_db_1 ... done
```

Check that containers are running:

```sh
docker-compose ps
# Name                          Command                          State        Ports  
# -----------------------------------------------------------------------------------------------------
# nextcloud-postgres_db_1   docker-entrypoint.sh postgres        Up           5432/tcp  
# nextcloud-postgres_nc_1   /entrypoint.sh apache2-for ...       Up           0.0.0.0:80->80/tcp  
docker ps
#
# CONTAINER ID   IMAGE              COMMAND                   CREATED          STATUS              PORTS                NAMES  
# a1381bcf5b1c   nextcloud:apache   "/entrypoint.sh apac..."  14 minutes ago   Up About a minute   0.0.0.0:80->80/tcp   nextcloud-postgres_nc_1  
# ec66a5aff8ac  postgres:alpine "docker-entrypoint.s..."      14 minutes ago   Up About a minute   5432/tcp             nextcloud-postgres_db_1
```

In only a few minutes (depends on the internet connection) we get a nextcloud platform up and running on our local machine. Opening a browser window and going to *localhost:80* should land us on the Nextcloud’s initialization page:

![](https://docker.com/app/uploads/2020/03/output.jpg)

Similarly to the first exercise, to remove all containers run:

```sh
docker-compose down
#
# Stopping nextcloud-postgres_nc_1 ... done
# Stopping nextcloud-postgres_db_1 ... done
# Removing nextcloud-postgres_nc_1 ... done
# Removing nextcloud-postgres_db_1 ... done
# Removing network nextcloud-postgres_defaul
```

Use the *-v* parameter to delete the volumes where the nextcloud data gets stored*.* Identical steps should be followed for all other samples of useful software stacks.

---

## Summary

Lowering the barrier in deploying different software stacks, enables more and more developers to have a look at them and potentially use them for their projects.

The *awesome-compose* repository was created with the purpose of aggregating compose files and application samples that may be useful to anyone interested in containerized applications.

::: info Call for contributions

All developers already familiar with compose and that have already set up interesting stacks that may be useful to others, are highly encouraged to add them to the repository and share them.  Improvements on the current samples are also very much appreciated!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Awesome-Compose: Application samples for project development kickoff",
  "desc": "Software systems have become quite complex nowadays. A system may consist of several distributed services, each one providing a specific functionality and being updated independently. Starting the development of a project of such complexity is sometimes time consuming, in particular when you are not already familiar with the software stack you are going to work on. This may be because, most of the time, we need to follow rigorous steps to put together the entire project and if we make a mistake in-between, we may have to start all over again.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/awesome-compose-app-samples-for-project-dev-kickoff.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
