---
lang: en-US
title: "JupyterLab for an Enhanced Notebook Experience"
description: "Article(s) > JupyterLab for an Enhanced Notebook Experience"
icon: iconfont icon-jupyter
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
      content: "Article(s) > JupyterLab for an Enhanced Notebook Experience"
    - property: og:description
      content: "JupyterLab for an Enhanced Notebook Experience"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/using-jupyterlab/
prev: /programming/py/articles/README.md
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
  name="JupyterLab for an Enhanced Notebook Experience"
  desc="In this tutorial, you'll learn how to use the JupyterLab authoring environment and what it brings to the popular computational notebook Jupyter Notebook. You'll learn about its different tools and discover how they can work together to enhance your notebook experience."
  url="https://realpython.com/using-jupyterlab"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Jupyterlab-Tutorial_Watermarked.e68ba3554953.jpg"/>

Maybe you’ve already worked with Jupyter Notebooks from [<FontIcon icon="iconfont icon-jupyter"/>Project Jupyter](https://docs.jupyter.org/en/latest/) to create documents containing runnable code. You can achieve even more with **JupyterLab**, a tool kit that you can use to document and share your research, teaching, and learning activities. It’s useful in a wide range of disciplines, from data analysis and data visualization to scientific study.

JupyterLab enhances your notebooks by providing a **browser-based interface** that allows you to use **multiple notebooks** together effectively. In addition, it offers you a comprehensive Markdown editor, file manager, file viewer, and an infrastructure that enables you to run code from a wide range of files.

**In this tutorial, you’ll learn how to:**

- **Share code** between multiple Jupyter Notebooks
- **Debug** a Jupyter Notebook
- Create and manage **Markdown** files
- Run **embedded code** from a range of different files
- Manage and view **different file types** from a single interface
- **Access** your operating system from within JupyterLab

*Jupyter* is a [<FontIcon icon="fas fa-globe"/>portmanteau](https://britannica.com/topic/portmanteau-word) word blended from the three programming languages **Ju**lia, **Py**thon, and **R**. Although you’ll focus on Python in this tutorial, you can use Jupyter with the other languages as well. Plus, this free application works on macOS, Linux, and Windows environments.

JupyterLab takes [**Jupyter Notebook**](/realpython.com/jupyter-notebook-introduction.md) usage to a different level, so you’ll get the most out of this tutorial if you’re already familiar with Jupyter Notebook.

```component VPCard
{
  "title": "Installing and Starting JupyterLab",
  "desc": "(1/7) JupyterLab for an Enhanced Notebook Experience",
  "link": "/realpython.com/using-jupyterlab/installing-and-starting-jupyterlab.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Understanding JupyterLab Kernels",
  "desc": "(2/7) JupyterLab for an Enhanced Notebook Experience",
  "link": "/realpython.com/using-jupyterlab/understanding-jupyterlab-kernels.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Working With Jupyter Notebook in JupyterLab",
  "desc": "(3/7) JupyterLab for an Enhanced Notebook Experience",
  "link": "/realpython.com/using-jupyterlab/working-with-jupyter-notebook-in-jupyterlab.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using the Markdown Editor",
  "desc": "(4/7) JupyterLab for an Enhanced Notebook Experience",
  "link": "/realpython.com/using-jupyterlab/using-the-markdown-editor.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Managing and Viewing Different Files",
  "desc": "(5/7) JupyterLab for an Enhanced Notebook Experience",
  "link": "/realpython.com/using-jupyterlab/managing-and-viewing-different-files.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using Your Operating System Without Leaving Jupyter",
  "desc": "(6/7) JupyterLab for an Enhanced Notebook Experience",
  "link": "/realpython.com/using-jupyterlab/using-your-operating-system-without-leaving-jupyter.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using Other Tools",
  "desc": "(7/7) JupyterLab for an Enhanced Notebook Experience",
  "link": "/realpython.com/using-jupyterlab/using-other-tools.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## FAQs

You now have some experience with many of the common tools and techniques available within JupyterLab. You’ve covered a lot of ground, but here, you’ll find a few questions and answers that sum up the most important concepts that you’ve covered in this tutorial.

You can use these questions to check your understanding or to recap and solidify what you’ve just learned. After each question, you’ll find a brief explanation hidden in a ::: :::

details collapsible section. Click the ** toggle to reveal the answer. Time to dive in!

::: details **What exactly can JupyterLab do for you?**

JupyterLab provides you with several tools including Jupyter Notebooks, a Markdown editor, and even a text editor. You can display a wide range of files neatly and even run the Python code embedded within them. You can also move or share data between notebooks. It even offers debugging features.

:::

::: details **Why would you use JupyterLab?**

JupyterLab is a browser-based interface that will assist you in documenting and sharing your research, teaching, and learning activities. It’s a very popular tool for data analysis. Its core tool is Jupyter Notebook, but JupyterLab enhances the functionality of your notebooks by integrating them with other JupyterLab tools.

:::

::: details **What keyboard shotcuts are available?**

The designers of JupyterLab are keen for you to use keyboard shortcuts, so they’ve made the complete set accessible using Ctrl+Shift+H in Windows and Linux, Cmd+Shift+H in macOS, or the *Help* → *Show Keyboard Shortcuts* menu option. Several menu items also contain keyboard shortcuts, as do the various tooltips that appear when you hover your mouse over an item. Throughout this tutorial, you’ve learned several of the most common keyboard shortcuts.

:::

::: details **Why are kernels so important?**

The kernel controls the link between code within a JupyterLab file and its runtime environment. Kernels can also access a program’s data, so by sharing a kernel between notebooks, you can share one notebook’s data with another.

When you close a Jupyter Notebook, you don’t close its kernel. This is because other notebooks may also be sharing it. Leaving a kernel running is usually okay, but if you want to close it, then you can select it, right-click, and choose *Shut Down Kernel* from the pop-up menu.

:::

::: details **What enhancements does JupyterLab bring?**

JupyterLab allows you to display multiple notebooks, move content and share code between them, and view different parts of them simultaneously. You can even debug their code. It also provides tools for working with Markdown files, text files, and several other common formats, as well as the ability to run code embedded within them.

JupyterLab is part of [<FontIcon icon="iconfont icon-jupyter"/>Project Jupyter](https://docs.jupyter.org/en/latest/). This is an evolving project, so you’re encouraged to keep up with the latest developments and improvements. A good starting point for that is the [<FontIcon icon="iconfont icon-jupyter"/>official documentation](https://jupyterlab.readthedocs.io/en/stable/index.html). Why not get involved in the [<FontIcon icon="iconfont icon-jupyter"/>JupyterLab community](https://jupyter.org/community) and help make your favorite program even better?

If you have any comments or want to share your use of JupyterLab, feel free to reach out in the comments section below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JupyterLab for an Enhanced Notebook Experience",
  "desc": "In this tutorial, you'll learn how to use the JupyterLab authoring environment and what it brings to the popular computational notebook Jupyter Notebook. You'll learn about its different tools and discover how they can work together to enhance your notebook experience.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/using-jupyterlab.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
