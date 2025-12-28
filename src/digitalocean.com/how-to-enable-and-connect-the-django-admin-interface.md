---
lang: en-US
title: "How To Enable and Connect the Django Admin Interface"
description: "Article(s) > How To Enable and Connect the Django Admin Interface"
icon: iconfont icon-django
category:
  - Python
  - Django
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - py
  - python
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Enable and Connect the Django Admin Interface"
    - property: og:description
      content: "How To Enable and Connect the Django Admin Interface"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-enable-and-connect-the-django-admin-interface.html
prev: /programming/py-django/articles/README.md
date: 2017-10-17
isOriginal: false
author: 
  - name: Jeremy Morris
    url: https://digitalocean.com/community/users/jeremylevanmorris
  - name: Lisa Tagliaferri
    url: https://digitalocean.com/community/users/ltagliaferri
cover: https://community-cdn-digitalocean-com.global.ssl.fastly.net/MxBgdjDbyXdAk5cugjyP1a1E
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
  name="How To Enable and Connect the Django Admin Interface"
  desc="In this tutorial, we will connect to and enable the Django admin site so that you can manage your blog website. The Django admin site comes pre-built with a … "
  url="https://digitalocean.com/community/tutorials/how-to-enable-and-connect-the-django-admin-interface"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://community-cdn-digitalocean-com.global.ssl.fastly.net/MxBgdjDbyXdAk5cugjyP1a1E"/>

## Introduction

If you have followed along in the [Django Development series](/community/tutorial-series/django-development), you’ve started a Django application, connected your application to MySQL, and created the database models for the `Posts` and `Comments` data within your blog web application.

In this tutorial, we will connect to and enable the [<VPIcon icon="iconfont icon-django"/>Django admin site](https://docs.djangoproject.com/en/4.0/ref/contrib/admin/) so that you can manage your blog website. The Django admin site comes pre-built with a user interface that is designed to allow you and other trusted individuals to manage content for the website.

It is worth noting that Django’s official documentation points out that although this is ideal for an organization’s internal use, it is not recommended to build a web application around an automatically generated Django admin interface. If you find that your interface needs to be more process-centric or proves to abstract away the implementation details of database tables and fields, it would be best for you to write your own views for the admin side.

::: note Prerequisites

This tutorial is part of the [Django Development series](/community/tutorial-series/django-development) and is a continuation of that series.

If you have not followed along with this series, we are making the following assumptions:

- You have Django version 4 or higher installed.
- You have connected your Django app to a database. We are using MySQL, and you can achieve this connection by following part two of the Django series, “[**How To Create a Django App and Connect it to a** Database](/digitalocean.com/how-to-create-a-django-app-and-connect-it-to-a-database.md).”
- You are working with a Unix-based operating system, preferably an Ubuntu 22.04 cloud server as this is the system we have tested on. If you would like to set up Django on a similar environment, please refer to our tutorial, “[**How To Install Django and Set Up a Development Environment on Ubuntu 22.04**](/digitalocean.com/how-to-install-django-and-set-up-a-development-environment-on-ubuntu-22-04.md).

As this tutorial is largely dealing with the Django Admin Interface, you may be able to follow along even if you have a somewhat different setup.

:::

---

## Step 1. Enable the Admin

Whenever we begin doing work in Python and Django, we should activate our Python virtual environment and move into our app’s root directory. If you followed along with the series, you can achieve this by typing the following.

```sh
cd ~/my_blog_app
. env/bin/activate
```

In order to enable the Django Admin, we need to ensure that our app is part of the list of `INSTALLED_APPS` in the <VPIcon icon="fa-brands fa-python"/>`settings.py` file.

Navigate to the directory of the settings file:

```sh
cd ~/my_blog_app/blog/blog/
```

From here, open the <VPIcon icon="fa-brands fa-python"/>`settings.py` file. If it’s not already there, add `django.contrib.admin` to the list of `INSTALLED_APPS`, using a text editor like nano.

```sh
nano settings.py
```

The `INSTALLED_APPS` section of the file should be similar to the file below. Our app in the list is the one on the top, `'blogsite',` but if you created an app of a different name, ensure that that app is listed in this file as demonstrated.

```py title="settings.py"
...
# Application definition
INSTALLED_APPS = [
    'blogsite',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
...
```

Be sure to save and close the file if you made changes. In nano, you can do this by typing <kbd>CTRL</kbd> and <kbd>X</kbd> then <kbd>Y</kbd> and then <kbd>ENTER</kbd>.

We can now open the <VPIcon icon="fa-brands fa-python"/>`urls.py` file, again with nano or another text editor.

```sh
nano urls.py
```

Under the comment at the top, the file should resemble the following.

```py title="urls.py"
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]
```

If the file is different from what is above, copy and paste the lines above into your <VPIcon icon="fa-brands fa-python"/>`urls.py` file.

---

## Step 2. Verify that Admin is an Installed App

We should next migrate the models to the database so that it picks up the newly added Admin models.

Navigate to the directory where the <VPIcon icon="fa-brands fa-python"/>`manage.py` file is located.

```sh
cd ~/my_blog_app/blog
```

Remember to run the `migrate` command whenever you make any changes to the `models`, like so.

```sh
python manage.py migrate
```

If we did not make any changes to the files above, we should receive output similar to the following upon running the `migrate` command.

```plaintext title="output"
OutputOperations to perform:
  Apply all migrations: admin, auth, blogsite, contenttypes, sessions
Running migrations:
  No migrations to apply.
```

Otherwise, the output should indicate that Django made the migrations needed to support our app.

We can now start the server by running the following command. You can replace `0.0.0.0` with your IP address.

```sh
python manage.py runserver 0.0.0.0:8000
```

Then navigate to the admin panel’s URL in a browser of your choice. Be sure to input your server’s IP address.

```plaintext
http://your-server-ip:8000/admin/
```

You will receive a login screen similar to this.

![Django Admin Login Screen](https://assets.digitalocean.com/articles/eng_python/django/django-admin-login.png)

Getting to this screen lets us know that we have successfully enabled the admin app.

Though we have enabled the app, we may not have set up a Django administration account yet. We can create the admin account in order to login in the next step.

---

## Step 3. Create Admin Super-User Account

*If you already have set up an admin account and can log into your admin page, you can skip this step.*

Open a new terminal to connect to the server, or disable the Django app by pressing `CTRL` and `C` so that we can work on our server terminal’s programming environment.

Django allows you to generate a super-user account, which we can do by running the <VPIcon icon="fa-brands fa-python"/>`manage.py` file to start the super-user creation process.

```sh
python manage.py createsuperuser
```

Once we do so, we’ll be prompted to fill in details for our username, email, and password. In this tutorial, we’ll make an admin account with the username `admin_user`, the email `sammy@example.com` and the password `admin123`. You should fill this information in with your own preferences and be sure to use a secure password that you’ll remember.

```plaintext
OutputUsername (leave blank to use 'root'): admin_user
Email address: sammy@example.com
```

Then put in your password twice when you see the `Password:` prompt. You will not receive output from the keystrokes of your password when you enter it. Press enter after each prompt to confirm your password.

```plaintext
OutputPassword:
Password (again):
```

At this point, we now have an admin account with the username `admin_user` and the password `admin123`.

Let’s log in and investigate what exists on our admin page.

If needed, run the Django app again with `python manage.py runserver 0.0.0.0:8000` and then navigate once more to the URL `http://your-server-ip:8000/admin/` to get to the admin login page. Then log in with the username and password and password you just created.

After a successful login, you’ll receive the following page.

![Django Admin Panel](https://assets.digitalocean.com/articles/eng_python/django/django-admin-panel.png)

Next, we will need to work on connecting our blog app to the admin panel.

---

## Step 4. Create URL Patterns for Post and Comment

In the previous step, we successfully logged into the admin interface, but you may have noticed that our blog app is not yet available there. To populate our admin interface with the blog app, we need to add and register it with the associated models `Post` and `Comment`.

To do this, we’ll create an empty file called <VPIcon icon="fa-brands fa-python"/>`urls.py`, in the `blogsite` directory, like so:

```sh
touch ~/my_blog_app/blog/blogsite/urls.py
```

In this file, we will add the URL pattern for our blog application so that we can access it via the admin interface.

Navigate to the location of that <VPIcon icon="fa-brands fa-python"/>`urls.py` file we’ve just created.

```sh
cd ~/my_blog_app/blog/blogsite/
```

Then open the file with nano, for instance.

```sh
nano urls.py
```

Add the following lines of code to the file.

```py title="urls.py"
from django.urls import path
from . import views
urlpatterns = [
    path('$/', views.posts, name='posts'),
    path('$/', views.comments, name='comments'),
]
```

These are the URL pattern expressions needed to allow our application to access the `views` for `Posts` and `Comments`. We have not created those `views` yet, but will cover this later on in the series.

---

## Step 5. Connect the Blog App to Admin

Connecting our blog to the admin interface will allow us to see links for both the `Posts` and `Comments` inside the admin dashboard. Right now, the dashboard currently just displays links for `Groups` and `Users`.

To connect the two together, we need to register our `Posts` and `Comments` models inside of the admin file of `blogsite`.

Navigate to the `blogsite` directory:

```sh
cd ~/my_blog_app/blog/blogsite
```

Then, open the <VPIcon icon="fa-brands fa-python"/>`admin.py` file in a text editor of your choice.

```sh
nano admin.py
```

The file will be populated with an import statement and a comment.

```py title="admin.py"
from django.contrib import admin

# Register your models here.
```

You should edit the file so that it contains the following code in order to support our app.

```py title="admin.py"
from django.contrib import admin
from blogsite.models import Post
from blogsite.models import Comment


admin.site.register(Post)
admin.site.register(Comment)
```

When you are satisfied with the file, save and exit.

You have now registered the `Post` and `Comment` models inside of the admin panel. This will enable the admin interface to pick these models up and show them to the user that is logged into and viewing the admin dashboard.

---

## Step 6. Verify that Blog App has Been Added to Admin

Now that you’ve added the relevant Python code, run the server. Open `http://your-server-ip:8000/admin` and log in to the admin using your credentials if you’re not logged in already. In this tutorial, we’ve been logging in with the username `admin_user` and password `admin123`.

Now that you’ve logged in, you should be served the following webpage. If it has not changed from before, you may need to refresh your browser.

![Django Admin Panel with Models Added](https://assets.digitalocean.com/articles/eng_python/django/django-admin-models-added.png)

This verifies that we have now connected our app, `blogsite`, to the Django admin dashboard.

When you are done with testing your app, you can press <kbd>CTRL</kbd>+<kbd>C</kbd> to stop running the Django server. This will return you to your programming environment.

When you are ready to leave your Python environment, you can run the `deactivate` command:

```sh
deactivate
```

Deactivating your programming environment will put you back to the terminal command prompt.

---

## Conclusion

In this tutorial, you have successfully enabled the admin interface, created an admin login, and registered the `Post` and `Comment` models with the admin.

The Django admin interface is how you will be able to create posts and monitor comments with your blog.

Coming up in the series, we will be creating the `views` for the blog application.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Enable and Connect the Django Admin Interface",
  "desc": "In this tutorial, we will connect to and enable the Django admin site so that you can manage your blog website. The Django admin site comes pre-built with a … ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-enable-and-connect-the-django-admin-interface.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
