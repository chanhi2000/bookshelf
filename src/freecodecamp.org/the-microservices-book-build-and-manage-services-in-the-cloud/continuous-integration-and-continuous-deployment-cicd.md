---
lang: en-US
title: "Continuous Integration and Continuous Deployment (CI/CD)"
description: "Article(s) > (12/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud" 
category:
  - Node.js
  - RabbitMQ
  - DevOps
  - Docker
  - Kubernetes
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
  - k8s
  - kubernetes
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (12/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud"
    - property: og:description
      content: "Continuous Integration and Continuous Deployment (CI/CD)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/continuous-integration-and-continuous-deployment-cicd.html
date: 2024-11-29
isOriginal: false
author: Adekola Olawale
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Microservices Book – Learn How to Build and Manage Services in the Cloud",
  "desc": "In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi...",
  "link": "/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Microservices Book – Learn How to Build and Manage Services in the Cloud"
  desc="In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi..."
  url="https://freecodecamp.org/news/the-microservices-book-build-and-manage-services-in-the-cloud#heading-continuous-integration-and-continuous-deployment-cicd"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"/>

CI/CD helps you automate the process of building, testing, and deploying microservices.

It’s like having an automated assembly line that assembles, tests, and packages products without manual intervention.

```yaml title=".github/workflows/node.js.yml"
# Using GitHub Actions for Node.js
name: Node.js CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

The code above shows the process of how GitHub Actions is used to automate the Continuous Integration (CI) process for a Node.js application. The CI/CD pipeline ensures that code is automatically built, tested, and prepared for deployment without manual intervention, much like an automated assembly line that assembles, tests, and packages products seamlessly.

The file begins with the line `name: Node.js CI`, which sets the name of the workflow. The `on:` section specifies when the workflow should be triggered. In this case, it’s set to trigger on `push` events to the `main` branch.

This means every time a developer pushes changes to the main branch, GitHub Actions will automatically start the pipeline to check the quality and functionality of the code.

The `jobs:` section defines the tasks to be executed in this pipeline, and it specifies that the job will run on `ubuntu-latest`, a virtual machine environment provided by GitHub to run the workflow. Inside the `build` job, there are several `steps` that execute sequentially.

In the first step, `Checkout code`, uses the `actions/checkout@v3` action to check out the repository’s code so that the subsequent steps can operate on it.

In the next step, `Set up Node.js`, utilizes `actions/setup-node@v3` to install Node.js version 14. This step ensures that the correct version of Node.js is used for the application, avoiding discrepancies between environments.

After setting up Node.js, the step `Install dependencies` runs the command `npm install`, which installs all the dependencies defined in the project’s `package.json` file. This ensures that the necessary packages are available for the tests to run.

Finally, the last step, `Run tests`, runs the command `npm test`, which triggers the tests for the Node.js application. This step ensures that any changes made in the code do not break the functionality of the application, as the tests will validate that everything works as expected.

Through this GitHub Actions configuration, the CI process is fully automated. Every time changes are pushed to the main branch, the pipeline builds the project, installs dependencies, and runs the tests.

This process ensures that issues are caught early, streamlining development and improving code quality by providing automated feedback on the state of the application. It also saves time by eliminating the need for manual testing and deployment steps.

---

## Orchestration with Kubernetes

Kubernetes helps you manage the deployment, scaling, and operation of containerized applications.

Like a conductor orchestrating a symphony, Kubernetes manages and coordinates the deployment and scaling of your containerized services.

```yaml
# Kubernetes YAML for a Node.js app

# Deployment definition
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
        - name: user-service
          image: user-service:latest
          ports:
            - containerPort: 3000

# Service definition
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

This code illustrates how you can use Kubernetes to orchestrate the deployment and management of a Node.js application, specifically the `user-service`.

This YAML configuration file contains two main sections: the **Deployment** and the **Service**.

The **Deployment** section is where you define how your application should be deployed in the Kubernetes cluster. It specifies the `apiVersion`, which indicates which version of the Kubernetes API should be used to create the resource, and the `kind`, which identifies the type of resource being defined (in this case, a `Deployment`).

The `metadata` section contains basic information about the deployment, such as its name (`user-service`). Under `spec`, you define the desired state for the application.

The `replicas: 3` field indicates that Kubernetes should maintain three identical instances of the `user-service` pod running at all times, which helps ensure high availability and load balancing.

The `selector` field defines a label selector that is used to identify the set of pods that this deployment should manage. The `template` section defines the pod’s metadata and its spec.

This includes a container definition, where the `image` is set to `user-service:latest`, pointing to the Docker image to be used for the container. The `ports` section specifies that the container will listen on port 3000, which is the port your Node.js app will use.

In the **Service** section, Kubernetes defines how to expose the deployed application so that other services or external clients can access it. The `Service` is also defined with `apiVersion: v1` and `kind: Service`, indicating that it will use Kubernetes’ core service management. The `metadata` section defines the service name (`user-service`), while the `spec` section describes the service's behavior.

The `selector` here refers to the same label as the deployment (`app: user-service`), ensuring that the service will route traffic to the pods created by the deployment. The `ports` section specifies that the service will listen on port 80 (the external port) and forward traffic to port 3000 (the port inside the container where the app is running).

Finally, the `type: LoadBalancer` tells Kubernetes to provision an external load balancer, distributing incoming traffic across the multiple instances of the `user-service` pods, further ensuring high availability and fault tolerance.

Through this orchestration, Kubernetes ensures that your `user-service` is deployed, scaled, and exposed in a highly available manner, much like a conductor ensuring that all sections of a symphony play in time and tune.

It provides detailed guidance on choosing the right technology stack, defining APIs and contracts, and understanding key design patterns.

Selecting appropriate programming languages and frameworks is crucial for optimizing each microservice, while well-defined APIs and contracts ensure clear and reliable communication between services.

Key design patterns such as the API Gateway Pattern, Strangler Fig Pattern, and Backend for Frontend (BFF) Pattern are explained to help manage and optimize microservices architecture.
