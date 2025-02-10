---
lang: en-US
title: "Using Your Operating System Without Leaving Jupyter"
description: "Article(s) > (6/7) JupyterLab for an Enhanced Notebook Experience"
category:
  - Python
  - Jupyter
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
  - jupyter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (6/7) JupyterLab for an Enhanced Notebook Experience"
    - property: og:description
      content: "Using Your Operating System Without Leaving Jupyter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/using-jupyterlab/using-your-operating-system-without-leaving-jupyter.html
date: 2023-11-13
isOriginal: false
author:
  - name: Ian Eyre
    url : https://realpython.com/team/ieyre/
cover: https://files.realpython.com/media/Jupyterlab-Tutorial_Watermarked.e68ba3554953.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JupyterLab for an Enhanced Notebook Experience",
  "desc": "In this tutorial, you'll learn how to use the JupyterLab authoring environment and what it brings to the popular computational notebook Jupyter Notebook. You'll learn about its different tools and discover how they can work together to enhance your notebook experience.",
  "link": "/realpython.com/using-jupyterlab/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="JupyterLab for an Enhanced Notebook Experience"
  desc="In this tutorial, you'll learn how to use the JupyterLab authoring environment and what it brings to the popular computational notebook Jupyter Notebook. You'll learn about its different tools and discover how they can work together to enhance your notebook experience."
  url="https://realpython.com/using-jupyterlab#using-your-operating-system-without-leaving-jupyter"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Jupyterlab-Tutorial_Watermarked.e68ba3554953.jpg"/>


JupyterLab allows you to directly access your operating system’s [**command-line environment**](/realpython.com/python-command-line-arguments.md). To do this, you click the *Terminal* button as shown:

![jupyter lab terminal button](https://files.realpython.com/media/ie-terminal-buttonCR.68ea9e4a7209.png)

In Windows, this opens [<FontIcon icon="fa-brands fa-wikipedia-w"/>PowerShell](https://en.wikipedia.org/wiki/PowerShell). In Linux, it’s usually a [<FontIcon icon="fa-brands fa-wikipedia-w"/>Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) shell, while macOS usually uses a [<FontIcon icon="fa-brands fa-wikipedia-w"/>Zshell](https://en.wikipedia.org/wiki/Z_shell). Once you have a command line, you can then enter the operating system commands that you need. Just remember that you’re running the commands with the same privileges as those that you’ve used to access JupyterLab, so unless you run with administrator privileges, you won’t be able to run all commands.

The screenshot below shows a Windows PowerShell terminal that you’ve accessed from within JupyterLab:

![a windows powershell terminal](https://files.realpython.com/media/ie-powershell-terminalCR2.550a34c593bc.png)

Here you’ve inspected the contents of the `Samples` folder using the `tree` command. As you can see, there are nine files plus one subfolder containing checkpoint information about some of your files. This folder is actually hidden, and you don’t need to worry about its content.

The terminal is useful if you need to use the command line to install a module.

::: note

When you start a terminal, it runs within the same Python environment where JupyterLab is running. So if you’re running JupyterLab in a virtual environment, then all the packages that you install with this terminal will install into your virtual environment. This means that they’ll be available to your notebooks, consoles, and other terminals, but they won’t interfere with any Python installations outside of the virtual environment.

:::

You can also use the terminal to run additional Python code and keep it separate from the code that you’re running elsewhere in JupyterLab. Each time you open a terminal, it gets its own kernel, meaning you can have multiple terminals and commands running without interfering with each other.