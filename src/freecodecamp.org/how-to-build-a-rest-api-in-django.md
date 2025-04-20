---
lang: en-US
title: "How to Build a REST API in Django"
description: "Article(s) > How to Build a REST API in Django"
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
      content: "Article(s) > How to Build a REST API in Django"
    - property: og:description
      content: "How to Build a REST API in Django"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-rest-api-in-django.html
prev: /programming/py-django/articles/README.md
date: 2025-04-16
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744814822505/5195929b-c1d8-4c9e-a12b-44697db44c5b.png
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
  name="How to Build a REST API in Django"
  desc="If you’re building a web or mobile app, chances are you’re going to need a way to send and receive data between your app and a server. That’s where REST APIs come in. They help apps talk to each other – kind of like a waiter taking your order and"
  url="https://freecodecamp.org/news/how-to-build-a-rest-api-in-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744814822505/5195929b-c1d8-4c9e-a12b-44697db44c5b.png"/>

If you’re building a web or mobile app, chances are you’re going to need a way to send and receive data between your app and a server.

That’s where REST APIs come in. They help apps talk to each other – kind of like a waiter taking your order and bringing your food back. And if you're using Django, you're already halfway there.

Django is one of the most popular web frameworks out there. It’s fast, secure, and packed with useful tools. Combine it with Django REST Framework (DRF), and you’ve got everything you need to build a solid REST API without spending weeks figuring it all out.

In this guide, I’ll walk you through the whole process of building a REST API in Django from scratch.

---

## What is a REST API?

Before we get started, let’s get one thing straight: What’s even is a REST API?

A REST API (short for “Representational State Transfer”) is a way for two systems – like a website and a server – to talk to each other using standard HTTP methods like GET, POST, PUT, and DELETE.

Let’s say you have a to-do app. You want to:

- **Get** a list of tasks
- **Add** a new task
- **Update** a task
- **Delete** a task

You can do all of that through a REST API. It’s like setting up your own menu of commands that other apps (or your frontend) can use to work with your data.

---

## Tools You’ll Need:

Here’s what you’ll be using in this tutorial:

- **Python** (preferably 3.8+)
- **Django** (web framework)
- **Django REST Framework (DRF)** (to build APIs)
- **Postman or curl** (for testing)

You can install DRF with:

```sh
pip install djangorestframework
```

---

## How to Build a REST API in Django

Here is how to get started:

### Step 1: Set Up Your Django Project

If you haven’t already, start a new Django project:

```sh
django-admin startproject myproject
cd myproject
python manage.py startapp api
```

- `django-admin startproject myproject` – Creates a new Django project named `myproject`, which contains configuration files for your whole site.
- `cd myproject` – Move into your new project directory.
- `python manage.py startapp api` – Creates a new Django app named `api` where your models, views, and API logic will live.

Now add `'rest_framework'` and `'api'` to your `INSTALLED_APPS` in `settings.py`:

```py title="settings.py"
INSTALLED_APPS = [
    ...
    'rest_framework',
    'api',
]
```

- `rest_framework` is the Django REST Framework – it gives you tools to easily create APIs.
- `'api'` tells Django to look in the <FontIcon icon="fas fa-folder-open"/>`api` folder for models, views, and so on.

### Step 2: Create a Model

Let’s make a simple model – a task list.

In <FontIcon icon="fas fa-folder-open"/>`api/`<FontIcon icon="fa-brands fa-python"/>`models.py`:

```py title="models.py"
from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
```

- `title`: A short piece of text (like “Buy groceries”). `CharField` is used for strings.
- `completed`: A Boolean (True or False) to mark if a task is done.
- `__str__`: This special method returns a string version of the model when printed – useful for debugging and the admin panel.

Then run:

```sh
python manage.py makemigrations
python manage.py migrate
```

- `makemigrations`: Prepares the changes to the database schema.
- `migrate`: Applies those changes to the actual database.

### Step 3: Make a Serializer

Serializers turn your Django model into JSON (the data format used in APIs) and back.

In <FontIcon icon="fas fa-folder-open"/>`api/`<FontIcon icon="fa-brands fa-python"/>`serializers.py`:

```py title="serializers.py"
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
```

- **Serializers** convert model instances (like a `Task`) to and from **JSON**, so they can be sent over the web.
- `ModelSerializer` is a shortcut that automatically handles most things based on your model.
- `fields = '__all__'` means include every field in the model (title and completed).

### Step 4: Create the Views

Here’s where the logic goes. You can use class-based or function-based views. Let’s go with class-based using DRF’s `generics`.

In <FontIcon icon="fas fa-folder-open"/>`api/`<FontIcon icon="fa-brands fa-python"/>`views.py`:

```py title="views.py"
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer

class TaskListCreate(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
```

These are **generic class-based views** provided by Django REST Framework to save you time.

1. `TaskListCreate`:
    - Handles GET requests to list all tasks.
    - Handles POST requests to create new tasks.
2. `TaskDetail`:
    - Handles GET for one task, PUT/PATCH for updating, and DELETE to remove a task

### Step 5: Set Up URLs

First, make a `urls.py` file in the `api` folder (if it doesn’t exist).

In <FontIcon icon="fas fa-folder-open"/>`api/`<FontIcon icon="fa-brands fa-python"/>`urls.py`:

```py title="urls.py"
from django.urls import path
from .views import TaskListCreate, TaskDetail

urlpatterns = [
    path('tasks/', TaskListCreate.as_view(), name='task-list'),
    path('tasks/<int:pk>/', TaskDetail.as_view(), name='task-detail'),
]
```

- `tasks/`: The route to access or create tasks.
- `tasks/<int:pk>/`: The route to get, update, or delete a single task by its primary key (`pk`).

Then, in your main <FontIcon icon="fas fa-folder-open"/>`myproject/`<FontIcon icon="fa-brands fa-python"/>`urls.py`:

Now, hook this into the main <FontIcon icon="fa-brands fa-python"/>`urls.py` in your project folder:

```py title="urls.py"
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
```

### Step 6: Test It!

Start the server:

```sh
python manage.py runserver
```

Open Postman or curl and try hitting these endpoints:

- `GET /api/tasks/` – get all tasks
- `POST /api/tasks/` – create a new task
- `GET /api/tasks/1/` – get a specific task
- `PUT /api/tasks/1/` – update a task
- `DELETE /api/tasks/1/` – delete a task

And that’s it – you’ve got a working REST API.

This setup gives you a fully functional REST API with just a few lines of code, thanks to Django REST Framework. You should now understand:

- How models define your database structure
- How serializers turn models into JSON and vice versa
- How views control API behaviour (get, post, update, delete)
- How URL routing connects your views to web requests

---

## DRF Permissions

Right now, anyone can use your API. But what if you only want certain users to have access?

DRF gives you simple ways to handle this. For example, to make an API only available to logged-in users:

```py
from rest_framework.permissions import IsAuthenticated

class TaskListCreate(generics.ListCreateAPIView):
    ...
    permission_classes = [IsAuthenticated]
```

There are more permissions you can use, like `IsAdminUser` custom permissions, for example.

Let’s break this down and go deeper into **permissions** in Django REST Framework (DRF), including:

### What are Permissions in DRF?

Permissions in DRF control **who** can access your API and **what actions** they can perform (read, write, delete, etc.).

They’re applied per view (or viewset), and they're checked after authentication, meaning they build on top of checking whether the user is logged in.

### Common Built-In Permissions

DRF gives you a few super useful built-in permission classes out of the box:

#### 1. `IsAuthenticated`

This one ensures that only logged-in users can access the view:

```py
from rest_framework.permissions import IsAuthenticated

class TaskListCreate(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
```

Only users who have been authenticated (for example, via session login or token) will be able to list or create tasks. Anyone else gets a `403 Forbidden` response.

#### 2. `IsAdminUser`

Only allows access if `user.is_staff` is `True`.

```py
from rest_framework.permissions import IsAdminUser

class AdminOnlyView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
```

Only admin users (usually set via Django admin or superuser status) can access this view.

#### 3. `AllowAny`

Allows **all** users, even unauthenticated ones. This is the default for open APIS like sign-up pages.

```py
from rest_framework.permissions import AllowAny

class PublicSignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]
```

#### 4. `IsAuthenticatedOrReadOnly`

Authenticated users can read and write, unauthenticated users can only read (GET, HEAD, OPTIONS).

```py
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ArticleView(generics.RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
```

**Use case:** Great for blogs or article APIS where the public can read but only registered users can write/update.

### Custom Permissions

Want more control? You can create your permissions by subclassing `BasePermission`.

#### Example: Only allow owners of an object to edit it

```py
from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
```

Then use it like this:

```py
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsOwner]
```

- First, a user must be logged in (`IsAuthenticated`).
- Then, only the owner of that specific `Task` can view, update, or delete it.

### Combining Permissions

You can combine multiple permission classes, and all must return `True` for access to be granted.

```py
permission_classes = [IsAuthenticated, IsAdminUser]
```

This means: user must be both authenticated and an admin.

#### TL;DR

| Permission | Who Gets Access? |
| --- | --- |
| `AllowAny` | Everyone (even logged-out users) |
| `IsAuthenticated` | Only logged-in users |
| `IsAdminUser` | Only admin/staff users |
| `IsAuthenticatedOrReadOnly` | Read: everyone / Write: only logged-in users |
| `Custom Permissions` | Your rules (e.g., only owners) |

---

## FAQs

::: details Do I need Django REST Framework to build an API in Django?

Technically, no – but DRF makes your life much easier. Without DRF, you'd have to manually handle things like:

- Parsing and validating JSON requests
- Writing views to serialise Python objects to JSON
- Managing HTTP status codes and responses
- Handling authentication and permissions on your own

In short, you’d be reinventing the wheel – but DRF does all of this for you with far less code.

:::

::: details Can I use this API with a React or Vue frontend?

Absolutely. Your Django API will send and receive data in JSON format — which is exactly what modern frontend frameworks like React and Vue are designed to work with. Just make sure you handle CORS (Cross-Origin Resource Sharing) correctly.

:::

::: details How do I make my API faster?

You can:

- Use **caching** to store frequent responses
- Enable **pagination** to reduce data load
- Explore **async views** (Django 3.1+ supports async) for faster I/O  
    DRF also offers built-in tools for pagination, throttling, and more performance tweaks out of the box.

:::

---

## Final Thoughts

Building a REST API in Django might sound like a big job, but it’s just a series of small, manageable steps.

Once you’ve done it once, it gets way easier the next time. Plus, using Django REST Framework saves a ton of time—you’re not reinventing the wheel every time.

::: info Further Resources

Want to keep learning? Here are a few solid places to dig deeper:

```component VPCard
{
  "title": "Home - Django REST framework",
  "desc": "Django, API, REST, Home",
  "link": "https://django-rest-framework.org/",
  "logo": "https://django-rest-framework.org/img/favicon.ico",
  "background": "rgba(163,0,0,0.2)"
}
```

<SiteInfo
  name="Django documentation | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

```component VPCard
{
  "title": "Simple JWT — Simple JWT 5.2.2.post30+gfaf92e8 documentation",
  "desc": "A JSON Web Token authentication plugin for the Django REST Framework.",
  "link": "https://django-rest-framework-simplejwt.readthedocs.io/en/latest/",
  "logo": "https://django-rest-framework-simplejwt.readthedocs.io/favicon.ico",
  "background": "rgba(41,128,185,0.2)"
}
```

<SiteInfo
  name="Postman API Platform"
  desc="Postman makes API development easy. Our platform offers the tools to simplify each step of the API building process and streamlines collaboration so you can create better APIs faster."
  url="https://postman.com/"
  logo="https://postman.com/_ar-assets/images/favicon-1-48.png"
  preview="https://postman.com/_ar-assets/images/postman-api-platform-social-preview-9420276277ad8d4e67e53ee548409999.jpg"/>

- [**Real Python’s Django API Guide**](/realpython.com/django-rest-framework-quick-start.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a REST API in Django",
  "desc": "If you’re building a web or mobile app, chances are you’re going to need a way to send and receive data between your app and a server. That’s where REST APIs come in. They help apps talk to each other – kind of like a waiter taking your order and",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-rest-api-in-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
