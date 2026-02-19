---
lang: en-US
title: "How to Optimize Django REST APIs for Performance: Profiling, Caching, and Scaling."
description: "Article(s) > How to Optimize Django REST APIs for Performance: Profiling, Caching, and Scaling."
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
      content: "Article(s) > How to Optimize Django REST APIs for Performance: Profiling, Caching, and Scaling."
    - property: og:description
      content: "How to Optimize Django REST APIs for Performance: Profiling, Caching, and Scaling."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-optimize-django-rest-apis-for-performance.html
prev: /programming/py-django/articles/README.md
date: 2026-02-18
isOriginal: false
author:
  - name: Mari
    url: https://freecodecamp.org/news/author/Techgirlll/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771352481135/11be538b-aaf5-4c1e-8ee2-99deea5f180e.png
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
  name="How to Optimize Django REST APIs for Performance: Profiling, Caching, and Scaling."
  desc="Performance problems in APIs rarely start as performance problems. They usually start as small design decisions that worked perfectly when the application had ten users, ten records, or a single developer testing locally. Over time, as traffic increa..."
  url="https://freecodecamp.org/news/how-to-optimize-django-rest-apis-for-performance"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1771352481135/11be538b-aaf5-4c1e-8ee2-99deea5f180e.png"/>

Performance problems in APIs rarely start as performance problems. They usually start as small design decisions that worked perfectly when the application had ten users, ten records, or a single developer testing locally. Over time, as traffic increases and data grows, those same decisions begin to slow everything down.

In this article, we’ll walk step by step through how performance issues arise in Django REST APIs, how to see them clearly using profiling tools, and how to fix them using query optimization, caching, pagination, and basic scaling strategies.

This article will be most useful for developers who already understand Django, the Django REST Framework, and REST concepts, but are new to performance optimization.

---

## Why Django REST APIs Become Slow

Before optimizing anything, it’s important to understand why APIs become slow in the first place.

Most performance issues in Django REST APIs come from three main sources:

1. Too many database queries
2. Doing expensive work repeatedly
3. Returning more data than necessary

Django is fast by default, but it does exactly what you ask it to do. If your API endpoint triggers 300 database queries, Django will happily run all 300. Now let’s look at some common causes of performance issues in Django REST APIs.

### 1. N+1 Query Problems in Serializers

This happens when you loop over objects and access related fields, causing a separate query for each object.

```py
# models.py
class Author(models.Model):
    name = models.CharField(max_length=100)

class Post(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

# views.py (naive approach)
posts = Post.objects.all()
for post in posts:
    # This triggers a query per post to fetch the author
    print(post.author.name)
```

If you have 100 posts, this runs 101 queries: 1 for posts and 100 for authors. Django lazily loads related objects by default, so without intervention, your API performs repetitive database work that slows response times.

### 2. Fetching Related Objects Inefficiently

```py
# Naive queryset fetching all related objects separately
posts = Post.objects.all()
authors = [post.author for post in posts]  # triggers extra queries per post
```

Each access to `post.author` triggers a new query. Even though you already fetched all posts, Django lazily loads related objects by default. This creates many extra queries, slowing down your API.

### 3. Serializing Large Datasets Without Pagination

Returning large query sets all at once can slow down your API and increase memory usage.

```py title="views.py"
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post
from .serializers import PostSerializer

@api_view(['GET'])
def all_posts(request):
    posts = Post.objects.all()  # retrieves all posts at once
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)
```

If your database has thousands of posts, this endpoint fetches everything in memory, serializes it, and sends it over the network. It’s slow and can crash under load. Later, we’ll learn to paginate results efficiently.

### 4. Recomputing Expensive Work Repeatedly

Some endpoints calculate the same values on every request instead of caching or precomputing.

```py
def expensive_view(request):
    # Simulate expensive computation
    result = sum([i**2 for i in range(1000000)])
    return JsonResponse({"result": result})
```

Even if the data doesn’t change often, this computation happens on every request, consuming CPU time unnecessarily.

Performance optimization is about reducing unnecessary work.

At this point, it might be tempting to jump straight into fixes like caching responses or optimizing database queries. But doing that without evidence often leads to wasted effort or even new problems.

Before changing anything, you need to understand where your API is actually spending time. Is it the database? Is it serialization? Is it Python code running repeatedly on every request? This is where profiling becomes essential.

---

## Profiling: Finding the Real Bottlenecks

Optimizing without profiling is guessing. Profiling helps you answer one question:

> Where is my API actually spending time?

In practice, profiling means observing an API while it runs and collecting data about what it’s doing. This includes how many database queries are executed, how long those queries take, and how much time is spent in Python code, such as serializers or business logic.

By profiling first, you avoid making assumptions and can focus on fixing the parts of your API that are truly slowing things down.

### Measuring Query Count in a View

During development, Django keeps track of all executed queries. You can inspect them directly:

```py
from django.db import connection
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer

@api_view(["GET"])
def post_list(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)

    response = Response(serializer.data)

    print(f"Total queries executed: {len(connection.queries)}")

    return response
```

If this prints 101 queries for 100 posts, you likely have an N+1 problem. This simple check confirms whether the database layer is the bottleneck.

One of the easiest ways to profile Django applications during development is by using tools that expose this information directly while requests are being processed.

### Using the Django Debug Toolbar

The Django Debug Toolbar is one of the simplest ways to understand performance during development. It acts as a lightweight profiling tool that shows what happens behind the scenes when a request is handled.

It shows you:

- How many SQL queries were executed
- How long each query took
- whether queries are duplicated
- Which parts of the request lifecycle are slow

#### How to Install and Enable the Django Debug Toolbar

First, install it:

```sh
pip install django-debug-toolbar
```

In <VPIcon icon="fa-brands fa-python"/>`settings.py`:

```py title="settings.py"
INSTALLED_APPS = [
    ...
    "debug_toolbar",
]

MIDDLEWARE = [
    ...
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

INTERNAL_IPS = [
    "127.0.0.1",
]
```

In <VPIcon icon="fa-brands fa-python"/>`urls.py`:

```py title="urls.py"
import debug_toolbar
from django.urls import path, include

urlpatterns = [
    ...
    path("__debug__/", include(debug_toolbar.urls)),
]
```

When you load an endpoint in the browser during development, the toolbar displays total SQL queries, execution time, and duplicate queries. This makes inefficiencies immediately visible.

When you load an API endpoint and see 150 SQL queries for a single request, that’s a strong signal that something is wrong, often an N+1 query problem or inefficient serializer behavior.

### Logging SQL Queries

Django allows you to log all executed SQL queries. This is especially useful when debugging API views.

Seeing the raw SQL makes inefficiencies obvious, such as repeated `SELECT` statements for the same table.

#### How to Enable SQL Query Logging

You can configure Django to log all SQL queries in <VPIcon icon="fa-brands fa-python"/>`settings.py`:

```py title="settings.py"
LOGGING = {
    "version": 1,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "loggers": {
        "django.db.backends": {
            "handlers": ["console"],
            "level": "DEBUG",
        },
    },
}
```

With this configuration, every SQL query will be printed to the console when your API runs. Repeated SELECT statements or unexpected queries become obvious.

### Profiling API Response Time

Database queries are only one part of API performance. Beyond queries, it’s also important to measure the total response time of an endpoint.

Profiling response time helps you understand whether delays are caused by database access or by other parts of the request lifecycle. For example, if an endpoint takes 1.2 seconds to respond but only 50 milliseconds are spent on database queries, the bottleneck is likely in serialization, business logic, or repeated computations in Python.

By comparing query time and total response time, profiling helps you identify what to fix first instead of optimizing the wrong layer of the system.

#### How to Measure Total Response Time

```py
import time
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def example_view(request):
    start_time = time.time()

    # Simulate work
    data = {"message": "Hello world"}

    response = Response(data)

    end_time = time.time()
    print(f"Response time: {end_time - start_time:.4f} seconds")

    return response
```

If database queries are fast but the total response time is high, the bottleneck may be serialization or expensive Python logic.

Once you’ve identified that database access is a significant contributor to slow response times, the next step is to look more closely at how Django retrieves related data.

### SQL Query Optimization in Django REST APIs

One of the most common reasons Django REST APIs become slow is inefficient access to related objects. This often manifests as the N+1 query problem, where fetching related objects triggers a separate database query for each item. Identifying and fixing this problem can significantly reduce the number of queries and improve API performance.

#### Understanding the N+1 Query Problem

Consider a simple example:

- You fetch a list of posts
- Each post has an author
- For every post, Django fetches the author separately

If you have 100 posts, this results in 101 queries: 1 for the posts and 100 for the authors. This happens because Django lazily loads related objects by default. Without intervention, your API performs repetitive database work that slows down response times.

#### Solving the Problem with `select_related` and `prefetch_related`

Django provides built-in tools to control how related objects are loaded efficiently: `select_related` and `prefetch_related`.

##### 1. Using `select_related`

`select_related` is designed for foreign key and one-to-one relationships. It performs an SQL join and retrieves related objects in a single query.

Use it when:

- You know you will access related objects
- The relationship is one-to-one or many-to-one

```sh
posts = Post.objects.select_related("author")

for post in posts:
    print(post.author.name)  # No additional queries
```

This performs a SQL JOIN and retrieves posts and authors in a single query, eliminating the N+1 problem.

It reduces multiple queries into just one, avoiding repeated database hits.

##### 2. Using `prefetch_related`

`prefetch_related` is used for many-to-many and reverse foreign key relationships. It performs separate queries for each related table but combines the results in Python.

Use it when:

- A SQL join would produce too much duplicated data
- You are dealing with collections of related objects

#### Example: How to Optimize a Many-to-Many Relationship

Consider a blog application where posts can have multiple tags:

```py title="models.py"
class Tag(models.Model):
    name = models.CharField(max_length=50)

class Post(models.Model):
    title = models.CharField(max_length=200)
    tags = models.ManyToManyField(Tag)
```

Now imagine fetching posts and accessing their tags:

```py title="models.py"
posts = Post.objects.all()

for post in posts:
    print(post.tags.all())  # Triggers additional queries
```

If you have 100 posts, Django may execute:

- 1 query to fetch posts
- 1 query per post to fetch related tags

This results in many unnecessary database hits.

You can optimize this using `prefetch_related`:

```py title="models.py"
posts = Post.objects.prefetch_related("tags")

for post in posts:
    print(post.tags.all())  # Uses prefetched data
```

With this approach, Django performs one query for posts and one query for all related tags. It then matches them in Python, eliminating repeated database queries.

Together, these tools allow you to optimize your queries and eliminate the N+1 problem efficiently.

#### Common Beginner Mistakes

Even after applying these optimizations, it’s easy to make mistakes. Watch out for:

- Forgetting that serializers can trigger additional queries
- Using `select_related` on many-to-many relationships
- Assuming Django automatically optimizes queries
- Not checking the query count after adding serializers

Paying attention to these pitfalls ensures your API remains fast and scalable.

### Caching in Django REST APIs

Even after optimizing database queries, API performance can still suffer if the same computations or database lookups are performed repeatedly. This is where caching comes in. Caching is a technique for storing the results of expensive operations so they can be retrieved more quickly the next time they are needed.

At its core, caching exists because computers have multiple layers of memory with different speeds:

- CPU registers (fastest)
- L1, L2, L3 caches
- Main memory (RAM)
- SSD storage
- HDD storage (slowest)

Each layer trades speed for size: the closer the data is to the CPU, the faster it can be accessed. Software systems use the same principle; by storing frequently accessed data in a “closer” or faster location, applications can respond more quickly.

#### Cache Eviction

Caches are limited in size, so when a cache is full, some data must be removed to make room for new data. This process is called cache eviction.

Common eviction strategies include:

- **Least Recently Used (LRU):** removes the data that hasn’t been accessed for the longest time
- **Random Replacement:** removes a random item from the cache

The goal is to keep the data that is most likely to be requested again while freeing space for new data. Understanding this helps developers use caching effectively.

#### Caching in Application Architectures

Caching exists at several levels in modern software systems:

- **Client-side caching:** Web browsers cache HTTP responses to reduce the need for repeated network requests. This is controlled with HTTP headers like `Cache-Control`.
- **CDN caching:** Content Delivery Networks store static assets closer to users, reducing latency and server load.
- **Backend caching:** Backend services cache results from database queries, computed values, or API responses. This is where Django caching is most commonly applied.

By applying caching strategically at the backend, APIs can serve data faster while reducing computation and database load.

#### Caching in Django

Django provides a flexible caching framework that supports multiple backends, including in-memory, file-based, database-backed, and third-party stores like Redis. The main types of caching in Django are:

1. **Per-view caching:** caches the entire output of a view. Ideal for endpoints where responses rarely change.

```py
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)  # cache for 15 minutes
def my_view(request):
```

2. Template fragment caching: caches specific parts of a template to avoid repeated rendering.
3. Low-level caching: gives full control over what is cached and for how long, making it ideal for API responses.

By combining these approaches, you can reduce repeated work in your API, lower database load, and speed up response times.

### When to Use Redis

While Django’s built-in caching backends are sufficient for many projects, high-traffic APIs often require a shared, in-memory cache. This is where Redis excels. Redis is designed for fast access, low latency, and can handle frequent reads across multiple servers.

You should consider using Redis when:

- Data is read frequently but changes infrequently
- Low latency is important for API responses
- You need cache expiration and eviction policies
- You want a shared cache across multiple servers or services

Redis is particularly effective for API endpoints that serve the same data to many users, such as frequently accessed lists or computed results.

::: tip Common Beginner Mistakes

Caching is powerful, but it’s easy to misuse. Some common pitfalls include:

- **Caching everything blindly:** not all data benefits from caching
- **Forgetting cache invalidation:** stale data can lead to incorrect responses
- **Using cache where query optimization would suffice:** sometimes optimizing database queries is a better solution than caching.

Remember: caching should complement good database design, not replace it.

:::

### Pagination and Limiting Expensive Datasets

Even with caching, returning large datasets in a single request can slow down your API and increase memory usage. Pagination is a simple and effective way to limit the amount of data returned at once.

Pagination helps by reducing:

- Database load
- Memory usage
- Serialization time
- Network transfer size

Django REST Framework provides built-in pagination classes that make it easy to paginate endpoints. As a rule of thumb, always paginate list endpoints unless there is a strong reason not to.

### Load Testing and Measuring Improvement

Optimizations are only meaningful if you can measure their impact. Load testing simulates multiple users accessing your API simultaneously, helping you answer key questions:

- How many requests per second can my API handle?
- Where does the API start to break under load?
- Did caching, query optimization, and pagination actually improve performance?

By running load tests before and after optimization, you can validate that your changes have the desired effect and avoid optimizing the wrong parts of your system.

---

## Summary and Next Steps

Optimizing Django REST APIs isn’t about chasing every tiny micro-optimization. It’s about reducing unnecessary work and focusing on the parts of your API that actually slow down performance.

::: important Key Takeaways

- **Profile before optimizing:** Identify the real bottlenecks before making changes.
- **Reduce database queries:** Use techniques like `select_related`, `prefetch_related`, and avoid N+1 queries.
- **Cache frequently accessed data:** Use Django caching and Redis to reduce repeated computations.
- **Paginate large datasets:** Limit memory usage and network load by returning data in chunks.
- **Measure performance changes:** Always verify that your optimizations have a real impact.

:::

::: note Next Steps for Your APIs

1. **Add profiling to your existing APIs** to understand where time is spent.
2. **Identify one slow endpoint** and focus on optimizing it first.
3. **Optimize database queries** using Django ORM best practices.
4. **Introduce caching carefully**; avoid caching everything blindly.
5. **Measure the results** with load testing and performance metrics.

Remember: Performance optimization is not a one-time task. It’s a habit built by continuously observing how your system works, testing improvements, and applying changes where they make the most impact.

:::

::: info Read More

<SiteInfo
  name="Database access optimization | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/6.0/topics/db/optimization//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Optimize Django REST APIs for Performance: Profiling, Caching, and Scaling.",
  "desc": "Performance problems in APIs rarely start as performance problems. They usually start as small design decisions that worked perfectly when the application had ten users, ten records, or a single developer testing locally. Over time, as traffic increa...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-optimize-django-rest-apis-for-performance.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
