---
lang: en-US
title: "How to Create Models in Your Django Project"
description: "Article(s) > How to Create Models in Your Django Project"
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
      content: "Article(s) > How to Create Models in Your Django Project"
    - property: og:description
      content: "How to Create Models in Your Django Project"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-models-in-your-django-project.html
prev: /programming/py-django/articles/README.md
date: 2025-04-26
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745610452559/e009644b-bfef-4e43-9f1b-5f2e4deebdfa.png
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
  name="How to Create Models in Your Django Project"
  desc="If you're building something with Django, there's one thing you can't skip: creating models. Models are the heart of any Django app. They define how your data is structured, how it's stored in the database, and how Django can interact with it. Now, i..."
  url="https://freecodecamp.org/news/how-to-create-models-in-your-django-project"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745610452559/e009644b-bfef-4e43-9f1b-5f2e4deebdfa.png"/>

If you're building something with Django, there's one thing you can't skip: creating models. Models are the heart of any Django app. They define how your data is structured, how it's stored in the database, and how Django can interact with it.

Now, if you're new to Django or still wrapping your head around the basics, don’t worry. I’ve been there too. Models might sound a bit intimidating at first, but they’re pretty straightforward once you see how they work.

I’ll walk you through it all – step by step – so by the end of this post, you’ll not only know how to create models, but also how to use them in real projects.

Let’s get into it.

---

## What is a Model in Django?

A model in Django is just a Python class that tells Django how you want your data to look. Django takes care of the hard part (talking to the database), so you can focus on describing your data in simple Python code.

Here’s a quick example of a basic model:

```py
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    published_date = models.DateField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
```

Let me break it down:

- `title` and `author` are just short pieces of text, so I’m using `CharField`.
- `published_date` is a date – easy enough, that’s what `DateField` is for.
- `price` is a number with decimals, so `DecimalField` does the job.

Each line describes one piece of data I want to store for every book. Simple, right?

---

## How to Create Models in Django

### Step 1: Start a Django Project (if you haven’t already)

If you’re brand new, first you need a Django project:

```sh
django-admin startproject mysite
cd mysite
python manage.py startapp books
```

Now you’ve got a Django app called `books` where you can put your models.

### Step 2: Define Your Model

Inside your app folder (`books`), open <FontIcon icon="fa-brands fa-python"/>`models.py`. That’s where you’ll define your model.

Here’s a slightly more real-world example:

```py title="models.py"
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    birthdate = models.DateField()

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    summary = models.TextField()
    isbn = models.CharField(max_length=13, unique=True)
    published = models.DateField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.title
```

What’s happening here:

- I’ve created two models: `Author` and `Book`.
- `Book` has a relationship with `Author` using `ForeignKey`. That means one author can have many books.
- I’m using `__str__()` to return a nice name when I look at objects in the Django admin.

### Step 3: Register the App and Create the Database

Before Django can use your models, make sure your app is added to the project settings.

Open <FontIcon icon="fas fa-folder-open"/>`mysite/`<FontIcon icon="fa-brands fa-python"/>`settings.py` and find the `INSTALLED_APPS` list. Add `'books',` to it:

```py title="mysite/settings.py"
INSTALLED_APPS = [
    # other apps
    'books',
]
```

Now, run migrations to create the database tables for your models:

```sh
python manage.py makemigrations
python manage.py migrate
```

This is how Django turns your Python code into actual database tables. The first command makes a migration file (basically, instructions for the database), and the second applies it.

### Step 4: Create and Use Objects

Now you can use these models in your code. Open the Django shell:

```sh
python manage.py shell
```

Then try this out:

```py title="manage.py"
from books.models import Author, Book
from datetime import date

# Create an author
jane = Author.objects.create(name="Jane Austen", birthdate=date(1775, 12, 16))

# Create a book
book = Book.objects.create(
    title="Pride and Prejudice",
    author=jane,
    summary="A novel about manners and marriage in early 19th-century England.",
    isbn="1234567890123",
    published=date(1813, 1, 28),
    price=9.99
)

print(book)
```

Django will save these to your database automatically.

---

## Extra Model Features That You’ll Use

### 1. Default Values

You can give a field a default value:

```py
is_published = models.BooleanField(default=False)
```

### 2. Auto Timestamps

These are super useful when tracking created or updated times:

```py
created_at = models.DateTimeField(auto_now_add=True)
updated_at = models.DateTimeField(auto_now=True)
```

### 3. Model Meta Options

You can add class Meta to customize things like the default ordering:

```py
class Book(models.Model):
    # fields...

    class Meta:
        ordering = ['published']
```

---

## Using Models in Django Admin

Django’s built-in admin panel is one of the best parts of the framework. But your models won’t show up there unless you register them.

In <FontIcon icon="fas fa-folder-open"/>`books/`<FontIcon icon="fa-brands fa-python"/>`admin.py`, add:

```py title="books/admin.py"
from django.contrib import admin
from .models import Author, Book

admin.site.register(Author)
admin.site.register(Book)
```

Now run:

```sh
python manage.py createsuperuser
```

Then go to `http://127.0.0.1:8000/admin`, log in, and boom – your models are there, with a full interface.

---

## FAQs

::: details Can I change a model after I’ve made it?

Yes, but you’ll need to make a new migration:

```sh
python manage.py makemigrations
python manage.py migrate
```

:::

::: details What databases work with Django?

Django works with PostgreSQL, MySQL, SQLite (default), and more. Most people start with SQLite when learning because it's easy and works out of the box.

:::

::: details What’s the difference between CharField and TextField?

Use `CharField` for short text with a max length (like a name or title). Use `TextField` for longer text (like a blog post or summary).

:::

---

## Final Thoughts

Once you understand models, the rest of Django starts to click into place. Everything – forms, views, templates – eventually connects back to the model. It's how your app stores and works with real data.

The best way to learn is by building something. Start small, maybe a book catalog, a task manager, or a personal blog. Add models one at a time and play with them in the admin.

::: info Further Resources

<SiteInfo
  name="Models | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/topics/db/models//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="Model field reference | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/ref/models/fields//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="Django Web Framework (Python) - Learn web development | MDN"
  desc="Django is an extremely popular and fully featured server-side web framework, written in Python. This module shows you why Django is one of the most popular web server frameworks, how to set up a development environment, and how to start using it to create your own web applications."
  url="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Django/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Models in Your Django Project",
  "desc": "If you're building something with Django, there's one thing you can't skip: creating models. Models are the heart of any Django app. They define how your data is structured, how it's stored in the database, and how Django can interact with it. Now, i...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-models-in-your-django-project.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
