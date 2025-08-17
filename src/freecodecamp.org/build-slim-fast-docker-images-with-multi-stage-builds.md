---
lang: en-US
title: "How to Build Slim and Fast Docker Images with Multi-Stage Builds"
description: "Article(s) > How to Build Slim and Fast Docker Images with Multi-Stage Builds"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Python
  - Flask
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - vm
  - py
  - python
  - flask
  - py-flask
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Slim and Fast Docker Images with Multi-Stage Builds"
    - property: og:description
      content: "How to Build Slim and Fast Docker Images with Multi-Stage Builds"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-slim-fast-docker-images-with-multi-stage-builds.html
prev: /devops/docker/articles/README.md
date: 2025-05-15
isOriginal: false
author:
  - name: Daniel Adeboye
    url : https://freecodecamp.org/news/author/AdeboyeDN/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747235146559/0bce7dc3-0abe-4241-a188-1c05c773e810.png
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
  "title": "Flask > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Slim and Fast Docker Images with Multi-Stage Builds"
  desc="Apps don’t stay simple forever. More features mean more dependencies, slower builds, and heavier Docker images. That’s where things start to hurt. Docker helps, but without the right setup, your builds can quickly get bloated. Multi-stage builds make..."
  url="https://freecodecamp.org/news/build-slim-fast-docker-images-with-multi-stage-builds"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235146559/0bce7dc3-0abe-4241-a188-1c05c773e810.png"/>

Apps don’t stay simple forever. More features mean more dependencies, slower builds, and heavier Docker images. That’s where things start to hurt.

Docker helps, but without the right setup, your builds can quickly get bloated.

Multi-stage builds make things smoother by keeping your images fast, clean, and production-ready. In this guide, you'll learn how to use them to supercharge your Docker workflow.

Let’s get into it.

::: note Prerequisites

To follow this guide, you should have:

- Docker installed and running
- Basic understanding of Docker
- Some Python knowledge (or any language, really)
- Familiarity with the terminal

:::

---

## What are Docker Images?

Before we dive into optimization, let’s quickly get clear on what Docker images actually are.

A Docker image is a lightweight, standalone package that has everything your app needs to run - code, dependencies, environment variables, and config files. Think of it as a snapshot of your app, ready to spin up anywhere.

When you run an image, Docker turns it into a container: a self-contained environment that behaves the same on your machine, in staging, or in production. That consistency is a huge win for development and deployment.

Now that we’ve got the basics, let’s talk about making those images smaller and faster.

---

## How to Implement Multi-Stage Builds

Let’s get hands-on by creating a basic Flask app and using a multi-stage build to keep our Docker image slim.

### Step 1: Create <FontIcon icon="fa-brands fa-python"/>`app.py`

```py title="app.py"
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, Docker Multi-stage Builds! 🐳"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Step 2: Install and save dependencies

Install Flask and Gunicorn using pip:

```sh
pip install flask gunicorn
```

Then freeze your environment into a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file:

```sh
pip freeze > requirements.txt
```

This file is what Docker will use to install dependencies inside your container.

### Step 3: Create the multi-stage <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`

```dockerfile title="Dockerfile"
# Stage 1: Build Stage
FROM python:3.9-slim AS builder

WORKDIR /app

COPY requirements.txt .

RUN python -m venv /opt/venv && \\
    . /opt/venv/bin/activate && \\
    pip install --no-cache-dir -r requirements.txt

# Stage 2: Production Stage
FROM python:3.9-slim

COPY --from=builder /opt/venv /opt/venv

WORKDIR /app

COPY . .

ENV PATH="/opt/venv/bin/:$PATH"

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

In the Dockerfile above, we’ve defined both a development and a production stage for our application. The first stage, the **Build Stage**, uses the `python:3.9-slim` base image, sets up a working directory, adds all the necessary files, and creates a virtual environment. All dependencies are installed inside that virtual environment.

In the **Production Stage**, we again start from `python:3.9-slim`, but this time we copy only the virtual environment from the build stage along with the application code. Then we configure the environment to use that virtual environment and run the app using Gunicorn.

Now, in a multi-stage build, you can experiment with using different Python versions across stages - but here’s why I didn’t go that route:

- Some packages may have different dependencies, depending on the Python version.
- My <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file contains version-specific dependencies, so sticking to the same Python version across both stages helps avoid compatibility issues.

Once the multi-stage Dockerfile is ready, go ahead and build the images. You’ll clearly see the size difference.

### Step 4: Build and run your image

To build and run your image container, use the following command:

```sh
# Build the image
docker build -t my-python-app .

# Run the container
docker run -p 5000:5000 my-python-app
```

If everything works correctly, your Flask app should now be live at `http://localhost:5000` in your browser.

You’ll know your build succeeded when Docker completes without errors and starts the container.

![You should see terminal logs from Gunicorn indicating the app is up and running.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746875902903/9e8348ac-d21c-4371-bb42-e514457a12ff.png)

---

## The Chunky Single-Stage Build

Let’s compare with a traditional one-stage Docker build that includes everything in one go:

```dockerfile title="Dockerfile"
FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \\
    build-essential \\
    python3-dev \\
    gcc \\
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

The Dockerfile above uses a straightforward build process: it starts from the `python:3.9-slim` image, sets a working directory, installs system dependencies, creates a virtual environment, installs Python packages, copies over the app code, exposes port 5000, and runs the app using Gunicorn. This kind of Dockerfile is common and works fine, but it can lead to unnecessarily large and bloated images.

Let’s build our image to compare the size with that of the multi-stage build:

```sh
docker build -t my-chunky-app .
```

You’ll notice that this Dockerfile takes longer to build compared to the previous one, which was much faster.

![Before we continue, confirm your Docker image was successfully built.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746886030667/5b83915e-b5b5-4927-9981-f35dad8fb1ff.png)

Now, let’s compare build sizes:

```sh
docker images | grep 'my-'
```

![In case you're wondering why we used "my" to search for the images, it's because we named our Docker images `my-python-app` and `my-chunky-app`, so using "my" as a keyword makes it easy to filter them.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746885989703/1e3667ad-b2fd-4fff-a0e2-31d4705582a7.png)

The image above compares the build sizes of our single-stage and multi-stage Docker images.

![As you can see, `my-python-app` - the multi-stage build - is small and lightweight, while `my-chunky-app` is significantly larger. If you dig a bit deeper, you’ll notice that the multi-stage image built in just 1.2 seconds, whereas the single-stage one took a full 1 minute and 21 seconds. Pretty impressive difference, right?](https://cdn.hashnode.com/res/hashnode/image/upload/v1746885947258/9584255b-c6aa-4d25-8a4a-e4a841808b57.png)

In my opinion, these are solid reasons to use a multi-stage build - but it's not always necessary. There are cases where a single-stage build makes more sense. Let’s take a look at those.

---

## When to Use Multi-Stage Builds

### Use multi-stage builds if:

- Your app needs build tools (for example, compilers, dev dependencies)
- You want smaller, faster Docker images
- You care about image security and performance

### Use single-stage builds if:

- You're just testing or prototyping
- Your app is tiny and doesn’t need external tools
- You’re still learning the basics

Pick what fits your project’s scale and complexity.

---

## Conclusion

Multi-stage builds are an easy win. They help keep your Docker images clean, fast, and secure - especially as your app grows.

Not every project needs them, but when you do, they make a big difference. So next time you're Dockerizing something serious, reach for multi-stage. Your future self will thank you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Slim and Fast Docker Images with Multi-Stage Builds",
  "desc": "Apps don’t stay simple forever. More features mean more dependencies, slower builds, and heavier Docker images. That’s where things start to hurt. Docker helps, but without the right setup, your builds can quickly get bloated. Multi-stage builds make...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-slim-fast-docker-images-with-multi-stage-builds.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
