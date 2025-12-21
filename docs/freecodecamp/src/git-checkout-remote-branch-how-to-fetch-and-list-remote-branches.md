---
lang: en-US
title: "Git Checkout Remote Branch - How to Fetch and List Remote Branches"
description: "Article(s) > Git Checkout Remote Branch - How to Fetch and List Remote Branches"
icon: iconfont icon-git
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
      content: "Article(s) > Git Checkout Remote Branch - How to Fetch and List Remote Branches"
    - property: og:description
      content: "Git Checkout Remote Branch - How to Fetch and List Remote Branches"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/git-checkout-remote-branch-how-to-fetch-and-list-remote-branches.html
prev: /programming/git/articles/README.md
date: 2024-05-01
isOriginal: false
author:
  - name: Ihechikara Abba
    url : https://freecodecamp.org/news/author/Ihechikara/
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/UT8LMo-wlyk/upload/c907bdb799b1331e27dd68f35a2b2e25.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Git Checkout Remote Branch - How to Fetch and List Remote Branches"
  desc="You can use branches in Git to work on different features without affecting your main codebase. For example, you can experiment with a new layout for your webpage on a different branch without affecting the main branch where your website is being dep..."
  url="https://freecodecamp.org/news/git-checkout-remote-branch-how-to-fetch-and-list-remote-branches"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/UT8LMo-wlyk/upload/c907bdb799b1331e27dd68f35a2b2e25.jpeg"/>

You can use branches in Git to work on different features without affecting your main codebase. For example, you can experiment with a new layout for your webpage on a different branch without affecting the main branch where your website is being deployed from.

Branches are used for different purposes like feature development, bug fixes, versioning, experimentation, [<VPIcon icon="fa-brands fa-free-code-camp"/>contributing to open source projects](https://contribute.freecodecamp.org/#/), and so on.

In this article, you'll learn how to use different Git commands to interact with remote branches.

---

## How to Fetch and List Remote Branches

I've created a repository (repo) for this article with three different branches: main, feat/create-hobbies-list, and feat/create-language-list. You can download the repo [here (<VPIcon icon="iconfont icon-github"/>`ihechikara/git-branches-article`)](https://github.com/ihechikara/git-branches-article), or clone it to your computer using this command:

```sh
git clone https://github.com/ihechikara/git-branches-article.git
```

The command above downloads the main branch of the repository to your computer.

Feel free to follow along with your own codebase/Git repo.

---

## How to List Remote Branches

When you look at the repo you just cloned on GitHub, you'll notice that there are three branches.

But when you run the `git branch` command, you'll only get a list of branches in the local repo. In our case, that is the main branch. This happens for a couple of reasons:

- The `git branch` command only shows local branches.
- Cloning a branch doesn't automatically download all other branches in the remote repo.

So how do you list the remote branches? You can do that using the `git branch -r` command:

```sh
git branch -r
# 
# origin/HEAD -> origin/main
# origin/feat/create-hobbies-list
# origin/feat/create-language-list
# origin/main
```

From the command output above, you can see all the branches in the remote repo. The main branch which also acts as the default branch (origin/HEAD), and two other branches: feat/create-hobbies-list and feat/create-language-list.

Now that you know how to list remote branches, let's see how to fetch and work on them locally.

---

## How to Fetch Remote Branches

You can fetch remote branches for different reasons like code review, updating your local repo with changes made to the remote repo, experimentation, and so on.

### How to Fetch Remote Branches Using `git fetch`

You can use the `git fetch` command to "fetch" recent changes made to the remote repo without merging them into your local repo.

For example, let's assume that new changes were pushed to the feat/create-language-list branch. When you run the `git fetch` command, Git retrieves the new changes in the remote repo but you won't see them in my local branch/repo.

You can then use commands like `git diff` and `git log` to compare the changes.

In a case where you're satisfied with the changes, you can use the `git merge` command to merge those changes into your local branch. At this point, the changes from the remote branch will be visible/seen locally.

That is:

```sh
git checkout feat/create-language-list
```

The command above switches to the feat/create-language-list branch.

```sh
git fetch
```

The command above retrieves current changes made to the remote branch that aren't in your local branch.

```sh
git diff feat/create-language-list origin/feat/create-language-list
```

The command above compares the changes you just fetched with your local branch. In the terminal, the red characters denote the state of your local branch while the green characters denote new changes from the remote branch. That is:

![`git diff` command showing changes retrieved from remote branch](https://cdn.hashnode.com/res/hashnode/image/upload/v1714451407216/fd2ec3a7-a20f-4c1f-94a1-d7e916f183d4.png)

```sh
git merge
```

The command above merges the changes into your local branch. In this case, the <VPIcon icon="fas fa-file-lines"/>`languages.txt` file will be updated with the new changes.

In summary, `git fetch` retrieves the changes while `git merge` merges the changes to your local branch.

### How to Fetch Remote Branches Using `git pull`

The `git pull` command is similar to `git fetch` and `git merge`.

The difference is that `git pull` automatically merges new changes into your local branch. That is, you don't get to compare changes before merging (you won't get the chance to run `git diff`).

`git pull` executes both `git fetch` and `git merge` at the same time.

So once you run the `git pull` command, the remote changes will appear locally if there are no merge conflicts.

---

## Conclusion

In this article, you learned how to list remote branches using the `git branch -r` command.

You also learned how to fetch remote branches. The `git fetch` command fetches changes from the remote branch while the `git merge` command merges the remote changes to your local branch. This process give you the opportunity to compare changes before merging them.

On the other hand, the `git pull` command automatically fetches and merges changes from a remote branch as long as there are no merge conflicts.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Git Checkout Remote Branch - How to Fetch and List Remote Branches",
  "desc": "You can use branches in Git to work on different features without affecting your main codebase. For example, you can experiment with a new layout for your webpage on a different branch without affecting the main branch where your website is being dep...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/git-checkout-remote-branch-how-to-fetch-and-list-remote-branches.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
