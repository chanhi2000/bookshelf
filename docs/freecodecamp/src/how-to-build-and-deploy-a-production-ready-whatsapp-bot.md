---
lang: en-US
title: "How to Build and Deploy a Production-Ready WhatsApp Bot with FastAPI, Evolution API, Docker, EasyPanel, and GCP"
description: "Article(s) > How to Build and Deploy a Production-Ready WhatsApp Bot with FastAPI, Evolution API, Docker, EasyPanel, and GCP"
icon: iconfont icon-gcp
category:
  - DevOps
  - Google
  - Google Cloud
  - Docker
  - Linux
  - Debian
  - Ubutnu
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - google
  - google-cloud
  - gcp
  - google-cloud-platform
  - docker
  - linux
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build and Deploy a Production-Ready WhatsApp Bot with FastAPI, Evolution API, Docker, EasyPanel, and GCP"
    - property: og:description
      content: "How to Build and Deploy a Production-Ready WhatsApp Bot with FastAPI, Evolution API, Docker, EasyPanel, and GCP"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-and-deploy-a-production-ready-whatsapp-bot.html
prev: /devops/gcp/articles/README.md
date: 2026-02-21
isOriginal: false
author:
  - name: Raju Manoj
    url: https://freecodecamp.org/news/author/rajumanoj/
cover: https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/covers/5e1e335a7a1d3fcc59028c64/de480f02-206a-4325-b4c2-788d33d746b1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
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
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build and Deploy a Production-Ready WhatsApp Bot with FastAPI, Evolution API, Docker, EasyPanel, and GCP"
  desc="WhatsApp bots are widely used for customer support, automated replies, notifications, and internal tools. Instead of relying on expensive third-party platforms, you can build and deploy your own self-"
  url="https://freecodecamp.org/news/how-to-build-and-deploy-a-production-ready-whatsapp-bot"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/covers/5e1e335a7a1d3fcc59028c64/de480f02-206a-4325-b4c2-788d33d746b1.png"/>

WhatsApp bots are widely used for customer support, automated replies, notifications, and internal tools. Instead of relying on expensive third-party platforms, you can build and deploy your own self-hosted WhatsApp bot using modern open-source tools.

In this tutorial, you’ll learn how to build and deploy a production-ready WhatsApp bot using:

- FastAPI
- Evolution API
- Docker
- EasyPanel
- Google Cloud Platform (GCP)

By the end of this guide, you will have a fully working WhatsApp bot connected to your own WhatsApp account and deployed on a cloud virtual machine.

---

## How the Architecture Works

Before we start installing anything, let’s understand how the system works.

![This diagram shows how a WhatsApp message flows from the user’s WhatsApp app, through WhatsApp servers, into a GCP VM (via firewall, Docker, and EasyPanel) where Evolution API receives it, triggers a FastAPI bot via webhook, processes the logic, and sends the reply back to the user through WhatsApp.](https://cdn.hashnode.com/res/hashnode/image/upload/v1770444944919/cbcd4016-c98d-4379-9c7c-2d22ab9e309a.png)
<!-- TODO: mermaid화 -->

---

## How Your WhatsApp Bot Works

Before we continue setting things up, let's make sure you understand what's actually happening behind the scenes. Don't worry – no technical experience needed here.

### Imagine a postal service

Think of your WhatsApp bot like a very fast, automated postal service:

- Someone sends you a letter (a WhatsApp message)
- A postal worker (Evolution API) picks it up and brings it to your office
- Your office manager (FastAPI bot) reads it and writes a reply
- The postal worker takes the reply back and delivers it

That's it. That's the whole system.

### The 7 steps

1. Someone sends a message to your WhatsApp number – just like texting a friend.
2. Evolution API notices the message – it's constantly watching your WhatsApp number for new messages, like a receptionist sitting by the phone.
3. Evolution API passes the message to your bot – it sends the message content to your app and says *"hey, you've got a new message!"*
4. Your bot reads the message and decides what to say – this is where your code does its job.
5. Your bot sends the reply back to Evolution API – *"okay, send this response."*
6. Evolution API delivers the reply through WhatsApp.
7. The user sees the reply on their phone – usually within seconds.

::: details One line summary

```plaintext
User → WhatsApp → Evolution API → Your Bot → Evolution API → WhatsApp → User
```
<!-- TODO: mermaid화 -->

Every step in this guide is just setting up one piece of that chain. Once they're all connected, the whole thing runs on its own automatically.

This architecture allows you to automate replies while keeping full control of your infrastructure.

### Why These Tools?

Let’s briefly understand why we’re using each tool.

#### FastAPI

FastAPI is a modern Python framework for building APIs. It is fast, lightweight, and ideal for handling webhook requests from Evolution API.

#### Evolution API

Evolution API is a self-hosted WhatsApp automation server built on top of Baileys. It connects your personal WhatsApp account without requiring official WhatsApp Business API approval.

#### Docker

Docker allows us to run applications in containers. This makes deployments consistent, portable, and production-ready.

#### EasyPanel

EasyPanel is a graphical platform for managing Docker services. Instead of writing Docker Compose files manually, we use EasyPanel’s UI to deploy and manage our services easily.

#### Google Cloud Platform (GCP)

GCP provides the virtual machine that hosts our infrastructure. We will use an Ubuntu 22.04 server to run Docker, EasyPanel, Evolution API, and our FastAPI bot.

I chose these tools because they are practical, lightweight, and suitable for real-world production deployments.

:::

::: note Prerequisites

Before starting, make sure you have:

- A Google Cloud, AWS, or Azure account
- Billing enabled
- A project selected
- Access to Cloud Shell
- Basic Linux and Docker knowledge

:::

---

## Step 1: Create Firewall Rules on GCP

We need to allow traffic to specific ports on our VM. So, we run this command in GCP Cloud Shell:

```sh
gcloud compute firewall-rules create easypanel-whatsapp-fw \
--network default \
--direction INGRESS \
--priority 1000 \
--action ALLOW \
--rules tcp:22,tcp:80,tcp:443,tcp:3000,tcp:8080,tcp:9000,tcp:5000-5999 \
--source-ranges 0.0.0.0/0 \
--description "SSH, EasyPanel, Evolution API, Bot"
```

::: info This command:

- Creates a **firewall rule** named `easypanel-whatsapp-fw`
- On the **default network**
- Allows incoming internet traffic (`INGRESS`)
- Opens these ports:
  - `22` → SSH (server access)
  - `80` → HTTP
  - `443` → HTTPS
  - `3000, 8080, 9000` → App panels / APIs
  - `5000–5999` → Custom app range
- Allows access from **any IP address** (`0.0.0.0/0`)

Basically It opens your server so people (and you) can access your apps and services from the internet. This firewall rule allows external traffic to reach your VM.

---

## Step 2: Create a Virtual Machine (Ubuntu 22.04)

Now we'll create the server that hosts everything. Run the following command in the GCP Cloud Shell to set up a virtual machine with Ubuntu 22.04. 

```sh
gcloud compute instances create whatsapp-vm \
--zone=asia-south1-a \
--machine-type=e2-medium \
--image-family=ubuntu-2204-lts \
--image-project=ubuntu-os-cloud \
--boot-disk-size=30GB \
--tags=easypanel
```

This command creates a new virtual machine (VM) on Google Cloud:

- **Name:** `whatsapp-vm`
- **Location (zone):** `asia-south1-a` (India region)
- **Machine size:** `e2-medium` (2 vCPU, 4GB RAM)
- **Operating System:** Ubuntu 22.04 LTS
- **Disk size:** 30GB
- **Tag:** `easypanel` (used to apply firewall rules)

This creates a Linux server in Google Cloud that you can use to host EasyPanel, WhatsApp bot, or your APIs.

::: note

Wait about one minute for the instance to start.

:::

---

## Step 3: SSH into the VM

Connect to your server by using SSH to access the virtual machine you just created on Google Cloud.

```sh
gcloud compute ssh whatsapp-vm --zone=asia-south1-a
```

This command connects to your virtual machine named `whatsapp-vm` in the zone `asia-south1-a` using SSH (secure remote login).

It logs you into your Google Cloud server so you can start installing software and running commands. After running this, you will see a terminal prompt – that means you are now inside your Ubuntu server and ready to go.

---

## Step 4: Install Docker

Docker is needed to run EasyPanel and the Evolution API.

**First update the system:**

```sh
sudo apt update -y
sudo apt install -y curl
```

::: info This does two things

1. `sudo apt update -y`: Updates your server’s package list (refreshes available software info).
2. `sudo apt install -y curl`: Installs **curl**, a tool used to download things from the internet using the terminal.

:::

It prepares your server and installs a tool needed to download and install other software.

**Then install Docker:**

```sh
curl -fsSL https://get.docker.com | sudo sh
```

This command uses `curl` to download Docker’s official installation script. The `|` (pipe) sends it directly to `sudo sh`, which runs the script as administrator.

It automatically installs **Docker** on your server.

After this finishes, Docker should be installed.

**Enable Docker:**

```sh
sudo systemctl enable docker
sudo systemctl start docker
```

This command does two things:

1. `enable docker`: Makes Docker start automatically every time the server reboots.
2. `start docker`: Starts Docker right now.

It turns Docker ON now and makes sure it stays ON after restart.

**Allow the Ubuntu user to run Docker:**

```sh
sudo usermod -aG docker ubuntu
```

This command adds the user `ubuntu` to the Docker group.

This is important: By default, you must use `sudo` before every Docker command.After running this, the Ubuntu user can run Docker without needing sudo every time.

Note: This command assumes your username is `ubuntu`, which is the default on Google Cloud VMs. If your username is different, replace Ubuntu with your actual username.

**Exit the session and reconnect:**

```sh
exit
gcloud compute ssh whatsapp-vm --zone=asia-south1-a
```

1. `exit`: Logs you out of your current server session.
2. `gcloud compute ssh whatsapp-vm --zone=asia-south1-a`: Logs you back into your Google Cloud VM.

Why we do this: After adding the `ubuntu` user to the Docker group, you must log out and log back in for the permission changes to work.

**Test Docker:**

```sh
docker run hello-world
```

This command downloads a small test image called **hello-world**, runs it inside Docker, and prints a success message if Docker is working correctly.

It checks if Docker is installed and working properly. If you see “Hello from Docker!”, Docker is working correctly.

---

## Step 5: Install EasyPanel

EasyPanel provides a user interface for deploying Docker services. Run this command in the VM:

```sh
curl -sSL https://get.easypanel.io | sudo bash
```

This command:

- Downloads the official **EasyPanel installation script**
- Runs it with administrator (sudo) permission
- Automatically installs and configures EasyPanel on your server

It installs EasyPanel on your VM so you can manage apps using a web dashboard instead of commands. Installation takes about one minute.

---

## Step 6: Open the EasyPanel Dashboard

Once you have your IP address, open a new tab in your browser and type it in like this:

```plaintext
http://<YOUR_PUBLIC_IP>:3000
```

For example, if your IP was 34.123.45.67, you would type:

```plaintext
http://34.123.45.67:3000
```

EasyPanel runs on port 3000 by default – that's why we add :3000 at the end. Without it, your browser won't know which service to open on the server.

Create an admin account and log in; the EasyPanel login page will appear.

Click **“Create Admin Account”**.

Fill in:

- **Username** (choose something you’ll remember)
- **Email**
- **Password** (make it strong!)
- Submit the form.

You are now logged in as the admin and can start managing apps, APIs, and bots through the EasyPanel dashboard.

You will see a page like the one below:

![easypanel page](https://cdn.hashnode.com/res/hashnode/image/upload/v1771478879926/c222ae8c-8714-4af2-a631-c6fead8185e8.png)

---

## Step 7: Deploy Evolution API

1. Create a new project (for example: `whatsapp-1`)
2. Go to Services → Templates
3. Select Evolution API
4. Deploy the latest version

Wait until all services turn green. You will see a page like the one below.

![Deploying evolution-api](https://cdn.hashnode.com/res/hashnode/image/upload/v1771479080612/ce8453b2-e20e-4c37-b150-de4e032ba794.png)

Next, open Environment Variables and locate:

```sh
AUTHENTICATION_API_KEY
```

Copy the `AUTHENTICATION_API_KEY`.

Open the Evolution API dashboard

Inside EasyPanel, find your Evolution API service. You will see a clickable domain link – it usually looks something like:

```plaintext
https://evolution-api.easypanel.host
```

Click that link to open it in your browser. You will see a JSON response confirming the service is running.

Once you open the link, you’ll see a JSON response confirming success. To proceed with login, copy the **Manager link** displayed in the response. This link opens the management dashboard where you can authenticate and begin using the Evolution API. The screenshot below highlights the manager URL along with version details for easy reference

![manager URL](https://cdn.hashnode.com/res/hashnode/image/upload/v1771480117778/017524df-f8be-41bd-9d6c-0ba04b499fe9.png)

Copy the manager link and open it in a new tab, then copy the AUTHENTICATION_API_KEY, which you did in the previous step. This is how it looks, as you can see below:

![Evolution manager](https://cdn.hashnode.com/res/hashnode/image/upload/v1771480570638/9e18ca51-1637-4261-be22-7cd89ee0459f.png)

Create a new instance:

- Choose channel: **Baileys**
- Leave phone number blank
- Give your instance a name

Save the instance.

---

## Step 8: Connect WhatsApp

Inside your instance dashboard:

1. Click **Get QR**
2. Scan it using WhatsApp on your phone

Once connected, your chats and contacts will sync automatically. If syncing fails, disconnect and reconnect the session.

---

## Step 9: Deploy the FastAPI Bot

Now we’ll deploy the bot service.

### 1: Go to EasyPanel

You’re opening the EasyPanel dashboard you just installed. This is where you can manage apps, servers, and services using a graphical interface instead of terminal commands.

### 2: Create a new project

A “project” is like a container or folder for your bot service. It organizes all files, settings, and deployments for this app.

### 3: Add an App service

“App service” means a running instance of your application. In this case, it will be the WhatsApp bot.

### 4: Choose Git deployment

Git deployment lets you connect a code repository to EasyPanel.This will automatically download your code from GitHub and run it inside Docker.

### 5: Paste your repository URL

```plaintext
https://github.com/rajumanoj333/wabot
```

This is the GitHub repository containing the WhatsApp bot code. EasyPanel will clone this repo and prepare the app automatically.

### 6: Domains in EasyPanel

This section lets you assign a URL or domain name to your app service. Even if you don’t have a custom domain, you can use your server’s public IP. Your WhatsApp bot app runs on port 9000 inside the server.

### 7: Set the port to `9000`

By setting the domain to use port 9000, EasyPanel knows where to send traffic.

Example URL after this step:

```plaintext
https://your-project.easypanel.host
```

This is the public address people (and other services) will use to reach your bot.

You’re telling EasyPanel:

> “Whenever someone accesses this project, forward them to the bot service running on port 9000.”

Without this step, the bot service would run but **you wouldn’t be able to access it from your browser or other apps**.

### Configure Environment Variables

Set the following variables:

```sh title=".env"
EVOLUTION_API_URL=http://evolution-api:8080
EVOLUTION_API_KEY=YOUR_AUTHENTICATION_API_KEY
INSTANCE_NAME=your_instance_name
```

Note: You might notice two different names here – AUTHENTICATION_API_KEY (used in EasyPanel) and EVOLUTION_API_KEY (used in your bot code). They are the same key. Just copy the value from EasyPanel and paste it into both places.

---

## Step 10: Connect the Webhook – Telling Evolution API Where to Send Messages

At this point, you have two separate things running:

1. **Evolution API**: the service that connects to WhatsApp and handles messages
2. **Your app (fastapi bot)**: the chatbot brain you deployed in the previous steps

Right now, these two don't know each other exists. They're like two people in different rooms with no way to pass notes between them. A **webhook** fixes that.

### So what exactly is a webhook?

A webhook is simply a URL (a web address) that you hand to one service so it can automatically notify another service when something happens.

You're going to tell Evolution API *"whenever a WhatsApp message arrives, forward it to this address."* Your app will be sitting at that address, waiting to receive it, read it, and send a reply.

Think of it like a forwarding address at the post office. When mail (a WhatsApp message) arrives, it gets automatically redirected to your app's door.

### Let's set it up

#### 1. Open your Evolution API dashboard.

You should already have this open from earlier steps. In the left sidebar, click on **Events**, then click on **Webhook**. This is where you control how Evolution API sends data to your app.

#### 2. Turn the webhook on.

At the top of the page, you'll see a toggle next to the word **"Enabled"**. Click it so it turns green. This tells Evolution API that you want to start using a webhook.

#### 3. Enter your app's webhook URL.

In the **URL** field, type your app's address with `/webhook` added to the end, like this:

```plaintext
https://your-domain.easypanel.host/webhook
```

Replace `your-domain` with the actual domain name you set up when you deployed your app. The `/webhook` part at the end is important: it's a specific page your app has set up just for receiving these messages. Without it, Evolution API would be knocking on the wrong door.

#### 4. Leave "Webhook by Events" and "Webhook Base64" turned off for now.

These are advanced options you won't need for a basic chatbot.

#### 5. Scroll down to the Events section and enable these two events:

- **MESSAGES_UPSERT**: This triggers every time someone sends your WhatsApp number a message. Without this, your app would never know a message arrived.
- **SEND_MESSAGE**: This triggers when a message is sent *out*. It helps your app confirm that replies are going through correctly.

You can leave all the other events (like `APPLICATION_STARTUP`) turned off. They handle things like group chats and contact updates, which aren't needed for what we're building.

**6. Click Save.**

### Quick recap of what you just did

You created a direct line between Evolution API and your app. Now, the moment someone messages your WhatsApp number, Evolution API will instantly pass that message along to your app. Your app reads it, figures out a response, and sends one back all automatically.

This is the step that brings your chatbot to life. Without it, nothing would happen when someone sent you a message. With it, the whole system clicks into place.

---

## Step 11: Final Test

Send a message from a different WhatsApp number (not the connected one).

Send:

```plaintext
Hi
```

If everything is configured correctly, your bot should reply:

```plaintext
👋 Hello! Bot is working.
```

Congratulations! Your WhatsApp bot is now live.

---

## Production Considerations

For real-world deployments, consider:

- Restricting firewall rules instead of allowing 0.0.0.0/0
- Using HTTPS with a custom domain
- Securing API keys with a secret manager
- Monitoring logs and container health
- Setting up automatic backups

This tutorial demonstrates the core working system, but these improvements will make your deployment more secure and scalable.

---

## Conclusion

You now have a fully self-hosted WhatsApp bot running on a cloud VM using FastAPI, Evolution API, Docker, EasyPanel, and GCP.

This setup gives you:

- Full control over infrastructure
- No dependency on expensive SaaS platforms
- Production-ready container deployment
- Scalable architecture

From here, you can extend your bot with:

AI integrations : connect your bot to ChatGPT or Gemini or Claude so it can answer questions intelligently instead of just sending fixed replies.

Database storage: save incoming messages, user details, or conversation history to a database like PostgreSQL or MongoDB.

Custom automation workflows trigger actions based on keywords, like sending a PDF when someone types "menu" or booking an appointment when they type "schedule".

CRM integrations :connect your bot to tools like HubSpot or Notion to automatically log leads and customer conversations.Building your own infrastructure is one of the best ways to deeply understand how modern backend systems work together.

Happy building!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build and Deploy a Production-Ready WhatsApp Bot with FastAPI, Evolution API, Docker, EasyPanel, and GCP",
  "desc": "WhatsApp bots are widely used for customer support, automated replies, notifications, and internal tools. Instead of relying on expensive third-party platforms, you can build and deploy your own self-",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-and-deploy-a-production-ready-whatsapp-bot.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
