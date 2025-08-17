---
lang: en-US
title: "Containerization and Orchestration"
description: "Article(s) > (11/18) The Microservices Book - Learn How to Build and Manage Services in the Cloud" 
category:
  - Node.js
  - RabbitMQ
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - rabbitmq
  - rabbit-mq
  - devops
  - vm
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (11/18) The Microservices Book - Learn How to Build and Manage Services in the Cloud"
    - property: og:description
      content: "Containerization and Orchestration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/containerization-and-orchestration.html
date: 2024-11-29
isOriginal: false
author: Adekola Olawale
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Microservices Book - Learn How to Build and Manage Services in the Cloud",
  "desc": "In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi...",
  "link": "/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Microservices Book - Learn How to Build and Manage Services in the Cloud"
  desc="In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi..."
  url="https://freecodecamp.org/news/the-microservices-book-build-and-manage-services-in-the-cloud#heading-containerization-and-orchestration"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"/>

---

## Introduction to Containers (Docker)

Containers encapsulate microservices along with their dependencies, ensuring they run consistently across different environments. [<FontIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/) is the most common containerization tool.

Containers are like shipping containers for software. No matter where you send them, the contents (code and dependencies) remain the same.

::: tip Dockerfile for Node.js Microservice

```dockerfile title="Dockerfile"
# Use the Node.js 16 image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port and start app
EXPOSE 8080
CMD ["node", "app.js"]
```

:::

In this snippet, you can see how to define a Dockerfile for a Node.js microservice, which is used to build and containerize the application for deployment. The Dockerfile provides a series of steps that Docker will follow to create an image that can be run anywhere that Docker is supported.

The first line, `FROM node:16`, specifies the base image to use for the container. In this case, it uses the official Node.js image with version 16. By using a specific version like this, you ensure that your application runs consistently in a controlled environment with Node.js version 16, regardless of the machine or platform it is deployed to. This guarantees compatibility with the dependencies and features available in Node.js 16. The `WORKDIR /usr/src/app` line sets the working directory within the container to `/usr/src/app`. This is where your application code will live inside the container. By setting the working directory explicitly, all subsequent commands like `COPY` and `RUN` will be relative to this location, helping to keep things organized within the container’s filesystem.

The `COPY package*.json ./` command copies the `package.json` and `package-lock.json` files (or any matching files in the pattern) into the container. This is a crucial step as these files contain the metadata and dependencies required for the Node.js application.

This allows Docker to install all necessary dependencies without copying the entire application code first, which takes advantage of Docker’s caching mechanism to avoid reinstalling dependencies when they haven’t changed.

Next, the `RUN npm install` command installs the dependencies listed in the `package.json` file. This command is run during the image-building process, meaning all the dependencies will be available when the container is started. This installation is done inside the Docker container, ensuring that the app has everything it needs to run.

The `COPY . .` command copies the rest of the application code into the container’s working directory. This step ensures that all the source code, such as your `app.js` file and any other necessary files, is available inside the container so that it can be executed by Node.js.

The `EXPOSE 8080` line tells Docker that the container will listen on port 8080. This is the port that external systems will use to communicate with the running service.

While the `EXPOSE` command does not directly open the port, it serves as a documentation feature and makes the port accessible when the container is run with the appropriate Docker run configuration.

Finally, `CMD ["node", "app.js"]` defines the default command to run when the container starts. In this case, it tells Docker to run the `app.js` file using Node.js. This is the entry point of your application, and once the container starts, Node.js will execute this file to run your application.

Overall, this Dockerfile is a simple and efficient way to package a Node.js microservice into a container. By specifying the environment, dependencies, and instructions on how to start the application, it ensures that the service can run in any environment where Docker is supported, with consistent behavior across development, staging, and production systems.

---

## Container Orchestration Tools (Kubernetes, Docker Swarm)

[<FontIcon icon="iconfont icon-k8s"/>Kubernetes](https://kubernetes.io/) is the most widely used container orchestration platform, providing features like automatic scaling, load balancing, and self-healing.

Kubernetes is like a traffic controller, managing how containers (microservices) are deployed, scaled, and routed.

::: tip Kubernetes (Simple Deployment YAML)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-microservice
spec:
  replicas: 3
  selector:
    matchLabels:
      app: node-microservice
  template:
    metadata:
      labels:
        app: node-microservice
    spec:
      containers:
      - name: node-microservice
        image: node-microservice:latest
        ports:
        - containerPort: 8080
```

:::

In this code, you can see how a simple Kubernetes Deployment YAML configuration is used to define the deployment of a Node.js microservice in a Kubernetes cluster. Kubernetes, as a container orchestration tool, automates many critical tasks such as scaling, load balancing, and self-healing.

This configuration ensures that your Node.js microservice is deployed in a controlled and repeatable manner, handling the lifecycle of the application containers effectively.

The first line, `apiVersion: apps/v1`, specifies the version of the Kubernetes API that this configuration is using. The `apps/v1` API version is commonly used for managing applications deployed within Kubernetes, such as Deployments, StatefulSets, and DaemonSets. This ensures compatibility with the Kubernetes cluster where the configuration will be applied.

The `kind: Deployment` field specifies that this configuration defines a **Deployment** resource in Kubernetes. A Deployment ensures that a specified number of identical Pods (which run the containers of your application) are running at all times.

It is used for managing the rollout and scaling of applications while also handling updates in a declarative manner. This is one of the most commonly used resources in Kubernetes to maintain application availability.

The `metadata` section defines basic information about the deployment, such as the name of the deployment (`name: node-microservice`). This name identifies the deployment resource within the Kubernetes cluster, making it easier to reference and manage.

In the `spec` section, the deployment's configuration is defined in detail. The `replicas: 3` line specifies that Kubernetes should maintain three copies (replicas) of the Node.js microservice running at all times.

This ensures high availability, as Kubernetes will automatically replace any failed Pods with new ones. If one Pod goes down for any reason, another will be started in its place.

The `selector` field defines how Kubernetes identifies which Pods are managed by this Deployment. The `matchLabels` section specifies that the Pods with the label `app: node-microservice` should be included.

This allows Kubernetes to group and manage related Pods based on labels, ensuring that the correct set of Pods is scaled, updated, and rolled back as needed.

The `template` field defines the structure of the Pods that will be created by this Deployment. Inside the `template`, `metadata` defines labels that will be applied to the Pods, ensuring they match the `selector` defined earlier.

The `spec` field specifies the container details for the Pod, including the container name (`name: node-microservice`), the container image (`image: node-microservice:latest`), and the ports to be exposed (`containerPort: 8080`). The image refers to a Docker image stored in a registry, and `latest` indicates the most recent version of that image.

By specifying the container port as 8080, this tells Kubernetes which port the application inside the container will be listening to. This is critical for networking within the cluster, as other services can connect to the Pods using this port.

Overall, this Deployment YAML is a simple yet powerful configuration for managing a Node.js microservice in Kubernetes. Kubernetes will handle the scaling (with three replicas), the application’s high availability, and the management of the Pods that run the application, making it much easier to deploy and manage microservices in a production environment.

### Helm Charts and Kubernetes Operators

[<FontIcon icon="iconfont icon-helm"/>Helm](https://helm.sh/) is a package manager for Kubernetes, simplifying deployment. [**Kubernetes Operators**](https://cncf.io/blog/2022/06/15/kubernetes-operators-what-are-they-some-examples/) extend Kubernetes functionalities to manage complex applications.

Helm can deploy an entire microservices stack (for example, a web service, database, and so on) with a single command.

```sh
helm install my-app ./chart
```

This code illustrates how you can use Helm to install an application on a Kubernetes cluster. Helm acts as a package manager for Kubernetes, simplifying the process of deploying and managing applications by using **Helm Charts**. Helm Charts are pre-configured application templates that define the resources necessary to deploy an application in Kubernetes.

With a single command like `helm install my-app ./chart`, you can deploy an entire microservice stack or application on Kubernetes, including web services, databases, and other components, all with the configuration specified in the chart.

The command `helm install my-app ./chart` is performing several key actions. First, it tells Helm to install a new application named `my-app`. The `./chart` path refers to the location of the Helm Chart on your local file system.

This chart contains all the Kubernetes manifest files, configurations, and templates required to deploy the application. When you run this command, Helm takes these resources, processes any templates with user-specific values, and then communicates with the Kubernetes API server to create the necessary Kubernetes resources, such as Pods, Deployments, Services, ConfigMaps, and more.

By using Helm, you abstract away the complexity of managing multiple Kubernetes resources and dependencies. Instead of manually creating and configuring each resource (which can be error-prone and time-consuming), you use the Helm Chart to define everything in one place.

This makes Helm a powerful tool for managing complex applications, particularly microservices, by encapsulating everything needed for deployment and ensuring consistency across different environments.

Kubernetes Operators also extend the functionality of Helm by providing custom resources and controllers that automate the management of complex, stateful applications.

While Helm can handle the deployment, Operators can manage the lifecycle of the application after deployment, including tasks such as backups, scaling, and updates.

This combination of Helm and Kubernetes Operators ensures that your microservices are not only deployed efficiently but also managed intelligently through their entire lifecycle.

---

## CI/CD Pipelines and Best Practices

CI/CD pipelines automate the process of integrating code changes, testing, and deploying them into production.

This enables rapid and frequent delivery of updates while maintaining high-quality code.

**Best Practices**:

- Use **small, frequent commits** to enable easier testing and rollback.
- Ensure each service can be tested and deployed independently.

### Tools and Platforms for CI/CD

1. [<FontIcon icon="fa-brands fa-jenkins"/>Jenkins](https://jenkins.io/): Open-source automation tool for building CI/CD pipelines.
2. [<FontIcon icon="fa-brands fa-gitlab"/>GitLab CI/CD](https://docs.gitlab.com/ee/ci/): Integrated with GitLab, it provides built-in CI/CD tools.
3. [**CircleCI**](https://circleci.com/): Offers fast and efficient pipelines for continuous delivery.

**Jenkins Pipeline for Microservice Deployment**:

```jenkinfile title="Jenkinfile"
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
          sh 'npm install'
      }
    }
    stage('Test') {
      steps {
          sh 'npm test'
      }
    }
    stage('Deploy') {
      steps {
          sh 'docker build -t my-app .'
          sh 'docker push my-app:latest'
      }
    }
  }
}
```

In this snippet, you can see how a Jenkins Pipeline is defined to automate the process of building, testing, and deploying a Node.js microservice using Docker. This scripted pipeline structure is specified in a Jenkinsfile and leverages three stages: Build, Test, and Deploy.

Each stage in the pipeline represents a distinct step in the continuous integration (CI) and continuous deployment (CD) lifecycle for a microservice.

In the **Build** stage, the pipeline runs the command `npm install` to install all the dependencies specified in the `package.json` file. This step is essential for setting up the application's environment and ensuring that all required libraries are in place for subsequent stages.

The command `sh` is a Jenkins Pipeline step that allows the use of shell commands, such as those for Node.js package management.

In the **Test** stage, the pipeline executes `npm test` to run the test suite defined in the project. Testing at this stage ensures that the microservice’s code functions correctly before it’s packaged for deployment.

This stage is critical for catching issues early in the CI/CD process, allowing developers to detect and address bugs before they reach the deployment environment.

The **Deploy** stage begins with the command `docker build -t my-app .`, which creates a Docker image-tagged `my-app` from the application source code and configuration files in the current directory (`.`).

After building the Docker image, the command `docker push my-app:latest` uploads the image to a container registry (assuming `my-app` is configured with a registry URL in the Docker environment). This step makes the built container image available for deployment to any environment that pulls images from this registry.

By organizing these steps in a Jenkins pipeline, you create a streamlined, automated workflow that allows you to easily reproduce the process of building, testing, and deploying the application across multiple environments.

This setup reduces the risk of human error, accelerates deployment, and ensures consistent results with every commit or code change.

### Automated Testing and Deployment Strategies

- **Blue/Green Deployment**: Involves running two versions of the service simultaneously.  
    Traffic is gradually shifted to the new version, ensuring zero downtime.
- **Canary Releases**: Gradually introduce a new version of a service to a subset of users, allowing for monitoring and rollback in case of issues.
