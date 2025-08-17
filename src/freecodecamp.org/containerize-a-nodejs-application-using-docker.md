---
lang: en-US
title: "How to Containerize a Node.js Application Using Docker - A Beginner's Guide"
description: "Article(s) > How to Containerize a Node.js Application Using Docker - A Beginner's Guide"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Containerize a Node.js Application Using Docker - A Beginner's Guide"
    - property: og:description
      content: "How to Containerize a Node.js Application Using Docker - A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/containerize-a-nodejs-application-using-docker.html
prev: /programming/js-node/articles/README.md
date: 2025-01-24
isOriginal: false
author:
  - name: Oluwatobi
    url : https://freecodecamp.org/news/author/Tobilyn77/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737681497302/0540f730-f1c3-496c-bd47-912fdc95d468.png
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
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Containerize a Node.js Application Using Docker - A Beginner's Guide"
  desc="Over the years, applications and tools have become more complex to keep up with people’s changing requirements and expectations. But this can create issues of code compatibility and remote access. For example, a codebase that functions properly on Wi..."
  url="https://freecodecamp.org/news/containerize-a-nodejs-application-using-docker"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737681497302/0540f730-f1c3-496c-bd47-912fdc95d468.png"/>

Over the years, applications and tools have become more complex to keep up with people’s changing requirements and expectations. But this can create issues of code compatibility and remote access. For example, a codebase that functions properly on Windows may develop compatibility errors when installed on Linux.

Fortunately, Docker comes to the rescue. But you might be wondering - what is Docker, and how does it help? You’ll learn all this and more in this tutorial.

But before we start, here are some prerequisites:

::: note Prerequisites

- Knowledge of Linux commands
- Knowledge of terminal usage
- Knowledge of Node.js and Express.js

:::

---

## What is Docker?

Docker is an open-source tool that makes it easy to run software in a consistent way, no matter where you are. It does this by putting your application and everything it needs (like libraries and settings) into a container (which I’ll discuss more in a moment).

Think of a container like a box: it holds your app and all its parts, so it works exactly the same on your laptop, a server, or in the cloud. Docker helps developers avoid the "it works on my machine" problem by ensuring everything is packaged together in a reliable and portable way.

Docker was created by Solomon Hykes in 2013. Over the years, it has evolved to cover a wide range of tools. It’s become a go-to tool for improving the application deployment and networking processes.

Before we proceed, here are some key terms you will come across as we go through this tutorial:

### Docker Engine

The Docker engine, as its name implies, is the powerhouse for Docker applications. It has a client and a server component. The Docker client, in our case, is the command-line interface tool or Docker terminal we’ll be using to send relevant commands for project execution. The Docker server, popularly known as the daemon, is the server that handles running the various Docker images and containers.

### Docker Image

Docker images are premade templates of executable software and systems. Docker offers a wide range of images ranging from operating system templates to server templates, software templates, and so on. You can find all these on the Docker hub registry where these images are stored.

You can also build a specific image and host it either publicly on the Docker hub or in a private registry.

### Docker Containers

Docker containers are executable compact instances built on the template generated which is the Docker image. They’re lightweight, portable packages that include everything needed to run a piece of software—code, runtime, libraries, and system tools. A container ensures the application runs consistently regardless of the environment.

### Benefits of Using Docker

Here are some of the benefits of using Docker as a backend developer:

- Docker is a great tool for creating a solid DevOps culture for application development, as it clarifies the functions of the development and operations teams.
- It’s also quite flexible, allowing for easy deployment of microservices and distributed monolithic backend applications.
- It also minimizes errors from dependency misconfigurations during installations as it ports the app with its necessary dependencies all at once.

Moving on, we will be diving into how to Dockerize a Node.JS Express application. But before that, you’ll need to install Docker on your computer. You can skip this if you already have it installed.

---

## How to Install Docker

Docker is a cross-platform tool which can be installed across all popular operating systems (Windows, Mac OS, and Linux distros). For this tutorial, I’ll only be highlighting how to set up Docker on Windows.

If you’re currently using any OS other than Windows, you can easily set Docker up by following the steps in the Docker documentation [<FontIcon icon="fa-brands fa-docker"/>here](https://docs.docker.com/engine/install/).

For windows users, it is essential that your PC meets the minimum specifications - otherwise the installation won't be successful. The minimum requirements are the following:

- A Windows OS version not less than Windows 10 home
- A PC with WSL-2 installed or Hypervisor enabled.

With that, let's move on to downloading the Docker installer executable. You can download the latest Docker installer from [<FontIcon icon="fa-brands fa-docker"/>here](https://docker.com/products/docker-desktop/). After you do that, run the software and accept the terms and conditions. On successful completion, launch the application. This is what you should see:

![Docker desktop GUI](https://cdn.hashnode.com/res/hashnode/image/upload/v1737154696376/dcbf3b23-10cc-452a-b206-46973163e8d6.png)

To confirm that you’ve successfully installed the application, navigate to the command prompt terminal and run `Docker --version`. You should see the exact version of the Docker engine tool you’ve installed if it was successful.

We’ll now move on to the project proper.

---

## Demo Project: How to Containerize a Node.js Application

In this section, we will be containerizing a simple Node.js-based backend service with minimal dependencies. This will show you how to containerize and port an application using a Docker application containerization technique known as the <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`. Keep in mind that if you have a more complex application, it may be better to use the [**Docker compose YAML tool**](https://freecodecamp.org/what-is-docker-compose-how-to-use-it.md).

To begin with, we will set up the sample Node.js application. I’ll provide the entire code setup in this article, below. But first, let’s understand what a <FontIcon icon="fa-brands fa-docker"/>`Dockerfile` is.

### What is a Dockerfile?

Basically, a Dockerfile is a template system which allows the user to input commands which, when executed, can produce a functional image of the application. This image can then be converted into a container.

Here are some commands included in the basic structure of a Dockerfile:

#### `CMD`

sets the default command to run if no command is specified when the container starts. It can be overridden by providing a command when running the container (`docker run ...`).

#### `ENTRYPOINT`

Specifies the main command that always runs when the container starts. It’s not easily overridden, but arguments can be appended.

::: note

Note that `CMD` and `ENTRYPOINT` both specify what command or process the container should run when it starts. But they’re used differently and have distinct purposes. Use `CMD` for default behavior that can be overridden. Use `ENTRYPOINT` for a fixed command that defines the container's primary purpose.

:::

#### `FROM`

This is usually the opening statement in a Dockerfile. This command fetches a base image which forms the foundation for building the image of the application in question. For instance, in our application, the base image for a Node.js application is to have the baseline Node.js engine installed.

#### `WORKDIR`

This syntax defines the active working directory where the application files will live within the defined container. An automatic folder will be created if it’s not already available.

#### `COPY`

This syntax is used to ensure that the files necessary for creating the Docker image from the code base project file are copied into the newly created Docker container. The directories of these files are carefully highlighted.

#### `RUN`

This syntax specifies the script that you want to be run before completing the application’s containerization.

#### `ENV`

This syntax is used to highlight environmental variables and secrets which will be invoked during the process of running the application.

#### `EXPOSE`

This syntax maps out the browsing port where the application is used to communicate with the external internet. For example `EXPOSE: 3000` maps out the 
application web interface to `localhost:3000`.

Diving deeper into Docker, let’s quickly go over some key Docker commands we’ll be using throughout this tutorial:

- `docker ps`: This command lists all the running containers on your Docker terminal.
- `docker run`: This command executes a Docker image to trigger an instance of a container.
- `docker build`: This command works based on the Docker file to generate an image of a service or application.
- `docker rm`: this command can be used to delete an image using the image identification details.

### How to Containerize the App

Now we can start containerizing our simple Node/Express application. To follow along with the tutorial, you can get the base code from [here (<FontIcon icon="iconfont icon-github"/>`oluwatobi2001/Typescript_test`)](https://github.com/oluwatobi2001/Typescript_test).

On testing it locally, it returns a CRUD API where you can create, fetch, update, and delete products when executed. We’ll package the application for easy deployment on the cloud using our Docker engine. We’ll be able to do this using the Dockerfile tool we discussed above.

#### Step 1: Create the dockerfile

In your project folder, create a file named <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`. Make sure the name is **exactly** "Dockerfile" (no extension, and case-sensitive in some systems - so make sure it’s capitalized).

If you're using a code editor, simply create a new file named <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`. If you're using a basic text editor, save the file with the name <FontIcon icon="fa-brands fa-docker"/>`Dockerfile` and ensure it doesn’t accidentally save with an extension like <FontIcon icon="fas fa-file-lines"/>`.txt`.

Then enter the first line:

```dockerfile
FROM Node:18-alpine
```

This command fetches the base image we’ll use to power our Express application which is the Node engine itself.

You might be wondering what the `alpine` is for. Alpine is a lightweight, much more compressed version of a Docker image. It excludes incorporating additional packages not directly essential to the base operating system. It's advocated as a standard good code practice to use lightweight distros for faster execution and easy use.

#### Step 2: Set the working directory

```dockerfile
WORKDIR /app
```

This sets the working directory of the image to the <FontIcon icon="fas fa-folder-open"/>`/app` folder of the container. It makes sure that all file actions occur here and all files are copied into this directory.

#### Step 3: Copy the necessary files

```dockerfile
COPY package.json
```

This command copies the <FontIcon icon="iconfont icon-json"/>`package.json` files which has a list of dependences and packages to be installed to power our application.

#### Step 4: Execute a setup script

```dockerfile
RUN npm install
```

This command ensures that all the necessary dependencies to power our Node.js applications are installed on the container.

#### Step 5: Copy the code files

```dockerfile
COPY . .
```

This command ensures that all the files within the local directory get copied into the container file system within the established working directory.

#### Step 6: Expose the server port

```dockerfile


EXPOSE 3000
```

This command exposes the server port that we intend to use to access the container. In this case it's port 3000. #### Step 7: Include the command to bring the container to life

```dockerfile
CMD ["npm", "run", "dev"]4
```

This command is executed a the end in order to power on the Node.js application. It simply runs the `npm run dev` command which is what you’d use for a development environment. To run it in a production environment, you’d use the `npm start` command instead.

Having completed this process, here is how the final Dockerfile structure should look:

```dockerfile title="Dockerfile"
FROM Node:18-alpine
WORKDIR /app

COPY package.json

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
```

### Testing the Docker container

To round it up, we will be creating a Docker image of our Node.js application. To do this, execute the command `docker build -t nodeapp .` . The `docker build` command builds the image, while the `-t` allows for specifying the image tag’s details.

In our case, we’re assigning the name `nodeapp` to the image we will be creating and the image will be created within the working directory.

![This image runs the docker build command](https://cdn.hashnode.com/res/hashnode/image/upload/v1737154702142/98e05981-bb05-41c6-919f-02b3261f3caa.png)

Congratulations! You have successfully built your first Docker image. To see all the images on your local repo, execute the command `docker images`.

![A image showing the docker images command being executed and the list of all the images available locally](https://cdn.hashnode.com/res/hashnode/image/upload/v1737154714828/71f50b4f-8df5-4885-a5fc-6365dd903645.png)

In order to create a working instance of your image for testing, execute the command `docker run nodeapp`.

![Executing a running instance of our docker image](https://cdn.hashnode.com/res/hashnode/image/upload/v1737154708130/bb6968f2-829d-4107-be82-4bdd9c167d53.png)

We’re using Mongo DB as our database for this tutorial, so we’ll need to pass the MongoDB URL as an environment variable to the Docker container. Environment variables help you safeguard certain key variables which shouldn’t be exposed to the public. Other variables which can be passed as environment variables include API keys and encryption codes.

To pass the MongoDB URL to the Docker container, we use the `-e` tag to ensure that Docker recognizes the corresponding value inputted as an environment variable.

```sh
docker run -e JWT_SECRETS={enter the value of your choice} \
-e MONGO_URL={The mongo url of your choice} \
nodeapp
```

To also use the container in the background, just attach the `-d` tag which represents the detach option. This option allows the container to run in the background despite exiting the command line terminal.

In the event of no errors, navigating to `localhost:5000` should also produce something similar to the image below.

![Postman testing the `localhost:5000`](https://cdn.hashnode.com/res/hashnode/image/upload/v1737506281699/54bb1d9b-0be7-42e3-b212-bb4bd27e019d.png)

---

## Wrapping Up

In this article, you learned about what Docker is and how it works, along with its common commands and how to use it to containerize a backend application. Moving on from the basics, you can also explore other uses of Docker in continuous integration and development. To learn more about Docker, you can check out its documentation [<FontIcon icon="fa-brands fa-docker"/>here](https://docs.docker.com/).

I would also recommend using your new knowledge to deploy projects with real-life use cases, as well as exploring networking in Docker applications. To make your app live, you can easily deploy the Docker image you created to any of the popular cloud service providers like AWS, GCP, Azure, and so on.

Feel free to ask me any questions! You can also check out my other articles [<FontIcon icon="fas fa-globe"/>here](http://portfolio-121.netlify.app). Till next time, keep on coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Containerize a Node.js Application Using Docker - A Beginner's Guide",
  "desc": "Over the years, applications and tools have become more complex to keep up with people’s changing requirements and expectations. But this can create issues of code compatibility and remote access. For example, a codebase that functions properly on Wi...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/containerize-a-nodejs-application-using-docker.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
