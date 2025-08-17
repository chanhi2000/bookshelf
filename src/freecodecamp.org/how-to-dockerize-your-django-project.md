---
lang: en-US
title: "How to Dockerize Your Django Project"
description: "Article(s) > How to Dockerize Your Django Project"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Python
  - Django
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - python
  - py
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Dockerize Your Django Project"
    - property: og:description
      content: "How to Dockerize Your Django Project"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-dockerize-your-django-project.html
prev: /programming/py/articles/README.md
date: 2025-04-19
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744994272728/248cef70-5f8e-46fd-a640-66852ffda7d2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Django > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
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
  name="How to Dockerize Your Django Project"
  desc="If you're working on a Django project and you want to make your life easier - especially when it comes to running your app across different environments - Docker is your new best friend. Docker makes it possible to package your Django app, along with..."
  url="https://freecodecamp.org/news/how-to-dockerize-your-django-project"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744994272728/248cef70-5f8e-46fd-a640-66852ffda7d2.png"/>

If you're working on a Django project and you want to make your life easier - especially when it comes to running your app across different environments - Docker is your new best friend.

Docker makes it possible to package your Django app, along with all its dependencies, into something called a “container.”

That way, it runs the same on your computer, your teammate’s computer, a testing server, or even in production.

When I first started using Docker, it felt a little overwhelming. But after setting it up for a few Django apps, it all clicked.

The good news? I’m going to walk you through it, step by step, in a way that’s easy to follow, even if you’re brand new to Docker.

::: note What You’ll Need

Before we begin, make sure you’ve got a few things installed:

- **Python 3** (any version that Django supports)
- **Django** (of course)
- **Docker and Docker Compose**  
  - 👉 [<FontIcon icon="fa-brands fa-docker"/>Install Docker](https://docs.docker.com/engine/install/)  
  - 👉 [<FontIcon icon="fa-brands fa-docker"/>Install Docker Compose](https://docs.docker.com/compose/install/linux/)

You don’t need to be an expert in Docker. I’ll explain what each part does as we build it together.

:::

---

## How to Dockerize Your Django Project

### Step 1: Start a Django Project

If you already have a Django project, you can skip this part.

Otherwise, open your terminal and run:

```sh
django-admin startproject myproject
cd myproject
```

This will create a new Django project called <FontIcon icon="fas fa-folder-open"/>`myproject`. You’ll see a structure like this:

```output title="file structure"
myproject/
├── manage.py
└── myproject/
    ├── __init__.py
    ├── asgi.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

Let’s say this is your app that you want to run inside Docker.

### Step 2: Create a Dockerfile

In the root of your project (same folder as <FontIcon icon="fa-brands fa-python"/>`manage.py`), create a file called <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`. No file extension -just <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`.

Here’s what goes inside:

```dockerfile title="Dockerfile"
# Use the official Python image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the code
COPY . /app/
```

Let me break that down:

- `FROM python:3.10-slim`: This tells Docker to use a lightweight version of Python 3.10.
- `ENV`: These just help with cleaner logs and better performance.
- `WORKDIR /app`: This sets the default working directory inside the container.
- `COPY` and `RUN`: These lines copy your code into the container and install your Python packages.

### Step 3: Add a <FontIcon icon="fas fa-file-lines"/>`requirements.txt`

You’ll need a file listing your Python packages.

Create a file called <FontIcon icon="fas fa-file-lines"/>`requirements.txt` in the root folder and add:

```plaintext title="requirements.txt"
Django>=4.0,<5.0
```

You can add more later if your project grows. For now, that’s enough.

To generate a full list of dependencies from your local virtual environment, run:

```sh
pip freeze > requirements.txt
```

### Step 4: Create <FontIcon icon="iconfont icon-yaml"/>`docker-compose.yml`

Now let’s create the file that tells Docker how to run everything together.

In your root folder, create <FontIcon icon="iconfont icon-yaml"/>`docker-compose.yml`:

```yaml title="docker-compose.yml"
version: '3.9'

services:
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
```

Let’s go line-by-line:

- `build: .`: This tells Docker to use the <FontIcon icon="fa-brands fa-docker"/>`Dockerfile` in the current folder.
- `command`: This runs Django’s development server inside the container.
- `volumes`: This mounts your code into the container so changes are reflected live.
- `ports`: This maps port 8000 inside Docker to port 8000 on your machine.

So if you go to `http://localhost:8000`, you’ll see your app.

### Step 5: Run It!

Now the fun part. From your terminal, run:

```sh
docker-compose up --build
```

This tells Docker to:

- Build the container
- Install dependencies
- Run the Django server

If everything goes well, you’ll see logs from the Django server, and you can open your browser and go to `http://localhost:8000`.

You should see the Django welcome screen.

---

## Common Issues

### Port Already in Use?

If port 8000 is busy, change this line in <FontIcon icon="iconfont icon-yaml"/>`docker-compose.yml`:

```yaml title="docker-compose.yml"
ports:
  - "8001:8000"
```

Then go to `http://localhost:8001`.

### Database Not Working?

If you need a database (like PostgreSQL), you can add another service to <FontIcon icon="iconfont icon-yaml"/>`docker-compose.yml`. Here's an example with PostgreSQL:

```yaml title="docker-compose.yml"
services:
  db:
    image: postgres
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    depends_on:
      - db
```

Then, update your `settings.py` in Django to use that database.

---

## FAQs

::: details Do I need Docker for development?

No, but it helps keep your environment clean and consistent. If it works in Docker, it'll work anywhere.

:::

::: details Can I run migrations inside Docker?

Yes! Just run:

```sh
docker-compose run web python manage.py migrate
```

:::

::: details How do I stop everything?

Press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the running server, and if you want to remove containers:

```sh
docker-compose down
```

:::

---

## Extra Tip: Use <FontIcon icon="fa-brands fa-docker"/>`.dockerignore`

Just like <FontIcon icon="iconfont icon-git"/>`.gitignore`, you can create a <FontIcon icon="fa-brands fa-docker"/>`.dockerignore` file to avoid copying unnecessary files into the Docker container. Here’s a simple one:

```plaintext title=".dockerignore"
__pycache__
*.pyc
*.pyo
*.pyd
.env
.git
```

---

## What You’ve Built

By now, you’ve:

- Created a Django project
- Built a Docker container for it
- Set up `docker-compose` to run everything
- Learned how to manage it all easily

Once you’re comfortable, you can expand this setup with static files, NGINX, Gunicorn, or even production-ready Docker builds.

---

## Want to Go Deeper?

If this feels like a lot, that’s ok. It takes a little practice, but once you’ve done it a few times, Docker becomes second nature.

You’ll spend less time debugging setup issues and more time coding your app.

::: info Further Reading

<SiteInfo
  name="Home"
  desc="Docker Documentation is the official Docker library of resources, manuals, and guides to help you containerize applications."
  url="https://docs.docker.com/"
  logo="https://docs.docker.com/favicons/docs@2x.ico"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

<SiteInfo
  name="Django documentation | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="Compose file reference"
  desc="Find the latest recommended version of the Docker Compose file format for defining multi-container applications."
  url="https://docs.docker.com/reference/compose-file/"
  logo="https://docs.docker.com/favicons/docs@2x.ico"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Dockerize Your Django Project",
  "desc": "If you're working on a Django project and you want to make your life easier - especially when it comes to running your app across different environments - Docker is your new best friend. Docker makes it possible to package your Django app, along with...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-dockerize-your-django-project.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
