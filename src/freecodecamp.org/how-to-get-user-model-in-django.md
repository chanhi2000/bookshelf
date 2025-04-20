---
lang: en-US
title: "How to Get the User Model in Django – A Simple Guide With Examples"
description: "Article(s) > How to Get the User Model in Django – A Simple Guide With Examples"
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
      content: "Article(s) > How to Get the User Model in Django – A Simple Guide With Examples"
    - property: og:description
      content: "How to Get the User Model in Django – A Simple Guide With Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-user-model-in-django.html
prev: /programming/py-django/articles/README.md
date: 2025-05-01
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746026362647/7b47e9e7-6baf-409a-8654-0ad1eb528e31.png
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
  name="How to Get the User Model in Django – A Simple Guide With Examples"
  desc="When I’m working with Django, one of the first things I often need to do is work with users – like getting the logged-in user, creating a new one, or extending the default user model to add more information. Now, Django has a built-in User model, but..."
  url="https://freecodecamp.org/news/how-to-get-user-model-in-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746026362647/7b47e9e7-6baf-409a-8654-0ad1eb528e31.png"/>

When I’m working with Django, one of the first things I often need to do is work with users – like getting the logged-in user, creating a new one, or extending the default user model to add more information.

Now, Django has a built-in `User` model, but sometimes you might want a custom one. That's where things can get a little confusing if you're just starting.

The good news? Getting the user model in Django is very simple once you understand how Django is set up.

Today, I’ll walk you through exactly how to get the user model in Django, explain why it matters, show you real code you can use, and answer a few common questions people usually have around this topic.

Let's jump right into it.

---

## Why Getting the User Model Correctly Matters

Before anything else, it’s important to know why this even matters.

Django projects depend heavily on user information – not just for logins, but for permissions, profiles, admin management, and much more.

If you get the user model the wrong way, you can easily run into problems later, especially if you customize your user model.

Django even warns you about this in its [<FontIcon icon="iconfont icon-django"/>official documentation](https://docs.djangoproject.com/en/stable/topics/auth/customizing/). If you don't use the right way to access the user model, your project could break when you change or extend it.

That’s why it’s super important to always get the user model the *recommended* way, which I’ll show you next.

---

## How to Get the User Model in Django

Alright, here’s the simplest way to get the user model in Django:

```py
from django.contrib.auth import get_user_model

User = get_user_model()
```

::: info What’s happening here?

- `get_user_model()` is a built-in Django function.
- It returns the correct User model – whether you're using the default one or a custom one you created.

:::

If you’re wondering why not just import `from django.contrib.auth.models import User`, the reason is this: if you ever swap out the default User model for a custom one, directly importing like that will break your code.

By using `get_user_model()`, you stay safe and future-proof your project.

---

## Full Example: Using the User Model

Let’s look at a full working example, not just a little snippet.

Imagine you want to create a new user inside a Django view:

```py
from django.contrib.auth import get_user_model
from django.http import HttpResponse

def create_user_view(request):
    User = get_user_model()
    user = User.objects.create_user(username='newuser', password='securepassword123')
    return HttpResponse(f"Created user: {user.username}")
```

In this example:

- First, I get the user model with `get_user_model()`.
- Then, I use Django’s built-in `create_user` method to create a user safely.
- Finally, I send back a simple HTTP response showing the created username.

Notice how clean and flexible it is – no matter what user model you're using under the hood.

---

## When to Use `settings.AUTH_USER_MODEL`

Another thing you’ll often see in Django projects is something like this:

```py
from django.conf import settings

settings.AUTH_USER_MODEL
```

This doesn’t **get** the user model. Instead, it gives you the **string** path to the user model, like `"auth.User"` (for default) or `"myapp.MyCustomUser"` if you customized it.

You usually use `settings.AUTH_USER_MODEL` inside your <FontIcon icon="fa-brands fa-python"/>`models.py` when you want to link to the User model in a `ForeignKey`, `OneToOneField`, or `ManyToManyField`.

For example:

```py
from django.conf import settings
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField()
```

Here, the `Profile` model is tied to the correct user model. Again, this keeps your project flexible and future-proof.

---

## Quick Summary

| Situation | What to Use |
| ---: | --- |
| Getting the actual User model in Python code (views, forms, admin, and so on) | `get_user_model()` |
| Referring to the User model in database relationships (ForeignKey, OneToOneField, and so on) | `settings.AUTH_USER_MODEL` |

Remember this table – it saves a lot of headaches later!

---

## Common Mistakes to Avoid

- **Directly importing** `User`: Never just do `from django.contrib.auth.models import User` unless you are 100% sure you're sticking with the default model forever (not recommended).
- **Hardcoding relationships**: If you write something like `ForeignKey('auth.User')` instead of using `settings.AUTH_USER_MODEL`, it will break if you ever switch to a custom user model.
- **Not creating custom user models early**: If you think you might ever need a custom user model (like adding phone numbers, extra profile fields), set it up early. Switching later is painful once you have a database full of users.

---

## FAQs

::: details 1. Can I access `request.user` directly?

Yes! Inside views, `request.user` gives you the current logged-in user object. Behind the scenes, Django is using the correct user model, whether it’s custom or default.

:::

::: details 2. What happens if I call `get_user_model()` multiple times?

No problem at all. Django caches it internally, so it’s efficient. Feel free to call it wherever you need it.

:::

::: details 3. How do I know if I’m using a custom user model?

Check your Django settings file (`settings.py`) and look for `AUTH_USER_MODEL`. If it’s set (like `'myapp.MyCustomUser'`, you are using a custom model. If it’s not there, Django is using the default.

:::

::: details 4. When should I create a custom user model?

If you even *think* you’ll need fields like phone number, date of birth, profile pictures, and so on, it’s better to set up a custom model early.

Here’s a great guide from Django’s official docs on [<FontIcon icon="iconfont icon-django"/>customizing user models](https://docs.djangoproject.com/en/stable/topics/auth/customizing/).

:::

---

## Conclusion

Working with users in Django doesn’t have to be tricky. Once you know to use `get_user_model()` when you need the model and `settings.AUTH_USER_MODEL` for database relationships, your code stays clean, safe, and ready for whatever changes come your way.

Now that you know how to get the user model in Django, what’s one thing you'd love to customize about your users in your project? Shoot me a message on [X (<FontIcon icon="fa-brands fa-x-twitter"/>`_udemezue`)](http://x.com/_udemezue/).

If you want me to show you how to **build** a custom user model from scratch, let me know – it’s not hard once you know the steps.

::: info Further Resources

<SiteInfo
  name="Customizing authentication in Django | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/topics/auth/customizing//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>


<SiteInfo
  name="How to Extend Django User Model"
  desc="The Django’s built-in authentication system is great. For the most part we can use it out-of-the-box, saving a lot ofdevelopment and testing effort. It fits ..."
  url="https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html/"
  logo="https://simpleisbetterthancomplex.com/favicon.png"
  preview="https://simpleisbetterthancomplex.com/media/2016-07-22-how-to-extend-django-user-model/featured-facebook.jpg"/>

<SiteInfo
  name="Password Protect one webpage in Flask app"
  desc="I am running a Flask web app and using Apache basic authentication(with .htaccess and .htpasswd files) to password protect it. I want to password protect only one webpage in the app. When I password "
  url="https://stackoverflow.com/questions/29725217/password-protect-one-webpage-in-flask-app/"
  logo="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
  preview="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get the User Model in Django – A Simple Guide With Examples",
  "desc": "When I’m working with Django, one of the first things I often need to do is work with users – like getting the logged-in user, creating a new one, or extending the default user model to add more information. Now, Django has a built-in User model, but...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-user-model-in-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
