---
lang: en-US
title: "Brush Up on the Basics"
description: "Article(s) > (1/5) Python Web Applications: Deploy Your Script as a Flask App"
category:
  - Python
  - Flask
  - DevOps
  - Google
  - Google Cloud
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
  - devops
  - google
  - google-cloud
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/5) Python Web Applications: Deploy Your Script as a Flask App"
    - property: og:description
      content: "Brush Up on the Basics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-web-applications/brush-up-on-the-basics.html
date: 2021-02-01
isOriginal: false
author:
  - name: Martin Breuss
    url : https://realpython.com/team/mbreuss/
cover: https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Web Applications: Deploy Your Script as a Flask App",
  "desc": "In this tutorial, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world.",
  "link": "/realpython.com/python-web-applications/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Web Applications: Deploy Your Script as a Flask App"
  desc="In this tutorial, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world."
  url="https://realpython.com/python-web-applications#brush-up-on-the-basics"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg"/>

In this section, you’ll get a theoretical footing in the different topics that you’ll work with during the practical part of this tutorial:

- What types of Python code distribution exist
- Why building a web application can be a good choice
- What a web application is
- How content gets delivered over the Internet
- What web hosting means
- Which hosting providers exist and which one to use

Brushing up on these topics can help you feel more confident when writing Python code for the Web. However, if you’re already familiar with them, then feel free to skip ahead, [install the Google Cloud SDK](/realpython.com/python-web-applications/brush-up-on-the-basics.md#choose-a-hosting-provider-google-app-engine), and start building your Python web app.

---

## Distribute Your Python Code

Bringing your code to your users is called **distribution**. Traditionally, there are three different approaches you can use to distribute your code so that others can work with your programs:

1. Python library
2. Standalone program
3. Python web application

You’ll take a closer look at each of these approaches below.

### Python Library

If you’ve worked with Python’s extensive package ecosystem, then you’ve likely installed [**Python packages**](/realpython.com/python-modules-packages.md) with [**`pip`**](/realpython.com/what-is-pip.md). As a programmer, you might want to [**publish your Python package on PyPI**](/realpython.com/pypi-publish-python-package.md) to allow other users to access and use your code by installing it using `pip`:

```sh
python3 -m pip install <your-package-name>
```

After you’ve successfully published your code to PyPI, this command will install your package, including its dependencies, on any of your users’ computers, provided that they have an Internet connection.

If you don’t want to publish your code as a PyPI package, then you can still use Python’s built-in `sdist` command to create a [<VPIcon icon="fa-brands fa-python"/>source distribution](https://docs.python.org/3/distutils/sourcedist.html) or a [**Python wheel**](/realpython.com/python-wheels.md) to create a [<VPIcon icon="fa-brands fa-python"/>built distribution](https://packaging.python.org/glossary/#term-built-distribution) to share with your users.

Distributing your code like this keeps it close to the original script you wrote and adds only what’s necessary for others to run it. However, using this approach also means that your users will need to run your code with Python. Many people who want to use your script’s functionality won’t have Python installed or won’t be familiar with the processes required to work directly with your code.

A more user-friendly way to present your code to potential users is to build a standalone program.

### Standalone Program

Computer programs come in different shapes and forms, and there are multiple options for transforming your Python scripts into standalone programs. Below you’ll read about two possibilities:

1. Packaging your code
2. Building a GUI

Programs such as [<VPIcon icon="fas fa-globe"/>PyInstaller](https://pyinstaller.org/), [<VPIcon icon="fas fa-globe"/>py2app](https://py2app.readthedocs.io/en/latest/), [<VPIcon icon="fas fa-globe"/>py2exe](https://py2exe.org/), or [<VPIcon icon="fas fa-globe"/>Briefcase](https://briefcase.readthedocs.io/en/latest/) can help with packaging your code. They turn Python scripts into executable programs that can be used on different platforms without requiring your users to explicitly run the Python interpreter.

::: note

To learn more about packaging your code, check out [**Using PyInstaller to Easily Distribute Python Applications**](/realpython.com/pyinstaller-python/) or listen to the Real Python Podcast episode [<VPIcon icon="fas fa-globe"/>Options for Packaging Your Python Application](https://realpython.com/podcasts/rpp/24/).

:::

While packaging your code can resolve dependency problems, your code still just runs on the command line. Most people are used to working with programs that provide a graphical user interface (GUI). You can make your Python code accessible to more people by building a GUI for it.

::: note

There are different packages that can help you with building a GUI, including [**Tkinter**](/realpython.com/python-gui-tkinter.md), [**wxPython**](/realpython.com/python-gui-with-wxpython.md), and [**PySimpleGUI**](/realpython.com/pysimplegui-python.md). If you want to build a native desktop-based app, then check out the learning path for [<VPIcon icon="fas fa-globe"/>Python GUI Programming](https://realpython.com/learning-paths/python-gui-programming/).

:::

While a standalone GUI desktop program can make your code accessible to a wider audience, it still presents a hurdle for people to get started. Before running your program, potential users have a few steps to get through. They need to find the right version for their operating system, download it, and successfully install it. Some may give up before they make it all the way.

It makes sense that many developers instead build web applications that can be accessed quickly and run on an Internet browser.

### Python Web Application

The advantage of web applications is that they’re platform independent and can be run by anyone who has access to the Internet. Their code is implemented on a back-end **server**, where the program processes incoming requests and responds through a shared protocol that’s understood by all browsers.

Python powers many large web applications and is a common choice as a back-end language. Many Python-driven web applications are planned from the start as web applications and are built using Python web frameworks such as [<VPIcon icon="fas fa-globe"/>Flask](https://realpython.com/learning-paths/flask-by-example/), which you’ll use in this tutorial.

However, instead of the web-first approach described above, you’re going to take a different angle. After all, you weren’t *planning* to build a web application. You just created a useful Python script, and now you want to share with the world. To make it accessible to a broad range of users, you’ll refactor it into a web application and then deploy it to the Internet.

It’s time to go over what a web application is and how it’s different from other content on the Web.

---

## Learn About Python Web Applications

Historically, websites had fixed content that was the same for every user who accessed that page. These web pages are called **static** because their content doesn’t change when you interact with them. When serving a static web page, a web server responds to your request by sending back the content of that page, regardless of who you are or what other actions you took.

You can browse an example of a static website at the [<VPIcon icon="fas fa-globe"/>first URL that ever went online](http://info.cern.ch/hypertext/WWW/TheProject.html), as well as the pages it links to:

![Screenshot of one of the first static webpages, displaying the history of the project as envisioned at CERN](https://files.realpython.com/media/Screenshot_2020-12-08_at_19.57.40.4740435d7767.png)

The history of the WWW

Such static websites aren’t considered applications since their content isn’t generated dynamically by code. While static sites used to make up all of the Internet, most websites today are true **web applications**, which offer **dynamic** web pages that can change the content they deliver.

For instance, a webmail application allows you to interact with it in many ways. Depending on your actions, it can display different types of information, often while staying in a single page:

![A webmail web app page as an example for a dynamic webpage](https://files.realpython.com/media/gae-dynamic-webpage.c10c1cbd973f.png)

A single-page Webmail application

**Python-driven web applications** use Python code to determine what actions to take and what content to show. Your code is run by the web server that hosts your website, which means that your users don’t need to install anything. All they need to interact with your code is a browser and an Internet connection.

Getting Python to run on a website can be complicated, but there are a number of different [<VPIcon icon="fa-brands fa-wikipedia-w"/>web frameworks](http://en.wikipedia.org/wiki/Web_framework) that automatically take care of the details. As mentioned above, you’ll build a basic Flask application in this tutorial.

In the upcoming section, you’ll get a high-level perspective on the main processes that need to happen to run your Python code on a server and deliver a response to your users.

---

## Review the HTTP Request-Response Cycle

Serving dynamic content over the Internet involves a lot of different pieces, and they all have to communicate with one another to function correctly. Here’s a generalized overview of what takes place when a user interacts with a web application:

1. **Sending:** First, your user makes a request for a particular web page on your web app. They can do this, for example, by typing a URL into their browser.
2. **Receiving:** This request gets received by the web server that hosts your website.
3. **Matching:** Your web server now uses a program to match the user’s request to a particular portion of your Python script.
4. **Running:** The appropriate Python code is called up by that program. When your code runs, it writes out a web page as a response.
5. **Delivering:** The program then delivers this response back to your user through the web server.
6. **Viewing:** Finally, the user can view the web server’s response. For example, the resulting web page can be displayed in a browser.

This is a general process of how content is delivered over the Internet. The programming language used on the server, as well as the technologies used to establish that connection, can differ. However, the concept used to communicate across [<VPIcon icon="fa-brands fa-wikipedia-w"/>HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) **requests** and **responses** remains the same and is called the **HTTP Request-Response Cycle**.

::: note

Flask will handle most of this complexity for you, but it can help to keep a loose understanding of this process in mind.

To allow Flask to handle requests on the server side, you’ll need to find a place where your Python code can live online. Storing your code online to run a web application is called **web hosting**, and there are a number of providers offering both paid and free web hosting.

---

## Choose a Hosting Provider: Google App Engine

When choosing a web hosting provider, you need to confirm that it supports running Python code. Many of them cost money, but this tutorial will stick with a free option that’s professional and highly scalable yet still reasonable to set up: [<VPIcon icon="iconfont icon-gcp"/>Google App Engine](https://cloud.google.com/appengine/docs/standard/python3).

::: note

Google App Engine enforces daily [<VPIcon icon="iconfont icon-gcp"/>quotas](https://cloud.google.com/appengine/quotas) for each application. If your web application exceeds these quotas, then Google will start billing you. If you’re a new Google Cloud customer, then you can get a [<VPIcon icon="iconfont icon-gcp"/>promotional free credit](https://cloud.google.com/free) when signing up.

:::

There are a number of other free options, such as [<VPIcon icon="fas fa-globe"/>PythonAnywhere](https://pythonanywhere.com/), [<VPIcon icon="fas fa-globe"/>Repl.it](https://repl.it/), or [<VPIcon icon="fas fa-globe"/>Heroku](https://heroku.com/) that you can explore later on. Using Google App Engine will give you a good start in learning about deploying Python code to the web as it strikes a balance between abstracting away complexity and allowing you to customize the setup.

Google App Engine is part of the Google Cloud Platform (GCP), which is run by Google and represents one of the big cloud providers, along with [<VPIcon icon="iconfont icon-microsoftazure"/>Microsoft Azure](https://azure.microsoft.com/) and [<VPIcon icon="fa-brands fa-aws"/>Amazon Web Services (AWS)](http://aws.amazon.com/).

To get started with GCP, download and install the [<VPIcon icon="iconfont icon-gcp"/>Google Cloud SDK](https://cloud.google.com/sdk/docs/install) for your operating system. For additional guidance beyond what you’ll find in this tutorial, you can consult [Google App Engine’s documentation](https://cloud.google.com/appengine/docs/standard/python3).

::: note

You’ll be working with the Python 3 standard environment. Google App Engine’s [<VPIcon icon="iconfont icon-gcp"/>standard environment](https://cloud.google.com/appengine/docs/standard) supports Python 3 runtimes and offers a free tier.

:::

The Google Cloud SDK installation also includes a command-line program called `gcloud`, which you’ll later use to deploy your web app. Once you’re done with the installation, you can verify that everything worked by typing the following command into your console:

```sh
gcloud --version
```

You should receive a text output in your [**terminal**](/realpython.com/terminal-commands.md) that looks similar to the one below:

```
app-engine-python 1.9.91
bq 2.0.62
cloud-datastore-emulator 2.1.0
core 2020.11.13
gsutil 4.55
```

Your version numbers will probably be different, but as long as the `gcloud` program is successfully found on your computer, your installation was successful.

With this high-level overview of concepts in mind and the Google Cloud SDK installed, you’re ready to set up a Python project that you’ll later deploy to the Internet.
