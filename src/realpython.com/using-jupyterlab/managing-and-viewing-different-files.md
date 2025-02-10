---
lang: en-US
title: "Managing and Viewing Different Files"
description: "Article(s) > (5/7) JupyterLab for an Enhanced Notebook Experience"
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
      content: "Article(s) > (5/7) JupyterLab for an Enhanced Notebook Experience"
    - property: og:description
      content: "Managing and Viewing Different Files"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/using-jupyterlab/managing-and-viewing-different-files.html
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
  url="https://realpython.com/using-jupyterlab#managing-and-viewing-different-files"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Jupyterlab-Tutorial_Watermarked.e68ba3554953.jpg"/>

JupyterLab contains its own **file browser** that enables you to perform common file management tasks plus view and edit common file types. The file browser is always available when you select its icon as shown:

![the file browser user interface](https://files.realpython.com/media/ie-file-browser-interfaceCR.c29ca45aeb3c.png)

The file browser tools available to you are:

- **New Launcher**, which opens a new Launcher page to allow you to access the various Jupyter components.
- **New Folder**, which allows you to create a new subfolder within the current folder. In the screenshot above, you created a new <FontIcon icon="fas fa-folder-open"/>`Output_Files` subfolder.
- **Upload Files**, which allows you to upload files into the current folder. This is really designed for networked systems where your JupyterLab server is running on a computer elsewhere on a network. If you’re running both the client and its server on the same computer, then you can upload files into your current folder from anywhere on your local computer.
- **Refresh the file browser** makes sure that the list of files displayed in the file browser is up to date. This is also designed for networked environments where remote changes may not immediately show up in the Jupyter interface on your local machine.
- **Filter files by name** allows you to limit the files that are displayed. This is very useful if you have lots of files and are looking for a specific file or similar files. For example, typing `ipynb` into this field will display only your Jupyter Notebook files.
- **Jupyter Root** will display the files in the folder where you started JupyterLab. As far as JupyterLab is concerned, this is the top of the file system. It’s not possible to access files from any folder above the Jupyter root folder from the file browser, unless you upload files as discussed earlier.

The files that you see listed in the screenshot are in your <FontIcon icon="fas fa-folder-open"/>`Samples` folder. You can access the folder by double-clicking on it. To access a parent folder, click on its [<FontIcon icon="fa-brands fa-wikipedia-w"/>breadcrumb](https://en.wikipedia.org/wiki/Breadcrumb_navigation) to the right of the root icon. As you can see, navigating through the file system is quite straightforward.

::: note

You may have also noticed a green dot next to the <FontIcon icon="fa-brands fa-markdown"/>`range type.md` file in the above screenshot. This means there’s a running kernel associated with the file. Why not open your copy of this file from the <FontIcon icon="fas fa-folder-open"/>`Samples` folder then see if you can replicate the dot with your copy?

:::

You can further manage individual files by right-clicking them. The resulting pop-up menu allows you to perform common tasks such as deleting, renaming, and duplicating your files. You can even create new notebooks from here as well. Strangely, you can’t create Markdown.

To view files, double-click them:

![Different file types opened in file browser](https://files.realpython.com/media/ie-opening-various-file-typesCR.72ed4635a3a2.png)

After you double-click, your file opens in its own read-only tabbed window. In the screenshot above, you’ve managed to successfully open `.pdf`, `.csv`, `.json`, `.jpg`, and `.md` files for viewing. You can edit some files by right-clicking on them in the file browser and choosing *Open With* → *Editor*. Feel free to open some of the files in your `Samples` folder.

::: details A Caveat When Working With JSON Files

JavaScript Object Notation, or [<FontIcon icon="fa-brands fa-wikipedia-w"/>JSON](https://en.wikipedia.org/wiki/JSON), is an open standard file and data interchange format for storing data and passing it between different systems. Although you can work directly with [**JSON files in Python**](/realpython.com/python-json.md), you can also view and edit them in JupyterLab. But there is a caveat.

If you need to have one JSON file open for editing and another for viewing in its formatted form, then creating a simple view won’t work. If you have a JSON file opened for editing and create a new view of it, then you end up with two views for editing. To overcome this, you must open the file twice: first for editing and again for reading. Thankfully, JupyterLab will still create two views on the same file meaning both will be synchronized.

The screenshot below shows the <FontIcon icon="iconfont icon-json"/>`Movies.json` file from your <FontIcon icon="fas fa-folder-open"/>`Samples` folder, which you opened by double-clicking it in your file browser. By default, this opens it for viewing. Now if you right-click on the file’s name in the file browser and choose *Open With* → *Editor*, then you’ll open a second copy for editing. If you drag the tab of the second file to the right side of the screen, then you’ll see both simultaneously:

![editing and viewing edit results](https://files.realpython.com/media/ie-edit-and-viewCR-a.8d0a2ed7e387.png)

As you can see, the left-hand side of the screenshot shows a file available to you for editing, while the right-hand side shows the same file available for read-only viewing.

Finally, suppose you decide to change the highlighted text:

![editing and viewing edit results](https://files.realpython.com/media/ie-edit-and-viewCR-b.e90b79ba5c49.png)

When you make a change to the editable version on the left, then the read-only version on the right immediately reflects it. This isn’t a huge surprise. You’re looking at the same thing, after all.

:::

The ability to view files directly not only gives you another great time-saver but also helps you quickly view any files that your code needs or creates. Having each of your files open in its own tab also means that viewing them is only a mouse click away.
