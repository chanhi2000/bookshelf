---
lang: en-US
title: "How to Deploy a MERN Stack Notes App on AWS"
description: "Article(s) > How to Deploy a MERN Stack Notes App on AWS"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Node.js
  - Express.js
  - React.js
  - Data Science
  - MongoDB
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - react
  - reactjs
  - react-js
  - data-science
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy a MERN Stack Notes App on AWS"
    - property: og:description
      content: "How to Deploy a MERN Stack Notes App on AWS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-mern-stack-notes-app-aws.html
prev: /devops/aws/articles/README.md
date: 2026-01-17
isOriginal: false
author:
  - name: Umair Mirza
    url : https://freecodecamp.org/news/author/umairmirza/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768616328012/274a3de8-32bb-4b56-9f71-0f0723541c7d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Deploy a MERN Stack Notes App on AWS"
  desc="Platforms like Vercel, Netlify, and Render simplify deployment by handling infrastructure for you. In this tutorial, we’ll step one layer deeper and work directly with AWS to understand the building blocks behind these platforms. You'll take a small ..."
  url="https://freecodecamp.org/news/how-to-deploy-mern-stack-notes-app-aws"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768616328012/274a3de8-32bb-4b56-9f71-0f0723541c7d.png"/>

Platforms like Vercel, Netlify, and Render simplify deployment by handling infrastructure for you. In this tutorial, we’ll step one layer deeper and work directly with AWS to understand the building blocks behind these platforms.

You'll take a small React and Express notes app and ship it straight to AWS. We'll use EC2 for the API, RDS Postgres for the database, and S3 (optionally CloudFront) for the frontend. If you're new to AWS, you can turn on the Free Tier first:

```component VPCard
{
  "title": "Free Cloud Computing Services - AWS Free Tier",
  "desc": "Gain hands-on experience with the AWS platform, products, and services for free with the AWS Free Tier offerings. Browse 100 offerings for AWS free tier services.",
  "link": "https://aws.amazon.com/free/",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

If you’ve mostly used one-click deployments before, this guide will help you understand what’s happening behind the scenes. You’ll work directly with the core AWS services involved, focusing only on the pieces that matter so you can see how everything fits together. This will also enable you to have more control over cost, security, and scaling.

If you just want to grab the finished code, it's all in this public repo: [umair-mirza/mern-notes-aws (<VPIcon icon="iconfont icon-github" />`umair-mirza/mern-notes-aws`)](https://github.com/umair-mirza/mern-notes-aws). You can clone or fork it and follow along without creating a new project from scratch.

---

## What You’ll Build

Before touching any buttons in AWS, it's helpful to know the exact pieces you're trying to build. At the end of this guide, you'll have a classic three-tier web app: a browser-based frontend, a backend API, and a database, all talking to each other over a network.

- API (Express/Node) on EC2
- Postgres on RDS (Free Tier eligible)
- React/Vite frontend on S3 (CloudFront optional for CDN/HTTPS)
- Health check at `/api/health` and CRUD at `/api/notes`

::: note Prerequisites

You don't need to be a DevOps expert to follow along, but you should be comfortable running basic commands in a terminal and editing some config files. If you've ever used `npm install` before, then you're in the right place.

- AWS account + AWS CLI configured (`aws configure`) – see [<VPIcon icon="fa-brands fa-aws"/>AWS account setup](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html) and [<VPIcon icon="fa-brands fa-aws"/>AWS CLI install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
- Node.js 18+ and npm – get it from [<VPIcon icon="fa-brands fa-node"/>nodejs.org.](https://nodejs.org/)
- Git + GitHub repo – see [<VPIcon icon="iconfont icon-github"/>GitHub getting started](https://docs.github.com/en/get-started).
- (Optional) Route 53 domain for a clean URL – [<VPIcon icon="fa-brands fa-aws"/>Route 53 domains](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html).

:::

---

## Mental Map

AWS throws a lot of jargon at you (VPCs, security groups, subnets). This section is the story version of what happens when someone opens your app in the browser, without any buzzwords. If you can picture this flow, the later AWS screens will feel less scary.

- Browser loads the built React app from S3 (or CloudFront -> S3)
- Browser calls the API on EC2 over HTTP/HTTPS
- EC2 talks to RDS Postgres on port 5432 inside your VPC
- Security groups: allow 80/443 to EC2; allow 5432 only from the EC2 SG to RDS

---

## Free Tier Basics

AWS can be cheap if you use the free tier, but it can also surprise you with bills if you accidentally orprovision or leave things running. Here are the main knobs that affect cost for this tutorial and what to watch out for.

- EC2: `t2.micro` or `t3.micro` ~750 hours/month
- RDS: `db.t3.micro` Postgres/MySQL with ~20 GB storage
- S3/CloudFront: Small sites cost pennies - free tier includes some egress
- Save money: Stop EC2 when idle. Delete unused buckets/DBs

---

## Environment Variables

Environment variables are just configuration values that live outside your code: ports, database URLs, and allowed origins. They keep secrets (like DB passwords) out of your Git repo and let the same code run in different places (local, staging, production) with different settings.

- Backend: `PORT`, `DATABASE_URL` (your RDS endpoint), `DATABASE_SSL` (`true` on RDS), `CORS_ORIGIN`
- Frontend: `VITE_API_URL` (API base, for example, `https://api.example.com/api`)

---

## Step #1 - Run It Locally First

Before touching AWS, you want to prove the app actually works on your own machine. This removes a whole category of "Is it AWS or my code?" debugging later. In this step you just install dependencies and run both backend and frontend in dev mode.

```sh
cd mern-notes-aws

# Backend
cd backend
npm install
cp .env.example .env   # set DATABASE_URL to RDS (or local Postgres), DATABASE_SSL=true for RDS
npm run dev            # API on http://localhost:4000

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env   # keep API URL at http://localhost:4000/api for local dev
npm run dev            # SPA on http://localhost:5173
```

Open `http://localhost:5173`, add a note, and check if it persists. `/api/health` should return `{ status: 'ok' }`. If something is broken here, pause and fix it before moving on. AWS will only make debugging harder.

---

## Step #2 - Push to GitHub (So EC2 Can Pull)

Your EC2 server in AWS needs a place to pull your code from. Using GitHub is the simplest option: you push your code once, then the EC2 instance clones that repo. You can also reuse this repo later with CI/CD if you decide to automate deployments.

```sh
cd mern-notes-aws
git init
git add .
git commit -m "feat: mern notes app"
git branch -M main
git remote add origin https://github.com/<you>/mern-notes-aws.git
git push -u origin main
```

If you're following along with my example repo instead of creating your own, you can simply fork [umair-mirza/mern-notes-aws (<VPIcon icon="iconfont icon-github" />`umair-mirza/mern-notes-aws`)](https://github.com/umair-mirza/mern-notes-aws) and use that as your remote.

Before pushing, make sure your <VPIcon icon="iconfont icon-dotenv"/>`.env` file is **not committed to GitHub**. Add it to your `.gitignore` so secrets like database passwords never end up in version control:

```sh
echo ".env" >> .gitignore
```

If you’ve already created a <VPIcon icon="iconfont icon-dotenv"/>`.env` file locally, double-check it doesn’t appear in `git status` before committing.

---

## Step #3 - Create AWS Resources (Quick Path)

### RDS (Postgres, Free Tier template)

RDS (Relational Database Service) is AWS's way of running managed databases for you. Instead of installing Postgres manually on a VM, you click a few options and AWS handles backups, patching, and high availability. For this app we only need a small, free tier–eligible Postgres instance.

For more background, you can skim the official [<VPIcon icon="fa-brands fa-aws"/>Amazon RDS for PostgreSQL docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html).

We’ll start by creating the database layer. The settings below are the minimum you need for a small, production-style Postgres setup that stays within the AWS Free Tier while still following basic best practices.

- RDS Create database Postgres Free Tier.
- Class `db.t3.micro`, storage 20 GB gp2/gp3.
- Set master user/pass. You'll need them for `DATABASE_URL`.
- Public access: No.
- Security group: allow 5432 only from the EC2 security group.
- Enable backups and Require SSL. Download the RDS CA if you want strict cert validation.

### S3 Bucket for the Frontend

S3 is AWS's "infinite hard drive" for files. A React/Vite app builds down to plain HTML, CSS, and JavaScript files, which are perfect to host from S3. Think of S3 as a very simple web server that just serves static files.

If you want to see more options, check the [<VPIcon icon="fa-brands fa-aws"/>Hosting a static website on Amazon S3 guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html).

Now, we’ll create an S3 bucket to host the React frontend. These options configure the bucket for static website hosting while keeping it simple and inexpensive.

- Create bucket `mern-notes-aws-frontend-<suffix>`.
- For simple hosting, enable static website hosting and allow public reads, or keep private and use CloudFront + OAC.
- Turn on versioning if you want rollback safety.

### EC2 for the API

EC2 is "a computer in the cloud" that you control. You'll install Node.js on it, pull your code, and run `server.js` so that your backend API is always on. The security group attached to this instance works like a firewall.

If you've never launched an instance before, the [<VPIcon icon="fa-brands fa-aws"/>Getting started with Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html) guide walks through the console screens you'll see.

Finally, we’ll provision a small EC2 instance to run the Express API. The configuration below focuses on a free tier–eligible setup that’s secure enough for learning and easy to extend later.

- Launch Amazon Linux 2023, size `t3.micro`.
- Inbound SG: 22 (your IP), 80 (world), 443 if you add HTTPS on the instance/ALB.
- Attach this SG as the allowed source to RDS.

### Optional: CloudFront + Route 53

CloudFront is AWS's CDN (content delivery network), and Route 53 is their DNS service. You don't strictly need them to get your app working, but they make it faster and nicer: your app loads from edge locations close to users and can live behind a friendly domain like `app.example.com`.

For more details, see [<VPIcon icon="fa-brands fa-aws"/>Getting started with Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html) and the [<VPIcon icon="fa-brands fa-aws"/>Route 53 DNS developer guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html).

- Origin: the S3 bucket. Default root `index.html`. Add OAC if bucket is private.
- Request an ACM cert in `us-east-1`, then create a Route 53 A/AAAA alias to the distribution.

---

## Step #4 - Configure the EC2 Box

Once your EC2 instance is running, you treat it like a clean Linux machine. The commands below install the tools your API needs, pull your code from GitHub, configure environment variables, and run the server in a production-safe way.

Install basics:

```sh
sudo dnf update -y
```

This command updates all system packages to the latest versions. It's a good first step on any new Linux server.

```sh
sudo dnf install -y git
```

Installs Git so the EC2 instance can clone your repository from GitHub.

```sh
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
```

Adds the official NodeSource repository so you can install a modern version of Node.js (v20). Amazon Linux doesn’t ship with recent Node versions by default.

```sh
sudo dnf install -y nodejs
```

Installs Node.js and npm, which are required to run your Express API.

```sh
sudo npm install -g pm2
```

Installs PM2, a lightweight process manager that keeps your Node app running in the background and restarts it if it crashes or the server reboots.

Pull code and set environment variables:

```sh
git clone https://github.com/<you>/mern-notes-aws.git
cd mern-notes-aws/backend
npm install

cat <<'EOF' > .env
PORT=80
DATABASE_URL=postgres://<user>:<password>@<rds-endpoint>:5432/<dbname>
DATABASE_SSL=true
CORS_ORIGIN=https://<your-frontend-domain>
EOF
```

Start the API with PM2:

```sh
pm2 start server.js --name mern-notes-api
pm2 save
pm2 startup systemd -u ec2-user --hp /home/ec2-user
```

PM2 is a small process manager that makes sure your Node server keeps running if the machine reboots or the process crashes. Test on the box: `curl http://localhost/api/health`. From your laptop: `http://<ec2-public-dns>/api/health` (make sure SG allows 80/443).

---

## Step #5 - Build and Upload the Frontend

In development, Vite serves your React app from memory, but in production you want a set of static files that any web server (or S3) can host. `npm run build` creates an optimized <VPIcon icon="fas fa-folder-open"/>`dist/` folder that you sync to S3 so the browser can load it.

```sh
cd frontend
setx VITE_API_URL "https://<ec2-or-api-domain>/api"
npm run build
```

This sets an environment variable called `VITE_API_URL` on your local machine. Vite only exposes environment variables to the frontend if they start with the `VITE_` prefix.

Upload:

```sh
aws s3 sync dist/ s3://mern-notes-aws-frontend-<suffix>/ --delete
```

This uploads your compiled frontend (<VPIcon icon="fas fa-folder-open"/>`dist/`) to S3 and removes old files that no longer exist locally, ensuring the bucket reflects the current version of the app

Open the S3 website URL or your CloudFront URL.

---

## Step #6 - Quick Troubleshooting

If something doesn't work the first time, that's normal, especially with networking and AWS permissions. This section gives you a few quick places to look before you start randomly changing settings in the console.

- API 500s: `pm2 logs mern-notes-api`. This is often a bad `DATABASE_URL` or SSL flag.
- DB connect issues: RDS SG must allow the EC2 SG - use the RDS endpoint.
- CORS errors: `CORS_ORIGIN` must match your frontend origin exactly.
- 403 from S3: If you’re using static website hosting, allow public reads. With CloudFront, keep bucket private and use OAC.
- Blank page: Confirm that you’ve uploaded <VPIcon icon="fas fa-folder-open"/>`dist/` to the right bucket.

---

## Step #7 - Secure and Save

Once everything works, you don't want to accidentally expose your database to the internet or burn through free tier hours. These are simple, beginner-friendly hardening steps that make your setup safer and cheaper without turning you into a full-time security engineer.

- Turn off SSH after setup or switch to SSM Session Manager.
- Use HTTPS (CloudFront + ACM or ALB + ACM).
- Keep RDS private and use SSM port forwarding if needed.
- Ship PM2 logs with CloudWatch Agent and add alarms for CPU/status checks.
- Snapshot RDS daily and stop EC2 when idle to save hours.

---

## Step #8 - Verify End-to-End

Before you celebrate, run through the app like a real user: open it in the browser, create notes, refresh, and make sure everything behaves as expected. This confirms your frontend, API, and database are all wired together correctly.

- Load the frontend (S3 or CloudFront).
- Create and delete notes. They should persist in RDS.
- Hit `/api/health` for a quick liveness check.

---

## Next Steps

Once you're comfortable with this manual setup, you can start layering on more advanced tools. The ideas are the same: frontend, API and database but you get more automation, safety, and scalability.

- Add Prisma + migrations for stronger schemas.
- Add auth (Cognito/Auth0) and per-user notes.
- Containerize and run on ECS/Fargate or add an ALB in front of EC2.
- Use Terraform/CDK to recreate this stack with one command.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy a MERN Stack Notes App on AWS",
  "desc": "Platforms like Vercel, Netlify, and Render simplify deployment by handling infrastructure for you. In this tutorial, we’ll step one layer deeper and work directly with AWS to understand the building blocks behind these platforms. You'll take a small ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-mern-stack-notes-app-aws.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
