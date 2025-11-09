---
lang: en-US
title: "How to Use the Django REST Framework - Build Backend APIs with DRF"
description: "Article(s) > How to Use the Django REST Framework - Build Backend APIs with DRF"
icon: iconfont icon-django
category:
  - Python
  - Django
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the Django REST Framework - Build Backend APIs with DRF"
    - property: og:description
      content: "How to Use the Django REST Framework - Build Backend APIs with DRF"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-django-rest-framework.html
prev: /programming/py-django/articles/README.md
date: 2025-11-22
isOriginal: false
author:
  - name: Mari
    url : https://freecodecamp.org/news/author/Techgirlll/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1763759552021/cc57d91b-c2b9-4a40-8bb9-52c517dbbc35.png
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
  name="How to Use the Django REST Framework - Build Backend APIs with DRF"
  desc="When you click on most backend development tutorials, they often teach you what to do, not how to think.That’s why many developers only realize their mistakes after they start building. So, how does one actually think like a backend developer? Before..."
  url="https://freecodecamp.org/news/how-to-use-the-django-rest-framework"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1763759552021/cc57d91b-c2b9-4a40-8bb9-52c517dbbc35.png"/>

When you click on most backend development tutorials, they often teach you *what* to do, not *how to think*.  
That’s why many developers only realize their mistakes after they start building.

So, how does one actually think like a backend developer? Before answering that, let’s start with the basics: what exactly is backend development?

---

## What is Backend Development?

Backend development is the foundation of most web and mobile applications. It focuses on everything that happens behind the scenes, from processing logic and handling data to connecting with databases and APIs.

While it’s true that backend developers build APIs that communicate with the frontend, the job goes far beyond that. The backend is where data is validated, protected, stored, and retrieved.

In short: backend development is about building systems that ensure data integrity, performance, and scalability.

Backend developers are the ones responsible for designing and maintaining those systems. They ensure that every user request is processed efficiently and securely.

Now, how does the Django REST Framework (DRF) fit into all this?

---

## Why Django REST Framework?

A beginner-friendly tutorial must use a tool that:

- Teaches good structure
- Encourages best practices
- Hides unnecessary complexity
- Helps you learn backend fundamentals correctly

That’s why this guide uses the **Django REST Framework (DRF)**. Here’s how it compares to other popular Python frameworks.

### Flask

Flask is a lightweight and flexible microframework. It is great for small projects, but:

- You have to set up everything manually (routing, JSON handling, database handling).
- You need extra libraries for authentication, validation, or serialization.
- Beginners often create unstructured projects because Flask doesn’t enforce architecture.

Flask teaches freedom, not structure.

### FastAPI

FastAPI is modern, fast, and async-first. However:

- It assumes you already understand APIs.
- It requires understanding Python type hints deeply.
- The ecosystem is still growing.
- Beginners may not understand its underlying concepts (dependency injection, async IO).

FastAPI teaches speed, not fundamentals.

### Django REST Framework

DRF is ideal for beginners because:

- It sits on top of Django, a very stable full-stack framework.
- It encourages good architecture from day one.
- It handles serialization, authentication, routing, validation, and permissions for you.
- It gives you structure instead of chaos.

::: note Bottom line

DRF can help you learn how backend systems work from scratch.

:::

---

## How to Think Like a Backend Developer

Thinking like a backend developer is not about memorizing code. It’s about learning to see the bigger picture, how data moves, how logic flows, and how to build systems that work reliably and can grow.

Backend thinking can be summarized into six main principles:

### 1. Think in Systems, Not Lines of Code

Many beginners focus on writing code that works for one feature. A backend developer thinks about the entire system.

**Analogy:** Imagine a factory. Each machine (function or endpoint) does one task, but the factory only works efficiently if every machine is arranged correctly and communicates properly.

:: tip Example

When a user submits a form to create a task:

- The request reaches the server.
- The backend validates the data.
- The backend stores it in the database.
- The backend sends a response to the user.

A backend developer doesn’t just write a function to save data. They ask:

- Where should this logic live — view, serializer, or service layer?
- How will the data be validated and cleaned?
- How will the system scale if thousands of users submit tasks at the same time?

:::

Seeing the system first makes code predictable, maintainable, and scalable.

### 2. Separate Concerns — Keep Things Organized

Backend thinking is about **structure**. Every piece of code should have a clear responsibility:

- **Models**: Store and define your data
- **Serializers**: Convert data to a format the client understands (like JSON)
- **Views**: Apply the business logic and respond to requests

**Why this matters:** Without separation, code becomes messy and hard to debug. You might find yourself mixing database queries with validation or formatting, which leads to errors later.

::: tip Simple analogy

Think of a restaurant.

- The **chef** prepares the food (model/data).
- The **waiter** delivers the food to customers in a presentable way (serializer).
- The **manager** decides who gets what and handles special requests (view/logic).

:::

Each role is separate but connected. This is exactly how backend developers structure code.

### 3. Anticipate Problems Before They Happen

Backend developers don’t just code for today. They **think ahead**:

- What if the user sends invalid data?
- What if two users try to edit the same record at the same time?
- How will the system handle millions of requests in the future?

::: tip Example

If a user tries to create a task without a title, a beginner might just let it crash. A backend developer writes validation rules to catch this and return a clear error message.

:::

::: note Rule of thumb

Always ask, *“What could go wrong here?”* and design your code to handle it gracefully.

:::

### 4. Make Your Code Predictable and Readable

Backend development is about **writing code for humans, not just computers**.

- Use clear variable names (`task_title` instead of `x`).
- Keep functions short and focused.
- Document your code.

This way, **anyone can pick up your code and understand it**, including your future self.

::: tip

A backend system that is easy to read and predict is easier to debug, extend, and scale.

:::

### 5. Think in the Request → Logic → Response Cycle

Every backend action fits into this pattern:

- **Request**: The client sends data.
- **Logic**: The server validates, processes, and decides what to do.
- **Response**: The server sends data back in a structured way.

::: tip Example

User creates a task:

- Request: `{ "title": "Learn DRF" }`
- Logic: Check title is not empty → save to database → mark completed as `False`
- Response: `{ "id": 1, "title": "Learn DRF", "completed": false }`

:::

Thinking in this cycle makes debugging and designing systems intuitive.

### 6. Practice Thinking Like a Backend Developer

- **Ask questions before coding:** “Where should this logic live? How will this affect other parts of the system?”
- **Break down problems into steps:** Don’t just code the solution; code the process.
- **Visualize data flow:** Draw diagrams if necessary, from user request to database and back.
- **Learn by doing:** Build small projects and reflect on each component’s role.

Check out Andy Harris’s video on how to think like a programmer.

Now that you understand how backend developers think, let’s walk through setting up a real backend environment using Django REST Framework.

---

## How to Install the Django REST Framework

Here’s how to get the Django REST framework running on your machine from scratch.

### Step 1: Install Python

Make sure you have **Python 3.8+** installed. You can check if Python is installed with this command:

```sh
python --version
```

If it’s not installed, download it from the [<VPIcon icon="fa-brands fa-python"/>official Python documentation](https://docs.python.org/3/).

### Step 2: Create a Project Folder

Choose a location on your computer and create a folder for your project:

```sh
mkdir my_drf_project
cd my_drf_project
```

This keeps all your files organized in one place.

### Step 3: Create a Virtual Environment

A virtual environment keeps your project dependencies separate from other projects.

Create a virtual environment:

```sh
python -m venv venv
```

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

Next, activate it. For Windows (PowerShell):

```sh
.\venv\Scripts\Activate.ps1
```

@tab <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

For Mac/Linux:

```sh
source venv/bin/activate
```

:::

You’ll know it’s active when your terminal prompt starts with `(venv)`.

### Step 4: Install Django

Now install Django inside the virtual environment:

```sh
pip install django
```

Check that Django is installed:

```sh
python -m django --version
```

### Step 5: Create a Django Project

Create a new Django project:

```sh
django-admin startproject core .
```

The `.` at the end means “create the project here.” Run the server to make sure it works:

```sh
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` in your browser. You should see the Django welcome page.

### Step 6: Install Django REST Framework

Install DRF using pip:

```sh
pip install djangorestframework
```

### Step 7: Add DRF to Installed Apps

Open <VPIcon icon="fas fa-folder-open"/>`core/`<VPIcon icon="fa-brands fa-python"/>`settings.py` and find the `INSTALLED_APPS` list. Add:

```py
'rest_framework',
```

It should look like this:

```py title="core/settings.py"
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
]
```

### Step 8: Run Initial Migrations

Set up your database:

```sh
python manage.py migrate
```

Create a superuser for accessing the admin panel:

```sh
python manage.py createsuperuser
```

Follow the prompts for username, email, and password.

### Step 9: Start the Server

Run your development server again:

```sh
python manage.py runserver
```

Visit:

- `http://127.0.0.1:8000/` → Django welcome page
- `http://127.0.0.1:8000/admin/` → Admin panel (login with superuser)

You now have Django + DRF installed and ready for API development.

### Step 10: Verify DRF Installation

The easiest way to confirm that Django REST Framework is installed correctly is to build a very small test API. Each part of the setup helps you verify that DRF is working end-to-end.

Create a new app:

```sh
python manage.py startapp api
```

This creates an `api` folder where you’ll place your test model, serializer, and view. Adding it to `INSTALLED_APPS` tells Django to recognize the new app.

Add it to `INSTALLED_APPS`:

```sh
'api',
```

Create a simple <VPIcon icon="fa-brands fa-python"/>`models.py` in the `api` app:

```py title="models.py"
from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
```

This model represents a basic task with a title and a completion status. Creating even a simple model lets you test whether DRF can serialize and expose database objects as API responses.

Run migrations:

```sh
python manage.py makemigrations
python manage.py migrate
```

These commands generate and apply database tables for the `Task` model. Without migrations, DRF won’t have anything to fetch and serialize.

Create a serializer (<VPIcon icon="fas fa-folder-open"/>`api/`<VPIcon icon="fa-brands fa-python"/>`serializers.py`):

```py title="api/serializers.py"
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
```

A serializer converts your `Task` model into JSON so it can be returned as an API response. This step confirms that DRF’s serializer tools are working.

Create a view (`api/`<VPIcon icon="fa-brands fa-python"/>`views.py`):

```py title="api/views.py"
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
```

`ModelViewSet` automatically creates the CRUD API endpoints for your model. If this loads correctly, it means DRF’s generic views and viewsets are functioning.

Wire it to URLs (`core/`[`urls.py`](http://urls.py)):

```py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import TaskViewSet

router = DefaultRouter()
router.register('tasks', TaskViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
```

The router generates routes `/api/tasks/` for you. If routing works, DRF is properly integrated into your Django project.

Test the API by visiting:

```plaintext
http://127.0.0.1:8000/api/tasks/
```

If everything is set up correctly, you’ll see Django REST Framework’s browsable API. This confirms that DRF is installed, your project recognizes it, and it can serialize and return data successfully.

---

## The Backend Developer’s Mindset

When writing backend code, your goal isn’t just to make something *work*; it’s to make it predictable, scalable, and maintainable.

Professional backend developers focus on:

- **Predictability over cleverness** — Code should be clear to others.
- **Separation of concerns** — Keep logic, data, and presentation layers distinct.
- **Validation** — Never trust user input; always validate.
- **Consistency** — Stick to naming conventions and reusable patterns.

This mindset is what separates backend *coders* from backend *engineers*.

---

## Common Mistakes Beginners Make

- **Writing too much logic in views:** Keep views light. Move business logic into services or serializers.
- **Ignoring validation**: Always define validation rules in your serializers.
- **Not planning for scalability:** Even small projects grow. Build like you expect more users.

::: info Further Reading

<SiteInfo
  name="Django documentation | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

```component VPCard
{
  "title": "How to Build a REST API in Django",
  "desc": "If you’re building a web or mobile app, chances are you’re going to need a way to send and receive data between your app and a server. That’s where REST APIs come in. They help apps talk to each other - kind of like a waiter taking your order and",
  "link": "/fcc/how-to-build-a-rest-api-in-django.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[**What is Serialization?**](/freecodecamp.org/what-is-serialization.md)

[**REST API Best Practices – REST Endpoint Design Examples**](/freecodecamp.org/rest-api-best-practices-rest-endpoint-design-examples.md)

:::

---

## Conclusion

Thinking like a backend developer isn’t about memorizing syntax; it’s about understanding how systems behave.

When you start reasoning through requests, logic, and responses, you begin to see the bigger picture, and that’s when you stop writing code and start building systems.

With Django REST Framework, that process becomes easier, cleaner, and more intuitive.

As you continue learning, build small APIs and gradually add features. The more you understand how data flows through a system, the more naturally backend thinking will come.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Django REST Framework - Build Backend APIs with DRF",
  "desc": "When you click on most backend development tutorials, they often teach you what to do, not how to think.That’s why many developers only realize their mistakes after they start building. So, how does one actually think like a backend developer? Before...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-django-rest-framework.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
