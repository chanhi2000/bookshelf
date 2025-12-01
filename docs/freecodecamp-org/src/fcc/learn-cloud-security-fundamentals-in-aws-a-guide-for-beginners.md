---
lang: en-US
title: "Learn Cloud Security Fundamentals in AWS – A Guide for Beginners"
description: "Article(s) > Learn Cloud Security Fundamentals in AWS – A Guide for Beginners"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn Cloud Security Fundamentals in AWS – A Guide for Beginners"
    - property: og:description
      content: "Learn Cloud Security Fundamentals in AWS – A Guide for Beginners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-cloud-security-fundamentals-in-aws-a-guide-for-beginners.html
prev: /devops/aws/articles/README.md
date: 2025-12-09
isOriginal: false
author:
  - name: Ijeoma Igboagu
    url : https://freecodecamp.org/news/author/Ijay/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764958826138/12b261c3-9a38-4b0b-b67a-48ce54452d5f.png
---

# {{ $frontmatter.title }} 관련

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
  name="Learn Cloud Security Fundamentals in AWS – A Guide for Beginners"
  desc="Security is a vital part of every system and infrastructure. The word ”security” comes from the Latin securitas, which is composed of se- (meaning “without”) and cura (meaning “care” or “worry”). Originally, it meant ”without worry.” Over time, it ha..."
  url="https://freecodecamp.org/news/learn-cloud-security-fundamentals-in-aws-a-guide-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764958826138/12b261c3-9a38-4b0b-b67a-48ce54452d5f.png"/>

Security is a vital part of every system and infrastructure. The word "security" comes from the Latin *securitas*, which is composed of *se-* (meaning “without”) and *cura* (meaning “care” or “worry”). Originally, it meant "without worry." Over time, it has come to signify being safe or protected.

Today, when we discuss security, we usually refer to protection from harm, danger, or threats, whether in our homes, online, while using online banking, or even across an entire country. Security is important in everything we do.

Cloud providers, such as AWS, are no exception. Their infrastructure must be safeguarded to ensure users’ peace of mind. But on platforms like AWS, security is a **shared responsibility**. This means that both the provider and the user play a role in maintaining security.

Amazon Web Services (AWS) is one of the most popular cloud service providers worldwide. With great power and flexibility comes the responsibility to secure your infrastructure, data, and applications in the cloud.

In this tutorial, we’ll explore the fundamental aspects of cloud security in AWS – especially those that are your responsibility – making it easy to understand if you’re new to cloud computing.

---

## What is Cloud Security?

Cloud security is the set of rules, tools, and practices used to protect your data, apps, and services stored online (in the "cloud"). It helps prevent data loss, hacking, and misuse of information.

Think of cloud security like locking the doors of your house. You wouldn’t leave your doors open for anyone to enter. And in the same way, your cloud account must be secured so that your data remains safe.

If your cloud services aren't secure, hackers could steal your data or cause major damage. Whether you're a business or just someone using cloud apps, keeping your information safe is essential.

---

## Why is Cloud Security Important?

Cloud security matters because it ensures that only the right people have access to your information. It protects your data from being lost, stolen, or misused. With good security in place, your applications can run safely without being exposed to attacks.

It also helps you keep your personal or business data private. When your cloud environment is well-protected, the risk of data breaches and financial loss is greatly reduced.

Now that you understand why cloud security is important, let’s look at how AWS helps you stay secure and what your own role is in keeping things safe.

---

## Key Cloud Security Concepts

In AWS, cloud security is the responsibility of both AWS **and** the customer. This model is called the Shared Responsibility Model.

But before learning how AWS divides security duties, you need to understand that while AWS protects its infrastructure, you must protect your own account.

Let’s discuss some key security concepts that are your responsibility, so you know how to do your part in the shared responsibility model.

### What is a Root User?

When you create an AWS account, the first identity that’s created is the **Root** user Account. This account has full, unrestricted control. It can delete resources, change ownership, and even close your entire AWS account. Because of this, it’s risky to use it for everyday tasks.

AWS recommends using root only for a few important account-level actions.

Certain tasks require a root user account, so you will need to use it occasionally. Such tasks include:

- Updating billing and payment information
- Closing your AWS account
- Changing the root account email
- Recovering or resetting MFA for the root user

Apart from these few tasks, avoid using the root user Account completely. Your everyday work should be done through IAM users, not the root account.

### How to Create an IAM User for Daily Tasks

Before you start creating any infrastructure in your AWS account, you need an IAM user with the right permissions.

Here’s how to create an IAM user, step by step:

- Open the AWS console.
- Search for **IAM**, then select it. This takes you to the **IAM page**.
- On the left-hand side, you will see **Users**.
- Click on it. This takes you to the **Create user** page.
- Click the **Create user** button. It takes you to the “specify user details page” where you will create an **IAM user.**
- Enter a username (for example, `adminuser`).
- Click on “Provide user access to the AWS Management Console”.

![providing a user access to the AWS console](https://cdn.hashnode.com/res/hashnode/image/upload/v1764236205525/47c2da54-537f-4242-9048-ced4b7ca6172.png)

4. Scroll down and click on “Set a password,” or let AWS generate one for you.
5. Click **Next** to go to the permissions page.
6. Select **Attach existing policies directly**.
7. Choose `AdministratorAccess`. This permission gives the IAM user full access to perform all administrative tasks in your account.
8. Click **Create user**.

Once you’ve created this user, sign in with it and use it for your day-to-day tasks. The root user should stay locked down and only be used for rare account-level changes.

#### Video Walkthrough of How to Create an IAM User:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1764235482269/bf5b1f00-13b2-4ff5-b1e4-e6b2fd2796cb.gif)

### Key Differences Between the Root User and an IAM User

Just to be clear, let’s summarise the differences between these two accounts:

#### Root Account

This is the very first account created when you set up AWS. It has unlimited power – literally, everything in the account can be changed, deleted, or closed.

It’s meant for rare, high-level tasks like billing changes, MFA resets, or closing the account. Because it’s so powerful, you shouldn’t use it for daily work.

#### IAM User Account

This is a user you create inside your AWS account for everyday tasks. You can assign specific permissions, like admin or limited access, to this user. It’s much safer because you can control what it can and cannot do.

If something goes wrong or the credentials are compromised, the blast radius is much smaller than for the root user.

In short, the Root is the master key too powerful for daily use. IAM users are customizable and safer for your regular work.

Here’s a helpful visual to show the differences between the two as well:

![differences between the two account](https://cdn.hashnode.com/res/hashnode/image/upload/v1764248147852/7e053766-f6ba-4a17-9b63-c20695f2933c.jpeg)

Now that you have both your root user and IAM user set up properly, let’s go back to the concept of multi-factor authentication, or MFA.

### What is MFA?

MFA adds another layer of security when you sign in. It combines something you know, like your password, with something you have, such as a phone or security device. Even if someone gets your password, they can’t log in without your MFA code.

You can enable MFA in several ways:

- Using a virtual MFA app like Google Authenticator or Authy
- Using a physical security key such as a YubiKey
- Using a hardware device from Gemalto
- For AWS GovCloud users, using an MFA device from SurePassID

Enabling MFA makes sure that even if someone gets your password, they still can’t access your account without the second authentication step.

For this tutorial, we’ll use the **Google Authenticator app**, which you can download for free from the Play Store.

**How do I turn this on for my account?**

- Go to your AWS account.
- At the top right corner, you’ll see a menu with your account username or ID. Click on it to open the drop-down.
- You’ll see **Security Credentials**. Click on it. This will take you to the IAM-Security Credentials page.

![security credentials](https://cdn.hashnode.com/res/hashnode/image/upload/v1764342765366/76b8ef01-9be2-4d93-918e-aaadf9e771ed.png)

- At the top of the page, you’ll see a button labelled **Assign MFA device**. Click on it.
- You’ll be redirected to a new page where you can choose the type of MFA device you want to use. Scroll down and select **Virtual MFA device** (this is what the Google Authenticator app uses).

![MFA page selection](https://cdn.hashnode.com/res/hashnode/image/upload/v1764342668287/5867caaf-af5d-4dfe-b026-68a16dfa1ad1.png)

Then just follow the on-screen instructions:

- Open the **Google Authenticator** app on your phone.
- Tap the **+** button and scan the QR code displayed on the AWS screen.
- Enter the two codes generated by the app to verify your device.

Once verified, AWS will link the MFA device to your account and take you back to the Security credentials page. If you scroll down, you’ll see your MFA device listed as **assigned**.

The next time you log in to AWS, you’ll be prompted to enter your MFA code from the Google Authenticator app before you can access your console.

![MFA verification at login](https://cdn.hashnode.com/res/hashnode/image/upload/v1764345845580/2eec5886-7ce7-43e0-8612-1035655a0619.gif)

Always enable MFA for both your root user account and your IAM user account, as it’s one of the simplest and most effective ways to protect your AWS account.

Now that you understand these security fundamentals, we can get back to the shared responsibility model.

---

## Understanding the AWS Shared Responsibility Model

The AWS Shared Responsibility Model divides responsibilities between AWS and the customer.

### 1. AWS’s Responsibility (Security of the Cloud)

AWS is responsible for protecting the infrastructure that runs the services offered in the AWS Cloud. This includes physical security, hardware, software, networking, and facilities.

### 2. Customer’s Responsibility (Security in the Cloud)

The customer is responsible for securing the data, user accounts, applications, and configurations they store in the cloud.

![[<VPIcon icon="fa-brands fa-aws"/>AWS shared responsibility model](https://aws.amazon.com/compliance/shared-responsibility-model/)](https://cdn.hashnode.com/res/hashnode/image/upload/v1746970123152/016f8eef-fa2c-4bcb-866b-323fe7585b9d.png)

For example, AWS is responsible for securing its data centres and servers. But customers also have a role to play by properly configuring their accounts and resources.

Let’s take two popular AWS services, **RDS (Relational Database Service)** and **S3 (Simple Storage Service)**, as examples.

### RDS (Relational Database Service)

#### AWS responsibilities

- Automates database patching
- Audits and maintains the underlying instance and storage disks
- Applies operating system patches automatically

#### Customer responsibilities (you)

- Manage in-database users, roles, and permissions
- Choose whether your database is public or private
- Review and control inbound rules, ports, and IP addresses in the database’s security group
- Configure database encryption settings

### S3 (Simple Storage Service)

#### AWS responsibilities

- Ensures encryption options are available for your data
- Guarantees virtually unlimited storage capacity
- Prevents AWS employees and the public from accessing your data
- Keeps each customer’s data separated from others

#### Customer responsibilities (you)

- Define your S3 bucket policies according to your security standards
- Review bucket configuration settings
- Create and manage IAM users and roles with the right permissions

Now you understand who’s responsible for what.

---

## How to Give a User Permission

Security in the cloud isn’t just about strong passwords or enabling MFA – it’s also about controlling *who* can access *what*. One of the most important principles in AWS security is to grant users only the access they actually need, nothing more. That’s how you keep your environment safe and your resources protected.

So here’s a key question: how do we know to whom to allow or deny access in the cloud?

### Demonstration

Let’s walk through a simple, real-life example together.

Imagine you have a developer on your team who needs access to an S3 bucket named `demo-test-app-ij`. The goal is to let them upload and view files in the bucket, but not delete anything.

We already created a user earlier in this guide, so we’ll use that same one here.

To get started, go to **IAM** from your AWS Management Console. Then click on **Users** from the left-hand menu.

Select the user we created earlier. If you don’t have one yet, go back and follow the steps I showed you before to create a new IAM user.

Once you click on the user’s name, you’ll be taken to the **Permissions** page. On the permissions page, click on **Add permissions**.

From the dropdown options, select **Create inline policy**. This will open the **Specify permissions** page, where you’ll define the user’s access.

Scroll down through the list of services and select **S3**. In our example, we’re using S3 because we want to control access to a specific bucket.

![An example showing the permission page](https://cdn.hashnode.com/res/hashnode/image/upload/v1764317236877/10517fde-3bbd-4af3-9e16-289793894903.png)

Once you select the service you want to define permissions for, the **Actions** and **Resources** sections will appear automatically.

In the Actions section, you’ll see a list of what the user can do with the service. Here, you can toggle the effect button to either “Allow” or “Deny.”

Under Actions, scroll through the list and find `DeleteObject`. Set this action to Deny: `DeleteObject`. This ensures the user won’t be able to delete any files from the bucket.

Next, move on to the Resources section. Here, you’ll specify which bucket these permissions apply to.

Add the following bucket ARN: `arn:aws:s3:::demo-test-app-ij/*`. This means the rule applies to everything inside the **demo-test-app-ij** bucket.

Once you’ve added the ARN and confirmed the settings, click **Save policy**.

Now, let’s put all these instructions together in a practical example:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1764335991549/1d33af0a-23c8-4790-aab4-b629db4b7ba9.gif)

### Testing the Policy

Now it’s time to confirm that our permissions work the way we expect.

Head over to the **S3** service and open the bucket named `demo-test-app-ij`. Try uploading a file; it should upload successfully. Next, try deleting that same file. You’ll see an error message saying **Failed to delete objects**.

That’s exactly what we want! The user can upload and view files, but can’t delete them, because we never permitted them to do so.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1764336439667/279c1f4b-7d5b-477a-b782-cf1378204430.gif)

---

## Conclusion

Security has always been about peace of mind. Whether it’s your home, your phone, or your cloud account, you’ll want to know your data is safe.

AWS gives you a strong foundation by securing the cloud itself. But your part matters too: things like enabling MFA, using strong passwords, and managing who can access what. These simple habits go a long way in keeping your data protected.

Cloud security isn’t a one-time setup. It’s an ongoing practice. When both AWS and its users stay alert, the cloud becomes a place you can trust to store, build, and grow with confidence.

Now that you have a basic understanding of how security works in AWS, you’re ready to go deeper and start exploring the services that keep it all running smoothly.

### Further Reading

- [**What is Cloud Computing? A Guide for Beginners**](/freecodecamp.org/cloud-computing-guide-for-beginners.md)

```component VPCard
{
  "title": "How to Deploy a Kubernetes App on AWS EKS",
  "desc": "AWS makes it much easier to deploy containerized applications, and running Kubernetes in the cloud is a powerful way to scale and manage these applications. Among the many managed Kubernetes services AWS offers, Amazon EKS (Elastic Kubernetes Service...",
  "link": "/fcc/how-to-deploy-a-kubernetes-app-on-aws-eks.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "The Best AWS Services to Deploy Front-End Applications in 2025",
  "desc": "As front-end development evolves, finding the right deployment service is more important than ever. Amazon Web Services (AWS), a cloud-based service, offers a number of helpful tools and platforms for hosting modern front-end applications. Although i...",
  "link": "/fcc/best-aws-services-for-frontend-deployment.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "What is Backend as a Service (BaaS)? A Beginner's Guide",
  "desc": "Building an authentication system can be complex, often requiring a server to store user data. Sometimes, you need a faster, easier solution. For those new to development or without technical expertise, managing servers, databases, and user logins ca...",
  "link": "/fcc/backend-as-a-service-beginners-guide.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

<SiteInfo
  name="The Hidden Challenges of Building with AWS"
  desc="Introduction: AWS Isn’t as Easy as It Looks   AWS is one of the top cloud platforms in the..."
  url="https://dev.to/ijay/the-hidden-challenges-of-building-with-aws-8mg/"
  logo="https://media2.dev.to/dynamic/image/width=128,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png"
  preview="https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fyv1ajvxiwhl8pbbrosv6.jpg"/>

If you found this article helpful, feel free to share it. And if you prefer learning through videos, I also explain cloud topics in simple terms on my [YouTube channel (<VPIcon icon="fa-brands fa-youtube"/>`cloudinreallife`)](https://youtube.com/@cloudinreallife).

Stay updated with my projects by following me on [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`ijaydimples`)](https://twitter.com/ijaydimples), [LinkedIn (<VPIcon icon="fa-brands fa-x-twitter"/>`ijeoma-igboagu`)](https://linkedin.com/in/ijeoma-igboagu/) and [GitHub (<VPIcon icon="iconfont icon-github"/>`ijayhub`)](https://github.com/ijayhub).

Thank you for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Cloud Security Fundamentals in AWS – A Guide for Beginners",
  "desc": "Security is a vital part of every system and infrastructure. The word ”security” comes from the Latin securitas, which is composed of se- (meaning “without”) and cura (meaning “care” or “worry”). Originally, it meant ”without worry.” Over time, it ha...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-cloud-security-fundamentals-in-aws-a-guide-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
