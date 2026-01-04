---
lang: en-US
title: "Docker for frontend developers"
description: "Article(s) > Docker for frontend developers"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Node.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - devops
  - docker
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker for frontend developers"
    - property: og:description
      content: "Docker for frontend developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/docker-for-front-end-developers.html
prev: /devops/docker/articles/README.md
date: 2019-08-20
isOriginal: false
author:
  - name: Emanuel Suriano
    url : https://blog.logrocket.com/author/emanuelsuriano/
cover: /assets/image/blog.logrocket.com/docker-for-front-end-developers/banner.jpeg
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
  name="Docker for frontend developers"
  desc="Front-end developers often struggle when forced to interact with containers. Worry not — we go over Docker's core concepts and how to manipulate containers."
  url="https://blog.logrocket.com/docker-for-front-end-developers"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/docker-for-front-end-developers/banner.jpeg"/>

Since [**Docker’s**](/blog.logrocket.com/crafting-build-pipelines-with-docker.md) release in 2013, the use of containers has been on the rise, and it’s now become a part of the stack in most tech companies out there. Sadly, when it comes to front-end development, this concept is rarely touched.

![Docker For Front-End Developers](/assets/image/blog.logrocket.com/docker-for-front-end-developers/banner.jpeg)

Therefore, when front-end developers have to interact with containerization, they often struggle a lot. That is exactly what happened to me a few weeks ago when I had to interact with some services in my company that I normally don’t deal with.

The task itself was quite easy, but due to a lack of knowledge of how containerization works, it took almost two full days to complete it. After this experience, I now feel more secure when dealing with containers and CI pipelines, but the whole process was quite painful and long.

The goal of this post is to teach you the core concepts of Docker and how to manipulate containers so you can focus on the tasks you love!

---

## The what and why for Docker 🤔

Let’s start by defining what Docker is in plain, approachable language (with some help from [<VPIcon icon="fas fa-globe"/>Docker Curriculum](https://docker-curriculum.com/)):

> Docker is a tool that allows developers, sys-admins, etc. to easily deploy their applications in a sandbox (called containers) to run on the host operating system.

The key benefit of using containers is that they package up code and all its dependencies so the application runs quickly and reliably regardless of the computing environment.

This decoupling allows container-based applications to be deployed easily and consistently regardless of where the application will be deployed: a cloud server, internal company server, or your personal computer.

![Containerized Apps Visualization](/assets/image/blog.logrocket.com/docker-for-front-end-developers/containerized-apps-visual.png)

---

## Terminology 📖

In the Docker ecosystem, there are a few key definitions you’ll need to know to understand what the heck they are talking about:

- `Image`: The blueprints of your application, which forms the basis of containers. It is a lightweight, standalone, executable package of software that includes everything needed to run an application, i.e., code, runtime, system tools, system libraries, and settings.
- `Containers`: These are defined by the image and any additional configuration options provided on starting the container, including but not limited to the network connections and storage options.
- `Docker daemon`: The background service running on the host that manages the building, running, and distribution of Docker containers. The daemon is the process that runs in the OS the clients talk to.
- `Docker client`: The CLI that allows users to interact with the Docker daemon. It can also be in other forms of clients, too, such as those providing a UI interface.
- `Docker Hub`: A registry of images. You can think of the registry as a directory of all available Docker images. If required, you can host your own Docker registries and pull images from there.

---

## ‘Hello, World!’ demo 🌎

To fully understand the aforementioned terminologies, let’s set up Docker and run an example.

The first step is installing Docker on your machine. To do that, go to the official [<VPIcon icon="fa-brands fa-docker"/>Docker page](https://docs.docker.com/ee/desktop/), choose your current OS, and start the download. You might have to create an account, but don’t worry, they won’t charge you in any of these steps.

After installing Docker, open your terminal and execute `docker run hello-world`. You should see the following message:

```sh
docker run hello-world
# 
# Unable to find image 'hello-world:latest' locally
# latest: Pulling from library/hello-world
# 1b930d010525: Pull complete
# Digest: sha256:6540fc08ee6e6b7b63468dc3317e3303aae178cb8a45ed3123180328bcc1d20f
# Status: Downloaded newer image for hello-world:latest
# 
# Hello from Docker!
# This message shows that your installation appears to be working correctly.
```

Let’s see what actually happened behind the scenes:

1. `docker` is the command that enables you to communicate with the Docker client.
2. When you run `docker run [name-of-image]`, the Docker daemon will first check if you have a local copy of that image on your computer. Otherwise, it will pull the image from Docker Hub. In this case, the name of the image is `hello-world`.
3. Once you have a local copy of the image, the Docker daemon will create a container from it, which will produce the message `Hello from Docker!`
4. The Docker daemon then streams the output to the Docker client and sends it to your terminal.

---

## Node.js demo

The “Hello, World!” Docker demo was quick and easy, but the truth is we were not using all Docker’s capabilities. Let’s do something more interesting. Let’s run a Docker container using Node.js.

So, as you might guess, we need to somehow set up a Node environment in Docker. Luckily, the Docker team has created an amazing marketplace where you can search for Docker images inside their public Docker Hub. To look for a Node.js image, you just need to type “node” in the search bar, and you most probably will [<VPIcon icon="fa-brands fa-docker"/>find this one](https://hub.docker.com/_/node).

![Screenshot Of The Docker Hub](/assets/image/blog.logrocket.com/docker-for-front-end-developers/docker-hub.png)

So the first step is to pull the image from the Docker Hub, as shown below:

```sh
docker pull node
```

Then you need to set up a basic Node app. Create a file called <VPIcon icon="fa-brands fa-js"/>`node-test.js`, and let’s do a simple HTTP request using [<VPIcon icon="fas fa-globe"/>JSON Placeholder](https://jsonplaceholder.typicode.com/). The following snippet will fetch a Todo and print the title:

```js title="node-test.js"
const https = require('https');

https.get('https://jsonplaceholder.typicode.com/todos/1', response => {
  let todo = '';

  response.on('data', chunk => {
    todo += chunk;
  });

  response.on('end', () => {
    console.log(`The title is "${JSON.parse(todo).title}"`);
  });
}).on('error', error => {
  console.error('Error: ' + error.message);
});
```

I wanted to avoid using external dependencies like `node-fetch` or `axios` to keep the focus of the example just on Node and not in the dependencies manager.

Let’s see how to run a single file using the Node image and explain the `docker run` flags:

```sh
docker run -it --rm --name my-running-script \
-v "$PWD":/usr/src/app \
-w /usr/src/app node \
node node-test.js
```

- `-it` runs the container in the `interactive` mode, where you can execute several commands inside the container.
- `--rm` automatically removes the container after finishing its execution.
- `--name [name]` provides a name to the process running in the Docker daemon.
- `-v [local-path: docker-path]` mounts a local directory into Docker, which allows exchanging information or access to the file system of the current system. *This is one of my favorite features of Docker!*
- `-w [docker-path]` sets the working directory (start route). By default, this is `/`.
- `node` is the name of the image to run. It always comes after all the `docker run` flags.
- `node node-test.js` are instructions for the container. These always come after the name of the image.

The output of running the previous command should be: `The title is "delectus aut autem"`.

---

## React.js demo ⚛️

Since this post is focused on front-end developers, let’s run a React application in Docker!

Let’s start with a base project. For that, I recommend using the `create-react-app` CLI, but you can use whatever project you have at hand; the process will be the same.

```sh
npx create-react-app react-sh
cd react-sh
yarn start
```

You should be able to see the homepage of the `create-react-app` project. Then, let’s introduce a new concept, the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`.

In essence, a <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` is a simple text file with instructions on how to build your Docker images. In this file, you’d normally specify the image you want to use, which files will be inside, and whether you need to execute some commands before building.

Let’s now create a file inside the root of the `react-test` project. Name this <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, and write the following:

```dockerfile title="Dockerfile"
# Select the image to use
FROM node

---

## Install dependencies in the root of the Container
COPY package.json yarn.lock ./
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

# Add project files to /app route in Container
ADD . /app

# Set working dir to /app
WORKDIR /app

# expose port 3000
EXPOSE 3000
```

When working in `yarn` projects, the recommendation is to remove the <VPIcon icon="fas fa-folder-open"/>`node_modules` from the `/app` and move it to root. This is to take advantage of the cache that `yarn` provides. Therefore, you can freely do `rm -rf node_modules/` inside your React application.

After that, you can build a new image given the above <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, which will run the commands defined step by step.

```sh
docker image build -t react:test .
```

To check if the Docker image is available, you can run `docker image ls`.

```sh
docker image ls
# 
# REPOSITORY   TAG     IMAGE ID       CREATED          SIZE
# react        test    b530cde7aba1   50 minutes ago   1.18GB
# hello-world  latest  fce289e99eb9   7 months ago     1.84kB
```

Now it’s time to run the container by using the command you used in the previous examples: `docker run`.

```sh
docker run -it -p 3000:3000 react:test /bin/bash
```

Be aware of the `-it` flag, which, after you run the command, will give you a prompt inside the container. Here, you can run the same commands as in your local environment, e.g., `yarn start` or `yarn build`.

To quit the container, just type `exit`, but remember that the changes you make in the container won’t remain when you restart it. In case you want to keep the changes to the container in your file system, you can use the `-v` flag and mount the current directory into <VPIcon icon="fas fa-folder-open"/>`/app`.

```sh
docker run -it -p 3000:3000 -v $(pwd):/app react:test /bin/bash
#
# root@55825a2fb9f1:/app# yarn build
```

After the command is finished, you can check that you now have a <VPIcon icon="fas fa-folder-open"/>`/build` folder inside your local project.

---

## Conclusion 👋

This has been an amazing journey into the fundamentals of how Docker works. For more advanced concepts, or to cement your understanding of the discussed concepts in this article, I advise you to check out the references linked below.

Let’s keep building stuff together 👷

::: info References

- [Docker Curriculum](https://docker-curriculum.com/)
- [<VPIcon icon="fa-brands fa-docker"/>Docker Content Library](https://docker.com/resources)
- [Docker Architecture](https://aquasec.com/wiki/display/containers/Docker+Architecture)
<SiteInfo
  name="nodejs/docker-node"
  desc="Official Docker Image for Node.js :whale: :turtle: :rocket:"
  url="https://github.com/nodejs/docker-node/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c32bbdcc84fa7974ce4ac1deeddf6ed800bb53eae8afb3fdd743581f42bfc76d/nodejs/docker-node"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker for frontend developers",
  "desc": "Front-end developers often struggle when forced to interact with containers. Worry not — we go over Docker's core concepts and how to manipulate containers.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/docker-for-front-end-developers.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
