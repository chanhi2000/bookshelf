---
lang: en-US
title: "How to Containerize a Node.js Application with Docker and Deploy with GitHub Actions"
description: "Article(s) > How to Containerize a Node.js Application with Docker and Deploy with GitHub Actions"
icon: fa-brands fa-docker
category:
  - Node.js
  - Express.js
  - DevOps
  - Docker
  - Github
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - devops
  - docker
  - github
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Containerize a Node.js Application with Docker and Deploy with GitHub Actions"
    - property: og:description
      content: "How to Containerize a Node.js Application with Docker and Deploy with GitHub Actions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/containerize-a-node-js-app-with-docker-and-deploy-with-github-actions.html
prev: /devops/docker/articles/README.md
date: 2026-07-15
isOriginal: false
author:
  - name: Zia Ullah
    url: https://freecodecamp.org/news/author/ziaullahzia/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/343864e6-5319-4378-a2b1-4955e38ad6d8.png
---

# {{ $frontmatter.title }} 관련

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
  name="How to Containerize a Node.js Application with Docker and Deploy with GitHub Actions"
  desc="If you've been building Node.js projects, you've probably had an experience like this. The project runs fine on your machine, but when you push it to a server, something breaks. Maybe it's a different"
  url="https://freecodecamp.org/news/containerize-a-node-js-app-with-docker-and-deploy-with-github-actions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/343864e6-5319-4378-a2b1-4955e38ad6d8.png"/>

If you've been building [**Node.js projects**](/freecodecamp.org/role-based-access-control-nodejs-rest-api-jwt.md), you've probably had an experience like this. The project runs fine on your machine, but when you push it to a server, something breaks.

Maybe it's a different Node version, maybe an environment variable is missing, or maybe a system dependency doesn't match. You spend an hour debugging something that was never actually a code problem.

Docker fixes this at the root. With Docker, you stop shipping just code. The Node version, dependencies, and config all travel inside the container. Your laptop, a CI server, a production VM — it behaves the same on all of them. No more environment surprises.

In this tutorial, we'll go through all this step by step: a multi-stage <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, using Docker Compose with PostgreSQL for local development, and a GitHub Actions workflow that pushes a fresh image to Docker Hub on every merge to <VPIcon icon="fas fa-code-branch"/>`main`.

::: info

The complete code for this tutorial is available on [GitHub (<VPIcon icon="iconfont icon-github"/>`ziaongit/nodejs-docker-cicd`)](https://github.com/ziaongit/nodejs-docker-cicd).

<SiteInfo
  name="ziaongit/nodejs-docker-cicd"
  desc="Contribute to ziaongit/nodejs-docker-cicd development by creating an account on GitHub."
  url="https://github.com/ziaongit/nodejs-docker-cicd/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/5c089083931ad535fed06788165dee9d2084a7a40babfe21a45946fa6ead2fbc/ziaongit/nodejs-docker-cicd"/>

:::

::: note Prerequisites

- Node.js 18+
- Docker Desktop, which you can download at [<VPIcon icon="fa-brands fa-docker"/>docs.docker.com/get-docker](https://docs.docker.com/get-docker/). Windows users need WSL 2 before Docker starts. Open PowerShell as Administrator and run `wsl --install`. After the restart, Docker Desktop will install without issues.
- A GitHub account
- A Docker Hub account (free at [<VPIcon icon="fa-brands fa-docker"/>hub.docker.com](https://hub.docker.com))
- Some Express.js experience helps, but isn't required

:::

---

## The Sample Application

We're building a task management API with Express and PostgreSQL. Keep in mind the app is just a vehicle to teach you how this works. The <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` and pipeline we set up here work the same way for any Node.js project.

Create the project:

```sh
mkdir nodejs-docker-cicd && cd nodejs-docker-cicd
npm init -y
npm install express pg dotenv
npm install --save-dev nodemon
```

Create `src/index.js`:

```js :collapsed-lines title="index.js"
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Create table on startup
pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
  )
`).catch(console.error);

// Health check — required for Docker HEALTHCHECK and load balancers
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

Open <VPIcon icon="iconfont icon-json"/>`package.json` and update the `"scripts"` section:

```json title="package.json"
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

`npm start` runs the app directly with Node. `npm run dev` uses nodemon so the server restarts automatically when you edit a file.

For running without Docker, create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tasksdb
DB_USER=postgres
DB_PASSWORD=yourpassword
PORT=3000
```

Notice that all database credentials come from environment variables rather than being hardcoded. Swap the variables, and the same image runs against your local database or a production one — no code changes needed. The `/health` endpoint is what Docker pings to know the app is actually handling requests.

---

## Writing the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`

Before touching the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, there are two terms you'll keep seeing. An **image** is a packaged, immutable version of your app — Node runtime, code, dependencies, everything together in one artifact. A **container** is a running instance of that image. One image, many containers, any machine.

Here's the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` we'll use:

```dockerfile title="Dockerfile"
# ── Stage 1: Install dependencies ──────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first — Docker caches this layer separately.
# If you only change src code (not package.json), Docker skips npm ci on rebuild.
COPY package*.json ./
RUN npm ci

COPY . .


# ── Stage 2: Production image ───────────────────────────────────────────────
FROM node:18-alpine AS production

# Create a non-root user — running as root inside a container is a security risk
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Copy only the source code from the builder stage (not node_modules or dev files)
COPY --from=builder /app/src ./src

RUN chown -R nodeuser:nodejs /app
USER nodeuser

EXPOSE 3000

# Docker will ping /health every 30s. If it fails 3 times, the container is marked unhealthy.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]
```

This is a multi-stage build. The first stage (`builder`) installs everything, including dev dependencies. The second stage (`production`) starts fresh and only copies what the app needs to run. Nodemon, test frameworks, and anything else dev-only never make it into the final image.

The size difference is real. A `node:18` Debian image is over 950MB. Switch to `node:18-alpine` and cut out the dev dependencies, and the final image lands around 150–200MB instead. A smaller image means faster pushes and faster deploys.

`npm ci` instead of `npm install` is a deliberate choice for CI/CD. It reads exact versions from <VPIcon icon="iconfont icon-json"/>`package-lock.json` and fails hard if the lockfile doesn't match <VPIcon icon="iconfont icon-json"/>`package.json`. Every build on every machine installs the exact same versions — no surprises from a dependency that quietly updated overnight.

The `nodeuser` account exists because containers run as root by default. That's fine until something goes wrong. A non-root user means that an attacker who gets inside the container can't just do whatever they want.

---

## The <VPIcon icon="fa-brands fa-docker"/>`.dockerignore` File

Create <VPIcon icon="fa-brands fa-docker"/>`.dockerignore` before building:

```plaintext title=".dockerignore"
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
Dockerfile
.dockerignore
```

The <VPIcon icon="fas fa-folder-open"/>`node_modules` exclusion is the critical one. Your local modules were compiled for your operating system — macOS or Windows binaries won't work inside a Linux container. Excluding them means Docker installs fresh modules during the build, compiled for the correct platform. Without this exclusion, you'd either copy broken binaries into the image or waste time uploading hundreds of megabytes to the build context.

Never put <VPIcon icon="iconfont icon-dotenv"/>`.env` in an image. Passwords, API keys, anything sensitive — those go in at runtime as environment variables, never inside the image itself.

---

## The <VPIcon icon="iconfont icon-git"/>`.gitignore` File

One more thing before the first commit: a <VPIcon icon="iconfont icon-git"/>`.gitignore`. You don't want <VPIcon icon="fas fa-folder-open"/>`node_modules` or <VPIcon icon="iconfont icon-dotenv"/>`.env` tracked:

```plaintext title=".gitignore"
node_modules/
.env
.env.local
npm-debug.log*
logs/
.DS_Store
Thumbs.db
.vscode/
.idea/
dist/
build/
```

---

## Build and Test the Image Locally

Open Docker Desktop first and give it a moment. On Windows, you'll see a whale icon in the taskbar that animates while the engine is starting up. Once it goes still, you're good to run Docker commands. If you try to run Docker before the engine is up, you'll hit this:

```plaintext
ERROR: Error response from daemon: Docker Desktop is unable to start
```

If that happens, quit Docker Desktop. Open PowerShell as Administrator, run `wsl --update`, and restart. Then go to Control Panel → Programs → Turn Windows features on or off. Both Hyper-V and Virtual Machine Platform need to be checked. After the restart, Docker Desktop should come up fine.

It's worth knowing about this error too:

```plaintext
docker : The term 'docker' is not recognized as the name of a cmdlet, function,
script file, or operable program.
```

This means that Docker Desktop isn't running or isn't installed. Open it from the Start menu and wait.

Run the build:

```sh
docker build -t nodejs-docker-cicd:latest .
```

The first time takes roughly 30 seconds since Docker has to pull `node:18-alpine` from the internet. Once that's cached, subsequent builds are much quicker. Both stages will scroll by:

```plaintext
[+] Building 33.1s (17/17) FINISHED
 => [builder 1/5] FROM docker.io/library/node:18-alpine       20.9s
 => [builder 4/5] RUN npm ci                                   3.5s
 => [production 5/7] RUN npm ci --only=production              3.2s
 => [production 7/7] RUN chown -R nodeuser:nodejs /app         3.2s
 => exporting to image                                         1.5s
 => => naming to docker.io/library/nodejs-docker-cicd:latest     0.0s
```

When you see `(17/17) FINISHED` the image is built. Check the size:

```sh
docker images nodejs-docker-cicd
#
# IMAGE                     ID             DISK USAGE   CONTENT SIZE
# nodejs-docker-cicd:latest   c9eed311d999        198MB         47.5MB
```

**CONTENT SIZE** (47.5MB) is the compressed size that gets pushed to Docker Hub. **DISK USAGE** (198MB) is what it takes up on disk locally. Compare that to a `node:18` Debian image at 950MB+, and you can see why the Alpine base and multi-stage approach matter.

On subsequent builds, Docker reuses cached layers. Edit only your source files without touching <VPIcon icon="iconfont icon-json"/>`package.json` and the `npm ci` step gets skipped completely. That 33-second first build becomes 3 seconds.

---

## Docker Compose for Local Development

The app needs a database. Setting up PostgreSQL locally means every developer who clones the repo has to do it, too. Docker Compose handles this: one file defines both services, and one command starts them.

Create <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`:

```yaml :collapsed-lines title="docker-compose.yml"
services:
  app:
    build:
      context: .
      target: production
    ports:
      - '3000:3000'
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: tasksdb
      DB_USER: postgres
      DB_PASSWORD: postgres
      PORT: 3000
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: tasksdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

A few things worth pointing out. `DB_HOST` is set to `postgres`. That's the service name, not `localhost`. Containers on the same Docker network reach each other by service name. Put `localhost` there and the app tries to connect to itself.

`depends_on` with `condition: service_healthy` holds the app back until Postgres actually passes its health check. Skip this and the app starts, tries to connect to a database that isn't ready yet, and crashes. The health check pings `pg_isready` every 5 seconds. Once it gets a green response, the app container starts.

The named volume `postgres_data` keeps your data alive between restarts. Run `docker compose down` and the data is still there next time. Add `--volumes` to wipe it clean.

Start both services:

```sh
docker compose up --build
```

You'll see PostgreSQL initialize and then the app start. Once you see `Server running on port 3000` in the logs, the stack is up.

Open a second terminal to test — leave the compose logs running in the first one.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-linux"/>,<VPIcon icon="iconfont icon-macos"/>

```sh
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker"}'

curl http://localhost:3000/tasks

curl http://localhost:3000/health
```

@tab <VPIcon icon="fa-brands fa-windows"/>

Typing `curl` in PowerShell runs `Invoke-WebRequest`, not actual curl. Run `curl.exe` instead. For JSON bodies, write to a file first:

```powershell
'{"title": "Learn Docker"}' | Set-Content body.json
curl.exe -X POST http://localhost:3000/tasks -H "Content-Type: application/json" --data `@body.json

curl.exe http://localhost:3000/tasks
curl.exe http://localhost:3000/health
```

The backtick before `@body.json` is necessary. PowerShell would otherwise try to interpret `@` as a splatting operator rather than passing it to curl as a filename prefix.

:::

You should see responses like these:

::: code-tabs#json

@tab:active POST /tasks

```json
{"id":1,"title":"Learn Docker","completed":false,"created_at":"2026-07-09T22:21:17.073Z"}
```

@tab GET /tasks

```json
[{"id":1,"title":"Learn Docker","completed":false,"created_at":"2026-07-09T22:21:17.073Z"}]
```

@tab GET /health

```json
{"status":"ok","timestamp":"2026-07-09T22:11:44.700Z"}
```

:::

The task hit PostgreSQL in one container and came back through the app. <kbd>Ctrl</kbd>+<kbd>C</kbd> in the compose terminal stops both.

---

## Automate the Build with GitHub Actions

The image works locally, so it's time to stop doing this by hand.

### Step 1: Create a Docker Hub Access Token

Go to [<VPIcon icon="fa-brands fa-docker"/>hub.docker.com](https://hub.docker.com) and then Account Settings → Security → New Access Token. Set permission to Read & Write, as read-only breaks the push. The token appears once, so copy it before closing the page.

::: warning Security warning

Don't paste this token into a chat, email, or commit. If you expose it by accident, delete it immediately, then make a new one.

:::

### Step 2: Add Secrets to Your GitHub Repository

Head to Settings → Secrets and variables → Actions in your repo and add:

- `DOCKERHUB_USERNAME` — your Docker Hub username
- `DOCKERHUB_TOKEN` — paste the token here, nowhere else

If you ran into `Error: Username and password required`, the secrets either aren't saved yet or the names are typed wrong. Both are case-sensitive.

A Node 20 deprecation warning in the logs is normal. It comes from the Docker actions internally, not your code.

### Step 3: Create the Workflow File

Create <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`docker-publish.yml`:

```yaml title=".github/workflows/docker-publish.yml"
name: Build and Push Docker Image

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  IMAGE_NAME: ${{ secrets.DOCKERHUB_USERNAME }}/nodejs-docker-cicd

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Docker Hub
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          target: production
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

The login step has `if: github.event_name != 'pull_request'`. This skips authentication on pull requests. PRs from forks don't have access to your secrets, so trying to log in would just fail. The build still runs on PRs to validate your <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`, but the image isn't pushed.

The metadata action generates two tags on every merge to <VPIcon icon="fas fa-code-branch"/>`main`: `latest` and a short commit SHA like `sha-a1b2c3d`. The SHA tag is what makes rollbacks practical. If `latest` breaks in production, you can pull any previous `sha-` tag and you're back to a known-good state in seconds.

The `cache-from/cache-to: type=gha` lines store Docker's layer cache in GitHub Actions' built-in cache. The first run builds everything from scratch. After that, unchanged layers are pulled from cache rather than rebuilt. On a typical Node.js app this brings build time from 2–3 minutes down to under 30 seconds.

### Push and Watch it Run

```sh
git add .
git commit -m "Add Docker configuration and GitHub Actions workflow"
git push origin main
```

Go to your repo's **Actions** tab. You'll see the workflow running in real time. Each step turns green as it completes:

```plaintext
✅ Checkout code
✅ Set up Docker Buildx
✅ Log in to Docker Hub
✅ Extract metadata
✅ Build and push
```

Green across the board means your image is live on Docker Hub — two tags, `latest` and a commit SHA like `sha-a1b2c3d`. Every push to <VPIcon icon="fas fa-code-branch"/>`main` from here builds and ships automatically.

---

## Deploying the Image

With your image on Docker Hub, you can deploy it to any infrastructure:

**Any VPS or server:**

```sh
docker pull yourusername/nodejs-docker-cicd:latest
docker run -d -p 3000:3000 \
-e DB_HOST=your-db-host \
-e DB_NAME=tasksdb \
-e DB_USER=postgres \
-e DB_PASSWORD=yourpassword \
yourusername/nodejs-docker-cicd:latest
```

**Railway** — Connect your Docker Hub image in the Railway dashboard and it deploys on the next push.

**Fly.io** — Run `fly launch` pointing at your <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` and Fly handles the rest.

**Render** — Paste your Docker Hub image URL into the Render service settings.

Each push to <VPIcon icon="fas fa-code-branch"/>`main` runs the workflow. New image goes to Docker Hub, platform picks it up — that's your deployment handled.

---

## Wrapping Up

What started as a local Node.js app now runs in a container. You get the same behavior on any machine, real PostgreSQL in development, and a pipeline that builds and ships to Docker Hub without you doing anything after the push.

The multi-stage build keeps the image lean — dev tools stay out, non-root user, health check baked in. Compose gets the full stack up with one command for anyone who clones the repo. The SHA tag on every GitHub Actions build means rolling back is just a matter of pulling an older tag.

These same patterns (multi-stage builds, Compose for local development, automated image publishing) are used across the industry for production Node.js deployments. Pick up these patterns once and they follow you to every project.

From here, you can extend the pipeline: drop a test step in before the build, or add multi-platform support if you're targeting ARM. Once Docker Compose starts feeling limiting in production, that's usually when Kubernetes enters the picture.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Containerize a Node.js Application with Docker and Deploy with GitHub Actions",
  "desc": "If you've been building Node.js projects, you've probably had an experience like this. The project runs fine on your machine, but when you push it to a server, something breaks. Maybe it's a different",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/containerize-a-node-js-app-with-docker-and-deploy-with-github-actions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
