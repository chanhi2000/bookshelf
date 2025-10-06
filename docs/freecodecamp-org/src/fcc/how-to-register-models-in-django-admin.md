---
lang: en-US
title: "How to Register Models in Django Admin"
description: "Article(s) > How to Register Models in Django Admin"
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
      content: "Article(s) > How to Register Models in Django Admin"
    - property: og:description
      content: "How to Register Models in Django Admin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-register-models-in-django-admin.html
prev: /programming/py-django/articles/README.md
date: 2025-04-29
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745937579596/e8aed227-b7c3-4bf6-a448-a66782aeea42.png
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
  name="How to Register Models in Django Admin"
  desc="When you're building a website or an app with Django, one of the most exciting moments is when your database models finally come to life. But to manage your data easily - adding, editing, or deleting entries - you need Django’s Admin panel. Now, here..."
  url="https://freecodecamp.org/news/how-to-register-models-in-django-admin"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745937579596/e8aed227-b7c3-4bf6-a448-a66782aeea42.png"/>

When you're building a website or an app with Django, one of the most exciting moments is when your database models finally come to life.

But to manage your data easily - adding, editing, or deleting entries - you need Django’s Admin panel.

Now, here’s the catch: just creating a model isn’t enough. If you want it to show up in the Admin panel, you have to **register** it.

And honestly, registering models in Django Admin is one of the simplest but most important steps. If you miss it, it feels like your model doesn’t even exist.

In this guide, I’ll walk you through exactly how to register your models in Django Admin, step-by-step, with easy-to-understand code examples.

---

## Why Django Admin Matters

Django Admin is like your personal dashboard for the backend of your website. Once you register your models, you can manage your app's content without touching any code.

Imagine being able to add new blog posts, approve users, update product listings - all with a few clicks. That’s the magic of Django Admin.

Without properly registering your models, you’re stuck managing everything manually, which can get messy real quick.

Plus, Django Admin saves developers hours of time. It’s one of the reasons Django is such a powerful framework.

---

## How to Register Models in Django Admin

### Step 1: Make Sure You Have a Model

Before you can register anything, you need a model. Here’s a super basic example of a model inside a Django app called `blog`.

Inside <VPIcon icon="fas fa-folder-open"/>`blog/`<VPIcon icon="fa-brands fa-python"/>`models.py`:

```py title="models.py"
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

In this model:

- `title` is a short text field.
- `body` is for longer content.
- `date_created` automatically stores the time when the post is created.

And that `__str__` method? That’s just telling Django how to show each Post in the Admin - it’ll display the post’s title instead of something like `Post object (1)`.

::: tip Quick tip

Always add a `__str__` method to your models. It makes your Admin interface much cleaner.

:::

### Step 2: Register Your Model in Admin

Alright, your model is ready. Time to register it!

Open <VPIcon icon="fas fa-folder-open"/>`blog/`<VPIcon icon="fa-brands fa-python"/>`admin.py`. When you create a new Django app, this file is empty by default.

Here’s how to register the `Post` model:

```py title="admin.py"
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```

::: info What’s happening here?

- First, you import Django’s admin module.
- Then, you import your model (`Post`).
- Finally, you use `admin.site.register()` to tell Django, "Hey, I want this model to show up in the Admin panel."

:::

Save the file. Now if you go to your Admin site (usually at `http://127.0.0.1:8000/admin`), you’ll see **Posts** listed there.

### Step 3: (Optional) Customize How Your Model Looks in Admin

By default, Django Admin shows your models in a very basic table. But you can make it so much better with a little customization.

Here’s how you can make Posts show the title and creation date at a glance.

Still inside <VPIcon icon="fas fa-folder-open"/>`blog/`<VPIcon icon="fa-brands fa-python"/>`admin.py`:

```py title="admin.py"
from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_created')

admin.site.register(Post, PostAdmin)
```

Now:

- `list_display` tells Django which fields you want to show in the list view.
- You create a `PostAdmin` class that describes how the `Post` model should behave in Admin.
- When you register, you pass both the model (`Post`) and the admin class (`PostAdmin`).

::: tip Quick tip

Customizing your Admin improves your workflow *a lot* - especially when you’re managing many entries.

:::

---

## FAQS

::: details I added a model, but it’s not showing up in Admin. What happened?

Make sure you:

- Registered the model inside `admin.py`.
- Ran migrations (`python manage.py makemigrations` and `python manage.py migrate`) if you changed anything in the model.

Also, check if the app is listed in your `INSTALLED_APPS` inside `settings.py`.

:::

::: details Do I have to register every model separately?

Yes. Each model you want to manage in Admin needs to be registered. But you can register multiple models together too:

```py
from .models import Post, Comment, Category

admin.site.register([Post, Comment, Category])
```

:::

::: details How do I unregister a model?

You can use:

```py
from django.contrib import admin
from .models import Post

admin.site.unregister(Post)
```

But honestly, most of the time, you just stop registering it if you don't want it there.

:::

---

## Final Thoughts

Registering models in Django Admin might seem like a tiny step, but it has a huge impact on how you work with your data.

It turns your database into a friendly dashboard that anyone can use - even non-technical people.

Once you get comfortable with registering and customising your models, you’ll move faster and feel a lot more in control of your app.

Now I’m curious — **which model are you most excited to register in your Django Admin?** Let’s chat on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`_udemezue`)](http://x.com/_udemezue).

::: info Helpful Links and Resources

<SiteInfo
  name="The Django admin site | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/ref/contrib/admin//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

- [**Understanding Django Models (Real Python)**](/realpython.com/get-started-with-django-1.md)

```component VPCard
{
  "title": "Django admin · HonKit",
  "desc": "To add, edit and delete the posts we've just modeled, we will use Django admin. Let's open the blog/admin.py file in the code editor and replace its contents with this:",
  "link": "https://tutorial.djangogirls.org/en/django_admin/",
  "logo": "https://tutorial.djangogirls.org/gitbook/images/favicon.ico",
  "background": "rgba(65,118,144,0.2)"
}
```

:::

These are great places to go if you want to dive even deeper into Django Admin customization.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Register Models in Django Admin",
  "desc": "When you're building a website or an app with Django, one of the most exciting moments is when your database models finally come to life. But to manage your data easily - adding, editing, or deleting entries - you need Django’s Admin panel. Now, here...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-register-models-in-django-admin.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
