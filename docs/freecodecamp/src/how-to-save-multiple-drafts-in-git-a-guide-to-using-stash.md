---
lang: en-US
title: "How to Save Multiple Drafts in Git: A Guide to Using Stash"
description: "Article(s) > How to Save Multiple Drafts in Git: A Guide to Using Stash"
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
      content: "Article(s) > How to Save Multiple Drafts in Git: A Guide to Using Stash"
    - property: og:description
      content: "How to Save Multiple Drafts in Git: A Guide to Using Stash"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-save-multiple-drafts-in-git-a-guide-to-using-stash.html
prev: /programming/git/articles/README.md
date: 2026-02-10
isOriginal: false
author:
  - name: Chidiadi Anyanwu
    url: https://freecodecamp.org/news/author/chidiadi01/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770649372924/7c949e9d-627a-4b06-99fe-40ce0e7c8507.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Save Multiple Drafts in Git: A Guide to Using Stash"
  desc="Writing code can be similar to writing tutorials. In both cases, you’ll typically need to create and work on multiple drafts before reaching the final version. In an ideal setting, you would write code for a feature, add that code to the staging area..."
  url="https://freecodecamp.org/news/how-to-save-multiple-drafts-in-git-a-guide-to-using-stash"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770649372924/7c949e9d-627a-4b06-99fe-40ce0e7c8507.png"/>

Writing code can be similar to writing tutorials. In both cases, you’ll typically need to create and work on multiple drafts before reaching the final version.

In an ideal setting, you would write code for a feature, add that code to the staging area, and then commit it before going to the next part. This helps keep your commit history clean. (Don't worry if you don't have a clean history. Many of us don’t.)

But now, imagine a scenario where you have multiple features to build. You've committed the first. You've started the third, but then you found out you needed to build the second one first, because the third depends on it. It might seem like you have to go back in time and build out that second feature without mixing in the code changes for the third, and without deleting the code changes for the third.

So how do you do that?

In this article, you’re going to learn about Git stash, what it is, and the basic commands you need to be able to use it.

To understand and get the most out of this tutorial, you’ll need to have a basic understanding of Git.

---

## What is Git Stash?

Git stash provides storage (in the form of a stack) where you can store changes to your code. It lets you keep these changes separate from the current working directory until you're ready to apply them.

`git stash` is a relatively simple command, and has a few variations like:

- `git stash push`
- `git stash pop`
- `git stash apply`
- `git stash drop`
- `git stash clear`
- `git stash show`
- `git stash list`

---

## How to Use Git Stash

### Pushing Code Changes to the Stash

To push uncommitted changes from the working directory to the stash, you can use `git stash push.` When you do that, the changes disappear from the working directory and are saved in the stash. The working directory is then set back to the last commit (which, in the example below, is the Feature one).

```sh
git stash push
```

You can also write the `git stash push` command as just `git stash` – it means the same thing and performs the same way. You can also add a message to it with the `-m` or `--message` flag:

```sh
git stash push -m "Feature two I was working on"
```

You can use the `-u` flag or `--include-untracked` to include untracked changes in the stash. This way, the changes not yet tracked by Git can be included in the stash.

```sh
git stash push -u
git stash push --include-untracked
```

On the other hand, you can decide to push only staged changes to the stash with the `-s` or `--staged` flag:

```sh
git stash push -s
```

You can also suppress feedback messages with the `-q` or `--quiet` flag:

```sh
git stash push -q
```

When you're done with your edits on the current working directory, you can commit and push without the older changes bleeding into it. They're safely stowed away in the stash.

Anytime you use the git stash command, you add a stash to the stash list. The stashes are identified by their index numbers.

### Applying Changes from the Stash to the Working Directory

Let’s say you had a quick fix to do. You’re done committing that, and you want to continue with what you were working on. You can restore the changes from the stash to continue working on them.

You can do this by using the `git stash apply` command or the `git stash pop` command:

```sh
git stash apply
```

`git stash apply` applies the latest changes from the stash to the working directory, but doesn’t delete the code from the stash. You can select a particular entry to apply by index number:

```sh
git stash apply --index stash@{1}
# You'd need to use quotes "stash@{1}" if you're writing this in PowerShell
```

`git stash pop`, on the other hand, applies the latest changes from the stash, then deletes them from the stash. Basically, popping from a stack. You can select a particular stash entry to pop by index number.

```sh
git stash pop
```

```sh
git stash pop --index stash@{1}
# You'd need to use quotes "stash@{1}" if you're writing this in PowerShell
```

### Listing the Items in the Stash List

You can use `git stash list` to list out the stashes in the stash list. It’s arranged by index number (like {0}, {1}, and so on). Any time you do a git stash push, it adds a stash to the stash list.

```sh
git stash list
#
# stash@{0}: WIP on master: b2a2709 Feature one
# stash@{1}: WIP on master: b2a2709 Feature one
```

### Removing Items from the Stash

You can use `git stash clear` to clear the stash list. But if you just want to drop a particular entry from the stash list, you can use `git stash drop` and specify the entry you want to drop by the index number. This doesn’t apply its changes to the working directory.

```sh
git stash clear
```

```sh
git stash drop stash@{0}
# You'd need to use quotes "stash@{0}" if you're writing this in PowerShell
```

### Creating a New Branch from Stash

You can also create a new branch from a stash using `git stash branch`. The syntax is `git stash branch <branchname> [<stash>].`

```sh
git stash branch premium-branch stash@{0}
# You'd need to use quotes "stash@{0}" if you're writing this in PowerShell
```

If you don’t add the stash index, it will just use the last stash.

```sh
git stash branch premium-branch
```

### Showing the Changes in the Stash

You can use `git stash show` to show the changes you’ve made in your stashed changes.

```sh
git stash show
#
# text.md | 4 +++-
# 1 file changed, 3 insertions(+), 1 deletion(-)
```

---

## Conclusion

Git stash is one of those quiet tools that becomes indispensable once your workflow starts to get messy. It allows you to shelve unfinished ideas, switch context without panic, and keep your commits clean. With it, you can safely carry out urgent fixes, and juggle dependent features without muddling up your commit history.

If you enjoyed this article, share it with others. You can also reach me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`chidiadi-anyanwu`)](https://linkedin.com/in/chidiadi-anyanwu) or [X. (<VPIcon icon="fa-brands fa-linkedin" />`chidiadi-anyanwu`)](https://linkedin.com/in/chidiadi-anyanwu)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Save Multiple Drafts in Git: A Guide to Using Stash",
  "desc": "Writing code can be similar to writing tutorials. In both cases, you’ll typically need to create and work on multiple drafts before reaching the final version. In an ideal setting, you would write code for a feature, add that code to the staging area...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-save-multiple-drafts-in-git-a-guide-to-using-stash.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
