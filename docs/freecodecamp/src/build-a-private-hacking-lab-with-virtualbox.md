---
lang: en-US
title: "How to Build Your Own Private Hacking Lab with VirtualBox"
description: "Article(s) > How to Build Your Own Private Hacking Lab with VirtualBox"
icon: iconfont icon-kalilinux
category:
  - Security
  - Linux
  - Debian
  - Kali Linux
  - Vagrant
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - sec
  - security
  - linux
  - debian
  - kali
  - vagrant
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your Own Private Hacking Lab with VirtualBox"
    - property: og:description
      content: "How to Build Your Own Private Hacking Lab with VirtualBox"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-private-hacking-lab-with-virtualbox.html
prev: /devops/security/articles/README.md
date: 2024-10-25
isOriginal: false
author: Manish Shivanandhan
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729751281544/6500642d-4c1e-4dba-b5d0-ab97f9f10003.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Debain > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Vagrant > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/vagrant/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Your Own Private Hacking Lab with VirtualBox"
  desc="Ethical hacking involves testing and finding vulnerabilities in systems. But doing this on live networks or public servers can lead to accidental damage. Setting up a virtual lab for hacking is a great way to sharpen your skills in a safe environment..."
  url="https://freecodecamp.org/news/build-a-private-hacking-lab-with-virtualbox"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729751281544/6500642d-4c1e-4dba-b5d0-ab97f9f10003.jpeg"/>

Ethical hacking involves testing and finding vulnerabilities in systems. But doing this on live networks or public servers can lead to accidental damage.

Setting up a virtual lab for hacking is a great way to sharpen your skills in a safe environment. A private lab ensures that all your activities remain isolated, so there’s no risk of harming real systems or violating legal boundaries. It allows you to make mistakes and learn from them without causing harm.

---

## Project Setup

This guide will teach you how to set up your own private lab. To do this, we’ll need three things:

- Virtualization software
- Attacking Machine
- Target Machine

Virtualization software allows one physical computer to run multiple virtual machines (VMs). A virtual machine acts like a separate computer with its own operating system and programs but runs on the same hardware as the host computer.

VirtualBox is a popular virtualization software. VMware is another alternative.

To practice hacking, you need two machines — an attacking machine and a target machine.

You can use your own system as the attacking machine. But it is better to use a machine like [<VPIcon icon="iconfont icon-kalilinux"/>Kali](https://kali.org/) or [Parrot](https://parrotsec.org/) which comes pre-installed with all the tools you will need.

For the target machine, we can use a repository like Vulnhub. It contains several VMs built for you to practise your skills. Each one is designed to have a vulnerability that you can practise exploiting.

The downloads required for this setup are quite large, so I recommend you download and keep them ready.

- [<VPIcon icon="iconfont icon-virtualbox"/>Download VirtualBox](https://virtualbox.org/wiki/Downloads) (download the extension pack as well)
- [<VPIcon icon="iconfont icon-kalilinux"/>Download Kali](https://kali.org/get-kali/#kali-virtual-machines) (64-bit Virtualbox image)
- [<VPIcon icon="fas fa-globe"/>Download Mr Robot vulnerable machine](https://vulnhub.com/entry/mr-robot-1,151/)

Let’s go 👉

---

## How to Install VirtualBox

To download VirtualBox, go to the [<VPIcon icon="iconfont icon-virtualbox"/>downloads page](https://virtualbox.org/wiki/Downloads). Based on your operating system, download the package and install it.

Once installation is complete, you should see a similar page depending on your operating system.

![Virtualbox home](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751323730/84912f77-6c90-49d0-8b07-b856247b3723.png)

Double-click on the extension pack and make sure its installed as well.

---

## How to Install Kali Linux

Now let’s install our attacking machine. Extract the <VPIcon icon="fas fa-file-zipper"/>`.7z` file from the Kali Linux download. Then click the green “Add” icon on the VirtualBox interface and point to the <VPIcon icon="fas fa-file-lines"/>`.vbox` file.

![Kali Linux <VPIcon icon="fas fa-file-lines"/>`.vbox` file](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751345791/f84dd422-e99c-4c6d-b2e5-2381cf12933c.png)

All the default settings will be applied and you should have the attacking machine installed. If you are stuck, you can [<VPIcon icon="iconfont icon-kalilinux"/>find detailed instructions here](https://kali.org/docs/virtualization/import-premade-virtualbox/).

Don’t start the machine yet. Let’s add the target machine as well, followed by changing a few networking settings. Then we can start hacking.

---

## How to Install a Target VM

Now let’s install the target. Double-click on the downloaded <VPIcon icon="iconfont icon-virtualbox"/>`mrRobot.ova` file. Use the default settings and click “Finish”.

![Mr Robot Target VM](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751365289/a3ce9b1c-7daa-4a16-959b-139d4239bae2.png)

Once both the attacking and target machines are setup, you should see them both in the machines list.

![Virtualbox home with attack and target machines](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751388993/7c3510bb-0d9d-42b7-bdec-68a70b09b7d4.png)

Now let’s update the network settings to make sure our VMs are secure.

---

## Update Networking Settings

There are many ways to set up a network in VirtualBox. But in our case, we want to isolate our lab from the public internet. The best way to do this is to set up a host-only network.

In a host-only network, the VMs can communicate with each other but not the public internet. Let’s set it up.

In the Virtualbox interface, click on “Tools” and click “Host-only Networks”. Then click “Create”. It will automatically create a host only network with an IP range. For simplicity, let’s change the network’s name to “MyHackingLabNetwork”.

![Virtualbox host only network](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751416579/0f16b374-33d0-444d-8d09-1edd22b389c1.png)

Click “Apply”. Now we have a host only network. Next, let’s configure our virtual machines to connect to this network.

Click on the Virtual Machine and click “Settings” icon. Under “Network”, choose “host-only network” and choose the name as “MyHackingLabNetwork”. Click “OK” once done.

![Virtualbox Network settings](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751437795/c700b9be-0885-45fc-b0d1-70a6227167fa.png)

Do the same for the target machine. The IP addresses for these virtual machines will automatically be assigned by our “host-only” network.

---

## Scanning the Target

Now we are ready to go. Power on both machines.

::: note

Both machines will show a default option to startup - just press <kbd>Enter</kbd>. If the VM looks small on your screen, click View -> Scaled Mode on the top menu.

:::

The username and password for the Kali machine is “kali”.

You should see the Kali Linux UI as below.

![Kali Home](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751456625/e63b0190-2e8d-481b-903f-faac4c2fec3f.png)

For the Mr.Robot box, you should see the following UI:

![Target home](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751469522/71ce0dcd-595c-4f67-8ff4-716ffb1e8216.png)

Now let’s find the IP addresses of these machines.

In Kali, open a terminal and type `ifconfig | grep inet`.

![Network display](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751487309/6ec69770-ead6-44f0-a590-7a6afb563614.png)

You should see an IP address similar to 192.168.56.x. This is the IP of the target machine.

Now let’s use nmap to scan for other machines in this network. If you don't know what Nmap is, [<VPIcon icon="fas fa-globe"/>here is a tutorial](https://stealthsecurity.sh/p/nmap-tutorial).

Let’s do a ping scan from Kali to look for other machines in the network. Run the following command:

```sh
nmap -sn 192.168.56.0/24
```

This command pings all IP addresses from `192.168.56.1` to `192.168.56.254` to see what is up and running. You should see three similar results.

![Nmap ping scan](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751508093/204e5805-3b1e-485b-8e2e-bece23c3d781.png)

The first result is usually the IP of the adapter. So we can ignore it. Out of the two, one of them is the IP of our attack machine. We are interested in the third. In this case, its 192.168.56.3. Let’s do a service version scan of this IP and see what comes up.

```sh
nmap -sV 192.168.56.3
```

You should see a similar result as below if you are scanning the Mr.Robot virtual machine:

![Nmap service version scan](https://cdn.hashnode.com/res/hashnode/image/upload/v1729751531886/bf6eec03-4393-4610-84ff-61dceb24edcc.png)

The above image shows that there are three ports on the server. One of them is ssh, which is closed. The other two are web server ports - 80 for http and 443 for https.

---

## Conclusion

Congratulations! You’ve successfully set up your own hacking lab using VMware. This lab gives you the flexibility to practice ethical hacking in a controlled, isolated environment.

For more free tutorials on cybersecurity, [<VPIcon icon="fas fa-globe"/>join our newsletter](https://stealthsecurity.sh/). To learn how to hack the Mr.Robot and other boxes, join our private community [<VPIcon icon="fas fa-globe"/>Hacker’s Hub](https://skool.com/hackershub). If you are starting out in Cybersecurity, check out the [<VPIcon icon="fas fa-globe"/>Hacker’s Handbook](https://book.stealthsecurity.sh/).

See you soon with another article.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your Own Private Hacking Lab with VirtualBox",
  "desc": "Ethical hacking involves testing and finding vulnerabilities in systems. But doing this on live networks or public servers can lead to accidental damage. Setting up a virtual lab for hacking is a great way to sharpen your skills in a safe environment...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/build-a-private-hacking-lab-with-virtualbox.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
