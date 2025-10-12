---
lang: en-US
title: "How to Set Up a Home VPN Using Tailscale on a Raspberry Pi"
description: "Article(s) > How to Set Up a Home VPN Using Tailscale on a Raspberry Pi"
icon: fa-brands fa-raspberry-pi
category:
  - DevOps
  - Linux
  - Debian
  - Raspberry Pi
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - debian
  - raspberry-pi
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up a Home VPN Using Tailscale on a Raspberry Pi"
    - property: og:description
      content: "How to Set Up a Home VPN Using Tailscale on a Raspberry Pi"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/set-up-a-home-vpn-using-tailscale-on-a-raspberry-pi.html
prev: /devops/linux-debian/articles/README.md
date: 2025-03-29
isOriginal: false
author:
  - name: Daniel Anomfueme
    url : https://freecodecamp.org/news/author/LifeofDan-EL/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743175949441/1a8c4705-556c-4a1f-899a-9ac8e968fdc3.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Raspberry Pi > Article(s)",
  "desc": "Article(s)",
  "link": "/hw/raspberry-pi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up a Home VPN Using Tailscale on a Raspberry Pi"
  desc="In this article, you’ll learn how to set up a VPN which you can host on a Raspberry Pi. I am a fan of Raspberry Pis because these small form factor computers are a favourite tool for tinkerers, like me. This VPN will allow you to access your home net..."
  url="https://freecodecamp.org/news/set-up-a-home-vpn-using-tailscale-on-a-raspberry-pi"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743175949441/1a8c4705-556c-4a1f-899a-9ac8e968fdc3.png"/>

In this article, you’ll learn how to set up a VPN which you can host on a Raspberry Pi. I am a fan of Raspberry Pis because these small form factor computers are a favourite tool for tinkerers, like me.

This VPN will allow you to access your home network from anywhere as if you’re still at home. So why is this useful, you might ask? Well, it allows you to use your home network IP, no matter where you are, which is a good for privacy.

In this article, we’ll use [<VPIcon icon="iconfont icon-github"/>`tailscale/tailscale`](https://github.com/tailscale/tailscale), an open-source mesh VPN (Virtual Private Network) service that streamlines connecting devices and services securely across different networks. It enables encrypted point-to-point connections using the open-source [<VPIcon icon="fas fa-globe"/>WireGuard](https://wireguard.com/) protocol. This means that only devices on your private network can communicate with each other.

::: note Prerequisites

- Raspberry Pi (I am working with a Raspberry Pi 5)
- [<VPIcon icon="fa-brands fa-raspberry-pi"/>Raspberry Pi Imager](https://raspberrypi.com/software/)
- A Micro SD Card (8GB is enough)
- A Micro SD Card reader for your computer.
- Home Router
- A [<VPIcon icon="fas fa-globe"/>Tailscale](https://tailscale.com/) account

:::

---

## Install Raspberry Pi OS Lite (32-bit)

We’ll start this process by installing the Raspberry Pi OS Lite (32-bit) on the micro SD card we have. We will be making use of the Raspberry Pi Imager software which is available for free [<VPIcon icon="fa-brands fa-raspberry-pi"/>here](https://raspberrypi.com/software/).

When you run the imager software, pick the Raspberry Pi Device, which for me is a Raspberry Pi 5. Then in Operating System, click on Raspberry Pi OS (other), then scroll down to Raspberry Pi OS Lite (32-bit)

Next, select your SD card which you have inserted into the card reader, and the card reader into the computer. Your screen should look similar to what you see below. Click on next.

![A Screenshot of the Raspberry Pi Imager software start menu.](https://cdn.hashnode.com/res/hashnode/image/upload/v1742929198415/b3cd3476-ed82-4db3-9472-f13df2207ca9.png)

After next, you should see a pop-up asking if you would like to apply OS customisation settings.

![A screenshot of the Raspberry Pi Imager software customisation prompt menu](https://cdn.hashnode.com/res/hashnode/image/upload/v1742929274780/4482dd16-8f42-41ec-b1cd-af288180adcb.png)

Next, click on edit settings. Enable set hostname and write the name you want to give the Pi. For this tutorial, I will be using `dapivpn`. Then enable set username and password. Pick a username and a strong and secure password

You can enable configure wireless LAN if you plan to use Wifi, but if you are team Ethernet cable, you can skip this. I will be using WiFi in this tutorial though.

Now you’ll need to enable set local settings and pick your correct time zone and keyboard layout.

After that, go to the Services tab, then enable SSH and click on “Use password authentication”. Then click save, then yes on the apply customisation screen, and yes again. Remember this will erase all the data on the SD card, so make sure you’re using one without any important files on it.

This is how your Raspberry Pi Imager should look now:

![A screenshot of the Raspberry Pi Imager software performing the write operation.](https://cdn.hashnode.com/res/hashnode/image/upload/v1742929363470/0c7663d4-a908-4be1-9865-caa665a2ee95.png)

### Boot the Raspberry Pi

After this is done, take the SD card and insert it into your Raspberry Pi. Then plug the power cable into the Raspberry Pi and wait some minutes for it to boot properly. You will know it is ready when the green LED light stays on.

Now you should go to your router and set a static IP to the Raspberry Pi. For mine, I set it to `192.168.8.21`.

### SSH into the Raspberry Pi and Login

Open up your command line terminal. Type “`ssh <PI_USERNAME>@<RASPBERRY_PI_IP_ADDRESS>`”. For me, this would be:

```sh
ssh danpi@192.168.8.21
```

Then type in the password you used. You should see your username and the Pi hostname and this confirms you have logged in successfully to it.

![Command line interface showing a successful SSH process](https://cdn.hashnode.com/res/hashnode/image/upload/v1743088985613/480325b2-496c-4161-96c6-f150f4020922.png)

Type in:

```sh
sudo apt update && sudo apt upgrade -y
```

You run this command to make sure everything is up to date locally.

![Command line interface showing the update command running](https://cdn.hashnode.com/res/hashnode/image/upload/v1742929744252/6200841f-98bb-4bfa-8c30-38159a963e2b.png)

Now reboot your Pi after this by typing:

```sh
sudo reboot
```

---

## Install Tailscale on Raspberry Pi

Now you’re going to add Tailscale’s package signing key and repository.

```sh
curl -fsSL https://pkgs.tailscale.com/stable/debian/bookworm.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null 
curl -fsSL https://pkgs.tailscale.com/stable/debian/bookworm.tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list
```

Install Tailscale using these commands:

```sh
sudo apt-get update
sudo apt-get install tailscale
```

Next, you need to connect your Pi to your Tailscale network and authenticate. You can do that with the following command:

```sh
sudo tailscale up
```

Your browser should look like this.

![Screenshot of the browser showing the authentication screen](https://cdn.hashnode.com/res/hashnode/image/upload/v1742929786462/4d17cfae-0e87-449f-ac13-413a65f3f338.png)

To locate the Tailscale IPv4 address for the Raspberry Pi, run this command:

```sh
tailscale ip -4
```

You can also see it on the Tailscale dashboard in your browser.

At this point, you’re done installing Tailsacle and you just need to do some finishing touches.

---

## Key Expiry

There is something you need to know when it comes to adding a device to Tailsacle. By default, and as a security feature, Tailscale requires devices to re-authenticate after a certain period of time has elapsed, usually 180 days.

If the re-authentication does not occur, keys expire and the connection stops working. It’s up to you to choose what you prefer, as this is a security feature that comes with some inconvenience.

I will be disabling the key expiry on the Raspberry Pi, as I fully trust it. To do this, you need to:

- Open the [<VPIcon icon="fas fa-globe"/>Machines](https://login.tailscale.com/admin/machines) page of the Tailscale admin console.
- Find the Raspberry Pi on the row and select the option menu there.
- Click on the Disable Key Expiry option. You should see an Expiry Disable label below the machine name.

---

## How to Configure the Raspberry Pi as an Exit Node

Another thing you’ll need to know about when it comes to Tailscale is what an exit node is. A Tailscale exit node is a designated device in your Tailscale network that routes all of your internet traffic through it. No matter where you are, once you have this device activated as an exit node, when you turn on Tailscale, it routes your internet traffic through the device.

Ideally, you want a device that is powered on 24/7 to serve as your exit node. That’s why we are picking the Raspberry Pi, as it is a low-powered computer.

We are already 90% of the way, as we have Tailscale running on our Pi. Remember to also have Tailscale installed on as many devices on your local network as possible. What’s left is to allow your Pi to act as an exit node, so all your internet traffic or LAN traffic routes through it, giving you access to:

- Local network devices at home
- Your home public IP
- Internal services like NAS, printers, cameras, and so on

To do this, SSH into your Raspberry Pi and follow these steps:

- Enable IP Forwarding. IP forwarding allows your Raspberry Pi to pass traffic between its network interfaces. Run the commands below line by line:
    
```sh
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
echo "net.ipv6.conf.all.forwarding=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p /etc/sysctl.conf
```

- Advertise the Raspberry Pi as an exit node:

```sh
sudo tailscale up --advertise-exit-node
```

- Open the [<VPIcon icon="fas fa-globe"/>Machines](https://login.tailscale.com/admin/machines) page of the Tailscale admin console.
- Find the Raspberry Pi on the row. You should see an Exit Node label on its name.
- Click on the options menu there and select Edit Route Settings.
- Check the box for Use as an exit node, then save.

Now you should see the option of routing the internet through an exit node when you open up your Tailscale app on mobile or PC or anywhere you have it installed. When you see that option, you will also see the Raspberry Pi as an exit node option. You can also add more devices as an exit node if you want more options.

---

## Conclusion

Using the Tailscale app on other devices, you can now route traffic securely through the Raspberry Pi by selecting it as an exit node. Tailscale also provides clear, [<VPIcon icon="fas fa-globe"/>step-by-step guides](https://tailscale.com/kb/1408/quick-guide-exit-nodes#use-an-exit-node) tailored to each device type for setting up and using an exit node.

You can now be away from your home internet but still connect to the internet as if you were home. See you next time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up a Home VPN Using Tailscale on a Raspberry Pi",
  "desc": "In this article, you’ll learn how to set up a VPN which you can host on a Raspberry Pi. I am a fan of Raspberry Pis because these small form factor computers are a favourite tool for tinkerers, like me. This VPN will allow you to access your home net...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/set-up-a-home-vpn-using-tailscale-on-a-raspberry-pi.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
