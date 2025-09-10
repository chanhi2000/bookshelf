---
lang: en-US
title: "One More Powerful Tool 🪛"
description: "Article(s) > (10/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
category:
  - Git
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - git
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (10/10) The Git Merge Handbook - Definitive Guide to Merging in Git"
    - property: og:description
      content: "One More Powerful Tool 🪛"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-definitive-guide-to-git-merge/one-more-powerful-tool.html
date: 2023-04-28
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Git Merge Handbook - Definitive Guide to Merging in Git",
  "desc": "By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a...",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Merge Handbook - Definitive Guide to Merging in Git"
  desc="By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a..."
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-one-more-powerful-tool"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

Well, this was the first time in this entire series of Git articles that I use a tool with a graphical user interface. Indeed, graphical interfaces can be very convenient to understand what's going on when you are resolving merge conflicts.

However, like in many other cases, when we need the big guns or *really* understand what's going on, the command line becomes handy. So let's get back to the command line and learn a tool that can come in handy in more complicated cases.

Again, go back to the state before the merge:

```sh
git reset --hard HEAD~
```

And merge:

```sh
git merge paul_branch_4
```

And say, you are not exactly sure what happened. Why is there a conflict? One very useful command would be:

```sh
git log -p --merge
```

As a reminder, `git log` shows the history of commits that are reachable from `HEAD`. Adding `-p` tells `git log` to show the commits along the diffs they introduced. The `--merge` switch makes the command show all commits containing changes relevant to any *unmerged files*, on either branch, together with their diffs.

This can help you identify the changes in history that led to the conflicts. So in this example, you'd see:

![The output of `git log -p --merge` (Source: [Bri<br/><](https://<VPIcon icon="fa-brands fa-youtube"/>youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-323.png)

The first commit we see is "Commit 15", as in this commit John modified <VPIcon icon="fa-brands fa-markdown"/>`everyone.md`, a file that still has conflicts. Next, Git shows "Commit 13", where Paul changed <VPIcon icon="fa-brands fa-markdown"/>`everyone.md`:

![The output of `git log -p --merge` - continued (Source: [Bri<br/><](https://<VPIcon icon="fa-brands fa-youtube"/>youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-324.png)

Notice that `git log --merge` did not mention previous commits that had changed <VPIcon icon="fa-brands fa-markdown"/>`everyone.md` before "Commit 13", as they had not affected the current conflict.

This way, `git log` tells you all you need to know to understand the process that got you into the current conflicting state. Cool! 😎

Using the command line, you can also ask Git to take only one side of the changes - either "ours" or "theirs", even for a specific file.

You can also instruct Git to take some parts of the diffs of one file and another from another file. I will provide links that describe how to do that in the additional resources section below.

For the most part, you can accomplish that pretty easily either manually or from the UI of your favorite IDE.

For now, it's time for a recap.
