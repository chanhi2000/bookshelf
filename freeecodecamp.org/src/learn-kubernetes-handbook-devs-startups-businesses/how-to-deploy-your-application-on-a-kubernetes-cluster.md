---
lang: en-US
title: "How to Deploy an Application on Your Kubernetes Cluster"
description: Article(s) > (5/8) Learn Kubernetes - Full Handbook for Developers, Startups, and Businesses 
category:
  - DevOps
  - VM
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - kubernetes
  - k8s
head:
  - - meta:
    - property: og:title
      content: Article(s) > (5/8) Learn Kubernetes - Full Handbook for Developers, Startups, and Businesses
    - property: og:description
      content: "How to Deploy an Application on Your Kubernetes Cluster"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-kubernetes-handbook-devs-startups-businesses/how-to-deploy-your-application-on-a-kubernetes-cluster.html
date: 2025-05-03
isOriginal: false
author:
  - name: Prince Onukwili
    url : https://freecodecamp.org/news/author/onukwilip/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746205417767/d9d6b0d3-f2a5-44eb-83b5-d1a614bead9f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Learn Kubernetes - Full Handbook for Developers, Startups, and Businesses",
  "desc": "You’ve probably heard the word Kubernetes floating around, or it’s cooler nickname k8s (pronounced “kates“). Maybe in a job post, a tech podcast, or from that one DevOps friend who always brings it up like it’s the secret sauce to everything 😅. It s...",
  "link": "/freecodecamp.org/learn-kubernetes-handbook-devs-startups-businesses/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Kubernetes - Full Handbook for Developers, Startups, and Businesses"
  desc="You’ve probably heard the word Kubernetes floating around, or it’s cooler nickname k8s (pronounced “kates“). Maybe in a job post, a tech podcast, or from that one DevOps friend who always brings it up like it’s the secret sauce to everything 😅. It s..."
  url="https://freecodecamp.org/news/learn-kubernetes-handbook-devs-startups-businesses#heading-how-to-deploy-your-application-on-a-kubernetes-cluster"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746205417767/d9d6b0d3-f2a5-44eb-83b5-d1a614bead9f.png"/>

Now that we've set up our Kubernetes cluster using Play with Kubernetes, it's time to deploy the application and make it accessible over the internet.

---

## 🧠 Understanding Imperative vs. Declarative Approaches in Kubernetes

Before we proceed, it's essential to grasp the two primary methods for managing resources in Kubernetes: **Imperative** and **Declarative**.

---

## 🖋️ Imperative Approach

In the imperative approach, you directly issue commands to the Kubernetes API to create or modify resources. Each command specifies the desired action, and Kubernetes executes it immediately.

Imagine telling someone, "Turn on the light." You're giving a direct command, and the action happens right away. Similarly, with imperative commands, you instruct Kubernetes step-by-step on what to do.

::: tip Example:

To create a pod running an NGINX container, run the below command in the terminal of the master node:

```sh
kubectl run nginx-pod --image=nginx
```

Now wait a few seconds and run the command below to check the status of the pod:

```sh
kubectl get pods
```

You should get a response similar to this

![Get pods running in the cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1746087463204/52ef26e5-96df-4d91-8a2d-7527a38786d2.png)

:::

Now let’s expose our Pod to the internet by creating a **Service**. Run the command below to expose the Pod:

```sh
kubectl expose pod nginx-pod --type=NodePort --port=80
```

To get the IP address of the Cluster so we can access our Pod, run the command below:

```sh
kubectl get svc
```

The command displays the IP address from which we can access our service. You should get an output similar to this:

![Get service IP address](https://cdn.hashnode.com/res/hashnode/image/upload/v1746088678881/a4f3bdbc-c7eb-4696-ba6e-587637be5792.png)

Now, copy the IP address for the `nginx-pod` service and run the command below to make a request to your Pod:

```sh
curl <YOUR-SERVICE-IP-ADDRESS>
```

Replace the `<YOUR-SERVICE-IP-ADDRESS>` placeholder with the IP address of your `nginx-pod` service. In my case, it’s `10.98.108.173`.

You should get a response from your `nginx-pod` Pod:

![Make a request to the Nginx Pod running in the Cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1746088937046/8b86cd63-21f0-45d3-9ab5-59bd630fb37c.png)

We couldn’t access the Pod from the internet, that is our browser, because our Cluster isn’t connected to a cloud service like AWS or Google Cloud which can provide us with an external load balancer.

Now let’s try doing the same thing but using the Declarative method.

---

## 🚀 Declarative Approach

So far, we used the imperative approach, where we typed commands like `kubectl run` or `kubectl expose` directly into the terminal to make Kubernetes do something immediately.

But Kubernetes has another (and often better) way to do things: the declarative approach.

### 🧾 What Is the Declarative Approach?

Instead of giving Kubernetes instructions step-by-step like a chef in a kitchen, you give it a full recipe - a file that describes exactly what you want (for example, what app to run, how many copies of it, how to expose it, and so on).

This recipe is written in a file called a **manifest**.

### 📘 What’s a Manifest?

A manifest is a file (usually written in YAML format) that describes a Kubernetes object - like a Pod, a Deployment, or a Service.

It’s like writing down what you want, handing it over to Kubernetes, and saying: “Hey, please make sure this exists exactly how I described it.”

We’ll use two manifests:

1. One to deploy our application
2. Another to expose it to the internet

Let’s walk through it!

### 📁 Step 1: Clone the GitHub Repo

We already have a GitHub repo that contains the two manifest files we need. Let’s clone it into our Kubernetes environment.

Run this in the terminal (on your master node):

```sh
git clone https://github.com/onukwilip/simple-kubernetes-app
```

Now, let’s go into the folder:

```sh
cd simple-kubernetes-app
```

You should see two files:

- <VPIcon icon="iconfont icon-yaml"/>`deployment.yaml`
- <VPIcon icon="iconfont icon-yaml"/>`service.yaml`

### 📦 Step 2: Understanding the Deployment Manifest (<VPIcon icon="iconfont icon-yaml"/>`deployment.yaml`)

This manifest will tell Kubernetes to deploy our app and ensure it’s always running.

Here’s what’s inside:

```yaml :collapsed-lines title="deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
```

Now, let’s break this down:

- `apiVersion: apps/v1`: This tells Kubernetes which version of the API we’re using to define this object.
- `kind: Deployment`: This means we’re creating a Deployment (a controller that manages Pods).
- `metadata.name`: We’re giving our Deployment a name: `nginx-deployment`.
- `spec.replicas: 3`: We’re telling Kubernetes: “Please run 3 copies (replicas) of this app.”
- `selector.matchLabels`: Kubernetes will use this label to find which Pods this Deployment is managing.
- `template.metadata.labels` & `spec.containers`: This section describes the Pods that the Deployment should create - each Pod will run a container using the official `nginx` image.

✅ In plain terms: We're asking Kubernetes to create and maintain 3 copies of an app that runs NGINX, and automatically restart them if any fails.

### 🌐 Step 3: Understanding the Service Manifest (<VPIcon icon="iconfont icon-yaml"/>`service.yaml`)

This file tells Kubernetes to expose our NGINX app to the outside world using a Service.

Here’s the file - let’s break this down, too:

```yaml title="service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

- `apiVersion: v1`: We’re using version 1 of the Kubernetes API.
- `kind: Service`: We’re creating a Service object.
- `metadata.name: nginx-service`: Giving it a name.
- `spec.type: NodePort`: We’re exposing it through a port on the node (so we can access it via the node's IP address).
- `selector.app: nginx`: This tells Kubernetes to connect this Service to Pods with the label `app: nginx`.
- `ports.port` and `targetPort`: The Service will listen on port 80 and forward traffic to port 80 on the Pod.

✅ In plain terms: This file says, “Expose our NGINX app through the cluster’s network so we can access it from the outside world.”

### 🧹 Step 4: Clean Up Previous Resources

If you’re still running the Pod and Service we created using the imperative approach, let’s delete them to avoid conflicts:

```sh
kubectl delete pod nginx-pod
kubectl delete service nginx-pod
```

### 📥 Step 5: Apply the Manifests

Now let’s deploy the NGINX app and expose it - this time using the **declarative** way.

From inside the <VPIcon icon="fas fa-folder-open"/>`simple-kubernetes-app` folder, run:

```sh
kubectl apply -f deployment.yaml
```

Then:

```sh
kubectl apply -f service.yaml
```

This will create the Deployment and the Service described in the files. 🎉

### 🔍 Step 6: Check That It’s Running

Let’s see if the Pods were created:

```sh
kubectl get pods
```

You should see 3 Pods running!

And let’s check the service:

```sh
kubectl get svc
```

Look for the `nginx-service`. You’ll see something like:

![Access service NodePort](https://cdn.hashnode.com/res/hashnode/image/upload/v1746092825896/617084f1-3a71-4cfd-a287-9f7a9ac08810.png)

Note the **NodePort** (for example, `30001`) as we’ll use it to access the app.

### 🌍 Step 7: Access the App

You can now send a request to your app like this:

```sh
curl http://<YOUR-NODE-IP>:<NODE-PORT>
```

::: note

Replace `<YOUR-NODE-IP>` with the IP of your master node (you’ll usually find this in Play With Kubernetes at the top of your terminal), and `<NODE-PORT>` with the NodePort shown in the `kubectl get svc` command.

:::

![Get master node IP address](https://cdn.hashnode.com/res/hashnode/image/upload/v1746092570586/b33cabc0-ea1e-4a70-ab55-9f3a0761bec0.png)

You should see the HTML content of the NGINX welcome page printed out.

![Now terminate the cluster environment by clicking the **CLOSE SESSION** button](https://cdn.hashnode.com/res/hashnode/image/upload/v1746093081895/79139f75-5e6b-4991-be74-38ecbbf2ef66.png)

---

## 🆚 Why Declarative Is Better (In Most Cases)

- 🔁 **Reusable**: You can use the same files again and again.
- 📦 **Version-controlled**: You can push these files to GitHub and track changes over time.
- 🛠️ **Fixes mistakes easily**: Want to change 3 replicas to 5? Just update the file and re-apply!
- 🧠 **Easier to maintain**: Especially when you have many resources to manage.
