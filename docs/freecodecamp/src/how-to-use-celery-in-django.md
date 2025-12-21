---
lang: en-US
title: "How to Use Celery in Django"
description: "Article(s) > How to Use Celery in Django"
icon: iconfont icon-django
category:
  - Python
  - Django
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Celery in Django"
    - property: og:description
      content: "How to Use Celery in Django"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-celery-in-django.html
prev: /programming/py-django/articles/README.md
date: 2025-04-19
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744994231247/63228755-1929-4474-9930-15f8ff1a5631.png
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

[[toc]]

---

<SiteInfo
  name="How to Use Celery in Django"
  desc="You’ve probably noticed that some tasks in your Django app seem to take a long time. For example, maybe sending confirmation emails, resizing images, or processing large data files slows things down. The good news? You don’t have to sit around waitin..."
  url="https://freecodecamp.org/news/how-to-use-celery-in-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744994231247/63228755-1929-4474-9930-15f8ff1a5631.png"/>

You’ve probably noticed that some tasks in your Django app seem to take a long time. For example, maybe sending confirmation emails, resizing images, or processing large data files slows things down.

The good news? You don’t have to sit around waiting. You can hand those tasks off to something else and let your app keep doing its thing. That "something else" is Celery.

Celery lets you run time-consuming tasks in the background while your app stays fast. And if you're using Django, it's actually not that hard to plug it in - once you understand how the pieces work together.

In this guide, I’ll walk you through what Celery is, why it’s useful, and exactly how to set it up with Django step by step.

---

## What Is Celery and Why Should You Use It in Django?

Imagine you’re running an online shop. Someone places an order. You want to:

- Save the order to the database
- Send them an invoice by email
- Notify your warehouse
- Maybe even start printing a shipping label

If your app tries to do all this at once, your user is going to be stuck staring at a loading screen. Instead, what if you only saved the order right away - and passed the rest to Celery to handle in the background?

That’s exactly what Celery does.

It’s a task queue — which just means it runs things later, so your main app doesn’t have to wait. It’s especially helpful for:

- Sending emails
- Data imports/exports
- Running machine learning models
- Scraping data
- Generating reports

And yeah, it works really well with Django.

---

## How Celery Works (The Simple Version)

Celery is made up of a few parts:

1. **Task producer (your Django app)** - This is where you call a task.
2. **Broker (usually Redis)** - This is the middleman. It takes the task and holds it until a worker can grab it.
3. **Worker** - This is Celery’s background process that grabs tasks from the broker and runs them.

Here’s the flow:

```plaintext
Django app → Redis → Celery Worker → Done ✅
```
<!-- TODO: mermaid로 작성 -->

Now let’s actually set this up.

---

## How to Use Celery in Django

### 1. Install the right packages

You’ll need `celery` and a message broker. Redis is a popular choice.

```sh
pip install celery redis
```

Also make sure you have Redis running. You can install it locally via Homebrew (`brew install redis`) or use a Docker container.

If you’re using Docker:

```sh
docker run -p 6379:6379 redis
```

### 2. Create a <VPIcon icon="fa-brands fa-python"/>`celery.py` file in your project folder

Let’s say your Django project is called `myproject`. Inside that same folder (where <VPIcon icon="fa-brands fa-python"/>`settings.py` is), create a file called <VPIcon icon="fa-brands fa-python"/>`celery.py`.

```py title="myproject/celery.py"
import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")

app = Celery("myproject")

app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
```

Here’s what’s happening:

- `os.environ...` sets up Django’s settings.
- `Celery("myproject")` creates a new Celery app with your project name.
- `app.config_from_object(...)` tells Celery to read config from Django’s settings file.
- `autodiscover_tasks()` tells Celery to find tasks in your Django apps automatically.

### 3. Add Celery to <VPIcon icon="fa-brands fa-python"/>`__init__.py`

Still in your <VPIcon icon="fas fa-folder-open"/>`myproject/` folder, open <VPIcon icon="fa-brands fa-python"/>`__init__.py` and add:

```py
from .celery import app as celery_app

__all__ = ("celery_app",)
```

This makes sure Celery starts with Django.

### 4. Set the broker URL in your settings

Open <VPIcon icon="fa-brands fa-python"/>`settings.py` and add:

```py
CELERY_BROKER_URL = 'redis://localhost:6379/0'
```

This tells Celery to use Redis as the broker.

### 5. Write your first task

Go to one of your Django apps (say you’ve got an app called `shop`), and create a file called <VPIcon icon="fa-brands fa-python"/>`tasks.py`.

```py title="shop/tasks.py"
from celery import shared_task

@shared_task
def send_invoice_email(order_id):
    # Imagine this sends an email
    print(f"Sending invoice email for order {order_id}")
```

The `@shared_task` decorator tells Celery this is a background task.

### 6. Call the task from your views

Here’s how you’d use it in a Django view:

```py title="shop/views.py"
from .tasks import send_invoice_email
from django.shortcuts import render

def place_order(request):
    # pretend this saves an order
    order_id = 1234  # this would come from your model

    # run the task in the background
    send_invoice_email.delay(order_id)

    return render(request, "order_complete.html")
```

Notice the `.delay()` - this is what sends the task to Celery.

### 7. Run the Celery worker

Now open a terminal and start the worker:

```sh
celery -A myproject worker --loglevel=info
```

You should see the worker start and wait for tasks. When you place an order, it’ll print something like:

```plaintext title="output"
Sending invoice email for order 1234
```

---

## Optional: Using Django Admin to Monitor Tasks

If you want to monitor task status in the admin, you can use [<VPIcon icon="iconfont icon-github"/>`celery/django-celery-results`](https://github.com/celery/django-celery-results).

```sh
pip install django-celery-results
```

Then update your <VPIcon icon="fa-brands fa-python"/>`settings.py`:

```py title="settings.py"
INSTALLED_APPS += ["django_celery_results"]

CELERY_RESULT_BACKEND = "django-db"
```

Run migrations:

```sh
python manage.py migrate
```

Now Celery will save task results in your database, and you can see them in Django admin.

---

## FAQ

::: details What happens if Redis goes down?

Your tasks won’t be sent or picked up. But once Redis comes back, things should resume.

:::

::: details Can I retry failed tasks?

Yes! Celery supports retries. You can set how many times a task should retry and how often. Example:

```py
@shared_task(bind=True, max_retries=3)

def risky_task(self):
    try:
        # Do something risky
        pass
    except Exception as e:
        raise self.retry(exc=e, countdown=60)
```

:::

::: details Is Celery the only option?

No. There’s also Django Q, Dramatiq, and Huey. But Celery is the most mature and has the biggest community.

:::

---

## Wrapping It Up

Using Celery in Django doesn’t just speed things up - it also helps improve the experience for your users.

Offloading heavy or slow tasks makes your app feel snappier and more reliable.

Once you get the basics down, you’ll find yourself using it for all kinds of things.

::: info Further Reading and Resources

```component VPCard
{
  "title": "Celery - Distributed Task Queue — Celery 5.5.1 documentation",
  "desc": "Celery is a simple, flexible, and reliable distributed system to process vast amounts of messages, while providing operations with the tools required to maintain such a system.",
  "link": "https://docs.celeryq.dev/en/stable/",
  "logo": "https://docs.celeryq.dev/_static/favicon.ico",
  "background": "rgba(242,252,238,0.2)"
}
```

```component VPCard
{
  "title": "Quick starts",
  "desc": "Redis quick start guides",
  "link": "https://redis.io/docs/latest/develop/get-started/",
  "logo": "https://redis.io/docs/latest/images/favicons/favicon-128.png",
  "background": "rgba(255,68,56,0.2)"
}
```

<SiteInfo
  name="celery/django-celery-results"
  desc="Celery result back end with django."
  url="https://github.com/celery/django-celery-results/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/aa158a15050cd4a1aa483aed79f16bd7b4ba2e4563f6e407f92facb3c7d2344f/celery/django-celery-results"/>

- [Asynchronous Tasks in Django (Real Python)](/realpython.com/asynchronous-tasks-with-django-and-celery.md)

```component VPCard
{
  "title": "Flower — Flower 2.0.0 documentation",
  "desc": "Flower is an open-source web application for monitoring and managing Celery clusters. It provides real-time information about the status of Celery workers and tasks.",
  "link": "https://flower.readthedocs.io/en/latest/",
  "logo": "https://flower.readthedocs.io/favicon.ico",
  "background": "rgba(242,252,238,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Celery in Django",
  "desc": "You’ve probably noticed that some tasks in your Django app seem to take a long time. For example, maybe sending confirmation emails, resizing images, or processing large data files slows things down. The good news? You don’t have to sit around waitin...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-celery-in-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
