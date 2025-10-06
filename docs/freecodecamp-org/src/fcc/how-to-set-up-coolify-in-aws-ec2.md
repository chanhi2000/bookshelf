---
lang: en-US
title: "How to Set Up Coolify in AWS EC2 and Have the Power to Do Anything in the Cloud"
description: "Article(s) > How to Set Up Coolify in AWS EC2 and Have the Power to Do Anything in the Cloud"
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
      content: "Article(s) > How to Set Up Coolify in AWS EC2 and Have the Power to Do Anything in the Cloud"
    - property: og:description
      content: "How to Set Up Coolify in AWS EC2 and Have the Power to Do Anything in the Cloud"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-set-up-coolify-in-aws-ec2.html
prev: /devops/aws/articles/README.md
date: 2025-06-30
isOriginal: false
author:
  - name: Md. Fahim Bin Amin
    url : https://freecodecamp.org/news/author/FahimFBA/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1751291416644/05d052cc-dc58-49b4-ac16-3064001fd816.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up Coolify in AWS EC2 and Have the Power to Do Anything in the Cloud"
  desc="Coolify is an open-source, self-hostable platform that serves as an alternative to services like Heroku, Netlify, and Vercel. It lets developers deploy and manage applications, databases, and services on their own infrastructure, providing greater co..."
  url="https://freecodecamp.org/news/how-to-set-up-coolify-in-aws-ec2"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1751291416644/05d052cc-dc58-49b4-ac16-3064001fd816.png"/>

Coolify is an open-source, self-hostable platform that serves as an alternative to services like Heroku, Netlify, and Vercel. It lets developers deploy and manage applications, databases, and services on their own infrastructure, providing greater control and flexibility.

If you want to use Coolify, you have two options. You can purchase their cloud plan, which costs you money. On the other hand, you can self-host it for free and have unlimited usage without any limitations.

In this article, I will show you how to self-host Coolify directly in an AWS EC2 instance and use its features. I will also show you how to deploy any website directly into it.

![206603be-4687-4e0d-ab96-6c1271006cf5](https://cdn.hashnode.com/res/hashnode/image/upload/v1747932644011/206603be-4687-4e0d-ab96-6c1271006cf5.png)

This article includes a step-by-step video walkthrough that I made for you. You can watch the video on my [YouTube channel (<VPIcon icon="fa-brands fa-youtube"/>`@FahimAmin`)](https://youtube.com/@FahimAmin).

---

## Requirements For Self-Hosting Coolify

Since we’re going to self-host Coolify in the cloud for this article, you’ll need to make sure that you have at least the minimum specification of the server. According to Coolify, currently, the minimum requirements are given below:

### Server Requirements

- A VPS (Virtual Private Server)
- A Dedicated Server
- A Virtual Machine (VM)
- A Raspberry Pi (see our [<VPIcon icon="fas fa-globe"/>Raspberry Pi OS Setup Guide](https://coolify.io/docs/knowledge-base/how-to/raspberry-pi-os#prerequisites))
- Or any other server with SSH access

### Supported Operating System

- Debian-based (for example, Debian, Ubuntu)
- Redhat-based (for example, CentOS, Fedora, Redhat, AlmaLinux, Rocky, Asahi)
- SUSE-based (for example, SLES, SUSE, openSUSE)
- Arch Linux
- Alpine Linux
- Raspberry Pi OS 64-bit (Raspbian)

### Supported Architectures

Coolify runs on 64-bit systems:

- AMD64
- ARM64

### Minimum Hardware Requirements

- **CPU**: 2 cores
- **Memory (RAM)**: 2 GB
- **Storage**: 30 GB of free space

Coolify may function properly on servers with lower specs than those mentioned above, but they recommend slightly higher minimum requirements. This ensures that users have sufficient resources to deploy multiple applications without performance issues.

I recommend that you check the [<VPIcon icon="fas fa-globe"/>official documents](https://coolify.io/docs/get-started/installation), as there might be an update regarding the specifications, and you do not want to miss that part!

I am going to use **AWS EC2** as my server for this guide.

---

## Set Up an AWS EC2 Instance for Coolify

Create a new EC2 instance in AWS.

![Create EC2](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003070325/e9f40038-12d7-4918-828a-3114d43f8185.png)

Give it any suitable name you want. I am going with `coolify-yt` for the purpose of this article.

![EC2 name](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003129368/d9726de2-f5e9-4d87-abbd-15660438c510.png)

For the Amazon Machine Image (AMI), I will use the latest LTS of Ubuntu (Ubuntu Server 24.04 LTS).

![AMI Type](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003224058/cf23f6b2-c099-40b8-bec1-a39fb0384907.png)

The architecture will be 64-bit (x86).

![AMI Architecture](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003299729/06970567-5523-4976-9156-d621ccf19899.png)

For the instance type, I can’t go with the free tier because that wouldn’t meet the minimum specification. So I’m going with the `t2.medium`.

![Instance Type](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003366450/465a7aad-c049-486a-baf4-6fb9a8ee1537.png)

I will create a new key pair for key pair. I will go with RSA, and the file format will be <VPIcon icon="fas fa-key"/>`.pem`.

![Key Pair](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003554621/6ea1ccba-aeb9-496f-a207-37bf9d554e17.png)

When you click on `Create key pair`, it will download a <VPIcon icon="fas fa-key"/>`.pem` file. Make sure to keep that safely.

For the storage, I am taking a 50 GB block storage. But you can follow Coolify’s minimum specification storage (30GB) for now if you want.

![Storage configuration](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003637365/4238a847-271e-4f4b-a96f-5a84ec9bdf74.png)

If I want to use my Coolify from anywhere, I have to check the three boxes in the Network settings.

- Allow SSH traffic from (Anywhere)
- Allow HTTPS traffic from the internet
- Allow HTTP traffic from the internet

![Network settings](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003752198/d67af805-bef4-4273-b592-dd1703e56cfd.png)

Now, simply click on “Launch instance.” It will create our new EC2 server. It might take a few seconds to half a minute. So just be patient and wait for it to finish its task.

![Launch instance](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003903936/277c79c0-f393-4d0f-a78e-5614915f9359.png)

---

## Security Group of AWS EC2

Go to the instance tab and find the name of your newly created EC2 instance. Then, find its security group name.

![instances](https://cdn.hashnode.com/res/hashnode/image/upload/v1751003959839/d85e30ba-c75d-4c70-afb1-d21765e03045.png)

I have the security group name for my newly created EC2 as “launch-wizard-7”.

![Security Group](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004072271/0a1294e6-ae5c-4f61-ab55-6fc3cb1db6be.png)

Now, go to the security group tab and find out which security group is associated with your newly created EC2. 

![security group](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004120094/3a328a4b-3da6-4012-928e-0cc8a9414b29.png)

As my EC2’s security group name was “launch-wizard-7”, I will click on that security group ID.

![Security group ID](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004179202/9919cb9f-a77d-47bd-a47d-52ac51f8a9f2.png)

It will take me to its configuration page. Now, click on “Edit inbound rules”.

![Inbound rules](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004258702/da5ea5a7-ecdf-4358-8e0b-f428bf61bf85.png)

Add a new rule. The type will be “Custom TCP”. The port will be “8000”. The source will be “Anywhere-IPv4”.

![Edit inbound rules](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004306106/249b91f7-c0fe-4797-80a0-6d059d55f922.png)

Now save the rules.

![save changes](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004359517/fbaf4dc7-c608-424b-a890-e8c106971097.png)

Now, go to the EC2 page and make sure that the newly created EC2 is running.

![EC2 status](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004404168/0321f546-a40e-4ba6-8815-414547e93346.png)

If you want to connect to the EC2 server from your local machine, you have to use the <VPIcon icon="fas fa-key"/>`.pem` key. For that, you have to go to the “SSH Client” tab in the connect settings.

![SSH Client](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004603377/99a0a7ac-0d99-433d-bae8-e357cdedd2f2.png)

For now, I am not going to go through that much hassle, so I’ll use the browser to connect to my server using the “Connect” button.

![Connect EC2](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004526291/a56fe27c-2b7f-400d-94f7-b26dc66ad4a4.png)

Make sure to note the Public IPv4 address of the EC2. Now click on “Connect”.

![Connect](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004626331/f5b8e5a5-5cef-4137-bbf7-807695b79e67.png)

It will open a new tab with the EC2 connection in your browser.

![Connect EC2](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004654940/951377a0-7c3d-4e88-bc38-bc73b53da337.png)

It will be ready to use within a few seconds.

![EC2](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004678704/b1313149-61ed-42d9-9a80-03c7a6f84c32.png)

---

## Install Coolify in AWS EC2

There are many ways to install Coolify directly on our EC2. But I usually follow the recommended [<VPIcon icon="fas fa-globe"/>installation script of Coolify](https://coolify.io/docs/get-started/installation).

```sh
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

Use `sudo zsh` instead of `sudo bash` if you are running the command from a “ZSH” terminal.

![Coolify script](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004776360/3f7ca4e5-e819-4c06-bf91-1b4b04edae9a.png)

It will start installing Coolify into your server. Follow their prompts in the EC2 terminal.

![install coolify in EC2](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004847716/1994a54b-29ae-44a3-94dd-953c2bc9ffc5.png)

Depending on your EC2 specification, it might take several minutes. Be patient and let it do its job until it reaches the “Congratulations!” screen.

![finish installation](https://cdn.hashnode.com/res/hashnode/image/upload/v1751004975296/c99da698-0e14-41b3-a32e-761d44edca29.png)

---

## Access Coolify from Anywhere Using the Public IP

After the installation, open a new tab and use that public IP with an ending `:8000` port. It will take you to the Coolify account registration page for the first time.

![Register](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005087901/473c8834-e8dd-497e-bb29-ed56e50f9d07.png)

Register your account. The first one becomes the admin by default. But you can change the role afterwards anytime you want.

You can follow their instructions during the onboarding. But for now, I am simply skipping it.

![Skip onboarding](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005149629/fb3bcf68-d897-44f4-b210-4896ac630651.png)

Your coolify is now completely ready to go!

---

## How to Deploy a Website Via Coolify

Now, I want to show you how you can easily deploy a static website directly from your GitHub repository in Coolify.

Go to ”Project” and click on “+Add”.

![Add new project](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005414046/2b21ea04-e90c-4f88-b853-81f10142f6b1.png)

Give it a name and a suitable description.

![Name and description for the project](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005442344/dab216e0-10c9-4a05-8528-bfd662dc3094.png)

I will use [one of my public repositories (<VPIcon icon="iconfont icon-github"/>`FahimFBA/RainyRoof_Restaurant_Website`)](https://github.com/FahimFBA/RainyRoof_Restaurant_Website) from GitHub for this trial.

![GitHub Repo](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005496252/a4c01732-3f38-4fa3-b3ba-d40ca3a4feba.png)

You can also deploy from private repositories. To do so, select “Private repository with GitHub App” or “With deploy key”.

Now, click on Production.

![Project](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005567995/6908baa5-8305-4f3e-a30f-f4adceda5e06.png)

Now, we need to add a resource from which it will pull the data.

![Add new resource](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005595787/123b4efe-a664-435a-9b26-88a14b636473.png)

As this repository is already public, I will select “Public Repository” as my project source.

![Public repo](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005668775/f050c0d5-4c49-499a-895d-b3329c143440.png)

Now, provide the public repo URL in the Repository URL field. Then click on “Check repository”.

![Public repo URL](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005713819/4923f951-4776-4442-9ced-6774b5ee05c7.png)

It will show you the project's basic configuration. Check to ensure that everything is correct.

![Project config](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005789227/ca3fa656-a00c-4ba4-ab07-b892755b0335.png)

If everything is alright, then click on “Continue”.

As this is just a static website, I will change the build pack to “Static” and click on “Continue.”

![Update project spec](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005858468/9b1c5a9c-db49-4648-a53f-c5cfec1d4f6c.png)

Now, deploy the application by clicking on the “Deploy” button.

![Deploy application](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005901660/737fc56a-390b-407a-b41b-fe7f7ce0d986.png)

You can enable/disable the debug log as well.

![Debug log](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005931517/659f4812-2762-4e18-b543-2678a1b3e09b.png)

After the deployment is finished successfully, you can find the website's autogenerated URL from the Links tab.

![Link](https://cdn.hashnode.com/res/hashnode/image/upload/v1751005979512/99b6f561-2d4a-4d24-b6a6-ea025857e909.png)

The site will appear just fine!

![Live site](https://cdn.hashnode.com/res/hashnode/image/upload/v1751006003870/eab0135a-0c3d-4e17-bbe8-1a0df996d58e.png)

You can also auto-generate a new domain or add your own domain/subdomain from the project settings at any time.

![Change domain](https://cdn.hashnode.com/res/hashnode/image/upload/v1751006064485/3a7c6a99-f2c8-43f8-82a9-b4ef3bbbcfcb.png)

The project settings will contain all other necessary configuration/environment variables, and so on. Whenever you change any information/settings/configuration in the configuration section, you just need to redeploy the application to reflect the changes.

You can add new team members, change the Coolify domain to something else (your domain/subdomain) and make it a generic, publicly accessible server.

![Team](https://cdn.hashnode.com/res/hashnode/image/upload/v1751006188731/0d8471f4-7a74-4413-8cc2-81a42da410e9.png)

So, this is the generic procedure to install Coolify in an AWS EC2 instance without any hassle.

---

## Conclusion

Thanks for reading this short tutorial. I hope it helped you install Coolify on your favourite server and increase your productivity.

To get more content like this, you can follow me on [GitHub (<VPIcon icon="iconfont icon-github"/>`FahimFBA`)](https://github.com/FahimFBA), [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`fahimfba`)](https://linkedin.com/in/fahimfba/), and [YouTube (<VPIcon icon="fa-brands fa-youtube"/>`FahimAmin`)](https://youtube.com/@FahimAmin). My [<VPIcon icon="fas fa-globe"/>website](https://fahimbinamin.com/) is always available, too.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up Coolify in AWS EC2 and Have the Power to Do Anything in the Cloud",
  "desc": "Coolify is an open-source, self-hostable platform that serves as an alternative to services like Heroku, Netlify, and Vercel. It lets developers deploy and manage applications, databases, and services on their own infrastructure, providing greater co...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-set-up-coolify-in-aws-ec2.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
