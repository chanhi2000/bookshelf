---
lang: en-US
title: "Using Other Tools"
description: "Article(s) > (7/7) JupyterLab for an Enhanced Notebook Experience"
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
      content: "Article(s) > (7/7) JupyterLab for an Enhanced Notebook Experience"
    - property: og:description
      content: "Using Other Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/using-jupyterlab/using-other-tools.html
next: /realpython.com/using-jupyterlab/README.md#faqs
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
  url="https://realpython.com/using-jupyterlab#using-other-tools"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Jupyterlab-Tutorial_Watermarked.e68ba3554953.jpg"/>

At this stage, you’ve covered the main tools in JupyterLab. However, there are some more available. Take a look at the *Other* section, and you’ll see that you’re not quite finished yet:

![jupyterlabs other tools section](https://files.realpython.com/media/ie-other-toolsCR.68e4c69aca60.png)

Clicking *Text File* will open a text editor that allows you to create plain text files. JupyterLab allows you to create multiple views of them and, by attaching a console to them, run any code within them.

Clicking *Python file* allows you to create a file with an extension of <VPIcon icon="fa-brands fa-python"/>`.py`. In essence, this is a text file, but its content will be color coded to highlight the Python keywords that you’re using. As with text files, you can create multiple views of these files and run any code within them by attaching a console. Of course, you can also run them as [**Python scripts**](/realpython.com/run-python-scripts.md) using `python filename.py`.

Clicking *Python 3* allows you to create a stand-alone console:

![jupyterlab's code console button](https://files.realpython.com/media/ie-code-console-buttonCR.c5a7ae7d3f7a.png)

This uses [**IPython**](/realpython.com/ipython-interactive-python-shell.md), which provides an environment like the [**Python REPL**](/realpython.com/python-repl/README.md), where you can type code in directly or drag and drop it from a notebook or Markdown file, and then run it. This code has its own kernel process, so it won’t interfere with anything else that you have running elsewhere in JupyterLab. The screenshot below shows some code inserted into the lower part of a console:

![jupyterlab console output](https://files.realpython.com/media/ie-console-outputCR.aef5bb5eb354.png)

All you need to do to run your code in a console is tap Shift+Enter. As you can see, the output shows up in the upper part of the console.
