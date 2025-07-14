---
lang: en-US
title: "Hack Your FirstMachine – A Guide for Aspiring Security Enthusiasts"
description: "Article(s) > Hack Your FirstMachine – A Guide for Aspiring Security Enthusiasts"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Linux
  - Shell
  - nmap
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
  - linux
  - shell
  - cli
  - wget
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Hack Your FirstMachine – A Guide for Aspiring Security Enthusiasts"
    - property: og:description
      content: "Hack Your FirstMachine – A Guide for Aspiring Security Enthusiasts"
    - property: og:url
      content: https://chanhi2000.github.iohttps://chanhi2000.github.io/bookshelf/freecodecamp.org/hack-your-first-machine-a-guide-for-aspiring-security-enthusiasts.html
prev: /devops/security/articles/README.md
date: 2024-10-03
isOriginal: false
author: Manish Shivanandhan
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727929072898/8ba47c55-8ca9-4255-8cf7-f6a27e403315.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "nmap > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/nmap/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Hack Your FirstMachine – A Guide for Aspiring Security Enthusiasts"
  desc="Hacking your first machine is a milestone for anyone interested in cybersecurity. You may have watched countless tutorials and read many articles. But hacking a machine and taking control of it is a wonderful and important experience for any aspiring..."
  url="https://freecodecamp.org/news/hack-your-first-machine-a-guide-for-aspiring-security-enthusiasts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727929072898/8ba47c55-8ca9-4255-8cf7-f6a27e403315.jpeg"/>

Hacking your first machine is a milestone for anyone interested in cybersecurity. You may have watched countless tutorials and read many articles. But hacking a machine and taking control of it is a wonderful and important experience for any aspiring cybersecurity professional.

Well, I’m here to give you that experience – for free.

I’ve created a hands-on lab with TryHackMe (THM). [<FontIcon icon="fas fa-globe"/>TryHackMe](https://tryhackme.com/) is an online platform that offers virtual labs for learning cybersecurity.

THM reduces complex virtual machine setups to help you practise your skills. Using THM, you can use machines right from your browser.

It’s a safe space to practice your skills. You’ll need to sign up for a free account to work with this lab, but you don’t have to buy a premium plan.

First, I’ll give you an intro to the platform. You can then visit the lab and hack your first machine. Here’s the Lab URL: [<FontIcon icon="fas fa-globe"/>https://tryhackme.com/jr/SS\_HYFM](https://tryhackme.com/jr/SS_HYFM)

How to Work with TryHackMe
--------------------------

To practise hacking, you need a target and an attack machine. THM works by creating isolated labs, also called “rooms”. Every room has its own target and attack machines.

Each room is split into multiple tasks. You must finish a task and answer some questions to pass the task. Once you finish all the tasks, you pass the room.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1727929124746/ec215a11-4efe-48fb-b1c7-e341be7e5bc0.png)

To start the target machine, click on the green “Start machine” button. Once you start, give it a few minutes to display its IP address.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1727929152565/d0853ded-10a0-4c75-b03a-9e6962d666a3.png)

Most targets will not have a GUI. You will only be interacting with it using an IP address.

Now you need an attack machine. THM offers a Kali virtual machine to use as the attacking machine. Kali is a Linux version with all the tools you need pre-installed in it. So no extra setups or installations are needed.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1727929209495/1d6234da-acc0-4c7e-81dd-70f2ef0d3888.png)

You can find the “Start Attackbox” button on the top left. It will open the attacking machine by splitting your screen.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1727929187803/10b8c5c6-a0bf-4f58-ab67-94cb3b4ad25f.png)

### Lab Tasks

The lab is split into five tasks:

#### 1. Platform overview

This task gives you an introduction to how the platform works, similar to the above section. Once you start both the virtual machines, you can test the connection by pinging the target from the attackbox.

#### 2. Linux 101

We have added a task on basic Linux commands. Even if you are an experienced Linux user, it can help brush up your skills. Here are the commands you will be working with.

- `whoami`:  tells you the username of the currently logged-in user.
- `pwd`:  Shows the full path of the current directory. It helps you track your current location in the system.
- `clear`:  clears the screen
- `ls`:  Lists files and directories in the current folder.
- `cat`:  Displays the contents of a file. It can also help create new files. `cat <FILENAME>` will display a file’s contents. Using the `>` operator, `cat > <FILENAME>` will create a new file.
- `rm`:  Deletes files or directories. Useful for cleaning up traces of activities, such as removing logs.

#### 3. Scanning with Nmap

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1727929253716/10a18e13-8afe-4a4b-af18-cf4caff653ba.jpeg)

[<FontIcon icon="iconfont icon-nmap"/>Nmap](https://stealthsecurity.sh/p/nmap-tutorial) (short for Network Mapper) is a free, open-source tool used for port scanning. It can scan for open ports, identify services, and even detect the target’s operating system.

Nmap will help you scan the target using its IP address. The information from Nmap will help you find entry points of getting into the target.

#### 4. Brute-forcing with Hydra

![](https://cdn-images-1.medium.com/max/1600/1*xZslvj7DTAYmUbDvTXcjug.jpeg)

Once you find an entry point, you can use a brute-force tool to find the password. In this target, there will be an open SSH port. SSH is a protocol that helps login to a server remotely.

You’ll use [<FontIcon icon="fas fa-globe"/>Hydra](https://stealthsecurity.sh/p/hacking-hydra-practical-tutorial) along with a list of passwords to hack your way into the target server. Once you find the password, you can login to the target using SSH. Here is the syntax for using SSH to login to a server.

```sh
ssh username@ip_address
```

It will then prompt for the password. Once you login to the target, you can find a text file called flag2.txt. The contents of this file will be the answer to the final question in the lab.

#### 5. Wrapping Up

The final task will ask for your feedback about this lab. Let us know your thoughts and we will make this lab better for the next person.

### Let’s Go

Go to [<FontIcon icon="fas fa-globe"/>TryHackMe](https://tryhackme.com/?utm_source=www.stealthsecurity.sh&utm_medium=referral&utm_campaign=hack-your-first-machine) and sign up for an account. Once you are done, [<FontIcon icon="fas fa-globe"/>click here](https://tryhackme.com/jr/SS_HYFM?utm_source=www.stealthsecurity.sh&utm_medium=referral&utm_campaign=hack-your-first-machine) to go to the lab.

Happy hacking!

**For more articles on Cybersecurity, join our free newsletter [<FontIcon icon="fas fa-globe"/>Stealth Security](https://stealthsecurity.sh/). To learn ethical hacking tools using hands-on labs, check out our private community [<FontIcon icon="fas fa-globe"/>The Hacker’s Hub](https://skool.com/hackershub).**

<!-- START: ARTICLE CARD -->
<!-- END: ARTICLE CARD -->