---
lang: en-US
title: "How to Use a Foreign Key in Django"
description: "Article(s) > How to Use a Foreign Key in Django"
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
      content: "Article(s) > How to Use a Foreign Key in Django"
    - property: og:description
      content: "How to Use a Foreign Key in Django"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-a-foreign-key-in-django.html
prev: /programming/py-django/articles/README.md
date: 2025-04-22
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745330646960/e2fc7f1d-73f9-4e25-b870-e0928833e7a5.png
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
  name="How to Use a Foreign Key in Django"
  desc="When you're building something in Django - whether it's a blog, a to-do app, or even something way more complex - at some point, you'll want to connect different pieces of data. That’s where ForeignKey comes in. It helps link one model to another, li..."
  url="https://freecodecamp.org/news/how-to-use-a-foreign-key-in-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745330646960/e2fc7f1d-73f9-4e25-b870-e0928833e7a5.png"/>

When you're building something in Django - whether it's a blog, a to-do app, or even something way more complex - at some point, you'll want to connect different pieces of data.

That’s where `ForeignKey` comes in. It helps link one model to another, like tying a comment to a post, or an order to a customer.

It’s one of those things in Django that can seem confusing at first, but once it clicks, you’ll wonder how you ever built apps without it.

So let’s break it all down. I’ll walk you through everything from what a ForeignKey is, to how to use it in your Django project.

---

## What is a Foreign Key in Django?

In the simplest terms, a Foreign Key in Django creates a many-to-one relationship between two models. This means many rows in one table can be related to a single row in another.

For example:

- One blog post can have **many comments**
- One customer can have **many orders**
- One author can write **many books**

If you're coming from a spreadsheet background, think of it like linking two sheets using a shared column. In Django, you do this in your model definitions.

---

## Why Use a ForeignKey Instead of Storing IDs Manually?

You might be wondering, “Why not just store the ID of the related object in a plain integer field?”

Well, you could - but you'd lose a ton of power. Without a ForeignKey:

- You don’t get automatic validation that the related object exists.
- You can't follow relationships easily in queries (for example, `post.comments.all()` wouldn’t be possible).
- The Django admin can’t provide dropdowns or inline forms for related data.
- You lose out on helpful features like `on_delete` behaviour and related object naming.

ForeignKey fields automate and enforce these relationships, making your code cleaner, more secure, and easier to maintain.

---

## Real-World Example: Blog Posts and Comments

Let’s say you’re building a blog. You’ll probably have a `Post` model and a `Comment` model. Each comment needs to be linked to a specific post.

Here’s how that looks in code:

```py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.CharField(max_length=100)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author}'
```

Let me explain each part of that:

- `models.ForeignKey(Post, on_delete=models.CASCADE)`: This line creates the connection. It means each comment is linked to one post. The `on_delete=models.CASCADE` part tells Django to delete all related comments if a post is deleted.
- `__str__` methods just make it easier to read things in the admin or shell.

---

## What is `on_delete` and Why Does It Matter?

When you create a ForeignKey in Django, you have to include an `on_delete` argument. This controls what happens to the child rows (like comments) if the parent row (like a blog post) is deleted.

Here are the common options:

- `models.CASCADE`: Delete the child rows, too (like deleting all comments when a post is deleted).
- `models.PROTECT`: Prevent deletion if there are related objects.
- `models.SET_NULL`: Set the ForeignKey to `NULL` instead of deleting.
- `models.SET_DEFAULT`: Set a default value.
- `models.DO_NOTHING`: Do nothing (not recommended unless you really know what you're doing).

I usually go with `CASCADE` for simple apps, but it's worth thinking through depending on the situation.

---

## How to Access Related Objects in Django

Once you’ve set up the ForeignKey, Django gives you a few nice tools to work with related data.

For example, let’s say you have a post object:

```py
post = Post.objects.get(id=1)
```

You can get all comments for that post like this:

```py
comments = post.comment_set.all()
```

The `comment_set` is automatically created by Django, and you can customize the name with `related_name`:

```py
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
```

Now you can do:

```py
post.comments.all()
```

Much cleaner, right?

---

## How to Create Foreign Key Relationships in Django Admin

The Django admin handles ForeignKeys well. If you’ve got both `Post` and `Comment` models registered in `admin.py`, you’ll get a dropdown in the comment form to select the post it belongs to.

You can also make inline forms, so you can add comments while editing a post. Here’s a quick example:

```py
from django.contrib import admin
from .models import Post, Comment

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1

class PostAdmin(admin.ModelAdmin):
    inlines = [CommentInline]

admin.site.register(Post, PostAdmin)
admin.site.register(Comment)
```

Now when you're editing a post, you can add or edit comments right there on the same page.

### What Happens in the Database?

Django uses a relational database (like PostgreSQL, MySQL, or SQLite), and ForeignKey creates a column in the database table that holds the ID of the related object.

If you run `python manage.py makemigrations` and then `python manage.py migrate`, Django will create the actual database tables with the proper relationships behind the scenes.

---

## How to Query with ForeignKey

You can also filter or search based on ForeignKey relationships:

### Get all comments for a post with `id=1`:

```py
Comment.objects.filter(post_id=1)
```

Or, using the post object:

```py
post = Post.objects.get(id=1)
comments = Comment.objects.filter(post=post)
```

### Get all posts that have at least one comment by a specific user:

```py
Post.objects.filter(comments__author='John')
```

That `comments__author` part is thanks to the `related_name='comments'` I added earlier.

---

## FAQs

::: details Can a ForeignKey be optional?

Yes, just add `null=True, blank=True` like this:

```py
post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True, blank=True)
```

You might want this if the related object isn't always required. For example, a `Comment` might *optionally* belong to a `Post`, or a `Task` might optionally have a related `Project`. It’s useful when building drafts, soft deletes, or handling legacy data.

:::

::: details Can a ForeignKey point to the same model (self)?

Absolutely. That’s called a self-referential ForeignKey, often used for things like threaded comments or categories.

```py
class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL)
```

:::

::: details Can a model have more than one ForeignKey?

Totally. For example, an Order model could have one ForeignKey to a Customer, and another to a ShippingAddress.

:::

---

## Final Thoughts

If you’re building anything in Django that deals with more than one model, understanding ForeignKey is essential. It makes your app more structured, easier to query, and way more powerful.

At first, it might feel like a lot, but once you build one or two relationships and see it all working in the admin and your views, it clicks.

And if something’s still unclear, that’s normal. I had to build a few mini-projects before it started to feel natural.

::: info Further Resources

<SiteInfo
  name="Model field reference | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/ref/models/fields/#foreignkey"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="Models | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/topics/db/models//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="The Django admin site | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/ref/contrib/admin//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use a Foreign Key in Django",
  "desc": "When you're building something in Django - whether it's a blog, a to-do app, or even something way more complex - at some point, you'll want to connect different pieces of data. That’s where ForeignKey comes in. It helps link one model to another, li...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-a-foreign-key-in-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
