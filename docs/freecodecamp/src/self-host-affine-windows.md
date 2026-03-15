---
lang: en-US
title: "How to Self-Host AFFiNE on Windows with WSL and Docker"
description: "Article(s) > How to Self-Host AFFiNE on Windows with WSL and Docker"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Windows
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - win
  - windows
  - wsl
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Self-Host AFFiNE on Windows with WSL and Docker"
    - property: og:description
      content: "How to Self-Host AFFiNE on Windows with WSL and Docker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/self-host-affine-windows.html
prev: /devops/docker/articles/README.md
date: 2026-03-13
isOriginal: false
author:
  - name: Abdul Talha
    url: https://freecodecamp.org/news/author/abdultalha3226/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/950eee10-aa2c-4071-9c40-abaf759f6d10.png
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

```component VPCard
{
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/win/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Self-Host AFFiNE on Windows with WSL and Docker"
  desc="Depending on cloud apps means that you don't truly own your notes. If your internet goes down or if the company changes its rules, you could lose access. In this article, you'll learn how to build you"
  url="https://freecodecamp.org/news/self-host-affine-windows"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/950eee10-aa2c-4071-9c40-abaf759f6d10.png"/>

Depending on cloud apps means that you don't truly own your notes. If your internet goes down or if the company changes its rules, you could lose access.

In this article, you'll learn how to build your own private workspace using AFFiNE. You'll use Docker Compose to link three separate pieces of software together:

- The AFFiNE Core application.
- A PostgreSQL database to store your notes and pages.
- A Redis cache to make the app run fast and smooth.

By the end of this article, you'll have a fully functional web app running on your own computer that works just like the cloud version of Notion.

---

## What is AFFiNE?

AFFiNE is an "all-in-one" workspace that combines the powers of writing, drawing, and planning.

While tools like Notion focus on documents and Miro focus on whiteboards, AFFiNE lets you do both in a single space. You can turn your written notes into a visual canvas with one click. This makes it perfect for brainstorming, tracking tasks, and managing your personal knowledge.

### The Power of Self-Hosting

While AFFiNE offers a cloud version, hosting it yourself gives you three major benefits:

- **Total data ownership:** Your notes never leave your machine. You own the database.
- **Privacy in the AI age:** No big tech company can scan your private ideas or use them for AI training.
- **Real DevOps skills:** Learning how to manage Docker inside WSL is a high-value skill for any modern developer.

---

## Prerequisites

To follow this article, make sure you have these tools ready on your machine:

- **WSL 2 Installation:** You must have WSL installed if you are using Windows (I am using Ubuntu for this guide).
- **Docker and Docker Compose:** These must be installed and running on your machine.
- **Linux Terminal Commands:** You should be familiar with basic commands like `mkdir`, `cd`, and `wget`.

---

## Step 1: Preparing Your Workspace

To start, create a folder for your AFFiNE files. This keeps your data in one organised place.

Then open your WSL terminal and run these commands:

```sh
mkdir affine
cd affine
```

![A terminal Showing the commands `mkdir` and `cd`](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/021e4aef-ede1-4bec-b96e-2acaea9d8f40.png)

---

## Step 2: Getting the Official Setup Files

You will download the official configuration files directly from the AFFiNE. In your WSL terminal, run these two commands:

```sh
# 1. Download the Docker Compose file:
wget -O docker-compose.yml https://github.com/toeverything/affine/releases/latest/download/docker-compose.yml
# 2. Download the Environment template:
wget -O .env https://github.com/toeverything/affine/releases/latest/download/default.env.example
```

![A terminal Showing the commands to download affine](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/5b366a5f-b426-4e70-95c0-b469f40d6af5.png)

---

## Step 3: Configuring Your Environment (.env)

The <VPIcon icon="iconfont icon-dotenv"/>`.env` file is like a hidden settings sheet. It keeps your passwords and setup details private.

To edit this file, you can use Nano, which is a simple text editor built into your Linux terminal. Follow these steps to update your settings:

### 1. Open the file with Nano

```sh
nano .env
```

### 2. Update the settings:

Use your arrow keys to move around the file. Update these specific lines to match the locations below. This keeps your data safely inside your new <VPIcon icon="fas fa-folder-open"/>`affine` folder:

```sh title=".env"
DB_DATA_LOCATION=./postgres
UPLOAD_LOCATION=./storage
CONFIG_LOCATION=./config

DB_USERNAME=affine
DB_PASSWORD=
DB_DATABASE=affine
```

![A terminal to change the values in `.env` file](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/d0f4a358-e221-45d3-94df-d97b606b4afc.png)

### 3. Save and Exit

Press <kbd>Ctrl</kbd>+<kbd>O</kbd> to save.

- Press <kbd>Enter</kbd> to confirm the filename.
- Press <kbd>Ctrl</kbd>+<kbd>X</kbd> to exit the editor.

---

## Step 4: Launching the System

Run this Docker command to build your workspace:

```sh
docker compose up -d
```

Docker will download the AFFiNE app and a Postgres database. The `-d` flag means it will run quietly in the background.

![A terminal Showing the commands for docker compose](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/407237bd-f805-4fca-b15c-6bf001f467e7.png)

---

## Step 5: Accessing the Admin Panel

Once the terminal says "Started," your private server is live!

Open your web browser and go to:

```plaintext
http://localhost:3010/
```

The first time you visit this page, you must create an admin account. This is the master key to your server.

![creating an Admin account](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/780fafda-0afd-4b67-a2fa-6248b4d5d4f3.png)

---

## Step 6: Configuration (Making It Yours)

There are two ways to configure your server.

### The Easy Way: Admin Panel

In your browser, go to `localhost:3010/admin/settings`. You can change your server name or set up emails here.

![Overview of the settings page](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/0f8d4e97-7a47-4328-8e91-a36582d47143.png)

### The Developer Way: Config File

You can also create a <VPIcon icon="iconfont icon-json"/>`config.json` file inside your <VPIcon icon="fas fa-folder-open"/>`config` folder.

```json title="config/config.json"
{
  "$schema": "https://github.com/toeverything/affine/releases/latest/download/config.schema.json",
  "server": {
    "name": "My Private Workspace"
  }
}
```

---

## Step 7: Connecting the Desktop App (Optional)

You don't have to use the browser. You can connect the official AFFiNE desktop app.

1. Download the AFFiNE desktop app.
2. Click the workspace list panel in the top left corner.
3. Click "Add Server" and enter `localhost:3010`.
4. Log in with your account.

![Connecting your local server to Affine Server](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/2c668ed4-3552-420f-9217-e5f8d09f311c.png) 

![Overview of Workspace](https://cdn.hashnode.com/uploads/covers/6729b04417afd6915f5c2e3e/3a12b7f6-33b9-497e-8684-7fd7a09d8c42.png)

---

## Step 8: Stopping the Server and Safe Backups

You must turn your server off safely before you back up your notes.

To do that, run this command:

```sh
docker compose down
```

Once it stops, you can safely copy your entire <VPIcon icon="fas fa-folder-open"/>`affine` folder to a safe place.

---

## Step 9: How to Upgrade Later

When AFFiNE releases a new version, run these commands inside your <VPIcon icon="fas fa-folder-open"/>`affine` folder:

```sh
# 1. Download the newest blueprint:
wget -O docker-compose.yml https://github.com/toeverything/affine/releases/latest/download/docker-compose.yml
# 2. Pull the new images and restart:
docker compose pull
docker compose up -d
```

---

## Common Installation Errors and Troubleshooting

### 1. Docker is Not Running

- **The Error:** Terminal says `docker: command not found`.
- **The Fix:** Open the Docker Desktop app on Windows and wait for it to start.

### 2. Docker is Not Connected to WSL

- **The Fix:** In Docker Desktop, go to **Settings > Resources > WSL Integration** and turn it ON for your distro.

### 3. The Port is Already in Use

- **The Fix:** Open `docker-compose.yml`. Change `"3010:3010"` to `"4000:3010"`. You will now visit `localhost:4000`.

### 4. Permission Denied

- **The Fix:** If you cannot delete a folder, use the sudo command: `sudo rm -rf affine/`.

---

## Conclusion

In this tutorial, you've successfully built a self-hosted, private workspace. You practised using WSL, Docker Compose, and Postgres. These are valuable skills for any developer.

**Your next steps:**

1. Create a note in AFFiNE documenting what you learned.
2. Turn off your server (`docker compose down`) and copy your folder to a backup drive.
3. Explore Cloudflare Tunnels if you want to access your server from your phone!

Self-hosting takes a little work, but the privacy is worth it.

::: info Let’s connect!

You can find my latest work on my [<VPIcon icon="fas fa-globe"/>Technical Writing Portfolio](https://blog.abdultalha.tech/portfolio) or reach out to me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`abdul-talha`)](https://linkedin.com/in/abdul-talha/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Self-Host AFFiNE on Windows with WSL and Docker",
  "desc": "Depending on cloud apps means that you don't truly own your notes. If your internet goes down or if the company changes its rules, you could lose access. In this article, you'll learn how to build you",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/self-host-affine-windows.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
