---
lang: en-US
title: "How to rebase on a single branch"
description: "Article(s) > (5/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
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
      content: "Article(s) > (5/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
    - property: og:description
      content: "How to rebase on a single branch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook/advanced-rebasing-in-git.html
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
  url="https://freecodecamp.org/news/git-rebase-handbook#heading-advanced-rebasing-in-git"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png"/>

You can also use `git rebase` while looking at a history of a single branch.

Let's see if you can help me here.

Say I worked from <FontIcon icon="fas fa-code-branch"/>`feature_branch_2`, and specifically edited the file <FontIcon icon="fa-brands fa-youtube"/>`code.py`. I started by changing all strings to be wrapped by double quotes rather than single quotes:

![Changing `'` into `"` in <FontIcon icon="fa-brands fa-youtube"/>`code.py`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-273.png)

Then, I staged and committed:

```sh
git add code.py
git commit -m "Commit 17"
```

I then decided to add a new function at the beginning of the file:

![Adding the function `another_feature`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-274.png)

Again, I staged and committed:

```sh
git add code.py
git commit -m "Commit 18"
```

And now I realized I actually forgot to change the single quotes to double quotes wrapping the `__main__` (as you might have noticed), so I did that too:

![Changing `'__main__'` into `"__main__"`<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-275.png)

Of course, I staged and committed this change:

```sh
git add code.py
git commit -m "Commit 19"
```

Now, consider the history:

![The commit history after introducing "Commit 19"<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-276.png)

It isn't really nice, is it? I mean, I have two commits that are related to one another, "Commit 17" and "Commit 19" (turning `'`s into `"`s), but they are split by the unrelated "Commit 18" (where I added a new function). What can we do? 🤔 Can you help me?

Intuitively, I want to edit the history here:

![These are the commits I want to edit<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-277.png)

So, what would you do?

You are right! 👏🏻

I can rebase the history from "Commit 17" to "Commit 19", on top of "Commit 15". To do that:

```sh
git rebase --interactive --onto <SHA_OF_COMMIT_15> <SHA_OF_COMMIT_15>
```

Notice I specified "Commit 15" as the beginning of the range of commits, excluding this commit. And I didn't need to explicitly specify `HEAD` as the last parameter.

![Using `rebase --onto` on a single branch<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-279.png)

After following your advice and running the `rebase` command (thanks! 😇) I get the following screen:

![Interactive rebase<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-280.png)

So what would I do? I want to put "Commit 19" *before* "Commit 18", so it comes right after "Commit 17". I can go further and squash them together, like so:

![Interactive rebase - changing the order of commit and squashing<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-281.png)

Now when I get prompted for a commit message, I can provide the message "Commit 17+19":

![Providing a commit message<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-282.png)

And now, see our beautiful history:

![The resulting history<br/><Source: [<FontIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-283.png)

Thanks again! 🙌🏻
