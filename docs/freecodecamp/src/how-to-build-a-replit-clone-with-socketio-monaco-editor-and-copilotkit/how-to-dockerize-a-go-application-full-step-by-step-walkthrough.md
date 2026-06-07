---
lang: en-US
title: "How to Dockerize a Go Application – Full Step-by-Step Walkthrough"
description: "Article(s) > How to Dockerize a Go Application – Full Step-by-Step Walkthrough"
icon: fa-brands fa-docker
category:
  - Go
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Dockerize a Go Application – Full Step-by-Step Walkthrough"
    - property: og:description
      content: "How to Dockerize a Go Application – Full Step-by-Step Walkthrough"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-dockerize-a-go-application-full-step-by-step-walkthrough.html
prev: /devops/docker/articles/README.md
date: 2026-04-30
isOriginal: false
author:
  - name: Njong Emy
    url: https://freecodecamp.org/news/author/njong329/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e49dda12-fd5e-4474-aa18-b72624640bf3.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
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
  name="How to Dockerize a Go Application – Full Step-by-Step Walkthrough"
  desc="Imagine that you want to share your source code with someone who doesn’t have Go installed on their computer. Unfortunately, this person won’t be able to run your application. Even if they do have Go "
  url="https://freecodecamp.org/news/how-to-dockerize-a-go-application-full-step-by-step-walkthrough"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e49dda12-fd5e-4474-aa18-b72624640bf3.png"/>

Imagine that you want to share your source code with someone who doesn’t have Go installed on their computer. Unfortunately, this person won’t be able to run your application. Even if they do have Go installed, application behaviour may differ because your local development environment is different from theirs.

So how do you bundle up your application so that it can run the same way in every local environment? That’s where Docker comes in.

For beginners, Docker isn't always a very easy concept to grasp. But once you get it, I promise that it’s very interesting. So interesting that you’ll want to dockerize every application you lay your hands on.

For this article, a Go application will be our case study. The fundamental concept of containerization as explained here is transferable, so don’t worry too much about how dockerizing applications in another language will look like.

We’ll go through the basics of dockerizing a Go app with just Docker, images and containers, setting up multiple containers in one application with Docker Compose, and the constituent of a Docker Compose file.

By the end of this article, you'll have a basic understanding of what Docker is, what an image or container is, and how to orchestrate multiple, dependent containers with Docker Compose.

::: note Prerequisites

You don't need any prior knowledge of Docker to follow this tutorial. This article is written with a beginner POV in mind, so it's okay if the concept is new to you.

In order to be fully engaged and understand the Go coding examples used here, it'll be helpful if you have basic knowledge of Golang. If you already understand how to set up a Go application on your local computer, you're good to go. If not, you can check this article on [**how to get started coding in Go**](/freecodecamp.org/how-to-get-started-coding-in-golang.md).

:::

---

## What is Docker?

Imagine that you have a box. In that box, you put your code and everything that it needs to run. That is, the programming language it uses and any other external packages you need to install.

If someone needs your application, you can just hand them the box. You can also hand this box to as many people as you want. They don’t need to install the language or any other thing on their computer because everything they need is already inside the box. So, when they run the application, what they're actually doing is running an instance of that box.

The app is running within the box which is the standard environment. This means for everyone who got the box and “opened it”, the application is going to run the exact same way.

With the help of Docker, apps can run under the same conditions across different systems, and you avoid the problem of “it works on my machine”.

![A box containing dependencies, runtime, and source code that has arrows pointing to multiple developers](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/3b2b169d-d882-48a8-88bf-233e4acec611.png)

In technical Docker terms, this box is called an **image** and the running instance is called a **container**.

An image is a lightweight, standalone, executable package that includes everything needed to run a piece of software. That is, code, runtime, libraries, system tools, and even the operating system.

A container is simply a runnable instance of an image. This represents the execution environment for a specific application.

If all this seems to abstract, don’t worry. We’ll get our hands dirty in a little bit.

---

## How to Install Docker

In order to install Docker, we're going to install Docker Desktop which comes bundled up with the Docker Engine. Docker Destop is a GUI for managing containers, and you'll see how useful it is in subsequent sections.

At the time of writing, I'm using WSL (Windows Sub-system for Linux). If you're doing the same, you'll need to take that into consideration before installing because Docker requires different installation prerequisites and steps for different operating systems.

To install Docker Desktop on WSL,

1. Download and install the [<VPIcon icon="fa-brands fa-docker"/>windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe) `.exe` file
2. Start Docker Desktop from the Start Menu and navigate to settings
3. Select **Use WSL 2 based engine** from the **General** tab
4. Click on apply.

That’s it for the WSL installation. If you are running another operating system, the [<VPIcon icon="fa-brands fa-docker"/>official docs](https://docs.docker.com/get-started/introduction/get-docker-desktop/) have a list of installation options for you.

---

## What is a Dockerfile?

In order to build your box in the first place, Docker needs to follow a couple of outlined steps. It needs to know the dependencies, the run time, and it also needs to have the source code. All these steps we list in a Dockerfile.

Before we get down to cracking anything, let’s create a working directory and navigate into it.

```sh
mkdir go_book_api && cd go_book_api
```

To intialise the Go module in your application, run the following command:

```sh
go mod init go_book_api
```

This creates a <VPIcon icon="fa-brands fa-golang"/>`go.mod` file to keep track of your project dependencies. In the root of the project, create a <VPIcon icon="fas fa-folder-open"/>`cmd` directory, and a <VPIcon icon="fa-brands fa-golang"/>`main.go` file in it. This will serve as the entry point of your application. In the <VPIcon icon="fa-brands fa-golang"/>`main.go` file, you can have a simple print statement:

```go title="cmd/main.go"
package main

import "fmt"

func main() {
  fmt.Println("Look at me gooo!")
}
```

Now, go ahead and create a file in the root of your project and call it <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`. This file has no extensions, but your system automatically knows that it's a file for Docker commands.

Go ahead and paste the following in that file, and then we'll go through each of them one by one:

```dockerfile title="Dockerfile"
# base image
FROM golang:1.24

# define the working directory
WORKDIR /app

# copy the go.mod and go.sum so that the packages to be installed
# are known in the container. ./ here is the WORKDIR, /app
COPY go.mod ./

# command to install modules
RUN go mod download

# copy source code into working dir
COPY . .

# build
RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping ./cmd/main.go

# run the compiled binary when the container starts
CMD ["/docker-gs-ping"]
```

Most Dockerfiles begin with a base image, which is specified by the `FROM` keyword. A base image is a foundational template that provides minimal operating system environment, libraries, or dependencies required to build and run an application within a container.

In this case, your base image is `golang:1.24` . Your base image could have been an operating system like Linux. In that case. when you ship your code to someone who isn’t running a Linux operating system, they wouldn’t have to worry because they will be running the application in an environment that already has a minimal Linux OS. In the same light, someone who doesn’t have Go installed locally can run your application.

To figure out what base image to use when setting up your Dockerfile, you can always peruse the official Docker Hub repository for published images. For this case, you can check out base images that are officially published by Golang [<VPIcon icon="fa-brands fa-docker"/>here](https://hub.docker.com/hardened-images/catalog/dhi/golang/images).

The next step is to define a working directory. Inside your box, you have a filesystem that is almost identical to the ones you’d see on a Linux system. You have folders like <VPIcon icon="fas fa-folder-open"/>`/app`, <VPIcon icon="fas fa-folder-open"/>`/bin` , <VPIcon icon="fas fa-folder-open"/>`/usr` , and <VPIcon icon="fas fa-folder-open"/>`/var` , and so on. The working directory you've defined in this case is <VPIcon icon="fas fa-folder-open"/>`/app`, and it's done with the `WORKDIR` command.

After setting a working directory, you want to copy the <VPIcon icon="fa-brands fa-golang"/>`go.mod` and <VPIcon icon="fa-brands fa-golang"/>`go.sum` file into it, so that Docker knows what dependencies to add into your box.

The `COPY` command in Docker takes at least two arguments: the source directory(ies), and then the destination directory. In this case, you want to copy <VPIcon icon="fa-brands fa-golang"/>`go.mod` and <VPIcon icon="fa-brands fa-golang"/>`go.sum` into the working directory of your box, <VPIcon icon="fas fa-folder-open"/>`/app`.

In the box, you'll run a command that downloads and installs all the modules defined in the <VPIcon icon="fa-brands fa-golang"/>`go.mod` file. To run a command in Docker environment, use `RUN` and then the command, which is `go mod download` in this case.

The next step is to copy any source code you have into the working directory.

At this point, you have the dependencies and the source code. The last step is to build the Go application into a single executable file which can be run inside your environment (inside the container).

Within the container, you’ll have a compiled binary at `/docker-gs-ping`, which is as a result of the compilation of the code in your <VPIcon icon="fa-brands fa-golang"/>`main.go` file. The last step is a `RUN` command that just tells Docker to run the executable binary after building it. It’s a way of saying “once the container starts running, execute this binary file”.

With these steps, Docker will build an image (a box per our analogy) that you can run. To build the image, you can run this command in your terminal:

```sh
docker build -t go_book_api .
```

The `docker build` command tells Docker to build an image based on the steps in the Dockerfile. `-t` is the flag for a tag, and this helps you refer to the image later when running the container.

To accompany your tag, you'll provide a name to the image which is `go_book_api` in this case. The `.` at the end is important because it tells Docker where the Dockerfile in question is, and the files that you need to copy into your image.

This is what the building looks like in my IDE:

![screenshot of IDE terminal showing a Docker image being built](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/361a805e-153d-4034-9d9a-d34c9015738a.png)

If you check the Images tab on Docker Compose, you'll see that an image is built:

![screenshot of a built container image on Docker Desktop](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/b569277e-295b-4a3d-8e51-fb91dd7e3d91.png)

You can host this image on a public image repository platform like [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://docker.com/products/docker-hub/), and share it with your friends. They can pull your image, set it up, and run your application even if they don’t have Go installed. All they need to do is get the container running.

If you click on the little play button to the far-right, you can spin up an instance of the image (a container).

![screenshot of Docker Compose modal for running a new container](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/09726294-be22-458d-b660-5f6d32102205.png)

You can give a descriptive name to the container (Docker will generate a random one if you don’t), and click on the Run button. Once the container starts running, you're redirected to its log page.

Your container is up and running! You can see that this is a running instance of your application.

![screenshot of a running docker container on Docker Compose](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/3133c16c-0950-4f03-9502-ae6495535c13.png)

---

## What is Docker Compose?

If you were building a simple Go application that needed no external dependencies, the above set-up would be more than sufficient.

In our example here, the application is supposed to be for a book API, so you’d expect that we'd have some service like a database and a database administrator client like phpMyAdmin to visualize or tables.

To set all this up in one file would be a little complicated using just Docker. This is because Docker doesn't allow you to have one base image for Go, another base image for a database, and so on, in one file.

You could use the base image of a small operating system, and then run commands to manually install these other services as dependencies, but this method makes your application hard to maintain and scale. This method isn't advisable because if one dependency crashes, the whole application will collapse instantly.

To remedy this situation, Docker compose allows you to have multiple containers for your application that are connected together. Docker compose handles running the containers in the right order, allows one container to use a folder from another container, or even keep its data in another container – and so on.

Our previous analogy of boxes is the same, except with Docker Compose, we don’t necessarily have only one box anymore:

![image of a box containing multiple containers that have arrows pointing to different developers](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/2c890de4-8d5d-4457-a27a-fc441f58d794.png)

The point of Docker Compose is to help you orchestrate multiple images needed to run your application. You can think of it as connecting several boxes together.

Following the explanation from before, your application would be running in the `Go book api` container, the book data we'll create with your application would be stored in the `mysql` container which is the database, and you can visualize your database with phpMyadmin, which is in the `phpMyadmin` container.

To see this technically, create a <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file in the root of the project. The name of this file is important, and Docker Compose only accepts filenames such as <VPIcon icon="iconfont icon-yaml"/>`compose.yml` , <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` , or <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yaml`. The file extension hints that the commands are written in `yaml` which is a language mostly used for file configurations.

```yaml :collapsed-lines title="docker-compose.yml"
services:
  app:
    depends_on:
      - database
    build: 
      context: .
    container_name: go_book_api
    hostname: go_book_api
    networks:
      - go_book_api_net
    ports:
      - 8080:8080
    env_file:
      - .env
    
  database:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_USER: ${DB_USER}
    volumes:
      - mysql-go:/var/lib/mysql
    ports:
      - 3356:3306
    networks:
      - go_book_api_net

  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 9000:80
    environment:
      PMA_HOST: database
      PMA_ARBITRARY: 1
    depends_on:
      - database
    networks:
      - go_book_api_net

volumes:
  mysql-go:

networks:
  go_book_api_net:
    driver: bridge
```

At the root level of the docker-compose file, you have `services` . These are all the containers that are your application needs to run, and in the context of Docker Compose, they're each regarded as a service.

### The `app` Container

```sh
 app:
    depends_on:
      - database
    build: 
      context: .
    container_name: go_book_api
    hostname: go_book_api
    networks:
      - go_book_api_net
    ports:
      - 8080:8080
    env_file:
      - .env
```

The very first container is the `app` container, which is your Go application. Under the `app` container, you'll need to define a few parameters that this container also needs to run.

The `depends_on` attribute controls the start-up and shut-down order of services within a container. This ensures that if container A depends on container B to start, the container B should be started first so that container A can use it. In this case, the `database` container must be started before the `app` container. Note that this doesn't mean `app` will always wait for the `database` to be ready.

The next attribute which is `build` tells Docker Compose to build the Docker image from the local project. Since the Dockerfile for your application is in the root of your app, you'll specify the root path with the `context` attribute as `.` .

To give a specific name to your container, you'll use `container_name`. `hostname` is what other containers will use for communication.

Recall that the point of Docker Compose is to have multiple containers communicating with each other. They do this with the help of networks. So you'll create another attribute, `networks`, and give it a name, `go_book_api_net` . To every other container that you want to associate with this `app`, you're going to specify the same network.

The next attribute is `ports`. Your application is an API, which means it's running on a backend Go server. To access the API, you'll need to map a local port to a port on the container. You're mapping port `8080` on your computer to port `8080` in the container.

The `env_file` attribute just tells Docker Compose where to read environment variables from. In this case, you can create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file in the root of your project to store important variables that your container will need.

### The `database` Container

```yaml
  database:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_USER: ${DB_USER}
    volumes:
      - mysql-go:/var/lib/mysql
    ports:
      - 3356:3306
    networks:
      - go_book_api_net
```

The second container is the `database` container. Note, that you can give whatever name you choose to your listed services, but giving your containers descriptive names is always a good convention to follow.

For your Go application database, you'll be working with a MySQL database in this case. Your application needs MySQL to run, so you must set it up as one of the services.

Remember that to build a container, you need a base image. Your base image in this case is `mysql:8.0` , as you've specified with the `image` property above. When trying to set up this container, Docker Compose knows to build your database container from this already existing official image.

If you’ve set up a database locally before, you know that configuration is a step you can’t skip. Every database you create needs a user, a password, and the database name. You can set these variables up in the `environment` property. Instead of hardcoding these values, you can set them up in a <VPIcon icon="iconfont icon-dotenv"/>`.env` file, and reference the environmental variables as you've done here.

Database servers usually listen on specific ports for incoming connections, whether the database is running locally or remotely. Just as you specified for your `app` container, you can set a port for your database and map it to a corresponding port in the container. If you want to access the database locally, you'd do that on port `3356`, and all requests are forwarded to port `3306` in the database container.

Once your containers go functional and your application starts running, creating, and storing data in the database, you’ll realise that every time you stop and then restart your containers, you lose the data stored in the database.

To avoid this, you'll need to store your data outside the container. That way, you won't lose the contents of your database every time you stop running your containers.

This is what volumes are for. You can allocate a specific location outside the database container to store all that content. For your `volume` in this case, the storage location you specified is `mysql-go:/var/lib/mysql` .

Just as you set the network in your `app` container above to `go_book_api_net`, you'll specify the same network for this database container. Since you want the containers to communicate with each other, it makes sense that they're within the same network.

### The `phpMyAdmin` Container

The last container or last service you need (but that is optional) to configure in this case is the phpMyAdmin container. I find it easier having a database client because it lets me easily see the structure and content of my database.

```yaml
 phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 9000:80
    environment:
      PMA_HOST: database
      PMA_ARBITRARY: 1
    depends_on:
      - database
    networks:
      - go_book_api_net
```

The process is almost the same as the previous containers you've configured. You'll start by pulling the official `phpmyadmin` image from Docker so that your container is built on it.

The `restart` option here is just so that if you stop and restart the container, phpMyAdmin automatically reloads again.

On the host machine, which is your local environment, you can have access to this service via port `9000` and it maps to port `80` in the container.

As for the `environment` , `PMA_HOST` tells phpMyAdmin to connect to a host called `database` (which is your database container). This works because both containers are on the same network, as you can see in the `networks` attribute. `PMA_ARBITRARY` is used so that if you decide to connect to another host (say, you set up a another database in future and still wish to connect via phpMyAdmin), you can do that via the UI.

Your database client depends on the `database` container, and so you need to specify that in `depends_on`:

```yaml
volumes:
  mysql-go:

networks:
  go_book_api_net:
    driver: bridge
```

The final section of your Docker Compose file is where you declared named values for the volume and network you've used in setting up your containers.

For the `volumes`, you'll declare a value called `mysql-go`. To the container where you want to attach this volume, you'll assign a specific storage location. You can see this in use in the database container.

```yaml
volumes:
  - mysql-go:/var/lib/mysql
```

The same concept follows for the network. You have a named network called `go_book_api_net` that every container within this same network can use. The `driver` option is used here to specify the network type, and `bridge` is used for private internal networks.

### Running Everything Together

Before Docker Compose, you had one Dockerfile that built a single container for your Go application. With Docker Compose, You’re gonna be building three containers (your application container, the database, and phpMyAdmin), and orchestrating them to work together as one single application.

You can push all this to a platform like GitHub, and someone can clone, start, and run the application without having any of these services (MySQL or PhpMyAdmin) installed locally on their computer. But they do need to have Docker installed.

To build your containers all together, you can use the command `docker compose build`:

![screenshot of IDE terminal showing build for an image](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/0040fbdc-c541-494f-af9b-664d6a00bc17.png)

If you check your Docker Compose UI again, we see that a new image has been built, and it corresponds to the app service

![screenshot of a built image on Docker Desktop](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/736be9be-feb1-4888-8d15-c818e4683f4b.png)

To start running the containers, you can use the command `docker compose up`:

![a screenshot of running containers in terminal IDE](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/8ba14bb9-77d5-48a1-b574-54a848f54b1e.png)

If you navigate to the container tab of Docker Compose, you can see that your containers are up and running:

![A screenshot of running containers on Docker Desktop](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/82e3d54d-bfec-4cea-806a-c52846a3e077.png)

The main app service, `go_book_api`, isn’t running because when you run your image, your binary runs and exits almost immediately.

In your <VPIcon icon="fa-brands fa-golang"/>`main.go`, let’s rewrite the code to set up a minimal HTTP handler function that listens on port `8080`:

```go title="cmd/main.go"
package main

import (
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        _, _ = w.Write([]byte("ok"))
    })

    log.Println("listening on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}
```

If you’re new to Go, don’t let the code above bother you too much. All it does it set up a `health` endpoint with an associated handler function that listens on a port (`8080` in this case) and prints “ok”.

In your <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, let’s add a command to execute the created binary when the container starts:

```dockerfile title="Dockerfile"
# run the compiled binary when the container starts
CMD ["/docker-gs-ping"]
```

After adding this, you'll need to rebuild the containers and start them again. You can see that all containers are running now:

![A screenshot of running containers on Docker Desktop](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/3ddf3e15-87b8-4978-851f-d6179e323166.png)

If you click on the `go_book_api` container, you can see that your server is running on port `8080` as configured:

![A screenshot of a running container on Docker Desktop](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/ddd07614-eb53-4bfc-b088-e824f651ef6c.png)

Since your app is running on port `8080` and you have a `/health` endpoint set up for it, you can actually visit that endpoint in a browser to see the output “ok”.

![an image of health endpoint showing ok response on the browser](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/39a1ea3e-7cbf-4d46-9bbe-bf8053d48586.png)

Also, if you click on the exposed `phpmyadmin` port, you can access the database client locally on port `9000`. Based on the environment variables set up in the <VPIcon icon="iconfont icon-dotenv"/>`.env` file, you can log in.

![screenshot of browser with phpMyAdmin login form](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/8d7de244-7268-4d17-a779-785feae389c4.png)

Another interesting thing to look for on Docker desktop is volumes. There is a volumes tab where you can see your configured `mysql-go` volume.

![a screenshot of the volumes tab on Docker Desktop](https://cdn.hashnode.com/uploads/covers/61d7e29f8d56921d07b9014e/66d1dde3-2fc1-48aa-b701-7504dba2007f.png)

You can always open these volumes/containers on the docker GUI, go through the files and logs, experiment with putting one container down and seeing how the others respond, and so on.

After this entire setup, what do you notice? You didn’t have to install Go, MySQL, or phpMyAdmin locally. You only used officially published base images to orchestrate a full application. That's the magic of Docker.

---

## Wrapping Up

Docker can be very abstract at the beginning, but understanding the fundamental purpose behind it makes everything much clearer.

In this article, you've learned what Docker is, how to containerize a basic Go application, and how to manage multiple containers with Docker Compose.

If you have trouble wrapping your head around why or how the Dockerfile is set up in the order that it is, my advice is not to get too stuck figuring it out on your own. As a Docker beginner, I realised that it’s easier if you imagine it as creating a recipe. If you try to build an image and it fails, you know there’s a step that you’re skipping.

The [<VPIcon icon="fa-brands fa-docker"/>official docker documentation](https://docker.com/) has amazing resources if you want to understand Docker further than this tutorial. I encourage you to do so because this article only scratches the surface of the amazing things you can achieve with containerization.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Dockerize a Go Application – Full Step-by-Step Walkthrough",
  "desc": "Imagine that you want to share your source code with someone who doesn’t have Go installed on their computer. Unfortunately, this person won’t be able to run your application. Even if they do have Go ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-dockerize-a-go-application-full-step-by-step-walkthrough.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
