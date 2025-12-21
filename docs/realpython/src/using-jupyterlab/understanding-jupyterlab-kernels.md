---
lang: en-US
title: "Understanding JupyterLab Kernels"
description: "Article(s) > (2/7) JupyterLab for an Enhanced Notebook Experience"
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
      content: "Article(s) > (2/7) JupyterLab for an Enhanced Notebook Experience"
    - property: og:description
      content: "Understanding JupyterLab Kernels"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/using-jupyterlab/understanding-jupyterlab-kernels.html
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
  url="https://realpython.com/using-jupyterlab#understanding-jupyterlab-kernels"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Jupyterlab-Tutorial_Watermarked.e68ba3554953.jpg"/>

JupyterLab's tools support you in your work. Although the tools are self-contained, by using some of them together, you get more out of them. This integration is probably JupyterLab's most powerful feature.

A good starting point when learning JupyterLab is for you to know what its basic components are and how to make them work together. The diagram below shows an overview of these:

![Diagram showing the components of JupyterLab](https://files.realpython.com/media/ie-jupyterlab-components.e624b41714b7.png)

This diagram may look overwhelming at first because there are several parts. Don't worry, you'll soon see their relevance. The arrows show how various components interact. These interactions are one of the great benefits of JupyterLab. You'll start with the central part of the application and the diagram: the kernel.

The most important component of your JupyterLab installation is its kernel. As you can see from the previous diagram, it's central to the application. Whenever you start a new Jupyter Notebook or console, you click a button that looks like this:

![jupyterlab kernel button](https://files.realpython.com/media/ie-kernel-button_CR.fb1d9e50fb48.png)

When you click the button, you start an instance of the **JupyterLab kernel**. This is a process that links your file to a **console**. The file can be any that contains code such as a notebook, a Python file, a Markdown file, or even a text file. The [<VPIcon icon="iconfont icon-jupyter"/>kernel](https://docs.jupyter.org/en/latest/glossary.html#term-kernel) passes the programming code from the file to the [<VPIcon icon="iconfont icon-jupyter"/>console](https://docs.jupyter.org/en/latest/glossary.html#term-console). The console then runs the code and displays any output. In the case of a Jupyter Notebook, output gets displayed in the notebook itself.

::: note

Anytime you read about kernels in the context of JupyterLab, it means a process that links a file to a console. In computing, the word [<VPIcon icon="fa-brands fa-wikipedia-w"/>kernel](https://en.wikipedia.org/wiki/Kernel_(operating_system)) usually refers to the core of your computer's operating system that allows it to interact with hardware. This has nothing to do with the kernels that you'll use here, so don't confuse these different meanings.

:::

Opening a Jupyter Notebook automatically opens a kernel for it. This is why you can immediately run code from within it. Kernels also allow you to run code embedded within other file types, such as Markdown files, as you'll learn [later](/realpython.com/using-jupyterlab/using-the-markdown-editor.md#running-code-embedded-within-a-markdown-file). The screenshot  

![looking at the running kernels](https://files.realpython.com/media/ie-running-kernelsCR.dd3f885fd42b.png)

If you look carefully at the output, then you'll see from the top part there are five open tabs:

- <VPIcon icon="iconfont icon-jupyter"/>`Untitled8.ipynb`, a Jupyter Notebook that has been assigned automatically to a kernel.
- `Console5`, a console that has been automatically assigned to a kernel.
- The <VPIcon icon="fa-brands fa-markdown"/>`untitled4.md` file, which has no kernel assigned to it. This Markdown file can contain code, but you won't be able to run it.
- The <VPIcon icon="fa-brands fa-markdown"/>`untitled5.md` file, which has had a console assigned to it and therefore also has a kernel assigned to it. You could run code contained within this Markdown file.

As you work through the rest of this tutorial, you'll see how important the kernel is.
