---
lang: en-US
title: "Handling Interruptions: git stash"
description: "Article(s) > (2/6) Advanced Git Tips for Python Developers"
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
      content: "Article(s) > (2/6) Advanced Git Tips for Python Developers"
    - property: og:description
      content: "Handling Interruptions: git stash"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/advanced-git-for-pythonistas/handling-interruptions-git-stash.html
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
  "desc": "In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Handling Interruptions: git stash, and how to clean up the mess if something doesn't work out.",
  "link": "/realpython.com/advanced-git-for-pythonistas/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Advanced Git Tips for Python Developers"
  desc="In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Handling Interruptions: git stash, and how to clean up the mess if something doesn't work out."
  url="https://realpython.com/advanced-git-for-pythonistas#handling-interruptions-git-stash"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg"/>

One of the Git features I use frequently and find quite handy is the `stash`. It provides a simple mechanism to save the files you’re working on but are not ready to commit so you can switch to a different task. In this section, you’ll walk through a simple use case first, looking at each of the different commands and options, then you will wrap up with a few other use cases in which `git stash` really shines.

---

## `git stash save` and `git stash pop`

Suppose you’re working on a nasty bug. You’ve got Python logging code in two files, <FontIcon icon="fas fa-file-lines"/>`file1` and <FontIcon icon="fas fa-file-lines"/>`file2`, to help you track it down, and you’ve added <FontIcon icon="fas fa-file-lines"/>`file3` as a possible solution.

In short, the changes to the repo are as follows:

- You’ve edited <FontIcon icon="fas fa-file-lines"/>`file1` and done `git add file1`.
- You’ve edited <FontIcon icon="fas fa-file-lines"/>`file2` but have not added it.
- You’ve created <FontIcon icon="fas fa-file-lines"/>`file3` and have not added it.

You do a `git status` to confirm the condition of the repo:

```sh :collapsed-lines
git status
# 
# On branch master
# Changes to be committed:
#  (use "git reset HEAD <file>..." to unstage)
# 
#  modified:   file1
# 
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git checkout -- <file>..." to discard changes in working directory)
# 
#  modified:   file2
# 
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
# 
#  file3
```

Now a coworker (aren’t they annoying?) walks up and tells you that production is down and it’s “your turn.” You know you can break out your mad `git stash` skills to save you some time and save the day.

You haven’t finished with the work on files 1, 2, and 3, so you really don’t want to commit those changes but you need to get them off of your working directory so you can switch to a different branch to fix that bug. This is the most basic use case for `git stash`.

You can use `git stash save` to “put those changes away” for a little while and return to a clean working directory. The default option for `stash` is `save` so this is usually written as just `git stash`.

When you save something to `stash`, it creates a unique storage spot for those changes and returns your working directory to the state of the last commit. It tells you what it did with a cryptic message:

```sh
git stash save
# 
# Saved working directory and index state WIP on master: 387dcfc adding some files
# HEAD is now at 387dcfc adding some files
```

In that output, <FontIcon icon="fas fa-code-branch"/>`master` is the name of the branch, `387dcfc` is the SHA of the last commit, `adding some files` is the commit message for that commit, and `WIP` stands for “work in progress.” The output on your repo will likely be different in those details.

If you do a `status` at this point, it will still show <FontIcon icon="fas fa-file-lines"/>`file3` as an untracked file, but <FontIcon icon="fas fa-file-lines"/>`file1` and <FontIcon icon="fas fa-file-lines"/>`file2` are no longer there:

```sh
git status
# 
# On branch master
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
# 
#  file3
# 
# nothing added to commit but untracked files present (use "git add" to track)
```

At this point, as far as Git is concerned, your working directory is “clean,” and you are free to do things like check out a different branch, cherry-pick changes, or anything else you need to.

You go and check out the other branch, fix the bug, earn the admiration of your coworkers, and now are ready to return to this work.

How do you get the last stash back? `git stash pop`!

Using the `pop` command at this point looks like this:

```sh :collapsed-lines
git stash pop
# 
# On branch master
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git checkout -- <file>..." to discard changes in working directory)
# 
#  modified:   file1
#  modified:   file2
# 
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
# 
#  file3
# 
# no changes added to commit (use "git add" and/or "git commit -a")
# Dropped refs/stash@{0} (71d0f2469db0f1eb9ee7510a9e3e9bd3c1c4211c)
```

Now you can see at the bottom that it has a message about “Dropped refs/stash@{0}”. We’ll talk more about that syntax below, but it’s basically saying that it applied the changes you had stashed and got rid of the stash itself. Before you ask, yes, there is a way to use the stash and **not** get rid of it, but let’s not get ahead of ourselves.

You’ll notice that <FontIcon icon="fas fa-file-lines"/>`file1` used to be in the index but no longer is. By default, `git stash pop` doesn’t maintain the status of changes like that. There is an option to tell it to do so, of course. Add <FontIcon icon="fas fa-file-lines"/>`file1` back to the index and try again:

```sh :collapsed-lines
git add file1
git status
# 
# On branch master
# Changes to be committed:
#  (use "git reset HEAD <file>..." to unstage)
# 
#  modified:   file1
# 
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git checkout -- <file>..." to discard changes in working directory)
# 
#  modified:   file2
# 
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
# 
#  file3
# 
git stash save "another try"
# 
# Saved working directory and index state On master: another try
# HEAD is now at 387dcfc adding some files
git stash pop --index
# 
# On branch master
# Changes to be committed:
#  (use "git reset HEAD <file>..." to unstage)
# 
#  modified:   file1
# 
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git checkout -- <file>..." to discard changes in working directory)
# 
#  modified:   file2
# 
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
# 
#  file3
# 
# Dropped refs/stash@{0} (aed3a02aeb876c1137dd8bab753636a294a3cc43)
```

You can see that the second time we added the `--index` option to the `git pop` command, which tells it to try to maintain the status of whether or not a file is in the index.

In the previous two attempts, you probably noticed that <FontIcon icon="fas fa-file-lines"/>`file3` was not included in your stash. You might want to keep <FontIcon icon="fas fa-file-lines"/>`file3` together with those other changes. Fortunately, there is an option to help you with that: `--include-untracked`.

Assuming we’re back to where we were at the end of the last example, we can re-run the command:

```sh
git stash save --include-untracked "third attempt"
# 
# Saved working directory and index state On master: third attempt
# HEAD is now at 387dcfc adding some files
git status
# 
# On branch master
# nothing to commit, working directory clean
```

This put the untracked <FontIcon icon="fas fa-file-lines"/>`file3` into the stash with our other changes.

Before we move on, I just want to point out that `save` is the default option for `git stash`. Unless you’re specifying a message, which we’ll discuss later, you can simply use `git stash`, and it will do a `save`.

---

## `git stash list`

One of the powerful features of `git stash` is that you can have more than one of them. Git stores stashes in a [<FontIcon icon="fa-brands fa-wikipedia-w"/>stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)), which means that by default it always works with the most recently saved stash. The `git stash list` command will show you the stack of stashes in your local repo. Let’s create a couple of stashes so we can see how this works:

```sh :collapsed-lines
echo "editing file1" >> file1
git stash save "the first save"
# 
# Saved working directory and index state On master: the first save
# HEAD is now at b3e9b4d adding file3

# you can see that stash save cleaned up our working directory
# now create a few more stashes by "editing" files and saving them
echo "editing file2" >> file2
git stash save "the second save"
# 
# Saved working directory and index state On master: the second save
# HEAD is now at b3e9b4d adding file3
echo "editing file3" >> file3
git stash save "the third save"
# 
# Saved working directory and index state On master: the third save
# HEAD is now at b3e9b4d adding file3
git status
# 
# On branch master
# nothing to commit, working directory clean
```

You now have three different stashes saved. Fortunately, Git has a system for dealing with stashes that makes this easy to deal with. The first step of the system is the `git stash list` command:

```sh
git stash list
# 
# stash@{0}: On master: the third save
# stash@{1}: On master: the second save
# stash@{2}: On master: the first save
```

List shows you the stack of stashes you have in this repo, the newest one first. Notice the `stash@{n}` syntax at the start of each entry? That’s the name of that stash. The rest of the `git stash` subcommand will use that name to refer to a specific stash. Generally if you don’t give a name, it always assumes you mean the most recent stash, `stash@{0}`. You’ll see more of this in a bit.

Another thing I’d like to point out here is that you can see the message we used when we did the `git stash save "message"` command in the listing. This can be quite helpful if you have a number of things stashed.

As we mentioned above, the `save [name]` portion of the `git stash save [name]` command is not required. You can simply type `git stash`, and it defaults to a save command, but the auto-generated message doesn’t give you much information:

```sh
echo "more editing file1" >> file1
git stash
# 
# Saved working directory and index state WIP on master: 387dcfc adding some files
# HEAD is now at 387dcfc adding some files
git stash list
# 
# stash@{0}: WIP on master: 387dcfc adding some files
# stash@{1}: On master: the third save
# stash@{2}: On master: the second save
# stash@{3}: On master: the first save
```

The default message is `WIP on <branch>: <SHA> <commit message>.`, which doesn’t tell you much. If we had done that for the first three stashes, they all would have had the same message. That’s why, for the examples here, I use the full `git stash save <message>` syntax.

---

## `git stash show`

Okay, so now you have a bunch of stashes, and you might even have meaningful messages describing them, but what if you want to see exactly what’s in a particular stash? That’s where the `git stash show` command comes in. Using the default options tells you how many files have changed, as well as which files have changed:

```sh
git stash show stash@{2}
# 
#  file1 | 1 +
#  1 file changed, 1 insertion(+)
```

The default options do not tell you what the changes were, however. Fortunately, you can add the `-p` / `--patch` option, and it will show you the diffs in “patch” format:

```sh
git stash show -p stash@{2}
# 
# diff --git a/file1 b/file1
# index e212970..04dbd7b 100644
# --- a/file1
# +++ b/file1
# @@ -1 +1,2 @@
#  file1
# +editing file1
```

Here it shows you that the line “editing file1” was added to <FontIcon icon="fas fa-file-lines"/>`file1`. If you’re not familiar with the patch format for displaying diffs, don’t worry. When you get to the `git difftool` section below, you’ll see how to bring up a visual diff tool on a stash.

---

## `git stash pop` vs. `git stash apply`

You saw earlier how to pop the most recent stash back into your working directory by using the `git stash pop` command. You probably guessed that the stash name syntax we saw earlier also applies to the pop command:

```sh :collapsed-lines
git stash list
# 
# stash@{0}: On master: the third save
# stash@{1}: On master: the second save
# stash@{2}: On master: the first save
git stash pop stash@{1}
# 
# On branch master
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git checkout -- <file>..." to discard changes in working directory)
# while read line; do echo -n "$line" | wc -c; done<
#  modified:   file2
# 
# no changes added to commit (use "git add" and/or "git commit -a")
# Dropped stash@{1} (84f7c9890908a1a1bf3c35acfe36a6ecd1f30a2c)
git stash list
# 
# stash@{0}: On master: the third save
# stash@{1}: On master: the first save
```

You can see that the `git stash pop stash@{1}` put “the second save” back into our working directory and collapsed our stack so that only the first and third stashes are there. Notice how “the first save” changed from `stash@{2}` to `stash@{1}` after the `pop`.

It’s also possible to put a stash onto your working directory but leave it in the stack as well. This is done with `git stash apply`:

```sh :collapsed-lines
git stash list
#
# stash@{0}: On master: the third save
# stash@{1}: On master: the first save
git stash apply stash@{1}
#
# On branch master
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git checkout -- <file>..." to discard changes in working directory)
# 
#  modified:   file1
#  modified:   file2
# 
# no changes added to commit (use "git add" and/or "git commit -a")
git stash list
# 
# stash@{0}: On master: the third save
# stash@{1}: On master: the first save
```

This can be handy if you want to apply the same set of changes multiple times. I recently used this while working on prototype hardware. There were changes needed to get the code to work on the particular hardware on my desk, but none of the others. I used `git stash apply` to apply these changes each time I brought down a new copy of master.

---

## `git stash drop`

The last stash subcommand to look at is `drop`. This is useful when you want to throw away a stash and not apply it to your working directory. It looks like this:

```sh :collapsed-lines
git status
# 
# On branch master
# nothing to commit, working directory clean
git stash list
# 
# stash@{0}: On master: the third save
# stash@{1}: On master: the first save
git stash drop stash@{1}
# 
# Dropped stash@{1} (9aaa9996bd6aa363e7be723b4712afaae4fc3235)
git stash drop
#
# Dropped refs/stash@{0} (194f99db7a8fcc547fdd6d9f5fbffe8b896e2267)
git stash list
git status
# 
# On branch master
# nothing to commit, working directory clean
```

This dropped the last two stashes, and Git did not change your working directory. There are a couple of things to notice in the above example. First, the `drop` command, like most of the other `git stash` commands, can use the optional `stash@{n}` names. If you don’t supply it, Git assumes `stash@{0}`.

The other interesting thing is that the output from the drop command gives you a SHA. Like other SHAs in Git, you can make use of this. If, for example, you really meant to do a `pop` and not a `drop` on `stash@{1}` above, you can create a new branch with that SHA it showed you (`9aaa9996`):

```sh :collapsed-lines
git branch tmp 9aaa9996
git status
# 
# On branch master
# nothing to commit, working directory clean

# use git log <branchname> to see commits on that branch
git log tmp
# 
# commit 9aaa9996bd6aa363e7be723b4712afaae4fc3235
# Merge: b3e9b4d f2d6ecc
# Author: Jim Anderson <your_email_here@gmail.com>
# Date:   Sat May 12 09:34:29 2018 -0600
# 
#  On master: the first save
# [rest of log deleted for brevity]
```

Once you have that branch, you can use the `git merge` or other techniques to get those changes back to your branch. If you didn’t save the SHA from the `git drop` command, there are other methods to attempt to recover the changes, but they can get complicated. You can read more about it [<FontIcon icon="fa-brands fa-stack-overflow"/>here](https://stackoverflow.com/questions/89332/how-to-recover-a-dropped-stash-in-git).

---

## `git stash` Example: Pulling Into a Dirty Tree

Let’s wrap up this section on `git stash` by looking at one of its uses that wasn’t obvious to me at first. Frequently when you’re working on a shared branch for a longer period of time, another developer will push changes to the branch that you want to get to your local repo. You’ll remember that we use the `git pull` command to do this. However, if you have local changes in files that the pull will modify, Git refuses with an error message explaining what went wrong:

```plaintext title="output"
error: Your local changes to the following files would be overwritten by merge:
 <list of files that conflict>
Please, commit your changes or stash them before you can merge.
Aborting
```

You could commit this and then do a `pull` , but that would create a merge node, and you might not be ready to commit those files. Now that you know `git stash`, you can use it instead:

```sh
git stash
# 
# Saved working directory and index state WIP on master: b25fe34 Cleaned up when no TOKEN is present. Added ignored tasks
# HEAD is now at <SHA> <commit message>
git pull
# 
# Updating <SHA1>..<SHA2>
# Fast-forward
#  <more info here>
git stash pop
# 
# On branch master
# Your branch is up-to-date with 'origin/master'.
# Changes not staged for commit:
#  <rest of stash pop output trimmed>
```

It’s entirely possible that doing the `git stash pop` command will produce a merge conflict. If that’s the case, you’ll need to hand-edit the conflict to resolve it, and then you can proceed. We’ll discuss resolving merge conflicts below.
