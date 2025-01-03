---
lang: en-US
title: "How to Use VS Code to Resolve Conflicts"
description: "Article(s) > (9/10) The Git Merge Handbook – Definitive Guide to Merging in Git"
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
      content: "Article(s) > (9/10) The Git Merge Handbook – Definitive Guide to Merging in Git"
    - property: og:description
      content: "How to Use VS Code to Resolve Conflicts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-definitive-guide-to-git-merge/how-to-use-vs-code-to-resolve-conflicts.html
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
  "title": "The Git Merge Handbook – Definitive Guide to Merging in Git",
  "desc": "By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a...",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Merge Handbook – Definitive Guide to Merging in Git"
  desc="By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a..."
  url="https://freecodecamp.org/news/the-definitive-guide-to-git-merge#heading-how-to-use-vs-code-to-resolve-conflicts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Merge-Handbook-Book-Cover.png"/>

I will show you now how to resolve the same conflict using a graphical tool. For this example, I will use VS Code, which is free and very common. There are many other tools, yet the process is similar, so I will just show VS Code as an example.

First, get back to the state before the merge:

```sh
git reset --hard HEAD~
```

And try to merge again:

```sh
git merge paul_branch_4
```

You should be back at the same status:

![Back at the conflicting status<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-318.png)

Let's see how this appears on VS Code:

![Conflict resolution with VS Code<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-320.png)

VS Code marks the different versions with "Current Change" – which is the "ours" version, the current `HEAD`, and "Incoming Change" for the branch we are merging into the active branch. You can accept one of the changes (or both) by clicking on one of the options.

If you clicked on `Resolve in Merge editor`, you would get a more visual view of the state. VS Code shows the status of each line:

![VS Code's Merge Editor<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-321.png)

If you look closely, you will see that VS Code shows changes within words – for example, showing that "Every**one**" was changed to "Every**body**", marking the changed parts.

You can accept either version, or you can accept a combination. In this case, if you click on "Accept Combination", you get this result:

![VS Code's Merge Editor after clicking on "Accept Combination"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/BCNZ5Uxctuk&t=561s)>](https://freecodecamp.org/news/content/images/2023/04/image-322.png)

VS Code did a really good job! The same three way merge algorithm was implemented here and used on the *word* level rather than the *line* level. So VS Code was able to actually resolve this conflict in a rather impressive way. Of course, you can modify VS Code's suggestion, but it provided a very good start.
