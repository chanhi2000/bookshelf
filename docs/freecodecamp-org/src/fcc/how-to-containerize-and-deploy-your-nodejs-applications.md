---
lang: en-US
title: "How to Containerize and Deploy Your Node.js Applications"
description: "Article(s) > How to Containerize and Deploy Your Node.js Applications"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - DevOps
  - Docker
  - Sevalla
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - devops
  - docker
  - sevalla
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Containerize and Deploy Your Node.js Applications"
    - property: og:description
      content: "How to Containerize and Deploy Your Node.js Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-containerize-and-deploy-your-nodejs-applications.html
prev: /programming/js-node/articles/README.md
date: 2025-10-10
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760051426715/fd0f14cf-95dc-4191-b0fc-e5c916520097.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
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

```component VPCard
{
  "title": "Sevalla > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/sevalla/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Containerize and Deploy Your Node.js Applications"
  desc="When you build a Node.js application, running it locally is simple. You type npm start, and it works. But when you need to run it on the cloud, things get complicated. You need to think about servers, environments, dependencies, and deployment pipeli..."
  url="https://freecodecamp.org/news/how-to-containerize-and-deploy-your-nodejs-applications"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760051426715/fd0f14cf-95dc-4191-b0fc-e5c916520097.png"/>

When you build a Node.js application, running it locally is simple. You type `npm start`, and it works.

But when you need to run it on the cloud, things get complicated. You need to think about servers, environments, dependencies, and deployment pipelines. That’s where containerization comes in.

Containers make your application portable and predictable. You can run the same code with the same setup anywhere, from your laptop to the cloud.

In this guide, we will walk through how to containerize a simple Node.js API and deploy it to the cloud. By the end, you will know how to set up Docker for your app, push it to a registry, and see your application running on the cloud.

::: note Prerequisites

Before we dive into containerizing and deploying your Node.js application, make sure you have the following set up on your system. These basics will help you follow along without running into errors.

**Node.js and npm**

You should have [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en) (v18 or higher) and npm installed on your local machine. This ensures you can run your app locally before containerizing it.  
To check your versions, run:

```sh
node -v
npm -v
```

**Docker installed and running**

[<VPIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/) is the core tool we’ll use to containerize the app. Install Docker Desktop or Docker Engine depending on your system. Once installed, confirm that it’s running and working by typing:

```sh
docker --version
```

**Docker Hub account (or any container registry)**

You’ll need a Docker Hub account to push your container image to the cloud. This allows your deployment platform to pull and run the image. You can create one for free at [<VPIcon icon="fa-brands fa-docker"/>hub.docker.com](http://hub.docker.com).

Once you have these prerequisites ready, you’ll be set to build your first containerized Node.js app and deploy it to the cloud.

:::

---

## What is Containerization?

Containerization is a way to package an application along with everything it needs to run. That includes the code, libraries, system tools, and settings. The package is called a container image.

When you run that image, you get a container that behaves exactly the same on any system that supports [**Docker**](/freecodecamp.org/news/the-docker-handbook/README.md).

Without containers, deployment can be messy. Your app might work on your machine but fail in production due to missing libraries or version mismatches.

Containers solve this by locking in the environment. Think of them as lightweight virtual machines that only contain what your app needs.

---

## Setting Up a Node.js App

Let’s start by building a simple Node.js API. We will keep it minimal so we can focus on the containerization and deployment steps.

Create a new folder and add a file called <VPIcon icon="fa-brands fa-js"/>`server.js`:

```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Container!' });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Next, create a <VPIcon icon="iconfont icon-json"/>`package.json` file with the following content:

```json title="package.json"
{
  "name": "container-node-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

Run `npm install` to install the Express dependency. You now have a simple Node.js API that runs locally. You can test it with `npm start` and open `http://localhost:3000` in your browser.

---

## Writing the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`

To run this app in a container, we need to write a <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`. This file defines how to build the container image. Create a new file called <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` and add this:

```dockerfile title="Dockerfile"
FROM node:24

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Let’s break this down. We start with the official Node.js 24 image. We set a working directory inside the container. We copy the package files and install dependencies.

Then we copy the rest of the code. We expose port 3000 so that the app can accept traffic. Finally, we run `npm start` as the default command.

---

## Building and Testing the Container

Now that we have the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, we can build the image. Run the following command:

```sh
docker build -t container-node-app .
```

This builds an image named `container-node-app`. To test it locally, run:

```sh
docker run -p 3000:3000 container-node-app
```

Open `http://localhost:3000` in your browser, and you should see the JSON message `{"message":"Hello from Container!"}`. At this point, we know our app works in a container.

---

## Preparing for Deployment

To deploy on any cloud platform, you need to push your image to a container registry. A registry is a place where container images are stored and shared. Your cloud provider can pull images from [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/) or other registries.

Tag your image with a registry path. For Docker Hub, it looks like this:

```sh
docker tag container-node-app your-dockerhub-username/container-node-app:latest
```

Then log in and push it:

```sh
docker login
docker push your-dockerhub-username/container-node-app:latest
```

Your image should now be available in the cloud registry and ready for deployment.

Here’s mine:

![Docker Registry](https://cdn.hashnode.com/res/hashnode/image/upload/v1759747825354/e217d7f1-6131-41a2-a8b1-76e8ad84399a.webp)

---

## Deploying to the Cloud

In this tutorial, I’ll be using Sevalla since it offers a free tier, so there are no costs involved to deploy this container to the cloud. You can use other providers like [<VPIcon icon="fa-brands fa-aws"/>AWS](https://aws.amazon.com/) or [<VPIcon icon="iconfont icon-heroku"/>Heroku](https://heroku.com/), but just note that you will incur costs for creating resources.

[<VPIcon icon="iconfont icon-sevalla"/>Sevalla](https://sevalla.com/) is a modern, usage-based Platform-as-a-service provider. It offers application hosting, database, object storage, and static site hosting for your projects.

Once you have your account set up, you can create a new application and tell it which container image to use. Sevalla will pull the image from the registry, create a container, and handle the networking, scaling, and updates for you.

To get started, [<VPIcon icon="iconfont icon-sevalla"/>login](https://app.sevalla.com/login) to Sevalla. In the dashboard, choose to create a new application. Give it a name like `node-api`. Provide the registry path of your image.

![Create application](https://cdn.hashnode.com/res/hashnode/image/upload/v1759747861994/4ad344d6-d8a5-4593-a85e-eb679bc600f5.webp)

Choose a location and use the “Hobby” plan. Sevalla comes with a $50 free credit, so you wont be charged for deploying this image.

![Application Resources](https://cdn.hashnode.com/res/hashnode/image/upload/v1759747920267/cf23401d-131e-4c51-a248-411d8624542c.webp)

Click “Create and Deploy”. Sevalla will handle the rest. You can watch it configure the application and run the deployment.

![Sevalla Deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1759747953591/79db7997-88a3-48f7-ae09-65703ec2abab.webp)

Once the deployment is complete, click on “Visit app” to get your app’s live URL. You can see the response from the API.

![Sevalla deployment success](https://cdn.hashnode.com/res/hashnode/image/upload/v1759747987239/b3a1de3a-3f3a-48d6-86e1-27137f6b41fd.webp)

---

## Scaling Your App

One of the main benefits of Sevalla is easy scaling. If you start getting more traffic, you can increase the number of containers running your app with just a few clicks. Sevalla will load balance traffic between them. This means your app can handle more requests without downtime.

Scaling with containers is efficient because each container runs the exact same code. There is no need to configure extra servers manually. Sevalla takes care of orchestration, so your focus stays on writing code instead of managing infrastructure.

---

## Updating Your App

When you make changes to your Node.js app, updating is straightforward. You rebuild the Docker image, push it to the registry, and tell Sevalla to redeploy.

Since containers are immutable, every new build creates a fresh environment. This ensures your updates are clean, consistent, and free of old dependencies.

For example, if you change the message in <VPIcon icon="fa-brands fa-js"/>`server.js` and want to deploy it, you would run:

```sh
docker build -t your-dockerhub-username/container-node-app:latest .
docker push your-dockerhub-username/container-node-app:latest
```

Then trigger a redeploy in the Sevalla dashboard. Within minutes, your users will see the updated response.

---

## Benefits of sing Containers

[<VPIcon icon="fas fa-globe"/>Containers](https://techcrunch.com/2016/10/16/wtf-is-a-container/) bring many advantages when deploying Node.js applications. They make your app portable because the container holds both the code and its dependencies, ensuring it runs the same way everywhere.

They improve consistency, since every build creates an isolated environment without leftover files or mismatched versions. Scaling becomes simple because you can spin up more containers as traffic grows, and each one behaves identically. Updates are cleaner too, as you replace old containers with fresh ones built from the latest code.

For developers, this means fewer surprises and less time fixing environment issues. Containers provide a reliable foundation, so you can focus on building features rather than troubleshooting deployments.

---

## Conclusion

Containerization is one of the most important shifts in modern software development. By learning how to put your Node.js app into a Docker container, you unlock the ability to run it anywhere.

In this guide, we built a small Node.js API, created a Dockerfile, tested the container locally, pushed it to a registry, and deployed it to the cloud. The steps you followed here apply to much larger and more complex applications as well. Once you get the basics, you can scale up your workflows to production-level projects.

::: info

Hope you enjoyed this article. Connect with me [on Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva/?originalSubdomain=in) or [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Containerize and Deploy Your Node.js Applications",
  "desc": "When you build a Node.js application, running it locally is simple. You type npm start, and it works. But when you need to run it on the cloud, things get complicated. You need to think about servers, environments, dependencies, and deployment pipeli...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-containerize-and-deploy-your-nodejs-applications.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
