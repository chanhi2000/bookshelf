---
lang: en-US
title: "How to Connect Your AWS EC2 Instance to VS Code"
description: "Article(s) > How to Connect Your AWS EC2 Instance to VS Code"
icon: iconfont icon-vscode
category:
  - VSCode
  - DevOps
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - vscode
  - visualstudiocode
  - productivity
  - devops
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Connect Your AWS EC2 Instance to VS Code"
    - property: og:description
      content: "How to Connect Your AWS EC2 Instance to VS Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-connect-your-aws-ec2-instance-to-vs-code.html
prev: /tool/vscode/articles/README.md
date: 2025-03-26
isOriginal: false
author:
  - name: Ijeoma Igboagu
    url : https://freecodecamp.org/news/author/Ijay/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742397603245/c1ca0496-dbab-4570-8b6b-cb4bac5f72c1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "VSCode > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/vscode/articles/README.md",
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
  "background": "hsla(0, 0.00%, 3.90%, 0.20)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Connect Your AWS EC2 Instance to VS Code"
  desc="As a DevOps engineer, it is crucial to master at least one cloud provider. Cloud services simplify storage, data migration, and CI/CD workflows and help make these tasks easier and more efficient. If you need a basic introduction to cloud computing, ..."
  url="https://freecodecamp.org/news/how-to-connect-your-aws-ec2-instance-to-vs-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742397603245/c1ca0496-dbab-4570-8b6b-cb4bac5f72c1.png"/>

As a DevOps engineer, it is crucial to master at least one cloud provider. Cloud services simplify storage, data migration, and CI/CD workflows and help make these tasks easier and more efficient.

If you need a basic introduction to cloud computing, here’s a beginner-friendly tutorial for you: [**What is Cloud Computing? A Guide for Beginners.**](/freecodecamp.org/cloud-computing-guide-for-beginners.md)

In this guide, I’ll show you how to create an AWS EC2 instance. This is one of AWS’s top services for building applications. By the end of this guide, you'll know how to launch an AWS EC2 instance and connect it to VS Code.

::: note Prerequisites

Before you start, make sure you have:

- An AWS account. If you do not have one, [<FontIcon icon="fa-brands fa-aws"/>sign up here](https://aws.amazon.com/free/?gclid=Cj0KCQiAvvO7BhC-ARIsAGFyToVguvjmSCa99VkB7XsHepginSELSYCCYnVzZXeZSKFpRRTC8DKyh98aAkZkEALw_wcB&trk=2d3e6bee-b4a1-42e0-8600-6f2bb4fcb10c&sc_channel=ps&ef_id=Cj0KCQiAvvO7BhC-ARIsAGFyToVguvjmSCa99VkB7XsHepginSELSYCCYnVzZXeZSKFpRRTC8DKyh98aAkZkEALw_wcB:G:s&s_kwcid=AL!4422!3!645125273261!e!!g!!aws!19574556887!145779846712&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all).
- A GitHub repository with your source code. If you don’t have a GitHub account, [<FontIcon icon="iconfont icon-github"/>sign up here](https://github.com/).
- Basic knowledge of web development and version control.
- A code editor. For this tutorial, I’m using VS Code.

:::

Let’s jump right in!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1735997217784/fdb3b399-7a07-4cf2-8577-10859bf5542d.gif)

---

## What is an AWS EC2 Instance?

AWS EC2 (Elastic Compute Cloud) allows you to run virtual machines in the cloud. These computers allow you to run your applications without needing physical hardware.

There are a number of things you can you do with AWS EC2, such as hosting websites or apps, running big data or machine-learning tasks, creating testing environments, and handling tasks that need flexible, scalable computing power.

---

## Why Connect Your AWS EC2 Instance to VS Code?

Connecting your AWS EC2 instance to VS Code is helpful for several reasons. Before we start the setup process, it’s important to learn why it’s beneficial.

1. Using VS Code provides a familiar and efficient development space. It feels like coding on your own machine.
2. You don’t have to log into your AWS EC2 instance each time. You can edit files, run commands, and debug code from a distance.
3. You can streamline your workflow with built-in terminal access and extensions. This way, you won't have to switch between SSH clients all the time.
4. You can push changes to GitHub. This makes working together and deploying much smoother.
5. VS Code works well with Java, Node.js, and Python. It supports many languages and frameworks, so it's great for cloud development.

Now that you understand the benefits, let’s move on to setting up the connection.

---

## How to Launch and Connect Your AWS EC2 Instance to VS Code

To launch an EC2 instance on AWS, just follow these steps:

### Step 1: Create an AWS EC2 Instance

First, log into your AWS account. Then, use the search bar to find EC2 and select it.

![Searching for EC2 on AWS Console](https://cdn.hashnode.com/res/hashnode/image/upload/v1736016609765/f784db8e-46cc-4e03-abc0-7bdea9b1c668.png)

Click EC2 and follow the on-screen instructions to create a new instance.

1. **Choose an AMI (Amazon Machine Image):** This is a pre-configured template that includes an operating system and may come with additional software.
2. **Select an instance type:** Pick the right size for your needs. For example, `t2.micro` is a good option for beginners and small workloads.
3. **Configure Your EC2 Instance:** Set up networking, storage, security groups, and other options based on your requirements.
4. **Launch Your Instance:** Start your virtual server and access it remotely to begin using it.

![creating an EC2 instance](https://cdn.hashnode.com/res/hashnode/image/upload/v1736174305817/e8d9d8dd-f09d-4bca-a838-42ee55607fa5.gif)

Launched instance running:

![Launched Instance](https://cdn.hashnode.com/res/hashnode/image/upload/v1736174700999/b729de98-bd8f-496f-9486-3079d87fb4de.png)

So what’s happening in Step 1?

By launching an AWS EC2 instance, you are setting up a remote server in the cloud. AWS offers different AMIs that serve as pre-configured environments.

### Step 2: Connect the AWS EC2 Instance to Your Code Editor

To connect your EC2 instance created in AWS to your VS Code, you need SSH.

#### What is SSH?

SSH (Secure Shell) is a secure way to connect and communicate with other devices. It keeps your connection safe. This is important when you access servers or repositories. In Git, you can use SSH instead of HTTPS to clone repositories with a secure connection.

#### Why is SSH important here?

With SSH, you can link your local code editor (like VS Code) to your AWS EC2 instance. This allows you to work on files stored on the EC2 instance directly from your editor as if on your local computer.

**To connect your AWS EC2 instance to your local editor using SSH, follow these steps:**

- Open your terminal.
- Go to the folder where your <FontIcon icon="fas fa-key"/>`.pem` key file is. The key file (.pem) downloads automatically when you create your EC2 instance (usually in the Downloads folder).
- Update the file permissions to keep your key secure and ensure proper authentication.

For Linux users, use this command to update the file permissions:

```sh
chmod 400 codebuild-keypair.pem
```

For Windows users, first you’ll need to find the username of your laptop, as you’ll need it to update the file permissions.

To do this, open your terminal and type:

```powershell
whoami
```

This will display your current username.

Once you have your username, use the following command to update the file permissions:

```powershell
icacls "codebuild-keypair.pem" /reset
icacls "codbuild-keypair.pem" /grant:r "%USERNAME%:R"
icacls "codebuld-keypair.pem" /inheritance:r
```

Here's what I mean: My username is **ijeon**, so you should replace it with **your laptop's username** and **own** key, which ends with <FontIcon icon="fas fa-key"/>`.pem` extension.

![pasting the command on the terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1736021541861/048a9411-2348-48dc-8a6e-04d51dbd347d.png)

Running this command above updates the file permissions. So with this, you can work with your remote server.

![the output of the command pasted](https://cdn.hashnode.com/res/hashnode/image/upload/v1736021649692/118c75cf-30b4-474c-b726-142c2b4326e9.png)

Now that you have set the correct file permissions, you can use the SSH command along with the IPv4 address to connect to our EC2 instance. Type the following command:

```powershell
ssh -i [PATH TO YOUR .PEM FILE] ec2-user@[YOUR PUBLIC IPV4 DNS]
```

::: tip Example

```powershell
ssh -i "C:\Users\ijeon\OneDrive\Desktop\devops-series-nextwork\codebuild-keypair.pem" ec2-user@ec2-35-178-142-201.eu-west-2.compute.amazonaws.
```

Breaking it down:

1. `ssh`: This starts a secure remote connection.
2. `-i "C:\Users\ijeon...\codebuild-keypair.pem"`: This tells SSH to use the <FontIcon icon="fas fa-key"/>`.pem` key file for secure access.
3. `ec2-user@ec2-35-178-142-201.eu-west-2.compute.amazonaws.com`:
    - `ec2-user` is the default username for EC2 instances.
    - `@ec2-35-178-142-201...` is the public address of your EC2 instance.

:::

This command logs you into your EC2 instance remotely from your computer. It then uses the key (`.pem` file) instead of a password for security. It also lets you control the EC2 instance from your terminal as if you were using it directly.

If everything is set up correctly, a “success message” will appear. This confirms that you've logged in and can access the remote server.

![connecting via ssh](https://cdn.hashnode.com/res/hashnode/image/upload/v1742153348953/a68f32fc-7578-4904-9b2e-e63a353e84a0.gif)

### Step 3: Install the Programming Language

Now that you’ve linked your instance to the editor, you can install the packages needed to build your web app. You can use any programming language you're comfortable with, but we’ll use Java for this tutorial. This will be a simple web application - we don’t need to go into advanced details.

#### 1. Install Java

In your terminal, run the following commands to install **Java**:

```sh
sudo dnf install -y java-1.8.0-amazon-corretto-devel
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-amazon-corretto.x86_64
export PATH=/usr/lib/jvm/java-1.8.0-amazon-corretto.x86_64/jre/bin/:$PATH
```

This installs Java on your system. You also need Maven. It helps manage Java projects and create templates for web applications.

#### 2. Install Maven

Maven helps you organize Java projects. It also lets you create templates for web applications. Run these commands to install Maven:

```sh
wget https://archive.apache.org/dist/maven/maven-3/3.5.2/binaries/apache-maven-3.5.2-bin.tar.gz
sudo tar -xzf apache-maven-3.5.2-bin.tar.gz -C /opt
echo "export PATH=/opt/apache-maven-3.5.2/bin:$PATH" >> ~/.bashrc
source ~/.bashrc
```

To confirm Maven's correct installation, run this command:

```sh
mvn -v
```

Also, run the following command to check whether you have Java installed:

```sh
java -version
```

Now that you have installed Maven, you can use it to create a Java web app with the following command:

```sh
mvn archetype:generate \
-DgroupId=com.nextwork.app \
-DartifactId=nextwork-web-project \
-Dpackage=com.nextwork.app \
-DarchetypeArtifactId=maven-archetype-webapp \
-DarchetypeVersion=1.4 \
-DinteractiveMode=false
```

Running the command above generates a template for your application. In the terminal, it should show a "Build Success" message. This means the setup worked.

![Installing the template](https://cdn.hashnode.com/res/hashnode/image/upload/v1742122446716/7c51b3a2-6a8c-463d-817c-9630488a803d.png)

### Step 4:** Open a Remote Wind

Now that you’ve installed the necessary packages and set up your app template, you need to open your IDE or code editor. This will let you access the folders on your remote server.

In your terminal, click the double arrow icon at the bottom left.

![double arrow at the left](https://cdn.hashnode.com/res/hashnode/image/upload/v1736073016500/cb3a4d44-3ae5-4ccb-9006-c592c0be30f7.png)

When you click on it, it opens a modal window for you.

![connect to the host](https://cdn.hashnode.com/res/hashnode/image/upload/v1736073334686/a24d115c-9da3-4b46-80be-a75d73a189ab.gif)

A window will appear. Click "Connect to Host," which will open another window.

Then choose "Add New SSH Host" to open the SSH connection terminal.

![adding ssh host](https://cdn.hashnode.com/res/hashnode/image/upload/v1736073802080/45dbc209-0b4c-41a2-83eb-3fa05a8eff20.gif)

Input your SSH command to configure the host.

![image of SSH connection command](https://cdn.hashnode.com/res/hashnode/image/upload/v1736078262849/b09d017e-cbd3-476e-9641-63dc41e34d83.png)

After pressing "Enter," a configuration file will open. In this file, ensure that the <FontIcon icon="fas fa-key"/>`.pem` file and the `IP4v DNS` addresses from your EC2 instance are correct.

![place to press for the configuration file](https://cdn.hashnode.com/res/hashnode/image/upload/v1736083806867/e158ee79-67d3-41c8-bb63-870caab0033b.png)

Here’s a GIF view of the image above:

![a gif view of how to open your configuration file](https://cdn.hashnode.com/res/hashnode/image/upload/v1736083586490/7520a325-376d-42a8-905d-2e22770498de.gif)

Here’s the configuration file:

![config file](https://cdn.hashnode.com/res/hashnode/image/upload/v1736084278100/6e71324f-6b47-4a2a-b7a1-89c1be10c39b.png)

Go back to your editor and click on that double arrow again. This will automatically open a new window.

![Re-opening a new window](https://cdn.hashnode.com/res/hashnode/image/upload/v1736086002267/53e4edd8-afe2-4652-90ab-56bc90f80405.gif)

If your editor displays the IPv4 DNS address, your VS Code is successfully connected to the EC2 instance.

![connection to the remote server](https://cdn.hashnode.com/res/hashnode/image/upload/v1736086479299/e399f86c-e236-4efc-8d4d-a7055139d01e.png)

Now that you’re connected and a new window has opened, let’s access the folder stored in the cloud.

### Step 5: Access Your Project Folder

In step 3, remember when you installed Maven? It created a template for your web app. Now, you’ll access the folder where you created this.

1. Go to the Explorer panel in the window.
2. Click the **“Open Folder”** button.

![access remote folder](https://cdn.hashnode.com/res/hashnode/image/upload/v1736087503207/7fb21fcb-939e-4f17-83d2-93a6e0e3ee68.png)

Clicking on this button opens a modal box for you to select your folder, which was created by the Maven template:

![accessing the folder](https://cdn.hashnode.com/res/hashnode/image/upload/v1742134089654/77104e69-4c7a-4b59-812d-423167079f24.gif)

To access the template file, click the <FontIcon icon="fas fa-folder-open"/>`src` folder. This takes you to the <FontIcon icon="fa-brands fa-java"/>`index.jsp` file.

![template automatically created for you](https://cdn.hashnode.com/res/hashnode/image/upload/v1742135158716/4cfedc15-1c2e-4d60-b9f6-fe04c300dfa0.png)

With this template created, you can decide to tweak it and send it to your Git repository for storage.

---

## Conclusion

Great job! You’ve set up an AWS EC2 instance, linked it to your code editor, and installed the tools needed for your web app. In this tutorial, we used Java, but you can also choose other languages like Node.js or Python.

If you found this article helpful, please share it with others who may find it interesting.

Stay updated with my projects by following me on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`ijaydimples`)](https://x.com/ijaydimples), [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`ijaydimples`)](https://linkedin.com/in/ijaydimples) and [GitHub (<FontIcon icon="iconfont icon-github"/>`ijayhub`)](https://github.com/ijayhub).

Thank you for reading.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Connect Your AWS EC2 Instance to VS Code",
  "desc": "As a DevOps engineer, it is crucial to master at least one cloud provider. Cloud services simplify storage, data migration, and CI/CD workflows and help make these tasks easier and more efficient. If you need a basic introduction to cloud computing, ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-connect-your-aws-ec2-instance-to-vs-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
