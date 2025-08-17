---
lang: en-US
title: "Zooming Out for the Big Picture"
description: "Article(s) > (8/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
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
      content: "Article(s) > (8/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
    - property: og:description
      content: "Zooming Out for the Big Picture"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook/zooming-out-for-the-big-picture.html
prev: /programming/git/articles/README.md
date: 2023-07-03
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Git Rebase Handbook - A Definitive Guide to Rebasing",
  "desc": "One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too...",
  "link": "/freecodecamp.org/git-rebase-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Rebase Handbook - A Definitive Guide to Rebasing"
  desc="One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too..."
  url="https://freecodecamp.org/news/git-rebase-handbook#heading-zooming-out-for-the-big-picture"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png"/>

![Comparing rebase and merge<br/>Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-290.png)

In the beginning of this guide, I started by mentioning the similarity between `git merge` and `git rebase`: both are used to integrate changes introduced in different histories.

But, as you now know, they are very different in how they operate. While merging results in a diverged history, rebasing results in a linear history. Conflicts are possible in both cases. And there is one more column described in the table above that requires some close attention.

Now that you know what "Git rebase" is, and how to use interactive rebase or `rebase --onto`, as I hope you agree, `git rebase` is a super powerful tool. Yet, it has one huge drawback when compared with merging.

Git rebase changes the history.

This means that you should **not** rebase commits that exist outside your local copy of the repository, and that other people may have based their commits on.

In other words, if the only commits in question are those you created locally - go ahead, use rebase, go wild.

But if the commits have been pushed, this can lead to a huge problem - as someone else may rely on these commits, that you later overwrite, and then you and they will have different versions of the repository.

This is unlike `merge` which, as we have seen, does not modify history.

For example, consider the last case where we rebased and resulted in this history:

![The history after rebase<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-288.png)

Now, assume that I have already pushed this branch to the remote. And after I had pushed the branch, another developer pulled it and branched out from "Commit C". The other developer didn't know that meanwhile, I was locally rebasing my branch, and would later push it again.

This results in an inconsistency: the other developer works from a commit that is no longer available on my copy of the repository.

I will not elaborate on what exactly this causes in this guide, as my main message is that you should definitely avoid such cases. If you're interested in what would actually happen, I'll leave a link to a useful resource below. For now, let's summarize what we have covered.
