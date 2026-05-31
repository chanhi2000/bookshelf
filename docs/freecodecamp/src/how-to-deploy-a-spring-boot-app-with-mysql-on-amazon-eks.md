---
lang: en-US
title: "How to Deploy a Spring Boot App with MySQL on Amazon EKS"
description: "Article(s) > How to Deploy a Spring Boot App with MySQL on Amazon EKS"
icon: fa-brands fa-aws
category:
  - Java
  - Spring
  - DevOps
  - Docker
  - Kubernetes
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - kotlin
  - spring
  - devops
  - docker
  - k8s
  - kubernetes
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy a Spring Boot App with MySQL on Amazon EKS"
    - property: og:description
      content: "How to Deploy a Spring Boot App with MySQL on Amazon EKS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-spring-boot-app-with-mysql-on-amazon-eks.html
prev: /articles/README.md
date: 2026-06-04
isOriginal: false
author:
  - name: Chisom Uma
    url: https://freecodecamp.org/news/author/ChisomUma123/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5a7cd6a7-7850-4e3c-9a45-b577c2f91598.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Spring > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-spring/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Deploy a Spring Boot App with MySQL on Amazon EKS"
  desc="If you've been looking to deploy your Spring Boot app to the cloud but feel a little overwhelmed by all the moving pieces, don't worry, you're not alone. Kubernetes can seem intimidating at first, but"
  url="https://freecodecamp.org/news/how-to-deploy-a-spring-boot-app-with-mysql-on-amazon-eks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5a7cd6a7-7850-4e3c-9a45-b577c2f91598.png"/>

If you've been looking to deploy your Spring Boot app to the cloud but feel a little overwhelmed by all the moving pieces, don't worry, you're not alone.

Kubernetes can seem intimidating at first, but Amazon EKS (Elastic Kubernetes Service) makes it much more approachable, especially when you have a step-by-step guide to follow.

In this tutorial, we'll walk through exactly how to get a Spring Boot application with a MySQL database up and running on Amazon EKS. I'll take you from from containerizing your app to connecting it to a managed database, all the way to accessing it live in the cloud. Let’s get started.

::: note Prerequisites

Before you begin, ensure you have the following:

- Basic knowledge of AWS (AWS Console access).
- Basic knowledge of containerization.
- Working knowledge of Kubernetes.
- Basic knowledge of databases.
- [<VPIcon icon="iconfont icon-helm"/>Helm](https://helm.sh/docs/intro/install/) installed
- [<VPIcon icon="iconfont icon-k8s"/>Kubectl](https://kubernetes.io/docs/tasks/tools/) installed
- [<VPIcon icon="fa-brands fa-aws"/>Eksctl](https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-eksctl.html) installed
- An IDE

:::

---

## Application Overview

The application runs inside an AWS VPC spread across two availability zones for high availability. When a user makes a request, it flows through an Internet Gateway into an AWS Application Load Balancer sitting in the public subnet, which handles incoming traffic via an Ingress rule.

The Load Balancer routes requests to the App Service, which distributes them across multiple App Pods running inside AWS EKS (Elastic Kubernetes Service) in the private subnets.

The Docker images for these pods are pulled from AWS ECR (Elastic Container Registry). For data persistence, the app pods connect to Amazon RDS MySQL databases through a MySQL External Service, with an RDS instance in each availability zone to ensure redundancy.

A NAT Gateway in the public subnet allows the private resources to make outbound internet calls without being directly exposed to the internet.

---

## What is Amazon EKS?

If you've ever tried to manage containers manually, you already know it can get messy pretty quickly, tracking which containers are running, restarting ones that crash, scaling up when traffic spikes... It's a lot.

That's exactly the problem Kubernetes was built to solve. It automates the deployment, scaling, and management of containerized applications. But setting up and maintaining your own Kubernetes cluster from scratch? That's a whole other challenge.

That's where [<VPIcon icon="fa-brands fa-aws"/>Amazon EKS](https://aws.amazon.com/pm/eks/) comes in. EKS is a fully managed Kubernetes service provided by AWS, which means AWS handles the heavy lifting of setting up, securing, and maintaining the Kubernetes control plane for you. You just focus on deploying your application.

---

## How to Deploy a Spring Boot App with MySQL on Amazon EKS

In this section, we’ll cover the steps to follow in deploying your SpringBoot application with MySQL on Amazon EKS.

### Step 1: Create the VPC

To create a VPC, log in to the [<VPIcon icon="fa-brands fa-aws"/>AWS IAM Console](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fiam%3Fca-oauth-flow-id%3Df7d2%26hashArgs%3D%2523%26isauthcode%3Dtrue%26oauthStart%3D1777888354778%26region%3Dus-east-1%26state%3DhashArgsFromTB_us-east-1_0481039a94bc47bd&client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fiamv2&forceMobileApp=0&code_challenge=USO5m22DxkRMX1kvbC19ZE-zr5Eyzp52MXY5jnbANB8&code_challenge_method=SHA-256) and search for “VPC,” then click create VPC.

![vpc interface](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/9a1f57fd-7665-469f-a0c2-7d548590c20f.png)

Select the "VPC and more option: and give your VPC a name for your project, for example, spring-demo. Set the IPv4 CIDR block to 10.4.0.0/16. For the NAT gateway configuration, select Zonal, then In 1 AZ.

![NAT gateway config](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/960002c0-9d53-481d-90be-79a7092088ce.png)

Select None for VPC endpoints configuration. Next, click Create VPC, then click View VPC. This takes you to the VPC resource map.

### Step 2: Set Up the MySQL Database in a Private Subnet

First, you need to create the security group for the MySQL and EC2 instance deployment. To do that, navigate to EC2 > Security Groups. For the inbound rule, select Type: All traffic and Source: Anywhere-IPv4. Then click Create security group.

Next, we’ll create the subnet group for the database. To do that, navigate to Aurora and RDS > Subnet groups and click Create DB subnet group. Next, configure the DB subnet to include:

- **Name**: private-subnet-db
- **Description**: private-subnet-db
- **VPC**: Select VPC
- **Add subnets**: Choose `us-east-1a` and `us-east-1b` as the availability zones, then select the private and public subnets

Click Create.

Now, navigate to Databases, click Create database, and select Full configuration. Select MySQL as the engine type.

Select the Free tier when choosing a sample template. Next, give your DB a username and a strong password. Choose `db.t3.micro` as the instance type.

Select your VPC and associated private subnet. Now, uncheck the "Enable auto minor version upgrade" option in the Additional configuration section and click Create database.

While our database initializes, let's create a key pair for the EC2 instance, which will be launched in a public subnet. To do that, navigate to EC2 > Network & Security > Key Pairs and click Create key pair.

Give your key pair a name, for example, ece-db-key-pair. Leave everything else as-is and click Create key pair. This automatically downloads the key-pair into your local machine.

### Step 3: Deploy EC2 Instance in a Public Subnet

Now it’s time to create an EC2 instance. To do this, navigate to EC2 > Instances and click Launch instances. Select the key pair you just created in the Key pair section.

Next, in the Network section, select the VPC created earlier for the project. For Auto-assign public IP, choose Enable. Next, choose the Select existing security group option and select the all-access-sg security group created earlier. Next, click Launch instance.

### Step 4: Create SSH Tunneling for the Database

For this step, go into your terminal and navigate to the folder where your key pair is downloaded. Run the ls command, and you should see your key pair there.

Next, you need to change the permission of the key pair file. Use the command below:

```sh
chmod 0400 ece-db-key-pair.pem 
```

Now, run the SSH tunneling command below:

```sh
ssh -i <YOUR-KEY-PAIR>.pem -f -N \
-L <LOCAL-PORT>:<YOUR-RDS-ENDPOINT>:<RDS-PORT> <EC2-USERNAME>@<YOUR-EC2-PUBLIC-DNS> \
-v
```

- `<YOUR-KEY-PAIR>.pem`: the name of your downloaded key pair file
- `<LOCAL-PORT>`:  the port on your laptop (3306 for MySQL, 5432 for PostgreSQL)
- `<YOUR-RDS-ENDPOINT>`: found in AWS Console > RDS > Your database > Connectivity & Security > Endpoint
- `<RDS-PORT>`: same as local port (3306 for MySQL, 5432 for PostgreSQL)
- `<EC2-USERNAME>`: usually ec2-user for Amazon Linux, ubuntu for Ubuntu
- `<YOUR-EC2-PUBLIC-DNS>`: found in AWS Console > EC2 > Your instance > Public IPv4 DNS

This command lets your laptop or local machine talk directly to your remote database, as if the database were sitting on your own computer.

After running this command, you can open a database tool (like MySQL Workbench, DBeaver, or TablePlus) on your laptop and connect to:

- Host: localhost
- Port: 3306

For this tutorial, I’ll be using the community version of DBeaver. You can use other similar tools, but if you prefer to use the same tool for the purpose of this guide, you can install the community version from the official [<VPIcon icon="iconfont icon-dbeaver"/>DBeaver download page](https://dbeaver.io/download/).

After download and installation, open the DBeaver client and click the Connect to a database icon in the top-left corner of the app.

Select MySQL and click Next. On the next window, enter your database username and password, and set Server Host to 127.0.0.1. Click Test Connection.

You should see a window appear on your screen, indicating that the connection is successful.

Click OK and Finish.

Now, on the left panel, you should see your connection. Expand it to see the database structure.

![database structure](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/5c8115eb-020a-4b8d-9c84-9a1b4c10a071.png)

Now, you have successfully created SSH tunneling for your database.

#### Troubleshooting

While attempting to test the database connection, I initially ran into a “Plugin 'mysql_native_password' is not loaded” error. If you encounter this error, follow the steps below to fix it.

1. On the Connection Settings window, navigate to the Driver properties tab.
2. Look for allowPublicKeyRetrieval and set it to FALSE.
3. Navigate back to the Main tab and click Test Connection.

Everything should work fine now.

### Step 5: Set Up a Simple SpringBoot Application Development

To get started, head over to the [<VPIcon icon="iconfont icon-spring"/>Spring Initializr website](https://start.spring.io/). Rename Artifact to “springboot-mysql-eks”. Then click ADD DEPENDENCIES… to add dependencies for the REST APIs. Search for the following dependencies:

- **Spring Web:** Build web apps, including RESTful applications using Spring MVC. Uses Apache Tomcat as the default embedded container.
- **Spring Data JPA:** Persist data in SQL stores with the Java Persistence API using Spring Data and Hibernate.
- **IBM DB2 Driver:** A JDBC driver that provides access to IBM DB2.
- **Lombok:** A Java annotation library that helps to reduce boilerplate code.

Next, click GENERATE at the bottom center of the page. This action downloads a zip file to your local machine. Open this file in an IDE, such as VSCode or IntelliJ IDEA. For this tutorial, I use VSCode. In the build.gradle file, you can see all the added dependencies:

```groovy title="build.gradle"
dependencies {
   implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
   implementation 'org.springframework.boot:spring-boot-starter-webmvc'
   compileOnly 'org.projectlombok:lombok'
   runtimeOnly 'com.ibm.db2:jcc'
   annotationProcessor 'org.projectlombok:lombok'
   testImplementation 'org.springframework.boot:spring-boot-starter-data-jpa-test'
   testImplementation 'org.springframework.boot:spring-boot-starter-webmvc-test'
   testCompileOnly 'org.projectlombok:lombok'
   testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
   testAnnotationProcessor 'org.projectlombok:lombok'
}
```

#### What we're building

The Spring Boot app is a currency exchange rate and conversion app:

![image of counter](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/eef403da-eb1d-47e8-8edd-d0e4d845a3d1.png)

We'll be inserting the exchange data into the database table.

To continue with this tutorial, you can clone the project repo [here (<VPIcon icon="iconfont icon-github"/>`ChisomUma/sprint-boot-msql-eks`)](https://github.com/ChisomUma/sprint-boot-msql-eks) to save time.

In main > java > com.. > model > ExchangeRate, you’ll see the code below:

```java title="src/main/java/com/example/springbootmysqleks/model/ExchangeRate.java"
package com.example.springbootmysqleks.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@Entity
@Table(name = "exchange-rate")
public class ExchangeRate {
   @Id
   @GeneratedValue(strategy=GenerationType.AUTO)
   private Integer transactionId;
   private String sourceCurrency;
   private String targetCurrency;
   private double amount;
   private Date lastUpdated;
}
```

This class is essentially a blueprint for storing currency exchange rate data in our database. It uses the libraries and dependencies added earlier. Lombok handles all the repetitive getter/setter boilerplate so you don't have to write it yourself, while JPA annotations like `@Entity` and `@Table` tell Spring, "hey, this class maps to a database table called exchange-rate."

Inside the class, there are five fields that become database columns:

- A self-incrementing transactionId as the primary key.
- sourceCurrency and targetCurrency to track which currencies are being converted,
- The amount holding the actual exchange rate
- lastUpdated date, so you always know how fresh your data is.

To store the data, create a repository file in main > java > com.. > repository > ExchangeRateRepository:

```java title="src/main/java/com/example/springbootmysqleks/repository/ExchangeRateRepository.java"
package com.example.springbootmysqleks.repository;

import com.example.springbootmysqleks.model.ExchangeRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Integer> {
   ExchangeRate findBySourceCurrencyAndTargetCurrency(String sourceCurrency, String targetCurrency);
}
```

This file acts as the middleman between your code and the database. By simply extending JpaRepository, you instantly get a whole suite of built-in database operations (like save, delete, findAll, and so on) completely for free, without writing a single SQL query.

The interface is typed to work with the `ExchangeRate` model we just looked at, using Integer as the primary key type.

The one custom method, `findBySourceCurrencyAndTargetCurrency`, is where Spring's magic really shines. Just by following a naming convention, Spring automatically figures out the SQL query it needs to run, so you can look up an exchange rate by simply passing in two currency codes like "USD" and "EUR" without writing any query logic yourself.

To use the `findBySourceCurrencyAndTargetCurrency` method, create a service file in main > java > com.. > service > ExchangeRateService with the code below:

```java title="src/main/java/com/example/springbootmysqleks/service/ExchangeRateService.java"
package com.example.springbootmysqleks.service;

import com.example.springbootmysqleks.model.ExchangeRate;
import com.example.springbootmysqleks.repository.ExchangeRateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExchangeRateService {

   @Autowired
   private ExchangeRateRepository exchangeRateRepository;

   public ExchangeRate addExchangeRate(ExchangeRate exchangeRate) {
       return exchangeRateRepository.save(exchangeRate);
   }

   public double getAmount(String sourceCurrency, String targetCurrency) {
       ExchangeRate exchangeRate =  exchangeRateRepository.findBySourceCurrencyAndTargetCurrency(sourceCurrency, targetCurrency);
       return exchangeRate == null ? 0 : exchangeRate.getAmount();
   }
}
```

Here, we created a `@Service` class that interacts with the repository.

The class has two methods, the `addExchangeRate`, which simply takes an `ExchangeRate` object and saves it to the database, and `getAmount`, which takes a source and target currency, uses our custom repository method to look up the matching record, and then either returns the exchange rate amount or a safe default of 0 if no record is found.

That little ternary check (`exchangeRate == null ? 0 : exchangeRate.getAmount()`) ensures the app doesn't crash if you query a currency pair that doesn't exist in the database yet.

In main > java > com.. > controller > ExchangeRateController, we have the following code:

```java title="src/main/java/com/example/springbootmysqleks/controller/ExchangeRateController.java"
package com.example.springbootmysqleks.controller;

import com.example.springbootmysqleks.model.ExchangeRate;
import com.example.springbootmysqleks.service.ExchangeRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ExchangeRateController {

   @Autowired
   ExchangeRateService exchangeRateService;

   @GetMapping("/getAmount")
   public double getAmount(@RequestParam String sourceCurrency, @RequestParam String targetCurrency) {
       return exchangeRateService.getAmount(sourceCurrency, targetCurrency);
   }

   @PostMapping("/addExchangeRate")
   public ExchangeRate addExchangeRate(@RequestBody ExchangeRate exchangeRate) {
       return exchangeRateService.addExchangeRate(exchangeRate);
   }

   @GetMapping("/")
   public String getHealth() {
       return "up";
   }

}
```

The `@RestController` annotation tells Spring this class will be serving up REST API endpoints, and again `@Autowired` wires in the service layer automatically.

There are three endpoints:

1. a GET request to `/getAmount` that accepts `sourceCurrency` and `targetCurrency` as query parameters and returns the exchange rate amount
2. a POST request to `/addExchangeRate` that accepts a full `ExchangeRate` object as a JSON body and saves it to the database
3. and finally a simple health check endpoint at / that just returns "up",  which is a common pattern in cloud deployments to let load balancers and orchestration tools know the app is alive and running.

### Step 6: Configure SpringBoot App for Database

Now, it’s time to configure the application for the database. Navigate to src > main > resources > application.properties, and you should see this:

```conf title="src/main/resources/application.properties"
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://\({MYSQL_HOSTNAME}:\){MYSQL_PORT}/${MYSQL_DATABASE}?createDatabaseIfNotExist=true
spring.datasource.username=${MYSQL_USERNAME}
spring.datasource.password=${MYSQL_PASSWORD}

spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql: true
```

These are the configurations that allow your app to connect with the database.

- `spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver`: The driver class for the MySQL database.
- `spring.datasource.url=jdbc:mysql://\({MYSQL_HOSTNAME}:\){MYSQL_PORT}/${MYSQL_DATABASE}?createDatabaseIfNotExist=true`: This is the data source URL in which we are using the MySQL hostname (127.0.0.1), port name, and database name.
- `spring.datasource.username=${MYSQL_USERNAME}`: your database user name.
- `spring.datasource.password=${MYSQL_PASSWORD}`: your database password.

One thing to note: the process of configuring environment variables with your actual credentials varies depending on the IDE you're using. If you're using IntelliJ IDEA, this process is pretty straightforward. If you're using VS Code, the process is different.

To configure your actual credentials for the <VPIcon icon="iconfont icon-dotenv"/>`.env` variables, create a <VPIcon icon="fas fa-folder-open"/>`.vscode/`<VPIcon icon="iconfont icon-json"/>`launch.json` file in your project root folder and paste in the following configuration:

```json title=".vscode/launch.json"
{
 "version": "0.2.0",
 "configurations": [
   {
     "type": "java",
     "name": "Spring Boot App",
     "request": "launch",
     "mainClass": "com.example.springbootmysqleks.SpringbootMysqlEksApplication",
     "projectName": "springboot-mysql-eks",
     "env": {
       "MYSQL_HOSTNAME": "localhost",
       "MYSQL_PORT": "3306",
       "MYSQL_DATABASE": "exchangedb",
       "MYSQL_USERNAME": "root",
       "MYSQL_PASSWORD": "CHANGE_ME"
     }
   }
 ]
}
```

Configure the credentials to use your actual credentials.

Now, when you run the app, you should be able to see the created `exchangedb` table in DBeaver:

![exchnage db image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/9ea1b85c-25a8-4587-a013-4d592d1664eb.png)

Use an API testing tool like Postman to send a POST request to the database:

![postman request image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/5fa9e950-17ff-4fd6-a650-b6a33b607744.png)

Next, run the `select * from exchange_rate er` script in the `exchangedb` SQL script editor:

![sql editor image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/a7a2ffea-f930-4f27-b29a-f5aaf8f8543e.png)

At the bottom of the editor, you should see the created table from the Postman request.

Now, run a GET request to the endpoint below:

```plaintext
http://localhost:8080/getAmount?sourceCurrency=USD&targetCurrency=EUR&transactionId=1
```

You should get a 200 OK response with the currency exchange value, for example, 0.93. ### Step 7: Dockerize the SpringBoot Application

To Dockerize your application, create a file named Dockerfile and paste in the configuration below:

```dockerfile title="Dockerfile"
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY build/libs/springboot-mysql-eks.jar /app
EXPOSE 8080
CMD ["java", "-jar", "springboot-mysql-eks.jar"]
```

Our Dockerfile starts by pulling the lightweight `eclipse-temurin:17-jre-jammy` base image to keep things lean, then sets /app as the working directory inside the container. It copies our compiled Spring Boot JAR file from the local build/libs/ folder into that directory, exposes port 8080 for incoming traffic, and finally runs the app with `java -jar` when the container starts up.

Next, build the app to create the `.jar` file. To do that, run the command below:

```sh
./gradlew clean assemble 
```

You should get a successful build output as shown below:

![](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/bde4395b-bc30-46e4-9687-bd03836f574d.png)

Navigate to build > the libs folder. You’ll see the `springboot-mysql-eks` file created.

If you run into an “operation couldn’t be completed.” error, try running the export commands to fix this issue. If you’re using a Mac, then run the command below:

```sh
brew install openjdk@21
```

Next, run the export commands:

```sh
export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home

export PATH=\(JAVA_HOME/bin:\)PATH
```

Then run the `./gradlew clean assemble` command again.

### Step 8: Push the Image to Elastic Container Registry (ECR)

In this next step, we’ll create an Amazon ECR and push our image to the registry.

To get started, head back into your AWS Console and search for “ECR”. On the ECR page, click Create. Then, enter a repository name, for example, “springboot-mysql-eks.” Next, click Create.

![ECR image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/21c56eef-c656-49b6-a624-b1da66cf1096.png)

Next, select the repo and click View push commands at the top of the page. This presents a window with a bunch of commands you can use to push your image to the registry. Open your terminal and run these commands. You'll need to ensure Docker is running on your local machine before running the commands.

After running the commands, you should see that your image has been successfully pushed to the registry.

![ECR image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/b39d0b9c-ea99-4cf3-bfb0-3496ac79dea9.png)

### Step 9: Implement AWS App Load Balancer

Before getting started with this step, make sure you check out the installation steps and link to additional AWS documentation in the project README. This will help you follow along.

Now, to get started, create a new folder in your root directory named `cluster` . This is where you'll download the AWS IAM policy for the load balancer. To download the policy, go into your terminal and `cd` into `cluster`, then run the command below:

```sh
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.14.1/docs/install/iam_policy.json
```

This command is gotten from the [<VPIcon icon="fa-brands fa-aws"/>AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/lbc-helm.html). Now, when you go to the folder, you’ll see an iam_policy.json file automatically generated.

Next, apply the IAM policy using the command below:

```sh
aws iam create-policy \
--policy-name AWSLoadBalancerControllerIAMPolicy \
--policy-document file://iam_policy.json
```

You should get an output like this in your terminal:

This shows that the IAM policy has been successfully created. To confirm this, head over to the IAM section in your console, navigate to Policies, and search for “AWSLoad…”. You should see the policy created there.

![load balancer policy image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/c022959a-c732-4dfd-bd58-4b80d3011b71.png)

The next step is creating the Kubernetes service account. But before that, you need to tag your public and private subnets as described in this [<VPIcon icon="fa-brands fa-aws"/>documentation](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html).

Now, head over to the VPC dashboard, navigate to Subnets, click into a subnet, and navigate to Tags. Then, click Manage tags.

![tag image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/615f3ec2-d266-413e-8936-d0767d03316d.png)

Click Add new tag, then enter the key/pair value in the documentation.

![tag image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/253abe00-cb7e-4276-81de-79ba0ffc249a.png)

### Step 10: Create a Cluster in EKS

To create a Kubernetes cluster on EKS, you need the eksctl CLI. Follow the instructions in the [<VPIcon icon="fa-brands fa-aws"/>AWS eksctl documentation](https://docs.aws.amazon.com/eks/latest/eksctl/installation.html) to install the CLI. Next, you need a [<VPIcon icon="fa-brands fa-aws"/>config file schema](https://docs.aws.amazon.com/eks/latest/eksctl/schema.html) to create the cluster. To use this schema, create a new file called cluster.yaml in the cluster folder.

Next, paste in the following configurations:

```yaml :collapsed-lines
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: spring-test-cluster
  region: us-east-1
  version: "1.30"

vpc:
  id: "<your-vpc-id>"
  subnets:
    private:
      us-east-1a:
        id: "<your-private-subnet-1a-id>" # spring-demo-subnet-private1-us-east-1a
      us-east-1b:
        id: "<your-private-subnet-1b-id>" # spring-demo-subnet-private2-us-east-1b
    public:
      us-east-1a:
        id: "<your-public-subnet-1a-id>" # spring-demo-subnet-public1-us-east-1a
      us-east-1b:
        id: "<your-public-subnet-1b-id>" # spring-demo-subnet-public2-us-east-1b

nodeGroups:
  - name: ng-1
    labels: { role: backend }
    instanceType: t2.micro
    desiredCapacity: 3
    minSize: 3
    maxSize: 5
    privateNetworking: true
    ssh:
      allow: true
      publicKeyName: <your-ec2-key-name>
    iam:
      withAddonPolicies:
        imageBuilder: true
        awsLoadBalancerController: true
        autoScaler: true
iam:
  withOIDC: true
  serviceAccounts:
    - metadata:
        name: aws-load-balancer-controller
        namespace: kube-system
      attachPolicyARNs:
        - arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:policy/AWSLoadBalancerControllerIAMPolicy
```

Th `ClusterConfig` file is used by eksctl to create our EKS cluster called `spring-test-cluster` in the `us-east-1 region`, running Kubernetes version 1.30. It plugs into our existing VPC, placing the worker nodes across private subnets in two availability zones `us-east-1a` and `us-east-1b`) for high availability, while keeping public subnets available for the load balancer.

The node group spins up t2.micro EC2 instances with a desired count of 3 (scaling up to 5 if needed), all with private networking enabled for security. It also sets up the necessary IAM permissions for the AWS Load Balancer Controller, Auto Scaler, and ECR image access so our cluster has everything it needs to manage traffic and pull our Docker images automatically.

Now, after updating your configuration with your credentials, run the command below:

```sh
eksctl create cluster -f cluster.yaml
```

This creates the cluster. You should see an output like this on your terminal:

![cluster creation image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/758c6b7d-9cf3-4fa6-a0d5-2276adc82147.png)

Now, in your AWS console, navigate to CloudFormation, and you’ll see your cluster creation process in progress.

![stack creation image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/4aa96465-45c1-4e43-b8ca-d44a8802e02d.png)

Now, when you go into the EC2 instance page, you should see the three nodes created.

![running cluster image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/d946d993-0c64-4870-90fb-1132df51544f.png)

### Step 11: Install AWS Load Balancing

The next step is installing a load balancer for our application. To get started, run the command below:

```sh
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds?ref=master"
```

This installs [<VPIcon icon="fas fa-globe"/>custom resource definitions (CRDs)](https://geeksforgeeks.org/devops/custom-resource-definitions-crds/) for our controller. Next, run the command below to add the Helm chart repo.

```sh
helm repo add eks https://aws.github.io/eks-charts
```

Update your local repo to ensure you have the most recent charts:

```sh
helm repo update eks
```

Next, install the Helm chart:

```sh
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
-n kube-system \
--set clusterName=my-cluster \
--set serviceAccount.create=false \
--set serviceAccount.name=aws-load-balancer-controller \
--version 1.14.0
```

Next, verify that the controller is installed:

```sh
kubectl get deployment -n kube-system aws-load-balancer-controller
```

You should see this on your terminal:

![](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/61d954f3-b09d-4691-9b1c-02134c2d8bf1.png)

This indicates that your controller is ready.

### Step 12: Create and Deploy Kubernetes

To get started, you'll first need to create a Kubernetes manifest file. For that, we’ll use [**Helm Chart**](/freecodecamp.org/what-is-a-helm-chart-tutorial-for-kubernetes-beginners.md).

```sh
helm create ytchart
```

The command above creates a folder named `ytchart` with the templates for the components. In this folder, you need to make some configurations for your use case. First, navigate to ytchart > templates and delete the <VPIcon icon="iconfont icon-yaml"/>`serviceaccount.yaml` file, since we already created the service account earlier.

Next, go to values.yaml and make the following changes:

- For `repository`, navigate to the ECR service page on the AWS Console and copy the image URI.
- Tag is `latest`.
- Set database name

```yaml
mysql:
 databaseName: exchangedb
```

- Change service account creation to `false`.
- Scroll down a bit more and change the service `type` to `NodePort` and `port` to `8080`.

You also need to store the database username and password using secrets. Navigate to the `templates` folder and go into the file named <VPIcon icon="iconfont icon-yaml"/>`secrets.yaml`. Here, set your database username and password, then comment out the liveness and readiness probe in <VPIcon icon="iconfont icon-yaml"/>`deployment.yaml`.

Next, we’ll create a service to connect to the database. To do that, navigate to the `mysql.yaml` file, then for `externalName`. Navigate to the RDS service page on the AWS console and copy the database endpoint.

Now, in the <VPIcon icon="iconfont icon-yaml"/>`deployment.yaml` file, paste in the following configuration:

```yaml title="deployment.yaml"
          env:
            - name: SPRING_DATASOURCE_URL
              value: jdbc:mysql://spring-mysql:3306/{{ .Values.mysql.databaseName }}?createDatabaseIfNotExist=true&characterEncoding=UTF-8&useUnicode=true&useSSL=false&allowPublicKeyRetrieval=true
            - name: SPRING_DATASOURCE_USERNAME
              valueFrom:
                secretKeyRef:
                  name: mysql-username
                  key: username
            - name: SPRING_DATASOURCE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-root-password
                  key: password
```

You have successfully created environment variables to secure your database credentials.

In the <VPIcon icon="iconfont icon-yaml"/>`ingress.yaml` file, paste in the following configuration:

```yaml title="ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: "spring-microservice-ingress"
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/load-balancer-name: spring-alb-test
  labels:
    app: spring-microservice
spec:
  ingressClassName: alb
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: {{ include "ytchart.fullname" . }}
                port:
                  number: 8080
```

This is your configuration for the ingress service.

Run the command below to see all your configuration values:

```sh
helm template ytchart/
```

Next, run the command below to deploy the chart:

```sh
helm install mychart ytchart
```

You should see an output like this on your terminal:

![helm chart image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/4178105c-f469-4bd6-94f0-58046d12c080.png)

Now, when you run kubectl get all, you should see this:

![deployment image](https://cdn.hashnode.com/uploads/covers/62754329317fc95a74ca62a8/23e91fff-6368-42a1-adda-1af45616e9ef.png)

Now, navigate to EC2 > Load balancers, copy the DNS name, and enter it into a browser. You should see the “up” text. This indicates that your application is working properly.

Now, when you call the API using the DNS URL as such:

```plaintext
http://spring-alb-test-260424558.us-east-1.elb.amazonaws.com/addExchangeRate
```

You should get a 200 OK response. Congratulations, you have successfully deployed a SpringBoot app in Kubernetes!

### Step 13: Delete Cluster

If you’re familiar with AWS and the cloud, you should already be aware of how costly it can be to leave resources running for extended periods, especially when you’re not using them actively.

Now that we've come to the end of this tutorial, it’s time to delete the resources.

These are the resources to delete:

- RDS database.
- Cluster using the command eksctl delete cluster -f cluster.yaml.
- Navigate to VPC and delete the NAT Gateway

---

## Conclusion

Deploying a Spring Boot application with MySQL on Amazon EKS involves a lot of moving parts, but each step builds logically on the last.

In this tutorial, you've gone from setting up a VPC and provisioning a managed database to containerizing your app, pushing it to ECR, and finally orchestrating everything with Kubernetes and an Application Load Balancer.

What you get is a production-grade setup with high availability, private networking, secure credential management, and auto-scaling built in. This is the kind of infrastructure that would take significant manual effort to replicate without managed services like EKS and RDS.

As a next step, consider adding HTTPS support via AWS Certificate Manager, setting up horizontal pod autoscaling, or integrating a CI/CD pipeline to automate future deployments. And remember to clean up your AWS resources when you're done experimenting. Your wallet will thank you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy a Spring Boot App with MySQL on Amazon EKS",
  "desc": "If you've been looking to deploy your Spring Boot app to the cloud but feel a little overwhelmed by all the moving pieces, don't worry, you're not alone. Kubernetes can seem intimidating at first, but",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-spring-boot-app-with-mysql-on-amazon-eks.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
