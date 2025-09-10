---
lang: en-US
title: "Python Application Layouts: A Reference"
description: "Article(s) > Python Application Layouts: A Reference"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Python Application Layouts: A Reference"
    - property: og:description
      content: "Python Application Layouts: A Reference"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-application-layouts.html
prev: /programming/py/articles/README.md
date: 2018-06-04
isOriginal: false
author:
  - name: Kyle Stratis
    url : https://realpython.com/team/kstratis/
cover: https://files.realpython.com/media/python_application_layout_watermark.31a037620d92.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Application Layouts: A Reference"
  desc="A reference guide to common Python application layouts and project structures for command-line applications, web applications, and more."
  url="https://realpython.com/python-application-layouts"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/python_application_layout_watermark.31a037620d92.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

[**Structuring a Python Application**](/courses/structuring-python-application/)

:::

Python, though opinionated on syntax and style, is surprisingly flexible when it comes to structuring your applications.

On the one hand, this flexibility is great: it allows different use cases to use structures that are necessary for those use cases. On the other hand, though, it can be very confusing to the new developer.

The Internet isn’t a lot of help either—there are as many opinions as there are Python blogs. **In this article, I want to give you a dependable Python application layout reference guide that you can refer to for the vast majority of your use cases**.

You’ll see examples of common Python application structures, including [**command-line applications**](/realpython.com/python-command-line-arguments.md) (CLI apps), one-off scripts, installable packages, and web application layouts with popular frameworks like [Flask](https://realpython.com/tutorials/flask/) and [Django](https://realpython.com/tutorials/django/).

::: note

This reference guide assumes a working knowledge of Python modules and packages. Check out our [**introduction to Python modules and packages**](/realpython.com/python-modules-packages.md) for a refresher if you’re feeling a little rusty.

:::

---

## Command-Line Application Layouts

A lot of us work primarily with Python applications that are run via [**command-line interfaces (CLIs)**](/realpython.com/comparing-python-command-line-parsing-libraries-argparse-docopt-click.md). This is where you often start with a blank canvas, and the flexibility of Python application layouts can be a real headache.

Starting with an empty project folder can be intimidating and lead to no shortage of coder’s block. In this section, I want to share some proven layouts that I personally use as a starting point for all of my Python CLI applications.

We’ll start with a very basic layout for a very basic use case: a simple script that runs on its own. You’ll then see how to build up the layout as the use cases advance.

### One-Off Script

You just make a <VPIcon icon="fa-brands fa-python"/>`.py` script, and it’s gravy, right? No need to install—just run the script in its directory!

Well, that’s fine if you’re just making a script for your own use, or one that doesn’t have any external [dependencies](https://realpython.com/courses/managing-python-dependencies/), but what if you have to distribute it? Especially to a less tech-savvy user?

The following layout will work for all of these cases and can easily be modified to reflect whatever installation or other tools you use in your workflow. This layout will cover you whether you’re creating a pure Python script (that is, one with no dependencies) or using a tool like [<VPIcon icon="fa-brands fa-python"/>pip](https://pypi.org/project/pip/) or [**Pipenv**](/realpython.com/pipenv-guide.md).

While you read this reference guide, keep in mind that the exact location of the files in the layout matters less than the reason they are placed where they are. All of these files should be in a project directory named after your project. For this example, we will use (what else?) `helloworld` as the project name and root directory.

Here’s the Python project structure I typically use for a CLI app:

```plaintext title="project structure"
helloworld/
│
├── .gitignore
├── helloworld.py
├── LICENSE
├── README.md
├── requirements.txt
├── setup.py
└── tests.py
```

This is pretty straightforward: everything is in the same directory. The files shown here are not necessarily exhaustive, but I recommend keeping the number of files to a minimum if you plan on using a basic layout like this. Some of these files will be new to you, so let’s take a quick look at what each of them does.

#### <VPIcon icon="iconfont icon-git"/>`.gitignore`

This is a file that tells Git which kinds of files to ignore, like IDE clutter or local configuration files. [Our Git tutorial has all the details](/realpython.com/python-git-github-intro.md#gitignore), and you can find sample <VPIcon icon="iconfont icon-git"/>`.gitignore` files for Python projects [here (<VPIcon icon="iconfont icon-github"/>`github/gitignore`)](https://github.com/github/gitignore).

#### <VPIcon icon="fa-brands fa-python"/>`helloworld.py`

This is the script that you’re distributing. As far as naming the main script file goes, I recommend that you go with the name of your project (which is the same as the name of the top-level directory).

#### `LICENSE`

This plaintext file describes the license you’re using for a project. It’s always a good idea to have one if you’re distributing code. The filename is in all caps by convention.

::: note

Need help selecting a license for your project? Check out [<VPIcon icon="fas fa-globe"/>ChooseALicense](https://choosealicense.com/).

:::

#### <VPIcon icon="fa-brands fa-markdown"/>`README.md`

This is a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Markdown](https://en.wikipedia.org/wiki/Markdown) (or [<VPIcon icon="fa-brands fa-wikipedia-w"/>reStructuredText](https://en.wikipedia.org/wiki/ReStructuredText)) file documenting the purpose and usage of your application. Crafting a good `README` is an art, but you can find a shortcut to mastery [<VPIcon icon="fas fa-globe"/>here](https://dbader.org/blog/write-a-great-readme-for-your-github-project).

#### <VPIcon icon="fas fa-file-lines"/>`requirements.txt`

This file defines outside Python dependencies and their versions for your application.

#### <VPIcon icon="fa-brands fa-python"/>`setup.py`

This file can also be used to define dependencies, but it really shines for other work that needs to be done during installation. You can read more about both <VPIcon icon="fa-brands fa-python"/>`setup.py` and <VPIcon icon="fas fa-file-lines"/>`requirements.txt` in our [**guide to Pipenv**](/realpython.com/pipenv-guide.md).

#### <VPIcon icon="fa-brands fa-python"/>`tests.py`

This script houses your tests, if you have any. [**You should have some**](/realpython.com/python-testing.md).

But now that your application is growing, and you’ve broken it out into multiple pieces within the same package, should you keep all pieces in the top-level directory? Now that your application is more complex, it’s time to organize things more cleanly.

### Installable Single Package

Let’s imagine that <VPIcon icon="fa-brands fa-python"/>`helloworld.py` is still the main script to execute, but you’ve moved all helper methods to a new file called <VPIcon icon="fa-brands fa-python"/>`helpers.py`.

We are going to package the `helloworld` Python files together but keep all the miscellaneous files, such as your `README`, `.gitignore`, and so on, at the top directory.

Let’s take a look at the updated structure:

```plaintext title="project structure"
helloworld/
│
├── helloworld/
│   ├── __init__.py
│   ├── helloworld.py
│   └── helpers.py
│
├── tests/
│   ├── helloworld_tests.py
│   └── helpers_tests.py
│
├── .gitignore
├── LICENSE
├── README.md
├── requirements.txt
└── setup.py
```

The only difference here is that your application code is now all held in the <VPIcon icon="fas fa-folder-open"/>`helloworld` subdirectory—this directory is named after your package—and that we’ve added a file called <VPIcon icon="fa-brands fa-python"/>`__init__.py`. Let’s introduce these new files:

#### <VPIcon icon="fas fa-folder-open"/>`helloworld/`<VPIcon icon="fa-brands fa-python"/>`__init__.py`

This file has many functions, but for our purposes it tells the Python interpreter that this directory is a package directory. You can set up this <VPIcon icon="fa-brands fa-python"/>`__init__.py` file in a way that enables you to import classes and methods from the package as a whole, instead of knowing the internal module structure and importing from `helloworld.helloworld` or `helloworld.helpers`.

::: note

For a deeper discussion on internal packages and <VPIcon icon="fa-brands fa-python"/>`__init__.py`, [**our Python modules and packages overview**](/realpython.com/python-modules-packages.md) has you covered.

:::

#### <VPIcon icon="fas fa-folder-open"/>`helloworld/`<VPIcon icon="fa-brands fa-python"/>`helpers.py`

As mentioned above, we’ve moved much of <VPIcon icon="fa-brands fa-python"/>`helloworld.py`’s business logic to this file. Thanks to <VPIcon icon="fa-brands fa-python"/>`__init__.py`, outside modules will be able to access these helpers simply by importing from the `helloworld` package.

#### <VPIcon icon="fas fa-folder-open"/>`tests/`

We’ve moved our tests into their own directory, a pattern you’ll continue to see as our program structures gain complexity. We have also split our tests into separate modules, mirroring our package’s structure.

This layout is a stripped down version of [Kenneth Reitz’s samplemod application structure (<VPIcon icon="iconfont icon-github"/>`kennethreitz/samplemod`)](https://github.com/kennethreitz/samplemod). It is another great starting point for your CLI applications, especially for more expansive projects.

### Application with Internal Packages

In larger applications, you may have one or more internal packages that are either tied together with a main runner script or that provide specific functionality to a larger library you are packaging. We will extend the conventions laid out above to accommodate for this:

```plaintext :collapsed-lines title="project structure"
helloworld/
│
├── bin/
│
├── docs/
│   ├── hello.md
│   └── world.md
│
├── helloworld/
│   ├── __init__.py
│   ├── runner.py
│   ├── hello/
│   │   ├── __init__.py
│   │   ├── hello.py
│   │   └── helpers.py
│   │
│   └── world/
│       ├── __init__.py
│       ├── helpers.py
│       └── world.py
│
├── data/
│   ├── input.csv
│   └── output.xlsx
│
├── tests/
│   ├── hello
│   │   ├── helpers_tests.py
│   │   └── hello_tests.py
│   │
│   └── world/
│       ├── helpers_tests.py
│       └── world_tests.py
│
├── .gitignore
├── LICENSE
└── README.md
```

There’s a bit more to digest here, but as long as you remember that it follows from the previous layout, you will have an easier time following along. I’ll go through the additions and modifications in order, their uses, and the reasons you might want them.

#### <VPIcon icon="fas fa-folder-open"/>`bin/`

This directory holds any executable files. I’ve adapted this from [<VPIcon icon="fas fa-globe"/>Jean-Paul Calderone’s classic structure post](http://as.ynchrono.us/2007/12/filesystem-structure-of-python-project_21.html), and his prescriptions for the use of a <VPIcon icon="fas fa-folder-open"/>`bin/` directory are still important. The most important point to remember is that your executable shouldn’t have a lot of code, just an import and a call to a [**main function**](/realpython.com/python-main-function.md) in your runner script. If you are using pure Python or don’t have any executable files, you can leave out this directory.

#### <VPIcon icon="fas fa-folder-open"/>`/docs`

With a more advanced application, you’ll want to maintain good documentation of all its parts. I like to put any documentation for internal modules here, which is why you see separate documents for the `hello` and `world` packages. If you use [**docstrings**](/realpython.com/documenting-python-code.md#documenting-your-python-code-base-using-docstrings) in your internal modules (and you should!), your whole-module documentation should at the very least give a holistic view of the purpose and function of the module.

#### <VPIcon icon="fas fa-folder-open"/>`helloworld/`

This is similar to <VPIcon icon="fas fa-folder-open"/>`helloworld/` in the previous structure, but now there are subdirectories. As you add more complexity, you’ll want to use a “divide and conquer” tactic and split out parts of your application logic into more manageable chunks. Remember that the directory name refers to the overall package name, and so the subdirectory names (<VPIcon icon="fas fa-folder-open"/>`hello/` and <VPIcon icon="fas fa-folder-open"/>`world/`) should reflect their package names.

#### <VPIcon icon="fas fa-folder-open"/>`data/`

Having this directory is helpful for testing. It’s a central location for any files that your application will ingest or produce. Depending on how you deploy your application, you can keep “production-level” inputs and outputs pointed to this directory, or only use it for internal testing.

#### <VPIcon icon="fas fa-folder-open"/>`tests/`

Here, you can put all your tests—unit tests, execution tests, integration tests, and so on. Feel free to structure this directory in the most convenient way for your testing strategies, import strategies, and more. For a refresher on testing command-line applications with Python, check out my article [**4 Techniques for Testing Python Command-Line (CLI) Apps**](/realpython.com/python-cli-testing.md).

The top-level files remain largely the same as in the previous layout. These three layouts should cover most use cases for command-line applications, and even GUI applications with the caveat that you may have to tinker with some things depending on the GUI framework you use.

::: note

Keep in mind that these are just layouts. If a directory or file doesn’t make sense for your specific use case (like <VPIcon icon="fas fa-folder-open"/>`tests/` if you aren’t distributing tests with your code), feel free to leave it out. But try not to leave out <VPIcon icon="fas fa-folder-open"/>`docs/`. It’s always a good idea to document your work.

:::

---

## Web Application Layouts

Another major use case of Python is [**web applications**](https://realpython.com/python-web-applications.md). [<VPIcon icon="iconfont icon-django"/>Django](https://djangoproject.com/) and [<VPIcon icon="iconfont icon-flask"/>Flask](http://flask.pocoo.org/) are arguably the most popular web frameworks for Python and thankfully are a little more opinionated when it comes to application layout.

In order to make sure this article is a complete, full-fledged layout reference, I wanted to highlight the structure common to these frameworks.

### <VPIcon icon="iconfont icon-django"/>Django

Let’s go in alphabetical order and start with Django. One of the nice things about Django is that it will create a project skeleton for you after running `django-admin startproject project`, where `project` is the name of your project. This will create a directory in your current working directory called `project` with the following internal structure:

```plaintext title="project structure (django)"
project/
│
├── project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
└── manage.py
```

This seems a little empty, doesn’t it? Where does all the logic go? The views? There aren’t even any tests!

In Django, this is a project, which ties together the other Django concept, apps. Apps are where logic, models, views, and so on all live, and in doing so they do some task, such as maintaining a blog.

Django apps can be imported into projects and used across projects, and are structured like specialized Python packages.

Like projects, Django makes generating Django app layouts really easy. After you set up your project, all you have to do is navigate to the location of <VPIcon icon="fa-brands fa-python"/>`manage.py` and run `python manage.py startapp app`, where `app` is the name of your app.

This will result in a directory called `app` with the following layout:

```plaintext title="project structure (django)"
app/
│
├── migrations/
│   └── __init__.py
│
├── __init__.py
├── admin.py
├── apps.py
├── models.py
├── tests.py
└── views.py
```

This can then be imported directly into your project. Details on what these files do, how to harness them for your project, and so forth are outside the scope of this reference, but you can get all that information and more [in our Django tutorial](https://realpython.com/learn/start-django/) and also [<VPIcon icon="iconfont icon-django"/>in the official Django docs](https://docs.djangoproject.com/en/2.0/intro/tutorial01/).

This file and folder structure is very barebones and the basic requirements for Django. For any open-source Django project, you can (and should) adapt the structures from the command-line application layouts. I typically end up with something like this in the outer <VPIcon icon="fas fa-folder-open"/>`project/` directory:

```plaintext :collapsed-lines title="project structure (django)"
project/
│
├── app/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   │
│   ├── migrations/
│   │   └── __init__.py
│   │
│   ├── models.py
│   ├── tests.py
│   └── views.py
│
├── docs/
│
├── project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── static/
│   └── style.css
│
├── templates/
│   └── base.html
│
├── .gitignore
├── manage.py
├── LICENSE
└── README.md
```

For a deeper discussion on more advanced Django application layouts, [<VPIcon icon="fa-brands fa-stack-overflow"/>this Stack Overflow thread](https://stackoverflow.com/questions/22841764/best-practice-for-django-project-working-directory-structure) has you covered. The [<VPIcon icon="fas fa-globe"/>django-project-skeleton](http://django-project-skeleton.readthedocs.io/en/latest/structure.html) project documentation explains some of the directories you will find in the Stack Overflow thread. A comprehensive dive into Django can be found in the pages of [Two Scoops of Django](https://realpython.com/asins/0692915729), which will teach you all of the latest best practices for Django development.

For more Django tutorials, [visit our Django section at Real Python](https://realpython.com/tutorials/django/).

### <VPIcon icon="iconfont icon-flask"/>Flask

Flask is a Python web “microframework.” One of the main selling points is that it is very quick to set up with minimal overhead. The [<VPIcon icon="iconfont icon-flask"/>Flask documentation](http://flask.pocoo.org/docs/1.0/) has a web application example that’s under 10 lines of code and in a single script. Of course, in practice, it’s highly unlikely you’ll be writing a web application this small.

Luckily, the Flask documentation [<VPIcon icon="iconfont icon-flask"/>swoops in to save us](http://flask.pocoo.org/docs/1.0/tutorial/layout/) with a suggested layout for their tutorial project (a blogging web application called Flaskr), and we will examine that here from within the main project directory:

```plaintext :collapsed-lines title="project structure (flask)"
flaskr/
│
├── flaskr/
│   ├── ___init__.py
│   ├── db.py
│   ├── schema.sql
│   ├── auth.py
│   ├── blog.py
│   ├── templates/
│   │   ├── base.html
│   │   ├── auth/
│   │   │   ├── login.html
│   │   │   └── register.html
│   │   │
│   │   └── blog/
│   │       ├── create.html
│   │       ├── index.html
│   │       └── update.html
│   │ 
│   └── static/
│       └── style.css
│
├── tests/
│   ├── conftest.py
│   ├── data.sql
│   ├── test_factory.py
│   ├── test_db.py
│   ├── test_auth.py
│   └── test_blog.py
│
├── venv/
│
├── .gitignore
├── setup.py
└── MANIFEST.in
```

From these contents, we can see that a Flask application, like most Python applications, is built around Python packages.

::: note

Not seeing it? A quick tip for spotting packages is by looking for an <VPIcon icon="fa-brands fa-python"/>`__init__.py` file. This sits in the highest-level directory for that particular package. In the above layout, `flaskr` is a package containing the `db`, `auth`, and `blog` modules.

:::

In this layout, everything lives in the `flaskr` package except for your tests, a directory for your [**virtual environments**](/realpython.com/python-virtual-environments-a-primer.md), and your usual top-level files. As in other layouts, your tests will roughly match the individual modules residing within the `flaskr` package. Your templates also reside in the main project package, which would not happen with the Django layouts.

Be sure to also visit our [Flask Boilerplate Github page (<VPIcon icon="iconfont icon-github"/>`realpython/flask-boilerplate`)](https://github.com/realpython/flask-boilerplate) for a view of a more fully fleshed-out Flask application and see the boilerplate in action [<VPIcon icon="fas fa-globe"/>here](https://flaskboilerplate.com/).

For more on Flask, [check out all of our Flask tutorials here](https://realpython.com/tutorials/flask/).

---

## Conclusions and Reminders

Now you’ve seen example layouts for a number of different application types: one-off Python scripts, installable single packages, larger applications with internal packages, Django web applications, and Flask web applications.

Coming away from this guide, you will have the tools to successfully prevent coder’s block by building out your application structure so that you’re not staring at a blank canvas trying to figure out where to start.

Because Python is largely non-opinionated when it comes to application layouts, you can customize these example layouts to your heart’s content to better fit your use case.

I want you to not only have an application layout reference but also come away with the understanding that these examples are neither hard-and-fast rules nor the only way to structure your application. Over time and with practice, you’ll develop the ability to build and customize your own useful Python application layouts.

Did I miss a use case? Do you have another application structure philosophy? Did this article help prevent coder’s block? Let me know in the comments!

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

[**Structuring a Python Application**](/courses/structuring-python-application/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python Application Layouts: A Reference",
  "desc": "A reference guide to common Python application layouts and project structures for command-line applications, web applications, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-application-layouts.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
