---
lang: en-US
title: "How to Self-Host Your Own Server Monitoring Dashboard Using Uptime Kuma and Docker"
description: "Article(s) > How to Self-Host Your Own Server Monitoring Dashboard Using Uptime Kuma and Docker"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Self-Host Your Own Server Monitoring Dashboard Using Uptime Kuma and Docker"
    - property: og:description
      content: "How to Self-Host Your Own Server Monitoring Dashboard Using Uptime Kuma and Docker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/self-host-uptime-kuma-docker.html
prev: /devops/docker/articles/README.md
date: 2026-04-07
isOriginal: false
author:
  - name: Abdul Talha
    url: https://freecodecamp.org/news/author/abdultalha3226/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ea068a20-bc19-400a-a42e-1bbb7e492da8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Self-Host Your Own Server Monitoring Dashboard Using Uptime Kuma and Docker"
  desc="As a developer, there's nothing worse than finding out from an angry user that your website is down. Usually, you don't know your server crashed until someone complains. And while many SaaS tools can "
  url="https://freecodecamp.org/news/self-host-uptime-kuma-docker"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ea068a20-bc19-400a-a42e-1bbb7e492da8.png"/>

As a developer, there's nothing worse than finding out from an angry user that your website is down. Usually, you don't know your server crashed until someone complains.

And while many SaaS tools can monitor your site, they often charge high monthly fees for simple alerts.

My goal with this article is to help you stop paying those expensive fees by showing you a powerful, free, open-source alternative called Uptime Kuma.

In this guide, you'll learn how to use Docker to deploy Uptime Kuma safely on a local Ubuntu machine.

By the end of this tutorial, you'll have set up your own private server monitoring dashboard in less than 10 minutes and created an automated Discord alert to ping your phone if your website goes offline.

::: note Prerequisites

Before you start, make sure you have:

- An Ubuntu machine (like a local server, VM, or desktop).
- Docker and Docker Compose installed.
- Basic knowledge of the Linux terminal.

:::

---

## Step 1: Update Packages and Prepare the Firewall

First, you'll want to make sure your system has the newest updates. Then, you'll install the Uncomplicated Firewall (UFW) and open the network "door" (port) that Uptime Kuma uses for the dashboard. You'll also need to allow SSH so you don't lock yourself out.

Run these commands in your terminal:

```sh
# Update your packages
sudo apt update && sudo apt upgrade -y

# Install the firewall:
sudo apt install ufw -y

# Allow SSH and open port 3001:
sudo ufw allow ssh
sudo ufw allow 3001/tcp

# Enable the firewall:
sudo ufw enable
sudo ufw reload
```

---

## Step 2: Create the Docker Compose File

Using a <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file is the professional way to manage Docker containers. It keeps your setup organised in one single place.

To start, create a new folder for your project and enter it:

```sh
mkdir uptime-kuma && cd uptime-kuma
```

Then create the configuration file:

```sh
nano docker-compose.yml
```

Paste the following code into the editor:

```yaml title="docker-compose.yml"
services:
  uptime-kuma:
    image: louislam/uptime-kuma:2
    restart: unless-stopped
    volumes:
      - ./data:/app/data
    ports:
      - "3001:3001"
```

::: note

The `./data:/app/data` line is very important. It saves your database in a normal folder on your machine, making it easy to back up later.

:::

Finally, save and exit: Press <kbd>CTRL</kbd>+<kbd>X</kbd>, then <kbd>Y</kbd>, then <kbd>Enter</kbd>.

---

## Step 3: Start the Application

Now, tell Docker to read your file and start the monitoring service in the background.

```sh
docker compose up -d
```

::: tip How to verify

Docker will download the files. When it finishes, your terminal should print `Started uptime-kuma`.

:::

---

## Step 4: Access the Dashboard

To access the dashboard, first open your web browser and go to `http://localhost:3001` (or your machine's local IP address).

When asked to choose the database, select **SQLite**. It's simple, fast, and requires no extra setup.

Then create an account and choose a secure admin username and password.

![](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/02913589-020e-4a8a-aa7a-1bf70a9244c6.png)

---

## Step 5: Use Case – Monitor a Website and Send Discord Alerts

Now you'll put Uptime Kuma to work by monitoring a live website and setting up an alert. Just follow these steps:

1. Click Add New Monitor.
2. Set the Monitor Type to `HTTP(s)`.
3. Give it a Friendly Name (e.g., "My Blog") and enter your website's URL.

![](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/74567f1e-acc4-480f-b969-7883e01aa459.png)

### Pro-Tip: How to Fix "Down" Errors (Bot Protection)

If your site uses strict security, it might block Uptime Kuma and say your site is "Down" with a 403 Forbidden error.

::: tip The Fix

Scroll down to Advanced, find the User Agent box, and paste this text to make Uptime Kuma look like a normal Chrome browser:

```plaintext
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

:::

### Add a Discord Alert

To get a message on your phone when your site goes down:

1. On the right side of the monitor screen, click Setup Notification.
2. Select Discord from the dropdown list.
3. Paste a Discord Webhook URL (you can create one in your Discord server settings under Integrations).
4. Click Test to receive a test ping, then click Save.

---

## Conclusion

Congratulations! You just took control of your server health. By deploying Uptime Kuma, you replaced an expensive SaaS subscription with a powerful, free monitoring tool that alerts you the second a project goes offline.

::: info Let’s connect!

I am a developer and technical writer specialising in writing step-by-step guides and workflows. You can find my latest projects on my [<VPIcon icon="fas fa-globe"/>Technical Writing Portfolio](https://blog.abdultalha.tech/portfolio) or reach out to me directly on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`abdul-talha`)](https://linkedin.com/in/abdul-talha/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Self-Host Your Own Server Monitoring Dashboard Using Uptime Kuma and Docker",
  "desc": "As a developer, there's nothing worse than finding out from an angry user that your website is down. Usually, you don't know your server crashed until someone complains. And while many SaaS tools can ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/self-host-uptime-kuma-docker.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
