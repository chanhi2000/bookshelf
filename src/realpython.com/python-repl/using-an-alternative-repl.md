---
lang: en-US
title: "Using an Alternative REPL"
description: "Article(s) > (8/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
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
      content: "Article(s) > (8/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
    - property: og:description
      content: "Using an Alternative REPL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-repl/using-an-alternative-repl.html
date: 2023-01-25
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Python Standard REPL: Try Out Code and Ideas Quickly",
  "desc": "In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more.",
  "link": "/realpython.com/python-repl/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Python Standard REPL: Try Out Code and Ideas Quickly"
  desc="In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more."
  url="https://realpython.com/python-repl#using-an-alternative-repl"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

As a Python developer, you’ll spend much of your coding time in the interactive mode because it provides a great tool for testing ideas, proving concepts, and debugging code. When you spend a significant part of your time working with a given tool, you’d love for it to implement a rich set of features that make your life more pleasant with a great user experience.

The CPython implementation includes [**IDLE**](/realpython.com/python-idle.md), which provides an enhanced alternative to the standard REPL out of the box. IDLE is a great tool that you can use without installing anything from a third-party source.

In the Python ecosystem, you’ll find other feature-rich REPLs, though. For example, [<FontIcon icon="fas fa-globe"/>IPython](https://ipython.readthedocs.io/en/stable/#ipython-documentation) has been around for quite some time. This REPL provides code completion, object exploration, advanced history management, and many other features. This tool is popular in the data science ecosystem.

Another enhanced REPL is [**bpython**](/realpython.com/bpython-alternative-python-repl.md), which also offers several IDE-like features that’ll highly improve your user experience and productivity.

The [<FontIcon icon="iconfont icon-github"/>`jonathanslenders/ptpython`](https://github.com/jonathanslenders/ptpython/) REPL is another good alternative to the standard one. It includes features like syntax highlighting, multiline editing, auto-completion, mouse support, and more.

If you prefer to use an online REPL, then you also have a few options available:

<SiteInfo
  name="Welcome to Python.org"
  desc="The official home of the Python Programming Language"
  url="https://python.org/shell/"
  logo="https://python.org/static/favicon.ico"
  preview="https://python.org/static/opengraph-icon-200x200.png"/>

<SiteInfo
  name="Replit -Build apps and sites with AI"
  desc="Replit is an AI-powered platform for building professional web apps and websites."
  url="https://replit.com/"
  logo="https://cdn.replit.com/dotcom/favicon-196.png"
  preview="https://cdn.sanity.io/images/bj34pdbp/migration/2017ad20cbb1770bcb0d23d6d4be8ff9a5105df1-1200x650.png?auto=format&q=75&w=1200&format=png"/>

<SiteInfo
  name="In-Browser Python REPL - Python Morsels"
  desc="Run an interactive Python interpreter right from your web browser."
  url="https://pythonmorsels.com/repl/"
  logo="https://pythonmorsels.com/static/images/favicons/favicon-16x16.png"
  preview="https://pythonmorsels.com/static/images/favicons/og-linkedin-image.jpg"/>

If you run your own search on the Internet, then you’ll find a few other online Python REPLs with different features. Give them a shot and choose the tool that best suits your needs. Then, tell your fellow programmers about your experience in the comments below!
