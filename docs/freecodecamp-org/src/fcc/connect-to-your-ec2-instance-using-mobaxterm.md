---
lang: en-US
title: "How to Connect to Your EC2 Instance Using MobaXterm with SSH and a Keypair (.pem) File"
description: "Article(s) > How to Connect to Your EC2 Instance Using MobaXterm with SSH and a Keypair (.pem) File"
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
      content: "Article(s) > How to Connect to Your EC2 Instance Using MobaXterm with SSH and a Keypair (.pem) File"
    - property: og:description
      content: "How to Connect to Your EC2 Instance Using MobaXterm with SSH and a Keypair (.pem) File"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/connect-to-your-ec2-instance-using-mobaxterm.html
prev: /devops/aws/articles/README.md
date: 2024-10-22
isOriginal: false
author: Kedar Makode
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729574902773/f80eb07d-524a-4fa2-a8d8-29c6438d37aa.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWs > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Connect to Your EC2 Instance Using MobaXterm with SSH and a Keypair (.pem) File"
  desc="In this article, I’ll walk you through the steps of connecting to your EC2 instance using MobaXterm with a .pem keypair file. Whether you're a beginner dipping your toes into the cloud or an experienced user looking for a quicker method, I’ve got you..."
  url="https://freecodecamp.org/news/connect-to-your-ec2-instance-using-mobaxterm"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729574902773/f80eb07d-524a-4fa2-a8d8-29c6438d37aa.png"/>

In this article, I’ll walk you through the steps of connecting to your EC2 instance using MobaXterm with a <VPIcon icon="fas fa-key"/>`.pem` keypair file. Whether you're a beginner dipping your toes into the cloud or an experienced user looking for a quicker method, I’ve got you covered. So, let’s dive in!

---

## Why MobaXterm?

You may be wondering why we’re using MobaXterm over other SSH tools. Well, for starters, it’s super beginner-friendly, and it combines a bunch of powerful tools in one. You can use it to transfer files, run scripts, or even open multiple sessions simultaneously.

Plus, it’s like the Swiss Army knife for remote connections. Whether you’re working with AWS, Google Cloud, or even a Raspberry Pi at home, MobaXterm can do it all.

---

## Step 1: Install MobaXterm

If you’re not already familiar with MobaXterm, it’s basically used for all things remote access. You can download it [<VPIcon icon="fas fa-globe"/>here](https://mobaxterm.mobatek.net/download-home-edition.html) for free. Installation is super easy - just download, click, and install.

<SiteInfo
  name="MobaXterm free Xserver and tabbed SSH client for Windows"
  desc="The ultimate toolbox for remote computing - includes X server, enhanced SSH client and much more!"
  url="https://mobaxterm.mobatek.net/"
  logo="https://mobaxterm.mobatek.net/favicon.ico"
  preview="https://mobaxterm.mobatek.net/screenshot.png"/>

Once you have it set up, fire up MobaXterm and get ready for the fun part.

---

## Step 2: Get Your EC2 Instance Public IP and Key Pair

Before we continue, there are two key pieces of information you’ll need:

**Public IP Address**: This is the unique address AWS assigns to your EC2 instance. To find it, go to the **EC2 Dashboard** in AWS, select your running instance, and grab the **Public IPv4 Address** (it looks like `13.123.45.67`).

**Your .pem File**: This is the private key file you downloaded when you created your EC2 instance. If you didn’t save it, you may have to create a new key pair because AWS only lets you download it once. (No pressure - just don’t lose it this time!)

---

## Step 3: Open MobaXterm and Start a New SSH Session

Time to work some magic with MobaXterm! Open the app, and you’ll see an intuitive interface. Don’t let all the buttons scare you, just focus on the top left where it says **Session**.

![MobaXterm user interface](https://cdn.hashnode.com/res/hashnode/image/upload/v1729567478544/cf69a56b-9d1e-4de3-b6d8-224634b55ae3.png)

Here’s what to do next:

- Click **Session** (you’ll feel powerful just pressing that button).
- In the new window, select **SSH** as the session type.

![MobaXterm Session setting tab](https://cdn.hashnode.com/res/hashnode/image/upload/v1729567593446/ee8f369d-24be-419d-971f-30e3e4355dd6.png)

---

## Step 4: Enter SSH Session Details

It’s time to fill in the details that’ll connect MobaXterm to your EC2 instance. Here’s what you need to know:

- **Remote Host**: Enter the **Public IP Address** of your EC2 instance here. Remember, you grabbed that from the EC2 Dashboard earlier.
- **Username**: If you’re using Amazon Linux, your default username is <VPIcon icon="fa-brands fa-amazon"/>`ec2-user`. If you’re on Ubuntu, it’s <VPIcon icon="fa-brands fa-ubuntu"/>`ubuntu`.

---

## Step 5: Attach Your .pem Key Pair

MobaXterm makes it super easy to use your <VPIcon icon="fas fa-key"/>`.pem` key file for authentication (no converting to <VPIcon icon="fas fa-key"/>`.ppk` necessary, like you’d have to with other tools).

Here’s how to attach your <VPIcon icon="fas fa-key"/>`.pem` file:

- Head over to the **Advanced SSH Settings** tab.
- Check the **Use private key** option.
- Click **Browse** and find your <VPIcon icon="fas fa-key"/>`.pem` file on your computer.
- Select the file and hit **OK**.

It’s like giving MobaXterm the secret key to unlock your EC2 instance.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1729567798203/535c226e-fbd2-43fc-b1af-a48ce171b974.png)

---

## Step 6: Connect to Your EC2 Instance

Now that you’ve filled in all the details, click **OK** to start your session. If everything’s been set up correctly, you should see a terminal pop up, and MobaXterm will work its magic to connect you to your EC2 instance.

🎉 And just like that, you’re in! You should see a terminal window connected to your instance, and now you can start typing commands like a pro.

---

## Step 7: Troubleshooting Common Issues

We all know that tech doesn’t always behave. Here are some common problems you might run into—and how to solve them:

- **Connection Timed Out**: This could be due to your instance’s security group settings. Make sure your EC2 security group allows inbound traffic on **port 22** (the SSH port) from your IP address.
- **Authentication Failed**: Ensure you’re using the correct username (<VPIcon icon="fa-brands fa-amazon"/>`ec2-user` for Amazon Linux, <VPIcon icon="fa-brands fa-ubuntu"/>`ubuntu` for Ubuntu).

---

## Wrapping Up

And there you have it! Connecting to your EC2 instance using MobaXterm with your <VPIcon icon="fas fa-key"/>`.pem` keypair is as simple as following these steps. It’s not rocket science—but it kind of feels like it, doesn’t it? Now that you’ve got your EC2 instance up and running, the sky’s the limit.

So, go on, take what you've learned here, explore, experiment, and, most importantly, have fun with it! Until next time, happy cloud computing! ☁️

You can follow me on

- [X (<VPIcon icon="fa-brands fa-x-twitter"/>`Kedar__98`)](https://twitter.com/Kedar__98)
- [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`kedar-makode-9833321ab`)](https://linkedin.com/in/kedar-makode-9833321ab/?originalSubdomain=in)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Connect to Your EC2 Instance Using MobaXterm with SSH and a Keypair (.pem) File",
  "desc": "In this article, I’ll walk you through the steps of connecting to your EC2 instance using MobaXterm with a .pem keypair file. Whether you're a beginner dipping your toes into the cloud or an experienced user looking for a quicker method, I’ve got you...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/connect-to-your-ec2-instance-using-mobaxterm.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
