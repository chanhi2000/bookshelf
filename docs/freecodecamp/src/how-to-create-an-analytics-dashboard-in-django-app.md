---
lang: en-US
title: "How to create an analytics dashboard in a Django app"
description: "Article(s) > How to create an analytics dashboard in a Django app"
icon: iconfont icon-django
category: 
  - Python
  - Django
  - Data Science
  - SQLite
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
  - django
  - py-django
  - data-science
  - sql
  - sqlite
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to create an analytics dashboard in a Django app"
    - property: og:description
      content: "How to create an analytics dashboard in a Django app"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-analytics-dashboard-in-django-app.html
prev: /programming/py-django/articles/README.md
date: 2020-02-12
isOriginal: false
author:
  - name: Veronika Rovnik
    url: https://veronikarovnik.medium.com/
cover: https://cdn-media-2.freecodecamp.org/w1280/5f9c9c9e740569d1a4ca3336.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Django > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "SQLite > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/sqlite/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to create an analytics dashboard in a Django app"
  desc="By Veronika Rovnik Hi folks! Python, data visualization, and programming are the topics I'm profoundly devoted to. That’s why I’d like to share with you my ideas as well as my enthusiasm for discovering new ways to present data in a meaningful way. T..."
  url="https://freecodecamp.org/news/how-to-create-an-analytics-dashboard-in-django-app"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-2.freecodecamp.org/w1280/5f9c9c9e740569d1a4ca3336.jpg"/>

Hi folks!

**Python**, **data visualization**, and **programming** are the topics I'm profoundly devoted to. That’s why I’d like to share with you my ideas as well as my enthusiasm for discovering new ways to present data in a meaningful way.

The case I'm going to cover is quite common: you have data on the back end of your app and want to give it shape on the front end. If such a situation sounds familiar to you, then this tutorial may come in handy.

After you complete it, you’ll have a **Django-powered app** with interactive **pivot tables** & **charts**.

::: note Prerequisites

To confidently walk through the steps, you need a basic knowledge of the Django framework and *a bit of creativity*. ✨

To follow along, you can download the [GitHub sample (<VPIcon icon="iconfont icon-github"/>`veronikaro/django-dashboard-app`)](https://github.com/veronikaro/django-dashboard-app).

Here's a brief list of tools we’re going to use:

- [<VPIcon icon="fa-brands fa-python"/>Python 3.7.4](https://python.org/downloads/release/python-374/)
- [<VPIcon icon="iconfont icon-django"/>Django](https://djangoproject.com/?r=fr5)
- [<VPIcon icon="fas fa-globe"/>Virtualenv](https://virtualenv.pypa.io/en/latest/)
- [<VPIcon icon="fas fa-globe"/>Flexmonster Pivot Table & Charts](https://flexmonster.com/?r=fr5) (JavaScript library)
- [<VPIcon icon="iconfont icon-sqlite"/>SQLite](https://sqlite.org/index.html)

If you have already set up a Django project and feel confident about the basic flow of creating apps, you can jump straight to the **Connecting data to Flexmonster** section that explains how to add data visualization components to it.

:::

Let's start!

---

## Getting started with Django

First things first, let’s make sure you’ve installed Django on your machine. The rule of thumb is to install it in your previously set up virtual environment - a powerful tool to isolate your projects from one another.

Also, make sure you’ve activated in a newly-created directory. Open your console and bootstrap a Django project with this command:

```sh
django-admin startproject analytics_project
```

Now there’s a new directory called <VPIcon icon="fas fa-folder-open"/>`analytics_project`. Let’s check if we did everything right. Go to <VPIcon icon="fas fa-folder-open"/>`analytics_project` and start the server with a console command:

```py
spython manage.py runserver
```

Open `http://127.0.0.1:8000/` in your browser. If you see this awesome rocket, then everything is fine:

![](https://freecodecamp.org/news/content/images/2020/02/DjangoRocket.gif)

Next, create a new app in your project. Let’s name it `dashboard`:

```sh
python manage.py startapp dashboard
```

::: tip Here's a tip

If you're not sure about the [<VPIcon icon="fas fa-globe"/>difference between the concepts of apps and projects in Django](https://wsvincent.com/django-projects-vs-apps/), take some time to learn about it to have a clear picture of how Django projects are organized.

:::

Here we go. Now we see a new directory within the project. It contains the following files:

- <VPIcon icon="fa-brands fa-python"/>`__init__.py` to make Python treat it as a package
- <VPIcon icon="fa-brands fa-python"/>`admin.py`: settings for the Django admin pages
- <VPIcon icon="fa-brands fa-python"/>`apps.py`: settings for app’s configs
- <VPIcon icon="fa-brands fa-python"/>`models.py`: classes that will be converted to database tables by the Django’s ORM
- <VPIcon icon="fa-brands fa-python"/>`tests.py`: test classes
- <VPIcon icon="fa-brands fa-python"/>`views.py`: functions & classes that define how the data is displayed in the templates

Afterward, it’s necessary to register the app in the project.  
Go to <VPIcon icon="fas fa-folder-open"/>`analytics_project/`<VPIcon icon="fa-brands fa-python"/>`settings.py` and append the app's name to the `INSTALLED_APPS` list:

```py title="settings.py"
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'dashboard',
]
```

Now our project is aware of the app’s existence.

---

## Views

In the <VPIcon icon="fas fa-folder-open"/>`dashboard/views.py`, we’ll create a function that directs a user to the specific templates defined in the <VPIcon icon="fas fa-folder-open"/>`dashboard/templates` folder. Views can contain classes as well.

Here’s how we define it:

```py title="dashboard/views.py"
from django.http import JsonResponse
from django.shortcuts import render
from dashboard.models import Order
from django.core import serializers

def dashboard_with_pivot(request):
    return render(request, 'dashboard_with_pivot.html', {})
```

Once called, this function will render <VPIcon icon="fa-brands fa-html5"/>`dashboard_with_pivot.html` - a template we'll define soon. It will contain the pivot table and pivot charts components.

A few more words about this function. Its `request` argument, an instance of `HttpRequestObject`, contains information about the request, e.g., the used HTTP method (GET or POST). The method `render` searches for HTML templates in a <VPIcon icon="fas fa-folder-open"/>`templates` directory located inside the app’s directory.

We also need to create an auxiliary method that sends the response with data to the pivot table on the app's front-end. Let's call it `pivot_data`:

```py
def pivot_data(request):
    dataset = Order.objects.all()
    data = serializers.serialize('json', dataset)
    return JsonResponse(data, safe=False)
```

Likely, your IDE is telling you that it can’t find a reference `Order` in <VPIcon icon="fa-brands fa-python"/>`models.py`. No problem - we’ll deal with it later.

---

## Templates

For now, we’ll take advantage of the Django template system.

Let's create a new directory <VPIcon icon="fas fa-folder-open"/>`templates` inside <VPIcon icon="fas fa-folder-open"/>`dashboard` and create the first HTML template called <VPIcon icon="fa-brands fa-html5"/>`dashboard_with_pivot.html`. It will be displayed to the user upon request. Here we also add the scripts and containers for data visualization components:

```html
<head>
  <meta charset="UTF-8">
  <title>Dashboard with Flexmonster</title>
  <script src="https://cdn.flexmonster.com/flexmonster.js"></script>
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <link rel="stylesheet" href="https://cdn.flexmonster.com/demo.css">
</head>
<body>
<div id="pivot-table-container" data-url="{% url 'pivot_data' %}"></div>
<div id="pivot-chart-container"></div>
</body>
```

---

## Mapping views functions to URLs

To call the views and display rendered HTML templates to the user, we need to map the views to the corresponding URLs.

::: tip Here's a tip

[<VPIcon icon="iconfont icon-django"/>one of Django's URL design principles says about loose coupling](https://docs.djangoproject.com/en/2.1/misc/design-philosophies/#id8), we shouldn't make URLs with the same names as Python functions.

:::

Go to <VPIcon icon="fas fa-folder-open"/>`analytics_app/`<VPIcon icon="fa-brands fa-python"/>`urls.py` and add relevant configurations for the `dashboard` app at the project's level.

```py title="analytics_app/urls.py"
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/', include('dashboard.urls')),
]
```

Now the URLs from the `dashboard` app can be accessed but only if they are prefixed by `dashboard`.

After, go to <VPIcon icon="fas fa-folder-open"/>`dashboard/`<VPIcon icon="fa-brands fa-python"/>`urls.py` (create this file if it doesn’t exist) and add a list of URL patterns that are mapped to the view functions:

```py title="dashboard/urls.py"
from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_with_pivot, name='dashboard_with_pivot'),
    path('data', views.pivot_data, name='pivot_data'),
]
```

---

## Model

And, at last, we've gotten to **data modeling**. This is my favorite part.

As you might know, a data model is a conceptual representation of the data stored in a database.

Since the purpose of this tutorial is to show how to build interactive data visualization inside the app, we won’t be worrying much about the database choice. We’ll be using **SQLite** - a lightweight database that ships with the Django web development server.

But keep in mind that this database is not the appropriate choice for production development. With the Django ORM, you can use other databases that use the SQL language, such as PostgreSQL or MySQL.

For the sake of simplicity, our model will consist of one class. You can create more classes and define relationships between them, complex or simple ones.

Imagine we're designing a **dashboard for the sales department**. So, let's create an **Order** class and define its attributes in <VPIcon icon="fas fa-folder-open"/>`dashboard/`<VPIcon icon="fa-brands fa-python"/>`models.py`:

```py title="dashboard/models.py"
from django.db import models


class Order(models.Model):
    product_category = models.CharField(max_length=20)
    payment_method = models.CharField(max_length=50)
    shipping_cost = models.CharField(max_length=50)
    unit_price = models.DecimalField(max_digits=5, decimal_places=2)
```

---

## Working with a database

Now we need to create a database and populate it with records.

*But how can we translate our model class into a database table?*

This is where the concept of **migration** comes in handy. **Migration** is simply a file that describes which changes must be applied to the database. Every time we need to create a database based on the model described by Python classes, we use migration.

The data may come as Python objects, dictionaries, or lists. This time we'll represent the entities from the database using Python classes that are located in the `models` directory.

Create migration for the app with one command:

```sh
python manage.py makemigrations dashboard
```

Here we specified that the app should tell Django to apply migrations for the `dashboard` app's models.

After creating a migration file, apply migrations described in it and create a database:

```sh
python manage.py migrate dashboard
```

If you see a new file <VPIcon icon="iconfont icon-sqlite"/>`db.sqlite3` in the project's directory, we are ready to work with the database.

Let's create instances of our Order class. For this, we'll use the Django shell - it's similar to the Python shell but allows accessing the database and creating new entries.

So, start the Django shell:

```py
python manage.py shell
```

And write the following code in the interactive console:

```py
from dashboard.models import Order

o1 = Order(
    product_category='Books',
    payment_method='Credit Card',
    shipping_cost=39,
    unit_price=59
)
o1.save()
```

Similarly, you can create and save as many objects as you need.

---

## Connecting data to Flexmonster

And here's what I promised to explain.

Let's figure out how to pass the data from your model to the data visualization tool on the front end.

To make the back end and Flexmonster communicate, we can follow two different approaches:

- *Using the request-response cycle.* We can use Python and the Django template engine to write JavaScript code directly in the template.
- *Using an async request (AJAX)* that returns the data in JSON.

In my mind, the second one is the most convenient because of a number of reasons. First of all, Flexmonster understands JSON. To be precise, it can accept an array of JSON objects as input data. Another benefit of using async requests is the better page loading speed and more maintainable code.

Let's see how it works.

Go to the <VPIcon icon="fas fa-folder-open"/>`templates/`<VPIcon icon="fa-brands fa-html5"/>`dashboard_pivot.html`.

Here we've created two `div` containers where the pivot grid and pivot charts will be rendered.

Within the ajax call, we make a request based on the URL contained in the `data-URL` property. Then we tell the ajax request that we expect a JSON object to be returned (defined by `dataType`).

Once the request is completed, the JSON response returned by our server is set to the `data` parameter, and the pivot table, filled with this data, is rendered.

The query result (the instance of `JSONResponse`) returns a string that contains an array object with extra meta information, so we should add a tiny function for data processing on the front end. It will extract only those nested objects we need and put them into a single array. This is because Flexmonster accepts an array of JSON objects without nested levels.

```js
function processData(dataset) {
  var result = []
  dataset = JSON.parse(dataset);
  dataset.forEach(item => result.push(item.fields));
  return result;
}
```

After processing the data, the component receives it in the right format and performs all the hard work of data visualization. A huge plus is that there’s no need to group or aggregate the values of objects manually.

Here's how the entire script in the template looks:

```js
function processData(dataset) {
  var result = []
  dataset = JSON.parse(dataset);
  dataset.forEach(item => result.push(item.fields));
  return result;
}
$.ajax({
  url: $("#pivot-table-container").attr("data-url"),
  dataType: 'json',
  success: function (data) {
    new Flexmonster({
      container: "#pivot-table-container",
      componentFolder: "https://cdn.flexmonster.com/",
      width: "100%",
      height: 430,
      toolbar: true,
      report: {
        dataSource: {
          type: "json",
          data: processData(data)
        },
        slice: {}
      }
    });
    new Flexmonster({
      container: "#pivot-chart-container",
      componentFolder: "https://cdn.flexmonster.com/",
      width: "100%",
      height: 430,
      //toolbar: true,
      report: {
        dataSource: {
          type: "json",
          data: processData(data)
        },
        slice: {},
        "options": {
          "viewType": "charts",
          "chart": {
            "type": "pie"
          }
        }
      }
    });
  }
});
```

Don't forget to enclose this JavaScript code in `<script>` tags.

*Phew! We’re nearly there with this app.*

---

## Fields customization

Flexmonster provides a special property of the data source that allows setting field data types, custom captions, and defining multi-level hierarchies.

This is a nice feature to have - we can elegantly separate data and its presentation right in the report's configuration.

Add it to the `dataSource` property of the report:

```js
mapping: {
  "product_category": {
    "caption": "Product Category",
      "type": "string"
  },
  "payment_method": {
    "caption": "Payment Method",
      "type": "string"
  },
  "shipping_cost": {
    "caption": "Shipping Cost",
      "type": "number"
  },
  "unit_price": {
    "caption": "Unit Price",
      "type": "number"
  }
}
```

---

## Dashboard's design

To make the dashboard, we’ve rendered two instances of Flexmonster (you can create as many as you want, depending on the data visualization goals you want to reach). One is for the pivot table with summarized data, and the other is for the pivot charts.

Both instances share the same data source from our model. I encourage you to try making them work in sync: with the [<VPIcon icon="fas fa-globe"/>`reportchange`](https://flexmonster.com/api/reportchange/?r=fr5) event, you can make one instance react to the changes in another one.

You can also redefine the ‘Export’ button’s functionality on the Toolbar to make it save your reports to the server.

::: info Results

Let’s start the Django development server and open [`http://127.0.0.1:8000/dashboard/`](http://127.0.0.1:8000/dashboard/) to see the resulting dashboard:

![](https://freecodecamp.org/news/content/images/2020/02/DjangoFlexmonster.gif)

Looks nice, doesn't it?

:::

::: note Feedback

This time we learned **how to create a simple Django app** and display the data on the client side in the form of an **analytics dashboard**.

I do hope you enjoyed the tutorial!

Please leave your comments below - any feedback on the code’s improvement is highly appreciated.

:::

::: info References

The source code for the tutorial can be found on [GitHub (<VPIcon icon="iconfont icon-github"/>`veronikaro/django-dashboard-app`)](https://github.com/veronikaro/django-dashboard-app).

And here’s the project with [<VPIcon icon="fas fa-globe"/>Flexmonster & Django integration](https://flexmonster.com/doc/integration-with-django/?r=fr5) that inspired me for this tutorial.

Further, I recommend walking through important concepts in the documentation to master Django:

<SiteInfo
  name="Migrations | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/3.0/topics/migrations//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="QuerySet API reference | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/3.0/ref/models/querysets//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="Serializing Django objects | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/3.0/topics/serialization//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to create an analytics dashboard in a Django app",
  "desc": "By Veronika Rovnik Hi folks! Python, data visualization, and programming are the topics I'm profoundly devoted to. That’s why I’d like to share with you my ideas as well as my enthusiasm for discovering new ways to present data in a meaningful way. T...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-analytics-dashboard-in-django-app.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
