---
lang: en-US
title: "Resgit difftool"
description: "Article(s) > (4/6) Advanced Git Tips for Python Developers"
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
      content: "Article(s) > (4/6) Advanced Git Tips for Python Developers"
    - property: og:description
      content: "Resgit difftool"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/advanced-git-for-pythonistas/git-difftool.html
date: 2018-08-13
isOriginal: false
author:
  - name: Jim Anderson
    url : https://realpython.com/team/janderson/
cover: https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Advanced Git Tips for Python Developers",
  "desc": "In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Resgit difftool, and how to clean up the mess if something doesn't work out.",
  "link": "/realpython.com/advanced-git-for-pythonistas/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Advanced Git Tips for Python Developers"
  desc="In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Resgit difftool, and how to clean up the mess if something doesn't work out."
  url="https://realpython.com/advanced-git-for-pythonistas#git-difftool"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg"/>

Git has a mechanism to use a visual diff tool to show diffs instead of just using the command line format we’ve seen thus far. All of the options and features you looked at with `git diff` still work here, but it will show the diffs in a separate window, which many people, myself included, find easier to read. For this example, I’m going to use `meld` as the diff tool because it’s available on Windows, Mac, and Linux.

Difftool is something that is much easier to use if you set it up properly. Git has a set of config options that control the defaults for `difftool`. You can set these from the shell using the `git config` command:

```sh
git config --global diff.tool meld
git config --global difftool.prompt false
```

The `prompt` option is one I find important. If you do not specify this, Git will prompt you before it launches the external build tool every time it starts. This can be quite annoying as it does it for every file in a diff, one at a time:

```sh
git difftool HEAD^ HEAD
# 
# Viewing (1/1): 'python-git-intro/new_section.md'
# Launch 'meld' [Y/n]: y
```

Setting `prompt` to false forces Git to launch the tool without asking, speeding up your process and making you that much better!

In the `diff` discussion above, you covered most of the features of `difftool`, but I wanted to add one thing I learned while researching for this article. Do you remember above when you were looking at the `git stash show` command? I mentioned that there was a way to see what is in a given stash visually, and `difftool` is that way. All of the syntax we learned for addressing stashes works with difftool:

```sh
git difftool stash@{1}
```

As with all `stash` subcommands, if you just want to see the latest stash, you can use the `stash` shortcut:

```sh
git difftool stash
```

Many IDEs and editors have tools that can help with viewing diffs. There is a list of editor-specific tutorials at the end of the [**Introduction to Git**](/realpython.com/python-git-github-intro.md) tutorial.
