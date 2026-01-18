---
lang: en-US
title: "How To Install Django and Set Up a Development Environment on Ubuntu 22.04"
description: "Article(s) > How To Install Django and Set Up a Development Environment on Ubuntu 22.04"
icon: iconfont icon-django
category:
  - Python
  - Django
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - py
  - python
  - django
  - py-django
  - devops
  - linux
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Install Django and Set Up a Development Environment on Ubuntu 22.04"
    - property: og:description
      content: "How To Install Django and Set Up a Development Environment on Ubuntu 22.04"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-django-and-set-up-a-development-environment-on-ubuntu-22-04.html
prev: /programming/py-django/articles/README.md
date: 2022-04-27
isOriginal: false
author: 
  - name: Lisa Tagliaferri
    url: https://digitalocean.com/community/users/ltagliaferri
  - name: Tony Tran
    url: https://digitalocean.com/community/users/tonytran
cover: https://community-cdn-digitalocean-com.global.ssl.fastly.net/gSWNVTLXhtRMLSJ4bk37bF3w
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How To Install Django and Set Up a Development Environment on Ubuntu 22.04"
  desc="Django is a free and open-source web framework written in Python with its core principles being scalability, re-usability and rapid development. In this tuto… "
  url="https://digitalocean.com/community/tutorials/how-to-install-django-and-set-up-a-development-environment-on-ubuntu-22-04"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://community-cdn-digitalocean-com.global.ssl.fastly.net/gSWNVTLXhtRMLSJ4bk37bF3w"/>

## Introduction

Django is a free and open-source web framework written in Python with its core principles being scalability, re-usability and rapid development. It is also known for its framework-level consistency and loose coupling, allowing for individual components to be independent of one another.

In this tutorial, you will set up a Django environment **for development purposes** on an Ubuntu 22.04 server. For a live website, you will have additional considerations, including connecting to a database, setting up a domain name, and adding layers of security. There are a variety of tutorials on Django that can help support you as you build under the [<VPIcon icon="fa-brands fa-digital-ocean"/>Django tag](https://digitalocean.com/community/tags/django).

::: note Prerequisites

In order to complete this tutorial, you will need:

- A non-root user account with `sudo` privileges, which you can achieve by following and completing the [initial server setup for Ubuntu 22.04](/community/tutorials/initial-server-setup-with-ubuntu-22-04) tutorial.
- Python 3 set up with a virtual programming environment. You can get this set up via the [Python 3 installation guide](/community/tutorials/how-to-install-python-3-and-set-up-a-programming-environment-on-an-ubuntu-22-04-server).

:::

---

## Step 1. Installing Django

There are several ways to install Django, the Python package manager pip within a virtual environment.

While in the server’s home directory, you’ll create the directory that will contain your Django application. Run the following command to create a directory called <VPIcon icon="fas fa-folder-open"/>`django-apps`, or another name of your choice. Then navigate to the directory.

```sh
mkdir django-apps
cd django-apps

```

While inside the <VPIcon icon="fas fa-folder-open"/>`django-apps` directory, create your virtual environment. You’ll call it the generic `env`, but you should use a name that is meaningful for you and your project.

```sh
virtualenv env

```

Now, activate the virtual environment with the following command:

```sh
. env/bin/activate

```

You’ll know it’s activated once the prefix is changed to `(env)`, which will look similar to the following, depending on what directory you are in:

Within the environment, install the Django package using pip. Installing Django allows us to create and run Django applications.

```sh
pip install django

```

Once installed, verify your Django installation by running a version check:

```sh
django-admin --version
```

This, or something similar, will be the resulting output:

```plaintext title="output"
4.0.6
```

With Django installed on your server, you can move on to creating a test project to make sure everything is working correctly. You’ll be creating a skeleton web application.

---

## Step 2. Adjusting Firewall Settings

If you followed the initial server setup tutorial or have a firewall running on your server, you’ll need to open the port you’ll be using in your server’s firewall. For the UFW firewall, you can open the port with the following command:

```sh
sudo ufw allow 8000
```

If you’re using DigitalOcean Firewalls, you can select HTTP from the inbound rules. You can read more about DigitalOcean Firewalls and how to create rules for them by modifying the [<VPIcon icon="fa-brands fa-digital-ocean"/>inbound rules](https://docs.digitalocean.com/products/networking/firewalls/how-to/configure-rules/).

---

## Step 3. Starting the Project

You now can generate an application using `django-admin`, a command line utility for administration tasks in Python. Then you can use the `startproject` command to create the project directory structure for your test website.

While in the <VPIcon icon="fas fa-folder-open"/>`django-apps` directory, run the following command:

```sh
django-admin startproject testsite
```

::: note

Running the `django-admin startproject <projectname>` command will name both project directory and project package the `<projectname>` and create the project in the directory in which the command was run. If the optional `<destination>` parameter is provided, Django will use the provided destination directory as the project directory, and create <VPIcon icon="fa-brands fa-python"/>`manage.py` and the project package within it.

:::

Now you can look to see what project files were just created. Navigate to the <VPIcon icon="fas fa-folder-open"/>`testsite` directory then list the contents of that directory to see what files were created:

```sh
cd testsite
ls
#
# manage.py  testsite
```

You will notice the output that shows this directory contains a file named <VPIcon icon="fa-brands fa-python"/>`manage.py` and a folder named <VPIcon icon="fas fa-folder-open"/>`testsite`. The <VPIcon icon="fa-brands fa-python"/>`manage.py` file is similar to `django-admin` and puts the project’s package on `sys.path`. This also sets the `DJANGO_SETTINGS_MODULE` environment variable to point to your project’s <VPIcon icon="fa-brands fa-python"/>`settings.py` file.

You can view the <VPIcon icon="fa-brands fa-python"/>`manage.py` script in your terminal by running the `less` command like so:

```sh
less manage.py
```

When you’re finished reading the script, press `q`, to quit viewing the file.

Now navigate to the <VPIcon icon="fas fa-folder-open"/>`testsite` directory to view the other files that were created:

```sh
cd testsite/
```

Then run the following command to list the contents of the directory:

```sh
ls
#
# Output__init__.py  asgi.py  settings.py  urls.py  wsgi.py
```

You can go over what each of these files are:

- <VPIcon icon="fa-brands fa-python"/>`__init__.py` acts as the entry point for your Python project.
- <VPIcon icon="fa-brands fa-python"/>`asgi.py` contains the configuration for the optional deployment to the Asynchronous Server Gateway Interface or [ASGI](https://asgi.readthedocs.io/en/latest/), which provides a standard for apps that are either synchronous and asynchronous, and is considered to be a successor of WSGI (see below).
- <VPIcon icon="fa-brands fa-python"/>`settings.py` describes the configuration of your Django installation and lets Django know which settings are available.
- <VPIcon icon="fa-brands fa-python"/>`urls.py` contains a `urlpatterns` list, that routes and maps URLs to their `views`.
- <VPIcon icon="fa-brands fa-python"/>`wsgi.py` contains the configuration for the Web Server Gateway Interface or [<VPIcon icon="fa-brands fa-wikipedia-w"/>WSGI](https://nl.wikipedia.org/wiki/Web_Server_Gateway_Interface), which provides a standard for synchronous Python apps.

::: note

Although default files are generated, you still have the ability to tweak the <VPIcon icon="fa-brands fa-python"/>`asgi.py` or <VPIcon icon="fa-brands fa-python"/>`wsgi.py` files at any time to fit your deployment needs.

:::

---

## Step 4. Configuring Django

Now you can start the server and view the website on a designated host and port by running the `runserver` command.

You’ll need to add your server ip address to the list of `ALLOWED_HOSTS` in the <VPIcon icon="fa-brands fa-python"/>`settings.py` file located in <VPIcon icon="fas fa-folder-open"/>`~/test_django_app/testsite/testsite/`.

As stated in the [<VPIcon icon="iconfont icon-django"/>Django docs](https://docs.djangoproject.com/en/2.0/ref/settings/), the `ALLOWED_HOSTS` variable contains “a list of strings representing the host/domain names that this Django site can serve. This is a security measure to prevent HTTP Host header attacks, which are possible even under many seemingly-safe web server configurations.”

You can use your favorite text editor to add your IP address. For example, if you’re using `nano`, run the following command:

```sh
nano ~/django-apps/testsite/testsite/settings.py
```

Once you run the command, you’ll want to navigate to the `ALLOWED_HOSTS` Section of the document and add your server’s IP address inside the square brackets within single or double quotes.

```py title="settings.py"
"""
Django settings for testsite project.

Generated by 'django-admin startproject' using Django 4.0.
...
"""

...
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Edit the line below with your server IP address
ALLOWED_HOSTS = ['your-server-ip']
...
```

You can save the change and exit nano by holding down the <kbd>CTRL</kbd>+<kbd>x</kbd> keys and then pressing the <kbd>y</kbd> key. Next, you’ll go on to access your web app via a browser.

Finally, create an administrative user so that you can use the [**Django admin interface**](/digitalocean.com/how-to-enable-and-connect-the-django-admin-interface.md). This can be done with the `createsuperuser` command:

```sh
python manage.py createsuperuser
```

You will be prompted for a username, an email address, and a password for your user.

---

## Step 5. Accessing the Django Web App

With your configuration completed, be sure to navigate back to the directory where <VPIcon icon="fa-brands fa-python"/>`manage.py` is located:

```sh
cd ~/django-apps/testsite/
```

Now, run the following command replacing the your-server-ip text with the IP of your server:

```sh
python manage.py runserver your-server-ip:8000
```

Finally, you can navigate to the below link to see what your skeleton website looks like, again replacing the highlighted text with your server’s actual IP:

```plaintext
http://your-server-ip:8000/
```

Once the page loads, you’ll see the following:

![Django Default Page](https://assets.digitalocean.com/articles/eng_python/django/django-3-testsite.png)

This confirms that Django was properly installed and your test project is working correctly.

To access the admin interface, add `/admin/` to the end of your URL:

```plaintext
http://your_server_ip:8000/admin/
```

This will take you to a login screen:

![Django admin login](https://assets.digitalocean.com/articles/eng_python/django/django-admin-login.png)

If you enter the admin username and password that you just created, you will have access to the main admin section of the site:

![Django admin page](https://assets.digitalocean.com/articles/eng_python/django/django-admin-panel.png)

For more information about working with the Django admin interface, please see [“How To Enable and Connect the Django Admin Interface.”](/community/tutorials/how-to-enable-and-connect-the-django-admin-interface)

When you are done with testing your app, you can press <kbd>CTRL</kbd>+<kbd>C</kbd> to stop the `runserver` command. This will return you to your programming environment.

When you are ready to leave your Python environment, you can run the `deactivate` command:

```sh
deactivate
```

Deactivating your programming environment will put you back to the terminal command prompt.

---

## Conclusion

In this tutorial you have successfully installed Django and set up a development environment to begin working on your Django app.

You now have the foundation needed to get started building Django web applications.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Install Django and Set Up a Development Environment on Ubuntu 22.04",
  "desc": "Django is a free and open-source web framework written in Python with its core principles being scalability, re-usability and rapid development. In this tuto… ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/how-to-install-django-and-set-up-a-development-environment-on-ubuntu-22-04.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
