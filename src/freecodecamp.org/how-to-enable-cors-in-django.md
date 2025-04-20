---
lang: en-US
title: "How to Enable CORS in Django"
description: "Article(s) > How to Enable CORS in Django"
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
      content: "Article(s) > How to Enable CORS in Django"
    - property: og:description
      content: "How to Enable CORS in Django"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-enable-cors-in-django.html
prev: /programming/py-django/articles/README.md
date: 2025-04-29
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745855234567/f09d3338-c824-4cd8-a26f-93bb485f925a.png
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
  name="How to Enable CORS in Django"
  desc="If you've ever tried to connect your frontend app to your Django backend and suddenly hit an error that looks something like ”has been blocked by CORS policy”, you're not alone. It’s frustrating, especially when your code seems fine. So what’s going ..."
  url="https://freecodecamp.org/news/how-to-enable-cors-in-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745855234567/f09d3338-c824-4cd8-a26f-93bb485f925a.png"/>

If you've ever tried to connect your frontend app to your Django backend and suddenly hit an error that looks something like **"has been blocked by CORS policy"**, you're not alone. It’s frustrating, especially when your code seems fine.

So what’s going on?

This is where **CORS** (Cross-Origin Resource Sharing) comes in. It's a browser security feature that blocks web pages from making requests to a different domain than the one that served the web page.

It’s there to protect users, but if it’s not configured correctly, it can stop your app from working the way you want.

Let’s fix that.

In this article, I’ll walk you through everything you need to know to enable CORS in Django without headaches.

---

## What is CORS and Why Should You Care?

Before you start changing settings, it’s important to understand what CORS is.

Imagine you have a frontend built with React running on `http://localhost:3000` and a Django API running on `http://localhost:8000`.

When the frontend tries to talk to the backend, your browser sees that they’re not the same origin (they have different ports), and it blocks the request.

That’s CORS doing its job. It assumes you might be trying to do something unsafe – like stealing cookies or user data – so it steps in.

Now, as a developer, if you trust the frontend and you own both ends, then it’s safe to let those requests through. You just need to tell Django it’s okay.

---

## How to Enable CORS in Django

You’re going to need a third-party package called `django-cors-headers`. It’s widely used and actively maintained. Here’s how to set it up:

### 1. Install `django-cors-headers`

Run this in your terminal:

```sh
pip install django-cors-headers
```

This adds the package to your environment so Django can use it.

### 2. Add It to `INSTALLED_APPS`

Open your <FontIcon icon="fa-brands fa-python"/>`settings.py` file and find the `INSTALLED_APPS` section. Add this line:

```py title="settings.py"
INSTALLED_APPS = [
    ...
    'corsheaders',
]
```

This registers the app with Django.

### 3. Add Middleware

Now scroll down to the `MIDDLEWARE` section in <FontIcon icon="fa-brands fa-python"/>`settings.py`. Add this **at the top of the list**:

```py title="settings.py"
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]
```

**Why at the top?** Because middleware in Django runs in order. If you don’t place it at the top, the CORS headers might not be added correctly, and your browser will still block your requests.

### 4. Set the Allowed Origins

This is where you tell Django which origins are allowed to talk to your backend.

Still in <FontIcon icon="fa-brands fa-python"/>`settings.py`, add:

```py title="settings.py"
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

Replace `localhost:3000` with whatever domain or port your frontend is using. If you're using HTTPS or deploying, make sure to include the correct URL, like `https://yourfrontend.com`.

And that’s it! You’re now allowing your frontend to access your backend.

---

## Optional Settings You Might Need

Depending on your project, you might run into other issues. Here are some extra settings you might find useful:

### Allow All Origins (Not Recommended for Production)

If you’re just testing and want to allow everything (be careful with this), you can use:

```py title="settings.py"
CORS_ALLOW_ALL_ORIGINS = True
```

Again, don’t use this in production unless you understand the risks. It can open up your API to abuse.

### Allow Credentials (Cookies, Auth)

If your frontend is sending authentication credentials like cookies or tokens, you also need this:

```py title="settings.py"
CORS_ALLOW_CREDENTIALS = True
```

And make sure you **don’t** use `CORS_ALLOW_ALL_ORIGINS` with this setting – it won’t work due to security rules. Stick to `CORS_ALLOWED_ORIGINS`.

### Allow Specific Headers

By default, common headers are allowed, but if you’re sending custom ones (like `X-Auth-Token`), you can add:

```py title="settings.py"
CORS_ALLOW_HEADERS = [
    "content-type",
    "authorization",
    "x-auth-token",
    ...
]
```

::: tip Example: Full Settings File Snippet

Here’s a mini version of what your <FontIcon icon="fa-brands fa-python"/>`settings.py` might look like after setup:

```py title="settings.py"
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True
```

You can tweak this based on your needs, but that’s the basic structure.

:::

---

## Common Errors (And How to Fix Them)

### 1. CORS Not Working At All?

Double check:

- You added `corsheaders.middleware.CorsMiddleware` it **at the top** of the middleware list.
- Your frontend origin matches exactly, including port and protocol.
- You restarted your server after changing the settings.

### 2. Preflight Request Fails (OPTIONS method)

Sometimes your browser sends an `OPTIONS` request first to check if the server will allow the real request. Make sure your views or Django setup allow that method, or Django will return a 405 error.

You don’t usually need to do anything here unless you’re using a custom middleware or view decorator that blocks it.

### 3. Using Django Rest Framework?

No problem – `django-cors-headers` works out of the box. Just make sure it’s installed and the middleware is set up correctly.

---

## FAQs

::: details Can I allow multiple frontend URLs?

Yes! Just add more items to the list:

```py title="settings.py"
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://myfrontend.com",
]
```

:::

::: details Does CORS affect local development only?

No, it applies in production too. Any time your frontend and backend are on different origins (different domain or port), you need to handle CORS.

:::

::: details Is it secure to allow all origins?

No. Only do that temporarily during development. Always restrict access in production to just the domains you trust.

:::

::: details Do I need to change anything on the frontend?

Sometimes. If you're sending credentials (like cookies), you’ll need to set `credentials: "include"` in your fetch or Axios requests.

**Example with fetch:**

```js
fetch("http://localhost:8000/api/data", {
  method: "GET",
  credentials: "include",
})
```

:::

---

## Final Thoughts

CORS can feel like a wall you keep running into when building web apps. But once you get the hang of how it works – and how to set it up in Django – it becomes a small thing you configure and move on.

Just remember:

- Be specific in production
- Always restart the server after changes
- Don’t ignore warnings in your browser console – they’re your friends

Now you know how to enable CORS in Django the right way.

::: info Further Resources

<SiteInfo
  name="adamchainz/django-cors-headers"
  desc="Django app for handling the server headers required for Cross-Origin Resource Sharing (CORS)"
  url="https://github.com/adamchainz/django-cors-headers/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/47c6f180bb91af465257a3d951e0b8a9574c406a9d88648a19fa45586a85c281/adamchainz/django-cors-headers"/>

<SiteInfo
  name="Cross-Origin Resource Sharing (CORS) - HTTP | MDN"
  desc="Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS also relies on a mechanism by which browsers make a ”preflight” request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request."
  url="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<SiteInfo
  name="Middleware | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/topics/http/middleware//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Enable CORS in Django",
  "desc": "If you've ever tried to connect your frontend app to your Django backend and suddenly hit an error that looks something like ”has been blocked by CORS policy”, you're not alone. It’s frustrating, especially when your code seems fine. So what’s going ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-enable-cors-in-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
