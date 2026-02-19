---
lang: en-US
title: "How to Fix Common Python Installation Errors on macOS"
description: "Article(s) > How to Fix Common Python Installation Errors on macOS"
icon: fa-brands fa-python
category: 
  - Python
  - DevOps
  - macOS
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
  - mac
  - macos
  - sh
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Fix Common Python Installation Errors on macOS"
    - property: og:description
      content: "How to Fix Common Python Installation Errors on macOS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fix-python-installation-errors-on-mac.html
prev: /programming/py/articles/README.md
date: 2024-06-10
isOriginal: false
author:
  - name: Daniel Kehoe
    url: https://freecodecamp.org/news/author/DanielKehoe/
cover: https://freecodecamp.org/news/content/images/2024/06/python-install-errors.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Fix Common Python Installation Errors on macOS"
  desc="Python's popularity keeps growing as more developers adopt it for data science and machine learning, although it is already among the most popular programming languages.  I recently wrote an article for freeCodeCamp titled ”How to Install Python on a..."
  url="https://freecodecamp.org/news/how-to-fix-python-installation-errors-on-mac"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/python-install-errors.png"/>

Python's popularity keeps growing as more developers adopt it for data science and machine learning, although it is already among the most popular programming languages.

I recently wrote an article for freeCodeCamp titled "[**How to Install Python on a Mac**](/freecodecamp.org/how-to-install-python-on-a-mac.md)", which provides a clear guide to installing Python on macOS.

As a follow-up, I will discuss errors you may encounter when installing Python on macOS and how to fix them in this article.

---

## How to Fix the "command not found: python" Error

You may encounter this error:

```sh
python ...
#
# zsh: command not found: python
```

You'll see this when trying to run Python commands in the terminal. This mostly happens because Python is yet to be installed. However, it is also possible, and more frustrating, that the Python installation is not in the Mac PATH.

If you only need to install and run a Python application, you can use [<VPIcon icon="fas fa-globe"/>Homebrew](https://mac.install.guide/homebrew/) to [<VPIcon icon="fas fa-globe"/>install Pipx](https://mac.install.guide/python/pipx). This will install Python as a dependency. Pipx is a tool that allows you to install and run Python applications as standalone executables, avoiding dependency conflicts that can occur when using the standard Python package manager [<VPIcon icon="fas fa-globe"/>Pip](https://pip.pypa.io/en/stable/).

If you're going to work on a programming project in Python, [<VPIcon icon="fas fa-globe"/>install Python with Pyenv](https://mac.install.guide/python/install-pyenv), the standard Python version manager. Better yet, [<VPIcon icon="fas fa-globe"/>install Python with Rye](https://mac.install.guide/python/install-rye), an all-in-one tool for Python installation, virtual environment management, and package installation.

If you're seeing the `zsh: command not found: python` error, and are certain you have already installed Python, you may need to update the [<VPIcon icon="fas fa-globe"/>Mac Python PATH](https://mac.install.guide/python/path). You'll need to find where Python is installed on your system, which takes some sleuthing because there are multiple ways to install Python on macOS.

Here are the most common locations for Python on a Mac:

1. <VPIcon icon="fas fa-folder-open"/>`/usr/bin/`<VPIcon icon="fa-brands fa-python"/>`python3` is the system Python installed with Xcode Command Line Tools. This is an alias; the actual location is <VPIcon icon="fas fa-folder-open"/>`/Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework/Versions/3.9/bin`.
2. <VPIcon icon="fas fa-folder-open"/>`/opt/homebrew/opt/python@3.12/libexec/bin/`<VPIcon icon="fa-brands fa-python"/>`python` is the Homebrew Python.
3. <VPIcon icon="fas fa-folder-open"/>`/Library/Frameworks/Python.framework/Versions/3.12/bin/`<VPIcon icon="fa-brands fa-python"/>`python3` is the Python installed with the official Python website installer.
4. <VPIcon icon="fas fa-folder-open"/>`/Users/username/.pyenv/shims/`<VPIcon icon="fa-brands fa-python"/>`python` is the Python installed with Pyenv.
5. <VPIcon icon="fas fa-folder-open"/>`/Users/username/.rye/shims/`<VPIcon icon="fa-brands fa-python"/>`python` is the Python installed with Rye.

Enter the full pathname followed by `python --version` and see if you get a version number. If you do, you'll need to update your PATH by adding the Python installation path to your `.zprofile` file. For more information, see [<VPIcon icon="fas fa-globe"/>Mac `PATH`](https://mac.install.guide/terminal/path).

The article [<VPIcon icon="fas fa-globe"/>Command not found: python](https://mac.install.guide/python/command-not-found-python) goes into more detail if you need more help.

---

## Using an Out-of-date Python Version

The current Python version is 3.12, as of October 2023. New releases of Python come yearly, typically released in October. The next version, Python 3.13, is expected in October 2024. The [<VPIcon icon="fa-brands fa-python"/>newest Python version](https://python.org/downloads/source/) is listed on the Python website.

Check your Mac Python version:

```sh
python --version
#
# Python 3.12.4
```

You should see `Python 3.12.4` or a later version. You may not notice issues with an older Python version but it's a good idea to start any project with the newest version. The article about [<VPIcon icon="fas fa-globe"/>updating Python on Mac](https://mac.install.guide/python/update) explains how to update Python on macOS.

---

## Using the System Python

Macs no longer come with Python pre-installed. But you may have installed [<VPIcon icon="fas fa-globe"/>Xcode Command Line Tools](https://mac.install.guide/commandlinetools/) which includes Python 3.9.6, an older Python version that supports Apple development utilities.

Try `python3 --version` and `which -a python3` to check if Python was installed with Xcode Command Line Tools.

```sh
python3 --version
#
# Python 3.9.6
which -a python3
#
# /usr/bin/python3
```

If you have Python 3.9.6 installed at <VPIcon icon="fas fa-folder-open"/>`/usr/bin/python3`, you'll likely have the system Python installed by Xcode Command Line Tools. You can confirm this with `xcode-select -p` which will show if Xcode Command Line Tools is installed.

```sh
xcode-select -p /Library/Developer/CommandLineTools
```

It's possible to [<VPIcon icon="fas fa-globe"/>alias python3 to python](https://mac.install.guide/python/alias-python3) but I would not recommend using the system Python for development. The system Python is intended for Apple utilities, not for you, so you should install Python on macOS separately if you want to run Python programs or develop in Python.

See my freeCodeCamp article [**How to Install Python on a Mac**](/freecodecamp.org/how-to-install-python-on-a-mac.md) to install Python for development.

---

## Using the Homebrew Python

If you use Homebrew as a software package manager, you can easily install Python with `brew install python`. Homebrew-installed Python is suitable for running scripts but it has drawbacks for installing Python applications or Python software development, when packages are installed.

- **Homebrew's automatic updates.** Homebrew automatically updates its Python as a dependency for other packages, potentially breaking your projects.
- **Multiple projects may need different Python versions.** Homebrew-installed Python is a single version and you may need to switch among different versions for different projects.
- **Problems with environment isolation.** Homebrew provides a single Python environment, which can cause conflicts between projects. Pip, the Python package manager, will block installation of packages unless you first create a virtual environment.

You can check if Python is installed with Homebrew:

```sh
brew list | grep python
python@3.12
```

For running applications, it's best to [<VPIcon icon="fas fa-globe"/>install Pipx](https://mac.install.guide/python/pipx) and use `pipx install` instead of `pip install` to install programs. For Python development, it's best to install Pyenv or install Rye for Python version management and virtual environments.

---

## Missing Pip

READMEs and tutorials often assume users are familiar with Python development tools and instruct them to install Python packages using Pip, the Python package manager. If you've followed instructions that start with `pip install <package>`, you may have run into the `zsh: command not found: pip` error.

This is the error you'll see:

```sh
pip install <package>
zsh: command not found: pip
```

Pip is installed automatically with Python, so it's unusual to run the `python` command successfully and then `pip` and see the error. If you have Python installed, you should be able to use the `pip` command. You can try a special command that installs Pip:

```sh
python -m ensurepip --upgrade
```

If Pip is not already installed, this command will install it. Otherwise, nothing will happen. With this error, it's more likely that you have a Python installation that is not in your Mac Python PATH. See the article [<VPIcon icon="fas fa-globe"/>Command not found: pip](https://mac.install.guide/python/command-not-found-pip) for more details.

---

## Pip Package Installation Errors

You will need to use Pip to install Python packages, unless you are using [<VPIcon icon="fas fa-globe"/>Rye](https://rye.astral.sh/) as an all-in-one tool. However, Pip has some drawbacks.

By default, the `pip install <package>` command installs the package "globally." This means that the package is added to the global Python `site-packages` directory, which may result in conflicts if different projects require different versions of the same package.

For example, if project A requires `package==1.0` and project B requires `package==2.0`, installing both packages globally may result in conflicts and [<VPIcon icon="fa-brands fa-wikipedia-w"/>dependency hell](https://en.wikipedia.org/wiki/Dependency_hell). Without proper isolation, installing one project's dependencies can cause problems for another. To avoid these conflicts, create a Python virtual environment for each project.

There are two Python tools for creating virtual environments and using different versions of packages. [<VPIcon icon="fa-brands fa-python"/>Venv](https://docs.python.org/3/library/venv) is a built-in Python package. [<VPIcon icon="fas fa-globe"/>Virtualenv](https://virtualenv.pypa.io/en/latest/) is a more powerful tool with additional features. These tools allow `pip` to install Python packages into a virtual environment that has its own installation directories and does not share libraries with other virtual environments. Pip must be used in conjunction with either Venv or Virtualenv to successfully install packages.

When you try to install a package with Pip, you may see:

```sh
pip install <package>
error: externally-managed-environment
```

Recent versions of `pip` implement [<VPIcon icon="fa-brands fa-python"/>PEP 668](https://peps.python.org/pep-0668/) to prevent attempts to install packages globally, which results in the message [<VPIcon icon="fas fa-globe"/>error: externally-managed-environment](https://mac.install.guide/python/externally-managed-environment). This error occurs when attempting to install a package globally without using a virtual environment. To resolve this error, create a virtual environment using Venv or Virtualenv and install the package within it.

---

## More on Mac Python

You'll need to do more than install Python to begin a programming project, so I've also written a longer article about [<VPIcon icon="fas fa-globe"/>Mac Python](https://mac.install.guide/python/) that explains the fundamentals of version management, virtual environments, and package management, as well as comparing various installation options.

---

## Conclusion

A variety of competing development tools means that it can be difficult to get started with Python compared to other programming languages such as JavaScript, Rust, or Ruby. Python is moving towards standardization of tools, and there's rapid innovation as the community seeks to improve the developer experience.

For now, developing Python skills requires some knowledge of the Python ecosystem, the various tools, and how to use them. Still, Python is popular and powerful, and the tutorials on freeCodeCamp will help you learn the language and become a better developer.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Fix Common Python Installation Errors on macOS",
  "desc": "Python's popularity keeps growing as more developers adopt it for data science and machine learning, although it is already among the most popular programming languages.  I recently wrote an article for freeCodeCamp titled ”How to Install Python on a...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fix-python-installation-errors-on-mac.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
