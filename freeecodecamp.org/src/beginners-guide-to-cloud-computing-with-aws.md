---
lang: en-US
title: "What is Cloud Computing? Beginner's Guide to Cloud Computing with AWS"
description: "Article(s) > What is Cloud Computing? Beginner's Guide to Cloud Computing with AWS"
icon: fa-brands fa-aws
category:
  - DevOps
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is Cloud Computing? Beginner's Guide to Cloud Computing with AWS"
    - property: og:description
      content: "What is Cloud Computing? Beginner's Guide to Cloud Computing with AWS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/beginners-guide-to-cloud-computing-with-aws.html
prev: /devops/aws/articles/README.md
date: 2024-10-18
isOriginal: false
author: Kedar Makode
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729159103929/5b4c74fe-3bf5-4ac5-9739-4313d46a8dd1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is Cloud Computing? Beginner's Guide to Cloud Computing with AWS"
  desc="Ever wondered what people mean when they say, “It’s stored in the cloud”? If you’re imagining fluffy white clouds up in the sky storing your pictures, documents, or your Netflix favorites, then you’re in for a surprise! Spoiler alert: the cloud is mu..."
  url="https://freecodecamp.org/news/beginners-guide-to-cloud-computing-with-aws"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729159103929/5b4c74fe-3bf5-4ac5-9739-4313d46a8dd1.png"/>

Ever wondered what people mean when they say, “It’s stored in the cloud”? If you’re imagining fluffy white clouds up in the sky storing your pictures, documents, or your Netflix favorites, then you’re in for a surprise!

Spoiler alert: the cloud is much more than that, and it’s a crucial part of what powers our digital world today. So grab a coffee (or tea), get comfy, and let’s dive into the cloudy realm of cloud computing together.

---

## So, What Exactly is the Cloud?

Simply put, the cloud is a network of remote servers around the world that store data, run applications, and power services, so you don’t have to. Think of it as renting a storage unit, except it’s online, more flexible, and can do a lot more than just store things.

Cloud computing is all about accessing these resources over the internet (instead of a physical computer or server that you have to maintain yourself).

For instance, when you upload a photo to Instagram or stream a show on Netflix, you’re accessing files that are stored in the cloud*.* Instagram and Netflix don’t store all of that data on your phone or laptop - they rely on massive, secure cloud servers to hold it all. Convenient, right?

### A Fun Metaphor

Imagine that you’re opening a bakery. You’d need a physical location, ovens, ingredients and employees. That’s a huge investment! Now, let’s say there’s a bakery service that provides all of these essentials without you having to own any of them. You just “pay as you bake.” That’s the cloud in a nutshell.

Instead of investing in and maintaining a fleet of servers (which, by the way, take up tons of space, energy, and attention), you rent what you need, use it, and leave the maintenance to the cloud provider. This approach means you can “scale” (make or serve more) without additional investments, making your life much easier and your work far more flexible.

---

## Types of Clouds

Let’s take it a step further with three types of cloud setups. Knowing these will help you understand the different flavors of cloud services:

1. **Public Cloud**: Imagine renting shared spaces in a massive online “building,” like AWS (Amazon Web Services), Microsoft Azure, or Google Cloud. Here, anyone can rent space or resources, and it’s great for flexibility and cost efficiency.
2. **Private Cloud**: Picture your own bakery setup where only your team has access. Companies set up private clouds for maximum control and privacy. Think of banks or government agencies, they often use private clouds for security reasons.
3. **Hybrid Cloud**: This one’s a mix! It’s like having a private room in a larger shared building, where you can access resources both privately and publicly, depending on your needs. This flexibility is a favorite for businesses looking for the best of both worlds.

---

## Cloud Service Models (IAAS, PAAS, SAAS)

- Cloud service models are the ways in which cloud services are delivered to users, each model offering varying levels of control, flexibility, and management. The three primary cloud service models are **IaaS (Infrastructure as a Service)**, **PaaS (Platform as a Service)**, and **SaaS (Software as a Service)**. Each serves different needs depending on the level of infrastructure, platform, or application services that an organization requires.

### On-Premises

- Imagine that you’re throwing a pizza party, and you want complete control. You buy the ingredients, make the dough, set up the toppings, and bake the pizza in your oven at home. This is on-premises (or “on-prem” for short). You’re responsible for everything, ingredients, cooking, cleaning, and managing the equipment. It’s the same in the tech world. With on-premises computing, companies manage and maintain their own servers, networks, and storage systems, usually in their own data centers.
- This traditional approach gives companies total control but also comes with the responsibility of managing everything: hardware maintenance, software updates, data backups, and security. For some companies, this is worth it for the peace of mind of keeping everything in-house. But for others, all this control can be exhausting and expensive.

### Infrastructure as a Service (IaaS)

- If on-premises is a pizza from scratch, IaaS (Infrastructure as a Service) is like renting a pizza kitchen that’s already equipped with ovens, counters, and tools. All you have to do is bring your ingredients and start cooking. In cloud terms, this means a provider like AWS rents out virtual machines, storage, and networks so you can install them on your operating systems, databases, and applications.
- **How It Works**: In an IaaS model, AWS or another provider offers the computing power, storage, and networking resources you need, but you’re still in control of what software and applications run on them. This gives you flexibility without the hassle of managing physical hardware.
- **Why Choose IaaS?**
  - **Scalability**: You can increase or decrease resources based on your needs, like adding more “ovens” when demand is high.
  - **Cost Savings**: You avoid the expense of purchasing and maintaining hardware.
  - **Flexibility**: You get the foundation, but you still control what you build on top, giving you lots of freedom to customize.

### Platform as a Service (PaaS)

- Let’s say you want to get closer to pizza bliss without worrying about managing the kitchen. With PaaS (Platform as a Service), you’re given a ready-made cooking station—fully stocked with dough, sauce, and toppings. You only have to choose your toppings and make the pizza your way.
- In tech terms, a PaaS provider manages the underlying infrastructure, including the operating system, servers, storage, and networks. All you need to do is focus on your application code and let the provider handle the rest. AWS Elastic Beanstalk, for example, allows you to deploy and manage applications without getting bogged down in server configurations.
- **Why Choose PaaS?**
  - **Speed**: You skip the setup and go straight to the cooking part, perfect for developers focusing on building and deploying applications.
  - **Managed Environment**: The provider handles the OS, updates, security patches, and scaling, so you don’t have to worry.
  - **Focus on Code**: It’s ideal if you want to focus on creating your app, not managing infrastructure.

### Software as a Service (SaaS)

- Now, if you’re in the mood for ultimate convenience, why not just order pizza delivery? With SaaS (Software as a Service), you don’t have to worry about the kitchen, the ingredients, or even baking. Instead, your pizza arrives hot and ready to eat.
- In cloud terms, SaaS is a fully managed software application hosted by the provider and accessible via the internet. Examples include applications like Gmail, Dropbox, or Microsoft 365. You simply log in and start using the service—no installation, updates, or maintenance needed.
- **Why Choose SaaS?**
  - **Convenience**: Like pizza delivery, it’s ready for immediate consumption, saving you setup and maintenance time.
  - **Accessibility**: Since it’s internet-based, you can access it from anywhere.
  - **Automatic Updates**: The provider handles updates, so you always have the latest features.

![Cloud Service Models](https://cdn.hashnode.com/res/hashnode/image/upload/v1729157009842/088adbfa-1766-4c57-8150-b6856316ba62.jpeg)

---

## What is AWS?

- Amazon Web Services, or AWS, is a cloud platform by Amazon that provides a wide range of computing resources, from storage to databases, virtual machines, and AI services. Imagine being able to rent a massive virtual data center without actually needing to buy, set up, or maintain any physical hardware. Sounds great, right? That’s the beauty of AWS. You can launch resources in minutes and pay only for what you use, making it incredibly cost-effective.

### Why Do People Love AWS?

- AWS offers a variety of services, making it an all-you-can-eat buffet of tech tools. If you’re building a new app, running a website, or storing data, AWS can handle it all. Plus, it’s reliable, secure, and scalable, which means that you can start small and grow big without having to make drastic changes.

### AWS Cloud Architecture

- Think of AWS Cloud Architecture as the framework or “blueprint” that defines how an application is built and how it interacts with different services on the AWS platform. Just like a city’s infrastructure needs roads, buildings, utilities, and a way to manage traffic, an AWS cloud architecture consists of various components that keep everything running smoothly. These components include networking, compute power, storage, databases, and security services.
- At its core, AWS Cloud Architecture is designed to help businesses create reliable, scalable, and secure applications without having to build everything from scratch. AWS offers a wide array of tools and services that fit together like puzzle pieces, making it easy to create a customized, efficient cloud environment.

### Key Components of AWS Cloud Architecture

- To really understand AWS Cloud Architecture, let’s look at some of its essential components. Each piece has a specific role, and together, they make up a solid, high-functioning cloud environment.

#### 1. Compute

Every cloud-based application needs processing power to run its code, handle user requests, and process data. This is where **compute services** come in.

- **Amazon EC2 (Elastic Compute Cloud)**: Think of EC2 as the powerhouse behind your app. EC2 instances are virtual servers that can be customized to fit your app’s needs—just like choosing between a laptop, a desktop, or a supercomputer based on your work requirements.
- **AWS Lambda**: AWS Lambda is the star of serverless computing, letting you run code without managing any servers. It’s perfect for small tasks that don’t require constant resources. For example, if you want to automatically resize photos every time they’re uploaded, Lambda can handle that with ease!

#### 2. Storage

All apps need a place to store their data—think files, user profiles, or transaction records. AWS provides several storage options to meet a wide range of needs.

- **Amazon S3 (Simple Storage Service)**: S3 is like an expandable cloud-based filing cabinet where you can store and retrieve virtually unlimited amounts of data. It’s highly secure and accessible, making it a popular choice for data storage.
- **Amazon EBS (Elastic Block Store)**: EBS works like a hard drive attached to an EC2 instance, making it ideal for applications that need high-performance storage.

#### 3. Databases

For many applications, data needs to be stored in a structured way, so AWS provides several database options to suit different data types.

- **Amazon RDS (Relational Database Service)**: RDS handles structured data like customer records or order information. You can set up databases like MySQL or PostgreSQL, and AWS takes care of maintenance and backups.
- **Amazon DynamoDB**: For high-traffic applications that need quick access to data, DynamoDB offers fast, flexible NoSQL storage that scales automatically.

#### 4. Networking

To keep everything connected and ensure data flows securely, AWS offers networking services that act as the “highways” of your cloud architecture.

- **Amazon VPC (Virtual Private Cloud)**: VPC creates a secure virtual network where you can control who accesses your resources. It’s like having your own private space in AWS’s giant data center.
- **AWS CloudFront**: CloudFront is a Content Delivery Network (CDN) that speeds up content delivery by caching it closer to users. So, if your app has users all around the world, CloudFront ensures they get the best experience possible by reducing loading times.

#### 5. Security and Identity

AWS takes security seriously, and with tools like **AWS Identity and Access Management (IAM)** and **AWS Shield**, you can manage access to resources and protect your architecture from security threats.

- **IAM (Identity and Access Management)**: IAM allows you to create and manage permissions for each user and service, so you can control who can do what. This ensures your data stays safe and only the right people have access.
- **AWS Shield**: For those worried about DDoS attacks, Shield provides protection by automatically filtering harmful traffic.

#### Putting It All Together: How AWS Cloud Architecture Works

So, how do all these pieces work together? Imagine building an online store on AWS:

1. **Compute (EC2/Lambda)**: Your store’s backend runs on EC2 instances, handling requests and processing orders. A Lambda function might handle smaller tasks, like sending confirmation emails.
2. **Storage (S3)**: Product photos and user-uploaded files are stored in S3, keeping them secure and accessible.
3. **Database (RDS)**: Customer details, order information, and product listings are stored in an RDS database, so you can easily track orders and manage inventory.
4. **Networking (VPC & CloudFront)**: VPC keeps your network secure, and CloudFront speeds up the delivery of your site to customers around the globe.
5. **Security (IAM & Shield)**: IAM controls user access, ensuring only authorized staff can access sensitive data. Shield guards against DDoS attacks, keeping your site up and running even in high-traffic situations.

### Shared Responsibility Model

- Imagine renting a house, and AWS owns the house and makes sure that the structure is safe and secure. The roof is solid, the doors lock, and the plumbing works. But when it comes to what happens *inside*—the furniture, who has keys, and how you keep it clean—that’s your job as the tenant.
- In cloud terms, AWS takes care of the infrastructure, making sure the servers are protected and that their data centers are secure. But the data you put on AWS, the applications you run, and the security settings you choose are your responsibility. It’s a team effort where AWS keeps the cloud safe, and you keep what’s in it secure.

![AWS Shared Responsibility](https://cdn.hashnode.com/res/hashnode/image/upload/v1729157534482/562b3616-5339-4ec8-8ca3-540fdc48d9a4.png)

#### Breaking Down the Shared Responsibility Model

The Shared Responsibility Model is divided into two main parts: **Security of the Cloud** (that’s AWS’s job) and **Security in the Cloud** (that’s on you).

##### 1. Security **of** the Cloud

AWS is like the security guard for the entire cloud environment. Here’s what AWS is responsible for:

- **Data Center Security**: AWS is in charge of the physical security of its data centers. They have strict access controls, security cameras, and even biometric scanning to make sure only authorized personnel can enter. No need to worry about anyone physically accessing your data!
- **Hardware and Software Maintenance**: AWS takes care of maintaining, patching, and updating the underlying hardware and software. This includes managing the physical servers, storage devices, and networking equipment that power AWS services.
- **Network Security**: AWS ensures that the networking infrastructure is protected from threats. They deploy firewalls, DDoS protection, and other measures to keep malicious actors out.

Think of AWS’s responsibility as creating and maintaining a highly secure cloud platform. This means that you can count on AWS to keep the data centers running smoothly, provide reliable servers, and handle infrastructure-level threats.

##### 2. Security in the Cloud

Now, here’s where you come in. While AWS provides a secure infrastructure, you’re in charge of what you do with it. Your responsibilities include:

- **Data Protection**: You decide how your data is encrypted and who can access it. For example, AWS provides options to encrypt your data at rest and in transit, but it’s up to you to turn on encryption and manage your encryption keys.
- **Identity and Access Management (IAM)**: AWS’s IAM service lets you control who has access to your AWS resources. It’s like having keys to different rooms in a house—some people may only need access to the kitchen, while others need access to every room. By setting roles and permissions, you decide who can do what.
- **Configuring Security Groups**: Security Groups are like firewalls for your AWS resources, controlling what can enter and leave. You decide what traffic is allowed and where it’s allowed to go. Think of it as creating security rules for your cloud environment.
- **Application Security**: If you’re running a web application on AWS, you’re responsible for securing the code and protecting against vulnerabilities, like SQL injection or cross-site scripting. AWS can’t know what’s in your code, so they leave application security in your capable hands.
- **Regular Audits and Compliance**: AWS offers tools to help with auditing, but you’re the one who needs to monitor and ensure compliance with industry standards. Regular audits can help you check that everything is running smoothly and according to your security needs.

---

## AWS Regions, Availability Zones, Edge Locations & Local Zones

If you’ve dipped your toes into AWS, you’ve probably come across words like “Regions,” “Availability Zones,” “Edge Locations,” and “Local Zones.” And let’s be honest, they can sound a bit intimidating at first. But understanding these terms is key to building a successful application on AWS. It’s like getting a map before you venture into a theme park—knowing the layout makes the whole experience smoother and more enjoyable.

So, let’s take a fun tour of the AWS “cloud park” and see how these areas fit together!

### 1. AWS Regions

Imagine AWS as a theme park with entrances all over the world. **Regions** are like the different main entrances to this massive park. Each Region is a fully equipped area of AWS infrastructure located in a specific part of the world. There are over 34 Regions globally, each providing a complete set of services and facilities.

Choosing a Region is like choosing which entrance to start your journey. If most of your customers are in Europe, you might pick a Region closer to them, like Frankfurt or London. This helps reduce latency, meaning that users experience faster load times and smoother interactions.

### 2. Availability Zones (AZs)

Once you’re inside a Region (entrance), you’ll find **Availability Zones**, or AZs, which are like the different sections of the theme park. Each AZ is a separate, independent data center close to others within the same Region but with its own unique power, cooling, and network sources. This setup provides redundancy, a critical factor for high availability and reliability.

Here’s why this is important: Imagine running an application that needs to be online 24/7. If you host it in just one AZ, and that AZ has a power issue, your app might go down. But by setting up your app across multiple AZs (say, on both “Adventure Land” and “Fantasy Land” floors), if one zone experiences a problem, the others will keep your application up and running, creating a seamless experience for users.

### 3. Edge Locations

Next, let’s move on to **Edge Locations**, which are like the pop-up stands you see throughout the park, serving everything from maps to quick snacks. Edge Locations are strategically placed “mini AWS stations” that deliver cached data close to your users, no matter where they are.

AWS’s Content Delivery Network, **Amazon CloudFront**, operates through these Edge Locations. So, if you have a video or website image that people in Japan and South Africa need to access, CloudFront delivers it from the closest Edge Location instead of the central server. This shortens load times and provides a faster, more responsive experience. Edge Locations are perfect for apps with heavy media needs, as they ensure content loads quickly and efficiently.

### 4. Local Zones

Finally, we have **Local Zones**. These are like the VIP zones within the park, giving visitors near-instant access to certain attractions. Local Zones are smaller clusters of AWS infrastructure, set up closer to specific cities to provide ultra-low latency for applications that need rapid response times.

Let’s say you’re running a gaming app, and you want players in Los Angeles to experience minimal lag. Using a Local Zone in Los Angeles gives those users immediate access to your application, keeping the experience fast and smooth. Local Zones are ideal for services that require high-speed processing in metropolitan areas like online gaming, media production, and virtual reality.

### Putting It All Together: Planning Your AWS Adventure

To design your application architecture, think about where your users are and what kind of experience you want them to have. Here’s a quick guide to help you plan:

- **Regions**: Pick a Region close to your primary user base to minimize latency. This helps provide a faster, more responsive experience for users.
- **Availability Zones (AZs)**: Use multiple AZs within a Region to build a resilient, high-availability application. This way, if one zone goes down, others will keep your app running.
- **Edge Locations**: For content-heavy applications, like streaming services or e-commerce sites, use CloudFront’s Edge Locations to cache and deliver content quickly, no matter where users are.
- **Local Zones**: For applications needing ultra-low latency in specific cities, Local Zones bring AWS infrastructure closer to users, creating a near-instant experience for high-demand applications.

You can find latest numbers about regions, AZs, edge locations and local zones [<VPIcon icon="fa-brands fa-aws"/>here](https://aws.amazon.com/about-aws/global-infrastructure/?p=ngi&loc=1)

### Latency

- In simplest terms, latency is the delay between a user’s action and a web application’s response to that action. Imagine it like a digital echo—say something, and there’s a tiny pause before you hear it back. Latency is measured in milliseconds (ms), and the lower the latency, the faster your connection feels.
- **Example:** Let’s say you’re browsing a website from your home in New York, but the server hosting the website is located in Sydney. Your request has to travel all the way to Sydney, and the server’s response has to travel all the way back to you. Even though data travels fast (really fast!), the distance still creates a delay. And that delay? That’s latency.

#### Why Does Latency Matter?

- A little bit of latency might not seem like a big deal, but when it adds up, it can make for a frustrating user experience. Have you ever tried to play a multiplayer video game only to get that dreaded “lag” just as you’re about to win? Or maybe you’ve waited an extra couple of seconds for a video to load? High latency is often the culprit here.
- **Low Latency = Fast, Responsive Experience**
- **High Latency = Delays and Frustration**
- When latency is high, every interaction with an app feels delayed, which can drive users away. This is why companies like AWS invest in minimizing latency by building infrastructure close to users worldwide.

#### AWS and Latency: How Does AWS Minimize Latency?

- AWS takes latency seriously, and its infrastructure is designed to keep latency as low as possible for users worldwide. Here’s how AWS tackles latency head-on:

- **Regions and Availability Zones (AZs)**: AWS has data centers called Regions and AZs spread across the globe. By choosing a Region close to your primary user base, you can reduce latency by minimizing the distance data has to travel.
- **Edge Locations and Amazon CloudFront**: AWS has Edge Locations worldwide that work with Amazon CloudFront, its Content Delivery Network (CDN). Think of Edge Locations as data hotspots in popular areas—by caching content in these locations, AWS makes sure users get the fastest load times possible, no matter where they’re located.
- **Local Zones**: For applications that need ultra-low latency in specific cities, AWS Local Zones bring infrastructure closer to metropolitan areas, providing lightning-fast access for applications that can’t afford any lag.

#### A Latency Analogy: Ordering Pizza

Let’s break it down with a pizza analogy. Imagine ordering a pizza from a restaurant:

- **Low Latency**: The pizza place is just a few blocks away, so you get your pizza piping hot in no time.
- **High Latency**: Now imagine the pizza place is on the other side of town. Your pizza arrives late and lukewarm because of the long journey. That’s high latency!

In AWS terms, having a Region or Edge Location close to users is like ordering pizza from a nearby shop instead of one across town. The shorter the distance, the less time you spend waiting for your “pizza” (or, in this case, your data) to arrive.

### Ways to Access AWS Services

When you’re diving into AWS, you’ll quickly realize that there’s a lot going on behind the scenes. But getting into AWS and accessing its suite of cloud services isn’t complicated—it’s actually quite user-friendly. AWS provides several ways for you to interact with its services, whether you prefer clicking buttons, typing commands, or even writing code. It’s like a big virtual house with multiple front doors—choose the one that suits you best!

#### 1. AWS Management Console: The Point-and-Click Option

If you’re a visual person, the AWS Management Console is going to feel like home. The console is a web-based interface that lets you manage your AWS resources through a series of friendly, clickable dashboards. Imagine it as the AWS “control room,” where you can launch and manage services with just a few clicks.

The AWS Console is ideal for beginners and those who want a clear, intuitive way to explore services. It’s also perfect for anyone setting up infrastructure without needing deep technical knowledge—no command-line skills required!

::: tabs

@tab:active What you can do with the AWS Console

- Launch and manage EC2 instances (virtual servers)
- Set up S3 storage buckets
- Configure IAM (Identity and Access Management) roles for security
- Access billing and cost management tools to keep an eye on your budget

@tab Best for

Visual learners, beginners, and anyone who prefers a simple, no-code approach to managing AWS.

:::

#### 2. AWS Command Line Interface (CLI): For the Command Lovers

If you’re comfortable with typing commands, the AWS CLI is your best friend. The AWS CLI is a command-line tool that lets you manage AWS services through typed commands in your terminal or command prompt. It’s a powerful option for those who prefer speed and efficiency or want to automate tasks without relying on a graphical interface.

With the CLI, you can script entire workflows, automate processes, and manage resources from any device with a terminal. Plus, it’s often faster to type a single command than to click through multiple pages in the console!

::: tabs

@tab:active Example command

```sh
aws ec2 describe-instances
```

This command lists all your running EC2 instances. With a few lines of code, you can check your resources, scale services up or down, and even handle complex configurations without ever opening a browser.

@tab Best for

Power users, developers, sysadmins, and anyone who loves efficiency and automation.

:::

#### 3. AWS SDKs: For the Coders and Developers

If you’re a developer who wants to integrate AWS services directly into your code, AWS SDKs (Software Development Kits) are here to help. AWS provides SDKs for multiple programming languages, like Python, JavaScript, Java, and Ruby, allowing you to interact with AWS from within your applications.

The SDKs are like AWS “plug-ins” that you add to your code, allowing you to access services, automate processes, and build applications that directly communicate with AWS resources. For example, with the AWS SDK for Python (Boto3), you can write code to upload files to S3, run queries on DynamoDB, or trigger Lambda functions.

::: tabs

@tab:active Example with Boto3 in Python

```py
import boto3

s3 = boto3.client('s3')
s3.upload_file('file.txt', 'mybucket', 'file.txt')
```

In just a few lines, this code uploads a file to an S3 bucket. Pretty cool, right?

@tab Best for

Developers who want to integrate AWS functionality directly into their applications.

:::

#### 4. AWS CloudFormation: The Blueprint Builder

If you’re interested in automating infrastructure setup and configuration, AWS CloudFormation is your go-to tool. CloudFormation allows you to create a “blueprint” (a JSON or YAML file) that defines the AWS resources and configurations you want. AWS then uses this blueprint to set everything up for you, saving you the time and effort of doing it manually.

With CloudFormation, you can create and manage “stacks” of resources—think EC2 instances, S3 buckets, databases, and more—by writing a single template. This setup is ideal for deploying applications in a consistent and repeatable way.

::: tabs

@tab Example CloudFormation snippet

```yaml
Resources:
  MyBucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      BucketName: 'my-example-bucket'
```

This simple code creates an S3 bucket named “my-example-bucket.” Once you’ve set up a template, you can deploy it again and again, making it easy to replicate infrastructure across different environments.

@tab Best for

DevOps engineers, architects, and teams who need an automated, repeatable infrastructure setup.

:::

#### 5. AWS APIs: Direct Access for Ultimate Flexibility

If you’re looking for full control and direct access to AWS services, AWS APIs are the way to go. AWS provides APIs for almost every service, which means that you can interact with AWS directly by making HTTP requests, without needing to rely on the AWS Console, CLI, or SDKs.

APIs allow developers to call AWS services programmatically—sending requests, retrieving responses, and performing operations from within any environment that can make HTTP requests. They’re perfect for building customized solutions, automating workflows, and integrating AWS services into existing systems or third-party applications.

**Example AWS API Call**: Using an HTTP request, you can retrieve information about an S3 bucket or initiate a Lambda function. Here’s a quick example of what an API request might look like to list objects in an S3 bucket:

```plaintext
GET /mybucket?list-type=2 HTTP/1.1
Host: s3.amazonaws.com
Authorization: AWS4-HMAC-SHA256 ...
```

With the right permissions and authentication, this API call allows you to fetch data about the objects in an S3 bucket directly.

#### Benefits of Using AWS APIs

- **Direct Integration**: APIs allow you to access AWS services from any system, language, or platform that supports HTTP requests.
- **Lightweight and Flexible**: Since APIs don’t require SDKs or extra tools, they’re an efficient, minimalistic option.
- **Ideal for Automation**: APIs are great for creating custom workflows and automating interactions with AWS services, especially for DevOps teams or developers managing complex systems.

**Best for:** Advanced developers, system integrators, and teams needing custom or platform-independent ways to interact with AWS.

#### Comparison Table

Here’s an updated table including AWS APIs for easier reference:

| **Access Method** | Best For | Skill Level |
| --- | --- | --- |
| **AWS Console** | Visual learners, beginners | Beginner to intermediate |
| **AWS CLI** | Power users, sysadmins, automation enthusiasts | Intermediate to advanced |
| **AWS SDKs** | Developers integrating AWS in code | Intermediate to advanced |
| **AWS CloudFormation** | DevOps, automated deployments | Advanced |
| **AWS APIs** | Custom integrations, lightweight automation | Advanced |

---

## AWS Calculator

The AWS Pricing [<VPIcon icon="fas fa-globe"/>Calculator](https://calculator.aws/#/addService) isn’t just a budgeting tool, it’s your cloud co-pilot, helping you explore the potential of AWS without the financial surprises. Whether you’re experimenting with a single EC2 instance or planning a multi-service, enterprise-scale setup, this calculator can break down costs, project your savings, and give you peace of mind with a well-rounded view of your expenses.

So, next time you're thinking, "What will this cloud project really cost?", take the AWS Calculator for a spin. You might just discover a way to achieve big things in the cloud without stretching your budget!

---

## Wrap Up

And there you have it, a tour through the world of AWS and what it can mean for you or your projects. Whether you’re just dipping your toes into cloud waters or strategizing a multi-cloud empire, AWS offers tools and flexibility to support your journey.

So, go on, take what you've learned here, explore, experiment, and, most importantly, have fun with it! Until next time, happy cloud computing! ☁️

You can follow me on:

- [X (<VPIcon icon="fa-brands fa-x-twitter"/>`Kedar__98`)](https://x.com/Kedar__98)
- [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`kedar-makode-9833321ab`)](https://linkedin.com/in/kedar-makode-9833321ab/?originalSubdomain=in)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Cloud Computing? Beginner's Guide to Cloud Computing with AWS",
  "desc": "Ever wondered what people mean when they say, “It’s stored in the cloud”? If you’re imagining fluffy white clouds up in the sky storing your pictures, documents, or your Netflix favorites, then you’re in for a surprise! Spoiler alert: the cloud is mu...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/beginners-guide-to-cloud-computing-with-aws.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
