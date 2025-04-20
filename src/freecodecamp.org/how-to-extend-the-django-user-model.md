---
lang: en-US
title: "How to Extend the Django User Model"
description: "Article(s) > How to Extend the Django User Model"
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
      content: "Article(s) > How to Extend the Django User Model"
    - property: og:description
      content: "How to Extend the Django User Model"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-extend-the-django-user-model.html
prev: /programming/py-django/articles/README.md
date: 2025-04-10
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744293031605/8b4f148d-2e5f-49bd-90a8-7c295be2c2db.png
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
  name="How to Extend the Django User Model"
  desc="If you're working with Django and building anything that involves user accounts – like a blog, a store, or a membership site – you’ll likely hit a point where the default user model just isn’t enough. Maybe you want to add a profile picture, a phone ..."
  url="https://freecodecamp.org/news/how-to-extend-the-django-user-model"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744293031605/8b4f148d-2e5f-49bd-90a8-7c295be2c2db.png"/>

If you're working with Django and building anything that involves user accounts – like a blog, a store, or a membership site – you’ll likely hit a point where the default user model just isn’t enough.

Maybe you want to add a profile picture, a phone number, or extra permissions.

The thing is, extending the Django user model can feel confusing at first. It sounds technical, and the internet is full of advice that either skips important details or gets way too complex.

I’ve been there too.

So, in this guide, I’m going to walk you through how to properly extend the Django user model, step-by-step, without adding unnecessary stress to your project.

I’ll show you which method to use, when to use it, and how to avoid common mistakes that could cause problems later.

Let’s break it all down.

---

## What Is a User Model In Django?

Django, a popular Python web framework, comes with a built-in user model that handles authentication and authorization.

The **user model** is essentially a database table and corresponding Python class that stores core information about the users of your application, like usernames, passwords, email addresses, and other essential details.

Because many projects require additional user data or behaviors, extending or updating the user model can be very useful.

In many applications, you might want to add extra fields to capture more details about your users. For example, you may need to add:

- A profile picture to display an avatar for each user.
- A phone number for contact or multi-factor authentication purposes.
- A bio or short description
- Extra permissions or attributes that aren't covered by Django's default fields, allowing your application to control access or personalize content more effectively.

You also might want to do things like track user preferences and roles. Or you might be using an email as a username and want to customize the login behavior.

These modifications are significant because they go beyond the default capabilities of Django’s built-in user model. And trying to squeeze this extra info into the built-in user model without doing it properly can cause bugs or break your database migrations. Luckily, Django gives us a few clean ways to do it.

By extending the model, you ensure that all parts of your system – forms, views, authentication backends, and administrative interfaces – have the additional data they need to manage users properly.

Without such customizations, you might encounter limitations when trying to implement features that require extra user-related information.

::: note Prerequisites

Before diving into extending the Django user model, you should have:

- **Basic knowledge of Django:** Familiarity with Django’s project structure, models, views, and templates.
- **Understanding of Python:** Since Django is a Python framework, a working knowledge of Python is necessary.
- **Experience with Django’s default user model:** Knowing how Django handles authentication and user sessions provides a solid foundation for customizing the user model.
- **A development environment:** Ensure you have a working Django installation, a code editor, and an appropriate database set up (for example, SQLite for development).

:::

I’ll assume these prerequisites if you are comfortable with creating and running Django projects.

With these fundamentals in place, you’ll be better prepared to extend the user model effectively, whether you’re adding additional fields for profile pictures, phone numbers, or extra permissions.

---

## Three Ways to Extend the User Model

There are three main approaches to extending the user model in Django:

### 1. Create a User Profile Model (One-to-One Relationship)

This is the easiest and safest option if your project is already using Django’s default user model and you don’t want to change it.

You create a new model that links to the user with a one-to-one field. Then, you store all the extra info in this profile model.

::: tip Example

```py
from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    profile_picture = models.ImageField(upload_to='profile_pics', null=True, blank=True)
```

You can connect the profile automatically using Django signals:

```py
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        instance.userprofile.save()
```

:::

This approach is best for projects that are already live or where you want to keep things simple.

### 2. Extend AbstractUser

This is the best option if you're starting a new project and want full control over the user model. You create your custom user model by subclassing `AbstractUser`.

This lets you add extra fields directly into the user model without changing the core authentication behavior.

::: tip Example

```py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics', null=True, blank=True)
```

Then, in your settings:

```py
AUTH_USER_MODEL = 'yourapp.CustomUser'
```

You must set `AUTH_USER_MODEL` before you run the first migration. Don’t skip this step, or you’ll run into migration errors later.

This approach is best for new projects where you want full flexibility.

:::

### 3. Extend AbstractBaseUser

This is the most advanced option. You create your user model from scratch, even controlling how authentication works. It’s great if you need to use email instead of username or want to fully customize the login process.

But let me be honest: it’s also more work. You’ll need to set up your own manager and handle permissions manually.

This approach is best for projects with complex user requirements or custom login flows.

---

## Which Method Should You Use?

If you already have a working project and just need to add a few extra fields, stick with the user profile model.

If you’re starting fresh and want to add custom fields from the beginning, go with AbstractUser.

Only use AbstractBaseUser if you need total control.

---

## Common Mistakes to Avoid

- Changing `AUTH_USER_MODEL` after running migrations (this breaks your database)
- Forgetting to set `AUTH_USER_MODEL` in `settings.py`
- Not updating admin.py when using a custom user model (more on that in the next section)
- Not creating a `CustomUserManager` when using `AbstractBaseUser`

---

## Making It Work With Django Admin

If you use `AbstractUser`, you’ll need to update your admin panel to recognize your custom user model.

Here’s a quick example:

```py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone_number', 'profile_picture')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
```

This way, you’ll still get all the default admin features but with your custom fields added.

---

## FAQs

::: details Do I need to use AbstractBaseUser to use email as a username?

Not always. You can use `AbstractUser` and simply hide the username field if you want email login, but `AbstractBaseUser` it gives you full control if needed.

:::

::: details Can I switch to a custom user model after starting my project?

Technically, yes, but it’s very risky. You’d have to migrate all your data manually, which can be painful. If you can, plan for it from the start.

:::

::: details What happens if I forget to set `AUTH_USER_MODEL`?

Django will use the default `User` model, and changing it later can cause major problems with your database and migrations. So don’t forget!

:::

---

## Final Thoughts

Extending the Django user model might seem like a big deal at first, but once you know which method to use, it becomes just another part of your project setup.

Take a moment to think about your project needs before jumping in. Starting with the right approach will save you a ton of headaches later on.

So—how are you planning to extend your Django user model, and what fields do you need to add?

::: info Further Resources

<SiteInfo
  name="Customizing authentication in Django | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/topics/auth/customizing/"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="Customizing authentication in Django | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/topics/auth/customizing/"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="Signals | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/topics/signals/"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="Recently Active 'django' Questions"
  desc="Stack Overflow | The World’s Largest Online Community for Developers"
  url="https://stackoverflow.com/questions/tagged/django/"
  logo="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
  preview="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"/>

<SiteInfo
  name="How To Get Started In Tech With No Experience"
  desc="I often get questions about starting a career in tech when I don't have any previous experience."
  url="https://tchelete.com/how-to-get-started-in-tech-with-no-experience/"
  logo="https://tchelete.com/wp-content/uploads/2022/09/cropped-android-chrome-512x512-1-2-192x192.png"
  preview="https://tchelete.com/wp-content/uploads/2022/02/photo-1573164713712-03790a178651.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Extend the Django User Model",
  "desc": "If you're working with Django and building anything that involves user accounts – like a blog, a store, or a membership site – you’ll likely hit a point where the default user model just isn’t enough. Maybe you want to add a profile picture, a phone ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-extend-the-django-user-model.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
