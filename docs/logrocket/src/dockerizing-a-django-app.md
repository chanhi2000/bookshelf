---
lang: en-US
title: "Dockerizing a Django app"
description: "Article(s) > Dockerizing a Django app"
icon: iconfont icon-django
category:
  - Python
  - Django
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - python
  - py
  - django
  - py-django
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Dockerizing a Django app"
    - property: og:description
      content: "Dockerizing a Django app"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/dockerizing-django-app.html
prev: /programming/py-django/articles/README.md
date: 2022-04-08
isOriginal: false
author:
  - name: Kimaru Thagana
    url: https://blog.logrocket.com/author/kimaruthagana/
cover: /assets/image/blog.logrocket.com/dockerizing-a-django-app/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Django > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
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
  name="Dockerizing a Django app"
  desc="Docker isolates your application and its dependencies and ensures consistent runtime protocols regardless of server configurations."
  url="https://blog.logrocket.com/dockerizing-django-app/"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/dockerizing-a-django-app/banner.png"/>

::: note Editor's note

This article was updated on 8 April 2022 to provide more information to some key terms, explain each of the commands in the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, and break down the Django app setup into clearer steps.

:::

To actualize a Django project, most of the time you need an off-the-shelf solution in the form of a library or dependency.

This is typically not an issue, and is often documented in the <VPIcon icon="fas fa-file-lines"/>`requirements.txt` file that will contain the list of packages or dependencies along with their respective version that you need to run your project.

The trouble starts when you attempt to share the entire project with another individual who wishes to run and test it because, unfortunately, the user will have to perform the setup from scratch every time you make significant changes in the libraries and dependencies.

This is where containerization and [<VPIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/) come in. Docker isolates your application and its dependencies and ensures consistent runtime protocols for your applications regardless of the configurations of the servers hosting your application.

---

## What is Docker?

Docker is an open-source tool that manages the development, testing and deployment of [<VPIcon icon="fa-brands fa-docker"/>containerized applications](https://docker.com/resources/what-container).

It offers hardware virtualization at the OS level and is suitable for modern architecture. This allows developers to package and ship software and its dependencies in order to distribute it as containers.

It's an incredibly popular containerization platform that solves the library and dependency issues once and for all.

But its best feature? Regardless of host or underlying infrastructure, your containerized application will always run the same way.

In simple terms, you can now wrap up all the pieces your software needs in a single unit, called a Docker image, then ship or share this image with anyone. As long as the recipient has Docker installed on their machine, they will be able to run or test your project. Gone are the days of wondering why a project works on one machine and not another.

Docker also offers a service called [<VPIcon icon="fa-brands fa-docker"/>DockerHub](https://hub.docker.com/) that allows you to share and manage Docker images among other developers and larger communities — essentially, it's a “GitHub” for Docker images.

It shares some similarities with the code repository platform, such as uploading and downloading images via CLI commands contained within the Docker CLI.

---

## Why should you use Docker?

### Remote services

A developer can pull Docker images from [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/)to any machine that hosts its containers. Implying that you can always retrieve a Docker image, build it, and run an instance of it from wherever you are and whenever you want.

### Cost efficiency

Docker allows you to support several containers with one infrastructure rather than using multiple virtual machines to run identical copies of the virtual OS managed by the hypervisor, which can be expensive to maintain.

### Scalability

Docker containers can efficiently scale-up applications to withstand more load and automatically decrease the computing load of your application when the amount of requests reduces.

### Security

Containers are immutable, meaning that when you change the configuration of an image, you have to rebuild the image and run a new instance.

::: tip Prerequisites for using Docker

- Proficiency in Django development
- Intermediate level with CLI and [<VPIcon icon="fas fa-globe"/>bash](https://linuxconfig.org/bash-scripting-tutorial-for-beginners)

:::

---

## Docker installation

This tutorial uses YAML files to perform Docker scripting and executes the files via the Docker CLI. This guide will explore setting up Docker on an Ubuntu machine. If you are using a different OS, you can check out the documentation for getting started with [<VPIcon icon="fa-brands fa-docker"/>Windows](https://docs.docker.com/docker-for-windows/install/) and [<VPIcon icon="fa-brands fa-docker"/>macOS](https://docs.docker.com/docker-for-mac/install/).

To download and set up Docker, run the command below on your terminal:

```sh
sudo apt-get update  
sudo apt-get install docker-ce docker-ce-cli containerd.io 
```

---

## Setting up and Dockerizing a Django app

This guide assumes you are already proficient in Django, so there won't be any emphasis on the structure of a Django app. If you are new to Django, [**here**](/blog.logrocket.com/creating-an-app-with-react-and-django.md) is a tutorial to get you up to speed.

Let's skip ahead to the steps for running a basic Django REST framework app in Docker and displaying the default page. Consider it the `Hello, world!` of Django and Docker.

Using the guide provided in this tutorial, you can Dockerize any previous or future Django project you may have, especially one that has libraries listed in <VPIcon icon="fas fa-file-lines"/>`requirements.txt`.

### Step 1

To start, run the below command and follow the steps afterwards:

```sh
django-admin startproject dj_docker_drf
```

- Navigate into your project folder
- Start an app named `sample`
- Add `rest_framework` and `sample` to the `INSTALLED_APPS` list in <VPIcon icon="fa-brands fa-python"/>`settings.py`

### Step 2

In the <VPIcon icon="fa-brands fa-python"/>`views.py` file, add the below code snippet that returns the message, “HELLO WORLD FROM DJANGO AND DOCKER”.

```py title="views.py"
from rest_framework.views import APIView 
from django.http import JsonResponse

class HomeView(APIView): 
    def get(self, request, format=None): 
        return JsonResponse({"message": 'HELLO WORLD FROM DJANGO AND DOCKER'})
```

### Step 3

Connect the main URL file and the app URL file so that `HomeView` is the default view when a user accesses the app on the browser.

In order to allow access to the Django app from any server or IP address, ensure that `ALLOWED_HOSTS` in the <VPIcon icon="fa-brands fa-python"/>`settings.py` file is set to `*`, as shown in the snippet below:

```py title="settings.py"
ALLOWED_HOSTS = [‘*’]
```

### Step 4

Finally, create a <VPIcon icon="fas fa-file-lines"/>`requirements.txt` file in your root project folder and add the DRF library:

```plaintext title="requirement.txt"
django-rest-framework==0.1.0 
```

The app is now ready to be Dockerized.

---

## Creating the Dockerfiles and Docker CLI

Notice that the Dockerfile is named. This is to allow the Docker CLI to track it.

In your project root, create a file named <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` without an extension and add the following snippet to the file:

```dockerfile title="Dockerfile"
# base image 
FROM python:3.8 
# setup environment variable
ENV DockerHOME=/home/app/webapp

# set work directory
RUN mkdir -p $DockerHOME

# where your code lives
WORKDIR $DockerHOME

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip

# copy whole project to your docker home directory.
COPY . $DockerHOME
# run this command to install all dependencies
RUN pip install -r requirements.txt
# port where the Django app runs
EXPOSE 8000
# start server 
CMD python manage.py runserver 
```

Let's explore the Dockerfile and what each of the commands do.

- `FROM python:3.8` : This installs a Python image into the Docker image. This is also the version of Python that will run the application in the container
- `ENV DockerHOME=/home/app/webapp`: Here we declare the working directory and assign it to the variable name `DockerHOME`. This will be the root directory of the Django app in the container
- `RUN mkdir -p $DockerHOME`: This creates the directory with the specified path assigned to the `DockerHOME` variable within the image
- `WORKDIR $DockerHOME`: This explicitly tells Docker to set the provided directory as the location where the application will reside within the container
- `RUN pip install --upgrade pip`: This updates the `pip` version that will be used to install the dependencies for the application
- `COPY . $DockerHOME`: This copies every other necessary file and its respective contents into the app folder that is the root directory of the application within the container
- `RUN pip install -r requirements.txt`: This command installs all the dependencies defined in the <VPIcon icon="fas fa-file-lines"/>`requirements.txt` file into your application within the container
- `EXPOSE 8000`: This command releases port 8000 within the container, where the Django app will run
- `CMD python manage.py runserver`: This command starts the server and runs the application

---

## Running the app in Docker

To run the app, you need to perform two steps:

1. Build the image: This is done using the `build` command, which uses the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` you just created. To build the image, run the command below:`docker build . -t docker-django-v0.0`.This command should be executed in the directory where the Docker file lives. The `-t` flag tags the image so that it can be referenced when you want to run the container.
2. Run the image: This is done using the `docker run` command. This will convert the built image into a running container. To run the app, execute the below command:`docker run docker-django-v0.0`

You can proceed to view your app in the browser at localhost:8000.

---

## Running multiple containers with Docker Compose

There are instances where you may want to run multiple containers in Docker and execute them in a specific order.

This is where [<VPIcon icon="fa-brands fa-docker"/>Docker Compose](https://docs.docker.com/compose/) comes in handy.

Docker Compose is a tool for defining and running multi-container applications of any kind. If you have an application comprising several containers, you will use the Docker Compose CLI to run them all in the required order that you specify.

Take, for example, a web application with the following components:

1. Web server container such as [<VPIcon icon="iconfont icon-nginx"/>Nginx](https://nginx.com/)
2. Application container that hosts the Django app
3. Database container that hosts the production database, such as PostgreSQL
4. A message container that hosts the message broker, such as [<VPIcon icon="iconfont icon-erl-rabbitmq"/>RabbitMQ](https://rabbitmq.com/)

To run such a system, you will declare the directives in a Docker Compose YAML file. Here, you define how the images will be built, on which port will each of the images will be accessible, and most importantly, the order in which the containers should execute (i.e., which container depends on another container for the project to run successfully).

---

## Using Docker Compose with a Django app

Let's explore Docker Compose using the scenario demonstrated above: a Django app with a PostgreSQL database, RabbitMQ message broker, and an Nginx load balancer. Follow this [<VPIcon icon="fa-brands fa-docker"/>guide](https://docs.docker.com/compose/install/) to install the CLI tool on your host operating system.

With Docker Compose (and, similarly to Docker), a particular file with a specific name is required. The CLI tool reads this file and uses it to spin up the Docker images and run them.

To create a Docker Compose file, create a YAML file and name it <VPIcon icon="iconfont icon-yaml"/><VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`. This ideally should exist at the root directory of your project.

```yaml :collapsed-lines title="docker-compose.yaml"
version: '3.7'
services: # the different images that will be running as containers
  nginx: # service name
    # location of the dockerfile that defines the nginx image. The dockerfile will be used to spin up an image during the build stage.
    build: ./nginx 
    # map the machine port 1339 to the container port 80. Any traffic from 1339 externally will be passed to port 80 of the NGINX container. You can access this container viea localhost:1339
    ports: - 1339:80 
    # static storages provisioned since django does not handle static files in production
    volumes: - static_volume:/home/app/microservice/static 
    
    # will only start if web is up and running
    depends_on: - web
    # restart service when it fails
    restart: "on-failure"
  web: # service name
    # build the image for the web service from the dockerfile in parent directory. 
    build: . 
    # command directive passes the parameters to the service and they will be executed by the service. In this example, these are django commands which will be executed in the container where django lives. 
    command: sh -c "python manage.py makemigrations &&
                    python manage.py migrate &&
                    gunicorn microservice_sample_app.wsgi:application --bind 0.0.0.0:${APP_PORT}"
    # map data and files from parent directory in host to microservice directory in docker container
    volumes: 
      - .:/microservice
      - static_volume:/home/app/microservice/static 
    # file where env variables are stored. Used as best practice so as not to expose secret keys 
    env_file: 
      - .env
    # name of the env file # name of the image 
    image: microservice_app 
    # expose the port to other services defined here so that they can access this service via the exposed port. In the case of Django, this is 8000 by default
    expose:
      - ${APP_PORT} # retrieved from the .env file
    restart: "on-failure" 
    # cannot start if db service is not up and running 
    depends_on:
      - db
  db: # service name
    # image name of the postgres database. during build, this will be pulled from dockerhub and a container spun up from it.
    image: postgres:11-alpine
    volumes: 
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
      - postgres_data:/var/lib/postgresql/data/ 
    # access credentials from the .env file
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD} 
      - POSTGRES_DB=${DB_NAME} - PGPORT=${DB_PORT} 
      - POSTGRES_USER=${POSTGRES_USER}
    restart: "on-failure"
  rabbitmq:
    # image to be pulled from dockerhub during building
    image: rabbitmq:3-management-alpine 
    # container name 
    container_name: rabbitmq 
    volumes: 
      rabbitmq:
        - ./.docker/rabbitmq/etc/:/etc/rabbitmq/
        - ./.docker/rabbitmq/data/:/var/lib/rabbitmq/
    rabbitmq_logs:
      - ./.docker/rabbitmq/logs/:/var/log/rabbitmq/
    # environment variables from the referenced .env file
    environment: 
      RABBITMQ_ERLANG_COOKIE: ${RABBITMQ_ERLANG_COOKIE} 
      # auth cretendials
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_DEFAULT_USER}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_DEFAULT_PASS}
    # map external ports to this specific container's internal ports
    ports:
      - 5672:5672
      - 15672:15672
    # can only start if web service is running 
    depends_on: 
      - web

volumes:
  postgres_data:
  static_volume:
  rabbitmq:
  rabbitmq_logs:
```

One of the highlights of Docker Compose is the `depends_on` directive. From the above script, we can deduce that:

- Nginx depends on web
- Web depends on DB
- RabbitMQ depends on web

With this setup, DB is the first service we need to start up, followed by web, then RabbitMQ, and lastly, Nginx.

When you decide to terminate the environment and stop the running containers, the order will be in reverse — that is, Nginx will be the first to run and DB the last.

---

## Building and running Docker Compose scripts

Just like a Docker script, the Docker Compose script has a similar structure in that it has `build` and `run` commands.

The `build` command will build all the images defined under `services` within the <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` in the order of the dependency hierarchy.

Luckily, there is also a command that combines both `build` and `run` — this is called `up`. To run this command, execute the command here:

```sh
docker-compose up
```

You can also add the `--build` flag. This is useful when you've run this command before and want to build new images.

```sh
docker-compose up --build
```

Once you're done with the containers, you may wish to shut them all down and remove any static storage they were using, such as the PostgreSQL static volume. To do this, run the following command:

```sh
docker-compose down -V
```

The `-V` flag stands for volumes. This ensures that the containers and attached volumes are shut down.

Follow the official [<VPIcon icon="fa-brands fa-docker"/>documentation](https://docs.docker.com/compose/reference/) to learn more about various Docker Compose commands and their usage.

---

## Supporting files in a Django application

There are some files referenced in the script above that make the file less bulky, thus making code management easier. These include the <VPIcon icon="fas fa-file-lines"/>`.env` file, the Nginx's Dockerfile and config files. Below are samples of what each entails:

### <VPIcon icon="fas fa-file-lines"/>`.env` file

The main purpose of this file is to store variables, such as keys and credentials. Environment variables are a set of key-value pairs for the current user environment. This is a safe coding practice that ensures your personal keys are not exposed.

```sh title=".env"
#Django
SECRET_KEY="my_secret_key"
DEBUG=1
ALLOWED_HOSTS=localhost 127.0.0.1 0.0.0.0 [::1] *

# database access credentials
ENGINE=django.db.backend.postgresql
DB_NAME=testdb
POSTGRES_USER=testuser
POSTGRES_PASSWORD=testpassword
DB_HOST=db
DB_PORT=5432 APP_PORT=8000
#superuser details 
DJANGO_SU_NAME=test
DJANGO_SU_EMAIL=admin12@admin.com
DJANGO_SU_PASSWORD=mypass123 
#rabbitmq
RABBITMQ_ERLANG_COOKIE: test_cookie
RABBITMQ_DEFAULT_USER: default_user
RABBITMQ_DEFAULT_PASS: sample_password
```

### The Nginx Dockerfile

This is hosted in an <VPIcon icon="fas fa-folder-open"/>`nginx` folder within the root directory. It mainly contains two directives: the image name pulled from Dockerhub; and the location of the configuration files.

Create a folder with the name <VPIcon icon="fas fa-folder-open"/>`nginx`. In this folder, create another <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` and add the code snippet below:

```dockerfile title="Dockerfile"
FROM nginx:1.19.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
```

### The Nginx config file

This is where you write the Nginx configuration logic. This file should be located in the same folder — the <VPIcon icon="fas fa-folder-open"/>`nginx` folder, as the Nginx Dockerfile.

This config file dictates how the Nginx container will behave. Below is a sample script that lives in a file typically named <VPIcon icon="iconfont icon-nginx"/>`nginx.conf`.

```conf title="nginx.conf"
upstream microservice { # name of our web image
    server web:8000; # default django port
}

server {
    listen 80; # default external port. Anything coming from port 80 will go through NGINX
    location / { 
        proxy_pass http://microservice_app;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }
    location /static/ {
        alias /home/app/microservice/static/; # where our static files are hosted 
    }
}
```

---

## Conclusion

Docker is a convenient tool for backend developers. The Docker tips and guidelines in this tutorial are vital for DevOps and full-stack developer positions in any organization.

This tutorial demonstrates how you can setup your Docker in your Django application, build a Docker image and run an instance of the image as a container.

We also discussed how to use the `docker compose` commands, through the <VPIcon icon="iconfont icon-yaml"/>`Docker-compose.yml` file to build and run multiple containers in a specific order.

If you'll like to learn more about Docker and integrate it in your applications, this [<VPIcon icon="fas fa-docker"/>documentation](http://docs.docker.com) is a good resource to explore. You can also explore how to integrate Docker with other tools [<VPIcon icon="fas fa-globe"/>here](https://blog.logrocket.com/tag/docker).

The [<VPIcon icon="iconfont icon-django"/>Django documentation](https://docs.djangoproject.com/en/4.0/) is a useful resource if you're also interested in honing or building your skills in Django.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Dockerizing a Django app",
  "desc": "Docker isolates your application and its dependencies and ensures consistent runtime protocols regardless of server configurations.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/dockerizing-django-app.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
