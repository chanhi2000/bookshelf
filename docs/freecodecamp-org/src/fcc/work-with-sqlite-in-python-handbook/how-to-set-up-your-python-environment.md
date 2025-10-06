---
lang: en-US
title: "How to Set Up Your Python Environment"
description: Article(s) > (1/11) How to Work with SQLite in Python - A Handbook for Beginners 
category:
  - Python
  - SQLite
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - sqlite
head:
  - - meta:
    - property: og:title
      content: Article(s) > (1/11) How to Work with SQLite in Python - A Handbook for Beginners
    - property: og:description
      content: "How to Set Up Your Python Environment"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/work-with-sqlite-in-python-handbook/how-to-set-up-your-python-environment.html
date: 2024-10-02
isOriginal: false
author: Ashutosh Krishna
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Work with SQLite in Python - A Handbook for Beginners",
  "desc": "SQLite is one of the most popular relational database management systems (RDBMS). It’s lightweight, meaning that it doesn’t take up much space on your system. One of its best features is that it’s serverless, so you don’t need to install or manage a ...",
  "link": "/freecodecamp.org/work-with-sqlite-in-python-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Work with SQLite in Python - A Handbook for Beginners"
  desc="SQLite is one of the most popular relational database management systems (RDBMS). It’s lightweight, meaning that it doesn’t take up much space on your system. One of its best features is that it’s serverless, so you don’t need to install or manage a ..."
  url="https://freecodecamp.org/news/work-with-sqlite-in-python-handbook/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"/>

Before working with SQLite, let’s ensure your Python environment is ready. Here’s how to set everything up.

---

## Installing Python

If you don’t have Python installed on your system yet, you can download it from the official [<VPIcon icon="fa-brands fa-python"/>Python website](https://python.org/downloads/). Follow the installation instructions for your operating system (Windows, macOS, or Linux).

To check if Python is installed, open your terminal (or command prompt) and type:

```sh
python --version
```

This should show the current version of Python installed. If it’s not installed, follow the instructions on the Python website.

---

## Installing SQLite3 Module

The good news is that SQLite3 comes built-in with Python! You don’t need to install it separately because it’s included in the standard Python library. This means you can start using it right away without any additional setup.

---

## How to Create a Virtual Environment (Optional but Recommended)

It’s a good idea to create a virtual environment for each project to keep your dependencies organized. A virtual environment is like a clean slate where you can install packages without affecting your global Python installation.

To create a virtual environment, follow these steps:

::: tabs

@tab:active 1.

First, open your terminal or command prompt and navigate to the directory where you want to create your project.

@tab 2.

Run the following command to create a virtual environment:

```sh
python -m venv env
```

Here, `env` is the name of the virtual environment. You can name it anything you like.

@tab 3.

Activate the virtual environment:

```sh
# Use the command for Windows
env\Scripts\activate

# Use the command for macOS/Linux:
env/bin/activate
```

:::

After activating the virtual environment, you’ll notice that your terminal prompt changes, showing the name of the virtual environment. This means you’re now working inside it.

---

## Installing Necessary Libraries

We’ll need a few additional libraries for this project. Specifically, we’ll use:

- `pandas`: This is an optional library for handling and displaying data in tabular format, useful for advanced use cases.
- `faker`: This library will help us generate fake data, like random names and addresses, which we can insert into our database for testing.

To install `pandas` and `faker`, simply run the following commands:

```sh
pip install pandas faker
```

This installs both `pandas` and `faker` into your virtual environment. With this, your environment is set up, and you’re ready to start creating and managing your SQLite database in Python!