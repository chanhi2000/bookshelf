---
lang: en-US
title: "How to Monitor Your Kubernetes Clusters with Prometheus and Grafana on AWS"
description: "Article(s) > How to Monitor Your Kubernetes Clusters with Prometheus and Grafana on AWS"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - AWS
  - Go
  - Prometheus
  - Grafana
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - kubernetes
  - k8s
  - aws
  - amazon-web-services
  - go
  - golang
  - prometheus
  - grafana
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Monitor Your Kubernetes Clusters with Prometheus and Grafana on AWS"
    - property: og:description
      content: "How to Monitor Your Kubernetes Clusters with Prometheus and Grafana on AWS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/kubernetes-cluster-observability-with-prometheus-and-grafana-on-aws.html
prev: /devops/k8s/articles/README.md
date: 2025-01-22
isOriginal: false
author:
  - name: Eti Ijeoma
    url : https://freecodecamp.org/news/author/Omah/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737504669572/017570c6-7676-44e1-aa19-4257dd7d30e7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Prometheus > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go-prometheus/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Grafana > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go-grafana/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Monitor Your Kubernetes Clusters with Prometheus and Grafana on AWS"
  desc="Creating a solid application monitoring and observability strategy is a critical foundational step when deploying infrastructure or software in any environment. Monitoring ensures that your systems are running smoothly, while observability provides i..."
  url="https://freecodecamp.org/news/kubernetes-cluster-observability-with-prometheus-and-grafana-on-aws"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737504669572/017570c6-7676-44e1-aa19-4257dd7d30e7.png"/>

Creating a solid application monitoring and observability strategy is a critical foundational step when deploying infrastructure or software in any environment. Monitoring ensures that your systems are running smoothly, while observability provides insights into the internal state of your application through the data generated. Together, they help you detect and address issues proactively rather than reacting after a failure occurs.

In Kubernetes environments, the complexity of managing distributed microservices can be challenging. For instance, an application usually spans multiple pods, nodes, and clusters. Because of Kubernetes’s dynamic nature, where pods are frequently created and terminated, proper monitoring and observability are ideal for capturing its fleeting behavior.

Imagine building a microservices application with several connected services handling critical components such as authentication, payments, and databases without proper monitoring. A sudden traffic spike could affect a single service, cascading to other services, causing the system to crash and resulting in downtime.

Without proper visibility, you may struggle to find the root cause of the issue. You may spend hours manually going through logs – and meanwhile, users are frustrated, and businesses are losing revenue and customer trust.

Before we begin the project, you’ll learn key monitoring and observability concepts, as well as why tools like Prometheus and Grafana are crucial for setting up a robust monitoring stack on your Kubernetes infrastructure.

---

## Understanding Monitoring and Observability

Implementing a proper monitoring and observability approach is important in fast-paced production Kubernetes environments. This helps in situations where downtime can lead to serious business loss and damage to customer trust. It’ll hopefully help you avoid the dreaded 2 am calls that are usually triggered by alert noise so you can focus on adding more innovative features to your software (rather than spending so much energy firefighting).

Monitoring and observability are often referred to as the same thing. But they serve two different purposes, especially for development and engineering teams.

### Monitoring

In the software development lifecycle, monitoring is the practice of analyzing data in real time or reviewing data trends to ensure the health and performance of systems, infrastructure, and applications. Monitoring acts as the eyes and ears of your IT operations, collecting insightful data and presenting it in a way that is actionable.

If you have visited the IT department of a well-established organization, you have most likely seen large screens displaying colorful dashboards with charts and real-time statistics. This offers a centralized view of the key metrics, such as the server uptime, application response times, and resource usage.

### Observability

Observability helps to address issues that haven’t been anticipated. These are usually called “unknown unknowns." Unlike monitoring, which deals with predefined parameters and data, observability goes deeper into the application to give a broader view.

This not only helps to answer what is happening within your system and why it is happening. It also uses patterns within the system and application operations to detect and resolve issues efficiently.

Observability revolves around the three pillars of data: **metrics**, **logs**, and **traces**.

#### 1. Metrics

Metrics consist of time-series measurements such as CPU usage and memory consumption. These data points help teams to manage, optimize, and predict system performance and deviations from expected behavior.

#### 2. Logs

Logs serve as a history of what happened within the system. It is a trail for engineers, especially during troubleshooting. Logs are important in diagnosing root causes and discovering malicious activities.

#### 3. Traces

Traces provide insights into application workflows by tracking requests as they move through various components. They are good for highlighting latency issues and potential points of failure.

---

## Tools for Monitoring and Observability

Now that you understand the theory behind monitoring and observability, you may be wondering what platforms and tools are available to developers to collect data and get insights about their services.

In the world of cloud-native infrastructure and Kubernetes, many users gravitate towards the popular stack of Prometheus and Grafana.

### <FontIcon icon="iconfont icon-prometheus"/>Prometheus

Prometheus is an open-source tool that specializes in collecting metrics as time-series data. The information is stored with the timestamp when it was recorded.  
The Prometheus ecosystem includes the main Prometheus server, which scrapes and stores time-series data, an alert manager for managing alerts, a push gateway for handling metrics from short-lived jobs, and exporters for collecting metrics from various services connected to the cluster.

It fits both in machine-centric and application-centric monitoring, especially for microservices in a Kubernetes cluster. It’s designed to be the system you go to if there is a system outage and you need to quickly diagnose problems.

The Prometheus ecosystem includes the main Prometheus server, which scrapes and stores time-series data, an alert manager for managing alerts, a push gateway for handling metrics from short-lived jobs, and exporters for collecting metrics from various services connected to the cluster.

Prometheus fits both in machine-centric and application-centric monitoring, especially for microservices in a Kubernetes cluster. It’s designed to be the system you go to if there is a system outage and you need to quickly diagnose problems.

### <FontIcon icon="iconfont icon-grafana"/>Grafana

Grafana is a visualization tool that transforms, queries, visualizes, and sets alerts on raw metrics stored in Prometheus. With Grafana, you can explore metrics and logs wherever they are stored and display the data on live dashboards. This allows teams to monitor system performance, identify trends, and act quickly on anomalies.

Prometheus and Grafana are compatible with containerized applications, especially in Kubernetes environments. It can also manage workloads outside Kubernetes for flexibility. They are both open-source tools that give developers control over the implementation. There is no licensing cost, which helps teams that cannot afford expensive, powerful solutions.

By combining Prometheus and Grafana, your team gets helpful insights into the system to optimize performance, track errors, and aid troubleshooting processes.

---

## How to Deploy Prometheus and Grafana on AWS EKS using Helm

::: note Prerequisites

For this project, we will use an EC2 instance with the Ubuntu 22.04 operating system. If you are using Windows or a Mac, log into AWS to create your virtual machine.

Here’s what else you’ll need:

::: tabs

@tab:active 1.

AWS account setup with access keys and secret keys

- [<FontIcon icon="fa-brands fa-aws"/>AWS Sign Up](https://portal.aws.amazon.com/billing/signup)

```component VPCard
{
  "title": "Manage access keys for IAM users - AWS Identity and Access Management",
  "desc": "Create, modify, view, or update access keys (credentials) for programmatic calls to AWS.",
  "link": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

@tab 2.

Knowledge of Kubernetes

<SiteInfo
  name="Kubernetes Documentation"
  desc="Kubernetes is an open source container orchestration engine for automating deployment, scaling, and management of containerized applications. The open source project is hosted by the Cloud Native Computing Foundation."
  url="https://kubernetes.io/docs/home/"
  logo="https://kubernetes.io/icons/icon-128x128.png"
  preview="https://kubernetes.io/images/kubernetes-horizontal-color.png"/>

@tab 3.

AWS CLI installation for the virtual server

```component VPCard
{
  "title": "Installing or updating to the latest version of the AWS CLI - AWS Command Line Interface",
  "desc": "Instructions to install or update the AWS CLI on your system.",
  "link": "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

:::

### Getting Started

Let’s start by setting up an EKS cluster on a virtual server and installing the required tools on the server. Then, we’ll deploy our monitoring tools, Prometheus and Grafana, using Helm charts. In the end, we’ll deploy an NGINX web application on Kubernetes and use Grafana to visualize the pod performance and cluster resource usage on the cluster.

### Step 1: Install AWS CLI, `eksctl`, `kubectl`, and Helm

AWS CLI is a tool that allows users to interact with AWS services using the command-line interface. It makes the management of cloud resources simpler and enables admins to configure AWS services.

Here, we will install AWS CLI on our server to be able to create Kubernetes resources.

On your server, run the following commands:

```sh
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install
```

Verify the installation by running this:

```sh
aws --version
```

After installation, configure the AWS CLI with your credentials using the following command:

```sh
aws configure
```

You will be prompted to enter your AWS Access Key ID, Secret Access Key, Default region name, and default output format.

Next, we need to install eksctl. `eksctl` is a command-line tool that simplifies the creation and management of Kubernetes clusters on AWS. It helps you configure, set, and maintain clusters and allows you to manage clusters more effectively.

This tool removes the complexities of setting up a production-grade cluster, helping you and your admins focus only on application development and deployment.

To set up `eksctl` on your machine, download the latest release using the following command:

```sh
# for ARM systems, set ARCH to: arm64, armv6 or armv7
ARCH=amd64
PLATFORM=$(uname -s)_$ARCH
curl -sLO "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_$PLATFORM.tar.gz"

# (Optional) Verify checksum
curl -sL "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_checksums.txt" | grep $PLATFORM | sha256sum --check
tar -xzf eksctl_$PLATFORM.tar.gz -C /tmp && rm eksctl_$PLATFORM.tar.gz
sudo mv /tmp/eksctl /usr/local/bin
```

Run `eksctl version` to confirm its successful installation and the version downloaded.

```sh
eksctl version # 0.198.0
```

Next, we’ll run Kubectl which is a command line interface for managing and interacting with Kubernetes clusters. It enables users to deploy and manage applications within a Kubernetes environment.

With Kubectl, you can perform various crucial operations such as scaling, deployments, inspecting cluster status, and managing networking.

To install `kubectl`, run the following commands:

```sh
curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
```

Run `kubectl` on your command line to confirm it has been installed successfully:

```sh
kubectl version
#
# client version: 0.198.0
# Kustomize Versionv: 5.4.2
# Server Version: v1.30.7-eks-56e63d8
```

Finally, we’ll install Helm which is a Kubernetes Package manager that simplifies the deployments and management of applications in Kubernetes. It uses [`charts`](https://helm.sh/docs/topics/charts/) to define Kubernetes resources into a collection of files, handles templating and versioning, and makes application deployment easier.

Here, we will install the Helm package manager on our virtual machine for our cluster deployments. This downloads the installation script and saves it in the <FontIcon icon="iconfont icon-shell"/>`get_helm.sh` file.

Next, the file is set to executable, which allows only the user to run it. Finally, the script is executed using the `./get_helm.sh` command.

```sh
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

### Step 2: Create a Kubernetes Cluster

Next, we need to create our Kubernetes cluster in AWS with the `eksctl` command line. We can do this with the following command:

```sh
eksctl create cluster \
--name my-prac-cluster-1 \
--version 1.30 \
--region us-east-1 \
--nodegroup-name worker-nodes \
--node-type t2.medium \
--nodes 2 --nodes-min 2 --nodes-max 3
```

![Terminal window in Visual Studio Code displaying a series of commands and outputs related to setting up an EKS cluster. The log includes status updates, such as "creating addon" and "EKS cluster resources have been created." The environment is Ubuntu, visible through the desktop interface and application icons on the left.](https://lh7-rt.googleusercontent.com/docsz/AD_4nXf-np7NdxK-zwQLtYoVE51RUoHYMf5GBHT1tAEjV-eoxk2xCvH13s0tjzPdIb8QVt5amijSBjkpaAh4AuPQd4DJvtnKmMpPQ1_dFoRx1KRNRiCto0U7CpXU-rsd-KH8NhuQoHfRAg?key=U2Fi6zvcj43zRMwXR2oKCzLU)

Let’s break down the command:

- `–name my-prac-cluster-1`: This specifies the name of the EKS cluster that will be created. In this case, the cluster will be named **my-prac-cluster-1**.
- `–version 1.30`: This sets the Kubernetes version for the cluster. Here, the version will be version 1.30.
- `--region us-east-1`: This specifies the AWS region where the cluster will be provisioned on AWS. Here, it is set to us-east-1.
- `--nodegroup-name worker-nodes`: This defines the name of the node groups that will be created. In this case, it’s named **worker-nodes**.
- `--node-type t2.large`: This sets the instance type for the worker nodes in the `node-group`.
- `--nodes 2`: This sets the desired number of worker nodes in the node group.
- `--nodes-min 2`: This sets the minimum number of worker nodes that should be maintained in the node group to 2.
- `--nodes-max 3`: This defines the maximum number of worker nodes allowed in the node group and sets it to 3.

Once the cluster comes up, run the command `kubectl get nodes` to ensure that the cluster is set up properly.

### Step 3: Install the Metrics Server

The metrics server is a component that collects resource data from the Kubelets on each node in the cluster. This includes metrics such as CPU, memory, and network usage, which Prometheus can access. The server provides a single source of truth for resource data and is easy to deploy and use.

Run the following script to install the metrics server:

```sh
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

To verify the installation, run the following command:

```sh
kubectl get deployment metrics-server -n kube-system
```

![A terminal screenshot displaying the command output for `kubectl get deployment metrics-server -n kube-system`. It shows the deployment details of "metrics-server" with readiness, up-to-date and available statuses as 1, and an age of 51 minutes.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734913540206/47361106-21b0-4076-91c2-ffb8a925b372.jpeg)

### Step 4: Install the IAM OIDC Identity Provider and Amazon EBS CSI Driver

The IAM OpenID connect provider allows Kubernetes access to AWS resources within the cluster. Here, we need EBS volumes to create persistent storage for Prometheus pods.

Run the following commands to create the IAM OIDC provider:

```sh
eksctl utils associate-iam-oidc-provider \
--cluster my-prac-cluster-1 \
--approve
```

Next, we will create the Amazon EBS CSI Driver that will provide permissions for the cluster to access the EBS volumes. Replace the placeholder “my-cluster” with your cluster name.

```sh
eksctl create iamserviceaccount \
--name ebs-csi-controller-sa \
--namespace kube-system \
--cluster my-prac-cluster-1 \
--role-name AmazonEKS_EBS_CSI_DriverRole \
--role-only \
--attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
--approve
```

Now, we need to add the AWS EBS Driver Addon to the cluster using the following commands:

```sh
eksctl create addon --name aws-ebs-csi-driver \
--cluster <CLUSTER_NAME> \
--service-account-role-arn arn:aws:iam::<AWS_ACCOUNT_ID>:role/AmazonEKS_EBS_CSI_DriverRole \
--force
```

Adding the AWS EBS CSI Driver to your Kubernetes cluster enables the cluster to dynamically create and manage EBS volumes for persistent storage within the cluster. Since our Prometheus installation needs persistent volumes, this add-on will enable the cluster to create EBS volumes to persist data.

Now, our future Prometheus installation will create EBS volumes for persistent storage.

### Step 5: Install Prometheus and Grafana

To install Prometheus and Grafana, we need to add the Helm Stable Charts for the local client.

Run the command below:

```sh
helm repo add stable https://charts.helm.sh/stable
```

Next, we will add the Prometheus Helm repo:

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

We’ll use the Prometheus community version because it is well-maintained by the Prometheus community. It offers faster updates and continuous improvements for different Kubernetes environments.

Next, create the Prometheus namespace:

```sh
kubectl create namespace prometheus
```

Install Prometheus and Grafana through the `kube-prometheus-stack` Helm Chart:

```sh
helm install stable prometheus-community/kube-prometheus-stack -n prometheus
```

When that’s done, verify that the Prometheus deployment and service are installed by using the command below:

```sh
kubectl get all -n prometheus
```

![Terminal output showing Kubernetes resources in the "prometheus" namespace. It lists several pods and services, each with information on readiness, status, restarts, age, type, cluster IP, and ports. All pods are in the "Running" status, with no restarts.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734913921541/9b851fcc-c390-4d86-9108-adaaddd58d07.jpeg)

At this stage, you should change the service type from a ClusterIP to a LoadBalancer in the manifest file. We can update the file by running the command below:

```sh
kubectl edit svc stable-kube-prometheus-sta-prometheus -n prometheus
```

![ Screenshot of a Kubernetes service YAML file edited with kubectl for Prometheus in the prometheus namespace.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734914216836/217e2e5e-1d75-4ca4-88eb-56276f25c12f.jpeg)

After the update, a LoadBalancer URL will be generated for you to access your Prometheus Dashboard.

![ Prometheus dashboard showing the "Targets" page with active scrape pools, including details such as endpoints, state, labels, last scrape, scrape duration, and errors for Prometheus Alertmanager services.](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcWtK8G1cJTD8GI-vACe_KexsXIp5SEXYiGTuBXZNQJ93tpo-XrMVb6ekA1ZRDrAODyFn29p3JdQDOHCdMnq2eapX4drdLMJ_8u_B8z1Jl0LqJjIHJwwIbDhgRUU5tlkGhhnBdYKQ?key=U2Fi6zvcj43zRMwXR2oKCzLU)

Next, we’ll move over to Grafana. Change the SVC file of Grafana to create a LoadBalancer and expose it to the public using the command below:

```sh
kubectl edit svc stable-grafana -n prometheus
```

Next, we will update the Grafana SVC file by changing the service `type` from `ClusterIP` to `LoadBalancer` to expose it to the public using the command below:

```sh
kubectl edit svc stable-grafana -n prometheus
```

![Screenshot of a Kubernetes service YAML configuration file edited using kubectl edit svc stable-grafana -n prometheus, displaying the details for the Grafana service in the prometheus namespace](https://cdn.hashnode.com/res/hashnode/image/upload/v1734914435224/1ab76b93-2b35-4074-92cb-c7c3173edaee.jpeg)

Once the settings are saved, you can use the `LoadBalancer` link to access your Grafana Dashboard from the browser. The username is **admin**. To get the login password printed in the terminal, run the following command:

```sh
kubectl get secret \
--namespace prometheus stable-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

![Grafana login screen displaying input fields for email/username and password with a notification indicating a successful login.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734915573534/12b64c7f-b74b-4ebb-8a1b-ae6c5357f76a.jpeg)

![Grafana welcome dashboard after a successful authentication](https://cdn.hashnode.com/res/hashnode/image/upload/v1734915606224/bc06a48b-75e8-4115-816b-462c69975d97.jpeg)

After successfully logging into the Grafana dashboard, the first step is to create a `datasource` that will provide the metrics for the Grafana visualization.

Go to **Add your first data source** and choose Prometheus as the Data Source.

Insert the Prometheus URL, and click on “**Save and Test**”. It should show success if Grafana queries the Prometheus URL successfully.

The next step is to create a Dashboard that our Grafana visualization will use to view the metrics of our pods. To do so, click on “**Dashboards**” and then on “**Add Visualization.**”

![Screenshot of a configuration interface showing options for custom query parameters and HTTP method (set to POST) for Prometheus data source. Confirmation message states, "Successfully queried the Prometheus API," with options to delete or save & test.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734915769650/10f7877b-7183-4709-b672-ff6d67ef529d.jpeg)

![Grafana Dashboard interface with options to add a visualization, import a panel, or import a dashboard. There is a prominent button for adding a visualization.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734915836669/3fb27ce9-23d9-4c35-abf6-7ce44508720d.jpeg)

You’d be taken to an environment where you’d be required to import a dashboard. Select the data source as “**Prometheus-1**” and use the code “**15760**” to import the Node Exporter dashboard to view our pods.

Click on Load after importing the dashboard, and you will see your newly created dashboard.

Here, we can see the entire data of the cluster, the CPU and RAM use, and data regarding pods in a specified namespace.

![Screenshot of a Grafana interface showing a "Select data source" window. Two data sources named "Prometheus" and "prometheus-1" are listed. Options for using mixed data sources, dashboards, and Grafana mock data are on the right.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734917376090/9e0097f4-07bb-495a-9572-060db373334c.jpeg)

![Screenshot of Grafana's "Import dashboard" page, showing options to upload a JSON file or enter a dashboard ID. The ID "15760" is entered in the input box, and there is a JSON model example displayed below.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734917392381/c7e01350-d90e-43a1-b172-82899f377d82.jpeg)

### Step 6: Deploying an Application on Kubernetes to Monitor on Grafana.

Finally, we will deploy an NGINX container in our EKS Cluster to monitor using Grafana. We need to create a Yaml deployment and service file.

```yaml title="deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-app
  template:
    metadata:
      labels:
        app: nginx-app
    spec:
      containers:
      - name: nginx-app
        image: nginx:latest
        ports:
        - containerPort: 80

---
apiVersion: v1
kind: Service
metadata:
  name: nginx-app
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 80
  selector:
    app: nginx-app
```

To deploy the Node.js application on the Kubernetes cluster, use the following `kubectl` command. Verify the deployment by running the following `kubectl` command:

```sh
kubectl apply -f deployment.yml
kubectl get deployment
kubectl get pods
```

Click the load balancer URL to see your application on your browser:

![Browser window displaying the default welcome page for Nginx, indicating successful installation and suggesting further configuration.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734917018333/987b78c4-cae0-42dc-bd19-0a4f8a6a6b10.jpeg)

Let’s refresh our Grafana dashboard to see our NGINX web application in Grafana.

![A Kubernetes dashboard showing CPU and memory usage by container. The CPU usage graph is on the left, and the memory usage graph is on the right. Both graphs display data for containers named "nginx-app" over the last 5 minutes.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734917096760/72815d56-04a5-47cf-8b2b-89164ccb7e7a.jpeg)

### Step 7: Deleting the Cluster

Now that everything is set up, we can delete our Kubernetes Cluster to avoid extra costs. Run the following commands to do so:

```sh
eksctl delete cluster my-prac-cluster-1 \
–region us-east-1
```

![A terminal window displaying a series of commands and system messages related to the deletion of an EKS cluster and associated resources. It shows timestamps for each action, status updates, and confirmation that all cluster resources were deleted successfully.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734917455255/04b00a79-d963-4e28-bc99-4cb6ea8c65cf.jpeg)

---

## Conclusion

This article teaches the theory behind monitoring and observability and highlights the roles of Prometheus and Grafana in these processes.

We went through a hands-on deployment of Prometheus and Grafana on an EKS cluster and a web application to illustrate how they can be effectively monitored using Grafana.

By leveraging these tools, administrators can enjoy real-time visibility into their Kubernetes infrastructure, easily spot performance bottlenecks, and confidently make decisions that enhance application performance and reliability.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Monitor Your Kubernetes Clusters with Prometheus and Grafana on AWS",
  "desc": "Creating a solid application monitoring and observability strategy is a critical foundational step when deploying infrastructure or software in any environment. Monitoring ensures that your systems are running smoothly, while observability provides i...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/kubernetes-cluster-observability-with-prometheus-and-grafana-on-aws.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
