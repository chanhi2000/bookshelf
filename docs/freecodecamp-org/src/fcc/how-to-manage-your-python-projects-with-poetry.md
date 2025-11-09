---
lang: en-US
title: "How to Manage Your Python Projects with Poetry"
description: "Article(s) > How to Manage Your Python Projects with Poetry"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Manage Your Python Projects with Poetry"
    - property: og:description
      content: "How to Manage Your Python Projects with Poetry"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-your-python-projects-with-poetry.html
prev: /programming/py/articles/README.md
date: 2025-11-22
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1763759433793/adc30f57-5174-4af5-9eb7-2da52c450b36.png
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
  name="How to Manage Your Python Projects with Poetry"
  desc="Python development looks simple from the outside. But managing real projects is rarely easy. You need to install packages, update them, avoid version conflicts, create virtual environments, and prepare your project for distribution. Many beginners th..."
  url="https://freecodecamp.org/news/how-to-manage-your-python-projects-with-poetry"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1763759433793/adc30f57-5174-4af5-9eb7-2da52c450b36.png"/>

Python development looks simple from the outside. But managing real projects is rarely easy. You need to install packages, update them, avoid version conflicts, create virtual environments, and prepare your project for distribution.

Many beginners think they can handle everything with pip and venv. This works for small scripts, but it becomes messy once your project grows.

[<VPIcon icon="fas fa-globe"/>Poetry](https://python-poetry.org/) solves this problem by giving you one clean workflow for managing Python projects from start to finish. Poetry brings structure to your project. It automates package management, creates virtual environments independently, and prepares your project for building and publishing. It replaces many scattered tools, bringing clarity and reliability. With Poetry, you focus on writing code while it takes care of the setup.

Poetry is also very helpful for AI projects. It locks exact dependency versions, which prevents sudden breaks when libraries like transformers, torch, or [<VPIcon icon="fas fa-globe"/>langchain](https://turingtalks.ai/p/langchain-vs-langgraph) release updates that can change model behaviour or API outputs.

This article explains how Poetry works, how to use it with examples, and how it compares with other alternatives. The goal is to make Poetry simple to understand, even if you are new to Python.

---

## The Problem Poetry Tries to Solve

Modern [**Python projects**](/freecodecamp.org/learn-python-basics.md) need many moving parts. You install libraries from [<VPIcon icon="iconfont icon-pypi"/>PyPI](http://pypi.org/), update them over time, track versions to keep the project stable, and share those versions with your team. You also need to package your project if you want others to use it.

The traditional way of using <VPIcon icon="fas fa-file-lines"/>`requirements.txt` and `pip install` does not solve everything. Dependencies can break when a new version is released. Two developers may use different versions without knowing. You may forget which environment you used. When you want to package the project, you often need tools like setup tools and wheel.

Poetry brings all these pieces together. It uses one file, [<VPIcon icon="iconfont icon-toml"/>`pyproject.toml`](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/), to define everything. It installs packages in a clean virtual environment. It locks versions to avoid surprises. And it can build and publish your package with a couple of commands.

---

## Getting Started with Poetry

Poetry is easy to start with. You install it once, and it works on any Python project. Run this command to install Poetry on your system:

```sh
pipx install poetry
```

Once installed, you can start a new project using:

```sh
poetry new my_project
```

This creates a folder with a basic structure. It includes a <VPIcon icon="iconfont icon-toml"/>`pyproject.toml` file. This file is the heart of your project. It includes your project name, version, description, and dependencies.

```toml title="pyproject.toml"
[tool.poetry]
name = "myapp"
version = "0.1.0"
description = ""
authors = ["Manish Shivanandhan <manish@example.com>"]
readme = "README.md"

[tool.poetry.dependencies]
python = "^3.12"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

If you want to add Poetry to an existing project, you use:

```sh
poetry init
```

This asks you simple questions about your project and creates the configuration file.

```plaintext
This command will guide you through creating your pyproject.toml config.

Package name [myapp]:
Version [0.1.0]:
Description []:
Author [Manish Shivanandhan <manish@example.com>, n to skip]:
License []:
Compatible Python versions [^3.12]:

Would you like to define your main dependencies interactively? (yes/no) [yes]
You can specify a package in the following forms:
  - A single name (requests): this will search for matches on PyPI
  - A name and a constraint (requests@^2.23.0)
  - A git url (git+https://github.com/python-poetry/poetry.git)
  - A git url with a revision (git+https://github.com/python-poetry/poetry.git#develop)
  - A file path (../my-package/my-package.whl)
  - A directory (../my-package/)
  - A url (https://example.com/packages/my-package-0.1.0.tar.gz)

Package to add or search for (leave blank to skip):

Would you like to define your development dependencies interactively? (yes/no) [yes]
```

Now you can install packages using:

```sh
poetry add <package_name>
```

Poetry will install the package inside its own virtual environment. You do not need to run `venv` manually. To run your Python program, you use:

```sh
poetry run python main.py
```

Or you can enter the environment:

```sh
poetry shell
```

This simple workflow becomes natural very quickly.

---

## Understanding <VPIcon icon="iconfont icon-toml"/>`pyproject.toml`

The <VPIcon icon="iconfont icon-toml"/>`pyproject.toml` file holds the data that defines your project. Poetry fills this file when you add or remove dependencies. An example of a simple file is:

```toml title="pyproject.toml"
[tool.poetry]
name = "weather"
version = "0.1.0"
authors = ["Manish"]

[tool.poetry.dependencies]
python = "^3.10"
requests = "^2.32.0"
[tool.poetry.group.dev.dependencies]
pytest = "^8.2.0"
```

This single file replaces <VPIcon icon="fa-brands fa-python"/>`setup.py`, <VPIcon icon="fas fa-file-lines"/>`requirements.txt`, and many manual steps. Poetry acts as a manager for everything inside it.

---

## Building a Sample App

Imagine you are creating a simple weather app that calls an API. After creating a poetry project, you add a dependency:

```sh
poetry add requests
```

Then you write a Python script:

```py
import requests

def get_weather(city):
    url = f"https://wttr.in/{city}?format=3"
    response = requests.get(url)
    print(response.text)
get_weather("London")
```

To run it:

```sh
poetry run python weather.py
```

Poetry locks the version of requests so your app works the same for everyone. If a new version is released and breaks something, you are safe because Poetry keeps your locked version.

When you want to build your project for publishing, you run:

```sh
poetry build
```

This command creates a file you can upload to PyPI:

```sh
poetry publish
```

This kind of simplicity is why Poetry has become a favourite among developers.

---

## The Lock File

One of the quietly powerful features of Poetry is the lock file. When you add a package, Poetry writes exact versions to <VPIcon icon="fas fa-file-key"/>`poetry.lock`. This file ensures your project behaves the same across machines. If someone clones your project, all they need is:

```sh
poetry install
```

Poetry reads the lock file and installs the exact same versions you used. This helps with debugging because nothing changes silently after installation.

---

## Comparing Poetry With Other Tools

Poetry is not the only tool for managing Python projects. To understand why developers choose Poetry, it helps to compare it with other popular options. Here are three alternatives and how they differ.

### Poetry vs Pip and Virtual Environments

[<VPIcon icon="iconfont icon-pypi"/>Pip](https://pypi.org/project/pip/) is the default Python package installer, and venv creates isolated environments. These two tools have been used together for years. They work fine for simple scripts but require manual steps for real projects.

You create a virtual environment manually:

```sh
python -m venv env
```

Then you activate it, install packages, update <VPIcon icon="fas fa-file-lines"/>`requirements.txt`, and manage version conflicts yourself. Packaging the project is a separate process entirely.

Poetry automates all of this. It creates the environment, tracks versions, and builds packages. The workflow is cleaner and more modern. Pip and venv feel manual compared to Poetry’s automated approach.

If you only need a quick script, pip and venv are enough. But for repeatable and sharable projects, Poetry wins by a wide margin.

### Poetry vs Pipenv

[<VPIcon icon="fas fa-globe"/>Pipenv](https://pipenv.pypa.io/en/latest/) was created to make pip easier to use. It combines pip and virtual environments into a single workflow. Many people thought Pipenv would become the main Python tool, but it has struggled with performance and reliability issues.

For example, installing packages in Pipenv can be slow. Pipenv also uses a Pipfile instead of pyproject.toml, which makes it less aligned with modern Python standards.

A basic Pipenv command to install requests looks like:

```sh
pipenv install requests
```

Poetry does the same with:

```sh
poetry add requests
```

The biggest difference is stability. Poetry resolves dependencies faster and more reliably. It works well for large projects. Pipenv is simpler than raw pip but still less polished than Poetry.

### Poetry vs Hatch

[<VPIcon icon="fas fa-globe"/>Hatch](https://hatch.pypa.io/latest/) is another modern tool for managing Python projects. It also uses <VPIcon icon="iconfont icon-toml"/>`pyproject.toml`, so it follows the same standards as Poetry.

Hatch is known for being flexible and fast. It is popular among users who handle packaging, testing, and versioning.

Hatch can create environments using:

```sh
hatch env create
```

Dependencies are managed using sections in the configuration file. Hatch can feel more advanced, and it focuses more on packaging than dependency management.

The main difference is that Poetry tries to be an all-in-one tool for dependency management, environments, building, and publishing. Hatch gives more control but less of a guided experience.

For beginners and teams, Poetry feels smoother. Hatch is powerful for advanced users who want more customization.

---

## Why Poetry Feels Enjoyable to Use

One of the reasons developers enjoy Poetry is the feeling of clarity. Everything is clean, predictable, and organized. When you open a Poetry project, you always know where to look.

You know that dependencies are managed properly. You know that your build will work. This reduces stress and makes you more confident.

Poetry handles things you might forget about. It creates environments, controls versions, and keeps your workspace clean. It also has a friendly command-line interface that guides you with helpful messages.

Another benefit is how easy it is to share your project. Anyone who wants to run your project only needs to run:

```sh
poetry install
```

This brings stability to teams and avoids many common issues.

---

## When Poetry Might Not Be the Best Choice

Poetry is great for most projects, but there are cases where it may not be the best fit.

If your project is extremely small, you may not need the extra structure. If you work in an environment that already uses pip, conda, or another strict workflow, introducing Poetry may cause friction.

Poetry also tries to manage environments on its own. Some users prefer manual control. In those cases, tools like Hatch or plain pip may fit better.

But for the majority of Python developers, Poetry brings huge value with very little setup.

---

## Conclusion

Poetry is one of the clearest and most useful tools in the Python ecosystem. It helps you manage dependencies, create environments, build packages, and publish them with ease. It brings structure and reliability to your projects, making your code more stable and easier to share.

If you are looking for a better workflow for your Python projects, Poetry is a great tool to use. It keeps your setup clean, prevents version problems, and gives you a smooth path from development to publishing. With a few commands, you can build strong and repeatable Python projects without the usual headaches.

::: info

Hope you enjoyed this article. Sign up for my free newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Manage Your Python Projects with Poetry",
  "desc": "Python development looks simple from the outside. But managing real projects is rarely easy. You need to install packages, update them, avoid version conflicts, create virtual environments, and prepare your project for distribution. Many beginners th...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-your-python-projects-with-poetry.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
