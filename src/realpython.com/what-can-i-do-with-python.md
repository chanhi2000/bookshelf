---
lang: en-US
title: "What Can I Do With Python?"
description: "Article(s) > What Can I Do With Python?"
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
      content: "Article(s) > What Can I Do With Python?"
    - property: og:description
      content: "What Can I Do With Python?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/what-can-i-do-with-python.html
prev: /programming/py/articles/README.md
date: 2021-07-07
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/building_with_python_watermark.2ebe5beb5b1e.jpg
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
  name="What Can I Do With Python?"
  desc="In this tutorial, you'll find a set of guidelines that will help you start applying your Python skills to real-world problems. By the end of your reading, you'll be able to answer the question ”What can I do with Python?”"
  url="https://realpython.com/what-can-i-do-with-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/building_with_python_watermark.2ebe5beb5b1e.jpg"/>

You’ve finished a course or finally made it to the end of a [<FontIcon icon="fas fa-globe"/>book](https://realpython.com/products/python-basics-book/) that teaches you the [<FontIcon icon="fas fa-globe"/>basics of programming with Python](https://realpython.com/learning-paths/python3-introduction/). You’ve learned about [**variables**](/realpython.com/python-variables.md), [**lists, tuples**](/realpython.com/python-lists-tuples.md), [**dictionaries**](/realpython.com/python-dicts.md), [**`for`**](/realpython.com/python-for-loop.md) and [**`while`**](/realpython.com/python-while-loop.md) loops, [**conditional statements**](/realpython.com/python-conditional-statements.md), [**object-oriented concepts**](/realpython.com/python3-object-oriented-programming.md), and more. So, what’s next? What can you do with Python nowadays?

Python is a versatile programming language with many use cases in a variety of different fields. If you’ve grasped the basics of Python and are itching to build something with the language, then it’s time to figure out what your next step should be.

::: info In this article, you’ll see how you can use Python for

- Doing general **software development**
- Diving into **data science and math**
- Speeding up and automating your **workflow**
- Building **embedded systems** and **robots**

:::

You’ll also find ideas for practical projects, resources, and tutorials that you can use to start building things with Python right away.

---

## Python in the Real World

Python is a high-level and general-purpose programming language. As this definition implies, you can use Python for [<FontIcon icon="iconfont icon-jetbrains"/>several purposes](https://jetbrains.com/lp/python-developers-survey-2020/#PurposesUsingPython), from [<FontIcon icon="fas fa-globe"/>web development](https://realpython.com/tutorials/web-dev/) to [<FontIcon icon="fas fa-globe"/>data science](https://realpython.com/tutorials/data-science/), [<FontIcon icon="fas fa-globe"/>machine learning](https://realpython.com/tutorials/machine-learning/), and [<FontIcon icon="fas fa-globe"/>robotics](https://talkpython.fm/episodes/show/232/become-a-robot-developer-with-python). Python’s real-world use cases are limitless.

You’re probably wondering what people are [<FontIcon icon="fa-brands fa-python"/>successfully building](https://python.org/success-stories/) with Python. If you take a quick look at companies using the language, then you’ll find [**world-class companies**](/realpython.com/world-class-companies-using-python.md), such as Google, YouTube, Facebook, Instagram, Spotify, Netflix, and more.

Google has used Python [<FontIcon icon="fa-brands fa-stack-overflow"/>from the start](https://stackoverflow.com/questions/2560310/heavy-usage-of-python-at-google/2561008#2561008), and it’s gained a place as one of the tech giant’s main server-side languages. [Guido van Rossum (<FontIcon icon="fa-brands fa-x-twitter"/>)](https://x.com/gvanrossum), Python’s creator, worked there for several years, overseeing the language’s development.

[<FontIcon icon="fas fa-globe"/>Instagram likes Python](https://pyfound.blogspot.com/2021/05/the-2021-python-language-summit-cpython.html) for its simplicity. The service [is known for (<FontIcon icon="fa-brands fa-medium"/>`instagram-engineering`)](https://instagram-engineering.com/web-service-efficiency-at-instagram-with-python-4976d078e366) running “the world’s largest deployment of the Django web framework, which is written entirely in Python.”

Spotify uses the language for data analysis and back-end services. According to its team, Python’s ease of use leads to a lightning-fast development pipeline. Spotify performs a ton of analysis to give recommendations to its users, so it needs a productive tool that works well. Python to the rescue!

You’ll also find that Python has been vital for science and [**space exploration**](/realpython.com/python-news-march-2021.md#python-lands-on-mars), with a lot of exciting use cases in [<FontIcon icon="fa-brands fa-wikipedia-w"/>robotics](https://en.wikipedia.org/wiki/Robotics) and hardware control.

In this article, you’ll see how you can use your Python skills in a wide range of areas.

---

## Develop Cool Software

Python’s ecosystem provides a rich set of [<FontIcon icon="fa-brands fa-wikipedia-w"/>frameworks](https://en.wikipedia.org/wiki/Software_framework), tools, and libraries that allow you to write almost any kind of application. You can use Python to build applications for the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Web](https://en.wikipedia.org/wiki/World_Wide_Web) as well as [<FontIcon icon="fa-brands fa-wikipedia-w"/>desktop](https://en.wikipedia.org/wiki/Desktop_metaphor) and [<FontIcon icon="fa-brands fa-wikipedia-w"/>mobile](https://en.wikipedia.org/wiki/Mobile_computing) platforms. You can even use Python to [**create video games**](/realpython.com/top-python-game-engines.md).

### Web Development

Developing web applications with Python is one of the most in-demand skills, with a lot of opportunities for you out there. In this field, you’ll find several useful Python frameworks, libraries, and tools for developing cool web applications, APIs, and more. Here are some of the most popular Python web frameworks:

::: tabs

@tab <FontIcon icon="iconfont icon-django"/>Django

https://djangoproject.com/

Django is a high-level framework that encourages rapid web application development with a clean and pragmatic design. It allows you to focus on writing your applications without having to reinvent the wheel.

@tab <FontIcon icon="iconfont icon-fastapi"/>FastAPI

https://fastapi.tiangolo.com/

FastAPI is a fast and performant web framework for building web APIs. It’s built on top of modern Python type hint features and enables [**asynchronous**](/realpython.com/async-io-python.md) programming.

@tab <FontIcon icon="iconfont icon-flask"/>Flask

https://palletsprojects.com/p/flask/

Flask is a lightweight framework for creating [<FontIcon icon="fas fa-globe"/>WSGI](https://wsgi.readthedocs.io/) web applications. It allows you to get started quickly and to scale up to complex applications if needed.

@tab Tornado

https://tornadoweb.org/en/stable/

Tornado is a web framework and asynchronous networking library. It uses non-blocking network [<FontIcon icon="fa-brands fa-wikipedia-w"/>I/O](https://en.wikipedia.org/wiki/Input/output), so you can write applications that can scale to tens of thousands of open connections.

:::

::: tip To get started with web development, check out

- [<FontIcon icon="fas fa-globe"/>Python Web Development Tutorials](https://realpython.com/tutorials/web-dev/)
- [<FontIcon icon="fas fa-globe"/>Django Tutorials](https://realpython.com/tutorials/django/)
- [<FontIcon icon="fas fa-globe"/>Flask Tutorials](https://realpython.com/tutorials/flask/)
- [**FastAPI Tutorial**](/realpython.com/fastapi-python-web-apis.md)

:::

If you want some practical project ideas for applying your web development skills right away, then you can build a [**portfolio web application with Django**](/realpython.com/get-started-with-django-1.md). With so many jobs and career opportunities out there, it’s a great idea to have a personal portfolio these days, so go ahead and give it a try. You don’t need to know anything about Django to get started with this step-by-step tutorial. It’s perfect if you’re itching to get your hands dirty with web development in Python.

### CLI Development

Another field in which Python shines is [<FontIcon icon="fa-brands fa-wikipedia-w"/>command-line interface (CLI)](https://en.wikipedia.org/wiki/Command-line_interface) application development. CLI applications are everywhere and allow you to automate repetitive and boring tasks in your day-to-day work by creating small and large tools for your command line.

In Python, you have an impressive set of CLI libraries and frameworks that can make your life more pleasant and help you build command-line tools quickly:

::: tabs

@tab argparse

https://docs.python.org/3/library/argparse.html#module-argparse

`argparse` is a [<FontIcon icon="fa-brands fa-python"/>standard library](https://docs.python.org/3/library/index.html) module that allows you to write user-friendly command-line interfaces. You can define the arguments you want to take at the command line and parse them nicely. It automatically generates help and usage messages and issues errors when your users provide invalid input.

@tab Click

https://palletsprojects.com/p/click/

Click is a Python package for creating beautiful command-line interfaces with as little code as needed. It’s highly configurable and comes with sensible defaults out of the box. Its goals include making the process of writing command-line tools quick and fun.

@tab Typer

https://typer.tiangolo.com/

Typer is a library for building CLI applications that users will love using and developers will love creating. It provides automatic help messages and automatic completion for all [<FontIcon icon="fa-brands fa-wikipedia-w"/>shells](https://en.wikipedia.org/wiki/Shell_(computing)). It minimizes code duplication and facilitates debugging.

:::

::: tip To get started with CLI development, check out

- [**How to Build Command Line Interfaces in Python With argparse**](/realpython.com/command-line-interfaces-python-argparse.md)
- [**Comparing Python Command-Line Parsing Libraries – Argparse, Docopt, and Click**](/realpython.com/comparing-python-command-line-parsing-libraries-argparse-docopt-click.md)
- [**Click and Python: Build Extensible and Composable CLI Apps**](/realpython.com/python-click.md)

:::

Additionally, if you want to jump into building a CLI application project, then you can start by creating a [**directory tree generator tool**](/realpython.com/directory-tree-generator-python.md) for your command line. In this step-by-step project, you’ll build a command-line tool for generating ASCII diagrams that display the contents of a [<FontIcon icon="fa-brands fa-wikipedia-w"/>directory](https://en.wikipedia.org/wiki/Directory_(computing)) or folder in your file system. You can also work with ASCII to create a [**hangman game**](/realpython.com/python-hangman.md).

Creating applications with a user-friendly and intuitive command-line interface is a valuable skill for any Python developer.

### GUI Development

Creating traditional [<FontIcon icon="fa-brands fa-wikipedia-w"/>graphical user interface (GUI)](https://en.wikipedia.org/wiki/Graphical_user_interface) applications for [<FontIcon icon="fa-brands fa-wikipedia-w"/>desktop environments](https://en.wikipedia.org/wiki/Desktop_environment) is also an attractive option in Python. If you’re interested in building this kind of application, then Python has you covered with a wide range of GUI libraries, frameworks, and toolkits to choose from:

::: tabs

@tab:active <FontIcon icon="iconfont icon-kivy"/>Kivy

https://kivy.org/#home

Kivy is a library for rapid development of applications with innovative user interfaces, such as [multi-touch](https://en.wikipedia.org/wiki/Multi-touch) applications. It runs on Linux, Windows, macOS, Android, iOS, and [Raspberry Pi](https://realpython.com/python-raspberry-pi/).

@tab <FontIcon icon="iconfont icon-qt"/>PyQt

https://riverbankcomputing.com/static/Docs/PyQt6/

PyQt is a set of Python bindings for the [<FontIcon icon="iconfont icon-qt"/>Qt](https://wiki.qt.io/About_Qt) application framework. It includes classes for building GUI applications. It also provides classes for networking, [**threads**](/realpython.com/ppython-pyqt-qthread.md), [**SQL databases**](/realpython.com/python-pyqt-database.md), and more. It supports the Windows, Linux, and macOS platforms.

@tab PySimpleGUI

https://pysimplegui.readthedocs.io/en/latest/

PySimpleGUI is a library that aims to transform the tkinter, Qt, wxPython, and [<FontIcon icon="iconfont icon-github"/>`dddomodossola/remi`](https://github.com/dddomodossola/remi) GUI frameworks into a simpler interface. It uses Python core data types to define windows and simplify event handling.

@tab Qt for Python (<code>PySide6</code>)

https://qt.io/qt-for-python

Qt for Python is a project that provides the official set of Python bindings (`PySide6`) for the Qt framework.

@tab tkinter

https://docs.python.org/3/library/tkinter.html#module-tkinter

tkinter is a standard Python interface to the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Tk GUI toolkit](https://en.wikipedia.org/wiki/Tk_(software)). It allows you to build GUI applications without the need for third-party dependencies. It’s available on most Unix platforms as well as on Windows systems. 

@tab wxPython

https://wxpython.org/

wxPython is a Python binding for the [wxWidgets](https://wxwidgets.org/) [<FontIcon icon="fa-brands fa-wikipedia-w"/>C++](https://en.wikipedia.org/wiki/C%2B%2B) library. It allows you to create applications for Windows, macOS, and Linux with a single code base. It gives applications a native look and feel because it uses the platform’s native [**API**](/realpython.com/python-api.md).

:::

A quick way to start building your GUI applications is to use [`tkinter`](https://realpython.com/python-gui-tkinter/). This module comes in the Python standard library. Practice using `tkinter` and watch your vision materialize on the screen. Once you’ve got your feet wet, you can branch out and start working with other Python GUI toolkits.

::: tip To get started with GUI programming, check out

- [Python GUI Programming Tutorials](https://realpython.com/tutorials/gui/)
- [Python GUI Programming Learning Path](https://realpython.com/learning-paths/python-gui-programming/)
- [GUI Programming With PyQt Learning Path](https://realpython.com/learning-paths/pyqt-gui-programming/)

:::

Building [<FontIcon icon="fa-brands fa-wikipedia-w"/>back-end](https://en.wikipedia.org/wiki/Front_end_and_back_end) services is an essential part of development. However, you also need a front end. Creating applications that users can effectively interact with is paramount.

If you want to start creating real-world GUI applications, then you can [**build a calculator using PyQt**](/realpython.com/python-pyqt-gui-calculator.md). Completing this calculator project will help you grasp the fundamentals of this full-featured GUI framework, so you can start building nice things for your desktop immediately.

You can also find some other practical projects to help you out with your GUI programming journey.

::: tip Take a look at the following resources:

- [**Build a Bulk File Rename Tool With Python and PyQt**](/realpython.com/bulk-file-rename-tool-python.md)
- [**Build a Contact Book With Python, PyQt, and SQLite**](/realpython.com/python-contact-book.md)

:::

These projects will guide you through the process of building GUI applications with PyQt and Python. They will also help you integrate a wide variety of skills to create fully functional real-world applications.

### Game Development

Creating computer games is a great way to learn how to program not only in Python but also in any other language. To develop games, you’ll need to use [**variables**](/realpython.com/python-variables.md), [**loops**](/realpython.com/python-for-loop.md), [**conditional statements**](/realpython.com/python-conditional-statements.md), [**functions**](/realpython.com/defining-your-own-python-function.md), [<FontIcon icon="fas fa-globe"/>object-oriented programming](https://realpython.com/courses/intro-object-oriented-programming-oop-python/), and more. Game development is an excellent option to integrate multiple skills.

Computer games have played an important role in programming. Many people get into programming because they love games and want to re-create their favorite games or build their own. Developing computer games can be a fun and rewarding adventure, in which you can live the great experience of playing the game you just created.

You’ll find several tools, libraries, and frameworks for creating games quickly in the Python ecosystem. Here’s a small sample of them:

::: tabs

@tab:active Arcade

https://arcade.academy/index.html

Arcade is a Python library for creating 2D video games. It’s ideal for people learning to program because they don’t need to learn a complex game framework to start creating their own games.

@tab PyGame

https://pygame.org/wiki/about

PyGame is a set of Python modules designed for writing video games. It adds functionality on top of the [<FontIcon icon="fas fa-globe"/>SDL](http://www.libsdl.org/) library. It allows you to create full-featured games and multimedia programs. The library is highly portable and runs on several platforms and operating systems.

@tab pyglet

http://pyglet.org/

pyglet is a powerful Python library for creating games and other visually rich applications on Windows, macOS, and Linux. It supports windowing, user interface event handling, [<FontIcon icon="fa-brands fa-wikipedia-w"/>OpenGL](https://en.wikipedia.org/wiki/OpenGL) graphics, loading images, and playing videos and music.

:::

::: tip To get started with game programming, check out:

- [<FontIcon icon="fas fa-globe"/>Python Game Development Tutorials](https://realpython.com/tutorials/gamedev/)
- [**PyGame: A Primer on Game Programming in Python**](/realpython.com/pygame-a-primer.md)

:::

You can use Python to create [**arcade games**](/realpython.com/arcade-python-game-framework.md), adventure games, and puzzle games that you can deploy within a few hours. You can also code classic games, such as hangman, [**tic-tac-toe**](/realpython.com/tic-tac-toe-python.md), [**rock paper scissors**](/realpython.com/python-rock-paper-scissors.md), and more with your newly acquired programming skills.

If you want to dive into building your first game, then you can start by [**building an Asteroids game with Python and PyGame**](/realpython.com/asteroids-game-python.md). If you want to go a step further and build your first platform game, then check out [**Build a Platform Game in Python With Arcade**](/realpython.com/platformer-python-arcade.md).

---

## Dive Into Data Science and Math

[<FontIcon icon="fa-brands fa-wikipedia-w"/>Data science](https://en.wikipedia.org/wiki/Data_science) is a field that involves cleaning, preparing, and analyzing data to extract knowledge from it. Data science combines [<FontIcon icon="fa-brands fa-wikipedia-w"/>statistics](https://en.wikipedia.org/wiki/Statistic), [<FontIcon icon="fa-brands fa-wikipedia-w"/>mathematics](https://en.wikipedia.org/wiki/Mathematics), [<FontIcon icon="fa-brands fa-wikipedia-w"/>programming](https://en.wikipedia.org/wiki/Computer_programming), and problem-solving skills to extract useful information from data.

Python plays a fundamental role in the fields of [<FontIcon icon="fas fa-globe"/>data science](https://realpython.com/tutorials/data-science/) and math. The language has become popular among scientists because of its readability, productivity, flexibility, and portability. The Python ecosystem around science has grown immensely. You’ll find mature Python solutions in almost every major field in math and science.

Python includes tools for [<FontIcon icon="fa-brands fa-wikipedia-w"/>machine learning (ML)](https://en.wikipedia.org/wiki/Machine_learning), [<FontIcon icon="fa-brands fa-wikipedia-w"/>artificial intelligence (AI)](https://en.wikipedia.org/wiki/Artificial_intelligence), [<FontIcon icon="fa-brands fa-wikipedia-w"/>scientific computing](https://en.wikipedia.org/wiki/Computational_science), [<FontIcon icon="fa-brands fa-wikipedia-w"/>data analysis](https://en.wikipedia.org/wiki/Data_analysis), and [<FontIcon icon="fa-brands fa-wikipedia-w"/>data visualization](https://en.wikipedia.org/wiki/Data_visualization). The language also provides efficient tools for collecting, [<FontIcon icon="fa-brands fa-wikipedia-w"/>mining](https://en.wikipedia.org/wiki/Data_mining), and manipulating data.

### Machine Learning

Machine learning can be the first step for someone interested in artificial intelligence. Machine learning studies algorithms that learn through experience. These algorithms build models based on samples of [<FontIcon icon="fa-brands fa-wikipedia-w"/>training data](https://en.wikipedia.org/wiki/Training_data) to make predictions and decisions.

Machine learning can be an intimidating field to get started with because the space is fast and ever-changing. Here’s a summary of some of the most popular tools for doing machine learning with Python:

::: tabs

@tab <FontIcon icon="iconfont icon-keras"/>Keras

https://keras.io/

Keras is an industrial-strength deep learning framework with an API designed for human beings. It allows you to run new experiments and try more ideas quickly. It follows best practices for reducing cognitive load.

@tab NLTK

https://nltk.org/

NLTK is a platform for building Python programs to [**work with human language data**](/realpython.com/nltk-nlp-python.md). It provides libraries for classification, tokenization, stemming, tagging, parsing, and semantic reasoning.

@tab <FontIcon icon="iconfont icon-pytorch"/>PyTorch

https://pytorch.org/

PyTorch is an open source machine learning framework that accelerates the path from research prototyping to production deployment.

@tab <FontIcon icon="iconfont icon-scikit-learn"/>scikit-learn

http://scikit-learn.org/

scikit-learn is an open source machine learning library that supports [<FontIcon icon="fa-brands fa-wikipedia-w"/>supervised](https://en.wikipedia.org/wiki/Supervised_learning) and [<FontIcon icon="fa-brands fa-wikipedia-w"/>unsupervised learning](https://en.wikipedia.org/wiki/Unsupervised_learning). It’s an efficient tool for predictive data analysis that’s accessible to everybody and reusable in various contexts.

@tab <FontIcon icon="iconfont icon-tensorflow"/>TensorFlow

https://tensorflow.org/

TensorFlow is an end-to-end open source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries, and community resources that will help you build and deploy ML-powered applications.

:::

::: tip To get started with machine learning, check out:

- [<FontIcon icon="fas fa-globe"/>Python Machine Learning Tutorials](https://realpython.com/tutorials/machine-learning/)
- [<FontIcon icon="fas fa-globe"/>Machine Learning With Python Learning Path](https://realpython.com/learning-paths/machine-learning-python/)

:::

### Scientific Computing

Another field in which Python plays a significant role is scientific computing. Scientists use advanced [<FontIcon icon="fa-brands fa-wikipedia-w"/>computing](https://en.wikipedia.org/wiki/Computing) capabilities available through [<FontIcon icon="fa-brands fa-wikipedia-w"/>supercomputers](https://en.wikipedia.org/wiki/Supercomputer), [<FontIcon icon="fa-brands fa-wikipedia-w"/>clusters of computers](https://en.wikipedia.org/wiki/Computer_cluster), and even desktop and laptop computers to understand and solve complex problems.

Here are some of the libraries and tools you can use for scientific computing in Python these days:

::: tabs

@tab:active <FontIcon icon="iconfont icon-numpy"/>NumPy

https://numpy.org/

NumPy is a fundamental package for scientific computing with Python. It offers comprehensive mathematical functions, random number generators, [**linear algebra**](/realpython.com/python-linear-algebra.md) routines, Fourier transforms, and more. It provides a high-level syntax that makes it accessible and productive.

@tab SciPy

https://scipy.org/

SciPy is a Python-based collection of open source software for mathematics, science, and engineering. |

@tab SimPy

https://simpy.readthedocs.io/en/latest/

SimPy is a process-based discrete-event simulation framework based on Python. It can help you simulate real-world systems, such as airports, customer services, highways, and more.

:::

::: tip To get started with scientific computing, check out

- [<FontIcon icon="fas fa-globe"/>Math for Data Science Learning Path](https://realpython.com/learning-paths/math-data-science/)
- [**NumPy, SciPy, and Pandas: Correlation With Python**](/realpython.com/numpy-scipy-pandas-correlation-python.md)
- [**SimPy: Simulating Real-World Processes With Python**](/realpython.com/simpy-simulating-with-python.md)

:::

The libraries and tools in this section are fundamental pieces in the data science space in Python. Some of them are core components of higher-level libraries for machine learning, data analysis, and more.

### Data Analysis and Visualization

[<FontIcon icon="fa-brands fa-wikipedia-w"/>Data analysis](https://en.wikipedia.org/wiki/Data_analysis) is a process of collecting, inspecting, [<FontIcon icon="fa-brands fa-wikipedia-w"/>cleansing](https://en.wikipedia.org/wiki/Data_cleansing), [<FontIcon icon="fa-brands fa-wikipedia-w"/>transforming](https://en.wikipedia.org/wiki/Data_transformation), and [<FontIcon icon="fa-brands fa-wikipedia-w"/>modeling](https://en.wikipedia.org/wiki/Data_modeling) data to discover useful information, make predictions, arrive at conclusions, support decision-making processes, and more. Data analysis is closely related to [<FontIcon icon="fa-brands fa-wikipedia-w"/>data visualization](https://en.wikipedia.org/wiki/Data_visualization), which deals with the graphical representation of data.

In Python, you’ll also find mature and well-established libraries for data analysis and data visualization. Here are some of them:

::: tabs

@tab:active Bokeh

https://bokeh.org/

Bokeh is an interactive data visualization library for web browsers. It provides tools for constructing elegant and versatile graphics. It can help you quickly make interactive plots, dashboards, and data applications.

@tab Dash

https://plotly.com/dash/

Dash is a Python framework for building web analytic applications quickly. It’s ideal for building data visualization applications with custom user interfaces that render in the browser.

@tab <FontIcon icon="iconfont icon-matplotlib"/>Matplotlib

https://matplotlib.org/

Matplotlib is a library for creating static, animated, and interactive data visualizations in Python.

@tab <FontIcon icon="iconfont icon-pandas"/>pandas

https://pandas.pydata.org/

pandas is a powerful and flexible open source tool for analyzing and manipulating data. It provides fast, flexible, and expressive data structures to work with relational or labeled data. 

@tab Seaborn

https://seaborn.pydata.org/

Seaborn is a Python data visualization library based on Matplotlib. It provides a high-level interface for drawing attractive and informative statistical graphics that allow you to explore and understand your data. It integrates closely with pandas data structures.

:::

::: tip To get started with data analysis and visualization, check out

- [<FontIcon icon="fas fa-globe"/>Data Collection & Storage Learning Path](https://realpython.com/learning-paths/data-collection-storage/)
- [<FontIcon icon="fas fa-globe"/>Data Visualization With Python Learning Path](https://realpython.com/learning-paths/data-visualization-python/)
- [<FontIcon icon="fas fa-globe"/>Data Science With Python Core Skills Learning Path](https://realpython.com/learning-paths/data-science-python-core-skills/)
- [<FontIcon icon="fas fa-globe"/>Pandas for Data Science Learning Path Learning Path](https://realpython.com/learning-paths/pandas-data-science/)
- [**Develop Data Visualization Interfaces in Python With Dash**](/realpython.com/python-dash.md)

:::

If you want to level up your data analysis skills by building a practical project, then you can [**create a gradebook with Python and pandas**](/realpython.com/pandas-project-gradebook.md). This step-by-step project guides you through the process of creating a Python script that loads the grade data and calculates letter grades for a group of students. The project involves loading the data from a [**comma-separated values (CSV) file**](/realpython.com/python-csv.md), exploring the data, and calculating and plotting the grades using pandas.

### Web Scraping

One of the most significant sources of information for doing data science is the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Web](https://en.wikipedia.org/wiki/World_Wide_Web). The process of collecting and parsing raw data from the Web with an automated tool ([<FontIcon icon="fa-brands fa-wikipedia-w"/>crawler](https://en.wikipedia.org/wiki/Web_crawler)) is known as [<FontIcon icon="fa-brands fa-wikipedia-w"/>web scraping](https://en.wikipedia.org/wiki/Web_scraping).

Python has a great set of tools and libraries for scraping data from the Web. Here are some of them:

::: tabs

@tab:active Beautiful Soup

https://crummy.com/software/BeautifulSoup/bs4/doc/

Beautiful Soup is a Python library for pulling data out of HTML and XML files into parse trees. The library provides methods and Pythonic idioms to navigate, search, modify, and extract information from parse trees.

@tab <code>requests</code> 

https://requests.readthedocs.io/en/latest/

`requests` is an elegant and powerful [<FontIcon icon="fa-brands fa-wikipedia-w"/>HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) library for Python. It provides an intuitive and concise API designed for human beings.

@tab Scrapy

https://docs.scrapy.org/en/latest/

Scrapy is a fast, high-level web crawling and web scraping framework. It allows you to crawl websites and extract structured data from their pages.

@tab <code>urllib.request</code>

https://realpython.com/urllib-request/

`urllib.request` is a standard library module that defines functions and classes to help you open URLs. It also allows you to work with basic and [<FontIcon icon="fa-brands fa-wikipedia-w"/>digest authentication](https://en.wikipedia.org/wiki/Digest_access_authentication), redirections, cookies, and more.

:::

::: tip To scrape data from the web, check out

- [<FontIcon icon="fas fa-globe"/>Python Web Scraping Tutorials](https://realpython.com/tutorials/web-scraping/)
- [<FontIcon icon="fas fa-globe"/>Python Web Scraping Learning Path](https://realpython.com/learning-paths/python-web-scraping/)

:::

Once you know the basics of web scraping, you can dive into a practical project and build your own [**web scraper with Python and Beautiful Soup**](https://realpython.com/beautiful-soup-web-scraper-python.md). After finishing this practical project, you’ll be able to apply the same process and tools to any other static websites out there. These skills allow you to extract relevant information and use it in your applications. Go ahead and give it a try!

::: note

Before using your Python skills for web scraping, you should check the use policy of your target website to make sure that scraping it with automated tools isn’t a violation of its terms of use.

:::

A second project you can build right away is a [**Bitcoin price notification service**](/realpython.com/python-bitcoin-ifttt.md). Since topping out at a price of just over $40,000 in January 2021, the cryptocurrency has been on the minds of millions. Its price continues to fluctuate, but many people out there would consider it a worthwhile investment.

If you’re looking to cash in on the virtual gold rush and just need to know when to make your move, then you’ll need to stay on top of Bitcoin’s prices. The foundation of this project is the creation of [<FontIcon icon="fas fa-globe"/>IFTTT](https://ifttt.com/) (If This Then That) applets. You’ll learn how to use [**`requests`**](/realpython.com/python-requests.md) to send HTTP requests and how to use a [<FontIcon icon="fa-brands fa-wikipedia-w"/>webhook](https://en.wikipedia.org/wiki/Webhook) to connect your application to external services.

This Bitcoin price notification service is the perfect starter project for a [**beginner**](/realpython.com/python-beginner-tips.md) Pythonista with interest in crypto. Then you can extend the service you’ll build in this tutorial to monitor other currencies as well.

Thanks to the Internet—and, increasingly, the Internet of Things—you now have access to hordes of data that weren’t available years ago.

Analytics is a huge part of any field that works with data. What are people talking about? What patterns can you see in their behavior? Twitter is a great place to get answers to some of these questions. If you’re interested in data analysis, then a [**Twitter sentiment analysis project**](/realpython.com/twitter-sentiment-python-docker-elasticsearch-kibana.md) is a great way to use your Python skills to answer questions about the world around you.

In this project, you’ll learn how to mine Twitter data and analyze user sentiment with a [**Docker**](/realpython.com/python-versions-docker.md) environment. You’ll learn how to register an application with Twitter, which you’ll need to do in order to access their streaming API. You’ll see how to use [<FontIcon icon="fas fa-globe"/>Tweepy](https://tweepy.org/) to filter which tweets you want to pull, [<FontIcon icon="fas fa-globe"/>TextBlob](https://textblob.readthedocs.io/en/dev/) to calculate the sentiment of those tweets, [<FontIcon icon="iconfont icon-elasticsearch"/>Elasticsearch](https://elasticsearch.org/) to analyze their content, and [<FontIcon icon="iconfont icon-elasticsearch"/>Kibana](https://elasticsearch.org/overview/kibana/) to visualize the results.

---

## Speed Up and Automate Your Workflow

Computers are extremely good at performing repetitive and boring tasks. They can be doing the same thing for a long time without making mistakes. This is a valuable feature that can help you make your day-to-day work more pleasant and productive.

With Python, you can automate a lot of tasks in your workflow. You can automate and manage your [<FontIcon icon="fa-brands fa-wikipedia-w"/>DevOps](https://en.wikipedia.org/wiki/DevOps) operations, build an effective [**Python development environment**](/realpython.com/effective-python-environment.md), handle the packaging and [<FontIcon icon="fa-brands fa-wikipedia-w"/>deployment](https://en.wikipedia.org/wiki/Software_deployment) process in your development cycle, test your software, manage your database systems, and more.

### DevOps

DevOps comprises software development and general [<FontIcon icon="fa-brands fa-wikipedia-w"/>IT operations](https://en.wikipedia.org/wiki/IT_operations). DevOps allows you to handle the entire life cycle of your applications and software products. It includes development, testing, packaging and deployment, and other related operations.

Python is one of the primary technologies people use for DevOps. Its flexibility and accessibility make Python an excellent fit for this job, enabling development teams to improve their workflow and to be more efficient and productive.

In the Python ecosystem, you’ll find that some popular DevOps tools are written in Python. You’ll also find that you can use Python to control most of those tools. Here are a few of them:

::: tabs

@tab:active <FontIcon icon="iconfont icon-ansible"/>Ansible

https://ansible.com/

Ansible is a tool for software [provisioning](https://en.wikipedia.org/wiki/Provisioning), configuration management, and [application deployment](https://en.wikipedia.org/wiki/Application_deployment). It enables [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code).

@tab <FontIcon icon="fa-brands fa-docker"/>Docker Compose

https://docs.docker.com/compose/

Docker Compose is a tool for defining and running multicontainer [<FontIcon icon="fa-brands fa-docker"/>Docker](https://docs.docker.com/) applications. You can configure your application’s services with a [<FontIcon icon="iconfont icon-yaml"/>YAML](https://yaml.org/) file. Then, with a single command, you can create and start all the services from your configuration file. It works on production, staging, development, testing, and more.

:::

::: tip To get started with DevOps, check out

- [<FontIcon icon="fas fa-globe"/>Python DevOps Tutorials](https://realpython.com/tutorials/devops/)
- [<FontIcon icon="fas fa-globe"/>DevOps With Python Learning Path](https://realpython.com/learning-paths/python-devops/)

:::

With these resources, you’ll build various skills and learn to use tools and technologies that any DevOps engineer working with Python should know.

### Development Environment

Constructing a productive and effective environment for you and your teammates is a fundamental part of software development. To this end, Python has a great set of tools that allows you to isolate your packages, libraries, and Python version in per-project virtual environments.

Here are some of the most popular tools:

::: tabs

@tab:active <FontIcon icon="iconfont icon-anaconda"/>Conda

https://docs.conda.io/en/latest/

`conda` is an open source package and environment management system. It allows you to quickly install, run, and update packages and their dependencies. It helps you find and install packages.

@tab <code>pip</code>

https://pip.pypa.io/en/stable/

`pip` is a [<FontIcon icon="fa-brands fa-python"/>package management tool for Python](https://packaging.python.org/guides/tool-recommendations/). It allows you to install packages from [<FontIcon icon="iconfont icon-pypi"/>PyPI](https://pypi.org/) and other indexes.
@tab Pipenv

https://pipenv.pypa.io/en/latest/

Pipenv is a tool that aims to bring the best of all packaging worlds to the Python world. It allows you to create and manage virtual environments for your projects. It provides a way to use `pip` and [<FontIcon icon="fas fa-globe"/>`virtualenv`](https://virtualenv.pypa.io/en/latest/) together through a unified interface.

@tab pipx

https://pipxproject.github.io/pipx/

pipx is a tool that helps you install and run end-user applications written in Python in isolated environments. It creates an isolated environment for each application and its associated packages. It makes the applications available in your command line or shell.

@tab pyenv

https://github.com/pyenv/pyenv

pyenv is a tool for installing and managing multiple Python versions. It lets you switch between them quickly. It also allows you to define per-project Python versions.

:::

::: tip To build an effective development environment, check out:

- [<FontIcon icon="fas fa-globe"/>Python Development Tools Tutorials](https://realpython.com/tutorials/tools/)
- [<FontIcon icon="fas fa-globe"/>Perfect Your Python Development Setup Learning Path](https://realpython.com/learning-paths/perfect-your-python-development-setup/)
- [**An Effective Python Environment: Making Yourself at Home**](/realpython.com/effective-python-environment.md)

:::

Learning how to build an effective Python environment for your development adventure will push your productivity to the next level, so it’s important to take the time to polish this skill.

### Software Packaging and Deployment

Another critical part of your software development cycle is to [<FontIcon icon="fa-brands fa-python"/>package](https://packaging.python.org/tutorials/packaging-projects/), distribute, and [<FontIcon icon="fa-brands fa-wikipedia-w"/>deploy](https://en.wikipedia.org/wiki/Software_deployment) your products to your end users or clients. In Python, a quick and popular way to deploy applications and libraries is to publish them to PyPI.

Here are some of the tools you can use for this purpose:

::: tabs

@tab:active Flit

https://flit.readthedocs.io/en/latest/index.html

Flit is a tool that provides a quick way to put your Python packages and modules on PyPI. It helps you set up the information about your package, so you can publish it to PyPI with minimal effort.

@tab <FontIcon icon="iconfont icon-poetry"/>Poetry

https://python-poetry.org/

Poetry is a tool for creating, building, installing, and packaging Python projects. It also allows you to publish your projects to PyPI. It tracks and resolves your project’s dependencies. It uses your current virtual environments or creates new ones to isolate your packages from your system-wide Python installation. |

@tab PyInstaller

https://pyinstaller.org/

PyInstaller is a tool that freezes Python applications into stand-alone executables that work under Windows, GNU/Linux, macOS, and others.

@tab setuptools

https://packaging.python.org/key_projects/#setuptools

setuptools is a collection of enhancements to the Python [<FontIcon icon="fa-brands fa-python"/>distutils](https://packaging.python.org/key_projects/#distutils) that allows you to build and distribute Python [<FontIcon icon="fa-brands fa-python"/>distributions](https://packaging.python.org/glossary/#term-Distribution-Package), especially those that depend on other packages.

@tab <FontIcon icon="iconfont icon-twine"/>Twine

https://twine.readthedocs.io/en/latest/

Twine is a utility for publishing Python packages on PyPI. It allows you to upload source and binary distributions of your projects.

:::

::: tip To get started, check out:

- [How to Publish an Open Source Python Package to PyPI](https://realpython.com/pypi-publish-python-package/)
- [Using PyInstaller to Easily Distribute Python Applications](https://realpython.com/pyinstaller-python/)

:::

With these resources, you can get started with packaging and deploying your Python applications, libraries, and packages to your end users, clients, and colleges. Also, the [<FontIcon icon="fa-brands fa-python"/>Python Packaging Authority](https://packaging.python.org/) provides a lot of useful information and tutorials to help you distribute Python packages with modern tools.

### Database Systems

Most of the applications you’ll build in your career as a developer will interact with data in some way. This interaction commonly happens through a [<FontIcon icon="fa-brands fa-wikipedia-w"/>database management system (DBMS)](https://en.wikipedia.org/wiki/Database#Database_management_system) that allows you to define, create, maintain, and control access to your database or databases.

To connect and manipulate your databases with Python, you have several options that include both standard library packages and third-party packages and libraries. You also have options for <FontIcon icon="fa-brands fa-wikipedia-w"/>[SQL](https://en.wikipedia.org/wiki/SQL) and [<FontIcon icon="fa-brands fa-wikipedia-w"/>NoSQL](https://en.wikipedia.org/wiki/NoSQL) databases in Python.

[<FontIcon icon="fa-brands fa-wikipedia-w"/>Object-relational mapping tools (ORMs)](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) are another important type of tool you’ll probably use to work with databases in Python. These tools allow you to use [**object-oriented programming**](/realpython.com/python3-object-oriented-programming.md) to create and manipulate your databases.

Here are some Python libraries you can use for connecting and operating databases:

::: tabs

@tab:active MongoEngine

http://docs.mongoengine.org/

[**MongoDB**](/realpython.com/introduction-to-mongodb-and-python.md)

MongoEngine is a document-object mapper for working with MongoDB using object-oriented programming in Python.

@tab MySQL Connector/Python

https://dev.mysql.com/doc/connector-python/en/

[MySQL](https://dev.mysql.com/)

MySQL Connector is a self-contained Python driver for communicating with MySQL servers.

@tab Psycopg

https://psycopg.org/

[PostgreSQL](https://postgresql.org/about/)

Psycopg is a PostgreSQL database adapter for the Python programming language.

@tab PyMongo

https://pymongo.readthedocs.io/en/stable/index.html

[MongoDB](https://docs.mongodb.com/)

PyMongo is a Python distribution containing tools for working with MongoDB databases. It provides a native Python driver for this type of database system.

@tab SQLAlchemy

https://sqlalchemy.org/

[SQL](https://realpython.com/python-sql-libraries/)

SQLAlchemy is a Python SQL toolkit and object-relational mapper for SQL databases.

@tab <code>sqlite3</code>

https://docs.python.org/3/library/sqlite3.html#module-sqlite3

[SQLite](https://sqlite.org/about.html)

`sqlite3` is a lightweight disk-based database that doesn’t require a separate server process. It allows you to access databases using a nonstandard variant of SQL. It’s freely available and comes in the Python standard library.

:::

::: tip To get started with databases, check out:

- [<FontIcon icon="fas fa-globe"/>Python Database Tutorials](https://realpython.com/tutorials/databases/)
- [<FontIcon icon="fas fa-globe"/>Data Collection & Storage Learning Path](https://realpython.com/learning-paths/data-collection-storage/)

:::

Creating and working with databases is a powerful way to manage data in your Python applications. Databases add significant functionality and versatility to your programs and allow you to provide exciting features to your users and client. Managing databases is a fundamental skill in your developer education.

### Software Testing

When you’re beginning with Python or with programming, you probably start by creating small programs and scripts that you can [**run**](/realpython.com/run-python-scripts.md) and test manually to make sure they work as you expect. However, when your programs grow and get more complex, testing them by hand is near to impossible. This is when automated testing comes into the scene.

Unfortunately, developers make mistakes, and no code is perfect. So, you’ll need a testing process that helps you identify bugs and avoid getting them into production. Testing can also [<FontIcon icon="fa-brands fa-wikipedia-w"/>drive your code’s design](https://en.wikipedia.org/wiki/Test-driven_development) and help you check non-functional features, such as performance, security, usability, regulatory compliance, and more. Testing, therefore, is an important component of software development.

Python has some of the best tools when it comes to testing. You can use these tools to write consistent tests and to run them automatically. Here’s a small sample of these tools:

| Tool | Description |
| --- | --- |
| [doctest](https://docs.python.org/3/library/doctest.html#module-doctest) | doctest is a standard module that searches your [docstrings](https://realpython.com/documenting-python-code/) for pieces of text that look like [interactive Python sessions](https://realpython.com/interacting-with-python/) and executes them to verify that they work correctly. |
| [pytest](https://docs.pytest.org/en/6.2.x/contents.html) | pytest is a robust and mature testing framework that allows you to write and automate tests. It can scale from small unit tests to complex functional tests for your applications and libraries. |
| [tox](https://tox.readthedocs.io/en/latest/) | tox is a generic [virtualenv](https://pypi.org/project/virtualenv) management and test command-line tool. It allows you to check if your packages install correctly within different Python versions and interpreters. It can run your tests in each of the configured environments. |
| [`unittest`](https://docs.python.org/3/library/unittest.html#module-unittest) | `unittest` is a unit testing framework available in the Python standard library. It supports test automation, setup and teardown of tests, aggregation of tests into collections, and more.

:::

::: tip To get started with testing, check out:

- [<FontIcon icon="fas fa-globe"/>Python Testing Tutorials](https://realpython.com/tutorials/testing/)
- [<FontIcon icon="fas fa-globe"/>Test Your Python Apps Learning Path](https://realpython.com/learning-paths/test-your-python-apps/)

:::

As a developer, you need to produce reliable code that works correctly. This means that you need to test your code every time you change it or add new features. Automated tests are the way to go in these situations.

---

## Develop Embedded Systems and Robots

Writing your own applications for the Web or desktop is cool, but writing code that controls how hardware systems and robots work can be even cooler! Fields like [Internet of Things](https://en.wikipedia.org/wiki/Internet_of_things), [home automation](https://en.wikipedia.org/wiki/Home_automation), [self-driving cars](https://en.wikipedia.org/wiki/Self-driving_car), and [robotics](https://en.wikipedia.org/wiki/Robotics) have become more and more popular with advances in science and technology.

Python has gradually jumped into the world of sensors, electrical motors, circuits, microcontrollers, and robots. Today, you can find several Python projects that move in that direction. Here are some of them:

::: tabs

@tab:active BBC micro:bit

https://microbit.org/

BBC micro:bit is a pocket-sized computer that introduces you to how software and hardware work together. It is programmable with Python.

@tab CircuitPython

https://circuitpython.org/

CircuitPython is a programming language designed to simplify experimenting and learning to code on low-cost microcontroller boards.

@tab MicroPython

https://micropython.org/

MicroPython is a lean and efficient implementation of Python. It includes a small subset of the Python standard library. It’s optimized to run on microcontrollers and in constrained environments.

@tab PythonRobotics

https://atsushisakai.github.io/PythonRobotics/

PythonRobotics is a compilation of various robotics algorithms with visualizations. It’s focused on autonomous navigation. Its goal is to allow you to understand the basic ideas behind each robotic algorithm it provides.

@tab <FontIcon icon="fa-brands fa-raspberry-pi"/>Raspberry Pi

https://raspberrypi.org/about/

Raspberry Pi is a general-purpose, Linux-based computer. It has a complete operating system with a GUI interface that is capable of running many different programs at the same time. Python comes built in on the Raspberry Pi.

@tab rospy

http://wiki.ros.org/rospy

rospy is a client library for [<FontIcon icon="fas fa-globe"/>ROS (Robot Operating System)](https://ros.org/). Its API enables Python programmers to quickly interface with ROS to create complex and reliable robot behaviors.

:::

::: tip To get started with embedded Python, check out

- [**MicroPython: An Intro to Programming Hardware in Python**](/realpython.com/micropython.md)
- [<FontIcon icon="fas fa-globe"/>Episode 5: Exploring CircuitPython](https://realpython.com/podcasts/rpp/5/)
- [<FontIcon icon="fas fa-globe"/>Episode 161: Resources and Advice for Building CircuitPython Projects](https://realpython.com/podcasts/rpp/161/)
- [**Embedded Python: Build a Game on the BBC micro:bit**](/realpython.com/embedded-python.md)

:::

If you want to start creating a hardware-related project with Python, then look at how to build [**physical projects with Python on the Raspberry Pi**](/realpython.com/python-raspberry-pi.md). In this project, you’ll learn how to set up a Raspberry Pi, run Python code on it, read input from its sensors, send signals to its electronic components, and more.

---

## What You Probably Shouldn’t Do With Python

Python is a highly versatile language, and there’s a lot you can do with it. However, you can’t do everything. There are things that Python isn’t very well suited for at all.

As an interpreted language, Python has trouble interacting with low-level devices, like device drivers. You’d have a problem if you wanted to write an operating system with Python. You’re better off sticking with [**C**](/realpython.com/c-for-python-programmers.md) or [**C++**](/realpython.com/python-vs-cpp.md) for low-level applications.

However, even that might not be true for long. As a testament to Python’s flexibility, there are people out there who are working on projects that extend Python’s usability to low-level interactions. MicroPython and CircuitPython are just some of these projects designing low-level capability for Python.

---

## What Else Can I Do With Python?

The list of ideas in this tutorial isn’t exhaustive. There are countless other fields you can work on with Python. If you’re looking for practical [<FontIcon icon="fa-brands fa-youtube"/>projects](https://youtu.be/7BiLUehbOb8) that Python is well suited for, then check out [**13 Project Ideas for Intermediate Python Developers**](/realpython.com/intermediate-python-project-ideas.md) to find inspiration.

<VidStack src="youtube/7BiLUehbOb8" />

You can also do your own research to find projects that pique your interest. If you’re not sure where to begin, then [follow *Real Python* on Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`realpython`)](https://x.com/realpython). You’ll find cool and interesting Python projects from the community there. Maybe you’ll find something you can’t wait to contribute to!

---

## Conclusion

Having a basic understanding of what you can do with Python is key for you to keep leveling up your Python skills. You can use Python in a variety of different fields ranging from application development to robotics!

::: info In this article, you saw that you can use Python for

- General **software development**
- **Data science** and **math**
- **Workflow** speedup and automation
- **Embedded systems** and **robotics**

:::

You also saw ideas for several practical projects that you can build to take your Python skills to the next level.

---

## Next Steps

So there you have it! An extensive list of topics and practical projects to start working your way from Python beginner to savvy Pythonista.

No matter where you choose to begin, you’ll be opening up countless avenues for growing your programming skills. Pick something and get started! Do you have an idea for a practical project that isn’t here? Leave a comment down below! You could suggest the perfect project for a fellow programmer.

If you get stuck and need a nudge in the right direction, then check out [**11 Beginner Tips for Learning Python Programming**](/realpython.com/python-beginner-tips.md) to help get yourself back on track.

Another great way to get unstuck is to talk it out. Coding doesn’t have to be a solitary activity. If you need a way to ask questions and get answers quickly from knowledgeable Python developers, then consider joining [**The *Real Python* Member’s Slack**](/realpython.com/community-slack-guide.md) community. Everyone is welcome, no matter how much experience you have. You can always help others and also get help from others.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Can I Do With Python?",
  "desc": "In this tutorial, you'll find a set of guidelines that will help you start applying your Python skills to real-world problems. By the end of your reading, you'll be able to answer the question ”What can I do with Python?”",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/what-can-i-do-with-python.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
