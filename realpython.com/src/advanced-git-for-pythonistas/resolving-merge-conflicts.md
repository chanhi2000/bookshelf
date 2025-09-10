---
lang: en-US
title: "Resolving Merge Conflicts"
description: "Article(s) > (6/6) Advanced Git Tips for Python Developers"
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
      content: "Article(s) > (6/6) Advanced Git Tips for Python Developers"
    - property: og:description
      content: "Resolving Merge Conflicts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/advanced-git-for-pythonistas/resolving-merge-conflicts.html
next: /realpython.com/advanced-git-for-pythonistas/README.md#conclusion
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
  "desc": "In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Resolving Merge Conflicts, and how to clean up the mess if something doesn't work out.",
  "link": "/realpython.com/advanced-git-for-pythonistas/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Advanced Git Tips for Python Developers"
  desc="In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Resolving Merge Conflicts, and how to clean up the mess if something doesn't work out."
  url="https://realpython.com/advanced-git-for-pythonistas#resolving-merge-conflicts"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg"/>

When you’re new to Git, merge conflicts seem like a scary thing, but with a little practice and a few tricks, they can become much easier to deal with.

Let’s start with some of the tricks that can make this easier. The first one changes the format of how conflicts are shown.

## `diff3` Format

We’ll walk through a simple example to see what Git does by default and what options we have to make it easier. To do this, create a new file, <VPIcon icon="fa-brands fa-python"/>`merge.py`, that looks like this:

```py
def display():
    print("Welcome to my project!")
```

Add and commit this file to your branch <VPIcon icon="fas fa-code-branch"/>`master`, and this will be your baseline commit. You’ll create branches that modify this file in different ways, and then you’ll see how to resolve the merge conflict.

You now need to create separate branches that will have conflicting changes. You’ve seen how this is done before, so I won’t describe it in detail:

```sh
git checkout -b mergebranch
# 
# Switched to a new branch 'mergebranch'
vi merge.py # edit file to change 'project' to 'program'

git add merge.py
git commit -m "change project to program"
# 
# [mergebranch a775c38] change project to program
#  1 file changed, 1 insertion(+), 1 deletion(-)
git status
# 
# On branch mergebranch
# nothing to commit, working directory clean
git checkout master
# 
# Switched to branch 'master'
vi merge.py # edit file to add 'very cool' before project

git add merge.py
git commit -m "added description of project"
# 
# [master ab41ed2] added description of project
#  1 file changed, 1 insertion(+), 1 deletion(-)
git show-branch master mergebranch
# 
# * [master] added description of project
#  ! [mergebranch] change project to program
# --
# *  [master] added description of project
#  + [mergebranch] change project to program
# *+ [master^] baseline for merging
```

At this point you have conflicting changes on <VPIcon icon="fas fa-code-branch"/>`mergebranch` and <VPIcon icon="fas fa-code-branch"/>`master`. Using the `show-branch` command we learned in our Intro tutorial, you can see this visually on the command line:

```sh
git show-branch master mergebranch
# 
# * [master] added description of project
#  ! [mergebranch] change project to program
# --
# *  [master] added description of project
#  + [mergebranch] change project to program
# *+ [master^] baseline for merging
```

You’re on branch <VPIcon icon="fas fa-code-branch"/>`master`, so let’s try to merge in <VPIcon icon="fas fa-code-branch"/>`mergebranch`. Since you’ve made the changes with the intent of creating a merge conflict, lets hope that happens:

```sh
git merge mergebranch
# 
# Auto-merging merge.py
# CONFLICT (content): Merge conflict in merge.py
# Automatic merge failed; fix conflicts and then commit the result.
```

As you expected, there’s a merge conflict. If you look at status, there’s a good deal of useful information there. Not only does it say that you’re in the middle of a merge, `You have unmerged paths`, but it also shows you which files are modified, <VPIcon icon="fa-brands fa-python"/>`merge.py`:

```sh
git status
# 
# On branch master
# You have unmerged paths.
#  (fix conflicts and run "git commit")
# 
# Unmerged paths:
#  (use "git add <file>..." to mark resolution)
# 
#  both modified:   merge.py
# 
# no changes added to commit (use "git add" and/or "git commit -a")
```

You have done all that work to get to the point of having a merge conflict. Now you can start learning about how to resolve it! For this first part, you’ll be working with the command line tools and your editor. After that, you’ll get fancy and look at using visual diff tools to solve the problem.

When you open <VPIcon icon="fa-brands fa-python"/>`merge.py` in your editor, you can see what Git produced:

```py
def display():
<<<<<<< HEAD
    print("Welcome to my very cool project!")
=======
    print("Welcome to my program!")
>>>>>>> mergebranch
```

Git uses `diff` syntax from Linux to display the conflict. The top portion, between `<<<<<<< HEAD` and `=======`, are from HEAD, which in your case is <VPIcon icon="fas fa-code-branch"/>`master`. The bottom portion, between `=======` and `>>>>>>> mergebranch` are from, you guessed it, <VPIcon icon="fas fa-code-branch"/>`mergebranch`.

Now, in this very simple example, it’s pretty easy to remember which changes came from where and how we should merge this, but there’s a setting you can enable which will make this easier.

The `diff3` setting modifies the output of merge conflicts to more closely approximate a three-way merge, meaning in this case that it will show you what’s in <VPIcon icon="fas fa-code-branch"/>`master`, followed by what it looked like in the common ancestor, followed by what it looks like in <VPIcon icon="fas fa-code-branch"/>`mergebranch`:

```py
def display():
<<<<<<< HEAD
    print("Welcome to my very cool project!")
||||||| merged common ancestors
    print("Welcome to my project!")
=======
    print("Welcome to my program!")
>>>>>>> mergebranch
```

Now that you can see the starting point, “Welcome to my project!”, you can see exactly what change was made on <VPIcon icon="fas fa-code-branch"/>`master` and what change was made on <VPIcon icon="fas fa-code-branch"/>`mergebranch`. This might not seem like a big deal on such a simple example, but it can make a huge difference on large conflicts, especially merges where someone else made some of the changes.

You can set this option in Git globally by issuing the following command:

```sh
git config --global merge.conflictstyle diff3
```

Okay, so you understand how to see the conflict. Let’s go through how to fix it. Start by editing the file, removing all of the markers Git added, and making the one conflicting line correct:

```py
def display():
    print("Welcome to my very cool program!")
```

You then add your modified file to the index and commit your merge. This will finish the merge process and create the new node:

```sh
git add merge.py
git commit
# 
# [master a56a01e] Merge branch 'mergebranch'
git log --oneline
# 
# a56a01e Merge branch 'mergebranch'
# ab41ed2 added description of project
# a775c38 change project to program
# f29b775 baseline for merging
```

Merge conflicts can happen while you’re cherry-picking, too. The process when you are cherry-picking is slightly different. Instead of using the `git commit` command, you use the `git cherry-pick --continue` command. Don’t worry, Git will tell you in the status message which command you need to use. You can always go back and check that to be sure.

## `git mergetool`

Similar to `git difftool`, Git will allow you to configure a visual diff tool to deal with three-way merges. It knows about several different tools on different operating systems. You can see the list of tools it knows about on your system by using the command below. On my Linux machine, it shows the following:

```sh
git mergetool --tool-help
# 
# 'git mergetool --tool=<tool>' may be set to one of the following:
#  araxis
#  gvimdiff
#  gvimdiff2
#  gvimdiff3
#  meld
#  vimdiff
#  vimdiff2
#  vimdiff3
# 
# The following tools are valid, but not currently available:
#  bc
#  bc3
#  codecompare
#  deltawalker
#  diffmerge
#  diffuse
#  ecmerge
#  emerge
#  kdiff3
#  opendiff
#  p4merge
#  tkdiff
#  tortoisemerge
#  winmerge
#  xxdiff
# 
# Some of the tools listed above only work in a windowed
# environment. If run in a terminal-only session, they will fail.
```

Also similar to `difftool`, you can configure the `mergetool` options globally to make it easier to use:

```sh
git config --global merge.tool meld
git config --global mergetool.prompt false
```

The final option, `mergetool.prompt`, tells Git not to prompt you each time it opens a window. This might not sound annoying, but when your merge involves several files it will prompt you between each of them.
