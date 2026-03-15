---
lang: en-US
title: "How to Troubleshoot Ghost CMS: Fixing WSL, Docker, and ActivityPub Errors"
description: "Article(s) > How to Troubleshoot Ghost CMS: Fixing WSL, Docker, and ActivityPub Errors"
icon: iconfont icon-git
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
      content: "Article(s) > How to Troubleshoot Ghost CMS: Fixing WSL, Docker, and ActivityPub Errors"
    - property: og:description
      content: "How to Troubleshoot Ghost CMS: Fixing WSL, Docker, and ActivityPub Errors"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/fix-ghost-cms-errors.html
prev: /devops/docker/articles/README.md
date: 2026-03-20
isOriginal: false
author:
  - name: Abdul Talha
    url: https://freecodecamp.org/news/author/abdultalha3226/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/85f5e0bb-26ff-42ce-ba66-afec6df4bb5d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Troubleshoot Ghost CMS: Fixing WSL, Docker, and ActivityPub Errors"
  desc="Setting up Ghost CMS (Content Management System) on your local machine is a great way to develop themes and test new features. But if you're using Windows or Docker, you might run into errors that sto"
  url="https://freecodecamp.org/news/fix-ghost-cms-errors"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/85f5e0bb-26ff-42ce-ba66-afec6df4bb5d.png"/>

Setting up Ghost CMS (Content Management System) on your local machine is a great way to develop themes and test new features. But if you're using Windows or Docker, you might run into errors that stop your progress. And debugging takes time away from your actual development work.

In this guide, you'll learn the root causes and exact fixes for three common Ghost CMS deployment errors:

- **Error 1:** SQLite installation failures on Windows.
- **Error 2:** Docker containers crashing with Code 137 (memory limits).
- **Error 3:** "Loading Interrupted" errors in the ActivityPub Network tab.

By the end of this article, you'll have a stable, working local Ghost setup. You'll know how to properly use WSL for Node.js apps, manage Docker resources, and successfully configure Ghost's new social web features.

---

## Error 1: SQLite Installation Failures on Windows

::: critical The Symptom

When you run the command `ghost install local` on a Windows machine, the setup fails. You will see a long list of red text in your terminal that looks like this:

```plaintext
Error: Cannot find module 'sqlite3'
...
node-pre-gyp ERR! stack Error: Failed to execute...
...
MSB4019: The imported project "C:\Microsoft.Cpp.Default.props" was not found.
```

The error usually mentions "sqlite3" and says it "failed to execute" or is "missing."

:::

::: important The Cause

Ghost uses SQLite to store your blog's data. SQLite is a "native module." This means it needs a small piece of code that must be built to fit your computer's system perfectly.

Because Ghost was created to run on Linux servers, it expects to find Linux build tools to make these files. Windows uses different tools and a different way of organising files. When the Ghost CLI tries to build the SQLite files on Windows, it can't find the tools it needs, so the installation stops. Using WSL gives Ghost the Linux environment it expects.

:::

::: tip How to Fix it:

You can use Windows Subsystem for Linux (WSL) to create a working setup.

1. Open your WSL terminal (like Ubuntu).
2. Check your tools by running `node --version`, `npm --version`, and `python3 --version`.
3. Install the Ghost CLI globally inside WSL:

```sh
npm i -g ghost-cli@latest
```

4. Run the local setup command:

```sh
ghost install local
```

5. Start the server:

```sh
ghost start
```

:::

::: info How to Verify:

Open your web browser and go to `http://localhost:2368`. You should see the default Ghost welcome page load without errors.

:::

---

## Error 2: Docker Container Exiting with Code 137

::: critical The Symptom:

When you're running Ghost using Docker Compose, the containers crash. The terminal logs show `Ghost admin container exiting with code 137` or `Admin service killed due to memory constraints`.

:::

::: important The Cause:

So why does this happen? Well, error code 137 means your computer ran out of memory (RAM) and stopped the container. This usually happens if you try to run the full Ghost developer setup (which includes 15+ extra tools) on a standard computer.

:::

::: tip How to Fix it:

To fix this error, you can switch from the complex setup to a simple setup using the official Ghost Docker image.

To do this, first stop and remove the broken containers:

```sh
docker-compose down -v
docker system prune -a
```

Then create a new <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file with only the basic tools (Ghost and a database):

```yaml :collapsed-lines title="docker-compose.yml"
services:
  ghost:
    image: ghost:latest
    restart: always
    ports:
      - "2368:2368"
    environment:
      database__client: mysql
      database__connection__host: mysql
      database__connection__user: root
      database__connection__password: yourpassword
      database__connection__database: ghost
      url: http://localhost:2368
    volumes:
      - ghost_content:/var/lib/ghost/content

  mysql:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: yourpassword
      MYSQL_DATABASE: ghost
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  ghost_content:
  mysql_data:
```

Then start the simple setup:

```plaintext
docker-compose up -d
```

:::

::: info How to Verify:

Type `docker-compose ps` in your terminal. You should see both the `ghost` and `mysql` containers listed with a status of "Up".

---

## Error 3: "Loading Interrupted" in Network Analytics

::: critical The Symptom:

When you click the **Analytics → Network** tab in your local Ghost admin panel, the page shows a "Loading Interrupted" error. Your terminal logs show 404 errors and webhook failures:

```plaintext
INFO "GET /.ghost/activitypub/v1/feed/reader/" 404 52ms
ERROR No webhook secret found - cannot initialise
```

:::

::: important The Cause:

The Network tab acts as an ActivityPub reader, not a normal analytics dashboard. This error happens because ActivityPub is not set up for local use. It needs extra tools (Caddy, Redis) and a clean web address without port numbers to work.

:::

::: tip How to Fix it:

To fix this error, just run Ghost with its required Docker tools and update your local config file to turn on the social web features.

First, start the required tools (Caddy, MySQL, Redis) from your Ghost folder:

```sh
SSH_AUTH_SOCK=/dev/null docker compose up -d caddy mysql redis
```

Then open your <VPIcon icon="iconfont icon-sjon"/>`config.local.json` file. Set the URL to a clean localhost address (remove the `:2368` port) and turn on the developer features:

```json title=config.local.json"
{
    "url": "http://localhost",
    "social_web_enabled": true,
    "enableDeveloperExperiments": true
}
```

Stop your current Ghost process:

```sh
pkill -f "yarn dev:ghost"
```

And restart Ghost with the new settings:

```sh
yarn dev:ghost
```

:::

::: info How to Verify:

Log back into your Ghost admin panel and click **Analytics → Network**. The error message will be gone, and you will see the ActivityPub feed instead.

---

## Conclusion

Local setups can be hard, especially when mixing Windows, Docker, and new features like ActivityPub.

By fixing these three errors, you did more than just get Ghost running. You learned how to bypass Windows limits using WSL, how to manage Docker memory, and how Ghost routes social web traffic.

You now have a stable, fast, and fully working Ghost CMS workspace ready for your content.

::: info Let’s connect!

You can find my latest work on my [<VPIcon icon="fas fa-globe"/>Technical Writing Portfolio](https://blog.abdultalha.tech/portfolio) or reach out to me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`abdul-talha`)](https://linkedin.com/in/abdul-talha/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Troubleshoot Ghost CMS: Fixing WSL, Docker, and ActivityPub Errors",
  "desc": "Setting up Ghost CMS (Content Management System) on your local machine is a great way to develop themes and test new features. But if you're using Windows or Docker, you might run into errors that sto",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/fix-ghost-cms-errors.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
