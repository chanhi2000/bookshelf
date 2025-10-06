---
lang: en-US
title: "How to Activate Your Django Virtual Environment"
description: "Article(s) > How to Activate Your Django Virtual Environment"
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
      content: "Article(s) > How to Activate Your Django Virtual Environment"
    - property: og:description
      content: "How to Activate Your Django Virtual Environment"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-activate-your-django-virtual-environment.html
prev: /programming/py-django/articles/README.md
date: 2025-07-17
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746123776834/337004ca-692e-4df9-89db-81e78a16c7fe.png
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
  name="How to Activate Your Django Virtual Environment"
  desc="If you’re starting with Django, one of the first steps you’ll hear about is activating a virtual environment. And if that sounds a little technical, don’t worry - I’m going to walk you through exactly what that means, why it matters, and how to do it..."
  url="https://freecodecamp.org/news/how-to-activate-your-django-virtual-environment"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746123776834/337004ca-692e-4df9-89db-81e78a16c7fe.png"/>

If you’re starting with Django, one of the first steps you’ll hear about is *activating a virtual environment*. And if that sounds a little technical, don’t worry - I’m going to walk you through exactly what that means, why it matters, and how to do it step-by-step, without any confusing terms.

I’ve helped a lot of people get started with Python and Django, and trust me: understanding virtual environments early on can save you tons of headaches later.

A virtual environment can help you keep your Django projects organized. It also avoids conflicts between different versions of packages, and gives you a cleaner way to manage your development tools.

By the end of this guide, you’ll not only know how to activate your virtual environment, but also why you should.

Let's get into it.

---

## What Is a Virtual Environment in Python?

A virtual environment is like a private workspace just for your project. Instead of installing packages (like Django) globally for your whole computer, you install them inside this little bubble. That way, different projects don’t mess with each other.

Imagine you’re working on two Django projects: one needs Django 3.2 and the other needs Django 4.1. Without a virtual environment, you'd run into version conflicts. But with virtual environments, each project stays separate and clean.

---

## Why Use a Virtual Environment?

Here’s why I *always* use one when working with Django:

- Keeps your project dependencies isolated.
- Prevents version conflicts between different projects.
- Makes it easy to manage and uninstall packages.
- Most importantly, **Django expects it**, especially if you want to follow best practices.

---

## How to Set Up and Activate a Django Virtual Environment

Let’s walk through the process from start to finish.

### 1. Install Python (If You Haven’t Yet)

You need Python 3.8 or later. You can check what version you have by opening your terminal and typing:

```sh
python --version
```

If you see something like `Python 3.11.7`You’re good.

::: info If you don’t have Python, download it here:

<SiteInfo
  name="Download Python"
  desc="The official home of the Python Programming Language"
  url="https://python.org/downloads"
  logo="https://python.org/static/favicon.ico"
  preview="https://python.org/static/opengraph-icon-200x200.png"/>

:::

Make sure to check the box **“Add Python to PATH”** during installation if you're on Windows.

### 2. Install `virtualenv` (Optional but Worth Knowing)

Python includes a built-in tool called `venv`, and that’s what we’ll use in this tutorial.

However, some developers prefer `virtualenv` because:

- It works with older Python versions
- It can be slightly faster in larger environments
    

To install `virtualenv` just run:

```sh
pip install virtualenv
```

::: note

You don’t need `virtualenv` for this tutorial, but it’s good to know about. We'll be using Python’s built-in `venv` going forward.

:::

### 3. Create a Virtual Environment

Now go to your Django project folder (or make one):

```sh
mkdir my_django_project
cd my_django_project
```

Then run:

```sh
python -m venv venv
```

- `python -m venv` uses Python’s built-in virtual environment module
- `venv` is the name of the folder that will store your environment (you can call it anything)

This creates a folder called <VPIcon icon="fas fa-folder-open"/>`venv/` in your project directory. That folder contains everything your virtual environment needs.

### 4. Activate the Virtual Environment

Here’s the part everyone asks about.

Activation depends on your operating system.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

On Windows (CMD)

```sh
venv\Scripts\activate
```

**On Windows (PowerShell)**

```sh
.\venv\Scripts\Activate.ps1
```

@tab <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
source venv/bin/activate
```

:::

After you activate it, your terminal prompt will change. It’ll look something like this:

```sh
(venv) your-computer-name:my_django_project username$
```

That `(venv)` at the beginning means the virtual environment is active.

---

## What Can You Do After Activating It?

Now that it’s active, you can install Django (or anything else) just for this project:

```sh
pip install django
```

This installs Django inside the virtual environment, not globally.

To double-check:

```sh
pip list
```

You’ll see Django and any other installed packages listed there.

---

## How to Deactivate the Virtual Environment

When you’re done working, just type:

```sh
deactivate
```

That’s it. Your terminal goes back to normal, and your system’s Python is no longer linked to the project.

---

## FAQs

::: details Do I need to activate the environment every time?

Yes, every time you open a new terminal session and want to work on your Django project, activate it again using the command for your OS.

:::

::: details What if `activate` Doesn’t work?

If you’re on Windows, PowerShell might block the script. Run this:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try activating again.

:::

::: details Can I use VS Code or another editor with this?

Absolutely. VS Code even detects your virtual environment automatically. You can select the interpreter from the bottom-left or by pressing <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> → “Python: Select Interpreter.”

:::

---

## Bonus Tips

### Add a <VPIcon icon="iconfont icon-git"/>`.gitignore` File

If you're using Git, you don’t want to upload the `venv` folder to GitHub. Add this line to your <VPIcon icon="iconfont icon-git"/>`.gitignore` file:

```gitignore title=".gitignore"
venv/
```

### Use <VPIcon icon="fas fa-file-lines"/>`requirements.txt`

Once you’ve installed your project’s packages, freeze them like this:

```sh
pip freeze > requirements.txt
```

Then later, you (or someone else) can install them with:

```sh
pip install -r requirements.txt
```

This is useful for team projects or for moving your app to a server.

---

## Conclusion

Activating your Django virtual environment might seem like a small thing, but it’s a big step toward becoming a confident and organized developer.

Once you get the hang of it, it becomes second nature - and your future self will thank you for learning it the right way from the start.

Would you love to connect with me? You can do so on [<VPIcon icon="fa-brands fa-x-twitter"/>`_udemezue`](https://X.com/_udemezue)

::: info Helpful Resources

<SiteInfo
  name="venv — Creation of virtual environments"
  desc="Source code: Lib/venv/ The venv module supports creating lightweight “virtual environments”, each with their own independent set of Python packages installed in their site directories. A virtual en..."
  url="https://docs.python.org/3/library/venv.html"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3.13/_images/social_previews/summary_library_venv_ead7e0c7.png"/>

<SiteInfo
  name="Django"
  desc="The web framework for perfectionists with deadlines."
  url="https://djangoproject.com"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

```component VPCard
{
  "title": "Python Virtual Environments: A Primer",
  "desc": "In this tutorial, you'll learn how to use a Python virtual environment to manage your Python projects. You'll also gain a deep understanding of the structure of virtual environments created with the venv module, as well as the rationale behind using virtual environments.",
  "link": "/realpython.com/python-virtual-environments-a-primer.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

:::

::: info Further Learning

If you're serious about Django, here are some free and paid resources I recommend:

<SiteInfo
  name="LearnDjango | LearnDjango.com"
  desc="LearnDjango is a platform for learning Django, a popular Python web framework for building web applications. It offers tutorials and courses to help you master your craft and boost your career."
  url="https://learndjango.com/courses/django-for-beginners//"
  logo="https://learndjango.com/static/images/social/favicon-16x16.6e7768535ab5.png"
  preview="https://learndjango.com/static/images/social/social-default-image.21fdd402ba97.png"/>

<VidStack src="youtube/F5mRW0jo-U4" />

<SiteInfo
  name="CS50's Web Programming with Python and JavaScript"
  desc="This course picks up where Harvard University's CS50 leaves off, diving more deeply into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Django, React, and Bootstrap. Topics include database design, scalability, security, and user experience. Through hands-on projects, students learn to write and use APIs, create interactive UIs, and leverage cloud services like GitHub and Heroku. By semester’s end, students emerge with knowledge and experience in principles, languages, and tools that empower them to design and deploy applications on the Internet."
  url="https://cs50.harvard.edu/web"
  logo="https://cs50.harvard.edu/favicon.ico?1751182579"
  preview="https://img.youtube.com/vi/24Kf3v7kZyE/maxresdefault.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Activate Your Django Virtual Environment",
  "desc": "If you’re starting with Django, one of the first steps you’ll hear about is activating a virtual environment. And if that sounds a little technical, don’t worry - I’m going to walk you through exactly what that means, why it matters, and how to do it...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-activate-your-django-virtual-environment.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
