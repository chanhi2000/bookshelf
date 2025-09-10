---
lang: en-US
title: "Changing History"
description: "Article(s) > (5/6) Advanced Git Tips for Python Developers"
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
      content: "Article(s) > (5/6) Advanced Git Tips for Python Developers"
    - property: og:description
      content: "Changing History"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/advanced-git-for-pythonistas/changing-history.html
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
  "desc": "In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, changing history, and how to clean up the mess if something doesn't work out.",
  "link": "/realpython.com/advanced-git-for-pythonistas/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Advanced Git Tips for Python Developers"
  desc="In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, changing history, and how to clean up the mess if something doesn't work out."
  url="https://realpython.com/advanced-git-for-pythonistas#changing-history"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg"/>

One feature of Git that frightens some people is that it has the ability to change commits. While I can understand their concern, this is part of the tool, and, like any powerful tool, you can cause trouble if you use it unwisely.

We’ll talk about several ways to modify commits, but before we do, let’s discuss when this is appropriate. In previous sections you saw the difference between your local repo and a remote repo. Commits that you have created but have not pushed are in your local repo only. Commits that other developers have pushed but you have not pulled are in the remote repo only. Doing a `push` or a `pull` will get these commits into both repos.

The **only** time you should be thinking about modifying a commit is if it exists on your local repo and not the remote. If you modify a commit that has already been pushed from the remote, you are very likely to have a difficult time pushing or pulling from that remote, and your coworkers will be unhappy with you if you succeed.

That caveat aside, let’s talk about how you can modify commits and change history!

---

## `git commit --amend`

What do you do if you just made a commit but then realize that `flake8` has an error when you run it? Or you spot a typo in the commit message you just entered? Git will allow you to “amend” a commit:

```sh
git commit -m "I am bad at spilling"
# 
# [master 63f74b7] I am bad at spilling
#  1 file changed, 4 insertions(+)
git commit --amend -m "I am bad at spelling"
# 
# [master 951bf2f] I am bad at spelling
#  Date: Tue May 22 20:41:27 2018 -0600
#  1 file changed, 4 insertions(+)
```

Now if you look at the log after the amend, you’ll see that there was only one commit, and it has the correct message:

```sh :collapsed-lines
git log
# 
# commit 951bf2f45957079f305e8a039dea1771e14b503c
# Author: Jim Anderson <your_email_here@gmail.com>
# Date:   Tue May 22 20:41:27 2018 -0600
# 
#  I am bad at spelling
# 
# commit c789957055bd81dd57c09f5329c448112c1398d8
# Author: Jim Anderson <your_email_here@gmail.com>
# Date:   Tue May 22 20:39:17 2018 -0600
# 
#  new message
# [rest of log deleted]
```

If you had modified and added files before the amend, those would have been included in the single commit as well. You can see that this is a handy tool for fixing mistakes. I’ll warn you again that doing a `commit --amend` modifies the commit. If the original commit was pushed to a remote repo, someone else may already have based changes on it. That would be a mess, so only use this for commits that are local-only.

---

## `git rebase`

A `rebase` operation is similar to a merge, but it can produce a much cleaner history. When you rebase, Git will find the common ancestor between your current branch and the specified branch. It will then take all of the changes after that common ancestor from your branch and “replay” them on top of the other branch. The result will look like you did all of your changes **after** the other branch.

This can be a little hard to visualize, so let’s look at some actual commits. For this exercise, I’m going to use the `--oneline` option on the `git log` command to cut down on the clutter. Let’s start with a feature branch you’ve been working on called `my_feature_branch`. Here’s the state of that branch:

```sh
git log --oneline
# 
# 143ae7f second feature commit
# aef68dc first feature commit
# 2512d27 Common Ancestor Commit
```

You can see that the `--oneline` option, as you might expect, shows just the SHA and the commit message for each commit. Your branch has two commits after the one labeled `2512d27 Common Ancestor Commit`.

You need a second branch if you’re going to do a rebase and <VPIcon icon="fas fa-code-branch"/>`master` seems like a good choice. Here’s the current state of the <VPIcon icon="fas fa-code-branch"/>`master` branch:

```sh
git log --oneline master
# 
# 23a558c third master commit
# 5ec06af second master commit
# 190d6af first master commit
# 2512d27 Common Ancestor Commit
```

There are three commits on <VPIcon icon="fas fa-code-branch"/>`master` after `2512d27 Common Ancestor Commit`. While you still have <VPIcon icon="fas fa-code-branch"/>`my_feature_branch` checked out, you can do a `rebase` to put the two feature commits **after** the three commits on master:

```sh
git rebase master
# 
# First, rewinding head to replay your work on top of it...
# Applying: first feature commit
# Applying: second feature commit
git log --oneline
# 
# cf16517 second feature commit
# 69f61e9 first feature commit
# 23a558c third master commit
# 5ec06af second master commit
# 190d6af first master commit
# 2512d27 Common Ancestor Commit
```

There are two things to notice in this log listing:

1) As advertised, the two feature commits are after the three master commits.

2) The SHAs of those two feature commits have changed.

The SHAs are different because the repo is slightly different. The commits represent the same changes to the files, but since they were added on top of the changes already in <VPIcon icon="fas fa-code-branch"/>`master`, the state of the repo is different, so they have different SHAs.

If you had done a `merge` instead of a `rebase`, there would have been a new commit with the message `Merge branch 'master' into my_feature_branch`, and the SHAs of the two feature commits would be unchanged. Doing a rebase avoids the extra merge commit and makes your revision history cleaner.

---

## `git pull -r`

Using a rebase can be a handy tool when you’re working on a branch with a different developer, too. If there are changes on the remote, and you have local commits to the same branch, you can use the `-r` option on the `git pull` command. Where a normal `git pull` does a `merge` to the remote branch, `git pull -r` will rebase your commits on top of the changes that were on the remote.

---

## `git rebase -i`

The rebase command has another method of operation. There is a `-i` flag you can add to the `rebase` command that will put it into interactive mode. While this seems confusing at first, it is an amazingly powerful feature that lets you have full control over the list of commits before you push them to a remote. Please remember the warning about not changing the history of commits that have been pushed.

These examples show a basic interactive rebase, but be aware that there are more options and more use cases. The `git rebase --help` command will give you the list and actually does a good job of explaining them.

For this example, you’re going to imagine you’ve been working on your Python library, committing several times to your local repo as you implement a solution, test it, discover a problem and fix it. At the end of this process you have a chain of commits on you local repo that all are part of the new feature. Once you’ve finished the work, you look at your `git log`:

```sh
git log --oneline
# 
# 8bb7af8 implemented feedback from code review
# 504d520 added unit test to cover new bug
# 56d1c23 more flake8 clean up
# d9b1f9e restructuring to clean up
# 08dc922 another bug fix
# 7f82500 pylint cleanup
# a113f67 found a bug fixing
# 3b8a6f2 First attempt at solution
# af21a53 [older stuff here]
```

There are several commits here that don’t add value to other developers or even to you in the future. You can use `rebase -i` to create a “squash commit” and put all of these into a single point in history.

To start the process, you run `git rebase -i af21a53`, which will bring up an editor with a list of commits and some instructions:

```plaintext title="git rebase -i"
pick 3b8a6f2 First attempt at solution
pick a113f67 found a bug fixing
pick 7f82500 pylint cleanup
pick 08dc922 another bug fix
pick d9b1f9e restructuring to clean up
pick 56d1c23 more flake8 clean up
pick 504d520 added unit test to cover new bug
pick 8bb7af8 implemented feedback from code review

# Rebase af21a53..8bb7af8 onto af21a53 (8 command(s))
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

You’ll notice that the commits are listed in reverse order, oldest first. This is the order in which Git will replay the commits on top of `af21a53`. If you just save the file at this point, nothing will change. This is also true if you delete all the text and save the file.

Also, there are several lines starting with a `#` reminding you how to edit this file. These comments can be removed but do not need to be.

But you want to squash all of these commits into one so that “future you” will know that this is the commit that completely added the feature. To do that, you can edit the file to look like this:

```plaintext title="git rebase -i"
pick 3b8a6f2 First attempt at solution
squash a113f67 found a bug fixing
s 7f82500 pylint cleanup
s 08dc922 another bug fix
s d9b1f9e restructuring to clean up
s 56d1c23 more flake8 clean up
s 504d520 added unit test to cover new bug
s 8bb7af8 implemented feedback from code review
```

You can use either the full word for the commands, or, as you did after the first two lines, use the single character version. The example above selected to “pick” the oldest commit and the “squash” each of the subsequent commits into that one. If you save and exit the editor, Git will proceed to put all of those commits into one and then will bring up the editor again, listing all of the commit messages for the squashed commit:

```plaintext title="git rebase -i"
# This is a combination of 8 commits.
# The first commit's message is:
Implemented feature ABC

# This is the 2nd commit message:

found a bug fixing

# This is the 3rd commit message:

pylint cleanup

# This is the 4th commit message:

another bug fix

[the rest trimmed for brevity]
```

By default a squash commit will have a long commit message with all of the messages from each commit. In your case it’s better to reword the first message and delete the rest. Doing that and saving the file will finish the process, and your log will now have only a single commit for this feature:

```sh
git log --oneline
# 
# 9a325ad Implemented feature ABC
# af21a53 [older stuff here]
```

Cool! You just hid any evidence that you had to do more than one commit to solve this issue. Good work! Be warned that deciding **when** to do a squash merge is frequently more difficult than the actual process. There’s a great [<VPIcon icon="fas fa-globe"/>article](https://jamescooke.info/git-to-squash-or-not-to-squash.html) that does a nice job of laying out the complexities.

As you probably guessed, `git rebase -i` will allow you to do far more complex operations. Let’s look at one more example.

In the course of a week, you’ve worked on three different issues, committing changes at various times for each. There’s also a commit in there that you regret and would like to pretend never happened. Here’s your starting log:

```sh
git log --oneline
# 
# 2f0a106 feature 3 commit 3
# f0e14d2 feature 2 commit 3
# b2eec2c feature 1 commit 3
# d6afbee really rotten, very bad commit
# 6219ba3 feature 3 commit 2
# 70e07b8 feature 2 commit 2
# c08bf37 feature 1 commit 2
# c9747ae feature 3 commit 1
# fdf23fc feature 2 commit 1
# 0f05458 feature 1 commit 1
# 3ca2262 older stuff here
```

Your mission is to get this into three clean commits and remove that one bad one. You can follow the same process, `git rebase -i 3ca2262`, and Git presents you with the command file:

```plaintext title="git rebase -i"
pick 0f05458 feature 1 commit 1
pick fdf23fc feature 2 commit 1
pick c9747ae feature 3 commit 1
pick c08bf37 feature 1 commit 2
pick 70e07b8 feature 2 commit 2
pick 6219ba3 feature 3 commit 2
pick d6afbee really rotten, very bad commit
pick b2eec2c feature 1 commit 3
pick f0e14d2 feature 2 commit 3
pick 2f0a106 feature 3 commit 3
```

Interactive rebase allows your to not only specify what to do with each commit but also lets you rearrange them. So, to get to your three commits, you edit the file to look like this:

```plaintext title="git rebase -i"
pick 0f05458 feature 1 commit 1
s c08bf37 feature 1 commit 2
s b2eec2c feature 1 commit 3
pick fdf23fc feature 2 commit 1
s 70e07b8 feature 2 commit 2
s f0e14d2 feature 2 commit 3
pick c9747ae feature 3 commit 1
s 6219ba3 feature 3 commit 2
s 2f0a106 feature 3 commit 3
# pick d6afbee really rotten, very bad commit
```

The commits for each feature are grouped together with only one of them being “picked” and the rest “squashed.” Commenting out the bad commit will remove it, but you could have just as easily deleted that line from the file to the same effect.

When you save that file, you’ll get a separate editor session to create the commit message for each of the three squashed commits. If you call them `feature 1`, `feature 2`, and `feature 3`, your log will now have only those three commits, one for each feature:

```sh
git log --oneline
# 
# f700f1f feature 3
# 443272f feature 2
# 0ff80ca feature 1
# 3ca2262 older stuff here
```

Just like any rebase or merge, you might run into conflicts in this process, which you will need to resolve by editing the file, getting the changes correct, `git add`-ing the file, and running `git rebase --continue`.

I’ll end this section by pointing out a few things about rebase:

1. Creating squash commits is a “nice to have” feature, but you can still work successfully with Git without using it.
2. Merge conflicts on large interactive rebases can be confusing. None of the individual steps are difficult, but there can be a lot of them
3. We’ve just scratched the surface on what you can do with `git rebase -i`. There are more features here than most people will ever discover.

---

## `git revert` vs. `git reset`: Cleaning Up

Unsurprisingly, Git provides you several methods for cleaning up when you’ve made a mess. These techniques depend on what state your repo is in and whether or not the mess is local to your repo or has been pushed to a remote.

Let’s start by looking at the easy case. You’ve made a commit that you don’t want, and it hasn’t been pushed to remote. Start by creating that commit so you know what you’re looking at:

```sh
ls >> file_i_do_not_want
git add file_i_do_not_want
git commit -m "bad commit"
# 
# [master baebe14] bad commit
#  2 files changed, 31 insertions(+)
#  create mode 100644 file_i_do_not_want
git log --oneline
# 
# baebe14 bad commit
# 443272f feature 2
# 0ff80ca feature 1
# 3ca2262 older stuff here
```

The example above created a new file, `file_i_do_not_want`, and committed it to the local repo. It has not been pushed to the remote repo yet. The rest of the examples in this section will use this as a starting point.

To manage commits that are on the local repo only, you can use the `git reset` command. There are two options to explore: `--soft` and `--hard`.

The `git reset --soft <SHA>` command tells Git to move HEAD back to the specified SHA. It doesn’t change the local file system, and it doesn’t change the index. I’ll admit when I read that description, it didn’t mean much to me, but looking at the example definitely helps:

```sh
git reset --soft HEAD^
git status
# 
# On branch master
# Changes to be committed:
#  (use "git reset HEAD <file>..." to unstage)
# 
#  new file:   file_i_do_not_want
# 
git log --oneline
# 
# 443272f feature 2
# 0ff80ca feature 1
# 3ca2262 older stuff here
```

In the example, we reset `HEAD` to `HEAD^`. Remember that `^` tells Git to step back one commit. The `--soft` option told Git to **not** change the index or the local file system, so the `file_i_do_not_want` is still in the index in the “Changes to be committed:” state. The `git log` command shows that the `bad commit` was removed from the history, though.

That’s what the `--soft` option does. Now let’s look at the `--hard` option. Let’s go back to your original state so that `bad commit` is in the repo again and try `--hard`:

```sh
git log --oneline
# 
# 2e9d704 bad commit
# 443272f feature 2
# 0ff80ca feature 1
# 3ca2262 older stuff here
git reset --hard HEAD^
# 
# HEAD is now at 443272f feature 2
git status
# 
# On branch master
# nothing to commit, working directory clean
git log --oneline
# 
# 443272f feature 2
# 0ff80ca feature 1
# 3ca2262 older stuff here
```

There are several things to notice here. First the `reset` command actually gives you feedback on the `--hard` option where it does not on the `--soft`. I’m not sure of why this is, quite honestly. Also, when we do the `git status` and `git log` afterwards, you see that not only is the `bad commit` gone, but the changes that were in that commit have also been wiped out. The `--hard` option resets you completely back to the SHA you specified.

Now, if you remember the last section about changing history in Git, it’s dawned on you that doing a reset to a branch you’ve already pushed to a remote might be a bad idea. It changes the history and that can really mess up your co-workers.

Git, of course, has a solution for that. The `git revert` command allows you to easily remove the changes from a given commit but does not change history. It does this by doing the inverse of the commit you specify. If you added a line to a file, `git revert` will remove that line from the file. It does this and automatically creates a new “revert commit” for you.

Once again, reset the repo back to the point that `bad commit` is the most recent commit. First confirm what the changes are in `bad commit`:

```sh
$ git diff HEAD^
# 
# diff --git a/file_i_do_not_want b/file_i_do_not_want
# new file mode 100644
# index 0000000..6fe5391
# --- /dev/null
# +++ b/file_i_do_not_want
# @@ -0,0 +1,6 @@
# +file1
# +file2
# +file3
# +file4
# +file_i_do_not_want
# +growing_file
```

You can see that we’ve simply added the new `file_i_do_not_want` to the repo. The lines below `@@ -0,0 +1,6 @@` are the contents of that new file. Now, assuming that this time you’ve pushed that `bad commit` to master and you don’t want your co-workers to hate you, use revert to fix that mistake:

```sh
git revert HEAD
# 
# [master 8a53ee4] Revert "bad commit"
#  1 file changed, 6 deletions(-)
#  delete mode 100644 file_i_do_not_want
```

When you run that command, Git will pop up an editor window allowing you to modify the commit message for the revert commit:

```plaintext title="git revert"
Revert "bad commit"

This reverts commit 1fec3f78f7aea20bf99c124e5b75f8cec319de10. # Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
# Changes to be committed:
#  deleted:    file_i_do_not_want
#
```

Unlike `commit`, `git revert` does not have an option for specifying the commit message on the command line. You can use `-n` to skip the message editing step and tell Git to simply use the default message.

After we revert the bad commit, our log shows a new commit with that message:

```sh
git log --oneline
# 
# 8a53ee4 Revert "bad commit"
# 1fec3f7 bad commit
# 443272f feature 2
# 0ff80ca feature 1
# 3ca2262 older stuff here
```

The “bad commit” is still there. It needs to be there because you don’t want to change history in this case. There’s a new commit, however, which “undoes” the changes that are in that commit.

---

## `git clean`

There’s another “clean up” command that I find useful, but I want to present it with a caution.

::: warning Caution

Using `git clean` can wipe out files that are not committed to the repo that you will not be able to recover.

:::

`git clean` does what you guess it would: it cleans up your local working directory. I’ve found this quite useful when something large goes wrong and I end up with several files on my file system that I do not want.

In its simple form, `git clean` simply removes files that are not “under version control.” This means that files that show up in the `Untracked files` section when you look at `git status` will be removed from the working tree. There is not a way to recover if you do this accidentally, as those files were not in version control.

That’s handy, but what if you want to remove all of the `pyc` files created with your Python modules? Those are in your <VPIcon icon="iconfont icon-git"/>`.gitignore` file, so they don’t show up as Untracked and they don’t get deleted by `git clean`.

The `-x` option tells `git clean` to remove untracked and ignored files, so `git clean -x` will take care of that problem. Almost.

Git is a little conservative with the `clean` command and won’t remove untracked directories unless you tell it to do so. Python 3 likes to create <VPIcon icon="fas fa-folder-open"/>`__pycache__` directories, and it’d be nice to clean these up, too. To solve this, you would add the `-d` option. `git clean -xd` will clean up all of the untracked and ignored files and directories.

Now, if you’ve raced ahead and tested this out, you’ve noticed that it doesn’t actually work. Remember that warning I gave at the beginning of this section? Git tries to be cautious when it comes to deleting files that you can’t recover. So, if you try the above command, you see an error message:

```sh
git clean -xd
# 
# fatal: clean.requireForce defaults to true and neither -i, -n, nor -f given; refusing to clean
```

While it’s possible to change your git config files to not require it, most people I’ve talked to simply get used to using the `-f` option along with the others:

```sh
git clean -xfd
# 
# Removing file_to_delete
```

Again, be warned that `git clean -xfd` will remove files that you will not be able to get back, so please use this with caution!
