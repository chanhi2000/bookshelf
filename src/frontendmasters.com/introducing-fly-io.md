---
lang: en-US
title: "Introducing Fly.io"
description: "Article(s) > Introducing Fly.io"
icon: fa-brands fa-fly
category:
  - DevOps
  - Fly
  - Docker
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - devops
  - fly
  - fly-io
  - docker
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Introducing Fly.io"
    - property: og:description
      content: "Introducing Fly.io"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-fly-io.html
prev: /devops/fly/articles/README.md
date: 2024-12-12
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4742
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Fly > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/fly/articles/README.md",
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
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Introducing Fly.io"
  desc="If it can go in a Docker, Fly can host it, and they'll help you with that. Adam Rackis takes a look at the platform and shows off all the things he likes about it."
  url="https://frontendmasters.com/blog/introducing-fly-io/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4742"/>

[<FontIcon icon="fa-brands fa-fly"/>Fly.io](https://fly.io/)is an increasingly popular infrastructure platform. Fly is a place to deploy your applications, similar to Vercel or Netlify, but with some different tradeoffs.

This post will introduce the platform, show how to deploy web apps, stand up databases, and some other fun things. If you leave here wanting to learn more, [<FontIcon icon="fa-brands fa-fly"/>the docsare here](https://fly.io/docs/)and are outstanding.

---

## What is Fly?

Where platforms like Vercel and Netlify run your app on serverless functions which spin up and die off as needed (typically running on AWS Lambda), Fly runs your machines on actual VM’s, running in their infrastructure. These VMs can be configured to scale up as your app’s traffic grows, just like with serverless functions. But as the continuously run, there is no cold start issues. That said, if you’re on a budget, or your app isn’t that important (or both) you can also configure Fly to scale your app down to zero machines when traffic dies. You’ll be billed essentially nothing during those periods of inactivity, though your users will see a cold start time if they’re the first to hit your app during an inactive period.

To be perfectly frank, the cold start problem has been historically exaggerated, so please don’t pick a platform just to avoid cold starts.

---

## Why VMs?

You might be wondering why, if cold starts aren’t a big deal in practice, one should care about Fly using VMs instead of cloud functions. For me there’s two reasons: the ability to execute long-running processes, and the ability to run anything that will run in a Docker image. Let’s dive into both.

The ability to handle long-running processes greatly expands the range of apps Fly can run. They have turn-key solutions for Phoenix LiveView, Laravel, Django, Postgres, and lots more. Anything you ship on Fly will be via a Dockerfile (don’t worry, they’ll help you generate them). That means anything you can put into a Dockerfile, can be run by Fly. If there’s a niche database you’ve been wanting to try (Neo4J, CouchDB, etc), just stand one up via a Dockerfile (and both of those DBs have official images), and you’re good to go. New databases, new languages, new anything: if there’s something you’ve been wanting to try, you can run it on Fly if you can containerize it; and anything can be containerized.

---

## But… I don’t know Docker

Don’t worry, Fly will, as you’re about to see, help you scaffold a Dockerfile from any common app framework. We’ll take a quick look at what’s generated, and explain the high points.

That said, Docker is one of the most valuable tools for a new engineer to get familiar with, so if Fly motivates you to learn more, so much the better!

If you’d like to go deeper on Docker, our course [<FontIcon icon="fas fa-globe"/>Complete Intro to Containers](https://frontendmasters.com/courses/complete-intro-containers-v2/) from Brian Holt is fantastic.

---

## Let’s launch an app!

Let’s ship something. We’ll create a brand new Next.js app, using the standard scaffolding[<FontIcon icon="iconfont icon-nextjs"/>here](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

We’ll create an app, run`npm i`and then`npm run dev`and verify that it works.

![screenshot of a running Next.js app](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-1-next-app.png?resize=1024%2C764&ssl=1)

Now let’s deploy it to Fly. If you haven’t already, install the Fly CLI, and sign up for an account. Instructions can be found in the first few steps of the[<FontIcon icon="fa-brands fa-fly"/>quick start guide](https://fly.io/docs/getting-started/launch/).

To deploy an app on Fly, you need to containerize your app. We*could*manually piece together a valid Dockerfile that would run our Next app, and then run`fly deploy`. But that’s a tedious process. Thankfully Fly has made life easier for us. Instead, we can just run`fly launch`from our app’s root directory.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-2-fly-launch-initial.png?resize=1024%2C419&ssl=1)

Fly easily *detected* Next.js, and then made some best guesses as to deployment settings. It opted for the third cheapest deployment option. Here’s [<FontIcon icon="fa-brands fa-fly"/>Fly’s full pricing information](https://fly.io/docs/about/pricing/). Fly let’s us accept these defaults, or tweak them. Let’s hit yes to tweak. We should be taken to the fly.io site, where our app is in the process of being set up.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-3-default-settings.png?resize=1024%2C751&ssl=1)

For fun, let’s switch to the cheapest option, and change the region to Virginia (what AWS would call us-east-1).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-4-updated-settings.png?resize=1024%2C751&ssl=1)

Hit confirm, and return to your command line. It should finish setting everything up, which should look like this, in part.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-5-cli-finish.png?resize=1024%2C454&ssl=1)

If we head over to our[<FontIcon icon="fa-brands fa-fly"/>Fly dashboard](https://fly.io/dashboard), we should see something like this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-6-fly-dashboard.png?resize=1024%2C349&ssl=1)

We can then click that app and see the app’s details

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-7-app-in-dashboard.png?resize=1024%2C1018&ssl=1)

And lastly, we can go to the URL listed, and see the app actually running!

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-8-app-running.png?resize=1024%2C866&ssl=1)

---

## Looking closer

There’s a number of files that Fly created for us. The two most important are the <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`, and <FontIcon icon="iconfont icon-toml"/>`fly.toml`. Let’s take a look at each. We’ll start with the <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`.

```dockerfile :collapsed-lines title="Dockerfile"
# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.18.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
```

### A Quick Detour to Understand Docker

Docker is a book unto its own, but as an extremely quick intro: Docker allows us to package our app into an “image.” Containers allow you to start with an entire operating system (almost always a minimal Linux distro), and allow you to do whatever you want with it. Docker then packages whatever you create, and allows it to be run. The Docker image is completely self-contained. You choose the whatever goes into it, from the base operating system, down to whatever you install into the image. Again, they’re self-contained.

Now let’s take a quick tour of the important pieces of our Dockerfile.

After some comments and labels, we find what will always be present at the top of a Dockerfile: the `FROM` command.

```dockerfile title="Dockerfile"
FROM node:${NODE_VERSION}-slim as base
```

This tells us the base of the image. We could start with any random Linux distro, and then install Node and npm, but unsurprisingly there’s already an officially maintained Node image: there will almost always be officially maintained Docker images for almost any technology. In fact, [<FontIcon icon="fa-brands fa-docker"/>there’s many different Node images to choose from](https://hub.docker.com/_/node), many with different underlying base Linux distro’s.

There’s a `LABEL` that’s added, likely for use with Fly. Then we set the working directory in our image.

```dockerfile title="Dockerfile"
WORKDIR /app
```

We copy the <FontIcon icon="iconfont icon-json"/>`package.json` and lockfiles.

```dockerfile title="Dockerfile"
# Install node modules
COPY package-lock.json package.json ./
```

Then run`npm i`(but *in* our Docker image):

```dockerfile title="Dockerfile"
RUN npm ci --include=dev
```

Then we copy the rest of the application code:

```dockerfile title="Dockerfile"
# Copy application code
COPY . .
```

Hopefully you get the point. We won’t go over every line, here. But hopefully the general idea is clear enough, and hopefully you’d feel comfortable tweaking this if you wanted to. Two last points though. See this part:

```dockerfile title="Dockerfile"
# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3
```

That tells the Linux package manager to install some things Fly thinks Next might need, but in actuality[probably doesn’t (<FontIcon icon="fa-brands fa-x-twitter"/>`leeerob`)](https://x.com/leeerob/status/1862312276985868783). Don’t be surprised if these lines are absent when you read this, and try for yourself.

Lastly, if you were wondering why the <FontIcon icon="iconfont icon-json"/>`package.json` and lockfiles were copied, followed by`npm install`*and then*followed by copying the rest of the application code, the reason is (Docker) performance. Briefly, each line in the Dockerfile creates a “layer.” These layers can be cached and re-used if nothing has changed. If anything*has*changed, that invalidates the cache for that layer,*and also*all layers after it. So you’ll want to push your likely-to-change work as low as possible. Your application code will almost always change between deployments; the dependencies in your <FontIcon icon="iconfont icon-json"/>`package.json` will change much less frequently. So we do that install first, by itself, so it will be more likely to be cached, and speed up our builds.

I tried my best to provide the absolute minimal amount of a Docker intro to make this post make sense, without being overhwelming. I hope I’ve succeeded. If you’d like to learn more, there’s tons of books and YouTube videos, and even an entire course[<FontIcon icon="fas fa-globe"/>here on Frontend Masters](https://frontendmasters.com/courses/complete-intro-containers-v2/).

---

## Fly.toml

Now let’s take a peek at the <FontIcon icon="iconfont icon-toml"/>`fly.toml` file.

```toml :collapsed-lines title="fly.toml"
# fly.toml app configuration file generated for next-fly-test on 2024-11-28T19:04:19-06:00
#
# See https://fly.io/docs/reference/configuration/ for information about how to use this file.
#

app = 'next-fly-test'
primary_region = 'iad'

[build]

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = 'stop'
  auto_start_machines = true
  min_machines_running = 0
  processes = ['app']

[[vm]]
  size = 'shared-cpu-1x'
```

This is basically the config file for the Fly app. The options for this file are almost endless, and are documented[<FontIcon icon="fa-brands fa-fly"/>here](https://fly.io/docs/reference/configuration/). The three most important lines are the next three.

```toml title="fly.toml"
auto_stop_machines = 'stop'
```

This tells Fly to automatically kill machines when they’re not needed, when traffic is low on our app.

```toml title="fly.toml"
auto_start_machines = true
```

The line above tells Fly to automatically spin up new machines when it detects it needs to do so, given your traffic. Lastly, this line

```toml title="fly.toml"
min_machines_running = 0
```

That line allows us to tell Fly to always keep a minimum number of machines running, no matter how minimal your current traffic is. Setting it to zero allows for no machines to be running, which means your next visitor will see a slow response as the first machine spins up.

You may have noticed above that Fly spun up two machines initially, even though there was no traffic at all. It does this by default to give your app a higher availability, that is, in case anything happens to the one machine, the other will (hopefully) still be up and running. If you don’t want or need this, you can prevent it by passing`--ha=false`when you run`fly launch`or`fly deploy`(or you can just kill one of the machines in the dashboard - Fly will not re-create it on subsequent deploys).

### Machines won’t bill you if they’re not running

When a machine is not running, you’ll be billed*essentially*zero for it. You’ll just pay $0.15 per GB, per month, per machine (machines will usually have only one GB).

---

## Adding a database

You can launch a Fly app anytime with just a Dockerfile. You could absolutely find an official Postgres Docker image and deploy from that. But it turns out Fly has this built in. Let’s run`fly postgres create`in a terminal, and see what happens

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-10-fly-pg-created.png?resize=1024%2C381&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-9-fly-postgres-create.png?resize=1024%2C299&ssl=1)

It’ll ask you for a name and a region, and then how serious of a Postgres setup you want. Once it’s done, it’ll show you something like this.

![Fly postgres create](https://i0.wp.com/adam-rackis-blog-staging.fly.dev/fly-io/img-10-fly-pg-created.png?ssl=1)

The connection string listed at the bottom can be used to connect to your db*from within another Fly app*(which you own). But to run database creation and migration scripts, and for local development you’ll need to connect to this db on your local machine. To do that, you can run this:

```sh
fly proxy 5432 -a <YOUR_APP_NAME>
```

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/img-11-fly-proxy.png?resize=902%2C122&ssl=1)

[<FontIcon icon="fa-brands fa-fly"/>Now you can connect](https://fly.io/docs/postgres/connecting/) via the same connection string on your local machine, but on`localhost:5432`instead of`flycast:5432`.

### Making your database publicly available

It’s not ideal, but if you want to [<FontIcon icon="fa-brands fa-fly"/>make your Fly pg box publicly available](https://fly.io/docs/postgres/connecting/connecting-external/), you can. You basically have to add a dedicated ipv4 address to it (at a cost of $2 per month), and then tweak your config.

### Consider using a dedicated host for serious applications

Fly’s[<FontIcon icon="fa-brands fa-fly"/>built-in Postgres support](https://fly.io/docs/postgres/)is superb, but there’s some things you’ll have to[<FontIcon icon="fa-brands fa-fly"/>manage yourself](https://fly.io/docs/postgres/getting-started/what-you-should-know/#heres-what-you-manage). If that’s not for you,[<FontIcon icon="iconfont icon-supabase"/>Supabase](https://supabase.com/)is a fully managed pg host, and it’s also superb. Fly even has[<FontIcon icon="fa-brands fa-fly"/>a service](https://fly.io/docs/supabase/)for creating Supabase db’s on Fly infra, for extra low latency. It’s currently only in public alpha, but it might be worth keeping an eye on.

---

## Interlude

If you just want a nice place to deploy your apps, what we’ve covered will suffice for the vast majority of use cases. I could stop this post here, but I’d be remiss if I didn’t show some of the cooler things you can do with Fly. Please don’t let what follows be indicative of the complexity you’ll normally deal with. We’ll be putting together a cron job for running Postgres backups. In practice, you’ll just use a mature DB provider like Supabase or PlanetScale, which will handle things like this for you.

But sometimes it’s fun to tinker, especially for side projects. So let’s kick the tires a bit and see what we can come up with.

---

## Having Fun

One of Fly’s greatest strengths is its flexibility. You give it a Dockerfile, and it’ll run it. To drive that point home, let’s conclude this post with a fun example.

As much as I love Fly, it makes me a*little*uneasy that my database is running isolated in some VM under my account. Accidents happen, and I’d want automatic backups. Why don’t we build a Docker image to do just that?

I’ll want to run a script, written in TypeScript, preferably without hating my life: Bun is ideal for this. I’ll also need to run the actual`pg_dump`command. So what should I build my Dockerfile from: the bun image, which would lack to pg utilities, or the pg base, which wouldn’t have bun installed. I could do either, and use the Linux package manager to install what I need. But really, there’s a simpler way: use a multi-stage Docker build. Let’s see the whole Dockerfile

```dockerfile :collapsed-lines title="Dockerfile"
FROM oven/bun:latest AS BUILDER

WORKDIR /app

COPY . .

RUN ["bun", "install"]
RUN ["bun", "build", "index.ts", "--compile", "--outfile", "run-pg_dump"]

FROM postgres:16.4

WORKDIR /app
COPY --from=BUILDER /app/run-pg_dump .
COPY --from=BUILDER /app/run-backup.sh .

RUN chmod +x ./run-backup.sh

CMD ["./run-backup.sh"]
```

We start with a Bun image. We run a`bun install`to tell Bun to install what we need: aws sdk’s and such. Then we tell Bun to compile our script into a standalone executable: yes, Bun can do that, and yes: it’s that easy.

```dockerfile title="Dockerfile"
FROM postgres:16.4
```

Tells Docker to start a new stage, from a new (Postgres) base.

```dockerfile title="Dockerfile"
WORKDIR /app
COPY --from=BUILDER /app/run-pg_dump .
COPY --from=BUILDER /app/run-backup.sh .

RUN chmod +x ./run-backup.sh

CMD ["./run-backup.sh"]
```

This drops into the <FontIcon icon="fas fa-folder-open"/>`/app` folder from the prior step, and copies over the`run-pg_dump`file, which Bun compiled for us, and also copies over<FontIcon icon="iconfont icon-shell"/>`run-backup.sh`. This is a shell script I wrote. It runs`pg_dump`a few times, to generate the files the Bun script (`run-pg_dump`) is expecting, and then calls it. Here’s what that file looks like:

```sh{1} title="run-backup.sh"
#!/bin/sh

PG_URI_CLEANED=$(echo ${PG_URI} | sed -e 's/^"//' -e 's/"$//')

pg_dump ${PG_URI_CLEANED} -Fc > ./backup.dump

pg_dump ${PG_URI_CLEANED} -f ./backup.sql

./run-pg_dump
```

This unhinged line:

```sh
PG_URI_CLEANED=$(echo ${PG_URI} | sed -e 's/^"//' -e 's/"$//')
```

is something ChatGPT helped me write, to strip the double quotes from my connection string environment variable.

Lastly, if you’re curious about the <FontIcon icon="iconfont icon-typescript"/>`index.ts` file Bun compiled into a standalone executable, this is it:

```tsx title="index.ts"
import fs from "fs";
import path from "path";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const numToDisplay = (num: number) => num.toString().padStart(2, "0");

const today = new Date();
const date = `${today.getFullYear()}/${numToDisplay(today.getMonth() + 1)}/${numToDisplay(today.getDate())}`;
const time = `${today.getHours()}-${numToDisplay(today.getMinutes())}-${numToDisplay(today.getSeconds())}`;
const filename = `${date}/${time}`;

const REGION = "us-east-1";
const dumpParams = {
  Bucket: "my-library-backups",
  Key: `${filename}.dump`,
  Body: fs.readFileSync(path.resolve(__dirname, "backup.dump")),
};
const sqlParams = {
  Bucket: "my-library-backups",
  Key: `${filename}.sql`,
  Body: fs.readFileSync(path.resolve(__dirname, "backup.sql")),
};

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ID!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

s3.send(new PutObjectCommand(sqlParams))
  .then(() => {
    console.log("SQL Backup Uploaded!");
  })
  .catch(err => {
    console.log("Error: ", err);
  });

s3.send(new PutObjectCommand(dumpParams))
  .then(() => {
    console.log("Dump Backup Uploaded!");
  })
  .catch(err => {
    console.log("Error: ", err);
  });`
```

I’m sure someone who’s actually good with Docker could come up with something better, but this works well enough.

To see this whole thing all together, in one place, you can [see it in my GitHub (<FontIcon icon="iconfont icon-github"/>`arackaf/booklist`)](https://github.com/arackaf/booklist/tree/master/data/my-library-pg-backup).

### Scheduling a custom job

We have a working, valid Docker image. How do we tell Fly to run it on an interval? Fly has a command just for that:[<FontIcon icon="fa-brands fa-fly"/>`fly machine run`](https://fly.io/docs/flyctl/machine-run/). In fact, it can take a`schedule`argument, to have Fly run it on an interval. Unfortunately, the options are horribly limited: only hourly, daily, and monthly. But, as a workaround you can run this command at different times: this will set up executions at whatever interval you selected, scheduled off of when you ran the command.

```sh
fly machine run . --schedule=daily
```

If you ran that command at noon, that will schedule a daily task that runs at noon every day. If you run that command again at 5pm, it will schedule a*second*task to run daily, at 5pm (without interfering with the first). Each job will have a dedicated machine, but will be idle when not running, which means it will cost you almost nothing; you’ll pay the normal $0.15 per month, per GB on the machine.

I hate this limitation in scheduling machines. In theory there’s [a true cron job templatehere (<FontIcon icon="iconfont icon-github"/>`fly-apps/cron-manager`)](https://github.com/fly-apps/cron-manager), but it’s not the simplest thing to look through.

<SiteInfo
  name="fly-apps/cron-manager"
  desc="Cron Manager is designed to enhance the way you manage Cron jobs on Fly.io."
  url="https://github.com/fly-apps/cron-manager/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4ce864029beedfc4a95adffa8b9eea931eb501593e4475abbffa8046c23af0f6/fly-apps/cron-manager"/>

---

## Odds and ends

That was a lot. Let’s lighten things up a bit with some happy odds and ends, before we wrap up.

### Custom domains

Fly makes it easy to add a custom domain to your app. You’ll just need to add the right records. [<FontIcon icon="fa-brands fa-fly"/>Full instructions arehere](https://fly.io/docs/networking/custom-domain/).

### Secrets

You’ll probably have some secrets you want run in your app, in production. If you’re thinking you could just bundle a `.env.prod` file into your Docker image, yes, you could. But that’s considered a bad idea. Instead, leverage [<FontIcon icon="fa-brands fa-fly"/>Fly’s secret management](https://fly.io/docs/js/the-basics/secrets/).

---

## Learning More

This post started brushing up against some full-stack topics. If this sparked your interest, be sure to check out the[<FontIcon icon="fas fa-globe"/>entire courseon full-stack engineering](https://frontendmasters.com/courses/fullstack-v3/) here on Frontend Masters.

---

## Wrapping Up

The truth is we’ve truly, barely scratched the surface of Fly. For simple side projects what we’ve covered here is probably more than you’d need. But Fly also has power tools available for advanced use cases. The sky’s the limit!

Fly.io is a wonderful platform. It’s fun to work with, will scale to your application’s changing load, and is incredibly flexible. I urge you to give it a try for your next project.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing Fly.io",
  "desc": "If it can go in a Docker, Fly can host it, and they'll help you with that. Adam Rackis takes a look at the platform and shows off all the things he likes about it.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-fly-io.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
