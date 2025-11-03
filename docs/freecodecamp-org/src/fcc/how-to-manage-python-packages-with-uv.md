---
lang: en-US
title: "How to Manage Python Packages with uv"
description: "Article(s) > How to Manage Python Packages with uv"
icon: fa-brands fa-python
category:
  - Python
  - uv
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - uv
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Manage Python Packages with uv"
    - property: og:description
      content: "How to Manage Python Packages with uv"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-python-packages-with-uv.html
prev: /programming/py/articles/README.md
date: 2025-11-03
isOriginal: false
author:
  - name: Hew Hahn
    url : https://freecodecamp.org/news/author/hew/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762169941014/9e66858d-3ba4-434e-a9f1-84d42a316192.png
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

```component VPCard
{
  "title": "uv > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/uv/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Manage Python Packages with uv"
  desc="Python package managers let you install and manage dependencies—like NumPy, pandas, and so on—right from your terminal. In this article, you will learn how to use uv—an extremely fast Python package manager. Prerequisites To get the most out of this ..."
  url="https://freecodecamp.org/news/how-to-manage-python-packages-with-uv"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762169941014/9e66858d-3ba4-434e-a9f1-84d42a316192.png"/>

Python package managers let you install and manage dependencies—like NumPy, pandas, and so on—right from your terminal.

In this article, you will learn how to use `uv`—an extremely fast Python package manager.

::: note Prerequisites

To get the most out of this tutorial, you will need to:

- Know how to execute commands in your terminal,
- Be familiar with basic Python development/scripting.

:::

---

## Why Should You Use uv?

`uv` is a free and open-source Python project management tool. Written in Rust, `uv` is fast and easy-to-use. It has become a standard package manager for modern Python development. You can also use it to manage your virtual environments, making it a good alternative for `pip` and `venv`.

[<VPIcon icon="iconfont icon-astral"/>Speed tests](https://docs.astral.sh/uv/) have shown that `uv` is faster than other popular package managers when it comes to installing dependencies.

---

## How to Install uv

To install `uv`, simply execute the following command in your terminal:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

@tab targetNext

```sh
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

:::

---

## How to Set up a Project with uv

To start a new project with `uv`, run the following command:

```sh
uv init freecodecamp-project
```

This creates the folder <VPIcon icon="fas fa-folder-open"/>`/freecodecamp-project` in your working directory with the following structure:

```sh title="file structure"
├── .gitignore # hidden text file that lists files to be ignored by git
├── .python-version # hidden text file that keeps record of your Python's version number
├── README.md
├── main.py
└── pyproject.toml
```

`README.md` is a markdown file, which you can use to communicate information about your project (just as a repository README file on GitHub). <VPIcon icon="iconfont icon-toml"/>`pyproject.toml` is the configuration file for your project. You can edit it to change your project’s name, version and description. It also keeps track of dependencies you add to project. Last but not least, `main.py` is where you put your Python code.

---

## Commonly Used uv Commands

Before you can run any `uv` commands, move your terminal into your project folder:

```sh
cd freecodecamp-project
```

### How to Add a Dependency

To add a dependency (for example, NumPy), run:

```sh
uv add numpy
# or if you need a specific version
uv add 'numpy==2.3.0'
```

This automatically adds a virtual environment and a <VPIcon icon="fas fa-file-lock"/>`.lock` file with a new entry:

```sh title="file structure"
├── .venv # hidden folder inside of which your required packages will be installed
└── uv.lock
```

The `.lock` file keeps record of the exact versions of your dependencies and their required packages. You should never modify it directly.

### How to Remove a Dependency

To remove a dependency, run:

```sh
uv remove numpy
```

This will also remove the corresponding entry from the <VPIcon icon="fas fa-file-lock"/>`.lock` file.

### How to Run Python Code

To run your Python script, execute:

```sh
uv run main.py
```

This will run the code inside the created virtual environment with the installed dependencies in one step! That is, you don’t need to explicitly activate the virtual environment and then run your code.

### How to Move Your Project

Sometimes you may want to move your project to another machine. Maybe you want to share it with colleagues, or set it up on a production server. Getting to run your code on another machine has never been easier than with `uv`. You can simply copy your project folder to the destination environment and run the following command in the destination terminal:

```sh
uv sync --locked
```

This installs the exact versions of your project dependencies!

### How to Add and Run Tools

Sometimes you may need tools like `ruff`, a Python linter (code formatter), which you can add just like any other dependency to your project:

```sh
uv add ruff
```

To run an installed tool, execute:

```sh
uv run ruff check
```

### How to Run Tools Without Adding Them to Your Project

Sometimes you may not want to add tools to your dependencies. For example, because you just want to make one-off checks. `uv` has got you covered with `tool run`. Simply run:

```sh
uv tool run ruff check
# or equivalently 
uvx ruff check
```

This will run the tool in an isolated environment independent.

### How to Manage Multiple Python Versions

If your system has Python installed, `uv` will use it. Otherwise, it will automatically install the latest Python version when you execute Python code or create a virtual environment with `uv`. However, you can also use it to manage multiple Python versions:

```sh
# install the latest Python version
uv python install
# install multiple Python versions
uv python install 3.11 3.12
# list all installed Python versions
uv python list
# set the version to be used in the current project (.python-version)
uv python pin 3.11
```

### How to Migrate from pip to uv

`uv` works as drop-in replacement for `pip`, meaning that you can use common `pip` commands with `uv`. Let’s say you received a <VPIcon icon="fas fa-file-lines"/>`requirements.txt` file. To install the listed dependencies, you can run:

```sh
uv pip install -r requirements.txt
```

---

## Conclusion

You just learned how to use `uv`! Before `uv`, managing dependencies, virtual environments and Python versions had been notoriously cumbersome. As an ML engineer at [<VPIcon icon="fas fa-globe"/>MLjobs.io](https://mljobs.io), I can safely say that `uv` has been a game changer. Check out `uv`'s [<VPIcon icon="iconfont icon-astral"/>documentation](https://docs.astral.sh/uv/) to learn more.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Manage Python Packages with uv",
  "desc": "Python package managers let you install and manage dependencies—like NumPy, pandas, and so on—right from your terminal. In this article, you will learn how to use uv—an extremely fast Python package manager. Prerequisites To get the most out of this ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-python-packages-with-uv.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
